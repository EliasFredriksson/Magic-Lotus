import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import MagicCard from "../../components/MagicCard/MagicCard";
import useFetch from "../../hooks/useFetch/useFetch";
import ICard from "../../models/scryfall/interfaces/ICard";
import "./singleCard.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFetchCardById from "../../services/scryfall/cards/Cards.byId.service";
import useModal from "../../hooks/useModal/useModal";
import { useFetchSymbologyParseMana } from "../../services/scryfall/CardSymbols.service";
import Main from "../../components/Main/Main";

const SingleCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState<ICard | null>(null);
  const { id } = useParams();

  const [errorMsg, setErrorMsg] = useState("");
  const [errorModal, openErrorModal] = useModal({
    innerTsx: <span>{errorMsg}</span>,
    confirmTextOrButton: "Ok",
  });

  const fetchCard = useFetchCardById(id ? id : "");

  const parseMana = useFetchSymbologyParseMana();

  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      const res = await fetchCard.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "error") {
        setErrorMsg(res.details);
        openErrorModal();
        return;
      }

      setCard(res);
      // if (!res.mana_cost) return;
      // const parsed = await parseMana.triggerFetch({
      //   params: {
      //     cost: res.mana_cost,
      //   },
      // });

      // if (parsed.object === "aborted") return;
      // if (parsed.object === "error") {
      //   setErrorMsg(parsed.details);
      //   openErrorModal();
      //   return;
      // }
      // console.log("PARSED MANA: ", parsed);
      setIsLoading(false);
    };
    initFetch();

    return () => {
      fetchCard.abort();
    };
  }, []);

  useEffect(() => {
    console.log("CARD: ", card);

    if (card) {
    }
  }, [card]);

  return (
    <Main id="card-page">
      <div className="middle">
        <PageHeader />
        {card ? (
          <div className="wrapper">
            <div className="left">
              <MagicCard disabled card={card} size="large" quality="large" />
              <Text size="xl" family="heading">
                {card.name}
              </Text>
              <Text>{card.type_line}</Text>
            </div>
            <div className="right">
              <Card>
                <Text>{card.oracle_text}</Text>
                <Text>
                  {card.power} / {card.toughness}
                </Text>
              </Card>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {errorModal}
    </Main>
  );
};

export default SingleCard;

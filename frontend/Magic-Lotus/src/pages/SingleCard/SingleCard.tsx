import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import MagicCard from "../../components/MagicCard/MagicCard";
import ICard from "../../models/scryfall/interfaces/ICard";
import "./singleCard.scss";
import PageHeader from "../../components/Header/Header";
import useFetchCardById from "../../services/scryfall/cards/Cards.byId.service";
import useModal from "../../hooks/useModal/useModal";
import { useFetchSymbologyParseMana } from "../../services/scryfall/CardSymbols.service";
import Main from "../../components/Main/Main";
import useUtility from "../../hooks/useUtility/useUtility";
import Favorite from "../../components/Favorite/Favorite";
import { Seperator } from "../../components/Seperator/Seperator";
import { capitalizeWord } from "../../helpers/StringValidations";
import { Price } from "../../models/scryfall/types/Prices";
import Button from "../../components/Button/Button";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useSearch from "../../hooks/useSearch/useSearch";
import Spinner from "../../components/Spinner/Spinner";

const SingleCard = () => {
  const { id } = useParams();
  const { openStatusModal } = useUtility();
  const { navigate } = useNavigate();
  const { search } = useSearch();

  const [card, setCard] = useState<ICard | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorModal, openErrorModal] = useModal({
    innerTsx: <span>{errorMsg}</span>,
    confirmTextOrButton: "Ok",
  });

  const fetchCard = useFetchCardById(id ? id : "");

  const parseMana = useFetchSymbologyParseMana();

  useEffect(() => {
    const initFetch = async () => {
      const res = await fetchCard.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "error") {
        openStatusModal(res.details);
        return;
      }
      if (res.object === "unknown_error" || res.object === "network_error") {
        openStatusModal(res.error);
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
    };
    initFetch();

    return () => {
      fetchCard.abort();
    };
  }, []);

  const formatCurrency = useCallback((currency: string, total: number) => {
    const formatCurr = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    });
    return formatCurr.format(total);
  }, []);

  return (
    <Main id="card-page">
      <PageHeader title={card ? card.name : ""} />
      {fetchCard.isLoading ? (
        <div>
          <Spinner variant="pulse" size="large" />
        </div>
      ) : card ? (
        <div className="wrapper">
          <div className="left">
            <MagicCard disabled card={card} size="art_crop" quality="normal" />
            <Text size="xxl" family="heading" as="h3">
              {card.name}
            </Text>
            <Text>{card.type_line}</Text>
            <Favorite card={card} />
          </div>
          <div className="right">
            <Card>
              {/* ORACLE TEXT */}
              <Text as="pre">{card.oracle_text}</Text>
            </Card>
            <Card>
              {/* POWER AND TOUGHNESS */}
              {card.power && card.toughness && (
                <>
                  <div className="inner">
                    <Text>Power / Toughness</Text>
                    <Text>
                      {card.power} / {card.toughness}
                    </Text>
                  </div>
                  <Seperator direction="ver" />
                </>
              )}
              {/* TYPE*/}
              <div className="inner">
                <Text>Card type:</Text>
                <Text weight="bold">{capitalizeWord(card.type_line)}</Text>
              </div>

              {/* MANA COST */}
              <Seperator direction="ver" />
              <div className="inner">
                <Text>Manacost:</Text>
                <Text weight="bold">{card.mana_cost}</Text>
              </div>

              {/* COLOR IDENTITY */}
              <Seperator direction="ver" />
              <div className="inner">
                <Text>Color Identity:</Text>
                <Text weight="bold">{card.color_identity}</Text>
              </div>

              {/* RARITY */}
              <Seperator direction="ver" />
              <div className="inner">
                <Text>Rarity:</Text>
                <Text className={card.rarity} weight="bold">
                  {capitalizeWord(card.rarity)}
                </Text>
              </div>
            </Card>
            <Card>
              <Text family="heading" size="xl">
                Price trends
              </Text>

              <div className="prices">
                {Object.entries(card.prices).map(([key, value], index) => {
                  const currency = (() => {
                    const curr = key as Price;
                    if (curr === "usd_etched") return "usd";
                    if (curr === "usd_foil") return "usd";
                    if (curr === "eur_foil") return "eur";
                    return curr;
                  })();
                  if (key && value)
                    return (
                      <div className="inner" key={index}>
                        <span>{key}</span>
                        <span>{formatCurrency(currency, Number(value))}</span>
                      </div>
                    );
                  else return;
                })}
              </div>
            </Card>
            <Card>
              <Button
                variant="link"
                onClick={() => {
                  const query = card.prints_search_uri.split("?")[1];
                  console.log("QUERY: ", query);
                  search(`?${query}`);
                }}
              >
                Unique prints
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )}
      {errorModal}
    </Main>
  );
};

export default SingleCard;

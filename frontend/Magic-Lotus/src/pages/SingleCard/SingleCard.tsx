import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import MagicCard from "../../components/MagicCard/MagicCard";
import ICard from "../../models/scryfall/interfaces/ICard";
import "./singleCard.scss";
import PageHeader from "../../components/Header/Header";
import useFetchCardById from "../../services/scryfall/cards/Cards.byId.service";
// import { useFetchSymbologyParseMana } from "../../services/scryfall/CardSymbols.service";
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
  const { search } = useSearch();
  const { navigate } = useNavigate();

  const [card, setCard] = useState<ICard | null>(null);

  const fetchCard = useFetchCardById(id ? id : "");

  // TO BE IMPLEMENTED
  // const parseMana = useFetchSymbologyParseMana();

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
            <MagicCard disabled card={card} size="result" quality="normal" />
            <Text size="xxl" family="heading" as="h3">
              {card.name}
            </Text>
            <Text>{card.type_line}</Text>
            <Favorite card={card} />
          </div>
          <div className="right">
            {card.oracle_text && (
              <Card className="oracle">
                {(() => {
                  const split = card.oracle_text.split("\n");
                  return split.map((row, index) => (
                    <Text key={index} as="p">
                      {row}
                    </Text>
                  ));
                })()}
                {/* ORACLE TEXT */}
              </Card>
            )}
            <Card className="main-stats">
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
                <Text weight="bold" align="end">
                  {capitalizeWord(card.type_line)}
                </Text>
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

              {/* SET */}
              <Seperator direction="ver" />
              <div className="inner">
                <Text>Set:</Text>

                <Button
                  variant="link"
                  fontSize="l"
                  onClick={() => {
                    navigate(`/sets/${card.set_name}`);
                  }}
                >
                  {capitalizeWord(card.set_name)}
                </Button>
              </div>
            </Card>
            {/* LEGALITY */}
            {/* CURRENTLY COMMENTED OUT, NOT READY YET */}
            {/* <Card> 
              {Object.entries(card.legalities).map(([key, value], index) => {
                return (
                  <Text key={index}>
                    {key}: {`${value}`}
                  </Text>
                );
              })}
            </Card> */}
            {/* PRICE TRENDS AND PURCHASE LINKS */}
            <div className="buy-card">
              <Card className="price-trends">
                <Text as="h6">Price trends</Text>
                <Seperator direction="ver" />
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
                          <Text>{key}</Text>
                          <Text>{formatCurrency(currency, Number(value))}</Text>
                        </div>
                      );
                    else return;
                  })}
                </div>
              </Card>
              <Card className="purchase">
                <Text as="h6">Purchase</Text>
                <Seperator direction="ver" />
                {card.purchase_uris.cardmarket && (
                  <Button
                    variant="link"
                    onClick={() => {
                      if (card.purchase_uris.cardmarket)
                        window.open(card.purchase_uris.cardmarket, "_blank");
                    }}
                  >
                    Card Market
                  </Button>
                )}
                {card.purchase_uris.tcgplayer && (
                  <Button
                    variant="link"
                    onClick={() => {
                      if (card.purchase_uris.tcgplayer)
                        window.open(card.purchase_uris.tcgplayer, "_blank");
                    }}
                  >
                    TCG Player
                  </Button>
                )}
                {card.purchase_uris.cardhoarder && (
                  <Button
                    variant="link"
                    onClick={() => {
                      if (card.purchase_uris.cardhoarder)
                        window.open(card.purchase_uris.cardhoarder, "_blank");
                    }}
                  >
                    Card Hoarder
                  </Button>
                )}
              </Card>
            </div>
            {/* OTHER LINKS */}
            <Card className="links">
              <Text as="h6">Links</Text>
              <Button
                variant="link"
                onClick={() => {
                  const query = card.prints_search_uri.split("?")[1];
                  search(`?${query}`);
                }}
              >
                Unique prints
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <Text as="h5">Something went wrong...</Text>
        </>
      )}
    </Main>
  );
};

export default SingleCard;

import PageHeader from "../../components/PageHeader/PageHeader";
import Text from "../../components/Text/Text";
import "./results.scss";
import MagicCard from "../../components/MagicCard/MagicCard";
import { useSearchParams } from "react-router-dom";
import IPaginated, {
  BLANK_PAGINATED_CARDS,
} from "../../models/scryfall/types/Paginated";
import ICard from "../../models/scryfall/interfaces/ICard";
import { useEffect, useState } from "react";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import Spinner from "../../components/Spinner/Spinner";
import useFetchCardSearch, {
  Order,
} from "../../services/scryfall/cards/Cards.search.service";
import useModal from "../../hooks/useModal/useModal";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";

const Results = () => {
  const { navigate } = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [result, setResult] = useObjectState<IPaginated<ICard[]>>(
    BLANK_PAGINATED_CARDS
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [errorModal, openErrorModal] = useModal({
    innerTsx: <span>{errorMsg}</span>,
    confirmTextOrButton: "Ok",
  });

  const { isLoading, triggerFetch, abort } = useFetchCardSearch();

  useEffect(() => {
    const fetchSearch = async () => {
      const q = query.get("q") || "";
      const order = query.get("order") as Order;
      const res = await triggerFetch({
        params: {
          q,
          order,
        },
      });
      if (res.object === "aborted") return;
      if (res.object === "list") {
        setResult(res);
      } else {
        setErrorMsg(res.details);
        openErrorModal();
        setResult(BLANK_PAGINATED_CARDS);
      }
    };
    fetchSearch();
    return () => {
      abort();
      setResult(BLANK_PAGINATED_CARDS);
    };
  }, []);

  return (
    <Main id="results-page">
      <div className="middle">
        <PageHeader title={`Result`} />

        {isLoading ? (
          <div className="spinner-wrapper">
            <Spinner size="large" />
          </div>
        ) : (
          <div
            className={`results ${result.data.length > 3 ? "grid" : "flex"}`}
          >
            {result.data.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  navigate(`/card/${card.id}`);
                }}
              >
                <MagicCard card={card} />
              </div>
            ))}
          </div>
        )}
      </div>
      {errorModal}
    </Main>
  );
};

export default Results;

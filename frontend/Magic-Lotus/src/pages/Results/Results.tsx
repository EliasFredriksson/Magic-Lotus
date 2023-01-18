import Header from "../../components/Header/Header";
import "./results.scss";
import MagicCard from "../../components/MagicCard/MagicCard";
import IPaginated, {
  BLANK_PAGINATED_CARDS,
} from "../../models/scryfall/types/Paginated";
import ICard from "../../models/scryfall/interfaces/ICard";
import { useEffect } from "react";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import Spinner from "../../components/Spinner/Spinner";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useSearch from "../../hooks/useSearch/useSearch";

const Results = () => {
  const { navigate } = useNavigate();
  const [result, setResult] = useObjectState<IPaginated<ICard[]>>(
    BLANK_PAGINATED_CARDS
  );

  const { isLoading, latestSearch } = useSearch();

  useEffect(() => {
    if (!isLoading) {
      setResult(latestSearch ? latestSearch : BLANK_PAGINATED_CARDS);
    }
  }, [isLoading]);

  return (
    <Main id="results-page">
      <Header title={`Result`} />

      {isLoading ? (
        <div className="spinner-wrapper">
          <Spinner size="x-large" variant="pulse" />
        </div>
      ) : (
        <div className={`results`}>
          {result.data.map((card, index) => {
            return (
              <div
                key={card.id}
                onClick={() => {
                  navigate(`/card/${card.id}`);
                }}
              >
                <MagicCard card={card} size="result" quality="normal" />
              </div>
            );
          })}
        </div>
      )}
    </Main>
  );
};

export default Results;

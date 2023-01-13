import PageHeader from "../../components/PageHeader/PageHeader";
import "./results.scss";
import MagicCard from "../../components/MagicCard/MagicCard";
import IPaginated, {
  BLANK_PAGINATED_CARDS,
} from "../../models/scryfall/types/Paginated";
import ICard from "../../models/scryfall/interfaces/ICard";
import { useEffect, useState } from "react";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import Spinner from "../../components/Spinner/Spinner";
import useModal from "../../hooks/useModal/useModal";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import useSearch from "../../hooks/useSearch/useSearch";

const Results = () => {
  const { breakpoints } = useScreenSize();
  const { navigate } = useNavigate();
  const [result, setResult] = useObjectState<IPaginated<ICard[]>>(
    BLANK_PAGINATED_CARDS
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [errorModal, openErrorModal] = useModal({
    innerTsx: <span>{errorMsg}</span>,
    confirmTextOrButton: "Ok",
  });

  const { isLoading, latestSearch } = useSearch();

  useEffect(() => {
    if (!isLoading) {
      setResult(latestSearch.data);
    } else {
      console.log("SEARCH IS LOADING...");
    }
  }, [isLoading]);

  return (
    <Main id="results-page">
      <div className="middle">
        <PageHeader title={`Result`} />

        {isLoading ? (
          <div className="spinner-wrapper">
            <Spinner size="x-large" variant="pulse" />
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
                <MagicCard card={card} size="normal" quality="normal" />
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

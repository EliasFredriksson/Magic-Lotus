import "./catalog.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import ICatalog, {
  BLANK_CATALOG,
} from "../../models/backend/interfaces/ICatalog";
// import CATALOG_ROUTES from "../../services/backend/Catalog.routes";
import Main from "../../components/Main/Main";
import { useFetchGetCatalogByName } from "../../services/backend/Catalog.service";
import useUtility from "../../hooks/useUtility/useUtility";
import Header from "../../components/Header/Header";

const Catalog = () => {
  const { name } = useParams();
  const { openStatusModal } = useUtility();
  const [catalog, setCatalog] = useObjectState<ICatalog>(BLANK_CATALOG);

  const FetchCatalog = useFetchGetCatalogByName(name ? name : "");

  useEffect(() => {
    const fetchCatalog = async () => {
      const res = await FetchCatalog.triggerFetch();
      if (res.object === "aborted") return;
      if (
        res.object === "magic_lotus_error" ||
        res.object === "network_error" ||
        res.object === "unknown_error"
      ) {
        openStatusModal(res.error);
        return;
      }
      if (res.data) setCatalog(res.data);
      else setCatalog(BLANK_CATALOG);
    };
    fetchCatalog();
    return () => {
      FetchCatalog.abort();
    };
  }, []);

  return (
    <Main id="catalog-page">
      <div className="middle">
        <Header title={<em>{catalog.category}</em>} />
        {FetchCatalog.isLoading ? (
          <Spinner size="x-large" />
        ) : (
          <div className="catalog">
            <ul>
              {catalog.data.map((type) => (
                <li key={type}>
                  <Text>{type}</Text>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Catalog;

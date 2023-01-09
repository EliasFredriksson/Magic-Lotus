import "./catalog.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import useFetch from "../../hooks/useFetch/useFetch";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import ICatalog, {
  BLANK_CATALOG,
} from "../../models/backend/interfaces/ICatalog";
import IServiceResponse from "../../models/backend/types/MagicLotusResponse";
// import CATALOG_ROUTES from "../../services/backend/Catalog.routes";
import Main from "../../components/Main/Main";
import { useFetchGetCatalogByName } from "../../services/backend/Catalog.service";
import useUtility from "../../hooks/useUtility/useUtility";

const Catalog = () => {
  const { name } = useParams();
  const { openStatusModal } = useUtility();
  const [catalog, setCatalog] = useObjectState<ICatalog>(BLANK_CATALOG);

  const FetchCatalog = useFetchGetCatalogByName(name ? name : "");

  useEffect(() => {
    const fetchCatalog = async () => {
      const res = await FetchCatalog.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
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
        <PageHeader title={<em>{catalog.category}</em>} />
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

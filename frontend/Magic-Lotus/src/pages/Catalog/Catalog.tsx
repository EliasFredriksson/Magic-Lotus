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
import CATALOG_ROUTES from "../../services/backend/Catalog.routes";
type Props = {};

const Catalog = (props: Props) => {
  const { name } = useParams();
  const [catalog, setCatalog] = useObjectState<ICatalog>(BLANK_CATALOG);
  const FetchCatalog = useFetch<IServiceResponse<ICatalog>>({
    base: "BACKEND",
    route: CATALOG_ROUTES.GET_CATALOG_BY_CATEGORY_NAME(name ? name : ""),
    method: "GET",
  });

  useEffect(() => {
    const fetchCatalog = async () => {
      const res = await FetchCatalog.triggerFetch();
      if (res.success) setCatalog(res.data);
      else setCatalog(BLANK_CATALOG);
    };
    fetchCatalog();
    return () => {
      FetchCatalog.abort();
    };
  }, []);

  return (
    <main id="catalog-page">
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
    </main>
  );
};

export default Catalog;

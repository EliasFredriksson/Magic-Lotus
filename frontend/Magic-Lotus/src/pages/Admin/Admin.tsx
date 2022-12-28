import "./admin.scss";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import useFetch from "../../hooks/useFetch/useFetch";
import useModal from "../../hooks/useModal/useModal";
import IServiceResponse from "../../models/backend/types/MagicLotusResponse";
import useUpdateAllCatalogs from "../../hooks/useUpdateAllCatalogs/useUpdateAllCatalogs";
import PageHeader from "../../components/PageHeader/PageHeader";
import CATALOG_ROUTES from "../../services/backend/Catalog.routes";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";

const Admin = () => {
  const { navigate } = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [errorModal, openErrorModal] = useModal({
    innerTsx: <span>{errorMsg}</span>,
    confirmTextOrButton: "Ok",
  });

  const [warningMsg, setWarningMsg] = useState("");
  const [warningModal, openWarningModal] = useModal({
    innerTsx: <Text weight="medium">{warningMsg}</Text>,
    confirmTextOrButton: "Yes",
    cancelTextOrButton: "Cancel",
    onConfirm: () => {
      start();
    },
  });

  const handleUpdateCatalog = useCallback(() => {
    setWarningMsg("Are you sure you want to update ALL catalogs?");
    openWarningModal();
  }, []);

  const { done, start, isLoading } = useUpdateAllCatalogs({
    onError: (error) => {
      setErrorMsg(error.message);
      openErrorModal();
    },
  });

  const [catalogNames, setCatalogNames] = useState<string[]>([]);
  const FetchCatalogNames = useFetch<IServiceResponse<string[]>>({
    base: "BACKEND",
    route: CATALOG_ROUTES.GET_CATALOG_NAMES(),
    method: "GET",
  });

  useEffect(() => {
    const fetchCatalogNames = async () => {
      const res = await FetchCatalogNames.triggerFetch();
      if (res.success) setCatalogNames(res.data);
      else setCatalogNames([]);
    };
    fetchCatalogNames();

    return () => {
      FetchCatalogNames.abort();
    };
  }, []);

  return (
    <Main id="admin-page">
      <div className="middle">
        <PageHeader title="Admin" />
        <Card className="catalogs">
          <div className="names">
            <Text size="xl" weight="medium" family="heading">
              Catalogs:
            </Text>
            <div className="inner">
              {catalogNames.map((cat, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  fontWeight="light"
                  onClick={() => {
                    navigate(`/admin/catalog/${cat}`);
                  }}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleUpdateCatalog}>
            {isLoading ? <Spinner size="medium" /> : "Update catalogs"}
          </Button>
          {done && <Text size="l">Done updating catalogs!</Text>}
        </Card>
      </div>
      {warningModal}
      {errorModal}
    </Main>
  );
};

export default Admin;

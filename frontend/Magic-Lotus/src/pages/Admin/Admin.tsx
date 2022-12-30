import "./admin.scss";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import useModal from "../../hooks/useModal/useModal";
import useUpdateAllCatalogs from "../../hooks/useUpdateAllCatalogs/useUpdateAllCatalogs";
import PageHeader from "../../components/PageHeader/PageHeader";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import { useFetchGetCatalogNames } from "../../services/backend/Catalog.service";
import useUtility from "../../hooks/useUtility/useUtility";
import { useFetchSymbols } from "../../services/backend/Symbol.service";
import ISymbol from "../../models/backend/interfaces/ISymbol";
import useUpdateAllSymbols from "../../hooks/useUpdateAllSymbols/useUpdateAllSymbols";
import Image from "../../components/Image/Image";

const Admin = () => {
  const { navigate } = useNavigate();
  const { openStatusModal } = useUtility();

  const [action, setAction] = useState<"symbols" | "catalogs" | null>(null);
  const [warningMsg, setWarningMsg] = useState("");
  const [warningModal, openWarningModal] = useModal({
    innerTsx: <Text weight="medium">{warningMsg}</Text>,
    confirmTextOrButton: "Yes",
    cancelTextOrButton: "Cancel",
    onConfirm: () => {
      if (action === "symbols") updateSymbols.start();
      if (action === "catalogs") updateCatalogs.start();
    },
  });

  const handleUpdateCatalog = useCallback(() => {
    setAction("catalogs");
    setWarningMsg("Are you sure you want to update ALL catalogs?");
    openWarningModal();
  }, []);

  const handleUpdateSymbols = useCallback(() => {
    setAction("symbols");
    setWarningMsg("Are you sure you want to update ALL symbols?");
    openWarningModal();
  }, []);

  const updateCatalogs = useUpdateAllCatalogs({
    onError: (error) => {
      openStatusModal(error.message);
    },
  });
  const updateSymbols = useUpdateAllSymbols({
    onError: (error) => {
      openStatusModal(error.message);
    },
  });

  const [catalogNames, setCatalogNames] = useState<string[]>([]);
  const FetchCatalogNames = useFetchGetCatalogNames();

  const [symbols, setSymbols] = useState<ISymbol[]>([]);
  const FetchSymbols = useFetchSymbols(); // Get symbols for MagicLotusAPI

  useEffect(() => {
    const fetchCatalogNames = async () => {
      const res = await FetchCatalogNames.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        setCatalogNames([]);
        openStatusModal(res.error);
        return;
      }
      setCatalogNames(res.data);
    };

    const fetchSymbols = async () => {
      const res = await FetchSymbols.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        setSymbols([]);
        openStatusModal(res.error);
        return;
      }
      setSymbols(res.data);
    };
    fetchCatalogNames();
    fetchSymbols();

    return () => {
      FetchCatalogNames.abort();
      FetchSymbols.abort();
    };
  }, [updateSymbols.done, updateCatalogs.done]);

  return (
    <Main id="admin-page">
      <div className="middle">
        <PageHeader title="Admin" />
        <div className="cards">
          <Card className="catalogs">
            <Text size="xl" weight="medium" family="heading">
              Catalogs:
            </Text>
            <div className="inner">
              {FetchCatalogNames.isLoading ? (
                <Spinner variant="pulse" size="x-large" />
              ) : (
                catalogNames.map((cat, index) => (
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
                ))
              )}
            </div>

            <Button onClick={handleUpdateCatalog}>
              {updateCatalogs.isLoading ? (
                <Spinner size="medium" variant="pulse" />
              ) : (
                "Update catalogs"
              )}
            </Button>
            {updateCatalogs.done && (
              <Text size="l">Done updating catalogs!</Text>
            )}
          </Card>
          <Card className="symbols">
            <Text size="xl" weight="medium" family="heading">
              Symbols:
            </Text>
            <div className="inner">
              {FetchSymbols.isLoading ? (
                <Spinner variant="pulse" size="x-large" />
              ) : (
                symbols.map((symbol, index) => (
                  <Image
                    key={index}
                    imageUrl={symbol.svg_uri}
                    fallbackImageUrl={""}
                    spinnerSize="small"
                    imageSize={{
                      width: "3rem",
                      height: "3rem",
                    }}
                    alt={symbol.english}
                  />
                  // <Button key={index}>{symbol.symbol}</Button>
                ))
              )}
            </div>
            <Button onClick={handleUpdateSymbols}>
              {updateSymbols.isLoading ? (
                <Spinner size="medium" variant="pulse" />
              ) : (
                "Update symbols"
              )}
            </Button>
          </Card>
        </div>
      </div>
      {warningModal}
    </Main>
  );
};

export default Admin;

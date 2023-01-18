import "./admin.scss";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import Text from "../../components/Text/Text";
import useModal from "../../hooks/useModal/useModal";
import useUpdateAllCatalogs from "../../hooks/useUpdateAllCatalogs/useUpdateAllCatalogs";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import { useFetchGetCatalogNames } from "../../services/backend/Catalog.service";
import useUtility from "../../hooks/useUtility/useUtility";
import { useFetchSymbols } from "../../services/backend/Symbol.service";
import ISymbol from "../../models/backend/interfaces/ISymbol";
import useUpdateAllSymbols from "../../hooks/useUpdateAllSymbols/useUpdateAllSymbols";
import Image from "../../components/Image/Image";
import { useFetchGetAllSetNames } from "../../services/backend/Sets.service";
import useUpdateAllSets from "../../hooks/useUpdateAllSets/useUpdateAllSets";
import Header from "../../components/Header/Header";

const MINIMIZED_SETS_COUNT = 20;

const Admin = () => {
  const { navigate } = useNavigate();
  const { openStatusModal, updateTitle } = useUtility();

  const [action, setAction] = useState<"symbols" | "catalogs" | "sets" | null>(
    null
  );
  const [warningMsg, setWarningMsg] = useState("");
  const [warningModal, openWarningModal] = useModal({
    innerTsx: <Text weight="medium">{warningMsg}</Text>,
    confirmTextOrButton: "Yes",
    cancelTextOrButton: "Cancel",
    onConfirm: () => {
      if (action === "symbols") updateSymbols.start();
      if (action === "catalogs") updateCatalogs.start();
      if (action === "sets") updateSets.start();
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
  const handleUpdateSets = useCallback(() => {
    setAction("sets");
    setWarningMsg("Are you sure you want to update ALL sets?");
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
  const updateSets = useUpdateAllSets({
    onError: (error) => {
      openStatusModal(error.message);
    },
  });

  // DATA STATES
  const [catalogNames, setCatalogNames] = useState<string[]>([]);
  const [symbols, setSymbols] = useState<ISymbol[]>([]);
  const [sets, setSets] = useState<string[]>([]);

  // FETCHES
  const FetchCatalogNames = useFetchGetCatalogNames(); // Get catalogs from MagicLotusAPI
  const FetchSymbols = useFetchSymbols(); // Get symbols from MagicLotusAPI
  const FetchSets = useFetchGetAllSetNames(); // Get sets from MagicLotusAPI

  useEffect(() => {
    updateTitle("Admin");
    const fetchCatalogNames = async () => {
      const res = await FetchCatalogNames.triggerFetch();
      if (res.object === "aborted") return;
      if (
        res.object === "magic_lotus_error" ||
        res.object === "network_error" ||
        res.object === "unknown_error"
      ) {
        setCatalogNames([]);
        openStatusModal(res.error);
        return;
      }
      setCatalogNames(res.data);
    };

    const fetchSymbols = async () => {
      const res = await FetchSymbols.triggerFetch();
      if (res.object === "aborted") return;
      if (
        res.object === "magic_lotus_error" ||
        res.object === "network_error" ||
        res.object === "unknown_error"
      ) {
        setSymbols([]);
        openStatusModal(res.error);
        return;
      }

      setSymbols(res.data);
    };

    const fetchSets = async () => {
      const res = await FetchSets.triggerFetch();
      if (res.object === "aborted") return;
      if (
        res.object === "magic_lotus_error" ||
        res.object === "network_error" ||
        res.object === "unknown_error"
      ) {
        setSets([]);
        openStatusModal(res.error);
        return;
      }
      setSets(res.data);
    };

    fetchCatalogNames();
    fetchSymbols();
    fetchSets();

    return () => {
      FetchCatalogNames.abort();
      FetchSymbols.abort();
      FetchSets.abort();
    };
  }, [updateSymbols.done, updateCatalogs.done, updateSets.done]);

  // TO DISPLAY ALL SETS
  const [isPending, startTranition] = useTransition();
  const [showRest, setShowRest] = useState(false);
  const toggleCollapse = useCallback(() => {
    startTranition(() => {
      setShowRest((prev) => !prev);
    });
  }, [showRest]);
  const renderedSets = useMemo(() => {
    return showRest ? sets : sets.slice(0, MINIMIZED_SETS_COUNT);
  }, [showRest, sets]);

  return (
    <>
      <Main id="admin-page">
        <Header title="Admin" />
        <div className="cards">
          <div className="left">
            <Card className="catalogs">
              {FetchCatalogNames.isLoading ? (
                <Spinner variant="pulse" size="medium" />
              ) : (
                <>
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
                            navigate(`/catalog/${cat}`);
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
                </>
              )}
            </Card>
            <Card className="symbols">
              {FetchSymbols.isLoading ? (
                <Spinner variant="pulse" size="medium" />
              ) : (
                <>
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
                  {updateSymbols.done && (
                    <Text size="l">Done updating symbols!</Text>
                  )}
                </>
              )}
            </Card>
          </div>
          <div className="right">
            <Card className="sets">
              {FetchSets.isLoading ? (
                <Spinner variant="pulse" size="medium" />
              ) : (
                <>
                  <Text size="xl" weight="medium" family="heading">
                    Sets:
                  </Text>
                  <div className="inner">
                    {FetchCatalogNames.isLoading ? (
                      <Spinner variant="pulse" size="x-large" />
                    ) : sets.length > 0 ? (
                      renderedSets.map((set, index) => (
                        <Button
                          key={index}
                          variant="link"
                          fontWeight="light"
                          fontSize="xs"
                          onClick={() => {
                            navigate(`/sets/${set}`);
                          }}
                        >
                          ● {set}
                        </Button>
                      ))
                    ) : (
                      <Text>No sets found.</Text>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    fontSize="xs"
                    onClick={toggleCollapse}
                  >
                    {isPending ? (
                      <Spinner variant="pulse" size="small" />
                    ) : showRest ? (
                      "Hide"
                    ) : (
                      `${sets.length - renderedSets.length} more...`
                    )}
                  </Button>

                  <Button onClick={handleUpdateSets}>
                    {updateSets.isLoading ? (
                      <Spinner size="medium" variant="pulse" />
                    ) : (
                      "Update sets"
                    )}
                  </Button>
                  {updateSets.done && <Text size="l">Done updating sets!</Text>}
                </>
              )}
            </Card>
          </div>
        </div>
        {warningModal}
      </Main>
    </>
  );
};

export default Admin;

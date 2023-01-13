import { createContext, useCallback, useState } from "react";
import { convertObjectToQuery } from "../helpers/QueryConverter";
import useNavigate from "../hooks/useNavigate/useNavigate";
import useUtility from "../hooks/useUtility/useUtility";
import ICard from "../models/scryfall/interfaces/ICard";
import IPaginated, {
  BLANK_PAGINATED_CARDS,
} from "../models/scryfall/types/Paginated";
import useFetchCardSearch, {
  ICardSearchParams,
} from "../services/scryfall/cards/Cards.search.service";

type NewHistory = {
  query: ICardSearchParams;
  data: IPaginated<ICard[]>;
};

type History = {
  id: number;
  query: ICardSearchParams;
  data: IPaginated<ICard[]>;
};

const BLANK_HISTORY: History = {
  id: -1,
  query: {
    q: "",
  },
  data: BLANK_PAGINATED_CARDS,
};

interface ISearchContext {
  history: History[];
  latestSearch: History;
  clearHistory: () => void;
  search: (params: ICardSearchParams) => Promise<void>;
  isLoading: boolean;
}

export const SearchContext = createContext<ISearchContext>({
  history: [],
  latestSearch: BLANK_HISTORY,
  clearHistory: () => {},
  search: async (params: ICardSearchParams) => {},
  isLoading: false,
});

interface IProps {
  children?: React.ReactNode;
}
export const SearchContextProvider = (props: IProps) => {
  const { openStatusModal } = useUtility();
  const { navigate } = useNavigate();
  const [currentHistory, setCurrentHistory] = useState<History[]>([]);

  // CALCULATE NEW ID FOR NEW HISTORY ENTRY
  const getNewId = useCallback(() => {
    let max = 0;
    currentHistory.forEach((entry) => {
      if (entry.id > max) max = entry.id;
    });
    return max + 1;
  }, [currentHistory]);

  const addToHistory = useCallback(
    (history: NewHistory) => {
      setCurrentHistory([
        ...currentHistory,
        {
          id: getNewId(),
          ...history,
        },
      ]);
    },
    [currentHistory]
  );
  const clearHistory = useCallback(() => {
    setCurrentHistory([]);
  }, []);

  const fetchSearchCards = useFetchCardSearch();
  const search = useCallback(async (params: ICardSearchParams) => {
    const res = await fetchSearchCards.triggerFetch({
      params: params,
    });
    if (res.object === "aborted") return;
    if (res.object === "error") {
      openStatusModal(res.details);
      return;
    }
    if (res.object === "network_error") {
      openStatusModal(res.error);
      return;
    }
    if (res.object === "unknown_error") {
      openStatusModal("Unknown error occured!");
      return;
    }

    console.log("RESULT: ", res.data);
    addToHistory({
      query: params,
      data: res,
    });
    navigate({
      pathname: "/results",
      search: convertObjectToQuery(params),
    });
  }, []);

  // CALC LATEST SEARCH
  const latest = currentHistory[currentHistory.length - 1]
    ? currentHistory[currentHistory.length - 1]
    : BLANK_HISTORY;
  return (
    <SearchContext.Provider
      value={{
        history: currentHistory,
        latestSearch: latest,
        clearHistory,
        search,
        isLoading: fetchSearchCards.isLoading,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

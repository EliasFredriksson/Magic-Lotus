import { createContext, useCallback, useState } from "react";
import ICard from "../models/scryfall/interfaces/ICard";
import IPaginated, {
  BLANK_PAGINATED_CARDS,
} from "../models/scryfall/types/Paginated";
import { ICardSearchParams } from "../services/scryfall/cards/Cards.search.service";

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
  addToHistory: (newHistory: NewHistory) => void;
  removeFromHistory: (currentHistory: History) => void;
  clearHistory: () => void;
  removeLastHistory: () => void;
}

export const SearchContext = createContext<ISearchContext>({
  history: [],
  latestSearch: BLANK_HISTORY,
  addToHistory: () => {},
  removeFromHistory: () => {},
  clearHistory: () => {},
  removeLastHistory: () => {},
});

interface IProps {
  children?: React.ReactNode;
}
export const SearchContextProvider = (props: IProps) => {
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
  const removeFromHistory = useCallback(
    (history: History) => {
      setCurrentHistory(
        currentHistory.filter((entry) => entry.id !== history.id)
      );
    },
    [currentHistory]
  );
  const clearHistory = useCallback(() => {
    setCurrentHistory([]);
  }, []);
  const removeLastHistory = useCallback(() => {
    setCurrentHistory([...currentHistory].splice(-1));
  }, [currentHistory]);

  const latest = currentHistory[currentHistory.length - 1]
    ? currentHistory[currentHistory.length - 1]
    : BLANK_HISTORY;
  return (
    <SearchContext.Provider
      value={{
        history: currentHistory,
        latestSearch: latest,
        addToHistory,
        removeFromHistory,
        clearHistory,
        removeLastHistory,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

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
  useFetchCardSearchRaw,
} from "../services/scryfall/cards/Cards.search.service";

interface ISearchOptions {
  raw?: boolean;
}
interface ISearchContext {
  latestSearch: IPaginated<ICard[]> | undefined;
  search: (
    params: ICardSearchParams | string,
    raw?: ISearchOptions
  ) => Promise<void>;
  isLoading: boolean;
}

export const SearchContext = createContext<ISearchContext>({
  latestSearch: undefined,
  search: async (
    params: ICardSearchParams | string,
    options?: ISearchOptions
  ) => {},
  isLoading: false,
});

interface IProps {
  children?: React.ReactNode;
}
export const SearchContextProvider = (props: IProps) => {
  const { openStatusModal } = useUtility();
  const { navigate } = useNavigate();

  const [data, setData] = useState<IPaginated<ICard[]>>();

  const fetchSearchCards = useFetchCardSearch();
  const fetchSearchCardsRaw = useFetchCardSearchRaw();
  const search = useCallback(
    async (params: ICardSearchParams | string, options?: ISearchOptions) => {
      if (typeof params === "string") {
        // ONLY SCENARIO MAYBE TO ALLOW "var". WILL PROBABLY CHANGE IN THE FUTIRE
        var res = await fetchSearchCardsRaw.triggerFetch({
          params: params,
        });
      } else {
        var res = await fetchSearchCards.triggerFetch({
          params: params,
        });
      }

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

      setData(res);

      if (res.data.length === 1) navigate(`/card/${res.data[0].id}`);
      else
        navigate({
          pathname: "/results",
          search: convertObjectToQuery(params),
        });
    },
    []
  );

  // CALC LATEST SEARCH

  return (
    <SearchContext.Provider
      value={{
        latestSearch: data,
        search,
        isLoading: fetchSearchCards.isLoading,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

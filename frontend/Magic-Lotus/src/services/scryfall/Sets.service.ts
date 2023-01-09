import useFetch from "../../hooks/useFetch/useFetch";
import ISet from "../../models/scryfall/interfaces/ISet";
import Paginated from "../../models/scryfall/types/Paginated";
import ScryfallError from "../../models/scryfall/types/ScryfallError";

// ################################ ROUTE ################################
// Get all sets from Scryfall
// GET      /sets
type GetSetsParams = {
  format: "json";
  pretty: boolean;
};
export const useFetchSetsFromScryfall = () => {
  return useFetch<Paginated<ISet[]>, ScryfallError, null, GetSetsParams>({
    base: "SCRYFALL",
    method: "GET",
    route: "/sets",
  });
};

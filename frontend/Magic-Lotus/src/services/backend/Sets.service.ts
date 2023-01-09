import useFetch from "../../hooks/useFetch/useFetch";
import MagicLotusError from "../../models/backend/types/MagicLotusError";
import MagicLotusResponse from "../../models/backend/types/MagicLotusResponse";
import ISet from "../../models/scryfall/interfaces/ISet";

// ################################ ROUTE ################################
// Get all sets
// GET     /sets
export const useFetchGetAllSets = () => {
  return useFetch<MagicLotusResponse<ISet[]>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: "/sets",
  });
};

// ################################ ROUTE ################################
// Create new set
// POST     /sets
type IPostSet = {
  set: ISet;
};
export const useFetchPostSet = () => {
  return useFetch<MagicLotusResponse<string>, MagicLotusError, IPostSet, null>({
    base: "BACKEND",
    method: "POST",
    route: "/sets",
  });
};

// ################################ ROUTE ################################
// Delete set by id
// DELETE     /sets/:id
export const useFetchDeleteCatalogById = (id: string) => {
  return useFetch<MagicLotusResponse<ISet>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "DELETE",
    route: `/sets/id/${id}`,
  });
};

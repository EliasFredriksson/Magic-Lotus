import useFetch from "../../hooks/useFetch/useFetch";
import ICatalog from "../../models/backend/interfaces/ICatalog";
import { default as ScryfallCatalog } from "../../models/scryfall/interfaces/ICatalog";
import MagicLotusError from "../../models/backend/types/MagicLotusError";
import MagicLotusResponse from "../../models/backend/types/MagicLotusResponse";
import ISymbol from "../../models/backend/interfaces/ISymbol";
import ICardSymbol from "../../models/scryfall/interfaces/ICardSymbol";

// ################################ ROUTE ################################
// Get all symbols
// GET     /symbols
export const useFetchSymbols = () => {
  return useFetch<MagicLotusResponse<ISymbol[]>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: "/symbols",
  });
};

// ################################ ROUTE ################################
// Get all mana symbols
// GET     /symbols
export const useFetchManaSymbols = () => {
  return useFetch<MagicLotusResponse<ISymbol[]>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: "/symbols/mana",
  });
};

// ################################ ROUTE ################################
// Create new symbol / update existing symbol
// POST     /symbols
type IPostSymbol = {
  symbol: ICardSymbol;
};
export const useFetchPostSymbol = () => {
  return useFetch<
    MagicLotusResponse<string>,
    MagicLotusError,
    IPostSymbol,
    null
  >({
    base: "BACKEND",
    method: "POST",
    route: "/symbols",
  });
};

// ################################ ROUTE ################################
// Get symbols by id
// GET     /symbols/:id
export const useFetchGetSymbolById = (id: string) => {
  return useFetch<MagicLotusResponse<ISymbol>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: `/symbols/${id}`,
  });
};

// ################################ ROUTE ################################
// Delete symbol by id
// DELETE     /symbols/:id
export const useFetchDeleteSymbolById = (id: string) => {
  return useFetch<MagicLotusResponse<ISymbol>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "DELETE",
    route: `/symbols/${id}`,
  });
};

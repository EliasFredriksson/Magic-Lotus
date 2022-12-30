import useFetch from "../../hooks/useFetch/useFetch";
import ICatalog from "../../models/backend/interfaces/ICatalog";
import { default as ScryfallCatalog } from "../../models/scryfall/interfaces/ICatalog";
import MagicLotusError from "../../models/backend/types/MagicLotusError";
import MagicLotusResponse from "../../models/backend/types/MagicLotusResponse";

// ################################ ROUTE ################################
// GET     /catalogs
export const useFetchGetCatalogs = () => {
  return useFetch<MagicLotusResponse<ICatalog[]>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: "/catalogs",
  });
};

// ################################ ROUTE ################################
// POST     /catalogs
type IPostCatalog = {
  category: string;
  data: ScryfallCatalog;
};
export const useFetchPostCatalog = () => {
  return useFetch<
    MagicLotusResponse<string>,
    MagicLotusError,
    IPostCatalog,
    null
  >({
    base: "BACKEND",
    method: "POST",
    route: "/catalogs",
  });
};

// ################################ ROUTE ################################
// GET     /catalogs/names
export const useFetchGetCatalogNames = () => {
  return useFetch<MagicLotusResponse<string[]>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: "/catalogs/names",
  });
};

// ################################ ROUTE ################################
// GET     /catalogs/:name
export const useFetchGetCatalogByName = (name: string) => {
  return useFetch<MagicLotusResponse<ICatalog>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: `/catalogs/${name}`,
  });
};

// ################################ ROUTE ################################
// GET     /catalogs/id/:id
export const useFetchGetCatalogById = (id: string) => {
  return useFetch<MagicLotusResponse<ICatalog>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: `/catalogs/id/${id}`,
  });
};

// ################################ ROUTE ################################
// PUT     /catalogs/:id
// export const useFetchPutCatalogById = (id: string) => {
//   return useFetch<MagicLotusResponse<ICatalog>, MagicLotusError, null, null>({
//     base: "BACKEND",
//     method: "GET",
//     route: `/catalogs/id/${id}`,
//   });
// };

// ################################ ROUTE ################################
// DELETE     /catalogs/:id
export const useFetchDeleteCatalogById = (id: string) => {
  return useFetch<MagicLotusResponse<ICatalog>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "DELETE",
    route: `/catalogs/id/${id}`,
  });
};

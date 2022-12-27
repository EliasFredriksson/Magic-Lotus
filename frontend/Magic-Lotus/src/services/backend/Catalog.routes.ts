// ALL CATALOG ROUTES FOR BACKEND USERS
const CATALOG_ROUTES = {
  POST_CATALOG: () => "/catalogs",
  GET_CATALOGS: () => "/catalogs",
  GET_CATALOG_NAMES: () => `/catalogs/names`,
  GET_CATALOG_BY_CATEGORY_NAME: (name: string) => `/catalogs/${name}`,
  GET_CATALOG_BY_ID: (id: string) => `/catalogs/id/${id}`,
  PUT_CATALOG_BY_ID: (id: string) => `/catalogs/${id}`,
  DELETE_CATALOG_BY_ID: (id: string) => `/catalogs/${id}`,
} as const;
export default CATALOG_ROUTES;

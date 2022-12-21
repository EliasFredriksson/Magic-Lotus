// ALL CATALOG ROUTES FOR BACKEND USERS
export const POST_CATALOG = () => "/catalogs";
export const GET_CATALOGS = () => "/catalogs";
export const GET_CATALOG_NAMES = () => "/catalogs/names";
export const GET_CATALOG_BY_ID = (id: string) => `/catalogs/id/${id}`;
export const GET_CATALOG_BY_CATEGORY_NAME = (name: string) =>
  `/catalogs/${name}`;
export const PUT_CATALOG_BY_ID = (id: string) => `/catalogs/${id}`;
export const DELETE_CATALOG_BY_ID = (id: string) => `/catalogs/${id}`;

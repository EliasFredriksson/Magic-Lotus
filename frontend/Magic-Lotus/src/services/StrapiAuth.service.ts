// ###########################
// GET    /auth
// ----------

import useFetch from "../hooks/useFetch/useFetch";

// ROUTE
export const ROUTE_STRAPI_AUTH = "auth/";
// QUERY PARAMETERS
export interface IStrapiAuthBody {
  identifier: string;
  password: string;
}
// RETURN TYPE
// ###########################

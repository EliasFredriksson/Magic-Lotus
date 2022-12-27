import useFetch from "../../hooks/useFetch/useFetch";
import IUser from "../../models/backend/interfaces/IUser";
import MagicLotusError from "../../models/backend/types/MagicLotusError";
import MagicLotusResponse from "../../models/backend/types/MagicLotusResponse";

// ALL CARDS ROUTES FOR BACKEND USERS
// export const POST_USERS_LOGIN = () => "/users/login";
// export const POST_USERS_LOGOUT = () => "/users/logout";
// export const GET_USER_PROFILE = () => `/users/`;
// export const GET_USER_PUBLIC_PROFILE = (id: string) => `/users/${id}`;

// ################################ ROUTE ################################
// POST     /users/login
type LoginParams = {
  email: string;
  password: string;
};
export const useFetchPostUserLogin = () => {
  return useFetch<
    MagicLotusResponse<IUser>,
    MagicLotusError,
    LoginParams,
    null
  >({
    base: "BACKEND",
    method: "POST",
    route: "/users/login",
  });
};

// ################################ ROUTE ################################
// POST     /users/logout

export const useFetchPostUserLogout = () => {
  return useFetch<MagicLotusResponse<string>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "POST",
    route: "/users/logout",
  });
};

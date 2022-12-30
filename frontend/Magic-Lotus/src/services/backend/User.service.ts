import useFetch from "../../hooks/useFetch/useFetch";
import IUser from "../../models/backend/interfaces/IUser";
import MagicLotusError from "../../models/backend/types/MagicLotusError";
import MagicLotusResponse from "../../models/backend/types/MagicLotusResponse";

// ################################ ROUTE ################################
// Login the user.
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
// Log out the current user
// POST     /users/logout
export const useFetchPostUserLogout = () => {
  return useFetch<MagicLotusResponse<string>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "POST",
    route: "/users/logout",
  });
};

// ################################ ROUTE ################################
// Create a new user
// POST     /users
type PostNewUser = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};
export const useFetchPostUser = () => {
  return useFetch<
    MagicLotusResponse<string>,
    MagicLotusError,
    PostNewUser,
    null
  >({
    base: "BACKEND",
    method: "POST",
    route: "/users",
  });
};

// ################################ ROUTE ################################
// Delete a user by id
// DELETE     /users/:id
export const useFetchDeleteUserById = (id: string) => {
  return useFetch<MagicLotusResponse<string>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "DELETE",
    route: `/users/${id}`,
  });
};

// ################################ ROUTE ################################
// Get the currently logged in user.
// GET     /users
export const useFetchGetLoggedInUser = () => {
  return useFetch<MagicLotusResponse<IUser>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: "/users",
  });
};

// ################################ ROUTE ################################
// Get the user by id (ONLY ACCESSABLE BY ADMINS CURRENTLY)
// GET     /users
export const useFetchGetUserById = (id: string) => {
  return useFetch<MagicLotusResponse<IUser>, MagicLotusError, null, null>({
    base: "BACKEND",
    method: "GET",
    route: `/users/${id}`,
  });
};

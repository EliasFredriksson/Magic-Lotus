// ALL CARDS ROUTES FOR BACKEND USERS
export const POST_USERS_LOGIN = () => "/users/login";
export const POST_USERS_LOGOUT = () => "/users/logout";
export const GET_USER_PROFILE = () => `/users/`;
export const GET_USER_PUBLIC_PROFILE = (id: string) => `/users/${id}`;

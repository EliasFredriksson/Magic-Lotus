import { createContext, useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch/useFetch";
import useObjectState from "../hooks/useObjectState/useObjectState";
import IServiceResponse from "../models/backend/interfaces/IServiceResponse";
import IUser, { BLANK_IUSER } from "../models/backend/interfaces/IUser";
import { POST_USERS_LOGOUT } from "../services/backend/Users.routes";

interface IAuthContext {
  credentials: IUser;
  logout: () => void;
  login: (data: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({
  credentials: BLANK_IUSER,
  logout: () => {},
  login: () => {},
});

interface IProps {
  children?: React.ReactNode;
}
export const AuthContextProvider = (props: IProps) => {
  const [user, setUser] = useObjectState<IUser>(BLANK_IUSER);

  const FetchLogout = useFetch<IServiceResponse<string>>({
    route: POST_USERS_LOGOUT(),
    base: "BACKEND",
    method: "POST",
  });

  const logout = useCallback(async () => {
    setUser(BLANK_IUSER);
    const res = await FetchLogout.triggerFetch();
  }, []);
  const login = useCallback((data: IUser) => {
    setUser(data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        credentials: user,
        logout,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

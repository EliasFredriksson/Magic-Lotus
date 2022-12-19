import { createContext, useCallback, useEffect, useState } from "react";
import AuthRole from "../hooks/useAuth/AuthRole";
import useFetch from "../hooks/useFetch/useFetch";
import useObjectState from "../hooks/useObjectState/useObjectState";
import {
  BLANK_STRAPI_USER,
  IStrapiUser,
} from "../models/strapi/interfaces/IStrapiUser";

interface ICredentials {
  user: IStrapiUser;
  jwt: string;
  role: AuthRole;
}

interface IAuthContext {
  credentials: ICredentials;
  logout: () => void;
  login: (data: Partial<ICredentials>) => void;
}

export const AuthContext = createContext<IAuthContext>({
  credentials: { user: BLANK_STRAPI_USER, jwt: "", role: "Public" },
  logout: () => {},
  login: () => {},
});

interface IProps {
  children?: React.ReactNode;
}
export const AuthContextProvider = (props: IProps) => {
  const [user, setUser] = useObjectState<IStrapiUser>(BLANK_STRAPI_USER);
  const [role, setRole] = useState<AuthRole>("Public");
  const [jwt, setJwt] = useState("");

  const FetchUser = useFetch<null, null, any>({
    base: "STRAPI",
    route: "/users/me",
    method: "GET",
  });

  const logout = useCallback(() => {
    setUser(BLANK_STRAPI_USER);
    setRole("Public");
    setJwt("");
  }, []);
  const login = useCallback((data: Partial<ICredentials>) => {
    if (data.user) setUser(data.user);
    if (data.jwt) setJwt(data.jwt);
    if (data.role) setRole(data.role);

    FetchUser.triggerFetch({
      headers: {
        Authentication: `Bearer ${data.jwt}`,
      },
    });
  }, []);

  useEffect(() => {
    console.log("CREDENTIALS: ");
    console.table({ role, jwt });
    console.table(user);
  }, [user, role, jwt]);

  return (
    <AuthContext.Provider
      value={{
        credentials: {
          user,
          role,
          jwt,
        },
        logout,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

import { createContext, useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch/useFetch";
import useObjectState from "../hooks/useObjectState/useObjectState";
import IServiceResponse from "../models/backend/types/MagicLotusResponse";
import IUser, { BLANK_IUSER } from "../models/backend/interfaces/IUser";
import { POST_USERS_LOGOUT } from "../services/backend/Users.routes";
import { useFetchPostUserLogout } from "../services/backend/User.service";
import useModal from "../hooks/useModal/useModal";
import useUtility from "../hooks/useUtility/useUtility";

interface IAuthContext {
  credentials: IUser;
  logout: () => void;
  login: (data: IUser) => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  credentials: BLANK_IUSER,
  logout: () => {},
  login: () => {},
  isLoggedIn: false,
});

interface IProps {
  children?: React.ReactNode;
}
export const AuthContextProvider = (props: IProps) => {
  const { openStatusModal } = useUtility();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useObjectState<IUser>(BLANK_IUSER);

  const FetchLogout = useFetchPostUserLogout();

  const logout = useCallback(async () => {
    const res = await FetchLogout.triggerFetch();
    console.log("LOGOUT RES: ", res);

    if (res.object === "aborted") return;
    if (res.object === "magic_lotus_error") {
      openStatusModal(res.error);
      return;
    }

    setUser(BLANK_IUSER);
    setIsLoggedIn(false);
    openStatusModal("Logout successful!");
  }, []);
  const login = useCallback((data: IUser) => {
    setUser(data);
    setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        credentials: user,
        logout,
        login,
        isLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

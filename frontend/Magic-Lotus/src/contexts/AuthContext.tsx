import { createContext, useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch/useFetch";
import useObjectState from "../hooks/useObjectState/useObjectState";
import IServiceResponse from "../models/backend/types/MagicLotusResponse";
import IUser, { BLANK_IUSER } from "../models/backend/interfaces/IUser";
import { POST_USERS_LOGOUT } from "../services/backend/Users.routes";
import { useFetchPostUserLogout } from "../services/backend/User.service";
import useModal from "../hooks/useModal/useModal";

interface IAuthContext {
  credentials: IUser;
  logout: () => void;
  login: (data: IUser) => void;
  openStatusModal: (msg: string) => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  credentials: BLANK_IUSER,
  logout: () => {},
  login: () => {},
  openStatusModal: (msg: string) => {},
  isLoggedIn: false,
});

interface IProps {
  children?: React.ReactNode;
}
export const AuthContextProvider = (props: IProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useObjectState<IUser>(BLANK_IUSER);

  const FetchLogout = useFetchPostUserLogout();

  const logout = useCallback(async () => {
    const res = await FetchLogout.triggerFetch();
    console.log("LOGOUT RES: ", res);

    if (res.object === "aborted") return;
    if (res.object === "magic_lotus_error") {
      setMsg(res.error);
      openModal();
      return;
    }

    setUser(BLANK_IUSER);
    setIsLoggedIn(false);
    setMsg("Logout successful!");
    openModal();
  }, []);
  const login = useCallback((data: IUser) => {
    setUser(data);
    setIsLoggedIn(true);
  }, []);

  const [msg, setMsg] = useState("");
  const [statusModal, openModal] = useModal({
    innerTsx: <span>{msg}</span>,
    confirmTextOrButton: "Ok",
  });

  const openStatusModal = useCallback((msg: string) => {
    setMsg(msg);
    openModal();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        credentials: user,
        logout,
        login,
        openStatusModal,
        isLoggedIn,
      }}
    >
      {props.children}
      {statusModal}
    </AuthContext.Provider>
  );
};

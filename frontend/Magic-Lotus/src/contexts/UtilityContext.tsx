import { createContext, useCallback, useEffect, useState } from "react";
import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useModal from "../hooks/useModal/useModal";

type UtilityContext = {
  openStatusModal: (msg: string) => void;
};

export const UtilityContext = createContext<UtilityContext>({
  openStatusModal: (msg: string) => {},
});

interface IProps {
  children?: React.ReactNode;
}
export const UtilityContextProvider = (props: IProps) => {
  const [statusMsg, setStatusMsg] = useState("");
  const [statusModal, openModal] = useModal({
    innerTsx: <span>{statusMsg}</span>,
    confirmTextOrButton: "Ok",
  });

  const openStatusModal = useCallback((msg: string) => {
    setStatusMsg(msg);
    openModal();
  }, []);

  return (
    <UtilityContext.Provider
      value={{
        openStatusModal,
      }}
    >
      {props.children}
      {statusModal}
    </UtilityContext.Provider>
  );
};

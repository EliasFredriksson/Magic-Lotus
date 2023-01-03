import { createContext, useCallback, useEffect, useState } from "react";
import useModal from "../hooks/useModal/useModal";

type UtilityContext = {
  openStatusModal: (msg: string) => void;
  updateTitle: (title: string) => void;
};

export const UtilityContext = createContext<UtilityContext>({
  openStatusModal: (msg: string) => {},
  updateTitle: (title: string) => {},
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

  const [title, setTitle] = useState("Magic Lotus");
  const updateTitle = useCallback((title: string) => {
    setTitle(title);
  }, []);
  // ON MOUNT,  UPDATE DOCUMENT TITLE
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <UtilityContext.Provider
      value={{
        openStatusModal,
        updateTitle,
      }}
    >
      {props.children}
      {statusModal}
    </UtilityContext.Provider>
  );
};

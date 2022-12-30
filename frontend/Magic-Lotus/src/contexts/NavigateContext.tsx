import { createContext, useCallback, useEffect, useState } from "react";
import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";

type NavigateContext = {
  show: boolean;
  setShow: (show: boolean) => void;
  navigate: (to: To | number, options?: NavigateOptions) => void;
  goToPage: () => void;
};

export const NavigateContext = createContext<NavigateContext>({
  show: false,
  setShow: (show: boolean) => {},
  navigate: (to: To | number, options?: NavigateOptions) => {},
  goToPage: () => {},
});

interface IProps {
  children?: React.ReactNode;
}
export const NavigateContextProvider = (props: IProps) => {
  const [show, setShow] = useState(true);
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [to, setTo] = useState<To>();
  const [navOptions, setNavOptions] = useState<NavigateOptions>();
  const [goBack, setGoBack] = useState(false);
  const navigate = useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (to === pathname) return; // INGORE NAVIGATIONS TO SAME PATH
      if (typeof to === "number") {
        setGoBack(true);
        setShow(false);
      } else {
        setTo(to);
        setNavOptions(options);
        setShow(false);
      }
    },
    [pathname]
  );

  const goToPage = useCallback(() => {
    if (goBack) {
      setGoBack(false);
      nav(-1);
    } else if (to) {
      setTo(undefined);
      nav(to, navOptions);
    }
    setShow(true);
  }, [to, navOptions, goBack]);

  return (
    <NavigateContext.Provider
      value={{
        navigate,
        show,
        setShow,
        goToPage,
      }}
    >
      {props.children}
    </NavigateContext.Provider>
  );
};

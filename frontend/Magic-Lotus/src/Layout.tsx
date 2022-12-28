import {
  NavigateFunction,
  NavigateOptions,
  Outlet,
  To,
  useNavigate,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Suspense, useCallback, useState } from "react";
import Loader from "./components/Loader/Loader";

const Layout = () => {
  const [show, setShow] = useState(true);
  const nav = useNavigate();

  const [to, setTo] = useState<To>();
  const [navOptions, setNavOptions] = useState<NavigateOptions>();
  const [goBack, setGoBack] = useState(false);
  const navigate = useCallback((to: To | number, options?: NavigateOptions) => {
    if (typeof to === "number") {
      setGoBack(true);
      setShow(false);
    } else {
      setTo(to);
      setNavOptions(options);
      setShow(false);
    }
  }, []);

  const goToPage = useCallback(() => {
    if (goBack) {
      setGoBack(false);
      nav(-1);
      return;
    }
    if (to) {
      setTo(undefined);
      nav(to, navOptions);
      return;
    }
  }, [to, navOptions, goBack]);

  return (
    <div
      className="layout"
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Suspense fallback={<Loader />}>
        <div
          className="layout"
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet
            context={{
              show,
              setShow: (show: boolean) => {
                setShow(show);
              },
              navigate,
              goToPage,
            }}
          />
        </div>
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

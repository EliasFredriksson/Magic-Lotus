import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Layout = () => {
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
          <Outlet />
        </div>
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

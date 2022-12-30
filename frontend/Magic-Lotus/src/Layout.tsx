import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Layout = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;

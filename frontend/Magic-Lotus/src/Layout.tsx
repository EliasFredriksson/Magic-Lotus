import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

export default Layout;

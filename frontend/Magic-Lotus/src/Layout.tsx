import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

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
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

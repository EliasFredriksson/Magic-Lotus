import "./layout.scss";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <main className="layout">
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;

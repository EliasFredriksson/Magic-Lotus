import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { motion } from "framer-motion";
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
        <motion.div
          className="layout"
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
          transition={{
            type: "spring",
            stiffness: 800,
            damping: 50,
          }}
          initial={{
            opacity: 0,
            scale: 1.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.1,
            },
          }}
        >
          <Outlet />
        </motion.div>
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <Flex
      direction="column"
      position="relative"
      backgroundColor="primary.800"
      flexGrow={1}
    >
      <Navbar />
      <Flex flexGrow={1} direction="column">
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;

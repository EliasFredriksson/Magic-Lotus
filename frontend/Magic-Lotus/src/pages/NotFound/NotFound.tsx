import { useEffect } from "react";
import Main from "../../components/Main/Main";
import useUtility from "../../hooks/useUtility/useUtility";
import "./notFound.scss";

const NotFound = () => {
  const { updateTitle } = useUtility();

  useEffect(() => {
    updateTitle("404 - Not found");
  }, []);

  return <Main id="not-found-page">404</Main>;
};

export default NotFound;

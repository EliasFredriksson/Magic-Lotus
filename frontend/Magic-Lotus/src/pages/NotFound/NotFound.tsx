import { useEffect } from "react";
import Button from "../../components/Button/Button";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useUtility from "../../hooks/useUtility/useUtility";
import "./notFound.scss";

const NotFound = () => {
  const { updateTitle } = useUtility();
  const { navigate } = useNavigate();

  useEffect(() => {
    updateTitle("404 - Not found");
  }, []);

  return (
    <Main id="not-found-page">
      <Text as="h3" align="center">
        Oops!
      </Text>
      <Text>The page you navigated to does not exists.</Text>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </Button>
    </Main>
  );
};

export default NotFound;

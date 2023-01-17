import "./header.scss";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../Button/Button";
import Text from "../Text/Text";
import useRouterContext from "../../hooks/useNavigate/useNavigate";

interface Props {
  title?: string | React.ReactNode;
  "data-testid"?: string;
}

const Header = (props: Props) => {
  const { navigate } = useRouterContext();
  return (
    <header
      className="page-header"
      data-testid={props["data-testid"] ? props["data-testid"] : undefined}
    >
      <Button
        variant="icon"
        fontSize="xxxxl"
        fontWeight="bold"
        className="back-button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoArrowBackOutline />
      </Button>
      <Text size="xxxl" family="heading">
        {props.title}
      </Text>
    </header>
  );
};

export default Header;

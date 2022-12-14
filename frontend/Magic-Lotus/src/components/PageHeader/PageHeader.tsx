import "./pageHeader.scss";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../Button/Button";
import Text from "../Text/Text";
import useRouterContext from "../../hooks/useNavigate/useNavigate";

type Props = {
  title?: string | React.ReactNode;
};

const PageHeader = (props: Props) => {
  const { navigate } = useRouterContext();
  return (
    <header className="page-header">
      <Button
        variant="icon"
        fontSize="xxxxxl"
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

export default PageHeader;

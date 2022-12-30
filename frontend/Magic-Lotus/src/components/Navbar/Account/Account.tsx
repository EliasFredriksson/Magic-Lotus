import "./account.scss";
import useAuth from "../../../hooks/useAuth/useAuth";
import { PUBLIC_FOLDER } from "../../../Public";
import Button from "../../Button/Button";
import Text from "../../Text/Text";
import Image from "../../Image/Image";
import useNavigate from "../../../hooks/useNavigate/useNavigate";

type Props = {
  closeMenu?: () => void;
};

const Account = (props: Props) => {
  const { credentials, logout, isLoggedIn } = useAuth();

  const { navigate } = useNavigate();

  return isLoggedIn ? (
    <div className="account-component">
      <div>
        <Text
          size="l"
          onClick={() => {
            if (props.closeMenu) props.closeMenu();
            navigate("/profile");
          }}
        >
          {credentials.username}
        </Text>
        <Button
          variant="link"
          fontSize="s"
          onClick={() => {
            if (props.closeMenu) props.closeMenu();
            logout();
          }}
        >
          Logout
        </Button>
      </div>
      <Image
        imageUrl={PUBLIC_FOLDER.IMAGES.USERS.DEFAULT} // USER PROFILE IMAGE HERE
        fallbackImageUrl={PUBLIC_FOLDER.IMAGES.USERS.DEFAULT}
        spinnerSize="medium"
        imageSize={{
          width: "5rem",
          height: "5rem",
        }}
        borderRadius="50%"
        onClick={() => {
          if (props.closeMenu) props.closeMenu();
          navigate("/profile");
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default Account;

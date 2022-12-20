import "./navBar.scss";
import { useNavigate } from "react-router-dom";

import NAVBAR_CONFIGS from "../../constants/NAVBAR_CONFIG";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { credentials, logout } = useAuth();
  return (
    <nav className="main-navbar">
      {NAVBAR_CONFIGS[credentials.role].map((link, index) =>
        link.text === "Logout" ? (
          <Button key={index} onClick={logout}>
            {link.text}
          </Button>
        ) : (
          <Button
            key={link.to}
            onClick={() => {
              navigate(link.to);
            }}
          >
            {link.text}
          </Button>
        )
      )}
    </nav>
  );
};

export default Navbar;

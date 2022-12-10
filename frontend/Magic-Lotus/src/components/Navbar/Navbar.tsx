import "./navBar.scss";
import { useNavigate } from "react-router-dom";

import NAVBAR_CONFIGS from "../../constants/NAVBAR_CONFIG";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="main-navbar">
      <div>
        {NAVBAR_CONFIGS.default.map((link) => (
          <button
            key={link.to}
            onClick={() => {
              navigate(link.to);
            }}
          >
            {link.text}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

import AuthRole from "../hooks/useAuth/AuthRole";
import { FaHome } from "react-icons/fa";

type INavbarConfig = {
  [Property in AuthRole]: { to: string; text: React.ReactNode }[];
};
const NAVBAR_CONFIGS: INavbarConfig = {
  Public: [
    {
      to: "/",
      text: <FaHome />,
    },
    {
      to: "/search",
      text: "Search cards",
    },
    {
      to: "/login",
      text: "Login",
    },
    {
      to: "/register",
      text: "Register",
    },
  ],
  User: [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/search",
      text: "Search cards",
    },
    {
      to: "/profile",
      text: "Profile",
    },
    {
      to: "/logout",
      text: "Logout",
    },
  ],
  Admin: [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/search",
      text: "Search cards",
    },
    {
      to: "/profile",
      text: "Profile",
    },
    {
      to: "/logout",
      text: "Logout",
    },
  ],
};
export default NAVBAR_CONFIGS;

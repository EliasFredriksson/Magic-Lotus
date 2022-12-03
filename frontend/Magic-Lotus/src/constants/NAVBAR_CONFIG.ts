interface INavbarConfig {
  default: { to: string; text: string }[];
  [role: string]: { to: string; text: string }[];
}
const NAVBAR_CONFIGS: INavbarConfig = {
  default: [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/login",
      text: "Login",
    },
  ],
  loggedIn: [
    {
      to: "/",
      text: "Home",
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

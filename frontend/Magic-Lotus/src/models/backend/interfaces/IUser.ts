import AuthRole from "../../../hooks/useAuth/AuthRole";

export default interface IUser {
  id: string;
  username: string;
  email: string;
  role: AuthRole;
}

export const BLANK_IUSER: IUser = {
  id: "",
  username: "",
  email: "",
  role: "public",
};

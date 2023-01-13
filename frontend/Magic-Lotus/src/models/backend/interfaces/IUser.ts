import AuthRole from "../../../hooks/useAuth/AuthRole";
import IImage, { BLANK_IIMAGE } from "./IImage";

export default interface IUser {
  id: string;
  username: string;
  email: string;
  role: AuthRole;
  image?: IImage;
}

export const BLANK_IUSER: IUser = {
  id: "",
  username: "",
  email: "",
  role: "public",
  image: BLANK_IIMAGE,
};

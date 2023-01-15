import AuthRole from "../../../hooks/useAuth/AuthRole";
import IData from "./IData";
import IImage, { BLANK_IIMAGE } from "./IImage";

type IFavoriteCard = {
  id: string;
  name: string;
  imageUrl: string;
};

export default interface IUser {
  id: string;
  username: string;
  email: string;
  role: AuthRole;
  image?: IImage;
  favoriteCards: IFavoriteCard[];
}

export const BLANK_IUSER: IUser = {
  id: "",
  username: "",
  email: "",
  role: "public",
  image: BLANK_IIMAGE,
  favoriteCards: [],
};

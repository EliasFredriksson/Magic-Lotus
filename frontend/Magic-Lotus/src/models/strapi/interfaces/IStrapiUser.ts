import AuthRole from "../../../hooks/useAuth/AuthRole";

export interface IStrapiUser {
  username: string;
  id: number;
  email: string;
  // OTHER INFO
  confirmed: boolean;
  blocked: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export const BLANK_STRAPI_USER: IStrapiUser = {
  username: "",
  id: -1,
  email: "",
  // OTHER
  confirmed: false,
  blocked: false,
  provider: "",
  createdAt: "",
  updatedAt: "",
};

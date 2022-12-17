import { BLANK_STRAPI_USER, IStrapiUser } from "./IStrapiUser";

export interface IStrapiLogin {
  user: IStrapiUser;
  jwt: string;
}

export const BLANK_STRAPI_LOGIN: IStrapiLogin = {
  user: BLANK_STRAPI_USER,
  jwt: "",
};

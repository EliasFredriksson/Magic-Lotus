import { ILanguageCode } from "../../constants/LANGUAGE_DATA";

// ALL CARDS ROUTES FOR SCRYFALL API
export const GET_CARDS_SEARCH = () => "/cards/search";
export const GET_CARDS_NAMED = () => "/cards/named";
export const GET_CARDS_AUTOCOMPLETE = () => "/cards/autocomplete";
export const GET_CARDS_RANDOM = () => "/cards/random";
export const GET_CARDS_COLLECTION = () => "/cards/collection";
export const GET_CARDS_BY_CODE_NUMBER_LANG = (
  code: string,
  number: number,
  lang?: ILanguageCode
) => `/cards/${code}/${number}` + (lang ? `/${lang}` : "");
export const GET_CARDS_MULTIVERSE_BY_ID = (id: number) =>
  `/cards/multiverse/${id}`;
export const GET_CARDS_MTGO_BY_ID = (id: number) => `/cards/mtgo/${id}`;

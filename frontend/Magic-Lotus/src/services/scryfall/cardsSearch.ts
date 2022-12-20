type Unique = "cards" | "art" | "prints";
type Order =
  | "name"
  | "set"
  | "released"
  | "rarity"
  | "color"
  | "usd"
  | "tix"
  | "eur"
  | "cmc"
  | "power"
  | "toughness"
  | "edhrec"
  | "penny"
  | "artist"
  | "review";
// SORTING ORDER
type Dir = "auto" | "asc" | "desc";

// ROUTE
export const GET_CARDS_SEARCH = "/cards/search";
// QUERY PARAMS
export default interface ICardSearchParams {
  q: string; // A fulltext search query. Make sure that your parameter is properly encoded. Maximum length: 1000 Unicode characters.
  unique?: Unique; // The strategy for omitting similar cards. See above.
  order?: Order; // The method to sort returned cards. See above.
  dir?: Dir; // The direction to sort cards. See above.
  include_extras?: boolean; // If true, extra cards (tokens, planes, etc) will be included. Equivalent to adding include:extras to the fulltext search. Defaults to false.
  include_multilingual?: boolean; // If true, cards in every language supported by Scryfall will be included. Defaults to false.
  include_variations?: boolean; // If true, rare care variants will be included, like the Hairy Runesword. Defaults to false.
  page?: number; // Page number, default = 1;
  format?: "json" | "csv"; // The data format to return: json or csv. Defaults to json.
  pretty?: boolean; // If true, the returned JSON will be prettified. Avoid using for production code.
}

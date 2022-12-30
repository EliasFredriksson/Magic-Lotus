import useFetch from "../../hooks/useFetch/useFetch";
import ICardSymbol from "../../models/scryfall/interfaces/ICardSymbol";
import ColorAbbveration from "../../models/scryfall/types/ColorAbbveration";
import ScryfallError from "../../models/scryfall/types/ScryfallError";
import Paginated from "../../models/scryfall/types/Paginated";

// ################################ ROUTE ################################
// Get all symbols from Scryfall
// GET      /symbology
type GetSymbologyParams = {
  format: "json";
  pretty: boolean;
};
export const useFetchSymbology = () => {
  return useFetch<
    Paginated<ICardSymbol[]>,
    ScryfallError,
    null,
    GetSymbologyParams
  >({
    base: "SCRYFALL",
    method: "GET",
    route: "/symbology",
  });
};

// ################################ ROUTE ################################
// Parse a string and get back an object telling which symbols are used in the text.
// GET      /symbology/parse-mana
type ParseManaParams = {
  cost: string; // The mana string to parse.
  format?: "json"; // The data format to return. This method only supports json.
  pretty?: boolean; // If true, the returned JSON will be prettified. Avoid using for production code.
};
type ParsedMana = {
  object: "mana_cost";
  cost: string; // The normalized cost, with correctly-ordered and wrapped mana symbols.
  cmc: number; // The converted mana cost. If you submit Un-set mana symbols, this decimal could include fractional parts.
  colors: ColorAbbveration[]; // The colors of the given cost.
  colorless: boolean; // True if the cost is colorless.
  monocolored: boolean; // True if the cost is monocolored.
  multicolored: boolean; // True if the cost is multicolored.
};
export const useFetchSymbologyParseMana = () => {
  return useFetch<ParsedMana, ScryfallError, null, ParseManaParams>({
    base: "SCRYFALL",
    method: "GET",
    route: "/symbology/parse-mana",
  });
};

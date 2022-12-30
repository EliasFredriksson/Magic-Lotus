import ColorAbbveration from "../../scryfall/types/ColorAbbveration";

export default interface ISymbol {
  symbol: string;
  loose_variants?: string;
  english: string;
  transposable: boolean;
  represents_mana: boolean;
  cmc?: Number;
  appears_in_mana_costs: boolean;
  funny: boolean;
  colors: ColorAbbveration[];
  gatherer_alternates?: string;
  svg_uri?: string;
}

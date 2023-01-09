import BasicLand from "../models/scryfall/types/BasicLand";
import ColorAbbveration from "../models/scryfall/types/ColorAbbveration";
import ColorName from "../models/scryfall/types/ColorName";
// import ColorAbbveration from "../models/types/ColorAbbveration";

// COLOR MANA SYMBOLS PUBLIC PATHS
const MANA_SYMBOL_URLS = [
  "/Mana_Symbols/Plains.svg",
  "/Mana_Symbols/Island.svg",
  "/Mana_Symbols/Swamp.svg",
  "/Mana_Symbols/Mountain.svg",
  "/Mana_Symbols/Forest.svg",
] as const;
export type ColorSymbol = typeof MANA_SYMBOL_URLS[number];

// ############ COLOR DATA ############
type Color = {
  [Property in BasicLand]: {
    abbveration: ColorAbbveration;
    color: ColorName;
    symbol: string;
    symbolUrl: ColorSymbol;
  };
};
const COLOR_DATA: Color = {
  Plains: {
    abbveration: "W",
    color: "White",
    symbol: "{W}",
    symbolUrl: "/Mana_Symbols/Plains.svg",
  },
  Island: {
    abbveration: "U",
    color: "Blue",
    symbol: "{U}",
    symbolUrl: "/Mana_Symbols/Island.svg",
  },
  Swamp: {
    abbveration: "B",
    color: "Black",
    symbol: "{B}",
    symbolUrl: "/Mana_Symbols/Swamp.svg",
  },
  Mountain: {
    abbveration: "R",
    color: "Red",
    symbol: "{R}",
    symbolUrl: "/Mana_Symbols/Mountain.svg",
  },
  Forest: {
    abbveration: "G",
    color: "Green",
    symbol: "{G}",
    symbolUrl: "/Mana_Symbols/Forest.svg",
  },
};
export default COLOR_DATA;

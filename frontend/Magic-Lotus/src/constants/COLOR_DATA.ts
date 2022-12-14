import BasicLand from "../models/types/BasicLand";
import ColorAbbveration from "../models/types/ColorAbbveration";
import ColorName from "../models/types/ColorName";

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
    symbolUrl: ColorSymbol;
  };
};
const COLOR_DATA: Color = {
  Plains: {
    abbveration: "W",
    color: "White",
    symbolUrl: "/Mana_Symbols/Plains.svg",
  },
  Island: {
    abbveration: "U",
    color: "Blue",
    symbolUrl: "/Mana_Symbols/Island.svg",
  },
  Swamp: {
    abbveration: "B",
    color: "Black",
    symbolUrl: "/Mana_Symbols/Swamp.svg",
  },
  Mountain: {
    abbveration: "R",
    color: "Red",
    symbolUrl: "/Mana_Symbols/Mountain.svg",
  },
  Forest: {
    abbveration: "G",
    color: "Green",
    symbolUrl: "/Mana_Symbols/Forest.svg",
  },
};
export default COLOR_DATA;

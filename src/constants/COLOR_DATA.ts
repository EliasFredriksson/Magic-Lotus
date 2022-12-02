// COLOR ABBVERATIONS
const ABBVERATIONS = ["W", "U", "B", "R", "G"] as const;
export type IColorAbbveration = typeof ABBVERATIONS[number];

// COLOR FULL NAMES
const COLOR_NAMES = ["White", "Blue", "Black", "Red", "Green"] as const;
export type IColorName = typeof COLOR_NAMES[number];

// COLOR LAND NAMES
const COLOR_LAND_NAMES = [
  "Plains",
  "Island",
  "Swamp",
  "Mountain",
  "Forest",
] as const;
export type IColorLand = typeof COLOR_LAND_NAMES[number];

// COLOR MANA SYMBOLS PUBLIC PATHS
const MANA_SYMBOL_URLS = [
  "/Mana_Symbols/Plains.svg",
  "/Mana_Symbols/Island.svg",
  "/Mana_Symbols/Swamp.svg",
  "/Mana_Symbols/Mountain.svg",
  "/Mana_Symbols/Forest.svg",
] as const;
export type IColorSymbol = typeof MANA_SYMBOL_URLS[number];

// ############ COLOR DATA ############
export type IColor = {
  [Property in IColorLand]: {
    abbveration: IColorAbbveration;
    color: IColorName;
    symbolUrl: IColorSymbol;
  };
};
const COLOR_DATA: IColor = {
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

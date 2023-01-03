import ColorAbbveration from "../../models/scryfall/types/ColorAbbveration";

type NameTwoColor =
  | "azorius" // White, Blue
  | "dimir" // Black, Blue
  | "rakdos" // Black, Red
  | "gruul" // Red, Green
  | "selesnya" // Green, White
  | "orzhov" // White, Black
  | "izzet" // Blue, Red
  | "golgari" // Black, Green
  | "boros" // Red, White
  | "simic"; // Green, Blue
type NameThreeColor =
  | "abzan" // White, Black, Green
  | "bant" // White, Green, Blue
  | "esper" // White, Blue, Black
  | "grixis" // Blue, Black, Red
  | "jeskai" // Blue, Red, White
  | "jund" // Black, Red, Green
  | "mardu" // Red, White, Black
  | "naya" // Red, Green, White
  | "sultai" // Black, Green, Blue
  | "temur"; // Green, Red, Blue
type NameFourColor =
  | "chaos" // Non white
  | "aggression" // Non blue
  | "altruism" // Non black
  | "growth" // Non red
  | "artifice"; // Non green
type NameOneOffs = "wubrg" | "colorless" | "multicolor"; // wubrd = All colors // colorless = No colors // multicolor = More than 1 color
export type ColorNames =
  | NameTwoColor
  | NameThreeColor
  | NameFourColor
  | NameOneOffs;

// type ColorId = {
//   q: undefined;
//   id: ColorName;
// };
// type ColorQ = {
//   q: ColorCombination;
//   id: undefined;
// };

// type Color = ColorId | ColorQ;
// export default Color;

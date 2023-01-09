import { ILanguageCode } from "../../constants/LANGUAGE_DATA";
import Rarity from "../../models/scryfall/types/Rarity";
import SecurityStamp from "../../models/scryfall/types/SecurityStamp";
import SetType from "../../models/scryfall/types/SetType";
import { ColorNames } from "./_colors";
import Cube from "./_cubes";
import Frame from "./_frame";
import In from "./_in";
import Is from "./_is";
import New from "./_new";

// CONDITIONS
const LARGER_THAN = ">";
const LARGER_OR_EQUAL = ">=";
const SMALLER_THAN = "<";
const SMALLER_OR_EQUAL = "<=";
const NOT_EQUAL = "!=";
const EQUAL = "=";
type Condition =
  | typeof LARGER_THAN
  | typeof LARGER_OR_EQUAL
  | typeof SMALLER_THAN
  | typeof SMALLER_OR_EQUAL
  | typeof EQUAL
  | typeof NOT_EQUAL;
type ParamCondition<T> = {
  q: T;
  condition: Condition;
  not?: boolean;
};
type Param<T> = {
  q: T;
  not?: boolean;
  condition?: undefined;
};

export interface IFullTextParams {
  // CARD NAME
  q: Param<string>; // Cards whos name contains "q"
  // COLORS
  color?: ParamCondition<string>[]; // Color identity according to stored Symbols in Backend.
  id?: Param<ColorNames>[];

  // CARD TYPES
  type?: Param<string[]>; // Find cards of a certain card type. (supertype, card type  or subtype)

  // CARD TEXT
  oracle?: Param<string>; // Oracle text // You can use ~ in your text as a placeholder for the card’s name.
  fo?: Param<string>[]; // Full oracle text only
  keyword?: Param<string>[]; // To search for a card with specific keyword ability.

  // MANA COSTS
  mana?: ParamCondition<string>[]; // Manacost according to stored Symbols in Backend.
  manavalue?: ParamCondition<string | "odd" | "even">[];
  cmc?: ParamCondition<string>[]; // Converted mana cost (number)
  devotion?: Param<string>[]; // Color devotion according to stored Symbols in Backend.
  produces?: Param<string>[]; // Produces mana according to stored Symbols in Backend.

  // POWER / TOUGHNESS / LOYALTY
  power?: ParamCondition<string>[]; // Power
  toughness?: ParamCondition<string>[]; // Toughness
  powtou?: ParamCondition<string>[]; // Total power and toughness
  loyalty?: ParamCondition<string>[];

  // INCLUDE
  include?: Param<"extras">[];

  // RARITY
  rarity?: ParamCondition<Rarity>[];

  // SETS AND BLOCKS
  set?: Param<string>[]; // Magic set
  cn?: ParamCondition<number>[]; // Collector number
  block?: Param<string>[];
  st?: Param<SetType>[]; // Search for cards based on what product it appears in.

  // CUBES
  cube?: Param<Cube>[];

  // FORMAT LEGALITIES
  format?: Param<string>[]; // Filter on format
  banned?: Param<string>[]; // Cards that are banned is specified format
  restricted?: Param<string>[]; // Cards that are restricted in specified format

  // PRICES
  tix?: ParamCondition<number>[];
  usd?: ParamCondition<number>[];
  eur?: ParamCondition<number>[];
  cheapest?: Param<"eur" | "usd" | "tix">[];

  // ARTISTS, FLAVOR TEXT AND WATERMARK
  artist?: Param<string>;
  flavor?: Param<string>;
  watermark?: Param<string>;

  // BORDER, FRAME, FOIL & RESOLUTION
  border?: Param<"black" | "white" | "silver" | "borderless">[];
  stamp?: Param<SecurityStamp>[];
  frame?: Param<Frame>[];

  // GAMES, PROMOS & SPOTLIGHTS
  game?: Param<string>[];

  // YEAR
  year?: Param<string>[]; // ALLOWS A YEAR (ex: 2009) OR DATE FORMAT (yyyy-mm-dd) OR SetCode

  // TAGGER TAGS
  art?: Param<string>[]; // Find things in cards art.
  function?: Param<string>[]; // Cards with the decsribed function. (ex: "Removal")

  // REPRINTS
  sets?: ParamCondition<string>[]; // Number of sets card has been in
  papersets?: ParamCondition<string>[]; // Number of paper sets searched cards have been in
  paperprints?: ParamCondition<string>[]; // Number of paper prints

  // LANGUAGUES
  lang?: Param<ILanguageCode>[]; // Filter on language

  // DISPLAY KEYWORD
  unique?: Param<string>[];

  // HAS
  has?: Param<"watermark">[];

  // NEW
  new?: Param<New>[];

  // IN
  in?: Param<In>[];

  // IS
  is?: Param<Is>[];
}

const convertEntryToText = (
  key: keyof IFullTextParams,
  list: Param<any>[] | ParamCondition<any>[]
) => {
  let str = "";
  list.forEach(({ condition, not, q }) => {
    if (condition) {
      str += `${not ? "-" : ""}${key}${condition}${q} `;
    } else {
      str += `${not ? "-" : ""}${key}:${q} `;
    }
  });
  return str;
};

export function covertObjectToFullText(params: IFullTextParams): string {
  let result = "";
  Object.keys(params).forEach((_key) => {
    const key = _key as keyof IFullTextParams;
    const value = params[key];
    if (value) {
      if (Array.isArray(value)) result += convertEntryToText(key, value);
      else {
        const { condition, not, q } = value;
        if (condition) {
          result += `${not ? "-" : ""}${key}${condition}${q} `;
        } else {
          result += `${not ? "-" : ""}${key}:${q} `;
        }
      }
    }
  });
  return result;
}

// CONDITIONS
const LARGER_THAN = ">";
const LARGER_OR_EQUAL = ">=";
const SMALLER_THAN = "<";
const SMALLER_OR_EQUAL = "<=";
const NOT_EQUAL = "!=";
const EQUAL = "=";

export interface IFullTextParams {
  // CARD NAME
  q?: string; // Cards whos name contains "q"
  // COLORS
  color?: string; // Color identity according to stored Symbols in Backend.
  id?: string; // Commander identity

  // CARD TYPES
  type?: string; // Find cards of a certain card type. (supertype, card type  or subtype)

  // CARD TEXT
  oracle?: string; // Oracle text // You can use ~ in your text as a placeholder for the card’s name.
  fo?: string; // Full oracle text only
  keyword?: string; // To search for a card with specific keyword ability.

  // MANA COSTS
  mana?: string; // Manacost according to stored Symbols in Backend.
  manavalue?: string;
  cmc?: string; // Converted mana cost (number)
  devotion?: string; // Color devotion according to stored Symbols in Backend.
  produces?: string; // Produces mana according to stored Symbols in Backend.

  // POWER / TOUGHNESS / LOYALTY
  power?: string; // Power
  toughness?: string; // Toughness
  powtou?: string; // Total power and toughness
  loyalty?: string;

  // INCLUDE
  include?: string;

  // RARITY
  rarity?: string;

  // SETS AND BLOCKS
  set?: string; // Magic set
  cn?: string; // Collector number
  block?: string;
  st?: string; // Search for cards based on what product it appears in.

  // CUBES
  cube?: string;

  // FORMAT LEGALITIES
  format?: string; // Filter on format
  banned?: string; // Cards that are banned is specified format
  restricted?: string; // Cards that are restricted in specified format

  // PRICES
  tix?: string;
  usd?: string;
  eur?: string;
  cheapest?: string;

  // ARTISTS, FLAVOR TEXT AND WATERMARK
  artist?: string;
  flavor?: string;
  watermark?: string;

  // BORDER, FRAME, FOIL & RESOLUTION
  border?: string;
  stamp?: string;
  frame?: string;

  // GAMES, PROMOS & SPOTLIGHTS
  game?: string;

  // YEAR
  year?: string; // ALLOWS A YEAR (ex: 2009) OR DATE FORMAT (yyyy-mm-dd) OR SetCode

  // TAGGER TAGS
  art?: string; // Find things in cards art.
  function?: string; // Cards with the decsribed function. (ex: "Removal")

  // REPRINTS
  sets?: string; // Number of sets card has been in
  papersets?: string; // Number of paper sets searched cards have been in
  paperprints?: string; // Number of paper prints

  // LANGUAGUES
  lang?: string; // Filter on language

  // DISPLAY KEYWORD
  unique?: string;

  // HAS
  has?: string;

  // NEW
  new?: string;

  // IN
  in?: string;

  // IS
  is?: string;
}

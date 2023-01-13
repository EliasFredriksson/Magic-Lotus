import {
  EQUAL,
  IS,
  LARGER_OR_EQUAL,
  LARGER_THAN,
  NOT_EQUAL,
  SMALLER_OR_EQUAL,
  SMALLER_THAN,
} from "./FILTER_CONDITIONS";

export const FORMAT_LEGALITIES = [
  {
    id: "1",
    name: "Legal",
    meta: "legal",
  },
  {
    id: "2",
    name: "Restricted",
    meta: "restricted",
  },
  {
    id: "3",
    name: "Banned",
    meta: "banned",
  },
];
export const ALLOW_PARTIAL_TYPES = [
  {
    id: "allow-partial-types",
    name: "Allow partial types",
  },
];
export const COLOR_CRITERIA = [
  {
    id: "1",
    name: "Exactly these colors",
    meta: ":",
  },
  {
    id: "2",
    name: "Including these colors",
    meta: ">=",
  },
  {
    id: "3",
    name: "At most these colors",
    meta: "<=",
  },
];
export const COLORS = [
  {
    id: "1",
    name: "White",
    meta: "w",
  },
  {
    id: "2",
    name: "Blue",
    meta: "u",
  },
  {
    id: "3",
    name: "Black",
    meta: "b",
  },
  {
    id: "4",
    name: "Red",
    meta: "r",
  },
  {
    id: "5",
    name: "Green",
    meta: "g",
  },
  {
    id: "6",
    name: "Colorless",
    meta: "c",
  },
];
export const MANA_COST_CRITERIA = [
  {
    id: "1",
    name: "Exactly this cost",
    meta: IS,
  },
  {
    id: "2",
    name: "This cost or larger",
    meta: LARGER_OR_EQUAL,
  },
  {
    id: "3",
    name: "This cost or smaller",
    meta: SMALLER_OR_EQUAL,
  },
];
export const STATS = [
  {
    id: "1",
    name: "Mana Value",
    meta: "cmc",
  },
  {
    id: "2",
    name: "Power",
    meta: "power",
  },
  {
    id: "3",
    name: "Toughness",
    meta: "toughness",
  },
  {
    id: "4",
    name: "Loyalty",
    meta: "loyalty",
  },
];
export const STATS_CONDITIONS = [
  {
    id: "1",
    name: "equal to",
    meta: EQUAL,
  },
  {
    id: "2",
    name: "less than",
    meta: SMALLER_THAN,
  },
  {
    id: "3",
    name: "greater than",
    meta: LARGER_THAN,
  },
  {
    id: "4",
    name: "less than or equal",
    meta: SMALLER_OR_EQUAL,
  },
  {
    id: "5",
    name: "greater than or equal",
    meta: LARGER_OR_EQUAL,
  },
  {
    id: "6",
    name: "not equal to",
    meta: NOT_EQUAL,
  },
];
export const RARITIES = [
  {
    id: "1",
    name: "Common",
    meta: "common",
  },
  {
    id: "2",
    name: "Uncommon",
    meta: "uncommon",
  },
  {
    id: "3",
    name: "Rare",
    meta: "rare",
  },
  {
    id: "4",
    name: "Mythic",
    meta: "mythic",
  },
];
export const RARITY_CRITERIA = [
  {
    id: "1",
    name: "Is equal to",
    meta: IS,
  },
  {
    id: "2",
    name: "Greater than",
    meta: LARGER_THAN,
  },
  {
    id: "3",
    name: "Greater than or equal to",
    meta: LARGER_OR_EQUAL,
  },
  {
    id: "4",
    name: "Lower than",
    meta: SMALLER_THAN,
  },
  {
    id: "5",
    name: "Lower than or equal to",
    meta: SMALLER_OR_EQUAL,
  },
];

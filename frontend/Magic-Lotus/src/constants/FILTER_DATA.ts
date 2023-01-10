import { IS, LARGER_OR_EQUAL, SMALLER_OR_EQUAL } from "./FILTER_CONDITIONS";

export const LEGALITIES = [
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

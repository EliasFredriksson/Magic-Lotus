// ######## LAYOUTS ########
// LIST
const LAYOUTS = [
  "normal",
  "split",
  "flip",
  "transform",
  "modal_dfc",
  "meld",
  "leveler",
  "class",
  "saga",
  "adventure",
  "planar",
  "scheme",
  "vanguard",
  "token",
  "double_faced_token",
  "emblem",
  "augment",
  "art_series",
  "reversible_card",
] as const;
// TYPE
type Layout = typeof LAYOUTS[number];
export default Layout;

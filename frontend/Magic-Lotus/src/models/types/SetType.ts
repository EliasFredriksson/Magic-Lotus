// ######## SET TYPES ########
// LIST
const SET_TYPES = [
  "core",
  "expansion",
  "masters",
  "alchemy",
  "masterpiece",
  "arsenal",
  "from_the_vault",
  "spellbook",
  "premium_deck",
  "duel_deck",
  "draft_innovation",
  "treasure_chest",
  "commander",
  "planechase",
  "archenemy",
  "vanguard",
  "funny",
  "starter",
  "box",
  "promo",
  "token",
  "memorabilia",
] as const;
// TYPE
type SetType = typeof SET_TYPES[number];
export default SetType;

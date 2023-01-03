const NEW_OPTIONS = [
  "rarity",
  "art",
  "artist",
  "flavor",
  "frame",
  "language", // First printing of a card is specified language
] as const;
type New = typeof NEW_OPTIONS[number];
export default New;

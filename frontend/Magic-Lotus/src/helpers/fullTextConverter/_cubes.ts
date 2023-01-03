const CUBE_OPTIONS = [
  "arena",
  "grixis",
  "legacy",
  "chuck",
  "twisted",
  "protour",
  "uncommon",
  "april",
  "modern",
  "amaz",
  "tinkerer",
  "livethedream",
  "chromatic",
  "vintage",
] as const;
type Cube = typeof CUBE_OPTIONS[number];
export default Cube;

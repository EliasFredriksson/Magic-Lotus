// ######## FRAME EFFECTS ########
// LIST
const FRAME_EFFECTS = [
  "legendary",
  "miracle",
  "nyxtouched",
  "draft",
  "devoid",
  "tombstone",
  "colorshifted",
  "inverted",
  "sunmoondfc",
  "compasslanddfc",
  "originpwdfc",
  "mooneldrazidfc",
  "waxingandwaningmoondfc",
  "showcase",
  "extendedart",
  "companion",
  "etched",
  "snow",
  "lesson",
  "shatteredglass",
  "convertdfc",
  "fandfc",
  "upsidedowndfc",
] as const;
// TYPE
type FrameEffect = typeof FRAME_EFFECTS[number];
export default FrameEffect;

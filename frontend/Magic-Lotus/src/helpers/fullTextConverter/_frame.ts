import { default as CardFrame } from "../../models/scryfall/types/Frame";
import FrameEffect from "../../models/scryfall/types/FrameEffect";

const FRAME_OPTIONS = [
  // ADD OPTIONS HERE IF NEEDED
] as const;
type Frame = typeof FRAME_OPTIONS[number] | FrameEffect | CardFrame;
export default Frame;

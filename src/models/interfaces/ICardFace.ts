import { TOptional } from "../types/TOptional";

export default interface ICardFace {
  artist: TOptional<string>;
  cmc: TOptional<number>;
  //   color_indicator
}

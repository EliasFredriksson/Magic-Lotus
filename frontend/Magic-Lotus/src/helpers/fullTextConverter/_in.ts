import { ILanguageCode } from "../../constants/LANGUAGE_DATA";
import Game from "../../models/scryfall/types/Game";

const IN_OPTIONS = [
  // ADD OPTIONS HERE
] as const;
type In = typeof IN_OPTIONS[number] | Game | ILanguageCode;
export default In;

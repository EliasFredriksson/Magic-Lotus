import ICard from "../models/interfaces/ICard";
// ================================================= GET =================================================
// GET    /cards

// ###########################
// GET    /cards/random
// ----------
// ROUTE
export const ROUTE_GET_CARDS_RANDOM = "cards/random";
// QUERY PARAMETERS
export interface IGetCardsRandomParams {
  q?: string;
  format?: string;
  face?: string;
  version?: string;
  pretty?: boolean;
}
// RETURN TYPE
export type IGetCardsRandomResult = ICard;
// ###########################

// ================================================= GET =================================================
// GET    /cards

// GET    /cards/random
// QUERY PARAMETERS
export const ROUTE_GET_CARDS_RANDOM = "cards/random";
export interface IGetCardsRandom {
  q?: string;
  format?: string;
  face?: string;
  version?: string;
  pretty?: boolean;
}

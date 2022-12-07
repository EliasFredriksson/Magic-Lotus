import ICard from "../models/interfaces/ICard";
import { GET } from "./ServiceBase";

// ================================================= GET =================================================
// GET    /cards
export const getCards = async (signal: AbortSignal) => {
  return await GET<any>(`cards/random`, {
    signal,
  });
};

// GET    /cards/random
export interface IGetCardsRandom {
  q: string;
  format: string;
  face: string;
  version: string;
  pretty: boolean;
}
export const getCardsRandom = async (
  signal: AbortSignal,
  params: IGetCardsRandom
) => {
  return await GET<ICard>(`cards/random`, {
    signal,
  });
};

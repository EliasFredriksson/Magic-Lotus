export type Price =
  | "eur"
  | "eur_foil"
  | "tix"
  | "usd"
  | "usd_etched"
  | "usd_foil";

type Prices = {
  [Property in Price]: string | null;
};

export default Prices;

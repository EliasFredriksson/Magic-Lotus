type StoreFronts = "cardhoarder" | "cardmarket" | "tcgplayer";

type PurchaseUri = {
  [Property in StoreFronts]?: string | null;
};

export default PurchaseUri;

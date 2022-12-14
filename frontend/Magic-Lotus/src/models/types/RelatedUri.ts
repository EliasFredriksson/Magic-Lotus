type Websites =
  | "edhrec"
  | "tcgplayer_infinite_articles"
  | "tcgplayer_infinite_decks";

type RelatedUri = {
  [Property in Websites]?: string | null;
};

export default RelatedUri;

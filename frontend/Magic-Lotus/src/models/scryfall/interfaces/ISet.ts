import SetType from "../types/SetType";

export default interface ISet {
  id: string; // UUID // A unique ID for this set on Scryfall that will not change.
  code: string; // The unique three to five-letter code for this set.
  mtgo_code?: string | null; // The unique code for this set on MTGO, which may differ from the regular code.
  tcgplayer_id?: number | null; // This set’s ID on TCGplayer’s API, also known as the groupId.
  name: string; // The English name of the set.
  set_type: SetType; // A computer-readable classification for this set. See list in models/types/SetType.ts.
  released_at?: string | null; // Date // The date the set was released or the first card was printed in the set (in GMT-8 Pacific time).
  block_code?: string | null; // The block code for this set, if any.
  block?: string | null; // The block or group name code for this set, if any.
  parent_set_code?: string | null; // The set code for the parent set, if any. promo and token sets often have a parent set.
  digital: boolean; // True if this set was only released in a video game.
  foil_only: boolean; // True if this set contains only foil cards.
  nonfoil_only: boolean; // True if this set contains only nonfoil cards.
  scryfall_uri: string; // URI   // A link to this set’s permapage on Scryfall’s website.
  uri: string; // URI    // A link to this set object on Scryfall’s API.
  icon_svg_uri: string; // URI    // A URI to an SVG file for this set’s icon on Scryfall’s CDN. Hotlinking this image isn’t recommended, because it may change slightly over time. You should download it and use it locally for your particular user interface needs.

  arena_code?: string | null; // The unique code for this set on Arena.
  search_uri: string; // URI   // A Scryfall API URI that you can request to begin paginating over the cards in this set.
  card_count: number; // The number of cards in this set.

  printed_size?: number | null; // The denominator for the set’s printed collector numbers.
}

import { IColorAbbveration } from "../../constants/COLOR_DATA";
import { ILanguageCode } from "../../constants/LANGUAGE_DATA";
import { Optional } from "../types/Optional";
import ICardFace from "./ICardFace";
import IRelatedCard from "./IRelatedCard";

export default interface ICard {
  // ########## CORE ##########
  readonly arena_id: Optional<number>; // The card's Arena ID, if any. Majority of cards does not have this.
  readonly id: string; // UUID
  readonly lang: ILanguageCode; // The language
  readonly mtgo_id: Optional<number>; // MTG Online ID
  readonly mtgo_foil_id: Optional<number>; // MTG Online Foil ID
  readonly multiverse_ids: Optional<number[]>; // The card's ID on Gatherer
  readonly tcgplayer_id: Optional<number>; // The card's ID on TCGPlayer API (Their productId)
  readonly tcgplayer_etched_id: Optional<number>; // The foiled card's ID on TCGPlayer API.
  readonly cardmarket_id: Optional<number>; // The card's id on CardMarket
  readonly object: "card"; // The content type for this object. Always "card".
  readonly oracle_id: string; // UUID // This is the oravle identity.
  readonly prints_search_uri: string; // URI // A link to where you can begin paginating all re/prints for this cad on Scryfall's API
  readonly rulins_uri: string; // URI // A link to this card's ruling list on Scryfall's API.
  readonly scryfall_uri: string; // URI // A link to this card's permapage on Scryfall's website.
  readonly url: string; // URI // A link to this card object on Scryfall's API.

  // ########## GAMEPLAY FIELDS ##########
  readonly all_parts: Optional<IRelatedCard[]>; // If the card is closely related to other cards, this property will be an array with "RelatedCardObjects"
  readonly card_faces: Optional<ICardFace[]>; // An array of ICardFace objects, if this card is multifaced.
  readonly cmc: number; // The card’s converted mana cost. Note that some funny cards have fractional mana costs.
  readonly color_identity: IColorAbbveration[]; // This card’s color identity.
  readonly color_indicator: Optional<IColorAbbveration[]>; // The colors in this card’s color indicator, if any. A null value for this field indicates the card does not have one.
  readonly colors: Optional<IColorAbbveration[]>; // This card’s colors, if the overall card has colors defined by the rules. Otherwise the colors will be on the card_faces objects, see below.
  readonly edhrec_rank: Optional<number>; // This card’s overall rank/popularity on EDHREC. Not all cards are ranked.
  readonly hand_modifier: Optional<string>; // This card’s hand modifier, if it is Vanguard card. This value will contain a delta, such as -1.
  readonly keywords: string[]; // An array of keywords that this card uses, such as 'Flying' and 'Cumulative upkeep'.
  readonly layout: string; // A code for this card's layout

  // ########## PRINT FIELDS ##########
}

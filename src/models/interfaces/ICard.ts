import { ILanguageCode } from "../../constants/LANGUAGE_DATA";
import { TOptional } from "../types/TOptional";
import ICardFace from "./ICardFace";
import IRelatedCard from "./IRelatedCard";

export default interface ICard {
  // ########## CORE ##########
  readonly arena_id: TOptional<number>; // The card's Arena ID, if any. Majority of cards does not have this.
  readonly id: string; // UUID
  readonly lang: ILanguageCode; // The language
  readonly mtgo_id: TOptional<number>; // MTG Online ID
  readonly mtgo_foil_id: TOptional<number>; // MTG Online Foil ID
  readonly multiverse_ids: TOptional<number[]>; // The card's ID on Gatherer
  readonly tcgplayer_id: TOptional<number>; // The card's ID on TCGPlayer API (Their productId)
  readonly tcgplayer_etched_id: TOptional<number>; // The foiled card's ID on TCGPlayer API.
  readonly cardmarket_id: TOptional<number>; // The card's id on CardMarket
  readonly object: "card"; // The content type for this object. Always "card".
  readonly oracle_id: string; // UUID // This is the oravle identity.
  readonly prints_search_uri: string; // URI // A link to where you can begin paginating all re/prints for this cad on Scryfall's API
  readonly rulins_uri: string; // URI // A link to this card's ruling list on Scryfall's API.
  readonly scryfall_uri: string; // URI // A link to this card's permapage on Scryfall's website.
  readonly url: string; // URI // A link to this card object on Scryfall's API.

  // ########## RULING ##########
  readonly all_parts: TOptional<IRelatedCard[]>; // If the card is closely related to other cards, this property will be an array with "RelatedCardObjects"
  readonly card_faces: TOptional<ICardFace[]>;
}

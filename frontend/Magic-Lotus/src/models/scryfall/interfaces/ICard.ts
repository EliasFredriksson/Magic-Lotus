import { ILanguageCode } from "../../../constants/LANGUAGE_DATA";
import BorderColor from "../types/BorderColor";
import ColorAbbveration from "../types/ColorAbbveration";
import Finish from "../types/Finish";
import Frame from "../types/Frame";
import FrameEffect from "../types/FrameEffect";
import Game from "../types/Game";
import ImageFormat from "../types/ImageFormat";
import ImageStatus from "../types/ImageStatus";
import Layout from "../types/Layout";
import Prices from "../types/Prices";
import PurchaseUri from "../types/PurchaseUri";
import Rarity from "../types/Rarity";
import RelatedUri from "../types/RelatedUri";
import SecurityStamp from "../types/SecurityStamp";
import SetType from "../types/SetType";
import ICardFace from "./ICardFace";
import ILegalities from "./ILegalities";
import IRelatedCard from "./IRelatedCard";

export default interface ICard {
  // ########## CORE ##########
  readonly arena_id?: number | null; // The card's Arena ID, if any. Majority of cards does not have this.
  readonly id: string; // UUID
  readonly lang: ILanguageCode; // The language
  readonly mtgo_id?: number | null; // MTG Online ID
  readonly mtgo_foil_id?: number | null; // MTG Online Foil ID
  readonly multiverse_ids?: number[] | null; // The card's ID on Gatherer
  readonly tcgplayer_id?: number | null; // The card's ID on TCGPlayer API (Their productId)
  readonly tcgplayer_etched_id?: number | null; // The foiled card's ID on TCGPlayer API.
  readonly cardmarket_id?: number | null; // The card's id on CardMarket
  readonly object: "card"; // The content type for this object. Always "card".
  readonly oracle_id: string; // UUID // This is the oravle identity.
  readonly prints_search_uri: string; // URI // A link to where you can begin paginating all re/prints for this cad on Scryfall's API
  readonly rulins_uri: string; // URI // A link to this card's ruling list on Scryfall's API.
  readonly scryfall_uri: string; // URI // A link to this card's permapage on Scryfall's website.
  readonly url: string; // URI // A link to this card object on Scryfall's API.

  // ########## GAMEPLAY FIELDS ##########
  readonly all_parts?: IRelatedCard[] | null; // If the card is closely related to other cards, this property will be an array with "RelatedCardObjects"
  readonly card_faces?: ICardFace[] | null; // An array of ICardFace objects, if this card is multifaced.
  readonly cmc: number; // The card’s converted mana cost. Note that some funny cards have fractional mana costs.
  readonly color_identity: ColorAbbveration[]; // This card’s color identity.
  readonly color_indicator?: ColorAbbveration[] | null; // The colors in this card’s color indicator, if any. A null value for this field indicates the card does not have one.
  readonly colors?: ColorAbbveration[] | null; // This card’s colors, if the overall card has colors defined by the rules. Otherwise the colors will be on the card_faces objects, see below.
  readonly edhrec_rank?: number | null; // This card’s overall rank/popularity on EDHREC. Not all cards are ranked.
  readonly hand_modifier?: string | null; // This card’s hand modifier, if it is Vanguard card. This value will contain a delta, such as -1.
  readonly keywords: string[]; // An array of keywords that this card uses, such as 'Flying' and 'Cumulative upkeep'.
  readonly layout: Layout; // A code for this card's layout
  readonly legalities: ILegalities; // A legalities object. An object describing the legality of this card across play formats. Possible legalities are legal, not_legal, restricted, and banned.
  readonly life_modifier?: string | null; // This card’s life modifier, if it is Vanguard card. This value will contain a delta, such as +2.
  readonly loyalty?: string | null; // This card’s life modifier, if it is Vanguard card. This value will contain a delta, such as +2.
  readonly mana_cost?: string | null; // The mana cost for this card. This value will be any empty string "" if the cost is absent. Remember that per the game rules, a missing mana cost and a mana cost of {0} are different values. Multi-faced cards will report this value in card faces.
  readonly name: string; // The name of this card. If this card has multiple faces, this field will contain both names separated by ␣//␣.
  readonly oracle_text?: string | null; // The Oracle text for this card, if any.
  readonly oversized: boolean; // True if this card is oversized.
  readonly penny_rank?: number | null; // This card’s rank/popularity on Penny Dreadful. Not all cards are ranked.
  readonly power?: string | null; // This card’s power, if any. Note that some cards have powers that are not numeric, such as *.
  readonly produced_mana?: ColorAbbveration[] | null; // Colors of mana that this card could produce.
  readonly reserved: boolean; // True if this card is on the Reserved List.
  readonly toughness?: string | null; // This card’s toughness, if any. Note that some cards have toughnesses that are not numeric, such as *.
  readonly type_line: string; // The type line of this card.

  // ########## PRINT FIELDS ##########
  readonly artist?: string | null; // The name of the illustrator of this card. Newly spoiled cards may not have this field yet.
  readonly attraction_lights?: number[] | null; // The lit Unfinity attractions lights on this card, if any.
  readonly booster: boolean; // Whether this card is found in boosters.
  readonly border_color: BorderColor; // This card’s border color: black, white, borderless, silver, or gold.
  readonly card_back_id: string; // UUID  // The Scryfall ID for the card back design present on this card.
  readonly collector_number: string; // This card’s collector number. Note that collector numbers can contain non-numeric characters, such as letters or ★.
  readonly content_warning?: number | null; // True if you should consider avoiding use of this print downstream.
  readonly digital: boolean; // True if this card was only released in a video game.
  readonly finishes: Finish[]; // An array of computer-readable flags that indicate if this card can come in foil, nonfoil, etched, or glossy finishes.
  readonly flavor_name?: string | null; // The just-for-fun name printed on the card (such as for Godzilla series cards).
  readonly flavor_text?: string | null; // The flavor text, if any.
  readonly frame_effects?: FrameEffect[] | null; // This card’s frame effects, if any.
  readonly frame: Frame; // This card’s frame.
  readonly full_art: boolean; // True if this card’s artwork is larger than normal.
  readonly games: Game[]; // A list of games that this card print is available in, paper, arena, and/or mtgo.
  readonly highres_image: boolean; // True if this card’s imagery is high resolution.
  readonly illustration_id?: string | null; // UUID   // A unique identifier for the card artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
  readonly image_status: ImageStatus; // A computer-readable indicator for the state of this card’s image, one of missing, placeholder, lowres, or highres_scan.
  readonly image_uris?: ImageFormat | null; // An object listing available imagery for this card. See the Card Imagery article for more information.
  readonly prices: Prices; // An object containing daily price information for this card, including usd, usd_foil, usd_etched, eur, and tix prices, as strings.
  readonly printed_name?: string | null; // The localized name printed on this card, if any.
  readonly printed_text?: string | null; // The localized text printed on this card, if any.
  readonly printed_type_line?: string | null; // The localized type line printed on this card, if any.
  readonly promo: boolean; // True if this card is a promotional print.
  readonly promo_types?: string[] | null; // An array of strings describing what categories of promo cards this card falls into.
  readonly purchase_uris: PurchaseUri; // An object providing URIs to this card’s listing on major marketplaces.
  readonly rarity: Rarity; // This card’s rarity. One of common, uncommon, rare, special, mythic, or bonus.
  readonly related_uris: RelatedUri; // An object providing URIs to this card’s listing on other Magic: The Gathering online resources.
  readonly released_at: string; // Date string. // The date this card was first released.
  readonly reprint: boolean; // True if this card is a reprint.
  readonly scryfall_set_uri: string; // URI   // A link to this card’s set on Scryfall’s website.
  readonly set_name: string; // This card’s full set name.
  readonly set_search_uri: string; // URI  // A link to where you can begin paginating this card’s set on the Scryfall API.
  readonly set_type: SetType; // The type of set this printing is in. (COULD POTENTIALLY ADD AS A TYPE)
  readonly set_uri: string; // URI    // A link to this card’s set object on Scryfall’s API.
  readonly set: string; // This card’s set code.
  readonly set_id: string; // UUID   // This card’s Set object UUID.
  readonly story_spotlight: boolean; // True if this card is a Story Spotlight.
  readonly textless: boolean; // True if the card is printed without text.
  readonly variation: boolean; // Whether this card is a variation of another printing.
  readonly variation_of?: string | null; // The printing ID of the printing this card is a variation of.
  readonly security_stamp?: SecurityStamp | null; // The security stamp on this card, if any. One of oval, triangle, acorn, circle, arena, or heart.
  readonly watermark?: string | null; // This card’s watermark, if any.

  // MISSING (YET TO BE IMPLEMENTED INTO THIS INTERFACE BY ME):
  // readonly preview?: {
  //    previewed_at?: string | null; // Date   // The date this card was previewed.
  //    source_uri?: string | null; // A link to the preview for this card.
  //    source?: string | null; // The name of the source that previewed this card.
  // }
}

import ColorAbbveration from "../types/ColorAbbveration";

export default interface ICardFace {
  readonly artist?: string | null; // The name of the illustrator of this card face.
  readonly cmc?: number | null; // The mana valud of this perticular face. if the card is reversible.
  readonly color_indicator?: ColorAbbveration[] | null; // The colors in this face's color indicator, if any.
  readonly colors?: ColorAbbveration[] | null; // This face's colors, if the game defines colors for the indicidual face of this card.
  readonly flavor_text?: string | null; // The flavor text printed on this face, if any.
  readonly illustration_id?: string | null; // UUID // A unique identifier for the card face artwork that remains consistent across reprints. Newly spoiled cards may not have this field yet.
  readonly image_uris?: { [key: string]: string }; // An object providing URIs to imagery for this face, if this is a double-sided card. If this card is not double-sided, then the image_uris property will be part of the parent object instead.
  readonly layout?: string | null; // The layout of this card face, if the card is reversible.
  readonly loyalty?: string | null; // The face's loyalty, if any.
  readonly mana_cost: string; // The mana cost for this face. This value will be any empty string "" if the cost is absent. Remember that per the game rules, a missing mana cost and a mana cost of {0} are different values.
  readonly name: string; // The name of this perticular face.
  readonly object: "card_face"; // A content type for this object, always "card_face".
  readonly oracle_id?: string | null; // The Oracle ID of this particular face, if the card is reversible.
  readonly oracle_text?: string | null; // The Oracle text for this face, if any;
  readonly power?: string | null; // This face’s power, if any. Note that some cards have powers that are not numeric, such as *.
  readonly printed_name?: string | null; // The localized name printed on this face, if any.
  readonly printed_text?: string | null; // The localized text printed on this face, if any.
  readonly printed_type_line?: string | null; // The localized type line printed on this face, if any.
  readonly toughness?: string | null; // This face's toughness, if any.
  readonly type_line?: string | null; // The type line of this particular face, if the card is reversible.
  readonly watermark?: string | null; // The watermark on this particular card face, if any.
}

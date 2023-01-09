const mongoose = require("mongoose");

const setModel = new mongoose.Schema(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    mtgo_code: { type: String },
    tcgplayer_id: { type: Number },
    name: { type: String, required: true }, // The English name of the set.
    set_type: { type: String, required: true },
    released_at: { type: String },
    block_code: { type: String },
    block: { type: String }, // The block or group name code for this set, if any.
    parent_set_code: { type: String }, // The set code for the parent set, if any. promo and token sets often have a parent set.
    card_count: { type: Number, required: true }, // The number of cards in this set.
    printed_size: { type: Number }, //
    digital: { type: Boolean, required: true }, // True if this set was only released in a video game.
    foil_only: { type: Boolean, required: true }, // True if this set contains only foil cards.
    nonfoil_only: { type: Boolean, required: true }, // True if this set contains only nonfoil cards.
    scryfall_uri: { type: String, required: true }, // URI   // A link to this set’s permapage on Scryfall’s website.
    uri: { type: String, required: true }, // URI    // A link to this set object on Scryfall’s API.
    icon_svg_uri: { type: String, required: true }, // URI    // A URI to an SVG file for this set’s icon on Scryfall’s CDN. Hotlinking this image isn’t recommended, because it may change slightly over time. You should download it and use it locally for your particular user interface needs.

    arena_code: { type: String }, // The unique code for this set on Arena.
    search_uri: { type: String, required: true }, // URI   // A Scryfall API URI that you can request to begin paginating over the cards in this set.
  },
  { versionKey: false }
);

const SetModel = mongoose.model("sets", setModel);

module.exports = SetModel;

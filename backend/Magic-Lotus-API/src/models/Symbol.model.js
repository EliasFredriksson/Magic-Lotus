const mongoose = require("mongoose");

const {
  OptionalNumber,
  OptionalString,
} = require("../helpers/mongoose.custom.types");

const symbolSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    loose_variants: { type: OptionalString },
    english: { type: String, required: true },
    transposable: { type: Boolean, required: true },
    represents_mana: { type: Boolean, required: true },
    cmc: { type: OptionalNumber },
    appears_in_mana_costs: { type: Boolean, required: true },
    funny: { type: Boolean, required: true },
    colors: { type: [String], required: true },
    gatherer_alternates: { type: [String] },
    svg_uri: { type: OptionalString },
  },
  { versionKey: false }
);

const SymbolModel = mongoose.model("symbols", symbolSchema);

module.exports = SymbolModel;

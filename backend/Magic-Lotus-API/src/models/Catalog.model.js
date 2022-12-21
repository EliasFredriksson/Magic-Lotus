const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    uri: { type: String, required: true },
    total_values: { type: Number, required: true },
    data: { type: [String], required: true },
  },
  { versionKey: false }
);

const CatalogModel = mongoose.model("catalogs", catalogSchema);

module.exports = CatalogModel;

const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    data: { type: Object, required: true },
  },
  { versionKey: false }
);

const CatalogModel = mongoose.model("catalogs", catalogSchema);

module.exports = CatalogModel;

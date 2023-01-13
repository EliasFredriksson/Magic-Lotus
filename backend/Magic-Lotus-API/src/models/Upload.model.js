const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    file: {
      data: { type: String, required: true },
      type: { type: String, required: true },
    },
    uploadTime: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const UploadModel = mongoose.model("upload", UploadSchema);

module.exports = UploadModel;

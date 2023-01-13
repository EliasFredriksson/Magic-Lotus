const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload",
    },
  },
  { versionKey: false }
);

const UsersModel = mongoose.model("users", usersSchema);

module.exports = UsersModel;

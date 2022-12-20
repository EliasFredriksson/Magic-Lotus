const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
  },
  { versionKey: false }
);

const UsersModel = mongoose.model("users", usersSchema);

module.exports = UsersModel;

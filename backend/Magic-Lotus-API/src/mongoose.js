// Mongoose includes both mongodb and mongoose.
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGOOSE);

require("dotenv").config();
require("./mongoose.js");

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const https = require("https");
const fs = require("fs");

const app = express();

// -------------------------------------------------------
// ### ADD CROSS ORIGIN ACCESS ###
const corsOptions = {
  origin: "https://localhost:3000",
  optionsSuccessStatus: 200,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type"],
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
  preflightContinue: false,
  credentials: true, // TO TELL EXPRESS TO ALLOW CREDENTIALS COOKIE
};
// ======= CONFIG =======
app.use(cors(corsOptions));
app.use(cookieParser()); // Used to more easily read cookies.
app.use(express.urlencoded({ extended: true })); //  So we can use froms.
app.use(
  express.json({
    limit: "5mb",
  })
); // Tell express to enable json as a valid format for req.body.
app.use(express.static("./public")); // Public folder. Css and  JS access.
app.use(morgan("dev"));
app.use(helmet());

// -------------------------------------------------------
// ### ROUTERS ###
const UsersRouter = require("./routers/User.router");
const CatalogRouter = require("./routers/Catalog.router");
const SymbolRouter = require("./routers/Symbols.router");
const SetRouter = require("./routers/Sets.router");

app.use("/users", UsersRouter);
app.use("/catalogs", CatalogRouter);
app.use("/symbols", SymbolRouter);
app.use("/sets", SetRouter);
// -------------------------------------------------------

// ======= ROUTES =======
// Home
app.get("/", async (req, res) => {
  res.status(200).send({
    success: true,
    data: "",
    error: "",
    method: "GET",
    route: "/",
    status: 200,
  });
});

// ======= LISTEN =======
https
  .createServer(
    {
      key: fs.readFileSync(".cert/key.pem"),
      cert: fs.readFileSync(".cert/cert.pem"),
    },
    app
  )
  .listen(8000, () => {
    console.log("https://localhost:8000/");
  });

require("dotenv").config();
require("./mongoose.js");

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const utils = require("./helpers/utils");
const auth = require("./helpers/auth");

const app = express();

// ======= CONFIG =======
app.use(cookieParser()); // Used to more easily read cookies.
app.use(express.urlencoded({ extended: true })); //  So we can use froms.
app.use(express.json()); // Tell express to enable json as a valid format for req.body.
app.use(express.static("./public")); // Public folder. Css and  JS access.
app.use(morgan("dev"));

// -------------------------------------------------------
// ### ADD CROSS ORIGIN ACCESS ###
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type"],
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
  preflightContinue: false,
  credentials: true,
};

app.use(cors(corsOptions));

// -------------------------------------------------------
// ### ROUTERS ###
const UsersRouter = require("./routers/User.router");

app.use("/users", UsersRouter);
// -------------------------------------------------------

// ======= ROUTES =======
// Home
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    data: "",
    error: "",
    method: "GET",
    route: "/",
    status: 200,
  });
});

app.post("/", (req, res) => {
  const { pass } = req.body;
  const hash = utils.hashPassword(pass);

  res.status(200).send({
    success: true,
    data: "",
    error: "",
    method: "POST",
    route: "/",
    status: 200,
  });
});

// Secret - Only avalible to logged in users.
// app.get("/profile", (req, res) => {
//   if (req.cookies === undefined) {
//     res.status(401).render("login", {
//       title: "Login",
//       msg: "Please log in first.",
//     });
//   } else {
//     if (res.locals.loggedIn) {
//       username = res.locals.username;
//       UsersModel.findOne({ username }, (error, user) => {
//         if (user) {
//           res.status(200).render("profile", {
//             username: username,
//             secret: user.secret,
//           });
//         } else {
//           res.status(401).redirect("/login");
//         }
//       });
//     } else {
//       res.status(401).redirect("/login");
//     }
//   }
// });

// ======= LISTEN =======
app.listen(8000, () => {
  console.log("http://localhost:8000/");
});

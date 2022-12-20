const express = require("express");
const jwt = require("jsonwebtoken");
const { ROLES } = require("../constants/ROLES");
const UsersModel = require("../models/UsersModel");

const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  UsersModel.findOne({ username }, (error, user) => {
    if (error) throw Promise.reject(error);
    else if ((user, utils.comparePassword(password, user.hashedPassword))) {
      // Correct login information provided.
      const userData = {
        userId: user._id.toString(),
        username: user.username,
      };

      const accessToken = jwt.sign(userData, process.env.JWTSECRET);
      res.cookie("token", accessToken);

      res.status(200).send({
        success: true,
        data: "",
        error: "",
        method: "POST",
        route: "/users/login",
        status: 200,
      });
    } else {
      // User not in db.
      res.status(400).render("login", {
        success: false,
        data: "",
        error: "User not found in database",
        method: "POST",
        route: "/users/login",
        status: 400,
      });
    }
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  // We set the token to an empty string. And the option object
  // with maxAge: 0 in makes it that the allowed time for the cookie
  // to exist is 0, which means it becomes deleted emedietly.
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).send({
    success: true,
    data: "",
    error: "",
    method: "POST",
    route: "/users/logout",
    status: 200,
  });
});

// REGISTER USER
router.post("/register", (req, res) => {
  // This is deconstructuring.
  const { username, email, password, confirmPassword } = req.body;
  UsersModel.findOne({ username }, async (error, user) => {
    // Error handling
    if (error) throw Promise.reject(error);
    // Regular cases
    if (user) {
      res.status(400).send({
        success: false,
        data: "",
        error: "Username is already taken.",
        method: "POST",
        route: "/users/register",
        status: 400,
      });
    } else if (password !== confirmPassword) {
      res.status(400).send({
        success: false,
        data: "",
        error: "Incorrect passwords.",
        method: "POST",
        route: "/users/register",
        status: 400,
      });
    } else {
      const newUser = new UsersModel({
        username: username,
        hashedPassword: utils.hashPassword(password),
        role: ROLES.user,
      });
      await newUser.save();
      res.status(200).send({
        success: true,
        data: "",
        error: "Incorrect passwords.",
        method: "POST",
        route: "/users/register",
        status: 400,
        title: "Home",
        msg: "Created user!",
      });
    }
  });
});

module.exports = router;

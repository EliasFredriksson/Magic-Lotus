const express = require("express");
const jwt = require("jsonwebtoken");
const utils = require("../helpers/utils");
const { ROLES } = require("../constants/ROLES");
const UsersModel = require("../models/UsersModel");

const responses = require("../helpers/Response");

const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  UsersModel.findOne({ email: email }, (error, user) => {
    if (error) throw Promise.reject(error);
    if (!user) {
      // USER NOT FOUND IN DATABASE
      // INVALIDATE AUTH TOKEN
      res.cookie("token", "", { maxAge: 0 });
      // SEND RESPONSE
      res
        .status(400)
        .send(
          responses.create400Response(
            "No user found with given credentials.",
            "POST",
            "/users/login"
          )
        );
    } else if ((user, utils.comparePassword(password, user.hashedPassword))) {
      // Correct login information provided.
      // GENEREATE AUTH COOKIE TOKEN
      const userData = {
        userId: user._id.toString(),
      };
      // SIGN DATA WITH JWT SECRET
      const accessToken = jwt.sign(userData, process.env.JWTSECRET);
      // ATTATCH TOKEN AS COOKIE
      res.cookie("token", accessToken);
      // SEND RESPONSE
      res
        .status(200)
        .send(responses.create200Response(user._id, "POST", "/users/login"));
    } else {
      // INVALIDATE AUTH TOKEN
      res.cookie("token", "", { maxAge: 0 });
      // SEND RESPONSE
      res
        .status(400)
        .send(
          responses.create400Response(
            "Invalid credentials provided.",
            "POST",
            "/users/login"
          )
        );
    }
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  // We set the token to an empty string. And the option object
  // with maxAge: 0 in makes it that the allowed time for the cookie
  // to exist is 0, which means it becomes deleted emedietly.
  if (!req.cookies["token"]) {
    res
      .status(400)
      .send(
        responses.create400Response(
          "You need to login first.",
          "POST",
          "/users/logout"
        )
      );
  } else {
    res.cookie("token", "", { maxAge: 0 });
    res
      .status(200)
      .send(
        responses.create200Response(
          "Logout successful!",
          "POST",
          "/users/logout"
        )
      );
  }
});

// REGISTER USER
router.post("/register", (req, res) => {
  // This is deconstructuring.
  const { username, email, password, repeatPassword } = req.body;
  UsersModel.findOne({ email }, async (error, user) => {
    // Error handling
    if (error) throw Promise.reject(error);
    // Regular cases
    if (user) {
      res.status(400).send({
        success: false,
        data: "",
        error: "Email is already taken.",
        method: "POST",
        route: "/users/register",
        status: 400,
      });
    } else if (password !== repeatPassword) {
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
        email: email,
        role: ROLES.user,
      });
      await newUser.save();
      res.status(200).send({
        success: true,
        data: newUser,
        error: "",
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

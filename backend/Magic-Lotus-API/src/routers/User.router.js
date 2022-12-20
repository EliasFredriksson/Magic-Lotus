const express = require("express");
const jwt = require("jsonwebtoken");
const utils = require("../helpers/utils");
const auth = require("../helpers/auth");
const { ROLES } = require("../constants/ROLES");
const UsersModel = require("../models/Users.model");

const responses = require("../helpers/Response");
const { AUTH_TOKEN } = require("../helpers/auth");

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email: email });
    if (!user) {
      // USER NOT FOUND IN DATABASE
      // INVALIDATE AUTH TOKEN
      res.cookie(AUTH_TOKEN, "", { maxAge: 0 });
      // SEND RESPONSE
      res
        .status(400)
        .send(
          responses.create400Response(
            "No user found with given credentials.",
            req
          )
        );
    } else if ((user, utils.comparePassword(password, user.hashedPassword))) {
      // Correct login information provided.
      // GENEREATE AUTH COOKIE TOKEN
      const userData = {
        userId: user._id.toString(),
        role: user.role,
      };
      // SIGN DATA WITH JWT SECRET
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);
      // ATTATCH TOKEN AS COOKIE
      res.cookie(AUTH_TOKEN, accessToken);
      // SEND RESPONSE
      res.status(200).send(responses.create200Response(user._id, req));
    } else {
      // INVALIDATE AUTH TOKEN
      res.cookie(AUTH_TOKEN, "", { maxAge: 0 });
      // SEND RESPONSE
      res
        .status(400)
        .send(
          responses.create400Response("Invalid credentials provided.", req)
        );
    }
  } catch (error) {
    res
      .status(400)
      .send(responses.create400Response(error, req.method, req.path));
  }
});

// LOGOUT
router.post("/logout", auth.checkIfLoggedIn, (req, res) => {
  // We set the token to an empty string. And the option object
  // with maxAge: 0 in makes it that the allowed time for the cookie
  // to exist is 0, which means it becomes deleted emedietly.

  res.cookie("token", "", { maxAge: 0 });
  res.status(200).send(responses.create200Response("Logout successful!", req));
});

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    // This is deconstructuring.
    const { username, email, password, repeatPassword } = req.body;
    const user = await UsersModel.findOne({ email });

    // Regular cases
    if (user) {
      res
        .status(400)
        .send(responses.create400Response("Email is already taken.", req));
    } else if (password !== repeatPassword) {
      res
        .status(400)
        .send(responses.create400Response("Incorrect passwords.", req));
    } else {
      const newUser = new UsersModel({
        username: username,
        hashedPassword: utils.hashPassword(password),
        email: email,
        role: ROLES.user,
      });
      await newUser.save();
      res.status(400).send(responses.create200Response(newUser._id, req));
    }
  } catch (error) {
    res
      .status(400)
      .send(responses.create400Response(error, req.method, req.path));
  }
});

module.exports = router;

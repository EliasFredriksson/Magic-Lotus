require("dotenv").config();

const UploadModel = require("../models/Upload.model");

const express = require("express");
const jwt = require("jsonwebtoken");
const utils = require("../helpers/utils");
const auth = require("../helpers/auth");
const { ROLES } = require("../constants/ROLES");
const UsersModel = require("../models/Users.model");

const { create200Response, create400Response } = require("../helpers/Response");
const { AUTH_TOKEN } = require("../helpers/auth");

const router = express.Router();

// ======================== LOGIN, LOGOUT ========================
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email: email }).populate("image");
    if (!user) {
      // USER NOT FOUND IN DATABASE
      // INVALIDATE AUTH TOKEN
      res.cookie(AUTH_TOKEN, "", { maxAge: 0 });
      // SEND RESPONSE
      res
        .status(400)
        .send(create400Response("No user found with given credentials.", req));
    } else if ((user, utils.comparePassword(password, user.hashedPassword))) {
      // Correct login information provided.
      // GENEREATE AUTH COOKIE TOKEN
      const userData = {
        id: user._id.toString(),
        role: user.role,
      };
      // SIGN DATA WITH JWT SECRET
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);
      // ATTATCH TOKEN AS COOKIE
      res.cookie(AUTH_TOKEN, accessToken);
      // SEND RESPONSE
      res.status(200).send(
        create200Response(
          {
            username: user.username,
            email: user.email,
            image: user.image,
            id: user._id,
            role: user.role,
            favoriteCards: user.favoriteCards,
          },
          req
        )
      );
    } else {
      // INVALIDATE AUTH TOKEN
      res.cookie(AUTH_TOKEN, "", { maxAge: 0 });
      // SEND RESPONSE
      res
        .status(400)
        .send(create400Response("Invalid credentials provided.", req));
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req.method, req.path));
  }
});
// LOGOUT
router.post("/logout", auth.checkIfLoggedIn, (req, res) => {
  // We set the token to an empty string. And the option object
  // with maxAge: 0 in makes it that the allowed time for the cookie
  // to exist is 0, which means it becomes deleted emedietly.

  res.cookie("token", "", { maxAge: 0 });
  res.status(200).send(create200Response("Logout successful!", req));
});

// ======================== CRUD ========================
// CREATE USER (Register)
router.post("/", async (req, res) => {
  try {
    // This is deconstructuring.
    const { username, email, password, repeatPassword, image } = req.body;
    const user = await UsersModel.findOne({ email });

    // Regular cases
    if (user) {
      res.status(400).send(create400Response("Email is already taken.", req));
    } else if (password !== repeatPassword) {
      res.status(400).send(create400Response("Incorrect passwords.", req));
    } else {
      // VALIDATE MISSING! ADD VALIDATION FOR FOLLOWING:
      // username
      // password
      // email

      const newUser = new UsersModel({
        username: username,
        hashedPassword: utils.hashPassword(password),
        email: email,
        role: ROLES.user,
        favoriteCards: [],
      });
      await newUser.save();

      if (image) {
        // VALIDATE MISSING! ADD VALIDATION FOR FOLLOWING:
        // avatar.name
        // avatar.file
        // avatar.type

        const uploadedAvatar = new UploadModel({
          fileName: image.name,
          file: {
            data: image.file,
            type: image.type,
          },
        });
        const userImage = await uploadedAvatar.save();
        await newUser.update({
          image: userImage._id,
        });
        await newUser.save();
      }
      res.status(200).send(create200Response(newUser._id, req));
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req.method, req.path));
  }
});
// DELETE USER (Register) // ONLY ALLOWS DELETING YOURSELF.
router.delete("/", auth.checkIfLoggedIn, async (req, res) => {
  try {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    const id = tokenData.id;
    if (id) {
      const user = await UsersModel.findById(id);
      if (user) {
        await user.delete();
        res
          .status(200)
          .send(
            create200Response(`Successfully deleted user with ID: ${id}.`, req)
          );
      } else {
        res
          .status(400)
          .send(
            create400Response(`No user found with ID: ${id} to delete.`, req)
          );
      }
    } else {
      res
        .status(400)
        .send(create400Response("No ID provided to delete user.", req));
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req.method, req.path));
  }
});
// GET USER BY LOGGED IN USER.
router.get("/", auth.checkIfLoggedIn, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await UsersModel.findById(id)
        .populate("image")
        .select("-hashedPassword");
      if (user) {
        res.status(200).send(create200Response(user, req));
      } else {
        res
          .status(404)
          .send(create400Response(`No user found with ID: ${id}.`, req));
      }
    } else {
      res
        .status(404)
        .send(
          create400Response("No ID provided for finding user profile.", req)
        );
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req.method, req.path));
  }
});
// GET PUBLIC PROFILE DATA
router.get("/:id", auth.checkIfAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await UsersModel.findById(id);
      if (user) {
        res
          .status(200)
          .send(
            create200Response(
              { username: user.username, email: user.email, role: user.role },
              req
            )
          );
      } else {
        res
          .status(404)
          .send(create400Response(`No user found with ID: ${id}.`, req));
      }
    } else {
      res
        .status(404)
        .send(
          create400Response("No ID provided for finding user profile.", req)
        );
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});
// UPLOAD PROFILE AVATAR
router.post("/avatar", auth.checkIfLoggedIn, async (req, res) => {
  try {
    // CHECK THAT WE HAVE UPLOADED 1 FILE
    const file = req.body.file;
    if (!file) {
      res
        .status(400)
        .send(create400Response("You must provide atleast 1 file!", req));
    } else {
      const id = req.decodedToken?.id;
      if (id) {
        const user = await UsersModel.findById(id);
        if (user) {
          // WE FOUND THE USER TO ADD AVATAR TO

          const uploadedFile = new UploadModel({
            file: {
              data: file.file,
              type: file.type,
            },
            fileName: file.name,
          });
          await uploadedFile.save();

          await user.update({
            image: uploadedFile._id,
          });
          await user.save();

          res.status(200).send(create200Response(uploadedFile, req));
        } else {
          res
            .status(404)
            .send(create400Response(`No user found with ID: ${id}.`, req));
        }
      } else {
        res
          .status(404)
          .send(
            create400Response(
              "No ID provided for finding user to add Avatar image to.",
              req
            )
          );
      }
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});
// ADD CARD TO FAV
router.post("/favorite/card", auth.checkIfLoggedIn, async (req, res) => {
  try {
    const id = req.query.id;
    const name = req.query.name;
    const imageUrl = req.query.image;
    if (id && name && imageUrl) {
      const userId = req.decodedToken?.id;

      if (userId) {
        const user = await UsersModel.findById(userId);
        if (user) {
          const favIndex = user.favoriteCards.findIndex(
            (cardId) => cardId.id === id
          );
          if (favIndex !== -1) {
            res
              .status(200)
              .send(
                create200Response("Card is already in your favorites", req)
              );
          } else {
            user.favoriteCards.push({
              id: id,
              name: name,
              imageUrl: imageUrl,
            });
            await user.save();
            res
              .status(200)
              .send(
                create200Response("Successfully added card to favorites!", req)
              );
          }
        } else
          res
            .status(404)
            .send(create400Response("No user found with cookie ID.", req));
      } else
        res
          .status(404)
          .send(create400Response("No userId found in cookie.", req));
    } else
      res
        .status(404)
        .send(
          create400Response(
            "No ID, name OR imageUrl provided to add card to favorites",
            req
          )
        );
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});
// REMOVE CARD FROM FAV
router.delete("/favorite/card", auth.checkIfLoggedIn, async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const userId = req.decodedToken?.id;

      if (userId) {
        const user = await UsersModel.findById(userId);
        if (user) {
          // const filtered = user.favoriteCards.filter((favId) => favId !== id);

          const favIndex = user.favoriteCards.findIndex(
            (cardId) => cardId.id === id
          );
          if (favIndex !== -1) {
            user.favoriteCards.splice(favIndex, 1);
            await user.save();
            res
              .status(200)
              .send(
                create200Response(
                  `Successfully removed card with ID: ${id} from your favorites`,
                  req
                )
              );
          } else
            res
              .status(400)
              .send(
                create400Response(
                  `Card with ID: ${id} is not in your favorites.`,
                  req
                )
              );
        } else {
          res
            .status(400)
            .send(create400Response("No user found with cookie ID.", req));
        }
      } else {
        res
          .status(400)
          .send(create400Response("No userId found in cookie.", req));
      }
    } else {
      res
        .status(404)
        .send(
          create400Response("No ID provided to remove card from favorites", req)
        );
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});

module.exports = router;

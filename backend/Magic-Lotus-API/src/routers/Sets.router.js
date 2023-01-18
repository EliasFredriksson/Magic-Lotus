const express = require("express");
const auth = require("../helpers/auth");
const CatalogModel = require("../models/Catalog.model");

const SetModel = require("../models/Set.model");

const responses = require("../helpers/Response");

const router = express.Router();

// CREATE SET / UPDATE EXISTING SET
router.post("/", auth.checkIfAdmin, async (req, res) => {
  try {
    const { set } = req.body;

    const existingSet = await SetModel.findOne({ id: set.id });
    if (existingSet) {
      catalog.update({
        ...set,
      });
      res
        .status(200)
        .send(
          responses.create200Response(
            `Set ${category} already exists, updated instead.`,
            req
          )
        );
    } else {
      const newSet = new SetModel({
        ...set,
      });
      await newSet.save();
      res.status(200).send(responses.create200Response(newSet._id, req));
    }
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// GET ALL SETS
router.get("/", async (req, res) => {
  try {
    const sets = await SetModel.find();
    res.status(200).send(responses.create200Response(sets, req));
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// GET ALL SET NAMES
router.get("/names", async (req, res) => {
  try {
    const sets = await SetModel.find().select("name");
    const data = sets.map((c) => c.name);
    res.status(200).send(responses.create200Response(data, req));
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// GET SET BY NAME
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    if (name) {
      const set = await SetModel.findOne({ name: name });
      if (!set) {
        res
          .status(400)
          .send(
            responses.create400Response(`No set found with name: ${name}`, req)
          );
      } else res.status(200).send(responses.create200Response(set, req));
    } else
      res
        .status(400)
        .send(
          responses.create400Response(
            "No name parameter provided to find set with.",
            req
          )
        );
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// GET SET BY ID
router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const set = await SetModel.findById(id);
      if (!set) {
        res
          .status(400)
          .send(
            responses.create400Response(`No set found with id: ${id}`, req)
          );
      } else res.status(200).send(responses.create200Response(sets, req));
    } else {
    }
    const sets = await SetModel.find();
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// DELETE SET BY ID
router.delete("/:id", auth.checkIfAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const set = await SetModel.findById(req.params.id);
      if (!set) {
        res
          .status(400)
          .send(
            responses.create400Response(`No set found with id: ${id}`, req)
          );
      } else {
        const deletedSet = await set.delete();
        res.status(200).send(responses.create200Response(deletedSet, req));
      }
    } else {
      res
        .status(400)
        .send(responses.create400Response(`Catalog ID not provided!`, req));
    }
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

module.exports = router;

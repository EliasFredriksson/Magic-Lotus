const express = require("express");
const jwt = require("jsonwebtoken");
const utils = require("../helpers/utils");
const auth = require("../helpers/auth");
const CatalogModel = require("../models/Catalog.model");

const responses = require("../helpers/Response");

const router = express.Router();

// CREATE CATALOG
router.post("/", auth.checkIfAdmin, async (req, res) => {
  try {
    const { category, data } = req.body;

    const catalog = await CatalogModel.findOne({ category });
    if (catalog) {
      // USER NOT FOUND IN DATABASE
      // INVALIDATE AUTH TOKEN
      // SEND RESPONSE
      res
        .status(400)
        .send(
          responses.create400Response(
            `Catalog ${category} already exists!`,
            req
          )
        );
    } else {
      const newCatalog = new CatalogModel({
        category: category,
        data: data,
      });
      await newCatalog.save();
      res
        .status(200)
        .send(responses.create200Response(newCatalog._id, "POST", "/catalog/"));
    }
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// GET ALL CATALOGS
router.get("/", async (req, res) => {
  try {
    const catalogs = await CatalogModel.find();
    res.status(200).send(responses.create200Response(catalogs, req));
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// GET CATALOG BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      const catalog = await CatalogModel.findById(req.params.id);
      if (!catalog) {
        res
          .status(400)
          .send(
            responses.create400Response(`No catalog found with id: ${id}`, req)
          );
      } else {
        res.status(200).send(responses.create200Response(catalog, req));
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

// UPDATE CATALOG BY ID
router.put("/:id", auth.checkIfAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body.data;
    if (id && data) {
      const catalog = await CatalogModel.findById(req.params.id);
      if (!catalog) {
        res
          .status(400)
          .send(
            responses.create400Response(`No catalog found with id: ${id}`, req)
          );
      } else {
        catalog.update({ data: data });
        await catalog.save();
        res.status(200).send(responses.create200Response(catalog, req));
      }
    } else {
      res
        .status(400)
        .send(
          responses.create400Response(
            `Catalog ID and / or DATA in body not provided!`,
            req
          )
        );
    }
  } catch (error) {
    res.status(400).send(responses.create400Response(error, req));
  }
});

// DELETE CATALOG BY ID
router.delete("/:id", auth.checkIfAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const catalog = await CatalogModel.findById(req.params.id);
      if (!catalog) {
        res
          .status(400)
          .send(
            responses.create400Response(`No catalog found with id: ${id}`, req)
          );
      } else {
        const deletedCatalog = await catalog.delete();
        res.status(200).send(responses.create200Response(deletedCatalog, req));
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

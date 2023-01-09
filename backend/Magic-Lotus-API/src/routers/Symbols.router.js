const express = require("express");
const auth = require("../helpers/auth");
const SymbolModel = require("../models/Symbol.model");

const { create200Response, create400Response } = require("../helpers/Response");

const router = express.Router();

// CREATE SYMBOL / UPDATE SYMBOL
router.post("/", auth.checkIfAdmin, async (req, res) => {
  try {
    const { symbol } = req.body;

    if (symbol) {
      const existingSymbol = await SymbolModel.findOne({
        symbol: symbol.symbol,
      });
      if (existingSymbol) {
        await existingSymbol.update(symbol);
        await existingSymbol.save();
        res
          .status(200)
          .send(
            create200Response(
              `Success! Symbol already exists, updated instead: ${existingSymbol._id}`,
              req
            )
          );
      } else {
        const newSymbol = new SymbolModel(symbol);
        await newSymbol.save();
        res
          .status(200)
          .send(
            create200Response(`Success! Symbol created: ${newSymbol._id}`, req)
          );
      }
    } else {
      res
        .status(400)
        .send(create400Response('Missing "symbol" property in req body!', req));
    }
  } catch (error) {
    console.warn("ERROR: ", error);
    res.status(400).send(create400Response(error, req));
  }
});

// GET ALL SYMBOLS
router.get("/", auth.checkIfAdmin, async (req, res) => {
  try {
    const symbols = await SymbolModel.find();
    res.status(200).send(create200Response(symbols, req));
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});

// GET ALL MANA SYMBOLS
router.get("/mana", async (req, res) => {
  try {
    const symbols = await SymbolModel.find({
      represents_mana: true,
    });
    res.status(200).send(create200Response(symbols, req));
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});

// GET SYMBOL BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const symbol = await SymbolModel.findById(req.params.id);
      if (!symbol) {
        res
          .status(400)
          .send(create400Response(`No symbol found with id: ${id}`, req));
      } else {
        res.status(200).send(create200Response(symbol, req));
      }
    } else {
      res.status(400).send(create400Response(`Symbol ID not provided!`, req));
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});

// DELETE SYMBOL BY ID
router.delete("/:id", auth.checkIfAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const symbol = await SymbolModel.findById(req.params.id);
      if (!symbol) {
        res
          .status(400)
          .send(create400Response(`No symbol found with id: ${id}`, req));
      } else {
        const deletedSymbol = await symbol.delete();
        res.status(200).send(create200Response(deletedSymbol, req));
      }
    } else {
      res.status(400).send(create400Response(`Symbol ID not provided!`, req));
    }
  } catch (error) {
    res.status(400).send(create400Response(error, req));
  }
});

module.exports = router;

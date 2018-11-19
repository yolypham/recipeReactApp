'use strict';

const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipeModel');

//GET 
router
  .get('/test', (req, res) => res.json({ msg: "Reach recipeIndex" }))
  .get('/', (req, res) => {
    Recipe.find({})
      .then(docs => {
        res.status(200).send({ message: "Success", payload: docs });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message });
      });
  })
  .get('/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    Recipe.find({ _id: id })
      .then(docs => {
        res.status(200).send({ message: "Success", payload: docs });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

//POST
router.post("/", (req, res) => {
  const { title, ingredients, instructions, picture } = req.body;
  // instantiate new recipe model
  const recipe = new Recipe({
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    picture: picture
  });
  recipe
    .save()
    .then(doc => {
      res.status(201).json({ message: "Success", payload: doc });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  // find and remove it
  Recipe.findByIdAndRemove({ _id: id }).then(doc => {
    res
      .status(200)
      .send({
        message: "success",
        payload: doc
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  });
});

//PUT 
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, picture } = req.body;

  const updateFields = {
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    picture: picture
  };

  Recipe.findByIdAndUpdate(id, updateFields)
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

//PATCH 
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { picture } = req.body;

  const updateField = {
    picture: picture
  };

  Recipe.findByIdAndUpdate(id, updateField)
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

exports.router = router;






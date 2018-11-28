'use strict';

const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipeModel');

//GET 
router
  .get('/', async (req, res, next) => {
    try {
      const docs = await Recipe.find({});
      res.status(200).send({ data: docs })
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const docs = await Recipe.find({ _id: id });
      res.status(200).send({ data: docs })
    } catch (e) {
      next(e);
    }
  });

//POST
router
  .post('/', async (req, res, next) => {
    const { title, ingredients, instructions, imgUrl } = req.body;
    const recipe = new Recipe({
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      imgUrl: imgUrl
    });

    try {
      const doc = await recipe.save();
      res.status(201).send({
        data: [doc]
      })
    } catch (e) {
      next(e);
    }
  });

//DELETE
router
  .delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
      const doc = await Recipe.findByIdAndDelete({ _id: id });
      res.status(202).send({
        data: [doc]
      })
    } catch (e) {
      next(e);
    }
  });

//PATCH
router
  .patch('/patch-user/:userObjectId', async (req, res, next) => {
    const { userObjectId } = req.params;

    try {
      const doc = await Recipe.updateMany({
        user: userObjectId
      })

      res.status(200).send({ data: [doc] })
    } catch (e) {
      next(e)
    }
  });

//PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, imgUrl } = req.body;

  const updateFields = {
    title: title,
    ingredients: ingredients,
    instructions: instructions,
    imgUrl: imgUrl
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


exports.router = router;






'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

//GET 
router
    .get('/', async (req, res, next) => {
        try {
            const docs = await User.find({});
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


exports.router = router;






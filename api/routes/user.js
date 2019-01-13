'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const { verifyToken } = require("../middleware/auth");

const getUserById = async (req, res, next) => {
    const { user } = req.decoded
    if (user && user.id) {
        try {
            const doc = await User.findById(user.id)
            req.user = doc
            next()
        } catch (e) {
            next(e)
        }
    }
}

//GET 
router
    .get('/current', verifyToken, getUserById, (req, res, next) => {
        if (req.user) {
            res.status(200).send(req.user)
        } else {
            next(new Error('not found'))
        }
    })
    .get('/user/:email', async (req, res, next) => {
        try {
            const { email } = req.params;
            const user = await User.find({ email: email });
            //console.log(email);
            console.log(user);
            res.status(200).send(user)
        } catch (e) {
            next(e);
        }
    });

exports.router = router;






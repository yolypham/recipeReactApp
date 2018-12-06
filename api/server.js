'use strict';

const seeds = require('./seeds/seeds');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');


const app = express();

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connect...");
    seeds();
    console.log('db initialized with seed docs...');
  })
  .catch((error) => console.log(error.mesage));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

//this line needed for POST
app.use(express.json());

app.use(['/recipes'], require('./routes/recipe').router);
app.use(['/users'], require('./routes/user').router);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;

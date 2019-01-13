'use strict';

const path = require('path');

const seeds = require('./seeds/seeds');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');
const express = require('express');

const app = express();

const db = require('./utils/constants').MONGODB_URI;

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

//app.use(router);
app.use('/', router);
// app.use('/recipes', require('./routes/recipe').router);
// app.use('/users', require('./routes/user').router);



// for deploying to heroku, set root for static landing page
app.use('/', express.static(
  path.join(__dirname, '../build')
))

//if the user visits a URL that we do not have a defined route path for,
//send them index.html to handle it
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;

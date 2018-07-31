const express = require('express')
const app = express();
const router = require('./routes');
const monggose = require('mongoose');
const bodyParser = require('body-parser');

const DB_URL = 'mongodb://localhost/interlink-meetup';
monggose.connect(DB_URL, function (err) {
  if (err) {
    console.error('Mongo connection FAIL: ' + err)
  } else {
    console.log('Mongo connection OK')
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

module.exports = app;
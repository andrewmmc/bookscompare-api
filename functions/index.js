const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

exports.book = functions.https.onRequest(app);

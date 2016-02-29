'use strict';

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000,
  lib = require('./lib'),
  healthCheck = require('@nymdev/health-check');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(healthCheck());

app.post('/publish', bodyParser.json(), (req, res) => res.json(lib(req)));

app.listen(port);
console.log(`Server listening on ${port}`);

'use strict';

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000,
  lib = require('./lib'),
  healthCheck = require('@nymdev/health-check'),
  newsiebot = express(),
  chalk = require('chalk');

if (!process.env.SLACK_URL) {
  console.log(chalk.red('[Error] ') + 'SLACK_URL not set!');
  process.exit(1);
}

newsiebot.use(bodyParser.urlencoded({ extended: true }));
newsiebot.use(healthCheck());

newsiebot.post('/publish', bodyParser.json(), (req, res) => res.json(lib(req)));

app.use('/newsiebot', newsiebot);
app.listen(port);
console.log(`Server listening on ${port}`);

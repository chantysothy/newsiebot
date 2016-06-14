'use strict';

const fetch = require('node-fetch'),
  moment = require('moment'),
  _ = require('lodash'),
  urlParse = require('url').parse,
  chalk = require('chalk');

/**
 * find out if an article has already been published
 * note: this is super basic and won't catch articles that are re-published
 * within a minute of their original publish date
 * @param {object} data
 * @param {string} data.date
 * @returns {boolean}
 */
function isRepublished(data) {
  var now = moment(),
    publishDate = moment(data.date);

  return publishDate.add(30, 'seconds').isBefore(now);
}

/**
 * get the data the bot needs from the article
 * @param {string} uri
 * @param {string} [port]
 * @returns {Promise}
 */
function getData(uri, port) {
  var parts = urlParse(uri),
    url;

  if (port && port !== '80') {
    url = `${parts.protocol}//${parts.hostname}:${port}${parts.path}`;
  } else {
    url = uri;
  }

  return fetch(url, { timeout: 2000 })
    .then(res => res.json())
    .then(function (data) {
      return _.pickBy({
        title: data.primaryHeadline,
        image: data.feedImgUrl,
        teaser: data.teaser,
        isRepublished: isRepublished(data)
      }, _.indentity);
    })
    .catch(function (e) {
      console.log(chalk.red('[Error] ') + e.message);
      return e; // return the error so other things don't run
    });
}

module.exports.getData = getData;

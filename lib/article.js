'use strict';

const fetch = require('node-fetch'),
  _ = require('lodash');

/**
 * get the data the bot needs from the article
 * @param {string} url
 * @returns {Promise}
 */
function getData(url) {
  return fetch(url, { timeout: 2000 })
    .then(res => res.json())
    .then(function (data) {
      return _.pickBy({
        title: data.primaryHeadline,
        image: data.feedImgUrl,
        url: data.canonicalUrl,
        teaser: data.teaser
      }, _.indentity);
    });
}

module.exports.getData = getData;
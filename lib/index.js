'use strict';

const _ = require('lodash'),
  page = require('./page'),
  article = require('./article'),
  bot = require('./bot');

/**
 * add url into the data
 * @param {string} url
 * @returns {Function}
 */
function addUrl(url) {
  return function (data) {
    return _.assign(data, { url: url });
  };
}

function update(req) {
  const pageData = req.body,
    url = pageData.url,
    articleRef = page.findArticle(pageData);

  return article.getData(articleRef)
    .then(addUrl(url))
    .then(bot.formatMessage)
    .then(bot.sendMessage);
}

module.exports = update;

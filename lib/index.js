'use strict';

const _ = require('lodash'),
  chalk = require('chalk'),
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
    .then(function (data) {
      if (!data.isRepublished) {
        // right now we're not messaging when people re-publish an article,
        // but we can easily turn this on by calling bot.formatRepublishedMessage()
        return bot.sendMessage(bot.formatPublishedMessage(data));
      } else {
        console.log(chalk.blue('[Re-published] ') + data.url);
      }
    });
}

module.exports = update;

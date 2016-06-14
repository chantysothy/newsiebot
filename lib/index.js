'use strict';

const _ = require('lodash'),
  chalk = require('chalk'),
  urlParse = require('url').parse,
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
    port = urlParse(url).port,
    articleRef = page.findArticle(pageData);

  if (!pageData) {
    console.log(chalk.yellow('[Warning]') + ' Missing page data required to publish');
  } else if (!url) {
    console.log(chalk.yellow('[Warning]') + ' Missing page url required to publish');
  } else if (!articleRef) {
    console.log(chalk.yellow('[Warning]') + ' Missing article required to publish: ' + chalk.inverse(` ${url} `));
  } else {
    return article.getData(articleRef, port)
      .then(addUrl(url))
      .then(function (data) {
        if (!data.isRepublished) {
          // right now we're not messaging when people re-publish an article,
          // but we can easily turn this on by calling bot.formatRepublishedMessage()
          return bot.sendMessage(bot.formatPublishedMessage(data));
        } else {
          console.log(chalk.blue('[Re-published] ') + data.url);
        }
      })
      .catch(function (e) {
        console.log(chalk.red('[Error] ') + e.message);
        // don't return the error, just log it
      });
  }
}

module.exports = update;

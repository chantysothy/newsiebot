'use strict';

const page = require('./page'),
  article = require('./article'),
  bot = require('./bot');

function update(req) {
  const pageData = req.body,
    articleRef = page.findArticle(pageData);

  return article.getData(articleRef)
    .then(bot.formatMessage)
    .then(bot.sendMessage);
}

module.exports = update;

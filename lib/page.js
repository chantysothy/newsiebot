'use strict';

const _ = require('lodash'),
  url = require('url');

/**
 * transforms clay component ref into url
 * @param  {string} ref
 * @param {string} pageUrl
 * @return {string}
 */
function formatRef(ref, pageUrl) {
  var protocol = url.parse(pageUrl).protocol,
    port = url.parse(pageUrl).port,
    parts = url.parse(`${protocol}//${ref}`), // need to add protocol so parser thinks it's a url
    published = '@published',
    articleUrl;

  if (port && port !== '80') {
    articleUrl = `${protocol}//${parts.hostname}:${port}${parts.path}`;
  } else {
    articleUrl = `${protocol}//${parts.hostname}${parts.path}`;
  }

  if (!_.includes(articleUrl, published)) {
    articleUrl += published;
  }

  return articleUrl;
}


function findArticle(pageData) {
  var article = _.find(pageData.main, value => _.includes(value, '/components/article/'));

  if (article) {
    return formatRef(article, pageData.url);
  }
}

module.exports.findArticle = findArticle;

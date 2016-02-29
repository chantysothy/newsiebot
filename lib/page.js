'use strict';

const _ = require('lodash'),
  url = require('url'),
  port = process.env.CLAY_PORT || '',
  protocol = process.env.CLAY_PROTOCOL || 'http:';

/**
 * transforms clay component ref into url
 * @param  {String} ref
 * @return {String}
 */
function formatRef(ref) {
  let host,
    pathname,
    formatted,
    published = '@published';

  // need to add protocol to ref
  // to be parsed as url object by `url`
  ref = protocol + '//' + ref;

  host = url.parse(ref).host;
  pathname = url.parse(ref).pathname;

  formatted = `${protocol}//${host}${port}${pathname}`;

  if (!_.includes(formatted, published)) {
    formatted += published;
  }

  return formatted;
}


function findArticle(pageData) {
  return formatRef(_.find(pageData.main, value => _.includes(value, '/components/article/')));
}

module.exports.findArticle = findArticle;

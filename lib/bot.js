'use strict';

const striptags = require('striptags'),
  fetch = require('node-fetch'),
  _ = require('lodash');

function formatMessage(article) {
  const title = striptags(article.title),
    image = article.image,
    message = {
      attachments: [{
        fallback: `Published "${title}" ${article.url}`,
        title: title,
        title_link: article.url,
        text: article.teaser,
        color: '#32e0bd'
      }]
    };

  if (image) {
    _.set(message, 'attachments[0].thumb_url', image);
  }

  return message;
}

function sendMessage(message) {
  const slack = process.env.SLACK_URL;

  return fetch(slack, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(message)
  });
}

module.exports.formatMessage = formatMessage;
module.exports.sendMessage = sendMessage;

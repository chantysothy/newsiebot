'use strict';

const striptags = require('striptags'),
  fetch = require('node-fetch');

function formatMessage(article) {
  const title = striptags(article.title),
    image = article.image,
    message = {
      fallback: `Published "${title}" ${article.url}`,
      title: title,
      title_link: article.url,
      color: '#32e0bd'
    };

  if (image) {
    message.image = image;
  }

  return message;
}

function sendMessage(message) {
  const slack = process.env.SLACK_URL;

  return fetch(slack, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: message
  });
}

module.exports.formatMessage = formatMessage;
module.exports.sendMessage = sendMessage;

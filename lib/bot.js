'use strict';

const striptags = require('striptags'),
  he = require('he'),
  fetch = require('node-fetch'),
  _ = require('lodash'),
  chalk = require('chalk');

function toPlaintext(str) {
  return he.decode(striptags(str));
}

function formatPublishedMessage(data) {
  const title = toPlaintext(data.title),
    teaser = toPlaintext(data.teaser),
    image = data.image,
    message = {
      attachments: [{
        pretext: 'Just published on Science of Us',
        fallback: `Published "${title}" ${data.url}`,
        title: title,
        title_link: data.url,
        text: teaser,
        color: '#32e0bd'
      }]
    };

  if (image) {
    _.set(message, 'attachments[0].thumb_url', image);
  }

  return message;
}

function formatRepublishedMessage(data) {
  const title = toPlaintext(data.title);

  return {
    text: `Just re-published "<${data.url}|${title}>" on Science of Us`
  };
}

function sendMessage(message) {
  const slack = process.env.SLACK_URL;

  return fetch(slack, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(message)
  })
  .then(function () {
    console.log(chalk.green('[Published] ') + _.get(message, 'attachments[0].title_link'));
  })
  .catch(function (e) {
    console.log(chalk.red('[Error] ') + e.message);
  });
}

module.exports.formatPublishedMessage = formatPublishedMessage;
module.exports.formatRepublishedMessage = formatRepublishedMessage;
module.exports.sendMessage = sendMessage;

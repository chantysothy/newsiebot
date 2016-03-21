'use strict';

const striptags = require('striptags'),
  he = require('he'),
  fetch = require('node-fetch'),
  _ = require('lodash'),
  chalk = require('chalk'),
  sites = require('./sites');

function toPlaintext(str) {
  return he.decode(striptags(str));
}

function formatPublishedMessage(data) {
  const title = toPlaintext(data.title),
    teaser = toPlaintext(data.teaser),
    image = data.image,
    site = sites.get(data.url),
    message = {
      attachments: [{
        pretext: 'Just published on ' + site.name,
        fallback: `Published "${title}" ${data.url}`,
        title: title,
        title_link: data.url,
        text: teaser,
        color: site.color
      }]
    };

  if (image) {
    _.set(message, 'attachments[0].thumb_url', image);
  }

  return message;
}

function formatRepublishedMessage(data) {
  const title = toPlaintext(data.title),
    site = sites.get(data.url);

  return {
    text: `Just re-published "<${data.url}|${title}>" on ${site.name}`
  };
}

function sendMessage(message) {
  const slack = process.env.SLACK_URL,
    url = _.get(message, 'attachments[0].title_link');

  // figure out what channel we should send the message to, based on the url
  if (_.includes(url, '//nymag.com/')) {
    _.set(message, 'channel', sites.get(url).channel);
  } else {
    _.set(message, 'channel', '#bots'); // local dev, qa, anything that's not a known prod url
  }

  return fetch(slack, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(message)
  })
  .then(function () {
    console.log(chalk.green('[Published] ') + url);
  })
  .catch(function (e) {
    console.log(chalk.red('[Error] '), e.stack);
  });
}

module.exports.formatPublishedMessage = formatPublishedMessage;
module.exports.formatRepublishedMessage = formatRepublishedMessage;
module.exports.sendMessage = sendMessage;

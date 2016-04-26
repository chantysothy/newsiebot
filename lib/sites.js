'use strict';

const _ = require('lodash'),
  sites = {
    scienceofus: {
      name: 'Science of Us',
      color: '#32e0bd',
      channel: '#science-of-us-alerts'
    },
    selectall: {
      name: 'Select All',
      color: '#103cbc',
      channel: '#select-all-alerts'
    },
    rando: {
      name: 'some site I don\'t support',
      color: '#eee',
      channel: '#bots'
    }
  };

function get(url) {
  if (_.includes(url, '/scienceofus/')) {
    return sites.scienceofus;
  } else if (_.includes(url, '/selectall/')) {
    return sites.selectall;
  } else {
    return sites.rando;
  }
}

module.exports.get = get;

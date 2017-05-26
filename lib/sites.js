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
    di: {
      name: 'Daily Intelligencer',
      color: '#e93525',
      channel: '#daily-intel-alerts'
    },
    thecut: {
      name: 'The Cut',
      color: '#381ab1',
      channel: '#the-cut-alerts'
    },
    strategist: {
      name: 'The Strategist',
      color: '#f85d00',
      channel: '#strategist-alerts'
    },
    vindicated: {
      name: 'The Vindicated',
      color: '#ec2c00',
      channel: '#vindicated-alerts'
    },
    speed: {
      name: 'Speed',
      color: '#ec2c00',
      channel: '#speed-alerts'
    },
    thejob: {
      name: 'The Job',
      color: '#ec2c00',
      channel: '#thejob-alerts'
    },
    // note: nymag is a catch-all for unbranded nymag.com content
    nymag: {
      name: 'New York Magazine',
      color: '#ffe000',
      channel: '#nymag-alerts'
    },
    grubstreet: {
      name: 'Grubstreet',
      color: '#b7d564',
      channel: '#grubstreet-alerts'
    },
    vulture: {
      name: 'Vulture',
      color: '#00bdf1',
      channel: '#vulture-alerts'
    },
    betamale: {
      name: 'Beta Male',
      color: '#ec2c00',
      channel: '#betamale-alerts'
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
  } else if (_.includes(url, '/daily/intelligencer/')) {
    return sites.di;
  } else if (_.includes(url, '/strategist/')) {
    return sites.strategist;
  } else if (_.includes(url, '/vindicated/')) {
    return sites.vindicated;
  } else if (_.includes(url, '/speed/')) {
    return sites.speed;
  } else if (_.includes(url, '/thejob/')) {
    return sites.thejob;
  } else if (_.includes(url, '/betamale/')) {
    return sites.betamale;
  } else if (_.includes(url, 'nymag.com')) {
    // note: this should come AFTER all nymag.com brands
    return sites.nymag;
  } else if (_.includes(url, 'grubstreet.com')) {
    return sites.grubstreet;
  } else if (_.includes(url, 'vulture.com')) {
    return sites.vulture;
  } else if (_.includes(url, 'thecut.com')) {
    return sites.thecut;
  } else {
    return sites.rando;
  }
}

module.exports.get = get;

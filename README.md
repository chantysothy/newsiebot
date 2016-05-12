# newsiebot
A simple bot that announces when articles are published

Currently supports these sites:

* Science of Us
* Select All
* Daily Intelligencer
* The Cut
* New York Magazine
* Grubstreet
* Vulture
* Beta Male

## Usage

Set these env variables:

* `SLACK_URL` the url of the webhook you want to POST to
* `CLAY_PORT` (optional) the port for your clay instance, e.g. `:3001`
* `CLAY_PROTOCOL` (optional) the protocol for your clay instance, e.g. `http:`

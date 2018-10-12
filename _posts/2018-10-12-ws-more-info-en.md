---
title: 'More info about Websocket changes at 19th of October and 31st of December 2018'
categories: en News
image:
lang: en
published: true
ref: 2018-10-12-ws-more-info
traffictypes:
  - Road
tags:
  - Admin
  - EndOfLife
---

Websocket endpoints will cease to serve 19th of October 2018.

These road websocket will cease:
* `ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata`
* `ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id}`

Temporary replacement addresses are:
* `ws://tie-legacy.digitraffic.fi/api/v1/plain-websockets/tmsdata`
* `ws://tie-legacy.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id}`

The temporary replacement addresses are valid until the end of 2018.

Example application using a temporary endpoint:

[```https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testWsLams.html```](https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testWsLams.html)

AmazonMQ will replace the endpoints during the end of the year 2018.
More protocols will be supported and subscriptions allows clients to receive only the data they are interested in.

The new AmazonMQ (MQTT) endpoints are available in test. You may try them out with example client code at:

[```https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testMqtt.html```](https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testMqtt.html)


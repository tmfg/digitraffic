---
title: 'Marine websocket API changes 19th of October and 31st of December 2018'
categories: en News
image:
lang: en
published: true
ref: 2018-10-12-ws-legacy-marine
traffictypes:
  - Marine
tags:
  - Admin
  - EndOfLife
---

Marine Websocket address will cease sending data 19th of October 2018.

The following address will cease:
* `ws://meri.digitraffic.fi/api/v1/plain-websockets/locations`

Temporary replacement address:
* `ws://meri-legacy.digitraffic.fi/api/v1/plain-websockets/locations`

This address will serve data **until the end of the year 2018**.

Temporary endpoint can be tested with code at:
[```https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testWs.html```](https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testWs.html)

Before end of year 2018 a new API will be available with AmazonMQ.
More protocols will be supported and subscriptions allows clients to receive data they are interested in.

The new API is in test and can be tested using the following example client:
[```https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testMqtt.html```](https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testMqtt.html)

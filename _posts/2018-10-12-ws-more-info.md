---
title: 'Lisätietoa Websocket rajapintojen muutoksista 19.10. ja 31.12.2018'
categories: Tiedotteet
image: 
lang: fi
published: true
ref: 2018-10-12-ws-more-info
traffictypes:
  - Tieliikenne
tags:
  - Ylläpito
  - EndOfLife
---
Websocket endpointit lakkaavat toimimasta 19.10.2018.

Seuraavat tiepuolen websocketit lakkaavat:
* `ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata`
* `ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id}`

Väliaikaiset korvaavat websocket osoitteet ovat:
* `ws://tie-legacy.digitraffic.fi/api/v1/plain-websockets/tmsdata`
* `ws://tie-legacy.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id}`

Väliaikaiset osoitteet ovat **voimassa 2018 loppuun asti**.

Esimerkkisovellus väliaikaisella osoitteella:
[```https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testWsLams.html```](https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testWsLams.html)

Vuoden loppuun mennessä tilalle otetaan käyttöön AmazonMQ.
Näin saadaan tuki useammalle protokollalle sekä mahdollisuus vastaanottaa vain itseä kiinnostavia viestejä.

Uutta AmazonMQ (MQTT) rajapintaa voi kokeilla testiympäristössä esimerkkikoodilla:
[```https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testMqtt.html```](https://github.com/finnishtransportagency/digitraffic-metadata/blob/develop/src/test/html/testMqtt.html)


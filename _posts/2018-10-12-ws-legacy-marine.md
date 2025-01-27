---
title: 'Meriliikenteen websocket rajapinta muuttuu 19.10. ja 31.12.2018'
categories: Tiedotteet
image:
lang: fi
published: true
ref: 2018-10-12-ws-legacy-marine
traffictypes:
  - Meriliikenne
tags:
  - Ylläpito
  - EndOfLife
---

Meriliikenteen Websocket osoite lakkaa toimimasta 19.10.2018.

Päättyvä osoite on:

- `ws://meri.digitraffic.fi/api/v1/plain-websockets/locations`

Tilapäinen korvaava osoite on:

- `ws://meri-legacy.digitraffic.fi/api/v1/plain-websockets/locations`.

Korvaava osoite on voimassa **vuoden 2018 loppuun asti**.

Väliaikaista rajapintaa pääsee testaamaan esimerkkikoodilla:
[`https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testWs.html`](https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testWs.html)

Vuoden loppuun mennessä tilalle tulee AmazonMQ. Näin saadaan tuki useammalle
protokollalle sekä mahdollisuus vastaanottaa vain itseä kiinnostavia viestejä.

Uutta AmazonMQ (MQTT) endpointtia pääsee kokeilemaan testiympäristössä
esimerkkikoodilla:
[`https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testMqtt.html`](https://github.com/finnishtransportagency/digitraffic-ais/blob/develop/src/test/html/testMqtt.html)

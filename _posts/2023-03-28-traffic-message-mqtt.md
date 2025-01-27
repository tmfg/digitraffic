---
title: 'Liikennetiedotteiden MQTT'
image:
published: true
categories: Tiedotteet
ref: 2023-03-28-traffic-message-mqtt
lang: fi
traffictypes:
- Tieliikenne
tags:
- Rajapinnat
---

Liikennetiedotteet on saatavilla nyt MQTT:n kautta.

MQTT-aiheet ovat seuraavat:

- `traffic-message-v2/datex2/<situationType>` Viestin sisältö on Datex2 XML
  muotoa.
- `traffic-message-v2/simple/<situationType>` Viestin sisältö on
  liikennetiedotteiden simppeli JSON joka on gzip-pakattu ja base64-koodattu.

Mahdolliset situationType arvot: `TRAFFIC_ANNOUNCEMENT`, `EXEMPTED_TRANSPORT`,
`WEIGHT_RESTRICTION`, `ROAD_WORK`

Lisätietoa [dokumentaatiossa](/tieliikenne/).

---
title: 'Traffic messages MQTT'
image:
published: true
categories: en News
ref: 2023-03-28-traffic-message-mqtt
lang: en
traffictypes:
- Road
tags:
- APIs
---

Traffic messages are now published in MQTT

Topics are:

- ```traffic-message-v2/datex2/<situationType>``` Message payload is in Datex2 XML format.
- ```traffic-message-v2/simple/<situationType>``` Message payload is in simple JSON that is gzipped and base64-coded

Possible values for situationType are: `TRAFFIC_ANNOUNCEMENT`, `EXEMPTED_TRANSPORT`, `WEIGHT_RESTRICTION`, `ROAD_WORK`

More information in [documentation](/en/road-traffic/).
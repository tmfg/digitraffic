---
layout: sub-traffictype
permalink: /en/marine-traffic/ais/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
hero-image: icebreaker
title: AIS messages
lang: en
ref: ais-messages
intro: Message filtering and modification
---

Digitraffic service provides A class position and metadata messages. Some AIS-messages are filtered or modified.

## Fishing vessels

All fishing vessels (vessel type 30) are filtered out from the AIS-messages.

## Vessel type

Vessel types and cargo descriptions are modified with following rules.

| Original value | Modified value 
| < 10 | 0
| 10 - 19 | 10
| 20 - 29 | 20
| 30 - 39 | keep original value
| 40 - 49 | 40
| 50 - 59 | keep original value
| 60 - 69 | 60
| 70 - 79 | 70
| 80 - 89 | 80
| 90 - 99 | 90
| > 99 | 0




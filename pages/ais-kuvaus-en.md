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

The automatic identification system (AIS) is an automatic tracking system on ships and vessels. It provides information such as unique identification, position, course, and speed. AIS is intended to allow ships to view marine traffic in their area and to be seen by that traffic.

Digitraffic service provides A class position and metadata messages. Some AIS-messages are filtered or modified.

## Fishing vessels

All fishing vessels (vessel type 30) are filtered out from the AIS-messages.

## Vessel type

Vessel types and cargo descriptions are modified with following rules.

| Original value | Modified value | Vessel type
| 0 | 0 | Default value or type not in use
| 1 - 19 | keep original value | Reserved for future use
| 20 - 29 | 20 | Wing in ground (WIG)
| 30 - 39 | keep original value | 31 - 32 Tug (towing)<br>33 Dredging, underwater operations<br>34 diving operations<br>35 Military<br>36 Sailing<br>37 Pleasure craft
| 40 - 49 | 40 | High speed craft (HSC)
| 50 - 59 | keep original value | 50 Pilot<br>51 Search and rescue<br>52 Tug<br>53 Port tender<br>54 Anti pollution<br>55 Law enforcement<br>56 - 59 Other
| 60 - 69 | 60 | Passenger
| 70 - 79 | 70 | Cargo
| 80 - 89 | 80 | Tanker
| 90 - 99 | 90 | Other
| > 99 | keep original value | Reserved for future use

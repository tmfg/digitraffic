---
title: 'Changes to road weather stations and sensors'
image:
published: true
categories: en News
ref: 2022-05-09-road-weather-sensors-updates
lang: en
traffictypes:
  - Road
tags:
  - APIs
---

Changes to road weather station data collection coming into effect on week 20
between Tue-Thu 17.-19.5.2022 will also cause changes in the data available
through our APIs. Due to technical restrictions, data was previously collected
from one physical location using multiple station identifiers. In the future,
all data from a single location will be listed under a single station
identifier, which means that the amount of stations will decrease.

This change affects those stations which are actually of type RWS_200, but show
up in the API as being of type ROSA. After the change, these stations will be of
type RWS_200 in the API. The stations not affected by this change will remain of
type ROSA. As a consequence, the name of the "main station" will be changed, and
the parallel stations will be removed from the API data. Sensors will be added
to the main station, and the names and IDs of transferred sensors will be
changed.

Example: The station `vt7_Sipoo_Box_1` of type `ROSA` will be changed to type
`RWS_200` and will become a "main station", in which case the numeral suffix
will be removed from the name. The new station name will be `vt7_Sipoo_Box`. The
parallel stations `vt7_Sipoo_Box_2`, `vt7 Sipoo_Box Opt1` and
`vt7_Sipoo Box Opt2` will be completely removed. The sensors of the parallel
stations will be transferred to the main station and the names of overlapping
sensors will be changed. Example: Sensor `3` `TIE_1` of station
`vt7_Sipoo_Box_2` will become sensor `101` `TIE_3` of station `vt7_Sipoo_Box`.

The new sensor types are already used in the weather sensor API data:
[https://tie.digitraffic.fi/api/v1/metadata/weather-sensors](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors)

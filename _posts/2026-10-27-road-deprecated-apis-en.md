---
title: 'Weather data and traffic message v1 APIs deprecated'
image:
published: true
categories: en News
ref: 2026-10-27-road-deprecated-apis
lang: en
traffictypes:
    - Road
tags:
    - APIs
    - EndOfLife
---

We have deprecated the v1 APIs of weather data and the v1 APIs of traffic messages. The replacing v2 APIs are
already available.

## Removal dates

- **3 November 2026**: the v1 forecast APIs, i.e. `/api/weather/v1/forecast-sections/forecasts`,
  `/api/weather/v1/forecast-sections-simple/forecasts` and their `/{id}/forecasts` versions.
- **13 April 2027**: the other v1 weather data APIs and all v1 traffic message APIs.
- **13 April 2027**: the DATEX II 2.2.3 APIs. We [announced earlier](/en/news/2026/05/08/road-datex-2-2-3-end-of-life-en.html)
  that they would be removed on 20 October 2026. The removal is moved to the same date as the v1 traffic
  message APIs.

The deprecated APIs are also listed on the [API changes](/en/support/api-changes/) page. Please move to the
replacing APIs well before the removal date.

## What needs to change

For most APIs it is enough to change `v1` to `v2` in the path. The content stays the same. The APIs listed
below change more.

### Forecasts

`/api/weather/v1/forecast-sections/forecasts` and the other `forecasts` endpoints

- The forecasts come from a new source, so the values and observation times are not the same as in v1.
- `weatherSymbol` is now a number and uses a different set of codes. v1 used Vaisala symbols (e.g. `d100`),
  v2 uses the Finnish Meteorological Institute's SmartSymbol codes (e.g. `7`). 100 is added to the code at
  night. The symbols are available on the
  [Finnish Meteorological Institute's GitHub](https://github.com/fmidev/opendata-resources/tree/master/symbols){:target="_blank"}.
- `forecastConditionReason` is removed. The `roadCondition` it contained is now directly under the forecast.
  Its other fields (`precipitationCondition`, `windCondition`, `freezingRainCondition`, `winterSlipperiness`,
  `visibilityCondition` and `frictionCondition`) are removed without a replacement.
- `reliability` is removed.
- `roadCondition` can have the value `NOT_KNOWN`.
- `overallRoadCondition`: the value `CONDITION_COULD_NOT_BE_RESOLVED` is replaced by `NOT_KNOWN`.
- `dataUpdatedTime` is given at the response and forecast section level, but no longer in each forecast.

### Sensor value history

`/api/weather/v1/stations/{id}/data/history`

- The list `values` is now called `sensorValues`.

### Traffic messages

All JSON APIs:

- Values of enumerated fields are written differently. v1 returns for example `ROAD_WORK` and `HIGH`, v2
  returns `road work` and `high`. This applies to fields such as `situationType` and `severity`.

`/api/traffic-message/v1/messages`

- The message type was selected with the `situationType` parameter. In v2 each type has its own API:
  `roadworks`, `traffic-announcements`, `weight-restrictions` and `exempted-transports`.
- `inactiveHours` is replaced by the parameters `from` and `to`. If `from` is not given, messages from one
  hour ago onwards are returned.

`/api/traffic-message/v1/messages/{situationId}`

- v1 returned all versions of the message by default. v2 returns only the latest version.
- All versions are available at `/api/traffic-message/v2/messages/{situationId}/history`. It returns a list
  of messages without the surrounding `FeatureCollection` structure.

`/api/traffic-message/v1/messages.datex2` and `/api/traffic-message/v1/messages/{situationId}.datex2`

- These return DATEX II 2.2.3, and there is no v2 version in the same path. The replacing APIs use DATEX II
  3.5 and 3.7, e.g. `/api/traffic-message/v2/roadworks/datex2-3.7.xml` and
  `/api/traffic-message/v2/messages/{situationId}/datex2-3.7.xml`.

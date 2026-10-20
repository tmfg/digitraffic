---
title: 'New APIs have been deprecated'
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
already available. The path is otherwise the same, but `v1` changes to `v2`.

Check the deprecated APIs and their removal dates on the [API changes](/en/support/api-changes/) page. Please
move to the replacing APIs well before the removal date.

## The content is mostly the same

Most of the v2 APIs return the same content as v1, so for those it is enough to change the path.

There are differences in three places.

### Traffic messages

`/api/traffic-message/v1/messages`

- The message type was selected with the `situationType` parameter. The corresponding v2 APIs are split into
  their own addresses by type: `roadworks`, `traffic-announcements`, `weight-restrictions` and
  `exempted-transports`.

### Sensor value history

`/api/weather/v1/stations/{id}/data/history`

- The list `values` is now called `sensorValues`.

### Forecasts

`/api/weather/v1/forecast-sections/forecasts` and the other `forecasts` endpoints

- `weatherSymbol` is now a number. It used to be a string.
- `forecastConditionReason` and `reliability` are removed. The `roadCondition` it contained is now directly
  under the forecast.
- `roadCondition` can have the value `NOT_KNOWN`.
- `overallRoadCondition`: the value `CONDITION_COULD_NOT_BE_RESOLVED` is replaced by `NOT_KNOWN`.
- `dataUpdatedTime` is given only at the response level, no longer in each forecast.

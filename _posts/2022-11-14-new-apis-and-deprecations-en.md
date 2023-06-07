---
title: 'New road APIs and the removal of deprecated APIs in six months'
image:
published: true
categories: en News
ref: 2022-11-14-new-apis-and-deprecations
lang: en
traffictypes:
- Road
tags:
- APIs
---

New road traffic APIs have been published.

Documentation can be found [here](/en/road-traffic/#restjson--apis).\
Swagger descriptions [here](http://tie.digitraffic.fi/swagger/).\
Listings of currently supported and deprecated APIs [here](/en/support/api-changes/) 

🔴 The following old APIs will be removed soon

* Traffic messages
  * `/api/v1/data/weight-restrictions-datex2/*`
  * `/api/v1/data/traffic-disorders-datex2/*`
  * `/api/v1/data/roadworks-datex2/*`
  * `/api/v2/data/traffic-datex2/*`
  * `/api/v3/data/traffic-messages/*`

* Maintenance trackings

  * `/api/v3/data/maintenance/*`
  * `/api/v2/data/maintenance/*`

* TMS stations
  * `/api/v1/data/free-flow-speeds/*`

🔴 The following old APIs will be removed after December 2022

* Variable signs
  * `/api/v3/metadata/variable-signs/code-descriptions`
  * `/api/v3/data/variable-signs/*`
  * `/api/v2/metadata/variable-signs/code-descriptions`
  * `/api/v2/data/variable-signs/*`

🔴 The following old APIs will be removed after May 2023

* Weather stations
  * `/api/v1/metadata/weather-stations`
  * `/api/v1/metadata/weather-sensors`
  * `/api/v1/data/weather-data/*`
  * `/api/v3/metadata/weather-stations`
  * `/api/v3/metadata/weather-sensors`
 
* TMS stations

  * `/api/v1/metadata/tms-stations/*`
  * `/api/v1/metadata/tms-sensors`
  * `/api/v1/data/tms-sensor-constants`
  * `/api/v1/data/tms-data/*`
  * `/api/v3/metadata/tms-stations/*`
  * `/api/v3/metadata/tms-sensors`

* Alert-C locations 

  * `/api/v1/metadata/locations/*`
  * `/api/v1/metadata/location-versions`
  * `/api/v1/metadata/location-types`
  * `/api/v3/metadata/locations/*`
  * `/api/v3/metadata/location-versions`
  * `/api/v3/metadata/location-types`

* Forecasts

  * `/api/v1/metadata/forecast-sections/*`
  * `/api/v1/data/road-conditions/*`
  * `/api/v2/metadata/forecast-sections/*`
  * `/api/v2/data/road-conditions/*`
  * `/api/v3/metadata/forecast-sections/*`
  * `/api/v3/data/road-conditions/*`

* Weathercam

  * `/api/v1/metadata/camera-stations`
  * `/api/v1/data/camera-data/*`
  * `/api/v2/data/camera-history/*`
  * `/api/v3/metadata/camera-stations`
  * `/api/v3/data/camera-history/*`


---
title: 'Tiepuolen uudet rajapinnat ja vanhojen rajapintojen käytöstä poistaminen kuuden kuukauden kuluttua'
image:
published: false
categories: Tiedotteet
ref: 2022-11-14-new-apis-and-deprecations
lang: fi
traffictypes:
- Tieliikenne
tags:
- Rajapinnat
---

Tieliikenteen rajapinnoista on julkaistu uudet versiot.

Dokumentaatiot löytyvät sivustolta [täältä](/tieliikenne/#restjson-rajapinnat).\
Swagger API -kuvaukset löytyvät [täältä](http://tie.digitraffic.fi/swagger/).\
Tuettujen ja vanhentuneiden rajapintojen listaus löytyy [täältä](/rajapintojen-tila/muutokset/).

🔴 Seuraavat vanhat rajapinnat poistuvat käytöstä lähiaikoina.

* Liikennetiedotteet
  * `/api/v1/data/weight-restrictions-datex2/*`
  * `/api/v1/data/traffic-disorders-datex2/*`
  * `/api/v1/data/roadworks-datex2/*`
  * `/api/v2/data/traffic-datex2/*`
  * `/api/v3/data/traffic-messages/*`

* Kunnossapitotiedot 

  * `/api/v3/data/maintenance/*`
  * `/api/v2/data/maintenance/*`

* TMS stations
  * `/api/v1/data/free-flow-speeds/*`

🔴 Seuraavat vanhat rajapinnat poistuvat käytöstä joulukuun 2022 jälkeen

* Variable signs
  * `/api/v3/metadata/variable-signs/code-descriptions`
  * `/api/v3/data/variable-signs/*`
  * `/api/v2/metadata/variable-signs/code-descriptions`
  * `/api/v2/data/variable-signs/*`

🔴 Seuraavat vanhat rajapinnat poistuvat käytöstä toukokuun 2023 jälkeen

* Weather stations
  * `/api/v1/metadata/weather-stations`
  * `/api/v1/metadata/weather-sensors`
  * `/api/v1/data/weather-data/*`
  * `/api/v3/metadata/weather-stations`
  * `/api/v3/metadata/weather-sensors`
 
* Lam-asemat

  * `/api/v1/metadata/tms-stations/*`
  * `/api/v1/metadata/tms-sensors`
  * `/api/v1/data/tms-sensor-constants`
  * `/api/v1/data/tms-data/*`
  * `/api/v3/metadata/tms-stations/*`
  * `/api/v3/metadata/tms-sensors`

* Alert-C sijainnit

  * `/api/v1/metadata/locations/*`
  * `/api/v1/metadata/location-versions`
  * `/api/v1/metadata/location-types`
  * `/api/v3/metadata/locations/*`
  * `/api/v3/metadata/location-versions`
  * `/api/v3/metadata/location-types`

* Sääennusteet

  * `/api/v1/metadata/forecast-sections/*`
  * `/api/v1/data/road-conditions/*`
  * `/api/v2/metadata/forecast-sections/*`
  * `/api/v2/data/road-conditions/*`
  * `/api/v3/metadata/forecast-sections/*`
  * `/api/v3/data/road-conditions/*`

* Kelikamerat 

  * `/api/v1/metadata/camera-stations`
  * `/api/v1/data/camera-data/*`
  * `/api/v2/data/camera-history/*`
  * `/api/v3/metadata/camera-stations`
  * `/api/v3/data/camera-history/*`


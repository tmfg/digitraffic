---
title: 'Kunnossapidon ja liikennetiedotteiden uudet rajapinnat ja vanhojen rajapintojen käytöstä poistaminen kuuden kuukauden kuluttua'
image:
published: true
categories: Tiedotteet
ref: 2022-05-03-maintenance-api-and-deprecations
lang: fi
traffictypes:
    - Tieliikenne
tags:
    - Rajapinnat
---

Maanteiden kunnossapidosta ja liikennetiedotteista on julkaistu uudet
rajapintaversiot.

Dokumentaatiot löytyvät sivustolta

- [Tietolähteet -> Tieliikenne -> Maanteiden kunnossapitotiedot](/tieliikenne/#maanteiden-kunnossapitotiedot)
  ja
- [Tietolähteet -> Tieliikenne -> Liikennetiedotteet](/tieliikenne/#liikennetiedotteet).

Ja Swagger API -kuvaukset löytyvät

- [Kunnossapidon Swagger-dokumentaatiosta](https://tie.digitraffic.fi/swagger/#/Maintenance)
  sekä
- [Liikennetiedotteiden Swagger-dokumentaatiosta](https://tie.digitraffic.fi/swagger/#/Traffic%20message)

🔴 Seuraavat vanhat rajapinnat poistuvat käytöstä lokakuun 2022 jälkeen.

- LAM
  - `/api/v1/data/free-flow-speeds*`
- Kunnossapito
  - `/api/v2/data/maintenance*`
  - `/api/v3/data/maintenance*`
- Liikennetiedotteet
  - `/api/v1/data/traffic-disorders-datex2*`
  - `/api/v1/data/roadworks-datex2*`
  - `/api/v1/data/weight-restrictions-datex2*`
  - `/api/v2/data/traffic-datex2*`
  - `/api/v3/data/traffic-messages*`
  - `/api/v3/data/traffic-messages*`

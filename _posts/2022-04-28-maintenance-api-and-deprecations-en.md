---
title: 'New road maintenance tracking and traffic message APIs are published and deprecation of old APIs in six months'
image:
published: true
categories: en News
ref: 2022-05-03-maintenance-api-and-deprecations
lang: en
traffictypes:
  - Road
tags:
  - APIs
---

New api versions for road maintenance information and traffic messages has been
published.

Documentations can be found at

- [Data sources -> Road traffic -> Road maintenance information](/en/road-traffic/#road-maintenance-information)
  and
- [Data sources -> Road traffic -> Traffic messages](/en/road-traffic/#traffic-messages)

And Swagger API-descriptions at

- [Road maintenance information Swagger-dokumentaatiosta](https://tie.digitraffic.fi/swagger/#/Maintenance)
- [Traffic messages Swagger-dokumentaatiosta](https://tie.digitraffic.fi/swagger/#/Traffic%20message)

🔴 Following old APIs will be removed after October 2022.

- TMS
  - `/api/v1/data/free-flow-speeds*`
- Maintenance
  - `/api/v2/data/maintenance*`
  - `/api/v3/data/maintenance*`
- Traffic messages
  - `/api/v1/data/traffic-disorders-datex2*`
  - `/api/v1/data/roadworks-datex2*`
  - `/api/v1/data/weight-restrictions-datex2*`
  - `/api/v2/data/traffic-datex2*`
  - `/api/v3/data/traffic-messages*`
  - `/api/v3/data/traffic-messages*`

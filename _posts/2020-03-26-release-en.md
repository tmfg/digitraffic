---
title: 'Rail: track work notifications and traffic restriction notifications now available'
categories: en News
image: 
lang: en
published: true
ref: 2019-08-20-release
traffictypes:
  - Rail
tags:
  - APIs
---

Traffic work notifications and traffic restriction notifications from the RUMA system are now available. The data is available in JSON and GeoJSON formats.

Examples:
* All track work notifications in progress [https://rata.digitraffic.fi/api/v1/trackwork-notifications.json?state=ACTIVE](https://rata.digitraffic.fi/api/v1/trackwork-notifications.json?state=ACTIVE)
* Traffic restriction notifications in effect and created after the start of 2020. [https://rata.digitraffic.fi/api/v1/trafficrestriction-notifications.json?state=SENT&start=2020-01-01T00:00:00.000Z](https://rata.digitraffic.fi/api/v1/trafficrestriction-notifications.json?state=SENT&start=2020-01-01T00:00:00.000Z)

[RUMA documentation]({{ site.baseurl }}/{{ site.t.railway-traffic.url[page.lang] }}{{ "/ruma" }})  
[Swagger documentation](https://rata.digitraffic.fi/swagger/index.html)

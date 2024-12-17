---
title: 'Throttling Digitraffic API query amounts from unknown users'
image:
published: true
categories: en News
ref: 2024-12-03-api-throttles-turned-on
lang: en
traffictypes:
  - Road
  - Marine
  - Rail
tags:
  - APIs
---

As previously stated, we have started today (3.12.2024) to throttle queries that do not include a [Digitraffic-User header](https://www.digitraffic.fi/en/support/instructions/#digitraffic-user). The API responds with a 429 status code if the limits are exceeded. By adding a Digitraffic-User header to your requests, you can continue using the service as before.

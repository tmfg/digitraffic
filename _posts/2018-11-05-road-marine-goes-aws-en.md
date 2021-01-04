---
title: 'Road and Marine production migrates to AWS 6th of November 2018'
categories: en News
image:
lang: en
published: true
ref: 2018-11-05-road-marine-goes-aws
traffictypes:
  - Road
  - Marine
tags:
  - APIs
  - Admin
---

Digitraffic marine and road environment migrates to AWS-platform. Production will migrate to AWS tomorrow 6th of November 2018.
URL addresses and API do not change.

Things to note:

* New environment will return all timestamps in Zulu timezone. It is up to the client to present the timestamps in preferred time zone.

* New database engine is Postgres. This may have some minor effect in result ordering.
 
Otherwise the environment should behave identically.

The migration was planned 30th of October, but it was postponed due to some problems in data sources.

Websocket changes were annouced earlier in 
[2018-10-12-ws-legacy-marine](https://www.digitraffic.fi/en/news/2018/10/12/ws-legacy-marine-en.html)
article.
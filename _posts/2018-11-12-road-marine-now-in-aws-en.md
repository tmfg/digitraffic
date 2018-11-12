---
title: 'Road and Marine production has moved to AWS'
categories: en News
image:
lang: en
published: true
ref: 2018-11-12-road-marine-now-in-aws
traffictypes:
  - Road
  - Marine
tags:
  - APIs
  - Admin
---

Digitraffic marine and road environmens have been migrated to AWS-platform. URL addresses and API do not change.

Things to note:

* New environment will return all timestamps in Zulu timezone. It is up to the client to present the timestamps in preferred time zone.
More about this in [2018-11-12-timestamp-change](http://www.digitraffic.fi/en/news/2018/11/12/timestamp-change-en.html)

* New database engine is Postgres. This may have some minor effect in result ordering.
 
Otherwise the environment should behave identically.

Please read also about changes in Websocket endpoints: 
[2018-10-12-ws-legacy-marine](http://www.digitraffic.fi/en/news/2018/10/12/ws-legacy-marine-en.html)

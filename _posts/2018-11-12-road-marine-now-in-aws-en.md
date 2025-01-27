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

Digitraffic marine and road environmens have been migrated to AWS cloud service.

Release notes:

- Before the migration the API timestamps were in Finnish local time. After the
  change the timestamps are in UTC. Additionally, the format of the timestamps
  changed: Before the change the offset from UTC was marked after the timestamp.
  After the change the APIs use the
  [Z suffix for UTC](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators).
  Before the change the timestamp was e.g. `2018-11-06T15:51:00+03:00` The new
  format for the same timestamp is `2018-11-06T12:51:00Z` More information:
  [2018-11-12-timestamp-change](https://www.digitraffic.fi/en/news/2018/11/12/timestamp-change-en.html)

- Our new database engine is Postgres. This may have some minor effect in result
  ordering.

Please read also about the changes in the Websocket endpoints:
[2018-10-12-ws-legacy-marine](https://www.digitraffic.fi/en/news/2018/10/12/ws-legacy-marine-en.html)

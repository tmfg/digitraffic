---
title: 'Timestamp change 6.11.2018'
categories: en News
image: 
lang: en
published: true
ref: 2018-11-12-timestamp-change
traffictypes:
  - Road
  - Marine
tags:
  - APIs
  - Admin
---

#### Significant changes in API timestamps

The road and marine API's of Digitraffic were migrated to AWS cloud service on 6.11.2018.
Alongside the migration the timestamp format used by the API's was significantly changed.

The communication regarding the change was insufficient and several API users were not prepared for the change.
These kind of API changes are rare and the Finnish Transport Agency (FTA) tries to avoid them. The FTA has taken action to ensure
adequate communications regarding API changes in the future. The FTA is sorry for any inconvinience caused for the API users.

#### Timestamp change, technical details and handling the timestamps

Before the migration the API timestamps were in Finnish local time. After the change the timestamps are in UTC.

Additionally, the format of the timestamps changed: Before the change the offset from UTC was marked after the timestamp.
After the change  the APIs use the [Z suffix for UTC](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators).

Before the change the timestamp was e.g.
`2018-11-06T15:51:00+03:00`

The new format for the same timestamp is
`2018-11-06T12:51:00Z`

In application development the timestamps should be handled with libraries or functions spesifically designed for timestamp handling. Using timestamps with other methodts, e.g. with functions designed for string handling is prone to errors. 

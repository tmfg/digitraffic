---
title: 'Test environment migrates to AWS 29th Ort 2018'
categories: en News
image:
lang: en
published: true
ref: 2018-10-29-test-goes-aws
traffictypes:
  - Road
tags:
  - APIs
  - Admin
---

Digitraffic test environment migrates to AWS-platform today 29th of October 2018. Production will migrate to AWS tomorrow 30th of October 2018.

Things to note:

* New environment will return all timestamps in Zulu timezone. It is up to the client to present the timestamps in preferred time zone.

* New database engine is Postgres. This may have some minor effect in result ordering.
 
Otherwise the environment should behave identically.


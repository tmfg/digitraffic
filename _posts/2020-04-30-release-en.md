---
title: 'Requests without compression will be rejected'
categories: en News
image:
lang: en
published: true
ref: 2020-04-30-gzip
traffictypes:
  - Road
tags:
  - APIs
  - Admin
---

Requests that do not have `Accept-Encoding: gzip` (unpacked requests) in their HTTP-headers take up lot of resources and money. Therefore they will first be throttled and ultimately rejected completely

Timetable is as follows:

```
5.5.2020:    60 requests/minute
12.5.2020:   30 requests/minute
19.5.2020:   10 requests/minute
26.5.2020:   5  requests/minute
2.6.2020:    unpacked requests will be rejected
```

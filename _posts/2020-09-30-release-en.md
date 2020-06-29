---
title: 'Rail: deleted trains can now be searched'
categories: en News
image: 
lang: en
published: true
ref: 2020-06-30-release
traffictypes:
  - Rail
tags:
  - APIs
---

Deleted trains can be retrieved via `/trains/<departure_date>` and `/trains/<departure_date>/<train_number>` using parameter `?include_deleted`

Examples
* [https://rata.digitraffic.fi/api/v1/trains/2020-02-05/301?include_deleted=true](https://rata.digitraffic.fi/api/v1/trains/2020-02-05/301?include_deleted=true)
* [https://rata.digitraffic.fi/api/v1/trains/2020-02-05?include_deleted=true](https://rata.digitraffic.fi/api/v1/trains/2020-02-05?include_deleted=true)

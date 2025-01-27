---
title: 'HTTP compression headers mandatory from 1.6.2020'
categories: en News
image:
lang: en
published: true
ref: 2020-03-20-encoding
traffictypes:
  - Road
  - Rail
  - Marine
tags:
  - APIs
  - Admin
---

HTTP compression headers are required starting from 1.6.2020.

You can of course start using the header right away.

Compression provides significant advantages:

1. Cheaper bandwidth costs
2. Faster requests

To use HTTP compression, please include "Accept-Encoding: gzip" header in your
request. Most libraries do this automatically.

Attention! Uncompressed requests will be restricted starting from 24.3.2020.
Requests from a single IP address will be restricted to a certain amount of
requests per minute. When the request amount is exceeded subsequent requests
will receive the HTTP response code 429.

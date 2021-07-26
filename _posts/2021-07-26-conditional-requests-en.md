---
title: 'Road: Avoiding unnecessary data transfer in weather camera requests'
categories: en News
image:
lang: en
published: true
ref: 2021-07-26-conditional-requests
traffictypes:
  - Road
tags:
  - Admin
  - APIs
---

We recommend the usage of conditional HTTP requests in weather camera image requests to avoid unnecessary data transfer.

The response for a weather camera request returns the HTTP header **ETag**. The ETag value can be used in the **If-None-Match** HTTP header. If the image is updated it will be returned with the HTTP return code 200. If the image is not updated no image will be returned and the HTTP return code will be 304.

curl example:
```
# Fetch the image with a GET request and retrieve the ETag value (-v switch)
curl -v https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
> content-type: image/jpeg
> etag: "920d5a54a98cca804825af6894d778a4"

# Request the image again (note the double quotes in the etag value)
curl -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 304
# Image not updated

# New request after e.g. 5 minutes
curl -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
# The updated image is returned
```

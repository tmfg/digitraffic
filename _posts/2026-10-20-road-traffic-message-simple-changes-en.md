---
title: 'Changes to the simple format of traffic messages on 27 October 2026'
image:
published: true
categories: en News
ref: 2026-10-20-road-traffic-message-simple-changes
lang: en
traffictypes:
    - Road
tags:
    - APIs
---

The [documentation](https://www.digitraffic.fi/en/road-traffic/#traffic-messages-1){:target="_blank"} says
that the MQTT topic `traffic-message-v3/simple/<situationType>` carries the same content as the simple REST API
response. In practice there have been small differences, because MQTT sent the message differently. From 27
October 2026 the payload is produced by the same conversion as the REST response, which removes the
differences.

## The fields that change

- `worktypes` is now called `workTypes`.
- Timestamps are now always in the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`. The precision used to vary.
- `dataUpdatedTime` is a new field that was not present before.
- `trafficAnnouncementType` is a new field that was not present before. Its value may be `null`.
- `locationOpenLr.secondaryBinary` is a new optional field. It is an OpenLR reference to another
  location related to the message. The field is also added to the REST APIs.

We are also fixing `properties.dataUpdatedTime` in the REST API. It has been empty, and from now on it tells
when the message was last updated.

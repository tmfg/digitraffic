---
layout: traffictype
hero-image: code
permalink: /en/instructions/
section: Tietolähteet
searchable: true
lang: en
ref: instructions
title: Instructions
intro: Instructions for coding
---

In here you can find information and instructions about apis and how to use them.

# Cache

Most of the service calls are cached.  Therefore, there is no gain calling the services too often, as the response will not change.  Most
of the caches are one minute long.

This might lead to some oddities with updated timestamps. For example:

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=true`

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false`

These two might return a different _dataUpdatedTime_ because the calls were cached at different time.

# Compression

Using compression is highly recommended.  The data compress well and you can save bandwith and time.  How to use compression is dependant
of the tools and frameworks you are using.

## curl

```
curl -H 'Accept-Encoding: gzip' -H 'Connection: close' --compress https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

## wget

```
wget --header='Accept-Encoding: gzip' --header='Connection: close' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

## Java RestTemplate

```
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final String output = restTemplate.getForObject("https://tie.digitraffic.fi/api/v1/data/tms-data?testi=testi", String.class);
```
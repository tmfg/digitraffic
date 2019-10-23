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

Table of contents
* Do not remove this line (it will not be displayed)
{:toc}

# [Cache](#cache)
__Q__: Why do APIs often return the same response?  
__A__: Most of the service calls are cached.  Therefore, there is no gain calling the services too often, as the response will not change.  Most
of the caches are one minute long.

This might lead to some oddities with updated timestamps. For example:

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=true`

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false`

These two might return a different _dataUpdatedTime_ because the calls were cached at different time.

# [Compression](#compression)
__Q__: How can I request data in a more efficient way?  
__A__: Using compression is highly recommended.  The data compress well and you can save bandwith and time.  How to use compression is dependant
of the tools and frameworks you are using.
### cURL
```
curl -H 'Accept-Encoding: gzip'
```
### Wget
```
wget --header='Accept-Encoding: gzip'
```

# [cURL](#curl)
__Q__: How do I call the APIs with [cURL](https://curl.haxx.se/)?  
__A__:
```
curl -H 'Accept-Encoding: gzip' -H 'Connection: close' --compress https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

# [Wget](#wget)
__Q__: How do I call the APIs with [Wget](https://www.gnu.org/software/wget/)?  
__A__:
```
wget --header='Accept-Encoding: gzip' --header='Connection: close' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

# [Java RestTemplate](#java-resttemplate)
__Q__: How do I call the APIs with [Java RestTemplate](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)?  
__A__:
```
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final String output = restTemplate.getForObject("https://tie.digitraffic.fi/api/v1/data/tms-data?testi=testi", String.class);
```

# [Rate limiting](#rate-limiting)
__Q__: Why do some of my API requests fail with code 429?  
__A__: Some APIs can be called with a certain amount in a certain time window. The API contents are not updated more often than the API can be called.  

# [Authentication in weathercam requests](#authentication-in-weathercam-requests)
__Q__: Why do my weathercam API requests fail with code 400?  
__A__: Check if you using the Authorization header in your requests. Using this header will cause weathercam requests to fail.  

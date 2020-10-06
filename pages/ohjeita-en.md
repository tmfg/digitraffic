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

<h2 id="contents">Contents</h2>

* Do not remove this line (it will not be displayed)
{:toc}

# General considerations

Instructions in force from 1st of June 2020

## HTTPS- vs HTTP-protocol

All APIs of Digitraffic supports HTTPS-protocol, so there is no reason to use unencrypted HTTP-protocol.
At the moment unencrypted HTTP-requests to weather camera images are redirected to use HTTPS with ```HTTP/1.1 301 Moved Permanently``` -response code and
```Location``` -header with the new https-address. In the future it is possible that all traffic will be redirected to use ```HTTPS```.
More information of ```HTTP 301``` at [https://en.wikipedia.org/wiki/HTTP_301](https://en.wikipedia.org/wiki/HTTP_301).

## Compression  

The use of compression is mandatory on all interfaces except for weather camera images.
The data from the interfaces is highly compressible, saving bandwidth and time.
To use HTTP compression, please include `Accept-Encoding: gzip` header in your request. 
Most libraries include this header automatically.

If compression is not allowed in the request, the service returns error code `406`.

### Example with cURL
```
curl -H 'Accept-Encoding: gzip'
```
### Example with Wget
```
wget --header='Accept-Encoding: gzip'
```

## Restricting requests  

To reduce the load caused by unnecessary and excessive queries, there is a limit on the number of requests for the interfaces.
When the number of requests exceeds the set limit, the service returns error code `429`.
The documentation of each API explains how often each interface content is updated.

**Restrictions:**  

| **Target / interface**      | **Max requests / min** | **Limit**
|-----------------------|-------------------|-------------|
| **General restriction**   | 60                | IP + URL    
| **MQTT**              | 5                 | IP          
| **Weather camera images**   | 10                | IP + URL    
| **tie/meri.digitraffic.fi V1-interfaces**     | &infin;                 |             
| **infra- and jeti-api**     | &infin;                 |             

## Headers to identify the application

We hope that API users will use the HTTP headers described below in all HTTP requests.
This enables us to better monitor the load from different use cases and to react better to possible error situations.
An example could be a programming error that causes a considerable load by making additional requests to our interfaces.
If the information listed below is in order, we are able to identify the API user in question and to notify 
the application developer or administrator.

### Digitraffic-User

The Digitraffic-User header should include an identifiable user party and/or application. Below you can find examples.

`Digitraffic-User: TMFG`  
`Digitraffic-User: Liikennetilanne`  
`Digitraffic-User: TMFG/Liikennetilanne`  

### User-Agent

If it is possible to set the User-Agent header in the application, it should be in accordance with [RFC-7231 5.5.3](https://tools.ietf.org/html/rfc7231#section-5.5.3)
including at least the name and version of the application. Below you can find examples.

`User-Agent: <application>/<version>`  
`User-Agent: Liikennetilanne/1.0`


# Cache
__Q__: Why do APIs often return the same response?  
__A__: Most of the service calls are cached.  Therefore, there is no gain calling the services too often, as the response will not change.  Most
of the caches are one minute long.

This might lead to some oddities with updated timestamps. For example:

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=true`

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false`

These two might return a different _dataUpdatedTime_ because the calls were cached at different time.

# cURL
__Q__: How do I call the APIs with [cURL](https://curl.haxx.se/)?  
__A__:
```
curl -H 'Accept-Encoding: gzip' -H 'Connection: close' --compress https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

# Wget
__Q__: How do I call the APIs with [Wget](https://www.gnu.org/software/wget/)?  
__A__:
```
wget --header='Accept-Encoding: gzip' --header='Connection: close' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

# Java RestTemplate
__Q__: How do I call the APIs with [Java RestTemplate](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)?  
__A__:
```
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final String output = restTemplate.getForObject("https://tie.digitraffic.fi/api/v1/data/tms-data?testi=testi", String.class);
```

# Rate limiting
__Q__: Why do some of my API requests fail with code 429?  
__A__: Some APIs can be called with a certain amount in a certain time window. The API contents are not updated more often than the API can be called.  

# Authentication in weathercam requests
__Q__: Why do my weathercam API requests fail with code 400?  
__A__: Check if you using the Authorization header in your requests. Using this header will cause weathercam requests to fail.  

# MQTT disconnects
__Q__: Why does my mqtt-connection keep disconnecting?  
__A__: You have not subscribed any topic or subscribed only topics that have infrequent messages. 
Subscribe also to relevan status-topic(tms/status, weather/status or vessels/status).

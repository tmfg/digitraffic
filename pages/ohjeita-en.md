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

## API versioning and life cycle

![APIs' life cycle]({{ site.baseurl }}{{ "/img/ohjeita/api-life-cycle.png" }})

When a new interface is developed, it is always released first as a beta version for test use.
Notices of new beta APIs will be released on Google Groups and the Digitraffic website. 
Users are encouraged to give feedback on beta versions so that new APIs can be improved to better serve their purpose.
When the beta interface is found to be publishable, a new version is published and the old interface will be considered deprecated.
The old version will be available for six more months, after which it will be removed from the service. 
During this period, security and bug fixes to the deprecated API will be considered on a case-by-case basis.
The image above aims to clarify the life cycle of interfaces.

New api versions will be announced in Digitraffic website and Google-groups 
[road](https://groups.google.com/g/roaddigitrafficfi),
[marine](https://groups.google.com/g/meridigitrafficfi) and
[rail](https://groups.google.com/u/1/g/rata_digitraffic_fi).

Deprecated APIs and their sunset dates are updated [on this page](/rajapintojen-tila/muutokset/).


## How can I be aware of updates and incidents?
Check the status page [https://status.digitraffic.fi](https://status.digitraffic.fi).
You can also subscribe to status updates with the  **Subscribe to updates** function.

## HTTPS- vs HTTP-protocol

All APIs of Digitraffic supports HTTPS-protocol, so there is no reason to use unencrypted HTTP-protocol.
At the moment unencrypted HTTP-requests to weather camera images are redirected to use HTTPS with ```HTTP/1.1 301 Moved Permanently``` -response code and
```Location``` -header with the new https-address. In the future it is possible that all traffic will be enforced to use ```HTTPS```-protocol.
More information of ```HTTP 301``` at [https://en.wikipedia.org/wiki/HTTP_301](https://en.wikipedia.org/wiki/HTTP_301).

## Compression  

The use of compression is mandatory on all interfaces except for weather camera images.
The data from the interfaces is highly compressible, saving bandwidth and time.
To use HTTP compression, please include `Accept-Encoding: gzip` header in your request. 
Most libraries include this header automatically.

If compression is not allowed in the request, the service returns error code `406`.

### Examples
```bash
curl -H 'Accept-Encoding: gzip'  

curl --compressed  

wget --header='Accept-Encoding: gzip'
```

## Restricting requests  

To reduce the load caused by unnecessary and excessive queries, there is a limit on the number of requests for the interfaces.
When the number of requests exceeds the set limit, the service returns error code `429`.
The documentation of each API explains how often each interface content is updated.

**Restrictions:**  

| **Target / interface**      | **Max requests / min** | **Key**
|-----------------------|-------------------|-------------|
| **General restriction**       | 60            | IP + URL
| **MQTT**                      | 5             | IP
| **Weather camera images**     | 6000 / 5 min  | IP
| **tie/meri.digitraffic.fi V1-interfaces**     | &infin;                 |
| **infra- and jeti-api**                       | &infin;                 |

## Headers to identify the application

We hope that API users will use the HTTP headers described below in all HTTP requests.
This enables us to better monitor the load from different use cases and to react better to possible error situations.
An example could be a programming error that causes a considerable load by making additional requests to our interfaces.
If the information listed below is in order, we are able to identify the API user in question and to notify 
the application developer or administrator.

### Attention!
Don't send any PII (personally identifiable information) via the headers!
If you want to be identified as owner of multiple apps, use a nickname e.g.  
`Digitraffic-User: Trainguy/FoobarApp 1.0`

If you want to be contact for e.g. excessive request amount, please sign up on our webpage [https://www.digitraffic.fi/en/sign-up-your-application/](https://www.digitraffic.fi/en/sign-up-your-application/).

### Digitraffic-User

The Digitraffic-User header should include an identifiable user party and/or application. Below you can find examples.

`Digitraffic-User: Fintraffic`  
`Digitraffic-User: Liikennetilanne`  
`Digitraffic-User: Fintraffic/Liikennetilanne`  

#### Examples
```bash
curl -H 'Digitraffic-User: Junamies/FoobarApp 1.0'  

wget --header='Digitraffic-User: Junamies/FoobarApp 1.0'
```

## Code examples
[This page](/en/instructions/examples/) contains code examples of using Digitraffic data and good programming practices. The examples are in the form of notebooks and can be run and modified on Google Colab.

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
```bash
curl -H 'Connection: close' --compressed -H 'Digitraffic-User: Junamies/FoobarApp 1.0' https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

# Wget
__Q__: How do I call the APIs with [Wget](https://www.gnu.org/software/wget/)?  
__A__:
```bash
wget --header='Accept-Encoding: gzip' --header='Connection: close' --header='Digitraffic-User: Junamies/FoobarApp 1.0' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

# Java RestTemplate
__Q__: How do I call the APIs with [Java RestTemplate](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)?  
__A__:
```java
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory =
    new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final HttpHeaders headers = new HttpHeaders();
headers.add("Accept-Encoding", "gzip");
headers.add("Digitraffic-User", "DT/Tester");
HttpEntity<String> entity = new HttpEntity<>("body", headers);

final ResponseEntity<String> response =
    restTemplate.exchange("https://tie.digitraffic.fi/api/v1/data/tms-data", HttpMethod.GET, entity, String.class);

System.out.println(response.getBody());
```

# Python

__K__: How do I call the APIs with [Python request library](https://docs.python-requests.org/en/master/index.html)?  
__V__:
```python
import requests

TMS_STATION_URL = 'https://tie.digitraffic.fi/api/v1/data/tms-data'

headers = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}

r = requests.get(TMS_STATION_URL, headers=headers)
print(r.json()['dataUpdatedTime'])
```

More examples and runnable code available in Colab:

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/solita-jkhaak/2021-digitraffic-dev-day/blob/main/python/requests-example.ipynb)


# Node.js (and JavaScript)

__K__: How do I call the APIs with [node-fetch](https://github.com/node-fetch/node-fetch)?  
__V__:
```javascript
const fetch = require('node-fetch')

const TMS_STATION_URL = 'https://tie.digitraffic.fi/api/v1/data/tms-data'
const DT_USER_ID = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}

function handleTmsData(data) {
    console.log('Tms data updated time: ' + data.dataUpdatedTime)
}

fetch(TMS_STATION_URL, {headers: DT_USER_ID})
    .then(response => response.json())
    .then(handleTmsData)
```

__K__: How do I handle ETags when requesting weather camera images?  
__V__:
```javascript
const fetch = require('node-fetch')
const sleep = require('sleep')

const CAMERA_ID = 'C0450701'
const WEATHER_CAM_URL = 'https://weathercam.digitraffic.fi/' + CAMERA_ID + '.jpg'
const DT_USER_ID = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}

function writeData(filename, _) {
    console.log('Saving file: ' + filename)
    // TODO save file
}

function getImage(headers) {
    return fetch(WEATHER_CAM_URL, {headers: headers})
        .then(response => {
            if (response.ok) {
                console.log('Got new content')
                writeData(CAMERA_ID + '.jpg', response.buffer())

                // update etag with new content
                return {...headers, 'If-None-Match': response.headers.get('etag')}
            }

            console.warn('Content not modified')
            return headers
        })
}

async function main() {
    let count = 0;
    let headers = {...DT_USER_ID, 'If-None-Match': ''}
    
    while (count < 5) {
        // Request new image. After successful request store the new header with new etag for subsequent requests
        headers = await getImage(headers)

        count = count + 1
        sleep.sleep(5)
    }
}

main()
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

# Avoiding unnecessary data transfer with conditional HTTP-requests

Most of the new `/api/{data typela}/v{n}/` APIs supports conditional HTTP-requests. You can identifie this kind of API by checking if the request response returns **ETag** HTTP header.

E.g. the response for a weather camera request returns the HTTP header **ETag**. The ETag value can be used in the **If-None-Match** HTTP header. If the image is updated it will be returned with the HTTP return code 200. If the image is not updated no image will be returned and the HTTP return code will be 304.

curl example:
```bash
# Attention! The Digitraffic-User header has been omitted here as it not relevant for the example. Please remember to use it.

# Fetch the image with a GET request and retrieve the ETag value (-v switch)
curl -v https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
> content-type: image/jpeg
> etag: "920d5a54a98cca804825af6894d778a4"

# Request the image again (note the double quotes in the etag value)
curl -v -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 304
# Image not updated

# Requests can also be made with HTTP HEAD which only returns the HTTP status code 
curl -v -X HEAD -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 304
# Image not updated

# New request after e.g. 5 minutes
curl -v -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
# The updated image is returned
```

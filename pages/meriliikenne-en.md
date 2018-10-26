---
layout: traffictype
permalink: /en/marine-traffic/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
swagger-source: https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api
hero-image: icebreaker
lang: en
ref: marine-traffic
title: Marine traffic
intro: Open data from Finnish waterways
links:
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html#/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api"]
---

Marine traffic information is gathered from Finnish Transport Agency's data sources. Currently open data API provides following information:

- Marine warnings 

- Harbor schedules (gathered from the Portnet-system)

- Vessel location AIS (Automatic Identification System)

- Vessel and harbor metadata

# Content
- [REST/JSON -API](#restjson-api)
- [WebSocket -API](#websocket-api)
    - [Topics](#topics)
    - [Tracking all data](#tracking-all-data)
    - [Tracking all locations](#tracking-all-locations)
    - [Tracking a single vessel with mmsi-number](#tracking-a-single-vessel-with-mmsi-number)
    - [Vessel metadata-message](#vessel-metadata-message)
    - [Vessel location-message](#vessel-location-message)
    - [Simple JavaScript WebSocket -client](#simple-javascript-websocket--client)
- [Swagger-api](#swagger-api)

## REST/JSON -API

Full API description is located in [Swagger-documentation](https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html){:target="_blank"}

Both metadata and content is updated in real time.

## Web Socket API

Vessel locations can be tracked from following Web Socket APIs.  Protocol is mqtt-over-websocket.  This allows
you to subscibe only those topics you are interested in.

#### Topics

Topics are constructed like this:
- vessels/\<mmsi\>/metadata
- vessels/\<mmsi\>/locations
- vessels/status

Examples:

#### Tracking all data

``` vessels/# ```

#### Tracking all locations

``` vessels/*/locations ```

#### Tracking a single vessel with mmsi-number

``` 
     vessels/<mmsi>/*          # single vessel locations and metadata
     vessels/<mmsi>/locations  # single vessel locations
```

Message formats:

#### Vessel metadata-message

```
{
  "type":"VESSEL_METADATA",
  "data":{
    "mmsi":255805753,
    "name":"CHRISTIAN ESSBERGER",
    "shipType":80,
    "referencePointA":79,
    "referencePointB":22,
    "referencePointC":8,
    "referencePointD":8,
    "posType":1,
    "draught":61,
    "imo":9212498,
    "callSign":"CQCC",
    "eta":176640,
    "timestamp":1487938960141,
    "destination":"PORVOO"
  }
}
```

#### Vessel location-message

```
{
  "type":"VESSEL_LOCATION",
  "data":{
    "mmsi":563907000,
    "type":"Feature",
    "geometry":{
      "type":"Point",
      "coordinates":[24.951581666666666,59.49639333333334]
    },
    "properties":{
      "sog":0.1,
      "cog":169.3,
      "navStat":5,
      "rot":0,
      "posAcc":true,
      "raim":false,
      "heading":311,
      "timestamp":34,
      "timestampExternal":1487938959356
    }
  }
}
```

#### Simple JavaScript Web Socket client

```
<html>
<head>
  <title>Testiclient for vessel locations</title>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js" ></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.0.3/sockjs.min.js"></script>

  <script>

    var lines = [];

    function connect() {
      console.log('trying to connect...');
      var socket = new WebSocket('ws://meri-test.digitraffic.fi/api/v1/plain-websockets/locations');
      console.info('Socket is ' + socket.readyState);
      socket.onopen = function (event) {
        console.info('Socket is open');
      }
      socket.onmessage = function(message) {
        addMessage(JSON.parse(message.data));
        updateList();
      };
    }

    function addMessage(message) {
      var text = convert(message);

      if (lines.length > 50) {
          lines.shift();
      }

      lines.push(text);
    }

    function updateList() {
      $(".locations").html(lines.join('<br/>'));
    }

    function convert(message) {
      return JSON.stringify(message);
    }

    connect();
  </script>
</head>
<body>
  Vessel locations:
  <div class="locations" />
</body>
</html>
```
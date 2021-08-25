---
layout: traffictype
permalink: en/marine-traffic/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
swagger-source: https://meri.digitraffic.fi/swagger/swagger-spec.json
swagger-link: https://meri.digitraffic.fi/swagger/
hero-image: icebreaker
lang: en
ref: marine-traffic
title: Marine traffic
intro: Open data from Finnish waterways
links:
  - ["Finnish Transport Infrastructure Agency", "https://vayla.fi"]
  - ["Fintraffic", "https://fintraffic.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/swagger/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/swagger/swagger-spec.json"]
---

## General info

Marine traffic information is gathered from Finnish Transport Infrastructure Agency's data sources. Currently open data API provides following information:

- Marine warnings 

- Harbor schedules (gathered from the Portnet-system)

- Vessel location AIS (Automatic Identification System). [Additional info](ais).

- Dirways from Baltice-system

- Sea state estimation data from TLSC-system, that analyzes data send by smart AtoN buoy sites

- Waterway traffic disturbances

- Related metadata


<h2 id="content">Content</h2>

* Do not remove this line (it will not be displayed)
{:toc}


## REST/JSON -API

### Swagger API descriptions

Full API descriptions can be found in [Swagger-documentation page]({{page.swagger-link}}){:target="_blank"}

### Nautical warnings

[```https://meri.digitraffic.fi/api/v1/nautical-warnings/published```](https://meri.digitraffic.fi/api/v1/nautical-warnings/published){:target="_blank"}

Nautical warnings are fetched from POOKI.

At this time there is no metadata available.

### Port calls

[```https://meri.digitraffic.fi/api/v1/port-calls```](https://meri.digitraffic.fi/api/v1/port-calls){:target="_blank"}

Port calls are fetched from [Portnet](https://www.traficom.fi/fi/liikenne/merenkulku/portnet){:target="_blank"}.

Related metadata:

[```https://meri.digitraffic.fi/api/v1/metadata/locations```](https://meri.digitraffic.fi/api/v1/metadata/locations){:target="_blank"}

[```https://meri.digitraffic.fi/api/v1/metadata/vessel-details```](https://meri.digitraffic.fi/api/v1/metadata/vessel-details){:target="_blank"}

[```https://meri.digitraffic.fi/api/v1/metadata/code-descriptions```](https://meri.digitraffic.fi/api/v1/metadata/code-descriptions){:target="_blank"}

### Vessel locations

[```https://meri.digitraffic.fi/api/v1/locations/latest```](https://meri.digitraffic.fi/api/v1/locations/latest){:target="_blank"}

Vessel locations and metadata are collected from AIS-messages broadcasted by vessels.  [Additional info](ais).

Related metadata:

[```https://meri.digitraffic.fi/api/v1/metadata/vessels```](https://meri.digitraffic.fi/api/v1/metadata/vessels){:target="_blank"}

### Dirways

[```https://meri.digitraffic.fi/api/v1/winter-navigation/dirways```](https://meri.digitraffic.fi/api/v1/winter-navigation/dirways){:target="_blank"}

Dirways are fetched from [Baltice](http://baltice.org){:target="_blank"}.

Related metadata:

[```https://meri.digitraffic.fi/api/v1/winter-navigation/ports```](https://meri.digitraffic.fi/api/v1/winter-navigation/ports){:target="_blank"}

[```https://meri.digitraffic.fi/api/v1/winter-navigation/ships```](https://meri.digitraffic.fi/api/v1/winter-navigation/ships){:target="_blank"}

### Sea state estimation (SSE)

Data + metadata:

[```https://meri.digitraffic.fi/api/v1/sse/latest```](https://meri.digitraffic.fi/api/v1/sse/latest){:target="_blank"}

Sea state estimation data is fetched from TLSC-server, that gathers and analyzes data send by AtoN sites. 

Data is updated every 30 minutes.

### Disturbances in waterway traffic 

[```https://meri.digitraffic.fi/api/v2/bridge-lock/disruptions```](https://meri.digitraffic.fi/api/v2/bridge-lock/disruptions){:target="_blank"}

Waterway traffic disturbances are fetched from POOKI.

Data is updated every 10 minutes.

## WebSocket API

Vessel locations can be tracked from following WebSocket APIs.  Protocol is MQTT over WebSockets.  This allows
you to subscibe only those topics you are interested in.

Production address is wss://meri.digitraffic.fi:61619/mqtt

You must use SSL when connecting.  Also, you need to use following credentials:
* userName:digitraffic
* password:digitrafficPassword

When using Paho JS-client the address is plain meri.digitraffic.fi and port 61619, see example below.  

Address for test is meri-test.digitraffic.fi

### Topics

#### Vessel topics

Topics are constructed like this:

- ```vessels/\<mmsi\>/metadata```
- ```vessels/\<mmsi\>/locations```
- ```vessels/status```

#### Examples of tracking vessels data

```
vessels/#                 # Tracking all data
vessels/+/locations       # Tracking all locations
vessels/+/metadata        # Tracking all metadata
vessels/<mmsi>/+          # Single vessel locations and metadata
vessels/<mmsi>/locations  # Single vessel locations
vessels/<mmsi>/metadata   # Single vessel metadata
```

#### Vessel message formats

#### Vessel metadata -message

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

#### Vessel location -message

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
#### SSE topics

Topics are constructed like this:

- ```sse/status```
- ```sse/site/<site-id>``` 

#### Examples of tracking SSE-data

```
sse/#                       # Tracking all data
sse/status                  # Tracking status messages
sse/site/+                  # Tracking all sites data
sse/site/<site-id>          # Tracking single site data
```

#### SSE-data -message

```
{
    "siteNumber" : 8659,
    "type" : "Feature",
    "geometry" : {
      "type" : "Point",
      "coordinates" : [ 21.37694, 61.64541 ]
    },
    "properties" : {
      "siteName" : "Kelloniemi_2",
      "siteType" : "FLOATING",
      "lastUpdate" : "2019-05-21T09:02:10Z",
      "seaState" : "CALM",
      "trend" : "NO_CHANGE",
      "windWaveDir" : 200,
      "confidence" : "GOOD",
      "heelAngle" : 2.2,
      "lightStatus" : "OFF",
      "temperature" : 28
    }
}
```


#### Simple JavaScript MQTT WebSocket client

```
<html>
<head>
    <title>Testiclient for vessel locations</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js" ></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js"></script>

    <script>
        const lines = [];
        var messageCount = 0;
        let client;

        function connect() {
            console.log('trying to connect marine mqtt...');

            client = new Paho.MQTT.Client("meri-test.digitraffic.fi", 61619, 'testclient_' + Date.now());

            client.onConnectionLost = function (response) {
                console.info(Date.now() + ' Connection lost:' + response.errorMessage);
            };

            client.onMessageArrived = function(message) {
                messageCount++;

                addMessage(message);

                updateList();
            };

            const connectionProperties = {
                onSuccess:onConnect,
                mqttVersion:4,
                useSSL:true,
                userName:"digitraffic",
                password:"digitrafficPassword"
            };

            client.connect(connectionProperties);

            window.setInterval(logMessageCount, 60*1000);
        }

        function logMessageCount() {
            console.info(Date.now() + ' ' + messageCount + ' messages per minute');
            messageCount = 0;
        }

        function onConnect() {
            console.info(Date.now() + ' Connection open');

            client.subscribe("vessels/#");
        }

        function addMessage(message) {
            const text = convert(message);

            if (lines.length > 100) {
                lines.shift();
            }

            lines.push(text);
        }

        function updateList() {
            $(".messages").html(lines.join('<br/>'));
        }

        function convert(message) {
            const content = message.payloadString;
            const topic = message.destinationName;
            const time = Date.now();
            const json = JSON.parse(content);
            let deltaMs;

            if (typeof json.properties === "undefined") {
                deltaMs = time - json.timestamp;
            } else {
                deltaMs = time - json.properties.timestampExternal;
            }

            return "{ now: " + time + ", &Delta;timeMs: " + deltaMs + ", topic: \"" + topic + "\", content: " + content + " }";
        }

        connect();
    </script>
</head>
<body>
    Messages:
    <div class="messages" />
</body>
</html>
```

## Restrictions

See [Information and instructions for using APIs > General considerations](/en/instructions/#general-considerations)

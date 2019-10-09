---
layout: traffictype
permalink: /en/road-traffic/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api
hero-image: road
title: Road traffic
lang: en
ref: road-traffic
intro: Open data from Finnish roads.
links:
  - ["Väylä", "https://vayla.fi"]
  - ["Traffic Management Finland","https://tmfg.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html#/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api"]
---

Road traffic information is gathered from the operational traffic management systems of ITM Finland Ltd (a subsidiary of Traffic Management Finland).
Currently the open data API includes:

- TMS data (Traffic Measurement System). Information is gathered from an inductive loop which is installed inside the pavement. When a vehicle passes over the loop it creates information about average speeds and traffic amounts. Currently, there are over 450 traffic measuring stations in Finland.

- Current free flow speeds. Data is updated once a day.

- Traffic disorders. Road traffic center provides information about traffic accidents and other disorders like road works. Messages are available in Datex2 format.

- Weight restrictions are available in datex2 format.

- Roadworks are available in datex2 format.

- Road weather station data. The road weather stations measure e.g. temperature, wind, rain, relative humidity and dew point.  Data is updated once per minute. Currently, there are over 350 road weather stations on the Finnish road network.

- Road weather forecasts. Content is updated every five minutes.

- Road weather cameras. Cameras provide information on current traffic flow and weather conditions. Currently, there are over 470 road weather cameras.

- Metadata for all services is updated twice per day.

# Content
- [REST/JSON APIs](#restjson--apis)
    - [Road weather cameras](#road-weather-cameras)
    - [Current journey times](#current-journey-times)
    - [History data for previous day](#history-data-for-previous-day)
    - [History data for requested month](#history-data-for-requested-month)
    - [Current free flow speeds](#current-free-flow-speeds)
    - [Current road weather forecasts (v1)](#current-road-weather-forecasts-v1)
    - [Current road weather forecasts (v2)](#current-road-weather-forecasts-v2)
    - [Current data from LAM stations](#current-data-from-lam-stations)
    - [Traffic disorders](#traffic-disorders)
    - [Weight restrictions](#weight-restrictions)
    - [Roadworks](#roadworks)
    - [Status of road weather stations](#status-of-road-weather-stations)
- [WebSocket -API](#websocket-api)
    - [Topics](#topics)
    - [Simple JavaScript Web Socket -client](#simple-javascript-web-socket-client)
- [Restrictions](#restrictions)    
- [Swagger-documentation](#swagger-api)

## REST/JSON -APIs

Full API description is located in [Swagger-documentation](https://tie.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html){:target="_blank"}

### Road weather cameras

[```https://tie.digitraffic.fi/api/v1/data/camera-data```](https://tie.digitraffic.fi/api/v1/data/camera-data)

[```https://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](https://tie.digitraffic.fi/api/v1/data/camera-data/{id})

Response message contains weather camera information and URL for the camera image. For example preset image C0450701 is located at 
[https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg).

![Weather camera image C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

Related metadata:
[```https://tie.digitraffic.fi/api/v1/metadata/camera-stations```](https://tie.digitraffic.fi/api/v1/metadata/camera-stations)

### Current journey times

NOTE! This information is not updated. The old journey time system has been shut down in the end of 2017.

### History data for previous day 

NOTE! This information is not available

### History data for requested month
[```https://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month})

Response message contains history data for requested month.

NOTE! Last history data is from 12/2017.

### Current free flow speeds

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds)

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id})

Response message contains currently valid free flow speeds. The free flow speeds are changed when the summer and winter speed limits are activated on the road network.

Message is updated once a day (3:30 AM EET).

Related metadata:
[```https://tie.digitraffic.fi/api/v1/metadata/tms-stations```](https://tie.digitraffic.fi/api/v1/metadata/tms-stations)

### Current road weather forecasts (v1)

[```https://tie.digitraffic.fi/api/v1/data/road-conditions```](https://tie.digitraffic.fi/api/v1/data/road-conditions)

Response message contains road specific weather forecasts. Reports are updated every 5 minutes.

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/weather-stations```](https://tie.digitraffic.fi/api/v1/metadata/weather-stations)

[```https://tie.digitraffic.fi/api/v1/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors)

[```https://tie.digitraffic.fi/api/v1/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v1/metadata/forecast-sections)


### Current road weather forecasts (v2)

Road weather forecasts v2 contains more detailed road sections than older v1.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions```](https://tie.digitraffic.fi/api/v2/data/road-conditions)

Road specific weather forecasts. Reports are updated every 5 minutes.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v2/data/road-conditions/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude})

Road specific weather forecasts for given area.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions/{roadNumber}```](https://tie.digitraffic.fi/api/v2/data/road-conditions/{roadNumber})

Road specific weather forecasts for given road.


Related metadata:

[```https://tie.digitraffic.fi/api/v2/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v2/metadata/forecast-sections)

[```https://tie.digitraffic.fi/api/v2/metadata/forecast-sections/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v2/metadata/forecast-sections/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude})

[```https://tie.digitraffic.fi/api/v2/metadata/forecast-sections/{roadNumber}```](https://tie.digitraffic.fi/api/v2/metadata/forecast-sections/{roadNumber})



### Current data from LAM stations

[```https://tie.digitraffic.fi/api/v1/data/tms-data```](https://tie.digitraffic.fi/api/v1/data/tms-data)

[```https://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](https://tie.digitraffic.fi/api/v1/data/tms-data/{id})

Response message contains TMS (Traffic Measurement System)–stations measurement data.

Every TMS station provides information about traffic amounts and measured average speeds.

Data is updated almost in real time but information is cached. Actual update interval is one minute. 
Real time data can be read from WebSocket. 

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/tms-stations```](https://tie.digitraffic.fi/api/v1/metadata/tms-stations)

[```https://tie.digitraffic.fi/api/v1/metadata/tms-sensors```](https://tie.digitraffic.fi/api/v1/metadata/tms-sensors)

### Traffic disorders

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2)

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month})

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId})

Response message contains traffic disorders those have significant impact on traffic flow, e.g. traffic accidents and temporary traffic rearrangements. 

Disorders contain TMC location information to identify occurence area or location of the disorder. Get detailed location description from [here](tmc-data).

Dates are include in multiple formats. Under published tag, there is utc 
and localtime fields that are in UTC (Zulu) time. Other times are in local time 
with offset from the UTC. Best practice is to use some library that can parse 
date and times properly with any offset from ISO 8601 date format.

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/locations-versions```](https://tie.digitraffic.fi/api/v1/metadata/location-versions)

[```https://tie.digitraffic.fi/api/v1/metadata/locations-types```](https://tie.digitraffic.fi/api/v1/metadata/location-types)

[```https://tie.digitraffic.fi/api/v1/metadata/locations```](https://tie.digitraffic.fi/api/v1/metadata/locations)

### Weight restrictions

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2)

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month})

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId})

Weight restrictions use the TMC location information to identify the affected area or location of the weight restriction. Get detailed location description from [here](tmc-data).

Dates are include in multiple formats. Under published tag, there is utc 
and localtime fields that are in UTC (Zulu) time. Other times are in local time 
with offset from the UTC. Best practice is to use some library that can parse 
date and times properly with any offset from ISO 8601 date format.

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/locations-versions```](https://tie.digitraffic.fi/api/v1/metadata/location-versions)

[```https://tie.digitraffic.fi/api/v1/metadata/locations-types```](https://tie.digitraffic.fi/api/v1/metadata/location-types)

[```https://tie.digitraffic.fi/api/v1/metadata/locations```](https://tie.digitraffic.fi/api/v1/metadata/locations)

### Roadworks

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2)

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month})

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId})

The dataset is updated three times per day, at 08:00, at 12:00 and at 16:00 (local Finnish time)

Roadworks contains the TMC location information to identify the affected area or location of the roadwork. Get detailed location description from [here](tmc-data).

Dates are include in multiple formats. Under published tag, there is utc 
and localtime fields that are in UTC (Zulu) time. Other times are in local time 
with offset from the UTC. Best practice is to use some library that can parse 
date and times properly with any offset from ISO 8601 date format.

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/locations-versions```](https://tie.digitraffic.fi/api/v1/metadata/location-versions)

[```https://tie.digitraffic.fi/api/v1/metadata/locations-types```](https://tie.digitraffic.fi/api/v1/metadata/location-types)

[```https://tie.digitraffic.fi/api/v1/metadata/locations```](https://tie.digitraffic.fi/api/v1/metadata/locations)

### Status of road weather stations

[```https://tie.digitraffic.fi/api/v1/data/weather-data```](https://tie.digitraffic.fi/api/v1/data/weather-data)

[```https://tie.digitraffic.fi/api/v1/data/weather-data/{id}```](https://tie.digitraffic.fi/api/v1/data/weather-data/{id})

Response message contains latest weather measurement data.

Data is updated almost in real time but information is cached. Actual update interval is one minute.
Real time data can be read from WebSocket. 

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/weather-stations```](https://tie.digitraffic.fi/api/v1/metadata/weather-stations)

[```https://tie.digitraffic.fi/api/v1/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors)

## WebSocket API

TMC-data can be tracked from following Web Socket APIs. Protocol is MQTT over WebSockets. This allows
you to subscibe only those topics you are interested in.

Production address is wss://tie.digitraffic.fi:61619/mqtt

You must use SSL when connecting. Also, you need to use following credentials:
* userName:digitraffic
* password:digitrafficPassword

When using Paho JS-client the address is plain tie.digitraffic.fi and port 61619, see example below.  

Address for test is tie-test.digitraffic.fi

#### Topics

Topics are constructed like this:

- tms/\<roadStationId>/\<sensorId\>
- tms/status
- weather/\<roadStationId>/\<sensorId\>
- weather/status

#### TMS-message

```
{
  "id": 5122,
  "roadStationId": 23307,
  "name": "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1",
  "oldName":" averageSpeed1",
  "shortName": "km/h1",
  "sensorValue": 84,
  "sensorUnit":" km/h",
  "measuredTime": "2019-01-23T08:25:02Z"
}
```

#### Weather-message

```
{
  "id": 1,
  "roadStationId": 1158,
  "name": "ILMA",
  "oldName": "airtemperature1",
  "shortName": "Ilma ",
  "sensorValue": -2.2,
  "sensorUnit": "°C",
  "measuredTime": "2019-01-23T08:35:00Z"
}

```

#### Simple JavaScript Web Socket client

```
<html>
<head>
    <title>Test mqtt tms-messages</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js" ></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js"></script>

    <script>
        'use strict';
        const lines = [];
        let messagesLastMinuteCount = 0, client;

        function connect() {
            console.log('trying to connect to road mqtt...');

            client = new Paho.MQTT.Client("tie-aws-mqtt-test.digitraffic.fi", 61619, 'testclient_' + Date.now());

            client.onConnectionLost = function (response) {
                console.info(Date.now() + ' Connection lost:' + response.errorMessage);
            };
            client.onMessageArrived = function(message) {
                messagesLastMinuteCount++;

                addMessage(JSON.parse(message.payloadString));

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
            console.info(Date.now() + ' ' + messagesLastMinuteCount + ' messages per minute');
            $("#messagesPerMinute").text(messagesLastMinuteCount);
            messagesLastMinuteCount = 0;
        }

        function onConnect() {
            console.info(Date.now() + ' Connection open');
            client.subscribe("tms/#");
        }

        function addMessage(message) {
            const text = JSON.stringify(message);

            if (lines.length > 100) {
                lines.shift();
            }

            lines.push(text);
        }

        function updateList() {
            $(".messages").html(lines.join('<br/>'));
        }

        connect();
    </script>
</head>
<body>
Messages (<span id="messagesPerMinute">&lt;counting&gt;</span> messages per minute):
<div class="messages" />
</body>
</html>

```

## Restrictions

Requests to /mqtt -address are restricted to 5 requests a minute per ip-address.

Requests to a single weather camera image(weathercam.digitraffic.fi) are restricted to 60 requests a minute per ip-address.

Requests to a single /api/v2 URL are restricted to to 10 requests a minute per ip-address
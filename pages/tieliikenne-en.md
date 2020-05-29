---
layout: traffictype
permalink: /en/road-traffic/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/swagger/swagger-spec.json
hero-image: road
title: Road traffic
lang: en
ref: road-traffic
intro: Open data from Finnish roads.
links:
  - ["Väylävirasto", "https://vayla.fi"]
  - ["Traffic Management Finland","https://tmfg.fi"]
  - ["Swagger-UI", "https://tie.digitraffic.fi/swagger/"]
  - ["Swagger-kuvaus", "https://tie.digitraffic.fi/swagger/swagger-spec.json"]
---

<h2 id="content">Content</h2>

* Do not remove this line (it will not be displayed)
{:toc}

## General info

Road traffic information is gathered from the operational traffic management systems of ITM Finland Ltd (a subsidiary of Traffic Management Finland).
Currently the open data API includes:

- TMS data (Traffic Measurement System). Information is gathered from an inductive loop which is installed inside the pavement. When a vehicle passes over the loop it creates information about average speeds and traffic amounts. Currently, there are over 450 traffic measuring stations in Finland. The [TMS documentation](lam) contains descriptions of TMS data.

- Current free flow speeds. Data is updated once a day.

- Traffic disorders. Road traffic center provides information about traffic accidents and other disorders like road works. Messages are available in Datex2 format.

- Weight restrictions are available in datex2 format.

- Roadworks are available in datex2 format.

- Road weather station data. The road weather stations measure e.g. temperature, wind, rain, relative humidity and dew point.  Data is updated once per minute. Currently, there are over 350 road weather stations on the Finnish road network.

- Road weather forecasts. Content is updated every five minutes.

- Road weather cameras. Cameras provide information on current traffic flow and weather conditions. Currently, there are over 470 road weather cameras.

- Metadata for all services is updated twice per day

## REST/JSON -APIs

Full API description is located in [Swagger-documentation](https://tie.digitraffic.fi/swagger/){:target="_blank"}

### Road weather cameras

[```https://tie.digitraffic.fi/api/v1/data/camera-data```](https://tie.digitraffic.fi/api/v1/data/camera-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](https://tie.digitraffic.fi/api/v1/data/camera-data/C04507){:target="_blank"}

Response message contains weather camera information and URL for the camera image. For example preset image C0450701 is located at 
[https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.

![Weather camera image C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

Related metadata:
[```https://tie.digitraffic.fi/api/v3/metadata/camera-stations```](https://tie.digitraffic.fi/api/v3/metadata/camera-stations){:target="_blank"}

### Weather camera image history for the last 24 hours

History can be fetched by API call:

[```https://tie.digitraffic.fi/api/v2/data/camera-history/history?id={preset or camera id}```](https://tie.digitraffic.fi/api/v2/data/camera-history/history?id=C0450701){:target="_blank"}

API call returns links to history images. You can also give time to get single image of given moment. 

History presence tells if history exists for given time interval and it can be fetched by API call:

[```https://tie-test.digitraffic.fi/api/v2/data/camera-history/presences?id={preset or camera id}&from={ISO 8601 -aika}2&to={ISO 8601 -aika}```](https://tie-test.digitraffic.fi/api/v2/data/camera-history/presences?cameraOrPresetId=C0450701){:target="_blank"}


### Current journey times

NOTE! This information is not updated. The old journey time system has been shut down in the end of 2017.

Old history data can be downloaded from the following [link](https://tie.digitraffic.fi/api/v1/data/fluency-history/list.html){:target="_blank"}.

### Current free flow speeds

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/23001){:target="_blank"}

Response message contains currently valid free flow speeds. The free flow speeds are changed when the summer and winter speed limits are activated on the road network.

Message is updated once a day (3:30 AM EET).

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

### Current road weather forecasts (v1)

[```https://tie.digitraffic.fi/api/v1/data/road-conditions```](https://tie.digitraffic.fi/api/v1/data/road-conditions){:target="_blank"}

Response message contains road specific weather forecasts. Reports are updated every 5 minutes.

Related metadata:

[```https://tie.digitraffic.fi/api/v1/metadata/weather-stations```](https://tie.digitraffic.fi/api/v1/metadata/weather-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v1/metadata/forecast-sections){:target="_blank"}


### Current road weather forecasts (v2)

Road weather forecasts v2 contains more detailed road sections than older v1.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions```](https://tie.digitraffic.fi/api/v2/data/road-conditions){:target="_blank"}

Road specific weather forecasts. Reports are updated every 5 minutes.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v2/data/road-conditions/22/50/27/60){:target="_blank"}

Road specific weather forecasts for given area.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions/{roadNumber}```](https://tie.digitraffic.fi/api/v2/data/road-conditions/25){:target="_blank"}

Road specific weather forecasts for given road.


Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/22/50/27/60){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/{roadNumber}```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/25){:target="_blank"}



### Current data from LAM stations

[```https://tie.digitraffic.fi/api/v1/data/tms-data```](https://tie.digitraffic.fi/api/v1/data/tms-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](https://tie.digitraffic.fi/api/v1/data/tms-data/23001){:target="_blank"}

Response message contains TMS (Traffic Measurement System)–stations measurement data.

Every TMS station provides information about traffic amounts and measured average speeds.

Data is updated almost in real time but information is cached. Actual update interval is one minute. 
Real time data can be read from WebSocket. 

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/tms-sensors```](https://tie.digitraffic.fi/api/v3/metadata/tms-sensors){:target="_blank"}

### Traffic incidents

V2 Datex2

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.xml```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.xml){:target="_blank"}

V2 JSON

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.json```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.json){:target="_blank"}

V1

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}){:target="_blank"}

Response message contains traffic incidents those have significant impact on traffic flow, e.g. traffic accidents and temporary traffic rearrangements. 

Incident contain TMC location information to identify occurence area or location of the disorder. Get detailed location description from [here](tmc-data).

Dates are include in multiple formats. Under published tag, there is utc 
and localtime fields that are in UTC (Zulu) time. Other times are in local time 
with offset from the UTC. Best practice is to use some library that can parse 
date and times properly with any offset from ISO 8601 date format.

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}

### Weight restrictions

V2

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/weight-restriction.xml```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/weight-restriction.xml){:target="_blank"}

V1

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId}){:target="_blank"}

Weight restrictions use the TMC location information to identify the affected area or location of the weight restriction. Get detailed location description from [here](tmc-data).

Dates are include in multiple formats. Under published tag, there is utc 
and localtime fields that are in UTC (Zulu) time. Other times are in local time 
with offset from the UTC. Best practice is to use some library that can parse 
date and times properly with any offset from ISO 8601 date format.

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}

### Roadworks

V2

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/roadwork.xml```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/roadwork.xml){:target="_blank"}

V1

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId}){:target="_blank"}

The dataset is updated three times per day, at 08:00, at 12:00 and at 16:00 (local Finnish time)

Roadworks contains the TMC location information to identify the affected area or location of the roadwork. Get detailed location description from [here](tmc-data).

Dates are include in multiple formats. Under published tag, there is utc 
and localtime fields that are in UTC (Zulu) time. Other times are in local time 
with offset from the UTC. Best practice is to use some library that can parse 
date and times properly with any offset from ISO 8601 date format.

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}

### Status of road weather stations

[```https://tie.digitraffic.fi/api/v1/data/weather-data```](https://tie.digitraffic.fi/api/v1/data/weather-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/weather-data/{id}```](https://tie.digitraffic.fi/api/v1/data/weather-data/{id}){:target="_blank"}

Response message contains latest weather measurement data.

Data is updated almost in real time but information is cached. Actual update interval is one minute.
Real time data can be read from WebSocket. 

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/weather-stations```](https://tie.digitraffic.fi/api/v3/metadata/weather-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v3/metadata/weather-sensors){:target="_blank"}


#### Sensor history for the last 24 hours

Sensor history from the weather road station can be fetched by API call:

[```https://tie.digitraffic.fi/api/beta/weather-history-data/{stationId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057){:target="_blank"}

Single sensor history can be fetched by API call:

[```https://tie.digitraffic.fi/api/beta/weather-history-data/{stationId}/{sensorId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057/1){:target="_blank"}

Time interval can be adjusted with from={ISO 8061 -time} and to={ISO 8061 -time} parameters. 

History for the last 24 hours is currently only in beta-API.

### Variable signs

[```https://tie.digitraffic.fi/api/v2/data/variable-signs```](https://tie.digitraffic.fi/api/v2/data/variable-signs){:target="_blank"}

[```https://tie.digitraffic.fi/api/v2/data/variable-signs/{id}```](https://tie.digitraffic.fi/api/v2/data/variable-signs/{id}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v2/data/variable-signs/history/{id}```](https://tie.digitraffic.fi/api/v2/data/variable-signs/history/{id}){:target="_blank"}

Response message contains latest variable sign data.  Currenty supported sign types are speed limits and warnings.

Warning sign types(in Finnish):

[```https://tie.digitraffic.fi/api/v2/metadata/variable-signs/code-descriptions```](https://tie.digitraffic.fi/api/v2/metadata/variable-signs/code-descriptions){:target="_blank"}

Warning sign images:

[```https://vayla.fi/tieverkko/liikennemerkit```](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}



### Road maintenance information

The Finnish Transport Infrastructure Agency receives real-time location and operation information for maintenance vehicles from road maintenance contractors.
The information is transmitted from the vehicles to the contractors' information systems, from where it is further transmitted 
to the Finnish Transport Infrastructure Agency's Harja system.
Digitraffic also receives this information and publishes it as open data at the API's described below.
The data is updated every minute on average.

The Finnish Transport Infrastructure Agency is also preparing publication of maintenance realization data for data older than one day in its own open data services.

#### Vehicle latest location

The API returns the latest location and task information received from the maintenance vehicles.

[```https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/latest```](https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/latest){:target="_blank"}

#### Vehicle tracking data

The API returns the route taken by the vehicle. The route does not fully correspond to the road route of the vehicle,
because the route to be published is formed by combining the location information from the vehicle into a line and
separate routing to the road network is not done. The route can also be a point if no more waypoints have been obtained from the vehicle.

A new tracking object is created whenever:
- the task performed by the vehicle changes
- the interval between two consecutive received position messages is more than 5 minutes
- the calculated driving speed between two consecutive received position messages is more than 140 km/h
 
These treatments eliminate the largest possible errors in the data generated by the vehicles.

[```https://tie.digitraffic.fi/api/v2/data/maintenance/trackings```](https://tie.digitraffic.fi/api/v2/data/maintenance/trackings){:target="_blank"}

#### Vehicle task types

The API returns more detailed explanations of the tasks performed by the vehicles.

[```https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/tasks```](https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/tasks){:target="_blank"}


#### Swagger descriptions of the APIs

[```https://tie.digitraffic.fi/swagger/#/Data v2```](https://tie.digitraffic.fi/swagger/#/Data%20v2){:target="_blank"}


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

            client = new Paho.MQTT.Client("tie-test.digitraffic.fi", 61619, 'testclient_' + Date.now());

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

Requests to a single weather camera image(weathercam.digitraffic.fi) are restricted to 20 requests a minute per ip-address.

Requests to a single version 2 or newer api are restricted to to 10 requests a minute per ip-address.

## Swagger API specification
<!-- After this swagger-ui.html is appended here automatically in traffic-type.html -->

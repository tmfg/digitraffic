---
layout: traffictype
permalink: /en/road-traffic/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/swagger/openapi.json
swagger-link: https://tie.digitraffic.fi/swagger/
hero-image: road
title: Road traffic
lang: en
ref: road-traffic
intro: Open data from Finnish roads.
links:
  - ["Väylävirasto", "https://vayla.fi"]
  - ["Fintraffic","https://fintraffic.fi"]
  - ["Swagger-UI", "https://tie.digitraffic.fi/swagger/"]
  - ["Swagger-description", "https://tie.digitraffic.fi/swagger/openapi.json"]
---

## General info

Road traffic information is gathered from the operational traffic management systems of ITM Finland Ltd (a subsidiary of Fintraffic).
Currently the open data API includes:

- Road weather cameras. Cameras provide information on current traffic flow and weather conditions. Currently, there are over 470 road weather cameras.

- Road weather station data. The road weather stations measure e.g. temperature, wind, rain, relative humidity and dew point.  Data is updated once per minute. Currently, there are over 350 road weather stations on the Finnish road network.

- Road weather forecasts. Content is updated every five minutes.

- Traffic measurement system (TMS) data. Information about average speeds and traffic amounts.

- Traffic messages. Traffic disorders, weight restrictions, roadworks and weight restrictions are available in Datex2 and Simple-JSON format.

- TMC/ALERT-C location data which is used in Traffic messages.

- Variable signs

- Road maintenance information

- Walking and cycling counting site values

- Metadata for all services is updated twice per day


<h2 id="contents">Contents</h2>

* Do not remove this line (it will not be displayed)
{:toc}


## REST/JSON -APIs

### Swagger API descriptions

Full API descriptions can be found in Swagger-documentation at [```https://tie.digitraffic.fi/swagger/```](https://tie.digitraffic.fi/swagger/){:target="_blank"}

### Road weather cameras

[```https://tie.digitraffic.fi/api/v1/data/camera-data```](https://tie.digitraffic.fi/api/v1/data/camera-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](https://tie.digitraffic.fi/api/v1/data/camera-data/C04507){:target="_blank"}

Response message contains weather camera information and URL for the camera image. For example preset image C0450701 is located at 
[https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.
Weather camera images are updated approximately about every 10 minutes.

![Weather camera image C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/camera-stations```](https://tie.digitraffic.fi/api/v3/metadata/camera-stations){:target="_blank"}

You should check from the metadata at the least field below to make sure the camera or preset is in collection.

- Camera fields ```state``` and ```collectionStatus```
- Preset field ```inCollection```


### Weather camera image history for the last 24 hours

History can be fetched by API call:

[```https://tie.digitraffic.fi/api/v3/data/camera-history/history?id={preset or camera id}```](https://tie.digitraffic.fi/api/v3/data/camera-history/history?id=C0450701){:target="_blank"}

API call returns links to history images. You can also give time to get single image of given moment. 

History presence tells if history exists for given time interval and it can be fetched by API call:

[```https://tie-test.digitraffic.fi/api/v3/data/camera-history/presences?id={preset or camera id}&from={ISO 8601 -aika}2&to={ISO 8601 -aika}```](https://tie-test.digitraffic.fi/api/v3/data/camera-history/presences?cameraOrPresetId=C0450701){:target="_blank"}


### Current data of road weather stations

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


### Current road weather forecasts

Message contains road sections weather forecasts. Reports are updated every 5 minutes.


[```https://tie.digitraffic.fi/api/v3/data/road-conditions```](https://tie.digitraffic.fi/api/v3/data/road-conditions){:target="_blank"}

Road specific weather forecasts.

[```https://tie.digitraffic.fi/api/v3/data/road-conditions/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v3/data/road-conditions/22/50/27/60){:target="_blank"}

Road specific weather forecasts for given area.

[```https://tie.digitraffic.fi/api/v3/data/road-conditions/{roadNumber}```](https://tie.digitraffic.fi/api/v3/data/road-conditions/25){:target="_blank"}

Road specific weather forecasts for given road.


Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/22/50/27/60){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/{roadNumber}```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/25){:target="_blank"}


### Traffic measurement system (TMS) dataCurrent data from TMS stations

#### Documentation

The [TMS documentation](lam) contains descriptions of TMS data.

#### Statistics

[Statistics](https://tie-lam-test.digitraffic.fi) web form

#### Raw data

[Raw data](lam#TMS_raw_data)

#### Real time data

[```https://tie.digitraffic.fi/api/v1/data/tms-data```](https://tie.digitraffic.fi/api/v1/data/tms-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](https://tie.digitraffic.fi/api/v1/data/tms-data/23001){:target="_blank"}

Response message contains TMS (Traffic Measurement System)–stations measurement data.

Every TMS station provides information about traffic amounts and measured average speeds.

Data is updated almost in real time but information is cached. Actual update interval is one minute. 
Real time data can be read from WebSocket. 

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/tms-sensors```](https://tie.digitraffic.fi/api/v3/metadata/tms-sensors){:target="_blank"}

### Traffic messages

Traffic messages are possible to get in standard DATEX II and Simple JSON -formats that is based on GeoJSON specification.
Because of that JSON format contains also the geometries of the traffic messages unlike DATEX II.
It is possible to get JSON formatted traffic messages also without area geometries to save time and bandwidth as the areas are quite large. 
The area geometries can be then cached locally from specific API for geometries eiter getting them one by one or all at once.
This makes a big difference in size of the messages that have an area geometry.

Traffic messages contains TMC/ALERT-C locations to identify the affected area or location of the announcement. 
More information at [TMC/ALERT-C location data](#tmcalert-c-location-data) 

Dates in message texts are include in multiple formats. Fixed date time fields are in ISO 8601 date format and in UTC (Zulu) time. 
Best practice is to use some library that can parse date and times properly with any offset from ISO 8601 date format.

#### Types of traffic messages 
* **Exempted transport** `EXEMPTED_TRANSPORT`
  * Message contains information of transports causing disruptions for other road users. 
* **Road work** `ROAD_WORK`
  * Message contains information of road works including progress and disruptions for other road users.
* **Traffic announcement** `TRAFFIC_ANNOUNCEMENT`
  * Message contains traffic incidents those have significant impact on traffic flow, e.g. traffic accidents and temporary traffic rearrangements.
* **Weight restriction** `WEIGHT_RESTRICTION`
  * Message contains weight restriction limiting usage of the roads.

#### Traffic messages DATEX II -APIs

* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK){:target="_blank"}
* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Traffic messages Simpele JSON -APIs

* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK){:target="_blank"}
* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Traffic messages area geometries

Traffic message can contain area geometries that can be found from JSON-path:
``properties.announcements[x].locationDetails.areaLocation.areas[x].locationCode`` 
If value of API-parameter `includeAreaGeometry` is `false` the geometry is not returned in JSON-response.
It is better practice caching geometries locally and get them from a local cache than to get them every time from the API.

<details>
  <summary>Open an example of Simple JSON traffic message that contains ALERT-C area geometry with location code 27:</summary>
    <pre>
    {
      "type": "Feature",
      "geometry": null,
      "properties": {
        "situationId": "GUID50379079",
        "situationType": "TRAFFIC_ANNOUNCEMENT",
        "trafficAnnouncementType": "general",
        "version": 1,
        "releaseTime": "2021-01-31T15:57:29.105Z",
        "announcements": [
          {
            "language": "FI",
            "title": "Liikennetiedote. ",
            "location": {
              "countryCode": 6,
              "locationTableNumber": 17,
              "locationTableVersion": "1.11.37",
              "description": "Lappi Norjan vastaiset rajanylityspaikat."
            },
            "locationDetails": {
              "areaLocation": {
                "areas": [
                  {
                    "name": "Lappi",
                    "locationCode": 27,
                    "type": "PROVINCE"
                  }
                ]
              }
            },
            "features": [
              {
                "name": "Liikenne pysäytetään"
              }
            ],
            "roadWorkPhases": [],
            "comment": "Rajoituksia henkilöliikenteen rajanylitykseen Norjan suuntaan:
Polmak, Karigasniemi ja Kivilompolo suljettu klo 21:00-09:00.

Näätämö suljettu 24/7
Utsjoki suljettu 24/7
Kilpisjärvi avoinna 24/7

Lisätietoa Norjaan matkustamisesta on osoitteessa www.entrynorway.no",
            "timeAndDuration": {
              "startTime": "2021-01-06T14:58:00Z"
            },
            "additionalInformation": "Liikenne- ja kelitiedot verkossa: https://liikennetilanne.fintraffic.fi/",
            "sender": "Fintraffic Tieliikennekeskus Oulu"
          }
        ],
        "contact": {
          "phone": "02002100",
          "email": "oulu.liikennekeskus@fintraffic.fi"
        }
      }
    }
    </pre>
</details>
<br/>
Area geometries are served from the API:
* Geometry with ALERT-C location code 27: [```https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries/27?lastUpdated=false```](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries/27?lastUpdated=false){:target="_blank"}
* All geometries: [```https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries?lastUpdated=false```](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries?lastUpdated=false){:target="_blank"}


### TMC/ALERT-C location data

TMC/ALERT-C material contains location data which is used in Traffic information such as road works, accidents, traffic jams and weather. 
More information can be found at [TMC Data](tmc-data) -page.

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}



### Variable signs

[```https://tie.digitraffic.fi/api/v3/data/variable-signs```](https://tie.digitraffic.fi/api/v3/data/variable-signs){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/data/variable-signs/{id}```](https://tie.digitraffic.fi/api/v3/data/variable-signs/{id}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/data/variable-signs/history/{id}```](https://tie.digitraffic.fi/api/v3/data/variable-signs/history/{id}){:target="_blank"}

Response message contains latest variable sign data.  Currenty supported sign types are speed limits and warnings. Digitraffic publishes the data only from the master device of a device group. Data from slave devices on the left side of the road or on ramps is not available.

Warning sign types(in Finnish):

[```https://tie.digitraffic.fi/api/v2/metadata/variable-signs/code-descriptions```](https://tie.digitraffic.fi/api/v2/metadata/variable-signs/code-descriptions){:target="_blank"}

Warning sign images:

[```https://vayla.fi/tieverkko/liikennemerkit```](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}

Data is also available in datex2-format:

[```https://tie.digitraffic.fi/api/v1/variable-signs/datex2```](https://tie.digitraffic.fi/api/v1/variable-signs/datex2){:target="_blank"}

Warnings text can contain sign symbols enclosed with []. It is possible to render those in svg-format:

[```https://tie.digitraffic.fi/api/v1/variable-signs/images/ramppi_123```](https://tie.digitraffic.fi/api/v1/variable-signs/images/ramppi_123){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/variable-signs/images/tie_321```](https://tie.digitraffic.fi/api/v1/variable-signs/images/tie_321){:target="_blank"}

### Road maintenance information

The Finnish Transport Infrastructure Agency receives real-time location and operation information for maintenance vehicles from road maintenance contractors.
The information is transmitted from the vehicles to the contractors' information systems, from where it is further transmitted 
to the Finnish Transport Infrastructure Agency's Harja system.
Digitraffic also receives this information and publishes it as open data at the API's described below.
The data is updated every minute on average. Harja data domain is `state-roads`.

In additon to Harja-data we also receive some data from municipalities. This data's domain is other than `state-roads`.

The Finnish Transport Infrastructure Agency is also preparing publication of maintenance realization data for data older than one day in its own open data services.

#### Maintenance domain

The api returns possible values for domains. Domain tells the system where the data is coming.

[```https://tie.digitraffic.fi/api/maintenance/v1/tracking/domains```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/domains){:target="_blank"}

#### Vehicle task types

The API returns more detailed explanations of the tasks performed by the vehicles.

[```https://tie.digitraffic.fi/api/maintenance/v1/tracking/tasks```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/tasks){:target="_blank"}

#### Vehicle tracking data

The API returns the route taken by the vehicle. The route does not fully correspond to the road route of the vehicle,
because the route to be published is formed by combining the location information from the vehicle into a line and
separate routing to the road network is not done. The route can also be a point if no more waypoints have been obtained from the vehicle.

A new tracking object is created whenever:
- the task performed by the vehicle changes
- the interval between two consecutive received position messages is more than 5 minutes
- the calculated driving speed between two consecutive received position messages is more than 140 km/h

These treatments eliminate the largest possible errors in the data generated by the vehicles.

[```https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes?domain=state-roads```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes?domain=state-roads){:target="_blank"}

#### Vehicle latest location

The API returns the latest location and task information received from the maintenance vehicles.

[```https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes/latest?domain=state-roads```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes/latest?domain=state-roads){:target="_blank"}

### Walking and cycling counting site values

Walking and cycling counting site values are currently received from Oulu region.

All counters in GeoJSON

[```https://tie.digitraffic.fi/api/counting-site/v1/counters```](https://tie.digitraffic.fi/api/counting-site/v1/counters){:target="_blank"}

More metadata

[```https://tie.digitraffic.fi/api/counting-site/v1/directions```](https://tie.digitraffic.fi/api/counting-site/v1/directions){:target="_blank"}

[```https://tie.digitraffic.fi/api/counting-site/v1/domains```](https://tie.digitraffic.fi/api/counting-site/v1/domains){:target="_blank"}

[```https://tie.digitraffic.fi/api/counting-site/v1/user-types```](https://tie.digitraffic.fi/api/counting-site/v1/user-types){:target="_blank"}

Counting site values in json

[```https://tie.digitraffic.fi/api/counting-site/v1/values```](https://tie.digitraffic.fi/api/counting-site/v1/values){:target="_blank"}

Counting site values in CSV

[```https://tie.digitraffic.fi/api/counting-site/v1/values.csv```](https://tie.digitraffic.fi/api/counting-site/v1/values.csv){:target="_blank"}


## WebSocket API

TMC-data can be tracked from following Web Socket APIs. Protocol is MQTT over WebSockets. This allows
you to subscibe only those topics you are interested in.

Production address is wss://tie.digitraffic.fi:61619/mqtt

You must use SSL when connecting. Also, you need to use following credentials:
* userName: ```digitraffic```
* password: ```digitrafficPassword```

When using Paho JS-client the address is plain ```tie.digitraffic.fi``` and port ```61619```, see example below.  

Address for test is ```tie-test.digitraffic.fi``` and port is ```443```.

### Topics

You can replace ```<id>```-part in topic with ```#```-character to listen all messages. E.g.. ```tms/#```

Topics are constructed like shown below.

#### Current data from TMS stations 

- ```tms/<roadStationId>/<sensorId>```
- ```tms/status```

##### TMS station sensor measurement message

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

#### Current data of road weather stations

- ```weather/<roadStationId>/<sensorId>```
- ```weather/status```

##### Weather station sensor measurement message

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

#### Road maintenance information of latest location

- ```maintenance/tracking/#```
- ```maintenance/tracking/<trackingId>```
- ```maintenance/tracking/status```

##### Road maintenance tracking message

```
{
  "type": "Feature",
  "properties": {
    "id": 247694,
    "time": "2020-06-08T13:23:52Z",
    "tasks": [
      "PAVING"
    ],
    "direction": 72
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      25.689415,
      62.598124,
      0
    ]
  }
}
```

#### A simple JavaScript Web Socket client
The code below refers to the missing variable **clientName**. Initialize it with the name of your application.

**Note!** If your application is not constantly fetching data, close the connection by calling client.disconnect().)  
The example code disconnects after 30 s.
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

            // enter a valid client name to fix the syntax error
            client = new Paho.MQTT.Client("tie.digitraffic.fi", 61619, clientName);

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
        
        function disconnect() {
            client.disconnect();
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
        
        // disconnect after 30 seconds
        setTimeout(disconnect, 30000);
    </script>
</head>
<body>
Messages (<span id="messagesPerMinute">&lt;counting&gt;</span> messages per minute):
<div class="messages" />
</body>
</html>
```

## Restrictions

See [Information and instructions for using APIs > General considerations](/en/instructions/#general-considerations)

## Outdated and deprecated APIs

### ~~Current journey times~~

NOTE! This information is not updated. The old journey time system has been shut down in the end of 2017.

Old history data can be downloaded from the following [link](https://tie.digitraffic.fi/api/v1/data/fluency-history/list.html){:target="_blank"}.

### ~~Current free flow speeds~~

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/23001){:target="_blank"}

Response message contains currently valid free flow speeds.

Message is updated once a day and it ready be loaded after 6:00 AM EET. The actual data is updated much less frequently.

This api will be deprecated at some point and the same information can be read from [Current data from TMS stations](#current-data-from-tms-stations) -metadata-api.

Related metadata:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

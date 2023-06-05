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


<h2 id="sisältö">Contents</h2>

* Do not remove this line (it will not be displayed)
{:toc}


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

### Restrictions

See [Information and instructions for using APIs > General considerations](/en/support/instructions/#general-considerations)

### Supported and deprecated APIs

Listings of supported and deprecated APIs can be found [here](/en/api-status/changes/).



## REST/JSON -APIs

### Swagger descriptions of APIs 

Full API descriptions can be found in [Swagger-documentation]{:target="_blank"}

There you can find more detailed information about the available parameters of the APIs.

### Weather cameras

#### Simplified and detailed information of stations

[```/api/weathercam/v1/stations```](https://tie.digitraffic.fi/api/weathercam/v1/stations){:target="_blank"}\
[```/api/weathercam/v1/stations/{id}```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507){:target="_blank"}

You should check from the station metadata at the least field below to make sure the camera or preset is in collection.
- Camera fields ```state``` and ```collectionStatus```
- Preset field ```inCollection```

Response message contains weather camera information and URL for the camera image. For example preset image C0450701 is located at
[https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.

#### Data for all stations and for single station

[```/api/weathercam/v1/stations/data```](https://tie.digitraffic.fi/api/weathercam/v1/stations/data){:target="_blank"}\
[```/api/weathercam/v1/stations/{id}/data```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/data){:target="_blank"}

Weather camera images are updated approximately about every 10 minutes.

![Weather camera image C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

### Weather camera image history for the last 24 hours

[```/api/weathercam/v1/stations/{camraId}/history```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/history){:target="_blank"}\
[```/api/weathercam/v1/stations/{presetId}/history```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C0450701/history){:target="_blank"}

API call returns links to history images for last 24 hours. 

### Current data of road weather stations

#### Simplified and detailed information of stations

[```/api/weather/v1/stations```](https://tie.digitraffic.fi/api/weather/v1/stations){:target="_blank"}\
[```/api/weather/v1/stations/{id}```](https://tie.digitraffic.fi/api/weather/v1/stations/1012){:target="_blank"}

#### Available sensors information

[```/api/weather/v1/sensors```](https://tie.digitraffic.fi/api/weather/v1/sensors){:target="_blank"}

#### Data for all stations and for single station

[```/api/weather/v1/stations/data```](https://tie.digitraffic.fi/api/weather/v1/stations/data){:target="_blank"}\
[```/api/weather/v1/stations/{id}/data```](https://tie.digitraffic.fi/api/weather/v1/stations/1012/data){:target="_blank"}

Response message contains latest weather measurement data.

Data is updated almost in real time but information is cached. Actual update interval is one minute.
Real time data can be read from WebSocket.

#### Sensor history for the last 24 hours (Beta)

Sensor history from the weather road station can be fetched by API call:

[```/api/beta/weather-history-data/{stationId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057){:target="_blank"}

Single sensor history can be fetched by API call:

[```/api/beta/weather-history-data/{stationId}/{sensorId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057/1){:target="_blank"}

Time interval can be adjusted with from={ISO 8061 -time} and to={ISO 8061 -time} parameters.

History for the last 24 hours is currently only in beta-API.


### Current road weather forecasts

#### Detailed ja simpler forecast road sections

[```/api/weather/v1/forecast-sections```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections){:target="_blank"}\
[```/api/weather/v1/forecast-sections/{id}```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/00003_101_00000_1_0){:target="_blank"}\
[```/api/weather/v1/forecast-sections?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

[```/api/weather/v1/forecast-sections-simple```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple/{id}```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/00003_101_000_0){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

Forecast sections are normally updated once a year.

#### Forecasts of the forecast sections

[```/api/weather/v1/forecast-sections/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections/{id}/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/00003_101_00000_1_0/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections/forecasts?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/forecasts?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

[```/api/weather/v1/forecast-sections-simple/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple/{id}/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/00003_101_000_0/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple/forecasts?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/forecasts?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

Message contains road sections weather forecasts. Reports are updated every five minutes.


### Traffic measurement system (TMS)

#### Documentation

The [TMS documentation](lam) contains descriptions of TMS data.

#### Simplified and detailed information of stations

[```/api/tms/v1/stations```](https://tie.digitraffic.fi/api/tms/v1/stations){:target="_blank"}\
[```/api/tms/v1/stations/{id}```](https://tie.digitraffic.fi/api/tms/v1/stations/23001){:target="_blank"}\
[```/api/tms/v1/stations/{id}/sensor-constants```](https://tie.digitraffic.fi/api/tms/v1/stations/23001/sensor-constants){:target="_blank"}

#### Available computational sensors information

[```/api/tms/v1/sensors```](https://tie.digitraffic.fi/api/tms/v1/sensors){:target="_blank"}

#### Data for all stations and for single station

[```/api/tms/v1/stations/data```](https://tie.digitraffic.fi/api/tms/v1/stations/data){:target="_blank"}\
[```/api/tms/v1/stations/{id}/data```](https://tie.digitraffic.fi/api/tms/v1/stations/23001/data){:target="_blank"}

Response message contains TMS (Traffic Measurement System)–stations measurement data.

Every TMS station provides information about current computational sensor values.

Data is updated almost in real time but information is cached. Actual update interval is one minute.
Real time data can be read from WebSocket.

#### Statistics

Statistics web form can be used to search reports from tms-stations.

Web form to search for statistics can be found at [https://tie.digitraffic.fi/ui/tms/history/](https://tie.digitraffic.fi/ui/tms/history/){:target="_blank"}.

#### Raw data

Measurement data can also be found in raw-format and more information is provided [here](lam/#tms-raw-data)


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

* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK){:target="_blank"}
* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Traffic messages Simpele JSON -APIs

* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK){:target="_blank"}
* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION){:target="_blank"}

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
* Geometry with ALERT-C location code 27: [```/api/traffic-message/v1/area-geometries/27?lastUpdated=false```](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries/27?includeGeometry=true){:target="_blank"}
* All geometries: [```/api/traffic-message/v1/area-geometries?lastUpdated=false```](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries?lastUpdated=false){:target="_blank"}


### TMC/ALERT-C location data

TMC/ALERT-C material contains location data which is used in Traffic information such as road works, accidents, traffic jams and weather. 
More information can be found at [TMC Data](tmc-data) -page.

[```/api/traffic-message/v1/locations/versions```](https://tie.digitraffic.fi/api/traffic-message/v1/locations/versions){:target="_blank"}\
[```/api/traffic-message/v1/locations/types```](https://tie.digitraffic.fi/api/traffic-message/v1/locations/types){:target="_blank"}\
[```/api/traffic-message/v1/locations```](https://tie.digitraffic.fi/api/traffic-message/v1/locations){:target="_blank"}\
[```/api/traffic-message/v1/locations/{id}```](https://tie.digitraffic.fi/api/traffic-message/v1/locations/35){:target="_blank"}


### Variable signs

[```/api/variable-sign/v1/signs```](https://tie.digitraffic.fi/api/variable-sign/v1/signs){:target="_blank"}\
[```/api/variable-sign/v1/signs/{id}```](https://tie.digitraffic.fi/api/variable-sign/v1/signs/KRM01V102){:target="_blank"}\
[```/api/variable-sign/v1/signs/history```](https://tie.digitraffic.fi/api/variable-sign/v1/signs/history?deviceId=KRM01V102){:target="_blank"}

Response message contains latest variable sign data.  Currenty supported sign types are speed limits and warnings. Digitraffic publishes the data only from the master device of a device group. Data from slave devices on the left side of the road or on ramps is not available.

Warning sign types(in Finnish):

[```/api/variable-sign/v1/signs/code-descriptions```](https://tie.digitraffic.fi/api/variable-sign/v1/signs/code-descriptions){:target="_blank"}

Warning sign images:

[```https://vayla.fi/tieverkko/liikennemerkit```](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}

Data is also available in datex2-format:

[```/api/variable-sign/v1/signs.datex2```](https://tie.digitraffic.fi/api/variable-sign/v1/signs.datex2){:target="_blank"}\

Warnings text can contain sign symbols enclosed with []. It is possible to render those in svg-format:

[```/api/variable-sign/v1/images/ramppi_{number}```](https://tie.digitraffic.fi/api/variable-sign/v1/images/ramppi_123){:target="_blank"}\
[```/api/v1/variable-signs/images/tie_{number}```](https://tie.digitraffic.fi/api/variable-sign/v1/images/tie_321){:target="_blank"}

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

[```/api/maintenance/v1/tracking/domains```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/domains){:target="_blank"}

#### Vehicle task types

The API returns more detailed explanations of the tasks performed by the vehicles.

[```/api/maintenance/v1/tracking/tasks```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/tasks){:target="_blank"}

#### Vehicle tracking data

The API returns the route taken by the vehicle. The route does not fully correspond to the road route of the vehicle,
because the route to be published is formed by combining the location information from the vehicle into a line and
separate routing to the road network is not done. The route can also be a point if no more waypoints have been obtained from the vehicle.

A new tracking object is created whenever:
- the task performed by the vehicle changes
- the interval between two consecutive received position messages is more than 5 minutes
- the calculated driving speed between two consecutive received position messages is more than 140 km/h

These treatments eliminate the largest possible errors in the data generated by the vehicles.

[```/api/maintenance/v1/tracking/routes?domain=state-roads```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes?domain=state-roads){:target="_blank"}

#### Vehicle latest location

[```/api/maintenance/v1/tracking/routes/latest?domain=state-roads```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes/latest?domain=state-roads){:target="_blank"}

The API returns the latest location and task information received from the maintenance vehicles.


### Walking and cycling counting site values

Walking and cycling counting site values are currently received from Oulu region.

#### All counters in GeoJSON

[```/api/counting-site/v1/counters```](https://tie.digitraffic.fi/api/counting-site/v1/counters){:target="_blank"}

#### More metadata

[```/api/counting-site/v1/directions```](https://tie.digitraffic.fi/api/counting-site/v1/directions){:target="_blank"}

[```/api/counting-site/v1/domains```](https://tie.digitraffic.fi/api/counting-site/v1/domains){:target="_blank"}

[```/api/counting-site/v1/user-types```](https://tie.digitraffic.fi/api/counting-site/v1/user-types){:target="_blank"}

#### Counting site values in json

[```/api/counting-site/v1/values```](https://tie.digitraffic.fi/api/counting-site/v1/values){:target="_blank"}

#### Counting site values in CSV

[```/api/counting-site/v1/values.csv```](https://tie.digitraffic.fi/api/counting-site/v1/values.csv){:target="_blank"}


## MQTT WebSocket APIs

TMC-data can be tracked from following Web Socket APIs. Protocol is MQTT over WebSockets. This allows
you to subscibe only those topics you are interested in.

Production address is ```wss://tie.digitraffic.fi:443/mqtt```.

You must use SSL when connecting. 

When using Paho JS-client the address is plain ```tie.digitraffic.fi``` and port ```443```, see example below.  

Address for test is ```tie-test.digitraffic.fi```.

Simple example client can be found at [Support > MQTT examples](/en/support/script-mqtt/) page.

### Topics

At the root of each offered data type is also the topic `status`. The message tells when the data is last updated in epoch seconds. E.g.:
```
status: {
  "updated" : 1676628995
}
```

You can replace ```<id>```-part in topic with ```#```-character to listen all messages. E.g.. ```tms-v2/#```

Topics are constructed like shown below.


#### Current data of road weather stations

- ```weather-v2/<roadStationId>/<sensorId>```
- ```weather-v2/status```

##### Weather station sensor measurement message

```
{
    "value":11068,
    "time":1667973021
}
```


#### Current data from TMS stations 

- ```tms-v2/<roadStationId>/<sensorId>```
- ```tms-v2/status```

##### TMS station sensor measurement message

```
{
    "value":108,
    "time":1667972911,
    "start":1667966400,
    "end":1667970000
}
```


#### Traffic messages

- ```traffic-message-v2/datex2/<situationType>``` Message payload is in Datex2 XML format.
- ```traffic-message-v2/simple/<situationType>``` Message payload is in simple JSON that is gzipped and base64-coded

Possible values for situationType are: `TRAFFIC_ANNOUNCEMENT`, `EXEMPTED_TRANSPORT`, `WEIGHT_RESTRICTION`, `ROAD_WORK`

Example simple JSON gzipped and base64-coded value: `H4sIAAAAAAAAAO1VS27bMBDd5xSE1rZCfWI7XtWIk9ZtqgSN0wBpg4KR6JiVRAokFSAIvOtRfIZeQBfrSKJs+RcUXXfjD+dx5s0bzszrEUKWfsmohYbIuqBE55JanfL0iYqUavlSWl7hoA28FozrCganoRAyYpxoqkrjN+Se2J6P+7jXQT3Hdr2ed9JHDwBeVI4zKTIqNavhxrViOieaCT6JqgjvbyfjE+zjUw97TaAVZtrwmH4ZXVxMzn6MguDqNjg7/3weTBu0lmQ2Y+GIc5HzkKaU69W982B8Pm6Az1QqcFoaTs2RpAklik5ZWuNd7Hpd7HRdf4oHQ9cdYs8eDNz7LRd78adDDw+9no29/gpPWqSMaLUOYEsIf8rJk6nIxFwpE2I6MWkzily/g0aKxTFJiI0uGYsp5xRUjYSmSJS/tUjzPKJKA2DKwC8Hw5zZaO0zEWGl6LoSpqQ5h9KfiagK2OusTc2NKXlMaJCnj1SWEKd/CPN1La/l2I5j+57VwgK/ULKsIWFyQ8/FMmFJUizRJZlrhrroY7FMVbFsZf0dAsiYphlDGSnPhugavgkkjCZKdItfjLPiN3I6LorTDlI5ZEUIRzckATXSYhkz2zJUFjuajKkmLFFb0khBolEUSarU5V7xqhfOUiJf6i7ZMoI5zTkLWUYSpqvuspqMWroYP+KZwTOpe65Ysp/FUnc/gBB0G2oqViFvcpGybUCL9y4lYy8N8K72mW5o2KQ62AFEDCQ3PD3P7W3YF1tESALNf3ZIu40KNO/P9Qe9naCcmGZrldp6k5rj+v1Naq1/GzQtRUPBo/813CfOP9ewf7iGrY58u4Y+Phn8ZQ0jJtcJW7fBp+DqLrCOti+uG39Wrz8zkB9W56V2d0LG13PYCTtWDUN/xKNxLvdNUmAu9aE9gocY37eHIeXR4R3iuLbnePe7A4tEEStDk2TCZ0KmKx5Wsxa66CdBMYXHWu0HBPsqFkrBwJxrnanh8XGyWiDVnrBn8OzrBQo/j9cLQwHFeuJbFysIbBfaOIipinOFpiSFJU9rsotGLnjiMIHDjYaysrngdcrYxdh1MF6HoymM4Mqma4f2Zpx3GzxNNBMrIprcZvBJ3xDVx5Wgi6PFH4BXin4LCQAA`
You can test decompressing it i.e. at [https://facia.dev/tools/compress-decompress/gzip-decompress/](https://facia.dev/tools/compress-decompress/gzip-decompress/)

Or with command line
* Linux: `echo "<message>" | base64 -d | gzip -d`
* MacOS: `echo "<message>" | base64 -d -i - -o - | gzip -d`

And code to decompress message with browser and JS can be found at [JSFiddle](https://jsfiddle.net/jouniso/ab2x3kzd/latest/).


#### Road maintenance information of latest location

- ```maintenance-v2/routes/<domain>```
- ```maintenance-v2/status```

Allowed domain values are `state-roads`, `autori-kuopio`, `autori-oulu` and `paikannin-kuopio`.


##### Road maintenance tracking message

```
{
    "time":1668157878,
    "source":"Harja/Väylävirasto",
    "tasks":[
        "MAINTENANCE_OF_GUIDE_SIGNS_AND_REFLECTOR_POSTS"
    ],
    "x":22.031937,
    "y":62.567092
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
            client = new Paho.MQTT.Client("tie.digitraffic.fi", 443, clientName);

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
                onFailure: onConnectFailure,
                mqttVersion:4,
                useSSL:true
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
            client.subscribe("tms-v2/#");
        }
        
        function onConnectFailure(response) {
            console.info(Date.now() + ' Connection failed .' + response.errorCode + ": " + response.errorMessage);
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

[Swagger-documentation]: https://tie.digitraffic.fi/swagger/
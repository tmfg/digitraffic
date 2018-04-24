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
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html#/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api"]
---

Road traffic information is gathered from the Finnish Transport Agency (FTA) and The Centers for Economic Development, Transport and the Environment (ELY Centers) systems.
Currently the open data API includes:

- TMS data (Traffic Measurement System). Information is gathered from an inductive loop which is installed inside the pavement. When a vehicle passes over the loop it creates information about average speeds and traffic amounts. Currently, there are over 450 traffic measuring stations in Finland.

- Current free flow speeds. Data is updated once a day.

- Traffic disorders. Road traffic center provides information about traffic accidents and other disorders like road works. Messages are available in Datex2 format.

- Road weather station data. The road weather stations measure e.g. temperature, wind, rain, relative humidity and dew point.  Data is updated once per minute. Currently, there are over 350 road weather stations on the Finnish road network.

- Road weather forecasts. Content is updated every five minutes.

- Road weather cameras. Cameras provide information on current traffic flow and weather conditions. Currently, there are over 470 road weather cameras.

- Metadata for all services is updated twice per day.

# Content
- [REST/JSON -APIs](#restjson-apis)
    - [Road weather cameras](#road-weather-cameras)
    - [Current journey times](#current-journey-times)
    - [History data for previous day](#history-data-for-previous-day)
    - [History data for requested month](#history-data-for-requested-month)
    - [Current free flow speeds](#current-free-flow-speeds)
    - [Current road weather forecasts](#current-road-weather-forecasts)
    - [Current data from LAM stations](#current-data-from-lam-stations)
    - [Traffic disorders](#traffic-disorders)
    - [Status of road weather stations](#status-of-road-weather-stations)
- [Swagger-documentation](#swagger-api)

## REST/JSON -APIs

Full API description is located in [Swagger-documentation](https://tie.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html){:target="_blank"}

### Road weather cameras

[```http://tie.digitraffic.fi/api/v1/data/camera-data```](http://tie.digitraffic.fi/api/v1/data/camera-data)

[```http://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](http://tie.digitraffic.fi/api/v1/data/camera-data/{id})

Response message contains weather camera information and URL for the camera image. For example preset image C0150200 is located in [http://weathercam.digitraffic.fi/C0150200.jpg](http://weathercam.digitraffic.fi/C0150200.jpg).

![Weather camera image C0150200](https://weathercam.digitraffic.fi/C0150200.jpg)

### Current journey times

NOTE! This information is not updated. The old journey time system has been shut down in the end of 2017.

### History data for previous day 

NOTE! This information is not available

### History data for requested month
[```http://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month}```](http://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month})

Response message contains history data for requested month.

NOTE! Last history data is from 12/2017.

### Current free flow speeds

[```http://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds)

[```http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/link/{id}```](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/link/{id})

[```http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id})

Response message contains currently valid free flow speeds. The free flow speeds are changed when the summer and winter speed limits are activated on the road network.

Message is updated once a day (3:30 AM EET).

### Current road weather forecasts

[```http://tie.digitraffic.fi/api/v1/data/road-conditions```](http://tie.digitraffic.fi/api/v1/data/road-conditions)

Response message contains road specific weather forecasts. Reports are updated every 5 minutes.

### Current data from LAM stations

[```http://tie.digitraffic.fi/api/v1/data/tms-data```](http://tie.digitraffic.fi/api/v1/data/tms-data)

[```http://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](http://tie.digitraffic.fi/api/v1/data/tms-data/{id})

[```ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata```](ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata)

[```ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id}```](ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id})

Response message contains TMS (Traffic Measurement System)–stations measurement data.

Every TMS station provides information about traffic amounts and measured average speeds.

Data is updated almost in real time but information is cached. Actual update interval is one minute. 

Simple JavaScript Web Socket - client application:
```
<html>
     <head>
         <title>Testiclient for lam sensor values</title>
         <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js" ></script>
         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.0.3/sockjs.min.js"></script>

         <script>
             function connect() {
                 var url = "ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata";
                 var socket = new WebSocket(url);
                 socket.onopen = function (event) {
                     console.info('Socket is open');
                 }
                 socket.onmessage = function(message) {
                     addMessage(message);
                 };
             }
             function addMessage(message) {
                 var text = convert(message);
                 $(".messages").append(text);
                 $(".messages").append('\n');
             }
             function convert(message) {
                 return JSON.stringify(JSON.parse(message.data));
             }
             connect();
         </script>
     </head>
     <body>
         <b>All messages:</b>
         <pre class="messages"></pre>
     </body>
 </html>
```

### Traffic disorders

[```http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex```](http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2)

[```http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}```](http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month})

[```http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}```](http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId})

Response message contains traffic disorders those have significant impact on traffic flow, e.g. traffic accidents and temporary traffic rearrangements. 

Disorders contain TMC location information to identify occurence area or location of the disorder.

[```http://tie.digitraffic.fi/api/v1/metadata/locations```](http://tie.digitraffic.fi/api/v1/metadata/locations)

### Status of road weather stations

[```http://tie.digitraffic.fi/api/v1/data/weather-data```](http://tie.digitraffic.fi/api/v1/data/weather-data)

[```http://tie.digitraffic.fi/api/v1/data/weather-data/{id}```](http://tie.digitraffic.fi/api/v1/data/weather-data/{id})

Response message contains latest weather measurement data.

Data is updated almost in real time but information is cached. Actual update interval is one minute.
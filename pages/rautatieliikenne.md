---
layout: traffictype
permalink: /rautatieliikenne/
swagger-source: https://rata.digitraffic.fi/swagger/swagger.json
data: rail
hero-image: rail
title: Rautatieliikenne tietolähteet
intro: Rautatieliikenteen avoimen datan, rajapintojen sekä lähdekoodin tietolähteet.
links:
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-dokumentaatio", "http://tie.digitraffic.fi/api/v1/data/documentation/swagger-ui.html#/data"]
  - ["http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data"]
---

Rautatieliikenteen avoimet rajapinnat on julkaistu rata.digitraffic.fi -palvelussa. Tiedot tarjotaan REST/JSON -rajapintojen kautta. Junien kulkutietoviestit ovat saatavissa myös websocket-yhteyden kautta.  
   ‍       
Tämän avoimen rajapinnan tarkoituksena on jakaa tietoa Suomen rataverkolla kulkevien junien aikatauluista, sijainneista, kokoonpanoista sekä täsmällisyystiedoista. Palvelun omistaa Liikennevirasto ja tietolähteenä toimii Liikenneviraston ratakapasiteetin ja liikenteenohjauksen Liike-perheen sovellukset.

### Swagger API-documentation and sandbox for testing data APIs

[http://tie.digitraffic.fi/api/v1/data/documentation/swagger-ui.html#/data](http://tie.digitraffic.fi/api/v1/data/documentation/swagger-ui.html#/data)

### Current data of cameras

[http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data](http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data)

[http://tie.digitraffic.fi/api/v1/data/camera-data/{id}](http://tie.digitraffic.fi/api/v1/data/camera-data/{id})

The message contains all public camera presets including url where you can find the camera pictures. For example image for camera preset C0150200 can be found at [http://weathercam.digitraffic.fi/C0150200.jpg].

### Current fluency data of links including journey times

[http://tie.digitraffic.fi/api/v1/data/fluency-current](http://tie.digitraffic.fi/api/v1/data/fluency-current)

[http://tie.digitraffic.fi/api/v1/data/fluency-current/{id}](http://tie.digitraffic.fi/api/v1/data/fluency-current/{id})

Only links of Helsinki Metropolitan Area are measured. Link numbers are 1 to 3 digits long and under 1000 for Helsinki Metropolitan Area.

The message contains for each link the latest 5 minute median, corresponding average speed, fluency class, and timestamp of the latest update.

The message is updates each time we receive new median data from MTP. Normally this is once per minute. If MTP does not send us new data, the message is not updated.

### History data of links for previous day

[http://tie.digitraffic.fi/api/v1/data/fluency-history-previous-day](http://tie.digitraffic.fi/api/v1/data/fluency-history-previous-day)

[http://tie.digitraffic.fi/api/v1/data/fluency-history-previous-day/{id}](http://tie.digitraffic.fi/api/v1/data/fluency-history-previous-day/{id})

Only links of Helsinki Metropolitan Area are measured. Link numbers are 1 to 3 digits long and under 1000 for Helsinki Metropolitan Area.

The message contains for each link all the median data from the previous day: median travel time, average speed and fluency class. The message contains all the available medians for each link, so there are (at most) 1440 medians per each link.

A batch process updates the messages once each day. The updated message is available at 02:30 Finnish time each night.

Due to the large size of the message, it must not be retrieved more than once per each day.

### History data of link for given month

[http://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month}](http://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month})

Only links of Helsinki Metropolitan Area are measured. Link numbers are 1 to 3 digits long and under 1000 for Helsinki Metropolitan Area.

The message contains history data for given link from the begining to the end of the given month.

### Current free flow speeds

[http://tie.digitraffic.fi/api/v1/data/free-flow-speeds}](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds})

[http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/link/{id}](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/link/{id})

[http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id})
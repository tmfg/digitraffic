---
layout: traffictype
permalink: /meriliikenne/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
swagger-source: https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api
hero-image: icebreaker
title: Meriliikenne
intro: Avointa dataa Suomen meriltä ja järviltä.
links:
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html#/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api"]
---

Meriliikenteen tiedot syntyvät Liikenneviraston operoimissa ammattimerenkulun tietojärjestelmissä. Avoimet meriliikenteen tiedot sisältävät tällä hetkellä:

- Merivaroitustiedot. Merivaroitustietojen avulla voidaan hakea voimassa olevat kauppamerenkulun väylien turvalaitepoikkeamat sekä voimassa olevat merivaroitukset.

- Satamien aikataulutiedot. Portnet-järjestelmästä saatavien Suomen satamien aikataulutietojen kautta voidaan hakea kauppamerenkulun alusten satamatietoja

- Alusten sijaintitiedot. AIS (Automatic Identification System) on alusten tunnistamiseen ja sijainnin määrittämiseen käytetty järjestelmä.

- Alusten ja satamien metatiedot

# Sisältö
- [REST/JSON-rajapinnat](#restjson-rajapinnat)
- [WebSocket-rajapinnat](#websocket-rajapinnat)
    - [Kaikkien laivojen seuraaminen](#kaikkien-laivojen-seuraaminen)
    - [Yhden laivan seuraaminen mmsi:n perusteella](#yhden-laivan-seuraaminen-mmsin-perusteella)
    - [Aluksen metadata-viesti](#aluksen-metadata-viesti)
    - [Aluksen sijainti-viesti](#aluksen-sijainti-viesti)
    - [Yksinkertainen JavaScript WebSocket -clientti](#yksinkertainen-javascript-websocket--clientti)
- [Swagger-rajapintakuvaus](#swagger-rajapintakuvaus)

## REST/JSON-rajapinnat

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta](https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html)

Sekä metadataa että dataa päivitetään reaaliaikaisesti.

## WebSocket-rajapinnat

Laivojen sijainteja voi kuunnella WebSocket-rajapinnoista:

#### Kaikkien laivojen seuraaminen

``` ws://meri.digitraffic.fi/api/v1/plain-websockets/locations ```

#### Yhden laivan seuraaminen mmsi:n perusteella

``` ws://meri.digitraffic.fi/api/v1/plain-websockets/locations/{mmsi} ```

Viestit ovat muotoa:

#### Aluksen metadata-viesti

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

#### Aluksen sijainti-viesti

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

#### Yksinkertainen JavaScript WebSocket -clientti

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
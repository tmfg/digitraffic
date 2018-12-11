---
layout: traffictype
permalink: /meriliikenne/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
swagger-source: https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api
hero-image: icebreaker
lang: fi
ref: marine-traffic
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
    - [Topicit](#topicit)
    - [Kaiken mahdollisen datan tilaaminen](#kaiken-mahdollisen-datan-tilaaminen)
    - [Kaikkien laivojen sìjainnit](#kaikkien-laivojen-sìjainnit)
    - [Yhden laivan seuraaminen mmsi:n perusteella](#yhden-laivan-seuraaminen-mmsin-perusteella)
    - [Aluksen metadata-viesti](#aluksen-metadata-viesti)
    - [Aluksen sijainti-viesti](#aluksen-sijainti-viesti)
    - [Yksinkertainen JavaScript WebSocket -clientti](#yksinkertainen-javascript-websocket--clientti)
- [Swagger-rajapintakuvaus](#swagger-api)

## REST/JSON-rajapinnat

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta](https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html){:target="_blank"}

Sekä metadataa että dataa päivitetään reaaliaikaisesti.

## WebSocket-rajapinnat

Laivojen sijainteja voi kuunnella WebSocket-rajapinnoista.  Käytetty protokolla on MQTT over WebSockets, joka mahdollistaa
ainoastaan haluttujen tietojen vastaanoton topicien avulla.

Tuotannon osoite on wss://meri.digitraffic.fi:61619/mqtt

Pahon JS-clientia käyttäessä osoite on pelkkä meri.digitraffic.fi ja portti 61619, esimerkki alempana.

Testin osoite vastaavasti meri-test.digitraffic.fi

#### Topicit

Topicit ovat seuraavanlaista muotoa:
- vessels/\<mmsi\>/metadata
- vessels/\<mmsi\>/locations
- vessels/status

Alla esimerkkejä mahdollisista tilauksista:

#### Kaiken mahdollisen datan tilaaminen

``` vessels/# ```

#### Kaikkien laivojen sìjainnit

``` vessels/+/locations ```

#### Yhden laivan seuraaminen mmsi:n perusteella

``` 
    vessels/<mmsi>/+          # yhden laivan sijainnit ja metadata
    vessels/<mmsi>/locations  # yhden laivan sijainnit
  ```

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

#### Yksinkertainen JavaScript WebSocket -client

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
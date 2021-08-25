---
layout: traffictype
permalink: /meriliikenne/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
swagger-source: https://meri.digitraffic.fi/swagger/swagger-spec.json
swagger-link: https://meri.digitraffic.fi/swagger/
hero-image: icebreaker
lang: fi
ref: marine-traffic
title: Meriliikenne
intro: Avointa dataa Suomen meriltä ja järviltä.
links:
  - ["Väylävirasto", "https://vayla.fi"]
  - ["Fintraffic", "https://fintraffic.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/swagger/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/swagger/swagger-spec.json"]
---

## Yleistä tietoa

Meriliikenteen tiedot syntyvät VTS Finlandin ja Väyläviraston operoimissa ammattimerenkulun tietojärjestelmissä. Avoimet meriliikenteen tiedot sisältävät tällä hetkellä:

- Merivaroitustiedot. Merivaroitustietojen avulla voidaan hakea voimassa olevat kauppamerenkulun väylien turvalaitepoikkeamat sekä voimassa olevat merivaroitukset.

- Satamien aikataulutiedot. Portnet-järjestelmästä saatavien Suomen satamien aikataulutietojen kautta voidaan hakea kauppamerenkulun alusten satamatietoja

- Alusten sijaintitiedot. AIS (Automatic Identification System) on alusten tunnistamiseen ja sijainnin määrittämiseen käytetty järjestelmä. [Lisätietoa](ais).

- Talvimerenkulun avustustiedot Baltice-järjestelmästä

- Meren tilan arviointi dataa älypoijuilta 

- Vesiliikenteen häiriötiedot

- Näihin liittyvät metatiedot


<h2 id="sisältö">Sisältö</h2>

* Do not remove this line (it will not be displayed)
{:toc}


## REST/JSON-rajapinnat

### Rajapintojen Swagger-kuvaukset

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta]({{page.swagger-link}}){:target="_blank"}

### Merivaroitukset

[```https://meri.digitraffic.fi/api/v1/nautical-warnings/published```](https://meri.digitraffic.fi/api/v1/nautical-warnings/published){:target="_blank"}

Merivaroitukset haetaan POOKI-järjestelmästä.

Merivaroituksiin liittyvää metadataa ei ole digitrafficista saatavilla.

### Satamakäynnit

[```https://meri.digitraffic.fi/api/v1/port-calls```](https://meri.digitraffic.fi/api/v1/port-calls){:target="_blank"}

Satamakäynnit haetaan [Portnet](https://www.traficom.fi/fi/liikenne/merenkulku/portnet){:target="_blank"} -järjestelmästä.

Metadatat:

[```https://meri.digitraffic.fi/api/v1/metadata/locations```](https://meri.digitraffic.fi/api/v1/metadata/locations){:target="_blank"}

[```https://meri.digitraffic.fi/api/v1/metadata/vessel-details```](https://meri.digitraffic.fi/api/v1/metadata/vessel-details){:target="_blank"}

[```https://meri.digitraffic.fi/api/v1/metadata/code-descriptions```](https://meri.digitraffic.fi/api/v1/metadata/code-descriptions){:target="_blank"}

### Alusten sijaintitiedot

[```https://meri.digitraffic.fi/api/v1/locations/latest```](https://meri.digitraffic.fi/api/v1/locations/latest){:target="_blank"}

Alusten sijaintitiedot ja metatiedot kerätään laivojen lähettämien AIS-viestien perusteella. ([Lisätietoa](ais)).

Metadatat:

[```https://meri.digitraffic.fi/api/v1/metadata/vessels```](https://meri.digitraffic.fi/api/v1/metadata/vessels){:target="_blank"}

### Talvimerenkulun avustustiedot

[```https://meri.digitraffic.fi/api/v1/winter-navigation/dirways```](https://meri.digitraffic.fi/api/v1/winter-navigation/dirways){:target="_blank"}

Avustustiedot haetaan [Baltice](http://baltice.org){:target="_blank"} -järjestelmästä.

Metadatat:

[```https://meri.digitraffic.fi/api/v1/winter-navigation/ports```](https://meri.digitraffic.fi/api/v1/winter-navigation/ports){:target="_blank"}

[```https://meri.digitraffic.fi/api/v1/winter-navigation/ships```](https://meri.digitraffic.fi/api/v1/winter-navigation/ships){:target="_blank"}

### Meren tilan arviointi (SSE)

Data + metadata:

[```https://meri.digitraffic.fi/api/v1/sse/latest```](https://meri.digitraffic.fi/api/v1/sse/latest){:target="_blank"}

Meren tilan arviointi -data haetaan TLSC-järjestelmästä, joka kerää ja analysoi älypoijujen lähettämää dataa julkaistavaan muotoon.

Data päivitetään 30 minuutin välein.

### Vesiliikenteen häiriöt


[```https://meri.digitraffic.fi/api/v2/bridge-lock/disruptions```](https://meri.digitraffic.fi/api/v2/bridge-lock/disruptions){:target="_blank"}

Vesiliikenteen häiriöt haetaan POOKI-järjestelmästä.

Data päivitetään 10 minuutin välein.

## MQTT WebSocket -rajapinnat

Laivojen sijainteja ja älypoijudataa voi kuunnella WebSocket-rajapinnoista.  Käytetty protokolla on MQTT over WebSockets, joka mahdollistaa
ainoastaan haluttujen tietojen vastaanoton topicien avulla.

Tuotannon osoite on wss://meri.digitraffic.fi:61619/mqtt

Kirjautuessa tulee käyttää SSL-yhteyttä.  Lisäksi palveluun täytyy kirjautua seuraavin tiedoin:
* userName:digitraffic
* password:digitrafficPassword

Pahon JS-clientia käyttäessä osoite on pelkkä meri.digitraffic.fi ja portti 61619, esimerkki alempana.

Testin osoite vastaavasti meri-test.digitraffic.fi

### Topicit

#### Alusten topicit

Topicit ovat seuraavanlaista muotoa:

- ```vessels/<mmsi>/metadata```
- ```vessels/<mmsi>/locations```
- ```vessels/status```

#### Esimerkkejä alusten viestitilauksista

```
vessels/#                 # Kaiken mahdollisen datan tilaaminen
vessels/+/locations       # Kaikkien alusten sìjainnit
vessels/+/metadata        # Kaikkien alusten metadatat
vessels/<mmsi>/+          # Yhden aluksen sijainnit ja metadata
vessels/<mmsi>/locations  # Yhden aluksen sijainnit
vessels/<mmsi>/metadata n # Yhden aluksen metadata
```

#### Alusten viestimuodot

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

#### Aluksen sijainti -viesti

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

#### SSE topicit

Topicit ovat seuraavanlaista muotoa:

- ```sse/status```
- ```sse/site/<site-id>``` 

#### Esimerkkejä SSE-viestitilauksista

```
sse/#                       # Kaiken mahdollisen datan tilaaminen
sse/status                  # Status viestien tilaaminen
sse/site/+                  # Kaikkien asemien datan tilaaminen
sse/site/<site-id>          # Yhden aseman datan tilaaminen
```

#### SSE-data -viesti

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

#### Yksinkertainen JavaScript MQTT WebSocket -client

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

## Käyttörajoitukset

Katso [Ohjeita ja lisätietoa rajapintojen käyttöön > Yleistä huomioitavaa](/ohjeita/#yleistä-huomioitavaa)

---
layout: traffictype
permalink: /meriliikenne/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
swagger-source: https://meri.digitraffic.fi/swagger/openapi.json
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
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/swagger/openapi.json"]
---

## Yleistä tietoa

Meriliikenteen tiedot syntyvät VTS Finlandin ja Väyläviraston operoimissa ammattimerenkulun tietojärjestelmissä. Avoimet meriliikenteen tiedot sisältävät tällä hetkellä:

- Merivaroitustiedot. Merivaroitustietojen avulla voidaan hakea voimassa olevat kauppamerenkulun väylien turvalaitepoikkeamat sekä voimassa olevat merivaroitukset.

- Satamien aikataulutiedot. Portnet-järjestelmästä saatavien Suomen satamien aikataulutietojen kautta voidaan hakea kauppamerenkulun alusten satamatietoja

- Alusten sijaintitiedot. AIS (Automatic Identification System) on alusten tunnistamiseen ja sijainnin määrittämiseen käytetty järjestelmä. [Lisätietoa](ais).

- Talvimerenkulun avustustiedot Baltice-järjestelmästä

- Meren tilan arviointi dataa älypoijuilta 

- Vesiliikenteen häiriötiedot

- Turvalaiteviat

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

[```https://meri.digitraffic.fi/api/port-call/v1/port-calls```](https://meri.digitraffic.fi/api/port-call/v1/port-calls){:target="_blank"}

Satamakäynnit haetaan [Portnet](https://www.traficom.fi/fi/liikenne/merenkulku/portnet){:target="_blank"} -järjestelmästä.

Metadatat:

[```https://meri.digitraffic.fi/api/v1/metadata/locations```](https://meri.digitraffic.fi/api/v1/metadata/locations){:target="_blank"}

[```https://https://meri.digitraffic.fi/api/port-call/v1/vessel-details```](https://meri.digitraffic.fi/api/port-call/v1/vessel-details){:target="_blank"}

[```https://https://meri.digitraffic.fi/api/port-call/v1/code-descriptions```](https://meri.digitraffic.fi/api/port-call/v1/code-descriptions){:target="_blank"}

### AIS-tiedot

[```https://meri.digitraffic.fi/api/ais/v1/locations```](https://meri.digitraffic.fi/api/ais/v1/locations){:target="_blank"}

Alusten metadatat:

[```https://meri.digitraffic.fi/api/ais/v1/vessels```](https://meri.digitraffic.fi/api/ais/v1/vessels){:target="_blank"}

Alusten sijaintitiedot ja metatiedot kerätään laivojen lähettämien AIS-viestien perusteella. ([Lisätietoa](ais)).

### Talvimerenkulun avustustiedot

[```https://meri.digitraffic.fi/api/winter-navigation/v1/dirways```](https://meri.digitraffic.fi/api/winter-navigation/v1/dirways){:target="_blank"}

Avustustiedot haetaan [Baltice](http://baltice.org){:target="_blank"} -järjestelmästä.

Metadatat:

[```https://meri.digitraffic.fi/api/winter-navigation/v1/ports```](https://meri.digitraffic.fi/api/winter-navigation/v1/ports){:target="_blank"}

[```https://meri.digitraffic.fi/api/winter-navigation/v1/vessels```](https://meri.digitraffic.fi/api/winter-navigation/v1/vessels){:target="_blank"}

### Meren tilan arviointi (SSE)

Data + metadata:

[```https://meri.digitraffic.fi/api/sse/v1/measurements```](https://meri.digitraffic.fi/api/sse/v1/measurements){:target="_blank"}

Meren tilan arviointi -data haetaan TLSC-järjestelmästä, joka kerää ja analysoi älypoijujen lähettämää dataa julkaistavaan muotoon.

Data päivitetään 30 minuutin välein.

### Vesiliikenteen häiriöt

[```https://meri.digitraffic.fi/api/bridge-lock/v1/disruptions```](https://meri.digitraffic.fi/api/bridge-lock/v1/disruptions){:target="_blank"}

Vesiliikenteen häiriöt haetaan POOKI-järjestelmästä.

Data päivitetään 10 minuutin välein.

### Turvalaiteviat

[```https://meri.digitraffic.fi/api/aton/v1/faults```](https://meri.digitraffic.fi/api/aton/v1/faults){:target="_blank"}

Turvalaiteviat haetaan POOKI-järjestelmästä.

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

Jokaisen tarjottavan datalajin juuressa on myös topikki `status`. Viesti kertoo, milloin data on viimeksi päivittynyt epookki sekunteina. Esim.:
```
status: {
  "updated" : 1676628995
}
```


#### Alusten topicit

Topicit ovat seuraavanlaista muotoa:

- ```vessels-v2/<mmsi>/metadata```
- ```vessels-v2/<mmsi>/location```
- ```vessels-v2/status```

#### Esimerkkejä alusten viestitilauksista

```
vessels-v2/#                # Kaiken mahdollisen datan tilaaminen
vessels-v2/+/location       # Kaikkien alusten sìjainnit
vessels-v2/+/metadata       # Kaikkien alusten metadatat
vessels-v2/<mmsi>/+         # Yhden aluksen sijainnit ja metadata
vessels-v2/<mmsi>/location  # Yhden aluksen sijainnit
vessels-v2/<mmsi>/metadata  # Yhden aluksen metadata
```

#### Alusten viestimuodot

#### Aluksen metadata-viesti

```
{
    "timestamp":1668075026035,
    "destination":"UST LUGA",
    "name":"ARUNA CIHAN",
    "draught":68,
    "eta":733376,
    "posType":15,
    "refA":160,
    "refB":33,
    "refC":20,
    "refD":12,
    "callSign":"V7WW7",
    "imo":9543756,
    "type":70
}
```

#### Aluksen sijainti -viesti

```
{
    "time":1668075025,
    "sog":10.7,
    "cog":326.6,
    "navStat":0,
    "rot":0,
    "posAcc":true,
    "raim":false,
    "heading":325,
    "lon":20.345818,
    "lat":60.03802
}
```

#### SSE topicit

Topicit ovat seuraavanlaista muotoa:

- ```sse-v2/status```
- ```sse-v2/site/<site-id>``` 

#### Esimerkkejä SSE-viestitilauksista

```
sse-v2/#                       # Kaiken mahdollisen datan tilaaminen
sse-v2/status                  # Status viestien tilaaminen
sse-v2/site/+                  # Kaikkien asemien datan tilaaminen
sse-v2/site/<site-id>          # Yhden aseman datan tilaaminen
```

#### SSE-data -viesti

```
{
    "timestamp":1668085252,
    "seaState":"CALM",
    "trend":"NO_CHANGE",
    "windWaveDir":175,
    "confidence":"GOOD",
    "heelAngle":3,
    "lightStatus":"OFF",
    "temperature":10
}
```

#### Yksinkertainen JavaScript MQTT WebSocket -client
Alla olevassa koodissa viitataan puuttuvaan muuttujaan **clientName**, täydennä siihen sovelluksesi nimi.

**HUOM!** Mikäli et hae dataa jatkuvasti, sulje yhteys kutsumalla client.disconnect().  
Esimerkkikoodissa yhteys katkaistaan 30 s kuluttua.

```html
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

            // enter a valid client name to fix the syntax error
            client = new Paho.MQTT.Client("meri-test.digitraffic.fi", 61619, clientName);

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

        function disconnect() {
            client.disconnect();
        }

        function logMessageCount() {
            console.info(Date.now() + ' ' + messageCount + ' messages per minute');
            messageCount = 0;
        }

        function onConnect() {
            console.info(Date.now() + ' Connection open');

            client.subscribe("vessels-v2/#");
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
        
        // disconnect after 30 seconds
        setTimeout(disconnect, 30000);
    </script>
</head>
<body>
    Messages:
    <div class="messages" />
</body>
</html>
```

#### Yksinkertainen Python MQTT WebSocket -client

Vaihda `APP_NAME` muuttujan sisältö oman sovelluksesi nimi.

**HUOM!** Mikäli et hae dataa jatkuvasti, sulje yhteys kutsumalla `client.disconnect()`.  
Esimerkkikoodissa yhteys katkaistaan 30 s kuluttua.

```python
import uuid
import paho.mqtt.client as mqtt
import time

APP_NAME = 'Junamies/FoobarApp 1.0'

def on_message(client, userdata, message):
    print('message received', str(message.payload.decode('utf-8')))

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print('Connected')
        client.subscribe("vessels-v2/#")
    else:
        print('Failed to connect, return code %d\n', rc)

client_name = '{}; {}'.format(APP_NAME, str(uuid.uuid4()))
client = mqtt.Client(client_name, transport="websockets")

client.username_pw_set('digitraffic', 'digitrafficPassword')
client.on_connect = on_connect
client.on_message = on_message

client.tls_set()
client.connect('tie.digitraffic.fi', 61619)

client.loop_start()
time.sleep(30)
client.loop_stop()

client.disconnect()
```

## Käyttörajoitukset

Katso [Ohjeita ja lisätietoa rajapintojen käyttöön > Yleistä huomioitavaa](/ohjeita/#yleistä-huomioitavaa)

## Tuetut ja vanhentuneet rajapinnat

Tuettujen ja vanhentuneiden rajapintojen listaus löytyy [täältä](/rajapintojen-tila/muutokset/).

---
layout: traffictype
permalink: /tieliikenne/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api
hero-image: road
title: Tieliikenne
lang: fi
ref: road-traffic
intro: Avointa dataa Suomen tieverkolta.
links:
  - ["Väylä", "https://vayla.fi"]
  - ["Traffic Management Finland","https://tmfg.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html#/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api"]
---

Tieliikenteen tiedot syntyvät Traffic Management Finlandin hallinnoimissa tieliikenteen ohjaus- ja mittausjärjestelmissä.
Tieliikenteen avoimet tiedot sisältävät tällä hetkellä:

- LAM-mittaustiedot. Tiehen upotetulta induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista ajoneuvoluokittain. LAM-pisteitä on yli 450 kappaletta ympäri Suomea.

- Ajantasaiset vapaat nopeudet. Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille. Tiedot päivittyvät kerran vuorokaudessa.

- Tieliikenteen häiriötiedotteet. Tieliikennekeskuksista saatavat liikenteen ensi- ja muut häiriötiedotteet, tiedotteet tietöistä sekä kelirikkotilanteista. Viestit ovat saatavissa Datex2 formaatissa.

- Tieliikenteen painorajoitteet.  Viestit ovat saatavissa Datex2 formaatissa.

- Tieliikenteen pitkäkestoiset tietyöt. Viestit ovat saatavissa Datex2 formaatissa.

- Tiesääasemien tiedot. Tiesääasemat mittaavat tavallisten säätietojen (ilman lämpötilan ja suhteellinen kosteus, kastepistelämpötila, sade ja tuulitiedot jne) lisäksi tietoa tienpinnan tilasta erityisten tienpinta-anturien avulla. Suomen maanteillä on yli 350 tiesääasemapistettä, jotka sijaitsevat yleensä pääteiden varsilla. Rajapinnan kautta on noudettavissa tiesääasemien keräämät mittaustiedot, jotka päivittyvät minuutin välein.

- Tiejaksojen keliennusteet. Viesti sisältää keliennusteet, jotka päivittyvät viiden minuutin välein.

- Kelikamerat. Keli- ja liikennekameroiden kuvista saadaan tietoa tienpinnan tilasta sekä liikennetilanteesta. Rajapinnan kautta on haettavissa kaikkien julkisten kelikameroiden tiedot ja osoitelinkit mistä kelikameroiden kuvat löytyvät. Kameroita on käytössä reilut 470 kappaletta.

- Metatiedot. Rajapintojen kautta on haettavissa tieliikenteen tiedonkeruupisteiden sijainti- ja tilatiedot. GeoJSON-formaatissa saatavat sijaintitiedot päivittyvät 12 tunnin välein ja tilatiedot tunnin välein. 

# Sisältö
- [REST/JSON-rajapinnat](#restjson-rajapinnat)
    - [Kelikamerat](#kelikamerat)
    - [Ajantasaiset linkkien sujuvuustiedot sisältäen matka-aikatiedot](#ajantasaiset-linkkien-sujuvuustiedot-sisältäen-matka-aikatiedot)
    - [Edellisen päivän sujuvuuden historiatiedot](#edellisen-päivän-sujuvuuden-historiatiedot)
    - [Sujuvuuden historiatiedot halutulta kuulta](#sujuvuuden-historiatiedot-halutulta-kuulta)
    - [Vapaat nopeudet](#vapaat-nopeudet)
    - [Ajantasaiset tiejaksojen keliennusteet](#ajantasaiset-tiejaksojen-keliennusteet)
    - [Ajantasaiset LAM mittaustiedot](#ajantasaiset-lam-mittaustiedot)
    - [Häiriötiedotteet](#häiriötiedotteet)
    - [Painorajoitteet](#painorajoitteet)
    - [Tietyöt](#tietyöt)
    - [Tiesääasemien ajantasaiset mittaustiedot](#tiesääasemien-ajantasaiset-mittaustiedot)
- [WebSocket-rajapinnat](#websocket-rajapinnat)
    - [Topicit](#topicit)
    - [Yksinkertainen JavaScript WebSocket -clientti](#yksinkertainen-javascript-websocket--client)
- [Swagger-rajapintakuvaus](#swagger-api)

## REST/JSON-rajapinnat

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta](https://tie.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html){:target="_blank"}

Sekä metadataa että dataa päivitetään reaaliaikaisesti.

### Kelikamerat

[```https://tie.digitraffic.fi/api/v1/data/camera-data```](https://tie.digitraffic.fi/api/v1/data/camera-data)

[```https://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](http:s//tie.digitraffic.fi/api/v1/data/camera-data/{id})

Viesti sisältää kaikkien julkisten kelikameroiden tiedot ja osoitteen mistä kelikamerakuvat löytyvät. Esim. esiasennon C0150200 kuva löytyy
osoitteesta [https://weathercam.digitraffic.fi/C0150200.jpg](https://weathercam.digitraffic.fi/C0150200.jpg).

![Kelikamerakuva C0150200](https://weathercam.digitraffic.fi/C0150200.jpg)

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/camera-stations```](https://tie.digitraffic.fi/api/v1/metadata/camera-stations)

### Ajantasaiset linkkien sujuvuustiedot sisältäen matka-aikatiedot

Perjantaina 29.12.2017 päättyi pääkaupunkiseudun matka-aikajärjestelmän toiminta. Järjestelmä on tullut teknisen käyttöikänsä päähän eikä toiminta
vastaa enää asetettuja laatuvaatimuksia Tämän vuoksi myös Digitraffic lopetti toimittamasta PKS-järjestelmään liittyvää tietoa.

Tämän johdosta tätä rajapintaa ei enää ole saatavilla.

### Edellisen päivän sujuvuuden historiatiedot

Koska uutta tietoa ei enää saavu, tämä rajapinta ei enää ole saatavilla.

### Sujuvuuden historiatiedot halutulta kuulta

[```https://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month})

Viesti sisältää halutun linkin yhden kuukauden kaikki historiatiedot.

Uutta tietoa ei enää saavu 29.12.2017 jälkeen.

### Vapaat nopeudet

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds)

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id})

Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille.

Kun linkki- tai LAM–asema vaihtuu talvinopeusrajoituksesta kesänopeuksiin tai päinvastoin, viestin sisältö muuttuu.

Viesti päivitetään eräajotyyppisesti kerran vuorokaudessa. Päivitetty viesti on haettavissa 03:30 Suomen aikaa.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/tms-stations```](https://tie.digitraffic.fi/api/v1/metadata/tms-stations)

### Ajantasaiset tiejaksojen keliennusteet

[```https://tie.digitraffic.fi/api/v1/data/road-conditions```](https://tie.digitraffic.fi/api/v1/data/road-conditions)

Viesti sisältää tiejaksokohtaiset keliennusteet ja ne päivitetään viiden minuutin välein.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/weather-stations```](https://tie.digitraffic.fi/api/v1/metadata/weather-stations)

[```https://tie.digitraffic.fi/api/v1/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors)

[```https://tie.digitraffic.fi/api/v1/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v1/metadata/forecast-sections)

### Ajantasaiset LAM mittaustiedot

[```https://tie.digitraffic.fi/api/v1/data/tms-data```](https://tie.digitraffic.fi/api/v1/data/tms-data)

[```https://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](https://tie.digitraffic.fi/api/v1/data/tms-data/{id})

Viesti sisältää LAM (Liikenteen Automaattinen Mittaus)–asemien mittaustiedot.

Viestissä on kullekin LAM-asemalle liikennemäärä molempiin suuntiin, ja mitattu keskinopeus molempiin suuntiin.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/tms-stations```](https://tie.digitraffic.fi/api/v1/metadata/tms-stations)

[```https://tie.digitraffic.fi/api/v1/metadata/tms-sensors```](https://tie.digitraffic.fi/api/v1/metadata/tms-sensors)

### Häiriötiedotteet

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2)

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month})

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId})

Viesti sisältää tieliikenteen häiriötiedotteita, jotka koskevat merkittäviä tieliikenteen sujuvuuteen vaikuttavia häiriöitä. Tällaisia ovat esimerkiksi liikenneonnettomuudesta johtuvat poikkeusjärjestelyt.

Häiriötiedotteet käyttävät TMC-paikannusmerkistöä häiriöiden maantieteellisen sijainnin ilmoittamiseen. Tarkempi kuvaus paikannusmerkistöstä löytyy [täältä](paikannusnimisto).

Viesteissä olevat päivämäärien muoto vaihtelee sen paikasta riippuen. 
Viestin published-tagin alla on utc ja localtime -aikakentät, joden sisältö 
on käytännössä sama ja ilmoitetaan UTC (Zulu) -aikana. Muut ajat varsinaisen 
Datex2-viestin sisällä ovat paikallista aikaa ja sisältävät täten aikavyöhykeen
poikkeaman UTC-ajasta. Päivämäärien ja kelloaikojen parsimisessa kannattaa
käyttää jotakin yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä
tahansa aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/locations-versions```](https://tie.digitraffic.fi/api/v1/metadata/location-versions)

[```https://tie.digitraffic.fi/api/v1/metadata/locations-types```](https://tie.digitraffic.fi/api/v1/metadata/location-types)

[```https://tie.digitraffic.fi/api/v1/metadata/locations```](https://tie.digitraffic.fi/api/v1/metadata/locations)

### Painorajoitteet

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2)

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month})

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId})

Painorajoitteet käyttävät TMC-paikannusmerkistöä painorajoitteiden maantieteellisen sijainnin ilmoittamiseen. Tarkempi kuvaus paikannusmerkistöstä löytyy [täältä](paikannusnimisto).

Viesteissä olevat päivämäärien muoto vaihtelee sen paikasta riippuen. 
Viestin published-tagin alla on utc ja localtime -aikakentät, joden sisältö 
on käytännössä sama ja ilmoitetaan UTC (Zulu) -aikana. Muut ajat varsinaisen 
Datex2-viestin sisällä ovat paikallista aikaa ja sisältävät täten aikavyöhykeen
poikkeaman UTC-ajasta. Päivämäärien ja kelloaikojen parsimisessa kannattaa
käyttää jotakin yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä
tahansa aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/locations-versions```](https://tie.digitraffic.fi/api/v1/metadata/location-versions)

[```https://tie.digitraffic.fi/api/v1/metadata/locations-types```](https://tie.digitraffic.fi/api/v1/metadata/location-types)

[```https://tie.digitraffic.fi/api/v1/metadata/locations```](https://tie.digitraffic.fi/api/v1/metadata/locations)

### Tietyöt

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2```](http://tie.digitraffic.fi/api/v1/data/roadworks-datex2)

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month})

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId})

Tietyöt käyttävät TMC-paikannusmerkistöä tietöiden maantieteellisen sijainnin ilmoittamiseen. Tarkempi kuvaus paikannusmerkistöstä löytyy [täältä](paikannusnimisto).

Viesteissä olevat päivämäärien muoto vaihtelee sen paikasta riippuen. 
Viestin published-tagin alla on utc ja localtime -aikakentät, joden sisältö 
on käytännössä sama ja ilmoitetaan UTC (Zulu) -aikana. Muut ajat varsinaisen 
Datex2-viestin sisällä ovat paikallista aikaa ja sisältävät täten aikavyöhykeen
poikkeaman UTC-ajasta. Päivämäärien ja kelloaikojen parsimisessa kannattaa
käyttää jotakin yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä
tahansa aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/locations-versions```](https://tie.digitraffic.fi/api/v1/metadata/location-versions)

[```https://tie.digitraffic.fi/api/v1/metadata/locations-types```](https://tie.digitraffic.fi/api/v1/metadata/location-types)

[```https://tie.digitraffic.fi/api/v1/metadata/locations```](https://tie.digitraffic.fi/api/v1/metadata/locations)

### Tiesääasemien ajantasaiset mittaustiedot

[```https://tie.digitraffic.fi/api/v1/data/weather-data```](https://tie.digitraffic.fi/api/v1/data/weather-data)

[```https://tie.digitraffic.fi/api/v1/data/weather-data/{id}```](https://tie.digitraffic.fi/api/v1/data/weather-data/{id})

Viesti sisältää tiesääasemien viimeisimmät mittaustiedot.

Viestissä on kullekin tiesääasemalle kyseisen aseman anturiarvot.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/weather-stations```](https://tie.digitraffic.fi/api/v1/metadata/weather-stations)

[```https://tie.digitraffic.fi/api/v1/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors)

## WebSocket-rajapinnat

REST/JSON-rajapinnan lisäksi tarjolla on WebSocket-rajapinta, joka mahdollistaa TMC-asemien tietojen kuuntelemisen. Käytetty protokolla on MQTT over WebSockets, joka mahdollistaa ainoastaan haluttujen tietojen vastaanoton topicien avulla.

Tuotannon osoite on wss://tie.digitraffic.fi:61619/mqtt

Kirjautuessa tulee käyttää SSL-yhteyttä.  Lisäksi palveluun täytyy kirjautua seuraavin tiedoin:
* userName:digitraffic
* password:digitrafficPassword

Pahon JS-clientia käyttäessä osoite on pelkkä tie.digitraffic.fi ja portti 61619, esimerkki alempana.

Testin osoite on vastaavasti tie-test.digitraffic.fi

#### Topicit

Tarjolla on topicit liikenteen seurantaan (tms) ja säätietojen keräämiseen (weather). Topicit ovat seuraavanlaista muotoa:

- tms/\<roadStationId>/\<sensorId\>
- tms/status
- weather/\<roadStationId>/\<sensorId\>
- weather/status

#### TMS-viesti

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

#### Weather-viesti

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

#### Yksinkertainen JavaScript WebSocket -client

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
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
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-UI", "https://meri.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html#/"]
  - ["Swagger-kuvaus", "https://meri.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api"]
---

Tieliikenteen tiedot syntyvät Liikenneviraston ja ELY-keskusten hallinnoimissa tieliikenteen ohjaus- ja mittausjärjestelmissä.
Tieliikenteen avoimet tiedot sisältävät tällä hetkellä:

- LAM-mittaustiedot. Tiehen upotetulta induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista ajoneuvoluokittain. LAM-pisteitä on yli 450 kappaletta ympäri Suomea.

- Ajantasaiset vapaat nopeudet. Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille. Tiedot päivittyvät kerran vuorokaudessa.

- Tieliikenteen häiriötiedotteet. Tieliikennekeskuksista saatavat liikenteen ensi- ja muut häiriötiedotteet, tiedotteet tietöistä sekä kelirikkotilanteista. Viestit ovat saatavissa Datex2 formaatissa.

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
    - [Tiesääasemien ajantasaiset mittaustiedot](#tiesääasemien-ajantasaiset-mittaustiedot)
- [Swagger-rajapintakuvaus](#swagger-api)

## REST/JSON-rajapinnat

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta](https://tie.digitraffic.fi/api/v1/metadata/documentation/swagger-ui.html){:target="_blank"}

Sekä metadataa että dataa päivitetään reaaliaikaisesti.

### Kelikamerat

[```http://tie.digitraffic.fi/api/v1/data/camera-data```](http://tie.digitraffic.fi/api/v1/data/camera-data)

[```http://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](http://tie.digitraffic.fi/api/v1/data/camera-data/{id})

Viesti sisältää kaikkien julkisten kelikameroiden tiedot ja osoitteen mistä kelikamerakuvat löytyvät. Esim. esiasennon C0150200 kuva löytyy
osoitteesta [http://weathercam.digitraffic.fi/C0150200.jpg](http://weathercam.digitraffic.fi/C0150200.jpg).

![Kelikamerakuva C0150200](https://weathercam.digitraffic.fi/C0150200.jpg)

### Ajantasaiset linkkien sujuvuustiedot sisältäen matka-aikatiedot

Perjantaina 29.12.2017 päättyi pääkaupunkiseudun matka-aikajärjestelmän toiminta. Järjestelmä on tullut teknisen käyttöikänsä päähän eikä toiminta
vastaa enää asetettuja laatuvaatimuksia Tämän vuoksi myös Digitraffic lopetti toimittamasta PKS-järjestelmään liittyvää tietoa.

Tämän johdosta tätä rajapintaa ei enää ole saatavilla.

### Edellisen päivän sujuvuuden historiatiedot

Koska uutta tietoa ei enää saavu, tämä rajapinta ei enää ole saatavilla.

### Sujuvuuden historiatiedot halutulta kuulta
[```http://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month}```](http://tie.digitraffic.fi/api/v1/data/fluency-history/{id}?year={year}&month={month})

Viesti sisältää halutun linkin yhden kuukauden kaikki historiatiedot.

### Vapaat nopeudet

[```http://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds)

[```http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/link/{id}```](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/link/{id})

[```http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](http://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id})

Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille.

Kun linkki- tai LAM–asema vaihtuu talvinopeusrajoituksesta kesänopeuksiin tai päinvastoin, viestin sisältö muuttuu.

Viesti päivitetään eräajotyyppisesti kerran vuorokaudessa. Päivitetty viesti on haettavissa 03:30 Suomen aikaa.

### Ajantasaiset tiejaksojen keliennusteet

[```http://tie.digitraffic.fi/api/v1/data/road-conditions```](http://tie.digitraffic.fi/api/v1/data/road-conditions)

Viesti sisältää tiejaksokohtaiset keliennusteet ja ne päivitetään viiden minuutin välein.

### Ajantasaiset LAM mittaustiedot

[```http://tie.digitraffic.fi/api/v1/data/tms-data```](http://tie.digitraffic.fi/api/v1/data/tms-data)

[```http://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](http://tie.digitraffic.fi/api/v1/data/tms-data/{id})

[```ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata```](ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata)

[```ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id}```](ws://tie.digitraffic.fi/api/v1/plain-websockets/tmsdata/{lam-station-id})

Viesti sisältää LAM (Liikenteen Automaattinen Mittaus)–asemien mittaustiedot.

Viestissä on kullekin LAM-asemalle liikennemäärä molempiin suuntiin, ja mitattu keskinopeus molempiin suuntiin.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.

Yksinkertainen JavaScript WebSocket -asiakassovellus:
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

### Häiriötiedotteet

[```http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex```](http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2)

[```http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}```](http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month})

[```http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}```](http://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId})

Viesti sisältää tieliikenteen häiriötiedotteita, jotka koskevat merkittäviä tieliikenteen sujuvuuteen vaikuttavia häiriöitä. Tällaisia ovat esimerkiksi liikenneonnettomuudesta johtuvat poikkeusjärjestelyt.

Häiriötiedotteet käyttävät TMC-paikannusmerkistöä häiriöiden maantieteellisen sijainnin ilmoittamiseen.

[```http://tie.digitraffic.fi/api/v1/metadata/locations```](http://tie.digitraffic.fi/api/v1/metadata/locations)

### Tiesääasemien ajantasaiset mittaustiedot

[```http://tie.digitraffic.fi/api/v1/data/weather-data```](http://tie.digitraffic.fi/api/v1/data/weather-data)

[```http://tie.digitraffic.fi/api/v1/data/weather-data/{id}```](http://tie.digitraffic.fi/api/v1/data/weather-data/{id})

Viesti sisältää tiesääasemien viimeisimmät mittaustiedot.

Viestissä on kullekin tiesääasemalle kyseisen aseman anturiarvot.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.

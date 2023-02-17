---
layout: traffictype
permalink: /tieliikenne/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/swagger/openapi.json
swagger-link: https://tie.digitraffic.fi/swagger/
hero-image: road
title: Tieliikenne
lang: fi
ref: road-traffic
intro: Avointa dataa Suomen tieverkolta.
links:
  - ["Väylävirasto", "https://vayla.fi"]
  - ["Fintraffic","https://fintraffic.fi"]
  - ["Swagger-UI", "https://tie.digitraffic.fi/swagger/"]
  - ["Swagger-kuvaus", "https://tie.digitraffic.fi/swagger/openapi.json"]
---


<h2 id="sisältö">Sisältö</h2>

* Do not remove this line (it will not be displayed)
{:toc}


## Yleistä tietoa

Tieliikenteen tiedot syntyvät Fintrafficin hallinnoimissa tieliikenteen ohjaus- ja mittausjärjestelmissä.
Tieliikenteen avoimet tiedot sisältävät tällä hetkellä:

- Kelikamerat. Keli- ja liikennekameroiden kuvista saadaan tietoa tienpinnan tilasta sekä liikennetilanteesta. Rajapinnan kautta on haettavissa kaikkien julkisten kelikameroiden tiedot ja osoitelinkit mistä kelikameroiden kuvat löytyvät. Kameroita on käytössä reilut 470 kappaletta.

- Tiesääasemien tiedot. Tiesääasemat mittaavat tavallisten säätietojen (ilman lämpötilan ja suhteellinen kosteus, kastepistelämpötila, sade ja tuulitiedot jne) lisäksi tietoa tienpinnan tilasta erityisten tienpinta-anturien avulla. Suomen maanteillä on yli 350 tiesääasemapistettä, jotka sijaitsevat yleensä pääteiden varsilla. Rajapinnan kautta on noudettavissa tiesääasemien keräämät mittaustiedot, jotka päivittyvät minuutin välein.

- Tiejaksojen keliennusteet. Viesti sisältää keliennusteet, jotka päivittyvät viiden minuutin välein.

- Liikenteen automaattiset mittaustiedot (LAM). Tiehen upotetulta induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista ajoneuvoluokittain.

- Liikennetiedotteet. Tieliikenteen häiriötiedotteet, painorajoitukset, tietyöt ja erikoiskuljetukset ovat saatavissa Datex2 sekä Simppeli-JSON -muodossa.  

- TMC/ALERT-C paikannuspisteistö, jota käytetään mm. liikennetiedotteissa.

- Muuttuvien liikennemerkkien tiedot

- Maanteiden kunnossapitotiedot

- Jalankulun ja pyöräilyn mittaustiedot

- Metatiedot. Rajapintojen kautta on haettavissa tieliikenteen tiedonkeruupisteiden sijainti- ja tilatiedot. GeoJSON-formaatissa saatavat sijaintitiedot päivittyvät 12 tunnin välein ja tilatiedot tunnin välein.


### Käyttörajoitukset

Katso [Ohjeita ja lisätietoa rajapintojen käyttöön > Yleistä huomioitavaa](/ohjeita/#yleistä-huomioitavaa)

### Tuetut ja vanhentuneet rajapinnat

Tuettujen ja vanhentuneiden rajapintojen listaus löytyy [täältä](/rajapintojen-tila/muutokset/).


## REST/JSON-rajapinnat

### Rajapintojen Swagger-kuvaukset

Rajapintakuvaukset löytyvät [Swagger-kuvauksesta]{:target="_blank"}. 

Sieltä löytyvät rajapintojen tarkemmat parametrit, 
joita kaikkia ei ole tässä dokumentaatiossa välttämättä kerrottu.

### Kelikamerat

#### Asemien yksinkertaiset tiedot ja yksittäisen aseman tarkemmat tiedot

[```/api/weathercam/v1/stations```](https://tie.digitraffic.fi/api/weathercam/v1/stations){:target="_blank"}\
[```/api/weathercam/v1/stations/{id}```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507){:target="_blank"}

Viesti sisältää kaikkien julkisten kelikameroiden tiedot ja osoitteen mistä kelikamerakuvat löytyvät. Esim. esiasennon C0450701 kuva löytyy
osoitteesta [https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.

Aseman tiedoista kannattaa huomioida ainakin alla olevat kentät, joista voi päätellä onko kamera tai esiasento keruussa.
- Kameran kentät ```state``` ja ```collectionStatus```
- Esiasennon kenttä ```inCollection```

#### Kaikkien asemien data ja yksittäisen aseman data 

[```/api/weathercam/v1/stations/data```](https://tie.digitraffic.fi/api/weathercam/v1/stations/data){:target="_blank"}\
[```/api/weathercam/v1/stations/{id}/data```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/data){:target="_blank"}

Kelikamerakuvat päivittyvät noin 10 minuutin välein.

![Kelikamerakuva C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

#### Halutun kameran tai esiasennon 24h historia

[```/api/weathercam/v1/stations/{camraId}/history```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/history){:target="_blank"}\
[```/api/weathercam/v1/stations/{presetId}/history```](https://tie.digitraffic.fi/api/weathercam/v1/stations/C0450701/history){:target="_blank"}

Rajapinta palauttaa linkit menneisiin kuviin viimeisen 24 tunnin ajalta.

### Tiesääasemien ajantasaiset mittaustiedot

#### Asemien yksinkertaiset tiedot ja yksittäisen aseman tarkemmat tiedot
\
[```/api/weather/v1/stations```](https://tie.digitraffic.fi/api/weather/v1/stations){:target="_blank"}\
[```/api/weather/v1/stations/{id}```](https://tie.digitraffic.fi/api/weather/v1/stations/1012){:target="_blank"}

#### Antureiden tiedot

[```/api/weather/v1/sensors```](https://tie.digitraffic.fi/api/weather/v1/sensors){:target="_blank"}

#### Kaikkien asemien data ja yksittäisen aseman data

[```/api/weather/v1/stations/data```](https://tie.digitraffic.fi/api/weather/v1/stations/data){:target="_blank"}\
[```/api/weather/v1/stations/{id}/data```](https://tie.digitraffic.fi/api/weather/v1/stations/1012/data){:target="_blank"}

Viesti sisältää tiesääasemien viimeisimmät antureiden mittaustiedot.  
Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

#### Viimeisen 24h historia (Beta)

Halutun tiesääaseman kaikkien anturien datan saa rajapinnasta:

[```/api/beta/weather-history-data/{stationId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057){:target="_blank"}

Yksittäisen anturin datan saa rajapinnasta:

[```/api/beta/weather-history-data/{stationId}/{sensorId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/1012/1){:target="_blank"}

Molempiin kyselyihin on mahdollista rajata ajanhetkeä from={ISO 8061 -aika} ja to={ISO 8061 -aika} parametreillä. Oletuksena ilman from-parametriä kyselyt palauttavat vain viimeisimmän tunnin datan.

24h historia on vielä tarjolla vain beta-rajapintana.


### Ajantasaiset tiejaksojen keliennusteet

#### Tarkat ja yksinkertaisemmat tiejaksot

[```/api/weather/v1/forecast-sections```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections){:target="_blank"}\
[```/api/weather/v1/forecast-sections/{id}```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/00003_101_00000_1_0){:target="_blank"}\
[```/api/weather/v1/forecast-sections?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

[```/api/weather/v1/forecast-sections-simple```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple/{id}```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/00003_101_000_0){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

Tiejaksot päivitetään normaalisti kerran vuodessa.

#### Tiejaksojen keliennusteet

[```/api/weather/v1/forecast-sections/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections/{id}/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/00003_101_00000_1_0/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections/forecasts?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/forecasts?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

[```/api/weather/v1/forecast-sections-simple/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple/{id}/forecasts```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/00003_101_000_0/forecasts){:target="_blank"}\
[```/api/weather/v1/forecast-sections-simple/forecasts?xMin=22&yMin=59&xMax=27&yMax=60```](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/forecasts?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

Keliennusteet päivittyvät viiden minuutin välein.

### Liikenteen automaattiset mittaustiedot (LAM)

#### Dokumentaatio

[LAM-dokumentaatio](lam) -sivulta löytyy tarkempi kuvaus aineistosta ja dataan liittyviä selitteitä.

#### Asemien yksinkertaiset tiedot ja yksittäisen aseman tarkemmat tiedot

[```/api/tms/v1/stations```](https://tie.digitraffic.fi//api/tms/v1/stations){:target="_blank"}\
[```/api/tms/v1/stations/{id}```](https://tie.digitraffic.fi//api/tms/v1/stations/23001){:target="_blank"}
[```/api/tms/v1/stations/{id}/sensor-constants```](https://tie.digitraffic.fi/api/tms/v1/stations/1012/sensor-constants){:target="_blank"}

#### Saatavilla olevien laskennallisien antureiden tiedot

[```/api/tms/v1/sensors```](https://tie.digitraffic.fi/api/tms/v1/sensors){:target="_blank"}

#### Kaikkien asemien data ja yksittäisen aseman data

[```/api/tms/v1/stations/data```](https://tie.digitraffic.fi/api/tms/v1/stations/data){:target="_blank"}\
[```/api/tms/v1/stations/{id}/data```](https://tie.digitraffic.fi/api/tms/v1/stations/23001/data){:target="_blank"}

Viesti sisältää LAM (Liikenteen Automaattinen Mittaus) –asemien mittaustiedot.

Viestissä on kullakin LAM-asemalla olevien laskennallisien antureiden mittausarvot.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

#### Tilastohaku

Tilastohaku-lomakkeella voi hakea haluttuja raportteja lam-mittauspisteillä. 

Tietojen hakulomake löytyy [täältä](https://tie-lam-test.digitraffic.fi/){:target="_blank"}.

#### Raakadatahaku

Mittauspisteiden data on saatavissa myös raakadatana ja lisätietoa löytyy [täältä](lam#lam-raakadata).


### Liikennetiedotteet

Liikennetiedotteita on mahdollista hakea DATEX II -standardin mukaisessa formaatissa sekä yksinkertaisemmassa Simppeli JSON -muodossa,
joka noudattaa GeoJSON-standardia. Näin olle Simppeli JSON sisältää myös tiedotteen geometrian toisin kuin DATEX II.
Simppeli JSON voidaa hakea myös ilman aluegeometrioita, jolloin siirrettävän datan määrä vähenee, sillä aluegeometriat ovat kohtuullisen suuria.
Aluegeometriat on mahdollista hakea erillisen rajapinnan kautta yksitellen tai kaikki kerralla paikallista tallennusta varten
ja yhdistää sitten rajapinnan tarjoamaan Simppeliin JSON -viestiin. Simppeeli JSON -viestin voi siis pyytää myös aluegeometrioiden kanssa, 
mutta siirrettävän datan määrä on monin kertainen. 

Liikennetiedotteet käyttävät TMC/ALERT-C paikannuspisteistöä häiriöiden maantieteellisen sijainnin ilmoittamiseen. 
Lisää tietoa löytyy kohdasta [TMC/ALERT-C paikannuspisteistö](#tmcalert-c-paikannuspisteistö)

Viestien teksteissä olevat päivämäärien ja aikojen muoto voi vaihdella. 
Viestien aikakenttät noudattavat ISO 8601 aikamuotoa ja ilmoitetaan UTC (Zulu) -aikana.
Päivämäärien ja kelloaikojen parsimisessa kannattaa käyttää jotakin yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä tahansa aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

#### Liikennetiedotteiden tyypit 
* **Erikoiskuljetus** `EXEMPTED_TRANSPORT`
  * Viesti sisältää tietoa teillä kulkevista erikoiskuljetuksista, jotka vaikuttavat muihin tiellä liikkujiin. 
* **Tietyö** `ROAD_WORK`
  * Viesti sisältää tietoa tietöiden eteemisestä ja aiheuttamista muutoksista liikenteelle.
* **Liikennetiedote** `TRAFFIC_ANNOUNCEMENT`
  * Viesti sisältää tieliikenteen häiriötiedotteita, jotka koskevat merkittäviä tieliikenteen sujuvuuteen vaikuttavia häiriöitä. Tällaisia ovat esimerkiksi liikenneonnettomuudesta johtuvat poikkeusjärjestelyt.
* **Painorajoitus** `WEIGHT_RESTRICTION`
  * Viesti sisältää poikkeuksellisia teiden käyttöä rajoittavia painorajoituksia.

#### Liikennetiedotteiden DATEX II -muotoisen datan rajapinnat

* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK){:target="_blank"}
* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Liikennetiedotteiden Simppelin JSON -muotoisen datan rajapinnat

* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK){:target="_blank"}
* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Liikennetiedotteiden aluegeometriat

Liikennetiedote voi sisältää aluegeometrioita, jotka lötyvät JSON-polusta: 
``properties.announcements[x].locationDetails.areaLocation.areas[x].locationCode`` 
Mikäli rajapintakutsun `includeAreaGeometry` -parametrin arvo on `false` jätetään vastauksen GeoJSON geometria
palauttamatta. Geometriat kannataa mieluummin hakea talteen paikallisesti
alla kerrotusta rajapinnasta, eikä hakea niitä joka kerta erikseen.

<details>
  <summary>Avaa esimerkki Simppeli JSON liikennetiedotteesta, jossa ALERT-C aluegeometria sijainti koodilla 27:</summary>
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

Aluegeometriat löytyvät rajapinnasta:
* ALERT-C alue sijainti koodilla 27: [```/api/traffic-message/v1/area-geometries/27```](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries/27?includeGeometry=true){:target="_blank"}
* Kaikki alueet ilman geometriaa: [```/api/traffic-message/v1/area-geometries```](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries?lastUpdated=false){:target="_blank"}

### TMC/ALERT-C paikannuspisteistö

Häiriötiedotteiden, painorajoitusten ja tietöiden maantieteellisen sijainnin ilmoittamiseen käytetään TMC/ALERT-C -paikannuspisteistöä. Lisätietoa täällä.
Lisätietoa löytyy [TMC/ALERT-C](paikannusnimisto) -sivulta.

[```/api/traffic-message/v1/locations/versions```](https://tie.digitraffic.fi/api/traffic-message/v1/locations/versions){:target="_blank"}\
[```/api/traffic-message/v1/locations/types```](https://tie.digitraffic.fi/api/traffic-message/v1/locations/types){:target="_blank"}\
[```/api/traffic-message/v1/locations```](https://tie.digitraffic.fi/api/traffic-message/v1/locations){:target="_blank"}\
[```/api/traffic-message/v1/locations/{id}```](https://tie.digitraffic.fi/api/traffic-message/v1/locations/35){:target="_blank"}


### Muuttuvien liikennemerkkien tiedot

[```/api/variable-sign/v1/signs```](https://tie.digitraffic.fi/api/variable-sign/v1/signs){:target="_blank"}\
[```/api/variable-sign/v1/signs/{id}```](https://tie.digitraffic.fi/api/variable-sign/v1/signs/KRM01V102){:target="_blank"}\
[```/api/variable-sign/v1/signs/history```](https://tie.digitraffic.fi/api/variable-sign/v1/signs/history?deviceId=KRM01V102){:target="_blank"}

Viesti sisältää muuttuvan liikennemerkin viimeisimmän tilan.  Tällä hetkellä tuettuja merkkejä ovat muuttuvat 
nopeusrajoitukset sekä varoitusmerkit. Digitraffic julkaisee tilatiedot vain laiteryhmän master-laitteesta. Tämä tarkoittaa sitä, että ajoradan vasemmalla puolella olevan merkin ja mahdollisen ramppimerkin tietoja ei välitetä erikseen.

Varoitusmerkkien tyypit:

[```/api/variable-sign/v1/signs/code-descriptions```](https://tie.digitraffic.fi/api/variable-sign/v1/signs/code-descriptions){:target="_blank"}

Varoitusmerkit kuvina:

[```https://vayla.fi/tieverkko/liikennemerkit```](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}

Tiedot on saatavina myös datex2-muotoisena:

[```/api/variable-sign/v1/signs.datex2```](https://tie.digitraffic.fi/api/variable-sign/v1/signs.datex2){:target="_blank"}\

Varoitusmerkissä mahdollisesti olevat []-merkkien sisällä olevat kyltit on mahdollista generoida svg-muodossa:

[```/api/variable-sign/v1/images/ramppi_{number}```](https://tie.digitraffic.fi/api/variable-sign/v1/images/ramppi_123){:target="_blank"}\
[```/api/v1/variable-signs/images/tie_{number}```](https://tie.digitraffic.fi/api/variable-sign/v1/images/tie_321){:target="_blank"}

### Maanteiden kunnossapitotiedot

Väylävirasto vastaanottaa teiden kunnossapitourakoitsijoilta kunnossapitoajoneuvojen reaaliaikaista sijainti- ja toimenpidetietoa. 
Tiedot välittyvät ajoneuvoista urakoitsijoiden tietojärjestelmiin, joista ne edelleen välitetään Väyläviraston Harja-järjestelmään.
Digitraffic vastaanottaa myös nämä tiedot ja julkaisee niitä avoimena datana alla kerrotuissa rajapinnoissa. 
Tiedot päivittyvät keskimäärin minuutin välein. Harja datan domain on `state-roads`.

Tämän lisäksi tällä hetkellä tuodaan myös muutamien kuntien kunnossapitodataa. Tämän datan domain on eri kuin `state-roads`.

Väylävirasto valmistelee myös vuorokautta vanhempien kunnossapidon toteumatietojen julkaisua omissa avoimen datan palveluissaan.

#### Kunnossapidon domain

[```/api/maintenance/v1/tracking/domains```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/domains){:target="_blank"}

Rajapinta palauttaa mahdolliset domainit. Domain kertoo mistä järjestelmästä data tulee.

#### Ajoneuvojen tehtävätyypit

[```/api/maintenance/v1/tracking/tasks```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/tasks){:target="_blank"}

Rajapinta palauttaa ajoneuvojen suorittamien tehtävien tarkemmat selitteet.


#### Ajoneuvojen seurantadata

[```/api/maintenance/v1/tracking/routes?domain=state-roads```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes?domain=state-roads){:target="_blank"}

Rajapinta palauttaa ajoneuvon kulkeman reitin. Reitti ei täysin vastaa ajoneuvon maastossa kulkemaa reittiä,
koska julkaistava reitti muodostetaan yhdistelemällä ajoneuvosta saatavat sijaintitiedot viivaksi ja
erillistä reititystä tieverkolle ei tehdä. Reitti voi olla myös pelkkä piste, jos ajoneuvolta ei ole saatu useampaa seurantapistettä.

Uusi seuranta, jossa ei ole viitettä edeliseen muodostetaan aina kun:
- Ajoneuvon suorittama tehtävä muuttuu
- Kahden peräkkäisen vastaanotetun sijaintiviestin aikaväli on yli 5 minuuttia
- Kahden peräkkäisen vastaanotetun sijaintiviestin välinen laskennallinen ajonopeus on yli 140 km/h

Näillä käsittelyllä poistetaan suurimmat ajoneuvojen tuottamassa datassa mahdollisesti esiintyvät virheet.

#### Ajoneuvon viimeisin sijainti

[```/api/maintenance/v1/tracking/routes/latest?domain=state-roads```](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes/latest?domain=state-roads){:target="_blank"}

Rajapinta palauttaa viimeisimmät kunnossapitoajoneuvoista vastaanotetut sijainti- ja tehtävätiedot


### Jalankulun ja pyöräilyn mittaustiedot

Jalankulun ja pyöräilyn mittaustietoja saadaan tällä hetkellä Oulun alueelta.  

#### Kaikkien mittauspisteiden tiedot GeoJSON-muodossa

[```/api/counting-site/v1/counters```](https://tie.digitraffic.fi/api/counting-site/v1/counters){:target="_blank"}

#### Metatietoja

[```/api/counting-site/v1/directions```](https://tie.digitraffic.fi/api/counting-site/v1/directions){:target="_blank"}\
[```/api/counting-site/v1/domains```](https://tie.digitraffic.fi/api/counting-site/v1/domains){:target="_blank"}\
[```/api/counting-site/v1/user-types```](https://tie.digitraffic.fi/api/counting-site/v1/user-types){:target="_blank"}

#### Mittauspisteiden dataa json-muodossa

[```/api/counting-site/v1/values```](https://tie.digitraffic.fi/api/counting-site/v1/values){:target="_blank"}

#### Mittauspisteiden dataa CSV-muodossa

[```/api/counting-site/v1/values.csv```](https://tie.digitraffic.fi/api/counting-site/v1/values.csv){:target="_blank"}

## MQTT WebSocket -rajapinnat

REST/JSON-rajapinnan lisäksi tarjolla on WebSocket-rajapinta, joka mahdollistaa tieliikenteen automaattisten mittaustietojen (LAM), tiesääasemien tietojen sekä maanteiden kunnossapitotietojen kuuntelemisen. Käytetty protokolla on MQTT over WebSockets, joka mahdollistaa ainoastaan haluttujen tietojen vastaanoton topicien avulla.

Tuotannon osoite on wss://tie.digitraffic.fi:61619/mqtt

Kirjautuessa tulee käyttää SSL-yhteyttä.  Lisäksi palveluun täytyy kirjautua seuraavin tiedoin:
* userName: ```digitraffic```
* password: ```digitrafficPassword```

Pahon JS-clientia käyttäessä osoite on pelkkä ```tie.digitraffic.fi``` ja portti ```61619```, esimerkki alempana.

Testin osoite on vastaavasti ```tie-test.digitraffic.fi``` ja portti ```443```.

### Topicit

Jokaisen tarjottavan datalajin juuressa on myös topikki `status`. Viesti kertoo, milloin data on viimeksi päivittynyt epookki sekunteina. Esim.: 
```
status: {
  "updated" : 1676628995
}
```

Voit korvata ```<id>```-osan ```#```-merkillä, jolloin kuunnellaan koko joukon viestejä. Esim. ```tms-v2/#```

#### Ajantasaiset LAM mittaustiedot 

- ```tms-v2/<roadStationId>/<sensorId>```
- ```tms-v2/status```
 
##### TMS-viesti

```
{
    "value":108,
    "time":1667972911,
    "start":1667966400,
    "end":1667970000
}

```

#### Tiesääasemien ajantasaiset mittaustiedot

- ```weather-v2/<roadStationId>/<sensorId>```
- ```weather-v2/status```

##### Sääaseman mittaustieto-viesti

```
{
    "value":11068,
    "time":1667973021
}
```

#### Maanteiden kunnossapitotiedon viimeisin sijainti

- ```maintenance-v2/routes/#```
- ```maintenance-v2/status```

##### Kunnossapitoviesti

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

#### Yksinkertainen JavaScript WebSocket -client
Alla olevassa koodissa viitataan puuttuvaan muuttujaan **clientName**, täydennä siihen sovelluksesi nimi. 

**HUOM!** Mikäli et hae dataa jatkuvasti, sulje yhteys kutsumalla client.disconnect().  
Esimerkkikoodissa yhteys katkaistaan 30 s kuluttua.
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
            client.subscribe("tms-v2/#");
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


[Swagger-kuvauksesta]: https://tie.digitraffic.fi/swagger/
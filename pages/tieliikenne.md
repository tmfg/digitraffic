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

<!-- deno-fmt-ignore -->
- Do not remove this line (it will not be displayed)
{:toc}

## Yleistä tietoa

Tieliikenteen tiedot syntyvät Fintrafficin hallinnoimissa tieliikenteen ohjaus-
ja mittausjärjestelmissä. Tieliikenteen avoimet tiedot sisältävät tällä
hetkellä:

- Kelikamerat. Keli- ja liikennekameroiden kuvista saadaan tietoa tienpinnan
  tilasta sekä liikennetilanteesta. Rajapinnan kautta on haettavissa kaikkien
  julkisten kelikameroiden tiedot ja osoitelinkit mistä kelikameroiden kuvat
  löytyvät. Kameroita on käytössä reilut 470 kappaletta.

- Tiesääasemien tiedot. Tiesääasemat mittaavat tavallisten säätietojen (ilman
  lämpötilan ja suhteellinen kosteus, kastepistelämpötila, sade ja tuulitiedot
  jne) lisäksi tietoa tienpinnan tilasta erityisten tienpinta-anturien avulla.
  Suomen maanteillä on yli 350 tiesääasemapistettä, jotka sijaitsevat yleensä
  pääteiden varsilla. Rajapinnan kautta on noudettavissa tiesääasemien keräämät
  mittaustiedot, jotka päivittyvät minuutin välein.

- Tiejaksojen keliennusteet. Viesti sisältää keliennusteet, jotka päivittyvät
  viiden minuutin välein.

- Liikenteen automaattiset mittaustiedot (LAM). Tiehen upotetulta
  induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista
  ajoneuvoluokittain.

- Liikennetiedotteet. Tieliikenteen häiriötiedotteet, painorajoitukset, tietyöt
  ja erikoiskuljetukset ovat saatavissa Datex2 sekä Simppeli-JSON -muodossa.

- TMC/ALERT-C paikannuspisteistö, jota käytetään mm. liikennetiedotteissa.

- Muuttuvien liikennemerkkien tiedot

- Maanteiden kunnossapitotiedot

- Jalankulun ja pyöräilyn mittaustiedot

- Metatiedot. Rajapintojen kautta on haettavissa tieliikenteen
  tiedonkeruupisteiden sijainti- ja tilatiedot. GeoJSON-formaatissa saatavat
  sijaintitiedot päivittyvät 12 tunnin välein ja tilatiedot tunnin välein.

### Käyttörajoitukset

Katso
[Ohjeita ja lisätietoa rajapintojen käyttöön > Yleistä huomioitavaa](/tuki/ohjeita/#yleistä-huomioitavaa)

### Tuetut ja vanhentuneet rajapinnat

Tuettujen ja vanhentuneiden rajapintojen listaus löytyy
[täältä](/tuki/rajapintojen-muutokset/).

## REST/JSON-rajapinnat

### Rajapintojen Swagger-kuvaukset

Rajapintakuvaukset löytyvät [Swagger-kuvauksesta]{:target="_blank"}.

Sieltä löytyvät rajapintojen tarkemmat parametrit, joita kaikkia ei ole tässä
dokumentaatiossa välttämättä kerrottu.

### Kelikamerat

#### Asemien yksinkertaiset tiedot ja yksittäisen aseman tarkemmat tiedot

[`/api/weathercam/v1/stations`](https://tie.digitraffic.fi/api/weathercam/v1/stations){:target="_blank"}\
[`/api/weathercam/v1/stations/{id}`](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507){:target="_blank"}

Viesti sisältää kaikkien julkisten kelikameroiden tiedot ja osoitteen mistä
kelikamerakuvat löytyvät. Esim. esiasennon C0450701 kuva löytyy osoitteesta
[https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.

Aseman tiedoista kannattaa huomioida ainakin alla olevat kentät, joista voi
päätellä onko kamera tai esiasento keruussa.

- Kameran kentät `state` ja `collectionStatus`
- Esiasennon kenttä `inCollection`

#### Kaikkien asemien data ja yksittäisen aseman data

[`/api/weathercam/v1/stations/data`](https://tie.digitraffic.fi/api/weathercam/v1/stations/data){:target="_blank"}\
[`/api/weathercam/v1/stations/{id}/data`](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/data){:target="_blank"}

Kelikamerakuvat päivittyvät noin 10 minuutin välein.

![Kelikamerakuva C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

#### Halutun kameran tai esiasennon 24h historia

[`/api/weathercam/v1/stations/{camraId}/history`](https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/history){:target="_blank"}\
[`/api/weathercam/v1/stations/{presetId}/history`](https://tie.digitraffic.fi/api/weathercam/v1/stations/C0450701/history){:target="_blank"}

Rajapinta palauttaa linkit menneisiin kuviin viimeisen 24 tunnin ajalta.

### Tiesääasemien ajantasaiset mittaustiedot

#### Asemien yksinkertaiset tiedot ja yksittäisen aseman tarkemmat tiedot

\
[`/api/weather/v1/stations`](https://tie.digitraffic.fi/api/weather/v1/stations){:target="_blank"}\
[`/api/weather/v1/stations/{id}`](https://tie.digitraffic.fi/api/weather/v1/stations/1012){:target="_blank"}

#### Antureiden tiedot

[`/api/weather/v1/sensors`](https://tie.digitraffic.fi/api/weather/v1/sensors){:target="_blank"}

#### Kaikkien asemien data ja yksittäisen aseman data

[`/api/weather/v1/stations/data`](https://tie.digitraffic.fi/api/weather/v1/stations/data){:target="_blank"}\
[`/api/weather/v1/stations/{id}/data`](https://tie.digitraffic.fi/api/weather/v1/stations/1012/data){:target="_blank"}

Viesti sisältää tiesääasemien viimeisimmät antureiden mittaustiedot.\
Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä
pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

#### Viimeisen 24h historia

Halutun tiesääaseman kaikkien anturien datan saa rajapinnasta:

[`/api/weather/v1/stations/{id}/data/history`](https://tie.digitraffic.fi/api/weather/v1/stations/1001/data/history){:target="_blank"}

Yksittäisen anturin datan saa rajapinnasta:

[`/api/weather/v1/stations/1001/data/history?sensorId={sensorId}`](https://tie.digitraffic.fi/api/weather/v1/stations/1001/data/history?sensorId=1){:target="_blank"}

Molempiin kyselyihin on mahdollista rajata ajanhetkeä `from={ISO 8061 -aika}` ja
`to={ISO 8061 -aika}` parametreillä. Oletuksena ilman from-parametriä kyselyt
palauttavat vain viimeisimmän tunnin datan.

### Ajantasaiset tiejaksojen keliennusteet

#### Tarkat ja yksinkertaisemmat tiejaksot

[`/api/weather/v1/forecast-sections`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections){:target="_blank"}\
[`/api/weather/v1/forecast-sections/{id}`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/00003_101_00000_1_0){:target="_blank"}\
[`/api/weather/v1/forecast-sections?xMin=22&yMin=59&xMax=27&yMax=60`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

[`/api/weather/v1/forecast-sections-simple`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple){:target="_blank"}\
[`/api/weather/v1/forecast-sections-simple/{id}`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/00003_101_000_0){:target="_blank"}\
[`/api/weather/v1/forecast-sections-simple?xMin=22&yMin=59&xMax=27&yMax=60`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

Tiejaksot päivitetään normaalisti kerran vuodessa.

#### Tiejaksojen keliennusteet

[`/api/weather/v1/forecast-sections/forecasts`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/forecasts){:target="_blank"}\
[`/api/weather/v1/forecast-sections/{id}/forecasts`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/00003_101_00000_1_0/forecasts){:target="_blank"}\
[`/api/weather/v1/forecast-sections/forecasts?xMin=22&yMin=59&xMax=27&yMax=60`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections/forecasts?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

[`/api/weather/v1/forecast-sections-simple/forecasts`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/forecasts){:target="_blank"}\
[`/api/weather/v1/forecast-sections-simple/{id}/forecasts`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/00003_101_000_0/forecasts){:target="_blank"}\
[`/api/weather/v1/forecast-sections-simple/forecasts?xMin=22&yMin=59&xMax=27&yMax=60`](https://tie.digitraffic.fi/api/weather/v1/forecast-sections-simple/forecasts?xMin=22&yMin=59&xMax=27&yMax=60){:target="_blank"}

Keliennusteet päivittyvät viiden minuutin välein.

### Liikenteen automaattiset mittaustiedot (LAM)

#### Dokumentaatio

[LAM-dokumentaatio](lam) -sivulta löytyy tarkempi kuvaus aineistosta ja dataan
liittyviä selitteitä.

#### Asemien yksinkertaiset tiedot ja yksittäisen aseman tarkemmat tiedot

[`/api/tms/v1/stations`](https://tie.digitraffic.fi/api/tms/v1/stations){:target="_blank"}\
[`/api/tms/v1/stations/{id}`](https://tie.digitraffic.fi/api/tms/v1/stations/23001){:target="_blank"}\
[`/api/tms/v1/stations/{id}/sensor-constants`](https://tie.digitraffic.fi/api/tms/v1/stations/23001/sensor-constants){:target="_blank"}

#### Saatavilla olevien laskennallisien antureiden tiedot

[`/api/tms/v1/sensors`](https://tie.digitraffic.fi/api/tms/v1/sensors){:target="_blank"}

#### Kaikkien asemien data ja yksittäisen aseman data

[`/api/tms/v1/stations/data`](https://tie.digitraffic.fi/api/tms/v1/stations/data){:target="_blank"}\
[`/api/tms/v1/stations/{id}/data`](https://tie.digitraffic.fi/api/tms/v1/stations/23001/data){:target="_blank"}

Viesti sisältää LAM (Liikenteen Automaattinen Mittaus) –asemien mittaustiedot.

Viestissä on kullakin LAM-asemalla olevien laskennallisien antureiden
mittausarvot.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä
pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

#### Liikenteen nopeus- ja määrätiedot Datex2-muodossa

Rajapinnan Datex2 versio on 3.5 ja data jaetaan sekä JSON- että xml-muodoissa.

Jaettava sensoridata on seuraava:

- Keskinopeudet viimeisen viiden minuutin ajalta
  (KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1/2)
- Keskinopeudet 60 minuutin kiinteältä aikaväliltä
  (KESKINOPEUS_60MIN_KIINTEA_SUUNTA1/2)
- Ohitukset viimeisen viiden minuutin ajalta ("OHITUKSET_5MIN_LIUKUVA_SUUNTA1/2)
- Ohitukset 60 minuutin kiinteältä aikaväliltä
  (OHITUKSET_60MIN_KIINTEA_SUUNTA1/2)

##### Asemien tiedot ja yksittäisen aseman tiedot

[`/api/tms/v1/stations/datex2`](https://tie.digitraffic.fi/api/tms/v1/stations/datex2){:target="_blank"}
(Datex2 JSON)\
[`/api/tms/v1/stations/datex2.xml`](https://tie.digitraffic.fi/api/tms/v1/stations/datex2.xml){:target="_blank"}
(Datex2 XML)\
[`/api/tms/v1/stations/{id}/datex2`](https://tie.digitraffic.fi/api/tms/v1/stations/23001/datex2){:target="_blank"}
(Datex2 JSON)\
[`/api/tms/v1/stations/{id}/datex2.xml`](https://tie.digitraffic.fi/api/tms/v1/stations/23001/datex2.xml){:target="_blank"}
(Datex2 XML)\

##### Kaikkien asemien data ja yksittäisen aseman data

[`/api/tms/v1/stations/data/datex2`](https://tie.digitraffic.fi/api/tms/v1/stations/data/datex2){:target="_blank"}
(Datex2 JSON)\
[`/api/tms/v1/stations/data/datex2.xml`](https://tie.digitraffic.fi/api/tms/v1/stations/data/datex2.xml){:target="_blank"}
(Datex2 XML)\
[`/api/tms/v1/stations/{id}/data/datex2`](https://tie.digitraffic.fi/api/tms/v1/stations/23001/data/datex2){:target="_blank"}
(Datex2 JSON)\
[`/api/tms/v1/stations/{id}/data/datex2.xml`](https://tie.digitraffic.fi/api/tms/v1/stations/23001/data/datex2.xml){:target="_blank"}
(Datex2 XML)

#### Tilastohaku

Tilastohaku-lomakkeella voi hakea haluttuja raportteja lam-mittauspisteillä.

Tietojen hakulomake löytyy sivulta
[https://tie.digitraffic.fi/ui/tms/history/](https://tie.digitraffic.fi/ui/tms/history/){:target="_blank"}.

#### Raakadatahaku

Mittauspisteiden data on saatavissa myös raakadatana ja lisätietoa löytyy
[LAM-dokumentaatio/LAM-raakadata](lam/#lam-raakadata) -sivulta.

### Liikennetiedotteet

Liikennetiedotteita on mahdollista hakea DATEX II -standardin mukaisessa
formaatissa sekä yksinkertaisemmassa Simppeli JSON -muodossa, joka noudattaa
GeoJSON-standardia. Näin olle Simppeli JSON sisältää myös tiedotteen geometrian
toisin kuin DATEX II. Simppeli JSON voidaa hakea myös ilman aluegeometrioita,
jolloin siirrettävän datan määrä vähenee, sillä aluegeometriat ovat kohtuullisen
suuria. Aluegeometriat on mahdollista hakea erillisen rajapinnan kautta
yksitellen tai kaikki kerralla paikallista tallennusta varten ja yhdistää sitten
rajapinnan tarjoamaan Simppeliin JSON -viestiin. Simppeeli JSON -viestin voi
siis pyytää myös aluegeometrioiden kanssa, mutta siirrettävän datan määrä on
monin kertainen.

Liikennetiedotteet käyttävät TMC/ALERT-C paikannuspisteistöä häiriöiden
maantieteellisen sijainnin ilmoittamiseen. Lisää tietoa löytyy kohdasta
[TMC/ALERT-C paikannuspisteistö](#tmcalert-c-paikannuspisteistö)

Viestien teksteissä olevat päivämäärien ja aikojen muoto voi vaihdella. Viestien
aikakenttät noudattavat ISO 8601 aikamuotoa ja ilmoitetaan UTC (Zulu) -aikana.
Päivämäärien ja kelloaikojen parsimisessa kannattaa käyttää jotakin
yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä tahansa
aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

#### Liikennetiedotteiden tyypit

- **Erikoiskuljetus** `EXEMPTED_TRANSPORT`
  - Viesti sisältää tietoa teillä kulkevista erikoiskuljetuksista, jotka
    vaikuttavat muihin tiellä liikkujiin.
- **Tietyö** `ROAD_WORK`
  - Viesti sisältää tietoa tietöiden eteemisestä ja aiheuttamista muutoksista
    liikenteelle.
- **Liikennetiedote** `TRAFFIC_ANNOUNCEMENT`
  - Viesti sisältää tieliikenteen häiriötiedotteita, jotka koskevat merkittäviä
    tieliikenteen sujuvuuteen vaikuttavia häiriöitä. Tällaisia ovat esimerkiksi
    liikenneonnettomuudesta johtuvat poikkeusjärjestelyt.
- **Painorajoitus** `WEIGHT_RESTRICTION`
  - Viesti sisältää poikkeuksellisia teiden käyttöä rajoittavia
    painorajoituksia.

#### Liikennetiedotteiden DATEX II -muotoisen datan rajapinnat

- [`/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT`](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
- [`/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK`](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=ROAD_WORK){:target="_blank"}
- [`/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT`](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
- [`/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION`](https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Liikennetiedotteiden Simppelin JSON -muotoisen datan rajapinnat

- [`/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT`](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
- [`/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK`](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK){:target="_blank"}
- [`/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT`](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
- [`/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION`](https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Liikennetiedotteiden aluegeometriat

Liikennetiedote voi sisältää aluegeometrioita, jotka lötyvät JSON-polusta:
`properties.announcements[x].locationDetails.areaLocation.areas[x].locationCode`
Mikäli rajapintakutsun `includeAreaGeometry` -parametrin arvo on `false`
jätetään vastauksen GeoJSON geometria palauttamatta. Geometriat kannataa
mieluummin hakea talteen paikallisesti alla kerrotusta rajapinnasta, eikä hakea
niitä joka kerta erikseen.

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

Näätämö suljettu 24/7 Utsjoki suljettu 24/7 Kilpisjärvi avoinna 24/7

Lisätietoa Norjaan matkustamisesta on osoitteessa www.entrynorway.no",
"timeAndDuration": { "startTime": "2021-01-06T14:58:00Z" },
"additionalInformation": "Liikenne- ja kelitiedot verkossa:
https://liikennetilanne.fintraffic.fi/", "sender": "Fintraffic Tieliikennekeskus
Oulu" } ], "contact": { "phone": "02002100", "email":
"oulu.liikennekeskus@fintraffic.fi" } } }
</pre>

</details>
<br/>

Aluegeometriat löytyvät rajapinnasta:

- ALERT-C alue sijainti koodilla 27:
  [`/api/traffic-message/v1/area-geometries/27`](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries/27?includeGeometry=true){:target="_blank"}
- Kaikki alueet ilman geometriaa:
  [`/api/traffic-message/v1/area-geometries`](https://tie.digitraffic.fi/api/traffic-message/v1/area-geometries?lastUpdated=false){:target="_blank"}

### TMC/ALERT-C paikannuspisteistö

Häiriötiedotteiden, painorajoitusten ja tietöiden maantieteellisen sijainnin
ilmoittamiseen käytetään TMC/ALERT-C -paikannuspisteistöä. Lisätietoa täällä.
Lisätietoa löytyy [TMC/ALERT-C](paikannusnimisto/) -sivulta.

[`/api/traffic-message/v1/locations/versions`](https://tie.digitraffic.fi/api/traffic-message/v1/locations/versions){:target="_blank"}\
[`/api/traffic-message/v1/locations/types`](https://tie.digitraffic.fi/api/traffic-message/v1/locations/types){:target="_blank"}\
[`/api/traffic-message/v1/locations`](https://tie.digitraffic.fi/api/traffic-message/v1/locations){:target="_blank"}\
[`/api/traffic-message/v1/locations/{id}`](https://tie.digitraffic.fi/api/traffic-message/v1/locations/35){:target="_blank"}

### Muuttuvien liikennemerkkien tiedot

[`/api/variable-sign/v1/signs`](https://tie.digitraffic.fi/api/variable-sign/v1/signs){:target="_blank"}\
[`/api/variable-sign/v1/signs/{id}`](https://tie.digitraffic.fi/api/variable-sign/v1/signs/KRM01V102){:target="_blank"}\
[`/api/variable-sign/v1/signs/history`](https://tie.digitraffic.fi/api/variable-sign/v1/signs/history?deviceId=KRM01V102){:target="_blank"}

Viesti sisältää muuttuvan liikennemerkin viimeisimmän tilan. Tällä hetkellä
tuettuja merkkejä ovat muuttuvat nopeusrajoitukset sekä varoitusmerkit.
Digitraffic julkaisee tilatiedot vain laiteryhmän master-laitteesta. Tämä
tarkoittaa sitä, että ajoradan vasemmalla puolella olevan merkin ja mahdollisen
ramppimerkin tietoja ei välitetä erikseen.

Varoitusmerkkien tyypit:

[`/api/variable-sign/v1/signs/code-descriptions`](https://tie.digitraffic.fi/api/variable-sign/v1/signs/code-descriptions){:target="_blank"}

Varoitusmerkit kuvina:

[`https://vayla.fi/tieverkko/liikennemerkit`](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}

Tiedot on saatavina myös datex2-muotoisena:

[`/api/variable-sign/v1/signs.datex2`](https://tie.digitraffic.fi/api/variable-sign/v1/signs.datex2){:target="_blank"}

Varoitusmerkissä mahdollisesti olevat []-merkkien sisällä olevat kyltit on
mahdollista generoida svg-muodossa:

[`/api/variable-sign/v1/images/ramppi_{number}`](https://tie.digitraffic.fi/api/variable-sign/v1/images/ramppi_123){:target="_blank"}\
[`/api/variable-sign/v1/images/tie_{number}`](https://tie.digitraffic.fi/api/variable-sign/v1/images/tie_321){:target="_blank"}

### Maanteiden kunnossapitotiedot

Väylävirasto vastaanottaa teiden kunnossapitourakoitsijoilta
kunnossapitoajoneuvojen reaaliaikaista sijainti- ja toimenpidetietoa. Tiedot
välittyvät ajoneuvoista urakoitsijoiden tietojärjestelmiin, joista ne edelleen
välitetään Väyläviraston Harja-järjestelmään. Digitraffic vastaanottaa myös nämä
tiedot ja julkaisee niitä avoimena datana alla kerrotuissa rajapinnoissa. Tiedot
päivittyvät keskimäärin minuutin välein. Harja datan domain on `state-roads`.

Tämän lisäksi tällä hetkellä tuodaan myös muutamien kuntien kunnossapitodataa.
Tämän datan domain on eri kuin `state-roads`.

Väylävirasto valmistelee myös vuorokautta vanhempien kunnossapidon
toteumatietojen julkaisua omissa avoimen datan palveluissaan.

#### Kunnossapidon domain

[`/api/maintenance/v1/tracking/domains`](https://tie.digitraffic.fi/api/maintenance/v1/tracking/domains){:target="_blank"}

Rajapinta palauttaa mahdolliset domainit. Domain kertoo mistä järjestelmästä
data tulee.

#### Ajoneuvojen tehtävätyypit

[`/api/maintenance/v1/tracking/tasks`](https://tie.digitraffic.fi/api/maintenance/v1/tracking/tasks){:target="_blank"}

Rajapinta palauttaa ajoneuvojen suorittamien tehtävien tarkemmat selitteet.

#### Ajoneuvojen seurantadata

[`/api/maintenance/v1/tracking/routes?domain=state-roads`](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes?domain=state-roads){:target="_blank"}

Rajapinta palauttaa ajoneuvon kulkeman reitin. Reitti ei täysin vastaa ajoneuvon
maastossa kulkemaa reittiä, koska julkaistava reitti muodostetaan yhdistelemällä
ajoneuvosta saatavat sijaintitiedot viivaksi ja erillistä reititystä tieverkolle
ei tehdä. Reitti voi olla myös pelkkä piste, jos ajoneuvolta ei ole saatu
useampaa seurantapistettä.

Uusi seuranta, jossa ei ole viitettä edeliseen muodostetaan aina kun:

- Ajoneuvon suorittama tehtävä muuttuu
- Kahden peräkkäisen vastaanotetun sijaintiviestin aikaväli on yli 5 minuuttia
- Kahden peräkkäisen vastaanotetun sijaintiviestin välinen laskennallinen
  ajonopeus on yli 140 km/h

Näillä käsittelyllä poistetaan suurimmat ajoneuvojen tuottamassa datassa
mahdollisesti esiintyvät virheet.

#### Ajoneuvon viimeisin sijainti

[`/api/maintenance/v1/tracking/routes/latest?domain=state-roads`](https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes/latest?domain=state-roads){:target="_blank"}

Rajapinta palauttaa viimeisimmät kunnossapitoajoneuvoista vastaanotetut
sijainti- ja tehtävätiedot

### Jalankulun ja pyöräilyn mittaustiedot

Jalankulun ja pyöräilyn mittaustietoja saadaan tällä hetkellä Oulun ja Turun lähistöiltä.

#### Kaikkien mittauspisteiden tiedot GeoJSON-muodossa

[`/api/counting-site/v2/sites`](https://tie.digitraffic.fi/api/counting-site/v2/sites){:target="_blank"}

#### Metatietoja

[`/api/counting-site/v2/directions`](https://tie.digitraffic.fi/api/counting-site/v2/directions){:target="_blank"}\
[`/api/counting-site/v2/domains`](https://tie.digitraffic.fi/api/counting-site/v2/domains){:target="_blank"}\
[`/api/counting-site/v2/travel-modes`](https://tie.digitraffic.fi/api/counting-site/v2/travel-modes){:target="_blank"}

#### Mittauspisteiden dataa json-muodossa

[`/api/counting-site/v2/values`](https://tie.digitraffic.fi/api/counting-site/v2/values){:target="_blank"}

#### Mittauspisteiden dataa CSV-muodossa

[`/api/counting-site/v2/values.csv`](https://tie.digitraffic.fi/api/counting-site/v2/values.csv?year=2025&month=1&siteId=300044494){:target="_blank"}

## MQTT WebSocket -rajapinnat

REST/JSON-rajapinnan lisäksi tarjolla on WebSocket-rajapinta, joka mahdollistaa
tieliikenteen automaattisten mittaustietojen (LAM), tiesääasemien tietojen sekä
maanteiden kunnossapitotietojen kuuntelemisen. Käytetty protokolla on MQTT over
WebSockets, joka mahdollistaa ainoastaan haluttujen tietojen vastaanoton
aiheiden avulla.

Tuotannon osoite on `wss://tie.digitraffic.fi:443/mqtt`.

Kirjautuessa tulee käyttää SSL-yhteyttä.

Pahon JS-clientia käyttäessä osoite on pelkkä `tie.digitraffic.fi` ja portti
`443`, esimerkki alempana.

Testin osoite on vastaavasti `tie-test.digitraffic.fi`.

Yksinkertainen asiakas sovellus selaimelle löytyy
[Tuki > MQTT esimerkkejä](/tuki/script-mqtt/) -sivulta.

### Aiheet

Jokaisen tarjottavan datalajin juuressa on myös aihe `status`. Viesti kertoo,
milloin data on viimeksi päivittynyt epookki sekunteina. Esim.:

```
status: {
  "updated" : 1676628995
}
```

Voit korvata `<id>`-osan `#`-merkillä, jolloin kuunnellaan koko joukon viestejä.
Esim. `tms-v2/#`

#### Tiesääasemien ajantasaiset mittaustiedot

- `weather-v2/<roadStationId>/<sensorId>`
- `weather-v2/status`

##### Sääaseman mittaustieto-viesti

```
{
    "value":11068,
    "time":1667973021
}
```

#### Ajantasaiset LAM mittaustiedot

- `tms-v2/<roadStationId>/<sensorId>`
- `tms-v2/status`

##### TMS-viesti

```
{
    "value":108,
    "time":1667972911,
    "start":1667966400,
    "end":1667970000
}
```

#### Liikennetiedotteet

- `traffic-message-v2/datex2/<situationType>` Viestin sisältö on Datex2 XML
  muotoa.
- `traffic-message-v2/simple/<situationType>` Viestin sisältö on
  liikennetiedotteiden simppeli JSON joka on gzip-pakattu ja base64-koodattu.

Mahdolliset situationType -arvot: `TRAFFIC_ANNOUNCEMENT`, `EXEMPTED_TRANSPORT`,
`WEIGHT_RESTRICTION`, `ROAD_WORK`

Esimerkki simppeli JSON pakattu ja koodattu arvo:
`H4sIAAAAAAAAAO1VS27bMBDd5xSE1rZCfWI7XtWIk9ZtqgSN0wBpg4KR6JiVRAokFSAIvOtRfIZeQBfrSKJs+RcUXXfjD+dx5s0bzszrEUKWfsmohYbIuqBE55JanfL0iYqUavlSWl7hoA28FozrCganoRAyYpxoqkrjN+Se2J6P+7jXQT3Hdr2ed9JHDwBeVI4zKTIqNavhxrViOieaCT6JqgjvbyfjE+zjUw97TaAVZtrwmH4ZXVxMzn6MguDqNjg7/3weTBu0lmQ2Y+GIc5HzkKaU69W982B8Pm6Az1QqcFoaTs2RpAklik5ZWuNd7Hpd7HRdf4oHQ9cdYs8eDNz7LRd78adDDw+9no29/gpPWqSMaLUOYEsIf8rJk6nIxFwpE2I6MWkzily/g0aKxTFJiI0uGYsp5xRUjYSmSJS/tUjzPKJKA2DKwC8Hw5zZaO0zEWGl6LoSpqQ5h9KfiagK2OusTc2NKXlMaJCnj1SWEKd/CPN1La/l2I5j+57VwgK/ULKsIWFyQ8/FMmFJUizRJZlrhrroY7FMVbFsZf0dAsiYphlDGSnPhugavgkkjCZKdItfjLPiN3I6LorTDlI5ZEUIRzckATXSYhkz2zJUFjuajKkmLFFb0khBolEUSarU5V7xqhfOUiJf6i7ZMoI5zTkLWUYSpqvuspqMWroYP+KZwTOpe65Ysp/FUnc/gBB0G2oqViFvcpGybUCL9y4lYy8N8K72mW5o2KQ62AFEDCQ3PD3P7W3YF1tESALNf3ZIu40KNO/P9Qe9naCcmGZrldp6k5rj+v1Naq1/GzQtRUPBo/813CfOP9ewf7iGrY58u4Y+Phn8ZQ0jJtcJW7fBp+DqLrCOti+uG39Wrz8zkB9W56V2d0LG13PYCTtWDUN/xKNxLvdNUmAu9aE9gocY37eHIeXR4R3iuLbnePe7A4tEEStDk2TCZ0KmKx5Wsxa66CdBMYXHWu0HBPsqFkrBwJxrnanh8XGyWiDVnrBn8OzrBQo/j9cLQwHFeuJbFysIbBfaOIipinOFpiSFJU9rsotGLnjiMIHDjYaysrngdcrYxdh1MF6HoymM4Mqma4f2Zpx3GzxNNBMrIprcZvBJ3xDVx5Wgi6PFH4BXin4LCQAA`
Voit kokeilla viestin purkamista esim.
[https://facia.dev/tools/compress-decompress/gzip-decompress/](https://facia.dev/tools/compress-decompress/gzip-decompress/)
-sivulla.

Tai komentoriviltä:

- Linux: `echo "<viesti>" | base64 -d | gzip -d`
- MacOS: `echo "<viesti>" | base64 -d -i - -o - | gzip -d`

Esimerkki JavaScript-koodi viestin pakkauksen purkamiseen löytyy
[JSFiddle](https://jsfiddle.net/jouniso/ab2x3kzd/latest/):stä.

#### Maanteiden kunnossapitotiedon viimeisin sijainti

- `maintenance-v2/routes/<domain>`
- `maintenance-v2/status`

Sallitu domain-parametrin arvot ovat `state-roads`, `autori-kuopio`,
`autori-oulu` and `paikannin-kuopio`.

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

Alla olevassa koodissa viitataan puuttuvaan muuttujaan **clientName**, täydennä
siihen sovelluksesi nimi.

**HUOM!** Mikäli et hae dataa jatkuvasti, sulje yhteys kutsumalla
client.disconnect().\
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

[Swagger-kuvauksesta]: https://tie.digitraffic.fi/swagger/

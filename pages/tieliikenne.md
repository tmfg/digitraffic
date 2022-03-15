---
layout: traffictype
permalink: /tieliikenne/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/swagger/swagger-spec.json
swagger-link: https://tie.digitraffic.fi/swagger/
hero-image: road
title: Tieliikenne
lang: fi
ref: road-traffic
intro: Avointa dataa Suomen tieverkolta.
links:
  - - Väylävirasto
    - https://vayla.fi
---

## Yleistä tietoa

Tieliikenteen tiedot syntyvät Fintrafficin hallinnoimissa tieliikenteen ohjaus- ja mittausjärjestelmissä.
Tieliikenteen avoimet tiedot sisältävät tällä hetkellä:

- Kelikamerat. Keli- ja liikennekameroiden kuvista saadaan tietoa tienpinnan tilasta sekä liikennetilanteesta. Rajapinnan kautta on haettavissa kaikkien julkisten kelikameroiden tiedot ja osoitelinkit mistä kelikameroiden kuvat löytyvät. Kameroita on käytössä reilut 470 kappaletta.

- Tiesääasemien tiedot. Tiesääasemat mittaavat tavallisten säätietojen (ilman lämpötilan ja suhteellinen kosteus, kastepistelämpötila, sade ja tuulitiedot jne) lisäksi tietoa tienpinnan tilasta erityisten tienpinta-anturien avulla. Suomen maanteillä on yli 350 tiesääasemapistettä, jotka sijaitsevat yleensä pääteiden varsilla. Rajapinnan kautta on noudettavissa tiesääasemien keräämät mittaustiedot, jotka päivittyvät minuutin välein.

- Tiejaksojen keliennusteet. Viesti sisältää keliennusteet, jotka päivittyvät viiden minuutin välein.

- LAM-mittaustiedot. Tiehen upotetulta induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista ajoneuvoluokittain. LAM-pisteitä on yli 450 kappaletta ympäri Suomea. [LAM-dokumentaatioon](lam) on kerätty LAM-dataan liittyviä selitteitä.

- Liikennetiedotteet. Tieliikenteen häiriötiedotteet, painorajoitukset, tietyöt ja erikoiskuljetukset ovat saatavissa Datex2 sekä Simppeli-JSON -muodossa.  

- TMC/ALERT-C paikannuspisteistö, jota käytetään mm. liikennetiedotteissa.

- Muuttuvien liikennemerkkien tiedot

- Maanteiden kunnossapitotiedot

- Jalankulun ja pyöräilyn mittaustiedot

- Metatiedot. Rajapintojen kautta on haettavissa tieliikenteen tiedonkeruupisteiden sijainti- ja tilatiedot. GeoJSON-formaatissa saatavat sijaintitiedot päivittyvät 12 tunnin välein ja tilatiedot tunnin välein.


<h2 id="sisältö">Sisältö</h2>

* Do not remove this line (it will not be displayed)
{:toc}


## REST/JSON-rajapinnat

### Rajapintojen Swagger-kuvaukset

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta]({{page.swagger-link}}){:target="_blank"}

### Kelikamerat

[```https://tie.digitraffic.fi/api/v1/data/camera-data```](https://tie.digitraffic.fi/api/v1/data/camera-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](https://tie.digitraffic.fi/api/v1/data/camera-data/C04507){:target="_blank"}

Viesti sisältää kaikkien julkisten kelikameroiden tiedot ja osoitteen mistä kelikamerakuvat löytyvät. Esim. esiasennon C0450701 kuva löytyy
osoitteesta [https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.
Kelikamerakuvat päivittyvät noin 10 minuutin välein.

![Kelikamerakuva C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/camera-stations```](https://tie.digitraffic.fi/api/v3/metadata/camera-stations){:target="_blank"}

Metadatasta kannattaa huomioida ainakin alla olevat kentät, joista voi päätellä onko kamera tai esiasento keruussa.

- Kameran kentät ```state``` ja ```collectionStatus```
- Esiasennon kenttä ```inCollection```


### Kelikamerakuvien viimeisen 24 h historia

Haluttujen kameroiden ja/tai esiasentojen historia saadaan rajapinnasta:

[```https://tie.digitraffic.fi/api/v3/data/camera-history/history?id={kameran tai esiasennon id}```](https://tie.digitraffic.fi/api/v3/data/camera-history/history?id=C0450701){:target="_blank"}

Rajapinta palauttaa linkit menneisiin kuviin. Pyynnölle voi antaa parametriksi myös ajanhetken miltä haluaa viimeisimmän kuvan, jolloin palautetaan vain yksi historiakuva esiasentoa kohden. 

Historian olemassaoloa haluttuna aikavälillä voikysyä rajapinnasta:

[```https://tie-test.digitraffic.fi/api/v3/data/camera-history/presences?id={kamera tai esiasento id}&from={ISO 8601 -aika}2&to={ISO 8601 -aika}```](https://tie-test.digitraffic.fi/api/v3/data/camera-history/presences?cameraOrPresetId=C0450701){:target="_blank"}


### Tiesääasemien ajantasaiset mittaustiedot

[```https://tie.digitraffic.fi/api/v1/data/weather-data```](https://tie.digitraffic.fi/api/v1/data/weather-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/weather-data/{id}```](https://tie.digitraffic.fi/api/v1/data/weather-data/{id}){:target="_blank"}

Viesti sisältää tiesääasemien viimeisimmät mittaustiedot.

Viestissä on kullekin tiesääasemalle kyseisen aseman anturiarvot.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/weather-stations```](https://tie.digitraffic.fi/api/v3/metadata/weather-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v3/metadata/weather-sensors){:target="_blank"}


#### Viimeisen 24h historia

Halutun tiesääaseman kaikkien anturien datan saa rajapinnasta:

[```https://tie.digitraffic.fi/api/beta/weather-history-data/{stationId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057){:target="_blank"}

Yksittäisen anturin datan saa rajapinnasta:

[```https://tie.digitraffic.fi/api/beta/weather-history-data/{stationId}/{sensorId}```](https://tie.digitraffic.fi/api/beta/weather-history-data/4057/1){:target="_blank"}

Molempiin kyselyihin on mahdollista rajata ajanhetkeä from={ISO 8061 -aika} ja to={ISO 8061 -aika} parametreillä. Oletuksena ilman from-parametriä kyselyt palauttavat vain viimeisimmän tunnin datan.

24h historia on vielä tarjolla vain beta-rajapintana.


### Ajantasaiset tiejaksojen keliennusteet

Viesti sisältää tiejaksokohtaiset keliennusteet ja ne päivitetään viiden minuutin välein.

[```https://tie.digitraffic.fi/api/v3/data/road-conditions```](https://tie.digitraffic.fi/api/v3/data/road-conditions){:target="_blank"}

Tiejaksokohtaiset keliennusteet. Keliennusteet päivitetään viiden minuutin välein.

[```https://tie.digitraffic.fi/api/v3/data/road-conditions/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v3/data/road-conditions/22/50/27/60){:target="_blank"}

Tiejaksokohtaiset keliennusteet halutulta alueelta.

[```https://tie.digitraffic.fi/api/v3/data/road-conditions/{roadNumber}```](https://tie.digitraffic.fi/api/v3/data/road-conditions/25){:target="_blank"}

Tiejaksokohtaiset keliennusteet halutulta tieltä.


Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/22/50/27/60){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/{roadNumber}```](https://tie.digitraffic.fi/api/v3/metadata/forecast-sections/25){:target="_blank"}

### Ajantasaiset LAM mittaustiedot

[```https://tie.digitraffic.fi/api/v1/data/tms-data```](https://tie.digitraffic.fi/api/v1/data/tms-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/tms-data/{id}```](https://tie.digitraffic.fi/api/v1/data/tms-data/23001){:target="_blank"}

Viesti sisältää LAM (Liikenteen Automaattinen Mittaus)–asemien mittaustiedot.

Viestissä on kullekin LAM-asemalle liikennemäärä molempiin suuntiin, ja mitattu keskinopeus molempiin suuntiin.

Tietoa päivitetään lähes reaaliaikaisesti, mutta ulospäin tarjottavaa viestiä pidetään välimuistissa minuutin ajan ts. se päivittyy minuutin välein.
Reaaliaikaiset tiedot on saatavissa WebSocket-rajapinnasta.

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/tms-sensors```](https://tie.digitraffic.fi/api/v3/metadata/tms-sensors){:target="_blank"}

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

* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=ROAD_WORK){:target="_blank"}
* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/datex2?inactiveHours=0&situationType=WEIGHT_RESTRICTION){:target="_blank"}

#### Liikennetiedotteiden Simppelin JSON -muotoisen datan rajapinnat

* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=EXEMPTED_TRANSPORT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=ROAD_WORK){:target="_blank"}
* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT){:target="_blank"}
* [```https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION```](https://tie.digitraffic.fi/api/v3/data/traffic-messages/simple?inactiveHours=0&includeAreaGeometry=false&situationType=WEIGHT_RESTRICTION){:target="_blank"}

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
* ALERT-C alue sijainti koodilla 27: [```http://tie.digitraffic.fi/api/v3/data/traffic-messages/area-geometries?id=27&lastUpdated=false```](http://tie.digitraffic.fi/api/v3/data/traffic-messages/area-geometries?id=27&lastUpdated=false){:target="_blank"}
* Kaikki alueet: [```http://tie.digitraffic.fi/api/v3/data/traffic-messages/area-geometries?lastUpdated=false```](http://tie.digitraffic.fi/api/v3/data/traffic-messages/area-geometries?lastUpdated=false){:target="_blank"}

### TMC/ALERT-C paikannuspisteistö

Häiriötiedotteiden, painorajoitusten ja tietöiden maantieteellisen sijainnin ilmoittamiseen käytetään TMC/ALERT-C -paikannuspisteistöä. Lisätietoa täällä.
Lisätietoa löytyy [TMC/ALERT-C](paikannusnimisto) -sivulta.

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}





### Muuttuvien liikennemerkkien tiedot

[```https://tie.digitraffic.fi/api/v3/data/variable-signs```](https://tie.digitraffic.fi/api/v3/data/variable-signs){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/data/variable-signs/{id}```](https://tie.digitraffic.fi/api/v3/data/variable-signs/{id}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/data/variable-signs/history/{id}```](https://tie.digitraffic.fi/api/v3/data/variable-signs/history/{id}){:target="_blank"}

Viesti sisältää muuttuvan liikennemerkin viimeisimmän tilan.  Tällä hetkellä tuettuja merkkejä ovat muuttuvat 
nopeusrajoitukset sekä varoitusmerkit. Digitraffic julkaisee tilatiedot vain laiteryhmän master-laitteesta. Tämä tarkoittaa sitä, että ajoradan vasemmalla puolella olevan merkin ja mahdollisen ramppimerkin tietoja ei välitetä erikseen.

Varoitusmerkkien tyypit:

[```https://tie.digitraffic.fi/api/v3/metadata/variable-signs/code-descriptions```](https://tie.digitraffic.fi/api/v3/metadata/variable-signs/code-descriptions){:target="_blank"}

Varoitusmerkit kuvina:

[```https://vayla.fi/tieverkko/liikennemerkit```](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}

Tiedot on saatavina myös datex2-muotoisena:

[```https://tie.digitraffic.fi/api/v1/variable-signs/datex2```](https://tie.digitraffic.fi/api/v1/variable-signs/datex2){:target="_blank"}

Varoitusmerkissä mahdollisesti olevat []-merkkien sisällä olevat kyltit on mahdollista generoida svg-muodossa:

[```https://tie.digitraffic.fi/api/v1/variable-signs/images/ramppi_123```](https://tie.digitraffic.fi/api/v1/variable-signs/images/ramppi_123){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/variable-signs/images/tie_321```](https://tie.digitraffic.fi/api/v1/variable-signs/images/tie_321){:target="_blank"}

### Maanteiden kunnossapitotiedot

Väylävirasto vastaanottaa teiden kunnossapitourakoitsijoilta kunnossapitoajoneuvojen reaaliaikaista sijainti- ja toimenpidetietoa. 
Tiedot välittyvät ajoneuvoista urakoitsijoiden tietojärjestelmiin, joista ne edelleen välitetään Väyläviraston Harja-järjestelmään.
Digitraffic vastaanottaa myös nämä tiedot ja julkaisee niitä avoimena datana alla kerrotuissa rajapinnoissa. 
Tiedot päivittyvät keskimäärin minuutin välein. 

Väylävirasto valmistelee myös vuorokautta vanhempien kunnossapidon toteumatietojen julkaisua omissa avoimen datan palveluissaan.

#### Ajoneuvon viimeisin sijainti

Rajapinta palauttaa viimeisimmät kunnossapitoajoneuvoista vastaanotetut sijainti- ja tehtävätiedot

[```https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/latest```](https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/latest){:target="_blank"}

#### Ajoneuvojen seurantadata

Rajapinta palauttaa ajoneuvon kulkeman reitin. Reitti ei täysin vastaa ajoneuvon maastossa kulkemaa reittiä, 
koska julkaistava reitti muodostetaan yhdistelemällä ajoneuvosta saatavat sijaintitiedot viivaksi ja 
erillistä reititystä tieverkolle ei tehdä. Reitti voi olla myös pelkkä piste, jos ajoneuvolta ei ole saatu useampaa seurantapistettä.

Uusi viivakohde muodostetaan aina kun:
- ajoneuvon suorittama tehtävä muuttuu
- kahden peräkkäisen vastaanotetun sijaintiviestin aikaväli on yli 5 minuuttia
- kahden peräkkäisen vastaanotetun sijaintiviestin välinen laskennallinen ajonopeus on yli 140 km/h
 
Näillä käsittelyllä poistetaan suurimmat ajoneuvojen tuottamassa datassa mahdollisesti esiintyvät virheet.

[```https://tie.digitraffic.fi/api/v3/data/maintenance/trackings```](https://tie.digitraffic.fi/api/v3/data/maintenance/trackings){:target="_blank"}

#### Ajoneuvojen tehtävätyypit

Rajapinta palauttaa ajoneuvojen suorittamien tehtävien tarkemmat selitteet.

[```https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/tasks```](https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/tasks){:target="_blank"}


#### Rajapintojen Swagger kuvaus

[```https://tie.digitraffic.fi/swagger/```](https://tie.digitraffic.fi/swagger/){:target="_blank"}

### Jalankulun ja pyöräilyn mittaustiedot

Jalankulun ja pyöräilyn mittaustietoja saadaan tällä hetkellä Oulun alueelta.  

Kaikkien mittauspisteiden tiedot GeoJSON-muodossa
[```https://tie.digitraffic.fi/api/counting-site/v1/counters```](https://tie.digitraffic.fi/api/counting-site/v1/counters){:target="_blank"}

Metatietoja
[```https://tie.digitraffic.fi/api/counting-site/v1/directions```](https://tie.digitraffic.fi/api/counting-site/v1/directions){:target="_blank"}
[```https://tie.digitraffic.fi/api/counting-site/v1/domains```](https://tie.digitraffic.fi/api/counting-site/v1/domains){:target="_blank"}
[```https://tie.digitraffic.fi/api/counting-site/v1/user-types```](https://tie.digitraffic.fi/api/counting-site/v1/user-types){:target="_blank"}

Mittauspisteiden dataa json-muodossa
[```https://tie.digitraffic.fi/api/counting-site/v1/values```](https://tie.digitraffic.fi/api/counting-site/v1/values){:target="_blank"}

Mittauspisteiden dataa CSV-muodossa
[```https://tie.digitraffic.fi/api/counting-site/v1/values.csv```](https://tie.digitraffic.fi/api/counting-site/v1/values.csv){:target="_blank"}

## WebSocket-rajapinnat

REST/JSON-rajapinnan lisäksi tarjolla on WebSocket-rajapinta, joka mahdollistaa tieliikenteen automaattisten mittaustietojen (LAM), tiesääasemien tietojen sekä maanteiden kunnossapitotietojen kuuntelemisen. Käytetty protokolla on MQTT over WebSockets, joka mahdollistaa ainoastaan haluttujen tietojen vastaanoton topicien avulla.

Tuotannon osoite on wss://tie.digitraffic.fi:61619/mqtt

Kirjautuessa tulee käyttää SSL-yhteyttä.  Lisäksi palveluun täytyy kirjautua seuraavin tiedoin:
* userName: ```digitraffic```
* password: ```digitrafficPassword```

Pahon JS-clientia käyttäessä osoite on pelkkä ```tie.digitraffic.fi``` ja portti ```61619```, esimerkki alempana.

Testin osoite on vastaavasti ```tie-test.digitraffic.fi```.

### Topicit

Voit korvata ```<id>```-osan ```#```-merkillä, jolloin kuunnellaan koko joukon viestejä. Esim. ```tms/#```

Topicit ovat seuraavanlaista muotoa.

#### Ajantasaiset LAM mittaustiedot 

- ```tms/<roadStationId>/<sensorId>```
- ```tms/status```

##### TMS-viesti

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

#### Tiesääasemien ajantasaiset mittaustiedot

- ```weather/<roadStationId>/<sensorId>```
- ```weather/status```

##### Sääaseman mittaustieto-viesti

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

#### Maanteiden kunnossapitotiedon viimeisin sijainti

- ```maintenance/tracking/#```
- ```maintenance/tracking/<trackingId>```
- ```maintenance/tracking/status```

##### Kunnossapitoviesti

```
{
  "type": "Feature",
  "properties": {
    "id": 247694,
    "time": "2020-06-08T13:23:52Z",
    "tasks": [
      "PAVING"
    ],
    "direction": 72
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      25.689415,
      62.598124,
      0
    ]
  }
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

## Käyttörajoitukset

Katso [Ohjeita ja lisätietoa rajapintojen käyttöön > Yleistä huomioitavaa](/ohjeita/#yleistä-huomioitavaa)

## Vanhentuneet ja poistuneet rajapinnat

### ~~Ajantasaiset linkkien sujuvuustiedot sisältäen matka-aikatiedot~~

Perjantaina 29.12.2017 päättyi pääkaupunkiseudun matka-aikajärjestelmän toiminta. Järjestelmä on tullut teknisen käyttöikänsä päähän eikä toiminta
vastaa enää asetettuja laatuvaatimuksia Tämän vuoksi myös Digitraffic lopetti toimittamasta PKS-järjestelmään liittyvää tietoa.

Vanhat sujuvuuden historiatiedot ovat saatavilla [täältä](https://tie.digitraffic.fi/api/v1/data/fluency-history/list.html){:target="_blank"}.

### ~~Vapaat nopeudet~~

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/23001){:target="_blank"}

Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet LAM – asemille (linkeille tietoa ei ole enää saatavilla, joten ne ovat tyjät).

Viesti päivitetään eräajotyyppisesti kerran vuorokaudessa ja ovat haettavissa aamulla kello kuuden jälkeen Suomen aikaa. Data kuitenkin päivitty huomattavasti harvemmin.

Jatkossa vapaat nopeudet tarjotaan suoraan [Ajantasaiset LAM mittaustiedot](#ajantasaiset-lam-mittaustiedot) -metadata-rajapinnassa.

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

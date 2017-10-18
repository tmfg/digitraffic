---
layout: traffictype
permalink: /tieliikenne/
swagger-source: https://tie.digitraffic.fi/api/v1/metadata/documentation/v2/api-docs?group=metadata-api
data: road
hero-image: road
title: Tieliikenne tietolähteet
intro: Tieliikenteen avoimen datan, rajapintojen sekä lähdekoodin tietolähteet.
links:
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-dokumentaatio", "http://tie.digitraffic.fi/api/v1/data/documentation/swagger-ui.html#/data"]
  - ["http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data"]
---


Tieliikenteen Digitraffic –palvelu tarjoaa pääosin Liikenneviraston ylläpitämistä tiedonkeruujärjestelmistä ajantasaista liikenne ja olosuhdetietoja Suomen tieverkolta. Tietolähteinä Tie-Digitraffic käyttää Liikenneviraston matka-aikatietopalvelua sekä liikenteen automaattisia mittauspisteitä (LAM), tiesääasemien, kelikamerakuvia sekä Tieliikennekeskusten häiriötiedotteita. Palvelun kautta jaettava avoin data on JSON ja Datex2 sanomia sekä WebSocket –streamia.

Tieliikenteen tietolajeista löytyvät seuraavat tietokokonaisuudet:

Sujuvuustiedot. Liikenteen ajantasaiset sujuvuustiedot ja matka-aikatiedot ovat saatavissa tällä hetkellä pääkaupunkiseudulta. Matka-aikapalvelu kerää tietoa ajoneuvojen matka-ajoista eri tieosuuksilla hyödyntäen kameratekniikkaa ja rekisterikilven automaattista tunnistusmenetelmää. Rajapinnan kautta on saatavissa 5 minuutin mediaanimatka, keskinopeus ja sujuvuusluokka.
Edellisen päivän sujuvuuden historiatiedot. Tiedot päivitetään eräajotyyppisesti kerran vuorokaudessa.

LAM-mittaustiedot. Tiehen upotetulta induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista ajoneuvoluokittain. LAM-pisteitä on yli 450 kappaletta ympäri Suomea.

Ajantasaiset vapaat nopeudet. Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille. Tiedot päivittyvät kerran vuorokaudessa.

Tieliikenteen häiriötiedotteet. Tieliikennekeskuksista saatavat liikenteen ensi- ja muut häiriötiedotteet, tiedotteet tietöistä sekä kelirikkotilanteista. Viestit ovat saatavissa kautta JSON ja Datex2 formaateissa.

Tiesääasemien tiedot. Tiesääasemat mittaavat tavallisten säätietojen (ilman lämpötilan ja suhteellinen kosteus, kastepistelämpötila, sade ja tuulitiedot jne) lisäksi tietoa tienpinnan tilasta erityisten tienpinta-anturien avulla. Suomen maanteillä on yli 350 tiesääasemapistettä, jotka sijaitsevat yleensä pääteiden varsilla. Rajapinnan kautta on noudettavissa tiesääasemien keräämät mittaustiedot, jotka päivittyvät minuutin välein.

Tiejaksojen keliennusteet. Viesti sisältää keliennusteet, jotka päivittyvät viiden minuutin välein.

Kelikamerat. Keli- ja liikennekameroiden kuvista saadaan tietoa tienpinnan tilasta sekä liikennetilanteesta. Rajapinnan kautta on haettavissa kaikkien julkisten kelikameroiden tiedot ja osoitelinkit mistä kelikameroiden kuvat löytyvät. Kameroita on käytössä reilut 470 kappaletta.

Metatiedot. Rajapintojen kautta on haettavissa tieliikenteen tiedonkeruupisteiden sijainti- ja tilatiedot. GeoJSON-formaatissa saatavat sijaintitiedot päivittyvät 12 tunnin välein ja tilatiedot tunnin välein. 



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

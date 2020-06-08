---
layout: traffictype
permalink: /tieliikenne/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
swagger-source: https://tie.digitraffic.fi/swagger/swagger-spec.json
hero-image: road
title: Tieliikenne
lang: fi
ref: road-traffic
intro: Avointa dataa Suomen tieverkolta.
links:
  - - Väylävirasto
    - https://vayla.fi
---

<h2 id="sisältö">Sisältö</h2>

* Do not remove this line (it will not be displayed)
{:toc}

## Yleistä tietoa

Tieliikenteen tiedot syntyvät Traffic Management Finlandin hallinnoimissa tieliikenteen ohjaus- ja mittausjärjestelmissä.
Tieliikenteen avoimet tiedot sisältävät tällä hetkellä:

- LAM-mittaustiedot. Tiehen upotetulta induktiosilmukalta saadaan tietoja liikennemääristä ja nopeuksista ajoneuvoluokittain. LAM-pisteitä on yli 450 kappaletta ympäri Suomea. [LAM-dokumentaatioon](lam) on kerätty LAM-dataan liittyviä selitteitä.

- Ajantasaiset vapaat nopeudet. Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille. Tiedot päivittyvät kerran vuorokaudessa.

- Tieliikenteen häiriötiedotteet. Tieliikennekeskuksista saatavat liikenteen ensi- ja muut häiriötiedotteet, tiedotteet tietöistä sekä kelirikkotilanteista. Viestit ovat saatavissa Datex2 formaatissa.

- Tieliikenteen painorajoitteet.  Viestit ovat saatavissa Datex2 formaatissa.

- Tieliikenteen pitkäkestoiset tietyöt. Viestit ovat saatavissa Datex2 formaatissa.

- Tiesääasemien tiedot. Tiesääasemat mittaavat tavallisten säätietojen (ilman lämpötilan ja suhteellinen kosteus, kastepistelämpötila, sade ja tuulitiedot jne) lisäksi tietoa tienpinnan tilasta erityisten tienpinta-anturien avulla. Suomen maanteillä on yli 350 tiesääasemapistettä, jotka sijaitsevat yleensä pääteiden varsilla. Rajapinnan kautta on noudettavissa tiesääasemien keräämät mittaustiedot, jotka päivittyvät minuutin välein.

- Tiejaksojen keliennusteet. Viesti sisältää keliennusteet, jotka päivittyvät viiden minuutin välein.

- Kelikamerat. Keli- ja liikennekameroiden kuvista saadaan tietoa tienpinnan tilasta sekä liikennetilanteesta. Rajapinnan kautta on haettavissa kaikkien julkisten kelikameroiden tiedot ja osoitelinkit mistä kelikameroiden kuvat löytyvät. Kameroita on käytössä reilut 470 kappaletta.

- Metatiedot. Rajapintojen kautta on haettavissa tieliikenteen tiedonkeruupisteiden sijainti- ja tilatiedot. GeoJSON-formaatissa saatavat sijaintitiedot päivittyvät 12 tunnin välein ja tilatiedot tunnin välein. 

## REST/JSON-rajapinnat
#### Rajapintojen Swagger kuvaus

Rajapintakuvaukset löytyvät [Swagger-dokumentaatiosta](https://tie.digitraffic.fi/swagger/){:target="_blank"}

Sekä metadataa että dataa päivitetään reaaliaikaisesti.

### Kelikamerat

[```https://tie.digitraffic.fi/api/v1/data/camera-data```](https://tie.digitraffic.fi/api/v1/data/camera-data){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/camera-data/{id}```](https://tie.digitraffic.fi/api/v1/data/camera-data/C04507){:target="_blank"}

Viesti sisältää kaikkien julkisten kelikameroiden tiedot ja osoitteen mistä kelikamerakuvat löytyvät. Esim. esiasennon C0450701 kuva löytyy
osoitteesta [https://weathercam.digitraffic.fi/C0450701.jpg](https://weathercam.digitraffic.fi/C0450701.jpg){:target="_blank"}.

![Kelikamerakuva C0450701](https://weathercam.digitraffic.fi/C0450701.jpg)

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/camera-stations```](https://tie.digitraffic.fi/api/v3/metadata/camera-stations){:target="_blank"}

### Kelikamerakuvien viimeisen 24 h historia

Haluttujen kameroiden ja/tai esiasentojen historia saadaan rajapinnasta:

[```https://tie.digitraffic.fi/api/v2/data/camera-history/history?id={kameran tai esiasennon id}```](https://tie.digitraffic.fi/api/v2/data/camera-history/history?id=C0450701){:target="_blank"}

Rajapinta palauttaa linkit menneisiin kuviin. Pyynnölle voi antaa parametriksi myös ajanhetken miltä haluaa viimeisimmän kuvan, jolloin palautetaan vain yksi historiakuva esiasentoa kohden. 

Historian olemassaoloa haluttuna aikavälillä voikysyä rajapinnasta:

[```https://tie-test.digitraffic.fi/api/v2/data/camera-history/presences?id={kamera tai esiasento id}&from={ISO 8601 -aika}2&to={ISO 8601 -aika}```](https://tie-test.digitraffic.fi/api/v2/data/camera-history/presences?cameraOrPresetId=C0450701){:target="_blank"}

### Ajantasaiset linkkien sujuvuustiedot sisältäen matka-aikatiedot

Perjantaina 29.12.2017 päättyi pääkaupunkiseudun matka-aikajärjestelmän toiminta. Järjestelmä on tullut teknisen käyttöikänsä päähän eikä toiminta
vastaa enää asetettuja laatuvaatimuksia Tämän vuoksi myös Digitraffic lopetti toimittamasta PKS-järjestelmään liittyvää tietoa.

Vanhat sujuvuuden historiatiedot ovat saatavilla [täältä](https://tie.digitraffic.fi/api/v1/data/fluency-history/list.html){:target="_blank"}.

### Vapaat nopeudet

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/{id}```](https://tie.digitraffic.fi/api/v1/data/free-flow-speeds/tms/23001){:target="_blank"}

Viesti sisältää kulloinkin voimassa olevat vapaat nopeudet sekä linkeille että LAM – asemille.

Kun linkki- tai LAM–asema vaihtuu talvinopeusrajoituksesta kesänopeuksiin tai päinvastoin, viestin sisältö muuttuu.

Viesti päivitetään eräajotyyppisesti kerran vuorokaudessa. Päivitetty viesti on haettavissa 03:30 Suomen aikaa.

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/tms-stations```](https://tie.digitraffic.fi/api/v3/metadata/tms-stations){:target="_blank"}

### Ajantasaiset tiejaksojen keliennusteet (v1)

[```https://tie.digitraffic.fi/api/v1/data/road-conditions```](https://tie.digitraffic.fi/api/v1/data/road-conditions){:target="_blank"}

Viesti sisältää tiejaksokohtaiset keliennusteet ja ne päivitetään viiden minuutin välein.

Metadatat:

[```https://tie.digitraffic.fi/api/v1/metadata/weather-stations```](https://tie.digitraffic.fi/api/v1/metadata/weather-stations){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/metadata/weather-sensors```](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/metadata/forecast-sections```](https://tie.digitraffic.fi/api/v1/metadata/forecast-sections){:target="_blank"}

### Ajantasaiset tiejaksojen keliennusteet (v2)

Keliennusteet v2 sisältää tarkemmat tiejaksot kuin v1.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions```](https://tie.digitraffic.fi/api/v2/data/road-conditions){:target="_blank"}

Tiejaksokohtaiset keliennusteet. Keliennusteet päivitetään viiden minuutin välein.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions/{minLongitude}/{minLatitude}/{maxLongitude}/{maxLatitude}```](https://tie.digitraffic.fi/api/v2/data/road-conditions/22/50/27/60){:target="_blank"}

Tiejaksokohtaiset keliennusteet halutulta alueelta.

[```https://tie.digitraffic.fi/api/v2/data/road-conditions/{roadNumber}```](https://tie.digitraffic.fi/api/v2/data/road-conditions/25){:target="_blank"}

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

### Häiriötiedotteet

V2 Datex2

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.xml```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.xml){:target="_blank"}

V2 JSON

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.json```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/traffic-incident.json){:target="_blank"}

V1

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/history?situationId={situationId}&year={year}&month={month}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/traffic-disorders-datex2/{situationId}){:target="_blank"}

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

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}

### Painorajoitteet

V2

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/weight-restriction.xml```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/weight-restriction.xml){:target="_blank"}

V1

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/history?situationId={situationId}&year={year}&month={month}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/weight-restrictions-datex2/{situationId}){:target="_blank"}

Painorajoitteet käyttävät TMC-paikannusmerkistöä painorajoitteiden maantieteellisen sijainnin ilmoittamiseen. Tarkempi kuvaus paikannusmerkistöstä löytyy [täältä](paikannusnimisto).

Viesteissä olevat päivämäärien muoto vaihtelee sen paikasta riippuen. 
Viestin published-tagin alla on utc ja localtime -aikakentät, joden sisältö 
on käytännössä sama ja ilmoitetaan UTC (Zulu) -aikana. Muut ajat varsinaisen 
Datex2-viestin sisällä ovat paikallista aikaa ja sisältävät täten aikavyöhykeen
poikkeaman UTC-ajasta. Päivämäärien ja kelloaikojen parsimisessa kannattaa
käyttää jotakin yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä
tahansa aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}

### Tietyöt

V2

[```https://tie.digitraffic.fi/api/v2/data/traffic-datex2/roadwork.xml```](https://tie.digitraffic.fi/api/v2/data/traffic-datex2/roadwork.xml){:target="_blank"}

V1

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2```](http://tie.digitraffic.fi/api/v1/data/roadworks-datex2){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/history?situationId={situationId}&year={year}&month={month}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId}```](https://tie.digitraffic.fi/api/v1/data/roadworks-datex2/{situationId}){:target="_blank"}

Tietyöt käyttävät TMC-paikannusmerkistöä tietöiden maantieteellisen sijainnin ilmoittamiseen. Tarkempi kuvaus paikannusmerkistöstä löytyy [täältä](paikannusnimisto).

Viesteissä olevat päivämäärien muoto vaihtelee sen paikasta riippuen. 
Viestin published-tagin alla on utc ja localtime -aikakentät, joden sisältö 
on käytännössä sama ja ilmoitetaan UTC (Zulu) -aikana. Muut ajat varsinaisen 
Datex2-viestin sisällä ovat paikallista aikaa ja sisältävät täten aikavyöhykeen
poikkeaman UTC-ajasta. Päivämäärien ja kelloaikojen parsimisessa kannattaa
käyttää jotakin yleiskäyttöistä kirjastoa, joka osaa parsia ajan oikein millä
tahansa aikavyöhykeellä ISO 8601 -muotoisesta päivämäärästä.

Metadatat:

[```https://tie.digitraffic.fi/api/v3/metadata/locations-versions```](https://tie.digitraffic.fi/api/v3/metadata/location-versions){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations-types```](https://tie.digitraffic.fi/api/v3/metadata/location-types){:target="_blank"}

[```https://tie.digitraffic.fi/api/v3/metadata/locations```](https://tie.digitraffic.fi/api/v3/metadata/locations){:target="_blank"}

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

### Muuttuvien liikennemerkkien tiedot

[```https://tie.digitraffic.fi/api/v2/data/variable-signs```](https://tie.digitraffic.fi/api/v2/data/variable-signs){:target="_blank"}

[```https://tie.digitraffic.fi/api/v2/data/variable-signs/{id}```](https://tie.digitraffic.fi/api/v2/data/variable-signs/{id}){:target="_blank"}

[```https://tie.digitraffic.fi/api/v2/data/variable-signs/history/{id}```](https://tie.digitraffic.fi/api/v2/data/variable-signs/history/{id}){:target="_blank"}

Viesti sisältää muuttuvan liikennemerkin viimeisimmän tilan.  Tällä hetkellä tuettuja merkkejä ovat muuttuvat 
nopeusrajoitukset sekä varoitusmerkit.

Varoitusmerkkien tyypit:

[```https://tie.digitraffic.fi/api/v2/metadata/variable-signs/code-descriptions```](https://tie.digitraffic.fi/api/v2/metadata/variable-signs/code-descriptions){:target="_blank"}

Varoitusmerkit kuvina:

[```https://vayla.fi/tieverkko/liikennemerkit```](https://vayla.fi/tieverkko/liikennemerkit){:target="_blank"}



### Maanteiden kunnossapitotiedot

Väylävirasto vastaanottaa teiden kunnossapitourakoitsijoilta kunnossapitoajoneuvojen reaaliaikaista sijainti- ja toimenpidetietoa. 
Tiedot välittyvät ajoneuvoista urakoitsijoiden tietojärjestelmiin, joista ne edelleen välitetään Väyläviraston Harja-järjestelmään.
Digitraffic vastaanottaa myös nämä tiedot ja julkaisee niitä avoimena datana alla kerrotuissa rajapinnoissa. 
Tiedot päivittyvät keskimäärin minuutin välein. 

Väylävirasto valmistelee myös vuorokautta vanhempien kunnossapidon toteumatietojen julkaisua omissa avoimen datan palveluissaan.

#### Ajoneuvon viimeisin sijainti

Rajapinta palauttaa viimeisimmät kunnossapitoajoneuvoista vastaanotetut sijainti- ja tehtävätiedot

[```https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/latest```](https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/latest){:target="_blank"}

#### Ajoneuvojen seurantadata

Rajapinta palauttaa ajoneuvon kulkeman reitin. Reitti ei täysin vastaa ajoneuvon maastossa kulkemaa reittiä, 
koska julkaistava reitti muodostetaan yhdistelemällä ajoneuvosta saatavat sijaintitiedot viivaksi ja 
erillistä reititystä tieverkolle ei tehdä. Reitti voi olla myös pelkkä piste, jos ajoneuvolta ei ole saatu useampaa seurantapistettä.

Uusi viivakohde muodostetaan aina kun:
- ajoneuvon suorittama tehtävä muuttuu
- kahden peräkkäisen vastaanotetun sijaintiviestin aikaväli on yli 5 minuuttia
- kahden peräkkäisen vastaanotetun sijaintiviestin välinen laskennallinen ajonopeus on yli 140 km/h
 
Näillä käsittelyllä poistetaan suurimmat ajoneuvojen tuottamassa datassa mahdollisesti esiintyvät virheet.

[```https://tie.digitraffic.fi/api/v2/data/maintenance/trackings```](https://tie.digitraffic.fi/api/v2/data/maintenance/trackings){:target="_blank"}

#### Ajoneuvojen tehtävätyypit

Rajapinta palauttaa ajoneuvojen suorittamien tehtävien tarkemmat selitteet.

[```https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/tasks```](https://tie.digitraffic.fi/api/v2/data/maintenance/trackings/tasks){:target="_blank"}


#### Rajapintojen Swagger kuvaus

[```https://tie.digitraffic.fi/swagger/#/Data v2```](https://tie.digitraffic.fi/swagger/#/Data%20v2){:target="_blank"}

## WebSocket-rajapinnat

REST/JSON-rajapinnan lisäksi tarjolla on WebSocket-rajapinta, joka mahdollistaa TMC-asemien tietojen kuuntelemisen. Käytetty protokolla on MQTT over WebSockets, joka mahdollistaa ainoastaan haluttujen tietojen vastaanoton topicien avulla.

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

#### Maanteiden kunnossapitotiedot

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

            client = new Paho.MQTT.Client("tie.digitraffic.fi", 61619, 'testclient_' + Date.now());

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

## Käyttörajoitukset

Pyyntöjä /mqtt -osoitteeseen on rajoitettu niin, että yhdestä ip-osoitteesta voi tehdä maksimissaan 5 pyyntöä minuutissa.

Pyyntöjä yksittäiseen kamerakuvaan(weathercam.digitraffic.fi) on rajoitettu niin, että yhdestä ip-osoitteesta voi tehdä 
maksimissaan 20 pyyntöä minuutissa yksittäiseen kamerakuvaan.

Pyyntöjä version 2 ja uudempiin rajapintoihin on rajoitettu niin, että yhdestä ip-osoitteesta voi tehdä maksimissaan 10 pyyntöä minuutissa 
yksittäiseen osoitteeseen.

## Swagger-rajapintakuvaus
<!-- After this swagger-ui.html is appended here automatically in traffic-type.html -->

---
layout: traffictype
permalink: /rautatieliikenne/
section: Tietolähteet
traffictypes: Rautatieliikenne
searchable: true
swagger-source: https://rata.digitraffic.fi/swagger/swagger.json
hero-image: rail
title: Rautatieliikenne tietolähteet
intro: Rautatieliikenteen avoimen datan, rajapintojen sekä lähdekoodin tietolähteet.
links:
  - ["Liikennevirasto", "http://www.liikennevirasto.fi"]
  - ["Swagger-dokumentaatio", "http://tie.digitraffic.fi/api/v1/data/documentation/swagger-ui.html#/data"]
  - ["http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data"]
---

# RATA.DIGITRAFFIC.FI

Tämän avoimen rajapinnan tarkoituksena on jakaa tietoa Suomen rataverkolla kulkevien junien aikatauluista, sijainneista, kokoonpanoista sekä täsmällisyystiedoista. Palvelun omistaa Liikennevirasto ja tietolähteenä toimii Liikenneviraston ratakapasiteetin ja liikenteenohjauksen Liike-perheen sovellukset sekä matkustajainformaatiojärjestelmä MIKU.

![alt text](images\liike.png "LIIKE") ![alt text](images\reaali.png "Reaali") ![alt text](images\loki.png "LOKI")

Rajapinnasta saatavien tietojen avulla on mahdollista vastata esimerkiksi seuraaviin kysymyksiin:

* Onko junani aikataulussa?
* Missä juna A menee tällä hetkellä?
* Millä junalla voin matkustaa paikasta A paikkaan B ajanhetkenä C?
* Mitkä junat lähtevät ja saapuvat asemalta seuraavaksi?
* Mistä vaunuista junani koostuu?
* Mitä palveluita vaunut tarjoavat?
* Oliko juna aikataulussa esimerkiksi kaksi kuukautta sitten?

Saatavilla on myös [Swagger-dokumentaatio](https://rata.digitraffic.fi/swagger/index.html)

Rajapinnasta saatavien tietojen käyttölupa on [Creative Commons Nimeä 4.0](#Kayttoehdot).

# Sisältö
- [Yleistä](#Yleistä)
    - [Palvelun kehittäjäyhteisö](#Palvelun kehittäjäyhteisö)
    - [Suunnittellut ominaisuudet](#Suunnittellut ominaisuudet)
    - [Toteutut ominaisuudet](#Toteutut ominaisuudet)
    - [HTTPS](#HTTPS)
    - [Dataa tukevat rajapinnat](#Dataa tukevat rajapinnat)
- [Rajapinnat](#Rajapinnat)
    - [Junien tiedot (/trains)](#Junien tiedot (/trains))
        - [Yhden junan tiedot](#Yhden junan tiedot)
        - [Päivän junien tiedot](#Päivän junien tiedot)
        - [Kaikkien junien seuranta](#Kaikkien junien seuranta)
        - [Kaikkien junien seuranta (WebSocket)](#Kaikkien junien seuranta (WebSocket))
        - [Liikennepaikan seuranta (WebSocket)](#Liikennepaikan seuranta (WebSocket))
        - [Yhden junan seuranta (WebSocket)](#Yhden junan seuranta (WebSocket))
        - [GTFS](#GTFS)
    - [Aktiivisten junien seuranta (/live-trains)](#Aktiivisten junien seuranta (/live-trains))
        - [Liikennepaikan saapuvat ja lähtevät junat (lukumäärärajoitus)](#Liikennepaikan saapuvat ja lähtevät junat (lukumäärärajoitus))
        - [Liikennepaikan saapuvat ja lähtevät junat (aikavälirajoitus)](#Liikennepaikan saapuvat ja lähtevät junat (aikavälirajoitus))
        - [Reittiperusteinen haku](#Reittiperusteinen haku)
        - [Kohta lähtevien tai saapuvien junien seuranta](#Kohta lähtevien tai saapuvien junien seuranta)
    - [Tarkempi seuranta kulkutietoviestien avulla (/train-tracking)](#Tarkempi seuranta kulkutietoviestien avulla (/train-tracking))
        - [Kaikkien junien seuranta](#Kaikkien junien seuranta)
        - [Yhden junan seuranta](#Yhden junan seuranta)
        - [Liikennepaikan seuranta](#Liikennepaikan seuranta)
        - [Raideosuuden seuranta](#Raideosuuden seuranta)
        - [Kaikkien junien seuranta (WebSocket)](#Kaikkien junien seuranta (WebSocket))
        - [Yhden junan seuranta (WebSocket)](#Yhden junan seuranta (WebSocket))
    - [Kokoonpanotiedot (/compositions)](#Kokoonpanotiedot (/compositions))
        - [Junan kokoonpanohaku](#Junan kokoonpanohaku)
        - [Junien kokoonpanohaku](#Junien kokoonpanohaku)
    - [Metatiedot (/metadata)](#Metatiedot (/metadata))
        - [Liikennepaikkatiedot](#Liikennepaikkatiedot)
        - [Operaattoritiedot](#Operaattoritiedot)
        - [Syyluokat](#Syyluokat)
        - [Syykoodit](#Syykoodit)
        - [Kolmannen tason syykoodit](#Kolmannen tason syykoodit)
        - [Junatyypit](#Junatyypit)
        - [Raideosuudet](#Raideosuudet)
        - [Herätepisteet](#Herätepisteet)        
- [Vastaustyypit](#Vastaustyypit)
    - [Junat](#Junat)
    - [Kokoonpanot](#Kokoonpanot)
    - [Kulkutietoviestit](#Kulkutietoviestit)
    - [Liikennepaikat](#Liikennepaikat)
    - [Operaattorit](#Operaattorit)
    - [Syyluokat](#Syyluokat)
    - [Syykoodit](#Syykoodit)
    - [Kolmannen tason syykoodit](#Kolmannen tason syykoodit)
    - [Junatyypit](#Junatyypit)
    - [Raideosuudet](#Raideosuudet)
    - [Herätepisteet](#Herätepisteet)
- [Versionumeroiden käyttö](#Versionumeroiden käyttö)
- [Käyttöehdot](#Käyttöehdot)

# Yleistä

## Palvelun kehittäjäyhteisö

Jos sinulla on kysymyksiä tietosisällöstä, kehitysehdotuksia tai tarvitset apua rajapinnan käyttöön, palvelulle on perustettu julkinen [rata.digitraffic.fi Google-ryhmä](https://groups.google.com/forum/#!forum/rata_digitraffic_fi).

## Suunnittellut ominaisuudet 2017

Listassa ensimmäisenä oleva pyritään toteuttamaan ensimmäisenä. Ominaisuuksia saatetaan vielä hyllyttää esim. operaattorien liikesalaisuussyistä tai odottamattomien teknisten vaikeuksien takia.

Otamme mielellämme vastaan kehitysehdotuksia [rata.digitraffic.fi -keskusteluryhmässä](https://groups.google.com/forum/#!forum/rata_digitraffic_fi) 

**Vuonna 2017 suunnitteilla olevat ominaisuudet:**

* GPS-sijainti
* Routeset-sanomat
     * Kun juna varaa edestään rataosia kuljettavaksi, tästä syntyy Routeset-sanomia. Myös TrackSet- ja TrackConfirm-sanomat pyritään julkaisemaan.

## Toteutetut ominaisuudet

* 03.10.2017
    * Junien tiedot GTFS-muodossa
* 22.08.2017
    * Swagger-dokumentaatio
* 20.06.2017
    * MIKU-järjestelmän käsiennusteet (Etelä-Suomen junien tarkemmat ennusteet)
* 18.05.2017
    * Säännöllisen ja tulevaisuuden kiireellisen kapasiteetin jakaminen
* 30.03.2017
    * Syytietojen (eli myöhästymissyyn) kolmas taso
* 24.02.2017
    * Junan lähtövalmiusilmoitus (trainReady).
* 31.01.2017
    * Junan aikataulun hyväksymishetki (timeTableAcceptanceDate).
* 24.01.2017
    * Rajapinta, joka palauttaa kaikki muuttuneet junat (/trains?version).
* 11.01.2017
    * Julkaistu junan aikataulun ratakapasiteettihakemuksen tyyppi.
* 02.01.2017
    * Syyluokkiin ja -koodeihin viitataan id:llä.
* 25.11.2016
    * Rajoitettu aikataulurajapinnan käyttöä. Lue alhaalta rajapintakuvauksesta lisätietoa.
* 23.11.2016
    * Uusi algoritmi ennusteiden tuottamiseen
* 15.06.2016
    * Kulkutietoviestit asemapaikoittain ja raideosuuksittain
* 16.03.2016
    * Mahdollisuus kuunnella junia websocketilla
    * Herätepisteet
* 29.12.2015
    * Toteumatiedon haku aikavälirajoituksin
* 18.11.2015
    * Aikatauluttomien junien kulkutietoviestit
* 08.10.2015
    * Raideosuudet
    * Kulkutietoviestit
    * Liikennepaikkaluetteloon lisää tietoja
* 05.03.2015
    * Operaattoriluettelo junanumeroavaruuksilla
    * Liikennepaikkaluettelo
    * Rajoitetun kokokoonpanotietojen julkaiseminen.
    * Reaaliaikaisen liikennetilanteen ja toteumatiedon julkaiseminen.
    * Voimassa olevan kapasiteetin julkaiseminen.
    
## HTTPS

Rajapinta tukee sekä HTTP- että HTTPS-muotoa. Suosittelemme HTTPS:n käyttöä.

## Dataa tukevat rajapinnat

* [https://rata.digitraffic.fi/infra-api/](https://rata.digitraffic.fi/infra-api/), josta löytyy Suomen rautatieverkon yksityiskohtainen kuvaus.
* [https://rata.digitraffic.fi/jeti-api/](https://rata.digitraffic.fi/jeti-api/), josta löytyy tietoja rataverkkoon kohdistuvista huoltotöistä.    

# Rajapinnat

Avoimen datan rajapinta tarjoaa sekä on REST- että WebSocket-rajapinnat, joiden vastaukset ovat JSON-formaattia. Rajapinnan tulokset tallennetaan välimuistiin, jossa säilytysaika riippuu tehdystä kyselystä ja muodostetusta vastauksesta, esimerkiksi asematiedot pidetään välimuistissa pidempään kuin reaaliaikaiset kulkutiedot.

Rajapinta on jaettu viiteen osaan:

* Junien tiedot (/trains)
* Aktiivisten junien seuranta (/live-trains)
* Kulkutietoviestit (/train-tracking)
* Kokoopanotiedot (/compositions)
* Metatiedot (/metadata)

Palvelussa on junien aikataulu- ja toteumatiedot noin 720 päivää taaksepäin. Tulevaisuuteen tiedot ovat saatavilla niin pitkälle kuin rataviranomainen on hyväksynyt operaattoreiden aikatauluhakemukset. Rajapinnasta saatavat aikataulut voivat muuttua aikataulujen muutosajankohdissa, jotka ovat aikataulukaudella 2017: 11.12.2016, 26.3.2017, 19.6.2017, 14.8.2017 ja 29.10.2017. Tämä koskee erityisesti tavaraliikennettä, mutta myös henkilöliikenteeseen voi tulla muutoksia näissä ajankohdissa. Tämän vuoksi sellaisten junien aikatauluihin, joiden lähtöpäivä on seuraavan muutosajankohdan jälkeen, ei voi täydellä varmuudella luottaa.

Tiedot päivittyvät noin 10 sekunnin viiveellä lähdejärjestelmistä rajapintapalveluun.

Käytettävä versio rajapinnasta kerrotaan osoitteessa. Esimerkiksi [http://rata.digitraffic.fi/api/v1/trains/latest/1](/api/v1/trains/latest/1), jossa v1 on rajapinnan versiotunnus.

Rajapinnan käytössä on yhtäaikaiseen käyttöön liittyviä rajoituksia. Yhdestä ip-osoitteesta voi olla maksimissaan kaksi yhtäaikaista yhteyttä ja tehdä viisi pyyntöä sekunnissa. Rajoituksen ylittyessä palvelu viivästyttää pyyntöjä tai antaa HTTP 429 -virheen. Palvelun tilaa voi seurata osoitteessa [http://uptime.statuscake.com/?TestID=KIvdE8ZaAe](http://uptime.statuscake.com/?TestID=KIvdE8ZaAe).

## Junien tiedot

Tämän rajapinnan kautta voidaan kysyä junien tietoja. Erilaisia tapoja kysyä junien tietoja ovat: junanumero, lähtöpäivämäärä, asema ja versio.

Toteumatiedoista osa perustuu liikenteenohjauksen tekemiin käsikirjauksiin, jonka vuoksi osa toteumakirjauksista tehdään tapahtumahetkeä 0-5 minuuttia myöhemmin (siis historiaan). Esimerkiksi Tampereen ja Seinäjoen liikennepaikoilla ei saada automaattisia toteumatietoja, vaan kaikki toteumat perustuvat käsikirjauksiin.

Automaattinen ennusteen laskeminen perustuu toteutuneisiin toteumiin. Historiasta voidaan laskea keskinopeus kuinka nopeasti juna on ajanut liikennepaikkavälin tietyllä kalustolla ja tätä keskinopeutta käytetään ennustenopeutena.

### Yhden junan tiedot

URL: `/trains/<train_number>?departure_date=<departure_date>&version=<version>`

Esimerkkejä
- [/trains/latest/1](../trains/latest/1)
- [/trains/2017-01-01/1](../trains/2017-01-01/1)

**Kuvaus**

Palauttaa yhden junan tiedot

**Hakuehdot**

| | Nimi | Formaatti | Esimerkki | Selitys
| --- | --- | --- | --- | ---
 ![alt text](images\required.png)| train_number | 1-99999 | 1, 3402 | Junan numero. Esimerkiksi junan "IC 59" junanumero on 59.
  ![alt text](images\optional.png)| departure_date | date(yyyy-mm-dd) | 2017-01-01 | Junan ensimmäisen lähdön päivämäärä. Jos parametriksi annetaan "latest", pyritään päättelemään juna joka on lähinnä nykyhetkeä. Päättely tehdään siten, että haetaan kaikki junanumeron junat lähipäiviltä ja etsitään nykyhetkeä lähinnä oleva aikataulurivi (rajauksella 4 tuntia taaksepäin, 16 tuntia eteenpäin. Vertailussa käytetään aikataulurivien suunnitteltuja aikoja.
  ![alt text](images\optional.png)| version | positive integer | 159123295871 | Versiorajoitus. Jos juna ei ole muuttunut sitten määritellyn version, palautetaan tyhjä tulos.
 ![alt text](images\required.png) Pakollinen ![alt text](images\optional.png) Vapaaehtoinen
 
 **Paluuarvo**
 
 Palauttaa [junat](#junat)-tyyppisen vastauksen.
 
 ### Päivän junien tiedot
 
 URL: `/trains/<departure_date>`
 
 Esimerkki: [/trains/2017-11-09](../trains?version=1234567891234)
 
 **Kuvaus**
 
 Palauttaa kaikki junat halutulta lähtöpäivämäärältä.
 
 **Hakuehdot**
 
| | Nimi | Formaatti | Esimerkki |
| --- | --- | --- | ---
 ![alt text](images\required.png) | departure_date | date (yyyy-mm-dd) | 2017-01-01
 ![alt text](images\required.png) Pakollinen ![alt text](images\optional.png) Vapaaehtoinen
 
 **Paluuarvo**
 
 Palauttaa [junat](#Junat)-tyyppisen vastauksen.
 
 ### Kaikkien junien seuranta
 
 URL: `/trains?version/<version>`
 
 Esimerkki: [/trains?version=1234567891234](../trains?version=1234567891234)
 
 **Kuvaus**
 
 Palauttaa kaikkien junien tiedot, jotka ovat muuttuneet sitten annetun versionumeron. Vastaus rajoitettu 3500 junaan.
 
 **Hakuehdot**
 
|   | Nimi | Formaatti | Esimerkki | Selitys
| --- | --- | --- | --- | ---
![alt text](images\optional.png)  | version | positive integer | 159123295871 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmalla versionumerolla muuttuneet junat.
 ![alt text](images\required.png) Pakollinen ![alt text](images\optional.png) Vapaaehtoinen
 
 **Paluuarvo**
 
 Palauttaa [junat](#Junat)-tyyppisen vastauksen.
 
 ### Kaikkien junien seuranta (WebSocket)
 
 Esimerkki: [esimerkki](examples/websocket-train-all.html)
 
 **Kuvaus**
 
 Websockettiin pistetään kaikki junat sitä mukaa kun ne muuttuvat.
 
 **Paluuarvo**
 
 Palauttaa [junat](#Junat)-tyyppisiä vastauksia.
 
 ### Liikennepaikan seuranta (WebSocket)
 
 Esimerkki: [esimerkki](examples/websocket-train-station.html)
 
 **Kuvaus**
 
 Websockettiin pistetään muuttunut juna, jos sillä on lähtö tai saapuminen parametrina annetulla liikennepaikalla.
 
 **Paluuarvo**
 
 Palauttaa [junat](#Junat)-tyyppisiä vastauksia.
 
 ### Yhden junan seuranta (WebSocket)
 
 Esimerkkejä:
 - [esimerkki #1](examples/websocket-train-specific-train-without-departure-date.html)
 - [esimerkki #1](examples/websocket-train-specific-train.html)
 
 **Kuvaus**
 
 Websockettiin pistetään yhden junan juna-tyyppiset tiedot.
 
 **Paluuarvo**
 
 Palauttaa [junat](#Junat)-tyyppisiä vastauksia.
 
 ### GTFS
 
 URL:t
 - [/trains/gtfs-all.zip](../trains/gtfs-all.zip)
 - [/trains/gtfs-passenger.zip](../trains/gtfs-passenger.zip)
 
 **Kuvaus**
 
 Junien tiedot saa myös GTFS-muodossa (General Transit Feed Specification). Paketti gtfs-all.zip sisältää kaikki junat ja gtfs-passenger.zip sisältää vain matkustajajunat.
 
 Paketti generoidaan uusiksi päivittäin noin klo 5:00. Se sisältää kaikki tulevaisuuden junat ja menneisyyden junat viimeiseltä seitsemältä päivältä.
 
 **Paluuarvo**
 
 Palauttaa [GTFS-muodossa](https://github.com/google/transit/blob/master/gtfs/spec/en/reference.md) olevan zip-paketin
 
 ## Aktiivisten junien seuranta (/live-trains)
 
 ### Liikennepaikan saapuvat ja lähtevät junat (lukumäärärajoitus)
 
 URL: `/live-trains/station/<station_shortcode>?arrived_trains=arrived_trains>&arriving_trains=arriving_trains> &departed_trains=<departed_trains>&departing_trains=<departing_trains>&version=<change_number>`
 
 Esimerkkejä:
 - [/live-trains/station/HKI](../live-trains/station/HKI)
 - [/live-trains/station/HKI?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false](../live-trains/station/HKI?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false)
 
 **Kuvaus**
 
 Palauttaa asemalla pysähtyvistä junista viimeksi lähteneet tai saapuneet, tai seuraavaksi lähtevät tai saapuvat.
 
 Parametreillä voidaan rajoittaa palautettavien junien määrää. Junien kokonaismäärän rajoitus on 1000. Rajoitusparametrien yhteenlaskettu summa ei siis voi olla tätä suurempi.
 
 Haku tehdään aikatauluaikojen perusteella taakse ja eteenpäin 24 tuntia. Tämä tarkoittaa, että harvaan liikennöidyllä liikennepaikkalla junien määrä saattaa olla pieni.
 
![warning](images/warn.png) Koska sama juna voi kuulua useampaan joukkoon (esim. saapunut juna voi olla yhtäaikaisesti myös lähtevä), palautettava kokonaismäärä on yleensä pienempi kuin parametrien summa.
 
 Oletuksena haulla palautetaan vain junat, jotka pysähtyvät asemalle. Parametrin "include_nonstopping" avulla voidaan palauttaa myös junat, jotka ajavat aseman ohi pysähtymättä.
 
 Versionumerohaulla ei palauteta junasta tietoa, mikäli junan tiedot eivät ole muuttuneet kyselyiden välillä. Tämä tarkoittaa, että tulosjoukon koko voi olla tällöin pienempi.
 
| | Nimi | Formaatti | Oletusarvo | Esimerkki | Selitys 
|---|---|---|---|---|---|
![alt text](images\required.png) | station | string |   | "HKI" | Aseman lyhenne. Esimerkiksi HKL, TPE, PSL. Lista lyhenteistä löytyy täältä.
![alt text](images\optional.png) | arrived_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta saapunutta junaa palautetaan maksimissaan.
![alt text](images\optional.png) | arriving_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta saapuvaa junaa palautetaan maksimissaan.
![alt text](images\optional.png) | departed_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta lähtenyttä junaa palautetaan maksimissaan.
![alt text](images\optional.png)  | departing_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta lähtevää junaa palautetaan maksimissaan.
![alt text](images\optional.png) | include_nonstopping | true/false | false | true | Palautetaanko aseman ohi pysähtymättä ajavat junat.
![alt text](images\optional.png) | version | positive integer |   | 159123295871 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmat tiedot.
![alt text](images\required.png) Pakollinen ![alt text](images\optional.png) Vapaaehtoinen
   
**Paluuarvo**

Palauttaa [junat](#Junat)-tyyppisen vastauksen.
   
### Liikennepaikan saapuvat ja lähtevät junat (aikavälirajoitus)

URL: `/live-trains/station/<station_shortcode>?minutes_before_departure=<minutes_before_departure>&minutes_after_departure=<minutes_after_departure>&minutes_before_arrival=<minutes_before_arrival>&minutes_after_arrival=<minutes_after_arrival>&version=<change_number>&includeNonstopping=<includeNonstopping`

Esimerkiksi: [/live-trains/station/HKI?minutes_before_departure=15&minutes_after_departure=15&minutes_before_arrival=15&minutes_after_arrival=15](../live-trains/station/HKI?minutes_before_departure=15&minutes_after_departure=15&minutes_before_arrival=15&minutes_after_arrival=15)

**Kuvaus**

Palauttaa asemalla pysähtyvistä junista viimeksi lähteneet tai saapuneet, tai seuraavaksi lähtevät tai saapuvat.

Parametreillä voidaan rajoittaa lähteviä ja saapuvia junia aikamääreiden avulla.

Aikavälirajoituksen maksimikoko on 24 tuntia. Tämä tarkoittaa, että harvaan liikennöidyllä liikennepaikkalla junien määrä saattaa olla pieni.

Oletuksena haulla palautetaan vain junat, jotka pysähtyvät asemalle. Parametrin "include_nonstopping" avulla voidaan palauttaa myös junat, jotka ajavat aseman ohi pysähtymättä.

Versionumerorajoituksen avulla voidaan suodattaa pois junat, jotka eivät ole muuttuneet sitten annetun versionumeron.

**Hakuehdot**

|  | Nimi | Formaatti | Oletusarvo | Esimerkki | Selitys
|---|---|---|---|---|---
![alt text](images\required.png) | station | string |   | "HKI" | Aseman lyhenne. Esimerkiksi HKL, TPE, PSL. Lista lyhenteistä löytyy täältä.
![alt text](images\required.png) | minutes_before_departure | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään ennen sen lähtöä.
 ![alt text](images\required.png)| minutes_after_departure | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään sen lähdön jälkeen.
 ![alt text](images\required.png)| minutes_before_arrival | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään ennen sen saapumista.
 ![alt text](images\required.png)| minutes_after_arrival | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään sen saapumisen jälkeen.
![alt text](images\optional.png) | include_nonstopping | true/false | false | true | Palautetaanko aseman ohi pysähtymättä ajavat junat.
![alt text](images\optional.png) | version | positive integer |   | 159123295871 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmat tiedot.
![alt text](images\required.png) Pakollinen ![alt text](images\optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [junat](#Junat)-tyyppisen vastauksen.

### Reittiperusteinen haku

URL: `/live-trains/station/<departure_station_code>/<arrival_station_code>?departure_date=<departure_date>&from=<from>&to=<to>&limit=<limit>`

Esimerkki: [/live-trains/station/HKI/TPE](../live-trains/station/HKI/TPE)

**Kuvaus**

Palauttaa junat, jotka kulkevat departure_station_code- ja arrival_station_code-asemien kautta ja pysähtyvät asemilla.

Haku palauttaa vain suorat junayhteydet.. Hakutulos ei siis sisällä operaattorin tarjoamia reittivaihtoehtoja, joissa matkustaja joutuu esimerkiksi vaihtamaan junaa. Päivämääräväli rajattu maksimissaan kahteen päivään.

Oletuksena haulla palautetaan vain junat, jotka pysähtyvät asemallilla. Parametrin "include_nonstopping" avulla voidaan palauttaa myös junat, jotka ajavat asemien ohi pysähtymättä.

**Hakuehdot**

|  | Nimi | Formaatti | Esimerkki | Selite
|---|---|---|--- |--- 
![alt text](images\required.png) | departure_station | string | "HKI" | Lähtöaseman lyhenne. Lyhennekoodit löytyvät täältä.
![alt text](images\required.png) | arrival_station | string | "RI" | Määränpääaseman lyhenne. Lyhennekoodit löytyvät täältä.
![alt text](images\optional.png) | departure_date | date(yyyy-mm-dd) | 2017-01-01 | Päivämäärä jolta junia haetaan. Jos lähtöpäivämäärä on tyhjä, etsitään seuraavan 24 tunnin aikana lähteviä junia.
![alt text](images\optional.png) | from | datetime(ISO 8601) | 2017-01-01T23:28:59.564Z | departure_date päivämäärän sijasta voidaan määritellä aikaväli, jolta junia haetaan. Tämä parametri määrittelee aikavälin alun. Päivämääräväliä verrataan junan aikataulun mukaisen lähtöaikaan reittihaun lähtöasemalta.
 ![alt text](images\optional.png)| to | datetime(ISO 8601) | 2017-01-01T23:28:59.564Z | Tämä parametri määrittelee aikavälin lopun. Jos tämä parametri jätetään tyhjäksi, haetaan junia seuraavalle 24 tunnille asti.
 ![alt text](images\optional.png)| limit | positive integer | 15 | Rajaa palautettavien junien määrää. Oletusarvo on 1000.
 ![alt text](images\optional.png)| include_nonstopping | true/false | false | Palautetaanko aseman ohi pysähtymättä ajavat junat.
![alt text](images\required.png) Pakollinen ![alt text](images\optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [junat](#Junat)-tyyppisen vastauksen.
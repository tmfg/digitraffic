# RATA.DIGITRAFFIC.FI

Tämän avoimen rajapinnan tarkoituksena on jakaa tietoa Suomen rataverkolla kulkevien junien aikatauluista, sijainneista, kokoonpanoista sekä täsmällisyystiedoista. Palvelun omistaa Liikennevirasto ja tietolähteenä toimii Liikenneviraston ratakapasiteetin ja liikenteenohjauksen Liike-perheen sovellukset sekä matkustajainformaatiojärjestelmä MIKU.

![alt text](images/liike.png "LIIKE") ![alt text](images/reaali.png "Reaali") ![alt text](images/loki.png "LOKI")

Rajapinnasta saatavien tietojen avulla on mahdollista vastata esimerkiksi seuraaviin kysymyksiin:

* Onko junani aikataulussa?
* Missä juna A menee tällä hetkellä?
* Millä junalla voin matkustaa paikasta A paikkaan B ajanhetkenä C?
* Mitkä junat lähtevät ja saapuvat asemalta seuraavaksi?
* Mistä vaunuista junani koostuu?
* Mitä palveluita vaunut tarjoavat?
* Oliko juna aikataulussa esimerkiksi kaksi kuukautta sitten?

Saatavilla on myös [Swagger-dokumentaatio](https://rata.digitraffic.fi/swagger/index.html)

Rajapinnasta saatavien tietojen käyttölupa on [Creative Commons Nimeä 4.0](#käyttoehdot).

# Sisältö
- [Yleistä](#yleistä)
    - [Palvelun kehittäjäyhteisö](#palvelun-kehittäjäyhteisö)
    - [Suunnittellut ominaisuudet](#suunnittellut-ominaisuudet)
    - [Toteutut ominaisuudet](#toteutut-ominaisuudet)
    - [HTTPS](#https)
    - [Dataa tukevat rajapinnat](#dataa-tukevat-rajapinnat)
- [Rajapinnat](#rajapinnat)
    - [Junien tiedot (/trains)](#junien-tiedot-trains)
        - [Yhden junan tiedot](#yhden-junan-tiedot)
        - [Päivän junien tiedot](#päivän-junan-tiedot)
        - [Kaikkien junien seuranta](#kaikkien-junien-seuranta)
        - [Kaikkien junien seuranta (WebSocket)](#kaikkien-junien-seuranta-websocket)
        - [Liikennepaikan seuranta (WebSocket)](#liikennepaikan-seuranta-websocket)
        - [Yhden junan seuranta (WebSocket)](#yhden-junan-seuranta-websocket)
        - [GTFS](#gtfs)
    - [Aktiivisten junien seuranta (/live-trains)](#aktiivisten-junien-seuranta-live-trains)
        - [Liikennepaikan saapuvat ja lähtevät junat (lukumäärärajoitus)](#liikennepaikan-saapuvat-ja-lähtevät-junat-lukumäärärajoitus)
        - [Liikennepaikan saapuvat ja lähtevät junat (aikavälirajoitus)](#liikennepaikan-saapuvat-ja-lähtevät-junat-aikavälirajoitus)
        - [Reittiperusteinen haku](#reittiperusteinen-haku)
        - [Kohta lähtevien tai saapuvien junien seuranta](#kohta-lähtevien-tai-saapuvien-junien-seuranta)
    - [Tarkempi seuranta kulkutietoviestien avulla (/train-tracking)](#tarkempi-seuranta-kulkutietoviestien-avulla-train-tracking)
        - [Kaikkien junien seuranta](#kaikkien-junien-seuranta)
        - [Yhden junan seuranta](#yhden-junan-seuranta)
        - [Liikennepaikan seuranta](#liikennepaikan-seuranta)
        - [Raideosuuden seuranta](#raideosuuden-seuranta)
        - [Kaikkien junien seuranta (WebSocket)](#kaikkien-junien-seuranta-websocket)
        - [Yhden junan seuranta (WebSocket)](#yhden-junan-seuranta-websocket)
    - [Kokoonpanotiedot (/compositions)](#kokoonpanotiedot-compositions)
        - [Junan kokoonpanohaku](#junan-kokoonpanohaku)
        - [Junien kokoonpanohaku](#junien-kokoonpanohaku)
    - [Metatiedot (/metadata)](#metatiedot-metadata)
        - [Liikennepaikkatiedot](lLiikennepaikkatiedot)
        - [Operaattoritiedot](#operaattoritiedot)
        - [Syyluokat](#syyluokat)
        - [Syykoodit](#syykoodit)
        - [Kolmannen tason syykoodit](#kolmannen-tason-syykoodit)
        - [Junatyypit](#junatyypit)
        - [Raideosuudet](#raideosuudet)
        - [Herätepisteet](#herätepisteet)        
- [Vastaustyypit](#vastaustyypit)
    - [Junat](#junat)
    - [Kokoonpanot](#kokoonpanot)
    - [Kulkutietoviestit](#kulkutietoviestit)
    - [Liikennepaikat](#liikennepaikat)
    - [Operaattorit](#operaattorit)
    - [Syyluokat](#syyluokat)
    - [Syykoodit](#syykoodit)
    - [Kolmannen tason syykoodit](#kolmannen-tason-syykoodit)
    - [Junatyypit](#junatyypit)
    - [Raideosuudet](#raideosuudet)
    - [Herätepisteet](#herätepisteet)
- [Versionumeroiden käyttö](#versionumeroiden-käyttö)
- [Käyttöehdot](#käyttöehdot)

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

## Junien tiedot (/trains)

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
 ![pakollinen](images/required.png)| train_number | 1-99999 | 1, 3402 | Junan numero. Esimerkiksi junan "IC 59" junanumero on 59.
  ![vapaaehtoinen](images/optional.png)| departure_date | date(yyyy-mm-dd) | 2017-01-01 | Junan ensimmäisen lähdön päivämäärä. Jos parametriksi annetaan "latest", pyritään päättelemään juna joka on lähinnä nykyhetkeä. Päättely tehdään siten, että haetaan kaikki junanumeron junat lähipäiviltä ja etsitään nykyhetkeä lähinnä oleva aikataulurivi (rajauksella 4 tuntia taaksepäin, 16 tuntia eteenpäin. Vertailussa käytetään aikataulurivien suunnitteltuja aikoja.
  ![vapaaehtoinen](images/optional.png)| version | positive integer | 159123295871 | Versiorajoitus. Jos juna ei ole muuttunut sitten määritellyn version, palautetaan tyhjä tulos.
  |
 ![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen
 
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
 ![pakollinen](images/required.png) | departure_date | date (yyyy-mm-dd) | 2017-01-01
 ![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen
 
 **Paluuarvo**
 
 Palauttaa [junat](#junat)-tyyppisen vastauksen.
 
 ### Kaikkien junien seuranta
 
 URL: `/trains?version/<version>`
 
 Esimerkki: [/trains?version=1234567891234](../trains?version=1234567891234)
 
 **Kuvaus**
 
 Palauttaa kaikkien junien tiedot, jotka ovat muuttuneet sitten annetun versionumeron. Vastaus rajoitettu 3500 junaan.
 
 **Hakuehdot**
 
|   | Nimi | Formaatti | Esimerkki | Selitys
| --- | --- | --- | --- | ---
![vapaaehtoinen](images/optional.png)  | version | positive integer | 159123295871 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmalla versionumerolla muuttuneet junat.
 ![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen
 
 **Paluuarvo**
 
 Palauttaa [junat](#junat)-tyyppisen vastauksen.
 
 ### Kaikkien junien seuranta (WebSocket)
 
 Esimerkki: [esimerkki](examples/websocket-train-all.html)
 
 **Kuvaus**
 
 Websockettiin pistetään kaikki junat sitä mukaa kun ne muuttuvat.
 
 **Paluuarvo**
 
 Palauttaa [junat](#junat)-tyyppisiä vastauksia.
 
 ### Liikennepaikan seuranta (WebSocket)
 
 Esimerkki: [esimerkki](examples/websocket-train-station.html)
 
 **Kuvaus**
 
 Websockettiin pistetään muuttunut juna, jos sillä on lähtö tai saapuminen parametrina annetulla liikennepaikalla.
 
 **Paluuarvo**
 
 Palauttaa [junat](#junat)-tyyppisiä vastauksia.
 
 ### Yhden junan seuranta (WebSocket)
 
 Esimerkkejä:
 - [esimerkki #1](examples/websocket-train-specific-train-without-departure-date.html)
 - [esimerkki #1](examples/websocket-train-specific-train.html)
 
 **Kuvaus**
 
 Websockettiin pistetään yhden junan juna-tyyppiset tiedot.
 
 **Paluuarvo**
 
 Palauttaa [junat](#junat)-tyyppisiä vastauksia.
 
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
![pakollinen](images/required.png) | station | string |   | "HKI" | Aseman lyhenne. Esimerkiksi HKL, TPE, PSL. Lista lyhenteistä löytyy täältä.
![vapaaehtoinen](images/optional.png) | arrived_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta saapunutta junaa palautetaan maksimissaan.
![vapaaehtoinen](images/optional.png) | arriving_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta saapuvaa junaa palautetaan maksimissaan.
![vapaaehtoinen](images/optional.png) | departed_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta lähtenyttä junaa palautetaan maksimissaan.
![vapaaehtoinen](images/optional.png)  | departing_trains | positive integer, 1-600 | 5 | 20 | Kuinka monta lähtevää junaa palautetaan maksimissaan.
![vapaaehtoinen](images/optional.png) | include_nonstopping | true/false | false | true | Palautetaanko aseman ohi pysähtymättä ajavat junat.
![vapaaehtoinen](images/optional.png) | version | positive integer |   | 159123295871 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmat tiedot.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen
   
**Paluuarvo**

Palauttaa [junat](#junat)-tyyppisen vastauksen.
   
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
![pakollinen](images/required.png) | station | string |   | "HKI" | Aseman lyhenne. Esimerkiksi HKL, TPE, PSL. Lista lyhenteistä löytyy täältä.
![pakollinen](images/required.png) | minutes_before_departure | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään ennen sen lähtöä.
 ![pakollinen](images/required.png)| minutes_after_departure | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään sen lähdön jälkeen.
 ![pakollinen](images/required.png)| minutes_before_arrival | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään ennen sen saapumista.
 ![pakollinen](images/required.png)| minutes_after_arrival | positive integer, 0-1440 |  | 20 | Kuinka monta minuuttia juna näytetään sen saapumisen jälkeen.
![vapaaehtoinen](images/optional.png) | include_nonstopping | true/false | false | true | Palautetaanko aseman ohi pysähtymättä ajavat junat.
![vapaaehtoinen](images/optional.png) | version | positive integer |   | 159123295871 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmat tiedot.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [junat](#junat)-tyyppisen vastauksen.

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
![pakollinen](images/required.png) | departure_station | string | "HKI" | Lähtöaseman lyhenne. Lyhennekoodit löytyvät täältä.
![pakollinen](images/required.png) | arrival_station | string | "RI" | Määränpääaseman lyhenne. Lyhennekoodit löytyvät täältä.
![vapaaehtoinen](images/optional.png) | departure_date | date(yyyy-mm-dd) | 2017-01-01 | Päivämäärä jolta junia haetaan. Jos lähtöpäivämäärä on tyhjä, etsitään seuraavan 24 tunnin aikana lähteviä junia.
![vapaaehtoinen](images/optional.png) | from | datetime(ISO 8601) | 2017-01-01T23:28:59.564Z | departure_date päivämäärän sijasta voidaan määritellä aikaväli, jolta junia haetaan. Tämä parametri määrittelee aikavälin alun. Päivämääräväliä verrataan junan aikataulun mukaisen lähtöaikaan reittihaun lähtöasemalta.
 ![vapaaehtoinen](images/optional.png)| to | datetime(ISO 8601) | 2017-01-01T23:28:59.564Z | Tämä parametri määrittelee aikavälin lopun. Jos tämä parametri jätetään tyhjäksi, haetaan junia seuraavalle 24 tunnille asti.
 ![vapaaehtoinen](images/optional.png)| limit | positive integer | 15 | Rajaa palautettavien junien määrää. Oletusarvo on 1000.
 ![vapaaehtoinen](images/optional.png)| include_nonstopping | true/false | false | Palautetaanko aseman ohi pysähtymättä ajavat junat.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [junat](#junat)-tyyppisen vastauksen.

### Kohta lähtevien tai saapuvien junien seuranta

URL: `/live-trains?version=<version>`

Esimerkkejä:
- [/live-trains?version=12345671234567](../live-trains?version=12345671234567)
- [/live-trains](../live-trains)

**Kuvaus**

Palauttaa kaikkien lähiaikoina kulussa olevien junien tiedot.

Kulussa oleva juna määritellään siten, että junan aikataulutapahtuman (suunniteltu, ennuste tai toteuma reitin jollain liikennepaikalla) hetkestä on kulunut alle 4 tuntia nykyhetkeen verrattuna.

**Hakuehdot**


 
|  | Nimi | Formaatti | Esimerkki | Selitys
  |---|---|---|--- |--- 
![pakollinen](images/required.png) | version | positive integer | 6403053026 | Versiorajoitus. Palauttaa kaikki junat, jotka ovat muuttuneet sitten version-version. Jos versionumeroa ei anneta, palautetaan uusimmat tiedot.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [junat](#junat)-tyyppisen vastauksen.

## Tarkempi seuranta kulkutietoviestien avulla (/train-tracking)

Liikennepaikkakohtaisten toteumien ja ennusteiden lisäksi junaa voidaan seurata ja paikantaa raideosuustarkkuudella kulkutietoviestien avulla

Kun juna saapuu raideosuudelle, aktivoituu raideosuuden anturi ja raideosuus varautuu kyseiselle junalle. Varatumisesta muodostuu "OCCUPY"-tyyppinen kulkutietoviesti. Junan poistuessa raideosuudelta syntyy puolestaan "RELEASE"-tyyppinen kulkutietoviesti. Kulkutietoviestit kertovat siis mitä raideosuuksia juna on varannut itselleen kuljettavaksi.

Kulkutietoviestejä voi seurata kahdella tapaa. Perinteisellä REST-rajapinalla (eli kuten esimerkiksi "live-trains"-liittymää) tai WebSocketeilla (STOMP-protokolla, versiot 1.0 - 1.2).

Kulkutietoviestejä kertyy päivittäin yli 300 000. On siis hyvä miettiä halutaanko hyödyntää kulkutietoviestejä vai luvussa 1.1 kuvattuja liikennepaikkakohtaisia toteumia ja ennusteita.

![warning](images/warn.png) Datan laatu ei ole aina optimaalista. Tunnettuja välillä esiintyviä vikoja:

* Seuraavan ja edellisen aseman/raideosuuden puuttuvat
* Junan lähtöpäivämäärä tyhjä
* Viestejä esiintyy tuplana (samat tiedot, eri id)

Kulkutietoviestit välitetään avoimen datan rajapintaan käytännössä sellaisena kuin ne saadaan kauko-ohjausjärjestelmistä. Virheellisiä viestejä lähettäviä kauko-ohjausjärjestelmiä pyritään korjaamaan jatkuvasti palautteen avulla.

### Kaikkien junien seuranta

URL: `/train-tracking?version=<version>`

Esimerkiksi: [/train-tracking?version=65403053026](../train-tracking?version=65403053026)

**Kuvaus**

Palauttaa kaikki kulkutietoviestit, joiden versionumero on suurempi kuin parametrina annettuna versio.

Maksimissaan palautetaan 2500 kulkutietoviestiä.

**Hakuehdot**

|  | Nimi | Formaatti | Esimerkki | Selitys
  |---|---|---|--- |--- 
![pakollinen](images/required.png) | version | positive integer | 6403053026 | Versionumero, jota uudemmat kulkutietoviestit palautetaan.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [Kulkutietoviestit](#kulkutietoviestit)-tyyppisen vastauksen.

### Yhden junan seuranta

URL: `/train-tracking/<departure_date>/<train_number>?version=<version>`

Esimerkki: [/train-tracking/2017-01-01/1?version=1000](../train-tracking/2017-01-01/1?version=1000)

**Kuvaus**

Palauttaa halutun yhden junan kulkutietoviestit.

![warning](images/warn.png) Kyselyyn otetaan mukaan myös kulkutietoviestit, joilla ei ole lähtöpäivämäärää (departureDate) edellisen ja seuraavan vuorokauden rajauksella. Tällöin saattaa palautua "eilisen" kulkutietoviestejä.

**Hakuehdot**

| | Nimi | Formaatti | Esimerkki | Selitys
|---|---|---|--- |--- 
![pakollinen](images/required.png) | train_number | 1-99999 | 1, 3402 | Junan numero. Esimerkiksi junan "IC 59" junanumero on 59.
![pakollinen](images/required.png) | departure_date | date(yyyy-mm-dd) | 2017-01-01 | Junan ensimmäisen lähdön päivämäärä. Jos arvo on "latest" (esim. train-tracking/latest/1) , palauttaa uusimman lähdön kulkutietoviestejä. Palauttaa lisäksi kulkutietoviestit ilman lähtöpäivämäärää +1..-1 päivän rajauksella.
![vapaaehtoinen](images/optional.png)  | version | positive integer | 159123295871 | Versiorajoitus. Jos juna ei ole muuttunut sitten määritellyn version, palautetaan tyhjä tulos. Jos tyhjä, ei tehdä versiorajoitusta.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [Kulkutietoviestit](#kulkutietoviestit)-tyyppisen vastauksen.

###Liikennepaikan seuranta

URL: `/train-tracking/station/<station>/<departure_date>`

Esimerkki: [/train-tracking/station/JY/2017-08-01](../train-tracking/station/JY/2017-08-01)

**Kuvaus**

Palauttaa liikennepaikan kulkutietoviestit.

![warning](images/warn.png) Kyselyyn otetaan mukaan myös kulkutietoviestit, joilla ei ole lähtöpäivämäärää (departureDate) edellisen ja seuraavan vuorokauden rajauksella. Tällöin saattaa palautua "eilisen" kulkutietoviestejä.

**Hakuehdot**

| | Nimi | Formaatti | Esimerkki | Selitys
|---|---|---|--- |--- 
![pakollinen](images/required.png)  | station | string | "HKI" | Liikennepaikan lyhenne. Lyhennekoodit löytyvät täältä
![pakollinen](images/required.png)  | departure_date | date(yyyy-mm-dd) | 2017-01-01 | Junan ensimmäisen lähdön päivämäärä. Palauttaa lisäksi kulkutietoviestit ilman lähtöpäivämäärää hakuparametria seuraavalta päivältä kello 16:00 asti.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [Kulkutietoviestit](#kulkutietoviestit)-tyyppisen vastauksen.

### Raideosuuden seuranta

URL: `/train-tracking/station/<station>/<departure_date>/<track_section>`

Esimerkkejä:
- [/train-tracking/station/PSL/2017-01-01/293](../train-tracking/station/PSL/2017-01-01/293)
- [/train-tracking/station/PSL/latest/293](../train-tracking/station/PSL/latest/293)
- [/train-tracking/station/PSL/latest/293?limit=150](../train-tracking/station/PSL/latest/293?limit=150)

**Kuvaus**

Palauttaa liikennepaikan raideosuuden kulkutietoviestit.

![warning](images/warn.png) Kyselyyn otetaan mukaan myös kulkutietoviestit, joilla ei ole lähtöpäivämäärää (departureDate) edellisen ja seuraavan vuorokauden rajauksella. Tällöin saattaa palautua "eilisen" kulkutietoviestejä.

**Hakuehdot**

|  | Nimi | Formaatti | Esimerkki | Selitys
|---|---|---|--- |--- 
 ![pakollinen](images/required.png)| station | string | "HKI" | Liikennepaikan lyhenne. Lyhennekoodit löytyvät täältä
 ![pakollinen](images/required.png)| track_section | string | "001" | Liikennepaikan raideosuuden lyhenne. Lyhennekoodit löytyvät täältä
 ![pakollinen](images/required.png)| departure_date | date (yyyy-mm-dd) | 2017-01-01 | Kulkutietoviestiin liittyvän junan ensimmäisen lähdön päivämäärä. Palauttaa lisäksi kulkutietoviestit ilman lähtöpäivämäärää hakuparametria seuraavalta päivältä kello 16:00 asti. Jos arvo on "latest", palautetaan uusimpia kulkutietoviestejä.
 ![vapaaehtoinen](images/optional.png) | limit | positive integer | 100 | Kuinka monta uusinta kulkutietoviestiä kyselyssä palautetaan. Maksimiarvo 1000. Tämä rajaus poissulkee departure_date-rajauksen. Jos departure_date- tai limit-rajoitusta ei anneta, käytetään limit-rajoitusta.
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [Kulkutietoviestit](#kulkutietoviestit)-tyyppisen vastauksen.

### Kaikkien junien seuranta (WebSocket)

Esimerkki: [esimerkki](examples/websocket-train-running-message-all.html)

**Kuvaus**

Websockettiin pistetään kaikkien junien kulkutietoviestit.

**Paluuarvo**

Palauttaa [Kulkutietoviestit](#kulkutietoviestit)-tyyppisiä vastauksia.

### Yhden junan seuranta (WebSocket)

Esimerkkejä:
- [esimerkki 1](examples/websocket-train-running-message-specific-train-without-departure-date.html)
- [esimerkki 2](examples/websocket-train-running-message-specific-train.html)

**Kuvaus**

WebSockettiin pistetään yhden tietyn junan kulkutietoviestit. Jos departure_date jätetään tyhjäksi, ei tehdä departure_date-rajoitusta.

**Paluuarvo**

Palauttaa [Kulkutietoviestit](#kulkutietoviestit)-tyyppisiä vastauksia.

## Kokoonpanotiedot (/compositions)

Kokoonpanotietoja tulee junille 0-5 tuntia ennen junan lähtö tai pysähdystä, jossa kokoonpano muuttuu.

![warning](images/warn.png) Moottorivaunut (esimerkiksi tyypit Sm3, Sm4, Sm5) on yleisesti ilmoitettu kokoonpanoissa vaunuina.

### Junan kokoonpanohaku

URL: `/compositions/<departure_date>/<train_number>`

Esimerkki: [/compositions/2017-01-01/1](../compositions/2017-01-01/1)

**Kuvaus**

Palauttaa yksittäisen junan kokoonpanotiedot tiettynä päivämääränä.

**Hakuehdot**

 | |Nimi|Formaatti|Selitys|
|---|---|---|--- 
 ![pakollinen](images/required.png) | train_number | 1-99999 | 1 | Junan numero. Esimerkiksi junan "IC 59" junanumero on 59.
 ![pakollinen](images/required.png) | departure_date | date(yyyy-mm-dd) | 2017-01-01 | Lähtöpäivämäärä
![pakollinen](images/required.png) Pakollinen ![vapaaehtoinen](images/optional.png) Vapaaehtoinen

**Paluuarvo**

Palauttaa [Kokoonpanot](#kokoonpanot)-tyyppisen vastauksen.

### Junien kokoonpanohaku

URL: `/compositions/<departure_date>`

Esimerkki: [/compositions/2017-01-01](../compositions/2017-01-01)

**Kuvaus**

Palauttaa junien kokoonpanotiedot halutulta vuorokaudelta.

**Hakuehdot**

| |Nimi|Formaatti|Esimerkki
|---|---|---|--- 
 ![pakollinen](images/required.png)|departure_date|date(yyyy-mm-dd)|2017-01-01

**Paluuarvo**

Palauttaa [Kokoonpanot](#kokoonpanot)-tyyppisen vastauksen.

## Metatiedot

Palvelun metatietojen hakurajapinta.

### Liikennepaikkatiedot

URL: [metadata/stations](../metadata/stations)

**Kuvaus**

Palauttaa palvelun liikennepaikkojen tiedot. Tiedot päivittyvät lähdejärjestelmästä päivittäin n. klo 1:00.

**Paluuarvo**

Palauttaa [Liikennepaikat](#liikennepaikat)-tyyppisen vastauksen.

### Operaattoritiedot

URL: [metadata/operators](../metadata/operators)

**Kuvaus**

Palauttaa palvelun operaattoreiden tiedot. Tiedot päivittyvät lähdejärjestelmästä päivittäin n. klo 1:00.

**Paluuarvo**

Palauttaa [Operaattorit](#operaattorit)-tyyppisen vastauksen.

### Syyluokat

URL: [metadata/cause-category-codes](..metadata/cause-category-codes)

**Kuvaus**

Palauttaa listan palvelussa aktiivisesti käytössä olevista syyluokista. Syyluokat ovat yleisiä kategorioita syytiedoille. Kaikki syyluokat julkaistaan AvoinData-palvelun kautta. Jos haluat listaukseen mukaan käytöstä poistuneet tai käyttöön lisättävät syyluokat, lisää osoitteeseen parametri `show_inactive=true`.

**Paluuarvo**

Palauttaa Palauttaa [Syyluokat](#syyluokat)-tyyppisen vastauksen.-tyyppisen vastauksen.

### Syykoodit

URL: [metadata/detailed-cause-category-codes](..metadata/detailed-cause-category-codes)

**Kuvaus**

Palauttaa listan palvelussa käytössä olevista syykoodeista. Jokainen syyluokka on jaettu syykoodeihin eli syykoodi on syyluokan alempi taso. Kaikkia syykoodeja ei julkaista. Jos haluat listaukseen mukaan käytöstä poistuneet tai käyttöön lisättävät syykoodit, lisää osoitteeseen parametri `show_inactive=true`.

**Paluuarvo**

Palauttaa [Syykoodit](#syykoodit)-tyyppisen vastauksen.

### Kolmannen tason syykoodit

URL: [metadata /third-cause-category-codes](..metadata/third-cause-category-codes)

**Kuvaus**

Palauttaa listan palvelussa käytössä olevista kolmannen tason syykoodeista. Kolmannen tason syykoodi on syykoodin alempi taso. Kaikkia kolmannen tason syykoodeja ei julkaista. Jos haluat listaukseen mukaan käytöstä poistuneet tai käyttöön lisättävät kolmannen tason syykoodit, lisää osoitteeseen parametri `show_inactive=true`.

**Paluuarvo**

Palauttaa [Kolmannen tason syykoodit](#kolmannen tason syykoodit)-tyyppisen vastauksen.

### Junatyypit

URL: [metadata/train-types](..metadata/train-types)

**Kuvaus**

Palauttaa listan palvelussa käytössä olevista junatyypeista (esim. IC, P, P). Jokaisella junatyypillä on yläkäsitteenä junalaji (esim. lähijuna, kaukojuna, tavarajuna).

**Paluuarvo**

Palauttaa [Junatyypit](#junatyypit)-tyyppisen vastauksen.

### Raideosuudet

URL: [metadata/track-sections](..metadata/track-sections)

**Kuvaus**

Palauttaa listan raideosuuksista. Raideosuus on pienin osuus raiteesta, jonka yksittäinen juna voi varata käyttöönsä ja näin muodostaa turvallisen kulkureitin. Raideosuudella voi siis sijaita maksimissaan yksi juna.

Lista ei kata kaikkia kulkutietoviesteissä esiintyviä raideosuuksia. Datan laatua pyritään parantamaan.

**Paluuarvo**

Palauttaa [Raideosuudet](#raideosuudet)-tyyppisen vastauksen.

### Herätepisteet

URL: [metadata/train-running-message-rules](..metadata/train-running-message-rules)

**Kuvaus**

Herätepiste kuvaa miten kulkutietoviesti muunnetaan aikataulurivin toteumaksi taustajärjestelmässä.

Esimerkiksi kun saadaan kulkutietoviesti, joka vastaa herätepisteessä määriteltyä liikennepaikkaa, raideosuutta, varautumisen tyyppiä ja seuraavaa liikennepaikkaa, haetaan kulkutietoviestissä määritellyn junan aikataulurivi, joka vastaa herätepisteessä määritelty liikennepaikkaa ja aikataulurivityyppiä. Aikatauluriville kirjataan toteuma, joka on kulkutietoviestin aikaleima lisättynä offset-arvolla.

**Paluuarvo**

Palauttaa [Herätepisteet](#herätepisteet)-tyyppisen vastauksen.

## Versionumeroiden käyttö

Useissa rajapinnan pyynnöissä parametrina on mukana `version`, joka rajaa vastauksesta pois junat, jotka eivät ole päivittyneet sitten `version` määrittelemän versionumeron.

Esimerkiksi kysely [/live-trains/station/HKI?arrived_trains=5](..//live-trains/station/HKI?arrived_trains=5) saattaisi palauttaa seuraavan vastauksen:

```
[
   {
      "trainNumber":44,
      "departureDate":"2017-01-01",
      "operatorUICCode":10,
      "operatorShortCode":"vr",
      "trainType":"S",
      "trainCategory":"Long-distance",
      "runningCurrently":true,
      "cancelled":false,
      "version":3657782905,
      "timeTableRows":...
```      
Jos kyselyyn lisättäisiin versionumero [/live-trains/station/HKI?arrived_trains=5&version=3657782905](../live-trains/station/HKI?arrived_trains=5&version=3657782905), ei junaa 44 palautettaisi vastauksessa ennenkuin se on muuttunut.

Vastaanottajan on siis parsittava vastauksesta suurin versionumero ja käytettävä sitä seuraavassa kyselyssä parametrina.

## Käyttöehdot

Rajapinnasta saatavien tietojen käyttölupa on [Creative Commons Nimeä 4.0](http://creativecommons.org/licenses/by/4.0/).

Digitraffic, jonka tekijä on [Liikennevirasto](http://www.liikennevirasto.fi/), on lisensoitu [Creative Commons Nimeä 4.0 Kansainvälinen](http://creativecommons.org/licenses/by/4.0/)-lisenssillä.

 ![Creative Commons -lisenssi](images/cc4.png)

Tämän lisenssin antamia oikeuksia laajempia lupia voi olla saatavilla osoitteessa [http://www.liikennevirasto.fi](http://www.liikennevirasto.fi).
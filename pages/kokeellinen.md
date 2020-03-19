---
layout: traffictype
permalink: /kokeellinen/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: Kokeelliset tietolähteet
lang: fi
ref: kokeellinen
intro: Avointa dataa Suomen tieverkolta.
---

Kokeelliset tietolähteet tarjoavat erilaisten kokeellisten hankkeiden tietoja avoimena datana.
Kokeellisuus tarkoittaa sitä, että tiedot ovat tarjolla mahdollisesti rajatun ajan ja niiden saatavuus, ajantasaisuus ja sisältö voi muuttua 
odottamatta.

Tällä hetkellä tarjolla ovat seuraavat kokeellisen tietolähteet.

## Nordicway2-tiedotteet

NordicWay2 -hankkeessa tavoitellaan turvallisempaa liikennettä maiden rajojen yli toimivien olosuhde- ja häiriöviestipalveluiden avulla sekä tutkitaan tieliikenteen automaatiota arktisissa olosuhteissa. Hanke saa rahoitusta Euroopan Komission Verkkojen Eurooppa -ohjelmasta vuosina 2017-2020. Hankkeen toteuttavat yhteistyössä Suomen, Ruotsin, Norjan ja Tanskan tieviranomaiset sekä yritykset. Suomessa NordicWay2:n toteuttajina ovat Liikennevirasto ja Liikenteen turvallisuusvirasto Trafi. Hanke on jatkoa vuosien 2015-2017 NordicWay-hankkeelle ja lisäksi se on osa Liikennelabra-yhteistyötä.

Hankkeen aikana Suomessa toteutetaan tuotantokokeilu, jossa rakennetaan toimintamalleja Suomen olosuhteisiin sopivien tieliikenteen olosuhde- ja häiriöviestien, kuten sääolosuhteiden ja vaaranpaikojen jakamiseen. Tuotantokokeilussa viestejä välitetään tienkäyttäjille matkaviestiverkossa.

Lisätietoja täältä: [```https://www.nordicway.net```](https://www.nordicway.net)

[```https://tie.digitraffic.fi/api/beta/nw2/annotations```](https://tie.digitraffic.fi/api/beta/nw2/annotations)

[```https://tie.digitraffic.fi/api/beta/nw2/annotations?author={author}```](https://tie.digitraffic.fi/api/beta/nw2/annotations?author={author})

Rajapinta palauttaa voimassaolevat tiedotteet GeoJSON-muodossa.  Hakua on mahdollista rajata tuottajan mukaan.  Tiedotteilla on useita tuottajia,
ja tietojen lähde täytyy ilmoittaa sovelluksessasi lähdekohtaisesti:

Tietojen lähde: \<author\> / NordicWay2, CC 4.0 BY

Tietojen lähde: Vaisala Oy / NordicWay2, CC 4.0 BY

Tietojen lähde: InfoTripla Oy / NordicWay2, CC 4.0 BY


## Siltojen värähtelytiedot

Aurora-hanke on kansainvälisesti ainutlaatuinen älykkään automaattisen liikenteen testialue ja osaamiskeskus arktisissa olosuhteissa Tunturi-Lapissa.
Siihen liittyvän kokeilutien siltojen värähtelyä mitataan kiihtyvyysantureilla.

Data kuvaa siltojen mittauspisteiden kiihtyvyysarvoja ajan suhteen. Kiihtyvyyden arvo ei ole yksiköllinen, vaan se on mittalaitteen ilmoittama jännitearvo
ajan funktiona. Näin ollen datasta voidaan esimerkiksi laskea taajuustietoa ilman amplitudin yksikköä.  

Mittausdataa otetaan 1 minuutin verran/tiedosto (32kHz näytteenottotaajuus, 4 byteä/näyte, little endian, binäärinen).
Tiedostot nimetään tyyliin AL1501962095, missä A=mittaus-kortin identifier (A tai B), L=kanava (L tai R) ja 1501962095=tiedoston luontiaika 
(epoch, sekunteina)

Tiedostot ovat kooltaan keskimäärin noin 7 megatavun kokoisia.

Tieto kerätään ja julkaistaan kerran kuukaudessa noin kuun puolivälissä.

Listauksen saatavilla olevista tiedostoista saa osoitteesta:
`http://digitraffic-aurora.s3-website-eu-west-1.amazonaws.com/bridge-vibration/index.txt`

Tiedoston voi ladata osoitteesta:
`http://digitraffic-aurora.s3-website-eu-west-1.amazonaws.com/bridge-vibration/{objektin-nimi}` , jossa `{objektin-nimi}` on jokin `index.txt` -listauksessa
 mainituista.

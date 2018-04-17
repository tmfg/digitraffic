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

Tällä hetkellä tarjolla on vain yksi kokeellinen tietolähde.

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

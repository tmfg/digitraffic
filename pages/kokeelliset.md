---
layout: traffictype
permalink: /kokeelliset/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: Kokeelliset tietolähteet
lang: fi
ref: road-traffic
intro: Avointa dataa Suomen tieverkolta.
---

Kokeelliset tietolähteet tarjoavat erilaisten kokeellisten hankkeiden tietoja avoimena datana.
Kokeellisuus tarkoittaa sitä, että tiedot ovat tarjolla mahdollisesti rajatun ajan ja niiden saatavuus, ajantasaisuus ja sisältö voi muuttua 
odottamatta.

Tällä hetkellä tarjolla on vain yksi kokeellinen tietolähde.

## Siltojen värähtelytiedot

Aurora-hanke on kansainvälisesti ainutlaatuinen älykkään automaattisen liikenteen testialue ja osaamiskeskus arktisissa olosuhteissa Tunturi-Lapissa.
Siihen liittyvän kokeilutien siltojen värähtelyä mitataan kiihtyvyysantureilla. Näistä antureista saatava 
mittausdata on julkisesti saatavilla osoitteesta TODO . 

Data kuvaa siltojen mittauspisteiden kiihtyvyysarvoja ajan suhteen. Kiihtyvyyden arvo ei ole yksiköllinen, vaan se on mittalaitteen ilmoittama jännitearvo
ajan funktiona. Näin ollen datasta voidaan esimerkiksi laskea taajuustietoa ilman amplitudin yksikköä.  

Datan avaintiedot ovat:
- Sillan tunniste
- Mittauspisteen tunniste
- Kiihtyvyysarvojen suuruus ajankohdittain

Data sisältää myös mittauksien metatiedot eli:
- Sillan sijainnin
- Sillan nimen
- Mittauspisteen sijainnin
- Mittauspisteen nimen

Tiedot jakautuvat tiedostoihin, joiden nimeämisessä on käytetty mallia, jossa nimen kaksi ensimmäistä kirjainta kertovat TODO ja niitä seuraavat 
7 merkkiä edustavat TODO. Tiedostot ovat binäärisiä ja ne voidaan avata tilastollisen laskennan R-sovelluksella [TODO-LINKKI]. 

Tiedostot ovat kooltaan keskimäärin noin 7 megatavun kokoisia.

Tieto kerätään ja julkaistaan kerran kuukaudessa noin kuun puolivälissä.

Tarkempaa tietoa mittauksista ja niiden järjestelyistä antaa TODO.
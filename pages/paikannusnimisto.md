---
layout: sub-traffictype
permalink: /tieliikenne/paikannusnimisto/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: TMC/ALERT-C
lang: fi
ref: tmc-data
intro: Suomen liikennetiedottamisessa käytettävä paikannuspisteistö
---

<h2 id="sisältö">Sisältö</h2>

* Do not remove this line (it will not be displayed)
{:toc}

## TMC/ALERT-C paikannuspisteistö

RDS-TMC (Traffic Message Channel) on tieliikenteen liikennetiedotuspalvelu, joka välittää liikennetiedotteita analogisten radiolähetysten ohessa käytettävällä RDS-tekniikalla. Liikennetiedotteet sisältävät hyödyllistä ja ajantasaista tietoa tietöistä, onnettomuuksista, ruuhkista ja kelistä. Tiedotteiden sijoittamiseen tieverkolle käytetään TMC/ALERT-C -aineistoa, jonka ylläpidosta ja jakelusta Suomessa vastaa Traffic Management Finlandin tytäryhtiö ITM Finland.

Suomen paikannuspisteaineistoa ylläpidetään jatkuvasti ja se sertifioidaan [TISA](https://tisa.org/):n toimesta vuosittain. ITM Finlandin liikennetiedotuksessa käyttämä paikannuspisteistö päivittyy useamman kerran vuodessa, eli myös sertifiointien välissä. Myös sertifioimattomat versiot ovat ladattavissa Digitraffic-palvelun kautta.

### Ladattavat aineistot
- [Viimeisin sertifioitu aineisto](https://tie.digitraffic.fi/tmc/index.html?prefix=certified){:target="_blank"}

- [Sertifioimattomat aineistoversiot ](https://tie.digitraffic.fi/tmc/index.html?prefix=noncertified){:target="_blank"}

Sertifioimattoman aineiston rakenne poikkeaa jonkin verran sertifioidun julkaisun rakenteesta - rakenne-erot on kirjattu erilliseen dokumenttiin. Dokumentaatio on ladattavissa [täältä](https://tie.digitraffic.fi/tmc/index.html){:target="_blank"}.

### Rajapintajakelu
Paikannuspisteistön sertifioimattomat versiot ovat saatavilla myös rajapintojen kautta:
- Paikannuspisteet [https://tie.digitraffic.fi/api/v3/metadata/locations](https://tie.digitraffic.fi/api/v3/metadata/locations)

- Aineistoversiot [https://tie.digitraffic.fi/api/v3/metadata/location-versions](https://tie.digitraffic.fi/api/v3/metadata/location-versions)

- Paikannuspisteiden tyypit [https://tie.digitraffic.fi/api/v3/metadata/locations-types](https://tie.digitraffic.fi/api/v3/metadata/locations-types)

Rajapinnat on dokumentoitu Swaggeriin [https://tie.digitraffic.fi/swagger/#/](https://tie.digitraffic.fi/swagger/#/)

## Aineiston kuvaus
### Teiden nimeäminen

Jokaiselle paikannettavalle tielle pyritään antamaan yksikäsitteinen nimi mahdollisimman lyhyessä muodossa. Tiennimi on esimerkiksi tyyppiä alkupiste-loppupiste (esim. Lohilampi-Sammatti) tai pelkkä tien nimi, jos sellainen on olemassa (esim. Kahvimaantie). Valta-, kanta- ja seututeillä ensimmäinen tapa on parempi, mutta yhdysteillä on yleensä oikea nimi. Jos tiellä on useampi nimi, käytetään paikannimeä tiennimen sijaan. Sama tiennimi voi olla useammalla tietokannan tiellä, vaikka tienumero vaihtuu. Jos tien alku- ja loppupisteellä tai tiellä itsellään ei ole yksikäsitteistä nimeä, toimitaan seuraavasti:
- Paikannettavalla tiellä on yksi isompi paikka (esim. kylä Tausta), johon on viitoitus molemmista suunnista > Taustantie.

- Paikannettavan tien päässä sijaitsee isompi paikka, johon on viitoitus (esim. Kalkkiranta) > Kalkkirannantie.

- Paikannettavalla tiellä on kaksi saman kokoista paikkaa (esim. kylät Etula ja Takala), joihin on erilainen viitoitus eri suunnista > Etula-Takala.

### Pisteiden nimeäminen

Valta- ja kantateillä liittymät nimetään paikannimen mukaan (esim. Tie 51, Espoonlahti). Eritasoliittymien kohdalla käytetään liittymäpäätettä (esim. Vaajakosken liittymä). Liittymänumero merkitään vain päätiellä olevalle pisteelle (ei risteävän tien pisteelle) ja sen voi tarkistaa tierekisteristä. Name 2 (risteävän tien numero) annetaan ainakin nelinumeroisille ja sitä tärkeämmille teille.

Myös seutu- ja yhdysteillä pyritään käyttämään paikannimiä eli tienhaaraliitettä ei käytetä, jos tienhaaran kohdalla on esimerkiksi kylä tms., jonka mukaan pisteen voi nimetä. Paikannimet eivät välttämättä näy maastossa, mutta kartat ja paikallistuntemus auttavat tunnistamisessa. Jos selkeää paikannimeä ei ole, käytetään tienhaaraliitettä seuraavasti:
- Paikannettavassa solmupisteessä on viitoitus tiellä tai tien päässä sijaitsevaan isompaan paikkaan (esim. Tausta) > Taustan tienhaara.

- Paikannettavassa solmupisteessä on viitoitus kahteen eri suunnassa sijaitsevaan samankokoiseen paikkaan (esim. Svartsåhon ja Haikkoon), käytetään pisteen nimeämisessä tunnetumpaa paikkaa > Svartsån tienhaara.

- Paikannettava solmupiste on yksityistien kohdalla, jonka päässä on esimerkiksi Kvarnvik-niminen paikka > Kvarnvikin yksityistie.

Yhdysteiden solmupisteiden paikannuksessa on usein käytetty nimiä ”tien loppu”, ”kääntöpaikka” ja ”kuormaus-alue”. Erityisesti teiden loput pyritään nimeämään oikealla paikannimellä, kuten tienhaaratkin.
Kaikkia kuntarajoja ei ole tarpeen ottaa solmupisteiksi ja maakuntarajoja ei yhdysteiden osalta ole käytetty solmupisteinä. Sillat ovat hyviä solmupisteitä ja niiden nimeäminen perustuu Väyläviraston aineistoon. Kaupunkipisteet nimetään pääsääntöisesti risteävän tien mukaan.  

### Tierekisterin käyttö epäselvissä tapauksissa

Epäselvissä tapauksissa, kun loogista nimeä ei löydy, käytetään pääsääntöisesti Väyläviraston Tierekisteristä löytyvää nimeä.

### Nimistön käännös ruotsin kielelle

Paikannusnimistön kohteille lisätään mahdollisimman kattavasti myös ruotsinkielinen nimi.

Paikannimiin ja tiennimiin pohjautuvat nimet käännetään kaikissa kaksikielisissä kunnissa. Ruotsinkielinen käännös perustuu:
- paikannimien osalta Maanmittauslaitoksen paikannimitietokantaan

- tiennimien osalta Digiroadin ruotsinkielisiin tiennimiin

Yleiskieliset nimet (”kunnanraja”, ”maakuntaraja”, ”yksityistie”, “kiertoliittymä” jne.) käännetään koko maassa

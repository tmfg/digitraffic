---
layout: sub-traffictype
permalink: /rautatieliikenne/ruma/
section: Tietolähteet
traffictypes: Rataliikenne
searchable: true
hero-image: rail
title: RUMA
lang: fi
ref: ruma
intro: RUMA-järjestelmän tiedot
---

RUMA-järjestelmällä suunnitellaan ja toteutetaan ratatöitä ratatyöilmoitusten, eli RT-ilmoitusten avulla. RUMA:lla ilmoitetaan myös liikenteen rajoitteista LR-ilmoitusten avulla.

# RT-ilmoitus
RT-ilmoitus sisältää perustietojen lisäksi ratatyön kohteen. Kohteita voi olla useampia ja ne ovat eri tyyppisiä. Alla on yritetty kuvata kohteiden käsitemallin hierarkiaa:
```
RT-ilmoitus
│
└───Työnosa
    │   Numero: 1
    │   Aloituspäivä: 12.3.2020
    │
    └───Kohde: Tampere
        │   Liikennepaikka tai -väli: 1.2.246.586.1.39.119274
        │   Tyyppi: TYONKOHDE
        │
        └───Tunnusväli: TPE V0070 - TPE V0060 (008)
        │   │
        │   └───Elementtiväli
        │       │   Elementti 1: 1.2.246.586.1.24.118652
        │       │   Elementti 2: 1.2.246.586.1.24.118640
        │       │   Raide: 1.2.246.586.1.44.121862
        │       │
        │       └───Tarkenne
        │               Infratyyppi: Baliisi
        │               Infra-id: 1.2.246.586.1.11.1036487
        │
        └───Tunnusväli TPE V0041
               Elementti: 1.2.246.586.1.24.118630
```

## Työnosa
Työnosa kuvaa ratatyön loogista osaa. Työnosaan liittyy aina vähintään yksi kohde. Työnosat ovat numeroituja.

# LR-ilmoitus
LR-ilmoitus sisältää perustietojen lisäksi mahdollisen linkin RT-ilmoitukseen sekä rajoitteen tyypin. Rajoitetyyppejä ovat:  
- Suljettu liikennöinniltä
- Suljettu sähkövetokalustolta
- Tilapäinen nopeusrajoitus
- Akselipaino max
- JKV-rakennusalue
- Vaihteen lukitus
- Tulityön vaara-alue

LR-ilmoitus liittyy ratainfraan (kohteet) suoraan eikä työnosien kautta kuten RT-ilmoitus.

# Työn tai rajoituksen kohteet
Alla on kuvattu käsitteet joiden avulla RT- ja LR-ilmoitukset liittyvät ratainfraan.

## Kohde
Kohde liittyy aina joko liikennepaikkaan tai liikennepaikkaväliin. Kohteen tyyppi kuvaa työn tai rajoituksen tyyppiä, sallitut arvot ovat TYONKOHDE, TULITYO, NOPEUSRAJOITUS.  
Mikäli kohteeseen ei liity tunnusvälejä, kohteena on koko liikennepaikka/väli.

## Tunnusväli
Tunnusväli kuvaa joko:
- Kahden elementin välistä aluetta joka koostuu yhdestä tai useammasta elementtivälistä.  
TAI
- Vaihteen liikennöitävyyttä: tunnusväliin liittyvä yksittäinen vaihde tarkoittaa ettei vaihde ole 
liikennöitävissä.  
TAI
- Jotain tulkinnanvaraista reittiä kahden elementin välillä (elementtipari).

## Elementtiväli
Elementtiväleistä muodostetaan reitti tunnusvälin elementiltä toiselle (muuten voisi olla useampia reittejä). Elementtivälin elementeiksi voi valita vain tietyn tyyppisiä *rajaavia* elementtejä: **rajaava opastin, vaihde, puskin, seislevy, liikennepaikan raja, liikenteenohjauksen raja**.  

## Tarkenne
Tarkenteella voidaan valita kohteeksi ei-rajaava elementti elementtivälin sisältä, tarkenne-elementtejä ovat: **tasoristeys, baliisi, ei-rajaava opastin**.

### Rajaavat opastintyypit
Alla Infra-API -opastintyypit jotka luokitellaan RUMA:ssa rajaaviksi, loput opastintyypit ovat ei-rajaavia.
```
pa, pa2, pav, ps, ps2, ps2v, psv, ra, rp, su, rd, y4, ye, ys, yse, ysj, ysje, ysjv, ysv, ysve, yv
```

[RUMA-järjestelmän sivusto](https://fintraffic.fi/fi/finrail/ruma)

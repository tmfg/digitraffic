---
layout: sub-traffictype
permalink: /rautatieliikenne/ruma/
section: Tietolähteet
traffictypes: Rataliikenne
searchable: true
hero-image: rail
title: RUMA
lang: fi
ref: tms
intro: RUMA-järjestelmän tiedot
---

RUMA-järjestelmällä suunnitellaan ja toteutetaan ratatöitä ratatyöilmoitusten, eli RT-ilmoitusten avulla. RUMA:lla ilmoitetaan myös liikenteen rajoitteista LR-ilmoitusten avulla.

# RT-ilmoitus
RT-ilmoitus sisältää perustietojen (kuvaus, ratatyötunnus jne) lisäksi ratatyön kohteen. Kohteita voi olla useampia ja ne ovat eri tyyppisiä. Alla on yritetty kuvata kohteiden käsitemallin hierarkiaa:
```
RT-ilmoitus
│   Kuvaus: Raidevirtapiirityöt
│   Ratatyötunnus: 43823
│
└───Työnosa
    │   Numero: 1
    │   Kuvaus: Virtapiirimittaus
    │
    └───Kohde
        │   Liikennepaikka tai -väli: x.x.xxx.LIVI.INFRA.39.119030
        │   Tyyppi: TYONKOHDE
        │
        └───Tunnusväli
        │   │
        │   └───Elementtiväli
        │       │   Elementti 1: x.x.xxx.LIVI.INFRA.24.118652
        │       │   Elementti 2: x.x.xxx.LIVI.INFRA.24.118640
        │       │   Raide: x.x.xxx.LIVI.INFRA.44.121862
        │       │
        │       └───Tarkenne
        │               Infratyyppi: Baliisi
        │               Infra-id: x.x.xxx.LIVI.INFRA.11.1036487
        │
        └───Tunnusväli
               Elementti: x.x.xxx.LIVI.INFRA.24.118630
```

## Työnosa
Työnosa kuvaa ratatyön loogista osaa. Työnosaan liittyy aina vähintään yksi kohde. Työnosat ovat numeroituja.

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

[RUMA-järjestelmän sivusto](https://tmfg.fi/fi/finrail/ruma)

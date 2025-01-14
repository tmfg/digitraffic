---
title: 'LAM-asemista saatavien tietojen Datex2-muotoiset rajapinnat ovat julkaistu.' 
image:
published: true
categories: Tiedotteet
ref: 2025-01-14-new-api-tms-datex2
lang: fi
traffictypes:
- Tieliikenne
tags:
- Rajapinnat
---

LAM-asemista saatavien tietojen Datex2-muotoiset rajapinnat ovat julkaistu.

Rajapinnan Datex2 versio on 3.5 ja data jaetaan sekä JSON- että xml-muodoissa.

Jaettava sensoridata on seuraava:

* Keskinopeudet viimeisen viiden minuutin ajalta `(KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1/2)`
* Keskinopeudet 60 minuutin kiinteältä aikaväliltä `(KESKINOPEUS_60MIN_KIINTEA_SUUNTA1/2)`
* Ohitukset viimeisen viiden minuutin ajalta `(OHITUKSET_5MIN_LIUKUVA_SUUNTA1/2)`
* Ohitukset 60 minuutin kiinteältä aikaväliltä `(OHITUKSET_60MIN_KIINTEA_SUUNTA1/2)`

Dokumentaatiot löytyvät sivustolta [täältä](/tieliikenne/#liikenteen-nopeus--ja-määrätiedot-datex2-muodossa).\
Swagger API -kuvaukset löytyvät [täältä](https://tie.digitraffic.fi/swagger/#/TMS%20V1).

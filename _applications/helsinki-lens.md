---
title: Helsinki Lens
intro: Helsingin avoimet liikenne- ja kaupunkiaineistot yhdessä interaktiivisessa 3D-näkymässä.
logo: helsinki-lens/helsinki-lens-logo.svg
developer:
  - Radu Boncea / ai.ro
  - https://ai.ro/
traffictypes:
  - Tieliikenne
  - Rautatieliikenne
  - Meriliikenne
environments:
  - Web
language: Englanti (EN)
price: Ilmainen
download-urls:
  - https://helsinki.ai.ro/
feedback-url: https://github.com/getodacu/helsinki-dt/issues
---

Helsinki Lens on maksuton, avoimen lähdekoodin verkkosovellus, joka yhdistää
Helsingin 3D-kaupunkimallin liikenteen sijaintiraportteihin ja muihin avoimiin
aineistoihin. Sovelluksessa voi tutkia kaupunkia, valita junia ja aluksia
sekä tarkastella niiden saatavilla olevia tietoja.

## Digitraffic-aineistojen käyttö

- **Rautatieliikenne:** junien sijaintiraportit, aikataulut ja kulkutiedot sekä
  asemien lähtötiedot.
- **Meriliikenne:** AIS-alusten sijaintiraportit ja metadata, esimerkiksi
  aluksen nimi, tyyppi, nopeus ja kulkusuunta silloin, kun ne ovat saatavilla.
- **Tieliikenne:** kuuden valitun Fintrafficin kelikameran aikaleimatut kuvat
  kartalta avattavissa näkymissä. Kuvat ovat tilannekuvia, eivät videota.

Digitrafficin tiedot täydentävät HSL:n joukkoliikenteen sijaintitietoja,
Helsingin kaupungin 3D-malleja ja liikennelaskentaa sekä sää-, ilmanlaatu- ja
rakennustietoja. Lähteet ja aikaleimat näkyvät sovelluksessa; puuttuvia tietoja
ei korvata arvauksilla. Kartta kattaa rajatun alueen Helsingistä,
ei koko Suomen liikenneverkkoa.

![Helsinki Lensin 3D-kaupunkinäkymä, jossa näkyy AIS-aluksia, joukkoliikennettä ja kartan tietokerroksia.]({{ site.baseurl }}/img/helsinki-lens/helsinki-lens-overview.jpg)

*Kuvakaappaus: Radu Boncea / ai.ro. Kartta-aineistot: Helsingin kaupunki ja
HSY. Liikennetiedot: Fintraffic / Digitraffic ja HSL / Digitransit.
Ympäristöhavainnot: Ilmatieteen laitos ja HSY. Lähdeaineistojen lisenssi:
CC BY 4.0. Helsinki Lensin logo: Radu Boncea,
[Apache License 2.0]({{ site.baseurl }}/img/helsinki-lens/LICENSE.txt).*

## Käyttö

Sovellus toimii WebGL-yhteensopivassa selaimessa ilman asennusta tai
kirjautumista. Käyttöliittymä on englanninkielinen. Helsinki Lens on
Radu Boncean / ai.ro:n itsenäinen projekti.

[Kokeile Helsinki Lensiä](https://helsinki.ai.ro/) ·
[Lähdekoodi ja palautekanava](https://github.com/getodacu/helsinki-dt)

## In English

Helsinki Lens is a free, open-source web application that brings Helsinki's
3D city model and open transport data into one interactive view.
It uses Digitraffic train locations, timetables and station departures,
marine AIS vessel reports and metadata, and dated snapshots from six selected
Fintraffic road-weather cameras.

These sources are combined with HSL public transport, Helsinki traffic
measurements, weather and air-quality observations, and building records.
Coverage is limited to the prepared Helsinki map area. Source timestamps
remain visible, and missing or stale information is distinguished from
current reports.

The independent project is developed by Radu Boncea / ai.ro. It runs in a
WebGL-compatible browser, has an English interface, and requires no
installation or registration.

Screenshot: Radu Boncea / ai.ro. Map data: City of Helsinki and HSY;
transport data: Fintraffic / Digitraffic and HSL / Digitransit;
environmental observations: Finnish Meteorological Institute and HSY
(CC BY 4.0). The Helsinki Lens logo is licensed under Apache License 2.0.

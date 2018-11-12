---
title: 'Tie- ja Meriliikenteen siirto AWS-pilvipalveluun on valmistunut'
categories: Tiedotteet
image: 
lang: fi
published: true
ref: 2018-11-12-road-marine-now-in-aws
traffictypes:
  - Tieliikenne
  - Meriliikenne
tags:
  - Rajapinnat
  - Ylläpito
---

Digitrafficin tie- ja meriliikenteen palvelut ovat siirtyneet AWS-pilvipalveluun. 

Merkillepantavaa muutoksessa ovat seuraavat asiat:

* Ennen muutosta aikaleimat olivat Suomen paikallista aikaa. Muutoksen jälkeen ajat ilmoitetaan [koordinoidussa yleisajassa (UTC)](https://fi.wikipedia.org/wiki/ISO_8601#Aika).
Lisäksi aikaleimojen formaatti vaihtui: Ennen muutosta aikaleiman perään merkittiin ero koordinoituun yleisaikaan (UTC). Muutoksen
jälkeen käytetään koordinoidun yleisajan lyhennettä Z.
Ennen muutosta ajat ilmoitettiin esimerkiksi muodossa
`2018-11-06T15:51:00+03:00`
Uusi formaatti samalle aikaleimalle on:
`2018-11-06T12:51:00Z`
Lisätietoja: [2018-11-12-timestamp-change](http://www.digitraffic.fi/tiedotteet/2018/11/12/timestamp-change.html)
* Uudessa ympäristössä tietokantamoottori vaihtuu Postgres:iin, joten on mahdollista, että
joissakin tulosjoukoissa vastausten järjestys hieman muuttuu.
 
Muilta osin ympäristöjen pitäisi toimia identtisesti.

Lue myös tiedote  Websocket-rajapintojen muutoksista
[2018-10-12-ws-legacy-marine](http://www.digitraffic.fi/tiedotteet/2018/10/12/ws-legacy-marine.html) 
sivulla.

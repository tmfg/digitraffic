---
title: 'Tie- ja Meriliikenteen siirto AWS-alustalle on valmistunut'
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

Digitrafficin tie- ja meriliikenteen palvelut ovat siirtyneet AWS:aan. 
Muutos ei vaikuta osoitteisiin eikä rajapintojen sisältöön.

Merkillepantavaa muutoksessa ovat seuraavat asiat:

* Uusi ympäristö palauttaa aikaleimat Zulu-aikavyöhykkeellä. Clienttien on osattava esittää ajat 
halutussa aikavyöhykkeessä. Tästä tarkemmin tiedotteessa: [2018-11-12-timestamp-change](http://digitraffic.liikennevirasto.fi/tiedotteet/2018/11/12/timestamp-change.html)

* Uudessa ympäristössä tietokantamoottori vaihtuu Postgres:iin, joten on mahdollista, että
joissakin tulosjoukoissa vastausten järjestys hieman muuttuu.
 
Muilta osin ympäristöjen pitäisi toimia identtisesti.

Lue myös tiedote  Websocket-rajapintojen muutoksista
[2018-10-12-ws-legacy-marine](http://digitraffic.liikennevirasto.fi/tiedotteet/2018/10/12/ws-legacy-marine.html) 
sivulla.
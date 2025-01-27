---
title: 'Tie- ja Meriliikenteen tuotanto siirtyy AWS:aan 6.11.2018'
categories: Tiedotteet
image:
lang: fi
published: true
ref: 2018-11-05-road-marine-goes-aws
traffictypes:
  - Tieliikenne
  - Meriliikenne
tags:
  - Rajapinnat
  - Ylläpito
---

Digitrafficin tie- ja meriliikenteen rajapinnat siirtyvät AWS:aan 6.11.2018.
Muutos ei vaikuta osoitteisiin eikä rajapintojen sisältöön.

Merkillepantavaa muutoksessa ovat seuraavat asiat:

- Uusi ympäristö palauttaa aikaleimat Zulu-aikavyöhykkeellä. Clienttien on
  osattava esittää ajat halutussa aikavyöhykkeessä.

- Uudessa ympäristössä tietokantamoottori vaihtuu Postgres:iin, joten on
  mahdollista, että joissakin tulosjoukoissa vastausten järjestys hieman
  muuttuu.

Muilta osin ympäristöjen pitäisi toimia identtisesti.

Palvelun piti siirtyä AWS:aan jo viikkoa aiemmin, mutta siirto viivästyi
lähdejärjestelmähäiriöiden vuoksi.

Websocket-rajapintojen muutoksista tiedotettiin jo aiemmin
[2018-10-12-ws-legacy-marine](https://www.digitraffic.fi/tiedotteet/2018/10/12/ws-legacy-marine.html)
artikkelissa.

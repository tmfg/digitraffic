---
title: 'Testiympäristö siirtyy AWS:aan 29.10.2018'
categories: Tiedotteet
image:
lang: fi
published: true
ref: 2018-10-29-test-goes-aws
traffictypes:
  - Tieliikenne
tags:
  - Rajapinnat
  - Ylläpito
---

Digitrafficin testiympäristö siirtyi AWS-alustalle tänään 29.10.2018. Tuotanto
siirtyy AWS-alustalle tiistaina 30.10.2018. Merkillepantavaa muutoksessa ovat
seuraavat asiat:

- Uusi ympäristö palauttaa aikaleimat Zulu-aikavyöhykkeellä. Clienttien on
  osattava esittää ajat halutussa aikavyöhykkeessä.

- Uudessa ympäristössä tietokantamoottori vaihtuu Postgres:iin, joten on
  mahdollista, että joissakin tulosjoukoissa vastausten järjestys hieman
  muuttuu.

Muilta osin ympäristöjen pitäisi toimia identtisesti.

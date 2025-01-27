---
title: 'Pääkaupunkiseudun matka-aikajärjestelmän toiminta lakkaa 29.12.2017'
image:
published: true
categories: Tiedotteet
traffictypes:
  - Tieliikenne
tags:
  - Rajapinnat
  - Ylläpito
  - EndOfLife
---

Perjantaina 29.12.2017 päättyy pääkaupunkiseudun matka-aikajärjestelmän
toiminta. Järjestelmä on tullut teknisen käyttöikänsä päähän eikä toiminta
vastaa enää asetettuja laatuvaatimuksia. Tämän vuoksi Digitraffic lakkaa
toimittamasta PKS-järjestelmään liittyvää tietoa.

Seuraavat endpointit lakkaavat tarjoamasta ajantasaista matka-aikatietoa:

- `/api/v1/data/fluency-current` tiedot lakkaavat päivittymästä
- `/api/v1/data/fluency-current/{id}` tiedot lakkaavat päivittymästä
- `/api/v1/data/fluency-history-previous-day` tiedot lakkaavat päivittymästä
- `/api/v1/data/fluency-history-previous-day/{id}` tiedot lakkaavat
  päivittymästä
- `/api/v1/data/fluency-history/{id}` historia päättyy 29.12.
- `/api/v1/data/free-flow-speeds` sisältää PKS:n vapaita nopeuksia. PKS vapaat
  nopeudet eivät ole päivittyneet 2010 vuoden jälkeen eivätkä päivity myöskään
  jatkossa. Endpointin LAM-pisteiden tiedot päivittyvät jatkossakin.

Muutoksen vuoksi tehdään ylimääräinen tuotanto-asennus 28.12.2017 klo 12.00 -
13.00 välillä.

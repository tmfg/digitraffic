---
layout: sub-traffictype
permalink: /meriliikenne/ais/
section: Tietolähteet
traffictypes: Meriliikenne
searchable: true
hero-image: icebreaker
title: AIS-viestit
lang: fi
ref: ais-messages
intro: Viestien vastaanotto ja muokkaus
---

AIS-järjestelmä (Automatic Identification System) on laivojen ja alusten tunnistamiseen ja sijainnin määrittämiseen käytettävä järjestelmä. AIS tarjoaa laivoille keinon vaihtaa ja välittää läheisten laivojen kanssa elektronisesti alustietoja kuten tunnistustiedot, sijainti, suunta ja nopeus.

Digitraffic palvelusta on saatavilla A-luokan sijainti- ja metadata-viestejä. Osalla viestejä suoritetaan suodatusta ja alustyypin muunnosta.

## Kalastusalusten suodatus

Kaikki kalastusalukset (alustyyppi 30) ovat suodatettu pois aineistosta.

## Tyyppimuokkaus

Alusten tyyppi/lastikuvaus muunnetaan seuraavan taulukon mukaisesti yleisiksi alustyypeiksi.

| Alkuperäinen arvo | Muunnettu arvo 
| < 10 | 0
| 10 - 19 | 10
| 20 - 29 | 20
| 30 - 39 | Ei muunnosta
| 40 - 49 | 40
| 50 - 59 | Ei muunnosta
| 60 - 69 | 60
| 70 - 79 | 70
| 80 - 89 | 80
| 90 - 99 | 90
| > 99 | 0

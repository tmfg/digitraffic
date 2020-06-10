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

| Alkuperäinen arvo | Muunnettu arvo | Aluksen tyyppi
| 0 | 0 | Alustyyppi ei ole käytössä (oletusarvo)
| 1 - 19 | ei muunnosta | Varattu tulevaisuuden laajennuksille
| 20 - 29 | 20 | Patosiipialus (WIG)
| 30 - 39 | Ei muunnosta | 31 - 32 Hinaaja (hinaus käynnissä)<br>33 Ruoppaus/vedenalainen toiminta<br>34 Sukellustoiminta<br>35 Sota-alus<br>36 Purjealus<br>37 Huvialus
| 40 - 49 | 40 | Pika-alus (HSC)
| 50 - 59 | Ei muunnosta | 50 Luotsi<br>51 Pelastusalus<br>52 Hinaaja<br>53 Yhteysalus<br>54 Ympäristövahinkojen torjunta<br>55 Viranomainen<br>56 - 59 Muu tyyppi
| 60 - 69 | 60 | Matkustajalaiva
| 70 - 79 | 70 | Rahtialus
| 80 - 89 | 80 | Tankkeri
| 90 - 99 | 90 | Muu alus
| > 99 | ei muunnosta | Varattu tulevaisuuden laajennuksille

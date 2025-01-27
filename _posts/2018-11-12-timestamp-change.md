---
title: 'Aikaleimojen muutos 6.11.2018'
categories: Tiedotteet
image:
lang: fi
published: true
ref: 2018-11-12-timestamp-change
traffictypes:
  - Tieliikenne
  - Meriliikenne
tags:
  - Rajapinnat
  - Ylläpito
---

#### Rajapintojen aikaleimojen merkittävä muutos

Digitrafficin tie- ja meriliikenteen rajapinnat siirtyvät AWS-pilvipalveluun
6.11.2018. Siirron yhteydessä rajapintojen käyttämä tapa kellonaikojen
ilmoittamiseen muuttui merkittävästi. Muutoksen viestintä rajapintojen
hyödyntäjille oli riittämätöntä, jonka seurauksena useiden hyödyntäjien
sovellukset eivät osanneet tulkita muuttuneita aikaleimoja oikein.

Tämän tyyppiset, mahdollisesti sovellusongelmia aiheuttavat rajapintamuutokset
ovat harvinaisia ja niitä pyritään lähtökohtaisesti välttämään. Liikennevirasto
on ryhtynyt toimiin, jotta viestintä vastaavissa tilanteissa olisi jatkossa
riittävää. Liikennevirasto pahoittelee hyödyntäjille aiheutunutta ylimääräistä
vaivaa.

#### Aikaleimojen muutoksen kuvaus ja aikaleimojen tulkinta

Ennen muutosta aikaleimat olivat Suomen paikallista aikaa. Muutoksen jälkeen
ajat ilmoitetaan
[koordinoidussa yleisajassa (UTC)](https://fi.wikipedia.org/wiki/ISO_8601#Aika).

Lisäksi aikaleimojen formaatti vaihtui: Ennen muutosta aikaleiman perään
merkittiin ero koordinoituun yleisaikaan (UTC). Muutoksen jälkeen käytetään
koordinoidun yleisajan lyhennettä Z.

Ennen muutosta ajat ilmoitettiin esimerkiksi muodossa
`2018-11-06T15:51:00+03:00`

Uusi formaatti samalle aikaleimalle on: `2018-11-06T12:51:00Z`

Rajapintoja hyödyntävissä sovelluksissa aikaleimat kannattaa tulkita
aikaleimojen käsittelyyn tarkoitetuilla kirjastoilla tai funktioilla.
Aikaleimojen tulkinta esimerkiksi merkkijonojen käsittelyyn tarkoitetuilla
menetelmillä on virhealtista.

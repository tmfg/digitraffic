---
title: VenaaRauhassa
intro: Parempi paikkakartta auttaa pitkillä matkoilla etsimään paikkoja, joissa tarvitsee istua mahdollisemman vähän toisen vieressä.
logo: venaarauhassa/venaarauhassa-logo.png
developer:
  - Antti Ellilä & Niklas Impola
traffictypes:
  - Rautatieliikenne
environments:
  - Web
language: Suomi (FIN)
price: Ilmainen
download-urls:
  - https://venaarauhassa.fi/
feedback-url:
  - https://github.com/Chicken/VenaaRauhassa/
---

<div style="text-align: center;">
  <img alt="VenaaRauhassa logo tekstillä" src="{{ site.baseurl }}{{ "/img/venaarauhassa/venaarauhassa-text.png" }}">
</div>

<p style="font-size: 1.25rem;">
Oletko aiemmin huomannut paikan olevan varattu, mutta kukaan ei istu siinä?
Paikka on todennäköisesti varattu vasta myöhempää asemaa varten.
Pääradan pitkän matkan matkaajilla tämä on toistuva ongelma.
Siispä VenaaRauhassa on älykkäämpi paikkakartta, joka ottaa huomioon muiden lähtö- ja pääteasemat.
</p>

![VenaaRauhassa paikkakartta]({{ site.baseurl }}{{
"/img/venaarauhassa/venaarauhassa-train-view.png" }})

### Ongelma & Ratkaisu

Jos varaat paikkaa esimerkiksi Oulusta Helsinkiin, näyttää VR:n paikkavalitsin
paikan varatuksi, jos se on varattu yhdellekkään asemavälille, kuten vasta
Tampereelta Helsinkiin. Jos suomalaisittain arvostaa omaa tilaansa ja juna on
lähes täynnä niin, että on pakko varata paikka jonkun vierestä, on paljon
kannattavampaa varata sellainen paikka, jonka vieressäolija matkustaa hyvin
lyhyen matkan, kuin sellaisen, jonka vieressä on joku koko matkan. Tämä ei
kuitenkaan ole mahdollista VR:n omalla sovelluksella. Monet ovatkin joutuneet
manuaalisesti vaihtelemaan matkan pääteasemia selvittääkseen ideaalin
istumapaikan. VenaaRauhassa automatisoi prosessin ja antaa tarkastella jokaisen
paikan saatavuutta koko matkan ajalta.

VenaaRauhassa on ollut toiminnassa 2024 alkuvuodesta lähtien ja nykyään
tyytyväisiä VenaaRauhassa käyttäjiä on päivittäin satoja.

### Teknistä tietoa

VenaaRauhassa on suunniteltu toimivaksi tietokoneella ja puhelimella.
Digitrafficin rajapintojen lisäksi VenaaRauhassa hyödyntää tietoa VR:ltä.
VenaaRauhassa on toteutettu avoimen lähdekoodin ohjelmana. Lähdekoodin löytää
[GitHubista](https://github.com/Chicken/VenaaRauhassa/).

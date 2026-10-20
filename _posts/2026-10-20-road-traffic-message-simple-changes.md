---
title: 'Liikennetiedotteiden simple-muoto muuttuu 27.10.2026'
image:
published: true
categories: Tiedotteet
ref: 2026-10-20-road-traffic-message-simple-changes
lang: fi
traffictypes:
    - Tieliikenne
tags:
    - Rajapinnat

---

[Dokumentaation](https://www.digitraffic.fi/tieliikenne/#liikennetiedotteet-1){:target="_blank"} mukaan MQTT-aihe
`traffic-message-v3/simple/<situationType>` lähettää samaa sisältöä kuin REST-rajapinnan simple-vastaus.
Käytännössä niiden välillä on ollut pieniä eroja, koska MQTT lähetti viestin eri tavalla. 27.10.2026 alkaen
hyötykuorma tuotetaan samasta muunnoksesta kuin REST-vastaus, jolloin erot poistuvat.

## Muuttuvat kentät

- `worktypes` on jatkossa nimeltään `workTypes`.
- Aikaleimat ovat jatkossa aina muodossa `yyyy-MM-dd'T'HH:mm:ss.SSSZ`. Aiemmin tarkkuus vaihteli.
- `dataUpdatedTime` on uusi kenttä, jota ei aiemmin ollut mukana.
- `trafficAnnouncementType` on uusi kenttä, jota ei aiemmin ollut mukana. Sen arvo voi olla `null`.
- `locationOpenLr.secondaryBinary` on uusi valinnainen kenttä. Se on OpenLR-viite saman tieosuuden
  vastakkaiseen suuntaan. Kenttä tulee mukaan myös REST-rajapintoihin.

Korjaamme samalla REST-rajapinnan kentän `properties.dataUpdatedTime`, joka on ollut tyhjä. Jatkossa se kertoo
milloin tiedote on viimeksi päivittynyt.

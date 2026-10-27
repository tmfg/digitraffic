---
title: 'Säätietojen ja liikennetiedotteiden v1-rajapinnat poistuvat'
image:
published: true
categories: Tiedotteet
ref: 2026-10-27-road-deprecated-apis
lang: fi
traffictypes:
    - Tieliikenne
tags:
    - Rajapinnat
    - EndOfLife
---

Olemme merkinneet poistuviksi säätietojen v1-rajapinnat sekä liikennetiedotteiden v1-rajapinnat. Korvaavat
v2-rajapinnat ovat jo käytössä.

## Poistumispäivät

- **3.11.2026**: ennusteiden v1-rajapinnat, eli `/api/weather/v1/forecast-sections/forecasts`,
  `/api/weather/v1/forecast-sections-simple/forecasts` ja niiden `/{id}/forecasts`-versiot.
- **13.4.2027**: muut säätietojen v1-rajapinnat ja kaikki liikennetiedotteiden v1-rajapinnat.
- **13.4.2027**: DATEX II 2.2.3 -rajapinnat. Ilmoitimme [aiemmin](/tiedotteet/2026/05/08/road-datex-2-2-3-end-of-life.html),
  että ne poistuvat 20.10.2026. Poisto siirtyy samaan päivään liikennetiedotteiden v1-rajapintojen kanssa.

Poistuvat rajapinnat on lueteltu myös sivulla [Rajapintojen muutokset](/tuki/rajapintojen-muutokset/). Siirry
korvaaviin rajapintoihin hyvissä ajoin ennen poistumispäivää.

## Mitä pitää muuttaa

Useimmissa rajapinnoissa riittää vaihtaa polun `v1` muotoon `v2`. Sisältö pysyy samana. Alla luetellut
rajapinnat muuttuvat enemmän.

### Ennusteet

`/api/weather/v1/forecast-sections/forecasts` ja muut `forecasts`-rajapinnat

- Ennusteet tulevat uudesta lähteestä, joten arvot ja havaintojen ajat eivät ole samat kuin v1:ssä.
- `weatherSymbol` on jatkossa numero, ja koodisto on eri. v1 käytti Vaisalan symboleja (esim. `d100`), v2
  käyttää Ilmatieteen laitoksen SmartSymbol-koodeja (esim. `7`). Yöllä koodiin lisätään 100. Symbolit ovat
  saatavilla [Ilmatieteen laitoksen GitHubista](https://github.com/fmidev/opendata-resources/tree/master/symbols){:target="_blank"}.
- `forecastConditionReason` poistuu. Sen sisältämä `roadCondition` on nyt suoraan ennusteen alla. Muut
  sen kentät (`precipitationCondition`, `windCondition`, `freezingRainCondition`, `winterSlipperiness`,
  `visibilityCondition` ja `frictionCondition`) poistuvat ilman korvaajaa.
- `reliability` poistuu.
- `roadCondition` voi saada arvon `NOT_KNOWN`.
- `overallRoadCondition`: arvo `CONDITION_COULD_NOT_BE_RESOLVED` on korvattu arvolla `NOT_KNOWN`.
- `dataUpdatedTime` kerrotaan vastauksen ja ennusteosuuden tasolla, mutta ei enää jokaisessa ennusteessa.

### Anturiarvojen historia

`/api/weather/v1/stations/{id}/data/history`

- Lista `values` on nyt nimeltään `sensorValues`.

### Liikennetiedotteet

Kaikki JSON-rajapinnat:

- Luettelotyyppisten kenttien arvot kirjoitetaan eri tavalla. v1 palauttaa esimerkiksi `ROAD_WORK` ja
  `HIGH`, v2 palauttaa `road work` ja `high`. Muutos koskee mm. kenttiä `situationType` ja `severity`.

`/api/traffic-message/v1/messages`

- Tiedotetyyppi valittiin `situationType`-parametrilla. v2:ssa jokaisella tyypillä on oma rajapintansa:
  `roadworks`, `traffic-announcements`, `weight-restrictions` ja `exempted-transports`.
- `inactiveHours` on korvattu parametreilla `from` ja `to`. Jos `from` puuttuu, haetaan tunnin takaa alkaen.

`/api/traffic-message/v1/messages/{situationId}`

- v1 palautti oletuksena tiedotteen kaikki versiot. v2 palauttaa vain uusimman version.
- Kaikki versiot saa osoitteesta `/api/traffic-message/v2/messages/{situationId}/history`. Se palauttaa
  listan tiedotteita ilman ympäröivää `FeatureCollection`-rakennetta.

`/api/traffic-message/v1/messages.datex2` ja `/api/traffic-message/v1/messages/{situationId}.datex2`

- Nämä palauttavat DATEX II 2.2.3 -muotoa, eikä niille ole v2-versiota samassa polussa. Korvaavat
  rajapinnat ovat DATEX II 3.5 ja 3.7 -muodossa, esim. `/api/traffic-message/v2/roadworks/datex2-3.7.xml` ja
  `/api/traffic-message/v2/messages/{situationId}/datex2-3.7.xml`.

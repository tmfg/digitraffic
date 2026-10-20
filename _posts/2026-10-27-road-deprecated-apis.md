---
title: 'Uusia rajapintoja merkitty poistuviksi'
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
v2-rajapinnat ovat jo käytössä. Polku on muuten sama, mutta `v1` vaihtuu `v2`:ksi.

Tarkasta poistuvat rajapinnat ja niiden poistumispäivät
sivulta [Rajapintojen muutokset](/tuki/rajapintojen-muutokset/). Siirry korvaaviin rajapintoihin hyvissä ajoin
ennen poistumispäivää.

## Sisältö on enimmäkseen sama

Useimmat v2-rajapinnat palauttavat saman sisällön kuin v1, joten niissä riittää polun vaihtaminen.

Kolmessa kohdassa on eroa.

### Liikennetiedotteet

`/api/traffic-message/v1/messages`

- Haettava tiedotetyyppi valittiin `situationType`-parametrilla. Vastaavat v2-rajapinnat on jaettu tyypin
  mukaan omiin osoitteisiinsa: `roadworks`, `traffic-announcements`, `weight-restrictions` ja
  `exempted-transports`.

### Anturiarvojen historia

`/api/weather/v1/stations/{id}/data/history`

- Lista `values` on nyt nimeltään `sensorValues`.

### Ennusteet

`/api/weather/v1/forecast-sections/forecasts` ja muut `forecasts`-rajapinnat

- `weatherSymbol` on jatkossa numero. Aiemmin se oli merkkijono.
- `forecastConditionReason` ja `reliability` poistuvat. Sen sisällä ollut `roadCondition` on nyt suoraan
  ennusteen alla.
- `roadCondition` voi saada arvon `NOT_KNOWN`.
- `overallRoadCondition`: arvo `CONDITION_COULD_NOT_BE_RESOLVED` on korvattu arvolla `NOT_KNOWN`.
- `dataUpdatedTime` kerrotaan vain vastauksen tasolla, ei enää jokaisessa ennusteessa.

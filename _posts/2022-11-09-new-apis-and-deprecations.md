---
title: 'Meripuolen uudet rajapinnat ja vanhojen rajapintojen käytöstä poistaminen kuuden kuukauden kuluttua'
image:
published: true
categories: Tiedotteet
ref: 2022-11-09-new-apis-and-deprecations
lang: fi
traffictypes:
- Meriliikenne
tags:
- Rajapinnat
---

Meriliikenteen apeista on julkaistu uudet rajapintaversiot.

Dokumentaatiot löytyvät sivustolta
[täältä](/meriliikenne/#restjson-rajapinnat).\
Ja Swagger API -kuvaukset löytyvät
[täältä](https://meri.digitraffic.fi/swagger/).\
Tuetut ja vanhentuneet rajapinnat löytyy
[täältä](/tuki/rajapintojen-muutokset/).

🔴 Seuraavat vanhat rajapinnat poistuvat käytöstä huhtikuun 2023 jälkeen.

- Satamakäynnit
  - `/api/v1/port-calls*`
- Metadatat
  - `/api/v1/metadata/*`
  - `/api/v2/metadata/*`
- Älypoijut
  - `/api/v1/sse*`
- AIS
  - `/api/v1/locations*`
- Talvimerenkulun avustustiedot
  - `/api/v1/winter-navigation*`
- Vesiliikenteen häiriöt
  - `/api/v2/bridge-lock/*`
- Merivaroitukset
  - `/api/v1/nautical-warnings/*`

---
layout: sub-traffictype
permalink: /tieliikenne/lam/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: LAM-tiedot
lang: fi
ref: tms
intro: Liikenteen automaattiset mittaustiedot
---

LAM-asemat koostuvat tieverkolle upotetuista induktiosilmukoista ja tiedonkeruuyksiköistä. Asemia on suomessa yli 450. LAM-asemat sisältävät antureita jotka tuottavat laskennallista dataa. Laskennassa käytetään anturivakioita joiden arvot vaihtelevat asemakohtaisesti.

# Laskennalliset anturit
Alla on lisätietoa antureista.

| Anturin tunniste | Nimi | Yksikkö | Selite
| --- | --- | --- | ---
| 5158<br>5161 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2 | % vapaasta nopeudesta | Kentässä oleva arvo on prosenttiosuus (%) määritellystä tien vapaasta nopeudesta viimeisen viiden minuutin ajalta. Keskinopeuden voi laskea tästä kertomalla vapaanopeus-arvon tällä prosenttiluvulla.
| 5152<br>5125 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2 | km/h | Kentässä oleva arvo on keskinopeus (km/h) viimeiseltä viideltä minuutilta.
| 5064<br>5068 | OHITUKSET_5MIN_KIINTEA_ SUUNTA1_MS1  OHITUKSET_5MIN_KIINTEA_SUUNTA2_MS2 | | Kiinteän aikavälin ohitukset kertovat aikaikkunan aikavälin automäärän ekstrapoloituna tunnille. Eli paljonko autoja kulkisi tunnissa, mikäli ohitusten määrä pysyisi ko. aikavälin tasolla.
|5054<br>5055<br>5067<br>5071| OHITUKSET_60MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_60MIN_KIINTEA_SUUNTA2_MS2 | |
|5116<br>5119| OHITUKSET_5MIN_LIUKUVA_SUUNTA1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2 | kpl/h | Viimeisen 5 minuutin automäärä ekstrapoloituna tunti määräksi. Eli paljonko autoja kulkisi tunnissa jos virta pysyisi samana kuin viimeisen viiden minuutin aikana.
|5164<br>5168| OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2 | % maksimista | Viimeisen 5 minuutin automäärä % maksimimäärästä (MS1) e kstrapolointi tunti määräksi.
|5056<br>5057| KESKINOPEUS_60MIN_KIINTEA_SUUNTA1  KESKINOPEUS_60MIN_KIINTEA_SUUNTA2 | km/h |
|5058<br>5061| KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2 | |

# Anturivakiot
Alla on listattu laskennallisten anturien laskennassa käyttämien anturivakioiden arvoja. Huomaathan että vakioiden arvot vaihtelevat asemakohtaisesti, tarkista arvot täältä: [https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants](https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants).

| Vakion nimi | Yksikkö | Arvoalue | Kuvaus
| --- | --- | --- | ---
| VVAPAAS1<br>VVAPAAS2 | km/h | 18-107 | Suunnan vapaanopeus.
| MS1<br>MS2 | kpl/h | 200-3600<br>200-14000 | Vapaakaistan maksimi automäärä tunnissa tierekisterin kavavaan/laskevaan suuntaan.
| Tien_suunta | Aste (°) | 0–360° | Tien suunta asteina tierekisterin kasvavaan suuntaan. Pohjoinen 0°, itä 90°, jne.
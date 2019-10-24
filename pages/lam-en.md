---
layout: sub-traffictype
permalink: /en/road-traffic/lam/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: TMS data
lang: en
ref: tms
intro: Traffic measurement system data
---

TMS-stations are composed of data collection units and induction loops embedded in roads. There are more than 450 stations in Finland. The stations contain sensors that produce computational data. The computations use sensor constants whose values are station specific.

# Computational sensors
The table below contains additional information about sensors.

| Id | Name | Unit | Description
| --- | --- | --- | ---
| 5158<br>5161 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2 | % of the speed limit | The value is a percentage (%) of the road speed limit the last five minutes. The average speed can be calculated by multiplying this percentage with the  speed limit.
| 5152<br>5125 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2 | km/h | The value is the average speed from the last five minutes.
| 5064<br>5068 | OHITUKSET_5MIN_KIINTEA_ SUUNTA1_MS1  OHITUKSET_5MIN_KIINTEA_SUUNTA2_MS2 | | Vehicle passes in a fixed time window, extrapolated by the hour. I.e. how many vehicles would pass in an hour if the amount of vehicles would equal the amount of passes during the time period.
|5054<br>5055<br>5067<br>5071| OHITUKSET_60MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_60MIN_KIINTEA_SUUNTA2_MS2 | |
|5116<br>5119| OHITUKSET_5MIN_LIUKUVA_SUUNTA1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2 | kpl/h | Vehicles passed from the last minutes extrapolated to the hour.
|5164<br>5168| OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2 | % of the maximum | Percentage of vehicles passed during the last 5 minutes from the maximum amount of vehicles extrapolated to the hour.
|5056<br>5057| KESKINOPEUS_60MIN_KIINTEA_SUUNTA1  KESKINOPEUS_60MIN_KIINTEA_SUUNTA2 | km/h |
|5058<br>5061| KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2 | |

# Sensor constans
The table below contains values for sensor constants used by computational sensors. Note that the constant values vary by station, check the out here: [https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants](https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants).

| Constant | Unit | Value range | Description
| --- | --- | --- | ---
| VVAPAAS1<br>VVAPAAS2 | km/h | 18-107 | Suunnan vapaanopeus.
| MS1<br>MS2 | kpl/h | 200-3600<br>200-14000 | Vapaakaistan maksimi automäärä tunnissa tierekisterin kavavaan/laskevaan suuntaan.
| Tien_suunta | Aste (°) | 0–360° | Tien suunta asteina tierekisterin kasvavaan suuntaan. Pohjoinen 0°, itä 90°, jne.
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

* LIUKUVA = Measurements from the last n minutes
* KIINTEA = Measurements from the fixed n minutes time window 

| Id | Name | Unit | Description
| --- | --- | --- | ---
| 5152<br>5125 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2 | km/h | The average speed for the last five minutes.
| 5158<br>5161 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2 | % of the free flow speed | The average speed percentage of the road free flow speed for last five minutes.<br><code>Value descriptions:<br>0 – 10 Stationary<br>10 – 25 Queuing<br>25 – 75 Slow<br>75 – 90 Platooning<br>90 – 100 Fluent</code>
|5056<br>5057| KESKINOPEUS_60MIN_KIINTEA_SUUNTA1  KESKINOPEUS_60MIN_KIINTEA_SUUNTA2 | km/h | The average speed for the given 60 minutes time period.
|5058<br>5061| KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2 |  % of the free flow speed | The average speed percentage of the road free flow speed for for the given 5 min time period. Value descriptions: see above KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1.
|5116<br>5119| OHITUKSET_5MIN_LIUKUVA_SUUNTA1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2 | kpl/h | Vehicles passed from the last 5 minutes extrapolated to the one hour. I.e. how many vehicles would pass in an hour if the amount of vehicles would equal the amount of passes during the last five minutes.
|5164<br>5168| OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2 | % of the maximum | Percentage of vehicles passed during the last 5 minutes (extrapolated to one hour) from the maximum amount of vehicles per hour (MS1/MS2).
| 5064<br>5068 | OHITUKSET_5MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_5MIN_KIINTEA_SUUNTA2_MS2 | kpl/h | Percentage of vehicles passed during the fixed 5 minutes time window from the maximum amount of vehicles per hour (MS1/MS2)
| 5054<br>5055 | OHITUKSET_60MIN_KIINTEA_SUUNTA1 OHITUKSET_60MIN_KIINTEA_SUUNTA2 | kpl/h | Vehicle passes in the fixed 60 minutes time window.
|5054<br>5055<br>5067<br>5071| OHITUKSET_60MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_60MIN_KIINTEA_SUUNTA2_MS2 | % of the maximum | Percentage of vehicles passed during the fixed 60 minutes time window from the maximum amount of vehicles per hour (MS1/MS2).

# Sensor constans
The table below contains values for sensor constants used by computational sensors. Note that the constant values vary by station, check the out here: [https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants](https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants).

| Constant | Unit | Value range | Description
| --- | --- | --- | ---
| VVAPAAS1<br>VVAPAAS2 | km/h | 18-107 | Speed limit for a direction.
| MS1<br>MS2 | kpl/h | 200-3600<br>200-14000 | A lane's maximum amount of vehicles per hour in an ascending/descending direction.
| Tien_suunta | Aste (°) | 0–360° | Road direction by degrees in an ascending/descending direction. North 0°, east 90°, etc.

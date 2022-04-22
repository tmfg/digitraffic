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

TMS stations are composed of data collection units and induction loops embedded in roads. There are more than 450 stations in Finland. The stations contain sensors that produce computational data. The computations use sensor constants whose values are station-specific. The TMS device registers vehicles passing the point, recording data such as time, direction, lane, speed, vehicle length, time elapsed between vehicles and the vehicle class.

* Do not remove this line (it will not be displayed)
{:toc}

# Historical data

In addition to providing real time data, the Digitraffic service enables the utilization of historical data collected from TMS stations.

## TMS reports

There are prebuilt reports based on the data available through a form.

[```https://tie-lam-test.digitraffic.fi```](https://tie-lam-test.digitraffic.fi){:target="_blank"}

- **Available data**: statistics of traffic volumes is available since 2010, average speeds since 2020 and raw data since December 2021.  
- **Updating and reliability of traffic volumes**: yesterday’s data is updated each day usually between 8:00 and 9:00. If there are deviations in traffic volumes this subset of data is updated usually within a couple of days. Traffic volumes are inspected and corrected using advanced algorithms if needed.
- **Updating and reliability of average speeds**: yesterday’s data is updated each day usually between 8:00 and 9:00. Average speeds are calculated based on the actual detections from the device, which means the number of detected vehicles might deviate from traffic volumes in case the traffic volumes are corrected. 
- **Updating and reliability of raw data**: yesterday’s data is updated each day usually between 8:00 and 9:00. The number of detected vehicles in raw data might deviate from traffic volumes in case the traffic volumes are corrected, or new raw data is updated after publishing of traffic volumes.
- **Data processing**: traffic volumes of each hour are inspected and corrected if needed. Faulty detections are removed from average speeds and raw data (Look The value of “faulty” is 1 if ...). The form returns data on a summarized level and allows users to choose their desired level of detail and filter data for example based on date, direction, lane and vehicle class. 

## TMS raw data

Data collected from the stations is also available in raw form. The data is converted to a CSV format but not altered in any way.

### Accessing the data

TMS data is available in CSV files, one file for each TMS point for each day ("result file" below). A specific URL path is needed when accessing the data:

```https://tie-test.digitraffic.fi/api/tms/history/raw/lamraw_[lam_id]_[yearshort]_[day_number].csv```

Where:

- lam_id = TMS point id
- yearshort = last two digits of the year
- day_number = ordinal date (1-366, taking into account leap years). 1.1. = 1

Example: to get data from TMS point number 101 for the date 1.2.2017, GET the URL:

[```https://tie-test.digitraffic.fi/api/tms/history/raw/lamraw_101_17_32.csv```](https://tie-test.digitraffic.fi/api/tms/history/raw/lamraw_101_17_32.csv){:target="_blank"}

### Description of the result file format

The result file is a CSV file separated by semicolons (;). The time is the current time in Finland: EET, or EEST during the summer. The CSV files contain the following fields (unit in parentheses):

- TMS point id
- year
- ordinal date
- hour
- minute
- second
- 1/100 second
- length (m)
- lane
- direction
- vehicle class
- speed (km/h)
- faulty (0=valid record, 1=faulty record)
- total time (technical)
- time interval (technical)
- queue start (technical)

The value of "faulty" is 1 if:

- year < 0 or year > 99
- day < 1 or day > 366
- hour < 0 or hour > 23
- minute < 0 or minute > 59
- second < 0 or second > 59
- "1/100 second" < 0 or "1/100 second" > 99
- speed < 2 or speed >= 199
- direction < 1 or direction > 2
- vehicle class < 1 or vehicle class > 7
- lane < 1
- length <= 1
- length > 39,8

The vehicle classes are:

1 HA-PA (car or delivery van)\
2 KAIP (truck, no trailer)\
3 Buses\
4 KAPP (semi-trailer truck)\
5 KATP (truck with trailer)\
6 HA + PK (car or delivery van with trailer)\
7 HA + AV (car or delivery van with trailer or camper)

# Real time data

## Computational sensors
The table below contains additional information about sensors.

* LIUKUVA = Measurements for the last n minutes
* KIINTEA = Measurements for a fixed window of n minutes 

| Id | Name | Unit | Description
| --- | --- | --- | ---
| 5152<br>5125 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2 | km/h | The average speed for the last five minutes.
| 5158<br>5161 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2 | % of the free flow speed | The average speed percentage of the road free flow speed for the last five minutes.<br><code>Value descriptions:<br>0 – 10 Stationary<br>10 – 25 Queuing<br>25 – 75 Slow<br>75 – 90 Platooning<br>90 – 100 Fluent</code>
| 5056<br>5057 | KESKINOPEUS_60MIN_KIINTEA_SUUNTA1  KESKINOPEUS_60MIN_KIINTEA_SUUNTA2 | km/h | The average speed for a given 60 minute period.
| 5058<br>5061 | KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2 |  % of the free flow speed | The average speed percentage of the road free flow speed for a given 5 minute period.<br><code>Value descriptions: see above KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1.</code>
| 5116<br>5119 | OHITUKSET_5MIN_LIUKUVA_SUUNTA1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2 | kpl/h | Vehicles passed from the last 5 minutes extrapolated to one hour. I.e. how many vehicles would pass during one hour if the rate of passes was the same as during the last five minutes.
| 5164<br>5168 | OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2 | % of the maximum | Percentage of vehicles passed during the last 5 minutes (extrapolated to one hour) from the maximum amount of vehicles per hour (MS1/MS2).
| 5064<br>5068 | OHITUKSET_5MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_5MIN_KIINTEA_SUUNTA2_MS2 | kpl/h | Percentage of vehicles passed during a given 5 minute window from the maximum amount of vehicles per hour (MS1/MS2)
| 5054<br>5055 | OHITUKSET_60MIN_KIINTEA_SUUNTA1 OHITUKSET_60MIN_KIINTEA_SUUNTA2 | kpl/h | Vehicle passes in a given 60 minute window.
| 5067<br>5071 | OHITUKSET_60MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_60MIN_KIINTEA_SUUNTA2_MS2 | % of the maximum | Percentage of vehicles passed during a given 60 minute window from the maximum amount of vehicles per hour (MS1/MS2).

## Sensor constants
The table below contains values for sensor constants used by computational sensors. Note that the constant values vary by station, look them up here: [https://tie-lam-test.digitraffic.fi/api/v1/data/tms-sensor-constants](https://tie-lam-test.digitraffic.fi/api/v1/data/tms-sensor-constants).

| Constant | Unit | Value range | Description
| --- | --- | --- | ---
| VVAPAAS1<br>VVAPAAS2 | km/h | 18-107 | Speed limit for a direction.
| MS1<br>MS2 | kpl/h | 200-3600<br>200-14000 | The maximum amount of vehicles per hour for a lane in an ascending/descending direction.
| Tien_suunta | Degree (°) | 0–360° | Road direction by degrees in an ascending/descending direction. North 0°, east 90°, etc.

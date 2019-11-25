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

* LIUKUVA = Mittaukset viimeiseltä n minuutilta
* KIINTEA = Mittaukset kiinteältä n minuutin aikaväliltä 

| Anturin tunniste | Nimi | Yksikkö | Selite
| --- | --- | --- | ---
| 5152<br>5125 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2 | km/h | Keskinopeus viimeiseltä viideltä minuutilta.
| 5158<br>5161 | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2 | % vapaasta nopeudesta | Keskinopeuden prosenttiosuus määritellystä tien vapaasta nopeudesta viimeisen viiden minuutin ajalta.<br>Arvovastaavuudet:<br><code>0 – 10 Seisoo<br>10 – 25 Pysähtelee<br>25 – 75 Hidasta<br>75 – 90 Jonoutunut<br>90 – 100 Sujuvaa</code>
| 5056<br>5057 | KESKINOPEUS_60MIN_KIINTEA_SUUNTA1  KESKINOPEUS_60MIN_KIINTEA_SUUNTA2 | km/h | Keskinopeus ilmoitetun 60 min aikavaikaikkunalta.
| 5058<br>5061 | KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1  KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2 | % vapaasta nopeudesta | Keskinopeuden prosenttiosuus määritellystä tien vapaasta nopeudesta ilmoitetulta 5 min aikaväliltä. Arvovastaavuudet: ks. yllä KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1.
| 5116<br>5119 | OHITUKSET_5MIN_LIUKUVA_SUUNTA1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2 | kpl/h | Viimeisen 5 minuutin automäärä ekstrapoloituna tunti määräksi. Eli paljonko autoja kulkisi tunnissa, jos virta pysyisi samana kuin viimeisen viiden minuutin aikana.
| 5164<br>5168 | OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1  OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2 | % maksimista | Viimeisen 5 minuutin (tunti määräksi ekstrapoloidun) automäärän prosenttiosuus maksimimäärästä (MS1).
| 5064<br>5068 | OHITUKSET_5MIN_KIINTEA_ SUUNTA1_MS1  OHITUKSET_5MIN_KIINTEA_SUUNTA2_MS2 | % maksimista | Ilmoitetun 5 minuutin aikavälin (tunti määräksi ekstrapoloidun) automäärän prosenttiosuus maksimimäärästä (MS1).
| 5054<br>5055 | OHITUKSET_60MIN_KIINTEA_SUUNTA1 OHITUKSET_60MIN_KIINTEA_SUUNTA2 | kpl/h | Ilmoitetun 60 minuutin aikavälin automäärä.
| 5054<br>5055<br>5067<br>5071 | OHITUKSET_60MIN_KIINTEA_SUUNTA1_MS1  OHITUKSET_60MIN_KIINTEA_SUUNTA2_MS2 | % maksimista | Ilmoitetun 60 minuutin aikavälin automäärän prosenttiosuus maksimimäärästä (MS1).

# Anturivakiot
Alla on listattu laskennallisten anturien laskennassa käyttämien anturivakioiden arvoja. Huomaathan että vakioiden arvot vaihtelevat asemakohtaisesti, tarkista arvot täältä: [https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants](https://tie.digitraffic.fi/api/v1/data/tms-sensor-constants).

| Vakion nimi | Yksikkö | Arvoalue | Kuvaus
| --- | --- | --- | ---
| VVAPAAS1<br>VVAPAAS2 | km/h | 18-107 | Suunnan vapaanopeus.
| MS1<br>MS2 | kpl/h | 200-3600<br>200-14000 | Vapaakaistan maksimi automäärä tunnissa tierekisterin kavavaan/laskevaan suuntaan.
| Tien_suunta | Aste (°) | 0–360° | Tien suunta asteina tierekisterin kasvavaan suuntaan. Pohjoinen 0°, itä 90°, jne.
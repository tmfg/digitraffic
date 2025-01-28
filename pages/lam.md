---
layout: sub-traffictype
permalink: /tieliikenne/lam/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: LAM-dokumentaatio
lang: fi
ref: tms
intro: Liikenteen automaattiset mittaustiedot
---

Fintraffic kerää tietoa tieliikenteestä liikenteen automaattisten mittausasemien
(LAM) avulla. Tarjolla on reaaliaika- ja historiadataa.

<!-- deno-fmt-ignore -->
- Do not remove this line (it will not be displayed)
{:toc}

# Mittauspisteiden toiminta

LAM-pisteen toiminta perustuu päällysteen sisälle upotetun silmukan
sähkömagneettiseen induktioon, jolloin ajoneuvon metallinen massa aiheuttaa
muutoksen silmukan magneettikentässä. LAM-piste muodostuu kullakin kaistalla
olevasta kahdesta induktiosilmukasta ja tiedonkeruuyksiköstä. LAM-laite
rekisteröi pisteen ylittävät ajoneuvot, jolloin jokaisesta ajoneuvosta saadaan
ohituksen kellonaika, ajosuunta, ajokaista, ajonopeus, ajoneuvon pituus,
peräkkäisten ajoneuvojen aikaero ja ajoneuvoluokka. Asemia on Suomessa yli 450.

# Reaaliaikadata

Digitraffic palvelu tarjoaa mahdollisuuden hyödyntää LAM-asemilta kerättyä
reaaliaikadataa. Päädokumentaatio löytyy
[Tieliikenne/Liikenteen automaattiset mittaustiedot (LAM)](/tieliikenne/#liikenteen-automaattiset-mittaustiedot-lam)
-sivulta.

Alta löydät lisätietoja rajapintojen tarjoamasta datasta.

## Laskennalliset anturit

Alla on lisätietoa LAM-pisteiden laskennallisista antureista.

- LIUKUVA = Mittaukset viimeiseltä n minuutilta
- KIINTEA = Mittaukset kiinteältä n minuutin aikaväliltä

| Anturin tunniste | Nimi                                                                                | Yksikkö               | Selite                                                                                                                                                                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 5122<br>5125     | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1 KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2                   | km/h                  | Keskinopeus viimeiseltä viideltä minuutilta.                                                                                                                                                                                                                             |
| 5158<br>5161     | KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1 KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2 | % vapaasta nopeudesta | Keskinopeuden prosenttiosuus määritellystä tien vapaasta nopeudesta viimeisen viiden minuutin ajalta.<br><code>Arvovastaavuudet:<br>0 – 10 Seisoo<br>10 – 25 Pysähtelee<br>25 – 75 Hidasta<br>75 – 90 Jonoutunut<br>90 – 100 Sujuvaa<br>100 – Yli vapaan nopeuden</code> |
| 5056<br>5057     | KESKINOPEUS_60MIN_KIINTEA_SUUNTA1 KESKINOPEUS_60MIN_KIINTEA_SUUNTA2                 | km/h                  | Keskinopeus ilmoitetulta 60 min aikaikkunalta.                                                                                                                                                                                                                           |
| 5058<br>5061     | KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1 KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2 | % vapaasta nopeudesta | Keskinopeuden prosenttiosuus määritellystä tien vapaasta nopeudesta ilmoitetulta 5 min aikaväliltä.<br><code>Arvovastaavuudet: ks. yllä KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1.</code>                                                                                |
| 5116<br>5119     | OHITUKSET_5MIN_LIUKUVA_SUUNTA1 OHITUKSET_5MIN_LIUKUVA_SUUNTA2                       | kpl/h                 | Viimeisen 5 minuutin automäärä ekstrapoloituna tuntimääräksi. Eli paljonko autoja kulkisi tunnissa, jos virta pysyisi samana kuin viimeisen viiden minuutin aikana.                                                                                                      |
| 5164<br>5168     | OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1 OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2               | % maksimista          | Viimeisen 5 minuutin (tuntimääräksi ekstrapoloidun) automäärän prosenttiosuus maksimimäärästä (MS1/MS2).                                                                                                                                                                 |
| 5064<br>5068     | OHITUKSET_5MIN_KIINTEA_ SUUNTA1_MS1 OHITUKSET_5MIN_KIINTEA_SUUNTA2_MS2              | % maksimista          | Ilmoitetun 5 minuutin aikavälin (tunti määräksi ekstrapoloidun) automäärän prosenttiosuus maksimimäärästä (MS1/MS2).                                                                                                                                                     |
| 5054<br>5055     | OHITUKSET_60MIN_KIINTEA_SUUNTA1 OHITUKSET_60MIN_KIINTEA_SUUNTA2                     | kpl/h                 | Ilmoitetun 60 minuutin aikavälin automäärä.                                                                                                                                                                                                                              |
| 5067<br>5071     | OHITUKSET_60MIN_KIINTEA_SUUNTA1_MS1 OHITUKSET_60MIN_KIINTEA_SUUNTA2_MS2             | % maksimista          | Ilmoitetun 60 minuutin aikavälin automäärän prosenttiosuus maksimimäärästä (MS1/MS2).                                                                                                                                                                                    |

## Anturivakiot

Alla on listattu laskennallisten anturien laskennassa käyttämien anturivakioiden
arvoja. Huomaathan että vakioiden arvot vaihtelevat asemakohtaisesti, tarkista
arvot täältä:
[/api/tms/v1/stations/sensor-constants](https://tie.digitraffic.fi/api/tms/v1/stations/sensor-constants).

| Vakion nimi          | Yksikkö  | Arvoalue              | Kuvaus                                                                                         |
| -------------------- | -------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| VVAPAAS1<br>VVAPAAS2 | km/h     | 18-107                | Keskimääräinen oletettu matkanopeus, kun liikennevirta kulkee sille ominaista tavoitenopeutta. |
| MS1<br>MS2           | kpl/h    | 200-3600<br>200-14000 | Vapaakaistan maksimi automäärä tunnissa tierekisterin kasvavaan/laskevaan suuntaan.            |
| Tien_suunta          | Aste (°) | 0–360°                | Tien suunta asteina tierekisterin kasvavaan suuntaan. Pohjoinen 0°, itä 90°, jne.              |

# Historiadata

Digitraffic palvelu tarjoaa mahdollisuuden hyödyntää myös LAM-asemilta kerättyä
aineistojen historiadataa. Historia-aineistoja on kahden tyyppisiä:

- LAM-raportit
  - Tarkimmillaan tuntitason summatietoja
  - Tiedot ovat tarkastettuja ja tarvittaessa korjattuja
  - Esimerkiksi tiedonsiirtokatkoksien aiheuttamat puutteet on korjattu aiempaan
    liikennemäärähistoriaan perustuvalla korjausehdotuksella
  - Julkaisuviive: tyypillisesti alle 10 prosentilla LAM-pisteistä esiintyy
    tarkistettavaa ja näiden pisteiden tiedot julkaistaan muutaman päivän
    kuluessa
- LAM-raakadata
  - yksittäisistä ajoneuvo-ohituksista kerättyä dataa, jota ei ole käsitelty
    muuten kuin purettu CSV-muotoiseksi
  - Julkaisuviive: päivän aikana kerätty raakadata tulee saataville seuraavana
    päivänä

## LAM-tilastohaku

Havainnoista on muodostettu valmiita raportteja joita voi hakea lomakkeen
kautta:

[`https://tie.digitraffic.fi/ui/tms/history/`](https://tie.digitraffic.fi/ui/tms/history/){:target="_blank"}

- **Kattavuus**: Liikennemäärädatan osalta aineistoa on saatavilla vuodesta 2010
  alkaen ja nopeustietoja vuodesta 2020 alkaen. Raakadatatiedot löytyvät 12/2021
  lähtien.
- **Liikennemäärätietojen ajantasaisuus ja tiedon luotettavuus**: havaintopäivän
  tiedot tulevat tyypillisesti saataville seuraavana päivänä klo 8 ja 9 välillä
  tai jos liikennemäärätiedoissa on havaittu tarkistettavaa, tulevat nämä
  saataville muutaman päivän kuluessa. Liikennemäärätiedot ovat ns. korjattua
  dataa, joten mahdolliset tietopuutteet tai virheet on korjattu tietokannassa
  kehittyneiden korjausalgoritmien mukaan.
- **Nopeustietojen ajantasaisuus ja tiedon luotettavuus**: havaintopäivän tiedot
  tulevat saataville seuraavana päivänä. Julkaisu tapahtuu tyypillisesti klo 8
  ja 9 välillä. Keskinopeustiedot lasketaan laskentalaitteen antamien
  havaintojen perusteella, joten nopeuslaskennan havaintomäärät voivat poiketa
  liikennemääräraporttien havaintomäärissä, mikäli liikennemäärädataa on
  jouduttu korjaamaan.
- **Raakadatatietojen ajantasaisuus ja luotettavuus**: havaintopäivän tiedot
  tulevat saataville seuraavana päivänä tyypillisesti klo 8 ja 9 välillä.
  Raakadatan havaintomäärät voivat poiketa liikennemääräraporttien
  havaintomääristä, mikäli liikennemäärädataa on jouduttu korjaamaan tai mikäli
  raakadata on vielä päivittynyt liikennemäärätiedon julkaisun jälkeen.
- **Tietojen käsittely**: liikennemäärätiedot tarkastetaan ja tarvittaessa
  korjataan tuntitasolla. Nopeus- ja raakadatahavainnoista poistetaan
  faulty-havainnot (kts. Faulty –arvo päätellään seuraavasti). Lomake palauttaa
  summattuja tietoja käyttäjän valitsemilla rajauksilla ja summaa ne halutulle
  tarkkuustasolle (mm. aika-, suunta-, kaista-, ajoneuvoluokkavalinta).

## LAM-raakadata

Asemilta kerättyä aineistoa on saatavissa ajoneuvo-ohituksen tarkkuudella
LAM-raakadatana. Tätä aineistoa ei ole käsitelty muuten kuin purettu
CSV-muotoiseksi.

### Tiedostojen hakeminen

LAM-tiedot on jaettu päivä- ja LAM-pistekohtaisiin CSV-tiedostoihin (alla
"Tulostiedosto"). Tietoja haettaessa tarvitaan tiedoston tarkka polku ja nimi
muodossa:

`https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_[lam_id]_[yearshort]_[day_number].csv`

Jossa:

- lam_id = LAM-pisteen tunniste
- yearshort = vuosiluvun kaksi viimeistä numeroa.
  - 2009 = 9
  - 2021 = 21
- ## day_number = päivän järjestysnumero vuoden alusta laskettuna.
  1. tammikuuta = 1
  -
    1. helmikuuta = 32
  - Kannattaa kiinnittää erityistä huomiota päivän numeron käsittelyyn
    karkausvuosina, kuten vuonna 2020.

Esimerkiksi: Pisteen 101 tiedot päivältä 1.2.2017, saadaan kutsulla

[`https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_101_17_32.csv`](https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_101_17_32.csv){:target="_blank"}

### Tulostiedoston kuvaus

Tulostiedosto on puolipistein eroteltu CSV –tiedosto, jossa on seuraavat kentät.
(mittayksikkö suluissa) Kellonaika on Suomen aika, eli EET, tai kesäaikana EEST.

- pistetunnus
- vuosi
- päivän järjestysnumero
- tunti
- minuutti
- sekunti
- sadasosasekunti
- pituus (m)
- kaista
- suunta
- ajoneuvoluokka
- nopeus (km/h)
- faulty (0=validi havainto, 1=virheellinen havainto)
- kokonaisaika (tekninen)
- aikaväli (tekninen)
- jonoalku (tekninen)

Faulty –arvo päätellään seuraavasti:

- vuosi on pienempi kuin nolla tai vuosi on suurempi kuin 99
- päivä on pienempi kuin 1 tai suurempi kuin 366
- tunti on pienempi kuin 0 tai suurempi kuin 23
- minuutti on pienempi kuin 0 tai suurempi kuin 59
- sekunti on pienempi kuin 0 tai suurempi kuin 59
- sadasosasekunti on pienempi kuin 0 tai suurempi kuin 99
- nopeus on pienempi kuin 2 tai suurempi tai yhtä suuri kuin 199
- suunta on pienempi kuin 1 tai suurempi kuin 2
- ajoneuvoluokka on pienempi kuin 1 tai suurempi kuin 7
- kaista on pienempi kuin 1
- pituus on pienempi tai yhtä suuri kuin 1
- pituus on suurempi kuin 39,8

Ajoneuvoluokat määräytyvät seuraavasti:

1 HA-PA (henkilö- tai pakettiauto)\
2 KAIP (kuorma-auto ilman perävaunua)\
3 Linja-autot\
4 KAPP (kuorma-auto ja puoliperävaunu)\
5 KATP (kuorma-auto ja täysperävaunu)\
6 HA + PK (henkilöauto ja peräkärry)\
7 HA + AV (henkilöauto ja asuntovaunu)\
8 MP (Moottoripyörät ja mopot)\
9 HCT (High Capacity Truck)

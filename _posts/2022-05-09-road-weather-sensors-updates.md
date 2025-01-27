---
title: 'Muutoksia tiesääasemiin ja niiden antureihin'
image:
published: true
categories: Tiedotteet
ref: 2022-05-09-road-weather-sensors-updates
lang: fi
traffictypes:
    - Tieliikenne
tags:
    - Rajapinnat
---

Tiesääasemien keruissa tehdään muutoksia viikolla 20 ti–to 17.–19.5.2022 ja tämä
aiheuttaa muutoksia rajapinnoista palautettavaan dataan. Aiemmin yhdestä
fyysisestä sijainnista kerättiin dataa teknisten rajoitteiden vuoksi useilla
asematunnuksilla. Jatkossa kaikki yhdestä sijainnista tuleva data on yhden
asematunnuksen alla, joten jaettavien asemien määrää vähenee.

Muutos koskee niitä asemia, jotka ovat oikeasti tyypiltään RWS200 asemia, mutta
näkyvät rajapinnassa ROSA-tyyppisina. Muutoksen jälkeen nämä asevat näkyvät
rajapinnassa RWS_200 -tyyppisinä aiemman ROSA-tyypin sijaan. Asemat, joita
muutos ei koske, jäävät ROSA-tyyppisiksi. Tämän seurauksena "pääaseman" nimi
muuttuu ja rinnakkaisasemat poistuvat rajapinnasta. Pääsemalle tulee lisää
antureita ja siirtyvien antureiden id ja nimi muuttuvat.

Esimerkiksi `ROSA`-tyyppinen `vt7_Sipoo_Box_1`-asema muuttuu RWS200-tyyppiseksi
ja siitä tulee ns. pääasema, jolloin sen nimestä poistuu numero-osa lopusta.
Tällöin aseman nimeksi tulee `vt7_Sipoo_Box` ja tyypiksi `RWS_200`.
Rinnakkaisasemat `vt7_Sipoo_Box_2`, `vt7 Sipoo_Box Opt1` ja `vt7_Sipoo Box Opt2`
poistuvat kokonaan. Rinnakkaisasemien anturit siirtyvä pääaseman alle ja
päällekkäisten antureiden nimet muuttuvat. Esim. `vt7_Sipoo_Box_2` -aseman
anturi `3` `TIE_1` siirtyy `vt7_Sipoo_Box` -aseman anturiksi `101` `TIE_3`

Uudet anturityypit ovat jo jaossa anturi-rajapinnassa:
[https://tie.digitraffic.fi/api/v1/metadata/weather-sensors](https://tie.digitraffic.fi/api/v1/metadata/weather-sensors)

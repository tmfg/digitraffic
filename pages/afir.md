---
layout: sub-traffictype
permalink: /tieliikenne/afir/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: Vaihtoehtoiset polttoaineet
lang: fi
ref: afir
intro: AFIR
---

Digitrafficissa julkaistaan vaihtoehtoisten polttoaineiden latausverkoston dataa avoimena datana.
Tällä hetkellä data sisältää sähköautojen latauspisteiden sijainnit sekä niihin liittyvää staattista että
reaaliaikatietoa.

Lisätietoa AFIR-velvoitteista sekä toimintaohje latausalan toimijoille
kuinka saada data jakoon [digitraffic.fi][digitraffic_fi] -palveluun löytyy [Fintrafficin][fintraffic_fi] sivuilta:

* Suomeksi [Vaihtoehtoiset polttoaineet (AFIR)][fintraffic_afir_fi]
* Ruotsiksi [Alternativa drivmedel (AFIR)][fintraffic_afir_sv]
* Englanniksi [Alternative Fuels (AFIR)][fintraffic_afir_en]

<h2 id="sisältö">Sisältö</h2>

- Do not remove this line (it will not be displayed). Next line must not have spaces.
{:toc}

Digitraffic tarjoaa Vaihtoehtoisten polttoaineiden latausverkoston dataa REST-rajapintoina sekä reaaliaikaista
statustietoa MQTT-topikkina.

# REST-rajapinnat

Rajapintojen Swagger-dokumentaatiot löytyvät seuraavista osoitteista:

* [Swagger UI – AFIR][swagger_afir]
* [Swagger UI – AFIR test][swagger_afir_test]

Rajapintojen sivutus on toteutettu kursoripohjaisesti, mikä mahdollistaa tehokkaan navigoinnin suurissa tietomäärissä.
Jokainen sivutettu vastaus sisältää nextCursor-kentän, joka osoittaa kohdan, josta seuraavan sivun haku jatkuu.
Asiakas voi hakea seuraavan sivun lisäämällä pyynnön kyselyparametriksi: `?cursor=<nextCursor-arvo>`.

**Esimerkki:**

Ensimmäinen pyyntö tehdään ilman kursoria:

`GET /api/charging-network/v1/locations`

Vastaus sisältää `nextCursor`-arvon:

```
{
  "pagination": {
    "nextCursor": "ABCD",
    "limit": 500
  },
...
}
```

Seuraava pyyntö tehdään käyttäen `nextCursor`-arvoa:

`GET /api/charging-network/v1/locations?cursor=ABCD`

Vastaus sisältää taas seuraavan `nextCursor`-arvon:

```
{
  "pagination": {
    "nextCursor": "CDGH",
    "limit": 500
  },
...
}
```

Mikäli `nextCursor` on `null` tai puuttuu, ei seuraavaa sivua ole enää saatavilla.

Vastauksen `limit` -kenttä kertoo sivun koon. Tällä hetkellä sivun koko on kiinteä 500, mutta tämä voi muuttua
tulevaisuudessa, kun jaettavan datan määrä lisääntyy.

## Latauspisteoperaattorit (CPO)

Latauspisteoperaattorit (CPO, Charge Point Operator) ylläpitävät latauspisteitä ja vastaavat niiden toiminnasta.
Rajapinta tarjoaa palvelusta löytyvien operaattorien tiedot.

[`/api/charging-network/v1/operators`][afir_api_operators]

## Latauspisteiden sijainnit

Sijainnit jaetaan GeoJSON-muodossa ja lisäksi tiettyjen operaattoreiden tiedot myös Datex II v3.6-muodossa.
Sijaintitiedot sisältävät latauspisteiden staattiset tiedot.

[`/api/charging-network/v1/locations`][afir_api_locations] (GeoJSON)\
[`/api/charging-network/v1/locations/datex2-3.6`][afir_api_locations_datex_ii] (Datex II v3.6)

## Latauspisteiden statukset

Latauspisteeseen liittyvien EVSE-laitteiden (Electric Vehicle Supply Equipment) statustiedot sisältävät reaaliaikaisen
tiedon
latauspisteen käytettävyydestä ja varaustilanteesta.
Tiedot ovat saatavilla JSON-muodossa sekä Datex II v3.6. -muodossa tietyiltä operaattoreilta.

[`/api/charging-network/v1/locations/statuses`][afir_api_locations_statuses] (GeoJSON)\
[`/api/charging-network/v1/locations/statuses/datex2-3.6`][afir_api_locations_statuses_datex_ii] (Datex II v3.6)

# MQTT WebSocket -rajapinnat

Reaaliaikaiset statustiedot ovat saatavilla myös MQTT over WebSockets protokollalla.
MQTT-aiheiden avulla voidaan rajata kuunneltavia kohteita.

Tuotannon osoite on `wss://afir.digitraffic.fi:443/mqtt`
Tuotannon osoite on `wss://afir-test.digitraffic.fi:443/mqtt`

Kirjautuessa tulee käyttää SSL-yhteyttä.

Pahon JS-clientia käyttäessä osoite on pelkkä `afir.digitraffic.fi` ja portti `443`.

Yksinkertainen selainpohjainen MQTT-esimerkkisovellus löytyy sivulta [Tuki > MQTT-esimerkkejä][mqtt_example].

Aiheen (topic) muoto on seuraava:
`status-v1/<operatorCountryCode>/<operatorPartyId>/<locationId>/<evseId>`

Jokainen hierarkiatason kenttä rajaa tarkemmin, mitä statustietoja kuunnellaan. `#` lopussa tarkoittaa "kaikki"
kyseisellä tasolla.

**Esimerkki**:

**Operaattori**: `Nyt Lataa Oy`\
**Maakoodi**: `FI`\
**Osapuoli-id**: `NYT`\
**Sijainnin id**: `FINYT00001`\
**EVSE ID**: `FI*NYT*E12345`

**Aihe**: `status-v1/FI/NYT/FINYT00001/FI*NYT*E12345`

Tai jos halutaan kuunnella kaikkia kyseisen operaattorin latauspisteiden statuksia:

**Aihe**: `status-v1/FI/NYT/#`

Viestin sisältö on JSON-muotoinen ja vastaa REST-rajapinnan latauspisteiden statukset -rajapinnan palauttamaa tietoa.

``` 
{
  "status" : "CHARGING",
  "time" : "2025-12-02T09:38:06.000Z"
}
```

Viestin aihe (topic) kertoo aina, minkä latauslaitteen statuksesta on kyse.

# Tulevat ominaisuudet

Suunnitteilla on lisätä ladattavat snapshot-tiedostot asemien kaikista tiedoista.
Tiedostot päivittyvät automaattisesti määräajoin.


[swagger_afir_test]: https://afir-test.digitraffic.fi/swagger/  "AFIR test Swagger UI"

[swagger_afir]: https://afir.digitraffic.fi/swagger/  "AFIR Swagger UI"

[afir_api_operators]: https://afir.digitraffic.fi/api/charging-network/v1/operators

[afir_api_locations]: https://afir.digitraffic.fi/api/charging-network/v1/locations

[afir_api_locations_datex_ii]: https://afir.digitraffic.fi/api/charging-network/v1/locations/datex2-3.6

[afir_api_locations_statuses]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses

[afir_api_locations_statuses_datex_ii]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses/datex2-3.6

[mqtt_example]: /tuki/script-mqtt/ "MQTT esimerkkejä"

[digitraffic_fi]: / "digitraffic.fi"

[digitraffic_en]: /en/ "digitraffic.fi/en"

[fintraffic_fi]: https://www.fintraffic.fi/fi  "Fintraffic – fi"

[fintraffic_en]: https://www.fintraffic.fi/en  "Fintraffic – en"

[fintraffic_afir_fi]: https://www.fintraffic.fi/fi/digitaalisetpalvelut/afir  "Fintraffic – Vaihtoehtoiset polttoaineet (AFIR)"

[fintraffic_afir_sv]: https://www.fintraffic.fi/sv/digitalatjanster/afir  "Fintraffic – Alternativa drivmedel (AFIR)"

[fintraffic_afir_en]: https://www.fintraffic.fi/en/digitalservices/afir  "Fintraffic – Alternative Fuels (AFIR)"
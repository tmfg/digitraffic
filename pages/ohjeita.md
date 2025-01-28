---
layout: traffictype
hero-image: code
permalink: /tuki/ohjeita/
redirect_from:
  - /ohjeita/
section: Tietolähteet
searchable: true
lang: fi
ref: instructions
title: Ohjeita
intro: Ohjeita ohjelmoijille
---

<h2 id="sisalto">Sisältö</h2>

<!-- deno-fmt-ignore -->
- Do not remove this line (it will not be displayed)
{:toc}

# Yleistä huomioitavaa

## Sovelluksen yksilöivät otsikkotiedot

Toivomme, että rajapintojen käyttäjät käyttäisivät kaikissa HTTP-pyynnöissä alla
kuvattuja HTTP-otsikkotietoja. Näin pystymme seuraamaan erilaisesta käytöstä
tulevaa kuormaa sekä reagoimaan mahdollisiin virhetilanteisiin paremmin.
Esimerkkinä voisi olla ohjelmointivirhe, joka aiheuttaa huomattavan kuorman
tekemällä ylimääräisiä pyyntöjä rajapintoihimme. Jos alla mainitut tiedot ovat
kunnossa, pystymme tunnistamaan osapuolen ja välittämään tiedon mahdollisesta
ongelmasta sovelluksessa kehittäjälle tai ylläpitäjälle. Mikäli haluat että
sinuun otetaan yhteyttä esim. liian ison pyyntömäärän takia, ilmoita sovellus
sivustollemme
[https://www.digitraffic.fi/ilmoita-oma-sovellus/](https://www.digitraffic.fi/ilmoita-oma-sovellus/).

### Digitraffic-User -otsikko

Digitraffic-User -otsikon tulisi sisältää tunnistettava käyttäjätaho ja/tai
sovellus. Otsikon käyttö mahdollistaa kyselyjen tekemisen tiheämpään kuin ilman
sitä. Katso [rajoitukset](#pyyntöjen-rajoittaminen). Alla esimerkkejä.

`Digitraffic-User: TMFG`\
`Digitraffic-User: Liikennetilanne`\
`Digitraffic-User: TMFG/Liikennetilanne`

#### Huomio!

Älä lähetä mitään henkilötietoja kuten nimeä tai sähköpostiosoitetta
otsikkotietojen mukana! Jos sinulla on useampi sovellus jotka haluat
yhdistettävän itseesi, käytä vaikka nimimerkkiä, esim.\
`Digitraffic-User: Junamies/FoobarApp 1.0`

#### Esimerkkejä

```bash
curl -H 'Digitraffic-User: Junamies/FoobarApp 1.0'  

wget --header='Digitraffic-User: Junamies/FoobarApp 1.0'
```

## Rajapintojen versiointi ja elinkaari

![Rajapintojen elinkaari]({{ site.baseurl }}{{ "/img/ohjeita/api-life-cycle.png"
}})

Kun uutta rajapintaa kehitetään, julkaistaan se aina ensimmäiseksi beta-versiona
testikäyttöön. Beta-rajapinnoista tiedotetaan Google-ryhmissä ja sivustolla.
Hyödyntäjiä kannustetaan antamaan palautetta, jotta uutta rajapintaa voitaisiin
tarvittaessa vielä muuttaa paremmin tarkoitustaan vastaavaksi. Kun rajapinta
todetaan julkaisukelpoiseksi, julkaistaan siitä uusi versio ja vanha rajapinta
merkitään vanhentuneeksi. Vanha rajapintaversio on saatavilla vielä kuusi
kuukautta, jonka jälkeen se poistetaan palvelusta. Tänä aikana vanhentuneen
rajapinnan tietoturva- ja virheenkorjauksia harkitaan tapauskohtaisesti. Yllä
oleva kuva pyrkii selventämään rajapintojen elinkaarta.

Uusista rajapintaversioista tiedotetaan tällä sivustolla sekä
[tie](https://groups.google.com/g/roaddigitrafficfi)-,\
[meri](https://groups.google.com/g/meridigitrafficfi)- ja
[rata](https://groups.google.com/u/1/g/rata_digitraffic_fi)- Google-ryhmissä.

Rajapintojen deprekoinneista tiedotetaan
[Digitraffic-statuspalvelun](https://status.digitraffic.fi) kautta. Lisäksi
vanhentuneet rajapinnat palauttavat vastauksissa HTTP-otsakkeet `Deprecation` ja
`Sunset`, sisältäen tiedot rajapinnan vanhentumisesta sekä suunnitellusta
poistumispäivämäärästä. Esim:

```
Deprecation: true
Sunset: Tue,1 Nov 2022 00:00:00 GMT
```

Vanhentuneet rajapinnat ja niiden poistumispäivämäärät päivittyvät myös
erilliselle koontisivulle
[Tuki → Rajapintojen muutokset](/tuki/rajapintojen-muutokset/).

## Miten saan tiedon päivityksistä ja vikatilanteista?

Tarkkaile statussivua
[https://status.digitraffic.fi](https://status.digitraffic.fi). Voit myös tilata
statussivulta tiedon päivityksistä ja vikatilanteista ATOM-syötteenä **Subscribe
via ATOM to all updates** -toiminnon avulla.

## HTTPS- vai HTTP-protokolla

Käytä HTTPS:ää. Digitrafficin kaikki rajapinnat tukevat HTTPS-protokollaa, joten
ei ole syytä käyttää salaamatonta HTTP-protokollaa. Tällä hetkellä salaamattomat
HTTP-pyynnöt kelikamerakuviin ohjataan käyttämään HTTPS:ää
`HTTP/1.1 301 Moved Permanently` -vastauksella ja `Location` -otsikkotiedolla,
jossa kerrotaan uusi HTTPS-osoite. On mahdollista, että tulevaisuudessa kaikki
liikenne pakotetaan käyttämään `HTTPS`-protokollaa. Lisätietoa `HTTP 301`
-vastauksesta
[https://en.wikipedia.org/wiki/HTTP_301](https://en.wikipedia.org/wiki/HTTP_301)
-sivulla.

## Pakkaus

Pakkauksen käyttö on pakollista kaikissa rajapinnoissa lukuunottamatta
kelikamerakuvia. Rajapinnoista saatava data on hyvin pakkautuvaa, joten
pakkaamisella säästetään kaistaa ja aikaa. Käyttääksesi pakkausta lisää
HTTP-pyyntöösi otsikkotieto `Accept-Encoding: gzip`. Useimmat kirjastot lisäävät
otsikkotiedon automaattisesti.

Jos pakkausta ei ole sallittu pyynnössä, palvelu palauttaa virhekoodin `406`.

### Esimerkkejä

```bash
curl -H 'Accept-Encoding: gzip'  

curl --compressed  

wget --header='Accept-Encoding: gzip'
```

## Pyyntöjen rajoittaminen

Turhien ja liiallisten kyselyjen aiheuttaman kuormituksen vähentämiseksi
rajapinnoissa on käytössä pyyntöjen määrän rajoitus. Kun pyyntöjen määrä ylittää
asetetun raja-arvon, palvelu palauttaa virhekoodin `429`. Sivuston
dokumentaatiossa kerrotaan, kuinka usein kunkin rajapinnan sisältö päivittyy.

**Käyttörajoitukset:**

Taulukossa olevat rajoitukset koskevat kyselyitä, joissa ei ole
[Digitraffic-User otsikkoa](#digitraffic-user--otsikko) mukana. Kyselyitä voi
tehdä huomattavasti enemmän, jos otsikko on kyselyissä mukana.

| **Kohde / rajapinta**                       | **Max kpl / min** | **Rajaus** |
| ------------------------------------------- | ----------------- | ---------- |
| **Yleisrajoitus**                           | 120               | IP         |
| **MQTT**                                    | 5                 | IP         |
| **Kelikamerakuvat**                         | 120 / 5 min       | IP         |
| **tie/meri.digitraffic.fi:n V1-rajapinnat** | 120               | IP         |
| **infra- ja jeti-api**                      | 120               | IP         |

# Cache

**K**: Miksi saan rajapinnoilta usein saman vastauksen?\
**V**: Suurin osa rajapintojen kutsuista on cachetettu edustapalvelimilla. Tämän
takia palveluita ei ole hyötyä kutsua liian usein, koska cachesta palautuva
vastaus ei muutu. Cachen ikä on määritelty HTTP-headerissa `cache-control`,
esimerkiksi `cache-control: max-age=60`.

Tämä saattaa myös aiheuttaa omituiselta tuntuvia aikaleimoja, kun samaa palvelua
kutsuu eri parametreilla. Esimerkiksi:

`https://tie.digitraffic.fi/api/tms/v1/sensors?lastUpdated=true`

`https://tie.digitraffic.fi/api/tms/v1/sensors?lastUpdated=false`

Näistä voi tulla eri _dataUpdatedTime_, koska vastaukset ovat menneet cacheen
eri aikoina.

# cURL

**K**: Miten kutsun rajapintoja [cURLilla](https://curl.haxx.se/)?\
**V**:

```bash
curl -H 'Connection: close' --compressed -H 'Digitraffic-User: Junamies/FoobarApp 1.0' https://tie.digitraffic.fi/api/tms/v1/sensors -o data.json
```

# Wget

**K**: Miten kutsun rajapintoja [Wgetillä](https://www.gnu.org/software/wget/)?\
**V**:

```bash
wget --header='Accept-Encoding: gzip' --header='Connection: close' --header='Digitraffic-User: Junamies/FoobarApp 1.0' https://tie.digitraffic.fi/api/tms/v1/sensors -O data.json
```

# Java WebClient

**K**: Miten kutsun rajapintoja
[Java WebClientilla](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/reactive/function/client/WebClient.html)?
**V**:

```java
final WebClient client = WebClient.builder()
    .defaultHeader("Digitraffic-User", "DT/Tester")
    .build();

final JsonNode response = client.get().uri("https://tie.digitraffic.fi/api/tms/v1/sensors")
    .retrieve().bodyToMono(JsonNode.class).block();

System.out.println(response);
```

# Python

**K**: Miten kutsun rajapintoja
[Python requestilla](https://docs.python-requests.org/en/master/index.html)?\
**V**:

```python
import requests

TMS_STATION_URL = 'https://tie.digitraffic.fi/api/tms/v1/sensors'

headers = {'Digitraffic-User': 'Junamies/FoobarApp 1.0'}

r = requests.get(TMS_STATION_URL, headers=headers)
print(r.json()['dataUpdatedTime'])
```

# Node.js (ja JavaScript)

**K**: Miten kutsun rajapintoja
[node-fetchillä](https://github.com/node-fetch/node-fetch)?\
**V**:

```javascript
const fetch = require("node-fetch");

const TMS_STATION_URL = "https://tie.digitraffic.fi/api/tms/v1/sensors";
const DT_USER_ID = { "Digitraffic-User": "Junamies/FoobarApp 1.0" };

function handleTmsData(data) {
  console.log("Tms data updated time: " + data.dataUpdatedTime);
}

fetch(TMS_STATION_URL, { headers: DT_USER_ID })
  .then((response) => response.json())
  .then(handleTmsData);
```

# PHP

**K**: Miten kutsun rajapintoja PHP:lla?\
**V**:

```php
# Settings
$user = 'Käyttäjänimesi'; # Choose descriptive name, eg. your organisation and append it with your nickname (not real name)
$tiesaa_id = '14028'; # Find id from https://tie.digitraffic.fi/api/weather/v1/stations/
# End of settings

# Tiesääaseman perustiedot https://tie.digitraffic.fi/api/weather/v1/stations/14028
# Tiesääaseman data esim. https://tie.digitraffic.fi/api/weather/v1/stations/14028/data
$digitraffic_url = 'https://tie.digitraffic.fi/api/weather/v1/stations/' . $tiesaa_id . '/data';

$options = array(
  'http' => array(
    'method' => "GET",
    'header' => "Accept-Encoding: gzip\r\n" .
              "Accept: application/json\r\n"  .
			  "Digitraffic-User: ".$user
  )
);

$context = stream_context_create($options);
if (!$digitraffic_file = file_get_contents($digitraffic_url, false, $context)) {
	echo "Error: Invalid url (or Bad request).\r\n<br>";
	exit;
}

if (!$digitraffic_file = gzdecode($digitraffic_file, 15000)) {
	echo "Error: With gzdecode.\r\n<br>";
	exit;
}

if (!$digitraffic_json = json_decode($digitraffic_file, TRUE, 5)) {
	echo "Error: Json decode failed.\r\n<br>";
	exit;
}

# Json is now decoded to array and ready to be used. 
#var_dump($digitraffic_json);

echo $digitraffic_json['dataUpdatedTime']."\r\n<br>"; # For example: dataUpdatedTime: "2023-07-19T09:24:00Z"
```

**K**: Miten käsittelen ETagia kamerakuvia kyseltäessä?\
**V**:

```javascript
const fetch = require("node-fetch");
const sleep = require("sleep");

const CAMERA_ID = "C0450701";
const WEATHER_CAM_URL = "https://weathercam.digitraffic.fi/" + CAMERA_ID +
  ".jpg";
const DT_USER_ID = { "Digitraffic-User": "Junamies/FoobarApp 1.0" };

function writeData(filename, _) {
  console.log("Saving file: " + filename);
  // TODO save file
}

function getImage(headers) {
  return fetch(WEATHER_CAM_URL, { headers: headers })
    .then((response) => {
      if (response.ok) {
        console.log("Got new content");
        writeData(CAMERA_ID + ".jpg", response.buffer());

        // update etag with new content
        return { ...headers, "If-None-Match": response.headers.get("etag") };
      }

      console.warn("Content not modified");
      return headers;
    });
}

async function main() {
  let count = 0;
  let headers = { ...DT_USER_ID, "If-None-Match": "" };

  while (count < 5) {
    // Request new image. After successful request store the new header with new etag for subsequent requests
    headers = await getImage(headers);

    count = count + 1;
    sleep.sleep(5);
  }
}

main();
```

# Pyyntömäärien rajoittaminen

**K**: Miksi HTTP-pyyntöihini vastataan koodilla 429?\
**V**: Osaa rajapinnoista voidaan kutsua tietyn aikaikkunan sisällä vain tietyn
kutsumäärän verran. Rajapintojen sisältö ei päivity useammin kuin niitä on
mahdollista kutsua.

# Autentikaatio kelikamerakuvien haussa

**K**: Miksi kelikamerakuvia hakeviin HTTP-pyyntöihini vastataan koodilla 400?\
**V**: Digitraffic ei tue Authorization-otsikkoa kelikamerakuvien haussa, älä
käytä sitä pyynnöissä.

# MQTT-yhteys katkeaa

**K**: Miksi mqtt-yhteys tuntuu katkeavan koko ajan?\
**V**: Jos et ole tilannut(subscribe) aiheita(topic) tai niistä ei tule
viestejä, niin yhteys saattaa katketa.\
Tilaa silloin myös status-topic(tms/status, weather/status, vessels/status).

# Turhan tiedonsiirron välttäminen ehdollisilla HTTP-pyynnöillä

Suurin osa uusista `/api/{datalaji}/v{n}/` -muotoisista rajapinnoista tukee
ehdollisia HTTP-pyyntöjä. Tällaisen rajapinnan tunnistaa siitä, että se palautaa
pyynnön vastauksessa **ETag** -HTTP-otsikon.

Esimerkiksi kelikamerakuvan palauttava vastaus palauttaa HTTP-otsikon **ETag**.
Voit käyttää ETagin arvoa **If-None-Match** -otsikossa. Mikäli kuva on
päivittynyt se palautuu HTTP-paluukoodin 200 kera. Mikäli kuva ei ole
päivittynyt mitään kuvaa ei palauteta ja HTTP-paluukoodi on 304 (Not Modified).

curl-esimerkki:

```bash
# HUOM! Digitraffic-User -otsikko on jätetty tässä ei-olennaisena pois, muistathan käyttää sitä.

# Haetaan kuva GET-pyynnöllä ja otetaan ETag-arvo talteen (vipu -v)
curl -v https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
> content-type: image/jpeg
> etag: "920d5a54a98cca804825af6894d778a4"

# Kysytään kuvaa uudestaan (huomaa tuplahipsut ETag-arvossa)
curl -v -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 304
# Kuva ei päivittynyt

# Kysyminen on mahdollista myös HTTP HEAD-pyynnöllä joka palauttaa vain HTTP-statuskoodin
curl -v -X HEAD -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 304
# Kuva ei päivittynyt

# Uusi kysely, esim. 5 min päästä
curl -v -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
# Päivittynyt kuva palautuu
```

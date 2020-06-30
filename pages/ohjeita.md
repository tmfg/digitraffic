---
layout: traffictype
hero-image: code
permalink: /ohjeita/
section: Tietolähteet
searchable: true
lang: fi
ref: instructions
title: Ohjeita
intro: Ohjeita ohjelmoijille
---

<h2 id="sisalto">Sisältö</h2>

* Do not remove this line (it will not be displayed)
{:toc}


# Yleistä huomioitavaa

1.6.2020 alkaen voimassa olevat ohjeet

## Pakkaus  

Pakkauksen käyttö on pakollista kaikissa rajapinnoissa lukuunottamatta kelikamerakuvia. 
Rajapinnoista saatava data on hyvin pakkautuvaa, joten pakkaamisella säästetään kaistaa ja aikaa.
Käyttääksesi pakkausta lisää HTTP-pyyntöösi otsikkotieto `Accept-Encoding: gzip`. 
Useimmat kirjastot lisäävät otsikkotiedon automaattisesti.

Jos pakkausta ei ole sallittu pyynnössä, palvelu palauttaa virhekoodin `406`.

### Esimerkki cURL:lla
```
curl -H 'Accept-Encoding: gzip'
```
### Esimerkki Wget:llä
```
wget --header='Accept-Encoding: gzip'
```


## Pyyntöjen rajoittaminen  

Turhien ja liiallisten kyselyjen aiheuttaman kuormituksen vähentämiseksi rajapinnoissa on käytössä pyyntöjen määrän rajoitus. 
Kun pyyntöjen määrä ylittää asetetun raja-arvon, palvelu palauttaa virhekoodin `429`. 
Sivuston dokumentaatiossa kerrotaan, kuinka usein kunkin rajapinnan sisältö päivittyy.  

**Käyttörajoitukset tie- ja meriliikenteessä:**  

| **Kohde / rajapinta** | **Max kpl / min** | **Rajaus**
| **MQTT**              | 5                 | IP
| **Kelikamerakuvat**   | 10                | IP + URL
| **V1-rajapinnat**     | -                 |
| **> V1-rajapinnat**   | 60                | IP + URL

## Sovelluksen yksilöivät otsikkotiedot

Toivomme, että rajapintojen käyttäjät käyttäisivät kaikissa HTTP-pyynnöissä alla kuvattuja HTTP-otsikkotietoja. 
Näin pystymme seuraamaan erilaisesta käytöstä tulevaa kuormaa sekä reagoimaan mahdollisiin virhetilanteisiin paremmin.
Esimerkkinä voisi olla ohjelmointivirhe, joka aiheuttaa huomattavan kuorman tekemällä ylimääräisiä pyyntöjä rajapintoihimme.
Jos alla mainitut tiedot ovat kunnossa, pystymme tunnistamaan osapuolen ja välittämään tiedon mahdollisesta ongelmasta 
sovelluksessa kehittäjälle tai ylläpitäjälle.

### Digitraffic-User -otsikko

Digitraffic-User -otsikon tulisi sisältää tunnistettava käyttäjätaho ja/tai sovellus. Alla esimerkkejä.
  
`Digitraffic-User: TMFG`  
`Digitraffic-User: Liikennetilanne`  
`Digitraffic-User: TMFG/Liikennetilanne`  

### User-Agent -otsikko

Mikäli sovelluksessa on mahdollista asettaa User-Agent -otsikkotieto, tulisi sen olla [RFC-7231 5.5.3](https://tools.ietf.org/html/rfc7231#section-5.5.3) -kohdan mukainen 
sisältäen vähintään sovelluksen nimen ja version. Alla esimerkkejä.

`User-Agent: <sovellus>/<versio>`  
`User-Agent: Liikennetilanne/1.0`

# Cache
__K__: Miksi saan rajapinnoilta usein saman vastauksen?  
__V__: Suurin osa rajapintojen kutsuista on cachetettu edustapalvelimilla.  Tämän takia palveluita ei ole hyötyä kutsua liian usein, koska 
cachesta palautuva vastaus ei muutu.  Cachen ikä on määritelty HTTP-headerissa `cache-control`, esimerkiksi `cache-control: max-age=60`.

Tämä saattaa myös aiheuttaa omituiselta tuntuvia aikaleimoja, kun samaa palvelua kutsuu eri parametreilla.  Esimerkiksi:

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=true`

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false`

Näistä voi tulla eri _dataUpdatedTime_, koska vastaukset ovat menneet cacheen eri aikoina.

# cURL
__K__: Miten kutsun rajapintoja [cURLilla](https://curl.haxx.se/)?  
__V__:
```
curl -H 'Accept-Encoding: gzip' -H 'Connection: close' --compress https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

# Wget
__K__: Miten kutsun rajapintoja [Wgetillä](https://www.gnu.org/software/wget/)?  
__V__:
```
wget --header='Accept-Encoding: gzip' --header='Connection: close' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

# Java RestTemplate
__K__: Miten kutsun rajapintoja [Java RestTemplatella](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)?  
__V__:
```
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final String output = restTemplate.getForObject("https://tie.digitraffic.fi/api/v1/data/tms-data?testi=testi", String.class);
```

# Pyyntömäärien rajoittaminen
__K__: Miksi HTTP-pyyntöihini vastataan koodilla 429?  
__V__: Osaa rajapinnoista voidaan kutsua tietyn aikaikkunan sisällä vain tietyn kutsumäärän verran. Rajapintojen sisältö ei päivity useammin kuin niitä on mahdollista kutsua.  

# Autentikaatio kelikamerakuvien haussa
__K__: Miksi kelikamerakuvia hakeviin HTTP-pyyntöihini vastataan koodilla 400?  
__V__: Digitraffic ei tue Authorization-otsikkoa kelikamerakuvien haussa, älä käytä sitä pyynnöissä.

# MQTT-yhteys katkeaa
__K__: Miksi mqtt-yhteys tuntuu katkeavan koko ajan?  
__V__: Jos et ole tilannut(subscribe) aiheita(topic) tai niistä ei tule viestejä, niin yhteys saattaa katketa.  
Tilaa silloin myös status-topic(tms/status, weather/status, vessels/status).
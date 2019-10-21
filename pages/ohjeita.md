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

Tälle sivulle on kerätty ohjeistusta ja tietoa rajapinnoista ja niiden käytöstä.

# [Cache](#cache)

Suurin osa rajapintojen kutsuista on cachetettu edustapalvelimilla.  Tämän takia palveluita ei ole hyötyä kutsua liian usein, koska 
cachesta palautuva vastaus ei muutu.  Cachen ikä on määritelty HTTP-headerissa `cache-control`, esimerkiksi `cache-control: max-age=60`.

Tämä saattaa myös aiheuttaa omituiselta tuntuvia aikaleimoja, kun samaa palvelua kutsuu eri parametreilla.  Esimerkiksi:

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=true`

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false`

Näistä voi tulla eri _dataUpdatedTime_, koska vastaukset ovat menneet cacheen eri aikoina.

# [Pakkaus](#pakkaus)

Pakkausta kannattaa käyttää, sillä data on hyvin pakkautuvaa ja tällä säästää kaistaa ja aikaa. Pakkauksen käyttöönotto riippuu hieman 
käytetystä tekniikasta.  

# [cURL](#curl)

```
curl -H 'Accept-Encoding: gzip' -H 'Connection: close' --compress https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

# [Wget](#wget)

```
wget --header='Accept-Encoding: gzip' --header='Connection: close' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

# [Java RestTemplate](#java-resttemplate)

```
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final String output = restTemplate.getForObject("https://tie.digitraffic.fi/api/v1/data/tms-data?testi=testi", String.class);
```

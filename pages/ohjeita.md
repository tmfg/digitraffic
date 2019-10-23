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

# [Cache](#cache)
__K__: Miksi saan rajapinnoilta usein saman vastauksen?  
__V__: Suurin osa rajapintojen kutsuista on cachetettu edustapalvelimilla.  Tämän takia palveluita ei ole hyötyä kutsua liian usein, koska 
cachesta palautuva vastaus ei muutu.  Cachen ikä on määritelty HTTP-headerissa `cache-control`, esimerkiksi `cache-control: max-age=60`.

Tämä saattaa myös aiheuttaa omituiselta tuntuvia aikaleimoja, kun samaa palvelua kutsuu eri parametreilla.  Esimerkiksi:

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=true`

`https://tie.digitraffic.fi/api/v1/data/tms-data?lastUpdated=false`

Näistä voi tulla eri _dataUpdatedTime_, koska vastaukset ovat menneet cacheen eri aikoina.

# [Pakkaus](#pakkaus)
__K__: Miten saan ladattua dataa nopeammin ja tehokkaammin?  
__V__: Kannattaa käyttää pakkausta, sillä data on hyvin pakkautuvaa ja tällä säästää kaistaa ja aikaa. Pakkauksen käyttöönotto riippuu hieman 
käytetystä tekniikasta.
### cURL
```
curl -H 'Accept-Encoding: gzip'
```
### Wget
```
wget --header='Accept-Encoding: gzip'
```

# [cURL](#curl)
__K__: Miten kutsun rajapintoja [cURLilla](https://curl.haxx.se/)?  
__V__:
```
curl -H 'Accept-Encoding: gzip' -H 'Connection: close' --compress https://tie.digitraffic.fi/api/v1/data/tms-data -o data.json
```

# [Wget](#wget)
__K__: Miten kutsun rajapintoja [Wgetillä](https://www.gnu.org/software/wget/)?  
__V__:
```
wget --header='Accept-Encoding: gzip' --header='Connection: close' https://tie.digitraffic.fi/api/v1/data/tms-data -O data.json
```

# [Java RestTemplate](#java-resttemplate)
__K__: Miten kutsun rajapintoja [Java RestTemplatella](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)?  
__V__:
```
final HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory(HttpClientBuilder.create().build());
final RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

final String output = restTemplate.getForObject("https://tie.digitraffic.fi/api/v1/data/tms-data?testi=testi", String.class);
```

# [Pyyntömäärien rajoittaminen](#pyyntomaarien-rajoittaminen)
__K__: Miksi HTTP-pyyntöihini vastataan koodilla 429?  
__V__: Osaa rajapinnoista voidaan kutsua tietyn aikaikkunan sisällä vain tietyn kutsumäärän verran. Rajapintojen sisältö ei päivity useammin kuin niitä on mahdollista kutsua.  

# [Autentikaatio kelikamerakuvien haussa](#kelikamera-autentikaatio)
__K__: Miksi kelikamerakuvia hakeviin HTTP-pyyntöihini vastataan koodilla 400?  
__V__: Digitraffic ei tue Authorization-otsikkoa kelikamerakuvien haussa, älä käytä sitä pyynnöissä.

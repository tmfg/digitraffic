---
title: 'Tie: Turhan tiedonsiirron välttäminen kelikamerakuvissa'
categories: Tiedotteet
image:
lang: fi
published: true
ref: 2021-07-26-conditional-requests
traffictypes:
  - Tieliikenne
tags:
  - Ylläpito
  - Rajapinnat
---

Kelikamerakuvapyynnöissä olisi hyvä käyttää ehdollisia HTTP-pyyntöjä turhan
tiedonsiirron välttämiseksi.

Kelikamerakuvan palauttava vastaus palauttaa HTTP-otsikon **ETag**. Voit käyttää
ETagin arvoa **If-None-Match** -otsikossa. Mikäli kuva on päivittynyt se
palautuu HTTP-paluukoodin 200 kera. Mikäli kuva ei ole päivittynyt mitään kuvaa
ei palauteta ja HTTP-paluukoodi on 304.

curl-esimerkki:

```
# Haetaan kuva GET-pyynnöllä ja otetaan ETag-arvo talteen (vipu -v)
curl -v https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
> content-type: image/jpeg
> etag: "920d5a54a98cca804825af6894d778a4"

# Kysytään kuvaa uudestaan (huomaa tuplahipsut ETag-arvossa)
curl -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 304
# Kuva ei päivittynyt

# Uusi kysely, esim. 5 min päästä
curl -H 'If-None-Match: "920d5a54a98cca804825af6894d778a4"' https://weathercam.digitraffic.fi/C0450701.jpg
> HTTP/2 200
# Päivittynyt kuva palautuu
```

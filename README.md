# digitraffic

## Sisältösivujen päivitys
Sisältösivut löytyvät `pages`-kansiosta. Muokattavissa olevat sivut ovat `.md`-päätteisiä. Sivujen sisältöä voi muokata [prose.io](https://prose.io/) -palvelulla. Navigoi palvelussa pages-kansioon ja haluttuun sisältösivuun. Avaa sisältösivu prosessa. Voit muokata sivun sisältöä avautuvassa tekstieditorissa.

Voit tyylitellä tekstiä, otsikoita, listoja ja lainauksia maalaamalla tyyliteltävän tekstin ja valitsemalla tyylin tekstieditorin ylälaidassa olevan tyylin painikkeesta. Editori kirjoittaa valitun tekstin *Markdown*-merkintätavalla suoraan tekstiin. Voit käyttää [Markdownia](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) myös kirjoittamalla merkinnät suoraan tekstin sekaan.

### Kuvan lisääminen
Voit lisätä sivulle kuvia valitsemalla kuvapainikkeen Prosen editorista (neljäs painike oikealta). Valitse ladattava kuva, ja anna sille alt-teksti. Editori lataa kuvan pages-kansioon ja sijoittaa kuvan merkintätavan mukaisesti valitsemaasi kohtaan tekstissä.

Voit kirjoittaa kuvan alla sivulla näkyvän kuvatekstin kirjoittamalla sen `**`-merkkien väliin suoraan kuvalinkin seuraavalle riville.

Pääkuvan kuvasuhdesuositus on 16:9, mikä on deskarilla "näyttävä" ja pystypuhelimellakin vielä tolkullinen. Lisäksi suurin osa nykymobiilikameroista tuottaa oletuksena sitä. Ammattikameroilla ja kuvapankeista tulee pääsasiassa 3:2, mitä voi myös käyttää, jos sitä ei saa rajattua näppärästi. Jos kuvasisältö on jotenkin infomatiivinen tai visuaalisesti tyylikäs, niin siitä voi hyvin tehdä huomiotaherättävä ison pääkuvan.

Muut vähempiarvoiset kuvat voi hyvin laittaa sisältötekstin lomaan, koska sinne käy paremmin mikä vaan kuvasuhde - tosin pystykuvat ovat internetissä hiukan hankalia. Millään sivulla ei tietenkään ole pakko olla isoa pääkuvaa.

```
![Kuvan alt-teksti]({{site.baseurl}}/pages/kuvan-nimi.jpg)
**Tähän tulee kuvateksti**
```

Voit lisätä kuvan muuhunkin kansioon repositoriossa ja korvata kuvatiedoston polun vastaamaan oikeaa kansiota. Muista `{{site.baseurl}}/` polun alkuun!

Voit vaihtaa kuvan paikkaa siirtämällä alt-tekstin, kuvatiedoston ja kuvatekstin merkinnän toiseen väliin tekstissä.

### Oikean sivupalkin linkkien lisääminen

Voit muokata/lisätä linkkejä sisältösivun oikeaan sivupalkkiin valitsemalla `Meta Data`-painikkeen Prosen sivun oikeasta laidasta (kolmas ylhäältä). Linkit on sijoitettu listaan seuraavan näköisesti.

```
links:
  - - Sivupalkissa näkyvä linkin teksti
    - /sisäisen-sivun-polku
  - - Linkin teksti
    - http://www.ulkoisen-linkin-osoite.fi
  - - Fintraffic
    - https://fintraffic.fi/
  - - http://tie.digitraffic.fi/api/weathercam/v1/stations/data
```

Yksi linkki sisältää sivupalkissa näkyvän tekstin ja linkin osoitteen. Osoite voi olla joko ulkoinen tai sivuston sisäinen osoite. Mikäli linkki on ulkoinen, tulee sen alkaa `http://` tai `https://`. Mikäli linkki on sisäinen tulee sen alkaa `/`-merkillä ja sisältää osoitepalkissa näkyvän osoitteen polku, esim. `/palvelun-esittely`.

Linkin teksti ja osoite ovat listassa peräkkäin. Tekstin edessä on kaksi väliviivaa `- -` ja osoitteen perässä vain yksi `-`.

```
- - Fintraffic
  - https://fintraffic.fi/
```

Mikäli osoitteelle ei haluta erillistä näkyvää tekstiä vaan halutaan näyttää itse osoite tekstinä, lisätään vain yksi rivi jossa on edessä kaksi väliviivaa `- -`.

```
- - https://tie.digitraffic.fi/api/weathercam/v1/stations/data
```

**HUOM!** Älä muokkaa muita Meta Datan tietoja!


## Tiedotteiden, artikkelien ja tapahtumien julkaisu

### Uuden tiedotteen tai artikkelin julkaisu
Tiedotteet, artikkelit ja tapahtumat sijaitsevat `_posts`-kansiossa ja ovat `.md`-päätteisiä tiedostoja. Tiedotteita voit julkaista ja muokata [prose.io](https://prose.io/)-palvelulla. Navigoi palvelussa _posts-kansioon ja valitse `NEW FILE` ruudun ylälaidasta hakukentän oikealta puolelta.

#### Julkaisun tiedoston nimeäminen ja päivämäärän asettaminen
Kirjoita julkaisulle otsikko klikkaamalla sivun ylälaidassa olevaa kenttää, jossa on placeholder-tekstinä luontipäivämäärää vastaava `_posts/2017-09-22-your-filename.md` tyylinen teksti. Voit kirjoittaa tämän tekstin tilalle halutun tiedostonimen, jonka alussa on julkaisun päivämäärä. Esimerkiksi, jos julkaisun päivämäärä on 26.9.2017 ja otiskoksi tulee "Vanhat rajapinnat suljetaan", voi tiedostonimeksi antaa `_posts/2017-09-26-vanhat-rajapinnat-suljetaan.md`.

**HUOM!** Varmista, että tiedostonimen alkuun tulee `_posts/`, välittömästi perään päivämäärä muodossa `VVVV-KK-PP`, tämän jälkeen haluttu nimi väliviivan perässä `-haluttu-nimi` ja lopuksi tiedostopääte `.md`.

```
_posts/VVVV-KK-PP-haluttu-nimi.md
```

#### Julkaisun sisällön kirjoittaminen
Kirjoita julkaisulle varsinainen sisältö otsikon alapuolella olevaan tekstieditoriin. Sivusto muotoilee julkaisun ensimmäisen kappaleen aina ingressiksi. Ingressiä käytetään myös nostotekstinä koontisivulla. Voit vaihtaa kappaletta lisäämällä kappaleiden väliin kaksi rivinvaihtoa.

```
Tämä on ensimmäinen kappale.

Tämä on toinen kappale.
Tämä ei ole vielä kolmatta kappaletta.

Mutta tämä on.
```

Voit tyylitellä tekstiä, lisätä väliotsikoita, listoja ja lainauksia. Ks. [Sisältösivujen päivitys](#sisältösivujen-päivitys).

Voit lisätä kuvia tekstin sekaan. Ks. [Kuvan lisääminen](#kuvan-lisääminen).

#### Julkaisun otsikointi
Voit lisätä julkaisulle hero-kuvan valitsemalla Prosesta `Meta Data`-painikkeen sivun oikeasta laidasta (kolmas ylhäältä). Uuden julkaisun meta data on tyhjä, joten meta data -editorin sisältöalue on vielä tyhjä. Voit halutessasi kopioida metadatalle pohjan aikaisemmasta julkaisusta. Valmiin julkaisun meta data näyttää seuraavalta.

```
published: true
title: Vanhojen SOAP-rajapintojen elinkaari päättyi
image: 2017-08-31-old-api-eol/data-eol.jpg
categories: Tiedotteet
traffictypes:
  - Tieliikenne
tags:
  - Rajapinnat
  - Ylläpito
  - EndOfLife
```

Kirjoita julkaisun otsikko meta datan `title`-tietoon esimerkiksi seuraavalla tavalla.

```
title: Vanhojen SOAP-rajapintojen elinkaari päättyi
```

#### Julkaisun hero-kuvan lisääminen

Jotta voit lisätä kuvan julkaisun meta datan `image`-tietoon, sinun tulee ensin ladata kuva repositorion juuresta löytyvään `img`-kansioon, esim. julkaisun mukaan nimettyyn alikansioon `2017-08-31-old-api-eol/`.

Kun kuva löytyy repositoriosta, voit lisätä kuvatiedoston `img`-kansion alaisen polun `image:`-avaimen perään. Esimerkiksi, kun kuva on sijoitettu kansioon `/img/2017-08-31-old-api-eol/data-eol.jpg`, tulee meta dataan kirjoittaa seuraava rivi.

```
image: 2017-08-31-old-api-eol/data-eol.jpg
```

**HUOM!** Voit myös jättää hero-kuvan lisäämättä, jolloin julkaisussa ei näy hero-kuvaa vaan tekstisisältö näytetään suoraan otsikon alla. Tällöin voit jättää `image`-tiedon kirjoittamatta kokonaan meta dataan.

#### Julkaisun kategorian lisääminen

Julkaisut voivat olla Tiedotteita, Artikkeleita tai Tapahtumia. Näitä vastaa kolme katgoriaa `Tidotteet`, `Artikkelit` ja `Tapahtumat`. Kategoria määritellään meta datan `categories`-tietoon. Esimerkiksi, jos julkaisu on tiedote, kirjoita meta dataan seuraava rivi.

```
categories: Tiedotteet
```

**HUOM!** Muista kirjoittaa varsinainen kategoria isolla alkukirjaimella. `Artikkelit` on oikein. `artikkelit` on väärin.

#### Julkaisun liikennetyyppien lisääminen
Julkaisulla voi olla yksi tai useampi kolmesta liikennetyypistä: `Tieliikenne`, `Rautatieliikenne`, `Meriliikenne`. Liikennetyypit määritellään meta datan `traffictypes`-tietoon listaksi. Jokainen liikennetyyppi kirjoitetaan omalle rivilleen meta dataan ja kunkin eteen kirjoitetaan väliviiva ja välilyönti `- `. Esimerkiksi, kun haluat lisätä julkaisulle liikennetyypit `Rautatieliikenne` ja `Meriliikenne`, kirjoita metadataan seuraavat rivit.

```
traffictypes:
  - Rautatieliikenne
  - Meriliikenne
```

**HUOM!** Määrittele julkaisulle **vähintään yksi** liikennetyyppi.

#### Julkaisun avainsanojen lisääminen
Julkaisulle voidaan antaa yksi tai useampi avainsana. Julkaisuja voidaan suodattaa avainsanojen perusteella. Avainsanat ovat vapaamuotoisia. Tarkista aikaisemmista julkaisuista, mitä avainsanoja on jo käytetty ja pyri käyttämään yhdenmukaisia avainsanoja.

Avainsanat määritellään meta dataan `tags`-tietoon. Jokainen avainsana kirjoitetaan omalle rivilleen ja kunkin eteen kirjoitetaan väliviiva ja välilyönti `- `. Esimerkiksi, kun haluat lisätä julkaisulle avainsanat `Kelikamerat`, `Rajapinnat` ja `Ylläpito`, kirjoita meta dataan seuraavat rivit.

```
tags:
  - Kelikamerat
  - Rajapinnat
  - Ylläpito
```

**HUOM!** Voit olla antamatta julkaisulle yhtäkään avainsanaa mutta on suositeltavaa, että jokaiselle julkaisulle annetaan ainakin yksi avainsana.

#### Julkaiseminen
Julkaise uusi tiedote, artikkeli tai tapahtuma lisäämällä meta dataan seuraava rivi.

```
published: true
```

Tämän jälkeen valitse Prosen oikeasta laidasta `Changes to Save` -painike (alin oikean laidan painikkeista). Kirjoita aukeavaan tekstialueeseen kommentti GitHub committia varten, esim. "Tiedote vanhojen rajapintojen päättymisestä luotu". Julkaise tiedote valitsemalla `Commit` komenttikentän alta.

Julkaistu tiedote näkyy sivustolla muutaman minuutin kuluttua.

### Aikaisemmin julkaistun julkaisun muokkaaminen
Voit muokata aikasemmin julkaistuja julkaisuja samaan tapaan kuin sisältösivuja, ks. [Sisältösivujen päivitys](#sisältösivujen-päivitys). Avaa julkaisu klikkaamalla sen otsikkoa `_posts`-kansiossa. Tämän jälkeen voit muokata sisältöä ja meta dataa, kuten uutta lisättäessä.

#### Otskon muokkaaminen
Jo julkaistun julkaisun otsikko näkyy nyt sisältöeditorin yläpuolella. Muokkaa julkaisun otsikkoa klikkaamalla otsikkoa ja kirjoittamalla uusi otiskko vanhan tilalle.

#### Päivämäärän muokkaaminen
Jo julkaistun julkaisun päivämäärää voit muokata muokkaamalla tiedoston tiedostonimeä. Muokkaa tiedostonimeä valitsemalla `Settings` Prosen oikeasta laidasta (neljäs painike ylhäältä). Auenneeseen `File Path` -kenttään voit muokata päivämäärän tiedostonimeen muodossa `VVVV-KK-PP`.

```
_posts/VVVV-KK-PP-julkaisun-nimi.md
```


## Ohje kuvatiedostojen vaatimuksista

Käytä vain kuvatiedostoja, joihin voi antaa loppukäyttäjille vapaat oikeudet, kuten: 
* Liikenneviraston kuvapankki
* https://unsplash.com/ (tms) 
* Itse ottamasi valokuvat

#### 1. Pääkuva 
Vaakakuva, korkeintaan 1500 px leveä, optimi 1200 x 675 px

#### 2. Sisältökuva 
Vaakakuva, korkeintaan 1000 px leveä, optimi 960 x 540 px

#### 3. Oikean palstan kuva 
Vaakakuva, korkeintaan 500 px leveä, optimi 480 x 270 px

#### 4. Hero-taustakuva
Vaakakuva, mustavalkoinen, korkeintaan 1500 px leveä, optimi 1200 x 675 px (edited)


### Install with Docker
```
docker build . -t digitraffic-pages
docker run -p 3000:3000 -p 3001:3001 -v ${PWD}:/app digitraffic-pages:latest
```

or one-liner `docker build . -t digitraffic-pages; docker run -p 3000:3000 -p 3001:3001 -v ${PWD}:/app digitraffic-pages:latest`

or the script: `./build-and-run-in-docker.sh` that uses `build-docker-image.sh` and `run-in-docker.sh` scripts.

## In addition

Additionally this repository contains a [Wiki](https://github.com/tmfg/digitraffic/wiki) for [Fintraffic](https://fintraffic.fi)'s road digitraffic service. 

The wiki source can be cloned with:
 ````bash
 git clone https://github.com/tmfg/digitraffic.wiki.git
 ````

## Keeping up to date

Command `bundle update` is excecuted every time docker container is started so it will do updates.

- https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#step-2-install-jekyll-using-bundler
- https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
- https://pages.github.com/versions/
- Run `bundle update` to catch up.

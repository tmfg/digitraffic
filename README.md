# digitraffic

## Sisältösivujen päivitys
Sisältösivut löytyvät `pages`-kansiosta. Muokattavissa olevat sivut ovat `.md`-päätteisiä. Sivujen sisältöä voi muokata [prose.io](http://prose.io/)-palvelulla. Navigoi palvelussa pages-kansioon ja haluttuun sisältösivuun. Avaa sisältösivu prosessa. Voit muokata sivun sisältöä avautuvassa tekstieditorissa.

Voit tyylitellä tekstiä, otsikoita, listoja ja lainauksia maalaamalla tyyliteltävän tekstin ja valitsemalla tyylin tekstieditorin ylälaidassa olevan tyylin painikkeesta. Editori kirjoittaa valitun tekstin *Markdown*-merkintätavalla suoraan tekstiin. Voit käyttää [Markdownia](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) myös kirjoittamalla merkinnät suoraan tekstin sekaan.

### Kuvan lisääminen
Voit lisätä sivulle kuvia valitsemalla kuvapainikkeen Prosen editorista (neljäs painike oikealta). Valitse ladattava kuva, ja anna sille alt-teksti. Editori lataa kuvan pages-kansioon ja sijoittaa kuvan merkintätavan mukaisesti valitsemaasi kohtaan tekstissä.

Voit kirjoittaa kuvan alla sivulla näkyvän kuvatekstin kirjoittamalla sen `*`-merkkien väliin suoraan kuvalinkin seuraavalle riville.

```
![Kuvan alt-teksti]({{site.baseurl}}/pages/kuvan-nimi.jpg)
*Tähän tulee kuvateksti*
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
  - - Liikennevirasto
    - http://www.liikennevirasto.fi
  - - http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data
```

Yksi linkki sisältää sivupalkissa näkyvän tekstin ja linkin osoitteen. Osoite voi olla joko ulkoinen tai sivuston sisäinen osoite. Mikäli linkki on ulkoinen, tulee sen alkaa `http://` tai `https://`. Mikäli linkki on sisäinen tulee sen alkaa `/`-merkillä ja sisältää osoitepalkissa näkyvän osoitteen polku, esim. `/palvelun-esittely`.

Linkin teksti ja osoite ovat listassa peräkkäin. Tekstin edessä on kaksi väliviivaa `- -` ja osoitteen perässä vain yksi `-`.

```
- - Liikennevirasto
    - http://www.liikennevirasto.fi
```

Mikäli osoitteelle ei haluta erillistä näkyvää tekstiä vaan halutaan näyttää itse osoite tekstinä, lisätään vain yksi rivi jossa on edessä kaksi väliviivaa `- -`.

```
- - http://tie.digitraffic.fi/api/v1/data/camera-data/camera-data
```

**HUOM!** Älä muokkaa muita Meta Datan tietoja!


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


## Dev dependencies
* Ruby, 2.4.1
  * `ruby --version`
* RubyGems, 2.6.12
  * `gem --version`
* Bundler, 1.15.1
	* `bundle --version`
* Node.js, 8.0.0
  * `node --version`
* Npm, 5.3.0
    * `npm --version`
* Gulp, 3.9.1
    * `gulp --version`
    
### Install used Ruby version with nbenv
`rbenv global 2.4.1`

* Check that system uses Ruby version 2.4.1
`ruby --version`

### Install Gulp
`npm install --global gulp-cli`

* Check that Gulp is installed
`gulp --version`

## Install
1. `git clone https://github.com/finnishtransportagency/digitraffic.git` -> Clones the project from GitHub
2. `cd digitraffic` -> Move into directory
3. `bundle install` -> Install `Gemfile` dependencies
4. `npm install` -> Install `package.json` dependencies

## Start a local dev server
1. `git pull` -> Pull latest changes from GitHub
2. `npm run dev` -> Site opens at `localhost:3000`
3. Changes to the source are automatically refreshed in the preview

## Build the site and push to GitHub
1. `git pull` -> Pull latest changes from GitHub
2. `npm run build` -> Build the site for GitHub Pages
3. `git add .` -> Stages changes
4. `git commit -m “<message>”` -> Commits changes with given message
5. `git push -u origin master` -> Push changes to GitHub

## In addition

Additionally this repository contains a [Wiki](https://github.com/finnishtransportagency/digitraffic/wiki) for [Finnish transport agency](http://www.fta.fi)'s road digitraffic service. 

The wiki source can be cloned with:
 ````bash
 git clone https://github.com/finnishtransportagency/digitraffic.wiki.git
 ````

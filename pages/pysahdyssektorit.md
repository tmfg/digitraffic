---
layout: sub-traffictype
permalink: /rautatieliikenne/pysahdyssektorit/
section: Tietolähteet
traffictypes: Rataliikenne
searchable: true
hero-image: rail
title: Pysähdyssektorit
lang: fi
ref: stop-sectors
intro: Pysähdyssektorit
---

# Pysähdyssektorit 

Pysähdyssektoritieto kertoo asemalta sen pysähdyssektorin, johon veturin keula pysähtyy. Tämän tiedon ja muutaman muun lisätiedon avulla on 
suurinpiirtein mahdollista määritellä mihin kukin vaunu pysähtyy.

## Sektorit ja alisektorit

Sektoreita merkitään kirjaimilla A, B, C ja D.  Sektorit jakautuvat alisektoreihin niin, että A:lla ja D:llä on 5 alisektoria ja muilla 4.  Tämän lisäksi A:lla numerointi alkaa nollasta ja muilla yhdestä. Tämän mukaisesti mahdolliset sektorit siis ovat:

A0 A1 A2 A3 A4 B1 B2 B3 B4 C1 C2 C3 C4 D1 D2 D3 D4 D5

Yleisesti ottaen pohjoiseen menevät junat tulevat D:n suunnasta A:han päin ja etelään menevät junat A:n suunnasta D:hen päin.

## Junan kokoonpanot

Jotta voidaan laskea veturien sijainnit sektoreilla, täytyy tietää veturien ja vaunujen suhteellinen koko verrattuna alisektoreihin.  Vaunujen koot on seuraavat:
* IC, P ja S yksi vaunu on yhden alisektorin kokoinen
* Sm1, Sm2 ja Sm4 yksi vaunu on neljän alisektorin kokoinen
* Sm5 yksi vaunu on kuuden alisektorin kokoinen

## Esimerkkejä

Jos IC etelän suuntaan, jossa on kaksi vaunua, pysähtyy kohtaa C3, niin tällöin perä on suunnilleen kohdassa D1 (2*1 oikealle kohdasta C1)

Jos Sm4 pohjoisen suuntaan, jossa on 3 vaunua, pysähtyy kohtaan D5, niin tällöin perä on suunnilleen kohdassa B1 (3*4 vasemmalle kohdasta D5)

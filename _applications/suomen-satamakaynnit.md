---
title: Suomen satamakäynnit ja ruuhkatilanne (Apify)
intro: Alusten satamakäynnit Suomen satamissa, saapumis- ja lähtöajat sekä satamakohtainen kuormitusyhteenveto JSON- ja CSV-muodossa Digitrafficin avoimesta meriliikennedatasta.
logo: suomen-satamakaynnit/suomen-satamakaynnit-logo.png
developer:
  - Italo Armenti
  - https://github.com/itulo
traffictypes:
  - Meriliikenne
environments:
  - Web
language: Englanti (EN)
price: Maksullinen, käytön mukaan (kokeilu onnistuu Apifyn ilmaisilla kuukausikrediiteillä)
download-urls:
  - https://apify.com/itulo/digitraffic-port-calls-marine
feedback-url: https://github.com/itulo/eu-nordic-open-data-mcp/issues
---

Suomen satamakäynnit ja ruuhkatilanne on Apify-alustalla toimiva datatyökalu
(Actor). Se hakee Digitrafficin satamakäyntirajapinnasta Suomen satamiin
saapuvien ja niistä lähtevien alusten tiedot ja palauttaa ne yhtenäisinä
JSON- tai CSV-tietueina. Työkalua voi käyttää selaimessa Apify Consolessa,
ajastettuna, rajapinnan kautta tai MCP-työkaluna tekoälyavustajissa.

## Digitraffic-aineistojen käyttö

- **Meriliikenne:** satamakäynnit eli alus, IMO-numero, kansallisuus, edellinen
  ja seuraava satama, satama-alue ja laituri, arvioidut ja toteutuneet saapumis-
  ja lähtöajat (ETA/ETD ja ATA/ATD), tieto siitä, saapuuko alus lastissa, sekä
  laivanselvittäjät (vain yritysten nimet).
- **Satamakohtainen yhteenveto:** satamakäyntien määrä, lastissa saapuvien
  alusten osuus, suunniteltu keskimääräinen satamassaoloaika sekä
  käytössä olevien laitureiden ja lippuvaltioiden määrä.

Tietoja voi rajata sataman UN/LOCODE-tunnuksella (esimerkiksi FIHEL Helsinki,
FITKU Turku tai FIKTK Kotka), aluksen nimellä, IMO-numerolla tai
radiokutsutunnuksella. Työkalu ei tallenna henkilötietoja, kuten aluksen
päällikön nimeä. Jokaisessa tietueessa on lähdemerkintä "Source: Fintraffic /
digitraffic.fi, license CC 4.0 BY".

## Käyttö ja hinta

Työkalu on maksullinen, ja se laskutetaan käytön mukaan: 0,01 dollaria ajon
käynnistyksestä ja 0,0015 dollaria tietueelta. Apifyn ilmaisen tilin
kuukausittaiset krediitit riittävät kokeiluun. Lähdekoodi on avointa
(MIT-lisenssi), ja työkalun voi ajaa myös omalla koneella MCP-palvelimena.
Käyttöliittymä ja ohjeet ovat englanniksi. Samat tiedot saa myös suoraan ja
maksutta Digitrafficin rajapinnasta.

Työkalu on Italo Armentin itsenäinen projekti, eikä Fintraffic ole tehnyt tai
hyväksynyt sitä. Logo: Italo Armenti,
[MIT-lisenssi]({{ site.baseurl }}/img/suomen-satamakaynnit/LICENSE.txt).

[Avaa Apify Storessa](https://apify.com/itulo/digitraffic-port-calls-marine) ·
[Lähdekoodi](https://github.com/itulo/eu-nordic-open-data-mcp/tree/main/tools/digitraffic-port-calls-marine) ·
[Palaute](https://github.com/itulo/eu-nordic-open-data-mcp/issues)

## In English

Finnish Port Calls & Congestion is a data tool (Actor) on the Apify platform.
It reads the Digitraffic Marine port call API and returns vessel port calls for
Finnish ports as uniform JSON or CSV records: vessel, IMO number, flag, previous
and next port, port area and berth, estimated and actual arrival and departure
times, whether the vessel arrives with cargo, and corporate shipping agents. A second mode summarises each
port: number of port calls, share arriving with cargo, average planned
turnaround time, and the number of active berths and flag states.

It is paid per use (USD 0.01 per run plus USD 0.0015 per record); the free
monthly credits of an Apify account cover a trial. The source code is open
(MIT) and can also run locally as an MCP server. Personal data such as the
ship master's name is dropped, and every record carries the attribution
"Source: Fintraffic / digitraffic.fi, license CC 4.0 BY". It is an independent
tool by Italo Armenti and is not made or endorsed by Fintraffic. The same data
is available free of charge directly from the Digitraffic API. The logo is
licensed under the MIT License.

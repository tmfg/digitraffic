---
layout: sub-traffictype
permalink: /en/road-traffic/tmc-data/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: TMC Data
lang: en
ref: tmc-data
intro: Finnish RDS-TMC event list and location table
---

<h2 id="sisältö">Contents</h2>

- Do not remove this line (it will not be displayed) {:toc}

This note describes the Finnish location and event tables including which
decisions have been made concerning items, which are not part of the Location
referencing standards. It also includes recommendations for the composition of
messages.

## TMC/ALERT-C location data

RDS-TMC is a traffic message channel, which relays traffic information through
analog FM radio's RDS channel. Traffic information includes useful and real time
data about road works, accidents, traffic jams and weather. The TMC/ALERT-C
material is necessary when using the traffic information. Fintraffic is
responsible for administration and distribution of the Finnish TMC data. TMC is
developed by the TISA.

The Finnish TMC location database is constantly updated and certified yearly by
TISA. For incident broadcasting Fintraffic uses more frequently exported
versions of the database. Both certified and these intermediate non-certified
versions are downloadable via Digitraffic.

### Downloadable content

- [The latest certified version](https://tie.digitraffic.fi/tmc/index.html?prefix=certified){:target="_blank"}

- [Non-certified versions](https://tie.digitraffic.fi/tmc/index.html?prefix=noncertified){:target="_blank"}

The structure of the non-certified data differs slightly from that of certified
version. These differences between versions are described in
[Table_format_differences.zip](https://tie.digitraffic.fi/tmc/noncertified/Table_format_differences.zip){:target="_blank"}
document.

### Api-content

Non-certified location content is available also via API-calls:

- Locations
  [https://tie.digitraffic.fi/api/traffic-message/v1/locations](https://tie.digitraffic.fi/api/traffic-message/v1/locations)

- Content versions
  [https://tie.digitraffic.fi/api/traffic-message/v1/locations/versions](https://tie.digitraffic.fi/api/traffic-message/v1/locations/versions)

- Location types
  [https://tie.digitraffic.fi/api/traffic-message/v1/locations/types](https://tie.digitraffic.fi/api/traffic-message/v1/locations/types)

Full API description is located in Swagger-documentation
[https://tie.digitraffic.fi/swagger/#/Traffic message V1](https://tie.digitraffic.fi/swagger/#/Traffic%20message%20V1)

## Event list

The Finnish event list has expanded from one column to three columns compared to
the CEN-English version. One column is for events without attached quantifier,
one is for events with attached quantifier = 1 and one for events with attached
quantifier > 1. The background for this is that we want the texts to appear as
normal as possible for the users of RDS-TMC equipment. Due to the grammatical
circumstances in the Finnish language it is not indifferent if the quantifier is
singular or plural.

_First column (no quantifier):_ Each event has been examined and it has been
decided if the sentence is in singular or plural (which of the versions is most
likely to be the right one).

_Second column (quantifier = 1):_ For all events where the quantifiers are
numbers without a unit (type 0 and 1 - see Alert C standard) the sentences are
finished - either using or not using the number.

If the Finnish words in the sentence signalises the number (=1) then no number
is included in the sen-tence (E.g. "Q lane(s) blocked" transformed into Finnish
is "kaista suljettu" - "Q kaistaa suljettu " in plural).

For all other quantifier types the Q is maintained in the event list (E.g.
"closed for heavy vehicles (over Q)").

_Third column (quantifier > 1):_ For all events with quantifiers the Q is
maintained.

Comment: Some events do not make any sense without quantifier or with quantifier
= 1 (E.g. "next departure Q"). In these cases the cells representing "without
quantifier" and "with quantifier = 1" are left empty.

Further examples:

| CEN-English                    | No quantifier                | Quantifier=1         | Quantifier=2                   |
| ------------------------------ | ---------------------------- | -------------------- | ------------------------------ |
| (Q) fallen trees               | kaatuneita puita             | kaatunut puu         | 2 kaatunutta puuta             |
| (Q) earlier accident(s)        | aiempi onnettomuus           | aiempi onnettomuus   | Q aiempaa onnettomuutta        |
| due to (Q) earlier accident(s) | aiemman onnettomuuden vuoksi | onnettomuuden vuoksi | Q aiemman onnettomuuden vuoksi |
| Current temperature Q          | -                            | -                    | tämänhetkinen lämpötila (Q)    |

## Location Table

All location types are based on the CEN document concerning "Location
Referencing for Alert C" (Draft prENV 12313-3).

### Preconditions

The location table has been constructed under the following preconditions:

- That all point names should be unique on one road. A point name consists of a
  type/subtype (from Loctype), the description (from Firstname) and the number
  of crossing road (from Secondname) if it exists (it does not yet exist for all
  points).

- Finland has a number of domestic ferry routes. These are all included in the
  location table. For each the Road_number is indicated.

- It is presumed that for presentation purposes the type/subtype of the
  locations is taken from the appropriate column in the location table – meaning
  that the equivalent information is in most cases not included in the Firstname
  column.

### Fields in spreadsheet version of location table

| Field              | Explanation                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CountryNo          | Country number to identify the country. Finland has number 6.                                                                                                                                                                                        |
| TableNo            | Table number to identify the location database. Finland has numbers 17-24, and is using number 17.                                                                                                                                                   |
| LocationCode       | Unique number for each object in the database.                                                                                                                                                                                                       |
| Class              | Database objects are divided into classes, A= area, L= linear, P = point.                                                                                                                                                                            |
| Type               | Code of location type. Refer to standard. See 3.3.                                                                                                                                                                                                   |
| Subtype            | Code of location subtype. Refer to standard. See 3.3.                                                                                                                                                                                                |
| Road/Junctionno    | Roadnumber for roads. Junctionno: the numbering of exits has only just begun on the very limited Finnish motorway network. The exit numbers will be included. NOTE: the roads, segments and points are not sorted in ascending order.                |
| RoadName           | Roadname if exists, L5.0 always have road name.                                                                                                                                                                                                      |
| FirstName          | For roads and segments this is the name of the starting point. For all other objects (linear (streets), area and point) this is the name of the ob-ject.                                                                                             |
| SecondName         | For roads and segments this is the name of the ending point. For point locations the number of the intersecting road.                                                                                                                                |
| AreaRef            | Code of the upper order administrative area.                                                                                                                                                                                                         |
| LinearRef          | For segments and point locations. Describes the code of the segment which these objects belong to. If there are no segments on the road the location code of the road is given instead.                                                              |
| NegOffset          | For segments and point locations. Segments: describes the code of previous segment on that road. For the first segment on the road this code is 0. Points: describes the code of previous point on that road. For the starting point this code is 0. |
| PosOffset          | For segments and point locations. Segments: describes the code of next segment on that road. For the last segment on the road this code is 0. Points: describes the code of next point on that road. For the last point this code is 0.              |
| Urban              | Indicates whether a point is within the city limits (1) or not (0). NOTE: Not actively entered yet.                                                                                                                                                  |
| WGS84Lat           | Coordinate in WGS84, for all points                                                                                                                                                                                                                  |
| WGS84Lon           | Coordinate in WGS84, for all points                                                                                                                                                                                                                  |
| Etrs_TM35FinXCoord | Coordinate in ETRS-TM35FIN.                                                                                                                                                                                                                          |
| Etrs_TM35FinYCoord | Coordinate in ETRS-TM35FIN.                                                                                                                                                                                                                          |
| NegativeDirection  | For all L5.0 and for some roads. Text to be used when the incident has an effect only on vehicles driving in the negative direction of the road. ( e.g. Ring 1 westbound)                                                                            |
| PositiveDirection  | For all L5.0 and for some roads. Text to be used when the incident has an effect only on vehicles driving in the positive direction of the road. ( e.g. Ring 1 eastbound)                                                                            |

### Types and subtypes

The following types and subtypes are used in the Finnish location table:

| Type/subtype | CEN-English                           | Finnish                                |
| ------------ | ------------------------------------- | -------------------------------------- |
| A1           | Continent                             | Maanosa                                |
| A2           | Country group                         | Maaryhmä                               |
| A3           | Country                               | Maa                                    |
| A5           | Water area                            | Vesistöalue                            |
| A5.1         | sea                                   | Meri                                   |
| A5.2         | lake                                  | Järvialue                              |
| A6           | Fuzzy area                            | Fuzzy area                             |
| A6.1         | Tourist area                          | Matkailualue                           |
| A6.2         | Metropolitan area                     | Kaupunkiseutu                          |
| A6.3         | Industrial area                       | Teollisuusalue                         |
| A6.4         | Traffic area                          | Liittymäalue                           |
| A6.5         | Meteorological area                   | Sääalue                                |
| A6.6         | Carpool area                          | Kimppakyytialue                        |
| A6.7         | Park and ride site                    | Liityntäpysäköintialue                 |
| A6.8         | Car park area                         | Pysäköintialue                         |
| A7           | Order 1 area                          | Lääni                                  |
| A8           | Order 2 area                          | Maakunta                               |
| A9           | Order 3 area                          | Kunta                                  |
| A9.1         | Rural county                          | Maalaiskunta                           |
| A9.2         | Urban county                          | Kaupunki                               |
| A10          | Order 4 area                          | Kaupunginosa                           |
| A12          | Application region                    |                                        |
| L1           | Road                                  | Tie                                    |
| L1.1         | Motorway                              | Moottoritie                            |
| L1.2         | 1st Class road                        | Valta- tai kantatie                    |
| L1.3         | 2nd Class road                        | Seututie                               |
| L1.4         | 3rd Class road                        | Yhdystie                               |
| L2           | Ring-road                             | Kehätie                                |
| L2.1         | ring motorway                         | Kehämoottoritie                        |
| L2.1         | other ring-road                       | muu kehätie                            |
| L3           | Order 1 segment                       | 1. asteen tiejakso                     |
| L4           | Order 2 segment                       | 2. asteen tiejakso                     |
| L5           | Urban street                          | Taajamatie                             |
| L6           | Vehicular link                        | Raideyhteys                            |
| L6.1         | ferry                                 | Lauttayhteys                           |
| L6.2         | vehicular rail link                   | Raideyhteys                            |
| P1           | Junction                              | Liittymä                               |
| P1.1         | motorway intersection                 | Eritasoliittymä                        |
| P1.2         | motorway triangle                     | Moottoriteiden haarauma                |
| P1.3         | motorway junction                     | Moottoritieliittymä                    |
| P1.4         | motorway exit                         | Erkanemisramppi                        |
| P1.5         | motorway entrance                     | Liittymisramppi                        |
| P1.6         | flyover                               | Ylikulku                               |
| P1.7         | underpass                             | Alikulku                               |
| P1.8         | roundabout                            | Kiertoliittymä                         |
| P1.9         | giratory                              | laaja kiertoliittymä                   |
| P1.10        | traffic lights                        | Liikennevalot                          |
| P1.11        | cross-roads                           | Tasoliittymä                           |
| P1.12        | T-junction                            | Kolmihaaraliittymä                     |
| P1.13        | Intermediate node                     | Jakopiste                              |
| P1.14        | Connection                            | Yhteyskaista                           |
| P1.15        | exit                                  |                                        |
| P2           | Intermediate point                    | tekninen piste                         |
| P2.1         | Distance marker                       | Etäisyystaulu                          |
| P2.2         | Traffic monitoring station            | Liikennelaskentapiste                  |
| P3           | Other landmark point                  | muu piste                              |
| P3.1         | tunnel                                | Tunneli                                |
| P3.2         | bridge                                | Silta                                  |
| P3.3         | service area                          | Palvelupiste                           |
| P3.4         | rest area                             | Levähdysalue                           |
| P3.5         | view point                            | Näköalapaikka                          |
| P3.6         | carpool point                         | Kimppakyytipiste                       |
| P3.7         | park and ride site                    | Liityntäpysäköintipaikka               |
| P3.8         | car park                              | Pysäköintialue                         |
| P3.9         | kiosk                                 | Kioski                                 |
| P3.10        | kiosk with WC                         | kioski ja WC                           |
| P3.11        | petrol station                        | Tankkauspiste                          |
| P3.12        | petrol station with kiosk             | Huoltoasema                            |
| P3.13        | motel                                 | hotelli/motelli                        |
| P3.14        | border/frontier                       | Raja                                   |
| P3.15        | customs post                          | Tulli                                  |
| P3.16        | toll plaza                            | Tietulli                               |
| P3.17        | ferry terminal                        | Lauttaranta                            |
| P3.18        | harbour                               | Satama                                 |
| P3.19        | square                                | Tori                                   |
| P3.20        | fair                                  | Aukio                                  |
| P3.21        | garage                                | Pysäköintihalli                        |
| P3.22        | underground garage                    | Maanalainen pysäköintihalli            |
| P3.23        | retail park                           | Kauppakeskus                           |
| P3.24        | theme park                            | Huvipuisto                             |
| P3.25        | tourist attraction                    | Matkailukohde                          |
| P3.26        | university                            | Oppilaitos                             |
| P3.27        | airport                               | Lentokenttä                            |
| P3.28        | station                               | juna/linja-autoasema                   |
| P3.29        | hospital                              | Sairaala                               |
| P3.30        | church                                | Kirkko                                 |
| P3.31        | stadium                               | Urheilukenttä                          |
| P3.32        | palace                                | Kartano                                |
| P3.33        | castle                                | Linna                                  |
| P3.34        | town hall                             | Kaupungintalo                          |
| P3.35        | Exhibition/convention centre          | Näyttelykeskus                         |
| P3.36        | communities                           | Taajama                                |
| P3.37        | place name                            |                                        |
| P3.38        | dam                                   | Pato                                   |
| P3.39        | Dike                                  | Penger                                 |
| P3.40        | Aqueduct                              | Vesijohto                              |
| P3.41        | Lock                                  | Sulku                                  |
| P3.42        | Mountain crossing/pass                | Sola                                   |
| P3.43        | Railroad crossing                     | rautatien tasoristeys                  |
| P3.44        | Wade                                  | Pengerrys                              |
| P3.45        | Ferry                                 | Lautta                                 |
| P3.46        | Industrial area                       | Teollisuusalue                         |
| P 3.47       | viaduct                               |                                        |
| P 4.0        | link road point                       |                                        |
| P 5.0        | parking POI                           | Pysäköinti POI                         |
| P 5.1        | underground parking garage            | Maanalainen pysäköintihalli            |
| P 5.2        | car park                              | Pysäköintialue                         |
| P 5.3        | parking garage                        | Pysäköintihalli                        |
| P 5.4        | carpool point                         | Carpool point                          |
| P 5.5        | park and ride site                    | Liityntäpysäköinti                     |
| P 5.6        | rest area parking                     | Levähdysaluepysäköinti                 |
| P 5.7        | campground                            | Leirintäalue                           |
| P 5.8        | isolated rest areas beside motor-ways | Erillinen levähdysalue moottori-tiellä |
| P 6.0        | other isolated POI                    | Muu erillinen POI                      |
| P 6.1        | airport                               | Lentokenttä                            |
| P 6.2        | station                               | Asema                                  |
| P 6.3        | harbour                               | Satama                                 |
| P 6.4        | tunnel                                | Tunneli                                |
| P 6.5        | bridge                                | Silta                                  |
| P 6.6        | ferry                                 | Lautta                                 |
| P 6.7        | square                                | Tori                                   |
| P 6.8        | fair                                  | Markkinat                              |
| P 6.9        | retail park                           | Retail Park                            |
| P 6.10       | theme park                            | Teemapuisto                            |
| P 6.11       | tourist attraction                    | Matkailukohde                          |
| P 6.12       | stadium                               | Stadion                                |
| P 6.13       | exhibition/convention centre          | Messu-/kokouskeskus                    |
| P 6.14       | place name                            | Paikannimi                             |

### Important aspects

Some Finnish roads change road type (e.g. Motorway to 1st class road). The fact
that it is not in the cur-rent standard possible to indicate the road type on
segment level (there is no subtypes for segments) means that it is not possible
to indicate where the road type changes for a road.

### Examples of RDS-TMC messages

In the examples below are shown the messages as the Finnish Road Administration
would like them to be presented. In the road and segment level there are two
possibilities depending on the fact that the event is only affecting one
direction or both directions.

**Example from motorway, two points, one direction**

Route: Tie 1 eli Turunväylä

Segment: Helsinki-Salo

Direction: Haittaa ajosuunnassa Salo

Location(s): Paikasta Veikkola suuntaan Palojärvi, tie 2:n liittymä

Event: Queuing traffic due to accident

_Tie_ **FINroadnumber** _eli_ **Roadname** **SegmentRef FirstName SegmentRef
SecondName** _Haittaa ajosuunnassa_ **SegmentRef SecondName** _Paikasta_
**SecondaryPointFirstName**, _tie_ **SecondaryPointSecondname**:_n liittymä
suuntaan_ **Prima-ryPointFirstName**, _tie_ **PrimaryPointSecondName**:_n
liittymä_

**Example from motorway, one point, both directions**

Route: Tie 1 eli Turunväylä

Segment: Helsinki-Salo

Direction: Haittaa molemmissa ajosuunnissa

Location(s): Palojärvi, tie 2:n liittymä

Event: Accident

_Tie_ **FINroadnumber** _eli_ **Roadname** **SegmentRef FirstName SegmentRef
SecondName** _Haittaa molemmissa ajosuunnissa_ **PrimaryPointFirstName**, _tie_
**PrimaryPointSecondName**:_n liittymä_

In the table below the central words (which are not already in the
type/subtype-list) for presentation are translated.

| English                   | Finnish                         |
| ------------------------- | ------------------------------- |
| Road                      | Tie                             |
| ‘that is’                 | Eli                             |
| Affects the direction to… | Haittaa ajosuunnassa            |
| From…to                   | Paikasta…suuntaan               |
| Crossroad                 | :n liittymä                     |
| Affects both directions   | Haittaa molemmissa ajosuunnissa |

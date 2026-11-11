---
layout: traffictype
permalink: /en/railway-traffic/
section: Tietolähteet
traffictypes: Rautatieliikenne
searchable: true
swagger-source: null
hero-image: rail
ref: railway-traffic
lang: en
title: Railway traffic
intro: Timetables, delays, locations and composition of trains operating in Finland
links:

- ["Finnish Transport Infrastructure Agency", "https://vayla.fi"]
- ["Fintraffic", "https://fintraffic.fi"]
- ["Swagger", "https://rata.digitraffic.fi/swagger/"]
---

The purpose of this service is to share data of trains operating in Finland. The
service is operated by Fintraffic. The data is sourced from the following
applications used in traffic controlling and capacity management:

![LIIKE]({{ site.baseurl }}{{ "/img/rata/liike.png" }}) ![REAALI]({{
site.baseurl }}{{ "/img/rata/reaali.png" }}) ![LOKI]({{ site.baseurl }}{{
"/img/rata/loki.png" }})

Using the data from this service, it is possible to answer the following
questions:

- Is my train on schedule?
- What is the location of my train at the moment?
- Which train can I use to travel from A to B on date C?
- Which trains are departing and arriving next from a specific station?
- What kind of wagons and locomotives does my train consist of?
- What kind of services does a train provide?
- Was my train on schedule for example two months ago?

English version of the documentation page contains only GraphQL and Swagger (in
a short form). You might get more information using Google Translate with the
[Finnish documentation](https://www.digitraffic.fi/rautatieliikenne/)

# Index

1. [GraphQL](#graphql)
2. [Swagger](#swagger)
3. [GTFS](#gtfs)
4. [NeTEx](#netex)
5. [SIRI](#siri)
6. [Track work project and yearly plans](#track-work-project-and-yearly-plans)

# GraphQL

Resources:

- [GraphiQL](https://rata.digitraffic.fi/api/v2/graphql/graphiql), online tool
  for testing and developing GraphQL-queries
- [Schema](https://rata.digitraffic.fi/api/v2/graphql/schema.svg), contains
  available Queries, Types etc.

## Examples

#### All trains from the operator "vr" and their latest locations with speed over 30 km/h [Try](https://rata.digitraffic.fi/api/v2/graphql/graphiql?query=%7B%0A%20%20currentlyRunningTrains(where%3A%20%7Boperator%3A%20%7BshortCode%3A%20%7Bequals%3A%20%22vr%22%7D%7D%7D)%20%7B%0A%20%20%20%20trainNumber%0A%20%20%20%20departureDate%0A%20%20%20%20trainLocations(where%3A%20%7Bspeed%3A%20%7BgreaterThan%3A%2030%7D%7D%2C%20orderBy%3A%20%7Btimestamp%3A%20DESCENDING%7D%2C%20take%3A%201)%20%7B%0A%20%20%20%20%20%20speed%0A%20%20%20%20%20%20timestamp%0A%20%20%20%20%20%20location%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)

```
{
  currentlyRunningTrains(where: {operator: {shortCode: {equals: "vr"}}}) {
    trainNumber
    departureDate
    trainLocations(where: {speed: {greaterThan: 30}}, orderBy: {timestamp: DESCENDING}, take: 1) {
      speed
      timestamp
      location
    }
  }
}
```

#### All trains from a specific departure date, with operator "vr" and "commuter line" not equal to "Z", ordered by train number [Try](https://rata.digitraffic.fi/api/v2/graphql/graphiql?query=%7B%0A%20%20trainsByDepartureDate(%0A%20%20%20%20departureDate%3A%20%222020-10-05%22%2C%20%0A%20%20%20%20where%3A%20%7Band%3A%20%5B%20%7Boperator%3A%20%7BshortCode%3A%20%7Bequals%3A%20%22vr%22%7D%7D%7D%2C%20%7BcommuterLineid%3A%20%7Bunequals%3A%20%22Z%22%7D%7D%5D%7D%2C%20%0A%20%20%20%20orderBy%3A%20%7BtrainNumber%3A%20DESCENDING%7D)%20%0A%20%20%7B%0A%20%20%20%20trainNumber%0A%20%20%20%20departureDate%0A%20%20%20%20commuterLineid%0A%20%20%20%20operator%20%7B%0A%20%20%20%20%20%20shortCode%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)

```
{
  trainsByDepartureDate(
    departureDate: "2020-10-05", 
    where: {and: [ {operator: {shortCode: {equals: "vr"}}}, {commuterLineid: {unequals: "Z"}}]}, 
    orderBy: {trainNumber: DESCENDING}) 
  {
    trainNumber
    departureDate
    commuterLineid
    operator {
      shortCode
    }
  }
}
```

#### All running trains ordered by operator and train number [Try](https://rata.digitraffic.fi/api/v2/graphql/graphiql?query=%7B%0A%20%20currentlyRunningTrains(orderBy%3A%20%5B%7Boperator%3A%7BshortCode%3AASCENDING%7D%7D%2C%7BtrainNumber%3AASCENDING%7D%5D)%20%7B%0A%20%20%20%20operator%20%7B%0A%20%20%20%20%20%20shortCode%0A%20%20%20%20%7D%0A%20%20%20%20trainNumber%0A%20%20%7D%0A%7D%0A)

```
{
  currentlyRunningTrains(orderBy: [{operator:{shortCode:ASCENDING}},{trainNumber:ASCENDING}]) {
    operator {
      shortCode
    }
    trainNumber
  }
}
```

#### Trains that pass through "YLÖ" [Try](https://rata.digitraffic.fi/api/v2/graphql/graphiql?query=%7B%0A%20%20trainsByDepartureDate(departureDate%3A%20%222020-10-06%22%2C%20%0A%20%20%20%20where%3A%20%7BtimeTableRows%3A%7Bcontains%3A%7Bstation%3A%7BshortCode%3A%7Bequals%3A%22YL%C3%96%22%7D%7D%7D%7D%7D%0A%20%20%20%20)%20%7B%0A%20%20%20%20trainNumber%0A%20%20%20%20departureDate%0A%20%20%20%20timeTableRows%20%7B%0A%20%20%20%20%20%20station%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20uicCode%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)

```
{
  trainsByDepartureDate(departureDate: "2020-10-06", 
    where: {timeTableRows:{contains:{station:{shortCode:{equals:"YLÖ"}}}}}
    ) {
    trainNumber
    departureDate
    timeTableRows {
      station {
        name
        uicCode
      }
    }
  }
}
```

#### Passenger information messages related to trains on a specific date

```
{
  passengerInformationMessages(
    where: {trainDepartureDate: {equals: "2024-06-11"}}
  ) {
    trainNumber
    video {
      text {
        fi
        sv
        en
      }
    }
    audio {
      text {
        fi
        sv
        en
      }
    }
  }
}
```

# Swagger

[Swagger documentation](https://rata.digitraffic.fi/swagger/).

# GTFS

.zip files are generated daily around 5:00 and should be ready no later than 7:00. Packages include all current and
future trains

- GTFS for passenger trains:
  [https://rata.digitraffic.fi/api/v1/trains/gtfs-passenger.zip](https://rata.digitraffic.fi/api/v1/trains/gtfs-passenger.zip)
- GTFS for passenger trains, no pass-by stops:
  [https://rata.digitraffic.fi/api/v1/trains/gtfs-passenger-stops.zip](https://rata.digitraffic.fi/api/v1/trains/gtfs-passenger-stops.zip)
- GTFS for all trains:
  [https://rata.digitraffic.fi/api/v1/trains/gtfs-all.zip](https://rata.digitraffic.fi/api/v1/trains/gtfs-all.zip)
- GTFS-RT locations:
  [https://rata.digitraffic.fi/api/v1/trains/gtfs-rt-locations](https://rata.digitraffic.fi/api/v1/trains/gtfs-rt-locations)
- GTFS-RT updates:
  [https://rata.digitraffic.fi/api/v1/trains/gtfs-rt-updates](https://rata.digitraffic.fi/api/v1/trains/gtfs-rt-updates)

If you are using real time feeds, then you should be using gtfs-passenger-stops.zip for matching stop_sequences.
Real time feed is updated every 10 seconds.

Data is licensed under
[Creative Commons Nimeä 4.0](https://creativecommons.org/licenses/by/4.0/)

# NeTEx

[https://rata.digitraffic.fi/api/v1/netex/FTR-netex.zip](https://rata.digitraffic.fi/api/v1/netex/FTR-netex.zip)

NeTEx is a CEN standard for exchanging public transport information, such as
timetables and routes, as XML. The package follows the
[Nordic NeTEx Profile](https://entur.atlassian.net/wiki/spaces/PUBLIC/pages/728891481/Nordic+NeTEx+Profile)
and contains the planned timetables and routes of passenger trains.

The package is generated daily. It contains timetables
for the last seven days and for the future until the end of next year. It has a
shared file `_FTR_shared_data.xml` (operators, stops with their platforms and
calendar) and
one XML file per line, for example `FTR_S-979_Helsinki-Turku.xml`.

If some stops of a train are cancelled on certain days (partial cancellation),
the package has a separate shortened journey for those days, without the
cancelled stops.

The response headers `x-timestamp` (generation time) and `x-is-fresh` (`true`
when the package is less than 25 hours old) tell how current the package is.
Responses may be cached for 15 minutes. The interface returns 404 if no package
is available.

NeTEx gives the plan and [SIRI](#siri) gives the real-time changes to it.

Returns a zip package that follows the
[Nordic NeTEx Profile](https://entur.atlassian.net/wiki/spaces/PUBLIC/pages/728891481/Nordic+NeTEx+Profile).

Data is licensed under
[Creative Commons Nimeä 4.0](https://creativecommons.org/licenses/by/4.0/)

# SIRI

SIRI (Service Interface for Real Time Information) is a European standard for
real-time public transport data. The interfaces follow the
[Nordic SIRI profile](https://entur.atlassian.net/wiki/spaces/PUBLIC/pages/637370373/General+information+SIRI)
(SIRI 2.0 schema). Each interface returns one XML document
(`application/xml`):

- `/siri/et` (Estimated Timetable) tells the deviations from the plan during the
  current operating day: estimated and actual times, cancellations, partial
  cancellations and platform changes:
  [https://rata.digitraffic.fi/api/v1/siri/et](https://rata.digitraffic.fi/api/v1/siri/et)
- `/siri/vm` (Vehicle Monitoring) tells the location and delay of passenger
  trains and the stop the train is approaching or standing at:
  [https://rata.digitraffic.fi/api/v1/siri/vm](https://rata.digitraffic.fi/api/v1/siri/vm)
- `/siri/sx` (Situation Exchange) contains passenger information messages shown
  and announced at stations and on trains. A message relates to
  either a station or a train:
  [https://rata.digitraffic.fi/api/v1/siri/sx](https://rata.digitraffic.fi/api/v1/siri/sx)

The documents are regenerated every minute. The response headers tell how
current the document is:

- `x-timestamp` is the generation time of the document. For SIRI-SX it is the
  time of the last successful check.
- `x-is-fresh` is `true` when the document is less than 5 minutes old.

Responses may be cached for 30 seconds.

Identifiers and times:

- Journeys, lines and operators use the same identifiers as the
  [NeTEx package](#netex), so SIRI complements the plan in NeTEx with real-time
  information. The identifier prefix (codespace) is `FTR`.
- Platforms (ET and VM) and stations (SX station messages) use the identifiers of
  Fintraffic's national stop registry (PETI). A platform identifier looks like
  `FSR:Quay`.
- Times are in Finnish time.

**SIRI-ET**

- The document contains the trains of the operating day. A train of the previous
  day is also included if it is still running. Only stops where passengers can
  board or alight are included.
- Stops already served are in `RecordedCall` elements and upcoming stops in
  `EstimatedCall` elements.
- A cancelled train is marked on the journey and cancelled stops on the stops.
- If a train does not stop at all planned stations (partial cancellation), NeTEx
  has a separate shortened journey for that day. SIRI-ET refers to that journey.
- A platform change is shown in the `StopAssignment` element (planned and actual
  platform).
- A train that is not published in the NeTEx timetable (for example a freight
  train) is not in the document.
- If the NeTEx data or the stop registry data is not available, a new document
  is not generated. The previous document stays available and `x-is-fresh`
  becomes `false`.

**SIRI-VM**

- The document contains the latest location of each passenger train when it is
  at most 30 minutes old. The location is the same as in the GTFS-RT
  `gtfs-rt-locations` interface.
- `Delay` is the estimated delay at the next stop. If the delay is not known, it
  is `PT0S`.
- `MonitoredCall` describes the next stop. When the train has arrived at its
  final stop, it is that stop.
- A train that is not published in the NeTEx timetable is not in the document.
- If the NeTEx data is not available, a new document is not generated. The
  previous document stays available and `x-is-fresh` becomes `false`.

**SIRI-SX**

- A message is published as soon as it is created, even if its validity has not
  started yet. The validity period is in the `ValidityPeriod` element.
- A deleted message stays in the document for 5 hours with the state `closed`
  and is then removed.
- The message text (`Summary`) is at most 160 characters. A longer text is
  truncated and the full text is in the `Description` element. Texts are in
  Finnish, Swedish and English (`FI`, `SV`, `EN`).
- A station message refers to a station (`StopPlaceRef`) and a train message to a
  train (`FramedVehicleJourneyRef`). A train message is published only when the
  journey of the train has been published in NeTEx. It can be delayed if the
  departure date is more than 14 days away.
- If the stop registry data is not available, a new document is not generated.
  If the NeTEx journeys are not available, train messages are left out, station
  messages are still published and the document stays fresh
  (`x-is-fresh` is `true`).

Returns an XML document that follows the
[Nordic SIRI profile](https://entur.atlassian.net/wiki/spaces/PUBLIC/pages/637370373/General+information+SIRI)
(SIRI 2.0).

# Track work project and yearly plans

[https://rata.digitraffic.fi/api/v1/yearly-plans/yearly-plans.json](https://rata.digitraffic.fi/api/v1/yearly-plans/yearly-plans.json)

[https://rata.digitraffic.fi/api/v1/project-plans/project-plans.json](https://rata.digitraffic.fi/api/v1/project-plans/project-plans.json)

Track work project and yearly plans are available as static JSON datasets from the above URLs.

Data is updated from the source system once per day.

Dataset descriptions are available in JSON Schema format:

[https://github.com/tmfg/digitraffic-cdk/blob/master/rail/yearly-plans/src/model/schema.ts](https://github.com/tmfg/digitraffic-cdk/blob/master/rail/yearly-plans/src/model/schema.ts)




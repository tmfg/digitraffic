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

---
layout: sub-traffictype
permalink: /en/road-traffic/afir/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: Alternative Fuels
lang: en
ref: afir
intro: AFIR
---

Digitraffic publishes data on the alternative fuels charging network as open data.
Currently, the data includes the locations of electric vehicle charging points as well as related static and
real-time information.

Further information on AFIR obligations and instructions for charging network operators
on how to publish data to the [digitraffic.fi][digitraffic_en] service can be found on the [Fintraffic][fintraffic_en]
website:

* In Finnish: [Vaihtoehtoiset polttoaineet (AFIR)][fintraffic_afir_fi]
* In Swedish: [Alternativa drivmedel (AFIR)][fintraffic_afir_sv]
* In English: [Alternative Fuels (AFIR)][fintraffic_afir_en]

<h2 id="sisältö">Contents</h2>

- Do not remove this line (it will not be displayed). Next line must not have spaces.
{:toc}

Digitraffic provides alternative fuels charging network data via REST APIs as well as real-time status
information via MQTT topics.

# REST APIs

Swagger documentation for the APIs can be found at:

* [Swagger UI – AFIR][swagger_afir]
* [Swagger UI – AFIR test][swagger_afir_test]

Pagination in the APIs is cursor-based, which allows efficient navigation through large data sets.
Each paginated response contains a `nextCursor` field indicating the position from which the next page can be fetched.
Clients can request the next page by adding the following query parameter: `?cursor=<nextCursor-value>`.

**Example**:

The first request is made without a cursor:

`GET /api/charging-network/v1/locations`

The response contains a `nextCursor` value:

```
{
  "pagination": {
    "nextCursor": "ABCD",
    "limit": 500
  },
...
}
```

The next request uses the returned `nextCursor` value:

`GET /api/charging-network/v1/locations?cursor=ABCD`

The response again includes the next `nextCursor` value:

```
{
  "pagination": {
    "nextCursor": "CDGH",
    "limit": 500
  },
...
}
```

If `nextCursor` is `null` or missing, no further pages are available.

The `limit` field indicates the page size. Currently, the page size is fixed at 500, but this may change in
the future as the amount of distributed data increases.

## Charge Point Operators (CPO)

Charge Point Operators (CPOs) maintain charging points and are responsible for their operation.
This API provides information about the operators available in the service.

[`/api/charging-network/v1/operators`][afir_api_operators]

## Charging Point Locations

Location data is provided in GeoJSON format, and for certain operators, also in Datex II v3.6 format.
The location data includes static information about charging points.

[`/api/charging-network/v1/locations`][afir_api_locations] (GeoJSON)\
[`/api/charging-network/v1/locations/datex2-3.6`][afir_api_locations_datex_ii] (Datex II v3.6)

## Charging Point Status

Status information for EVSE devices (Electric Vehicle Supply Equipment) provides real-time details about
availability and reservations of the charging equipment.
The data is available in JSON format and, for certain operators, also in Datex II v3.6 format.

[`/api/charging-network/v1/locations/statuses`][afir_api_locations_statuses] (GeoJSON)\
[`/api/charging-network/v1/locations/statuses/datex2-3.6`][afir_api_locations_statuses_datex_ii] (Datex II v3.6)

# MQTT WebSocket Interfaces

Real-time status data is also available via MQTT topics over a WebSocket protocol.
Topics can be used to filter which charging points' data is listened to.

The topic format is:
`status-v1/<operatorCountryCode>/<operatorPartyId>/<locationId>/<evseId>`

Each level of the hierarchy filters the received status data more precisely.  
A trailing `#` means “all at this level”.

**Example**:

**Operator**: `Nyt Lataa Oy`\
**Country code**: `FI`\
**Operator party ID**: `NYT`\
**Location ID**: `FINYT00001`\
**EVSE ID**: `FI*NYT*E12345`

**Topic**: `status-v1/FI/NYT/FINYT00001/FI*NYT*E12345`:

To listen to all status messages of this operator:

**Topic**: `status-v1/FI/NYT/#`

The message payload is JSON-formatted and corresponds to the data returned by the REST API status endpoint.

``` 
{
  "status" : "CHARGING",
  "time" : "2025-12-02T09:38:06.000Z"
}
```

The topic indicates which EVSE device’s status the message refers to.

# Upcoming features

We are planning to add downloadable snapshot files containing all station data.
These files will be automatically updated at regular intervals.

[swagger_afir_test]: https://afir-test.digitraffic.fi/swagger/  "AFIR test Swagger UI"

[swagger_afir]: https://afir.digitraffic.fi/swagger/  "AFIR Swagger UI"

[afir_api_operators]: https://afir.digitraffic.fi/api/charging-network/v1/operators

[afir_api_locations]: https://afir.digitraffic.fi/api/charging-network/v1/locations

[afir_api_locations_datex_ii]: https://afir.digitraffic.fi/api/charging-network/v1/locations/datex2-3.6

[afir_api_locations_statuses]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses

[afir_api_locations_statuses_datex_ii]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses/datex2-3.6

[digitraffic_fi]: / "digitraffic.fi"

[digitraffic_en]: /en/ "digitraffic.fi/en"

[fintraffic_fi]: https://www.fintraffic.fi/fi  "Fintraffic – fi"

[fintraffic_en]: https://www.fintraffic.fi/en  "Fintraffic – en"

[fintraffic_afir_fi]: https://www.fintraffic.fi/fi/digitaalisetpalvelut/afir  "Fintraffic – Vaihtoehtoiset polttoaineet (AFIR)"

[fintraffic_afir_sv]: https://www.fintraffic.fi/sv/digitalatjanster/afir  "Fintraffic – Alternativa drivmedel (AFIR)"

[fintraffic_afir_en]: https://www.fintraffic.fi/en/digitalservices/afir  "Fintraffic – Alternative Fuels (AFIR)"
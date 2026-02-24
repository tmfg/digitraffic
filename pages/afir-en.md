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
on how to publish data to the [digitraffic.fi][digitraffic_en] service can be found on
the [Fintraffic][fintraffic_en]
website:

* In Finnish: [Vaihtoehtoiset polttoaineet (AFIR)][fintraffic_afir_fi]
* In Swedish: [Alternativa drivmedel (AFIR)][fintraffic_afir_sv]
* In English: [Alternative Fuels (AFIR)][fintraffic_afir_en]

<h2 id="sisältö">Contents</h2>

<!-- @formatter:off -->
- Do not remove this line (it will not be displayed). Next line must not have spaces.
{:toc}
<!-- @formatter:on -->

Digitraffic provides alternative fuels charging network data via REST APIs as well as real-time status
information via MQTT topics.

# REST APIs

## Swagger documentation

Swagger documentation for the APIs can be found at:

* [Swagger UI – AFIR][swagger_afir]
* [Swagger UI – AFIR test][swagger_afir_test]

## Pagination

Pagination in the APIs is cursor-based, which allows efficient navigation through large data sets.
Each paginated response contains a `nextCursor` field indicating the position from which the next page can be
fetched.
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

## Snapshots

For paginated APIs, it is also possible to retrieve a snapshot file generated every minute. You can fetch the
full dataset either by setting the `limit` parameter to `ALL` or by appending /all to the URL. The same
applies to the Datex II endpoints.

Note: If you make a request with `?limit=ALL`, the service will return an HTTP 302 redirect, with the Location
header pointing directly to the snapshot endpoint `/api/charging-network/v1/locations/statuses/all`. It is
recommended to use the snapshot endpoint directly, but a request with the limit parameter will also work via
redirection.

For example:

* [`/api/charging-network/v1/locations/statuses/all`][afir_api_locations_statuses_all]
* [`/api/charging-network/v1/locations/statuses?limit=ALL`][afir_api_locations_statuses_limit_all] (redirect)
* [`/api/charging-network/v1/locations/statuses/datex2-3.6/all`][afir_api_locations_statuses_datex_ii_all]
* [
  `/api/charging-network/v1/locations/statuses/datex2-3.6?limit=ALL`][afir_api_locations_statuses_datex_ii_limit_all] (
  redirect)

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
[`/api/charging-network/v1/locations/statuses/datex2-3.6`][afir_api_locations_statuses_datex_ii] (Datex II
v3.6)

## Charging Point Tariffs

The tariff API provides information about the pricing of electric vehicle charging points. Tariffs describe
how charging is billed: for example, based on time, energy (€/kWh), a fixed session fee, or a combination of
these.

[`/api/charging-network/v1/tariffs`][afir_api_tariffs] (JSON)\

# MQTT WebSocket Interfaces

Real-time status data is also available via MQTT topics over a WebSocket protocol.
Topics can be used to filter which charging points' data is listened to.

The production address is `wss://afir.digitraffic.fi:443/mqtt`\
The test address is `wss://afir-test.digitraffic.fi:443/mqtt`

An SSL connection must be used when logging in.

When using the Paho JS client, the address is simply afir.digitraffic.fi with port `443`.
A simple browser-based MQTT example application is available on the [Support > MQTT examples][mqtt_example]
page.

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

[swagger_afir_test]: https://afir-test.digitraffic.fi/swagger/  "AFIR test Swagger UI"

[swagger_afir]: https://afir.digitraffic.fi/swagger/  "AFIR Swagger UI"

[afir_api_operators]: https://afir.digitraffic.fi/api/charging-network/v1/operators

[afir_api_locations]: https://afir.digitraffic.fi/api/charging-network/v1/locations

[afir_api_locations_datex_ii]: https://afir.digitraffic.fi/api/charging-network/v1/locations/datex2-3.6

[afir_api_locations_statuses]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses

[afir_api_locations_statuses_all]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses/all

[afir_api_locations_statuses_limit_all]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses?limit=ALL

[afir_api_locations_statuses_datex_ii_all]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses/datex2-3.6/all

[afir_api_locations_statuses_datex_ii_limit_all]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses/datex2-3.6?limit=ALL


[afir_api_tariffs]: https://afir.digitraffic.fi/api/charging-network/v1/tariffs

[afir_api_locations_statuses_datex_ii]: https://afir.digitraffic.fi/api/charging-network/v1/locations/statuses/datex2-3.6

[mqtt_example]: /tuki/script-mqtt/ "MQTT examples"

[digitraffic_fi]: / "digitraffic.fi"

[digitraffic_en]: /en/ "digitraffic.fi/en"

[fintraffic_fi]: https://www.fintraffic.fi/fi  "Fintraffic – fi"

[fintraffic_en]: https://www.fintraffic.fi/en  "Fintraffic – en"

[fintraffic_afir_fi]: https://www.fintraffic.fi/fi/digitaalisetpalvelut/afir  "Fintraffic – Vaihtoehtoiset polttoaineet (AFIR)"

[fintraffic_afir_sv]: https://www.fintraffic.fi/sv/digitalatjanster/afir  "Fintraffic – Alternativa drivmedel (AFIR)"

[fintraffic_afir_en]: https://www.fintraffic.fi/en/digitalservices/afir  "Fintraffic – Alternative Fuels (AFIR)"

'use strict';

const TRAFFIC_MESSAGES_URL = "https://tie.digitraffic.fi/api/traffic-message/v1/messages";
const TRAFFIC_MESSAGES_DATEX2_URL = "https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2";
const TYPE_EXEMPTED_TRANSPORT = "EXEMPTED_TRANSPORT";
const TYPE_ROAD_WORK = "ROAD_WORK";
const TYPE_TRAFFIC_ANNOUNCEMENT = "TRAFFIC_ANNOUNCEMENT";
const TYPE_WEIGHT_RESTRICTION = "WEIGHT_RESTRICTION";

function initTable(datexType, tableTitle) {
      $("#" + datexType).append([
        $("<colgroup>").append([
          $("<col>", {"class": "datex2-col1"}),
          $("<col>", {"class": "datex2-col2"}),
          $("<col>", {"class": "datex2-col3"}),
          $("<col>", {"class": "datex2-col4"}),
          $("<col>", {"class": "datex2-col5"}),
          $("<col>", {"class": "datex2-col6"}),
          $("<col>", {"class": "datex2-col7"}),
          $("<col>", {"class": "datex2-col8"})
        ]),
        $("<thead/>").append([
          $("<tr/>", {"class": "row.nowrap"}).append([
                    $("<th/>", {"class": "datex2-col-1-2", "colspan": 2}).text(tableTitle),
                    $("<th/>", {"class": "datex2-col-3-8", "id": "date_" + datexType, "colspan": 6}).text("-")
          ]),
          $("<tr/>", {"class": "row.nowrap"}).append([
                    $("<th/>", {"class": "datex2-col1"}).text("GUID"),
                    $("<th/>", {"class": "datex2-col2"}).text("Ver"),
                    $("<th/>", {"class": "datex2-col3"}).text("Start"),
                    $("<th/>", {"class": "datex2-col4"}).text("End / Open"),
                    $("<th/>", {"class": "datex2-col5"}).text("Title"),
                    $("<th/>", {"class": "datex2-col6"}).text("Xml"),
                    $("<th/>", {"class": "datex2-col7"}).text("Json"),
                    $("<th/>", {"class": "datex2-col8"}).text("Map")
          ])
        ]),
        $("<tbody/>")
      ]);
}

function loadContent(requestType) {
  console.info("Load traffic messages of type", requestType);
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      try {
        processResponse(JSON.parse(this.responseText), requestType);
      } catch(e) {
        console.error(e);
      }
    }
  };

  xmlhttp.onerror = function() {
    console.error(this);
  };

  xmlhttp.open("GET", TRAFFIC_MESSAGES_URL + "?situationType=" + requestType, true);
  xmlhttp.send();
}

function processResponse(resp, requestType) {
    if (resp) {
        console.log("Response:", resp);

        $("#date_" + requestType).text("Updated: " + toLocalDate(resp.dataUpdatedTime) + " / " + resp.features.length + " pcs");
        const enrichedResponse = enrichDatexData(resp);
        const sorted = enrichedResponse.features.sort(function(a, b) {
          return (a?.latestTimeAndDuration?.startTime || 0) - (b?.latestTimeAndDuration?.startTime || 0);
        });
        for (var item of sorted) {
            addMessage(requestType, item);
        }
    }
}

function enrichDatexData(data) {
  return { ...data, features: data.features.map((feature) => {
    return { ...feature,
    latestTimeAndDuration: getLatestDateTimeInterval(feature.properties.announcements)};
  }) }
}

function addMessage(clazz, message) {
    let warn = "";
    let start = "-";
    let end = "-";
    let timeDur = message.latestTimeAndDuration;

    const startDateTime = timeDur.startTime;
    const endDateTime = timeDur.endTime;
    if (startDateTime) {

        start = startDateTime.toISOString();

        if (endDateTime) {
            end = endDateTime.toISOString();
            let days = Math.round((endDateTime.getTime() - startDateTime.getTime()) / 86400000);

            end = end + " (" + days + " days)";
            if (endDateTime.getTime() < new Date().getTime()) {
                warn = " warn";
            }
        } else {

          let days = Math.round((new Date().getTime() - startDateTime.getTime()) / 86400000);
          end = "(" + days + " days)";

          if (days > 14) {
            warn = " warn";
          }
        }
    }

    $('#' + clazz + ' > tbody:last-child').append(
        $('<tr/>', {"class": "row.nowrap" + warn}).append([
            $('<td/>', {"class": "datex2-col1"}).text(message.properties.situationId),
            $('<td/>', {"class": "datex2-col2"}).text(message.properties.version),
            $('<td/>', {"class": "datex2-col3"}).text(start),
            $('<td/>', {"class": "datex2-col4" + warn}).text(end),
            $('<td/>', {"class": "datex2-col5"}).text(getTitle(message.properties.announcements)),
            $('<td/>', {"class": "datex2-col6"}).append(
                    $('<a />', { "target" : "_blank", "href": TRAFFIC_MESSAGES_URL + "/" + message.properties.situationId + ".datex2?latest=true" }).text("xml")
            ),
            $('<td/>', {"class": "datex2-col7"}).append(
                    $('<a />', { "target" : "_blank", "href": TRAFFIC_MESSAGES_URL + "/" + message.properties.situationId + "?latest=true" }).text("json")
            ),
            $('<td/>', {"class": "datex2-col8"}).append(
                    $('<a />', { "target" : "_blank", "href": "https://geojson.tools/?url=" + TRAFFIC_MESSAGES_URL + "/" + message.properties.situationId + "?latest=true" }).text("map")
            )
        ])
    )
}

function getLatestDateTimeInterval(announcements) {
  return announcements
    .map(({ roadWorkPhases, timeAndDuration }) => {
      const phasesTimes = roadWorkPhases.map(({ timeAndDuration }) => stringObjectToDateObject(timeAndDuration));
      return (phasesTimes.length === 0) ? stringObjectToDateObject(timeAndDuration) : phasesTimes;
    })
    .flat()
    .reduce((latest, current) => ((latest?.endTime > current?.endTime) ? latest : current), null);
}

function stringObjectToDateObject(o) {
  return Object.keys(o).reduce((res, k) => {
    return { ...res, 
      ...(o[k] !== null && { [k]: new Date(o[k]) })
    }
  },
  {});
}

function getTitle(announcements) {
    for (var ann of announcements) {
        if (ann.title) {
            return ann.title;
        }
    }

    return "-";
}

function loadDatex2() {
  initTable(TYPE_TRAFFIC_ANNOUNCEMENT, "Traffic announcements");
  initTable(TYPE_EXEMPTED_TRANSPORT, "Exempted transports");
  initTable(TYPE_ROAD_WORK, "Road works");
  initTable(TYPE_WEIGHT_RESTRICTION, "Weight restrictions");

  loadContent(TYPE_TRAFFIC_ANNOUNCEMENT);
  loadContent(TYPE_EXEMPTED_TRANSPORT);
  loadContent(TYPE_ROAD_WORK);
  loadContent(TYPE_WEIGHT_RESTRICTION);
}

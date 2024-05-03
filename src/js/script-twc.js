'use strict';

export default function () { /* Dummy export for bundle */ }

// export these functions to global scope and don't tree shake them
globalThis.loadTWC = loadTWC;


const URL_TMS = "https://tie.digitraffic.fi/api/tms/v1/stations/data";
const URL_WEATHER = "https://tie.digitraffic.fi/api/tms/v1/stations/data";
const URL_CAMERA = "https://tie.digitraffic.fi/api/weathercam/v1/stations/data";

const TYPE_TMS = "TMS";
const TYPE_WEATHER = "WEATHER";
const TYPE_CAMERA = "CAMERA";

function initTable(dataType, tableTitle) {
    $("#" + dataType).append([
        $("<colgroup>").append([
            $("<col>", {"class": "twc-col1"}),
            $("<col>", {"class": "twc-col2"}),
            $("<col>", {"class": "twc-col3"}),
            $("<col>", {"class": "twc-col4"})
        ]),
        $("<thead/>").append([
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "twc-col1"}).text(tableTitle),
                $("<th/>", {"class": "twc-col-2-4", "id": "date_" + dataType, "colspan": 3}).text("-")
            ]),
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "twc-col1"}).text("Time"),
                $("<th/>", {"class": "twc-col2"}).text("Amount"),
                $("<th/>", {"class": "twc-col3"}).text("Latest"),
                $("<th/>", {"class": "twc-col4"}).text("Oldest")
            ])
        ]),
        $("<tbody/>").append([
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<td/>", {"class": "twc-col1"}).text("Up-to-date"),
                $("<td/>", {"class": "twc-col2", "id": dataType + "_utd_count"}).text("0"),
                $("<td/>", {"class": "twc-col3", "id": dataType + "_utd_latest"}).text("-"),
                $("<td/>", {"class": "twc-col4", "id": dataType + "_utd_oldest"}).text("-")
            ]),
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<td/>", {"class": "twc-col1"}).text("Older than 30min"),
                $("<td/>", {"class": "twc-col2", "id": dataType + "_o30_count"}).text("0"),
                $("<td/>", {"class": "twc-col3", "id": dataType + "_o30_latest"}).text("-"),
                $("<td/>", {"class": "twc-col4", "id": dataType + "_o30_oldest"}).text("-")
            ]),
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<td/>", {"class": "twc-col1"}).text("Older than 8h"),
                $("<td/>", {"class": "twc-col2", "id": dataType + "_o8h_count"}).text("0"),
                $("<td/>", {"class": "twc-col3", "id": dataType + "_o8h_latest"}).text("-"),
                $("<td/>", {"class": "twc-col4", "id": dataType + "_o8h_oldest"}).text("-")
            ]),
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<td/>", {"class": "twc-col1"}).text("Empty or no updates"),
                $("<td/>", {"class": "twc-col-2-4", "id": dataType + "_empty", "colspan": 3}).text("0")
            ])
        ])
    ]);
};

function loadContent(requestUrl, processResponse) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                processResponse(JSON.parse(this.responseText));
            } catch(e) {
                console.error(e);
            }
        }
    };

    xmlhttp.onerror = function() {
        console.error(this);
    };

    xmlhttp.open("GET", requestUrl, true);
    xmlhttp.send();
};

function process_tms(resp) {
    if (resp) {
        console.log("TMS response:", resp);

        $("#date_" + TYPE_TMS).text("Last update: " + toIsoLocalDate(resp.dataUpdatedTime));

        let time = new Date().getTime();

        for (var item of resp.stations) {
            sort(TYPE_TMS, time, Date.parse(item.dataUpdatedTime));
        }
    }
};

function process_weather(resp) {
    if (resp) {
        console.log("WEATHER response:", resp);

        $("#date_" + TYPE_WEATHER).text("Last update: " + toIsoLocalDate(resp.dataUpdatedTime));

        let time = new Date().getTime();

        for (var item of resp.stations) {
            sort(TYPE_WEATHER, time, Date.parse(item.dataUpdatedTime));
        }
    }
};

function process_camera(resp) {
    if (resp) {
        console.log("CAMERA response:", resp);

        $("#date_" + TYPE_CAMERA).text("Last update: " + toIsoLocalDate(resp.dataUpdatedTime));

        let time = new Date().getTime();

        for (var cstation of resp.stations) {
            for (var item of cstation.presets) {
                sort(TYPE_CAMERA, time, Date.parse(item.measuredTime));
            }
        }
    }
};

function sort(type, time, measured) {
    if (measured > 0) {
        if (time - measured < 1800000) {
            updateCount(type + "_utd_count");
            updateDate(type + "_utd_", measured);
        } else if (time - measured < 28800000) {
            updateCount(type + "_o30_count");
            updateDate(type + "_o30_", measured);
        } else {
            updateCount(type + "_o8h_count");
            updateDate(type + "_o8h_", measured);
        }
    } else {
        updateCount(type + "_empty");
    }
};

function updateCount(field) {
    var tmp = $("#" + field);

    tmp.text(parseInt(tmp.text()) + 1);
};

function updateDate(field, measured) {
    var latest = $("#" + field + "latest");

    if (latest.text() == "-" || measured > Date.parse(latest.text())) {
        latest.text(toIsoLocalDate(new Date(measured)));
    }

    var oldest = $("#" + field + "oldest");

    if (oldest.text() == "-" || measured < Date.parse(oldest.text())) {
        oldest.text(toIsoLocalDate(measured));
    }
};

export function loadTWC() {
    initTable(TYPE_TMS, "TMS stations data");
    initTable(TYPE_WEATHER, "Weather stations data");
    initTable(TYPE_CAMERA, "Weathercam stations presets");

    loadContent(URL_TMS, process_tms);
    loadContent(URL_WEATHER, process_weather);
    loadContent(URL_CAMERA, process_camera);
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const TRAFFIC_MESSAGES_URL = "https://tie.digitraffic.fi/api/traffic-message/v1/messages";
const TRAFFIC_MESSAGES_DATEX2_URL = "https://tie.digitraffic.fi/api/traffic-message/v1/messages.datex2";
const TYPE_EXEMPTED_TRANSPORT = "EXEMPTED_TRANSPORT";
const TYPE_ROAD_WORK = "ROAD_WORK";
const TYPE_TRAFFIC_ANNOUNCEMENT = "TRAFFIC_ANNOUNCEMENT";
const TYPE_WEIGHT_RESTRICTION = "WEIGHT_RESTRICTION";
function initTable(datexType, tableTitle) {
    $("#" + datexType).append([
        $("<colgroup>").append([
            $("<col>", { class: "datex2-col1" }),
            $("<col>", { class: "datex2-col2" }),
            $("<col>", { class: "datex2-col3" }),
            $("<col>", { class: "datex2-col4" }),
            $("<col>", { class: "datex2-col5" }),
            $("<col>", { class: "datex2-col6" }),
            $("<col>", { class: "datex2-col7" }),
            $("<col>", { class: "datex2-col8" })
        ]),
        $("<thead/>").append([
            $("<tr/>", { class: "row.nowrap" }).append([
                $("<th/>", { class: "datex2-col-1-2", colspan: 2 }).text(tableTitle),
                $("<th/>", { class: "datex2-col-3-8", id: "date_" + datexType, colspan: 6 }).text("-")
            ]),
            $("<tr/>", { class: "row.nowrap" }).append([
                $("<th/>", { class: "datex2-col1" }).text("GUID"),
                $("<th/>", { class: "datex2-col2" }).text("Ver"),
                $("<th/>", { class: "datex2-col3" }).text("Start"),
                $("<th/>", { class: "datex2-col4" }).text("End / Open"),
                $("<th/>", { class: "datex2-col5" }).text("Title"),
                $("<th/>", { class: "datex2-col6" }).text("Xml"),
                $("<th/>", { class: "datex2-col7" }).text("Json"),
                $("<th/>", { class: "datex2-col8" }).text("Map")
            ])
        ]),
        $("<tbody/>")
    ]);
}
function loadContent(requestType) {
    return __awaiter(this, void 0, void 0, function* () {
        console.info("Load traffic messages of type", requestType);
        const response = yield fetch(`${TRAFFIC_MESSAGES_URL}?situationType=${requestType}`);
        const data = yield response.json();
        processResponse(data, requestType);
    });
}
function processResponse(resp, requestType) {
    if (resp) {
        console.log("Response:", resp);
        $("#date_" + requestType).text("Updated: " + toLocalDate(resp.dataUpdatedTime) + " / " + resp.features.length + " pcs");
        const features = resp.features.map(calculateDaysOpen);
        const sortAlgorithm = getSortAlgorithm();
        const sorted = features.sort(sortAlgorithm);
        for (const feature of sorted) {
            addMessage(requestType, feature);
        }
    }
}
function addMessage(clazz, message) {
    let warn = "";
    let start = "-";
    let end = "-";
    const startDateTime = getStartDateTime(message.properties.announcements);
    const endDateTime = getEndDateTime(message.properties.announcements);
    if (startDateTime) {
        start = startDateTime.toISOString();
        if (endDateTime) {
            end = endDateTime.toISOString();
            let days = Math.round((endDateTime.getTime() - startDateTime.getTime()) / 86400000);
            end = end + " (" + days + " days)";
            if (endDateTime.getTime() < new Date().getTime()) {
                warn = " warn";
            }
        }
        else {
            let days = Math.round((new Date().getTime() - startDateTime.getTime()) / 86400000);
            end = "(" + days + " days)";
            if (days > 14) {
                warn = " warn";
            }
        }
    }
    $("#" + clazz + " > tbody:last-child").append($("<tr/>", { class: "row.nowrap" + warn }).append([
        $("<td/>", { class: "datex2-col1" }).text(message.properties.situationId),
        $("<td/>", { class: "datex2-col2" }).text(message.properties.version),
        $("<td/>", { class: "datex2-col3" }).text(start),
        $("<td/>", { class: "datex2-col4" + warn }).text(end),
        $("<td/>", { class: "datex2-col5" }).text(getTitle(message.properties.announcements)),
        $("<td/>", { class: "datex2-col6" }).append($("<a />", {
            target: "_blank",
            href: TRAFFIC_MESSAGES_URL + "/" + message.properties.situationId + ".datex2?latest=true"
        }).text("xml")),
        $("<td/>", { class: "datex2-col7" }).append($("<a />", {
            target: "_blank",
            href: TRAFFIC_MESSAGES_URL + "/" + message.properties.situationId + "?latest=true"
        }).text("json")),
        $("<td/>", { class: "datex2-col8" }).append($("<a />", {
            target: "_blank",
            href: "https://geojson.tools/?url=" +
                TRAFFIC_MESSAGES_URL +
                "/" +
                message.properties.situationId +
                "?latest=true"
        }).text("map"))
    ]));
}
function calculateDaysOpen(feature) {
    const startDateTime = getStartDateTime(feature.properties.announcements);
    const endDateTime = getEndDateTime(feature.properties.announcements);
    if (startDateTime) {
        const start = startDateTime.toISOString();
        if (endDateTime) {
            const end = endDateTime.toISOString();
            feature.properties.daysOpen = Math.round((endDateTime.getTime() - startDateTime.getTime()) / 86400000);
        }
        else {
            feature.properties.daysOpen = Math.round((new Date().getTime() - startDateTime.getTime()) / 86400000);
        }
    }
    return feature;
}
function sortBy(fn, reverse = false) {
    const shouldReverse = reverse ? -1 : 1;
    return (a, b) => {
        const daysA = fn(a);
        const daysB = fn(b);
        return (daysA > daysB ? 1 : -1) * shouldReverse;
    };
}
function getSortAlgorithm() {
    const urlParams = new URLSearchParams(window.location.search);
    const sort = urlParams.get("sort");
    if (sort === "days") {
        return sortBy((f) => f.properties.daysOpen, true);
    }
    return sortBy((f) => getStartDateTime(f.properties.announcements).valueOf());
}
function getStartDateTime(anouncements) {
    const times = anouncements
        .filter((a) => a.timeAndDuration && a.timeAndDuration.startTime)
        .map((a) => new Date(a.timeAndDuration.startTime).getTime());
    if (times.length > 0) {
        return new Date(Math.min(...times));
    }
    return null;
}
function getEndDateTime(anouncements) {
    const times = anouncements
        .filter((a) => a.timeAndDuration && a.timeAndDuration.endTime)
        .map((a) => new Date(a.timeAndDuration.endTime).getTime());
    if (times.length > 0) {
        return new Date(Math.max(...times));
    }
    return null;
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
    return __awaiter(this, void 0, void 0, function* () {
        initTable(TYPE_TRAFFIC_ANNOUNCEMENT, "Traffic announcements");
        initTable(TYPE_EXEMPTED_TRANSPORT, "Exempted transports");
        initTable(TYPE_ROAD_WORK, "Road works");
        initTable(TYPE_WEIGHT_RESTRICTION, "Weight restrictions");
        const promises = yield Promise.allSettled([
            loadContent(TYPE_TRAFFIC_ANNOUNCEMENT),
            loadContent(TYPE_EXEMPTED_TRANSPORT),
            loadContent(TYPE_ROAD_WORK),
            loadContent(TYPE_WEIGHT_RESTRICTION)
        ]);
        promises.forEach((promise) => {
            if (promise.status === "rejected") {
                console.error(promise.reason);
            }
        });
    });
}

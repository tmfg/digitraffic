'use strict';

const URL = {
    MARINE: "https://meri.digitraffic.fi/swagger/openapi.json",
    RAIL: "https://rata.digitraffic.fi/swagger/openapi.json",
    ROAD: "https://tie.digitraffic.fi/swagger/openapi.json"
};

const translations = {
    en: {
        api: "API",
        deprecationsHeader: "Deprecated APIs",
        deprecationsText: "An API is considered deprecated once a new version of it is released. Deprecated APIs will be available for a period of 6 months after the release of a new version. However, deprecated APIs are not recommended for use, and users should move to a supported version instead.",
        marine: "Marine",
        rail: "Rail",
        road: "Road",
        sunset: "Sunset date",
        supportedHeader: "Supported APIs",
        trafficType: "Traffic type"
    },
    fi: {
        api: "Rajapinta",
        deprecationsHeader: "Vanhentuneet rajapinnat",
        deprecationsText: "Rajapinta katsotaan vanhentuneeksi, kun siitä julkaistaan uusi versio. Vanhentunut rajapinta on saatavilla 6kk ajan uuden version julkaisusta, mutta sitä ei suositella käytettäväksi, vaan käyttäjien tulisi siirtyä tuettuun versioon.",
        marine: "Meri",
        rail: "Rata",
        road: "Tie",
        sunset: "Poistuu",
        supportedHeader: "Tuetut rajapinnat",
        trafficType: "Liikennemuoto"
    }
};

const removalTextMatcher = /(?:W|w)ill be removed/
const sunsetDateMatcher = RegExp(`(${removalTextMatcher.source})\.+(?<sunsetDate>\\d{4}-\\d{2}-\\d{2})`);

function initDeprecationsTable(trafficType, tableTitle, language) {
    $("#" + trafficType + "-DEPRECATIONS").append([
        $("<colgroup>").append([
            $("<col>", {"class": "api-changes-col"}),
            $("<col>", {"class": "api-changes-col"})
        ]),
        $("<thead/>").append([
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "api-changes-col", "colspan": 2}).text(tableTitle)
            ]),
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "api-changes-col"}).text(translations[language].api),
                $("<th/>", {"class": "deprecations-col2"}).text(translations[language].sunset),
            ])
        ]),
        $("<tbody/>")
    ]);
}

function initSupportedTable(trafficType, tableTitle) {
    $("#" + trafficType + "-SUPPORTED").append([
        $("<colgroup>").append([
            $("<col>", {"class": "api-changes-col"})
        ]),
        $("<thead/>").append([
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "api-changes-col"}).text(tableTitle)
            ])
        ]),
        $("<tbody/>")
    ]);
}

function loadApiDescription(trafficType) {
    return new Promise(function (resolve, reject) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", URL[trafficType], true);
        xmlhttp.onload = function () {
            if (xmlhttp.status == 200) {
                resolve(xmlhttp.response);
            } else {
                reject(xmlhttp.status);
            }
        }
        xmlhttp.send();
    })
}

function populateDeprecations(apiDescription, trafficType) {
    const deprecatedPaths = Object.keys(apiDescription.paths)
        .filter(path => apiDescription.paths[path].get.deprecated === true || removalTextMatcher.test(apiDescription.paths[path].get.summary))
        .map(path => {
            const match = apiDescription.paths[path].get.summary.match(sunsetDateMatcher);
            const sunset = match !== null ? match.groups.sunsetDate : "TBD";
            const dateClass = sunset !== "TBD" ? getSunsetDateClass(sunset) : "";
            return {
                path,
                sunset,
                dateClass
            }
        });

    const allSortedPaths = deprecatedPaths
        .filter(path => path.sunset !== "TBD")
        .sort((a, b) => new Date(a.sunset) - new Date(b.sunset))
        .concat(deprecatedPaths.filter(path => path.sunset === "TBD"));

    if (allSortedPaths.length > 0) {
        allSortedPaths.forEach(path => addToDeprecationsTable(path, trafficType));
    } else {
        removeEmptyDeprecationsTable(trafficType);
    }
}

function getSunsetDateClass(isoLocalDateString) {
    const weekInMilliSeconds = 1000 * 60 * 60 * 24 * 7;
    const comparisonDate = new Date(isoLocalDateString);
    const differenceInWeeks = (comparisonDate - new Date()) / weekInMilliSeconds;

    if (differenceInWeeks <= 4) {
        return "deprecations-sunset-alert";
    } else if (differenceInWeeks <= 12) {
        return "deprecations-sunset-warning"
    } else return "";
}

function populateSupported(apiDescription, trafficType) {
    Object.keys(apiDescription.paths)
        .filter(path => apiDescription.paths[path].get.deprecated !== true && !removalTextMatcher.test(apiDescription.paths[path].get.summary))
        .forEach(path => addToSupportedTable(path, trafficType));
}


function addToDeprecationsTable(api, trafficType) {
    $('#' + trafficType + '-DEPRECATIONS > tbody:last-child').append(
        $('<tr/>', {"class": "row.nowrap"}).append([
            $('<td/>', {"class": "deprecations-col1"}).text(api.path),
            $('<td/>', {"class": `deprecations-col2 ${api.dateClass}`}).text(api.sunset)
        ])
    );
}

function addToSupportedTable(path, trafficType) {
    $('#' + trafficType + '-SUPPORTED > tbody:last-child').append(
        $('<tr/>', {"class": "row.nowrap"}).append([
            $('<td/>', {"class": "supported-col"}).text(path)
        ])
    );
}

function addHeadersAndText(language) {
    $('#DEPRECATIONS-HEADER').append(
        $('<h3 />').text(translations[language].deprecationsHeader)
    );
    $('#SUPPORTED-HEADER').append(
        $('<h3 />').text(translations[language].supportedHeader)
    );
    $('#DEPRECATIONS-TEXT').append(
        $('<p />').text(translations[language].deprecationsText)
    );
}

function removeEmptyDeprecationsTable(trafficType) {
    $('#' + trafficType).remove();
    $('#' + trafficType + "-DEPRECATIONS-DIV").remove();
}

async function loadApiChanges(language) {
    addHeadersAndText(language);

    initDeprecationsTable("MARINE", translations[language].marine.toUpperCase(), language);
    initDeprecationsTable("RAIL", translations[language].rail.toUpperCase(), language);
    initDeprecationsTable("ROAD", translations[language].road.toUpperCase(), language);

    initSupportedTable("MARINE", translations[language].marine.toUpperCase(), language);
    initSupportedTable("RAIL", translations[language].rail.toUpperCase(), language);
    initSupportedTable("ROAD", translations[language].road.toUpperCase(), language);

    const marineApi = await loadApiDescription("MARINE");
    const railApi = await loadApiDescription("RAIL");
    const roadApi = await loadApiDescription("ROAD");

    populateDeprecations(JSON.parse(marineApi), "MARINE");
    populateDeprecations(JSON.parse(railApi), "RAIL");
    populateDeprecations(JSON.parse(roadApi), "ROAD");

    populateSupported(JSON.parse(marineApi), "MARINE");
    populateSupported(JSON.parse(railApi), "RAIL");
    populateSupported(JSON.parse(roadApi), "ROAD");
}

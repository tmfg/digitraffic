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
        marine: "Marine",
        rail: "Rail",
        road: "Road",
        sunset: "Sunset date",
        supportedHeader: "Supported APIs",
        trafficType: "Traffic type"
    },
    fi: {
        api: "Rajapinta",
        deprecationsHeader: "Deprekoidut rajapinnat",
        marine: "Meri",
        rail: "Rata",
        road: "Tie",
        sunset: "Sunset-pvm",
        supportedHeader: "Tuetut rajapinnat",
        trafficType: "Liikennemuoto"
    }
};

const removalTextMatcher = /(?:W|w)ill be removed/
const sunsetDateMatcher = RegExp(`(${removalTextMatcher.source})\.+(\\d{4}-\\d{2}-\\d{2})`);

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

function initSupportedTable(trafficType, tableTitle, language) {
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
        .map(deprecatedPath => {
            const extractedDate = apiDescription.paths[deprecatedPath].get.summary.match(sunsetDateMatcher);
            const sunsetDate = extractedDate !== null ? extractedDate[2] : "TBD";
            return {
                path: deprecatedPath,
                sunset: sunsetDate
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

function populateSupported(apiDescription, trafficType) {
    Object.keys(apiDescription.paths)
        .filter(path => apiDescription.paths[path].get.deprecated !== true && !removalTextMatcher.test(apiDescription.paths[path].get.summary))
        .forEach(path => addToSupportedTable(path, trafficType));
}


function addToDeprecationsTable(api, trafficType) {
    $('#' + trafficType + '-DEPRECATIONS > tbody:last-child').append(
        $('<tr/>', {"class": "row.nowrap"}).append([
            $('<td/>', {"class": "deprecations-col1"}).text(api.path),
            $('<td/>', {"class": "deprecations-col2"}).text(api.sunset)
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

function addHeaders(language) {
    $('#DEPRECATIONS-HEADER').append(
        $('<h3 />').text(translations[language].deprecationsHeader)
    );
    $('#SUPPORTED-HEADER').append(
        $('<h3 />').text(translations[language].supportedHeader)
    );
}

function removeEmptyDeprecationsTable(trafficType) {
    $('#' + trafficType).remove();
    $('#' + trafficType + "-DEPRECATIONS-DIV").remove();
}

async function loadApiChanges(language) {
    addHeaders(language);

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

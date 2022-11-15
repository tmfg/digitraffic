'use strict';

const URL = {
    MARINE: "https://meri.digitraffic.fi/swagger/openapi.json",
    RAIL: "https://rata.digitraffic.fi/swagger/openapi.json",
    ROAD: "https://tie.digitraffic.fi/swagger/openapi.json",
    MARINE_UI: "https://meri.digitraffic.fi/swagger/#",
    RAIL_UI: "https://rata.digitraffic.fi/swagger/#",
    ROAD_UI: "https://tie.digitraffic.fi/swagger/#"
};

const translations = {
    en: {
        api: "API",
        colorDescriptionsAlert: "Sunset in less than 4 weeks",
        colorDescriptionsWarning: "Sunset in less than 12 weeks",
        colorDescriptionsHeader: "Sunset date color coding:",
        deprecationsHeader: "Deprecated APIs",
        deprecationsText: "An API is considered deprecated once a new version of it is released. Deprecated APIs will be available for a period of 6 months after the release of a new version. However, deprecated APIs are not recommended for use, and users should move to a supported version instead. Sunset date marks the point in time after which the API in question will not be available anymore.\n\nThe API paths below contain links to their respective Swagger descriptions.",
        marine: "Marine",
        rail: "Rail",
        road: "Road",
        sunset: "Sunset date",
        supportedHeader: "Supported APIs",
        trafficType: "Traffic type"
    },
    fi: {
        api: "Rajapinta",
        colorDescriptionsAlert: "Poistumassa alle 4vk päästä",
        colorDescriptionsWarning: "Poistumassa alle 12vk päästä",
        colorDescriptionsHeader: "Poistumispäivämäärien värikoodaukset:",
        deprecationsHeader: "Vanhentuneet rajapinnat",
        deprecationsText: "Rajapinta katsotaan vanhentuneeksi, kun siitä julkaistaan uusi versio. Vanhentunut rajapinta on saatavilla 6kk ajan uuden version julkaisusta, mutta sitä ei suositella käytettäväksi, vaan käyttäjien tulisi siirtyä tuettuun versioon. Poistumispäivämäärä on ajankohta, minkä jälkeen kyseinen rajapinta ei lähtökohtaisesti enää ole saatavilla.\n\nAllaolevista rajapintojen poluista on linkki kunkin Swagger-kuvaukseen.",
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
            $("<col>", {"class": "deprecations-col1"}),
            $("<col>", {"class": "deprecations-col2"})
        ]),
        $("<thead/>").append([
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "api-changes-header", "colspan": 2}).text(tableTitle)
            ]),
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "api-changes-header"}).text(translations[language].api),
                $("<th/>", {"class": "deprecations-col2"}).text(translations[language].sunset),
            ])
        ]),
        $("<tbody/>")
    ]);
}

function initSupportedTable(trafficType, tableTitle) {
    $("#" + trafficType + "-SUPPORTED").append([
        $("<colgroup>").append([
            $("<col>", {"class": "supported-col"})
        ]),
        $("<thead/>").append([
            $("<tr/>", {"class": "row.nowrap"}).append([
                $("<th/>", {"class": "api-changes-header"}).text(tableTitle)
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

function getSwaggerLink(swaggerPath, trafficType) {
    return `${URL[`${trafficType}_UI`]}/${swaggerPath.tags[0]}/${swaggerPath.operationId}`;
}

function populateDeprecations(apiDescription, trafficType) {
    const deprecatedPaths = Object.keys(apiDescription.paths)
        .filter(path => apiDescription.paths[path].get.deprecated === true || removalTextMatcher.test(apiDescription.paths[path].get.summary))
        .map(path => {
            const match = apiDescription.paths[path].get.summary.match(sunsetDateMatcher);
            const sunset = match !== null ? match.groups.sunsetDate : "TBD";
            const dateClass = sunset !== "TBD" ? getSunsetDateClass(sunset) : "";
            const swaggerLink = getSwaggerLink(apiDescription.paths[path].get, trafficType);
            return {
                path,
                sunset,
                dateClass,
                swaggerLink
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
        .forEach(path => addToSupportedTable({path, swaggerLink: getSwaggerLink(apiDescription.paths[path].get, trafficType)}, trafficType));
}


function addToDeprecationsTable(api, trafficType) {
    $('#' + trafficType + '-DEPRECATIONS > tbody:last-child').append(
        $('<tr/>', {"class": "row.nowrap"}).append([
            $('<td/>', {"class": "deprecations-col1"}).append(
                $('<a/>', {"href": api.swaggerLink}).text(api.path)
            ),
            $('<td/>', {"class": `deprecations-col2 ${api.dateClass}`}).text(api.sunset)
        ])
    );
}

function addToSupportedTable(api, trafficType) {
    $('#' + trafficType + '-SUPPORTED > tbody:last-child').append(
        $('<tr/>', {"class": "row.nowrap"}).append([
            $('<td/>', {"class": "supported-col"}).append(
                $('<a/>', {"href": api.swaggerLink}).text(api.path)
            )
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
    $('#DEPRECATIONS-TEXT').append([
        $('<p />', {"class": "deprecations-text-paragraph"}).text(translations[language].deprecationsText),
        $('<div />', {"class": "date-color-descriptions"}).append([
            $('<p />', {"class": "date-color-descriptions-header"}).text(`${translations[language].colorDescriptionsHeader}`),
            $('<p />', {"class": "date-color-descriptions-paragraph"}).append([
                $('<span />', {"class": "date-alert-description"}).text("YYYY-MM-DD"),
                $('<span />').html(`&nbsp;  ${translations[language].colorDescriptionsAlert}`)
            ]),
            $('<p />', {"class": "date-color-descriptions-paragraph"}).append([
                $('<span />', {"class": "date-warning-description"}).text("YYYY-MM-DD"),
                $('<span />').html(`&nbsp;  ${translations[language].colorDescriptionsWarning}`)
            ])
        ])
    ]);
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

    const marineApi = await loadApiDescription("MARINE").then(function (response) {
        return JSON.parse(response)
    });
    const railApi = await loadApiDescription("RAIL").then(function (response) {
        return JSON.parse(response)
    });
    const roadApi = await loadApiDescription("ROAD").then(function (response) {
        return JSON.parse(response)
    });

    populateDeprecations(marineApi, "MARINE");
    populateDeprecations(railApi, "RAIL");
    populateDeprecations(roadApi, "ROAD");

    populateSupported(marineApi, "MARINE");
    populateSupported(railApi, "RAIL");
    populateSupported(roadApi, "ROAD");
}

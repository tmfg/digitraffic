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
const cStateStatusString = { OK: "ok", DISRUPTED: "disrupted", DOWN: "down" };
const serviceChildComponentHealthThreshold = 50;
const statusUnderMaintenance = "under_maintenance";
const maintenanceRegExp = /^maintenance.+$/;
function loadApiStatuses(language) {
    return __awaiter(this, void 0, void 0, function* () {
        // Add menu event listeners
        addApiStatusTabLinksEventListeners();
        // If Service status section exists, get service status
        if (document.getElementById("service-status-section")) {
            yield getServiceStatus("https://status.digitraffic.fi", language);
        }
    });
}
/* Add event listeners for status links */
function addApiStatusTabLinksEventListeners() {
    const tabLinks = document.getElementsByClassName("tab-link");
    Array.prototype.forEach.call(tabLinks, function (link) {
        link.addEventListener("click", (event) => openTab(link.href.substring(link.href.lastIndexOf("#") + 1), event));
    });
}
function getServiceStatus(baseUrl, language) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = (yield getJson(baseUrl + "/index.json"));
        // if a maintenance notice with a past date is found in pinned issues, it is considered a currently active maintenance break
        const activeMaintenances = index.pinnedIssues.filter(isActiveMaintenance);
        // Set service/category status
        updateServiceStatus(language, index, activeMaintenances);
        // Add ongoing maintenances to page
        if (document.getElementById("service-status-ongoing-maintenance-list")) {
            yield updateActiveMaintenancesList("service-status-ongoing-maintenance-list", activeMaintenances);
        }
        // Add upcoming maintenances to page
        if (document.getElementById("service-status-upcoming-maintenance-list")) {
            yield updateUpcomingMaintenancesAndOtherIssuesList(language, "service-status-upcoming-maintenance-list", index);
        }
        // Show ongoing maintenances and issues on front page
        if (document.getElementById("service-status-active-incidents-short")) {
            updateActiveMaintenancesAndIncidentsOnFrontPage("service-status-active-incidents-short", activeMaintenances, index.systems);
        }
        // Get current and past service incidents from api
        const allIssues = (yield getJson(baseUrl + "/issues/index.json"));
        if (document.getElementById("service-status-incident-list")) {
            yield updateServiceStatusList(language, allIssues.pages);
        }
        // Update service status every 60 seconds
        setTimeout(getServiceStatus, 60000, baseUrl, language);
    });
}
function updateServiceStatus(language, index, activeMaintenances) {
    const categories = index.categories.map((category) => category.name);
    categories.forEach((category) => {
        const systems = getSystemsForCategory(index, category);
        if (systemsUnderMaintenance(systems, activeMaintenances)) {
            addOperationStatus(category.toLowerCase(), statusUnderMaintenance, language);
        }
        else if (systemsDownOrDisrupted(systems)) {
            const systemHealthPercentage = getSystemHealthPercentage(systems);
            if (systemHealthPercentage > serviceChildComponentHealthThreshold) {
                addOperationStatus(category.toLowerCase(), cStateStatusString.DISRUPTED, language);
            }
            else {
                addOperationStatus(category.toLowerCase(), cStateStatusString.DOWN, language);
            }
        }
        else {
            addOperationStatus(category.toLowerCase(), cStateStatusString.OK, language);
        }
    });
}
function updateServiceStatusList(language, issues) {
    return __awaiter(this, void 0, void 0, function* () {
        const statusList = document.getElementById("service-status-incident-list"); //ul
        // Get a reference to the template li and remove it from dom
        const templateItem = statusList.firstElementChild;
        while (statusList.firstChild) {
            statusList.removeChild(statusList.firstChild);
        }
        // Limit to 7 days                      day hour  min  sec  msec
        const limitTimestamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
        const displayableIncidents = issues
            .filter((issue) => (limitTimestamp < new Date(issue.resolvedAt).getTime() || !issue.resolved) &&
            !issue.informational)
            .sort(issuesByDate());
        // Add list of service status incidents to incident list
        if (displayableIncidents.length > 0) {
            for (const issue of displayableIncidents) {
                const issueWithBody = (yield getJson(issue.permalink + "index.json"));
                addIncidentDetailedList(issue.createdAt, issue.title, issueWithBody.body, issue.permalink, statusList, templateItem);
            }
        }
        else {
            addIncidentDetailedList(null, t.statusNoIncidents[language], null, null, statusList, templateItem);
        }
    });
}
function updateActiveMaintenancesList(elementId, activeMaintenances) {
    return __awaiter(this, void 0, void 0, function* () {
        const statusList = document.getElementById(elementId);
        // Get a reference to the template li and remove it from dom
        const templateItem = statusList.firstElementChild;
        while (statusList.firstChild) {
            statusList.removeChild(statusList.firstChild);
        }
        // Add active maintenances to list of ongoing maintenances
        for (const issue of activeMaintenances) {
            const issueWithBody = (yield getJson(issue.permalink + "index.json"));
            addIncidentDetailedList(issue.createdAt, issue.title, issueWithBody.body, issue.permalink, statusList, templateItem);
        }
    });
}
function updateUpcomingMaintenancesAndOtherIssuesList(language, elementId, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const statusList = document.getElementById(elementId);
        // Get a reference to the template li and remove it from dom
        const templateItem = statusList.firstElementChild;
        while (statusList.firstChild) {
            statusList.removeChild(statusList.firstChild);
        }
        const displayableIssues = index.pinnedIssues.filter((issue) => !isActiveMaintenance(issue));
        if (displayableIssues.length > 0) {
            // Add to list upcoming maintenances and other informational issues
            for (const issue of displayableIssues) {
                const issueWithBody = (yield getJson(issue.permalink + "index.json"));
                addIncidentDetailedList(issue.createdAt, issue.title, issueWithBody.body, issue.permalink, statusList, templateItem);
            }
        }
        else {
            addIncidentDetailedList(null, t.statusNoUpcomingIssues[language], null, null, statusList, templateItem);
        }
    });
}
function updateActiveMaintenancesAndIncidentsOnFrontPage(elementId, activeMaintenances, systems) {
    const statusList = document.getElementById(elementId);
    const unresolvedIncidents = systems.reduce((acc, curr) => {
        return acc.concat(curr.unresolvedIssues.filter(
        // filter duplicates, they exist if one issue affects multiple components
        (issue) => !acc.find((addedIssue) => addedIssue.filename === issue.filename)));
    }, []);
    // active incidents and maintenances are displayable issues
    const displayableIssues = activeMaintenances.concat(unresolvedIncidents).sort(issuesByDate());
    // Get a reference to the template li and remove it from dom
    const templateItem = statusList.firstElementChild;
    while (statusList.firstChild) {
        statusList.removeChild(statusList.firstChild);
    }
    // Take only first three to show on front page
    const first3 = displayableIssues.slice(0, 3);
    if (first3.length > 0) {
        first3.forEach((issue) => addIncidentFrontPageList(issue.createdAt, issue.title, issue.permalink, statusList, templateItem));
    }
    else {
        // empty placeholder
        addIncidentFrontPageList(null, null, null, statusList, templateItem);
    }
}
function addOperationStatus(service, status, language) {
    // Elements
    const classes = document.getElementById(`service-status-circle-${service}`).classList;
    const statusText = document.getElementById(`service-status-text-${service}`);
    // Clean previous status
    classes.remove(`service-status__icon-circle-bottom--operational__${service}`, "service-status__icon-circle-bottom--partial-outage", "service-status__icon-circle-bottom--major-outage");
    // Update status
    if (status === cStateStatusString.OK) {
        classes.add(`service-status__icon-circle-bottom--operational__${service}`);
        statusText.textContent = t.statusOperational[language];
        statusText.classList.remove("service-status__service-text--loading");
    }
    else if (status === statusUnderMaintenance) {
        classes.add("service-status__icon-circle-bottom--under-maintenance");
        statusText.textContent = t.statusUnderMaintenance[language];
        statusText.classList.remove("service-status__service-text--loading");
    }
    else if (status === cStateStatusString.DISRUPTED) {
        classes.add("service-status__icon-circle-bottom--partial-outage");
        statusText.textContent = t.statusPartialOutage[language];
        statusText.classList.remove("service-status__service-text--loading");
    }
    else if (status === cStateStatusString.DOWN) {
        classes.add("service-status__icon-circle-bottom--major-outage");
        statusText.textContent = t.statusMajorOutage[language];
        statusText.classList.remove("service-status__service-text--loading");
    }
    else {
        statusText.textContent = t.loadingError[language];
        statusText.classList.add("service-status__service-text--loading");
    }
}
function addIncidentDetailedList(isoDateTime, name, message, link, statusList, templateItem) {
    const newItem = templateItem.cloneNode(true);
    if (isoDateTime) {
        newItem.innerHTML =
            '<h3 class="h3 latest-item__header-text"><a href="' +
                link +
                '" class="latest-item__header-link">' +
                name +
                "</a></h3>" +
                '<div class="latest-item__meta-first"><span class="latest-item__traffic-type"><i class="material-icons md-md date-type-tags__date-icon">create</i>' +
                getTimeStringFromIsoString(isoDateTime) +
                "</span></div>" +
                (message ? "<pre>" + message + "</pre>" : "");
    }
    else {
        newItem.innerHTML = "<p>" + name + "</p>";
    }
    statusList.appendChild(newItem);
}
function addIncidentFrontPageList(scheduledFor, name, link, statusList, templateItem) {
    const newItem = templateItem.cloneNode(true);
    if (scheduledFor) {
        newItem.innerHTML =
            '<h4 class="h4 latest-item__header-text"><a href="' +
                link +
                '" class="latest-item__header-link">' +
                name +
                "</a></h4>" +
                '<div class="latest-item__meta-first"><span class="latest-item__traffic-type"><i class="material-icons md-md date-type-tags__date-icon">create</i>' +
                getTimeStringFromIsoString(scheduledFor) +
                "</span></div>";
    }
    else {
        newItem.innerHTML =
            '<h4 class="h4 latest-item__header-text">&nbsp;</h4>' +
                '<div class="latest-item__meta-first">&nbsp;<span class="latest-item__traffic-type"></span></div>';
    }
    statusList.appendChild(newItem);
}
function getTimeStringFromIsoString(dateTime) {
    const asDate = new Date(dateTime);
    const scheduledForDateString = asDate.getDate() +
        "." +
        (asDate.getMonth() + 1) +
        "." +
        asDate.getFullYear() +
        " " +
        ("0" + asDate.getHours()).slice(-2) +
        ":" +
        ("0" + asDate.getMinutes()).slice(-2);
    return scheduledForDateString;
}
function openTab(tabId, event) {
    event.preventDefault(); // dont execute link href
    const x = document.getElementsByClassName("closeable-tab");
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tab-link-active", "");
    }
    event.currentTarget.className += " tab-link-active";
    return false;
}
function getJson(url) {
    return new Promise(function (resolve, reject) {
        const req = new XMLHttpRequest();
        req.responseType = "json";
        req.onload = function () {
            const status = req.status;
            if (status == 200) {
                resolve(req.response);
            }
            else {
                reject(status);
            }
        };
        req.open("GET", url, true);
        req.send();
    });
}
function serviceIsHealthy(serviceStatus) {
    return serviceStatus.toLowerCase() === cStateStatusString.OK;
}
function systemsUnderMaintenance(systems, activeMaintenances) {
    return !!activeMaintenances.find((maintenance) => !!systems.find((system) => maintenance.affected.includes(system.name)));
}
function systemsDownOrDisrupted(systems) {
    return !!systems.find((system) => system.unresolvedIssues.find((issue) => issue.severity === cStateStatusString.DOWN || issue.severity === cStateStatusString.DISRUPTED));
}
function getSystemsForCategory(index, categoryName) {
    return index.systems.filter((system) => system.category === categoryName);
}
function getSystemHealthPercentage(systems) {
    const healthyComponents = systems.filter((c) => serviceIsHealthy(c.status));
    return Math.ceil((healthyComponents.length / systems.length) * 100);
}
function issuesByDate() {
    return (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt);
}
function isActiveMaintenance(issue) {
    // the cState field createdAt is the intended time of the maintenance
    return Date.parse(issue.createdAt) <= Date.now() && maintenanceRegExp.test(issue.filename);
}

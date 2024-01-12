'use strict';

async function loadApiStatuses(language) {
    // Add menu event listeners
    addApiStatusTabLinksEventListeners();
    //https://stunning-adventure-o4r7k51.pages.github.io/index.json
    //https://localhost:1313
    // If Service status section exists, get service status
    if (document.getElementById("service-status-section")) {
        await getServiceStatus("https://solita-ijunnone.github.io/cstate-test", language);
    }
}


/* Add event listeners for status links */
function addApiStatusTabLinksEventListeners() {

    let tabLinks = document.getElementsByClassName('tab-link');
    Array.prototype.forEach.call(tabLinks, function (link) {
        link.addEventListener('click',
            (ev) => openTab(link.href.substring(link.href.lastIndexOf('#') + 1), ev))
    });
}


const componentGroups = ['road', 'marine', 'rail'];
const serviceChildComponentHealthThreshold = 50;
const statusOperational = 'operational';
const statusUnderMaintenance = 'under_maintenance';
const statusPartialOutage = 'partial_outage';
const statusMajorOutage = 'major_outage';

function serviceIsHealthy(serviceStatus) {
    return serviceStatus.toLowerCase() === statusOperational;
}

function serviceIsUnderMaintenance(serviceStatus) {
    return serviceStatus.toLowerCase() === statusUnderMaintenance;
}

function getChildComponentHealthPercentage(service, allComponents) {
    const childComponents = allComponents.filter(c => service.components.includes(c.id));
    const healthyComponents = childComponents.filter(c => serviceIsHealthy(c.status));
    return Math.ceil(healthyComponents.length / childComponents.length * 100);
}

function updateServiceStatus(language, evt) {
    // Add updated service status info to each service
    const components = JSON.parse(evt.target.responseText).components;
    components.filter(c => componentGroups.includes(c.name.toLowerCase())).forEach(service => {
        if (serviceIsHealthy(service.status)) {
            addOperationStatus(service.name.toLowerCase(), statusOperational, language);
        } else if (serviceIsUnderMaintenance(service.status)) {
            addOperationStatus(service.name.toLowerCase(), statusUnderMaintenance, language);
        } else {
            const childComponentHealthPercentage = getChildComponentHealthPercentage(service, components);
            if (childComponentHealthPercentage > serviceChildComponentHealthThreshold) {
                addOperationStatus(service.name.toLowerCase(), statusPartialOutage, language);
            } else {
                addOperationStatus(service.name.toLowerCase(), statusMajorOutage, language);
            }
        }
    });
}

function updateServiceStatusList(language, event) {

    let statusList = document.getElementById('service-status-incident-list'); //ul

    // Get a reference to the template li and remove it from dom
    let templateItem = statusList.firstElementChild;

    while (statusList.firstChild) {
        statusList.removeChild(statusList.firstChild);
    }

    // Limit to 7 days                      day hour  min  sec  msec
    const limitTimestamp = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)

    // Add list of service status incidents to incident list
    let added = false;
    JSON.parse(event.target.responseText).pages.forEach(function (incident) {
        const resolvedTimestamp = new Date(incident.resolvedAt).getTime();
        if ((limitTimestamp < resolvedTimestamp) || !incident.informational) {
            added = true;
            addIncidentDetailedList(incident.createdAt, incident.title, "", incident.permalink, statusList,
                templateItem);
        }
    });
    if (!added) {
        addIncidentDetailedList(null, t.statusNoIncidents[language], null, null, statusList, templateItem);
    }
}

async function updateActiveMaintenancesList(elementId, baseUrl) {

    let statusList = document.getElementById(elementId);

    // Get a reference to the template li and remove it from dom
    let templateItem = statusList.firstElementChild;
    console.log("templateItem:", templateItem)
    while (statusList.firstChild) {
        statusList.removeChild(statusList.firstChild);
    }

    const cstateIndex = await getJson(baseUrl + "/index.json");
    console.log(cstateIndex.pinnedIssues)
    // Add list of active maintenances to list of current and most recent incidents and active maintenances
    cstateIndex.pinnedIssues.filter(issue => isActiveMaintenance(issue)).forEach(issue => {
        console.log(issue)
        addIncidentDetailedList(issue.createdAt, issue.title, "", issue.permalink, statusList, templateItem)
    })
}

async function updateUpcomingMaintenancesList(elementId, baseUrl) {

    let statusList = document.getElementById(elementId);

    // Get a reference to the template li and remove it from dom
    let templateItem = statusList.firstElementChild;

    while (statusList.firstChild) {
        statusList.removeChild(statusList.firstChild);
    }

    const cstateIndex = await getJson(baseUrl + "/index.json");

    // Add to list upcoming maintenances and other informational issues
    cstateIndex.pinnedIssues.filter(issue => !isActiveMaintenance(issue)).forEach(issue => {
        addIncidentDetailedList(issue.createdAt, issue.title, "", issue.permalink, statusList, templateItem)
    })
}

function isActiveMaintenance(issue) {
    // the cstate field createdAt is actually the intended time of the maintenance
    return Date.parse(issue.createdAt) <= Date.now()
}

async function updateActiveMaintenancesAndIncidentsOnFrontPage(elementId, baseUrl) {
    const statusList = document.getElementById(elementId);

    // /index.json contains all pinned and unresolved issues
    const cstateIndex = await getJson(baseUrl + "/index.json");

    // if a maintenance notice with a past date is found in pinned issues, it is considered a currently active maintenance break
    const activeMaintenances = cstateIndex.pinnedIssues.filter(isActiveMaintenance);
    const unresolvedIncidents = cstateIndex.systems.reduce((acc, curr) => {
        return acc.concat(curr.unresolvedIssues.filter(
            // filter duplicates, they exist if one issue affects multiple components
            issue => !acc.find(addedIssue => addedIssue.filename === issue.filename)))
    }, [])

    // active incidents and maintenances are displayable issues
    const displayableIssues = activeMaintenances.concat(unresolvedIncidents)
                                                .sort((a, b) => Date.parse(b.createdAt) - Date.parse(
                                                    a.createdAt));

    // Get a reference to the template li and remove it from dom
    const templateItem = statusList.firstElementChild;

    while (statusList.firstChild) {
        statusList.removeChild(statusList.firstChild);
    }

    // Take only first three to show on front page
    const first3 = displayableIssues.slice(0, 3);
    if (first3.length > 0) {
        first3.forEach(
            issue => addIncidentFrontPageList(issue.createdAt, issue.title, issue.permalink, statusList,
                templateItem));
    } else { // empty placeholder
        addIncidentFrontPageList(null, null, null, statusList, templateItem);
    }
}


async function getServiceStatus(baseUrl, language) {
    /*
        // Get service status data from api
        let oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function (evt) {
            updateServiceStatus(language, evt);
        });
        oReq.open("GET", baseUrl + "/api/v2/components.json");
        oReq.send();
    */
    // Get ongoing-maintenances from api
    if (document.getElementById("service-status-ongoing-maintenance-list")) {
        await updateActiveMaintenancesList('service-status-ongoing-maintenance-list', baseUrl)
    }


    // Get current and recent service incidents from api
    if (document.getElementById("service-status-incident-list")) {
        const oReq2 = new XMLHttpRequest();
        oReq2.addEventListener("load", function (evt) {
            updateServiceStatusList(language, evt);
        });
        oReq2.open("GET", baseUrl + "/issues/index.json");
        oReq2.send();
    }


    // Get upcoming-maintenances from api
    if (document.getElementById("service-status-upcoming-maintenance-list")) {
        await updateUpcomingMaintenancesList('service-status-upcoming-maintenance-list', baseUrl);
    }

    // Get ongoing-maintenances from api
    if (document.getElementById("service-status-active-incidents-short")) {
        await updateActiveMaintenancesAndIncidentsOnFrontPage('service-status-active-incidents-short',
            baseUrl);
    }


    // Update service status every 60 seconds
    setTimeout(getServiceStatus, 60000, baseUrl, language);
}

function addOperationStatus(service, status, language) {

    // Elements
    const classes = document.getElementById(`service-status-circle-${service}`).classList;
    const statusText = document.getElementById(`service-status-text-${service}`);

    // Clean previous status
    classes.remove(`service-status__icon-circle-bottom--operational__${service}`,
        "service-status__icon-circle-bottom--partial-outage",
        "service-status__icon-circle-bottom--major-outage");

    // Update status
    if (status === statusOperational) {
        classes.add(`service-status__icon-circle-bottom--operational__${service}`);
        statusText.textContent = t.statusOperational[language];
        statusText.classList.remove("service-status__service-text--loading");
    } else if (status === statusUnderMaintenance) {
        classes.add("service-status__icon-circle-bottom--under-maintenance");
        statusText.textContent = t.statusUnderMaintenance[language];
        statusText.classList.remove("service-status__service-text--loading");
    } else if (status === statusPartialOutage) {
        classes.add("service-status__icon-circle-bottom--partial-outage");
        statusText.textContent = t.statusPartialOutage[language];
        statusText.classList.remove("service-status__service-text--loading");
    } else if (status === statusMajorOutage) {
        classes.add("service-status__icon-circle-bottom--major-outage");
        statusText.textContent = t.statusMajorOutage[language];
        statusText.classList.remove("service-status__service-text--loading");
    } else {
        statusText.textContent = t.loadingError[language];
        statusText.classList.add("service-status__service-text--loading");
    }
}

function addIncidentDetailedList(isoDateTime, name, message, link, statusList, templateItem) {
    const newItem = templateItem.cloneNode(true);

    if (isoDateTime) {
        newItem.innerHTML = '<h3 class="h3 latest-item__header-text"><a href="' + link + '" class="latest-item__header-link">' + name + '</a></h3>' + '<div class="latest-item__meta-first"><span class="latest-item__traffic-type"><i class="material-icons md-md date-type-tags__date-icon">create</i>' + getTimeStringFromIsoString(
            isoDateTime) + '</span></div>' + (message ? '<pre>' + message + '</pre>' : '');
    } else {
        newItem.innerHTML = '<p>' + name + '</p>';
    }
    statusList.appendChild(newItem);
}

function addIncidentFrontPageList(scheduledFor, name, link, statusList, templateItem) {
    const newItem = templateItem.cloneNode(true);
    if (scheduledFor) {
        newItem.innerHTML = '<h4 class="h4 latest-item__header-text"><a href="' + link + '" class="latest-item__header-link">' + name + '</a></h4>' + '<div class="latest-item__meta-first"><span class="latest-item__traffic-type"><i class="material-icons md-md date-type-tags__date-icon">create</i>' + getTimeStringFromIsoString(
            scheduledFor) + '</span></div>';
    } else {
        newItem.innerHTML = '<h4 class="h4 latest-item__header-text">&nbsp;</h4>' + '<div class="latest-item__meta-first">&nbsp;<span class="latest-item__traffic-type"></span></div>';
    }
    statusList.appendChild(newItem);
}

function getTimeStringFromIsoString(dateTime) {
    const asDate = new Date(dateTime);
    const scheduledForDateString = asDate.getDate() + "." + (asDate.getMonth() + 1) + "." + asDate.getFullYear() + " " + ('0' + asDate.getHours()).slice(
        -2) + ":" + ('0' + asDate.getMinutes()).slice(-2);
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
        const oReq2 = new XMLHttpRequest();
        oReq2.responseType = 'json';
        oReq2.onload = function () {
            let status = oReq2.status;
            if (status == 200) {
                resolve(oReq2.response);
            } else {
                reject(status);
            }
        };
        oReq2.open("GET", url, true);
        oReq2.send();
    });
}

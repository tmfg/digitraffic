// export these functions to global scope and don't tree shake them
globalThis.getServiceStatus = getServiceStatus;

export default function () {
  /* Dummy export for bundle */
}

// Fix: Property 't' does not exist on type 'Window'
declare global {
  interface Window {
    t: Record<string, unknown>;
  }
}

interface CStateIndex {
  readonly categories: CStateCategory[];
  readonly pinnedIssues: CStatePinnedIssueObject[];
  readonly systems: CStateSystem[];
}

interface CStateIssues {
  readonly pages: CStateIssueObject[];
}

interface CStateCategory {
  readonly name: string;
}

interface CStateSystem {
  readonly name: CStateSystemName;
  readonly category: string;
  readonly status: CStateStatus;
  readonly unresolvedIssues: CStateIssueObject[];
}

type CStateSystemName = string;

interface CStateIssue {
  readonly title: string;
  readonly createdAt: string;
  readonly permalink: string;
  readonly affected: CStateSystemName[];
  readonly filename: string;
}

interface CStatePinnedIssueObject extends CStateIssue {}

interface CStateIssueObject extends CStateIssue {
  readonly severity: string;
  readonly resolved: boolean;
  readonly informational: boolean;
  readonly resolvedAt: string;
}

interface CStateIssuePageObject extends CStateIssueObject {
  readonly body: string;
}

const cStateStatusString = {
  OK: "ok",
  DISRUPTED: "disrupted",
  DOWN: "down",
} as const;
type CStateStatus =
  (typeof cStateStatusString)[keyof typeof cStateStatusString];

const serviceChildComponentHealthThreshold = 50;
const statusUnderMaintenance = "under_maintenance";
// cState issues under this path are Digitraffic maintenances
const digitrafficMaintenancePath = "/digitraffic-maintenance/";

/* Add event listeners for status links */
function addApiStatusTabLinksEventListeners() {
  if (document.getElementsByClassName("service-status-incidents")) {
    const tabLinks = document.getElementsByClassName("tab-link");
    Array.prototype.forEach.call(tabLinks, function (link) {
      link.addEventListener(
        "click",
        (event) =>
          openTab(link.href.substring(link.href.lastIndexOf("#") + 1), event),
      );
    });
  }
}

export async function getServiceStatus(baseUrl: string, language: string) {
  addApiStatusTabLinksEventListeners();

  const index = (await getJson(baseUrl + "/index.json")) as CStateIndex;

  // if a maintenance notice with a past date is found in pinned issues, it is considered a currently active maintenance break
  const activeMaintenances = index.pinnedIssues.filter(isActiveMaintenance);

  // Set service/category status
  updateServiceStatus(language, index, activeMaintenances);

  // Add ongoing maintenances to page
  if (document.getElementById("service-status-ongoing-maintenance-list")) {
    await updateActiveMaintenancesList(
      "service-status-ongoing-maintenance-list",
      activeMaintenances,
    );
  }

  // Add upcoming maintenances to page
  if (document.getElementById("service-status-upcoming-maintenance-list")) {
    await updateUpcomingMaintenancesAndOtherIssuesList(
      language,
      "service-status-upcoming-maintenance-list",
      index,
    );
  }

  // Show ongoing maintenances and issues on front page
  if (document.getElementById("service-status-active-incidents-short")) {
    updateActiveMaintenancesAndIncidentsOnFrontPage(
      "service-status-active-incidents-short",
      activeMaintenances,
      index.systems,
    );
  }

  // Get current and past service incidents from api
  const allIssues =
    (await getJson(baseUrl + "/issues/index.json")) as CStateIssues;

  if (document.getElementById("service-status-incident-list")) {
    await updateServiceStatusList(language, allIssues.pages);
  }

  // Update service status every 60 seconds
  setTimeout(getServiceStatus, 60000, baseUrl, language);
}

function updateServiceStatus(
  language: string,
  index: CStateIndex,
  activeMaintenances: CStatePinnedIssueObject[],
) {
  const categories = index.categories.map((category) => category.name);
  categories.forEach((category) => {
    const systems = getSystemsForCategory(index, category);
    if (systemsUnderMaintenance(systems, activeMaintenances)) {
      addOperationStatus(
        category.toLowerCase(),
        statusUnderMaintenance,
        language,
      );
    } else if (systemsDownOrDisrupted(systems)) {
      const systemHealthPercentage = getSystemHealthPercentage(systems);
      if (systemHealthPercentage > serviceChildComponentHealthThreshold) {
        addOperationStatus(
          category.toLowerCase(),
          cStateStatusString.DISRUPTED,
          language,
        );
      } else {
        addOperationStatus(
          category.toLowerCase(),
          cStateStatusString.DOWN,
          language,
        );
      }
    } else {
      addOperationStatus(
        category.toLowerCase(),
        cStateStatusString.OK,
        language,
      );
    }
  });
}

async function updateServiceStatusList(
  language: string,
  issues: CStateIssueObject[],
) {
  const statusList = document.getElementById("service-status-incident-list"); //ul

  // Get a reference to the template li and remove it from dom
  const templateItem = statusList.firstElementChild;

  while (statusList.firstChild) {
    statusList.removeChild(statusList.firstChild);
  }

  // Limit to 7 days                      day hour  min  sec  msec
  const limitTimestamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

  const displayableIncidents = issues
    // show any unresolved incidents on top
    .filter((issue) => !issue.informational && !issue.resolved)
    .sort(issuesByDate())
    .concat(
      issues
        .filter(
          (issue) =>
            issue.resolved &&
            !issue.informational &&
            limitTimestamp < new Date(issue.resolvedAt).getTime(),
        )
        .sort(issuesByDate()),
    );

  // Add list of service status incidents to incident list
  if (displayableIncidents.length > 0) {
    for (const issue of displayableIncidents) {
      const issueWithBody = (await getJson(
        issue.permalink + "index.json",
      )) as CStateIssuePageObject;
      addIncidentDetailedList(
        issue.createdAt,
        // for clarity, prefix resolved issue titles with [Resolved] similarly to the cstate RSS feed
        issue.resolved ? "[Resolved] " + issue.title : issue.title,
        issueWithBody.body,
        issue.permalink,
        statusList,
        templateItem,
      );
    }
  } else {
    addIncidentDetailedList(
      null,
      window.t.statusNoIncidents[language],
      null,
      null,
      statusList,
      templateItem,
    );
  }
}

async function updateActiveMaintenancesList(
  elementId: string,
  activeMaintenances: CStatePinnedIssueObject[],
) {
  const statusList = document.getElementById(elementId);

  // Get a reference to the template li and remove it from dom
  const templateItem = statusList.firstElementChild;

  while (statusList.firstChild) {
    statusList.removeChild(statusList.firstChild);
  }

  // Add active maintenances to list of ongoing maintenances
  for (const issue of activeMaintenances) {
    const issueWithBody =
      (await getJson(issue.permalink + "index.json")) as CStateIssuePageObject;
    addIncidentDetailedList(
      issue.createdAt,
      issue.title,
      issueWithBody.body,
      issue.permalink,
      statusList,
      templateItem,
    );
  }
}

async function updateUpcomingMaintenancesAndOtherIssuesList(
  language: string,
  elementId: string,
  index: CStateIndex,
) {
  const statusList = document.getElementById(elementId);

  // Get a reference to the template li and remove it from dom
  const templateItem = statusList.firstElementChild;

  while (statusList.firstChild) {
    statusList.removeChild(statusList.firstChild);
  }

  const displayableIssues = index.pinnedIssues.filter((issue) =>
    !isActiveMaintenance(issue)
  );

  if (displayableIssues.length > 0) {
    // Add to list upcoming maintenances and other informational issues
    for (const issue of displayableIssues) {
      const issueWithBody = (await getJson(
        issue.permalink + "index.json",
      )) as CStateIssuePageObject;
      addIncidentDetailedList(
        issue.createdAt,
        issue.title,
        issueWithBody.body,
        issue.permalink,
        statusList,
        templateItem,
      );
    }
  } else {
    addIncidentDetailedList(
      null,
      window.t.statusNoUpcomingIssues[language],
      null,
      null,
      statusList,
      templateItem,
    );
  }
}

function updateActiveMaintenancesAndIncidentsOnFrontPage(
  elementId: string,
  activeMaintenances: CStatePinnedIssueObject[],
  systems: CStateSystem[],
) {
  const statusList = document.getElementById(elementId);

  const unresolvedIncidents = systems.reduce<CStateIssue[]>((acc, curr) => {
    return acc.concat(
      curr.unresolvedIssues.filter(
        // filter duplicates, they exist if one issue affects multiple components
        (issue) =>
          !acc.find((addedIssue) => addedIssue.filename === issue.filename),
      ),
    );
  }, []);

  // active incidents and maintenances are displayable issues
  const displayableIssues = activeMaintenances.concat(unresolvedIncidents).sort(
    issuesByDate(),
  );

  // Get a reference to the template li and remove it from dom
  const templateItem = statusList.firstElementChild;

  while (statusList.firstChild) {
    statusList.removeChild(statusList.firstChild);
  }

  // Take only first three to show on front page
  const first3 = displayableIssues.slice(0, 3);
  if (first3.length > 0) {
    first3.forEach((issue) =>
      addIncidentFrontPageList(
        issue.createdAt,
        issue.title,
        issue.permalink,
        statusList,
        templateItem,
      )
    );
  } else {
    // empty placeholder
    addIncidentFrontPageList(null, null, null, statusList, templateItem);
  }
}

function addOperationStatus(service: string, status: string, language: string) {
  // Elements
  const classes =
    document.getElementById(`service-status-circle-${service}`).classList;
  const statusText = document.getElementById(`service-status-text-${service}`);

  // Clean previous status
  classes.remove(
    `service-status__icon-circle-bottom--operational__${service}`,
    "service-status__icon-circle-bottom--partial-outage",
    "service-status__icon-circle-bottom--major-outage",
  );

  // Update status
  if (status === cStateStatusString.OK) {
    classes.add(`service-status__icon-circle-bottom--operational__${service}`);
    statusText.textContent = window.t.statusOperational[language];
    statusText.classList.remove("service-status__service-text--loading");
  } else if (status === statusUnderMaintenance) {
    classes.add("service-status__icon-circle-bottom--under-maintenance");
    statusText.textContent = window.t.statusUnderMaintenance[language];
    statusText.classList.remove("service-status__service-text--loading");
  } else if (status === cStateStatusString.DISRUPTED) {
    classes.add("service-status__icon-circle-bottom--partial-outage");
    statusText.textContent = window.t.statusPartialOutage[language];
    statusText.classList.remove("service-status__service-text--loading");
  } else if (status === cStateStatusString.DOWN) {
    classes.add("service-status__icon-circle-bottom--major-outage");
    statusText.textContent = window.t.statusMajorOutage[language];
    statusText.classList.remove("service-status__service-text--loading");
  } else {
    statusText.textContent = window.t.loadingError[language];
    statusText.classList.add("service-status__service-text--loading");
  }
}

function addIncidentDetailedList(
  isoDateTime: string,
  name: string,
  message: string,
  link: string,
  statusList: HTMLElement,
  templateItem: Element,
) {
  const newItem = templateItem.cloneNode(true) as HTMLElement;

  if (isoDateTime) {
    newItem.innerHTML = '<h3 class="h3 latest-item__header-text"><a href="' +
      link +
      '" class="latest-item__header-link">' +
      name +
      "</a></h3>" +
      '<div class="latest-item__meta-first"><span class="latest-item__traffic-type"><i class="material-icons md-md date-type-tags__date-icon">create</i>' +
      getTimeStringFromIsoString(isoDateTime) +
      "</span></div>" +
      (message ? "<div>" + message + "</div>" : "");
  } else {
    newItem.innerHTML = "<p>" + name + "</p>";
  }
  statusList.appendChild(newItem);
}

function addIncidentFrontPageList(
  scheduledFor: string,
  name: string,
  link: string,
  statusList: HTMLElement,
  templateItem: Element,
) {
  const newItem = templateItem.cloneNode(true) as HTMLElement;
  if (scheduledFor) {
    newItem.innerHTML = '<h4 class="h4 latest-item__header-text"><a href="' +
      link +
      '" class="latest-item__header-link">' +
      name +
      "</a></h4>" +
      '<div class="latest-item__meta-first"><span class="latest-item__traffic-type"><i class="material-icons md-md date-type-tags__date-icon">create</i>' +
      getTimeStringFromIsoString(scheduledFor) +
      "</span></div>";
  } else {
    newItem.innerHTML = '<h4 class="h4 latest-item__header-text">&nbsp;</h4>' +
      '<div class="latest-item__meta-first">&nbsp;<span class="latest-item__traffic-type"></span></div>';
  }
  statusList.appendChild(newItem);
}

function getTimeStringFromIsoString(dateTime: string) {
  const asDate = new Date(dateTime);
  return (
    asDate.getDate() +
    "." +
    (asDate.getMonth() + 1) +
    "." +
    asDate.getFullYear() +
    " " +
    ("0" + asDate.getHours()).slice(-2) +
    ":" +
    ("0" + asDate.getMinutes()).slice(-2)
  );
}

function openTab(tabId: string, event) {
  event.preventDefault(); // dont execute link href
  const x = document.getElementsByClassName(
    "closeable-tab",
  ) as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabId).style.display = "block";

  const tablinks = document.getElementsByClassName("tab-link");
  for (let i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(
      " tab-link-active",
      "",
    );
  }
  event.currentTarget.className += " tab-link-active";
  return false;
}

function getJson(url: string) {
  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.onload = function () {
      const status = req.status;
      if (status == 200) {
        resolve(req.response);
      } else {
        reject(status);
      }
    };
    req.open("GET", url, true);
    req.send();
  });
}

function serviceIsHealthy(serviceStatus: string) {
  return serviceStatus.toLowerCase() === cStateStatusString.OK;
}

function systemsUnderMaintenance(
  systems: CStateSystem[],
  activeMaintenances: CStatePinnedIssueObject[],
) {
  return !!activeMaintenances.find(
    (maintenance) =>
      !!systems.find((system) => maintenance.affected.includes(system.name)),
  );
}

function systemsDownOrDisrupted(systems: CStateSystem[]) {
  return !!systems.find((system) =>
    system.unresolvedIssues.find(
      (issue) =>
        issue.severity === cStateStatusString.DOWN ||
        issue.severity === cStateStatusString.DISRUPTED,
    )
  );
}

function getSystemsForCategory(index: CStateIndex, categoryName: string) {
  return index.systems.filter((system) => system.category === categoryName);
}

function getSystemHealthPercentage(systems: CStateSystem[]) {
  const healthyComponents = systems.filter((c) => serviceIsHealthy(c.status));
  return Math.ceil((healthyComponents.length / systems.length) * 100);
}

function issuesByDate() {
  return (a: CStateIssue, b: CStateIssue) =>
    Date.parse(b.createdAt) - Date.parse(a.createdAt);
}

function isActiveMaintenance(issue: CStateIssue) {
  // the cState field createdAt is the intended time of the maintenance
  return Date.parse(issue.createdAt) <= Date.now() &&
    issue.permalink.includes(digitrafficMaintenancePath);
}

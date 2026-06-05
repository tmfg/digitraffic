export default function () {
  /* Dummy export for bundle */
}

// export these functions to global scope and don't tree shake them
globalThis.loadDatex2 = loadDatex2;

/** Specified in js/custom/script.js */
declare function toLocalDate(date: string): string;

const TRAFFIC_MESSAGES_URL =
  "https://tie.digitraffic.fi/api/traffic-message/v2";

const TYPE_EXEMPTED_TRANSPORTS = "exempted-transports";
const TYPE_ROADWORKS = "roadworks";
const TYPE_TRAFFIC_ANNOUNCEMENTS = "traffic-announcements";
const TYPE_WEIGHT_RESTRICTIONS = "weight-restrictions";

function initTable(datexType: string, tableTitle: string) {
  $(`#${datexType}`).append([
    $("<colgroup>").append([
      $("<col>", { class: "datex2-col1" }),
      $("<col>", { class: "datex2-col2" }),
      $("<col>", { class: "datex2-col3" }),
      $("<col>", { class: "datex2-col4" }),
      $("<col>", { class: "datex2-col5" }),
      $("<col>", { class: "datex2-col6" }),
      $("<col>", { class: "datex2-col7" }),
      $("<col>", { class: "datex2-col8" }),
    ]),
    $("<thead/>").append([
      $("<tr/>", { class: "row.nowrap" }).append([
        $("<th/>", { class: "datex2-col-1-2", colspan: 2 }).text(tableTitle),
        $("<th/>", {
          class: "datex2-col-3-8",
          id: `date_${datexType}`,
          colspan: 6,
        }).text("-"),
      ]),
      $("<tr/>", { class: "row.nowrap" }).append([
        $("<th/>", { class: "datex2-col1" }).text("GUID"),
        $("<th/>", { class: "datex2-col2" }).text("Ver"),
        $("<th/>", { class: "datex2-col3" }).text("Start"),
        $("<th/>", { class: "datex2-col4" }).text("End / Open"),
        $("<th/>", { class: "datex2-col5" }).text("Title"),
        $("<th/>", { class: "datex2-col6" }).text("Xml"),
        $("<th/>", { class: "datex2-col7" }).text("Json"),
        $("<th/>", { class: "datex2-col8" }).text("Map"),
      ]),
    ]),
    $("<tbody/>"),
  ]);
}

async function loadContent(requestType: string): Promise<void> {
  console.info("Load traffic messages of type", requestType);
  const response = await fetch(
    `${TRAFFIC_MESSAGES_URL}/${requestType}`,
  );
  const data = await response.json();
  processResponse(data, requestType);
}

function processResponse(resp: any, requestType: string): void {
  if (resp) {
    console.log("Response:", resp);

    $(`#date_${requestType}`).text(
      "Updated: " + toLocalDate(resp.dataUpdatedTime) + " / " +
        resp.features.length + " pcs",
    );

    const features = resp.features.map(calculateDaysOpen);
    const sortAlgorithm = getSortAlgorithm();

    const sorted = features.sort(sortAlgorithm);
    for (const feature of sorted) {
      addMessage(requestType, feature);
    }
  }
}

function addMessage(clazz: string, message: any): void {
  let warn = "";
  let start = "-";
  let end = "-";

  const startDateTime = getStartDateTime(message.properties.announcements);
  const endDateTime = getEndDateTime(message.properties.announcements);
  if (startDateTime) {
    start = startDateTime.toISOString();

    if (endDateTime) {
      end = endDateTime.toISOString();
      const days = Math.round(
        (endDateTime.getTime() - startDateTime.getTime()) / 86400000,
      );

      end = `${end} (${days} days)`;
      if (endDateTime.getTime() < Date.now()) {
        warn = " warn";
      }
    } else {
      const days = Math.round(
        (Date.now()- startDateTime.getTime()) / 86400000,
      );
      end = `(${days} days)`;

      if (days > 14) {
        warn = " warn";
      }
    }
  }

  $(`#${clazz} > tbody:last-child`).append(
    $("<tr/>", { class: `row.nowrap${warn}` }).append([
      $("<td/>", { class: "datex2-col1" }).text(message.properties.situationId),
      $("<td/>", { class: "datex2-col2" }).text(message.properties.version),
      $("<td/>", { class: "datex2-col3" }).text(start),
      $("<td/>", { class: `datex2-col4${warn}` }).text(end),
      $("<td/>", { class: "datex2-col5" }).text(
        getTitle(message.properties.announcements),
      ),
      $("<td/>", { class: "datex2-col6" }).append(
        $("<a />", {
          target: "_blank",
          href: `${TRAFFIC_MESSAGES_URL}/messages/${message.properties.situationId}`            
        }).text("xml"),
      ),
      $("<td/>", { class: "datex2-col7" }).append(
        $("<a />", {
          target: "_blank",
          href: `${TRAFFIC_MESSAGES_URL}/messages/${message.properties.situationId}`,
        }).text("json"),
      ),
      $("<td/>", { class: "datex2-col8" }).append(
        $("<a />", {
          target: "_blank",
          href: `https://geojson.tools/?url=${TRAFFIC_MESSAGES_URL}/messages/${message.properties.situationId}`,
        }).text("map"),
      ),
    ]),
  );
}

function calculateDaysOpen(feature: any): any {
  const startDateTime = getStartDateTime(feature.properties.announcements);
  const endDateTime = getEndDateTime(feature.properties.announcements);
  if (startDateTime) {
    if (endDateTime) {
      feature.properties.daysOpen = Math.round(
        (endDateTime.getTime() - startDateTime.getTime()) / 86400000,
      );
    } else {
      feature.properties.daysOpen = Math.round(
        (Date.now()- startDateTime.getTime()) / 86400000,
      );
    }
  }
  return feature;
}

type SortCallbackFunction = (a: any) => number;

function sortBy(fn: SortCallbackFunction, reverse: boolean = false) {
  const shouldReverse = reverse ? -1 : 1;
  return (a, b) => {
    const daysA = fn(a);
    const daysB = fn(b);
    return daysA > daysB ? shouldReverse : -shouldReverse;
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

function getStartDateTime(anouncements: any[]): Date | null {
  const times = anouncements
    .filter((a) => a.timeAndDuration?.startTime)
    .map((a) => new Date(a.timeAndDuration.startTime).getTime());
  if (times.length > 0) {
    return new Date(Math.min(...times));
  }
  return null;
}

function getEndDateTime(anouncements: any[]): Date | null {
  const times = anouncements
    .filter((a) => a.timeAndDuration?.endTime)
    .map((a) => new Date(a.timeAndDuration.endTime).getTime());
  if (times.length > 0) {
    return new Date(Math.max(...times));
  }
  return null;
}

function getTitle(announcements: any[]): string {
  for (var ann of announcements) {
    if (ann.title) {
      return ann.title;
    }
  }

  return "-";
}

export async function loadDatex2(): Promise<void> {
  initTable(TYPE_TRAFFIC_ANNOUNCEMENTS, "Traffic announcements");
  initTable(TYPE_EXEMPTED_TRANSPORTS, "Exempted transports");
  initTable(TYPE_ROADWORKS, "Road works");
  initTable(TYPE_WEIGHT_RESTRICTIONS, "Weight restrictions");

  const promises = await Promise.allSettled([
    loadContent(TYPE_TRAFFIC_ANNOUNCEMENTS),
    loadContent(TYPE_EXEMPTED_TRANSPORTS),
    loadContent(TYPE_ROADWORKS),
    loadContent(TYPE_WEIGHT_RESTRICTIONS),
  ]);

  promises.forEach((promise) => {
    if (promise.status === "rejected") {
      console.error(promise.reason);
    }
  });
}

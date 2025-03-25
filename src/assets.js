/** Dependencies **/
import $ from "jquery";
import tippy from "tippy.js"; // uses popper
import Paho from "paho-mqtt";
import pako from "pako";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import highlightjs_css from "highlight.js/styles/default.css";
import Alpine from "alpinejs";

/** Static JavaScript files **/
import filter_applications from "./js/filter-applications";
import filter_developments from "./js/filter-developments";
import filter_posts from "./js/filter-posts";
import script_api_changes from "./js/script-api-changes.js";
import script_twc from "./js/script-twc";
import {
  mqtt_disconnect,
  mqtt_reconnect,
  mqtt_updateTopicTemplate,
} from "./js/script-mqtt";
import * as digitrafficSearch from "./js/search";

/** Compiled JavaScript files **/
import script_api_status, { getServiceStatus } from "../dist/script-api-status";
import script_datex2 from "../dist/script-datex2";
import script from "../dist/script";

// Register objects/functions to window
window.$ = $;
window.tippy = tippy;
window.mqtt_reconnect = mqtt_reconnect;
window.mqtt_disconnect = mqtt_disconnect;
window.mqtt_updateTopicTemplate = mqtt_updateTopicTemplate;
window.digitrafficSearch = digitrafficSearch;

// Init highlight.js https://highlightjs.org/
window.hljs = hljs;
hljs.registerLanguage("json", json);

// Init Alpine https://alpinejs.dev/essentials/installation
window.Alpine = Alpine;
Alpine.start();

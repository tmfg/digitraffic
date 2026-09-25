/** Dependencies **/
import $ from "jquery";
import tippy from "tippy.js"; // uses popper
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/default.css";
import Alpine from "alpinejs";

/** Static JavaScript files **/
import "./js/filter-applications";
import "./js/filter-developments";
import "./js/filter-posts";
import "./js/script-api-changes.js";
import "./js/script-twc";
import {
  mqtt_disconnect,
  mqtt_reconnect,
  mqtt_updateTopicTemplate,
} from "./js/script-mqtt";
import * as digitrafficSearch from "./js/search";

/** Compiled JavaScript files **/
import "../dist/script-api-status";
import "../dist/script-datex2";
import "../dist/script";

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

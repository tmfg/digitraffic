import $ from "jquery";
import tippy from "tippy.js" // uses popper
import Paho from "paho-mqtt"
import pako from "pako"
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import highlightjs_css from 'highlight.js/styles/default.css';
import Alpine from 'alpinejs'

import filter_applications from "../js/custom/filter-applications"
import filter_developments from "../js/custom/filter-developments"
import filter_posts from "../js/custom/filter-posts"
import script_api_changes from "../js/custom/script-api-changes.js"
import script_api_status, {getServiceStatus} from "./script-api-status"
import script_datex2 from "../js/custom/script-datex2"
import script_twc from "../js/custom/script-twc"
import script from "../js/custom/script"
import { mqtt_reconnect, mqtt_disconnect, mqtt_updateTopicTemplate } from "../js/custom/script-mqtt"

// Register defined objects/functions to window
window.$ = $;
window.tippy = tippy;
window.mqtt_reconnect = mqtt_reconnect
window.mqtt_disconnect = mqtt_disconnect;
window.mqtt_updateTopicTemplate = mqtt_updateTopicTemplate;

// https://highlightjs.org/
window.hljs = hljs;
hljs.registerLanguage('json', json);

// https://alpinejs.dev/essentials/installation
window.Alpine = Alpine
Alpine.start()

// export these functions to global scope and don't tree shake them
globalThis.loadTWC = loadTWC;
globalThis.loadApiChanges = loadApiChanges;

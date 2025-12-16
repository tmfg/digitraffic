'use strict';
import $ from "jquery";
import Paho from "paho-mqtt"
import pako from "pako"

let lines = [];
let messagesLastMinuteCount = 0, client;
const port = 443;
let host = "";
let topic = "";
let messagesDiv;

// /* Init when dom is fully loaded */
$(() => initMqtt());

function initMqtt() {
    if (!document.getElementById('mqtt-options')) {
        // Not app page => do not init anything
        return;
    }
    mqtt_updateTopicTemplate();
    window.setInterval(logMessageCount, 60*1000);
}

export default function scriptMqtt() {}

function connect() {
    const clientId = "page_testclient_" + now();
    host = $("#domain").val();
    topic = $("#topic").val();
    console.log("Trying to connect to host " + host + ":" + port + ", topic: " + topic + " client id: " + clientId);

    client = new Paho.Client(host, port, clientId);

    client.onConnectionLost = function (response) {
        const msg = new Date().toISOString() + ' Connection to host ' + host + ' lost: ' + response.errorCode + ': ' + response.errorMessage;
        $("#connectionStatus").text(msg);
        console.info(msg);
    };

    client.onMessageArrived = function(message) {
        messagesLastMinuteCount++;
        console.log(message.destinationName + ': ' + message.payloadString);
        try {
            if (message.destinationName.endsWith("status")) {
                console.log(message.destinationName + ': ' + message.payloadString);
            } else if (message.payloadString.startsWith("<?xml")) {
                addMessage(message.destinationName, escapeXml(message.payloadString));
            } else {
                addMessage(message.destinationName, JSON.stringify(JSON.parse(message.payloadString)));
            }
        } catch (error) {
            // not json or xml, try decompress
            try {
                const message = decompress(message.payloadString);

                addMessage(message.destinationName, "RAW: \"" + message.payloadString + "\"\nDECOMPRESSED: \"" + message + "\"");
            } catch (errorIn) {
                console.error("addMessage failed " + error);
                console.info(message);
            }
        }
    };


    const connectionProperties = {
        onSuccess: onConnectSuccess,
        onFailure: onConnectFailure,
        reconnect: true,
        cleanSession:false,
        mqttVersion:4,
        useSSL:true
    };

    client.connect(connectionProperties);
}

export function mqtt_disconnect() {
    try {
        if (client && client.isConnected) {
            client.disconnect();
            $("#connectionStatus").text(new Date().toISOString() + ' Disconnected from host '  + host);
        }
    } catch(err) {
        console.error(err.message);
    }
}

function logMessageCount() {
    console.info(now() + ' ' + messagesLastMinuteCount + ' messages per minute');
    $("#messagesPerMinute").text(messagesLastMinuteCount);
    messagesLastMinuteCount = 0;
}

function onConnectSuccess() {
    console.info(now() + ' Connection open. Subscribing to topic ' + topic);
    $("#connectionStatus").text(new Date().toISOString() + ' Connected to host ' + host + ', topic: ' + topic);
    client.subscribe(topic);
}

function decompress(compressed) {
    const data = decompressGzipToString(compressed)

    try {
        return JSON.stringify(JSON.parse(data));
    } catch (error) {
        return data;
    }
}

function onConnectFailure(response) {
    const msg = new Date().toISOString() + ' Connection to host ' + host + ' failed. ' + response.errorCode + ": " + response.errorMessage;
    console.info(msg);
    $("#connectionStatus").text(msg);
}

function addMessage(destination, message) {

    if (!messagesDiv) {
        messagesDiv = document.getElementById("messages");
    }

    const pre = document.createElement("pre");
    pre.innerHTML = destination + ': '

    const code = document.createElement("code");
    code.innerHTML = message;
    code.className = "language-json";
    pre.appendChild(code);

    messagesDiv.appendChild(pre);
    const elements = messagesDiv.getElementsByTagName("pre");
    const toRemove = elements.length-50;
    if (toRemove > 0) {
        for (let i = 0; i < toRemove; i++) {
            messagesDiv.removeChild(elements[i]);
        }
    }
    hljs.highlightElement(code);
}

export function mqtt_updateTopicTemplate() {
    $("#topic").val($("#topic_select").val());
    console.log("updateTopicTemplate changed to " + $("#topic").val());
}

export function mqtt_reconnect() {
    messagesLastMinuteCount = 0;
    $("#messages").html('');
    $("#messagesPerMinute").text(0);
    mqtt_disconnect();
    lines = [];
    connect();
}

function decompressGzipToString(gzippedB64Data) {
    // Decode the base64 encoded data to ASCII string
    const gzippedData = atob(gzippedB64Data);
    // Convert ASCII string to UTF-8 byte array
    const gzippedDataArray = Uint8Array.from(gzippedData, c => c.charCodeAt(0))
    // Unzip byte array to UTF-8 byte array
    const ungzippedData = pako.ungzip(gzippedDataArray);
    // Decode UTF-8 byte array to string
    return new TextDecoder().decode(ungzippedData);
}

function escapeXml(unsafeXml) {
    return unsafeXml.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function now() {
    return new Date().toISOString();
}

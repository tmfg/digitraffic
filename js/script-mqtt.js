'use strict';
let lines = [];
let messagesLastMinuteCount = 0, client;
const port = 443;
let topic = "";

window.setInterval(logMessageCount, 60*1000);

window.onload = updateTopicTemplate;

function connect() {
    const clientId = "testclient_" + Date.now();
    const host = $("#domain").val();
    topic = $("#topic").val();
    console.log("Trying to connect to road mqtt " + host + ":" + port + " Topic: " + topic + " client id: " + clientId);

    client = new Paho.Client(host, port, clientId);

    client.onConnectionLost = function (response) {
        console.info(Date.now() + ' Connection lost: ' + response.errorCode+ ': ' + response.errorMessage);
    };

    client.onMessageArrived = function(message) {
        messagesLastMinuteCount++;

        try {
            if (message.destinationName.endsWith("status")) {
                console.log(message.destinationName + ': ' + message.payloadString);
            } else if (message.payloadString.startsWith("<?xml")) {
                addMessage(message.destinationName, message.payloadString);
            } else {
                addMessage(message.destinationName, JSON.stringify(JSON.parse(message.payloadString)));
            }
        } catch (error) {
            // not json or xml, try decompress
            try {
                const json = decompressGzipToString(message.payloadString)
                addMessage(message.destinationName,
                    "\nRAW: " + message.payloadString + "\nDECOMPRESSED: \"" + JSON.stringify(JSON.parse(json)) + "\"");
            } catch (errorIn) {
                console.error("addMessage failed " + error);
                console.info(message);
            }
        }

        updateList();
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

function disconnect() {
    try {
        if (client && client.isConnected) {
            client.disconnect();
        }
    } catch(err) {
        console.error(err.message);
    }
}

function logMessageCount() {
    console.info(Date.now() + ' ' + messagesLastMinuteCount + ' messages per minute');
    $("#messagesPerMinute").text(messagesLastMinuteCount);
    messagesLastMinuteCount = 0;
}

function onConnectSuccess() {
    console.info(Date.now() + ' Connection open. Subscribing to topic ' + topic);
    client.subscribe(topic);
}

function onConnectFailure(response) {
    console.info(Date.now() + ' Connection failed .' + response.errorCode + ": " + response.errorMessage);
}

function addMessage(destination, message) {
    const text = destination + ': ' + message;

    while (lines.length > 100) {
        lines.shift();
    }

    lines.push(text);
}

function updateList() {
    $("#messages").html(lines.join('<br/>'));
}

function updateTopicTemplate() {
    $("#topic").val($("#topic_select").val());
    console.log("updateTopicTemplate changed to " + $("#topic").val());
}

function reconnect() {
    messagesLastMinuteCount = 0;
    $("#messages").html('');
    $("#messagesPerMinute").text(0);
    disconnect();
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

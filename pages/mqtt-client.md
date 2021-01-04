---
layout: mqtt
hero-image: code
permalink: /ohjeita/mqtt-client/
section: Tietolähteet
searchable: true
lang: fi
ref: instructions
title: Sample MQTT client
---

<div>
    Host: <select id="domain" name="domain">
        <option value="tie-test.digitraffic.fi">tie-test.digitraffic.fi</option>
        <option value="tie.digitraffic.fi">tie.digitraffic.fi</option>
        <option value="meri-test.digitraffic.fi">meri-test.digitraffic.fi</option>
        <option value="meri.digitraffic.fi">meri.digitraffic.fi</option>
    </select>
    Topic:
    <input type="text" id="topic" name="topic" value="tms/#">
    <button onclick="updateTopic()"> Connect / Update </button> 
    <button onclick="disconnect()"> Disconnect </button>
</div>

Messages (<span id="messagesPerMinute">0</span> messages per minute):

<pre id="messages" style="font-size: small" ></pre>


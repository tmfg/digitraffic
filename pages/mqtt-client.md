---
layout: mqtt
hero-image: code
permalink: /ohjeita/mqtt-client/
section: Tietolähteet
searchable: true
lang: fi
ref: instructions
title: MQTT client
intro: MQTT client
---

<h2 id="sisalto">Sisältö</h2>

<div>
    <select id="domain" name="domain">
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

Messages (<span id="messagesPerMinute">&lt;counting&gt;</span> messages per minute):

<div id="messages" style="font-size: small" />


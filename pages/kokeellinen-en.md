---
layout: traffictype
permalink: /en/experimental/
section: Tietolähteet
traffictypes: Tieliikenne
searchable: true
hero-image: road
title: Experimental data sources
lang: en
ref: kokeellinen
intro: Data from various experimental road projects
---

Experimental data sources offer data from various projects. The data is open for everyone.
Being experimental means that availability, contents and freshness of data may vary.

Currently there are following experimental sources.

## Nordicway2-notifications

NordicWay 2 aims at enhancing traffic safety through Cooperative Intelligent Transport Systems (C-ITS). The project is European Commission Connecting Europe Facility-funded between 2017 and 2020, and it is implemented by the National Road Authorities of Finland, Norway, Sweden and Denmark as well as private companies and research centres.

In Finland, the Finnish Transport Agency is implementing the NordicWay2 project’s Finnish activities together with the Finnish Transport Safety Agency Trafi. The project is also part of the Finnish Traffic Lab collaboration. The Finnish deployment of the project comprises two activities: the C-ITS deployment pilot and the Arctic Challenge study concerning road transport automation in arctic snowy and icy conditions.

For more information, see [```https://nordicway.net```]

[```https://tie.digitraffic.fi/api/beta/nw2/annotations```](https://tie.digitraffic.fi/api/beta/nw2/annotations)

[```https://tie.digitraffic.fi/api/beta/nw2/annotations?author={author}```](https://tie.digitraffic.fi/api/beta/nw2/annotations?author={author})

Response message contains ongoing notifications in GeoJSON.  You can also limit searching by author.
Notifications have many authors and source must be attributed accordingly:

Source: \<author\> / NordicWay2, CC 4.0 BY

Source: Vaisala Oy / NordicWay2, CC 4.0 BY

Source: InfoTripla Oy / NordicWay2, CC 4.0 BY


## Bridge vibrations

Aurora is a public test ecosystem created to ensure intelligent and automated transport as well as solutions for road maintenance and asset 
management to meet the requirements of all conditions.
A part of Aurora ecosystem is an experiment measuring the vibrations of bridges.

Data is unit-less acceleration values which correspond to measured voltage values from the measurement devices. As such it is suitable for example to
make frequency analysis over time.

Each file contains 1 minute worth of data (32 kHz sample frequency, 4 bytes per sample, little endian, binary).
File name is in the pattern AL1501962095, where A = Identifier of the measurement-card, L = Channel ( L or R ) and 1501962095 = the file create 
time stamp (epoch, seconds).

Average file size is about 7 megabytes.

Data is published once a month around middle of the month.

Listing of available files can be found at:
`http://digitraffic-aurora.s3-website-eu-west-1.amazonaws.com/bridge-vibration/index.txt`

Each file can be loaded from url:
`http://digitraffic-aurora.s3-website-eu-west-1.amazonaws.com/bridge-vibration/{object-name}` , where `{object-name}` is one of the names from `index.txt`
listing.

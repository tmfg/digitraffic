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

Currently there is only one experimental source.

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

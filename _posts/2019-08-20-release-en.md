---
title: 'Rail: station searches can now be filtered with train category'
categories: en News
image: 
lang: en
published: true
ref: 2019-08-20-release-en
traffictypes:
  - Rail
tags:
  - APIs
---

Station searches can now be filtered with train category. This is useful for separating passengers trains from cargo trains

Examples:
* [https://rata.digitraffic.fi/api/v1/live-trains/station/TPE?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=5&include_nonstopping=false&train_categories=Commuter,Long-distance](https://rata.digitraffic.fi/api/v1/live-trains/station/PSL?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=5&include_nonstopping=false&train_categories=Commuter,Long-distance)
* [https://rata.digitraffic.fi/api/v1/live-trains/station/TPE?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=5&include_nonstopping=false&train_categories=Cargo](https://rata.digitraffic.fi/api/v1/live-trains/station/TPE?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=5&include_nonstopping=false&train_categories=Cargo)

List of train categories can be found from [https://rata.digitraffic.fi/api/v1/metadata/train-categories](https://rata.digitraffic.fi/api/v1/metadata/train-categories)

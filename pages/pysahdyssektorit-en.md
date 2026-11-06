---
layout: sub-traffictype
permalink: /en/railway-traffic/stop-sectors/
section: Tietolähteet
traffictypes: Rataliikenne
searchable: true
hero-image: rail
title: Stop sectors
lang: en
ref: stop-sectors
intro: Stop sectors
---

# Stop sectors

The stop sector information tells, for each station, the stop sector where the front of the locomotive stops. With this information and a few other additional details, it is roughly possible to determine where each carriage stops.

## Sectors and subsectors

Sectors are denoted by the letters A, B, C and D. The sectors are divided into subsectors so that A and D have 5 subsectors and the others have 4. In addition, the numbering of A starts from zero and the others from one. Accordingly, the possible sectors are:

A0 A1 A2 A3 A4 B1 B2 B3 B4 C1 C2 C3 C4 D1 D2 D3 D4 D5

Generally speaking, northbound trains travel from the direction of A towards D, and southbound trains from the direction of D towards A.

## Train compositions

In order to calculate the positions of the carriages in the sectors, the relative size of the locomotives and carriages compared to the subsectors must be known. The carriage sizes are as follows:
* IC, P and S: one carriage is the size of one subsector
* Sm1, Sm2 and Sm4: one unit is the size of four subsectors
* Sm5: one unit is the size of six subsectors

## Examples

If a northbound IC train with two carriages stops at C3, the rear of the train is approximately at C1 (2*1 to the left of C3).

If a northbound Sm4 train with 3 units stops at D5, the rear of the train is approximately at B1 (3*4 to the left of D5).

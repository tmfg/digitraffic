#!/bin/bash

bundle install
npm install
npm run dev &

while true
do
 sleep 1
done
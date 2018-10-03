#!/bin/bash

# Signal handler to clean up and exit properly when terminating
trap "echo Exiting...; kill -TERM -1; exit" SIGINT SIGTERM

bundle install
npm install
npm run dev &

while true
do
 sleep 1
done
#!/bin/bash

# Signal handler to clean up and exit properly when terminating
trap "echo Exiting...; kill -TERM -1; exit" SIGINT SIGTERM

echo
echo "Installing/updating required Ruby gems."
bundle install
bundle update

echo
echo "Installing/updating required node packages. Please wait..."
npm install
npm update --save
npm audit
npm audit fix

#bundle exec jekyll serve --config _config_dev.yml --host=0.0.0.0 &
npm run dev &

while true
do
 sleep 1
done
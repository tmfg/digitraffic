#!/bin/sh

# Signal handler to clean up and exit properly when terminating
trap "echo Exiting...; kill -TERM -1; exit" SIGINT SIGTERM

if [ "${SKIP_UPDATE}" != "true" ]
then
    echo
    echo "env SKIP_UPDATE=false"
    echo
    echo "Installing/updating required Ruby gems."
    bundle install
    bundle update

    echo
    echo "Installing/updating required node packages. Please wait..."
    npm install
    npm update --save
    npm audit
    npm audit fix | true

else
    echo
    echo "env SKIP_UPDATE=true. Skipping bundle and npm updates"
fi

npm run dev &

while true
do
 sleep 1
done

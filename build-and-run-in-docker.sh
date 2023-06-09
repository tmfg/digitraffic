#!/bin/bash
export SKIP_UPDATE=true
./build-docker-image.sh
./run-in-docker.sh

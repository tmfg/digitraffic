#!/bin/bash
export SKIP_UPDATE=false
./build-docker-image.sh
./run-in-docker.sh

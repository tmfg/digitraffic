#!/bin/bash
set -e
export SKIP_UPDATE=false
./build-docker-image.sh
./run-in-docker.sh

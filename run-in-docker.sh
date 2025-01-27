#!/bin/bash
rm -rf _site
pnpm install
pnpm build-and-install
docker run --rm --name=digitraffic-pages -e "SKIP_UPDATE=${SKIP_UPDATE}" -p 3000:3000 -p 3001:3001 -v ${PWD}:/app digitraffic-pages:latest

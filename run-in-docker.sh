#!/bin/bash
rm -rf _site node_modules
pnpm install
pnpm build-and-install
# add this to docker command if needed! -e "CI=true"
docker run --rm --name=digitraffic-pages -e "CI=true" -e "SKIP_UPDATE=${SKIP_UPDATE}" -p 3000:3000 -p 3001:3001 -v ${PWD}:/app digitraffic-pages:latest 

#!/bin/bash

# This script builds the website. You can run it locally to generate
# the website and check that it looks good before committing changes.

# Prerequisites:
# - Install GitHub CLI: https://cli.github.com/

npm --prefix ./scripts install

####### Download Phase

if [[ $SKIP_DOWNLOADS != "true" ]]; then
  ./scripts/download-releases.sh --major 1
  ./scripts/download-releases.sh --major 2
  ./scripts/download-releases.sh --major 3
  ./scripts/download-releases.sh --minor 4
else
  echo "Skipping download phase"
fi

####### Process Markdown Phase

node ./scripts/process-releases.js
node ./scripts/process-docusaurus-v3-upgrade.js

####### Data Generation Phase

node ./scripts/build-plugin-list.js
node ./scripts/download-benchmarks.js
node ./scripts/build-static-data.js

####### Build Phase

npm run build

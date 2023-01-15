#!/bin/bash

# This script builds the website. You can run it locally to generate
# the website and check that it looks good before committing changes.

# Prerequisites:
# - Install GitHub CLI: https://cli.github.com/

npm --prefix ./scripts install

####### Download Phase

# TODO download v1
# TODO download v2
# TODO download v3
sh ./scripts/download-releases.sh --minor 4

####### Process Markdown Phase

node ./scripts/process-releases.js

####### Data Generation Phase

node ./scripts/build-plugin-list.js
node ./scripts/download-benchmarks.js
node ./scripts/build-static-data.js

####### Build Phase

npm run build

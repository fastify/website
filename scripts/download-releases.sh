#!/bin/bash

# Usage:
# Downalod all major releases:
# - ./scripts/download-releases.sh --major
# Downalod all greatest minor releases:
# - ./scripts/download-releases.sh --minor 
# Filter by major version:
# - ./scripts/download-releases.sh --minor 4

# Requirements:
# - gh CLI https://cli.github.com/

org="fastify"
repo="$org/fastify"

downloadRelease() {
  outputFile="./downloads/$1.tar.gz"
  gh release download $1 --repo $repo --archive=tar.gz -O $outputFile --skip-existing
  echo "Downloaded $repo > $1"

  mkdir -p "./releases/$1/"
  tar -xzf $outputFile -C "./releases/$1/" --include "*/docs/*" --strip-components=1
}

gh release list --repo $repo --limit 999 --exclude-drafts \
  | cut -f1 \
  | grep "^v[0-9.]*$" > releases.tag

# npm i semver -g > /dev/null
relesesOrderedList=$(npx --yes semver -r ">=1.x" $(cat releases.tag))
printf "%s\n" "${relesesOrderedList[@]}" > releases.tag

mkdir -p downloads

major=1
minor=0
lastItem=none
for i in $relesesOrderedList
do
  currentMajor=$(echo $i | cut -d. -f1)
  currentMinor=$(echo $i | cut -d. -f2)

  if [[ $2 ]] && [[ $currentMajor -ne $2 ]]; then
    continue
  fi

  # echo "compare $i with $major.$minor"
  if ([[ $1 == "--major" ]] && [[ $major -eq $currentMajor ]]) ||
     ([[ $1 == "--minor" ]] && [[ $major -eq $currentMajor ]] && [[ $minor -eq $currentMinor ]]) ; then
    lastItem=$i
    continue
  fi

  if [[ $lastItem != "none" ]]; then
    downloadRelease "v$lastItem"
  fi

  major=$currentMajor
  minor=$currentMinor
  lastItem=$i
done
downloadRelease "v$lastItem"

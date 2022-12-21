#!/bin/bash

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

npm i semver -g > /dev/null
relesesOrderedList=$(semver -r ">=1.x" $(cat releases.tag))

mkdir -p downloads

major=1
minor=0
lastItem=none
for i in $relesesOrderedList
do
  currentMajor=$(echo $i | cut -d. -f1)
  # resp=$(semver -r ">=${major}.${minor}" ${i})

  if [[ $major -eq $currentMajor ]]; then
    lastItem=$i
    continue
  fi
  downloadRelease "v$lastItem"

  major=$currentMajor
  minor=$(echo $i | cut -d. -f2)
done
downloadRelease "v$lastItem"

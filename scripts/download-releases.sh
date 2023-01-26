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

baseDir=$(dirname "$0")
releaseFile="$baseDir/releases.tag"

downloadRelease() {
  outputFile="$baseDir/downloads/$1.tar.gz"
  gh release download "v$1" --repo $repo --archive=tar.gz -O $outputFile --skip-existing
  echo "Downloaded $repo > $1"

  mkdir -p "$baseDir/releases/$1/"
  mkdir -p "$baseDir/downloads/$1/"
  tar -xzf $outputFile -C "$baseDir/downloads/$1/" --strip-components=1
  cp -r "$baseDir/downloads/$1/docs" "$baseDir/releases/$1/docs"
  rm -rf "$baseDir/downloads/$1/"
}

gh release list --repo $repo --limit 999 --exclude-drafts \
  | cut -f1 \
  | grep "^v[0-9.]*$" > $releaseFile

relesesOrderedList=$(npx --yes semver -r ">=1.x" $(cat $releaseFile))
printf "%s\n" "${relesesOrderedList[@]}" > $releaseFile

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
    downloadRelease $lastItem
  fi

  major=$currentMajor
  minor=$currentMinor
  lastItem=$i
done

if [[ $lastItem != "none" ]]; then
  downloadRelease $lastItem
else
  # throw en error
  echo "No release found. Did you run 'gh auth login' ?"
  exit 1
fi

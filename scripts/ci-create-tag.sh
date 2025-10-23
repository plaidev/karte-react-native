#!/bin/bash

set -euo pipefail

# jq is installed in ubuntu-latest.
# https://github.com/actions/runner-images/blob/1627c23669d6709e39919bf795e13f1df19ed849/images/ubuntu/Ubuntu2404-Readme.md?plain=1#L77
PACKAGE_NAME=$(jq -r ".name" package.json)
PACKAGE_VERSION=$(jq -r ".version" package.json)
TAG_NAME="${PACKAGE_NAME}@${PACKAGE_VERSION}"

if git tag -l | grep -q "^${TAG_NAME}$"; then
  echo "Tag $TAG_NAME already exists, skipping"
else
  echo "Creating tag: $TAG_NAME"
  git tag "$TAG_NAME"
fi

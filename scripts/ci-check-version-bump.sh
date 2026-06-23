#!/bin/bash

set -euo pipefail

PKG_NAME=$(jq -r ".name" package.json)
PKG_VERSION=$(jq -r ".version" package.json)
TAG="${PKG_NAME}@${PKG_VERSION}"

echo "Checking: ${TAG}"

# Check if tag exists in public repository
if git ls-remote --tags https://github.com/plaidev/karte-react-native.git "refs/tags/${TAG}" | grep -q .; then
  echo "::warning::${PKG_NAME} has changes but the version was not bumped"
  exit 1
fi

#!/usr/bin/env bash

set -euo pipefail

REPO="https://github.com/nexpid/Themelings"
BRANCH="data"
OUT_DIR="./downloaded"

if [[ -d "$OUT_DIR/.git" ]]; then
  echo "Updating existing clone..."
  git -C "$OUT_DIR" pull --depth=1
else
  git clone --depth=1 --branch "$BRANCH" --single-branch "$REPO" "$OUT_DIR"
fi
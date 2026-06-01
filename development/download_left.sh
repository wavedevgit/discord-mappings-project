#!/usr/bin/env bash

set -euo pipefail

BASE_URL="https://raw.githubusercontent.com/nexpid/Themelings/data/source"
OUT_DIR="./downloaded"
NO_REDOWNLOAD=false

for arg in "$@"; do
  [[ "$arg" == "--nr" ]] && NO_REDOWNLOAD=true
done

mkdir -p "$OUT_DIR"

download_file() {
  local path="$1"
  local no_redownload="$2"
  local url="$BASE_URL/$path"
  local dest="$OUT_DIR/$path"

  if [[ "$no_redownload" == "true" && -f "$dest" ]]; then
    echo "Skip: $path"
    return
  fi

  mkdir -p "$(dirname "$dest")"
  echo "Downloading: $url"
  curl -fsSL "$url" -o "$dest" || echo "Failed: $path"
}

export BASE_URL OUT_DIR
export -f download_file

grep -v '^$' ../data/left.txt | \
  xargs -P 16 -I {} bash -c 'download_file "$@"' _ {} "$NO_REDOWNLOAD"
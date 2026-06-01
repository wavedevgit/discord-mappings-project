#!/usr/bin/env bash

set -euo pipefail

BASE_URL="https://raw.githubusercontent.com/nexpid/Themelings/data/source"
OUT_DIR="./downloaded"

mkdir -p "$OUT_DIR"

while IFS= read -r path || [ -n "$path" ]; do
    # skip empty lines / trash
    [[ -z "$path" ]] && continue

    url="$BASE_URL/$path"
    dest="$OUT_DIR/$path"

    mkdir -p "$(dirname "$dest")"

    echo "Downloading: $url"

    # curl is just built-in-in-spirit on linux systems at this point
    curl -fsSL "$url" -o "$dest" || {
        echo "Failed: $path"
    }

done < ../data/left.txt
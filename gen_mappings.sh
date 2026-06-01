#!/bin/bash

git clone --depth=1 https://github.com/Wumpus-Central/discrapper-canary

node scripts/generate_mappings_paths_assets_android.js
node scripts/generate_mappings_paths_assets_ios.js
node scripts/generate_hashes_client.js
node scripts/generate_list_of_done.js
node src/main.js
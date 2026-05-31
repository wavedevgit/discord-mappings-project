import fs from 'fs/promises';

// you need download latest ipa and extract manifest.json to ./ios_manifest.json
const manifest = JSON.parse(await fs.readFile('./ios_manifest.json', 'utf-8'));
const result = [];

for (let asset of Object.entries(manifest.hashes)) {
    result.push({ path: asset[0], hash: asset[1] });
}

await fs.writeFile(
    './data/files/assets_ios.json',
    JSON.stringify(result, null, 4),
    'utf-8',
);

import fs from 'fs/promises';

// thanks nexpid for providing maintained data
const BASE_URL =
    'https://raw.githubusercontent.com/nexpid/Themelings/refs/heads/data';
const MAIN_SOURCE = BASE_URL.concat('/source.jsonl');

// thanks to wavedev (me) for providing maintained data.
const ANDROID_MANIFST_URL =
    'https://discord-versions.pages.dev/android/alpha.json';

const get = async (url) => await (await fetch(url)).text();

const data = JSON.parse(
    '[' + (await get(MAIN_SOURCE)).trim().split('\n').join(',') + ']',
);

await fs.writeFile(
    './data/files/src_names_android.json',
    JSON.stringify(data, null, 4),
    'utf-8',
);

const result = [];

for (const item of data) {
    // only discord_assets have extractable matcher
    if (item.file.startsWith('discord_assets')) {
        console.log('at', item.file);
        const content = await get(BASE_URL.concat('/source/', item.file));
        let res = {
            path: item.file,
            url: content.match(
                /('|")(?<url>https:\/\/cdn\.discordapp\.com\/assets\/content\/[a-fA-F0-9]+\.[\s\S]+?)('|")/,
            ).groups?.url,
        };
        res.etag = await (
            await fetch(res.url, { method: 'HEAD' })
        ).headers.get('etag');
        result.push(res);
    }
}

const { rawManifest: manifest } = JSON.parse(await get(ANDROID_MANIFST_URL));

for (let asset of Object.entries(manifest.hashes)) {
    result.push({ path: asset[0], hash: asset[1] });
}
result.map(
    (item) => (item.hash ??= item?.url?.match?.(/([a-fA-F0-9]+)\./)?.[1]),
);

await fs.writeFile(
    './data/files/assets_android.json',
    JSON.stringify(result, null, 4),
    'utf-8',
);

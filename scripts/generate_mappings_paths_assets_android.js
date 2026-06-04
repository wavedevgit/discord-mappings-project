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
const experiments = [];
const actions = [];

for (const item of data) {
    // only discord_assets have extractable matcher
    if (
        item.file.startsWith('discord_assets') &&
        process.argv?.[2] !== 'only-experiments'
    ) {
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
    if (item.file.endsWith('Experiment.tsx')) {
        const content = await get(BASE_URL.concat('/source/', item.file));
        let res = {
            path: item.file,
            kind: content.match(
                /('|")(kind)('|"):\s*('|")(?<kind>(user|guild))'/,
            )?.groups?.kind,
            id: content.match(
                /('|")(name|id)('|"):\s*('|")(?<id>\d{4}(-|_)\d+[\s\S]+?)'/,
            )?.groups?.id,
            keyRequired: content.includes('treatments')
                ? 'treatments'
                : 'variations',
        };
        experiments.push(res);
    }
    // actions, uses endpoints used and methods
    if (item.file.endsWith('ActivitiesActionCreators.tsx')) {
        const content = (
            await get(BASE_URL.concat('/source/', item.file))
        ).split('\n');
        let res = { path: item.file, flux_events: [] };
        let event = { type: null, var: null };
        let isStartOfDispatch = false;
        for (let i = 0; i < content.length; i++) {
            const line = content[i];
            if (line.includes('.dispatch;')) {
                isStartOfDispatch = true;
                continue;
            }
            const string = line.match(
                /(?<var>var\d+)\s*=\s*["'](?<value>[A-Z_]+)["']/,
            )?.groups;
            if (isStartOfDispatch && string) {
                event.var = string.var;
                event.type = string.value;
                continue;
            }
            const typeSetTo = line.match(
                /var\d+\[['|"]type['|"]\]\s*=\s*(var\d+)/,
            )?.[1];

            if (!!typeSetTo && typeSetTo === event.var) {
                isStartOfDispatch = false;
                res.flux_events.push(event.type);
                event = { type: null, var: null };
            }
        }

        if (res.flux_events.length !== 0)
            actions.push({
                path: res.path,
                flux_events: res.flux_events
                    .sort((a, b) => b.length - a.length)
                    .slice(0, 5),
            });
    }
}

const { rawManifest: manifest } = JSON.parse(await get(ANDROID_MANIFST_URL));

for (let asset of Object.entries(manifest.hashes)) {
    result.push({ path: asset[0], hash: asset[1] });
}
result.map(
    (item) => (item.hash ??= item?.url?.match?.(/([a-fA-F0-9]+)\./)?.[1]),
);

if (process.argv?.[2] !== 'only-experiments')
    await fs.writeFile(
        './data/files/assets_android.json',
        JSON.stringify(result, null, 4),
        'utf-8',
    );

await fs.writeFile(
    './data/files/experiments_android.json',
    JSON.stringify(experiments, null, 4),
    'utf-8',
);
await fs.writeFile(
    './data/files/actions_android.json',
    JSON.stringify(experiments, null, 4),
    'utf-8',
);

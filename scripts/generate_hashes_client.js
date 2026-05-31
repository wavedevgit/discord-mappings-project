import fs from 'fs/promises';
import path from 'path';

const base = './discrapper-canary';
const chunksFolder = path.join(base, 'chunks');
const PROGRESS_FILE = './data/files/client_hashes_progress.json';
const OUTPUT_FILE = './data/files/client_hashes.json';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res;
        } catch (err) {
            if (i === retries - 1) throw err;
            console.log(`retry ${i + 1}/${retries} for ${url}`);
            await new Promise((r) => setTimeout(r, RETRY_DELAY * (i + 1)));
        }
    }
}

// load saved progress
let progress = {};
try {
    progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf-8'));
    console.log(`resumed with ${Object.keys(progress).length} cached`);
} catch {
    /* fresh start */
}

const chunks = await fs.readdir(chunksFolder);
const hashes = [];

for (let chunk of chunks) {
    const content = await fs.readFile(path.join(chunksFolder, chunk), 'utf-8');
    const asset = content.match(
        /\w+\.exports\s*=\s*(\w+\.p\s*\+\s*|)\s*("|')(?<path>(\/assets\/|)[a-f0-9A-F]+\.\w+?)("|')/,
    )?.groups?.path;

    if (asset) {
        const url =
            'https://canary.discord.com' +
            (asset.startsWith('/assets/') ? asset : '/assets/' + asset);

        if (progress[url]) {
            hashes.push({ url, etag: progress[url] });
            continue;
        }

        try {
            const etag = (
                await fetchWithRetry(url, { method: 'HEAD' })
            ).headers.get('etag');
            progress[url] = etag;
            hashes.push({ url, etag });
            await fs.writeFile(
                PROGRESS_FILE,
                JSON.stringify(progress, null, 4),
                'utf-8',
            );
        } catch (err) {
            console.error(`failed ${url}:`, err.message);
        }
    }
}

await fs.writeFile(OUTPUT_FILE, JSON.stringify(hashes, null, 4), 'utf-8');
// cleanup progress file
await fs.unlink(PROGRESS_FILE).catch(() => {});
console.log(`done. ${hashes.length} assets`);

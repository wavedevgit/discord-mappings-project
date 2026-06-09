import fs from 'fs/promises';

// thanks nexpid for providing maintained data
const BASE_URL =
    'https://raw.githubusercontent.com/nexpid/Themelings/refs/heads/data';
const MAIN_SOURCE = BASE_URL.concat('/source.jsonl');

// thanks to wavedev (me) for providing maintained data.
const ANDROID_MANIFEST_URL =
    'https://discord-versions.pages.dev/android/alpha.json';

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const DATA_PATH = './data/tracked_files.json';

if (!WEBHOOK_URL) {
    console.error('WEBHOOK_URL env not set');
    process.exit(1);
}

const get = async (url) => await (await fetch(url)).text();

// --- load previous state ---
let previousState = { build: null, files: {} };
try {
    previousState = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));
} catch {
    console.log('No previous state — first run, seeding.');
}

// --- fetch current data ---
const [sourceRaw, manifestRaw] = await Promise.all([
    get(MAIN_SOURCE),
    get(ANDROID_MANIFEST_URL),
]);

const { rawManifest: manifest } = JSON.parse(manifestRaw);
const currentBuild = manifest.metadata.build;
const currentCommit = manifest.metadata.commit;

/** @type {{ file: string, size: number }[]} */
const sourceFiles = JSON.parse(
    '[' + sourceRaw.trim().split('\n').join(',') + ']',
);

/** @type {Record<string, number>} file -> size */
const currentFiles = Object.fromEntries(
    sourceFiles.map((f) => [f.file, f.size]),
);

// --- manifest assets (new drawable/bundle hashes) ---
const manifestAssets = Object.keys(manifest.hashes);

// --- diff source files ---
const prevFiles = previousState.files ?? {};
const prevManifest = previousState.manifestAssets ?? [];

const newSourceFiles = sourceFiles.filter((f) => !(f.file in prevFiles));
const removedSourceFiles = Object.keys(prevFiles).filter(
    (f) => !(f in currentFiles),
);
const sizeChangedFiles = sourceFiles.filter(
    (f) => f.file in prevFiles && prevFiles[f.file] !== f.size,
);

// --- diff manifest assets ---
const newManifestAssets = manifestAssets.filter(
    (a) => !prevManifest.includes(a),
);
const removedManifestAssets = prevManifest.filter(
    (a) => !manifestAssets.includes(a),
);

const hasChanges =
    newSourceFiles.length ||
    removedSourceFiles.length ||
    sizeChangedFiles.length ||
    newManifestAssets.length ||
    removedManifestAssets.length;

if (!hasChanges) {
    console.log(`No changes. Build ${currentBuild}`);
    process.exit(0);
}

// --- build embed ---
const buildChanged = previousState.build !== currentBuild;

const truncate = (arr, limit = 20) => {
    const slice = arr.slice(0, limit);
    const extra = arr.length - limit;
    if (extra > 0) slice.push(`*...and ${extra} more*`);
    return slice;
};

const fields = [];

if (newSourceFiles.length) {
    fields.push({
        name: `🆕 New Source Files (${newSourceFiles.length})`,
        value: truncate(
            newSourceFiles.map(
                (f) => `\`${f.file}\` (${(f.size / 1024).toFixed(1)}kb)`,
            ),
        ).join('\n'),
        inline: false,
    });
}

if (removedSourceFiles.length) {
    fields.push({
        name: `🗑️ Removed Source Files (${removedSourceFiles.length})`,
        value: truncate(removedSourceFiles.map((f) => `\`${f}\``)).join('\n'),
        inline: false,
    });
}

if (sizeChangedFiles.length) {
    fields.push({
        name: `📦 Size Changed (${sizeChangedFiles.length})`,
        value: truncate(
            sizeChangedFiles.map(
                (f) =>
                    `\`${f.file}\` ${(prevFiles[f.file] / 1024).toFixed(1)}kb → ${(f.size / 1024).toFixed(1)}kb`,
            ),
        ).join('\n'),
        inline: false,
    });
}

if (newManifestAssets.length) {
    fields.push({
        name: `🖼️ New Manifest Assets (${newManifestAssets.length})`,
        value: truncate(newManifestAssets.map((a) => `\`${a}\``)).join('\n'),
        inline: false,
    });
}

if (removedManifestAssets.length) {
    fields.push({
        name: `❌ Removed Manifest Assets (${removedManifestAssets.length})`,
        value: truncate(removedManifestAssets.map((a) => `\`${a}\``)).join(
            '\n',
        ),
        inline: false,
    });
}

const embed = {
    title: `Discord Asset Diff — Build ${currentBuild}${buildChanged ? ' 🔼' : ''}`,
    description: [
        `**Commit:** \`${currentCommit.slice(0, 12)}\``,
        buildChanged
            ? `**Build:** \`${previousState.build}\` → \`${currentBuild}\``
            : '',
    ]
        .filter(Boolean)
        .join('\n'),
    color: 0x5865f2,
    fields,
    timestamp: new Date().toISOString(),
    footer: { text: 'wavedev asset tracker' },
};

const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
});

if (!res.ok) {
    const text = await res.text();
    console.error(`Webhook failed ${res.status}: ${text}`);
    process.exit(1);
}

console.log(
    `Posted diff. Build ${currentBuild}, ${newSourceFiles.length} new, ${removedSourceFiles.length} removed.`,
);

// --- save new state ---
await fs.mkdir('./data', { recursive: true });
await fs.writeFile(
    DATA_PATH,
    JSON.stringify(
        {
            build: currentBuild,
            commit: currentCommit,
            files: currentFiles,
            manifestAssets,
        },
        null,
        2,
    ),
);

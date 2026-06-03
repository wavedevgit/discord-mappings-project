import fs from 'fs/promises';
import path from 'path';

const dir = process.argv[2];

if (!dir) {
    console.error('Usage: node script.js <directory>');
    process.exit(1);
}

async function getFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
        entries.map(async (entry) => {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) return getFiles(full);
            return full;
        }),
    );

    return files.flat();
}

function isValidString(str) {
    return str === str.toLowerCase() || str === str.toUpperCase();
}

function isUpperKey(key) {
    return /^[A-Z0-9_]+$/.test(key);
}
function extractFinders(source) {
    const lines = source.split('\n');
    const finders = [];

    for (const line of lines) {
        // 'ac_create' or "ac_create"
        const assign = line.match(/=\s*['"]([^'"]+)['"]\s*;?/);
        if (assign) {
            const value = assign[1];

            if (isValidString(value)) {
                finders.push(value);
            }
            continue;
        }

        // ['CREATE'] = something OR ["CREATE"] = something
        const map = line.match(/\[['"]([^'"]+)['"]\]\s*=\s*.+/);
        if (map) {
            const key = map[1];

            if (isUpperKey(key)) {
                finders.push(key);
            }
        }
    }

    return finders;
}
const files = await getFiles(dir);

const result = [];

for (const file of files) {
    try {
        const content = await fs.readFile(file, 'utf8');
        const finders = extractFinders(content);

        if (!finders.length) continue;
        result.push({
            find_with: finders,
            paths: [path.relative(process.cwd(), file)],
        });
    } catch (e) {
        console.error('failed:', file, e);
    }
}

console.log(JSON.stringify(result, null, 4));

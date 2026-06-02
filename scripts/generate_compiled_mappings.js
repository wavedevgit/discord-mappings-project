import fs from 'fs/promises';
import mappings from '../mappings/paths.js';

const compiled = [];
for (const item of mappings) {
    const compileFindWith = (findWith) => {
        if (typeof findWith === 'string') return findWith;
        if (Array.isArray(findWith)) return findWith.map(compileFindWith);
        if (findWith instanceof RegExp)
            return {
                type: 'regexp',
                value: findWith.source,
                flags: findWith.flags,
            };
        return findWith;
    };

    compiled.push({
        paths: item.paths,
        find_with: compileFindWith(item.find_with),
    });
}

await fs.writeFile(
    './mappings/paths.compiled.json',
    JSON.stringify(compiled, null, 4),
);

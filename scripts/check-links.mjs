#!/usr/bin/env node
/**
 * Internal link & asset checker for the static site (no dependencies).
 * - Verifies local href/src files exist (ignores http(s), mailto, tel, data URIs).
 * - Verifies every in-page #anchor points at an element with that id.
 * Exits 1 on any broken local reference.
 *
 * Usage:  node scripts/check-links.mjs [index.html ...]   (defaults to index.html, 404.html)
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const files = process.argv.slice(2);
const targets = files.length ? files : ['index.html', '404.html'];

let broken = [];

for (const page of targets) {
    if (!existsSync(page)) { broken.push(`${page}: page not found`); continue; }
    const html = readFileSync(page, 'utf8');
    const base = dirname(page);

    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
    const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m => m[1]);

    for (const raw of refs) {
        const ref = raw.trim();
        if (/^(https?:|mailto:|tel:|data:|javascript:|\/|#)/i.test(ref) === false) {
            // relative local file reference — strip query/hash, decode %20 etc.
            // (root-absolute "/..." paths depend on the Pages base path, so skip them.)
            const path = decodeURIComponent(ref.split('#')[0].split('?')[0]);
            if (!path) continue;
            const resolved = normalize(join(base, path));
            if (!existsSync(resolved)) broken.push(`${page}: missing file -> ${ref}`);
        } else if (ref.startsWith('#') && ref.length > 1) {
            if (!ids.has(ref.slice(1))) broken.push(`${page}: dangling anchor -> ${ref}`);
        }
    }
}

if (broken.length) {
    console.error(`\nFAIL: ${broken.length} broken internal reference(s):`);
    for (const b of broken) console.error('  ' + b);
    process.exit(1);
}
console.log('Link check passed: all local files and in-page anchors resolve.');

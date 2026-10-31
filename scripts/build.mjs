#!/usr/bin/env node
/**
 * Build the deployable site into dist/ (no dependencies).
 *
 * Copies ONLY shippable files — never audit.md / open-questions.md / scripts /
 * .github — so internal docs are not published. Folders (docs/, thumbs/, images/)
 * are copied if present; they are optional until the owner adds the binaries.
 *
 * Usage:  node scripts/build.mjs
 */
import { readdirSync, statSync, mkdirSync, copyFileSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

// Top-level files that make up the deployable site.
const FILES = [
    'index.html', '404.html', 'style.css', 'script.js', 'data.js',
    'robots.txt', 'sitemap.xml', '.nojekyll',
    'manifest.json', 'CV.pdf'
];
// Asset folders copied wholesale if they exist.
const DIRS = ['docs', 'thumbs', 'images'];
// Legacy single asset (fallback portrait) copied if still present.
const OPTIONAL_FILES = ['My Picture.jpg'];

function copyDir(src, dest) {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
        const s = join(src, entry), d = join(dest, entry);
        if (statSync(s).isDirectory()) copyDir(s, d);
        else copyFileSync(s, d);
    }
}
function copyFile(name) {
    const src = join(ROOT, name);
    if (!existsSync(src)) return false;
    const dest = join(DIST, name);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    return true;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const copied = [];
for (const f of [...FILES, ...OPTIONAL_FILES]) if (copyFile(f)) copied.push(f);
for (const dir of DIRS) {
    const src = join(ROOT, dir);
    if (existsSync(src)) { copyDir(src, join(DIST, dir)); copied.push(dir + '/'); }
}

console.log('Built dist/ with:', copied.join(', ') || '(nothing)');
const missing = FILES.filter(f => !existsSync(join(ROOT, f)));
if (missing.length) console.log('Note (not yet present, will be included once added):', missing.join(', '));

// Prerender dynamic sections into dist/index.html for no-JS visibility.
await import('./prerender.mjs');

// Content-hash cache-busting: rewrite ?v=... on local css/js to a hash of their
// bytes, so a changed asset always busts the cache and an unchanged one doesn't.
{
    const { createHash } = await import('node:crypto');
    const hash = f => existsSync(join(DIST, f))
        ? createHash('sha1').update(readFileSync(join(DIST, f))).digest('hex').slice(0, 10)
        : null;
    const idx = join(DIST, 'index.html');
    if (existsSync(idx)) {
        let html = readFileSync(idx, 'utf8');
        for (const asset of ['style.css', 'script.js', 'data.js']) {
            const h = hash(asset);
            if (!h) continue;
            const re = new RegExp(`(${asset.replace('.', '\\.')})\\?v=[^"']*`, 'g');
            html = html.replace(re, `$1?v=${h}`);
            // Also hash assets that currently have no ?v= (defensive).
            html = html.replace(new RegExp(`(["'])(${asset.replace('.', '\\.')})(["'])`, 'g'), `$1$2?v=${h}$3`);
        }
        writeFileSync(idx, html);
        console.log('Applied content-hash cache-busting to dist/index.html');
    }
}

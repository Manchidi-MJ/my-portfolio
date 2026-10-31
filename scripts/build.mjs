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
import { readdirSync, statSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

// Top-level files that make up the deployable site.
const FILES = [
    'index.html', '404.html', 'style.css', 'script.js',
    'robots.txt', 'sitemap.xml', '.nojekyll',
    'projects.js', 'manifest.json', 'CV.pdf'
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

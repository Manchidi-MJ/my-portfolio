#!/usr/bin/env node
/**
 * Content & privacy guard for the portfolio (no dependencies).
 *
 * This file NEVER contains the private values it protects (the repo is public).
 * Exact patterns are loaded from OUTSIDE the repo:
 *   a) locally:  a gitignored file  .privacy-patterns  (one regex per line, # comments ok)
 *   b) in CI:    the env var  PRIVACY_PATTERNS  (newline-separated regexes), set from a
 *                GitHub Actions secret of the same name.
 * If neither source is present, the build does NOT fail just for that — the generic
 * rules below still run, and a clear warning is printed.
 *
 * Generic rules (no secrets needed): flag any international-style phone number such as
 * +27 or +49 (or any +NN) followed by 8 or more digits, in text files and PDF text.
 *
 * WARN by default on unresolved [CONFIRM] markers. Pass --strict (or set
 * CONTENT_CHECK_STRICT=1) to make [CONFIRM] a hard failure too.
 *
 * Usage:  node scripts/check-content.mjs [--strict]
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const STRICT = process.argv.includes('--strict') || process.env.CONTENT_CHECK_STRICT === '1';

const TEXT_EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.yml', '.yaml', '.svg', '.md']);
const SKIP_DIRS = new Set(['.git', 'node_modules', '.github']);
const SKIP_FILES = new Set();

// Generic, secret-free rules. Always active.
//   - international phone: a "+" country code then 8+ digits, allowing spaces/dots/dashes
//     between groups (e.g. "+27 00 000 0000", "+491512345678").
export const GENERIC = [
    {
        name: 'international phone number',
        re: /\+\d{1,3}(?:[\s.\-]?\d){8,}/,
    },
];

/** Parse newline-separated regex sources into {name, re} objects. */
function parsePatterns(text, source) {
    const out = [];
    for (const raw of text.split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        try {
            out.push({ name: `private pattern (${source})`, re: new RegExp(line) });
        } catch {
            console.warn(`  (skipped invalid regex in ${source}: ${line.slice(0, 40)})`);
        }
    }
    return out;
}

/** Load private patterns from the env secret or the local gitignored file. */
function loadPrivatePatterns() {
    if (process.env.PRIVACY_PATTERNS && process.env.PRIVACY_PATTERNS.trim()) {
        return { patterns: parsePatterns(process.env.PRIVACY_PATTERNS, 'env'), source: 'PRIVACY_PATTERNS env' };
    }
    const file = join(ROOT, '.privacy-patterns');
    if (existsSync(file)) {
        return { patterns: parsePatterns(readFileSync(file, 'utf8'), '.privacy-patterns'), source: '.privacy-patterns file' };
    }
    return { patterns: [], source: null };
}

function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (SKIP_DIRS.has(entry)) continue;
        const st = statSync(full);
        if (st.isDirectory()) walk(full, out);
        else if (TEXT_EXT.has(extname(entry))) out.push(full);
    }
    return out;
}

/**
 * Emit the combined set of regex sources (private + generic) as newline-separated
 * strings. Used by CI's PDF scan to share one source of truth. Only generic rules
 * are emitted when no private patterns are available.
 */
export function regexSources() {
    const { patterns } = loadPrivatePatterns();
    return [...patterns, ...GENERIC].map((r) => r.re.source);
}

// `--print-regex` lets shell scripts (CI) read the ERE alternation on stdout
// without hard-coding any value. Prints and exits before the scan runs.
if (process.argv.includes('--print-regex')) {
    process.stdout.write(regexSources().join('|'));
    process.exit(0);
}

const { patterns: privatePatterns, source } = loadPrivatePatterns();
if (source) {
    console.log(`Privacy: loaded ${privatePatterns.length} private pattern(s) from ${source}.`);
} else {
    console.warn(
        'Privacy: no PRIVACY_PATTERNS env or .privacy-patterns file found — ' +
        'running generic rules only (this is not a failure).'
    );
}
const RULES = [...privatePatterns, ...GENERIC];

let hardFindings = [];
let confirmFindings = [];

for (const file of walk(ROOT)) {
    if (file.endsWith(join('scripts', 'check-content.mjs'))) continue;
    const rel = file.slice(ROOT.length + 1);
    if (SKIP_FILES.has(rel)) continue;
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
        for (const f of RULES) {
            if (f.re.test(line)) hardFindings.push({ rel, n: i + 1, what: f.name, line: line.trim().slice(0, 120) });
        }
        if (line.includes('[CONFIRM]')) confirmFindings.push({ rel, n: i + 1, line: line.trim().slice(0, 120) });
    });
}

const plural = (n, s) => `${n} ${s}${n === 1 ? '' : 's'}`;

if (confirmFindings.length) {
    const label = STRICT ? 'ERROR' : 'WARN';
    console.log(`\n${label}: ${plural(confirmFindings.length, 'unresolved [CONFIRM] marker')}:`);
    for (const c of confirmFindings) console.log(`  ${c.rel}:${c.n}  ${c.line}`);
}

if (hardFindings.length) {
    console.error(`\nFAIL: ${plural(hardFindings.length, 'forbidden value')} found (privacy):`);
    for (const h of hardFindings) console.error(`  ${h.rel}:${h.n}  [${h.what}]  ${h.line}`);
}

const failed = hardFindings.length > 0 || (STRICT && confirmFindings.length > 0);
if (failed) {
    console.error('\nContent check FAILED.');
    process.exit(1);
}
console.log(`\nContent check passed (${STRICT ? 'strict' : 'non-strict'}): no forbidden values${STRICT ? ' and no [CONFIRM] markers' : ''}.`);

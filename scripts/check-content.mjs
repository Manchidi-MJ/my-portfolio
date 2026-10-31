#!/usr/bin/env node
/**
 * Content & privacy guard for the portfolio (no dependencies).
 *
 * HARD FAIL (exit 1) if any of these appear in tracked site text files:
 *   - the student number 202038089
 *   - the phone number in any common form (+27 68 187 7663 / 068 187 7663 / 681877663)
 *
 * WARN by default on unresolved [CONFIRM] markers. Pass --strict (or set
 * CONTENT_CHECK_STRICT=1) to make [CONFIRM] a hard failure too — flip this on
 * once the placeholders have been resolved.
 *
 * Usage:  node scripts/check-content.mjs [--strict]
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const STRICT = process.argv.includes('--strict') || process.env.CONTENT_CHECK_STRICT === '1';

const TEXT_EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.yml', '.yaml', '.svg']);
const SKIP_DIRS = new Set(['.git', 'node_modules', '.github']);

// Documentation that intentionally *describes* the forbidden values (the audit,
// the open-questions log and the README's privacy instructions). These are not
// shipped site content, so they are exempt from the privacy scan. All other
// files — including every .html/.css/.js that renders the site — are scanned.
// NOTE: .md is deliberately omitted from TEXT_EXT so docs aren't scanned; if you
// add Markdown that becomes *published content*, scan it explicitly instead.
const SKIP_FILES = new Set(['audit.md', 'open-questions.md', 'README.md']);

// Hard-fail patterns. Phone variants cover spacing, +27 vs 0, and bare digits.
const FORBIDDEN = [
    { name: 'student number (202038089)', re: /202038089/ },
    { name: 'phone number', re: /(\+?27|0)\s*6?8[\s.-]*187[\s.-]*7663|681877663/ }
];

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

let hardFindings = [];
let confirmFindings = [];

for (const file of walk(ROOT)) {
    // Don't scan this checker itself (it necessarily contains the patterns).
    if (file.endsWith(join('scripts', 'check-content.mjs'))) continue;
    const rel = file.slice(ROOT.length + 1);
    if (SKIP_FILES.has(rel)) continue;
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
        for (const f of FORBIDDEN) {
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

#!/usr/bin/env node
/**
 * Prerender dynamic sections into dist/index.html so content is visible without
 * JavaScript. Reads data.js (the shared source of truth) in a Node sandbox and
 * injects static HTML into the known container elements. script.js later
 * re-renders the same containers on top (progressive enhancement).
 *
 * Run by scripts/build.mjs after dist/ is assembled.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createContext, runInContext } from 'node:vm';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

// Load data.js as a classic script in a sandbox → sandbox.window.PORTFOLIO.
function loadData() {
    const code = readFileSync(join(ROOT, 'data.js'), 'utf8');
    const sandbox = { window: {}, globalThis: {} };
    createContext(sandbox);
    runInContext(code, sandbox);
    return sandbox.window.PORTFOLIO || sandbox.globalThis.PORTFOLIO;
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

function statusBadge(status, STATUS_META) {
    const m = STATUS_META[status];
    if (!m) return '';
    return `<span class="status-badge ${m.cls}"><i class="fas ${m.icon}" aria-hidden="true"></i> ${esc(m.label)}</span>`;
}

function renderServices(D) {
    return D.SERVICES.map(s => `
        <article class="service-card">
            <div class="service-ico"><i class="fas ${s.icon}" aria-hidden="true"></i></div>
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.text)}</p>
        </article>`).join('');
}
function renderInterests(D) {
    return D.INTERESTS.map(i => `<span class="interest-tag">${esc(i)}</span>`).join('');
}
function renderSkills(D) {
    return D.SKILLS.map(s => `
        <div class="skill-card">
            <h4><i class="fas ${s.icon}" aria-hidden="true"></i> ${esc(s.cat)}</h4>
            <div class="skill-tags">${s.items.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>`).join('');
}
function renderResearch(D) {
    return D.RESEARCH.map(r => `
        <div class="research-card">
            <h4>${esc(r.title)}</h4>
            <p>${esc(r.desc)}</p>
            <div class="tag-row">${r.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        </div>`).join('');
}
function sortYear(d) { const m = String(d).match(/\d{4}/g); return m ? Math.max(...m.map(Number)) : 0; }
function renderProjects(D) {
    const list = D.PROJECTS.slice().sort((a, b) => {
        if ((!!b.featured) - (!!a.featured)) return (!!b.featured) - (!!a.featured);
        return sortYear(b.date) - sortYear(a.date);
    });
    return list.map(p => {
        const links = [];
        if (p.repo) links.push(`<a href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i> Code</a>`);
        return `
        <article class="project-card" data-id="${esc(p.id)}" tabindex="0" role="button" aria-label="Open case study: ${esc(p.title)}">
            <div class="project-thumb" style="background:${p.grad}">
                <i class="fas ${p.icon}" aria-hidden="true"></i>
                ${p.featured ? '<span class="featured-ribbon"><i class="fas fa-star" aria-hidden="true"></i> Featured</span>' : ''}
                <span class="cat-label">${esc(p.type)}</span>
            </div>
            <div class="project-body">
                <h3>${esc(p.title)}</h3>
                <div class="project-sub"><span class="project-date">${esc(p.date)}</span>${statusBadge(p.status, D.STATUS_META)}</div>
                <p class="project-desc">${esc(p.desc)}</p>
                <div class="project-tags">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
                <div class="project-foot">
                    <div class="project-links">${links.join('')}</div>
                    <span class="case-link">Case study <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </div>
            </div>
        </article>`;
    }).join('');
}
function renderDocs(D) {
    return D.DOCUMENTS.map(d => {
        const title = esc(d.title);
        const thumb = d.thumb
            ? `<img class="doc-thumb" src="${esc(d.thumb)}" alt="First page of ${title}" width="56" height="79" loading="lazy" decoding="async" />`
            : `<span class="doc-thumb doc-thumb-ph" aria-hidden="true"><i class="fas fa-file-pdf"></i></span>`;
        const access = d.status === 'available' && d.file
            ? `<a class="doc-link" href="${esc(d.file)}" target="_blank" rel="noopener"><i class="fas fa-eye" aria-hidden="true"></i> View</a> <a class="doc-link" href="${esc(d.file)}" download><i class="fas fa-download" aria-hidden="true"></i> Download</a>`
            : `<a class="doc-link request" href="mailto:johnmanchidi@gmail.com?subject=${encodeURIComponent('Request for full report: ' + d.title)}"><i class="fas fa-envelope" aria-hidden="true"></i> Request full report</a>`;
        return `<tr>
            <td data-th="Preview" class="docs-thumb-col">${thumb}</td>
            <td data-th="Title">${title}</td>
            <td data-th="Course">${esc(d.course)}</td>
            <td data-th="Date">${esc(d.date)}</td>
            <td data-th="Pages">${esc(d.pages) || '—'}</td>
            <td data-th="Size">${esc(d.size) || '—'}</td>
            <td data-th="Access" class="doc-access">${access}</td>
        </tr>`;
    }).join('');
}

// Replace the inner HTML of <tag ... id="ID" ...> ... </tag> with `html`.
function injectById(doc, id, html) {
    const re = new RegExp(`(<(\\w+)[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(</\\2>)`);
    if (!re.test(doc)) { console.warn('prerender: container not found for #' + id); return doc; }
    return doc.replace(re, (_, open, _tag, _inner, close) => open + '\n' + html + '\n' + close);
}

const D = loadData();
const file = join(DIST, 'index.html');
let html = readFileSync(file, 'utf8');

html = injectById(html, 'servicesGrid', renderServices(D));
html = injectById(html, 'interestTags', renderInterests(D));
html = injectById(html, 'skillsGrid', renderSkills(D));
html = injectById(html, 'researchGrid', renderResearch(D));
html = injectById(html, 'projectsContainer', renderProjects(D));
html = injectById(html, 'docsBody', renderDocs(D));

writeFileSync(file, html);
console.log('Prerendered services, interests, skills, research, projects and documents into dist/index.html');

/* =========================================================
   Magaseng John Manchidi — Portfolio logic
   Pure vanilla JS. No build step. Progressive enhancement:
   content remains usable if any single module fails.
   ========================================================= */
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Enable reveal animations only when JS is running. Without this class,
// `.reveal` elements stay fully visible, so the page can never render blank
// if JavaScript is disabled or fails to execute.
document.documentElement.classList.add('js-reveal');

/* ---------------------------------------------------------
   DATA — loaded from data.js (window.PORTFOLIO), the single
   source of truth shared with the build-time prerenderer.
   If data.js failed to load, fall back to an empty shape so
   the page still renders (modules guard on empty arrays).
--------------------------------------------------------- */
const PORTFOLIO = window.PORTFOLIO || {};
const INTERESTS    = PORTFOLIO.INTERESTS    || [];
const SKILLS       = PORTFOLIO.SKILLS       || [];
const PROJECTS     = PORTFOLIO.PROJECTS     || [];
const RESEARCH     = PORTFOLIO.RESEARCH     || [];
const DOCUMENTS    = PORTFOLIO.DOCUMENTS    || [];
const PROJECT_CATS = PORTFOLIO.PROJECT_CATS || [];
const STATUS_META  = PORTFOLIO.STATUS_META  || {};
const PF_SERVICES  = PORTFOLIO.SERVICES     || [];
const REQUEST_EMAIL = 'johnmanchidi@gmail.com';

function statusBadge(status) {
    const m = STATUS_META[status];
    if (!m) return '';
    return `<span class="status-badge ${m.cls}"><i class="fas ${m.icon}" aria-hidden="true"></i> ${m.label}</span>`;
}


/* ---------------------------------------------------------
   LOADER
   Hide reliably whether or not the window 'load' event has
   already fired, and always hide via a hard timeout so the
   overlay can never get stuck covering the page.
--------------------------------------------------------- */
(function loader() {
    const el = $('#loader');
    if (!el) return;
    let done = false;
    const hide = () => { if (done) return; done = true; el.classList.add('hidden'); };

    // Skip the loader entirely on repeat visits this session.
    if (sessionStorage.getItem('seen')) { el.classList.add('hidden'); return; }
    sessionStorage.setItem('seen', '1');

    // Short, non-blocking: at most ~180ms.
    const delay = prefersReduced ? 0 : 180;
    if (document.readyState === 'complete') {
        setTimeout(hide, delay);
    } else {
        window.addEventListener('load', () => setTimeout(hide, delay), { once: true });
    }
    // Hard safety net: never let the loader stay longer than 3s.
    setTimeout(hide, 3000);
})();

/* ---------------------------------------------------------
   THEME
--------------------------------------------------------- */
(function theme() {
    const root = document.documentElement;
    const btn = $('#themeToggle');
    const stored = localStorage.getItem('theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (sysDark ? 'dark' : 'light');
    apply(initial);

    function apply(mode) {
        root.setAttribute('data-theme', mode);
        if (btn) {
            btn.setAttribute('aria-pressed', mode === 'light');
            btn.querySelector('i').className = mode === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    if (btn) btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        apply(next);
    });
})();

/* ---------------------------------------------------------
   HEADER + SCROLL PROGRESS + ACTIVE NAV + BACK TO TOP
--------------------------------------------------------- */
(function scrollUI() {
    const header = $('#header');
    const progress = $('#scrollProgress');
    const backTop = $('#backToTop');
    const sections = $$('main .section');
    const navItems = $$('.nav-link');

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 20);
        if (backTop) backTop.classList.toggle('show', y > 500);
        if (progress) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        }
        let current = '';
        sections.forEach(s => { if (y >= s.offsetTop - 140) current = s.id; });
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
})();

/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */
(function mobileMenu() {
    const toggle = $('#menuToggle');
    const links = $('#navLinks');
    if (!toggle || !links) return;
    function close() { links.classList.remove('open'); toggle.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', e => { if (e.target.matches('a')) close(); });
})();

/* ---------------------------------------------------------
   INTERESTS + SKILLS
--------------------------------------------------------- */
(function interests() {
    const box = $('#interestTags');
    if (!box) return;
    box.innerHTML = INTERESTS.map(i => `<span class="interest-tag">${i}</span>`).join('');
})();

/* ---------------------------------------------------------
   SERVICES / "WHAT I BRING"
--------------------------------------------------------- */
(function services() {
    const grid = $('#servicesGrid');
    if (!grid) return;
    grid.innerHTML = PF_SERVICES.map(s => `
        <article class="service-card">
            <div class="service-ico"><i class="fas ${s.icon}" aria-hidden="true"></i></div>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
        </article>`).join('');
})();

/* ---------------------------------------------------------
   ANIMATED STAT COUNTERS
--------------------------------------------------------- */
(function stats() {
    const nums = $$('.stat-num');
    if (!nums.length) return;
    function run(el) {
        const target = +el.dataset.count || 0;
        const suffix = el.dataset.suffix || '';
        if (prefersReduced) { el.textContent = target + suffix; return; }
        const dur = 1200; const start = performance.now();
        (function frame(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(frame);
        })(start);
    }
    if (typeof IntersectionObserver === 'undefined') { nums.forEach(run); return; }
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(en => { if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
})();

(function skills() {
    const grid = $('#skillsGrid');
    const filter = $('#skillsFilter');
    if (!grid || !filter) return;
    const cats = ['All', ...SKILLS.map(s => s.cat)];
    filter.innerHTML = cats.map((c, i) =>
        `<button class="chip-btn ${i === 0 ? 'active' : ''}" role="tab" data-cat="${c}">${c}</button>`).join('');

    function render(cat) {
        const list = cat === 'All' ? SKILLS : SKILLS.filter(s => s.cat === cat);
        grid.innerHTML = list.map(s => `
            <div class="skill-card">
                <h4><i class="fas ${s.icon}" aria-hidden="true"></i> ${s.cat}</h4>
                <div class="skill-tags">${s.items.map(t => `<span>${t}</span>`).join('')}</div>
            </div>`).join('');
        observeReveals();
    }
    filter.addEventListener('click', e => {
        const b = e.target.closest('.chip-btn');
        if (!b) return;
        $$('.chip-btn', filter).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        render(b.dataset.cat);
    });
    render('All');
})();

/* ---------------------------------------------------------
   PROJECTS — render, search, filter, case studies
--------------------------------------------------------- */
const projectUI = (function projects() {
    const grid = $('#projectsContainer');
    const filterBox = $('#projectsFilter');
    const search = $('#projectSearch');
    const empty = $('#projectsEmpty');
    if (!grid) return {};

    filterBox.innerHTML = PROJECT_CATS.map((c, i) =>
        `<button class="chip-btn ${i === 0 ? 'active' : ''}" role="tab" data-cat="${c.key}">${c.label}</button>`).join('');

    let activeCat = 'all';
    let query = '';

    function esc(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

    function matches(p) {
        const trackOk = activeCat === 'all' || p.track === activeCat;
        if (!trackOk) return false;
        if (!query) return true;
        const hay = (p.title + ' ' + p.desc + ' ' + p.tech.join(' ') + ' ' + p.type).toLowerCase();
        return hay.includes(query);
    }

    // Featured first, then most recent. Dates may be '2026', 'Oct 2025', 'Jan–Jun 2025'.
    function sortYear(d) { const m = String(d).match(/\d{4}/g); return m ? Math.max(...m.map(Number)) : 0; }
    function byFeaturedThenDate(a, b) {
        if (!!b.featured - !!a.featured) return (!!b.featured) - (!!a.featured);
        return sortYear(b.date) - sortYear(a.date);
    }

    function card(p) {
        const links = [];
        if (p.repo) links.push(`<a href="${p.repo}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i> Code</a>`);
        if (p.paper) links.push(`<a href="${esc(p.paper)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf" aria-hidden="true"></i> Paper</a>`);
        return `
        <article class="project-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Open case study: ${esc(p.title)}">
            <div class="project-thumb" style="background:${p.grad}">
                <i class="fas ${p.icon}" aria-hidden="true"></i>
                ${p.featured ? '<span class="featured-ribbon"><i class="fas fa-star" aria-hidden="true"></i> Featured</span>' : ''}
                <span class="cat-label">${esc(p.type)}</span>
            </div>
            <div class="project-body">
                <h3>${esc(p.title)}</h3>
                <div class="project-sub"><span class="project-date">${esc(p.date)}</span>${statusBadge(p.status)}</div>
                <p class="project-desc">${esc(p.desc)}</p>
                <div class="project-tags">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
                <div class="project-foot">
                    <div class="project-links">${links.join('')}</div>
                    <span class="case-link">Case study <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </div>
            </div>
        </article>`;
    }

    function render() {
        const list = PROJECTS.filter(matches).sort(byFeaturedThenDate);
        grid.innerHTML = list.map(card).join('');
        if (empty) empty.hidden = list.length !== 0;
        observeReveals();
    }

    filterBox.addEventListener('click', e => {
        const b = e.target.closest('.chip-btn');
        if (!b) return;
        $$('.chip-btn', filterBox).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        activeCat = b.dataset.cat;
        render();
    });

    if (search) {
        let deb;
        search.addEventListener('input', () => {
            clearTimeout(deb);
            deb = setTimeout(() => { query = search.value.trim().toLowerCase(); render(); }, 120);
        });
    }

    grid.addEventListener('click', e => {
        const linkEl = e.target.closest('a');
        if (linkEl) return; // let real links work
        const c = e.target.closest('.project-card');
        if (c) openCaseStudy(c.dataset.id);
    });
    grid.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            const c = e.target.closest('.project-card');
            if (c) { e.preventDefault(); openCaseStudy(c.dataset.id); }
        }
    });

    render();
    return { render };
})();

/* ---------------------------------------------------------
   CASE STUDY MODAL
--------------------------------------------------------- */
let lastFocused = null;
let suppressHash = false;
function openCaseStudy(id) {
    const p = PROJECTS.find(x => x.id === id);
    const overlay = $('#projectModal');
    const body = $('#modalBody');
    if (!p || !overlay || !body) return;
    const s = p.study;
    const esc = t => String(t).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
    const block = (icon, title, content) => `<div class="cs-block"><h4><i class="fas ${icon}" aria-hidden="true"></i> ${title}</h4>${content}</div>`;
    const list = arr => `<ul>${arr.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;

    const links = [];
    if (p.repo) links.push(`<a class="btn ghost" href="${p.repo}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> View source</a>`);
    if (p.doc) links.push(`<a class="btn ghost" href="${esc(p.doc)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF report</a>`);
    if (p.paper) links.push(`<a class="btn ghost" href="${esc(p.paper)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Read paper</a>`);

    body.innerHTML = `
        <div class="modal-head">
            <h3 id="modalTitle">${esc(p.title)}</h3>
            <p class="m-meta">${esc(p.type)} · ${esc(p.date)} ${statusBadge(p.status)}</p>
        </div>
        <div style="padding:32px">
            ${p.status ? block('fa-clipboard-check', 'Status', `<p><strong>${esc(STATUS_META[p.status] ? STATUS_META[p.status].label : p.status)}.</strong> ${esc(p.statusDetail || '')}</p>`) : ''}
            ${block('fa-circle-info', 'Overview', `<p>${esc(s.overview)}</p>`)}
            ${block('fa-bullseye', 'Problem statement', `<p>${esc(s.problem)}</p>`)}
            ${block('fa-list-check', 'Objectives', list(s.objectives))}
            ${block('fa-user', 'My contribution', `<p>${esc(s.contribution)}</p>`)}
            ${block('fa-gears', 'Methodology', `<p>${esc(s.methodology)}</p>`)}
            ${block('fa-triangle-exclamation', 'Challenges', `<p>${esc(s.challenges)}</p>`)}
            ${block('fa-chart-simple', 'Results & outcomes', `<p>${esc(s.results)}</p>`)}
            ${block('fa-lightbulb', 'Lessons learned', `<p>${esc(s.lessons)}</p>`)}
            ${block('fa-microchip', 'Technologies', `<div class="tag-row">${p.tech.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`)}
            ${links.length ? `<div class="modal-links">${links.join('')}</div>` : ''}
        </div>`;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    $('#modalClose').focus();

    // Reflect the open case study in the URL hash so it is shareable / Back-able.
    const hash = '#project-' + id;
    if (location.hash !== hash) {
        suppressHash = true;
        history.pushState({ project: id }, '', hash);
        suppressHash = false;
    }
}
function closeModal(fromHash) {
    const overlay = $('#projectModal');
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
    // Drop the #project-* hash unless the close was itself driven by a hash change.
    if (!fromHash && /^#project-/.test(location.hash)) {
        suppressHash = true;
        history.pushState('', '', location.pathname + location.search);
        suppressHash = false;
    }
}
(function modalEvents() {
    const overlay = $('#projectModal');
    if (!overlay) return;
    $('#modalClose').addEventListener('click', () => closeModal());
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

    // Open/close from the hash: deep links, Back/Forward, and initial load.
    function syncFromHash() {
        if (suppressHash) return;
        const m = location.hash.match(/^#project-([\w-]+)$/);
        if (m && PROJECTS.some(p => p.id === m[1])) openCaseStudy(m[1]);
        else closeModal(true);
    }
    window.addEventListener('hashchange', syncFromHash);
    // Restore on load (after projects render).
    syncFromHash();
})();

/* ---------------------------------------------------------
   RESEARCH GRID
--------------------------------------------------------- */
(function research() {
    const grid = $('#researchGrid');
    if (!grid) return;
    grid.innerHTML = RESEARCH.map(r => `
        <div class="research-card">
            <h4>${r.title}</h4>
            <p>${r.desc}</p>
            <div class="tag-row">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>`).join('');
})();

/* ---------------------------------------------------------
   DOCUMENTS TABLE
--------------------------------------------------------- */
(function documents() {
    const body = $('#docsBody');
    if (!body) return;
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

    function row(d) {
        const title = esc(d.title);
        const thumb = d.thumb
            ? `<img class="doc-thumb" src="${esc(d.thumb)}" alt="First page of ${title}" width="56" height="79" loading="lazy" decoding="async" onerror="this.style.display='none'" />`
            : `<span class="doc-thumb doc-thumb-ph" aria-hidden="true"><i class="fas fa-file-pdf"></i></span>`;
        let access;
        if (d.status === 'available' && d.file) {
            access = `<a class="doc-link" href="${esc(d.file)}" target="_blank" rel="noopener"><i class="fas fa-eye" aria-hidden="true"></i> View</a>
                      <a class="doc-link" href="${esc(d.file)}" download><i class="fas fa-download" aria-hidden="true"></i> Download</a>`;
        } else {
            const subject = encodeURIComponent('Request for full report: ' + d.title);
            const mailBody = encodeURIComponent('Hi Magaseng,\n\nPlease could you share the full report: "' + d.title + '".\n\nThanks.');
            access = `<a class="doc-link request" href="mailto:${REQUEST_EMAIL}?subject=${subject}&body=${mailBody}"><i class="fas fa-envelope" aria-hidden="true"></i> Request full report</a>`;
        }
        return `<tr>
            <td data-th="Preview" class="docs-thumb-col">${thumb}</td>
            <td data-th="Title">${title}</td>
            <td data-th="Course">${esc(d.course)}</td>
            <td data-th="Date">${esc(d.date)}</td>
            <td data-th="Pages">${esc(d.pages) || '—'}</td>
            <td data-th="Size">${esc(d.size) || '—'}</td>
            <td data-th="Access" class="doc-access">${access}</td>
        </tr>`;
    }
    const paint = list => { body.innerHTML = list.map(row).join(''); };

    // Source of truth is manifest.json; fall back to the embedded DOCUMENTS array.
    paint(DOCUMENTS);
    fetch('manifest.json')
        .then(r => (r.ok ? r.json() : null))
        .then(data => { if (data && Array.isArray(data.documents) && data.documents.length) paint(data.documents); })
        .catch(() => { /* keep fallback */ });
})();

/* ---------------------------------------------------------
   GITHUB INTEGRATION (graceful fallback)
--------------------------------------------------------- */
(function github() {
    const box = $('#ghRepos');
    if (!box) return;
    const LANG = { Python: '#3572A5', 'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c', JavaScript: '#f1e05a' };
    const fallback = [
        { name: 'Big_Data_Challenge_Project', description: 'E-commerce churn prediction, RFM segmentation and PySpark big-data processing.', language: 'Jupyter Notebook', html_url: 'https://github.com/Manchidi-MJ/Big_Data_Challenge_Project', stargazers_count: 0, forks_count: 0 },
        { name: 'inspectai-agentic-vision', description: 'Agentic AI visual inspection with OpenCV 5 and AWS; auditable decision loop with human review.', language: 'Python', html_url: 'https://github.com/Manchidi-MJ/inspectai-agentic-vision', stargazers_count: 0, forks_count: 0 },
        { name: 'css2026-finance_tracker_zar', description: 'FinTrack SA — South African personal finance tracker built with Streamlit (ZAR).', language: 'Python', html_url: 'https://github.com/Manchidi-MJ/css2026-finance_tracker_zar', stargazers_count: 0, forks_count: 0 },
        { name: 'data-analysis-dashboard', description: 'Web-based data analytics dashboard for retail sales insights.', language: 'HTML', html_url: 'https://github.com/Manchidi-MJ/data-analysis-dashboard', stargazers_count: 0, forks_count: 0 }
    ];

    function esc(s) { return String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
    function fmtDate(d) { try { return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }); } catch { return ''; } }

    function render(repos, note) {
        box.innerHTML = repos.map(r => {
            const dot = LANG[r.language] || '#8a98b5';
            return `
            <a class="gh-card" href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer">
                <h4><i class="fas fa-book-bookmark" aria-hidden="true"></i> ${esc(r.name)}</h4>
                <p>${esc(r.description) || 'No description provided.'}</p>
                <div class="gh-meta">
                    ${r.language ? `<span><i class="lang-dot" style="background:${dot}"></i>${esc(r.language)}</span>` : ''}
                    <span><i class="fas fa-star" aria-hidden="true"></i> ${r.stargazers_count || 0}</span>
                    <span><i class="fas fa-code-fork" aria-hidden="true"></i> ${r.forks_count || 0}</span>
                    ${r.updated_at ? `<span><i class="fas fa-rotate" aria-hidden="true"></i> ${fmtDate(r.updated_at)}</span>` : ''}
                </div>
            </a>`;
        }).join('') + (note ? `<p class="gh-error" style="grid-column:1/-1">${note}</p>` : '');
    }

    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => ctrl && ctrl.abort(), 6000);

    fetch('https://api.github.com/users/Manchidi-MJ/repos?sort=updated&per_page=100', ctrl ? { signal: ctrl.signal } : {})
        .then(r => { if (!r.ok) throw new Error('rate'); return r.json(); })
        .then(data => {
            clearTimeout(timer);
            const repos = data
                .filter(r => !r.fork && r.name !== 'my-portfolio')
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 6);
            render(repos.length ? repos : fallback);
        })
        .catch(() => { clearTimeout(timer); render(fallback, 'Showing a curated selection (live GitHub data unavailable right now).'); });
})();

/* ---------------------------------------------------------
   CV DETECTION — only enable download if CV.pdf exists
--------------------------------------------------------- */
(function cv() {
    const actions = $('#cvActions');
    const text = $('#cvText');
    const hint = $('#cvHint');
    if (!actions) return;
    fetch('CV.pdf', { method: 'HEAD' })
        .then(r => {
            const type = r.headers.get('content-type') || '';
            if (r.ok && !type.includes('text/html')) {
                actions.innerHTML = `<a class="btn primary" href="CV.pdf" download><i class="fas fa-file-arrow-down"></i> Download CV (PDF)</a>
                    <a class="btn ghost" href="CV.pdf" target="_blank" rel="noopener"><i class="fas fa-eye"></i> View</a>`;
                if (text) text.textContent = 'My latest curriculum vitae is available to download below.';
                if (hint) hint.hidden = true;
            }
        })
        .catch(() => { /* keep placeholder */ });
})();

/* ---------------------------------------------------------
   CONTACT FORM — validation + Web3Forms + states
--------------------------------------------------------- */
(function contact() {
    const form = $('#contactForm');
    if (!form) return;
    const status = $('#formStatus');
    const submit = $('#cfSubmit');
    const fields = {
        'cf-name': v => v.trim() ? '' : 'Please enter your name.',
        'cf-email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
        'cf-subject': v => v.trim() ? '' : 'Please enter a subject.',
        'cf-message': v => v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
    };

    function setError(id, msg) {
        const input = document.getElementById(id);
        const err = $(`.field-error[data-for="${id}"]`);
        if (input) input.classList.toggle('invalid', !!msg);
        if (err) err.textContent = msg;
        return !msg;
    }
    Object.keys(fields).forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('blur', () => setError(id, fields[id](input.value)));
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (form.botcheck && form.botcheck.checked) return; // honeypot
        let valid = true;
        Object.keys(fields).forEach(id => {
            const input = document.getElementById(id);
            if (!setError(id, fields[id](input.value))) valid = false;
        });
        if (!valid) { status.textContent = 'Please fix the highlighted fields.'; status.className = 'form-status err'; return; }

        submit.classList.add('loading'); submit.disabled = true;
        status.textContent = 'Sending…'; status.className = 'form-status';

        try {
            const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.success !== false) {
                status.textContent = '✓ Thank you! Your message has been sent. I’ll reply by email soon.';
                status.className = 'form-status ok';
                form.reset();
            } else {
                throw new Error(data.message || 'send failed');
            }
        } catch {
            // Build a prefilled mailto so a failed send still reaches me.
            const subj = encodeURIComponent((form.subject && form.subject.value) || 'Portfolio enquiry');
            const bodyText = encodeURIComponent(
                ((form.message && form.message.value) || '') +
                '\n\n— ' + ((form.name && form.name.value) || '') + ' (' + ((form.email && form.email.value) || '') + ')'
            );
            status.innerHTML = 'Sorry — the form couldn’t send. Please ' +
                '<a href="mailto:johnmanchidi@gmail.com?subject=' + subj + '&body=' + bodyText + '">email me directly</a>.';
            status.className = 'form-status err';
        } finally {
            submit.classList.remove('loading'); submit.disabled = false;
        }
    });
})();

/* ---------------------------------------------------------
   COMMAND PALETTE (Ctrl/Cmd + K)
--------------------------------------------------------- */
(function palette() {
    const overlay = $('#paletteOverlay');
    const input = $('#paletteInput');
    const list = $('#paletteList');
    const emptyEl = $('#paletteEmpty');
    const trigger = $('#paletteTrigger');
    if (!overlay) return;

    const COMMANDS = [
        { label: 'Home', sub: 'Section', icon: 'fa-house', action: () => go('#home') },
        { label: 'About', sub: 'Section', icon: 'fa-user', action: () => go('#about') },
        { label: 'Skills & certifications', sub: 'Section', icon: 'fa-screwdriver-wrench', action: () => go('#skills') },
        { label: 'Projects', sub: 'Section', icon: 'fa-layer-group', action: () => go('#projects') },
        { label: 'Research', sub: 'Section', icon: 'fa-flask', action: () => go('#research') },
        { label: 'Documents', sub: 'Section', icon: 'fa-file-pdf', action: () => go('#documents') },
        { label: 'CV', sub: 'Section', icon: 'fa-file-lines', action: () => go('#cv') },
        { label: 'Contact', sub: 'Section', icon: 'fa-envelope', action: () => go('#contact') },
        { label: 'Open GitHub profile', sub: 'External', icon: 'fa-github', ext: true, action: () => window.open('https://github.com/Manchidi-MJ', '_blank', 'noopener') },
        { label: 'Open LinkedIn', sub: 'External', icon: 'fa-linkedin', ext: true, action: () => window.open('https://www.linkedin.com/in/magaseng-john-manchidi-920442255/', '_blank', 'noopener') },
        { label: 'Send an email', sub: 'External', icon: 'fa-paper-plane', action: () => (window.location.href = 'mailto:johnmanchidi@gmail.com') },
        { label: 'Toggle light / dark theme', sub: 'Action', icon: 'fa-circle-half-stroke', action: () => $('#themeToggle').click() }
    ];

    let filtered = COMMANDS.slice();
    let idx = 0;
    let lastFocusP = null;

    function go(hash) { close(); const el = $(hash); if (el) el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' }); }
    function iconClass(c) { return c.ext ? `fab ${c.icon}` : `fas ${c.icon}`; }

    function renderList() {
        list.innerHTML = filtered.map((c, i) => `
            <li class="palette-item ${i === idx ? 'active' : ''}" role="option" data-i="${i}" aria-selected="${i === idx}">
                <span class="pi-icon"><i class="${iconClass(c)}" aria-hidden="true"></i></span>
                <span>${c.label}</span>
                <span class="pi-sub">${c.sub}</span>
            </li>`).join('');
        if (emptyEl) emptyEl.hidden = filtered.length !== 0;
    }
    function filter() {
        const q = input.value.trim().toLowerCase();
        filtered = q ? COMMANDS.filter(c => c.label.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q)) : COMMANDS.slice();
        idx = 0; renderList();
    }
    function open() {
        lastFocusP = document.activeElement;
        overlay.hidden = false; document.body.style.overflow = 'hidden';
        input.value = ''; filter(); setTimeout(() => input.focus(), 20);
    }
    function close() {
        overlay.hidden = true; document.body.style.overflow = '';
        if (lastFocusP) lastFocusP.focus();
    }
    function run() { const c = filtered[idx]; if (c) c.action(); }

    if (trigger) trigger.addEventListener('click', open);
    input.addEventListener('input', filter);
    list.addEventListener('click', e => { const li = e.target.closest('.palette-item'); if (li) { idx = +li.dataset.i; run(); } });
    list.addEventListener('mousemove', e => { const li = e.target.closest('.palette-item'); if (li && +li.dataset.i !== idx) { idx = +li.dataset.i; renderList(); } });
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    input.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, filtered.length - 1); renderList(); scrollActive(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); renderList(); scrollActive(); }
        else if (e.key === 'Enter') { e.preventDefault(); run(); }
    });
    function scrollActive() { const a = $('.palette-item.active', list); if (a) a.scrollIntoView({ block: 'nearest' }); }

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? open() : close(); }
        else if (e.key === 'Escape') { if (!overlay.hidden) close(); closeModal(); }
    });
})();

/* ---------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
--------------------------------------------------------- */
let revealObserver;
function revealAll() { $$('.reveal').forEach(el => el.classList.add('visible')); }
function observeReveals() {
    // If reduced motion is requested or IntersectionObserver is unavailable,
    // just show everything immediately.
    if (prefersReduced || typeof IntersectionObserver === 'undefined') { revealAll(); return; }
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
observeReveals();
// Fail-safe: whatever happens, reveal everything after 2.5s so content is
// never left permanently hidden.
setTimeout(revealAll, 2500);

/* ---------------------------------------------------------
   FOOTER YEAR
--------------------------------------------------------- */
(function year() { const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); })();

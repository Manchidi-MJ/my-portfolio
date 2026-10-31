# Portfolio Audit — Magaseng John Manchidi

**Date:** 31 October 2026
**Scope:** `Manchidi-MJ/my-portfolio` — a single-page, no-build static site (HTML + CSS + vanilla JS), deployed on GitHub Pages.
**Method:** Full read of `index.html`, `style.css`, `script.js`, `404.html`, `robots.txt`, `sitemap.xml`, `README.md`; cross-check of every project/skill claim against the owner's real public GitHub repositories; `node --check` on JS; asset/link reference scan; best-available PDF inspection.

> **Positioning note.** The attached improvement prompt targets an *entry-level cybersecurity / SOC / network-security and data-analysis* candidate. The current site positions the owner as a *dual-Master's Computer Science & Data Engineering* candidate. These are not the same story. **This is the biggest open decision — see P1-IA-1.** The findings below are written against the current site; several P1 items change shape depending on which positioning you choose.

---

## Environment & tooling notes (affects how some fixes can be verified here)

- **Sandbox network mode is `INTEGRATIONS_ONLY`** — no external package installs. `poppler-utils` (`pdftotext`, `pdfinfo`) could **not** be installed in this environment. PDF verification below used a pure-Python (stdlib `zlib`) text-layer extraction as a fallback. **Per your instruction, the authoritative `pdftotext`/`pdfinfo` check must run where poppler is available** (locally, or in CI on GitHub Actions). This is wired into the proposed workflow (P2-DEP-1) and listed in `open-questions.md`.
- Available: Node 22, Python 3.11, `eslint` v10, `prettier` v3. No framework/bundler — **and none is being added** (per your decision to adapt to the current plain stack).
- Lighthouse could not be executed here (no headless Chrome / network). Targets and the method to run it are noted under Performance; scores are **not** fabricated.

---

## P0 — Blockers

### ✅ P0-PRIV-1 — Student number exposed in published thesis PDF — **FIXED (PR #5, merged)**
- **File:** `Research Paper.pdf` (now removed from repo).
- **Finding:** The honours thesis contained the student number **`202038089`** in the file bytes (raw-byte scan: 2 occurrences) and was directly linked/downloadable from the live site.
- **Nuance (honest):** A stdlib text-layer extraction found **0** occurrences in the *rendered text* — the number appears to live in metadata or an uncompressed object rather than body text, but it is still extractable from the file and therefore a real exposure.
- **Fix applied:** removed the PDF from the repo; replaced the "Read the paper" link with a **"Request full report"** mailto; set `paper: null` on the project card; bumped cache-bust version.
- **Still open (needs you):** the PDF remains in **git history** (you asked me *not* to rewrite history until you supply redacted versions — tracked in `open-questions.md`).

### P0-PRIV-2 — Confirm no student/phone number anywhere else
- **Files:** all site source + remaining assets.
- **Finding:** Scans of `*.html/css/js/json/md/xml/txt` found **no** occurrence of `202038089`, `+27 68 187 7663`, `681877663`, or `68 187 7663`. The phone number was **not** found in the thesis PDF text layer either.
- **One-line fix:** None needed in code today, **but** `My Picture.jpg` was not inspected for EXIF/metadata (no tool) — see P1-PRIV-3. Add the automated secret-scan to CI (P2-DEP-1) so this can never regress.

### P0-HON-1 — Research "result" stated as fact on the page without the source present
- **File:** `index.html` research feature (~line 329–336); `script.js` `PROJECTS` → `ransomware`, `RESEARCH`.
- **Finding:** The site states *"best Random Forest accuracy of 99.34%"* as a headline fact, but the supporting PDF is (correctly) no longer published. The prompt's honesty rule: keep claims to **what the report states** and **link to the report** rather than presenting its numbers as verified site facts.
- **One-line fix:** Reframe as *"the thesis reports …"* and attach it to the (gated) report request, or mark the figure `[CONFIRM]` until the redacted PDF is available. **Decision needed.**

### P0-HON-2 — No "Status" honesty block on projects (built vs designed)
- **File:** `script.js` `PROJECTS` (all entries); modal renderer `openCaseStudy()`.
- **Finding:** Projects do not distinguish **Built & verified** / **Partially built** / **Designed only**. The prompt flags this as interview-critical, especially for:
  - **Cybersecurity HomeLab** — must mark Security Onion, Splunk, Wazuh, DMZ web/mail, internal CA as **"Designed / planned"** unless you confirm otherwise; the current card implies a working Security Onion + Splunk monitoring stack.
  - **IDS/IPS** — currently fine, but needs an explicit "Built & verified in lab" status.
- **One-line fix:** add a `status` field per project + render a visible badge; **requires your confirmation of what was actually deployed** (`open-questions.md`).

### P0-HON-3 — "Illustrative scenario" labelling for the Post-Attack research
- **File:** `script.js` `RESEARCH` → *"Inadequate Post-Attack Procedures…"*.
- **Finding:** The prompt states the "XYZ Corp" breach in that report is **fictional** and must be labelled **"Illustrative scenario"** wherever it appears, with no report statistics presented as verified facts.
- **One-line fix:** add an "Illustrative scenario" tag/line to that research card; keep claims to what the report states. *(Currently the card is generic and makes no false claim, but the label should be added when the report is surfaced.)*

---

## P1 — Important

### P1-IA-1 — Positioning mismatch (the key content decision)
- **File:** hero (`index.html` ~line 95–120), `<title>`/meta, JSON-LD `jobTitle`.
- **Finding:** Prompt wants an entry-level **Security track + Data track** story with the hero line *"Computer Science Honours graduate building secure networks and turning data into decisions"* and a *"What I'm looking for"* line. Current hero leads with **dual Master's / Data Engineering**. Also note a **factual tension**: the profile you supplied lists two Master's *in progress* (UL Jan 2026, Constructor Sep 2026); the prompt describes you as an *Honours graduate applying for entry-level roles*. Both can be true, but the headline must be chosen deliberately.
- **One-line fix:** pick the narrative (see question in `open-questions.md`); then rewrite hero + add two track summaries + "What I'm looking for".

### P1-IA-2 — Two career tracks not visible in 10 seconds
- **File:** `index.html` (services/about), `script.js` `PROJECTS` categories.
- **Finding:** Projects are filterable but there's no explicit **Security track** vs **Data track** split with a featured project each.
- **One-line fix:** add `track: 'security' | 'data'` to project data and a two-column "tracks" band near the top.

### P1-PRIV-3 — Profile photo watermark & metadata not verified
- **File:** `My Picture.jpg` (852×1003), used in hero + about.
- **Finding:** Prompt says crop out the photographer watermark (bottom-left) and export a ~800px WebP with meaningful alt text. Could not inspect the image for watermark/EXIF here (no image tooling).
- **One-line fix:** produce `images/profile.webp` (cropped, ~800px), add descriptive alt, strip EXIF. **Confirm whether a watermark is present.**

### P1-PROJ-1 — No per-project case-study *pages*; PDFs/figures missing
- **File:** `script.js` (modal-only case studies).
- **Finding:** Case studies are modals, not linkable pages; no figure galleries/captions; no embedded reports. Prompt's template wants Summary/Context/Environment/What I built/Results/Challenges/Lessons/Tools/**Status**/Figures/Report.
- **One-line fix (stack-appropriate):** keep the single-page approach but drive projects from a **`projects.js` data file** with the full template fields, and add a captioned, keyboard-accessible lightbox for figures. (No framework needed.)

### P1-PROJ-2 — IDS/IPS specifics not captured
- **File:** `script.js` `PROJECTS` → `ids`.
- **Finding:** Prompt provides precise, verifiable lab details (Kali `192.168.56.5`, Snort sensor `192.168.56.103`, Metasploitable 2, host-only `192.168.56.0/24`, rule set incl. UnrealIRCd/FTP backdoor, honest "tuning/suppressions needed" finding). Current card is generic.
- **One-line fix:** enrich the `ids` entry with these specifics + a clean SVG/Mermaid topology diagram.

### P1-DOC-1 — No Documents page
- **File:** n/a (missing).
- **Finding:** Prompt wants a table of all **final** PDFs (title, course, date, pages, size, View/Download), draft `.docx` excluded, and only one IDS/IPS report (66 vs 84 pages — **your pick**). Currently there are **no** PDFs in the repo (thesis removed; none others present).
- **One-line fix:** add a Documents section that renders from a `documents.js` list; populate once you supply **redacted** PDFs.

### P1-A11Y-1 — Accessibility is largely good; targeted gaps
- **File:** `index.html`, `style.css`.
- **Findings (good):** skip link, semantic landmarks, one `<h1>`, ARIA on palette/modal, `prefers-reduced-motion` handled, icon buttons have `aria-label`.
- **Gaps:** (a) contrast of muted text on dark surfaces should be verified to 4.5:1 in **both** themes; (b) modal lacks a focus **trap** (focus can leave the dialog via Tab); (c) light-theme focus-ring visibility to confirm.
- **One-line fix:** add a focus trap to the modal/palette; verify/adjust muted token contrast; confirm focus-ring in light theme.

### P1-PERF-1 — Images and fonts not optimised
- **File:** `index.html` head (Google Fonts, Font Awesome CDN), `My Picture.jpg`.
- **Findings:** JPG (not WebP/AVIF) used twice; Google Fonts + full Font Awesome loaded from CDN (render-blocking, large). `width/height` ARE set (good, prevents CLS). `script.js` is deferred (good).
- **One-line fix:** convert photo to WebP; self-host + subset the two fonts with `font-display: swap`; replace full Font Awesome with a subset of the ~30 icons actually used (or inline SVGs).

### P1-SEO-1 — Single-URL SEO only
- **File:** `sitemap.xml`, `index.html` meta.
- **Findings (good):** canonical, OG, Twitter, JSON-LD `Person` all present and clean (no phone). **Sitemap lists only one URL** and there's one OG image for the whole site.
- **One-line fix:** fine for a one-pager; **if** project pages are added, give each a title/description/canonical + 1200×630 OG image.

---

## P2 — Polish / maintainability

### P2-CODE-1 — Content is hardcoded in `script.js`
- **File:** `script.js` (`PROJECTS`, `SKILLS`, `RESEARCH`, `INTERESTS`).
- **Fix (your chosen approach):** extract to a dedicated **`projects.js` / `content.js` data file** (plain JS modules or a JSON file loaded at runtime) with a documented shape: `title, summary, track, tools, date, course, status, pdf, cover, figures`. No TypeScript migration; optionally add a JSDoc `@typedef` for editor hints.

### P2-CODE-2 — Minor duplication
- **File:** `script.js` — `esc()` helper is redefined in several IIFEs; CDN Font Awesome pulls far more than used.
- **Fix:** hoist one shared `esc()`; trim icon payload.

### P2-DEP-1 — No CI / automated guards
- **File:** n/a (missing `.github/workflows`).
- **Fix (your chosen approach):** add a **GitHub Actions** workflow that runs on push/PR:
  1. `node --check` on JS (+ optional `eslint`/`prettier --check`).
  2. **Node check script** (`scripts/check-content.mjs`) that **fails the build** if any of these strings appear in tracked site files: `[CONFIRM]`, `202038089`, `681877663` / `68 187 7663` / `+27 68 187 7663`.
  3. **PDF verification step** using `poppler-utils` (`pdftotext` + `pdfinfo`) on any committed PDF, failing if the student/phone numbers are present — this is the authoritative check your instruction requires (the sandbox could not run it).
  4. Internal **link check** (e.g. a small Node script or `lychee`) for broken local links/assets.
  5. Deploy to GitHub Pages on `main`.

### P2-DEP-2 — README lacks contributor guidance
- **File:** `README.md` (good overall).
- **Fix:** add short "How to add a project" and "How to add a PDF (and the redaction/verification rule)" sections once the data-file + Documents page land.

---

## What is already solid (keep)

- No secrets in site **code**; clean JSON-LD (no phone); contact form (Web3Forms) — **kept per your instruction**.
- Honest project write-ups overall; the Big Data **leakage audit** framing is exemplary and interview-strong.
- Custom 404, `robots.txt`, `sitemap.xml`, `.nojekyll`, favicon, theme persistence, command palette, reduced-motion, deferred JS, dimensioned images.
- `node --check script.js` passes; no broken internal asset references (`style.css`, `script.js`, `My Picture.jpg` all present).

---

## Before/after Lighthouse
Not run in this environment (no headless browser/network). To be captured locally or via the CI step and recorded here as **before → after**. Targets: Performance / Accessibility / Best-Practices / SEO ≥ 95 on mobile.

---

## Open decisions (also in `open-questions.md`)
1. **Positioning:** entry-level Security+Data (prompt) **or** dual-Master's CS & Data Engineering (current)? Headline depends on this.
2. **Git history purge** of the thesis PDF — you asked to hold until redacted PDFs arrive. Confirm when ready.
3. **HomeLab:** which tools were *actually deployed* vs *designed/planned*? (For honesty Status blocks.)
4. **IDS/IPS report:** which is final — 66-page or 84-page?
5. **Ransomware 99.34% figure:** reframe as "the thesis reports…" or mark `[CONFIRM]` until the redacted PDF is published?
6. **Photo:** is there a photographer watermark to crop? OK to export a WebP and strip EXIF?
7. **Certifications** (Cisco Cybersecurity Essentials, Cisco Data Science Essentials, CHPC/NITheCS): add? issue dates + credential links?

---

# Step 1 — progress log (implemented)

Branch `step1/honesty-positioning-certs`. No framework added (plain HTML/CSS/JS). Each commit was `node --check`ed.

- **P1-IA-1 / P1-IA-2 Positioning (blend Security + Data):** rewrote hero ("building secure networks and turning data into decisions", View projects / Download CV CTAs, "What I'm looking for" line); About + facts now lead with BSc Honours CS (2025), Johannesburg; retitled `<title>`/meta/OG/Twitter/JSON-LD to Cybersecurity & Data Analysis; removed unconfirmed Constructor University `alumniOf`.
- **Master's → [CONFIRM]:** education section demotes both Master's to a single `[CONFIRM]` placeholder; prior wording preserved verbatim in an HTML comment; stats band no longer asserts "Master's in progress".
- **P0-HON-1 (99.34%):** reworded to "In my honours thesis, a Random Forest model achieved 99.34% accuracy on the evaluated dataset."
- **P0-HON-2 (Status blocks):** added `status` to every project + a visible badge (Built & verified / Partially built / Designed only) on cards and a dedicated Status block in the modal. HomeLab = **Partially built** with explicit deployed-vs-designed split; IDS/IPS enriched with verified lab specifics (SCSE082, 192.168.56.0/24, Kali .5 / Snort .103 / Metasploitable 2, UnrealIRCd+FTP backdoor rules, tuning/suppressions). Data-analysis-dashboard = **Designed only**.
- **P0-HON-3 (Illustrative scenario):** Post-Attack research item now labels the "XYZ Corp" breach an illustrative scenario and keeps figures to what the report states.
- **Certifications:** added a Certifications section (Cisco Cybersecurity Essentials, Cisco Data Science Essentials, CHPC/NITheCS) with no dates/links until supplied.
- **P1-DOC-1 (Documents):** new Documents table driven by a `DOCUMENTS` data array; IDS/IPS (66pp) and HomeLab (18pp) listed **separately** (merged 84pp intentionally excluded); all rows **gated** behind "Request full report" until redacted PDFs arrive; note that PDFs publish only after a `pdftotext`/`pdfinfo` check.
- **P2-DEP-1 (CI):** `scripts/check-content.mjs` (hard-fail on student/phone number; warn on `[CONFIRM]`, `--strict` to fail), `scripts/check-links.mjs` (local files + in-page anchors), and `.github/workflows/ci.yml` (node --check → content → links → **authoritative poppler PDF scan** → deploy to Pages on `main`).

## Still pending (need owner/assets) — see open-questions.md
Redacted PDFs, phone-free `CV.pdf`, `images/profile.webp` (crop "Masala Lee" watermark, strip EXIF), exact Master's wording, certification dates/links, git-history purge. Design polish (self-hosted/subset fonts, WebP images, Font Awesome subset, modal focus trap, SVG/Mermaid topology diagram, lightbox) and Lighthouse before/after are the next tranche.

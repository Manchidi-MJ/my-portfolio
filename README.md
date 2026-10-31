# Magaseng John Manchidi — Portfolio

A premium, responsive personal portfolio for **Magaseng John Manchidi**, an emerging technology
professional pursuing two concurrent Master's degrees in **Computer Science** and **Data Engineering**,
with a background in Computer Science and Mathematical Sciences.

Built with **pure HTML, CSS and JavaScript** — no frameworks, no build step. It stays fast, easy to
maintain and simple to deploy on GitHub Pages.

---

## ✨ Features

- **Premium dark/light theme** — deep-navy design with blue & gold accents; remembers your preference and respects your system setting.
- **Hero** with rotating role text, professional photograph and clear calls-to-action.
- **Dual Master's education timeline** — MSc Computer Science (University of Limpopo, Jan 2026–) and MSc Data Engineering (Constructor University, Sep 2026–) shown prominently alongside completed degrees.
- **Interactive skills explorer** — categorised, filterable technology cards based on real project work.
- **Project showcase** — searchable, filterable cards with **detailed case-study modals** (overview, problem, objectives, contribution, methodology, challenges, results, lessons) and links to real source code.
- **Live GitHub integration** — recently updated repositories loaded from the GitHub API, with a curated fallback if the API is unavailable.
- **Research section** — honours thesis plus structured research topics, ready to grow.
- **Command palette** (`Ctrl/Cmd + K`) — keyboard-driven navigation with full focus management and `Esc` to close.
- **Accessible contact form** — client-side validation, loading/success/error states, honeypot spam protection, powered by [Web3Forms](https://web3forms.com/).
- **SEO & sharing** — meta/Open Graph/Twitter tags, JSON-LD `Person` structured data, `sitemap.xml`, `robots.txt`.
- **Polish** — custom 404 page, scroll progress bar, back-to-top, scroll-reveal animations.
- **Accessibility** — semantic HTML, skip link, visible focus states, ARIA on interactive widgets, and `prefers-reduced-motion` support.

---

## 🛠️ Tech stack

| Area | Technology |
|------|-----------|
| Markup / styles / logic | HTML5, CSS3 (custom properties), vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter & Sora |
| Icons | Font Awesome 6 |
| Form backend | Web3Forms (no server required) |
| GitHub data | GitHub public REST API |
| Hosting | GitHub Pages |

---

## 📁 Project structure

```
my-portfolio/
├── index.html         # Single-page portfolio
├── style.css          # Design system + all component styles (themed)
├── script.js          # Interactivity + data (PROJECTS, DOCUMENTS, SKILLS, …)
├── 404.html           # Custom not-found page
├── robots.txt         # Crawl directives
├── sitemap.xml        # Sitemap
├── .nojekyll          # Serve files as-is on GitHub Pages
├── My Picture.jpg     # Profile photograph (watermark to be cropped → images/profile.webp)
├── docs/              # Redacted, privacy-checked PDFs (added as supplied)
├── scripts/
│   ├── check-content.mjs  # Privacy/[CONFIRM] guard (Node, no deps)
│   └── check-links.mjs    # Internal link & anchor checker
├── .github/workflows/ci.yml  # Checks + poppler PDF scan + Pages deploy
├── audit.md           # Full P0/P1/P2 audit + progress log
├── open-questions.md  # Unconfirmed items awaiting the owner
└── README.md
```

> **Privacy:** the honours thesis PDF was removed because it contained a student number.
> PDFs are only published after the redaction + `pdftotext`/`pdfinfo` check described below.

---

## 🚀 Run locally

Because it's static, you can open `index.html` directly, but a local server is recommended so that
`fetch()` calls (GitHub API, CV detection) behave correctly:

```bash
git clone https://github.com/Manchidi-MJ/my-portfolio.git
cd my-portfolio

# Any static server, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🌐 Deploy on GitHub Pages

1. Push to the `main` branch of `Manchidi-MJ/my-portfolio`.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
5. After a minute, the site is published at:
   **https://manchidi-mj.github.io/my-portfolio/**

> The `.nojekyll` file ensures GitHub Pages serves every file (including those prefixed with `_`) as-is.

---

## ⚙️ Configuration & things to supply

| Item | Status | How to enable |
|------|--------|---------------|
| **CV download** | Not yet added | Drop a `CV.pdf` in the repo root. The CV section detects it automatically and shows a download button; until then it shows a clear "coming soon" placeholder. |
| **Contact form** | Working | Uses an existing Web3Forms access key (a public, client-side key by design). Messages go to the configured inbox. To use your own, replace the `access_key` value in the contact form in `index.html`. |
| **Canonical / OG URLs** | Set to GitHub Pages URL | If you move to a custom domain, update the `canonical`, Open Graph and `sitemap.xml`/`robots.txt` URLs. |
| **Analytics** | Not included | No tracking scripts are bundled (privacy-first). If you later add privacy-friendly analytics (e.g. a consent-aware, cookieless provider), document it and add a short privacy note. |

---

## ✏️ How to update content

All content lives in clearly-labelled data arrays near the top of `script.js`:

- `PROJECTS` — project cards + case studies. Each supports a `status` of `'verified'`
  (Built & verified), `'partial'` (Partially built) or `'designed'` (Designed only),
  plus a `statusDetail` string — this drives the honesty **Status** badge/block.
- `DOCUMENTS` — the Documents table. Each row is `'gated'` (shows a "Request full report"
  mailto) or `'available'` (shows View/Download for the `file`). A PDF should only be set
  `'available'` **after** it has been privacy-checked (see below).
- `SKILLS`, `RESEARCH`, `INTERESTS` — skills, research topics, About tags.

Education, hero, certifications and contact details are plain HTML in `index.html`.

### How to add a project
Add an object to `PROJECTS` with `id, title, date, category, type, desc, tech[], status,
statusDetail, repo, icon, grad, study{…}`. Keep claims to what is actually built; use the
right `status`. Mark anything unconfirmed with `[CONFIRM]` (CI will flag it).

### How to add a PDF (privacy rule)
1. **Redact first** — remove the student number and phone number from the PDF.
2. **Verify** the PDF contains neither the student number nor the phone number, using
   `pdftotext`, `pdfinfo` and `strings` (the exact regexes live in `scripts/check-content.mjs`,
   the single source of truth). CI runs this automatically on every PDF — see the workflow.
3. Place the file under `docs/` (lowercase-hyphenated name) and set the matching
   `DOCUMENTS` entry `status: 'available'` with the correct `file`, `pages` and `size`.
4. Never publish the merged 84-page IDS/IPS+HomeLab file — publish the two source reports
   separately.

### How to add the CV
Add a privacy-checked `CV.pdf` (no phone number) to the repo root. The CV section detects
it automatically and shows Download/View buttons.

### Checks (run locally before pushing)
```bash
node --check script.js
node scripts/check-content.mjs       # fails on student/phone number; warns on [CONFIRM]
node scripts/check-links.mjs index.html 404.html
```
CI (`.github/workflows/ci.yml`) runs these plus the authoritative poppler PDF scan, then
deploys to GitHub Pages on `main`.

---

## 📝 License & content

Code is free to reuse as a template. Personal content, the photograph and the research document belong to
Magaseng John Manchidi.

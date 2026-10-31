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
├── index.html        # Single-page portfolio
├── style.css         # Design system + all component styles (themed)
├── script.js         # All interactivity, data, GitHub + form logic
├── 404.html          # Custom not-found page
├── robots.txt        # Crawl directives
├── sitemap.xml       # Sitemap
├── .nojekyll         # Serve files as-is on GitHub Pages
├── My Picture.jpg    # Profile photograph
├── Research Paper.pdf # Honours thesis document
└── README.md
```

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

- `PROJECTS` — add/edit project cards and their case studies.
- `SKILLS` — add/edit skill categories and items.
- `RESEARCH` — add/edit research topics.
- `INTERESTS` — the interest tags in the About section.

Education, the hero and contact details are plain HTML in `index.html`.

---

## 📝 License & content

Code is free to reuse as a template. Personal content, the photograph and the research document belong to
Magaseng John Manchidi.

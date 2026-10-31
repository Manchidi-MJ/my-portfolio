# Open Questions — status

Legend: ✅ resolved · ⏳ needs you · 🔒 on hold at your request.
Nothing here is invented or shown on the public page.

## Resolved / implemented
1. ✅ **Positioning** — blended Security + Data; BSc Honours CS (2025) leads. Master's **not** shown (see item A).
2. ✅ **HomeLab** — status split implemented: verified = pfSense, Windows Server AD/DNS/DHCP, Kali, Nessus; designed/planned = Security Onion, Splunk, Wazuh, DMZ, internal CA. **See the CAUTION below — the report text claims more.**
3. ✅ **IDS/IPS** — 66-page Snort report and 18-page HomeLab report listed separately; merged 84-page file never published.
4. ✅ **99.34%** — reworded as "In my honours thesis, a Random Forest model achieved 99.34% accuracy on the evaluated dataset."
5. ✅ **Certifications** — Cisco Cybersecurity Essentials, Cisco Data Science Essentials, CHPC (NITheCS); no dates/links until supplied.
6. ✅ **Privacy** — docs scrubbed; CI scans Markdown too; deploy uploads `dist/` only (internal docs never published); PDF CI scan uses pdftotext + pdfinfo (plain) + strings.
7. ✅ **Structure** — nav simplified; stats are checkable; GitHub section removed (kept as footer link).

## CAUTION — HomeLab honesty (needs your call) ⚠️
The supplied **Cybersecurity HomeLab report** text asserts Security Onion, Splunk, Wazuh, a DMZ (Apache/Postfix), an internal CA, and results like "remediated critical/high findings" and "verified IDS/SIEM detection". The figures/screenshots described in the report only evidence: VirtualBox VM list, pfSense dashboard/admin/login, ping tests, IP config, Windows Server roles + AD users, and Nessus (with a connection error being troubleshooted).
- The **website** keeps the honest, evidence-based split (verified core; rest designed/planned).
- **Decision needed:** (1) keep the site's honest split and publish the report gated with a note; (2) you revise the report to match what's built before it's published; (3) you confirm the SIEM/DMZ/CA were in fact deployed+verified. Until you answer, the report stays **gated** and the site does not repeat the broader claims.

## Needs you ⏳ — owner-supplied binaries (everything is wired; drop files in to activate)
A. **Master's wording** — still unshown (`MASTERS_CONFIRMED` was left as the template placeholder). Give exact institution(s)/title(s)/dates to add an "Currently enrolled" block, or say "none" to leave as-is.
B. **PDF files** into `docs/` (lowercase-hyphenated): `ids-ips-snort-report.pdf`, `cybersecurity-homelab-report.pdf`, `post-attack-procedures-report.pdf`, `mobile-edge-computing-assignment.pdf`; thesis `honours-thesis-ransomware.pdf` only if redacted (else stays gated). **Must be redacted** (no student/phone number) — CI enforces this.
C. **CV** — add redacted `CV.pdf` to repo root (hero + CV section already point at it).
D. **Photo** — add `images/profile.webp` (+ `profile-480.webp`, `profile.jpg`) cropped (remove "Masala Lee"), EXIF stripped; and `images/og-image.jpg` (1200×630). Then `My Picture.jpg` can be removed.
E. **Thesis evaluation method** (Task 8) — how was the train/test split / cross-validation done, and which metric does 99.34% refer to (accuracy on which split)? I did **not** put this on the page; it stays here until you confirm.
F. **Certification dates / Credly links** (optional).
G. **Thumbnails** — `thumbs/*.webp` (page-1 previews) for the Documents table; placeholders show until then.

## On hold 🔒
H. **Git history purge** of the old `Research Paper.pdf` — holding until redacted PDFs are in. (filter-repo command to be provided for your approval; nothing run without it.)

## Tasks 9–12 + P2 — done
- ✅ Task 9: data extracted to `data.js` (shared source of truth); `scripts/prerender.mjs` injects static project/skill/research/service/doc markup into `dist/index.html` so content shows **without JavaScript**; script.js hydrates. `<noscript>` doc list added.
- ✅ Task 10 (partial): loader skipped on repeat visits + capped ~180ms; **content-hash cache-busting** via build.mjs.
- ✅ Task 11: shareable `#project-<id>` modal URLs with Back/Forward + load restore.
- ✅ Task 12: contact form mailto fallback on failure + README note to restrict the Web3Forms key to the domain.
- ✅ P2: sitemap `<lastmod>` stamped at build; visible focus rings on inputs; README Deploy section rewritten; non-blocking Lighthouse CI job.

## Task 10 fonts/icons — achievable part done; rest blocked by the sandbox
- ✅ **Made Google Fonts + Font Awesome non-render-blocking** (async `media="print"` + `onload` swap, `<noscript>` fallback). This is the main render-blocking perf win and needs no binaries.
- ⛔ **Self-hosting/subsetting fonts** and an **inline-SVG icon set** still need the font/icon binaries. This sandbox is `INTEGRATIONS_ONLY` and the CDN returns 403, so I cannot download or subset them here. **Plan for a connected environment:**
  1. Fonts: download Inter (400–700) + Sora (600–800) **latin-subset woff2**, place in `fonts/`, add `@font-face { font-display: swap }`, drop the Google Fonts `<link>`, and `rel=preload` the two most-used weights.
  2. Icons: the site uses ~52 unique Font Awesome icons (list derivable via `grep -ohE 'fa-[a-z0-9-]+'`). Either build a small SVG sprite of just those and swap `<i class="fa-*">` for `<svg><use>`, or self-host a subset of FA. Then remove the FA CDN `<link>`.
- These are perf polish only; correctness/honesty are unaffected. The non-blocking Lighthouse CI job quantifies the remaining gap.

## Env note
Sandbox is `INTEGRATIONS_ONLY`: no poppler/image tooling and no inline binary writes here — so the actual PDFs/photos/thumbnails must be uploaded by you; CI (poppler) runs the authoritative PDF privacy scan.

# Open Questions — status

Legend: ✅ resolved · ⏳ still needs you · 🔒 on hold at your request.
Nothing here is invented or published as fact.

## Resolved (answered in your last message — now implemented)
1. ✅ **Positioning** — **Blend Security + Data.** Hero/meta/About updated; BSc Honours CS (2025) leads. Any Master's claim is a `[CONFIRM]` placeholder (prior wording kept in an HTML comment) until you supply exact wording.
2. ✅ **HomeLab deployed vs planned** — Built & verified: **pfSense, Windows Server AD/DNS/DHCP, Kali, Nessus**. Everything else (Security Onion, Splunk, Wazuh, DMZ web/mail, internal CA) now labelled **Designed / planned**. Status block added.
3. ✅ **IDS/IPS report** — publish the **66-page Snort** report and the **18-page HomeLab** report **separately**; the merged 84-page file is **not** published. Documents table reflects this.
4. ✅ **99.34% figure** — reworded to *"In my honours thesis, a Random Forest model achieved 99.34% accuracy on the evaluated dataset."*
5. ✅ **Photo** — agreed: crop the **"Masala Lee"** watermark, strip EXIF, export **WebP**. (Pending the asset step — see ⏳ below.)
6. ✅ **Certifications** — added **Cisco Cybersecurity Essentials**, **Cisco Data Science Essentials**, **CHPC (NITheCS)**; no dates/links until you supply them.
7. ✅ **CV** — will publish a **phone-number-free** copy, verified with `pdftotext`. Wiring + privacy note in place; awaiting the file.

## Still needs you ⏳
A. **Redacted / clean PDFs** (student number removed, verified). Expected filenames (lowercase-hyphenated, in `docs/`):
   - `docs/ids-ips-snort-report.pdf` (66pp)
   - `docs/cybersecurity-homelab-report.pdf` (18pp)
   - `docs/honours-thesis-ransomware.pdf`
   - `docs/post-attack-procedures-report.pdf`
   - `docs/mobile-edge-computing-assignment.pdf`
   Until supplied, each row shows **"Request full report"** (mailto). When you add a file, flip its `DOCUMENTS` entry `status` to `'available'`.
B. **CV file** — add a privacy-checked `CV.pdf` (no phone number) to the repo root; the CV section auto-detects it.
C. **Profile photo asset** — supply (or approve me producing) `images/profile.webp`: cropped to remove the "Masala Lee" watermark, EXIF stripped, ~800px. *(I can't run image tooling in this sandbox — `INTEGRATIONS_ONLY`.)*
D. **Master's — exact wording** (institution(s), degree title(s), dates/status) to replace the `[CONFIRM]` placeholder.
E. **Certification dates + credential URLs** (optional) when available.
F. **Exact scope/results** for the two coursework projects currently marked `[CONFIRM]` (Secure Backend Database System; Statistical Modelling group project) if you want specific metrics shown.

## On hold 🔒
G. **Git history purge** of the old `Research Paper.pdf` — holding until the redacted PDFs are in, then I'll rewrite history + force-push (I'll confirm scope first).

## Environment note carried into CI
- The sandbox is `INTEGRATIONS_ONLY`, so `pdftotext`/`pdfinfo` and image tooling can't run here. The **authoritative PDF privacy scan runs in GitHub Actions** (`.github/workflows/ci.yml`) using poppler-utils.

## [CONFIRM] markers currently in the codebase (CI warns; will fail once --strict)
- `index.html` — Postgraduate/Master's placeholder (2 lines) → needs item D.
- `script.js` — Secure Backend DB & Statistical Modelling status detail → needs item F.

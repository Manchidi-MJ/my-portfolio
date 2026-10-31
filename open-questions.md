# Open Questions — awaiting Magaseng's confirmation

Anything here is **unconfirmed**. Nothing below has been invented or published as fact.
Items map to findings in `audit.md`.

## Decisions needed before P1 content work
1. **Positioning / narrative** (P1-IA-1)
   - Option A — Entry-level **Security + Data** (per the improvement prompt): hero = *"Computer Science Honours graduate building secure networks and turning data into decisions"*, two tracks, "What I'm looking for" line.
   - Option B — Keep current **dual-Master's CS & Data Engineering** framing.
   - Option C — Blend (lead with Honours + job-seeking, keep Master's as "currently pursuing").
   - **Your call:** ______

2. **Cybersecurity HomeLab — what was actually deployed?** (P0-HON-2)
   - Confirmed-by-screenshots per the prompt: pfSense dashboard + admin, static IP/gateway, ping tests, Windows Server roles (AD DS, DNS, DHCP, file services), AD user creation, Nessus on Kali + nessusd troubleshooting.
   - Mark as **Designed / planned** unless you confirm: Security Onion, Splunk, Wazuh, DMZ web/mail servers, internal CA.
   - **Confirm which (if any) were truly deployed:** ______

3. **IDS/IPS report — which is final?** (P1-DOC-1) — 66-page or 84-page? (Publish one only.) **Your call:** ______

4. **Ransomware 99.34% accuracy figure** (P0-HON-1) — reframe as *"the thesis reports…"* and gate behind the report request, or mark `[CONFIRM]` until a redacted PDF is published? **Your call:** ______

5. **Profile photo** (P1-PRIV-3) — is there a photographer watermark (bottom-left) to crop? OK to export a ~800px WebP and strip EXIF? **Your call:** ______

6. **Certifications** (per prompt) — add Cisco Cybersecurity Essentials, Cisco Data Science Essentials, CHPC Programme (NITheCS)? If yes, supply **issue dates** and **credential URLs** (otherwise listed without unverifiable detail). **Your call:** ______

## Privacy / assets you will supply
7. **Redacted PDFs** (student number removed) for: honours thesis, Cybersecurity Homelab report, IDS/IPS report, Post-Attack Procedures report + presentation, Mobile Edge Computing assignment. Until supplied, each stays gated behind a **"Request full report"** mailto (no direct download).
8. **Git history purge** of `Research Paper.pdf` — **on hold at your request** until redacted PDFs arrive. When you say go, I'll rewrite history and force-push (destructive; I'll confirm scope first).
9. **Links** — confirm LinkedIn URL (`linkedin.com/in/magaseng-john-manchidi-920442255/`) and GitHub (`github.com/Manchidi-MJ`). Email confirmed: `johnmanchidi@gmail.com`.

## Environment limitation to carry into CI
10. **PDF verification tooling** — this sandbox is `INTEGRATIONS_ONLY`, so `pdftotext`/`pdfinfo` (poppler-utils) could not be installed. The authoritative PDF secret-scan must run in GitHub Actions (planned, P2-DEP-1) or locally. Fallback stdlib extraction was used for this audit only.

## Items marked [CONFIRM] in content (build will fail on these once CI lands)
- *(none yet — will be added as draft content is written, e.g. certification dates, the 99.34% figure if you choose that route)*

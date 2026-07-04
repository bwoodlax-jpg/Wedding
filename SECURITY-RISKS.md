# Wedding RSVP — Security Risk Log

A reference for locking down the RSVP site over the ~year until the wedding.

**Important context:** the overall chance of ANY of these happening is
**extremely small**. This is a simple static site on your own GitHub account.
This log exists so that if you ever wonder "what were the risks and what did we
decide to do," the answer is right here — no need to re-derive it.

Ordered **most likely → least likely**. Each item has the fix.

Last updated: 2026-07-04 · Wedding: 2027-08-28

---

## Risk #1 — Accidental self-inflicted breakage (MOST LIKELY)
**What:** Over the next year, the person most likely to break the site is you —
pushing an edit that breaks the layout or the search, or accidentally
deleting/overwriting a file.
**Impact:** Site looks broken or the RSVP form stops working until fixed.
**Fixes:**
- Turn on **branch protection** for `main`: repo **Settings → Branches → Add rule**
  (or Settings → Rules) → check **"Block force pushes"** and **"Restrict deletions."**
- Keep a known-good version tagged so you can always roll back.
- Test changes before/after deploy (the live URL updates ~1–2 min after each push).
**Status:** ⬜ branch protection not yet enabled.

## Risk #2 — Guest list leaking (because the repo is public)
**What:** This is a **public** repo + static page, so anything inside
`index.html` is readable by anyone (View Source). If the **real** 175-person
guest list is ever pasted into the HTML, the whole world can read every name,
who got a plus-one, who's "wedding only," etc.
**Impact:** Privacy breach — the guest list was never supposed to be browsable.
**Fixes:**
- **Never** put the real guest list in the repo. It lives only in the **private
  Google Sheet**; the Apps Script backend (Checklist item #1) reads it
  server-side and returns only the ONE matching party to each guest.
- The public site should ship with **zero** real guest data.
**Status:** ⬜ backend not yet built (currently mock data only — safe for now).

## Risk #3 — Abuse of the public RSVP endpoint (once the backend exists)
**What:** The backend URL must be public so guests can submit. Someone could
spam fake RSVPs or try to scrape names by probing the search.
**Impact:** Junk rows in the responses sheet; at worst, slow name-guessing.
**Fixes:**
- Search already returns **max 1 result** and needs a near-complete name (no browsing).
- Add light rate-limiting / basic abuse checks in the Apps Script.
- Strongest option: print a short **RSVP code** on each physical invitation and
  require it to submit (adds a little friction; optional).
**Status:** ⬜ N/A until backend is built.

## Risk #4 — CDN dependency (Fuse.js search library)
**What:** The site loads the search library `fuse.js` from an external CDN
(jsDelivr). If that file were ever tampered with or pulled, search could break
or run altered code in guests' browsers.
**Impact:** Search stops working, or (worst case) malicious code runs client-side.
**Fixes:**
- Add a **Subresource Integrity (SRI)** hash to the `<script>` tag (browser
  rejects the file if it's altered), **or**
- **Self-host** `fuse.min.js` directly in the repo to remove the external
  dependency entirely.
**Status:** ⬜ currently loaded from jsDelivr, version-pinned to 7.0.0 (no SRI yet).

## Risk #5 — GitHub account compromise
**What:** If someone gets into your GitHub account, they can change anything on
the site. This is the true "a stranger messed with it" scenario — and it
requires breaking into your account first.
**Impact:** Site could be defaced or taken down.
**Fixes:**
- Enable **2-factor authentication**: https://github.com/settings/security
- Use a strong, unique password.
**Status:** ⬜ confirm 2FA is on.

## Risk #6 — GitHub Pages outage (LEAST LIKELY)
**What:** GitHub Pages is free and very reliable but has no formal uptime
guarantee (SLA). A GitHub-wide outage could briefly take the site offline.
**Impact:** Temporary; entirely out of your control and self-resolving.
**Fixes:**
- Nothing needed. If you ever wanted a guarantee, a custom domain + paid host
  is possible, but overkill here.
**Status:** ✅ accepted (no action).

---

## Quick-win checklist (≈10 minutes, whenever you want)
- [ ] Enable **2FA** on your GitHub account (Risk #5)
- [ ] Enable **branch protection** on `main` (Risk #1)
- [ ] Keep the real guest list **out of the repo** — Sheet only (Risk #2)
- [ ] Add **SRI** to (or self-host) Fuse.js (Risk #4) — *ask Claude to do this*
- [ ] (Optional) Plan **RSVP codes** for the backend (Risk #3)

## Note on this file being public
This log lives in the public repo. It contains **no secrets** — just standard
hardening advice — so publishing it is fine. If you'd rather keep it private,
it can be moved to your Google Drive instead. Just ask.

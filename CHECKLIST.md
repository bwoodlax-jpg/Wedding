# Wedding RSVP — Project Checklist

Running list of things to complete for the Quynh & Benjamin RSVP site.
Wedding: **August 28, 2027** · Live site: https://bwoodlax-jpg.github.io/Wedding/

Last updated: 2026-07-04

---

## ⬜ Open items (to complete at a later date)

### 1. Backend — wire the site to the Google Sheet (Apps Script)
Move the guest lookup **server-side** so the full guest list never reaches the
browser, and log every RSVP to the sheet.
- Read the **Guest List** tab for name search (fuzzy match via Apps Script).
- Write submissions to the **RSVP Responses** tab (one row per person).
- Closes the biggest privacy risk — see `SECURITY-RISKS.md` (Risk #2).
- Data lives in: **Wedding RSVP Data — Quynh & Benjamin** (private Google Sheet)
  https://docs.google.com/spreadsheets/d/1KIfp6LB6zpBPPAmhNjlzMIwp3PPagOZPVYKAlgh-di8/edit

### 2. Frontend display enhancements
Front-page / visual polish, deferred for now. Includes (non-exhaustive):
- Fine-tune the hero flourish divider and the ampersand styling.
- Add the real calla lily hero image once the asset is provided.
- Any other layout/design tweaks.

---

## 🚀 Pre-launch cleanup (before going live to real guests)
Reminders carried over from the project handoff — not urgent now, but required
before the real invitations go out:
- Remove the **"Prototype · Testing Mode"** banner.
- Remove the **testing guide** (tier table) from the RSVP page.
- Replace mock guest data with the **real guest list** (via the backend, not inline).
- Confirm the **RSVP deadline** (conflicting info: May 1, 2027 vs. July 25).
- Confirm the final **wedding-site URL** used in the "Return to Wedding Website" links.
- Apply the quick security wins in `SECURITY-RISKS.md` (2FA, branch protection, SRI).

---

## ✅ Completed
- Deployed the RSVP site to GitHub Pages (`main` → `gh-pages` workflow).
- Hero/second-page copy and layout edits (reply wording, hide hero on step 2,
  Tea before Welcome, flourish divider, ampersand).
- Designed and created the backend data model (Google Sheet with Guest List,
  RSVP Responses, and Summary tabs).
- Documented the security risks (`SECURITY-RISKS.md`).

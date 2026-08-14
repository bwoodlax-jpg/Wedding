# Wedding RSVP — Project Checklist

Running list of things to complete for the Quynh & Benjamin RSVP site.
Wedding: **August 28, 2027** · Live site: https://bwoodlax-jpg.github.io/Wedding/

Last updated: 2026-08-14

---

## ⬜ Open items (to complete)

### 1. Backend — wire the site to the Google Sheet (Apps Script)  ← the big one
Right now the form only shows a "Thank You" screen in the browser; **submissions
are NOT saved anywhere.** This is what makes RSVPs actually land in the sheet.
- Google Apps Script web app: receives the form POST, appends one row per person
  to the **RSVP Responses** tab.
- Move the guest lookup **server-side** so the full guest list never reaches the
  browser (closes the biggest privacy risk — see `SECURITY-RISKS.md` Risk #2).
- Data lives in: **Wedding RSVP Data — Quynh & Benjamin** (private Google Sheet)
  https://docs.google.com/spreadsheets/d/1KsHd-9A-et49a-fzvmevxkZhSwr_KvduGkDu5sTGnMg/edit

### 2. Finalize the Guest List data in the sheet
The site currently reads a snapshot of the list; several columns are incomplete:
- **Event columns** (Welcome / Tea / Wedding) are blank for most parties, so the
  site currently defaults everyone to **all three events** (only an explicit "No"
  excludes). Fill these in, then re-sync.
- **Formal Names** blank for most parties.
- A few **empty child rows** (P028, P029, P030, P052) — add names or remove.
- **Duplicate names to verify** are intentional distinct people: "Tan Ho" (P117 &
  P119), "Vivian Nguyen" (P049 & P122). They trigger the same-name chooser.

### 3. Frontend display enhancements
- Add the real **calla lily** hero image once the asset is provided.
- Fine-tune the hero flourish divider / ampersand if desired.
- Any other layout/design tweaks.

---

## 🚀 Pre-launch cleanup (before sharing with real guests)
- Remove the **"Prototype · Testing Mode"** banner.
- Confirm the **RSVP deadline** (conflicting info: May 1, 2027 vs. July 25).
- Confirm the final **wedding-site URL** in the "Return to Wedding Website" links.
- Apply the quick security wins in `SECURITY-RISKS.md` (2FA, branch protection,
  SRI / self-host Fuse.js).
- Delete the **two older duplicate Google Sheets** (keep the one linked above).

---

## ✅ Completed
- Deployed the RSVP site to GitHub Pages (`main` → `gh-pages` workflow).
- Hero/design edits: removed ornament, added flourish divider, restyled ampersand,
  hide hero on step 2, "Please reply below", Tea before Welcome.
- Designed & created the backend **data model** (Google Sheet: Guest List with
  Formal Name / Guest Type (Adult·Child) / Age / Plus-Ones, RSVP Responses, Summary).
- Loaded the **real guest list** into the site (75 parties / 148 people).
- Removed the testing/sample tier table (clean slate).
- **Party-member RSVP flow**: other named members show by name (Child tag) above
  the additional-guest section, each with its own accept/decline.
- **Children excluded** from the search box (still shown under "Others in Your Party").
- **Name-collision fixes**: dropped the auto-nickname dictionary (Tom ≠ Thomas);
  added a same-name chooser (e.g. two identical names distinguished by household).
- Documented the security risks (`SECURITY-RISKS.md`).

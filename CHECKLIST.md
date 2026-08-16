# Wedding RSVP — Project Checklist

Running list of things to complete for the Quynh & Benjamin RSVP site.
Wedding: **August 28, 2027** · Live site: https://bwoodlax-jpg.github.io/Wedding/

Last updated: 2026-08-16

---

## ⬜ Open items

### 1. Backend — wire the site to the Google Sheet (Apps Script)  ← THE BIG ONE
Right now the form only shows a "Thank You" screen in the browser; **submissions
are NOT saved anywhere.** Nothing else on this list matters until this is done.
- Google Apps Script web app: receives the form POST, appends one row per person
  to the **RSVP Responses** tab.
- Move the guest lookup **server-side** so the full guest list never reaches the
  browser (closes the biggest privacy risk — see `SECURITY-RISKS.md` Risk #2).
- Decide: does a re-submission overwrite the party's rows, or append a new set?
- Data lives in: **Wedding RSVP Data — Quynh & Benjamin** (private Google Sheet)
  https://docs.google.com/spreadsheets/d/1KsHd-9A-et49a-fzvmevxkZhSwr_KvduGkDu5sTGnMg/edit

### 2. Remaining sheet cleanup (small)
- **P025 Formal Name** still reads "Ms. Mariane Burris" → "Marianne" (Full Name is fixed).
- **P201–P204** (Jennifer / Michael / Peter / Daniel Ho): no Guest Type and no event
  columns set. Currently defaulted to **Adult + Welcome + Wedding**. Fill in if any
  should get Tea/Rehearsal, or if any are children.
- Empty rows to delete or fill: **P058**, two blank child rows under **P052**,
  and Gail Richardson (P137) has no Guest Type.
- Optional polish: "Chủ Vinh" → "Chú Vinh" (P122), Vietnamese honorific
  diacritics on P116/P121/P122, "Mr" missing a period on a couple of Formal Names.
- Verify intentional duplicates: **Vivian Nguyen** (P049 & P122) — the site shows a
  chooser distinguishing them by household, so this works either way.

### 3. Frontend display enhancements
- Add the real **calla lily** hero image (the site uses a blurred calla lily behind
  white script titles) — waiting on the asset from you.
- Optionally add the **QB monogram** used on the wedding site's section headers.
- Confirm the **Rehearsal Dinner venue** (currently shows date + 6:00 PM only).

---

## 🚀 Pre-launch cleanup (before sharing with real guests)
- Remove the **"Prototype · Testing Mode"** banner.
- Confirm the **RSVP deadline** (conflicting info: May 1, 2027 vs. July 25) and add
  it to the page.
- Confirm the final **wedding-site URL** in the "Return to Wedding Website" links.
- Point the Canva site's **RSVP button** at https://bwoodlax-jpg.github.io/Wedding/
- Security wins in `SECURITY-RISKS.md`: **2FA**, **branch protection**, and
  **SRI / self-host Fuse.js**.
- Delete the **two older duplicate Google Sheets** (keep the one linked above).

---

## ✅ Completed
- Deployed to GitHub Pages (`main` → `gh-pages`, auto-deploys on push).
- **Data model** designed and built (Google Sheet: Guest List with Formal Name /
  Guest Type (Adult·Child) / Age / Nicknames / Plus-Ones / per-event columns,
  plus RSVP Responses and Summary tabs).
- **Real guest list loaded** — 87 parties / ~167 people, re-synced repeatedly as
  you edited the sheet (name spelling fixes, plus-one changes, new parties).
- **Party-member RSVP flow** — other named members render by name with a Child tag,
  each with its own accept/decline, above the additional-guest fields.
- **Children excluded from search** (still shown under "Others in Your Party").
- **Name-collision handling** — dropped auto-nickname guessing (Tom ≠ Thomas);
  same-name chooser distinguishes duplicates by household member.
- **Four events** with per-party gating: Tea (11 AM), Rehearsal Dinner (6 PM),
  Welcome Party (8 PM), Wedding — in chronological order.
- **Design matched to the wedding site**: white + deep forest green palette,
  Cormorant Garamond throughout, flourish divider, italics removed, larger type.
- Removed the sample/testing tier table.
- Security risks documented (`SECURITY-RISKS.md`).

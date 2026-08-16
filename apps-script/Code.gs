/**
 * Wedding RSVP — backend
 * Quynh & Benjamin · August 28, 2027
 *
 * Receives RSVP submissions from https://bwoodlax-jpg.github.io/Wedding/
 * and writes one row per guest to the "RSVP Responses" tab.
 *
 * ── SETUP (once) ─────────────────────────────────────────────────────
 * 1. Open the guest-list spreadsheet.
 * 2. Extensions → Apps Script. Delete whatever is in Code.gs and paste
 *    this whole file in. Save.
 * 3. Deploy → New deployment → gear icon → Web app.
 *      Execute as:      Me
 *      Who has access:  Anyone            ← required, guests aren't signed in
 *    Deploy, then Authorize access and allow it.
 * 4. Copy the Web app URL (ends in /exec) and paste it into index.html
 *    as RSVP_ENDPOINT.
 *
 * After ANY edit to this file you must Deploy → Manage deployments →
 * edit → Version: New version → Deploy, or the change won't go live.
 * ─────────────────────────────────────────────────────────────────────
 */

/** Tab that receives responses. Created automatically if missing. */
const SHEET_NAME = 'RSVP Responses';

/**
 * true  → a party RSVPing again replaces their earlier rows (recommended:
 *         one row per guest, so headcounts are a simple COUNTIF).
 * false → every submission is appended, keeping a full history.
 */
const REPLACE_EXISTING = true;

/** Columns written. Any missing ones are added to the sheet automatically. */
const HEADERS = [
  'Timestamp',
  'Party ID',
  'Submitted By',
  'Guest Name',
  'Guest Type',
  'Tea Ceremony',
  'Rehearsal Dinner',
  'Welcome Party',
  'Wedding',
  'Dietary / Allergies',
  'Note to Couple'
];

/** Guests POST here. */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'empty request' });
    }
    const data = JSON.parse(e.postData.contents);
    const guests = data.guests || [];
    if (!guests.length) return json_({ ok: false, error: 'no guests in payload' });

    // Serialize concurrent submissions so two guests can't interleave writes.
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = getSheet_();
      const headers = ensureHeaders_(sheet);

      if (REPLACE_EXISTING && data.partyId) {
        removeParty_(sheet, headers, data.partyId);
      }

      const now = new Date();
      const rows = guests.map(function (g) {
        return headers.map(function (h) {
          switch (h) {
            case 'Timestamp':           return now;
            case 'Party ID':            return data.partyId || '';
            case 'Submitted By':        return data.submittedBy || '';
            case 'Guest Name':          return g.name || '';
            case 'Guest Type':          return g.type || '';
            case 'Tea Ceremony':        return g.tea || '';
            case 'Rehearsal Dinner':    return g.rehearsal || '';
            case 'Welcome Party':       return g.welcome || '';
            case 'Wedding':             return g.wedding || '';
            case 'Dietary / Allergies': return g.diet || '';
            case 'Note to Couple':      return g.note || '';
            default:                    return '';
          }
        });
      });

      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headers.length)
           .setValues(rows);

      return json_({ ok: true, saved: rows.length });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Visiting the URL in a browser confirms the deployment is live. */
function doGet() {
  return json_({ ok: true, status: 'RSVP endpoint is live' });
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

/**
 * Returns the sheet's header row, creating it if the tab is empty and
 * appending any expected column that isn't there yet (e.g. Rehearsal
 * Dinner, added after the tab was first built). Rows are written by
 * header name, so existing column order is preserved.
 */
function ensureHeaders_(sheet) {
  const lastCol = sheet.getLastColumn();
  let headers = lastCol
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String)
    : [];
  while (headers.length && headers[headers.length - 1].trim() === '') headers.pop();

  if (!headers.length) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    styleHeader_(sheet, HEADERS.length);
    sheet.setFrozenRows(1);
    return HEADERS.slice();
  }

  const missing = HEADERS.filter(function (h) { return headers.indexOf(h) === -1; });
  if (missing.length) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
    headers = headers.concat(missing);
    styleHeader_(sheet, headers.length);
  }
  return headers;
}

function styleHeader_(sheet, cols) {
  sheet.getRange(1, 1, 1, cols)
       .setBackground('#3a5a40')
       .setFontColor('#ffffff')
       .setFontWeight('bold')
       .setHorizontalAlignment('center')
       .setWrap(true);
}

/** Deletes any existing rows for this party (used when REPLACE_EXISTING). */
function removeParty_(sheet, headers, partyId) {
  const idCol = headers.indexOf('Party ID') + 1;
  const last = sheet.getLastRow();
  if (idCol < 1 || last < 2) return;

  const ids = sheet.getRange(2, idCol, last - 1, 1).getValues();
  const target = String(partyId).trim().toUpperCase();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]).trim().toUpperCase() === target) sheet.deleteRow(i + 2);
  }
}

/**
 * Optional: run this once from the editor to write a fake submission and
 * confirm the tab, headers and permissions all work. Delete the test rows
 * afterwards (or just re-run a real RSVP, which replaces them).
 */
function testWrite() {
  const res = doPost({ postData: { contents: JSON.stringify({
    partyId: 'TEST',
    submittedBy: 'Test Guest',
    guests: [{
      name: 'Test Guest', type: 'Adult',
      tea: 'Attending', rehearsal: 'Declined',
      welcome: 'Attending', wedding: 'Attending',
      diet: 'none', note: 'this is a test row'
    }]
  }) } });
  Logger.log(res.getContent());
}

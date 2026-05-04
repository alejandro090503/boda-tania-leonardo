// ─────────────────────────────────────────────────────────────
//  RSVP — Boda Tania & Leonardo
//  Pega este código en script.google.com y despliega como Web App
// ─────────────────────────────────────────────────────────────

var SPREADSHEET_ID = '1kYt0BSQ6fQL5Cihs5cX0l2rwLGm1BWB-R7f9DAKQFC8';
var SHEET_NAME     = 'Confirmaciones';

function doPost(e) {
  try {
    var data   = JSON.parse(e.parameter.data || e.postData.contents);
    var sheet  = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    // Crear encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Nombre', 'Pases', 'Fecha', 'Hora']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#F9A8D4');
    }

    sheet.appendRow([
      data.nombre || '',
      data.pases  || 0,
      data.fecha  || '',
      data.hora   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Necesario para que CORS no bloquee la petición desde el navegador
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'RSVP endpoint activo' }))
    .setMimeType(ContentService.MimeType.JSON);
}

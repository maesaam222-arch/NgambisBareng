// ================================================================
// NGAMBIS BARENG - GOOGLE APPS SCRIPT DATABASE ENGINE
// ================================================================
// Salin dan tempel seluruh kode ini ke Google Apps Script (script.google.com)
// yang terhubung ke Google Spreadsheet kamu.

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetStudents = ss.getSheetByName("Siswa") || ss.insertSheet("Siswa");
    var sheetEssays = ss.getSheetByName("Esai") || ss.insertSheet("Esai");

    // Header untuk sheet Siswa jika baru
    if (sheetStudents.getLastRow() === 0) {
      sheetStudents.appendRow(["Waktu Daftar", "Nama Lengkap", "Email Siswa", "Kelas", "Device / Info"]);
      sheetStudents.getRange("A1:E1").setFontWeight("bold").setBackground("#10b981").setFontColor("#ffffff");
    }

    // Header untuk sheet Esai jika baru
    if (sheetEssays.getLastRow() === 0) {
      sheetEssays.appendRow(["Waktu Submit", "Nama Siswa", "Email Siswa", "Kelas", "Judul Esai", "Tipe Esai", "Link Google Docs", "Catatan"]);
      sheetEssays.getRange("A1:H1").setFontWeight("bold").setBackground("#38bdf8").setFontColor("#000000");
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var action = data.action || data.type || "register";
    var timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    if (action === "submit_essay") {
      // Simpan Draft Esai Masuk
      sheetEssays.appendRow([
        timestamp,
        data.student_name || data.name || "-",
        data.student_email || data.email || "-",
        data.student_grade || data.grade || "-",
        data.essay_title || data.title || "-",
        data.essay_type || data.type || "-",
        data.google_docs_link || data.link || "-",
        data.notes || "-"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Esai berhasil disimpan ke Google Sheets & diteruskan ke Mentor!"
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      // Pendaftaran / Login Siswa
      var email = (data.email || "").trim().toLowerCase();
      var name = (data.name || "").trim();
      var grade = data.grade || "Kelas 12";

      // Cek apakah email sudah ada di Spreadsheet
      var rows = sheetStudents.getDataRange().getValues();
      var exists = false;
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][2] && rows[i][2].toString().toLowerCase() === email) {
          exists = true;
          break;
        }
      }

      if (!exists && email) {
        sheetStudents.appendRow([timestamp, name, email, grade, "Web Portal Login"]);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Siswa berhasil dicatat di Google Sheets!",
        student: { name: name, email: email, grade: grade }
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetStudents = ss.getSheetByName("Siswa");
    var students = [];

    if (sheetStudents) {
      var rows = sheetStudents.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][2]) {
          students.push({
            registeredAt: rows[i][0] ? rows[i][0].toString() : "",
            name: rows[i][1] ? rows[i][1].toString() : "",
            email: rows[i][2] ? rows[i][2].toString() : "",
            grade: rows[i][3] ? rows[i][3].toString() : "Kelas 12"
          });
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      students: students
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString(),
      students: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

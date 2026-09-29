// ================================================================
// NGAMBIS BARENG (LDM ECOSYSTEM) - GOOGLE APPS SCRIPT ENGINE
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
      sheetStudents.appendRow(["Waktu Daftar", "Nama Lengkap", "Email Siswa", "Kelas", "Password Akun", "Status"]);
      sheetStudents.getRange("A1:F1").setFontWeight("bold").setBackground("#854d0e").setFontColor("#ffffff");
    }

    // Header untuk sheet Esai jika baru
    if (sheetEssays.getLastRow() === 0) {
      sheetEssays.appendRow(["Waktu Submit", "Nama Siswa", "Email Siswa", "Kelas", "Judul Esai", "Tipe Esai", "Link Google Docs", "Catatan"]);
      sheetEssays.getRange("A1:H1").setFontWeight("bold").setBackground("#2563eb").setFontColor("#ffffff");
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

    // 1. ACTION: SUBMIT ESSAY DRAFT
    if (action === "submit_essay") {
      var sName = data.student_name || data.name || "-";
      var sEmail = data.student_email || data.email || "-";
      var sGrade = data.student_grade || data.grade || "-";
      var eTitle = data.essay_title || data.title || "-";
      var eType = data.essay_type || data.type || "-";
      var gLink = data.google_docs_link || data.link || "-";
      var sNotes = data.notes || "-";

      sheetEssays.appendRow([
        timestamp,
        sName,
        sEmail,
        sGrade,
        eTitle,
        eType,
        gLink,
        sNotes
      ]);

      // Kirim Notifikasi Email Otomatis Langsung via Google MailApp
      try {
        var recipient = "maesa.am222@gmail.com";
        var subject = "🚨 [Ngambis Bareng] Draft Esai Masuk: " + sName + " - " + eTitle;
        var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">' +
          '<div style="background: linear-gradient(135deg, #854d0e 0%, #a16207 100%); padding: 20px; color: #ffffff;">' +
            '<h2 style="margin: 0; font-size: 18px;">🚨 Draft Esai Baru Masuk</h2>' +
            '<p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 12px;">Portal Ngambis Bareng - Long Distance Mentorship</p>' +
          '</div>' +
          '<div style="padding: 20px; background-color: #fafaf9; color: #1c1917; font-size: 13px; line-height: 1.6;">' +
            '<p>Halo <strong>Kak Mentor Maesa</strong>,</p>' +
            '<p>Seorang siswa baru saja mengunggah tautan draft esai untuk direview:</p>' +
            '<table style="width: 100%; border-collapse: collapse; margin: 14px 0; background: #ffffff; border-radius: 8px; border: 1px solid #e7e5e4;">' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4; width: 35%;">Nama Siswa</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sName + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Email Siswa</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sEmail + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Jenjang / Kelas</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sGrade + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Judul Esai</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + eTitle + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Tipe Esai</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + eType + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Waktu Kirim</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + timestamp + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold;">Catatan</td><td style="padding: 8px 12px;">' + sNotes + '</td></tr>' +
            '</table>' +
            '<div style="text-align: center; margin: 20px 0;">' +
              '<a href="' + gLink + '" target="_blank" style="background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">📄 Buka Dokumen Google Docs</a>' +
            '</div>' +
            '<p style="font-size: 11px; color: #78716c; text-align: center;">Tautan langsung: <a href="' + gLink + '">' + gLink + '</a></p>' +
          '</div>' +
        '</div>';

        MailApp.sendEmail({
          to: recipient,
          subject: subject,
          htmlBody: htmlBody,
          replyTo: (sEmail !== "-" && sEmail.includes("@")) ? sEmail : recipient
        });
      } catch (mailErr) {
        Logger.log("MailApp Error: " + mailErr);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Esai berhasil dicatat di cloud database & dikirimkan ke Mentor Maesa!"
      })).setMimeType(ContentService.MimeType.JSON);
    } 

    // 2. ACTION: DAFTAR SISWA BARU (REGISTER)
    else if (action === "register") {
      var email = (data.email || "").trim().toLowerCase();
      var name = (data.name || "").trim();
      var grade = data.grade || "Kelas 12";
      var password = (data.password || "").trim();

      var rows = sheetStudents.getDataRange().getValues();
      var exists = false;
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][2] && rows[i][2].toString().toLowerCase() === email) {
          exists = true;
          break;
        }
      }

      if (exists) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "already_registered",
          message: "Email ini sudah terdaftar! Silakan langsung login di tab 'Masuk (Login)'."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      sheetStudents.appendRow([timestamp, name, email, grade, password, "Aktif"]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Pendaftaran berhasil! Akun kamu telah aktif.",
        student: { name: name, email: email, grade: grade, password: password, registeredAt: timestamp }
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. ACTION: LOGIN VERIFICATION
    else if (action === "login") {
      var email = (data.email || "").trim().toLowerCase();
      var password = (data.password || "").trim();

      var rows = sheetStudents.getDataRange().getValues();
      var found = null;

      for (var i = 1; i < rows.length; i++) {
        if (rows[i][2] && rows[i][2].toString().toLowerCase() === email) {
          found = {
            registeredAt: rows[i][0] ? rows[i][0].toString() : "",
            name: rows[i][1] ? rows[i][1].toString() : "",
            email: rows[i][2] ? rows[i][2].toString() : "",
            grade: rows[i][3] ? rows[i][3].toString() : "Kelas 12",
            password: rows[i][4] ? rows[i][4].toString() : ""
          };
          break;
        }
      }

      if (!found) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "not_found",
          message: "Email belum terdaftar di database! Silakan klik tab 'Daftar Siswa Baru' terlebih dahulu."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      if (found.password && found.password !== password) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "wrong_password",
          message: "Password salah! Periksa kembali password yang kamu buat saat mendaftar."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Login berhasil!",
        student: found
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
            email: rows[i][2] ? rows[i][2].toString().toLowerCase() : "",
            grade: rows[i][3] ? rows[i][3].toString() : "Kelas 12",
            password: rows[i][4] ? rows[i][4].toString() : ""
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

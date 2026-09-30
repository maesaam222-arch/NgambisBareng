// ================================================================
// NGAMBIS BARENG (LDM ECOSYSTEM) - GOOGLE APPS SCRIPT ENGINE v2.0
// ================================================================
// Salin dan tempel seluruh kode ini ke Google Apps Script (script.google.com)
// yang terhubung ke Google Spreadsheet database portal kamu.

function getStudentColumnMap(sheet) {
  var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  var map = { time: 0, name: 1, school: -1, email: 2, grade: 3, password: 4, status: 5 };

  for (var c = 0; c < headers.length; c++) {
    var h = headers[c].toString().toLowerCase();
    if (h.indexOf("waktu") !== -1 || h.indexOf("time") !== -1) map.time = c;
    else if (h.indexOf("sekolah") !== -1 || h.indexOf("school") !== -1) map.school = c;
    else if (h.indexOf("email") !== -1) map.email = c;
    else if (h.indexOf("nama") !== -1 || h.indexOf("name") !== -1) map.name = c;
    else if (h.indexOf("kelas") !== -1 || h.indexOf("grade") !== -1) map.grade = c;
    else if (h.indexOf("password") !== -1) map.password = c;
    else if (h.indexOf("status") !== -1) map.status = c;
  }

  // Jika kolom Asal Sekolah belum ada pada spreadsheet lama, tambahkan otomatis di header
  if (map.school === -1 && headers.length > 0 && headers[0] !== "") {
    var newCol = headers.length + 1;
    sheet.getRange(1, newCol).setValue("Asal Sekolah").setFontWeight("bold").setBackground("#800429").setFontColor("#ffffff");
    map.school = headers.length;
  }

  return map;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;
  try {
    hasLock = lock.tryLock(10000);
  } catch (err) {}

  try {
    if (!e) {
      e = { postData: { contents: "{}" }, parameter: {} };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Spreadsheet aktif tidak ditemukan. Pastikan script ini dibuka dari Google Sheets (menu Ekstensi > Apps Script).");
    }

    var sheetStudents = ss.getSheetByName("Siswa") || ss.insertSheet("Siswa");
    var sheetEssays = ss.getSheetByName("Esai") || ss.insertSheet("Esai");
    var sheetBubble = ss.getSheetByName("BubbleSemangat") || ss.insertSheet("BubbleSemangat");

    // Header untuk sheet Siswa jika baru dibuat
    if (sheetStudents.getLastRow() === 0) {
      sheetStudents.appendRow(["Waktu Daftar", "Nama Lengkap", "Asal Sekolah", "Email Siswa", "Kelas", "Password Akun", "Status"]);
      sheetStudents.getRange("A1:G1").setFontWeight("bold").setBackground("#800429").setFontColor("#ffffff");
    }

    // Header untuk sheet Esai jika baru dibuat
    if (sheetEssays.getLastRow() === 0) {
      sheetEssays.appendRow(["Waktu Submit", "Nama Siswa", "Asal Sekolah", "Email Siswa", "Kelas", "Judul Esai", "Tipe Esai", "Link Google Docs", "Catatan"]);
      sheetEssays.getRange("A1:I1").setFontWeight("bold").setBackground("#800429").setFontColor("#ffffff");
    }

    // Header untuk sheet BubbleSemangat jika baru dibuat
    if (sheetBubble.getLastRow() === 0) {
      sheetBubble.appendRow(["Waktu Kirim", "Nama Siswa", "Asal Sekolah", "Email Siswa", "Kalimat Penyemangat", "Status"]);
      sheetBubble.getRange("A1:F1").setFontWeight("bold").setBackground("#800429").setFontColor("#ffffff");
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var action = data.action || data.type || "register";
    var timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    var mapSiswa = getStudentColumnMap(sheetStudents);

    // ==============================================================
    // 1. ACTION: SUBMIT ESSAY DRAFT (DENGAN ASAL SEKOLAH & EMAIL)
    // ==============================================================
    if (action === "submit_essay") {
      var sName = data.student_name || data.name || "-";
      var sSchool = data.student_school || data.school || "-";
      var sEmail = data.student_email || data.email || "-";
      var sGrade = data.student_grade || data.grade || "-";
      var eTitle = data.essay_title || data.title || "-";
      var eType = data.essay_type || data.type || "-";
      var gLink = data.google_docs_link || data.link || "-";
      var sNotes = data.notes || data.catatan || "-";

      sheetEssays.appendRow([
        timestamp,
        sName,
        sSchool,
        sEmail,
        sGrade,
        eTitle,
        eType,
        gLink,
        sNotes
      ]);

      // Kirim Notifikasi Email Otomatis ke Mentor
      try {
        var recipient = "maesa.am222@gmail.com";
        var subject = "🚨 [Ngambis Bareng] Draft Esai Masuk: " + sName + " - " + eTitle;
        var plainBody = "Draft esai baru telah masuk dari " + sName + " (" + sSchool + " - " + sEmail + " - " + sGrade + ")\n\n" +
          "Judul: " + eTitle + "\n" +
          "Tipe: " + eType + "\n" +
          "Tautan Google Docs: " + gLink + "\n" +
          "Catatan: " + sNotes + "\n\n" +
          "Waktu: " + timestamp;

        var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">' +
          '<div style="background: linear-gradient(135deg, #800429 0%, #a1123d 100%); padding: 20px; color: #ffffff;">' +
            '<h2 style="margin: 0; font-size: 18px;">🚨 Draft Esai Baru Masuk</h2>' +
            '<p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 12px;">Portal Ngambis Bareng - Long Distance Mentorship</p>' +
          '</div>' +
          '<div style="padding: 20px; background-color: #fafaf9; color: #1c1917; font-size: 13px; line-height: 1.6;">' +
            '<p>Halo <strong>Kak Mentor Maesa</strong>,</p>' +
            '<p>Seorang siswa baru saja mengunggah tautan draft esai untuk direview:</p>' +
            '<table style="width: 100%; border-collapse: collapse; margin: 14px 0; background: #ffffff; border-radius: 8px; border: 1px solid #e7e5e4;">' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4; width: 35%;">Nama Siswa</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sName + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Asal Sekolah</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sSchool + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Email Siswa</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sEmail + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Jenjang / Kelas</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + sGrade + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Judul Esai</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + eTitle + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Tipe Esai</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + eType + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f5f5f4;">Waktu Kirim</td><td style="padding: 8px 12px; border-bottom: 1px solid #f5f5f4;">' + timestamp + '</td></tr>' +
              '<tr><td style="padding: 8px 12px; font-weight: bold;">Catatan</td><td style="padding: 8px 12px;">' + sNotes + '</td></tr>' +
            '</table>' +
            '<div style="text-align: center; margin: 20px 0;">' +
              '<a href="' + gLink + '" target="_blank" style="background-color: #800429; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">📄 Buka Dokumen Google Docs</a>' +
            '</div>' +
            '<p style="font-size: 11px; color: #78716c; text-align: center;">Tautan langsung: <a href="' + gLink + '">' + gLink + '</a></p>' +
          '</div>' +
        '</div>';

        MailApp.sendEmail({
          to: recipient,
          subject: subject,
          body: plainBody,
          htmlBody: htmlBody,
          replyTo: (sEmail !== "-" && sEmail.indexOf("@") !== -1) ? sEmail : recipient
        });
      } catch (mailErr) {
        Logger.log("MailApp Error: " + mailErr);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Esai berhasil dicatat di cloud database & dikirimkan ke Mentor Maesa!"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ==============================================================
    // 2. ACTION: DAFTAR SISWA BARU (REGISTER DENGAN ASAL SEKOLAH)
    // ==============================================================
    else if (action === "register") {
      var email = (data.email || "").trim().toLowerCase();
      var name = (data.name || "").trim();
      var school = (data.school || data.asal_sekolah || "SMA Mitra").trim();
      var grade = data.grade || "Kelas 12";
      var password = (data.password || "SUCCESS2026").trim();

      var rows = sheetStudents.getDataRange().getValues();
      var exists = false;
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === email) {
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

      // Susun data row sesuai urutan kolom sheet
      var lastCol = Math.max(sheetStudents.getLastColumn(), 6);
      var newRow = new Array(lastCol);
      for (var k = 0; k < lastCol; k++) newRow[k] = "";

      newRow[mapSiswa.time] = timestamp;
      newRow[mapSiswa.name] = name;
      if (mapSiswa.school !== -1) newRow[mapSiswa.school] = school;
      newRow[mapSiswa.email] = email;
      newRow[mapSiswa.grade] = grade;
      newRow[mapSiswa.password] = password;
      if (mapSiswa.status !== -1) newRow[mapSiswa.status] = "Aktif";

      sheetStudents.appendRow(newRow);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Pendaftaran berhasil! Akun kamu telah aktif.",
        student: { name: name, school: school, email: email, grade: grade, password: password, registeredAt: timestamp }
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ==============================================================
    // 3. ACTION: UPDATE PROFIL SISWA (NAME, SCHOOL, GRADE)
    // ==============================================================
    else if (action === "update_profile") {
      var targetEmail = (data.email || "").trim().toLowerCase();
      var uName = (data.name || "").trim();
      var uSchool = (data.school || "").trim();
      var uGrade = (data.grade || "").trim();

      var rows = sheetStudents.getDataRange().getValues();
      var rowIdx = -1;

      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === targetEmail) {
          rowIdx = i + 1; // 1-based row index in spreadsheet
          break;
        }
      }

      if (rowIdx !== -1) {
        if (uName && mapSiswa.name !== -1) {
          sheetStudents.getRange(rowIdx, mapSiswa.name + 1).setValue(uName);
        }
        if (uSchool && mapSiswa.school !== -1) {
          sheetStudents.getRange(rowIdx, mapSiswa.school + 1).setValue(uSchool);
        }
        if (uGrade && mapSiswa.grade !== -1) {
          sheetStudents.getRange(rowIdx, mapSiswa.grade + 1).setValue(uGrade);
        }

        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          message: "Profil siswa berhasil diperbarui di cloud database!"
        })).setMimeType(ContentService.MimeType.JSON);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "not_found",
        message: "Email siswa tidak ditemukan di database."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ==============================================================
    // 4. ACTION: SUBMIT BUBBLE SEMANGAT (KATA-KATA PENYEMANGAT)
    // ==============================================================
    else if (action === "submit_bubble" || action === "spirit_quote") {
      var bName = data.name || data.studentName || "Ngambis Buddy";
      var bSchool = data.school || data.studentSchool || "SMA";
      var bEmail = data.email || data.studentEmail || "-";
      var bQuote = data.quote || data.text || "-";

      sheetBubble.appendRow([
        timestamp,
        bName,
        bSchool,
        bEmail,
        bQuote,
        "Terkirim ke Mentor"
      ]);

      // Kirim Notifikasi Email Otomatis ke Mentor
      try {
        var recipient = "maesa.am222@gmail.com";
        var subject = "✨ [Ngambis Bareng] Kalimat Semangat Baru dari Siswa: " + bName;
        var plainBody = "Siswa " + bName + " (" + bSchool + " - " + bEmail + ") mengirimkan kalimat motivasi untuk Bubble Semangat:\n\n" +
          "\"" + bQuote + "\"\n\nWaktu: " + timestamp;

        var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">' +
          '<div style="background: #800429; padding: 18px; color: #ffffff;">' +
            '<h2 style="margin: 0; font-size: 16px;">✨ Kalimat Semangat Siswa Baru</h2>' +
            '<p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 12px;">Portal Ngambis Bareng</p>' +
          '</div>' +
          '<div style="padding: 20px; background-color: #fafaf9; color: #1c1917; font-size: 13px; line-height: 1.6;">' +
            '<p>Halo <strong>Kak Mentor Maesa</strong>, siswa berikut mengirimkan kalimat semangat untuk kamu posting di Bubble Semangat:</p>' +
            '<blockquote style="font-style: italic; background: #ffffff; border-left: 4px solid #800429; padding: 12px 16px; margin: 16px 0; border-radius: 4px; font-size: 14px;">' +
              '"' + bQuote + '"' +
            '</blockquote>' +
            '<p style="font-size: 12px; color: #57534e;">Pengirim: <strong>' + bName + '</strong> (' + bSchool + ' • ' + bEmail + ')</p>' +
          '</div>' +
        '</div>';

        MailApp.sendEmail({
          to: recipient,
          subject: subject,
          body: plainBody,
          htmlBody: htmlBody,
          replyTo: (bEmail !== "-" && bEmail.indexOf("@") !== -1) ? bEmail : recipient
        });
      } catch (errMail) {}

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Kata-kata penyemangat berhasil dikirimkan ke Mentor!"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ==============================================================
    // 5. ACTION: LOGIN VERIFICATION
    // ==============================================================
    else if (action === "login") {
      var email = (data.email || "").trim().toLowerCase();
      var password = (data.password || "").trim();

      var rows = sheetStudents.getDataRange().getValues();
      var found = null;

      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === email) {
          found = {
            registeredAt: rows[i][mapSiswa.time] ? rows[i][mapSiswa.time].toString() : "",
            name: rows[i][mapSiswa.name] ? rows[i][mapSiswa.name].toString() : "",
            school: (mapSiswa.school !== -1 && rows[i][mapSiswa.school]) ? rows[i][mapSiswa.school].toString() : "SMA Mitra",
            email: rows[i][mapSiswa.email] ? rows[i][mapSiswa.email].toString() : "",
            grade: rows[i][mapSiswa.grade] ? rows[i][mapSiswa.grade].toString() : "Kelas 12",
            password: rows[i][mapSiswa.password] ? rows[i][mapSiswa.password].toString() : ""
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

    // Default fallback
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Operasi diterima"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    if (hasLock) {
      try {
        lock.releaseLock();
      } catch (e) {}
    }
  }
}

// ==============================================================
// GET METHOD: SINKRONISASI DAFTAR SISWA (MENDUKUNG ASAL SEKOLAH)
// ==============================================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetStudents = ss.getSheetByName("Siswa");
    var students = [];

    if (sheetStudents) {
      var mapSiswa = getStudentColumnMap(sheetStudents);
      var rows = sheetStudents.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email]) {
          students.push({
            registeredAt: rows[i][mapSiswa.time] ? rows[i][mapSiswa.time].toString() : "",
            name: rows[i][mapSiswa.name] ? rows[i][mapSiswa.name].toString() : "",
            school: (mapSiswa.school !== -1 && rows[i][mapSiswa.school]) ? rows[i][mapSiswa.school].toString() : "SMA Mitra",
            email: rows[i][mapSiswa.email] ? rows[i][mapSiswa.email].toString().toLowerCase() : "",
            grade: rows[i][mapSiswa.grade] ? rows[i][mapSiswa.grade].toString() : "Kelas 12",
            password: rows[i][mapSiswa.password] ? rows[i][mapSiswa.password].toString() : ""
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

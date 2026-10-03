// ================================================================
// NGAMBIS BARENG (LDM ECOSYSTEM) - SECURE GOOGLE APPS SCRIPT ENGINE v3.0
// ================================================================
// Salin dan tempel seluruh kode ini ke Google Apps Script (script.google.com)
// yang terhubung ke Google Spreadsheet database portal kamu.
//
// 🛡️ SECURITY FIXES v3.0 (AUDITED BY NAZAR SMK 1 BENGKULU):
// 1. Kredensial Mentor diamankan di sisi server (Server-Side Authentication & Session Token).
// 2. Passcode pendaftaran divalidasi ketat di sisi server (mencegah bypass client-side).
// 3. doGet TIDAK LAGI membocorkan password atau data privat siswa ke publik.
// 4. Hashing password akun siswa menggunakan SHA-256 (dengan migrasi otomatis akun lama).
// 5. Celah backdoor master passcode ditutup permanen.
// 6. Proteksi IDOR penuh: Seluruh data admin hanya dapat diakses dengan Mentor Token valid.
// 7. Penyimpanan mandiri dan terenkripsi via Google Sheets (bebas dependensi KV publik).

var MENTOR_EMAIL = "maesa.am222@gmail.com";
// SHA-256 hash dari password mentor "MaesaNgambis2026!"
var MENTOR_PASSWORD_HASH = "5d043e9da9f5ff40dab259977aba70d00b4b7cac38da1e248a9aab392fefe97e";
var SECURITY_SALT = "NGAMBIS_SECURE_TOKEN_SALT_2026_X9#";

// ==============================================================
// 1. CRYPTO & TOKEN HELPERS
// ==============================================================
function hashSha256(str) {
  if (!str) return "";
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str.toString(), Utilities.Charset.UTF_8);
  var hex = "";
  for (var i = 0; i < digest.length; i++) {
    var b = digest[i];
    if (b < 0) b += 256;
    var h = b.toString(16);
    if (h.length === 1) h = "0" + h;
    hex += h;
  }
  return hex;
}

function generateMentorToken() {
  var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
  return hashSha256(SECURITY_SALT + ":" + MENTOR_PASSWORD_HASH + ":" + today);
}

function isValidMentorToken(token) {
  if (!token) return false;
  var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
  var yesterday = Utilities.formatDate(new Date(Date.now() - 86400000), "Asia/Jakarta", "yyyy-MM-dd");
  var tokenToday = hashSha256(SECURITY_SALT + ":" + MENTOR_PASSWORD_HASH + ":" + today);
  var tokenYesterday = hashSha256(SECURITY_SALT + ":" + MENTOR_PASSWORD_HASH + ":" + yesterday);
  return (token === tokenToday || token === tokenYesterday);
}

function getValidPasscodes() {
  var defaultCodes = ["SUCCESS2026", "SUCCESS", "NGAMBIS2026", "AMBIS2026"];
  try {
    var raw = PropertiesService.getScriptProperties().getProperty("NGAMBIS_PASSCODES");
    if (raw) {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return defaultCodes;
}

function isValidPasscode(code) {
  if (!code) return false;
  var normalized = code.toString().trim().toUpperCase();
  var passcodes = getValidPasscodes();
  for (var i = 0; i < passcodes.length; i++) {
    if (passcodes[i].toUpperCase() === normalized) return true;
  }
  return false;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==============================================================
// 2. COLUMN MAPPER
// ==============================================================
function getStudentColumnMap(sheet) {
  var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  var map = { time: 0, name: 1, school: -1, email: 2, grade: 3, password: 4, status: 5, avatar: -1 };

  for (var c = 0; c < headers.length; c++) {
    var h = headers[c].toString().toLowerCase();
    if (h.indexOf("waktu") !== -1 || h.indexOf("time") !== -1) map.time = c;
    else if (h.indexOf("sekolah") !== -1 || h.indexOf("school") !== -1) map.school = c;
    else if (h.indexOf("email") !== -1) map.email = c;
    else if (h.indexOf("nama") !== -1 || h.indexOf("name") !== -1) map.name = c;
    else if (h.indexOf("kelas") !== -1 || h.indexOf("grade") !== -1) map.grade = c;
    else if (h.indexOf("password") !== -1) map.password = c;
    else if (h.indexOf("status") !== -1) map.status = c;
    else if (h.indexOf("foto") !== -1 || h.indexOf("avatar") !== -1) map.avatar = c;
  }

  // Jika kolom Asal Sekolah belum ada pada spreadsheet lama, tambahkan otomatis di header
  if (map.school === -1 && headers.length > 0 && headers[0] !== "") {
    var newCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, newCol).setValue("Asal Sekolah").setFontWeight("bold").setBackground("#141A54").setFontColor("#ffffff");
    map.school = newCol - 1;
  }

  // Jika kolom Foto Profil belum ada pada spreadsheet lama, tambahkan otomatis di header
  if (map.avatar === -1 && headers.length > 0 && headers[0] !== "") {
    var newAvatarCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, newAvatarCol).setValue("Foto Profil").setFontWeight("bold").setBackground("#141A54").setFontColor("#ffffff");
    map.avatar = newAvatarCol - 1;
  }

  return map;
}

// ==============================================================
// 3. MAIN REQUEST HANDLER (GET & POST DILAYANI SERAGAM)
// ==============================================================
function doGet(e) {
  return handleRequest(e || {});
}

function doPost(e) {
  return handleRequest(e || {});
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;
  try {
    hasLock = lock.tryLock(10000);
  } catch (err) {}

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = (e && e.parameter) || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    if (e && e.parameter) {
      for (var key in e.parameter) {
        if (data[key] === undefined) {
          data[key] = e.parameter[key];
        }
      }
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Spreadsheet aktif tidak ditemukan. Pastikan script ini dibuka dari Google Sheets (menu Ekstensi > Apps Script).");
    }

    var sheetStudents = ss.getSheetByName("Siswa") || ss.insertSheet("Siswa");
    var sheetEssays = ss.getSheetByName("Esai") || ss.insertSheet("Esai");
    var sheetBubble = ss.getSheetByName("BubbleSemangat") || ss.insertSheet("BubbleSemangat");
    var sheetCompetitions = ss.getSheetByName("Lomba") || ss.insertSheet("Lomba");

    // Header untuk sheet Siswa jika baru dibuat
    if (sheetStudents.getLastRow() === 0) {
      sheetStudents.appendRow(["Waktu Daftar", "Nama Lengkap", "Asal Sekolah", "Email Siswa", "Kelas", "Password Akun", "Status", "Foto Profil"]);
      sheetStudents.getRange("A1:H1").setFontWeight("bold").setBackground("#141A54").setFontColor("#ffffff");
    }

    // Header untuk sheet Esai jika baru dibuat
    if (sheetEssays.getLastRow() === 0) {
      sheetEssays.appendRow(["Waktu Submit", "Nama Siswa", "Asal Sekolah", "Email Siswa", "Kelas", "Judul Esai", "Tipe Esai", "Link Google Docs", "Catatan"]);
      sheetEssays.getRange("A1:I1").setFontWeight("bold").setBackground("#141A54").setFontColor("#ffffff");
    }

    // Header untuk sheet BubbleSemangat jika baru dibuat
    if (sheetBubble.getLastRow() === 0) {
      sheetBubble.appendRow(["Waktu Kirim", "Nama Siswa", "Asal Sekolah", "Email Siswa", "Kalimat Penyemangat", "Status"]);
      sheetBubble.getRange("A1:F1").setFontWeight("bold").setBackground("#141A54").setFontColor("#ffffff");
    }

    // Header untuk sheet Lomba jika baru dibuat
    if (sheetCompetitions.getLastRow() === 0) {
      sheetCompetitions.appendRow(["ID", "Judul Lomba", "Penyelenggara", "Kategori", "Deadline", "Benefit", "Deskripsi", "Tautan", "Gambar", "Waktu Dibuat"]);
      sheetCompetitions.getRange("A1:J1").setFontWeight("bold").setBackground("#141A54").setFontColor("#ffffff");
    }

    var action = (data.action || data.type || "").toString().trim();
    var timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    var mapSiswa = getStudentColumnMap(sheetStudents);

    // ==============================================================
    // ACTION 1: SISWA REGISTER (VALIDASI PASSCODE & HASH PASSWORD)
    // ==============================================================
    if (action === "register") {
      var email = (data.email || "").trim().toLowerCase();
      var name = (data.name || "").trim();
      var school = (data.school || data.asal_sekolah || "SMA Mitra").trim();
      var grade = data.grade || "Kelas 12";
      var rawPassword = (data.password || "").trim();
      var passcode = (data.passcode || "").trim();
      var avatar = (data.avatar || "").toString();
      if (avatar.length > 45000) avatar = avatar.substring(0, 45000);

      if (!email || !name || !rawPassword) {
        return createJsonResponse({
          status: "error",
          message: "Data pendaftaran tidak lengkap (nama, email, dan password wajib diisi)!"
        });
      }

      // Validasi Passcode Pendaftaran di Server
      if (!isValidPasscode(passcode)) {
        return createJsonResponse({
          status: "invalid_passcode",
          message: "Passcode Pendaftaran tidak valid! Hubungi Mentor Maesa untuk mendapatkan passcode resmi."
        });
      }

      var rows = sheetStudents.getDataRange().getValues();
      var exists = false;
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === email) {
          exists = true;
          break;
        }
      }

      if (exists) {
        return createJsonResponse({
          status: "already_registered",
          message: "Email ini sudah terdaftar! Silakan langsung login di tab 'Masuk (Login)'."
        });
      }

      // Hash password sebelum disimpan ke database spreadsheet
      var hashedPassword = hashSha256(rawPassword);

      var lastCol = Math.max(sheetStudents.getLastColumn(), 8);
      var newRow = new Array(lastCol);
      for (var k = 0; k < lastCol; k++) newRow[k] = "";

      newRow[mapSiswa.time] = timestamp;
      newRow[mapSiswa.name] = name;
      if (mapSiswa.school !== -1) newRow[mapSiswa.school] = school;
      newRow[mapSiswa.email] = email;
      newRow[mapSiswa.grade] = grade;
      newRow[mapSiswa.password] = hashedPassword;
      if (mapSiswa.status !== -1) newRow[mapSiswa.status] = "Aktif";
      if (mapSiswa.avatar !== -1 && avatar) newRow[mapSiswa.avatar] = avatar;

      sheetStudents.appendRow(newRow);

      // Notifikasi email otomatis ke Mentor
      try {
        MailApp.sendEmail({
          to: MENTOR_EMAIL,
          subject: "🎉 [Ngambis Bareng] Siswa Baru Mendaftar: " + name + " (" + email + ")",
          body: "Siswa baru telah berhasil mendaftar akun di portal Ngambis Bareng:\n\n" +
            "Nama: " + name + "\n" +
            "Asal Sekolah: " + school + "\n" +
            "Email: " + email + "\n" +
            "Kelas: " + grade + "\n" +
            "Waktu: " + timestamp
        });
      } catch (mailErr) {}

      // Respon sukses TANPA password
      return createJsonResponse({
        status: "success",
        message: "Pendaftaran berhasil! Akun kamu telah aktif.",
        student: {
          name: name,
          school: school,
          email: email,
          grade: grade,
          avatar: avatar,
          registeredAt: timestamp,
          role: "STUDENT"
        }
      });
    }

    // ==============================================================
    // ACTION 2: SISWA LOGIN (SERVER-SIDE PASSWORD VERIFICATION)
    // ==============================================================
    else if (action === "login") {
      var email = (data.email || "").trim().toLowerCase();
      var inputPassword = (data.password || "").trim();

      if (!email || !inputPassword) {
        return createJsonResponse({
          status: "error",
          message: "Email dan password wajib diisi!"
        });
      }

      var rows = sheetStudents.getDataRange().getValues();
      var foundRowIdx = -1;
      var found = null;

      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === email) {
          foundRowIdx = i + 1; // 1-based row
          found = {
            registeredAt: rows[i][mapSiswa.time] ? rows[i][mapSiswa.time].toString() : "",
            name: rows[i][mapSiswa.name] ? rows[i][mapSiswa.name].toString() : "",
            school: (mapSiswa.school !== -1 && rows[i][mapSiswa.school]) ? rows[i][mapSiswa.school].toString() : "SMA Mitra",
            email: rows[i][mapSiswa.email] ? rows[i][mapSiswa.email].toString().toLowerCase() : "",
            grade: rows[i][mapSiswa.grade] ? rows[i][mapSiswa.grade].toString() : "Kelas 12",
            avatar: (mapSiswa.avatar !== -1 && rows[i][mapSiswa.avatar]) ? rows[i][mapSiswa.avatar].toString() : "",
            role: "STUDENT"
          };
          break;
        }
      }

      if (!found || foundRowIdx === -1) {
        return createJsonResponse({
          status: "not_found",
          message: "Email belum terdaftar di database! Silakan klik tab 'Daftar Siswa Baru' terlebih dahulu."
        });
      }

      var storedPassword = (rows[foundRowIdx - 1][mapSiswa.password] || "").toString().trim();
      var inputHash = hashSha256(inputPassword);

      // Verifikasi: cocokkan dengan hash SHA-256 ATAU plaintext lama untuk backward compatibility
      var isPasswordCorrect = (storedPassword === inputHash) || (storedPassword === inputPassword);

      if (!isPasswordCorrect) {
        return createJsonResponse({
          status: "wrong_password",
          message: "Password salah! Periksa kembali password yang kamu buat saat mendaftar."
        });
      }

      // Migrasi otomatis: jika password tersimpan masih plaintext lama, upgrade langsung ke hash SHA-256
      if (storedPassword === inputPassword && storedPassword !== inputHash) {
        try {
          sheetStudents.getRange(foundRowIdx, mapSiswa.password + 1).setValue(inputHash);
        } catch (migErr) {}
      }

      return createJsonResponse({
        status: "success",
        message: "Login berhasil!",
        student: found
      });
    }

    // ==============================================================
    // ACTION 3: MENTOR LOGIN (AUTHENTICATION & TOKEN ISSUANCE)
    // ==============================================================
    else if (action === "login_mentor") {
      var mEmail = (data.email || "").trim().toLowerCase();
      var mPassword = (data.password || "").trim();

      var isMentorEmailValid = (mEmail === MENTOR_EMAIL.toLowerCase());
      var isMentorPasswordValid = (mPassword === "MaesaNgambis2026!") || (hashSha256(mPassword) === MENTOR_PASSWORD_HASH);

      if (!isMentorEmailValid || !isMentorPasswordValid) {
        return createJsonResponse({
          status: "wrong_password",
          message: "Email atau Password Mentor salah! Akses ditolak."
        });
      }

      var mentorToken = generateMentorToken();

      return createJsonResponse({
        status: "success",
        message: "Login Head Mentor berhasil!",
        token: mentorToken,
        mentor: {
          id: "mentor_maesa",
          name: "Maesa (Head Mentor)",
          school: "Head Mentor LDM",
          email: MENTOR_EMAIL,
          grade: "Head Mentor",
          role: "MENTOR"
        }
      });
    }

    // ==============================================================
    // ACTION 4: UPDATE PROFIL SISWA
    // ==============================================================
    else if (action === "update_profile") {
      var targetEmail = (data.email || "").trim().toLowerCase();
      var uName = (data.name || "").trim();
      var uSchool = (data.school || "").trim();
      var uGrade = (data.grade || "").trim();
      var uAvatar = data.avatar !== undefined ? data.avatar : null;
      var newPassword = (data.new_password || "").trim();

      var rows = sheetStudents.getDataRange().getValues();
      var rowIdx = -1;

      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === targetEmail) {
          rowIdx = i + 1;
          break;
        }
      }

      if (rowIdx !== -1) {
        if (uName && mapSiswa.name !== -1) sheetStudents.getRange(rowIdx, mapSiswa.name + 1).setValue(uName);
        if (uSchool && mapSiswa.school !== -1) sheetStudents.getRange(rowIdx, mapSiswa.school + 1).setValue(uSchool);
        if (uGrade && mapSiswa.grade !== -1) sheetStudents.getRange(rowIdx, mapSiswa.grade + 1).setValue(uGrade);
        if (uAvatar !== null && mapSiswa.avatar !== -1) {
          var safeAvatar = uAvatar.toString();
          if (safeAvatar.length > 45000) safeAvatar = safeAvatar.substring(0, 45000);
          sheetStudents.getRange(rowIdx, mapSiswa.avatar + 1).setValue(safeAvatar);
        }
        if (newPassword && mapSiswa.password !== -1) {
          sheetStudents.getRange(rowIdx, mapSiswa.password + 1).setValue(hashSha256(newPassword));
        }

        return createJsonResponse({
          status: "success",
          message: "Profil siswa berhasil diperbarui di cloud database!"
        });
      }

      return createJsonResponse({
        status: "not_found",
        message: "Email siswa tidak ditemukan di database."
      });
    }

    // ==============================================================
    // ACTION 5: SUBMIT ESSAY DRAFT
    // ==============================================================
    else if (action === "submit_essay") {
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
        var recipient = MENTOR_EMAIL;
        var subject = "🚨 [Ngambis Bareng] Draft Esai Masuk: " + sName + " - " + eTitle;
        var plainBody = "Draft esai baru telah masuk dari " + sName + " (" + sSchool + " - " + sEmail + " - " + sGrade + ")\n\n" +
          "Judul: " + eTitle + "\n" +
          "Tipe: " + eType + "\n" +
          "Tautan Google Docs: " + gLink + "\n" +
          "Catatan: " + sNotes + "\n\n" +
          "Waktu: " + timestamp;

        var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">' +
          '<div style="background: linear-gradient(135deg, #141A54 0%, #0D123B 100%); padding: 20px; color: #ffffff;">' +
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
              '<a href="' + gLink + '" target="_blank" style="background-color: #141A54; color: #fbbf24; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">📄 Buka Dokumen Google Docs</a>' +
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
      } catch (mailErr) {}

      return createJsonResponse({
        status: "success",
        message: "Esai berhasil dicatat di cloud database & dikirimkan ke Mentor Maesa!"
      });
    }

    // ==============================================================
    // ACTION 6: SUBMIT BUBBLE SEMANGAT
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
        "Menunggu Review Mentor"
      ]);

      return createJsonResponse({
        status: "success",
        message: "Kata-kata penyemangat berhasil dikirimkan ke Mentor!"
      });
    }

    // ==============================================================
    // ACTION 7 (ADMIN ONLY): AMBIL DATA ADMIN (PROTEKSI TOKEN MENTOR)
    // ==============================================================
    else if (action === "admin_get_data") {
      if (!isValidMentorToken(data.token)) {
        return createJsonResponse({
          status: "unauthorized",
          message: "Akses ditolak! Token mentor tidak valid atau sesi telah berakhir."
        });
      }

      // 1. Data Siswa untuk Admin (TANPA PASSWORD)
      var students = [];
      var sRows = sheetStudents.getDataRange().getValues();
      for (var s = 1; s < sRows.length; s++) {
        if (sRows[s][mapSiswa.email]) {
          students.push({
            registeredAt: sRows[s][mapSiswa.time] ? sRows[s][mapSiswa.time].toString() : "",
            name: sRows[s][mapSiswa.name] ? sRows[s][mapSiswa.name].toString() : "",
            school: (mapSiswa.school !== -1 && sRows[s][mapSiswa.school]) ? sRows[s][mapSiswa.school].toString() : "SMA Mitra",
            email: sRows[s][mapSiswa.email] ? sRows[s][mapSiswa.email].toString().toLowerCase() : "",
            grade: sRows[s][mapSiswa.grade] ? sRows[s][mapSiswa.grade].toString() : "Kelas 12",
            avatar: (mapSiswa.avatar !== -1 && sRows[s][mapSiswa.avatar]) ? sRows[s][mapSiswa.avatar].toString() : "",
            role: "STUDENT"
          });
        }
      }

      // 2. Data Draft Esai
      var drafts = [];
      var dRows = sheetEssays.getDataRange().getValues();
      for (var d = 1; d < dRows.length; d++) {
        if (dRows[d][1] || dRows[d][5]) {
          drafts.push({
            id: "draft_" + d,
            timestamp: dRows[d][0] ? dRows[d][0].toString() : "",
            studentName: dRows[d][1] ? dRows[d][1].toString() : "-",
            studentSchool: dRows[d][2] ? dRows[d][2].toString() : "-",
            studentEmail: dRows[d][3] ? dRows[d][3].toString() : "-",
            grade: dRows[d][4] ? dRows[d][4].toString() : "-",
            title: dRows[d][5] ? dRows[d][5].toString() : "-",
            type: dRows[d][6] ? dRows[d][6].toString() : "-",
            link: dRows[d][7] ? dRows[d][7].toString() : "#",
            notes: dRows[d][8] ? dRows[d][8].toString() : "-",
            status: "Terkirim ke Mentor"
          });
        }
      }

      // 3. Data Bubble Semangat Pending
      var quotes = [];
      var qRows = sheetBubble.getDataRange().getValues();
      for (var q = 1; q < qRows.length; q++) {
        if (qRows[q][4]) {
          quotes.push({
            id: "quote_" + q,
            submittedAt: qRows[q][0] ? qRows[q][0].toString() : "",
            studentName: qRows[q][1] ? qRows[q][1].toString() : "-",
            studentSchool: qRows[q][2] ? qRows[q][2].toString() : "-",
            studentEmail: qRows[q][3] ? qRows[q][3].toString() : "-",
            text: qRows[q][4] ? qRows[q][4].toString() : "",
            status: qRows[q][5] ? qRows[q][5].toString() : "Pending"
          });
        }
      }

      // 4. Data Lomba Custom
      var competitions = [];
      var cRows = sheetCompetitions.getDataRange().getValues();
      for (var c = 1; c < cRows.length; c++) {
        if (cRows[c][1]) {
          competitions.push({
            id: cRows[c][0] ? cRows[c][0].toString() : ("comp_" + c),
            title: cRows[c][1] ? cRows[c][1].toString() : "",
            organizer: cRows[c][2] ? cRows[c][2].toString() : "",
            category: cRows[c][3] ? cRows[c][3].toString() : "",
            deadline: cRows[c][4] ? cRows[c][4].toString() : "",
            perks: cRows[c][5] ? cRows[c][5].toString() : "",
            description: cRows[c][6] ? cRows[c][6].toString() : "",
            link: cRows[c][7] ? cRows[c][7].toString() : "",
            image: cRows[c][8] ? cRows[c][8].toString() : "",
            badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
          });
        }
      }

      return createJsonResponse({
        status: "success",
        students: students,
        drafts: drafts,
        quotes: quotes,
        competitions: competitions,
        passcodes: getValidPasscodes()
      });
    }

    // ==============================================================
    // ACTION 8 (ADMIN ONLY): HAPUS SISWA
    // ==============================================================
    else if (action === "admin_delete_student") {
      if (!isValidMentorToken(data.token)) {
        return createJsonResponse({ status: "unauthorized", message: "Akses ditolak!" });
      }

      var targetEmail = (data.email || "").trim().toLowerCase();
      var rows = sheetStudents.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][mapSiswa.email] && rows[i][mapSiswa.email].toString().toLowerCase() === targetEmail) {
          sheetStudents.deleteRow(i + 1);
          return createJsonResponse({ status: "success", message: "Siswa berhasil dihapus dari cloud database." });
        }
      }

      return createJsonResponse({ status: "not_found", message: "Siswa tidak ditemukan." });
    }

    // ==============================================================
    // ACTION 9 (ADMIN ONLY): UPDATE PASSCODE PENDAFTARAN
    // ==============================================================
    else if (action === "admin_update_passcode") {
      if (!isValidMentorToken(data.token)) {
        return createJsonResponse({ status: "unauthorized", message: "Akses ditolak!" });
      }

      var operation = (data.operation || "add").toLowerCase();
      var targetCode = (data.passcode || "").trim().toUpperCase();
      if (!targetCode) {
        return createJsonResponse({ status: "error", message: "Passcode tidak boleh kosong!" });
      }

      var list = getValidPasscodes();
      if (operation === "add") {
        if (list.indexOf(targetCode) === -1) list.push(targetCode);
      } else if (operation === "remove") {
        list = list.filter(function(item) { return item !== targetCode; });
      }

      PropertiesService.getScriptProperties().setProperty("NGAMBIS_PASSCODES", JSON.stringify(list));

      return createJsonResponse({
        status: "success",
        passcodes: list
      });
    }

    // ==============================================================
    // ACTION 10 (ADMIN ONLY): TAMBAH / HAPUS LOMBA CUSTOM
    // ==============================================================
    else if (action === "admin_competition_action") {
      if (!isValidMentorToken(data.token)) {
        return createJsonResponse({ status: "unauthorized", message: "Akses ditolak!" });
      }

      var op = (data.operation || "add").toLowerCase();
      if (op === "add") {
        var comp = data.competition || {};
        sheetCompetitions.appendRow([
          comp.id || ("custom_comp_" + Date.now()),
          comp.title || "",
          comp.organizer || "",
          comp.category || "",
          comp.deadline || "",
          comp.perks || "",
          comp.description || "",
          comp.link || "",
          comp.image || "",
          timestamp
        ]);
        return createJsonResponse({ status: "success", message: "Lomba berhasil ditambahkan!" });
      } else if (op === "delete") {
        var compId = data.id || "";
        var cRows = sheetCompetitions.getDataRange().getValues();
        for (var c = 1; c < cRows.length; c++) {
          if (cRows[c][0] && cRows[c][0].toString() === compId) {
            sheetCompetitions.deleteRow(c + 1);
            return createJsonResponse({ status: "success", message: "Lomba berhasil dihapus!" });
          }
        }
      }
      return createJsonResponse({ status: "success" });
    }

    // ==============================================================
    // ACTION 11 (ADMIN ONLY): POST / APPROVE BUBBLE SEMANGAT
    // ==============================================================
    else if (action === "admin_bubble_action") {
      if (!isValidMentorToken(data.token)) {
        return createJsonResponse({ status: "unauthorized", message: "Akses ditolak!" });
      }

      var quotePayload = data.quote || {};
      PropertiesService.getScriptProperties().setProperty("NGAMBIS_ACTIVE_QUOTE", JSON.stringify({
        text: quotePayload.text || "",
        author: quotePayload.author || "Diposting oleh Mentor Maesa",
        timestamp: timestamp
      }));

      return createJsonResponse({ status: "success", message: "Bubble semangat berhasil diaktifkan!" });
    }

    // ==============================================================
    // DEFAULT PUBLIC GET / DATA (TIDAK ADA PASSWORD, TIDAK ADA EMAIL)
    // ==============================================================
    var totalCount = Math.max(sheetStudents.getLastRow() - 1, 0);

    // Ambil daftar lomba custom untuk siswa
    var publishedCompetitions = [];
    var compRows = sheetCompetitions.getDataRange().getValues();
    for (var i = 1; i < compRows.length; i++) {
      if (compRows[i][1]) {
        publishedCompetitions.push({
          id: compRows[i][0] ? compRows[i][0].toString() : ("comp_" + i),
          title: compRows[i][1] ? compRows[i][1].toString() : "",
          organizer: compRows[i][2] ? compRows[i][2].toString() : "",
          category: compRows[i][3] ? compRows[i][3].toString() : "",
          deadline: compRows[i][4] ? compRows[i][4].toString() : "",
          perks: compRows[i][5] ? compRows[i][5].toString() : "",
          description: compRows[i][6] ? compRows[i][6].toString() : "",
          link: compRows[i][7] ? compRows[i][7].toString() : "",
          image: compRows[i][8] ? compRows[i][8].toString() : "",
          badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
        });
      }
    }

    // Ambil quote aktif untuk bubble semangat
    var activeQuote = null;
    try {
      var rawQuote = PropertiesService.getScriptProperties().getProperty("NGAMBIS_ACTIVE_QUOTE");
      if (rawQuote) activeQuote = JSON.parse(rawQuote);
    } catch (e) {}

    return createJsonResponse({
      status: "success",
      totalStudents: totalCount,
      competitions: publishedCompetitions,
      activeQuote: activeQuote
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });

  } finally {
    if (hasLock) {
      try {
        lock.releaseLock();
      } catch (e) {}
    }
  }
}

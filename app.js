// ==========================================
// NGAMBIS BARENG PORTAL ENGINE (AUTH & EMAIL DIRECTORY V4)
// ==========================================

const MENTOR_EMAIL = "maesa.am222@gmail.com";

// State Management
const STATE = {
  currentUser: null,
  mentorAuth: {
    email: "maesa.am222@gmail.com",
    password: "MaesaNgambis2026!" // Private Mentor Master Password
  },
  registrationPasscodes: [
    "SUCCESS2026",
    "SUCCESS",
    "NGAMBIS2026",
    "AMBIS2026"
  ],
  deadlines: [
    { name: "US Early Action / Early Decision", date: "2026-11-01T23:59:59", category: "USA (Common App)" },
    { name: "Oxford & Cambridge Deadline", date: "2026-10-15T18:00:00", category: "UK (UCAS)" },
    { name: "GKS-U Korea Selatan (Embassy)", date: "2026-10-20T23:59:59", category: "Korea Selatan" },
    { name: "Stipendium Hungaricum", date: "2027-01-15T23:59:59", category: "Hungaria (Eropa)" },
    { name: "US Regular Decision (RD)", date: "2027-01-05T23:59:59", category: "USA (Common App)" },
    { name: "Türkiye Bursları S-1 Deadline", date: "2027-02-20T23:59:59", category: "Turki" },
    { name: "IUP UGM Gelombang 1 Intake", date: "2027-02-15T15:00:00", category: "IUP Indonesia" },
    { name: "MEXT Gakubu S-1 Jepang", date: "2027-05-10T23:59:59", category: "Jepang" },
    { name: "BIM S-1 Luar Negeri", date: "2027-05-25T23:59:59", category: "Puspresnas RI" }
  ],
  scholarships: [
    {
      id: "bim_s1",
      title: "Beasiswa Indonesia Maju (BIM) S-1 Luar Negeri",
      provider: "Puspresnas / Kemendikbudristek & LPDP",
      category: "RI_GOV",
      coverage: "Full Funded: SPP penuh, biaya hidup bulanan, tiket pesawat PP, asuransi, tunjangan buku, visa, dan pembinaan persiapan",
      country: "Global (Top 100 World Universities)",
      deadline: "Sekitar April - Mei (Tahunan)",
      requirements: "Medalis OSN / FLS2N / OPSI / LDBI / NSDC atau lomba internasional terkurasi Puspresnas. Nilai rapor min. 80-85, sertifikat IELTS/TOEFL, Unconditional LoA kampus mitra top dunia.",
      link: "https://pusatprestasinasional.kemdikbud.go.id/",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      id: "bim_persiapan",
      title: "BIM Non-Gelar (Program Persiapan S-1 Luar Negeri)",
      provider: "Pusat Prestasi Nasional (Puspresnas)",
      category: "RI_GOV",
      coverage: "Full Funded Persiapan: Kursus & tes resmi SAT/IELTS gratis, bimbingan esai intensif, konseling aplikasi, talent development",
      country: "Global Target",
      deadline: "Sekitar Oktober - November (Khusus Siswa Kelas 11)",
      requirements: "Siswa aktif kelas 11 SMA sederajat peraih prestasi talenta sains/seni/olahraga/riset tingkat nasional/internasional yang tercatat di Puspresnas.",
      link: "https://pusatprestasinasional.kemdikbud.go.id/",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      id: "beasiswa_unggulan",
      title: "Beasiswa Unggulan Kemendikbudristek",
      provider: "Kemendikbudristek RI",
      category: "RI_GOV",
      coverage: "Full / Partial Funded: Biaya pendidikan penuh, biaya hidup, dan biaya buku",
      country: "Indonesia (IUP PTN) / Luar Negeri",
      deadline: "Sekitar Juli - Agustus",
      requirements: "Memiliki LoA Unconditional S-1 (bisa untuk IUP PTN tertentu), sertifikat prestasi minimal tingkat kabupaten/nasional, esai personal komitmen kontribusi 1.500 kata.",
      link: "https://beasiswaunggulan.kemdikbud.go.id/",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      id: "mext_s1",
      title: "MEXT (Monbukagakusho) Gakubu S-1",
      provider: "Kementerian Pendidikan, Kebudayaan, Olahraga, Sains & Teknologi Jepang",
      category: "INTL_GOV",
      coverage: "Full Tuition + Uang Saku Bulanan (~¥117.000/bln) + Tiket Pesawat PP + 1 Tahun Sekolah Persiapan Bahasa Jepang",
      country: "🇯🇵 Jepang",
      deadline: "April - Mei",
      requirements: "Usia 17-25 tahun, nilai rapor Matematika & Bahasa Inggris kuat, lulus ujian tulis Kedubes Jepang (Math, English, Kimia/Fisika/Biologi untuk IPA, Math & English untuk IPS).",
      link: "https://www.id.emb-japan.go.jp/sch_gakubu.html",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
    },
    {
      id: "gks_u",
      title: "Global Korea Scholarship (GKS-U)",
      provider: "National Institute for International Education (NIIED) Korea Selatan",
      category: "INTL_GOV",
      coverage: "Full Tuition + Uang Saku (~₩900.000/bln) + Tiket Pesawat PP + Asuransi Kesehatan + 1 Tahun Kursus Bahasa Korea di Universitas",
      country: "🇰🇷 Korea Selatan",
      deadline: "September - Oktober",
      requirements: "Rata-rata nilai rapor ≥ 80% atau ranking top 20%, usia di bawah 25 tahun, Personal Statement & Study Plan orisinal, Surat Rekomendasi dari Kepala Sekolah/Guru.",
      link: "https://www.studyinkorea.go.kr/",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20"
    },
    {
      id: "turkiye_burslari",
      title: "Türkiye Bursları Undergraduate Scholarship",
      provider: "Pemerintah Republik Turki (YTB)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Uang Saku Bulanan + Akomodasi Asrama Gratis + Tiket Pesawat PP + Asuransi Kesehatan + 1 Tahun Kursus Bahasa Turki (TÖMER)",
      country: "🇹🇷 Turki",
      deadline: "10 Januari - 20 Februari (Tahunan)",
      requirements: "Nilai rata-rata ijazah/rapor min. 70% (Non-Kedokteran) atau min. 90% (Kedokteran/Farmasi/Kedokteran Gigi), esai Letter of Intent yang mendalam.",
      link: "https://www.turkiyeburslari.gov.tr/",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    },
    {
      id: "stipendium_hungaricum",
      title: "Stipendium Hungaricum Scholarship",
      provider: "Tempus Public Foundation (Pemerintah Hungaria)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Tunjangan Bulanan (HUF 43.700/bln) + Kontribusi Akomodasi Asrama + Asuransi Kesehatan",
      country: "🇭🇺 Hungaria",
      deadline: "November - Januari",
      requirements: "Wajib mendaftar via portal resmi Tempus dan mendapatkan surat rekomendasi/nominasi dari Kemendikbudristek RI sebagai Sending Partner, sertifikat IELTS min. 6.0/6.5.",
      link: "https://stipendiumhungaricum.hu/",
      badgeColor: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      id: "csc_china",
      title: "Chinese Government Scholarship (CSC) - Type A & B",
      provider: "China Scholarship Council (CSC)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Akomodasi Asrama Kampus + Asuransi Medis Komprehensif + Biaya Hidup (RMB 2.500/bln)",
      country: "🇨🇳 Tiongkok",
      deadline: "Desember - Maret",
      requirements: "Lulusan SMA, usia di bawah 25 tahun, sertifikat HSK min. Level 3-4 (jika prodi Mandarin) atau IELTS min. 6.0 / TOEFL 80 (jika English-taught), proposal studi & 2 LoR.",
      link: "https://www.campuschina.org/",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    },
    {
      id: "jardine_oxbridge",
      title: "Jardine Scholarship (Univ. of Oxford & Cambridge)",
      provider: "Jardine Foundation (Jardine Matheson)",
      category: "UNIV_MERIT",
      coverage: "Full Ride: Biaya kuliah penuh, tunjangan biaya hidup tahunan, tiket pesawat PP, dan tunjangan buku",
      country: "🇬🇧 United Kingdom",
      deadline: "Agustus - Oktober (Seiring aplikasi UCAS)",
      requirements: "Keunggulan akademik luar biasa, kepemimpinan orisinal, komitmen pengabdian untuk Asia, LoA dari colleges mitra resmi di Oxford/Cambridge.",
      link: "https://www.jardines.com/en/community/jardine-foundation",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      id: "pearson_toronto",
      title: "Lester B. Pearson International Scholarship",
      provider: "University of Toronto",
      category: "UNIV_MERIT",
      coverage: "Full Ride: Biaya kuliah 4 tahun penuh, buku, biaya insidental, dan tempat tinggal asrama penuh selama 4 tahun",
      country: "🇨🇦 Kanada",
      deadline: "November (Batas Nominasi Sekolah) & Januari (Batas Siswa)",
      requirements: "Wajib dinominasikan resmi oleh sekolah SMA asal (1 sekolah = 1 nominasi), kreativitas luar biasa, kepemimpinan dan dampak sosial terbukti.",
      link: "https://future.utoronto.ca/pearson/",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      id: "nus_asean",
      title: "NUS ASEAN Undergraduate Scholarship",
      provider: "National University of Singapore (NUS)",
      category: "UNIV_MERIT",
      coverage: "Full Tuition + S$5.800/tahun Living Allowance + S$3.000/tahun Tunjangan Akomodasi",
      country: "🇸🇬 Singapura",
      deadline: "Oktober - Februari (Otomatis saat mendaftar admisi NUS)",
      requirements: "Nilai rapor SMA luar biasa, SAT 1480+ (Math 780-800), kepemimpinan dan prestasi olimpiade sains/riset.",
      link: "https://nus.edu.sg/oam/scholarships/freshmen/undergraduate-scholarships",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    },
    {
      id: "kaist_full",
      title: "KAIST Undergraduate International Scholarship",
      provider: "Korea Advanced Institute of Science and Technology (KAIST)",
      category: "UNIV_MERIT",
      coverage: "Full Tuition (8 Semester) + ₩350.000/bln Living Allowance + Asuransi Medis Nasional Korea",
      country: "🇰🇷 Korea Selatan",
      deadline: "Early Track: Okt-Des | Regular Track: Des-Jan",
      requirements: "Kemampuan Matematika & Sains luar biasa, skor SAT / AP / olimpiade sains sangat diutamakan, wawancara akademik sains.",
      link: "https://admission.kaist.ac.kr/intl-undergraduate/",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    },
    {
      id: "us_need_blind",
      title: "US Need-Blind / 100% Need-Met Full Financial Aid",
      provider: "Harvard, Yale, Princeton, MIT, Amherst, Bowdoin, Dartmouth, Brown",
      category: "UNIV_MERIT",
      coverage: "100% Demonstrated Financial Need: Biaya kuliah penuh, asrama, makan, asuransi, buku hingga tiket pesawat",
      country: "🇺🇸 Amerika Serikat",
      deadline: "Early Action/Decision: 1 Nov | Regular Decision: 1-5 Jan",
      requirements: "Diterima melalui Common App (Spike profile, SAT 1520+, Esai reflektif mendalam, 3 LoR super kuat) + Pengisian formulir CSS Profile & bukti finansial orang tua.",
      link: "https://college.harvard.edu/financial-aid",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      id: "nyu_abu_dhabi",
      title: "NYU Abu Dhabi Full Need-Based Support",
      provider: "New York University Abu Dhabi (NYUAD)",
      category: "UNIV_MERIT",
      coverage: "Full Ride: SPP 100%, akomodasi modern, konsumsi penuh, tiket pesawat pulang-pergi 2x setahun, dana riset musim panas global",
      country: "🇦🇪 UAE / USA Curricula",
      deadline: "ED 1: 1 Nov | ED 2: 1 Jan | RD: 5 Jan",
      requirements: "Aplikasi via Common App, wawasan global, keterbukaan budaya, rekam jejak kepemimpinan, dan undangan Candidate Weekend.",
      link: "https://nyuad.nyu.edu/en/admissions/undergraduate/financial-support.html",
      badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20"
    },
    {
      id: "iup_ugm",
      title: "IUP Universitas Gadjah Mada (UGM)",
      provider: "Universitas Gadjah Mada (Yogyakarta)",
      category: "IUP_PTN",
      coverage: "Sarjana Kelas Internasional Terakreditasi Global + Kurikulum Berbahasa Inggris + Program Wajib Double Degree / Student Exchange",
      country: "🇮🇩 Indonesia (UGM Yogyakarta)",
      deadline: "Gelombang 1 (Jan-Feb), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Ujian GMST (Gadjah Mada Scholastic Test) + AcEPT / IELTS (min. 5.5-6.5) / TOEFL iBT / Duolingo (100+) + Interview / MMI & FGD.",
      link: "https://um.ugm.ac.id/international-undergraduate-program-iup/",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    },
    {
      id: "kki_ui",
      title: "KKI (Kelas Khusus Internasional) UI",
      provider: "Universitas Indonesia (Depok & Salemba)",
      category: "IUP_PTN",
      coverage: "Single Degree & Double Degree Mitra Melbourne, Monash, Newcastle, Amsterdam, Tilburg, Groningen, Queensland",
      country: "🇮🇩 Indonesia (UI Depok / Salemba)",
      deadline: "Pendaftaran SIMAK KKI: Mei - Juni",
      requirements: "Ujian SIMAK KKI Bahasa Inggris (Basic Mathematics & IPA / IPS) + Sertifikat TOEFL ITP (min. 500) / TOEFL iBT (min. 61) / IELTS (min. 5.5) + MMI / Interview.",
      link: "https://penerimaan.ui.ac.id/",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    },
    {
      id: "iup_itb",
      title: "IUP Institut Teknologi Bandung (ITB)",
      provider: "Institut Teknologi Bandung",
      category: "IUP_PTN",
      coverage: "Kelas Internasional STEI (Informatika, Elektro), SBM (Manajemen), FTI, FTMD, FTSL, FSRD + Program Exchange Internasional",
      country: "🇮🇩 Indonesia (ITB Ganesha & Jatinangor)",
      deadline: "Gelombang 1 (Feb), Gelombang 2 (Apr), Gelombang 3 (Jun)",
      requirements: "Ujian ITB AQAS (Bisa dibebaskan jika melampirkan skor SAT Math resmi ≥ 700) + English Proficiency Test ITB / IELTS + Rapor Semester 1-5.",
      link: "https://admission.itb.ac.id/info/international-undergraduate-program/",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
    },
    {
      id: "iup_unair",
      title: "IUP Universitas Airlangga (UNAIR)",
      provider: "Universitas Airlangga (Surabaya)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Kedokteran Umum, Kedokteran Gigi, Farmasi, Manajemen, Akuntansi, Hukum, Psikologi, Hubungan Internasional",
      country: "🇮🇩 Indonesia (UNAIR Surabaya)",
      deadline: "Gelombang 1 (Feb-Mar), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Tes Potensi Akademik Bahasa Inggris + Tes Kemampuan Bahasa Inggris (ELPT/IELTS min. 5.5/Duolingo) + Interview / MMI.",
      link: "https://ppmb.unair.ac.id/iup/",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20"
    },
    {
      id: "iup_its",
      title: "IUP Institut Teknologi Sepuluh Nopember (ITS)",
      provider: "ITS Surabaya",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Teknik Informatika, Sistem Informasi, Teknik Mesin, Teknik Elektro, Teknik Sipil, Desain Komunikasi Visual",
      country: "🇮🇩 Indonesia (ITS Surabaya)",
      deadline: "Gelombang 1 (Feb-Mar), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Nilai Rapor Semester 1-5 + Sertifikat Prestasi Akademik/Lomba + Tes Tulis TPA Bahasa Inggris + Sertifikat IELTS/TOEFL.",
      link: "https://www.its.ac.id/admission/iup/",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }
  ]
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadCustomPasscodes();
  checkExistingSession();
  renderScholarships();
  renderDeadlines();
  updateAnalyticsStats();
});

function loadCustomPasscodes() {
  const saved = localStorage.getItem("ngambis_student_passcodes");
  if (saved) {
    try {
      STATE.registrationPasscodes = JSON.parse(saved);
    } catch (e) {}
  }
}

// ==========================================
// AUTHENTICATION: 3-TAB MODES (SIGN IN, SIGN UP, MENTOR)
// ==========================================
let currentAuthTab = 'login'; // 'login' | 'register' | 'mentor'

function switchAuthTab(tab) {
  currentAuthTab = tab;
  const formLogin = document.getElementById("auth-form-login");
  const formRegister = document.getElementById("auth-form-register");
  const formMentor = document.getElementById("auth-form-mentor");
  const errorBox = document.getElementById("login-error");

  const btnLogin = document.getElementById("tab-btn-login");
  const btnRegister = document.getElementById("tab-btn-register");
  const btnMentor = document.getElementById("tab-btn-mentor");

  errorBox.classList.add("hidden");

  // Reset tab button styles
  [btnLogin, btnRegister, btnMentor].forEach(b => {
    b.className = "flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-lg text-slate-400 hover:text-white transition";
  });

  if (tab === 'login') {
    formLogin.classList.remove("hidden");
    formRegister.classList.add("hidden");
    formMentor.classList.add("hidden");
    btnLogin.className = "flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-brand-500 text-slate-950 transition";
  } else if (tab === 'register') {
    formLogin.classList.add("hidden");
    formRegister.classList.remove("hidden");
    formMentor.classList.add("hidden");
    btnRegister.className = "flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-brand-accent text-slate-950 transition";
  } else if (tab === 'mentor') {
    formLogin.classList.add("hidden");
    formRegister.classList.add("hidden");
    formMentor.classList.remove("hidden");
    btnMentor.className = "flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-amber-400 text-slate-950 transition";
  }
}

// 1. REGISTER NEW STUDENT HANDLER
document.getElementById("auth-form-register").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const grade = document.getElementById("reg-grade").value;
  const passcode = document.getElementById("reg-passcode").value.trim().toUpperCase();
  const password = document.getElementById("reg-password").value.trim();
  const errorBox = document.getElementById("login-error");

  // Verify mentor passcode
  if (!STATE.registrationPasscodes.includes(passcode)) {
    errorBox.textContent = "Passcode Pendaftaran salah! Hubungi mentor untuk mendapatkan passcode pendaftaran resmi.";
    errorBox.classList.remove("hidden");
    return;
  }

  // Check if email already registered
  const registeredUsers = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  if (registeredUsers.some(u => u.email === email)) {
    errorBox.textContent = "Email ini sudah terdaftar! Silakan langsung login di tab 'Masuk (Login)'.";
    errorBox.classList.remove("hidden");
    return;
  }

  const newStudent = {
    id: "std_" + Date.now(),
    name: name,
    email: email,
    grade: grade,
    password: password || passcode,
    registeredAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    role: "STUDENT"
  };

  registeredUsers.push(newStudent);
  localStorage.setItem("ngambis_registered_students", JSON.stringify(registeredUsers));

  // Log activity
  logActivity("STUDENT_REGISTER", `Siswa baru mendaftar: ${email}`, grade);

  alert(`🎉 Pendaftaran Berhasil! Selamat datang, ${name}. Kamu akan langsung masuk ke portal.`);
  loginUser(newStudent);
});

// 2. STUDENT LOGIN HANDLER
document.getElementById("auth-form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value.trim();
  const errorBox = document.getElementById("login-error");

  const registeredUsers = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  const foundUser = registeredUsers.find(u => u.email === email);

  if (!foundUser) {
    // Check if student wants to auto-login with email + master passcode
    if (STATE.registrationPasscodes.includes(password.toUpperCase())) {
      const autoUser = {
        id: "std_" + btoa(encodeURIComponent(email)).replace(/=/g, "").slice(0, 10).toLowerCase(),
        name: email.split("@")[0],
        email: email,
        grade: "Siswa Binaan",
        role: "STUDENT",
        registeredAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
      };
      registeredUsers.push(autoUser);
      localStorage.setItem("ngambis_registered_students", JSON.stringify(registeredUsers));
      loginUser(autoUser);
      return;
    }

    errorBox.textContent = "Email belum terdaftar! Silakan klik tab 'Daftar Siswa Baru' terlebih dahulu.";
    errorBox.classList.remove("hidden");
    return;
  }

  if (foundUser.password !== password && !STATE.registrationPasscodes.includes(password.toUpperCase())) {
    errorBox.textContent = "Password salah! Silakan coba lagi atau hubungi mentor.";
    errorBox.classList.remove("hidden");
    return;
  }

  loginUser(foundUser);
});

// 3. MENTOR LOGIN HANDLER
document.getElementById("auth-form-mentor").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("mentor-email").value.trim().toLowerCase();
  const password = document.getElementById("mentor-password").value.trim();
  const errorBox = document.getElementById("login-error");

  if (email !== STATE.mentorAuth.email.toLowerCase() || password !== STATE.mentorAuth.password) {
    errorBox.textContent = "Email atau Password Mentor salah! Akses ditolak.";
    errorBox.classList.remove("hidden");
    return;
  }

  const mentorUser = {
    id: "mentor_maesa",
    name: "Maesa (Head Mentor)",
    email: STATE.mentorAuth.email,
    grade: "Head Mentor",
    role: "MENTOR"
  };

  loginUser(mentorUser);
});

function loginUser(user) {
  STATE.currentUser = user;
  localStorage.setItem("ngambis_user_session", JSON.stringify(user));

  // Log activity
  logActivity("LOGIN", user.role === "MENTOR" ? "Masuk sebagai Head Mentor" : `Login: ${user.email}`, user.grade);

  // Setup UI
  document.getElementById("auth-screen").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  document.getElementById("user-display-name").textContent = user.name;
  document.getElementById("user-display-role").textContent = user.grade;

  // STRICT ACCESS CONTROL: Only mentor sees Admin Dashboard
  const adminNav = document.getElementById("nav-admin");
  const mobileAdminNav = document.getElementById("mobile-nav-admin");

  if (user.role === "MENTOR") {
    if (adminNav) adminNav.classList.remove("hidden");
    if (mobileAdminNav) mobileAdminNav.classList.remove("hidden");
    renderRegisteredStudentsAdmin();
    renderPasscodesInAdmin();
  } else {
    if (adminNav) adminNav.classList.add("hidden");
    if (mobileAdminNav) mobileAdminNav.classList.add("hidden");
    const tabAdmin = document.getElementById("tab-admin");
    if (tabAdmin) tabAdmin.classList.add("hidden");
  }

  // Setup dynamic watermark
  setupWatermark(user.name, user.email || user.grade);

  // Load saved checklist progress & drafts
  loadMilestoneProgress();
  loadSavedDrafts();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function checkExistingSession() {
  const saved = localStorage.getItem("ngambis_user_session");
  if (saved) {
    try {
      const user = JSON.parse(saved);
      loginUser(user);
    } catch (e) {
      localStorage.removeItem("ngambis_user_session");
    }
  }
}

function logout() {
  if (STATE.currentUser) {
    logActivity("LOGOUT", "Keluar dari portal", STATE.currentUser.grade);
  }
  localStorage.removeItem("ngambis_user_session");
  location.reload();
}

// ==========================================
// SECURITY WATERMARK GENERATOR
// ==========================================
function setupWatermark(name, emailOrGrade) {
  const container = document.getElementById("watermark-container");
  container.innerHTML = "";
  container.classList.remove("hidden");

  const watermarkText = `NGAMBIS BARENG • ${name.toUpperCase()} (${emailOrGrade}) • PRIVATE ACCESS`;
  
  for (let i = 0; i < 48; i++) {
    const span = document.createElement("div");
    span.className = "p-4 tracking-widest text-[11px] font-mono select-none";
    span.textContent = watermarkText;
    container.appendChild(span);
  }
}

// ==========================================
// TAB NAVIGATION & ACTIVITY LOGGING
// ==========================================
function switchTab(tabId) {
  if (tabId === "admin" && (!STATE.currentUser || STATE.currentUser.role !== "MENTOR")) {
    alert("⛔ Akses Terbatas: Halaman ini hanya dapat diakses oleh Mentor.");
    return;
  }

  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("text-brand-400", "bg-brand-500/10", "border-brand-500/20");
    btn.classList.add("text-slate-300");
  });

  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove("hidden");
  }

  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.classList.add("text-brand-400", "bg-brand-500/10", "border-brand-500/20");
    activeNav.classList.remove("text-slate-300");
  }

  logActivity("VIEW_TAB", `Membuka modul: ${tabId.toUpperCase()}`);

  if (tabId === "admin" && STATE.currentUser && STATE.currentUser.role === "MENTOR") {
    renderAnalyticsTable();
    renderSubmittedDraftsAdmin();
    renderRegisteredStudentsAdmin();
    renderPasscodesInAdmin();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// REAL-TIME COUNTDOWN TIMER WIDGET
// ==========================================
function renderDeadlines() {
  const container = document.getElementById("deadlines-container");
  if (!container) return;

  const now = new Date();

  container.innerHTML = STATE.deadlines.map(d => {
    const deadlineDate = new Date(d.date);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let badgeStatus = "";
    if (diffDays > 0) {
      badgeStatus = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/30 whitespace-nowrap">${diffDays} Hari Lagi</span>`;
    } else {
      badgeStatus = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-500 border border-slate-700 whitespace-nowrap">Siklus Ditutup</span>`;
    }

    return `
      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase font-semibold truncate">${d.category}</span>
          </div>
          <p class="font-bold text-white text-xs truncate">${d.name}</p>
          <p class="text-[10px] text-slate-400">${deadlineDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        ${badgeStatus}
      </div>
    `;
  }).join("");
}

// ==========================================
// PROFILE MATCH & CHANCE SIMULATOR
// ==========================================
function calculateProfileChance() {
  const gpa = parseFloat(document.getElementById("calc-gpa").value) || 0;
  const sat = parseInt(document.getElementById("calc-sat").value) || 0;
  const ielts = parseFloat(document.getElementById("calc-ielts").value) || 0;
  const spike = document.getElementById("calc-spike").value;
  const resultBox = document.getElementById("calc-result");

  let matchTier = "";
  let recommendation = "";
  let badgeColor = "";

  if (gpa >= 92 && sat >= 1500 && ielts >= 7.5 && spike === "national_gold") {
    matchTier = "🌟 Super Competitive Tier (Ivy League / MIT / Oxford / Cambridge / NUS ASEAN)";
    recommendation = "Profil kamu sangat solid untuk beasiswa Full Ride dunia & Need-Blind US! Maksimalkan narasi esai dan LoR yang tajam.";
    badgeColor = "border-brand-500 text-brand-400 bg-brand-500/10";
  } else if (gpa >= 88 && (sat >= 1400 || ielts >= 7.0)) {
    matchTier = "🎯 High Match Tier (Toronto Pearson, KAIST, HKU, MEXT Gakubu, GKS Korea)";
    recommendation = "Peluang kamu sangat tinggi di kampus riset top Asia, Kanada, dan Beasiswa Pemerintah. Naikkan skor SAT Math ke 750+ untuk booster ekstra.";
    badgeColor = "border-brand-accent text-brand-accent bg-brand-accent/10";
  } else if (gpa >= 83 && ielts >= 6.0) {
    matchTier = "🇮🇩 Top Match Tier (IUP UGM, KKI UI, IUP ITB, Türkiye Bursları, Hungaria)";
    recommendation = "Profil kamu sangat ideal untuk menembus Gelombang 1 IUP PTN ternama (UGM, UI, ITB) atau beasiswa pemerintah Turki & Hungaria.";
    badgeColor = "border-amber-400 text-amber-400 bg-amber-400/10";
  } else {
    matchTier = "📚 Building Phase (Perlu Penguatan Rapor & Tes Standar)";
    recommendation = "Fokus naikkan rata-rata nilai rapor di semester berjalan dan mulai latihan rutin Khan Academy SAT & kosakata harian.";
    badgeColor = "border-purple-400 text-purple-400 bg-purple-400/10";
  }

  resultBox.className = `p-4 rounded-xl border mt-4 text-xs ${badgeColor}`;
  resultBox.innerHTML = `
    <p class="font-bold text-sm mb-1">${matchTier}</p>
    <p class="text-slate-300 leading-relaxed">${recommendation}</p>
  `;
  resultBox.classList.remove("hidden");

  logActivity("PROFILE_CALCULATOR", `GPA: ${gpa}, SAT: ${sat}, IELTS: ${ielts}`);
}

// ==========================================
// ESSAY DRAFT SUBMISSION & EMAIL FORWARDING
// ==========================================
async function submitEssayDraft(e) {
  e.preventDefault();
  if (!STATE.currentUser) return;

  const essayTitle = document.getElementById("draft-title").value.trim();
  const essayType = document.getElementById("draft-type").value;
  const gdocLink = document.getElementById("draft-link").value.trim();
  const notes = document.getElementById("draft-notes").value.trim();
  const alertBox = document.getElementById("draft-alert");
  const submitBtn = document.getElementById("btn-submit-draft");

  if (!gdocLink.includes("docs.google.com")) {
    alertBox.textContent = "Mohon masukkan tautan Google Docs yang valid (pastikan setting 'Anyone with the link can comment').";
    alertBox.className = "p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center";
    alertBox.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="inline-block animate-spin mr-1">⏳</span> Mengirimkan ke Email Mentor...`;

  const draftEntry = {
    id: "draft_" + Date.now(),
    timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    studentName: STATE.currentUser.name,
    studentEmail: STATE.currentUser.email || "-",
    studentId: STATE.currentUser.id,
    grade: STATE.currentUser.grade,
    title: essayTitle,
    type: essayType,
    link: gdocLink,
    notes: notes,
    status: "Terkirim ke Email Mentor"
  };

  const allDrafts = JSON.parse(localStorage.getItem("ngambis_submitted_drafts") || "[]");
  allDrafts.unshift(draftEntry);
  localStorage.setItem("ngambis_submitted_drafts", JSON.stringify(allDrafts));

  try {
    const payload = {
      student_name: STATE.currentUser.name,
      student_email: STATE.currentUser.email || "Tidak tertera",
      student_grade: STATE.currentUser.grade,
      essay_title: essayTitle,
      essay_type: essayType,
      google_docs_link: gdocLink,
      notes_from_student: notes || "Tidak ada catatan tambahan.",
      submission_time: draftEntry.timestamp,
      _subject: `🚨 [Ngambis Bareng] Draft Esai Baru: ${STATE.currentUser.name} (${essayTitle})`,
      _replyto: STATE.currentUser.email || MENTOR_EMAIL
    };

    await fetch(`https://formsubmit.co/ajax/${MENTOR_EMAIL}`, {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Direct email dispatch note:", err);
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = `<i data-lucide="upload-cloud" class="w-4 h-4"></i> <span>Kirim Draft ke Email Mentor</span>`;

  alertBox.className = "p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs text-center";
  alertBox.innerHTML = `✅ <strong>Berhasil Terkirim!</strong> Draft esaimu telah dikirimkan langsung ke email Mentor (<em>${MENTOR_EMAIL}</em>) untuk direview.`;
  alertBox.classList.remove("hidden");

  logActivity("DRAFT_SUBMITTED", `Judul: ${essayTitle} (${essayType})`);

  document.getElementById("draft-form").reset();
  loadSavedDrafts();
  if (window.lucide) lucide.createIcons();
}

function loadSavedDrafts() {
  const container = document.getElementById("student-draft-list");
  if (!container || !STATE.currentUser) return;

  const allDrafts = JSON.parse(localStorage.getItem("ngambis_submitted_drafts") || "[]");
  const myDrafts = allDrafts.filter(d => d.studentId === STATE.currentUser.id || (STATE.currentUser.email && d.studentEmail === STATE.currentUser.email));

  if (myDrafts.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 italic">Kamu belum pernah mengirimkan draft esai.</p>`;
    return;
  }

  container.innerHTML = myDrafts.map(d => `
    <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-brand-400 font-semibold">${d.type}</span>
          <p class="font-bold text-white text-xs truncate">${d.title}</p>
        </div>
        <p class="text-[11px] text-slate-400">Dikirim: ${d.timestamp}</p>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-center">
        <a href="${d.link}" target="_blank" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-brand-accent rounded-lg border border-slate-700 flex items-center gap-1">
          Buka Docs <i data-lucide="external-link" class="w-3 h-3"></i>
        </a>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          ${d.status}
        </span>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

function renderSubmittedDraftsAdmin() {
  const container = document.getElementById("admin-draft-stream");
  if (!container) return;

  const allDrafts = JSON.parse(localStorage.getItem("ngambis_submitted_drafts") || "[]");
  if (allDrafts.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500">Belum ada draft esai dari siswa yang masuk.</p>`;
    return;
  }

  container.innerHTML = allDrafts.map(d => `
    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">${d.grade}</span>
          <span class="font-bold text-white text-xs">${d.studentName}</span>
          <span class="text-brand-accent text-xs font-mono">(${d.studentEmail || 'No Email'})</span>
          <span class="text-slate-500 text-xs">•</span>
          <span class="text-xs text-slate-300 font-semibold">${d.title}</span>
        </div>
        <p class="text-[11px] text-slate-400">Waktu: ${d.timestamp} | Catatan Siswa: "${d.notes || 'Tidak ada catatan'}"</p>
      </div>
      <div class="flex items-center gap-2">
        <a href="${d.link}" target="_blank" class="px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-brand-500/20">
          Buka Docs & Beri Koreksi <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// REGISTERED STUDENTS DIRECTORY (FOR MENTOR)
// ==========================================
function renderRegisteredStudentsAdmin() {
  const tbody = document.getElementById("admin-students-body");
  if (!tbody) return;

  const registeredUsers = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  if (registeredUsers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">Belum ada siswa yang mendaftar.</td></tr>`;
    return;
  }

  tbody.innerHTML = registeredUsers.map((s, idx) => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="p-3 text-slate-400">${idx + 1}</td>
      <td class="p-3 font-semibold text-white">${s.name}</td>
      <td class="p-3 font-mono text-brand-accent text-xs">
        <a href="mailto:${s.email}" class="hover:underline flex items-center gap-1">
          ${s.email} <i data-lucide="mail" class="w-3 h-3"></i>
        </a>
      </td>
      <td class="p-3 text-slate-300">${s.grade}</td>
      <td class="p-3 text-slate-400 text-[11px]">${s.registeredAt || '-'}</td>
    </tr>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

function exportStudentsCSV() {
  const registeredUsers = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  if (registeredUsers.length === 0) {
    alert("Belum ada data siswa untuk diexport!");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,No,Nama Lengkap,Email,Kelas,Waktu Daftar\n";
  registeredUsers.forEach((s, idx) => {
    csvContent += `"${idx+1}","${s.name}","${s.email}","${s.grade}","${s.registeredAt || ''}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Ngambis_Bareng_Database_Email_Siswa_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// MENTOR PASSCODE MANAGEMENT
// ==========================================
function renderPasscodesInAdmin() {
  const container = document.getElementById("admin-passcodes-list");
  if (!container) return;

  container.innerHTML = STATE.registrationPasscodes.map(p => `
    <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-brand-400 flex items-center gap-1.5">
      <span>${p}</span>
      <button onclick="removeStudentPasscode('${p}')" class="text-slate-500 hover:text-red-400 ml-1">×</button>
    </span>
  `).join("");
}

function addStudentPasscode() {
  const input = document.getElementById("new-student-passcode");
  const code = (input.value || "").trim().toUpperCase();
  if (!code) return;

  if (!STATE.registrationPasscodes.includes(code)) {
    STATE.registrationPasscodes.push(code);
    localStorage.setItem("ngambis_student_passcodes", JSON.stringify(STATE.registrationPasscodes));
    renderPasscodesInAdmin();
    input.value = "";
    alert(`✅ Passcode pendaftaran '${code}' berhasil ditambahkan!`);
  }
}

function removeStudentPasscode(code) {
  if (confirm(`Hapus passcode '${code}'?`)) {
    STATE.registrationPasscodes = STATE.registrationPasscodes.filter(p => p !== code);
    localStorage.setItem("ngambis_student_passcodes", JSON.stringify(STATE.registrationPasscodes));
    renderPasscodesInAdmin();
  }
}

// ==========================================
// TEMPLATE COPY-TO-CLIPBOARD FUNCTION
// ==========================================
function copyTemplate(templateId) {
  const textEl = document.getElementById(templateId);
  if (!textEl) return;

  navigator.clipboard.writeText(textEl.innerText).then(() => {
    alert("✅ Template berhasil disalin ke clipboard!");
    logActivity("COPY_TEMPLATE", `Template: ${templateId}`);
  });
}

// ==========================================
// MILESTONE & ROADMAP TRACKER
// ==========================================
function toggleMilestone(milestoneId) {
  if (!STATE.currentUser) return;
  const checkbox = document.getElementById(`ms-${milestoneId}`);
  const key = `progress_${STATE.currentUser.id || STATE.currentUser.email}`;
  let userProgress = JSON.parse(localStorage.getItem(key) || "{}");

  userProgress[milestoneId] = checkbox.checked;
  localStorage.setItem(key, JSON.stringify(userProgress));

  logActivity(
    checkbox.checked ? "MILESTONE_COMPLETE" : "MILESTONE_UNCHECK",
    `Target: ${milestoneId}`
  );

  updateProgressPercentage(userProgress);
}

function loadMilestoneProgress() {
  if (!STATE.currentUser) return;
  const key = `progress_${STATE.currentUser.id || STATE.currentUser.email}`;
  const userProgress = JSON.parse(localStorage.getItem(key) || "{}");

  Object.keys(userProgress).forEach(id => {
    const cb = document.getElementById(`ms-${id}`);
    if (cb) {
      cb.checked = userProgress[id];
    }
  });

  updateProgressPercentage(userProgress);
}

function updateProgressPercentage(userProgress) {
  const totalMilestones = 12; // 4 items per class x 3 classes
  const completed = Object.values(userProgress).filter(Boolean).length;
  const percentage = Math.round((completed / totalMilestones) * 100);

  const textEl = document.getElementById("overall-progress-text");
  const barEl = document.getElementById("overall-progress-bar");

  if (textEl) textEl.textContent = `${percentage}% Selesai (${completed}/${totalMilestones})`;
  if (barEl) barEl.style.width = `${percentage}%`;
}

// ==========================================
// SCHOLARSHIP DATABASE & FILTERING
// ==========================================
function renderScholarships(items = STATE.scholarships) {
  const grid = document.getElementById("scholarship-grid");
  if (!grid) return;

  grid.innerHTML = items.map(s => `
    <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${s.badgeColor}">
            ${s.country}
          </span>
          <span class="text-[11px] text-slate-400 font-medium">${s.deadline}</span>
        </div>

        <h3 class="text-sm font-bold text-white mb-1 leading-snug">${s.title}</h3>
        <p class="text-xs text-brand-400 font-medium mb-3">${s.provider}</p>

        <div class="space-y-2 text-xs text-slate-300">
          <p><strong class="text-slate-400">Coverage:</strong> ${s.coverage}</p>
          <p><strong class="text-slate-400">Syarat Inti:</strong> ${s.requirements}</p>
        </div>
      </div>

      <div class="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
        <a href="${s.link}" target="_blank" rel="noopener noreferrer" onclick="logActivity('SCHOLARSHIP_LINK', '${s.title}')" class="text-xs text-brand-400 hover:text-brand-300 font-medium inline-flex items-center gap-1">
          Kunjungi Website Resmi <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join("");

  if (window.lucide) {
    lucide.createIcons();
  }
}

function filterScholarships() {
  const query = (document.getElementById("scholarship-search").value || "").toLowerCase();
  const category = document.getElementById("scholarship-category-filter").value;

  const filtered = STATE.scholarships.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(query) || 
                        item.country.toLowerCase().includes(query) ||
                        item.requirements.toLowerCase().includes(query);
    const matchCat = category === "ALL" || item.category === category;
    return matchSearch && matchCat;
  });

  renderScholarships(filtered);
}

// ==========================================
// ACTIVITY LOGGING & ANALYTICS ENGINE
// ==========================================
function logActivity(action, details, extra = "") {
  const user = STATE.currentUser || { name: "Guest", grade: "-", id: "anon", email: "-" };
  const logEntry = {
    timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    studentName: user.name,
    studentEmail: user.email || "-",
    studentId: user.id,
    grade: user.grade,
    action: action,
    details: details,
    extra: extra
  };

  const logs = JSON.parse(localStorage.getItem("ngambis_activity_logs") || "[]");
  logs.unshift(logEntry);
  if (logs.length > 500) logs.pop();
  localStorage.setItem("ngambis_activity_logs", JSON.stringify(logs));

  updateAnalyticsStats();
}

function renderAnalyticsTable() {
  const tbody = document.getElementById("activity-log-body");
  if (!tbody) return;

  const logs = JSON.parse(localStorage.getItem("ngambis_activity_logs") || "[]");
  if (logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">Belum ada aktivitas tercatat.</td></tr>`;
    return;
  }

  tbody.innerHTML = logs.slice(0, 50).map(l => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="p-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">${l.timestamp}</td>
      <td class="p-3 font-semibold text-white whitespace-nowrap">
        ${l.studentName} <span class="text-[10px] text-slate-400 block">${l.studentEmail}</span>
      </td>
      <td class="p-3 text-slate-400 whitespace-nowrap">${l.grade}</td>
      <td class="p-3 whitespace-nowrap">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-brand-400 border border-slate-700">
          ${l.action}
        </span>
      </td>
      <td class="p-3 text-slate-300 min-w-[200px]">${l.details}</td>
    </tr>
  `).join("");
}

function updateAnalyticsStats() {
  const logs = JSON.parse(localStorage.getItem("ngambis_activity_logs") || "[]");
  const registeredUsers = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  
  const totalStudents = registeredUsers.length || new Set(logs.filter(l => !l.studentName.includes("Mentor")).map(l => l.studentName)).size;
  const totalLogins = logs.filter(l => l.action === "LOGIN").length;
  const totalViews = logs.filter(l => l.action === "VIEW_TAB").length;
  const totalLinks = logs.filter(l => l.action.includes("LINK") || l.action.includes("TEMPLATE")).length;

  const stdEl = document.getElementById("stat-total-students");
  const loginEl = document.getElementById("stat-total-logins");
  const viewEl = document.getElementById("stat-total-views");
  const linkEl = document.getElementById("stat-total-links");

  if (stdEl) stdEl.textContent = totalStudents;
  if (loginEl) loginEl.textContent = totalLogins;
  if (viewEl) viewEl.textContent = totalViews;
  if (linkEl) linkEl.textContent = totalLinks;
}

function exportAnalyticsCSV() {
  const logs = JSON.parse(localStorage.getItem("ngambis_activity_logs") || "[]");
  if (logs.length === 0) {
    alert("Belum ada data untuk diexport!");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,Waktu,Nama Siswa,Email,Kelas,Aksi,Detail\n";
  logs.forEach(row => {
    csvContent += `"${row.timestamp}","${row.studentName}","${row.studentEmail || ''}","${row.grade}","${row.action}","${row.details.replace(/"/g, '""')}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Ngambis_Bareng_Activity_Log_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clearAnalyticsLog() {
  if (confirm("Apakah kamu yakin ingin mereset seluruh riwayat aktivitas siswa?")) {
    localStorage.removeItem("ngambis_activity_logs");
    renderAnalyticsTable();
    updateAnalyticsStats();
  }
}

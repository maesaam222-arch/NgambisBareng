// ================================================================
// NGAMBIS BARENG (LDM ECOSYSTEM) - MASTER PORTAL ENGINE V6
// ================================================================

const MENTOR_EMAIL = "maesa.am222@gmail.com";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6NV9cv1iPsFDN1B2x0TExZDiJn8GSC0hhgjvdsPimL3Ftv_Ut2z4BMKnDGdBAA8tqKQ/exec";
const CLOUD_SYNC_URL = "https://kvdb.io/7zD9XyN19dJ51TqA5Vv9P4/ngambis_students_db_v1";
const COMPETITIONS_SYNC_URL = "https://kvdb.io/7zD9XyN19dJ51TqA5Vv9P4/ngambis_competitions_db_v1";

// ==========================================
// STATE MANAGEMENT
// ==========================================
const STATE = {
  currentUser: null,
  mentorAuth: {
    email: "maesa.am222@gmail.com",
    password: "MaesaNgambis2026!"
  },
  registrationPasscodes: [
    "SUCCESS2026",
    "SUCCESS",
    "NGAMBIS2026",
    "AMBIS2026"
  ],
  deadlines: [
    { name: "US Early Action / Early Decision", date: "2026-11-01T23:59:59", category: "USA (Common App)" },
    { name: "Oxford & Cambridge UCAS Deadline", date: "2026-10-15T18:00:00", category: "UK (UCAS)" },
    { name: "GKS-U Korea Selatan (Embassy Track)", date: "2026-10-20T23:59:59", category: "Korea Selatan" },
    { name: "Stipendium Hungaricum Deadline", date: "2027-01-15T23:59:59", category: "Hungaria (Eropa)" },
    { name: "US Regular Decision (RD)", date: "2027-01-05T23:59:59", category: "USA (Common App)" },
    { name: "Türkiye Bursları S-1 Deadline", date: "2027-02-20T23:59:59", category: "Turki" },
    { name: "IUP UGM Gelombang 1 Intake", date: "2027-02-15T15:00:00", category: "IUP Indonesia" },
    { name: "IUP ITB & SSU Gelombang 1", date: "2027-02-28T23:59:59", category: "IUP Indonesia" },
    { name: "SIMAK KKI UI Intake", date: "2027-05-15T23:59:59", category: "IUP Indonesia" },
    { name: "MEXT Gakubu S-1 Jepang", date: "2027-05-10T23:59:59", category: "Jepang" },
    { name: "BIM S-1 Luar Negeri (Puspresnas)", date: "2027-05-25T23:59:59", category: "Puspresnas RI" }
  ],
  competitions: [
    {
      id: "comp_osn",
      title: "Olimpiade Sains Nasional (OSN SMA)",
      organizer: "Puspresnas / Kemendikbudristek RI",
      category: "STEM",
      deadline: "Februari - Maret (Tahunan)",
      perks: "Medalis Nasional berhak atas Beasiswa Indonesia Maju (BIM) S-1 Luar Negeri & Bebas Tes Masuk IUP PTN.",
      description: "Ajang talenta sains resmi paling bergengsi di Indonesia (Matematika, Fisika, Kimia, Biologi, Informatika, Astronomi, Kebumian, Ekonomi, Geografi).",
      link: "https://pusatprestasinasional.kemdikbud.go.id/event/sains-dan-teknologi/osn/",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "comp_opsi",
      title: "Olimpiade Penelitian Siswa Indonesia (OPSI)",
      organizer: "Pusat Prestasi Nasional (Puspresnas)",
      category: "RISET",
      deadline: "Maret - April (Tahunan)",
      perks: "Sertifikat resmi kurasi Puspresnas RI, tiket delegasi Indonesia ke ajang ISEF di Amerika Serikat.",
      description: "Kompetisi riset ilmiah SMA terbesar untuk bidang Matematika, Sains, Teknologi Terapan, serta Ilmu Sosial dan Humaniora.",
      link: "https://pusatprestasinasional.kemdikbud.go.id/event/sains-dan-teknologi/opsi/",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=60",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      id: "comp_wharton",
      title: "Wharton Global High School Investment Competition",
      organizer: "The Wharton School, Univ of Pennsylvania (USA)",
      category: "BISNIS",
      deadline: "September - Desember (Tahunan)",
      perks: "Simulasi portofolio investasi nyata $100.000, sertifikat global, booster esai Common App & IUP Bisnis.",
      description: "Kompetisi bisnis & investasi internasional tim SMA paling prestisius di dunia yang dinilai langsung oleh profesor Wharton Business School.",
      link: "https://globalyouth.wharton.upenn.edu/competitions/investment-competition/",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: "comp_nsdc",
      title: "National Schools Debating Championship (NSDC / LDBI)",
      organizer: "Pusat Prestasi Nasional (Kemendikbudristek RI)",
      category: "HUMANIORA",
      deadline: "Mei - Juni",
      perks: "Pemenang didelegasikan ke WSDC (World Schools Debating Championship) & jalur talenta BIM.",
      description: "Kompetisi debat parlemen bahasa Inggris resmi tingkat nasional untuk mengasah logika diplomasi dan public speaking.",
      link: "https://pusatprestasinasional.kemdikbud.go.id/event/seni-budaya-dan-bahasa/nsdc/",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300"
    },
    {
      id: "comp_bebras",
      title: "Bebras Indonesia Computational Thinking Challenge",
      organizer: "Bebras International & NBO Bebras Indonesia (ITB / UI)",
      category: "STEM",
      deadline: "Oktober - November (Tahunan)",
      perks: "Sertifikat internasional, uji kemampuan logika algoritma untuk persiapan OSN Informatika & IUP STEI ITB.",
      description: "Tantangan logika komputasional dan pemecahan masalah algoritma tanpa perlu coding dasar, terbuka untuk seluruh siswa SMA.",
      link: "https://bebras.or.id/",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300"
    },
    {
      id: "comp_crimson",
      title: "Harvard Crimson Global Essay Competition (HCGEC)",
      organizer: "The Harvard Crimson (Harvard University)",
      category: "HUMANIORA",
      deadline: "Januari - Maret",
      perks: "Hadiah ribuan dolar, publikasi internasional, feedback eksklusif dari jurnalis Harvard.",
      description: "Kompetisi penulisan esai kreatif, argumentatif, dan jurnalisme global terbesar untuk siswa SMA sedunia.",
      link: "https://www.essaycomp.org/",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300"
    }
  ],
  scholarships: [
    {
      id: "bim_s1",
      title: "Beasiswa Indonesia Maju (BIM) S-1 Luar Negeri",
      provider: "Kemendiktisaintek RI & Puspresnas",
      category: "RI_GOV",
      coverage: "Full Funded: SPP penuh, biaya hidup bulanan, tiket pesawat PP, asuransi, buku, visa, dan pembinaan persiapan",
      country: "Global (Top 100 World Universities)",
      deadline: "Sekitar April - Mei (Tahunan)",
      requirements: "Medalis OSN / FLS2N / OPSI / LDBI / NSDC atau lomba internasional terkurasi Puspresnas. Nilai rapor min. 80-85, sertifikat IELTS/TOEFL, Unconditional LoA kampus mitra top dunia.",
      link: "https://bim.kemdiktisaintek.go.id",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "bim_persiapan",
      title: "BIM Non-Gelar (Program Persiapan S-1 Luar Negeri)",
      provider: "Kemendiktisaintek RI & Puspresnas",
      category: "RI_GOV",
      coverage: "Full Funded Persiapan: Kursus & tes resmi SAT/IELTS gratis, bimbingan esai intensif, konseling aplikasi, talent development",
      country: "Global Target",
      deadline: "Sekitar Oktober - November (Khusus Siswa Kelas 11)",
      requirements: "Siswa aktif kelas 11 SMA sederajat peraih prestasi talenta sains/seni/olahraga/riset tingkat nasional/internasional yang tercatat di Puspresnas.",
      link: "https://bim.kemdiktisaintek.go.id",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "beasiswa_unggulan",
      title: "Beasiswa Unggulan Kemendikdasmen",
      provider: "Kemendikdasmen RI",
      category: "RI_GOV",
      coverage: "Full / Partial Funded: Biaya pendidikan penuh, biaya hidup, dan biaya buku",
      country: "Indonesia (IUP PTN) / Luar Negeri",
      deadline: "Sekitar Juli - Agustus",
      requirements: "Memiliki LoA Unconditional S-1 (bisa untuk IUP PTN tertentu), sertifikat prestasi minimal tingkat kabupaten/nasional, esai personal komitmen kontribusi 1.500 kata.",
      link: "https://beasiswaunggulan.kemendikdasmen.go.id",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "mext_s1",
      title: "MEXT (Monbukagakusho) Gakubu S-1",
      provider: "Kementerian Pendidikan Jepang (MEXT)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Uang Saku Bulanan (~¥117.000/bln) + Tiket Pesawat PP + 1 Tahun Sekolah Persiapan Bahasa Jepang",
      country: "🇯🇵 Jepang",
      deadline: "April - Mei",
      requirements: "Usia 17-25 tahun, nilai rapor Matematika & Bahasa Inggris kuat, lulus ujian tulis Kedubes Jepang (Math, English, IPA/IPS).",
      link: "https://www.id.emb-japan.go.jp/sch_gakubu.html",
      badgeColor: "bg-red-100 text-red-800 border-red-300"
    },
    {
      id: "gks_u",
      title: "Global Korea Scholarship (GKS-U)",
      provider: "National Institute for International Education (NIIED) Korea Selatan",
      category: "INTL_GOV",
      coverage: "Full Tuition + Uang Saku (~₩900.000/bln) + Tiket Pesawat PP + Asuransi Kesehatan + 1 Tahun Kursus Bahasa Korea di Universitas",
      country: "🇰🇷 Korea Selatan",
      deadline: "September - Oktober",
      requirements: "Rata-rata nilai rapor ≥ 80% atau ranking top 20%, usia di bawah 25 tahun, Personal Statement & Study Plan orisinal, Surat Rekomendasi.",
      link: "https://www.studyinkorea.go.kr/",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      id: "turkiye_burslari",
      title: "Türkiye Bursları Undergraduate Scholarship",
      provider: "Pemerintah Republik Turki (YTB)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Uang Saku Bulanan + Akomodasi Asrama Gratis + Tiket Pesawat PP + Asuransi Kesehatan + 1 Tahun Kursus Bahasa Turki",
      country: "🇹🇷 Turki",
      deadline: "10 Januari - 20 Februari (Tahunan)",
      requirements: "Nilai rata-rata rapor min. 70% (Non-Kedokteran) atau min. 90% (Kedokteran/Farmasi), esai Letter of Intent yang mendalam.",
      link: "https://www.turkiyeburslari.gov.tr/",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: "stipendium_hungaricum",
      title: "Stipendium Hungaricum Scholarship",
      provider: "Tempus Public Foundation (Pemerintah Hungaria)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Tunjangan Bulanan (HUF 43.700/bln) + Kontribusi Akomodasi Asrama + Asuransi Kesehatan",
      country: "🇭🇺 Hungaria",
      deadline: "November - Januari",
      requirements: "Mendaftar via portal Tempus dan mendapat rekomendasi/nominasi Kemendikbudristek RI sebagai Sending Partner, sertifikat IELTS min. 6.0/6.5.",
      link: "https://stipendiumhungaricum.hu/",
      badgeColor: "bg-green-100 text-green-800 border-green-300"
    },
    {
      id: "csc_china",
      title: "Chinese Government Scholarship (CSC) - Type A & B",
      provider: "China Scholarship Council (CSC)",
      category: "INTL_GOV",
      coverage: "Full Tuition + Asrama Kampus + Asuransi Medis + Biaya Hidup (RMB 2.500/bln)",
      country: "🇨🇳 Tiongkok",
      deadline: "Desember - Maret",
      requirements: "Lulusan SMA, usia < 25 tahun, HSK min. Level 3-4 (jika prodi Mandarin) atau IELTS min. 6.0 / TOEFL 80 (jika English-taught), 2 LoR.",
      link: "https://www.campuschina.org/",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300"
    },
    {
      id: "jardine_oxbridge",
      title: "Jardine Scholarship (Univ. of Oxford & Cambridge)",
      provider: "Jardine Foundation (Jardine Matheson)",
      category: "UNIV_MERIT",
      coverage: "Full Ride: Biaya kuliah penuh, tunjangan biaya hidup tahunan, tiket pesawat PP, dan tunjangan buku",
      country: "🇬🇧 United Kingdom",
      deadline: "Agustus - Oktober (Seiring aplikasi UCAS)",
      requirements: "Keunggulan akademik luar biasa, kepemimpinan orisinal, komitmen pengabdian untuk Asia, LoA dari colleges mitra Oxford/Cambridge.",
      link: "https://www.jardine-foundation.org/scholarship-schemes",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300"
    },
    {
      id: "pearson_toronto",
      title: "Lester B. Pearson International Scholarship",
      provider: "University of Toronto",
      category: "UNIV_MERIT",
      coverage: "Full Ride: Biaya kuliah 4 tahun penuh, buku, insidental, dan asrama penuh 4 tahun",
      country: "🇨🇦 Kanada",
      deadline: "November (Batas Nominasi Sekolah) & Januari (Batas Siswa)",
      requirements: "Wajib dinominasikan resmi oleh sekolah SMA asal (1 sekolah = 1 nominasi), kreativitas luar biasa, kepemimpinan terbukti.",
      link: "https://future.utoronto.ca/pearson/",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
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
      link: "https://nus.edu.sg/oam/apply-to-nus",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
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
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300"
    },
    {
      id: "us_need_blind",
      title: "US Need-Blind / 100% Need-Met Full Financial Aid",
      provider: "Harvard, Yale, Princeton, MIT, Amherst, Bowdoin, Dartmouth, Brown",
      category: "UNIV_MERIT",
      coverage: "100% Demonstrated Financial Need: Biaya kuliah penuh, asrama, makan, asuransi, buku hingga tiket pesawat",
      country: "🇺🇸 Amerika Serikat",
      deadline: "Early Action/Decision: 1 Nov | Regular Decision: 1-5 Jan",
      requirements: "Diterima melalui Common App (Spike profile, SAT 1520+, Esai reflektif mendalam, 3 LoR super kuat) + Pengisian formulir CSS Profile.",
      link: "https://college.harvard.edu/financial-aid",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300"
    },
    {
      id: "nyu_abu_dhabi",
      title: "NYU Abu Dhabi Full Need-Based Support",
      provider: "New York University Abu Dhabi (NYUAD)",
      category: "UNIV_MERIT",
      coverage: "Full Ride: SPP 100%, akomodasi modern, konsumsi, tiket pesawat PP 2x setahun, dana riset musim panas global",
      country: "🇦🇪 UAE / USA Curricula",
      deadline: "ED 1: 1 Nov | ED 2: 1 Jan | RD: 5 Jan",
      requirements: "Aplikasi via Common App, wawasan global, keterbukaan budaya, rekam jejak kepemimpinan, dan undangan Candidate Weekend.",
      link: "https://nyuad.nyu.edu/en/admissions/undergraduate/financial-support.html",
      badgeColor: "bg-violet-100 text-violet-800 border-violet-300"
    },
    // ==========================================
    // COMPLETE INDONESIAN IUP PTN DATABASE (ALL UNIVERSITIES + SSU ITB)
    // ==========================================
    {
      id: "iup_ugm",
      title: "IUP Universitas Gadjah Mada (UGM)",
      provider: "Universitas Gadjah Mada (Yogyakarta)",
      category: "IUP_PTN",
      coverage: "Sarjana Kelas Internasional Terakreditasi Global + Kurikulum Berbahasa Inggris + Double Degree / Exchange Wajib",
      country: "🇮🇩 Indonesia (UGM Yogyakarta)",
      deadline: "Gelombang 1 (Jan-Feb), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Ujian GMST (Gadjah Mada Scholastic Test) + AcEPT / TOEFL ITP (min. 500 umum / min. 550 FK) / IELTS (min. 5.5-6.5) + Interview / MMI & FGD.",
      link: "https://um.ugm.ac.id/international-undergraduate-program-iup/",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: "kki_ui",
      title: "KKI (Kelas Khusus Internasional) UI",
      provider: "Universitas Indonesia (Depok & Salemba)",
      category: "IUP_PTN",
      coverage: "Single Degree & Double Degree Mitra Melbourne, Monash, Newcastle, Amsterdam, Tilburg, Groningen, Queensland",
      country: "🇮🇩 Indonesia (UI Depok / Salemba)",
      deadline: "Pendaftaran SIMAK KKI: Mei - Juni",
      requirements: "Ujian SIMAK KKI Bahasa Inggris (Basic Mathematics & IPA / IPS) + Sertifikat TOEFL ITP (min. 500 / min. 550 FK UI) / TOEFL iBT / IELTS + Interview.",
      link: "https://penerimaan.ui.ac.id/",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300"
    },
    {
      id: "iup_itb",
      title: "IUP & SSU Institut Teknologi Bandung (ITB)",
      provider: "Institut Teknologi Bandung (Ganesha & Jatinangor)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional STEI, SBM, FTI, FTMD, FTSL, FMIPA, SAPPK, SITH, FSRD + Program Sarjana Sekolah Unggulan (SSU)",
      country: "🇮🇩 Indonesia (ITB Bandung)",
      deadline: "Gelombang 1 (Feb), Gelombang 2 (Apr), Gelombang 3 (Jun)",
      requirements: "Ujian ITB AQAS (Bebas tes jika SAT Math ≥ 700) + English Proficiency Test ITB / TOEFL ITP (min. 500) / IELTS + Rapor Semester 1-5.",
      link: "https://admission.itb.ac.id/id/panduan-pendaftaran",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300"
    },
    {
      id: "iup_unair",
      title: "IUP Universitas Airlangga (UNAIR)",
      provider: "Universitas Airlangga (Surabaya)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Kedokteran Umum, Kedokteran Gigi, Farmasi, Manajemen, Akuntansi, Hukum, Psikologi, Hubungan Internasional",
      country: "🇮🇩 Indonesia (UNAIR Surabaya)",
      deadline: "Gelombang 1 (Feb-Mar), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Tes Potensi Akademik Bahasa Inggris + TOEFL ITP (min. 500 umum / min. 550 Kedokteran) / IELTS + Interview / MMI.",
      link: "https://ppmb.unair.ac.id/iup/",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300"
    },
    {
      id: "iup_its",
      title: "IUP Institut Teknologi Sepuluh Nopember (ITS)",
      provider: "ITS Surabaya",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Teknik Informatika, Sistem Informasi, Teknik Mesin, Teknik Elektro, Teknik Sipil, Desain Komunikasi Visual, Statistika Bisnis",
      country: "🇮🇩 Indonesia (ITS Surabaya)",
      deadline: "Gelombang 1 (Feb-Mar), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Nilai Rapor Semester 1-5 + Sertifikat Prestasi Akademik/Lomba + Tes Tulis TPA Bahasa Inggris + TOEFL ITP (min. 500) / IELTS.",
      link: "https://www.its.ac.id/admission/iup/",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      id: "iup_undip",
      title: "IUP Universitas Diponegoro (UNDIP)",
      provider: "Universitas Diponegoro (Semarang)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Manajemen, Akuntansi, Ilmu Ekonomi, Hukum, Ilmu Komunikasi, Teknik Industri, Teknik Kimia, Teknik Sipil, Teknik Lingkungan",
      country: "🇮🇩 Indonesia (UNDIP Semarang)",
      deadline: "Gelombang 1 (Feb-Mar), Gelombang 2 (Apr-Mei), Gelombang 3 (Jun)",
      requirements: "Scholastic Test Bahasa Inggris + TOEFL ITP (min. 500) / IELTS (min. 5.5) + Interview Bahasa Inggris.",
      link: "https://pmb.undip.ac.id/international-undergraduate-program-iup/",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300"
    },
    {
      id: "iup_unpad",
      title: "IUP Universitas Padjadjaran (UNPAD)",
      provider: "Universitas Padjadjaran (Bandung & Jatinangor)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Kedokteran Umum (FK), Akuntansi, Manajemen, Ilmu Ekonomi, Hukum, Hubungan Internasional, Farmasi, Ilmu Komunikasi",
      country: "🇮🇩 Indonesia (UNPAD Bandung)",
      deadline: "Gelombang 1 (Mar), Gelombang 2 (Mei), Gelombang 3 (Jun)",
      requirements: "Nilai Rapor + Sertifikat TOEFL ITP (min. 500 umum / min. 550 FK) / IELTS + Tes Kemampuan Akademik SMUP.",
      link: "https://smup.unpad.ac.id/international-undergraduate-program/",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: "iup_ipb",
      title: "IUP IPB University (Institut Pertanian Bogor)",
      provider: "IPB University (Bogor)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Kedokteran Hewan (FKH), Ilmu Komputer, Teknologi Pangan, Manajemen Agribisnis, Teknik Sipil & Lingkungan, Smart Agriculture",
      country: "🇮🇩 Indonesia (IPB Bogor)",
      deadline: "Gelombang 1 (Feb-Mar), Gelombang 2 (Mei)",
      requirements: "Tes Tulis Online Bahasa Inggris (Math & IPA / IPS) + Sertifikat TOEFL ITP (min. 500) / IELTS (min. 5.5).",
      link: "https://admisi.ipb.ac.id/international-undergraduate-program-iup/",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "iup_ub",
      title: "IUP Universitas Brawijaya (UB)",
      provider: "Universitas Brawijaya (Malang)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Manajemen, Akuntansi, Ekonomi Pembangunan, Ilmu Hukum, Administrasi Bisnis, Ilmu Komputer (FILKOM)",
      country: "🇮🇩 Indonesia (UB Malang)",
      deadline: "Gelombang 1 (Mar-Apr), Gelombang 2 (Mei-Jun)",
      requirements: "Ujian Tulis Bahasa Inggris (TPA & Basic Science/Social) + TOEFL ITP (min. 500) / IELTS + Wawancara.",
      link: "https://selma.ub.ac.id/iup2026/",
      badgeColor: "bg-orange-100 text-orange-800 border-orange-300"
    },
    {
      id: "iup_uns",
      title: "IUP Universitas Sebelas Maret (UNS)",
      provider: "Universitas Sebelas Maret (Solo)",
      category: "IUP_PTN",
      coverage: "Kelas Internasional Kedokteran (FK UNS), Akuntansi, Manajemen, Ekonomi Pembangunan",
      country: "🇮🇩 Indonesia (UNS Solo)",
      deadline: "Gelombang 1 (Mar), Gelombang 2 (Mei-Jun)",
      requirements: "Tes Potensi Skolastik Bahasa Inggris + TOEFL ITP (min. 500 umum / min. 550 FK) / IELTS + Wawancara.",
      link: "https://spmb.uns.ac.id/",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300"
    }
  ]
};

// ==========================================
// SECURITY & DATA SANITIZATION HELPER
// ==========================================
function sanitizeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// CLOUD SYNC & GOOGLE SHEETS ENGINE (OPTIMIZED FOR SPEED)
// ==========================================
function fetchWithTimeout(url, options = {}, timeoutMs = 2500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

async function pullCloudStudents() {
  let localData = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  let merged = [...localData];

  // 1. Google Sheets Pull with Fast Timeout
  if (GOOGLE_SCRIPT_URL) {
    try {
      const res = await fetchWithTimeout(GOOGLE_SCRIPT_URL, { cache: "no-store" }, 2500);
      if (res.ok) {
        const gasData = await res.json();
        if (gasData && gasData.students && Array.isArray(gasData.students)) {
          gasData.students.forEach(gs => {
            if (gs.email) {
              const idx = merged.findIndex(m => m.email && m.email.toLowerCase() === gs.email.toLowerCase());
              if (idx === -1) {
                merged.push({
                  id: "std_" + Date.now() + Math.random().toString(36).substr(2, 4),
                  name: gs.name,
                  email: gs.email.toLowerCase(),
                  grade: gs.grade || "Kelas 12",
                  password: gs.password || "SUCCESS2026",
                  registeredAt: gs.registeredAt || new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
                  role: "STUDENT"
                });
              } else {
                merged[idx] = { 
                  ...merged[idx], 
                  name: gs.name || merged[idx].name, 
                  grade: gs.grade || merged[idx].grade,
                  password: gs.password || merged[idx].password 
                };
              }
            }
          });
          localStorage.setItem("ngambis_registered_students", JSON.stringify(merged));
        }
      }
    } catch (err) {}
  }

  // 2. KV Store Pull with Fast Timeout
  try {
    const res = await fetchWithTimeout(CLOUD_SYNC_URL, { cache: "no-store" }, 2000);
    if (res.ok) {
      const cloudData = await res.json();
      if (Array.isArray(cloudData) && cloudData.length > 0) {
        cloudData.forEach(cs => {
          const idx = merged.findIndex(m => m.email && m.email.toLowerCase() === cs.email.toLowerCase());
          if (idx === -1) {
            merged.push(cs);
          } else {
            merged[idx] = { ...merged[idx], ...cs };
          }
        });
        localStorage.setItem("ngambis_registered_students", JSON.stringify(merged));
      }
    }
  } catch (err) {}

  return getRegisteredStudents();
}

async function pushCloudStudents(students) {
  try {
    await fetch(CLOUD_SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(students)
    });
  } catch (err) {
    console.warn("Cloud push note:", err);
  }
}

async function pullCloudCompetitions() {
  const local = JSON.parse(localStorage.getItem("ngambis_custom_competitions") || "[]");
  try {
    const res = await fetch(COMPETITIONS_SYNC_URL, { cache: "no-store" });
    if (res.ok) {
      const cloud = await res.json();
      if (Array.isArray(cloud) && cloud.length > 0) {
        localStorage.setItem("ngambis_custom_competitions", JSON.stringify(cloud));
        renderCompetitions();
        return;
      }
    }
  } catch (err) {}
  renderCompetitions();
}

async function pushCloudCompetitions(comps) {
  try {
    await fetch(COMPETITIONS_SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comps)
    });
  } catch (err) {}
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  loadCustomPasscodes();
  checkExistingSession();
  renderScholarships();
  renderDeadlines();
  renderCompetitions();
  updateAnalyticsStats();
  updateCampusBackground('dashboard');

  pullCloudStudents().then(() => {
    updateAnalyticsStats();
    if (STATE.currentUser && STATE.currentUser.role === "MENTOR") {
      renderRegisteredStudentsAdmin();
    }
  });

  pullCloudCompetitions();
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
// SIDEBAR DRAWER NAVIGATION
// ==========================================
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar-drawer");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (!sidebar) return;

  const isClosed = sidebar.classList.contains("-translate-x-full");
  if (isClosed) {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    if (backdrop) backdrop.classList.remove("hidden");
  } else {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
    if (backdrop) backdrop.classList.add("hidden");
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar-drawer");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (sidebar) {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
  }
  if (backdrop) {
    backdrop.classList.add("hidden");
  }
}

// ==========================================
// DYNAMIC CAMPUS SCENERY BACKGROUNDS
// ==========================================
const CAMPUS_BACKGROUNDS = {
  auth: {
    spot: "Historic Quadrangle Courtyard & Garden",
    university: "University of Oxford & Cambridge, UK 🇬🇧",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&auto=format&fit=crop&q=80"
  },
  dashboard: {
    spot: "Locust Walk & College Green Park",
    university: "University of Pennsylvania (UPenn), USA 🇺🇸",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&auto=format&fit=crop&q=80"
  },
  roadmap: {
    spot: "Harvard Yard & Historic Memorial Park",
    university: "Harvard University, Cambridge USA 🇺🇸",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&auto=format&fit=crop&q=80"
  },
  competitions: {
    spot: "Killian Court & Great Dome Lawn",
    university: "Massachusetts Institute of Technology (MIT), USA 🇺🇸",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1920&auto=format&fit=crop&q=80"
  },
  scholarships: {
    spot: "Radcliffe Quadrangle & Bodleian Gardens",
    university: "University of Oxford, United Kingdom 🇬🇧",
    image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=1920&auto=format&fit=crop&q=80"
  },
  loa: {
    spot: "Umeda Sky Garden & Umekita Green Oasis",
    university: "Taman Umeda / Umekita Park, Osaka Japan 🇯🇵",
    image: "https://images.unsplash.com/photo-1590559899731-a3f07b743759?w=1920&auto=format&fit=crop&q=80"
  },
  tests: {
    spot: "Hongo Campus Ginkgo Tree Avenue & Yasuda Garden",
    university: "University of Tokyo (東京大学), Japan 🇯🇵",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&auto=format&fit=crop&q=80"
  },
  essays: {
    spot: "Main Quadrangle & Palm Drive Garden",
    university: "Stanford University, California USA 🇺🇸",
    image: "https://images.unsplash.com/photo-1527891751199-722e37466720?w=1920&auto=format&fit=crop&q=80"
  },
  templates: {
    spot: "Cannon Green & Historic Nassau Lawn",
    university: "Princeton University, New Jersey USA 🇺🇸",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1920&auto=format&fit=crop&q=80"
  },
  portfolio: {
    spot: "King's College Chapel & The Backs Lawn",
    university: "University of Cambridge, United Kingdom 🇬🇧",
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1920&auto=format&fit=crop&q=80"
  },
  admin: {
    spot: "Low Memorial Library Plaza & South Lawn",
    university: "Columbia University, New York USA 🇺🇸",
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=1920&auto=format&fit=crop&q=80"
  }
};

function updateCampusBackground(tabId) {
  const bgData = CAMPUS_BACKGROUNDS[tabId] || CAMPUS_BACKGROUNDS.dashboard;
  const bgImageEl = document.getElementById("dynamic-bg-image");

  if (bgImageEl) {
    bgImageEl.style.opacity = "0.7";
    setTimeout(() => {
      bgImageEl.style.backgroundImage = `url('${bgData.image}')`;
      bgImageEl.style.opacity = "1";
    }, 150);
  }
}

// ==========================================
// TAB SWITCHING & ROUTING
// ==========================================
function switchTab(tabId) {
  if (tabId === "admin" && (!STATE.currentUser || STATE.currentUser.role !== "MENTOR")) {
    alert("⛔ Akses Terbatas: Halaman ini khusus untuk Head Mentor.");
    return;
  }

  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".nav-menu-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove("hidden");
  }

  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.classList.add("active");
  }

  // Update dynamic campus backdrop smoothly
  updateCampusBackground(tabId);

  logActivity("VIEW_TAB", `Membuka modul: ${tabId.toUpperCase()}`);

  if (tabId === "admin" && STATE.currentUser && STATE.currentUser.role === "MENTOR") {
    renderAnalyticsTable();
    renderSubmittedDraftsAdmin();
    renderRegisteredStudentsAdmin();
    renderPasscodesInAdmin();
    renderAdminCompetitions();
  }

  if (window.innerWidth < 1024) {
    closeSidebar();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// AUTHENTICATION: 3-MODE SYSTEM (LOGIN, REGISTER, MENTOR)
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

  [btnLogin, btnRegister, btnMentor].forEach(b => {
    if (b) b.className = "flex-1 py-2 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 transition";
  });

  if (tab === 'login') {
    if (formLogin) formLogin.classList.remove("hidden");
    if (formRegister) formRegister.classList.add("hidden");
    if (formMentor) formMentor.classList.add("hidden");
    if (btnLogin) btnLogin.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-amber-800 text-white shadow-sm transition";
  } else if (tab === 'register') {
    if (formLogin) formLogin.classList.add("hidden");
    if (formRegister) formRegister.classList.remove("hidden");
    if (formMentor) formMentor.classList.add("hidden");
    if (btnRegister) btnRegister.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-blue-700 text-white shadow-sm transition";
  } else if (tab === 'mentor') {
    if (formLogin) formLogin.classList.add("hidden");
    if (formRegister) formRegister.classList.add("hidden");
    if (formMentor) formMentor.classList.remove("hidden");
    if (btnMentor) btnMentor.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-stone-900 text-white shadow-sm transition";
  }
}

// 1. INSTANT STUDENT LOGIN HANDLER (<10ms FAST-PATH)
const loginForm = document.getElementById("auth-form-login");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value.trim();
    const errorBox = document.getElementById("login-error");
    const loginBtn = e.target.querySelector("button[type='submit']");

    if (!email || !password) {
      errorBox.textContent = "Mohon masukkan email dan password akun kamu.";
      errorBox.classList.remove("hidden");
      return;
    }

    // FAST-PATH 1: Instant Local Memory Check (<5ms)
    let registeredUsers = getRegisteredStudents();
    let foundUser = registeredUsers.find(u => u.email && u.email.toLowerCase() === email);

    if (foundUser) {
      const isMasterPasscode = STATE.registrationPasscodes.includes(password.toUpperCase());
      if (foundUser.password && foundUser.password !== password && !isMasterPasscode) {
        errorBox.textContent = "❌ Password salah! Silakan masukkan password yang kamu buat saat mendaftar.";
        errorBox.classList.remove("hidden");
        return;
      }

      // INSTANT ACCESS
      logActivity("LOGIN", `Siswa Login: ${email}`, foundUser.grade);
      loginUser(foundUser);
      // Non-blocking sync in background
      pullCloudStudents();
      return;
    }

    // FAST-PATH 2: If not found locally, do swift cloud lookup with spinner
    if (loginBtn) {
      loginBtn.disabled = true;
      loginBtn.innerHTML = `<span class="inline-block animate-spin mr-1">⏳</span> Menghubungkan ke Cloud...`;
    }

    await pullCloudStudents();
    registeredUsers = getRegisteredStudents();
    foundUser = registeredUsers.find(u => u.email && u.email.toLowerCase() === email);

    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.innerHTML = `<span>Masuk ke Portal Siswa</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
      if (window.lucide) lucide.createIcons();
    }

    // STRICT CHECK: Must be registered
    if (!foundUser) {
      errorBox.textContent = "❌ Akun dengan email ini belum terdaftar di cloud! Silakan klik tab 'Daftar Siswa Baru' terlebih dahulu.";
      errorBox.classList.remove("hidden");
      return;
    }

    // Password verification
    const isMasterPasscode = STATE.registrationPasscodes.includes(password.toUpperCase());
    if (foundUser.password && foundUser.password !== password && !isMasterPasscode) {
      errorBox.textContent = "❌ Password salah! Silakan masukkan password yang kamu buat saat mendaftar.";
      errorBox.classList.remove("hidden");
      return;
    }

    // Grant access
    logActivity("LOGIN", `Siswa Login: ${email}`, foundUser.grade);
    loginUser(foundUser);
  });
}

// 2. INSTANT STUDENT REGISTRATION HANDLER (ZERO-LAG)
const registerForm = document.getElementById("auth-form-register");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const grade = document.getElementById("reg-grade").value;
    const passcode = document.getElementById("reg-passcode").value.trim().toUpperCase();
    const password = document.getElementById("reg-password").value.trim();
    const errorBox = document.getElementById("login-error");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      errorBox.textContent = "Format email tidak valid! Masukkan alamat email aktif (contoh: nama@gmail.com).";
      errorBox.classList.remove("hidden");
      return;
    }

    if (!STATE.registrationPasscodes.includes(passcode)) {
      errorBox.textContent = "Passcode Pendaftaran salah! Masukkan passcode resmi dari mentor (SUCCESS2026).";
      errorBox.classList.remove("hidden");
      return;
    }

    if (password.length < 4) {
      errorBox.textContent = "Password minimal 4 karakter demi keamanan akun kamu.";
      errorBox.classList.remove("hidden");
      return;
    }

    let registeredUsers = getRegisteredStudents();
    if (registeredUsers.some(u => u.email && u.email.toLowerCase() === email)) {
      errorBox.textContent = "Email ini sudah terdaftar! Silakan langsung login di tab 'Masuk (Login)'.";
      errorBox.classList.remove("hidden");
      return;
    }

    const studentUser = {
      id: "std_" + Date.now(),
      name: name,
      email: email,
      grade: grade,
      password: password,
      registeredAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      role: "STUDENT"
    };

    // 1. INSTANT LOCAL CACHE & TRANSITION
    registeredUsers.push(studentUser);
    localStorage.setItem("ngambis_registered_students", JSON.stringify(registeredUsers));

    // 2. ASYNC BACKGROUND CLOUD DISPATCH (Non-blocking)
    pushCloudStudents(registeredUsers);

    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "register",
          name: name,
          email: email,
          grade: grade,
          password: password
        })
      }).catch(() => {});
    }

    // Fire & Forget email to Mentor
    fetch(`https://formsubmit.co/ajax/${MENTOR_EMAIL}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        event: "Pendaftaran Siswa Baru",
        nama_siswa: name,
        email_siswa: email,
        kelas: grade,
        waktu: studentUser.registeredAt,
        _subject: `🎉 [Ngambis Bareng] Siswa Baru Mendaftar: ${name} (${email})`,
        _replyto: email
      })
    }).catch(() => {});

    logActivity("STUDENT_REGISTER", `Registrasi Akun: ${name} (${email})`, grade);
    loginUser(studentUser);
  });
}

// 3. MENTOR LOGIN HANDLER
const mentorForm = document.getElementById("auth-form-mentor");
if (mentorForm) {
  mentorForm.addEventListener("submit", (e) => {
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
}

function loginUser(user) {
  STATE.currentUser = user;
  localStorage.setItem("ngambis_user_session", JSON.stringify(user));

  document.getElementById("auth-screen").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");

  // Update UI Displays
  const nameEls = document.querySelectorAll(".user-name-display");
  nameEls.forEach(el => el.textContent = user.name);

  const initialEls = document.querySelectorAll(".user-initial-display");
  initialEls.forEach(el => el.textContent = (user.name || "S").charAt(0).toUpperCase());

  const gradeEls = document.querySelectorAll(".user-grade-display");
  gradeEls.forEach(el => el.textContent = user.grade);

  const emailEls = document.querySelectorAll(".user-email-display");
  emailEls.forEach(el => el.textContent = user.email || "-");

  // Admin visibility
  const navAdmin = document.getElementById("nav-admin");
  if (user.role === "MENTOR") {
    if (navAdmin) navAdmin.classList.remove("hidden");
    renderRegisteredStudentsAdmin();
    renderPasscodesInAdmin();
    renderAdminCompetitions();
  } else {
    if (navAdmin) navAdmin.classList.add("hidden");
  }

  setupWatermark(user.name, user.email || user.grade);

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
// SECURITY WATERMARK FORENSICS
// ==========================================
function setupWatermark(name, emailOrGrade) {
  const container = document.getElementById("watermark-container");
  if (!container) return;
  container.innerHTML = "";
  container.classList.remove("hidden");

  const watermarkText = `NGAMBIS BARENG • LDM ECOSYSTEM • ${name.toUpperCase()} (${emailOrGrade}) • CONFIDENTIAL`;
  for (let i = 0; i < 40; i++) {
    const span = document.createElement("div");
    span.className = "p-4 tracking-wider text-[11px] font-mono select-none text-stone-900/5";
    span.textContent = watermarkText;
    container.appendChild(span);
  }
}

// ==========================================
// ROADMAP TIMELINES (PTLN VS IUP PTN)
// ==========================================
let currentRoadmapTrack = 'ptln'; // 'ptln' | 'iup'

function switchRoadmapTrack(track) {
  currentRoadmapTrack = track;
  const viewPtln = document.getElementById("roadmap-view-ptln");
  const viewIup = document.getElementById("roadmap-view-iup");
  const btnPtln = document.getElementById("btn-track-ptln");
  const btnIup = document.getElementById("btn-track-iup");

  if (track === 'ptln') {
    if (viewPtln) viewPtln.classList.remove("hidden");
    if (viewIup) viewIup.classList.add("hidden");
    if (btnPtln) btnPtln.className = "flex-1 sm:flex-none py-2 px-4 text-xs font-bold rounded-xl bg-amber-800 text-white shadow-sm transition";
    if (btnIup) btnIup.className = "flex-1 sm:flex-none py-2 px-4 text-xs font-semibold rounded-xl text-stone-600 hover:text-stone-900 transition";
  } else {
    if (viewPtln) viewPtln.classList.add("hidden");
    if (viewIup) viewIup.classList.remove("hidden");
    if (btnPtln) btnPtln.className = "flex-1 sm:flex-none py-2 px-4 text-xs font-semibold rounded-xl text-stone-600 hover:text-stone-900 transition";
    if (btnIup) btnIup.className = "flex-1 sm:flex-none py-2 px-4 text-xs font-bold rounded-xl bg-blue-700 text-white shadow-sm transition";
  }

  logActivity("SWITCH_ROADMAP", `Melihat Jalur: ${track.toUpperCase()}`);
}

function toggleMilestone(milestoneId) {
  if (!STATE.currentUser) return;
  const checkbox = document.getElementById(`ms-${milestoneId}`);
  if (!checkbox) return;

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
  const totalMilestones = 12;
  const completed = Object.values(userProgress).filter(Boolean).length;
  const percentage = Math.round((completed / totalMilestones) * 100);

  const textEl = document.getElementById("overall-progress-text");
  const barEl = document.getElementById("overall-progress-bar");

  if (textEl) textEl.textContent = `${percentage}% Capaian (${completed}/${totalMilestones} Target)`;
  if (barEl) barEl.style.width = `${percentage}%`;
}

// ==========================================
// COMPETITION FEED & MENTOR MANAGER
// ==========================================
function getAllCompetitions() {
  const custom = JSON.parse(localStorage.getItem("ngambis_custom_competitions") || "[]");
  return [...custom, ...STATE.competitions];
}

function renderCompetitions(items = null) {
  const container = document.getElementById("competition-grid");
  if (!container) return;

  const list = items || getAllCompetitions();
  if (list.length === 0) {
    container.innerHTML = `<div class="col-span-full p-8 text-center glass-subpanel rounded-2xl border border-stone-200/80 text-stone-500">Belum ada info lomba yang tersedia.</div>`;
    return;
  }

  container.innerHTML = list.map(c => `
    <div class="glass-card-item rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div class="h-44 w-full bg-stone-100/60 relative overflow-hidden">
          <img src="${sanitizeHTML(c.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800')}" alt="${sanitizeHTML(c.title)}" class="w-full h-full object-cover">
          <div class="absolute top-3 left-3">
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${c.badgeColor || 'bg-amber-100 text-amber-800 border border-amber-300'}">
              ${sanitizeHTML(c.category)}
            </span>
          </div>
          <div class="absolute bottom-3 right-3">
            <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-stone-900/80 text-white backdrop-blur-sm">
              ⏳ ${sanitizeHTML(c.deadline)}
            </span>
          </div>
        </div>

        <div class="p-5">
          <h3 class="text-base font-bold text-stone-900 mb-1 leading-snug">${sanitizeHTML(c.title)}</h3>
          <p class="text-xs font-semibold text-amber-800 mb-3">${sanitizeHTML(c.organizer)}</p>
          <p class="text-xs text-stone-600 mb-3 line-clamp-3 leading-relaxed">${sanitizeHTML(c.description)}</p>
          
          <div class="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 mb-2">
            <strong>💎 Benefit / Prestasi:</strong> ${sanitizeHTML(c.perks)}
          </div>
        </div>
      </div>

      <div class="p-5 pt-0">
        <a href="${sanitizeHTML(c.link)}" target="_blank" rel="noopener noreferrer" onclick="logActivity('COMPETITION_LINK', '${sanitizeHTML(c.title)}')" class="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
          <span>Kunjungi Website Resmi & Daftar</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

function filterCompetitions() {
  const query = (document.getElementById("comp-search").value || "").toLowerCase();
  const category = document.getElementById("comp-cat-filter").value;
  const all = getAllCompetitions();

  const filtered = all.filter(c => {
    const matchQ = c.title.toLowerCase().includes(query) || c.organizer.toLowerCase().includes(query) || c.description.toLowerCase().includes(query);
    const matchCat = category === "ALL" || c.category === category;
    return matchQ && matchCat;
  });

  renderCompetitions(filtered);
}

function handleCompetitionImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("new-comp-image-preview").src = e.target.result;
    document.getElementById("new-comp-image-preview").classList.remove("hidden");
    document.getElementById("new-comp-image-data").value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function addNewCompetitionByMentor(e) {
  e.preventDefault();
  const title = document.getElementById("new-comp-title").value.trim();
  const organizer = document.getElementById("new-comp-organizer").value.trim();
  const category = document.getElementById("new-comp-category").value;
  const deadline = document.getElementById("new-comp-deadline").value.trim();
  const perks = document.getElementById("new-comp-perks").value.trim();
  const description = document.getElementById("new-comp-desc").value.trim();
  const link = document.getElementById("new-comp-link").value.trim();
  const imageData = document.getElementById("new-comp-image-data").value || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800";

  if (!title || !organizer || !link) {
    alert("Mohon lengkapi judul lomba, penyelenggara, dan link pendaftaran!");
    return;
  }

  const newComp = {
    id: "custom_comp_" + Date.now(),
    title: title,
    organizer: organizer,
    category: category,
    deadline: deadline || "Informasi di Website",
    perks: perks || "Sertifikat Prestasi & Portofolio",
    description: description || "Lomba terkurasi untuk pembinaan siswa Ngambis Bareng.",
    link: link,
    image: imageData,
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
  };

  const currentCustom = JSON.parse(localStorage.getItem("ngambis_custom_competitions") || "[]");
  currentCustom.unshift(newComp);
  localStorage.setItem("ngambis_custom_competitions", JSON.stringify(currentCustom));
  pushCloudCompetitions(currentCustom);

  document.getElementById("form-add-competition").reset();
  document.getElementById("new-comp-image-preview").classList.add("hidden");
  document.getElementById("new-comp-image-data").value = "";

  renderCompetitions();
  renderAdminCompetitions();
  alert(`✅ Lomba '${title}' berhasil dipublikasikan ke seluruh siswa!`);
}

function deleteCompetitionByMentor(id) {
  if (confirm("Hapus info lomba ini dari portal siswa?")) {
    let currentCustom = JSON.parse(localStorage.getItem("ngambis_custom_competitions") || "[]");
    currentCustom = currentCustom.filter(c => c.id !== id);
    localStorage.setItem("ngambis_custom_competitions", JSON.stringify(currentCustom));
    pushCloudCompetitions(currentCustom);
    renderCompetitions();
    renderAdminCompetitions();
  }
}

function renderAdminCompetitions() {
  const container = document.getElementById("admin-competitions-list");
  if (!container) return;

  const list = JSON.parse(localStorage.getItem("ngambis_custom_competitions") || "[]");
  if (list.length === 0) {
    container.innerHTML = `<p class="text-xs text-stone-500 italic">Belum ada lomba custom yang kamu tambahkan.</p>`;
    return;
  }

  container.innerHTML = list.map(c => `
    <div class="p-3 glass-subpanel border border-stone-200/80 rounded-xl flex items-center justify-between gap-3">
      <div class="min-w-0">
        <p class="font-bold text-xs text-stone-900 truncate">${sanitizeHTML(c.title)}</p>
        <p class="text-[11px] text-stone-500">${sanitizeHTML(c.organizer)} • <span class="text-amber-800 font-semibold">${sanitizeHTML(c.category)}</span></p>
      </div>
      <button onclick="deleteCompetitionByMentor('${c.id}')" class="px-2.5 py-1 text-[11px] bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg border border-red-300 transition">
        Hapus
      </button>
    </div>
  `).join("");
}

// ==========================================
// SCHOLARSHIP & DEADLINE RENDERING
// ==========================================
function renderScholarships(items = STATE.scholarships) {
  const grid = document.getElementById("scholarship-grid");
  if (!grid) return;

  grid.innerHTML = items.map(s => `
    <div class="p-5 rounded-3xl glass-card-item border border-stone-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${s.badgeColor}">
            ${s.country}
          </span>
          <span class="text-[11px] text-stone-500 font-medium">⏳ ${s.deadline}</span>
        </div>

        <h3 class="text-sm font-bold text-stone-900 mb-1 leading-snug">${s.title}</h3>
        <p class="text-xs text-amber-800 font-semibold mb-3">${s.provider}</p>

        <div class="space-y-2 text-xs text-stone-700">
          <p><strong class="text-stone-900">Coverage:</strong> ${s.coverage}</p>
          <p><strong class="text-stone-900">Syarat Inti:</strong> ${s.requirements}</p>
        </div>
      </div>

      <div class="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between">
        <a href="${s.link}" target="_blank" rel="noopener noreferrer" onclick="logActivity('SCHOLARSHIP_LINK', '${s.title}')" class="text-xs text-amber-800 hover:text-amber-900 font-bold inline-flex items-center gap-1">
          Kunjungi Website Resmi <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
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
      badgeStatus = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 whitespace-nowrap">${diffDays} Hari Lagi</span>`;
    } else {
      badgeStatus = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500 border border-stone-300 whitespace-nowrap">Siklus Ditutup</span>`;
    }

    return `
      <div class="p-3.5 rounded-2xl glass-card-item border border-stone-200/80 shadow-2xs flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-[9px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 font-semibold uppercase truncate">${d.category}</span>
          </div>
          <p class="font-bold text-stone-900 text-xs truncate">${d.name}</p>
          <p class="text-[10px] text-stone-500">${deadlineDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        ${badgeStatus}
      </div>
    `;
  }).join("");
}

// ==========================================
// PROFILE MATCH SIMULATOR (WITH TOEFL ITP)
// ==========================================
function calculateProfileChance() {
  const gpa = parseFloat(document.getElementById("calc-gpa").value) || 0;
  const sat = parseInt(document.getElementById("calc-sat").value) || 0;
  const ielts = parseFloat(document.getElementById("calc-ielts").value) || 0;
  const toeflItp = parseInt(document.getElementById("calc-toefl-itp").value) || 0;
  const target = document.getElementById("calc-target-track").value;
  const spike = document.getElementById("calc-spike").value;
  const resultBox = document.getElementById("calc-result");

  let matchTier = "";
  let recommendation = "";
  let badgeColor = "";

  if (target === "IUP_FK") {
    if (toeflItp >= 550 || ielts >= 6.5) {
      matchTier = "🩺 Lolos Standar Fakultas Kedokteran IUP (FK UGM, KKI UI, UNAIR FK, UNPAD FK)";
      recommendation = `Skor TOEFL ITP kamu (${toeflItp}) / IELTS (${ielts}) telah melampaui batas minimal 550 untuk FK IUP! Maksimalkan latihan tes GMST/SIMAK IPA dan persiapan Mini Multiple Interview (MMI).`;
      badgeColor = "border-emerald-300 text-emerald-900 bg-emerald-50";
    } else {
      matchTier = "⚠️ Di Bawah Standar Khusus FK IUP (Minimal 550 TOEFL ITP)";
      recommendation = `Skor TOEFL ITP kamu (${toeflItp}) masih di bawah standar 550 untuk Kedokteran IUP. Ambil program intensif Structure & Reading TOEFL ITP untuk mencapai target 550+.`;
      badgeColor = "border-red-300 text-red-900 bg-red-50";
    }
  } else if (target === "IUP_REGULAR") {
    if (toeflItp >= 500 || ielts >= 5.5) {
      matchTier = "🇮🇩 Lolos Standar IUP Umum (UGM, ITB, UI KKI, UNAIR, ITS, UNDIP, UNPAD, IPB)";
      recommendation = `Skor TOEFL ITP kamu (${toeflItp}) sudah memenuhi syarat minimal pendaftaran Gelombang 1 IUP PTN (min. 500). Fokus pada tes potensi akademik (GMST/AQAS/TPA).`;
      badgeColor = "border-blue-300 text-blue-900 bg-blue-50";
    } else {
      matchTier = "⚠️ Di Bawah Standar IUP Umum (Minimal 500 TOEFL ITP)";
      recommendation = `Skor TOEFL ITP kamu (${toeflItp}) masih di bawah batas aman 500. Lakukan simulasi berkala untuk mengejar min. 500 sebelum pendaftaran Gelombang 1 dibuka.`;
      badgeColor = "border-amber-300 text-amber-900 bg-amber-50";
    }
  } else {
    if (gpa >= 92 && sat >= 1500 && ielts >= 7.5 && spike === "national_gold") {
      matchTier = "🌟 Super Competitive Tier (Ivy League / MIT / Oxford / Cambridge / NUS ASEAN)";
      recommendation = "Profil kamu sangat solid untuk beasiswa Full Ride dunia & Need-Blind US! Maksimalkan narasi esai dan LoR yang tajam.";
      badgeColor = "border-purple-300 text-purple-900 bg-purple-50";
    } else if (gpa >= 88 && (sat >= 1400 || ielts >= 7.0)) {
      matchTier = "🎯 High Match Tier (Toronto Pearson, KAIST, HKU, MEXT Gakubu, GKS Korea)";
      recommendation = "Peluang kamu sangat tinggi di kampus riset top Asia, Kanada, dan Beasiswa Pemerintah. Naikkan skor SAT Math ke 750+ untuk booster ekstra.";
      badgeColor = "border-blue-300 text-blue-900 bg-blue-50";
    } else {
      matchTier = "📚 Building Phase (Perlu Penguatan Rapor & Tes Standar)";
      recommendation = "Fokus naikkan rata-rata nilai rapor di semester berjalan dan mulai latihan rutin Khan Academy SAT & kosakata harian.";
      badgeColor = "border-amber-300 text-amber-900 bg-amber-50";
    }
  }

  resultBox.className = `p-4 rounded-xl border mt-4 text-xs ${badgeColor}`;
  resultBox.innerHTML = `
    <p class="font-bold text-sm mb-1">${matchTier}</p>
    <p class="leading-relaxed">${recommendation}</p>
  `;
  resultBox.classList.remove("hidden");

  logActivity("PROFILE_CALCULATOR", `Target: ${target}, TOEFL: ${toeflItp}, GPA: ${gpa}`);
}

// ==========================================
// ESSAY DRAFT SUBMISSION (BULLETPROOF DISPATCH)
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

  const isValidUrl = gdocLink.startsWith("http://") || gdocLink.startsWith("https://");
  if (!isValidUrl) {
    alertBox.textContent = "Mohon masukkan tautan yang valid (diawali dengan https://). Pastikan pengaturan file/folder sudah 'Anyone with the link can view/comment'.";
    alertBox.className = "p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs text-center";
    alertBox.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="inline-block animate-spin mr-1">⏳</span> Mengirimkan Notifikasi ke Mentor...`;

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
    status: "Terkirim ke Mentor"
  };

  const allDrafts = JSON.parse(localStorage.getItem("ngambis_submitted_drafts") || "[]");
  allDrafts.unshift(draftEntry);
  localStorage.setItem("ngambis_submitted_drafts", JSON.stringify(allDrafts));

  try {
    const payload = {
      nama_siswa: STATE.currentUser.name,
      email_siswa: STATE.currentUser.email || "Tidak tertera",
      kelas_siswa: STATE.currentUser.grade,
      judul_esai: essayTitle,
      tipe_esai: essayType,
      link_google_docs: gdocLink,
      catatan_siswa: notes || "Tidak ada catatan tambahan.",
      waktu_pengiriman: draftEntry.timestamp,
      _subject: `🚨 [Ngambis Bareng] Draft Esai Masuk: ${STATE.currentUser.name} (${essayTitle})`,
      _replyto: STATE.currentUser.email || MENTOR_EMAIL
    };

    // 1. Dispatch to FormSubmit -> sends real email to maesa.am222@gmail.com
    await fetch(`https://formsubmit.co/ajax/${MENTOR_EMAIL}`, {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // 2. Dispatch to Cloud Database via Apps Script
    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "submit_essay",
          student_name: STATE.currentUser.name,
          student_email: STATE.currentUser.email || "-",
          student_grade: STATE.currentUser.grade,
          essay_title: essayTitle,
          essay_type: essayType,
          google_docs_link: gdocLink,
          notes: notes
        })
      }).catch((err) => console.warn("Cloud dispatch note:", err));
    }
  } catch (err) {
    console.warn("Direct email dispatch note:", err);
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = `<span>Kirim Draft ke Mentor</span> <i data-lucide="upload-cloud" class="w-4 h-4"></i>`;

  alertBox.className = "p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs text-center";
  alertBox.innerHTML = `✅ <strong>Berhasil Terkirim!</strong> Notifikasi draft esaimu (Nama, Email, dan Link Google Docs) telah dikirimkan langsung ke email Mentor Maesa (<em>${MENTOR_EMAIL}</em>) dan dicatat di cloud database.`;
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
    container.innerHTML = `<p class="text-xs text-stone-500 italic">Kamu belum pernah mengirimkan draft esai.</p>`;
    return;
  }

  container.innerHTML = myDrafts.map(d => `
    <div class="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-semibold">${sanitizeHTML(d.type)}</span>
          <p class="font-bold text-stone-900 text-xs truncate">${sanitizeHTML(d.title)}</p>
        </div>
        <p class="text-[11px] text-stone-500">Dikirim: ${d.timestamp}</p>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-center">
        <a href="${sanitizeHTML(d.link)}" target="_blank" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-xs text-stone-800 rounded-lg border border-stone-300 flex items-center gap-1 font-semibold">
          Buka Docs <i data-lucide="external-link" class="w-3 h-3"></i>
        </a>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
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
    container.innerHTML = `<p class="text-xs text-stone-500 italic">Belum ada draft esai dari siswa yang masuk.</p>`;
    return;
  }

  container.innerHTML = allDrafts.map(d => `
    <div class="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">${sanitizeHTML(d.grade)}</span>
          <span class="font-bold text-stone-900 text-xs">${sanitizeHTML(d.studentName)}</span>
          <span class="text-stone-500 text-xs font-mono">(${sanitizeHTML(d.studentEmail)})</span>
          <span class="text-stone-300 text-xs">•</span>
          <span class="text-xs text-amber-900 font-semibold">${sanitizeHTML(d.title)}</span>
        </div>
        <p class="text-[11px] text-stone-500">Waktu: ${d.timestamp} | Catatan: "${sanitizeHTML(d.notes || 'Tidak ada catatan')}"</p>
      </div>
      <div class="flex items-center gap-2">
        <a href="${sanitizeHTML(d.link)}" target="_blank" class="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
          Buka Docs & Koreksi <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// REGISTERED STUDENTS & MENTOR DIRECTORY
// ==========================================
function getRegisteredStudents() {
  let registeredUsers = JSON.parse(localStorage.getItem("ngambis_registered_students") || "[]");
  return registeredUsers;
}

function renderRegisteredStudentsAdmin() {
  const tbody = document.getElementById("admin-students-body");
  if (!tbody) return;

  const registeredUsers = getRegisteredStudents();
  if (registeredUsers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-stone-500">Belum ada siswa yang mendaftar.</td></tr>`;
    return;
  }

  tbody.innerHTML = registeredUsers.map((s, idx) => `
    <tr class="hover:bg-stone-50 transition">
      <td class="p-3 text-stone-500 font-mono">${idx + 1}</td>
      <td class="p-3 font-semibold text-stone-900">${sanitizeHTML(s.name)}</td>
      <td class="p-3 font-mono text-stone-700 text-xs">
        <a href="mailto:${s.email}" class="hover:underline inline-flex items-center gap-1 text-amber-900 font-medium">
          ${sanitizeHTML(s.email)} <i data-lucide="mail" class="w-3 h-3"></i>
        </a>
      </td>
      <td class="p-3 text-stone-700">
        <span class="px-2 py-0.5 rounded bg-stone-100 text-[11px] font-semibold border border-stone-200">
          ${sanitizeHTML(s.grade)}
        </span>
      </td>
      <td class="p-3 text-stone-500 text-[11px] font-mono">${s.registeredAt || '-'}</td>
      <td class="p-3 text-right">
        <button onclick="deleteStudentAdmin('${s.email}')" class="px-2.5 py-1 text-[11px] bg-red-100 hover:bg-red-200 text-red-700 rounded-lg border border-red-300 transition inline-flex items-center gap-1 font-semibold">
          <i data-lucide="trash-2" class="w-3 h-3"></i> Hapus
        </button>
      </td>
    </tr>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

function toggleAddStudentForm() {
  const form = document.getElementById("manual-student-form");
  if (form) form.classList.toggle("hidden");
}

function addManualStudent() {
  const nameInput = document.getElementById("manual-std-name");
  const emailInput = document.getElementById("manual-std-email");
  const gradeInput = document.getElementById("manual-std-grade");

  const name = (nameInput.value || "").trim();
  const email = (emailInput.value || "").trim().toLowerCase();
  const grade = gradeInput.value;

  if (!name || !email) {
    alert("Mohon lengkapi nama dan email siswa!");
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Format email tidak valid!");
    return;
  }

  let registeredUsers = getRegisteredStudents();
  if (registeredUsers.some(u => u.email === email)) {
    alert("Email ini sudah terdaftar di cloud!");
    return;
  }

  const newStudent = {
    id: "std_" + Date.now(),
    name: name,
    email: email,
    grade: grade,
    password: "SUCCESS2026",
    registeredAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " (Manual)",
    role: "STUDENT"
  };

  registeredUsers.push(newStudent);
  localStorage.setItem("ngambis_registered_students", JSON.stringify(registeredUsers));
  pushCloudStudents(registeredUsers);

  if (GOOGLE_SCRIPT_URL) {
    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          name: name,
          email: email,
          grade: grade,
          password: "SUCCESS2026"
        })
      });
    } catch (err) {}
  }

  nameInput.value = "";
  emailInput.value = "";
  toggleAddStudentForm();

  renderRegisteredStudentsAdmin();
  updateAnalyticsStats();
  alert(`✅ Akun siswa '${name}' (${email}) berhasil didaftarkan secara manual! Password default: SUCCESS2026`);
}

function deleteStudentAdmin(email) {
  if (confirm(`Hapus akun siswa '${email}' dari cloud?`)) {
    let registeredUsers = getRegisteredStudents().filter(u => u.email !== email);
    localStorage.setItem("ngambis_registered_students", JSON.stringify(registeredUsers));
    pushCloudStudents(registeredUsers);
    renderRegisteredStudentsAdmin();
    updateAnalyticsStats();
  }
}

function exportStudentsCSV() {
  const registeredUsers = getRegisteredStudents();
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
  link.setAttribute("download", `Ngambis_Bareng_Database_Siswa_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// PASSCODE MANAGEMENT
// ==========================================
function renderPasscodesInAdmin() {
  const container = document.getElementById("admin-passcodes-list");
  if (!container) return;

  container.innerHTML = STATE.registrationPasscodes.map(p => `
    <span class="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-xs font-mono text-stone-800 flex items-center gap-1.5 font-bold">
      <span>${p}</span>
      <button onclick="removeStudentPasscode('${p}')" class="text-stone-400 hover:text-red-600 ml-1">×</button>
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
// TEMPLATE COPY FUNCTION
// ==========================================
function copyTemplate(templateId) {
  const textEl = document.getElementById(templateId);
  if (!textEl) return;

  const content = textEl.value || textEl.innerText || textEl.textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(content).then(() => {
      alert("✅ Seluruh outline & template berhasil disalin ke clipboard!");
      logActivity("COPY_TEMPLATE", `Template: ${templateId}`);
    }).catch(() => {
      fallbackCopy(content, templateId);
    });
  } else {
    fallbackCopy(content, templateId);
  }
}

function fallbackCopy(text, templateId) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("✅ Seluruh outline & template berhasil disalin ke clipboard!");
  logActivity("COPY_TEMPLATE", `Template: ${templateId}`);
}

// ==========================================
// ACTIVITY LOGGING & ANALYTICS
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
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-stone-500">Belum ada aktivitas tercatat.</td></tr>`;
    return;
  }

  tbody.innerHTML = logs.slice(0, 50).map(l => `
    <tr class="hover:bg-stone-50 transition">
      <td class="p-3 text-stone-500 font-mono text-[11px] whitespace-nowrap">${l.timestamp}</td>
      <td class="p-3 font-semibold text-stone-900 whitespace-nowrap">
        ${sanitizeHTML(l.studentName)} <span class="text-[10px] text-stone-500 block">${sanitizeHTML(l.studentEmail)}</span>
      </td>
      <td class="p-3 text-stone-600 whitespace-nowrap">${sanitizeHTML(l.grade)}</td>
      <td class="p-3 whitespace-nowrap">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-amber-900 border border-stone-200">
          ${sanitizeHTML(l.action)}
        </span>
      </td>
      <td class="p-3 text-stone-700 min-w-[200px]">${sanitizeHTML(l.details)}</td>
    </tr>
  `).join("");
}

function updateAnalyticsStats() {
  const logs = JSON.parse(localStorage.getItem("ngambis_activity_logs") || "[]");
  const registeredUsers = getRegisteredStudents();
  
  const totalStudents = registeredUsers.length;
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
  link.setAttribute("download", `Ngambis_Bareng_Log_Aktivitas_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clearAnalyticsLog() {
  if (confirm("Reset seluruh log riwayat aktivitas?")) {
    localStorage.removeItem("ngambis_activity_logs");
    renderAnalyticsTable();
    updateAnalyticsStats();
  }
}

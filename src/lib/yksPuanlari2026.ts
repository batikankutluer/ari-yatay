/**
 * Gerçek YKS taban puanları (2022-2025) for İTÜ programs.
 *
 * Kaynak: Güncelleme 2026 — tablodaki Taban Puan sütunlarından alındı.
 * "Dolmadı" ve "—" değerleri 'NOTFOUND' olarak işaretlenmiştir.
 *
 * Fakülte adları yatayData.ts'teki adlarla eşleşecek şekilde yazılmıştır.
 * Bölüm adları da yatayData.ts ile birebir aynıdır.
 *
 * `english` alanı yatayData.ts'teki İngilizce yüzdesiyle örtüşür:
 *   • (İngilizce) etiketi olan satır → english: 100
 *   • (İngilizce) etiketi olmayan satır → english: 30
 * Bu sayede aynı bölümün %30 ve %100 versiyonları farklı taban puanlarına
 * sahip olduğunda merge doğru puanı seçer.
 *
 * İSTİSNALAR — kasıtlı olarak bu dosyada YER ALMAYAN programlar:
 *   • Türk Musikisi Devlet Konservatuvarı (Ses Eğitimi, Bestecilik,
 *     Müzik Teknolojisi, Müzikoloji, Türk Halk Oyunları)
 *   → Bu programlar YKS puanıyla değil, özel yetenek sınavıyla öğrenci
 *     aldığından taban puan yoktur. mergeYksYatay her zaman 'NOTFOUND'
 *     (Eksik Veri) döner — bu beklenen ve doğru davranıştır.
 */

export type Year = 2022 | 2023 | 2024 | 2025;

export type YearScores = Partial<Record<Year, number | 'NOTFOUND'>>;

export interface ProgramYksEntry {
  readonly program: string;
  readonly faculty?: string;
  readonly isKktc?: boolean;
  /**
   * yatayData.ts'teki İngilizce yüzdesiyle eşleşir.
   * 100 → "(İngilizce)" etiketli program,
   * 30  → etiketsiz (Türkçe ağırlıklı) program.
   * Tanımlanmamışsa her iki versiyona da fallback olarak uygulanır.
   */
  readonly english?: 30 | 100;
  readonly scores: YearScores;
}

export const yksPuanlari2026: ReadonlyArray<ProgramYksEntry> = [

  // ─── Bilgisayar ve Bilişim Fakültesi ────────────────────────────────────────
  // (yatayData: sadece english: 100 versiyonu var)
  {
    program: 'Bilgisayar Mühendisliği',
    faculty: 'Bilgisayar ve Bilişim Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 533.13588, 2024: 536.30770, 2023: 542.06013, 2022: 539.22704 },
  },
  {
    program: 'Yapay Zeka ve Veri Mühendisliği',
    faculty: 'Bilgisayar ve Bilişim Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 529.88486, 2024: 533.26505, 2023: 539.20241, 2022: 536.37088 },
  },
  // Siber Güvenlik yatayData'da henüz yok; ileride eklenirse 100 olacak
  {
    program: 'Siber Güvenlik Mühendisliği',
    faculty: 'Bilgisayar ve Bilişim Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 518.51238, 2024: 515.79972, 2023: 'NOTFOUND', 2022: 'NOTFOUND' },
  },

  // ─── Elektrik - Elektronik Fakültesi ────────────────────────────────────────
  // Her iki versiyon ayrı ayrı:
  {
    program: 'Elektronik ve Haberleşme Mühendisliği',
    faculty: 'Elektrik - Elektronik Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 528.92344, 2024: 529.41707, 2023: 535.18460, 2022: 532.11871 },
  },
  {
    program: 'Elektronik ve Haberleşme Mühendisliği',
    faculty: 'Elektrik - Elektronik Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 525.13010, 2024: 522.83058, 2023: 530.13833, 2022: 525.09606 },
  },
  {
    program: 'Elektrik Mühendisliği',
    faculty: 'Elektrik - Elektronik Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 512.96624, 2024: 510.86388, 2023: 520.68008, 2022: 512.58077 },
  },
  {
    program: 'Elektrik Mühendisliği',
    faculty: 'Elektrik - Elektronik Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 510.72492, 2024: 507.81846, 2023: 514.73375, 2022: 502.58555 },
  },
  {
    program: 'Kontrol ve Otomasyon Mühendisliği',
    faculty: 'Elektrik - Elektronik Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 518.52409, 2024: 'NOTFOUND', 2023: 'NOTFOUND', 2022: 'NOTFOUND' },
  },
  {
    program: 'Kontrol ve Otomasyon Mühendisliği',
    faculty: 'Elektrik - Elektronik Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 517.75196, 2024: 'NOTFOUND', 2023: 'NOTFOUND', 2022: 'NOTFOUND' },
  },

  // ─── Uçak ve Uzay Bilimleri Fakültesi ───────────────────────────────────────
  {
    program: 'Uçak Mühendisliği',
    faculty: 'Uçak ve Uzay Bilimleri Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 528.30902, 2024: 526.27204, 2023: 531.59839, 2022: 524.25167 },
  },
  {
    program: 'Uzay Mühendisliği',
    faculty: 'Uçak ve Uzay Bilimleri Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 520.37334, 2024: 518.39828, 2023: 525.34128, 2022: 517.40975 },
  },
  {
    program: 'İklim Bilimi ve Meteoroloji Mühendisliği',
    faculty: 'Uçak ve Uzay Bilimleri Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 438.78269, 2024: 417.86283, 2023: 432.85539, 2022: 418.51153 },
  },

  // ─── Fen - Edebiyat Fakültesi ────────────────────────────────────────────────
  {
    program: 'Matematik Mühendisliği',
    faculty: 'Fen - Edebiyat Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 522.35951, 2024: 517.55503, 2023: 522.96778, 2022: 511.66215 },
  },
  {
    program: 'Fizik Mühendisliği',
    faculty: 'Fen - Edebiyat Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 492.48652, 2024: 483.12088, 2023: 494.36930, 2022: 477.85290 },
  },
  {
    program: 'Kimya',
    faculty: 'Fen - Edebiyat Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 451.03534, 2024: 437.94028, 2023: 460.80478, 2022: 450.47952 },
  },
  {
    program: 'Moleküler Biyoloji ve Genetik',
    faculty: 'Fen - Edebiyat Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 471.79154, 2024: 479.58318, 2023: 500.47543, 2022: 496.13795 },
  },

  // ─── İşletme Fakültesi ───────────────────────────────────────────────────────
  {
    program: 'Endüstri Mühendisliği',
    faculty: 'İşletme Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 521.49444, 2024: 524.32042, 2023: 534.14396, 2022: 528.81826 },
  },
  {
    program: 'Endüstri Mühendisliği',
    faculty: 'İşletme Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 519.74890, 2024: 519.84288, 2023: 529.98076, 2022: 523.74226 },
  },
  {
    program: 'İşletme Mühendisliği',
    faculty: 'İşletme Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 514.08138, 2024: 513.52841, 2023: 523.32130, 2022: 514.34252 },
  },
  {
    program: 'Veri Bilimi ve Analitiği',
    faculty: 'İşletme Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 508.71628, 2024: 504.33451, 2023: 'NOTFOUND', 2022: 'NOTFOUND' },
  },
  {
    program: 'Ekonomi',
    faculty: 'İşletme Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 471.36296, 2024: 475.94136, 2023: 487.49685, 2022: 480.66359 },
  },

  // ─── Makina Fakültesi ────────────────────────────────────────────────────────
  {
    program: 'Makina Mühendisliği',
    faculty: 'Makina Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 513.03357, 2024: 508.63864, 2023: 515.67219, 2022: 507.30000 },
  },

  // ─── İnşaat Fakültesi ────────────────────────────────────────────────────────
  {
    program: 'İnşaat Mühendisliği',
    faculty: 'İnşaat Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 470.02755, 2024: 460.25531, 2023: 476.08534, 2022: 467.11374 },
  },
  {
    program: 'İnşaat Mühendisliği',
    faculty: 'İnşaat Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 454.61781, 2024: 437.87862, 2023: 452.46099, 2022: 440.81624 },
  },
  {
    program: 'Çevre Mühendisliği',
    faculty: 'İnşaat Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 447.68379, 2024: 430.28816, 2023: 449.22366, 2022: 439.04770 },
  },
  {
    program: 'Çevre Mühendisliği',
    faculty: 'İnşaat Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 442.46797, 2024: 422.30497, 2023: 441.72178, 2022: 432.58718 },
  },
  {
    program: 'Harita Mühendisliği',
    faculty: 'İnşaat Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 424.08021, 2024: 400.56837, 2023: 'NOTFOUND', 2022: 'NOTFOUND' },
  },
  {
    program: 'Harita Mühendisliği',
    faculty: 'İnşaat Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 415.76406, 2024: 390.02920, 2023: 'NOTFOUND', 2022: 'NOTFOUND' },
  },

  // ─── Mimarlık Fakültesi ──────────────────────────────────────────────────────
  {
    program: 'Mimarlık',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 462.12582, 2024: 462.62975, 2023: 485.23127, 2022: 485.78822 },
  },
  {
    program: 'Mimarlık',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 454.83317, 2024: 448.09306, 2023: 472.04742, 2022: 469.75174 },
  },
  {
    program: 'Endüstriyel Tasarım',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 453.63751, 2024: 443.27708, 2023: 466.90285, 2022: 463.51345 },
  },
  {
    program: 'İç Mimarlık',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 425.01131, 2024: 408.94598, 2023: 436.81096, 2022: 435.03197 },
  },
  {
    program: 'Peyzaj Mimarlığı',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 391.58095, 2024: 375.38029, 2023: 401.10923, 2022: 389.34062 },
  },
  {
    program: 'Şehir ve Bölge Planlaması',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 392.13322, 2024: 374.09303, 2023: 398.11504, 2022: 386.00559 },
  },
  {
    program: 'Şehir ve Bölge Planlaması',
    faculty: 'Mimarlık Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 388.53446, 2024: 368.06968, 2023: 388.55661, 2022: 370.76367 },
  },

  // ─── Maden Fakültesi ─────────────────────────────────────────────────────────
  {
    program: 'Maden Mühendisliği',
    faculty: 'Maden Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 431.56899, 2024: 408.27262, 2023: 422.62840, 2022: 408.54702 },
  },
  {
    program: 'Petrol ve Doğalgaz Mühendisliği',
    faculty: 'Maden Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 466.87039, 2024: 445.20194, 2023: 451.07706, 2022: 428.21417 },
  },
  {
    program: 'Cevher Hazırlama Mühendisliği',
    faculty: 'Maden Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 419.17729, 2024: 392.79571, 2023: 398.68572, 2022: 367.60686 },
  },
  {
    program: 'Jeoloji Mühendisliği',
    faculty: 'Maden Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 410.10025, 2024: 392.16172, 2023: 411.51038, 2022: 392.14235 },
  },
  {
    program: 'Jeofizik Mühendisliği',
    faculty: 'Maden Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 408.65198, 2024: 389.72976, 2023: 401.98930, 2022: 378.11435 },
  },

  // ─── Kimya - Metalurji Fakültesi ─────────────────────────────────────────────
  {
    program: 'Metalurji ve Malzeme Mühendisliği',
    faculty: 'Kimya - Metalurji Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 498.72943, 2024: 495.02299, 2023: 505.75196, 2022: 490.83578 },
  },
  {
    program: 'Metalurji ve Malzeme Mühendisliği',
    faculty: 'Kimya - Metalurji Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 493.98586, 2024: 490.58027, 2023: 497.81029, 2022: 482.01974 },
  },
  {
    program: 'Kimya Mühendisliği',
    faculty: 'Kimya - Metalurji Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 496.82307, 2024: 492.44260, 2023: 501.96303, 2022: 487.50891 },
  },
  {
    program: 'Gıda Mühendisliği',
    faculty: 'Kimya - Metalurji Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 447.32016, 2024: 432.43606, 2023: 457.60725, 2022: 445.95290 },
  },

  // ─── Gemi İnşaatı ve Deniz Bilimleri Fakültesi ───────────────────────────────
  {
    program: 'Gemi İnşaatı ve Gemi Makineleri Mühendisliği',
    faculty: 'Gemi İnşaatı ve Deniz Bilimleri Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 495.88219, 2024: 486.45833, 2023: 491.43774, 2022: 477.81642 },
  },
  {
    program: 'Gemi ve Deniz Teknolojisi Mühendisliği',
    faculty: 'Gemi İnşaatı ve Deniz Bilimleri Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 486.14362, 2024: 463.62883, 2023: 454.51600, 2022: 430.87314 },
  },

  // ─── Denizcilik Fakültesi ────────────────────────────────────────────────────
  // Not: yatayData.ts'te "Gemi Makinaları" (eski yazım), tabloda "Gemi Makineleri"
  {
    program: 'Gemi Makinaları İşletme Mühendisliği',
    faculty: 'Denizcilik Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 457.66611, 2024: 443.89739, 2023: 459.35746, 2022: 444.92616 },
  },
  {
    program: 'Deniz Ulaştırma İşletme Mühendisliği',
    faculty: 'Denizcilik Fakültesi',
    isKktc: false,
    english: 30,
    scores: { 2025: 452.99272, 2024: 436.15913, 2023: 455.40168, 2022: 442.32802 },
  },

  // ─── Tekstil Teknolojileri ve Tasarımı Fakültesi ─────────────────────────────
  {
    program: 'Tekstil Mühendisliği',
    faculty: 'Tekstil Teknolojileri ve Tasarımı Fakültesi',
    isKktc: false,
    english: 100,
    scores: { 2025: 445.23880, 2024: 447.81947, 2023: 474.33188, 2022: 464.02787 },
  },

  // ─── İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri (isKktc: true) ──────────────────
  // Tüm KKTC programları english: 100
  {
    program: 'İTÜ-KKTC Bilgisayar Mühendisliği',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 489.31128, 2024: 409.14363, 2023: 522.63536, 2022: 507.86648 },
  },
  {
    program: 'İTÜ-KKTC Elektrik Elektronik Mühendisliği',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 486.39197, 2024: 372.12818, 2023: 503.81243, 2022: 477.02586 },
  },
  {
    program: 'İTÜ-KKTC Endüstri Mühendisliği',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 484.77135, 2024: 368.10953, 2023: 510.95507, 2022: 481.12570 },
  },
  {
    program: 'İTÜ-KKTC Gemi İnşaatı ve Gemi Makineleri Mühendisliği',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 458.39030, 2024: 422.08582, 2023: 447.65836, 2022: 409.17171 },
  },
  {
    program: 'İTÜ-KKTC Gemi Makinaları İşletme Mühendisliği',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 446.36539, 2024: 419.78657, 2023: 436.90154, 2022: 410.83183 },
  },
  {
    program: 'İTÜ-KKTC Deniz Ulaştırma İşletme Mühendisliği',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 440.59172, 2024: 420.04995, 2023: 439.20000, 2022: 418.27334 },
  },
  {
    program: 'İTÜ-KKTC Mimarlık',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 425.48413, 2024: 376.35459, 2023: 464.37957, 2022: 427.21278 },
  },
  {
    program: 'İTÜ-KKTC İç Mimarlık',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 413.75743, 2024: 320.59100, 2023: 427.72564, 2022: 359.92086 },
  },
  {
    program: 'İTÜ-KKTC Ekonomi ve Finans',
    faculty: 'İTÜ-KKTC Eğitim-Araştırma Yerleşkeleri',
    isKktc: true,
    english: 100,
    scores: { 2025: 405.58086, 2024: 320.14101, 2023: 410.72441, 2022: 374.33340 },
  },
];

export default yksPuanlari2026;

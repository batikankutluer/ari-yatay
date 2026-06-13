/**
 * Structured YKS puanları (2022-2025) for İTÜ programs.
 *
 * This file is a typed scaffold that maps program names to their annual
 * YKS yerleştirme puanları. I did not modify `yatayData.ts` as requested.
 *
 * NOTE: automatic scraping of the site can be implemented on request. For now
 * entries are present and ready to be filled; missing values are represented
 * with the string literal 'NOTFOUND'.
 */

export type Year = 2022 | 2023 | 2024 | 2025;

export type YearScores = Partial<Record<Year, number | 'NOTFOUND'>>;

export interface ProgramYksEntry {
  readonly program: string;
  readonly faculty?: string;
  readonly isKktc?: boolean;
  readonly scores: YearScores; // YKS yerleştirme puanları (numeric) or 'NOTFOUND'
}

export const yksPuanlari2026: ReadonlyArray<ProgramYksEntry> = [
  // Example scaffolded entries (program names match demo/yatayData.ts programs)
  { program: 'İnşaat Mühendisliği', faculty: 'İnşaat Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Çevre Mühendisliği', faculty: 'İnşaat Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Harita Mühendisliği', faculty: 'İnşaat Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'Mimarlık', faculty: 'Mimarlık Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Şehir ve Bölge Planlaması', faculty: 'Mimarlık Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Endüstriyel Tasarım', faculty: 'Mimarlık Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'İç Mimarlık', faculty: 'Mimarlık Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Peyzaj Mimarlığı', faculty: 'Mimarlık Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'Makina Mühendisliği', faculty: 'Makina Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'Elektronik ve Haberleşme Mühendisliği', faculty: 'Elektrik - Elektronik Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Elektrik Mühendisliği', faculty: 'Elektrik - Elektronik Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Kontrol ve Otomasyon Mühendisliği', faculty: 'Elektrik - Elektronik Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'Maden Mühendisliği', faculty: 'Maden Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Jeoloji Mühendisliği', faculty: 'Maden Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'Kimya Mühendisliği', faculty: 'Kimya - Metalurji Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'İşletme Mühendisliği', faculty: 'İşletme Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Endüstri Mühendisliği', faculty: 'İşletme Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  { program: 'Bilgisayar Mühendisliği', faculty: 'Bilgisayar ve Bilişim Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'Yapay Zeka ve Veri Mühendisliği', faculty: 'Bilgisayar ve Bilişim Fakültesi', isKktc: false, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },

  // ITU-KKTC entries (marked isKktc: true)
  { program: 'İTÜ-KKTC Bilgisayar Mühendisliği', faculty: 'İTÜ-KKTC', isKktc: true, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
  { program: 'İTÜ-KKTC Mimarlık', faculty: 'İTÜ-KKTC', isKktc: true, scores: { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } },
];

export default yksPuanlari2026;

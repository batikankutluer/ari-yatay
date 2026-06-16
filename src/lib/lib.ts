import type { Year as YksEntryYear } from './yksPuanlari2026';

export type { Year as YksEntryYear } from './yksPuanlari2026';

/** Üniversiteye giriş yılı seçenekleri (yeniden eskiye). */
export const YKS_ENTRY_YEARS: ReadonlyArray<YksEntryYear> = [2025, 2024, 2023, 2022];

export function isYksEntryYear(value: number): value is YksEntryYear {
  return (YKS_ENTRY_YEARS as ReadonlyArray<number>).includes(value);
}

export interface Agno4Calculation {
  /** 0–4 aralığına kırpılmış değer */
  readonly clamped: number;
  /** Kırpılmamış ham AGNO (4.0 üstü olabilir) */
  readonly raw: number;
}

/**
 * Ham YKS puanı ve İTÜ yatay geçiş değerlendirme puanına (0–1) göre
 * 4.0 ölçeğindeki AGNO'yu hesaplar.
 *
 * Resmi formül (İTÜ yönetmeliği):
 *   Değerlendirme = (adayYks / programYksTaban) × 0.40 + (agno / 100) × 0.60
 *
 * Burada GPA için ters çözüm:
 *   yksNorm  = adayYks / programYksTaban
 *   agnoNorm = (yatay - yksNorm × 0.4) / 0.6
 *   agno4    = agnoNorm × 4
 *
 * @param yks            - Adayın ham YKS puanı (ör. 500)
 * @param yatay          - Bölümün yatay değerlendirme taban/tavan puanı (0–1 aralığı, yatayData.ts'ten)
 * @param programYksTaban - Bölümün adayın sınava girdiği yıldaki YKS taban puanı (yksPuanlari2026.ts'ten)
 *
 * Not: YKS düştükçe aynı yatay puanı için gereken GPA artar — formülün doğal sonucu.
 */
export function calculateAgno4FromYksAndYatay(
  yks: number,
  yatay: number,
  programYksTaban: number,
): Agno4Calculation {
  if (typeof yks !== 'number' || !Number.isFinite(yks)) {
    throw new TypeError('`yks` must be a finite number');
  }
  if (typeof yatay !== 'number' || !Number.isFinite(yatay)) {
    throw new TypeError('`yatay` must be a finite number');
  }
  if (typeof programYksTaban !== 'number' || !Number.isFinite(programYksTaban) || programYksTaban <= 0) {
    throw new TypeError('`programYksTaban` must be a finite number greater than 0');
  }

  const yksNorm = yks / programYksTaban;
  const agnoNorm = (yatay - yksNorm * 0.4) / 0.6;
  const raw = Math.round(agnoNorm * 4 * 1000) / 1000;
  const clamped = Math.round(Math.max(0, Math.min(4, raw)) * 1000) / 1000;

  return { raw, clamped };
}

/** UI için AGNO metni: 4.0 üstü → "4.0>", altı → 0.00 formatı */
export function formatAgno4Display(result: Agno4Calculation): string {
  if (result.raw > 4) {
    return '4.0>';
  }

  return result.clamped.toFixed(2);
}

export default calculateAgno4FromYksAndYatay;

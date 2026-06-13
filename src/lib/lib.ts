import type { Year as YksEntryYear } from './yksPuanlari2026';

export type { Year as YksEntryYear } from './yksPuanlari2026';

/** Üniversiteye giriş yılı seçenekleri (yeniden eskiye). */
export const YKS_ENTRY_YEARS: ReadonlyArray<YksEntryYear> = [2025, 2024, 2023, 2022];

/**
 * ÖSYM yerleştirme dönemindeki sayısal tavan puanlar.
 * YKS normalizasyonu: yksNorm = hamPuan / getYksMaxForYear(girisYili)
 */
export const YKS_MAX_BY_YEAR: Record<YksEntryYear, number> = {
  2022: 551.41,
  2023: 555.78,
  2024: 560.85,
  2025: 561.13,
};

/** Geriye dönük uyumluluk: 2024 tavanı */
export const YKS_MAX_SCORE = YKS_MAX_BY_YEAR[2024];

export function getYksMaxForYear(year: YksEntryYear): number {
  return YKS_MAX_BY_YEAR[year];
}

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
 * Matematik (normalize 0–1 ölçeği):
 *   yatay = yksNorm * 0.4 + agnoNorm * 0.6
 * => agnoNorm = (yatay - yksNorm * 0.4) / 0.6
 * => agno4 = agnoNorm * 4
 *
 * Not: YKS düştükçe aynı yatay puanı için gereken GPA artar — formülün doğal sonucu.
 */
export function calculateAgno4FromYksAndYatay(
  yks: number,
  yatay: number,
  maxYks: number = YKS_MAX_SCORE,
): Agno4Calculation {
  if (typeof yks !== 'number' || !Number.isFinite(yks)) {
    throw new TypeError('`yks` must be a finite number');
  }
  if (typeof yatay !== 'number' || !Number.isFinite(yatay)) {
    throw new TypeError('`yatay` must be a finite number');
  }
  if (typeof maxYks !== 'number' || !Number.isFinite(maxYks) || maxYks <= 0) {
    throw new TypeError('`maxYks` must be a finite number greater than 0');
  }

  const yksNorm = yks / maxYks;
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

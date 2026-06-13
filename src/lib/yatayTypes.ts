/**
 * Strict types for İTÜ yatay geçiş tablosu.
 * Kaynak: yatay-taban-tavan-202610.php — yerleşen=0 satırlarında tavan/taban "-" olur.
 */

/** 0..1 aralığında değerlendirme puanı (ör. 0.87499) */
export type ScoreFraction = number;

export type EnglishPercent = 0 | 30 | 100;

export type Semester = `${number}.Yarıyıl`;

/** Sitede "-" görünmesinin tip güvenli açıklaması */
export type MissingScoreReason = 'no-placement';

export type YatayScoresWithPlacement = {
  readonly hasScores: true;
  readonly maxScore: ScoreFraction;
  readonly minScore: ScoreFraction;
};

export type YatayScoresWithoutPlacement = {
  readonly hasScores: false;
  readonly missingScoreReason: MissingScoreReason;
};

export type YatayScores = YatayScoresWithPlacement | YatayScoresWithoutPlacement;

export interface ITUBolum {
  readonly program: string;
  readonly english: EnglishPercent;
  readonly isKktc: boolean;
}

export type YatayEntryCommon = ITUBolum & {
  readonly semester: Semester;
  readonly quota: number;
  readonly note?: string;
};

export type YatayEntryWithPlacement = YatayEntryCommon & {
  readonly placed: number;
  readonly scores: YatayScoresWithPlacement;
};

export type YatayEntryWithoutPlacement = YatayEntryCommon & {
  readonly placed: 0;
  readonly scores: YatayScoresWithoutPlacement;
};

export type YatayEntry = YatayEntryWithPlacement | YatayEntryWithoutPlacement;

export interface Faculty {
  readonly name: string;
  readonly entries: ReadonlyArray<YatayEntry>;
}

type WithScoresInput = YatayEntryCommon & {
  readonly placed: number;
  readonly maxScore: ScoreFraction;
  readonly minScore: ScoreFraction;
};

type WithoutScoresInput = YatayEntryCommon & {
  readonly placed: 0;
};

export function withScores(entry: WithScoresInput): YatayEntryWithPlacement {
  if (entry.placed <= 0) {
    throw new Error(`withScores: placed must be > 0 (got ${entry.placed} for ${entry.program})`);
  }

  const { maxScore, minScore, ...rest } = entry;

  return {
    ...rest,
    scores: { hasScores: true, maxScore, minScore },
  };
}

export function withoutScores(
  entry: WithoutScoresInput,
  reason: MissingScoreReason = 'no-placement',
): YatayEntryWithoutPlacement {
  if (entry.placed !== 0) {
    throw new Error(`withoutScores: placed must be 0 (got ${entry.placed} for ${entry.program})`);
  }

  return {
    ...entry,
    scores: { hasScores: false, missingScoreReason: reason },
  };
}

export function faculty(name: string, entries: ReadonlyArray<YatayEntry>): Faculty {
  return { name, entries };
}

export function getMaxScore(entry: YatayEntry): ScoreFraction | undefined {
  return entry.scores.hasScores ? entry.scores.maxScore : undefined;
}

export function getMinScore(entry: YatayEntry): ScoreFraction | undefined {
  return entry.scores.hasScores ? entry.scores.minScore : undefined;
}

export function formatProgramLabel(entry: Pick<YatayEntry, 'program' | 'english'>): string {
  if (entry.english === 0) {
    return entry.program;
  }

  return `${entry.program} (% ${entry.english} İngilizce)`;
}

export function assertValidYatayEntry(entry: YatayEntry): void {
  if (entry.placed === 0) {
    if (entry.scores.hasScores) {
      throw new Error(`Entry ${entry.program} ${entry.semester}: placed=0 but scores are present`);
    }
    if (entry.scores.missingScoreReason !== 'no-placement') {
      throw new Error(`Entry ${entry.program} ${entry.semester}: unknown missing score reason`);
    }
    return;
  }

  if (!entry.scores.hasScores) {
    throw new Error(
      `Entry ${entry.program} ${entry.semester}: placed=${entry.placed} but scores are missing`,
    );
  }

  if (entry.placed > entry.quota) {
    throw new Error(
      `Entry ${entry.program} ${entry.semester}: placed (${entry.placed}) exceeds quota (${entry.quota})`,
    );
  }
}

export function assertValidYatayFaculties(faculties: ReadonlyArray<Faculty>): void {
  for (const group of faculties) {
    for (const entry of group.entries) {
      assertValidYatayEntry(entry);
    }
  }
}

/** Kullanım kolaylığı için opsiyonel sınıf implementasyonu */
export class ITUBolumClass implements ITUBolum {
  public readonly program: string;
  public readonly english: EnglishPercent;
  public readonly isKktc: boolean;

  constructor(program: string, english: EnglishPercent, isKktc: boolean = false) {
    this.program = program;
    this.english = english;
    this.isKktc = isKktc;
  }
}

import {
  type Faculty,
  type YatayEntry,
  yatayFaculties2025,
} from './yatayData';
import {
  type ProgramYksEntry,
  type Year as YksYear,
  yksPuanlari2026,
} from './yksPuanlari2026';

export type MissingScore = 'NOTFOUND';
export type { Year as YksYear } from './yksPuanlari2026';

export type CompleteYearScores = Record<YksYear, number | MissingScore>;

export type MergedYatayEntry = YatayEntry & {
  readonly yksScores: CompleteYearScores;
};

export interface MergedFaculty {
  readonly name: string;
  readonly entries: ReadonlyArray<MergedYatayEntry>;
}

const years: ReadonlyArray<YksYear> = [2022, 2023, 2024, 2025];

function normalizeText(value: string): string {
  return value.normalize('NFKC').trim().replace(/\s+/g, ' ');
}

function makeKey(
  faculty: string | undefined,
  program: string,
  isKktc: boolean,
  english?: number,
): string {
  const parts = [
    faculty ? normalizeText(faculty) : '',
    normalizeText(program),
    String(isKktc),
  ];
  if (english !== undefined) parts.push(String(english));
  return parts.join('::');
}

function completeScores(scores: ProgramYksEntry['scores']): CompleteYearScores {
  return years.reduce((complete, year) => {
    complete[year] = scores[year] ?? 'NOTFOUND';
    return complete;
  }, { 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } as CompleteYearScores);
}

function buildLookup(entries: ReadonlyArray<ProgramYksEntry>): Map<string, CompleteYearScores> {
  const lookup = new Map<string, CompleteYearScores>();

  for (const entry of entries) {
    const normalizedScores = completeScores(entry.scores);
    const isKktc = entry.isKktc ?? false;

    if (entry.english !== undefined) {
      // English-specific keys (30% or 100%)
      lookup.set(makeKey(entry.faculty, entry.program, isKktc, entry.english), normalizedScores);
      lookup.set(makeKey(undefined, entry.program, isKktc, entry.english), normalizedScores);
    } else {
      // Generic fallback keys (match any english level)
      lookup.set(makeKey(entry.faculty, entry.program, isKktc), normalizedScores);
      lookup.set(makeKey(undefined, entry.program, isKktc), normalizedScores);
    }
  }

  return lookup;
}

export function mergeYatayWithYks(
  faculties: ReadonlyArray<Faculty> = yatayFaculties2025,
  yksEntries: ReadonlyArray<ProgramYksEntry> = yksPuanlari2026,
): ReadonlyArray<MergedFaculty> {
  const lookup = buildLookup(yksEntries);

  return faculties.map((faculty) => ({
    name: faculty.name,
    entries: faculty.entries.map((entry) => {
      const scores =
        // Most specific: faculty + program + isKktc + english
        lookup.get(makeKey(faculty.name, entry.program, entry.isKktc, entry.english)) ??
        lookup.get(makeKey(undefined, entry.program, entry.isKktc, entry.english)) ??
        // Fallback: without english (for entries not split by english level)
        lookup.get(makeKey(faculty.name, entry.program, entry.isKktc)) ??
        lookup.get(makeKey(undefined, entry.program, entry.isKktc)) ??
        ({ 2022: 'NOTFOUND', 2023: 'NOTFOUND', 2024: 'NOTFOUND', 2025: 'NOTFOUND' } satisfies CompleteYearScores);

      return {
        ...entry,
        yksScores: scores,
      };
    }),
  }));
}

export const mergedYatayYks2026 = mergeYatayWithYks();

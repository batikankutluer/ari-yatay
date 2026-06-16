"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  calculateAgno4FromYksAndYatay,
  formatAgno4Display,
  isYksEntryYear,
  YKS_ENTRY_YEARS,
  type YksEntryYear,
} from "@/lib/lib";
import { getMaxScore, getMinScore } from "@/lib/yatayData";
import {
  mergedYatayYks2026,
  type CompleteYearScores,
  type MissingScore,
  type YksYear,
} from "@/lib/mergeYksYatay";
import "./DemoPage.css";

type ScoreType = "sayisal" | "esit-agirlik";

/* ── Yardımcı formatters ─────────────────────────────────────────── */

function formatGpa(
  yks: number,
  yatayScore: number | undefined,
  programYksTaban: number | MissingScore,
): string {
  if (!Number.isFinite(yks)) return "-";
  if (programYksTaban === "NOTFOUND") return "—";
  if (yatayScore === undefined) return "-";
  return formatAgno4Display(
    calculateAgno4FromYksAndYatay(yks, yatayScore, programYksTaban),
  );
}

function getGpaNumeric(
  yks: number,
  yatayScore: number | undefined,
  programYksTaban: number | MissingScore,
): number {
  if (
    yatayScore === undefined ||
    !Number.isFinite(yks) ||
    programYksTaban === "NOTFOUND"
  ) {
    return -1;
  }
  return calculateAgno4FromYksAndYatay(yks, yatayScore, programYksTaban).raw;
}

/* ── YKS Modal tipi ──────────────────────────────────────────────── */

type YksModalEntry = {
  programName: string;
  facultyName: string;
  yksScores: CompleteYearScores;
  maxYatay: number | undefined;
  minYatay: number | undefined;
};

/* ── YKS Info Modal ──────────────────────────────────────────────── */

function YksInfoModal({
  entry,
  yks,
  year,
  onClose,
}: {
  entry: YksModalEntry;
  yks: number;
  year: YksEntryYear;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const taban = entry.yksScores[year as YksYear];
  const hasScore = typeof taban === "number";
  const yksValid = Number.isFinite(yks);
  const yksNorm = hasScore && yksValid ? yks / taban : null;

  const maxCalc =
    hasScore && yksValid && entry.maxYatay !== undefined
      ? calculateAgno4FromYksAndYatay(yks, entry.maxYatay, taban)
      : null;
  const minCalc =
    hasScore && yksValid && entry.minYatay !== undefined
      ? calculateAgno4FromYksAndYatay(yks, entry.minYatay, taban)
      : null;

  /** Sayıyı Türkçe ondalık virgüllü stringe çevirir */
  const fmt = (n: number, d = 5) => n.toFixed(d).replace(".", ",");

  return (
    <div
      className="yks-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.programName} YKS bilgisi`}
    >
      <div className="yks-modal" onClick={(e) => e.stopPropagation()}>
        {/* ── Başlık ── */}
        <div className="yks-modal-header">
          <div className="yks-modal-header-text">
            <p className="yks-modal-faculty">{entry.facultyName}</p>
            <h3 className="yks-modal-title">{entry.programName}</h3>
          </div>
          <button className="yks-modal-close" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
        </div>

        <div className="yks-modal-body">
          {/* ── YKS Taban Puanları tablosu ── */}
          <div className="yks-modal-section">
            <h4 className="yks-modal-section-title">YKS Taban Puanları</h4>
            <table className="yks-scores-table">
              <thead>
                <tr>
                  <th>Yıl</th>
                  <th>Taban Puan</th>
                </tr>
              </thead>
              <tbody>
                {([2025, 2024, 2023, 2022] as YksYear[]).map((y) => {
                  const s = entry.yksScores[y];
                  const isSelected = y === year;
                  return (
                    <tr key={y} className={isSelected ? "yks-year-selected" : ""}>
                      <td>
                        {y}
                        {isSelected && <span className="yks-year-tag">seçili</span>}
                      </td>
                      <td>
                        {s === "NOTFOUND" ? (
                          <span className="yks-notfound">—</span>
                        ) : (
                          s?.toFixed(5).replace(".", ",")
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Hesaplama ── */}
          <div className="yks-modal-section">
            <h4 className="yks-modal-section-title">
              Hesaplama · {year} · YKS: {yksValid ? yks : "—"}
            </h4>

            <div className="yks-formula-box">
                {/* ── İTÜ Formülü: değerler yerinde ── */}
                <div className="yks-formula-display">
                  <span className="yks-fd-label">Değerlendirme Puanı</span>
                  <span className="yks-fd-eq"> = </span>
                  <span className="yks-fd-frac">
                    <span className="yks-fd-num yks-fd-val">
                      {yksValid ? yks : "YKS"}
                    </span>
                    <span className="yks-fd-bar" />
                    <span className="yks-fd-den yks-fd-val">
                      {hasScore ? fmt(taban) : "Taban"}
                    </span>
                  </span>
                  <span className="yks-fd-coef"> × 0,40 </span>
                  <span className="yks-fd-plus">+</span>
                  <span className="yks-fd-frac">
                    <span className="yks-fd-num">AGNO</span>
                    <span className="yks-fd-bar" />
                    <span className="yks-fd-den">100</span>
                  </span>
                  <span className="yks-fd-coef"> × 0,60</span>
                </div>

                {/* ── Sonuçlar ── */}
                {!hasScore ? (
                  <p className="yks-formula-missing">
                    {year} yılı için YKS taban puan verisi mevcut değil.
                  </p>
                ) : !yksValid ? (
                  <p className="yks-formula-missing">
                    Hesaplama için üstteki forma bir YKS puanı girin.
                  </p>
                ) : (maxCalc !== null || minCalc !== null) ? (
                  <>
                    <div className="yks-formula-rule" />

                    {maxCalc !== null && entry.maxYatay !== undefined && (() => {
                      const agnoNorm = (entry.maxYatay - yksNorm! * 0.4) / 0.6;
                      return (
                        <div className="yks-case yks-case--max">
                          <div className="yks-case-head">
                            <span className="yks-case-badge">Tavan GPA</span>
                            <span className="yks-case-sub">Değerlendirme = {fmt(entry.maxYatay)}</span>
                          </div>
                          <div className="yks-case-steps">
                            <div className="yks-step">
                              {fmt(entry.maxYatay)} = ({yks} / {fmt(taban)}) × 0,40 + (AGNO / 100) × 0,60
                            </div>
                            <div className="yks-step">
                              AGNO / 100 = ({fmt(entry.maxYatay)} − {fmt(yksNorm!)} × 0,40) / 0,60 ={" "}
                              <span className="yks-step-val">{fmt(agnoNorm)}</span>
                            </div>
                            <div className="yks-step yks-step--result">
                              AGNO = {fmt(agnoNorm)} × 4 ={" "}
                              <span className="yks-step-gpa">{formatAgno4Display(maxCalc)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {minCalc !== null && entry.minYatay !== undefined && (() => {
                      const agnoNorm = (entry.minYatay - yksNorm! * 0.4) / 0.6;
                      return (
                        <div className="yks-case yks-case--min">
                          <div className="yks-case-head">
                            <span className="yks-case-badge">Taban GPA</span>
                            <span className="yks-case-sub">Değerlendirme = {fmt(entry.minYatay)}</span>
                          </div>
                          <div className="yks-case-steps">
                            <div className="yks-step">
                              {fmt(entry.minYatay)} = ({yks} / {fmt(taban)}) × 0,40 + (AGNO / 100) × 0,60
                            </div>
                            <div className="yks-step">
                              AGNO / 100 = ({fmt(entry.minYatay)} − {fmt(yksNorm!)} × 0,40) / 0,60 ={" "}
                              <span className="yks-step-val">{fmt(agnoNorm)}</span>
                            </div>
                            <div className="yks-step yks-step--result">
                              AGNO = {fmt(agnoNorm)} × 4 ={" "}
                              <span className="yks-step-gpa">{formatAgno4Display(minCalc)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                ) : null}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ── Ana sayfa ───────────────────────────────────────────────────── */

export default function DemoPage() {
  const [score, setScore] = useState("500");
  const [year, setYear] = useState<YksEntryYear>(2025);
  const [scoreType, setScoreType] = useState<ScoreType>("sayisal");
  const [showResults, setShowResults] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: "maxGpa" | "minGpa" | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "desc" });
  const [semesterFilter, setSemesterFilter] = useState<"3" | "5" | null>(null);
  const [englishFilter, setEnglishFilter] = useState<number | null>(null);

  /* Extended mode */
  const [extendedMode, setExtendedMode] = useState(false);
  const [yksModal, setYksModal] = useState<YksModalEntry | null>(null);

  /* Ctrl+Shift+K kısayolu */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setExtendedMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ── Filtre/sıralama yardımcıları ── */

  const handleSemesterFilterToggle = () => {
    setSemesterFilter((current) => {
      if (current === null) return "3";
      if (current === "3") return "5";
      return null;
    });
  };

  const handleEnglishFilterToggle = () => {
    setEnglishFilter((current) => {
      if (current === null) return 100;
      if (current === 100) return 30;
      if (current === 30) return 0;
      return null;
    });
  };

  const getEnglishFilterLabel = () => {
    if (englishFilter === 100) return " (100%)";
    if (englishFilter === 30) return " (30%)";
    if (englishFilter === 0) return " (0%)";
    return " (Tümü)";
  };

  const handleSort = (key: "maxGpa" | "minGpa") => {
    if (sortConfig.key !== key) {
      setSortConfig({ key, direction: "desc" });
    } else if (sortConfig.direction === "desc") {
      setSortConfig({ key, direction: "asc" });
    } else {
      setSortConfig({ key: null, direction: "desc" });
    }
  };

  const getSortIcon = (key: "maxGpa" | "minGpa") => {
    if (sortConfig.key !== key)
      return <span className="sort-indicator unsorted">↕</span>;
    return sortConfig.direction === "asc" ? (
      <span className="sort-indicator asc">▲</span>
    ) : (
      <span className="sort-indicator desc">▼</span>
    );
  };

  const yks = Number(score);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (showResults) {
      setShowResults(true);
      return;
    }
    setIsExiting(true);
    setTimeout(() => {
      setShowResults(true);
      setIsExiting(false);
    }, 200);
  }

  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextYear = Number(event.target.value);
    if (isYksEntryYear(nextYear)) setYear(nextYear);
  }

  /* ── YKS modal açıcı ── */
  function openYksModal(
    programName: string,
    facultyName: string,
    yksScores: CompleteYearScores,
    maxYatay: number | undefined,
    minYatay: number | undefined,
  ) {
    setYksModal({ programName, facultyName, yksScores, maxYatay, minYatay });
  }

  /* ── Program hücresine eklenen YKS butonu ── */
  function YksBadge({
    programName,
    facultyName,
    yksScores,
    maxYatay,
    minYatay,
  }: YksModalEntry) {
    return (
      <button
        className="yks-info-btn"
        title="YKS puanlarını ve hesaplamayı gör"
        onClick={(e) => {
          e.stopPropagation();
          openYksModal(programName, facultyName, yksScores, maxYatay, minYatay);
        }}
      >
        YKS
      </button>
    );
  }

  /* ── Form ── */
  const formEl = (
    <article className="demo-panel">
      <form onSubmit={handleSubmit}>
        <section className="demo-form-row">
          <div className="demo-field">
            <p className="demo-field-label">
              <label htmlFor="score">
                {scoreType === "sayisal"
                  ? "Sayısal Puanın:"
                  : "Eşit Ağırlık Puanın:"}
              </label>
            </p>
            <p className="demo-field-control">
              <input
                id="score"
                name="score"
                type="number"
                value={score}
                onChange={(event) => setScore(event.target.value)}
              />
            </p>
            <p
              className="demo-score-note"
              role="button"
              tabIndex={0}
              onClick={() =>
                setScoreType((current) =>
                  current === "sayisal" ? "esit-agirlik" : "sayisal",
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setScoreType((current) =>
                    current === "sayisal" ? "esit-agirlik" : "sayisal",
                  );
                }
              }}
            >
              {scoreType === "sayisal" ? "Eşit Ağırlık..." : "Sayısal..."}
            </p>
          </div>

          <div className="demo-field">
            <p className="demo-field-label">
              <label htmlFor="year">Girdiğin Sene:</label>
            </p>
            <p className="demo-field-control">
              <select
                id="year"
                name="year"
                value={year}
                onChange={handleYearChange}
              >
                {YKS_ENTRY_YEARS.map((entryYear) => (
                  <option key={entryYear} value={entryYear}>
                    {entryYear}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </section>

        <p className="demo-form-action">
          <button type="submit">Sonuçları Göster</button>
        </p>
      </form>
    </article>
  );

  return (
    <main className="app-shell demo-shell">
      <section className="hero-section demo-hero">
        {!showResults ? (
          <>
            <div
              className={`demo-brand-wrapper${isExiting ? " exiting" : ""}`}
            >
              <Image
                src="/logo.png"
                alt="Arı Yatay logo"
                width={96}
                height={96}
                className="demo-brand-icon"
                priority
                unoptimized
              />
              <p className="demo-brand-name">Arı Yatay</p>
            </div>
            <div
              className={`demo-hero-main${isExiting ? " exiting" : ""}`}
            >
              <section className="demo-hero-cols">
                <section className="demo-announce-section">
                  <span className="demo-announce-badge">
                    <span className="demo-announce-badge-dot" />
                    2026 Güncellemesi
                  </span>
                  <h2 className="demo-announce-title">
                    Arı Yatay
                    <br />
                    <span className="demo-announce-title-accent">
                      yenilendi.
                    </span>
                  </h2>
                  <p className="demo-announce-desc">
                    İTÜ&apos;nün 2026 kurum içi yatay geçiş kontenjan listesi
                    esas alınarak tavan ve taban GPA değerleri güncellendi.
                    Artık en güncel verilerle hesaplama yapabilirsin.
                  </p>
                  <div className="demo-announce-divider" />
                </section>
                {formEl}
              </section>
            </div>
          </>
        ) : (
          <section className="demo-top-row">
            <div className="demo-brand-wrapper">
              <Image
                src="/logo.png"
                alt="Arı Yatay logo"
                width={96}
                height={96}
                className="demo-brand-icon"
                priority
                unoptimized
              />
              <p className="demo-brand-name">Arı Yatay</p>
            </div>
            {formEl}
          </section>
        )}

        {/* Extended mode göstergesi */}
        {extendedMode && showResults && (
          <div className="extended-mode-badge" aria-live="polite">
            <span className="extended-mode-dot" />
            Gelişmiş Mod
            <kbd>Ctrl+Shift+K</kbd>
          </div>
        )}

        {showResults ? (
          <section className="demo-results-section" aria-live="polite">
            <table className="demo-table">
              <thead>
                <tr>
                  <th scope="col" className="filter-th">
                    <div className="filter-input-wrapper">
                      <input
                        type="text"
                        placeholder="Program"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="program-filter-input"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="search-icon"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                  </th>
                  <th
                    scope="col"
                    onClick={handleEnglishFilterToggle}
                    className="sortable-header"
                  >
                    İngilizce
                    <span
                      className={`filter-indicator ${englishFilter !== null ? "active" : "inactive"}`}
                    >
                      {getEnglishFilterLabel()}
                    </span>
                  </th>
                  <th
                    scope="col"
                    onClick={handleSemesterFilterToggle}
                    className="sortable-header"
                  >
                    Yarıyıl
                    <span
                      className={`filter-indicator ${semesterFilter ? "active" : "inactive"}`}
                    >
                      {semesterFilter ? ` (${semesterFilter})` : " (Tümü)"}
                    </span>
                  </th>
                  <th scope="col">Kontenjan</th>
                  <th scope="col">Yerleşen</th>
                  <th
                    scope="col"
                    onClick={() => handleSort("maxGpa")}
                    className="sortable-header"
                  >
                    Tavan GPA {getSortIcon("maxGpa")}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort("minGpa")}
                    className="sortable-header"
                  >
                    Taban GPA {getSortIcon("minGpa")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortConfig.key === null
                  ? mergedYatayYks2026.map((group) => {
                      const filteredEntries = group.entries.filter((entry) => {
                        const programMatch = entry.program
                          .toLowerCase()
                          .includes(filterText.toLowerCase());
                        const englishMatch =
                          `${entry.english}%`.includes(filterText) ||
                          `${entry.english}`.includes(filterText);
                        const semesterMatch =
                          semesterFilter === null ||
                          entry.semester.startsWith(semesterFilter);
                        const englishFilterMatch =
                          englishFilter === null ||
                          entry.english === englishFilter;
                        return (
                          (programMatch || englishMatch) &&
                          semesterMatch &&
                          englishFilterMatch
                        );
                      });

                      if (filteredEntries.length === 0) return null;

                      return (
                        <Fragment key={group.name}>
                          <tr className="faculty-row">
                            <th colSpan={7} scope="rowgroup">
                              {group.name}
                            </th>
                          </tr>
                          {filteredEntries.map((entry) => {
                            const maxGpa = formatGpa(
                              yks,
                              getMaxScore(entry),
                              entry.yksScores[year as YksYear],
                            );
                            const minGpa = formatGpa(
                              yks,
                              getMinScore(entry),
                              entry.yksScores[year as YksYear],
                            );

                            return (
                              <tr
                                key={`${group.name}-${entry.program}-${entry.semester}-${entry.english}`}
                                className={`program-row ${entry.english === 30 ? "english-30-row" : entry.english === 100 ? "english-100-row" : ""} ${entry.semester.startsWith("3") ? "sem-3-row" : "sem-5-row"}`}
                              >
                                <td data-label="Program">
                                  <span className="program-cell-inner">
                                    <span className="program-title">
                                      {entry.program}
                                    </span>
                                    {extendedMode && (
                                      <YksBadge
                                        programName={entry.program}
                                        facultyName={group.name}
                                        yksScores={entry.yksScores}
                                        maxYatay={getMaxScore(entry)}
                                        minYatay={getMinScore(entry)}
                                      />
                                    )}
                                  </span>
                                </td>
                                <td data-label="İngilizce">
                                  {entry.english}%
                                </td>
                                <td data-label="Yarıyıl">
                                  {entry.semester.replace(".Yarıyıl", "")}
                                </td>
                                <td data-label="Kontenjan">{entry.quota}</td>
                                <td data-label="Yerleşen">{entry.placed}</td>
                                <td data-label="Tavan GPA">{maxGpa}</td>
                                <td data-label="Taban GPA">{minGpa}</td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      );
                    })
                  : (() => {
                      const allFiltered = mergedYatayYks2026.flatMap(
                        (group) => {
                          const filteredEntries = group.entries.filter(
                            (entry) => {
                              const programMatch = entry.program
                                .toLowerCase()
                                .includes(filterText.toLowerCase());
                              const englishMatch =
                                `${entry.english}%`.includes(filterText) ||
                                `${entry.english}`.includes(filterText);
                              const semesterMatch =
                                semesterFilter === null ||
                                entry.semester.startsWith(semesterFilter);
                              const englishFilterMatch =
                                englishFilter === null ||
                                entry.english === englishFilter;
                              return (
                                (programMatch || englishMatch) &&
                                semesterMatch &&
                                englishFilterMatch
                              );
                            },
                          );
                          return filteredEntries.map((entry) => ({
                            ...entry,
                            facultyName: group.name,
                          }));
                        },
                      );

                      const sorted = [...allFiltered].sort((a, b) => {
                        const aVal =
                          sortConfig.key === "maxGpa"
                            ? getGpaNumeric(
                                yks,
                                getMaxScore(a),
                                a.yksScores[year as YksYear],
                              )
                            : getGpaNumeric(
                                yks,
                                getMinScore(a),
                                a.yksScores[year as YksYear],
                              );
                        const bVal =
                          sortConfig.key === "maxGpa"
                            ? getGpaNumeric(
                                yks,
                                getMaxScore(b),
                                b.yksScores[year as YksYear],
                              )
                            : getGpaNumeric(
                                yks,
                                getMinScore(b),
                                b.yksScores[year as YksYear],
                              );

                        if (aVal === -1 && bVal === -1) return 0;
                        if (aVal === -1) return 1;
                        if (bVal === -1) return -1;

                        return sortConfig.direction === "asc"
                          ? aVal - bVal
                          : bVal - aVal;
                      });

                      return sorted.map((entry) => {
                        const maxGpa = formatGpa(
                          yks,
                          getMaxScore(entry),
                          entry.yksScores[year as YksYear],
                        );
                        const minGpa = formatGpa(
                          yks,
                          getMinScore(entry),
                          entry.yksScores[year as YksYear],
                        );

                        return (
                          <tr
                            key={`${entry.facultyName}-${entry.program}-${entry.semester}-${entry.english}`}
                            className={`program-row ${entry.english === 30 ? "english-30-row" : entry.english === 100 ? "english-100-row" : ""} ${entry.semester.startsWith("3") ? "sem-3-row" : "sem-5-row"}`}
                          >
                            <td data-label="Program">
                              <span className="program-cell-inner">
                                <span className="program-title">
                                  {entry.program}
                                </span>
                                {extendedMode && (
                                  <YksBadge
                                    programName={entry.program}
                                    facultyName={entry.facultyName}
                                    yksScores={entry.yksScores}
                                    maxYatay={getMaxScore(entry)}
                                    minYatay={getMinScore(entry)}
                                  />
                                )}
                              </span>
                              <span className="demo-faculty-subtext">
                                {" "}
                                ({entry.facultyName})
                              </span>
                            </td>
                            <td data-label="İngilizce">{entry.english}%</td>
                            <td data-label="Yarıyıl">
                              {entry.semester.replace(".Yarıyıl", "")}
                            </td>
                            <td data-label="Kontenjan">{entry.quota}</td>
                            <td data-label="Yerleşen">{entry.placed}</td>
                            <td data-label="Tavan GPA">{maxGpa}</td>
                            <td data-label="Taban GPA">{minGpa}</td>
                          </tr>
                        );
                      });
                    })()}
              </tbody>
            </table>
          </section>
        ) : null}

        <footer className="demo-footer">
          <article className="demo-warning-card">
            <span className="demo-warning-text-inline">
              <strong>Dikkat!</strong> Bu hesaplayıcı prototip aşamasındadır.
              Bazı veriler hatalı veya yanıltıcı olabilir, son kontrollerinizi
              kendiniz yapınız.
            </span>
            <div className="demo-warning-actions">
              <span className="demo-version-badge">
                Arı Yatay - GPA Hesaplama Aracı v2
              </span>
              <span className="demo-feedback-label">Geri bildirim için:</span>
              <a
                href="mailto:batikankutluer@proton.me?subject=Sitenizde bir hata buldum.&amp;body=Merhaba Batıkan, yazdığın sitede (itu-yatay.vercel.app) şöyle bir hata buldum:"
                className="demo-feedback-btn"
              >
                Mail için Tıkla!
              </a>
            </div>
          </article>
        </footer>
      </section>

      {/* YKS Modal */}
      {yksModal && (
        <YksInfoModal
          entry={yksModal}
          yks={yks}
          year={year}
          onClose={() => setYksModal(null)}
        />
      )}
    </main>
  );
}

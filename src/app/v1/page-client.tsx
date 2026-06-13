"use client";

import React, { useState } from "react";
import matches from "../matches.json";

import Snowfall from "react-snowfall";
import "./scrollbar.css";

export default function App({ version }: { version: string }) {
  const [userYKS, setUserYKS] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [termSelection, setTermSelection] = useState("0");
  const [showResults, setShowResults] = useState(false);
  const [onlyEnglish, setOnlyEnglish] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setResults(matches);
    setShowResults(true);
  };

  function handleOnlyEnglish(e: React.MouseEvent) {
    e.preventDefault();
    setOnlyEnglish(!onlyEnglish);
    if (!onlyEnglish) return setResults(matches);
    setResults(matches.filter((program) => program.sadeceIngilizceVar));
  }

  function handleSelection(e: any) {
    e.preventDefault();
    setTermSelection(e.target.value);
  }

  return (
    <div className="v1-container container mx-auto px-4 py-8 bg-red-900 h-full overflow-auto">
      <Snowfall />
      <h1 className="2xl:text-6xl text-4xl font-bold font-sans my-4 mb-10 text-red-100 text-center select-none">
        İTÜ Yatay - GPA Aracı
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex justify-center bg-green-900 shadow-xl rounded-lg p-12 select-none"
      >
        <div className="min-w-56 flex flex-col text-green-400 font-extrabold 2xl:text-2xl text-lg">
          <p className="pb-2">YKS Puanın:</p>
          <input
            type="number"
            min="0"
            max="560"
            value={userYKS}
            onChange={(e) => setUserYKS(e.target.value)}
            placeholder="YKS puanınızı giriniz."
            className="w-full border text-black border-zinc-300 rounded px-4 py-2 mr-2 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex justify-between py-2">
            <div className="flex items-center">
              <p className="pr-2">Girdiğin Sene:</p>
            </div>
            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-black p-2 rounded-sm text-xl"
              required
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-950 hover:bg-green-700 hover:text-green-200 text-green-300 font-bold px-6 py-2 rounded transition duration-300"
            disabled={
              userYKS === "" || Number(userYKS) < 0 || Number(userYKS) > 560
            }
          >
            Sonuçları Al
          </button>
        </div>
      </form>
      {showResults ? (
        <div>
          <div className="overflow-x-auto bg-green-600 rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-green-700 text-green-300 font-extrabold border-2 border-green-600 border-b-0">
                  <th className="flex flex-col lg:flex-row justify-between text-center py-3 px-4 lg:text-left bg-green-800 text-green-200">
                    <div className="lg:flex lg:justify-center lg:items-center pb-2 lg:pb-0 text-2xl font-extrabold text-green-400">
                      Program
                    </div>
                    <button
                      onClick={handleOnlyEnglish}
                      className={`bg-green-900 p-2 ${
                        onlyEnglish ? "text-green-600" : "text-green-300"
                      } md:hover:text-green-500 active:text-green-500 rounded-md`}
                    >
                      Sadece İngilizce
                    </button>
                  </th>
                  <th className="p-2 lg:p-0">
                    <select
                      className="text-center bg-green-800 text-green-400 hover:text-green-200 hover:cursor-pointer shadow-sm rounded-md p-3"
                      onChange={(e) => handleSelection(e)}
                    >
                      <option value="3" className="text-green-200">
                        3. Yarıyıl
                      </option>
                      <option value="5" className="text-green-400">
                        5. Yarıyıl
                      </option>
                      <option
                        value="0"
                        className="text-zinc-200 text-center"
                        selected
                      >
                        Hepsi
                      </option>
                    </select>
                  </th>
                  <th className="py-3 px-4 text-center">Kontenjan</th>
                  <th className="py-3 px-4 text-center">Yerleşen</th>
                  <th className="py-3 px-4 text-center">Max GPA</th>
                  <th className="py-3 px-4 text-center">Min GPA</th>
                </tr>
              </thead>

              {results.map((program, index) => {
                if (program?.fakulte) return;
                return (
                  <React.Fragment key={program?.programAdi + "-group-" + index}>
                    <Row
                      key={program?.programAdi + "3.Yarıyıl" + index}
                      selectedYear={selectedYear}
                      program={program}
                      yilAdi="3.Yarıyıl"
                      userYKS={userYKS}
                      termSelection={termSelection}
                    />
                    <Row
                      key={program?.programAdi + "5.Yarıyıl" + index}
                      selectedYear={selectedYear}
                      program={program}
                      yilAdi="5.Yarıyıl"
                      userYKS={userYKS}
                      termSelection={termSelection}
                    />
                  </React.Fragment>
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-green-950 rounded-lg shadow-md p-4 flex flex-col items-center select-none">
          <h1 className="text-red-600 text-center text-5xl pb-2">Dikkat!</h1>
          <p className="text-green-300 text-left 2xl:text-lg text-sm p-4">
            Bu hesaplayıcı prototip aşamasındadır. Bazı veriler hatalı veya
            yanıltıcı olabilir, son kontrollerinizi kendiniz yapınız.
          </p>
          <div className="flex select-none text-center">
            <p className="text-zinc-300 pr-4 2xl:text-lg text-md">
              Geri bildirim için:{" "}
              <a href="mailto:batikankutluer@proton.me?subject=Sitenizde bir hata buldum.&body=Merhaba Batıkan, yazdığın sitede (itu-yatay.vercel.app) şöyle bir hata buldum:">
                <button className="p-2 bg-green-800 text-green-400 hover:text-green-300 text-sm rounded-md">
                  Mail için Tıkla!
                </button>
              </a>
            </p>
            <div className="flex items-center">
              <p className="p-2 select-none text-green-400 shadow-sm rounded-md bg-green-900 shadow-zinc-900 text-sm">
                İTÜ Yatay Geçiş - GPA Hesaplama Aracı {version}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  program,
  yilAdi,
  userYKS,
  selectedYear,
  termSelection,
}: {
  program: any;
  yilAdi: string;
  userYKS: string;
  selectedYear: string;
  termSelection: string;
}) {
  let yil = program?.yil[yilAdi];

  let kontenjan = yil?.kontenjan || "-";
  let yerlesen = yil?.yerlesen || "-";
  let maxSkor = yil?.maxSkor || "-";
  let minSkor = yil?.minSkor || "-";
  let yksYillar = program?.yksYillar || [];

  let yksTabanPuan =
    program?.yksTabanPuan[
      yksYillar.findIndex((puan: string) => puan == selectedYear)
    ];

  let minGPA: any = "-";
  let maxGPA: any = "-";

  if (program.programAdi == "Kontrol ve Otomasyon Mühendisliği")
    yksTabanPuan = 524.44;
  if (program.programAdi == "Meteoroloji Mühendisliği") yksTabanPuan = 432.85;

  if (minSkor !== "-" && yksTabanPuan !== "-") {
    minGPA =
      (minSkor * yksTabanPuan - Number(userYKS) * 0.4) / (yksTabanPuan * 0.15);
  }

  if (maxSkor !== "-" && yksTabanPuan !== "-") {
    maxGPA =
      (maxSkor * yksTabanPuan - Number(userYKS) * 0.4) / (yksTabanPuan * 0.15);
  }

  if (program.programAdi == "Maden Mühendisliği") {
    console.log(minGPA, maxGPA);
    console.log(minSkor, maxSkor);
    console.log(minSkor !== "-", yksTabanPuan !== "-");
  }

  if (program?.sadeceIngilizceVar)
    return (
      <RowIngilizce
        selectedYear={selectedYear}
        program={program}
        yilAdi={yilAdi}
        userYKS={userYKS}
        termSelection={termSelection}
      />
    );
  return (
    <RowTemplate
      programAdi={program.programAdi}
      yilAdi={yilAdi}
      kontenjan={kontenjan}
      yerlesen={yerlesen}
      minGPA={minGPA}
      maxGPA={maxGPA}
      isIngilizce={false}
      termSelection={termSelection}
    />
  );
}

function RowIngilizce({
  program,
  yilAdi,
  userYKS,
  selectedYear,
  termSelection,
}: {
  program: any;
  yilAdi: string;
  userYKS: string;
  selectedYear: string;
  termSelection: string;
}) {
  let yil = program?.yil[yilAdi];

  let kontenjan = yil?.ingilizce?.kontenjan || "-";
  let yerlesen = yil?.ingilizce?.yerlesen || "-";
  let maxSkor = yil?.ingilizce?.maxSkor || "-";
  let minSkor = yil?.ingilizce?.minSkor || "-";
  let yksYillar = program?.yksYillar || [];

  let ingilizceYksTaban =
    program?.ingilizceYksPuan[
      yksYillar.findIndex((puan: string) => puan == selectedYear)
    ];

  let minGPA: any = "-";
  let maxGPA: any = "-";

  if (minSkor !== "-" && ingilizceYksTaban !== "-") {
    minGPA =
      (minSkor * ingilizceYksTaban - Number(userYKS) * 0.4) /
      (ingilizceYksTaban * 0.15);
  }

  if (maxSkor !== "-" && ingilizceYksTaban !== "-") {
    maxGPA =
      (maxSkor * ingilizceYksTaban - Number(userYKS) * 0.4) /
      (ingilizceYksTaban * 0.15);
  }

  return (
    <RowTemplate
      programAdi={program.programAdi}
      yilAdi={yilAdi}
      kontenjan={kontenjan}
      yerlesen={yerlesen}
      minGPA={minGPA}
      maxGPA={maxGPA}
      termSelection={termSelection}
      isIngilizce={true}
    />
  );
}

function RowTemplate({
  programAdi,
  yilAdi,
  kontenjan,
  yerlesen,
  minGPA,
  maxGPA,
  termSelection,
  isIngilizce,
}: {
  programAdi: string;
  yilAdi: string;
  kontenjan: string;
  yerlesen: string;
  minGPA: string;
  maxGPA: string;
  termSelection: string;
  isIngilizce: boolean;
}) {
  if (minGPA != "-") minGPA = minGPA.toString().slice(0, 4);
  if (maxGPA != "-") maxGPA = maxGPA.toString().slice(0, 4);

  if (kontenjan == "0" || kontenjan == "-") minGPA = maxGPA = "Açılmamış...";
  if (kontenjan > yerlesen) minGPA = maxGPA = "Yerleşen yok.";

  if (Number(minGPA) > 4) return;
  if (Number(maxGPA) > 4) maxGPA = "4>";

  if (termSelection != "0") if (yilAdi != `${termSelection}.Yarıyıl`) return;
  return (
    <tbody className="text-red-600">
      <tr className="bg-red-100 border-2 border-red-700">
        <td className="text-gray-200 font-semibold bg-red-800 p-2">
          {programAdi} {isIngilizce ? "(İngilizce)" : ""}
        </td>
        <td className="text-zinc-200 bg-red-600 text-center">{yilAdi}</td>
        <td className="text-zinc-200 bg-red-600 text-center">{kontenjan}</td>
        <td className="text-zinc-200 bg-red-600 text-center">{yerlesen}</td>
        <td className="text-zinc-200 bg-red-600 text-center">{maxGPA}</td>
        <td className="text-zinc-200 bg-red-600 text-center">{minGPA}</td>
      </tr>
    </tbody>
  );
}

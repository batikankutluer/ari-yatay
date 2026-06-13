"use server";

import App from "./page-client";
import MutluYillar from "../components/MutluYillar";

export default async function Home() {
  const version: string = "v1.0.6c";
  return (
    <>
      <div className="h-screen flex flex-col bg-green-950">
        <MutluYillar />
        <App version={version} />
      </div>
    </>
  );
}

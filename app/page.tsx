"use client";

import { useState } from "react";
import { projects } from "./projectsData";



export default function Home() {

  const [index, setIndex] = useState(0);
  const p = projects[index];


  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold tracking-tight">Moin Palekar</h1>
        <p className="mt-4 max-w-2xl text-gray-300">
          I build production-grade full-stack apps with modern web tech, and
          <br></br>
          develop autonomous models for embodied agents.
        </p>

        <div
          key={index}
          className="mt-10"
        >
          <a
            href={`/projects/${p.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="mt-2 text-2xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-gray-300">{p.oneLiner}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() =>
                setIndex((i) => (i === 0 ? projects.length - 1 : i - 1))
              }

              className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              Prev
            </button>

            <button
              onClick={() =>
                setIndex((i) => (i === projects.length - 1 ? 0 : i + 1))
              }

              className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}

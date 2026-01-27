"use client";
import Image from "next/image";
import { useState } from "react";
import { projects } from "./projectsData";
import { useEffect } from "react";




export default function Home() {

  const [index, setIndex] = useState(0);
  const p = projects[index];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
      }

      if (e.key === "ArrowRight") {
        setIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold tracking-tight">Moin Palekar</h1>
        <p className="mt-4 max-w-2xl text-gray-300">
          I build production-grade full-stack apps with modern web tech, and
          <br></br>
          develop autonomous models for embodied agents.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://github.com/Moin-Palekar"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            GitHub
          </a>

          <a
            href="/meta_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            Resume
          </a>

          <a
            href="mailto:moinismailp@gmail.com"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            Email
          </a>

          <a
            href="https://x.com/moinismailp"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            Twitter
          </a>
        </div>

        <div
          key={index}
          className="mt-10"
        >
          <a
            href={`/projects/${p.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            {p.media && (
              <div className="mb-4 overflow-hidden rounded-xl">
                <Image
                  src={p.media}
                  alt={p.title}
                  width={800}
                  height={450}
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
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
          <div className="mt-8 flex items-center justify-between">

            <p className="mb-3 text-sm text-gray-400">
              Project {index + 1} / {projects.length}
            </p>
            <div className="flex gap-2">
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
      </div>
    </main>
  );
}

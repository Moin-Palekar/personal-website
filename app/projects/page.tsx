import { projects } from "../projectsData";

export default function Projects() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-3 max-w-2xl text-gray-300">
          Click a project to see details, tech stack, and links.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <h2 className="text-2xl font-semibold">{p.title}</h2>
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
          ))}
        </div>
      </div>
    </main>
  );
}


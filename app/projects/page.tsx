import Image from "next/image";
import Link from "next/link";
import { projects } from "../projectsData";

export default function ProjectsPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="font-display text-5xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted">
          Systems across autonomy, machine learning, and backend engineering. Each page covers the
          problem, what I built, and the decisions behind it.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
            >
              {p.media && (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <Image src={p.media} alt={p.title} width={800} height={450} className="h-44 w-full object-cover" />
                </div>
              )}
              <span
                className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  p.status === "in progress" ? "bg-saffron-soft text-saffron" : "bg-accent-soft text-accent"
                }`}
              >
                {p.status === "in progress" ? "In progress" : "Completed"}
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold group-hover:text-accent">{p.title}</h2>
              <p className="mt-2 text-muted">{p.oneLiner}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
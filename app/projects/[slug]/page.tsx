import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../projectsData";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const inProgress = project.status === "in progress";

  const results = project.results ?? [];
  const milestones = project.milestones ?? [];
  const doneCount = milestones.filter((m) => m.done).length;
  const progressPct = milestones.length ? (doneCount / milestones.length) * 100 : 0;

  return (
    <main className="py-16">
      <article className="mx-auto max-w-3xl px-6">
        <Link href="/projects" className="text-sm font-medium text-muted hover:text-accent">
          ← All projects
        </Link>

        <span
          className={`mt-8 block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            inProgress ? "bg-saffron-soft text-saffron" : "bg-accent-soft text-accent"
          }`}
        >
          {inProgress ? "In progress" : "Completed"}
        </span>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">{project.oneLiner}</p>

        {(project.repo || project.href) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                View code on GitHub
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                Live demo
              </a>
            )}
          </div>
        )}

        {project.media && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <Image src={project.media} alt={project.title} width={1200} height={675} className="h-auto w-full" />
          </div>
        )}

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">The problem</h2>
          <p className="mt-3 text-lg leading-relaxed">{project.problem}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">What I built</h2>
          <ul className="mt-4 space-y-3">
            {project.built.map((b) => (
              <li key={b} className="flex gap-3 text-lg leading-relaxed">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Key decisions</h2>
          <div className="mt-4 grid gap-4">
            {project.decisions.map((d) => (
              <div key={d.choice} className="rounded-2xl border border-line bg-card p-5">
                <p className="font-semibold">{d.choice}</p>
                <p className="mt-1 leading-relaxed text-muted">{d.why}</p>
              </div>
            ))}
          </div>
        </section>

        {results.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Results</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {results.map((r) => (
                <div key={r.label} className="rounded-2xl border border-line bg-card p-5">
                  <p className="font-display text-3xl font-semibold text-accent">{r.value}</p>
                  <p className="mt-1 text-sm text-muted">{r.label}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          milestones.length > 0 && (
            <section className="mt-12">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold">Progress</h2>
                <span className="text-sm font-medium text-saffron">
                  {doneCount} of {milestones.length} milestones
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-saffron-soft">
                <div className="h-full rounded-full bg-saffron" style={{ width: `${progressPct}%` }} />
              </div>
              <ol className="mt-5 space-y-2.5">
                {milestones.map((m) => (
                  <li key={m.label} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                        m.done ? "border-accent bg-accent text-white" : "border-line bg-card"
                      }`}
                    >
                      {m.done ? "✓" : ""}
                    </span>
                    <span className={m.done ? "" : "text-muted"}>{m.label}</span>
                  </li>
                ))}
              </ol>
            </section>
          )
        )}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Tech stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                {t}
              </span>
            ))}
          </div>
        </section>

        <nav className="mt-20 grid grid-cols-1 gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {[
            { p: prev, label: "Previous", dir: "prev" as const },
            { p: next, label: "Next", dir: "next" as const },
          ].map(({ p, label, dir }) => (
            <Link
              key={dir}
              href={`/projects/${p.slug}`}
              className={`group flex min-w-0 items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition hover:border-accent hover:bg-accent-soft ${
                dir === "next" ? "flex-row-reverse text-right" : ""
              }`}
            >
              <span
                className={`text-2xl text-muted transition group-hover:text-accent ${
                  dir === "next" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
                }`}
              >
                {dir === "next" ? "→" : "←"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-saffron">{label}</span>
                <span className="mt-0.5 block font-display text-lg font-semibold leading-snug group-hover:text-accent">
                  {p.title}
                </span>
                <span className="mt-1 block truncate text-sm text-muted">{p.oneLiner}</span>
              </span>
            </Link>
          ))}
        </nav>
      </article>
    </main>
  );
}
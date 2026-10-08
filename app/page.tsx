import Image from "next/image";
import Link from "next/link";
import { projects } from "./projectsData";

const links = [
  { label: "GitHub", href: "https://github.com/Moin-Palekar", external: true },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Email", href: "mailto:moinismailp@gmail.com" },
  { label: "X", href: "https://x.com/moinismailp", external: true },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <main className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-5xl font-bold tracking-tight">Moin Palekar</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          I build production-grade full-stack apps with modern web tech, and
          develop autonomous models for embodied agents.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium transition hover:border-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        {featured.length > 0 && (
          <section className="mt-20">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Selected projects
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group block rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {p.media && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <Image src={p.media} alt={p.title} width={800} height={450} className="h-44 w-full object-cover" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.oneLiner}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/projects" className="mt-8 inline-block text-sm font-medium text-accent hover:underline">
              See all projects →
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
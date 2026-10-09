import Link from "next/link";

type Post = { _id: string; title: string; date: string; tags?: string[] };

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/blogs", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-5xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">
          Notes on autonomous driving, world models, and the ideas underneath them.
        </p>

        {posts.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-line bg-card p-8">
            <span className="rounded-full bg-saffron-soft px-2.5 py-0.5 text-xs font-semibold text-saffron">
              Writing in progress
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold">To be continued…</h2>
            <p className="mt-3 leading-relaxed text-muted">
              The first posts are being written: deep dives into the projects, paper reviews, and the
              math behind them. In the meantime, see what I&apos;m building.
            </p>
            <Link href="/projects" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
              Browse projects →
            </Link>
          </div>
        ) : (
          <div className="mt-14 divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post._id}`} className="group block py-6">
                <p className="text-sm text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold group-hover:text-accent">{post.title}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
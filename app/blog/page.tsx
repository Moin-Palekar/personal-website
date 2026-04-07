import { blogs } from "../blogsData";
import Link from "next/link";

export default function Blog() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-3 max-w-2xl text-gray-300">
          Thoughts on AI, engineering, and everything in between.
        </p>

        <div className="mt-10 flex flex-col gap-6">
          {blogs.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <p className="text-sm text-gray-400">{post.date}</p>
              <h2 className="mt-1 text-2xl font-semibold">{post.title}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200"
                  >
                    {tag}
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
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit() {
    const res = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });

    if (res.ok) {
      router.push("/blog");
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">New Blog Post</h1>
        <div className="mt-8 flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Publish
          </button>
        </div>
      </div>
    </main>
  );
}
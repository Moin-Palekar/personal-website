// @ts-nocheck
async function getBlogs() {
  const res = await fetch("http://localhost:8000/blogs", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="mt-10 flex flex-col gap-6">
          {blogs.map((post) => (
            <a key={post._id} href={"/blog/" + post._id} className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
              <p className="text-sm text-gray-400">{post.date}</p>
              <h2 className="mt-1 text-2xl font-semibold">{post.title}</h2>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
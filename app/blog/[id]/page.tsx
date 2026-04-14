// @ts-nocheck
async function getBlog(id) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/blogs/" + id, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPost({ params }) {
  const { id } = await params;
  const post = await getBlog(id);

  if (!post) {
    return <main className="px-6 py-16"><p>Post not found.</p></main>;
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-gray-400">{post.date}</p>
        <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
        <p className="mt-8 text-gray-300 leading-relaxed">{post.content}</p>
      </div>
    </main>
  );
}
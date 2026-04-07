import { blogs } from "../../blogsData";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return <main className="px-6 py-16"><p>Post not found.</p></main>;
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-gray-400">{post.date}</p>
        <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 text-gray-300 leading-relaxed">{post.content}</p>
      </div>
    </main>
  );
}
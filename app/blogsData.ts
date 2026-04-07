export type Blog = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
};

export const blogs: Blog[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    date: "2026-04-07",
    tags: ["meta", "intro"],
    content: "This is my first blog post. More coming soon.",
  },
  {
    slug: "on-world-models",
    title: "On World Models and Embodied AI",
    date: "2026-04-06",
    tags: ["AI", "research"],
    content: "World models allow agents to simulate future states internally...",
  },
];
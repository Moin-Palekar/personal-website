export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  href?: string;      // live demo link (optional)
  repo?: string;      // github repo link (optional)
  media?: string;     // path to image/gif in /public (optional)
  description: string; // detailed description
  challenges: string;  // challenges faced during the project
}

export const projects: Project[] = [
    {
    slug: "portfolio",
    title: "Portfolio Website",
    oneLiner: "A full-stack portfolio with blog, auth, and messaging.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    href: "",
    repo: "",
    media: "/projects/placeholder.gif",
    description: "A wesbite to showcase my projects and blog posts, built with Next.js and Tailwind CSS. Features include user authentication and a messaging system.",
    challenges: "",
    },

    {
    slug: "world-model",
    title: "Latent World Model Simulator",
    oneLiner: "A latent dynamics model for prediction and planning in simulated environments.",
    tech: ["Python", "PyTorch", "World Models"],
    href: "",
    repo: "",
    media: "",
    description: "",
    challenges: "",
    },


];
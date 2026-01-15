import { projects } from "../../projectsData";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <main className="p-8">
                <h1 className="text-2xl font-bold">Project not found</h1>
            </main>
        );
    }

    return (
        <main className="p-8">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="mt-4 text-gray-300">{project.oneLiner}</p>

            <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </main>
    );
}

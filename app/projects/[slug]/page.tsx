import { projects } from "../../projectsData";
import Image from "next/image";


export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    const index = projects.findIndex((p) => p.slug === slug);
    const prevProject = index > 0 ? projects[index - 1] : projects[projects.length - 1];
    const nextProject = index < projects.length - 1 ? projects[index + 1] : projects[0];


    if (!project) {
        return (
            <main className="p-8">
                <h1 className="text-2xl font-bold">Project not found</h1>
            </main>
        );
    }

    return (
        <main className="p-8">


            {project.media && (
                <div className="mb-6 flex justify-center">
                    <Image
                        src={project.media}
                        alt={project.title}
                        width={300}
                        height={150}
                        className="rounded-xl h-auto object-contain"
                    />
                </div>
            )}

            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="mt-4 text-gray-300">{project.oneLiner}</p>

            <div className="mt-10 grid gap-10">
                <section>
                    <h2 className="text-2xl font-semibold">Overview</h2>
                    <p className="mt-2 text-gray-300">
                        {project.oneLiner}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold">Tech Stack</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </section>
            </div>

            <div className="mt-16 flex justify-between">
                <a
                    href={`/projects/${prevProject.slug}`}
                    className="inline-block text-sm text-gray-300 hover:text-white"
                >
                    ← Prev
                </a>
                <a
                    href={`/projects/${nextProject.slug}`}
                    className="inline-block text-sm text-gray-300 hover:text-white"
                >
                    Next →
                </a>
            </div>
        </main >
    );
}

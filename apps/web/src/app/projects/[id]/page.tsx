import { PROJECTS } from "@/data/projects";
import ProjectDetailClient from "./client";

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProjectDetailClient id={id} />;
}

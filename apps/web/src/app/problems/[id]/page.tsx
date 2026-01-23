import { problems } from "@/data/problems";
import ProblemPageClient from "./client";

// Generate static params for all problems at build time
export function generateStaticParams() {
    return problems.map((problem) => ({
        id: problem.id,
    }));
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProblemPageClient id={id} />;
}

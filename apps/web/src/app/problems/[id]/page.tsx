import { problems } from "@/data/problems";
import ProblemPageClient from "./client";

// Generate static params for all problems at build time
export function generateStaticParams() {
    return problems.map((problem) => ({
        id: problem.id,
    }));
}

export default function ProblemPage({ params }: { params: { id: string } }) {
    return <ProblemPageClient id={params.id} />;
}

import { curriculum } from "@/data/curriculum";
import StepPageClient from "./client";

export async function generateStaticParams() {
    const params: { actId: string; sceneId: string; stepId: string }[] = [];

    curriculum.forEach((act) => {
        act.scenes.forEach((scene) => {
            scene.steps.forEach((step) => {
                params.push({
                    actId: act.id,
                    sceneId: scene.id,
                    stepId: step.id,
                });
            });
        });
    });

    return params;
}

export default async function StepPage({ params }: { params: Promise<{ actId: string; sceneId: string; stepId: string }> }) {
    const { actId, sceneId, stepId } = await params;
    return <StepPageClient actId={actId} sceneId={sceneId} stepId={stepId} />;
}

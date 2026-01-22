"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { curriculum, getAct, getScene, getStep } from "@/data/curriculum";
import { stepContent } from "@/data/step-content";

export default function StepPage() {
    const params = useParams();
    const actId = params.actId as string;
    const sceneId = params.sceneId as string;
    const stepId = params.stepId as string;

    const act = getAct(actId);
    const scene = getScene(actId, sceneId);
    const step = getStep(actId, sceneId, stepId);

    if (!act || !scene || !step) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Step not found</h1>
                    <Link href="/curriculum" className="text-purple-400 hover:underline">
                        ← Back to Curriculum
                    </Link>
                </div>
            </div>
        );
    }

    // Get content for this step
    const content = stepContent[stepId] || {
        title: step.title,
        content: `# ${step.title}\n\nContent coming soon...`,
    };

    // Find previous and next steps
    const allSteps: { actId: string; sceneId: string; step: typeof step }[] = [];
    curriculum.forEach((a) => {
        a.scenes.forEach((s) => {
            s.steps.forEach((st) => {
                allSteps.push({ actId: a.id, sceneId: s.id, step: st });
            });
        });
    });

    const currentIndex = allSteps.findIndex((s) => s.step.id === stepId);
    const prevStep = currentIndex > 0 ? allSteps[currentIndex - 1] : null;
    const nextStep = currentIndex < allSteps.length - 1 ? allSteps[currentIndex + 1] : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Link href="/curriculum" className="text-gray-400 hover:text-white">
                                ← Curriculum
                            </Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-gray-400">Act {act.number}</span>
                            <span className="text-gray-600">/</span>
                            <span className="text-gray-400">{scene.title}</span>
                        </div>
                        <Link
                            href="/dashboard"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Step Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${step.type === 'project' ? 'bg-green-500/20 text-green-400' :
                                step.type === 'exercise' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-purple-500/20 text-purple-400'
                            }`}>
                            {step.type.toUpperCase()}
                        </span>
                        <span>•</span>
                        <span>{step.estimatedMinutes} min</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {step.title}
                    </h1>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-purple max-w-none">
                    <div
                        className="bg-white/5 rounded-2xl p-8 border border-white/10"
                        dangerouslySetInnerHTML={{ __html: formatContent(content.content) }}
                    />
                </div>

                {/* Mark Complete Button */}
                <div className="mt-8 flex justify-center">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105">
                        ✓ Mark as Complete
                    </button>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex justify-between">
                    {prevStep ? (
                        <Link
                            href={`/curriculum/${prevStep.actId}/${prevStep.sceneId}/${prevStep.step.id}`}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>{prevStep.step.title}</span>
                        </Link>
                    ) : <div />}

                    {nextStep ? (
                        <Link
                            href={`/curriculum/${nextStep.actId}/${nextStep.sceneId}/${nextStep.step.id}`}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <span>{nextStep.step.title}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}

// Simple markdown-like formatter
function formatContent(content: string): string {
    return content
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mb-6">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/`(.+?)`/g, '<code class="bg-black/30 px-2 py-1 rounded text-purple-300">$1</code>')
        .replace(/^- (.+)$/gm, '<li class="text-gray-300 ml-4">$1</li>')
        .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-1 my-4">$&</ul>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-black/50 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm text-gray-300">$2</code></pre>')
        .replace(/\n\n/g, '</p><p class="text-gray-300 my-4">')
        .replace(/^(.+)$/gm, (match) => {
            if (match.startsWith('<')) return match;
            return `<p class="text-gray-300 my-4">${match}</p>`;
        });
}

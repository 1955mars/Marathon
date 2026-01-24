import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculum, getAct } from "@/data/curriculum";

interface Props {
    params: Promise<{ actId: string }>;
}

export default async function CategoryPage({ params }: Props) {
    const { actId } = await params;
    const act = getAct(actId);

    if (!act) {
        notFound();
    }

    const totalLessons = act.scenes.reduce((t, s) => t + s.steps.length, 0);
    const totalMinutes = act.scenes.reduce((t, s) =>
        t + s.steps.reduce((st, step) => st + step.estimatedMinutes, 0), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/curriculum" className="text-slate-500 hover:text-slate-800 transition-colors">
                            ← Curriculum
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-5xl">{act.emoji}</span>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                                {act.title}
                            </h1>
                            <p className="text-xl text-slate-600 mt-2">{act.description}</p>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-6 text-sm">
                        <div className="bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
                            <span className="text-purple-600 font-bold">{totalLessons}</span>
                            <span className="text-slate-500 ml-1">Lessons</span>
                        </div>
                        <div className="bg-white rounded-lg px-4 py-2 border border-slate-200 shadow-sm">
                            <span className="text-purple-600 font-bold">~{Math.round(totalMinutes / 60)}</span>
                            <span className="text-slate-500 ml-1">Hours</span>
                        </div>
                    </div>
                </div>

                {/* Scenes and Lessons */}
                <div className="space-y-8">
                    {act.scenes.map((scene) => (
                        <div key={scene.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-slate-800">{scene.title}</h2>
                                <p className="text-slate-500">{scene.description}</p>
                            </div>

                            {/* Lessons Grid */}
                            <div className="space-y-2">
                                {scene.steps.map((step) => (
                                    <Link
                                        key={step.id}
                                        href={`/curriculum/${act.id}/${scene.id}/${step.id}`}
                                        className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-lg px-4 py-3 transition-colors group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.type === 'project' ? 'bg-green-100 text-green-600' :
                                                step.type === 'exercise' ? 'bg-blue-100 text-blue-600' :
                                                    step.type === 'quiz' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-purple-100 text-purple-600'
                                                }`}>
                                                {step.type === 'project' ? '💻' :
                                                    step.type === 'exercise' ? '✏️' :
                                                        step.type === 'quiz' ? '❓' : '📖'}
                                            </div>
                                            <div>
                                                <div className="text-slate-800 group-hover:text-purple-600 transition-colors">
                                                    {step.title}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {step.estimatedMinutes} min • {step.type}
                                                </div>
                                            </div>
                                        </div>
                                        <svg
                                            className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Generate static params for all acts
export async function generateStaticParams() {
    return curriculum.map((act) => ({
        actId: act.id,
    }));
}

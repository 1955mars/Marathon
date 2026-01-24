"use client";

import Link from "next/link";
import { curriculum, getTotalSteps, getTotalMinutes } from "@/data/curriculum";

export default function CurriculumPage() {
    const totalSteps = getTotalSteps();
    const totalHours = Math.round(getTotalMinutes() / 60);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                            ← Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Curriculum
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                        From language fundamentals to interview mastery — learn Python, C++, data structures, systems, and more.
                    </p>
                    <div className="flex justify-center gap-8 text-sm">
                        <div className="bg-white/5 rounded-lg px-4 py-2">
                            <span className="text-purple-400 font-bold">{totalSteps}</span>
                            <span className="text-gray-400 ml-1">Lessons</span>
                        </div>
                        <div className="bg-white/5 rounded-lg px-4 py-2">
                            <span className="text-purple-400 font-bold">~{totalHours}</span>
                            <span className="text-gray-400 ml-1">Hours</span>
                        </div>
                    </div>
                </div>

                {/* Category Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {curriculum.map((act) => {
                        const lessonCount = act.scenes.reduce((t, s) => t + s.steps.length, 0);
                        const sceneCount = act.scenes.length;

                        return (
                            <Link
                                key={act.id}
                                href={`/curriculum/${act.id}`}
                                className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover:scale-[1.02] cursor-pointer"
                            >
                                <div className="text-5xl mb-4">{act.emoji}</div>
                                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    {act.title}
                                </h2>
                                <p className="text-gray-400 text-sm mb-4">
                                    {act.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>{lessonCount} lessons</span>
                                    <span>•</span>
                                    <span>{sceneCount} topics</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

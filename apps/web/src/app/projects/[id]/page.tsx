"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getProjectById } from "@/data/projects";

export default function ProjectDetailPage() {
    const params = useParams();
    const project = getProjectById(params.id as string);
    const [currentStep, setCurrentStep] = useState(0);
    const [language, setLanguage] = useState<"python" | "cpp">("python");

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
                    <Link href="/projects" className="text-purple-400 hover:underline">
                        ← Back to projects
                    </Link>
                </div>
            </div>
        );
    }

    const step = project.steps[currentStep];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Link href="/projects" className="text-gray-400 hover:text-white">
                                ← Projects
                            </Link>
                            <span className="text-white font-semibold">{project.title}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                            Step {currentStep + 1} of {project.steps.length}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar - Steps */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 sticky top-24">
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase">Steps</h3>
                            <div className="space-y-2">
                                {project.steps.map((s, index) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setCurrentStep(index)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${index === currentStep
                                                ? "bg-purple-600 text-white"
                                                : index < currentStep
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                            }`}
                                    >
                                        <span className="font-mono mr-2">{index + 1}.</span>
                                        {s.title}
                                    </button>
                                ))}
                            </div>

                            {/* Progress */}
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <div className="flex justify-between text-xs text-gray-400 mb-2">
                                    <span>Progress</span>
                                    <span>{Math.round(((currentStep + 1) / project.steps.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                        className="bg-purple-600 h-2 rounded-full transition-all"
                                        style={{ width: `${((currentStep + 1) / project.steps.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Step Header */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <div className="flex items-center gap-2 text-sm text-purple-400 mb-2">
                                <span>Step {currentStep + 1}</span>
                                <span>•</span>
                                {step.concepts.map((c) => (
                                    <span key={c} className="bg-purple-500/20 px-2 py-0.5 rounded text-xs">
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">{step.title}</h1>
                            <p className="text-gray-400">{step.description}</p>
                        </div>

                        {/* Code Section */}
                        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 bg-black/20 border-b border-white/10">
                                <span className="text-sm font-medium text-gray-300">Implementation</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setLanguage("python")}
                                        className={`px-3 py-1 rounded text-sm ${language === "python"
                                                ? "bg-blue-500 text-white"
                                                : "bg-white/10 text-gray-400"
                                            }`}
                                    >
                                        🐍 Python
                                    </button>
                                    <button
                                        onClick={() => setLanguage("cpp")}
                                        className={`px-3 py-1 rounded text-sm ${language === "cpp"
                                                ? "bg-orange-500 text-white"
                                                : "bg-white/10 text-gray-400"
                                            }`}
                                    >
                                        ⚡ C++
                                    </button>
                                </div>
                            </div>
                            <pre className="p-4 overflow-x-auto text-sm">
                                <code className="text-green-400 font-mono whitespace-pre">
                                    {step.code[language] || step.code.python || "// Code coming soon"}
                                </code>
                            </pre>
                        </div>

                        {/* Explanation */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-3">📖 Explanation</h3>
                            <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                                {step.explanation}
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
                            <h3 className="text-lg font-semibold text-yellow-400 mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2">
                                {step.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300">
                                        <span className="text-yellow-400">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                            <button
                                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                                disabled={currentStep === 0}
                                className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                            >
                                ← Previous
                            </button>
                            {currentStep < project.steps.length - 1 ? (
                                <button
                                    onClick={() => setCurrentStep((s) => s + 1)}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Next Step →
                                </button>
                            ) : (
                                <Link
                                    href="/projects"
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    ✓ Complete Project
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

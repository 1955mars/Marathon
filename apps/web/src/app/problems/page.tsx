"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { problems } from "@/data/problems";

const PATTERNS = [...new Set(problems.map(p => p.pattern))];
const SCROLL_KEY = 'problems-scroll-position';
const FILTER_KEY = 'problems-filter';
const DIFFICULTY_KEY = 'problems-difficulty';

export default function ProblemsPage() {
    const [filter, setFilter] = useState<string>("");
    const [difficultyFilter, setDifficultyFilter] = useState<string>("");
    const [isHydrated, setIsHydrated] = useState(false);

    // Restore state from sessionStorage after hydration
    useEffect(() => {
        const savedFilter = sessionStorage.getItem(FILTER_KEY);
        const savedDifficulty = sessionStorage.getItem(DIFFICULTY_KEY);

        if (savedFilter) setFilter(savedFilter);
        if (savedDifficulty) setDifficultyFilter(savedDifficulty);

        const savedPosition = sessionStorage.getItem(SCROLL_KEY);
        if (savedPosition) {
            requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(savedPosition, 10));
            });
        }

        setIsHydrated(true);
    }, []);

    // Save scroll position on scroll
    useEffect(() => {
        if (!isHydrated) return;

        const saveScrollPosition = () => {
            sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
        };
        window.addEventListener('scroll', saveScrollPosition);
        return () => window.removeEventListener('scroll', saveScrollPosition);
    }, [isHydrated]);

    // Save filters when they change (only after hydration)
    useEffect(() => {
        if (!isHydrated) return;
        sessionStorage.setItem(FILTER_KEY, filter);
    }, [filter, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        sessionStorage.setItem(DIFFICULTY_KEY, difficultyFilter);
    }, [difficultyFilter, isHydrated]);

    const filteredProblems = problems.filter(p => {
        if (filter && p.pattern !== filter) return false;
        if (difficultyFilter && p.difficulty !== difficultyFilter) return false;
        return true;
    });

    const easyCount = problems.filter(p => p.difficulty === "Easy").length;
    const mediumCount = problems.filter(p => p.difficulty === "Medium").length;
    const hardCount = problems.filter(p => p.difficulty === "Hard").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-slate-500 hover:text-slate-800">
                            ← Home
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Problems</h1>
                    <p className="text-slate-500">Practice coding problems with solutions in Python and C++</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilter("")}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === "" ? "bg-purple-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        All
                    </button>
                    {PATTERNS.map((p) => (
                        <button
                            key={p}
                            onClick={() => setFilter(p)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === p ? "bg-purple-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                        <div className="text-2xl font-bold text-slate-800">{problems.length}</div>
                        <div className="text-slate-500 text-sm">Total</div>
                    </div>
                    <button
                        onClick={() => setDifficultyFilter(difficultyFilter === "Easy" ? "" : "Easy")}
                        className={`rounded-xl p-4 border transition-colors ${difficultyFilter === "Easy"
                            ? "bg-green-100 border-green-400"
                            : "bg-green-50 border-green-200 hover:bg-green-100"
                            }`}
                    >
                        <div className="text-2xl font-bold text-green-600">{easyCount}</div>
                        <div className="text-slate-500 text-sm">Easy</div>
                    </button>
                    <button
                        onClick={() => setDifficultyFilter(difficultyFilter === "Medium" ? "" : "Medium")}
                        className={`rounded-xl p-4 border transition-colors ${difficultyFilter === "Medium"
                            ? "bg-yellow-100 border-yellow-400"
                            : "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                            }`}
                    >
                        <div className="text-2xl font-bold text-yellow-600">{mediumCount}</div>
                        <div className="text-slate-500 text-sm">Medium</div>
                    </button>
                    <button
                        onClick={() => setDifficultyFilter(difficultyFilter === "Hard" ? "" : "Hard")}
                        className={`rounded-xl p-4 border transition-colors ${difficultyFilter === "Hard"
                            ? "bg-red-100 border-red-400"
                            : "bg-red-50 border-red-200 hover:bg-red-100"
                            }`}
                    >
                        <div className="text-2xl font-bold text-red-600">{hardCount}</div>
                        <div className="text-slate-500 text-sm">Hard</div>
                    </button>
                </div>

                {/* Problem List */}
                <div className="space-y-3">
                    {filteredProblems.map((problem) => (
                        <Link
                            key={problem.id}
                            href={`/problems/${problem.id}`}
                            className="block bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-400 transition-colors group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === "Easy" ? "bg-green-100 text-green-600" :
                                        problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600" :
                                            "bg-red-100 text-red-600"
                                        }`}>
                                        {problem.difficulty}
                                    </span>
                                    <div>
                                        <div className="text-slate-800 font-medium group-hover:text-purple-600 transition-colors">
                                            {problem.title}
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                                                {problem.pattern}
                                            </span>
                                            {problem.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-xs text-slate-400">{problem.timeComplexity}</span>
                                    <svg
                                        className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredProblems.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No problems found</h3>
                        <p className="text-slate-500">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}

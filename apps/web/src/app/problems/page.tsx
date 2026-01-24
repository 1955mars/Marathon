"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { problems } from "@/data/problems";

const PATTERNS = [...new Set(problems.map(p => p.pattern))];
const SCROLL_KEY = 'problems-scroll-position';
const FILTER_KEY = 'problems-filter';
const DIFFICULTY_KEY = 'problems-difficulty';

export default function ProblemsPage() {
    // Restore filters from sessionStorage
    const [filter, setFilter] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(FILTER_KEY) || "";
        }
        return "";
    });
    const [difficultyFilter, setDifficultyFilter] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(DIFFICULTY_KEY) || "";
        }
        return "";
    });

    // Restore scroll position on mount
    useEffect(() => {
        const savedPosition = sessionStorage.getItem(SCROLL_KEY);
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition, 10));
            }, 100);
        }
    }, []);

    // Save scroll position on scroll
    useEffect(() => {
        const saveScrollPosition = () => {
            sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
        };
        window.addEventListener('scroll', saveScrollPosition);
        return () => window.removeEventListener('scroll', saveScrollPosition);
    }, []);

    // Save filters when they change
    useEffect(() => {
        sessionStorage.setItem(FILTER_KEY, filter);
    }, [filter]);

    useEffect(() => {
        sessionStorage.setItem(DIFFICULTY_KEY, difficultyFilter);
    }, [difficultyFilter]);

    const filteredProblems = problems.filter(p => {
        if (filter && p.pattern !== filter) return false;
        if (difficultyFilter && p.difficulty !== difficultyFilter) return false;
        return true;
    });

    const easyCount = problems.filter(p => p.difficulty === "Easy").length;
    const mediumCount = problems.filter(p => p.difficulty === "Medium").length;
    const hardCount = problems.filter(p => p.difficulty === "Hard").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-gray-400 hover:text-white">
                            ← Home
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Problems</h1>
                    <p className="text-gray-400">Practice coding problems with solutions in Python and C++</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setFilter("")}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === "" ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                            }`}
                    >
                        All
                    </button>
                    {PATTERNS.map((p) => (
                        <button
                            key={p}
                            onClick={() => setFilter(p)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === p ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-white">{problems.length}</div>
                        <div className="text-gray-400 text-sm">Total</div>
                    </div>
                    <button
                        onClick={() => setDifficultyFilter(difficultyFilter === "Easy" ? "" : "Easy")}
                        className={`rounded-xl p-4 border transition-colors ${difficultyFilter === "Easy"
                            ? "bg-green-500/30 border-green-500/50"
                            : "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
                            }`}
                    >
                        <div className="text-2xl font-bold text-green-400">{easyCount}</div>
                        <div className="text-gray-400 text-sm">Easy</div>
                    </button>
                    <button
                        onClick={() => setDifficultyFilter(difficultyFilter === "Medium" ? "" : "Medium")}
                        className={`rounded-xl p-4 border transition-colors ${difficultyFilter === "Medium"
                            ? "bg-yellow-500/30 border-yellow-500/50"
                            : "bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20"
                            }`}
                    >
                        <div className="text-2xl font-bold text-yellow-400">{mediumCount}</div>
                        <div className="text-gray-400 text-sm">Medium</div>
                    </button>
                    <button
                        onClick={() => setDifficultyFilter(difficultyFilter === "Hard" ? "" : "Hard")}
                        className={`rounded-xl p-4 border transition-colors ${difficultyFilter === "Hard"
                            ? "bg-red-500/30 border-red-500/50"
                            : "bg-red-500/10 border-red-500/20 hover:bg-red-500/20"
                            }`}
                    >
                        <div className="text-2xl font-bold text-red-400">{hardCount}</div>
                        <div className="text-gray-400 text-sm">Hard</div>
                    </button>
                </div>

                {/* Problem List */}
                <div className="space-y-3">
                    {filteredProblems.map((problem) => (
                        <Link
                            key={problem.id}
                            href={`/problems/${problem.id}`}
                            className="block bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                                        problem.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                                            "bg-red-500/20 text-red-400"
                                        }`}>
                                        {problem.difficulty}
                                    </span>
                                    <div>
                                        <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                            {problem.title}
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                                                {problem.pattern}
                                            </span>
                                            {problem.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-xs text-gray-500">{problem.timeComplexity}</span>
                                    <svg
                                        className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors"
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
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No problems found</h3>
                        <p className="text-gray-400">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}

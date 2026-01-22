"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Problem {
    id: string;
    title: string;
    url: string;
    difficulty: string;
    tags: string[];
    pattern: string | null;
    notes: string | null;
    practice_count: number;
    confidence: number;
    created_at: string;
}

const PATTERNS = [
    "Two Pointers",
    "Sliding Window",
    "Fast & Slow Pointers",
    "Merge Intervals",
    "Tree BFS",
    "Tree DFS",
    "Binary Search",
    "Dynamic Programming",
    "Backtracking",
    "Graph",
    "Trie",
    "Union Find",
];

export default function ProblemsPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [filter, setFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);

    // Form state
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [pattern, setPattern] = useState("");
    const [tags, setTags] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        fetchProblems();
    }, [filter]);

    const fetchProblems = async () => {
        try {
            const queryParams = filter ? `?pattern=${encodeURIComponent(filter)}` : "";
            const res = await fetch(`${API_URL}/problems/${queryParams}`);
            const data = await res.json();
            setProblems(data.problems || []);
        } catch (error) {
            console.error("Failed to fetch problems:", error);
        } finally {
            setLoading(false);
        }
    };

    const addProblem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/problems/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    url,
                    difficulty,
                    pattern: pattern || null,
                    tags: tags.split(",").map(t => t.trim()).filter(Boolean),
                    notes: notes || null,
                }),
            });

            if (res.ok) {
                setShowAddForm(false);
                setTitle("");
                setUrl("");
                setDifficulty("Medium");
                setPattern("");
                setTags("");
                setNotes("");
                fetchProblems();
            }
        } catch (error) {
            console.error("Failed to add problem:", error);
        }
    };

    const deleteProblem = async (id: string) => {
        if (!confirm("Delete this problem?")) return;
        try {
            await fetch(`${API_URL}/problems/${id}`, { method: "DELETE" });
            fetchProblems();
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const seedProblems = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/problems/seed`, { method: "POST" });
            const data = await res.json();
            alert(`Loaded ${data.total} problems!`);
            fetchProblems();
        } catch (error) {
            console.error("Failed to seed:", error);
        }
    };

    const recordPractice = async (id: string, confidence: number) => {
        try {
            await fetch(`${API_URL}/problems/${id}/practice?confidence=${confidence}`, {
                method: "POST",
            });
            fetchProblems();
        } catch (error) {
            console.error("Failed to record practice:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl">🏃</span>
                            <span className="text-xl font-bold text-white">Marathon</span>
                        </Link>
                        <Link href="/dashboard" className="text-gray-300 hover:text-white">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Problem Library</h1>
                        <p className="text-gray-400">Track your LeetCode progress with spaced repetition</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        + Add Problem
                    </button>
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
                    {PATTERNS.slice(0, 8).map((p) => (
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
                        <div className="text-gray-400 text-sm">Total Problems</div>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                        <div className="text-2xl font-bold text-green-400">
                            {problems.filter(p => p.difficulty === "Easy").length}
                        </div>
                        <div className="text-gray-400 text-sm">Easy</div>
                    </div>
                    <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                        <div className="text-2xl font-bold text-yellow-400">
                            {problems.filter(p => p.difficulty === "Medium").length}
                        </div>
                        <div className="text-gray-400 text-sm">Medium</div>
                    </div>
                    <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                        <div className="text-2xl font-bold text-red-400">
                            {problems.filter(p => p.difficulty === "Hard").length}
                        </div>
                        <div className="text-gray-400 text-sm">Hard</div>
                    </div>
                </div>

                {/* Problem List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                    </div>
                ) : problems.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No problems yet</h3>
                        <p className="text-gray-400 mb-4">Start building your problem library!</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={seedProblems}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                            >
                                🚀 Load Top 125 Problems
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                            >
                                Add Custom Problem
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {problems.map((problem) => (
                            <div
                                key={problem.id}
                                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors"
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
                                            <a
                                                href={problem.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white font-medium hover:text-purple-400"
                                            >
                                                {problem.title}
                                            </a>
                                            <div className="flex items-center space-x-2 mt-1">
                                                {problem.pattern && (
                                                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                                                        {problem.pattern}
                                                    </span>
                                                )}
                                                {problem.tags?.map((tag) => (
                                                    <span key={tag} className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {/* Confidence rating */}
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <button
                                                    key={n}
                                                    onClick={() => recordPractice(problem.id, n)}
                                                    className={`w-6 h-6 rounded-full text-xs transition-colors ${n <= problem.confidence
                                                        ? "bg-green-500 text-white"
                                                        : "bg-white/10 text-gray-400 hover:bg-white/20"
                                                        }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            ×{problem.practice_count || 0}
                                        </span>
                                        <button
                                            onClick={() => deleteProblem(problem.id)}
                                            className="text-gray-500 hover:text-red-400"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Problem Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <h2 className="text-xl font-bold text-white mb-4">Add Problem</h2>
                        <form onSubmit={addProblem} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
                                    placeholder="Two Sum"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">LeetCode URL</label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
                                    placeholder="https://leetcode.com/problems/two-sum"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Difficulty</label>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                        className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Pattern</label>
                                    <select
                                        value={pattern}
                                        onChange={(e) => setPattern(e.target.value)}
                                        className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
                                    >
                                        <option value="">Select pattern...</option>
                                        {PATTERNS.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
                                    placeholder="array, hashmap"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Notes</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 h-20"
                                    placeholder="Key insight: use a hashmap for O(n) time..."
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Add Problem
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

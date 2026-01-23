"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { getProblemById } from "@/data/problems";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function ProblemPageClient({ id }: { id: string }) {
    const problem = getProblemById(id);

    const [language, setLanguage] = useState<"python" | "cpp">("python");
    const [code, setCode] = useState(problem?.solutions.python || "");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showSolution, setShowSolution] = useState(true);

    const handleLanguageChange = (lang: "python" | "cpp") => {
        setLanguage(lang);
        if (problem) {
            setCode(problem.solutions[lang]);
        }
        setOutput("");
    };

    const runCode = useCallback(async () => {
        if (!API_URL) {
            setOutput("⚠️ Code execution requires a backend server.\n\nTo run code locally:\n1. Start the API: cd apps/api && uvicorn app.main:app --reload\n2. Set NEXT_PUBLIC_API_URL=http://localhost:8000");
            return;
        }

        setIsRunning(true);
        setOutput("Running...");

        try {
            const res = await fetch(`${API_URL}/code/execute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: code,
                    language: language === "python" ? "python" : "cpp",
                }),
            });

            const data = await res.json();
            setOutput(data.error || data.output || "No output");
        } catch (error) {
            setOutput(`Error: ${error}`);
        } finally {
            setIsRunning(false);
        }
    }, [code, language]);

    if (!problem) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-white mb-4">Problem not found</h1>
                    <Link href="/problems" className="text-purple-400 hover:text-purple-300">
                        ← Back to Problems
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-gray-400 hover:text-white">
                                ← Home
                            </Link>
                            <span className="text-gray-600">/</span>
                            <Link href="/problems" className="text-gray-400 hover:text-white">
                                Problems
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Problem Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                                problem.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                                    "bg-red-500/20 text-red-400"
                            }`}>
                            {problem.difficulty}
                        </span>
                        <span className="text-purple-400 text-sm">{problem.pattern}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left: Problem Description */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
                            <p className="text-gray-300">{problem.description}</p>
                        </div>

                        {/* Examples */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h2 className="text-lg font-semibold text-white mb-3">Examples</h2>
                            <div className="space-y-4">
                                {problem.examples.map((ex, i) => (
                                    <div key={i} className="bg-black/30 rounded-lg p-4">
                                        <div className="text-sm">
                                            <div className="text-gray-400">Input: <span className="text-white font-mono">{ex.input}</span></div>
                                            <div className="text-gray-400">Output: <span className="text-green-400 font-mono">{ex.output}</span></div>
                                            {ex.explanation && (
                                                <div className="text-gray-500 mt-1">Explanation: {ex.explanation}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Complexity */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h2 className="text-lg font-semibold text-white mb-3">Complexity</h2>
                            <div className="flex gap-6">
                                <div>
                                    <span className="text-gray-400 text-sm">Time:</span>
                                    <span className="text-white font-mono ml-2">{problem.timeComplexity}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-sm">Space:</span>
                                    <span className="text-white font-mono ml-2">{problem.spaceComplexity}</span>
                                </div>
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h2 className="text-lg font-semibold text-white mb-3">Explanation</h2>
                            <div className="text-gray-300 prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                                {problem.explanation}
                            </div>
                        </div>
                    </div>

                    {/* Right: Code Editor */}
                    <div className="space-y-4">
                        {/* Language Toggle & Run */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleLanguageChange("python")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === "python"
                                            ? "bg-purple-600 text-white"
                                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                                        }`}
                                >
                                    Python
                                </button>
                                <button
                                    onClick={() => handleLanguageChange("cpp")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === "cpp"
                                            ? "bg-purple-600 text-white"
                                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                                        }`}
                                >
                                    C++
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-gray-300 hover:bg-white/20"
                                >
                                    {showSolution ? "Hide Solution" : "Show Solution"}
                                </button>
                                <button
                                    onClick={runCode}
                                    disabled={isRunning}
                                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    {isRunning ? "Running..." : "▶ Run"}
                                </button>
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="rounded-xl overflow-hidden border border-white/10">
                            <Editor
                                height="400px"
                                language={language === "python" ? "python" : "cpp"}
                                value={showSolution ? code : "// Write your solution here\n"}
                                onChange={(value) => setCode(value || "")}
                                theme="vs-dark"
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    padding: { top: 16 },
                                }}
                            />
                        </div>

                        {/* Output */}
                        <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Output</h3>
                            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap min-h-[100px]">
                                {output || "Click Run to execute the code"}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

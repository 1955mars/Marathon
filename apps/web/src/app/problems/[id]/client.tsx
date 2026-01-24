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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-slate-800 mb-4">Problem not found</h1>
                    <Link href="/problems" className="text-purple-600 hover:text-purple-500">
                        ← Back to Problems
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-slate-500 hover:text-slate-800">
                                ← Home
                            </Link>
                            <span className="text-slate-300">/</span>
                            <Link href="/problems" className="text-slate-500 hover:text-slate-800">
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${problem.difficulty === "Easy" ? "bg-green-100 text-green-600" :
                            problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600" :
                                "bg-red-100 text-red-600"
                            }`}>
                            {problem.difficulty}
                        </span>
                        <span className="text-purple-600 text-sm">{problem.pattern}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">{problem.title}</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left: Problem Description */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-3">Description</h2>
                            <p className="text-slate-600">{problem.description}</p>
                        </div>

                        {/* Examples */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-3">Examples</h2>
                            <div className="space-y-4">
                                {problem.examples.map((ex, i) => (
                                    <div key={i} className="bg-slate-50 rounded-lg p-4">
                                        <div className="text-sm">
                                            <div className="text-slate-500">Input: <span className="text-slate-800 font-mono">{ex.input}</span></div>
                                            <div className="text-slate-500">Output: <span className="text-green-600 font-mono">{ex.output}</span></div>
                                            {ex.explanation && (
                                                <div className="text-slate-400 mt-1">Explanation: {ex.explanation}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Complexity */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-3">Complexity</h2>
                            <div className="flex gap-6">
                                <div>
                                    <span className="text-slate-500 text-sm">Time:</span>
                                    <span className="text-slate-800 font-mono ml-2">{problem.timeComplexity}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-sm">Space:</span>
                                    <span className="text-slate-800 font-mono ml-2">{problem.spaceComplexity}</span>
                                </div>
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800 mb-3">Explanation</h2>
                            <div className="text-slate-600 prose prose-slate prose-sm max-w-none whitespace-pre-wrap">
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
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    Python
                                </button>
                                <button
                                    onClick={() => handleLanguageChange("cpp")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === "cpp"
                                        ? "bg-purple-600 text-white"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    C++
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
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
                        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
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
                        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                            <h3 className="text-sm font-medium text-slate-400 mb-2">Output</h3>
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

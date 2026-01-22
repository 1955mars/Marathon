"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { getProjectById } from "@/data/projects";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ProjectDetailPage() {
    const params = useParams();
    const project = getProjectById(params.id as string);
    const [currentStep, setCurrentStep] = useState(0);
    const [language, setLanguage] = useState<"python" | "cpp">("python");
    const [output, setOutput] = useState<string>("");
    const [isRunning, setIsRunning] = useState(false);

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
    const currentCode = step.code[language] || step.code.python || "// Code coming soon";

    const runCode = async () => {
        setIsRunning(true);
        setOutput("Running...");

        try {
            const res = await fetch(`${API_URL}/code/run`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: currentCode,
                    language: language,
                }),
            });

            const data = await res.json();

            if (data.error) {
                setOutput(`❌ Error:\n${data.error}`);
            } else {
                setOutput(data.output || "✅ Code executed successfully (no output)");
            }
        } catch (error) {
            setOutput(`❌ Failed to connect to code runner. Make sure the API is running.`);
        } finally {
            setIsRunning(false);
        }
    };

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
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 sticky top-24">
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase">Steps</h3>
                            <div className="space-y-2">
                                {project.steps.map((s, index) => (
                                    <button
                                        key={s.id}
                                        onClick={() => { setCurrentStep(index); setOutput(""); }}
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

                        {/* Code Section with Monaco Editor */}
                        <div className="bg-slate-800 rounded-xl border border-white/10 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
                                <span className="text-sm font-medium text-gray-300">💻 Implementation</span>
                                <div className="flex items-center space-x-3">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => { setLanguage("python"); setOutput(""); }}
                                            className={`px-3 py-1 rounded text-sm font-medium transition ${language === "python"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                                                }`}
                                        >
                                            🐍 Python
                                        </button>
                                        <button
                                            onClick={() => { setLanguage("cpp"); setOutput(""); }}
                                            className={`px-3 py-1 rounded text-sm font-medium transition ${language === "cpp"
                                                    ? "bg-orange-600 text-white"
                                                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                                                }`}
                                        >
                                            ⚡ C++
                                        </button>
                                    </div>
                                    <button
                                        onClick={runCode}
                                        disabled={isRunning}
                                        className="px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-wait text-white rounded text-sm font-medium transition flex items-center gap-2"
                                    >
                                        {isRunning ? (
                                            <>
                                                <span className="animate-spin">⏳</span> Running...
                                            </>
                                        ) : (
                                            <>
                                                ▶ Run Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <Editor
                                height="400px"
                                language={language === "cpp" ? "cpp" : "python"}
                                value={currentCode}
                                theme="vs-dark"
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    padding: { top: 16, bottom: 16 },
                                    renderLineHighlight: "none",
                                    folding: true,
                                    automaticLayout: true,
                                }}
                            />

                            {/* Output Section */}
                            {output && (
                                <div className="border-t border-white/10">
                                    <div className="px-4 py-2 bg-slate-900/50 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-400">📤 Output</span>
                                        <button
                                            onClick={() => setOutput("")}
                                            className="text-xs text-gray-500 hover:text-gray-300"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <pre className="p-4 bg-slate-950 text-sm font-mono overflow-x-auto max-h-48 overflow-y-auto">
                                        <code className={output.startsWith("❌") ? "text-red-400" : "text-green-400"}>
                                            {output}
                                        </code>
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Explanation */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">📖 Explanation</h3>
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ children }) => <h2 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-base font-semibold text-purple-300 mt-3 mb-2">{children}</h3>,
                                        p: ({ children }) => <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>,
                                        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-gray-300">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-gray-300">{children}</ol>,
                                        li: ({ children }) => <li className="text-gray-300">{children}</li>,
                                        code: ({ children }) => <code className="bg-slate-700 text-green-400 px-1.5 py-0.5 rounded text-sm">{children}</code>,
                                        pre: ({ children }) => <pre className="bg-slate-800 p-3 rounded-lg overflow-x-auto mb-3">{children}</pre>,
                                        table: ({ children }) => <table className="w-full border-collapse mb-4">{children}</table>,
                                        th: ({ children }) => <th className="border border-white/20 bg-white/5 px-3 py-2 text-left text-white">{children}</th>,
                                        td: ({ children }) => <td className="border border-white/20 px-3 py-2 text-gray-300">{children}</td>,
                                    }}
                                >
                                    {step.explanation}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
                            <h3 className="text-lg font-semibold text-yellow-400 mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2">
                                {step.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300">
                                        <span className="text-yellow-400 mt-1">•</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                            <button
                                onClick={() => { setCurrentStep((s) => Math.max(0, s - 1)); setOutput(""); }}
                                disabled={currentStep === 0}
                                className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                            >
                                ← Previous
                            </button>
                            {currentStep < project.steps.length - 1 ? (
                                <button
                                    onClick={() => { setCurrentStep((s) => s + 1); setOutput(""); }}
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

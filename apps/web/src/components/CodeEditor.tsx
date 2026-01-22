"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    initialCode?: string;
    language?: "python" | "cpp";
    onCodeChange?: (code: string) => void;
    testCases?: TestCase[];
}

interface TestCase {
    id: string;
    input: string;
    expectedOutput: string;
}

interface TestResult {
    id: string;
    passed: boolean;
    actualOutput: string;
    error?: string;
}

export default function CodeEditor({
    initialCode = "",
    language = "python",
    onCodeChange,
    testCases = [],
}: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [activeTab, setActiveTab] = useState<"output" | "tests">("output");

    // Sync code with initialCode when it changes
    useEffect(() => {
        setCode(initialCode);
        setOutput("");
    }, [initialCode]);

    const handleCodeChange = (value: string | undefined) => {
        const newCode = value || "";
        setCode(newCode);
        onCodeChange?.(newCode);
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput("Running...");

        try {
            const response = await fetch("http://localhost:8000/code/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language }),
            });

            const result = await response.json();
            setOutput(result.output || result.error || "No output");
        } catch (error) {
            setOutput(`Error: ${error}`);
        } finally {
            setIsRunning(false);
        }
    };

    const runTests = async () => {
        setIsRunning(true);
        setActiveTab("tests");
        setTestResults([]);

        const results: TestResult[] = [];

        for (const testCase of testCases) {
            try {
                const response = await fetch("http://localhost:8000/code/execute", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code, language, input: testCase.input }),
                });

                const result = await response.json();
                const actualOutput = (result.output || "").trim();
                const passed = actualOutput === testCase.expectedOutput.trim();

                results.push({
                    id: testCase.id,
                    passed,
                    actualOutput,
                    error: result.error,
                });
            } catch (error) {
                results.push({
                    id: testCase.id,
                    passed: false,
                    actualOutput: "",
                    error: String(error),
                });
            }
        }

        setTestResults(results);
        setIsRunning(false);
    };

    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${language === "python"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                        {language === "python" ? "Python" : "C++"}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                        {isRunning ? (
                            <span className="animate-spin">⏳</span>
                        ) : (
                            <span>▶</span>
                        )}
                        <span>Run</span>
                    </button>
                    {testCases.length > 0 && (
                        <button
                            onClick={runTests}
                            disabled={isRunning}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                        >
                            Run Tests
                        </button>
                    )}
                </div>
            </div>

            {/* Editor */}
            <div className="h-80">
                <Editor
                    height="100%"
                    language={language === "cpp" ? "cpp" : "python"}
                    theme="vs-dark"
                    value={code}
                    onChange={handleCodeChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: "on",
                    }}
                />
            </div>

            {/* Output Panel */}
            <div className="border-t border-slate-700">
                {/* Tabs */}
                <div className="flex bg-slate-900">
                    <button
                        onClick={() => setActiveTab("output")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "output"
                                ? "text-white bg-slate-800 border-t-2 border-green-500"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Output
                    </button>
                    {testCases.length > 0 && (
                        <button
                            onClick={() => setActiveTab("tests")}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "tests"
                                    ? "text-white bg-slate-800 border-t-2 border-blue-500"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Tests ({testResults.filter(r => r.passed).length}/{testCases.length})
                        </button>
                    )}
                </div>

                {/* Tab Content */}
                <div className="h-32 overflow-auto p-3 bg-slate-900">
                    {activeTab === "output" ? (
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                            {output || "Click 'Run' to execute your code"}
                        </pre>
                    ) : (
                        <div className="space-y-2">
                            {testCases.map((testCase, index) => {
                                const result = testResults.find(r => r.id === testCase.id);
                                return (
                                    <div
                                        key={testCase.id}
                                        className={`p-2 rounded text-sm ${result
                                                ? result.passed
                                                    ? "bg-green-900/30 border border-green-500/30"
                                                    : "bg-red-900/30 border border-red-500/30"
                                                : "bg-slate-800 border border-slate-700"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-white">
                                                Test {index + 1}
                                            </span>
                                            {result && (
                                                <span className={result.passed ? "text-green-400" : "text-red-400"}>
                                                    {result.passed ? "✓ Passed" : "✗ Failed"}
                                                </span>
                                            )}
                                        </div>
                                        {result && !result.passed && (
                                            <div className="mt-1 text-xs text-gray-400">
                                                Expected: {testCase.expectedOutput} | Got: {result.actualOutput}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

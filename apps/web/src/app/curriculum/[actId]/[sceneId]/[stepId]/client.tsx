"use client";

import Link from "next/link";
import { curriculum, getAct, getScene, getStep } from "@/data/curriculum";
import { stepContent } from "@/data/step-content";
import { useGamification } from "@/hooks/useGamification";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useCallback, useMemo, useRef, useEffect, memo } from "react";
import Editor from "@monaco-editor/react";
import dynamic from "next/dynamic";

// Dynamically import MermaidDiagram to avoid SSR issues
const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
    ssr: false,
    loading: () => (
        <div className="my-6 flex justify-center bg-black/30 rounded-xl p-6 border border-white/10">
            <div className="animate-pulse text-gray-400">Loading diagram...</div>
        </div>
    ),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Monaco Editor Code Block Component - memoized to prevent re-renders
const CodeBlock = memo(function CodeBlock({
    code,
    language,
    blockId,
    originalCode,
    onMarkEdited,
    onRun,
    isRunning,
    output,
    initialIsEdited,
    editorRegistry
}: {
    code: string;
    language: string;
    blockId: string;
    originalCode: string;
    onMarkEdited: (blockId: string, isEdited: boolean) => void;
    onRun: (blockId: string, code: string, language: string) => void;
    isRunning: string | null;
    output: Record<string, string>;
    initialIsEdited: boolean;
    editorRegistry: React.MutableRefObject<Map<string, any>>;
}) {
    const editorRef = useRef<any>(null);
    // Track local edit state - this doesn't cause parent re-renders
    const [isEdited, setIsEdited] = useState(initialIsEdited);
    const blockOutput = output[blockId];
    const isThisRunning = isRunning === blockId;

    // Map markdown language names to Monaco language IDs
    const monacoLanguage = useMemo(() => {
        const langMap: Record<string, string> = {
            'python': 'python',
            'py': 'python',
            'cpp': 'cpp',
            'c++': 'cpp',
            'c': 'c',
            'javascript': 'javascript',
            'js': 'javascript',
            'typescript': 'typescript',
            'ts': 'typescript',
            'sql': 'sql',
            'json': 'json',
            'yaml': 'yaml',
            'bash': 'shell',
            'shell': 'shell',
            'html': 'html',
            'css': 'css',
        };
        return langMap[language.toLowerCase()] || 'plaintext';
    }, [language]);

    // Check if this language is runnable
    const isRunnable = ['python', 'py', 'cpp', 'c++', 'c', 'javascript', 'js'].includes(language.toLowerCase());

    // Calculate initial height based on line count (won't change during editing)
    const initialLineCount = originalCode.split('\n').length;
    const height = Math.min(Math.max(initialLineCount * 20 + 60, 120), 500);

    // Memoize editor options to prevent unnecessary re-renders
    const editorOptions = useMemo(() => ({
        readOnly: false,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on" as const,
        scrollBeyondLastLine: false,
        wordWrap: "on" as const,
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: "line" as const,
        folding: true,
        automaticLayout: true,
        tabSize: 4,
        scrollbar: {
            vertical: 'auto' as const,
            horizontal: 'auto' as const,
        },
    }), []);

    // Handle editor mount - register in global registry and use local state
    const handleEditorDidMount = useCallback((editor: any) => {
        editorRef.current = editor;

        // Create a reset function for this block
        const resetThis = () => {
            editor.setValue(originalCode);
            setIsEdited(false);
        };

        // Register this editor in the global registry for Reset All
        editorRegistry.current.set(blockId, { editor, originalCode, reset: resetThis });

        // Listen for content changes - update LOCAL state only (no parent re-render)
        editor.onDidChangeModelContent(() => {
            const currentValue = editor.getValue();
            const edited = currentValue !== originalCode;
            setIsEdited(edited);
        });

        // Notify parent on blur (so "Reset All" button can show/hide)
        editor.onDidBlurEditorWidget(() => {
            const currentValue = editor.getValue();
            const edited = currentValue !== originalCode;
            onMarkEdited(blockId, edited);
        });
    }, [blockId, originalCode, onMarkEdited, editorRegistry]);

    // Handle reset
    const handleReset = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.setValue(originalCode);
            setIsEdited(false);
            onMarkEdited(blockId, false);
        }
    }, [blockId, originalCode, onMarkEdited]);

    // Handle run
    const handleRun = useCallback(() => {
        if (editorRef.current) {
            const currentCode = editorRef.current.getValue();
            onRun(blockId, currentCode, language);
        }
    }, [blockId, language, onRun]);

    return (
        <div className="my-4 rounded-lg overflow-hidden border border-white/10 bg-black/30">
            {/* Header with language, reset button, and run button */}
            <div className="flex items-center justify-between px-3 py-2 bg-black/40 border-b border-white/10">
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-purple-400">
                        {language || 'code'}
                    </span>
                    {isEdited && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                            edited
                        </span>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {isEdited && (
                        <button
                            onClick={handleReset}
                            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset
                        </button>
                    )}
                    {isRunnable && (
                        <button
                            onClick={handleRun}
                            disabled={isThisRunning}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-wait text-white rounded text-xs font-medium transition flex items-center gap-1"
                        >
                            {isThisRunning ? (
                                <>
                                    <span className="animate-spin">⏳</span> Running...
                                </>
                            ) : (
                                <>
                                    ▶ Run
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
            {/* Monaco Editor - Using defaultValue for uncontrolled mode */}
            <Editor
                key={blockId}
                height={`${height}px`}
                language={monacoLanguage}
                defaultValue={code}
                theme="vs-dark"
                onMount={handleEditorDidMount}
                options={editorOptions}
            />
            {/* Output Section */}
            {blockOutput && (
                <div className="border-t border-white/10">
                    <div className="px-3 py-2 bg-black/20 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400">📤 Output</span>
                    </div>
                    <pre className="p-3 bg-black/40 text-sm font-mono overflow-x-auto max-h-48 overflow-y-auto">
                        <code className={blockOutput.startsWith("❌") ? "text-red-400" : "text-green-400"}>
                            {blockOutput}
                        </code>
                    </pre>
                </div>
            )}
        </div>
    );
});

export default function StepPageClient({ actId, sceneId, stepId }: { actId: string; sceneId: string; stepId: string }) {
    const act = getAct(actId);
    const scene = getScene(actId, sceneId);
    const step = getStep(actId, sceneId, stepId);

    const { progress, completeStep } = useGamification();
    const [isCompleted, setIsCompleted] = useState(
        progress.stepsCompleted.includes(stepId)
    );

    // Track which blocks have been edited (just a flag, actual code is in Monaco)
    const [editedBlocks, setEditedBlocks] = useState<Set<string>>(new Set());
    // Track output per block
    const [output, setOutput] = useState<Record<string, string>>({});
    // Track which block is currently running
    const [isRunning, setIsRunning] = useState<string | null>(null);

    // Use ref to generate stable block IDs based on content hash
    const blockIdMapRef = useRef<Map<string, string>>(new Map());
    const blockCounterRef = useRef(0);

    // Global registry for all Monaco editors on this page
    const editorRegistryRef = useRef<Map<string, { editor: any; originalCode: string; reset: () => void }>>(new Map());

    // Reset block counter when stepId changes
    useEffect(() => {
        blockIdMapRef.current.clear();
        blockCounterRef.current = 0;
        editorRegistryRef.current.clear();
        setEditedBlocks(new Set());
        setOutput({});
    }, [stepId]);

    // Generate stable block ID based on code content
    const getBlockId = useCallback((code: string): string => {
        // Create a simple hash of the first 100 chars of code
        const codeKey = code.substring(0, 100);
        if (blockIdMapRef.current.has(codeKey)) {
            return blockIdMapRef.current.get(codeKey)!;
        }
        const id = `code-${stepId}-${blockCounterRef.current++}`;
        blockIdMapRef.current.set(codeKey, id);
        return id;
    }, [stepId]);

    // Mark a block as edited or not
    const handleMarkEdited = useCallback((blockId: string, isEdited: boolean) => {
        setEditedBlocks(prev => {
            const next = new Set(prev);
            if (isEdited) {
                next.add(blockId);
            } else {
                next.delete(blockId);
            }
            return next;
        });
    }, []);

    // Reset all editors using the registry
    const handleResetAll = useCallback(() => {
        editorRegistryRef.current.forEach(({ reset }) => {
            if (reset) {
                reset();
            }
        });
        setEditedBlocks(new Set());
        setOutput({});
    }, []);

    const handleRun = useCallback(async (blockId: string, code: string, language: string) => {
        setIsRunning(blockId);
        setOutput(prev => ({ ...prev, [blockId]: "Running..." }));

        try {
            const res = await fetch(`${API_URL}/code/execute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: code,
                    language: language === 'py' ? 'python' : language === 'c++' ? 'cpp' : language,
                }),
            });

            const data = await res.json();

            if (data.error) {
                setOutput(prev => ({ ...prev, [blockId]: `❌ Error:\n${data.error}` }));
            } else {
                setOutput(prev => ({ ...prev, [blockId]: data.output || "✅ Code executed successfully (no output)" }));
            }
        } catch (error) {
            setOutput(prev => ({ ...prev, [blockId]: `❌ Failed to connect to code runner. Make sure the API is running.` }));
        } finally {
            setIsRunning(null);
        }
    }, []);

    if (!act || !scene || !step) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Step not found</h1>
                    <Link href="/curriculum" className="text-purple-400 hover:underline">
                        ← Back to Curriculum
                    </Link>
                </div>
            </div>
        );
    }

    // Get content for this step
    const content = stepContent[stepId] || {
        title: step.title,
        content: `# ${step.title}\n\nContent coming soon...\n\nThis step is part of **${scene.title}** in **Act ${act.number}: ${act.title}**.`,
    };

    // Find previous and next steps
    const allSteps: { actId: string; sceneId: string; step: typeof step }[] = [];
    curriculum.forEach((a) => {
        a.scenes.forEach((s) => {
            s.steps.forEach((st) => {
                allSteps.push({ actId: a.id, sceneId: s.id, step: st });
            });
        });
    });

    const currentIndex = allSteps.findIndex((s) => s.step.id === stepId);
    const prevStep = currentIndex > 0 ? allSteps[currentIndex - 1] : null;
    const nextStep = currentIndex < allSteps.length - 1 ? allSteps[currentIndex + 1] : null;

    // Handle mark complete
    const handleMarkComplete = () => {
        if (!isCompleted) {
            completeStep(stepId);
            setIsCompleted(true);
        }
    };

    // Check if any code has been edited
    const hasEdits = editedBlocks.size > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/curriculum" className="text-gray-400 hover:text-white">
                                ← Curriculum
                            </Link>
                            <span className="text-gray-600">/</span>
                            <Link href={`/curriculum/${actId}`} className="text-gray-400 hover:text-white">
                                {act.title}
                            </Link>
                            <span className="text-gray-600">/</span>
                            <span className="text-purple-400 truncate max-w-[200px]">
                                {scene.title}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Reset all button */}
                            {hasEdits && (
                                <button
                                    onClick={handleResetAll}
                                    className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reset All Code
                                </button>
                            )}
                            {/* Progress indicator */}
                            <span className="text-sm text-gray-500">
                                Step {currentIndex + 1} of {allSteps.length}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Step Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${step.type === 'project' ? 'bg-green-500/20 text-green-400' :
                            step.type === 'exercise' ? 'bg-blue-500/20 text-blue-400' :
                                step.type === 'quiz' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-purple-500/20 text-purple-400'
                            }`}>
                            {step.type.toUpperCase()}
                        </span>
                        <span>•</span>
                        <span>{step.estimatedMinutes} min</span>
                        {isCompleted && (
                            <>
                                <span>•</span>
                                <span className="text-green-400 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Completed
                                </span>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {step.title}
                    </h1>
                </div>

                {/* Content - Using ReactMarkdown with Monaco for code */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl font-bold text-white mt-6 mb-3">{children}</h3>
                            ),
                            h4: ({ children }) => (
                                <h4 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h4>
                            ),
                            p: ({ children }) => (
                                <p className="text-gray-300 my-4 leading-relaxed">{children}</p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 my-4 text-gray-300">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 my-4 text-gray-300">{children}</ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-gray-300">{children}</li>
                            ),
                            code: ({ className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const isCodeBlock = match && typeof children === 'string';

                                if (isCodeBlock) {
                                    const codeString = String(children).replace(/\n$/, '');
                                    const language = match[1].toLowerCase();

                                    // Handle Mermaid diagrams
                                    if (language === 'mermaid') {
                                        return <MermaidDiagram chart={codeString} />;
                                    }

                                    const blockId = getBlockId(codeString);
                                    return (
                                        <CodeBlock
                                            code={codeString}
                                            language={match[1]}
                                            blockId={blockId}
                                            originalCode={codeString}
                                            onMarkEdited={handleMarkEdited}
                                            onRun={handleRun}
                                            isRunning={isRunning}
                                            output={output}
                                            initialIsEdited={editedBlocks.has(blockId)}
                                            editorRegistry={editorRegistryRef}
                                        />
                                    );
                                }

                                // Inline code
                                return (
                                    <code className="bg-black/40 px-2 py-1 rounded text-purple-300 text-sm font-mono">
                                        {children}
                                    </code>
                                );
                            },
                            pre: ({ children }) => {
                                // If children is a CodeBlock, just return it directly
                                // Otherwise wrap in pre
                                if (children && typeof children === 'object' && 'type' in children) {
                                    // @ts-ignore - check if it's our CodeBlock
                                    if (children.type === CodeBlock) {
                                        return <>{children}</>;
                                    }
                                }
                                return (
                                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto my-4 border border-white/10">
                                        {children}
                                    </pre>
                                );
                            },
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-6">
                                    <table className="min-w-full border border-white/20 rounded-lg overflow-hidden">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead className="bg-purple-900/30">{children}</thead>
                            ),
                            tbody: ({ children }) => (
                                <tbody className="divide-y divide-white/10">{children}</tbody>
                            ),
                            tr: ({ children }) => (
                                <tr className="hover:bg-white/5">{children}</tr>
                            ),
                            th: ({ children }) => (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-300 border-b border-white/20">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="px-4 py-3 text-sm text-gray-300">{children}</td>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-purple-500 pl-4 my-4 italic text-gray-400">
                                    {children}
                                </blockquote>
                            ),
                            strong: ({ children }) => (
                                <strong className="text-white font-semibold">{children}</strong>
                            ),
                            em: ({ children }) => (
                                <em className="text-gray-300 italic">{children}</em>
                            ),
                            a: ({ href, children }) => (
                                <a href={href} className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">
                                    {children}
                                </a>
                            ),
                            hr: () => (
                                <hr className="border-white/20 my-8" />
                            ),
                        }}
                    >
                        {content.content}
                    </ReactMarkdown>
                </div>

                {/* Mark Complete Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleMarkComplete}
                        disabled={isCompleted}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all transform ${isCompleted
                            ? 'bg-green-600/50 text-green-300 cursor-default'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105'
                            }`}
                    >
                        {isCompleted ? '✓ Completed (+25 XP)' : '✓ Mark as Complete (+25 XP)'}
                    </button>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex justify-between">
                    {prevStep ? (
                        <Link
                            href={`/curriculum/${prevStep.actId}/${prevStep.sceneId}/${prevStep.step.id}`}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs text-gray-500">Previous</div>
                                <span>{prevStep.step.title}</span>
                            </div>
                        </Link>
                    ) : <div />}

                    {nextStep ? (
                        <Link
                            href={`/curriculum/${nextStep.actId}/${nextStep.sceneId}/${nextStep.step.id}`}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
                        >
                            <div className="text-right">
                                <div className="text-xs text-gray-500">Next</div>
                                <span>{nextStep.step.title}</span>
                            </div>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { curriculum, getTotalSteps, getTotalMinutes } from "@/data/curriculum";
import { useState, useEffect, useLayoutEffect } from "react";

const SCROLL_KEY = 'curriculum-scroll-position';
const EXPANDED_KEY = 'curriculum-expanded-section';

export default function CurriculumPage() {
    const [expandedSection, setExpandedSection] = useState<string | null>('act-0');
    const [isHydrated, setIsHydrated] = useState(false);

    // Restore state from sessionStorage after hydration
    useEffect(() => {
        const savedSection = sessionStorage.getItem(EXPANDED_KEY);
        if (savedSection) {
            setExpandedSection(savedSection);
        }

        const savedPosition = sessionStorage.getItem(SCROLL_KEY);
        if (savedPosition) {
            // Use requestAnimationFrame to ensure DOM is ready
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

    // Save expanded section when it changes
    useEffect(() => {
        if (!isHydrated) return;
        if (expandedSection) {
            sessionStorage.setItem(EXPANDED_KEY, expandedSection);
        } else {
            sessionStorage.removeItem(EXPANDED_KEY);
        }
    }, [expandedSection, isHydrated]);

    const totalSteps = getTotalSteps();
    const totalHours = Math.round(getTotalMinutes() / 60);

    const toggleSection = (actId: string) => {
        setExpandedSection(expandedSection === actId ? null : actId);
    };

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

                {/* Curriculum Tree */}
                <div className="space-y-4">
                    {curriculum.map((act) => (
                        <div
                            key={act.id}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(act.id)}
                                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl">{act.emoji}</span>
                                    <div className="text-left">
                                        <h2 className="text-xl font-bold text-white">{act.title}</h2>
                                        <p className="text-gray-400 text-sm">{act.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right text-sm">
                                        <div className="text-gray-400">
                                            {act.scenes.reduce((t, s) => t + s.steps.length, 0)} lessons
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedSection === act.id ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {/* Topics (expanded) */}
                            {expandedSection === act.id && (
                                <div className="border-t border-white/10 px-6 py-4 space-y-4">
                                    {act.scenes.map((scene) => (
                                        <div key={scene.id} className="bg-black/20 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {scene.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm">{scene.description}</p>
                                                </div>
                                            </div>

                                            {/* Lessons */}
                                            <div className="space-y-2 mt-4">
                                                {scene.steps.map((step) => (
                                                    <Link
                                                        key={step.id}
                                                        href={`/curriculum/${act.id}/${scene.id}/${step.id}`}
                                                        className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-lg px-4 py-3 transition-colors group"
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.type === 'project' ? 'bg-green-500/20 text-green-400' :
                                                                step.type === 'exercise' ? 'bg-blue-500/20 text-blue-400' :
                                                                    step.type === 'quiz' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-purple-500/20 text-purple-400'
                                                                }`}>
                                                                {step.type === 'project' ? '💻' :
                                                                    step.type === 'exercise' ? '✏️' :
                                                                        step.type === 'quiz' ? '❓' : '📖'}
                                                            </div>
                                                            <div>
                                                                <div className="text-white group-hover:text-purple-300 transition-colors">
                                                                    {step.title}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {step.estimatedMinutes} min • {step.type}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <svg
                                                            className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

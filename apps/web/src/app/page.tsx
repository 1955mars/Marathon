"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Simple Header */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🏃</span>
          <span className="text-2xl font-bold text-slate-800">Marathon</span>
        </div>
      </nav>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Curriculum */}
          <Link
            href="/curriculum"
            className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-400 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
              Curriculum
            </h3>
            <p className="text-slate-500 text-sm">
              CS fundamentals, systems, and interview prep with depth and breadth.
            </p>
          </Link>

          {/* Projects */}
          <Link
            href="/projects"
            className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-400 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
              Projects
            </h3>
            <p className="text-slate-500 text-sm">
              Build portfolio-ready projects in Python & C++ with step-by-step guidance.
            </p>
          </Link>

          {/* Code Editor */}
          <Link
            href="/exercise"
            className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-400 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
              Code Editor
            </h3>
            <p className="text-slate-500 text-sm">
              Run Python and C++ code instantly with syntax highlighting.
            </p>
          </Link>

          {/* Problem Library */}
          <Link
            href="/problems"
            className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-400 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
              Problems
            </h3>
            <p className="text-slate-500 text-sm">
              Save, tag, and track problems by pattern with spaced repetition.
            </p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p>© 2026 Marathon</p>
        </div>
      </footer>
    </div>
  );
}

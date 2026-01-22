"use client";

import Link from "next/link";
import { login, isAuthenticated } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleGetStarted = () => {
    if (authenticated) {
      router.push("/dashboard");
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Logo & Nav */}
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🏃</span>
              <span className="text-2xl font-bold text-white">Marathon</span>
            </div>
            <div className="flex items-center space-x-4">
              {authenticated ? (
                <Link
                  href="/dashboard"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Master CS Interviews
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Like a Pro
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A comprehensive preparation platform for CS graduates. From data structures
              to system design — with hands-on projects, AI tutoring, and real interview practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
              >
                Start Your Journey →
              </button>
              <Link
                href="/curriculum"
                className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center"
              >
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Structured Curriculum
            </h3>
            <p className="text-gray-400">
              5 Acts covering CS fundamentals, systems, design patterns, and interview prep
              — all with depth and breadth.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              16 Real Projects
            </h3>
            <p className="text-gray-400">
              Build portfolio-ready projects in Python & C++ — from data structures
              to distributed systems. Push directly to GitHub.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              AI Tutor
            </h3>
            <p className="text-gray-400">
              Socratic-style AI that guides you through questions instead of giving
              answers. Learn to think like an engineer.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              LeetCode Library
            </h3>
            <p className="text-gray-400">
              Save, tag, and track problems by pattern. Spaced repetition ensures
              you remember what matters.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Progress Tracking
            </h3>
            <p className="text-gray-400">
              Visual skill trees, streaks, badges, and a &quot;Ready for Interview&quot;
              score to keep you motivated.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Interview Ready
            </h3>
            <p className="text-gray-400">
              Mock interviews, system design practice, and behavioral prep —
              everything to ace your dream job.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 text-center border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Marathon?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join CS graduates who are mastering interviews with structured learning,
            real projects, and AI-powered guidance.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-block bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Get Started with GitHub
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2026 Marathon. Built for CS graduates, by engineers.</p>
        </div>
      </footer>
    </div>
  );
}

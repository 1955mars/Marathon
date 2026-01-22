"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, isAuthenticated, User } from "@/lib/auth";
import Link from "next/link";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            if (!isAuthenticated()) {
                router.push("/");
                return;
            }

            const userData = await getCurrentUser();
            if (!userData) {
                router.push("/");
                return;
            }

            setUser(userData);
            setLoading(false);
        }

        loadUser();
    }, [router]);

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <span className="text-2xl">🏃</span>
                            <span className="text-xl font-bold text-white">Marathon</span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            {user && (
                                <>
                                    <img
                                        src={user.avatar_url || "/default-avatar.png"}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full border border-purple-500/50"
                                    />
                                    <span className="text-gray-300">{user.username}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome back, {user?.username}! 👋
                    </h1>
                    <p className="text-gray-400">
                        Continue your journey to master CS interviews.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">0%</div>
                        <div className="text-gray-400">Overall Progress</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">0</div>
                        <div className="text-gray-400">Problems Solved</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">0</div>
                        <div className="text-gray-400">Projects Completed</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">0 🔥</div>
                        <div className="text-gray-400">Day Streak</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Link
                        href="/curriculum"
                        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
                    >
                        <div className="text-3xl mb-3">📚</div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300">
                            Continue Learning
                        </h3>
                        <p className="text-gray-400">
                            Pick up where you left off in the curriculum.
                        </p>
                    </Link>

                    <Link
                        href="/problems"
                        className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all group"
                    >
                        <div className="text-3xl mb-3">🎯</div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300">
                            Practice Problems
                        </h3>
                        <p className="text-gray-400">
                            Solve coding challenges from your library.
                        </p>
                    </Link>

                    <Link
                        href="/projects"
                        className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30 hover:border-green-500/50 transition-all group"
                    >
                        <div className="text-3xl mb-3">💻</div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-300">
                            Build Projects
                        </h3>
                        <p className="text-gray-400">
                            Work on portfolio-ready projects.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

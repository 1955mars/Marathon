"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, isAuthenticated, User } from "@/lib/auth";
import Link from "next/link";
import { useGamification } from "@/hooks/useGamification";
import {
    XpProgressBar,
    StreakDisplay,
    ReadinessScore,
    StatsGrid,
    AchievementsGrid,
    CompactProgressWidget,
} from "@/components/GamificationWidgets";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { progress, updateStreak, checkAchievements } = useGamification();

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

            // Update streak on dashboard visit
            updateStreak();
            // Check for new achievements
            const newAchievements = checkAchievements();
            if (newAchievements.length > 0) {
                console.log("🏆 New achievements unlocked!", newAchievements);
            }
        }

        loadUser();
    }, [router, updateStreak, checkAchievements]);

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <span className="text-2xl">🏃</span>
                            <span className="text-xl font-bold text-slate-800">Marathon</span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            {/* Compact Progress Widget in Navbar */}
                            <CompactProgressWidget />

                            {user && (
                                <>
                                    <img
                                        src={user.avatar_url || "/default-avatar.png"}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full border border-purple-400"
                                    />
                                    <span className="text-slate-600">{user.username}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-slate-500 hover:text-slate-800 transition-colors"
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        Welcome back, {user?.username}! 👋
                    </h1>
                    <p className="text-slate-500">
                        Continue your journey to master CS interviews.
                    </p>
                </div>

                {/* XP & Level Progress */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    <XpProgressBar />
                    <ReadinessScore />
                </div>

                {/* Streak Display */}
                <div className="mb-8">
                    <StreakDisplay />
                </div>

                {/* Stats Grid */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">📊 Your Stats</h2>
                    <StatsGrid />
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-slate-800 mb-4">⚡ Quick Actions</h2>
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <Link
                        href="/curriculum"
                        className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-5 border border-purple-200 hover:border-purple-400 transition-all group"
                    >
                        <div className="text-2xl mb-2">📚</div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-purple-600">
                            Continue Learning
                        </h3>
                        <p className="text-slate-500 text-sm">
                            Pick up where you left off
                        </p>
                    </Link>

                    <Link
                        href="/problems"
                        className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-5 border border-blue-200 hover:border-blue-400 transition-all group"
                    >
                        <div className="text-2xl mb-2">🎯</div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-blue-600">
                            Practice Problems
                        </h3>
                        <p className="text-slate-500 text-sm">
                            Solve coding challenges
                        </p>
                    </Link>

                    <Link
                        href="/projects"
                        className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-5 border border-green-200 hover:border-green-400 transition-all group"
                    >
                        <div className="text-2xl mb-2">💻</div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-green-600">
                            Build Projects
                        </h3>
                        <p className="text-slate-500 text-sm">
                            Work on portfolio projects
                        </p>
                    </Link>

                    <Link
                        href="/exercise"
                        className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-5 border border-orange-200 hover:border-orange-400 transition-all group"
                    >
                        <div className="text-2xl mb-2">⚡</div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-orange-600">
                            Code Editor
                        </h3>
                        <p className="text-slate-500 text-sm">
                            Practice coding
                        </p>
                    </Link>
                </div>

                {/* Achievements */}
                <AchievementsGrid />
            </div>
        </div>
    );
}

"use client";

import {
    xpToNextLevel,
    getLevelTitle,
    ACHIEVEMENTS,
    BADGES,
    RARITY_COLORS,
    Achievement,
} from "@/data/gamification";
import { useGamification } from "@/hooks/useGamification";

// XP Progress Bar Component
export function XpProgressBar() {
    const { progress } = useGamification();
    const { current, needed } = xpToNextLevel(progress.xp);
    const percentage = needed > 0 ? Math.round((current / needed) * 100) : 100;

    return (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        {progress.level}
                    </div>
                    <div>
                        <div className="text-white font-semibold text-lg">
                            Level {progress.level}
                        </div>
                        <div className="text-purple-400 text-sm">
                            {getLevelTitle(progress.level)}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                        {progress.xp.toLocaleString()} XP
                    </div>
                    <div className="text-gray-400 text-sm">
                        {needed > 0 ? `${needed - current} XP to next level` : "Max level!"}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                    <div
                        className="h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white/80">{percentage}%</span>
                </div>
            </div>
        </div>
    );
}

// Streak Display Component
export function StreakDisplay() {
    const { progress } = useGamification();

    return (
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-gray-400 text-sm mb-1">Current Streak</div>
                    <div className="flex items-center gap-2">
                        <span className="text-4xl">🔥</span>
                        <span className="text-4xl font-bold text-white">
                            {progress.currentStreak}
                        </span>
                        <span className="text-gray-400">days</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-gray-400 text-sm mb-1">Longest Streak</div>
                    <div className="text-xl font-semibold text-orange-400">
                        {progress.longestStreak} days
                    </div>
                </div>
            </div>

            {progress.currentStreak > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm text-gray-400">
                        {progress.currentStreak >= 7 && "🔥 Weekly streak bonus earned!"}
                        {progress.currentStreak >= 30 && " ☄️ Monthly streak champion!"}
                        {progress.currentStreak >= 100 && " 🏆 LEGENDARY 100-day streak!"}
                        {progress.currentStreak < 7 && `${7 - progress.currentStreak} more days for weekly bonus!`}
                    </div>
                </div>
            )}
        </div>
    );
}

// Interview Readiness Score
export function ReadinessScore() {
    const { progress } = useGamification();
    const score = progress.readinessScore;

    const getScoreColor = (s: number) => {
        if (s >= 80) return "from-green-400 to-emerald-500";
        if (s >= 60) return "from-yellow-400 to-orange-500";
        if (s >= 40) return "from-orange-400 to-red-500";
        return "from-red-400 to-red-600";
    };

    const getScoreLabel = (s: number) => {
        if (s >= 80) return "Interview Ready! 🎯";
        if (s >= 60) return "Almost There";
        if (s >= 40) return "Making Progress";
        return "Just Starting";
    };

    return (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="text-gray-400 text-sm mb-3">Interview Readiness</div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-white/10"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="url(#scoreGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                            className="transition-all duration-500"
                        />
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#A855F7" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{score}%</span>
                    </div>
                </div>
                <div>
                    <div className={`text-xl font-semibold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
                        {getScoreLabel(score)}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                        Based on curriculum, projects & problem solving
                    </div>
                </div>
            </div>
        </div>
    );
}

// Achievement Card Component
export function AchievementCard({ achievement, earned }: { achievement: Achievement; earned: boolean }) {
    return (
        <div
            className={`relative rounded-xl p-4 border transition-all ${earned
                    ? "bg-white/10 border-white/20"
                    : "bg-white/5 border-white/5 opacity-50"
                }`}
        >
            {earned && (
                <div
                    className="absolute top-2 right-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: RARITY_COLORS[achievement.rarity] }}
                />
            )}
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <div className="text-white font-semibold text-sm">{achievement.name}</div>
            <div className="text-gray-400 text-xs mt-1">{achievement.description}</div>
            <div className="mt-2 flex items-center gap-1">
                <span className="text-yellow-400 text-xs">+{achievement.xpReward} XP</span>
                <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                        backgroundColor: `${RARITY_COLORS[achievement.rarity]}20`,
                        color: RARITY_COLORS[achievement.rarity],
                    }}
                >
                    {achievement.rarity}
                </span>
            </div>
        </div>
    );
}

// Achievements Grid
export function AchievementsGrid() {
    const { progress } = useGamification();

    return (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">🏆 Achievements</h3>
                <span className="text-sm text-gray-400">
                    {progress.achievements.length} / {ACHIEVEMENTS.length} unlocked
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {ACHIEVEMENTS.map((achievement) => (
                    <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        earned={progress.achievements.includes(achievement.id)}
                    />
                ))}
            </div>
        </div>
    );
}

// Stats Grid
export function StatsGrid() {
    const { progress } = useGamification();

    const stats = [
        { label: "Steps Completed", value: progress.stepsCompleted.length, icon: "📚" },
        { label: "Scenes Completed", value: progress.scenesCompleted.length, icon: "🎬" },
        { label: "Acts Completed", value: progress.actsCompleted.length, icon: "🎭" },
        { label: "Projects Built", value: progress.projectsCompleted.length, icon: "🔨" },
        { label: "Problems Solved", value: progress.problemsSolved.length, icon: "🧩" },
        { label: "Code Runs", value: progress.codeRuns, icon: "💻" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 text-center"
                >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

// Badges Display
export function BadgesDisplay() {
    const { progress } = useGamification();

    return (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">🏅 Badges</h3>
            <div className="flex flex-wrap gap-3">
                {BADGES.map((badge) => {
                    const earned = progress.badges.includes(badge.id);
                    return (
                        <div
                            key={badge.id}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${earned
                                    ? "bg-white/10 border-white/20"
                                    : "bg-white/5 border-white/5 opacity-40"
                                }`}
                            title={badge.description}
                        >
                            <span className="text-xl">{badge.icon}</span>
                            <span className="text-sm text-white font-medium">{badge.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Compact Progress Widget (for navbar/sidebar)
export function CompactProgressWidget() {
    const { progress } = useGamification();
    const { current, needed } = xpToNextLevel(progress.xp);
    const percentage = needed > 0 ? Math.round((current / needed) * 100) : 100;

    return (
        <div className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white">
                {progress.level}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white font-medium">{progress.xp} XP</span>
                    {progress.currentStreak > 0 && (
                        <span className="text-orange-400">🔥 {progress.currentStreak}</span>
                    )}
                </div>
                <div className="w-24 bg-white/10 rounded-full h-1.5">
                    <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

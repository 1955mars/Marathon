"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import {
    UserProgress,
    DEFAULT_PROGRESS,
    XP_REWARDS,
    calculateLevel,
    calculateReadinessScore,
    ACHIEVEMENTS,
    Achievement,
} from "@/data/gamification";

// Storage key
const STORAGE_KEY = "marathon_progress";

interface GamificationContextType {
    progress: UserProgress;
    addXp: (amount: number, reason?: string) => void;
    completeStep: (stepId: string) => void;
    completeScene: (sceneId: string) => void;
    completeAct: (actId: string) => void;
    completeProject: (projectId: string) => void;
    solveProblem: (problemId: string) => void;
    recordCodeRun: (success: boolean, language: string) => void;
    updateStreak: () => void;
    checkAchievements: () => Achievement[];
    resetProgress: () => void;
}

const GamificationContext = createContext<GamificationContextType | null>(null);

export function GamificationProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
    const [initialized, setInitialized] = useState(false);

    // Load progress from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setProgress({ ...DEFAULT_PROGRESS, ...parsed });
                } catch (e) {
                    console.error("Failed to parse saved progress:", e);
                }
            }
            setInitialized(true);
        }
    }, []);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        if (initialized && typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        }
    }, [progress, initialized]);

    // Add XP and recalculate level
    const addXp = useCallback((amount: number, reason?: string) => {
        setProgress((prev) => {
            const newXp = prev.xp + amount;
            const newLevel = calculateLevel(newXp);
            if (reason) {
                console.log(`🎮 +${amount} XP: ${reason}`);
            }
            return {
                ...prev,
                xp: newXp,
                level: newLevel,
                readinessScore: calculateReadinessScore({ ...prev, xp: newXp }),
            };
        });
    }, []);

    // Complete a curriculum step
    const completeStep = useCallback((stepId: string) => {
        setProgress((prev) => {
            if (prev.stepsCompleted.includes(stepId)) return prev;
            const updated = {
                ...prev,
                stepsCompleted: [...prev.stepsCompleted, stepId],
            };
            return {
                ...updated,
                xp: prev.xp + XP_REWARDS.STEP_COMPLETED,
                level: calculateLevel(prev.xp + XP_REWARDS.STEP_COMPLETED),
                readinessScore: calculateReadinessScore(updated),
            };
        });
    }, []);

    // Complete a scene
    const completeScene = useCallback((sceneId: string) => {
        setProgress((prev) => {
            if (prev.scenesCompleted.includes(sceneId)) return prev;
            const updated = {
                ...prev,
                scenesCompleted: [...prev.scenesCompleted, sceneId],
            };
            return {
                ...updated,
                xp: prev.xp + XP_REWARDS.SCENE_COMPLETED,
                level: calculateLevel(prev.xp + XP_REWARDS.SCENE_COMPLETED),
                readinessScore: calculateReadinessScore(updated),
            };
        });
    }, []);

    // Complete an act
    const completeAct = useCallback((actId: string) => {
        setProgress((prev) => {
            if (prev.actsCompleted.includes(actId)) return prev;
            const updated = {
                ...prev,
                actsCompleted: [...prev.actsCompleted, actId],
            };
            return {
                ...updated,
                xp: prev.xp + XP_REWARDS.ACT_COMPLETED,
                level: calculateLevel(prev.xp + XP_REWARDS.ACT_COMPLETED),
                readinessScore: calculateReadinessScore(updated),
            };
        });
    }, []);

    // Complete a project
    const completeProject = useCallback((projectId: string) => {
        setProgress((prev) => {
            if (prev.projectsCompleted.includes(projectId)) return prev;
            const updated = {
                ...prev,
                projectsCompleted: [...prev.projectsCompleted, projectId],
            };
            return {
                ...updated,
                xp: prev.xp + XP_REWARDS.PROJECT_COMPLETED,
                level: calculateLevel(prev.xp + XP_REWARDS.PROJECT_COMPLETED),
                readinessScore: calculateReadinessScore(updated),
            };
        });
    }, []);

    // Solve a problem
    const solveProblem = useCallback((problemId: string) => {
        setProgress((prev) => {
            if (prev.problemsSolved.includes(problemId)) return prev;
            const updated = {
                ...prev,
                problemsSolved: [...prev.problemsSolved, problemId],
            };
            return {
                ...updated,
                xp: prev.xp + XP_REWARDS.PROBLEM_SOLVED_MEDIUM,
                level: calculateLevel(prev.xp + XP_REWARDS.PROBLEM_SOLVED_MEDIUM),
                readinessScore: calculateReadinessScore(updated),
            };
        });
    }, []);

    // Record a code run
    const recordCodeRun = useCallback((success: boolean, language: string) => {
        setProgress((prev) => {
            const xpGain = success ? XP_REWARDS.CODE_SUCCESS : XP_REWARDS.CODE_RUN;
            const languagesUsed = prev.languagesUsed.includes(language)
                ? prev.languagesUsed
                : [...prev.languagesUsed, language];

            return {
                ...prev,
                codeRuns: prev.codeRuns + 1,
                successfulRuns: success ? prev.successfulRuns + 1 : prev.successfulRuns,
                languagesUsed,
                xp: prev.xp + xpGain,
                level: calculateLevel(prev.xp + xpGain),
            };
        });
    }, []);

    // Update streak (call on daily login)
    const updateStreak = useCallback(() => {
        const today = new Date().toDateString();
        setProgress((prev) => {
            if (prev.lastActiveDate === today) return prev;

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const wasActiveYesterday = prev.lastActiveDate === yesterday.toDateString();

            const newStreak = wasActiveYesterday ? prev.currentStreak + 1 : 1;
            const longestStreak = Math.max(newStreak, prev.longestStreak);

            // Calculate streak bonus XP
            let bonusXp = XP_REWARDS.DAILY_LOGIN;
            if (newStreak === 7) bonusXp += XP_REWARDS.STREAK_BONUS_7_DAYS;
            if (newStreak === 30) bonusXp += XP_REWARDS.STREAK_BONUS_30_DAYS;
            if (newStreak === 100) bonusXp += XP_REWARDS.STREAK_BONUS_100_DAYS;

            return {
                ...prev,
                currentStreak: newStreak,
                longestStreak,
                lastActiveDate: today,
                xp: prev.xp + bonusXp,
                level: calculateLevel(prev.xp + bonusXp),
            };
        });
    }, []);

    // Check and award achievements
    const checkAchievements = useCallback((): Achievement[] => {
        const newAchievements: Achievement[] = [];

        ACHIEVEMENTS.forEach((achievement) => {
            if (progress.achievements.includes(achievement.id)) return;

            let earned = false;
            const target = achievement.condition.target;

            switch (achievement.condition.type) {
                case "steps_completed":
                    earned = progress.stepsCompleted.length >= target;
                    break;
                case "scenes_completed":
                    earned = progress.scenesCompleted.length >= target;
                    break;
                case "acts_completed":
                    earned = progress.actsCompleted.length >= target;
                    break;
                case "code_runs":
                    earned = progress.codeRuns >= target;
                    break;
                case "successful_runs":
                    earned = progress.successfulRuns >= target;
                    break;
                case "problems_solved":
                    earned = progress.problemsSolved.length >= target;
                    break;
                case "projects_completed":
                    earned = progress.projectsCompleted.length >= target;
                    break;
                case "streak_days":
                    earned = progress.currentStreak >= target;
                    break;
                case "languages_used":
                    earned = progress.languagesUsed.length >= target;
                    break;
                case "readiness_score":
                    earned = progress.readinessScore >= target;
                    break;
            }

            if (earned) {
                newAchievements.push(achievement);
            }
        });

        // Award new achievements
        if (newAchievements.length > 0) {
            setProgress((prev) => {
                const newAchievementIds = newAchievements.map((a) => a.id);
                const totalXpGain = newAchievements.reduce((sum, a) => sum + a.xpReward, 0);
                return {
                    ...prev,
                    achievements: [...prev.achievements, ...newAchievementIds],
                    xp: prev.xp + totalXpGain,
                    level: calculateLevel(prev.xp + totalXpGain),
                };
            });
        }

        return newAchievements;
    }, [progress]);

    // Reset progress
    const resetProgress = useCallback(() => {
        setProgress(DEFAULT_PROGRESS);
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    return (
        <GamificationContext.Provider
            value={{
                progress,
                addXp,
                completeStep,
                completeScene,
                completeAct,
                completeProject,
                solveProblem,
                recordCodeRun,
                updateStreak,
                checkAchievements,
                resetProgress,
            }}
        >
            {children}
        </GamificationContext.Provider>
    );
}

export function useGamification() {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error("useGamification must be used within a GamificationProvider");
    }
    return context;
}

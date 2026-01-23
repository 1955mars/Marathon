// ============================================================================
// MARATHON GAMIFICATION SYSTEM
// XP, Levels, Streaks, Achievements, and Badges
// ============================================================================

// XP rewards for different activities
export const XP_REWARDS = {
    // Learning activities
    STEP_COMPLETED: 25,
    SCENE_COMPLETED: 100,
    ACT_COMPLETED: 500,

    // Coding activities
    CODE_RUN: 5,
    CODE_SUCCESS: 10,
    PROBLEM_SOLVED_EASY: 15,
    PROBLEM_SOLVED_MEDIUM: 30,
    PROBLEM_SOLVED_HARD: 50,

    // Projects
    PROJECT_STEP_COMPLETED: 50,
    PROJECT_COMPLETED: 200,

    // Streaks & consistency
    DAILY_LOGIN: 10,
    STREAK_BONUS_7_DAYS: 100,
    STREAK_BONUS_30_DAYS: 500,
    STREAK_BONUS_100_DAYS: 2000,

    // Social & learning
    FIRST_CODE_RUN: 50,
    FIRST_PROJECT: 100,
    FIRST_PROBLEM: 50,
} as const;

// Level thresholds (XP required to reach each level)
export const LEVEL_THRESHOLDS = [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    500,    // Level 4
    850,    // Level 5
    1300,   // Level 6
    1900,   // Level 7
    2600,   // Level 8
    3500,   // Level 9
    4600,   // Level 10
    5900,   // Level 11
    7500,   // Level 12
    9400,   // Level 13
    11700,  // Level 14
    14500,  // Level 15
    17800,  // Level 16
    21700,  // Level 17
    26300,  // Level 18
    31700,  // Level 19
    38000,  // Level 20 (max for now)
];

export const LEVEL_TITLES = [
    "Novice",           // Level 1
    "Beginner",         // Level 2
    "Learner",          // Level 3
    "Apprentice",       // Level 4
    "Student",          // Level 5
    "Practitioner",     // Level 6
    "Developer",        // Level 7
    "Engineer",         // Level 8
    "Specialist",       // Level 9
    "Expert",           // Level 10
    "Senior",           // Level 11
    "Lead",             // Level 12
    "Architect",        // Level 13
    "Principal",        // Level 14
    "Distinguished",    // Level 15
    "Staff",            // Level 16
    "Senior Staff",     // Level 17
    "Fellow",           // Level 18
    "Master",           // Level 19
    "Legend",           // Level 20
];

// Achievement definitions
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    xpReward: number;
    category: "learning" | "coding" | "projects" | "consistency" | "mastery";
    condition: {
        type: string;
        target: number;
    };
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export const ACHIEVEMENTS: Achievement[] = [
    // Learning Achievements
    {
        id: "first-step",
        name: "First Step",
        description: "Complete your first curriculum step",
        icon: "👣",
        xpReward: 50,
        category: "learning",
        condition: { type: "steps_completed", target: 1 },
        rarity: "common",
    },
    {
        id: "scene-setter",
        name: "Scene Setter",
        description: "Complete your first scene",
        icon: "🎬",
        xpReward: 100,
        category: "learning",
        condition: { type: "scenes_completed", target: 1 },
        rarity: "common",
    },
    {
        id: "act-ive-learner",
        name: "Act-ive Learner",
        description: "Complete your first Act",
        icon: "🎭",
        xpReward: 500,
        category: "learning",
        condition: { type: "acts_completed", target: 1 },
        rarity: "rare",
    },
    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        description: "Complete 10 curriculum steps",
        icon: "📚",
        xpReward: 150,
        category: "learning",
        condition: { type: "steps_completed", target: 10 },
        rarity: "uncommon",
    },
    {
        id: "curriculum-master",
        name: "Curriculum Master",
        description: "Complete all 5 Acts",
        icon: "🎓",
        xpReward: 2000,
        category: "learning",
        condition: { type: "acts_completed", target: 5 },
        rarity: "legendary",
    },

    // Coding Achievements
    {
        id: "hello-world",
        name: "Hello, World!",
        description: "Run your first piece of code",
        icon: "💻",
        xpReward: 50,
        category: "coding",
        condition: { type: "code_runs", target: 1 },
        rarity: "common",
    },
    {
        id: "bug-squasher",
        name: "Bug Squasher",
        description: "Successfully run code 10 times",
        icon: "🐛",
        xpReward: 100,
        category: "coding",
        condition: { type: "successful_runs", target: 10 },
        rarity: "uncommon",
    },
    {
        id: "code-warrior",
        name: "Code Warrior",
        description: "Run code 100 times",
        icon: "⚔️",
        xpReward: 250,
        category: "coding",
        condition: { type: "code_runs", target: 100 },
        rarity: "rare",
    },
    {
        id: "polyglot",
        name: "Polyglot",
        description: "Run code in both Python and C++",
        icon: "🌍",
        xpReward: 100,
        category: "coding",
        condition: { type: "languages_used", target: 2 },
        rarity: "uncommon",
    },

    // Problem Solving Achievements
    {
        id: "problem-solver",
        name: "Problem Solver",
        description: "Solve your first problem",
        icon: "🧩",
        xpReward: 50,
        category: "coding",
        condition: { type: "problems_solved", target: 1 },
        rarity: "common",
    },
    {
        id: "persistent",
        name: "Persistent",
        description: "Solve 10 problems",
        icon: "💪",
        xpReward: 200,
        category: "coding",
        condition: { type: "problems_solved", target: 10 },
        rarity: "uncommon",
    },
    {
        id: "leetcode-legend",
        name: "LeetCode Legend",
        description: "Solve 50 problems",
        icon: "🏆",
        xpReward: 500,
        category: "coding",
        condition: { type: "problems_solved", target: 50 },
        rarity: "epic",
    },

    // Project Achievements
    {
        id: "builder",
        name: "Builder",
        description: "Complete your first project",
        icon: "🔨",
        xpReward: 200,
        category: "projects",
        condition: { type: "projects_completed", target: 1 },
        rarity: "uncommon",
    },
    {
        id: "architect",
        name: "Architect",
        description: "Complete 4 projects",
        icon: "🏗️",
        xpReward: 500,
        category: "projects",
        condition: { type: "projects_completed", target: 4 },
        rarity: "rare",
    },
    {
        id: "portfolio-pro",
        name: "Portfolio Pro",
        description: "Complete all guided projects",
        icon: "💼",
        xpReward: 1000,
        category: "projects",
        condition: { type: "all_projects_completed", target: 1 },
        rarity: "epic",
    },

    // Streak Achievements
    {
        id: "consistent",
        name: "Consistent",
        description: "Maintain a 3-day streak",
        icon: "🔥",
        xpReward: 50,
        category: "consistency",
        condition: { type: "streak_days", target: 3 },
        rarity: "common",
    },
    {
        id: "dedicated",
        name: "Dedicated",
        description: "Maintain a 7-day streak",
        icon: "🔥🔥",
        xpReward: 100,
        category: "consistency",
        condition: { type: "streak_days", target: 7 },
        rarity: "uncommon",
    },
    {
        id: "unstoppable",
        name: "Unstoppable",
        description: "Maintain a 30-day streak",
        icon: "☄️",
        xpReward: 500,
        category: "consistency",
        condition: { type: "streak_days", target: 30 },
        rarity: "rare",
    },
    {
        id: "marathon-runner",
        name: "Marathon Runner",
        description: "Maintain a 100-day streak",
        icon: "🏃‍♂️",
        xpReward: 2000,
        category: "consistency",
        condition: { type: "streak_days", target: 100 },
        rarity: "legendary",
    },

    // Mastery Achievements
    {
        id: "speed-demon",
        name: "Speed Demon",
        description: "Solve a problem in under 5 minutes",
        icon: "⚡",
        xpReward: 100,
        category: "mastery",
        condition: { type: "fast_solve", target: 5 },
        rarity: "uncommon",
    },
    {
        id: "perfectionist",
        name: "Perfectionist",
        description: "Get 100% on a quiz or assessment",
        icon: "💯",
        xpReward: 150,
        category: "mastery",
        condition: { type: "perfect_score", target: 1 },
        rarity: "rare",
    },
    {
        id: "interview-ready",
        name: "Interview Ready",
        description: "Reach 80% readiness score",
        icon: "🎯",
        xpReward: 1000,
        category: "mastery",
        condition: { type: "readiness_score", target: 80 },
        rarity: "epic",
    },
];

// Badge definitions (visual badges for profile)
export interface Badge {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    category: string;
}

export const BADGES: Badge[] = [
    // Act Completion Badges
    { id: "act-0", name: "Language Foundations", icon: "🐍", color: "#3B82F6", description: "Completed Act 0", category: "acts" },
    { id: "act-1", name: "CS Foundations", icon: "🌳", color: "#10B981", description: "Completed Act 1", category: "acts" },
    { id: "act-2", name: "Systems Expert", icon: "⚙️", color: "#F59E0B", description: "Completed Act 2", category: "acts" },
    { id: "act-3", name: "System Designer", icon: "🏛️", color: "#8B5CF6", description: "Completed Act 3", category: "acts" },
    { id: "act-4", name: "Interview Ready", icon: "🎯", color: "#EF4444", description: "Completed Act 4", category: "acts" },

    // Skill Badges
    { id: "python-pro", name: "Python Pro", icon: "🐍", color: "#3776AB", description: "Mastered Python", category: "skills" },
    { id: "cpp-craftsman", name: "C++ Craftsman", icon: "⚡", color: "#00599C", description: "Mastered C++", category: "skills" },
    { id: "algo-ace", name: "Algorithm Ace", icon: "🧮", color: "#059669", description: "Mastered Algorithms", category: "skills" },
    { id: "data-wizard", name: "Data Wizard", icon: "📊", color: "#7C3AED", description: "Mastered Data Structures", category: "skills" },
    { id: "system-sage", name: "System Sage", icon: "🖥️", color: "#DC2626", description: "Mastered System Design", category: "skills" },

    // Special Badges
    { id: "early-adopter", name: "Early Adopter", icon: "🌟", color: "#F59E0B", description: "Joined during beta", category: "special" },
    { id: "streak-master", name: "Streak Master", icon: "🔥", color: "#EF4444", description: "100-day streak", category: "special" },
    { id: "all-star", name: "All Star", icon: "⭐", color: "#FBBF24", description: "Earned all achievements", category: "special" },
];

// User progress interface
export interface UserProgress {
    xp: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;

    // Completion tracking
    stepsCompleted: string[];
    scenesCompleted: string[];
    actsCompleted: string[];
    projectsCompleted: string[];
    problemsSolved: string[];

    // Code stats
    codeRuns: number;
    successfulRuns: number;
    languagesUsed: string[];

    // Achievements & badges
    achievements: string[];
    badges: string[];

    // Readiness score (0-100)
    readinessScore: number;
}

// Calculate level from XP
export function calculateLevel(xp: number): number {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
            return i + 1;
        }
    }
    return 1;
}

// Get XP needed for next level
export function xpToNextLevel(xp: number): { current: number; needed: number; total: number } {
    const level = calculateLevel(xp);
    if (level >= LEVEL_THRESHOLDS.length) {
        return { current: 0, needed: 0, total: xp };
    }
    const currentLevelXp = LEVEL_THRESHOLDS[level - 1];
    const nextLevelXp = LEVEL_THRESHOLDS[level];
    return {
        current: xp - currentLevelXp,
        needed: nextLevelXp - currentLevelXp,
        total: xp,
    };
}

// Get level title
export function getLevelTitle(level: number): string {
    return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
}

// Calculate readiness score based on progress
export function calculateReadinessScore(progress: UserProgress): number {
    // Weighted components
    const weights = {
        acts: 30,       // 30% from curriculum completion
        projects: 25,   // 25% from projects
        problems: 25,   // 25% from problem solving
        consistency: 20 // 20% from consistency/streaks
    };

    const actScore = (progress.actsCompleted.length / 5) * weights.acts;
    const projectScore = (progress.projectsCompleted.length / 4) * weights.projects;
    const problemScore = Math.min(progress.problemsSolved.length / 50, 1) * weights.problems;
    const streakScore = Math.min(progress.currentStreak / 30, 1) * weights.consistency;

    return Math.round(actScore + projectScore + problemScore + streakScore);
}

// Default empty progress
export const DEFAULT_PROGRESS: UserProgress = {
    xp: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: "",
    stepsCompleted: [],
    scenesCompleted: [],
    actsCompleted: [],
    projectsCompleted: [],
    problemsSolved: [],
    codeRuns: 0,
    successfulRuns: 0,
    languagesUsed: [],
    achievements: [],
    badges: [],
    readinessScore: 0,
};

// Rarity colors for achievements
export const RARITY_COLORS = {
    common: "#9CA3AF",      // gray
    uncommon: "#22C55E",    // green
    rare: "#3B82F6",        // blue
    epic: "#A855F7",        // purple
    legendary: "#F59E0B",   // orange/gold
};

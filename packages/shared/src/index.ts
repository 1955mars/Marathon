/**
 * Marathon Shared Types & Utilities
 */

// User types
export interface User {
    id: string;
    githubId: string;
    username: string;
    email: string | null;
    avatarUrl: string | null;
    createdAt: Date;
}

// Progress types
export type StepStatus = 'not_started' | 'in_progress' | 'completed';

export interface StepProgress {
    userId: string;
    stepId: string;
    status: StepStatus;
    completedAt: Date | null;
    timeSpentMinutes: number;
}

// Curriculum types
export interface Act {
    id: string;
    number: number;
    title: string;
    description: string;
    scenes: Scene[];
}

export interface Scene {
    id: string;
    actId: string;
    number: number;
    title: string;
    steps: Step[];
}

export interface Step {
    id: string;
    sceneId: string;
    number: number;
    title: string;
    type: 'read' | 'exercise' | 'project';
    content?: string;
}

// Problem types (LeetCode library)
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ProblemStatus = 'not_started' | 'attempted' | 'solved';

export interface Problem {
    id: string;
    userId: string;
    title: string;
    url: string;
    difficulty: Difficulty;
    tags: string[];
    pattern: string | null;
    notes: string | null;
    status: ProblemStatus;
    createdAt: Date;
    lastAttemptedAt: Date | null;
}

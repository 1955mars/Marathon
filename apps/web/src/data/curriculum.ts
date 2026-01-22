/**
 * Curriculum Data Structure
 * Acts → Scenes → Steps → Tasks
 */

export type StepType = 'read' | 'exercise' | 'project' | 'quiz';
export type StepStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export interface Step {
    id: string;
    number: number;
    title: string;
    type: StepType;
    estimatedMinutes: number;
    tasks?: Task[];
}

export interface Scene {
    id: string;
    number: number;
    title: string;
    description: string;
    steps: Step[];
}

export interface Act {
    id: string;
    number: number;
    title: string;
    description: string;
    emoji: string;
    scenes: Scene[];
}

// Full Curriculum Data
export const curriculum: Act[] = [
    {
        id: 'act-0',
        number: 0,
        title: 'Language Foundations',
        description: 'Build fluency in Python and C++ before diving into CS fundamentals.',
        emoji: '🐍',
        scenes: [
            {
                id: 'scene-0-1',
                number: 1,
                title: 'Python Mastery',
                description: 'Master Python from basics to advanced idioms.',
                steps: [
                    { id: 'step-0-1-1', number: 1, title: 'Python Basics', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-0-1-2', number: 2, title: 'Data Structures in Python', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-0-1-3', number: 3, title: 'OOP in Python', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-0-1-4', number: 4, title: 'Functional Python', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-0-1-5', number: 5, title: 'Pythonic Idioms', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-0-1-6', number: 6, title: 'Python Exercises', type: 'exercise', estimatedMinutes: 60 },
                ],
            },
            {
                id: 'scene-0-2',
                number: 2,
                title: 'C++ Mastery',
                description: 'Master C++ from basics to modern features.',
                steps: [
                    { id: 'step-0-2-1', number: 1, title: 'C++ Basics', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-0-2-2', number: 2, title: 'Memory Management', type: 'read', estimatedMinutes: 50 },
                    { id: 'step-0-2-3', number: 3, title: 'OOP in C++', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-0-2-4', number: 4, title: 'Modern C++ (11/14/17)', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-0-2-5', number: 5, title: 'STL Essentials', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-0-2-6', number: 6, title: 'C++ Exercises', type: 'exercise', estimatedMinutes: 60 },
                ],
            },
            {
                id: 'scene-0-3',
                number: 3,
                title: 'Language Comparison',
                description: 'Compare Python and C++ through hands-on implementation.',
                steps: [
                    { id: 'step-0-3-1', number: 1, title: 'Project P0a: Python Toolkit', type: 'project', estimatedMinutes: 120 },
                    { id: 'step-0-3-2', number: 2, title: 'Project P0b: C++ Fundamentals Lab', type: 'project', estimatedMinutes: 120 },
                ],
            },
        ],
    },
    {
        id: 'act-1',
        number: 1,
        title: 'Foundations of CS',
        description: 'Master the timeless fundamentals that transcend languages and domains.',
        emoji: '🧱',
        scenes: [
            {
                id: 'scene-1-1',
                number: 1,
                title: 'Data Structures',
                description: 'Arrays, Lists, Trees, Graphs, and more.',
                steps: [
                    { id: 'step-1-1-1', number: 1, title: 'Arrays & Dynamic Arrays', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-1-1-2', number: 2, title: 'Linked Lists', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-1-1-3', number: 3, title: 'Stacks & Queues', type: 'read', estimatedMinutes: 25 },
                    { id: 'step-1-1-4', number: 4, title: 'Hash Tables', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-1-1-5', number: 5, title: 'Trees & BST', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-1-1-6', number: 6, title: 'Heaps', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-1-1-7', number: 7, title: 'Graphs', type: 'read', estimatedMinutes: 50 },
                    { id: 'step-1-1-8', number: 8, title: 'Tries', type: 'read', estimatedMinutes: 30 },
                ],
            },
            {
                id: 'scene-1-2',
                number: 2,
                title: 'Algorithms',
                description: 'Sorting, searching, and problem-solving patterns.',
                steps: [
                    { id: 'step-1-2-1', number: 1, title: 'Big O Notation', type: 'read', estimatedMinutes: 25 },
                    { id: 'step-1-2-2', number: 2, title: 'Sorting Algorithms', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-1-2-3', number: 3, title: 'Binary Search', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-1-2-4', number: 4, title: 'Two Pointers & Sliding Window', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-1-2-5', number: 5, title: 'Dynamic Programming', type: 'read', estimatedMinutes: 60 },
                    { id: 'step-1-2-6', number: 6, title: 'Greedy Algorithms', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-1-2-7', number: 7, title: 'Graph Algorithms', type: 'read', estimatedMinutes: 50 },
                    { id: 'step-1-2-8', number: 8, title: 'Backtracking', type: 'read', estimatedMinutes: 40 },
                ],
            },
            {
                id: 'scene-1-3',
                number: 3,
                title: 'Recursion & Math',
                description: 'Mathematical thinking for CS.',
                steps: [
                    { id: 'step-1-3-1', number: 1, title: 'Recursion Fundamentals', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-1-3-2', number: 2, title: 'Bit Manipulation', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-1-3-3', number: 3, title: 'Math for CS', type: 'read', estimatedMinutes: 40 },
                ],
            },
            {
                id: 'scene-1-4',
                number: 4,
                title: 'Foundations Projects',
                description: 'Apply your knowledge with hands-on projects.',
                steps: [
                    { id: 'step-1-4-1', number: 1, title: 'Project P1: Data Structures Library', type: 'project', estimatedMinutes: 180 },
                    { id: 'step-1-4-2', number: 2, title: 'Project P2: Algorithm Visualizer', type: 'project', estimatedMinutes: 150 },
                    { id: 'step-1-4-3', number: 3, title: 'Project P3: Recursive Problem Set', type: 'project', estimatedMinutes: 120 },
                    { id: 'step-1-4-4', number: 4, title: 'Project P4: Bit Manipulation Toolkit', type: 'project', estimatedMinutes: 90 },
                ],
            },
        ],
    },
    {
        id: 'act-2',
        number: 2,
        title: 'Systems & Low-Level',
        description: 'Understand how software interacts with hardware and the OS.',
        emoji: '⚙️',
        scenes: [
            {
                id: 'scene-2-1',
                number: 1,
                title: 'Operating Systems',
                description: 'Processes, threads, memory, and scheduling.',
                steps: [
                    { id: 'step-2-1-1', number: 1, title: 'Processes & Threads', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-2-1-2', number: 2, title: 'Memory Management', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-2-1-3', number: 3, title: 'Concurrency & Synchronization', type: 'read', estimatedMinutes: 50 },
                    { id: 'step-2-1-4', number: 4, title: 'File Systems', type: 'read', estimatedMinutes: 35 },
                ],
            },
            {
                id: 'scene-2-2',
                number: 2,
                title: 'Computer Networks',
                description: 'TCP/IP, HTTP, and network programming.',
                steps: [
                    { id: 'step-2-2-1', number: 1, title: 'OSI Model & TCP/IP', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-2-2-2', number: 2, title: 'HTTP & REST', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-2-2-3', number: 3, title: 'Socket Programming', type: 'read', estimatedMinutes: 40 },
                ],
            },
            {
                id: 'scene-2-3',
                number: 3,
                title: 'Databases',
                description: 'SQL, indexing, and storage engines.',
                steps: [
                    { id: 'step-2-3-1', number: 1, title: 'SQL Fundamentals', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-2-3-2', number: 2, title: 'Indexing & B-Trees', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-2-3-3', number: 3, title: 'Transactions & ACID', type: 'read', estimatedMinutes: 30 },
                ],
            },
            {
                id: 'scene-2-4',
                number: 4,
                title: 'Systems Projects',
                description: 'Build real systems from scratch.',
                steps: [
                    { id: 'step-2-4-1', number: 1, title: 'Project P5: Mini Shell', type: 'project', estimatedMinutes: 180 },
                    { id: 'step-2-4-2', number: 2, title: 'Project P6: HTTP Server', type: 'project', estimatedMinutes: 180 },
                    { id: 'step-2-4-3', number: 3, title: 'Project P7: Database Query Engine', type: 'project', estimatedMinutes: 200 },
                    { id: 'step-2-4-4', number: 4, title: 'Project P8: Thread Pool', type: 'project', estimatedMinutes: 120 },
                ],
            },
        ],
    },
    {
        id: 'act-3',
        number: 3,
        title: 'System Design',
        description: 'Design systems that serve millions of users reliably.',
        emoji: '🏗️',
        scenes: [
            {
                id: 'scene-3-1',
                number: 1,
                title: 'Distributed Systems',
                description: 'Consensus, consistency, and partitioning.',
                steps: [
                    { id: 'step-3-1-1', number: 1, title: 'CAP Theorem & Trade-offs', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-3-1-2', number: 2, title: 'Consistency Models', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-3-1-3', number: 3, title: 'Replication & Partitioning', type: 'read', estimatedMinutes: 45 },
                ],
            },
            {
                id: 'scene-3-2',
                number: 2,
                title: 'Scalability Patterns',
                description: 'Load balancing, caching, and queues.',
                steps: [
                    { id: 'step-3-2-1', number: 1, title: 'Load Balancing', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-3-2-2', number: 2, title: 'Caching Strategies', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-3-2-3', number: 3, title: 'Message Queues', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-3-2-4', number: 4, title: 'Rate Limiting', type: 'read', estimatedMinutes: 25 },
                ],
            },
            {
                id: 'scene-3-3',
                number: 3,
                title: 'Design Case Studies',
                description: 'Real-world system design examples.',
                steps: [
                    { id: 'step-3-3-1', number: 1, title: 'URL Shortener', type: 'read', estimatedMinutes: 40 },
                    { id: 'step-3-3-2', number: 2, title: 'Twitter Feed', type: 'read', estimatedMinutes: 50 },
                    { id: 'step-3-3-3', number: 3, title: 'Chat System', type: 'read', estimatedMinutes: 45 },
                ],
            },
            {
                id: 'scene-3-4',
                number: 4,
                title: 'Scale Projects',
                description: 'Build distributed systems.',
                steps: [
                    { id: 'step-3-4-1', number: 1, title: 'Project P10: Distributed KV Store', type: 'project', estimatedMinutes: 240 },
                    { id: 'step-3-4-2', number: 2, title: 'Project P11: Load Balancer', type: 'project', estimatedMinutes: 150 },
                    { id: 'step-3-4-3', number: 3, title: 'Project P12: LRU Cache', type: 'project', estimatedMinutes: 90 },
                ],
            },
        ],
    },
    {
        id: 'act-4',
        number: 4,
        title: 'Interview Ready',
        description: 'Synthesize knowledge and perform under pressure.',
        emoji: '🎯',
        scenes: [
            {
                id: 'scene-4-1',
                number: 1,
                title: 'Coding Interviews',
                description: 'LeetCode patterns and problem solving.',
                steps: [
                    { id: 'step-4-1-1', number: 1, title: 'Problem-Solving Framework', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-4-1-2', number: 2, title: 'Common Patterns', type: 'read', estimatedMinutes: 45 },
                    { id: 'step-4-1-3', number: 3, title: 'Mock Coding Interview', type: 'exercise', estimatedMinutes: 60 },
                ],
            },
            {
                id: 'scene-4-2',
                number: 2,
                title: 'System Design Interviews',
                description: 'Whiteboard approach and trade-offs.',
                steps: [
                    { id: 'step-4-2-1', number: 1, title: 'SD Interview Framework', type: 'read', estimatedMinutes: 35 },
                    { id: 'step-4-2-2', number: 2, title: 'Handling Ambiguity', type: 'read', estimatedMinutes: 25 },
                    { id: 'step-4-2-3', number: 3, title: 'Mock SD Interview', type: 'exercise', estimatedMinutes: 60 },
                ],
            },
            {
                id: 'scene-4-3',
                number: 3,
                title: 'Behavioral & Soft Skills',
                description: 'STAR method and leadership narratives.',
                steps: [
                    { id: 'step-4-3-1', number: 1, title: 'STAR Method', type: 'read', estimatedMinutes: 20 },
                    { id: 'step-4-3-2', number: 2, title: 'Common Questions', type: 'read', estimatedMinutes: 30 },
                    { id: 'step-4-3-3', number: 3, title: 'Your Story Prep', type: 'exercise', estimatedMinutes: 45 },
                ],
            },
            {
                id: 'scene-4-4',
                number: 4,
                title: 'Capstone',
                description: 'Final synthesis project.',
                steps: [
                    { id: 'step-4-4-1', number: 1, title: 'Project P13: Mini Twitter Design', type: 'project', estimatedMinutes: 300 },
                    { id: 'step-4-4-2', number: 2, title: 'Project P14: CI/CD Pipeline', type: 'project', estimatedMinutes: 120 },
                ],
            },
        ],
    },
];

// Helper functions
export function getAct(actId: string): Act | undefined {
    return curriculum.find(a => a.id === actId);
}

export function getScene(actId: string, sceneId: string): Scene | undefined {
    const act = getAct(actId);
    return act?.scenes.find(s => s.id === sceneId);
}

export function getStep(actId: string, sceneId: string, stepId: string): Step | undefined {
    const scene = getScene(actId, sceneId);
    return scene?.steps.find(s => s.id === stepId);
}

export function getTotalSteps(): number {
    return curriculum.reduce((total, act) =>
        total + act.scenes.reduce((sceneTotal, scene) =>
            sceneTotal + scene.steps.length, 0), 0);
}

export function getTotalMinutes(): number {
    return curriculum.reduce((total, act) =>
        total + act.scenes.reduce((sceneTotal, scene) =>
            sceneTotal + scene.steps.reduce((stepTotal, step) =>
                stepTotal + step.estimatedMinutes, 0), 0), 0);
}

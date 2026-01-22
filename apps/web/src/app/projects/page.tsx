"use client";

import Link from "next/link";
import { getAllProjects, Project } from "@/data/projects";

const difficultyColors = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

const actNames = ["", "Foundations", "Algorithms", "Systems", "System Design"];

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl">🏃</span>
                            <span className="text-xl font-bold text-white">Marathon</span>
                        </Link>
                        <Link href="/dashboard" className="text-gray-300 hover:text-white">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Guided Projects</h1>
                    <p className="text-gray-400">
                        Build real systems from scratch with step-by-step tutorials and full source code
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-white">{projects.length}</div>
                        <div className="text-gray-400 text-sm">Total Projects</div>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                        <div className="text-2xl font-bold text-green-400">
                            {projects.filter((p) => p.difficulty === "Beginner").length}
                        </div>
                        <div className="text-gray-400 text-sm">Beginner</div>
                    </div>
                    <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                        <div className="text-2xl font-bold text-yellow-400">
                            {projects.filter((p) => p.difficulty === "Intermediate").length}
                        </div>
                        <div className="text-gray-400 text-sm">Intermediate</div>
                    </div>
                    <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                        <div className="text-2xl font-bold text-red-400">
                            {projects.filter((p) => p.difficulty === "Advanced").length}
                        </div>
                        <div className="text-gray-400 text-sm">Advanced</div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all hover:transform hover:scale-[1.02]"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-xs text-purple-400 font-medium">
                                        ACT {project.act} • {actNames[project.act]}
                                    </span>
                                    <h2 className="text-xl font-bold text-white mt-1">{project.title}</h2>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[project.difficulty]}`}>
                                    {project.difficulty}
                                </span>
                            </div>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    ⏱️ {project.estimatedHours} hours
                                </span>
                                <span className="text-gray-500">
                                    📚 {project.steps.length} steps
                                </span>
                                <span className="text-purple-400 font-medium">
                                    Start Project →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

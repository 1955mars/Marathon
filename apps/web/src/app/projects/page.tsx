"use client";

import Link from "next/link";
import { getAllProjects, Project } from "@/data/projects";

const difficultyColors = {
    Beginner: "bg-green-100 text-green-600 border-green-200",
    Intermediate: "bg-yellow-100 text-yellow-600 border-yellow-200",
    Advanced: "bg-red-100 text-red-600 border-red-200",
};

const actNames = ["", "Foundations", "Algorithms", "Systems", "System Design"];

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl">🏃</span>
                            <span className="text-xl font-bold text-slate-800">Marathon</span>
                        </Link>
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Guided Projects</h1>
                    <p className="text-slate-500">
                        Build real systems from scratch with step-by-step tutorials and full source code
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                        <div className="text-2xl font-bold text-slate-800">{projects.length}</div>
                        <div className="text-slate-500 text-sm">Total Projects</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <div className="text-2xl font-bold text-green-600">
                            {projects.filter((p) => p.difficulty === "Beginner").length}
                        </div>
                        <div className="text-slate-500 text-sm">Beginner</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">
                            {projects.filter((p) => p.difficulty === "Intermediate").length}
                        </div>
                        <div className="text-slate-500 text-sm">Intermediate</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <div className="text-2xl font-bold text-red-600">
                            {projects.filter((p) => p.difficulty === "Advanced").length}
                        </div>
                        <div className="text-slate-500 text-sm">Advanced</div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-400 transition-all hover:transform hover:scale-[1.02]"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-xs text-purple-600 font-medium">
                                        ACT {project.act} • {actNames[project.act]}
                                    </span>
                                    <h2 className="text-xl font-bold text-slate-800 mt-1">{project.title}</h2>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[project.difficulty]}`}>
                                    {project.difficulty}
                                </span>
                            </div>

                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">
                                    ⏱️ {project.estimatedHours} hours
                                </span>
                                <span className="text-slate-500">
                                    📚 {project.steps.length} steps
                                </span>
                                <span className="text-purple-600 font-medium">
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

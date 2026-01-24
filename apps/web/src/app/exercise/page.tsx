"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import to avoid SSR issues with Monaco
const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
    ssr: false,
    loading: () => (
        <div className="h-80 bg-slate-100 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    ),
});

interface Exercise {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;
    pythonCode: string;
    cppCode: string;
    testCases: { id: string; input: string; expectedOutput: string }[];
}

const exercises: Exercise[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
        pythonCode: `def two_sum(nums, target):
    # Your code here
    pass

# Test your solution
print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(two_sum([3, 2, 4], 6))       # Expected: [1, 2]
`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}

int main() {
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> result = twoSum(nums1, 9);
    if (result.size() >= 2) {
        cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    } else {
        cout << "No solution found" << endl;
    }
    // Expected: [0, 1]
    return 0;
}
`,
        testCases: [{ id: "1", input: "", expectedOutput: "No solution found" }],
    },
    {
        id: "reverse-string",
        title: "Reverse String",
        difficulty: "Easy",
        description: `Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array in-place with O(1) extra memory.`,
        pythonCode: `def reverse_string(s):
    # Your code here - modify s in-place
    pass

# Test your solution
s = list("hello")
reverse_string(s)
print("".join(s))  # Expected: "olleh"
`,
        cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void reverseString(vector<char>& s) {
    // Your code here - modify s in-place
}

int main() {
    vector<char> s = {'h', 'e', 'l', 'l', 'o'};
    reverseString(s);
    for (char c : s) cout << c;
    cout << endl;  // Expected: olleh
    return 0;
}
`,
        testCases: [{ id: "1", input: "", expectedOutput: "olleh" }],
    },
    {
        id: "fizzbuzz",
        title: "FizzBuzz",
        difficulty: "Easy",
        description: `Write a program that prints the numbers from 1 to n. But for multiples of 3, print "Fizz" instead of the number. For multiples of 5, print "Buzz". For multiples of both 3 and 5, print "FizzBuzz".`,
        pythonCode: `def fizzbuzz(n):
    for i in range(1, n + 1):
        # Your code here
        pass

# Test with n = 15
fizzbuzz(15)
`,
        cppCode: `#include <iostream>
using namespace std;

void fizzbuzz(int n) {
    for (int i = 1; i <= n; i++) {
        // Your code here
    }
}

int main() {
    fizzbuzz(15);
    return 0;
}
`,
        testCases: [
            { id: "1", input: "", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
        ],
    },
];

export default function ExercisePage() {
    const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
    const [language, setLanguage] = useState<"python" | "cpp">("python");

    const currentCode = language === "python" ? selectedExercise.pythonCode : selectedExercise.cppCode;

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
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Problem Description */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-slate-800">{selectedExercise.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedExercise.difficulty === "Easy" ? "bg-green-100 text-green-600" :
                                selectedExercise.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600" :
                                    "bg-red-100 text-red-600"
                                }`}>
                                {selectedExercise.difficulty}
                            </span>
                        </div>
                        <div className="prose prose-slate prose-sm max-w-none">
                            <p className="text-slate-600 whitespace-pre-wrap">{selectedExercise.description}</p>
                        </div>

                        {/* Language Toggle */}
                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <h3 className="text-sm font-medium text-slate-500 mb-3">Language</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setLanguage("python")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === "python"
                                        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                        : "bg-slate-50 text-slate-500 hover:text-slate-700 border border-transparent"
                                        }`}
                                >
                                    🐍 Python
                                </button>
                                <button
                                    onClick={() => setLanguage("cpp")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === "cpp"
                                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                                        : "bg-slate-50 text-slate-500 hover:text-slate-700 border border-transparent"
                                        }`}
                                >
                                    ⚡ C++
                                </button>
                            </div>
                        </div>

                        {/* Exercise List */}
                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <h3 className="text-sm font-medium text-slate-500 mb-3">Practice Problems</h3>
                            <div className="space-y-2">
                                {exercises.map((ex) => (
                                    <button
                                        key={ex.id}
                                        onClick={() => setSelectedExercise(ex)}
                                        className={`w-full p-3 rounded-lg text-left transition-colors ${ex.id === selectedExercise.id
                                            ? "bg-purple-100 border border-purple-300"
                                            : "bg-slate-50 hover:bg-slate-100 border border-transparent"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-800">{ex.title}</span>
                                            <span className={`text-xs ${ex.difficulty === "Easy" ? "text-green-600" :
                                                ex.difficulty === "Medium" ? "text-yellow-600" :
                                                    "text-red-600"
                                                }`}>
                                                {ex.difficulty}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div>
                        <CodeEditor
                            key={`${selectedExercise.id}-${language}`}
                            initialCode={currentCode}
                            language={language}
                            testCases={selectedExercise.testCases}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

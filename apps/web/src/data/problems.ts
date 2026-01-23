/**
 * Self-contained problem library with solutions in Python and C++
 * Combines all problem categories for 75+ top interview problems
 */

export interface Problem {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    pattern: string;
    tags: string[];
    description: string;
    examples: { input: string; output: string; explanation?: string }[];
    constraints: string[];
    solutions: {
        python: string;
        cpp: string;
    };
    explanation: string;
    timeComplexity: string;
    spaceComplexity: string;
}

// Import all problem categories
import { arrayProblems } from "./problems-arrays";
import { twoPointerProblems, slidingWindowProblems } from "./problems-pointers";
import { stackProblems } from "./problems-stack";
import { binarySearchProblems } from "./problems-binary-search";
import { linkedListProblems } from "./problems-linked-list";
import { treeProblems } from "./problems-trees";
import { graphProblems } from "./problems-graphs";
import { dpProblems } from "./problems-dp";
import { backtrackingProblems, intervalProblems } from "./problems-backtracking";
import { heapProblems, greedyProblems, bitProblems, trieProblems } from "./problems-extra";

// Core problems that were in the original file
const coreProblems: Problem[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        pattern: "Arrays & Hashing",
        tags: ["array", "hash-map"],
        description: "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
        ],
        constraints: ["2 <= nums.length <= 10^4", "Only one valid answer exists"],
        solutions: {
            python: `def two_sum(nums, target):
    """Use a hash map to store complements."""
    seen = {}  # value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

# Test
nums = [2, 7, 11, 15]
target = 9
print(f"Input: nums={nums}, target={target}")
print(f"Output: {two_sum(nums, target)}")`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    auto result = twoSum(nums, target);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,
        },
        explanation: `## Approach: Hash Map
Instead of O(n²) brute force, use hash map for O(1) lookups.
For each number, check if its complement exists.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        pattern: "Two Pointers",
        tags: ["string", "two-pointers"],
        description: "Given a string `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
        ],
        constraints: ["1 <= s.length <= 2 * 10^5"],
        solutions: {
            python: `def is_palindrome(s):
    """Two pointers from both ends."""
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    
    return True

print(is_palindrome("A man, a plan, a canal: Panama"))  # True`,
            cpp: `bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        
        if (tolower(s[left]) != tolower(s[right]))
            return false;
        left++; right--;
    }
    return true;
}`,
        },
        explanation: `## Two Pointers
Skip non-alphanumeric, compare case-insensitively from both ends.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        pattern: "Linked List",
        tags: ["linked-list"],
        description: "Given the head of a singly linked list, reverse the list and return the reversed list.",
        examples: [
            { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
        ],
        constraints: ["0 <= n <= 5000"],
        solutions: {
            python: `def reverse_list(head):
    """Iterative: reverse links with three pointers."""
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    return prev

print("Reverse linked list iteratively")`,
            cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
        },
        explanation: `## Iterative with Three Pointers
At each step: save next, reverse link, move forward.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
];

// Combine all problems
export const problems: Problem[] = [
    ...coreProblems,
    ...arrayProblems,
    ...twoPointerProblems,
    ...slidingWindowProblems,
    ...stackProblems,
    ...binarySearchProblems,
    ...linkedListProblems,
    ...treeProblems,
    ...graphProblems,
    ...dpProblems,
    ...backtrackingProblems,
    ...intervalProblems,
    ...heapProblems,
    ...greedyProblems,
    ...bitProblems,
    ...trieProblems,
];

// Helper functions
export function getProblemById(id: string): Problem | undefined {
    return problems.find(p => p.id === id);
}

export function getProblemsByPattern(pattern: string): Problem[] {
    return problems.filter(p => p.pattern === pattern);
}

export function getProblemsByDifficulty(difficulty: "Easy" | "Medium" | "Hard"): Problem[] {
    return problems.filter(p => p.difficulty === difficulty);
}

export function getPatterns(): string[] {
    return [...new Set(problems.map(p => p.pattern))];
}

/**
 * Stack problems
 */
import { Problem } from "./problems";

export const stackProblems: Problem[] = [
    {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        pattern: "Stack",
        tags: ["string", "stack"],
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "()[]{}"', output: "true" },
            { input: 's = "(]"', output: "false" },
        ],
        constraints: ["1 <= s.length <= 10^4"],
        solutions: {
            python: `def is_valid(s):
    """Stack to match brackets."""
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in pairs:  # closing bracket
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:  # opening bracket
            stack.append(char)
    
    return len(stack) == 0

# Test
print(is_valid("()[]{}"))  # True
print(is_valid("(]"))      # False`,
            cpp: `#include <iostream>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> stk;
    unordered_map<char, char> pairs = {{')', '('}, {'}', '{'}, {']', '['}};
    
    for (char c : s) {
        if (pairs.count(c)) {
            if (stk.empty() || stk.top() != pairs[c])
                return false;
            stk.pop();
        } else {
            stk.push(c);
        }
    }
    return stk.empty();
}

int main() {
    cout << (isValid("()[]{}") ? "true" : "false") << endl;
    return 0;
}`,
        },
        explanation: `## Stack Matching
Push opening brackets. For closing brackets, check if top of stack matches.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "min-stack",
        title: "Min Stack",
        difficulty: "Medium",
        pattern: "Stack",
        tags: ["stack", "design"],
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.",
        examples: [
            { input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "-3, 0, -2" },
        ],
        constraints: ["Methods pop, top and getMin will always be called on non-empty stacks"],
        solutions: {
            python: `class MinStack:
    """Store (value, min_so_far) pairs."""
    def __init__(self):
        self.stack = []  # [(val, min), ...]
    
    def push(self, val):
        current_min = min(val, self.stack[-1][1] if self.stack else val)
        self.stack.append((val, current_min))
    
    def pop(self):
        self.stack.pop()
    
    def top(self):
        return self.stack[-1][0]
    
    def getMin(self):
        return self.stack[-1][1]

# Test
stack = MinStack()
stack.push(-2)
stack.push(0)
stack.push(-3)
print(f"Min: {stack.getMin()}")  # -3
stack.pop()
print(f"Top: {stack.top()}")    # 0
print(f"Min: {stack.getMin()}")  # -2`,
            cpp: `#include <iostream>
#include <stack>
using namespace std;

class MinStack {
    stack<pair<int, int>> stk;  // (val, min)
public:
    void push(int val) {
        int currentMin = stk.empty() ? val : min(val, stk.top().second);
        stk.push({val, currentMin});
    }
    
    void pop() { stk.pop(); }
    int top() { return stk.top().first; }
    int getMin() { return stk.top().second; }
};

int main() {
    MinStack s;
    s.push(-2); s.push(0); s.push(-3);
    cout << "Min: " << s.getMin() << endl;
    s.pop();
    cout << "Top: " << s.top() << endl;
    return 0;
}`,
        },
        explanation: `## Store Min with Each Element
Each stack entry stores both the value and the minimum value at that point in time.`,
        timeComplexity: "O(1) all operations",
        spaceComplexity: "O(n)",
    },
    {
        id: "daily-temperatures",
        title: "Daily Temperatures",
        difficulty: "Medium",
        pattern: "Stack",
        tags: ["array", "stack", "monotonic-stack"],
        description: "Given daily temperatures, return an array where answer[i] is the number of days until a warmer temperature. If no future day is warmer, return 0.",
        examples: [
            { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
        ],
        constraints: ["1 <= temperatures.length <= 10^5"],
        solutions: {
            python: `def daily_temperatures(temperatures):
    """Monotonic decreasing stack of indices."""
    n = len(temperatures)
    result = [0] * n
    stack = []  # indices
    
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx
        stack.append(i)
    
    return result

# Test
temps = [73, 74, 75, 71, 69, 72, 76, 73]
print(daily_temperatures(temps))`,
            cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> dailyTemperatures(vector<int>& temps) {
    int n = temps.size();
    vector<int> result(n, 0);
    stack<int> stk;
    
    for (int i = 0; i < n; i++) {
        while (!stk.empty() && temps[stk.top()] < temps[i]) {
            int prevIdx = stk.top(); stk.pop();
            result[prevIdx] = i - prevIdx;
        }
        stk.push(i);
    }
    return result;
}

int main() {
    vector<int> temps = {73, 74, 75, 71, 69, 72, 76, 73};
    auto result = dailyTemperatures(temps);
    for (int n : result) cout << n << " ";
    return 0;
}`,
        },
        explanation: `## Monotonic Stack
Keep a stack of indices with decreasing temperatures. When we find a warmer day, pop and calculate the wait time.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "largest-rectangle-histogram",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        pattern: "Stack",
        tags: ["array", "stack", "monotonic-stack"],
        description: "Given an array of integers heights representing the histogram's bar heights, return the area of the largest rectangle in the histogram.",
        examples: [
            { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "Rectangle using bars of height 5 and 6" },
        ],
        constraints: ["1 <= heights.length <= 10^5"],
        solutions: {
            python: `def largest_rectangle_area(heights):
    """Monotonic increasing stack with sentinel values."""
    stack = []  # (index, height)
    max_area = 0
    
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx  # extend rectangle to popped bar's start
        stack.append((start, h))
    
    # Process remaining bars
    for idx, height in stack:
        max_area = max(max_area, height * (len(heights) - idx))
    
    return max_area

# Test
heights = [2, 1, 5, 6, 2, 3]
print(f"Max area: {largest_rectangle_area(heights)}")`,
            cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    stack<pair<int, int>> stk;  // (index, height)
    int maxArea = 0;
    
    for (int i = 0; i < heights.size(); i++) {
        int start = i;
        while (!stk.empty() && stk.top().second > heights[i]) {
            auto [idx, h] = stk.top(); stk.pop();
            maxArea = max(maxArea, h * (i - idx));
            start = idx;
        }
        stk.push({start, heights[i]});
    }
    
    while (!stk.empty()) {
        auto [idx, h] = stk.top(); stk.pop();
        maxArea = max(maxArea, h * ((int)heights.size() - idx));
    }
    return maxArea;
}

int main() {
    vector<int> heights = {2, 1, 5, 6, 2, 3};
    cout << "Max area: " << largestRectangleArea(heights) << endl;
    return 0;
}`,
        },
        explanation: `## Monotonic Increasing Stack
For each bar, find the largest rectangle where it's the shortest bar. Use stack to track the left boundary.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
];

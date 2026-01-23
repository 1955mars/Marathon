/**
 * Backtracking & Intervals problems
 */
import { Problem } from "./problems";

export const backtrackingProblems: Problem[] = [
    {
        id: "subsets",
        title: "Subsets",
        difficulty: "Medium",
        pattern: "Backtracking",
        tags: ["array", "backtracking", "bit-manipulation"],
        description: "Given an array of unique integers, return all possible subsets (the power set).",
        examples: [
            { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
        ],
        constraints: ["1 <= nums.length <= 10"],
        solutions: {
            python: `def subsets(nums):
    """Backtracking: include or exclude each element."""
    result = []
    
    def backtrack(start, current):
        result.append(current[:])  # Add copy of current subset
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    
    backtrack(0, [])
    return result

print(subsets([1, 2, 3]))`,
            cpp: `vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    
    function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        
        for (int i = start; i < nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1);
            current.pop_back();
        }
    };
    
    backtrack(0);
    return result;
}`,
        },
        explanation: `## Backtracking Template
At each step, choose to include or exclude the current element.
Add current subset to result at every node.`,
        timeComplexity: "O(n * 2^n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "combination-sum",
        title: "Combination Sum",
        difficulty: "Medium",
        pattern: "Backtracking",
        tags: ["array", "backtracking"],
        description: "Find all unique combinations where candidate numbers sum to target. Can reuse same number.",
        examples: [
            { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
        ],
        constraints: ["1 <= candidates.length <= 30", "All elements are distinct"],
        solutions: {
            python: `def combination_sum(candidates, target):
    """Backtrack with remaining target."""
    result = []
    
    def backtrack(start, current, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])  # i, not i+1 (can reuse)
            current.pop()
    
    backtrack(0, [], target)
    return result

print(combination_sum([2, 3, 6, 7], 7))`,
            cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> result;
    vector<int> current;
    
    function<void(int, int)> backtrack = [&](int start, int remaining) {
        if (remaining == 0) {
            result.push_back(current);
            return;
        }
        if (remaining < 0) return;
        
        for (int i = start; i < candidates.size(); i++) {
            current.push_back(candidates[i]);
            backtrack(i, remaining - candidates[i]);
            current.pop_back();
        }
    };
    
    backtrack(0, target);
    return result;
}`,
        },
        explanation: `## Backtracking with Target
Track remaining sum. When 0, found valid combination.
Use same index (not i+1) to allow reuse of elements.`,
        timeComplexity: "O(n^(t/m))",
        spaceComplexity: "O(t/m)",
    },
    {
        id: "permutations",
        title: "Permutations",
        difficulty: "Medium",
        pattern: "Backtracking",
        tags: ["array", "backtracking"],
        description: "Return all possible permutations of distinct integers.",
        examples: [
            { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
        ],
        constraints: ["1 <= nums.length <= 6"],
        solutions: {
            python: `def permute(nums):
    """Backtrack: pick each unused element."""
    result = []
    
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        
        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()
    
    backtrack([], nums)
    return result

# Alternative with swap:
def permute_swap(nums):
    result = []
    
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
    
    backtrack(0)
    return result

print(permute([1, 2, 3]))`,
            cpp: `vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    
    function<void(int)> backtrack = [&](int start) {
        if (start == nums.size()) {
            result.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(start + 1);
            swap(nums[start], nums[i]);
        }
    };
    
    backtrack(0);
    return result;
}`,
        },
        explanation: `## Swap-based Backtracking
At each position, try placing each remaining element.
Swap to avoid extra space for tracking used elements.`,
        timeComplexity: "O(n * n!)",
        spaceComplexity: "O(n)",
    },
    {
        id: "word-search",
        title: "Word Search",
        difficulty: "Medium",
        pattern: "Backtracking",
        tags: ["matrix", "backtracking", "dfs"],
        description: "Given a 2D board and a word, find if the word exists in the grid (adjacent cells).",
        examples: [
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
        ],
        constraints: ["1 <= m, n <= 6", "1 <= word.length <= 15"],
        solutions: {
            python: `def exist(board, word):
    """DFS backtracking on grid."""
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, i):
        if i == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[i]:
            return False
        
        # Mark visited
        temp = board[r][c]
        board[r][c] = '#'
        
        # Explore 4 directions
        found = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or
                 dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
        
        # Restore
        board[r][c] = temp
        return found
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False

board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
print(exist(board, "ABCCED"))  # True`,
            cpp: `bool exist(vector<vector<char>>& board, string word) {
    int m = board.size(), n = board[0].size();
    
    function<bool(int, int, int)> dfs = [&](int r, int c, int i) {
        if (i == word.size()) return true;
        if (r < 0 || r >= m || c < 0 || c >= n) return false;
        if (board[r][c] != word[i]) return false;
        
        char temp = board[r][c];
        board[r][c] = '#';
        
        bool found = dfs(r+1, c, i+1) || dfs(r-1, c, i+1) ||
                     dfs(r, c+1, i+1) || dfs(r, c-1, i+1);
        
        board[r][c] = temp;
        return found;
    };
    
    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++)
            if (dfs(r, c, 0)) return true;
    return false;
}`,
        },
        explanation: `## Grid DFS with Backtracking
Start from each cell matching first character.
Mark visited by modifying cell, restore after exploring.`,
        timeComplexity: "O(m * n * 4^L)",
        spaceComplexity: "O(L)",
    },
    {
        id: "n-queens",
        title: "N-Queens",
        difficulty: "Hard",
        pattern: "Backtracking",
        tags: ["backtracking", "recursion"],
        description: "Place n queens on an n×n board such that no two queens attack each other.",
        examples: [
            { input: "n = 4", output: '[[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]]' },
        ],
        constraints: ["1 <= n <= 9"],
        solutions: {
            python: `def solve_n_queens(n):
    """Track columns and diagonals."""
    result = []
    board = [['.'] * n for _ in range(n)]
    cols = set()
    diag1 = set()  # r - c
    diag2 = set()  # r + c
    
    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            
            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            
            backtrack(row + 1)
            
            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)
    
    backtrack(0)
    return result

print(f"Solutions for 4 queens: {len(solve_n_queens(4))}")  # 2`,
            cpp: `vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> result;
    vector<string> board(n, string(n, '.'));
    unordered_set<int> cols, diag1, diag2;
    
    function<void(int)> backtrack = [&](int row) {
        if (row == n) {
            result.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row-col) || diag2.count(row+col))
                continue;
            
            board[row][col] = 'Q';
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);
            
            backtrack(row + 1);
            
            board[row][col] = '.';
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
        }
    };
    
    backtrack(0);
    return result;
}`,
        },
        explanation: `## Constraint Tracking
Use sets to track:
- Used columns
- Used diagonals (r-c for ↘, r+c for ↙)

Place queen row by row, prune invalid positions.`,
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n²)",
    },
];

export const intervalProblems: Problem[] = [
    {
        id: "insert-interval",
        title: "Insert Interval",
        difficulty: "Medium",
        pattern: "Intervals",
        tags: ["array", "intervals"],
        description: "Insert a new interval into sorted non-overlapping intervals, merging if necessary.",
        examples: [
            { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
        ],
        constraints: ["0 <= intervals.length <= 10^4"],
        solutions: {
            python: `def insert(intervals, newInterval):
    """Three parts: before, merged, after."""
    result = []
    i = 0
    n = len(intervals)
    
    # Add all intervals that end before newInterval starts
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)
    
    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1
    
    return result

print(insert([[1,3],[6,9]], [2,5]))  # [[1,5],[6,9]]`,
            cpp: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();
    
    while (i < n && intervals[i][1] < newInterval[0])
        result.push_back(intervals[i++]);
    
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInterval);
    
    while (i < n)
        result.push_back(intervals[i++]);
    
    return result;
}`,
        },
        explanation: `## Three Phases
1. Add intervals ending before new one
2. Merge all overlapping intervals
3. Add intervals starting after new one`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "meeting-rooms-ii",
        title: "Meeting Rooms II",
        difficulty: "Medium",
        pattern: "Intervals",
        tags: ["array", "intervals", "heap", "sorting"],
        description: "Given meeting time intervals, find the minimum number of conference rooms required.",
        examples: [
            { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
        ],
        constraints: ["1 <= intervals.length <= 10^4"],
        solutions: {
            python: `import heapq

def min_meeting_rooms(intervals):
    """Use min heap to track end times of ongoing meetings."""
    if not intervals:
        return 0
    
    intervals.sort(key=lambda x: x[0])  # Sort by start time
    rooms = []  # Min heap of end times
    
    for start, end in intervals:
        # If earliest ending room is free, reuse it
        if rooms and rooms[0] <= start:
            heapq.heappop(rooms)
        
        heapq.heappush(rooms, end)
    
    return len(rooms)

# Alternative: Event counting
def min_meeting_rooms_events(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends
    
    events.sort()
    max_rooms = current = 0
    for _, delta in events:
        current += delta
        max_rooms = max(max_rooms, current)
    
    return max_rooms

print(min_meeting_rooms([[0,30],[5,10],[15,20]]))  # 2`,
            cpp: `int minMeetingRooms(vector<vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    
    sort(intervals.begin(), intervals.end());
    priority_queue<int, vector<int>, greater<int>> rooms;
    
    for (auto& interval : intervals) {
        if (!rooms.empty() && rooms.top() <= interval[0])
            rooms.pop();
        rooms.push(interval[1]);
    }
    return rooms.size();
}`,
        },
        explanation: `## Min Heap of End Times
Sort by start time. For each meeting:
- If a room is free (earliest end ≤ current start), reuse it
- Otherwise, allocate new room

Heap size = rooms needed.`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "non-overlapping-intervals",
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        pattern: "Intervals",
        tags: ["array", "intervals", "greedy", "sorting"],
        description: "Return minimum number of intervals to remove to make the rest non-overlapping.",
        examples: [
            { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3]" },
        ],
        constraints: ["1 <= intervals.length <= 10^5"],
        solutions: {
            python: `def erase_overlap_intervals(intervals):
    """Greedy: keep interval that ends earliest."""
    intervals.sort(key=lambda x: x[1])  # Sort by end time
    
    count = 0
    prev_end = float('-inf')
    
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end  # Keep this interval
        else:
            count += 1  # Remove this interval
    
    return count

print(erase_overlap_intervals([[1,2],[2,3],[3,4],[1,3]]))  # 1`,
            cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), 
         [](auto& a, auto& b) { return a[1] < b[1]; });
    
    int count = 0, prevEnd = INT_MIN;
    for (auto& interval : intervals) {
        if (interval[0] >= prevEnd)
            prevEnd = interval[1];
        else
            count++;
    }
    return count;
}`,
        },
        explanation: `## Greedy: Keep Early Endings
Sort by end time. Always keep the interval that ends earliest to leave room for more intervals.`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
    },
];

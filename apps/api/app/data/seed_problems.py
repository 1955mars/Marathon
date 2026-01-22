"""
Top 100 LeetCode Interview Problems - Seed Data
Based on Blind 75 + NeetCode 150 curated lists
"""

TOP_100_PROBLEMS = [
    # ============ ARRAYS & HASHING ============
    {"title": "Two Sum", "url": "https://leetcode.com/problems/two-sum", "difficulty": "Easy", "pattern": "Two Pointers", "tags": ["array", "hashmap"]},
    {"title": "Contains Duplicate", "url": "https://leetcode.com/problems/contains-duplicate", "difficulty": "Easy", "pattern": "Two Pointers", "tags": ["array", "hashmap"]},
    {"title": "Valid Anagram", "url": "https://leetcode.com/problems/valid-anagram", "difficulty": "Easy", "pattern": "Two Pointers", "tags": ["string", "hashmap"]},
    {"title": "Group Anagrams", "url": "https://leetcode.com/problems/group-anagrams", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["string", "hashmap"]},
    {"title": "Top K Frequent Elements", "url": "https://leetcode.com/problems/top-k-frequent-elements", "difficulty": "Medium", "pattern": "Top K Elements", "tags": ["array", "heap"]},
    {"title": "Product of Array Except Self", "url": "https://leetcode.com/problems/product-of-array-except-self", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["array"]},
    {"title": "Longest Consecutive Sequence", "url": "https://leetcode.com/problems/longest-consecutive-sequence", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["array", "hashmap"]},
    {"title": "Encode and Decode Strings", "url": "https://leetcode.com/problems/encode-and-decode-strings", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["string"]},

    # ============ TWO POINTERS ============
    {"title": "Valid Palindrome", "url": "https://leetcode.com/problems/valid-palindrome", "difficulty": "Easy", "pattern": "Two Pointers", "tags": ["string"]},
    {"title": "Two Sum II - Input Array Is Sorted", "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["array"]},
    {"title": "3Sum", "url": "https://leetcode.com/problems/3sum", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["array"]},
    {"title": "Container With Most Water", "url": "https://leetcode.com/problems/container-with-most-water", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["array"]},
    {"title": "Trapping Rain Water", "url": "https://leetcode.com/problems/trapping-rain-water", "difficulty": "Hard", "pattern": "Two Pointers", "tags": ["array", "dp"]},

    # ============ SLIDING WINDOW ============
    {"title": "Best Time to Buy and Sell Stock", "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock", "difficulty": "Easy", "pattern": "Sliding Window", "tags": ["array"]},
    {"title": "Longest Substring Without Repeating Characters", "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters", "difficulty": "Medium", "pattern": "Sliding Window", "tags": ["string", "hashmap"]},
    {"title": "Longest Repeating Character Replacement", "url": "https://leetcode.com/problems/longest-repeating-character-replacement", "difficulty": "Medium", "pattern": "Sliding Window", "tags": ["string"]},
    {"title": "Permutation in String", "url": "https://leetcode.com/problems/permutation-in-string", "difficulty": "Medium", "pattern": "Sliding Window", "tags": ["string"]},
    {"title": "Minimum Window Substring", "url": "https://leetcode.com/problems/minimum-window-substring", "difficulty": "Hard", "pattern": "Sliding Window", "tags": ["string", "hashmap"]},
    {"title": "Sliding Window Maximum", "url": "https://leetcode.com/problems/sliding-window-maximum", "difficulty": "Hard", "pattern": "Sliding Window", "tags": ["array", "deque"]},

    # ============ STACK ============
    {"title": "Valid Parentheses", "url": "https://leetcode.com/problems/valid-parentheses", "difficulty": "Easy", "pattern": "Two Pointers", "tags": ["stack"]},
    {"title": "Min Stack", "url": "https://leetcode.com/problems/min-stack", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["stack", "design"]},
    {"title": "Evaluate Reverse Polish Notation", "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["stack"]},
    {"title": "Generate Parentheses", "url": "https://leetcode.com/problems/generate-parentheses", "difficulty": "Medium", "pattern": "Backtracking", "tags": ["stack", "backtracking"]},
    {"title": "Daily Temperatures", "url": "https://leetcode.com/problems/daily-temperatures", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["stack"]},
    {"title": "Car Fleet", "url": "https://leetcode.com/problems/car-fleet", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["stack"]},
    {"title": "Largest Rectangle in Histogram", "url": "https://leetcode.com/problems/largest-rectangle-in-histogram", "difficulty": "Hard", "pattern": "Two Pointers", "tags": ["stack"]},

    # ============ BINARY SEARCH ============
    {"title": "Binary Search", "url": "https://leetcode.com/problems/binary-search", "difficulty": "Easy", "pattern": "Modified Binary Search", "tags": ["binary-search"]},
    {"title": "Search a 2D Matrix", "url": "https://leetcode.com/problems/search-a-2d-matrix", "difficulty": "Medium", "pattern": "Modified Binary Search", "tags": ["binary-search", "matrix"]},
    {"title": "Koko Eating Bananas", "url": "https://leetcode.com/problems/koko-eating-bananas", "difficulty": "Medium", "pattern": "Modified Binary Search", "tags": ["binary-search"]},
    {"title": "Find Minimum in Rotated Sorted Array", "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array", "difficulty": "Medium", "pattern": "Modified Binary Search", "tags": ["binary-search"]},
    {"title": "Search in Rotated Sorted Array", "url": "https://leetcode.com/problems/search-in-rotated-sorted-array", "difficulty": "Medium", "pattern": "Modified Binary Search", "tags": ["binary-search"]},
    {"title": "Time Based Key-Value Store", "url": "https://leetcode.com/problems/time-based-key-value-store", "difficulty": "Medium", "pattern": "Modified Binary Search", "tags": ["binary-search", "design"]},
    {"title": "Median of Two Sorted Arrays", "url": "https://leetcode.com/problems/median-of-two-sorted-arrays", "difficulty": "Hard", "pattern": "Modified Binary Search", "tags": ["binary-search"]},

    # ============ LINKED LIST ============
    {"title": "Reverse Linked List", "url": "https://leetcode.com/problems/reverse-linked-list", "difficulty": "Easy", "pattern": "In-place Reversal", "tags": ["linked-list"]},
    {"title": "Merge Two Sorted Lists", "url": "https://leetcode.com/problems/merge-two-sorted-lists", "difficulty": "Easy", "pattern": "K-way Merge", "tags": ["linked-list"]},
    {"title": "Linked List Cycle", "url": "https://leetcode.com/problems/linked-list-cycle", "difficulty": "Easy", "pattern": "Fast & Slow Pointers", "tags": ["linked-list"]},
    {"title": "Reorder List", "url": "https://leetcode.com/problems/reorder-list", "difficulty": "Medium", "pattern": "Fast & Slow Pointers", "tags": ["linked-list"]},
    {"title": "Remove Nth Node From End of List", "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["linked-list"]},
    {"title": "Copy List with Random Pointer", "url": "https://leetcode.com/problems/copy-list-with-random-pointer", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["linked-list", "hashmap"]},
    {"title": "Add Two Numbers", "url": "https://leetcode.com/problems/add-two-numbers", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["linked-list"]},
    {"title": "Find the Duplicate Number", "url": "https://leetcode.com/problems/find-the-duplicate-number", "difficulty": "Medium", "pattern": "Fast & Slow Pointers", "tags": ["binary-search", "linked-list"]},
    {"title": "LRU Cache", "url": "https://leetcode.com/problems/lru-cache", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["linked-list", "hashmap", "design"]},
    {"title": "Merge K Sorted Lists", "url": "https://leetcode.com/problems/merge-k-sorted-lists", "difficulty": "Hard", "pattern": "K-way Merge", "tags": ["linked-list", "heap"]},
    {"title": "Reverse Nodes in K-Group", "url": "https://leetcode.com/problems/reverse-nodes-in-k-group", "difficulty": "Hard", "pattern": "In-place Reversal", "tags": ["linked-list"]},

    # ============ TREES ============
    {"title": "Invert Binary Tree", "url": "https://leetcode.com/problems/invert-binary-tree", "difficulty": "Easy", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Maximum Depth of Binary Tree", "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree", "difficulty": "Easy", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Diameter of Binary Tree", "url": "https://leetcode.com/problems/diameter-of-binary-tree", "difficulty": "Easy", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Balanced Binary Tree", "url": "https://leetcode.com/problems/balanced-binary-tree", "difficulty": "Easy", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Same Tree", "url": "https://leetcode.com/problems/same-tree", "difficulty": "Easy", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Subtree of Another Tree", "url": "https://leetcode.com/problems/subtree-of-another-tree", "difficulty": "Easy", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Lowest Common Ancestor of a BST", "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree", "difficulty": "Medium", "pattern": "Tree DFS", "tags": ["tree", "bst"]},
    {"title": "Binary Tree Level Order Traversal", "url": "https://leetcode.com/problems/binary-tree-level-order-traversal", "difficulty": "Medium", "pattern": "Tree BFS", "tags": ["tree", "bfs"]},
    {"title": "Binary Tree Right Side View", "url": "https://leetcode.com/problems/binary-tree-right-side-view", "difficulty": "Medium", "pattern": "Tree BFS", "tags": ["tree", "bfs"]},
    {"title": "Count Good Nodes in Binary Tree", "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree", "difficulty": "Medium", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Validate Binary Search Tree", "url": "https://leetcode.com/problems/validate-binary-search-tree", "difficulty": "Medium", "pattern": "Tree DFS", "tags": ["tree", "bst"]},
    {"title": "Kth Smallest Element in a BST", "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst", "difficulty": "Medium", "pattern": "Tree DFS", "tags": ["tree", "bst"]},
    {"title": "Construct Binary Tree from Preorder and Inorder", "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal", "difficulty": "Medium", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Binary Tree Maximum Path Sum", "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum", "difficulty": "Hard", "pattern": "Tree DFS", "tags": ["tree"]},
    {"title": "Serialize and Deserialize Binary Tree", "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree", "difficulty": "Hard", "pattern": "Tree DFS", "tags": ["tree", "design"]},

    # ============ TRIES ============
    {"title": "Implement Trie (Prefix Tree)", "url": "https://leetcode.com/problems/implement-trie-prefix-tree", "difficulty": "Medium", "pattern": "Trie", "tags": ["trie", "design"]},
    {"title": "Design Add and Search Words Data Structure", "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure", "difficulty": "Medium", "pattern": "Trie", "tags": ["trie", "design"]},
    {"title": "Word Search II", "url": "https://leetcode.com/problems/word-search-ii", "difficulty": "Hard", "pattern": "Trie", "tags": ["trie", "backtracking"]},

    # ============ HEAP / PRIORITY QUEUE ============
    {"title": "Kth Largest Element in a Stream", "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream", "difficulty": "Easy", "pattern": "Top K Elements", "tags": ["heap"]},
    {"title": "Last Stone Weight", "url": "https://leetcode.com/problems/last-stone-weight", "difficulty": "Easy", "pattern": "Two Heaps", "tags": ["heap"]},
    {"title": "K Closest Points to Origin", "url": "https://leetcode.com/problems/k-closest-points-to-origin", "difficulty": "Medium", "pattern": "Top K Elements", "tags": ["heap"]},
    {"title": "Kth Largest Element in an Array", "url": "https://leetcode.com/problems/kth-largest-element-in-an-array", "difficulty": "Medium", "pattern": "Top K Elements", "tags": ["heap", "quickselect"]},
    {"title": "Task Scheduler", "url": "https://leetcode.com/problems/task-scheduler", "difficulty": "Medium", "pattern": "Two Heaps", "tags": ["heap", "greedy"]},
    {"title": "Design Twitter", "url": "https://leetcode.com/problems/design-twitter", "difficulty": "Medium", "pattern": "Top K Elements", "tags": ["heap", "design"]},
    {"title": "Find Median from Data Stream", "url": "https://leetcode.com/problems/find-median-from-data-stream", "difficulty": "Hard", "pattern": "Two Heaps", "tags": ["heap", "design"]},

    # ============ BACKTRACKING ============
    {"title": "Subsets", "url": "https://leetcode.com/problems/subsets", "difficulty": "Medium", "pattern": "Subsets", "tags": ["backtracking"]},
    {"title": "Combination Sum", "url": "https://leetcode.com/problems/combination-sum", "difficulty": "Medium", "pattern": "Subsets", "tags": ["backtracking"]},
    {"title": "Permutations", "url": "https://leetcode.com/problems/permutations", "difficulty": "Medium", "pattern": "Subsets", "tags": ["backtracking"]},
    {"title": "Subsets II", "url": "https://leetcode.com/problems/subsets-ii", "difficulty": "Medium", "pattern": "Subsets", "tags": ["backtracking"]},
    {"title": "Combination Sum II", "url": "https://leetcode.com/problems/combination-sum-ii", "difficulty": "Medium", "pattern": "Subsets", "tags": ["backtracking"]},
    {"title": "Word Search", "url": "https://leetcode.com/problems/word-search", "difficulty": "Medium", "pattern": "Backtracking", "tags": ["backtracking", "matrix"]},
    {"title": "Palindrome Partitioning", "url": "https://leetcode.com/problems/palindrome-partitioning", "difficulty": "Medium", "pattern": "Backtracking", "tags": ["backtracking", "dp"]},
    {"title": "Letter Combinations of a Phone Number", "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number", "difficulty": "Medium", "pattern": "Backtracking", "tags": ["backtracking"]},
    {"title": "N-Queens", "url": "https://leetcode.com/problems/n-queens", "difficulty": "Hard", "pattern": "Backtracking", "tags": ["backtracking"]},

    # ============ GRAPHS ============
    {"title": "Number of Islands", "url": "https://leetcode.com/problems/number-of-islands", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "dfs", "bfs"]},
    {"title": "Clone Graph", "url": "https://leetcode.com/problems/clone-graph", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "dfs"]},
    {"title": "Max Area of Island", "url": "https://leetcode.com/problems/max-area-of-island", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "dfs"]},
    {"title": "Pacific Atlantic Water Flow", "url": "https://leetcode.com/problems/pacific-atlantic-water-flow", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "dfs"]},
    {"title": "Surrounded Regions", "url": "https://leetcode.com/problems/surrounded-regions", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "dfs"]},
    {"title": "Rotting Oranges", "url": "https://leetcode.com/problems/rotting-oranges", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "bfs"]},
    {"title": "Walls and Gates", "url": "https://leetcode.com/problems/walls-and-gates", "difficulty": "Medium", "pattern": "Graph", "tags": ["graph", "bfs"]},
    {"title": "Course Schedule", "url": "https://leetcode.com/problems/course-schedule", "difficulty": "Medium", "pattern": "Topological Sort", "tags": ["graph", "topological-sort"]},
    {"title": "Course Schedule II", "url": "https://leetcode.com/problems/course-schedule-ii", "difficulty": "Medium", "pattern": "Topological Sort", "tags": ["graph", "topological-sort"]},
    {"title": "Graph Valid Tree", "url": "https://leetcode.com/problems/graph-valid-tree", "difficulty": "Medium", "pattern": "Union Find", "tags": ["graph", "union-find"]},
    {"title": "Number of Connected Components", "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph", "difficulty": "Medium", "pattern": "Union Find", "tags": ["graph", "union-find"]},
    {"title": "Redundant Connection", "url": "https://leetcode.com/problems/redundant-connection", "difficulty": "Medium", "pattern": "Union Find", "tags": ["graph", "union-find"]},
    {"title": "Word Ladder", "url": "https://leetcode.com/problems/word-ladder", "difficulty": "Hard", "pattern": "Graph", "tags": ["graph", "bfs"]},

    # ============ DYNAMIC PROGRAMMING (1D) ============
    {"title": "Climbing Stairs", "url": "https://leetcode.com/problems/climbing-stairs", "difficulty": "Easy", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Min Cost Climbing Stairs", "url": "https://leetcode.com/problems/min-cost-climbing-stairs", "difficulty": "Easy", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "House Robber", "url": "https://leetcode.com/problems/house-robber", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "House Robber II", "url": "https://leetcode.com/problems/house-robber-ii", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Longest Palindromic Substring", "url": "https://leetcode.com/problems/longest-palindromic-substring", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "string"]},
    {"title": "Palindromic Substrings", "url": "https://leetcode.com/problems/palindromic-substrings", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "string"]},
    {"title": "Decode Ways", "url": "https://leetcode.com/problems/decode-ways", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Coin Change", "url": "https://leetcode.com/problems/coin-change", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Maximum Product Subarray", "url": "https://leetcode.com/problems/maximum-product-subarray", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Word Break", "url": "https://leetcode.com/problems/word-break", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Longest Increasing Subsequence", "url": "https://leetcode.com/problems/longest-increasing-subsequence", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "binary-search"]},
    {"title": "Partition Equal Subset Sum", "url": "https://leetcode.com/problems/partition-equal-subset-sum", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},

    # ============ DYNAMIC PROGRAMMING (2D) ============
    {"title": "Unique Paths", "url": "https://leetcode.com/problems/unique-paths", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "matrix"]},
    {"title": "Longest Common Subsequence", "url": "https://leetcode.com/problems/longest-common-subsequence", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "string"]},
    {"title": "Best Time to Buy and Sell Stock with Cooldown", "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Coin Change II", "url": "https://leetcode.com/problems/coin-change-ii", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Target Sum", "url": "https://leetcode.com/problems/target-sum", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "backtracking"]},
    {"title": "Interleaving String", "url": "https://leetcode.com/problems/interleaving-string", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "string"]},
    {"title": "Edit Distance", "url": "https://leetcode.com/problems/edit-distance", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["dp", "string"]},
    {"title": "Burst Balloons", "url": "https://leetcode.com/problems/burst-balloons", "difficulty": "Hard", "pattern": "Dynamic Programming", "tags": ["dp"]},
    {"title": "Regular Expression Matching", "url": "https://leetcode.com/problems/regular-expression-matching", "difficulty": "Hard", "pattern": "Dynamic Programming", "tags": ["dp", "string"]},

    # ============ INTERVALS ============
    {"title": "Meeting Rooms", "url": "https://leetcode.com/problems/meeting-rooms", "difficulty": "Easy", "pattern": "Merge Intervals", "tags": ["intervals"]},
    {"title": "Meeting Rooms II", "url": "https://leetcode.com/problems/meeting-rooms-ii", "difficulty": "Medium", "pattern": "Merge Intervals", "tags": ["intervals", "heap"]},
    {"title": "Insert Interval", "url": "https://leetcode.com/problems/insert-interval", "difficulty": "Medium", "pattern": "Merge Intervals", "tags": ["intervals"]},
    {"title": "Merge Intervals", "url": "https://leetcode.com/problems/merge-intervals", "difficulty": "Medium", "pattern": "Merge Intervals", "tags": ["intervals"]},
    {"title": "Non-overlapping Intervals", "url": "https://leetcode.com/problems/non-overlapping-intervals", "difficulty": "Medium", "pattern": "Merge Intervals", "tags": ["intervals", "greedy"]},
    {"title": "Minimum Interval to Include Each Query", "url": "https://leetcode.com/problems/minimum-interval-to-include-each-query", "difficulty": "Hard", "pattern": "Merge Intervals", "tags": ["intervals", "heap"]},

    # ============ GREEDY ============
    {"title": "Maximum Subarray", "url": "https://leetcode.com/problems/maximum-subarray", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["greedy", "dp"]},
    {"title": "Jump Game", "url": "https://leetcode.com/problems/jump-game", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["greedy"]},
    {"title": "Jump Game II", "url": "https://leetcode.com/problems/jump-game-ii", "difficulty": "Medium", "pattern": "Dynamic Programming", "tags": ["greedy"]},
    {"title": "Gas Station", "url": "https://leetcode.com/problems/gas-station", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["greedy"]},
    {"title": "Hand of Straights", "url": "https://leetcode.com/problems/hand-of-straights", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["greedy", "hashmap"]},
    {"title": "Partition Labels", "url": "https://leetcode.com/problems/partition-labels", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["greedy"]},
    {"title": "Valid Parenthesis String", "url": "https://leetcode.com/problems/valid-parenthesis-string", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["greedy", "dp"]},

    # ============ MATH & GEOMETRY ============
    {"title": "Rotate Image", "url": "https://leetcode.com/problems/rotate-image", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["matrix"]},
    {"title": "Spiral Matrix", "url": "https://leetcode.com/problems/spiral-matrix", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["matrix"]},
    {"title": "Set Matrix Zeroes", "url": "https://leetcode.com/problems/set-matrix-zeroes", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["matrix"]},
    {"title": "Happy Number", "url": "https://leetcode.com/problems/happy-number", "difficulty": "Easy", "pattern": "Fast & Slow Pointers", "tags": ["math"]},
    {"title": "Plus One", "url": "https://leetcode.com/problems/plus-one", "difficulty": "Easy", "pattern": "Two Pointers", "tags": ["math", "array"]},
    {"title": "Pow(x, n)", "url": "https://leetcode.com/problems/powx-n", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["math", "recursion"]},
    {"title": "Multiply Strings", "url": "https://leetcode.com/problems/multiply-strings", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["math", "string"]},

    # ============ BIT MANIPULATION ============
    {"title": "Single Number", "url": "https://leetcode.com/problems/single-number", "difficulty": "Easy", "pattern": "Bitwise XOR", "tags": ["bit-manipulation"]},
    {"title": "Number of 1 Bits", "url": "https://leetcode.com/problems/number-of-1-bits", "difficulty": "Easy", "pattern": "Bitwise XOR", "tags": ["bit-manipulation"]},
    {"title": "Counting Bits", "url": "https://leetcode.com/problems/counting-bits", "difficulty": "Easy", "pattern": "Dynamic Programming", "tags": ["bit-manipulation", "dp"]},
    {"title": "Reverse Bits", "url": "https://leetcode.com/problems/reverse-bits", "difficulty": "Easy", "pattern": "Bitwise XOR", "tags": ["bit-manipulation"]},
    {"title": "Missing Number", "url": "https://leetcode.com/problems/missing-number", "difficulty": "Easy", "pattern": "Cyclic Sort", "tags": ["bit-manipulation", "math"]},
    {"title": "Sum of Two Integers", "url": "https://leetcode.com/problems/sum-of-two-integers", "difficulty": "Medium", "pattern": "Bitwise XOR", "tags": ["bit-manipulation"]},
    {"title": "Reverse Integer", "url": "https://leetcode.com/problems/reverse-integer", "difficulty": "Medium", "pattern": "Two Pointers", "tags": ["math"]},
]

# Total: 125 problems covering all major patterns

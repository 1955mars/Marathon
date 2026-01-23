/**
 * Act 1: CS Foundations - Step Content
 * Data Structures, Algorithms, Recursion, and Math
 */

export const act1Content: Record<string, { title: string; content: string }> = {
    // Step 1-1-2: Linked Lists
    'step-1-1-2': {
        title: 'Linked Lists',
        content: `# Linked Lists

A linear data structure where elements are connected via pointers.

## Singly Linked List

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        if not self.head:
            self.head = ListNode(val)
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = ListNode(val)
    
    def prepend(self, val):
        new_node = ListNode(val, self.head)
        self.head = new_node
    
    def delete(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        curr = self.head
        while curr.next and curr.next.val != val:
            curr = curr.next
        if curr.next:
            curr.next = curr.next.next
\`\`\`

## Common Operations

| Operation | Time | Space |
|-----------|------|-------|
| Access by index | O(n) | O(1) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) | O(1) |
| Delete | O(n) | O(1) |
| Search | O(n) | O(1) |

## Reverse a Linked List

\`\`\`python
def reverse(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev
\`\`\`

## Detect Cycle (Floyd's Algorithm)

\`\`\`python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
\`\`\`

## Key Takeaways

- Use linked lists when frequent insertions/deletions at unknown positions
- Array is better when you need random access
- Two-pointer technique is essential for linked list problems
`,
    },

    // Step 1-1-3: Stacks & Queues
    'step-1-1-3': {
        title: 'Stacks & Queues',
        content: `# Stacks & Queues

Fundamental data structures for managing collections.

## Stack (LIFO - Last In, First Out)

\`\`\`python
# Using list
stack = []
stack.append(1)   # Push
stack.append(2)
stack.pop()       # Pop -> 2
stack[-1]         # Peek -> 1

# Using deque (more efficient)
from collections import deque
stack = deque()
stack.append(1)
stack.pop()
\`\`\`

### Stack in C++
\`\`\`cpp
#include <stack>
std::stack<int> s;
s.push(1);
s.push(2);
s.top();    // 2
s.pop();    // removes 2
s.empty();  // false
\`\`\`

## Queue (FIFO - First In, First Out)

\`\`\`python
from collections import deque
queue = deque()
queue.append(1)     # Enqueue
queue.append(2)
queue.popleft()     # Dequeue -> 1
\`\`\`

### Queue in C++
\`\`\`cpp
#include <queue>
std::queue<int> q;
q.push(1);
q.push(2);
q.front();  // 1
q.pop();    // removes 1
\`\`\`

## Valid Parentheses

\`\`\`python
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0
\`\`\`

## Complexity

| Operation | Stack | Queue |
|-----------|-------|-------|
| Push/Enqueue | O(1) | O(1) |
| Pop/Dequeue | O(1) | O(1) |
| Peek | O(1) | O(1) |

## Key Takeaways

- Stack: function calls, undo, expression parsing
- Queue: BFS, task scheduling, buffering
- Use deque in Python for O(1) operations on both ends
`,
    },

    // Step 1-1-4: Hash Tables
    'step-1-1-4': {
        title: 'Hash Tables',
        content: `# Hash Tables

O(1) average-case lookup using key-value pairs.

## How It Works

1. Hash function converts key to index
2. Store value at that index
3. Handle collisions (same index for different keys)

\`\`\`python
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.buckets = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def put(self, key, value):
        index = self._hash(key)
        bucket = self.buckets[index]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
    
    def get(self, key):
        index = self._hash(key)
        for k, v in self.buckets[index]:
            if k == key:
                return v
        return None
\`\`\`

## Python dict / C++ unordered_map

\`\`\`python
# Python dict
d = {}
d["name"] = "Alice"
print(d.get("name", "default"))
del d["name"]

# Check existence
if "key" in d:
    pass
\`\`\`

\`\`\`cpp
#include <unordered_map>
std::unordered_map<std::string, int> map;
map["age"] = 25;
map.find("age");  // iterator
map.count("age"); // 1 or 0
map.erase("age");
\`\`\`

## Two Sum Problem

\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\`

## Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

## Key Takeaways

- Hash tables trade space for time
- Choose good hash function to minimize collisions
- Use for counting, caching, quick lookups
`,
    },

    // Step 1-1-5: Trees & BST
    'step-1-1-5': {
        title: 'Trees & BST',
        content: `# Trees & Binary Search Trees

Hierarchical data structure with parent-child relationships.

## Binary Tree

\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
\`\`\`

## Tree Traversals

\`\`\`python
# Inorder: Left -> Root -> Right (BST gives sorted order)
def inorder(root):
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)

# Preorder: Root -> Left -> Right
def preorder(root):
    if root:
        print(root.val)
        preorder(root.left)
        preorder(root.right)

# Postorder: Left -> Right -> Root
def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val)

# Level-order (BFS)
from collections import deque
def level_order(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result
\`\`\`

## BST Operations

\`\`\`python
def search(root, val):
    if not root or root.val == val:
        return root
    if val < root.val:
        return search(root.left, val)
    return search(root.right, val)

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
\`\`\`

## Complexity (Balanced BST)

| Operation | Time |
|-----------|------|
| Search | O(log n) |
| Insert | O(log n) |
| Delete | O(log n) |
| Traversal | O(n) |

## Key Takeaways

- BST: left < root < right
- Balanced trees (AVL, Red-Black) guarantee O(log n)
- Tree problems often use recursion
`,
    },

    // Step 1-1-6: Heaps
    'step-1-1-6': {
        title: 'Heaps',
        content: `# Heaps & Priority Queues

Complete binary tree with heap property.

## Min Heap vs Max Heap

- **Min Heap**: Parent ≤ Children (root = minimum)
- **Max Heap**: Parent ≥ Children (root = maximum)

## Python heapq (Min Heap)

\`\`\`python
import heapq

# Create heap
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)

# Get minimum
min_val = heapq.heappop(heap)  # 1

# Peek without removing
peek = heap[0]

# Heapify a list
nums = [5, 1, 3, 9, 2]
heapq.heapify(nums)  # O(n)

# Max heap (negate values)
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -1)
max_val = -heapq.heappop(max_heap)  # 5
\`\`\`

## C++ Priority Queue

\`\`\`cpp
#include <queue>

// Max heap (default)
std::priority_queue<int> maxHeap;
maxHeap.push(5);
maxHeap.push(1);
maxHeap.top();  // 5

// Min heap
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(5);
minHeap.push(1);
minHeap.top();  // 1
\`\`\`

## Top K Elements

\`\`\`python
def top_k_frequent(nums, k):
    from collections import Counter
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)
\`\`\`

## Complexity

| Operation | Time |
|-----------|------|
| Insert | O(log n) |
| Extract Min/Max | O(log n) |
| Peek | O(1) |
| Heapify | O(n) |

## Key Takeaways

- Use for Top K, Merge K Sorted, Median problems
- heapq is min heap by default (negate for max)
- Space efficient: stored as array
`,
    },

    // Step 1-1-7: Graphs
    'step-1-1-7': {
        title: 'Graphs',
        content: `# Graphs

Nodes (vertices) connected by edges.

## Representations

\`\`\`python
# Adjacency List (most common)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Adjacency Matrix
#     A  B  C  D
# A [[0, 1, 1, 0],
# B  [1, 0, 0, 1],
# C  [1, 0, 0, 1],
# D  [0, 1, 1, 0]]

# Edge List
edges = [('A', 'B'), ('A', 'C'), ('B', 'D'), ('C', 'D')]
\`\`\`

## DFS (Depth-First Search)

\`\`\`python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
\`\`\`

## BFS (Breadth-First Search)

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
\`\`\`

## Number of Islands

\`\`\`python
def num_islands(grid):
    if not grid: return 0
    count = 0
    rows, cols = len(grid), len(grid[0])
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count
\`\`\`

## Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| DFS | O(V + E) | O(V) |
| BFS | O(V + E) | O(V) |

## Key Takeaways

- BFS: shortest path (unweighted), level order
- DFS: cycle detection, topological sort, connected components
- Adjacency list is usually best for sparse graphs
`,
    },

    // Step 1-1-8: Tries
    'step-1-1-8': {
        title: 'Tries',
        content: `# Tries (Prefix Trees)

Tree structure for storing strings, enabling fast prefix lookups.

## Implementation

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end
    
    def starts_with(self, prefix):
        return self._find(prefix) is not None
    
    def _find(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
\`\`\`

## Autocomplete

\`\`\`python
def autocomplete(self, prefix):
    node = self._find(prefix)
    if not node:
        return []
    
    results = []
    def dfs(node, path):
        if node.is_end:
            results.append(path)
        for char, child in node.children.items():
            dfs(child, path + char)
    
    dfs(node, prefix)
    return results
\`\`\`

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(m) | O(m) |
| Search | O(m) | O(1) |
| Prefix | O(m) | O(1) |

Where m = length of word/prefix

## Use Cases

- Autocomplete / Type-ahead
- Spell checkers
- IP routing (longest prefix match)
- Word games (Boggle, Wordle)

## Key Takeaways

- Tries trade space for time on prefix operations
- O(m) lookup regardless of dictionary size
- Common in interview problems involving strings/prefixes
`,
    },

    // Step 1-2-1: Big O Notation
    'step-1-2-1': {
        title: 'Big O Notation',
        content: `# Big O Notation

Describe algorithm efficiency as input size grows.

## Common Complexities

| Big O | Name | Example |
|-------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Simple loop |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Subsets |
| O(n!) | Factorial | Permutations |

## Examples

\`\`\`python
# O(1) - Constant
def get_first(arr):
    return arr[0]

# O(log n) - Logarithmic
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# O(n) - Linear
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

# O(n²) - Quadratic
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

## Space Complexity

\`\`\`python
# O(1) space
def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n) space
def copy_array(arr):
    return arr[:]

# O(n) space (recursion)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
\`\`\`

## Key Takeaways

- Focus on **dominant term** and **worst case**
- Drop constants: O(2n) → O(n)
- Space matters for large inputs
- O(n log n) is usually optimal for comparison sorts
`,
    },

    // Step 1-2-2: Sorting Algorithms
    'step-1-2-2': {
        title: 'Sorting Algorithms',
        content: `# Sorting Algorithms

Essential algorithms every developer must know.

## Quick Sort

Average O(n log n), worst O(n²)

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

## Merge Sort

Always O(n log n), stable

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

## Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

## Key Takeaways

- Python's built-in sort uses **Timsort** (hybrid)
- Use merge sort when stability matters
- Quick sort is typically fastest in practice
`,
    },

    // Step 1-2-3: Binary Search
    'step-1-2-3': {
        title: 'Binary Search',
        content: `# Binary Search

Efficient O(log n) search on sorted arrays.

## Classic Binary Search

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`

## Find First/Last Position

\`\`\`python
def find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Keep searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return result
\`\`\`

## Search in Rotated Array

\`\`\`python
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:  # Left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
\`\`\`

## Key Takeaways

- Works only on **sorted** data
- Identify the search space and how to shrink it
- Common variations: first/last occurrence, rotated arrays
`,
    },

    // Step 1-2-4: Two Pointers & Sliding Window
    'step-1-2-4': {
        title: 'Two Pointers & Sliding Window',
        content: `# Two Pointers & Sliding Window

Optimize O(n²) to O(n) for array/string problems.

## Two Pointers Pattern

\`\`\`python
# Two Sum (sorted array)
def two_sum(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr = nums[left] + nums[right]
        if curr == target:
            return [left, right]
        elif curr < target:
            left += 1
        else:
            right -= 1
    return []

# Remove duplicates in-place
def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1
\`\`\`

## Sliding Window

\`\`\`python
# Max sum of k consecutive elements
def max_subarray_sum(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Longest substring without repeating
def length_of_longest_substring(s):
    seen = {}
    left = max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
\`\`\`

## When to Use

| Pattern | Use Case |
|---------|----------|
| Two Pointers | Sorted arrays, palindromes, partitioning |
| Sliding Window | Contiguous subarrays/substrings |

## Key Takeaways

- Two pointers: opposite ends or slow/fast
- Sliding window: fixed or variable size
- Both reduce nested loops to single pass
`,
    },

    // Step 1-2-5: Dynamic Programming  
    'step-1-2-5': {
        title: 'Dynamic Programming',
        content: `# Dynamic Programming

Solve optimization problems by breaking into overlapping subproblems.

## Key Concepts

1. **Overlapping Subproblems**: Same subproblems solved multiple times
2. **Optimal Substructure**: Optimal solution uses optimal sub-solutions
3. **Memoization** (top-down) or **Tabulation** (bottom-up)

## Fibonacci

\`\`\`python
# Top-down (memoization)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Bottom-up (tabulation)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space optimized
def fib_opt(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
\`\`\`

## Coin Change

\`\`\`python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
\`\`\`

## Longest Common Subsequence

\`\`\`python
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
\`\`\`

## Key Takeaways

- Start with recursion, add memoization
- Identify state and transitions
- Optimize space by keeping only necessary rows
`,
    },

    // Step 1-2-6: Greedy Algorithms
    'step-1-2-6': {
        title: 'Greedy Algorithms',
        content: `# Greedy Algorithms

Make locally optimal choice at each step.

## When Greedy Works

Greedy works when:
1. Problem has optimal substructure
2. Greedy choice leads to global optimum

## Activity Selection

\`\`\`python
def activity_selection(activities):
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    result = [activities[0]]
    for start, end in activities[1:]:
        if start >= result[-1][1]:
            result.append((start, end))
    return result
\`\`\`

## Jump Game

\`\`\`python
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
    return True
\`\`\`

## Interval Scheduling

\`\`\`python
def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = float('-inf')
    for interval in intervals:
        if interval[0] >= end:
            end = interval[1]
        else:
            count += 1
    return count
\`\`\`

## Greedy vs DP

| Approach | When to Use |
|----------|-------------|
| Greedy | Local choice works, faster |
| DP | Need to consider all options |

## Key Takeaways

- Greedy is often simpler and faster than DP
- Prove greedy choice property before using
- Common in interval and scheduling problems
`,
    },

    // Step 1-2-7: Graph Algorithms
    'step-1-2-7': {
        title: 'Graph Algorithms',
        content: `# Graph Algorithms

Advanced graph techniques for interviews.

## Dijkstra's Shortest Path

\`\`\`python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        dist, node = heapq.heappop(pq)
        if dist > distances[node]:
            continue
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    return distances
\`\`\`

## Topological Sort

\`\`\`python
def topological_sort(graph):
    in_degree = {u: 0 for u in graph}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1
    
    queue = [u for u in in_degree if in_degree[u] == 0]
    result = []
    
    while queue:
        u = queue.pop(0)
        result.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    return result if len(result) == len(graph) else []
\`\`\`

## Union-Find

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True
\`\`\`

## Key Takeaways

- Dijkstra: weighted shortest path (no negative edges)
- Topological Sort: DAG ordering, prerequisite problems
- Union-Find: connected components, cycle detection
`,
    },

    // Step 1-2-8: Backtracking
    'step-1-2-8': {
        title: 'Backtracking',
        content: `# Backtracking

Explore all possibilities by building incrementally.

## Template

\`\`\`python
def backtrack(path, choices):
    if is_solution(path):
        result.append(path[:])
        return
    for choice in choices:
        if is_valid(choice):
            path.append(choice)
            backtrack(path, remaining_choices)
            path.pop()  # Undo choice
\`\`\`

## Subsets

\`\`\`python
def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result
\`\`\`

## Permutations

\`\`\`python
def permutations(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i, num in enumerate(remaining):
            path.append(num)
            backtrack(path, remaining[:i] + remaining[i+1:])
            path.pop()
    backtrack([], nums)
    return result
\`\`\`

## N-Queens

\`\`\`python
def solve_n_queens(n):
    result = []
    def backtrack(row, cols, diag1, diag2, board):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue
            board[row][col] = 'Q'
            backtrack(row+1, cols|{col}, diag1|{row-col}, diag2|{row+col}, board)
            board[row][col] = '.'
    backtrack(0, set(), set(), set(), [['.']*n for _ in range(n)])
    return result
\`\`\`

## Key Takeaways

- Backtracking = DFS + pruning
- Always undo choices before trying next
- Use sets/bitmasks for efficient constraint checking
`,
    },

    // Step 1-3-1: Recursion Fundamentals
    'step-1-3-1': {
        title: 'Recursion Fundamentals',
        content: `# Recursion Fundamentals

Solve problems by breaking them into smaller versions of the same problem.

## Anatomy of Recursion

\`\`\`python
def recursive_function(input):
    # 1. Base case - when to stop
    if is_base_case(input):
        return base_result
    
    # 2. Recursive case - call itself with smaller input
    smaller_input = make_smaller(input)
    sub_result = recursive_function(smaller_input)
    
    # 3. Combine results
    return combine(sub_result)
\`\`\`

## Classic Examples

\`\`\`python
# Factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Sum of list
def sum_list(arr):
    if not arr:
        return 0
    return arr[0] + sum_list(arr[1:])

# Reverse string
def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]
\`\`\`

## Tail Recursion

\`\`\`python
# Not tail recursive
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Needs n after return

# Tail recursive
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, n * acc)  # Nothing after return
\`\`\`

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Readability | Often cleaner | Sometimes verbose |
| Space | O(n) stack | O(1) typically |
| Speed | Overhead | Generally faster |

## Key Takeaways

- Always define base case first
- Ensure progress toward base case
- Watch for stack overflow on deep recursion
- Convert to iteration when performance matters
`,
    },

    // Step 1-3-2: Bit Manipulation
    'step-1-3-2': {
        title: 'Bit Manipulation',
        content: `# Bit Manipulation

Work directly with binary representations.

## Operators

| Operator | Name | Example |
|----------|------|---------|
| & | AND | 5 & 3 = 1 |
| \\| | OR | 5 \\| 3 = 7 |
| ^ | XOR | 5 ^ 3 = 6 |
| ~ | NOT | ~5 = -6 |
| << | Left Shift | 5 << 1 = 10 |
| >> | Right Shift | 5 >> 1 = 2 |

## Common Tricks

\`\`\`python
# Check if nth bit is set
def is_bit_set(num, n):
    return (num & (1 << n)) != 0

# Set nth bit
def set_bit(num, n):
    return num | (1 << n)

# Clear nth bit
def clear_bit(num, n):
    return num & ~(1 << n)

# Toggle nth bit
def toggle_bit(num, n):
    return num ^ (1 << n)

# Check if power of 2
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Count set bits
def count_bits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count
\`\`\`

## Single Number (XOR)

\`\`\`python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
\`\`\`

## Key Takeaways

- XOR: a ^ a = 0, a ^ 0 = a
- n & (n-1) removes rightmost set bit
- Left shift = multiply by 2
- Right shift = divide by 2
`,
    },

    // Step 1-3-3: Math for CS
    'step-1-3-3': {
        title: 'Math for CS',
        content: `# Math for CS

Mathematical foundations for algorithms.

## GCD & LCM

\`\`\`python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a * b // gcd(a, b)
\`\`\`

## Modular Arithmetic

\`\`\`python
# (a + b) mod m = ((a mod m) + (b mod m)) mod m
# (a * b) mod m = ((a mod m) * (b mod m)) mod m

MOD = 10**9 + 7

def mod_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:
            result = (result * base) % mod
        exp >>= 1
        base = (base * base) % mod
    return result
\`\`\`

## Primes

\`\`\`python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def sieve_of_eratosthenes(n):
    primes = [True] * (n + 1)
    primes[0] = primes[1] = False
    for i in range(2, int(n**0.5) + 1):
        if primes[i]:
            for j in range(i*i, n + 1, i):
                primes[j] = False
    return [i for i in range(n + 1) if primes[i]]
\`\`\`

## Combinations

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def nCr(n, r):
    if r == 0 or r == n:
        return 1
    return nCr(n-1, r-1) + nCr(n-1, r)
\`\`\`

## Key Takeaways

- GCD uses Euclidean algorithm: O(log min(a,b))
- Modular exponentiation: O(log exp)
- Sieve of Eratosthenes: O(n log log n)
- Pascal's Triangle for combinations
`,
    },

    // Step 1-4-1 through 1-4-4: Project steps
    'step-1-4-1': {
        title: 'Project P1: Data Structures Library',
        content: `# Project P1: Data Structures Library

Implement core data structures from scratch in C++.

## Overview

Build a library containing:
- Dynamic Array (Vector)
- Linked List
- Hash Table
- Binary Search Tree

## Dynamic Array

\`\`\`cpp
template<typename T>
class Vector {
    T* data;
    size_t size_;
    size_t capacity_;
public:
    Vector() : data(nullptr), size_(0), capacity_(0) {}
    
    void push_back(const T& val) {
        if (size_ == capacity_) resize(capacity_ ? capacity_ * 2 : 1);
        data[size_++] = val;
    }
    
    T& operator[](size_t i) { return data[i]; }
    size_t size() const { return size_; }
    
private:
    void resize(size_t new_cap) {
        T* new_data = new T[new_cap];
        for (size_t i = 0; i < size_; ++i)
            new_data[i] = std::move(data[i]);
        delete[] data;
        data = new_data;
        capacity_ = new_cap;
    }
};
\`\`\`

## Learning Objectives

- Template metaprogramming
- Memory management
- Iterator implementation
- Unit testing with assertions

## Extension Challenges

1. Add iterator support
2. Implement emplace_back with variadic templates
3. Add exception safety guarantees
`,
    },

    'step-1-4-2': {
        title: 'Project P2: Algorithm Visualizer',
        content: `# Project P2: Algorithm Visualizer CLI

Visualize sorting and searching algorithms in the terminal.

## Overview

Create a Python CLI that:
- Displays algorithm steps with ASCII art
- Shows comparisons and swaps
- Tracks performance metrics

## Basic Structure

\`\`\`python
import time

def visualize_bubble_sort(arr):
    n = len(arr)
    comparisons = swaps = 0
    
    for i in range(n):
        for j in range(n - 1 - i):
            comparisons += 1
            print_array(arr, highlight=[j, j+1])
            time.sleep(0.3)
            
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
    
    return comparisons, swaps

def print_array(arr, highlight=[]):
    for i, val in enumerate(arr):
        marker = '>' if i in highlight else ' '
        bar = '█' * val
        print(f"{marker}{val:3} |{bar}")
    print("-" * 50)
\`\`\`

## Algorithms to Implement

- Bubble Sort, Selection Sort, Insertion Sort
- Merge Sort, Quick Sort
- Binary Search

## Learning Objectives

- Algorithm complexity analysis
- Terminal manipulation
- User interaction
`,
    },

    'step-1-4-3': {
        title: 'Project P3: Recursive Problem Set',
        content: `# Project P3: Recursive Problem Set

Master recursion through 10 classic problems.

## Problems

### 1. Tower of Hanoi
\`\`\`python
def hanoi(n, source, target, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    hanoi(n-1, source, auxiliary, target)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n-1, auxiliary, target, source)
\`\`\`

### 2. Generate All Subsets
\`\`\`python
def subsets(nums, index=0, current=[]):
    if index == len(nums):
        print(current)
        return
    subsets(nums, index + 1, current)
    subsets(nums, index + 1, current + [nums[index]])
\`\`\`

### 3. String Permutations
\`\`\`python
def permutations(s, path=""):
    if not s:
        print(path)
        return
    for i in range(len(s)):
        permutations(s[:i] + s[i+1:], path + s[i])
\`\`\`

## Learning Objectives

- Identify base cases
- Trust the recursion
- Visualize call stack
- Convert to iteration when needed
`,
    },

    'step-1-4-4': {
        title: 'Project P4: Bit Manipulation Toolkit',
        content: `# Project P4: Bit Manipulation Toolkit

Build utilities for binary operations in C++.

## Core Functions

\`\`\`cpp
#include <iostream>
#include <string>

class BitToolkit {
public:
    // Display binary representation
    static std::string toBinary(int n, int bits = 32) {
        std::string result;
        for (int i = bits - 1; i >= 0; --i)
            result += ((n >> i) & 1) ? '1' : '0';
        return result;
    }
    
    // Count set bits (Brian Kernighan's algorithm)
    static int countBits(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
    
    // Find single non-duplicate
    static int singleNumber(const std::vector<int>& nums) {
        int result = 0;
        for (int num : nums) result ^= num;
        return result;
    }
    
    // Reverse bits
    static uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; ++i) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }
};
\`\`\`

## Learning Objectives

- Binary arithmetic
- Bit manipulation tricks
- Performance optimization
- Low-level programming
`,
    },

    // Scene 1-5: Design Patterns & OOP
    'step-1-5-1': {
        title: 'SOLID Principles',
        content: `# SOLID Principles

Five fundamental principles for maintainable object-oriented design.

## S - Single Responsibility Principle

A class should have only one reason to change.

\`\`\`python
# Bad: Multiple responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def save_to_database(self):
        # Database logic mixed with domain
        pass
    
    def send_email(self, message):
        # Email logic mixed with domain
        pass

# Good: Separated responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user):
        # Database logic only
        pass

class EmailService:
    def send(self, user, message):
        # Email logic only
        pass
\`\`\`

## O - Open/Closed Principle

Open for extension, closed for modification.

\`\`\`python
# Bad: Modifying existing code for new features
class AreaCalculator:
    def calculate(self, shape):
        if shape.type == "circle":
            return 3.14 * shape.radius ** 2
        elif shape.type == "rectangle":
            return shape.width * shape.height
        # Must modify for every new shape!

# Good: Extend without modifying
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
\`\`\`

## L - Liskov Substitution Principle

Subtypes must be substitutable for their base types.

\`\`\`python
# Bad: Square breaks Rectangle contract
class Rectangle:
    def set_width(self, w): self.width = w
    def set_height(self, h): self.height = h

class Square(Rectangle):
    def set_width(self, w):
        self.width = self.height = w  # Violates LSP!

# Good: Proper abstraction
class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.width = w
        self.height = h
    def area(self):
        return self.width * self.height

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2
\`\`\`

## I - Interface Segregation Principle

Clients shouldn't depend on interfaces they don't use.

\`\`\`python
# Bad: Fat interface
class Worker(ABC):
    @abstractmethod
    def work(self): pass
    @abstractmethod
    def eat(self): pass  # Robots don't eat!

# Good: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass

class Eatable(ABC):
    @abstractmethod
    def eat(self): pass

class Human(Workable, Eatable):
    def work(self): print("Working")
    def eat(self): print("Eating")

class Robot(Workable):
    def work(self): print("Working")
\`\`\`

## D - Dependency Inversion Principle

Depend on abstractions, not concretions.

\`\`\`python
# Bad: High-level depends on low-level
class MySQLDatabase:
    def save(self, data): pass

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Tight coupling!

# Good: Depend on abstraction
class Database(ABC):
    @abstractmethod
    def save(self, data): pass

class MySQLDatabase(Database):
    def save(self, data): pass

class UserService:
    def __init__(self, db: Database):
        self.db = db  # Injected dependency
\`\`\`

## Key Takeaways

- SOLID makes code maintainable and testable
- Apply pragmatically—don't over-engineer
- These principles complement each other
`,
    },

    'step-1-5-2': {
        title: 'Creational Patterns',
        content: `# Creational Design Patterns

Patterns for flexible object creation.

## Factory Method

Create objects without specifying exact class.

\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self): pass

class Dog(Animal):
    def speak(self): return "Woof!"

class Cat(Animal):
    def speak(self): return "Meow!"

class AnimalFactory:
    @staticmethod
    def create(animal_type: str) -> Animal:
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"Unknown animal: {animal_type}")

# Usage
animal = AnimalFactory.create("dog")
print(animal.speak())  # Woof!
\`\`\`

## Singleton

Ensure only one instance exists.

\`\`\`python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Usage
s1 = Singleton()
s2 = Singleton()
assert s1 is s2  # Same instance

# Thread-safe version
import threading

class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance
\`\`\`

## Builder

Construct complex objects step by step.

\`\`\`python
class Pizza:
    def __init__(self):
        self.size = None
        self.cheese = False
        self.pepperoni = False
        self.mushrooms = False

class PizzaBuilder:
    def __init__(self):
        self.pizza = Pizza()
    
    def set_size(self, size):
        self.pizza.size = size
        return self
    
    def add_cheese(self):
        self.pizza.cheese = True
        return self
    
    def add_pepperoni(self):
        self.pizza.pepperoni = True
        return self
    
    def add_mushrooms(self):
        self.pizza.mushrooms = True
        return self
    
    def build(self):
        return self.pizza

# Usage (fluent interface)
pizza = (PizzaBuilder()
    .set_size("large")
    .add_cheese()
    .add_pepperoni()
    .build())
\`\`\`

## Abstract Factory

Create families of related objects.

\`\`\`python
class Button(ABC):
    @abstractmethod
    def render(self): pass

class WindowsButton(Button):
    def render(self): return "Windows Button"

class MacButton(Button):
    def render(self): return "Mac Button"

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass

class WindowsFactory(GUIFactory):
    def create_button(self): return WindowsButton()

class MacFactory(GUIFactory):
    def create_button(self): return MacButton()

# Usage
def create_ui(factory: GUIFactory):
    button = factory.create_button()
    return button.render()
\`\`\`

## When to Use

| Pattern | Use When |
|---------|----------|
| Factory | Object type determined at runtime |
| Singleton | Global shared resource (config, logging) |
| Builder | Complex objects with many options |
| Abstract Factory | Families of related objects |

## Key Takeaways

- Factory: encapsulate object creation
- Singleton: use sparingly (can hinder testing)
- Builder: great for immutable objects with many fields
`,
    },

    'step-1-5-3': {
        title: 'Structural Patterns',
        content: `# Structural Design Patterns

Patterns for composing objects and classes.

## Adapter

Make incompatible interfaces work together.

\`\`\`python
# Existing class (can't modify)
class OldPrinter:
    def print_old(self, text):
        return f"[OLD] {text}"

# New interface we need
class Printer(ABC):
    @abstractmethod
    def print(self, text): pass

# Adapter bridges the gap
class PrinterAdapter(Printer):
    def __init__(self, old_printer: OldPrinter):
        self.old_printer = old_printer
    
    def print(self, text):
        return self.old_printer.print_old(text)

# Usage
old = OldPrinter()
adapter = PrinterAdapter(old)
print(adapter.print("Hello"))  # [OLD] Hello
\`\`\`

## Decorator

Add behavior dynamically without subclassing.

\`\`\`python
class Coffee(ABC):
    @abstractmethod
    def cost(self) -> float: pass
    @abstractmethod
    def description(self) -> str: pass

class SimpleCoffee(Coffee):
    def cost(self): return 2.0
    def description(self): return "Coffee"

class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

class MilkDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.5
    def description(self):
        return f"{self._coffee.description()}, Milk"

class SugarDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.2
    def description(self):
        return f"{self._coffee.description()}, Sugar"

# Usage - stack decorators
coffee = SimpleCoffee()
coffee = MilkDecorator(coffee)
coffee = SugarDecorator(coffee)
print(f"{coffee.description()}: \${coffee.cost()}")
# Coffee, Milk, Sugar: $2.7
\`\`\`

## Facade

Simplified interface to complex subsystem.

\`\`\`python
# Complex subsystem
class CPU:
    def start(self): return "CPU started"

class Memory:
    def load(self): return "Memory loaded"

class Disk:
    def read(self): return "Disk read"

# Simple facade
class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.disk = Disk()
    
    def start(self):
        return [
            self.cpu.start(),
            self.memory.load(),
            self.disk.read()
        ]

# Usage
computer = ComputerFacade()
computer.start()  # Simple interface
\`\`\`

## Proxy

Control access to another object.

\`\`\`python
class RealImage:
    def __init__(self, filename):
        self.filename = filename
        self._load()  # Expensive operation
    
    def _load(self):
        print(f"Loading {self.filename}")
    
    def display(self):
        print(f"Displaying {self.filename}")

class ImageProxy:
    def __init__(self, filename):
        self.filename = filename
        self._real_image = None  # Lazy loading
    
    def display(self):
        if self._real_image is None:
            self._real_image = RealImage(self.filename)
        self._real_image.display()

# Usage - load only when needed
image = ImageProxy("photo.jpg")
# ... later
image.display()  # Now it loads
\`\`\`

## Summary

| Pattern | Purpose |
|---------|---------|
| Adapter | Convert interface |
| Decorator | Add responsibilities |
| Facade | Simplify interface |
| Proxy | Control access |

## Key Takeaways

- Adapter: integrate legacy/third-party code
- Decorator: Python's @ decorators use this concept
- Facade: hide complexity from clients
- Proxy: lazy loading, caching, access control
`,
    },

    'step-1-5-4': {
        title: 'Behavioral Patterns',
        content: `# Behavioral Design Patterns

Patterns for object communication and responsibility.

## Observer

Notify multiple objects of state changes.

\`\`\`python
from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, message: str): pass

class Subject:
    def __init__(self):
        self._observers = []
    
    def attach(self, observer: Observer):
        self._observers.append(observer)
    
    def detach(self, observer: Observer):
        self._observers.remove(observer)
    
    def notify(self, message: str):
        for observer in self._observers:
            observer.update(message)

class EmailSubscriber(Observer):
    def __init__(self, name):
        self.name = name
    
    def update(self, message):
        print(f"{self.name} received: {message}")

# Usage
newsletter = Subject()
newsletter.attach(EmailSubscriber("Alice"))
newsletter.attach(EmailSubscriber("Bob"))
newsletter.notify("New article published!")
\`\`\`

## Strategy

Define family of interchangeable algorithms.

\`\`\`python
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: float): pass

class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number):
        self.card = card_number
    
    def pay(self, amount):
        return f"Paid \${amount} via Credit Card"

class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email
    
    def pay(self, amount):
        return f"Paid \${amount} via PayPal"

class ShoppingCart:
    def __init__(self):
        self.total = 0
    
    def checkout(self, payment: PaymentStrategy):
        return payment.pay(self.total)

# Usage - swap algorithms at runtime
cart = ShoppingCart()
cart.total = 100

print(cart.checkout(CreditCardPayment("1234")))
print(cart.checkout(PayPalPayment("user@email.com")))
\`\`\`

## Command

Encapsulate requests as objects.

\`\`\`python
class Command(ABC):
    @abstractmethod
    def execute(self): pass
    @abstractmethod
    def undo(self): pass

class Light:
    def on(self): print("Light ON")
    def off(self): print("Light OFF")

class LightOnCommand(Command):
    def __init__(self, light: Light):
        self.light = light
    
    def execute(self):
        self.light.on()
    
    def undo(self):
        self.light.off()

class RemoteControl:
    def __init__(self):
        self.history = []
    
    def execute(self, command: Command):
        command.execute()
        self.history.append(command)
    
    def undo(self):
        if self.history:
            command = self.history.pop()
            command.undo()

# Usage
light = Light()
remote = RemoteControl()
remote.execute(LightOnCommand(light))  # Light ON
remote.undo()  # Light OFF
\`\`\`

## Template Method

Define algorithm skeleton, let subclasses fill in steps.

\`\`\`python
class DataProcessor(ABC):
    def process(self):
        self.read_data()
        self.transform_data()
        self.save_data()
    
    @abstractmethod
    def read_data(self): pass
    
    @abstractmethod
    def transform_data(self): pass
    
    def save_data(self):
        print("Saving to default location")

class CSVProcessor(DataProcessor):
    def read_data(self):
        print("Reading CSV file")
    
    def transform_data(self):
        print("Parsing CSV rows")

class JSONProcessor(DataProcessor):
    def read_data(self):
        print("Reading JSON file")
    
    def transform_data(self):
        print("Parsing JSON objects")

# Usage
processor = CSVProcessor()
processor.process()
\`\`\`

## Summary

| Pattern | Use When |
|---------|----------|
| Observer | Many objects need updates |
| Strategy | Swap algorithms at runtime |
| Command | Undo/redo, queuing operations |
| Template | Shared algorithm structure |

## Key Takeaways

- Observer: event systems, pub/sub
- Strategy: avoid conditionals for algorithm selection
- Command: decouple invoker from executor
- Template: reuse invariant parts of algorithms
`,
    },
};

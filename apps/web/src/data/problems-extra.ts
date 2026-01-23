/**
 * Additional essential problems (Heaps, Greedy, Tries, Bit Manipulation)
 */
import { Problem } from "./problems";

export const heapProblems: Problem[] = [
    {
        id: "kth-largest-element",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        pattern: "Heap",
        tags: ["array", "heap", "quickselect"],
        description: "Given an integer array nums and an integer k, return the kth largest element.",
        examples: [
            { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
        ],
        constraints: ["1 <= k <= nums.length <= 10^5"],
        solutions: {
            python: `import heapq

def find_kth_largest(nums, k):
    """Min heap of size k - top is kth largest."""
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

# Quickselect O(n) average
def quickselect(nums, k):
    k = len(nums) - k  # kth largest = (n-k)th smallest
    
    def select(l, r):
        pivot = nums[r]
        p = l
        for i in range(l, r):
            if nums[i] <= pivot:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1
        nums[p], nums[r] = nums[r], nums[p]
        
        if p == k: return nums[p]
        elif p < k: return select(p + 1, r)
        else: return select(l, p - 1)
    
    return select(0, len(nums) - 1)

print(find_kth_largest([3,2,1,5,6,4], 2))  # 5`,
            cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
        },
        explanation: `## Min Heap of Size K
Keep only k largest elements in min heap. Top is kth largest.`,
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(k)",
    },
    {
        id: "find-median-data-stream",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        pattern: "Heap",
        tags: ["heap", "design", "two-pointers"],
        description: "Design a data structure that supports adding integers and finding the median.",
        examples: [
            { input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "1.5, 2.0" },
        ],
        constraints: ["-10^5 <= num <= 10^5"],
        solutions: {
            python: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max heap (negate values)
        self.large = []  # Min heap
    
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        
        # Ensure small's max <= large's min
        if self.small and self.large and -self.small[0] > self.large[0]:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        
        # Balance sizes
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small) + 1:
            heapq.heappush(self.small, -heapq.heappop(self.large))
    
    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        if len(self.large) > len(self.small):
            return self.large[0]
        return (-self.small[0] + self.large[0]) / 2

mf = MedianFinder()
mf.addNum(1); mf.addNum(2)
print(mf.findMedian())  # 1.5`,
            cpp: `class MedianFinder {
    priority_queue<int> small;  // Max heap
    priority_queue<int, vector<int>, greater<int>> large;  // Min heap
public:
    void addNum(int num) {
        small.push(num);
        large.push(small.top()); small.pop();
        if (large.size() > small.size()) {
            small.push(large.top()); large.pop();
        }
    }
    
    double findMedian() {
        if (small.size() > large.size()) return small.top();
        return (small.top() + large.top()) / 2.0;
    }
};`,
        },
        explanation: `## Two Heaps
Max heap for smaller half, min heap for larger half.
Median is from tops of heaps.`,
        timeComplexity: "O(log n) add, O(1) find",
        spaceComplexity: "O(n)",
    },
    {
        id: "merge-k-sorted-lists",
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        pattern: "Heap",
        tags: ["linked-list", "heap", "divide-conquer"],
        description: "Merge k sorted linked lists into one sorted list.",
        examples: [
            { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
        ],
        constraints: ["0 <= k <= 10^4"],
        solutions: {
            python: `import heapq

def merge_k_lists(lists):
    """Min heap to always get smallest element."""
    heap = []
    
    # Add first element of each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    dummy = ListNode(0)
    curr = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next

print("Merge k lists using min heap")`,
            cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    
    for (auto list : lists)
        if (list) pq.push(list);
    
    ListNode dummy(0);
    ListNode* curr = &dummy;
    
    while (!pq.empty()) {
        curr->next = pq.top(); pq.pop();
        curr = curr->next;
        if (curr->next) pq.push(curr->next);
    }
    return dummy.next;
}`,
        },
        explanation: `## Min Heap
Always extract smallest from all list heads.
Push next node from same list after extraction.`,
        timeComplexity: "O(N log k)",
        spaceComplexity: "O(k)",
    },
];

export const greedyProblems: Problem[] = [
    {
        id: "jump-game",
        title: "Jump Game",
        difficulty: "Medium",
        pattern: "Greedy",
        tags: ["array", "greedy", "dp"],
        description: "Given an array where nums[i] is max jump length from i, return if you can reach the last index.",
        examples: [
            { input: "nums = [2,3,1,1,4]", output: "true" },
            { input: "nums = [3,2,1,0,4]", output: "false" },
        ],
        constraints: ["1 <= nums.length <= 10^4"],
        solutions: {
            python: `def can_jump(nums):
    """Track farthest reachable index."""
    max_reach = 0
    
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
    
    return True

print(can_jump([2, 3, 1, 1, 4]))  # True`,
            cpp: `bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}`,
        },
        explanation: `## Greedy: Track Max Reach
At each step, update farthest reachable position.
If current index exceeds max reach, can't continue.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "jump-game-ii",
        title: "Jump Game II",
        difficulty: "Medium",
        pattern: "Greedy",
        tags: ["array", "greedy", "dp"],
        description: "Return minimum number of jumps to reach the last index.",
        examples: [
            { input: "nums = [2,3,1,1,4]", output: "2", explanation: "Jump 1 step (0->1), then 3 steps (1->4)" },
        ],
        constraints: ["1 <= nums.length <= 10^4"],
        solutions: {
            python: `def jump(nums):
    """BFS-like greedy: levels are jumps."""
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps

print(jump([2, 3, 1, 1, 4]))  # 2`,
            cpp: `int jump(vector<int>& nums) {
    int jumps = 0, currentEnd = 0, farthest = 0;
    
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}`,
        },
        explanation: `## BFS-like Greedy
Track the farthest we can go in current "level".
When we reach end of level, increment jumps.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "gas-station",
        title: "Gas Station",
        difficulty: "Medium",
        pattern: "Greedy",
        tags: ["array", "greedy"],
        description: "Find the starting gas station index to complete a circular route, or return -1.",
        examples: [
            { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
        ],
        constraints: ["1 <= n <= 10^5"],
        solutions: {
            python: `def can_complete_circuit(gas, cost):
    """If total >= 0, solution exists. Reset start at deficit."""
    total = 0
    current = 0
    start = 0
    
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        current += diff
        
        if current < 0:
            start = i + 1
            current = 0
    
    return start if total >= 0 else -1

print(can_complete_circuit([1,2,3,4,5], [3,4,5,1,2]))  # 3`,
            cpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total = 0, current = 0, start = 0;
    
    for (int i = 0; i < gas.size(); i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        current += diff;
        
        if (current < 0) {
            start = i + 1;
            current = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
        },
        explanation: `## Key Insight
If total gas >= total cost, solution exists.
Start from position after first deficit.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
];

export const bitProblems: Problem[] = [
    {
        id: "single-number",
        title: "Single Number",
        difficulty: "Easy",
        pattern: "Bit Manipulation",
        tags: ["array", "bit-manipulation"],
        description: "Every element appears twice except one. Find the single one.",
        examples: [
            { input: "nums = [2,2,1]", output: "1" },
        ],
        constraints: ["1 <= nums.length <= 3 * 10^4"],
        solutions: {
            python: `def single_number(nums):
    """XOR: a ^ a = 0, a ^ 0 = a"""
    result = 0
    for num in nums:
        result ^= num
    return result

print(single_number([4, 1, 2, 1, 2]))  # 4`,
            cpp: `int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}`,
        },
        explanation: `## XOR Properties
a ^ a = 0, a ^ 0 = a. XOR all numbers, pairs cancel out.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "number-of-1-bits",
        title: "Number of 1 Bits",
        difficulty: "Easy",
        pattern: "Bit Manipulation",
        tags: ["bit-manipulation"],
        description: "Return the number of '1' bits in an unsigned integer.",
        examples: [
            { input: "n = 11 (binary: 1011)", output: "3" },
        ],
        constraints: ["Input is a 32-bit unsigned integer"],
        solutions: {
            python: `def hamming_weight(n):
    """n & (n-1) removes rightmost 1 bit."""
    count = 0
    while n:
        n &= (n - 1)
        count += 1
    return count

print(hamming_weight(11))  # 3`,
            cpp: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
        },
        explanation: `## Brian Kernighan's Algorithm
n & (n-1) removes the rightmost 1 bit. Count iterations.`,
        timeComplexity: "O(k) where k = number of 1 bits",
        spaceComplexity: "O(1)",
    },
    {
        id: "counting-bits",
        title: "Counting Bits",
        difficulty: "Easy",
        pattern: "Bit Manipulation",
        tags: ["bit-manipulation", "dp"],
        description: "Return array where ans[i] is the number of 1's in binary representation of i, for 0 <= i <= n.",
        examples: [
            { input: "n = 5", output: "[0,1,1,2,1,2]" },
        ],
        constraints: ["0 <= n <= 10^5"],
        solutions: {
            python: `def count_bits(n):
    """DP: bits[i] = bits[i >> 1] + (i & 1)"""
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

print(count_bits(5))  # [0,1,1,2,1,2]`,
            cpp: `vector<int> countBits(int n) {
    vector<int> dp(n + 1);
    for (int i = 1; i <= n; i++)
        dp[i] = dp[i >> 1] + (i & 1);
    return dp;
}`,
        },
        explanation: `## DP Relation
bits(i) = bits(i/2) + last bit of i`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
    },
    {
        id: "reverse-bits",
        title: "Reverse Bits",
        difficulty: "Easy",
        pattern: "Bit Manipulation",
        tags: ["bit-manipulation"],
        description: "Reverse bits of a 32-bit unsigned integer.",
        examples: [
            { input: "n = 43261596", output: "964176192" },
        ],
        constraints: ["Input is a 32-bit unsigned integer"],
        solutions: {
            python: `def reverse_bits(n):
    """Extract bits from right, build result from left."""
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result

print(bin(reverse_bits(0b00000010100101000001111010011100)))`,
            cpp: `uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}`,
        },
        explanation: `## Bit by Bit
Extract rightmost bit from n, add to left of result. Repeat 32 times.`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
    },
    {
        id: "sum-of-two-integers",
        title: "Sum of Two Integers",
        difficulty: "Medium",
        pattern: "Bit Manipulation",
        tags: ["bit-manipulation", "math"],
        description: "Calculate sum of two integers without using + or -.",
        examples: [
            { input: "a = 1, b = 2", output: "3" },
        ],
        constraints: ["-1000 <= a, b <= 1000"],
        solutions: {
            python: `def get_sum(a, b):
    """XOR for sum without carry, AND for carry."""
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF
    
    while b != 0:
        carry = (a & b) << 1
        a = (a ^ b) & MASK
        b = carry & MASK
    
    return a if a <= MAX else ~(a ^ MASK)

print(get_sum(1, 2))  # 3`,
            cpp: `int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
        },
        explanation: `## Bit Addition
XOR gives sum without carry. AND gives carry positions.
Repeat until no carry.`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
    },
];

export const trieProblems: Problem[] = [
    {
        id: "implement-trie",
        title: "Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        pattern: "Trie",
        tags: ["trie", "design", "string"],
        description: "Implement a trie with insert, search, and startsWith methods.",
        examples: [
            { input: 'insert("apple"), search("apple"), search("app"), startsWith("app")', output: "true, false, true" },
        ],
        constraints: ["1 <= word.length, prefix.length <= 2000"],
        solutions: {
            python: `class TrieNode:
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
    
    def startsWith(self, prefix):
        return self._find(prefix) is not None
    
    def _find(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

trie = Trie()
trie.insert("apple")
print(trie.search("apple"))    # True
print(trie.startsWith("app"))  # True`,
            cpp: `class Trie {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool isEnd = false;
    };
    TrieNode* root;
    
    TrieNode* find(string& s) {
        TrieNode* node = root;
        for (char c : s) {
            if (!node->children.count(c)) return nullptr;
            node = node->children[c];
        }
        return node;
    }
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c))
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        TrieNode* node = find(word);
        return node && node->isEnd;
    }
    
    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }
};`,
        },
        explanation: `## Trie Structure
Tree where each node has children for each character.
Mark word endings with a flag.`,
        timeComplexity: "O(m) for all operations",
        spaceComplexity: "O(m * n)",
    },
    {
        id: "word-search-ii",
        title: "Word Search II",
        difficulty: "Hard",
        pattern: "Trie",
        tags: ["trie", "backtracking", "matrix"],
        description: "Given a board and a list of words, return all words that exist on the board.",
        examples: [
            { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
        ],
        constraints: ["1 <= m, n <= 12", "1 <= words.length <= 3 * 10^4"],
        solutions: {
            python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

def find_words(board, words):
    # Build trie
    root = TrieNode()
    for word in words:
        node = root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.word = word
    
    rows, cols = len(board), len(board[0])
    result = []
    
    def dfs(r, c, node):
        char = board[r][c]
        if char not in node.children:
            return
        
        next_node = node.children[char]
        if next_node.word:
            result.append(next_node.word)
            next_node.word = None  # Avoid duplicates
        
        board[r][c] = '#'
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                dfs(nr, nc, next_node)
        board[r][c] = char
    
    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)
    
    return result

print("Trie + DFS backtracking")`,
            cpp: `// Similar structure with Trie + DFS backtracking
// Build trie from words, then DFS on board checking trie paths`,
        },
        explanation: `## Trie + Backtracking
Build trie from word list. DFS on board while following trie paths.
Much faster than checking each word separately.`,
        timeComplexity: "O(m * n * 4^L)",
        spaceComplexity: "O(sum of word lengths)",
    },
];

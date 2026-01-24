/**
 * Act 1: CS Foundations - Step Content
 * Data Structures, Algorithms, Recursion, and Math
 */

export const act1Content: Record<string, { title: string; content: string }> = {
    // Step 1-1-2: Linked Lists
    'step-1-1-2': {
        title: 'Linked Lists',
        content: `# Linked Lists

## Why This Matters

Linked lists are the foundation for understanding **pointers and references** — a concept that trips up many developers. Mastering linked lists helps you:

- Build more complex data structures (trees, graphs, LRU caches)
- Understand **memory management** and pointer manipulation
- Ace the **most common interview category** (linked list problems are everywhere!)
- Think recursively and iteratively about data

---

## The Train Analogy 🚂

Think of a linked list like train cars connected together:

| Array | Linked List |
|-------|-------------|
| Seats in a theater row | Train cars connected by couplers |
| Must be contiguous | Can be anywhere in memory |
| Fixed seating arrangement | Easy to add/remove cars |
| Quick to find seat 47 | Must walk through cars to find one |

---

## Singly Linked List

Each node points to the next node:

\`\`\`mermaid
flowchart LR
    H["Head"] --> A["1 | •"]
    A --> B["2 | •"]
    B --> C["3 | •"]
    C --> N["null"]
    style H fill:#22c55e
    style N fill:#ef4444
\`\`\`

### Implementation

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        """Add to end - O(n)"""
        if not self.head:
            self.head = ListNode(val)
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = ListNode(val)
    
    def prepend(self, val):
        """Add to front - O(1)"""
        self.head = ListNode(val, self.head)
    
    def delete(self, val):
        """Remove first occurrence - O(n)"""
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
    
    def find(self, val):
        """Search for value - O(n)"""
        curr = self.head
        while curr:
            if curr.val == val:
                return curr
            curr = curr.next
        return None
\`\`\`

---

## Doubly Linked List

Each node points both forward AND backward:

\`\`\`mermaid
flowchart LR
    N1["null"] --- A["prev 1 next"]
    A --- B["prev 2 next"]
    B --- C["prev 3 next"]
    C --- N2["null"]
\`\`\`

\`\`\`python
class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

# Useful for: LRU Cache, browser history, undo/redo
\`\`\`

---

## Time Complexity Comparison

| Operation | Array | Singly LL | Doubly LL |
|-----------|-------|-----------|-----------|
| Access by index | O(1) | O(n) | O(n) |
| Insert at head | O(n) | **O(1)** | **O(1)** |
| Insert at tail | O(1)* | O(n) | **O(1)** |
| Insert in middle | O(n) | O(n) | O(n) |
| Delete at head | O(n) | **O(1)** | **O(1)** |
| Delete at tail | O(1) | O(n) | **O(1)** |
| Search | O(n) | O(n) | O(n) |

---

## Essential Techniques

### 1. Reverse a Linked List ⭐

The most important linked list problem!

\`\`\`python
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward
    return prev
\`\`\`

\`\`\`mermaid
flowchart LR
    subgraph before["Before"]
        A1["1"] --> B1["2"] --> C1["3"] --> N1["null"]
    end
    subgraph after["After"]
        N2["null"] --- A2["1"] --- B2["2"] --- C2["3"]
    end
\`\`\`

### 2. Two-Pointer / Fast-Slow Technique

For cycle detection, middle element, nth from end:

\`\`\`python
def find_middle(head):
    """Slow moves 1 step, fast moves 2 steps"""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow is at middle when fast reaches end

def has_cycle(head):
    """Floyd's Cycle Detection"""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
\`\`\`

### 3. Dummy Head Technique

Simplifies edge cases when modifying head:

\`\`\`python
def remove_elements(head, val):
    """Remove all nodes with given value"""
    dummy = ListNode(0, head)  # Dummy points to head
    curr = dummy
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return dummy.next  # Return new head
\`\`\`

---

## Common Interview Problems

| Problem | Technique | Difficulty |
|---------|-----------|------------|
| Reverse Linked List | Three pointers | Easy |
| Detect Cycle | Fast/slow pointers | Medium |
| Merge Two Sorted Lists | Two pointers | Easy |
| Remove Nth From End | Fast/slow with gap | Medium |
| LRU Cache | Doubly LL + HashMap | Hard |
| Palindrome Linked List | Reverse half + compare | Medium |

---

## Interview Insights 💡

**Common Questions**:
1. "Reverse a linked list" (iterative AND recursive)
2. "Detect if a linked list has a cycle"
3. "Find the middle of a linked list"
4. "Merge two sorted linked lists"

**Key Talking Points**:
- Linked lists excel at O(1) insertions/deletions when you have the node
- Arrays are better for random access
- Always draw the pointers before coding!
- Watch for edge cases: empty list, single node, cycle

**Red Flags Interviewers Watch For**:
- Not handling null/empty list
- Losing reference to next node before reassigning
- Off-by-one errors in loops
- Not considering the last node

---

## Key Takeaways

✅ Linked lists trade **random access for O(1) insertion/deletion**  
✅ **Singly linked**: simple, forward-only, common in interviews  
✅ **Doubly linked**: forward+backward, used in LRU cache  
✅ **Master these patterns**: reverse, two-pointer, dummy head  
✅ **Draw the pointers** before writing any code  
✅ Always handle edge cases: null, single node, cycles
`,
    },

    // Step 1-1-3: Stacks & Queues
    'step-1-1-3': {
        title: 'Stacks & Queues',
        content: `# Stacks & Queues

## Why This Matters

Stacks and queues are everywhere — from your browser's back button to how BFS explores graphs. Understanding these helps you:

- Model **real-world systems** (undo/redo, print queues, task scheduling)
- Solve classic interview problems (valid parentheses, simplify path)
- Understand **recursion** (the call stack is literally a stack!)
- Build more complex algorithms (DFS uses stacks, BFS uses queues)

---

## Real-World Analogies

| Data Structure | Real-World Analogy | Principle |
|----------------|-------------------|-----------|
| **Stack** | Stack of plates | Last In, First Out (LIFO) |
| **Queue** | Line at a coffee shop | First In, First Out (FIFO) |

---

## Stack (LIFO)

\`\`\`mermaid
flowchart TB
    subgraph stack["Stack"]
        T["Top → 3"]
        M["2"]
        B["1"]
    end
    PUSH["push(4)"] --> T
    T --> POP["pop() → 3"]
\`\`\`

### Implementation

\`\`\`python
# Using Python list (simple, O(1) operations)
stack = []
stack.append(1)     # Push → [1]
stack.append(2)     # Push → [1, 2]
stack.append(3)     # Push → [1, 2, 3]
top = stack[-1]     # Peek → 3
val = stack.pop()   # Pop → 3, stack = [1, 2]

# Using deque (more explicit, also O(1))
from collections import deque
stack = deque()
stack.append(1)
stack.pop()
\`\`\`

### C++ Stack

\`\`\`cpp
#include <stack>

std::stack<int> s;
s.push(1);        // Push
s.push(2);
int top = s.top(); // Peek → 2
s.pop();           // Pop (doesn't return value!)
bool empty = s.empty();
\`\`\`

### Stack Use Cases

| Use Case | How It Works |
|----------|--------------|
| **Undo/Redo** | Push actions, pop to undo |
| **Browser Back** | Push visited pages, pop to go back |
| **Function Calls** | Call stack tracks return addresses |
| **Expression Parsing** | Evaluate postfix, check balanced parens |
| **DFS Traversal** | Explicit stack or recursion |

---

## Queue (FIFO)

\`\`\`mermaid
flowchart LR
    subgraph queue["Queue"]
        F["Front → 1"]
        M["2"]
        B["3 ← Back"]
    end
    ENQ["enqueue(4)"] --> B
    F --> DEQ["dequeue() → 1"]
\`\`\`

### Implementation

\`\`\`python
from collections import deque

queue = deque()
queue.append(1)      # Enqueue → [1]
queue.append(2)      # Enqueue → [1, 2]
queue.append(3)      # Enqueue → [1, 2, 3]
front = queue[0]     # Peek → 1
val = queue.popleft() # Dequeue → 1, queue = [2, 3]
\`\`\`

### C++ Queue

\`\`\`cpp
#include <queue>

std::queue<int> q;
q.push(1);          // Enqueue
q.push(2);
int front = q.front(); // Peek → 1
q.pop();             // Dequeue (doesn't return value!)
\`\`\`

### Queue Use Cases

| Use Case | How It Works |
|----------|--------------|
| **Print Queue** | Documents printed in order received |
| **Task Scheduling** | Process tasks in order of arrival |
| **BFS Traversal** | Explore nodes level by level |
| **Message Queues** | RabbitMQ, Kafka for async processing |

---

## Complexity

| Operation | Stack | Queue (deque) |
|-----------|-------|---------------|
| Push / Enqueue | O(1) | O(1) |
| Pop / Dequeue | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(n) |

⚠️ Don't use Python's \`list\` for queue — \`popleft()\` is O(n) on list, O(1) on deque!

---

## Classic Problems

### 1. Valid Parentheses ⭐

\`\`\`python
def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:  # Closing bracket
            if not stack or stack.pop() != mapping[char]:
                return False
        else:  # Opening bracket
            stack.append(char)
    
    return len(stack) == 0  # Stack should be empty

# Examples:
# "()" → True
# "()[]{}" → True  
# "(]" → False
# "([)]" → False (order matters!)
\`\`\`

### 2. Implement Queue using Stacks

\`\`\`python
class MyQueue:
    def __init__(self):
        self.in_stack = []   # For pushing
        self.out_stack = []  # For popping (reversed order)
    
    def push(self, x: int) -> None:
        self.in_stack.append(x)
    
    def pop(self) -> int:
        self.peek()  # Ensure out_stack has elements
        return self.out_stack.pop()
    
    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]
    
    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack
\`\`\`

### 3. Min Stack

\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []      # (value, min_so_far)
    
    def push(self, val: int) -> None:
        curr_min = min(val, self.stack[-1][1] if self.stack else val)
        self.stack.append((val, curr_min))
    
    def pop(self) -> None:
        self.stack.pop()
    
    def top(self) -> int:
        return self.stack[-1][0]
    
    def getMin(self) -> int:
        return self.stack[-1][1]
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Valid Parentheses" (use a stack)
2. "Implement Queue using Stacks" 
3. "Min Stack" (track minimum at each level)
4. "Daily Temperatures" (monotonic stack)

**Key Talking Points**:
- Stack = LIFO, Queue = FIFO
- Use \`deque\` in Python, not list for queues
- DFS → Stack, BFS → Queue
- Function calls use an implicit stack

**Red Flags**:
- Using list.pop(0) instead of deque.popleft()
- Not checking if stack is empty before pop
- Confusing LIFO vs FIFO

---

## Key Takeaways

✅ **Stack (LIFO)**: last in, first out — undo, DFS, expression parsing  
✅ **Queue (FIFO)**: first in, first out — BFS, task scheduling  
✅ Use **deque** in Python for O(1) operations on both ends  
✅ **Valid parentheses** is the classic stack problem  
✅ **BFS uses queue**, **DFS uses stack** (or recursion)  
✅ Always check if empty before pop/peek!
`,
    },

    // Step 1-1-4: Hash Tables
    'step-1-1-4': {
        title: 'Hash Tables',
        content: `# Hash Tables

## Why This Matters

Hash tables are the **most important data structure** for interviews and real-world programming. They power:

- **Databases** (indexes), **caches** (Redis), **sets** (deduplication)
- The solution to countless interview problems (Two Sum, anagram detection)
- O(1) average lookup — the fastest possible for large datasets

---

## The Dictionary Analogy 📖

Think of a hash table like a dictionary:

| Looking up a word | Hash Table Operation |
|-------------------|---------------------|
| "What page is 'hash'?" | Where does key map? |
| Calculate page via first letter | Hash function computes index |
| Go directly to H section | Jump to bucket |
| Handle multiple H words | Handle collisions |

---

## How Hash Tables Work

\`\`\`mermaid
flowchart LR
    K["Key: apple"] --> H["hash = 7"]
    H --> B["Bucket 7"]
    B --> V["Value: red fruit"]
\`\`\`

1. **Hash function** converts key to index
2. Store value at that index
3. **Handle collisions** when multiple keys map to same index

---

## Implementation (Chaining)

\`\`\`python
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.buckets = [[] for _ in range(size)]  # Array of linked lists
    
    def _hash(self, key):
        """Convert key to index"""
        return hash(key) % self.size
    
    def put(self, key, value):
        """Insert or update key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]
        
        # Update if key exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Insert new key-value pair
        bucket.append((key, value))
    
    def get(self, key):
        """Get value by key - O(1) average"""
        index = self._hash(key)
        for k, v in self.buckets[index]:
            if k == key:
                return v
        return None
    
    def delete(self, key):
        """Remove key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.buckets[index]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return True
        return False
\`\`\`

---

## Collision Handling

\`\`\`mermaid
flowchart TB
    subgraph chaining["Chaining"]
        B1["Bucket 7"] --> N1["apple: red"]
        N1 --> N2["grape: purple"]
    end
    subgraph probing["Linear Probing"]
        P1["Bucket 7: apple"]
        P2["Bucket 8: grape"]
        P3["Bucket 9: empty"]
    end
\`\`\`

| Method | Pros | Cons |
|--------|------|------|
| **Chaining** | Simple, never "full" | Extra memory for pointers |
| **Linear Probing** | Cache-friendly | Clustering, deletion tricky |
| **Double Hashing** | Reduced clustering | More complex |

---

## Python dict / C++ unordered_map

### Python

\`\`\`python
# Create and populate
d = {}
d["name"] = "Alice"
d["age"] = 30

# Access
print(d["name"])           # "Alice"
print(d.get("email"))      # None (no error)
print(d.get("email", "?")) # "?" (default value)

# Check existence
if "name" in d:
    print("Found!")

# Iterate
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(f"{key}: {value}")

# Delete
del d["age"]

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}
\`\`\`

### C++

\`\`\`cpp
#include <unordered_map>

std::unordered_map<std::string, int> map;
map["age"] = 25;

// Access
int age = map["age"];          // 25
int count = map.count("age");  // 1 (exists) or 0

// Find with iterator
auto it = map.find("age");
if (it != map.end()) {
    std::cout << it->second;   // 25
}

// Delete
map.erase("age");
\`\`\`

---

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert | **O(1)** | O(n) |
| Lookup | **O(1)** | O(n) |
| Delete | **O(1)** | O(n) |

Worst case happens when all keys hash to same index (bad hash function or attack).

---

## Classic Problems

### 1. Two Sum ⭐

\`\`\`python
def two_sum(nums, target):
    """Return indices of two numbers that add to target"""
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# two_sum([2, 7, 11, 15], 9) → [0, 1]
\`\`\`

### 2. Group Anagrams

\`\`\`python
from collections import defaultdict

def group_anagrams(strs):
    """Group strings that are anagrams of each other"""
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # Anagrams have same sorted chars
        groups[key].append(s)
    return list(groups.values())

# group_anagrams(["eat","tea","tan","ate","nat","bat"])
# → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
\`\`\`

### 3. First Non-Repeating Character

\`\`\`python
from collections import Counter

def first_unique_char(s):
    count = Counter(s)
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    return -1
\`\`\`

---

## When to Use Hash Tables

| Use Case | Why Hash Table |
|----------|----------------|
| **Counting** | O(1) increment per element |
| **Deduplication** | Check if seen in O(1) |
| **Caching** | O(1) lookup by key |
| **Two-pointer substitute** | When array isn't sorted |
| **Grouping** | Keys = groups, values = items |

---

## Interview Insights 💡

**Common Questions**:
1. "Two Sum" (hash map for complement)
2. "Group Anagrams" (sorted string as key)
3. "First Unique Character" (Counter)
4. "LRU Cache" (hash map + doubly linked list)

**Key Talking Points**:
- Hash tables trade space for O(1) time
- Python's dict is a hash table with open addressing
- Good hash functions distribute keys uniformly
- Use \`defaultdict\` or \`Counter\` for cleaner code

**Red Flags**:
- Not considering collision handling
- Forgetting hashability requirements (keys must be immutable)
- O(n) loops when hash table would give O(1)

---

## Key Takeaways

✅ Hash tables provide **O(1) average** insert, lookup, delete  
✅ Hash function maps keys to indices; collisions are handled  
✅ Python's \`dict\`, C++'s \`unordered_map\` are hash tables  
✅ Use for **counting, dedup, caching, grouping**  
✅ **Two Sum** is the quintessential hash table problem  
✅ Keys must be **hashable** (immutable in Python)
`,
    },

    // Step 1-1-5: Trees & BST
    'step-1-1-5': {
        title: 'Trees & BST',
        content: `# Trees & Binary Search Trees

## Why This Matters

Trees are everywhere — file systems, DOM, databases (B-trees), and they're a **top interview topic**. Understanding trees helps you:

- Model **hierarchical data** (org charts, file systems, HTML)
- Implement efficient **search and retrieval** (BST gives O(log n))
- Master **recursion** — trees are recursive by nature
- Solve dozens of classic interview problems

---

## The Family Tree Analogy 👨‍👩‍👧‍👦

| Tree Terminology | Family Analogy |
|-----------------|----------------|
| **Root** | Great-grandparent (top) |
| **Parent** | Direct ancestor |
| **Children** | Direct descendants |
| **Leaf** | Person with no children |
| **Height** | Generations from root to leaf |

---

## Binary Tree Structure

\`\`\`mermaid
flowchart TB
    A["10 (root)"]
    B["5"]
    C["15"]
    D["3"]
    E["7"]
    F["12"]
    G["20"]
    A --> B
    A --> C
    B --> D
    B --> E
    C --> F
    C --> G
    style A fill:#22c55e
\`\`\`

### Node Implementation

\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Build the tree above
root = TreeNode(10)
root.left = TreeNode(5, TreeNode(3), TreeNode(7))
root.right = TreeNode(15, TreeNode(12), TreeNode(20))
\`\`\`

---

## Tree Traversals ⭐

Four ways to visit every node:

\`\`\`mermaid
flowchart LR
    subgraph orders["Traversal Orders"]
        I["Inorder: L, Root, R"]
        P["Preorder: Root, L, R"]
        PO["Postorder: L, R, Root"]
        L["Level-order: BFS"]
    end
\`\`\`

### Implementation

\`\`\`python
# Inorder: Left → Root → Right (gives sorted order in BST!)
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# Preorder: Root → Left → Right (copying tree)
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# Postorder: Left → Right → Root (deleting tree)
def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# Level-order (BFS) - very common in interviews!
from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
\`\`\`

---

## Binary Search Tree (BST)

**Property**: For every node, all left descendants < node < all right descendants

\`\`\`mermaid
flowchart TB
    A["10"]
    B["5: left child"]
    C["15: right child"]
    D["3"]
    E["7"]
    A --> B
    A --> C
    B --> D
    B --> E
    style A fill:#f59e0b
\`\`\`

### BST Operations

\`\`\`python
def search(root, target):
    """O(log n) average, O(n) worst case"""
    if not root or root.val == target:
        return root
    if target < root.val:
        return search(root.left, target)
    return search(root.right, target)

def insert(root, val):
    """O(log n) average"""
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def find_min(root):
    """Leftmost node is minimum"""
    while root.left:
        root = root.left
    return root

def delete(root, key):
    """O(log n) average - three cases"""
    if not root:
        return None
    
    if key < root.val:
        root.left = delete(root.left, key)
    elif key > root.val:
        root.right = delete(root.right, key)
    else:
        # Case 1 & 2: One or no child
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        # Case 3: Two children - replace with inorder successor
        successor = find_min(root.right)
        root.val = successor.val
        root.right = delete(root.right, successor.val)
    return root
\`\`\`

---

## Time Complexity

| Operation | Balanced BST | Unbalanced (Worst) |
|-----------|--------------|-------------------|
| Search | **O(log n)** | O(n) |
| Insert | **O(log n)** | O(n) |
| Delete | **O(log n)** | O(n) |
| Traversal | O(n) | O(n) |

**Balanced trees** (AVL, Red-Black) guarantee O(log n) by rebalancing after operations.

---

## Common Problems

### 1. Maximum Depth ⭐

\`\`\`python
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
\`\`\`

### 2. Validate BST

\`\`\`python
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    if root.val <= min_val or root.val >= max_val:
        return False
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
\`\`\`

### 3. Lowest Common Ancestor (BST)

\`\`\`python
def lca(root, p, q):
    if p.val < root.val and q.val < root.val:
        return lca(root.left, p, q)
    if p.val > root.val and q.val > root.val:
        return lca(root.right, p, q)
    return root  # Split point is LCA
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Maximum depth of binary tree"
2. "Validate BST"
3. "Level order traversal"
4. "Lowest common ancestor"
5. "Invert binary tree"

**Key Talking Points**:
- BST property: left < root < right
- Inorder traversal of BST gives sorted order
- Most tree problems use recursion
- BFS uses queue, DFS uses stack/recursion

**Red Flags**:
- Confusing traversal types
- Not handling null nodes
- Forgetting BST property for optimization

---

## Key Takeaways

✅ Trees model **hierarchical data**; binary trees have at most 2 children  
✅ **BST property**: left < root < right → O(log n) search  
✅ **Inorder** traversal gives sorted order for BST  
✅ **Level-order** uses BFS (queue), others typically use DFS (recursion)  
✅ Balanced trees (AVL, Red-Black) guarantee O(log n)  
✅ Most tree problems solved with **recursion**
`,
    },

    // Step 1-1-6: Heaps
    'step-1-1-6': {
        title: 'Heaps',
        content: `# Heaps & Priority Queues

## Why This Matters

Heaps power priority queues, which are essential for:

- Efficiently finding the **kth largest/smallest** element
- **Task scheduling** (OS process scheduler, job queues)
- **Dijkstra's algorithm** for shortest paths
- Solving many **Top K** interview problems

---

## The Line at the Hospital Analogy 🏥

A priority queue is like a hospital waiting room:

| Regular Queue | Priority Queue (Heap) |
|---------------|----------------------|
| First come, first served | Most urgent first |
| FIFO order | Priority order |
| O(n) to find highest priority | O(1) to peek, O(log n) to remove |

---

## Min Heap vs Max Heap

\`\`\`mermaid
flowchart TB
    subgraph min["Min Heap (root = smallest)"]
        M1["1"]
        M2["3"]
        M3["2"]
        M4["7"]
        M5["5"]
        M1 --> M2
        M1 --> M3
        M2 --> M4
        M2 --> M5
    end
    subgraph max["Max Heap (root = largest)"]
        X1["9"]
        X2["7"]
        X3["8"]
        X4["3"]
        X5["5"]
        X1 --> X2
        X1 --> X3
        X2 --> X4
        X2 --> X5
    end
    style M1 fill:#22c55e
    style X1 fill:#ef4444
\`\`\`

**Heap Property**: 
- **Min heap**: every parent ≤ its children
- **Max heap**: every parent ≥ its children

---

## Python heapq (Min Heap)

\`\`\`python
import heapq

# Create and populate a min heap
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)
print(heap)  # [1, 5, 3] - internally maintains heap property

# Peek at minimum (O(1))
min_val = heap[0]  # 1

# Pop minimum (O(log n))
min_val = heapq.heappop(heap)  # 1, heap = [3, 5]

# Convert list to heap in-place (O(n))
nums = [5, 1, 3, 9, 2]
heapq.heapify(nums)
print(nums)  # [1, 2, 3, 9, 5]

# Push and pop in one operation
val = heapq.heappushpop(heap, 4)  # Push 4, pop min

# Get n smallest/largest (O(n log k))
heapq.nsmallest(3, nums)  # [1, 2, 3]
heapq.nlargest(3, nums)   # [9, 5, 3]
\`\`\`

### Max Heap in Python (Negate Values)

\`\`\`python
import heapq

# Python only has min heap, so negate for max heap
max_heap = []
heapq.heappush(max_heap, -5)  # Store negative
heapq.heappush(max_heap, -1)
heapq.heappush(max_heap, -3)

# Get max (negate again)
max_val = -heapq.heappop(max_heap)  # 5
\`\`\`

---

## C++ Priority Queue

\`\`\`cpp
#include <queue>

// Max heap (default)
std::priority_queue<int> maxHeap;
maxHeap.push(5);
maxHeap.push(1);
maxHeap.push(3);
int max = maxHeap.top();  // 5
maxHeap.pop();

// Min heap
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(5);
minHeap.push(1);
int min = minHeap.top();  // 1
\`\`\`

---

## Time Complexity

| Operation | Time |
|-----------|------|
| Insert (push) | O(log n) |
| Extract min/max (pop) | O(log n) |
| Peek | **O(1)** |
| Heapify | **O(n)** |
| Find arbitrary | O(n) |

---

## Classic Problems

### 1. Kth Largest Element ⭐

\`\`\`python
import heapq

def find_kth_largest(nums, k):
    """Use min heap of size k"""
    heap = nums[:k]
    heapq.heapify(heap)  # O(k)
    
    for num in nums[k:]:
        if num > heap[0]:  # Larger than smallest in heap
            heapq.heapreplace(heap, num)  # Pop and push in O(log k)
    
    return heap[0]  # Kth largest is min of heap

# find_kth_largest([3,2,1,5,6,4], 2) → 5
\`\`\`

### 2. Top K Frequent Elements

\`\`\`python
from collections import Counter
import heapq

def top_k_frequent(nums, k):
    count = Counter(nums)
    # heapq.nlargest returns k items with largest count
    return heapq.nlargest(k, count.keys(), key=count.get)

# top_k_frequent([1,1,1,2,2,3], 2) → [1, 2]
\`\`\`

### 3. Merge K Sorted Lists

\`\`\`python
import heapq

def merge_k_lists(lists):
    """Use heap to always get smallest current element"""
    heap = []
    
    # Add first element of each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    
    result = []
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        
        # Add next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))
    
    return result
\`\`\`

### 4. Running Median

\`\`\`python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max heap (negated) for smaller half
        self.large = []  # Min heap for larger half
    
    def add_num(self, num):
        heapq.heappush(self.small, -num)
        
        # Balance: largest of small must be ≤ smallest of large
        if self.large and -self.small[0] > self.large[0]:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        
        # Keep sizes balanced (small can have 1 more)
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        elif len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    
    def find_median(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Kth largest/smallest element"
2. "Top K frequent elements"
3. "Merge K sorted lists"
4. "Find median from data stream"

**Key Talking Points**:
- Heap gives O(log n) insert/extract vs O(n) for sorted list
- For Top K, use heap of size k for O(n log k)
- Python's heapq is min heap; negate for max
- Two heaps for median: max heap (small) + min heap (large)

**Red Flags**:
- Using sorted() when heap would be more efficient
- Forgetting Python heapq is min heap only
- Not considering heapify for batch operations

---

## Key Takeaways

✅ Heap = complete binary tree with heap property  
✅ **Min heap**: root is smallest; **Max heap**: root is largest  
✅ Python's \`heapq\` is min heap — negate values for max  
✅ **O(1)** peek, **O(log n)** push/pop, **O(n)** heapify  
✅ Use for **Top K**, merge K sorted, running median  
✅ Heaps are stored as arrays — space efficient!
`,
    },

    // Step 1-1-7: Graphs
    'step-1-1-7': {
        title: 'Graphs',
        content: `# Graphs

## Why This Matters

Graphs model **relationships between things** — social networks, maps, dependencies, the internet. They're essential for:

- **Navigation** (Google Maps, GPS routing)
- **Social networks** (friend connections, recommendations)
- Interview problems like **shortest path**, **detect cycle**, **topological sort**
- Understanding the web, file systems, and dependencies

---

## The Social Network Analogy 🌐

| Graph Concept | Social Network |
|---------------|----------------|
| **Node/Vertex** | Person |
| **Edge** | Friendship/connection |
| **Directed edge** | "Follows" (one-way) |
| **Undirected edge** | "Friends" (mutual) |
| **Weighted edge** | Relationship strength |
| **Path** | Degrees of separation |

---

## Graph Types

\`\`\`mermaid
flowchart TB
    subgraph undirected["Undirected Graph"]
        UA["A"] --- UB["B"]
        UB --- UC["C"]
        UA --- UC
    end
    subgraph directed["Directed Graph"]
        DA["A"] --> DB["B"]
        DB --> DC["C"]
        DC --> DA
    end
    subgraph weighted["Weighted Graph"]
        WA["A"] ---|5| WB["B"]
        WB ---|3| WC["C"]
        WA ---|10| WC
    end
\`\`\`

---

## Representations

### Adjacency List (Most Common)

\`\`\`python
# Best for sparse graphs (few edges)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# With weights
weighted_graph = {
    'A': [('B', 5), ('C', 10)],
    'B': [('A', 5), ('D', 3)],
}
\`\`\`

### Adjacency Matrix

\`\`\`python
# Best for dense graphs or when checking edge existence frequently
#     A  B  C  D
# A [[0, 1, 1, 0],
# B  [1, 0, 0, 1],
# C  [1, 0, 0, 1],
# D  [0, 1, 1, 0]]

matrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]
\`\`\`

### Comparison

| | Adjacency List | Adjacency Matrix |
|---|----------------|------------------|
| **Space** | O(V + E) | O(V²) |
| **Check edge** | O(degree) | O(1) |
| **Find neighbors** | O(degree) | O(V) |
| **Best for** | Sparse graphs | Dense graphs |

---

## DFS (Depth-First Search)

Go **deep** before going wide. Uses a **stack** (recursion or explicit).

\`\`\`mermaid
flowchart LR
    A["A (1)"] --> B["B (2)"]
    B --> D["D (3)"]
    A --> C["C (4)"]
    style A fill:#22c55e
    style B fill:#3b82f6
    style D fill:#8b5cf6
    style C fill:#f59e0b
\`\`\`

\`\`\`python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')  # Process node
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    
    return visited

# Iterative version with explicit stack
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node, end=' ')
            stack.extend(graph[node])
    
    return visited
\`\`\`

---

## BFS (Breadth-First Search)

Go **wide** before going deep. Uses a **queue**. Finds shortest path in unweighted graphs!

\`\`\`mermaid
flowchart LR
    A["A (1)"] --> B["B (2)"]
    A --> C["C (2)"]
    B --> D["D (3)"]
    C --> D
    style A fill:#22c55e
    style B fill:#3b82f6
    style C fill:#3b82f6
    style D fill:#8b5cf6
\`\`\`

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        print(node, end=' ')  # Process node
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited

def bfs_shortest_path(graph, start, end):
    """Find shortest path in unweighted graph"""
    queue = deque([(start, [start])])
    visited = {start}
    
    while queue:
        node, path = queue.popleft()
        
        if node == end:
            return path
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path found
\`\`\`

---

## Classic Problems

### 1. Number of Islands ⭐

\`\`\`python
def num_islands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if (r < 0 or c < 0 or r >= rows or 
            c >= cols or grid[r][c] == '0'):
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count
\`\`\`

### 2. Detect Cycle (Directed Graph)

\`\`\`python
def has_cycle(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}
    
    def dfs(node):
        color[node] = GRAY  # Currently visiting
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # Back edge = cycle!
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK  # Done visiting
        return False
    
    return any(dfs(node) for node in graph if color[node] == WHITE)
\`\`\`

### 3. Topological Sort

\`\`\`python
def topological_sort(graph):
    """Order nodes so all dependencies come first"""
    visited = set()
    result = []
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        result.append(node)  # Add after all dependencies
    
    for node in graph:
        if node not in visited:
            dfs(node)
    
    return result[::-1]  # Reverse for correct order
\`\`\`

---

## Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| DFS | O(V + E) | O(V) |
| BFS | O(V + E) | O(V) |
| Dijkstra | O((V+E) log V) | O(V) |

---

## Interview Insights 💡

**Common Questions**:
1. "Number of islands" (DFS/BFS flood fill)
2. "Clone graph" (BFS with hash map)
3. "Course schedule" (topological sort)
4. "Shortest path" (BFS unweighted, Dijkstra weighted)

**Key Talking Points**:
- Use **BFS for shortest path** (unweighted)
- Use **DFS for exploring all paths** or detecting cycles
- Adjacency list for most problems
- Add to visited **when enqueueing** in BFS (not when processing)

**Red Flags**:
- Not tracking visited nodes → infinite loops
- Wrong data structure (stack vs queue)
- Forgetting disconnected components

---

## Key Takeaways

✅ Graphs = nodes + edges; directed or undirected  
✅ **Adjacency list** is most common representation  
✅ **BFS** = queue, level-by-level, shortest path (unweighted)  
✅ **DFS** = stack/recursion, go deep first, cycle detection  
✅ Mark visited **before** adding to queue/stack  
✅ Handle **disconnected components** by iterating all nodes
`,
    },

    // Step 1-1-8: Tries
    'step-1-1-8': {
        title: 'Tries',
        content: `# Tries (Prefix Trees)

## Why This Matters

Tries are specialized trees for **string prefix operations** — powering:

- **Autocomplete** in search engines and IDEs
- **Spell checkers** and autocorrect
- **IP routing** tables (longest prefix match)
- Interview questions about **string searching** and **word dictionaries**

---

## The Phone Book Analogy 📱

| Looking up a name | Trie Operation |
|-------------------|----------------|
| "Names starting with J..." | startsWith("J") |
| "...then O, H, N" | Follow J→O→H→N path |
| "Does JOHN exist?" | search("JOHN") |
| Tab index divides by first letter | Root has 26 children |

---

## Trie Structure

\`\`\`mermaid
flowchart TB
    R["(root)"]
    R --> C["c"]
    R --> D["d"]
    C --> A["a"]
    A --> T["t ✓"]
    A --> R2["r ✓"]
    D --> O["o"]
    O --> G["g ✓"]
    style T fill:#22c55e
    style R2 fill:#22c55e
    style G fill:#22c55e
\`\`\`

Words stored: **cat**, **car**, **dog** (✓ = end of word)

---

## Implementation

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}   # char -> TrieNode
        self.is_end = False  # Marks end of a word

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word: str) -> None:
        """Add word to trie - O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word: str) -> bool:
        """Check if exact word exists - O(m)"""
        node = self._traverse(word)
        return node is not None and node.is_end
    
    def startsWith(self, prefix: str) -> bool:
        """Check if any word starts with prefix - O(m)"""
        return self._traverse(prefix) is not None
    
    def _traverse(self, s: str) -> TrieNode:
        """Helper: follow path for string s"""
        node = self.root
        for char in s:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

# Usage
trie = Trie()
trie.insert("apple")
trie.insert("app")
print(trie.search("app"))       # True
print(trie.search("ap"))        # False (not a complete word)
print(trie.startsWith("ap"))    # True
\`\`\`

---

## Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| **Insert** | O(m) | O(m) |
| **Search** | O(m) | O(1) |
| **StartsWith** | O(m) | O(1) |

Where **m = length of word/prefix**

**Key insight**: Lookup time is independent of how many words are in the trie!

---

## Classic Problems

### 1. Autocomplete ⭐

\`\`\`python
def autocomplete(self, prefix: str) -> list[str]:
    """Return all words with given prefix"""
    node = self._traverse(prefix)
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

# trie.autocomplete("app") → ["app", "apple"]
\`\`\`

### 2. Word Search II (Boggle)

\`\`\`python
def findWords(board, words):
    """Find all words from dictionary in board"""
    # Build trie from words
    trie = Trie()
    for word in words:
        trie.insert(word)
    
    rows, cols = len(board), len(board[0])
    result = set()
    
    def dfs(r, c, node, path):
        if node.is_end:
            result.add(path)
        
        if r < 0 or c < 0 or r >= rows or c >= cols:
            return
        
        char = board[r][c]
        if char not in node.children:
            return
        
        board[r][c] = '#'  # Mark visited
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            dfs(r+dr, c+dc, node.children[char], path + char)
        board[r][c] = char  # Unmark
    
    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, "")
    
    return list(result)
\`\`\`

### 3. Design Add and Search Words

\`\`\`python
class WordDictionary:
    """Support '.' as wildcard"""
    def __init__(self):
        self.root = TrieNode()
    
    def addWord(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word: str) -> bool:
        def dfs(index, node):
            if index == len(word):
                return node.is_end
            
            char = word[index]
            if char == '.':
                # Try all children
                for child in node.children.values():
                    if dfs(index + 1, child):
                        return True
                return False
            else:
                if char not in node.children:
                    return False
                return dfs(index + 1, node.children[char])
        
        return dfs(0, self.root)
\`\`\`

---

## Trie vs Hash Set

| | Trie | Hash Set |
|---|------|----------|
| **Prefix queries** | ✅ O(m) | ❌ O(n) scan |
| **Exact lookup** | O(m) | O(1) average |
| **Memory (sparse)** | Higher | Lower |
| **Sorted iteration** | ✅ Natural | ❌ Need sort |

**Use Trie when**: Prefix operations, autocomplete, wildcard search
**Use Hash Set when**: Just need existence checks

---

## Interview Insights 💡

**Common Questions**:
1. "Implement Trie" (insert, search, startsWith)
2. "Word Search II" (Boggle-style grid)
3. "Design Add and Search Words" (with wildcard)
4. "Longest Common Prefix"

**Key Talking Points**:
- Tries give O(m) prefix operations regardless of dictionary size
- Each node represents a character, edges represent transitions
- Space optimization: use arrays for lowercase English (26 children)
- Can be combined with other structures (Trie + DFS for word search)

**Red Flags**:
- Using hash set when prefix queries are needed
- Forgetting the is_end marker for complete words
- Not handling empty string edge case

---

## Key Takeaways

✅ Trie = tree for storing strings character-by-character  
✅ **O(m)** operations where m = word length (not dictionary size!)  
✅ Perfect for **prefix queries**: autocomplete, startsWith  
✅ Each node has **children dict** + **is_end flag**  
✅ Trade **space for time** on prefix operations  
✅ Combine with DFS for word search problems
`,
    },

    // Step 1-2-1: Big O Notation
    'step-1-2-1': {
        title: 'Big O Notation',
        content: `# Big O Notation

## Why This Matters

Big O is the **universal language for discussing algorithm efficiency**. Every technical interview involves Big O analysis. Understanding it helps you:

- Compare algorithms and choose the **best one for your use case**
- Predict how code will perform at **scale** (1000 vs 1 million items)
- Impress interviewers with your **analysis skills**
- Identify **performance bottlenecks** in real systems

---

## The Highway Traffic Analogy 🚗

| Big O | Highway Analogy | Real Example |
|-------|-----------------|--------------|
| O(1) | Teleportation - instant | Hash table lookup |
| O(log n) | Halving distance each step | Binary search |
| O(n) | Driving through each town | Linear scan |
| O(n log n) | Highway with toll stops | Merge sort |
| O(n²) | Visiting every pair of towns | Nested loops |
| O(2ⁿ) | Towns doubling each step | Subsets |

---

## Growth Rate Comparison

\`\`\`mermaid
flowchart LR
    subgraph complexity["Operations as n grows"]
        A["n=10"]
        B["n=100"]
        C["n=1000"]
    end
\`\`\`

| Big O | n=10 | n=100 | n=1000 | n=1M |
|-------|------|-------|--------|------|
| O(1) | 1 | 1 | 1 | 1 |
| O(log n) | 3 | 7 | 10 | 20 |
| O(n) | 10 | 100 | 1000 | 1M |
| O(n log n) | 33 | 664 | 10K | 20M |
| O(n²) | 100 | 10K | 1M | 1T |
| O(2ⁿ) | 1K | 10³⁰ | ∞ | ∞ |

**Key insight**: At scale, the difference between O(n) and O(n²) is the difference between 1 second and 11 days!

---

## Code Examples

### O(1) - Constant

\`\`\`python
def get_first(arr):
    return arr[0]  # Always 1 operation, regardless of array size

def hash_lookup(d, key):
    return d[key]  # Dictionary lookup is O(1) average
\`\`\`

### O(log n) - Logarithmic

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:      # Halves search space each iteration
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
# Array of 1 billion elements? Only ~30 comparisons!
\`\`\`

### O(n) - Linear

\`\`\`python
def find_max(arr):
    max_val = arr[0]
    for num in arr:           # Visit every element once
        if num > max_val:
            max_val = num
    return max_val
\`\`\`

### O(n log n) - Linearithmic

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # log n levels
    right = merge_sort(arr[mid:])
    return merge(left, right)       # n work per level
\`\`\`

### O(n²) - Quadratic

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):            # n iterations
        for j in range(n - 1):    # n iterations each
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

### O(2ⁿ) - Exponential

\`\`\`python
def all_subsets(nums):
    if not nums:
        return [[]]
    rest = all_subsets(nums[1:])    # Each element doubles result
    return rest + [[nums[0]] + s for s in rest]
# 20 elements = 1 million subsets!
\`\`\`

---

## Space Complexity

Memory usage matters too!

\`\`\`python
# O(1) space - only uses a few variables
def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n) space - creates new array
def copy_array(arr):
    return arr[:]

# O(n) space - recursion uses call stack
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # n stack frames
\`\`\`

---

## Analysis Rules

### 1. Drop Constants

\`\`\`python
# Both are O(n), not O(3n) or O(n + 1000)
for i in range(n):
    print(i)
for i in range(n):
    print(i)
for i in range(n):
    print(i)
\`\`\`

### 2. Drop Lower Order Terms

\`\`\`python
# O(n²), not O(n² + n + 1)
for i in range(n):
    for j in range(n):
        print(i, j)      # n²
for k in range(n):
    print(k)             # n (ignored)
\`\`\`

### 3. Different Inputs = Different Variables

\`\`\`python
# O(a + b), not O(n)
def process(arr_a, arr_b):
    for x in arr_a:
        print(x)
    for y in arr_b:
        print(y)

# O(a * b), nested
def compare(arr_a, arr_b):
    for x in arr_a:
        for y in arr_b:
            print(x, y)
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "What's the time complexity of your solution?"
2. "Can you optimize this from O(n²) to O(n)?"
3. "What's the space-time tradeoff?"

**Key Talking Points**:
- Always analyze before coding
- Best, average, and worst case can differ
- Space complexity includes call stack for recursion
- Amortized analysis for operations like dynamic array append

**Red Flags**:
- Saying "it's fast" without specifying Big O
- Confusing O(n) with O(1)
- Ignoring space complexity

---

## Key Takeaways

✅ Big O describes **how runtime grows with input size**  
✅ Focus on **dominant term**, drop constants  
✅ Common: O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2ⁿ)  
✅ **Space complexity** = memory usage  
✅ O(n log n) is optimal for comparison-based sorting  
✅ At scale, algorithm choice matters more than hardware
`,
    },

    // Step 1-2-2: Sorting Algorithms
    'step-1-2-2': {
        title: 'Sorting Algorithms',
        content: `# Sorting Algorithms

## Why This Matters

Sorting is one of the **most fundamental operations in computer science**. Understanding sorting helps you:

- Choose the **right algorithm** for your data
- Understand **divide-and-conquer** paradigm deeply
- Ace interviews — sorting is asked **directly** or as a **preprocessing step**
- Appreciate built-in sort functions (Python's Timsort, Java's Dual-Pivot Quicksort)

---

## The Library Analogy 📚

| Sorting Style | Algorithm | Strategy |
|---------------|-----------|----------|
| Compare neighbors, swap | Bubble Sort | Simple but slow O(n²) |
| Find smallest, move to front | Selection Sort | Simple but slow O(n²) |
| Split, sort halves, merge | Merge Sort | Divide and conquer O(n log n) |
| Pick pivot, partition around it | Quick Sort | Divide and conquer O(n log n) |
| Build a max-heap, extract max | Heap Sort | Heap-based O(n log n) |

---

## Quick Sort ⭐

The **most commonly used** sorting algorithm. Average O(n log n).

\`\`\`mermaid
flowchart TB
    A["8,3,7,1,5,9,2"] --> P["Pivot: 5"]
    P --> L["Left: 3,1,2"]
    P --> M["Middle: 5"]
    P --> R["Right: 8,7,9"]
    L --> LS["Sorted: 1,2,3"]
    R --> RS["Sorted: 7,8,9"]
    LS --> F["Final: 1,2,3,5,7,8,9"]
    RS --> F
\`\`\`

\`\`\`python
def quicksort(arr):
    """Average O(n log n), worst O(n²)"""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]  # Choose middle element
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# In-place version (more memory efficient)
def quicksort_inplace(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quicksort_inplace(arr, low, pivot_idx - 1)
        quicksort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\`\`\`

---

## Merge Sort ⭐

**Guaranteed O(n log n)** and stable. Great when stability matters.

\`\`\`mermaid
flowchart TB
    A["8,3,7,1,5,9,2,6"]
    A --> B["8,3,7,1"]
    A --> C["5,9,2,6"]
    B --> D["8,3"]
    B --> E["7,1"]
    C --> F["5,9"]
    C --> G["2,6"]
    D --> D1["3,8"]
    E --> E1["1,7"]
    F --> F1["5,9"]
    G --> G1["2,6"]
\`\`\`

\`\`\`python
def merge_sort(arr):
    """Always O(n log n), O(n) space, stable"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays"""
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= ensures stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

---

## Heap Sort

**O(n log n)** with **O(1)** extra space. Not stable.

\`\`\`python
import heapq

def heap_sort(arr):
    """O(n log n) time, O(1) space"""
    heapq.heapify(arr)  # O(n)
    return [heapq.heappop(arr) for _ in range(len(arr))]

# Manual implementation
def heap_sort_manual(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
\`\`\`

---

## Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | **Yes** |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | **O(1)** | No |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |

---

## When to Use What

| Situation | Best Choice | Why |
|-----------|-------------|-----|
| General purpose | **Quick Sort** | Fastest in practice |
| Need stability | **Merge Sort** | Preserves equal element order |
| Memory constrained | **Heap Sort** | O(1) extra space |
| Nearly sorted data | **Insertion Sort** | O(n) best case |
| Small arrays | **Insertion Sort** | Low overhead |

---

## Python's Built-in Sort

\`\`\`python
# list.sort() - modifies in place
arr = [3, 1, 4, 1, 5]
arr.sort()                    # [1, 1, 3, 4, 5]

# sorted() - returns new list
arr = [3, 1, 4, 1, 5]
new_arr = sorted(arr)         # [1, 1, 3, 4, 5]

# Custom key
arr = ["banana", "apple", "cherry"]
arr.sort(key=len)             # ["apple", "banana", "cherry"]

# Reverse
arr.sort(reverse=True)        # [5, 4, 3, 1, 1]

# Sort objects
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

people = [Person("Alice", 30), Person("Bob", 25)]
people.sort(key=lambda p: p.age)  # Sort by age
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Implement quick sort / merge sort"
2. "Sort colors" (Dutch National Flag)
3. "Merge intervals"
4. "K closest points"

**Key Talking Points**:
- Python uses Timsort (hybrid merge + insertion)
- Quick sort is fastest on average but O(n²) worst case
- Merge sort is stable and predictable
- Always mention stability when relevant

**Red Flags**:
- Not knowing time complexities
- Implementing inefficient quadratic sorts
- Forgetting stability considerations

---

## Key Takeaways

✅ **Quick Sort**: fastest in practice, O(n log n) average, O(n²) worst  
✅ **Merge Sort**: guaranteed O(n log n), stable, needs O(n) space  
✅ **Heap Sort**: O(n log n) with O(1) space, not stable  
✅ Use **stability** for preserving relative order of equal elements  
✅ Python's \`sort()\` uses **Timsort** - highly optimized hybrid  
✅ Know when to use custom \`key\` functions
`,
    },

    // Step 1-2-3: Binary Search
    'step-1-2-3': {
        title: 'Binary Search',
        content: `# Binary Search

## Why This Matters

Binary search is one of the **most powerful algorithmic techniques**. It's:

- Asked in almost **every** technical interview
- The key to achieving O(log n) when you need to find something
- Applicable far beyond simple array lookups — works on **any monotonic function**
- The foundation for more complex algorithms

---

## The Dictionary Lookup Analogy 📖

| Dictionary Lookup | Binary Search |
|-------------------|---------------|
| Open to middle | Check middle element |
| Word before? Go left half | Target smaller? Search left |
| Word after? Go right half | Target larger? Search right |
| 1000 pages to 1 in ~10 lookups | 1 billion items in ~30 checks |

---

## Classic Binary Search

\`\`\`mermaid
flowchart LR
    A["Array: 1,3,5,7,9,11,13"]
    A --> M1["Check mid: 7"]
    M1 -->|"target=11 > 7"| R["Search right: 9,11,13"]
    R --> M2["Check mid: 11"]
    M2 -->|"Found!"| F["Return index 5"]
\`\`\`

\`\`\`python
def binary_search(arr, target):
    """O(log n) time, O(1) space"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid integer overflow
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1    # Target in right half
        else:
            right = mid - 1   # Target in left half
    
    return -1  # Not found

# binary_search([1,3,5,7,9,11,13], 11) → 5
\`\`\`

---

## Template Variations

### 1. Find First Occurrence ⭐

\`\`\`python
def find_first(arr, target):
    """Find leftmost index where target appears"""
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid        # Found one, but keep looking left
            right = mid - 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# find_first([1,2,2,2,3], 2) → 1
\`\`\`

### 2. Find Last Occurrence

\`\`\`python
def find_last(arr, target):
    """Find rightmost index where target appears"""
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid        # Found one, but keep looking right
            left = mid + 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
\`\`\`

### 3. Find Insert Position

\`\`\`python
def search_insert(arr, target):
    """Where should target be inserted to keep sorted?"""
    left, right = 0, len(arr)
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left

# search_insert([1,3,5,6], 4) → 2
\`\`\`

---

## Classic Problems

### 1. Search in Rotated Sorted Array ⭐

\`\`\`python
def search_rotated(nums, target):
    """Array was sorted then rotated: [4,5,6,7,0,1,2]"""
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        # Determine which half is sorted
        if nums[left] <= nums[mid]:  # Left half is sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
\`\`\`

### 2. Find Minimum in Rotated Array

\`\`\`python
def find_min(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1     # Min is in right half
        else:
            right = mid        # Min is in left half or at mid
    
    return nums[left]
\`\`\`

### 3. Peak Element

\`\`\`python
def find_peak(nums):
    """Find any local maximum"""
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < nums[mid + 1]:
            left = mid + 1     # Peak is to the right
        else:
            right = mid        # Peak is at mid or left
    
    return left
\`\`\`

### 4. Binary Search on Answer

\`\`\`python
def minimum_time_to_complete(tasks, workers):
    """Find minimum time needed for workers to complete tasks"""
    def can_complete(time):
        # Check if all tasks can be done in 'time' minutes
        completed = sum(time // t for t in workers)
        return completed >= tasks
    
    left, right = 1, max_possible_time
    
    while left < right:
        mid = (left + right) // 2
        if can_complete(mid):
            right = mid        # Try less time
        else:
            left = mid + 1     # Need more time
    
    return left
\`\`\`

---

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Integer overflow in mid calculation | Use \`left + (right - left) // 2\` |
| Off-by-one errors | Think carefully about \`<=\` vs \`<\` |
| Infinite loop | Ensure search space shrinks each iteration |
| Wrong boundary updates | Test with small examples |

---

## Interview Insights 💡

**Common Questions**:
1. "Search in rotated sorted array"
2. "Find first and last position"
3. "Search a 2D matrix"
4. "Koko eating bananas" (binary search on answer)

**Key Talking Points**:
- Binary search works on any monotonic condition
- O(log n) is extremely powerful for large datasets
- Know when to use \`left <= right\` vs \`left < right\`
- "Binary search on answer" pattern is underutilized

**Red Flags**:
- Not handling edge cases (empty array, single element)
- Using linear search where binary search applies
- Off-by-one errors in boundary conditions

---

## Key Takeaways

✅ Binary search achieves **O(log n)** by halving the search space  
✅ Works on **sorted data** or any **monotonic function**  
✅ Master the template: \`left\`, \`right\`, \`mid\`, boundary updates  
✅ Variations: find first/last, insert position, rotated arrays  
✅ **Binary search on answer**: when checking if X works is easy  
✅ Always verify with edge cases: empty, single element, all same
`,
    },

    // Step 1-2-4: Two Pointers & Sliding Window
    'step-1-2-4': {
        title: 'Two Pointers & Sliding Window',
        content: `# Two Pointers & Sliding Window

## Why This Matters

These techniques are **interview gold** — they transform O(n²) solutions into O(n). They're:

- Used in **50%+ of array/string problems**
- The key to optimizing brute force solutions
- Essential for problems involving **pairs**, **subarrays**, or **substrings**

---

## Two Pointers: The Pincer Movement 🦀

| Two Pointer Variant | When to Use |
|--------------------|-------------|
| **Opposite ends** | Sorted arrays, palindromes, container problems |
| **Slow/Fast** | In-place modifications, cycle detection, middle finding |
| **Same direction** | Merge operations, comparing elements |

---

## Opposite-End Two Pointers

\`\`\`mermaid
flowchart LR
    L["Left pointer →"] --- A["1"]
    A --- B["2"]
    B --- C["5"]
    C --- D["7"]
    D --- E["11"]
    E --- R["← Right pointer"]
\`\`\`

### Two Sum (Sorted Array) ⭐

\`\`\`python
def two_sum(nums, target):
    """O(n) time, O(1) space"""
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1      # Need larger sum
        else:
            right -= 1     # Need smaller sum
    
    return []

# two_sum([1, 2, 5, 7, 11], 9) → [1, 3] (2+7=9)
\`\`\`

### Container With Most Water

\`\`\`python
def max_area(heights):
    """Find two lines that hold most water"""
    left, right = 0, len(heights) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        height = min(heights[left], heights[right])
        max_water = max(max_water, width * height)
        
        # Move the shorter line inward
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    
    return max_water
\`\`\`

### Valid Palindrome

\`\`\`python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True
\`\`\`

---

## Slow/Fast Two Pointers

### Remove Duplicates In-Place ⭐

\`\`\`python
def remove_duplicates(nums):
    """O(n) time, O(1) space - modify in place"""
    if not nums:
        return 0
    
    slow = 0  # Position to write next unique element
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1  # Length of unique elements

# [1,1,2,2,3] → [1,2,3,_,_], returns 3
\`\`\`

### Move Zeroes

\`\`\`python
def move_zeroes(nums):
    """Move all 0s to end, maintain relative order"""
    slow = 0
    
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# [0,1,0,3,12] → [1,3,12,0,0]
\`\`\`

---

## Sliding Window: The Moving Frame 🪟

Perfect for **contiguous subarray/substring** problems.

\`\`\`mermaid
flowchart LR
    subgraph window["Sliding Window"]
        W1["3"]
        W2["4"]
        W3["5"]
    end
    A["1"] --- B["2"] --- W1 --- W2 --- W3 --- F["6"] --- G["7"]
\`\`\`

### Fixed-Size Window

\`\`\`python
def max_sum_subarray(arr, k):
    """Maximum sum of k consecutive elements"""
    # Initialize window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide window
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # Add new, remove old
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# max_sum_subarray([2,1,5,1,3,2], 3) → 9 (5+1+3)
\`\`\`

### Variable-Size Window

\`\`\`python
def min_subarray_len(target, nums):
    """Minimum length subarray with sum >= target"""
    left = 0
    current_sum = 0
    min_len = float('inf')
    
    for right in range(len(nums)):
        current_sum += nums[right]
        
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1
    
    return min_len if min_len != float('inf') else 0
\`\`\`

---

## Classic Problems

### Longest Substring Without Repeating ⭐

\`\`\`python
def length_of_longest_substring(s):
    """O(n) time, O(min(n, alphabet)) space"""
    char_index = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        
        char_index[char] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len

# "abcabcbb" → 3 ("abc")
\`\`\`

### Minimum Window Substring

\`\`\`python
from collections import Counter

def min_window(s, t):
    """Smallest window in s containing all chars of t"""
    need = Counter(t)
    have = {}
    have_count, need_count = 0, len(need)
    left = 0
    result = ""
    
    for right, char in enumerate(s):
        have[char] = have.get(char, 0) + 1
        if char in need and have[char] == need[char]:
            have_count += 1
        
        while have_count == need_count:
            if not result or right - left + 1 < len(result):
                result = s[left:right+1]
            
            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                have_count -= 1
            left += 1
    
    return result
\`\`\`

---

## Pattern Recognition

| Problem Type | Use This |
|--------------|----------|
| Pair in sorted array | Opposite-end two pointers |
| In-place array modification | Slow/fast pointers |
| Fixed-size subarray | Fixed sliding window |
| Subarray with condition | Variable sliding window |
| Palindrome check | Opposite-end pointers |

---

## Interview Insights 💡

**Common Questions**:
1. "Two Sum II" (sorted input)
2. "Longest substring without repeating"
3. "Container with most water"
4. "Minimum window substring"
5. "3Sum" (two pointers inside a loop)

**Key Talking Points**:
- Both patterns reduce O(n²) to O(n)
- Two pointers for pairs/comparisons
- Sliding window for contiguous subarrays
- Think about what to track in the window

**Red Flags**:
- Using hash map when two pointers suffice (sorted input)
- Nested loops when sliding window works
- Not recognizing the "contiguous" keyword

---

## Key Takeaways

✅ **Two Pointers**: opposite ends (sorted) or slow/fast (in-place)  
✅ **Sliding Window**: fixed or variable size for contiguous problems  
✅ Both convert **O(n²) → O(n)**  
✅ Look for keywords: "sorted", "contiguous", "in-place", "subarray"  
✅ Sliding window tracks state; shrink when condition met  
✅ Practice the templates until they're automatic!
`,
    },

    // Step 1-2-5: Dynamic Programming  
    'step-1-2-5': {
        title: 'Dynamic Programming',
        content: `# Dynamic Programming

## Why This Matters

Dynamic Programming is the **most feared and most asked** topic in technical interviews. Mastering DP helps you:

- Solve problems that seem impossible with brute force
- Optimize from O(2ⁿ) to O(n²) or even O(n)
- Impress interviewers with your problem-solving process
- Tackle real-world optimization (routing, scheduling, resource allocation)

---

## The Recipe Analogy 🍳

| DP Concept | Cooking Analogy |
|------------|-----------------|
| **Subproblem** | Individual dish component |
| **State** | Current cooking progress |
| **Transition** | How one step leads to next |
| **Memoization** | Writing down a recipe to reuse |
| **Tabulation** | Following recipe step-by-step |

---

## When to Use DP

DP works when a problem has:

1. **Overlapping Subproblems**: Same calculations repeated
2. **Optimal Substructure**: Optimal solution uses optimal sub-solutions

\`\`\`mermaid
flowchart TB
    F5["fib 5"]
    F5 --> F4["fib 4"]
    F5 --> F3a["fib 3"]
    F4 --> F3b["fib 3"]
    F4 --> F2a["fib 2"]
    F3a --> F2b["fib 2"]
    F3a --> F1a["fib 1"]
    style F3a fill:#ef4444
    style F3b fill:#ef4444
    style F2a fill:#f59e0b
    style F2b fill:#f59e0b
\`\`\`

Notice fib(3) and fib(2) calculated multiple times — classic DP!

---

## Two Approaches

### Top-Down (Memoization)

\`\`\`python
def fib_memo(n, memo={}):
    """Start from problem, work down to base cases"""
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
\`\`\`

### Bottom-Up (Tabulation)

\`\`\`python
def fib_tab(n):
    """Start from base cases, work up to answer"""
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

### Space Optimized

\`\`\`python
def fib_opt(n):
    """Only keep what you need"""
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
\`\`\`

---

## DP Problem-Solving Framework

1. **Define the state**: What variables represent a subproblem?
2. **Define the recurrence**: How does dp[i] relate to smaller subproblems?
3. **Define base cases**: Where does recursion stop?
4. **Determine order**: Bottom-up? Top-down?
5. **Optimize space**: Do you need the full table?

---

## Classic Problems

### 1. Climbing Stairs ⭐

\`\`\`python
def climb_stairs(n):
    """Ways to climb n stairs taking 1 or 2 steps"""
    if n <= 2:
        return n
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    return curr
\`\`\`

### 2. Coin Change ⭐

\`\`\`python
def coin_change(coins, amount):
    """Minimum coins needed to make amount"""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# coin_change([1,2,5], 11) → 3 (5+5+1)
\`\`\`

### 3. Longest Common Subsequence

\`\`\`python
def lcs(text1, text2):
    """Length of longest common subsequence"""
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

### 4. House Robber

\`\`\`python
def rob(nums):
    """Max money without robbing adjacent houses"""
    if not nums:
        return 0
    if len(nums) <= 2:
        return max(nums)
    
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    
    return prev1
\`\`\`

### 5. 0/1 Knapsack

\`\`\`python
def knapsack(weights, values, capacity):
    """Max value that fits in capacity"""
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],                          # Skip item
                    dp[i-1][w - weights[i-1]] + values[i-1]  # Take item
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]
\`\`\`

---

## Common DP Patterns

| Pattern | Examples |
|---------|----------|
| **1D Linear** | Climbing stairs, House robber |
| **2D Grid** | Unique paths, Min path sum |
| **String** | LCS, Edit distance, Palindromes |
| **Knapsack** | Subset sum, Coin change, 0/1 knapsack |
| **Interval** | Matrix chain, Burst balloons |

---

## Interview Insights 💡

**Common Questions**:
1. "Climbing stairs" / "Fibonacci" (warm-up)
2. "Coin change" (classic)
3. "Longest common subsequence"
4. "House robber" 
5. "Edit distance"

**Key Talking Points**:
- Start with brute force recursion, then optimize
- Clearly define state and recurrence relation
- Always consider space optimization
- Time complexity often equals number of states × transitions

**Red Flags**:
- Jumping to DP without understanding the recursion
- Not identifying overlapping subproblems
- Unable to define state clearly

---

## Key Takeaways

✅ DP = **recursion + memoization** OR **tabulation**  
✅ Key conditions: overlapping subproblems + optimal substructure  
✅ **Framework**: state → recurrence → base case → order → optimize  
✅ Start with **brute force**, then identify repeated work  
✅ Space optimization: often only need previous row(s)  
✅ Practice patterns: 1D, 2D grid, string, knapsack
`,
    },

    // Step 1-2-6: Greedy Algorithms
    'step-1-2-6': {
        title: 'Greedy Algorithms',
        content: `# Greedy Algorithms

## Why This Matters

Greedy algorithms make the **locally optimal choice at each step**, hoping to find a global optimum. They're:

- **Simpler** and **faster** than DP when they work
- Essential for **scheduling**, **interval**, and **optimization** problems
- A key interview topic that tests your reasoning skills

---

## The Buffet Analogy 🍽️

| Greedy Strategy | Buffet Approach |
|-----------------|-----------------|
| Take best available now | Grab the tastiest dish first |
| Don't look back | Don't reconsider previous choices |
| Hope it works out | Hope you picked well overall |

**Warning**: Greedy doesn't always work! You must prove it gives optimal solution.

---

## When Greedy Works

Greedy works when:

1. **Greedy choice property**: Local optimum leads to global optimum
2. **Optimal substructure**: Problem can be broken into subproblems

\`\`\`mermaid
flowchart LR
    subgraph greedy["Greedy: Take best now"]
        G1["Choice 1: Best"] --> G2["Choice 2: Best"] --> G3["Result"]
    end
    subgraph dp["DP: Consider all"]
        D1["All choices"] --> D2["All combos"] --> D3["Best result"]
    end
\`\`\`

---

## Classic Problems

### 1. Activity Selection ⭐

\`\`\`python
def activity_selection(activities):
    """Select maximum non-overlapping activities"""
    # Key insight: sort by END time
    activities.sort(key=lambda x: x[1])
    
    result = [activities[0]]
    
    for start, end in activities[1:]:
        if start >= result[-1][1]:  # No overlap
            result.append((start, end))
    
    return result

# [(1,3), (2,5), (4,6), (6,8)] → [(1,3), (4,6), (6,8)]
\`\`\`

### 2. Jump Game ⭐

\`\`\`python
def can_jump(nums):
    """Can you reach the last index?"""
    max_reach = 0
    
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False  # Can't reach this index
        max_reach = max(max_reach, i + jump)
    
    return True

# [2,3,1,1,4] → True (2→3→4→end)
# [3,2,1,0,4] → False (stuck at index 3)
\`\`\`

### 3. Jump Game II (Minimum Jumps)

\`\`\`python
def jump(nums):
    """Minimum jumps to reach end"""
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:  # Must jump
            jumps += 1
            current_end = farthest
    
    return jumps
\`\`\`

### 4. Interval Scheduling

\`\`\`python
def erase_overlap_intervals(intervals):
    """Minimum intervals to remove for no overlap"""
    intervals.sort(key=lambda x: x[1])  # Sort by end
    
    count = 0
    prev_end = float('-inf')
    
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end    # Keep this interval
        else:
            count += 1        # Remove this interval
    
    return count
\`\`\`

### 5. Gas Station

\`\`\`python
def can_complete_circuit(gas, cost):
    """Find starting station to complete circuit"""
    total_tank = curr_tank = 0
    start = 0
    
    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        curr_tank += gas[i] - cost[i]
        
        if curr_tank < 0:  # Can't reach next station
            start = i + 1   # Try starting from next
            curr_tank = 0
    
    return start if total_tank >= 0 else -1
\`\`\`

---

## Greedy vs Dynamic Programming

| Feature | Greedy | DP |
|---------|--------|-----|
| **Strategy** | Take best now | Consider all options |
| **Time** | Usually O(n) or O(n log n) | Often O(n²) or worse |
| **Space** | Usually O(1) | Often O(n) or O(n²) |
| **Correctness** | Must prove works | Always finds optimal |
| **Examples** | Intervals, Huffman | Knapsack, LCS |

---

## Interview Insights 💡

**Common Questions**:
1. "Jump Game" I and II
2. "Non-overlapping Intervals"
3. "Gas Station"
4. "Task Scheduler"
5. "Candy distribution"

**Key Talking Points**:
- Greedy is faster but not always correct
- Must justify why greedy choice is safe
- Sorting is often the key step
- Think about what to sort by (start time? end time? ratio?)

**Red Flags**:
- Using greedy without proving it works
- Not considering counter-examples
- Missing that DP is needed

---

## Key Takeaways

✅ Greedy makes **locally optimal choice** at each step  
✅ Works when local optimum → global optimum  
✅ **Faster** than DP but must **prove correctness**  
✅ Common pattern: **sort**, then **iterate with greedy choice**  
✅ For intervals: usually sort by **end time**  
✅ When in doubt, try DP instead
`,
    },

    // Step 1-2-7: Graph Algorithms
    'step-1-2-7': {
        title: 'Graph Algorithms',
        content: `# Graph Algorithms

## Why This Matters

Graph algorithms power the **most important real-world systems**:

- **GPS navigation** (shortest path)
- **Social networks** (connected components, influence)
- **Compilers** (topological sort for dependencies)
- **Networks** (minimum spanning trees, flow)

---

## Algorithm Summary

| Algorithm | Use Case | Time Complexity |
|-----------|----------|-----------------|
| **Dijkstra** | Shortest path (weighted) | O(E log V) |
| **Bellman-Ford** | Shortest path (negative edges) | O(VE) |
| **Topological Sort** | DAG ordering, dependencies | O(V + E) |
| **Union-Find** | Connected components, cycle detection | O(α(n)) ≈ O(1) |
| **Kruskal/Prim** | Minimum spanning tree | O(E log E) |

---

## Dijkstra's Algorithm ⭐

Find shortest paths from source to all nodes (no negative weights).

\`\`\`mermaid
flowchart LR
    A["A: 0"] -->|"4"| B["B: 4"]
    A -->|"1"| C["C: 1"]
    C -->|"2"| B
    B -->|"1"| D["D: 4"]
    C -->|"5"| D
    style A fill:#22c55e
    style C fill:#3b82f6
    style B fill:#3b82f6
    style D fill:#3b82f6
\`\`\`

\`\`\`python
import heapq

def dijkstra(graph, start):
    """O(E log V) with min-heap"""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        dist, node = heapq.heappop(pq)
        
        if dist > distances[node]:
            continue  # Already found shorter path
        
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    
    return distances

# graph = {'A': [('B', 4), ('C', 1)], 'C': [('B', 2), ('D', 5)], ...}
\`\`\`

---

## Topological Sort ⭐

Order nodes so all dependencies come before dependents. Works only on **DAGs**.

\`\`\`python
from collections import deque

def topological_sort(graph):
    """Kahn's algorithm - BFS approach, O(V + E)"""
    in_degree = {u: 0 for u in graph}
    for u in graph:
        for v in graph[u]:
            in_degree[v] = in_degree.get(v, 0) + 1
    
    queue = deque([u for u in in_degree if in_degree[u] == 0])
    result = []
    
    while queue:
        u = queue.popleft()
        result.append(u)
        
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    # If cycle exists, not all nodes will be in result
    return result if len(result) == len(graph) else []

# graph = {'course1': ['course2', 'course3'], ...}
\`\`\`

---

## Union-Find (Disjoint Set Union) ⭐

Track connected components with near-O(1) operations.

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components
    
    def find(self, x):
        """Find root with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        """Union by rank, returns True if merged"""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected
        
        # Attach smaller tree under larger
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        self.count -= 1
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Number of connected components
# uf = UnionFind(n)
# for edge in edges: uf.union(edge[0], edge[1])
# return uf.count
\`\`\`

---

## Classic Problems

### 1. Course Schedule

\`\`\`python
def can_finish(numCourses, prerequisites):
    """Can all courses be completed? (cycle detection)"""
    graph = {i: [] for i in range(numCourses)}
    in_degree = [0] * numCourses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    completed = 0
    
    while queue:
        course = queue.popleft()
        completed += 1
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return completed == numCourses
\`\`\`

### 2. Network Delay Time

\`\`\`python
def network_delay(times, n, k):
    """Time for signal to reach all nodes from k"""
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))
    
    dist = dijkstra(graph, k)
    max_time = max(dist.values())
    
    return max_time if max_time != float('inf') else -1
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Course Schedule" I and II (topological sort)
2. "Network Delay Time" (Dijkstra)
3. "Number of Connected Components" (Union-Find)
4. "Cheapest Flights Within K Stops" (modified Dijkstra)

**Key Talking Points**:
- Dijkstra uses greedy approach with min-heap
- Topological sort only works on DAGs
- Union-Find with path compression and union by rank is nearly O(1)
- Know when to use BFS vs Dijkstra (unweighted vs weighted)

**Red Flags**:
- Using Dijkstra with negative edges
- Not detecting cycles in topological sort
- Forgetting path compression in Union-Find

---

## Key Takeaways

✅ **Dijkstra**: weighted shortest path, O(E log V), no negative edges  
✅ **Topological Sort**: DAG ordering for dependencies  
✅ **Union-Find**: near-O(1) connected component queries  
✅ BFS for unweighted, Dijkstra for weighted graphs  
✅ Know the **trade-offs** between algorithms  
✅ Master these 3 algorithms for most graph problems
`,
    },

    // Step 1-2-8: Backtracking
    'step-1-2-8': {
        title: 'Backtracking',
        content: `# Backtracking

## Why This Matters

Backtracking is **controlled exhaustive search** — it explores all possibilities efficiently by:

- **Building solutions incrementally**
- **Abandoning partial solutions early** (pruning)
- Solving problems like **permutations**, **combinations**, and **constraint satisfaction**

---

## The Maze Analogy 🧭

| Maze Navigation | Backtracking |
|-----------------|--------------|
| Try a path | Make a choice |
| Hit dead end | Constraint violated |
| Go back to last fork | Undo choice (backtrack) |
| Try different path | Try next option |
| Reach exit | Found valid solution |

---

## The Template ⭐

\`\`\`python
def backtrack(path, choices):
    # Base case: found a valid solution
    if is_complete(path):
        result.append(path[:])  # Copy of current path
        return
    
    # Try each possible choice
    for choice in choices:
        if is_valid(choice, path):
            path.append(choice)           # Make choice
            backtrack(path, new_choices)  # Recurse
            path.pop()                    # Undo choice (backtrack)
\`\`\`

**Key insight**: Always \`pop()\` after recursion to restore state!

---

## Classic Problems

### 1. Subsets ⭐

\`\`\`python
def subsets(nums):
    """Generate all 2^n subsets"""
    result = []
    
    def backtrack(start, path):
        result.append(path[:])  # Every path is a valid subset
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)  # Move forward, no duplicates
            path.pop()
    
    backtrack(0, [])
    return result

# subsets([1,2,3]) → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
\`\`\`

### 2. Permutations ⭐

\`\`\`python
def permute(nums):
    """Generate all n! permutations"""
    result = []
    
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        
        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(path, remaining[:i] + remaining[i+1:])
            path.pop()
    
    backtrack([], nums)
    return result

# permute([1,2,3]) → [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
\`\`\`

### 3. Combination Sum

\`\`\`python
def combination_sum(candidates, target):
    """Find combinations that sum to target (can reuse)"""
    result = []
    
    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])  # i, not i+1 (reuse)
            path.pop()
    
    backtrack(0, [], target)
    return result
\`\`\`

### 4. N-Queens ⭐

\`\`\`python
def solve_n_queens(n):
    """Place n queens on n×n board with no conflicts"""
    result = []
    
    def backtrack(row, cols, diags, anti_diags, board):
        if row == n:
            result.append(["".join(r) for r in board])
            return
        
        for col in range(n):
            if col in cols or (row - col) in diags or (row + col) in anti_diags:
                continue  # Pruning!
            
            board[row][col] = 'Q'
            cols.add(col)
            diags.add(row - col)
            anti_diags.add(row + col)
            
            backtrack(row + 1, cols, diags, anti_diags, board)
            
            # Undo
            board[row][col] = '.'
            cols.remove(col)
            diags.remove(row - col)
            anti_diags.remove(row + col)
    
    board = [['.' for _ in range(n)] for _ in range(n)]
    backtrack(0, set(), set(), set(), board)
    return result
\`\`\`

### 5. Word Search

\`\`\`python
def exist(board, word):
    """Find word in grid moving up/down/left/right"""
    rows, cols = len(board), len(board[0])
    
    def backtrack(r, c, idx):
        if idx == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[idx]:
            return False
        
        temp = board[r][c]
        board[r][c] = '#'  # Mark visited
        
        found = (backtrack(r+1, c, idx+1) or
                 backtrack(r-1, c, idx+1) or
                 backtrack(r, c+1, idx+1) or
                 backtrack(r, c-1, idx+1))
        
        board[r][c] = temp  # Restore
        return found
    
    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True
    return False
\`\`\`

---

## Problem Pattern Guide

| Problem Type | Start Index | Can Reuse? |
|--------------|-------------|------------|
| Subsets | start | No (i + 1) |
| Permutations | 0 (with remaining) | No |
| Combination Sum | start | Yes (same i) |
| Combination Sum II | start | No, skip duplicates |

---

## Interview Insights 💡

**Common Questions**:
1. "Subsets" / "Subsets II"
2. "Permutations" / "Permutations II"
3. "Combination Sum" I, II, III
4. "N-Queens"
5. "Word Search"
6. "Palindrome Partitioning"

**Key Talking Points**:
- Backtracking = DFS + pruning
- Time complexity usually factorial or exponential
- Always restore state after recursion
- Use sets for O(1) constraint checking

**Red Flags**:
- Forgetting to undo choices
- Not handling duplicates properly
- Missing base cases
- No pruning (exploring invalid paths)

---

## Key Takeaways

✅ Backtracking = **build incrementally + undo + prune**  
✅ Template: make choice → recurse → undo choice  
✅ **Subsets**: include or not include each element  
✅ **Permutations**: try each remaining element  
✅ Use **sets** for fast constraint checking  
✅ Prune early: don't explore paths that can't succeed
`,
    },

    // Step 1-3-1: Recursion Fundamentals
    'step-1-3-1': {
        title: 'Recursion Fundamentals',
        content: `# Recursion Fundamentals

## Why This Matters

Recursion is **the foundation of elegant problem-solving**. It's essential for:

- **Tree and graph traversal** (most tree problems use recursion)
- **Divide and conquer** algorithms (merge sort, quick sort)
- **Dynamic programming** (top-down memoization)
- **Backtracking** problems (permutations, combinations)

---

## The Russian Dolls Analogy 🪆

| Russian Dolls | Recursion |
|---------------|-----------|
| Open the largest doll | Call the function |
| Find smaller doll inside | Recursive call with smaller input |
| Reach the tiniest doll | Hit the base case |
| Close dolls back up | Return values bubble up |

---

## Anatomy of Recursion

Every recursive function needs:

1. **Base case**: When to stop (prevents infinite recursion)
2. **Recursive case**: How to reduce the problem
3. **Progress**: Each call must move toward the base case

\`\`\`python
def recursive_function(problem):
    # 1. Base case - trivial solution
    if is_trivial(problem):
        return trivial_solution
    
    # 2. Recursive case - break down problem
    smaller_problem = reduce(problem)
    sub_result = recursive_function(smaller_problem)
    
    # 3. Combine results
    return combine(sub_result)
\`\`\`

---

## Classic Examples

### Factorial

\`\`\`python
def factorial(n):
    """n! = n × (n-1) × (n-2) × ... × 1"""
    if n <= 1:           # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

# factorial(5) → 5 * 4 * 3 * 2 * 1 = 120
\`\`\`

### Fibonacci

\`\`\`python
def fib(n):
    """0, 1, 1, 2, 3, 5, 8, 13, ..."""
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# fib(6) → 8
# Warning: O(2^n) time! Use memoization in practice.
\`\`\`

### Sum of Array

\`\`\`python
def sum_array(arr):
    if not arr:          # Base case: empty array
        return 0
    return arr[0] + sum_array(arr[1:])  # First + rest

# sum_array([1, 2, 3, 4, 5]) → 15
\`\`\`

### Reverse String

\`\`\`python
def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]  # Rest + first

# reverse("hello") → "olleh"
\`\`\`

---

## The Call Stack

\`\`\`mermaid
flowchart TB
    subgraph stack["Call Stack for factorial(4)"]
        F4["factorial(4) waiting"]
        F3["factorial(3) waiting"]
        F2["factorial(2) waiting"]
        F1["factorial(1) returns 1"]
    end
    F1 --> F2
    F2 --> F3
    F3 --> F4
\`\`\`

Each call waits for sub-calls to complete, using **stack space**.

---

## Tail Recursion

**Tail recursion**: No work after the recursive call. Can be optimized by compilers.

\`\`\`python
# Not tail recursive (work after call)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Must multiply AFTER return

# Tail recursive (accumulator pattern)
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, n * acc)  # Nothing after return

# Same result, but theoretically optimizable to O(1) space
\`\`\`

---

## Common Patterns

### 1. Tree Traversal

\`\`\`python
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)
\`\`\`

### 2. Divide and Conquer

\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
\`\`\`

### 3. Exploring All Paths

\`\`\`python
def all_paths(root):
    if not root:
        return []
    if not root.left and not root.right:
        return [[root.val]]
    
    paths = []
    for path in all_paths(root.left) + all_paths(root.right):
        paths.append([root.val] + path)
    return paths
\`\`\`

---

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| **Readability** | Often cleaner for trees/graphs | Simpler for linear problems |
| **Space** | O(n) stack space | O(1) typically |
| **Speed** | Function call overhead | Generally faster |
| **Use when** | Problem naturally recursive | Performance critical |

---

## Common Pitfalls

| Mistake | Solution |
|---------|----------|
| Missing base case | Always define when to stop |
| Base case never reached | Ensure progress toward base |
| Stack overflow | Limit depth or use iteration |
| Redundant work | Use memoization |

---

## Interview Insights 💡

**Common Questions**:
1. "Implement power function" (x^n)
2. "Reverse linked list recursively"
3. "Maximum depth of binary tree"
4. "Generate parentheses"

**Key Talking Points**:
- Think: What's the smallest version of this problem?
- Identify base case first
- Trust the recursion — assume sub-calls work correctly
- Consider converting to iteration if stack depth is a concern

**Red Flags**:
- No base case or wrong base case
- Infinite recursion (no progress)
- Ignoring stack overflow risk

---

## Key Takeaways

✅ Three parts: **base case**, **recursive case**, **progress**  
✅ Trust the recursion — focus on one level at a time  
✅ Use **memoization** for overlapping subproblems  
✅ Consider **tail recursion** for potential optimization  
✅ Convert to **iteration** when stack depth is a concern  
✅ Perfect for trees, graphs, and divide-and-conquer
`,
    },

    // Step 1-3-2: Bit Manipulation
    'step-1-3-2': {
        title: 'Bit Manipulation',
        content: `# Bit Manipulation

## Why This Matters

Bit manipulation is a **superpower** for certain problems. It enables:

- **O(1) space** solutions (using bits instead of arrays)
- **Blazing fast** operations (hardware-level)
- Elegant solutions to problems like "Single Number" or "Counting Bits"
- Understanding how computers actually work

---

## The Light Switch Analogy 💡

| Light Switches | Bits |
|----------------|------|
| 8 switches in a row | 8-bit number |
| Switch ON = 1, OFF = 0 | Binary digit |
| Flip a switch | XOR with 1 |
| Turn on a switch | OR with 1 |
| Turn off a switch | AND with 0 |

---

## Binary Basics

\`\`\`
Decimal 13 = Binary 1101

Position:  3  2  1  0
Value:     8  4  2  1
Bits:      1  1  0  1  = 8+4+0+1 = 13
\`\`\`

---

## Bitwise Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| \`&\` | AND | 5 & 3 = 0101 & 0011 | 0001 = 1 |
| \`\\|\` | OR | 5 \\| 3 = 0101 \\| 0011 | 0111 = 7 |
| \`^\` | XOR | 5 ^ 3 = 0101 ^ 0011 | 0110 = 6 |
| \`~\` | NOT | ~5 | -6 (inverts all bits) |
| \`<<\` | Left Shift | 5 << 1 | 10 (multiply by 2) |
| \`>>\` | Right Shift | 5 >> 1 | 2 (divide by 2) |

---

## Essential Tricks

### Bit Operations

\`\`\`python
# Check if nth bit is set (0-indexed from right)
def get_bit(num, n):
    return (num >> n) & 1

# Set nth bit to 1
def set_bit(num, n):
    return num | (1 << n)

# Clear nth bit (set to 0)
def clear_bit(num, n):
    return num & ~(1 << n)

# Toggle nth bit
def toggle_bit(num, n):
    return num ^ (1 << n)

# Examples:
# get_bit(13, 2)    → 1  (13 = 1101, bit 2 is 1)
# set_bit(13, 1)    → 15 (1101 → 1111)
# clear_bit(13, 2)  → 9  (1101 → 1001)
# toggle_bit(13, 0) → 12 (1101 → 1100)
\`\`\`

### Power of 2 Check ⭐

\`\`\`python
def is_power_of_two(n):
    """Powers of 2 have exactly one set bit"""
    return n > 0 and (n & (n - 1)) == 0

# Why it works:
# 8    = 1000
# 8-1  = 0111
# 8 & 7 = 0000 → True!

# 6    = 0110
# 6-1  = 0101
# 6 & 5 = 0100 → False
\`\`\`

### Count Set Bits (Hamming Weight)

\`\`\`python
def count_bits(n):
    """Count number of 1s in binary representation"""
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

# Brian Kernighan's optimization
def count_bits_fast(n):
    count = 0
    while n:
        n &= (n - 1)  # Clear rightmost set bit
        count += 1
    return count
\`\`\`

---

## Classic Problems

### 1. Single Number ⭐

\`\`\`python
def single_number(nums):
    """Find the number that appears once (others appear twice)"""
    result = 0
    for num in nums:
        result ^= num
    return result

# Why XOR works:
# a ^ a = 0 (same numbers cancel)
# a ^ 0 = a (identity)
# [2, 1, 2] → 2 ^ 1 ^ 2 = (2 ^ 2) ^ 1 = 0 ^ 1 = 1
\`\`\`

### 2. Missing Number

\`\`\`python
def missing_number(nums):
    """Find missing number in [0, n]"""
    n = len(nums)
    expected_xor = 0
    actual_xor = 0
    
    for i in range(n + 1):
        expected_xor ^= i
    for num in nums:
        actual_xor ^= num
    
    return expected_xor ^ actual_xor

# Or simply: n * (n + 1) // 2 - sum(nums)
\`\`\`

### 3. Reverse Bits

\`\`\`python
def reverse_bits(n):
    """Reverse 32 bits"""
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result
\`\`\`

### 4. Counting Bits (0 to n)

\`\`\`python
def counting_bits(n):
    """Return array where ans[i] = number of 1s in i"""
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

# dp[i] = dp[i/2] + last bit
# Uses the fact that i >> 1 has same bits except last
\`\`\`

---

## Bit Manipulation Patterns

| Pattern | Formula | Use Case |
|---------|---------|----------|
| Clear rightmost 1 | n & (n-1) | Power of 2 check |
| Get rightmost 1 | n & (-n) | Isolate lowest bit |
| Check if even | n & 1 == 0 | Parity check |
| Multiply by 2^k | n << k | Fast multiplication |
| Divide by 2^k | n >> k | Fast division |
| Swap without temp | a ^= b; b ^= a; a ^= b | Memory-efficient swap |

---

## Interview Insights 💡

**Common Questions**:
1. "Single Number" (XOR)
2. "Number of 1 Bits" (Hamming weight)
3. "Power of Two"
4. "Reverse Bits"
5. "Counting Bits"

**Key Talking Points**:
- XOR is your best friend: a^a=0, a^0=a
- n & (n-1) clears rightmost set bit
- Bit manipulation is O(1) space
- Very efficient for subset generation

**Red Flags**:
- Not knowing basic operators
- Off-by-one in bit positions
- Forgetting about signed integer complications

---

## Key Takeaways

✅ **XOR magic**: a ^ a = 0, a ^ 0 = a  
✅ **n & (n-1)** removes the rightmost set bit  
✅ Left shift = ×2, right shift = ÷2  
✅ Use for **O(1) space** and **fast operations**  
✅ Check bit i: \`(n >> i) & 1\`  
✅ Common trick: use bits as a set (bitmask)
`,
    },

    // Step 1-3-3: Math for CS
    'step-1-3-3': {
        title: 'Math for CS',
        content: `# Math for Computer Science

## Why This Matters

Mathematical foundations are essential for:

- **Competitive programming** (modular arithmetic is everywhere)
- **Cryptography** (primes, modular exponentiation)
- **Interview problems** (GCD, LCM, combinatorics)
- **Algorithm analysis** (counting, probability)

---

## The Building Blocks Analogy 🧱

| Math Concept | Where It's Used |
|--------------|-----------------|
| GCD/LCM | Fractions, scheduling, game theory |
| Modular arithmetic | Hashing, cryptography, overflow prevention |
| Prime numbers | Cryptography, hash functions |
| Combinatorics | Counting paths, probability |

---

## GCD & LCM

### Euclidean Algorithm ⭐

\`\`\`python
def gcd(a, b):
    """Greatest Common Divisor - O(log min(a,b))"""
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    """Least Common Multiple"""
    return a * b // gcd(a, b)

# gcd(48, 18) → 6
# lcm(4, 6) → 12

# Python 3.9+: from math import gcd, lcm
\`\`\`

### Extended Euclidean Algorithm

\`\`\`python
def extended_gcd(a, b):
    """Find x, y such that ax + by = gcd(a, b)"""
    if b == 0:
        return a, 1, 0
    gcd_val, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd_val, x, y

# Used for modular inverse: a * x ≡ 1 (mod m)
\`\`\`

---

## Modular Arithmetic ⭐

### Rules

\`\`\`
(a + b) mod m = ((a mod m) + (b mod m)) mod m
(a * b) mod m = ((a mod m) * (b mod m)) mod m
(a - b) mod m = ((a mod m) - (b mod m) + m) mod m
\`\`\`

### Modular Exponentiation (Fast Power)

\`\`\`python
def mod_pow(base, exp, mod):
    """Compute base^exp mod m in O(log exp)"""
    result = 1
    base %= mod
    
    while exp > 0:
        if exp & 1:  # If exp is odd
            result = (result * base) % mod
        exp >>= 1
        base = (base * base) % mod
    
    return result

# mod_pow(2, 10, 1000) → 24  (1024 mod 1000)
\`\`\`

### Modular Inverse

\`\`\`python
def mod_inverse(a, m):
    """Find x such that a*x ≡ 1 (mod m)"""
    # Works when gcd(a, m) = 1
    return mod_pow(a, m - 2, m)  # Fermat's little theorem (m is prime)

# For (a / b) mod m, compute a * mod_inverse(b, m) mod m
\`\`\`

### The Magic Number

\`\`\`python
MOD = 10**9 + 7  # 1000000007

# Why this number?
# - It's prime (enables Fermat's little theorem)
# - Large enough to avoid collisions
# - Fits in 32-bit signed integer when squared
# - Used in competitive programming everywhere
\`\`\`

---

## Prime Numbers

### Primality Check

\`\`\`python
def is_prime(n):
    """O(√n) primality test"""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True
\`\`\`

### Sieve of Eratosthenes ⭐

\`\`\`python
def sieve(n):
    """Find all primes up to n in O(n log log n)"""
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    
    return [i for i in range(n + 1) if is_prime[i]]

# sieve(20) → [2, 3, 5, 7, 11, 13, 17, 19]
\`\`\`

### Prime Factorization

\`\`\`python
def prime_factors(n):
    """Find all prime factors"""
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors

# prime_factors(60) → [2, 2, 3, 5]
\`\`\`

---

## Combinatorics

### Combinations (nCr)

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def nCr(n, r):
    """Pascal's triangle approach"""
    if r == 0 or r == n:
        return 1
    return nCr(n-1, r-1) + nCr(n-1, r)

# nCr(5, 2) → 10 (ways to choose 2 from 5)
\`\`\`

### With Modular Arithmetic

\`\`\`python
def factorial_mod(n, mod):
    result = 1
    for i in range(2, n + 1):
        result = (result * i) % mod
    return result

def nCr_mod(n, r, mod):
    """nCr with modular arithmetic"""
    if r > n:
        return 0
    num = factorial_mod(n, mod)
    denom = (factorial_mod(r, mod) * factorial_mod(n - r, mod)) % mod
    return (num * mod_inverse(denom, mod)) % mod
\`\`\`

### Catalan Numbers

\`\`\`python
def catalan(n):
    """Count valid parentheses, BST shapes, etc."""
    return nCr(2*n, n) // (n + 1)

# catalan(3) → 5
# Counts: valid parentheses "()()()", "(())()", ...
\`\`\`

---

## Classic Interview Problems

### 1. Count Primes

\`\`\`python
def count_primes(n):
    """Count primes less than n"""
    if n <= 2:
        return 0
    return len(sieve(n - 1))
\`\`\`

### 2. Unique Paths (Grid)

\`\`\`python
def unique_paths(m, n):
    """Paths from top-left to bottom-right"""
    return nCr(m + n - 2, m - 1)

# unique_paths(3, 7) → 28
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Count Primes"
2. "Unique Paths" (combinatorics)
3. "Pascal's Triangle"
4. "Power of Three"
5. "Happy Number"

**Key Talking Points**:
- Know the Euclidean algorithm cold
- Understand modular arithmetic for large numbers
- Sieve is the go-to for prime-related problems
- MOD = 10^9 + 7 is standard in competitive programming

**Red Flags**:
- Not handling overflow (use modular arithmetic)
- O(n) primality check instead of O(√n)
- Not knowing why we use 10^9 + 7

---

## Key Takeaways

✅ **GCD**: Euclidean algorithm, O(log min(a,b))  
✅ **Modular arithmetic**: prevents overflow, enables division  
✅ **MOD = 10^9 + 7**: prime, large, fits in 32-bit squared  
✅ **Sieve**: O(n log log n) to find all primes up to n  
✅ **nCr**: Pascal's triangle or modular inverse  
✅ Know these algorithms by heart for interviews
`,
    },

    // Step 1-4-1 through 1-4-4: Project steps
    'step-1-4-1': {
        title: 'Project P1: Data Structures Library',
        content: `# Project P1: Data Structures Library

## Project Overview

Build a **production-quality** data structures library from scratch. This project solidifies your understanding by implementing what you've learned.

**Language**: Python (or C++ for extra challenge)  
**Difficulty**: ⭐⭐⭐  
**Time**: 8-12 hours

---

## Why Build This?

| Skill Gained | Interview Impact |
|--------------|------------------|
| Deep understanding of internals | "How does HashMap work?" |
| Memory management awareness | "What's the complexity?" |
| API design experience | System design skills |
| Testing discipline | Code quality signals |

---

## What You'll Build

\`\`\`mermaid
flowchart TB
    subgraph lib["Data Structures Library"]
        DA["DynamicArray"]
        LL["LinkedList"]
        HT["HashMap"]
        BST["BinarySearchTree"]
        HP["MinHeap"]
    end
\`\`\`

---

## Phase 1: Dynamic Array

\`\`\`python
class DynamicArray:
    """Resizable array with amortized O(1) append"""
    
    def __init__(self, capacity=8):
        self._capacity = capacity
        self._size = 0
        self._data = [None] * capacity
    
    def __len__(self):
        return self._size
    
    def __getitem__(self, index):
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        return self._data[index]
    
    def append(self, item):
        if self._size == self._capacity:
            self._resize(2 * self._capacity)
        self._data[self._size] = item
        self._size += 1
    
    def pop(self):
        if self._size == 0:
            raise IndexError("Pop from empty array")
        self._size -= 1
        item = self._data[self._size]
        self._data[self._size] = None
        # Shrink if too sparse
        if self._size < self._capacity // 4:
            self._resize(max(8, self._capacity // 2))
        return item
    
    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity
\`\`\`

**Test Cases**:
\`\`\`python
def test_dynamic_array():
    arr = DynamicArray()
    for i in range(1000):
        arr.append(i)
    assert len(arr) == 1000
    assert arr[500] == 500
    for _ in range(999):
        arr.pop()
    assert len(arr) == 1
\`\`\`

---

## Phase 2: Linked List

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self._size = 0
    
    def append(self, value):
        node = Node(value)
        if not self.head:
            self.head = self.tail = node
        else:
            self.tail.next = node
            self.tail = node
        self._size += 1
    
    def prepend(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node
        if not self.tail:
            self.tail = node
        self._size += 1
    
    def remove(self, value):
        if not self.head:
            return False
        if self.head.value == value:
            self.head = self.head.next
            if not self.head:
                self.tail = None
            self._size -= 1
            return True
        current = self.head
        while current.next:
            if current.next.value == value:
                current.next = current.next.next
                if not current.next:
                    self.tail = current
                self._size -= 1
                return True
            current = current.next
        return False
    
    def __iter__(self):
        current = self.head
        while current:
            yield current.value
            current = current.next
    
    def __len__(self):
        return self._size
\`\`\`

---

## Phase 3: HashMap

\`\`\`python
class HashMap:
    """Hash table with separate chaining"""
    
    def __init__(self, capacity=16, load_factor=0.75):
        self._capacity = capacity
        self._load_factor = load_factor
        self._size = 0
        self._buckets = [[] for _ in range(capacity)]
    
    def _hash(self, key):
        return hash(key) % self._capacity
    
    def put(self, key, value):
        if self._size >= self._capacity * self._load_factor:
            self._resize()
        
        idx = self._hash(key)
        for pair in self._buckets[idx]:
            if pair[0] == key:
                pair[1] = value
                return
        
        self._buckets[idx].append([key, value])
        self._size += 1
    
    def get(self, key, default=None):
        idx = self._hash(key)
        for pair in self._buckets[idx]:
            if pair[0] == key:
                return pair[1]
        return default
    
    def remove(self, key):
        idx = self._hash(key)
        for i, pair in enumerate(self._buckets[idx]):
            if pair[0] == key:
                del self._buckets[idx][i]
                self._size -= 1
                return True
        return False
    
    def _resize(self):
        old_buckets = self._buckets
        self._capacity *= 2
        self._buckets = [[] for _ in range(self._capacity)]
        self._size = 0
        for bucket in old_buckets:
            for key, value in bucket:
                self.put(key, value)
\`\`\`

---

## Phase 4: Binary Search Tree

\`\`\`python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        self.root = self._insert(self.root, value)
    
    def _insert(self, node, value):
        if not node:
            return TreeNode(value)
        if value < node.value:
            node.left = self._insert(node.left, value)
        else:
            node.right = self._insert(node.right, value)
        return node
    
    def search(self, value):
        return self._search(self.root, value)
    
    def _search(self, node, value):
        if not node:
            return False
        if value == node.value:
            return True
        if value < node.value:
            return self._search(node.left, value)
        return self._search(node.right, value)
    
    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result
    
    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.value)
            self._inorder(node.right, result)
\`\`\`

---

## Testing Your Library

\`\`\`python
import unittest

class TestDataStructures(unittest.TestCase):
    
    def test_hashmap_collision(self):
        hm = HashMap(capacity=4)
        for i in range(20):
            hm.put(f"key{i}", i)
        for i in range(20):
            self.assertEqual(hm.get(f"key{i}"), i)
    
    def test_bst_sorted(self):
        bst = BST()
        nums = [5, 3, 7, 1, 9, 4, 6]
        for n in nums:
            bst.insert(n)
        self.assertEqual(bst.inorder(), sorted(nums))

if __name__ == '__main__':
    unittest.main()
\`\`\`

---

## Extension Challenges

| Challenge | Difficulty |
|-----------|------------|
| Add iterator support | ⭐ |
| Implement delete for BST | ⭐⭐ |
| Self-balancing tree (AVL) | ⭐⭐⭐ |
| Open addressing HashMap | ⭐⭐ |
| Thread-safe versions | ⭐⭐⭐ |

---

## Interview Talking Points

After completing this project:
- "I implemented X from scratch, which taught me about Y"
- "I handled edge cases like resize, empty collections, and collisions"
- "I wrote comprehensive tests with N% coverage"
- "I learned the difference between amortized and worst-case complexity"
`,
    },

    'step-1-4-2': {
        title: 'Project P2: Algorithm Visualizer',
        content: `# Project P2: Algorithm Visualizer

## Project Overview

Build a **visual learning tool** that shows algorithms in action. Watch sorting algorithms race, see binary search narrow down, understand why some approaches are faster.

**Language**: Python  
**Difficulty**: ⭐⭐  
**Time**: 6-8 hours

---

## Why Build This?

| Skill Gained | Interview Impact |
|--------------|------------------|
| Deep algorithm understanding | "Walk me through quicksort" |
| Visualization skills | System design diagrams |
| Performance measurement | "What's the complexity?" |
| CLI development | Full-stack awareness |

---

## Architecture

\`\`\`mermaid
flowchart LR
    subgraph viz["Algorithm Visualizer"]
        CLI["CLI Interface"]
        ALG["Algorithm Engine"]
        DISP["Display Module"]
        STATS["Statistics Tracker"]
    end
    CLI --> ALG --> DISP
    ALG --> STATS
\`\`\`

---

## Phase 1: Display Engine

\`\`\`python
import os
import time

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def display_array(arr, comparing=None, swapping=None, sorted_indices=None):
    """Visualize array as bar chart"""
    comparing = comparing or []
    swapping = swapping or []
    sorted_indices = sorted_indices or set()
    
    max_val = max(arr)
    height = min(20, max_val)
    
    for row in range(height, 0, -1):
        line = ""
        for i, val in enumerate(arr):
            scaled = int(val * height / max_val)
            if scaled >= row:
                if i in swapping:
                    line += " ▓▓"  # Swapping
                elif i in comparing:
                    line += " ░░"  # Comparing
                elif i in sorted_indices:
                    line += " ██"  # Sorted
                else:
                    line += " ▒▒"  # Normal
            else:
                line += "   "
        print(line)
    
    # Print indices
    print("─" * (len(arr) * 3))
    print(" ".join(f"{v:2}" for v in arr))

def animate(arr, delay=0.1, **kwargs):
    clear_screen()
    display_array(arr, **kwargs)
    time.sleep(delay)
\`\`\`

---

## Phase 2: Sorting Algorithms

\`\`\`python
class SortVisualizer:
    def __init__(self, arr):
        self.arr = arr.copy()
        self.comparisons = 0
        self.swaps = 0
        self.sorted = set()
    
    def bubble_sort(self, delay=0.1):
        """O(n²) - good for small data, educational"""
        n = len(self.arr)
        
        for i in range(n):
            for j in range(n - 1 - i):
                self.comparisons += 1
                animate(self.arr, delay, comparing=[j, j+1], 
                        sorted_indices=self.sorted)
                
                if self.arr[j] > self.arr[j+1]:
                    self.arr[j], self.arr[j+1] = self.arr[j+1], self.arr[j]
                    self.swaps += 1
                    animate(self.arr, delay, swapping=[j, j+1],
                            sorted_indices=self.sorted)
            
            self.sorted.add(n - 1 - i)
        
        return self.get_stats()
    
    def quick_sort(self, delay=0.05):
        """O(n log n) average - fast in practice"""
        self._quick_sort(0, len(self.arr) - 1, delay)
        return self.get_stats()
    
    def _quick_sort(self, low, high, delay):
        if low < high:
            pivot_idx = self._partition(low, high, delay)
            self.sorted.add(pivot_idx)
            self._quick_sort(low, pivot_idx - 1, delay)
            self._quick_sort(pivot_idx + 1, high, delay)
    
    def _partition(self, low, high, delay):
        pivot = self.arr[high]
        i = low - 1
        
        for j in range(low, high):
            self.comparisons += 1
            animate(self.arr, delay, comparing=[j, high],
                    sorted_indices=self.sorted)
            
            if self.arr[j] <= pivot:
                i += 1
                self.arr[i], self.arr[j] = self.arr[j], self.arr[i]
                self.swaps += 1
        
        self.arr[i+1], self.arr[high] = self.arr[high], self.arr[i+1]
        self.swaps += 1
        return i + 1
    
    def get_stats(self):
        return {
            'comparisons': self.comparisons,
            'swaps': self.swaps,
            'array': self.arr
        }
\`\`\`

---

## Phase 3: Binary Search Visualization

\`\`\`python
def visualize_binary_search(arr, target, delay=0.5):
    """Watch binary search narrow down"""
    arr = sorted(arr)
    left, right = 0, len(arr) - 1
    iterations = 0
    
    while left <= right:
        mid = (left + right) // 2
        iterations += 1
        
        # Show current search range
        clear_screen()
        print(f"Searching for: {target}")
        print(f"Range: [{left}, {right}], Mid: {mid}")
        print()
        
        for i, val in enumerate(arr):
            if i == mid:
                marker = ">>> "
            elif left <= i <= right:
                marker = "    "
            else:
                marker = " x  "
            print(f"{marker}{val}")
        
        time.sleep(delay)
        
        if arr[mid] == target:
            print(f"\\nFound at index {mid} in {iterations} iterations!")
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    print(f"\\nNot found after {iterations} iterations")
    return -1
\`\`\`

---

## Phase 4: CLI Interface

\`\`\`python
import random

def main():
    print("=== Algorithm Visualizer ===")
    print("1. Bubble Sort")
    print("2. Quick Sort")
    print("3. Binary Search")
    print("4. Race Mode (compare algorithms)")
    
    choice = input("Choose: ")
    size = int(input("Array size (10-50): "))
    
    arr = [random.randint(1, 50) for _ in range(size)]
    
    if choice == "1":
        viz = SortVisualizer(arr)
        stats = viz.bubble_sort()
        print(f"Bubble Sort: {stats['comparisons']} comparisons, "
              f"{stats['swaps']} swaps")
    
    elif choice == "2":
        viz = SortVisualizer(arr)
        stats = viz.quick_sort()
        print(f"Quick Sort: {stats['comparisons']} comparisons, "
              f"{stats['swaps']} swaps")
    
    elif choice == "4":
        # Race mode!
        for name, algo in [("Bubble", "bubble_sort"), 
                           ("Quick", "quick_sort")]:
            viz = SortVisualizer(arr)
            start = time.time()
            stats = getattr(viz, algo)(delay=0.01)
            elapsed = time.time() - start
            print(f"{name}: {stats['comparisons']} comp, "
                  f"{stats['swaps']} swaps, {elapsed:.2f}s")

if __name__ == "__main__":
    main()
\`\`\`

---

## Extension Challenges

| Challenge | Difficulty |
|-----------|------------|
| Add merge sort visualization | ⭐⭐ |
| Color-coded complexity zones | ⭐ |
| Step-by-step mode with explanations | ⭐⭐ |
| Performance graphs with matplotlib | ⭐⭐ |
| Web version with HTML canvas | ⭐⭐⭐ |

---

## Learning Outcomes

After this project, you'll be able to:
- Explain exactly how each sorting algorithm works
- Predict which algorithm is faster for different inputs
- Understand O(n²) vs O(n log n) viscerally
- Build engaging command-line tools
`,
    },

    'step-1-4-3': {
        title: 'Project P3: Recursive Problem Set',
        content: `# Project P3: Recursive Problem Set

## Project Overview

Master recursion by working through **10 progressively harder problems**. Each problem builds intuition and pattern recognition for recursive solutions.

**Language**: Python  
**Difficulty**: ⭐⭐⭐  
**Time**: 6-10 hours

---

## Why This Project?

| Skill Gained | Interview Impact |
|--------------|------------------|
| Recursive thinking pattern | Every tree/graph problem |
| Call stack understanding | Debugging recursion bugs |
| Base case intuition | Avoid off-by-one errors |
| Problem decomposition | System design thinking |

---

## Problem Categories

\`\`\`mermaid
flowchart TB
    subgraph problems["10 Recursive Problems"]
        Basic["Basic: 1-3"]
        Trees["Trees: 4-6"]
        Backtrack["Backtracking: 7-9"]
        Advanced["Advanced: 10"]
    end
    Basic --> Trees --> Backtrack --> Advanced
\`\`\`

---

## Problems 1-3: Basic Recursion

### 1. Factorial & Fibonacci

\`\`\`python
def factorial(n):
    """Base case: n <= 1 returns 1"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n, memo={}):
    """Memoized Fibonacci - O(n) instead of O(2^n)"""
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

# Test: fibonacci(50) returns instantly with memo
\`\`\`

### 2. Tower of Hanoi ⭐

\`\`\`python
def hanoi(n, source, auxiliary, target, moves=[]):
    """
    Move n disks from source to target using auxiliary.
    Minimum moves: 2^n - 1
    """
    if n == 1:
        moves.append(f"{source} -> {target}")
        return
    
    # Move n-1 disks to auxiliary
    hanoi(n-1, source, target, auxiliary, moves)
    
    # Move largest disk to target
    moves.append(f"{source} -> {target}")
    
    # Move n-1 disks from auxiliary to target
    hanoi(n-1, auxiliary, source, target, moves)
    
    return moves

# hanoi(3, 'A', 'B', 'C') -> 7 moves
\`\`\`

### 3. Reverse String

\`\`\`python
def reverse_string(s):
    if len(s) <= 1:
        return s
    return reverse_string(s[1:]) + s[0]

# reverse_string("hello") -> "olleh"
\`\`\`

---

## Problems 4-6: Tree Recursion

### 4. Binary Tree Depth

\`\`\`python
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
\`\`\`

### 5. Path Sum

\`\`\`python
def has_path_sum(root, target):
    """Does any root-to-leaf path sum to target?"""
    if not root:
        return False
    
    if not root.left and not root.right:
        return root.val == target
    
    remaining = target - root.val
    return (has_path_sum(root.left, remaining) or 
            has_path_sum(root.right, remaining))
\`\`\`

### 6. All Root-to-Leaf Paths

\`\`\`python
def all_paths(root, path=None, result=None):
    if path is None:
        path, result = [], []
    
    if not root:
        return result
    
    path.append(root.val)
    
    if not root.left and not root.right:
        result.append(path.copy())
    else:
        all_paths(root.left, path, result)
        all_paths(root.right, path, result)
    
    path.pop()  # Backtrack!
    return result
\`\`\`

---

## Problems 7-9: Backtracking

### 7. Generate Subsets ⭐

\`\`\`python
def subsets(nums):
    result = []
    
    def backtrack(start, current):
        result.append(current.copy())
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # Undo choice
    
    backtrack(0, [])
    return result

# subsets([1,2,3]) -> [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
\`\`\`

### 8. Permutations ⭐

\`\`\`python
def permutations(nums):
    result = []
    
    def backtrack(current, remaining):
        if not remaining:
            result.append(current.copy())
            return
        
        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()
    
    backtrack([], nums)
    return result

# permutations([1,2,3]) -> 6 permutations
\`\`\`

### 9. N-Queens

\`\`\`python
def solve_n_queens(n):
    result = []
    
    def backtrack(row, cols, diags, anti_diags, board):
        if row == n:
            result.append(["".join(r) for r in board])
            return
        
        for col in range(n):
            if col in cols or (row-col) in diags or (row+col) in anti_diags:
                continue
            
            board[row][col] = 'Q'
            cols.add(col)
            diags.add(row - col)
            anti_diags.add(row + col)
            
            backtrack(row + 1, cols, diags, anti_diags, board)
            
            board[row][col] = '.'
            cols.remove(col)
            diags.remove(row - col)
            anti_diags.remove(row + col)
    
    board = [['.' for _ in range(n)] for _ in range(n)]
    backtrack(0, set(), set(), set(), board)
    return result
\`\`\`

---

## Problem 10: Advanced

### 10. Word Search (DFS + Backtracking)

\`\`\`python
def exist(board, word):
    """Find word in grid, can move up/down/left/right"""
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, idx):
        if idx == len(word):
            return True
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            board[r][c] != word[idx]):
            return False
        
        temp = board[r][c]
        board[r][c] = '#'  # Mark visited
        
        found = (dfs(r+1, c, idx+1) or dfs(r-1, c, idx+1) or
                 dfs(r, c+1, idx+1) or dfs(r, c-1, idx+1))
        
        board[r][c] = temp  # Restore
        return found
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False
\`\`\`

---

## Progress Tracker

| # | Problem | Pattern | Status |
|---|---------|---------|--------|
| 1 | Factorial/Fib | Basic | ☐ |
| 2 | Tower of Hanoi | Basic | ☐ |
| 3 | Reverse String | Basic | ☐ |
| 4 | Tree Depth | Tree | ☐ |
| 5 | Path Sum | Tree | ☐ |
| 6 | All Paths | Tree + Backtrack | ☐ |
| 7 | Subsets | Backtracking | ☐ |
| 8 | Permutations | Backtracking | ☐ |
| 9 | N-Queens | Backtracking | ☐ |
| 10 | Word Search | DFS + Backtrack | ☐ |

---

## Interview Talking Points

After completing this project:
- "I worked through 10 recursive problems to build pattern recognition"
- "I understand when to use memoization vs backtracking"
- "I can trace through the call stack for any recursive solution"
- "I know how to identify base cases and progress toward them"
`,
    },

    'step-1-4-4': {
        title: 'Project P4: Bit Manipulation Toolkit',
        content: `# Project P4: Bit Manipulation Toolkit

## Project Overview

Build a comprehensive **bit manipulation library** with visualization tools. Master binary operations by implementing and testing common patterns.

**Language**: Python (with optional C++ version)  
**Difficulty**: ⭐⭐  
**Time**: 4-6 hours

---

## Why Build This?

| Skill Gained | Interview Impact |
|--------------|------------------|
| Binary number mastery | "Explain Single Number" |
| Low-level thinking | System programming |
| XOR/AND/OR patterns | Bit manipulation questions |
| Performance optimization | O(1) space solutions |

---

## Architecture

\`\`\`mermaid
flowchart LR
    subgraph toolkit["Bit Manipulation Toolkit"]
        CONV["Converter"]
        OPS["Operations"]
        SOLVE["Solvers"]
        VIZ["Visualizer"]
    end
    CONV --> OPS --> SOLVE
    OPS --> VIZ
\`\`\`

---

## Phase 1: Binary Converter

\`\`\`python
class BitConverter:
    """Convert between decimal, binary, and hex"""
    
    @staticmethod
    def to_binary(n, bits=8):
        """Convert to binary string with leading zeros"""
        if n < 0:
            # Two's complement for negative numbers
            n = (1 << bits) + n
        return format(n, f'0{bits}b')
    
    @staticmethod
    def to_decimal(binary_str):
        """Convert binary string to decimal"""
        return int(binary_str, 2)
    
    @staticmethod
    def to_hex(n):
        """Convert to hexadecimal"""
        return hex(n)
    
    @staticmethod
    def visualize(n, bits=8):
        """Pretty print binary representation"""
        binary = BitConverter.to_binary(n, bits)
        print(f"Decimal: {n}")
        print(f"Binary:  {binary}")
        print(f"Hex:     {hex(n)}")
        print()
        
        # Show bit positions
        positions = " ".join(f"{i:>2}" for i in range(bits-1, -1, -1))
        bit_vals = " ".join(f" {b}" for b in binary)
        print(f"Position: {positions}")
        print(f"Bits:     {bit_vals}")

# Example:
# BitConverter.visualize(42, 8)
# Decimal: 42
# Binary:  00101010
# Hex:     0x2a
# Position:  7  6  5  4  3  2  1  0
# Bits:      0  0  1  0  1  0  1  0
\`\`\`

---

## Phase 2: Bit Operations

\`\`\`python
class BitOps:
    """Fundamental bit operations"""
    
    @staticmethod
    def get_bit(n, i):
        """Get the i-th bit (0-indexed from right)"""
        return (n >> i) & 1
    
    @staticmethod
    def set_bit(n, i):
        """Set the i-th bit to 1"""
        return n | (1 << i)
    
    @staticmethod
    def clear_bit(n, i):
        """Clear the i-th bit (set to 0)"""
        return n & ~(1 << i)
    
    @staticmethod
    def toggle_bit(n, i):
        """Toggle the i-th bit"""
        return n ^ (1 << i)
    
    @staticmethod
    def count_bits(n):
        """Count number of set bits (Hamming weight)"""
        count = 0
        while n:
            n &= (n - 1)  # Clear rightmost set bit
            count += 1
        return count
    
    @staticmethod
    def is_power_of_two(n):
        """Check if n is a power of 2"""
        return n > 0 and (n & (n - 1)) == 0
    
    @staticmethod
    def rightmost_set_bit(n):
        """Get the rightmost set bit"""
        return n & (-n)
    
    @staticmethod
    def clear_rightmost_set_bit(n):
        """Clear the rightmost set bit"""
        return n & (n - 1)

# Test suite
def test_bit_ops():
    assert BitOps.get_bit(13, 2) == 1     # 1101, bit 2 is 1
    assert BitOps.set_bit(8, 1) == 10     # 1000 -> 1010
    assert BitOps.clear_bit(15, 2) == 11  # 1111 -> 1011
    assert BitOps.count_bits(255) == 8
    assert BitOps.is_power_of_two(16) == True
    assert BitOps.is_power_of_two(15) == False
    print("All tests passed!")
\`\`\`

---

## Phase 3: Problem Solvers

\`\`\`python
class BitSolvers:
    """Solutions to common bit manipulation problems"""
    
    @staticmethod
    def single_number(nums):
        """
        Find number appearing once (others appear twice)
        XOR properties: a^a=0, a^0=a
        """
        result = 0
        for num in nums:
            result ^= num
        return result
    
    @staticmethod
    def missing_number(nums):
        """
        Find missing number in [0, n]
        XOR all indices and values
        """
        n = len(nums)
        result = n  # Start with n (the last index)
        for i, num in enumerate(nums):
            result ^= i ^ num
        return result
    
    @staticmethod
    def reverse_bits(n, bits=32):
        """Reverse all bits"""
        result = 0
        for _ in range(bits):
            result = (result << 1) | (n & 1)
            n >>= 1
        return result
    
    @staticmethod
    def counting_bits(n):
        """
        Return array where ans[i] = count of 1s in i
        DP approach: dp[i] = dp[i>>1] + (i&1)
        """
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp
    
    @staticmethod
    def add_without_plus(a, b):
        """Add two integers without using + operator"""
        while b:
            carry = a & b
            a = a ^ b
            b = carry << 1
        return a
    
    @staticmethod
    def swap_without_temp(a, b):
        """Swap two values without temp variable"""
        a ^= b
        b ^= a
        a ^= b
        return a, b

# Test
print(BitSolvers.single_number([2, 1, 2]))  # 1
print(BitSolvers.missing_number([0, 1, 3])) # 2
print(BitSolvers.add_without_plus(5, 3))    # 8
\`\`\`

---

## Phase 4: Interactive Visualizer

\`\`\`python
def interactive_bit_explorer():
    """Interactive CLI for exploring bit operations"""
    print("=== Bit Manipulation Explorer ===")
    print("Commands: binary, set, clear, toggle, count, xor, quit")
    
    while True:
        cmd = input("\\n> ").strip().lower()
        
        if cmd == "quit":
            break
        
        elif cmd == "binary":
            n = int(input("Enter number: "))
            BitConverter.visualize(n, 8)
        
        elif cmd == "set":
            n = int(input("Number: "))
            i = int(input("Bit position: "))
            result = BitOps.set_bit(n, i)
            print(f"{n} with bit {i} set = {result}")
            BitConverter.visualize(result, 8)
        
        elif cmd == "count":
            n = int(input("Number: "))
            print(f"Number of 1s in {n}: {BitOps.count_bits(n)}")
        
        elif cmd == "xor":
            nums = list(map(int, input("Numbers (space-separated): ").split()))
            result = BitSolvers.single_number(nums)
            print(f"XOR of all: {result}")

if __name__ == "__main__":
    interactive_bit_explorer()
\`\`\`

---

## Problem Set

| Problem | Input | Expected Output |
|---------|-------|-----------------|
| Single Number | [4, 1, 2, 1, 2] | 4 |
| Missing Number | [3, 0, 1] | 2 |
| Power of Two | 16 | True |
| Count Bits | 7 | 3 |
| Reverse Bits | 0b10110 | 0b01101 |
| Add w/o Plus | 5, 7 | 12 |

---

## Extension Challenges

| Challenge | Difficulty |
|-----------|------------|
| Single Number II (appears 3x) | ⭐⭐ |
| Bitwise AND of range | ⭐⭐ |
| Gray code generator | ⭐⭐ |
| Subset generation via bits | ⭐⭐ |
| UTF-8 validator | ⭐⭐⭐ |

---

## Interview Talking Points

After completing this project:
- "I understand XOR properties and can explain why a^a=0"
- "I can solve problems in O(1) space using bit manipulation"
- "I implemented Brian Kernighan's algorithm for counting bits"
- "I understand two's complement and can work with negative numbers"
`,
    },

    // Scene 1-5: Design Patterns & OOP
    'step-1-5-1': {
        title: 'SOLID Principles',
        content: `# SOLID Principles

## Why This Matters

SOLID principles are the **foundation of maintainable OOP code**. They help you:

- Write code that's **easy to change** and extend
- Create **testable** and **loosely coupled** systems
- Avoid common design pitfalls that lead to technical debt
- Ace **system design** portions of interviews

---

## The SOLID Mnemonic

\`\`\`mermaid
flowchart LR
    S["S: Single Responsibility"]
    O["O: Open/Closed"]
    L["L: Liskov Substitution"]
    I["I: Interface Segregation"]
    D["D: Dependency Inversion"]
    S --> O --> L --> I --> D
\`\`\`

---

## S — Single Responsibility Principle ⭐

> **"A class should have only one reason to change."**

\`\`\`python
# ❌ BAD: Multiple responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def save_to_database(self):
        # Database logic mixed with domain
        db.execute(f"INSERT INTO users ...")
    
    def send_email(self, message):
        # Email logic mixed with domain
        smtp.send(self.email, message)
    
    def generate_report(self):
        # Reporting logic too!
        return f"Report for {self.name}"

# ✅ GOOD: Separated responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user: User):
        db.execute(f"INSERT INTO users ...")

class EmailService:
    def send(self, user: User, message: str):
        smtp.send(user.email, message)

class UserReportGenerator:
    def generate(self, user: User):
        return f"Report for {user.name}"
\`\`\`

**Interview Tip**: "By separating concerns, I can test each component independently and change database logic without affecting email functionality."

---

## O — Open/Closed Principle

> **"Open for extension, closed for modification."**

\`\`\`python
# ❌ BAD: Must modify for every new shape
class AreaCalculator:
    def calculate(self, shape):
        if shape.type == "circle":
            return 3.14 * shape.radius ** 2
        elif shape.type == "rectangle":
            return shape.width * shape.height
        elif shape.type == "triangle":
            return 0.5 * shape.base * shape.height
        # Endless if-else chain!

# ✅ GOOD: Extend without modifying
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
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

# Adding new shape doesn't modify existing code!
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    
    def area(self):
        return 0.5 * self.base * self.height

def total_area(shapes: list[Shape]) -> float:
    return sum(shape.area() for shape in shapes)
\`\`\`

---

## L — Liskov Substitution Principle

> **"Subtypes must be substitutable for their base types."**

\`\`\`python
# ❌ BAD: Square violates Rectangle contract
class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    def set_width(self, w):
        self._width = w
    
    def set_height(self, h):
        self._height = h
    
    def area(self):
        return self._width * self._height

class Square(Rectangle):
    def set_width(self, w):
        self._width = self._height = w  # Violates LSP!
    
    def set_height(self, h):
        self._width = self._height = h

# This breaks expectations:
def test_rectangle(r: Rectangle):
    r.set_width(5)
    r.set_height(4)
    assert r.area() == 20  # Fails for Square!

# ✅ GOOD: Proper abstraction
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    def area(self):
        return self.side ** 2
\`\`\`

**Key Insight**: If B is a subtype of A, then objects of type A may be replaced with objects of type B without altering correctness.

---

## I — Interface Segregation Principle

> **"Clients shouldn't depend on interfaces they don't use."**

\`\`\`python
# ❌ BAD: Fat interface
class Worker(ABC):
    @abstractmethod
    def work(self): pass
    
    @abstractmethod
    def eat(self): pass
    
    @abstractmethod
    def sleep(self): pass

class Robot(Worker):
    def work(self): print("Working")
    def eat(self): pass   # Robots don't eat!
    def sleep(self): pass # Robots don't sleep!

# ✅ GOOD: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass

class Eatable(ABC):
    @abstractmethod
    def eat(self): pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self): pass

class Human(Workable, Eatable, Sleepable):
    def work(self): print("Working")
    def eat(self): print("Eating lunch")
    def sleep(self): print("Sleeping")

class Robot(Workable):
    def work(self): print("Working 24/7")
\`\`\`

---

## D — Dependency Inversion Principle ⭐

> **"Depend on abstractions, not concretions."**

\`\`\`python
# ❌ BAD: High-level depends on low-level
class MySQLDatabase:
    def save(self, data):
        print(f"Saving to MySQL: {data}")

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Tight coupling!
    
    def create_user(self, name):
        self.db.save({"name": name})

# Can't easily switch databases or test!

# ✅ GOOD: Depend on abstraction
class Database(ABC):
    @abstractmethod
    def save(self, data): pass

class MySQLDatabase(Database):
    def save(self, data):
        print(f"Saving to MySQL: {data}")

class PostgresDatabase(Database):
    def save(self, data):
        print(f"Saving to Postgres: {data}")

class UserService:
    def __init__(self, db: Database):
        self.db = db  # Dependency injection!
    
    def create_user(self, name):
        self.db.save({"name": name})

# Now easily testable and swappable!
service = UserService(PostgresDatabase())
\`\`\`

---

## SOLID Summary

| Principle | One-Line Summary |
|-----------|------------------|
| **SRP** | One class, one job |
| **OCP** | Add features by adding code, not changing it |
| **LSP** | Subtypes work wherever parents work |
| **ISP** | Small, focused interfaces > fat interfaces |
| **DIP** | Depend on abstractions, inject dependencies |

---

## Interview Insights 💡

**Common Questions**:
1. "What are SOLID principles?"
2. "Give an example of violating SRP"
3. "How would you refactor this code to follow SOLID?"
4. "What's dependency injection? Why use it?"

**Key Talking Points**:
- SOLID prevents code rot and makes testing easier
- Dependency injection enables mocking in tests
- Over-engineering is also bad — apply pragmatically

**Red Flags**:
- Can't explain any principle with an example
- Applying SOLID to trivial code
- Not understanding the trade-offs

---

## Key Takeaways

✅ **SRP**: Each class has one responsibility  
✅ **OCP**: Extend through polymorphism, not modification  
✅ **LSP**: Subclasses must honor parent contracts  
✅ **ISP**: Create focused, minimal interfaces  
✅ **DIP**: Inject dependencies, depend on abstractions  
✅ Apply **pragmatically** — don't over-engineer!
`,
    },

    'step-1-5-2': {
        title: 'Creational Patterns',
        content: `# Creational Design Patterns

## Why This Matters

Creational patterns solve the **"how do I create objects?"** problem:

- **Decouple** creation from usage
- Make code **flexible** and **testable**
- Handle **complex construction** elegantly
- Enable **configuration-driven** object creation

---

## Pattern Overview

\`\`\`mermaid
flowchart TB
    subgraph creational["Creational Patterns"]
        F["Factory Method"]
        AF["Abstract Factory"]
        B["Builder"]
        S["Singleton"]
        P["Prototype"]
    end
    F --> |"families"| AF
    F --> |"complex"| B
\`\`\`

---

## Factory Method ⭐

> **Delegate instantiation to subclasses or methods.**

**Use When**: Object type is determined at runtime or by configuration.

\`\`\`python
from abc import ABC, abstractmethod

# Product interface
class Notification(ABC):
    @abstractmethod
    def send(self, message: str): pass

# Concrete products
class EmailNotification(Notification):
    def send(self, message):
        print(f"📧 Email: {message}")

class SMSNotification(Notification):
    def send(self, message):
        print(f"📱 SMS: {message}")

class PushNotification(Notification):
    def send(self, message):
        print(f"🔔 Push: {message}")

# Factory
class NotificationFactory:
    @staticmethod
    def create(channel: str) -> Notification:
        factories = {
            "email": EmailNotification,
            "sms": SMSNotification,
            "push": PushNotification
        }
        if channel not in factories:
            raise ValueError(f"Unknown channel: {channel}")
        return factories[channel]()

# Usage - type determined at runtime
channel = config.get("notification_channel")  # "email"
notifier = NotificationFactory.create(channel)
notifier.send("Your order shipped!")
\`\`\`

**Real-World Examples**: 
- \`logging.getLogger()\` - creates appropriate handler
- Database connection factories
- UI component factories

---

## Singleton ⚠️

> **Ensure a class has only one instance.**

**Use When**: Exactly one object needed (config, connection pool, logger).

\`\`\`python
class DatabaseConnection:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._connection = cls._connect()
        return cls._instance
    
    @staticmethod
    def _connect():
        print("Connecting to database...")
        return "connection_object"
    
    def query(self, sql):
        return f"Executing: {sql}"

# Thread-safe version (double-checked locking)
import threading

class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                # Double-check after acquiring lock
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

# Pythonic alternative: Module-level instance
# db.py
# _connection = None
# def get_connection():
#     global _connection
#     if _connection is None:
#         _connection = create_connection()
#     return _connection
\`\`\`

**⚠️ Singleton Drawbacks**:
- Hard to test (global state)
- Hidden dependencies
- Violates SRP (manages own lifetime)
- Consider dependency injection instead!

---

## Builder ⭐

> **Construct complex objects step by step.**

**Use When**: Object has many optional parameters or construction steps.

\`\`\`python
class HttpRequest:
    """Immutable HTTP request object"""
    def __init__(self, method, url, headers, body, timeout, auth):
        self.method = method
        self.url = url
        self.headers = headers
        self.body = body
        self.timeout = timeout
        self.auth = auth

class HttpRequestBuilder:
    def __init__(self, method: str, url: str):
        self._method = method
        self._url = url
        self._headers = {}
        self._body = None
        self._timeout = 30
        self._auth = None
    
    def header(self, key: str, value: str):
        self._headers[key] = value
        return self  # Enable chaining
    
    def body(self, content: str):
        self._body = content
        return self
    
    def timeout(self, seconds: int):
        self._timeout = seconds
        return self
    
    def auth(self, token: str):
        self._auth = token
        return self
    
    def build(self) -> HttpRequest:
        return HttpRequest(
            self._method, self._url, self._headers,
            self._body, self._timeout, self._auth
        )

# Fluent API - reads like English
request = (HttpRequestBuilder("POST", "/api/users")
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .body('{"name": "Alice"}')
    .auth("Bearer token123")
    .timeout(60)
    .build())
\`\`\`

**Real-World Examples**:
- \`StringBuilder\` in Java
- ORM query builders
- Test data builders

---

## Abstract Factory

> **Create families of related objects without specifying classes.**

**Use When**: System needs to work with multiple product families.

\`\`\`python
# Abstract products
class Button(ABC):
    @abstractmethod
    def render(self): pass

class Checkbox(ABC):
    @abstractmethod
    def render(self): pass

# Concrete products - Windows family
class WindowsButton(Button):
    def render(self): return "[Windows Button]"

class WindowsCheckbox(Checkbox):
    def render(self): return "[X] Windows Checkbox"

# Concrete products - Mac family
class MacButton(Button):
    def render(self): return "(Mac Button)"

class MacCheckbox(Checkbox):
    def render(self): return "☑ Mac Checkbox"

# Abstract factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

# Concrete factories
class WindowsFactory(GUIFactory):
    def create_button(self): return WindowsButton()
    def create_checkbox(self): return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self): return MacButton()
    def create_checkbox(self): return MacCheckbox()

# Client code works with any factory
def create_ui(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()
    return f"{button.render()} {checkbox.render()}"

# Usage
os_type = "mac"
factory = MacFactory() if os_type == "mac" else WindowsFactory()
print(create_ui(factory))
\`\`\`

---

## Pattern Comparison

| Pattern | Intent | When to Use |
|---------|--------|-------------|
| **Factory Method** | Single product type | Runtime type selection |
| **Abstract Factory** | Product families | Cross-platform UI, themes |
| **Builder** | Complex construction | Many optional params |
| **Singleton** | One instance | Config, connection pools |
| **Prototype** | Clone objects | Expensive to create |

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between Factory and Abstract Factory?"
2. "When would you use Builder vs constructor parameters?"
3. "What are the downsides of Singleton?"

**Key Talking Points**:
- Factory encapsulates the "new" keyword
- Builder prevents telescoping constructors
- Singleton should be used sparingly (prefer DI)

**Red Flags**:
- Can't explain why Singleton is problematic
- Using Builder for simple objects
- Confusing Factory Method with Abstract Factory

---

## Key Takeaways

✅ **Factory**: Encapsulate object creation decisions  
✅ **Abstract Factory**: Create families of related objects  
✅ **Builder**: Fluent API for complex objects  
✅ **Singleton**: Use sparingly, prefer DI  
✅ Creational patterns make code **flexible** and **testable**
`,
    },

    'step-1-5-3': {
        title: 'Structural Patterns',
        content: `# Structural Design Patterns

## Why This Matters

Structural patterns solve the **"how do I compose objects?"** problem:

- **Compose** objects into larger structures
- **Adapt** incompatible interfaces
- **Simplify** complex subsystems
- Add **responsibilities** without subclassing

---

## Pattern Overview

\`\`\`mermaid
flowchart LR
    subgraph structural["Structural Patterns"]
        A["Adapter"]
        D["Decorator"]
        F["Facade"]
        P["Proxy"]
        C["Composite"]
    end
    A --> |"wraps"| D
    D --> |"simplifies"| F
    F --> |"controls"| P
\`\`\`

---

## Adapter ⭐

> **Convert one interface into another clients expect.**

**Use When**: Integrating legacy code, third-party libraries, or incompatible APIs.

\`\`\`python
# Legacy payment processor (can't modify)
class LegacyPaymentProcessor:
    def make_payment(self, amount_cents: int, card_number: str):
        print(f"Legacy payment: {amount_cents} cents from {card_number}")
        return {"status": "success", "cents": amount_cents}

# New interface we want
class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount_dollars: float, card: dict) -> bool:
        pass

# Adapter bridges the gap
class LegacyPaymentAdapter(PaymentGateway):
    def __init__(self, legacy: LegacyPaymentProcessor):
        self._legacy = legacy
    
    def charge(self, amount_dollars: float, card: dict) -> bool:
        # Convert dollars to cents, extract card number
        cents = int(amount_dollars * 100)
        result = self._legacy.make_payment(cents, card["number"])
        return result["status"] == "success"

# Usage - client uses new interface
legacy = LegacyPaymentProcessor()
gateway = LegacyPaymentAdapter(legacy)
gateway.charge(19.99, {"number": "4111-1111-1111-1111"})
\`\`\`

**Real-World Examples**:
- \`java.util.Arrays.asList()\` - adapts array to List
- Database driver adapters
- REST to GraphQL adapters

---

## Decorator ⭐

> **Add behavior dynamically without subclassing.**

**Use When**: Adding optional features, logging, caching, or validation.

\`\`\`python
# Base component
class DataSource(ABC):
    @abstractmethod
    def read(self) -> str: pass
    @abstractmethod
    def write(self, data: str): pass

class FileDataSource(DataSource):
    def __init__(self, filename):
        self.filename = filename
    
    def read(self):
        with open(self.filename) as f:
            return f.read()
    
    def write(self, data):
        with open(self.filename, 'w') as f:
            f.write(data)

# Base decorator
class DataSourceDecorator(DataSource):
    def __init__(self, source: DataSource):
        self._source = source
    
    def read(self):
        return self._source.read()
    
    def write(self, data):
        self._source.write(data)

# Encryption decorator
class EncryptionDecorator(DataSourceDecorator):
    def read(self):
        data = self._source.read()
        return self._decrypt(data)
    
    def write(self, data):
        encrypted = self._encrypt(data)
        self._source.write(encrypted)
    
    def _encrypt(self, data): return f"encrypted({data})"
    def _decrypt(self, data): return data[10:-1]  # Remove wrapper

# Compression decorator
class CompressionDecorator(DataSourceDecorator):
    def read(self):
        data = self._source.read()
        return self._decompress(data)
    
    def write(self, data):
        compressed = self._compress(data)
        self._source.write(compressed)
    
    def _compress(self, data): return f"compressed({data})"
    def _decompress(self, data): return data[11:-1]

# Stack decorators!
source = FileDataSource("data.txt")
source = CompressionDecorator(source)
source = EncryptionDecorator(source)
source.write("secret data")  # Encrypted then compressed
\`\`\`

**Python Connection**: Python's \`@decorator\` syntax uses this pattern!

\`\`\`python
# Python decorators are the same concept
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def greet(name):
    return f"Hello, {name}"
\`\`\`

---

## Facade

> **Provide a simplified interface to a complex subsystem.**

**Use When**: Hiding complexity from clients, creating library APIs.

\`\`\`python
# Complex subsystem classes
class VideoFile:
    def __init__(self, filename): self.filename = filename

class CodecFactory:
    def extract(self, file): return f"codec_for_{file.filename}"

class Compressor:
    def compress(self, codec, file): return f"compressed_{file.filename}"

class BitrateReader:
    def read(self, file): return 1000

class AudioMixer:
    def fix(self, result): return f"audio_fixed_{result}"

# Facade simplifies everything
class VideoConverter:
    def convert(self, filename: str, format: str) -> str:
        file = VideoFile(filename)
        codec = CodecFactory().extract(file)
        compressed = Compressor().compress(codec, file)
        bitrate = BitrateReader().read(file)
        result = AudioMixer().fix(compressed)
        return f"Converted {filename} to {format} at {bitrate}kbps"

# Client uses simple interface
converter = VideoConverter()
result = converter.convert("video.mp4", "avi")
print(result)
\`\`\`

**Real-World Examples**:
- jQuery (\`$\`) - facade over DOM manipulation
- \`requests\` library - facade over urllib
- SDK wrappers for APIs

---

## Proxy

> **Control access to another object.**

**Use When**: Lazy loading, caching, access control, logging.

\`\`\`python
# Subject interface
class Database(ABC):
    @abstractmethod
    def query(self, sql: str): pass

# Real subject (expensive to create)
class RealDatabase(Database):
    def __init__(self):
        print("Connecting to database...")  # Expensive!
        time.sleep(2)
    
    def query(self, sql):
        return f"Result of: {sql}"

# Proxy with lazy loading + caching
class DatabaseProxy(Database):
    def __init__(self):
        self._db = None  # Lazy initialization
        self._cache = {}
    
    def query(self, sql):
        # Lazy loading
        if self._db is None:
            self._db = RealDatabase()
        
        # Caching
        if sql in self._cache:
            print("Cache hit!")
            return self._cache[sql]
        
        result = self._db.query(sql)
        self._cache[sql] = result
        return result

# Usage - connection only made when needed
db = DatabaseProxy()  # No connection yet!
# ... later
result1 = db.query("SELECT * FROM users")  # Now connects
result2 = db.query("SELECT * FROM users")  # Cache hit!
\`\`\`

**Proxy Types**:
| Type | Purpose |
|------|---------|
| Virtual | Lazy loading expensive objects |
| Protection | Access control |
| Caching | Store results |
| Logging | Track operations |

---

## Composite

> **Treat individual objects and compositions uniformly.**

**Use When**: Tree structures, file systems, UI hierarchies.

\`\`\`python
class FileSystemItem(ABC):
    @abstractmethod
    def get_size(self) -> int: pass
    @abstractmethod
    def get_name(self) -> str: pass

class File(FileSystemItem):
    def __init__(self, name: str, size: int):
        self._name = name
        self._size = size
    
    def get_size(self): return self._size
    def get_name(self): return self._name

class Folder(FileSystemItem):
    def __init__(self, name: str):
        self._name = name
        self._children = []
    
    def add(self, item: FileSystemItem):
        self._children.append(item)
    
    def get_size(self):
        return sum(child.get_size() for child in self._children)
    
    def get_name(self): return self._name

# Usage - uniform interface
root = Folder("root")
docs = Folder("docs")
docs.add(File("readme.txt", 100))
docs.add(File("guide.pdf", 5000))
root.add(docs)
root.add(File("config.json", 50))

print(root.get_size())  # 5150 - calculates recursively
\`\`\`

---

## Pattern Comparison

| Pattern | Intent | Real Example |
|---------|--------|--------------|
| **Adapter** | Convert interface | Payment gateway integration |
| **Decorator** | Add behavior | Logging, caching wrappers |
| **Facade** | Simplify complex system | SDK libraries |
| **Proxy** | Control access | Lazy loading, caching |
| **Composite** | Tree structures | File system, DOM |

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between Adapter and Decorator?"
2. "When would you use a Proxy vs a Decorator?"
3. "Give an example of Facade in a real system"

**Key Talking Points**:
- Adapter: changes interface, Decorator: adds behavior
- Proxy: same interface, controls access
- Facade: simplifies, doesn't add functionality

**Red Flags**:
- Confusing Adapter with Decorator
- Can't give real-world examples
- Not understanding when to use each

---

## Key Takeaways

✅ **Adapter**: Bridge incompatible interfaces  
✅ **Decorator**: Wrap to add behavior dynamically  
✅ **Facade**: Simplify complex subsystems  
✅ **Proxy**: Control access with same interface  
✅ **Composite**: Uniform treatment of trees  
✅ All about **composition over inheritance**!
`,
    },

    'step-1-5-4': {
        title: 'Behavioral Patterns',
        content: `# Behavioral Design Patterns

## Why This Matters

Behavioral patterns solve the **"how do objects communicate?"** problem:

- Manage **algorithms** and **responsibilities**
- Enable **loose coupling** between objects
- Support **undo/redo**, **event systems**, and **workflows**
- Make behavior **interchangeable** at runtime

---

## Pattern Overview

\`\`\`mermaid
flowchart LR
    subgraph behavioral["Behavioral Patterns"]
        O["Observer"]
        S["Strategy"]
        C["Command"]
        T["Template Method"]
        ST["State"]
    end
    O --> |"events"| S
    S --> |"encapsulate"| C
    C --> |"skeleton"| T
\`\`\`

---

## Observer ⭐ (Pub/Sub)

> **Define a one-to-many dependency between objects.**

**Use When**: Event systems, UI updates, notifications, reactive programming.

\`\`\`python
from abc import ABC, abstractmethod
from typing import List

class EventManager:
    def __init__(self):
        self._listeners: dict[str, List] = {}
    
    def subscribe(self, event_type: str, listener):
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(listener)
    
    def unsubscribe(self, event_type: str, listener):
        self._listeners[event_type].remove(listener)
    
    def notify(self, event_type: str, data):
        for listener in self._listeners.get(event_type, []):
            listener.update(data)

class StockPriceObserver(ABC):
    @abstractmethod
    def update(self, price: float): pass

class EmailAlert(StockPriceObserver):
    def __init__(self, email: str, threshold: float):
        self.email = email
        self.threshold = threshold
    
    def update(self, price: float):
        if price < self.threshold:
            print(f"📧 Alert to {self.email}: Price dropped to {price}")

class Dashboard(StockPriceObserver):
    def update(self, price: float):
        print(f"📊 Dashboard updated: {price}")

# Usage
events = EventManager()
events.subscribe("price_change", EmailAlert("alice@email.com", 100))
events.subscribe("price_change", Dashboard())

events.notify("price_change", 95.50)
# 📧 Alert to alice@email.com: Price dropped to 95.5
# 📊 Dashboard updated: 95.5
\`\`\`

**Real-World Examples**:
- DOM event listeners
- React/Vue reactivity
- Message queues (RabbitMQ, Kafka)

---

## Strategy ⭐

> **Define a family of algorithms, make them interchangeable.**

**Use When**: Multiple ways to perform an action, algorithm selection at runtime.

\`\`\`python
class CompressionStrategy(ABC):
    @abstractmethod
    def compress(self, data: bytes) -> bytes: pass
    @abstractmethod
    def decompress(self, data: bytes) -> bytes: pass

class ZipCompression(CompressionStrategy):
    def compress(self, data):
        print("Compressing with ZIP")
        return b"zip:" + data
    
    def decompress(self, data):
        return data[4:]

class GzipCompression(CompressionStrategy):
    def compress(self, data):
        print("Compressing with GZIP")
        return b"gzip:" + data
    
    def decompress(self, data):
        return data[5:]

class NoCompression(CompressionStrategy):
    def compress(self, data): return data
    def decompress(self, data): return data

class FileProcessor:
    def __init__(self, strategy: CompressionStrategy):
        self._strategy = strategy
    
    def set_strategy(self, strategy: CompressionStrategy):
        self._strategy = strategy
    
    def process(self, data: bytes) -> bytes:
        return self._strategy.compress(data)

# Usage - swap algorithms at runtime
processor = FileProcessor(ZipCompression())
result = processor.process(b"hello world")

# Switch to GZIP for larger files
processor.set_strategy(GzipCompression())
result = processor.process(b"large data...")
\`\`\`

**Pro Tip**: In Python, you can use functions as strategies!

\`\`\`python
def sort_by_price(product): return product.price
def sort_by_name(product): return product.name

products.sort(key=sort_by_price)  # Strategy as function
\`\`\`

---

## Command ⭐

> **Encapsulate a request as an object.**

**Use When**: Undo/redo, queuing operations, macro recording, transaction logging.

\`\`\`python
class Command(ABC):
    @abstractmethod
    def execute(self): pass
    
    @abstractmethod
    def undo(self): pass

class TextEditor:
    def __init__(self):
        self.text = ""
    
    def insert(self, text: str, position: int):
        self.text = self.text[:position] + text + self.text[position:]
    
    def delete(self, start: int, length: int):
        self.text = self.text[:start] + self.text[start + length:]

class InsertCommand(Command):
    def __init__(self, editor: TextEditor, text: str, position: int):
        self.editor = editor
        self.text = text
        self.position = position
    
    def execute(self):
        self.editor.insert(self.text, self.position)
    
    def undo(self):
        self.editor.delete(self.position, len(self.text))

class CommandHistory:
    def __init__(self):
        self._history = []
        self._redo_stack = []
    
    def execute(self, command: Command):
        command.execute()
        self._history.append(command)
        self._redo_stack.clear()
    
    def undo(self):
        if self._history:
            command = self._history.pop()
            command.undo()
            self._redo_stack.append(command)
    
    def redo(self):
        if self._redo_stack:
            command = self._redo_stack.pop()
            command.execute()
            self._history.append(command)

# Usage
editor = TextEditor()
history = CommandHistory()

history.execute(InsertCommand(editor, "Hello", 0))
history.execute(InsertCommand(editor, " World", 5))
print(editor.text)  # "Hello World"

history.undo()
print(editor.text)  # "Hello"

history.redo()
print(editor.text)  # "Hello World"
\`\`\`

**Real-World Examples**:
- Text editor undo/redo
- Database transactions
- GUI button actions

---

## Template Method

> **Define the skeleton of an algorithm, defer steps to subclasses.**

**Use When**: Similar algorithms with small variations, framework hooks.

\`\`\`python
class DataMiningPipeline(ABC):
    def run(self):
        """Template method - fixed algorithm structure"""
        data = self.extract()
        processed = self.transform(data)
        self.load(processed)
        self.report()
    
    @abstractmethod
    def extract(self): pass
    
    @abstractmethod
    def transform(self, data): pass
    
    def load(self, data):
        print(f"Loading {len(data)} records to warehouse")
    
    def report(self):
        print("Pipeline complete!")

class CSVMiningPipeline(DataMiningPipeline):
    def extract(self):
        print("Extracting from CSV files...")
        return [{"id": 1}, {"id": 2}]
    
    def transform(self, data):
        print("Transforming CSV data...")
        return [{"id": d["id"], "source": "csv"} for d in data]

class APIMiningPipeline(DataMiningPipeline):
    def extract(self):
        print("Fetching from API...")
        return [{"id": 3}, {"id": 4}]
    
    def transform(self, data):
        print("Transforming API response...")
        return [{"id": d["id"], "source": "api"} for d in data]

# Usage
csv_pipeline = CSVMiningPipeline()
csv_pipeline.run()

api_pipeline = APIMiningPipeline()
api_pipeline.run()
\`\`\`

**Real-World Examples**:
- Django/Flask request handling
- Test frameworks (setUp/tearDown)
- Build systems

---

## State

> **Allow an object to alter behavior when internal state changes.**

**Use When**: Object behavior depends on state, state machines, workflow engines.

\`\`\`python
class OrderState(ABC):
    @abstractmethod
    def next(self, order): pass
    @abstractmethod
    def cancel(self, order): pass
    @abstractmethod
    def get_status(self) -> str: pass

class PendingState(OrderState):
    def next(self, order):
        print("Order confirmed! Processing payment...")
        order.state = ProcessingState()
    
    def cancel(self, order):
        print("Order cancelled.")
        order.state = CancelledState()
    
    def get_status(self): return "PENDING"

class ProcessingState(OrderState):
    def next(self, order):
        print("Payment complete! Shipping...")
        order.state = ShippedState()
    
    def cancel(self, order):
        print("Refunding...")
        order.state = CancelledState()
    
    def get_status(self): return "PROCESSING"

class ShippedState(OrderState):
    def next(self, order):
        print("Order delivered!")
        order.state = DeliveredState()
    
    def cancel(self, order):
        print("Cannot cancel shipped order")
    
    def get_status(self): return "SHIPPED"

class Order:
    def __init__(self):
        self.state = PendingState()
    
    def next(self): self.state.next(self)
    def cancel(self): self.state.cancel(self)
    def get_status(self): return self.state.get_status()

# Usage
order = Order()
print(order.get_status())  # PENDING
order.next()               # Order confirmed!
print(order.get_status())  # PROCESSING
order.next()               # Shipping...
print(order.get_status())  # SHIPPED
\`\`\`

---

## Pattern Comparison

| Pattern | Intent | When to Use |
|---------|--------|-------------|
| **Observer** | Broadcast events | Pub/sub, UI updates |
| **Strategy** | Swap algorithms | Multiple implementations |
| **Command** | Encapsulate requests | Undo/redo, queues |
| **Template** | Algorithm skeleton | Framework hooks |
| **State** | State-dependent behavior | State machines |

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between Strategy and Command?"
2. "When would you use Observer vs callbacks?"
3. "Give an example of Template Method in frameworks"

**Key Talking Points**:
- Strategy: what algorithm to use
- Command: when and how to execute
- Observer: decouples publishers from subscribers
- Template: inversion of control (framework calls you)

**Red Flags**:
- Confusing Strategy with Command
- Can't explain pub/sub pattern
- Not understanding Template Method's "Hollywood Principle"

---

## Key Takeaways

✅ **Observer**: One-to-many notification (pub/sub)  
✅ **Strategy**: Interchangeable algorithms  
✅ **Command**: Encapsulate, queue, undo actions  
✅ **Template**: Fixed skeleton, variable steps  
✅ **State**: Behavior changes with state  
✅ Behavioral patterns enable **loose coupling** and **flexibility**!
`,
    },
};

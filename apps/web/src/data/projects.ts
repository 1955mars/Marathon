/**
 * Marathon Projects - Guided Implementation Projects
 * 12 core projects covering all curriculum topics
 */

export interface ProjectStep {
    id: string;
    title: string;
    description: string;
    concepts: string[];
    code: {
        python?: string;
        cpp?: string;
    };
    explanation: string;
    tips: string[];
}

export interface Project {
    id: string;
    title: string;
    act: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    estimatedHours: number;
    description: string;
    learningOutcomes: string[];
    prerequisites: string[];
    technologies: string[];
    steps: ProjectStep[];
}

export const PROJECTS: Project[] = [
    // ============ ACT 1: FOUNDATIONS ============
    {
        id: "custom-hashmap",
        title: "Build Your Own HashMap",
        act: 1,
        difficulty: "Beginner",
        estimatedHours: 6,
        description: "Implement a hash map from scratch with collision handling, dynamic resizing, and common operations like get, put, and delete.",
        learningOutcomes: [
            "Understand hash functions and collision resolution",
            "Implement separate chaining and open addressing",
            "Analyze time complexity of hash table operations",
            "Handle dynamic resizing and load factors",
        ],
        prerequisites: ["Arrays", "Linked Lists basics"],
        technologies: ["Python", "C++"],
        steps: [
            {
                id: "step-1",
                title: "Understanding Hash Functions",
                description: "Learn what hash functions are and how they map keys to indices.",
                concepts: ["Hash function", "Modulo operation", "Uniform distribution"],
                code: {
                    python: `class HashMap:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """Simple hash function using Python's built-in hash."""
        return hash(key) % self.capacity
    
    def _hash_custom(self, key):
        """Custom hash for strings - djb2 algorithm."""
        if isinstance(key, str):
            h = 5381
            for char in key:
                h = ((h << 5) + h) + ord(char)
            return h % self.capacity
        return hash(key) % self.capacity

# Test it
hm = HashMap()
print(f"Hash of 'hello': {hm._hash('hello')}")
print(f"Hash of 42: {hm._hash(42)}")`,
                    cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

class HashMap {
private:
    int capacity;
    int size;
    vector<pair<string, int>*> buckets;
    
    int hash(const string& key) {
        // djb2 hash algorithm
        unsigned long h = 5381;
        for (char c : key) {
            h = ((h << 5) + h) + c;
        }
        return h % capacity;
    }

public:
    HashMap(int cap = 16) : capacity(cap), size(0) {
        buckets.resize(capacity, nullptr);
    }
};

int main() {
    HashMap hm;
    cout << "HashMap initialized with capacity 16" << endl;
    return 0;
}`,
                },
                explanation: `A hash function converts any key into an array index. Good hash functions:
1. **Deterministic**: Same key always produces same hash
2. **Uniform**: Distributes keys evenly across buckets
3. **Fast**: O(1) time complexity

The djb2 algorithm is a classic string hash that uses bit shifting for speed.`,
                tips: [
                    "Use modulo to keep the hash within array bounds",
                    "Consider using prime numbers for capacity to reduce collisions",
                    "Python's built-in hash() is robust but not stable across runs",
                ],
            },
            {
                id: "step-2",
                title: "Implementing Put and Get",
                description: "Add the core methods to insert and retrieve key-value pairs.",
                concepts: ["Key-value storage", "Collision handling", "Separate chaining"],
                code: {
                    python: `class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class HashMap:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def put(self, key, value):
        """Insert or update a key-value pair."""
        index = self._hash(key)
        node = self.buckets[index]
        
        # Check if key already exists
        while node:
            if node.key == key:
                node.value = value  # Update
                return
            node = node.next
        
        # Insert new node at head
        new_node = Node(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
    
    def get(self, key):
        """Retrieve value by key, returns None if not found."""
        index = self._hash(key)
        node = self.buckets[index]
        
        while node:
            if node.key == key:
                return node.value
            node = node.next
        return None

# Test
hm = HashMap()
hm.put("name", "Alice")
hm.put("age", 25)
print(f"name: {hm.get('name')}")  # Alice
print(f"age: {hm.get('age')}")    # 25
print(f"city: {hm.get('city')}")  # None`,
                },
                explanation: `We use **separate chaining** for collision handling - each bucket contains a linked list. When multiple keys hash to the same index, we add them to the chain.

**Time Complexity:**
- Average case: O(1) for both put and get
- Worst case: O(n) if all keys hash to the same bucket`,
                tips: [
                    "Always check if key exists before inserting",
                    "Insert at the head of the chain for O(1) insertion",
                    "Consider resizing when load factor exceeds threshold",
                ],
            },
            {
                id: "step-3",
                title: "Dynamic Resizing",
                description: "Implement automatic resizing when the load factor exceeds a threshold.",
                concepts: ["Load factor", "Rehashing", "Amortized analysis"],
                code: {
                    python: `class HashMap:
    LOAD_FACTOR_THRESHOLD = 0.75
    
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def _resize(self):
        """Double capacity and rehash all entries."""
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        
        for node in old_buckets:
            while node:
                self.put(node.key, node.value)
                node = node.next
    
    def put(self, key, value):
        # Check load factor
        if self.size / self.capacity >= self.LOAD_FACTOR_THRESHOLD:
            self._resize()
        
        index = self._hash(key)
        node = self.buckets[index]
        
        while node:
            if node.key == key:
                node.value = value
                return
            node = node.next
        
        new_node = Node(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1

# Test resize
hm = HashMap(4)  # Start small
for i in range(20):
    hm.put(f"key{i}", i)
print(f"Size: {hm.size}, Capacity: {hm.capacity}")  # Size: 20, Capacity: 32`,
                },
                explanation: `**Load Factor** = size / capacity. When it exceeds 0.75, collisions become too frequent.

**Resizing Process:**
1. Create new array with 2x capacity
2. Rehash ALL existing entries (they may go to different buckets)
3. This is O(n), but happens rarely - **amortized O(1)**`,
                tips: [
                    "0.75 is the standard load factor threshold (Java uses this)",
                    "Always double the capacity (not +1) for amortized O(1)",
                    "Consider shrinking when load factor drops below 0.25",
                ],
            },
        ],
    },

    // ============ ACT 2: ALGORITHMS ============
    {
        id: "graph-algorithms",
        title: "Graph Algorithm Visualizer",
        act: 2,
        difficulty: "Intermediate",
        estimatedHours: 10,
        description: "Build a graph library implementing BFS, DFS, Dijkstra's shortest path, and topological sort with step-by-step visualization.",
        learningOutcomes: [
            "Implement graph representations (adjacency list/matrix)",
            "Master BFS and DFS traversals",
            "Understand shortest path algorithms",
            "Apply topological sorting for DAGs",
        ],
        prerequisites: ["Queues", "Stacks", "Basic recursion"],
        technologies: ["Python", "C++"],
        steps: [
            {
                id: "step-1",
                title: "Graph Representation",
                description: "Implement adjacency list representation for weighted and unweighted graphs.",
                concepts: ["Adjacency list", "Adjacency matrix", "Directed vs undirected"],
                code: {
                    python: `from collections import defaultdict

class Graph:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
    
    def add_edge(self, u, v, weight=1):
        """Add an edge from u to v."""
        self.graph[u].append((v, weight))
        if not self.directed:
            self.graph[v].append((u, weight))
    
    def get_neighbors(self, node):
        """Get all neighbors of a node."""
        return self.graph[node]
    
    def __str__(self):
        result = []
        for node, neighbors in self.graph.items():
            edges = ", ".join(f"{v}(w={w})" for v, w in neighbors)
            result.append(f"{node} -> [{edges}]")
        return "\\n".join(result)

# Build a sample graph
g = Graph()
g.add_edge("A", "B", 4)
g.add_edge("A", "C", 2)
g.add_edge("B", "C", 1)
g.add_edge("B", "D", 5)
g.add_edge("C", "D", 8)
print(g)`,
                },
                explanation: `**Adjacency List** stores a list of neighbors for each node. It's space-efficient O(V + E) and ideal for sparse graphs.

**When to use what:**
- Adjacency List: Most real-world graphs (social networks, roads)
- Adjacency Matrix: Dense graphs, need fast edge lookup`,
                tips: [
                    "Use defaultdict(list) to avoid KeyError for new nodes",
                    "Store weights as tuples: (neighbor, weight)",
                    "Consider using sets for O(1) edge existence checks",
                ],
            },
            {
                id: "step-2",
                title: "BFS and DFS Traversals",
                description: "Implement breadth-first and depth-first search with path tracking.",
                concepts: ["Queue-based BFS", "Stack/recursion DFS", "Visited set"],
                code: {
                    python: `from collections import deque

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
        self.graph[v].append(u)
    
    def bfs(self, start):
        """Breadth-First Search - level by level."""
        visited = set([start])
        queue = deque([start])
        order = []
        
        while queue:
            node = queue.popleft()
            order.append(node)
            
            for neighbor, _ in self.graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return order
    
    def dfs(self, start, visited=None):
        """Depth-First Search - go deep first."""
        if visited is None:
            visited = set()
        
        visited.add(start)
        order = [start]
        
        for neighbor, _ in self.graph[start]:
            if neighbor not in visited:
                order.extend(self.dfs(neighbor, visited))
        
        return order

# Test
g = Graph()
for edge in [("A","B"), ("A","C"), ("B","D"), ("C","D"), ("D","E")]:
    g.add_edge(*edge)

print(f"BFS from A: {g.bfs('A')}")  # Level order
print(f"DFS from A: {g.dfs('A')}")  # Deep first`,
                },
                explanation: `**BFS** uses a queue - explores all neighbors at current depth before going deeper. Great for shortest path in unweighted graphs.

**DFS** uses recursion (implicit stack) - goes as deep as possible before backtracking. Great for detecting cycles, topological sort.`,
                tips: [
                    "BFS guarantees shortest path in unweighted graphs",
                    "DFS uses less memory than BFS for deep graphs",
                    "Always track visited nodes to avoid infinite loops",
                ],
            },
        ],
    },

    // ============ ACT 3: SYSTEMS ============
    {
        id: "memory-allocator",
        title: "Custom Memory Allocator",
        act: 3,
        difficulty: "Advanced",
        estimatedHours: 12,
        description: "Build a memory allocator implementing malloc, free, and realloc with different allocation strategies.",
        learningOutcomes: [
            "Understand memory layout and heap management",
            "Implement first-fit, best-fit, and worst-fit strategies",
            "Handle memory fragmentation",
            "Debug memory leaks and corruption",
        ],
        prerequisites: ["Pointers", "C/C++ memory model", "Linked lists"],
        technologies: ["C++"],
        steps: [
            {
                id: "step-1",
                title: "Memory Block Structure",
                description: "Design the block header and footer for tracking allocations.",
                concepts: ["Block headers", "Free list", "Coalescing"],
                code: {
                    cpp: `#include <iostream>
#include <cstdint>
using namespace std;

// Block header - metadata for each allocated block
struct BlockHeader {
    size_t size;        // Size of the block (including header)
    bool is_free;       // Is this block free?
    BlockHeader* next;  // Next block in free list
    BlockHeader* prev;  // Previous block in free list
};

class MemoryAllocator {
private:
    static const size_t HEAP_SIZE = 1024 * 1024;  // 1MB heap
    uint8_t heap[HEAP_SIZE];
    BlockHeader* free_list;

public:
    MemoryAllocator() {
        // Initialize entire heap as one free block
        free_list = reinterpret_cast<BlockHeader*>(heap);
        free_list->size = HEAP_SIZE;
        free_list->is_free = true;
        free_list->next = nullptr;
        free_list->prev = nullptr;
    }
    
    void print_free_list() {
        BlockHeader* current = free_list;
        cout << "Free List: ";
        while (current) {
            cout << "[" << current->size << " bytes] -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    MemoryAllocator allocator;
    allocator.print_free_list();
    return 0;
}`,
                },
                explanation: `Every memory block has a **header** containing metadata:
- **size**: Total bytes including the header itself
- **is_free**: Whether this block is available
- **next/prev**: Pointers for the free list doubly-linked list

The **free list** tracks all available memory blocks.`,
                tips: [
                    "Header size affects minimum allocation size",
                    "Use alignment (8 or 16 bytes) for performance",
                    "Consider adding a footer for easier coalescing",
                ],
            },
        ],
    },

    // ============ ACT 4: SYSTEM DESIGN ============
    {
        id: "distributed-cache",
        title: "Distributed Cache (Mini Redis)",
        act: 4,
        difficulty: "Advanced",
        estimatedHours: 15,
        description: "Build a Redis-like in-memory cache with TTL, eviction policies, and basic replication.",
        learningOutcomes: [
            "Implement LRU and LFU eviction policies",
            "Handle time-to-live (TTL) for cache entries",
            "Design cache invalidation strategies",
            "Understand consistency vs availability tradeoffs",
        ],
        prerequisites: ["Hash tables", "Linked lists", "Basic networking"],
        technologies: ["Python"],
        steps: [
            {
                id: "step-1",
                title: "LRU Cache Implementation",
                description: "Build a Least Recently Used cache with O(1) operations.",
                concepts: ["LRU eviction", "OrderedDict", "Doubly linked list + hashmap"],
                code: {
                    python: `from collections import OrderedDict
import time

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()  # Key -> (value, expiry_time)
    
    def get(self, key: str):
        """Get item and move to end (most recent)."""
        if key not in self.cache:
            return None
        
        value, expiry = self.cache[key]
        
        # Check TTL
        if expiry and time.time() > expiry:
            del self.cache[key]
            return None
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return value
    
    def put(self, key: str, value, ttl_seconds: int = None):
        """Insert/update item with optional TTL."""
        expiry = time.time() + ttl_seconds if ttl_seconds else None
        
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = (value, expiry)
        
        # Evict if over capacity
        while len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest
    
    def delete(self, key: str):
        if key in self.cache:
            del self.cache[key]
            return True
        return False

# Test
cache = LRUCache(3)
cache.put("a", 1)
cache.put("b", 2)
cache.put("c", 3)
cache.get("a")      # Access 'a' - now most recent
cache.put("d", 4)   # Evicts 'b' (least recent)
print(f"a: {cache.get('a')}")  # 1
print(f"b: {cache.get('b')}")  # None (evicted)`,
                },
                explanation: `**LRU Cache** evicts the least recently used item when at capacity.

**Implementation using OrderedDict:**
- get(): Move key to end, return value
- put(): Add/update key, evict from front if needed

**Time Complexity:** O(1) for all operations!`,
                tips: [
                    "Python's OrderedDict has move_to_end() for O(1) LRU",
                    "For interviews, implement with HashMap + Doubly Linked List",
                    "TTL cleanup can be lazy (on get) or active (background thread)",
                ],
            },
        ],
    },
];

// Helper functions
export function getProjectById(id: string): Project | undefined {
    return PROJECTS.find((p) => p.id === id);
}

export function getProjectsByAct(act: number): Project[] {
    return PROJECTS.filter((p) => p.act === act);
}

export function getAllProjects(): Project[] {
    return PROJECTS;
}

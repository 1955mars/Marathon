/**
 * Marathon Projects - Complete Guided Implementation Projects
 * 4 projects with detailed inline comments and explanations
 */

import { memoryAllocatorProject, lruCacheProject } from "./projects-additional";
import { miniShellProject, httpServerProject } from "./projects-systems";
import { recursionProject, secureAuthProject } from "./projects-priority";
import { pythonToolkitProject, distributedKVProject, loadBalancerProject } from "./projects-extra";
import { cppFundamentalsProject, bitManipulationProject, dbQueryEngineProject, threadPoolProject, cicdPipelineProject } from "./projects-final";

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

// ============================================================
// PROJECT 1: HASHMAP (Already complete from before)
// ============================================================
const hashmapProject: Project = {
    id: "custom-hashmap",
    title: "Build Your Own HashMap",
    act: 1,
    difficulty: "Beginner",
    estimatedHours: 6,
    description: "Implement a hash map from scratch with collision handling, dynamic resizing, and common operations.",
    learningOutcomes: [
        "Understand hash functions and collision resolution",
        "Implement separate chaining",
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
                python: `# =====================================================
# STEP 1: Understanding Hash Functions
# =====================================================
# A hash function converts any key (string, number, etc.)
# into an array index where we store the value.
# =====================================================

class HashMap:
    def __init__(self, capacity=16):
        """
        Initialize HashMap with a fixed number of buckets.
        
        Args:
            capacity: Number of buckets (default 16, a power of 2
                     for efficient modulo operations)
        """
        self.capacity = capacity  # Total number of buckets
        self.size = 0             # Current items stored
        # Create empty buckets - each will hold a linked list
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """
        Convert any key into a valid array index (0 to capacity-1).
        
        How it works:
        1. Python's hash() converts key to a large integer
        2. Modulo (%) keeps it within our array bounds
        
        Example:
            hash("hello") = 1234567890
            1234567890 % 16 = 2  --> stored in bucket[2]
        """
        return hash(key) % self.capacity
    
    def _hash_djb2(self, key):
        """
        Custom hash function using the djb2 algorithm.
        One of the best string hash functions - fast & few collisions.
        """
        if isinstance(key, str):
            h = 5381  # Magic starting number
            for char in key:
                # h * 33 + char (bit shift is faster)
                h = ((h << 5) + h) + ord(char)
            return h % self.capacity
        return hash(key) % self.capacity


# =====================================================
# TEST: See how keys are distributed
# =====================================================
if __name__ == "__main__":
    hm = HashMap(capacity=8)
    
    test_keys = ["apple", "banana", "cherry", "date", "elderberry"]
    
    print("Key Distribution:")
    print("-" * 35)
    for key in test_keys:
        bucket = hm._hash(key)
        print(f"'{key}' --> bucket[{bucket}]")
    
    print("\\n💡 Different keys CAN map to same bucket (collision)!")`,

                cpp: `// =====================================================
// STEP 1: Understanding Hash Functions (C++)
// =====================================================

#include <iostream>
#include <string>
#include <vector>
using namespace std;

class HashMap {
private:
    int capacity;    // Total number of buckets
    int size;        // Current items stored
    vector<pair<string, int>*> buckets;
    
    // djb2 hash algorithm - fast and few collisions
    int hash(const string& key) {
        unsigned long h = 5381;  // Magic starting value
        for (char c : key) {
            // (h << 5) + h is same as h * 33
            h = ((h << 5) + h) + c;
        }
        return h % capacity;
    }

public:
    HashMap(int cap = 16) : capacity(cap), size(0) {
        buckets.resize(capacity, nullptr);
    }
    
    int getBucket(const string& key) {
        return hash(key);
    }
};

int main() {
    HashMap hm(8);
    vector<string> keys = {"apple", "banana", "cherry", "date"};
    
    cout << "Key Distribution:" << endl;
    for (const string& key : keys) {
        cout << "'" << key << "' --> bucket[" 
             << hm.getBucket(key) << "]" << endl;
    }
    return 0;
}`,
            },
            explanation: `## What is a Hash Function?

A hash function converts **any key** into an **array index**.

### Key Properties:
1. **Deterministic** - Same key = same hash
2. **Uniform Distribution** - Keys spread evenly
3. **Fast** - O(1) time

### The djb2 Algorithm
\`\`\`
hash = 5381
for each char: hash = hash * 33 + char
\`\`\`

Uses bit shifting for speed. The magic number 5381 works well empirically.`,
            tips: [
                "Use capacity as power of 2 for faster modulo",
                "Python's hash() changes between runs for security",
                "Prime capacities also reduce collisions",
            ],
        },
        {
            id: "step-2",
            title: "Implementing Put and Get",
            description: "Add the core methods to insert and retrieve key-value pairs with collision handling.",
            concepts: ["Key-value storage", "Collision handling", "Separate chaining"],
            code: {
                python: `# =====================================================
# STEP 2: Put and Get with Separate Chaining
# =====================================================
# When two keys hash to same bucket, chain them in a list
# Bucket[2]: ("apple", 5) -> ("grape", 8) -> None
# =====================================================

class Node:
    """Node in our linked list chain."""
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
        """
        Insert or update a key-value pair.
        Time: O(1) average, O(n) worst case
        """
        index = self._hash(key)
        node = self.buckets[index]
        
        # Search for existing key in chain
        while node is not None:
            if node.key == key:
                node.value = value  # Update existing
                return
            node = node.next
        
        # Insert new node at HEAD (O(1))
        new_node = Node(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
    
    def get(self, key):
        """Retrieve value by key. Returns None if not found."""
        index = self._hash(key)
        node = self.buckets[index]
        
        while node is not None:
            if node.key == key:
                return node.value
            node = node.next
        return None
    
    def delete(self, key):
        """Remove a key-value pair. Returns True if deleted."""
        index = self._hash(key)
        node = self.buckets[index]
        prev = None
        
        while node is not None:
            if node.key == key:
                if prev is None:
                    self.buckets[index] = node.next
                else:
                    prev.next = node.next
                self.size -= 1
                return True
            prev = node
            node = node.next
        return False


# TEST
if __name__ == "__main__":
    hm = HashMap(4)
    
    hm.put("name", "Alice")
    hm.put("age", 25)
    hm.put("city", "NYC")
    
    print(f"get('name') = {hm.get('name')}")  # Alice
    print(f"get('age')  = {hm.get('age')}")   # 25
    
    hm.put("age", 26)  # Update
    print(f"After update: get('age') = {hm.get('age')}")  # 26`,

                cpp: `// =====================================================
// STEP 2: Put and Get with Separate Chaining (C++)
// =====================================================

#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Node {
    string key;
    int value;
    Node* next;
    Node(string k, int v) : key(k), value(v), next(nullptr) {}
};

class HashMap {
private:
    int capacity, size;
    vector<Node*> buckets;
    
    int hash(const string& key) {
        unsigned long h = 5381;
        for (char c : key) h = ((h << 5) + h) + c;
        return h % capacity;
    }

public:
    HashMap(int cap = 16) : capacity(cap), size(0) {
        buckets.resize(capacity, nullptr);
    }
    
    void put(const string& key, int value) {
        int index = hash(key);
        Node* node = buckets[index];
        
        while (node) {
            if (node->key == key) {
                node->value = value;  // Update
                return;
            }
            node = node->next;
        }
        
        // Insert at head
        Node* newNode = new Node(key, value);
        newNode->next = buckets[index];
        buckets[index] = newNode;
        size++;
    }
    
    int get(const string& key) {
        int index = hash(key);
        Node* node = buckets[index];
        while (node) {
            if (node->key == key) return node->value;
            node = node->next;
        }
        return -1;
    }
};

int main() {
    HashMap hm(4);
    hm.put("age", 25);
    cout << "get('age') = " << hm.get("age") << endl;
    hm.put("age", 26);
    cout << "After update: " << hm.get("age") << endl;
    return 0;
}`,
            },
            explanation: `## Separate Chaining

When multiple keys hash to the same bucket, **chain** them in a linked list.

### Visual:
\`\`\`
Bucket[0]: None
Bucket[1]: ("apple", 5) -> ("grape", 8) -> None
Bucket[2]: ("banana", 3) -> None
\`\`\`

### Time Complexity:
| Operation | Average | Worst |
|-----------|---------|-------|
| put/get   | O(1)    | O(n)  |

Insert at **head** for O(1) insertion.`,
            tips: [
                "Always check if key exists before inserting",
                "Head insertion is O(1), tail would be O(n)",
                "In C++, delete nodes to avoid memory leaks",
            ],
        },
        {
            id: "step-3",
            title: "Dynamic Resizing",
            description: "Implement automatic resizing when the load factor exceeds a threshold.",
            concepts: ["Load factor", "Rehashing", "Amortized analysis"],
            code: {
                python: `# =====================================================
# STEP 3: Dynamic Resizing
# =====================================================
# Load Factor = size / capacity
# When > 0.75, DOUBLE capacity and REHASH all entries
# =====================================================

class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None


class HashMap:
    LOAD_FACTOR_THRESHOLD = 0.75
    
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def _load_factor(self):
        return self.size / self.capacity
    
    def _resize(self):
        """Double capacity and rehash ALL entries."""
        print(f"🔄 Resizing: {self.capacity} -> {self.capacity * 2}")
        
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        
        # Rehash every entry (they may go to different buckets)
        for bucket in old_buckets:
            node = bucket
            while node:
                self.put(node.key, node.value)
                node = node.next
    
    def put(self, key, value):
        # Check load factor BEFORE inserting
        if self._load_factor() >= self.LOAD_FACTOR_THRESHOLD:
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
    
    def get(self, key):
        index = self._hash(key)
        node = self.buckets[index]
        while node:
            if node.key == key:
                return node.value
            node = node.next
        return None


# TEST: Watch automatic resizing
if __name__ == "__main__":
    hm = HashMap(4)  # Start small
    
    print("Starting with capacity 4...")
    for i in range(12):
        hm.put(f"key{i}", i * 10)
    
    print(f"Final: size={hm.size}, capacity={hm.capacity}")`,

                cpp: `// =====================================================
// STEP 3: Dynamic Resizing (C++)
// =====================================================

#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Node {
    string key; int value; Node* next;
    Node(string k, int v) : key(k), value(v), next(nullptr) {}
};

class HashMap {
private:
    const double LOAD_THRESHOLD = 0.75;
    int capacity, size;
    vector<Node*> buckets;
    
    int hash(const string& key) {
        unsigned long h = 5381;
        for (char c : key) h = ((h << 5) + h) + c;
        return h % capacity;
    }
    
    void resize() {
        cout << "Resizing: " << capacity << " -> " << capacity*2 << endl;
        vector<Node*> old = buckets;
        capacity *= 2;
        buckets.assign(capacity, nullptr);
        size = 0;
        
        for (auto bucket : old) {
            Node* node = bucket;
            while (node) {
                put(node->key, node->value);
                node = node->next;
            }
        }
    }

public:
    HashMap(int cap = 16) : capacity(cap), size(0) {
        buckets.resize(capacity, nullptr);
    }
    
    void put(const string& key, int value) {
        if ((double)size / capacity >= LOAD_THRESHOLD) resize();
        
        int index = hash(key);
        Node* node = buckets[index];
        while (node) {
            if (node->key == key) { node->value = value; return; }
            node = node->next;
        }
        Node* newNode = new Node(key, value);
        newNode->next = buckets[index];
        buckets[index] = newNode;
        size++;
    }
    
    int getSize() { return size; }
    int getCap() { return capacity; }
};

int main() {
    HashMap hm(4);
    for (int i = 0; i < 12; i++) hm.put("key" + to_string(i), i);
    cout << "Final: size=" << hm.getSize() << ", cap=" << hm.getCap() << endl;
    return 0;
}`,
            },
            explanation: `## Dynamic Resizing

**Load Factor** = size / capacity

| Load Factor | Action |
|-------------|--------|
| < 0.75      | OK |
| ≥ 0.75      | **Resize!** |

### Resize Process:
1. Double capacity
2. Rehash ALL entries
3. Keys may move buckets!

### Amortized O(1)
Resize is O(n) but rare. Average = O(1).`,
            tips: [
                "0.75 is the industry standard threshold",
                "Always DOUBLE (not +1) for amortized O(1)",
                "Consider shrinking when < 0.25",
            ],
        },
    ],
};

// ============================================================
// PROJECT 2: GRAPH ALGORITHMS
// ============================================================
const graphProject: Project = {
    id: "graph-algorithms",
    title: "Graph Algorithm Visualizer",
    act: 2,
    difficulty: "Intermediate",
    estimatedHours: 10,
    description: "Build a graph library implementing BFS, DFS, Dijkstra's shortest path, and topological sort.",
    learningOutcomes: [
        "Implement graph representations (adjacency list)",
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
            concepts: ["Adjacency list", "Directed vs undirected", "Weighted edges"],
            code: {
                python: `# =====================================================
# STEP 1: Graph Representation - Adjacency List
# =====================================================
# An adjacency list stores neighbors for each vertex.
# Space efficient: O(V + E) vs O(V²) for matrix
# =====================================================

from collections import defaultdict

class Graph:
    def __init__(self, directed=False):
        """
        Initialize a graph.
        
        Args:
            directed: If True, edges are one-way.
                     If False, edges go both directions.
        """
        # defaultdict creates empty list for new keys automatically
        self.graph = defaultdict(list)
        self.directed = directed
    
    def add_edge(self, u, v, weight=1):
        """
        Add an edge from vertex u to vertex v.
        
        For undirected graphs, also adds edge from v to u.
        Weight defaults to 1 for unweighted graphs.
        """
        # Store as tuple: (neighbor, weight)
        self.graph[u].append((v, weight))
        
        if not self.directed:
            # Undirected: add reverse edge too
            self.graph[v].append((u, weight))
    
    def get_neighbors(self, vertex):
        """Get all neighbors of a vertex."""
        return self.graph[vertex]
    
    def get_vertices(self):
        """Get all vertices in the graph."""
        return list(self.graph.keys())
    
    def __str__(self):
        """Pretty print the graph structure."""
        result = []
        for vertex in sorted(self.graph.keys()):
            neighbors = self.graph[vertex]
            edges = ", ".join(f"{v}(w={w})" for v, w in neighbors)
            result.append(f"{vertex} -> [{edges}]")
        return "\\n".join(result)


# =====================================================
# TEST: Build and display a sample graph
# =====================================================
if __name__ == "__main__":
    # Create undirected weighted graph
    g = Graph(directed=False)
    
    # Add edges (creates this graph):
    #     A ---4--- B
    #     |         |
    #     2         1
    #     |         |
    #     C ---3--- D
    
    g.add_edge("A", "B", 4)
    g.add_edge("A", "C", 2)
    g.add_edge("B", "D", 1)
    g.add_edge("C", "D", 3)
    
    print("Graph Structure:")
    print(g)
    print()
    print(f"Neighbors of A: {g.get_neighbors('A')}")
    print(f"Neighbors of D: {g.get_neighbors('D')}")`,

                cpp: `// =====================================================
// STEP 1: Graph Representation - Adjacency List (C++)
// =====================================================

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Graph {
private:
    // Adjacency list: vertex -> [(neighbor, weight), ...]
    unordered_map<string, vector<pair<string, int>>> adjList;
    bool directed;

public:
    Graph(bool isDirected = false) : directed(isDirected) {}
    
    void addEdge(string u, string v, int weight = 1) {
        adjList[u].push_back({v, weight});
        
        if (!directed) {
            // Undirected: add reverse edge
            adjList[v].push_back({u, weight});
        }
    }
    
    vector<pair<string, int>> getNeighbors(string vertex) {
        return adjList[vertex];
    }
    
    void print() {
        for (auto& [vertex, neighbors] : adjList) {
            cout << vertex << " -> [";
            for (int i = 0; i < neighbors.size(); i++) {
                cout << neighbors[i].first << "(w=" << neighbors[i].second << ")";
                if (i < neighbors.size() - 1) cout << ", ";
            }
            cout << "]" << endl;
        }
    }
};

int main() {
    Graph g(false);  // Undirected
    
    g.addEdge("A", "B", 4);
    g.addEdge("A", "C", 2);
    g.addEdge("B", "D", 1);
    g.addEdge("C", "D", 3);
    
    cout << "Graph Structure:" << endl;
    g.print();
    
    return 0;
}`,
            },
            explanation: `## Adjacency List Representation

Stores a **list of neighbors** for each vertex.

### Visual Example:
\`\`\`
A -> [(B, 4), (C, 2)]
B -> [(A, 4), (D, 1)]
C -> [(A, 2), (D, 3)]
D -> [(B, 1), (C, 3)]
\`\`\`

### Comparison:

| Representation | Space | Edge Check | Add Edge |
|----------------|-------|------------|----------|
| Adjacency List | O(V+E) | O(degree) | O(1) |
| Adjacency Matrix | O(V²) | O(1) | O(1) |

Use **list** for sparse graphs (most real-world cases).`,
            tips: [
                "Use defaultdict(list) to avoid KeyError",
                "Store weights as tuples: (neighbor, weight)",
                "For undirected, add edges in both directions",
            ],
        },
        {
            id: "step-2",
            title: "BFS and DFS Traversals",
            description: "Implement breadth-first and depth-first search with path tracking.",
            concepts: ["Queue-based BFS", "Stack/recursion DFS", "Visited set"],
            code: {
                python: `# =====================================================
# STEP 2: BFS and DFS Graph Traversals
# =====================================================
# BFS: Level by level (uses Queue) - shortest path
# DFS: Go deep first (uses Stack/Recursion) - cycles
# =====================================================

from collections import defaultdict, deque

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
        self.graph[v].append(u)  # Undirected
    
    def bfs(self, start):
        """
        Breadth-First Search - explores level by level.
        Uses a QUEUE (FIFO) - First In, First Out.
        
        Perfect for: Shortest path in unweighted graphs!
        
        Visual:
            Level 0: [A]
            Level 1: [B, C]      <- neighbors of A
            Level 2: [D, E, F]   <- neighbors of B, C
        """
        visited = set([start])  # Track visited to avoid cycles
        queue = deque([start])  # FIFO queue
        order = []              # Traversal order
        
        while queue:
            # Remove from FRONT of queue
            vertex = queue.popleft()
            order.append(vertex)
            
            # Add all unvisited neighbors to queue
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return order
    
    def dfs(self, start, visited=None):
        """
        Depth-First Search - goes as deep as possible first.
        Uses RECURSION (implicit stack).
        
        Perfect for: Cycle detection, topological sort!
        
        Visual:
            A -> B -> D (dead end, backtrack)
                 B -> E (dead end, backtrack)
              -> C -> F
        """
        if visited is None:
            visited = set()
        
        visited.add(start)
        order = [start]
        
        # Recursively visit all unvisited neighbors
        for neighbor in self.graph[start]:
            if neighbor not in visited:
                order.extend(self.dfs(neighbor, visited))
        
        return order
    
    def dfs_iterative(self, start):
        """DFS using explicit stack (non-recursive)."""
        visited = set()
        stack = [start]  # LIFO stack
        order = []
        
        while stack:
            vertex = stack.pop()  # Remove from TOP
            if vertex not in visited:
                visited.add(vertex)
                order.append(vertex)
                # Add neighbors to stack
                for neighbor in self.graph[vertex]:
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return order


# =====================================================
# TEST: Compare BFS vs DFS
# =====================================================
if __name__ == "__main__":
    g = Graph()
    #     A
    #    / \\
    #   B   C
    #   |   |
    #   D   E
    
    edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "E")]
    for u, v in edges:
        g.add_edge(u, v)
    
    print("BFS from A:", g.bfs("A"))  # Level order
    print("DFS from A:", g.dfs("A"))  # Deep first
    print()
    print("BFS explores level-by-level (good for shortest path)")
    print("DFS goes deep first (good for exhaustive search)")`,

                cpp: `// =====================================================
// STEP 2: BFS and DFS Traversals (C++)
// =====================================================

#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
using namespace std;

class Graph {
private:
    unordered_map<string, vector<string>> graph;

public:
    void addEdge(string u, string v) {
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    
    // BFS: Level by level using QUEUE
    vector<string> bfs(string start) {
        unordered_set<string> visited;
        queue<string> q;
        vector<string> order;
        
        visited.insert(start);
        q.push(start);
        
        while (!q.empty()) {
            string vertex = q.front();
            q.pop();
            order.push_back(vertex);
            
            for (string& neighbor : graph[vertex]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
        return order;
    }
    
    // DFS: Go deep using STACK
    vector<string> dfs(string start) {
        unordered_set<string> visited;
        stack<string> s;
        vector<string> order;
        
        s.push(start);
        
        while (!s.empty()) {
            string vertex = s.top();
            s.pop();
            
            if (visited.find(vertex) == visited.end()) {
                visited.insert(vertex);
                order.push_back(vertex);
                
                for (string& neighbor : graph[vertex]) {
                    s.push(neighbor);
                }
            }
        }
        return order;
    }
};

int main() {
    Graph g;
    g.addEdge("A", "B");
    g.addEdge("A", "C");
    g.addEdge("B", "D");
    g.addEdge("C", "E");
    
    cout << "BFS from A: ";
    for (string& v : g.bfs("A")) cout << v << " ";
    cout << endl;
    
    cout << "DFS from A: ";
    for (string& v : g.dfs("A")) cout << v << " ";
    cout << endl;
    
    return 0;
}`,
            },
            explanation: `## BFS vs DFS

| Feature | BFS | DFS |
|---------|-----|-----|
| Data Structure | Queue (FIFO) | Stack (LIFO) |
| Order | Level by level | Deep first |
| Shortest Path | ✅ Yes (unweighted) | ❌ No |
| Space | O(width) | O(height) |

### When to Use:
- **BFS**: Shortest path, level-order, nearest neighbor
- **DFS**: Cycle detection, topological sort, maze solving

### Key Rule:
Always track **visited** nodes to avoid infinite loops!`,
            tips: [
                "BFS guarantees shortest path in unweighted graphs",
                "DFS uses less memory for deep graphs",
                "Mark visited BEFORE adding to queue/stack",
            ],
        },
        {
            id: "step-3",
            title: "Dijkstra's Shortest Path",
            description: "Find the shortest path between vertices in a weighted graph.",
            concepts: ["Priority queue", "Greedy algorithm", "Weighted graphs"],
            code: {
                python: `# =====================================================
# STEP 3: Dijkstra's Shortest Path Algorithm
# =====================================================
# Finds shortest path from source to ALL other vertices
# Works with WEIGHTED graphs (non-negative weights)
# Uses a priority queue (min-heap) for efficiency
# =====================================================

import heapq
from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v, weight):
        self.graph[u].append((v, weight))
        self.graph[v].append((u, weight))  # Undirected
    
    def dijkstra(self, start):
        """
        Dijkstra's Algorithm - O((V + E) log V)
        
        Key idea: Always process the vertex with smallest
        known distance first (greedy approach).
        
        Returns:
            distances: shortest distance from start to each vertex
            previous: previous vertex in shortest path (for reconstruction)
        """
        # Initialize all distances to infinity
        distances = {v: float('inf') for v in self.graph}
        distances[start] = 0
        
        # Track previous vertex for path reconstruction
        previous = {v: None for v in self.graph}
        
        # Priority queue: (distance, vertex)
        # heapq is a min-heap, so smallest distance comes first
        pq = [(0, start)]
        
        # Track processed vertices
        visited = set()
        
        while pq:
            # Get vertex with smallest distance
            current_dist, current = heapq.heappop(pq)
            
            # Skip if already processed
            if current in visited:
                continue
            visited.add(current)
            
            # Relaxation: check if we found shorter path to neighbors
            for neighbor, weight in self.graph[current]:
                if neighbor in visited:
                    continue
                
                new_dist = current_dist + weight
                
                # Found a shorter path!
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    previous[neighbor] = current
                    heapq.heappush(pq, (new_dist, neighbor))
        
        return distances, previous
    
    def get_path(self, previous, start, end):
        """Reconstruct path from start to end using previous dict."""
        path = []
        current = end
        while current is not None:
            path.append(current)
            current = previous[current]
        return path[::-1]  # Reverse to get start->end order


# =====================================================
# TEST: Find shortest paths
# =====================================================
if __name__ == "__main__":
    g = Graph()
    #     A --4-- B
    #     |       |
    #     2       1
    #     |       |
    #     C --3-- D
    
    g.add_edge("A", "B", 4)
    g.add_edge("A", "C", 2)
    g.add_edge("B", "D", 1)
    g.add_edge("C", "D", 3)
    
    distances, previous = g.dijkstra("A")
    
    print("Shortest distances from A:")
    for vertex, dist in sorted(distances.items()):
        print(f"  A -> {vertex}: {dist}")
    
    print()
    path = g.get_path(previous, "A", "D")
    print(f"Shortest path A->D: {' -> '.join(path)}")
    print(f"Total distance: {distances['D']}")`,

                cpp: `// =====================================================
// STEP 3: Dijkstra's Shortest Path (C++)
// =====================================================

#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
#include <limits>
using namespace std;

class Graph {
private:
    unordered_map<string, vector<pair<string, int>>> graph;

public:
    void addEdge(string u, string v, int weight) {
        graph[u].push_back({v, weight});
        graph[v].push_back({u, weight});
    }
    
    unordered_map<string, int> dijkstra(string start) {
        unordered_map<string, int> dist;
        for (auto& [v, _] : graph) dist[v] = INT_MAX;
        dist[start] = 0;
        
        // Min-heap: (distance, vertex)
        priority_queue<pair<int,string>, 
                      vector<pair<int,string>>,
                      greater<pair<int,string>>> pq;
        pq.push({0, start});
        
        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            
            if (d > dist[u]) continue;  // Skip outdated
            
            for (auto& [v, w] : graph[u]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        return dist;
    }
};

int main() {
    Graph g;
    g.addEdge("A", "B", 4);
    g.addEdge("A", "C", 2);
    g.addEdge("B", "D", 1);
    g.addEdge("C", "D", 3);
    
    auto dist = g.dijkstra("A");
    
    cout << "Shortest distances from A:" << endl;
    for (auto& [v, d] : dist) {
        cout << "  A -> " << v << ": " << d << endl;
    }
    return 0;
}`,
            },
            explanation: `## Dijkstra's Algorithm

Finds **shortest path** from source to all vertices in a **weighted graph**.

### Algorithm:
1. Set all distances to ∞, source to 0
2. Use min-heap to always process closest vertex
3. **Relax** edges: if new path is shorter, update

### Time Complexity:
- With binary heap: **O((V + E) log V)**

### Limitation:
⚠️ Does NOT work with negative weights! Use Bellman-Ford instead.`,
            tips: [
                "Use heapq in Python (min-heap by default)",
                "Skip vertices already processed",
                "Track 'previous' to reconstruct the path",
            ],
        },
        {
            id: "step-4",
            title: "Topological Sort",
            description: "Order vertices in a directed acyclic graph (DAG) by dependencies.",
            concepts: ["DAG", "Dependency ordering", "DFS post-order"],
            code: {
                python: `# =====================================================
# STEP 4: Topological Sort
# =====================================================
# Orders vertices so that for every edge u->v,
# u comes before v. Only works on DAGs!
# Applications: Task scheduling, build systems, course prereqs
# =====================================================

from collections import defaultdict, deque

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
        self.vertices = set()
    
    def add_edge(self, u, v):
        """Add directed edge u -> v (u must come before v)"""
        self.graph[u].append(v)
        self.vertices.add(u)
        self.vertices.add(v)
    
    def topological_sort_dfs(self):
        """
        DFS-based topological sort.
        
        Key insight: Add vertex to result AFTER visiting
        all its dependencies (post-order), then reverse.
        """
        visited = set()
        result = []
        
        def dfs(vertex):
            visited.add(vertex)
            
            # Visit all dependencies first
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    dfs(neighbor)
            
            # Add to result AFTER all dependencies processed
            result.append(vertex)
        
        # Process all vertices (graph may be disconnected)
        for vertex in self.vertices:
            if vertex not in visited:
                dfs(vertex)
        
        # Reverse because we want dependencies first
        return result[::-1]
    
    def topological_sort_kahn(self):
        """
        Kahn's Algorithm (BFS-based).
        
        Process vertices with no incoming edges first,
        then remove them and repeat.
        """
        # Count incoming edges for each vertex
        in_degree = {v: 0 for v in self.vertices}
        for u in self.graph:
            for v in self.graph[u]:
                in_degree[v] += 1
        
        # Start with vertices that have no dependencies
        queue = deque([v for v in self.vertices if in_degree[v] == 0])
        result = []
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            # "Remove" this vertex by decreasing in-degree
            for neighbor in self.graph[vertex]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # Check for cycle (not all vertices processed)
        if len(result) != len(self.vertices):
            return None  # Cycle detected!
        
        return result


# =====================================================
# TEST: Course prerequisites example
# =====================================================
if __name__ == "__main__":
    g = Graph()
    
    # Course dependencies (must take prereq first)
    # CS101 -> CS201 -> CS301
    # CS101 -> CS202 -> CS301
    # MATH101 -> CS201
    
    g.add_edge("CS101", "CS201")
    g.add_edge("CS101", "CS202")
    g.add_edge("CS201", "CS301")
    g.add_edge("CS202", "CS301")
    g.add_edge("MATH101", "CS201")
    
    print("Course order (DFS):", g.topological_sort_dfs())
    print("Course order (Kahn):", g.topological_sort_kahn())
    print()
    print("Any valid order where prereqs come first works!")`,

                cpp: `// =====================================================
// STEP 4: Topological Sort (C++)
// =====================================================

#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <algorithm>
using namespace std;

class Graph {
private:
    unordered_map<string, vector<string>> graph;
    unordered_set<string> vertices;

public:
    void addEdge(string u, string v) {
        graph[u].push_back(v);
        vertices.insert(u);
        vertices.insert(v);
    }
    
    // Kahn's Algorithm (BFS-based)
    vector<string> topologicalSort() {
        unordered_map<string, int> inDegree;
        for (auto& v : vertices) inDegree[v] = 0;
        for (auto& [u, neighbors] : graph) {
            for (auto& v : neighbors) inDegree[v]++;
        }
        
        queue<string> q;
        for (auto& v : vertices) {
            if (inDegree[v] == 0) q.push(v);
        }
        
        vector<string> result;
        while (!q.empty()) {
            string v = q.front();
            q.pop();
            result.push_back(v);
            
            for (auto& neighbor : graph[v]) {
                if (--inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        return result;
    }
};

int main() {
    Graph g;
    g.addEdge("CS101", "CS201");
    g.addEdge("CS101", "CS202");
    g.addEdge("CS201", "CS301");
    g.addEdge("CS202", "CS301");
    g.addEdge("MATH101", "CS201");
    
    cout << "Course order: ";
    for (auto& v : g.topologicalSort()) cout << v << " ";
    cout << endl;
    
    return 0;
}`,
            },
            explanation: `## Topological Sort

Orders vertices so that **dependencies come first**.

### Example:
\`\`\`
CS101 -> CS201 -> CS301
           ↑
       MATH101
\`\`\`

Valid orders: 
- MATH101, CS101, CS201, CS202, CS301
- CS101, MATH101, CS202, CS201, CS301

### Two Approaches:
1. **DFS + Reverse**: Post-order, then reverse
2. **Kahn's (BFS)**: Process 0 in-degree vertices first

### Applications:
- Build systems (Makefile)
- Task scheduling
- Course prerequisites`,
            tips: [
                "Only works on DAGs (no cycles)",
                "Kahn's can detect cycles",
                "Multiple valid orderings may exist",
            ],
        },
    ],
};

export const PROJECTS: Project[] = [
    hashmapProject,
    graphProject,
    memoryAllocatorProject,
    lruCacheProject,
    miniShellProject,
    httpServerProject,
    recursionProject,
    secureAuthProject,
    pythonToolkitProject,
    distributedKVProject,
    loadBalancerProject,
    cppFundamentalsProject,
    bitManipulationProject,
    dbQueryEngineProject,
    threadPoolProject,
    cicdPipelineProject,
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

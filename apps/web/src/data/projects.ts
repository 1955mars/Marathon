/**
 * Marathon Projects - Guided Implementation Projects
 * With detailed inline comments and explanations
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
    {
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
            h = 5381  # Magic starting number (works well empirically)
            for char in key:
                # h * 33 + char (33 = 32 + 1 = (1 << 5) + 1)
                # Bit shifting is faster than multiplication!
                h = ((h << 5) + h) + ord(char)
            return h % self.capacity
        return hash(key) % self.capacity


# =====================================================
# TEST: Let's see how keys are distributed
# =====================================================
if __name__ == "__main__":
    hm = HashMap(capacity=8)
    
    test_keys = ["apple", "banana", "cherry", "date", "elderberry"]
    
    print("Key Distribution:")
    print("-" * 35)
    for key in test_keys:
        bucket = hm._hash(key)
        print(f"'{key}' --> bucket[{bucket}]")
    
    print("\\n💡 Notice: Different keys CAN map to same bucket!")
    print("   This is called a COLLISION - we handle it in Step 2.")`,

                    cpp: `// =====================================================
// STEP 1: Understanding Hash Functions (C++)
// =====================================================
// A hash function converts any key into an array index
// where we'll store the associated value.
// =====================================================

#include <iostream>
#include <string>
#include <vector>
using namespace std;

class HashMap {
private:
    int capacity;    // Total number of buckets
    int size;        // Current items stored
    
    // Each bucket will hold a linked list (for collisions)
    vector<pair<string, int>*> buckets;
    
    /**
     * Hash function using djb2 algorithm.
     * Converts a string key into an array index (0 to capacity-1).
     * 
     * Algorithm:
     * 1. Start with magic number 5381
     * 2. For each char: hash = hash * 33 + char
     * 3. Use modulo to keep within array bounds
     */
    int hash(const string& key) {
        unsigned long h = 5381;  // Magic starting value
        
        for (char c : key) {
            // (h << 5) + h is the same as h * 33
            // Bit shifting is faster than multiplication!
            h = ((h << 5) + h) + c;
        }
        
        // Modulo keeps result in range [0, capacity-1]
        return h % capacity;
    }

public:
    /**
     * Constructor: Initialize with given capacity.
     * Default is 16 (power of 2 for efficient modulo).
     */
    HashMap(int cap = 16) : capacity(cap), size(0) {
        // Create 'capacity' empty buckets
        buckets.resize(capacity, nullptr);
    }
    
    // Get the bucket index for a key
    int getBucket(const string& key) {
        return hash(key);
    }
};

// =====================================================
// TEST: See how keys are distributed across buckets
// =====================================================
int main() {
    HashMap hm(8);  // 8 buckets
    
    vector<string> keys = {"apple", "banana", "cherry", "date"};
    
    cout << "Key Distribution:" << endl;
    cout << "----------------------------" << endl;
    
    for (const string& key : keys) {
        cout << "'" << key << "' --> bucket[" 
             << hm.getBucket(key) << "]" << endl;
    }
    
    cout << "\\n💡 Different keys CAN go to same bucket (collision)!" << endl;
    
    return 0;
}`,
                },
                explanation: `## What is a Hash Function?

A hash function converts **any key** (string, number, object) into an **array index**.

### Key Properties of Good Hash Functions:

1. **Deterministic** - Same key always produces the same hash
2. **Uniform Distribution** - Keys spread evenly across buckets
3. **Fast** - O(1) time complexity

### The djb2 Algorithm

\`\`\`
hash = 5381
for each character:
    hash = hash * 33 + character
\`\`\`

- Uses **bit shifting** (\`h << 5\`) instead of multiplication for speed
- The magic number **5381** works well empirically
- **Modulo** keeps the result within array bounds

### Why Collisions Happen

With limited buckets, different keys will sometimes hash to the same index:
- \`hash("apple") % 8 = 3\`
- \`hash("grape") % 8 = 3\`  ← Same bucket!

We handle this in Step 2 with **separate chaining**.`,
                tips: [
                    "Use a capacity that's a power of 2 (8, 16, 32...) for faster modulo",
                    "Python's built-in hash() changes between runs for security",
                    "Prime number capacities also reduce collisions well",
                ],
            },
            {
                id: "step-2",
                title: "Implementing Put and Get",
                description: "Add the core methods to insert and retrieve key-value pairs with collision handling.",
                concepts: ["Key-value storage", "Collision handling", "Separate chaining"],
                code: {
                    python: `# =====================================================
# STEP 2: Put and Get with Collision Handling
# =====================================================
# When two keys hash to the same bucket, we chain them
# together using a linked list. This is "separate chaining".
#
# Bucket[2]: ("apple", 5) -> ("grape", 8) -> None
# =====================================================

class Node:
    """
    A node in our linked list chain.
    Stores a key-value pair and pointer to next node.
    """
    def __init__(self, key, value):
        self.key = key      # The lookup key
        self.value = value  # The stored value
        self.next = None    # Pointer to next node (or None)


class HashMap:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """Convert key to bucket index."""
        return hash(key) % self.capacity
    
    def put(self, key, value):
        """
        Insert or update a key-value pair.
        
        Algorithm:
        1. Hash the key to find the bucket
        2. Search the chain for existing key
        3. If found: UPDATE the value
        4. If not found: INSERT new node at HEAD
        
        Time: O(1) average, O(n) worst case
        """
        # Step 1: Find the bucket
        index = self._hash(key)
        
        # Step 2: Search for existing key in the chain
        node = self.buckets[index]
        while node is not None:
            if node.key == key:
                # FOUND! Update value, don't add duplicate
                node.value = value
                return
            node = node.next
        
        # Step 3: Key not found - insert new node at HEAD
        # (Head insertion is O(1), tail would be O(n))
        new_node = Node(key, value)
        new_node.next = self.buckets[index]  # Point to old head
        self.buckets[index] = new_node       # New node is head
        self.size += 1
    
    def get(self, key):
        """
        Retrieve value by key. Returns None if not found.
        
        Algorithm:
        1. Hash the key to find the bucket
        2. Walk the chain looking for matching key
        3. Return value if found, None otherwise
        """
        index = self._hash(key)
        node = self.buckets[index]
        
        # Walk the chain
        while node is not None:
            if node.key == key:
                return node.value  # Found it!
            node = node.next
        
        return None  # Not found
    
    def delete(self, key):
        """Remove a key-value pair. Returns True if deleted."""
        index = self._hash(key)
        node = self.buckets[index]
        prev = None  # Track previous for re-linking
        
        while node is not None:
            if node.key == key:
                # Found it! Remove from chain
                if prev is None:
                    self.buckets[index] = node.next  # Was head
                else:
                    prev.next = node.next  # Skip over it
                self.size -= 1
                return True
            prev = node
            node = node.next
        
        return False  # Not found


# =====================================================
# TEST: Insert, retrieve, update, delete
# =====================================================
if __name__ == "__main__":
    hm = HashMap(4)  # Small for demo
    
    # Insert
    print("Inserting: name=Alice, age=25, city=NYC")
    hm.put("name", "Alice")
    hm.put("age", 25)
    hm.put("city", "NYC")
    
    # Retrieve
    print(f"\\nget('name') = {hm.get('name')}")   # Alice
    print(f"get('age')  = {hm.get('age')}")      # 25
    print(f"get('missing') = {hm.get('missing')}")  # None
    
    # Update
    print("\\nUpdating: age=26")
    hm.put("age", 26)
    print(f"get('age') = {hm.get('age')}")  # 26
    print(f"size = {hm.size}")  # Still 3 (update, not insert)
    
    # Delete
    print("\\nDeleting 'city'")
    hm.delete("city")
    print(f"get('city') = {hm.get('city')}")  # None
    print(f"size = {hm.size}")  # Now 2`,

                    cpp: `// =====================================================
// STEP 2: Put and Get with Collision Handling (C++)
// =====================================================
// When two keys hash to the same bucket, we chain them
// using a linked list. This is "separate chaining".
// =====================================================

#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Node in our linked list chain
struct Node {
    string key;
    int value;
    Node* next;
    
    Node(string k, int v) : key(k), value(v), next(nullptr) {}
};

class HashMap {
private:
    int capacity;
    int size;
    vector<Node*> buckets;
    
    int hash(const string& key) {
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
    
    /**
     * Insert or update a key-value pair.
     * If key exists: update value
     * If key is new: insert at head of chain
     */
    void put(const string& key, int value) {
        int index = hash(key);
        Node* node = buckets[index];
        
        // Search for existing key
        while (node != nullptr) {
            if (node->key == key) {
                node->value = value;  // Update existing
                return;
            }
            node = node->next;
        }
        
        // Not found - insert new node at head
        Node* newNode = new Node(key, value);
        newNode->next = buckets[index];
        buckets[index] = newNode;
        size++;
    }
    
    /**
     * Get value by key. Returns -1 if not found.
     * (In real code, use optional<int> or throw exception)
     */
    int get(const string& key) {
        int index = hash(key);
        Node* node = buckets[index];
        
        while (node != nullptr) {
            if (node->key == key) {
                return node->value;
            }
            node = node->next;
        }
        
        return -1;  // Not found
    }
    
    /**
     * Delete a key-value pair.
     * Returns true if deleted, false if not found.
     */
    bool remove(const string& key) {
        int index = hash(key);
        Node* node = buckets[index];
        Node* prev = nullptr;
        
        while (node != nullptr) {
            if (node->key == key) {
                if (prev == nullptr) {
                    buckets[index] = node->next;
                } else {
                    prev->next = node->next;
                }
                delete node;
                size--;
                return true;
            }
            prev = node;
            node = node->next;
        }
        return false;
    }
    
    int getSize() { return size; }
};

// =====================================================
// TEST
// =====================================================
int main() {
    HashMap hm(4);
    
    cout << "Inserting: name=1, age=25, city=2" << endl;
    hm.put("name", 1);
    hm.put("age", 25);
    hm.put("city", 2);
    
    cout << "get('age') = " << hm.get("age") << endl;  // 25
    
    hm.put("age", 26);  // Update
    cout << "After update: get('age') = " << hm.get("age") << endl;  // 26
    
    hm.remove("city");
    cout << "After delete: get('city') = " << hm.get("city") << endl;  // -1
    
    return 0;
}`,
                },
                explanation: `## Separate Chaining for Collision Handling

When multiple keys hash to the same bucket, we **chain** them in a linked list.

### Visual Example:
\`\`\`
Bucket[0]: None
Bucket[1]: ("apple", 5) -> ("grape", 8) -> None
Bucket[2]: ("banana", 3) -> None
Bucket[3]: None
\`\`\`

### The Put Algorithm:
1. **Hash** the key to find the bucket
2. **Search** the chain for an existing key
3. **Update** if found OR **Insert** at head if not

### Why Insert at the Head?
- Inserting at the **head** is O(1)
- Inserting at the **tail** would require walking the whole chain O(n)

### Time Complexity:
| Operation | Average | Worst Case |
|-----------|---------|------------|
| put()     | O(1)    | O(n)       |
| get()     | O(1)    | O(n)       |
| delete()  | O(1)    | O(n)       |

Worst case happens when ALL keys hash to the same bucket (very rare with a good hash function).`,
                tips: [
                    "Always check if key exists before inserting to avoid duplicates",
                    "Use head insertion for O(1) - don't walk to the tail!",
                    "In C++, remember to delete nodes to avoid memory leaks",
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
# As we add items, buckets get crowded and lookups slow.
# Solution: DOUBLE the capacity when load factor > 0.75
#
# Load Factor = items / capacity
# - 0.75 = 75% full → time to resize!
# =====================================================

class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None


class HashMap:
    # Resize when 75% full (industry standard)
    LOAD_FACTOR_THRESHOLD = 0.75
    
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def _load_factor(self):
        """Calculate current load factor."""
        return self.size / self.capacity
    
    def _resize(self):
        """
        Double capacity and rehash ALL entries.
        
        Why rehash? Because the bucket index depends on capacity!
            hash("hello") % 16 = 10
            hash("hello") % 32 = 26  ← Different bucket!
        
        Time: O(n) but happens rarely → amortized O(1)
        """
        print(f"🔄 Resizing: {self.capacity} -> {self.capacity * 2}")
        
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0  # Reset; put() will increment
        
        # Rehash every existing entry
        for bucket in old_buckets:
            node = bucket
            while node:
                self.put(node.key, node.value)
                node = node.next
    
    def put(self, key, value):
        """Insert with automatic resizing."""
        # Check if resize needed BEFORE inserting
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
    
    def stats(self):
        """Print current statistics."""
        print(f"Size: {self.size}, Capacity: {self.capacity}")
        print(f"Load Factor: {self._load_factor():.1%}")


# =====================================================
# TEST: Watch resizing happen automatically!
# =====================================================
if __name__ == "__main__":
    hm = HashMap(4)  # Start small to see resizing
    
    print("Starting with capacity 4...")
    print("Will resize at ~3 items (75% of 4)\\n")
    
    for i in range(12):
        hm.put(f"key{i}", i * 10)
        if (i + 1) % 4 == 0:
            print(f"After {i + 1} inserts:")
            hm.stats()
            print()
    
    print("✅ Final: Started at 4, now at", hm.capacity)
    print("   Resized at 75% thresholds automatically!")`,

                    cpp: `// =====================================================
// STEP 3: Dynamic Resizing (C++)
// =====================================================
// Double capacity when load factor exceeds 0.75.
// This keeps operations fast by preventing overcrowded buckets.
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
    const double LOAD_FACTOR_THRESHOLD = 0.75;
    int capacity;
    int size;
    vector<Node*> buckets;
    
    int hash(const string& key) {
        unsigned long h = 5381;
        for (char c : key) {
            h = ((h << 5) + h) + c;
        }
        return h % capacity;
    }
    
    double loadFactor() {
        return (double)size / capacity;
    }
    
    /**
     * Double capacity and rehash all entries.
     * Time: O(n) but happens rarely → amortized O(1)
     */
    void resize() {
        cout << "🔄 Resizing: " << capacity 
             << " -> " << capacity * 2 << endl;
        
        vector<Node*> oldBuckets = buckets;
        int oldCap = capacity;
        
        capacity *= 2;
        buckets.assign(capacity, nullptr);
        size = 0;
        
        // Rehash all existing entries
        for (int i = 0; i < oldCap; i++) {
            Node* node = oldBuckets[i];
            while (node) {
                put(node->key, node->value);
                Node* temp = node;
                node = node->next;
                delete temp;  // Clean up old nodes
            }
        }
    }

public:
    HashMap(int cap = 16) : capacity(cap), size(0) {
        buckets.resize(capacity, nullptr);
    }
    
    void put(const string& key, int value) {
        // Resize if needed BEFORE inserting
        if (loadFactor() >= LOAD_FACTOR_THRESHOLD) {
            resize();
        }
        
        int index = hash(key);
        Node* node = buckets[index];
        
        while (node) {
            if (node->key == key) {
                node->value = value;
                return;
            }
            node = node->next;
        }
        
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
    
    void stats() {
        cout << "Size: " << size 
             << ", Capacity: " << capacity
             << ", Load: " << (loadFactor() * 100) << "%" << endl;
    }
};

int main() {
    HashMap hm(4);  // Start small
    
    cout << "Starting with capacity 4..." << endl;
    cout << "Will resize at ~3 items (75%)\\n" << endl;
    
    for (int i = 0; i < 12; i++) {
        hm.put("key" + to_string(i), i * 10);
        if ((i + 1) % 4 == 0) {
            cout << "After " << (i + 1) << " inserts: ";
            hm.stats();
        }
    }
    
    return 0;
}`,
                },
                explanation: `## Dynamic Resizing: Keeping O(1) Performance

As we add more items, buckets fill up and chains get longer. **Resizing** fixes this!

### Load Factor

\`\`\`
Load Factor = size / capacity
\`\`\`

| Load Factor | Status |
|-------------|--------|
| 0.25        | Sparse, consider shrinking |
| 0.50        | Good |
| 0.75        | **Resize threshold** |
| 1.00        | Every bucket has at least 1 item |

### The Resize Process:

1. **Double** the capacity (4 → 8 → 16 → 32...)
2. **Rehash** every existing entry
3. Keys may move to different buckets!

### Why Rehash?

The bucket index depends on capacity:
- \`hash("hello") % 16 = 10\`
- \`hash("hello") % 32 = 26\` ← Different bucket!

### Amortized O(1)

Resizing is O(n), but it happens **rarely**:
- Insert 1000 items → only ~10 resizes
- Average cost per insert = O(1)

This is called **amortized analysis**.`,
                tips: [
                    "0.75 is the standard threshold (Java HashMaps use this)",
                    "Always DOUBLE capacity, not +1, for amortized O(1)",
                    "Consider shrinking when load factor drops below 0.25",
                    "In C++, properly delete old nodes to avoid memory leaks",
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

/**
 * Marathon Projects - Additional Projects
 * Memory Allocator and LRU Cache
 */

import { Project } from "./projects";

// ============================================================
// PROJECT 3: MEMORY ALLOCATOR
// ============================================================
// REAL-WORLD APPLICATIONS:
// - Operating Systems: Linux's slab allocator, Windows heap manager
// - Game Engines: Unity, Unreal use custom allocators for performance
// - Databases: PostgreSQL, MySQL manage their own memory pools
// - Web Browsers: Chrome's PartitionAlloc handles billions of allocations
// - Embedded Systems: No OS means you manage your own memory!
// ============================================================
export const memoryAllocatorProject: Project = {
    id: "memory-allocator",
    title: "Custom Memory Allocator",
    act: 3,
    difficulty: "Advanced",
    estimatedHours: 12,
    description: "Build a memory allocator implementing malloc, free, and realloc. Used in operating systems, game engines, databases, and any performance-critical application.",
    learningOutcomes: [
        "Understand memory layout and heap management",
        "Implement first-fit allocation strategy",
        "Handle memory fragmentation",
        "Build free list management",
    ],
    prerequisites: ["Pointers", "C/C++ memory model", "Linked lists"],
    technologies: ["Python", "C++"],
    steps: [
        {
            id: "step-1",
            title: "Memory Block Structure",
            description: "Design the block header for tracking allocations.",
            concepts: ["Block headers", "Free list", "Memory metadata"],
            code: {
                python: `# =====================================================
# STEP 1: Memory Block Structure
# =====================================================
# Every allocated block has a HEADER containing metadata:
# - size: how many bytes in this block
# - is_free: is this block available?
# - next/prev: pointers for the free list
# =====================================================

class BlockHeader:
    """
    Metadata for each memory block.
    In real allocators, this is stored just before the user data.
    
    Memory layout:
    +------------------+----------------------+
    | BlockHeader      | User Data            |
    | (size, is_free)  | (actual allocation)  |
    +------------------+----------------------+
    """
    def __init__(self, size):
        self.size = size        # Size of user data (not including header)
        self.is_free = True     # Is this block available?
        self.next = None        # Next block in free list
        self.prev = None        # Previous block in free list


class MemoryAllocator:
    """
    Simple memory allocator simulation.
    
    We simulate a heap as a list of blocks. In real systems,
    this would be raw memory from the OS (via sbrk/mmap).
    """
    
    def __init__(self, heap_size=1024):
        """Initialize allocator with a single large free block."""
        self.heap_size = heap_size
        
        # Start with one big free block
        initial_block = BlockHeader(heap_size)
        self.free_list = initial_block  # Head of free list
        
        # Track all blocks for visualization
        self.blocks = [initial_block]
    
    def print_heap(self):
        """Visualize the heap state."""
        print("=" * 50)
        print("HEAP STATE:")
        print("=" * 50)
        for i, block in enumerate(self.blocks):
            status = "FREE" if block.is_free else "USED"
            print(f"Block {i}: {block.size:4} bytes [{status}]")
        print("=" * 50)


# =====================================================
# TEST: Visualize initial heap
# =====================================================
if __name__ == "__main__":
    allocator = MemoryAllocator(heap_size=1024)
    
    print("Initial state: One large free block")
    allocator.print_heap()
    
    print()
    print("Next step: Implement malloc to split this block!")`,

                cpp: `// =====================================================
// STEP 1: Memory Block Structure (C++)
// =====================================================
// Block header contains metadata about each allocation.
// Stored just before the user data in memory.
// =====================================================

#include <iostream>
#include <cstdint>
#include <vector>
using namespace std;

// Block header - stored before each allocation
struct BlockHeader {
    size_t size;        // Size of user data
    bool is_free;       // Is block available?
    BlockHeader* next;  // Next in free list
    BlockHeader* prev;  // Previous in free list
    
    BlockHeader(size_t s) : size(s), is_free(true), 
                           next(nullptr), prev(nullptr) {}
};

class MemoryAllocator {
private:
    static const size_t HEAP_SIZE = 1024;
    uint8_t heap[HEAP_SIZE];     // Simulated heap memory
    BlockHeader* free_list;       // Head of free list
    
public:
    MemoryAllocator() {
        // Initialize heap as one big free block
        free_list = reinterpret_cast<BlockHeader*>(heap);
        new (free_list) BlockHeader(HEAP_SIZE - sizeof(BlockHeader));
    }
    
    void printHeap() {
        cout << "=== HEAP STATE ===" << endl;
        BlockHeader* block = reinterpret_cast<BlockHeader*>(heap);
        int i = 0;
        size_t offset = 0;
        
        while (offset < HEAP_SIZE) {
            string status = block->is_free ? "FREE" : "USED";
            cout << "Block " << i << ": " << block->size 
                 << " bytes [" << status << "]" << endl;
            
            offset += sizeof(BlockHeader) + block->size;
            block = reinterpret_cast<BlockHeader*>(
                heap + offset);
            i++;
        }
    }
};

int main() {
    MemoryAllocator allocator;
    
    cout << "Initial: One large free block" << endl;
    allocator.printHeap();
    
    return 0;
}`,
            },
            explanation: `## Memory Block Structure

Each allocation has a **header** with metadata:

\`\`\`
+------------------+----------------------+
| Header (16-32B)  | User Data            |
| size, is_free    | (your allocation)    |
+------------------+----------------------+
\`\`\`

### Key Fields:
- **size**: Bytes of user data
- **is_free**: Available for allocation?
- **next/prev**: Free list pointers

### Free List:
A linked list of available blocks, enabling O(1) traversal to find free space.

---

## 🌍 Real-World Applications

### 1. **Redis In-Memory Database**
Redis manages its own memory with \`zmalloc\` - a wrapper around system malloc that tracks memory usage precisely.

### 2. **Game Engines (Unity, Unreal)**
Games allocate millions of objects per second. Custom allocators:
- **Pool allocators**: Pre-allocate fixed-size chunks for game objects
- **Frame allocators**: Reset every frame for temporary calculations

### 3. **Chrome Browser (PartitionAlloc)**
Handles billions of allocations for DOM nodes, JavaScript objects:
- Separate heaps for different object types (security!)
- Fast path for common sizes

### 4. **jemalloc (Facebook, Firefox)**
Used by Facebook's servers:
- Thread-local caches reduce lock contention
- Size classes minimize fragmentation`,
            tips: [
                "Header size affects minimum allocation",
                "Align to 8/16 bytes for performance",
                "Store header just BEFORE user data",
                "Real allocators use size classes (8, 16, 32, 64... bytes)",
            ],
        },
        {
            id: "step-2",
            title: "Implementing Malloc",
            description: "Allocate memory blocks using first-fit strategy.",
            concepts: ["First-fit allocation", "Block splitting", "Free list traversal"],
            code: {
                python: `# =====================================================
# STEP 2: Malloc - Memory Allocation
# =====================================================
# First-Fit Strategy: Find first block large enough
# If block is much larger, SPLIT it to avoid waste
# =====================================================

class BlockHeader:
    def __init__(self, size):
        self.size = size
        self.is_free = True
        self.next = None
        self.prev = None


class MemoryAllocator:
    MIN_BLOCK_SIZE = 16  # Minimum useful block size
    
    def __init__(self, heap_size=1024):
        initial_block = BlockHeader(heap_size)
        self.free_list = initial_block
        self.blocks = [initial_block]
    
    def malloc(self, size):
        """
        Allocate 'size' bytes of memory.
        
        Algorithm (First-Fit):
        1. Walk free list, find first block >= size
        2. If much larger, split into two blocks
        3. Mark as used, remove from free list
        4. Return pointer to user data
        """
        # Round up to alignment (e.g., 8 bytes)
        size = (size + 7) & ~7
        
        # Search free list for suitable block
        block = self.free_list
        while block:
            if block.is_free and block.size >= size:
                # Found a suitable block!
                
                # Split if there's enough leftover
                remaining = block.size - size
                if remaining > self.MIN_BLOCK_SIZE:
                    # Create new block from remainder
                    new_block = BlockHeader(remaining - 8)  # 8 for header
                    new_block.next = block.next
                    block.next = new_block
                    block.size = size
                    
                    # Add new block to our list
                    idx = self.blocks.index(block)
                    self.blocks.insert(idx + 1, new_block)
                
                # Mark block as used
                block.is_free = False
                
                # Remove from free list
                self._remove_from_free_list(block)
                
                print(f"✓ Allocated {size} bytes")
                return block
            
            block = block.next
        
        print(f"✗ Failed: No block large enough for {size} bytes")
        return None
    
    def _remove_from_free_list(self, block):
        """Remove block from free list (it's now allocated)."""
        if block.prev:
            block.prev.next = block.next
        else:
            self.free_list = block.next
        if block.next:
            block.next.prev = block.prev
    
    def print_heap(self):
        print("\\n" + "=" * 40)
        for i, block in enumerate(self.blocks):
            bar_len = min(block.size // 32, 20)
            bar = "█" * bar_len
            status = "FREE" if block.is_free else "USED"
            print(f"[{status:4}] {block.size:4}B {bar}")
        print("=" * 40)


# =====================================================
# TEST: Allocate some memory
# =====================================================
if __name__ == "__main__":
    alloc = MemoryAllocator(1024)
    
    print("Initial heap:")
    alloc.print_heap()
    
    # Allocate some blocks
    a = alloc.malloc(100)
    b = alloc.malloc(200)
    c = alloc.malloc(50)
    
    print("\\nAfter allocations:")
    alloc.print_heap()`,

                cpp: `// =====================================================
// STEP 2: Malloc Implementation (C++)
// =====================================================

#include <iostream>
#include <cstdint>
using namespace std;

struct BlockHeader {
    size_t size;
    bool is_free;
    BlockHeader* next;
    
    BlockHeader(size_t s) : size(s), is_free(true), next(nullptr) {}
};

class MemoryAllocator {
private:
    static const size_t HEAP_SIZE = 1024;
    uint8_t heap[HEAP_SIZE];
    BlockHeader* free_list;
    
public:
    MemoryAllocator() {
        free_list = reinterpret_cast<BlockHeader*>(heap);
        new (free_list) BlockHeader(HEAP_SIZE - sizeof(BlockHeader));
    }
    
    void* malloc(size_t size) {
        // Align to 8 bytes
        size = (size + 7) & ~7;
        
        BlockHeader* block = free_list;
        BlockHeader* prev = nullptr;
        
        while (block) {
            if (block->is_free && block->size >= size) {
                // Split if much larger
                if (block->size > size + sizeof(BlockHeader) + 16) {
                    BlockHeader* newBlock = reinterpret_cast<BlockHeader*>(
                        reinterpret_cast<uint8_t*>(block) + 
                        sizeof(BlockHeader) + size);
                    
                    new (newBlock) BlockHeader(
                        block->size - size - sizeof(BlockHeader));
                    newBlock->next = block->next;
                    block->next = newBlock;
                    block->size = size;
                }
                
                block->is_free = false;
                cout << "Allocated " << size << " bytes" << endl;
                
                // Return pointer to user data (after header)
                return reinterpret_cast<uint8_t*>(block) + 
                       sizeof(BlockHeader);
            }
            prev = block;
            block = block->next;
        }
        
        cout << "Allocation failed!" << endl;
        return nullptr;
    }
    
    void printHeap() {
        BlockHeader* block = reinterpret_cast<BlockHeader*>(heap);
        while (block) {
            cout << (block->is_free ? "[FREE] " : "[USED] ")
                 << block->size << " bytes" << endl;
            block = block->next;
        }
    }
};

int main() {
    MemoryAllocator alloc;
    
    alloc.malloc(100);
    alloc.malloc(200);
    alloc.malloc(50);
    
    cout << "\\nHeap state:" << endl;
    alloc.printHeap();
    
    return 0;
}`,
            },
            explanation: `## Malloc: Memory Allocation

### First-Fit Algorithm:
1. Traverse free list
2. Find **first** block ≥ requested size
3. Split if much larger than needed
4. Mark as used, return pointer

### Block Splitting:
\`\`\`
Before: [    FREE 500B    ]
After:  [USED 100B][FREE 392B]
\`\`\`

### Other Strategies:
- **Best-Fit**: Find smallest suitable block (less waste, slower)
- **Worst-Fit**: Find largest block (counterintuitive but reduces fragmentation)`,
            tips: [
                "Always align allocations (8 or 16 bytes)",
                "Check minimum block size before splitting",
                "Return pointer to USER data, not header",
            ],
        },
        {
            id: "step-3",
            title: "Implementing Free",
            description: "Release memory and coalesce adjacent free blocks.",
            concepts: ["Memory deallocation", "Coalescing", "Fragmentation"],
            code: {
                python: `# =====================================================
# STEP 3: Free - Memory Deallocation with Coalescing
# =====================================================
# When freeing, merge with adjacent free blocks to
# prevent fragmentation (many small unusable blocks)
# =====================================================

class BlockHeader:
    def __init__(self, size):
        self.size = size
        self.is_free = True
        self.next = None
        self.prev = None


class MemoryAllocator:
    def __init__(self, heap_size=1024):
        initial = BlockHeader(heap_size)
        self.free_list = initial
        self.blocks = [initial]
    
    def malloc(self, size):
        """Allocate memory (simplified)."""
        size = (size + 7) & ~7
        
        for i, block in enumerate(self.blocks):
            if block.is_free and block.size >= size:
                # Split if needed
                if block.size > size + 24:
                    new_block = BlockHeader(block.size - size - 8)
                    self.blocks.insert(i + 1, new_block)
                    block.size = size
                
                block.is_free = False
                return block
        return None
    
    def free(self, block):
        """
        Free a block and coalesce with neighbors.
        
        Coalescing prevents fragmentation:
        Before: [USED][FREE][USED][FREE] - 2 small free blocks
        After:  [USED][   FREE   ][FREE] - 1 larger free block
        """
        if block is None:
            return
        
        # Mark as free
        block.is_free = True
        print(f"✓ Freed {block.size} bytes")
        
        # Get block index
        idx = self.blocks.index(block)
        
        # Coalesce with NEXT block if free
        if idx + 1 < len(self.blocks):
            next_block = self.blocks[idx + 1]
            if next_block.is_free:
                # Merge: absorb next block
                block.size += next_block.size + 8  # +8 for header
                self.blocks.remove(next_block)
                print(f"  → Coalesced with next block")
        
        # Coalesce with PREVIOUS block if free
        if idx > 0:
            prev_block = self.blocks[idx - 1]
            if prev_block.is_free:
                # Merge: previous absorbs this block
                prev_block.size += block.size + 8
                self.blocks.remove(block)
                print(f"  → Coalesced with previous block")
    
    def print_heap(self):
        print("\\n" + "─" * 40)
        total_free = 0
        for block in self.blocks:
            status = "░" if block.is_free else "█"
            bar = status * min(block.size // 50, 20)
            label = "FREE" if block.is_free else "USED"
            print(f"{label:4} {block.size:4}B {bar}")
            if block.is_free:
                total_free += block.size
        print(f"─" * 40)
        print(f"Free memory: {total_free} bytes")


# =====================================================
# TEST: Allocate, free, and see coalescing
# =====================================================
if __name__ == "__main__":
    alloc = MemoryAllocator(1024)
    
    # Allocate three blocks
    a = alloc.malloc(100)
    b = alloc.malloc(200)
    c = alloc.malloc(100)
    
    print("After allocation:")
    alloc.print_heap()
    
    # Free middle block
    print("\\nFreeing middle block (b):")
    alloc.free(b)
    alloc.print_heap()
    
    # Free first block - should coalesce with b
    print("\\nFreeing first block (a):")
    alloc.free(a)
    alloc.print_heap()
    
    print("\\n✓ Notice how adjacent free blocks merged!")`,

                cpp: `// =====================================================
// STEP 3: Free with Coalescing (C++)
// =====================================================

#include <iostream>
#include <vector>
using namespace std;

struct Block {
    size_t size;
    bool is_free;
    Block(size_t s) : size(s), is_free(true) {}
};

class MemoryAllocator {
private:
    vector<Block> blocks;
    
public:
    MemoryAllocator(size_t heapSize) {
        blocks.push_back(Block(heapSize));
    }
    
    int malloc(size_t size) {
        size = (size + 7) & ~7;
        for (int i = 0; i < blocks.size(); i++) {
            if (blocks[i].is_free && blocks[i].size >= size) {
                if (blocks[i].size > size + 24) {
                    Block newBlock(blocks[i].size - size - 8);
                    blocks.insert(blocks.begin() + i + 1, newBlock);
                    blocks[i].size = size;
                }
                blocks[i].is_free = false;
                return i;
            }
        }
        return -1;
    }
    
    void free(int blockIdx) {
        if (blockIdx < 0 || blockIdx >= blocks.size()) return;
        
        blocks[blockIdx].is_free = true;
        cout << "Freed " << blocks[blockIdx].size << " bytes" << endl;
        
        // Coalesce with next
        if (blockIdx + 1 < blocks.size() && 
            blocks[blockIdx + 1].is_free) {
            blocks[blockIdx].size += blocks[blockIdx + 1].size + 8;
            blocks.erase(blocks.begin() + blockIdx + 1);
            cout << "  Coalesced with next" << endl;
        }
        
        // Coalesce with previous
        if (blockIdx > 0 && blocks[blockIdx - 1].is_free) {
            blocks[blockIdx - 1].size += blocks[blockIdx].size + 8;
            blocks.erase(blocks.begin() + blockIdx);
            cout << "  Coalesced with prev" << endl;
        }
    }
    
    void printHeap() {
        for (auto& b : blocks) {
            cout << (b.is_free ? "[FREE] " : "[USED] ")
                 << b.size << "B" << endl;
        }
    }
};

int main() {
    MemoryAllocator alloc(1024);
    
    int a = alloc.malloc(100);
    int b = alloc.malloc(200);
    int c = alloc.malloc(100);
    
    cout << "After alloc:" << endl;
    alloc.printHeap();
    
    cout << "\\nFree b:" << endl;
    alloc.free(b);
    alloc.printHeap();
    
    return 0;
}`,
            },
            explanation: `## Free and Coalescing

### The Fragmentation Problem:
\`\`\`
[USED 50][FREE 30][USED 40][FREE 35]
\`\`\`
Two free blocks of 30 and 35 bytes, but can't allocate 60 bytes!

### Coalescing Solution:
Merge adjacent free blocks when freeing:

\`\`\`
Before: [FREE 30][FREE 35]
After:  [    FREE 73    ]  (30 + 35 + 8 header)
\`\`\`

### Directions:
1. Check **next** block, merge if free
2. Check **previous** block, merge if free`,
            tips: [
                "Always check BOTH neighbors for coalescing",
                "Order matters: coalesce next first, then prev",
                "Add header size when calculating merged size",
            ],
        },
    ],
};

// ============================================================
// PROJECT 4: LRU CACHE
// ============================================================
export const lruCacheProject: Project = {
    id: "distributed-cache",
    title: "Distributed Cache (Mini Redis)",
    act: 4,
    difficulty: "Advanced",
    estimatedHours: 15,
    description: "Build a Redis-like in-memory cache with TTL, eviction policies, and basic operations.",
    learningOutcomes: [
        "Implement LRU eviction policy",
        "Handle time-to-live (TTL) for cache entries",
        "Design efficient O(1) cache operations",
        "Understand when to use different eviction strategies",
    ],
    prerequisites: ["Hash tables", "Linked lists", "Basic networking"],
    technologies: ["Python", "C++"],
    steps: [
        {
            id: "step-1",
            title: "LRU Cache Core",
            description: "Build a Least Recently Used cache with O(1) get and put.",
            concepts: ["LRU eviction", "OrderedDict", "Doubly linked list + hashmap"],
            code: {
                python: `# =====================================================
# STEP 1: LRU Cache - Least Recently Used
# =====================================================
# When cache is full, evict the LEAST recently used item.
# Both get() and put() are O(1) operations!
#
# Data structures:
# - OrderedDict: maintains insertion/access order
# - OR: HashMap + Doubly Linked List (interview style)
# =====================================================

from collections import OrderedDict

class LRUCache:
    """
    LRU Cache using Python's OrderedDict.
    - OrderedDict remembers insertion order
    - move_to_end() makes it perfect for LRU!
    """
    
    def __init__(self, capacity: int):
        """
        Initialize cache with fixed capacity.
        
        Args:
            capacity: Maximum number of items to store
        """
        self.capacity = capacity
        self.cache = OrderedDict()  # Key -> Value, ordered by access
    
    def get(self, key: str):
        """
        Get value by key. Returns None if not found.
        
        Time: O(1)
        
        IMPORTANT: Accessing a key makes it "recently used"!
        """
        if key not in self.cache:
            return None
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key: str, value):
        """
        Insert or update a key-value pair.
        
        Time: O(1)
        
        If cache is full, evict the OLDEST (least recently used) item.
        """
        if key in self.cache:
            # Update existing - move to end
            self.cache.move_to_end(key)
        
        self.cache[key] = value
        
        # Evict oldest if over capacity
        if len(self.cache) > self.capacity:
            # popitem(last=False) removes FIRST item (oldest)
            oldest_key, _ = self.cache.popitem(last=False)
            print(f"  ⚠ Evicted '{oldest_key}' (LRU)")
    
    def delete(self, key: str) -> bool:
        """Remove a key. Returns True if existed."""
        if key in self.cache:
            del self.cache[key]
            return True
        return False
    
    def __str__(self):
        items = list(self.cache.items())
        # Items are ordered: oldest (LRU) first, newest last
        return f"LRU[{items}] (left=oldest, right=newest)"


# =====================================================
# TEST: Watch LRU eviction in action
# =====================================================
if __name__ == "__main__":
    cache = LRUCache(capacity=3)
    
    print("Cache capacity: 3\\n")
    
    # Add items
    cache.put("a", 1)
    cache.put("b", 2)
    cache.put("c", 3)
    print(f"After adding a,b,c: {cache}")
    
    # Access 'a' - makes it most recently used
    print(f"\\nget('a') = {cache.get('a')}")
    print(f"After accessing 'a': {cache}")
    
    # Add 'd' - should evict 'b' (now oldest)
    print(f"\\nAdding 'd' (cache full):")
    cache.put("d", 4)
    print(f"After: {cache}")
    
    # 'b' should be gone
    print(f"\\nget('b') = {cache.get('b')} (was evicted)")`,

                cpp: `// =====================================================
// STEP 1: LRU Cache (C++)
// =====================================================
// Using list + unordered_map for O(1) operations
// =====================================================

#include <iostream>
#include <list>
#include <unordered_map>
using namespace std;

class LRUCache {
private:
    int capacity;
    // List: front = oldest (LRU), back = newest (MRU)
    list<pair<string, int>> cache;
    // Map: key -> iterator in list
    unordered_map<string, list<pair<string, int>>::iterator> map;
    
public:
    LRUCache(int cap) : capacity(cap) {}
    
    int get(string key) {
        auto it = map.find(key);
        if (it == map.end()) return -1;
        
        // Move to back (most recently used)
        cache.splice(cache.end(), cache, it->second);
        return it->second->second;
    }
    
    void put(string key, int value) {
        auto it = map.find(key);
        
        if (it != map.end()) {
            // Update existing
            it->second->second = value;
            cache.splice(cache.end(), cache, it->second);
        } else {
            // Evict if full
            if (cache.size() >= capacity) {
                string lruKey = cache.front().first;
                map.erase(lruKey);
                cache.pop_front();
                cout << "Evicted: " << lruKey << endl;
            }
            
            // Insert new
            cache.push_back({key, value});
            map[key] = prev(cache.end());
        }
    }
    
    void print() {
        cout << "Cache: [";
        for (auto& [k, v] : cache) {
            cout << k << ":" << v << " ";
        }
        cout << "] (left=LRU)" << endl;
    }
};

int main() {
    LRUCache cache(3);
    
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);
    cache.print();
    
    cache.get("a");  // Access 'a'
    cache.print();
    
    cache.put("d", 4);  // Evicts 'b'
    cache.print();
    
    return 0;
}`,
            },
            explanation: `## LRU Cache: O(1) Operations

**LRU** = Least Recently Used. When full, evict the item that hasn't been accessed the longest.

### Data Structure (Interview Style):
\`\`\`
HashMap: key -> Node pointer (O(1) lookup)
Doubly Linked List: ordered by access time
\`\`\`

### OrderedDict Approach (Python):
- \`move_to_end(key)\` - O(1) move to recent
- \`popitem(last=False)\` - O(1) remove oldest

### Operations:
| Operation | Description | Time |
|-----------|-------------|------|
| get(key)  | Lookup + move to recent | O(1) |
| put(key, val) | Insert/update + possible eviction | O(1) |`,
            tips: [
                "Python OrderedDict is perfect for LRU",
                "For interviews, implement with HashMap + DLL",
                "Always update access order on BOTH get and put",
            ],
        },
        {
            id: "step-2",
            title: "Adding TTL Support",
            description: "Implement time-to-live for automatic expiration.",
            concepts: ["TTL", "Expiration", "Lazy deletion"],
            code: {
                python: `# =====================================================
# STEP 2: Cache with TTL (Time-To-Live)
# =====================================================
# Keys automatically expire after a set time.
# Two approaches: Lazy deletion vs Active expiration
# =====================================================

import time
from collections import OrderedDict

class TTLCache:
    """
    Cache with per-key TTL support.
    Keys expire after their TTL, even if not evicted by LRU.
    """
    
    def __init__(self, capacity: int, default_ttl: int = 60):
        """
        Initialize cache.
        
        Args:
            capacity: Max items
            default_ttl: Default TTL in seconds
        """
        self.capacity = capacity
        self.default_ttl = default_ttl
        # Store: key -> (value, expiry_timestamp)
        self.cache = OrderedDict()
    
    def _is_expired(self, key: str) -> bool:
        """Check if key has expired."""
        if key not in self.cache:
            return True
        _, expiry = self.cache[key]
        return expiry is not None and time.time() > expiry
    
    def get(self, key: str):
        """
        Get value if exists and not expired.
        Uses LAZY DELETION - check expiry on access.
        """
        if key not in self.cache:
            return None
        
        # Check expiration (lazy deletion)
        if self._is_expired(key):
            print(f"  ⏰ Key '{key}' expired")
            del self.cache[key]
            return None
        
        # Move to end (recently used)
        self.cache.move_to_end(key)
        value, _ = self.cache[key]
        return value
    
    def put(self, key: str, value, ttl: int = None):
        """
        Insert with optional TTL.
        
        Args:
            key: Cache key
            value: Value to store
            ttl: Seconds until expiry (None = no expiry)
        """
        if ttl is None:
            ttl = self.default_ttl
        
        # Calculate expiry timestamp
        expiry = time.time() + ttl if ttl else None
        
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = (value, expiry)
        
        # Evict if over capacity
        if len(self.cache) > self.capacity:
            oldest_key, _ = self.cache.popitem(last=False)
            print(f"  ⚠ Evicted '{oldest_key}'")
    
    def cleanup_expired(self):
        """
        Active expiration - remove all expired keys.
        Call periodically in background thread.
        """
        expired_keys = [k for k in self.cache if self._is_expired(k)]
        for key in expired_keys:
            del self.cache[key]
            print(f"  🗑 Cleaned up expired key: '{key}'")
        return len(expired_keys)
    
    def __len__(self):
        return len(self.cache)


# =====================================================
# TEST: TTL in action
# =====================================================
if __name__ == "__main__":
    cache = TTLCache(capacity=10, default_ttl=2)
    
    # Add with 2-second TTL
    print("Adding 'session' with 2s TTL")
    cache.put("session", "user123")
    print(f"get('session') = {cache.get('session')}")
    
    # Wait and check
    print("\\nWaiting 3 seconds...")
    time.sleep(3)
    
    print(f"get('session') = {cache.get('session')}")
    
    # Add without TTL
    print("\\nAdding 'permanent' with no TTL")
    cache.put("permanent", "forever", ttl=0)  # 0 = no expiry
    print(f"This key won't expire automatically")`,

                cpp: `// =====================================================
// STEP 2: Cache with TTL (C++)
// =====================================================

#include <iostream>
#include <unordered_map>
#include <chrono>
using namespace std;

class TTLCache {
private:
    struct Entry {
        string value;
        chrono::steady_clock::time_point expiry;
        bool hasExpiry;
    };
    
    unordered_map<string, Entry> cache;
    int capacity;
    int defaultTTL;
    
    bool isExpired(const string& key) {
        if (cache.find(key) == cache.end()) return true;
        auto& entry = cache[key];
        if (!entry.hasExpiry) return false;
        return chrono::steady_clock::now() > entry.expiry;
    }
    
public:
    TTLCache(int cap, int ttl = 60) : capacity(cap), defaultTTL(ttl) {}
    
    string get(const string& key) {
        if (isExpired(key)) {
            cache.erase(key);
            return "";  // Expired or not found
        }
        return cache[key].value;
    }
    
    void put(const string& key, const string& value, int ttl = -1) {
        if (ttl == -1) ttl = defaultTTL;
        
        Entry entry;
        entry.value = value;
        entry.hasExpiry = (ttl > 0);
        if (entry.hasExpiry) {
            entry.expiry = chrono::steady_clock::now() + 
                          chrono::seconds(ttl);
        }
        
        cache[key] = entry;
        
        // Simple eviction (not LRU for simplicity)
        while (cache.size() > capacity) {
            cache.erase(cache.begin());
        }
    }
};

int main() {
    TTLCache cache(10, 2);  // 2 second default TTL
    
    cache.put("session", "user123");
    cout << "get('session') = " << cache.get("session") << endl;
    
    cout << "Sleeping 3 seconds..." << endl;
    this_thread::sleep_for(chrono::seconds(3));
    
    string result = cache.get("session");
    cout << "get('session') = " << (result.empty() ? "(expired)" : result) << endl;
    
    return 0;
}`,
            },
            explanation: `## TTL: Time-To-Live

Keys automatically expire after a set duration.

### Two Approaches:

**1. Lazy Deletion** (check on access):
\`\`\`python
def get(key):
    if expired(key):
        delete(key)
        return None
    return cache[key]
\`\`\`
- ✅ Simple, no background threads
- ❌ Memory not freed until accessed

**2. Active Expiration** (background cleanup):
\`\`\`python
# Run periodically
for key in cache:
    if expired(key):
        delete(key)
\`\`\`
- ✅ Memory freed proactively
- ❌ Requires background thread

### Redis uses BOTH!
- Lazy deletion on access
- Random sampling for active expiration`,
            tips: [
                "Store expiry as timestamp, not duration",
                "TTL=0 often means 'no expiry'",
                "Combine lazy + active for best results",
            ],
        },
        {
            id: "step-3",
            title: "Cache Operations",
            description: "Implement common cache operations like SETEX, INCR, and batch operations.",
            concepts: ["Atomic operations", "Batch commands", "Cache patterns"],
            code: {
                python: `# =====================================================
# STEP 3: Redis-like Cache Operations
# =====================================================
# Common operations: SETEX, INCR, EXISTS, KEYS, etc.
# =====================================================

import time
from collections import OrderedDict
import fnmatch

class MiniRedis:
    """
    Mini Redis implementation with common commands.
    """
    
    def __init__(self, capacity: int = 1000):
        self.capacity = capacity
        self.cache = OrderedDict()  # key -> (value, expiry)
    
    def _check_expiry(self, key: str) -> bool:
        """Remove key if expired. Returns True if valid."""
        if key not in self.cache:
            return False
        _, expiry = self.cache[key]
        if expiry and time.time() > expiry:
            del self.cache[key]
            return False
        return True
    
    # ============ STRING OPERATIONS ============
    
    def set(self, key: str, value, ex: int = None):
        """SET key value [EX seconds]"""
        expiry = time.time() + ex if ex else None
        self.cache[key] = (value, expiry)
        return "OK"
    
    def get(self, key: str):
        """GET key"""
        if not self._check_expiry(key):
            return None
        value, _ = self.cache[key]
        return value
    
    def setex(self, key: str, seconds: int, value):
        """SETEX key seconds value - Set with expiry"""
        return self.set(key, value, ex=seconds)
    
    def incr(self, key: str) -> int:
        """INCR key - Increment integer value"""
        if not self._check_expiry(key):
            self.cache[key] = (0, None)
        
        value, expiry = self.cache[key]
        try:
            new_value = int(value) + 1
            self.cache[key] = (new_value, expiry)
            return new_value
        except ValueError:
            raise ValueError("Value is not an integer")
    
    def incrby(self, key: str, amount: int) -> int:
        """INCRBY key amount - Increment by amount"""
        if not self._check_expiry(key):
            self.cache[key] = (0, None)
        
        value, expiry = self.cache[key]
        new_value = int(value) + amount
        self.cache[key] = (new_value, expiry)
        return new_value
    
    # ============ KEY OPERATIONS ============
    
    def exists(self, key: str) -> bool:
        """EXISTS key - Check if key exists"""
        return self._check_expiry(key)
    
    def delete(self, *keys) -> int:
        """DEL key [key ...] - Delete keys"""
        count = 0
        for key in keys:
            if key in self.cache:
                del self.cache[key]
                count += 1
        return count
    
    def keys(self, pattern: str = "*") -> list:
        """KEYS pattern - Find keys matching pattern"""
        # Clean up expired keys first
        valid_keys = [k for k in self.cache if self._check_expiry(k)]
        return [k for k in valid_keys if fnmatch.fnmatch(k, pattern)]
    
    def ttl(self, key: str) -> int:
        """TTL key - Get remaining time to live"""
        if not self._check_expiry(key):
            return -2  # Key doesn't exist
        _, expiry = self.cache[key]
        if expiry is None:
            return -1  # No expiry
        return max(0, int(expiry - time.time()))
    
    def expire(self, key: str, seconds: int) -> bool:
        """EXPIRE key seconds - Set expiry on existing key"""
        if not self._check_expiry(key):
            return False
        value, _ = self.cache[key]
        self.cache[key] = (value, time.time() + seconds)
        return True


# =====================================================
# TEST: Redis-like operations
# =====================================================
if __name__ == "__main__":
    redis = MiniRedis()
    
    # Basic set/get
    print("=== String Operations ===")
    redis.set("name", "Alice")
    print(f"GET name: {redis.get('name')}")
    
    # Set with expiry
    redis.setex("session", 5, "token123")
    print(f"GET session: {redis.get('session')}")
    print(f"TTL session: {redis.ttl('session')} seconds")
    
    # Increment
    print("\\n=== Counter Operations ===")
    redis.set("counter", 0)
    print(f"INCR counter: {redis.incr('counter')}")
    print(f"INCR counter: {redis.incr('counter')}")
    print(f"INCRBY counter 10: {redis.incrby('counter', 10)}")
    
    # Key operations
    print("\\n=== Key Operations ===")
    redis.set("user:1", "Alice")
    redis.set("user:2", "Bob")
    redis.set("order:1", "Pizza")
    
    print(f"KEYS user:*: {redis.keys('user:*')}")
    print(f"EXISTS user:1: {redis.exists('user:1')}")
    print(f"DEL user:1 user:2: {redis.delete('user:1', 'user:2')}")`,

                cpp: `// Step 3: Redis-like operations (simplified)
// Full implementation would be extensive

#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

class MiniRedis {
private:
    unordered_map<string, string> cache;
    
public:
    string set(string key, string value) {
        cache[key] = value;
        return "OK";
    }
    
    string get(string key) {
        if (cache.find(key) == cache.end()) return "(nil)";
        return cache[key];
    }
    
    int incr(string key) {
        int val = 0;
        if (cache.find(key) != cache.end()) {
            val = stoi(cache[key]);
        }
        val++;
        cache[key] = to_string(val);
        return val;
    }
    
    bool exists(string key) {
        return cache.find(key) != cache.end();
    }
};

int main() {
    MiniRedis redis;
    
    cout << redis.set("name", "Alice") << endl;
    cout << "GET name: " << redis.get("name") << endl;
    
    redis.set("counter", "0");
    cout << "INCR: " << redis.incr("counter") << endl;
    cout << "INCR: " << redis.incr("counter") << endl;
    
    return 0;
}`,
            },
            explanation: `## Redis-like Commands

### String Commands:
| Command | Description |
|---------|-------------|
| SET key value | Store a value |
| GET key | Retrieve a value |
| SETEX key sec val | Set with expiry |
| INCR key | Increment by 1 |
| INCRBY key n | Increment by n |

### Key Commands:
| Command | Description |
|---------|-------------|
| EXISTS key | Check if exists |
| DEL key | Delete key(s) |
| KEYS pattern | Find matching keys |
| TTL key | Get time to live |
| EXPIRE key sec | Set expiry |

### TTL Return Values:
- **-2**: Key doesn't exist
- **-1**: No expiry set
- **n**: Seconds remaining`,
            tips: [
                "INCR is atomic - safe for counters",
                "Use KEYS sparingly - it's O(n)",
                "Pattern matching uses glob-style wildcards",
            ],
        },
    ],
};

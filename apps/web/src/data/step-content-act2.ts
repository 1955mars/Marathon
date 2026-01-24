/**
 * Act 2: Systems & Low-Level - Step Content
 * Operating Systems, Networks, Databases
 */

export const act2Content: Record<string, { title: string; content: string }> = {
    // Step 2-1-1: Processes & Threads
    'step-2-1-1': {
        title: 'Processes & Threads',
        content: `# Processes & Threads

## Why This Matters

When you run \`python script.py\`, something remarkable happens. Your code transforms from static text on disk into a *living entity* that can think, remember, and act. That entity is called a **process**.

Understanding processes and threads is essential for:
- Writing concurrent programs that don't crash mysteriously
- Debugging race conditions that only appear in production
- Answering systems questions in technical interviews

---

## What is a Process?

**Definition**: A **process** is a *running instance of a program* — your code loaded into memory, given its own private workspace, and granted time on the CPU to execute.

### The Restaurant Analogy 🍳

Think of your computer as a busy restaurant:

| Restaurant | Computer |
|------------|----------|
| **Chef** | CPU (does the actual work) |
| **Order ticket** | Process (a specific customer's meal being prepared) |
| **Recipe book** | Program (instructions sitting on disk) |
| **Kitchen station** | Memory space (ingredients and tools for this order) |
| **Kitchen tasks** | Threads (chop onions, grill steak — parallel work on one order) |

When you "run a program," you're placing an order. The OS (restaurant manager) creates a process (order ticket), allocates memory (kitchen station), and schedules CPU time (chef's attention).

### A Process Is More Than Code

A process bundles together:

\`\`\`mermaid
flowchart TB
    subgraph process["PROCESS"]
        A["Code - Text Segment"] --> A1["Instructions"]
        B["Data Segment"] --> B1["Global vars"]
        C["Heap"] --> C1["malloc/new"]
        D["Stack"] --> D1["Function calls"]
        E["Process ID - PID"] --> E1["Unique ID"]
        F["Program Counter"] --> F1["Current line"]
        G["Open Files"] --> G1["File handles"]
        H["Environment Variables"] --> H1["PATH, HOME"]
    end
    style process fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### Process Lifecycle

Every process moves through these states:

\`\`\`mermaid
stateDiagram-v2
    [*] --> New : Process created
    New --> Ready : OS admits to ready queue
    Ready --> Running : dispatch (get CPU)
    Running --> Ready : preempt / scheduler
    Running --> Waiting : I/O request
    Waiting --> Ready : I/O complete
    Running --> [*] : exit
\`\`\`

---

## What is a Thread?

**Definition**: A **thread** is a lightweight unit of execution *within* a process. All threads in a process share the same memory space but each has its own stack.

### Process vs Thread: The Key Insight

Think of threads as **workers in the same kitchen**:
- They share ingredients (memory), pots and pans (resources)
- But each follows their own checklist (stack, registers)
- They must coordinate to avoid collisions (synchronization)

| Aspect | Process | Thread |
|--------|---------|--------|
| **Memory** | Private address space | Shared with other threads |
| **Creation** | Expensive (~10ms) | Cheap (~1ms) |
| **Communication** | IPC (pipes, sockets) | Direct memory access |
| **Crash impact** | Isolated | Can crash entire process |
| **Use case** | Isolation, security | Parallelism, responsiveness |

---

## Connecting to Fundamentals

Remember the **call stack** from recursion? Each thread has its own stack:

\`\`\`mermaid
flowchart TB
    subgraph mem["Process Memory Layout"]
        direction TB
        T1["Thread 1 Stack ↓"] --> T2["Thread 2 Stack ↓"]
        T2 --> dots["..."]
        dots --> H["Heap ↑ grows up"]
        H --> D["Data - global variables"]
        D --> C["Code - read-only"]
    end
    style mem fill:#1e1b4b,stroke:#a78bfa
\`\`\`

---

## Code Examples

### Creating Processes (Python)

\`\`\`python
import multiprocessing
import os

def worker(name):
    """Each process has its own PID and memory space"""
    print(f"Worker {name}, PID: {os.getpid()}")
    # Changes to variables here don't affect other processes

if __name__ == "__main__":
    processes = []
    for i in range(4):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()  # Fork: creates a copy of this process
    
    for p in processes:
        p.join()  # Wait for child to finish
\`\`\`

### Creating Threads (Python)

\`\`\`python
import threading

counter = 0  # Shared between threads — danger zone!

def worker(name):
    global counter
    for _ in range(100000):
        counter += 1  # This is NOT atomic!

threads = [threading.Thread(target=worker, args=(i,)) for i in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)  # Probably NOT 400000! (race condition)
\`\`\`

### Creating Threads (C++)

\`\`\`cpp
#include <iostream>
#include <thread>
#include <vector>

void worker(int id) {
    std::cout << "Thread " << id << " running\\n";
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 4; ++i) {
        threads.emplace_back(worker, i);
    }
    for (auto& t : threads) {
        t.join();  // Must join before thread goes out of scope
    }
    return 0;
}
\`\`\`

---

## Context Switching: The Hidden Cost

When the OS switches between processes/threads, it must:

1. **Save** current state (registers, program counter)
2. **Load** next process's state
3. **Flush** CPU caches (for process switch)

**Cost**: ~1-10μs for threads, ~100μs-1ms for processes

This is why creating thousands of threads is faster than thousands of processes.

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between a process and a thread?"
2. "When would you use multiprocessing vs multithreading?"
3. "What happens when you call \`fork()\`?"

**Key Talking Points**:
- Processes for **isolation** (one crash doesn't kill others)
- Threads for **shared-memory parallelism** (faster communication)
- Python GIL means threads don't give CPU parallelism — use processes
- Thread creation is ~10x cheaper than process creation

**Gotcha**: In Python, \`threading\` doesn't speed up CPU-bound work due to the GIL. Use \`multiprocessing\` for true parallelism.

---

## Key Takeaways

✅ A **process** is a running program with its own memory space  
✅ A **thread** is a lightweight execution unit sharing process memory  
✅ Use **processes** for isolation and CPU-bound work (in Python)  
✅ Use **threads** for I/O-bound work and shared-memory parallelism  
✅ **Context switching** has real performance cost  
✅ Shared memory between threads requires **synchronization** (next lesson!)
`,
    },

    // Step 2-1-2: Memory Management
    'step-2-1-2': {
        title: 'Memory Management',
        content: `# Memory Management

## Why This Matters

Every variable you create, every object you instantiate, every function you call — they all need a home in memory. Understanding how the OS manages this precious resource is crucial for:

- Writing memory-efficient programs
- Debugging segmentation faults and memory leaks
- Building high-performance systems that don't crash

---

## The Library Analogy 📚

Think of physical memory (RAM) as a **library with limited study rooms**:

| Library | Memory |
|---------|--------|
| **Study rooms** | Physical memory frames (fixed-size slots) |
| **Books** | Data (your variables, objects) |
| **Library card** | Virtual address (your "ticket" to access data) |
| **Librarian** | Operating System (manages who gets what room) |
| **Storage room** | Disk (overflow when rooms are full) |

The key insight: You don't need *all* your books in study rooms *all* the time. You can store some in the back and fetch them when needed. This is **virtual memory**.

---

## The Memory Hierarchy

Not all memory is created equal. Closer to the CPU = faster but smaller:

\`\`\`mermaid
flowchart TB
    subgraph hierarchy["Memory Hierarchy"]
        direction TB
        R["Registers ~1 cycle ~KB"] --> L1["L1 Cache ~4 cycles ~64KB"]
        L1 --> L2["L2 Cache ~12 cycles ~256KB"]
        L2 --> L3["L3 Cache ~40 cycles ~8MB"]
        L3 --> RAM["RAM ~100+ cycles ~16GB"]
        RAM --> D["Disk ~10M cycles ~1TB"]
    end
    style hierarchy fill:#1e1b4b,stroke:#a78bfa
\`\`\`

**Note**: Faster ↑ | Larger ↓

**Key insight**: A cache miss to RAM is 100x slower than a cache hit. A page fault (accessing disk) is 100,000x slower!

---

## Virtual Memory: The Grand Illusion

**Definition**: **Virtual memory** gives each process the *illusion* of having the entire address space to itself, even though physical RAM is shared.

### How It Works

\`\`\`mermaid
flowchart TB
    subgraph procA["Process A"]
        A1["0x0000: Code"]
        A2["0x1000: Data"]
        A3["0x2000: Heap"]
    end
    subgraph procB["Process B"]
        B1["0x0000: Code"]
        B2["0x1000: Data"]
        B3["0x2000: Heap"]
    end
    procA --> PTA["Page Table A"]
    procB --> PTB["Page Table B"]
    PTA --> RAM
    PTB --> RAM
    subgraph RAM["Physical RAM"]
        F1["Frame 1 B code"]
        F3["Frame 3 A code"]
        F5["Frame 5 A heap"]
        F7["Frame 7 B data"]
    end
    style procA fill:#1e1b4b,stroke:#a78bfa
    style procB fill:#1e1b4b,stroke:#a78bfa
    style RAM fill:#0f172a,stroke:#22c55e
\`\`\`

### Benefits

1. **Isolation**: Process A can't access Process B's memory
2. **Simplicity**: Every process thinks it starts at address 0
3. **Overcommit**: Total virtual memory can exceed physical RAM

---

## Paging: Dividing Memory into Chunks

**Definition**: **Paging** divides virtual and physical memory into fixed-size blocks called **pages** (virtual) and **frames** (physical), typically 4KB each.

### The Page Table

Each process has a **page table** that maps virtual pages to physical frames:

| Virtual Page | Physical Frame | Present? |
|-------------|----------------|----------|
| Page 0 | Frame 5 | ✓ |
| Page 1 | Frame 12 | ✓ |
| Page 2 | (on disk) | ✗ ← Page Fault! |
| Page 3 | Frame 1 | ✓ |

### What Happens on a Page Fault?

1. CPU tries to access virtual address in Page 2
2. Page table says "not in RAM" → **Page fault!**
3. OS pauses process, loads page from disk into a free frame
4. Updates page table, resumes process
5. **Cost**: ~10 milliseconds (that's MILLIONS of CPU cycles)

---

## Page Replacement Algorithms

When RAM is full and a new page is needed, which page gets evicted?

| Algorithm | Strategy | Pros/Cons |
|-----------|----------|-----------|
| **FIFO** | Evict oldest page | Simple, but may evict frequently-used pages |
| **LRU** | Evict least recently used | Good, but expensive to track exactly |
| **Clock** | Circular scan with "used" bits | Practical approximation of LRU |
| **Optimal** | Evict page used furthest in future | Impossible (requires predicting the future!) |

### Connection to Data Structures

Remember the **LRU Cache** from data structures? Same algorithm! Often implemented with a **HashMap + Doubly Linked List**.

---

## Stack vs Heap: Two Ways to Allocate

### The Stack (Automatic)

- **Fast**: Just move the stack pointer
- **LIFO**: Last allocated, first freed
- **Limited**: Typically 1-8MB per thread
- **Use for**: Local variables, function arguments

\`\`\`cpp
void foo() {
    int x = 42;       // Allocated on stack
    int arr[100];     // Also on stack
}  // x and arr automatically freed here
\`\`\`

### The Heap (Manual)

- **Flexible**: Allocate any size, any time
- **Persistent**: Lives until explicitly freed
- **Fragmented**: Can develop holes over time
- **Use for**: Dynamic data, large objects

\`\`\`cpp
void bar() {
    int* p = new int[1000];  // Allocated on heap
    // ... use p ...
    delete[] p;               // Must manually free!
}
\`\`\`

---

## Code Examples

### Python Memory (Abstracted)

\`\`\`python
# Python manages memory automatically (garbage collection)
my_list = [1, 2, 3]  # Allocated on heap
my_list.append(4)    # May reallocate to grow

# When no references remain, garbage collector frees it
my_list = None  # Old list is now eligible for GC
\`\`\`

### C/C++ Memory (Manual Control)

\`\`\`cpp
#include <cstdlib>  // C-style
#include <memory>   // Modern C++

// C-style (error-prone)
int* arr = (int*)malloc(10 * sizeof(int));
free(arr);

// C++ raw pointers (still manual)
int* arr2 = new int[10];
delete[] arr2;

// Modern C++ (RAII - automatic cleanup)
auto ptr = std::make_unique<int[]>(10);
// Automatically freed when ptr goes out of scope!
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Explain the difference between stack and heap"
2. "What is virtual memory and why do we need it?"
3. "What happens when you access memory that's been freed?"

**Key Talking Points**:
- Virtual memory provides **isolation** and allows **overcommit**
- Page faults are expensive — locality of reference matters
- Stack is fast but limited; heap is flexible but requires management
- Modern C++ uses **RAII** (smart pointers) to prevent memory leaks

**Gotcha**: In C++, \`delete\` on a null pointer is safe, but \`delete\` on an already-freed pointer is **undefined behavior** (double-free bug).

---

## Key Takeaways

✅ **Memory hierarchy**: Registers → Cache → RAM → Disk (speed vs size tradeoff)  
✅ **Virtual memory**: Each process sees its own private address space  
✅ **Paging**: Memory divided into fixed-size pages for efficient management  
✅ **Page faults**: Accessing memory on disk is ~100,000x slower than RAM  
✅ **Stack**: Fast, automatic, limited size (local variables)  
✅ **Heap**: Flexible, manual/GC, unlimited size (dynamic allocation)  
✅ Use **smart pointers** in C++ to avoid memory leaks
`,
    },

    // Step 2-1-3: Concurrency & Synchronization
    'step-2-1-3': {
        title: 'Concurrency & Synchronization',
        content: `# Concurrency & Synchronization

## Why This Matters

In the previous lesson, we saw that threads share memory. This is powerful — but dangerous. When two threads modify the same data simultaneously, **chaos ensues**. This lesson teaches you how to coordinate threads safely.

Without proper synchronization:
- Bank accounts lose money (or create it from thin air!)
- Data structures become corrupted
- Programs crash with impossible-to-reproduce bugs

---

## The Bathroom Lock Analogy 🚽

Imagine a single-occupancy bathroom at a coffee shop:

| Bathroom | Thread Synchronization |
|----------|----------------------|
| **Bathroom** | Critical section (shared resource) |
| **Lock** | Mutex (only one person at a time) |
| **Turning the lock** | Acquiring the mutex |
| **Opening after done** | Releasing the mutex |
| **Line outside** | Threads waiting for the lock |

**The rule**: Only one person can use the bathroom at a time. Everyone else waits in line.

---

## The Race Condition Problem

**Definition**: A **race condition** occurs when the behavior of a program depends on the *timing* of thread execution — a race you can't control.

### The Classic Example

\`\`\`python
counter = 0

def increment():
    global counter
    for _ in range(100000):
        counter += 1  # Looks atomic, but ISN'T!
\`\`\`

**What's happening under the hood?**

\`counter += 1\` actually expands to three operations:

\`\`\`
1. READ:  temp = counter     (load from memory)
2. ADD:   temp = temp + 1    (increment)
3. WRITE: counter = temp     (store back to memory)
\`\`\`

Two threads interleaving:

\`\`\`mermaid
sequenceDiagram
    participant A as Thread A
    participant M as Memory counter
    participant B as Thread B
    A->>M: READ counter = 0
    B->>M: READ counter = 0
    A->>A: ADD temp = 1
    B->>B: ADD temp = 1
    A->>M: WRITE counter = 1
    B->>M: WRITE counter = 1
    Note over M: Expected: 2, Actual: 1 - Lost update!
\`\`\`

---

## Mutex: The Universal Lock

**Definition**: A **mutex** (mutual exclusion) ensures only ONE thread can access a critical section at a time.

### Python Implementation

\`\`\`python
import threading

lock = threading.Lock()
counter = 0

def safe_increment():
    global counter
    for _ in range(100000):
        lock.acquire()      # Wait for lock
        counter += 1        # Critical section
        lock.release()      # Release for others

# Better: use context manager
def better_increment():
    global counter
    for _ in range(100000):
        with lock:          # Auto-acquire and release
            counter += 1
\`\`\`

### C++ Implementation

\`\`\`cpp
#include <mutex>

std::mutex mtx;
int counter = 0;

void increment() {
    for (int i = 0; i < 100000; ++i) {
        std::lock_guard<std::mutex> guard(mtx);  // RAII!
        ++counter;
    }  // Lock automatically released here
}
\`\`\`

---

## Semaphore: Counting Lock

**Definition**: A **semaphore** allows up to N threads to access a resource simultaneously.

### The Analogy

Think of a parking lot with 3 spaces:
- Cars enter until all 3 spots are full
- New arrivals wait until someone leaves

\`\`\`python
import threading

# Only 3 threads can run do_work() simultaneously
semaphore = threading.Semaphore(3)

def limited_access():
    with semaphore:
        do_work()  # At most 3 threads here at once
\`\`\`

### Mutex vs Semaphore

| Feature | Mutex | Semaphore(N) |
|---------|-------|--------------|
| Concurrent access | 1 thread | N threads |
| Use case | Exclusive access | Resource pooling |
| Example | Writing to file | Connection pool |

---

## Deadlock: The Deadly Embrace

**Definition**: **Deadlock** occurs when two or more threads are waiting for each other, and none can proceed.

### The Dining Philosophers Problem

Five philosophers sit at a round table. Each needs two forks to eat. If everyone picks up their left fork first and waits for the right fork — **deadlock!**

\`\`\`mermaid
flowchart TB
    subgraph table["Dining Philosophers"]
        P1((P1)) --- F1[🍴]
        F1 --- P2((P2))
        P2 --- F2[🍴]
        F2 --- P3((P3))
        P3 --- F3[🍴]
        F3 --- P4((P4))
        P4 --- F4[🍴]
        F4 --- P5((P5))
        P5 --- F5[🍴]
        F5 --- P1
    end
    style table fill:#1e1b4b,stroke:#a78bfa
\`\`\`

**Problem**: Everyone holds left fork, waits for right. Forever.

### The Four Conditions (All Required)

\`\`\`mermaid
flowchart TB
    subgraph deadlock["DEADLOCK occurs when:"]
        direction TB
        C1["1. Mutual Exclusion: Resources held exclusively"]
        C2["2. Hold and Wait: Thread holds one resource while waiting for another"]
        C3["3. No Preemption: Resources cannot be forcibly taken"]
        C4["4. Circular Wait: A→B→C→A waiting cycle"]
    end
    style deadlock fill:#7f1d1d,stroke:#ef4444
\`\`\`

### How to Prevent Deadlock

**Strategy 1: Lock Ordering** - Always acquire locks in the same order

\`\`\`python
# Bad: can deadlock
def transfer_bad(from_acc, to_acc, amount):
    with from_acc.lock:
        with to_acc.lock:
            # ...

# Good: lock by account ID order
def transfer_good(from_acc, to_acc, amount):
    first, second = sorted([from_acc, to_acc], key=lambda a: a.id)
    with first.lock:
        with second.lock:
            # ...
\`\`\`

---

## Producer-Consumer Pattern

A classic synchronization pattern: producers add items, consumers take them.

\`\`\`python
from queue import Queue
from threading import Thread

queue = Queue(maxsize=10)  # Bounded buffer

def producer():
    for i in range(20):
        queue.put(i)    # Blocks if queue is full
        print(f"Produced {i}")

def consumer():
    while True:
        item = queue.get()  # Blocks if queue is empty
        print(f"Consumed {item}")
        queue.task_done()

# Python's Queue handles all synchronization internally!
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "What is a race condition? Give an example."
2. "How do you prevent deadlock?"
3. "What's the difference between mutex and semaphore?"

**Key Talking Points**:
- Race conditions occur when threads access shared data without synchronization
- Mutex = binary lock (0 or 1 threads)
- Semaphore = counting lock (0 to N threads)
- Deadlock prevention: lock ordering, timeouts, or detect-and-recover

**Gotcha**: In Python, the Global Interpreter Lock (GIL) prevents true parallel execution of Python bytecode, but you still need locks for thread-safe access to shared data structures!

---

## Key Takeaways

✅ **Race conditions** occur when threads access shared data unsafely  
✅ **Mutex** ensures exclusive access (one thread at a time)  
✅ **Semaphore** limits concurrent access to N threads  
✅ **Deadlock** requires all 4 conditions — break any one to prevent it  
✅ Use **lock ordering** to prevent circular wait  
✅ Prefer **higher-level constructs** (Queue, thread pools) over raw locks  
✅ Always use **RAII/context managers** to ensure locks are released
`,
    },

    // Step 2-1-4: File Systems
    'step-2-1-4': {
        title: 'File Systems',
        content: `# File Systems

## Why This Matters

Every time you save a document, download a file, or install a program, the file system is at work. It's the **bridge between your data and the physical disk** — turning abstract bytes into something you can name, organize, and retrieve.

Understanding file systems helps you:
- Debug "disk full" errors even when there's space left
- Understand why SSDs are faster than HDDs (it's not just speed!)
- Build systems that don't lose data on crashes

---

## The Filing Cabinet Analogy 🗄️

Think of a file system like an office filing cabinet:

| Filing Cabinet | File System |
|----------------|-------------|
| **Cabinet** | Disk partition |
| **Index cards** | Inodes (file metadata) |
| **Folder labels** | Directory entries |
| **Actual documents** | Data blocks |
| **Cabinet catalog** | Superblock |

**Key insight**: The index card (inode) tells you WHERE the document is stored, but the index card itself doesn't contain the document!

---

## File System Architecture

A typical Unix file system is organized as:

\`\`\`mermaid
flowchart LR
    subgraph disk[" "]
        A["Boot Block<br>↓<br>Boot code"] --> B["Superblock<br>↓<br>Metadata"]
        B --> C["Inode Table<br>↓<br>File info"]
        C --> D["Data Blocks<br>↓<br>Actual data"]
    end
    style disk fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### The Superblock

Contains critical filesystem metadata:
- Total size of filesystem
- Number of inodes (max number of files)
- Number of free blocks
- Location of free block list

---

## Inodes: The Heart of Unix File Systems

**Definition**: An **inode** (index node) stores all metadata about a file EXCEPT its name.

### What's Inside an Inode?

\`\`\`mermaid
flowchart TB
    subgraph inode["INODE #12847"]
        A["File Type: Regular file"]
        B["Permissions: rwxr-xr-x"]
        C["Owner: mansoor"]
        D["Group: staff"]
        E["Size: 4,096 bytes"]
        F["Timestamps: atime, mtime, ctime"]
        G["Link Count: 1"]
        H["Data Blocks: 52, 107, 234"]
    end
    style inode fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### Why Separate Names and Inodes?

This separation enables powerful features:
- **Hard links**: Multiple names pointing to the same inode
- **Efficient renames**: Just update directory entry, not data
- **Consistent metadata**: One source of truth

\`\`\`bash
# Create a hard link — both names share inode 12847
ln original.txt link.txt

# Both point to SAME data; deleting one doesn't affect the other
ls -li  # Shows inode number
\`\`\`

---

## Directory Structure

A directory is just a special file that contains name→inode mappings:

\`\`\`
Directory: /home/user/
┌──────────────┬────────────┐
│    Name      │   Inode    │
├──────────────┼────────────┤
│ .            │   12840    │ ← Current dir
│ ..           │   12830    │ ← Parent dir  
│ documents/   │   12850    │
│ .bashrc      │   12851    │
│ notes.txt    │   12852    │
└──────────────┴────────────┘
\`\`\`

### Connection to Trees

The directory hierarchy forms a **tree** (like in data structures!):
- Root node: /
- Internal nodes: directories
- Leaf nodes: files

---

## How File Access Works

When you run \`cat /home/user/notes.txt\`:

\`\`\`
1. Start at root inode (inode 2)
2. Read root directory → find "home" → inode 10
3. Read inode 10 → find "user" → inode 12840
4. Read inode 12840 → find "notes.txt" → inode 12852
5. Read inode 12852 → get data block pointers
6. Read data blocks → return file contents
\`\`\`

**That's 4+ disk reads** just to find the file! This is why:
- Directory caching matters
- Deep paths are slower than shallow ones

---

## Journaling: Crash Protection

**Problem**: What if power fails mid-write? The file system could be left in an inconsistent state.

**Solution**: Write a **journal** (log) of changes BEFORE making them:

\`\`\`
1. Write to journal: "About to update inode 12852"
2. Write to journal: "About to update data block 234"
3. Actually update inode 12852
4. Actually update data block 234
5. Mark journal entry as complete
\`\`\`

If crash happens at step 3, on reboot:
- Check journal → see incomplete transaction
- **Replay** or **undo** changes
- Filesystem stays consistent!

---

## Common File Systems

| File System | OS | Key Features |
|-------------|-----|--------------|
| **ext4** | Linux | Journaling, up to 1 EB, extents |
| **NTFS** | Windows | ACLs, encryption, compression |
| **APFS** | macOS | Copy-on-write, snapshots, encryption |
| **ZFS** | FreeBSD | Checksums, RAID-Z, snapshots |
| **FAT32** | Universal | Simple, max 4GB files, no journaling |

---

## Code Examples

### Python File I/O

\`\`\`python
# Always use context managers — ensures file is closed!
with open('data.txt', 'r') as f:
    content = f.read()

with open('output.txt', 'w') as f:
    f.write('Hello, World!')

# Reading line by line (memory efficient)
with open('large_file.txt', 'r') as f:
    for line in f:
        process(line)
\`\`\`

### C File Operations (System Calls)

\`\`\`c
#include <fcntl.h>
#include <unistd.h>

int fd = open("file.txt", O_RDONLY);
char buffer[1024];
ssize_t bytes = read(fd, buffer, sizeof(buffer));
close(fd);
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "What is an inode?"
2. "How does journaling prevent data corruption?"
3. "What's the difference between a hard link and soft link?"

**Key Talking Points**:
- Inodes store metadata, directory entries store names
- Hard links share inodes; soft links are just path strings
- Journaling writes intent before action
- File descriptors are per-process handles to open files

**Gotcha**: "Disk full" can occur when you run out of inodes (too many small files) even if you have free blocks!

---

## Key Takeaways

✅ **File systems** map names to data blocks on disk  
✅ **Inodes** store file metadata (permissions, size, block pointers)  
✅ **Directories** are just files containing name→inode mappings  
✅ **Journaling** (ext4, NTFS) prevents data corruption on crashes  
✅ **Hard links** share inodes; **soft links** are path pointers  
✅ Understanding file systems explains why \`mv\` within a partition is instant but \`cp\` is slow
`,
    },

    // Step 2-2-1: OSI Model & TCP/IP
    'step-2-2-1': {
        title: 'OSI Model & TCP/IP',
        content: `# OSI Model & TCP/IP

## Why This Matters

Every time you visit a website, send a message, or stream a video, your data travels through a complex stack of protocols. Understanding these layers is essential for:

- Debugging network issues ("why is my request timing out?")
- Designing distributed systems that handle failures gracefully
- Answering networking interview questions with confidence

---

## The Postal Service Analogy

Think of network communication like sending a letter:

| Postal Service | Network |
|----------------|---------|
| **Your letter** | Application data (HTTP request) |
| **Envelope** | Transport layer (TCP segment) |
| **Address on envelope** | Network layer (IP packet) |
| **Postal truck route** | Data Link layer (Ethernet frame) |
| **Physical roads** | Physical layer (cables, signals) |

Each layer wraps the data from the layer above, adding its own header — like putting a letter in an envelope, then in a package, then on a truck.

---

## The OSI 7-Layer Model

The OSI model is a *conceptual* framework for understanding network communication:

\`\`\`mermaid
flowchart TB
    subgraph osi["OSI 7-Layer Model"]
        direction TB
        L7["Layer 7: Application - HTTP, FTP, DNS, SMTP"] --> L6["Layer 6: Presentation - SSL/TLS, encryption"]
        L6 --> L5["Layer 5: Session - Sockets, sessions"]
        L5 --> L4["Layer 4: Transport - TCP, UDP"]
        L4 --> L3["Layer 3: Network - IP, ICMP, routing"]
        L3 --> L2["Layer 2: Data Link - Ethernet, MAC, switches"]
        L2 --> L1["Layer 1: Physical - Cables, radio waves"]
    end
    style osi fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### Memory Trick

**"Please Do Not Throw Sausage Pizza Away"** (Physical to Application)

---

## The TCP/IP Model (What's Actually Used)

In practice, the internet uses a *simpler* 4-layer model:

\`\`\`mermaid
flowchart TB
    subgraph tcpip["TCP/IP Model"]
        direction TB
        A["Application - HTTP, DNS, FTP, SSH"] --> T["Transport - TCP, UDP"]
        T --> I["Internet - IP, ICMP"]
        I --> N["Network Access - Ethernet, WiFi, ARP"]
    end
    style tcpip fill:#1e1b4b,stroke:#a78bfa
\`\`\`

---

## IP Addresses: Your Network Identity

**Definition**: An **IP address** uniquely identifies a device on a network.

### IPv4 vs IPv6

| Feature | IPv4 | IPv6 |
|---------|------|------|
| **Format** | 32-bit (4 octets) | 128-bit (8 groups) |
| **Example** | 192.168.1.1 | 2001:0db8:85a3::8a2e:0370:7334 |
| **Total addresses** | ~4.3 billion | ~340 undecillion |

### Special IP Addresses

- **127.0.0.1** — Localhost (yourself)
- **0.0.0.0** — "Any" address (listen on all interfaces)
- **192.168.x.x** — Private network (home/office)

---

## Ports: The Apartment Number

If an IP address is a building address, a **port** is the apartment number.

| Port | Service |
|------|---------|
| 22 | SSH |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |

---

## TCP vs UDP: Reliability Trade-offs

### TCP (Transmission Control Protocol)

**The phone call** — Connection-oriented, reliable, ordered.

- Guaranteed delivery (retransmissions)
- Ordered packets (sequence numbers)
- Flow control (don't overwhelm receiver)
- Use for: Web, email, file transfer, SSH

### UDP (User Datagram Protocol)

**The postcard** — Connectionless, fast, no guarantees.

- Low latency (no handshake)
- Lightweight headers (8 bytes)
- No guaranteed delivery or ordering
- Use for: Gaming, streaming, DNS, VoIP

| Feature | TCP | UDP |
|---------|-----|-----|
| **Connection** | Connection-oriented | Connectionless |
| **Reliability** | Guaranteed delivery | Best effort |
| **Ordering** | Maintains order | No ordering |
| **Speed** | Slower (overhead) | Faster |

---

## TCP Three-Way Handshake

Before any data is sent, TCP establishes a connection:

\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    C->>S: SYN (I want to talk)
    S->>C: SYN-ACK (OK, I want to talk too)
    C->>S: ACK (Got it, lets go)
    Note over C,S: Connection Established!
\`\`\`

---

## DNS: The Phone Book of the Internet

**Definition**: **DNS** (Domain Name System) translates human-readable names to IP addresses.

\`\`\`
google.com  →  DNS  →  142.250.80.46
\`\`\`

### DNS Resolution Steps

1. Browser checks local cache
2. OS checks its cache
3. Query recursive resolver (ISP)
4. Resolver queries root DNS → TLD → Authoritative
5. Response cached at each level

---

## Code Examples

### Python: DNS Lookup

\`\`\`python
import socket

# DNS lookup
ip = socket.gethostbyname('google.com')
print(f"Google's IP: {ip}")
\`\`\`

### Python: Check TCP Port

\`\`\`python
import socket

def check_port(host, port, timeout=3):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        sock.connect((host, port))
        return True
    except (socket.timeout, socket.error):
        return False
    finally:
        sock.close()

print(check_port('google.com', 443))  # True (HTTPS)
\`\`\`

---

## Interview Insights

**Common Questions**:
1. "What happens when you type google.com in a browser?"
2. "Explain the difference between TCP and UDP"
3. "How does TCP ensure reliable delivery?"

**Key Talking Points**:
- TCP guarantees delivery through **sequence numbers** and **acknowledgments**
- UDP is preferred for real-time applications where speed > reliability
- DNS is hierarchical: Root → TLD → Authoritative

**Gotcha**: "TCP is always better" is wrong! For live video streaming, a dropped packet is better than waiting for retransmission.

---

## Key Takeaways

✅ **OSI model** is conceptual (7 layers); **TCP/IP** is practical (4 layers)  
✅ **IP addresses** identify hosts; **ports** identify services  
✅ **TCP** provides reliable, ordered delivery (web, email)  
✅ **UDP** is fast and lightweight (streaming, gaming)  
✅ **Three-way handshake** establishes TCP connections (SYN, SYN-ACK, ACK)  
✅ **DNS** translates domain names to IP addresses
`,
    },

    // Step 2-2-2: HTTP & REST
    'step-2-2-2': {
        title: 'HTTP & REST',
        content: `# HTTP & REST

## Why This Matters

HTTP is the language of the web. Every time you:
- Load a webpage
- Submit a form
- Fetch data from an API
- Upload a file

...you're using HTTP. Understanding HTTP and REST is fundamental for:
- Building web applications and APIs
- Debugging network issues
- Acing backend/full-stack interviews

---

## The Restaurant Ordering Analogy

Think of HTTP like ordering at a restaurant:

| Restaurant | HTTP |
|------------|------|
| **Menu** | API endpoints |
| **Order** | HTTP Request |
| **Kitchen prepares** | Server processing |
| **Food delivered** | HTTP Response |
| **Order number** | Status code |

---

## HTTP Request Anatomy

Every HTTP request has these components:

\`\`\`mermaid
flowchart TB
    subgraph req["HTTP Request"]
        direction TB
        RL["GET /api/users/123 HTTP/1.1 - Request Line"]
        H1["Host: api.example.com"]
        H2["Authorization: Bearer abc123"]
        H3["Content-Type: application/json"]
        B["Body: { name: Alice }"]
    end
    style req fill:#1e1b4b,stroke:#a78bfa
\`\`\`

---

## HTTP Methods: CRUD Operations

| Method | Purpose | Idempotent? | Safe? |
|--------|---------|-------------|-------|
| **GET** | Read/retrieve | Yes | Yes |
| **POST** | Create new | No | No |
| **PUT** | Replace entire | Yes | No |
| **PATCH** | Update partial | Yes | No |
| **DELETE** | Remove | Yes | No |

**Idempotent**: Calling multiple times has the same effect as calling once.
**Safe**: Doesn't modify server state.

---

## HTTP Status Codes

Status codes tell you what happened:

| Range | Category | Examples |
|-------|----------|----------|
| **1xx** | Informational | 100 Continue |
| **2xx** | Success | 200 OK, 201 Created |
| **3xx** | Redirection | 301 Moved, 304 Not Modified |
| **4xx** | Client Error | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **5xx** | Server Error | 500 Internal Error, 503 Service Unavailable |

### The Most Common Ones

| Code | Name | When to Use |
|------|------|-------------|
| 200 | OK | Successful GET/PUT/PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Logged in but not allowed |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Error | Server bug |

---

## REST: Representational State Transfer

**Definition**: REST is an *architectural style* for designing network APIs.

### REST Principles

1. **Stateless**: Each request contains all info needed (no server-side session)
2. **Resource-Oriented**: URLs represent resources (nouns, not verbs)
3. **Uniform Interface**: Consistent HTTP methods and response formats
4. **Client-Server**: Separation of concerns

### RESTful URL Design

\`\`\`
Good (resource-oriented):
  GET    /users           → List users
  GET    /users/123       → Get user 123
  POST   /users           → Create user
  PUT    /users/123       → Replace user 123
  DELETE /users/123       → Delete user 123

Bad (action-oriented):
  GET    /getUser?id=123
  POST   /createUser
  POST   /deleteUser
\`\`\`

---

## Code Examples

### Python: Making HTTP Requests

\`\`\`python
import requests

# GET - retrieve data
response = requests.get('https://api.example.com/users')
users = response.json()

# POST - create new resource
new_user = {'name': 'Alice', 'email': 'alice@example.com'}
response = requests.post(
    'https://api.example.com/users',
    json=new_user,
    headers={'Authorization': 'Bearer token123'}
)
print(response.status_code)  # 201

# PUT - replace resource
response = requests.put(
    'https://api.example.com/users/123',
    json={'name': 'Alice Updated', 'email': 'alice@new.com'}
)

# DELETE - remove resource
response = requests.delete('https://api.example.com/users/123')
print(response.status_code)  # 204
\`\`\`

### Handling Errors

\`\`\`python
response = requests.get('https://api.example.com/users/999')

if response.status_code == 404:
    print("User not found")
elif response.status_code == 401:
    print("Please log in")
elif response.status_code >= 500:
    print("Server error, try again later")
elif response.ok:  # 200-299
    print(response.json())
\`\`\`

---

## Headers You Should Know

| Header | Purpose | Example |
|--------|---------|---------|
| Content-Type | Body format | application/json |
| Authorization | Auth credentials | Bearer abc123 |
| Accept | Desired response format | application/json |
| Cache-Control | Caching rules | max-age=3600 |
| User-Agent | Client identifier | Mozilla/5.0... |

---

## Connection to Previous Topics

- **TCP**: HTTP runs on top of TCP (reliable, ordered delivery)
- **DNS**: Before HTTP request, browser resolves domain to IP
- **Ports**: HTTP uses port 80, HTTPS uses port 443

---

## Interview Insights

**Common Questions**:
1. "What's the difference between PUT and PATCH?"
2. "Explain REST and its principles"
3. "What status code would you return for [scenario]?"
4. "How would you design a REST API for [resource]?"

**Key Talking Points**:
- PUT replaces the entire resource; PATCH updates partial fields
- REST is stateless — no server-side sessions
- GET should never modify data (safe operation)
- Use proper status codes for clear communication

**Gotcha**: POST is not idempotent — calling it twice may create two resources!

---

## Key Takeaways

✅ HTTP is a request-response protocol for web communication  
✅ Methods have semantics: GET (read), POST (create), PUT (replace), DELETE (remove)  
✅ Status codes communicate results: 2xx success, 4xx client error, 5xx server error  
✅ REST is resource-oriented — URLs should be nouns, not verbs  
✅ Every request should include proper headers (Content-Type, Authorization)  
✅ REST APIs should be stateless — no server-side sessions
`,
    },

    // Step 2-2-3: Socket Programming
    'step-2-2-3': {
        title: 'Socket Programming',
        content: `# Socket Programming

## Why This Matters

When you use HTTP libraries like \`requests\`, they hide the low-level networking details. But understanding sockets gives you:

- Deep understanding of how network communication works
- Ability to build custom protocols (chat apps, game servers)
- Skills to debug complex network issues
- A strong foundation for systems interviews

---

## The Phone Call Analogy

Think of sockets like phone calls:

| Phone Call | Socket |
|------------|--------|
| **Phone number** | IP address + port |
| **Pick up phone** | Create socket |
| **Dial** | Connect (client) |
| **Wait for ring** | Listen/Accept (server) |
| **Talk** | Send/Receive data |
| **Hang up** | Close socket |

---

## What is a Socket?

**Definition**: A **socket** is an endpoint for communication between two machines over a network.

\`\`\`mermaid
flowchart LR
    subgraph client["Client 192.168.1.10"]
        CS["Socket port 50123"]
    end
    subgraph server["Server 192.168.1.20"]
        SS["Socket port 8080"]
    end
    CS <-->|TCP| SS
    style client fill:#1e1b4b,stroke:#a78bfa
    style server fill:#1e1b4b,stroke:#22c55e
\`\`\`

---

## Socket Types

| Type | Protocol | Use Case |
|------|----------|----------|
| **SOCK_STREAM** | TCP | Web servers, file transfer |
| **SOCK_DGRAM** | UDP | Gaming, streaming, DNS |

---

## TCP Server/Client Lifecycle

\`\`\`mermaid
sequenceDiagram
    participant S as Server
    participant C as Client
    Note over S: socket() - Create
    Note over S: bind() - Assign address
    Note over S: listen() - Wait
    Note over C: socket() - Create
    C->>S: connect()
    Note over S: accept()
    C->>S: send()
    Note over S: recv()
    S->>C: send()
    Note over C: recv()
    Note over S,C: close() - End connection
\`\`\`

---

## Code Examples

### TCP Server (Python)

\`\`\`python
import socket

# 1. Create socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 2. Bind to address
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('0.0.0.0', 8080))

# 3. Listen for connections
server.listen(5)  # Backlog of 5 pending connections
print("Server listening on port 8080...")

# 4. Accept and handle connections
while True:
    client_socket, address = server.accept()
    print(f"Connection from {address}")
    
    # 5. Receive data
    data = client_socket.recv(1024)
    print(f"Received: {data.decode()}")
    
    # 6. Send response
    response = "Hello from server!"
    client_socket.send(response.encode())
    
    # 7. Close client connection
    client_socket.close()
\`\`\`

### TCP Client (Python)

\`\`\`python
import socket

# 1. Create socket
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 2. Connect to server
client.connect(('localhost', 8080))

# 3. Send data
message = "Hello from client!"
client.send(message.encode())

# 4. Receive response
response = client.recv(1024)
print(f"Server replied: {response.decode()}")

# 5. Close connection
client.close()
\`\`\`

---

## Handling Multiple Clients

The simple server above can only handle one client at a time. Here are patterns for handling multiple clients:

### Pattern 1: Threading

\`\`\`python
import socket
import threading

def handle_client(client_socket, address):
    print(f"New connection: {address}")
    while True:
        data = client_socket.recv(1024)
        if not data:
            break
        client_socket.send(data)  # Echo back
    client_socket.close()

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('0.0.0.0', 8080))
server.listen(5)

while True:
    client, addr = server.accept()
    thread = threading.Thread(target=handle_client, args=(client, addr))
    thread.start()
\`\`\`

### Pattern 2: select() for I/O Multiplexing

\`\`\`python
import socket
import select

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('0.0.0.0', 8080))
server.listen(5)
server.setblocking(False)

sockets = [server]

while True:
    readable, _, _ = select.select(sockets, [], [])
    
    for sock in readable:
        if sock is server:
            # New connection
            client, addr = server.accept()
            client.setblocking(False)
            sockets.append(client)
            print(f"New connection: {addr}")
        else:
            # Data from existing client
            data = sock.recv(1024)
            if data:
                sock.send(data)  # Echo
            else:
                sockets.remove(sock)
                sock.close()
\`\`\`

---

## UDP Sockets (Connectionless)

UDP doesn't require connection setup:

\`\`\`python
# UDP Server
import socket

server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server.bind(('0.0.0.0', 8080))

while True:
    data, client_addr = server.recvfrom(1024)
    print(f"From {client_addr}: {data.decode()}")
    server.sendto(b"Received!", client_addr)
\`\`\`

\`\`\`python
# UDP Client
import socket

client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client.sendto(b"Hello!", ('localhost', 8080))
response, _ = client.recvfrom(1024)
print(response.decode())
\`\`\`

---

## Common Gotchas

| Problem | Cause | Solution |
|---------|-------|----------|
| "Address already in use" | Port still bound after restart | Use SO_REUSEADDR |
| Connection hangs | No timeout set | Set socket.settimeout() |
| Partial data received | TCP doesn't preserve message boundaries | Use length prefix or delimiter |
| Server handles one client | Blocking accept/recv | Use threads, select, or async |

---

## Connection to Previous Topics

- **OSI/TCP**: Sockets operate at the Transport layer (Layer 4)
- **HTTP**: HTTP libraries use sockets under the hood
- **Processes/Threads**: Multi-client servers need concurrency

---

## Interview Insights

**Common Questions**:
1. "How would you implement a chat server?"
2. "Explain the TCP handshake in terms of socket calls"
3. "What's the difference between TCP and UDP sockets?"
4. "How do you handle multiple clients?"

**Key Talking Points**:
- TCP sockets require connect/accept; UDP uses sendto/recvfrom
- select() is more scalable than threading for I/O-bound servers
- Modern servers use async I/O (asyncio, epoll, kqueue)
- Always set socket options (SO_REUSEADDR, timeouts)

**Gotcha**: TCP is a byte stream — there are no message boundaries! You must implement your own framing (length prefix or delimiter).

---

## Key Takeaways

✅ Sockets are low-level endpoints for network communication  
✅ **TCP sockets**: connection-oriented (connect/accept)  
✅ **UDP sockets**: connectionless (sendto/recvfrom)  
✅ Use **threading** or **select()** to handle multiple clients  
✅ Always use SO_REUSEADDR and set timeouts  
✅ TCP is a byte stream — implement your own message framing
`,
    },

    // Step 2-3-1: SQL Fundamentals
    'step-2-3-1': {
        title: 'SQL Fundamentals',
        content: `# SQL Fundamentals

## Why This Matters

SQL is the language of data. Every backend system, every analytics pipeline, every application with persistent storage speaks SQL (or something that looks like it). Understanding SQL deeply enables you to:

- Write efficient queries that don't bring your database to its knees
- Design schemas that scale with your application
- Debug production issues when data looks "wrong"
- Ace the SQL portion of technical interviews

---

## The Filing Cabinet Analogy 🗄️

Think of a database like a well-organized filing cabinet:

| Filing Cabinet | Database |
|----------------|----------|
| **Cabinet** | Database |
| **Drawer** | Table |
| **Folder** | Row (record) |
| **Label on folder** | Primary key |
| **Contents** | Column values |
| **Cross-references** | Foreign keys |

---

## Relational Model: Data in Tables

**Definition**: A **relational database** organizes data into **tables** (relations) with **rows** (records) and **columns** (fields).

\`\`\`mermaid
flowchart LR
    subgraph users["users table"]
        U1["id | name | email"]
        U2["1 | Alice | alice@ex.com"]
        U3["2 | Bob | bob@ex.com"]
    end
    subgraph orders["orders table"]
        O1["id | user_id | total"]
        O2["1 | 1 | 99.99"]
        O3["2 | 1 | 149.50"]
    end
    users -->|user_id FK| orders
\`\`\`

---

## CRUD Operations

The four fundamental operations on data:

### CREATE (INSERT)

\`\`\`sql
-- Insert a single row
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

-- Insert multiple rows
INSERT INTO users (name, email) VALUES
    ('Bob', 'bob@example.com'),
    ('Charlie', 'charlie@example.com');

-- Insert with returning (PostgreSQL)
INSERT INTO users (name, email)
VALUES ('Diana', 'diana@example.com')
RETURNING id, name;
\`\`\`

### READ (SELECT)

\`\`\`sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns with filtering
SELECT name, email 
FROM users 
WHERE created_at > '2024-01-01'
ORDER BY name ASC
LIMIT 10;

-- Select with alias
SELECT 
    u.name AS user_name,
    COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
\`\`\`

### UPDATE

\`\`\`sql
-- Update with condition (ALWAYS use WHERE!)
UPDATE users 
SET email = 'newemail@example.com',
    updated_at = NOW()
WHERE id = 1;

-- Update with subquery
UPDATE orders
SET status = 'cancelled'
WHERE user_id IN (
    SELECT id FROM users WHERE is_banned = true
);
\`\`\`

### DELETE

\`\`\`sql
-- Delete with condition (ALWAYS use WHERE!)
DELETE FROM users WHERE id = 1;

-- Soft delete pattern (preferred)
UPDATE users 
SET deleted_at = NOW() 
WHERE id = 1;
\`\`\`

> ⚠️ **Warning**: Always use WHERE with UPDATE and DELETE. Without it, you affect ALL rows!

---

## JOINs: Combining Tables

\`\`\`mermaid
flowchart LR
    subgraph joins["JOIN Types"]
        INNER["INNER JOIN<br/>Only matching rows"]
        LEFT["LEFT JOIN<br/>All left + matching right"]
        RIGHT["RIGHT JOIN<br/>Matching left + all right"]
        FULL["FULL JOIN<br/>All rows from both"]
    end
\`\`\`

### INNER JOIN

Returns only rows where there's a match in **both** tables:

\`\`\`sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
-- Users with no orders are excluded
\`\`\`

### LEFT JOIN

Returns **all** rows from left table, with matches from right (or NULL):

\`\`\`sql
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
-- Users with no orders show NULL for orders.total
\`\`\`

### Multiple JOINs

\`\`\`sql
SELECT 
    u.name,
    o.id AS order_id,
    p.name AS product_name
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed';
\`\`\`

---

## Aggregations & Grouping

### Aggregate Functions

| Function | Description |
|----------|-------------|
| COUNT(*) | Number of rows |
| SUM(col) | Sum of values |
| AVG(col) | Average value |
| MIN(col) | Minimum value |
| MAX(col) | Maximum value |

### GROUP BY

\`\`\`sql
SELECT 
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000  -- Filter AFTER grouping
ORDER BY avg_salary DESC;
\`\`\`

**Key insight**: WHERE filters rows *before* grouping; HAVING filters *after* grouping.

---

## Subqueries

### Scalar Subquery (returns single value)

\`\`\`sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
\`\`\`

### IN Subquery (returns list)

\`\`\`sql
SELECT name FROM users
WHERE id IN (
    SELECT user_id FROM orders
    WHERE total > 1000
);
\`\`\`

### EXISTS Subquery (returns boolean)

\`\`\`sql
SELECT name FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id AND o.status = 'pending'
);
\`\`\`

---

## Common Table Expressions (CTEs)

CTEs make complex queries readable:

\`\`\`sql
WITH high_value_customers AS (
    SELECT user_id, SUM(total) AS lifetime_value
    FROM orders
    GROUP BY user_id
    HAVING SUM(total) > 10000
),
recent_orders AS (
    SELECT user_id, COUNT(*) AS recent_count
    FROM orders
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY user_id
)
SELECT 
    u.name,
    hvc.lifetime_value,
    COALESCE(ro.recent_count, 0) AS recent_orders
FROM users u
JOIN high_value_customers hvc ON u.id = hvc.user_id
LEFT JOIN recent_orders ro ON u.id = ro.user_id;
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Write a query to find the second highest salary"
2. "Find duplicate records in a table"
3. "Difference between WHERE and HAVING?"
4. "When would you use a LEFT JOIN vs INNER JOIN?"

**Key Talking Points**:
- Always think about edge cases: NULLs, empty tables, duplicates
- Mention query optimization: indexes, avoiding SELECT *
- Discuss trade-offs: denormalization vs joins

**Classic Interview Query**:

\`\`\`sql
-- Second highest salary (handles ties)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Or using window function
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
    FROM employees
) ranked
WHERE rank = 2;
\`\`\`

---

## Key Takeaways

✅ **CRUD** = Create (INSERT), Read (SELECT), Update, Delete  
✅ **JOINs** combine tables: INNER (both match), LEFT (all left + matches)  
✅ **GROUP BY** aggregates rows; **HAVING** filters after grouping  
✅ **Subqueries** can return scalars, lists, or booleans  
✅ **CTEs** make complex queries readable and maintainable  
✅ Always use **WHERE** with UPDATE/DELETE to avoid catastrophe  
✅ Never use **SELECT *** in production — specify columns explicitly
`,
    },

    // Step 2-3-2: Indexing & B-Trees
    'step-2-3-2': {
        title: 'Indexing & B-Trees',
        content: `# Indexing & B-Trees

## Why This Matters

Without indexes, every query requires scanning every row in a table. For a table with millions of rows, this is catastrophic. Indexing is the difference between:

- A query that takes **5 milliseconds** → Great user experience
- A query that takes **5 minutes** → Application timeout, users leave

Understanding indexes is essential for:
- Writing performant database queries
- Designing scalable database schemas
- Answering database optimization interview questions

---

## The Library Analogy 📚

Imagine finding a book in a library:

| Without Index | With Index |
|---------------|------------|
| Walk through every aisle, check every book | Look up title in catalog, go directly to shelf |
| O(n) - check all rows | O(log n) - binary search in tree |
| **Full table scan** | **Index seek** |

---

## What is an Index?

**Definition**: An **index** is a data structure (usually a B-Tree) that maintains a sorted copy of column values with pointers to the actual rows.

\`\`\`mermaid
flowchart LR
    subgraph index["Index on email"]
        I1["alice@ex.com → Row 3"]
        I2["bob@ex.com → Row 1"]
        I3["charlie@ex.com → Row 7"]
    end
    subgraph table["users table"]
        R1["Row 1: Bob"]
        R3["Row 3: Alice"]
        R7["Row 7: Charlie"]
    end
    I1 --> R3
    I2 --> R1
    I3 --> R7
\`\`\`

### Creating Indexes

\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (multiple columns)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Unique index (enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email ON users(email);
\`\`\`

---

## B-Tree: The Data Structure Behind Indexes

**Definition**: A **B-Tree** is a self-balancing tree where each node can have multiple children and keys, keeping data sorted and enabling O(log n) operations.

\`\`\`mermaid
flowchart TB
    subgraph btree["B-Tree Index"]
        R["[50]"] --> L["[25, 35]"]
        R --> M["[75, 90]"]
        L --> L1["[10, 20]"]
        L --> L2["[30]"]
        L --> L3["[40, 45]"]
        M --> M1["[60, 70]"]
        M --> M2["[80, 85]"]
        M --> M3["[95, 99]"]
    end
    style btree fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### Why B-Trees?

| Property | Benefit |
|----------|---------|
| **Balanced** | O(log n) height guaranteed |
| **Wide nodes** | Fewer disk reads (each node = 1 page) |
| **Sorted leaves** | Efficient range queries |
| **Self-balancing** | No degradation over time |

### B-Tree Operations

\`\`\`
Search for key 35:
  1. Start at root [50]
  2. 35 < 50, go left to [25, 35]
  3. Found 35! Return pointer to row

Time: O(log n) disk reads
\`\`\`

---

## Index Types

| Type | Best For | Example |
|------|----------|---------|
| **B-Tree** | Range queries, sorting, equality | WHERE age > 25 |
| **Hash** | Exact match only (rare in SQL DBs) | WHERE id = 123 |
| **GIN** | Arrays, full-text search | WHERE tags @> '{sql}' |
| **GiST** | Geometric, geospatial | WHERE location <-> point |

---

## Composite Indexes

A composite index includes multiple columns. **Column order matters!**

\`\`\`sql
-- Index on (user_id, created_at)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- ✅ Uses index (leftmost columns)
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM orders WHERE user_id = 1 AND created_at > '2024-01-01';

-- ❌ Cannot use index efficiently
SELECT * FROM orders WHERE created_at > '2024-01-01';
-- user_id must be specified first!
\`\`\`

**Rule**: A composite index can be used for queries that filter on a *prefix* of its columns.

---

## When to Index (and When NOT To)

### Good Candidates ✅

- **Primary keys** (automatic in most DBs)
- **Foreign keys** (JOIN performance)
- **Frequently filtered columns** (WHERE clauses)
- **ORDER BY columns**
- **High cardinality** (many unique values)

### Poor Candidates ❌

- **Small tables** (full scan may be faster)
- **Frequently updated columns** (index maintenance overhead)
- **Low cardinality** (e.g., boolean columns)
- **Columns rarely queried**

---

## Analyzing Query Performance

### EXPLAIN Command

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';

-- Output:
-- Index Scan using idx_users_email on users
--   Index Cond: (email = 'alice@example.com'::text)
--   Actual time: 0.025..0.027 ms
--   Rows: 1
\`\`\`

### What to Look For

| Scan Type | Meaning | Performance |
|-----------|---------|-------------|
| **Index Scan** | Using index | 👍 Good |
| **Seq Scan** | Full table scan | 👎 Bad for large tables |
| **Index Only Scan** | All data from index | 👍👍 Best |
| **Bitmap Index Scan** | Multiple indexes combined | 👍 Good |

---

## The Trade-off: Reads vs Writes

\`\`\`mermaid
flowchart LR
    subgraph tradeoff["Index Trade-offs"]
        R["🔍 READ: Faster"] 
        W["✍️ WRITE: Slower"]
        S["💾 STORAGE: More space"]
    end
\`\`\`

Every index:
- **Speeds up** SELECT queries
- **Slows down** INSERT, UPDATE, DELETE (must update index too)
- **Uses disk space** (can be significant)

**Rule of thumb**: Don't over-index. Monitor slow query logs and add indexes strategically.

---

## Code Example: Python with Database

\`\`\`python
import sqlite3

conn = sqlite3.connect(':memory:')
cursor = conn.cursor()

# Create table and index
cursor.execute('''
    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        email TEXT,
        name TEXT
    )
''')
cursor.execute('CREATE INDEX idx_email ON users(email)')

# Insert data
cursor.executemany(
    'INSERT INTO users (email, name) VALUES (?, ?)',
    [('alice@ex.com', 'Alice'), ('bob@ex.com', 'Bob')]
)

# Query using index
cursor.execute('EXPLAIN QUERY PLAN SELECT * FROM users WHERE email = ?', 
               ('alice@ex.com',))
print(cursor.fetchall())
# Shows: SEARCH users USING INDEX idx_email
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "What is an index and how does it work?"
2. "When would you NOT use an index?"
3. "Explain B-Trees and why databases use them"
4. "How would you optimize a slow query?"

**Key Talking Points**:
- Indexes trade write performance for read performance
- Composite indexes require leftmost prefix for efficiency
- Always check EXPLAIN before and after adding indexes
- Over-indexing wastes space and slows writes

**Gotcha**: Adding indexes to a production database can lock tables. Use CREATE INDEX CONCURRENTLY in PostgreSQL!

---

## Key Takeaways

✅ **Indexes** are sorted data structures pointing to actual rows  
✅ **B-Trees** provide O(log n) search with wide nodes for disk efficiency  
✅ **Composite indexes** can only be used for leftmost prefix queries  
✅ Indexes **speed reads** but **slow writes** — don't over-index  
✅ Use **EXPLAIN** to verify your queries use indexes  
✅ High cardinality columns are good index candidates  
✅ Monitor slow query logs to identify missing indexes
`,
    },

    // Step 2-3-3: Transactions & ACID
    'step-2-3-3': {
        title: 'Transactions & ACID',
        content: `# Transactions & ACID

## Why This Matters

Imagine transferring money between bank accounts. If the system crashes after debiting one account but before crediting the other, money vanishes into thin air. **Transactions** prevent this disaster.

Understanding transactions is essential for:
- Building reliable financial and e-commerce systems
- Debugging "impossible" data corruption issues
- Answering database design interview questions
- Choosing the right consistency-performance trade-offs

---

## The Bank Transfer Analogy 🏦

Transferring $100 from Alice to Bob requires two operations:

\`\`\`mermaid
sequenceDiagram
    participant A as Alice Account
    participant DB as Database
    participant B as Bob Account
    Note over DB: BEGIN TRANSACTION
    DB->>A: Debit $100
    Note over A: Balance: $500 → $400
    DB->>B: Credit $100
    Note over B: Balance: $200 → $300
    Note over DB: COMMIT
    Note over A,B: Both changes are now permanent
\`\`\`

**The problem**: What if the system crashes between steps 1 and 2?

Without transactions: Alice loses $100, Bob gets nothing.
With transactions: The entire operation is rolled back — nothing happens.

---

## ACID Properties

**Definition**: **ACID** is a set of properties that guarantee database transactions are processed reliably.

\`\`\`mermaid
flowchart TB
    subgraph acid["ACID Properties"]
        A["**A**tomicity<br/>All or nothing"]
        C["**C**onsistency<br/>Valid state to valid state"]
        I["**I**solation<br/>Transactions don't interfere"]
        D["**D**urability<br/>Committed data survives crashes"]
    end
    style acid fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### Atomicity

All operations in a transaction succeed, or none do.

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Succeeds
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Fails!
ROLLBACK;  -- First update is undone
\`\`\`

### Consistency

The database moves from one valid state to another. Constraints are always satisfied.

\`\`\`sql
-- Constraint: balance >= 0
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
-- If this would make balance negative, transaction is rejected
\`\`\`

### Isolation

Concurrent transactions don't see each other's uncommitted changes (depending on isolation level).

### Durability

Once committed, data survives power outages, crashes, and disasters (via write-ahead logging).

---

## Transaction Syntax

\`\`\`sql
-- Start a transaction
BEGIN;  -- or BEGIN TRANSACTION or START TRANSACTION

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If everything is good, make it permanent
COMMIT;

-- If something went wrong, undo everything
-- ROLLBACK;
\`\`\`

### Python Example

\`\`\`python
import psycopg2

conn = psycopg2.connect("dbname=bank")
cursor = conn.cursor()

try:
    cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
    cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
    
    # Check constraint
    cursor.execute("SELECT balance FROM accounts WHERE id = 1")
    if cursor.fetchone()[0] < 0:
        raise Exception("Insufficient funds")
    
    conn.commit()  # Make changes permanent
    print("Transfer successful!")
except Exception as e:
    conn.rollback()  # Undo all changes
    print(f"Transfer failed: {e}")
finally:
    conn.close()
\`\`\`

---

## Isolation Levels

Isolation levels control what concurrent transactions can see:

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| **Read Uncommitted** | Possible | Possible | Possible |
| **Read Committed** | ✗ Prevented | Possible | Possible |
| **Repeatable Read** | ✗ Prevented | ✗ Prevented | Possible |
| **Serializable** | ✗ Prevented | ✗ Prevented | ✗ Prevented |

### What Are These Problems?

**Dirty Read**: Reading uncommitted changes from another transaction
\`\`\`
T1: UPDATE balance SET amount = 0;  -- Not committed yet
T2: SELECT amount FROM balance;     -- Reads 0 (dirty!)
T1: ROLLBACK;                       -- T2 read data that never existed
\`\`\`

**Non-Repeatable Read**: Same query returns different results within one transaction
\`\`\`
T1: SELECT balance FROM accounts WHERE id = 1;  -- Returns 100
T2: UPDATE accounts SET balance = 200 WHERE id = 1; COMMIT;
T1: SELECT balance FROM accounts WHERE id = 1;  -- Returns 200! 
\`\`\`

**Phantom Read**: New rows appear in repeated queries
\`\`\`
T1: SELECT COUNT(*) FROM orders WHERE status = 'pending';  -- Returns 5
T2: INSERT INTO orders (status) VALUES ('pending'); COMMIT;
T1: SELECT COUNT(*) FROM orders WHERE status = 'pending';  -- Returns 6!
\`\`\`

### Setting Isolation Level

\`\`\`sql
-- PostgreSQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
-- Your queries here
COMMIT;
\`\`\`

---

## Locking Strategies

### Pessimistic Locking

Lock rows before modifying to prevent conflicts:

\`\`\`sql
BEGIN;
-- Lock the row for update
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
-- Other transactions wait until we release the lock
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;  -- Lock released
\`\`\`

### Optimistic Locking

Assume no conflicts, check at commit time:

\`\`\`sql
-- Read with version number
SELECT balance, version FROM accounts WHERE id = 1;
-- Returns: balance=500, version=3

-- Update only if version hasn't changed
UPDATE accounts 
SET balance = 400, version = 4 
WHERE id = 1 AND version = 3;

-- If affected_rows = 0, someone else updated it first!
\`\`\`

### When to Use Which?

| Strategy | Use When | Trade-off |
|----------|----------|-----------|
| **Pessimistic** | High contention, short transactions | Blocks other transactions |
| **Optimistic** | Low contention, read-heavy workloads | Retries on conflict |

---

## Deadlocks

**Definition**: **Deadlock** occurs when two transactions wait for each other's locks.

\`\`\`mermaid
flowchart LR
    T1["Transaction 1<br/>Holds Lock A<br/>Wants Lock B"] 
    T2["Transaction 2<br/>Holds Lock B<br/>Wants Lock A"]
    T1 -->|waiting| T2
    T2 -->|waiting| T1
\`\`\`

### Prevention

1. **Lock ordering**: Always acquire locks in the same order
2. **Lock timeout**: Give up after waiting too long
3. **Deadlock detection**: Database detects and kills one transaction

\`\`\`sql
-- PostgreSQL: Set lock timeout
SET lock_timeout = '5s';
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Explain ACID properties with examples"
2. "What's the difference between optimistic and pessimistic locking?"
3. "How would you handle a bank transfer transaction?"
4. "What are isolation levels and when would you change them?"

**Key Talking Points**:
- ACID ensures reliability at the cost of performance
- Higher isolation = more consistency, less concurrency
- Optimistic locking scales better for read-heavy workloads
- Always handle transaction failures gracefully

**Gotcha**: Most databases default to "Read Committed" — not "Serializable"! Know your database's default.

---

## Connection to Previous Topics

- **Indexes**: Transactions may need to update multiple indexes atomically
- **Concurrency**: Transactions use locks similar to mutexes we learned in OS
- **Networking**: Distributed transactions span multiple databases (2PC protocol)

---

## Key Takeaways

✅ **ACID** = Atomicity, Consistency, Isolation, Durability  
✅ **Atomicity**: All operations succeed or all fail together  
✅ Higher **isolation levels** prevent anomalies but reduce concurrency  
✅ **Pessimistic locking**: Lock first, prevents conflicts but blocks  
✅ **Optimistic locking**: Check at commit, scales better for reads  
✅ **Deadlocks** occur when transactions wait for each other's locks  
✅ Always handle transaction failures with proper rollback  
✅ Know your database's default isolation level
`,
    },

    // Step 2-4-1 through 2-4-4: Project steps
    'step-2-4-1': {
        title: 'Project P5: Mini Shell',
        content: `# Project P5: Mini Shell

## Why This Project Matters

Every time you type \`ls\`, \`cd\`, or run a Python script, a shell is interpreting your commands. Building your own shell teaches you:

- **Process management**: fork(), exec(), wait() — the core of Unix
- **I/O redirection**: How \`>\` and \`<\` actually work
- **Pipes**: The magic behind \`cmd1 | cmd2\`
- **Job control**: Background processes, signals

This is a **classic systems programming interview project** — it demonstrates low-level OS knowledge.

---

## What You'll Build

\`\`\`mermaid
flowchart LR
    subgraph shell["Mini Shell"]
        R[Read Input] --> P[Parse Command]
        P --> E{Execute}
        E --> |Built-in| B[cd, exit, etc.]
        E --> |External| F[Fork + Exec]
        F --> W[Wait for Child]
    end
\`\`\`

### Features

| Feature | Example | Concepts |
|---------|---------|----------|
| Basic commands | \`ls -la\` | fork, exec, wait |
| Pipes | \`ls | grep .txt\` | pipe(), dup2 |
| Redirection | \`cat < in.txt > out.txt\` | open, dup2 |
| Background | \`sleep 10 &\` | WNOHANG, signals |
| Built-ins | \`cd\`, \`exit\`, \`history\` | No fork needed |

---

## Phase 1: Basic Command Execution

Start with the simplest shell — read, parse, fork, exec:

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

#define MAX_LINE 1024
#define MAX_ARGS 64

// Parse input line into args array
int parse_line(char *line, char **args) {
    int argc = 0;
    char *token = strtok(line, " \\t\\n");
    while (token != NULL && argc < MAX_ARGS - 1) {
        args[argc++] = token;
        token = strtok(NULL, " \\t\\n");
    }
    args[argc] = NULL;
    return argc;
}

// Execute external command
void execute(char **args) {
    pid_t pid = fork();
    
    if (pid < 0) {
        perror("fork failed");
    } else if (pid == 0) {
        // Child process
        execvp(args[0], args);
        perror("command not found");
        exit(1);
    } else {
        // Parent waits for child
        int status;
        waitpid(pid, &status, 0);
    }
}

int main() {
    char line[MAX_LINE];
    char *args[MAX_ARGS];
    
    while (1) {
        printf("mysh> ");
        fflush(stdout);
        
        if (fgets(line, MAX_LINE, stdin) == NULL) break;
        
        int argc = parse_line(line, args);
        if (argc == 0) continue;
        
        // Built-in: exit
        if (strcmp(args[0], "exit") == 0) break;
        
        // Built-in: cd
        if (strcmp(args[0], "cd") == 0) {
            if (args[1]) chdir(args[1]);
            continue;
        }
        
        execute(args);
    }
    
    return 0;
}
\`\`\`

---

## Phase 2: Pipes

Enable \`cmd1 | cmd2\` — connect stdout of cmd1 to stdin of cmd2:

\`\`\`c
void execute_pipe(char **cmd1, char **cmd2) {
    int pipefd[2];
    pipe(pipefd);  // pipefd[0] = read end, pipefd[1] = write end
    
    pid_t pid1 = fork();
    if (pid1 == 0) {
        // First command: stdout -> pipe write end
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        close(pipefd[1]);
        execvp(cmd1[0], cmd1);
        exit(1);
    }
    
    pid_t pid2 = fork();
    if (pid2 == 0) {
        // Second command: stdin <- pipe read end
        close(pipefd[1]);
        dup2(pipefd[0], STDIN_FILENO);
        close(pipefd[0]);
        execvp(cmd2[0], cmd2);
        exit(1);
    }
    
    // Parent closes both ends and waits
    close(pipefd[0]);
    close(pipefd[1]);
    waitpid(pid1, NULL, 0);
    waitpid(pid2, NULL, 0);
}
\`\`\`

---

## Phase 3: I/O Redirection

Handle \`>\`, \`<\`, and \`>>\`:

\`\`\`c
#include <fcntl.h>

void handle_redirection(char **args) {
    for (int i = 0; args[i] != NULL; i++) {
        if (strcmp(args[i], ">") == 0) {
            // Output redirection
            int fd = open(args[i+1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
            dup2(fd, STDOUT_FILENO);
            close(fd);
            args[i] = NULL;  // Remove > and filename from args
        } else if (strcmp(args[i], "<") == 0) {
            // Input redirection
            int fd = open(args[i+1], O_RDONLY);
            dup2(fd, STDIN_FILENO);
            close(fd);
            args[i] = NULL;
        } else if (strcmp(args[i], ">>") == 0) {
            // Append redirection
            int fd = open(args[i+1], O_WRONLY | O_CREAT | O_APPEND, 0644);
            dup2(fd, STDOUT_FILENO);
            close(fd);
            args[i] = NULL;
        }
    }
}
\`\`\`

---

## Phase 4: Background Processes

Handle \`&\` for background execution:

\`\`\`c
#include <signal.h>

// Reap zombie processes
void sigchld_handler(int sig) {
    while (waitpid(-1, NULL, WNOHANG) > 0);
}

int main() {
    // Set up signal handler
    signal(SIGCHLD, sigchld_handler);
    
    // In execute():
    int background = 0;
    // Check if last arg is "&"
    if (argc > 0 && strcmp(args[argc-1], "&") == 0) {
        background = 1;
        args[argc-1] = NULL;
    }
    
    pid_t pid = fork();
    if (pid > 0 && !background) {
        waitpid(pid, NULL, 0);  // Only wait if foreground
    }
}
\`\`\`

---

## Testing Your Shell

\`\`\`bash
# Compile
gcc -o mysh mysh.c

# Test basic commands
./mysh
mysh> ls -la
mysh> echo "Hello World"

# Test pipes
mysh> ls | grep .c
mysh> cat file.txt | wc -l

# Test redirection
mysh> echo "test" > output.txt
mysh> cat < input.txt

# Test background
mysh> sleep 5 &
mysh> echo "This prints immediately"
\`\`\`

---

## Extension Ideas

| Extension | Difficulty | What You'll Learn |
|-----------|------------|-------------------|
| Command history | ⭐⭐ | File I/O, readline |
| Tab completion | ⭐⭐⭐ | Directory scanning |
| Environment variables | ⭐⭐ | getenv, setenv |
| Job control (fg, bg, jobs) | ⭐⭐⭐ | Process groups, signals |
| Scripting support | ⭐⭐⭐⭐ | Parsing, control flow |

---

## Interview Relevance

**Commonly asked in**: Systems/infrastructure roles at Google, Meta, Bloomberg

**Key concepts to explain**:
- fork() creates a copy of the process
- exec() replaces the process image
- Why we fork before exec (don't want to replace shell itself)
- How pipes use file descriptors
- Zombie processes and why we need to wait()

---

## Key Takeaways

✅ **fork()** creates child process, **exec()** runs program  
✅ **Pipes** connect stdout of one process to stdin of another  
✅ **dup2()** redirects file descriptors for I/O redirection  
✅ **waitpid()** with WNOHANG prevents blocking on background jobs  
✅ Signal handlers clean up zombie processes  
✅ Built-in commands (cd, exit) must run in parent process
`,
    },

    'step-2-4-2': {
        title: 'Project P6: HTTP Server',
        content: `# Project P6: HTTP Server

## Why This Project Matters

Every web application depends on HTTP servers. Understanding how they work under the hood teaches you:

- **Socket programming**: The foundation of network communication
- **HTTP protocol**: Request/response format, headers, status codes
- **Concurrency**: Handling multiple clients simultaneously
- **I/O patterns**: Blocking vs non-blocking, event loops

Building an HTTP server is a **staple systems interview project** at companies like Stripe, Cloudflare, and any infrastructure team.

---

## What You'll Build

\`\`\`mermaid
flowchart LR
    subgraph server["HTTP Server"]
        L["Listen on Port"] --> A["Accept Connection"]
        A --> R["Read Request"]
        R --> P["Parse HTTP"]
        P --> H["Handle Route"]
        H --> S["Send Response"]
        S --> A
    end
    C1["Client 1"] --> L
    C2["Client 2"] --> L
\`\`\`

### Features

| Feature | What You'll Learn |
|---------|-------------------|
| Parse HTTP requests | String parsing, protocol format |
| Route handling | URL matching, handlers |
| Static file serving | File I/O, MIME types |
| Concurrent connections | Threading or async I/O |
| Keep-alive | Connection reuse |

---

## Phase 1: Basic Single-Threaded Server

\`\`\`python
import socket

def parse_request(data: bytes) -> dict:
    """Parse HTTP request into components."""
    lines = data.decode().split('\\r\\n')
    request_line = lines[0].split(' ')
    
    return {
        'method': request_line[0],
        'path': request_line[1],
        'version': request_line[2] if len(request_line) > 2 else 'HTTP/1.0',
        'headers': dict(
            line.split(': ', 1) for line in lines[1:] 
            if ': ' in line
        )
    }

def build_response(status: int, body: str, content_type: str = 'text/html') -> bytes:
    """Build HTTP response."""
    status_text = {200: 'OK', 404: 'Not Found', 500: 'Internal Server Error'}
    response = f"HTTP/1.1 {status} {status_text.get(status, 'Unknown')}\\r\\n"
    response += f"Content-Type: {content_type}\\r\\n"
    response += f"Content-Length: {len(body)}\\r\\n"
    response += "Connection: close\\r\\n"
    response += "\\r\\n"
    response += body
    return response.encode()

def handle_request(request: dict) -> bytes:
    """Route request to handler."""
    path = request['path']
    
    if path == '/':
        return build_response(200, '<h1>Welcome to My Server!</h1>')
    elif path == '/api/health':
        return build_response(200, '{"status": "healthy"}', 'application/json')
    else:
        return build_response(404, '<h1>404 Not Found</h1>')

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('0.0.0.0', 8080))
    server.listen(5)
    
    print("🚀 Server running on http://localhost:8080")
    
    while True:
        client, addr = server.accept()
        print(f"📥 Connection from {addr}")
        
        try:
            data = client.recv(4096)
            if data:
                request = parse_request(data)
                print(f"   {request['method']} {request['path']}")
                response = handle_request(request)
                client.send(response)
        finally:
            client.close()

if __name__ == '__main__':
    main()
\`\`\`

---

## Phase 2: Static File Serving

\`\`\`python
import os
import mimetypes

def serve_static_file(path: str, static_dir: str = './public') -> bytes:
    """Serve static files from directory."""
    # Prevent directory traversal attacks!
    safe_path = os.path.normpath(path).lstrip('/')
    file_path = os.path.join(static_dir, safe_path)
    
    # Security check
    if not file_path.startswith(os.path.abspath(static_dir)):
        return build_response(403, 'Forbidden')
    
    if not os.path.exists(file_path):
        return build_response(404, 'File not found')
    
    if os.path.isdir(file_path):
        file_path = os.path.join(file_path, 'index.html')
    
    mime_type, _ = mimetypes.guess_type(file_path)
    mime_type = mime_type or 'application/octet-stream'
    
    with open(file_path, 'rb') as f:
        content = f.read()
    
    return build_response(200, content.decode(), mime_type)
\`\`\`

---

## Phase 3: Multi-Threaded Server

Handle multiple clients concurrently:

\`\`\`python
import threading

def handle_client(client: socket.socket, addr: tuple):
    """Handle a single client in its own thread."""
    try:
        data = client.recv(4096)
        if data:
            request = parse_request(data)
            print(f"[{threading.current_thread().name}] {request['method']} {request['path']}")
            response = handle_request(request)
            client.send(response)
    except Exception as e:
        print(f"Error: {e}")
        client.send(build_response(500, 'Internal Server Error'))
    finally:
        client.close()

def main_threaded():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('0.0.0.0', 8080))
    server.listen(100)
    
    print("🚀 Multi-threaded server on http://localhost:8080")
    
    while True:
        client, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(client, addr))
        thread.start()
\`\`\`

---

## Phase 4: Thread Pool (Production-Ready)

\`\`\`python
from concurrent.futures import ThreadPoolExecutor

def main_pooled():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('0.0.0.0', 8080))
    server.listen(100)
    
    print("🚀 Thread-pooled server on http://localhost:8080")
    
    # Limit concurrent connections
    with ThreadPoolExecutor(max_workers=10) as executor:
        while True:
            client, addr = server.accept()
            executor.submit(handle_client, client, addr)
\`\`\`

---

## Testing Your Server

\`\`\`bash
# Start the server
python server.py

# Test with curl
curl http://localhost:8080/
curl http://localhost:8080/api/health
curl http://localhost:8080/nonexistent

# Load test with Apache Bench
ab -n 1000 -c 10 http://localhost:8080/

# Test with browser
open http://localhost:8080
\`\`\`

---

## Extension Ideas

| Extension | Difficulty | What You'll Learn |
|-----------|------------|-------------------|
| Keep-alive connections | ⭐⭐ | Connection pooling, timeouts |
| Chunked transfer encoding | ⭐⭐ | Streaming responses |
| HTTPS support | ⭐⭐⭐ | TLS, certificates |
| WebSocket upgrade | ⭐⭐⭐ | Protocol switching |
| Async I/O (asyncio) | ⭐⭐⭐ | Event loops, non-blocking |
| HTTP/2 support | ⭐⭐⭐⭐ | Multiplexing, HPACK |

---

## HTTP Protocol Quick Reference

\`\`\`
Request:
GET /path HTTP/1.1\\r\\n
Host: localhost:8080\\r\\n
User-Agent: curl/7.64.1\\r\\n
Accept: */*\\r\\n
\\r\\n

Response:
HTTP/1.1 200 OK\\r\\n
Content-Type: text/html\\r\\n
Content-Length: 13\\r\\n
\\r\\n
Hello, World!
\`\`\`

---

## Interview Relevance

**Commonly asked in**: Backend roles at Stripe, Cloudflare, AWS, any infrastructure team

**Key concepts to explain**:
- Why we use TCP for HTTP (reliable, ordered delivery)
- How thread pools prevent resource exhaustion
- C10K problem and solutions (async, epoll, io_uring)
- Keep-alive reduces connection overhead
- Security: input validation, path traversal prevention

---

## Key Takeaways

✅ HTTP is a text-based request/response protocol over TCP  
✅ Parse request line → headers → body (separated by \\\\r\\\\n)  
✅ Always set Content-Length or use chunked encoding  
✅ Thread pools prevent creating unlimited threads  
✅ Validate paths to prevent directory traversal attacks  
✅ Keep-alive connections reduce TCP handshake overhead
`,
    },

    'step-2-4-3': {
        title: 'Project P7: Database Query Engine',
        content: `# Project P7: Database Query Engine

## Why This Project Matters

Every time you write a SQL query, a complex system parses it, optimizes it, and executes it against stored data. Building your own teaches you:

- **Parsing**: Turning text into structured data (AST)
- **Query optimization**: Choosing efficient execution strategies
- **Storage engines**: How data is actually stored and retrieved
- **Compiler design**: The same techniques power programming languages

This is an **impressive portfolio project** and common at database companies (Snowflake, MongoDB, Cockroach Labs).

---

## What You'll Build

\`\`\`mermaid
flowchart LR
    subgraph engine["Query Engine"]
        SQL["SQL Text"] --> L["Lexer/Tokenizer"]
        L --> P["Parser"]
        P --> AST["Abstract Syntax Tree"]
        AST --> O["Optimizer"]
        O --> E["Executor"]
        E --> S["Storage Engine"]
        S --> R["Results"]
    end
\`\`\`

### Features

| Feature | What You'll Learn |
|---------|-------------------|
| SQL parsing | Tokenization, recursive descent |
| SELECT queries | Projection, filtering |
| WHERE clauses | Expression evaluation |
| JOINs | Nested loops, hash joins |
| Aggregations | GROUP BY, COUNT, SUM |

---

## Phase 1: Tokenizer

Break SQL text into tokens:

\`\`\`python
from enum import Enum, auto
from dataclasses import dataclass
from typing import List

class TokenType(Enum):
    SELECT = auto()
    FROM = auto()
    WHERE = auto()
    AND = auto()
    OR = auto()
    INSERT = auto()
    INTO = auto()
    VALUES = auto()
    IDENTIFIER = auto()
    NUMBER = auto()
    STRING = auto()
    STAR = auto()
    COMMA = auto()
    EQUALS = auto()
    LESS_THAN = auto()
    GREATER_THAN = auto()
    LPAREN = auto()
    RPAREN = auto()
    EOF = auto()

@dataclass
class Token:
    type: TokenType
    value: str

class Tokenizer:
    KEYWORDS = {
        'SELECT': TokenType.SELECT,
        'FROM': TokenType.FROM,
        'WHERE': TokenType.WHERE,
        'AND': TokenType.AND,
        'OR': TokenType.OR,
        'INSERT': TokenType.INSERT,
        'INTO': TokenType.INTO,
        'VALUES': TokenType.VALUES,
    }
    
    def __init__(self, sql: str):
        self.sql = sql
        self.pos = 0
    
    def tokenize(self) -> List[Token]:
        tokens = []
        while self.pos < len(self.sql):
            self.skip_whitespace()
            if self.pos >= len(self.sql):
                break
            tokens.append(self.next_token())
        tokens.append(Token(TokenType.EOF, ''))
        return tokens
    
    def next_token(self) -> Token:
        char = self.sql[self.pos]
        
        if char == '*': self.pos += 1; return Token(TokenType.STAR, '*')
        if char == ',': self.pos += 1; return Token(TokenType.COMMA, ',')
        if char == '=': self.pos += 1; return Token(TokenType.EQUALS, '=')
        if char == '<': self.pos += 1; return Token(TokenType.LESS_THAN, '<')
        if char == '>': self.pos += 1; return Token(TokenType.GREATER_THAN, '>')
        if char == '(': self.pos += 1; return Token(TokenType.LPAREN, '(')
        if char == ')': self.pos += 1; return Token(TokenType.RPAREN, ')')
        
        if char == "'" or char == '"':
            return self.read_string(char)
        
        if char.isdigit():
            return self.read_number()
        
        if char.isalpha() or char == '_':
            return self.read_identifier()
        
        raise SyntaxError(f"Unexpected character: {char}")
    
    def read_identifier(self) -> Token:
        start = self.pos
        while self.pos < len(self.sql) and (self.sql[self.pos].isalnum() or self.sql[self.pos] == '_'):
            self.pos += 1
        value = self.sql[start:self.pos].upper()
        token_type = self.KEYWORDS.get(value, TokenType.IDENTIFIER)
        return Token(token_type, self.sql[start:self.pos])
    
    def skip_whitespace(self):
        while self.pos < len(self.sql) and self.sql[self.pos].isspace():
            self.pos += 1
\`\`\`

---

## Phase 2: Parser (AST Builder)

Build an Abstract Syntax Tree from tokens:

\`\`\`python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class SelectStatement:
    columns: List[str]
    table: str
    where: Optional['Expression'] = None

@dataclass
class Expression:
    left: str
    operator: str
    right: str

class Parser:
    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.pos = 0
    
    def parse(self):
        token = self.current()
        if token.type == TokenType.SELECT:
            return self.parse_select()
        raise SyntaxError(f"Unexpected token: {token}")
    
    def parse_select(self) -> SelectStatement:
        self.expect(TokenType.SELECT)
        
        # Parse columns
        columns = []
        if self.current().type == TokenType.STAR:
            columns.append('*')
            self.advance()
        else:
            columns.append(self.expect(TokenType.IDENTIFIER).value)
            while self.current().type == TokenType.COMMA:
                self.advance()
                columns.append(self.expect(TokenType.IDENTIFIER).value)
        
        # Parse FROM
        self.expect(TokenType.FROM)
        table = self.expect(TokenType.IDENTIFIER).value
        
        # Parse optional WHERE
        where = None
        if self.current().type == TokenType.WHERE:
            self.advance()
            where = self.parse_expression()
        
        return SelectStatement(columns, table, where)
    
    def parse_expression(self) -> Expression:
        left = self.expect(TokenType.IDENTIFIER).value
        
        op_token = self.current()
        if op_token.type in (TokenType.EQUALS, TokenType.LESS_THAN, TokenType.GREATER_THAN):
            self.advance()
            operator = op_token.value
        else:
            raise SyntaxError(f"Expected operator, got {op_token}")
        
        right_token = self.current()
        self.advance()
        return Expression(left, operator, right_token.value)
    
    def current(self) -> Token:
        return self.tokens[self.pos]
    
    def advance(self) -> Token:
        token = self.tokens[self.pos]
        self.pos += 1
        return token
    
    def expect(self, expected: TokenType) -> Token:
        token = self.current()
        if token.type != expected:
            raise SyntaxError(f"Expected {expected}, got {token.type}")
        return self.advance()
\`\`\`

---

## Phase 3: Storage Engine

Simple CSV-based storage:

\`\`\`python
import csv
from typing import List, Dict, Callable, Optional

class Table:
    def __init__(self, name: str, filename: str):
        self.name = name
        self.filename = filename
        self.columns: List[str] = []
        self.rows: List[Dict[str, str]] = []
        self.load()
    
    def load(self):
        with open(self.filename, 'r') as f:
            reader = csv.DictReader(f)
            self.columns = reader.fieldnames or []
            self.rows = list(reader)
    
    def scan(self, predicate: Optional[Callable] = None) -> List[Dict]:
        if predicate is None:
            return self.rows
        return [row for row in self.rows if predicate(row)]
    
    def project(self, rows: List[Dict], columns: List[str]) -> List[Dict]:
        if '*' in columns:
            return rows
        return [{col: row[col] for col in columns} for row in rows]

class Database:
    def __init__(self):
        self.tables: Dict[str, Table] = {}
    
    def create_table(self, name: str, filename: str):
        self.tables[name] = Table(name, filename)
    
    def get_table(self, name: str) -> Table:
        return self.tables[name.lower()]
\`\`\`

---

## Phase 4: Query Executor

Execute the AST against storage:

\`\`\`python
class Executor:
    def __init__(self, database: Database):
        self.database = database
    
    def execute(self, statement) -> List[Dict]:
        if isinstance(statement, SelectStatement):
            return self.execute_select(statement)
        raise ValueError(f"Unknown statement type: {type(statement)}")
    
    def execute_select(self, stmt: SelectStatement) -> List[Dict]:
        table = self.database.get_table(stmt.table)
        
        # Build predicate from WHERE clause
        predicate = None
        if stmt.where:
            predicate = self.build_predicate(stmt.where)
        
        # Scan with filter
        rows = table.scan(predicate)
        
        # Project columns
        return table.project(rows, stmt.columns)
    
    def build_predicate(self, expr: Expression):
        def predicate(row):
            left_val = row.get(expr.left, expr.left)
            right_val = expr.right.strip("'\"")
            
            if expr.operator == '=':
                return str(left_val) == str(right_val)
            elif expr.operator == '<':
                return float(left_val) < float(right_val)
            elif expr.operator == '>':
                return float(left_val) > float(right_val)
            return False
        return predicate
\`\`\`

---

## Putting It Together

\`\`\`python
def run_query(sql: str, db: Database) -> List[Dict]:
    # Tokenize
    tokenizer = Tokenizer(sql)
    tokens = tokenizer.tokenize()
    
    # Parse
    parser = Parser(tokens)
    ast = parser.parse()
    
    # Execute
    executor = Executor(db)
    return executor.execute(ast)

# Usage
db = Database()
db.create_table('users', 'users.csv')

results = run_query("SELECT name, email FROM users WHERE age > 25", db)
for row in results:
    print(row)
\`\`\`

---

## Extension Ideas

| Extension | Difficulty | What You'll Learn |
|-----------|------------|-------------------|
| ORDER BY | ⭐⭐ | Sorting algorithms |
| GROUP BY + aggregates | ⭐⭐⭐ | Hash aggregation |
| JOINs | ⭐⭐⭐ | Nested loop, hash join |
| Indexes (B-Tree) | ⭐⭐⭐⭐ | Tree structures |
| Query optimizer | ⭐⭐⭐⭐ | Cost estimation |

---

## Interview Relevance

**Commonly asked in**: Database companies (Snowflake, MongoDB), Big Tech infra teams

**Key concepts to explain**:
- Parsing: lexer → tokens → parser → AST
- Full table scan vs index scan
- Hash join vs nested loop join
- Query optimization (predicate pushdown, join reordering)

---

## Key Takeaways

✅ **Tokenizer** breaks SQL into tokens (keywords, identifiers, operators)  
✅ **Parser** builds an Abstract Syntax Tree from tokens  
✅ **Storage engine** handles data persistence and retrieval  
✅ **Executor** traverses AST and performs operations  
✅ WHERE clauses filter rows; SELECT projects columns  
✅ Real databases add optimizer between parser and executor
`,
    },

    'step-2-4-4': {
        title: 'Project P8: Thread Pool',
        content: `# Project P8: Thread Pool

## Why This Project Matters

Creating a new thread for every task is expensive — thread creation takes ~1ms and significant memory. Thread pools solve this by **reusing a fixed number of threads** for many tasks. Understanding thread pools teaches you:

- **Concurrency patterns**: Producer-consumer, work stealing
- **Synchronization**: Mutexes, condition variables
- **Resource management**: Graceful shutdown, RAII
- **Performance optimization**: Why servers use pools

This pattern is used in **every high-performance server** — from NGINX to database connection pools.

---

## What You'll Build

\`\`\`mermaid
flowchart LR
    subgraph pool["Thread Pool"]
        Q["Task Queue"] 
        W1["Worker 1"]
        W2["Worker 2"]
        W3["Worker 3"]
    end
    P["Producer"] -->|enqueue| Q
    Q -->|dequeue| W1
    Q -->|dequeue| W2
    Q -->|dequeue| W3
    W1 --> R["Results"]
    W2 --> R
    W3 --> R
\`\`\`

### Core Concepts

| Component | Purpose |
|-----------|---------|
| **Task Queue** | Thread-safe queue holding pending tasks |
| **Workers** | Threads that continuously pull and execute tasks |
| **Mutex** | Protects queue from concurrent access |
| **Condition Variable** | Workers sleep until tasks available |

---

## Python Implementation

Let's build a thread pool from scratch:

\`\`\`python
import threading
import queue
from typing import Callable, Any, List
from dataclasses import dataclass
import time

@dataclass
class Task:
    func: Callable
    args: tuple = ()
    kwargs: dict = None
    
    def __post_init__(self):
        if self.kwargs is None:
            self.kwargs = {}

class ThreadPool:
    def __init__(self, num_workers: int = 4):
        self.task_queue = queue.Queue()
        self.workers: List[threading.Thread] = []
        self.shutdown_flag = threading.Event()
        self.results: List[Any] = []
        self.results_lock = threading.Lock()
        
        # Start worker threads
        for i in range(num_workers):
            worker = threading.Thread(
                target=self._worker_loop,
                name=f"Worker-{i}",
                daemon=True
            )
            worker.start()
            self.workers.append(worker)
        
        print(f"🚀 Thread pool started with {num_workers} workers")
    
    def _worker_loop(self):
        """Main loop for each worker thread."""
        while not self.shutdown_flag.is_set():
            try:
                # Block for at most 0.1s, then check shutdown
                task = self.task_queue.get(timeout=0.1)
            except queue.Empty:
                continue
            
            try:
                result = task.func(*task.args, **task.kwargs)
                with self.results_lock:
                    self.results.append(result)
            except Exception as e:
                print(f"[{threading.current_thread().name}] Task failed: {e}")
            finally:
                self.task_queue.task_done()
    
    def submit(self, func: Callable, *args, **kwargs):
        """Submit a task to the pool."""
        if self.shutdown_flag.is_set():
            raise RuntimeError("Pool is shut down")
        self.task_queue.put(Task(func, args, kwargs))
    
    def map(self, func: Callable, items: list) -> None:
        """Submit func(item) for each item."""
        for item in items:
            self.submit(func, item)
    
    def wait(self):
        """Wait for all tasks to complete."""
        self.task_queue.join()
    
    def shutdown(self, wait: bool = True):
        """Shutdown the pool."""
        if wait:
            self.wait()
        self.shutdown_flag.set()
        for worker in self.workers:
            worker.join(timeout=1.0)
        print("🛑 Thread pool shut down")

# Usage
def process_item(x):
    time.sleep(0.1)  # Simulate work
    return x * x

pool = ThreadPool(num_workers=4)
pool.map(process_item, range(10))
pool.wait()
print(f"Results: {pool.results}")
pool.shutdown()
\`\`\`

---

## C++ Implementation

More control with C++ threads:

\`\`\`cpp
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <vector>
#include <future>

class ThreadPool {
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    
    std::mutex queue_mutex;
    std::condition_variable condition;
    bool stop = false;

public:
    ThreadPool(size_t num_threads) {
        for (size_t i = 0; i < num_threads; ++i) {
            workers.emplace_back([this] {
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(queue_mutex);
                        condition.wait(lock, [this] {
                            return stop || !tasks.empty();
                        });
                        
                        if (stop && tasks.empty()) return;
                        
                        task = std::move(tasks.front());
                        tasks.pop();
                    }
                    task();
                }
            });
        }
    }
    
    template<class F>
    void enqueue(F&& f) {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            if (stop) throw std::runtime_error("Pool stopped");
            tasks.push(std::forward<F>(f));
        }
        condition.notify_one();
    }
    
    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        condition.notify_all();
        for (auto& worker : workers) {
            worker.join();
        }
    }
};

// Usage
int main() {
    ThreadPool pool(4);
    
    for (int i = 0; i < 10; ++i) {
        pool.enqueue([i] {
            std::cout << "Task " << i << " on thread " 
                      << std::this_thread::get_id() << std::endl;
        });
    }
    
    // Pool destructor waits for all tasks
    return 0;
}
\`\`\`

---

## Key Implementation Details

### Why Condition Variables?

\`\`\`mermaid
sequenceDiagram
    participant W as Worker Thread
    participant Q as Task Queue
    participant CV as Condition Variable
    
    W->>CV: wait() - release lock, sleep
    Note over W: Sleeping (no CPU usage)
    Q->>CV: notify_one() - task added
    CV->>W: wake up, acquire lock
    W->>Q: pop task
    W->>W: execute task
\`\`\`

Without condition variables, workers would **busy-wait** (spin in a loop), wasting CPU.

### Graceful Shutdown

1. Set shutdown flag
2. Notify all workers (wake them up)
3. Workers check flag, exit if set
4. Join all worker threads

\`\`\`python
def shutdown(self, wait=True):
    if wait:
        self.task_queue.join()  # Wait for pending tasks
    self.shutdown_flag.set()     # Signal workers to stop
    for worker in self.workers:
        worker.join()            # Wait for workers to exit
\`\`\`

---

## Advanced: Future-based Results

Return futures for task results:

\`\`\`python
from concurrent.futures import Future

class ThreadPoolWithFutures(ThreadPool):
    def submit(self, func: Callable, *args, **kwargs) -> Future:
        future = Future()
        
        def wrapped():
            try:
                result = func(*args, **kwargs)
                future.set_result(result)
            except Exception as e:
                future.set_exception(e)
        
        self.task_queue.put(Task(wrapped))
        return future

# Usage
pool = ThreadPoolWithFutures(4)
futures = [pool.submit(process_item, i) for i in range(10)]
results = [f.result() for f in futures]  # Blocks until complete
\`\`\`

---

## Testing Your Thread Pool

\`\`\`python
import time

def test_thread_pool():
    pool = ThreadPool(4)
    
    # Test basic execution
    results = []
    def append_result(x):
        results.append(x * 2)
    
    for i in range(8):
        pool.submit(append_result, i)
    
    pool.wait()
    assert len(results) == 8
    print(f"✅ Basic test passed: {sorted(results)}")
    
    # Test concurrent execution
    start = time.time()
    def slow_task(x):
        time.sleep(0.1)
        return x
    
    pool.map(slow_task, range(8))
    pool.wait()
    elapsed = time.time() - start
    
    # 8 tasks × 0.1s / 4 workers = 0.2s (not 0.8s)
    assert elapsed < 0.5, f"Too slow: {elapsed}s"
    print(f"✅ Concurrency test passed: {elapsed:.2f}s")
    
    pool.shutdown()

test_thread_pool()
\`\`\`

---

## Extension Ideas

| Extension | Difficulty | What You'll Learn |
|-----------|------------|-------------------|
| Priority queue | ⭐⭐ | Heap data structure |
| Work stealing | ⭐⭐⭐ | Lock-free queues |
| Dynamic sizing | ⭐⭐ | Adaptive algorithms |
| Task cancellation | ⭐⭐⭐ | Interruption handling |
| Async/await integration | ⭐⭐⭐ | Coroutines |

---

## Interview Relevance

**Commonly asked in**: Any systems or backend role

**Key concepts to explain**:
- Why pools: thread creation overhead, resource limits
- Producer-consumer pattern
- Condition variables prevent busy-waiting
- Graceful shutdown: drain queue, then stop workers
- C++ RAII: destructor joins threads

**Common follow-ups**:
- "How would you handle task priorities?"
- "What if a task throws an exception?"
- "How would you implement timeouts?"

---

## Key Takeaways

✅ Thread pools **reuse threads** to avoid creation overhead  
✅ **Mutex** protects the shared task queue  
✅ **Condition variables** let workers sleep until tasks arrive  
✅ **Graceful shutdown**: set flag, notify all, join threads  
✅ Use \`queue.Queue\` in Python (thread-safe by default)  
✅ Return **Futures** if callers need task results  
✅ Consider work-stealing for better load balancing
`,
    },
};

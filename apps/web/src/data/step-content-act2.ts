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

\`\`\`
┌─────────────────────────────────────────┐
│              PROCESS                    │
├─────────────────────────────────────────┤
│  Code (Text Segment)    → Instructions  │
│  Data Segment           → Global vars   │
│  Heap                   → malloc/new    │
│  Stack                  → Function calls│
│  Process ID (PID)       → Unique ID     │
│  Program Counter        → Current line  │
│  Open Files             → File handles  │
│  Environment Variables  → PATH, HOME    │
└─────────────────────────────────────────┘
\`\`\`

### Process Lifecycle

Every process moves through these states:

\`\`\`
        ┌─────────┐
        │   New   │ ← Process created
        └────┬────┘
             │ OS admits to ready queue
             ▼
        ┌─────────┐  scheduler   ┌─────────┐
        │  Ready  │◄────────────│ Running │
        └────┬────┘  preempt    └────┬────┘
             │                       │
             │ dispatch (get CPU)    │ I/O request
             └───────────────────────┤
                                     ▼
                                ┌─────────┐
                                │ Waiting │ ← Blocked on I/O
                                └────┬────┘
                                     │ I/O complete
                                     ▼
                                  (Ready)
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

\`\`\`
Process Memory Layout
┌──────────────────────────────────────┐
│            Thread 1 Stack            │ ↓ grows down
├──────────────────────────────────────┤
│            Thread 2 Stack            │ ↓ grows down
├──────────────────────────────────────┤
│               ...                    │
├──────────────────────────────────────┤
│               Heap                   │ ↑ grows up (malloc)
├──────────────────────────────────────┤
│        Data (global variables)       │
├──────────────────────────────────────┤
│           Code (read-only)           │
└──────────────────────────────────────┘
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

\`\`\`
        ┌────────────┐
        │ Registers  │  ~1 CPU cycle    | ~KB
        ├────────────┤
        │  L1 Cache  │  ~4 cycles       | ~64KB
        ├────────────┤
        │  L2 Cache  │  ~12 cycles      | ~256KB
        ├────────────┤
        │  L3 Cache  │  ~40 cycles      | ~8MB
        ├────────────┤
        │    RAM     │  ~100+ cycles    | ~16GB
        ├────────────┤
        │   Disk     │  ~10M cycles     | ~1TB
        └────────────┘
           Faster                     Larger
\`\`\`

**Key insight**: A cache miss to RAM is 100x slower than a cache hit. A page fault (accessing disk) is 100,000x slower!

---

## Virtual Memory: The Grand Illusion

**Definition**: **Virtual memory** gives each process the *illusion* of having the entire address space to itself, even though physical RAM is shared.

### How It Works

\`\`\`
Process A                     Process B
┌─────────────┐               ┌─────────────┐
│ 0x0000:Code │               │ 0x0000:Code │   Same virtual
│ 0x1000:Data │               │ 0x1000:Data │   addresses!
│ 0x2000:Heap │               │ 0x2000:Heap │
└──────┬──────┘               └──────┬──────┘
       │                             │
       ▼                             ▼
    Page Table A                  Page Table B
       │                             │
       ▼                             ▼
┌──────────────────────────────────────────┐
│            Physical RAM                   │
│  Frame 3 ← A's code   Frame 7 ← B's data │
│  Frame 5 ← A's heap   Frame 1 ← B's code │
└──────────────────────────────────────────┘
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

\`\`\`
Virtual Page    Physical Frame    Present?
─────────────────────────────────────────
Page 0      →   Frame 5          ✓
Page 1      →   Frame 12         ✓
Page 2      →   (on disk)        ✗ ← Page Fault!
Page 3      →   Frame 1          ✓
\`\`\`

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

\`\`\`
Thread A                Thread B
────────                ────────
READ counter (=0)       
                        READ counter (=0)
ADD (temp=1)            
                        ADD (temp=1)
WRITE counter (=1)      
                        WRITE counter (=1)

Expected: counter = 2
Actual:   counter = 1  ← Lost update!
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

\`\`\`
       P1
     🍴   🍴
   P5       P2
  🍴         🍴
     P4   P3
       🍴
       
Everyone holds left fork, waits for right. Forever.
\`\`\`

### The Four Conditions (All Required)

\`\`\`
┌──────────────────────────────────────────────┐
│           DEADLOCK occurs when:              │
├──────────────────────────────────────────────┤
│ 1. Mutual Exclusion: Resources held          │
│    exclusively                               │
│ 2. Hold and Wait: Thread holds one resource  │
│    while waiting for another                 │
│ 3. No Preemption: Resources can't be         │
│    forcibly taken                            │
│ 4. Circular Wait: A→B→C→A waiting cycle      │
└──────────────────────────────────────────────┘
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

\`\`\`
┌────────────┬────────────┬──────────────┬───────────────────┐
│ Boot Block │ Superblock │  Inode Table │    Data Blocks    │
└────────────┴────────────┴──────────────┴───────────────────┘
     ↑             ↑             ↑                 ↑
  Boot code    Metadata     File info      Actual file data
              (size, #inodes)  (one per file)
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

\`\`\`
┌─────────────────────────────────────┐
│            INODE #12847             │
├─────────────────────────────────────┤
│  File Type     : Regular file       │
│  Permissions   : rwxr-xr-x          │
│  Owner         : mansoor            │
│  Group         : staff              │
│  Size          : 4,096 bytes        │
│  Timestamps    : atime, mtime, ctime│
│  Link Count    : 1                  │
│  Data Blocks   : [52, 107, 234]     │
└─────────────────────────────────────┘
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

Network communication layers.

## OSI 7-Layer Model

| Layer | Name | Example |
| -------| ------| ---------|
| 7 | Application | HTTP, FTP, DNS |
| 6 | Presentation | SSL / TLS, encryption |
| 5 | Session | Sockets, sessions |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP, routing |
| 2 | Data Link | Ethernet, MAC |
| 1 | Physical | Cables, signals |

## TCP / IP Model

\`\`\`
Application (HTTP, DNS, FTP)
     │
Transport (TCP, UDP)
     │
Internet (IP)
     │
Network Access (Ethernet)
\`\`\`

## TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best effort |
| Ordering | Maintains order | No ordering |
| Speed | Slower | Faster |
| Use case | Web, email | Streaming, gaming |

## TCP Three-Way Handshake

\`\`\`
Client          Server
  │                │
  │──── SYN ──────►│
  │                │
  │◄── SYN-ACK ───│
  │                │
  │──── ACK ──────►│
  │                │
  Connection Established
\`\`\`

## Key Takeaways

- TCP provides reliable, ordered delivery
- UDP is faster but unreliable
- Each layer adds its own header
- IP addresses identify hosts, ports identify services
`,
    },

    // Step 2-2-2: HTTP & REST
    'step-2-2-2': {
        title: 'HTTP & REST',
        content: `# HTTP & REST

Web communication protocol and API design.

## HTTP Methods

| Method | Purpose | Idempotent |
|--------|---------|------------|
| GET | Retrieve | Yes |
| POST | Create | No |
| PUT | Replace | Yes |
| PATCH | Update | Yes |
| DELETE | Remove | Yes |

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## REST Principles

1. **Stateless**: No client state on server
2. **Uniform Interface**: Consistent URLs
3. **Client-Server**: Separation of concerns
4. **Cacheable**: Responses can be cached

## RESTful API Example

\`\`\`
GET    /users          # List all users
GET    /users/123      # Get user 123
POST   /users          # Create user
PUT    /users/123      # Replace user 123
PATCH  /users/123      # Update user 123
DELETE /users/123      # Delete user 123
\`\`\`

## Making HTTP Requests (Python)

\`\`\`python
import requests

# GET
response = requests.get('https://api.example.com/users')
data = response.json()

# POST
response = requests.post(
    'https://api.example.com/users',
    json={'name': 'Alice', 'email': 'alice@example.com'}
)
\`\`\`

## Key Takeaways

- REST uses HTTP semantics
- Use proper status codes
- Design resource-oriented URLs
- Consider pagination for lists
`,
    },

    // Step 2-2-3: Socket Programming
    'step-2-2-3': {
        title: 'Socket Programming',
        content: `# Socket Programming

Low-level network communication.

## TCP Server

\`\`\`python
import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(5)

print("Server listening on port 8080")

while True:
    client, address = server.accept()
    print(f"Connection from {address}")
    
    data = client.recv(1024)
    print(f"Received: {data.decode()}")
    
    client.send(b"Hello from server!")
    client.close()
\`\`\`

## TCP Client

\`\`\`python
import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('localhost', 8080))

client.send(b"Hello from client!")
response = client.recv(1024)
print(f"Received: {response.decode()}")

client.close()
\`\`\`

## Non-Blocking I/O

\`\`\`python
import select

server.setblocking(False)
inputs = [server]

while True:
    readable, _, _ = select.select(inputs, [], [])
    for sock in readable:
        if sock is server:
            client, addr = server.accept()
            inputs.append(client)
        else:
            data = sock.recv(1024)
            if data:
                sock.send(data)  # Echo
            else:
                inputs.remove(sock)
                sock.close()
\`\`\`

## Key Takeaways

- Sockets are endpoints for communication
- TCP provides stream-based reliable transport
- Use select/poll for handling multiple connections
- Consider async I/O for scalability
`,
    },

    // Step 2-3-1: SQL Fundamentals
    'step-2-3-1': {
        title: 'SQL Fundamentals',
        content: `# SQL Fundamentals

Query and manipulate relational databases.

## CRUD Operations

\`\`\`sql
-- Create
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');

-- Read
SELECT * FROM users WHERE id = 1;
SELECT name, email FROM users ORDER BY name;

-- Update
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
\`\`\`

## Joins

\`\`\`sql
-- Inner Join: matching rows in both
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Left Join: all from left, matching from right
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`

## Aggregations

\`\`\`sql
-- Count, Sum, Average
SELECT 
    department,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
\`\`\`

## Subqueries

\`\`\`sql
-- Find users with above-average orders
SELECT name FROM users
WHERE id IN (
    SELECT user_id FROM orders
    WHERE total > (SELECT AVG(total) FROM orders)
);
\`\`\`

## Key Takeaways

- SELECT defines output columns
- WHERE filters rows
- GROUP BY aggregates data
- JOIN combines tables
- Always use parameterized queries
`,
    },

    // Step 2-3-2: Indexing & B-Trees
    'step-2-3-2': {
        title: 'Indexing & B-Trees',
        content: `# Indexing & B-Trees

Speed up database queries.

## What is an Index?

Like a book's index: find rows without scanning entire table.

\`\`\`sql
-- Create index
CREATE INDEX idx_users_email ON users(email);

-- Query uses index
SELECT * FROM users WHERE email = 'alice@example.com';
-- O(log n) instead of O(n)
\`\`\`

## B-Tree Structure

\`\`\`
              [50]
           /       \\
      [25, 35]      [75, 90]
      /  |  \\        /  |  \\
   [10] [30] [40]  [60] [80] [95]
\`\`\`

- Balanced tree structure
- All leaves at same depth
- Each node has multiple keys
- O(log n) search, insert, delete

## Index Types

| Type | Use Case |
|------|----------|
| B-Tree | General purpose, range queries |
| Hash | Exact match only |
| GiST | Geometric, full-text |
| Bitmap | Low cardinality columns |

## When to Index

**Good candidates:**
- Primary keys (automatic)
- Foreign keys
- Frequently filtered columns
- JOIN columns

**Avoid indexing:**
- Small tables
- Frequently updated columns
- Low selectivity columns

## Key Takeaways

- Indexes speed reads, slow writes
- B-Trees support range queries
- Monitor query plans: EXPLAIN
- Don't over-index
`,
    },

    // Step 2-3-3: Transactions & ACID
    'step-2-3-3': {
        title: 'Transactions & ACID',
        content: `# Transactions & ACID

Ensure data integrity in databases.

## ACID Properties

| Property | Description |
|----------|-------------|
| **A**tomicity | All or nothing |
| **C**onsistency | Valid state to valid state |
| **I**solation | Concurrent transactions don't interfere |
| **D**urability | Committed data survives crashes |

## Transaction Example

\`\`\`sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check constraint
IF (SELECT balance FROM accounts WHERE id = 1) < 0 THEN
    ROLLBACK;
ELSE
    COMMIT;
END IF;
\`\`\`

## Isolation Levels

| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|------------|----------------|---------|
| Read Uncommitted | ✗ | ✗ | ✗ |
| Read Committed | ✓ | ✗ | ✗ |
| Repeatable Read | ✓ | ✓ | ✗ |
| Serializable | ✓ | ✓ | ✓ |

## Locking

\`\`\`sql
-- Pessimistic locking
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;

-- Row is locked until transaction ends
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;
\`\`\`

## Key Takeaways

- Use transactions for multi-step operations
- Higher isolation = more consistency, less concurrency
- Deadlocks can occur with pessimistic locking
- Consider optimistic locking for high concurrency
`,
    },

    // Step 2-4-1 through 2-4-4: Project steps
    'step-2-4-1': {
        title: 'Project P5: Mini Shell',
        content: `# Project P5: Mini Shell

Build a Unix shell from scratch.

## Features

- Execute commands with arguments
- Handle pipes: \`ls | grep .txt\`
- I/O redirection: \`cat < file.txt > output.txt\`
- Background processes: \`sleep 10 &\`

## Basic Implementation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

#define MAX_LINE 1024
#define MAX_ARGS 64

int main() {
    char line[MAX_LINE];
    char *args[MAX_ARGS];
    
    while (1) {
        printf("mysh> ");
        fgets(line, MAX_LINE, stdin);
        
        // Parse command
        int argc = 0;
        args[argc] = strtok(line, " \\t\\n");
        while (args[argc] != NULL) {
            args[++argc] = strtok(NULL, " \\t\\n");
        }
        
        if (argc == 0) continue;
        if (strcmp(args[0], "exit") == 0) break;
        
        // Fork and execute
        pid_t pid = fork();
        if (pid == 0) {
            execvp(args[0], args);
            perror("exec failed");
            exit(1);
        } else {
            wait(NULL);
        }
    }
    return 0;
}
\`\`\`

## Learning Objectives

- Process creation (fork/exec)
- Signal handling
- File descriptor manipulation
- Input parsing
`,
    },

    'step-2-4-2': {
        title: 'Project P6: HTTP Server',
        content: `# Project P6: HTTP Server

Build an HTTP server from scratch.

## Basic HTTP Server

\`\`\`python
import socket

def handle_request(request):
    lines = request.split('\\r\\n')
    method, path, _ = lines[0].split(' ')
    
    if path == '/':
        body = '<h1>Hello, World!</h1>'
        return f'HTTP/1.1 200 OK\\r\\nContent-Length: {len(body)}\\r\\n\\r\\n{body}'
    else:
        body = '<h1>404 Not Found</h1>'
        return f'HTTP/1.1 404 Not Found\\r\\nContent-Length: {len(body)}\\r\\n\\r\\n{body}'

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('localhost', 8080))
    server.listen(5)
    
    print("Server running on http://localhost:8080")
    
    while True:
        client, addr = server.accept()
        request = client.recv(1024).decode()
        response = handle_request(request)
        client.send(response.encode())
        client.close()

if __name__ == '__main__':
    main()
\`\`\`

## Features to Add

- Static file serving
- Multiple concurrent connections
- Keep-alive connections
- Request logging
`,
    },

    'step-2-4-3': {
        title: 'Project P7: Database Query Engine',
        content: `# Project P7: Database Query Engine

Parse and execute SQL-like queries.

## Query Parser

\`\`\`python
class QueryParser:
    def parse(self, query):
        tokens = query.strip().split()
        command = tokens[0].upper()
        
        if command == 'SELECT':
            return self.parse_select(tokens)
        elif command == 'INSERT':
            return self.parse_insert(tokens)
        return None
    
    def parse_select(self, tokens):
        # SELECT col1, col2 FROM table WHERE condition
        from_idx = tokens.index('FROM')
        columns = tokens[1:from_idx]
        table = tokens[from_idx + 1]
        return {
            'type': 'SELECT',
            'columns': [c.strip(',') for c in columns],
            'table': table
        }
\`\`\`

## CSV Storage Engine

\`\`\`python
import csv

class CSVTable:
    def __init__(self, filename):
        self.filename = filename
        self.rows = []
        self.columns = []
        self.load()
    
    def load(self):
        with open(self.filename) as f:
            reader = csv.DictReader(f)
            self.columns = reader.fieldnames
            self.rows = list(reader)
    
    def select(self, columns, where=None):
        results = []
        for row in self.rows:
            if where is None or where(row):
                results.append({c: row[c] for c in columns})
        return results
\`\`\`

## Learning Objectives

- Query parsing and AST
- Execution planning
- Storage engine design
`,
    },

    'step-2-4-4': {
        title: 'Project P8: Thread Pool',
        content: `# Project P8: Thread Pool

Implement a thread pool for concurrent task execution.

## C++ Implementation

\`\`\`cpp
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <vector>

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
    
    void enqueue(std::function<void()> task) {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            tasks.push(std::move(task));
        }
        condition.notify_one();
    }
    
    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        condition.notify_all();
        for (auto& worker : workers) worker.join();
    }
};
\`\`\`

## Learning Objectives

- Thread synchronization
- Condition variables
- Producer-consumer pattern
- Resource management
`,
    },
};

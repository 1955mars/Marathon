/**
 * Step Content for New Curriculum Scenes
 * Computer Architecture, Security, Version Control, Testing
 */

// Computer Architecture content (Act 2, Scene 2-5)
export const architectureContent: Record<string, { title: string; content: string }> = {
    'step-2-5-1': {
        title: 'CPU & Instruction Cycle',
        content: `# CPU & Instruction Cycle

## Why This Matters

Every line of code you write eventually becomes machine instructions executed by the CPU. Understanding how CPUs work helps you:

- Write **performance-aware code** that plays nice with hardware
- Debug mysterious **performance issues** that don't show up in profilers
- Answer **systems interview questions** about how computers actually work
- Make informed decisions about **algorithm choices** and data structures

---

## The Assembly Line Analogy 🏭

Think of a CPU like a factory assembly line:

| Factory | CPU |
|---------|-----|
| **Input materials** | Instructions from memory |
| **Assembly stations** | Pipeline stages |
| **Workers** | ALU, control unit |
| **Storage bins** | Registers |
| **Supervisor** | Control unit |
| **Production rate** | Clock speed |

---

## CPU Architecture Components

\`\`\`mermaid
flowchart TB
    subgraph cpu["CPU"]
        CU["Control Unit<br/>Fetches & decodes"]
        ALU["ALU<br/>Arithmetic & Logic"]
        REG["Registers<br/>Fast storage"]
        PC["Program Counter<br/>Next instruction"]
    end
    MEM["Memory<br/>Instructions & Data"]
    MEM <--> cpu
    style cpu fill:#1e1b4b,stroke:#a78bfa
\`\`\`

### Key Components

| Component | Function | Analogy |
|-----------|----------|---------|
| **ALU** | Performs math and logic | Calculator |
| **Control Unit** | Orchestrates operations | Factory supervisor |
| **Registers** | Ultra-fast temporary storage | Pockets |
| **Program Counter** | Points to next instruction | Bookmark |
| **Cache** | Fast local memory | Desk drawer |

---

## The Instruction Cycle

Every instruction goes through the **fetch-decode-execute** cycle:

\`\`\`mermaid
flowchart LR
    F["1. FETCH<br/>Load instruction<br/>from memory"] --> D["2. DECODE<br/>Parse opcode<br/>& operands"]
    D --> E["3. EXECUTE<br/>Perform the<br/>operation"]
    E --> S["4. STORE<br/>Write results<br/>to register/memory"]
    S --> F
    style F fill:#22c55e,stroke:#22c55e
    style D fill:#3b82f6,stroke:#3b82f6
    style E fill:#f59e0b,stroke:#f59e0b
    style S fill:#ef4444,stroke:#ef4444
\`\`\`

### Example: ADD Instruction

\`\`\`
Instruction: ADD R1, R2, R3  (R1 = R2 + R3)

1. FETCH:   Load "ADD R1, R2, R3" from address in PC
2. DECODE:  opcode=ADD, dest=R1, src1=R2, src2=R3
3. EXECUTE: ALU computes R2 + R3
4. STORE:   Write result to R1
5. PC++:    Move to next instruction
\`\`\`

---

## Clock Speed & Performance

### Key Metrics

| Metric | Meaning | Formula |
|--------|---------|---------|
| **Clock Speed** | Cycles per second | 3.5 GHz = 3.5 billion cycles/sec |
| **CPI** | Cycles Per Instruction | Varies by instruction type |
| **IPC** | Instructions Per Clock | Higher = more parallel execution |

### CPU Time Formula

\`\`\`
CPU Time = Instructions × CPI × Clock Period

Example:
- 1 billion instructions
- 2 CPI average
- 0.3 ns clock period (3.3 GHz)

CPU Time = 1B × 2 × 0.3ns = 0.6 seconds
\`\`\`

---

## Pipelining: The Key to Speed

**Without pipelining**: Each instruction must complete before the next starts.

**With pipelining**: Overlap instruction stages like an assembly line.

\`\`\`mermaid
gantt
    title Pipelined Execution
    dateFormat X
    axisFormat %s
    section Inst 1
    Fetch :a1, 0, 1
    Decode :a2, 1, 2
    Execute :a3, 2, 3
    Store :a4, 3, 4
    section Inst 2
    Fetch :b1, 1, 2
    Decode :b2, 2, 3
    Execute :b3, 3, 4
    Store :b4, 4, 5
    section Inst 3
    Fetch :c1, 2, 3
    Decode :c2, 3, 4
    Execute :c3, 4, 5
    Store :c4, 5, 6
\`\`\`

**Result**: After pipeline fills, we complete **1 instruction per cycle** instead of 1 every 4 cycles!

---

## Pipeline Hazards

### Data Hazard

Instruction needs result from previous instruction that hasn't finished:

\`\`\`
ADD R1, R2, R3    ; R1 = R2 + R3
SUB R4, R1, R5    ; Needs R1, but ADD hasn't stored yet!
\`\`\`

**Solution**: Forwarding (bypass result directly) or stall.

### Control Hazard (Branch)

Branch changes which instruction to fetch:

\`\`\`
BEQ R1, R2, LABEL  ; If R1 == R2, jump to LABEL
ADD R3, R4, R5     ; Should we execute this?
\`\`\`

**Solution**: Branch prediction (guess which way branch goes).

---

## Code Examples: Seeing It In Action

### Assembly Basics (x86)

\`\`\`asm
section .data
    msg db 'Hello', 0

section .text
    global _start

_start:
    ; System call: write(fd, buffer, length)
    mov eax, 4          ; syscall number for write
    mov ebx, 1          ; file descriptor (stdout)
    mov ecx, msg        ; pointer to message
    mov edx, 5          ; message length
    int 0x80            ; invoke syscall
    
    ; Exit
    mov eax, 1          ; syscall number for exit
    xor ebx, ebx        ; exit code 0
    int 0x80
\`\`\`

### Viewing Assembly from C

\`\`\`c
// Compile with: gcc -S -O0 example.c
int add(int a, int b) {
    return a + b;
}

// Generates (simplified):
// add:
//     mov eax, edi      ; First argument
//     add eax, esi      ; Add second argument
//     ret               ; Return
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Explain the fetch-decode-execute cycle"
2. "What is pipelining and why does it help?"
3. "What causes pipeline stalls?"
4. "How does branch prediction work?"

**Key Talking Points**:
- Modern CPUs have 10-20+ pipeline stages
- Branch misprediction can cost 15-20 cycles
- Out-of-order execution helps hide latencies
- Superscalar CPUs execute multiple instructions per cycle

---

## Key Takeaways

✅ CPU executes **billions of simple operations** per second  
✅ **Fetch-Decode-Execute-Store** is the fundamental cycle  
✅ **Pipelining** overlaps instructions for higher throughput  
✅ **Hazards** (data dependencies, branches) can stall the pipeline  
✅ **Branch prediction** guesses branch outcomes to avoid stalls  
✅ Modern CPUs are **superscalar** — multiple pipelines in parallel  
✅ Clock speed isn't everything — IPC matters too!
`,
    },

    'step-2-5-2': {
        title: 'Memory Hierarchy & Caches',
        content: `# Memory Hierarchy & Caches

## Why This Matters

Memory access is often the **biggest performance bottleneck** in modern programs. The CPU can execute billions of operations per second, but waiting for RAM can take hundreds of cycles. Understanding memory hierarchy helps you:

- Write code that runs **10-100x faster** through better data access patterns
- Understand why some algorithms perform mysteriously poorly
- Optimize data structures for cache efficiency
- Answer performance-focused interview questions

---

## The Office Analogy 🏢

Think of memory hierarchy like accessing documents at work:

| Memory Level | Analogy | Access Time |
|--------------|---------|-------------|
| **Registers** | Items in your hands | Instant |
| **L1 Cache** | Desktop | 1 second |
| **L2 Cache** | Desk drawer | 5 seconds |
| **L3 Cache** | Filing cabinet nearby | 15 seconds |
| **RAM** | Storage room down the hall | 2 minutes |
| **SSD** | Offsite warehouse | 2 hours |
| **HDD** | International warehouse | 2 weeks |

---

## Memory Hierarchy

\`\`\`mermaid
flowchart TB
    subgraph mem["Memory Hierarchy"]
        direction TB
        REG["Registers<br/>~1 cycle, ~1KB"]
        L1["L1 Cache<br/>~4 cycles, 32-64KB"]
        L2["L2 Cache<br/>~12 cycles, 256KB-1MB"]
        L3["L3 Cache<br/>~40 cycles, 8-32MB"]
        RAM["RAM<br/>~200 cycles, 16-64GB"]
        SSD["SSD/Disk<br/>~100,000+ cycles, TB"]
    end
    REG --> L1 --> L2 --> L3 --> RAM --> SSD
    style REG fill:#22c55e
    style L1 fill:#84cc16
    style L2 fill:#eab308
    style L3 fill:#f97316
    style RAM fill:#ef4444
    style SSD fill:#991b1b
\`\`\`

### Real-World Latency Numbers

| Level | Latency | If L1 = 1 second |
|-------|---------|------------------|
| L1 Cache | ~4 cycles (~1 ns) | 1 second |
| L2 Cache | ~12 cycles (~3 ns) | 3 seconds |
| L3 Cache | ~40 cycles (~10 ns) | 10 seconds |
| RAM | ~200 cycles (~50 ns) | 1 minute |
| SSD | ~100,000 cycles (~25 µs) | 8 hours |
| HDD | ~10,000,000 cycles (~10 ms) | 1 month |

---

## Cache Locality: The Key to Speed

### Temporal Locality

**Recently accessed data is likely to be accessed again.**

\`\`\`python
# Good temporal locality
for _ in range(1000):
    total += counter  # Same variable accessed repeatedly
    counter += 1
\`\`\`

### Spatial Locality

**Data near recently accessed data is likely to be accessed next.**

\`\`\`python
# GOOD: Sequential access (spatial locality)
# Cache line loads arr[0:15], then arr[16:31], etc.
for i in range(len(arr)):
    total += arr[i]  # ~0.5 ns per element

# BAD: Strided access (poor spatial locality)  
# Cache line loads arr[0:15], but we only use arr[0]
for i in range(0, len(arr), 64):
    total += arr[i]  # ~50 ns per element (100x slower!)
\`\`\`

---

## Cache Lines: How Data is Fetched

Data isn't fetched byte-by-byte — it's fetched in **cache lines** (typically 64 bytes).

\`\`\`mermaid
flowchart LR
    subgraph cacheline["Cache Line (64 bytes)"]
        A["arr[0]"] 
        B["arr[1]"]
        C["arr[2]"]
        D["..."]
        E["arr[15]"]
    end
    MEM["Memory"] -->|"Fetch whole line"| cacheline
\`\`\`

**Implication**: Access arr[0], and arr[1] through arr[15] come free!

---

## Cache Misses

| Miss Type | Cause | Example |
|-----------|-------|---------|
| **Compulsory** | First access to data | Loading a new array |
| **Capacity** | Working set > cache size | Array too large for L3 |
| **Conflict** | Multiple items map to same slot | Unlucky memory layout |

---

## Code Examples: Seeing the Difference

### Row-Major vs Column-Major

\`\`\`python
import numpy as np
import time

# 10000x10000 matrix
matrix = np.random.rand(10000, 10000)

# ROW-MAJOR: Sequential memory access (fast)
start = time.time()
for i in range(10000):
    for j in range(10000):
        _ = matrix[i, j]  # Same row = contiguous memory
print(f"Row-major: {time.time() - start:.2f}s")

# COLUMN-MAJOR: Strided memory access (slow)
start = time.time()
for j in range(10000):
    for i in range(10000):
        _ = matrix[i, j]  # Different row each time = cache miss
print(f"Column-major: {time.time() - start:.2f}s")

# Typical result:
# Row-major: 2.5s
# Column-major: 25s (10x slower!)
\`\`\`

### Structure of Arrays vs Array of Structures

\`\`\`python
# ARRAY OF STRUCTURES (poor cache use for single-field access)
class Particle:
    def __init__(self):
        self.x = 0.0   # 8 bytes
        self.y = 0.0   # 8 bytes
        self.z = 0.0   # 8 bytes
        self.mass = 0.0  # 8 bytes

particles = [Particle() for _ in range(1000000)]

# Accessing x values: jumps 32 bytes between each x
for p in particles:
    total += p.x  # Cache misses!

# STRUCTURE OF ARRAYS (great cache use)
class Particles:
    def __init__(self, n):
        self.x = [0.0] * n  # All x values contiguous
        self.y = [0.0] * n
        self.z = [0.0] * n
        self.mass = [0.0] * n

particles = Particles(1000000)

# Accessing x values: sequential memory
for x in particles.x:
    total += x  # Cache hits!
\`\`\`

---

## Cache-Friendly Patterns

| Pattern | Why It's Fast |
|---------|---------------|
| Sequential array access | Spatial locality |
| Small working set | Fits in cache |
| Data reuse | Temporal locality |
| Structure of Arrays | Contiguous field access |
| Cache blocking | Tile data to fit in L2/L3 |

---

## Interview Insights 💡

**Common Questions**:
1. "Why is accessing a 2D array row-by-row faster than column-by-column?"
2. "What is a cache line?"
3. "How would you optimize code for cache performance?"
4. "Explain temporal and spatial locality"

**Key Talking Points**:
- Memory access is often the bottleneck, not computation
- Cache lines are 64 bytes — adjacent data comes free
- Row-major vs column-major access can differ 10x in speed
- Profile first, then optimize hot spots

---

## Key Takeaways

✅ Memory access is the **biggest bottleneck** in modern programs  
✅ Cache levels trade off **speed vs capacity**  
✅ **Spatial locality**: Access contiguous memory (sequential arrays)  
✅ **Temporal locality**: Reuse data while it's still in cache  
✅ Cache lines are **64 bytes** — adjacent data is free  
✅ **Row-major** access patterns beat column-major by 10x+  
✅ Structure of Arrays beats Array of Structures for single-field loops
`,
    },

    'step-2-5-3': {
        title: 'CPU Optimizations',
        content: `# CPU Optimizations

## Why This Matters

Modern CPUs have incredible optimization capabilities — but they rely on predictable patterns. Understanding these optimizations helps you:

- Avoid code patterns that **destroy performance** by 10x
- Leverage **SIMD** for automatic speedups on arrays
- Write code that **plays nice** with the CPU's out-of-order engine
- Answer performance interview questions with confidence

---

## Branch Prediction

Modern CPUs use **branch prediction** to guess whether a conditional branch will be taken. Wrong guesses cost 15-20 cycles!

### The Problem

\`\`\`mermaid
flowchart LR
    F["Fetch IF"] --> D["Decode IF"]
    D --> E["Execute: <br/>Evaluate condition"]
    E -->|"True?"| T["Fetch THEN branch"]
    E -->|"False?"| EL["Fetch ELSE branch"]
    
    style E fill:#f59e0b
\`\`\`

The CPU must **start fetching the next instruction before knowing** which branch to take!

### Predictable vs Unpredictable

\`\`\`cpp
// GOOD: Highly predictable (99.99% correct predictions)
for (int i = 0; i < 1000000; i++) {
    // Loop condition almost always true
}

// BAD: Completely unpredictable (50% mispredictions!)
for (int i = 0; i < n; i++) {
    if (random() % 2 == 0) {  // Random = unpredictable
        sum += arr[i];
    }
}

// BETTER: Sort first, then branch becomes predictable
std::sort(arr.begin(), arr.end());
for (int i = 0; i < n; i++) {
    if (arr[i] >= 128) {  // Predictable after sorting
        sum += arr[i];
    }
}
\`\`\`

### Famous Example: Sorting Makes Conditionals Faster

\`\`\`python
import random
import time

data = [random.randint(0, 255) for _ in range(100000)]

# UNSORTED: Branch prediction fails ~50%
start = time.time()
for x in data:
    if x >= 128:
        total += x
print(f"Unsorted: {time.time() - start:.3f}s")

# SORTED: Branch prediction succeeds ~100%
data.sort()
start = time.time()
for x in data:
    if x >= 128:
        total += x
print(f"Sorted: {time.time() - start:.3f}s")

# Result: Sorted is 2-5x faster!
\`\`\`

---

## SIMD: Single Instruction Multiple Data

SIMD processes **multiple values in a single instruction** using wide registers (128-512 bits).

\`\`\`mermaid
flowchart LR
    subgraph scalar["Scalar (1 at a time)"]
        A1["a[0] + b[0]"]
        A2["a[1] + b[1]"]
        A3["a[2] + b[2]"]
        A4["a[3] + b[3]"]
    end
    subgraph simd["SIMD (4 at a time)"]
        V["a[0:4] + b[0:4]"]
    end
    style simd fill:#22c55e
\`\`\`

### Using SIMD in Python (NumPy)

\`\`\`python
import numpy as np
import time

a = np.random.rand(10000000)
b = np.random.rand(10000000)

# Python loop (slow - no SIMD)
start = time.time()
c = [a[i] + b[i] for i in range(len(a))]
print(f"Python loop: {time.time() - start:.3f}s")

# NumPy (uses SIMD automatically)
start = time.time()
c = a + b
print(f"NumPy: {time.time() - start:.3f}s")

# Result: NumPy is 100x faster!
\`\`\`

### SIMD Instruction Sets

| Set | Register Width | Floats per Op |
|-----|----------------|---------------|
| SSE | 128-bit | 4 |
| AVX | 256-bit | 8 |
| AVX-512 | 512-bit | 16 |

---

## Out-of-Order Execution

Modern CPUs don't execute instructions in order! They **reorder to avoid stalls**.

\`\`\`
Original order:
1. LOAD R1, [mem]    ; Takes 200 cycles
2. ADD R2, R1, 5     ; Depends on R1 (must wait)
3. MUL R3, R4, R5    ; Independent of 1 and 2

CPU execution order:
1. LOAD R1, [mem]    ; Start memory load
3. MUL R3, R4, R5    ; Execute while waiting for load!
2. ADD R2, R1, 5     ; Execute after load completes
\`\`\`

**Key insight**: Write code with independent operations that can execute in parallel!

---

## Instruction-Level Parallelism

Modern CPUs can execute **4-8 instructions per cycle** if dependencies allow:

\`\`\`cpp
// BAD: Chain of dependencies
for (int i = 0; i < n; i++) {
    sum = sum + arr[i];  // Each add depends on previous
}

// BETTER: Multiple accumulators (parallelizable)
for (int i = 0; i < n; i += 4) {
    sum1 += arr[i];
    sum2 += arr[i+1];
    sum3 += arr[i+2];
    sum4 += arr[i+3];
}
total = sum1 + sum2 + sum3 + sum4;
\`\`\`

---

## Compiler Optimizations

Let the compiler help you:

\`\`\`bash
# Optimization levels
gcc -O0 file.c    # No optimization (for debugging)
gcc -O2 file.c    # Good optimization (recommended)
gcc -O3 file.c    # Aggressive optimization
gcc -Ofast file.c # Maximum speed (may change semantics)

# Enable specific optimizations
gcc -O3 -march=native file.c  # Use all CPU features
\`\`\`

### Common Compiler Optimizations

| Optimization | What It Does |
|--------------|--------------|
| Loop unrolling | Reduce branch overhead |
| Function inlining | Eliminate call overhead |
| Constant folding | Compute constants at compile time |
| Dead code elimination | Remove unreachable code |
| Auto-vectorization | Convert loops to SIMD |

---

## Interview Insights 💡

**Common Questions**:
1. "Why is sorting data before processing sometimes faster?"
2. "What is SIMD and when would you use it?"
3. "How does branch prediction work?"
4. "What compiler flags would you use for performance?"

**Key Talking Points**:
- Branch misprediction costs 15-20 cycles
- Sorted data → predictable branches
- Use NumPy/Eigen for automatic SIMD
- Multiple accumulators enable ILP

---

## Key Takeaways

✅ **Branch prediction** guesses conditional outcomes — unpredictable branches hurt  
✅ Sort data before conditionals to make branches predictable  
✅ **SIMD** processes 4-16 values per instruction — use NumPy/Eigen  
✅ **Out-of-order execution** hides latency if operations are independent  
✅ Use **multiple accumulators** to enable instruction-level parallelism  
✅ Let the compiler optimize with **-O2 or -O3**  
✅ Profile first, optimize bottlenecks only
`,
    },

    'step-2-5-4': {
        title: 'Modern Hardware Concepts',
        content: `# Modern Hardware Concepts

## Why This Matters

Hardware trends shape software architecture. Understanding modern hardware helps you:

- Make informed decisions about **parallelization** strategies
- Know when to use **CPU vs GPU** for workloads
- Design systems that scale across **NUMA nodes** and clusters
- Answer system design interview questions with hardware awareness

---

## Multi-Core Processors

Modern CPUs have multiple **cores** — essentially separate processors on one chip.

\`\`\`mermaid
flowchart TB
    subgraph cpu["Multi-Core CPU"]
        subgraph c1["Core 1"]
            L1A["L1 Cache"]
            L2A["L2 Cache"]
        end
        subgraph c2["Core 2"]
            L1B["L1 Cache"]
            L2B["L2 Cache"]
        end
        subgraph c3["Core 3"]
            L1C["L1 Cache"]
            L2C["L2 Cache"]
        end
        subgraph c4["Core 4"]
            L1D["L1 Cache"]
            L2D["L2 Cache"]
        end
        L3["Shared L3 Cache"]
    end
    RAM["RAM"]
    c1 --> L3
    c2 --> L3
    c3 --> L3
    c4 --> L3
    L3 --> RAM
    style L3 fill:#f59e0b
\`\`\`

### Key Facts

- Each core has **private L1/L2** caches
- All cores share **L3 cache**
- Cores can run **independent threads**
- Modern laptops: 4-16 cores; servers: 64-128 cores

### Using All Cores (Python)

\`\`\`python
import multiprocessing as mp

def process_chunk(data):
    return sum(x * x for x in data)

if __name__ == '__main__':
    data = list(range(10000000))
    chunks = [data[i::mp.cpu_count()] for i in range(mp.cpu_count())]
    
    # Use all CPU cores
    with mp.Pool(mp.cpu_count()) as pool:
        results = pool.map(process_chunk, chunks)
    
    total = sum(results)
    print(f"Using {mp.cpu_count()} cores: total = {total}")
\`\`\`

---

## Hyper-Threading (SMT)

**Simultaneous Multi-Threading (SMT)** lets one physical core run **two logical threads**.

\`\`\`mermaid
flowchart LR
    subgraph core["Physical Core"]
        ALU["ALU"]
        R1["Thread 1 Registers"]
        R2["Thread 2 Registers"]
    end
    T1["Thread 1"] --> R1
    T2["Thread 2"] --> R2
    R1 --> ALU
    R2 --> ALU
\`\`\`

### How It Works

- While Thread 1 waits for memory, Thread 2 uses the ALU
- Gives **~30% more throughput** (not 100% — cores are shared)
- "4 cores, 8 threads" means 4 physical + 4 hyper-threaded

### When SMT Helps

| Workload | SMT Benefit |
|----------|-------------|
| Web servers (I/O bound) | High (30%+) |
| Database queries | Medium |
| CPU-bound math | Low (can even hurt) |
| Security-sensitive | Disable (side channels) |

---

## CPU vs GPU

\`\`\`mermaid
flowchart LR
    subgraph cpu["CPU: Few Fast Cores"]
        C1["Core 1"]
        C2["Core 2"]
        C3["Core 3"]
        C4["Core 4"]
    end
    subgraph gpu["GPU: Many Slow Cores"]
        G["1000s of<br/>small cores"]
    end
    cpu -->|"Sequential<br/>Complex logic"| W1["Web Server"]
    gpu -->|"Parallel<br/>Same op on all"| W2["ML Training"]
\`\`\`

### Comparison

| Aspect | CPU | GPU |
|--------|-----|-----|
| **Cores** | 4–128 | 1,000–10,000 |
| **Per-core speed** | Very fast | Slower |
| **Cache per core** | Large | Small |
| **Best for** | Sequential, branchy | Parallel, uniform |

### When to Use GPU

| Use GPU | Use CPU |
|---------|---------|
| Matrix multiplication | Web request handling |
| Neural network training | JSON parsing |
| Image processing | Database queries |
| Physics simulations | Business logic |

### GPU in Python

\`\`\`python
import torch

# Move tensors to GPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

a = torch.randn(10000, 10000).to(device)
b = torch.randn(10000, 10000).to(device)

# Matrix multiply on GPU (1000x faster than CPU for large matrices)
c = torch.matmul(a, b)
\`\`\`

---

## NUMA: Non-Uniform Memory Access

In multi-socket servers, each CPU has **local memory** that's faster to access.

\`\`\`mermaid
flowchart LR
    subgraph s1["Socket 1"]
        CPU1["CPU 1"]
        RAM1["RAM 1"]
    end
    subgraph s2["Socket 2"]
        CPU2["CPU 2"]
        RAM2["RAM 2"]
    end
    CPU1 -->|"Fast"| RAM1
    CPU2 -->|"Fast"| RAM2
    CPU1 -.->|"Slow"| RAM2
    CPU2 -.->|"Slow"| RAM1
\`\`\`

### NUMA Facts

- Local memory access: ~50ns
- Remote memory access: ~100ns (2x slower!)
- Operating system tries to keep data local

### NUMA-Aware Programming

\`\`\`python
# Check NUMA topology on Linux
import subprocess
result = subprocess.run(['lscpu'], capture_output=True, text=True)
print(result.stdout)

# For NUMA-aware allocation, use:
# - numactl command
# - Process pinning
# - Memory-bound thread placement
\`\`\`

---

## Memory Bandwidth

Modern systems are often **memory bandwidth limited**, not compute limited.

| Metric | Value |
|--------|-------|
| CPU compute | ~1 TFLOP/s |
| Memory bandwidth | ~50 GB/s |
| Bytes per FLOP | 50 bytes |

**Implication**: If your operation uses < 50 bytes/FLOP, you're compute bound. More? Memory bound.

---

## Emerging Hardware Trends

| Trend | Description |
|-------|-------------|
| **Apple M-series** | ARM CPU + GPU + Neural Engine on one chip |
| **TPUs** | Google's tensor processing units for ML |
| **FPGA** | Field-programmable chips for custom logic |
| **Quantum** | Experimental, not production-ready |
| **CXL** | Memory disaggregation for data centers |

---

## Interview Insights 💡

**Common Questions**:
1. "When would you use GPU over CPU?"
2. "What is NUMA and why does it matter?"
3. "How many cores should you use for parallelization?"
4. "What's the difference between physical and logical cores?"

**Key Talking Points**:
- More cores ≠ always faster (Amdahl's Law)
- GPUs excel at data parallelism (same op on many items)
- NUMA matters for servers — keep data local
- Know when you're memory-bound vs compute-bound

---

## Key Takeaways

✅ **Multi-core CPUs** enable parallelism — use all cores for parallel work  
✅ **Hyper-threading** adds ~30% throughput by running 2 threads per core  
✅ **GPU** has 1000s of cores for massively parallel workloads (ML, graphics)  
✅ **NUMA** means local memory is faster — keep threads and data together  
✅ Many workloads are **memory-bound**, not compute-bound  
✅ Know when to parallelize — Amdahl's Law limits speedup  
✅ Emerging: ARM chips, TPUs, CXL memory disaggregation
`,
    },
};

// Security Fundamentals content (Act 2, Scene 2-6)
export const securityContent: Record<string, { title: string; content: string }> = {
    'step-2-6-1': {
        title: 'Authentication vs Authorization',
        content: `# Authentication vs Authorization

## Why This Matters

Security breaches often stem from confused or missing authentication/authorization. Understanding the difference helps you:

- Design **secure systems** that properly control access
- Identify and fix **security vulnerabilities** in existing code
- Answer **security interview questions** confidently
- Avoid headlines like "Company exposes 100M user records"

---

## The Bouncer Analogy 🎫

Think of a nightclub with security:

| Security Step | Concept | What It Does |
|---------------|---------|--------------|
| **Bouncer checks ID** | Authentication | "Are you who you claim to be?" |
| **VIP list check** | Authorization | "Are you allowed in the VIP section?" |
| **Wristband** | Session/Token | "Proof you've been verified" |

You can be authenticated (valid ID) but not authorized (not on VIP list)!

---

## Authentication: Who Are You?

\`\`\`mermaid
flowchart LR
    U["User"] -->|"username + password"| S["Server"]
    S -->|"Valid?"| DB["Database"]
    DB -->|"Yes"| T["Issue Token/Session"]
    DB -->|"No"| E["Reject: 401 Unauthorized"]
\`\`\`

### Authentication Factors

| Factor Type | What It Is | Examples |
|-------------|------------|----------|
| **Something you know** | Secret in your head | Password, PIN, security question |
| **Something you have** | Physical possession | Phone (SMS/TOTP), YubiKey, smart card |
| **Something you are** | Biometric | Fingerprint, Face ID, retina scan |

### Multi-Factor Authentication (MFA)

Combine 2+ factors for exponentially stronger security:

\`\`\`python
# Typical MFA flow
def login(username, password, totp_code):
    # Factor 1: Something you know
    user = verify_password(username, password)
    if not user:
        return "Invalid credentials", 401
    
    # Factor 2: Something you have (phone with TOTP app)
    if not verify_totp(user, totp_code):
        return "Invalid 2FA code", 401
    
    return create_session(user)
\`\`\`

---

## Authorization: What Can You Do?

\`\`\`mermaid
flowchart LR
    U["Authenticated User"] -->|"Request: DELETE /users/123"| S["Server"]
    S -->|"Check permissions"| P["Permission System"]
    P -->|"Allowed"| A["Perform Action"]
    P -->|"Denied"| D["Reject: 403 Forbidden"]
\`\`\`

### Authorization Models

#### Role-Based Access Control (RBAC)

Assign users to roles, roles have permissions:

\`\`\`python
ROLES = {
    'admin': ['read', 'write', 'delete', 'manage_users'],
    'editor': ['read', 'write'],
    'viewer': ['read'],
}

def can_user(user, action):
    return action in ROLES.get(user.role, [])

# Usage
if can_user(current_user, 'delete'):
    delete_resource(resource_id)
else:
    return "Forbidden", 403
\`\`\`

#### Attribute-Based Access Control (ABAC)

Decisions based on attributes (more flexible):

\`\`\`python
def can_access_document(user, document):
    # Multiple attributes considered
    if user.department != document.department:
        return False
    if document.classification > user.clearance_level:
        return False
    if user.location not in document.allowed_regions:
        return False
    return True
\`\`\`

---

## Session Management

### Cookie-Based Sessions

\`\`\`python
from flask import Flask, session

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']  # Never hardcode!

@app.route('/login', methods=['POST'])
def login():
    user = authenticate(request.form['username'], request.form['password'])
    if user:
        session['user_id'] = user.id
        session['logged_in_at'] = datetime.utcnow().isoformat()
        return redirect('/dashboard')
    return "Invalid credentials", 401

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')

# Protected route
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/login')
    return render_template('dashboard.html')
\`\`\`

### JWT (JSON Web Tokens)

Stateless tokens containing claims:

\`\`\`python
import jwt
from datetime import datetime, timedelta

SECRET_KEY = os.environ['JWT_SECRET']

def create_token(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(hours=24),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token
\`\`\`

### Session vs JWT

| Aspect | Session (Cookies) | JWT |
|--------|-------------------|-----|
| **Storage** | Server-side | Client-side |
| **Scalability** | Requires shared store | Stateless, scales easily |
| **Revocation** | Easy (delete from store) | Hard (need blocklist) |
| **Size** | Small cookie | Larger (contains claims) |
| **Best for** | Traditional web apps | APIs, microservices |

---

## Common Vulnerabilities

| Vulnerability | Description | Prevention |
|---------------|-------------|------------|
| **Credential stuffing** | Reused passwords from breaches | Rate limiting, MFA |
| **Session fixation** | Attacker sets victim's session ID | Regenerate session on login |
| **Session hijacking** | Stealing session tokens | HttpOnly cookies, HTTPS |
| **Broken access control** | IDOR, missing auth checks | Verify permissions on every request |

---

## Code Example: Complete Auth System

\`\`\`python
from functools import wraps
from flask import Flask, request, jsonify, g
import jwt

app = Flask(__name__)

# Decorator for authentication
def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        payload = verify_token(token)
        if not payload:
            return jsonify({'error': 'Unauthorized'}), 401
        g.current_user = get_user(payload['user_id'])
        return f(*args, **kwargs)
    return decorated

# Decorator for authorization
def require_role(*roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if g.current_user.role not in roles:
                return jsonify({'error': 'Forbidden'}), 403
            return f(*args, **kwargs)
        return decorated
    return decorator

# Usage
@app.route('/admin/users')
@require_auth
@require_role('admin')
def list_users():
    return jsonify(get_all_users())
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between authentication and authorization?"
2. "How would you implement MFA?"
3. "Session cookies vs JWT — when would you use each?"
4. "How do you prevent session hijacking?"

**Key Talking Points**:
- Authentication = identity verification; Authorization = permission checking
- MFA combines multiple factor types (know/have/are)
- Sessions easier to revoke; JWTs scale better
- Always check authorization on the server, never trust the client

---

## Key Takeaways

✅ **Authentication** verifies identity ("Who are you?")  
✅ **Authorization** checks permissions ("What can you do?")  
✅ **MFA** combines 2+ factors (know/have/are) for stronger security  
✅ **RBAC** assigns permissions via roles; **ABAC** uses attributes  
✅ **Sessions** are server-side; **JWTs** are stateless client-side tokens  
✅ Always verify authorization **on every request**, server-side  
✅ 401 = Not authenticated; 403 = Authenticated but not authorized
`,
    },

    'step-2-6-2': {
        title: 'OWASP Top 10',
        content: `# OWASP Top 10

## Why This Matters

The **OWASP Top 10** is the industry standard for web application security risks. Understanding these vulnerabilities helps you:

- Write code that **resists common attacks**
- Pass **security code reviews** and audits
- Answer **security interview questions**
- Avoid becoming the next breach headline

---

## What is OWASP?

The **Open Web Application Security Project (OWASP)** is a nonprofit that produces freely available security resources. The Top 10 list is updated every few years based on real-world vulnerability data.

---

## 1. Injection (SQL, Command, etc.)

Attacker data is interpreted as code:

\`\`\`mermaid
flowchart LR
    A["Attacker Input:<br/>' OR 1=1 --"] --> F["Form Field"]
    F --> S["Server"]
    S --> Q["Query: SELECT * FROM users<br/>WHERE name = '' OR 1=1 --'"]
    Q --> DB["Database: Returns ALL users!"]
    style A fill:#ef4444
    style DB fill:#ef4444
\`\`\`

### Vulnerable vs Safe Code

\`\`\`python
# ❌ VULNERABLE: String concatenation
query = f"SELECT * FROM users WHERE name = '{user_input}'"
# Input: ' OR '1'='1' -- 
# Result: Returns ALL users!

# ✅ SAFE: Parameterized query
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))

# ✅ SAFE: ORM (automatically parameterizes)
user = User.query.filter_by(name=user_input).first()
\`\`\`

### Other Injection Types

| Type | Example Attack |
|------|---------------|
| SQL Injection | \`' OR 1=1 --\` |
| Command Injection | \`; rm -rf /\` |
| LDAP Injection | \`*)(uid=*))(|(uid=*\` |
| XPath Injection | \`' or '1'='1\` |

---

## 2. Broken Authentication

Weak authentication allows account takeover:

| Vulnerability | Example | Fix |
|---------------|---------|-----|
| Weak passwords | \`password123\` | Enforce complexity, check against breached lists |
| No rate limiting | Brute force 1000 passwords/sec | Limit to 5 attempts/minute |
| Credential stuffing | Reused passwords | Implement MFA |
| Insecure session | Predictable session IDs | Use cryptographic random IDs |

\`\`\`python
# ✅ Proper password hashing
import bcrypt

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed)
\`\`\`

---

## 3. Sensitive Data Exposure

Unprotected data in transit or at rest:

\`\`\`python
# ❌ BAD: Storing passwords in plaintext
user.password = request.form['password']

# ✅ GOOD: Hash passwords
user.password_hash = hash_password(request.form['password'])

# ❌ BAD: Sensitive data in logs
logger.info(f"User {user.email} logged in with password {password}")

# ✅ GOOD: Never log sensitive data
logger.info(f"User {user.email} logged in")
\`\`\`

**Rules**:
- Always use HTTPS (TLS 1.2+)
- Encrypt data at rest (database, backups)
- Never log passwords, tokens, or PII

---

## 4. XML External Entities (XXE)

Dangerous when parsing untrusted XML:

\`\`\`xml
<!-- Malicious XML that reads /etc/passwd -->
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>&xxe;</user>
\`\`\`

\`\`\`python
# ✅ SAFE: Disable external entities
import defusedxml.ElementTree as ET
tree = ET.parse(xml_file)  # Safe parser
\`\`\`

---

## 5. Broken Access Control

Users accessing data they shouldn't:

\`\`\`python
# ❌ VULNERABLE: Insecure Direct Object Reference (IDOR)
@app.route('/api/users/<user_id>/data')
def get_user_data(user_id):
    return User.query.get(user_id).to_dict()  # No auth check!

# ✅ SAFE: Always verify authorization
@app.route('/api/users/<user_id>/data')
@require_auth
def get_user_data(user_id):
    if current_user.id != int(user_id) and not current_user.is_admin:
        return jsonify({'error': 'Forbidden'}), 403
    return User.query.get(user_id).to_dict()
\`\`\`

---

## 6. Security Misconfiguration

Default settings, verbose errors, unnecessary features:

| Misconfiguration | Risk | Fix |
|-----------------|------|-----|
| Default credentials | Admin access | Change immediately |
| Debug mode in production | Stack traces exposed | Disable debug |
| Unnecessary ports open | Attack surface | Close unused ports |
| Directory listing | File exposure | Disable in web server |

---

## 7. Cross-Site Scripting (XSS)

Attacker script runs in victim's browser:

\`\`\`mermaid
flowchart LR
    A["Attacker posts:<br/>&lt;script&gt;steal(cookie)&lt;/script&gt;"] --> S["Server stores it"]
    S --> V["Victim views page"]
    V --> B["Browser executes script!"]
    B --> C["Cookie stolen"]
    style A fill:#ef4444
    style C fill:#ef4444
\`\`\`

### XSS Types

| Type | Vector | Example |
|------|--------|---------|
| **Stored** | Database | Comment contains \`<script>\` |
| **Reflected** | URL parameter | \`?search=<script>...\` |
| **DOM-based** | Client-side JS | \`document.write(location.hash)\` |

### Prevention

\`\`\`python
# ✅ Use templating with auto-escaping (Jinja2, React, etc.)
# Jinja2 (Flask default)
{{ user_input }}  # Auto-escaped

# React - auto-escaped
<div>{userInput}</div>

# ❌ DANGEROUS - raw HTML
{{ user_input | safe }}  # Don't do this with untrusted input!
\`\`\`

---

## 8. Insecure Deserialization

Untrusted data → object creation → code execution:

\`\`\`python
# ❌ DANGEROUS: pickle can execute arbitrary code
import pickle
data = pickle.loads(untrusted_input)  # Remote code execution!

# ✅ SAFE: Use JSON for untrusted data
import json
data = json.loads(untrusted_input)  # Only creates data structures
\`\`\`

---

## 9. Using Components with Known Vulnerabilities

Outdated libraries contain known exploits:

\`\`\`bash
# Check for vulnerabilities
pip-audit                    # Python
npm audit                    # JavaScript
bundle audit                 # Ruby
snyk test                    # Multi-language

# Automate with Dependabot, Snyk, or Renovate
\`\`\`

---

## 10. Insufficient Logging & Monitoring

Not detecting attacks when they happen:

\`\`\`python
import logging

logger = logging.getLogger(__name__)

@app.route('/login', methods=['POST'])
def login():
    user = authenticate(request.form)
    if not user:
        # Log failed attempts for monitoring
        logger.warning(
            f"Failed login attempt for {request.form['username']} "
            f"from IP {request.remote_addr}"
        )
        return "Invalid credentials", 401
    
    logger.info(f"Successful login: {user.email}")
    return redirect('/dashboard')
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "What is SQL injection and how do you prevent it?"
2. "Explain XSS types and prevention"
3. "How would you secure a new web application?"
4. "What's the difference between authentication and authorization vulnerabilities?"

**Key Answer Pattern**:
- Describe the vulnerability
- Give a concrete example
- Explain the fix with code

---

## Key Takeaways

✅ **Injection**: Use parameterized queries, never concatenate  
✅ **Authentication**: Hash passwords, implement MFA, rate limit  
✅ **XSS**: Auto-escape output, use CSP headers  
✅ **Access Control**: Verify permissions on every request  
✅ **Components**: Regularly update dependencies, run audits  
✅ **Logging**: Log security events, monitor for anomalies  
✅ Always follow the principle of **least privilege**
`,
    },

    'step-2-6-3': {
        title: 'Secure Coding Practices',
        content: `# Secure Coding Practices

## Why This Matters

Security vulnerabilities are mostly code bugs. Following secure coding practices helps you:

- Write code that **resists attacks** from the start
- Pass **security reviews** and penetration tests
- Build **user trust** by protecting their data
- Avoid costly **post-breach cleanup** and litigation

---

## The Defense in Depth Approach

\`\`\`mermaid
flowchart TB
    subgraph layers["Defense in Depth"]
        L1["Layer 1: Input Validation"]
        L2["Layer 2: Parameterized Queries"]
        L3["Layer 3: Output Encoding"]
        L4["Layer 4: Access Control"]
        L5["Layer 5: Secure Headers"]
        L6["Layer 6: Logging & Monitoring"]
    end
    ATK["Attacker"] --> L1
    L1 --> L2 --> L3 --> L4 --> L5 --> L6
    L6 --> DATA["Protected Data"]
    style ATK fill:#ef4444
    style DATA fill:#22c55e
\`\`\`

**Never rely on a single defense** — each layer catches what the previous one missed.

---

## 1. Input Validation

**Trust nothing from the user** — validate everything.

### Validation Strategies

| Strategy | Description | Example |
|----------|-------------|---------|
| **Whitelist** | Only allow known-good patterns | Email: \`^[a-zA-Z0-9._%+-]+@...\` |
| **Type checking** | Ensure correct data type | \`int(user_id)\` throws on "abc" |
| **Length limits** | Prevent buffer overflows, DoS | Max 100 chars for name |
| **Range validation** | Keep numbers in bounds | Age: 0-150 |

\`\`\`python
from pydantic import BaseModel, validator, Field
import re

class UserInput(BaseModel):
    email: str = Field(..., max_length=255)
    age: int = Field(..., ge=0, le=150)
    username: str = Field(..., min_length=3, max_length=30)
    
    @validator('email')
    def validate_email(cls, v):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v.lower()
    
    @validator('username')
    def validate_username(cls, v):
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('Username can only contain letters, numbers, and underscores')
        return v

# Usage
try:
    user = UserInput(email="test@example.com", age=25, username="john_doe")
except ValueError as e:
    return {"error": str(e)}, 400
\`\`\`

---

## 2. Output Encoding

**Encode output for the context** — HTML, JavaScript, SQL, URL all need different encoding.

\`\`\`python
import html
from urllib.parse import quote

user_input = '<script>alert("xss")</script>'

# HTML context - escape HTML entities
safe_html = html.escape(user_input)
# Result: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;

# URL context - percent encode
safe_url = quote(user_input)
# Result: %3Cscript%3Ealert%28%22xss%22%29%3C%2Fscript%3E

# JavaScript context - JSON encode
import json
safe_js = json.dumps(user_input)
# Result: "<script>alert(\\"xss\\")</script>"
\`\`\`

### Use Templating (Auto-Escapes!)

\`\`\`html
<!-- Jinja2 - auto-escapes by default -->
<div>{{ user_input }}</div>

<!-- DANGER: Explicitly bypassing escaping -->
<div>{{ user_input | safe }}</div>  <!-- Only for trusted content! -->
\`\`\`

---

## 3. CSRF Protection

Prevent attackers from forging requests on behalf of authenticated users:

\`\`\`mermaid
flowchart LR
    subgraph attack["CSRF Attack"]
        A["Attacker Site"] -->|"Hidden form"| V["Victim's Browser"]
        V -->|"POST /transfer?to=attacker"| S["Bank Server"]
    end
    style A fill:#ef4444
\`\`\`

### Protection

\`\`\`python
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)

# In HTML form
\`\`\`

\`\`\`html
<form method="POST" action="/transfer">
    <input type="hidden" name="csrf_token" value="{{ csrf_token() }}">
    <input type="text" name="amount">
    <button type="submit">Transfer</button>
</form>
\`\`\`

\`\`\`python
# For AJAX, include token in header
headers = {
    'X-CSRF-Token': csrf_token
}
\`\`\`

---

## 4. Security Headers

Add defense-in-depth with HTTP headers:

\`\`\`python
@app.after_request
def add_security_headers(response):
    # Prevent XSS by blocking inline scripts
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    
    # Prevent MIME type sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Prevent clickjacking
    response.headers['X-Frame-Options'] = 'DENY'
    
    # Force HTTPS
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    # Prevent XSS (legacy browsers)
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    return response
\`\`\`

| Header | Protection |
|--------|------------|
| **Content-Security-Policy** | Blocks XSS by whitelisting sources |
| **X-Content-Type-Options** | Prevents MIME sniffing attacks |
| **X-Frame-Options** | Prevents clickjacking |
| **Strict-Transport-Security** | Forces HTTPS |

---

## 5. Rate Limiting

Prevent brute force and DoS attacks:

\`\`\`python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Strict limits on auth endpoints
@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    # After 5 failed attempts, block for 1 minute
    pass

@app.route('/api/password-reset', methods=['POST'])
@limiter.limit("3 per hour")
def password_reset():
    pass
\`\`\`

---

## 6. Secrets Management

**Never commit secrets to version control!**

\`\`\`python
# ❌ NEVER DO THIS
SECRET_KEY = "super-secret-key-12345"
DATABASE_URL = "postgres://user:password123@localhost/db"

# ✅ Use environment variables
import os

SECRET_KEY = os.environ['SECRET_KEY']
DATABASE_URL = os.environ['DATABASE_URL']

# ✅ Or use a secrets manager
from aws_secretsmanager import get_secret
secrets = get_secret('my-app/production')
\`\`\`

### .env File (Development Only)

\`\`\`bash
# .env (add to .gitignore!)
SECRET_KEY=dev-only-secret
DATABASE_URL=postgres://localhost/myapp

# Use python-dotenv to load
from dotenv import load_dotenv
load_dotenv()
\`\`\`

---

## 7. Error Handling

Don't leak information in errors:

\`\`\`python
# ❌ BAD: Exposes internals
@app.errorhandler(Exception)
def handle_error(e):
    return str(e), 500  # Might reveal SQL queries, paths, etc.

# ✅ GOOD: Generic message, log details
@app.errorhandler(Exception)
def handle_error(e):
    app.logger.exception("Unhandled exception")  # Log full details
    return {"error": "An unexpected error occurred"}, 500  # Hide from user
\`\`\`

---

## Secure Coding Checklist

- [ ] Validate all input (whitelist)
- [ ] Use parameterized queries
- [ ] Encode output for context
- [ ] Add CSRF tokens to forms
- [ ] Set security headers
- [ ] Rate limit auth endpoints
- [ ] Store secrets in environment
- [ ] Log errors, hide from users
- [ ] Use HTTPS everywhere
- [ ] Keep dependencies updated

---

## Interview Insights 💡

**Common Questions**:
1. "How do you prevent SQL injection?"
2. "What's the difference between encoding and validation?"
3. "How do you manage secrets in production?"
4. "What security headers should every app have?"

**Key Talking Points**:
- Defense in depth — multiple layers
- Parameterized queries for SQL
- Template auto-escaping for XSS
- Environment variables for secrets

---

## Key Takeaways

✅ **Validate input** with whitelists, not blacklists  
✅ **Encode output** for the specific context (HTML, URL, JS)  
✅ **Use parameterized queries** — never concatenate SQL  
✅ **Add CSRF tokens** to all state-changing forms  
✅ **Set security headers** (CSP, HSTS, X-Frame-Options)  
✅ **Rate limit** auth endpoints to prevent brute force  
✅ **Never commit secrets** — use environment variables  
✅ **Log errors** but show generic messages to users
`,
    },

    'step-2-6-4': {
        title: 'Cryptography Basics',
        content: `# Cryptography Basics

## Why This Matters

Cryptography protects data from attackers — but the wrong choice can give a false sense of security. Understanding crypto basics helps you:

- **Choose the right algorithms** for passwords, encryption, and signatures
- **Avoid common mistakes** that lead to breaches
- Implement secure **data protection** for sensitive information
- Answer **security interview questions** confidently

---

## The Lock and Key Analogy 🔐

| Crypto Type | Real-World Analogy | Use Case |
|-------------|-------------------|----------|
| **Hashing** | Fingerprint | Password storage, integrity |
| **Symmetric encryption** | Same key for lock & unlock | File encryption |
| **Asymmetric encryption** | Padlock (public) + key (private) | HTTPS, digital signatures |

---

## Hashing vs Encryption

\`\`\`mermaid
flowchart LR
    subgraph hash["Hashing (One-Way)"]
        H1["'password123'"] --> H2["sha256()"]
        H2 --> H3["a1b2c3d4..."]
        H3 -.->|"Can't reverse"| H1
    end
    subgraph enc["Encryption (Two-Way)"]
        E1["'secret data'"] --> E2["encrypt(key)"]
        E2 --> E3["8f2a9c..."]
        E3 --> E4["decrypt(key)"]
        E4 --> E5["'secret data'"]
    end
\`\`\`

| Property | Hashing | Encryption |
|----------|---------|------------|
| **Reversible** | ❌ No | ✅ Yes (with key) |
| **Output size** | Fixed (e.g., 256 bits) | Variable |
| **Purpose** | Verify integrity, store passwords | Protect confidentiality |
| **Examples** | SHA-256, bcrypt, Argon2 | AES, RSA |

---

## Password Hashing

**Never store passwords in plaintext!** Use a slow, salted hash.

### Why bcrypt/Argon2, Not SHA-256?

| Algorithm | Speed | Salted | Memory-hard | Use For |
|-----------|-------|--------|-------------|---------|
| SHA-256 | ⚡ Fast | ❌ No | ❌ No | File checksums |
| bcrypt | 🐢 Slow | ✅ Yes | ❌ No | Passwords |
| Argon2id | 🐢 Slow | ✅ Yes | ✅ Yes | Passwords (recommended) |

Fast hashes = attackers can try billions of passwords per second!

### bcrypt Example

\`\`\`python
import bcrypt

def hash_password(password: str) -> bytes:
    # Salt is automatically generated and included
    # Rounds=12 means 2^12 = 4096 iterations (slow!)
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed)

# Usage
hashed = hash_password('mysecretpassword')
print(hashed)  # b'$2b$12$...'  (includes algorithm, cost, salt, hash)

# Verify
if verify_password('mysecretpassword', hashed):
    print("Password correct!")
\`\`\`

### Argon2 Example (Modern Standard)

\`\`\`python
from argon2 import PasswordHasher

ph = PasswordHasher(
    time_cost=3,      # Iterations
    memory_cost=65536, # 64MB
    parallelism=4      # Threads
)

hashed = ph.hash("mysecretpassword")
# $argon2id$v=19$m=65536,t=3,p=4$...

try:
    ph.verify(hashed, "mysecretpassword")
    print("Valid!")
except Exception:
    print("Invalid password")
\`\`\`

---

## Symmetric Encryption (AES)

Same key encrypts and decrypts. Fast, but key distribution is hard.

\`\`\`mermaid
flowchart LR
    P["Plaintext"] --> E["Encrypt with Key"]
    E --> C["Ciphertext"]
    C --> D["Decrypt with Key"]
    D --> P2["Plaintext"]
    K["🔑 Secret Key"]
    K --> E
    K --> D
\`\`\`

### Python Example (Fernet = AES-128)

\`\`\`python
from cryptography.fernet import Fernet

# Generate a secure key (do this once, store securely!)
key = Fernet.generate_key()  # Store in secrets manager!
print(key)  # b'...'  base64-encoded 32 bytes

cipher = Fernet(key)

# Encrypt
plaintext = b"sensitive user data"
ciphertext = cipher.encrypt(plaintext)
print(ciphertext)  # b'gAAAA...'

# Decrypt
decrypted = cipher.decrypt(ciphertext)
print(decrypted)  # b'sensitive user data'
\`\`\`

### AES-GCM (Authenticated Encryption)

\`\`\`python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

# Generate 256-bit key
key = os.urandom(32)  # 32 bytes = 256 bits

# AES-GCM provides encryption + authentication
aesgcm = AESGCM(key)

# Nonce must be unique per encryption (never reuse!)
nonce = os.urandom(12)

ciphertext = aesgcm.encrypt(nonce, b"secret message", b"additional authenticated data")
plaintext = aesgcm.decrypt(nonce, ciphertext, b"additional authenticated data")
\`\`\`

---

## Asymmetric Encryption (RSA)

Different keys for encrypt/decrypt. Solves key distribution problem.

\`\`\`mermaid
flowchart LR
    subgraph sender["Sender"]
        M["Message"]
        PK["🔓 Public Key<br/>(known to everyone)"]
    end
    subgraph receiver["Receiver"]
        SK["🔐 Private Key<br/>(secret)"]
        D["Decrypted Message"]
    end
    M --> E["Encrypt"]
    PK --> E
    E --> C["Ciphertext"]
    C --> DE["Decrypt"]
    SK --> DE
    DE --> D
\`\`\`

### Use Cases

| Use Case | Key Used |
|----------|----------|
| **Encrypt to someone** | Their public key |
| **Sign a message** | Your private key |
| **Verify a signature** | Their public key |

### Python Example

\`\`\`python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

# Generate key pair
private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()

# Encrypt with public key
message = b"secret message"
ciphertext = public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# Decrypt with private key
plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)
\`\`\`

---

## TLS/HTTPS

TLS encrypts all network traffic between client and server.

\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    C->>S: ClientHello (supported ciphers)
    S->>C: ServerHello (chosen cipher) + Certificate
    C->>C: Verify certificate
    C->>S: Key exchange (encrypted with server's public key)
    S->>C: Finished
    Note over C,S: All traffic now encrypted with symmetric key
\`\`\`

### Enforcing HTTPS

\`\`\`python
# Force HTTPS in Flask
from flask_tls import Tls
Tls(app).strict_transport_security()

# Or via headers
@app.after_request
def add_hsts(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response
\`\`\`

---

## Common Cryptography Mistakes

| Mistake | Risk | Fix |
|---------|------|-----|
| MD5/SHA1 for passwords | Cracked in seconds | Use bcrypt/Argon2 |
| ECB mode for AES | Patterns visible | Use GCM or CBC |
| Reusing nonces | Complete break | Generate random nonce each time |
| Rolling your own crypto | Unknown vulnerabilities | Use standard libraries |
| Hardcoding keys | Key exposure | Use secrets manager |

---

## Algorithm Recommendations (2024)

| Purpose | Recommended | Avoid |
|---------|-------------|-------|
| **Password hashing** | Argon2id, bcrypt | MD5, SHA-1, SHA-256 plain |
| **Symmetric encryption** | AES-256-GCM | DES, 3DES, AES-ECB |
| **Asymmetric encryption** | RSA-2048+, ECDSA P-256 | RSA-1024 |
| **Hashing (integrity)** | SHA-256, SHA-3 | MD5, SHA-1 |
| **Key derivation** | PBKDF2, scrypt, Argon2 | Direct hash |

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between hashing and encryption?"
2. "Why should you use bcrypt instead of SHA-256 for passwords?"
3. "Explain symmetric vs asymmetric encryption"
4. "How does TLS work at a high level?"

**Key Talking Points**:
- Hashing = one-way, for passwords and integrity
- Encryption = reversible, for confidentiality
- bcrypt is slow by design (slows down attackers)
- TLS combines asymmetric (key exchange) + symmetric (data transfer)

---

## Key Takeaways

✅ **Hashing** is one-way; **encryption** is reversible  
✅ Use **bcrypt/Argon2** for passwords (slow + salted)  
✅ Use **AES-256-GCM** for symmetric encryption  
✅ Use **RSA-2048+** for asymmetric encryption  
✅ **Never reuse nonces** in authenticated encryption  
✅ **Always use TLS** for network communication  
✅ **Never roll your own crypto** — use standard libraries  
✅ Store encryption keys in a secrets manager, never in code
`,
    },
};

// Version Control content (Act 4, Scene 4-5)
export const versionControlContent: Record<string, { title: string; content: string }> = {
    'step-4-5-1': {
        title: 'Git Fundamentals',
        content: `# Git Fundamentals

Version control for every developer.

## Core Concepts

| Concept | Description |
|---------|-------------|
| Repository | Project folder tracked by Git |
| Commit | Snapshot of changes |
| Branch | Independent line of development |
| Remote | Server copy of repository |

## Essential Commands

\`\`\`bash
# Initialize repository
git init

# Clone existing repo
git clone https://github.com/user/repo.git

# Stage changes
git add filename.py
git add .  # All changes

# Commit
git commit -m "Add feature X"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Check status
git status
git log --oneline
\`\`\`

## Working with Branches

\`\`\`bash
# Create and switch to branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
\`\`\`

## Undoing Changes

\`\`\`bash
# Unstage file
git reset HEAD filename.py

# Discard local changes
git checkout -- filename.py

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
\`\`\`

## Key Takeaways

- Commit early and often
- Write meaningful commit messages
- Use branches for features
- Pull before push
`,
    },

    'step-4-5-2': {
        title: 'Branching Strategies',
        content: `# Branching Strategies

Team workflows for managing code.

## Git Flow

\`\`\`
main ──────●────────────●──────────●
            \\          /          /
develop ─────●────●───●──────●───●
              \\      /        \\  /
feature ───────●────●          ●
\`\`\`

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/**: New features
- **release/**: Preparing releases
- **hotfix/**: Emergency fixes

## GitHub Flow

Simpler approach:

\`\`\`
main ───────●───────●───────●
             \\     /
feature ──────●───●
\`\`\`

1. Create branch from main
2. Make changes, commit
3. Open Pull Request
4. Review and discuss
5. Merge to main
6. Deploy

## Trunk-Based Development

Very short-lived branches:

\`\`\`
main ───●───●───●───●───●
         \\  / \\  /
          ●    ●
\`\`\`

- Direct commits to main (with feature flags)
- CI/CD for every commit

## Commit Message Convention

\`\`\`
<type>(<scope>): <description>

feat(auth): add Google OAuth login
fix(api): handle null response
docs(readme): update installation steps
refactor(db): optimize query performance
\`\`\`

## Key Takeaways

- Choose strategy based on team size
- GitHub Flow for most projects
- Git Flow for release-based products
- Consistent commit messages help everyone
`,
    },

    'step-4-5-3': {
        title: 'Code Review Best Practices',
        content: `# Code Review Best Practices

Improve code quality through collaboration.

## Why Code Review?

- Catch bugs early
- Share knowledge
- Maintain consistency
- Mentorship opportunity

## As a Reviewer

### Be Constructive

\`\`\`
❌ "This is wrong"
✅ "Consider using X because Y"

❌ "Why did you do this?"
✅ "I'm curious about the choice of X over Y"
\`\`\`

### Focus on What Matters

| Priority | Focus |
|----------|-------|
| High | Bugs, security issues |
| Medium | Design, performance |
| Low | Style, naming |

### Ask Questions

\`\`\`
"What happens if X is null?"
"Have you considered using Y pattern here?"
\`\`\`

## As an Author

### Keep PRs Small

- <400 lines of changes
- Single responsibility
- Easy to review = faster merging

### Write Good Descriptions

\`\`\`markdown
## What
Added user authentication with JWT

## Why
Needed for upcoming premium features

## Testing
- Unit tests for auth service
- Manual testing on staging
\`\`\`

### Respond Gracefully

\`\`\`
"Good catch! Fixed in abc123"
"I went with X because of Y, but open to alternatives"
\`\`\`

## Review Checklist

- [ ] Does the code work?
- [ ] Are there tests?
- [ ] Is it readable?
- [ ] Are edge cases handled?
- [ ] Any security concerns?

## Key Takeaways

- Review code, not people
- Keep PRs small and focused
- Leave actionable feedback
- Approve when good enough
`,
    },
};

// Code Quality content (Act 4, Scene 4-6)
export const testingContent: Record<string, { title: string; content: string }> = {
    'step-4-6-1': {
        title: 'Unit Testing & TDD',
        content: `# Unit Testing & TDD

Test-Driven Development for reliable code.

## Why Test?

- Catch bugs early
- Refactor with confidence
- Documentation of behavior
- Better design (testable code)

## Unit Test Structure (AAA)

\`\`\`python
def test_add_numbers():
    # Arrange
    a = 5
    b = 3
    
    # Act
    result = add(a, b)
    
    # Assert
    assert result == 8
\`\`\`

## Python pytest

\`\`\`python
import pytest

def add(a, b):
    return a + b

def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 5) == 5

# Run with: pytest test_math.py
\`\`\`

## Test-Driven Development (TDD)

\`\`\`
┌─────────────────────────────────┐
│   1. Write failing test (RED)  │
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│   2. Write minimal code (GREEN)│
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│   3. Refactor (REFACTOR)       │
└─────────────────────────────────┘
\`\`\`

## Mocking

\`\`\`python
from unittest.mock import Mock, patch

def test_api_call():
    with patch('requests.get') as mock_get:
        mock_get.return_value.json.return_value = {'id': 1}
        
        result = fetch_user(1)
        
        assert result['id'] == 1
        mock_get.assert_called_once()
\`\`\`

## Key Takeaways

- Test behavior, not implementation
- One assertion per test (usually)
- Mock external dependencies
- Aim for ~80% coverage
`,
    },

    'step-4-6-2': {
        title: 'Integration & E2E Testing',
        content: `# Integration & E2E Testing

Testing how components work together.

## Testing Pyramid

\`\`\`
        /\\
       /  \\   E2E (few)
      /────\\
     /      \\  Integration (some)
    /────────\\
   /          \\ Unit (many)
  /────────────\\
\`\`\`

## Integration Tests

Test multiple components together:

\`\`\`python
import pytest
from app import create_app, db

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_create_user(client):
    response = client.post('/api/users', json={
        'name': 'Test User',
        'email': 'test@example.com'
    })
    
    assert response.status_code == 201
    assert response.json['name'] == 'Test User'

def test_get_user(client):
    # Create user first
    client.post('/api/users', json={'name': 'Test', 'email': 'test@test.com'})
    
    response = client.get('/api/users/1')
    
    assert response.status_code == 200
\`\`\`

## E2E Testing with Playwright

\`\`\`python
from playwright.sync_api import sync_playwright

def test_login_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        page.goto('http://localhost:3000/login')
        page.fill('#email', 'user@example.com')
        page.fill('#password', 'password123')
        page.click('button[type="submit"]')
        
        assert page.url == 'http://localhost:3000/dashboard'
        browser.close()
\`\`\`

## When to Use Each

| Type | Speed | Scope | When |
|------|-------|-------|------|
| Unit | Fast | Single function | Always |
| Integration | Medium | Multiple components | API endpoints |
| E2E | Slow | Entire app | Critical flows |

## Key Takeaways

- Most tests should be unit tests
- Integration tests for API contracts
- E2E for critical user journeys
- Balance coverage with maintenance cost
`,
    },

    'step-4-6-3': {
        title: 'Code Coverage & Linting',
        content: `# Code Coverage & Linting

Automated code quality tools.

## Code Coverage

Measure how much code is tested:

\`\`\`bash
# Python with pytest-cov
pytest --cov=myapp --cov-report=html

# View report
open htmlcov/index.html
\`\`\`

### Coverage Metrics

| Metric | Description |
|--------|-------------|
| Line | % of lines executed |
| Branch | % of branches taken |
| Function | % of functions called |

### Coverage Targets

- 80% is often a good target
- 100% is not always practical
- Focus on critical paths

## Linting

Catch errors and enforce style:

\`\`\`bash
# Python
pip install flake8 black mypy

# Check for errors
flake8 myapp/

# Auto-format
black myapp/

# Type checking
mypy myapp/
\`\`\`

## Pre-commit Hooks

Run checks before each commit:

\`\`\`yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
\`\`\`

\`\`\`bash
# Install
pip install pre-commit
pre-commit install
\`\`\`

## CI/CD Integration

\`\`\`yaml
# GitHub Actions
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          pip install -r requirements.txt
          pytest --cov=myapp
      - name: Lint
        run: |
          flake8 myapp/
\`\`\`

## Key Takeaways

- Coverage shows untested code
- Linters catch bugs before runtime
- Automate with pre-commit and CI
- Don't obsess over 100% coverage
`,
    },
};

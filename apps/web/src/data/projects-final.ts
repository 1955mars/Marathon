/**
 * Remaining Projects - Act 0, Act 1, Act 2, and Act 4
 * Each project includes real-world applications and comprehensive explanations
 */

import { Project } from './projects';

// ============================================================
// C++ FUNDAMENTALS LAB
// Real-World: Every systems programmer, game developer, and embedded
// engineer needs to understand memory management!
// ============================================================
export const cppFundamentalsProject: Project = {
    id: "cpp-fundamentals",
    title: "C++ Fundamentals Lab",
    act: 0,
    difficulty: "Beginner",
    estimatedHours: 5,
    description: "Master C++ memory management, pointers, and RAII patterns. Essential for game development, systems programming, embedded systems, and high-performance applications.",
    learningOutcomes: [
        "Understand stack vs heap memory",
        "Use smart pointers correctly",
        "Apply RAII for resource management",
    ],
    prerequisites: ["Basic programming"],
    technologies: ["C++"],
    steps: [
        {
            id: "step-1",
            title: "Memory Fundamentals",
            description: "Learn stack vs heap allocation and pointer basics.",
            concepts: ["stack", "heap", "pointers", "references"],
            code: {
                python: `# Python equivalent - memory is managed automatically
# But understanding the concepts helps with C++

# In Python, all objects are heap-allocated
# Variables are references (like pointers)

x = [1, 2, 3]  # List allocated on heap
y = x          # y is another reference to same list
y.append(4)
print(x)  # [1, 2, 3, 4] - same object!

# To copy:
z = x.copy()   # New heap allocation
z.append(5)
print(x)  # [1, 2, 3, 4] - unaffected

# id() shows memory address
print(f"x addr: {id(x)}, y addr: {id(y)}, z addr: {id(z)}")`,
                cpp: `#include <iostream>
using namespace std;

int main() {
    // STACK allocation - automatic lifetime
    int stackVar = 42;
    int* ptrToStack = &stackVar;
    
    // HEAP allocation - manual lifetime
    int* heapVar = new int(100);
    
    cout << "Stack value: " << stackVar << endl;
    cout << "Heap value: " << *heapVar << endl;
    
    // References - alias to existing variable
    int& ref = stackVar;
    ref = 50;  // Changes stackVar too
    cout << "After ref change: " << stackVar << endl;
    
    // MUST free heap memory!
    delete heapVar;
    heapVar = nullptr;  // Prevent dangling pointer
    
    return 0;
}  // stackVar automatically cleaned up here`,
            },
            explanation: `## Stack vs Heap

| Property | Stack | Heap |
|----------|-------|------|
| Speed | Fast | Slower |
| Size | Limited (~1MB) | Large (GBs) |
| Lifetime | Automatic | Manual |
| Allocation | Compile-time | Runtime |

---

## 🌍 Real-World Applications

### 1. **Game Engines (Unity, Unreal)**
Game objects need precise memory control:
- Stack for temporary calculations (physics, AI)
- Heap for long-lived game objects
- Memory pools for frequent allocations

### 2. **Operating System Kernels (Linux, Windows)**
Kernel code cannot use heap - only stack!
- Interrupt handlers must be stack-only
- Drivers manage their own memory

### 3. **Embedded Systems (Arduino, STM32)**
- Stack is often < 8KB
- No heap in many real-time systems
- Every byte counts!

### 4. **High-Frequency Trading**
Microsecond latency requires:
- Pre-allocated memory pools
- Zero heap allocations during trading
- Cache-friendly data structures`,
            tips: ["Always delete what you new", "Prefer stack when possible", "Use Valgrind/ASan to detect leaks"],
        },
        {
            id: "step-2",
            title: "Smart Pointers",
            description: "Use unique_ptr, shared_ptr for automatic memory management.",
            concepts: ["unique_ptr", "shared_ptr", "RAII"],
            code: {
                python: `# Python's reference counting is similar to shared_ptr
import sys

class Resource:
    def __init__(self, name):
        self.name = name
        print(f"Resource {name} created")
    
    def __del__(self):
        print(f"Resource {self.name} destroyed")

# Reference counting demo
r1 = Resource("A")
print(f"Ref count: {sys.getrefcount(r1) - 1}")  # -1 for getrefcount's ref

r2 = r1  # Increase ref count
print(f"Ref count: {sys.getrefcount(r1) - 1}")

del r2   # Decrease ref count
print(f"Ref count: {sys.getrefcount(r1) - 1}")

del r1   # Resource destroyed when count hits 0`,
                cpp: `#include <iostream>
#include <memory>
using namespace std;

class Resource {
public:
    string name;
    Resource(string n) : name(n) { cout << name << " created\\n"; }
    ~Resource() { cout << name << " destroyed\\n"; }
};

int main() {
    // unique_ptr - single owner, cannot copy
    {
        unique_ptr<Resource> p1 = make_unique<Resource>("UniqueRes");
        // unique_ptr<Resource> p2 = p1;  // ERROR! Can't copy
        unique_ptr<Resource> p2 = move(p1);  // Transfer ownership
    }  // p2 destroyed here, resource freed
    
    cout << "---\\n";
    
    // shared_ptr - multiple owners, reference counted
    shared_ptr<Resource> s1 = make_shared<Resource>("SharedRes");
    cout << "Count: " << s1.use_count() << endl;
    
    {
        shared_ptr<Resource> s2 = s1;  // Share ownership
        cout << "Count: " << s1.use_count() << endl;
    }  // s2 destroyed, count decreases
    
    cout << "Count: " << s1.use_count() << endl;
    return 0;
}  // s1 destroyed, resource freed`,
            },
            explanation: `## Smart Pointer Choice

- **unique_ptr**: Single owner, zero overhead - use 95% of the time!
- **shared_ptr**: Multiple owners, reference counted - for shared resources
- **weak_ptr**: Non-owning reference to shared_ptr - breaks cycles

---

## 🌍 Real-World Applications

### 1. **Google Chrome & Firefox**
Browsers use smart pointers extensively:
- DOM nodes managed with shared_ptr
- JavaScript objects use reference counting
- weak_ptr prevents memory leaks in caches

### 2. **Database Connection Pools**
\`\`\`cpp
class DatabasePool {
  vector<unique_ptr<Connection>> connections;
  // Exclusive ownership per client
};
\`\`\`

### 3. **Game Object Hierarchies**
\`\`\`cpp
class GameObject {
  unique_ptr<Component> transform; // Owns
  weak_ptr<GameObject> parent;     // References, doesn't own
};
\`\`\`

### 4. **RAII Pattern Examples**
- File handles: Close on destructor
- Mutex locks: Release on destructor
- Network sockets: Disconnect on destructor`,
            tips: ["Prefer unique_ptr by default", "Use make_unique/make_shared for exception safety", "weak_ptr breaks reference cycles"],
        },
    ],
};

// ============================================================
// BIT MANIPULATION TOOLKIT
// Real-World: Cryptography, compression, network protocols,
// graphics engines, embedded systems, competitive programming
// ============================================================
export const bitManipulationProject: Project = {
    id: "bit-manipulation",
    title: "Bit Manipulation Toolkit",
    act: 1,
    difficulty: "Intermediate",
    estimatedHours: 4,
    description: "Master bitwise operations for interview problems. Used in cryptography (AES, SHA), compression (ZIP, PNG), network protocols (TCP/IP), and graphics rendering.",
    learningOutcomes: [
        "Use AND, OR, XOR, shifts effectively",
        "Solve classic bit manipulation problems",
        "Optimize with bit tricks",
    ],
    prerequisites: ["Binary numbers"],
    technologies: ["Python", "C++"],
    steps: [
        {
            id: "step-1",
            title: "Bitwise Basics",
            description: "Master AND, OR, XOR, NOT, and shift operations.",
            concepts: ["AND", "OR", "XOR", "shifts"],
            code: {
                python: `# Bitwise Operations

a, b = 5, 3  # 5 = 101, 3 = 011

# AND - both bits must be 1
print(f"{a} & {b} = {a & b}")  # 101 & 011 = 001 = 1

# OR - either bit is 1  
print(f"{a} | {b} = {a | b}")  # 101 | 011 = 111 = 7

# XOR - bits must differ
print(f"{a} ^ {b} = {a ^ b}")  # 101 ^ 011 = 110 = 6

# NOT - flip all bits (two's complement)
print(f"~{a} = {~a}")  # -6 (inverts and adds 1)

# Left shift - multiply by 2^n
print(f"{a} << 2 = {a << 2}")  # 5 * 4 = 20

# Right shift - divide by 2^n
print(f"{a} >> 1 = {a >> 1}")  # 5 // 2 = 2

# Common tricks
n = 12  # 1100
print(f"Is {n} even? {n & 1 == 0}")  # Check last bit
print(f"Is {n} power of 2? {n & (n-1) == 0}")`,
                cpp: `#include <iostream>
#include <bitset>
using namespace std;

int main() {
    int a = 5, b = 3;  // 101, 011
    
    cout << "AND: " << (a & b) << endl;   // 1
    cout << "OR:  " << (a | b) << endl;   // 7
    cout << "XOR: " << (a ^ b) << endl;   // 6
    cout << "NOT: " << (~a) << endl;      // -6
    cout << "<<2: " << (a << 2) << endl;  // 20
    cout << ">>1: " << (a >> 1) << endl;  // 2
    
    // Show binary
    cout << "5 in binary: " << bitset<8>(5) << endl;
    
    return 0;
}`,
            },
            explanation: `## Key Bit Tricks

| Operation | Use |
|-----------|-----|
| n & 1 | Check if odd |
| n & (n-1) | Clear lowest set bit |
| n \\| (1 << k) | Set bit k |
| n & ~(1 << k) | Clear bit k |
| n ^ (1 << k) | Toggle bit k |

---

## 🌍 Real-World Applications

### 1. **Network Protocols (IP, TCP)**
\`\`\`python
ip = "192.168.1.1"
# Subnet mask: 255.255.255.0
network = ip_int & 0xFFFFFF00  # Extract network portion
\`\`\`

### 2. **Cryptography (AES, SHA, RSA)**
- XOR is fundamental to encryption
- Bit rotation in hash functions
- Modular exponentiation uses bit shifts

### 3. **Graphics & Image Processing**
\`\`\`python
# Extract RGB from 32-bit color
red   = (color >> 16) & 0xFF
green = (color >> 8) & 0xFF
blue  = color & 0xFF
\`\`\`

### 4. **Embedded / IoT Systems**
\`\`\`cpp
// Set pin 4 HIGH on microcontroller
PORTB |= (1 << 4);
// Clear pin 4
PORTB &= ~(1 << 4);
\`\`\`

### 5. **Compression (ZIP, PNG)**
- Huffman coding manipulates bits
- LZ77/LZ78 use bit-level operations`,
            tips: ["XOR is its own inverse: a ^ b ^ b = a", "Use for swapping without temp variable", "Draw the bits when debugging"],
        },
        {
            id: "step-2",
            title: "Classic Problems",
            description: "Solve popular bit manipulation interview problems.",
            concepts: ["single number", "counting bits", "power of two"],
            code: {
                python: `# Classic Bit Problems

def single_number(nums):
    """Find the number that appears once (others appear twice)
    XOR cancels out duplicates: a ^ a = 0
    """
    result = 0
    for num in nums:
        result ^= num
    return result

def count_bits(n):
    """Count number of 1 bits (Brian Kernighan's algorithm)"""
    count = 0
    while n:
        n &= (n - 1)  # Clear lowest set bit
        count += 1
    return count

def is_power_of_two(n):
    """Power of 2 has exactly one bit set"""
    return n > 0 and (n & (n - 1)) == 0

def swap_without_temp(a, b):
    """XOR swap trick"""
    a = a ^ b
    b = a ^ b  # b = a ^ b ^ b = a
    a = a ^ b  # a = a ^ b ^ a = b
    return a, b

# Tests
print(single_number([4, 1, 2, 1, 2]))  # 4
print(count_bits(11))  # 3 (1011)
print(is_power_of_two(16))  # True
print(swap_without_temp(5, 3))  # (3, 5)`,
                cpp: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}

int countBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}

bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

int main() {
    vector<int> nums = {4, 1, 2, 1, 2};
    cout << "Single: " << singleNumber(nums) << endl;
    cout << "Bits in 11: " << countBits(11) << endl;
    cout << "16 power of 2? " << isPowerOfTwo(16) << endl;
    return 0;
}`,
            },
            explanation: `## Interview Favorites

1. **Single Number**: XOR all, duplicates cancel
2. **Count Bits**: n &= (n-1) clears lowest bit
3. **Power of 2**: Exactly one bit set`,
            tips: ["XOR is commutative and associative", "Draw out the bits when stuck"],
        },
    ],
};

// ============================================================
// DATABASE QUERY ENGINE
// Real-World: PostgreSQL, MySQL, SQLite, MongoDB all have query
// engines. Understanding this helps with database optimization!
// ============================================================
export const dbQueryEngineProject: Project = {
    id: "db-query-engine",
    title: "Database Query Engine",
    act: 2,
    difficulty: "Advanced",
    estimatedHours: 10,
    description: "Build a SQL query parser and executor. Learn how PostgreSQL, MySQL, and SQLite work internally. Essential for database optimization and backend engineering.",
    learningOutcomes: [
        "Parse SQL syntax",
        "Implement query execution plans",
        "Understand B-tree indexes",
    ],
    prerequisites: ["Data structures", "Parsing basics"],
    technologies: ["Python"],
    steps: [
        {
            id: "step-1",
            title: "SQL Parser",
            description: "Parse basic SELECT statements into AST.",
            concepts: ["lexer", "parser", "AST"],
            code: {
                python: `import re
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class SelectQuery:
    columns: List[str]
    table: str
    where: Optional[str] = None
    order_by: Optional[str] = None

def tokenize(sql: str) -> List[str]:
    """Split SQL into tokens"""
    pattern = r"(\\w+|[*,=<>]|'[^']*')"
    return re.findall(pattern, sql.upper())

def parse_select(sql: str) -> SelectQuery:
    """Parse a SELECT statement"""
    tokens = tokenize(sql)
    
    # Find key positions
    select_idx = tokens.index('SELECT')
    from_idx = tokens.index('FROM')
    where_idx = tokens.index('WHERE') if 'WHERE' in tokens else None
    
    # Extract parts
    columns = [t for t in tokens[select_idx+1:from_idx] if t != ',']
    table = tokens[from_idx + 1]
    
    where = None
    if where_idx:
        where = ' '.join(tokens[where_idx+1:])
    
    return SelectQuery(columns=columns, table=table, where=where)

# Test
sql = "SELECT name, age FROM users WHERE age > 25"
query = parse_select(sql)
print(f"Columns: {query.columns}")
print(f"Table: {query.table}")
print(f"Where: {query.where}")`,
                cpp: `// C++ version uses similar tokenization approach
#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>
using namespace std;

struct SelectQuery {
    vector<string> columns;
    string table;
    string where_clause;
};

vector<string> tokenize(const string& sql) {
    vector<string> tokens;
    istringstream iss(sql);
    string token;
    while (iss >> token) {
        transform(token.begin(), token.end(), token.begin(), ::toupper);
        tokens.push_back(token);
    }
    return tokens;
}

int main() {
    string sql = "SELECT name age FROM users WHERE age > 25";
    auto tokens = tokenize(sql);
    for (const auto& t : tokens) cout << t << " ";
    return 0;
}`,
            },
            explanation: `## Query Processing Pipeline

\`\`\`
SQL String -> Lexer -> Tokens -> Parser -> AST -> Optimizer -> Executor -> Results
\`\`\`

---

## 🌍 Real-World Applications

### 1. **PostgreSQL Query Planner**
Chooses the best execution plan:
- Sequential scan vs Index scan
- Hash join vs Nested loop
- Estimates row counts for cost

### 2. **MongoDB Query Engine**
Similar parsing even for NoSQL:
\`\`\`javascript
db.users.find({ age: { $gt: 25 } })
// Parsed into filter operations
\`\`\`

### 3. **Apache Spark SQL**
Distributed query execution:
- Parse SQL into logical plan
- Optimize across cluster nodes
- Execute in parallel

### 4. **ORM Query Builders**
Django, SQLAlchemy parse your Python:
\`\`\`python
User.objects.filter(age__gt=25)  # -> SQL
\`\`\`

### 5. **BI Tools (Tableau, Looker)**
Generate optimized SQL from drag-and-drop UI.`,
            tips: ["Start with simple SELECT * FROM table", "Use regex for tokenization", "Real databases cache parsed queries"],
        },
        {
            id: "step-2",
            title: "Query Executor",
            description: "Execute parsed queries against in-memory tables.",
            concepts: ["table scan", "filtering", "projection"],
            code: {
                python: `from typing import List, Dict, Any

class Table:
    def __init__(self, name: str, columns: List[str]):
        self.name = name
        self.columns = columns
        self.rows: List[Dict[str, Any]] = []
    
    def insert(self, values: Dict[str, Any]):
        self.rows.append(values)
    
    def scan(self) -> List[Dict]:
        """Full table scan"""
        return self.rows.copy()

class QueryExecutor:
    def __init__(self):
        self.tables: Dict[str, Table] = {}
    
    def create_table(self, name: str, columns: List[str]):
        self.tables[name] = Table(name, columns)
    
    def execute(self, query: SelectQuery) -> List[Dict]:
        table = self.tables.get(query.table.lower())
        if not table:
            raise ValueError(f"Table {query.table} not found")
        
        # Full table scan
        results = table.scan()
        
        # Apply WHERE filter
        if query.where:
            results = self._filter(results, query.where)
        
        # Project columns
        if query.columns != ['*']:
            results = [{c: r[c] for c in query.columns} for r in results]
        
        return results
    
    def _filter(self, rows, condition):
        # Simple > filter for demo
        parts = condition.split()
        col, op, val = parts[0].lower(), parts[1], int(parts[2])
        return [r for r in rows if r.get(col, 0) > val]

# Demo
db = QueryExecutor()
db.create_table('users', ['id', 'name', 'age'])
db.tables['users'].insert({'id': 1, 'name': 'Alice', 'age': 30})
db.tables['users'].insert({'id': 2, 'name': 'Bob', 'age': 22})

query = SelectQuery(columns=['NAME', 'AGE'], table='USERS', where='AGE > 25')
print(db.execute(query))`,
            },
            explanation: `## Query Execution Steps

1. **Table Lookup**: Find the table
2. **Scan**: Read all rows (or use index)
3. **Filter**: Apply WHERE conditions
4. **Project**: Select only needed columns`,
            tips: ["Add indexes for WHERE columns", "Consider query optimization"],
        },
    ],
};

// ============================================================
// THREAD POOL IMPLEMENTATION
// Real-World: Web servers, database connection pools, ML training,
// video encoding - any CPU/IO intensive application!
// ============================================================
export const threadPoolProject: Project = {
    id: "thread-pool",
    title: "Thread Pool Implementation",
    act: 2,
    difficulty: "Advanced",
    estimatedHours: 8,
    description: "Build a thread pool for concurrent execution. Used in web servers (Apache, Nginx), databases (PostgreSQL), ML frameworks (TensorFlow, PyTorch), and video processing.",
    learningOutcomes: [
        "Manage worker threads",
        "Implement task queues",
        "Handle synchronization",
    ],
    prerequisites: ["Concurrency basics"],
    technologies: ["Python", "C++"],
    steps: [
        {
            id: "step-1",
            title: "Basic Thread Pool",
            description: "Create a pool of worker threads with a task queue.",
            concepts: ["threads", "queue", "synchronization"],
            code: {
                python: `import threading
import queue
import time
from typing import Callable, Any

class ThreadPool:
    def __init__(self, num_workers: int = 4):
        self.task_queue = queue.Queue()
        self.workers = []
        self.shutdown_flag = False
        
        # Create worker threads
        for i in range(num_workers):
            worker = threading.Thread(target=self._worker_loop, args=(i,))
            worker.daemon = True
            worker.start()
            self.workers.append(worker)
    
    def _worker_loop(self, worker_id: int):
        """Worker thread main loop"""
        while not self.shutdown_flag:
            try:
                # Block until task available (timeout for shutdown check)
                task, args = self.task_queue.get(timeout=0.1)
                print(f"Worker {worker_id} executing task")
                task(*args)
                self.task_queue.task_done()
            except queue.Empty:
                continue
    
    def submit(self, task: Callable, *args):
        """Submit a task to the pool"""
        self.task_queue.put((task, args))
    
    def wait(self):
        """Wait for all tasks to complete"""
        self.task_queue.join()
    
    def shutdown(self):
        """Graceful shutdown"""
        self.shutdown_flag = True
        for worker in self.workers:
            worker.join()

# Demo
def process_item(item):
    time.sleep(0.5)
    print(f"Processed: {item}")

pool = ThreadPool(num_workers=3)
for i in range(6):
    pool.submit(process_item, f"Task-{i}")

pool.wait()
print("All tasks completed!")
pool.shutdown()`,
                cpp: `#include <iostream>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <vector>
using namespace std;

class ThreadPool {
    vector<thread> workers;
    queue<function<void()>> tasks;
    mutex queue_mutex;
    condition_variable cv;
    bool stop = false;

public:
    ThreadPool(size_t num_threads) {
        for (size_t i = 0; i < num_threads; i++) {
            workers.emplace_back([this] {
                while (true) {
                    function<void()> task;
                    {
                        unique_lock<mutex> lock(queue_mutex);
                        cv.wait(lock, [this] { 
                            return stop || !tasks.empty(); 
                        });
                        if (stop && tasks.empty()) return;
                        task = move(tasks.front());
                        tasks.pop();
                    }
                    task();
                }
            });
        }
    }

    void submit(function<void()> task) {
        {
            lock_guard<mutex> lock(queue_mutex);
            tasks.push(move(task));
        }
        cv.notify_one();
    }

    ~ThreadPool() {
        {
            lock_guard<mutex> lock(queue_mutex);
            stop = true;
        }
        cv.notify_all();
        for (auto& w : workers) w.join();
    }
};`,
            },
            explanation: `## Thread Pool Architecture

\`\`\`
     submit()
        |
        v
  [Task Queue] --> Worker 1
        |-------> Worker 2  
        |-------> Worker 3
\`\`\`

Workers block on queue, wake on new tasks.

---

## 🌍 Real-World Applications

### 1. **Web Servers (Apache, Tomcat)**
- Pool of threads handles incoming requests
- Avoids thread creation overhead
- Limits max concurrent connections

### 2. **Database Connection Pools (HikariCP, PgBouncer)**
\`\`\`python
pool = ConnectionPool(max_connections=20)
with pool.get_connection() as conn:
    conn.execute(query)
# Connection returns to pool
\`\`\`

### 3. **Machine Learning (TensorFlow, PyTorch)**
- Data loading runs in thread pool
- Parallel batch preprocessing
- GPU operations delegated to separate threads

### 4. **Video Encoding (FFmpeg, HandBrake)**
- Frame encoding is embarrassingly parallel
- Thread pool encodes multiple frames
- Significant speedup on multi-core CPUs

### 5. **Python's concurrent.futures**
\`\`\`python
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=4) as executor:
    results = executor.map(process, items)
\`\`\``,
            tips: ["Use condition_variable for efficient waiting", "Always join threads on shutdown", "Monitor queue size to detect bottlenecks"],
        },
    ],
};

// ============================================================
// TESTING & CI/CD PIPELINE  
// Real-World: Every professional software team uses CI/CD!
// Netflix, Google, Amazon deploy thousands of times per day
// ============================================================
export const cicdPipelineProject: Project = {
    id: "cicd-pipeline",
    title: "Testing & CI/CD Pipeline",
    act: 4,
    difficulty: "Intermediate",
    estimatedHours: 6,
    description: "Build a complete testing suite and CI/CD pipeline. Learn what Netflix, Google, and Amazon use to deploy thousands of times per day with confidence.",
    learningOutcomes: [
        "Write comprehensive tests",
        "Set up GitHub Actions workflows",
        "Automate deployments",
    ],
    prerequisites: ["Git basics", "Testing concepts"],
    technologies: ["Python"],
    steps: [
        {
            id: "step-1",
            title: "Test Suite Design",
            description: "Write unit, integration, and end-to-end tests.",
            concepts: ["unit tests", "integration tests", "mocking"],
            code: {
                python: `import pytest
from unittest.mock import Mock, patch

# ===== Unit Under Test =====
class Calculator:
    def add(self, a, b):
        return a + b
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

class UserService:
    def __init__(self, db):
        self.db = db
    
    def get_user(self, user_id):
        return self.db.find_by_id(user_id)

# ===== Unit Tests =====
class TestCalculator:
    def setup_method(self):
        self.calc = Calculator()
    
    def test_add(self):
        assert self.calc.add(2, 3) == 5
    
    def test_divide(self):
        assert self.calc.divide(10, 2) == 5
    
    def test_divide_by_zero_raises(self):
        with pytest.raises(ValueError):
            self.calc.divide(10, 0)

# ===== Integration Tests with Mocking =====
class TestUserService:
    def test_get_user_returns_user(self):
        # Create mock database
        mock_db = Mock()
        mock_db.find_by_id.return_value = {'id': 1, 'name': 'Alice'}
        
        service = UserService(mock_db)
        user = service.get_user(1)
        
        assert user['name'] == 'Alice'
        mock_db.find_by_id.assert_called_once_with(1)

# Run with: pytest -v test_file.py`,
            },
            explanation: `## Test Pyramid

\`\`\`
        /\\
       /E2E\\     Few, slow, expensive  
      /------\\
     / Integ  \\   Some, medium
    /----------\\
   /   Unit     \\ Many, fast, cheap
  /--------------\\
\`\`\`

---

## 🌍 Real-World Applications

### 1. **Google Testing Philosophy**
- 70% unit tests, 20% integration, 10% E2E
- Tests must run fast (< 60s)
- Hermetic tests (no external dependencies)

### 2. **Netflix Chaos Engineering**
\`\`\`python
def test_resilience():
    # Kill random service, verify system recovers
    chaos_monkey.kill_instance("recommendation-service")
    assert system.is_healthy(timeout=30)
\`\`\`

### 3. **Amazon's Testing Culture**
- Every service has 100% test coverage requirement
- Integration tests run against production data copies
- Canary deployments catch issues early

### 4. **Facebook's Test Infra**
- AI-powered test selection
- Only run tests affected by your change
- Reduces CI time from hours to minutes`,
            tips: ["Aim for 80% unit, 15% integration, 5% E2E", "Mock external dependencies", "Test the behavior, not the implementation"],
        },
        {
            id: "step-2",
            title: "GitHub Actions Workflow",
            description: "Set up CI/CD pipeline for automated testing and deployment.",
            concepts: ["GitHub Actions", "CI/CD", "workflows"],
            code: {
                python: `# .github/workflows/ci.yml
# This is YAML, but shown in Python for syntax highlighting

CI_WORKFLOW = """
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install pytest pytest-cov
        pip install -r requirements.txt
    
    - name: Run tests with coverage
      run: |
        pytest --cov=src --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      run: echo "Deploying..."
"""

print(CI_WORKFLOW)`,
            },
            explanation: `## CI/CD Pipeline

\`\`\`
Push -> Lint -> Test -> Build -> Deploy
                          |
              [Only on main branch]
\`\`\``,
            tips: ["Run tests on every PR", "Use branch protection rules"],
        },
    ],
};

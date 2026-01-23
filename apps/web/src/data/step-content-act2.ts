/**
 * Act 2: Systems & Low-Level - Step Content
 * Operating Systems, Networks, Databases
 */

export const act2Content: Record<string, { title: string; content: string }> = {
    // Step 2-1-1: Processes & Threads
    'step-2-1-1': {
        title: 'Processes & Threads',
        content: `# Processes & Threads

Fundamental units of execution in operating systems.

## Process vs Thread

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Separate address space | Shared address space |
| Creation | Expensive | Lightweight |
| Communication | IPC required | Shared memory |
| Isolation | High | Low |

## Process States

\`\`\`
    ┌──────────┐
    │  New     │
    └────┬─────┘
         │ admit
         ▼
    ┌──────────┐     interrupt     ┌──────────┐
    │  Ready   │◄──────────────────│ Running  │
    └────┬─────┘                   └────┬─────┘
         │                              │
         │ dispatch                     │ I/O or wait
         │                              ▼
         │                         ┌──────────┐
         └────────────────────────►│ Waiting  │
                                   └──────────┘
\`\`\`

## Creating Processes (Python)

\`\`\`python
import multiprocessing
import os

def worker(name):
    print(f"Worker {name}, PID: {os.getpid()}")

if __name__ == "__main__":
    processes = []
    for i in range(4):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()
    
    for p in processes:
        p.join()
\`\`\`

## Creating Threads (Python)

\`\`\`python
import threading

def worker(name):
    print(f"Thread {name}")

threads = []
for i in range(4):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
\`\`\`

## Key Takeaways

- Use processes for CPU-bound tasks (bypass GIL)
- Use threads for I/O-bound tasks
- Context switching has overhead
- Shared memory requires synchronization
`,
    },

    // Step 2-1-2: Memory Management
    'step-2-1-2': {
        title: 'Memory Management',
        content: `# Memory Management

How operating systems manage memory.

## Memory Hierarchy

\`\`\`
  Registers (fastest, smallest)
       ▼
    L1 Cache
       ▼
    L2 Cache
       ▼
    L3 Cache
       ▼
      RAM
       ▼
  Disk/SSD (slowest, largest)
\`\`\`

## Virtual Memory

- Each process has its own virtual address space
- MMU translates virtual → physical addresses
- Enables memory isolation and protection

## Paging

\`\`\`
Virtual Address Space     Physical Memory
┌─────────────────┐      ┌─────────────┐
│ Page 0          │──────│ Frame 3     │
│ Page 1          │──────│ Frame 7     │
│ Page 2          │──────│ Frame 1     │
│ Page 3          │─ X ──│ (on disk)   │
└─────────────────┘      └─────────────┘
        Page Table
\`\`\`

## Page Replacement Algorithms

| Algorithm | Description |
|-----------|-------------|
| FIFO | Replace oldest page |
| LRU | Replace least recently used |
| Optimal | Replace page used furthest in future |
| Clock | Circular buffer with use bit |

## Memory Allocation

\`\`\`c
// C memory allocation
int* arr = (int*)malloc(10 * sizeof(int));
// ... use arr ...
free(arr);

// C++ with new/delete
int* arr = new int[10];
delete[] arr;
\`\`\`

## Key Takeaways

- Virtual memory provides isolation
- Page faults are expensive (disk access)
- Cache locality matters for performance
- Memory leaks exhaust available memory
`,
    },

    // Step 2-1-3: Concurrency & Synchronization
    'step-2-1-3': {
        title: 'Concurrency & Synchronization',
        content: `# Concurrency & Synchronization

Coordinate multiple threads safely.

## Race Conditions

\`\`\`python
# Unsafe: race condition
counter = 0

def increment():
    global counter
    for _ in range(100000):
        counter += 1  # Not atomic!
\`\`\`

## Mutex (Lock)

\`\`\`python
import threading

lock = threading.Lock()
counter = 0

def safe_increment():
    global counter
    for _ in range(100000):
        with lock:  # Acquire and release
            counter += 1
\`\`\`

## Semaphore

\`\`\`python
# Limit concurrent access
semaphore = threading.Semaphore(3)  # Max 3 threads

def limited_access():
    with semaphore:
        # Only 3 threads can be here at once
        do_work()
\`\`\`

## Deadlock

Four conditions (all required):
1. **Mutual Exclusion**: Resource held exclusively
2. **Hold and Wait**: Hold one, wait for another
3. **No Preemption**: Can't force release
4. **Circular Wait**: A waits for B, B waits for A

\`\`\`python
# Deadlock example
lock_a = threading.Lock()
lock_b = threading.Lock()

# Thread 1: acquire A, then B
# Thread 2: acquire B, then A
# Deadlock!
\`\`\`

## Producer-Consumer

\`\`\`python
from queue import Queue
from threading import Thread

queue = Queue(maxsize=10)

def producer():
    for i in range(20):
        queue.put(i)  # Blocks if full

def consumer():
    while True:
        item = queue.get()  # Blocks if empty
        process(item)
        queue.task_done()
\`\`\`

## Key Takeaways

- Always protect shared mutable state
- Prefer higher-level constructs (Queue)
- Avoid nested locks when possible
- Consider lock-free data structures
`,
    },

    // Step 2-1-4: File Systems
    'step-2-1-4': {
        title: 'File Systems',
        content: `# File Systems

How operating systems organize and store data.

## File System Structure

\`\`\`
Boot Block | Superblock | Inode Table | Data Blocks
\`\`\`

## Inodes

Each file has an inode containing:
- File size
- Permissions
- Timestamps
- Pointers to data blocks

## Directory Structure

\`\`\`
/
├── home/
│   └── user/
│       ├── documents/
│       └── .bashrc
├── etc/
│   └── passwd
└── var/
    └── log/
\`\`\`

## File Operations

\`\`\`python
# Python file I/O
with open('file.txt', 'r') as f:
    content = f.read()

with open('file.txt', 'w') as f:
    f.write('Hello, World!')

# Binary mode
with open('data.bin', 'rb') as f:
    data = f.read()
\`\`\`

## Common File Systems

| File System | OS | Features |
|-------------|-----|----------|
| ext4 | Linux | Journaling, large files |
| NTFS | Windows | Permissions, compression |
| APFS | macOS | Encryption, snapshots |
| ZFS | Unix | Checksums, RAID |

## Key Takeaways

- Files are abstractions over disk blocks
- Inodes store metadata, not data
- Journaling prevents corruption
- Always close files (use the with statement in Python)
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

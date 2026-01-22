# Scoping Document: CS Graduate to Software Engineer Prep Material

## Overview
This document outlines the holistic preparatory material for final-semester CS graduate students. The goal is to provide a comprehensive review of computer science fundamentals (breadth) while going deep into modern software engineering practices (depth) required for high-tier industry roles.

---

# Part 1: Platform & Technology

## The Web App: "Marathon"
A **HackerRank-style learning platform** purpose-built for interview preparation and CS fundamentals mastery.

### Core Features
| Feature | Description |
|---------|-------------|
| **Integrated Code Editor** | In-browser IDE with syntax highlighting, auto-complete, and test case execution for **Python** and **C++**. |
| **LeetCode Problem Library** | Add, save, and organize LeetCode problems. Tag by pattern, difficulty, and topic. |
| **Progress Dashboard** | Visual skill tree, streak tracking, and "Ready for Interview" score. |
| **Socratic AI Tutor** | An AI companion that guides learning through questions. |
| **Mock Interview Mode** | Timed coding environment simulating real interview pressure. |
| **GitHub Integration** 🆕 | Push completed projects directly to GitHub. Auto-generate professional README files for portfolio showcase. |

### Step-Based Journey Tracking 🆕
The entire learning journey is structured as **trackable steps/tasks**:

```
Act 0: Language Foundations
├── Step 0.1: Python Basics ✅
├── Step 0.2: Python OOP ✅
├── Step 0.3: Python Functional ⏳ (in progress)
├── Step 0.4: C++ Basics
│   └── Task: Complete "Pointers vs References" exercise
├── ...
Act 1: Foundations
├── Step 1.1: Arrays & Lists
│   ├── Task: Read concept material
│   ├── Task: Solve 3 practice problems
│   └── Task: Complete Project P1 checkpoint
├── ...
```

| Tracking Feature | Description |
|------------------|-------------|
| **Step Completion** | Mark each step as Not Started → In Progress → Complete |
| **Task Checklists** | Each step contains granular tasks (read, practice, build) |
| **Time Tracking** | Log time spent on each step for self-analysis |
| **Milestone Badges** | Earn badges for completing Acts, projects, and streaks |
| **Resume Export** | Generate a skills summary and project list for resume |

### GitHub Integration Details 🆕
| Feature | Description |
|---------|-------------|
| **One-Click Push** | Push project code to a new or existing GitHub repo |
| **Auto-README** | Generate professional README with project description, tech stack, and learnings |
| **Commit History** | Encourage incremental commits during "Build Along" mode |
| **Portfolio Page** | Auto-generate a portfolio summary linking all completed projects |

### Tech Stack (for building Marathon itself)
- **Frontend**: Next.js + React
- **Backend**: Python (FastAPI) or Node.js
- **Code Execution**: Sandboxed Docker containers (Judge0 or similar)
- **Database**: PostgreSQL + Redis for caching
- **Auth**: GitHub OAuth (enables GitHub integration)


---

# Part 2: Curriculum Structure (The "What")

> [!IMPORTANT]
> **Regarding the "web-heavy" feedback**: The original draft leaned heavily into web/API/frontend topics because many SWE roles are web-focused. However, for a *comprehensive* CS prep, the curriculum should be **domain-agnostic at its core**, with optional specialization tracks. The revised structure below prioritizes **language-agnostic fundamentals** first, then offers modular "tracks" for different career interests (Web, Systems, ML/DS).

## Core Curriculum (Required for All)

### Act 0: Language Foundations (Prerequisite) 🆕
*Goal: Build fluency in Python and C++ before diving into CS fundamentals.*

> [!TIP]
> Students with strong language backgrounds can skim this section. Those needing a refresh should complete it thoroughly before proceeding.

#### Python Mastery

| Topic | Concepts Covered |
|-------|------------------|
| **Basics** | Variables, data types, control flow, functions, error handling |
| **Data Structures** | Lists, dicts, sets, tuples, comprehensions, slicing |
| **OOP in Python** | Classes, inheritance, magic methods (`__init__`, `__str__`, `__eq__`) |
| **Functional Python** | Lambdas, `map`/`filter`/`reduce`, generators, iterators |
| **Pythonic Idioms** | Context managers (`with`), decorators, `*args`/`**kwargs`, type hints |
| **Standard Library** | `collections`, `itertools`, `functools`, `typing`, `dataclasses` |
| **Testing** | `unittest`, `pytest`, mocking basics |

#### C++ Mastery

| Topic | Concepts Covered |
|-------|------------------|
| **Basics** | Variables, types, control flow, functions, references vs pointers |
| **Memory Management** | Stack vs Heap, `new`/`delete`, RAII, smart pointers (`unique_ptr`, `shared_ptr`) |
| **OOP in C++** | Classes, constructors/destructors, inheritance, virtual functions, polymorphism |
| **Modern C++ (11/14/17)** | `auto`, range-based loops, lambdas, `nullptr`, move semantics, `constexpr` |
| **STL Essentials** | `vector`, `map`, `unordered_map`, `set`, `string`, iterators, algorithms |
| **Templates** | Function templates, class templates, template specialization |
| **Build & Tooling** | Compilation model, header files, Makefiles, CMake basics, debugging with `gdb` |

#### Language Comparison Exercises
- Implement the same algorithm (e.g., merge sort) in both Python and C++
- Compare memory usage and performance
- Understand trade-offs: development speed vs runtime efficiency

---

### Act 1: Foundations of Computer Science
*Goal: Master the timeless fundamentals that transcend languages and domains.*

| Scene | Breadth | Depth |
|-------|---------|-------|
| **1. Data Structures** | Arrays, Lists, Stacks, Queues | Trees, Heaps, Hash Tables, Graphs, Tries |
| **2. Algorithms** | Sorting, Searching, Big O | DP, Greedy, Graph Algorithms, Backtracking |
| **3. Recursion & Mathematical Thinking** 🆕 | Recursive functions, Base cases | Recurrence relations, Master theorem, Proof techniques |
| **4. Design Patterns & OOP** | Classes, Inheritance | SOLID, Creational/Structural/Behavioral Patterns |
| **5. Math for CS** 🆕 | Discrete math basics, Modular arithmetic | Combinatorics, Probability, Number theory (for crypto/hashing) |
| **6. Bit Manipulation** 🆕 | Binary representation, Bitwise operators | Bit tricks, Masks, XOR properties, Bit DP |

### Act 2: Systems & Low-Level Fundamentals
*Goal: Understand how software interacts with hardware and the OS.*

| Scene | Breadth | Depth |
|-------|---------|-------|
| **1. Computer Architecture** 🆕 | CPU, Memory hierarchy, Caches | Cache locality, Branch prediction, SIMD basics |
| **2. Operating Systems** | Processes, Threads, Memory | Virtual Memory, Page Tables, Scheduling, Context Switching |
| **3. Computer Networks** | OSI Model, TCP/IP | Sockets, HTTP/2, TLS Handshake, DNS Resolution |
| **4. Databases & Storage** | SQL basics, CRUD | Indexing (B-Trees), Transactions, CAP Theorem, Sharding |
| **5. Concurrency & Parallelism** | Threads vs Async | Mutexes, Semaphores, Deadlocks, Lock-free structures |
| **6. Security Fundamentals** 🆕 | Authentication vs Authorization | OWASP Top 10, SQL Injection, XSS, CSRF, Hashing vs Encryption |

### Act 3: System Design & Scalability
*Goal: Design systems that serve millions of users reliably.*

| Scene | Breadth | Depth |
|-------|---------|-------|
| **1. Distributed Systems** | Microservices vs Monoliths | Consensus (Raft), Consistency models, Partitioning |
| **2. Scalability Patterns** | Load Balancing, Caching | CDN, Message Queues (Kafka), Rate Limiting |
| **3. Reliability Engineering** | Monitoring basics | SLIs/SLOs, Distributed Tracing, Chaos Engineering |
| **4. Design Case Studies** | URL Shortener | Twitter Feed, Uber, Dropbox-scale systems |
| **5. API Design** 🆕 | REST basics | Versioning, Pagination, Idempotency, Rate limiting, GraphQL vs REST trade-offs |

### Act 4: The Interview & Career Bridge
*Goal: Synthesize knowledge and perform under pressure.*

| Scene | Breadth | Depth |
|-------|---------|-------|
| **1. Coding Challenges** | LeetCode Easy/Medium | LeetCode Hard, pattern recognition, optimization |
| **2. System Design Interviews** | Whiteboard approach | Handling ambiguity, trade-off articulation |
| **3. Behavioral & Soft Skills** | STAR method | Conflict resolution, leadership narratives |
| **4. Version Control & Collaboration** 🆕 | Git basics (add, commit, push) | Branching strategies, Rebase vs Merge, Code review best practices |
| **5. Code Quality & Testing** 🆕 | Unit testing basics | TDD, Integration testing, Mocking, Code coverage, Linting |
| **6. The First 90 Days** | Onboarding | Code review etiquette, mentorship, continuous learning |


---

## Specialization Tracks (Optional Modules)

### Track A: Web & Full-Stack Engineering
*For roles at product companies building user-facing applications.*
- REST/GraphQL API Design
- React/Next.js Frontend
- Authentication (OAuth, JWT)
- CI/CD & DevOps (Docker, Kubernetes)

### Track B: Systems & Infrastructure
*For roles focused on low-level performance, embedded, or infrastructure.*
- C++ Performance Optimization
- Kernel & OS Internals
- Networking Deep-Dive (gRPC, Protobuf)
- Cloud Infrastructure (AWS/GCP Certifications)

### Track C: Machine Learning & Data Science 🆕
*For roles in ML engineering, data science, or AI-focused teams.*

| Topic | Breadth | Depth |
|-------|---------|-------|
| **Math Foundations** | Linear Algebra, Probability | Matrix calculus, Bayesian inference |
| **Classical ML** | Regression, Classification | SVMs, Decision Trees, Ensemble methods |
| **Deep Learning** | Neural Network basics | CNNs, RNNs, Transformers, Attention |
| **MLOps & Deployment** | Model serialization | Feature stores, Model monitoring, A/B testing |
| **Python for ML** | NumPy, Pandas | Scikit-learn, PyTorch/TensorFlow, efficient vectorization |

---

# Part 3: Experiential Design (The "How")

## 1. Progressive Project Ladder 🏗️
*Projects are the backbone of learning. Each Act includes hands-on projects with escalating complexity.*

### Project Philosophy
- **Complete Source Code Provided**: Every project includes **full, working source code** that students can study, run, and modify.
- **Step-by-Step Walkthroughs**: Each project is accompanied by a detailed **code walkthrough** explaining design decisions, trade-offs, and implementation details line-by-line.
- **"Build Along" Mode**: Students can follow along and build the project incrementally, or study the complete solution first.
- **Portfolio-Ready**: By the end, students have 4+ substantial projects to showcase in interviews.
- **Language Rotation**: Alternate between Python and C++ to build fluency in both.

### Project Delivery Format
Each project includes:
| Component | Description |
|-----------|-------------|
| **📄 Design Doc** | Problem statement, requirements, architecture overview |
| **💻 Full Source Code** | Complete, runnable implementation with comments |
| **📖 Code Walkthrough** | Line-by-line explanation of key sections |
| **🧪 Test Suite** | Unit tests demonstrating expected behavior |
| **🎯 Extension Challenges** | Optional stretch goals for deeper learning |


---

### Act 0 Projects: Language Foundations 🆕

| # | Project | Concepts Applied | Language |
|---|---------|------------------|----------|
| **P0a** | **Python Toolkit** | Build a CLI utility with argument parsing, file I/O, decorators, and unit tests. | Python |
| **P0b** | **C++ Fundamentals Lab** | Memory management exercises: smart pointers, RAII patterns, and valgrind analysis. | C++ |

---

### Act 1 Projects: Foundations

| # | Project | Concepts Applied | Language |
|---|---------|------------------|----------|
| **P1** | **Custom Data Structures Library** | Implement `Vector`, `HashMap`, `LinkedList`, `BST` from scratch. Write unit tests. | C++ |
| **P2** | **Algorithm Visualizer CLI** | Visualize sorting/searching algorithms step-by-step in terminal. | Python |
| **P3** | **Recursive Problem Set** 🆕 | Solve 10 classic recursion problems (permutations, subsets, N-Queens) with memoization. | Python |
| **P4** | **Bit Manipulation Toolkit** 🆕 | Implement bitwise utilities: set/clear/toggle bits, count set bits, find single number, power of 2 checks. | C++ |

---

### Act 2 Projects: Systems

| # | Project | Concepts Applied | Language |
|---|---------|------------------|----------|
| **P5** | **Mini Shell** | Fork/exec, process management, pipes, signal handling. | C++ |
| **P6** | **HTTP Server from Scratch** | Socket programming, TCP, parsing HTTP requests, serving static files. | Python |
| **P7** | **Database Query Engine** | Parse SQL-like queries, build a B-Tree index, execute SELECT/INSERT on CSV files. | Python |
| **P8** | **Thread Pool & Producer-Consumer** 🆕 | Implement a thread pool with work queue, mutexes, and condition variables. | C++ |
| **P9** | **Secure Authentication Service** 🆕 | Password hashing (bcrypt), JWT tokens, input validation, SQL injection prevention. | Python |

---

### Act 3 Projects: Scale

| # | Project | Concepts Applied | Language |
|---|---------|------------------|----------|
| **P10** | **Distributed Key-Value Store** | Partitioning, replication, consistency, leader election (simplified Raft). | Python |
| **P11** | **Load Balancer & Rate Limiter** | Reverse proxy, round-robin/weighted distribution, token bucket algorithm. | Python |
| **P12** | **Caching Layer (LRU/LFU)** 🆕 | Implement LRU and LFU caches with O(1) operations, integrate with HTTP server. | Python |

---

### Act 4 Projects: Synthesis

| # | Project | Concepts Applied | Language |
|---|---------|------------------|----------|
| **P13** | **Full System Design: "Mini Twitter"** | API design, database schema, caching, feed ranking, scalability. Present as mock interview. | Design Doc + Python |
| **P14** | **Testing & CI/CD Pipeline** 🆕 | Write comprehensive tests (unit, integration, E2E) for a project, set up GitHub Actions CI. | Python |

---

### Track-Specific Projects (Optional)

| Track | Project | Description |
|-------|---------|-------------|
| **Web** | **Full-Stack Clone** | Build a Hacker News or Reddit clone with React + FastAPI + PostgreSQL. |
| **Web** | **Real-Time Chat App** 🆕 | WebSockets, presence indicators, message persistence. |
| **Systems** | **Memory Allocator** | Implement `malloc`/`free` with arena and slab allocation strategies. |
| **Systems** | **Simple Garbage Collector** 🆕 | Mark-and-sweep GC for a toy language runtime. |
| **ML/DS** | **End-to-End ML Pipeline** | Data ingestion, feature engineering, model training, deployment with FastAPI. |


---

## 2. Socratic AI Tutor 🤖
AI that asks guiding questions instead of giving answers.

## 3. Spaced Repetition & Daily Fire Drills ⏳
SRS flashcards for concepts + 15-minute daily coding challenges.

## 4. "Explain It To Me" Protocol 🎙️
Record 2-minute concept explanations; AI provides feedback.

## 5. Peer Mock Interviews 👥
Cohort-based learning with structured peer interview sessions.

## 6. Reverse Debugging Challenges 🐛
Diagnose and fix intentionally broken code.

## 7. "Day In The Life" Simulations 🏢
PR reviews, on-call alerts, ambiguous product tickets.

## 8. LeetCode Problem Library 📚
- Save and organize LeetCode problems by topic/pattern.
- Track solve status, time taken, and notes.
- Revisit problems with spaced repetition.

### LeetCode Pattern Categories 🆕
| Pattern | Example Problems |
|---------|------------------|
| **Two Pointers** | Container With Most Water, 3Sum |
| **Sliding Window** | Longest Substring Without Repeating |
| **Binary Search** | Search in Rotated Sorted Array |
| **BFS/DFS** | Number of Islands, Word Ladder |
| **Dynamic Programming** | Longest Increasing Subsequence, Coin Change |
| **Backtracking** | Permutations, N-Queens |
| **Graphs** | Course Schedule, Clone Graph |
| **Trees** | Validate BST, Lowest Common Ancestor |
| **Heaps/Priority Queues** | Merge K Sorted Lists, Top K Frequent |
| **Tries** | Word Search II, Implement Trie |
| **Union Find** | Number of Connected Components |
| **Intervals** | Merge Intervals, Meeting Rooms |
| **Monotonic Stack** | Largest Rectangle in Histogram |

## 9. Progress Visualization & Gamification 📊
Skill trees, streaks, and a "Ready for Interview" score.

---

# Part 4: Timeline & Effort Estimates 🆕

| Phase | Duration | Focus |
|-------|----------|-------|
| **Act 0: Language Foundations** | 1-2 weeks | Python & C++ fluency |
| **Act 1: CS Fundamentals** | 3-4 weeks | DS/Algo, Patterns, Math |
| **Act 2: Systems** | 3-4 weeks | OS, Networks, Databases, Security |
| **Act 3: System Design** | 2-3 weeks | Distributed systems, Scalability |
| **Act 4: Interview Prep** | 2-3 weeks | Mock interviews, Behavioral |
| **Specialization Track** | 2-3 weeks | Web / Systems / ML (optional) |
| **Total** | **13-19 weeks** | Full-time equivalent |

> [!TIP]
> Students can adjust pace based on their background. Those with strong fundamentals can compress Act 0-1.

---

# Summary

**Marathon** is a comprehensive web platform combining rigorous CS curriculum with modern, engaging learning experiences.

| Component | Details |
|-----------|---------|
| **Curriculum** | 5 Acts (Act 0-4) with 25+ scenes covering CS fundamentals to career skills |
| **Languages** | Python and C++ with integrated code editor |
| **Projects** | **16 progressive projects** (14 core + 2 per track) with full source code |
| **Tracks** | Web, Systems, ML/DS specializations |
| **Platform** | Step-based tracking, GitHub integration, AI tutor, gamification |
| **Timeline** | ~13-19 weeks full-time equivalent |

The goal: Students finish not just *knowing* the material, but **feeling prepared and confident** for any software engineering interview.



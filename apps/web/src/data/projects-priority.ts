/**
 * Act 1 Projects - Recursion & Act 2 Security
 * These are top interview topics!
 */

import { Project } from './projects';

// ============================================================
// RECURSIVE PROBLEM SET
// Real-World: Compilers, file systems, AI game trees, fractals,
// parsing HTML/JSON - recursion is everywhere!
// ============================================================
export const recursionProject: Project = {
    id: "recursion-problems",
    title: "Recursive Problem Set",
    act: 1,
    difficulty: "Intermediate",
    estimatedHours: 6,
    description: "Master recursion through classic problems. Essential for tree/graph problems, compilers, AI game agents, and parsing - top interview topics!",
    learningOutcomes: [
        "Understand recursive thinking",
        "Apply backtracking patterns",
        "Optimize with memoization",
    ],
    prerequisites: ["Functions", "Basic data structures"],
    technologies: ["Python", "C++"],
    steps: [
        {
            id: "step-1",
            title: "Recursion Fundamentals",
            description: "Understand base cases and recursive calls.",
            concepts: ["base case", "recursive call", "call stack"],
            code: {
                python: `# Classic recursion examples

def factorial(n):
    """Base case: n <= 1, Recursive: n * factorial(n-1)"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    """Naive O(2^n) - will optimize later"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def sum_array(arr, i=0):
    """Sum array recursively"""
    if i >= len(arr):
        return 0
    return arr[i] + sum_array(arr, i + 1)

# Test
print(f"5! = {factorial(5)}")  # 120
print(f"fib(10) = {fibonacci(10)}")  # 55
print(f"sum([1,2,3,4,5]) = {sum_array([1,2,3,4,5])}")  # 15`,
                cpp: `#include <iostream>
#include <vector>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    cout << "5! = " << factorial(5) << endl;
    cout << "fib(10) = " << fibonacci(10) << endl;
    return 0;
}`,
            },
            explanation: `## Recursion Structure

Every recursive function needs:
1. **Base case** - when to stop
2. **Recursive case** - smaller subproblem

### Call Stack for factorial(3):
\`\`\`
factorial(3) -> 3 * factorial(2)
                    -> 2 * factorial(1)
                            -> 1 (base case)
                    <- 2 * 1 = 2
            <- 3 * 2 = 6
\`\`\`

---

## 🌍 Real-World Applications

### 1. **Compilers & Interpreters**
Parsing code is inherently recursive:
\`\`\`python
def parse_expression():
    left = parse_term()
    if current_token == '+':
        return left + parse_expression()  # Recursive!
\`\`\`

### 2. **File System Traversal**
\`find\`, \`du\`, \`rm -r\` all use recursion:
\`\`\`python
def get_all_files(directory):
    for item in directory:
        if is_dir(item):
            yield from get_all_files(item)  # Recursive!
        else:
            yield item
\`\`\`

### 3. **AI Game Agents (Chess, Go)**
Minimax algorithm explores game trees recursively.

### 4. **React/DOM Rendering**
Rendering nested components is recursive.`,
            tips: ["Always define base case first", "Each call should progress toward base case", "Watch for stack overflow with deep recursion"],
        },
        {
            id: "step-2",
            title: "Backtracking",
            description: "Generate permutations, subsets, and solve N-Queens.",
            concepts: ["backtracking", "state space", "pruning"],
            code: {
                python: `def permutations(nums):
    """Generate all permutations using backtracking"""
    result = []
    
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        
        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()  # Backtrack!
    
    backtrack([], nums)
    return result

def subsets(nums):
    """Generate all subsets (power set)"""
    result = []
    
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    
    backtrack(0, [])
    return result

print(permutations([1,2,3]))
print(subsets([1,2,3]))`,
            },
            explanation: `## Backtracking Pattern

\`\`\`python
def backtrack(state):
    if is_solution(state):
        record(state)
        return
    
    for choice in choices:
        make_choice(choice)
        backtrack(state)
        undo_choice(choice)  # BACKTRACK
\`\`\``,
            tips: ["Always undo choices after recursive call", "Prune early to improve performance"],
        },
        {
            id: "step-3",
            title: "Memoization",
            description: "Optimize recursive solutions with caching.",
            concepts: ["memoization", "dynamic programming", "cache"],
            code: {
                python: `from functools import lru_cache

# Method 1: Manual memoization
def fib_memo(n, cache={}):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    cache[n] = fib_memo(n-1, cache) + fib_memo(n-2, cache)
    return cache[n]

# Method 2: Using decorator
@lru_cache(maxsize=None)
def fib_cached(n):
    if n <= 1:
        return n
    return fib_cached(n-1) + fib_cached(n-2)

# Now O(n) instead of O(2^n)!
print(f"fib(50) = {fib_cached(50)}")  # Instant!

# Classic DP: Coin Change
@lru_cache(maxsize=None)
def coin_change(amount, coins):
    if amount == 0:
        return 0
    if amount < 0:
        return float('inf')
    
    min_coins = float('inf')
    for coin in coins:
        result = coin_change(amount - coin, coins)
        min_coins = min(min_coins, result + 1)
    return min_coins

print(coin_change(11, (1, 5, 6)))  # 3 coins: 5+5+1`,
            },
            explanation: `## Memoization = Cache + Recursion

Transforms exponential to polynomial time.

| Problem | Without Memo | With Memo |
|---------|-------------|-----------|
| Fibonacci | O(2^n) | O(n) |
| Coin Change | O(k^n) | O(n*k) |`,
            tips: ["Use @lru_cache for easy memoization", "Memoize when you see overlapping subproblems"],
        },
    ],
};

// ============================================================
// SECURE AUTHENTICATION SERVICE
// Real-World: Every web app needs this! Google, Facebook, banks
// all use these exact patterns for user authentication
// ============================================================
export const secureAuthProject: Project = {
    id: "secure-auth",
    title: "Secure Authentication Service",
    act: 2,
    difficulty: "Intermediate",
    estimatedHours: 6,
    description: "Build secure auth with password hashing, JWT, and input validation. Learn what Google, Facebook, and banks use to protect billions of users.",
    learningOutcomes: [
        "Hash passwords with bcrypt",
        "Generate and verify JWTs",
        "Prevent common attacks",
    ],
    prerequisites: ["Python basics", "HTTP"],
    technologies: ["Python"],
    steps: [
        {
            id: "step-1",
            title: "Password Hashing",
            description: "Securely store passwords using bcrypt.",
            concepts: ["hashing", "salt", "bcrypt"],
            code: {
                python: `import bcrypt

def hash_password(password: str) -> bytes:
    """Hash password with bcrypt (includes salt)"""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode(), salt)

def verify_password(password: str, hashed: bytes) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode(), hashed)

# Usage
password = "mysecretpassword"
hashed = hash_password(password)
print(f"Hashed: {hashed}")

print(f"Correct password: {verify_password('mysecretpassword', hashed)}")
print(f"Wrong password: {verify_password('wrongpassword', hashed)}")`,
            },
            explanation: `## Why bcrypt?

1. **Slow** - Resists brute force (100ms per hash)
2. **Salted** - Same password = different hash every time
3. **Adaptive** - Increase rounds as hardware gets faster

**Never use MD5 or SHA for passwords!**

---

## 🌍 Real-World Applications

### 1. **LinkedIn Breach (2012)**
Used SHA-1 without salt. 6.5M passwords cracked in days.

### 2. **Dropbox Security**
Migrated from SHA-1 to bcrypt after breach lessons.

### 3. **Password Managers (1Password, LastPass)**
Use Argon2 or bcrypt with high work factors.

### 4. **Django/Rails Default**
Both frameworks use bcrypt/PBKDF2 by default - follow their lead!`,
            tips: ["Use rounds=12 minimum (increases over time)", "Never store plaintext passwords", "Consider Argon2 for new systems"],
        },
        {
            id: "step-2",
            title: "JWT Tokens",
            description: "Generate and verify JSON Web Tokens.",
            concepts: ["JWT", "claims", "signature"],
            code: {
                python: `import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"

def create_token(user_id: int, expires_hours: int = 24) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=expires_hours),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

# Usage
token = create_token(user_id=123)
print(f"Token: {token[:50]}...")

payload = verify_token(token)
print(f"User ID: {payload['user_id']}")`,
            },
            explanation: `## JWT Structure

\`\`\`
header.payload.signature
\`\`\`

- **Header**: Algorithm, type
- **Payload**: Claims (user_id, exp)
- **Signature**: Verifies integrity`,
            tips: ["Always set expiration", "Use strong secret key"],
        },
    ],
};

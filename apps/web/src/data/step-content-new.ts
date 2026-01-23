/**
 * Step Content for New Curriculum Scenes
 * Computer Architecture, Security, Version Control, Testing
 */

// Computer Architecture content (Act 2, Scene 2-5)
export const architectureContent: Record<string, { title: string; content: string }> = {
    'step-2-5-1': {
        title: 'CPU & Instruction Cycle',
        content: `# CPU & Instruction Cycle

How processors execute your code.

## CPU Components

| Component | Function |
|-----------|----------|
| ALU | Arithmetic & Logic operations |
| Control Unit | Fetches and decodes instructions |
| Registers | Fast temporary storage |
| PC (Program Counter) | Address of next instruction |

## Instruction Cycle (Fetch-Decode-Execute)

1. **Fetch**: Load instruction from memory using PC
2. **Decode**: Parse opcode and operands
3. **Execute**: Perform the operation
4. **Store**: Write results (if needed)

## Clock Speed & Performance

- **Clock Speed**: Cycles per second (GHz)
- **CPI**: Cycles Per Instruction
- **IPC**: Instructions Per Cycle

\`\`\`
Execution Time = Instructions × CPI × Clock Period
\`\`\`

## Pipelining

Execute multiple instructions simultaneously by overlapping stages:

\`\`\`
Time:    1   2   3   4   5   6
Inst 1:  F   D   E   S
Inst 2:      F   D   E   S
Inst 3:          F   D   E   S
\`\`\`

## Key Takeaways

- CPU executes billions of simple operations per second
- Pipelining increases throughput
- Modern CPUs are superscalar (multiple pipelines)
- Branch prediction helps avoid pipeline stalls
`,
    },

    'step-2-5-2': {
        title: 'Memory Hierarchy & Caches',
        content: `# Memory Hierarchy & Caches

Trading off speed, size, and cost.

## Memory Pyramid

| Level | Latency | Size |
|-------|---------|------|
| Registers | 1 cycle | ~KB |
| L1 Cache | ~4 cycles | ~32KB |
| L2 Cache | ~12 cycles | ~256KB |
| L3 Cache | ~40 cycles | ~8MB |
| RAM | ~200 cycles | ~16GB |
| Disk/SSD | ~100,000+ cycles | TB+ |

## Cache Locality

### Temporal Locality
Recently accessed data likely to be accessed again.

### Spatial Locality  
Data near recently accessed data likely to be accessed.

\`\`\`python
# Good spatial locality - sequential access
for i in range(len(arr)):
    sum += arr[i]

# Bad spatial locality - strided access
for i in range(0, len(arr), 100):
    sum += arr[i]
\`\`\`

## Cache Lines

Data is fetched in blocks (typically 64 bytes).

## Cache Misses

| Type | Cause |
|------|-------|
| Cold/Compulsory | First access to data |
| Capacity | Cache too small |
| Conflict | Multiple items map to same slot |

## Key Takeaways

- Memory access is the biggest bottleneck
- Cache locality dramatically affects performance
- Process data in contiguous chunks when possible
- Profile before optimizing
`,
    },

    'step-2-5-3': {
        title: 'CPU Optimizations',
        content: `# CPU Optimizations

Modern techniques for faster execution.

## Branch Prediction

CPU guesses which way branches will go:

\`\`\`cpp
// Predictable - always true most iterations
for (int i = 0; i < 1000000; i++) {
    // Branch predicted correctly almost every time
}

// Unpredictable - 50/50 random
if (random_bit()) {
    // Branch misprediction penalty ~15-20 cycles
}
\`\`\`

## SIMD (Single Instruction Multiple Data)

Process multiple data elements simultaneously:

\`\`\`cpp
// Without SIMD: 4 operations
for (int i = 0; i < 4; i++)
    c[i] = a[i] + b[i];

// With SIMD: 1 operation (4 values at once)
// Uses AVX/SSE instructions
\`\`\`

## Out-of-Order Execution

CPU reorders instructions to avoid stalls and dependencies.

## Loop Unrolling

Reduce loop overhead by processing multiple elements per iteration.

## Key Takeaways

- Write predictable branches when possible
- Let the compiler optimize (use -O2, -O3)
- Use vectorized libraries (NumPy, Eigen)
- Profile to find actual bottlenecks
`,
    },

    'step-2-5-4': {
        title: 'Modern Hardware Concepts',
        content: `# Modern Hardware Concepts

Current CPU architectures and trends.

## Multi-Core Processors

Multiple cores share L3 cache, each has private L1/L2.

## Hyper-Threading (SMT)

Two logical cores share one physical core's resources.

## CPU vs GPU

| Aspect | CPU | GPU |
|--------|-----|-----|
| Cores | 4-64 | 1000s |
| Per-core speed | Fast | Slower |
| Best for | Sequential | Parallel |
| Example | Web server | ML training |

## NUMA (Non-Uniform Memory Access)

In multi-socket systems, access to local memory is faster than remote memory.

\`\`\`python
import multiprocessing as mp

# Use all cores
with mp.Pool(mp.cpu_count()) as pool:
    results = pool.map(process, data)
\`\`\`

## Key Takeaways

- Use all cores for parallelizable work
- GPU for massively parallel computations
- Consider NUMA topology for large systems
- Memory bandwidth often the bottleneck
`,
    },
};

// Security Fundamentals content (Act 2, Scene 2-6)
export const securityContent: Record<string, { title: string; content: string }> = {
    'step-2-6-1': {
        title: 'Authentication vs Authorization',
        content: `# Authentication vs Authorization

Who are you? vs What can you do?

## Definitions

| Concept | Question | Example |
|---------|----------|---------|
| Authentication | Who are you? | Login with password |
| Authorization | What can you do? | Admin can delete users |

## Authentication Methods

### Something You Know
- Password, PIN, Security questions

### Something You Have
- Phone (SMS code), Hardware token (YubiKey)

### Something You Are
- Fingerprint, Face ID, Voice recognition

## Multi-Factor Authentication (MFA)

Combine 2+ factors for stronger security.

## Session Management

\`\`\`python
from flask import session

@app.route('/login', methods=['POST'])
def login():
    user = authenticate(request.form)
    if user:
        session['user_id'] = user.id
        return redirect('/dashboard')
    return 'Invalid credentials', 401
\`\`\`

## JWT (JSON Web Tokens)

\`\`\`python
import jwt

token = jwt.encode(
    {'user_id': 123, 'exp': datetime.utcnow() + timedelta(hours=1)},
    SECRET_KEY,
    algorithm='HS256'
)
\`\`\`

## Authorization Models

### RBAC (Role-Based)
\`\`\`python
roles = {
    'admin': ['read', 'write', 'delete'],
    'editor': ['read', 'write'],
    'viewer': ['read']
}
\`\`\`

## Key Takeaways

- Authentication: verify identity
- Authorization: check permissions
- Use MFA for sensitive services
- Store sessions securely
`,
    },

    'step-2-6-2': {
        title: 'OWASP Top 10',
        content: `# OWASP Top 10

Most critical web application security risks.

## 1. Injection

Untrusted data sent to interpreter.

\`\`\`python
# VULNERABLE: SQL Injection
query = f"SELECT * FROM users WHERE name = '{user_input}'"

# SAFE: Parameterized query
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))
\`\`\`

## 2. Broken Authentication

\`\`\`python
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
\`\`\`

## 5. Broken Access Control

\`\`\`python
@app.route('/user/<user_id>/profile')
def profile(user_id):
    if current_user.id != user_id:
        return 'Forbidden', 403
    return get_profile(user_id)
\`\`\`

## 7. Cross-Site Scripting (XSS)

\`\`\`html
<!-- SAFE: Auto-escaping -->
<div>{{ user_input | escape }}</div>
\`\`\`

## 9. Using Components with Known Vulnerabilities

\`\`\`bash
pip-audit
npm audit
\`\`\`

## Key Takeaways

- Never trust user input
- Use parameterized queries
- Escape output
- Keep dependencies updated
`,
    },

    'step-2-6-3': {
        title: 'Secure Coding Practices',
        content: `# Secure Coding Practices

Writing code that resists attacks.

## Input Validation

\`\`\`python
import re

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None
\`\`\`

## SQL Injection Prevention

\`\`\`python
# Always use parameterized queries
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# With ORM
user = User.query.filter_by(id=user_id).first()
\`\`\`

## CSRF Protection

\`\`\`html
<form method="post">
    {{ csrf_token() }}
    <input type="text" name="data">
</form>
\`\`\`

## Secure Headers

\`\`\`python
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    return response
\`\`\`

## Rate Limiting

\`\`\`python
from flask_limiter import Limiter

@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    pass
\`\`\`

## Secrets Management

\`\`\`python
# Use environment variables
SECRET_KEY = os.environ['SECRET_KEY']
\`\`\`

## Key Takeaways

- Validate all input (whitelist approach)
- Encode output for each context
- Use parameterized queries everywhere
- Keep secrets out of code
`,
    },

    'step-2-6-4': {
        title: 'Cryptography Basics',
        content: `# Cryptography Basics

Secure communication and data protection.

## Hashing vs Encryption

| Hashing | Encryption |
|---------|------------|
| One-way | Reversible |
| Fixed output size | Variable output |
| Verify integrity | Protect confidentiality |
| SHA-256, bcrypt | AES, RSA |

## Password Hashing

\`\`\`python
import bcrypt

password = "user_password"
salt = bcrypt.gensalt(rounds=12)
hashed = bcrypt.hashpw(password.encode(), salt)

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed)
\`\`\`

## Symmetric Encryption (AES)

\`\`\`python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

ciphertext = cipher.encrypt(b"sensitive data")
decrypted = cipher.decrypt(ciphertext)
\`\`\`

## TLS/HTTPS

Always use TLS for network traffic:
1. Client sends ClientHello
2. Server sends certificate
3. Key exchange
4. Encrypted communication

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| MD5/SHA1 for passwords | Use bcrypt/argon2 |
| Weak keys | Use crypto library generators |
| Storing keys in code | Use environment/secrets manager |

## Key Takeaways

- Use bcrypt/argon2 for passwords
- AES-256-GCM for symmetric encryption
- RSA-2048+ for asymmetric
- Always use TLS for network traffic
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

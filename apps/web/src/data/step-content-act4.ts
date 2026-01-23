/**
 * Act 4: Interview Ready - Step Content
 * Coding Interviews, System Design, Behavioral, Capstone
 */

export const act4Content: Record<string, { title: string; content: string }> = {
    // Step 4-1-1: Problem-Solving Framework
    'step-4-1-1': {
        title: 'Problem-Solving Framework',
        content: `# Problem-Solving Framework

A systematic approach to coding interviews.

## The UMPIRE Method

| Step | Action |
|------|--------|
| **U**nderstand | Clarify the problem |
| **M**atch | Connect to known patterns |
| **P**lan | Design your approach |
| **I**mplement | Write the code |
| **R**eview | Check for bugs |
| **E**valuate | Analyze complexity |

## Step 1: Understand

\`\`\`
Questions to ask:
- Input size and constraints?
- Edge cases (empty, single element)?
- Can I modify the input?
- Are there duplicates?
- Is the input sorted?
\`\`\`

## Step 2: Match Patterns

| Pattern | Indicators |
|---------|------------|
| Two Pointers | Sorted array, pairs |
| Sliding Window | Contiguous subarray |
| Hash Map | Counting, lookups |
| DFS/BFS | Trees, graphs |
| DP | Optimal substructure |

## Step 3: Plan

\`\`\`
"I'll use a hash map to track seen elements.
For each number, I'll check if its complement exists.
Time: O(n), Space: O(n)"
\`\`\`

## Step 4: Implement

\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\`

## Key Takeaways

- Think out loud
- Start with brute force, then optimize
- Test with examples before coding
- Always discuss time/space complexity
`,
    },

    // Step 4-1-2: Common Patterns
    'step-4-1-2': {
        title: 'Common Patterns',
        content: `# Common Interview Patterns

Recognize patterns to solve problems faster.

## Pattern 1: Prefix Sum

\`\`\`python
# Range sum queries in O(1)
def prefix_sum(nums):
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)
    return prefix

# Sum from i to j
def range_sum(prefix, i, j):
    return prefix[j + 1] - prefix[i]
\`\`\`

## Pattern 2: Fast & Slow Pointers

\`\`\`python
# Find cycle in linked list
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
\`\`\`

## Pattern 3: Merge Intervals

\`\`\`python
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    result = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= result[-1][1]:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])
    return result
\`\`\`

## Pattern 4: Monotonic Stack

\`\`\`python
# Next greater element
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []
    for i, num in enumerate(nums):
        while stack and nums[stack[-1]] < num:
            result[stack.pop()] = num
        stack.append(i)
    return result
\`\`\`

## Pattern 5: Top K Elements

\`\`\`python
import heapq
def top_k(nums, k):
    return heapq.nlargest(k, nums)
\`\`\`

## Key Takeaways

- Learn to recognize patterns
- Each pattern has specific indicators
- Practice applying patterns to new problems
`,
    },

    // Step 4-1-3: Mock Coding Interview
    'step-4-1-3': {
        title: 'Mock Coding Interview',
        content: `# Mock Coding Interview

Practice with timed problems.

## Interview Structure

| Phase | Time | Focus |
|-------|------|-------|
| Introduction | 5 min | Rapport |
| Problem 1 | 20 min | Medium difficulty |
| Problem 2 | 20 min | Medium-Hard |
| Questions | 5 min | Your questions |

## Sample Problem

**Problem**: Find length of longest substring without repeating characters.

**Approach**:
\`\`\`
1. Understand: String input, return integer
2. Match: Sliding window (contiguous substring)
3. Plan: Expand right, shrink left on duplicate
4. Complexity: O(n) time, O(min(n,26)) space
\`\`\`

**Solution**:
\`\`\`python
def length_of_longest_substring(s):
    seen = {}
    left = max_len = 0
    
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len
\`\`\`

## Practice Tips

1. Set a timer (45 min)
2. Use a whiteboard or paper first
3. Talk through your approach
4. Test with examples
5. Review after completing

## Key Takeaways

- Speed comes from pattern recognition
- Communicate constantly
- It's OK to make mistakes - recover gracefully
`,
    },

    // Step 4-2-1: SD Interview Framework
    'step-4-2-1': {
        title: 'SD Interview Framework',
        content: `# System Design Interview Framework

Structured approach to design questions.

## The 4-Step Framework

| Step | Time | Focus |
|------|------|-------|
| Requirements | 5 min | Clarify scope |
| High-Level Design | 10 min | Components |
| Detailed Design | 20 min | Deep dive |
| Wrap-up | 5 min | Trade-offs |

## Step 1: Requirements

**Functional**:
- What features are needed?
- Who are the users?

**Non-Functional**:
- Scale: How many users/requests?
- Latency: What's acceptable?
- Availability: 99.9%?

## Step 2: High-Level Design

\`\`\`
[Client] → [Load Balancer] → [API Servers]
                                  ↓
              [Cache] ← [Database] → [Search]
\`\`\`

## Step 3: Detailed Design

Pick 2-3 components to deep dive:
- Database schema
- API design
- Caching strategy
- Data partitioning

## Step 4: Trade-offs

Discuss:
- CAP theorem choices
- Cost vs performance
- Complexity vs maintainability

## Key Takeaways

- Drive the conversation
- Ask clarifying questions
- Think about scale
- Discuss trade-offs explicitly
`,
    },

    // Step 4-2-2: Handling Ambiguity
    'step-4-2-2': {
        title: 'Handling Ambiguity',
        content: `# Handling Ambiguity

Navigate unclear requirements.

## Common Ambiguities

| Area | Questions to Ask |
|------|------------------|
| Scale | DAU? Requests/sec? |
| Features | MVP vs full feature? |
| Consistency | Strong or eventual? |
| Latency | P99 requirements? |

## Example: "Design Twitter"

**Clarify**:
\`\`\`
Q: What features? Just feed, or DMs, search?
A: Feed and posting only.

Q: How many users?
A: 100M DAU, 500M total.

Q: Write vs read ratio?
A: 1:100 (read-heavy)
\`\`\`

## When Stuck

1. **State assumptions**: "I'll assume X unless you tell me otherwise"
2. **Start simple**: MVP first, then add features
3. **Use numbers**: Rough calculations help

## Back-of-Envelope Calculations

\`\`\`
100M DAU × 10 reads/day = 1B reads/day
1B reads / 86,400 sec = ~12K reads/sec

Storage:
100M users × 100 tweets/year × 280 bytes
= 2.8 TB/year
\`\`\`

## Key Takeaways

- Always clarify scope
- State assumptions explicitly
- Use round numbers
- Show your reasoning
`,
    },

    // Step 4-2-3: Mock SD Interview
    'step-4-2-3': {
        title: 'Mock SD Interview',
        content: `# Mock System Design Interview

Practice with a full design session.

## Problem: Design a Rate Limiter

**Requirements** (5 min):
- 100 requests/minute per user
- Distributed across servers
- Low latency (<10ms)

**High-Level Design** (10 min):
\`\`\`
[Client] → [Rate Limiter] → [API Server]
                ↓
            [Redis]
\`\`\`

**Detailed Design** (20 min):

**Algorithm**: Token Bucket
\`\`\`python
def is_allowed(user_id):
    key = f"rate:{user_id}"
    tokens = redis.get(key) or 100
    
    if tokens > 0:
        redis.decr(key)
        return True
    return False

# Refill every minute
def refill():
    redis.set(key, 100, ex=60)
\`\`\`

**Why Token Bucket?**
- Allows bursts
- Simple to implement
- Memory efficient

**Wrap-up** (5 min):
- Trade-off: Accuracy vs latency
- Could use sliding window for stricter limits
- Consider rate limiting by IP for unauthenticated

## Key Takeaways

- Practice the 4-step framework
- Draw diagrams
- Discuss trade-offs
`,
    },

    // Step 4-3-1: STAR Method
    'step-4-3-1': {
        title: 'STAR Method',
        content: `# STAR Method

Structure behavioral interview answers.

## STAR Framework

| Component | Description |
|-----------|-------------|
| **S**ituation | Context/background |
| **T**ask | Your responsibility |
| **A**ction | What you did |
| **R**esult | Outcome + impact |

## Example Question

**"Tell me about a time you disagreed with a teammate."**

**Situation**:
"In my previous role, we were designing the API for a new feature. A senior engineer wanted to use REST, while I believed GraphQL would be better for our use case."

**Task**:
"As the lead on this feature, I needed to make a decision that the team could align on."

**Action**:
"I requested a design review meeting where I presented a comparison: REST would require 3 endpoints vs 1 GraphQL query. I also built a prototype demonstrating the developer experience. I listened to his concerns about complexity and addressed them with training plans."

**Result**:
"We adopted GraphQL for this feature. It reduced our API response size by 40% and improved frontend development velocity. The senior engineer later thanked me for pushing back thoughtfully."

## Key Questions

- Conflict: How do you handle disagreements?
- Failure: Tell me about a mistake
- Leadership: Leading without authority
- Pressure: Working under tight deadline

## Key Takeaways

- Prepare 5-8 stories
- Be specific, not generic
- Quantify results when possible
- Practice aloud
`,
    },

    // Step 4-3-2: Common Questions
    'step-4-3-2': {
        title: 'Common Questions',
        content: `# Common Behavioral Questions

Prepare answers for frequent questions.

## Leadership

**"Tell me about a time you led a project."**
- Focus on influence, not authority
- Show decision-making process
- Highlight team outcomes

## Conflict

**"Describe a conflict with a coworker."**
- Show empathy and listening
- Focus on resolution
- End with positive outcome

## Failure

**"Tell me about a failure."**
- Be genuine, not a humble brag
- Focus on learning
- Show how you improved

## Pressure

**"How do you handle tight deadlines?"**
- Prioritization strategy
- Communication with stakeholders
- Realistic scope management

## Ambiguity

**"How do you work with unclear requirements?"**
- Ask clarifying questions
- Make and validate assumptions
- Iterate based on feedback

## Preparation Template

| Story | Situation | Action | Result |
|-------|-----------|--------|--------|
| Project lead | Outdated system | Led migration | 50% faster |
| Conflict | API debate | Data-driven | Team aligned |
| Failure | Missed deadline | New process | Never repeated |

## Key Takeaways

- Map stories to question types
- Practice transitions
- Keep answers 2-3 minutes
- Be authentic
`,
    },

    // Step 4-3-3: Your Story Prep
    'step-4-3-3': {
        title: 'Your Story Prep',
        content: `# Your Story Preparation

Create your personal narrative.

## Personal Pitch (30 seconds)

\`\`\`
"I'm a software engineer with 3 years of experience
in distributed systems. At [Company], I led the
migration of our payment service to microservices,
reducing latency by 40%. I'm excited about [Role]
because [specific reason]."
\`\`\`

## Story Bank Template

**Story 1: Technical Leadership**
- Situation: Legacy system, scaling issues
- Task: Lead modernization effort
- Action: Proposed plan, built prototype, mentored team
- Result: 3x throughput improvement

**Story 2: Collaboration**
- Situation: Cross-team dependency
- Task: Unblock teams
- Action: Organized sync meetings, created shared docs
- Result: Shipped on time, improved process

**Story 3: Learning/Growth**
- Situation: New technology stack
- Task: Deliver within deadline
- Action: Self-study, asked questions, iterated
- Result: Successful delivery, became go-to expert

## "Why This Company?"

Research:
- Products and mission
- Tech blog posts
- Recent news

Structure:
\`\`\`
"I'm drawn to [Company] because [specific reason].
I read about [project/blog post] and was impressed by
[technical decision]. My experience with [relevant skill]
would help me contribute to [team/project]."
\`\`\`

## Key Takeaways

- Prepare 5-8 strong stories
- Practice telling them naturally
- Research the company thoroughly
- Connect your experience to the role
`,
    },

    // Step 4-4-1 and 4-4-2: Capstone Projects
    'step-4-4-1': {
        title: 'Project P13: Mini Twitter Design',
        content: `# Project P13: Mini Twitter Design

Capstone project applying all system design concepts.

## Requirements

Functional:
- Post tweets (280 chars)
- Follow users
- Home timeline
- Like tweets

Non-Functional:
- 100M DAU
- Max 200ms latency
- 99.9% availability

## High-Level Design

\`\`\`
                    ┌─────────────┐
                    │  CDN (Edge) │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │Load Balancer│
                    └──────┬──────┘
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
       [API Server]  [API Server]  [API Server]
            │              │              │
            └──────────────┼──────────────┘
                           │
     ┌─────────────────────┼─────────────────────┐
     ▼                     ▼                     ▼
[Redis Cache]        [PostgreSQL]          [Search]
(Timelines)          (Users,Tweets)        (Elastic)
\`\`\`

## Database Schema

\`\`\`sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tweets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    content VARCHAR(280),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE follows (
    follower_id BIGINT REFERENCES users(id),
    followee_id BIGINT REFERENCES users(id),
    PRIMARY KEY (follower_id, followee_id)
);
\`\`\`

## Learning Objectives

- End-to-end system design
- Trade-off decisions
- Scalability planning
- Documentation skills
`,
    },

    'step-4-4-2': {
        title: 'Project P14: CI/CD Pipeline',
        content: `# Project P14: CI/CD Pipeline

Build a production-ready deployment pipeline.

## Pipeline Stages

\`\`\`
[Code Push] → [Build] → [Test] → [Deploy Staging] → [Deploy Prod]
\`\`\`

## GitHub Actions Example

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run tests
        run: pytest --cov=src tests/
      
      - name: Lint
        run: flake8 src/

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Deploy script
          echo "Deploying..."
\`\`\`

## Testing Strategy

| Type | Purpose | Tools |
|------|---------|-------|
| Unit | Individual functions | pytest |
| Integration | Component interaction | pytest |
| E2E | Full user flows | Cypress |

## Learning Objectives

- Automated testing
- Continuous integration
- Deployment automation
- Infrastructure as code
`,
    },
};

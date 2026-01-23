/**
 * Act 3: System Design - Step Content
 * Distributed Systems, Scalability, Design Case Studies
 */

export const act3Content: Record<string, { title: string; content: string }> = {
    // Step 3-1-1: CAP Theorem
    'step-3-1-1': {
        title: 'CAP Theorem & Trade-offs',
        content: `# CAP Theorem & Trade-offs

Fundamental constraints in distributed systems.

## CAP Theorem

You can only guarantee 2 of 3:

| Property | Description |
|----------|-------------|
| **C**onsistency | All nodes see same data |
| **A**vailability | System always responds |
| **P**artition Tolerance | Works despite network splits |

## Trade-off Choices

\`\`\`
        C
       / \\
    CP    CA
   /       \\
  P ─────── A
       AP
\`\`\`

| Type | Example | Sacrifice |
|------|---------|-----------|
| CP | MongoDB, HBase | Availability during partition |
| AP | Cassandra, DynamoDB | Consistency during partition |
| CA | Traditional RDBMS | Not partition tolerant |

## Real-World Example

**Banking (CP):**
- Must show correct balance
- Accept unavailability over wrong data

**Social Media (AP):**
- Show stale data if needed
- Availability more important

## Key Takeaways

- Network partitions will happen
- Choose based on business requirements
- Most systems choose AP or CP
- PACELC extends CAP for non-partition scenarios
`,
    },

    // Step 3-1-2: Consistency Models
    'step-3-1-2': {
        title: 'Consistency Models',
        content: `# Consistency Models

How data synchronizes across distributed nodes.

## Strong Consistency

All reads see most recent write.

\`\`\`
Write x=5 ──► [Primary]
              │
         Replicate
              │
              ├── [Replica 1] x=5
              └── [Replica 2] x=5
                        │
Read x ───────────────► x=5 (guaranteed)
\`\`\`

## Eventual Consistency

Given enough time, all reads return same value.

\`\`\`
Write x=5 ──► [Node A] x=5
              │ (async)
              └──► [Node B] x=? (eventually x=5)
\`\`\`

## Consistency Spectrum

| Model | Guarantee | Performance |
|-------|-----------|-------------|
| Linearizable | Real-time ordering | Slowest |
| Sequential | Global order exists | Slow |
| Causal | Cause precedes effect | Medium |
| Eventual | Eventually same | Fast |

## Read Your Writes

\`\`\`python
# Client writes then reads same key
client.write("user:123", {"name": "Alice"})
# Guarantee: client sees their own write
result = client.read("user:123")  
# result = {"name": "Alice"}
\`\`\`

## Key Takeaways

- Stronger consistency = higher latency
- Most apps need eventual + read-your-writes
- Use strong consistency for critical data
- Consider consistency per operation
`,
    },

    // Step 3-1-3: Replication & Partitioning
    'step-3-1-3': {
        title: 'Replication & Partitioning',
        content: `# Replication & Partitioning

Scale data across multiple machines.

## Replication

Copies of same data on multiple nodes.

**Leader-Follower:**
\`\`\`
Write ──► [Leader] ──► [Follower 1]
                  └──► [Follower 2]
Read ◄─── Any node
\`\`\`

**Multi-Leader:**
\`\`\`
[Leader A] ◄──► [Leader B]
    │               │
[Follower]     [Follower]
\`\`\`

## Partitioning (Sharding)

Split data across nodes.

**Hash Partitioning:**
\`\`\`python
def get_shard(key, num_shards):
    return hash(key) % num_shards

# user_123 → shard 2
# user_456 → shard 0
\`\`\`

**Range Partitioning:**
\`\`\`
Shard 1: A-M
Shard 2: N-Z
\`\`\`

## Consistent Hashing

Minimize redistribution when nodes change.

\`\`\`
        0°
        │
   ┌────┴────┐
   │  Node A │
   └────┬────┘
90° ────┼──── 270°
   ┌────┴────┐
   │  Node B │
   └────┬────┘
        │
       180°
\`\`\`

## Key Takeaways

- Replication: fault tolerance, read scaling
- Partitioning: write scaling, large datasets
- Consistent hashing reduces rebalancing
- Consider hotspots in partition strategy
`,
    },

    // Step 3-2-1: Load Balancing
    'step-3-2-1': {
        title: 'Load Balancing',
        content: `# Load Balancing

Distribute traffic across multiple servers.

## Algorithms

| Algorithm | Description |
|-----------|-------------|
| Round Robin | Rotate through servers |
| Least Connections | Send to least busy |
| IP Hash | Same client → same server |
| Weighted | Based on server capacity |

## Layer 4 vs Layer 7

**Layer 4 (Transport):**
- Routes based on IP/port
- Faster, less flexible

**Layer 7 (Application):**
- Routes based on HTTP content
- Can route by URL path, headers

## Health Checks

\`\`\`
Load Balancer
   │
   ├── Health: GET /health
   │
   ├── [Server 1] ✓ Healthy
   ├── [Server 2] ✓ Healthy
   └── [Server 3] ✗ Unhealthy (removed)
\`\`\`

## Session Affinity

Keep user on same server:

\`\`\`
User A ──► Server 1 (sticky session)
User B ──► Server 2
\`\`\`

Used for session-based apps, but limits scalability.

## Key Takeaways

- Use L7 for HTTP/application routing
- Implement health checks
- Avoid sticky sessions if possible
- Consider global load balancing (geo)
`,
    },

    // Step 3-2-2: Caching Strategies
    'step-3-2-2': {
        title: 'Caching Strategies',
        content: `# Caching Strategies

Speed up reads with temporary storage.

## Cache Patterns

### Cache-Aside (Lazy Loading)
\`\`\`python
def get_user(user_id):
    # Check cache first
    user = cache.get(f"user:{user_id}")
    if user:
        return user
    
    # Cache miss: fetch from DB
    user = db.query("SELECT * FROM users WHERE id = ?", user_id)
    cache.set(f"user:{user_id}", user, ttl=3600)
    return user
\`\`\`

### Write-Through
\`\`\`python
def update_user(user_id, data):
    db.update("UPDATE users SET ... WHERE id = ?", data, user_id)
    cache.set(f"user:{user_id}", data)  # Update cache
\`\`\`

### Write-Behind
\`\`\`python
def update_user(user_id, data):
    cache.set(f"user:{user_id}", data)  # Update cache first
    queue.enqueue(lambda: db.update(...))  # Async DB write
\`\`\`

## Eviction Policies

| Policy | Description |
|--------|-------------|
| LRU | Least Recently Used |
| LFU | Least Frequently Used |
| TTL | Time To Live expiration |
| FIFO | First In First Out |

## Cache Invalidation

> "There are only two hard things in CS: cache invalidation and naming things."

\`\`\`python
# Invalidate on write
def update_user(user_id, data):
    db.update(...)
    cache.delete(f"user:{user_id}")  # Invalidate
\`\`\`

## Key Takeaways

- Cache-aside is most common
- Set appropriate TTLs
- Consider thundering herd problem
- Use Redis or Memcached
`,
    },

    // Step 3-2-3: Message Queues
    'step-3-2-3': {
        title: 'Message Queues',
        content: `# Message Queues

Decouple services with asynchronous communication.

## Why Queues?

- **Decoupling**: Services don't need direct connection
- **Buffering**: Handle traffic spikes
- **Reliability**: Retry failed messages
- **Scaling**: Add consumers as needed

## Queue Architecture

\`\`\`
Producer ──► [Queue] ──► Consumer
                    ──► Consumer
                    ──► Consumer
\`\`\`

## Pub/Sub Pattern

\`\`\`
Publisher ──► [Topic] ──► Subscriber A
                     ──► Subscriber B
                     ──► Subscriber C
\`\`\`

## Example with Redis

\`\`\`python
import redis

r = redis.Redis()

# Producer
r.lpush('task_queue', 'process_image:123')

# Consumer
while True:
    task = r.brpop('task_queue', timeout=0)
    process(task)
\`\`\`

## Delivery Guarantees

| Guarantee | Description |
|-----------|-------------|
| At-most-once | May lose messages |
| At-least-once | May duplicate |
| Exactly-once | Hardest to achieve |

## Key Takeaways

- Use queues for async processing
- Consider Kafka for high throughput
- RabbitMQ for complex routing
- Redis for simple use cases
`,
    },

    // Step 3-2-4: Rate Limiting
    'step-3-2-4': {
        title: 'Rate Limiting',
        content: `# Rate Limiting

Protect services from overload.

## Token Bucket Algorithm

\`\`\`python
class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate
        self.last_refill = time.time()
    
    def allow_request(self):
        self._refill()
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now
\`\`\`

## Sliding Window

\`\`\`python
def is_allowed(user_id, limit=100, window=60):
    key = f"rate:{user_id}"
    now = time.time()
    
    # Remove old entries
    redis.zremrangebyscore(key, 0, now - window)
    
    # Count recent requests
    count = redis.zcard(key)
    if count < limit:
        redis.zadd(key, {str(now): now})
        return True
    return False
\`\`\`

## Rate Limit Headers

\`\`\`
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1609459200
Retry-After: 60
\`\`\`

## Key Takeaways

- Token bucket allows bursts
- Sliding window is more accurate
- Return 429 with retry info
- Rate limit by user/IP/API key
`,
    },

    // Step 3-3-1 through 3-3-3: Design Case Studies
    'step-3-3-1': {
        title: 'URL Shortener',
        content: `# URL Shortener Design

Design a service like bit.ly.

## Requirements

- Shorten long URLs
- Redirect short URLs
- 100M URLs/month
- 10:1 read/write ratio

## API Design

\`\`\`
POST /shorten
Body: { "url": "https://very-long-url.com/..." }
Response: { "short": "abc123" }

GET /{short_code}
Response: 301 Redirect to original URL
\`\`\`

## Short Code Generation

\`\`\`python
import hashlib
import base64

def generate_short_code(url):
    # Hash + base62 encode
    hash_bytes = hashlib.md5(url.encode()).digest()
    code = base64.b64encode(hash_bytes)[:7]
    return code.decode()

# Or use auto-increment ID + base62
def id_to_code(id):
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    code = ""
    while id > 0:
        code = chars[id % 62] + code
        id //= 62
    return code
\`\`\`

## Database Schema

\`\`\`sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE,
    original_url TEXT,
    created_at TIMESTAMP
);
\`\`\`

## Key Takeaways

- 62^7 = 3.5 trillion possible codes
- Cache hot URLs in Redis
- Use 301 for SEO, 302 for analytics
`,
    },

    'step-3-3-2': {
        title: 'Twitter Feed',
        content: `# Twitter Feed Design

Design a social media timeline.

## Requirements

- Post tweets (140 chars)
- Follow users
- Home timeline (followed users' tweets)
- 500M users, 10K tweets/second

## Data Models

\`\`\`sql
-- Users
CREATE TABLE users (id, name, ...);

-- Tweets
CREATE TABLE tweets (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    content TEXT,
    created_at TIMESTAMP
);

-- Follows
CREATE TABLE follows (
    follower_id BIGINT,
    followee_id BIGINT,
    PRIMARY KEY (follower_id, followee_id)
);
\`\`\`

## Fan-out Strategies

**Fan-out on Write (Push):**
\`\`\`
User posts tweet
    │
    ▼
Write to all followers' timelines (Redis)
\`\`\`

**Fan-out on Read (Pull):**
\`\`\`
User requests timeline
    │
    ▼
Query all followed users' tweets
Merge and sort
\`\`\`

**Hybrid:**
- Push for normal users
- Pull for celebrities (many followers)

## Key Takeaways

- Timeline is read-heavy: cache it
- Celebrity problem: fan-out on read
- Use Redis sorted sets for timelines
`,
    },

    'step-3-3-3': {
        title: 'Chat System',
        content: `# Chat System Design

Design a real-time messaging system.

## Requirements

- 1:1 and group chats
- Online presence
- Read receipts
- Message history

## WebSocket Architecture

\`\`\`
[Client] ◄──WebSocket──► [Server] ◄──► [Message Queue]
                              │
                        [Redis Pub/Sub]
\`\`\`

## Message Flow

\`\`\`python
# Server receives message
async def handle_message(sender, recipient, content):
    # Store in database
    msg = db.insert_message(sender, recipient, content)
    
    # Check if recipient online
    if is_online(recipient):
        # Push via WebSocket
        await push_to_client(recipient, msg)
    else:
        # Store for later delivery
        queue.push_undelivered(recipient, msg)
\`\`\`

## Presence System

\`\`\`python
# Heartbeat every 30 seconds
def update_presence(user_id):
    redis.setex(f"presence:{user_id}", 60, "online")

def is_online(user_id):
    return redis.exists(f"presence:{user_id}")
\`\`\`

## Key Takeaways

- WebSockets for real-time
- Message queue for reliability
- Presence with TTL in Redis
- Shard by user ID
`,
    },

    // Step 3-4-1 through 3-4-3: Scale Projects
    'step-3-4-1': {
        title: 'Project P10: Distributed KV Store',
        content: `# Project P10: Distributed Key-Value Store

Build a simplified distributed database.

## Features

- Key-value storage
- Replication (3 replicas)
- Consistent hashing
- Simple consensus

## Node Structure

\`\`\`python
class KVNode:
    def __init__(self, node_id, peers):
        self.node_id = node_id
        self.data = {}
        self.peers = peers
    
    def put(self, key, value):
        # Write locally
        self.data[key] = value
        # Replicate to peers
        for peer in self.get_replicas(key):
            peer.replicate(key, value)
    
    def get(self, key):
        return self.data.get(key)
    
    def get_replicas(self, key):
        # Consistent hashing to find replicas
        hash_val = hash(key)
        # Return next N nodes in ring
        ...
\`\`\`

## Learning Objectives

- Distributed systems basics
- Replication strategies
- Failure handling
- Consistency trade-offs
`,
    },

    'step-3-4-2': {
        title: 'Project P11: Load Balancer',
        content: `# Project P11: Load Balancer

Build a reverse proxy with load balancing.

## Implementation

\`\`\`python
import http.server
import urllib.request
import itertools

class LoadBalancer(http.server.BaseHTTPRequestHandler):
    backends = itertools.cycle([
        'http://localhost:8001',
        'http://localhost:8002',
        'http://localhost:8003'
    ])
    
    def do_GET(self):
        backend = next(self.backends)
        try:
            response = urllib.request.urlopen(
                f"{backend}{self.path}",
                timeout=5
            )
            self.send_response(response.status)
            self.end_headers()
            self.wfile.write(response.read())
        except Exception as e:
            self.send_error(503, str(e))

if __name__ == '__main__':
    server = http.server.HTTPServer(('', 8080), LoadBalancer)
    server.serve_forever()
\`\`\`

## Features to Add

- Health checks
- Weighted round-robin
- Least connections
- Circuit breaker
`,
    },

    'step-3-4-3': {
        title: 'Project P12: LRU Cache',
        content: `# Project P12: LRU Cache

Build cache with O(1) operations.

## Implementation

\`\`\`python
class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> node
        self.head = Node(0, 0)  # dummy head
        self.tail = Node(0, 0)  # dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]
    
    def _add(self, node):
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node
    
    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = self.next = None
\`\`\`

## Key: O(1) for all operations

- HashMap for O(1) lookup
- Doubly linked list for O(1) eviction
`,
    },
};

/**
 * Act 3: System Design - Step Content
 * Distributed Systems, Scalability, Design Case Studies
 */

export const act3Content: Record<string, { title: string; content: string }> = {
    // Step 3-1-1: CAP Theorem
    'step-3-1-1': {
        title: 'CAP Theorem & Trade-offs',
        content: `# CAP Theorem & Trade-offs

## Why This Matters

CAP theorem is the **fundamental constraint** of distributed systems. Understanding it helps you:

- Make **informed architectural decisions**
- Explain trade-offs in **system design interviews**
- Choose the right **database** for your use case
- Design systems that **fail gracefully**

---

## The CAP Theorem

\`\`\`mermaid
flowchart TB
    subgraph cap["CAP Triangle"]
        C["Consistency"]
        A["Availability"]
        P["Partition Tolerance"]
    end
    C --- CP["CP Systems"]
    A --- AP["AP Systems"]
    C --- A
    P --- CP
    P --- AP
\`\`\`

> **"You can only guarantee 2 of 3 properties at once."**

---

## The Three Properties

| Property | Definition | Example |
|----------|------------|---------|
| **Consistency** | All nodes see the same data at the same time | Bank balance is the same everywhere |
| **Availability** | Every request gets a response (success or failure) | System always responds, even if stale |
| **Partition Tolerance** | System works despite network failures | Datacenter connectivity loss |

---

## Why Can't We Have All Three?

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant Node_A
    participant Node_B
    
    Note over Node_A,Node_B: Network Partition!
    Client->>Node_A: Write x=5
    Node_A--xNode_B: Cannot replicate
    Client->>Node_B: Read x
    Note over Node_B: What to return?
    alt Choose Consistency (CP)
        Node_B-->>Client: Error: Unavailable
    else Choose Availability (AP)
        Node_B-->>Client: x = old_value (stale)
    end
\`\`\`

**During a partition, you must choose**:
- **Consistency**: Reject requests until partition heals
- **Availability**: Serve potentially stale data

---

## Real-World Trade-offs

### CP Systems (Consistency + Partition Tolerance)

| System | Use Case |
|--------|----------|
| **MongoDB** | Primary reads, financial data |
| **HBase** | Strong consistency analytics |
| **Zookeeper** | Distributed coordination |
| **etcd** | Configuration management |

\`\`\`python
# CP behavior during partition
try:
    result = db.read("balance", consistency="strong")
except PartitionError:
    # Reject request rather than serve stale data
    raise UnavailableError("Cannot guarantee consistency")
\`\`\`

### AP Systems (Availability + Partition Tolerance)

| System | Use Case |
|--------|----------|
| **Cassandra** | Time-series, IoT data |
| **DynamoDB** | Shopping carts, user preferences |
| **CouchDB** | Mobile offline-first |
| **Riak** | Session storage |

\`\`\`python
# AP behavior during partition
result = db.read("likes_count", consistency="eventual")
# May return stale data, but ALWAYS returns something
\`\`\`

---

## PACELC: Beyond CAP

CAP only describes partition scenarios. PACELC extends this:

> **In case of Partition: choose A or C. Else, choose Latency or Consistency.**

| System | Partition | Else |
|--------|-----------|------|
| DynamoDB | PA | EL (low latency) |
| MongoDB | PC | EC (consistency) |
| Cassandra | PA | EL (tunable) |

\`\`\`python
# Cassandra allows tuning per-query
session.execute(
    "SELECT * FROM users WHERE id = ?",
    [user_id],
    consistency_level=ConsistencyLevel.QUORUM  # Trade latency for consistency
)
\`\`\`

---

## Design Scenarios

| Scenario | Choice | Why |
|----------|--------|-----|
| **Banking** | CP | Wrong balance = lawsuits |
| **Social media feed** | AP | Stale likes count is OK |
| **Inventory** | CP | Overselling = bad |
| **User sessions** | AP | Availability > perfect consistency |
| **Stock trading** | CP | Must be accurate |
| **Product catalog** | AP | Stale price briefly OK |

---

## Interview Insights 💡

**Common Questions**:
1. "What is CAP theorem?"
2. "Is Cassandra CP or AP?"
3. "How would you choose between consistency and availability?"
4. "What's the difference between CA and CP?"

**Key Talking Points**:
- Partitions WILL happen in distributed systems
- CA systems don't exist at scale (single node = not distributed)
- Most systems are AP with tunable consistency
- Think about failure modes, not just happy path

**Red Flags**:
- Saying you can have all three
- Not understanding partition tolerance is mandatory
- Can't give examples of CP vs AP systems

---

## Key Takeaways

✅ **CAP**: Pick 2 of Consistency, Availability, Partition Tolerance  
✅ **Partitions are unavoidable** in distributed systems  
✅ **CP**: Sacrifice availability for correctness (banks)  
✅ **AP**: Sacrifice consistency for responsiveness (social media)  
✅ **PACELC** extends CAP to cover non-partition scenarios  
✅ Choose based on **business requirements**, not technology
`,
    },

    // Step 3-1-2: Consistency Models
    'step-3-1-2': {
        title: 'Consistency Models',
        content: `# Consistency Models

## Why This Matters

Consistency models define **when data becomes visible** across a distributed system. Understanding them helps you:

- Choose the right **database configuration**
- Design systems with **predictable behavior**
- Balance **correctness vs performance**
- Answer system design questions about **data guarantees**

---

## The Consistency Spectrum

\`\`\`mermaid
flowchart LR
    subgraph spectrum["Consistency Spectrum"]
        L["Linearizable"]
        S["Sequential"]
        C["Causal"]
        E["Eventual"]
    end
    L -->|"slower"| S -->|"faster"| C -->|"fastest"| E
\`\`\`

| Model | Guarantee | Latency | Use Case |
|-------|-----------|---------|----------|
| **Linearizable** | Real-time ordering | Highest | Distributed locks |
| **Sequential** | Global order exists | High | Bank transfers |
| **Causal** | Cause → effect ordering | Medium | Social feeds |
| **Eventual** | Eventually consistent | Lowest | Like counts |

---

## Strong Consistency (Linearizable)

> Every read returns the most recent write, globally ordered.

\`\`\`mermaid
sequenceDiagram
    participant C1 as Client 1
    participant P as Primary
    participant R1 as Replica 1
    participant R2 as Replica 2
    
    C1->>P: Write x=5
    P->>R1: Replicate x=5
    P->>R2: Replicate x=5
    Note over P,R2: Wait for ACK
    P-->>C1: Success
    Note over P,R2: All nodes have x=5
\`\`\`

\`\`\`python
# Strong consistency - wait for all replicas
def write(key, value):
    primary.write(key, value)
    for replica in replicas:
        replica.sync_write(key, value)  # Synchronous!
    return "success"

# Any read sees latest write
def read(key):
    return any_node.read(key)  # Always returns latest
\`\`\`

**Use for**: Banking, inventory, any data that MUST be correct

---

## Eventual Consistency

> Given enough time, all replicas converge to the same value.

\`\`\`mermaid
sequenceDiagram
    participant C1 as Client 1
    participant C2 as Client 2
    participant A as Node A
    participant B as Node B
    
    C1->>A: Write x=5
    A-->>C1: Success
    Note over A,B: Async replication
    C2->>B: Read x
    B-->>C2: x=old_value
    Note over A,B: Time passes...
    A->>B: Replicate x=5
    C2->>B: Read x
    B-->>C2: x=5
\`\`\`

\`\`\`python
# Eventual consistency - async replication
def write(key, value):
    local_node.write(key, value)
    queue.async_replicate(key, value)  # Background
    return "success"  # Returns immediately!

# May see stale data
def read(key):
    return local_node.read(key)  # May be behind
\`\`\`

**Use for**: Social media likes, view counts, shopping carts

---

## Practical Consistency Guarantees

### Read Your Own Writes

\`\`\`python
# Client always sees their own writes
session.write("profile", {"name": "Alice"})
profile = session.read("profile")  # Guaranteed: {"name": "Alice"}
\`\`\`

### Monotonic Reads

\`\`\`python
# Once you see X, you won't see older values
# T1: read("balance") → 100
# T2: read("balance") → 150
# T3: read("balance") → ??? (never returns 100 again)
\`\`\`

### Monotonic Writes

\`\`\`python
# Writes from same client are applied in order
session.write("x", 1)
session.write("x", 2)
session.write("x", 3)
# All replicas eventually see: 1 → 2 → 3, never 1 → 3 → 2
\`\`\`

---

## Quorum Consistency

\`\`\`python
# N = total replicas, W = write quorum, R = read quorum
# Strong consistency: W + R > N

N = 5  # 5 replicas
W = 3  # Write to 3
R = 3  # Read from 3
# W + R = 6 > 5 → Guaranteed to overlap!

def quorum_write(key, value):
    acks = 0
    for replica in replicas:
        if replica.write(key, value):
            acks += 1
            if acks >= W:
                return "success"
    raise WriteFailure()

def quorum_read(key):
    responses = []
    for replica in replicas:
        responses.append(replica.read(key))
        if len(responses) >= R:
            return max(responses, key=lambda r: r.timestamp)
\`\`\`

---

## When to Use What?

| Scenario | Consistency | Why |
|----------|-------------|-----|
| Bank balance | Linearizable | Must be correct |
| Distributed lock | Linearizable | Race conditions |
| Social feed | Causal | Order matters |
| Like counter | Eventual | Accuracy can lag |
| Shopping cart | Read-your-writes | Own items visible |
| DNS | Eventual | TTL-based caching |

---

## Interview Insights 💡

**Common Questions**:
1. "What's the difference between strong and eventual consistency?"
2. "How does quorum work?"
3. "When would you choose eventual over strong consistency?"

**Key Talking Points**:
- Strong consistency has latency cost (wait for replication)
- Eventual is not eventual chaos - bounded by anti-entropy
- Most apps need mix of consistency levels per operation

**Red Flags**:
- Can't explain the latency trade-off
- Thinking eventual means "random"
- Not knowing about quorum

---

## Key Takeaways

✅ **Linearizable**: Strongest, slowest - for critical data  
✅ **Eventual**: Weakest, fastest - for less critical data  
✅ **Read-your-writes**: Most common practical need  
✅ **Quorum**: W + R > N for strong consistency  
✅ Choose consistency **per operation**, not per system
`,
    },

    // Step 3-1-3: Replication & Partitioning
    'step-3-1-3': {
        title: 'Replication & Partitioning',
        content: `# Replication & Partitioning

## Why This Matters

Replication and partitioning are the **two pillars of distributed data scaling**:

- **Replication**: Copies data for fault tolerance and read scaling
- **Partitioning** (Sharding): Splits data for write scaling and capacity

Understanding these helps you design systems that handle **millions of users**.

---

## Replication Strategies

\`\`\`mermaid
flowchart LR
    subgraph leader["Leader-Follower"]
        L["Leader"]
        F1["Follower 1"]
        F2["Follower 2"]
    end
    L -->|"sync/async"| F1
    L -->|"sync/async"| F2
\`\`\`

### Leader-Follower (Primary-Replica)

\`\`\`python
class LeaderFollowerDB:
    def __init__(self, leader, followers):
        self.leader = leader
        self.followers = followers
    
    def write(self, key, value):
        # All writes go to leader
        self.leader.write(key, value)
        # Replicate to followers (sync or async)
        for f in self.followers:
            f.replicate(key, value)
    
    def read(self, key):
        # Reads can go to any node
        return random.choice([self.leader] + self.followers).read(key)
\`\`\`

**Use for**: Most read-heavy workloads (MySQL, PostgreSQL, MongoDB)

### Multi-Leader

\`\`\`mermaid
flowchart LR
    L1["Leader DC1"] <-->|"bidirectional"| L2["Leader DC2"]
    L1 --> F1["Follower"]
    L2 --> F2["Follower"]
\`\`\`

**Use for**: Multi-datacenter deployments, offline-first apps

**Challenge**: Conflict resolution when same key written in both leaders

\`\`\`python
# Conflict resolution strategies
def resolve_conflict(value1, value2):
    # 1. Last-write-wins (LWW)
    return max(value1, value2, key=lambda v: v.timestamp)
    
    # 2. Merge (for CRDTs)
    return merge(value1, value2)
    
    # 3. Custom logic
    return custom_resolver(value1, value2)
\`\`\`

### Leaderless (Dynamo-style)

\`\`\`python
# Write to W nodes, read from R nodes
# W + R > N ensures overlap

def write(key, value, W=2, N=3):
    successes = 0
    for node in get_nodes_for_key(key, N):
        if node.write(key, value):
            successes += 1
    return successes >= W

def read(key, R=2, N=3):
    responses = []
    for node in get_nodes_for_key(key, N):
        responses.append(node.read(key))
        if len(responses) >= R:
            # Return most recent version
            return max(responses, key=lambda r: r.version)
\`\`\`

**Use for**: Cassandra, DynamoDB, Riak

---

## Partitioning (Sharding)

\`\`\`mermaid
flowchart TB
    R["Router"]
    R --> S1["Shard 1: users A-M"]
    R --> S2["Shard 2: users N-Z"]
    R --> S3["Shard 3: users 0-9"]
\`\`\`

### Hash Partitioning

\`\`\`python
def get_shard(key, num_shards):
    # Deterministic: same key always maps to same shard
    return hash(key) % num_shards

# Problem: Adding a shard redistributes ALL keys!
# Before: hash("user_123") % 3 = 1
# After:  hash("user_123") % 4 = 3  # Different shard!
\`\`\`

### Consistent Hashing ⭐

\`\`\`mermaid
flowchart TB
    subgraph ring["Hash Ring 0-360°"]
        N1["Node A @ 45°"]
        N2["Node B @ 180°"]
        N3["Node C @ 270°"]
    end
\`\`\`

\`\`\`python
class ConsistentHash:
    def __init__(self, nodes, virtual_nodes=100):
        self.ring = sorteddict()
        for node in nodes:
            for i in range(virtual_nodes):
                key = hash(f"{node}:{i}")
                self.ring[key] = node
    
    def get_node(self, key):
        key_hash = hash(key)
        # Find first node clockwise from key's position
        for node_hash in self.ring:
            if node_hash >= key_hash:
                return self.ring[node_hash]
        # Wrap around
        return self.ring[next(iter(self.ring))]
    
    def add_node(self, node, virtual_nodes=100):
        # Only ~1/N keys need to move!
        for i in range(virtual_nodes):
            self.ring[hash(f"{node}:{i}")] = node
\`\`\`

**Key benefit**: Adding/removing nodes only moves ~1/N keys (not all!)

---

## Replication + Partitioning

\`\`\`mermaid
flowchart TB
    subgraph cluster["Combined Strategy"]
        subgraph s1["Shard 1"]
            P1["Primary"]
            R1a["Replica"]
            R1b["Replica"]
        end
        subgraph s2["Shard 2"]
            P2["Primary"]
            R2a["Replica"]
            R2b["Replica"]
        end
    end
\`\`\`

\`\`\`python
# Real-world: Each shard is replicated
class ShardedReplicatedDB:
    def __init__(self, num_shards, replication_factor):
        self.shards = []
        for i in range(num_shards):
            shard = ReplicatedCluster(replication_factor)
            self.shards.append(shard)
    
    def write(self, key, value):
        shard = self.get_shard(key)
        return shard.write(key, value)  # Writes to replicas
\`\`\`

---

## Common Problems

| Problem | Cause | Solution |
|---------|-------|----------|
| **Hotspots** | Uneven key distribution | Better hash function, salting |
| **Cross-shard queries** | Data in multiple shards | Denormalization, scatter-gather |
| **Rebalancing** | Adding/removing shards | Consistent hashing |
| **Replication lag** | Async replication | Sync replication (slower) |

---

## Interview Insights 💡

**Common Questions**:
1. "How would you shard a database?"
2. "What is consistent hashing?"
3. "Leader vs leaderless replication?"

**Key Talking Points**:
- Consistent hashing is used by DynamoDB, Cassandra, CDNs
- Sharding key choice is critical (avoid hotspots)
- Replication factor of 3 is standard

**Red Flags**:
- Not knowing about consistent hashing
- Forgetting about cross-shard query complexity
- Not considering rebalancing during growth

---

## Key Takeaways

✅ **Replication**: Copies for fault tolerance and read scaling  
✅ **Partitioning**: Splits for write scaling and capacity  
✅ **Consistent hashing**: Minimal redistribution on node changes  
✅ **Combine both**: Each shard is replicated in production  
✅ Watch for **hotspots** and **cross-shard queries**
`,
    },

    // Step 3-2-1: Load Balancing
    'step-3-2-1': {
        title: 'Load Balancing',
        content: `# Load Balancing

## Why This Matters

Load balancing is **essential for horizontal scaling**. Understanding it helps you:

- Design systems that handle **millions of requests**
- Achieve **high availability** (no single point of failure)
- Implement **zero-downtime deployments**
- Answer system design interview questions

---

## Load Balancer Architecture

\`\`\`mermaid
flowchart TB
    C1["Client 1"] --> LB["Load Balancer"]
    C2["Client 2"] --> LB
    C3["Client 3"] --> LB
    LB --> S1["Server 1"]
    LB --> S2["Server 2"]
    LB --> S3["Server 3"]
\`\`\`

---

## Load Balancing Algorithms

| Algorithm | How It Works | Best For |
|-----------|--------------|----------|
| **Round Robin** | Rotate through servers sequentially | Equal-capacity servers |
| **Weighted Round Robin** | More requests to higher-weight servers | Mixed-capacity servers |
| **Least Connections** | Send to server with fewest active connections | Long-lived connections |
| **IP Hash** | Hash client IP to pick server | Session affinity |
| **Random** | Random server selection | Simple, good distribution |

\`\`\`python
class LoadBalancer:
    def __init__(self, servers):
        self.servers = servers
        self.current = 0
    
    # Round Robin
    def round_robin(self):
        server = self.servers[self.current]
        self.current = (self.current + 1) % len(self.servers)
        return server
    
    # Least Connections
    def least_connections(self):
        return min(self.servers, key=lambda s: s.active_connections)
    
    # Weighted Random
    def weighted_random(self):
        total = sum(s.weight for s in self.servers)
        r = random.uniform(0, total)
        cumulative = 0
        for server in self.servers:
            cumulative += server.weight
            if r <= cumulative:
                return server
\`\`\`

---

## Layer 4 vs Layer 7

\`\`\`mermaid
flowchart LR
    subgraph l4["Layer 4 (Transport)"]
        L4["Routes by IP/Port"]
    end
    subgraph l7["Layer 7 (Application)"]
        L7["Routes by HTTP content"]
    end
\`\`\`

| Feature | Layer 4 | Layer 7 |
|---------|---------|---------|
| **Speed** | Faster (fewer bytes inspected) | Slower |
| **Flexibility** | Limited | Route by URL, headers, cookies |
| **SSL Termination** | No | Yes |
| **Use Case** | TCP/UDP traffic | HTTP/HTTPS traffic |

\`\`\`nginx
# Layer 7 routing example (nginx)
upstream api_servers {
    server api1:8080;
    server api2:8080;
}

upstream static_servers {
    server static1:80;
    server static2:80;
}

server {
    location /api/ {
        proxy_pass http://api_servers;
    }
    location /static/ {
        proxy_pass http://static_servers;
    }
}
\`\`\`

---

## Health Checks

\`\`\`mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant S1 as Server 1
    participant S2 as Server 2
    participant S3 as Server 3
    
    loop Every 10s
        LB->>S1: GET /health
        S1-->>LB: 200 OK
        LB->>S2: GET /health
        S2-->>LB: 200 OK
        LB->>S3: GET /health
        S3--xLB: Timeout
        Note over LB,S3: Remove S3 from pool
    end
\`\`\`

\`\`\`python
class HealthChecker:
    def __init__(self, servers, interval=10):
        self.servers = servers
        self.healthy = set(servers)
    
    async def check_health(self, server):
        try:
            response = await httpx.get(
                f"http://{server}/health",
                timeout=5.0
            )
            return response.status_code == 200
        except:
            return False
    
    async def run(self):
        while True:
            for server in self.servers:
                if await self.check_health(server):
                    self.healthy.add(server)
                else:
                    self.healthy.discard(server)
                    alert(f"Server {server} unhealthy!")
            await asyncio.sleep(10)
\`\`\`

---

## Session Affinity (Sticky Sessions)

\`\`\`mermaid
flowchart LR
    U1["User A"] --> LB["Load Balancer"]
    U2["User B"] --> LB
    LB -->|"Always"| S1["Server 1"]
    LB -->|"Always"| S2["Server 2"]
\`\`\`

**When needed**: Stateful applications, shopping carts, WebSockets

**Problem**: Limits scalability - what if Server 1 dies?

**Better solution**: Externalize session state (Redis)

---

## Global Load Balancing

\`\`\`mermaid
flowchart TB
    subgraph dns["DNS-based GLB"]
        D["DNS: api.example.com"]
    end
    D -->|"US users"| US["US Region"]
    D -->|"EU users"| EU["EU Region"]
    D -->|"Asia users"| ASIA["Asia Region"]
\`\`\`

| Method | How | Pros | Cons |
|--------|-----|------|------|
| **GeoDNS** | Return nearest datacenter IP | Simple | DNS caching issues |
| **Anycast** | Same IP, routed by network | Fast failover | Complex setup |
| **Global LB** | AWS ALB, Cloudflare | Full control | Cost |

---

## Interview Insights 💡

**Common Questions**:
1. "How would you load balance 1M requests/second?"
2. "What happens when a server dies?"
3. "Layer 4 vs Layer 7?"

**Key Talking Points**:
- Multiple LB instances for HA (no SPOF)
- Health checks with graceful degradation
- L7 for HTTP, L4 for raw throughput

**Red Flags**:
- Single load balancer (SPOF)
- Not mentioning health checks
- Not knowing L4 vs L7 difference

---

## Key Takeaways

✅ **Round robin** for simple cases, **least connections** for varied load  
✅ **Layer 7** for HTTP routing flexibility  
✅ **Health checks** are mandatory - remove unhealthy servers  
✅ **Avoid sticky sessions** - externalize state  
✅ Use **multiple LBs** to avoid single point of failure
`,
    },

    // Step 3-2-2: Caching Strategies
    'step-3-2-2': {
        title: 'Caching Strategies',
        content: `# Caching Strategies

## Why This Matters

Caching can **10-100x your read performance**. Understanding it helps you:

- Reduce **database load** dramatically
- Lower **response latency** to milliseconds
- Design **cost-effective** systems
- Handle **traffic spikes** gracefully

---

## Cache Architecture

\`\`\`mermaid
flowchart LR
    C["Client"] --> App["Application"]
    App --> Cache["Cache (Redis)"]
    Cache -->|"Hit"| App
    App -->|"Miss"| DB["Database"]
    DB --> App
    App -->|"Populate"| Cache
\`\`\`

---

## Cache Patterns

### Cache-Aside (Lazy Loading) ⭐

Most common pattern - application manages cache.

\`\`\`python
def get_user(user_id: str) -> dict:
    cache_key = f"user:{user_id}"
    
    # 1. Check cache first
    cached = cache.get(cache_key)
    if cached:
        return cached  # Cache HIT
    
    # 2. Cache MISS - fetch from DB
    user = db.query("SELECT * FROM users WHERE id = ?", user_id)
    
    # 3. Populate cache for next time
    cache.set(cache_key, user, ttl=3600)  # 1 hour
    
    return user
\`\`\`

**Pros**: Only caches what's needed  
**Cons**: First request always slow (cache miss)

### Write-Through

Write to cache AND database together.

\`\`\`python
def update_user(user_id: str, data: dict):
    cache_key = f"user:{user_id}"
    
    # Write to DB
    db.update("UPDATE users SET ... WHERE id = ?", data, user_id)
    
    # Update cache immediately
    cache.set(cache_key, data)
\`\`\`

**Pros**: Cache always consistent  
**Cons**: Write latency (two writes)

### Write-Behind (Write-Back)

Write to cache first, async to database.

\`\`\`python
def update_user(user_id: str, data: dict):
    cache_key = f"user:{user_id}"
    
    # Write to cache immediately
    cache.set(cache_key, data)
    
    # Queue async DB write
    queue.enqueue(lambda: db.update(...))
    
    return  # Return immediately!
\`\`\`

**Pros**: Fastest writes  
**Cons**: Data loss risk if cache fails

---

## Cache Problems and Solutions

### 1. Thundering Herd

When cache expires, all requests hit DB simultaneously.

\`\`\`mermaid
sequenceDiagram
    participant C1 as Client 1
    participant C2 as Client 2
    participant C3 as Client 3
    participant Cache
    participant DB
    
    Note over Cache: TTL expires!
    C1->>Cache: Get user:123
    Cache-->>C1: MISS
    C2->>Cache: Get user:123
    Cache-->>C2: MISS
    C3->>Cache: Get user:123
    Cache-->>C3: MISS
    C1->>DB: SELECT user 123
    C2->>DB: SELECT user 123
    C3->>DB: SELECT user 123
    Note over DB: 3 identical queries!
\`\`\`

**Solution**: Locking or staggered TTL

\`\`\`python
def get_user_with_lock(user_id):
    cache_key = f"user:{user_id}"
    lock_key = f"lock:{cache_key}"
    
    cached = cache.get(cache_key)
    if cached:
        return cached
    
    # Try to acquire lock
    if cache.setnx(lock_key, 1, ttl=5):
        try:
            user = db.query(...)
            cache.set(cache_key, user, ttl=3600)
            return user
        finally:
            cache.delete(lock_key)
    else:
        # Another process is fetching, wait and retry
        time.sleep(0.1)
        return get_user_with_lock(user_id)
\`\`\`

### 2. Cache Stampede Prevention

Stagger TTLs to prevent mass expiration.

\`\`\`python
def set_with_jitter(key, value, base_ttl=3600):
    # Add random 0-10% to TTL
    jitter = random.uniform(0, 0.1) * base_ttl
    cache.set(key, value, ttl=base_ttl + jitter)
\`\`\`

---

## Eviction Policies

| Policy | Description | Best For |
|--------|-------------|----------|
| **LRU** | Least Recently Used | General purpose |
| **LFU** | Least Frequently Used | Static hotspots |
| **TTL** | Time-based expiration | Session data |
| **FIFO** | First In First Out | Simple queue |

\`\`\`python
# Redis eviction config
# maxmemory-policy allkeys-lru
\`\`\`

---

## Multi-Level Caching

\`\`\`mermaid
flowchart LR
    App["Application"]
    L1["L1: In-Memory (μs)"]
    L2["L2: Redis (ms)"]
    DB["Database (10ms+)"]
    
    App --> L1
    L1 -->|"Miss"| L2
    L2 -->|"Miss"| DB
\`\`\`

\`\`\`python
class MultiLevelCache:
    def __init__(self):
        self.l1 = {}  # In-memory
        self.l2 = redis.Redis()  # Redis
    
    def get(self, key):
        # Check L1 first
        if key in self.l1:
            return self.l1[key]
        
        # Check L2
        value = self.l2.get(key)
        if value:
            self.l1[key] = value  # Promote to L1
            return value
        
        return None
\`\`\`

---

## Cache Invalidation Strategies

> "There are only two hard things in CS: cache invalidation and naming things."

| Strategy | How | Use Case |
|----------|-----|----------|
| **TTL-based** | Let it expire | Read-heavy, stale OK |
| **Write-through** | Update on write | Consistency needed |
| **Event-based** | Pub/sub invalidation | Distributed systems |
| **Tag-based** | Group invalidation | Related data |

---

## Interview Insights 💡

**Common Questions**:
1. "How do you handle cache invalidation?"
2. "What's the thundering herd problem?"
3. "Redis vs Memcached?"

**Key Talking Points**:
- Cache-aside for most use cases
- TTL + invalidation on write for consistency
- Multi-level caching for ultra-low latency

**Red Flags**:
- Not mentioning cache invalidation
- Not knowing thundering herd
- Forgetting about TTL

---

## Key Takeaways

✅ **Cache-aside** is the most common pattern  
✅ **TTL + write invalidation** for consistency  
✅ **Lock or queue** to prevent thundering herd  
✅ **Multi-level caching** for lowest latency  
✅ Redis for most use cases, Memcached for simplicity
`,
    },

    // Step 3-2-3: Message Queues
    'step-3-2-3': {
        title: 'Message Queues',
        content: `# Message Queues

## Why This Matters

Message queues are the **backbone of scalable microservices**. They help you:

- **Decouple** services for independent scaling
- **Buffer** traffic spikes without dropping requests
- Enable **async processing** for better UX
- Achieve **reliability** with retry mechanisms

---

## Queue vs Pub/Sub

\`\`\`mermaid
flowchart TB
    subgraph queue["Queue (Point-to-Point)"]
        P1["Producer"] --> Q["Queue"]
        Q --> C1["Consumer 1"]
        Q --> C2["Consumer 2"]
    end
\`\`\`

\`\`\`mermaid
flowchart TB
    subgraph pubsub["Pub/Sub (Broadcast)"]
        Pub["Publisher"] --> T["Topic"]
        T --> S1["Subscriber A"]
        T --> S2["Subscriber B"]
        T --> S3["Subscriber C"]
    end
\`\`\`

| Pattern | Message Goes To | Use Case |
|---------|-----------------|----------|
| **Queue** | ONE consumer (load balanced) | Task processing |
| **Pub/Sub** | ALL subscribers | Event broadcasting |

---

## Common Use Cases

\`\`\`mermaid
sequenceDiagram
    participant User
    participant API
    participant Queue
    participant Worker
    participant Email
    
    User->>API: POST /orders
    API->>Queue: Order Created Event
    API-->>User: 201 Created (immediate)
    Note over Queue,Worker: Async processing
    Queue->>Worker: Process Order
    Worker->>Email: Send confirmation
\`\`\`

**Examples**:
- Email/notification sending
- Image/video processing
- Data pipeline ingestion
- Scheduled job processing

---

## Producer/Consumer Pattern

\`\`\`python
import json
from redis import Redis

redis = Redis()

# PRODUCER: Enqueue tasks
def enqueue_task(task_type: str, data: dict):
    task = json.dumps({"type": task_type, "data": data})
    redis.lpush("task_queue", task)
    print(f"Enqueued: {task_type}")

# CONSUMER: Process tasks
def worker():
    while True:
        # Blocking pop - waits for messages
        _, task_json = redis.brpop("task_queue")
        task = json.loads(task_json)
        
        try:
            process_task(task)
            print(f"Completed: {task['type']}")
        except Exception as e:
            # Re-queue failed tasks
            redis.lpush("failed_queue", task_json)
            print(f"Failed: {task['type']} - {e}")

def process_task(task):
    if task["type"] == "send_email":
        send_email(task["data"])
    elif task["type"] == "process_image":
        resize_image(task["data"])
\`\`\`

---

## Delivery Guarantees

| Guarantee | Description | Implementation |
|-----------|-------------|----------------|
| **At-most-once** | May lose messages | Fire and forget |
| **At-least-once** | May duplicate | Ack after processing |
| **Exactly-once** | No loss, no duplicates | Idempotency + transactions |

\`\`\`python
# At-least-once with acknowledgment
def reliable_consumer():
    while True:
        # Get message but don't remove
        msg = redis.lindex("queue", -1)
        
        try:
            process(msg)
            # Only remove after successful processing
            redis.rpop("queue")
        except:
            # Message stays in queue for retry
            pass
\`\`\`

\`\`\`python
# Exactly-once with idempotency
def idempotent_consumer():
    while True:
        msg = get_message()
        
        # Check if already processed
        if redis.sismember("processed", msg.id):
            continue
        
        process(msg)
        
        # Mark as processed
        redis.sadd("processed", msg.id)
\`\`\`

---

## Queue Technologies Comparison

| Technology | Throughput | Features | Best For |
|------------|------------|----------|----------|
| **Redis** | High | Simple, fast | Basic queues, real-time |
| **RabbitMQ** | Medium | Routing, priorities | Complex workflows |
| **Kafka** | Very High | Persistence, replay | Event streaming |
| **SQS** | High | Managed, scalable | AWS workloads |

---

## Dead Letter Queues

\`\`\`mermaid
flowchart LR
    Q["Main Queue"] --> W["Worker"]
    W -->|"Success"| Done["✓ Done"]
    W -->|"Fail 3x"| DLQ["Dead Letter Queue"]
    DLQ --> Alert["Alert/Manual Review"]
\`\`\`

\`\`\`python
MAX_RETRIES = 3

def consumer_with_dlq():
    while True:
        msg = get_message()
        retries = msg.get("retries", 0)
        
        try:
            process(msg)
        except:
            if retries < MAX_RETRIES:
                msg["retries"] = retries + 1
                requeue(msg)
            else:
                send_to_dlq(msg)
                alert_ops(f"Message failed after {MAX_RETRIES} retries")
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "When would you use a message queue?"
2. "How do you handle failed messages?"
3. "Kafka vs RabbitMQ?"

**Key Talking Points**:
- Queues enable async processing and decoupling
- Dead letter queues for failed message handling
- Kafka for event streaming, RabbitMQ for task queues

**Red Flags**:
- Not knowing delivery guarantees
- No strategy for failed messages
- Not understanding queue vs pub/sub

---

## Key Takeaways

✅ Queues decouple services and enable async processing  
✅ **At-least-once** with idempotency is most practical  
✅ **Dead letter queues** for failed message handling  
✅ Kafka for streaming, RabbitMQ for routing, Redis for simple cases  
✅ Always design for message failure
`,
    },

    // Step 3-2-4: Rate Limiting
    'step-3-2-4': {
        title: 'Rate Limiting',
        content: `# Rate Limiting

## Why This Matters

Rate limiting is **essential API protection**. It helps you:

- **Prevent abuse** (DoS attacks, scraping)
- **Ensure fair usage** across users
- **Protect resources** from overload
- **Enable tiered pricing** (free vs paid)

---

## Rate Limiting Strategies

\`\`\`mermaid
flowchart TB
    subgraph algorithms["Rate Limiting Algorithms"]
        TB["Token Bucket"]
        LB["Leaky Bucket"]
        FW["Fixed Window"]
        SW["Sliding Window"]
    end
\`\`\`

---

## Token Bucket ⭐

Allows bursts up to bucket capacity, then steady rate.

\`\`\`mermaid
flowchart LR
    R["Requests"] --> B["Token Bucket"]
    T["Tokens added at rate R"] --> B
    B -->|"Has token"| A["✓ Allowed"]
    B -->|"Empty"| D["✗ Rejected"]
\`\`\`

\`\`\`python
import time

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity      # Max tokens
        self.tokens = capacity        # Current tokens
        self.refill_rate = refill_rate  # Tokens per second
        self.last_refill = time.time()
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now
    
    def allow_request(self) -> bool:
        self._refill()
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False

# Usage: 100 requests/minute, allow bursts up to 10
limiter = TokenBucket(capacity=10, refill_rate=100/60)

if limiter.allow_request():
    handle_request()
else:
    return 429, "Too Many Requests"
\`\`\`

**Pros**: Allows bursts, simple  
**Cons**: Memory per user

---

## Sliding Window Log

More accurate than fixed windows, prevents boundary issues.

\`\`\`mermaid
flowchart LR
    subgraph window["Sliding 60s Window"]
        R1["Req @ T-55s"]
        R2["Req @ T-30s"]
        R3["Req @ T-10s"]
        R4["Req @ T-0s"]
    end
    R1 -->|"Count = 4"| Check["< 100?"]
\`\`\`

\`\`\`python
import time
import redis

class SlidingWindowLog:
    def __init__(self, redis_client, limit: int, window_seconds: int):
        self.redis = redis_client
        self.limit = limit
        self.window = window_seconds
    
    def is_allowed(self, user_id: str) -> bool:
        key = f"rate:{user_id}"
        now = time.time()
        
        pipeline = self.redis.pipeline()
        
        # Remove old entries outside window
        pipeline.zremrangebyscore(key, 0, now - self.window)
        
        # Count requests in window
        pipeline.zcard(key)
        
        # Add current request
        pipeline.zadd(key, {str(now): now})
        
        # Expire key after window
        pipeline.expire(key, self.window)
        
        results = pipeline.execute()
        request_count = results[1]
        
        return request_count < self.limit

# Usage
limiter = SlidingWindowLog(redis, limit=100, window_seconds=60)

if limiter.is_allowed("user_123"):
    handle_request()
\`\`\`

---

## Sliding Window Counter

Hybrid approach - memory efficient with good accuracy.

\`\`\`python
class SlidingWindowCounter:
    def __init__(self, redis_client, limit: int, window_seconds: int):
        self.redis = redis_client
        self.limit = limit
        self.window = window_seconds
    
    def is_allowed(self, user_id: str) -> bool:
        now = time.time()
        current_window = int(now // self.window)
        previous_window = current_window - 1
        
        # Time elapsed in current window (0.0 to 1.0)
        elapsed_ratio = (now % self.window) / self.window
        
        current_key = f"rate:{user_id}:{current_window}"
        previous_key = f"rate:{user_id}:{previous_window}"
        
        current_count = int(self.redis.get(current_key) or 0)
        previous_count = int(self.redis.get(previous_key) or 0)
        
        # Weighted count
        weighted_count = (
            previous_count * (1 - elapsed_ratio) +
            current_count
        )
        
        if weighted_count < self.limit:
            self.redis.incr(current_key)
            self.redis.expire(current_key, self.window * 2)
            return True
        
        return False
\`\`\`

---

## Distributed Rate Limiting

\`\`\`mermaid
flowchart TB
    C1["Server 1"] --> R["Redis"]
    C2["Server 2"] --> R
    C3["Server 3"] --> R
    R --> D["Centralized Counter"]
\`\`\`

\`\`\`python
# Lua script for atomic rate limiting
RATE_LIMIT_LUA = """
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])

local current = redis.call('GET', key)
if current and tonumber(current) >= limit then
    return 0
end

current = redis.call('INCR', key)
if tonumber(current) == 1 then
    redis.call('EXPIRE', key, window)
end

return 1
"""

def distributed_rate_limit(user_id: str) -> bool:
    return redis.eval(
        RATE_LIMIT_LUA,
        1,
        f"rate:{user_id}",
        100,  # limit
        60    # window
    ) == 1
\`\`\`

---

## HTTP Rate Limit Response

\`\`\`http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1609459260
Retry-After: 60

{
    "error": "rate_limit_exceeded",
    "message": "Too many requests. Please retry after 60 seconds.",
    "retry_after": 60
}
\`\`\`

---

## Algorithm Comparison

| Algorithm | Burst | Memory | Accuracy |
|-----------|-------|--------|----------|
| **Token Bucket** | ✅ Yes | Medium | Good |
| **Leaky Bucket** | ❌ No | Low | Good |
| **Fixed Window** | ⚠️ Edge | Low | Poor |
| **Sliding Log** | ✅ Yes | High | Excellent |
| **Sliding Counter** | ✅ Yes | Low | Good |

---

## Interview Insights 💡

**Common Questions**:
1. "Design a rate limiter for an API"
2. "Token bucket vs sliding window?"
3. "How do you rate limit across multiple servers?"

**Key Talking Points**:
- Token bucket allows bursts, leaky bucket smooths
- Sliding window counter is most practical
- Redis for distributed rate limiting

**Red Flags**:
- Only knowing fixed window
- Not considering distributed scenario
- Forgetting to return proper 429 response

---

## Key Takeaways

✅ **Token bucket** for burst-friendly limits  
✅ **Sliding window counter** for accuracy + efficiency  
✅ Use **Redis** for distributed rate limiting  
✅ Always return **429 with Retry-After header**  
✅ Rate limit by **user ID, API key, or IP**
`,
    },

    // Step 3-3-1 through 3-3-3: Design Case Studies
    'step-3-3-1': {
        title: 'URL Shortener',
        content: `# URL Shortener Design

## The Problem

Design a URL shortening service like bit.ly or TinyURL.

---

## Step 1: Requirements Clarification

### Functional Requirements
- Shorten long URLs → short URLs
- Redirect short URLs → original URLs
- Custom aliases (optional)
- Analytics (click counts, optional)

### Non-Functional Requirements
- **High availability** (always works)
- **Low latency** (<100ms redirect)
- **Scalability** (100M URLs/month)

### Capacity Estimation

\`\`\`
Writes: 100M URLs/month = ~40 URLs/second
Reads:  10:1 ratio = 400 redirects/second

Storage (5 years):
- 100M × 12 × 5 = 6B URLs
- ~500 bytes/URL = 3TB storage
\`\`\`

---

## Step 2: System Design

\`\`\`mermaid
flowchart TB
    C["Clients"] --> LB["Load Balancer"]
    LB --> API1["API Server"]
    LB --> API2["API Server"]
    API1 --> Cache["Redis Cache"]
    API2 --> Cache
    API1 --> DB["Database"]
    API2 --> DB
    API1 --> Gen["ID Generator"]
\`\`\`

---

## Step 3: API Design

\`\`\`http
# Create short URL
POST /api/v1/shorten
Content-Type: application/json

{
    "url": "https://example.com/very/long/url/...",
    "custom_alias": "my-link",  // optional
    "expires_at": "2025-12-31"  // optional
}

Response: { "short_url": "https://short.ly/abc123" }

# Redirect
GET /{short_code}
Response: 301 Redirect to original URL

# Analytics (optional)
GET /api/v1/stats/{short_code}
Response: { "clicks": 1234, "created_at": "..." }
\`\`\`

---

## Step 4: Short Code Generation

### Option 1: Base62 Encoding

\`\`\`python
CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode_base62(num: int) -> str:
    if num == 0:
        return CHARS[0]
    
    result = []
    while num > 0:
        result.append(CHARS[num % 62])
        num //= 62
    return ''.join(reversed(result))

def decode_base62(code: str) -> int:
    result = 0
    for char in code:
        result = result * 62 + CHARS.index(char)
    return result

# 7 characters = 62^7 = 3.5 trillion unique codes!
\`\`\`

### Option 2: Counter + Distributed ID

\`\`\`python
class DistributedIDGenerator:
    def __init__(self, machine_id: int):
        self.machine_id = machine_id  # 0-1023
        self.sequence = 0
        self.last_timestamp = 0
    
    def generate(self) -> int:
        # Twitter Snowflake-like ID
        timestamp = int(time.time() * 1000)
        
        if timestamp == self.last_timestamp:
            self.sequence = (self.sequence + 1) & 0xFFF
        else:
            self.sequence = 0
        
        self.last_timestamp = timestamp
        
        # 41 bits timestamp + 10 bits machine + 12 bits sequence
        return (timestamp << 22) | (self.machine_id << 12) | self.sequence
\`\`\`

---

## Step 5: Database Design

\`\`\`sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    click_count BIGINT DEFAULT 0,
    INDEX idx_short_code (short_code)
);
\`\`\`

### Sharding Strategy

\`\`\`python
# Shard by short_code hash
def get_shard(short_code: str, num_shards: int) -> int:
    return hash(short_code) % num_shards
\`\`\`

---

## Step 6: Caching Strategy

\`\`\`python
class URLService:
    def redirect(self, short_code: str) -> str:
        # Check cache first
        cached_url = redis.get(f"url:{short_code}")
        if cached_url:
            # Async increment click count
            queue.enqueue(increment_clicks, short_code)
            return cached_url
        
        # Cache miss - query DB
        url = db.query(
            "SELECT original_url FROM urls WHERE short_code = ?",
            short_code
        )
        
        if url:
            # Cache for 24 hours
            redis.setex(f"url:{short_code}", 86400, url)
            return url
        
        raise NotFoundError()
\`\`\`

---

## Step 7: 301 vs 302 Redirects

| Code | Type | Browser Caches | Use When |
|------|------|----------------|----------|
| **301** | Permanent | Yes | SEO preservation |
| **302** | Temporary | No | Analytics tracking |

---

## Interview Talking Points

1. **Collision handling**: Check DB, regenerate if exists
2. **Rate limiting**: Prevent abuse of creation API
3. **Security**: Validate URLs, prevent malicious redirects
4. **Expiration**: Background job to clean expired URLs
5. **Analytics**: Async click tracking to avoid latency

---

## Key Takeaways

✅ **Base62** encoding for short, readable codes  
✅ **Cache heavily** - redirects are read-heavy  
✅ **301** for SEO, **302** for analytics  
✅ **Shard by short_code** for horizontal scaling  
✅ 7 chars = 3.5 trillion possible URLs
`,
    },

    'step-3-3-2': {
        title: 'Twitter Feed',
        content: `# Twitter Feed Design

## The Problem

Design the home timeline feature for a social network like Twitter.

---

## Step 1: Requirements Clarification

### Functional Requirements
- Post tweets (280 chars, images, videos)
- Follow/unfollow users
- Home timeline (posts from followed users)
- User timeline (user's own posts)

### Non-Functional Requirements
- **Low latency** (<200ms timeline load)
- **High availability** (99.99%)
- **Eventual consistency** acceptable

### Capacity Estimation

\`\`\`
Users: 500M total, 200M DAU
Tweets: 400M tweets/day = ~5000 tweets/second

Timeline reads: 200M × 10 views/day = 2B/day = 23K reads/second

Average followers: 200
Celebrities: 10M+ followers
\`\`\`

---

## Step 2: System Architecture

\`\`\`mermaid
flowchart TB
    C["Clients"] --> LB["Load Balancer"]
    LB --> API["API Servers"]
    API --> TweetService["Tweet Service"]
    API --> TimelineService["Timeline Service"]
    API --> FollowService["Follow Service"]
    TweetService --> TweetDB["Tweet DB"]
    TimelineService --> Cache["Redis Timeline Cache"]
    FollowService --> GraphDB["Follow Graph"]
    TweetService --> Q["Message Queue"]
    Q --> FanoutWorker["Fanout Workers"]
    FanoutWorker --> Cache
\`\`\`

---

## Step 3: Data Models

\`\`\`sql
-- Users
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    follower_count BIGINT DEFAULT 0,
    following_count BIGINT DEFAULT 0,
    created_at TIMESTAMP
);

-- Tweets (sharded by user_id)
CREATE TABLE tweets (
    id BIGINT PRIMARY KEY,  -- Snowflake ID
    user_id BIGINT NOT NULL,
    content TEXT,
    media_urls JSON,
    reply_to_id BIGINT,
    retweet_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    created_at TIMESTAMP,
    INDEX idx_user_created (user_id, created_at DESC)
);

-- Follows (graph)
CREATE TABLE follows (
    follower_id BIGINT,
    followee_id BIGINT,
    created_at TIMESTAMP,
    PRIMARY KEY (follower_id, followee_id),
    INDEX idx_followee (followee_id)
);
\`\`\`

---

## Step 4: The Fan-out Problem ⭐

\`\`\`mermaid
flowchart LR
    subgraph fanout_write["Fan-out on Write"]
        T1["Tweet Posted"] --> W["Write to ALL<br/>followers' timelines"]
    end
    
    subgraph fanout_read["Fan-out on Read"]
        R["Timeline Request"] --> Q["Query ALL<br/>followed users' tweets"]
    end
\`\`\`

### Fan-out on Write (Push Model)

\`\`\`python
async def post_tweet(user_id: int, content: str):
    # 1. Store tweet
    tweet = await tweet_db.insert(user_id, content)
    
    # 2. Get all followers
    followers = await follow_db.get_followers(user_id)
    
    # 3. Push to each follower's timeline cache
    for follower_id in followers:
        await redis.zadd(
            f"timeline:{follower_id}",
            {tweet.id: tweet.created_at}
        )
        # Keep only 800 tweets per timeline
        await redis.zremrangebyrank(f"timeline:{follower_id}", 0, -801)
\`\`\`

**Pros**: Fast reads (O(1) cached)  
**Cons**: Slow writes for celebrities (10M followers = 10M writes!)

### Fan-out on Read (Pull Model)

\`\`\`python
async def get_timeline(user_id: int, page: int = 0):
    # 1. Get followed users
    following = await follow_db.get_following(user_id)
    
    # 2. Fetch recent tweets from each
    tweets = []
    for followee_id in following:
        user_tweets = await tweet_db.get_recent(followee_id, limit=100)
        tweets.extend(user_tweets)
    
    # 3. Sort and paginate
    tweets.sort(key=lambda t: t.created_at, reverse=True)
    return tweets[page*20 : (page+1)*20]
\`\`\`

**Pros**: Fast writes  
**Cons**: Slow reads (query N users, merge results)

### Hybrid Approach ⭐ (Twitter's Solution)

\`\`\`python
CELEBRITY_THRESHOLD = 10000  # followers

async def post_tweet(user_id: int, content: str):
    tweet = await tweet_db.insert(user_id, content)
    
    follower_count = await get_follower_count(user_id)
    
    if follower_count < CELEBRITY_THRESHOLD:
        # Regular user: fan-out on write
        await fanout_to_followers(user_id, tweet)
    else:
        # Celebrity: store in special cache
        await celebrity_tweet_cache.add(user_id, tweet)

async def get_timeline(user_id: int):
    # 1. Get cached timeline (from fan-out on write)
    timeline = await redis.zrevrange(f"timeline:{user_id}", 0, 800)
    
    # 2. Get followed celebrities
    celebrities = await get_followed_celebrities(user_id)
    
    # 3. Fetch and merge celebrity tweets
    for celeb_id in celebrities:
        celeb_tweets = await celebrity_tweet_cache.get(celeb_id)
        timeline = merge_sorted(timeline, celeb_tweets)
    
    return timeline[:800]
\`\`\`

---

## Step 5: Timeline Cache Design

\`\`\`python
# Redis sorted set for timeline
# Score = tweet timestamp, Member = tweet ID

# Add tweet to timeline
redis.zadd("timeline:user123", {tweet_id: timestamp})

# Get latest 20 tweets
tweet_ids = redis.zrevrange("timeline:user123", 0, 19)

# Hydrate with tweet data
tweets = await tweet_db.get_many(tweet_ids)
\`\`\`

---

## Interview Talking Points

1. **Celebrity problem**: Hybrid fan-out is the key insight
2. **Sharding**: Shard tweets by user_id, timelines by user_id
3. **Media**: Store in object storage (S3), CDN for delivery
4. **Ranking**: Can add ML-based relevance scoring
5. **Consistency**: Eventual is fine for social feeds

---

## Key Takeaways

✅ **Hybrid fan-out**: Push for regular users, pull for celebrities  
✅ **Redis sorted sets** for timeline caches  
✅ Timeline is **read-heavy** - cache aggressively  
✅ **Eventual consistency** is acceptable for social feeds  
✅ Shard by **user_id** for both tweets and timelines
`,
    },

    'step-3-3-3': {
        title: 'Chat System',
        content: `# Chat System Design

## The Problem

Design a real-time messaging system like WhatsApp or Slack.

---

## Step 1: Requirements Clarification

### Functional Requirements
- 1:1 messaging
- Group chats (up to 500 members)
- Online presence indicators
- Read receipts / delivery status
- Message history and search
- Push notifications (offline users)

### Non-Functional Requirements
- **Real-time** (<100ms latency)
- **High availability** (99.99%)
- **Message ordering** guaranteed
- **Eventual consistency** acceptable

### Capacity Estimation

\`\`\`
Users: 100M DAU
Messages: 50 messages/user/day = 5B messages/day
           = ~60K messages/second

Message size: ~1KB average
Storage: 5B × 1KB = 5TB/day
\`\`\`

---

## Step 2: System Architecture

\`\`\`mermaid
flowchart TB
    subgraph clients["Clients"]
        C1["Mobile App"]
        C2["Web App"]
    end
    
    C1 & C2 --> LB["Load Balancer"]
    LB --> WS["WebSocket Servers"]
    WS --> Redis["Redis Pub/Sub"]
    WS --> MQ["Message Queue"]
    MQ --> Worker["Message Workers"]
    Worker --> DB["Message DB<br/>(Cassandra)"]
    Worker --> Push["Push Service"]
\`\`\`

---

## Step 3: WebSocket Connection

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant LB as Load Balancer
    participant WS as WebSocket Server
    participant Redis
    
    Client->>LB: HTTP Upgrade Request
    LB->>WS: Route to WS Server
    WS-->>Client: 101 Switching Protocols
    WS->>Redis: Register user:server mapping
    Note over Client,WS: Persistent bidirectional connection
\`\`\`

\`\`\`python
class WebSocketHandler:
    async def on_connect(self, user_id: str, websocket):
        # Store connection locally
        self.connections[user_id] = websocket
        
        # Register in Redis for routing
        await redis.hset(
            "user_connections",
            user_id,
            self.server_id
        )
        
        # Update presence
        await redis.setex(f"presence:{user_id}", 60, "online")
        
        # Notify friends
        await self.broadcast_presence(user_id, "online")
    
    async def on_disconnect(self, user_id: str):
        del self.connections[user_id]
        await redis.hdel("user_connections", user_id)
        await redis.delete(f"presence:{user_id}")
        await self.broadcast_presence(user_id, "offline")
\`\`\`

---

## Step 4: Message Flow

\`\`\`mermaid
sequenceDiagram
    participant A as User A
    participant WS1 as WS Server 1
    participant Redis
    participant WS2 as WS Server 2
    participant B as User B
    participant DB as Database
    
    A->>WS1: Send message to B
    WS1->>DB: Store message (async)
    WS1->>Redis: Lookup B's server
    Redis-->>WS1: B on WS Server 2
    WS1->>Redis: Publish to channel:B
    Redis->>WS2: Message for B
    WS2->>B: Push message
    B-->>WS2: ACK received
    WS2->>DB: Mark as delivered
\`\`\`

\`\`\`python
async def send_message(sender_id: str, recipient_id: str, content: str):
    # 1. Create message with ordering ID
    message = Message(
        id=snowflake.generate(),
        sender_id=sender_id,
        recipient_id=recipient_id,
        content=content,
        status="sent",
        created_at=time.time()
    )
    
    # 2. Store asynchronously
    queue.enqueue(store_message, message)
    
    # 3. Find recipient's WebSocket server
    recipient_server = await redis.hget("user_connections", recipient_id)
    
    if recipient_server:
        # 4a. Online: Route via pub/sub
        await redis.publish(f"channel:{recipient_id}", message.to_json())
    else:
        # 4b. Offline: Queue for push notification
        await push_queue.enqueue(recipient_id, message)
    
    return message
\`\`\`

---

## Step 5: Group Chat

\`\`\`mermaid
flowchart LR
    S["Sender"] --> G["Group Service"]
    G --> M1["Member 1"]
    G --> M2["Member 2"]
    G --> M3["Member 3"]
    G --> M4["...Member N"]
\`\`\`

\`\`\`python
async def send_group_message(sender_id: str, group_id: str, content: str):
    # 1. Get group members
    members = await group_db.get_members(group_id)
    
    # 2. Create message
    message = GroupMessage(
        id=snowflake.generate(),
        group_id=group_id,
        sender_id=sender_id,
        content=content
    )
    
    # 3. Store once
    await message_db.insert(message)
    
    # 4. Fan-out to members
    for member_id in members:
        if member_id != sender_id:
            await redis.publish(f"channel:{member_id}", message.to_json())
\`\`\`

---

## Step 6: Message Status & Read Receipts

\`\`\`
Message States:
  SENT     → Server received
  DELIVERED → Recipient's device received
  READ     → Recipient opened chat
\`\`\`

\`\`\`python
async def handle_ack(user_id: str, message_id: str, ack_type: str):
    if ack_type == "delivered":
        await message_db.update_status(message_id, "delivered")
        
        # Notify sender
        sender_id = await message_db.get_sender(message_id)
        await notify_user(sender_id, {
            "type": "delivery_receipt",
            "message_id": message_id
        })
    
    elif ack_type == "read":
        await message_db.update_status(message_id, "read")
        await redis.publish(f"channel:{sender_id}", {
            "type": "read_receipt",
            "message_id": message_id
        })
\`\`\`

---

## Step 7: Online Presence

\`\`\`python
class PresenceService:
    HEARTBEAT_INTERVAL = 30  # seconds
    PRESENCE_TTL = 60  # seconds
    
    async def heartbeat(self, user_id: str):
        # Update TTL-based presence
        await redis.setex(
            f"presence:{user_id}",
            self.PRESENCE_TTL,
            "online"
        )
    
    async def is_online(self, user_id: str) -> bool:
        return await redis.exists(f"presence:{user_id}")
    
    async def get_bulk_presence(self, user_ids: list) -> dict:
        pipeline = redis.pipeline()
        for uid in user_ids:
            pipeline.exists(f"presence:{uid}")
        results = await pipeline.execute()
        return {uid: bool(r) for uid, r in zip(user_ids, results)}
\`\`\`

---

## Step 8: Database Schema

\`\`\`sql
-- Messages (Cassandra - partitioned by conversation)
CREATE TABLE messages (
    conversation_id UUID,
    message_id BIGINT,  -- Snowflake, for ordering
    sender_id UUID,
    content TEXT,
    status TEXT,  -- sent, delivered, read
    created_at TIMESTAMP,
    PRIMARY KEY (conversation_id, message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);

-- Conversations
CREATE TABLE conversations (
    user_id UUID,
    conversation_id UUID,
    last_message_id BIGINT,
    unread_count INT,
    updated_at TIMESTAMP,
    PRIMARY KEY (user_id, updated_at)
) WITH CLUSTERING ORDER BY (updated_at DESC);
\`\`\`

---

## Interview Talking Points

1. **Connection management**: WebSocket server registry in Redis
2. **Message ordering**: Snowflake IDs guarantee ordering
3. **Scaling WebSockets**: Redis pub/sub for cross-server routing
4. **Offline delivery**: Push notifications + sync on reconnect
5. **End-to-end encryption**: Client-side key exchange

---

## Key Takeaways

✅ **WebSockets** for real-time bidirectional communication  
✅ **Redis pub/sub** for routing between WebSocket servers  
✅ **Snowflake IDs** for message ordering  
✅ **Cassandra** for message storage (write-heavy, partitioned)  
✅ **TTL-based presence** with heartbeats
`,
    },

    // Step 3-4-1 through 3-4-3: Scale Projects
    'step-3-4-1': {
        title: 'Project P10: Distributed KV Store',
        content: `# Project P10: Distributed Key-Value Store

## Project Overview

Build a simplified distributed key-value store like a mini-DynamoDB or Redis Cluster.

---

## Learning Objectives

- Understand **consistent hashing** for data distribution
- Implement **replication** for fault tolerance
- Handle **node failures** gracefully
- Apply **quorum reads/writes** for consistency

---

## System Architecture

\`\`\`mermaid
flowchart TB
    subgraph cluster["KV Cluster"]
        N1["Node 1"]
        N2["Node 2"]
        N3["Node 3"]
        N4["Node 4"]
    end
    C["Client"] --> R["Router"]
    R --> N1 & N2 & N3 & N4
\`\`\`

---

## Phase 1: Consistent Hash Ring

\`\`\`python
import hashlib
from sortedcontainers import SortedDict

class ConsistentHashRing:
    def __init__(self, virtual_nodes: int = 150):
        self.virtual_nodes = virtual_nodes
        self.ring = SortedDict()  # hash -> node_id
        self.nodes = {}  # node_id -> Node
    
    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)
    
    def add_node(self, node_id: str, node):
        self.nodes[node_id] = node
        for i in range(self.virtual_nodes):
            virtual_key = f"{node_id}:{i}"
            hash_val = self._hash(virtual_key)
            self.ring[hash_val] = node_id
    
    def remove_node(self, node_id: str):
        del self.nodes[node_id]
        for i in range(self.virtual_nodes):
            virtual_key = f"{node_id}:{i}"
            hash_val = self._hash(virtual_key)
            del self.ring[hash_val]
    
    def get_node(self, key: str) -> str:
        if not self.ring:
            raise Exception("No nodes available")
        
        hash_val = self._hash(key)
        
        # Find first node clockwise from key's hash
        idx = self.ring.bisect_left(hash_val)
        if idx >= len(self.ring):
            idx = 0  # Wrap around
        
        node_id = self.ring.peekitem(idx)[1]
        return self.nodes[node_id]
    
    def get_replicas(self, key: str, n: int = 3) -> list:
        """Get N unique nodes for replication."""
        if len(self.nodes) < n:
            return list(self.nodes.values())
        
        hash_val = self._hash(key)
        idx = self.ring.bisect_left(hash_val)
        
        replicas = []
        seen_nodes = set()
        
        for i in range(len(self.ring)):
            pos = (idx + i) % len(self.ring)
            node_id = self.ring.peekitem(pos)[1]
            
            if node_id not in seen_nodes:
                replicas.append(self.nodes[node_id])
                seen_nodes.add(node_id)
                
            if len(replicas) >= n:
                break
        
        return replicas
\`\`\`

---

## Phase 2: KV Node Implementation

\`\`\`python
import threading
from dataclasses import dataclass
from typing import Optional
import time

@dataclass
class Value:
    data: bytes
    timestamp: float
    version: int

class KVNode:
    def __init__(self, node_id: str, host: str, port: int):
        self.node_id = node_id
        self.host = host
        self.port = port
        self.store: dict[str, Value] = {}
        self.lock = threading.RLock()
    
    def put(self, key: str, value: bytes, version: int = 0) -> bool:
        with self.lock:
            current = self.store.get(key)
            
            # Version conflict check
            if current and current.version > version:
                return False  # Stale write
            
            self.store[key] = Value(
                data=value,
                timestamp=time.time(),
                version=version + 1
            )
            return True
    
    def get(self, key: str) -> Optional[Value]:
        with self.lock:
            return self.store.get(key)
    
    def delete(self, key: str) -> bool:
        with self.lock:
            if key in self.store:
                del self.store[key]
                return True
            return False
\`\`\`

---

## Phase 3: Coordinator with Quorum

\`\`\`python
class KVCoordinator:
    def __init__(self, ring: ConsistentHashRing, 
                 replication_factor: int = 3,
                 write_quorum: int = 2,
                 read_quorum: int = 2):
        self.ring = ring
        self.n = replication_factor
        self.w = write_quorum
        self.r = read_quorum
    
    def put(self, key: str, value: bytes) -> bool:
        """Write to W nodes out of N replicas."""
        replicas = self.ring.get_replicas(key, self.n)
        
        successes = 0
        version = 0
        
        for node in replicas:
            try:
                if node.put(key, value, version):
                    successes += 1
            except Exception as e:
                print(f"Write failed to {node.node_id}: {e}")
        
        return successes >= self.w
    
    def get(self, key: str) -> Optional[bytes]:
        """Read from R nodes, return latest version."""
        replicas = self.ring.get_replicas(key, self.n)
        
        responses = []
        
        for node in replicas:
            try:
                result = node.get(key)
                if result:
                    responses.append(result)
            except Exception:
                pass
        
        if len(responses) < self.r:
            raise Exception("Read quorum not met")
        
        # Return value with highest version
        latest = max(responses, key=lambda v: v.version)
        return latest.data
\`\`\`

---

## Phase 4: Add HTTP API

\`\`\`python
from flask import Flask, request, jsonify

app = Flask(__name__)
coordinator = KVCoordinator(ring)

@app.route('/kv/<key>', methods=['GET'])
def get_key(key: str):
    try:
        value = coordinator.get(key)
        if value:
            return jsonify({"key": key, "value": value.decode()})
        return jsonify({"error": "Not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 503

@app.route('/kv/<key>', methods=['PUT'])
def put_key(key: str):
    value = request.get_data()
    if coordinator.put(key, value):
        return jsonify({"status": "ok"})
    return jsonify({"error": "Write failed"}), 503

@app.route('/kv/<key>', methods=['DELETE'])
def delete_key(key: str):
    # Similar pattern with delete quorum
    pass
\`\`\`

---

## Extension Challenges

| Challenge | Description |
|-----------|-------------|
| **Anti-entropy** | Background sync between replicas |
| **Vector clocks** | Track causal ordering |
| **Merkle trees** | Efficient replica comparison |
| **Gossip protocol** | Failure detection |

---

## Testing Your Implementation

\`\`\`python
# Test 1: Basic put/get
coordinator.put("user:123", b"Alice")
assert coordinator.get("user:123") == b"Alice"

# Test 2: Node failure tolerance
ring.remove_node("node-2")
assert coordinator.get("user:123") == b"Alice"  # Still works!

# Test 3: Consistent hashing distribution
keys = [f"key:{i}" for i in range(1000)]
distribution = {}
for key in keys:
    node = ring.get_node(key)
    distribution[node.node_id] = distribution.get(node.node_id, 0) + 1
# Should be ~250 keys per node (even distribution)
\`\`\`

---

## Key Takeaways

✅ **Consistent hashing** minimizes data movement when nodes change  
✅ **Quorum** ensures consistency: W + R > N  
✅ **Virtual nodes** improve load distribution  
✅ Real systems add vector clocks, anti-entropy, gossip
`,
    },

    'step-3-4-2': {
        title: 'Project P11: Load Balancer',
        content: `# Project P11: Load Balancer

## Project Overview

Build a Layer 7 reverse proxy with multiple load balancing algorithms and health checks.

---

## Learning Objectives

- Implement **multiple load balancing algorithms**
- Build **health checking** for backend servers
- Add **circuit breaker** pattern for resilience
- Handle **graceful degradation**

---

## System Architecture

\`\`\`mermaid
flowchart TB
    C["Clients"] --> LB["Load Balancer :8080"]
    LB --> HC["Health Checker"]
    HC --> B1["Backend 1 :8001"]
    HC --> B2["Backend 2 :8002"]
    HC --> B3["Backend 3 :8003"]
    LB --> B1
    LB --> B2
    LB --> B3
\`\`\`

---

## Phase 1: Backend Server Pool

\`\`\`python
from dataclasses import dataclass
from enum import Enum
import threading
import time

class ServerStatus(Enum):
    HEALTHY = "healthy"
    UNHEALTHY = "unhealthy"
    DRAINING = "draining"

@dataclass
class Backend:
    host: str
    port: int
    weight: int = 1
    status: ServerStatus = ServerStatus.HEALTHY
    active_connections: int = 0
    failed_checks: int = 0
    last_check: float = 0
    
    @property
    def url(self) -> str:
        return f"http://{self.host}:{self.port}"
    
    def is_available(self) -> bool:
        return self.status == ServerStatus.HEALTHY

class ServerPool:
    def __init__(self):
        self.backends: list[Backend] = []
        self.lock = threading.RLock()
    
    def add_backend(self, host: str, port: int, weight: int = 1):
        with self.lock:
            self.backends.append(Backend(host, port, weight))
    
    def get_healthy_backends(self) -> list[Backend]:
        with self.lock:
            return [b for b in self.backends if b.is_available()]
    
    def mark_unhealthy(self, backend: Backend):
        with self.lock:
            backend.status = ServerStatus.UNHEALTHY
    
    def mark_healthy(self, backend: Backend):
        with self.lock:
            backend.status = ServerStatus.HEALTHY
            backend.failed_checks = 0
\`\`\`

---

## Phase 2: Load Balancing Algorithms

\`\`\`python
from abc import ABC, abstractmethod
import random

class LoadBalancer(ABC):
    @abstractmethod
    def select(self, pool: ServerPool) -> Backend:
        pass

class RoundRobinLB(LoadBalancer):
    def __init__(self):
        self.index = 0
        self.lock = threading.Lock()
    
    def select(self, pool: ServerPool) -> Backend:
        healthy = pool.get_healthy_backends()
        if not healthy:
            raise Exception("No healthy backends")
        
        with self.lock:
            backend = healthy[self.index % len(healthy)]
            self.index += 1
            return backend

class WeightedRoundRobinLB(LoadBalancer):
    def __init__(self):
        self.current_weight = 0
        self.index = 0
        self.lock = threading.Lock()
    
    def select(self, pool: ServerPool) -> Backend:
        healthy = pool.get_healthy_backends()
        if not healthy:
            raise Exception("No healthy backends")
        
        with self.lock:
            while True:
                self.index = (self.index + 1) % len(healthy)
                if self.index == 0:
                    self.current_weight -= 1
                    if self.current_weight <= 0:
                        self.current_weight = max(b.weight for b in healthy)
                
                if healthy[self.index].weight >= self.current_weight:
                    return healthy[self.index]

class LeastConnectionsLB(LoadBalancer):
    def select(self, pool: ServerPool) -> Backend:
        healthy = pool.get_healthy_backends()
        if not healthy:
            raise Exception("No healthy backends")
        
        return min(healthy, key=lambda b: b.active_connections)

class RandomLB(LoadBalancer):
    def select(self, pool: ServerPool) -> Backend:
        healthy = pool.get_healthy_backends()
        if not healthy:
            raise Exception("No healthy backends")
        return random.choice(healthy)
\`\`\`

---

## Phase 3: Health Checker

\`\`\`python
import asyncio
import httpx

class HealthChecker:
    def __init__(self, pool: ServerPool, 
                 interval: int = 10,
                 timeout: int = 5,
                 unhealthy_threshold: int = 3,
                 healthy_threshold: int = 2):
        self.pool = pool
        self.interval = interval
        self.timeout = timeout
        self.unhealthy_threshold = unhealthy_threshold
        self.healthy_threshold = healthy_threshold
        self.running = False
    
    async def check_backend(self, backend: Backend) -> bool:
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(f"{backend.url}/health")
                return response.status_code == 200
        except:
            return False
    
    async def run_checks(self):
        while self.running:
            for backend in self.pool.backends:
                healthy = await self.check_backend(backend)
                backend.last_check = time.time()
                
                if healthy:
                    if backend.status == ServerStatus.UNHEALTHY:
                        backend.failed_checks = 0
                        if backend.failed_checks <= -self.healthy_threshold:
                            self.pool.mark_healthy(backend)
                            print(f"Backend {backend.url} is now HEALTHY")
                        else:
                            backend.failed_checks -= 1
                else:
                    backend.failed_checks += 1
                    if backend.failed_checks >= self.unhealthy_threshold:
                        self.pool.mark_unhealthy(backend)
                        print(f"Backend {backend.url} is now UNHEALTHY")
            
            await asyncio.sleep(self.interval)
    
    def start(self):
        self.running = True
        asyncio.create_task(self.run_checks())
    
    def stop(self):
        self.running = False
\`\`\`

---

## Phase 4: Proxy Server

\`\`\`python
from aiohttp import web, ClientSession

class ProxyServer:
    def __init__(self, pool: ServerPool, lb: LoadBalancer):
        self.pool = pool
        self.lb = lb
        self.session = None
    
    async def handle_request(self, request: web.Request) -> web.Response:
        try:
            backend = self.lb.select(self.pool)
            backend.active_connections += 1
            
            try:
                target_url = f"{backend.url}{request.path_qs}"
                
                async with self.session.request(
                    method=request.method,
                    url=target_url,
                    headers=dict(request.headers),
                    data=await request.read(),
                    timeout=30
                ) as response:
                    body = await response.read()
                    return web.Response(
                        status=response.status,
                        headers=response.headers,
                        body=body
                    )
            finally:
                backend.active_connections -= 1
                
        except Exception as e:
            return web.Response(status=503, text=f"Service Unavailable: {e}")
    
    async def start(self, host: str = "0.0.0.0", port: int = 8080):
        self.session = ClientSession()
        app = web.Application()
        app.router.add_route("*", "/{path:.*}", self.handle_request)
        
        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, host, port)
        await site.start()
        print(f"Load balancer running on {host}:{port}")
\`\`\`

---

## Phase 5: Circuit Breaker

\`\`\`python
class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5,
                 recovery_timeout: int = 30):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failures: dict[str, int] = {}
        self.open_time: dict[str, float] = {}
    
    def is_open(self, backend_url: str) -> bool:
        if backend_url not in self.open_time:
            return False
        
        # Check if recovery timeout passed
        if time.time() - self.open_time[backend_url] > self.recovery_timeout:
            del self.open_time[backend_url]
            self.failures[backend_url] = 0
            return False
        
        return True
    
    def record_failure(self, backend_url: str):
        self.failures[backend_url] = self.failures.get(backend_url, 0) + 1
        
        if self.failures[backend_url] >= self.failure_threshold:
            self.open_time[backend_url] = time.time()
            print(f"Circuit OPEN for {backend_url}")
    
    def record_success(self, backend_url: str):
        self.failures[backend_url] = 0
        if backend_url in self.open_time:
            del self.open_time[backend_url]
\`\`\`

---

## Extension Challenges

| Challenge | Description |
|-----------|-------------|
| **Sticky sessions** | Route same client to same backend |
| **Rate limiting** | Per-client request limits |
| **Request logging** | Access logs with latency |
| **SSL termination** | Handle HTTPS at LB |

---

## Key Takeaways

✅ **Round robin** for equal servers, **least connections** for varied load  
✅ **Health checks** with configurable thresholds  
✅ **Circuit breaker** prevents cascade failures  
✅ Real LBs add sticky sessions, rate limiting, SSL termination
`,
    },

    'step-3-4-3': {
        title: 'Project P12: LRU Cache',
        content: `# Project P12: LRU Cache

## Project Overview

Build an LRU (Least Recently Used) cache with O(1) get and put operations. This is a classic data structures interview question and foundational for understanding caching systems.

---

## Learning Objectives

- Implement **O(1)** cache operations
- Combine **HashMap + Doubly Linked List**
- Understand **cache eviction policies**
- Extend to **TTL and thread safety**

---

## The Data Structure

\`\`\`mermaid
flowchart LR
    subgraph cache["LRU Cache"]
        HM["HashMap<br/>key → Node"]
        DLL["Doubly Linked List<br/>LRU ← → MRU"]
    end
    HM <--> DLL
\`\`\`

| Operation | HashMap | Linked List | Combined |
|-----------|---------|-------------|----------|
| get | O(1) | O(n) | O(1) |
| put | O(1) | O(1) | O(1) |
| evict | O(1) | O(1) | O(1) |

---

## Phase 1: Basic LRU Cache

\`\`\`python
class Node:
    """Doubly linked list node."""
    def __init__(self, key: int = 0, val: int = 0):
        self.key = key
        self.val = val
        self.prev: Node = None
        self.next: Node = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: dict[int, Node] = {}
        
        # Dummy head and tail for easier boundary handling
        self.head = Node()  # Least recently used
        self.tail = Node()  # Most recently used
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node: Node):
        """Remove node from doubly linked list."""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_tail(self, node: Node):
        """Add node before tail (most recently used)."""
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        
        # Move to end (most recently used)
        self._remove(node)
        self._add_to_tail(node)
        
        return node.val
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update existing
            self._remove(self.cache[key])
        
        node = Node(key, value)
        self._add_to_tail(node)
        self.cache[key] = node
        
        # Evict if over capacity
        if len(self.cache) > self.capacity:
            lru = self.head.next  # Least recently used
            self._remove(lru)
            del self.cache[lru.key]
\`\`\`

---

## Phase 2: Using OrderedDict (Pythonic)

Python's \`OrderedDict\` maintains insertion order and provides \`move_to_end\`:

\`\`\`python
from collections import OrderedDict

class LRUCachePythonic:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = value
        
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest
\`\`\`

---

## Phase 3: Add TTL Support

\`\`\`python
import time
from dataclasses import dataclass

@dataclass
class CacheEntry:
    value: any
    expires_at: float  # Unix timestamp

class LRUCacheWithTTL:
    def __init__(self, capacity: int, default_ttl: int = 3600):
        self.capacity = capacity
        self.default_ttl = default_ttl
        self.cache = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        entry = self.cache[key]
        
        # Check if expired
        if time.time() > entry.expires_at:
            del self.cache[key]
            return -1
        
        # Move to end
        self.cache.move_to_end(key)
        return entry.value
    
    def put(self, key: int, value: int, ttl: int = None) -> None:
        ttl = ttl or self.default_ttl
        expires_at = time.time() + ttl
        
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = CacheEntry(value, expires_at)
        
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
    
    def cleanup_expired(self):
        """Background cleanup of expired entries."""
        now = time.time()
        expired_keys = [
            k for k, v in self.cache.items() 
            if now > v.expires_at
        ]
        for key in expired_keys:
            del self.cache[key]
\`\`\`

---

## Phase 4: Thread-Safe LRU Cache

\`\`\`python
import threading

class ThreadSafeLRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
        self.lock = threading.RLock()
    
    def get(self, key: int) -> int:
        with self.lock:
            if key not in self.cache:
                return -1
            self.cache.move_to_end(key)
            return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        with self.lock:
            if key in self.cache:
                self.cache.move_to_end(key)
            
            self.cache[key] = value
            
            if len(self.cache) > self.capacity:
                self.cache.popitem(last=False)
\`\`\`

---

## Phase 5: LFU Cache (Extension)

Least Frequently Used - evicts based on access count:

\`\`\`python
from collections import defaultdict

class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> value
        self.freq = {}   # key -> frequency
        self.freq_keys = defaultdict(OrderedDict)  # freq -> keys
        self.min_freq = 0
    
    def _update_freq(self, key: int):
        f = self.freq[key]
        self.freq[key] = f + 1
        
        del self.freq_keys[f][key]
        if not self.freq_keys[f] and f == self.min_freq:
            self.min_freq += 1
        
        self.freq_keys[f + 1][key] = None
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        self._update_freq(key)
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return
        
        if key in self.cache:
            self.cache[key] = value
            self._update_freq(key)
            return
        
        if len(self.cache) >= self.capacity:
            # Evict least frequent
            lfu_key, _ = self.freq_keys[self.min_freq].popitem(last=False)
            del self.cache[lfu_key]
            del self.freq[lfu_key]
        
        self.cache[key] = value
        self.freq[key] = 1
        self.freq_keys[1][key] = None
        self.min_freq = 1
\`\`\`

---

## Testing Your Implementation

\`\`\`python
# LeetCode test case
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
assert cache.get(1) == 1     # returns 1
cache.put(3, 3)              # evicts key 2
assert cache.get(2) == -1    # returns -1 (not found)
cache.put(4, 4)              # evicts key 1
assert cache.get(1) == -1    # returns -1 (not found)
assert cache.get(3) == 3     # returns 3
assert cache.get(4) == 4     # returns 4
\`\`\`

---

## Eviction Policy Comparison

| Policy | Evicts | Best For |
|--------|--------|----------|
| **LRU** | Least recently accessed | General purpose |
| **LFU** | Least frequently accessed | Static hotspots |
| **FIFO** | First in | Simple queues |
| **Random** | Random entry | Testing |

---

## Key Takeaways

✅ **HashMap + DLL** = O(1) for get, put, evict  
✅ **OrderedDict** is Python's built-in solution  
✅ Add **TTL** for time-based expiration  
✅ Add **locks** for thread safety  
✅ **LFU** is harder but sometimes more efficient
`,
    },
};

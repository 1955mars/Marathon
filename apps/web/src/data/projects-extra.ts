/**
 * Act 0 & Act 3 Projects - Foundations and Distributed Systems
 * From Python scripting to distributed databases!
 */

import { Project } from './projects';
import { step2_HealthChecks, step3_RateLimiting } from './projects-lb-enhanced';

// ============================================================
// PYTHON TOOLKIT
// Real-World: Every DevOps engineer, data scientist, and
// backend developer writes Python scripts daily!
// ============================================================
export const pythonToolkitProject: Project = {
    id: "python-toolkit",
    title: "Python Toolkit",
    act: 0,
    difficulty: "Beginner",
    estimatedHours: 4,
    description: "Build essential Python utilities. Learn patterns used in DevOps automation, data pipelines, and CLI tools like pip, black, and pytest.",
    learningOutcomes: [
        "Master Python idioms and best practices",
        "Build reusable utility functions",
        "Handle files and command-line arguments",
    ],
    prerequisites: ["Basic Python syntax"],
    technologies: ["Python"],
    steps: [
        {
            id: "step-1",
            title: "Pythonic Code Patterns",
            description: "Learn list comprehensions, generators, and context managers.",
            concepts: ["comprehensions", "generators", "context managers"],
            code: {
                python: `# Pythonic Patterns

# List Comprehensions - concise list creation
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dictionary Comprehensions
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}

# Generator - memory efficient iteration
def fibonacci_gen(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

for num in fibonacci_gen(100):
    print(num, end=' ')

# Context Manager - automatic resource cleanup
class FileHandler:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False

# Usage
with FileHandler('test.txt', 'w') as f:
    f.write('Hello, Python!')`,
            },
            explanation: `## Pythonic Idioms

| Pattern | Use Case |
|---------|----------|
| List Comp | Transform/filter lists |
| Generator | Large/infinite sequences |
| Context Mgr | Resource cleanup |`,
            tips: ["Prefer comprehensions over map/filter", "Use generators for memory efficiency"],
        },
        {
            id: "step-2",
            title: "CLI Argument Parser",
            description: "Build a robust command-line interface.",
            concepts: ["argparse", "CLI design", "subcommands"],
            code: {
                python: `import argparse
from pathlib import Path

def create_parser():
    parser = argparse.ArgumentParser(
        description='Python Toolkit CLI',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Commands')
    
    # Count command
    count_parser = subparsers.add_parser('count', help='Count lines in file')
    count_parser.add_argument('file', type=Path, help='File to count')
    count_parser.add_argument('-w', '--words', action='store_true', help='Count words')
    
    # Search command
    search_parser = subparsers.add_parser('search', help='Search in files')
    search_parser.add_argument('pattern', help='Pattern to search')
    search_parser.add_argument('path', type=Path, help='Path to search')
    search_parser.add_argument('-r', '--recursive', action='store_true')
    
    return parser

def main():
    parser = create_parser()
    args = parser.parse_args()
    
    if args.command == 'count':
        content = args.file.read_text()
        lines = len(content.splitlines())
        words = len(content.split()) if args.words else None
        print(f"Lines: {lines}" + (f", Words: {words}" if words else ""))
    
    elif args.command == 'search':
        for file in args.path.rglob('*') if args.recursive else [args.path]:
            if file.is_file():
                if args.pattern in file.read_text():
                    print(f"Found in: {file}")

if __name__ == '__main__':
    main()`,
            },
            explanation: `## argparse provides:
- Automatic help text
- Type validation
- Subcommands for complex CLIs`,
            tips: ["Use subparsers for multi-command CLIs", "Add help text for all arguments"],
        },
    ],
};

// ============================================================
// DISTRIBUTED KEY-VALUE STORE
// Real-World: Redis, DynamoDB, Cassandra, Memcached all use
// these exact patterns for distributed data storage!
// ============================================================
export const distributedKVProject: Project = {
    id: "distributed-kv",
    title: "Distributed Key-Value Store",
    act: 3,
    difficulty: "Advanced",
    estimatedHours: 12,
    description: "Build a distributed KV store like Redis or DynamoDB. Learn consistent hashing (used by Amazon, Discord) and replication strategies.",
    learningOutcomes: [
        "Implement consistent hashing",
        "Handle node failures gracefully",
        "Understand replication strategies",
    ],
    prerequisites: ["Networking", "Concurrency"],
    technologies: ["Python"],
    steps: [
        {
            id: "step-1",
            title: "Consistent Hashing",
            description: "Implement a hash ring for distributed key placement.",
            concepts: ["consistent hashing", "hash ring", "virtual nodes"],
            code: {
                python: `import hashlib
from bisect import bisect_right

class ConsistentHash:
    def __init__(self, nodes=None, replicas=100):
        self.replicas = replicas  # Virtual nodes per physical node
        self.ring = {}  # hash -> node
        self.sorted_keys = []
        
        if nodes:
            for node in nodes:
                self.add_node(node)
    
    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)
    
    def add_node(self, node: str):
        """Add node with virtual replicas to the ring"""
        for i in range(self.replicas):
            virtual_key = f"{node}:{i}"
            hash_val = self._hash(virtual_key)
            self.ring[hash_val] = node
            self.sorted_keys.append(hash_val)
        self.sorted_keys.sort()
    
    def remove_node(self, node: str):
        """Remove node and its virtual replicas"""
        for i in range(self.replicas):
            virtual_key = f"{node}:{i}"
            hash_val = self._hash(virtual_key)
            del self.ring[hash_val]
            self.sorted_keys.remove(hash_val)
    
    def get_node(self, key: str) -> str:
        """Find the node responsible for this key"""
        if not self.ring:
            return None
        
        hash_val = self._hash(key)
        idx = bisect_right(self.sorted_keys, hash_val)
        
        if idx == len(self.sorted_keys):
            idx = 0  # Wrap around
        
        return self.ring[self.sorted_keys[idx]]

# Demo
ring = ConsistentHash(['node1', 'node2', 'node3'])
for key in ['user:1', 'user:2', 'user:3', 'order:100']:
    print(f"{key} -> {ring.get_node(key)}")`,
            },
            explanation: `## Consistent Hashing

Keys and nodes are hashed onto a ring. Each key is assigned to the next node clockwise.

**Benefits:**
- Adding/removing nodes only affects neighbors
- Virtual nodes ensure even distribution

---

## 🌍 Real-World Applications

### 1. **Amazon DynamoDB**
Uses consistent hashing to distribute data across storage nodes.

### 2. **Discord**
Routes 150M+ users to chat servers using consistent hashing.

### 3. **Cassandra (Netflix, Apple)**
Distributes data across data centers globally.

### 4. **CDN Edge Servers (Cloudflare, Akamai)**
Routes requests to nearest healthy server.`,
            tips: ["Use 100+ virtual nodes for balance", "MD5 is fine for hashing (not crypto)", "Monitor hot spots with metrics"],
        },
        {
            id: "step-2",
            title: "Replication",
            description: "Replicate data across multiple nodes for fault tolerance.",
            concepts: ["replication factor", "quorum", "consistency"],
            code: {
                python: `class ReplicatedKV:
    def __init__(self, nodes, replication_factor=3):
        self.rf = replication_factor
        self.ring = ConsistentHash(nodes)
        self.data = {node: {} for node in nodes}
    
    def _get_replica_nodes(self, key: str) -> list:
        """Get N nodes for replication"""
        primary = self.ring.get_node(key)
        nodes = [primary]
        
        # Get next nodes on ring
        idx = self.ring.sorted_keys.index(
            self.ring._hash(f"{primary}:0")
        )
        
        while len(nodes) < self.rf:
            idx = (idx + 1) % len(self.ring.sorted_keys)
            node = self.ring.ring[self.ring.sorted_keys[idx]]
            if node not in nodes:
                nodes.append(node)
        
        return nodes
    
    def put(self, key: str, value: str):
        """Write to all replica nodes"""
        nodes = self._get_replica_nodes(key)
        for node in nodes:
            self.data[node][key] = value
        return nodes
    
    def get(self, key: str) -> str:
        """Read from primary node"""
        primary = self.ring.get_node(key)
        return self.data[primary].get(key)

# Demo
kv = ReplicatedKV(['node1', 'node2', 'node3'])
replicas = kv.put('user:1', 'Alice')
print(f"Stored on: {replicas}")
print(f"Retrieved: {kv.get('user:1')}")`,
            },
            explanation: `## Replication Trade-offs

| Strategy | Consistency | Availability |
|----------|-------------|--------------|
| Write-all | Strong | Lower |
| Quorum (W+R>N) | Tunable | Tunable |
| Read-one | Eventual | High |`,
            tips: ["Replication factor of 3 is common", "Consider quorum for consistency"],
        },
    ],
};

// ============================================================
// LOAD BALANCER
// Real-World: Nginx, HAProxy, AWS ALB, Kubernetes Ingress
// Every high-traffic website uses load balancing!
// ============================================================
export const loadBalancerProject: Project = {
    id: "load-balancer",
    title: "Load Balancer",
    act: 3,
    difficulty: "Advanced",
    estimatedHours: 8,
    description: "Build a layer 7 load balancer like Nginx or HAProxy. Used by Netflix (millions of streams), Amazon, and every major website.",
    learningOutcomes: [
        "Implement load balancing algorithms",
        "Add health checking",
        "Handle connection pooling",
    ],
    prerequisites: ["Networking", "HTTP"],
    technologies: ["Python", "C++"],
    steps: [
        {
            id: "step-1",
            title: "Load Balancing Algorithms",
            description: "Implement round-robin, weighted, and least-connections.",
            concepts: ["round robin", "weighted", "least connections"],
            code: {
                python: `from abc import ABC, abstractmethod
from collections import defaultdict
import random

class LoadBalancer(ABC):
    def __init__(self, servers):
        self.servers = servers
    
    @abstractmethod
    def get_server(self) -> str:
        pass

class RoundRobin(LoadBalancer):
    def __init__(self, servers):
        super().__init__(servers)
        self.current = 0
    
    def get_server(self) -> str:
        server = self.servers[self.current]
        self.current = (self.current + 1) % len(self.servers)
        return server

class WeightedRoundRobin(LoadBalancer):
    def __init__(self, servers_weights: dict):
        self.servers = list(servers_weights.keys())
        self.weights = list(servers_weights.values())
        self.current_weight = 0
        self.current_idx = 0
    
    def get_server(self) -> str:
        while True:
            self.current_idx = (self.current_idx + 1) % len(self.servers)
            if self.current_idx == 0:
                self.current_weight -= 1
                if self.current_weight <= 0:
                    self.current_weight = max(self.weights)
            
            if self.weights[self.current_idx] >= self.current_weight:
                return self.servers[self.current_idx]

class LeastConnections(LoadBalancer):
    def __init__(self, servers):
        super().__init__(servers)
        self.connections = defaultdict(int)
    
    def get_server(self) -> str:
        return min(self.servers, key=lambda s: self.connections[s])
    
    def connect(self, server):
        self.connections[server] += 1
    
    def disconnect(self, server):
        self.connections[server] = max(0, self.connections[server] - 1)

# Demo
rr = RoundRobin(['server1', 'server2', 'server3'])
for _ in range(6):
    print(rr.get_server())`,
            },
            explanation: `## Algorithms Comparison

| Algorithm | Use Case |
|-----------|----------|
| Round Robin | Equal capacity servers |
| Weighted | Different capacity |
| Least Conn | Long-lived connections |`,
            tips: ["Start with round-robin", "Add health checks before production"],
        },
        step2_HealthChecks,
        step3_RateLimiting,
    ],
};

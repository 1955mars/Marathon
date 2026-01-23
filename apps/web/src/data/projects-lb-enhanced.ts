/**
 * Enhanced Load Balancer Steps - Step 2 & 3
 * To be manually merged into projects-extra.ts
 */

// Add these steps after step-1 in loadBalancerProject.steps array:

const step2_HealthChecks = {
    id: "step-2",
    title: "Health Checks",
    description: "Implement passive health checking to detect failed servers.",
    concepts: ["health checks", "circuit breaker", "failover"],
    code: {
        python: `import time
from typing import Dict

class PassiveHealthChecker:
    """Monitor request failures - no extra traffic overhead."""
    def __init__(self, failure_threshold: int = 5, recovery_time: float = 30.0):
        self.threshold = failure_threshold
        self.recovery_time = recovery_time
        self.failures: Dict[str, int] = {}
        self.ejected: Dict[str, float] = {}
    
    def record_failure(self, server: str) -> bool:
        self.failures[server] = self.failures.get(server, 0) + 1
        if self.failures[server] >= self.threshold:
            self.ejected[server] = time.time()
            print(f"⛔ {server} ejected after {self.threshold} failures!")
            return True
        return False
    
    def record_success(self, server: str):
        self.failures[server] = 0
    
    def is_available(self, server: str) -> bool:
        if server not in self.ejected:
            return True
        if time.time() - self.ejected[server] > self.recovery_time:
            del self.ejected[server]
            self.failures[server] = 0
            print(f"🔄 {server} recovered, back in rotation")
            return True
        return False

# Demo
if __name__ == "__main__":
    checker = PassiveHealthChecker(failure_threshold=3, recovery_time=10)
    
    # Simulate failures
    for i in range(4):
        ejected = checker.record_failure("server1")
        print(f"Failure {i+1}: ejected={ejected}")
    
    print(f"\\nserver1 available: {checker.is_available('server1')}")
    print(f"server2 available: {checker.is_available('server2')}")`,
        cpp: `#include <iostream>
#include <unordered_map>
#include <chrono>
using namespace std;

class PassiveHealthChecker {
    unordered_map<string, int> failures;
    unordered_map<string, chrono::steady_clock::time_point> ejected;
    int threshold;
    chrono::seconds recoveryTime;
public:
    PassiveHealthChecker(int t = 5, int r = 30) 
        : threshold(t), recoveryTime(r) {}
    
    bool recordFailure(const string& server) {
        failures[server]++;
        if (failures[server] >= threshold) {
            ejected[server] = chrono::steady_clock::now();
            cout << "⛔ " << server << " ejected" << endl;
            return true;
        }
        return false;
    }
    
    void recordSuccess(const string& server) {
        failures[server] = 0;
    }
    
    bool isAvailable(const string& server) {
        if (ejected.find(server) == ejected.end()) return true;
        auto elapsed = chrono::steady_clock::now() - ejected[server];
        if (elapsed > recoveryTime) {
            ejected.erase(server);
            failures[server] = 0;
            cout << "🔄 " << server << " recovered" << endl;
            return true;
        }
        return false;
    }
};

int main() {
    PassiveHealthChecker checker(3, 10);
    for (int i = 1; i <= 4; i++) {
        cout << "Failure " << i << ": " << checker.recordFailure("server1") << endl;
    }
    cout << "server1 available: " << checker.isAvailable("server1") << endl;
    return 0;
}`,
    },
    explanation: `## Health Check Types

| Type | How | Pros | Cons |
|------|-----|------|------|
| **Active** | Probe /health endpoint | Fast detection | Extra traffic |
| **Passive** | Monitor real request failures | Zero overhead | Slower detection |

---

## 🌍 Real-World Implementations

### AWS ALB Health Checks
- Interval: 30s, Timeout: 5s
- Healthy threshold: 2, Unhealthy threshold: 2

### Kubernetes Probes
\`\`\`yaml
livenessProbe:
  httpGet:
    path: /healthz
  periodSeconds: 10
  failureThreshold: 3
\`\`\`

### Netflix Eureka
Services send heartbeats every 30s. Missing 3 = eviction.`,
    tips: [
        "5 failures in 30s is a good passive threshold",
        "Use separate /health endpoint for active checks",
        "Implement graceful degradation when servers fail"
    ],
};

const step3_RateLimiting = {
    id: "step-3",
    title: "Rate Limiting",
    description: "Implement token bucket rate limiting to protect backend servers.",
    concepts: ["token bucket", "rate limiting", "throttling", "backpressure"],
    code: {
        python: `import time
import threading
from dataclasses import dataclass
from typing import Dict

@dataclass
class RateLimitResult:
    allowed: bool
    remaining: int
    retry_after: float = 0

class TokenBucket:
    """
    Token Bucket Algorithm - industry standard for API rate limiting.
    
    Used by: AWS API Gateway, Stripe, GitHub, Twitter
    
    - Bucket holds up to 'capacity' tokens
    - Tokens refill at 'rate' per second
    - Each request consumes 1 token
    - If empty, request is rejected
    """
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = capacity
        self.last_refill = time.time()
        self.lock = threading.Lock()
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now
    
    def consume(self, tokens: int = 1) -> RateLimitResult:
        with self.lock:
            self._refill()
            if self.tokens >= tokens:
                self.tokens -= tokens
                return RateLimitResult(True, int(self.tokens))
            else:
                wait = (tokens - self.tokens) / self.refill_rate
                return RateLimitResult(False, 0, wait)

class RateLimiter:
    """Per-client rate limiter using Token Bucket."""
    def __init__(self, requests_per_second: float, burst: int):
        self.rate = requests_per_second
        self.burst = burst
        self.buckets: Dict[str, TokenBucket] = {}
        self.lock = threading.Lock()
    
    def is_allowed(self, client_id: str) -> RateLimitResult:
        with self.lock:
            if client_id not in self.buckets:
                self.buckets[client_id] = TokenBucket(self.burst, self.rate)
        return self.buckets[client_id].consume()

# Demo
if __name__ == "__main__":
    print("=== Token Bucket Demo ===")
    bucket = TokenBucket(capacity=5, refill_rate=2)
    
    for i in range(8):
        result = bucket.consume()
        status = "✅" if result.allowed else "❌"
        print(f"Request {i+1}: {status} (remaining: {result.remaining})")
    
    print("\\n⏳ Waiting 2 seconds for refill...")
    time.sleep(2)
    
    result = bucket.consume()
    print(f"After wait: {'✅' if result.allowed else '❌'} (remaining: {result.remaining})")`,
        cpp: `#include <iostream>
#include <chrono>
#include <thread>
#include <mutex>
using namespace std;

class TokenBucket {
    int capacity;
    double refillRate, tokens;
    chrono::steady_clock::time_point lastRefill;
    mutex mtx;
    
    void refill() {
        auto now = chrono::steady_clock::now();
        double elapsed = chrono::duration<double>(now - lastRefill).count();
        tokens = min((double)capacity, tokens + elapsed * refillRate);
        lastRefill = now;
    }
public:
    TokenBucket(int cap, double rate) 
        : capacity(cap), refillRate(rate), tokens(cap),
          lastRefill(chrono::steady_clock::now()) {}
    
    bool consume(int count = 1) {
        lock_guard<mutex> lock(mtx);
        refill();
        if (tokens >= count) {
            tokens -= count;
            return true;
        }
        return false;
    }
    
    int remaining() { return (int)tokens; }
};

int main() {
    cout << "=== Token Bucket Demo ===" << endl;
    TokenBucket bucket(5, 2);  // 5 capacity, 2/sec refill
    
    for (int i = 1; i <= 8; i++) {
        bool allowed = bucket.consume();
        cout << "Request " << i << ": " << (allowed ? "✅" : "❌") << endl;
    }
    
    cout << "\\n⏳ Waiting 2 seconds..." << endl;
    this_thread::sleep_for(chrono::seconds(2));
    
    cout << "After wait: " << (bucket.consume() ? "✅" : "❌") << endl;
    return 0;
}`,
    },
    explanation: `## Token Bucket Visualization

\`\`\`
Bucket: [🪙🪙🪙🪙🪙] capacity=5

Request 1: [🪙🪙🪙🪙_] ✅
Request 2: [🪙🪙🪙__] ✅
...
Request 5: [_____] ✅
Request 6: [_____] ❌ (empty!)

⏳ After 1 second (refill 2 tokens):
Bucket: [🪙🪙___]
Request 7: [🪙____] ✅
\`\`\`

---

## 🌍 Real-World Rate Limits

| Service | Limit | Algorithm |
|---------|-------|-----------|
| GitHub | 5000/hour | Token Bucket |
| Stripe | 100/sec | Token Bucket |
| Twitter | 450/15min | Sliding Window |
| AWS API Gateway | Configurable | Token Bucket |

### HTTP Headers
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1640000000
Retry-After: 30
\`\`\``,
    tips: [
        "Return Retry-After header when rate limited (RFC 6585)",
        "Use Redis for distributed rate limiting",
        "Token bucket is best for APIs (allows initial burst)",
        "Consider separate limits for reads vs writes"
    ],
};

// Export for reference
export { step2_HealthChecks, step3_RateLimiting };

/**
 * Linked List problems
 */
import { Problem } from "./problems";

export const linkedListProblems: Problem[] = [
    {
        id: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        pattern: "Linked List",
        tags: ["linked-list", "recursion"],
        description: "Merge two sorted linked lists into one sorted list.",
        examples: [
            { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
        ],
        constraints: ["0 <= List length <= 50"],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    """Use dummy head to simplify edge cases."""
    dummy = ListNode(0)
    current = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    current.next = list1 or list2
    return dummy.next

# Test helper
def build_list(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def print_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    print(result)

l1 = build_list([1, 2, 4])
l2 = build_list([1, 3, 4])
print_list(merge_two_lists(l1, l2))`,
            cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            curr->next = l1;
            l1 = l1->next;
        } else {
            curr->next = l2;
            l2 = l2->next;
        }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
    return dummy.next;
}

int main() {
    cout << "Merge two sorted lists" << endl;
    return 0;
}`,
        },
        explanation: `## Dummy Head Pattern
Use a dummy node to avoid edge cases with the head. Compare and link nodes iteratively.`,
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)",
    },
    {
        id: "linked-list-cycle",
        title: "Linked List Cycle",
        difficulty: "Easy",
        pattern: "Linked List",
        tags: ["linked-list", "two-pointers"],
        description: "Given head of a linked list, determine if it has a cycle.",
        examples: [
            { input: "head = [3,2,0,-4], pos = 1", output: "true" },
        ],
        constraints: ["0 <= Number of nodes <= 10^4"],
        solutions: {
            python: `def has_cycle(head):
    """Floyd's Tortoise and Hare algorithm."""
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False

# Test
print("Use Floyd's cycle detection")`,
            cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

int main() {
    cout << "Floyd's cycle detection" << endl;
    return 0;
}`,
        },
        explanation: `## Floyd's Algorithm
Slow pointer moves 1 step, fast moves 2 steps. If there's a cycle, they will meet.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "reorder-list",
        title: "Reorder List",
        difficulty: "Medium",
        pattern: "Linked List",
        tags: ["linked-list", "two-pointers", "stack"],
        description: "Reorder list from L0→L1→...→Ln to L0→Ln→L1→Ln-1→L2→Ln-2→...",
        examples: [
            { input: "[1,2,3,4]", output: "[1,4,2,3]" },
            { input: "[1,2,3,4,5]", output: "[1,5,2,4,3]" },
        ],
        constraints: ["1 <= Number of nodes <= 5 * 10^4"],
        solutions: {
            python: `def reorder_list(head):
    """1. Find middle 2. Reverse second half 3. Merge"""
    if not head or not head.next:
        return
    
    # Find middle (slow will be at middle)
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev = None
    curr = slow.next
    slow.next = None  # Split the list
    
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    # Merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2

print("Reorder: find middle, reverse, merge")`,
            cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

void reorderList(ListNode* head) {
    if (!head || !head->next) return;
    
    // Find middle
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Reverse second half
    ListNode* prev = nullptr;
    ListNode* curr = slow->next;
    slow->next = nullptr;
    
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    
    // Merge
    ListNode* first = head;
    ListNode* second = prev;
    while (second) {
        ListNode* tmp1 = first->next;
        ListNode* tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}

int main() {
    cout << "Reorder list" << endl;
    return 0;
}`,
        },
        explanation: `## Three Steps
1. Find middle using slow/fast pointers
2. Reverse the second half
3. Merge alternating nodes from both halves`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "remove-nth-node-from-end",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        pattern: "Linked List",
        tags: ["linked-list", "two-pointers"],
        description: "Remove the nth node from the end of the list and return its head.",
        examples: [
            { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
        ],
        constraints: ["1 <= sz <= 30", "1 <= n <= sz"],
        solutions: {
            python: `def remove_nth_from_end(head, n):
    """Two pointers with n gap."""
    dummy = ListNode(0, head)
    left = right = dummy
    
    # Move right n+1 steps ahead
    for _ in range(n + 1):
        right = right.next
    
    # Move both until right reaches end
    while right:
        left = left.next
        right = right.next
    
    # Remove the node
    left.next = left.next.next
    return dummy.next

print("Two pointers with gap of n")`,
            cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x, ListNode* n = nullptr) : val(x), next(n) {}
};

ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode* left = &dummy;
    ListNode* right = &dummy;
    
    for (int i = 0; i <= n; i++)
        right = right->next;
    
    while (right) {
        left = left->next;
        right = right->next;
    }
    
    left->next = left->next->next;
    return dummy.next;
}

int main() {
    cout << "Remove nth from end" << endl;
    return 0;
}`,
        },
        explanation: `## Two Pointers with Gap
Maintain n gap between pointers. When right reaches end, left is at the node before the target.`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
    },
    {
        id: "lru-cache",
        title: "LRU Cache",
        difficulty: "Medium",
        pattern: "Linked List",
        tags: ["hash-map", "linked-list", "design"],
        description: "Design a data structure for Least Recently Used (LRU) cache with O(1) get and put operations.",
        examples: [
            { input: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "1, -1" },
        ],
        constraints: ["1 <= capacity <= 3000"],
        solutions: {
            python: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}  # key -> node
        
        # Dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev
    
    def _insert(self, node):
        # Insert at end (most recent)
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node
    
    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert(node)
            return node.val
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        
        node = Node(key, value)
        self.cache[key] = node
        self._insert(node)
        
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

# Test
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))  # 1
cache.put(3, 3)
print(cache.get(2))  # -1`,
            cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k = 0, int v = 0) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int cap;
    unordered_map<int, Node*> cache;
    Node *head, *tail;
    
    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void insert(Node* node) {
        node->prev = tail->prev;
        node->next = tail;
        tail->prev->next = node;
        tail->prev = node;
    }
    
public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node();
        tail = new Node();
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (cache.count(key)) {
            Node* node = cache[key];
            remove(node);
            insert(node);
            return node->val;
        }
        return -1;
    }
    
    void put(int key, int value) {
        if (cache.count(key)) remove(cache[key]);
        
        Node* node = new Node(key, value);
        cache[key] = node;
        insert(node);
        
        if (cache.size() > cap) {
            Node* lru = head->next;
            remove(lru);
            cache.erase(lru->key);
        }
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl;  // 1
    cache.put(3, 3);
    cout << cache.get(2) << endl;  // -1
    return 0;
}`,
        },
        explanation: `## HashMap + Doubly Linked List
HashMap for O(1) access, DLL for O(1) reordering. Most recent at tail, LRU at head.`,
        timeComplexity: "O(1) both operations",
        spaceComplexity: "O(capacity)",
    },
];

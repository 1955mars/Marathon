"""
===============================================================================
STEP 2: Implementing Put and Get with Collision Handling
===============================================================================
Now we implement the core operations: storing and retrieving key-value pairs.

THE PROBLEM: Two different keys can hash to the same bucket (collision)
THE SOLUTION: Use "separate chaining" - each bucket holds a linked list

VISUAL EXAMPLE:
    Bucket 0: None
    Bucket 1: ("apple", 5) -> ("banana", 3) -> None
    Bucket 2: ("cherry", 7) -> None
    Bucket 3: None
    ...

When "apple" and "banana" both hash to bucket 1, we chain them together!
===============================================================================
"""

class Node:
    """
    A single node in our linked list chain.
    
    Each node stores:
    - key: The lookup key (e.g., "username")
    - value: The associated value (e.g., "john_doe")
    - next: Pointer to the next node in the chain (or None if last)
    
    Visual representation:
        +-------------+
        | key: "name" |
        | value: "Bob"|
        | next: ------>  (points to next Node or None)
        +-------------+
    """
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None  # Will point to next node if there's a collision


class HashMap:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """Convert key to bucket index (0 to capacity-1)."""
        return hash(key) % self.capacity
    
    def put(self, key, value):
        """
        Insert or update a key-value pair in the hash map.
        
        Args:
            key: The key to store (must be hashable)
            value: The value associated with the key
        
        Algorithm:
        1. Hash the key to find which bucket it belongs to
        2. Search the bucket's chain for an existing key
        3. If found: UPDATE the value (don't create duplicate)
        4. If not found: INSERT new node at the HEAD of the chain
        
        Time Complexity:
        - Average case: O(1) - bucket has few items
        - Worst case: O(n) - all items in one bucket (rare with good hash)
        """
        # Step 1: Find the bucket for this key
        index = self._hash(key)
        
        # Step 2: Get the first node in this bucket's chain
        node = self.buckets[index]
        
        # Step 3: Walk through the chain looking for existing key
        while node is not None:
            if node.key == key:
                # FOUND IT! Update the value and we're done
                node.value = value
                return  # Early return - don't increment size
            
            # Move to the next node in the chain
            node = node.next
        
        # Step 4: Key doesn't exist - create new node
        new_node = Node(key, value)
        
        # Insert at the HEAD of the chain (O(1) insertion)
        # Why head? It's faster than walking to the end!
        new_node.next = self.buckets[index]  # Point to old head
        self.buckets[index] = new_node       # New node becomes head
        
        # Track that we added a new item
        self.size += 1
    
    def get(self, key):
        """
        Retrieve a value by its key.
        
        Args:
            key: The key to look up
        
        Returns:
            The value if found, None if the key doesn't exist
        
        Algorithm:
        1. Hash the key to find the bucket
        2. Walk through the bucket's chain
        3. Return value if key matches, None if we reach the end
        
        Time Complexity: O(1) average, O(n) worst case
        """
        # Step 1: Find the bucket
        index = self._hash(key)
        
        # Step 2: Get the first node in the chain
        node = self.buckets[index]
        
        # Step 3: Search the chain
        while node is not None:
            if node.key == key:
                # FOUND IT! Return the value
                return node.value
            node = node.next
        
        # Key not found in the chain
        return None
    
    def delete(self, key):
        """
        Remove a key-value pair from the hash map.
        
        Returns:
            True if deleted, False if key didn't exist
        
        This is trickier because we need to update the chain links!
        """
        index = self._hash(key)
        node = self.buckets[index]
        prev = None  # Track the previous node for re-linking
        
        while node is not None:
            if node.key == key:
                # FOUND IT! Now remove from chain
                if prev is None:
                    # It's the first node - update bucket head
                    self.buckets[index] = node.next
                else:
                    # It's in the middle/end - skip over it
                    prev.next = node.next
                
                self.size -= 1
                return True
            
            prev = node
            node = node.next
        
        return False  # Key not found
    
    def contains(self, key):
        """Check if a key exists. Returns True/False."""
        return self.get(key) is not None
    
    def __str__(self):
        """Pretty print the hash map structure."""
        lines = []
        for i, bucket in enumerate(self.buckets):
            if bucket is not None:
                chain = []
                node = bucket
                while node:
                    chain.append(f"({node.key}: {node.value})")
                    node = node.next
                lines.append(f"Bucket {i}: {' -> '.join(chain)}")
        return "\n".join(lines) if lines else "Empty HashMap"


# ============================================================================
# INTERACTIVE TESTS
# ============================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("HASHMAP PUT/GET DEMONSTRATION")
    print("=" * 60)
    
    hm = HashMap(capacity=4)  # Small capacity to see collisions
    
    # Insert some data
    print("\n1. Inserting key-value pairs:")
    test_data = [("name", "Alice"), ("age", 25), ("city", "NYC"), ("job", "Engineer")]
    
    for key, value in test_data:
        print(f"   put('{key}', {value})")
        hm.put(key, value)
    
    print(f"\n2. Current size: {hm.size}")
    print(f"\n3. Internal structure:\n{hm}")
    
    print("\n4. Retrieving values:")
    print(f"   get('name') = {hm.get('name')}")
    print(f"   get('age') = {hm.get('age')}")
    print(f"   get('missing') = {hm.get('missing')}")
    
    print("\n5. Updating existing key:")
    hm.put("age", 26)  # Update
    print(f"   put('age', 26)")
    print(f"   get('age') = {hm.get('age')}")  # Should be 26
    print(f"   size still = {hm.size}")  # Size unchanged!
    
    print("\n" + "=" * 60)
    print("KEY INSIGHTS:")
    print("- Multiple keys can share a bucket (via chaining)")
    print("- Updates don't increase size")
    print("- get() returns None for missing keys")
    print("=" * 60)

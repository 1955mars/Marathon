"""
===============================================================================
STEP 3: Dynamic Resizing (The Secret to O(1) Performance)
===============================================================================
As we add more items, buckets get crowded and lookups slow down.
The solution: RESIZE the array when it gets too full!

LOAD FACTOR = size / capacity
- If load factor > 0.75, performance degrades rapidly
- When we hit 0.75, we DOUBLE the capacity and REHASH all entries

AMORTIZED O(1):
- Resizing is O(n) but happens rarely
- Average over many operations = O(1)
- Example: 1000 inserts, only ~10 resizes = still fast overall
===============================================================================
"""

class Node:
    """Node in the collision chain (same as Step 2)."""
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None


class HashMap:
    # Class constant: resize when 75% full
    # Why 0.75? It's a balance between memory and speed
    # - Lower (0.5): More memory, fewer collisions
    # - Higher (0.9): Less memory, more collisions
    LOAD_FACTOR_THRESHOLD = 0.75
    
    def __init__(self, capacity=16):
        """
        Initialize with default capacity of 16.
        
        Why 16? It's:
        - A power of 2 (efficient modulo via bitwise AND)
        - Not too small (frequent resizing)
        - Not too large (wasted memory)
        """
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """Convert key to bucket index."""
        return hash(key) % self.capacity
    
    def _get_load_factor(self):
        """
        Calculate current load factor.
        
        Load Factor = items stored / total buckets
        
        Examples:
        - 8 items in 16 buckets = 0.5 (50% full, good!)
        - 12 items in 16 buckets = 0.75 (75% full, time to resize!)
        - 16 items in 16 buckets = 1.0 (100% full, too late!)
        """
        return self.size / self.capacity
    
    def _resize(self):
        """
        Double the capacity and rehash ALL entries.
        
        This is the most complex operation but crucial for performance!
        
        Algorithm:
        1. Save reference to old buckets
        2. Create new, larger bucket array
        3. Reset size counter
        4. Re-insert every item (they may go to different buckets now!)
        
        Why items move buckets:
        - hash("hello") % 16 = 10
        - hash("hello") % 32 = 26  <- Different bucket!
        
        Time Complexity: O(n) - but happens infrequently
        """
        print(f"\n*** RESIZING: {self.capacity} -> {self.capacity * 2} ***")
        
        # Step 1: Save old buckets
        old_buckets = self.buckets
        old_capacity = self.capacity
        
        # Step 2: Create new, larger array
        self.capacity *= 2  # DOUBLE the size
        self.buckets = [None] * self.capacity
        self.size = 0  # Reset - put() will increment
        
        # Step 3: Rehash ALL existing entries
        items_moved = 0
        for bucket in old_buckets:
            node = bucket
            while node is not None:
                # Re-insert into new (larger) array
                # The hash will likely be different now!
                self.put(node.key, node.value)
                items_moved += 1
                node = node.next
        
        print(f"*** Moved {items_moved} items to new buckets ***\n")
    
    def put(self, key, value):
        """
        Insert or update a key-value pair.
        
        NEW in this step: Check load factor BEFORE inserting!
        """
        # ============================================
        # CRITICAL: Check if we need to resize FIRST
        # ============================================
        if self._get_load_factor() >= self.LOAD_FACTOR_THRESHOLD:
            self._resize()
        
        # Now proceed with normal insertion (same as Step 2)
        index = self._hash(key)
        node = self.buckets[index]
        
        # Look for existing key
        while node is not None:
            if node.key == key:
                node.value = value  # Update existing
                return
            node = node.next
        
        # Insert new node at head
        new_node = Node(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
    
    def get(self, key):
        """Retrieve value by key (same as Step 2)."""
        index = self._hash(key)
        node = self.buckets[index]
        
        while node is not None:
            if node.key == key:
                return node.value
            node = node.next
        
        return None
    
    def stats(self):
        """Print statistics about the hash map."""
        print(f"Size: {self.size}")
        print(f"Capacity: {self.capacity}")
        print(f"Load Factor: {self._get_load_factor():.2%}")
        
        # Calculate chain lengths
        chain_lengths = []
        for bucket in self.buckets:
            length = 0
            node = bucket
            while node:
                length += 1
                node = node.next
            if length > 0:
                chain_lengths.append(length)
        
        if chain_lengths:
            print(f"Used Buckets: {len(chain_lengths)}/{self.capacity}")
            print(f"Avg Chain Length: {sum(chain_lengths)/len(chain_lengths):.2f}")
            print(f"Max Chain Length: {max(chain_lengths)}")


# ============================================================================
# DEMONSTRATION: Watch resizing happen!
# ============================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("DYNAMIC RESIZING DEMONSTRATION")
    print("=" * 60)
    
    # Start with tiny capacity to see resizing
    hm = HashMap(capacity=4)
    
    print(f"\nStarting with capacity: {hm.capacity}")
    print(f"Will resize at: {int(4 * 0.75)} items (75% of 4)\n")
    
    # Insert items and watch resize triggers
    for i in range(20):
        key = f"key_{i}"
        hm.put(key, i * 10)
        
        if i % 5 == 4:  # Print stats every 5 inserts
            print(f"After {i + 1} inserts:")
            hm.stats()
            print()
    
    print("=" * 60)
    print("FINAL STATE:")
    hm.stats()
    
    print("\n" + "=" * 60)
    print("KEY INSIGHTS:")
    print("- Started with capacity 4, ended with 32")
    print("- Resized at 3, 6, 12 items (75% thresholds)")
    print("- Load factor stays below 75% = fast lookups!")
    print("- This is 'amortized O(1)' - occasional O(n) resize")
    print("=" * 60)

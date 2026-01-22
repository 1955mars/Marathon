"""
===============================================================================
STEP 1: Understanding Hash Functions
===============================================================================
A hash function is the core of any hash map. It converts a key (like a string 
or number) into an array index where we'll store the associated value.

KEY CONCEPTS:
- Hash functions must be DETERMINISTIC: same input always gives same output
- Good hash functions distribute keys UNIFORMLY across the array
- We use MODULO (%) to keep the hash within array bounds
===============================================================================
"""

class HashMap:
    def __init__(self, capacity=16):
        """
        Initialize the HashMap with a fixed capacity.
        
        Args:
            capacity: The initial size of our internal array (default: 16)
                     We use 16 because it's a power of 2, which makes 
                     modulo operations faster on most CPUs.
        
        Internal state:
            - capacity: How many buckets we have
            - size: How many key-value pairs are stored
            - buckets: The actual array storing our data
        """
        self.capacity = capacity  # Number of "buckets" in our hash table
        self.size = 0             # Current number of stored items
        self.buckets = [None] * capacity  # Initialize empty buckets
        
        # WHY [None] * capacity?
        # This creates a list of 'capacity' empty slots, like:
        # [None, None, None, None, None, None, None, None, ...]
        # Each slot is called a "bucket" and will hold our key-value pairs
    
    def _hash(self, key):
        """
        Convert any key into a valid array index.
        
        Args:
            key: Any hashable Python object (string, int, tuple, etc.)
        
        Returns:
            An integer between 0 and (capacity - 1)
        
        How it works:
        1. Python's built-in hash() converts the key to a large integer
        2. We use modulo (%) to keep it within our array bounds
        
        Example:
            hash("hello") might return 1234567890
            1234567890 % 16 = 2  (so "hello" goes in bucket 2)
        """
        return hash(key) % self.capacity
        
        # NOTE: Python's hash() returns different values across Python sessions
        # for security reasons. This is fine for in-memory hash tables.
    
    def _hash_custom(self, key):
        """
        Custom hash function for strings using the djb2 algorithm.
        
        The djb2 algorithm was created by Daniel J. Bernstein and is one of
        the best string hash functions ever written. It's simple, fast, and
        produces very few collisions.
        
        Args:
            key: A string to hash
        
        Returns:
            An integer between 0 and (capacity - 1)
        
        Algorithm breakdown:
        1. Start with a "magic number" 5381
        2. For each character:
           - Multiply hash by 33 (done as: hash * 32 + hash = hash << 5 + hash)
           - Add the ASCII value of the character
        3. Take modulo to get final index
        """
        if isinstance(key, str):
            h = 5381  # Magic starting number (works well empirically)
            
            for char in key:
                # h << 5 is the same as h * 32 (left shift by 5 bits)
                # (h << 5) + h is the same as h * 33
                # This is faster than multiplication on most CPUs
                h = ((h << 5) + h) + ord(char)
                
                # ord(char) converts character to its ASCII/Unicode value
                # 'a' -> 97, 'A' -> 65, '0' -> 48, etc.
            
            return h % self.capacity
        
        # For non-strings, fall back to Python's built-in hash
        return hash(key) % self.capacity


# ============================================================================
# TEST THE HASH FUNCTION
# ============================================================================
if __name__ == "__main__":
    hm = HashMap(capacity=16)
    
    # Test with different types of keys
    test_keys = ["hello", "world", "python", "hash", 42, (1, 2, 3)]
    
    print("Testing hash function distribution:")
    print("-" * 40)
    
    for key in test_keys:
        index = hm._hash(key)
        print(f"Key: {key:15} -> Bucket: {index}")
    
    print("\n" + "=" * 40)
    print("Key insight: Different keys can map to the SAME bucket!")
    print("This is called a COLLISION, and we'll handle it in Step 2.")
    print("=" * 40)

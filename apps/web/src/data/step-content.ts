/**
 * Step Content - Educational content for each curriculum step
 */

import { act0Content } from './step-content-act0';
import { act1Content } from './step-content-act1';
import { act2Content } from './step-content-act2';
import { act3Content } from './step-content-act3';
import { act4Content } from './step-content-act4';
import { architectureContent, securityContent, versionControlContent, testingContent } from './step-content-new';

export interface StepContentData {
    title: string;
    content: string;
}

// Base content (Act 0 Python Basics already defined inline)
const baseContent: Record<string, StepContentData> = {
    // Act 0: Python Basics
    'step-0-1-1': {
        title: 'Python Basics',
        content: `# Python Basics

Welcome to your Python journey! This module covers the fundamental building blocks of Python programming.

## Variables and Data Types

Python is dynamically typed, meaning you don't need to declare variable types explicitly.

\`\`\`python
# Numbers
age = 25
price = 19.99
complex_num = 3 + 4j

# Strings
name = "Marathon"
multiline = """This is a
multiline string"""

# Booleans
is_active = True
is_complete = False

# None
result = None
\`\`\`

## Control Flow

### If Statements

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
\`\`\`

### Loops

\`\`\`python
# For loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# Loop with enumerate
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

## Functions

\`\`\`python
def greet(name, greeting="Hello"):
    """A simple greeting function."""
    return f"{greeting}, {name}!"

# Usage
print(greet("World"))  # Hello, World!
print(greet("Python", "Welcome to"))  # Welcome to, Python!

# Lambda functions
square = lambda x: x ** 2
print(square(5))  # 25
\`\`\`

## Error Handling

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    print("Cleanup code runs here")
\`\`\`

## Key Takeaways

- Python uses **indentation** for code blocks (no curly braces)
- Variables are **dynamically typed**
- Use **f-strings** for string formatting: \`f"Hello, {name}"\`
- **List comprehensions** are powerful: \`[x**2 for x in range(10)]\`
- **Docstrings** document functions: triple-quoted strings after def
`,
    },

    // Act 0: Data Structures in Python
    'step-0-1-2': {
        title: 'Data Structures in Python',
        content: `# Data Structures in Python

Python provides powerful built-in data structures that are essential for any programmer.

## Lists

Ordered, mutable sequences.

\`\`\`python
# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, [4, 5]]

# Common operations
numbers.append(6)        # Add to end
numbers.insert(0, 0)     # Insert at index
numbers.pop()            # Remove and return last
numbers.remove(3)        # Remove first occurrence

# Slicing
first_three = numbers[:3]
last_two = numbers[-2:]
reversed_list = numbers[::-1]

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\`

## Dictionaries

Key-value pairs, unordered (Python 3.7+ maintains insertion order).

\`\`\`python
# Creating dicts
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Access and modify
name = person["name"]
name = person.get("name", "Unknown")  # With default
person["email"] = "alice@example.com"

# Iteration
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(f"{key}: {value}")

# Dict comprehension
squares = {x: x**2 for x in range(5)}
\`\`\`

## Sets

Unordered collection of unique elements.

\`\`\`python
# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}

union = a | b          # {1, 2, 3, 4}
intersection = a & b   # {2, 3}
difference = a - b     # {1}
symmetric = a ^ b      # {1, 4}
\`\`\`

## Tuples

Immutable sequences.

\`\`\`python
# Creating tuples
point = (3, 4)
single = (42,)  # Note the comma!

# Unpacking
x, y = point
a, *rest, z = [1, 2, 3, 4, 5]  # a=1, rest=[2,3,4], z=5

# Named tuples
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
\`\`\`

## Key Complexity

| Operation | List | Dict | Set |
|-----------|------|------|-----|
| Access    | O(1) | O(1) | N/A |
| Search    | O(n) | O(1) | O(1) |
| Insert    | O(1)* | O(1) | O(1) |
| Delete    | O(n) | O(1) | O(1) |

*Amortized for append
`,
    },

    // Act 0: OOP in Python
    'step-0-1-3': {
        title: 'OOP in Python',
        content: `# Object-Oriented Programming in Python

Master classes, inheritance, and Python's magic methods.

## Classes and Objects

\`\`\`python
class Dog:
    # Class attribute
    species = "Canis familiaris"
    
    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age
    
    def bark(self):
        return f"{self.name} says woof!"
    
    def __str__(self):
        return f"{self.name}, {self.age} years old"

# Usage
buddy = Dog("Buddy", 5)
print(buddy.bark())  # Buddy says woof!
print(buddy)         # Buddy, 5 years old
\`\`\`

## Inheritance

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return f"{self.name} says woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow!"

# Multiple inheritance
class Flyable:
    def fly(self):
        return "Flying!"

class Bird(Animal, Flyable):
    def speak(self):
        return f"{self.name} says chirp!"
\`\`\`

## Magic Methods (Dunder Methods)

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)  # Vector(4, 6)
print(len(v1))  # 5
\`\`\`

## Properties and Decorators

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
print(c.area)    # 78.54...
c.radius = 10    # Uses setter
\`\`\`

## Class Methods and Static Methods

\`\`\`python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    @classmethod
    def from_string(cls, date_string):
        year, month, day = map(int, date_string.split("-"))
        return cls(year, month, day)
    
    @staticmethod
    def is_valid_date(date_string):
        try:
            year, month, day = map(int, date_string.split("-"))
            return 1 <= month <= 12 and 1 <= day <= 31
        except:
            return False

d = Date.from_string("2024-01-15")
print(Date.is_valid_date("2024-01-15"))  # True
\`\`\`
`,
    },

    // Act 1: Arrays & Dynamic Arrays
    'step-1-1-1': {
        title: 'Arrays & Dynamic Arrays',
        content: `# Arrays & Dynamic Arrays

## Why This Matters

Arrays are the **foundation of all data structures**. Every other structure builds on array concepts. Understanding arrays helps you:

- Optimize memory usage and cache performance
- Understand why some operations are O(1) and others O(n)
- Master essential patterns: **two pointers**, **sliding window**
- Ace the most common interview questions

---

## The Bookshelf Analogy 📚

| Concept | Bookshelf | Array |
|---------|-----------|-------|
| **Contiguous storage** | Books side by side | Elements in adjacent memory |
| **Index access** | "Get book 5" | arr[5] in O(1) |
| **Insert in middle** | Shift all books right | Shift all elements right - O(n) |
| **Fixed size** | Finite shelf space | Static array |
| **Growing** | Buy new bigger shelf | Dynamic array resize |

---

## Memory Layout

\`\`\`mermaid
flowchart LR
    subgraph memory["Contiguous Memory"]
        M0["Index 0: 10"]
        M1["Index 1: 20"]
        M2["Index 2: 30"]
        M3["Index 3: 40"]
        M4["Index 4: 50"]
    end
    A["arr at 2"] --> M2
    style M2 fill:#22c55e
\`\`\`

**Why O(1) access?** Address = base_address + (index × element_size)

---

## Static vs Dynamic Arrays

| Feature | Static Array | Dynamic Array |
|---------|--------------|---------------|
| **Size** | Fixed at creation | Grows as needed |
| **Memory** | Allocated once | Reallocated on resize |
| **Language** | C arrays, Java int[] | Python list, Java ArrayList |

---

## Dynamic Array Growth

\`\`\`mermaid
flowchart LR
    subgraph step1["Cap: 2, Size: 2"]
        A1["10"]
        A2["20"]
    end
    subgraph step2["Cap: 4, Size: 3"]
        B1["10"]
        B2["20"]
        B3["30"]
        B4["_"]
    end
    step1 -->|"append 30"| step2
\`\`\`

### Implementation

\`\`\`python
class DynamicArray:
    def __init__(self):
        self.capacity = 1
        self.size = 0
        self.array = [None] * self.capacity
    
    def append(self, item):
        """O(1) amortized"""
        if self.size == self.capacity:
            self._resize(2 * self.capacity)  # Double capacity
        self.array[self.size] = item
        self.size += 1
    
    def _resize(self, new_capacity):
        """O(n) - copy all elements"""
        new_array = [None] * new_capacity
        for i in range(self.size):
            new_array[i] = self.array[i]
        self.array = new_array
        self.capacity = new_capacity
    
    def get(self, index):
        """O(1)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        return self.array[index]
    
    def insert(self, index, item):
        """O(n) - shift elements right"""
        if self.size == self.capacity:
            self._resize(2 * self.capacity)
        for i in range(self.size, index, -1):
            self.array[i] = self.array[i-1]
        self.array[index] = item
        self.size += 1
    
    def delete(self, index):
        """O(n) - shift elements left"""
        for i in range(index, self.size - 1):
            self.array[i] = self.array[i+1]
        self.size -= 1
\`\`\`

---

## Time Complexity

| Operation | Average | Worst Case | Why |
|-----------|---------|------------|-----|
| **Access** | O(1) | O(1) | Direct address calculation |
| **Append** | O(1)* | O(n) | Occasional resize |
| **Insert** | O(n) | O(n) | Shift elements right |
| **Delete** | O(n) | O(n) | Shift elements left |
| **Search** | O(n) | O(n) | Linear scan |

*Amortized — occasional O(n) resize averages to O(1)

---

## Essential Patterns

### 1. Two Pointers ⭐

\`\`\`python
def two_sum_sorted(arr, target):
    """Find two numbers that sum to target in sorted array"""
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1   # Need larger sum
        else:
            right -= 1  # Need smaller sum
    return []

# two_sum_sorted([1, 2, 3, 4, 6], 6) → [1, 3] (2+4=6)
\`\`\`

### 2. Sliding Window ⭐

\`\`\`python
def max_sum_subarray(arr, k):
    """Find max sum of k consecutive elements"""
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # Slide window
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# max_sum_subarray([2, 1, 5, 1, 3, 2], 3) → 9 (5+1+3)
\`\`\`

### 3. Prefix Sum

\`\`\`python
def range_sum(arr, queries):
    """Efficiently answer multiple range sum queries"""
    # Build prefix sum array
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    
    # Answer queries in O(1) each
    results = []
    for left, right in queries:
        results.append(prefix[right+1] - prefix[left])
    return results
\`\`\`

---

## Interview Insights 💡

**Common Questions**:
1. "Two Sum" (use hash map for O(n), or two pointers if sorted)
2. "Maximum subarray" (Kadane's algorithm)
3. "Rotate array" (reverse trick)
4. "Merge sorted arrays"

**Key Talking Points**:
- Arrays give O(1) access due to contiguous memory
- Insertions/deletions are O(n) because of shifting
- Dynamic arrays double capacity for amortized O(1) append
- Cache-friendly = faster in practice

**Red Flags**:
- Using list.insert(0, x) in Python (O(n)!) — use \`deque\` instead
- Not considering array bounds
- Modifying array while iterating

---

## Key Takeaways

✅ Arrays provide **O(1) random access** via index  
✅ Dynamic arrays **double capacity** when full (amortized O(1) append)  
✅ Insert/delete in middle is **O(n)** due to shifting  
✅ **Contiguous memory** = cache-friendly = fast iteration  
✅ Master **two pointers** and **sliding window** patterns  
✅ Prefix sums enable O(1) range queries after O(n) preprocessing
`,
    },
};

// Merge all content sources
export const stepContent: Record<string, StepContentData> = {
    ...baseContent,
    ...act0Content,
    ...act1Content,
    ...act2Content,
    ...act3Content,
    ...act4Content,
    ...architectureContent,
    ...securityContent,
    ...versionControlContent,
    ...testingContent,
};

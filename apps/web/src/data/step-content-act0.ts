/**
 * Act 0: Language Foundations - Step Content
 * Python and C++ mastery content for curriculum steps
 */

export const act0Content: Record<string, { title: string; content: string }> = {
    // Step 0-1-4: Functional Python
    'step-0-1-4': {
        title: 'Functional Python',
        content: `# Functional Python

Master lambdas, higher-order functions, and generators for elegant, concise code.

## Lambda Functions

Anonymous functions for simple operations:

\`\`\`python
# Traditional function
def square(x):
    return x ** 2

# Lambda equivalent
square = lambda x: x ** 2

# Commonly used with map/filter/sorted
numbers = [1, 5, 3, 9, 2]
sorted(numbers, key=lambda x: -x)  # [9, 5, 3, 2, 1]
\`\`\`

## Higher-Order Functions

Functions that take or return other functions:

### map() - Transform each element
\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Square each number
squares = list(map(lambda x: x**2, numbers))
# [1, 4, 9, 16, 25]

# Convert to strings
strings = list(map(str, numbers))
# ['1', '2', '3', '4', '5']
\`\`\`

### filter() - Keep elements matching condition
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only evens
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4, 6, 8, 10]

# Keep positive numbers
positives = list(filter(lambda x: x > 0, [-2, -1, 0, 1, 2]))
# [1, 2]
\`\`\`

### reduce() - Combine all elements
\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda acc, x: acc + x, numbers)
# 15

# Find maximum
maximum = reduce(lambda a, b: a if a > b else b, numbers)
# 5
\`\`\`

## Generators

Memory-efficient iterables using \`yield\`:

\`\`\`python
# Generator function
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

# Use the generator
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# Generator expression (like list comprehension)
squares_gen = (x**2 for x in range(1000000))
# Uses almost no memory!

# Get values lazily
first = next(squares_gen)  # 0
second = next(squares_gen)  # 1
\`\`\`

### Infinite Generators
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Get first 10 Fibonacci numbers
fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

## Itertools - Powerful Iteration Tools

\`\`\`python
from itertools import chain, combinations, permutations, groupby

# Chain iterables together
list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]

# All combinations
list(combinations([1, 2, 3], 2))  # [(1,2), (1,3), (2,3)]

# All permutations
list(permutations([1, 2, 3], 2))  # [(1,2), (1,3), (2,1), ...]

# Group consecutive elements
data = [('a', 1), ('a', 2), ('b', 3), ('b', 4)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
\`\`\`

## Key Takeaways

- **Lambdas** are great for simple, one-line functions
- **map/filter/reduce** enable functional data transformations
- **Generators** are memory-efficient for large datasets
- **List comprehensions** are often more Pythonic than map/filter
- Use **itertools** for complex iteration patterns
`,
    },

    // Step 0-1-5: Pythonic Idioms
    'step-0-1-5': {
        title: 'Pythonic Idioms',
        content: `# Pythonic Idioms

Write code that experienced Python developers will recognize and appreciate.

## Context Managers (with statement)

Automatically handle setup and cleanup:

\`\`\`python
# File handling - automatically closes file
with open('data.txt', 'r') as f:
    content = f.read()
# File is automatically closed here

# Custom context manager
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    end = time.time()
    print(f"Elapsed: {end - start:.2f}s")

with timer():
    # Code to time
    sum(range(1000000))
\`\`\`

## Decorators

Modify function behavior without changing function code:

\`\`\`python
import functools
import time

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()  # Prints: slow_function took 1.0012s

# Decorator with parameters
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")
\`\`\`

## Type Hints

Add type information for better tooling and documentation:

\`\`\`python
from typing import List, Dict, Optional, Tuple, Callable

def greet(name: str) -> str:
    return f"Hello, {name}!"

def process_items(items: List[int]) -> Dict[str, int]:
    return {
        "sum": sum(items),
        "count": len(items)
    }

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# Function type hints
def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)
\`\`\`

## *args and **kwargs

Handle variable arguments:

\`\`\`python
def log(*args, **kwargs):
    print("Args:", args)
    print("Kwargs:", kwargs)

log(1, 2, 3, name="test", level="info")
# Args: (1, 2, 3)
# Kwargs: {'name': 'test', 'level': 'info'}

# Unpacking in function calls
def greet(first, last, greeting="Hello"):
    return f"{greeting}, {first} {last}!"

args = ("John", "Doe")
kwargs = {"greeting": "Welcome"}
print(greet(*args, **kwargs))  # Welcome, John Doe!
\`\`\`

## Walrus Operator (:=) - Python 3.8+

Assign and use in one expression:

\`\`\`python
# Without walrus
line = input()
while line != "quit":
    print(line)
    line = input()

# With walrus
while (line := input()) != "quit":
    print(line)

# In list comprehensions
data = [1, 2, 3, 4, 5]
results = [y for x in data if (y := x * 2) > 4]
# [6, 8, 10]
\`\`\`

## Dataclasses

Reduce boilerplate for data-holding classes:

\`\`\`python
from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    name: str
    email: str
    age: int = 0
    tags: List[str] = field(default_factory=list)

# Auto-generates __init__, __repr__, __eq__
user = User("Alice", "alice@example.com", 25)
print(user)  # User(name='Alice', email='alice@example.com', age=25, tags=[])
\`\`\`

## Key Takeaways

- Use **context managers** for resource cleanup
- **Decorators** add reusable behavior to functions
- **Type hints** improve code clarity and enable IDE support
- **Dataclasses** reduce boilerplate for data classes
- Write **Pythonic** code that reads naturally
`,
    },

    // Step 0-1-6: Python Exercises
    'step-0-1-6': {
        title: 'Python Exercises',
        content: `# Python Mastery Exercises

Test your Python knowledge with these practice problems.

## Exercise 1: List Manipulation

Implement a function that returns the second-largest number:

\`\`\`python
def second_largest(nums: list) -> int:
    """Return the second largest unique number."""
    unique = list(set(nums))
    if len(unique) < 2:
        return None
    unique.sort(reverse=True)
    return unique[1]

# Test
assert second_largest([1, 2, 3, 4, 5]) == 4
assert second_largest([1, 1, 1]) == None
\`\`\`

## Exercise 2: Dictionary Operations

Count word frequencies in a string:

\`\`\`python
from collections import Counter

def word_frequency(text: str) -> dict:
    """Return word frequency count."""
    words = text.lower().split()
    return dict(Counter(words))

# Test
text = "the quick brown fox jumps over the lazy dog"
freq = word_frequency(text)
assert freq["the"] == 2
\`\`\`

## Exercise 3: Generator Practice

Create a generator for prime numbers:

\`\`\`python
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def prime_generator():
    """Generate infinite prime numbers."""
    n = 2
    while True:
        if is_prime(n):
            yield n
        n += 1

# Get first 10 primes
primes = prime_generator()
first_10 = [next(primes) for _ in range(10)]
assert first_10 == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
\`\`\`

## Exercise 4: Decorator Challenge

Create a memoization decorator:

\`\`\`python
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Now runs in O(n) instead of O(2^n)
assert fibonacci(50) == 12586269025
\`\`\`

## Exercise 5: Class Design

Implement a Stack with max operation:

\`\`\`python
class MaxStack:
    def __init__(self):
        self.stack = []
        self.max_stack = []
    
    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.max_stack or val >= self.max_stack[-1]:
            self.max_stack.append(val)
    
    def pop(self) -> int:
        val = self.stack.pop()
        if val == self.max_stack[-1]:
            self.max_stack.pop()
        return val
    
    def get_max(self) -> int:
        return self.max_stack[-1] if self.max_stack else None

# Test
stack = MaxStack()
stack.push(5)
stack.push(1)
stack.push(5)
assert stack.get_max() == 5
stack.pop()
assert stack.get_max() == 5
\`\`\`

## Key Takeaways

- Practice with real problems solidifies understanding
- Use Python's built-in tools (Counter, set, etc.)
- Generators save memory for large sequences
- Decorators enable powerful patterns like memoization
- Design classes with clear responsibilities
`,
    },

    // Step 0-2-1: C++ Basics
    'step-0-2-1': {
        title: 'C++ Basics',
        content: `# C++ Basics

Master the fundamentals of C++ programming.

## Variables and Types

\`\`\`cpp
#include <iostream>
#include <string>

int main() {
    // Fundamental types
    int age = 25;
    double price = 19.99;
    char grade = 'A';
    bool isActive = true;
    
    // String (from <string> header)
    std::string name = "Marathon";
    
    // Type inference with auto
    auto count = 100;      // int
    auto rate = 3.14;      // double
    auto text = "Hello";   // const char*
    
    // Constants
    const int MAX_SIZE = 100;
    constexpr int ARRAY_SIZE = 50;  // Compile-time constant
    
    return 0;
}
\`\`\`

## Pointers vs References

\`\`\`cpp
int value = 42;

// Pointer: stores memory address
int* ptr = &value;
std::cout << *ptr;     // 42 (dereference)
std::cout << ptr;      // 0x7ffd... (address)

// Reference: alias for existing variable
int& ref = value;
std::cout << ref;      // 42
ref = 100;             // value is now 100

// Key differences:
// - References cannot be null
// - References cannot be reassigned
// - Pointers can point to different addresses
\`\`\`

## Control Flow

\`\`\`cpp
// If-else
int score = 85;
if (score >= 90) {
    std::cout << "A";
} else if (score >= 80) {
    std::cout << "B";
} else {
    std::cout << "C";
}

// Switch
char grade = 'B';
switch (grade) {
    case 'A':
        std::cout << "Excellent";
        break;
    case 'B':
        std::cout << "Good";
        break;
    default:
        std::cout << "Keep trying";
}

// Loops
for (int i = 0; i < 5; ++i) {
    std::cout << i << " ";
}

int j = 0;
while (j < 5) {
    std::cout << j++ << " ";
}
\`\`\`

## Functions

\`\`\`cpp
// Pass by value (copy)
void incrementValue(int x) {
    x++;  // Only changes local copy
}

// Pass by reference (modify original)
void incrementReference(int& x) {
    x++;  // Modifies original
}

// Pass by const reference (read-only, efficient)
void printVector(const std::vector<int>& vec) {
    for (int x : vec) {
        std::cout << x << " ";
    }
}

// Function overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
\`\`\`

## Arrays and Vectors

\`\`\`cpp
#include <vector>
#include <array>

// C-style array (fixed size, stack)
int arr[5] = {1, 2, 3, 4, 5};

// std::array (fixed size, safer)
std::array<int, 5> stdArr = {1, 2, 3, 4, 5};

// std::vector (dynamic size, heap)
std::vector<int> vec = {1, 2, 3};
vec.push_back(4);     // Add element
vec.pop_back();       // Remove last
vec.size();           // Get size
vec[0];               // Access element
\`\`\`

## Key Takeaways

| Feature | Python | C++ |
|---------|--------|-----|
| Typing | Dynamic | Static |
| Memory | Automatic | Manual/Smart |
| Speed | Slower | Faster |
| Syntax | Indentation | Braces |

- C++ is **statically typed** - declare types explicitly
- Use **references** when you want to modify arguments
- Use **const&** for read-only access to large objects
- Prefer **std::vector** over C-style arrays
`,
    },

    // Step 0-2-2: Memory Management
    'step-0-2-2': {
        title: 'Memory Management',
        content: `# C++ Memory Management

Understand stack, heap, and smart pointers for robust code.

## Stack vs Heap

\`\`\`cpp
void example() {
    // Stack allocation: automatic, fast, limited size
    int stackVar = 42;
    int stackArray[100];
    
    // Heap allocation: manual, slower, flexible size
    int* heapVar = new int(42);
    int* heapArray = new int[100];
    
    // Must manually free heap memory!
    delete heapVar;
    delete[] heapArray;
}
// stackVar automatically destroyed here
\`\`\`

## RAII (Resource Acquisition Is Initialization)

Core C++ idiom: tie resource lifetime to object lifetime.

\`\`\`cpp
class FileHandle {
    FILE* file;
public:
    FileHandle(const char* path) {
        file = fopen(path, "r");  // Acquire resource
    }
    
    ~FileHandle() {
        if (file) fclose(file);   // Release resource
    }
    
    // Prevent copying (Rule of Three)
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
};

void useFile() {
    FileHandle fh("data.txt");
    // File automatically closed when fh goes out of scope
}
\`\`\`

## Smart Pointers (Modern C++)

Automatic memory management without garbage collection:

### unique_ptr - Exclusive ownership
\`\`\`cpp
#include <memory>

// Create unique_ptr
std::unique_ptr<int> ptr = std::make_unique<int>(42);
std::cout << *ptr;  // 42

// Cannot copy, only move
// std::unique_ptr<int> ptr2 = ptr;  // Error!
std::unique_ptr<int> ptr2 = std::move(ptr);
// ptr is now nullptr

// Automatic cleanup when out of scope
\`\`\`

### shared_ptr - Shared ownership
\`\`\`cpp
std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
std::shared_ptr<int> ptr2 = ptr1;  // OK, shares ownership

std::cout << ptr1.use_count();  // 2

ptr1.reset();  // ptr1 releases, count = 1
// Memory freed when last shared_ptr destroyed
\`\`\`

### weak_ptr - Non-owning observer
\`\`\`cpp
std::shared_ptr<int> shared = std::make_shared<int>(42);
std::weak_ptr<int> weak = shared;

// Check if object still exists
if (auto locked = weak.lock()) {
    std::cout << *locked;  // Safe access
}

shared.reset();
// weak.lock() now returns nullptr
\`\`\`

## Common Memory Issues

\`\`\`cpp
// 1. Memory leak
void leak() {
    int* p = new int(42);
    // Forgot delete - memory leaked!
}

// 2. Double free
void doubleFree() {
    int* p = new int(42);
    delete p;
    delete p;  // Undefined behavior!
}

// 3. Dangling pointer
int* dangling() {
    int local = 42;
    return &local;  // local destroyed, pointer invalid!
}

// 4. Use after free
void useAfterFree() {
    int* p = new int(42);
    delete p;
    *p = 100;  // Undefined behavior!
}
\`\`\`

## Key Takeaways

| Smart Pointer | Ownership | Use Case |
|---------------|-----------|----------|
| unique_ptr | Exclusive | Single owner, default choice |
| shared_ptr | Shared | Multiple owners needed |
| weak_ptr | None | Break circular refs, observe |

- **Always prefer smart pointers** over raw new/delete
- Use **unique_ptr** by default
- Use **shared_ptr** when sharing is truly needed
- RAII ensures resources are always released
`,
    },

    // Step 0-2-3: OOP in C++
    'step-0-2-3': {
        title: 'OOP in C++',
        content: `# Object-Oriented Programming in C++

Classes, inheritance, and polymorphism in C++.

## Classes

\`\`\`cpp
class Rectangle {
private:
    double width;
    double height;

public:
    // Constructor
    Rectangle(double w, double h) : width(w), height(h) {}
    
    // Default constructor
    Rectangle() : width(0), height(0) {}
    
    // Getter methods
    double getWidth() const { return width; }
    double getHeight() const { return height; }
    
    // Setter methods
    void setWidth(double w) { width = w; }
    void setHeight(double h) { height = h; }
    
    // Member function
    double area() const { return width * height; }
};

// Usage
Rectangle rect(5.0, 3.0);
std::cout << rect.area();  // 15.0
\`\`\`

## Constructors and Destructors

\`\`\`cpp
class Resource {
    int* data;
    
public:
    // Constructor
    Resource(int size) {
        data = new int[size];
        std::cout << "Resource acquired\\n";
    }
    
    // Destructor
    ~Resource() {
        delete[] data;
        std::cout << "Resource released\\n";
    }
    
    // Copy constructor
    Resource(const Resource& other) {
        // Deep copy
        data = new int[/*size*/];
        // Copy data...
    }
    
    // Move constructor (C++11)
    Resource(Resource&& other) noexcept {
        data = other.data;
        other.data = nullptr;  // Leave source in valid state
    }
};
\`\`\`

## Inheritance

\`\`\`cpp
class Animal {
protected:
    std::string name;
    
public:
    Animal(const std::string& n) : name(n) {}
    
    virtual void speak() const {
        std::cout << name << " makes a sound\\n";
    }
    
    virtual ~Animal() = default;  // Virtual destructor
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}
    
    void speak() const override {
        std::cout << name << " says woof!\\n";
    }
};

class Cat : public Animal {
public:
    Cat(const std::string& n) : Animal(n) {}
    
    void speak() const override {
        std::cout << name << " says meow!\\n";
    }
};

// Polymorphism in action
void makeSpeak(const Animal& animal) {
    animal.speak();  // Calls correct version
}
\`\`\`

## Virtual Functions and Polymorphism

\`\`\`cpp
Animal* animals[] = {
    new Dog("Buddy"),
    new Cat("Whiskers")
};

for (Animal* a : animals) {
    a->speak();  // Dynamic dispatch
}
// Output:
// Buddy says woof!
// Whiskers says meow!
\`\`\`

## Abstract Classes

\`\`\`cpp
class Shape {
public:
    // Pure virtual function makes class abstract
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    
    double area() const override {
        return 3.14159 * radius * radius;
    }
    
    double perimeter() const override {
        return 2 * 3.14159 * radius;
    }
};
\`\`\`

## Key Takeaways

- Use **const** for methods that don't modify state
- Mark destructors **virtual** in base classes
- Use **override** keyword to catch errors
- Prefer **composition over inheritance**
- Use **= delete** to disable unwanted operations
`,
    },

    // Step 0-2-4: Modern C++
    'step-0-2-4': {
        title: 'Modern C++ (11/14/17)',
        content: `# Modern C++ Features

Essential C++11/14/17 features for writing better code.

## auto and Type Deduction

\`\`\`cpp
// Let compiler deduce type
auto x = 42;           // int
auto pi = 3.14;        // double
auto name = "Hello";   // const char*

// Useful with complex types
std::map<std::string, std::vector<int>> data;
for (auto& [key, value] : data) {  // C++17 structured bindings
    // key is std::string, value is vector<int>
}
\`\`\`

## Range-based for Loops

\`\`\`cpp
std::vector<int> nums = {1, 2, 3, 4, 5};

// By value (copy)
for (int n : nums) { }

// By reference (modify)
for (int& n : nums) {
    n *= 2;
}

// By const reference (read-only, efficient)
for (const int& n : nums) { }

// With auto
for (const auto& n : nums) { }
\`\`\`

## Lambda Expressions

\`\`\`cpp
// Basic lambda
auto add = [](int a, int b) { return a + b; };
std::cout << add(3, 4);  // 7

// Capture variables
int multiplier = 3;
auto mult = [multiplier](int x) { return x * multiplier; };

// Capture by reference
int sum = 0;
auto accumulate = [&sum](int x) { sum += x; };

// Capture all by value [=] or reference [&]
auto lambda = [=]() { return multiplier; };

// With STL algorithms
std::vector<int> nums = {3, 1, 4, 1, 5};
std::sort(nums.begin(), nums.end(), 
    [](int a, int b) { return a > b; });  // Descending
\`\`\`

## Move Semantics

\`\`\`cpp
class BigData {
    std::vector<int> data;
public:
    // Move constructor
    BigData(BigData&& other) noexcept 
        : data(std::move(other.data)) {}
    
    // Move assignment
    BigData& operator=(BigData&& other) noexcept {
        data = std::move(other.data);
        return *this;
    }
};

// std::move casts to rvalue reference
std::vector<int> v1 = {1, 2, 3};
std::vector<int> v2 = std::move(v1);
// v1 is now empty, v2 has the data
\`\`\`

## nullptr and constexpr

\`\`\`cpp
// nullptr replaces NULL
int* ptr = nullptr;

// constexpr for compile-time computation
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

constexpr int result = factorial(5);  // Computed at compile time!
\`\`\`

## Optional (C++17)

\`\`\`cpp
#include <optional>

std::optional<int> findIndex(const std::vector<int>& v, int target) {
    for (size_t i = 0; i < v.size(); ++i) {
        if (v[i] == target) return i;
    }
    return std::nullopt;
}

auto result = findIndex({1, 2, 3}, 2);
if (result) {
    std::cout << "Found at: " << *result;
}
\`\`\`

## Key Takeaways

| Feature | Benefit |
|---------|---------|
| auto | Less typing, safer refactoring |
| Lambda | Inline functions, closures |
| Move | Avoid expensive copies |
| optional | Safe nullable values |
| constexpr | Compile-time computation |

- Use **auto** to simplify complex type declarations
- Use **lambdas** with STL algorithms
- Use **move** to transfer ownership efficiently
- Use **nullptr** instead of NULL
`,
    },

    // Step 0-2-5: STL Essentials
    'step-0-2-5': {
        title: 'STL Essentials',
        content: `# STL Essentials

Master the C++ Standard Template Library.

## Containers

### vector - Dynamic Array
\`\`\`cpp
#include <vector>

std::vector<int> v = {1, 2, 3};
v.push_back(4);        // Add to end: O(1) amortized
v.pop_back();          // Remove last: O(1)
v[0];                  // Access: O(1)
v.size();              // Size: O(1)
v.empty();             // Check empty
v.clear();             // Remove all
\`\`\`

### map - Ordered Key-Value (Red-Black Tree)
\`\`\`cpp
#include <map>

std::map<std::string, int> ages;
ages["Alice"] = 25;           // Insert: O(log n)
ages["Bob"] = 30;
ages.count("Alice");          // Check exists: O(log n)
ages.erase("Bob");            // Remove: O(log n)

for (const auto& [name, age] : ages) {
    std::cout << name << ": " << age << "\\n";
}
\`\`\`

### unordered_map - Hash Table
\`\`\`cpp
#include <unordered_map>

std::unordered_map<std::string, int> ages;
ages["Alice"] = 25;           // Insert: O(1) average
ages.find("Alice");           // Find: O(1) average
// Faster than map, but no ordering
\`\`\`

### set / unordered_set
\`\`\`cpp
#include <set>
#include <unordered_set>

std::set<int> s = {3, 1, 4, 1, 5};  // {1, 3, 4, 5} - sorted, unique
s.insert(2);                        // O(log n)
s.count(3);                         // O(log n)

std::unordered_set<int> us;         // Hash-based, O(1) operations
\`\`\`

## Algorithms

\`\`\`cpp
#include <algorithm>
#include <numeric>

std::vector<int> v = {5, 2, 8, 1, 9};

// Sort
std::sort(v.begin(), v.end());              // Ascending
std::sort(v.begin(), v.end(), std::greater<int>());  // Descending

// Find
auto it = std::find(v.begin(), v.end(), 8);
if (it != v.end()) { /* found */ }

// Binary search (on sorted)
bool found = std::binary_search(v.begin(), v.end(), 8);

// Min/Max
auto maxIt = std::max_element(v.begin(), v.end());
int minVal = *std::min_element(v.begin(), v.end());

// Accumulate (sum)
int sum = std::accumulate(v.begin(), v.end(), 0);

// Transform
std::transform(v.begin(), v.end(), v.begin(),
    [](int x) { return x * 2; });

// Remove-erase idiom
v.erase(std::remove(v.begin(), v.end(), 5), v.end());
\`\`\`

## Iterators

\`\`\`cpp
std::vector<int> v = {1, 2, 3, 4, 5};

// Forward iteration
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " ";
}

// Reverse iteration
for (auto it = v.rbegin(); it != v.rend(); ++it) {
    std::cout << *it << " ";
}

// Const iteration (read-only)
for (auto it = v.cbegin(); it != v.cend(); ++it) {
    // *it is const
}
\`\`\`

## Complexity Comparison

| Container | Insert | Access | Search | Delete |
|-----------|--------|--------|--------|--------|
| vector | O(1)* | O(1) | O(n) | O(n) |
| list | O(1) | O(n) | O(n) | O(1) |
| map | O(log n) | O(log n) | O(log n) | O(log n) |
| unordered_map | O(1)** | O(1)** | O(1)** | O(1)** |

*Amortized, **Average case

## Key Takeaways

- Use **vector** as default container
- Use **unordered_map** for fast key-value lookup
- Use **map** when you need sorted keys
- Prefer **algorithms** over manual loops
- Understand iterator categories and validity
`,
    },

    // Step 0-2-6: C++ Exercises
    'step-0-2-6': {
        title: 'C++ Exercises',
        content: `# C++ Mastery Exercises

Practice problems to reinforce C++ concepts.

## Exercise 1: Smart Pointer Practice

Implement a function using smart pointers:

\`\`\`cpp
#include <memory>
#include <iostream>

class Node {
public:
    int value;
    std::unique_ptr<Node> next;
    
    Node(int v) : value(v), next(nullptr) {}
};

class LinkedList {
    std::unique_ptr<Node> head;
    
public:
    void push_front(int value) {
        auto newNode = std::make_unique<Node>(value);
        newNode->next = std::move(head);
        head = std::move(newNode);
    }
    
    void print() const {
        Node* current = head.get();
        while (current) {
            std::cout << current->value << " -> ";
            current = current->next.get();
        }
        std::cout << "nullptr\\n";
    }
};

// Usage
LinkedList list;
list.push_front(3);
list.push_front(2);
list.push_front(1);
list.print();  // 1 -> 2 -> 3 -> nullptr
\`\`\`

## Exercise 2: Template Function

Create a generic max function:

\`\`\`cpp
template<typename T>
T myMax(T a, T b) {
    return (a > b) ? a : b;
}

// With multiple types
template<typename T, typename U>
auto myMax2(T a, U b) -> decltype(a > b ? a : b) {
    return (a > b) ? a : b;
}

// Usage
std::cout << myMax(5, 3);         // 5
std::cout << myMax(3.14, 2.71);   // 3.14
std::cout << myMax2(5, 3.14);     // 5
\`\`\`

## Exercise 3: RAII File Handler

\`\`\`cpp
#include <fstream>
#include <stdexcept>

class SafeFile {
    std::ifstream file;
    
public:
    SafeFile(const std::string& path) : file(path) {
        if (!file.is_open()) {
            throw std::runtime_error("Cannot open file");
        }
    }
    
    std::string readLine() {
        std::string line;
        std::getline(file, line);
        return line;
    }
    
    bool hasMore() const {
        return file.good();
    }
    
    // Destructor closes file automatically
    ~SafeFile() = default;
};
\`\`\`

## Exercise 4: STL Algorithm Challenge

Find pairs that sum to target:

\`\`\`cpp
#include <vector>
#include <unordered_set>
#include <utility>

std::vector<std::pair<int, int>> findPairs(
    const std::vector<int>& nums, int target) {
    
    std::vector<std::pair<int, int>> result;
    std::unordered_set<int> seen;
    
    for (int num : nums) {
        int complement = target - num;
        if (seen.count(complement)) {
            result.emplace_back(complement, num);
        }
        seen.insert(num);
    }
    
    return result;
}

// Usage
auto pairs = findPairs({1, 2, 3, 4, 5}, 6);
// [(1, 5), (2, 4)]
\`\`\`

## Exercise 5: Move Semantics

Implement efficient string concatenation:

\`\`\`cpp
class StringBuilder {
    std::string data;
    
public:
    StringBuilder& append(const std::string& s) {
        data += s;
        return *this;
    }
    
    // Move the result out (efficient)
    std::string build() && {
        return std::move(data);
    }
};

// Usage
std::string result = StringBuilder()
    .append("Hello, ")
    .append("World!")
    .build();
\`\`\`

## Key Takeaways

- Practice smart pointers until they feel natural
- Templates enable generic, reusable code
- RAII ensures resources are always cleaned up
- STL algorithms make code cleaner and safer
- Move semantics avoid unnecessary copies
`,
    },

    // Step 0-3-1: Project P0a
    'step-0-3-1': {
        title: 'Project P0a: Python Toolkit',
        content: `# Project P0a: Python Toolkit

Build a CLI utility demonstrating Python mastery.

## Project Overview

Create a command-line task manager that demonstrates:
- Argument parsing with argparse
- File I/O (JSON storage)
- Decorators (timing, logging)
- Unit tests with pytest

## Implementation

### Task Manager CLI

\`\`\`python
#!/usr/bin/env python3
"""A simple task manager CLI."""

import argparse
import json
import functools
import time
from pathlib import Path
from datetime import datetime
from typing import List, Optional

TASKS_FILE = Path.home() / ".tasks.json"

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"[{func.__name__}] completed in {elapsed:.3f}s")
        return result
    return wrapper

def load_tasks() -> List[dict]:
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text())
    return []

def save_tasks(tasks: List[dict]) -> None:
    TASKS_FILE.write_text(json.dumps(tasks, indent=2))

@timing_decorator
def add_task(title: str, priority: str = "medium") -> None:
    tasks = load_tasks()
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "priority": priority,
        "completed": False,
        "created": datetime.now().isoformat()
    }
    tasks.append(task)
    save_tasks(tasks)
    print(f"Added task #{task['id']}: {title}")

@timing_decorator
def list_tasks(show_completed: bool = False) -> None:
    tasks = load_tasks()
    for task in tasks:
        if not show_completed and task["completed"]:
            continue
        status = "✓" if task["completed"] else "○"
        print(f"[{status}] #{task['id']} [{task['priority']}] {task['title']}")

def main():
    parser = argparse.ArgumentParser(description="Task Manager")
    subparsers = parser.add_subparsers(dest="command")
    
    # Add command
    add_parser = subparsers.add_parser("add", help="Add a task")
    add_parser.add_argument("title", help="Task title")
    add_parser.add_argument("-p", "--priority", 
        choices=["low", "medium", "high"], default="medium")
    
    # List command
    list_parser = subparsers.add_parser("list", help="List tasks")
    list_parser.add_argument("-a", "--all", action="store_true")
    
    args = parser.parse_args()
    
    if args.command == "add":
        add_task(args.title, args.priority)
    elif args.command == "list":
        list_tasks(args.all)

if __name__ == "__main__":
    main()
\`\`\`

### Tests

\`\`\`python
# test_tasks.py
import pytest
from tasks import add_task, load_tasks, TASKS_FILE

@pytest.fixture
def clean_tasks(tmp_path, monkeypatch):
    test_file = tmp_path / "tasks.json"
    monkeypatch.setattr("tasks.TASKS_FILE", test_file)
    yield test_file

def test_add_task(clean_tasks):
    add_task("Test task", "high")
    tasks = load_tasks()
    assert len(tasks) == 1
    assert tasks[0]["title"] == "Test task"
    assert tasks[0]["priority"] == "high"
\`\`\`

## Extension Challenges

1. Add due dates and reminders
2. Implement task categories/tags
3. Add search functionality
4. Export to different formats (CSV, Markdown)

## Key Takeaways

- argparse makes CLI creation easy
- JSON provides simple file-based storage
- Decorators add cross-cutting concerns cleanly
- pytest fixtures enable isolated testing
`,
    },

    // Step 0-3-2: Project P0b
    'step-0-3-2': {
        title: 'Project P0b: C++ Fundamentals Lab',
        content: `# Project P0b: C++ Fundamentals Lab

Memory management exercises with smart pointers.

## Project Overview

Implement a memory-safe dynamic array demonstrating:
- Smart pointer usage
- RAII principles
- Move semantics
- Valgrind analysis

## Implementation

### Smart Array Class

\`\`\`cpp
#include <memory>
#include <stdexcept>
#include <iostream>

template<typename T>
class SmartArray {
    std::unique_ptr<T[]> data;
    size_t size_;
    size_t capacity_;

public:
    SmartArray() : data(nullptr), size_(0), capacity_(0) {}
    
    explicit SmartArray(size_t initial_capacity) 
        : data(std::make_unique<T[]>(initial_capacity)),
          size_(0), 
          capacity_(initial_capacity) {}
    
    // Move constructor
    SmartArray(SmartArray&& other) noexcept
        : data(std::move(other.data)),
          size_(other.size_),
          capacity_(other.capacity_) {
        other.size_ = 0;
        other.capacity_ = 0;
    }
    
    // Move assignment
    SmartArray& operator=(SmartArray&& other) noexcept {
        if (this != &other) {
            data = std::move(other.data);
            size_ = other.size_;
            capacity_ = other.capacity_;
            other.size_ = 0;
            other.capacity_ = 0;
        }
        return *this;
    }
    
    void push_back(const T& value) {
        if (size_ >= capacity_) {
            grow();
        }
        data[size_++] = value;
    }
    
    T& operator[](size_t index) {
        if (index >= size_) {
            throw std::out_of_range("Index out of bounds");
        }
        return data[index];
    }
    
    size_t size() const { return size_; }
    size_t capacity() const { return capacity_; }

private:
    void grow() {
        size_t new_capacity = capacity_ == 0 ? 1 : capacity_ * 2;
        auto new_data = std::make_unique<T[]>(new_capacity);
        
        for (size_t i = 0; i < size_; ++i) {
            new_data[i] = std::move(data[i]);
        }
        
        data = std::move(new_data);
        capacity_ = new_capacity;
    }
};

int main() {
    SmartArray<int> arr;
    
    for (int i = 0; i < 10; ++i) {
        arr.push_back(i * 10);
    }
    
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\\nSize: " << arr.size() 
              << ", Capacity: " << arr.capacity() << "\\n";
    
    return 0;
}
\`\`\`

### Valgrind Analysis

\`\`\`bash
# Compile with debug symbols
g++ -g -o smart_array smart_array.cpp

# Run with valgrind
valgrind --leak-check=full ./smart_array

# Expected output (no leaks):
# ==12345== HEAP SUMMARY:
# ==12345==   in use at exit: 0 bytes in 0 blocks
# ==12345== All heap blocks were freed -- no leaks are possible
\`\`\`

## Extension Challenges

1. Add iterator support
2. Implement emplace_back
3. Add shrink_to_fit
4. Compare performance with std::vector

## Key Takeaways

- unique_ptr manages ownership automatically
- Move semantics enable efficient transfers
- RAII ensures no memory leaks
- Valgrind verifies memory correctness
`,
    },
};

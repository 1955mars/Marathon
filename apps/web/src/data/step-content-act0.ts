/**
 * Act 0: Language Foundations - Step Content
 * Python and C++ mastery content for curriculum steps
 */

export const act0Content: Record<string, { title: string; content: string }> = {
    // Step 0-1-1: Python Basics
    'step-0-1-1': {
        title: 'Python Basics',
        content: `# Python Basics

## Why This Matters

Python is one of the **most popular languages** for software interviews and production code. Mastering these fundamentals is essential for:

- **Coding interviews** (most common language choice)
- **Rapid prototyping** and scripting
- **Data science** and machine learning
- **Backend development** with frameworks like Django/FastAPI

---

## What is a Variable?

A **variable** is a named container that stores a value in the computer's memory. Think of it as a labeled box where you can put data and retrieve it later using the label.

\`\`\`python
# Creating a variable is called "assignment"
# The = sign means "store the value on the right into the name on the left"
message = "Hello"    # Store "Hello" in a box labeled 'message'
count = 10           # Store 10 in a box labeled 'count'

# Later, you can use the variable to get the value
print(message)       # Prints: Hello
print(count + 5)     # Prints: 15
\`\`\`

**Variable naming rules:**
- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive (\`Name\` and \`name\` are different)
- Use **snake_case** by convention: \`user_name\`, \`total_count\`

---

## What is a Data Type?

A **data type** defines what kind of value a variable holds and what operations you can perform on it. Python has several built-in types:

| Type | What It Stores | Example |
|------|---------------|---------|
| \`int\` | Whole numbers | \`42\`, \`-7\`, \`0\` |
| \`float\` | Decimal numbers | \`3.14\`, \`-0.5\` |
| \`str\` | Text (strings) | \`"Hello"\`, \`'World'\` |
| \`bool\` | True/False | \`True\`, \`False\` |
| \`None\` | No value | \`None\` |

Python is **dynamically typed** - you don't declare types explicitly, Python figures them out:

\`\`\`python
# Python automatically determines the type
name = "Marathon"      # str (string/text)
age = 25               # int (integer/whole number)
price = 19.99          # float (decimal number)
is_active = True       # bool (boolean/true or false)
nothing = None         # NoneType (represents "no value")

# Check a variable's type
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>

# Convert between types (called "type casting")
str_num = "42"
num = int(str_num)     # Convert string to int: 42
pi_str = str(3.14)     # Convert float to string: "3.14"
\`\`\`

---

## What is a String?

A **string** is a sequence of characters (text). In Python, you create strings using quotes - single \`'\` or double \`"\` quotes work the same:

\`\`\`python
message = "Hello, World!"
name = 'Python'
\`\`\`

**Why strings matter:** Almost every program deals with text - user input, file contents, API responses, etc.

### String Operations

\`\`\`python
message = "Hello, World!"

# Get the length (number of characters)
print(len(message))          # 13

# Change case
print(message.upper())       # "HELLO, WORLD!"
print(message.lower())       # "hello, world!"

# Split into parts
print(message.split(", "))   # ["Hello", "World!"]
\`\`\`

### String Formatting (F-strings)

F-strings let you embed variables directly in text - this is the modern, preferred way:

\`\`\`python
name = "Alice"
age = 30
print(f"{name} is {age} years old")  # "Alice is 30 years old"
\`\`\`

### String Indexing and Slicing

Strings are sequences, so you can access individual characters by position (starting from 0):

\`\`\`python
text = "Python"
#       012345   <- positions (indices)

print(text[0])       # 'P' (first character)
print(text[5])       # 'n' (last character)
print(text[-1])      # 'n' (last character using negative index)

# Slicing: get a substring [start:end]
print(text[0:3])     # 'Pyt' (characters 0, 1, 2)
print(text[2:])      # 'thon' (from index 2 to end)
print(text[::-1])    # 'nohtyP' (reverse the string)
\`\`\`

### Common String Methods for Interviews

\`\`\`python
s = "  hello world  "
s.strip()            # "hello world" (remove surrounding whitespace)
s.replace("o", "0")  # "hell0 w0rld" (replace characters)
"hello".isalpha()    # True (only letters?)
"123".isdigit()      # True (only digits?)
\`\`\`

---

## What is Control Flow?

**Control flow** determines the order in which your code executes. By default, Python runs code line by line from top to bottom. Control flow statements let you:

- **Make decisions** - Run different code based on conditions (if/else)
- **Repeat actions** - Execute code multiple times (loops)
- **Skip or stop** - Jump over or exit from loops (break/continue)

### Conditional Statements (if/elif/else)

A **conditional statement** runs code only when a condition is true. Think of it as a fork in the road - you take different paths based on the situation.

\`\`\`python
score = 85

# Check conditions in order - only ONE block runs
if score >= 90:          # Is score >= 90? No (85 >= 90 is False)
    grade = "A"
elif score >= 80:        # Is score >= 80? Yes! (85 >= 80 is True)
    grade = "B"          # This runs, then we skip the rest
elif score >= 70:
    grade = "C"
else:                    # Runs if ALL conditions above were False
    grade = "F"

# Ternary operator - one-line if/else
status = "pass" if score >= 60 else "fail"
\`\`\`

### What is a Loop?

A **loop** repeats a block of code multiple times. Without loops, you'd have to copy-paste code - loops save you from that.

**For loop** - Use when you know how many times to repeat, or when iterating over a collection:

\`\`\`python
# range(5) generates: 0, 1, 2, 3, 4
for i in range(5):
    print(i)  # Runs 5 times

# range(start, stop, step)
for i in range(2, 10, 2):
    print(i)  # 2, 4, 6, 8

# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# enumerate() - get both index AND value
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")  # 0: apple, 1: banana, etc.
\`\`\`

**While loop** - Use when you don't know how many times to repeat, but you know when to stop:

\`\`\`python
count = 0
while count < 5:     # Keep going while condition is True
    print(count)
    count += 1       # Don't forget to update, or infinite loop!
\`\`\`

### break and continue

\`\`\`python
for i in range(10):
    if i == 3:
        continue  # Skip the rest of this iteration, go to next
    if i == 7:
        break     # Exit the loop entirely
    print(i)      # Prints: 0, 1, 2, 4, 5, 6
\`\`\`

---

## What is a Function?

A **function** is a reusable block of code that performs a specific task. Functions help you:

- **Avoid repetition** - Write once, use many times
- **Organize code** - Break complex problems into smaller pieces
- **Abstract complexity** - Hide details behind a simple name

### Anatomy of a Function

\`\`\`python
def greet(name):           # 'def' defines a function, 'name' is a parameter
    """Say hello to someone."""  # Docstring describes what it does
    return f"Hello, {name}!"     # 'return' sends back a result

# Calling the function
message = greet("Alice")   # "Alice" is an argument passed to parameter 'name'
print(message)             # "Hello, Alice!"
\`\`\`

### Parameters vs Arguments

- **Parameter**: The variable name in the function definition (like a placeholder)
- **Argument**: The actual value you pass when calling the function

### Default Parameters

\`\`\`python
def greet(name, greeting="Hello"):  # greeting has a default value
    return f"{greeting}, {name}!"

print(greet("Alice"))           # "Hello, Alice!" (uses default)
print(greet("Bob", "Hi"))       # "Hi, Bob!" (overrides default)
\`\`\`

### Returning Multiple Values

Python functions can return multiple values as a tuple:

\`\`\`python
def get_stats(numbers):
    minimum = min(numbers)
    maximum = max(numbers)
    average = sum(numbers) / len(numbers)
    return minimum, maximum, average  # Returns a tuple

# Unpack the returned values
low, high, avg = get_stats([1, 2, 3, 4, 5])

minimum, maximum, average = get_stats([1, 2, 3, 4, 5])

# Docstrings
def calculate_area(length: float, width: float) -> float:
    """
    Calculate the area of a rectangle.
    
    Args:
        length: The length of the rectangle
        width: The width of the rectangle
        
    Returns:
        The area of the rectangle
    """
    return length * width
\`\`\`

---

## Key Takeaways

✅ Python is **dynamically typed** - no type declarations needed  
✅ **F-strings** are the modern way to format strings  
✅ Use **enumerate()** to get index in loops  
✅ Functions can return **multiple values** via tuples  
✅ Always write **docstrings** for clear documentation
`,
    },

    // Step 0-1-2: Data Structures in Python
    'step-0-1-2': {
        title: 'Data Structures in Python',
        content: `# Data Structures in Python

## Why This Matters

Python's built-in data structures are **interview essentials**. Understanding their time complexities and use cases will help you:

- Choose the **right tool** for each problem
- Write **efficient** solutions
- Communicate **trade-offs** clearly

---

## What is a Data Structure?

A **data structure** is a way of organizing and storing data so that it can be accessed and modified efficiently. Different structures are optimized for different operations.

Think of it like organizing items in your home:
- A **list** is like a numbered shelf - items have positions
- A **dictionary** is like a phone book - look up by name
- A **set** is like a bag of unique marbles - no duplicates allowed

---

## Lists (Arrays)

A **list** is an ordered, mutable collection of items. Items are stored in sequence and accessed by their position (index).

**When to use lists:**
- When order matters
- When you need to access items by position
- When duplicates are allowed

\`\`\`python
# Creating lists
nums = [1, 2, 3, 4, 5]       # A list of integers
empty = []                    # An empty list
mixed = [1, "hello", 3.14]    # Lists can hold different types

# Accessing items by index (0-based)
nums[0]        # 1 (first item)
nums[-1]       # 5 (last item)
nums[1:4]      # [2, 3, 4] (slice from index 1 to 3)

# Modifying lists
nums.append(6)      # Add to end: O(1) - fast!
nums.insert(0, 0)   # Add at position: O(n) - slow (shifts everything)
nums.pop()          # Remove last: O(1) - fast!
nums.pop(0)         # Remove first: O(n) - slow (shifts everything)
nums.remove(3)      # Remove first occurrence of value: O(n)

# List comprehension - a Pythonic way to create lists
squares = [x**2 for x in range(10)]        # [0, 1, 4, 9, 16, ...]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]

# Sorting
nums.sort()                    # In-place, O(n log n)
sorted_nums = sorted(nums)     # Returns new list
nums.sort(reverse=True)        # Descending
nums.sort(key=lambda x: -x)    # Custom key
\`\`\`

---

## Dictionaries (Hash Maps)

A **dictionary** (or **hash map**) stores key-value pairs. You look up values by their key, like looking up a word in a dictionary to find its definition.

**When to use dictionaries:**
- When you need fast lookups by a unique key
- When storing related pieces of information together
- When counting occurrences (e.g., word frequency)

**Time complexity:** O(1) average for get/set/delete - this is why dicts are *essential* for interviews!

\`\`\`python
# Creating dictionaries
person = {"name": "Alice", "age": 30}  # Key: value pairs
empty = {}

# Accessing values by key
person["name"]              # "Alice"
person.get("name")          # "Alice" (same result)
person.get("email", "N/A")  # "N/A" (returns default if key missing)

# Adding and modifying
person["email"] = "alice@example.com"  # Add new key or update
del person["age"]                       # Delete a key
person.pop("name", None)                # Safe delete (no error if missing)

# Iterating
for key in person:              # Iterate over keys
    print(key)
for key, value in person.items():  # Iterate over key-value pairs
    print(f"{key}: {value}")

# Dict comprehension
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Checking if key exists
if "name" in person:
    print(person["name"])

# defaultdict - auto-initializes missing keys (very useful!)
from collections import defaultdict
word_count = defaultdict(int)  # Missing keys default to 0
for word in ["a", "b", "a"]:
    word_count[word] += 1      # No KeyError! Result: {"a": 2, "b": 1}
\`\`\`

---

## Sets

A **set** is an unordered collection of **unique** elements. Think of it as a bag where each item can only appear once.

**When to use sets:**
- When you need to remove duplicates
- When you need fast membership checking ("Is X in the collection?")
- When you need mathematical set operations (union, intersection)

**Time complexity:** O(1) for add/remove/contains!

\`\`\`python
# Creating sets
unique = {1, 2, 3, 3, 3}  # Duplicates removed: {1, 2, 3}
from_list = set([1, 2, 2, 3])

# Operations
unique.add(4)        # Add element
unique.remove(1)     # Remove (raises if missing)
unique.discard(99)   # Remove (no error if missing)

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}

a | b    # Union: {1, 2, 3, 4}
a & b    # Intersection: {2, 3}
a - b    # Difference: {1}
a ^ b    # Symmetric difference: {1, 4}

# Membership check O(1)
if 2 in unique:
    print("Found!")
\`\`\`

---

## Tuples

A **tuple** is an ordered, **immutable** (unchangeable) sequence of elements. Once created, you cannot add, remove, or modify elements.

**When to use tuples:**
- When data shouldn't change (coordinates, RGB colors)
- As dictionary keys (lists can't be keys because they're mutable)
- Returning multiple values from functions

\`\`\`python
# Creating tuples
point = (3, 4)         # A tuple of two integers
single = (42,)         # Note the comma! Without it, just parentheses
empty = ()

# Unpacking
x, y = point
first, *rest = (1, 2, 3, 4)  # first=1, rest=[2,3,4]

# Named tuples (better readability)
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)  # 3, 4
\`\`\`

---

## Time Complexity Summary

| Operation | List | Dict | Set |
|-----------|------|------|-----|
| Access | O(1) | O(1) | N/A |
| Search | O(n) | O(1) | O(1) |
| Insert | O(n)* | O(1) | O(1) |
| Delete | O(n) | O(1) | O(1) |
| Append | O(1) | O(1) | O(1) |

*O(1) for append, O(n) for insert at index

---

## Key Takeaways

✅ **Lists** for ordered sequences with fast append  
✅ **Dicts** for key-value lookups (most used in interviews!)  
✅ **Sets** for uniqueness and O(1) membership  
✅ **Tuples** for immutable sequences and dict keys  
✅ Use **defaultdict** to avoid KeyError checks

---

## Python vs C++ Collections

| Python | C++ Equivalent | Key Difference |
|--------|----------------|----------------|
| \`list\` | \`std::vector\` | Python: dynamic types, C++: single type |
| \`dict\` | \`std::unordered_map\` | Python: insertion order (3.7+), C++: no order guarantee |
| \`set\` | \`std::unordered_set\` | Similar O(1) membership |
| \`tuple\` | \`std::tuple\` | Python: heterogeneous, C++: fixed types |
| \`deque\` | \`std::deque\` | Similar double-ended queue |
| \`heapq\` | \`std::priority_queue\` | Python: min-heap, C++: max-heap by default |
`,
    },

    // Step 0-1-3: OOP in Python
    'step-0-1-3': {
        title: 'OOP in Python',
        content: `# Object-Oriented Programming in Python

## Why This Matters

OOP in Python is essential for:

- **Clean code** organization
- **Design patterns** implementation
- **Framework usage** (Django, Flask, FastAPI)
- **Interview questions** on class design

---

## What is a Class?

A **class** is a blueprint or template for creating objects. It defines what data an object holds (attributes) and what it can do (methods).

Think of it like a cookie cutter - the class is the cutter shape, and each cookie you make is an **object** (or **instance**).

\`\`\`python
class Dog:
    # Class attribute - shared by ALL dogs
    species = "Canis familiaris"
    
    # Constructor - called when you create a new Dog
    def __init__(self, name: str, age: int):
        # Instance attributes - unique to each dog
        self.name = name
        self.age = age
    
    # Instance method - something a dog can do
    def bark(self) -> str:
        return f"{self.name} says woof!"
    
    # Special method for string representation
    def __repr__(self) -> str:
        return f"Dog(name='{self.name}', age={self.age})"

# Creating objects (instances) from the class
buddy = Dog("Buddy", 3)    # Calls __init__ with name="Buddy", age=3
max = Dog("Max", 5)

print(buddy.name)        # "Buddy" - instance attribute
print(buddy.bark())      # "Buddy says woof!" - instance method
print(Dog.species)       # "Canis familiaris" - class attribute
\`\`\`

### Key OOP Terms

| Term | Meaning |
|------|---------|
| **Class** | Blueprint for objects |
| **Object/Instance** | A specific thing created from a class |
| **Attribute** | Data stored in an object |
| **Method** | Function that belongs to a class |
| **self** | Reference to the current instance |
| **\`__init__\`** | Constructor, runs when object is created |

---

## What is Encapsulation?

**Encapsulation** means bundling data and methods together, and controlling access to the internal state. It protects your data from accidental modification.

In Python, encapsulation is by *convention*, not enforced:
- \`public\` - No underscore: \`self.name\`
- \`_protected\` - Single underscore: \`self._internal\` (convention: "don't touch unless you know what you're doing")
- \`__private\` - Double underscore: \`self.__secret\` (name mangling makes it harder to access)

\`\`\`python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner         # Public
        self._balance = balance    # Protected (convention)
        self.__id = 12345          # Private (name mangled)
    
    # Property - controlled access to _balance
    @property
    def balance(self) -> float:
        """Getter - called when you read account.balance"""
        return self._balance
    
    @balance.setter
    def balance(self, value: float):
        """Setter - called when you write account.balance = x"""
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = value
    
    def deposit(self, amount: float):
        if amount > 0:
            self._balance += amount
    
    def withdraw(self, amount: float) -> bool:
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False

account = BankAccount("Alice", 100)
account.deposit(50)
print(account.balance)     # 150 (uses @property getter)
account.balance = 200      # Uses @balance.setter
# account.balance = -50    # Would raise ValueError!
\`\`\`

---

## What is Inheritance?

**Inheritance** lets a class (child) inherit attributes and methods from another class (parent). This enables code reuse and creates "is-a" relationships.

\`\`\`python
# Parent class (also called base class or superclass)
class Animal:
    def __init__(self, name: str):
        self.name = name
    
    def speak(self) -> str:
        raise NotImplementedError("Subclass must implement")

# Child classes (also called derived classes or subclasses)
class Dog(Animal):          # Dog inherits from Animal
    def speak(self) -> str:
        return "Woof!"

class Cat(Animal):          # Cat inherits from Animal
    def speak(self) -> str:
        return "Meow!"

# Polymorphism
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(f"{animal.name}: {animal.speak()}")
# Buddy: Woof!
# Whiskers: Meow!

# Check inheritance
print(isinstance(Dog("Rex"), Animal))  # True
print(issubclass(Dog, Animal))         # True
\`\`\`

---

## Special (Dunder) Methods

\`\`\`python
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y
    
    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other: "Vector") -> bool:
        return self.x == other.x and self.y == other.y
    
    def __len__(self) -> int:
        return int((self.x**2 + self.y**2)**0.5)
    
    def __getitem__(self, index: int) -> float:
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError("Vector index out of range")

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)      # Vector(4, 6)
print(v1 == v2)     # False
print(len(v1))      # 5
print(v1[0])        # 3
\`\`\`

---

## Abstract Base Classes

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height
    
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# shape = Shape()  # TypeError: Can't instantiate abstract class
rect = Rectangle(5, 3)
print(rect.area())  # 15
\`\`\`

---

## Common Dunder Methods

| Method | Purpose | Example |
|--------|---------|---------|
| \`__init__\` | Constructor | \`obj = Class()\` |
| \`__repr__\` | Debug string | \`repr(obj)\` |
| \`__str__\` | User string | \`str(obj)\` |
| \`__eq__\` | Equality | \`obj1 == obj2\` |
| \`__hash__\` | Hash (for dict/set) | \`hash(obj)\` |
| \`__len__\` | Length | \`len(obj)\` |
| \`__getitem__\` | Index access | \`obj[i]\` |
| \`__iter__\` | Iteration | \`for x in obj\` |
| \`__call__\` | Call as function | \`obj()\` |

---

## Key Takeaways

✅ Use **@property** for controlled attribute access  
✅ Use **inheritance** to share behavior and enable polymorphism  
✅ **Dunder methods** make your classes Pythonic  
✅ Use **ABC** for interfaces that must be implemented  
✅ Prefer **composition over inheritance** for flexibility

---

## Python vs C++ OOP

| Feature | Python | C++ |
|---------|--------|-----|
| **Access control** | Convention (\`_\`, \`__\`) | Keywords (\`private\`, \`protected\`, \`public\`) |
| **Multiple inheritance** | Yes (MRO resolves order) | Yes (diamond problem needs \`virtual\`) |
| **Interfaces** | \`ABC\` with \`@abstractmethod\` | Pure virtual classes (\`= 0\`) |
| **Constructors** | \`__init__\` | Same name as class, overloadable |
| **Destructors** | \`__del__\` (GC timing) | \`~ClassName()\` (deterministic) |
| **Method binding** | All virtual by default | Explicit \`virtual\` keyword needed |
`,
    },

    // Step 0-1-4: Functional Python
    'step-0-1-4': {
        title: 'Functional Python',
        content: `# Functional Python

## Why This Matters

Functional programming concepts are essential for:

- Writing **clean, composable** code
- Processing **large datasets** efficiently with generators
- **Interview problems** that require elegant transformations
- Understanding **modern Python** libraries like pandas and itertools

---

## What is a Lambda Function?

A **lambda function** (also called an anonymous function) is a small, one-line function without a name. Use lambdas for simple operations where defining a full function would be overkill.

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

## What are Higher-Order Functions?

A **higher-order function** is a function that either:
1. Takes another function as an argument, OR
2. Returns a function as its result

Python's built-in \`map()\`, \`filter()\`, and \`reduce()\` are higher-order functions - they take a function and apply it to data.

### map() - Transform each element

\`map(function, iterable)\` applies a function to every item and returns the results.

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Square each number
squares = list(map(lambda x: x**2, numbers))
# [1, 4, 9, 16, 25]

# Convert to strings
strings = list(map(str, numbers))
# ['1', '2', '3', '4', '5']
\`\`\`

### filter() - Keep elements matching a condition

\`filter(function, iterable)\` keeps only items where the function returns True.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only evens
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4, 6, 8, 10]

# Keep positive numbers
positives = list(filter(lambda x: x > 0, [-2, -1, 0, 1, 2]))
# [1, 2]
\`\`\`

### reduce() - Combine all elements into one

\`reduce(function, iterable)\` repeatedly applies a function to pairs of elements until only one remains.

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all numbers: ((((1+2)+3)+4)+5) = 15
total = reduce(lambda acc, x: acc + x, numbers)
# 15

# Find maximum
maximum = reduce(lambda a, b: a if a > b else b, numbers)
# 5
\`\`\`

---

## What is a Generator?

A **generator** is a special function that produces a sequence of values **lazily** (one at a time, on demand). Instead of returning all values at once, it **yields** them one by one.

**Why use generators?**
- **Memory efficient** - Don't load entire dataset into memory
- **Infinite sequences** - Can represent endless streams
- **Pipeline processing** - Chain operations without intermediate lists

\`\`\`python
# Generator function uses 'yield' instead of 'return'
def count_up_to(n):
    i = 1
    while i <= n:
        yield i    # Pause here, give this value, resume when asked for next
        i += 1

# Using the generator
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# Generator expression (like list comprehension but with parentheses)
squares_gen = (x**2 for x in range(1000000))
# Uses almost no memory! Values computed on demand

# Get values one at a time
first = next(squares_gen)   # 0
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

## Why This Matters

Writing "Pythonic" code is crucial for:

- **Code reviews** - Senior developers expect idiomatic code
- **Interview performance** - Shows deep language understanding
- **Maintainability** - Pythonic patterns are recognizable and debuggable
- **Using frameworks** like Django, Flask, and FastAPI effectively

---

## What is a Context Manager?

A **context manager** handles setup and cleanup automatically using the \`with\` statement. It guarantees cleanup happens even if an error occurs.

**Common uses:**
- Opening/closing files
- Acquiring/releasing locks
- Database connections/transactions
- Timing code execution

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

---

## What is a Decorator?

A **decorator** is a function that modifies another function's behavior without changing its code. Decorators use the \`@decorator_name\` syntax placed above a function definition.

**Common uses:**
- Logging (log every call)
- Timing (measure execution time)
- Authentication (check permissions)
- Caching/memoization (cache results)

\`\`\`python
import functools
import time

# A decorator is a function that takes a function and returns a wrapped version
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

---

## What are Type Hints?

**Type hints** are optional annotations that specify what types a function expects and returns. They don't enforce types at runtime, but help with:
- **IDE autocomplete** and error detection
- **Documentation** - types serve as documentation
- **Static analysis** - tools like mypy can catch bugs

\`\`\`python
from typing import List, Dict, Optional, Callable

# Parameter types come after :, return type comes after ->
def greet(name: str) -> str:
    return f"Hello, {name}!"

def process_items(items: List[int]) -> Dict[str, int]:
    return {
        "sum": sum(items),
        "count": len(items)
    }

# Optional means it could be None
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)  # Could return None

# Callable[[arg_types], return_type] for function parameters
def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)
\`\`\`

---

## What are *args and **kwargs?

These let a function accept **any number of arguments**:
- \`*args\` - Captures extra positional arguments as a **tuple**
- \`**kwargs\` - Captures extra keyword arguments as a **dict**

\`\`\`python
def log(*args, **kwargs):
    print("Args:", args)      # Tuple of positional args
    print("Kwargs:", kwargs)  # Dict of keyword args

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

## Why This Matters

C++ is essential for:

- **System programming** - Operating systems, drivers, embedded systems
- **Performance-critical applications** - Games, trading systems, browsers
- **Understanding how computers work** - Memory, pointers, low-level control
- **Competitive programming** - Often faster than other languages

---

## Key Difference from Python

| Feature | Python | C++ |
|---------|--------|-----|
| **Typing** | Dynamic (runtime) | Static (compile-time) |
| **Memory** | Automatic (garbage collected) | Manual/RAII |
| **Speed** | Slower (interpreted) | Fast (compiled) |
| **Syntax** | Indentation | Braces \`{}\` |

---

## What are Variables and Types?

In C++, you must **declare** a variable's type before using it. The compiler checks types at compile time, catching errors early.

\`\`\`cpp
#include <iostream>
#include <string>

int main() {
    // Declare type first - C++ is statically typed
    int age = 25;              // Integer (whole numbers)
    double price = 19.99;      // Floating-point (decimals)
    char grade = 'A';          // Single character
    bool isActive = true;      // Boolean (true/false)
    
    // String requires the <string> header
    std::string name = "Marathon";
    
    // 'auto' lets compiler infer the type (C++11)
    auto count = 100;      // Deduced as int
    auto rate = 3.14;      // Deduced as double
    
    // Constants - values that cannot change
    const int MAX_SIZE = 100;        // Runtime constant
    constexpr int ARRAY_SIZE = 50;   // Compile-time constant (faster)
    
    return 0;
}
\`\`\`

---

## What are Pointers and References?

**Pointers** and **references** are C++'s way of referring to data stored elsewhere in memory. Understanding them is crucial for C++ mastery.

### Pointer

A **pointer** is a variable that stores a **memory address**. Think of it as a piece of paper with an address written on it - it tells you where to find the actual house (data).

\`\`\`cpp
int value = 42;

// Creating a pointer
int* ptr = &value;    // &value = "address of value"

// Using a pointer
std::cout << ptr;     // 0x7ffd... (prints the address)
std::cout << *ptr;    // 42 (dereference = "go to that address and get the value")

*ptr = 100;           // Change the value at that address
// Now value == 100
\`\`\`

### Reference

A **reference** is an **alias** (another name) for an existing variable. Once bound, it always refers to the same variable.

\`\`\`cpp
int value = 42;
int& ref = value;     // ref is now another name for value

std::cout << ref;     // 42
ref = 100;            // Changes value (they're the same thing!)
// Now value == 100
\`\`\`

### Key Differences

| Feature | Pointer | Reference |
|---------|---------|-----------|
| Can be null | ✅ Yes | ❌ No |
| Can be reassigned | ✅ Yes | ❌ No |
| Syntax | \`*\` and \`&\` | Just \`&\` at declaration |
| Use case | Dynamic memory, optional values | Function parameters, aliases |

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
---

## What are Functions in C++?

Like Python, functions in C++ are reusable blocks of code. The key difference is how you pass arguments:

### Pass by Value vs Reference

| Method | Syntax | What Happens |
|--------|--------|--------------|
| **By value** | \`void f(int x)\` | Makes a copy - original unchanged |
| **By reference** | \`void f(int& x)\` | Passes the original - can modify |
| **By const ref** | \`void f(const int& x)\` | Passes original, read-only, efficient |

\`\`\`cpp
// Pass by value - makes a copy
void incrementValue(int x) {
    x++;  // Only changes the local copy!
}

// Pass by reference - modifies the original
void incrementReference(int& x) {
    x++;  // Changes the caller's variable
}

// Pass by const reference - efficient + read-only
void printVector(const std::vector<int>& vec) {
    for (int x : vec) {
        std::cout << x << " ";
    }
}

// Usage
int num = 5;
incrementValue(num);     // num is still 5
incrementReference(num); // num is now 6

// Function overloading - same name, different parameters
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
\`\`\`

---

## What are Arrays and Vectors?

C++ has several ways to store collections of items:

| Type | Size | Where | When to Use |
|------|------|-------|-------------|
| C-array | Fixed | Stack | Legacy code, low-level |
| \`std::array\` | Fixed | Stack | Fixed size, type-safe |
| \`std::vector\` | Dynamic | Heap | **Most common choice** |

\`\`\`cpp
#include <vector>
#include <array>

// C-style array - avoid in modern C++
int arr[5] = {1, 2, 3, 4, 5};

// std::array - fixed size, safer
std::array<int, 5> stdArr = {1, 2, 3, 4, 5};

// std::vector - dynamic size, use this!
std::vector<int> vec = {1, 2, 3};
vec.push_back(4);     // Add to end
vec.pop_back();       // Remove last
vec.size();           // Get size (3)
vec[0];               // Access element (1)

// Range-based for loop (C++11)
for (int x : vec) {
    std::cout << x << " ";
}
\`\`\`

---

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

## Why This Matters

Memory management is **the most important C++ concept** to understand:

- **Performance** - Control over memory = control over speed
- **Bug prevention** - Memory bugs cause crashes, security vulnerabilities
- **Interview essential** - Almost always asked in C++ interviews
- Unlike Python, C++ **does not have garbage collection**

---

## What is Stack vs Heap Memory?

All programs have two areas of memory:

| Feature | Stack | Heap |
|---------|-------|------|
| **Allocation** | Automatic | Manual (\`new\`/\`delete\`) |
| **Speed** | Very fast | Slower |
| **Size** | Limited (~1MB) | Large (GBs) |
| **Lifetime** | Until function returns | Until you \`delete\` |
| **Cleanup** | Automatic | **Your responsibility!** |

\`\`\`cpp
void example() {
    // STACK allocation - automatic cleanup
    int stackVar = 42;        // Goes away when function ends
    int stackArray[100];      // Fixed size, must know at compile time
    
    // HEAP allocation - manual cleanup required!
    int* heapVar = new int(42);      // Allocate one int
    int* heapArray = new int[100];   // Allocate array
    
    // YOU must free heap memory, or it's a MEMORY LEAK!
    delete heapVar;
    delete[] heapArray;  // Use delete[] for arrays!
}
// stackVar automatically destroyed here
\`\`\`

---

## What is RAII?

**RAII** (Resource Acquisition Is Initialization) is C++'s most important idiom. The idea:

> **Acquire resources in constructor, release in destructor.**

This guarantees cleanup even if exceptions occur.

\`\`\`cpp
class FileHandle {
    FILE* file;
public:
    // Constructor - ACQUIRE resource
    FileHandle(const char* path) {
        file = fopen(path, "r");
    }
    
    // Destructor - RELEASE resource (automatically called!)
    ~FileHandle() {
        if (file) fclose(file);
    }
    
    // Prevent copying to avoid double-free
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
};

void useFile() {
    FileHandle fh("data.txt");
    // ... use the file ...
}  // fh destructor called here - file automatically closed!
   // Even if an exception was thrown!
\`\`\`

---

## What are Smart Pointers?

**Smart pointers** are C++11 classes that act like pointers but **automatically manage memory**. They're RAII wrappers around raw pointers.

**Rule: Never use \`new\`/\`delete\` directly in modern C++. Use smart pointers!**

| Smart Pointer | Ownership | When to Use |
|--------------|-----------|-------------|
| \`unique_ptr\` | **Sole** owner | Default choice (90% of cases) |
| \`shared_ptr\` | **Shared** owners | When multiple objects need ownership |
| \`weak_ptr\` | **No** ownership | Break circular refs, optional access |

### unique_ptr - One Owner

A \`unique_ptr\` **exclusively owns** the object. When it goes out of scope, the object is deleted. Cannot be copied (only moved).

\`\`\`cpp
#include <memory>

// Create unique_ptr - the RIGHT way to allocate
std::unique_ptr<int> ptr = std::make_unique<int>(42);
std::cout << *ptr;  // 42

// Cannot copy (would create two owners!)
// std::unique_ptr<int> ptr2 = ptr;  // COMPILE ERROR!

// Can move (transfer ownership)
std::unique_ptr<int> ptr2 = std::move(ptr);
// ptr is now nullptr, ptr2 owns the int
\`\`\`

### shared_ptr - Shared Ownership

A \`shared_ptr\` uses **reference counting**. The object is deleted when the **last** shared_ptr is destroyed.

\`\`\`cpp
std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
std::shared_ptr<int> ptr2 = ptr1;  // Both own the int

std::cout << ptr1.use_count();  // 2 (two owners)

ptr1.reset();  // ptr1 releases, count = 1
// Memory freed when ptr2 is destroyed (count reaches 0)
\`\`\`

### weak_ptr - Non-Owning Observer

A \`weak_ptr\` observes a shared_ptr **without owning** it. Used to break circular references.

\`\`\`cpp
std::shared_ptr<int> shared = std::make_shared<int>(42);
std::weak_ptr<int> weak = shared;  // Does NOT increase count

// Must convert to shared_ptr to use
if (auto locked = weak.lock()) {
    std::cout << *locked;  // Safe access
}

shared.reset();           // Object deleted
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

## Why This Matters

C++ OOP differs from Python in important ways:

- **Access control** is enforced (public/private/protected)
- **Manual memory management** in classes (Rule of 5)
- **Virtual functions** enable runtime polymorphism
- **Performance control** - you decide what's on stack vs heap

---

## What is a Class in C++?

A **class** defines a type with data (member variables) and behavior (member functions). Key differences from Python:

| Feature | Python | C++ |
|---------|--------|-----|
| Access control | By convention (\`_\`) | Enforced (\`private:\`, \`public:\`) |
| \`this\` keyword | \`self\` (explicit) | \`this\` (implicit pointer) |
| Constructor name | \`__init__\` | Same as class name |

\`\`\`cpp
class Rectangle {
private:    // Only accessible within this class
    double width;
    double height;

public:     // Accessible from anywhere
    // Constructor with initializer list (preferred)
    Rectangle(double w, double h) : width(w), height(h) {}
    
    // Default constructor
    Rectangle() : width(0), height(0) {}
    
    // Getter methods (const = doesn't modify object)
    double getWidth() const { return width; }
    double getHeight() const { return height; }
    
    // Setter methods
    void setWidth(double w) { width = w; }
    void setHeight(double h) { height = h; }
    
    // Member function
    double area() const { return width * height; }
};

// Using the class
Rectangle rect(5.0, 3.0);
std::cout << rect.area();  // 15.0
\`\`\`

---

---

## Constructors and Destructors

In C++, you must manage what happens when objects are **created**, **copied**, **moved**, and **destroyed**.

### The Rule of Five

If your class manages a resource (memory, file, etc.), you should define these 5 special members:

| Special Member | Purpose |
|----------------|---------|
| **Destructor** | Cleanup when object is destroyed |
| **Copy constructor** | Create new object as copy |
| **Copy assignment** | Assign to existing object |
| **Move constructor** | Create from temporary (C++11) |
| **Move assignment** | Assign from temporary (C++11) |

\`\`\`cpp
class Resource {
    int* data;
    size_t size;
    
public:
    // Constructor
    Resource(size_t sz) : size(sz), data(new int[sz]) {
        std::cout << "Resource acquired\\n";
    }
    
    // Destructor - called when object goes out of scope
    ~Resource() {
        delete[] data;
        std::cout << "Resource released\\n";
    }
    
    // Copy constructor - deep copy
    Resource(const Resource& other) : size(other.size), data(new int[other.size]) {
        std::copy(other.data, other.data + size, data);
    }
    
    // Move constructor - steal resources (C++11)
    Resource(Resource&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;  // Leave source in valid empty state
        other.size = 0;
    }
    
    // Copy and move assignment operators similar...
};
\`\`\`

---

## What is Inheritance in C++?

**Inheritance** creates an "is-a" relationship. The child class gets all members of the parent.

Key C++ concepts:
- \`public\` inheritance: "is-a" (most common)
- \`protected\`: accessible to derived classes
- \`virtual\`: enables polymorphism (overriding)

\`\`\`cpp
class Animal {
protected:           // Accessible to child classes
    std::string name;
    
public:
    Animal(const std::string& n) : name(n) {}
    
    // virtual = can be overridden by child classes
    virtual void speak() const {
        std::cout << name << " makes a sound\\n";
    }
    
    // IMPORTANT: Always make destructor virtual in base classes!
    virtual ~Animal() = default;
};

class Dog : public Animal {    // Dog IS-A Animal
public:
    Dog(const std::string& n) : Animal(n) {}
    
    // override = explicitly overriding (catches errors)
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
\`\`\`

---

## What is Polymorphism?

**Polymorphism** means "many forms." With virtual functions, a pointer/reference to a base class can call the correct derived class method.

\`\`\`cpp
// Polymorphism in action
void makeSpeak(const Animal& animal) {
    animal.speak();  // Calls Dog::speak() or Cat::speak() as appropriate!
}

Dog dog("Buddy");
Cat cat("Whiskers");
makeSpeak(dog);  // "Buddy says woof!"
makeSpeak(cat);  // "Whiskers says meow!"

// Using pointers
std::vector<Animal*> animals = { new Dog("Rex"), new Cat("Luna") };
for (Animal* a : animals) {
    a->speak();  // Dynamic dispatch at runtime
}
\`\`\`

---

## What are Abstract Classes?

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

## Why This Matters

Modern C++ (C++11 and beyond) introduced features that make the language:

- **Safer** - Smart pointers, nullptr, strongly-typed enums
- **Faster** - Move semantics, constexpr
- **Easier** - auto, range-for, lambdas, structured bindings
- **Interview essential** - All C++ interviews expect modern C++ knowledge

---

## What is \`auto\`?

\`auto\` lets the **compiler deduce the type** from the initializer. Reduces verbosity, especially with complex types.

\`\`\`cpp
// Compiler figures out the type
auto x = 42;           // int
auto pi = 3.14;        // double
auto name = "Hello";   // const char* (not std::string!)

// Most useful with complex types
std::map<std::string, std::vector<int>> data;

// Without auto: painful!
std::map<std::string, std::vector<int>>::iterator it = data.begin();

// With auto: clean!
auto it = data.begin();

// C++17 structured bindings
for (auto& [key, value] : data) {  
    // key is std::string, value is vector<int>
}
\`\`\`

---

## What are Range-based For Loops?

Iterate over containers without indices or iterators:

\`\`\`cpp
std::vector<int> nums = {1, 2, 3, 4, 5};

// By value (makes a copy each iteration)
for (int n : nums) { 
    // n is a copy, modifying it doesn't affect nums
}

// By reference (can modify)
for (int& n : nums) {
    n *= 2;  // Actually doubles the values!
}

// By const reference (read-only, efficient - PREFERRED)
for (const int& n : nums) { }

// With auto (let compiler figure it out)
for (const auto& n : nums) { }
\`\`\`

---

## What are Lambda Expressions?

**Lambdas** are anonymous functions you can define inline. Essential for algorithms and callbacks.

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

    // Step 0-3-0: Python vs C++ Comparison
    'step-0-3-0': {
        title: 'Python vs C++ Comparison',
        content: `# Python vs C++ Comparison

## Why Compare These Languages?

Understanding both Python and C++ makes you a more versatile engineer:

- **Interview flexibility** - Some problems are easier in Python, others need C++ speed
- **Project selection** - Knowing trade-offs helps you choose the right tool
- **Deeper understanding** - Learning both reveals what's happening "under the hood"

---

## Syntax: Side-by-Side

### Hello World

| Python | C++ |
|--------|-----|
| \\\`print("Hello")\\\` | \\\`std::cout << "Hello" << std::endl;\\\` |
| No boilerplate | Requires \\\`#include\\\` and \\\`main()\\\` |

\\\`\\\`\\\`python
# Python - runs immediately
print("Hello, World!")
\\\`\\\`\\\`

\\\`\\\`\\\`cpp
// C++ - needs compilation
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\\\`\\\`\\\`

### Loops

\\\`\\\`\\\`python
# Python - iterate directly over elements
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)
\\\`\\\`\\\`

\\\`\\\`\\\`cpp
// C++ - range-based for (C++11) or index-based
#include <vector>
#include <iostream>

std::vector<int> numbers = {1, 2, 3, 4, 5};

// Modern C++ (range-based)
for (int num : numbers) {
    std::cout << num << std::endl;
}

// Traditional (index-based)
for (size_t i = 0; i < numbers.size(); i++) {
    std::cout << numbers[i] << std::endl;
}
\\\`\\\`\\\`

---

## Type System

| Feature | Python | C++ |
|---------|--------|-----|
| **Type checking** | Runtime (dynamic) | Compile-time (static) |
| **Declaration** | Implicit | Explicit (or \\\`auto\\\`) |
| **Type errors** | Crash at runtime | Caught during compilation |
| **Flexibility** | Very high | Type-safe |

### Example: The Difference in Practice

\\\`\\\`\\\`python
# Python - types are checked at runtime
def add(a, b):
    return a + b

add(1, 2)        # Works: 3
add("x", "y")    # Works: "xy"
add(1, "2")      # Runtime error! Can mix types by accident
\\\`\\\`\\\`

\\\`\\\`\\\`cpp
// C++ - types are checked at compile time
int add(int a, int b) {
    return a + b;
}

add(1, 2);       // Works: 3
add("x", "y");   // Compile error! Won't even build
\\\`\\\`\\\`

---

## Memory Management

| Aspect | Python | C++ |
|--------|--------|-----|
| **Allocation** | Automatic | Manual or Smart Pointers |
| **Deallocation** | Garbage Collector | RAII / \\\`delete\\\` |
| **Memory overhead** | Higher (~28 bytes per int) | Lower (~4 bytes per int) |
| **Control** | None | Complete |
| **Memory leaks** | Rare (GC handles it) | Possible if mismanaged |

### Python's Simplicity

\\\`\\\`\\\`python
# Python - memory is automatic
def process():
    data = [1, 2, 3, 4, 5]  # Allocated automatically
    return sum(data)
    # 'data' is garbage collected when no longer referenced
\\\`\\\`\\\`

### C++'s Control

\\\`\\\`\\\`cpp
#include <vector>
#include <memory>

void process() {
    // Stack allocation - automatic cleanup
    std::vector<int> data = {1, 2, 3, 4, 5};
    
    // Heap allocation with smart pointer - automatic cleanup
    auto ptr = std::make_unique<std::vector<int>>();
    
    // Manual heap allocation - YOU must delete!
    int* raw = new int[5];  // Allocated
    delete[] raw;           // Must remember to free!
}
// Stack variables automatically cleaned up when function exits
\\\`\\\`\\\`

---

## OOP Comparison

| Feature | Python | C++ |
|---------|--------|-----|
| **Access control** | Convention (\\\`_\\\`, \\\`__\\\`) | Keywords (\\\`private\\\`, \\\`protected\\\`) |
| **Constructors** | \\\`__init__\\\` | Constructor (same name as class) |
| **Destructors** | \\\`__del__\\\` (unreliable) | \\\`~ClassName()\\\` (deterministic) |
| **Inheritance** | \\\`class Child(Parent)\\\` | \\\`class Child : public Parent\\\` |
| **Virtual methods** | All methods are virtual | Must use \\\`virtual\\\` keyword |
| **Abstract classes** | \\\`ABC\\\` module | Pure virtual functions (\\\`= 0\\\`) |

### Class Definition Comparison

\\\`\\\`\\\`python
# Python class
class Animal:
    def __init__(self, name):
        self.name = name        # Public by convention
        self._age = 0           # "Private" by convention
    
    def speak(self):            # All methods are virtual
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"
\\\`\\\`\\\`

\\\`\\\`\\\`cpp
// C++ class
#include <string>

class Animal {
protected:
    std::string name;          // Truly protected
    int age = 0;               // Truly private (default)
    
public:
    Animal(const std::string& n) : name(n) {}
    virtual ~Animal() = default;
    
    virtual std::string speak() const = 0;  // Pure virtual (abstract)
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}
    
    std::string speak() const override {
        return name + " says Woof!";
    }
};
\\\`\\\`\\\`

---

## Performance

| Benchmark | Python | C++ | Difference |
|-----------|--------|-----|------------|
| Loop (1M iterations) | ~50ms | ~1ms | **50x faster** |
| Function calls | ~100ns | ~1ns | **100x faster** |
| Memory per int | 28 bytes | 4 bytes | **7x smaller** |

> **When does performance matter?**
> - ✅ Games, real-time systems, trading platforms
> - ✅ Processing millions of records
> - ❌ Web APIs, scripts, prototypes (Python is fine)

---

## Ecosystem & Use Cases

### When to Choose Python 🐍

| Use Case | Why Python Wins |
|----------|-----------------|
| **Data Science / ML** | NumPy, Pandas, TensorFlow |
| **Scripting & Automation** | Quick to write, no compilation |
| **Web Development** | Django, FastAPI, Flask |
| **Prototyping** | Iterate faster, less boilerplate |
| **Coding Interviews** | Write solutions quickly |

### When to Choose C++ ⚡

| Use Case | Why C++ Wins |
|----------|--------------|
| **Systems Programming** | OS, drivers, embedded |
| **Game Development** | Unreal Engine, performance |
| **High-Frequency Trading** | Microsecond latency |
| **Competitive Programming** | Speed advantage in time-limited problems |
| **Resource-Constrained** | IoT, embedded systems |

---

## Quick Reference: Converting Between Languages

| Task | Python | C++ |
|------|--------|-----|
| **Print** | \\\`print(x)\\\` | \\\`std::cout << x << std::endl;\\\` |
| **List/Vector** | \\\`[1, 2, 3]\\\` | \\\`std::vector<int>{1, 2, 3}\\\` |
| **Dictionary/Map** | \\\`{"a": 1}\\\` | \\\`std::map<std::string, int>{{"a", 1}}\\\` |
| **String format** | \\\`f"Value: {x}"\\\` | \\\`std::format("Value: {}", x)\\\` (C++20) |
| **Null/None** | \\\`None\\\` | \\\`nullptr\\\` |
| **Length** | \\\`len(arr)\\\` | \\\`arr.size()\\\` |
| **Append** | \\\`arr.append(x)\\\` | \\\`arr.push_back(x)\\\` |
| **Range loop** | \\\`for i in range(n)\\\` | \\\`for (int i = 0; i < n; i++)\\\` |

---

## Key Takeaways

- **Python** = Faster development, easier to read, automatic memory
- **C++** = Faster execution, more control, compile-time safety
- Both are valuable - learn Python for productivity, C++ for performance
- Interview tip: Use Python for quick solutions, mention C++ when discussing optimizations
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

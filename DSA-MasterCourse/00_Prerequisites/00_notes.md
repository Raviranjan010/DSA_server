# 00 — C++ Prerequisites — Complete Notes

> **What You'll Learn**: C++ basics needed for DSA — variables, data types, pointers, references, functions, OOP, and STL introduction  
> **Prerequisites**: Basic programming knowledge (any language)  
> **Time Required**: 1 week (10-15 hours)

---

## 1. What is C++? (Real-World Analogy)

Imagine you're building a house:
- **C** is like having basic tools (hammer, saw) — powerful but you do everything manually
- **C++** is like having a complete workshop with power tools — same power, but with helpful machines that do repetitive work for you
- **Python/Java** are like hiring contractors — easier but slower and less control

**C++ gives you**:
- ⚡ **Speed**: Runs very fast (used in game engines, trading systems)
- 🎮 **Control**: You manage memory, optimize performance
- 🏗️ **Structure**: Object-oriented programming for large projects
- 📦 **STL (Standard Template Library)**: Pre-built data structures and algorithms

💡 **TRICK**: Think of C++ as a sports car — powerful and fast, but you need to learn to drive it properly!

---

## 2. Why Do We Need C++ for DSA?

1. **Speed**: DSA interviews often have time limits. C++ is 10-100x faster than Python
2. **STL**: Built-in vectors, maps, sets, stacks, queues — implement algorithms quickly
3. **Industry Standard**: Most competitive programmers use C++
4. **Memory Control**: Understand how data structures work under the hood
5. **Interview Preference**: Many interviewers expect C++/Java for coding rounds

---

## 3. Core Concepts & Terminology

### 3.1 Your First C++ Program

```cpp
#include <iostream>  // Include input/output library
using namespace std; // Use standard namespace (avoid typing std::)

int main() {         // Main function - program starts here
    cout << "Hello, DSA!" << endl;  // Print to console
    return 0;        // Return 0 means program succeeded
}
```

**Line-by-Line Explanation**:
- `#include <iostream>`: Tells compiler to include input/output functionality
- `using namespace std;`: Allows us to write `cout` instead of `std::cout`
- `int main()`: Every C++ program must have a main function
- `cout <<`: Prints to console (character output)
- `endl`: Ends the line (like pressing Enter)
- `return 0;`: Tells operating system program ran successfully

---

### 3.2 Variables & Data Types

**What is a Variable?**  
A variable is like a **labeled box** that stores data.

```
┌─────────────────┐
│   age = 25      │  ← Variable name: age, Value: 25
└─────────────────┘
```

**Basic Data Types**:

| Type | Size | Range | Example | Use Case |
|------|------|-------|---------|----------|
| `int` | 4 bytes | -2B to +2B | `int age = 25;` | Counting, indexing |
| `float` | 4 bytes | 7 decimal digits | `float pi = 3.14f;` | Approximate decimals |
| `double` | 8 bytes | 15 decimal digits | `double pi = 3.14159;` | Precise decimals |
| `char` | 1 byte | Single character | `char grade = 'A';` | Single characters |
| `bool` | 1 byte | true/false | `bool pass = true;` | Conditions, flags |
| `long long` | 8 bytes | -9Q to +9Q | `long long big = 1e18;` | Very large numbers |

**Complete Example**:

```cpp
#include <iostream>
using namespace std;

int main() {
    // Integer variables
    int age = 20;                    // Store whole numbers
    int students_count = 100;        // Descriptive names are good
    
    // Floating-point variables
    float temperature = 36.6f;       // 'f' means float
    double precise_pi = 3.14159265;  // More precise than float
    
    // Character variable
    char first_letter = 'A';         // Single quotes for char
    
    // Boolean variable
    bool is_student = true;          // true or false (1 or 0)
    
    // Print all variables
    cout << "Age: " << age << endl;
    cout << "Temperature: " << temperature << endl;
    cout << "First Letter: " << first_letter << endl;
    cout << "Is Student: " << is_student << endl;  // Prints 1 for true
    
    return 0;
}
```

**Output**:
```
Age: 20
Temperature: 36.6
First Letter: A
Is Student: 1
```

💡 **TRICK**: **Mnemonic for data type sizes**: "C F D" → **C**har (1), **F**loat (4), **D**ouble (8) — doubles in size!

---

### 3.3 Operators

**Types of Operators**:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    
    // 1. Arithmetic Operators
    cout << "Addition: " << (a + b) << endl;        // 13
    cout << "Subtraction: " << (a - b) << endl;     // 7
    cout << "Multiplication: " << (a * b) << endl;  // 30
    cout << "Division: " << (a / b) << endl;        // 3 (integer division!)
    cout << "Modulo: " << (a % b) << endl;          // 1 (remainder)
    
    // 2. Comparison Operators (return bool)
    cout << "a == b: " << (a == b) << endl;  // 0 (false)
    cout << "a != b: " << (a != b) << endl;  // 1 (true)
    cout << "a > b: " << (a > b) << endl;    // 1 (true)
    cout << "a < b: " << (a < b) << endl;    // 0 (false)
    
    // 3. Logical Operators
    bool x = true, y = false;
    cout << "x AND y: " << (x && y) << endl;  // 0 (both must be true)
    cout << "x OR y: " << (x || y) << endl;   // 1 (at least one true)
    cout << "NOT x: " << (!x) << endl;        // 0 (opposite)
    
    // 4. Assignment Operators
    int c = 5;
    c += 3;  // Same as: c = c + 3
    cout << "c += 3: " << c << endl;  // 8
    
    c *= 2;  // Same as: c = c * 2
    cout << "c *= 2: " << c << endl;  // 16
    
    return 0;
}
```

⚠️ **Common Mistake**: Integer division!
```cpp
int result = 10 / 3;      // Result is 3, NOT 3.333
double result2 = 10.0 / 3; // Result is 3.333 (one operand is double)
```

---

### 3.4 Control Flow (if/else, loops)

#### Conditional Statements

```cpp
#include <iostream>
using namespace std;

int main() {
    int score = 85;
    
    // Simple if
    if (score >= 90) {
        cout << "Grade: A" << endl;
    }
    
    // if-else
    if (score >= 50) {
        cout << "Passed!" << endl;
    } else {
        cout << "Failed!" << endl;
    }
    
    // if-else if-else chain
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else if (score >= 70) {
        cout << "Grade: C" << endl;
    } else {
        cout << "Grade: F" << endl;
    }
    
    // Ternary operator (shorthand if-else)
    string result = (score >= 50) ? "Pass" : "Fail";
    cout << "Result: " << result << endl;
    
    return 0;
}
```

#### Loops

**For Loop** (when you know number of iterations):
```cpp
// Print numbers 1 to 5
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
// Output: 1 2 3 4 5
```

**While Loop** (when condition-based):
```cpp
int count = 1;
while (count <= 5) {
    cout << count << " ";
    count++;  // Don't forget to increment!
}
// Output: 1 2 3 4 5
```

**Do-While Loop** (executes at least once):
```cpp
int num = 10;
do {
    cout << num << " ";
    num++;
} while (num <= 5);  // Condition false, but runs once
// Output: 10
```

💡 **TRICK**: **Loop Selection Mnemonic**:
- **FOR** = **F**ixed number of iterations
- **WHILE** = **W**ait for condition to change
- **DO-WHILE** = **D**o it at least once

---

### 3.5 Functions

**What is a Function?**  
A function is like a **recipe** — you give it ingredients (inputs), it does something, and returns a dish (output).

```cpp
#include <iostream>
using namespace std;

// Function definition
int add(int a, int b) {        // Return type: int, Parameters: a, b
    int sum = a + b;           // Do the calculation
    return sum;                // Return the result
}

// Function with no return value
void greet(string name) {      // void means no return
    cout << "Hello, " << name << "!" << endl;
}

// Function with default parameter
int power(int base, int exp = 2) {  // exp defaults to 2
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    // Call add function
    int result = add(5, 3);
    cout << "5 + 3 = " << result << endl;  // 8
    
    // Call void function
    greet("Alice");  // Hello, Alice!
    
    // Call with default parameter
    cout << "3^2 = " << power(3) << endl;      // 9 (uses default exp=2)
    cout << "3^3 = " << power(3, 3) << endl;   // 27
    
    return 0;
}
```

**Pass by Value vs Pass by Reference**:

```cpp
#include <iostream>
using namespace std;

// Pass by VALUE (creates a copy)
void increment_value(int x) {
    x++;  // Only changes the copy
}

// Pass by REFERENCE (modifies original)
void increment_reference(int &x) {  // & means reference
    x++;  // Changes the original variable
}

int main() {
    int a = 10, b = 10;
    
    increment_value(a);
    cout << "After pass by value: " << a << endl;    // Still 10
    
    increment_reference(b);
    cout << "After pass by reference: " << b << endl; // Now 11
    
    return 0;
}
```

💡 **TRICK**: **Reference Trick**: `&` = "**A**ddress of" or "**A**lter original" — both start with A!

---

### 3.6 Pointers (The Scary Part Made Simple!)

**What is a Pointer?**  
A pointer is a variable that **stores the memory address** of another variable.

**Real-World Analogy**:  
- **Variable** = House with people inside  
- **Pointer** = Address of the house (not the house itself)

```
┌──────────────┐         ┌──────────────┐
│   int age    │         │   int *ptr   │
│   Value: 25  │         │   Value:     │
│   Address:   │────────→│   0x7ffd...  │
│   0x7ffd...  │         │   (points to │
└──────────────┘         │    age)      │
                         └──────────────┘
```

**Pointer Basics**:

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 25;           // Regular variable
    int *ptr = &age;        // Pointer stores address of age (& = address-of operator)
    
    cout << "Value of age: " << age << endl;        // 25
    cout << "Address of age: " << &age << endl;     // 0x7ffd...
    cout << "Value of ptr: " << ptr << endl;        // 0x7ffd... (same address)
    cout << "Value at ptr: " << *ptr << endl;       // 25 (* = dereference, get value)
    
    // Modify value through pointer
    *ptr = 30;  // Change value at address ptr points to
    cout << "New age: " << age << endl;  // 30 (age changed!)
    
    return 0;
}
```

**Key Operators**:
- `&` = **Address-of** (get memory address)
- `*` = **Dereference** (get value at address)

💡 **TRICK**: **Pointer Mnemonic**:
- `&` looks like a twisted "**A**" → **A**ddress
- `*` looks like a star pointing down → **V**alue at location (star = V in Roman numerals!)

**Pointer Arithmetic**:

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;  // ptr points to first element (arr[0])
    
    cout << "*ptr: " << *ptr << endl;         // 10
    cout << "*(ptr+1): " << *(ptr+1) << endl; // 20 (next element)
    cout << "*(ptr+2): " << *(ptr+2) << endl; // 30
    
    // ptr + 1 moves by sizeof(int) = 4 bytes
    cout << "ptr: " << ptr << endl;           // 0x1000
    cout << "ptr+1: " << (ptr+1) << endl;     // 0x1004 (4 bytes ahead)
    
    return 0;
}
```

---

### 3.7 References (Easier Alternative to Pointers)

**What is a Reference?**  
A reference is an **alias** (nickname) for an existing variable.

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 25;
    int &ref = age;  // ref is now an alias for age
    
    cout << "age: " << age << endl;      // 25
    cout << "ref: " << ref << endl;      // 25 (same as age)
    
    ref = 30;  // Changing ref changes age
    cout << "age after ref=30: " << age << endl;  // 30
    
    // References MUST be initialized when declared
    // int &bad_ref;  // ERROR: must initialize
    
    return 0;
}
```

**References vs Pointers**:

| Feature | Reference | Pointer |
|---------|-----------|---------|
| Syntax | `int &ref = var;` | `int *ptr = &var;` |
| Initialization | Must initialize | Can be NULL |
| Reassignment | Cannot change target | Can point elsewhere |
| Null value | Cannot be null | Can be nullptr |
| Usage | Easier, safer | More flexible |

💡 **TRICK**: When in doubt, use **references** over pointers — they're safer and easier!

---

### 3.8 Arrays (Fixed-Size)

```cpp
#include <iostream>
using namespace std;

int main() {
    // Declare and initialize
    int arr[5] = {10, 20, 30, 40, 50};
    
    // Access elements (0-indexed!)
    cout << "First: " << arr[0] << endl;   // 10
    cout << "Last: " << arr[4] << endl;    // 50
    
    // Modify elements
    arr[2] = 35;
    cout << "Modified: " << arr[2] << endl;  // 35
    
    // Loop through array
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    // Output: 10 20 35 40 50
    
    // Size of array
    cout << "\nSize: " << sizeof(arr) / sizeof(arr[0]) << endl;  // 5
    
    return 0;
}
```

⚠️ **Common Mistake**: Array indices start at 0, not 1!
```cpp
int arr[5];
arr[5] = 100;  // ERROR! Valid indices: 0, 1, 2, 3, 4
```

---

### 3.9 Strings

```cpp
#include <iostream>
#include <string>  // Include string library
using namespace std;

int main() {
    // Create strings
    string name = "Alice";
    string greeting = "Hello, " + name + "!";  // Concatenation
    
    cout << greeting << endl;  // Hello, Alice!
    
    // String operations
    cout << "Length: " << name.length() << endl;     // 5
    cout << "Size: " << name.size() << endl;         // 5 (same as length)
    cout << "Empty: " << name.empty() << endl;       // 0 (false)
    
    // Access characters
    cout << "First char: " << name[0] << endl;       // A
    cout << "Last char: " << name[name.size()-1] << endl;  // e
    
    // Substring
    cout << "Substring: " << name.substr(0, 3) << endl;  // Ali
    
    // Find
    string text = "Hello, World!";
    cout << "Position of 'World': " << text.find("World") << endl;  // 7
    
    return 0;
}
```

---

### 3.10 Object-Oriented Programming Basics

**Class**: Blueprint for creating objects  
**Object**: Instance of a class

```cpp
#include <iostream>
using namespace std;

// Define a class
class Student {
public:  // Access modifier: public means accessible outside
    // Member variables (attributes)
    string name;
    int age;
    double gpa;
    
    // Member function (method)
    void introduce() {
        cout << "Hi, I'm " << name << ", age " << age 
             << ", GPA: " << gpa << endl;
    }
    
    // Constructor (called when object is created)
    Student(string n, int a, double g) {
        name = n;
        age = a;
        gpa = g;
    }
};

int main() {
    // Create object
    Student s1("Alice", 20, 3.8);
    
    // Access members
    s1.introduce();  // Hi, I'm Alice, age 20, GPA: 3.8
    
    // Modify members
    s1.gpa = 3.9;
    cout << "New GPA: " << s1.gpa << endl;  // 3.9
    
    return 0;
}
```

---

## 4. Visual Diagram: C++ Memory Layout

```
┌──────────────────────────────────────────────────────┐
│                  C++ Memory Layout                    │
├──────────────────────────────────────────────────────┤
│                                                       │
│  High Address                                         │
│  ┌──────────────────────────────────┐                 │
│  │         Stack                    │                 │
│  │  • Local variables               │                 │
│  │  • Function calls                │                 │
│  │  • Automatic memory              │                 │
│  └──────────────────────────────────┘                 │
│                      ↓ grows down                     │
│                                                       │
│                      ↑ grows up                       │
│  ┌──────────────────────────────────┐                 │
│  │         Heap                     │                 │
│  │  • Dynamic memory (new/delete)   │                 │
│  │  • Vectors, dynamic arrays       │                 │
│  │  • Manual memory management      │                 │
│  └──────────────────────────────────┘                 │
│                                                       │
│  ┌──────────────────────────────────┐                 │
│  │     Global/Static Data           │                 │
│  │  • Global variables              │                 │
│  │  • Static variables              │                 │
│  └──────────────────────────────────┘                 │
│                                                       │
│  ┌──────────────────────────────────┐                 │
│  │     Code (Program Instructions)  │                 │
│  └──────────────────────────────────┘                 │
│                                                       │
│  Low Address                                          │
└──────────────────────────────────────────────────────┘
```

---

## 5. Introduction to STL (Standard Template Library)

**What is STL?**  
STL is C++'s **built-in toolbox** of data structures and algorithms. Instead of implementing everything from scratch, you use pre-built, optimized versions.

**Why Use STL?**
- ✅ **Fast**: Highly optimized by experts
- ✅ **Reliable**: Tested thoroughly
- ✅ **Easy**: Less code to write
- ✅ **Standard**: Works everywhere

### 5.1 Vector (Dynamic Array)

```cpp
#include <iostream>
#include <vector>  // Include vector library
using namespace std;

int main() {
    // Create vectors
    vector<int> nums;                    // Empty vector
    vector<int> scores = {90, 85, 92};   // Initialize with values
    
    // Add elements
    nums.push_back(10);   // Add to end: [10]
    nums.push_back(20);   // Add to end: [10, 20]
    nums.push_back(30);   // Add to end: [10, 20, 30]
    
    // Access elements (like arrays)
    cout << "First: " << nums[0] << endl;    // 10
    cout << "Second: " << nums.at(1) << endl; // 20 (safer)
    
    // Size and capacity
    cout << "Size: " << nums.size() << endl;       // 3
    cout << "Empty: " << nums.empty() << endl;     // 0 (false)
    
    // Remove elements
    nums.pop_back();  // Remove last: [10, 20]
    
    // Iterate through vector
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;  // 10 20
    
    // Range-based for loop (easier)
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;  // 10 20
    
    return 0;
}
```

**Vector Operations Complexity**:
| Operation | Time Complexity |
|-----------|----------------|
| Access by index | O(1) |
| push_back | O(1) amortized |
| pop_back | O(1) |
| insert/delete at end | O(1) |
| insert/delete at beginning | O(n) |
| Search | O(n) |

---

### 5.2 Pair

```cpp
#include <iostream>
#include <utility>  // Include pair library
using namespace std;

int main() {
    // Create pair
    pair<int, string> student = {1, "Alice"};
    
    // Access elements
    cout << "ID: " << student.first << endl;   // 1
    cout << "Name: " << student.second << endl; // Alice
    
    // Modify
    student.first = 2;
    student.second = "Bob";
    
    // Make pair (shorthand)
    auto p = make_pair(10, 20);
    cout << p.first << ", " << p.second << endl;  // 10, 20
    
    return 0;
}
```

---

### 5.3 Map (Key-Value Pairs)

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    // Create map
    map<string, int> ages;
    
    // Insert elements
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 22;
    
    // Access elements
    cout << "Alice's age: " << ages["Alice"] << endl;  // 25
    
    // Check if key exists
    if (ages.count("Bob")) {
        cout << "Bob exists!" << endl;
    }
    
    // Iterate through map
    for (auto pair : ages) {
        cout << pair.first << ": " << pair.second << endl;
    }
    // Output (sorted by key):
    // Alice: 25
    // Bob: 30
    // Charlie: 22
    
    // Delete element
    ages.erase("Charlie");
    
    return 0;
}
```

**Map Operations Complexity**:
| Operation | Time Complexity |
|-----------|----------------|
| Insert | O(log n) |
| Delete | O(log n) |
| Search | O(log n) |
| Access | O(log n) |

---

### 5.4 Set (Unique Elements)

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    // Create set
    set<int> numbers;
    
    // Insert elements
    numbers.insert(30);
    numbers.insert(10);
    numbers.insert(20);
    numbers.insert(10);  // Duplicate - ignored!
    
    // Set automatically sorts and removes duplicates
    for (int num : numbers) {
        cout << num << " ";
    }
    // Output: 10 20 30 (sorted, no duplicates)
    
    // Check if element exists
    if (numbers.count(20)) {
        cout << "\n20 exists!" << endl;
    }
    
    // Delete element
    numbers.erase(10);
    
    return 0;
}
```

---

### 5.5 Stack (LIFO - Last In First Out)

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    
    // Push elements
    s.push(10);
    s.push(20);
    s.push(30);
    
    // Top element
    cout << "Top: " << s.top() << endl;  // 30
    
    // Size
    cout << "Size: " << s.size() << endl;  // 3
    
    // Pop element (remove top)
    s.pop();
    cout << "After pop, top: " << s.top() << endl;  // 20
    
    return 0;
}
```

💡 **TRICK**: **Stack = Stack of plates** — you add/remove from the top only!

---

### 5.6 Queue (FIFO - First In First Out)

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // Push elements (enqueue)
    q.push(10);
    q.push(20);
    q.push(30);
    
    // Front and back
    cout << "Front: " << q.front() << endl;  // 10
    cout << "Back: " << q.back() << endl;    // 30
    
    // Pop element (dequeue)
    q.pop();
    cout << "After pop, front: " << q.front() << endl;  // 20
    
    return 0;
}
```

💡 **TRICK**: **Queue = Real-life queue** — first person gets served first!

---

## 6. Dry Run: Understanding Pointers

Let's trace this code step-by-step:

```cpp
int a = 10;
int b = 20;
int *ptr = &a;
*ptr = 30;
ptr = &b;
*ptr = 40;
```

**Step-by-Step Trace**:

```
Step 1: int a = 10;
┌─────┐
│ a   │ = 10
│Addr:│ = 0x1000
└─────┘

Step 2: int b = 20;
┌─────┐     ┌─────┐
│ a   │     │ b   │
│  10 │     │  20 │
│0x1000│    │0x2000│
└─────┘     └─────┘

Step 3: int *ptr = &a;
┌─────┐     ┌─────┐     ┌──────┐
│ a   │     │ b   │     │ ptr  │
│  10 │     │  20 │     │0x1000│ → points to a
│0x1000│    │0x2000│    └──────┘
└─────┘     └─────┘

Step 4: *ptr = 30; (change value at ptr's address)
┌─────┐     ┌─────┐     ┌──────┐
│ a   │     │ b   │     │ ptr  │
│  30 │←────│  20 │     │0x1000│
│0x1000│    │0x2000│    └──────┘
└─────┘     └─────┘

Step 5: ptr = &b; (ptr now points to b)
┌─────┐     ┌─────┐     ┌──────┐
│ a   │     │ b   │     │ ptr  │
│  30 │     │  20 │     │0x2000│ → now points to b
│0x1000│    │0x2000│    └──────┘
└─────┘     └─────┘

Step 6: *ptr = 40; (change value at ptr's address)
┌─────┐     ┌─────┐     ┌──────┐
│ a   │     │ b   │     │ ptr  │
│  30 │     │  40 │←────│0x2000│
│0x1000│    │0x2000│    └──────┘
└─────┘     └─────┘

Final Result: a = 30, b = 40
```

---

## 7. Operations Summary Table

| Concept | Operation | Syntax | Time Complexity |
|---------|-----------|--------|----------------|
| **Vector** | Access | `v[i]` | O(1) |
| | Push back | `v.push_back(x)` | O(1) |
| | Pop back | `v.pop_back()` | O(1) |
| | Size | `v.size()` | O(1) |
| **Map** | Insert | `m[key] = value` | O(log n) |
| | Search | `m.count(key)` | O(log n) |
| | Delete | `m.erase(key)` | O(log n) |
| **Set** | Insert | `s.insert(x)` | O(log n) |
| | Search | `s.count(x)` | O(log n) |
| | Delete | `s.erase(x)` | O(log n) |
| **Stack** | Push | `s.push(x)` | O(1) |
| | Pop | `s.pop()` | O(1) |
| | Top | `s.top()` | O(1) |
| **Queue** | Push | `q.push(x)` | O(1) |
| | Pop | `q.pop()` | O(1) |
| | Front | `q.front()` | O(1) |

---

## 8. Common Patterns & Tricks

### 💡 TRICK 1: Fast I/O for Competitive Programming
```cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
```
This makes `cin`/`cout` as fast as `scanf`/`printf`!

### 💡 TRICK 2: Auto Keyword
```cpp
auto x = 10;           // int
auto y = 3.14;         // double
auto z = "hello";      // const char*
for (auto it : vec)    // Automatically detects type
```

### 💡 TRICK 3: Range-Based For Loop
```cpp
vector<int> nums = {1, 2, 3, 4, 5};

// Old way
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << " ";
}

// New way (cleaner)
for (int num : nums) {
    cout << num << " ";
}

// Modify elements (use reference)
for (int &num : nums) {
    num *= 2;  // Doubles each element
}
```

### 💡 TRICK 4: Initialize Vector Quickly
```cpp
vector<int> v1(10, 0);        // 10 zeros: [0, 0, ..., 0]
vector<int> v2 = {1, 2, 3};   // Direct initialization
vector<int> v3(v2);           // Copy v2
```

### 💡 TRICK 5: Swap Two Variables
```cpp
int a = 5, b = 10;
swap(a, b);  // Built-in function
cout << a << " " << b;  // 10 5
```

---

## 9. Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Forgetting Semicolons
```cpp
int x = 10  // ERROR: missing semicolon
int y = 20; // Correct
```
✅ **Fix**: Always end statements with `;`

### ❌ Mistake 2: Array Index Out of Bounds
```cpp
int arr[5] = {1, 2, 3, 4, 5};
cout << arr[5];  // ERROR! Valid indices: 0-4
```
✅ **Fix**: Remember indices are 0 to size-1

### ❌ Mistake 3: Uninitialized Variables
```cpp
int x;
cout << x;  // ERROR: x has garbage value
```
✅ **Fix**: Always initialize variables: `int x = 0;`

### ❌ Mistake 4: Integer Division
```cpp
double result = 10 / 3;  // Result: 3.0 (not 3.333!)
```
✅ **Fix**: Make one operand double: `double result = 10.0 / 3;`

### ❌ Mistake 5: Using = Instead of ==
```cpp
if (x = 5) {  // ERROR: assigns 5 to x, always true
    cout << "x is 5";
}
```
✅ **Fix**: Use `==` for comparison: `if (x == 5)`

### ❌ Mistake 6: Forgetting to Include Headers
```cpp
vector<int> v;  // ERROR: missing #include <vector>
```
✅ **Fix**: Always include required headers

---

## 10. Interview Tips & What Companies Ask

### Common Interview Questions:
1. **What is the difference between stack and heap memory?**
2. **Explain pass by value vs pass by reference**
3. **What are pointers? When would you use them?**
4. **Difference between array and vector?**
5. **What is the STL? Name some containers**

### What Interviewers Look For:
- ✅ Understanding of memory management
- ✅ Knowing when to use references vs pointers
- ✅ Familiarity with STL containers
- ✅ Ability to write clean, bug-free code

### Pro Tips:
- Mention **time complexity** when discussing operations
- Explain **why** you chose a specific data structure
- Show you understand **trade-offs** (e.g., array vs vector)

---

## 11. Practice Problems

### 🟢 Easy Problems:
1. **Swap Two Numbers** — Swap without third variable
2. **Factorial** — Calculate factorial using loop
3. **Fibonacci Series** — Print first N Fibonacci numbers
4. **Palindrome Check** — Check if number is palindrome
5. **Prime Check** — Check if number is prime

### 🟡 Medium Problems:
6. **Reverse Array** — Reverse array in-place
7. **Find Max/Min** — Find max and min in array
8. **Remove Duplicates** — Remove duplicates from sorted array
9. **Rotate Array** — Rotate array by K positions
10. **Two Sum** — Find two numbers that add to target 🏢 [Google]

### Problem Links:
- LeetCode Two Sum: https://leetcode.com/problems/two-sum/
- GeeksforGeeks Array Problems: https://geeksforgeeks.org/array-data-structure/

---

## 12. Solved Example Problems

### Example 1: Find Maximum in Array

**Problem**: Find the maximum element in an array.

**Solution**:
```cpp
#include <iostream>
#include <vector>
using namespace std;

int findMax(vector<int>& arr) {
    int max_val = arr[0];  // Assume first element is max
    
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > max_val) {  // Found new max
            max_val = arr[i];
        }
    }
    
    return max_val;
}

int main() {
    vector<int> nums = {3, 7, 2, 9, 5, 1};
    cout << "Maximum: " << findMax(nums) << endl;  // 9
    return 0;
}
```

**Time Complexity**: O(n) — visit each element once  
**Space Complexity**: O(1) — only one variable used

---

### Example 2: Reverse a String

**Problem**: Reverse a string without using built-in functions.

**Solution**:
```cpp
#include <iostream>
#include <string>
using namespace std;

string reverseString(string s) {
    int left = 0;              // Start pointer
    int right = s.size() - 1;  // End pointer
    
    while (left < right) {
        swap(s[left], s[right]);  // Swap characters
        left++;                    // Move left pointer right
        right--;                   // Move right pointer left
    }
    
    return s;
}

int main() {
    string text = "hello";
    cout << "Reversed: " << reverseString(text) << endl;  // olleh
    return 0;
}
```

**Time Complexity**: O(n) — swap n/2 pairs  
**Space Complexity**: O(1) — in-place modification

---

### Example 3: Count Frequency Using Map

**Problem**: Count frequency of each element in array.

**Solution**:
```cpp
#include <iostream>
#include <vector>
#include <map>
using namespace std;

void countFrequency(vector<int>& arr) {
    map<int, int> freq;  // key = number, value = count
    
    for (int num : arr) {
        freq[num]++;  // Increment count for this number
    }
    
    // Print frequencies
    for (auto pair : freq) {
        cout << pair.first << ": " << pair.second << " times" << endl;
    }
}

int main() {
    vector<int> nums = {1, 2, 2, 3, 1, 4, 2, 3};
    countFrequency(nums);
    /* Output:
       1: 2 times
       2: 3 times
       3: 2 times
       4: 1 times
    */
    return 0;
}
```

**Time Complexity**: O(n log n) — map insertions take O(log n)  
**Space Complexity**: O(n) — store frequencies in map

---

## 13. Glossary

| Term | Definition |
|------|------------|
| **Variable** | Named storage location in memory |
| **Data Type** | Specifies what kind of data a variable holds |
| **Pointer** | Variable that stores memory address of another variable |
| **Reference** | Alias (nickname) for an existing variable |
| **Function** | Reusable block of code that performs a task |
| **Array** | Fixed-size collection of elements of same type |
| **Vector** | Dynamic array that can grow/shrink (STL) |
| **STL** | Standard Template Library — pre-built data structures and algorithms |
| **Map** | Associative container storing key-value pairs |
| **Set** | Container storing unique elements in sorted order |
| **Stack** | LIFO data structure (Last In First Out) |
| **Queue** | FIFO data structure (First In First Out) |
| **Class** | Blueprint for creating objects (OOP) |
| **Object** | Instance of a class |
| **Constructor** | Special function called when object is created |
| **Amortized** | Average cost over multiple operations |

---

## 14. Future Questions (Predictions)

Based on current interview trends:
1. **Smart Pointers** — `unique_ptr`, `shared_ptr` (modern C++)
2. **Lambda Functions** — Anonymous functions for STL algorithms
3. **Move Semantics** — `std::move` for efficient resource transfer
4. **Auto and Type Inference** — When to use `auto` keyword
5. **Range-Based Algorithms** — STL algorithms with iterators

---

## 15. Competitive Programming Section

### Fast I/O Template:
```cpp
#include <iostream>
#include <vector>
using namespace std;

void solve() {
    // Your code here
}

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;  // Number of test cases
    cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}
```

### Common CP Shortcuts:
```cpp
#define ll long long
#define vi vector<int>
#define pb push_back
#define all(x) x.begin(), x.end()
#define sortall(x) sort(all(x))
```

### Useful One-Liners:
```cpp
// Sort in descending order
sort(v.rbegin(), v.rend());

// Count occurrences
int cnt = count(v.begin(), v.end(), target);

// Find maximum element
int mx = *max_element(v.begin(), v.end());

// Accumulate (sum)
int sum = accumulate(v.begin(), v.end(), 0);
```

---

**🎉 Congratulations! You've completed the C++ Prerequisites topic!**

**Next Steps**:
1. ✅ Complete all MCQs in `00_mcqs.md`
2. ✅ Solve 10 practice problems
3. ✅ Move to **01_Complexity_Analysis**

[← Back to README](../README.md) | [Next: Complexity Analysis →](../01_Complexity_Analysis/01_notes.md)

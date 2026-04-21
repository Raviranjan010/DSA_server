# C++ Foundation - Quick Revision Cheatsheet

**Revision Time**: 5 minutes  
**Purpose**: Ultra-short summary for quick recall before interviews/contests

---

## 1. Basic Syntax Template

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // Fast I/O (for competitive programming)
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    
    return 0;
}
```

---

## 2. Data Types Quick Reference

| Type | Size | Range | Use Case |
|------|------|-------|----------|
| `int` | 4 bytes | ±2×10⁹ | Counting, indices |
| `long long` | 8 bytes | ±9×10¹⁸ | Large numbers |
| `float` | 4 bytes | 6-7 decimals | Approximate decimals |
| `double` | 8 bytes | 15-16 decimals | Precise decimals |
| `char` | 1 byte | 'A', 'b', etc. | Single character |
| `bool` | 1 byte | true/false | Flags, conditions |
| `string` | Variable | "text" | Text, words |

**Rule of Thumb**: Use `long long` for numbers > 2×10⁹, `double` for decimals

---

## 3. Input/Output

```cpp
// Basic I/O
int x;
cin >> x;                    // Input
cout << x << endl;           // Output

// Multiple inputs
int a, b;
cin >> a >> b;

// String with spaces
string s;
getline(cin, s);

// Fast I/O (must have!)
ios_base::sync_with_stdio(false);
cin.tie(NULL);

// Formatted output
#include <iomanip>
cout << fixed << setprecision(2) << 3.14159;  // 3.14
```

---

## 4. Operators Cheat Sheet

### Arithmetic
```cpp
+  -  *  /  %           // Add, Subtract, Multiply, Divide, Modulus
```
**Important**: 
- `/` with integers truncates: `5/2 = 2`, not `2.5`
- `%` gives remainder: `5%2 = 1`
- Use `5.0/2.0` for decimal division

### Relational (Returns true/false)
```cpp
==  !=  >  <  >=  <=    // Equal, Not equal, Greater, Less, etc.
```

### Logical
```cpp
&&   // AND (both must be true)
||   // OR (at least one true)
!    // NOT (reverse)
```

### Increment/Decrement
```cpp
x++   // Post-increment (use, then increment)
++x   // Pre-increment (increment, then use)
x--   // Decrement
```

### Shorthand
```cpp
x += 5   → x = x + 5
x -= 5   → x = x - 5
x *= 5   → x = x * 5
x /= 5   → x = x / 5
```

---

## 5. Control Flow

### If-Else
```cpp
if (condition) {
    // code
} else if (condition2) {
    // code
} else {
    // code
}
```

### Ternary Operator
```cpp
int max = (a > b) ? a : b;  // if a>b then a, else b
```

### Switch
```cpp
switch (value) {
    case 1:
        // code
        break;  // DON'T FORGET!
    case 2:
        // code
        break;
    default:
        // code
}
```

---

## 6. Loops

### For Loop (Known iterations)
```cpp
for (int i = 0; i < n; i++) {
    // code
}
```

### While Loop (Condition-based)
```cpp
while (condition) {
    // code
    // update condition
}
```

### Do-While (Execute at least once)
```cpp
do {
    // code
} while (condition);
```

### Loop Control
```cpp
break;      // Exit loop immediately
continue;   // Skip current iteration
```

---

## 7. Arrays

```cpp
// Declaration
int arr[5];                    // Size 5
int arr[] = {1, 2, 3, 4, 5};  // Initialize
int arr[5] = {0};             // All zeros

// Access
arr[0]        // First element
arr[4]        // Last element (size-1)

// Size
int n = sizeof(arr)/sizeof(arr[0]);

// 2D Array
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

**Important**: Indices start from 0, not 1!

---

## 8. Functions

```cpp
// Basic function
return_type function_name(parameters) {
    // code
    return value;
}

// Example
int add(int a, int b) {
    return a + b;
}

// Void function (no return)
void print(string msg) {
    cout << msg << endl;
}

// Pass by value (copy)
void func(int x) { }

// Pass by reference (original)
void func(int &x) { }

// Function call
int result = add(5, 3);
```

---

## 9. Strings

```cpp
#include <string>
#include <algorithm>

string s = "Hello";

// Operations
s.length()              // Length: 5
s[0]                    // First char: 'H'
s += " World"           // Concatenation: "Hello World"
s.substr(0, 5)          // Substring: "Hello"
s.find("lo")            // Find: 3
reverse(s.begin(), s.end())  // Reverse

// Input
cin >> s;               // One word
getline(cin, s);        // Full line
```

---

## 10. STL Quick Reference

### Vector (Dynamic Array)
```cpp
#include <vector>

vector<int> v;
v.push_back(10);        // Add element
v.pop_back();           // Remove last
v.size();               // Size
v[i]                    // Access
v.empty()               // Check if empty
```

### Pair
```cpp
pair<int, string> p = {1, "John"};
p.first                 // 1
p.second                // "John"
```

### Map (Key-Value)
```cpp
#include <map>

map<string, int> m;
m["John"] = 85;         // Insert
m["John"]               // Access: 85
m.count("John")         // Check if exists: 1
m.erase("John")         // Remove
```

### Stack (LIFO)
```cpp
#include <stack>

stack<int> st;
st.push(10);            // Push
st.top();               // Top element: 10
st.pop();               // Pop
st.empty();             // Check if empty
```

### Queue (FIFO)
```cpp
#include <queue>

queue<int> q;
q.push(10);             // Push
q.front();              // Front element: 10
q.pop();                // Pop
q.empty();              // Check if empty
```

### Set (Unique, Sorted)
```cpp
#include <set>

set<int> s;
s.insert(10);           // Insert
s.count(10)             // Check if exists: 1
s.erase(10)             // Remove
s.begin()               // First element
```

---

## 11. Useful Algorithms

```cpp
#include <algorithm>

sort(v.begin(), v.end());              // Sort ascending
sort(v.rbegin(), v.rend());            // Sort descending
reverse(v.begin(), v.end());           // Reverse
max(a, b)                              // Maximum
min(a, b)                              // Minimum
swap(a, b)                             // Swap
```

---

## 12. Common Patterns Quick Reference

### Even/Odd Check
```cpp
if (n % 2 == 0) cout << "Even";
else cout << "Odd";

// OR (faster)
if (n & 1) cout << "Odd";
else cout << "Even";
```

### Swap Two Numbers
```cpp
swap(a, b);           // Using STL
// OR
int temp = a;
a = b;
b = temp;
```

### Count Digits
```cpp
int count = 0;
while (n > 0) {
    n /= 10;
    count++;
}
```

### Reverse Number
```cpp
int rev = 0;
while (n > 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
}
```

### Sum of Digits
```cpp
int sum = 0;
while (n > 0) {
    sum += n % 10;
    n /= 10;
}
```

### Factorial
```cpp
long long fact = 1;
for (int i = 2; i <= n; i++) {
    fact *= i;
}
```

### Check Prime
```cpp
bool isPrime = true;
if (n <= 1) isPrime = false;
for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) {
        isPrime = false;
        break;
    }
}
```

---

## 13. Complexity Quick Guide

| Operation | Time | Example |
|-----------|------|---------|
| O(1) | Constant | Array access, math |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Loop through array |
| O(n log n) | Linear-log | Sorting |
| O(n²) | Quadratic | Nested loops |

---

## 14. Common Mistakes to Avoid

❌ `int arr[n];` where n is not constant (use vector)  
❌ `arr[n]` accessing out of bounds (indices: 0 to n-1)  
❌ `5/2` expecting 2.5 (use `5.0/2.0`)  
❌ Forgetting `break` in switch  
❌ Using `cin >>` for string with spaces (use `getline`)  
❌ `x = x++` undefined behavior  
❌ Uninitialized variables contain garbage  
❌ Array index out of bounds (no error, but UB)  

---

## 15. Debugging Checklist

- [ ] Syntax errors (missing semicolons, brackets)?
- [ ] Variable initialized?
- [ ] Array indices correct (0 to n-1)?
- [ ] Loop condition correct (< vs <=)?
- [ ] Integer vs float division?
- [ ] Off-by-one errors?
- [ ] Edge cases (n=0, n=1, negative)?
- [ ] Output format matches problem?

---

## 16. Fast I/O Template (Copy-Paste)

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve() {
    // Your solution here
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    
    return 0;
}
```

---

**Pro Tip**: Bookmark this file and review it daily for 5 minutes until everything becomes muscle memory!

**Next**: 
- [Detailed Notes](notes.md) - For deep understanding
- [Practice Problems](practice.md) - For hands-on practice
- [MCQs](mcqs.md) - For self-assessment

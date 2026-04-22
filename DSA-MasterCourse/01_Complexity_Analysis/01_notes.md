# 01 — Complexity Analysis — Complete Notes

> **What You'll Learn**: Big-O notation, time/space complexity, amortized analysis, and how to analyze any algorithm  
> **Prerequisites**: Basic C++ programming (Topic 00)  
> **Time Required**: 1 week (10-12 hours)

---

## 1. What is Complexity Analysis? (Real-World Analogy)

Imagine you're planning a road trip:

- **Time Complexity** = How long will the trip take? (1 hour? 10 hours?)
- **Space Complexity** = How much fuel/gas do you need? (5 liters? 50 liters?)

Now imagine two routes:
- **Route A**: 100 km, takes 2 hours, uses 10L fuel
- **Route B**: 500 km, takes 10 hours, uses 50L fuel

Which is better? **Route A**, obviously! But how do we know without actually driving?

**Complexity analysis** is like a GPS that tells us:
- How fast an algorithm runs **before** we run it
- How much memory it uses **before** we execute it
- Which algorithm is better for large inputs

💡 **TRICK**: Think of complexity as the **"nutrition label"** for algorithms — it tells you what you're getting before you consume it!

---

## 2. Why Do We Need Complexity Analysis?

### Problem: Measuring actual time is unreliable!

```cpp
// Algorithm 1: Find element in array
for(int i = 0; i < n; i++) {
    if(arr[i] == target) return i;
}

// Algorithm 2: Find element using binary search (sorted array)
int left = 0, right = n-1;
while(left <= right) {
    int mid = left + (right - left) / 2;
    if(arr[mid] == target) return mid;
    else if(arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
```

**Which is faster?**  
If you measure with a stopwatch:
- Depends on your computer speed
- Depends on other running programs
- Depends on input data
- **Cannot compare fairly!**

**Solution**: Count operations mathematically → **Big-O notation**

### Real Reasons:
1. **Predict Performance**: Know how algorithm scales with large inputs
2. **Compare Algorithms**: Objectively decide which is better
3. **Interview Requirement**: Every FAANG interview asks complexity
4. **Optimize Code**: Identify bottlenecks before they become problems
5. **Resource Planning**: Know memory requirements for production systems

---

## 3. Core Concepts & Terminology

### 3.1 Time Complexity

**Definition**: How the **number of operations** grows as input size increases.

**Key Insight**: We don't count exact operations. We count **growth rate**.

```
Input Size (n)    →    Operations
     10           →         100
    100           →       10,000
  1,000           →    1,000,000
 10,000           →  100,000,000
```

If operations = n², we say **Time Complexity = O(n²)**

---

### 3.2 Big-O Notation (Upper Bound)

**Big-O** = **Worst-case scenario** (maximum time algorithm can take)

**Formal Definition**:  
f(n) = O(g(n)) means there exist constants c and n₀ such that:  
f(n) ≤ c × g(n) for all n ≥ n₀

**Simple Translation**:  
"For large enough inputs, my algorithm won't take longer than this"

---

### 3.3 Common Time Complexities (Best to Worst)

```
O(1)     <  O(log n)   <  O(n)   <  O(n log n)   <  O(n²)   <  O(2ⁿ)   <  O(n!)
Constant    Logarithmic    Linear   Linearithmic   Quadratic  Exponential Factorial

  ✅ Excellent     ✅ Good      👍 OK       👍 OK        ⚠️ Bad       ❌ Terrible   ❌ Worst
```

**Visual Growth**:

```
Operations
  ↑
  |                                    O(n²)
  |                               /
  |                          /
  |                     /
  |                /          O(n log n)
  |           /            /
  |      /             /
  |  O(n)          /
  |  /        /
  | /   O(log n)
  |/___/_______________________→ Input (n)
  O(1) →
```

---

### 3.4 Big-Theta (Θ) Notation (Tight Bound)

**Big-Theta** = **Average-case** (exact growth rate)

```cpp
// This is Θ(n) because it ALWAYS runs n times
for(int i = 0; i < n; i++) {
    cout << i << " ";
}
```

**When to use**: When best case = worst case = same complexity

---

### 3.5 Big-Omega (Ω) Notation (Lower Bound)

**Big-Omega** = **Best-case scenario** (minimum time algorithm can take)

```cpp
// Linear search: Ω(1) if element is at first position
for(int i = 0; i < n; i++) {
    if(arr[i] == target) return i;  // Could return immediately!
}
```

---

## 4. Visual Diagram: Complexity Comparison

```
┌──────────────────────────────────────────────────────────────┐
│          Time Complexity Comparison Table                     │
├──────────┬──────────────┬────────────┬────────────────────────┤
│ Big-O    │ Name         │ n=10       │ n=1,000,000            │
├──────────┼──────────────┼────────────┼────────────────────────┤
│ O(1)     │ Constant     │ 1          │ 1                      │
│ O(log n) │ Logarithmic  │ 3          │ 20                     │
│ O(n)     │ Linear       │ 10         │ 1,000,000              │
│ O(n log n)│ Linearithmic│ 30         │ 20,000,000             │
│ O(n²)    │ Quadratic    │ 100        │ 1,000,000,000,000      │
│ O(2ⁿ)    │ Exponential  │ 1,024      │ 10^(300,000)           │
│ O(n!)    │ Factorial    │ 3,628,800  │ ∞ (impossible)         │
└──────────┴──────────────┴────────────┴────────────────────────┘

Key Insight:
- O(1), O(log n): Can handle ANY input size ✅
- O(n), O(n log n): Can handle n ≤ 10⁶ ✅
- O(n²): Can only handle n ≤ 10⁴ ⚠️
- O(2ⁿ), O(n!): Can only handle n ≤ 20 ❌
```

---

## 5. C++ Implementation: Analyzing Code Examples

### Example 1: O(1) — Constant Time

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 100;
    
    // Each of these is O(1) - doesn't depend on n
    int x = 5;              // 1 operation
    int y = x + 10;         // 1 operation
    cout << x + y;          // 1 operation
    
    // Total: 3 operations = O(1)
    // Even if n = 1,000,000, still 3 operations!
    
    return 0;
}
```

**Why O(1)?**  
Number of operations stays constant regardless of input size.

---

### Example 2: O(n) — Linear Time

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 100;
    vector<int> arr(n);
    
    // This loop runs n times
    for(int i = 0; i < n; i++) {        // 1 operation × n times
        arr[i] = i * 2;                  // 1 operation × n times
    }
    
    // Total: 2n operations = O(n)
    // If n doubles, time doubles
    
    return 0;
}
```

**Dry Run** (n = 5):
```
i = 0: arr[0] = 0
i = 1: arr[1] = 2
i = 2: arr[2] = 4
i = 3: arr[3] = 6
i = 4: arr[4] = 8
Total iterations: 5 = n
```

---

### Example 3: O(n²) — Quadratic Time

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    
    // Nested loops: outer runs n times, inner runs n times
    for(int i = 0; i < n; i++) {            // n times
        for(int j = 0; j < n; j++) {        // n times for each i
            cout << "(" << i << "," << j << ") ";  // 1 operation
        }
        cout << endl;
    }
    
    // Total: n × n = n² operations = O(n²)
    // If n doubles, time quadruples!
    
    return 0;
}
```

**Dry Run** (n = 3):
```
i=0: (0,0) (0,1) (0,2)     → 3 operations
i=1: (1,0) (1,1) (1,2)     → 3 operations
i=2: (2,0) (2,1) (2,2)     → 3 operations
Total: 9 = 3² = n² operations
```

---

### Example 4: O(log n) — Logarithmic Time

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 16;
    
    // Variable doubles each iteration: 1, 2, 4, 8, 16
    for(int i = 1; i < n; i *= 2) {
        cout << i << " ";
    }
    // Output: 1 2 4 8
    // Iterations: log₂(16) = 4
    
    return 0;
}
```

**Why O(log n)?**
```
n = 16:
Iteration 1: i = 1
Iteration 2: i = 2   (doubled)
Iteration 3: i = 4   (doubled)
Iteration 4: i = 8   (doubled)
Iteration 5: i = 16  (stops, i >= n)

Total iterations: log₂(16) = 4

Key: If we keep dividing n by 2, how many steps to reach 1?
Answer: log₂(n)
```

**Real-World Analogy**:  
Finding a page in a book:
- **Linear search** (O(n)): Check each page one by one
- **Binary search** (O(log n)): Open middle, eliminate half, repeat

---

### Example 5: O(n log n) — Linearithmic Time

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 8;
    
    // Outer loop: n times
    // Inner loop: log n times
    for(int i = 0; i < n; i++) {            // n times
        for(int j = 1; j < n; j *= 2) {     // log n times
            cout << "*";
        }
        cout << endl;
    }
    
    // Total: n × log n = O(n log n)
    
    return 0;
}
```

**Where you'll see this**: Merge Sort, Quick Sort, Heap Sort

---

### Example 6: O(2ⁿ) — Exponential Time

```cpp
#include <iostream>
using namespace std;

// Fibonacci using recursion (naive approach)
int fibonacci(int n) {
    if(n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    cout << fibonacci(5) << endl;  // 5
    // fibonacci(5) calls fibonacci(4) and fibonacci(3)
    // Each of those calls two more... exponential growth!
    
    return 0;
}
```

**Recursion Tree** (fibonacci(4)):
```
                    fib(4)
                   /      \
              fib(3)      fib(2)
             /     \      /     \
         fib(2)  fib(1) fib(1) fib(0)
        /     \
    fib(1)  fib(0)

Total calls: 9 for n=4
For n=30: Over 2 million calls!
```

---

## 6. Dry Run: Analyzing Complex Code

Let's analyze this step-by-step:

```cpp
void analyze(int n) {
    // Part 1
    for(int i = 0; i < n; i++) {
        cout << i;
    }
    
    // Part 2
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            cout << "*";
        }
    }
    
    // Part 3
    for(int i = 1; i < n; i *= 2) {
        cout << i;
    }
}
```

**Step-by-Step Analysis**:

```
Part 1: Single loop
  → Runs n times
  → Complexity: O(n)

Part 2: Nested loops
  → Outer: n times
  → Inner: n times for each outer iteration
  → Total: n × n = n²
  → Complexity: O(n²)

Part 3: Logarithmic loop
  → i doubles each time: 1, 2, 4, 8, 16, ...
  → Stops when i >= n
  → Number of doublings: log₂(n)
  → Complexity: O(log n)

Overall Complexity:
  O(n) + O(n²) + O(log n)
  = O(n²)  [take the dominant term]
```

💡 **TRICK**: **Dominant Term Rule** — When adding complexities, keep only the FASTEST growing term!
- O(n² + n + log n) → O(n²)
- O(2ⁿ + n³) → O(2ⁿ)
- O(n + 5) → O(n)

---

## 7. All Operations with Time & Space Complexity

### Array Operations:

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Access by index | O(1) | O(1) | Direct memory access |
| Search (unsorted) | O(n) | O(1) | Must check each element |
| Search (sorted, binary) | O(log n) | O(1) | Divide and conquer |
| Insert at end | O(1) | O(1) | If capacity available |
| Insert at beginning | O(n) | O(1) | Must shift all elements |
| Delete at end | O(1) | O(1) | Simple removal |
| Delete at beginning | O(n) | O(1) | Must shift all elements |

### Vector Operations (STL):

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| push_back | O(1)* | O(1) | *Amortized |
| pop_back | O(1) | O(1) | Always constant |
| insert (middle) | O(n) | O(1) | Shifts elements |
| erase (middle) | O(n) | O(1) | Shifts elements |
| resize | O(n) | O(n) | Allocates new array |

### Map/Set Operations (STL):

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| insert | O(log n) | O(1) | Balanced BST |
| search | O(log n) | O(1) | Tree traversal |
| delete | O(log n) | O(1) | Rebalance tree |
| iterate all | O(n) | O(1) | In-order traversal |

### Stack/Queue Operations:

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| push/enqueue | O(1) | O(1) |
| pop/dequeue | O(1) | O(1) |
| top/front | O(1) | O(1) |
| size | O(1) | O(1) |

---

## 8. Common Patterns & Tricks

### 💡 TRICK 1: Drop Constants
```cpp
// This is O(n), NOT O(2n)
for(int i = 0; i < n; i++) {    // n iterations
    cout << i;
}
for(int i = 0; i < n; i++) {    // n iterations
    cout << i * 2;
}
// Total: 2n operations → O(n) [drop constant 2]
```

### 💡 TRICK 2: Drop Lower Order Terms
```cpp
// This is O(n²), NOT O(n² + n + 1)
for(int i = 0; i < n; i++) {          // n iterations
    for(int j = 0; j < n; j++) {      // n² iterations
        cout << "*";
    }
    cout << i;                        // n iterations
}
cout << "Done";                       // 1 iteration
// Total: n² + n + 1 → O(n²) [keep dominant term]
```

### 💡 TRICK 3: Nested Loop Pattern Recognition
```cpp
// Pattern 1: O(n²)
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)

// Pattern 2: O(n²) also!
for(int i = 0; i < n; i++)
    for(int j = i; j < n; j++)
// n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)

// Pattern 3: O(n)
for(int i = 0; i < n; i++)
    for(int j = 0; j < 100; j++)
// 100n → O(n) [100 is constant]
```

### 💡 TRICK 4: Recursive Function Complexity
```cpp
// Single recursive call: O(n)
void func(int n) {
    if(n <= 0) return;
    func(n-1);  // Reduces by 1 each time → n calls
}

// Two recursive calls: O(2ⁿ)
void func(int n) {
    if(n <= 0) return;
    func(n-1);  // Branches into 2 calls
    func(n-1);  // Each branches again → 2ⁿ
}
```

💡 **TRICK 5: Space Complexity Shortcut**
- **Variables**: O(1) space
- **Arrays/Vectors**: O(n) space
- **Recursion**: O(recursion depth) space (call stack)
- **2D Array**: O(n²) space

---

## 9. Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Confusing O(n) with O(n²)
```cpp
// This is O(n), NOT O(n²)
for(int i = 0; i < n; i++) {
    cout << i;
}
for(int j = 0; j < n; j++) {  // Separate loop!
    cout << j;
}
```
✅ **Fix**: Sequential loops ADD → O(n) + O(n) = O(n)

### ❌ Mistake 2: Forgetting Space Complexity of Recursion
```cpp
// Time: O(n), Space: O(n) [call stack], NOT O(1)!
void recursive(int n) {
    if(n <= 0) return;
    recursive(n-1);
}
```
✅ **Fix**: Always count recursion stack space!

### ❌ Mistake 3: Assuming All Loops Are O(n)
```cpp
// This is O(log n), NOT O(n)
for(int i = 1; i < n; i *= 2) {
    cout << i;
}
```
✅ **Fix**: Check how loop variable changes (multiplication → logarithmic)

### ❌ Mistake 4: Ignoring Amortized Analysis
```cpp
vector<int> v;
for(int i = 0; i < n; i++) {
    v.push_back(i);  // O(1) amortized, not always O(1)
}
```
✅ **Fix**: push_back is O(1) amortized (occasionally O(n) for resizing)

### ❌ Mistake 5: Wrong Complexity for String Operations
```cpp
string s1 = "hello";
string s2 = "world";
string s3 = s1 + s2;  // O(n) where n = length of strings, NOT O(1)!
```
✅ **Fix**: String concatenation copies characters → O(length)

---

## 10. Interview Tips & What Companies Ask

### Most Common Interview Questions:
1. **"What is the time complexity of this code?"** (90% of interviews)
2. **"Can you optimize this algorithm?"** 
3. **"What is the space complexity?"**
4. **"Explain Big-O to a non-technical person"**
5. **"When would you use O(n²) vs O(n log n)?"**

### What Interviewers Look For:
- ✅ Can you analyze code without running it?
- ✅ Do you understand trade-offs (time vs space)?
- ✅ Can you identify bottlenecks?
- ✅ Can you explain complexity in simple terms?

### Pro Tips for Interviews:
1. **Always state complexity** after writing code
2. **Explain your reasoning**: "This is O(n) because..."
3. **Mention trade-offs**: "We can reduce time to O(log n) but need O(n) extra space"
4. **Use examples**: "For n=1000, O(n²) means 1,000,000 operations"

---

## 11. Practice Problems

### 🟢 Easy Problems:
1. **Analyze Simple Loop** — Find complexity of single loop
2. **Constant Time Check** — Identify O(1) operations
3. **Nested Loop Count** — Count operations in nested loops
4. **Logarithmic Pattern** — Identify O(log n) loops
5. **Recursive Fibonacci** — Analyze naive recursion complexity

### 🟡 Medium Problems:
6. **Multiple Loops** — Analyze code with sequential + nested loops 🏢 [Amazon]
7. **Recursive Function** — Find complexity of recursive algorithms 🏢 [Google]
8. **Space Complexity** — Analyze memory usage 🏢 [Microsoft]
9. **Amortized Analysis** — Vector push_back pattern 🏢 [Meta]
10. **Optimize Brute Force** — Reduce O(n²) to O(n log n) 🏢 [Adobe]

### Problem Links:
- LeetCode Complexity Problems: https://leetcode.com/tag/
- GeeksforGeeks Analysis: https://geeksforgeeks.org/analysis-algorithms/

---

## 12. Solved Example Problems

### Example 1: Analyze This Code

**Problem**: Find time and space complexity:
```cpp
void function(int n) {
    int count = 0;
    for(int i = 0; i < n; i++) {
        for(int j = i; j < n; j++) {
            count++;
        }
    }
}
```

**Solution**:

**Time Complexity Analysis**:
```
i = 0: inner loop runs n times (j = 0 to n-1)
i = 1: inner loop runs n-1 times (j = 1 to n-1)
i = 2: inner loop runs n-2 times (j = 2 to n-1)
...
i = n-1: inner loop runs 1 time

Total: n + (n-1) + (n-2) + ... + 1
     = n(n+1)/2
     = (n² + n)/2
     = O(n²)  [drop constant 1/2 and lower term n]
```

**Space Complexity**: O(1) — only using variables (count, i, j)

---

### Example 2: Recursive Complexity

**Problem**: Find complexity:
```cpp
int func(int n) {
    if(n <= 1) return 1;
    return func(n-1) + func(n-2);
}
```

**Solution**:

**Recursion Tree**:
```
                    func(n)
                   /       \
            func(n-1)     func(n-2)
            /     \       /       \
      func(n-2) func(n-3) ...    ...
      /      \
 func(n-3) func(n-4)

Height of tree: n
Branches per node: 2
Total nodes: 2⁰ + 2¹ + 2² + ... + 2ⁿ⁻¹ = 2ⁿ - 1

Time Complexity: O(2ⁿ)
Space Complexity: O(n) [maximum recursion depth]
```

---

### Example 3: Amortized Analysis

**Problem**: What is the complexity of n push_back operations?

```cpp
vector<int> v;
for(int i = 0; i < n; i++) {
    v.push_back(i);
}
```

**Solution**:

**Understanding Vector Resizing**:
```
Capacity: 1 → 2 → 4 → 8 → 16 → ... (doubles when full)

Cost analysis:
- push_back #1: 1 operation (no resize)
- push_back #2: 2 operations (resize: copy 1 element + add new)
- push_back #3: 1 operation (no resize)
- push_back #4: 4 operations (resize: copy 3 elements + add new)
- push_back #5: 1 operation
- ...

Total cost for n operations:
= n (for normal insertions) + (1 + 2 + 4 + 8 + ... + n/2) (for resizing)
= n + (n - 1)  [geometric series]
= 2n - 1
= O(n) for n operations

Amortized cost per operation:
= O(n) / n = O(1) per push_back
```

**Answer**: O(1) amortized per operation, O(n) total for n operations

---

## 13. Glossary

| Term | Definition |
|------|------------|
| **Time Complexity** | How runtime grows with input size |
| **Space Complexity** | How memory usage grows with input size |
| **Big-O (O)** | Upper bound (worst-case) complexity |
| **Big-Theta (Θ)** | Tight bound (average-case) complexity |
| **Big-Omega (Ω)** | Lower bound (best-case) complexity |
| **Constant Time** | O(1) — doesn't depend on input size |
| **Linear Time** | O(n) — grows proportionally with input |
| **Quadratic Time** | O(n²) — grows with square of input |
| **Logarithmic Time** | O(log n) — grows with log of input |
| **Amortized Analysis** | Average cost per operation over many operations |
| **Dominant Term** | Fastest-growing term in complexity expression |
| **Call Stack** | Memory used by recursive function calls |
| **Growth Rate** | How quickly complexity increases as n grows |

---

## 14. Future Questions (Predictions)

Based on current interview trends:
1. **Space-Time Trade-offs** — When to sacrifice space for time
2. **Average vs Worst Case** — QuickSort O(n log n) vs O(n²)
3. **Amortized Analysis** — Dynamic array resizing, hash table operations
4. **Complexity of STL Operations** — Deep understanding of internal implementations
5. **Lower Bounds** — Proving an algorithm is optimal

---

## 15. Competitive Programming Section

### Operation Limits (1 Second):
```
n ≤ 10⁶:  O(n) or O(n log n) acceptable
n ≤ 10⁴:  O(n²) acceptable
n ≤ 500:  O(n³) acceptable
n ≤ 20:   O(2ⁿ) acceptable
n ≤ 10:   O(n!) acceptable
```

### Quick Complexity Check:
```cpp
// If you see this pattern in contest:
for(...)           // O(n)
  for(...)         // O(n)
    for(...)       // O(n)

if n = 10⁵: n³ = 10¹⁵ → TLE! ❌
if n = 100: n³ = 10⁶ → OK ✅
```

### Common Optimizations:
```cpp
// O(n²) → O(n log n): Use sorting + binary search
// O(n²) → O(n): Use hash map for lookups
// O(2ⁿ) → O(n): Use dynamic programming (memoization)
// O(n) → O(log n): Use binary search on sorted data
```

---

**🎉 Congratulations! You've mastered Complexity Analysis!**

**Next Steps**:
1. ✅ Complete all MCQs in `01_mcqs.md`
2. ✅ Practice analyzing 20+ code snippets
3. ✅ Move to **02_Arrays**

[← Back to README](../README.md) | [Next: Arrays →](../02_Arrays/02_notes.md)

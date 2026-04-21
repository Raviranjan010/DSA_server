# Fundamentals - Complete Guide

## 📚 How to Use This Module

**Learning Path**:
1. **Read** [notes.md](notes.md) ← You are here
2. **Practice** [practice.md](practice.md) - Solve problems level by level
3. **Check Solutions** [solutions.md](solutions.md) - Only after attempting
4. **Test Yourself** [mcqs.md](mcqs.md) - MCQs for self-assessment
5. **Quick Review** [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md) - 5-minute revision
6. **If Stuck** [If_You_Get_Stuck.md](If_You_Get_Stuck.md) - Problem-solving strategy
7. **Avoid Traps** [Common_Interview_Traps.md](Common_Interview_Traps.md) - Interview mistakes

## Table of Contents

1. [Time & Space Complexity](#1-time--space-complexity)
2. [Big-O Notation](#2-big-o-notation)
3. [Common Complexity Classes](#3-common-complexity-classes)
4. [How to Calculate Complexity](#4-how-to-calculate-complexity)
5. [Space Complexity Analysis](#5-space-complexity-analysis)
6. [Basic Math for DSA](#6-basic-math-for-dsa)
7. [Bit Manipulation](#7-bit-manipulation)
8. [Pattern Recognition Guide](#8-pattern-recognition-guide)
9. [3-Layer Learning Approach](#9-3-layer-learning-approach)

---

## 1. Time & Space Complexity

### Why Do We Need Complexity Analysis?

**Real-Life Example**: You want to travel from City A to City B.
- **Option 1**: Walk (slow but cheap)
- **Option 2**: Drive (faster but costs fuel)
- **Option 3**: Fly (fastest but expensive)

**In programming**: Different algorithms solve the same problem with different speeds and memory usage.

**Complexity analysis helps us**:
- Predict how fast code will run
- Compare different solutions
- Choose the best algorithm for large inputs
- Avoid "Time Limit Exceeded" errors

### What is Time Complexity?

**Time Complexity** = How the runtime grows as input size increases.

**Important**: We don't measure actual time (seconds), we measure **growth rate**.

```cpp
// Example 1: Constant time - O(1)
int add(int a, int b) {
    return a + b;  // Takes same time regardless of input
}

// Example 2: Linear time - O(n)
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";  // Runs n times
    }
}

// Example 3: Quadratic time - O(n²)
void printPairs(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << arr[i] << "," << arr[j] << endl;  // Runs n×n times
        }
    }
}
```

### What is Space Complexity?

**Space Complexity** = How much extra memory an algorithm needs as input grows.

```cpp
// O(1) space - No extra memory
int sum(int arr[], int n) {
    int total = 0;  // Only one variable
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}

// O(n) space - Creates new array
vector<int> doubleArray(int arr[], int n) {
    vector<int> result(n);  // New array of size n
    for (int i = 0; i < n; i++) {
        result[i] = arr[i] * 2;
    }
    return result;
}
```

---

## 2. Big-O Notation

### What is Big-O?

**Big-O Notation** describes the WORST-CASE scenario of an algorithm.

**Why worst case?**
- Guarantees performance won't be worse
- Important for interviews and competitive programming
- Helps handle edge cases

### Common Big-O Notations (Best to Worst)

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access, hash map lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search, traversal |
| O(n log n) | Linearithmic | Merge sort, quick sort |
| O(n²) | Quadratic | Bubble sort, nested loops |
| O(2ⁿ) | Exponential | Fibonacci (naive recursion) |
| O(n!) | Factorial | Permutations, traveling salesman |

### Visual Comparison

```
Input Size (n) →    10      100      1,000      10,000

O(1)               1        1         1           1
O(log n)           3        7         10          13
O(n)              10      100      1,000      10,000
O(n log n)        30      700     10,000     130,000
O(n²)            100    10,000   1,000,000  100,000,000
O(2ⁿ)         1,024   HUGE      IMPOSSIBLE   IMPOSSIBLE
```

**Key Insight**: For n = 10⁵:
- O(n) → 100,000 operations ✅ (Acceptable)
- O(n²) → 10,000,000,000 operations ❌ (Too slow!)

---

## 3. Common Complexity Classes

### O(1) - Constant Time

**Definition**: Runtime doesn't depend on input size.

```cpp
// Examples of O(1) operations:
int x = arr[0];           // Array access
int y = map["key"];       // Hash map lookup
stack.push(10);           // Stack push
queue.pop();              // Queue pop
```

### O(log n) - Logarithmic Time

**Definition**: Runtime grows logarithmically (very slow growth).

**Example: Binary Search**
```cpp
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
```

**Why O(log n)?**
- Each step eliminates HALF of remaining elements
- 1000 → 500 → 250 → 125 → ... → 1
- Takes only ~10 steps for 1000 elements!

### O(n) - Linear Time

**Definition**: Runtime grows directly with input size.

```cpp
// Examples of O(n) operations:
for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";  // Visit each element once
}
```

### O(n log n) - Linearithmic Time

**Definition**: Slightly slower than linear, but much faster than quadratic.

**Example: Merge Sort, Quick Sort**
```cpp
// Most efficient sorting algorithms are O(n log n)
sort(arr.begin(), arr.end());  // C++ STL sort
```

### O(n²) - Quadratic Time

**Definition**: Runtime grows with square of input size.

```cpp
// Nested loops = usually O(n²)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // This runs n×n times
    }
}
```

**When acceptable?**
- Small inputs (n < 1000)
- Simple to implement
- No better algorithm available

---

## 4. How to Calculate Complexity

### Rule 1: Drop Constants

```cpp
// WRONG: O(2n)
for (int i = 0; i < n; i++) { cout << i; }
for (int i = 0; i < n; i++) { cout << i; }

// CORRECT: O(n)
// We drop the constant 2
```

### Rule 2: Drop Non-Dominant Terms

```cpp
// WRONG: O(n² + n)
for (int i = 0; i < n; i++) {          // O(n)
    for (int j = 0; j < n; j++) {      // O(n²)
        cout << i << j;
    }
}

// CORRECT: O(n²)
// n² dominates n, so we drop n
```

### Rule 3: Different Inputs = Different Variables

```cpp
int sumArrays(int a[], int b[], int sizeA, int sizeB) {
    for (int i = 0; i < sizeA; i++) { }  // O(a)
    for (int i = 0; i < sizeB; i++) { }  // O(b)
    return sizeA + sizeB;
}

// Complexity: O(a + b), NOT O(n)
// Two different inputs = two different variables
```

### Rule 4: Worst Case Matters

```cpp
int search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;  // Could return early
    }
    return -1;
}

// Best case: O(1) - found at first position
// Average case: O(n/2) = O(n)
// Worst case: O(n) - not in array or at end
// Big-O = O(n) (we care about worst case)
```

### Practice Examples

**Example 1**:
```cpp
for (int i = 0; i < n; i++) {          // O(n)
    for (int j = i; j < n; j++) {      // O(n) but decreases
        cout << i << j;
    }
}
// Total: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2
// Complexity: O(n²)
```

**Example 2**:
```cpp
for (int i = 1; i <= n; i *= 2) {      // O(log n)
    cout << i;                          // i doubles each time
}
// 1, 2, 4, 8, 16, ... n
// Takes log₂(n) iterations
```

**Example 3**:
```cpp
for (int i = 0; i < n; i++) {          // O(n)
    for (int j = 1; j <= n; j *= 2) {  // O(log n)
        cout << i << j;
    }
}
// Total: O(n × log n) = O(n log n)
```

---

## 5. Space Complexity Analysis

### What Counts as Space?

**Space Complexity** includes:
1. **Input space** (usually not counted)
2. **Auxiliary space** (extra memory used)

### Common Space Complexities

**O(1) Space**:
```cpp
int findMax(int arr[], int n) {
    int maxVal = arr[0];  // Only ONE extra variable
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}
```

**O(n) Space**:
```cpp
vector<int> copyArray(int arr[], int n) {
    vector<int> copy(n);  // New array of size n
    for (int i = 0; i < n; i++) {
        copy[i] = arr[i];
    }
    return copy;
}
```

**O(n²) Space**:
```cpp
vector<vector<int>> createMatrix(int n) {
    vector<vector<int>> matrix(n, vector<int>(n));  // n×n matrix
    return matrix;
}
```

### Recursion and Space

**Important**: Each recursive call uses stack space!

```cpp
// O(n) space due to call stack
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);  // n recursive calls
}

// Call stack: factorial(5) → factorial(4) → ... → factorial(0)
// Maximum depth = n, so space = O(n)
```

### Space-Time Tradeoff

Sometimes we use MORE space to get LESS time:

```cpp
// Approach 1: O(1) space, O(n) time
bool hasDuplicate(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) return true;
        }
    }
    return false;
}

// Approach 2: O(n) space, O(n) time
bool hasDuplicate(int arr[], int n) {
    unordered_set<int> seen;  // Extra space
    for (int x : arr) {
        if (seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}
```

---

## 6. Basic Math for DSA

### Divisibility Rules

```cpp
// Check if divisible
if (n % 3 == 0) cout << "Divisible by 3";
if (n % 5 == 0) cout << "Divisible by 5";

// Extract digits
while (n > 0) {
    int digit = n % 10;  // Last digit
    n /= 10;             // Remove last digit
}
```

### Prime Numbers

**Definition**: A number > 1 divisible only by 1 and itself.

```cpp
// O(√n) prime check
bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    
    return true;
}
```

**Why √n?**
- If n = a × b, at least one factor ≤ √n
- No need to check beyond √n

### GCD (Greatest Common Divisor)

```cpp
// Euclidean Algorithm - O(log(min(a,b)))
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// LCM formula
int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}
```

### Modular Arithmetic

**Why use modulo?**
- Prevent overflow with large numbers
- Common in competitive programming (10⁹ + 7)

```cpp
#define MOD 1000000007

// Addition
int add(int a, int b) {
    return (a + b) % MOD;
}

// Multiplication
int multiply(int a, int b) {
    return ((long long)a * b) % MOD;
}

// Subtraction (handle negative)
int subtract(int a, int b) {
    return ((a - b) % MOD + MOD) % MOD;
}
```

---

## 7. Bit Manipulation

### Bit Manipulation with Binary Visualization

**Why Learn Bit Manipulation?**

- **Faster** than arithmetic operations
- **Memory efficient** (use individual bits as flags)
- **Interview favorite** (shows low-level understanding)
- **Essential** for certain problems

### Understanding Binary Numbers

**Before we start, let's visualize binary:**

```
Decimal → Binary (8-bit representation)

0 → 0000 0000
1 → 0000 0001
2 → 0000 0010
3 → 0000 0011
4 → 0000 0100
5 → 0000 0101
6 → 0000 0110
7 → 0000 0111
8 → 0000 1000
10 → 0000 1010
13 → 0000 1101
15 → 0000 1111
```

**Key Insight**: Each position represents a power of 2
```
Position:  7   6   5   4   3   2   1   0
Bit:       0   0   0   0   1   1   0   1
Value:     0   0   0   0   8   4   0   1  (2^position)

Total: 8 + 4 + 1 = 13
```

### Basic Bitwise Operators (Step-by-Step)

**Example**: `a = 5 (0101)`, `b = 3 (0011)`

**1. AND (&) - Both must be 1**:
```
   0101  (5)
&  0011  (3)
   ----
   0001  (1) ← Only position 0 has both 1s
```

**Real Use Case**: Check if specific bit is set
```cpp
// Check if 3rd bit is set in number
int num = 13;  // 1101
if (num & (1 << 3)) {  // 1 << 3 = 1000
    cout << "3rd bit is SET";
}
```

**2. OR (|) - At least one is 1**:
```
   0101  (5)
|  0011  (3)
   ----
   0111  (7) ← Any position with at least one 1
```

**Real Use Case**: Set a specific bit
```cpp
// Enable permission #5 in flags
int flags = 0;  // 0000 0000
flags = flags | (1 << 5);  // Set bit 5
// flags = 0010 0000 = 32
```

**3. XOR (^) - Bits are different**:
```
   0101  (5)
^  0011  (3)
   ----
   0110  (6) ← Positions where bits differ
```

**Real Use Case**: Find unique element (all others appear twice)
```cpp
// XOR property: a ^ a = 0, a ^ 0 = a
int arr[] = {4, 1, 2, 1, 2, 4, 3};
int result = 0;
for (int x : arr) {
    result ^= x;  // 4^4=0, 1^1=0, 2^2=0, leaves 3
}
// result = 3 (the unique element)
```

**4. NOT (~) - Flip all bits**:
```
   0000 0101  (5)
~  ---------
   1111 1010  (-6 in two's complement)
```

**5. Left Shift (<<) - Multiply by 2**:
```
   0000 0101  (5)
<< 1
   ---------
   0000 1010  (10) ← All bits shift left, multiply by 2
```

**6. Right Shift (>>) - Divide by 2**:
```
   0000 0101  (5)
>> 1
   ---------
   0000 0010  (2) ← All bits shift right, divide by 2
```

### Common Bit Tricks

**1. Check if Odd/Even**:
```cpp
if (n & 1) cout << "Odd";   // Last bit is 1
else cout << "Even";         // Last bit is 0
```

**2. Multiply/Divide by 2**:
```cpp
n << 1;  // n × 2
n >> 1;  // n / 2
```

**3. Swap Without Temp Variable**:
```cpp
a = a ^ b;
b = a ^ b;
a = a ^ b;
// Now a and b are swapped!
```

**4. Check if Power of 2**:
```cpp
bool isPowerOf2(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
// Example: 8 = 1000, 7 = 0111, 8 & 7 = 0000 ✓
```

**5. Count Set Bits**:
```cpp
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1);  // Removes rightmost set bit
        count++;
    }
    return count;
}
```

**6. Get ith Bit**:
```cpp
int getBit(int n, int i) {
    return (n >> i) & 1;
}
```

**7. Set ith Bit**:
```cpp
int setBit(int n, int i) {
    return n | (1 << i);
}
```

**8. Clear ith Bit**:
```cpp
int clearBit(int n, int i) {
    return n & ~(1 << i);
}
```

### Bitmask for Subsets

```cpp
// Generate all subsets of {1, 2, 3}
int n = 3;
for (int mask = 0; mask < (1 << n); mask++) {
    cout << "{ ";
    for (int i = 0; i < n; i++) {
        if (mask & (1 << i)) {
            cout << (i + 1) << " ";
        }
    }
    cout << "}" << endl;
}

// Output:
// { }
// { 1 }
// { 2 }
// { 1 2 }
// { 3 }
// { 1 3 }
// { 2 3 }
// { 1 2 3 }
```

---

## 8. Decision Guide (When to Use What)

### Quick Decision Framework

**When you see a problem, follow this flow:**

```
1. Check Constraints First!
   ↓
   n ≤ 20?    → O(2ⁿ) recursion OK
   n ≤ 1000?  → O(n²) acceptable
   n ≤ 10⁵?   → Need O(n) or O(n log n)
   n ≤ 10⁹?   → Need O(log n) or O(1)
   ↓

2. Identify Problem Type
   ↓
   Search?    → Binary search if sorted, else linear
   Sort?      → Use STL sort() = O(n log n)
   Count?     → Hash map or frequency array
   Optimize?  → Check if greedy/DP works
   Math?      → Look for formulas/patterns
   ↓

3. Choose Data Structure
   ↓
   Need fast lookup?    → Hash map O(1)
   Need sorted order?   → Set/Map O(log n)
   Need FIFO/LIFO?      → Queue/Stack O(1)
   Need random access?  → Array/Vector O(1)
```

### Constraint → Approach Mapping Table

| Constraint (n) | Max Operations | Allowed Complexity | Typical Approaches |
|----------------|----------------|-------------------|-------------------|
| n ≤ 10 | ~10⁷ | O(n!), O(2ⁿ) | Recursion, backtracking, brute force |
| n ≤ 20 | ~10⁷ | O(2ⁿ) | Bitmask DP, recursion |
| n ≤ 100 | ~10⁷ | O(n⁴), O(n³) | Floyd-Warshall, DP |
| n ≤ 500 | ~10⁷ | O(n³) | Matrix multiplication, DP |
| n ≤ 2000 | ~10⁷ | O(n²) | Nested loops, DP, BFS on grid |
| n ≤ 10⁵ | ~10⁸ | O(n log n), O(n) | Sorting, two pointers, greedy |
| n ≤ 10⁶ | ~10⁸ | O(n), O(n log n) | Linear scan, hashing |
| n ≤ 10⁹ | ~10⁸ | O(log n), O(√n), O(1) | Binary search, math formulas |
| n ≤ 10¹⁸ | ~10⁸ | O(log n), O(1) | Matrix exponentiation, closed form |

**Key Insight**: If n = 10⁵ and you write O(n²), that's 10¹⁰ operations = **TLE** (Time Limit Exceeded)!

### Brute Force → Optimization Thinking Flow

**Step-by-Step Process:**

**Step 1: Start with Brute Force**
- What's the simplest solution?
- Try all possibilities
- Don't worry about efficiency yet

**Step 2: Identify Bottleneck**
- Which part is slow?
- Are we doing redundant work?
- Can we avoid recomputation?

**Step 3: Look for Patterns**
- Can we sort to simplify?
- Can we use extra space to save time?
- Is there a mathematical formula?
- Can we use two pointers or sliding window?

**Step 4: Apply Optimization**
- Replace nested loops with hash map
- Use binary search instead of linear
- Apply greedy or DP if optimal substructure exists
- Use mathematical insights

**Example Flow:**

```cpp
// Problem: Find if two numbers sum to target

// BRUTE FORCE: O(n²)
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (arr[i] + arr[j] == target) return true;
    }
}

// BOTTLENECK: Inner loop searches for (target - arr[i])

// OPTIMIZATION: Use hash map for O(1) lookup
unordered_set<int> seen;
for (int x : arr) {
    if (seen.count(target - x)) return true;
    seen.insert(x);
}
// Time: O(n), Space: O(n)

// ALTERNATIVE: If array is sorted, use two pointers
int left = 0, right = n - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return true;
    else if (sum < target) left++;
    else right--;
}
// Time: O(n), Space: O(1)
```

### Common Optimization Patterns

| Pattern | When to Use | Complexity Change |
|---------|-------------|-------------------|
| Hash Map | Need fast lookup | O(n²) → O(n) |
| Two Pointers | Sorted array, pairs | O(n²) → O(n) |
| Binary Search | Sorted data, monotonic | O(n) → O(log n) |
| Prefix Sum | Range sum queries | O(n) per query → O(1) |
| Sliding Window | Subarray/substring | O(n²) → O(n) |
| Greedy | Optimal local choice | O(n²) → O(n) |
| DP | Overlapping subproblems | O(2ⁿ) → O(n²) or O(n) |

---

## 9. Pattern Recognition Guide

### When to Use Which Concept

#### Complexity Analysis:
```
Problem Keywords:
- "Efficient", "Optimize", "Large input (10⁵)"
- "Time limit exceeded", "Too slow"

Think: Calculate time/space complexity
Goal: Reduce from O(n²) to O(n) or O(n log n)
```

#### Math/GCD/LCM:
```
Problem Keywords:
- "Divisible", "Factors", "Multiples"
- "Greatest common", "Least common"
- "Coprime", "Relatively prime"

Think: GCD, LCM, prime factorization
Formula: LCM(a,b) = (a×b) / GCD(a,b)
```

#### Bit Manipulation:
```
Problem Keywords:
- "Binary representation", "Bits"
- "Power of 2", "Even/Odd"
- "XOR", "Mask", "Flags"
- "Set bits", "Count ones"

Think: Bitwise operators, bit tricks
Optimization: Replace arithmetic with bit operations
```

#### Modular Arithmetic:
```
Problem Keywords:
- "Large numbers", "Overflow"
- "Answer modulo 10⁹+7"
- "Last k digits"

Think: Apply modulo at each step
Formula: (a + b) % m = ((a % m) + (b % m)) % m
```

### Decision Framework

```
Problem asks for efficiency?
    ↓ YES
Calculate current complexity
    ↓
Can you reduce it?
    ↓ YES → Use better algorithm/data structure

Problem involves large numbers?
    ↓ YES
Use modular arithmetic
    ↓
Check for overflow before operations

Problem mentions bits/binary?
    ↓ YES
Use bit manipulation
    ↓
Look for patterns (XOR properties, bit tricks)

Problem about divisibility?
    ↓ YES
Use GCD/LCM or prime factorization
```

---

## 10. 3-Layer Learning Approach

### How This Module is Structured

#### Layer 1: Beginner Layer (What & How)
- **Goal**: Understand complexity notation and basic math
- **Focus**: Definitions, simple calculations
- **Example**: 
  ```cpp
  // Recognize O(n) vs O(n²)
  for (int i = 0; i < n; i++) { }        // O(n)
  for (int i = 0; i < n; i++) {          // O(n²)
      for (int j = 0; j < n; j++) { }
  }
  ```

#### Layer 2: Intermediate Layer (Why & When)
- **Goal**: Analyze and optimize algorithms
- **Focus**: Trade-offs, when to use which approach
- **Example**:
  ```cpp
  // Choose between time and space
  // O(n²) time, O(1) space vs O(n) time, O(n) space
  ```

#### Layer 3: Advanced Layer (Edge Cases & Tricks)
- **Goal**: Master complexity analysis and bit tricks
- **Focus**: Optimizations, interview traps
- **Example**:
  ```cpp
  // Bit trick: Fast power of 2 check
  (n & (n-1)) == 0  // Instead of loop
  ```

### Self-Assessment Checklist

**Beginner Level**:
- [ ] Can identify O(1), O(n), O(n²) code
- [ ] Understand what Big-O means
- [ ] Can write basic prime check
- [ ] Know bitwise operators

**Intermediate Level**:
- [ ] Can calculate complexity of any code
- [ ] Understand time-space tradeoffs
- [ ] Can implement GCD/LCM
- [ ] Use bit tricks for common operations

**Advanced Level**:
- [ ] Optimize solutions from O(n²) to O(n log n)
- [ ] Handle modular arithmetic correctly
- [ ] Use bitmasks for subset generation
- [ ] Recognize complexity patterns instantly

---

## 🧠 Active Recall Questions

**Instructions**: Answer these WITHOUT looking at the notes. Test your memory!

### Complexity Analysis
1. What's the time complexity of binary search? Why?
2. Why do we drop constants in Big-O notation?
3. What's the difference between O(n) and O(n log n)? When does it matter?

### Space Complexity
4. Why does recursion use O(n) space?
5. Give an example where you'd trade space for time.
6. What's the space complexity of creating a new array of size n?

### Math for DSA
7. Why do we only check up to √n for prime checking?
8. What's the relationship between GCD and LCM?
9. Why use modulo 10⁹+7 in competitive programming?

### Bit Manipulation
10. How do you check if a number is odd using bits?
11. What does `n & (n-1)` do?
12. How do you multiply a number by 4 using bits?

### Pattern Recognition
13. When you see "optimize this O(n²) solution", what's your first thought?
14. What problems typically use bit manipulation?
15. When should you apply modular arithmetic?

---

**Check Your Answers**: After attempting, review the relevant sections in this file or check [solutions.md](solutions.md)

---

## 🎯 Quick Navigation

**Need to...**
- Learn concepts? → You're in [notes.md](notes.md) ✓
- Practice problems? → Go to [practice.md](practice.md)
- Check solutions? → Go to [solutions.md](solutions.md)
- Test yourself? → Go to [mcqs.md](mcqs.md)
- Quick revision? → Go to [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md)
- Feeling stuck? → Go to [If_You_Get_Stuck.md](If_You_Get_Stuck.md)
- Prepare for interview? → Go to [Common_Interview_Traps.md](Common_Interview_Traps.md)

---

**Keep practicing! Master these fundamentals before moving to Arrays! 🚀**

**Next Topic**: After completing all practice problems and scoring 80%+ on MCQs, move to [02_Arrays](../02_Arrays/notes.md)

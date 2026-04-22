# 04 — Recursion & Backtracking — Complete Notes

> **What You'll Learn**: Recursion fundamentals, recursion trees, backtracking template, permutations, combinations, N-Queens, Sudoku solver  
> **Prerequisites**: Arrays & Strings (Topics 02-03), Functions  
> **Time Required**: 1.5 weeks (15-20 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Foundation for DP, Trees, Graphs)

---

## 1. What is Recursion? (Real-World Analogy)

### The Russian Doll Analogy 🪆

Imagine you have a set of **Russian nesting dolls** — each doll contains a smaller doll inside it.

```
┌─────────────────────────────────────┐
│  Big Doll (n=5)                     │
│  ┌───────────────────────────────┐  │
│  │  Medium Doll (n=4)            │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  Small Doll (n=3)       │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │ Tiny Doll (n=2)   │  │  │  │
│  │  │  │ ┌───────────────┐ │  │  │  │
│  │  │  │ │ Smallest(n=1) │ │  │  │  │
│  │  │  │ └───────────────┘ │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

To open the biggest doll:
1. Open doll #5
2. Open doll #4 (inside #5)
3. Open doll #3 (inside #4)
4. Open doll #2 (inside #3)
5. Open doll #1 (smallest, base case!)
6. Now close them back in reverse order
```

**Recursion is exactly this!**
- A function that **calls itself** to solve a smaller version of the same problem
- Keeps calling itself with smaller inputs until it reaches the **smallest case** (base case)
- Then builds up the solution as it returns

💡 **TRICK**: Think of recursion as **"divide and conquer by making the problem smaller and smaller"**!

---

## 2. Why Do We Need Recursion?

### Real-World Problems That Use Recursion:

1. **File System Navigation**: Folders inside folders inside folders
2. **Organizational Charts**: Manager → Team Lead → Employee hierarchy
3. **Family Trees**: Your parents → their parents → their parents...
4. **Mathematical Calculations**: Factorial, Fibonacci, powers
5. **Game AI**: Chess engine exploring move trees
6. **Parsing Code**: Compilers breaking down expressions

### Why Recursion is Powerful:
- ✅ **Elegant**: Cleaner code for complex problems
- ✅ **Natural**: Some problems are inherently recursive
- ✅ **Foundation**: Trees, Graphs, DP all use recursion
- ✅ **Interview Favorite**: Tests problem-solving thinking

---

## 3. Core Concepts & Terminology

### 3.1 The Three Pillars of Recursion

Every recursive function MUST have:

1. **Base Case**: When to STOP (prevents infinite recursion)
2. **Recursive Case**: How to break problem into smaller subproblem
3. **Progress**: Each call must get closer to base case

```cpp
#include <iostream>
using namespace std;

// Example: Countdown function
void countdown(int n) {
    // 1. BASE CASE: When to stop
    if(n == 0) {
        cout << "Blastoff! 🚀" << endl;
        return;
    }
    
    // 2. Do work
    cout << n << "... ";
    
    // 3. RECURSIVE CASE: Call with smaller problem
    countdown(n - 1);  // Progress: n decreases by 1
}

int main() {
    countdown(5);
    // Output: 5... 4... 3... 2... 1... Blastoff! 🚀
    return 0;
}
```

---

### 3.2 How Recursion Works: The Call Stack

**Real-World Analogy**: Think of recursion like a **stack of plates** at a cafeteria.

```
Function Calls (Stack):

countdown(5)  ← Bottom plate (first called)
countdown(4)  ← Second plate
countdown(3)  ← Third plate
countdown(2)  ← Fourth plate
countdown(1)  ← Fifth plate
countdown(0)  ← Top plate (base case reached!)

After base case, plates are removed one by one (LIFO - Last In First Out)
```

**Memory Visualization**:
```
┌──────────────────────────────────────┐
│           CALL STACK                 │
├──────────────────────────────────────┤
│ countdown(0)  ← Top (executing now)  │
│ countdown(1)  ← Waiting              │
│ countdown(2)  ← Waiting              │
│ countdown(3)  ← Waiting              │
│ countdown(4)  ← Waiting              │
│ countdown(5)  ← Bottom (first call)  │
└──────────────────────────────────────┘

Each function call is a "stack frame" storing:
- Local variables
- Parameters
- Return address
```

---

### 3.3 Factorial: Classic Example

**Mathematical Definition**:
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- n! = n × (n-1)!
- Base case: 0! = 1

```cpp
#include <iostream>
using namespace std;

// Recursive factorial
// Time: O(n), Space: O(n) for call stack
int factorial(int n) {
    // BASE CASE: 0! = 1, 1! = 1
    if(n <= 1) {
        return 1;
    }
    
    // RECURSIVE CASE: n! = n × (n-1)!
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    cout << n << "! = " << factorial(n) << endl;  // 120
    return 0;
}
```

**Dry Run** (factorial(5)):
```
factorial(5)
= 5 * factorial(4)
= 5 * (4 * factorial(3))
= 5 * (4 * (3 * factorial(2)))
= 5 * (4 * (3 * (2 * factorial(1))))
= 5 * (4 * (3 * (2 * 1)))           ← Base case reached!
= 5 * (4 * (3 * 2))
= 5 * (4 * 6)
= 5 * 24
= 120 ✓

Stack depth: 5 (space complexity O(n))
```

**Recursion Tree**:
```
        factorial(5)
            |
        5 * factorial(4)
            |
        4 * factorial(3)
            |
        3 * factorial(2)
            |
        2 * factorial(1)
            |
            1  ← Base case
```

---

## 4. Visual Diagram: Recursion vs Iteration

```
┌─────────────────────────────────────────────────────────────┐
│              RECURSION vs ITERATION                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PROBLEM: Calculate sum from 1 to n                         │
│                                                              │
│  ITERATIVE APPROACH (Loop):                                 │
│  ─────────────────────────                                  │
│  int sum = 0;                                               │
│  for(int i = 1; i <= n; i++) {                              │
│      sum += i;                                              │
│  }                                                          │
│                                                              │
│  Flow: 1 → 2 → 3 → 4 → 5 → Done                            │
│  Space: O(1)  ← Only one variable!                          │
│                                                              │
│  RECURSIVE APPROACH:                                        │
│  ───────────────                                            │
│  int sum(int n) {                                           │
│      if(n == 0) return 0;  // Base case                     │
│      return n + sum(n-1);   // Recursive case               │
│  }                                                          │
│                                                              │
│  Flow: sum(5) → sum(4) → sum(3) → sum(2) → sum(1) → sum(0) │
│        Then unwind: 0+1+2+3+4+5 = 15                        │
│  Space: O(n)  ← n stack frames!                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

💡 **TRICK**: **When to use recursion?**
- Use recursion when problem has **overlapping subproblems** or **tree-like structure**
- Use iteration for **simple loops** (better space complexity)

---

## 5. C++ Implementation: Essential Recursion Patterns

### Pattern 1: Fibonacci Sequence

**Real-World Example**: Rabbit population growth, sunflower spirals, golden ratio in nature!

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Method 1: Naive Recursion (BAD - exponential time!)
// Time: O(2^n), Space: O(n)
int fibonacciNaive(int n) {
    // Base cases
    if(n <= 1) {
        return n;
    }
    
    // Recursive case: F(n) = F(n-1) + F(n-2)
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Method 2: Memoization (Top-Down DP)
// Time: O(n), Space: O(n)
int fibonacciMemo(int n, vector<int>& memo) {
    // Base case
    if(n <= 1) {
        return n;
    }
    
    // Check if already computed
    if(memo[n] != -1) {
        return memo[n];
    }
    
    // Compute and store result
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Method 3: Iterative (BEST for space)
// Time: O(n), Space: O(1)
int fibonacciIterative(int n) {
    if(n <= 1) return n;
    
    int prev2 = 0;  // F(0)
    int prev1 = 1;  // F(1)
    int current;
    
    for(int i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return current;
}

int main() {
    int n = 10;
    
    cout << "Fibonacci sequence:" << endl;
    for(int i = 0; i <= n; i++) {
        cout << "F(" << i << ") = " << fibonacciIterative(i) << endl;
    }
    /*
    Output:
    F(0) = 0
    F(1) = 1
    F(2) = 1
    F(3) = 2
    F(4) = 3
    F(5) = 5
    F(6) = 8
    F(7) = 13
    F(8) = 21
    F(9) = 34
    F(10) = 55
    */
    
    return 0;
}
```

**Recursion Tree** (fibonacciNaive(5)) - Shows why it's slow:
```
                    fib(5)
                   /      \
              fib(4)      fib(3)
             /     \      /     \
         fib(3)  fib(2) fib(2) fib(1)
        /     \
    fib(2)  fib(1)
    /     \
fib(1) fib(0)

Notice: fib(3) computed 2 times, fib(2) computed 3 times!
This is why we need memoization!
```

**Visualization with Memoization**:
```
fib(5) calls fib(4) and fib(3)
  fib(4) computes fib(3) and fib(2), stores results
  fib(3) REUSES stored result! No re-computation!
  
Result: Each value computed exactly ONCE
Time: O(n) instead of O(2^n)
```

💡 **TRICK**: **Fibonacci Mnemonic**: "Each number is the sum of the two before it" — like a financial compound interest pattern!

---

### Pattern 2: Power Function

```cpp
#include <iostream>
using namespace std;

// Calculate x^n using recursion
// Time: O(log n) with optimization, Space: O(log n)
double power(double x, int n) {
    // Base case: x^0 = 1
    if(n == 0) {
        return 1;
    }
    
    // Handle negative powers
    if(n < 0) {
        x = 1 / x;
        n = -n;
    }
    
    // Recursive case
    double half = power(x, n / 2);
    
    // If n is even: x^n = (x^(n/2))^2
    // If n is odd: x^n = x * (x^(n/2))^2
    if(n % 2 == 0) {
        return half * half;
    } else {
        return x * half * half;
    }
}

int main() {
    cout << "2^10 = " << power(2, 10) << endl;  // 1024
    cout << "3^5 = " << power(3, 5) << endl;    // 243
    cout << "2^-3 = " << power(2, -3) << endl;  // 0.125
    
    return 0;
}
```

**Dry Run** (power(2, 10)):
```
power(2, 10)
= power(2, 5)^2
= (2 * power(2, 2)^2)^2
= (2 * (power(2, 1)^2)^2)^2
= (2 * ((2 * power(2, 0)^2)^2))^2
= (2 * ((2 * 1^2)^2))^2
= (2 * (2^2))^2
= (2 * 4)^2
= 8^2
= 1024 ✓

Only 4 recursive calls instead of 10! (log₂(10) ≈ 4)
```

---

### Pattern 3: Sum of Array Elements

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Sum array elements recursively
// Time: O(n), Space: O(n)
int sumArray(const vector<int>& arr, int index) {
    // Base case: reached end of array
    if(index >= arr.size()) {
        return 0;
    }
    
    // Recursive case: current element + sum of rest
    return arr[index] + sumArray(arr, index + 1);
}

// Wrapper function for cleaner interface
int sumArray(const vector<int>& arr) {
    return sumArray(arr, 0);  // Start from index 0
}

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    cout << "Sum: " << sumArray(nums) << endl;  // 15
    return 0;
}
```

**Dry Run** (sumArray([1,2,3])):
```
sumArray([1,2,3], 0)
= 1 + sumArray([1,2,3], 1)
= 1 + (2 + sumArray([1,2,3], 2))
= 1 + (2 + (3 + sumArray([1,2,3], 3)))
= 1 + (2 + (3 + 0))        ← Base case
= 1 + (2 + 3)
= 1 + 5
= 6 ✓
```

---

## 6. Backtracking: The Art of Trial and Error

### What is Backtracking?

**Real-World Analogy**: Solving a **maze**!

```
Entrance → ┌───┬───┬───┬───┐
           │   │   │   │   │
           ├───┼───┼───┼───┤
           │   │███│   │   │
           ├───┼───┼───┼───┤
           │   │   │   │███│
           ├───┼───┼───┼───┤
           │███│███│   │   │
           └───┴───┴───┴───┘
                         ↑
                       Exit

Strategy:
1. Try going right → Dead end
2. BACKTRACK to last decision point
3. Try going down → Dead end
4. BACKTRACK again
5. Try different path → Success! 🎉
```

**Backtracking = Recursion + Trial & Error + Undo**

---

### The Backtracking Template (MEMORIZE THIS!)

```cpp
void backtrack(parameters) {
    // 1. BASE CASE: Check if solution found
    if(isValidSolution()) {
        addSolution();
        return;
    }
    
    // 2. TRY ALL POSSIBILITIES
    for(each possible choice) {
        // 3. MAKE CHOICE
        makeChoice();
        
        // 4. RECURSE
        backtrack(newParameters);
        
        // 5. UNDO CHOICE (BACKTRACK)
        undoChoice();
    }
}
```

---

### Pattern 4: Generate All Permutations

**Problem**: Generate all arrangements of [1, 2, 3]

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Time: O(n! × n), Space: O(n)
void permute(vector<int>& nums, int start, vector<vector<int>>& result) {
    // BASE CASE: Reached end, one permutation complete
    if(start == nums.size()) {
        result.push_back(nums);
        return;
    }
    
    // TRY all possible elements at position 'start'
    for(int i = start; i < nums.size(); i++) {
        // MAKE CHOICE: Swap elements
        swap(nums[start], nums[i]);
        
        // RECURSE: Generate permutations for remaining positions
        permute(nums, start + 1, result);
        
        // UNDO CHOICE: Backtrack (swap back)
        swap(nums[start], nums[i]);
    }
}

vector<vector<int>> generatePermutations(vector<int>& nums) {
    vector<vector<int>> result;
    permute(nums, 0, result);
    return result;
}

int main() {
    vector<int> nums = {1, 2, 3};
    vector<vector<int>> result = generatePermutations(nums);
    
    cout << "All permutations of [1, 2, 3]:" << endl;
    for(const auto& perm : result) {
        cout << "[";
        for(int i = 0; i < perm.size(); i++) {
            cout << perm[i] << (i < perm.size()-1 ? ", " : "");
        }
        cout << "]" << endl;
    }
    /*
    Output:
    [1, 2, 3]
    [1, 3, 2]
    [2, 1, 3]
    [2, 3, 1]
    [3, 2, 1]
    [3, 1, 2]
    */
    
    return 0;
}
```

**Recursion Tree** (permutations of [1,2,3]):
```
                  [1,2,3]
              /      |      \
         swap(0,0) swap(0,1) swap(0,2)
           [1,2,3]  [2,1,3]   [3,2,1]
          /    \      /  \      /    \
     [1,2,3][1,3,2][2,1,3][2,3,1][3,2,1][3,1,2]
       ✓      ✓      ✓      ✓      ✓      ✓

Total: 3! = 6 permutations
```

💡 **TRICK**: **Permutation Formula**: n elements = n! permutations
- 3 elements = 6 permutations
- 5 elements = 120 permutations
- 10 elements = 3,628,800 permutations (exponential growth!)

---

### Pattern 5: Generate All Subsets

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Time: O(2^n × n), Space: O(n)
void generateSubsets(const vector<int>& nums, int index, 
                    vector<int>& current, vector<vector<int>>& result) {
    // BASE CASE: Processed all elements
    if(index == nums.size()) {
        result.push_back(current);
        return;
    }
    
    // OPTION 1: INCLUDE current element
    current.push_back(nums[index]);
    generateSubsets(nums, index + 1, current, result);
    
    // BACKTRACK: Remove element
    current.pop_back();
    
    // OPTION 2: EXCLUDE current element
    generateSubsets(nums, index + 1, current, result);
}

vector<vector<int>> subsets(const vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    generateSubsets(nums, 0, current, result);
    return result;
}

int main() {
    vector<int> nums = {1, 2, 3};
    vector<vector<int>> result = subsets(nums);
    
    cout << "All subsets of [1, 2, 3]:" << endl;
    for(const auto& subset : result) {
        cout << "[";
        for(int i = 0; i < subset.size(); i++) {
            cout << subset[i] << (i < subset.size()-1 ? ", " : "");
        }
        cout << "]" << endl;
    }
    /*
    Output:
    [1, 2, 3]
    [1, 2]
    [1, 3]
    [1]
    [2, 3]
    [2]
    [3]
    []
    */
    
    return 0;
}
```

**Decision Tree** (subsets of [1,2,3]):
```
                    []
                   /  \
              include 1  exclude 1
                /          \
             [1]            []
            /   \          /   \
       include 2 exclude 2     ...
          /         \
       [1,2]        [1]
       /   \        /   \
   incl 3 excl 3  incl 3 excl 3
     /       \      /       \
  [1,2,3]   [1,2] [1,3]    [1]
    ✓        ✓      ✓       ✓

Total: 2^3 = 8 subsets
```

💡 **TRICK**: **Subset Formula**: n elements = 2^n subsets (each element: include OR exclude)

---

### Pattern 6: N-Queens Problem

**Problem**: Place N queens on N×N chessboard so no two queens attack each other.

**Real-World Example**: Like placing security cameras so they don't overlap in coverage!

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Check if placing queen at (row, col) is safe
bool isSafe(const vector<string>& board, int row, int col, int n) {
    // Check left in current row
    for(int i = 0; i < col; i++) {
        if(board[row][i] == 'Q') return false;
    }
    
    // Check upper-left diagonal
    for(int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if(board[i][j] == 'Q') return false;
    }
    
    // Check lower-left diagonal
    for(int i = row, j = col; i < n && j >= 0; i++, j--) {
        if(board[i][j] == 'Q') return false;
    }
    
    return true;
}

// Solve N-Queens using backtracking
bool solveNQueens(vector<string>& board, int col, int n) {
    // BASE CASE: All queens placed
    if(col >= n) {
        return true;
    }
    
    // Try placing queen in each row of current column
    for(int row = 0; row < n; row++) {
        if(isSafe(board, row, col, n)) {
            // MAKE CHOICE: Place queen
            board[row][col] = 'Q';
            
            // RECURSE: Place remaining queens
            if(solveNQueens(board, col + 1, n)) {
                return true;
            }
            
            // UNDO CHOICE: Remove queen (backtrack)
            board[row][col] = '.';
        }
    }
    
    return false;  // No solution found
}

void printBoard(const vector<string>& board) {
    for(const string& row : board) {
        cout << row << endl;
    }
    cout << endl;
}

int main() {
    int n = 4;
    vector<string> board(n, string(n, '.'));
    
    cout << n << "-Queens Solution:" << endl;
    if(solveNQueens(board, 0, n)) {
        printBoard(board);
    } else {
        cout << "No solution exists" << endl;
    }
    /*
    Output for 4-Queens:
    .Q..
    ...Q
    Q...
    ..Q.
    */
    
    return 0;
}
```

**Visualization** (4-Queens solution):
```
. Q . .    ← Queen at (0,1)
. . . Q    ← Queen at (1,3)
Q . . .    ← Queen at (2,0)
. . Q .    ← Queen at (3,2)

✓ No two queens share same row, column, or diagonal!
```

---

## 7. All Operations with Time & Space Complexity

| Problem | Time Complexity | Space Complexity | Notes |
|---------|----------------|------------------|-------|
| Factorial | O(n) | O(n) | Call stack depth |
| Fibonacci (naive) | O(2^n) | O(n) | Exponential! |
| Fibonacci (memo) | O(n) | O(n) | Each value once |
| Power (optimized) | O(log n) | O(log n) | Divide by 2 |
| Permutations | O(n! × n) | O(n) | n! solutions |
| Subsets | O(2^n × n) | O(n) | 2^n solutions |
| N-Queens | O(n!) | O(n²) | Pruning helps |

---

## 8. Common Patterns & Tricks

### 💡 TRICK 1: Recursion to Iteration Conversion
```cpp
// Recursive
int sum(int n) {
    if(n == 0) return 0;
    return n + sum(n-1);
}

// Equivalent Iterative
int sum(int n) {
    int result = 0;
    for(int i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}
```

### 💡 TRICK 2: Tail Recursion (Optimized by Compiler)
```cpp
// NOT tail recursive (does work after call)
int factorial(int n) {
    if(n <= 1) return 1;
    return n * factorial(n-1);  // Multiplication after call
}

// Tail recursive (no work after call)
int factorialTail(int n, int acc = 1) {
    if(n <= 1) return acc;
    return factorialTail(n-1, n * acc);  // Last operation is recursive call
}
```

### 💡 TRICK 3: Memoization Template
```cpp
int solve(int n, vector<int>& memo) {
    // Base case
    if(n <= 0) return baseValue;
    
    // Check memo
    if(memo[n] != -1) return memo[n];
    
    // Compute and store
    memo[n] = recursiveCall();
    return memo[n];
}
```

---

## 9. Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Missing Base Case
```cpp
int factorial(int n) {
    return n * factorial(n-1);  // INFINITE RECURSION!
}
```
✅ **Fix**: Always define base case first!

### ❌ Mistake 2: No Progress Toward Base Case
```cpp
void badFunction(int n) {
    if(n == 0) return;
    badFunction(n);  // Same value, never reaches base case!
}
```
✅ **Fix**: Ensure parameters change: `badFunction(n-1)`

### ❌ Mistake 3: Stack Overflow
```cpp
void recurse(int n) {
    if(n == 0) return;
    int arr[1000];  // Large local variable
    recurse(n-1);
}
```
✅ **Fix**: Minimize local variables in recursive functions

### ❌ Mistake 4: Forgetting to Backtrack
```cpp
void permute(vector<int>& nums) {
    swap(nums[i], nums[j]);
    permute(nums);
    // FORGOT to swap back!
}
```
✅ **Fix**: Always undo changes after recursive call

---

## 10. Interview Tips & What Companies Ask

### Most Common Questions:
1. **Fibonacci Number** 🏢 [Adobe, TCS]
2. **Subsets** 🏢 [Amazon, Google]
3. **Permutations** 🏢 [Microsoft, Meta]
4. **Combination Sum** 🏢 [Amazon] 📅 [Very High]
5. **N-Queens** 🏢 [Google] 📅 [High]
6. **Word Search** 🏢 [Amazon, Microsoft]
7. **Sudoku Solver** 🏢 [Google, Meta]

### What Interviewers Look For:
- ✅ Can you identify recursive structure?
- ✅ Do you define base cases correctly?
- ✅ Can you optimize with memoization?
- ✅ Backtracking: make choice → recurse → undo

---

## 11. Practice Problems

### 🟢 Easy:
1. **Factorial** — Basic recursion
2. **Fibonacci** — With memoization
3. **Sum of Digits** — Recursive sum
4. **Power of Two** — Check if power of 2
5. **Reverse String** — Recursive reversal

### 🟡 Medium:
6. **Subsets** 🏢 [Amazon] 📅 [Very High]
7. **Permutations** 🏢 [Microsoft] 📅 [High]
8. **Combination Sum** 🏢 [Amazon] 📅 [Very High]
9. **Letter Combinations of Phone Number** 🏢 [Meta]
10. **Generate Parentheses** 🏢 [Google]

### 🔴 Hard:
11. **N-Queens** 🏢 [Google] 📅 [High]
12. **Sudoku Solver** 🏢 [Google, Meta]
13. **Word Search II** 🏢 [Amazon]

---

## 12. Glossary

| Term | Definition |
|------|------------|
| **Recursion** | Function that calls itself to solve smaller subproblems |
| **Base Case** | Condition that stops recursion |
| **Recursive Case** | Part where function calls itself |
| **Call Stack** | Memory structure storing function calls |
| **Stack Frame** | Memory for one function call's local variables |
| **Backtracking** | Try → Recurse → Undo pattern |
| **Memoization** | Caching results to avoid re-computation |
| **Recursion Tree** | Visual representation of recursive calls |
| **Tail Recursion** | Recursive call is last operation (compiler optimizes) |
| **Stack Overflow** | Error when call stack exceeds memory limit |

---

## 13. Future Questions & Competitive Programming

### Advanced Topics:
1. **Recursion with Bitmasking** — Subset generation optimization
2. **Dancing Links** — Exact cover problems
3. **Alpha-Beta Pruning** — Game tree optimization
4. **Meet-in-the-Middle** — Split recursion for large inputs

### CP Template:
```cpp
// Fast recursion with memoization
vector<int> memo(1000, -1);
int solve(int n) {
    if(n <= 0) return 0;
    if(memo[n] != -1) return memo[n];
    return memo[n] = recursiveFormula();
}
```

---

**🎉 Congratulations! You've mastered Recursion & Backtracking!**

**Next Steps**:
1. ✅ Complete all MCQs in `04_mcqs.md`
2. ✅ Solve 15 recursion problems
3. ✅ Practice backtracking template
4. ✅ Move to **05_Sorting_and_Searching**

[← Back to README](../README.md) | [Next: Sorting →](../05_Sorting_and_Searching/05_notes.md)

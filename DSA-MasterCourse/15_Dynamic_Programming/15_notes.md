# 15 — Dynamic Programming — Complete Notes

> **What You'll Learn**: DP thinking (memoization → tabulation), 1D/2D DP, knapsack variants, LCS, LIS, matrix chain multiplication  
> **Prerequisites**: Recursion, Arrays (Topics 04, 02)  
> **Time Required**: 2.5 weeks (20-25 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (MOST important for interviews)

---

## 1. What is Dynamic Programming? (Real-World Analogy)

Imagine you're solving a **huge jigsaw puzzle**:

**Without DP**: You keep solving the same sections over and over, forgetting previous work! 😫

**With DP**: You write down solutions to small sections and reuse them! 📝✨

**Real-World Example**: Planning a road trip with multiple stops
- **Naive approach**: Recalculate routes from scratch every time
- **DP approach**: Remember best routes between cities you've already computed

💡 **TRICK**: **DP = Recursion + Memory** (remembering past results to avoid re-computation)

---

## 2. When to Use DP?

Look for these **TWO key properties**:

### ✅ Property 1: Overlapping Subproblems
Same subproblems are solved multiple times

```
Example: Fibonacci
fib(5)
├─ fib(4)
│  ├─ fib(3)
│  │  ├─ fib(2)
│  │  └─ fib(1)
│  └─ fib(2) ← Already computed!
└─ fib(3) ← Already computed!
```

### ✅ Property 2: Optimal Substructure
Optimal solution can be built from optimal solutions of subproblems

```
Example: Shortest path
A → C = (A → B) + (B → C)
If A→B and B→C are shortest, then A→C is shortest!
```

---

## 3. The DP Approach (4-Step Framework)

### Step 1: Identify if DP applies
- Can you break problem into subproblems?
- Are subproblems overlapping?

### Step 2: Define state
- What parameters uniquely identify a subproblem?
- Example: `dp[i]` = answer for input size `i`

### Step 3: Write recurrence relation
- How to build solution for size `n` from smaller sizes?
- Example: `fib(n) = fib(n-1) + fib(n-2)`

### Step 4: Add memoization or build table
- Store results to avoid re-computation

---

## 4. Visual Diagram: DP Approaches

```
┌─────────────────────────────────────────────────────────────┐
│              THREE DP APPROACHES                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. RECURSION (Naive - BAD)                                  │
│     fib(5)                                                   │
│     ├─ fib(4) ← computed multiple times!                    │
│     └─ fib(3) ← computed multiple times!                    │
│     Time: O(2^n) ❌                                          │
│                                                              │
│  2. MEMOIZATION (Top-Down - GOOD)                            │
│     Start from top, store results                            │
│     First time: compute and store                            │
│     Next time: just lookup!                                  │
│     Time: O(n) ✅                                            │
│                                                              │
│  3. TABULATION (Bottom-Up - BEST)                            │
│     Start from bottom, build up                              │
│     dp[0] = 0                                                │
│     dp[1] = 1                                                │
│     dp[2] = dp[1] + dp[0] = 1                               │
│     dp[3] = dp[2] + dp[1] = 2                               │
│     Time: O(n) ✅, No recursion overhead                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. C++ Implementation: Fibonacci (All 3 Approaches)

```cpp
#include <iostream>
#include <vector>
using namespace std;

// ============================================
// APPROACH 1: Naive Recursion (BAD)
// Time: O(2^n), Space: O(n)
// ============================================

int fibNaive(int n) {
    // Base case
    if(n <= 1) return n;
    
    // Recursive case
    return fibNaive(n - 1) + fibNaive(n - 2);
}

// ============================================
// APPROACH 2: Memoization (Top-Down DP)
// Time: O(n), Space: O(n)
// ============================================

int fibMemo(int n, vector<int>& memo) {
    // Base case
    if(n <= 1) return n;
    
    // Check if already computed
    if(memo[n] != -1) {
        return memo[n];
    }
    
    // Compute and store
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// ============================================
// APPROACH 3: Tabulation (Bottom-Up DP)
// Time: O(n), Space: O(n)
// ============================================

int fibTabulation(int n) {
    if(n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for(int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// ============================================
// APPROACH 4: Space Optimized (BEST)
// Time: O(n), Space: O(1)
// ============================================

int fibOptimized(int n) {
    if(n <= 1) return n;
    
    int prev2 = 0;  // fib(0)
    int prev1 = 1;  // fib(1)
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
    
    cout << "Fibonacci(" << n << ") = " << fibOptimized(n) << endl;
    // Output: 55
    
    return 0;
}
```

**Dry Run** (fibTabulation for n=5):
```
dp array: [0, 1, ?, ?, ?, ?]

i=2: dp[2] = dp[1] + dp[0] = 1 + 0 = 1
dp: [0, 1, 1, ?, ?, ?]

i=3: dp[3] = dp[2] + dp[1] = 1 + 1 = 2
dp: [0, 1, 1, 2, ?, ?]

i=4: dp[4] = dp[3] + dp[2] = 2 + 1 = 3
dp: [0, 1, 1, 2, 3, ?]

i=5: dp[5] = dp[4] + dp[3] = 3 + 2 = 5
dp: [0, 1, 1, 2, 3, 5]

Result: 5 ✓
```

💡 **TRICK**: **DP Mnemonic**: "Don't Repeat Yourself" - if computing same thing twice, use DP!

---

## 6. Classic DP Patterns

### Pattern 1: 0/1 Knapsack Problem

**Real-World**: You're a thief with a backpack. Which items to steal for maximum value?

```cpp
// Time: O(n×W), Space: O(n×W)
// n = number of items, W = capacity
int knapsack(int W, const vector<int>& weights, const vector<int>& values, int n) {
    // Create DP table
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    
    // Fill table
    for(int i = 1; i <= n; i++) {
        for(int w = 0; w <= W; w++) {
            // Option 1: Don't include item i
            dp[i][w] = dp[i-1][w];
            
            // Option 2: Include item i (if it fits)
            if(weights[i-1] <= w) {
                dp[i][w] = max(dp[i][w], 
                              values[i-1] + dp[i-1][w - weights[i-1]]);
            }
        }
    }
    
    return dp[n][W];
}

int main() {
    int W = 50;  // Capacity
    vector<int> weights = {10, 20, 30};
    vector<int> values = {60, 100, 120};
    int n = weights.size();
    
    cout << "Maximum value: " << knapsack(W, weights, values, n) << endl;
    // Output: 220 (take items with weights 20 and 30)
    
    return 0;
}
```

**Visualization**:
```
Items: (weight, value)
Item 1: (10, 60)
Item 2: (20, 100)
Item 3: (30, 120)
Capacity: 50

DP Table (rows=items, cols=capacity):
     0  10  20  30  40  50
  0 [0,  0,  0,  0,  0,  0]
  1 [0, 60, 60, 60, 60, 60]  ← Take item 1
  2 [0, 60,100,100,160,160]  ← Take item 2
  3 [0, 60,100,120,160,220]  ← Take items 2+3

Answer: 220 ✓
```

---

### Pattern 2: Longest Common Subsequence (LCS)

```cpp
// Time: O(m×n), Space: O(m×n)
int lcs(string& s1, string& s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for(int i = 1; i <= m; i++) {
        for(int j = 1; j <= n; j++) {
            if(s1[i-1] == s2[j-1]) {
                // Characters match
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                // Take maximum of excluding either character
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}

int main() {
    string s1 = "ABCBDAB";
    string s2 = "BDCAB";
    
    cout << "LCS Length: " << lcs(s1, s2) << endl;
    // Output: 4 (LCS: "BCAB" or "BDAB")
    
    return 0;
}
```

---

### Pattern 3: Longest Increasing Subsequence (LIS)

```cpp
// Time: O(n²), Space: O(n)
int lis(const vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);  // Each element is LIS of length 1
    
    for(int i = 1; i < n; i++) {
        for(int j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS Length: " << lis(nums) << endl;
    // Output: 4 (LIS: [2, 3, 7, 101])
    
    return 0;
}
```

---

## 7. DP Problem-Solving Template

```cpp
// MEMOIZATION TEMPLATE
int solve(int state, vector<int>& memo, parameters) {
    // Base case
    if(base_condition) return base_value;
    
    // Check memo
    if(memo[state] != -1) return memo[state];
    
    // Compute result
    int result = recursive_computation();
    
    // Store and return
    return memo[state] = result;
}

// TABULATION TEMPLATE
int solve(int n) {
    vector<int> dp(n + 1);
    
    // Initialize base cases
    dp[0] = base_value;
    
    // Fill table
    for(int i = 1; i <= n; i++) {
        dp[i] = recurrence_relation;
    }
    
    return dp[n];
}
```

---

## 8. All Operations with Time & Space Complexity

| Problem | Time | Space | Pattern |
|---------|------|-------|---------|
| Fibonacci | O(n) | O(1) | 1D DP |
| Knapsack 0/1 | O(n×W) | O(n×W) | 2D DP |
| LCS | O(m×n) | O(m×n) | 2D DP |
| LIS | O(n²) | O(n) | 1D DP |
| Matrix Chain | O(n³) | O(n²) | 2D DP |
| Edit Distance | O(m×n) | O(m×n) | 2D DP |
| Coin Change | O(n×amount) | O(amount) | 1D DP |

---

## 9. Common Patterns & Tricks

### 💡 TRICK 1: DP State Reduction
```cpp
// If dp[i] only depends on previous row
// Reduce space from O(n×m) to O(m)
vector<int> prev(m), curr(m);
```

### 💡 TRICK 2: Recognize DP Problems
Keywords: "maximum", "minimum", "count ways", "longest", "shortest"

### 💡 TRICK 3: Base Cases First
Always define base cases before recurrence!

---

## 10. Interview Questions

### Most Asked:
1. **Climbing Stairs** 🏢 [Google] 📅 [Very High]
2. **House Robber** 🏢 [Amazon] 📅 [Very High]
3. **Coin Change** 🏢 [Amazon] 📅 [High]
4. **Longest Increasing Subsequence** 🏢 [Microsoft]
5. **Edit Distance** 🏢 [Google]
6. **Unique Paths** 🏢 [Meta]
7. **Partition Equal Subset Sum** 🏢 [Google]

---

## 11. Practice Problems

### 🟢 Easy:
1. Climbing Stairs
2. Fibonacci Number
3. House Robber

### 🟡 Medium:
4. Coin Change 🏢 [Amazon]
5. Longest Increasing Subsequence
6. Unique Paths
7. Word Break

### 🔴 Hard:
8. Edit Distance 🏢 [Google]
9. Regular Expression Matching
10. Burst Balloons

---

## 12. Glossary

| Term | Definition |
|------|------------|
| **Dynamic Programming** | Optimization technique using memoization/tabulation |
| **Memoization** | Top-down DP: cache recursive results |
| **Tabulation** | Bottom-up DP: build table iteratively |
| **State** | Parameters that define a subproblem |
| **Recurrence** | Formula relating subproblems |
| **Overlapping Subproblems** | Same subproblems solved multiple times |
| **Optimal Substructure** | Optimal solution built from optimal sub-solutions |

---

**🎉 You've mastered Dynamic Programming!**

**Next**: [16_Greedy_Algorithms](../16_Greedy_Algorithms/16_notes.md)

[← Back to README](../README.md)

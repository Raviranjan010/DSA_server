## 21_Advanced_DP — Complete Notes

### 1. What is it? (Real-world analogy)
Standard DP is like learning how to paint by numbers on a flat canvas. Advanced DP is like painting an entire 3D architectural model or painting across multiple canvasses that depend on each other based on complex rules. 

Advanced DP moves away from simple 1D strings or 2D grids. It involves DP on structures like **Trees** (where answers flow from leaves to the root), DP on subsets using **Bitmasks** (representing "who visited what" as binary numbers), and **Digit DP** (where you break numbers character by character to count mathematical possibilities).

### 2. Why do we need it? (Motivation)
- DP on Trees handles hierarchical data (e.g., maximum independence sets in an organizational chart).
- Bitmask DP efficiently solves problems that are variations of the Traveling Salesperson Problem (N <= 20) by turning O(N!) factorial brute force into O(2^N * N).
- Digit DP is the only feasible way to answer queries like "Count all numbers between L and R (where L, R up to 10^18) that have a specific property without iterating over all 10^18 numbers!"

### 3. Core Concepts & Terminology
- **DP on Trees**: Post-order traversal where `DP[node]` calculates its answer using `DP[child1], DP[child2], ...`. Usually requires two states: e.g., `DP[u][0]` (including `u`) and `DP[u][1]` (excluding `u`).
- **Bitmask DP**: An integer's binary representation tracks state. E.g., `Set = {A,B,C}` mapped to bits `0,1,2`. Mask `5` (`101` in binary) means A and C are in the set, B is not. `DP[mask]` stores the optimal state for this configuration.
- **Digit DP**: State typically looks like `DP[index][tight][sum]`. `index` is the digit being evaluated, `tight` is a boolean meaning "are we restricted by the upper bound limit?", and `sum` is whatever property we're calculating.

### 4. Visual Diagram
```text
Tree DP (Max Independent Set - Cannot pick adjacent nodes)

         (A)
         / \
       (B) (C)
          /   \
        (D)   (E)

For Node C: 
   If we Pick C -> We CANNOT pick D or E. Answer = 1 + DP_Exclude[D] + DP_Exclude[E]
   If we Exclude C -> We CAN pick or exclude D/E. Answer = max(DP_In[D], DP_Ex[D]) + max(DP_In[E], DP_Ex[E])
```

### 5. C++ Implementation (Bitmask DP Example)
**Problem:** Minimum cost to assign N jobs to N workers (cost matrix `cost[worker][job]`).
```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

int solveBitmaskDP(int worker, int mask, int N, const vector<vector<int>>& cost, vector<vector<int>>& memo) {
    // If all workers are assigned a job, the cost of completing 0 more jobs is 0
    if (worker == N) return 0;
    
    // Check Memoization table
    if (memo[worker][mask] != -1) return memo[worker][mask];
    
    int minCost = INT_MAX;
    
    // Try to assign the current 'worker' to every available job
    for (int job = 0; job < N; job++) {
        // If the 'job'-th bit in the mask is 0, the job is NOT YET taken
        if ((mask & (1 << job)) == 0) {
            // Set the bit (job taken) and calculate rest recursively
            int newMask = mask | (1 << job);
            int currentCost = cost[worker][job] + solveBitmaskDP(worker + 1, newMask, N, cost, memo);
            minCost = min(minCost, currentCost);
        }
    }
    
    // Store and return
    return memo[worker][mask] = minCost;
}

int main() {
    int N = 3;
    vector<vector<int>> cost = {
        {9, 2, 7}, // Worker 0's cost for Job 0, 1, 2
        {6, 4, 3}, // Worker 1
        {5, 8, 1}  // Worker 2
    };
    
    // Memo table: N workers, 2^N possible mask states
    vector<vector<int>> memo(N, vector<int>(1 << N, -1));
    
    cout << "Minimum Assignment Cost: " 
         << solveBitmaskDP(0, 0, N, cost, memo) << endl; 
    // Output should be 2 (W0->J1) + 6 (W1->J0) + 1 (W2->J2) = 9
    return 0;
}
```

### 6. Dry Run / Step-by-Step Trace
**Worker 0**, Mask `000`:
- Try Job 0 (Mask becomes `001`). Path cost = 9 + solve(W1, `001`).
- Try Job 1 (Mask becomes `010`). Path cost = 2 + solve(W1, `010`). (This path looks cheaper, let's trace it)
  - **Worker 1**, Mask `010` (Job 1 taken):
    - Try Job 0 (Mask `011`). Cost = 4 + solve(W2, `011`).
       - **Worker 2**, Mask `011`: Only Job 2 left. (Mask `111`). Cost = 1 + solve(W3, `111`).
       - Base Case hit! Returns 0. 
       - W2 returns `1+0 = 1`.
    - W1 returns `4+1 = 5` or other branch... actually Job 0 costs 6, so `6 + 1 = 7`.
- Min resolves recursively!

### 7. All Operations with Time & Space Complexity
| DP Paradigm | State Space | Transitions | Total Time Complexity | Space Complexity |
|-------------|-------------|-------------|-----------------------|------------------|
| Tree DP | `O(N)` | `O(1)` | `O(N)` | `O(N)` |
| Bitmask DP | `O(2^N * N)`| `O(N)` | `O(N^2 * 2^N)` | `O(N * 2^N)` |
| Digit DP | `O(Digits * Bounds)`| `O(10)` | `O(Digits * 10)` | `O(Digits * Bounds)` |

### 8. Common Patterns & Tricks
💡 TRICK 1: **Digit DP Tight Bound**
When implementing Digit DP to count valid numbers up to a limit string `R`, the `tight` variable tracks if we are restricted by `R`.
e.g., Limit = `452`. At digit 1, if we pick `3`, the rest of the digits can be anything (`0-9`). `tight=0`. If we pick `4`, the next digit MUST NOT exceed `5`. `tight=1`.

💡 TRICK 2: **DP on Trees Initialization**
Usually, you process DP on trees using a simple Post-Order Traversal (DFS). Process children, then compile answers at the current node.

### 9. Common Mistakes & How to Avoid Them
❌ **Mistake:** Doing Bitmask DP for constraints where `N > 25`. 
✅ **Fix:** Arrays of size `2^30` will instantly result in Memory Limit Exceeded. Bitmask DP exclusively applies to `15 <= N <= 22`.

❌ **Mistake:** In Tree DP, getting stuck in an infinite loop flipping between Parent and Child.
✅ **Fix:** Pass the `parent` variable in the DFS signature: `void dfs(int node, int parent)`. Skip processing `if(neighbor == parent)`.

### 10. Interview Tips & What Companies Ask
- **Google** asks Tree DP heavily. ("Diameter of an N-ary Tree", "Maximum path sum").
- **Uber, Lyft, DoorDash** frequently ask Bitmask DP modeling "Routing / Travelling Salesman" variations.
- *Digit DP is extremely rare in FAANG interviews* but extremely common in Competitive Programming (Codeforces).

### 11. Practice Problems
1. 🟡 House Robber III (Tree DP basics) `[Amazon]`
2. 🟡 Binary Tree Maximum Path Sum `[Google]`
3. 🔴 Traveling Salesperson Problem (Bitmask) `[Uber]`
4. 🔴 Minimum XOR Sum of Two Arrays `[Meta]`
5. 🔴 Find the Shortest Superstring (Bitmask) `[Google]`
6. 🔴 Distribute Repeating Integers `[Microsoft]`
7. 🔴 Count of Stepping Numbers in Range (Digit DP) `[CP]`

### 12. Glossary
- **Bitmask**: Representing subsets using bits.
- **Tree DP**: Utilizing the acyclic nature of trees to process overlapping subproblems.
- **State**: What configuration uniquely identifies the required result.

---
### FUTURE QUESTIONS
- Explain the "Matrix Exponentiation" trick for finding the N-th Fibonacci number in O(log N) instead of O(N) using DP transitions.

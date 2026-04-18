# Maximum Subarray (Kadane's Algorithm)

## 📋 Problem Statement

Given an integer array `nums`, find the **contiguous subarray** (containing at least one number) which has the **largest sum**, and return its sum.

A **subarray** is a contiguous part of an array.

**Input:**
- `nums`: Array of integers (-10^5 ≤ nums.length ≤ 10^5)

**Output:**
- Integer: Maximum subarray sum

---

## 🌍 Real-World Context

**Scenario: Stock Trading Profit Maximization**

You're a quantitative analyst at a hedge fund. You have daily profit/loss data for a trading strategy over the past month:

**Daily P/L:** `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`

You need to find: **Which consecutive days gave the maximum profit?**

```
Day 1: -$2 (loss)
Day 2: +$1 (profit)
Day 3: -$3 (loss)
Day 4: +$4 (profit)  ← Start here
Day 5: -$1 (loss)
Day 6: +$2 (profit)
Day 7: +$1 (profit)  ← End here
Day 8: -$5 (loss)
Day 9: +$4 (profit)

Best period: Days 4-7 = 4 + (-1) + 2 + 1 = $6 profit!
```

**Why it matters:**
- **Finance:** Finding best investment period
- **Business:** Identifying most profitable quarter
- **Signal Processing:** Finding strongest signal segment
- **Computer Vision:** Detecting brightest region in image

This exact problem appears in:
- **Amazon:** Optimizing warehouse operations over time
- **Google:** Finding peak traffic periods
- **Bloomberg:** Stock analysis algorithms

---

## 📊 Examples

### Example 1: Basic Case with Mixed Values

**Input:**
```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
```

**Output:**
```
6
```

**Explanation:**
```
Visual representation:
[-2, 1, -3, 4, -1, 2, 1, -5, 4]
              ↑        ↑
           Start      End

Subarray: [4, -1, 2, 1]
Sum: 4 + (-1) + 2 + 1 = 6

Why not include -5? Because it reduces the sum!
Why not include more on the left? -2, 1, -3 = -2 (negative, hurts sum)
```

### Example 2: All Negative Numbers

**Input:**
```
nums = [-5, -2, -8, -1, -3]
```

**Output:**
```
-1
```

**Explanation:**
```
When all numbers are negative, the answer is the MAXIMUM single element.

Why? Adding any two negative numbers makes it MORE negative.

[-5, -2, -8, -1, -3]
              ↑
           Maximum: -1

Not -6 (=-5+-2), not -3 (=-8+-1), just -1
```

### Example 3: Single Element

**Input:**
```
nums = [5]
```

**Output:**
```
5
```

**Explanation:**
```
Only one element, so the maximum subarray is [5] itself.
```

### Example 4: All Positive Numbers

**Input:**
```
nums = [1, 2, 3, 4, 5]
```

**Output:**
```
15
```

**Explanation:**
```
When all positive, take the entire array!

[1, 2, 3, 4, 5]
 ↑              ↑
Start          End

Sum: 1 + 2 + 3 + 4 + 5 = 15
```

---

## 🎯 Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- **At least one element exists**
- **Elements can be negative, zero, or positive**

**Constraints Breakdown:**

| Constraint | Why It Matters | Impact |
|------------|----------------|--------|
| Length up to 10^5 | O(n²) will TLE (10^10 ops) | Need O(n) or O(n log n) |
| Values -10^4 to 10^4 | Sum can be large | Use appropriate data type |
| At least 1 element | No empty array edge case | Simplifies logic |
| Negative values allowed | Can't just sum everything | Must choose carefully |

**Time Limit Implication:**
- 10^5 elements means you have ~10^8 operations max
- O(n²) = 10^10 operations → **TOO SLOW** ❌
- O(n) = 10^5 operations → **PERFECT** ✅

---

## 💡 Pattern Recognition

**Problem Type:** Dynamic Programming / Kadane's Algorithm

**Key Indicators:**
- "Maximum subarray" or "contiguous subarray"
- "Maximum sum" with consecutive elements
- Array has negative numbers
- Looking for optimal segment/period

**Pattern Family:** Kadane's Algorithm (greedy + DP hybrid)

**Similar Problems:**
- [Maximum Product Subarray](medium/maximum-product-subarray.md) - Variation with multiplication
- [Best Time to Buy/Sell Stock](easy/best-time-to-buy-sell-stock.md) - Same pattern, different context
- [Longest Turbulent Subarray](medium/longest-turbulent-subarray.md) - Subarray with conditions
- [Circular Subarray Max](medium/circular-subarray-max.md) - Circular array variation

---

## 🔍 Approach 1: Brute Force

**Time:** O(n³) | **Space:** O(1)

**Idea:** Generate ALL possible subarrays, calculate each sum, return maximum.

**When to mention in interview:**
> "The naive approach checks all subarrays. There are O(n²) subarrays, and summing each takes O(n), giving O(n³). I'll optimize this."

### Pseudocode

```
maxSum = -infinity

For each starting index i from 0 to n-1:
    For each ending index j from i to n-1:
        currentSum = 0
        
        For k from i to j:
            currentSum += nums[k]
        
        maxSum = max(maxSum, currentSum)

Return maxSum
```

### C++ Code

```cpp
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

int maxSubArrayBruteForce(vector<int>& nums) {
    int n = nums.size();
    int maxSum = INT_MIN;
    
    // Try all possible starting points
    for (int i = 0; i < n; i++) {
        // Try all possible ending points
        for (int j = i; j < n; j++) {
            int currentSum = 0;
            
            // Calculate sum of subarray nums[i..j]
            for (int k = i; k <= j; k++) {
                currentSum += nums[k];
            }
            
            // Update maximum
            maxSum = max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}
```

### Why It's Slow

```
Array: [-2, 1, -3, 4]

Subarrays checked:
[-2]                   → sum = -2
[-2, 1]                → sum = -1
[-2, 1, -3]            → sum = -4
[-2, 1, -3, 4]         → sum = 0
[1]                    → sum = 1
[1, -3]                → sum = -2
[1, -3, 4]             → sum = 2
[-3]                   → sum = -3
[-3, 4]                → sum = 1
[4]                    → sum = 4

Total: 10 subarrays for array of size 4
For size n: n*(n+1)/2 subarrays = O(n²)
Each sum calculation: O(n)
Total: O(n³)
```

**Bottleneck:** 
1. We're recalculating sums from scratch
2. Most subarray sums are recomputed many times

---

## 🚀 Approach 2: Better - Cumulative Sum

**Time:** O(n²) | **Space:** O(n)

**Idea:** Use prefix sums to calculate subarray sum in O(1) instead of O(n).

**Key Insight:** 
- Sum of nums[i..j] = prefix[j+1] - prefix[i]
- Precompute prefix sums once

### Pseudocode

```
Create prefix array of size n+1
prefix[0] = 0

For i from 0 to n-1:
    prefix[i+1] = prefix[i] + nums[i]

maxSum = -infinity

For each starting index i from 0 to n-1:
    For each ending index j from i to n-1:
        currentSum = prefix[j+1] - prefix[i]
        maxSum = max(maxSum, currentSum)

Return maxSum
```

### C++ Code

```cpp
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

int maxSubArrayBetter(vector<int>& nums) {
    int n = nums.size();
    
    // Build prefix sum array
    vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    int maxSum = INT_MIN;
    
    // Check all subarrays using prefix sums
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            // O(1) sum calculation
            int currentSum = prefix[j + 1] - prefix[i];
            maxSum = max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}
```

### Improvement Over Brute Force

**Before (Brute Force):**
```
Calculate each subarray sum: O(n)
Total subarrays: O(n²)
Total: O(n³)
```

**After (Prefix Sum):**
```
Calculate each subarray sum: O(1)
Total subarrays: O(n²)
Total: O(n²)
```

**Speedup:** 100,000 elements → 10^15 ops vs 10^10 ops (100,000x faster)

**Still too slow for 10^5!** Need O(n).

---

## ⚡ Approach 3: Kadane's Algorithm (Optimal)

**Time:** O(n) | **Space:** O(1)

**Idea:** At each position, decide: **Extend current subarray OR Start new subarray?**

**Key Insight:** 
- If current subarray sum is **negative**, it will only hurt future sums
- **Drop it** and start fresh from current element
- If current subarray sum is **positive**, it helps future sums
- **Extend it** by including current element

### The "Aha!" Moment

```
Think of it like carrying a backpack:
- Positive numbers = valuable items (keep them!)
- Negative numbers = heavy rocks (drop if too heavy!)

If your backpack is NEGATIVE (more rocks than value):
  → Throw it away, get a new one
  
If your backpack is POSITIVE (more value than rocks):
  → Keep it, add more items
```

### Flowchart

```mermaid
graph TD
    A[Start: maxSum = nums[0], currentSum = nums[0]] --> B{For each element nums[i]}
    B --> C{currentSum + nums[i] vs nums[i]}
    C -->|Extend| D[currentSum = currentSum + nums[i]]
    C -->|Restart| E[currentSum = nums[i]]
    D --> F{currentSum > maxSum?}
    E --> F
    F -->|Yes| G[maxSum = currentSum]
    F -->|No| H[Continue]
    G --> B
    H --> B
    B --> I[Return maxSum]
```

### Pseudocode

```
maxSum = nums[0]
currentSum = nums[0]

For i from 1 to n-1:
    // Decision: Extend or restart?
    currentSum = max(nums[i], currentSum + nums[i])
    
    // Update global maximum
    maxSum = max(maxSum, currentSum)

Return maxSum
```

### C++ Code

```cpp
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Initialize with first element
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    // Iterate from second element
    for (int i = 1; i < nums.size(); i++) {
        // KEY DECISION: Extend current subarray or start new?
        // If currentSum is negative, starting fresh is better
        // If currentSum is positive, extending is better
        currentSum = max(nums[i], currentSum + nums[i]);
        
        // Update the global maximum
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Test the solution
int main() {
    // Test 1: Mixed values
    vector<int> nums1 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int result1 = maxSubArray(nums1);
    // Expected: 6
    
    // Test 2: All negative
    vector<int> nums2 = {-5, -2, -8, -1, -3};
    int result2 = maxSubArray(nums2);
    // Expected: -1
    
    // Test 3: Single element
    vector<int> nums3 = {5};
    int result3 = maxSubArray(nums3);
    // Expected: 5
    
    // Test 4: All positive
    vector<int> nums4 = {1, 2, 3, 4, 5};
    int result4 = maxSubArray(nums4);
    // Expected: 15
    
    return 0;
}
```

### Step-by-Step Dry Run

**Example:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

```
Initial:
maxSum = -2
currentSum = -2

i=1: nums[1] = 1
currentSum = max(1, -2 + 1) = max(1, -1) = 1  ← RESTART (old sum was negative!)
maxSum = max(-2, 1) = 1
State: [1]

i=2: nums[2] = -3
currentSum = max(-3, 1 + (-3)) = max(-3, -2) = -2  ← EXTEND (still better than -3)
maxSum = max(1, -2) = 1
State: [1, -3]

i=3: nums[3] = 4
currentSum = max(4, -2 + 4) = max(4, 2) = 4  ← RESTART (negative sum hurts!)
maxSum = max(1, 4) = 4
State: [4]

i=4: nums[4] = -1
currentSum = max(-1, 4 + (-1)) = max(-1, 3) = 3  ← EXTEND
maxSum = max(4, 3) = 4
State: [4, -1]

i=5: nums[5] = 2
currentSum = max(2, 3 + 2) = max(2, 5) = 5  ← EXTEND
maxSum = max(4, 5) = 5
State: [4, -1, 2]

i=6: nums[6] = 1
currentSum = max(1, 5 + 1) = max(1, 6) = 6  ← EXTEND
maxSum = max(5, 6) = 6
State: [4, -1, 2, 1]

i=7: nums[7] = -5
currentSum = max(-5, 6 + (-5)) = max(-5, 1) = 1  ← EXTEND
maxSum = max(6, 1) = 6
State: [4, -1, 2, 1, -5]

i=8: nums[8] = 4
currentSum = max(4, 1 + 4) = max(4, 5) = 5  ← EXTEND
maxSum = max(6, 5) = 6
State: [4, -1, 2, 1, -5, 4]

Final Answer: 6 ✓

Optimal subarray: [4, -1, 2, 1] (indices 3 to 6)
```

### Why This Is Optimal

**Time Complexity: O(n)**
- Single pass through array: **O(n)**
- Each step: constant time operations (max, addition): **O(1)**
- Total: **O(n)** ✓

**Space Complexity: O(1)**
- Only 2 variables (maxSum, currentSum): **O(1)**
- No extra data structures
- Total: **O(1)** ✓

**Proof of Optimality:**
- Must examine each element at least once → **Ω(n) lower bound**
- Our solution achieves **O(n)** → **OPTIMAL!**
- Space is **O(1)** → **BEST POSSIBLE!**

### The Mathematical Insight

At each index `i`, we have two choices:

1. **Extend previous subarray:** `currentSum + nums[i]`
   - Makes sense if `currentSum > 0` (positive helps)
   
2. **Start new subarray:** `nums[i]`
   - Makes sense if `currentSum < 0` (negative hurts)

**Decision rule:**
```
currentSum = max(nums[i], currentSum + nums[i])
```

This is equivalent to:
```
if (currentSum < 0)
    currentSum = nums[i]        // Drop negative, start fresh
else
    currentSum = currentSum + nums[i]  // Extend positive
```

### Visual Explanation

```
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Running sum visualization:
Position:  0   1   2   3   4   5   6   7   8
Value:    -2   1  -3   4  -1   2   1  -5   4
          └┘   └┘  └┘  └───────────┘  └┘  └┘
          Drop  Ext Ext  Restart     Ext Ext
          
          cur: -2  1  -2    4    3   5   6   1   5
          max: -2  1   1    4    4   5   6   6   6
          
Answer: 6 (from index 3 to 6)
```

---

## 🧪 Edge Cases

### 1. **All Negative Numbers**
```cpp
Input: nums = [-5, -2, -8, -1, -3]
Output: -1

Why?
- Adding negatives makes it worse
- Answer is the maximum single element
- Kadane's handles this naturally!
```

**Trace:**
```
i=0: currentSum = -5, maxSum = -5
i=1: currentSum = max(-2, -5-2) = -2, maxSum = -2
i=2: currentSum = max(-8, -2-8) = -8, maxSum = -2
i=3: currentSum = max(-1, -8-1) = -1, maxSum = -1  ← New max!
i=4: currentSum = max(-3, -1-3) = -3, maxSum = -1

Answer: -1 ✓
```

### 2. **Single Element**
```cpp
Input: nums = [5]
Output: 5

Why?
- Loop doesn't run (starts from i=1)
- Returns nums[0] directly
```

### 3. **All Zeros**
```cpp
Input: nums = [0, 0, 0, 0]
Output: 0

Why?
- currentSum stays 0
- maxSum stays 0
- Works perfectly!
```

### 4. **Alternating Positive/Negative**
```cpp
Input: nums = [5, -10, 5, -10, 5]
Output: 5

Why?
- Each 5 is isolated by -10
- Best is any single 5
- Kadane's restarts at each 5
```

### 5. **Large Values (Overflow Risk)**
```cpp
Input: nums = [10000, 10000, 10000, ...] (10^5 times)
Output: 10^9

Why?
- Max possible sum: 10^5 × 10^4 = 10^9
- Fits in int (max int ≈ 2×10^9)
- Safe to use int
```

### 6. **Mix of Large Positives and Negatives**
```cpp
Input: nums = [10000, -10000, 10000, -10000, 10000]
Output: 10000

Why?
- Each pair cancels out
- Best is single 10000
```

---

## 🎤 Interview Talking Points

### What Interviewer Wants to Hear:

**Before coding:**
> "This is a classic dynamic programming problem solvable with Kadane's Algorithm. The brute force is O(n³) checking all subarrays, but we can optimize to O(n) by making a greedy decision at each step: extend the current subarray if it's positive, otherwise start fresh."

**While coding:**
> "At each index, I decide whether to extend the previous subarray or start a new one. If the current running sum is negative, it will only reduce future sums, so I restart. If it's positive, I extend it."

**After coding:**
> "Time complexity is O(n) because we do one pass with constant work per element. Space is O(1) since we only track two variables. This is optimal because we must examine each element at least once."

### Follow-up Questions They Might Ask:

**Q1: "What if you need to return the subarray itself, not just the sum?"**

> "I'd track the start and end indices. When I restart currentSum, update start index. When maxSum updates, save start and current end indices."

**Solution:**
```cpp
int maxSubArrayWithIndices(vector<int>& nums, int &start, int &end) {
    int maxSum = nums[0], currentSum = nums[0];
    int tempStart = 0;
    start = end = 0;
    
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;  // New start
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;  // New end
        }
    }
    
    return maxSum;
}
```

**Q2: "What if the array is circular?"**

> "Two cases: (1) Maximum subarray is normal (use Kadane's), or (2) Maximum wraps around (total sum - minimum subarray). Take the maximum of both."

**Q3: "What if you need maximum product instead of sum?"**

> "Track both max and min because a negative number can turn a small negative into a large positive. Similar DP but maintain two states."

**Q4: "Can Kadane's fail?"**

> "Only if the array is empty, but constraints say at least 1 element. Otherwise, it always works correctly."

---

## ✅ Test Cases

```cpp
#include <cassert>
#include <iostream>
#include <vector>
using namespace std;

void testMaxSubArray() {
    // Test 1: Mixed values (standard case)
    vector<int> nums1 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    assert(maxSubArray(nums1) == 6);
    
    // Test 2: All negative numbers
    vector<int> nums2 = {-5, -2, -8, -1, -3};
    assert(maxSubArray(nums2) == -1);
    
    // Test 3: Single element
    vector<int> nums3 = {5};
    assert(maxSubArray(nums3) == 5);
    
    // Test 4: All positive numbers
    vector<int> nums4 = {1, 2, 3, 4, 5};
    assert(maxSubArray(nums4) == 15);
    
    // Test 5: All zeros
    vector<int> nums5 = {0, 0, 0, 0};
    assert(maxSubArray(nums5) == 0);
    
    // Test 6: Alternating values
    vector<int> nums6 = {5, -10, 5, -10, 5};
    assert(maxSubArray(nums6) == 5);
    
    // Test 7: Large negative at start
    vector<int> nums7 = {-100, 1, 2, 3};
    assert(maxSubArray(nums7) == 6);
    
    // Test 8: Large negative at end
    vector<int> nums8 = {1, 2, 3, -100};
    assert(maxSubArray(nums8) == 6);
    
    // Test 9: Two elements
    vector<int> nums9 = {-1, -2};
    assert(maxSubArray(nums9) == -1);
    
    // Test 10: Single negative
    vector<int> nums10 = {-5};
    assert(maxSubArray(nums10) == -5);
    
    cout << "All tests passed! ✓" << endl;
}
```

---

## 📝 Common Mistakes

### Mistake 1: Initializing maxSum to 0

```cpp
// WRONG
int maxSum = 0;  // ❌ Fails when all numbers are negative!
int currentSum = 0;

for (int num : nums) {
    currentSum = max(num, currentSum + num);
    maxSum = max(maxSum, currentSum);
}

// Example: nums = [-5, -2, -8]
// Wrong answer: 0 (should be -2)

// CORRECT
int maxSum = nums[0];  // ✓ Start with first element
int currentSum = nums[0];
```

### Mistake 2: Resetting currentSum to 0 Instead of nums[i]

```cpp
// WRONG
if (currentSum < 0) {
    currentSum = 0;  // ❌ Misses the case where nums[i] is also negative!
}

// Example: nums = [-3, -5]
// At i=1: currentSum was -3, reset to 0
// Then add -5: currentSum = -5
// But should be: currentSum = -5 (restart)
// Actually same here, but logic is wrong!

// CORRECT
currentSum = max(nums[i], currentSum + nums[i]);  // ✓ Always correct
```

### Mistake 3: Forgetting to Update maxSum

```cpp
// WRONG
for (int i = 1; i < nums.size(); i++) {
    currentSum = max(nums[i], currentSum + nums[i]);
    // Forgot to update maxSum! ❌
}

// CORRECT
for (int i = 1; i < nums.size(); i++) {
    currentSum = max(nums[i], currentSum + nums[i]);
    maxSum = max(maxSum, currentSum);  // ✓ Update every iteration
}
```

### Mistake 4: Using Wrong Comparison

```cpp
// WRONG
currentSum = max(currentSum, currentSum + nums[i]);  // ❌ Always extends!
// This never restarts, defeats the purpose

// CORRECT
currentSum = max(nums[i], currentSum + nums[i]);  // ✓ Can restart or extend
```

### Mistake 5: Not Handling Single Element

```cpp
// WRONG
int maxSum = INT_MIN;
int currentSum = 0;

for (int num : nums) {
    currentSum += num;
    maxSum = max(maxSum, currentSum);
    if (currentSum < 0) currentSum = 0;
}
// This fails for nums = [-5] (returns 0 instead of -5)

// CORRECT
int maxSum = nums[0];
int currentSum = nums[0];

for (int i = 1; i < nums.size(); i++) {
    currentSum = max(nums[i], currentSum + nums[i]);
    maxSum = max(maxSum, currentSum);
}
```

### Mistake 6: Integer Overflow (Rare but Possible)

```cpp
// POTENTIAL ISSUE
int currentSum = 0;  // int can hold up to ~2×10^9
// If sum exceeds this, overflow!

// WHEN IT MATTERS
// Constraints: nums.length = 10^5, nums[i] = 10^4
// Max sum: 10^5 × 10^4 = 10^9 (fits in int)
// BUT if constraints were larger...

// SAFER VERSION (if needed)
long long currentSum = 0;
long long maxSum = nums[0];
```

---

## 🔄 Revision Notes

**Key pattern:** Kadane's Algorithm (Greedy + DP)

**Template (memorize this):**
```cpp
int maxSum = nums[0];
int currentSum = nums[0];

for (int i = 1; i < nums.size(); i++) {
    currentSum = max(nums[i], currentSum + nums[i]);
    maxSum = max(maxSum, currentSum);
}

return maxSum;
```

**Core Logic:**
```
if (currentSum < 0)
    currentSum = nums[i]        // Restart (negative hurts)
else
    currentSum += nums[i]       // Extend (positive helps)
```

**Trick:** 
- Initialize with `nums[0]`, not 0!
- Decision: `max(nums[i], currentSum + nums[i])`
- Works for all cases (even all negative)

**Time:** O(n) | **Space:** O(1)

**When to use:** 
- "Maximum subarray" or "maximum contiguous sum"
- Array has negative numbers
- Need optimal segment

---

## 🔗 Related Problems

- [Maximum Product Subarray](medium/maximum-product-subarray.md) - Same pattern, but track min AND max
- [Best Time to Buy/Sell Stock](easy/best-time-to-buy-sell-stock.md) - Convert to differences, then Kadane's
- [Longest Turbulent Subarray](medium/longest-turbulent-subarray.md) - Subarray with alternating pattern
- [Circular Subarray Max](medium/circular-subarray-max.md) - Kadane's + wrap-around case
- [Maximum Sum Circular Subarray](medium/maximum-sum-circular-subarray.md) - Advanced variation
- [Subarray Sum Equals K](medium/subarray-sum-equals-k.md) - Prefix sum + hash map
- [Maximum Size Subarray Sum Equals k](medium/maximum-size-subarray-sum-equals-k.md) - Longest subarray with sum k

---

## 🎓 Advanced Variations

### Variation 1: Return the Subarray (Not Just Sum)

```cpp
vector<int> maxSubArrayWithElements(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    int start = 0, end = 0, tempStart = 0;
    
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return vector<int>(nums.begin() + start, nums.begin() + end + 1);
}
```

### Variation 2: Maximum Subarray with At Most K Negatives

```cpp
// Sliding window + Kadane's hybrid
int maxSubArrayWithKNegatives(vector<int>& nums, int k) {
    // Advanced: combine sliding window with Kadane's
    // Track negative count in window
    // Shrink window if negatives > k
}
```

---

**Difficulty:** Easy-Medium ⭐⭐  
**Time to solve:** 15-20 minutes  
**Pattern:** Kadane's Algorithm / Dynamic Programming  
**Company Frequency:** ★★★★★ (Amazon, Google, Meta, Microsoft, Bloomberg)

**Key Takeaway:** Kadane's Algorithm is a beautiful example of **local optimal decisions leading to global optimum**. At each step, make the greedy choice (extend or restart), and you'll find the best subarray!

---

**Next problem:** [Maximum Product Subarray](medium/maximum-product-subarray.md) →

# Two Sum

## 📋 Problem Statement

Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers that add up to the target.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

Return the answer in any order.

**Input:**
- `nums`: Array of integers (2 ≤ nums.length ≤ 10^4)
- `target`: Integer (-10^9 ≤ target ≤ 10^9)

**Output:**
- Array of two integers representing the indices

---

## 🌍 Real-World Context

**Scenario: Amazon Checkout System**

You're building Amazon's checkout system. A customer has a $100 gift card and wants to buy exactly 2 items that use up the entire card balance.

**Product prices:** [20, 45, 30, 55, 80]  
**Gift card:** $100  
**Find:** Which 2 items cost exactly $100?

**Answer:** Items at index 1 ($45) and index 3 ($55) = $100

**Why it matters:** This exact problem appears in:
- E-commerce: Finding product combinations
- Finance: Matching transactions
- Gaming: Pairing players with similar skill levels

---

## 📊 Examples

### Example 1: Basic Case

**Input:**
```
nums = [2, 7, 11, 15], target = 9
```

**Output:**
```
[0, 1]
```

**Explanation:**
```
Step 1: Check nums[0] = 2, need 9 - 2 = 7
Step 2: Is 7 in the array? Yes! At index 1
Step 3: Return [0, 1]

Verification: nums[0] + nums[1] = 2 + 7 = 9 ✓
```

### Example 2: Duplicates Present

**Input:**
```
nums = [3, 3], target = 6
```

**Output:**
```
[0, 1]
```

**Explanation:**
```
Step 1: Check nums[0] = 3, need 6 - 3 = 3
Step 2: Is 3 in the array? Yes! At index 1
Step 3: Return [0, 1]

Note: Same value, different indices - this is allowed!
```

### Example 3: Negative Numbers

**Input:**
```
nums = [-1, -2, -3, -4, -5], target = -8
```

**Output:**
```
[2, 4]
```

**Explanation:**
```
nums[2] + nums[4] = -3 + (-5) = -8 ✓
```

---

## 🎯 Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- **Only one valid answer exists**
- **Cannot use same element twice**

---

## 💡 Pattern Recognition

**Problem Type:** Hash Map / Two Pointer (if sorted)

**Key Indicators:**
- "Find two numbers that sum to target"
- Looking for a **pair** with specific property
- Array is NOT sorted (hash map approach)

**Similar Problems:**
- [Two Sum II - Input Array Is Sorted](easy/two-sum-ii.md)
- [3Sum](medium/3sum.md)
- [4Sum](medium/4sum.md)
- [Two Sum Less Than K](easy/two-sum-less-than-k.md)

---

## 🔍 Approach 1: Brute Force

**Time:** O(n²) | **Space:** O(1)

**Idea:** Check every possible pair of numbers. If any pair sums to target, return their indices.

**When to mention in interview:**
> "I'd start with brute force to show I understand the problem. We check all pairs, which is O(n²). Then I'd optimize."

### Pseudocode

```
For each number at index i:
    For each number at index j (where j > i):
        If nums[i] + nums[j] == target:
            Return [i, j]

Return empty (no solution found)
```

### C++ Code

```cpp
#include <vector>
using namespace std;

vector<int> twoSumBruteForce(vector<int>& nums, int target) {
    int n = nums.size();
    
    // Check every pair
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            // Found the pair!
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    
    // Should never reach here (problem guarantees solution)
    return {};
}

// Test the solution
int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSumBruteForce(nums, target);
    
    // Output: [0, 1]
    return 0;
}
```

### Why It's Slow

```
Array: [2, 7, 11, 15]

Pairs checked:
(2, 7)   ← 1st iteration
(2, 11)  ← 2nd iteration
(2, 15)  ← 3rd iteration
(7, 11)  ← 4th iteration
(7, 15)  ← 5th iteration
(11, 15) ← 6th iteration

Total: 6 checks for array of size 4
For size n: n*(n-1)/2 checks = O(n²)
```

**Bottleneck:** For each element, we're scanning the entire rest of the array.

---

## 🚀 Approach 2: Two-Pass Hash Table

**Time:** O(n) | **Space:** O(n)

**Idea:** 
1. First pass: Store all numbers in a hash table (value → index)
2. Second pass: For each number, check if its complement exists

**Key Insight:** Instead of searching for the complement (O(n)), use hash table lookup (O(1)).

### Pseudocode

```
Create hash map: number → index

First pass:
For each number at index i:
    Store nums[i] → i in hash map

Second pass:
For each number at index i:
    complement = target - nums[i]
    If complement exists in hash map AND index != i:
        Return [i, hash_map[complement]]
```

### C++ Code

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSumTwoPass(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    
    // First pass: Build hash map
    for (int i = 0; i < nums.size(); i++) {
        numMap[nums[i]] = i;
    }
    
    // Second pass: Find complement
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // Check if complement exists and is not the same element
        if (numMap.count(complement) && numMap[complement] != i) {
            return {i, numMap[complement]};
        }
    }
    
    return {};
}
```

### Improvement Over Brute Force

**Before (Brute Force):**
```
For each element: Search rest of array O(n)
Total: O(n) × O(n) = O(n²)
```

**After (Hash Table):**
```
For each element: Hash lookup O(1)
Total: O(n) × O(1) = O(n)
```

**Speedup:** 10,000 elements → 100,000,000 ops vs 10,000 ops (10,000x faster!)

---

## ⚡ Approach 3: One-Pass Hash Table (Optimal)

**Time:** O(n) | **Space:** O(n)

**Idea:** Build the hash table and search simultaneously. For each number, check if its complement is already in the table.

**Key Insight:** We don't need to store all numbers first. As we iterate, we check backwards.

### Flowchart

```mermaid
graph TD
    A[Start] --> B[Create empty hash map]
    B --> C{For each number nums[i]}
    C --> D[Calculate complement = target - nums[i]]
    D --> E{Complement in hash map?}
    E -->|Yes| F[Return current index + stored index]
    E -->|No| G[Store nums[i] → i in hash map]
    G --> C
    F --> H[Done]
```

### Pseudocode

```
Create empty hash map

For each number at index i:
    complement = target - nums[i]
    
    If complement is in hash map:
        Return [hash_map[complement], i]
    
    Store nums[i] → i in hash map

Return empty (no solution)
```

### C++ Code

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // Check if complement already exists
        if (numMap.count(complement)) {
            return {numMap[complement], i};
        }
        
        // Store current number for future lookups
        numMap[nums[i]] = i;
    }
    
    return {};
}

// Test cases
int main() {
    // Test 1: Basic case
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> result1 = twoSum(nums1, 9);
    // Expected: [0, 1]
    
    // Test 2: Duplicates
    vector<int> nums2 = {3, 3};
    vector<int> result2 = twoSum(nums2, 6);
    // Expected: [0, 1]
    
    // Test 3: Negative numbers
    vector<int> nums3 = {-1, -2, -3, -4, -5};
    vector<int> result3 = twoSum(nums3, -8);
    // Expected: [2, 4]
    
    return 0;
}
```

### Why This Is Optimal

**Time Complexity: O(n)**
- Single pass through array: O(n)
- Hash map operations (insert/lookup): O(1) average
- Total: O(n) × O(1) = **O(n)**

**Space Complexity: O(n)**
- Hash map stores at most n elements
- Total: **O(n)**

**Proof of optimality:**
- Must examine each element at least once → Ω(n) lower bound
- Our solution achieves O(n) → **Optimal!**

### Step-by-Step Execution

```
Input: nums = [2, 7, 11, 15], target = 9

i = 0: nums[0] = 2
  complement = 9 - 2 = 7
  Is 7 in numMap? No
  Store: numMap = {2: 0}

i = 1: nums[1] = 7
  complement = 9 - 7 = 2
  Is 2 in numMap? Yes! At index 0
  Return [0, 1] ✓

Only 2 iterations instead of 6 (brute force)!
```

---

## 🧪 Edge Cases

### 1. **Duplicate Numbers**
```cpp
Input: nums = [3, 3], target = 6
Output: [0, 1]
```
**Handling:** Hash map stores latest index, but we check BEFORE storing, so we never match with itself.

### 2. **Negative Numbers**
```cpp
Input: nums = [-10, -5, 0, 5, 10], target = 0
Output: [1, 3]
```
**Handling:** Works naturally (complement of -5 is 5).

### 3. **Large Numbers (Overflow Risk)**
```cpp
Input: nums = [1000000000, -1000000000], target = 0
Output: [0, 1]
```
**Handling:** Use appropriate data types (int works for ±10^9, use long long for larger).

### 4. **Multiple Valid Pairs**
```cpp
Input: nums = [1, 2, 3, 4, 5], target = 5
Possible: [0, 3] (1+4) or [1, 2] (2+3)
Output: Any valid pair (problem guarantees exactly one solution)
```

### 5. **Smallest Array**
```cpp
Input: nums = [1, 2], target = 3
Output: [0, 1]
```
**Handling:** Works naturally (loop runs twice).

---

## 🎤 Interview Talking Points

### What Interviewer Wants to Hear:

**Before coding:**
> "I see this as a lookup problem. The brute force approach checks all pairs in O(n²), but I can optimize using a hash map to O(n) time with O(n) space trade-off."

**While coding:**
> "I'll use a one-pass approach. For each number, I calculate its complement and check if it's already in the hash map. This way, I build the map and search simultaneously."

**After coding:**
> "Time complexity is O(n) because we do one pass with O(1) hash operations. Space is O(n) for the hash map. This is optimal since we must examine each element."

### Follow-up Questions They Might Ask:

**Q1: "What if array is sorted?"**
> "I'd use two pointers: one at start, one at end. If sum is too small, move left pointer right. If too large, move right pointer left. This gives O(n) time with O(1) space."

**Q2: "What if we need ALL pairs?"**
> "I'd modify to continue searching after finding a pair. Need to handle duplicates carefully to avoid counting same pair multiple times."

**Q3: "What if array is too large for memory?"**
> "I'd use external sorting + two pointers, or process in chunks with disk-based hash table."

**Q4: "Can you do it with O(1) space?"**
> "Only if array is sorted (two pointers). Otherwise, we need extra space to achieve better than O(n²) time."

---

## ✅ Test Cases

```cpp
#include <cassert>
#include <algorithm>

void testTwoSum() {
    // Test 1: Basic case
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> result1 = twoSum(nums1, 9);
    assert(result1.size() == 2);
    assert(nums1[result1[0]] + nums1[result1[1]] == 9);
    
    // Test 2: Duplicates
    vector<int> nums2 = {3, 3};
    vector<int> result2 = twoSum(nums2, 6);
    assert(result2 == vector<int>{0, 1});
    
    // Test 3: Negative numbers
    vector<int> nums3 = {-1, -2, -3, -4, -5};
    vector<int> result3 = twoSum(nums3, -8);
    assert(nums3[result3[0]] + nums3[result3[1]] == -8);
    
    // Test 4: Large numbers
    vector<int> nums4 = {1000000000, -1000000000, 0};
    vector<int> result4 = twoSum(nums4, 0);
    assert(nums4[result4[0]] + nums4[result4[1]] == 0);
    
    // Test 5: Unsorted array
    vector<int> nums5 = {3, 2, 4};
    vector<int> result5 = twoSum(nums5, 6);
    assert(result5 == vector<int>{1, 2});
    
    cout << "All tests passed! ✓" << endl;
}
```

---

## 📝 Common Mistakes

### Mistake 1: Using Same Element Twice

```cpp
// WRONG
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {  // ❌ j can equal i
        if (nums[i] + nums[j] == target) {
            return {i, j};
        }
    }
}

// CORRECT
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {  // ✓ j > i
        if (nums[i] + nums[j] == target) {
            return {i, j};
        }
    }
}
```

### Mistake 2: Not Checking Before Storing

```cpp
// WRONG
numMap[nums[i]] = i;  // Store first
if (numMap.count(complement)) {  // May match with itself!
    return {numMap[complement], i};
}

// CORRECT
if (numMap.count(complement)) {  // Check first
    return {numMap[complement], i};
}
numMap[nums[i]] = i;  // Then store
```

### Mistake 3: Forgetting Hash Map Returns Any Index

```cpp
// WRONG: Assumes only one occurrence
int idx = numMap[complement];
if (idx != i) { ... }  // May fail with duplicates

// CORRECT: Hash map stores latest index, check BEFORE storing
if (numMap.count(complement)) {
    return {numMap[complement], i};
}
numMap[nums[i]] = i;
```

### Mistake 4: Off-By-One in Return

```cpp
// WRONG: Problem uses 0-indexed, don't add 1
return {numMap[complement] + 1, i + 1};

// CORRECT: Return 0-indexed (unless problem asks for 1-indexed)
return {numMap[complement], i};
```

---

## 🔄 Revision Notes

**Key pattern:** Hash map for complement lookup

**Template (memorize this):**
```cpp
unordered_map<int, int> numMap;

for (int i = 0; i < nums.size(); i++) {
    int complement = target - nums[i];
    
    if (numMap.count(complement)) {
        return {numMap[complement], i};
    }
    
    numMap[nums[i]] = i;
}
```

**Trick:** Check BEFORE storing to avoid matching with itself

**Time:** O(n) | **Space:** O(n)

---

## 🔗 Related Problems

- [Two Sum II - Input Array Is Sorted](easy/two-sum-ii.md) - Same problem, sorted array, O(1) space
- [3Sum](medium/3sum.md) - Find triplets, extends two sum with two pointer
- [4Sum](medium/4sum.md) - Find quadruplets, nested two sum
- [Two Sum Less Than K](easy/two-sum-less-than-k.md) - Variation with inequality
- [Array of Doubled Pairs](medium/array-of-doubled-pairs.md) - Hash map pattern

---

**Difficulty:** Easy ⭐  
**Time to solve:** 10-15 minutes  
**Pattern:** Hash Map  
**Company Frequency:** ★★★★★ (Amazon, Google, Meta, Apple, Microsoft)

**Next problem:** [Best Time to Buy and Sell Stock](easy/best-time-to-buy-sell-stock.md) →

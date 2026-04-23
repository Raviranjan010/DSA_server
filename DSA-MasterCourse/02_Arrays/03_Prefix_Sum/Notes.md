# Prefix Sum Technique — Complete Guide

> **What You'll Learn**: 1D prefix sum, 2D prefix sum, prefix XOR  
> **Prerequisites**: Array Basics, Complexity Analysis  
> **Time Required**: 2-3 hours

---

## 1. 📌 Definition

**Prefix Sum** precomputes cumulative sums to answer range sum queries in O(1) time instead of O(n).

**Core Idea**: `prefix[i]` stores sum of all elements from index 0 to i.

---

## 2. 🌍 Real-World Analogy

### Analogy 1: Bank Account Statement 🏦

Imagine tracking your spending:
- Day 1: Spent $10 → Total: $10
- Day 2: Spent $20 → Total: $30
- Day 3: Spent $15 → Total: $45

To find spending from Day 2 to Day 3:
- Total by Day 3 ($45) - Total by Day 1 ($10) = $35 ✓

### Analogy 2: Mile Markers on Highway 🛣️

Highway mile markers show distance from start:
- Marker at mile 100
- Marker at mile 150
- Distance between them: 150 - 100 = 50 miles

No need to measure from the beginning each time!

---

## 3. 🎨 Visual Diagram

### 1D Prefix Sum Array

```
Original Array:  [3,  1,  4,  2,  5,  3]
Indices:          0   1   2   3   4   5

Prefix Sum:      [3,  4,  8,  10, 15, 18]
                  ↑   ↑   ↑    ↑   ↑   ↑
                3   3+1 3+1+4 ... cumulative sums

To find sum from index 2 to 4:
prefix[4] - prefix[1] = 15 - 4 = 11
Check: arr[2] + arr[3] + arr[4] = 4 + 2 + 5 = 11 ✓
```

### Formula

```
Sum from index L to R = prefix[R] - prefix[L-1]

Special case: If L = 0, sum = prefix[R]
```

---

## 4. 🔑 Pattern Recognition Keywords

**Look for these words in problems**:
- "Range sum"
- "Sum from index i to j"
- "Count subarrays with sum K"
- "Subarray sum"
- "Cumulative sum"
- "XOR of range"
- "Multiple queries"

---

## 5. 📋 Template Code

### Template 1: Basic Prefix Sum

```cpp
#include <iostream>
#include <vector>
using namespace std;

class PrefixSum {
private:
    vector<int> prefix;
    
public:
    PrefixSum(vector<int>& arr) {
        int n = arr.size();
        prefix.resize(n);
        
        // Build prefix sum array
        prefix[0] = arr[0];
        for(int i = 1; i < n; i++) {
            prefix[i] = prefix[i-1] + arr[i];
        }
    }
    
    // Get sum from index L to R in O(1)
    int rangeSum(int L, int R) {
        if(L == 0) return prefix[R];
        return prefix[R] - prefix[L-1];
    }
};
```

### Template 2: Prefix Sum for Subarray Counting

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;  // Important: empty prefix
    
    int currentSum = 0;
    int count = 0;
    
    for(int num : nums) {
        currentSum += num;
        
        // If (currentSum - k) exists, we found subarrays
        if(prefixCount.find(currentSum - k) != prefixCount.end()) {
            count += prefixCount[currentSum - k];
        }
        
        // Record this prefix sum
        prefixCount[currentSum]++;
    }
    
    return count;
}
```

---

## 6. 🔍 Step-by-Step Example

### Problem: Range Sum Query

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {3, 1, 4, 2, 5, 3};
    int n = arr.size();
    
    // Build prefix sum array
    vector<int> prefix(n);
    prefix[0] = arr[0];
    
    for(int i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    
    cout << "Prefix array: ";
    for(int x : prefix) {
        cout << x << " ";  // 3 4 8 10 15 18
    }
    cout << endl;
    
    // Query 1: Sum from index 2 to 4
    int L = 2, R = 4;
    int sum = prefix[R] - prefix[L-1];
    cout << "Sum from " << L << " to " << R << " = " << sum << endl;  // 11
    
    // Query 2: Sum from index 0 to 3
    L = 0, R = 3;
    sum = prefix[R];  // Special case: L = 0
    cout << "Sum from " << L << " to " << R << " = " << sum << endl;  // 10
    
    return 0;
}
```

**Dry Run - Building Prefix Array**:
```
arr = [3, 1, 4, 2, 5, 3]

i=0: prefix[0] = 3
i=1: prefix[1] = prefix[0] + 1 = 3 + 1 = 4
i=2: prefix[2] = prefix[1] + 4 = 4 + 4 = 8
i=3: prefix[3] = prefix[2] + 2 = 8 + 2 = 10
i=4: prefix[4] = prefix[3] + 5 = 10 + 5 = 15
i=5: prefix[5] = prefix[4] + 3 = 15 + 3 = 18

prefix = [3, 4, 8, 10, 15, 18]
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Off-by-One in Formula
```cpp
// WRONG
int sum = prefix[R] - prefix[L];  // Missing -1!

// CORRECT
int sum = prefix[R] - prefix[L-1];  // When L > 0
```

### Mistake 2: Forgetting L=0 Case
```cpp
// WRONG: Will access prefix[-1]!
int sum = prefix[R] - prefix[L-1];

// CORRECT: Handle L=0 separately
if(L == 0) {
    sum = prefix[R];
} else {
    sum = prefix[R] - prefix[L-1];
}
```

### Mistake 3: Integer Overflow
```cpp
// WRONG: Sum might exceed int range
int prefix[n];

// CORRECT: Use long long for large sums
long long prefix[n];
```

### Mistake 4: Not Initializing Hash Map
```cpp
// WRONG: Missing base case
unordered_map<int, int> prefixCount;
// Will miss subarrays starting from index 0!

// CORRECT: Initialize with 0
unordered_map<int, int> prefixCount;
prefixCount[0] = 1;  // Empty prefix has sum 0
```

---

## 8. ⏱️ Time & Space Complexity

| Operation | Time | Space | Reasoning |
|-----------|------|-------|-----------|
| **Build prefix array** | **O(n)** | **O(n)** | One pass through array |
| **Range sum query** | **O(1)** | **O(1)** | Simple subtraction |
| **Brute force query** | O(n) | O(1) | Loop through range |
| **Count subarrays** | **O(n)** | **O(n)** | Hash map storage |

**Key Trade-off**: O(n) extra space for O(1) query time!

---

## 9. 📝 Pattern Variations

### Variation 1: Prefix XOR

Same concept but with XOR instead of sum:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// XOR has same property: a ^ a = 0
vector<int> buildPrefixXOR(vector<int>& arr) {
    int n = arr.size();
    vector<int> prefixXOR(n);
    
    prefixXOR[0] = arr[0];
    for(int i = 1; i < n; i++) {
        prefixXOR[i] = prefixXOR[i-1] ^ arr[i];
    }
    
    return prefixXOR;
}

// XOR from L to R
int rangeXOR(vector<int>& prefixXOR, int L, int R) {
    if(L == 0) return prefixXOR[R];
    return prefixXOR[R] ^ prefixXOR[L-1];
}
```

### Variation 2: 2D Prefix Sum (Matrix)

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Build 2D prefix sum
vector<vector<int>> build2DPrefix(vector<vector<int>>& matrix) {
    int rows = matrix.size();
    int cols = matrix[0].size();
    
    vector<vector<int>> prefix(rows, vector<int>(cols));
    
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < cols; j++) {
            prefix[i][j] = matrix[i][j];
            
            // Add from top
            if(i > 0) prefix[i][j] += prefix[i-1][j];
            
            // Add from left
            if(j > 0) prefix[i][j] += prefix[i][j-1];
            
            // Subtract double-counted corner
            if(i > 0 && j > 0) prefix[i][j] -= prefix[i-1][j-1];
        }
    }
    
    return prefix;
}

// Query sum of rectangle from (r1,c1) to (r2,c2)
int query2D(vector<vector<int>>& prefix, int r1, int c1, int r2, int c2) {
    int total = prefix[r2][c2];
    
    if(r1 > 0) total -= prefix[r1-1][c2];
    if(c1 > 0) total -= prefix[r2][c1-1];
    if(r1 > 0 && c1 > 0) total += prefix[r1-1][c1-1];
    
    return total;
}
```

---

## 10. 💡 Pro Tips

1. **Handle L=0 separately** — Most common mistake!
2. **Use long long** — Prevent overflow for large sums
3. **Initialize hash map with 0** — For subarray counting
4. **Prefix XOR works same way** — Just replace + with ^
5. **2D prefix sum** — Use inclusion-exclusion principle
6. **Space optimization** — Can sometimes compute on-the-fly

---

## 11. 🎯 When to Use Prefix Sum

✅ **Use when**:
- Multiple range sum queries
- Count subarrays with given sum
- Find subarray with specific property
- Need O(1) query time
- Static array (no updates)

❌ **Don't use when**:
- Array changes frequently (use Segment Tree)
- Only one query (brute force is fine)
- Need actual subarray elements (prefix only gives sum)

---

## 12. 📚 Practice Problems

### Easy (Start Here)
1. Range Sum Query - Immutable (LeetCode 303)
2. Find Pivot Index (LeetCode 724)
3. Subarray Sum Equals K (LeetCode 560)
4. Continuous Subarray Sum (LeetCode 523)
5. Binary Subarrays With Sum (LeetCode 930)

### Medium
1. Contiguous Array (LeetCode 525)
2. Product of Array Except Self (LeetCode 238)
3. Sum of Absolute Differences (LeetCode 1685)
4. Grid Game (LeetCode 2017)
5. Count Number of Nice Subarrays (LeetCode 1248)

### Hard
1. Range Sum Query 2D - Immutable (LeetCode 304)
2. Count of Range Sum (LeetCode 327)
3. Maximum Sum of 3 Non-Overlapping Subarrays (LeetCode 689)

---

## 13. 🎯 Key Takeaways

1. Prefix sum converts O(n) queries to O(1)
2. **Formula**: `sum(L,R) = prefix[R] - prefix[L-1]`
3. **Handle L=0** as special case
4. **Hash map + prefix** = count subarrays efficiently
5. Works for **XOR** and other operations too
6. **2D prefix sum** uses inclusion-exclusion
7. Trade-off: O(n) space for O(1) query time

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Problems →](Problems/Easy.md)

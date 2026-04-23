# Prefix Sum — Easy & Medium Problems

> **Essential problems for mastering prefix sum technique**

---

## Problem 1: Range Sum Query - Immutable

**Source**: https://leetcode.com/problems/range-sum-query-immutable/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 High

### Problem Statement
Given an integer array, compute the sum of elements between indices i and j inclusive.

### Examples
```
Input: nums = [-2, 0, 3, -5, 2, -1]
sumRange(0, 2) → 1
sumRange(2, 5) → -1
sumRange(0, 5) → -3
```

### Pattern Identification
**Keywords**: "range sum", "multiple queries", "immutable"  
**Pattern**: Prefix Sum

### Complete Solution
```cpp
#include <vector>
using namespace std;

class NumArray {
private:
    vector<int> prefix;
    
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n);
        prefix[0] = nums[0];
        
        for(int i = 1; i < n; i++) {
            prefix[i] = prefix[i-1] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        if(left == 0) {
            return prefix[right];
        }
        return prefix[right] - prefix[left-1];
    }
};

// Usage:
// NumArray* obj = new NumArray(nums);
// int param_1 = obj->sumRange(left, right);
```

### Edge Cases
1. ✅ left = 0 (handle separately)
2. ✅ left = right (single element)
3. ✅ Negative numbers
4. ✅ Multiple queries

### Complexity
- **Time**: O(1) per query after O(n) preprocessing
- **Space**: O(n) for prefix array

---

## Problem 2: Find Pivot Index

**Source**: https://leetcode.com/problems/find-pivot-index/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Adobe, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an array, find the "pivot" index where the sum of all numbers to the left equals the sum of all numbers to the right.

### Examples
```
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation: Left sum = 1+7+3 = 11, Right sum = 5+6 = 11
```

### Complete Solution
```cpp
#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int totalSum = 0;
        for(int x : nums) {
            totalSum += x;
        }
        
        int leftSum = 0;
        for(int i = 0; i < nums.size(); i++) {
            // rightSum = totalSum - leftSum - nums[i]
            if(leftSum == totalSum - leftSum - nums[i]) {
                return i;
            }
            leftSum += nums[i];
        }
        
        return -1;
    }
};
```

### Edge Cases
1. ✅ No pivot exists → return -1
2. ✅ First element is pivot
3. ✅ Last element is pivot
4. ✅ Array with one element → return 0

### Complexity
- **Time**: O(n) - Two passes
- **Space**: O(1) - No extra space needed

---

## Problem 3: Subarray Sum Equals K

**Source**: https://leetcode.com/problems/subarray-sum-equals-k/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Facebook  
**Frequency**: 📅 Very High

### Problem Statement
Given an array and an integer k, return the total number of contiguous subarrays whose sum equals k.

### Examples
```
Input: nums = [1,1,1], k = 2
Output: 2
Explanation: [1,1] appears twice

Input: nums = [1,2,3], k = 3
Output: 2
Explanation: [1,2] and [3]
```

### Pattern Identification
**Keywords**: "subarray sum", "count subarrays", "equals k"  
**Pattern**: Prefix Sum + Hash Map

### Approach

#### Brute Force (O(n³))
```cpp
int count = 0;
for(int i = 0; i < n; i++) {
    for(int j = i; j < n; j++) {
        int sum = 0;
        for(int k = i; k <= j; k++) {
            sum += nums[k];
        }
        if(sum == k) count++;
    }
}
```

#### Optimized with Hash Map (O(n))
- If prefix[j] - prefix[i] = k, then subarray sum from i to j equals k
- Store prefix sum frequencies in hash map

### Complete Solution
```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCount;
        prefixCount[0] = 1;  // Important: empty prefix
        
        int currentSum = 0;
        int count = 0;
        
        for(int num : nums) {
            currentSum += num;
            
            // If (currentSum - k) exists, we found valid subarrays
            if(prefixCount.count(currentSum - k)) {
                count += prefixCount[currentSum - k];
            }
            
            // Record this prefix sum
            prefixCount[currentSum]++;
        }
        
        return count;
    }
};
```

### Dry Run
```
nums = [1,1,1], k = 2
prefixCount = {0: 1}

i=0: currentSum = 1
     need = 1 - 2 = -1 (not found)
     prefixCount = {0: 1, 1: 1}

i=1: currentSum = 2
     need = 2 - 2 = 0 (found! count += 1)
     prefixCount = {0: 1, 1: 1, 2: 1}

i=2: currentSum = 3
     need = 3 - 2 = 1 (found! count += 1)
     prefixCount = {0: 1, 1: 1, 2: 1, 3: 1}

Result: count = 2 ✓
```

### Edge Cases
1. ✅ k = 0
2. ✅ All elements same
3. ✅ Negative numbers
4. ✅ No subarray sums to k

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(n) - Hash map stores at most n prefix sums

### Similar Problems
1. Contiguous Array (LeetCode 525)
2. Subarray Sum Divisible by K (LeetCode 974)
3. Continuous Subarray Sum (LeetCode 523)

---

## Problem 4: Contiguous Array

**Source**: https://leetcode.com/problems/contiguous-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 High

### Problem Statement
Given a binary array, find the maximum length of a contiguous subarray with equal number of 0s and 1s.

### Examples
```
Input: nums = [0,1]
Output: 2
Explanation: [0,1] has equal number of 0s and 1s

Input: nums = [0,1,0]
Output: 2
Explanation: [0,1] or [1,0]
```

### Pattern Identification
**Keywords**: "equal number", "contiguous", "binary array"  
**Pattern**: Prefix Sum + Hash Map (with transformation)

### Approach
- Treat 0 as -1 and 1 as +1
- Find longest subarray with sum = 0

### Complete Solution
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> firstOccurrence;
        firstOccurrence[0] = -1;  // Base case
        
        int count = 0;
        int maxLength = 0;
        
        for(int i = 0; i < nums.size(); i++) {
            // Treat 0 as -1, 1 as +1
            count += (nums[i] == 1) ? 1 : -1;
            
            // If this count seen before, calculate length
            if(firstOccurrence.count(count)) {
                maxLength = max(maxLength, i - firstOccurrence[count]);
            } else {
                // Store first occurrence
                firstOccurrence[count] = i;
            }
        }
        
        return maxLength;
    }
};
```

### Edge Cases
1. ✅ Empty array → 0
2. ✅ All 0s or all 1s → 0
3. ✅ Equal 0s and 1s in entire array
4. ✅ Multiple valid subarrays

### Complexity
- **Time**: O(n)
- **Space**: O(n)

---

## Problem 5: Product of Array Except Self

**Source**: https://leetcode.com/problems/product-of-array-except-self/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Microsoft, Amazon, Facebook  
**Frequency**: 📅 Very High

### Problem Statement
Given an array, return an array where each element is the product of all other elements. Solve without division and in O(n).

### Examples
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

### Pattern Identification
**Keywords**: "product except self", "without division"  
**Pattern**: Prefix/Suffix Products

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n, 1);
        
        // Left products
        int leftProduct = 1;
        for(int i = 0; i < n; i++) {
            result[i] = leftProduct;
            leftProduct *= nums[i];
        }
        
        // Right products
        int rightProduct = 1;
        for(int i = n - 1; i >= 0; i--) {
            result[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        
        return result;
    }
};
```

### Dry Run
```
nums = [1,2,3,4]

Left pass:
result = [1, 1, 2, 6]
         ↑  ↑  ↑  ↑
         1  1  1×2  1×2×3

Right pass:
result = [24, 12, 8, 6]
          ↑    ↑   ↑   ↑
          2×3×4 1×3×4 1×2×4  1×2×3
```

### Edge Cases
1. ✅ Contains zero(s)
2. ✅ Single element → [1]
3. ✅ Negative numbers
4. ✅ Large products (may overflow)

### Complexity
- **Time**: O(n) - Two passes
- **Space**: O(1) - Excluding output array

---

## 🎯 Key Takeaways

1. **Prefix sum** converts O(n) queries to O(1)
2. **Hash map + prefix** counts subarrays efficiently
3. **Transform problems** to fit prefix sum pattern
4. **Handle left=0** as special case
5. **Prefix products** work same way as sums

---

**Next**: Practice more advanced problems →

[← Back to Notes](../Notes.md)

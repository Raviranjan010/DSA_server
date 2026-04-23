# Prefix Sum — Hard Problems

> **Advanced prefix sum applications**

---

## Problem 1: Subarray Sum Divisible by K

**Source**: https://leetcode.com/problems/subarray-sums-divisible-by-k/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Return the number of non-empty subarrays that have a sum divisible by k.

### Examples
```
Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
```

### Complete Solution
```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        unordered_map<int, int> remainderCount;
        remainderCount[0] = 1;
        
        int currentSum = 0;
        int count = 0;
        
        for(int num : nums) {
            currentSum += num;
            
            // Handle negative remainders
            int remainder = ((currentSum % k) + k) % k;
            
            if(remainderCount.count(remainder)) {
                count += remainderCount[remainder];
            }
            
            remainderCount[remainder]++;
        }
        
        return count;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(min(n, k))

---

## Problem 2: Continuous Subarray Sum

**Source**: https://leetcode.com/problems/continuous-subarray-sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Check if the array has a contiguous subarray of size at least 2 that sums up to a multiple of k.

### Complete Solution
```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> remainderIndex;
        remainderIndex[0] = -1;
        
        int currentSum = 0;
        
        for(int i = 0; i < nums.size(); i++) {
            currentSum += nums[i];
            int remainder = currentSum % k;
            
            if(remainderIndex.count(remainder)) {
                if(i - remainderIndex[remainder] >= 2) {
                    return true;
                }
            } else {
                remainderIndex[remainder] = i;
            }
        }
        
        return false;
    }
};
```

### Edge Cases
1. ✅ k = 0 (handle division by zero)
2. ✅ Subarray size must be ≥ 2
3. ✅ Negative numbers
4. ✅ All elements divisible by k

### Complexity
- **Time**: O(n)
- **Space**: O(min(n, k))

---

## Problem 3: Maximum Size Subarray Sum Equals K

**Source**: https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Facebook  
**Frequency**: 📅 Medium

### Problem Statement
Find the maximum length of a subarray that sums to k.

### Complete Solution
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArrayLen(vector<int>& nums, int k) {
        unordered_map<int, int> firstOccurrence;
        firstOccurrence[0] = -1;
        
        int currentSum = 0;
        int maxLength = 0;
        
        for(int i = 0; i < nums.size(); i++) {
            currentSum += nums[i];
            
            if(firstOccurrence.count(currentSum - k)) {
                maxLength = max(maxLength, i - firstOccurrence[currentSum - k]);
            }
            
            if(!firstOccurrence.count(currentSum)) {
                firstOccurrence[currentSum] = i;
            }
        }
        
        return maxLength;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(n)

---

## Problem 4: Range Sum Query 2D - Immutable

**Source**: https://leetcode.com/problems/range-sum-query-2d-immutable/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 High

### Problem Statement
Given a 2D matrix, find sum of elements inside rectangle defined by upper left (row1, col1) and lower right (row2, col2).

### Complete Solution
```cpp
#include <vector>
using namespace std;

class NumMatrix {
private:
    vector<vector<int>> prefix;
    
public:
    NumMatrix(vector<vector<int>>& matrix) {
        if(matrix.empty() || matrix[0].empty()) return;
        
        int m = matrix.size();
        int n = matrix[0].size();
        prefix = vector<vector<int>>(m + 1, vector<int>(n + 1, 0));
        
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                prefix[i+1][j+1] = matrix[i][j] +
                    prefix[i][j+1] + prefix[i+1][j] - prefix[i][j];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1] -
               prefix[row1][col2+1] -
               prefix[row2+1][col1] +
               prefix[row1][col1];
    }
};
```

### Complexity
- **Time**: O(1) per query after O(m×n) preprocessing
- **Space**: O(m×n)

---

## 🎯 Key Takeaways

1. **Remainder tracking** - For divisibility problems
2. **First occurrence** - Store earliest index for max length
3. **2D prefix sum** - Extend to matrices
4. **Handle negative remainders** - ((sum % k) + k) % k
5. **Multiple valid subarrays** - Count all using hash map

---

**Prefix sum is essential for range query problems!**

[← Back to Easy_Medium](Easy_Medium.md) | [← Back to Notes](../Notes.md)

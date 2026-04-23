# Kadane's Algorithm — Medium & Hard Problems

> **Advanced subarray problems**

---

## Medium Problem 1: Maximum Product Subarray

**Source**: https://leetcode.com/problems/maximum-product-subarray/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, LinkedIn  
**Frequency**: 📅 Very High

### Problem Statement
Given an integer array, find a contiguous non-empty subarray with the largest product.

### Examples
```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has largest product 6

Input: nums = [-2,0,-1]
Output: 0
```

### Pattern Identification
**Keywords**: "maximum product", "contiguous subarray"  
**Pattern**: Kadane's (Modified for Product)

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if(nums.empty()) return 0;
        
        int maxProd = nums[0];
        int minProd = nums[0];  // Track minimum too!
        int result = nums[0];
        
        for(int i = 1; i < nums.size(); i++) {
            // Negative number flips max and min
            if(nums[i] < 0) {
                swap(maxProd, minProd);
            }
            
            maxProd = max(nums[i], maxProd * nums[i]);
            minProd = min(nums[i], minProd * nums[i]);
            
            result = max(result, maxProd);
        }
        
        return result;
    }
};
```

### Why Track Minimum?
Negative × Negative = Positive! So minimum product can become maximum.

### Edge Cases
1. ✅ All negative numbers
2. ✅ Contains zero
3. ✅ Single element
4. ✅ Mix of positive/negative/zero

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Medium Problem 2: Maximum Sum Circular Subarray

**Source**: https://leetcode.com/problems/maximum-sum-circular-subarray/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Cisco  
**Frequency**: 📅 High

### Problem Statement
Given a circular integer array, return the maximum possible sum of a non-empty subarray.

### Examples
```
Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] wraps around (circular)
```

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        // Case 1: Normal maximum subarray
        int maxKadane = kadane(nums);
        
        // Case 2: Circular maximum (total - minimum subarray)
        int totalSum = 0;
        for(int& x : nums) {
            totalSum += x;
            x = -x;  // Negate for finding minimum
        }
        int maxCircular = totalSum + kadane(nums);
        
        // Edge case: All numbers negative
        if(maxCircular == 0) {
            return maxKadane;
        }
        
        return max(maxKadane, maxCircular);
    }
    
    int kadane(vector<int>& nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        
        for(int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};
```

### Edge Cases
1. ✅ All negative → return maxKadane
2. ✅ All positive → return total sum
3. ✅ Single element
4. ✅ Circular wrap-around needed

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Hard Problem: Subarray Sum Divisible by K

**Source**: https://leetcode.com/problems/subarray-sums-divisible-by-k/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Given an integer array and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

### Examples
```
Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: 7 subarrays have sums divisible by 5
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
        remainderCount[0] = 1;  // Important base case
        
        int currentSum = 0;
        int count = 0;
        
        for(int num : nums) {
            currentSum += num;
            
            // Calculate remainder (handle negative)
            int remainder = ((currentSum % k) + k) % k;
            
            // If this remainder seen before, add count
            if(remainderCount.count(remainder)) {
                count += remainderCount[remainder];
            }
            
            remainderCount[remainder]++;
        }
        
        return count;
    }
};
```

### Why This Works?
If two prefix sums have same remainder mod k, their difference is divisible by k.

### Edge Cases
1. ✅ k = 1 → all subarrays valid
2. ✅ All elements divisible by k
3. ✅ Negative numbers
4. ✅ Large values

### Complexity
- **Time**: O(n)
- **Space**: O(min(n, k))

---

**Keep practicing these patterns to master subarray problems!**

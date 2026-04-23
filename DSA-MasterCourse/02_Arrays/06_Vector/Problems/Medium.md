# Vector — Medium Problems

> **5 medium-level vector problems**  
> **Prerequisites**: Easy Problems, `Patterns.md`  
> **Time Required**: 2-3 hours

---

## Problem 1: Container With Most Water

**Source**: https://leetcode.com/problems/container-with-most-water/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Find two lines that together with x-axis form a container that holds the most water.

### Examples
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: Lines at index 1 (height=8) and index 8 (height=7)
Area = min(8,7) * (8-1) = 7 * 7 = 49
```

### Pattern Identification
**Keywords**: "most water", "maximum area", "two lines"  
**Pattern**: Two Pointer

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int maxArea = 0;
        
        while(left < right) {
            int h = min(height[left], height[right]);
            int w = right - left;
            maxArea = max(maxArea, h * w);
            
            // Move the shorter line inward
            if(height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
};
```

### Edge Cases
1. ✅ Only two lines → return area
2. ✅ All lines same height
3. ✅ Strictly increasing/decreasing heights
4. ✅ Very large heights (use int)

### Complexity
- **Time**: O(n) - Single pass with two pointers
- **Space**: O(1)

---

## Problem 2: 3Sum

**Source**: https://leetcode.com/problems/3sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given an integer array, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        sort(nums.begin(), nums.end());
        
        for(int i = 0; i < nums.size() - 2; i++) {
            // Skip duplicates
            if(i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1;
            int right = nums.size() - 1;
            
            while(left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if(sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    
                    // Skip duplicates
                    while(left < right && nums[left] == nums[left+1]) left++;
                    while(left < right && nums[right] == nums[right-1]) right--;
                    
                    left++;
                    right--;
                } else if(sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n²) - Sorting O(n log n) + nested loops O(n²)
- **Space**: O(1) - Excluding output

---

## Problem 3: Next Permutation

**Source**: https://leetcode.com/problems/next-permutation/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;
        
        // Find first decreasing element from right
        while(i >= 0 && nums[i] >= nums[i+1]) {
            i--;
        }
        
        if(i >= 0) {
            // Find element just larger than nums[i]
            int j = n - 1;
            while(nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        
        // Reverse from i+1 to end
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(1) - In-place

---

## Problem 4: Rotate Array

**Source**: https://leetcode.com/problems/rotate-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k = k % n;  // Handle k > n
        
        // Reverse entire array
        reverse(nums.begin(), nums.end());
        
        // Reverse first k elements
        reverse(nums.begin(), nums.begin() + k);
        
        // Reverse remaining elements
        reverse(nums.begin() + k, nums.end());
    }
};
```

### Edge Cases
1. ✅ k = 0 → no rotation
2. ✅ k = n → no rotation
3. ✅ k > n → use k % n
4. ✅ Single element

### Complexity
- **Time**: O(n) - Three reversals
- **Space**: O(1) - In-place

---

## Problem 5: Sort Colors

**Source**: https://leetcode.com/problems/sort-colors/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Microsoft, Amazon  
**Frequency**: 📅 High

### Complete Solution
```cpp
#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0;
        int mid = 0;
        int high = nums.size() - 1;
        
        while(mid <= high) {
            if(nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if(nums[mid] == 1) {
                mid++;
            } else {  // nums[mid] == 2
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};
```

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - In-place

---

## 🎯 Key Takeaways

1. **Two pointer on vectors** - Same as arrays
2. **Sorting + two pointer** - Powerful combination
3. **In-place modifications** - Be careful with indices
4. **Dutch National Flag** - 3-way partition
5. **STL algorithms** - reverse, sort, swap

---

**Next**: Challenge yourself with Hard problems →

[← Back to Easy](Easy.md) | [Hard Problems →](Hard.md)

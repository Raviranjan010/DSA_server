# Binary Search — Medium & Hard Problems

> **Advanced binary search applications**

---

## Medium Problem 1: Find First and Last Position of Element

**Source**: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 Very High

### Problem Statement
Given a sorted array, find the starting and ending position of a given target value with O(log n) runtime.

### Examples
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> result = {-1, -1};
        
        // Find first occurrence
        int left = findBound(nums, target, true);
        if(left == -1) return result;
        
        // Find last occurrence
        int right = findBound(nums, target, false);
        
        return {left, right};
    }
    
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int left = 0;
        int right = nums.size() - 1;
        int bound = -1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(nums[mid] == target) {
                bound = mid;
                if(isFirst) {
                    right = mid - 1;  // Try to find earlier
                } else {
                    left = mid + 1;   // Try to find later
                }
            } else if(nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return bound;
    }
};
```

### Edge Cases
1. ✅ Target not in array → [-1, -1]
2. ✅ Single occurrence → [i, i]
3. ✅ All elements same
4. ✅ Target at boundaries

### Complexity
- **Time**: O(log n) - Two binary searches
- **Space**: O(1)

---

## Medium Problem 2: Search in Rotated Sorted Array

**Source**: https://leetcode.com/problems/search-in-rotated-sorted-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given a rotated sorted array, find if target exists. Array rotated at unknown pivot.

### Examples
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4 (index)
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(nums[mid] == target) return mid;
            
            // Determine which half is sorted
            if(nums[left] <= nums[mid]) {
                // Left half is sorted
                if(nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;  // Target in left half
                } else {
                    left = mid + 1;   // Target in right half
                }
            } else {
                // Right half is sorted
                if(nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;   // Target in right half
                } else {
                    right = mid - 1;  // Target in left half
                }
            }
        }
        
        return -1;
    }
};
```

### Edge Cases
1. ✅ Not rotated (normal sorted)
2. ✅ Rotated at first element
3. ✅ Target not present
4. ✅ Single element

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Hard Problem: Median of Two Sorted Arrays

**Source**: https://leetcode.com/problems/median-of-two-sorted-arrays/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 Very High

*(Complete solution already in Two Pointer Hard problems)*

**Key Insight**: Binary search on the smaller array to find correct partition.

---

## Hard Problem: Aggressive Cows

**Source**: https://www.spoj.com/problems/AGGRCOW/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 CodeChef, SPOJ  
**Frequency**: 📅 High

### Problem Statement
Given n stalls and c cows, place cows such that minimum distance between any two cows is maximized.

### Examples
```
Input: stalls = [1,2,4,8,9], cows = 3
Output: 3
Explanation: Place cows at positions 1, 4, 8 (min distance = 3)
```

### Pattern Identification
**Keywords**: "maximize minimum distance"  
**Pattern**: Binary Search on Answer

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

bool canPlaceCows(vector<int>& stalls, int c, int minDist) {
    int count = 1;  // Place first cow
    int lastPos = stalls[0];
    
    for(int i = 1; i < stalls.size(); i++) {
        if(stalls[i] - lastPos >= minDist) {
            count++;
            lastPos = stalls[i];
            if(count == c) return true;
        }
    }
    
    return false;
}

int aggressiveCows(vector<int>& stalls, int c) {
    sort(stalls.begin(), stalls.end());
    
    int left = 0;
    int right = stalls.back() - stalls[0];
    int result = 0;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(canPlaceCows(stalls, c, mid)) {
            result = mid;
            left = mid + 1;  // Try larger distance
        } else {
            right = mid - 1;  // Need smaller distance
        }
    }
    
    return result;
}
```

### Edge Cases
1. ✅ c = 2 → maximum distance
2. ✅ c = n → minimum distance
3. ✅ All stalls at same position
4. ✅ Large coordinate values

### Complexity
- **Time**: O(n log n + n log(max_dist))
- **Space**: O(1)

---

**Binary Search is powerful for optimization problems!**

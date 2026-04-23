# Binary Search — Medium Problems

> **5 medium-level problems mastering binary search variations**  
> **Prerequisites**: Easy Problems, `Patterns.md`  
> **Time Required**: 3-4 hours

---

## Problem 1: Find First and Last Position of Element

**Source**: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given a sorted array, find the starting and ending position of a given target value with O(log n) runtime.

### Examples
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

### Pattern Identification
**Keywords**: "first occurrence", "last occurrence", "sorted array", "O(log n)"  
**Pattern**: Binary Search (Lower Bound + Upper Bound)

### Approach

#### Brute Force (O(n))
```cpp
// Linear scan from both ends
for(int i = 0; i < n; i++) {
    if(nums[i] == target) {
        first = i;
        break;
    }
}
for(int i = n-1; i >= 0; i--) {
    if(nums[i] == target) {
        last = i;
        break;
    }
}
// Problem: O(n) time
```

#### Optimized Binary Search (O(log n))
1. Find first occurrence using binary search
2. Find last occurrence using binary search
3. Continue searching even after finding target

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> result = {-1, -1};
        
        // Find first occurrence
        int first = findBound(nums, target, true);
        if(first == -1) return result;
        
        // Find last occurrence
        int last = findBound(nums, target, false);
        
        return {first, last};
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
                    right = mid - 1;  // Try to find earlier occurrence
                } else {
                    left = mid + 1;   // Try to find later occurrence
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

### Dry Run
```
nums = [5,7,7,8,8,10], target = 8

Finding FIRST:
left=0, right=5, mid=2, nums[2]=7 < 8 → left=3
left=3, right=5, mid=4, nums[4]=8 == 8 → bound=4, right=3
left=3, right=3, mid=3, nums[3]=8 == 8 → bound=3, right=2
left=3, right=2 → Stop
First = 3 ✓

Finding LAST:
left=0, right=5, mid=2, nums[2]=7 < 8 → left=3
left=3, right=5, mid=4, nums[4]=8 == 8 → bound=4, left=5
left=5, right=5, mid=5, nums[5]=10 > 8 → right=4
left=5, right=4 → Stop
Last = 4 ✓
```

### Edge Cases
1. ✅ Target not in array → return [-1, -1]
2. ✅ Single occurrence → return [i, i]
3. ✅ All elements same as target
4. ✅ Target at boundaries (first/last position)
5. ✅ Empty array → return [-1, -1]

### Complexity
- **Time**: O(log n) - Two binary searches, each O(log n)
- **Space**: O(1) - Only variables used

### Similar Problems
1. First Bad Version (LeetCode 278)
2. Find Minimum in Rotated Sorted Array (LeetCode 153)
3. Search Insert Position (LeetCode 35)

---

## Problem 2: Search in Rotated Sorted Array

**Source**: https://leetcode.com/problems/search-in-rotated-sorted-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given a rotated sorted array, find if target exists. Array was sorted then rotated at unknown pivot.

### Examples
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### Pattern Identification
**Keywords**: "rotated sorted", "pivot", "O(log n)"  
**Pattern**: Binary Search on Modified Array

### Approach

#### Key Insight
At least one half is always sorted! Determine which half is sorted and if target lies in that range.

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

### Dry Run
```
nums = [4,5,6,7,0,1,2], target = 0

Step 1: left=0, right=6, mid=3, nums[3]=7
        nums[0]=4 <= nums[3]=7 → Left half sorted
        target=0 not in [4,7) → left=4

Step 2: left=4, right=6, mid=5, nums[5]=1
        nums[4]=0 <= nums[5]=1 → Left half sorted
        target=0 in [0,1) → right=4

Step 3: left=4, right=4, mid=4, nums[4]=0 == target
        Return 4 ✓
```

### Edge Cases
1. ✅ Not rotated (normal sorted array)
2. ✅ Rotated at first element (no change)
3. ✅ Target not present
4. ✅ Single element array
5. ✅ All elements same

### Complexity
- **Time**: O(log n) - Binary search
- **Space**: O(1)

---

## Problem 3: Find Peak Element

**Source**: https://leetcode.com/problems/find-peak-element/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Facebook  
**Frequency**: 📅 High

### Problem Statement
Find a peak element (greater than neighbors) in an array. Array may have multiple peaks, return any.

### Examples
```
Input: nums = [1,2,3,1]
Output: 2 (index of peak element 3)

Input: nums = [1,2,1,3,5,6,4]
Output: 5 (index of peak element 6)
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int left = 0;
        int right = nums.size() - 1;
        
        while(left < right) {
            int mid = left + (right - left) / 2;
            
            if(nums[mid] > nums[mid + 1]) {
                // Decreasing sequence, peak is on left (including mid)
                right = mid;
            } else {
                // Increasing sequence, peak is on right
                left = mid + 1;
            }
        }
        
        return left;  // or right (they're equal)
    }
};
```

### Edge Cases
1. ✅ Strictly increasing → last element
2. ✅ Strictly decreasing → first element
3. ✅ Multiple peaks → return any
4. ✅ Single element → return 0

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 4: Search a 2D Matrix

**Source**: https://leetcode.com/problems/search-a-2d-matrix/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Search for a value in an m x n matrix where integers in each row are sorted left to right, and first integer of each row is greater than last integer of previous row.

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        
        int m = matrix.size();
        int n = matrix[0].size();
        
        // Treat 2D matrix as 1D array
        int left = 0;
        int right = m * n - 1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n;
            int col = mid % n;
            int value = matrix[row][col];
            
            if(value == target) return true;
            else if(value < target) left = mid + 1;
            else right = mid - 1;
        }
        
        return false;
    }
};
```

### Edge Cases
1. ✅ Empty matrix
2. ✅ Single element matrix
3. ✅ Target smaller/larger than all elements
4. ✅ Target in first/last position

### Complexity
- **Time**: O(log(m×n)) - Binary search on m×n elements
- **Space**: O(1)

---

## Problem 5: Find Minimum in Rotated Sorted Array

**Source**: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 High

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0;
        int right = nums.size() - 1;
        
        while(left < right) {
            int mid = left + (right - left) / 2;
            
            if(nums[mid] > nums[right]) {
                // Minimum is in right half
                left = mid + 1;
            } else {
                // Minimum is in left half (including mid)
                right = mid;
            }
        }
        
        return nums[left];
    }
};
```

### Edge Cases
1. ✅ Not rotated → first element
2. ✅ Rotated once → second element
3. ✅ All elements same
4. ✅ Single element

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **Rotated arrays** - At least one half is sorted
2. **Find bounds** - Continue searching after finding target
3. **Peak finding** - Follow increasing direction
4. **2D matrix** - Treat as flattened 1D array
5. **Minimum in rotated** - Compare mid with right endpoint

---

**Next**: Challenge yourself with Hard problems →

[← Back to Easy](Easy.md) | [Hard Problems →](Hard.md)

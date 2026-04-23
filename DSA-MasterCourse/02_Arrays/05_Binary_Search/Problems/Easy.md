# Binary Search — Easy Problems

> **Beginner-friendly binary search problems**

---

## Problem 1: Binary Search (Classic)

**Source**: https://leetcode.com/problems/binary-search/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 Very High

### Problem Statement
Given a sorted array and target, return the index if target is found, otherwise return -1.

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
            
            if(nums[mid] == target) {
                return mid;
            } else if(nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
};
```

### Edge Cases
1. ✅ Empty array → -1
2. ✅ Target not in array → -1
3. ✅ Target at first/last position
4. ✅ Single element array

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 2: Sqrt(x)

**Source**: https://leetcode.com/problems/sqrtx/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 High

### Problem Statement
Calculate the integer square root of a non-negative integer x.

### Complete Solution
```cpp
class Solution {
public:
    int mySqrt(int x) {
        if(x == 0) return 0;
        
        int left = 1;
        int right = x;
        int result = 0;
        
        while(left <= right) {
            long long mid = left + (right - left) / 2;
            
            if(mid * mid == x) {
                return mid;
            } else if(mid * mid < x) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(log x)
- **Space**: O(1)

---

## Problem 3: First Bad Version

**Source**: https://leetcode.com/problems/first-bad-version/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 High

### Complete Solution
```cpp
class Solution {
public:
    int firstBadVersion(int n) {
        int left = 1;
        int right = n;
        
        while(left < right) {
            int mid = left + (right - left) / 2;
            
            if(isBadVersion(mid)) {
                right = mid;  // Bad version, search left
            } else {
                left = mid + 1;  // Good version, search right
            }
        }
        
        return left;
    }
};
```

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 4: Find Minimum in Rotated Sorted Array

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
                left = mid + 1;  // Minimum in right half
            } else {
                right = mid;  // Minimum in left half (including mid)
            }
        }
        
        return nums[left];
    }
};
```

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 5: Search Insert Position

**Source**: https://leetcode.com/problems/search-insert-position/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 High

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(nums[mid] == target) {
                return mid;
            } else if(nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left;  // Insert position
    }
};
```

### Edge Cases
1. ✅ Target smaller than all → insert at 0
2. ✅ Target larger than all → insert at end
3. ✅ Target already exists → return index
4. ✅ Empty array → return 0

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **Classic template** - `left <= right`, update `mid ± 1`
2. **Lower bound** - `left < right`, update `right = mid`
3. **Avoid overflow** - `left + (right - left) / 2`
4. **Return left** - When element not found
5. **Practice variations** - Different update conditions

---

**Master these basics before moving to medium!**

[← Back to Notes](../Notes.md)

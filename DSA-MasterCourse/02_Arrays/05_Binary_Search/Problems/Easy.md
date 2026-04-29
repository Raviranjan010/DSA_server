# Binary Search — Easy Problems (Complete Striver Sheet)

> **7 beginner-friendly binary search problems**  
> **Prerequisites**: Binary Search Notes.md  
> **Time Required**: 3-4 hours  
> **Pattern**: BS on 1D Arrays - Basic**

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

## Problem 6: Lower Bound

**Source**: https://www.geeksforgeeks.org/lower-bound-in-cpp/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 Very High

### Problem Statement
Given a sorted array and a target value, find the index of the first element that is greater than or equal to the target. If all elements are smaller, return array size.

### Examples
```
Input: arr = [1, 2, 2, 3, 5, 5, 7], target = 4
Output: 4 (index of first element >= 4 is 5 at index 4)

Input: arr = [1, 2, 2, 3, 5], target = 6
Output: 5 (all elements smaller, return size)
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

int lowerBound(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    int ans = arr.size();
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] >= target) {
            ans = mid;  // Store potential answer
            right = mid - 1;  // Try to find earlier occurrence
        } else {
            left = mid + 1;
        }
    }
    
    return ans;
}
```

### Dry Run
```
arr = [1, 2, 2, 3, 5, 5, 7], target = 4

Step 1: left=0, right=6, mid=3, arr[3]=3 < 4 → left=4
Step 2: left=4, right=6, mid=5, arr[5]=5 >= 4 → ans=5, right=4
Step 3: left=4, right=4, mid=4, arr[4]=5 >= 4 → ans=4, right=3
Step 4: left=4, right=3 → Stop
Return 4 ✓
```

### Edge Cases
1. ✅ Target smaller than all → return 0
2. ✅ Target larger than all → return size
3. ✅ Target equals multiple elements → return first occurrence
4. ✅ Empty array → return 0

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 7: Upper Bound

**Source**: https://www.geeksforgeeks.org/upper-bound-in-cpp/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 High

### Problem Statement
Given a sorted array and a target value, find the index of the first element that is strictly greater than the target. If all elements are smaller or equal, return array size.

### Complete Solution
```cpp
int upperBound(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    int ans = arr.size();
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] > target) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return ans;
}
```

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 8: Floor and Ceil in Sorted Array

**Source**: https://www.geeksforgeeks.org/ceil-in-a-sorted-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Given a sorted array and a target, find:
- **Floor**: Largest element ≤ target
- **Ceil**: Smallest element ≥ target

### Examples
```
Input: arr = [1, 2, 8, 10, 10, 12, 19], target = 5
Output: Floor = 2, Ceil = 8

Input: arr = [1, 2, 8, 10, 19], target = 10
Output: Floor = 10, Ceil = 10
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

pair<int, int> getFloorAndCeil(vector<int>& arr, int target) {
    int n = arr.size();
    int floor = -1, ceil = -1;
    
    // Find Floor (largest element <= target)
    int left = 0, right = n - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] <= target) {
            floor = arr[mid];
            left = mid + 1;  // Try to find larger element <= target
        } else {
            right = mid - 1;
        }
    }
    
    // Find Ceil (smallest element >= target)
    left = 0, right = n - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] >= target) {
            ceil = arr[mid];
            right = mid - 1;  // Try to find smaller element >= target
        } else {
            left = mid + 1;
        }
    }
    
    return {floor, ceil};
}
```

### Edge Cases
1. ✅ Target smaller than all → Floor = -1, Ceil = arr[0]
2. ✅ Target larger than all → Floor = arr[n-1], Ceil = -1
3. ✅ Target equals an element → Floor = Ceil = target
4. ✅ Empty array → return {-1, -1}

### Complexity
- **Time**: O(log n) - Two binary searches
- **Space**: O(1)

---

## Problem 9: First and Last Occurrence

**Source**: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/  
**Difficulty**: 🟢 Easy (Medium on LeetCode)  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given a sorted array, find the starting and ending position of a given target value.

### Examples
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3, 4]

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1, -1]
```

### Complete Solution
```cpp
vector<int> searchRange(vector<int>& nums, int target) {
    int first = -1, last = -1;
    
    // Find first occurrence
    int left = 0, right = nums.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target) {
            first = mid;
            right = mid - 1;  // Keep searching left
        } else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    if(first == -1) return {-1, -1};  // Not found
    
    // Find last occurrence
    left = 0, right = nums.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target) {
            last = mid;
            left = mid + 1;  // Keep searching right
        } else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return {first, last};
}
```

### Edge Cases
1. ✅ Target not in array → return [-1, -1]
2. ✅ Single occurrence → return [i, i]
3. ✅ All elements same as target
4. ✅ Target at boundaries

### Complexity
- **Time**: O(log n) - Two binary searches
- **Space**: O(1)

---

## Problem 10: Count Occurrences in Sorted Array

**Source**: https://www.geeksforgeeks.org/count-occurrences-of-a-given-number-in-a-sorted-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 High

### Problem Statement
Given a sorted array and a target, count how many times the target appears.

### Examples
```
Input: arr = [1, 2, 2, 2, 3, 4], target = 2
Output: 3

Input: arr = [1, 2, 3, 4, 5], target = 6
Output: 0
```

### Complete Solution
```cpp
int countOccurrences(vector<int>& arr, int target) {
    // Find first occurrence
    int first = -1;
    int left = 0, right = arr.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            first = mid;
            right = mid - 1;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    if(first == -1) return 0;
    
    // Find last occurrence
    int last = -1;
    left = 0, right = arr.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            last = mid;
            left = mid + 1;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return last - first + 1;
}
```

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

### Alternative Approach (Using Lower & Upper Bound)
```cpp
int countOccurrences(vector<int>& arr, int target) {
    int lb = lowerBound(arr, target);
    if(lb == arr.size() || arr[lb] != target) return 0;
    
    int ub = upperBound(arr, target);
    return ub - lb;
}
```

---

## 🎯 Key Takeaways

1. **Classic template** - `left <= right`, update `mid ± 1`
2. **Lower bound** - First element >= target
3. **Upper bound** - First element > target
4. **Floor** - Largest element <= target
5. **Ceil** - Smallest element >= target
6. **First/Last occurrence** - Continue searching after finding target
7. **Count** - last - first + 1
8. **Avoid overflow** - `left + (right - left) / 2`
9. **Return left** - When element not found (insert position)
10. **Practice variations** - Different update conditions

---

**Master these basics before moving to medium!**

[← Back to Notes](../Notes.md) | [Medium Problems →](Medium.md)

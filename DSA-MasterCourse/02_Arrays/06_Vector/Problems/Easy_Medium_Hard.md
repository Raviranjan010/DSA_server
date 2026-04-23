# Vector — Easy, Medium & Hard Problems

> **Complete problem set for mastering C++ vectors**

---

## Problem 1: Running Sum of 1d Array

**Source**: https://leetcode.com/problems/running-sum-of-1d-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Adobe  
**Frequency**: 📅 Medium

### Problem Statement
Given an array, return the running sum where runningSum[i] = sum(nums[0]...nums[i]).

### Examples
```
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: [1, 1+2, 1+2+3, 1+2+3+4]
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int> result(nums.size());
        result[0] = nums[0];
        
        for(int i = 1; i < nums.size(); i++) {
            result[i] = result[i-1] + nums[i];
        }
        
        return result;
    }
};
```

### Edge Cases
1. ✅ Single element
2. ✅ Negative numbers
3. ✅ All zeros

### Complexity
- **Time**: O(n)
- **Space**: O(1) - Excluding output

---

## Problem 2: Shuffle the Array

**Source**: https://leetcode.com/problems/shuffle-the-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Medium

### Problem Statement
Given array in form [x1,x2,...,xn,y1,y2,...,yn], return [x1,y1,x2,y2,...,xn,yn].

### Examples
```
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> result(2 * n);
        
        for(int i = 0; i < n; i++) {
            result[2 * i] = nums[i];
            result[2 * i + 1] = nums[i + n];
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(n) - For result vector

---

## Problem 3: Container With Most Water

**Source**: https://leetcode.com/problems/container-with-most-water/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 Very High

### Problem Statement
Find two lines that together with x-axis form a container that holds the most water.

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

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 4: 3Sum

**Source**: https://leetcode.com/problems/3sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

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
            if(i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1;
            int right = nums.size() - 1;
            
            while(left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if(sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    
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
- **Time**: O(n²)
- **Space**: O(1) - Excluding output

---

## Problem 5: First Missing Positive

**Source**: https://leetcode.com/problems/first-missing-positive/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Problem Statement
Find the smallest missing positive integer in an unsorted array. Must run in O(n) time with O(1) space.

### Examples
```
Input: nums = [3,4,-1,1]
Output: 2
```

### Pattern Identification
**Keywords**: "missing positive", "O(n) time", "O(1) space"  
**Pattern**: Cyclic Sort / In-place Hashing

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        
        // Place each number at its correct position
        for(int i = 0; i < n; i++) {
            while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
                swap(nums[i], nums[nums[i]-1]);
            }
        }
        
        // Find first position with wrong number
        for(int i = 0; i < n; i++) {
            if(nums[i] != i + 1) {
                return i + 1;
            }
        }
        
        return n + 1;
    }
};
```

### Dry Run
```
nums = [3,4,-1,1]

Step 1: nums[0]=3, swap with nums[2]
        [-1,4,3,1]

Step 2: nums[0]=-1, skip
Step 3: nums[1]=4, swap with nums[3]
        [-1,1,3,4]

Step 4: nums[1]=1, swap with nums[0]
        [1,-1,3,4]

Final: [1,-1,3,4]
       Position 1 has -1 (should be 2)
       Return 2 ✓
```

### Edge Cases
1. ✅ All negatives → return 1
2. ✅ All present → return n+1
3. ✅ Duplicates
4. ✅ Single element

### Complexity
- **Time**: O(n) - Each element moved at most once
- **Space**: O(1) - In-place

---

## Problem 6: Trapping Rain Water

**Source**: https://leetcode.com/problems/trapping-rain-water/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 Very High

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        if(height.empty()) return 0;
        
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while(left < right) {
            if(height[left] < height[right]) {
                if(height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if(height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **Vector operations** - push_back, insert, erase
2. **Two pointer on vectors** - Same as arrays
3. **In-place modifications** - Careful with indices
4. **STL algorithms** - sort, unique, reverse
5. **Memory management** - Vectors handle it automatically

---

**Master vectors and you master dynamic arrays in C++!**

[← Back to Notes](../Notes.md)

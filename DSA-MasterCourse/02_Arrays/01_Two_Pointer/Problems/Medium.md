# Two Pointer — Medium Problems

> **5 medium-level problems combining multiple concepts**  
> **Prerequisites**: Easy Problems, `Patterns.md`  
> **Time Required**: 3-4 hours

---

## Problem 1: 3Sum

**Source**: https://leetcode.com/problems/3sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given an integer array, return all triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.

### Examples
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0
```

### Pattern Identification
**Keywords**: "triplets", "sum to target", "no duplicates"  
**Pattern**: Sorting + Two Pointer

### Approach

#### Brute Force (O(n³))
```cpp
// Check all triplets
for(int i = 0; i < n; i++) {
    for(int j = i+1; j < n; j++) {
        for(int k = j+1; k < n; k++) {
            if(nums[i] + nums[j] + nums[k] == 0) {
                // Add to result
            }
        }
    }
}
// Problem: O(n³) and handles duplicates poorly
```

#### Optimized (O(n²))
1. Sort the array
2. Fix one number, use two pointers for remaining two
3. Skip duplicates to avoid duplicate triplets

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        int n = nums.size();
        
        // Sort array
        sort(nums.begin(), nums.end());
        
        // Fix first number
        for(int i = 0; i < n - 2; i++) {
            // Skip duplicates for first number
            if(i > 0 && nums[i] == nums[i-1]) continue;
            
            // Two pointers for remaining two numbers
            int left = i + 1;
            int right = n - 1;
            
            while(left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if(sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    
                    // Skip duplicates for second number
                    while(left < right && nums[left] == nums[left+1]) {
                        left++;
                    }
                    // Skip duplicates for third number
                    while(left < right && nums[right] == nums[right-1]) {
                        right--;
                    }
                    
                    left++;
                    right--;
                } else if(sum < 0) {
                    left++;  // Need larger sum
                } else {
                    right--;  // Need smaller sum
                }
            }
        }
        
        return result;
    }
};
```

### Edge Cases
1. ✅ Array with less than 3 elements → return empty
2. ✅ All zeros → [[0, 0, 0]]
3. ✅ All same elements → empty (unless all zeros)
4. ✅ Multiple valid triplets with same values
5. ✅ Array with both positive and negative numbers

### Complexity
- **Time**: O(n²) - Sorting O(n log n) + nested loops O(n²)
- **Space**: O(1) - Excluding output storage

### Similar Problems
1. Two Sum (LeetCode 1)
2. 3Sum Closest (LeetCode 16)
3. 4Sum (LeetCode 18)

---

## Problem 2: Trapping Rain Water

**Source**: https://leetcode.com/problems/trapping-rain-water/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Examples
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map traps 6 units of water.
```

### Pattern Identification
**Keywords**: "trap water", "elevation map", "maximum height"  
**Pattern**: Two Pointer

### Approach

#### Optimized Two Pointer (O(n))
- Water at index i = min(max_left, max_right) - height[i]
- Use two pointers to track max from both sides
- Process the smaller height first

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        if(height.empty()) return 0;
        
        int left = 0;
        int right = height.size() - 1;
        int leftMax = 0;
        int rightMax = 0;
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

### Dry Run
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]
          L                    R
leftMax = 0, rightMax = 0, water = 0

Step 1: height[0]=0 < height[11]=1
        leftMax = 0, water += 0-0 = 0, left=1

Step 2: height[1]=1 < height[11]=1
        leftMax = 1, left=2

Step 3: height[2]=0 < height[11]=1
        water += 1-0 = 1, left=3
...
Continue until left >= right
Total water = 6
```

### Edge Cases
1. ✅ Empty array → 0
2. ✅ Less than 3 elements → 0 (can't trap water)
3. ✅ Ascending/descending array → 0
4. ✅ All same heights → 0
5. ✅ Single peak → 0

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - Only variables used

---

## Problem 3: 3Sum Closest

**Source**: https://leetcode.com/problems/3sum-closest/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Facebook  
**Frequency**: 📅 High

### Problem Statement
Given an integer array and a target, find three integers such that their sum is closest to the target. Return the sum of the three integers.

### Examples
```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum closest to 1 is 2 (-1 + 2 + 1 = 2)
```

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int closestSum = nums[0] + nums[1] + nums[2];
        
        for(int i = 0; i < n - 2; i++) {
            int left = i + 1;
            int right = n - 1;
            
            while(left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];
                
                // Update closest sum
                if(abs(currentSum - target) < abs(closestSum - target)) {
                    closestSum = currentSum;
                }
                
                if(currentSum < target) {
                    left++;
                } else if(currentSum > target) {
                    right--;
                } else {
                    return target;  // Exact match
                }
            }
        }
        
        return closestSum;
    }
};
```

### Edge Cases
1. ✅ Exactly 3 elements
2. ✅ Multiple sums equally close
3. ✅ Exact match exists
4. ✅ All negative numbers

### Complexity
- **Time**: O(n²)
- **Space**: O(1)

---

## Problem 4: Remove Nth Node From End of List

**Source**: https://leetcode.com/problems/remove-nth-node-from-end-of-list/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Given the head of a linked list, remove the nth node from the end and return the head.

### Examples
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

### Pattern Identification
**Keywords**: "nth from end", "fast and slow"  
**Pattern**: Two Pointer (Fast/Slow)

### Complete Solution
```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        
        // Move fast n+1 steps ahead
        for(int i = 0; i <= n; i++) {
            fast = fast->next;
        }
        
        // Move both until fast reaches end
        while(fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        
        // Remove nth node
        slow->next = slow->next->next;
        
        return dummy->next;
    }
};
```

### Edge Cases
1. ✅ Remove first node
2. ✅ Remove last node
3. ✅ Single node list
4. ✅ n equals list length

### Complexity
- **Time**: O(n) - One pass
- **Space**: O(1)

---

## Problem 5: Sort Colors

**Source**: https://leetcode.com/problems/sort-colors/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Microsoft, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an array with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with colors in order red (0), white (1), and blue (2).

### Examples
```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

### Pattern Identification
**Keywords**: "sort", "0, 1, 2", "in-place"  
**Pattern**: Dutch National Flag (3-Way Partition)

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

### Dry Run
```
nums = [2,0,2,1,1,0]
        l
        m
           h

Step 1: nums[0]=2 → swap with high
        [0,0,2,1,1,2], h=4

Step 2: nums[0]=0 → swap with low, both++
        [0,0,2,1,1,2], l=1, m=1

Step 3: nums[1]=0 → swap with low, both++
        [0,0,2,1,1,2], l=2, m=2

Step 4: nums[2]=2 → swap with high
        [0,0,1,1,2,2], h=3

Continue until mid > high
Result: [0,0,1,1,2,2] ✓
```

### Edge Cases
1. ✅ Already sorted
2. ✅ Reverse sorted
3. ✅ All same color
4. ✅ Only two colors present
5. ✅ Single element

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - In-place

### Similar Problems
1. Partition Array (LintCode)
2. Wiggle Sort II (LeetCode 324)

---

## 🎯 Key Takeaways from Medium Problems

1. **Sorting + Two Pointer** - Powerful combination
2. **Skip duplicates carefully** - Common source of bugs
3. **Track max/min from both ends** - Water trapping pattern
4. **Fast/Slow for position finding** - Nth from end
5. **Dutch Flag for 3-way partition** - Sort colors

---

**Next**: Challenge yourself with Hard problems →

[← Back to Easy](Easy.md) | [Hard Problems →](Hard.md)
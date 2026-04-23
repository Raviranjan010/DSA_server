# Vector — Hard Problems

> **3 advanced vector problems requiring creative thinking**  
> **Prerequisites**: Medium Problems, strong problem-solving skills  
> **Time Required**: 3-4 hours

---

## Problem 1: First Missing Positive

**Source**: https://leetcode.com/problems/first-missing-positive/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Find the smallest missing positive integer in an unsorted array. Must run in O(n) time with O(1) space.

### Examples
```
Input: nums = [3,4,-1,1]
Output: 2

Input: nums = [7,8,9,11,12]
Output: 1
```

### Pattern Identification
**Keywords**: "missing positive", "O(n) time", "O(1) space"  
**Pattern**: Cyclic Sort / In-place Hashing

### Approach

#### Key Insight
If array has n elements, the answer must be in range [1, n+1]. We can use the array itself as a hash table by placing each number at its correct position.

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
        // nums[i] should be at index nums[i]-1
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
        
        return n + 1;  // All positions correct
    }
};
```

### Dry Run
```
nums = [3,4,-1,1]

Step 1: i=0, nums[0]=3
        Swap nums[0] with nums[2]: [-1,4,3,1]

Step 2: i=0, nums[0]=-1 (negative, skip)

Step 3: i=1, nums[1]=4
        Swap nums[1] with nums[3]: [-1,1,3,4]

Step 4: i=1, nums[1]=1
        Swap nums[1] with nums[0]: [1,-1,3,4]

Step 5: i=1, nums[1]=-1 (skip)

Step 6: i=2, nums[2]=3 (correct position)

Step 7: i=3, nums[3]=4 (correct position)

Final: [1,-1,3,4]
Check: nums[1] = -1 ≠ 2
Return 2 ✓
```

### Edge Cases
1. ✅ All negative numbers → return 1
2. ✅ All present from 1 to n → return n+1
3. ✅ Duplicates present
4. ✅ Single element
5. ✅ Large values (ignore values > n)

### Complexity
- **Time**: O(n) - Each element moved at most once
- **Space**: O(1) - In-place modification

---

## Problem 2: Trapping Rain Water

**Source**: https://leetcode.com/problems/trapping-rain-water/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.

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

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1)

---

## Problem 3: Longest Consecutive Sequence

**Source**: https://leetcode.com/problems/longest-consecutive-sequence/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an unsorted array of integers, find the length of the longest consecutive elements sequence. Algorithm must run in O(n) time.

### Examples
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: Longest consecutive sequence is [1, 2, 3, 4]
```

### Pattern Identification
**Keywords**: "consecutive", "unsorted", "O(n) time"  
**Pattern**: Hash Set + Smart Iteration

### Complete Solution
```cpp
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longestStreak = 0;
        
        for(int num : numSet) {
            // Only start counting if num is the beginning of a sequence
            if(numSet.find(num - 1) == numSet.end()) {
                int currentNum = num;
                int currentStreak = 1;
                
                while(numSet.find(currentNum + 1) != numSet.end()) {
                    currentNum++;
                    currentStreak++;
                }
                
                longestStreak = max(longestStreak, currentStreak);
            }
        }
        
        return longestStreak;
    }
};
```

### Dry Run
```
nums = [100,4,200,1,3,2]
numSet = {100, 4, 200, 1, 3, 2}

Check 100: 99 not in set → start
           101 not in set → streak = 1

Check 4: 3 in set → skip (not start)

Check 200: 199 not in set → start
           201 not in set → streak = 1

Check 1: 0 not in set → start
         2 in set → continue
         3 in set → continue
         4 in set → continue
         5 not in set → streak = 4

Check 3: 2 in set → skip
Check 2: 1 in set → skip

Longest = 4 ✓
```

### Edge Cases
1. ✅ Empty array → 0
2. ✅ Single element → 1
3. ✅ All elements same → 1
4. ✅ Already consecutive
5. ✅ Multiple sequences of same length

### Complexity
- **Time**: O(n) - Each element visited at most twice
- **Space**: O(n) - Hash set

---

## 🎯 Key Takeaways

1. **Cyclic sort** - Place elements at correct positions
2. **In-place hashing** - Use array as hash table
3. **Two pointer** - For rain water trapping
4. **Hash set** - For O(1) lookups
5. **Smart iteration** - Only start from sequence beginnings

---

## 💡 Pro Tips for Hard Vector Problems

1. **Think about constraints** - O(n) time + O(1) space is challenging
2. **Use the array itself** - As data structure (hash table, etc.)
3. **Look for patterns** - Two pointer, cyclic sort, etc.
4. **Handle edge cases** - Empty, single element, all same
5. **Practice regularly** - Hard problems require pattern recognition

---

**Master these hard problems and vectors become second nature!**

[← Back to Medium](Medium.md) | [← Back to Notes](../Notes.md)

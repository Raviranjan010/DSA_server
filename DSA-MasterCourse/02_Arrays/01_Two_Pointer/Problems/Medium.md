# Two Pointer — Medium Problems

> **9 medium-level problems combining multiple concepts**  
> **Prerequisites**: Easy Problems, `Patterns.md`  
> **Time Required**: 4-5 hours

---

## Problem 1: 3Sum

**Source**: https://leetcode.com/problems/3sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given an integer array, return all unique triplets that sum to zero.

### Examples
```
Input: [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

### Pattern: Sorting + Opposite Direction Two Pointer

### Complete Solution
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        int n = nums.size();
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;  // Skip dup for i

            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left]  == nums[left+1])  left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++; right--;
                } else if (sum < 0) {
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

### Dry Run
```
Sorted: [-4, -1, -1, 0, 1, 2]

i=0 (-4): left=1, right=5 → -4+-1+2=-3 < 0 → left++
          left=2, right=5 → -4+-1+2=-3 < 0 → left++
          ... all sums < 0 for i=0

i=1 (-1): left=2, right=5 → -1+-1+2=0 ✓ → record [-1,-1,2]
                             skip dup → left=3, right=4
          left=3, right=4 → -1+0+1=0 ✓ → record [-1,0,1]

i=2 (-1): same as i=1, SKIP (duplicate)

i=3 (0): left=4, right=5 → 0+1+2=3 > 0 → right--
         left >= right → stop
```

### Edge Cases
- ✅ Less than 3 elements → empty result
- ✅ All zeros → [[0,0,0]]
- ✅ All positive/all negative → empty result

### Complexity: Time O(n²), Space O(1) excluding output

---

## Problem 2: Trapping Rain Water

**Source**: https://leetcode.com/problems/trapping-rain-water/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given elevation heights, compute how much water can be trapped after raining.

### Examples
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

### Pattern: Opposite Direction Two Pointer

### Key Insight
Water at index i = `min(maxLeft, maxRight) - height[i]`

Use two pointers to compute this without extra arrays:
- Process the side with the **smaller** max height first
- The smaller side's water amount is fully determined

### Complete Solution
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }

        return water;
    }
};
```

### Alternative: Prefix Max Arrays (easier to understand)
```cpp
int trap(vector<int>& height) {
    int n = height.size();
    vector<int> leftMax(n), rightMax(n);

    leftMax[0] = height[0];
    for (int i = 1; i < n; i++)
        leftMax[i] = max(leftMax[i-1], height[i]);

    rightMax[n-1] = height[n-1];
    for (int i = n-2; i >= 0; i--)
        rightMax[i] = max(rightMax[i+1], height[i]);

    int water = 0;
    for (int i = 0; i < n; i++)
        water += min(leftMax[i], rightMax[i]) - height[i];

    return water;
}
// Time O(n), Space O(n) — easier to understand, two-pointer is O(1) space
```

### Edge Cases
- ✅ Empty or less than 3 elements → 0
- ✅ Ascending/descending → 0 (no trapped water)
- ✅ All same height → 0

### Complexity: Time O(n), Space O(1)

---

## Problem 3: 3Sum Closest

**Source**: https://leetcode.com/problems/3sum-closest/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Facebook  
**Frequency**: 📅 High

### Problem Statement
Given an integer array and a target, find three integers whose sum is closest to the target. Return that sum.

### Examples
```
Input: nums = [-1,2,1,-4], target = 1
Output: 2  (sum of -1+2+1 = 2)
```

### Complete Solution
```cpp
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int closestSum = nums[0] + nums[1] + nums[2];

        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;

            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];

                if (abs(currentSum - target) < abs(closestSum - target))
                    closestSum = currentSum;

                if      (currentSum < target) left++;
                else if (currentSum > target) right--;
                else    return target;  // Exact match
            }
        }

        return closestSum;
    }
};
```

### Complexity: Time O(n²), Space O(1)

---

## Problem 4: Remove Nth Node From End of List

**Source**: https://leetcode.com/problems/remove-nth-node-from-end-of-list/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Pattern: Same Direction Fast/Slow (Linked List)

### Key Insight
Move `fast` pointer n+1 steps ahead. Then move both until `fast` is null. Now `slow` is just before the target node.

### Complete Solution
```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        ListNode* fast = dummy;
        ListNode* slow = dummy;

        // Move fast n+1 steps ahead
        for (int i = 0; i <= n; i++) fast = fast->next;

        // Move both until fast reaches end
        while (fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }

        // slow->next is the node to delete
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete;

        return dummy->next;
    }
};
```

### Visual
```
List: 1 → 2 → 3 → 4 → 5, n=2

dummy → 1 → 2 → 3 → 4 → 5
  S                         (both start at dummy)
  fast moves 3 steps: dummy → 1 → 2 → 3
  
Then move both:
dummy → 1 → 2 → 3 → 4 → 5
              S              F=null
              ↑ slow is before node 4
slow->next = slow->next->next → remove 4
```

### Edge Cases
- ✅ Remove first node (n = length)
- ✅ Remove last node (n = 1)
- ✅ Single node

### Complexity: Time O(n), Space O(1)

---

## Problem 5: Sort Colors

**Source**: https://leetcode.com/problems/sort-colors/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Microsoft, Amazon  
**Frequency**: 📅 High

### Pattern: Dutch National Flag (3-Way Partition)

### Complete Solution
```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++; mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high]);
                high--;
                // Don't increment mid! arr[mid] is unknown after swap
            }
        }
    }
};
```

### Complexity: Time O(n), Space O(1)

---

## Problem 6: Minimum Size Subarray Sum ⭐ NEW

**Source**: https://leetcode.com/problems/minimum-size-subarray-sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Facebook  
**Frequency**: 📅 Very High

### Problem Statement
Given an array of positive integers and a target, find the minimal length subarray whose sum is ≥ target. Return 0 if no such subarray exists.

### Examples
```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2  (subarray [4,3] has sum 7)

Input: target = 4, nums = [1,4,4]
Output: 1  (subarray [4])
```

### Pattern: Variable Size Sliding Window

### Complete Solution
```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0;
        int result = INT_MAX;

        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];   // Expand window

            while (sum >= target) {
                result = min(result, right - left + 1);
                sum -= nums[left];  // Shrink window
                left++;
            }
        }

        return result == INT_MAX ? 0 : result;
    }
};
```

### Dry Run
```
target=7, nums=[2,3,1,2,4,3]

right=0: sum=2, sum<7
right=1: sum=5, sum<7
right=2: sum=6, sum<7
right=3: sum=8, sum>=7 → result=4 (right-left+1=4), sum=8-2=6, left=1
         sum=6 < 7
right=4: sum=10 → result=min(4,4)=4, sum=10-3=7 → result=min(4,3)=3, sum=7-1=6 → left=3
right=5: sum=9 → result=min(3,3)=3, sum=9-2=7 → result=min(3,2)=2, sum=7-4=3 → left=5

Final result: 2 ✓
```

### Edge Cases
- ✅ No valid subarray → return 0
- ✅ Single element equals target → return 1
- ✅ Entire array needed → return n

### Complexity: Time O(n), Space O(1)

---

## Problem 7: Longest Substring Without Repeating Characters ⭐ NEW

**Source**: https://leetcode.com/problems/longest-substring-without-repeating-characters/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Find the length of the longest substring without repeating characters.

### Examples
```
Input: "abcabcbb"  → Output: 3 ("abc")
Input: "bbbbb"    → Output: 1 ("b")
Input: "pwwkew"   → Output: 3 ("wke")
```

### Pattern: Variable Size Sliding Window + Hash Map

### Complete Solution
```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> lastIndex;  // char → last seen index
        int left = 0, result = 0;

        for (int right = 0; right < s.size(); right++) {
            // If char seen before AND it's inside current window
            if (lastIndex.count(s[right]) && lastIndex[s[right]] >= left) {
                left = lastIndex[s[right]] + 1;  // Shrink window
            }

            lastIndex[s[right]] = right;
            result = max(result, right - left + 1);
        }

        return result;
    }
};
```

### Alternative: Using Set (more intuitive)
```cpp
int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int left = 0, result = 0;

    for (int right = 0; right < s.size(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left]);
            left++;
        }
        window.insert(s[right]);
        result = max(result, right - left + 1);
    }

    return result;
}
```

### Dry Run
```
s = "abcabcbb"

right=0 'a': lastIndex={a:0}, window=[a], len=1
right=1 'b': lastIndex={b:1}, window=[ab], len=2
right=2 'c': lastIndex={c:2}, window=[abc], len=3
right=3 'a': a seen at 0, left=max(0,0+1)=1, lastIndex={a:3}, window=[bca], len=3
right=4 'b': b seen at 1, left=max(1,1+1)=2, lastIndex={b:4}, window=[cab], len=3
...
```

### Edge Cases
- ✅ Empty string → 0
- ✅ All same characters → 1
- ✅ All unique → n

### Complexity: Time O(n), Space O(min(n, alphabet_size))

---

## Problem 8: Container With Most Water ⭐ NEW

**Source**: https://leetcode.com/problems/container-with-most-water/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Bloomberg  
**Frequency**: 📅 Very High

### Problem Statement
Given heights of vertical lines, find two lines that together with the x-axis forms a container holding the most water.

### Examples
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49  (between index 1 and 8, height=min(8,7)=7, width=7, area=49)
```

### Pattern: Opposite Direction Two Pointer

### Key Insight
Area = `min(height[L], height[R]) × (R - L)`

Always move the pointer at the **shorter** line:
- Moving the taller line inward cannot increase area (width shrinks AND height is already limited by shorter line)
- Moving the shorter line might find something taller → could increase area

### Complete Solution
```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxWater = 0;

        while (left < right) {
            int h = min(height[left], height[right]);
            int w = right - left;
            maxWater = max(maxWater, h * w);

            if (height[left] < height[right]) left++;
            else                              right--;
        }

        return maxWater;
    }
};
```

### Edge Cases
- ✅ Two elements → only one container possible
- ✅ All same height → area = height × (n-1)

### Complexity: Time O(n), Space O(1)

---

## Problem 9: Linked List Cycle II — Find Cycle Start ⭐ NEW

**Source**: https://leetcode.com/problems/linked-list-cycle-ii/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Given a linked list, return the node where the cycle begins. Return null if no cycle.

### Pattern: Floyd's Fast/Slow Pointer (Two Phase)

### Mathematical Proof
Let: `F` = distance from head to cycle start, `a` = distance from cycle start to meeting point, `C` = cycle length.

When they meet: `slow` traveled `F + a`, `fast` traveled `F + a + C`.

Since fast = 2 × slow: `F + a + C = 2(F + a)` → `C = F + a` → `F = C - a`

So after meeting, moving one pointer back to head and advancing both by 1 step each → they meet at cycle start!

### Complete Solution
```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;

        ListNode* slow = head;
        ListNode* fast = head;

        // Phase 1: Detect cycle
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) {
                // Phase 2: Find cycle start
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow;  // Cycle start node
            }
        }

        return nullptr;  // No cycle
    }
};
```

### Edge Cases
- ✅ No cycle → return null
- ✅ Cycle at head (entire list is a loop)
- ✅ Cycle at last node pointing to head

### Complexity: Time O(n), Space O(1)

---

## 🎯 Key Takeaways from Medium Problems

1. **Sort + Two Pointer** (3Sum, 3Sum Closest) — powerful and reusable combo
2. **Skip duplicates carefully** — inner while loops after recording result
3. **Water trapping** — process the smaller side first
4. **Fast/Slow on linked lists** — n+1 gap trick for Nth from end, two-phase for cycle start
5. **Dutch Flag** — maintain 3 invariant regions simultaneously
6. **Sliding window variable** — expand right greedily, shrink left when valid, track result throughout

---

**Next**: Challenge yourself with Hard problems →

[← Back to Easy](Easy.md) | [Hard Problems →](Hard.md)
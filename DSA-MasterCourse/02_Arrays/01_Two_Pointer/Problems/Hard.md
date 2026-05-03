# Two Pointer — Hard Problems

> **5 advanced problems requiring creative thinking**  
> **Prerequisites**: Medium Problems, strong pattern recognition  
> **Time Required**: 4-5 hours

---

## Problem 1: Minimum Window Substring

**Source**: https://leetcode.com/problems/minimum-window-substring/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Meta, Google, Amazon  
**Frequency**: 📅 Very High

### Problem Statement
Given two strings s and t, return the minimum window in s which will contain all the characters in t. If no such window exists, return empty string.

### Examples
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: Minimum window that contains all characters of "ABC"
```

### Pattern Identification
**Keywords**: "minimum window", "contains all characters"  
**Pattern**: Sliding Window + Two Pointer + Hash Map

### Approach

#### Optimized Sliding Window (O(n))
1. Count required characters from t
2. Expand window with right pointer
3. When all characters found, shrink from left
4. Track minimum window size

### Complete Solution
```cpp
#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        if(s.empty() || t.empty()) return "";
        
        unordered_map<char, int> required;
        for(char c : t) {
            required[c]++;
        }
        
        int requiredCount = required.size();
        int left = 0, right = 0;
        int formed = 0;
        
        unordered_map<char, int> windowCounts;
        int minLen = INT_MAX;
        int minLeft = 0, minRight = 0;
        
        while(right < s.size()) {
            char c = s[right];
            windowCounts[c]++;
            
            if(required.count(c) && windowCounts[c] == required[c]) {
                formed++;
            }
            
            // Try to shrink window
            while(left <= right && formed == requiredCount) {
                // Update minimum window
                if(right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                    minRight = right;
                }
                
                char leftChar = s[left];
                windowCounts[leftChar]--;
                
                if(required.count(leftChar) && windowCounts[leftChar] < required[leftChar]) {
                    formed--;
                }
                
                left++;
            }
            
            right++;
        }
        
        return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
    }
};
```

### Edge Cases
1. ✅ t longer than s → ""
2. ✅ No valid window → ""
3. ✅ Multiple windows of same size
4. ✅ All characters same
5. ✅ t has duplicate characters

### Complexity
- **Time**: O(|s| + |t|) - Each character visited at most twice
- **Space**: O(|s| + |t|) - Hash maps

---

## Problem 2: Sliding Window Maximum

**Source**: https://leetcode.com/problems/sliding-window-maximum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an array and a window size k, find the maximum element in each sliding window as it moves from left to right.

### Examples
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

### Pattern Identification
**Keywords**: "sliding window", "maximum in window"  
**Pattern**: Monotonic Deque

### Complete Solution
```cpp
#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> result;
        deque<int> dq;  // Stores indices
        
        for(int i = 0; i < nums.size(); i++) {
            // Remove elements out of window
            if(!dq.empty() && dq.front() == i - k) {
                dq.pop_front();
            }
            
            // Remove smaller elements (they're useless)
            while(!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            
            // Add current element
            dq.push_back(i);
            
            // Record maximum for valid windows
            if(i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        
        return result;
    }
};
```

### Dry Run
```
nums = [1,3,-1,-3,5,3,6,7], k = 3

i=0: dq=[0(1)]
i=1: dq=[1(3)] (removed 0 because 1<3)
i=2: dq=[1(3), 2(-1)] → max = 3
i=3: dq=[1(3), 3(-3)] → max = 3
i=4: dq=[4(5)] (removed 1,2,3) → max = 5
i=5: dq=[4(5), 5(3)] → max = 5
i=6: dq=[6(6)] → max = 6
i=7: dq=[7(7)] → max = 7

Result: [3,3,5,5,6,7] ✓
```

### Edge Cases
1. ✅ k = 1 → return original array
2. ✅ k = n → return single max
3. ✅ All elements same
4. ✅ Strictly increasing/decreasing

### Complexity
- **Time**: O(n) - Each element added/removed at most once
- **Space**: O(k) - Deque stores at most k elements

---

## Problem 3: Median of Two Sorted Arrays

**Source**: https://leetcode.com/problems/median-of-two-sorted-arrays/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given two sorted arrays, find the median of the two sorted arrays with overall run time complexity O(log(m+n)).

### Examples
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: Merged array = [1,2,3], median is 2

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: Merged array = [1,2,3,4], median is (2+3)/2 = 2.5
```

### Pattern Identification
**Keywords**: "median", "two sorted arrays", "O(log n)"  
**Pattern**: Binary Search on Answer

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Ensure nums1 is smaller
        if(nums1.size() > nums2.size()) {
            swap(nums1, nums2);
        }
        
        int m = nums1.size();
        int n = nums2.size();
        int left = 0, right = m;
        
        while(left <= right) {
            int partitionX = left + (right - left) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minX = (partitionX == m) ? INT_MAX : nums1[partitionX];
            
            int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minY = (partitionY == n) ? INT_MAX : nums2[partitionY];
            
            if(maxX <= minY && maxY <= minX) {
                // Found correct partition
                if((m + n) % 2 == 0) {
                    return (max(maxX, maxY) + min(minX, minY)) / 2.0;
                } else {
                    return max(maxX, maxY);
                }
            } else if(maxX > minY) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }
        
        return 0.0;
    }
};
```

### Edge Cases
1. ✅ One array empty
2. ✅ Arrays of different sizes
3. ✅ All elements in one array smaller
4. ✅ Even/odd total length

### Complexity
- **Time**: O(log(min(m, n))) - Binary search on smaller array
- **Space**: O(1)

---

## Problem 4: Count of Range Sum

**Source**: https://leetcode.com/problems/count-of-range-sum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Given an integer array and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.

### Examples
```
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: Range sums: [-2], [-1], [-2,5,-1] are in range [-2,2]
```

### Pattern Identification
**Keywords**: "range sum", "count", "between lower and upper"  
**Pattern**: Prefix Sum + Merge Sort / BST

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        vector<long long> prefixSum(n + 1, 0);
        
        for(int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
        
        return mergeSort(prefixSum, 0, n, lower, upper);
    }
    
    int mergeSort(vector<long long>& sums, int start, int end, int lower, int upper) {
        if(end - start <= 1) return 0;
        
        int mid = start + (end - start) / 2;
        int count = mergeSort(sums, start, mid, lower, upper) +
                    mergeSort(sums, mid, end, lower, upper);
        
        // Count valid ranges
        int j = mid, k = mid, t = mid;
        for(int i = start; i < mid; i++) {
            while(k < end && sums[k] - sums[i] < lower) k++;
            while(j < end && sums[j] - sums[i] <= upper) j++;
            count += j - k;
        }
        
        // Merge
        inplace_merge(sums.begin() + start, sums.begin() + mid, sums.begin() + end);
        
        return count;
    }
};
```

### Edge Cases
1. ✅ Empty array
2. ✅ All range sums valid
3. ✅ No range sums valid
4. ✅ Negative numbers
5. ✅ Large values (use long long)

### Complexity
- **Time**: O(n log n) - Merge sort
- **Space**: O(n) - Prefix sum array

---

## Problem 5: Longest Consecutive Sequence

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

Check 100: 99 not in set → start counting
           101 not in set → streak = 1

Check 4: 3 in set → skip (not start)

Check 200: 199 not in set → start counting
           201 not in set → streak = 1

Check 1: 0 not in set → start counting
         2 in set → continue
         3 in set → continue
         4 in set → continue
         5 not in set → streak = 4

Check 3: 2 in set → skip
Check 2: 1 in set → skip

Longest streak = 4 ✓
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

## 🎯 Key Takeaways from Hard Problems

1. **Sliding window with hash map** - Minimum window substring
2. **Monotonic deque** - Sliding window maximum
3. **Binary search on answer** - Median of sorted arrays
4. **Prefix sum + divide & conquer** - Count of range sum
5. **Hash set with smart iteration** - Longest consecutive sequence

---

## 💡 Pro Tips for Hard Problems

1. **Identify the core pattern** - Don't get distracted by complexity
2. **Start with brute force** - Understand the problem first
3. **Look for optimizations** - What's redundant?
4. **Use appropriate data structures** - Deque, hash map, BST
5. **Practice regularly** - Hard problems require pattern recognition

---

**Congratulations! You've mastered Two Pointer problems!**

[← Back to Medium](Medium.md) | [← Back to Notes](../Notes.md)
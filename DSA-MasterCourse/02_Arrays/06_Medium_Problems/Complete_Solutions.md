# Medium Array Problems — Complete Striver-Style Solutions

> **16 Essential Medium Problems**  
> **Prerequisites**: Array Basics, Two Pointer, Sliding Window, Prefix Sum  
> **Time Required**: 8-10 hours  
> **Based on**: Striver's A2Z DSA Course/Sheet

---

## Table of Contents

1. [Sort 0s, 1s, 2s (Dutch National Flag)](#problem-1-sort-0s-1s-2s)
2. [Majority Element (> n/2 times)](#problem-2-majority-element)
3. [Maximum Subarray Sum (Kadane's)](#problem-3-maximum-subarray-sum)
4. [Stock Buy and Sell](#problem-4-stock-buy-and-sell)
5. [Rearrange Array by Sign](#problem-5-rearrange-array-by-sign)
6. [Next Permutation](#problem-6-next-permutation)
7. [Leaders in Array](#problem-7-leaders-in-array)
8. [Longest Consecutive Sequence](#problem-8-longest-consecutive-sequence)
9. [Set Matrix Zeroes](#problem-9-set-matrix-zeroes)
10. [Rotate Matrix 90°](#problem-10-rotate-matrix-90)
11. [Spiral Matrix Traversal](#problem-11-spiral-matrix-traversal)
12. [Pascal's Triangle](#problem-12-pascals-triangle)
13. [Majority Element II (> n/3 times)](#problem-13-majority-element-ii)
14. [Merge Overlapping Intervals](#problem-14-merge-overlapping-intervals)
15. [Count Subarrays with Sum K](#problem-15-count-subarrays-with-sum-k)
16. [Largest Subarray with Sum 0](#problem-16-largest-subarray-with-sum-0)

---

## Problem 1: Sort 0s, 1s, 2s (Dutch National Flag)

**Source**: [LeetCode 75](https://leetcode.com/problems/sort-colors/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Microsoft, Flipkart  
**Frequency**: Very High

### Problem Statement
Given an array with only 0s, 1s, and 2s, sort them in-place.

### Examples
```
Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Input: [2,0,1]
Output: [0,1,2]
```

### Brute Force Approach
**Time**: O(n log n) | **Space**: O(1)
- Simply sort the array using any sorting algorithm

### Optimal Approach: Dutch National Flag Algorithm
**Time**: O(n) | **Space**: O(1)

**Intuition**: Use three pointers to partition the array into three sections:
- `low`: boundary for 0s
- `mid`: current element being examined
- `high`: boundary for 2s

### Complete Solution
```cpp
#include <vector>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        }
        else if(nums[mid] == 1) {
            mid++;
        }
        else { // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;
        }
    }
}
```

### Dry Run
```
Input: [2, 0, 2, 1, 1, 0]
        L
        M
           H

Step 1: nums[mid]=2 → swap(mid, high)
        [0, 0, 2, 1, 1, 2]
        L           H
        M

Step 2: nums[mid]=0 → swap(low, mid), low++, mid++
        [0, 0, 2, 1, 1, 2]
           L
           M
        H

Step 3: nums[mid]=0 → swap(low, mid), low++, mid++
        [0, 0, 2, 1, 1, 2]
              L
              M
           H

Step 4: nums[mid]=2 → swap(mid, high)
        [0, 0, 1, 1, 2, 2]
              L
              M
           H

Continue until mid > high...

Result: [0, 0, 1, 1, 2, 2] ✓
```

### Edge Cases
- ✅ Empty array → return immediately
- ✅ Already sorted → algorithm still works
- ✅ All same elements → no swaps needed

---

## Problem 2: Majority Element (> n/2 times)

**Source**: [LeetCode 169](https://leetcode.com/problems/majority-element/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Google, Adobe  
**Frequency**: Very High

### Problem Statement
Find the element that appears more than n/2 times.

### Examples
```
Input: [3,2,3]
Output: 3

Input: [2,2,1,1,1,2,2]
Output: 2
```

### Optimal Approach: Boyer-Moore Voting Algorithm
**Time**: O(n) | **Space**: O(1)

**Intuition**: 
- Maintain a candidate and count
- If count becomes 0, change candidate
- Majority element will survive at the end

### Complete Solution
```cpp
int majorityElement(vector<int>& nums) {
    int candidate = nums[0];
    int count = 1;
    
    for(int i = 1; i < nums.size(); i++) {
        if(count == 0) {
            candidate = nums[i];
            count = 1;
        }
        else if(nums[i] == candidate) {
            count++;
        }
        else {
            count--;
        }
    }
    
    return candidate;
}
```

### Dry Run
```
Input: [2, 2, 1, 1, 1, 2, 2]

i=0: candidate=2, count=1
i=1: nums[1]=2 == candidate → count=2
i=2: nums[2]=1 != candidate → count=1
i=3: nums[3]=1 != candidate → count=0
i=4: count=0 → candidate=1, count=1
i=5: nums[5]=2 != candidate → count=0
i=6: count=0 → candidate=2, count=1

Result: 2 ✓ (appears 4 times > 7/2)
```

---

## Problem 3: Maximum Subarray Sum (Kadane's Algorithm)

**Source**: [LeetCode 53](https://leetcode.com/problems/maximum-subarray/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: All major companies  
**Frequency**: Very High

### Problem Statement
Find the contiguous subarray with maximum sum.

### Examples
```
Input: [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has maximum sum = 6

Input: [1]
Output: 1
```

### Optimal Approach: Kadane's Algorithm
**Time**: O(n) | **Space**: O(1)

**Intuition**: At each position, decide whether to:
- Extend the current subarray, OR
- Start a new subarray from current element

### Complete Solution
```cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        // Either extend or start fresh
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

### Dry Run
```
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: currentSum=-2, maxSum=-2
i=1: currentSum=max(1, -2+1)=1, maxSum=1
i=2: currentSum=max(-3, 1-3)=-2, maxSum=1
i=3: currentSum=max(4, -2+4)=4, maxSum=4
i=4: currentSum=max(-1, 4-1)=3, maxSum=4
i=5: currentSum=max(2, 3+2)=5, maxSum=5
i=6: currentSum=max(1, 5+1)=6, maxSum=6 ← Maximum!
i=7: currentSum=max(-5, 6-5)=1, maxSum=6
i=8: currentSum=max(4, 1+4)=5, maxSum=6

Result: 6 (subarray: [4,-1,2,1])
```

---

## Problem 4: Stock Buy and Sell

**Source**: [LeetCode 121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Facebook, Bloomberg  
**Frequency**: High

### Problem Statement
Find maximum profit from one buy and one sell transaction.

### Examples
```
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy at 1, sell at 6 → profit = 5

Input: [7,6,4,3,1]
Output: 0
Explanation: No profitable transaction
```

### Optimal Approach
**Time**: O(n) | **Space**: O(1)

**Intuition**: Track minimum price so far and calculate maximum profit at each step.

### Complete Solution
```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = prices[0];
    int maxProfit = 0;
    
    for(int i = 1; i < prices.size(); i++) {
        maxProfit = max(maxProfit, prices[i] - minPrice);
        minPrice = min(minPrice, prices[i]);
    }
    
    return maxProfit;
}
```

### Dry Run
```
Input: [7, 1, 5, 3, 6, 4]

i=0: minPrice=7, maxProfit=0
i=1: maxProfit=max(0, 1-7)=0, minPrice=1
i=2: maxProfit=max(0, 5-1)=4, minPrice=1
i=3: maxProfit=max(4, 3-1)=4, minPrice=1
i=4: maxProfit=max(4, 6-1)=5 ← Maximum!, minPrice=1
i=5: maxProfit=max(5, 4-1)=5, minPrice=1

Result: 5 ✓
```

---

## Problem 5: Rearrange Array by Sign

**Source**: [LeetCode 2149](https://leetcode.com/problems/rearrange-array-elements-by-sign/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Google, Meta

### Problem Statement
Rearrange array so that positive and negative numbers alternate, preserving order.

### Examples
```
Input: [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]

Input: [-1,1]
Output: [1,-1]
```

### Optimal Approach
**Time**: O(n) | **Space**: O(n)

### Complete Solution
```cpp
vector<int> rearrangeArray(vector<int>& nums) {
    vector<int> result(nums.size());
    int posIdx = 0, negIdx = 1;
    
    for(int num : nums) {
        if(num > 0) {
            result[posIdx] = num;
            posIdx += 2;
        } else {
            result[negIdx] = num;
            negIdx += 2;
        }
    }
    
    return result;
}
```

---

## Problem 6: Next Permutation

**Source**: [LeetCode 31](https://leetcode.com/problems/next-permutation/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Google, Adobe  
**Frequency**: High

### Problem Statement
Find the lexicographically next greater permutation.

### Examples
```
Input: [1,2,3]
Output: [1,3,2]

Input: [3,2,1]
Output: [1,2,3] (reset to smallest)

Input: [1,1,5]
Output: [1,5,1]
```

### Optimal Approach
**Time**: O(n) | **Space**: O(1)

**Algorithm**:
1. Find the first decreasing element from right (breakpoint)
2. Find smallest element > breakpoint from right
3. Swap them
4. Reverse the right half

### Complete Solution
```cpp
void nextPermutation(vector<int>& nums) {
    int n = nums.size();
    int breakpoint = -1;
    
    // Step 1: Find breakpoint
    for(int i = n - 2; i >= 0; i--) {
        if(nums[i] < nums[i + 1]) {
            breakpoint = i;
            break;
        }
    }
    
    // If no breakpoint, reverse entire array
    if(breakpoint == -1) {
        reverse(nums.begin(), nums.end());
        return;
    }
    
    // Step 2: Find element > nums[breakpoint]
    for(int i = n - 1; i > breakpoint; i--) {
        if(nums[i] > nums[breakpoint]) {
            swap(nums[i], nums[breakpoint]);
            break;
        }
    }
    
    // Step 3: Reverse right half
    reverse(nums.begin() + breakpoint + 1, nums.end());
}
```

---

## Problem 7: Leaders in Array

**Source**: [GFG](https://www.geeksforgeeks.org/leaders-in-an-array/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Flipkart

### Problem Statement
An element is a leader if it's greater than all elements to its right.

### Examples
```
Input: [16, 17, 4, 3, 5, 2]
Output: [17, 5, 2]

Input: [1, 2, 3, 4, 0]
Output: [4, 0]
```

### Optimal Approach
**Time**: O(n) | **Space**: O(1)

**Intuition**: Traverse from right to left, track maximum so far.

### Complete Solution
```cpp
vector<int> leaders(vector<int>& arr) {
    vector<int> result;
    int maxFromRight = arr.back();
    result.push_back(maxFromRight);
    
    for(int i = arr.size() - 2; i >= 0; i--) {
        if(arr[i] >= maxFromRight) {
            maxFromRight = arr[i];
            result.push_back(maxFromRight);
        }
    }
    
    reverse(result.begin(), result.end());
    return result;
}
```

---

## Problem 8: Longest Consecutive Sequence

**Source**: [LeetCode 128](https://leetcode.com/problems/longest-consecutive-sequence/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Google, Amazon, Microsoft  
**Frequency**: High

### Problem Statement
Find the length of the longest consecutive sequence.

### Examples
```
Input: [100,4,200,1,3,2]
Output: 4
Explanation: [1,2,3,4] is the longest consecutive sequence

Input: [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

### Optimal Approach
**Time**: O(n) | **Space**: O(n)

**Intuition**: Use hash set for O(1) lookup. Only start counting if current element is the beginning of a sequence.

### Complete Solution
```cpp
int longestConsecutive(vector<int>& nums) {
    if(nums.empty()) return 0;
    
    unordered_set<int> numSet(nums.begin(), nums.end());
    int longestStreak = 0;
    
    for(int num : numSet) {
        // Only start if this is the beginning
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
```

---

## Problem 9: Set Matrix Zeroes

**Source**: [LeetCode 73](https://leetcode.com/problems/set-matrix-zeroes/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Microsoft, Amazon, Google  
**Frequency**: High

### Problem Statement
If an element is 0, set its entire row and column to 0. Do it in-place.

### Examples
```
Input: [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

### Optimal Approach
**Time**: O(m×n) | **Space**: O(1)

**Intuition**: Use first row and column as markers instead of extra space.

### Complete Solution
```cpp
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;
    
    // Check first row/col
    for(int j = 0; j < n; j++) firstRowZero |= (matrix[0][j] == 0);
    for(int i = 0; i < m; i++) firstColZero |= (matrix[i][0] == 0);
    
    // Mark zeroes
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            if(matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set zeroes
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Handle first row/col
    if(firstRowZero) fill(matrix[0].begin(), matrix[0].end(), 0);
    if(firstColZero) {
        for(int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}
```

---

## Problem 10: Rotate Matrix 90°

**Source**: [LeetCode 48](https://leetcode.com/problems/rotate-image/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Microsoft, Adobe

### Problem Statement
Rotate an n×n matrix 90 degrees clockwise in-place.

### Examples
```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

### Optimal Approach
**Time**: O(n²) | **Space**: O(1)

**Algorithm**:
1. Transpose the matrix
2. Reverse each row

### Complete Solution
```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Step 1: Transpose
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Step 2: Reverse each row
    for(int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}
```

---

## Problem 11: Spiral Matrix Traversal

**Source**: [LeetCode 54](https://leetcode.com/problems/spiral-matrix/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Microsoft, Zoho

### Problem Statement
Return all elements in spiral order.

### Examples
```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

### Complete Solution
```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while(top <= bottom && left <= right) {
        // Right
        for(int j = left; j <= right; j++) result.push_back(matrix[top][j]);
        top++;
        
        // Down
        for(int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        
        // Left
        if(top <= bottom) {
            for(int j = right; j >= left; j--) result.push_back(matrix[bottom][j]);
            bottom--;
        }
        
        // Up
        if(left <= right) {
            for(int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    
    return result;
}
```

---

## Problem 12: Pascal's Triangle

**Source**: [LeetCode 118](https://leetcode.com/problems/pascals-triangle/)  
**Difficulty**: 🟡 Medium

### Problem Statement
Generate the first n rows of Pascal's triangle.

### Examples
```
Input: 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

### Complete Solution
```cpp
vector<vector<int>> generate(int numRows) {
    vector<vector<int>> result;
    
    for(int i = 0; i < numRows; i++) {
        vector<int> row(i + 1, 1);
        for(int j = 1; j < i; j++) {
            row[j] = result[i-1][j-1] + result[i-1][j];
        }
        result.push_back(row);
    }
    
    return result;
}
```

---

## Problem 13: Majority Element II (> n/3 times)

**Source**: [LeetCode 229](https://leetcode.com/problems/majority-element-ii/)  
**Difficulty**: 🟡 Medium

### Problem Statement
Find all elements that appear more than ⌊n/3⌋ times.

### Examples
```
Input: [3,2,3]
Output: [3]

Input: [1,1,1,3,3,2,2,2]
Output: [1,2]
```

### Complete Solution
```cpp
vector<int> majorityElement(vector<int>& nums) {
    int candidate1 = 0, candidate2 = 1;
    int count1 = 0, count2 = 0;
    
    for(int num : nums) {
        if(num == candidate1) count1++;
        else if(num == candidate2) count2++;
        else if(count1 == 0) {
            candidate1 = num;
            count1 = 1;
        }
        else if(count2 == 0) {
            candidate2 = num;
            count2 = 1;
        }
        else {
            count1--;
            count2--;
        }
    }
    
    // Verify candidates
    vector<int> result;
    count1 = count2 = 0;
    for(int num : nums) {
        if(num == candidate1) count1++;
        else if(num == candidate2) count2++;
    }
    
    if(count1 > nums.size() / 3) result.push_back(candidate1);
    if(count2 > nums.size() / 3) result.push_back(candidate2);
    
    return result;
}
```

---

## Problem 14: Merge Overlapping Intervals

**Source**: [LeetCode 56](https://leetcode.com/problems/merge-intervals/)  
**Difficulty**: 🟡 Medium  
**Company Tags**: Amazon, Google, Adobe

### Problem Statement
Merge all overlapping intervals.

### Examples
```
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

### Complete Solution
```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if(intervals.empty()) return {};
    
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for(int i = 1; i < intervals.size(); i++) {
        if(intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    
    return merged;
}
```

---

## Problem 15: Count Subarrays with Sum K

**Source**: [LeetCode 560](https://leetcode.com/problems/subarray-sum-equals-k/)  
**Difficulty**: 🟡 Medium  
**Frequency**: Very High

### Problem Statement
Count the number of subarrays with sum equal to k.

### Examples
```
Input: [1,1,1], k=2
Output: 2

Input: [1,2,3], k=3
Output: 2
```

### Complete Solution
```cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixSumCount;
    prefixSumCount[0] = 1;
    
    int currentSum = 0, count = 0;
    
    for(int num : nums) {
        currentSum += num;
        
        if(prefixSumCount.count(currentSum - k)) {
            count += prefixSumCount[currentSum - k];
        }
        
        prefixSumCount[currentSum]++;
    }
    
    return count;
}
```

---

## Problem 16: Largest Subarray with Sum 0

**Source**: [GFG](https://www.geeksforgeeks.org/find-the-largest-subarray-with-0-sum/)  
**Difficulty**: 🟡 Medium

### Problem Statement
Find the length of the largest subarray with sum 0.

### Complete Solution
```cpp
int maxLen(vector<int>& arr) {
    unordered_map<int, int> prefixSumIndex;
    int currentSum = 0, maxLen = 0;
    
    for(int i = 0; i < arr.size(); i++) {
        currentSum += arr[i];
        
        if(currentSum == 0) {
            maxLen = i + 1;
        }
        
        if(prefixSumCount.count(currentSum)) {
            maxLen = max(maxLen, i - prefixSumIndex[currentSum]);
        } else {
            prefixSumIndex[currentSum] = i;
        }
    }
    
    return maxLen;
}
```

---

## 📊 Progress Tracker

- [ ] Problem 1-4 completed
- [ ] Problem 5-8 completed
- [ ] Problem 9-12 completed
- [ ] Problem 13-16 completed

**Total: 16 Medium Problems**

---

**Next**: [Hard Problems](../07_Hard_Problems/Complete_Solutions.md) →

[← Back to README](../README.md) | [Pattern Notes](../01_Two_Pointer/Notes.md)

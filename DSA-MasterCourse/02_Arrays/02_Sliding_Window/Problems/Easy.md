# Sliding Window — Easy Problems

> **5 beginner-friendly sliding window problems**

---

## Problem 1: Maximum Average Subarray I

**Source**: https://leetcode.com/problems/maximum-average-subarray-i/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Facebook  
**Frequency**: 📅 High

### Problem Statement
Given an array and integer k, find the maximum average of a contiguous subarray of length k.

### Examples
```
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
```

### Pattern Identification
**Keywords**: "subarray of length k", "maximum average"  
**Pattern**: Fixed Window

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        // Calculate sum of first window
        double currentSum = 0;
        for(int i = 0; i < k; i++) {
            currentSum += nums[i];
        }
        
        double maxSum = currentSum;
        
        // Slide window
        for(int i = k; i < nums.size(); i++) {
            currentSum += nums[i] - nums[i-k];
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum / k;
    }
};
```

### Edge Cases
1. ✅ k = 1 → maximum element
2. ✅ All negative numbers
3. ✅ k = array length
4. ✅ Single element array

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - Only variables used

---

## Problem 2: Maximum Sum Subarray of Size K

**Source**: https://practice.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an array and integer k, find the maximum sum of a contiguous subarray of size k.

### Complete Solution
```cpp
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximumSumSubarray(vector<int>& nums, int k) {
        if(nums.size() < k) return -1;
        
        int currentSum = 0;
        for(int i = 0; i < k; i++) {
            currentSum += nums[i];
        }
        
        int maxSum = currentSum;
        
        for(int i = k; i < nums.size(); i++) {
            currentSum += nums[i] - nums[i-k];
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 3: First Negative Integer in Every Window of Size K

**Source**: https://practice.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Medium

### Complete Solution
```cpp
#include <vector>
#include <queue>
using namespace std;

vector<int> firstNegative(vector<int>& nums, int k) {
    vector<int> result;
    queue<int> negatives;
    
    for(int i = 0; i < nums.size(); i++) {
        // Add negative numbers to queue
        if(nums[i] < 0) {
            negatives.push(nums[i]);
        }
        
        // Remove out of window elements
        if(i >= k && !negatives.empty() && negatives.front() == nums[i-k]) {
            negatives.pop();
        }
        
        // Record first negative for valid windows
        if(i >= k - 1) {
            result.push_back(negatives.empty() ? 0 : negatives.front());
        }
    }
    
    return result;
}
```

### Complexity
- **Time**: O(n)
- **Space**: O(k) - Queue stores at most k elements

---

## Problem 4: Count Occurrences of Anagrams

**Source**: https://practice.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Medium

### Complete Solution
```cpp
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

int countAnagrams(string text, string pattern) {
    int k = pattern.size();
    unordered_map<char, int> patternCount;
    
    for(char c : pattern) {
        patternCount[c]++;
    }
    
    int count = 0;
    int matched = 0;
    unordered_map<char, int> windowCount;
    int left = 0;
    
    for(int right = 0; right < text.size(); right++) {
        windowCount[text[right]]++;
        
        if(windowCount[text[right]] == patternCount[text[right]]) {
            matched++;
        }
        
        if(right >= k - 1) {
            if(matched == patternCount.size()) {
                count++;
            }
            
            windowCount[text[left]]--;
            if(windowCount[text[left]] < patternCount[text[left]]) {
                matched--;
            }
            left++;
        }
    }
    
    return count;
}
```

### Complexity
- **Time**: O(n)
- **Space**: O(1) - At most 26 characters

---

## Problem 5: Maximum Consecutive Ones III

**Source**: https://leetcode.com/problems/max-consecutive-ones-iii/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Google, Facebook  
**Frequency**: 📅 High

### Problem Statement
Given a binary array and integer k, return the maximum number of consecutive 1s if you can flip at most k 0s.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLength = 0;
        
        for(int right = 0; right < nums.size(); right++) {
            if(nums[right] == 0) {
                zeroCount++;
            }
            
            // Shrink window if more than k zeros
            while(zeroCount > k) {
                if(nums[left] == 0) {
                    zeroCount--;
                }
                left++;
            }
            
            maxLength = max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
};
```

### Edge Cases
1. ✅ k = 0 → longest consecutive 1s without flipping
2. ✅ k >= number of zeros → return array length
3. ✅ All 0s → return k
4. ✅ All 1s → return array length

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **Fixed window** - Calculate first window, then slide
2. **Track what matters** - Sum, average, count, etc.
3. **Queue for window elements** - When need to track specific values
4. **Hash map for frequencies** - For anagram problems
5. **Variable window** - Expand and shrink based on condition

---

**Start with these easy problems to build confidence!**

[Medium Problems →](Medium.md) | [← Back to Notes](../Notes.md)

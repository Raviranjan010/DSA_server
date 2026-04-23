# Sliding Window — Hard Problems

> **Advanced sliding window challenges**

---

## Problem 1: Minimum Window Substring

**Source**: https://leetcode.com/problems/minimum-window-substring/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Meta, Google, Amazon  
**Frequency**: 📅 Very High

### Problem Statement
Given strings s and t, return the minimum window in s which will contain all characters in t.

### Examples
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```

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
            
            while(left <= right && formed == requiredCount) {
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
3. ✅ Multiple minimum windows
4. ✅ Duplicate characters in t

### Complexity
- **Time**: O(|s| + |t|)
- **Space**: O(|s| + |t|)

---

## Problem 2: Sliding Window Maximum

**Source**: https://leetcode.com/problems/sliding-window-maximum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

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
            // Remove out of window elements
            if(!dq.empty() && dq.front() == i - k) {
                dq.pop_front();
            }
            
            // Remove smaller elements
            while(!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            
            dq.push_back(i);
            
            if(i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(k)

---

## Problem 3: Subarrays with K Different Integers

**Source**: https://leetcode.com/problems/subarrays-with-k-different-integers/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Return the number of good subarrays with exactly k different integers.

### Examples
```
Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays with exactly 2 different integers
```

### Complete Solution
```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }
    
    int atMostK(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int left = 0;
        int result = 0;
        
        for(int right = 0; right < nums.size(); right++) {
            if(count[nums[right]] == 0) {
                k--;
            }
            count[nums[right]]++;
            
            while(k < 0) {
                count[nums[left]]--;
                if(count[nums[left]] == 0) {
                    k++;
                }
                left++;
            }
            
            result += right - left + 1;
        }
        
        return result;
    }
};
```

### Key Insight
Exactly K = At Most K - At Most (K-1)

### Complexity
- **Time**: O(n)
- **Space**: O(n)

---

## 🎯 Key Takeaways

1. **Monotonic deque** - For sliding window maximum
2. **Hash map tracking** - For character/element counts
3. **At most K trick** - Exactly K = AtMost(K) - AtMost(K-1)
4. **Expand-shrink logic** - Core sliding window pattern
5. **Multiple valid windows** - Count all of them

---

**Master these hard problems and you're interview-ready!**

[← Back to Medium](Medium.md) | [← Back to Notes](../Notes.md)

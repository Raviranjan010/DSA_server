# Sliding Window — Medium Problems

> **5 medium-level sliding window problems**

---

## Problem 1: Longest Substring Without Repeating Characters

**Source**: https://leetcode.com/problems/longest-substring-without-repeating-characters/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given a string s, find the length of the longest substring without repeating characters.


### Examples
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length 3

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with length 1
```

### Pattern Identification
**Keywords**: "longest substring", "without repeating"  
**Pattern**: Sliding Window + Hash Set

### Approach

#### Optimized Sliding Window (O(n))
1. Use hash set to track characters in current window
2. Expand window with right pointer
3. If duplicate found, shrink from left until removed
4. Track maximum window size

### Complete Solution
```cpp
#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> charSet;
        int left = 0;
        int maxLength = 0;
        
        for(int right = 0; right < s.size(); right++) {
            // If duplicate found, shrink window
            while(charSet.count(s[right])) {
                charSet.erase(s[left]);
                left++;
            }
            
            // Add current character
            charSet.insert(s[right]);
            
            // Update maximum length
            maxLength = max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
};
```

### Edge Cases
1. ✅ Empty string → 0
2. ✅ All same characters → 1
3. ✅ All unique characters → length of string
4. ✅ Single character → 1

### Complexity
- **Time**: O(n) - Each character visited at most twice
- **Space**: O(min(n, m)) - m is charset size (26 for lowercase, 128 for ASCII)

---

## Problem 2: Minimum Size Subarray Sum

**Source**: https://leetcode.com/problems/minimum-size-subarray-sum/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Facebook  
**Frequency**: 📅 High

### Problem Statement
Given an array of positive integers and a positive integer target, find the minimal length of a contiguous subarray whose sum is greater than or equal to target.

### Examples
```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has sum 7 and is the shortest
```

### Complete Solution
```cpp
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0;
        int currentSum = 0;
        int minLength = INT_MAX;
        
        for(int right = 0; right < nums.size(); right++) {
            // Expand window
            currentSum += nums[right];
            
            // Shrink window while condition is met
            while(currentSum >= target) {
                minLength = min(minLength, right - left + 1);
                currentSum -= nums[left];
                left++;
            }
        }
        
        return minLength == INT_MAX ? 0 : minLength;
    }
};
```

### Edge Cases
1. ✅ No valid subarray → 0
2. ✅ Single element >= target → 1
3. ✅ Entire array needed
4. ✅ Multiple subarrays of same minimum length

### Complexity
- **Time**: O(n) - Each element added/removed once
- **Space**: O(1)

---

## Problem 3: Find All Anagrams in a String

**Source**: https://leetcode.com/problems/find-all-anagrams-in-a-string/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Given two strings s and p, return all start indices of p's anagrams in s.

### Examples
```
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation: "cba" and "bac" are anagrams of "abc"
```

### Complete Solution
```cpp
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> result;
        if(s.size() < p.size()) return result;
        
        unordered_map<char, int> pCount;
        for(char c : p) {
            pCount[c]++;
        }
        
        int left = 0;
        int matched = 0;
        int required = pCount.size();
        
        for(int right = 0; right < s.size(); right++) {
            // Add current character
            if(pCount.count(s[right])) {
                pCount[s[right]]--;
                if(pCount[s[right]] == 0) {
                    matched++;
                }
            }
            
            // When window size equals p's length
            if(right >= p.size() - 1) {
                // Check if all characters matched
                if(matched == required) {
                    result.push_back(left);
                }
                
                // Remove left character
                if(pCount.count(s[left])) {
                    if(pCount[s[left]] == 0) {
                        matched--;
                    }
                    pCount[s[left]]++;
                }
                left++;
            }
        }
        
        return result;
    }
};
```

### Edge Cases
1. ✅ s shorter than p → empty
2. ✅ No anagrams found → empty
3. ✅ Multiple overlapping anagrams
4. ✅ s and p same length

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - At most 26 characters

---

## Problem 4: Longest Repeating Character Replacement

**Source**: https://leetcode.com/problems/longest-repeating-character-replacement/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Meta  
**Frequency**: 📅 High

### Problem Statement
Given a string s and integer k, you can replace at most k characters. Find the length of the longest substring with all same characters after replacement.

### Examples
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace one 'B' to get "AAAA" or "BBBB"
```

### Complete Solution
```cpp
#include <string>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        unordered_map<char, int> count;
        int left = 0;
        int maxCount = 0;
        int maxLength = 0;
        
        for(int right = 0; right < s.size(); right++) {
            count[s[right]]++;
            maxCount = max(maxCount, count[s[right]]);
            
            // If replacements needed > k, shrink window
            while((right - left + 1) - maxCount > k) {
                count[s[left]]--;
                left++;
            }
            
            maxLength = max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
};
```

### Edge Cases
1. ✅ k >= string length → return length
2. ✅ k = 0 → longest same character substring
3. ✅ All characters same
4. ✅ All characters different

### Complexity
- **Time**: O(n)
- **Space**: O(1) - At most 26 characters

---

## Problem 5: Permutation in String

**Source**: https://leetcode.com/problems/permutation-in-string/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Adobe  
**Frequency**: 📅 High

### Problem Statement
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

### Examples
```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: "ba" is a permutation of "ab"
```

### Complete Solution
```cpp
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if(s1.size() > s2.size()) return false;
        
        vector<int> s1Count(26, 0);
        vector<int> s2Count(26, 0);
        
        // Count characters in s1 and first window of s2
        for(int i = 0; i < s1.size(); i++) {
            s1Count[s1[i] - 'a']++;
            s2Count[s2[i] - 'a']++;
        }
        
        // Slide window
        for(int i = 0; i < s2.size() - s1.size(); i++) {
            if(s1Count == s2Count) return true;
            
            // Add next character
            s2Count[s2[i + s1.size()] - 'a']++;
            // Remove first character
            s2Count[s2[i] - 'a']--;
        }
        
        return s1Count == s2Count;
    }
};
```

### Edge Cases
1. ✅ s1 longer than s2 → false
2. ✅ Exact match
3. ✅ No permutation exists
4. ✅ Multiple permutations exist

### Complexity
- **Time**: O(n) - Vector comparison is O(26) = O(1)
- **Space**: O(1) - Two vectors of size 26

---

## 🎯 Key Takeaways

1. **Variable window** - Expand and shrink based on condition
2. **Hash map/set** - Track characters efficiently
3. **Fixed window** - When window size is known
4. **Optimization** - Avoid recalculating, reuse previous window
5. **Edge cases** - Empty strings, single characters

---

**Next**: Practice more patterns →

[← Back to Notes](../Notes.md)

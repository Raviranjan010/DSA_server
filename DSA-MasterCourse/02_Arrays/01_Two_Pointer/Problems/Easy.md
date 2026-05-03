# Two Pointer — Easy Problems

> **5 essential easy problems to master the basics**  
> **Prerequisites**: `01_Two_Pointer/Notes.md`, `Patterns.md`  
> **Time Required**: 2-3 hours

---

## Problem 1: Valid Palindrome

**Source**: https://leetcode.com/problems/valid-palindrome/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Facebook  
**Frequency**: 📅 Very High

### Problem Statement
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

### Examples
```
Input: "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome

Input: "race a car"
Output: false
Explanation: "raceacar" is not a palindrome
```

### Pattern Identification
**Keywords**: "palindrome", "reads same forwards and backwards"  
**Pattern**: Two Pointer (Opposite Direction)

### Approach

#### Brute Force (O(n) space)
1. Create new string with only alphanumeric chars
2. Reverse it and compare
3. **Problem**: Uses extra O(n) space

#### Optimized Two Pointer (O(1) space)
1. Use two pointers from both ends
2. Skip non-alphanumeric characters
3. Compare characters (case-insensitive)
4. If mismatch found → not palindrome

### Complete Solution
```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0;
        int right = s.size() - 1;
        
        while(left < right) {
            // Skip non-alphanumeric from left
            while(left < right && !isalnum(s[left])) {
                left++;
            }
            
            // Skip non-alphanumeric from right
            while(left < right && !isalnum(s[right])) {
                right--;
            }
            
            // Compare characters (convert to lowercase)
            if(tolower(s[left]) != tolower(s[right])) {
                return false;
            }
            
            // Move both pointers
            left++;
            right--;
        }
        
        return true;
    }
};

int main() {
    Solution sol;
    string s1 = "A man, a plan, a canal: Panama";
    cout << boolalpha << sol.isPalindrome(s1) << endl;  // true
    
    string s2 = "race a car";
    cout << boolalpha << sol.isPalindrome(s2) << endl;  // false
    
    return 0;
}
```

### Edge Cases
1. ✅ Empty string → true
2. ✅ Single character → true
3. ✅ All special characters → true
4. ✅ Mixed case letters
5. ✅ String with spaces

### Complexity
- **Time**: O(n) - Each character visited at most once
- **Space**: O(1) - Only two pointers used

### Similar Problems
1. Valid Palindrome II (LeetCode 680)
2. Reverse String (LeetCode 344)
3. Palindrome Linked List (LeetCode 234)

---

## Problem 2: Two Sum II - Input Array Is Sorted

**Source**: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Adobe  
**Frequency**: 📅 Very High

### Problem Statement
Given a 1-indexed sorted array, find two numbers that add up to a target. Return their 1-based indices.

### Examples
```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: 2 + 7 = 9, indices are 1 and 2
```

### Pattern Identification
**Keywords**: "sorted array", "two numbers", "add up to target"  
**Pattern**: Two Pointer (Opposite Direction)

### Approach

#### Brute Force (O(n²))
```cpp
for(int i = 0; i < n; i++) {
    for(int j = i + 1; j < n; j++) {
        if(numbers[i] + numbers[j] == target) {
            return {i+1, j+1};
        }
    }
}
```

#### Optimized Two Pointer (O(n))
- Array is sorted!
- If sum < target → need larger sum → move left pointer right
- If sum > target → need smaller sum → move right pointer left

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0;
        int right = numbers.size() - 1;
        
        while(left < right) {
            int sum = numbers[left] + numbers[right];
            
            if(sum == target) {
                return {left + 1, right + 1};  // 1-indexed
            } else if(sum < target) {
                left++;   // Need larger sum
            } else {
                right--;  // Need smaller sum
            }
        }
        
        return {};  // No solution (problem guarantees one exists)
    }
};
```

### Edge Cases
1. ✅ Exactly two elements in array
2. ✅ Negative numbers present
3. ✅ Multiple valid pairs (return any)
4. ✅ Target is sum of adjacent elements

### Complexity
- **Time**: O(n) - Each element visited at most once
- **Space**: O(1) - Only two pointers

### Similar Problems
1. Two Sum (LeetCode 1) - Unsorted version, use hash map
2. 3Sum (LeetCode 15) - Extend to three numbers
3. Two Sum Less Than K (LeetCode 1099)

---

## Problem 3: Reverse String

**Source**: https://leetcode.com/problems/reverse-string/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Adobe, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Write a function that reverses a string in-place with O(1) extra memory.

### Examples
```
Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

### Pattern Identification
**Keywords**: "reverse", "in-place"  
**Pattern**: Two Pointer (Opposite Direction)

### Complete Solution
```cpp
#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0;
        int right = s.size() - 1;
        
        while(left < right) {
            // Swap characters
            swap(s[left], s[right]);
            
            // Move pointers
            left++;
            right--;
        }
    }
};
```

### Edge Cases
1. ✅ Empty array
2. ✅ Single character
3. ✅ Even length string
4. ✅ Odd length string

### Complexity
- **Time**: O(n) - Swap n/2 pairs
- **Space**: O(1) - In-place reversal

---

## Problem 4: Remove Duplicates from Sorted Array

**Source**: https://leetcode.com/problems/remove-duplicates-from-sorted-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Remove duplicates from sorted array in-place such that each element appears only once. Return the new length.

### Examples
```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: First 2 elements are unique

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

### Pattern Identification
**Keywords**: "remove duplicates", "in-place", "sorted array"  
**Pattern**: Two Pointer (Same Direction)

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.empty()) return 0;
        
        int slow = 0;  // Points to last unique element
        
        for(int fast = 1; fast < nums.size(); fast++) {
            // Found new unique element
            if(nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        
        return slow + 1;  // Length is index + 1
    }
};
```

### Dry Run
```
nums = [0,0,1,1,1,2,2,3,3,4]
        s
           f

Step 1: nums[1]=0 == nums[0]=0 → skip
Step 2: nums[2]=1 != nums[0]=0 → slow=1, nums[1]=1
Step 3: nums[3]=1 == nums[1]=1 → skip
...
Result: slow=4, return 5
First 5 elements: [0,1,2,3,4]
```

### Edge Cases
1. ✅ Empty array → return 0
2. ✅ Single element → return 1
3. ✅ All same elements → return 1
4. ✅ All unique elements → return n

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - In-place

---

## Problem 5: Move Zeroes

**Source**: https://leetcode.com/problems/move-zeroes/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Facebook, Bloomberg  
**Frequency**: 📅 High

### Problem Statement
Move all zeroes to the end of array while maintaining relative order of non-zero elements. Do this in-place.

### Examples
```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```

### Pattern Identification
**Keywords**: "move", "in-place", "maintain order"  
**Pattern**: Two Pointer (Same Direction)

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int slow = 0;
        
        // Move all non-zeroes to front
        for(int fast = 0; fast < nums.size(); fast++) {
            if(nums[fast] != 0) {
                nums[slow] = nums[fast];
                slow++;
            }
        }
        
        // Fill remaining positions with 0
        while(slow < nums.size()) {
            nums[slow] = 0;
            slow++;
        }
    }
};
```

### Edge Cases
1. ✅ No zeroes → no change
2. ✅ All zeroes → same array
3. ✅ Zero at beginning
4. ✅ Zero at end
5. ✅ Alternating zeroes

### Complexity
- **Time**: O(n) - Two passes
- **Space**: O(1) - In-place

### Similar Problems
1. Remove Element (LeetCode 27)
2. Remove Duplicates (LeetCode 26)
3. Sort Colors (LeetCode 75)

---

## 🎯 Key Takeaways from Easy Problems

1. **Opposite Direction**: For pairs, palindromes, reverse
2. **Same Direction**: For filtering, removing, moving
3. **Always check edge cases**: Empty, single element
4. **In-place means O(1) space**: No extra arrays
5. **Sorted arrays are hints**: Often means two pointer

---

**Next**: Challenge yourself with Medium problems →

[← Back to Notes](../Notes.md) | [Medium Problems →](Medium.md)
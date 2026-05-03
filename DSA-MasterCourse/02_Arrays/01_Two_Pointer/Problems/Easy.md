# Two Pointer — Easy Problems

> **8 essential easy problems to master the basics**  
> **Prerequisites**: `Notes.md`, `Patterns.md`  
> **Time Required**: 3-4 hours

---

## Problem 1: Valid Palindrome

**Source**: https://leetcode.com/problems/valid-palindrome/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Facebook, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given a string, determine if it is a palindrome considering only alphanumeric characters and ignoring cases.

### Examples
```
Input: "A man, a plan, a canal: Panama"
Output: true

Input: "race a car"
Output: false
```

### Pattern: Opposite Direction Two Pointer

### Complete Solution
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;

        while (left < right) {
            while (left < right && !isalnum(s[left]))  left++;
            while (left < right && !isalnum(s[right])) right--;

            if (tolower(s[left]) != tolower(s[right])) return false;

            left++; right--;
        }

        return true;
    }
};
```

### Edge Cases
- ✅ Empty string → true
- ✅ Single character → true
- ✅ All special characters → true (empty after filtering)
- ✅ Mixed case "RaceCar" → true
- ✅ Numbers "12321" → true

### Complexity: Time O(n), Space O(1)

---

## Problem 2: Two Sum II — Input Array Is Sorted

**Source**: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Adobe  
**Frequency**: 📅 Very High

### Problem Statement
Given a 1-indexed sorted array, find two numbers that add up to target. Return their 1-based indices.

### Examples
```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
```

### Pattern: Opposite Direction Two Pointer

### Complete Solution
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if      (sum == target) return {left + 1, right + 1};
            else if (sum < target)  left++;
            else                    right--;
        }

        return {};
    }
};
```

### Dry Run
```
[2, 7, 11, 15], target = 9
 L              R   → 2+15=17 > 9, right--
 L          R       → 2+11=13 > 9, right--
 L      R           → 2+7=9 == 9 ✓ return {1,2}
```

### Edge Cases
- ✅ Exactly two elements
- ✅ Negative numbers in array
- ✅ Answer is adjacent elements

### Complexity: Time O(n), Space O(1)

---

## Problem 3: Reverse String

**Source**: https://leetcode.com/problems/reverse-string/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Adobe, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Write a function that reverses a string in-place using O(1) extra memory.

### Pattern: Opposite Direction Two Pointer

### Complete Solution
```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;

        while (left < right) {
            swap(s[left], s[right]);
            left++; right--;
        }
    }
};
```

### Edge Cases: Empty, single char, even/odd length — all handled correctly.

### Complexity: Time O(n), Space O(1)

---

## Problem 4: Remove Duplicates from Sorted Array

**Source**: https://leetcode.com/problems/remove-duplicates-from-sorted-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Remove duplicates from sorted array in-place so each element appears only once. Return the new length.

### Examples
```
Input: [0,0,1,1,1,2,2,3,3,4]
Output: 5, array = [0,1,2,3,4,_,_,_,_,_]
```

### Pattern: Same Direction Fast/Slow

### Complete Solution
```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;

        int slow = 0;

        for (int fast = 1; fast < nums.size(); fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }

        return slow + 1;
    }
};
```

### Dry Run
```
[0, 0, 1, 1, 2]
 s  f
nums[1]=0 == nums[0]=0  → skip
nums[2]=1 != nums[0]=0  → slow=1, nums[1]=1
nums[3]=1 == nums[1]=1  → skip
nums[4]=2 != nums[1]=1  → slow=2, nums[2]=2
Return slow+1 = 3
```

### Edge Cases
- ✅ Empty array → 0
- ✅ All same → 1
- ✅ All unique → n

### Complexity: Time O(n), Space O(1)

---

## Problem 5: Move Zeroes

**Source**: https://leetcode.com/problems/move-zeroes/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Facebook, Bloomberg  
**Frequency**: 📅 High

### Problem Statement
Move all zeroes to the end while maintaining relative order of non-zero elements. In-place.

### Examples
```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```

### Pattern: Same Direction Fast/Slow

### Complete Solution
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int slow = 0;

        for (int fast = 0; fast < nums.size(); fast++) {
            if (nums[fast] != 0) {
                nums[slow++] = nums[fast];
            }
        }

        while (slow < nums.size()) {
            nums[slow++] = 0;
        }
    }
};
```

### Edge Cases
- ✅ No zeroes → array unchanged
- ✅ All zeroes → all zeroes at end (same)
- ✅ Zero at beginning / at end

### Complexity: Time O(n), Space O(1)

---

## Problem 6: Squares of a Sorted Array ⭐ NEW

**Source**: https://leetcode.com/problems/squares-of-a-sorted-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Google, Facebook  
**Frequency**: 📅 High

### Problem Statement
Given a sorted array of integers (may include negatives), return an array of squares sorted in non-decreasing order.

### Examples
```
Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]

Input: [-7,-3,2,3,11]
Output: [4,9,4,9,121] → sorted → [4,4,9,9,121]
```

### Pattern: Opposite Direction Two Pointer

### Why Two Pointer?
Naively squaring then sorting = O(n log n). But we can do O(n)!

The largest squares come from either the most negative (leftmost) or most positive (rightmost) value. We fill the result array from the back.

### Complete Solution
```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n);
        int left = 0, right = n - 1;
        int pos = n - 1;  // Fill from back

        while (left <= right) {
            int leftSq  = nums[left]  * nums[left];
            int rightSq = nums[right] * nums[right];

            if (leftSq > rightSq) {
                result[pos] = leftSq;
                left++;
            } else {
                result[pos] = rightSq;
                right--;
            }
            pos--;
        }

        return result;
    }
};
```

### Dry Run
```
[-4, -1, 0, 3, 10]
  L              R    result = [_, _, _, _, _]

leftSq=16, rightSq=100 → 100 > 16 → result[4]=100, right--
leftSq=16, rightSq=9   → 16 > 9  → result[3]=16, left++
leftSq=1,  rightSq=9   → 9 > 1   → result[2]=9, right--
leftSq=1,  rightSq=0   → 1 > 0   → result[1]=1, left++
leftSq=0,  rightSq=0   → tie     → result[0]=0

Result: [0, 1, 9, 16, 100] ✓
```

### Edge Cases
- ✅ All negative → largest square is leftmost
- ✅ All positive → same as squaring (no change in order)
- ✅ Mixed negative/positive

### Complexity: Time O(n), Space O(n) for result array

---

## Problem 7: Remove Element ⭐ NEW

**Source**: https://leetcode.com/problems/remove-element/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Remove all occurrences of `val` from array in-place. Return the new length.

### Examples
```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]

Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,3,0,4,_,_,_]
```

### Pattern: Same Direction Fast/Slow

### Complete Solution
```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int slow = 0;

        for (int fast = 0; fast < nums.size(); fast++) {
            if (nums[fast] != val) {       // Keep non-val elements
                nums[slow] = nums[fast];
                slow++;
            }
        }

        return slow;
    }
};
```

### Edge Cases
- ✅ val not present → all elements kept, return n
- ✅ All elements are val → return 0
- ✅ Empty array → return 0

### Complexity: Time O(n), Space O(1)

---

## Problem 8: Valid Palindrome II ⭐ NEW

**Source**: https://leetcode.com/problems/valid-palindrome-ii/  
**Difficulty**: 🟢 Easy (tricky!)  
**Company Tags**: 🏢 Facebook  
**Frequency**: 📅 High

### Problem Statement
Given a string, return true if the string can be a palindrome after deleting **at most one** character.

### Examples
```
Input: "aba"   → true (already palindrome)
Input: "abca"  → true (delete 'c' or 'b')
Input: "abc"   → false
```

### Pattern: Opposite Direction Two Pointer + Helper

### Complete Solution
```cpp
class Solution {
private:
    bool isPalin(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) return false;
            l++; r--;
        }
        return true;
    }

public:
    bool validPalindrome(string s) {
        int left = 0, right = s.size() - 1;

        while (left < right) {
            if (s[left] != s[right]) {
                // Try skipping left OR skipping right
                return isPalin(s, left + 1, right) ||
                       isPalin(s, left, right - 1);
            }
            left++; right--;
        }

        return true;
    }
};
```

### Key Insight
When characters don't match, we have exactly two choices: skip the left character or skip the right character. If either results in a valid palindrome, return true.

### Dry Run
```
s = "abca"
     L   R  → s[0]='a' == s[3]='a' ✓, left++, right--
      L R   → s[1]='b' != s[2]='c' ✗
             → Try isPalin("abca", 2, 2) = true ✓  (skip 'b')
             → return true
```

### Edge Cases
- ✅ Already a palindrome → no deletion needed
- ✅ One character delete makes palindrome
- ✅ No deletion can fix it → false

### Complexity: Time O(n), Space O(1)

---

## 🎯 Key Takeaways from Easy Problems

1. **Opposite Direction** → Pairs, palindromes, reverse, squares
2. **Same Direction** → Filtering, removing, compacting arrays in-place
3. **Always check edge cases** → Empty array, single element
4. **In-place means O(1) space** → No extra arrays (except output)
5. **Sorted arrays are hints** → Often two pointer opportunity
6. **Fill result from back** → Squares problem trick (largest first)
7. **Try both options when stuck** → Valid Palindrome II: skip left OR skip right

---

**Next**: Challenge yourself with Medium problems →

[← Back to Notes](Notes.md) | [Medium Problems →](Medium.md)
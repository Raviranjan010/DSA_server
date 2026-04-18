# 👉 Two Pointer Technique

## 🎯 When to Use

**Problem indicators:**
- "Find a pair..."
- "Two numbers that sum to..."
- Array is sorted (or can be sorted)
- You're thinking of O(n²) nested loops

**Common scenarios:**
- Finding pairs with target sum
- Checking palindromes
- Removing duplicates
- Merging sorted arrays
- Finding triplets (3Sum)

---

## 💡 The Core Idea

Instead of checking **every pair** (O(n²)), use **two pointers** moving toward each other (O(n)).

### Visual Representation

```
Naive Approach (O(n²)):
For each element, check all others
[2, 7, 11, 15]
 ↑ → → →
    ↑ → →
       ↑ →
          ↑

Two Pointer (O(n)):
Start at both ends, move inward
[2, 7, 11, 15]
 ↑           ↑
left       right

2 + 15 = 17 (too big, move right ←)
[2, 7, 11, 15]
 ↑        ↑
left    right

2 + 11 = 13 (too big, move right ←)
[2, 7, 11, 15]
 ↑   ↑
left right

2 + 7 = 9 ✓ FOUND!
```

---

## 📝 Standard Template

### Template 1: Converging Pointers (Sorted Array)

```cpp
int left = 0, right = arr.size() - 1;

while (left < right) {
    int sum = arr[left] + arr[right];
    
    if (sum == target) {
        return {left, right};  // Found!
    } else if (sum < target) {
        left++;   // Need larger sum
    } else {
        right--;  // Need smaller sum
    }
}

return {};  // Not found
```

**When to use:** Array is sorted, looking for pair

### Template 2: Fast and Slow Pointers

```cpp
int slow = 0, fast = 0;

while (fast < arr.size()) {
    if (condition(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
    fast++;
}

return slow;  // New length
```

**When to use:** Removing elements, finding cycles

### Template 3: Parallel Pointers (Two Arrays)

```cpp
int i = 0, j = 0;

while (i < arr1.size() && j < arr2.size()) {
    if (arr1[i] < arr2[j]) {
        // Process arr1[i]
        i++;
    } else {
        // Process arr2[j]
        j++;
    }
}
```

**When to use:** Merging, comparing two sorted arrays

---

## 🔥 Real Interview Problems

### Problem 1: Two Sum II (Sorted Array)

**Amazon, Google, Meta** - ★★★★★

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            return {left + 1, right + 1};  // 1-indexed
        } else if (sum < target) {
            left++;   // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    
    return {};
}
```

**Time:** O(n) | **Space:** O(1)

### Problem 2: Valid Palindrome

**Meta, Microsoft** - ★★★★

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    
    while (left < right) {
        // Skip non-alphanumeric
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        
        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}
```

**Time:** O(n) | **Space:** O(1)

### Problem 3: Remove Duplicates from Sorted Array

**Amazon** - ★★★★★

```cpp
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
```

**Time:** O(n) | **Space:** O(1)

### Problem 4: Container With Most Water

**Google, Meta** - ★★★★★

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        // Calculate water
        int h = min(height[left], height[right]);
        int w = right - left;
        maxWater = max(maxWater, h * w);
        
        // Move the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
```

**Time:** O(n) | **Space:** O(1)

---

## 🧠 Key Insights

### Insight 1: Why does two pointer work?

**For sorted arrays:**
- If sum is too small → move left pointer right (increase sum)
- If sum is too large → move right pointer left (decrease sum)
- We never miss the optimal pair!

**Proof by contradiction:**
If optimal pair is (i, j) and we skipped it, we must have moved a pointer past i or j. But we only move pointers when current sum can't be optimal, so we never skip the answer.

### Insight 2: When to move which pointer?

**Decision rule:**
- Move the pointer that gives you a **better chance** of reaching target
- For sum problems: move pointer with smaller/larger value
- For palindrome: move both inward
- For removing: fast pointer always moves, slow moves conditionally

### Insight 3: Common variations

**Variation 1: Skip duplicates**
```cpp
while (left < right && arr[left] == arr[left-1]) left++;
```

**Variation 2: Multiple pairs**
```cpp
// Don't return immediately, collect all
while (left < right) {
    if (sum == target) {
        result.push_back({left, right});
        left++;
        right--;
    }
}
```

**Variation 3: Three pointers (3Sum)**
```cpp
for (int i = 0; i < n; i++) {
    int left = i + 1, right = n - 1;
    // Standard two pointer
}
```

---

## ⚠️ Common Mistakes

### Mistake 1: Off-by-one errors

```cpp
// WRONG
while (left <= right)  // May process same element twice

// CORRECT
while (left < right)   // Stop when they meet
```

### Mistake 2: Not handling edge cases

```cpp
// WRONG
int left = 0, right = arr.size() - 1;  // Crashes if empty

// CORRECT
if (arr.empty()) return {};
int left = 0, right = arr.size() - 1;
```

### Mistake 3: Forgetting to move pointers

```cpp
// WRONG - Infinite loop!
while (left < right) {
    if (condition) {
        // Process but forget to move pointers
    }
}

// CORRECT
while (left < right) {
    if (condition) {
        left++;
        right--;
    }
}
```

---

## 🎤 Interview Talking Points

**What to say:**

> "Since the array is sorted, I can use the two-pointer technique. I'll start with one pointer at the beginning and one at the end. If the sum is too small, I'll move the left pointer right to increase it. If it's too large, I'll move the right pointer left. This gives O(n) time with O(1) space."

**If interviewer asks "Why not hash map?":**

> "Hash map would also work with O(n) time, but requires O(n) extra space. Two pointers give us O(1) space, which is better for memory-constrained scenarios. However, hash map works on unsorted arrays, while two pointers require sorting."

---

## 📊 Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Standard two pointer | O(n) | O(1) |
| With sorting | O(n log n) | O(1) or O(n)* |
| Three pointers (3Sum) | O(n²) | O(1) |

*Depends on sort implementation

---

## 🔄 Practice Problems

### Easy
- [Two Sum II](../problems/easy/two-sum-ii.md)
- [Valid Palindrome](../problems/easy/valid-palindrome.md)
- [Remove Duplicates](../problems/easy/remove-duplicates.md)

### Medium
- [3Sum](../problems/medium/3sum.md)
- [Container With Most Water](../problems/medium/container-with-most-water.md)
- [Sort Colors](../problems/medium/sort-colors.md)

### Hard
- [Trapping Rain Water](../problems/hard/trapping-rain-water.md)
- [Minimum Window Substring](../problems/hard/minimum-window-substring.md)

---

## 🎯 Quick Revision

**Template (memorize this):**
```cpp
int left = 0, right = arr.size() - 1;

while (left < right) {
    // Process
    if (condition) {
        left++;
        right--;
    } else if (need_smaller) {
        right--;
    } else {
        left++;
    }
}
```

**Remember:**
- Works on **sorted** arrays (or sort first)
- O(n) time, O(1) space
- Move pointers based on **comparison with target**
- Watch for **off-by-one** errors

---

**Next:** [Sliding Window Technique](sliding-window.md) →

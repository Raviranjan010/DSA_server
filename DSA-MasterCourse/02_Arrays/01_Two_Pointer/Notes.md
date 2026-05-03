# Two Pointer Technique — Complete Guide

> **What You'll Learn**: Opposite direction, same direction, Dutch National Flag, sliding window hybrid, and multi-pointer patterns  
> **Prerequisites**: Array Basics, Indexing  
> **Time Required**: 4-5 hours

---

## 1. 📌 Definition

The **Two Pointer** technique uses **two indices** to traverse an array simultaneously, reducing time complexity from O(n²) to O(n) by eliminating nested loops.

**When to use**: When you need to compare pairs, search from both ends, partition elements, or maintain a window.

---

## 2. 🌍 Real-World Analogy

### Analogy 1: Bookends 📚
Imagine holding a book from both sides:
- Left hand = left pointer
- Right hand = right pointer
- You squeeze inward to find something in the middle

### Analogy 2: Conveyor Belt 🏭
Two workers inspecting items on a belt:
- Worker 1 starts from the beginning
- Worker 2 starts from the end
- They meet in the middle

### Analogy 3: Fast & Slow Runner 🏃
Two runners on a circular track:
- Slow runner: 1 step at a time
- Fast runner: 2 steps at a time
- If there's a loop, they'll eventually meet!

---

## 3. 🎨 Visual Diagram

### Pattern 1: Opposite Direction (Converging)

```
Array: [1, 3, 5, 7, 9, 11, 13]
        L                  R     ← Start: left=0, right=6
           L            R        ← Move inward
              L      R           ← Continue
                 L,R             ← Meet! Stop

Used for: Sorted arrays, finding pairs, palindrome checks
```

### Pattern 2: Same Direction (Fast/Slow)

```
Array: [1, 2, 3, 4, 5, 6, 7, 8]
        S  F                     ← Start: slow=0, fast=0
           S     F               ← Fast moves ahead
              S        F         ← Fast ahead of slow
                 S           F   ← Gap increases

Used for: Cycle detection, remove duplicates, find middle
```

### Pattern 3: Dutch National Flag (Three Pointers)

```
Array: [2, 0, 1, 2, 0, 1]
        low                      ← 0s go here
            mid                  ← current scan
                          high   ← 2s go here

Region:  [0s | 1s | unknown | 2s]
              low  mid      high

Used for: 3-way partition, sort colors
```

### Pattern 4: Sliding Window (Two Pointers as Window Boundary)

```
Array: [1, 3, -1, -3, 5, 3, 6, 7]  Window size = 3
        [L        R]                 ← Window expands right
           [L        R]              ← Window slides
              [L        R]           ← Continues...

Used for: Subarray problems, min/max in window
```

---

## 4. 🔑 Pattern Recognition Keywords

| Keyword in Problem | Likely Pattern |
|---|---|
| "sorted array" + "pair/sum" | Opposite Direction |
| "palindrome" | Opposite Direction |
| "reverse in-place" | Opposite Direction |
| "remove duplicates" | Same Direction (Fast/Slow) |
| "move zeroes" / "filter in-place" | Same Direction |
| "cycle detection" | Same Direction (Floyd's) |
| "find middle" | Same Direction (Fast 2x, Slow 1x) |
| "sort 0s 1s 2s" / "partition 3 groups" | Dutch National Flag |
| "minimum subarray" / "maximum window" | Sliding Window |
| "triplet sum" / "3Sum" | Sorting + Two Pointer |
| "container with most water" | Opposite Direction |

---

## 5. 📋 Template Code

### Template 1: Opposite Direction

```cpp
#include <iostream>
#include <vector>
using namespace std;

void twoPointerOpposite(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left < right) {
        int sum = arr[left] + arr[right];

        if (sum == target) {
            // Found! Process result
            left++;
            right--;
        } else if (sum < target) {
            left++;   // Need larger sum → move left right
        } else {
            right--;  // Need smaller sum → move right left
        }
    }
}
```

### Template 2: Same Direction (Fast/Slow)

```cpp
void twoPointerSameDirection(vector<int>& arr) {
    int slow = 0;

    for (int fast = 0; fast < arr.size(); fast++) {
        if (/* condition to keep arr[fast] */) {
            arr[slow] = arr[fast];
            slow++;
        }
        // fast always advances; slow only when condition met
    }
    // slow = new effective length
}
```

### Template 3: Dutch National Flag

```cpp
void dutchFlag(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;

    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else { // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;
            // NOTE: do NOT increment mid here!
        }
    }
}
```

### Template 4: Sliding Window (Variable Size)

```cpp
void slidingWindow(vector<int>& arr, int target) {
    int left = 0;
    int windowSum = 0;
    int result = INT_MAX;

    for (int right = 0; right < arr.size(); right++) {
        windowSum += arr[right];  // Expand window

        while (windowSum >= target) {  // Shrink window
            result = min(result, right - left + 1);
            windowSum -= arr[left];
            left++;
        }
    }
}
```

### Template 5: Floyd's Cycle Detection (Linked List)

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) return true;  // Cycle found
    }

    return false;  // No cycle
}
```

---

## 6. 🔍 Step-by-Step Examples

### Example 1: Two Sum II (Sorted Array)

```cpp
vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) return {left + 1, right + 1};
        else if (sum < target) left++;
        else right--;
    }

    return {};
}

// Dry Run: [2, 7, 11, 15], target = 9
// Step 1: 2+15=17 > 9 → right--
// Step 2: 2+11=13 > 9 → right--
// Step 3: 2+7=9 == 9 → return {1, 2} ✓
```

### Example 2: Container With Most Water

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;

    while (left < right) {
        int h = min(height[left], height[right]);
        int w = right - left;
        maxWater = max(maxWater, h * w);

        // Move the shorter wall — moving the taller one can never help
        if (height[left] < height[right]) left++;
        else right--;
    }

    return maxWater;
}

// Key Insight: Water = min(height[L], height[R]) × (R - L)
// Moving the shorter pointer might find a taller one
// Moving the taller pointer only reduces width, never helps
```

---

## 7. ⚠️ Common Mistakes (Quick Reference)

| # | Mistake | Fix |
|---|---------|-----|
| 1 | `left=1` or `right=size` | Always `left=0`, `right=size-1` |
| 2 | Wrong loop condition | Pairs → `left < right`; search → `left <= right` |
| 3 | Forgetting to move pointers | Every branch must advance at least one pointer |
| 4 | Not sorting when required | Sort first if order doesn't matter |
| 5 | Missing duplicate skip | Add inner while loops to skip same values |
| 6 | Integer overflow on sum | Cast to `long long` before adding |
| 7 | Dutch Flag: not moving mid after swap with low | `low++; mid++;` always together |
| 8 | Dutch Flag: moving mid after swap with high | DON'T do `mid++` after `swap(mid, high)` |

See `Mistakes.md` for detailed explanations →

---

## 8. ⏱️ Time & Space Complexity

| Pattern | Time | Space | Reasoning |
|---------|------|-------|-----------|
| Opposite Direction | **O(n)** | **O(1)** | Each element visited at most once |
| Same Direction | **O(n)** | **O(1)** | Single pass, slow ≤ fast always |
| Dutch National Flag | **O(n)** | **O(1)** | Each element processed exactly once |
| Sliding Window | **O(n)** | **O(1)** | Each element enters/exits window once |
| With Sorting | **O(n log n)** | **O(1)** | Sorting dominates |
| Brute Force (baseline) | O(n²) | O(1) | All pairs checked |

> **Why O(n) and not O(n/2)?** Constants are dropped in Big-O. n/2 = O(n) mathematically.

---

## 9. 📝 All Pattern Variations

### Variation 1: Opposite Direction

**Classic problems**: Two Sum II, Valid Palindrome, Container With Most Water, Reverse String.

```cpp
// Generic template
int left = 0, right = n - 1;
while (left < right) {
    if (condition_satisfied) { /* process */ left++; right--; }
    else if (need_more)  left++;
    else                 right--;
}
```

### Variation 2: Same Direction (Filter/Compact)

**Classic problems**: Remove Duplicates, Move Zeroes, Remove Element.

```cpp
// Slow tracks "write position", fast scans array
int slow = 0;
for (int fast = 0; fast < n; fast++) {
    if (should_keep(arr[fast])) arr[slow++] = arr[fast];
}
// arr[0..slow-1] is the result
```

### Variation 3: Fast 2×, Slow 1× (Cycle / Middle)

**Classic problems**: Linked List Cycle, Find Middle of List, Happy Number.

```cpp
// Floyd's tortoise & hare
slow = slow->next;
fast = fast->next->next;
// Meet → cycle exists; fast reaches null → no cycle
```

### Variation 4: Dutch National Flag

**Classic problems**: Sort Colors, 3-way partition, QuickSort pivot.

```cpp
// Maintain: [0s | 1s | unknown | 2s]
//            0..low-1  low..mid-1  mid..high  high+1..n-1
```

### Variation 5: Sliding Window (Fixed Size)

**Classic problems**: Max Sum Subarray of Size K, Average of Subarrays.

```cpp
// Fixed window of size k
int windowSum = 0;
for (int i = 0; i < k; i++) windowSum += arr[i];
int maxSum = windowSum;

for (int i = k; i < n; i++) {
    windowSum += arr[i] - arr[i - k];   // slide: add new, remove old
    maxSum = max(maxSum, windowSum);
}
```

### Variation 6: Sliding Window (Variable Size)

**Classic problems**: Minimum Size Subarray Sum, Longest Substring Without Repeating Chars.

```cpp
int left = 0, windowSum = 0, result = INT_MAX;
for (int right = 0; right < n; right++) {
    windowSum += arr[right];
    while (windowSum >= target) {
        result = min(result, right - left + 1);
        windowSum -= arr[left++];
    }
}
```

### Variation 7: Multi-Pointer (k-Sum Extensions)

**Classic problems**: 3Sum, 3Sum Closest, 4Sum.

```cpp
// 3Sum = fix one element + two-pointer on rest
sort(nums.begin(), nums.end());
for (int i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] == nums[i-1]) continue; // skip dup
    int left = i + 1, right = n - 1;
    while (left < right) { /* two-pointer logic */ }
}
```

---

## 10. 🧩 When Two Pointer vs Other Techniques

| Situation | Use |
|-----------|-----|
| Sorted array, find pair | **Two Pointer (Opposite)** |
| Unsorted, find pair | Hash Map O(n) or Sort + Two Pointer |
| Subarray sum/max | **Sliding Window** |
| Cycle in linked list | **Fast/Slow Pointer** |
| All combinations (not pairs) | Backtracking / nested loops |
| Order must be preserved | Hash Map (can't sort) |
| k closest / k largest | Heap |

---

## 11. 💡 Pro Tips

1. **Sort first** — Many two-pointer problems require sorted input
2. **Draw it out** — Visualize pointer movement on paper
3. **Check boundaries** — Ensure pointers don't go out of bounds
4. **Handle duplicates** — Skip them if problem requires unique results
5. **Think about movement** — When to move left vs right?
6. **Identify invariants** — What is always true at start of each iteration?
7. **Test with 2 elements** — Smallest non-trivial case catches most bugs
8. **Empty array check first** — Prevents null-pointer / out-of-bounds

---

## 12. 🎯 When to Use Two Pointer

✅ **Use when**:
- Array is sorted (or can be sorted)
- Looking for pairs/triplets with sum condition
- Need to compare elements from both ends
- Partitioning elements in-place
- Removing/filtering duplicates in-place
- Finding cycle or middle in linked list

❌ **Don't use when**:
- Array is unsorted and can't be sorted (use hash map)
- Need ALL combinations, not just one pair
- Elements must maintain original relative order (use hash map)
- Need to find k-th element (use heap or quickselect)

---

## 13. 📚 Practice Problems

### Easy (Master basics — start here)
| # | Problem | LeetCode | Pattern |
|---|---------|----------|---------|
| 1 | Valid Palindrome | 125 | Opposite |
| 2 | Reverse String | 344 | Opposite |
| 3 | Remove Duplicates from Sorted Array | 26 | Same Dir |
| 4 | Two Sum II | 167 | Opposite |
| 5 | Squares of Sorted Array | 977 | Opposite |
| 6 | Move Zeroes | 283 | Same Dir |
| 7 | Remove Element | 27 | Same Dir |

### Medium (Core interview level)
| # | Problem | LeetCode | Pattern |
|---|---------|----------|---------|
| 1 | Container With Most Water | 11 | Opposite |
| 2 | 3Sum | 15 | Sort + Opposite |
| 3 | 3Sum Closest | 16 | Sort + Opposite |
| 4 | Trapping Rain Water | 42 | Opposite |
| 5 | Remove Nth Node From End | 19 | Fast/Slow |
| 6 | Sort Colors | 75 | Dutch Flag |
| 7 | Minimum Size Subarray Sum | 209 | Sliding Window |
| 8 | Longest Substring Without Repeating | 3 | Sliding Window |
| 9 | Fruit Into Baskets | 904 | Sliding Window |

### Hard (Advanced / FAANG)
| # | Problem | LeetCode | Pattern |
|---|---------|----------|---------|
| 1 | Minimum Window Substring | 76 | Sliding Window + Map |
| 2 | Sliding Window Maximum | 239 | Monotonic Deque |
| 3 | Median of Two Sorted Arrays | 4 | Binary Search |
| 4 | Trapping Rain Water (Hard variant) | 407 (3D) | BFS |
| 5 | 4Sum | 18 | Sort + Two Pointer |
| 6 | Longest Consecutive Sequence | 128 | Hash Set |

---

## 14. 🎯 Key Takeaways

1. Two pointers reduce O(n²) to O(n) by avoiding redundant comparisons
2. **Opposite direction**: Start from both ends, converge inward — for sorted pairs
3. **Same direction**: Fast scans, slow tracks valid position — for filtering
4. **Fast 2×/Slow 1×**: Floyd's algorithm — for cycle detection and middle finding
5. **Dutch flag**: Three pointers for 3-way partition
6. **Sliding window**: Treats left/right pointers as a moving window boundary
7. Always **move pointers** to avoid infinite loops
8. Always **sort first** unless order matters
9. Watch for **off-by-one errors** in loop conditions (`<` vs `<=`)
10. Handle **duplicates** explicitly with inner skip loops

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Patterns →](Patterns.md) | [Easy Problems →](Easy.md)
# Two Pointer — Pattern Catalog

> **Complete reference for all two-pointer variations with templates, decision flowchart, and cross-pattern combos**

---

## 📋 Pattern Variations

---

### Variation 1: Opposite Direction (Converging Pointers)

**When to use**:
- Array is sorted (or can be sorted)
- Looking for pairs that satisfy a sum condition
- Palindrome checks
- Partitioning/reversal problems
- "Container with most water" style area problems

**Template**:
```cpp
int left = 0, right = arr.size() - 1;

while (left < right) {
    // Process arr[left] and arr[right]

    if (condition_met) {
        // Record result
        left++; right--;
    } else if (need_larger) {
        left++;
    } else {
        right--;
    }
}
```

**Example Problems**:
1. Two Sum II (LeetCode 167)
2. Container With Most Water (LeetCode 11)
3. Valid Palindrome (LeetCode 125)
4. 3Sum (LeetCode 15)
5. Reverse String (LeetCode 344)
6. Trapping Rain Water (LeetCode 42)
7. Squares of a Sorted Array (LeetCode 977)

**Complexity**: O(n) time, O(1) space

---

### Variation 2: Same Direction — Filter/Compact (Fast/Slow)

**When to use**:
- Remove duplicates in-place
- Overwrite array based on condition
- Compact array (keep only elements satisfying condition)
- Move elements to front/back

**Template**:
```cpp
int slow = 0;

for (int fast = 0; fast < arr.size(); fast++) {
    if (should_keep(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
}

return slow;  // New effective size
```

**Key Insight**: `slow` is always ≤ `fast`. `slow` is the "write head", `fast` is the "read head".

**Example Problems**:
1. Remove Duplicates from Sorted Array (LeetCode 26)
2. Move Zeroes (LeetCode 283)
3. Remove Element (LeetCode 27)
4. Remove Duplicates II — allow at most 2 (LeetCode 80)

**Complexity**: O(n) time, O(1) space

---

### Variation 3: Same Direction — Floyd's Cycle / Middle Detection

**When to use**:
- Detect cycle in linked list
- Find start of cycle
- Find middle node
- Happy Number problem

**Template — Cycle Detection**:
```cpp
ListNode* slow = head;
ListNode* fast = head;

while (fast != nullptr && fast->next != nullptr) {
    slow = slow->next;
    fast = fast->next->next;

    if (slow == fast) return true;  // Cycle detected
}

return false;  // No cycle
```

**Template — Find Middle**:
```cpp
ListNode* slow = head;
ListNode* fast = head;

while (fast != nullptr && fast->next != nullptr) {
    slow = slow->next;
    fast = fast->next->next;
}

return slow;  // slow is at middle
```

**Template — Find Cycle Start**:
```cpp
// Step 1: Detect cycle
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) break;
}

// Step 2: Find entry point
slow = head;
while (slow != fast) {
    slow = slow->next;
    fast = fast->next;
}

return slow;  // Cycle start
```

**Example Problems**:
1. Linked List Cycle (LeetCode 141)
2. Linked List Cycle II — find start (LeetCode 142)
3. Middle of the Linked List (LeetCode 876)
4. Happy Number (LeetCode 202)
5. Find the Duplicate Number (LeetCode 287)

**Complexity**: O(n) time, O(1) space

---

### Variation 4: Dutch National Flag (3-Way Partition)

**When to use**:
- Partition array into exactly 3 groups
- Sort 0s, 1s, and 2s
- QuickSort 3-way partition step

**Template**:
```cpp
int low = 0, mid = 0, high = n - 1;

while (mid <= high) {
    if (arr[mid] == 0) {
        swap(arr[low], arr[mid]);
        low++;
        mid++;          // ← MUST increment both
    } else if (arr[mid] == 1) {
        mid++;          // Already in place
    } else {            // arr[mid] == 2
        swap(arr[mid], arr[high]);
        high--;         // ← Do NOT increment mid! Value unknown after swap
    }
}
```

**Why not increment mid after swap with high?**
After swapping with `high`, the new `arr[mid]` came from the unprocessed zone and is unknown — it could be 0, 1, or 2. We must inspect it again.

**Example Problems**:
1. Sort Colors (LeetCode 75)
2. Partition Array Into Three Parts (LeetCode 1051)
3. QuickSort implementation

**Complexity**: O(n) time, O(1) space

---

### Variation 5: Sliding Window — Fixed Size

**When to use**:
- Max/min sum of subarray of size k
- Average of all windows of size k
- Count distinct elements in every window of size k

**Template**:
```cpp
int windowSum = 0;

// Initialize first window
for (int i = 0; i < k; i++) windowSum += arr[i];
int result = windowSum;

// Slide the window
for (int i = k; i < n; i++) {
    windowSum += arr[i];       // Add new element entering window
    windowSum -= arr[i - k];  // Remove element leaving window
    result = max(result, windowSum);
}
```

**Example Problems**:
1. Maximum Average Subarray I (LeetCode 643)
2. Maximum Sum of k Consecutive Elements
3. Count Occurrences of Anagram (with hash map)

**Complexity**: O(n) time, O(1) space

---

### Variation 6: Sliding Window — Variable Size

**When to use**:
- Minimum/maximum length subarray satisfying a condition
- Longest substring without repeating characters
- Smallest window containing all target characters

**Template — Shrink when condition met**:
```cpp
int left = 0, windowState = 0;
int result = INT_MAX;  // or 0 for "longest"

for (int right = 0; right < n; right++) {
    // Expand: add arr[right] to window state
    windowState += arr[right];

    while (window_satisfies_condition) {
        // Shrink from left
        result = min(result, right - left + 1);
        windowState -= arr[left];
        left++;
    }
}
```

**Template — Shrink when condition violated**:
```cpp
int left = 0;
unordered_map<char, int> freq;
int result = 0;

for (int right = 0; right < n; right++) {
    freq[s[right]]++;

    while (freq.size() > k) {   // Condition violated
        freq[s[left]]--;
        if (freq[s[left]] == 0) freq.erase(s[left]);
        left++;
    }

    result = max(result, right - left + 1);
}
```

**Example Problems**:
1. Minimum Size Subarray Sum (LeetCode 209)
2. Longest Substring Without Repeating Characters (LeetCode 3)
3. Longest Substring with At Most K Distinct Characters (LeetCode 340)
4. Minimum Window Substring (LeetCode 76)
5. Fruit Into Baskets (LeetCode 904)

**Complexity**: O(n) time, O(1) or O(k) space

---

## 🔀 Cross-Pattern Combinations

### Two Pointer + Sorting
- **Use case**: 3Sum, 4Sum — fix outer elements, two-pointer on the rest
- **Strategy**: Sort → outer loop → two pointer for inner pair
- **Example**: 3Sum = O(n²), 4Sum = O(n³)

```cpp
sort(nums.begin(), nums.end());
for (int i = 0; i < n - 2; i++) {
    int left = i + 1, right = n - 1;
    while (left < right) { /* two-pointer */ }
}
```

### Two Pointer + Hash Map
- **Use case**: Sliding window with character/element frequency tracking
- **Strategy**: Expand right, shrink left when constraint violated
- **Example**: Minimum Window Substring (LeetCode 76)

### Two Pointer + Binary Search
- **Use case**: Find pair with sum closest to target
- **Strategy**: Fix one element, binary search for the other
- **Example**: Two Sum III (LeetCode 170)

### Two Pointer + Prefix Sum
- **Use case**: Count subarrays with sum in a range
- **Strategy**: Convert to prefix sums, then two-pointer or binary search
- **Example**: Count of Range Sum (LeetCode 327)

### Two Pointer + Monotonic Deque
- **Use case**: Sliding window maximum/minimum
- **Strategy**: Deque maintains max/min candidates as window slides
- **Example**: Sliding Window Maximum (LeetCode 239)

---

## 🎯 Decision Flowchart

```
Start: Array problem
│
├─ Are you looking for PAIRS or TRIPLETS with a sum condition?
│  ├─ YES → Is array sorted (or can be sorted)?
│  │  ├─ YES → Opposite Direction Two Pointer  [Two Sum II, 3Sum]
│  │  └─ NO  → Hash Map (if can't sort)
│  │
│  └─ NO → Continue ↓
│
├─ Do you need to FILTER, REMOVE, or COMPACT array IN-PLACE?
│  ├─ YES → Same Direction Fast/Slow  [Remove Dups, Move Zeroes]
│  └─ NO  → Continue ↓
│
├─ LINKED LIST with CYCLE or MIDDLE detection?
│  ├─ YES → Floyd's Fast(2x)/Slow(1x)  [Cycle, Middle]
│  └─ NO  → Continue ↓
│
├─ PARTITION into exactly 3 groups?
│  ├─ YES → Dutch National Flag  [Sort Colors]
│  └─ NO  → Continue ↓
│
├─ SUBARRAY problem (sum, max, min, distinct elements)?
│  ├─ Fixed size window → Sliding Window Fixed
│  └─ Variable size window → Sliding Window Variable
│
└─ PALINDROME or REVERSE?
   └─ Opposite Direction Two Pointer
```

---

## 💡 Pattern Recognition Keywords

| Pattern | Keywords |
|---------|----------|
| Opposite Direction | "sorted array", "pair sum", "two numbers", "palindrome", "reverse", "container water" |
| Same Direction Filter | "remove duplicates", "in-place", "move zeroes", "filter elements", "compact" |
| Floyd's Fast/Slow | "cycle", "detect loop", "middle of list", "happy number" |
| Dutch National Flag | "sort colors", "0 1 2", "3-way partition", "Dutch flag" |
| Sliding Window Fixed | "subarray of size k", "window of k elements", "consecutive k" |
| Sliding Window Variable | "minimum length", "longest substring", "at most k distinct", "smallest window" |

---

## 📊 Comparison Table

| Variation | Pointers | Movement | Best For | Time | Space |
|-----------|----------|----------|----------|------|-------|
| **Opposite Direction** | left, right | Converge inward | Sorted pairs, palindromes, reverse | O(n) | O(1) |
| **Same Direction Filter** | slow, fast | Both rightward | Filtering, removing duplicates | O(n) | O(1) |
| **Floyd's Fast/Slow** | slow(1x), fast(2x) | Both rightward, diff speed | Cycle, middle, duplicate | O(n) | O(1) |
| **Dutch Flag** | low, mid, high | Complex | 3-way partition | O(n) | O(1) |
| **Sliding Window Fixed** | left, right | Right advances, left = right-k | Fixed-size window stats | O(n) | O(1) |
| **Sliding Window Variable** | left, right | Right expands, left shrinks | Variable window, min/max length | O(n) | O(k) |

---

## ⚡ Quick Reference Cards

### Card 1: Two Sum (Sorted)
```cpp
int left = 0, right = n - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target)      return {left, right};
    else if (sum < target)  left++;
    else                    right--;
}
```

### Card 2: Remove Duplicates
```cpp
int slow = 0;
for (int fast = 1; fast < n; fast++) {
    if (arr[fast] != arr[slow]) {
        arr[++slow] = arr[fast];
    }
}
return slow + 1;
```

### Card 3: Sort Colors (Dutch Flag)
```cpp
int l = 0, m = 0, h = n - 1;
while (m <= h) {
    if      (nums[m] == 0) swap(nums[l++], nums[m++]);
    else if (nums[m] == 1) m++;
    else                   swap(nums[m], nums[h--]);
}
```

### Card 4: Sliding Window Fixed
```cpp
int windowSum = 0;
for (int i = 0; i < k; i++) windowSum += arr[i];
int maxSum = windowSum;
for (int i = k; i < n; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = max(maxSum, windowSum);
}
```

### Card 5: Sliding Window Variable (Min Length)
```cpp
int left = 0, sum = 0, res = INT_MAX;
for (int right = 0; right < n; right++) {
    sum += nums[right];
    while (sum >= target) {
        res = min(res, right - left + 1);
        sum -= nums[left++];
    }
}
```

### Card 6: Floyd's Cycle Detection
```cpp
auto slow = head, fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true;
}
return false;
```

### Card 7: 3Sum Template
```cpp
sort(nums.begin(), nums.end());
for (int i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] == nums[i-1]) continue;
    int left = i + 1, right = n - 1;
    while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if      (sum == 0) { /* record */ left++; right--; }
        else if (sum < 0)  left++;
        else               right--;
    }
}
```

---

## 🔑 Key Insights

1. **Opposite Direction**: Eliminates at least one element per iteration
2. **Same Direction Filter**: `slow ≤ fast` always; slow tracks valid write position
3. **Floyd's**: If cycle exists, fast and slow WILL meet (mathematical guarantee)
4. **Dutch Flag**: Three invariant regions — [0s | 1s | unknown | 2s]
5. **Sliding Window**: Elements enter window from right, exit from left — each element enters and exits exactly once → O(n)
6. **Always sort first** if problem doesn't guarantee sorted input (unless order must be preserved)
7. **Watch boundaries**: `left < right` vs `left <= right` vs `mid <= high`
8. **Skip duplicates explicitly** when problem requires unique results

---

**Next**: Review common mistakes in `Mistakes.md` →

[← Back to Notes](Notes.md) | [Mistakes →](Mistakes.md) | [Easy →](Easy.md)
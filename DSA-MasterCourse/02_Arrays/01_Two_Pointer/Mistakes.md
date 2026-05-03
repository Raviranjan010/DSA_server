# Two Pointer — Common Mistakes

> **Top 12 mistakes and exactly how to fix them**

---

## ❌ Mistake 1: Wrong Pointer Initialization

### The Error
```cpp
int left = 1;              // WRONG: Skips first element
int right = arr.size();    // WRONG: Out of bounds!
```

### ✅ The Fix
```cpp
int left = 0;
int right = arr.size() - 1;
```

### 🔍 How to Debug
Print initial values: `cout << "left=" << left << " right=" << right << endl;`

### 🚨 When This Occurs
Rushing into coding; confused by 1-based problem descriptions (return 1-indexed ≠ use 1-indexed internally).

---

## ❌ Mistake 2: Wrong Loop Condition

### The Error
```cpp
while (left <= right) {  // May process same element twice in pair problems
    // ...
}
```

### ✅ The Fix
```cpp
// For finding pairs (two distinct elements):
while (left < right) { }

// For binary search (need to check single element):
while (left <= right) { }

// For Dutch National Flag:
while (mid <= high) { }   // mid must reach high
```

### 💡 Rule of Thumb
- **Pair problems**: `left < right` — stop before they cross
- **Search problems**: `left <= right` — check single remaining element
- **Dutch Flag**: `mid <= high` — process until mid crosses high

---

## ❌ Mistake 3: Forgetting to Move Pointers → Infinite Loop

### The Error
```cpp
while (left < right) {
    if (arr[left] + arr[right] == target) {
        return {left, right};
    }
    // FORGOT to move pointers in else branches!
}
```

### ✅ The Fix
```cpp
while (left < right) {
    int sum = arr[left] + arr[right];
    if      (sum == target) return {left, right};
    else if (sum < target)  left++;    // ← MUST move
    else                    right--;   // ← MUST move
}
```

### 🔍 Debug Tip
Add a loop counter. If it exceeds `n × 2`, you have an infinite loop:
```cpp
int iterations = 0;
while (left < right) {
    if (++iterations > 2 * n) { cout << "INFINITE LOOP!" << endl; break; }
    // ...
}
```

---

## ❌ Mistake 4: Moving Both Pointers When Only One Should Move

### The Error
```cpp
// Collecting ALL valid pairs
if (arr[left] + arr[right] == target) {
    result.push_back({arr[left], arr[right]});
    left++;
    right--;
    // BUG: May skip valid pairs if there are multiple options
}
```

### ✅ The Fix
```cpp
if (arr[left] + arr[right] == target) {
    result.push_back({arr[left], arr[right]});
    left++;
    right--;
    // Only skip duplicates after recording
    while (left < right && arr[left] == arr[left-1])   left++;
    while (left < right && arr[right] == arr[right+1]) right--;
}
```

---

## ❌ Mistake 5: Not Handling Duplicates

### The Error
```cpp
// Find ALL unique pairs summing to target
while (left < right) {
    if (arr[left] + arr[right] == target) {
        result.push_back({arr[left], arr[right]});
        left++;
        right--;
        // BUG: arr might have [-1,-1,0,1,1,2] → duplicate [-1,2] recorded
    }
}
```

### ✅ The Fix
```cpp
while (left < right) {
    if (arr[left] + arr[right] == target) {
        result.push_back({arr[left], arr[right]});
        left++; right--;

        while (left < right && arr[left]  == arr[left-1])  left++;   // skip dup
        while (left < right && arr[right] == arr[right+1]) right--;  // skip dup
    } else if (arr[left] + arr[right] < target) {
        left++;
    } else {
        right--;
    }
}
```

---

## ❌ Mistake 6: Integer Overflow

### The Error
```cpp
// arr = [1000000000, 1000000000], target = 2000000000
int sum = arr[left] + arr[right];   // OVERFLOW! 2e9 > INT_MAX (2.1e9)
```

### ✅ The Fix
```cpp
long long sum = (long long)arr[left] + arr[right];
// OR
long long sum = 1LL * arr[left] + arr[right];
```

### 🚨 When to Always Use long long
- Any problem with large values (≥ 10^9)
- 4Sum type problems (sum of 4 elements)
- Products of array elements

---

## ❌ Mistake 7: Not Sorting When Required

### The Error
```cpp
vector<int> arr = {5, 2, 8, 1, 9};
int left = 0, right = 4;
// Two pointer opposite direction only works on sorted arrays!
// [5, 2, 8, 1, 9] → 5+9=14, but pair {1,9}=10 exists and is valid
```

### ✅ The Fix
```cpp
sort(arr.begin(), arr.end());
// Now arr = {1, 2, 5, 8, 9}
// Two pointer works correctly
```

### 💡 When NOT to Sort
- Problem requires maintaining original order (e.g., "find pair with indices i < j")
- Original indices matter → use hash map instead

---

## ❌ Mistake 8: Off-by-One in Fast/Slow Pattern

### The Error
```cpp
int slow = 0, fast = 0;
// Remove duplicates WRONG:
for (; fast < n; fast++) {
    nums[slow] = nums[fast];   // BUG: always copies everything!
    slow++;
}
```

### ✅ The Fix
```cpp
int slow = 0;
for (int fast = 1; fast < n; fast++) {  // fast starts at 1!
    if (nums[fast] != nums[slow]) {     // Condition controls slow movement
        slow++;
        nums[slow] = nums[fast];
    }
}
return slow + 1;
```

### 🔑 Key Insight
`slow` only advances when a meaningful condition is met. `fast` always advances.

---

## ❌ Mistake 9: Dutch Flag — Forgetting mid++ After Swap with low

### The Error
```cpp
if (nums[mid] == 0) {
    swap(nums[low], nums[mid]);
    low++;
    // FORGOT mid++ → infinite loop or wrong result!
}
```

### ✅ The Fix
```cpp
if (nums[mid] == 0) {
    swap(nums[low], nums[mid]);
    low++;
    mid++;    // ← MUST increment: element at mid is now 1 (was in [1s] region)
} else if (nums[mid] == 1) {
    mid++;    // Already in correct position
} else {      // nums[mid] == 2
    swap(nums[mid], nums[high]);
    high--;   // ← Do NOT increment mid: new nums[mid] is unknown, must re-check!
}
```

### 🔍 Why?
- After `swap(low, mid)`: what was at `low` (which was 1) is now at `mid`. It's already verified = 1. Safe to advance `mid`.
- After `swap(mid, high)`: what was at `high` is now at `mid`. It came from unprocessed region — could be 0, 1, or 2. Must re-examine.

---

## ❌ Mistake 10: Accessing Invalid Index After Duplicate Skip

### The Error
```cpp
// Skip duplicates WRONG:
while (arr[left] == arr[left+1]) left++;  // arr[left+1] could be out of bounds!
```

### ✅ The Fix
```cpp
// Always guard with boundary check:
while (left < right && arr[left] == arr[left+1])   left++;
while (left < right && arr[right] == arr[right-1]) right--;
```

---

## ❌ Mistake 11: Using Two Pointer on Unsorted Array When Hash Map is Better

### The Error
```cpp
// Find if any two elements sum to target (unsorted array)
sort(arr.begin(), arr.end());  // Destroys original indices!
int left = 0, right = n - 1;
// Problem: if you need original indices, they're lost after sorting
```

### ✅ The Fix
```cpp
// Use hash map to preserve original information
unordered_map<int, int> seen;  // value → index
for (int i = 0; i < n; i++) {
    int complement = target - arr[i];
    if (seen.count(complement)) {
        return {seen[complement], i};
    }
    seen[arr[i]] = i;
}
```

### 💡 Rule
- Need original indices? → Hash map
- Only need values? → Sort + Two Pointer

---

## ❌ Mistake 12: Sliding Window — Not Handling Empty/Invalid Result

### The Error
```cpp
int minLen = INT_MAX;
// ... sliding window code ...
return minLen;   // BUG: returns INT_MAX if no valid window found!
```

### ✅ The Fix
```cpp
int minLen = INT_MAX;
// ... sliding window code ...
return minLen == INT_MAX ? 0 : minLen;
```

---

## 🛠️ Debug Checklist

Before submitting any two-pointer solution:

- [ ] Pointers initialized to 0 and n-1 (not 1 and n)?
- [ ] Loop condition correct (`<` vs `<=` vs `mid <= high`)?
- [ ] Every branch moves at least one pointer?
- [ ] No out-of-bounds: checked `left < right` before accessing `arr[left+1]` or `arr[right-1]`?
- [ ] Array sorted if problem requires sorted input?
- [ ] Duplicates handled with inner skip loops?
- [ ] Overflow checked (long long for large sums)?
- [ ] Dutch Flag: `mid++` after swap with `low`, but NOT after swap with `high`?
- [ ] Sliding Window: returning 0 (not INT_MAX) when no valid window?
- [ ] Edge cases tested: empty array, single element, all same elements?

---

## 🎯 Interview Trap Questions

1. **"What if the array has duplicates?"**
   → Add inner while loops to skip duplicates after recording a result.

2. **"Can you solve without sorting?"**
   → Yes, use a hash map instead (trades O(1) space for O(n) space, but preserves order).

3. **"What if the array is circular?"**
   → Use modular arithmetic `(i + 1) % n` or "double the array" trick.

4. **"How do you find ALL pairs, not just one?"**
   → Don't return after the first match. Continue and collect all results. Handle duplicates.

5. **"What if elements can be negative?"**
   → Same two-pointer logic works after sorting. Overflow is more likely — use `long long`.

6. **"What's the space complexity?"**
   → Two-pointer is O(1) auxiliary space. Output array doesn't count toward space complexity.

7. **"Can you do better than O(n²) for 3Sum?"**
   → O(n log n) sorting + O(n²) two-pointer = O(n²) total. No known better solution.

---

## 💡 Pro Tips

1. **Always draw it out** — Visualize pointer positions at each step
2. **Test with smallest cases** — [1,2], [1], [], [1,1]
3. **Print pointers** — Add debug prints: `cout << "L=" << left << " R=" << right << endl;`
4. **Think about termination** — What makes the loop stop?
5. **Name your invariants** — "After each iteration, arr[0..slow-1] contains only valid elements"
6. **Slow = write head, Fast = read head** — Useful mental model for filter pattern

---

[← Back to Patterns](Patterns.md) | [Easy Problems →](Easy.md)
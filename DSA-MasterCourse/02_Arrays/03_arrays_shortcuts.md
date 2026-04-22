# ⚡ ARRAYS — Part 3: Shortcuts, Tricks & Cheat Sheet

> Mental shortcuts to recognize patterns in 30 seconds. Print this and stick it on your wall.

---

## 🎯 SECTION 1: The Pattern Recognition Bible

When you see these words in a problem, use these patterns IMMEDIATELY:

```
┌────────────────────────────────────────────────────────────────────────┐
│ KEYWORD/CONDITION              →  PATTERN TO USE                        │
├────────────────────────────────────────────────────────────────────────┤
│ "contiguous subarray"          →  Sliding Window or Kadane's            │
│ "substring of string"          →  Sliding Window                        │
│ "consecutive elements"         →  Sliding Window                        │
│ "window of size k"             →  Fixed Sliding Window                  │
│ "maximum/minimum sum subarray" →  Kadane's Algorithm                    │
│ "sorted array + find pair"     →  Two Pointers (converging)             │
│ "remove duplicates in-place"   →  Two Pointers (same direction)         │
│ "range sum queries"            →  Prefix Sum                            │
│ "range update, point query"    →  Difference Array                      │
│ "range update, range query"    →  Segment Tree / BIT                    │
│ "two numbers sum to target"    →  HashSet O(n) or Sort+TwoPtr O(nlogn) │
│ "three numbers sum to target"  →  Sort + Two Pointers O(n²)             │
│ "0s, 1s, 2s"                  →  Dutch National Flag                    │
│ "missing number in [1..n]"     →  XOR or Cyclic Sort or Sum formula     │
│ "find duplicate"               →  Cyclic Sort or Floyd's cycle          │
│ "rotated sorted array"         →  Binary Search variant                 │
│ "sorted array, find first/last"→  Binary Search (first/last occurrence) │
│ "majority element (>n/2)"      →  Boyer-Moore Voting Algorithm          │
│ "k-th largest/smallest"        →  QuickSelect or Heap                   │
│ "trapping water"               →  Two Pointers (leftMax, rightMax)      │
│ "matrix rotation"              →  Transpose + Reverse                   │
│ "spiral matrix"                →  Boundary simulation                   │
│ "subarray product/sum=k"       →  Prefix Sum + HashMap                  │
│ "max product subarray"         →  Track both max and min (negatives!)   │
│ "inversion count"              →  Modified Merge Sort                   │
│ "all numbers in range [1..n]"  →  Cyclic Sort                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧮 SECTION 2: The Formula Sheet

### Prefix Sum Formulas
```
Building (0-indexed prefix, size n+1):
  prefix[0] = 0
  prefix[i] = prefix[i-1] + arr[i-1]      ← for i from 1 to n

Query sum(L, R) [both inclusive, 0-indexed]:
  = prefix[R+1] - prefix[L]

Query sum(L, R) [1-indexed array]:
  = prefix[R] - prefix[L-1]

2D prefix:
  Build: pref[i][j] = mat[i][j] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]
  Query(r1,c1,r2,c2): pref[r2][c2] - pref[r1-1][c2] - pref[r2][c1-1] + pref[r1-1][c1-1]
```

### Missing Number Formula
```
Array has n numbers from 1 to n+1, one missing:
  missing = n*(n+1)/2 - actual_sum

Array has n numbers from 0 to n, one missing:
  missing = n*(n+1)/2 - actual_sum    (same formula works!)

XOR approach:
  result = 0
  XOR with 1 to n+1, then XOR with all array elements
  → all present numbers cancel → result = missing
```

### Rotation Formulas
```
Left rotate by k:   reverse(0,k-1) → reverse(k,n-1) → reverse(0,n-1)
Right rotate by k:  reverse(0,n-k-1) → reverse(n-k,n-1) → reverse(0,n-1)

After right rotating [a,b,c,d,e] by k=2: [d,e,a,b,c]
Circular index:  actual_index = (i + k) % n
```

### Kadane's Formula
```
current = max(arr[i], current + arr[i])
global  = max(global, current)

INITIALIZATION: current = global = arr[0]    (NOT 0! for negative arrays)

Max circular: max(kadane_normal, total_sum - kadane_minimum)
```

### Binary Search Formula
```
mid = left + (right - left) / 2         ← NEVER use (left+right)/2
                                           [overflow risk!]

Find first occurrence: when found, save result, go LEFT  (right = mid-1)
Find last occurrence:  when found, save result, go RIGHT (left = mid+1)
```

### Dutch National Flag
```
0 → swap(low, mid), low++, mid++
1 → mid++  (already correct)
2 → swap(mid, high), high--  [NO mid++ after swap with high!]
```

---

## 🏃 SECTION 3: One-Liners and STL Shortcuts

```cpp
// ── SORTING ────────────────────────────────────────────────
sort(v.begin(), v.end());                           // Ascending
sort(v.begin(), v.end(), greater<int>());           // Descending
sort(v.begin(), v.end(), [](int a, int b){          // Custom comparator
    return abs(a) < abs(b);                         // Sort by absolute value
});

// ── FINDING ────────────────────────────────────────────────
*max_element(v.begin(), v.end())                    // Maximum value
*min_element(v.begin(), v.end())                    // Minimum value
max_element(v.begin(), v.end()) - v.begin()         // Index of max
count(v.begin(), v.end(), x)                        // Count of x
find(v.begin(), v.end(), x) != v.end()              // Does x exist?

// ── BINARY SEARCH (sorted arrays) ──────────────────────────
binary_search(v.begin(), v.end(), x)                // true if x exists
lower_bound(v.begin(), v.end(), x)                  // Iterator to first >= x
upper_bound(v.begin(), v.end(), x)                  // Iterator to first > x
// Count occurrences in sorted array:
upper_bound(v.begin(),v.end(),x) - lower_bound(v.begin(),v.end(),x)

// ── ACCUMULATE / SUM ───────────────────────────────────────
#include <numeric>
accumulate(v.begin(), v.end(), 0LL)                 // Sum (0LL for long long!)
accumulate(v.begin(), v.end(), 1, multiplies<int>())// Product

// ── REVERSING & ROTATING ───────────────────────────────────
reverse(v.begin(), v.end())                         // Reverse entire vector
rotate(v.begin(), v.begin()+k, v.end())             // Left rotate by k

// ── UNIQUE (remove consecutive duplicates) ─────────────────
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());       // Remove ALL duplicates

// ── FILL ───────────────────────────────────────────────────
fill(v.begin(), v.end(), 0)                         // Set all to 0
fill(v.begin(), v.begin()+k, -1)                    // Set first k to -1

// ── COPY ───────────────────────────────────────────────────
vector<int> copy(v);                                // Deep copy
copy(v.begin(), v.end(), result.begin());           // Copy to another vector

// ── NEXT PERMUTATION ────────────────────────────────────────
next_permutation(v.begin(), v.end())               // Returns false when done
prev_permutation(v.begin(), v.end())

// ── SWAP ────────────────────────────────────────────────────
swap(v[i], v[j])                                    // Swap two elements

// ── USEFUL CONSTANTS ───────────────────────────────────────
INT_MAX     // 2147483647 (2^31 - 1, ~2.1 billion)
INT_MIN     // -2147483648 (-2^31)
LLONG_MAX   // Long long max (~9.2 × 10^18)
```

---

## 🧠 SECTION 4: Memory Tricks & Mnemonics

### How to Remember Kadane's
```
"Start fresh if dragged down"
current = max(arr[i], current + arr[i])
         ^           ^
         Fresh start  Extension

Imagine you're running and you can restart from any point.
If carrying your previous "debt" (negative sum) makes you slower,
just restart fresh from where you are!
```

### How to Remember Prefix Sum Formula
```
sum(L, R) = prefix[R+1] - prefix[L]

Visual: 
[===|=====|=======]
 0   L     R     n

prefix[R+1] = [0 to R] total sum
prefix[L]   = [0 to L-1] total sum (what we DON'T want)
Difference  = [L to R] exactly what we DO want

Memory trick: "R+1 minus L" — one more than right, minus left
```

### How to Remember Two Pointers Decision
```
Sorted array, checking arr[L] + arr[R] against target:

"Too small? Left must go right."    (left++)
"Too big? Right must go left."      (right--)

Or: "Small goes bigger, big goes smaller"
```

### How to Remember Dutch National Flag
```
Three sections: "0s | 1s | unknown | 2s"
                      ↑    ↑
                     low  mid  high ↑

Processing mid element:
0 → belongs with 0s → throw LEFT (swap with low), both advance
1 → already in middle → just advance mid
2 → belongs with 2s → throw RIGHT (swap with high), only high retreats
                                                      mid STAYS! (unchecked new element)
```

### How to Remember Binary Search Overflow Fix
```
WRONG: (left + right) / 2
       Imagine left=2B, right=2B → left+right = 4B → overflow!
       
RIGHT: left + (right - left) / 2
       right - left is always ≤ 2B (half the total range)
       Adding small offset to left is safe.
       
Memory: "Half the GAP, add to LEFT"
```

---

## ⚠️ SECTION 5: The 10 Most Common Mistakes (With Fixes)

### Mistake 1: Off-by-One in Loop
```cpp
// ❌ WRONG — accesses arr[n] which doesn't exist
for(int i = 0; i <= arr.size(); i++) { arr[i]; }

// ✅ CORRECT
for(int i = 0; i < arr.size(); i++) { arr[i]; }
// or
for(int i = 0; i <= (int)arr.size() - 1; i++) { arr[i]; }
```

### Mistake 2: Integer Overflow
```cpp
// ❌ WRONG — int can only hold ~2 billion
int sum = 0;
for(int i = 0; i < n; i++) sum += arr[i];  // Overflow if sum > INT_MAX!

// ✅ CORRECT
long long sum = 0;
for(int i = 0; i < n; i++) sum += arr[i];

// ❌ WRONG binary search
int mid = (left + right) / 2;

// ✅ CORRECT
int mid = left + (right - left) / 2;
```

### Mistake 3: Forgetting k % n in Rotation
```cpp
// ❌ WRONG — if k=7, n=5, rotating 7 steps same as 2 steps!
void rotate(vector<int>& arr, int k) { /* ... */ }

// ✅ CORRECT — ALWAYS do this first
void rotate(vector<int>& arr, int k) {
    k = k % arr.size();
    if(k == 0) return;   // No rotation needed
    // ...
}
```

### Mistake 4: Large Local Array (Stack Overflow)
```cpp
// ❌ WRONG — ~4MB on stack → crash!
void solve() {
    int arr[1000000];
}

// ✅ CORRECT — declare globally
int arr[1000000];
int main() { /* use arr */ }

// OR use vector (heap)
void solve() {
    vector<int> arr(1000000);  // Safe, heap allocation
}
```

### Mistake 5: Initializing Kadane's With 0 Instead of arr[0]
```cpp
// ❌ WRONG — fails on all-negative arrays
// Returns 0 instead of the correct (least negative) answer
int current = 0, global = 0;

// ✅ CORRECT — initialize with first element
int current = arr[0], global = arr[0];
```

### Mistake 6: Not Handling Empty Array
```cpp
// ❌ WRONG — crashes on empty vector
int findMax(vector<int>& arr) {
    int max = arr[0];  // Crash if arr is empty!
}

// ✅ CORRECT
int findMax(vector<int>& arr) {
    if(arr.empty()) return INT_MIN;
    int max = arr[0];
    // ...
}
```

### Mistake 7: Using Sliding Window on Negative Arrays
```cpp
// ❌ WRONG — variable sliding window DOESN'T work with negatives!
// Because adding left element doesn't always increase sum
// Example: arr=[1,-1,1], target=1
// Sliding window fails; use prefix sum + hashmap instead

// ✅ CORRECT for positive-only arrays
int left = 0, sum = 0;
for(int right = 0; right < n; right++) {
    sum += arr[right];
    while(sum > target) { sum -= arr[left++]; }
    // ...
}

// ✅ For any array (can have negatives): use prefix sum + hashmap
```

### Mistake 8: DNF — Incrementing mid After Swap with high
```cpp
// ❌ WRONG
case 2:
    swap(nums[mid], nums[high]);
    high--;
    mid++;  // ← DON'T DO THIS! New nums[mid] hasn't been checked!

// ✅ CORRECT
case 2:
    swap(nums[mid], nums[high]);
    high--;
    // mid stays: we need to re-examine nums[mid]
```

### Mistake 9: Unsigned size_t Comparison
```cpp
// ❌ WRONG — v.size() is unsigned! 0-1 = huge number, loop runs forever
for(int i = 0; i < v.size() - 1; i++) { ... }  // If v is empty: 0-1 wraps!

// ✅ CORRECT — cast to int
for(int i = 0; i < (int)v.size() - 1; i++) { ... }

// OR
int n = v.size();
for(int i = 0; i < n - 1; i++) { ... }
```

### Mistake 10: Forgetting to Handle Duplicate Skip in 3Sum
```cpp
// ❌ WRONG — gives duplicate triplets
for(int i = 0; i < n-2; i++) {
    // No duplicate check → [−1,−1,2] appears twice
    ...
}

// ✅ CORRECT
for(int i = 0; i < n-2; i++) {
    if(i > 0 && nums[i] == nums[i-1]) continue;  // Skip duplicate i
    ...
    while(left < right) {
        if(sum == 0) {
            result.push_back({nums[i], nums[left], nums[right]});
            while(left<right && nums[left]==nums[left+1]) left++;
            while(left<right && nums[right]==nums[right-1]) right--;
            left++; right--;
        }
    }
}
```

---

## 📋 SECTION 6: Ultra-Compact Templates for Coding Rounds

Copy-paste ready templates. Each is tested and correct.

```cpp
// ──────────────────────────────────────────────────────────
// 1. PREFIX SUM BUILD + QUERY
// ──────────────────────────────────────────────────────────
vector<long long> prefix(n + 1, 0);
for(int i = 0; i < n; i++) prefix[i+1] = prefix[i] + arr[i];
auto rangeSum = [&](int L, int R) { return prefix[R+1] - prefix[L]; };

// ──────────────────────────────────────────────────────────
// 2. FIXED SLIDING WINDOW (max sum of k elements)
// ──────────────────────────────────────────────────────────
int wsum = 0;
for(int i = 0; i < k; i++) wsum += arr[i];
int ans = wsum;
for(int i = k; i < n; i++) {
    wsum += arr[i] - arr[i-k];
    ans = max(ans, wsum);
}

// ──────────────────────────────────────────────────────────
// 3. VARIABLE SLIDING WINDOW (minimum len with sum >= target)
// ──────────────────────────────────────────────────────────
int left = 0, wsum = 0, ans = INT_MAX;
for(int right = 0; right < n; right++) {
    wsum += arr[right];
    while(wsum >= target) {
        ans = min(ans, right - left + 1);
        wsum -= arr[left++];
    }
}
ans = (ans == INT_MAX) ? 0 : ans;

// ──────────────────────────────────────────────────────────
// 4. KADANE'S ALGORITHM
// ──────────────────────────────────────────────────────────
int cur = arr[0], best = arr[0];
for(int i = 1; i < n; i++) {
    cur = max(arr[i], cur + arr[i]);
    best = max(best, cur);
}

// ──────────────────────────────────────────────────────────
// 5. TWO POINTERS (pair sum in sorted array)
// ──────────────────────────────────────────────────────────
int L = 0, R = n - 1;
while(L < R) {
    int s = arr[L] + arr[R];
    if(s == target) { /* found */ break; }
    else if(s < target) L++;
    else R--;
}

// ──────────────────────────────────────────────────────────
// 6. BINARY SEARCH (standard)
// ──────────────────────────────────────────────────────────
int lo = 0, hi = n - 1, ans = -1;
while(lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if(arr[mid] == target) { ans = mid; break; }
    else if(arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}

// ──────────────────────────────────────────────────────────
// 7. DUTCH NATIONAL FLAG
// ──────────────────────────────────────────────────────────
int lo = 0, mid = 0, hi = n - 1;
while(mid <= hi) {
    if(arr[mid] == 0) swap(arr[lo++], arr[mid++]);
    else if(arr[mid] == 1) mid++;
    else swap(arr[mid], arr[hi--]);
}

// ──────────────────────────────────────────────────────────
// 8. CYCLIC SORT
// ──────────────────────────────────────────────────────────
int i = 0;
while(i < n) {
    int j = arr[i] - 1;  // Correct index for arr[i]
    if(arr[i] != arr[j]) swap(arr[i], arr[j]);
    else i++;
}

// ──────────────────────────────────────────────────────────
// 9. REMOVE DUPLICATES (sorted, in-place)
// ──────────────────────────────────────────────────────────
int slow = 0;
for(int fast = 1; fast < n; fast++) {
    if(arr[fast] != arr[slow]) arr[++slow] = arr[fast];
}
// New length = slow + 1

// ──────────────────────────────────────────────────────────
// 10. ROTATE ARRAY (right by k)
// ──────────────────────────────────────────────────────────
k %= n;
reverse(arr.begin(), arr.end());
reverse(arr.begin(), arr.begin() + k);
reverse(arr.begin() + k, arr.end());

// ──────────────────────────────────────────────────────────
// 11. SUBARRAY SUM = K (with negatives, use hashmap)
// ──────────────────────────────────────────────────────────
unordered_map<int,int> freq; freq[0] = 1;
int psum = 0, count = 0;
for(int x : arr) {
    psum += x;
    count += freq[psum - k];
    freq[psum]++;
}

// ──────────────────────────────────────────────────────────
// 12. FAST I/O TEMPLATE (competitive programming)
// ──────────────────────────────────────────────────────────
ios_base::sync_with_stdio(false);
cin.tie(NULL);
int n; cin >> n;
vector<int> arr(n);
for(int& x : arr) cin >> x;

// ──────────────────────────────────────────────────────────
// 13. PRINT VECTOR (debugging)
// ──────────────────────────────────────────────────────────
for(int x : arr) cout << x << " "; cout << "\n";
// or one-liner:
copy(arr.begin(), arr.end(), ostream_iterator<int>(cout, " ")); cout << "\n";
```

---

## 🔢 SECTION 7: Complexity Quick Reference

```
┌────────────────────────────────┬──────────────┬──────────────┐
│ Algorithm                      │ Time         │ Space        │
├────────────────────────────────┼──────────────┼──────────────┤
│ Linear Search                  │ O(n)         │ O(1)         │
│ Binary Search                  │ O(log n)     │ O(1)         │
│ Build Prefix Sum               │ O(n)         │ O(n)         │
│ Prefix Sum Query               │ O(1)         │ O(1)         │
│ Fixed Sliding Window           │ O(n)         │ O(1)         │
│ Variable Sliding Window        │ O(n)         │ O(1)         │
│ Two Pointers (sorted)          │ O(n)         │ O(1)         │
│ Kadane's                       │ O(n)         │ O(1)         │
│ Dutch National Flag            │ O(n)         │ O(1)         │
│ Cyclic Sort                    │ O(n)         │ O(1)         │
│ Merge Sort                     │ O(n log n)   │ O(n)         │
│ Count Inversions (merge sort)  │ O(n log n)   │ O(n)         │
│ 3Sum                           │ O(n²)        │ O(1)         │
│ Trapping Rain Water            │ O(n)         │ O(1)         │
│ Subarray Sum = K               │ O(n)         │ O(n)         │
│ QuickSelect (k-th largest)     │ O(n) avg     │ O(log n)     │
│ Sliding Window Maximum (deque) │ O(n)         │ O(k)         │
│ Rotate Matrix 90°              │ O(n²)        │ O(1)         │
│ Spiral Traversal               │ O(m×n)       │ O(1)         │
│ Product Except Self            │ O(n)         │ O(1)         │
└────────────────────────────────┴──────────────┴──────────────┘
```

---

## 🎯 SECTION 8: Interview 30-Second Decision Tree

```
You get an array problem. Go through this tree:

1. Is the array SORTED?
   YES → Try Binary Search or Two Pointers
   NO  → Continue ↓

2. Are you looking at CONTIGUOUS SUBARRAYS/SUBSTRINGS?
   YES → Sliding Window (fixed if size given, variable if condition given)
       → UNLESS negatives present AND looking for sum=k → use Prefix+HashMap
   NO  → Continue ↓

3. Are you finding PAIRS or TRIPLETS that sum to something?
   UNSORTED → HashMap O(n)
   SORTED   → Two Pointers O(n)
   TRIPLETS → Sort + Two Pointers O(n²)

4. Are you finding MAX/MIN SUM of contiguous subarray?
   YES → Kadane's Algorithm O(n)

5. Are you doing RANGE QUERIES on a fixed array?
   YES → Prefix Sum (O(n) build, O(1) query)

6. Are you doing RANGE UPDATES then asking final values?
   YES → Difference Array (O(1) update, O(n) reconstruct)

7. Does array contain values in range [1..n]?
   YES → Cyclic Sort (find missing, duplicates, etc.)

8. Is it a 0,1,2 sorting problem?
   YES → Dutch National Flag

9. Are you finding a single/double non-duplicate?
   YES → XOR trick

10. Still stuck? → Try HashMap to track what you've seen.
```

---

*Next → `04_arrays_company_questions.md` — 60+ real questions with company tags*
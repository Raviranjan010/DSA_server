# 📗 ARRAYS — Part 2: All 8 Patterns (Ultra-Deep Explanations)

> Every pattern: WHY it works → WHEN to use → Template → Dry Run → Mistakes

---

## PATTERN 1: Prefix Sum

### 1.1 The Problem It Solves

You have an array. Someone asks you **many** range sum questions:
- "What's the sum from index 3 to 7?"
- "What's the sum from index 0 to 99?"
- "What's the sum from index 50 to 50?"

**Naive approach**: For each query, loop through the range → O(n) per query → O(n × Q) total.  
If n=10^5 and Q=10^5, that's 10^10 operations → **Too Slow!**

**Prefix Sum**: Build once in O(n), answer EACH query in O(1).

### 1.2 The Core Idea

```
Original array:  [3,  1,  4,  1,  5,  9,  2,  6]
Index:            0   1   2   3   4   5   6   7

Prefix array (0-indexed, size n+1, extra 0 at start):
prefix[0] = 0
prefix[1] = prefix[0] + arr[0] = 0 + 3 = 3
prefix[2] = prefix[1] + arr[1] = 3 + 1 = 4
prefix[3] = prefix[2] + arr[2] = 4 + 4 = 8
prefix[4] = prefix[3] + arr[3] = 8 + 1 = 9
prefix[5] = prefix[4] + arr[4] = 9 + 5 = 14
prefix[6] = prefix[5] + arr[5] = 14 + 9 = 23
prefix[7] = prefix[6] + arr[6] = 23 + 2 = 25
prefix[8] = prefix[7] + arr[7] = 25 + 6 = 31

prefix = [0, 3, 4, 8, 9, 14, 23, 25, 31]

prefix[i] = SUM of all elements from arr[0] to arr[i-1]

QUERY: sum from index L to R (inclusive)?
= prefix[R+1] - prefix[L]

Why? prefix[R+1] = sum of arr[0..R]
     prefix[L]   = sum of arr[0..L-1]
     Difference  = sum of arr[L..R] ✓

Example: sum(2, 5) = prefix[6] - prefix[2] = 23 - 4 = 19
Verify: arr[2]+arr[3]+arr[4]+arr[5] = 4+1+5+9 = 19 ✓

Example: sum(0, 7) = prefix[8] - prefix[0] = 31 - 0 = 31 ✓
Example: sum(4, 4) = prefix[5] - prefix[4] = 14 - 9 = 5 ✓ (just arr[4])
```

### 1.3 Complete Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

class PrefixSum {
    vector<long long> prefix;  // Use long long for safety!
    
public:
    // Constructor builds the prefix array — O(n)
    PrefixSum(vector<int>& arr) {
        int n = arr.size();
        prefix.resize(n + 1, 0);   // Size n+1, all zeros
        
        for(int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }
    }
    
    // Range sum query [L, R] inclusive, 0-indexed — O(1)
    long long query(int L, int R) {
        // Validate inputs
        if(L > R) return 0;
        return prefix[R + 1] - prefix[L];
    }
    
    // Count of elements in range with value equal to something
    // (For this, you'd use a different approach — this is just prefix sum)
};

int main() {
    vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
    PrefixSum ps(arr);
    
    cout << ps.query(2, 5) << endl;  // 19
    cout << ps.query(0, 7) << endl;  // 31
    cout << ps.query(4, 4) << endl;  // 5
    
    return 0;
}
```

### 1.4 Variant: Count Subarrays with Sum = K

This is a famous interview question (LeetCode 560).

```cpp
// Count subarrays with sum exactly equal to k
// Key insight: sum(i..j) = k  ↔  prefix[j+1] - prefix[i] = k
//                               ↔  prefix[i] = prefix[j+1] - k
// So: at each position, check how many PREVIOUS prefixes equal (currentPrefix - k)

int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;   // Empty prefix (sum=0) exists once
    
    int currentPrefix = 0;
    int count = 0;
    
    for(int i = 0; i < nums.size(); i++) {
        currentPrefix += nums[i];
        
        // How many previous prefixes have value (currentPrefix - k)?
        // Each such prefix creates a valid subarray ending at i
        int needed = currentPrefix - k;
        if(prefixCount.count(needed)) {
            count += prefixCount[needed];
        }
        
        prefixCount[currentPrefix]++;
    }
    
    return count;
}

// Dry Run: nums=[1,1,1], k=2
//
// prefixCount = {0:1}
//
// i=0: currentPrefix=1, needed=1-2=-1, -1 not in map. prefixCount={0:1,1:1}
// i=1: currentPrefix=2, needed=2-2=0, 0 in map (count=1), count=1. prefixCount={0:1,1:1,2:1}
// i=2: currentPrefix=3, needed=3-2=1, 1 in map (count=1), count=2. prefixCount={0:1,1:1,2:1,3:1}
//
// Answer: 2 ✓ (subarrays [1,1] at indices [0,1] and [1,2])

// ⚠️ WHY NOT SLIDING WINDOW? Arrays can have NEGATIVES!
// Sliding window only works when all values are positive.
```

### 1.5 Difference Array — Range Updates

The REVERSE of prefix sum: apply many range updates cheaply, query once.

```cpp
// Problem: Add v to all elements from index L to R.
// Do this for Q queries, then output final array.
// Naive: O(n) per query → O(n*Q) total
// Difference array: O(1) per query, O(n) to reconstruct → O(n+Q) total

vector<int> arr = {0, 0, 0, 0, 0};  // n=5
vector<int> diff(6, 0);              // diff array, size n+1

// ── Range Update: add v to arr[L..R] ─────────────────────
// Only touch TWO positions in diff!
auto rangeAdd = [&](int L, int R, int v) {
    diff[L] += v;       // "Start adding v at L"
    diff[R+1] -= v;     // "Stop adding v after R"
};

rangeAdd(1, 3, 3);     // Add 3 to indices 1,2,3
rangeAdd(2, 4, 5);     // Add 5 to indices 2,3,4

// diff = [0, 3, 5, 0, -3, -5]

// ── Reconstruct final array ───────────────────────────────
// Prefix sum of diff gives you the net change at each position
arr[0] += diff[0];   // 0 + 0 = 0
for(int i = 1; i < 5; i++) {
    arr[i] = arr[i-1] + diff[i];
}
// arr = [0, 0+3, 3+5, 8+0, 8-3] = [0, 3, 8, 8, 5]

// Verify manually:
// Index 0: no update → 0 ✓
// Index 1: +3 → 3 ✓
// Index 2: +3+5 → 8 ✓
// Index 3: +3+5 → 8 ✓
// Index 4: +5 → 5 ✓
```

---

## PATTERN 2: Sliding Window

### 2.1 The Core Idea

When you need to examine **every contiguous subarray** of a certain size or property, brute force is O(n²) or O(n×k). Sliding window reduces this to O(n) by **reusing** the previous window's computation.

```
Instead of computing sum([2,5,1]) then sum([5,1,8]) from scratch:
sum([5,1,8]) = sum([2,5,1]) - 2 + 8
             = previous_sum - leftmost_element + new_right_element

This "sliding" reduces O(n*k) work to O(n).
```

### 2.2 Fixed Size Window — Complete Template

```cpp
// TEMPLATE: Maximum sum of exactly k consecutive elements
int maxSumFixed(vector<int>& arr, int k) {
    int n = arr.size();
    
    // ── EDGE CASE CHECK ───────────────────────────────────
    if(n < k || k <= 0) return -1;
    
    // ── BUILD FIRST WINDOW (indices 0 to k-1) ────────────
    int windowSum = 0;
    for(int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    int maxSum = windowSum;
    
    // ── SLIDE WINDOW (right edge from k to n-1) ──────────
    // Window right edge = i, left edge = i-k
    for(int i = k; i < n; i++) {
        windowSum += arr[i];        // Add NEW right element
        windowSum -= arr[i - k];    // REMOVE old left element
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Extended: Return the actual window indices (start, end)
pair<int,int> maxSumWindow(vector<int>& arr, int k) {
    int n = arr.size();
    int windowSum = 0;
    for(int i = 0; i < k; i++) windowSum += arr[i];
    
    int maxSum = windowSum, bestStart = 0;
    
    for(int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i-k];
        if(windowSum > maxSum) {
            maxSum = windowSum;
            bestStart = i - k + 1;  // Left edge of this window
        }
    }
    
    return {bestStart, bestStart + k - 1};  // {start, end} indices
}
```

**Detailed Dry Run** on arr=[2,5,1,8,3,6], k=3:
```
First window [2,5,1]: sum = 8
                       maxSum = 8, bestStart = 0

i=3 (new element arr[3]=8, remove arr[0]=2):
    windowSum = 8 + 8 - 2 = 14
    14 > 8 → maxSum=14, bestStart=1
    Window: [5,1,8] (indices 1..3)

i=4 (new element arr[4]=3, remove arr[1]=5):
    windowSum = 14 + 3 - 5 = 12
    12 < 14 → no update

i=5 (new element arr[5]=6, remove arr[2]=1):
    windowSum = 12 + 6 - 1 = 17
    17 > 14 → maxSum=17, bestStart=3
    Window: [8,3,6] (indices 3..5)

Answer: maxSum=17, window=[8,3,6]
```

### 2.3 Variable Size Window — Complete Template

When the window size isn't fixed but determined by a condition.

```cpp
// TEMPLATE: Minimum length subarray with sum >= target
// (Only works for POSITIVE numbers!)
int minLengthSubarray(vector<int>& arr, int target) {
    int n = arr.size();
    int left = 0;
    int windowSum = 0;
    int minLen = INT_MAX;   // Track minimum valid window length
    
    for(int right = 0; right < n; right++) {
        // ── EXPAND: always add right element ─────────────
        windowSum += arr[right];
        
        // ── SHRINK: while condition is met, try to shrink ─
        // We shrink because we want the MINIMUM length
        while(windowSum >= target) {
            minLen = min(minLen, right - left + 1);
            windowSum -= arr[left];  // Remove left element
            left++;                  // Move left pointer right
        }
    }
    
    return (minLen == INT_MAX) ? 0 : minLen;  // 0 = no valid subarray
}

// WHEN TO EXPAND vs WHEN TO SHRINK:
// If you want MAXIMUM length → expand until condition fails, then record
// If you want MINIMUM length → expand until condition met, then shrink
```

**Detailed Dry Run** on arr=[2,3,1,2,4,3], target=7:
```
left=0, windowSum=0, minLen=∞

right=0: windowSum=2, 2<7, no shrink
right=1: windowSum=5, 5<7, no shrink
right=2: windowSum=6, 6<7, no shrink
right=3: windowSum=8
    ✓ 8>=7: minLen=min(∞,3-0+1)=4, remove arr[0]=2, left=1, windowSum=6
    6<7: stop shrinking
right=4: windowSum=10
    ✓ 10>=7: minLen=min(4,4-1+1)=4, remove arr[1]=3, left=2, windowSum=7
    ✓ 7>=7:  minLen=min(4,4-2+1)=3, remove arr[2]=1, left=3, windowSum=6
    6<7: stop shrinking
right=5: windowSum=9
    ✓ 9>=7: minLen=min(3,5-3+1)=3, remove arr[3]=2, left=4, windowSum=7
    ✓ 7>=7: minLen=min(3,5-4+1)=2, remove arr[4]=4, left=5, windowSum=3
    3<7: stop

Answer: 2 (subarray [4,3])
```

### 2.4 Variable Window — Longest Substring Without Repeat

```cpp
// Classic variable window with hash map
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;  // char → last seen index
    int left = 0, maxLen = 0;
    
    for(int right = 0; right < s.size(); right++) {
        char c = s[right];
        
        // If we've seen this char AND it's inside our current window
        if(lastSeen.count(c) && lastSeen[c] >= left) {
            left = lastSeen[c] + 1;  // Shrink: move left past duplicate
        }
        
        lastSeen[c] = right;  // Update last seen position
        maxLen = max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Dry Run: s = "abcabcbb"
//
// right=0 (a): left=0, lastSeen={a:0}, maxLen=1
// right=1 (b): left=0, lastSeen={a:0,b:1}, maxLen=2
// right=2 (c): left=0, lastSeen={a:0,b:1,c:2}, maxLen=3
// right=3 (a): 'a' seen at 0, 0>=left(0) → left=1, lastSeen={a:3,...}, maxLen=3
// right=4 (b): 'b' seen at 1, 1>=left(1) → left=2, lastSeen={b:4,...}, maxLen=3
// right=5 (c): 'c' seen at 2, 2>=left(2) → left=3, lastSeen={c:5,...}, maxLen=3
// right=6 (b): 'b' seen at 4, 4>=left(3) → left=5, maxLen=3
// right=7 (b): 'b' seen at 6, 6>=left(5) → left=7, maxLen=3
//
// Answer: 3 ("abc")
```

---

## PATTERN 3: Two Pointers

### 3.1 Two Types of Two Pointers

**Type A — Converging** (both ends, move toward middle):
- Sorted array pair sums
- Container with most water
- Palindrome checking

**Type B — Same Direction** (both start at beginning, move right):
- Remove duplicates
- Move zeroes
- Partition arrays

### 3.2 Type A: Converging (Two Sum in Sorted Array)

```cpp
// Given SORTED array, does any pair sum to target?
pair<int,int> twoSumSorted(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left < right) {
        int sum = arr[left] + arr[right];
        
        if(sum == target) {
            return {left, right};    // Found!
        } else if(sum < target) {
            left++;   // Sum too small → increase by moving left right
        } else {
            right--;  // Sum too large → decrease by moving right left
        }
    }
    
    return {-1, -1};  // No pair found
}

// WHY THIS IS CORRECT (Mathematical Proof):
// Array is sorted: arr[0] ≤ arr[1] ≤ ... ≤ arr[n-1]
//
// When sum = arr[L] + arr[R] < target:
//   Can we increase sum? Only by increasing arr[L] or decreasing arr[R].
//   Decreasing arr[R] makes sum smaller — wrong direction!
//   So ONLY option: L++ (increase arr[L])
//
// When sum = arr[L] + arr[R] > target:
//   Only option: R-- (decrease arr[R])
//
// We NEVER miss the answer because every wrong move is provably wrong.
// Time: O(n) — L and R together move at most n steps.
```

### 3.3 Type A: 3Sum (Triple Sum = 0)

```cpp
// Find all UNIQUE triplets summing to 0 — O(n²)
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());  // CRUCIAL! Must sort first!
    vector<vector<int>> result;
    
    for(int i = 0; i < (int)nums.size() - 2; i++) {
        // ── SKIP DUPLICATES for i ────────────────────────
        if(i > 0 && nums[i] == nums[i-1]) continue;
        
        // ── OPTIMIZATION: if smallest possible sum > 0, stop ─
        if(nums[i] > 0) break;
        
        int left = i + 1;
        int right = nums.size() - 1;
        int target = -nums[i];  // We need left+right = -nums[i]
        
        while(left < right) {
            int sum = nums[left] + nums[right];
            
            if(sum == target) {
                result.push_back({nums[i], nums[left], nums[right]});
                
                // ── SKIP DUPLICATES for left & right ─────────
                while(left < right && nums[left] == nums[left+1]) left++;
                while(left < right && nums[right] == nums[right-1]) right--;
                
                left++;
                right--;
            } else if(sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// Dry Run: [-1, 0, 1, 2, -1, -4]
// After sort: [-4, -1, -1, 0, 1, 2]
//
// i=0 (nums[i]=-4): target=4, left=1, right=5
//   left=-1, right=2: sum=1 < 4 → left++
//   left=-1, right=2: sum=1 < 4 → left++  (i=2)
//   left=-1, right=2: sum=-1+2=1 < 4 → left++  (i=3)
//   left=0, right=2: sum=0+2=2 < 4 → left++
//   left=1, right=2: sum=1+2=3 < 4 → left++
//   left=right: stop
// No triplet with nums[0]=-4
//
// i=1 (nums[i]=-1): target=1, left=2, right=5
//   left=-1, right=2: sum=-1+2=1 == 1! → add [-1,-1,2]
//   Skip dups: left=3, right=4
//   left=0, right=1: sum=0+1=1 == 1! → add [-1,0,1]
//   Skip dups: left=4, right=3, stop
//
// i=2 (nums[i]=-1): skip! nums[2]==nums[1]
// ...
// Result: [[-1,-1,2], [-1,0,1]]
```

### 3.4 Type B: Same Direction (Remove Duplicates)

```cpp
// Remove duplicates from sorted array IN-PLACE
// Return new length
int removeDuplicates(vector<int>& arr) {
    if(arr.empty()) return 0;
    
    int slow = 0;  // 'slow' points to the LAST confirmed unique element
    
    // 'fast' scans ahead looking for new unique elements
    for(int fast = 1; fast < arr.size(); fast++) {
        if(arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];  // Copy unique element to next position
        }
        // If arr[fast] == arr[slow]: duplicate, skip it!
    }
    
    return slow + 1;  // New length = index of last unique + 1
}

// Visualization:
// [1, 1, 2, 3, 3, 3, 4]
//  s
//     f
//
// f=1: arr[1]=1 == arr[0]=1 → skip
// f=2: arr[2]=2 != arr[0]=1 → slow=1, arr[1]=2 → [1,2,2,3,3,3,4]
// f=3: arr[3]=3 != arr[1]=2 → slow=2, arr[2]=3 → [1,2,3,3,3,3,4]
// f=4,5: duplicates, skip
// f=6: arr[6]=4 != arr[2]=3 → slow=3, arr[3]=4 → [1,2,3,4,3,3,4]
//                                                        ↑ logical end here
// Return 4 (arr[0..3] = [1,2,3,4])
```

### 3.5 Container With Most Water

```cpp
// Height array, find two lines forming maximum area container
// Area = min(height[L], height[R]) × (R - L)

int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while(left < right) {
        int h = min(height[left], height[right]);
        int w = right - left;
        int area = h * w;
        maxWater = max(maxWater, area);
        
        // KEY DECISION: Which pointer to move?
        // Moving the TALLER line: height is still bounded by shorter → area can't increase
        // Moving the SHORTER line: height MIGHT increase → area might increase
        if(height[left] < height[right]) {
            left++;   // Left is shorter, move it hoping for taller
        } else {
            right--;  // Right is shorter (or equal), move it
        }
    }
    
    return maxWater;
}

// Greedy proof: Moving the taller pointer CANNOT help.
// Current area = min(h[L], h[R]) × width.
// If we move taller (say h[R] is taller):
//   Width decreases by 1 (width-1)
//   Height is still bounded by min(h[L], something) ≤ h[L]
//   New area ≤ h[L] × (width-1) < h[L] × width ≤ current area
//   So we could only get worse. Therefore, move the SHORTER pointer.
```

---

## PATTERN 4: Kadane's Algorithm

### 4.1 Deep Understanding

**Problem**: Find the contiguous subarray with the largest sum.

**Why brute force is bad:**
- O(n³): Check every pair (i,j), compute sum in O(n) → O(n³)
- O(n²): Precompute prefix sums, check every pair → O(n²)

**Kadane's insight:**

At each position i, we ask: *"What's the maximum sum subarray that ENDS at position i?"*

```
For subarray ending at i, it either:
  1. Just the single element arr[i]   ← start fresh here
  2. arr[i] appended to best subarray ending at i-1 ← extend previous

max_ending_here(i) = max(arr[i], max_ending_here(i-1) + arr[i])
                   = max(arr[i], previous_best + arr[i])

When is option 1 better? When previous_best < 0!
If the previous running sum is NEGATIVE, it only drags us down.
Better to start fresh!

Global answer = max of all max_ending_here values
```

### 4.2 Full Implementation with All Variants

```cpp
// ── VARIANT 1: Just return maximum sum ───────────────────
int maxSubarraySum(vector<int>& arr) {
    if(arr.empty()) return 0;
    
    int current = arr[0];   // Max sum of subarray ending HERE
    int global = arr[0];    // Max sum seen across all positions
    
    for(int i = 1; i < arr.size(); i++) {
        current = max(arr[i], current + arr[i]);
        global = max(global, current);
    }
    
    return global;
}
// Handles all-negative arrays correctly! Returns the least negative element.

// ── VARIANT 2: Return the actual subarray (start, end indices) ───
pair<int,int> maxSubarrayIndices(vector<int>& arr) {
    int current = arr[0], global = arr[0];
    int globalStart = 0, globalEnd = 0;
    int currentStart = 0;  // Where does current subarray begin?
    
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i] > current + arr[i]) {
            // Start fresh from i
            current = arr[i];
            currentStart = i;
        } else {
            // Extend
            current = current + arr[i];
        }
        
        if(current > global) {
            global = current;
            globalStart = currentStart;
            globalEnd = i;
        }
    }
    
    return {globalStart, globalEnd};
}

// ── VARIANT 3: Maximum circular subarray ─────────────────
// Either max normal subarray, or the "wrapping" subarray
// Trick: max circular = total_sum - min_normal_subarray
int maxCircularSubarray(vector<int>& arr) {
    int totalSum = 0;
    int curMax = arr[0], globalMax = arr[0];
    int curMin = arr[0], globalMin = arr[0];
    
    for(int i = 0; i < arr.size(); i++) {
        totalSum += arr[i];
        
        if(i > 0) {
            // Kadane for maximum
            curMax = max(arr[i], curMax + arr[i]);
            globalMax = max(globalMax, curMax);
            
            // Kadane for minimum (inverted!)
            curMin = min(arr[i], curMin + arr[i]);
            globalMin = min(globalMin, curMin);
        }
    }
    
    // If all negative: circular would be total-min=0 (empty subarray), use linear
    if(globalMax < 0) return globalMax;
    
    return max(globalMax, totalSum - globalMin);
}
```

### 4.3 Complete Dry Run

```
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

         arr[i]  current              global    currentStart
i=0:     -2      -2                   -2        0
i=1:      1      max(1, -2+1)=1       1         1  ← start fresh!
i=2:     -3      max(-3, 1-3)=-2      1         1
i=3:      4      max(4, -2+4)=4       4         3  ← start fresh!
i=4:     -1      max(-1, 4-1)=3       4         3
i=5:      2      max(2, 3+2)=5        5         3
i=6:      1      max(1, 5+1)=6        6         3  ← new global max!
i=7:     -5      max(-5, 6-5)=1       6         3
i=8:      4      max(4, 1+4)=5        6         3

Final answer: 6
Subarray from index 3 to 6: [4, -1, 2, 1]
Sum: 4-1+2+1 = 6 ✓
```

---

## PATTERN 5: Binary Search on Arrays

### 5.1 Classic Binary Search

```cpp
// Returns index of target, or -1 if not found
// REQUIRES sorted array!
int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left <= right) {
        // ── CRUCIAL: Avoid integer overflow! ──────────────
        // int mid = (left + right) / 2;        ❌ WRONG! Overflow if left+right > INT_MAX
        int mid = left + (right - left) / 2;    // ✅ CORRECT
        
        if(arr[mid] == target) {
            return mid;           // Found!
        } else if(arr[mid] < target) {
            left = mid + 1;       // Target is in RIGHT half
        } else {
            right = mid - 1;      // Target is in LEFT half
        }
    }
    
    return -1;  // Not found
}

// WHY left <= right (not left < right)?
// When left==right: we haven't checked this last element yet!
// After the step: left=mid+1 or right=mid-1, so left > right → exit.

// HOW MANY ITERATIONS? Each step halves the search space.
// Start: n elements. After 1 step: n/2. After k steps: n/2^k
// Stop when n/2^k = 1 → k = log₂(n) → O(log n)
```

### 5.2 Find First and Last Position (Important Variant!)

```cpp
// Returns first index where target appears (-1 if not found)
int firstOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            result = mid;       // Found! But keep searching LEFT for earlier occurrence
            right = mid - 1;    // ← Key difference: search LEFT half
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Returns last index where target appears
int lastOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            result = mid;       // Found! But keep searching RIGHT for later occurrence
            left = mid + 1;     // ← Key difference: search RIGHT half
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Count occurrences: O(log n)
int countOccurrences(vector<int>& arr, int target) {
    int first = firstOccurrence(arr, target);
    if(first == -1) return 0;
    int last = lastOccurrence(arr, target);
    return last - first + 1;
}
```

### 5.3 Search in Rotated Sorted Array

```cpp
// [4, 5, 6, 7, 0, 1, 2] — was sorted, then rotated
// One half is ALWAYS sorted after any split

int searchRotated(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) return mid;
        
        // Determine which half is sorted
        if(arr[left] <= arr[mid]) {
            // LEFT HALF [left..mid] is sorted
            if(arr[left] <= target && target < arr[mid]) {
                right = mid - 1;  // Target is in sorted left half
            } else {
                left = mid + 1;   // Target must be in right half
            }
        } else {
            // RIGHT HALF [mid..right] is sorted
            if(arr[mid] < target && target <= arr[right]) {
                left = mid + 1;   // Target is in sorted right half
            } else {
                right = mid - 1;  // Target must be in left half
            }
        }
    }
    
    return -1;
}

// Dry Run: arr=[4,5,6,7,0,1,2], target=0
//
// left=0, right=6, mid=3, arr[3]=7
// arr[0]=4 <= arr[3]=7 → left half sorted
// Is 4 <= 0 < 7? No → left = 4
//
// left=4, right=6, mid=5, arr[5]=1
// arr[4]=0 <= arr[5]=1 → left half sorted
// Is 0 <= 0 < 1? YES → right = 4
//
// left=4, right=4, mid=4, arr[4]=0 == 0 → FOUND! return 4 ✓
```

---

## PATTERN 6: Dutch National Flag

### 6.1 The Algorithm

Sort an array of only 0s, 1s, and 2s in ONE PASS with O(1) extra space.

```
Maintain 3 regions at all times:
[0..low-1]   = confirmed 0s (sorted)
[low..mid-1] = confirmed 1s (sorted)
[mid..high]  = unknown (needs processing)
[high+1..n-1]= confirmed 2s (sorted)

Three pointers: low, mid, high

Process element at 'mid':
  If arr[mid] == 0: swap with arr[low], low++, mid++
  If arr[mid] == 1: it belongs in 1s region, just mid++
  If arr[mid] == 2: swap with arr[high], high--
                    DON'T increment mid! New element at mid is unchecked!
```

```cpp
void sortColors(vector<int>& nums) {
    int low = 0;
    int mid = 0;
    int high = nums.size() - 1;
    
    while(mid <= high) {
        switch(nums[mid]) {
            case 0:
                swap(nums[low], nums[mid]);
                low++;
                mid++;
                break;
            case 1:
                mid++;
                break;
            case 2:
                swap(nums[mid], nums[high]);
                high--;
                // DO NOT mid++! arr[mid] now holds something we haven't checked!
                break;
        }
    }
}
```

**Complete Dry Run** on [2, 0, 2, 1, 1, 0]:
```
Initial: [2, 0, 2, 1, 1, 0]
          low=0, mid=0, high=5

Step 1: arr[mid=0]=2 → swap(arr[0],arr[5])=[0,0,2,1,1,2], high=4
         [0, 0, 2, 1, 1, | 2]
          ↑               ↑ confirmed 2

Step 2: arr[mid=0]=0 → swap(arr[0],arr[0])=[0,0,2,1,1,2], low=1, mid=1
         [0 | 0, 2, 1, 1, | 2]
          ↑ confirmed 0

Step 3: arr[mid=1]=0 → swap(arr[1],arr[1])=[0,0,2,1,1,2], low=2, mid=2
         [0, 0 | 2, 1, 1, | 2]

Step 4: arr[mid=2]=2 → swap(arr[2],arr[4])=[0,0,1,1,2,2], high=3
         [0, 0 | 2? 1 | 2, 2]
         Wait: new arr = [0,0,1,1,2,2], mid still=2

Step 5: arr[mid=2]=1 → mid=3
         [0, 0, | 1, 1 | 2, 2]

Step 6: arr[mid=3]=1 → mid=4
Step 7: mid=4 > high=3 → STOP

Result: [0, 0, 1, 1, 2, 2] ✓
```

---

## PATTERN 7: Cyclic Sort

### 7.1 When to Use

Array contains numbers **in range [1, n]** (or [0, n-1]). Uses the insight: number i belongs at index i-1.

```
For array [3, 1, 5, 4, 2]:
  3 should be at index 2
  1 should be at index 0
  5 should be at index 4
  4 should be at index 3
  2 should be at index 1
  
If we correctly place every number, missing/duplicate numbers are easy to find!
```

```cpp
// Place each number at its "correct" position
void cyclicSort(vector<int>& arr) {
    int i = 0;
    
    while(i < arr.size()) {
        int correctIdx = arr[i] - 1;  // Where does arr[i] BELONG?
        
        if(arr[i] != arr[correctIdx]) {
            // arr[i] is not at its correct position → swap it there
            swap(arr[i], arr[correctIdx]);
            // Don't advance i! New arr[i] might also need swapping
        } else {
            // arr[i] is already at correct position (or duplicate)
            i++;
        }
    }
}

// After sorting, find ALL missing numbers
vector<int> findAllMissing(vector<int>& arr) {
    cyclicSort(arr);
    
    vector<int> missing;
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] != i + 1) {   // Expected: arr[i] = i+1
            missing.push_back(i + 1);
        }
    }
    return missing;
}

// After sorting, find duplicate
int findDuplicate(vector<int>& arr) {
    cyclicSort(arr);
    
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] != i + 1) {
            return arr[i];  // The number here doesn't belong here = duplicate
        }
    }
    return -1;
}
```

**Dry Run** on [4, 3, 2, 7, 8, 2, 3, 1] (find missing numbers):
```
[4, 3, 2, 7, 8, 2, 3, 1]  i=0
arr[0]=4, correct idx=3. arr[3]=7≠4. swap(0,3): [7,3,2,4,8,2,3,1]
arr[0]=7, correct idx=6. arr[6]=3≠7. swap(0,6): [3,3,2,4,8,2,7,1]
arr[0]=3, correct idx=2. arr[2]=2≠3. swap(0,2): [2,3,3,4,8,2,7,1]
arr[0]=2, correct idx=1. arr[1]=3≠2. swap(0,1): [3,2,3,4,8,2,7,1]  
arr[0]=3, correct idx=2. arr[2]=3==3. DUPLICATE! i++. i=1
arr[1]=2, correct idx=1. arr[1]==2. i++. i=2
arr[2]=3, correct idx=2. arr[2]==3. i++. i=3
arr[3]=4, correct idx=3. arr[3]==4. i++. i=4
arr[4]=8, correct idx=7. arr[7]=1≠8. swap(4,7): [3,2,3,4,1,2,7,8]
arr[4]=1, correct idx=0. arr[0]=3≠1. swap(4,0): [1,2,3,4,3,2,7,8]
arr[4]=3, correct idx=2. arr[2]=3==3. DUPLICATE! i++. i=5
arr[5]=2, correct idx=1. arr[1]=2==2. DUPLICATE! i++. i=6
arr[6]=7, correct idx=6. arr[6]==7. i++. i=7
arr[7]=8, correct idx=7. arr[7]==8. i++. Done.

Final: [1,2,3,4,3,2,7,8]
Check: arr[4]=3≠5 → missing 5. arr[5]=2≠6 → missing 6.
Answer: [5, 6] ✓
```

---

## PATTERN 8: XOR Tricks

### 8.1 Key XOR Properties

```
a ^ a = 0          (same number XOR = 0, they cancel!)
a ^ 0 = a          (XOR with 0 = identity, no change)
XOR is commutative: a ^ b = b ^ a
XOR is associative: (a^b)^c = a^(b^c)

Consequence: if every element appears twice except one,
XOR all elements → all pairs cancel → single element remains!
```

```cpp
// Find single non-duplicate (every other appears exactly twice)
int singleNumber(vector<int>& nums) {
    int result = 0;
    for(int x : nums) result ^= x;
    return result;
}

// Example: [4, 1, 2, 1, 2]
// result = 0 ^ 4 ^ 1 ^ 2 ^ 1 ^ 2
//        = 4 ^ (1^1) ^ (2^2)
//        = 4 ^ 0 ^ 0 = 4 ✓

// XOR swap (without extra variable):
int a = 5, b = 10;
a = a ^ b;   // a = 15 (5^10)
b = a ^ b;   // b = 15^10 = 5 (original a!)
a = a ^ b;   // a = 15^5 = 10 (original b!)
// a=10, b=5 — swapped!
```

---

*Next → `03_arrays_shortcuts_tricks.md` — Memory tricks, patterns cheatsheet, one-liners*
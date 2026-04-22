# 🧠 02 — Arrays — MASTER NOTES (Deep Dive)

> **Goal**: Understand arrays so deeply that NO interview question catches you off guard  
> **Level**: Beginner → Advanced → Competitive Programming  
> **Time**: 2–3 weeks of focused study  
> **Importance**: ⭐⭐⭐⭐⭐ — #1 most asked DSA topic in every company

---

## 📖 TABLE OF CONTENTS

1. [What is an Array? (The Real Story)](#1-what-is-an-array)
2. [Memory Layout — How Arrays Actually Work](#2-memory-layout)
3. [Array Operations — Time & Space Analysis](#3-array-operations)
4. [Vectors in C++ — The Safer Array](#4-vectors-in-cpp)
5. [Pattern 1: Prefix Sum & Difference Array](#5-prefix-sum)
6. [Pattern 2: Sliding Window](#6-sliding-window)
7. [Pattern 3: Two Pointers](#7-two-pointers)
8. [Pattern 4: Kadane's Algorithm](#8-kadanes-algorithm)
9. [Pattern 5: Binary Search on Arrays](#9-binary-search)
10. [Pattern 6: Dutch National Flag (3-Way Partition)](#10-dutch-national-flag)
11. [Pattern 7: Merge Sort + Count Inversions](#11-merge-sort)
12. [Pattern 8: Cyclic Sort](#12-cyclic-sort)
13. [2D Arrays and Matrices](#13-2d-arrays)
14. [Bit Manipulation with Arrays](#14-bit-manipulation)
15. [Company-Wise Questions](#15-company-questions)
16. [LeetCode Problem List with Approach](#16-leetcode-problems)
17. [Common Mistakes & Traps](#17-common-mistakes)
18. [Interview Strategy](#18-interview-strategy)

---

## 1. What is an Array?

### 1.1 The Real Definition

An array is a **contiguous block of memory** that stores elements of the **same data type**.

Think of it like parking spaces in a row:
```
┌──────┬──────┬──────┬──────┬──────┐
│  10  │  20  │  30  │  40  │  50  │
└──────┴──────┴──────┴──────┴──────┘
  [0]    [1]    [2]    [3]    [4]
  1000   1004   1008   1012   1016   ← Memory addresses
```

- Each parking space is **same size** (int = 4 bytes)
- Spaces are **side by side** (contiguous)
- You can jump to any space **instantly** with its number (O(1))

### 1.2 Why Arrays Exist

Without arrays, you'd write:
```cpp
int student1 = 85, student2 = 90, student3 = 78; // Awful for 1000 students
```

With arrays:
```cpp
int students[1000];   // Clean. Scalable. Powerful.
```

### 1.3 Array vs Linked List — The Core Trade-off

| Feature | Array | Linked List |
|---------|-------|-------------|
| Access by index | O(1) ✅ | O(n) ❌ |
| Insert at end | O(1) ✅ | O(1) ✅ |
| Insert at start | O(n) ❌ | O(1) ✅ |
| Memory layout | Contiguous | Scattered |
| Cache performance | Excellent ✅ | Poor ❌ |
| Memory overhead | Low ✅ | High (pointers) ❌ |

**Choose Array when**: Random access needed, cache performance matters  
**Choose Linked List when**: Frequent insert/delete at arbitrary positions

---

## 2. Memory Layout

### 2.1 How Elements Are Stored

```
int arr[] = {10, 20, 30, 40, 50};

Memory:
┌────────────┬────────────┬────────────┬────────────┬────────────┐
│ arr[0]=10  │ arr[1]=20  │ arr[2]=30  │ arr[3]=40  │ arr[4]=50  │
│   @1000    │   @1004    │   @1008    │   @1012    │   @1016    │
└────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 2.2 The O(1) Access Formula

```
Address of arr[i] = Base_Address + (i × sizeof(element))
Address of arr[3] = 1000 + (3 × 4) = 1012  → Direct jump!
```

This is WHY access is O(1). No searching needed — pure math!

### 2.3 Cache Locality — The Hidden Advantage

```
CPU Cache: [arr[0], arr[1], arr[2], arr[3], arr[4], ...]
           ↑ All loaded together when CPU fetches arr[0]

Sequential access = Cache hits = FAST!
```

Arrays are 10–100x faster in practice than Big-O suggests, because modern CPUs pre-load neighboring memory into cache. This is called **spatial locality**.

### 2.4 Stack vs Heap

```cpp
// STACK (dangerous for large arrays!)
int arr[1000000];   // ~4MB on stack → Stack Overflow!

// HEAP (safe, use this)
int* arr = new int[1000000];  // Allocated on heap
vector<int> arr(1000000);     // Even better! Auto-managed heap
```

**Rule**: Declare large arrays globally or use `vector`. Never as local variables.

---

## 3. Array Operations

### 3.1 Complete Time & Space Complexity

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Access arr[i] | O(1) | O(1) | Direct formula |
| Update arr[i] | O(1) | O(1) | Direct assignment |
| Search (unsorted) | O(n) | O(1) | Linear scan |
| Search (sorted) | O(log n) | O(1) | Binary search |
| Insert at end | O(1) | O(1) | If space available |
| Insert at start | O(n) | O(1) | Shift all right |
| Insert at middle | O(n) | O(1) | Shift half right |
| Delete at end | O(1) | O(1) | Decrease size |
| Delete at start | O(n) | O(1) | Shift all left |
| Sort (comparison) | O(n log n) | O(log n) | Best possible |
| Copy array | O(n) | O(n) | New allocation |
| Reverse | O(n) | O(1) | Two pointers |
| Merge two sorted | O(n+m) | O(n+m) | Two pointers |
| Prefix Sum build | O(n) | O(n) | Once upfront |
| Range Query (prefix) | O(1) | O(1) | After build |

### 3.2 Insertion Visualization

```
INSERT 99 AT INDEX 2 in [10, 20, 30, 40, 50]:

Step 1: Shift elements right from index 2
[10, 20, 30, 40, 50, _]
[10, 20, 30, 40, 50, 50]  ← Copy arr[4] to arr[5]
[10, 20, 30, 40, 40, 50]  ← Copy arr[3] to arr[4]
[10, 20, 30, 30, 40, 50]  ← Copy arr[2] to arr[3]

Step 2: Place new element at index 2
[10, 20, 99, 30, 40, 50] ✓
```

---

## 4. Vectors in C++

### 4.1 Why Use Vectors Over Raw Arrays

```cpp
#include <vector>
using namespace std;

// Declaration
vector<int> v;                    // Empty vector
vector<int> v(5);                 // 5 zeros: {0,0,0,0,0}
vector<int> v(5, 7);              // 5 sevens: {7,7,7,7,7}
vector<int> v = {1, 2, 3, 4, 5}; // Initialize with values
vector<int> v(arr, arr + n);      // From raw array

// Essential Methods
v.push_back(10);     // Add to end:    O(1) amortized
v.pop_back();        // Remove end:    O(1)
v.size();            // Get size:      O(1)
v.empty();           // Check empty:   O(1)
v.front();           // First element: O(1)
v.back();            // Last element:  O(1)
v.clear();           // Remove all:    O(n)
v.resize(n);         // Resize:        O(n)
v.insert(it, val);   // Insert at pos: O(n)
v.erase(it);         // Erase at pos:  O(n)

// 2D vector
vector<vector<int>> matrix(rows, vector<int>(cols, 0));
```

### 4.2 Vector Amortized Analysis

Vectors double capacity when full. Starting capacity = 1:

```
push_back 8 elements:
Capacity: 1 → 2 → 4 → 8
Copies:   0 + 1 + 2 + 4 = 7 total copies for 8 elements
Average: 7/8 ≈ O(1) per push_back (amortized)
```

This is why `push_back` is O(1) amortized, not O(n).

### 4.3 Iterators

```cpp
vector<int> v = {10, 20, 30, 40, 50};

// Forward iteration
for(auto it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";
}

// Reverse iteration
for(auto it = v.rbegin(); it != v.rend(); it++) {
    cout << *it << " ";
}

// Range-based (cleanest)
for(int x : v) cout << x << " ";

// With index
for(int i = 0; i < v.size(); i++) cout << v[i] << " ";
```

---

## 5. Prefix Sum & Difference Array

### 5.1 Prefix Sum — Core Concept

**Problem**: Answer Q range sum queries on array of size N.
- Naive: O(N) per query = O(N×Q) total
- Prefix Sum: O(N) build + O(1) per query = O(N+Q) total

```
Array:  [3, 1, 4, 1, 5, 9, 2, 6]
Index:   0  1  2  3  4  5  6  7

Prefix: [0, 3, 4, 8, 9, 14, 23, 25, 31]
         ^-- prefix[0] = 0 (easier math)
         prefix[i] = prefix[i-1] + arr[i-1]

Range sum from L to R (0-indexed):
= prefix[R+1] - prefix[L]

Example: sum(2, 5) = prefix[6] - prefix[2] = 23 - 4 = 19
Verify: arr[2]+arr[3]+arr[4]+arr[5] = 4+1+5+9 = 19 ✓
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class PrefixSum {
    vector<int> prefix;
public:
    // Build: O(n)
    PrefixSum(vector<int>& arr) {
        int n = arr.size();
        prefix.resize(n + 1, 0);
        for(int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }
    }
    
    // Query: O(1) — sum from index L to R (inclusive, 0-indexed)
    int rangeSum(int L, int R) {
        return prefix[R + 1] - prefix[L];
    }
};

int main() {
    vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
    PrefixSum ps(arr);
    
    cout << ps.rangeSum(2, 5) << endl;  // 4+1+5+9 = 19
    cout << ps.rangeSum(0, 7) << endl;  // Full array = 31
    cout << ps.rangeSum(4, 4) << endl;  // Single element = 5
    
    return 0;
}
```

### 5.2 2D Prefix Sum (Matrix)

```cpp
// Build 2D prefix sum
// prefix[i][j] = sum of rectangle from (0,0) to (i-1, j-1)
for(int i = 1; i <= rows; i++) {
    for(int j = 1; j <= cols; j++) {
        prefix[i][j] = matrix[i-1][j-1]
                     + prefix[i-1][j]
                     + prefix[i][j-1]
                     - prefix[i-1][j-1];  // Remove double count
    }
}

// Query: sum of rectangle (r1,c1) to (r2,c2)
int rectSum(int r1, int c1, int r2, int c2) {
    return prefix[r2+1][c2+1]
         - prefix[r1][c2+1]
         - prefix[r2+1][c1]
         + prefix[r1][c1];  // Add back doubly subtracted
}
```

**Visualization of inclusion-exclusion**:
```
┌──────────────────┐
│        A         │   A = prefix[r2][c2]
│   ┌────┐─────────┤   B = prefix[r1-1][c2]  (top strip)
│   │    │         │   C = prefix[r2][c1-1]  (left strip)
│ C │ X  │   B     │   D = prefix[r1-1][c1-1] (corner, added twice)
│   └────┘         │
└──────────────────┘   X = A - B - C + D
```

### 5.3 Difference Array — Range Updates in O(1)

**Problem**: Apply Q range updates (add value v to indices L to R) then answer point queries.
- Naive: O(N) per update = O(N×Q) total
- Difference array: O(1) per update, O(N) to reconstruct

```cpp
// Difference array technique
vector<int> diff(n + 1, 0);

// Range update: add v to arr[L..R] — O(1)
void update(int L, int R, int v) {
    diff[L] += v;
    diff[R + 1] -= v;
}

// Reconstruct array — O(n)
void reconstruct(vector<int>& arr) {
    arr[0] += diff[0];
    for(int i = 1; i < n; i++) {
        arr[i] = arr[i-1] + diff[i];
    }
}
```

**Example**:
```
Array:  [0, 0, 0, 0, 0]
Update: add 3 to [1, 3]
Update: add 5 to [2, 4]

diff:   [0, 3, 5, 0, -3, -5]
         (mark starts and ends)

Reconstruct:
arr[0] = 0
arr[1] = 0+3 = 3
arr[2] = 3+5 = 8
arr[3] = 8+0 = 8
arr[4] = 8-3 = 5

Result: [0, 3, 8, 8, 5] ✓
```

---

## 6. Sliding Window

### 6.1 When to Use Sliding Window

Sliding window is the pattern for:
- **Contiguous subarray** problems
- Fixed size window (find max/min sum of k elements)
- Variable size window (smallest subarray with sum ≥ target)
- String window problems (longest substring without repeat)

**Recognition keywords**: "subarray", "substring", "contiguous", "window", "consecutive"

### 6.2 Fixed Size Window Template

```cpp
// Maximum sum of exactly k consecutive elements
int maxSumFixed(vector<int>& arr, int k) {
    int n = arr.size();
    if(n < k) return -1;  // Edge case!
    
    // Build first window
    int windowSum = 0;
    for(int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    int maxSum = windowSum;
    
    // Slide window: add right, remove left
    for(int i = k; i < n; i++) {
        windowSum += arr[i];      // Add new right element
        windowSum -= arr[i - k];  // Remove old left element
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

**Dry Run** on [2, 5, 1, 8, 3, 6], k=3:
```
First window: 2+5+1 = 8

i=3: add arr[3]=8, remove arr[0]=2 → sum = 8+8-2 = 14
i=4: add arr[4]=3, remove arr[1]=5 → sum = 14+3-5 = 12
i=5: add arr[5]=6, remove arr[2]=1 → sum = 12+6-1 = 17 ← MAX

Answer: 17 (window [8, 3, 6])
```

### 6.3 Variable Size Window Template

```cpp
// Minimum length subarray with sum >= target
int minLengthSubarray(vector<int>& arr, int target) {
    int n = arr.size();
    int left = 0, windowSum = 0;
    int minLen = INT_MAX;
    
    for(int right = 0; right < n; right++) {
        windowSum += arr[right];  // Expand window
        
        // Shrink window while condition is satisfied
        while(windowSum >= target) {
            minLen = min(minLen, right - left + 1);
            windowSum -= arr[left];  // Remove left element
            left++;
        }
    }
    
    return (minLen == INT_MAX) ? 0 : minLen;
}
```

**Visual**:
```
arr = [2, 3, 1, 2, 4, 3], target = 7

right=0: sum=2, window=[2]
right=1: sum=5, window=[2,3]
right=2: sum=6, window=[2,3,1]
right=3: sum=8 >=7! → len=4, shrink
  remove 2 → sum=6, left moves right
right=4: sum=10 >=7! → len=4, shrink
  remove 3 → sum=7 >=7! → len=3 ← NEW MIN
  remove 1 → sum=6, stop
right=5: sum=9 >=7! → len=3, shrink
  remove 2 → sum=7 >=7! → len=2 ← NEW MIN
  remove 4 → sum=3, stop

Answer: 2 (subarray [4, 3])
```

### 6.4 Advanced: Longest Substring Without Repeating Characters

```cpp
// Uses sliding window + hash set
int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int left = 0, maxLen = 0;
    
    for(int right = 0; right < s.size(); right++) {
        // Shrink window until no duplicate
        while(window.count(s[right])) {
            window.erase(s[left]);
            left++;
        }
        
        window.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

---

## 7. Two Pointers

### 7.1 When to Use Two Pointers

- Array is **sorted** (most common case)
- You need pairs/triplets summing to target
- Removing duplicates in-place
- Container with most water problems
- Palindrome checking

### 7.2 Converging Pointers (Both Ends)

```cpp
// Two Sum in sorted array
bool twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while(left < right) {
        int sum = arr[left] + arr[right];
        
        if(sum == target)  return true;
        if(sum < target)   left++;   // Need bigger left
        if(sum > target)   right--;  // Need smaller right
    }
    return false;
}
```

**Why this works**:
```
Sorted: [1, 3, 5, 8, 12, 14], target=17
         L                 R

sum = 1+14 = 15 < 17 → move L right
sum = 3+14 = 17 == 17 → FOUND! ✓

Mathematical insight:
- If sum < target: only way to increase sum is move L right
- If sum > target: only way to decrease sum is move R left
- So we never miss the answer!
```

### 7.3 3Sum Pattern

```cpp
// Find all triplets summing to zero — O(n²)
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());  // MUST sort first
    vector<vector<int>> result;
    
    for(int i = 0; i < nums.size() - 2; i++) {
        // Skip duplicates for i
        if(i > 0 && nums[i] == nums[i-1]) continue;
        
        int left = i + 1, right = nums.size() - 1;
        
        while(left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            if(sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                // Skip duplicates for left and right
                while(left < right && nums[left] == nums[left+1]) left++;
                while(left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if(sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}
```

### 7.4 Same Direction Pointers

```cpp
// Remove duplicates from sorted array in-place
int removeDuplicates(vector<int>& arr) {
    if(arr.empty()) return 0;
    
    int slow = 0;  // Points to last unique element
    
    for(int fast = 1; fast < arr.size(); fast++) {
        if(arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];  // Overwrite with new unique
        }
    }
    
    return slow + 1;  // New length
}
```

```
Before: [1, 1, 2, 3, 3, 3, 4]
         S
         F→

slow=0, fast=1: arr[1]==arr[0], skip
slow=0, fast=2: arr[2]≠arr[0], slow=1, arr[1]=2
slow=1, fast=3: arr[3]≠arr[1], slow=2, arr[2]=3
slow=2, fast=4,5: arr[4,5]==arr[2], skip
slow=2, fast=6: arr[6]≠arr[2], slow=3, arr[3]=4

After: [1, 2, 3, 4, | 3, 3, 4]  (first 4 elements are answer)
New length: 4
```

---

## 8. Kadane's Algorithm

### 8.1 The Idea

**Maximum Subarray Sum** — Find the contiguous subarray with the largest sum.

Naive approach: O(n³) or O(n²). Kadane's: O(n).

**Core Insight**: At each position i, either:
1. **Extend** the previous subarray (add arr[i] to it), OR
2. **Start fresh** from arr[i] (if previous subarray drags us down)

**Rule**: Start fresh if current running sum goes negative!

```cpp
int maxSubarray(vector<int>& arr) {
    int current = arr[0];   // Max ending here
    int global = arr[0];    // Max seen so far
    
    for(int i = 1; i < arr.size(); i++) {
        // Extend or start fresh?
        current = max(arr[i], current + arr[i]);
        global = max(global, current);
    }
    
    return global;
}
```

### 8.2 Detailed Dry Run

```
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: current=-2,  global=-2
i=1: current=max(1, -2+1)=max(1,-1)=1,     global=1
i=2: current=max(-3, 1-3)=max(-3,-2)=-2,   global=1
i=3: current=max(4, -2+4)=max(4,2)=4,      global=4
i=4: current=max(-1, 4-1)=max(-1,3)=3,     global=4
i=5: current=max(2, 3+2)=max(2,5)=5,       global=5
i=6: current=max(1, 5+1)=max(1,6)=6,       global=6 ← MAX
i=7: current=max(-5, 6-5)=max(-5,1)=1,     global=6
i=8: current=max(4, 1+4)=max(4,5)=5,       global=6

Answer: 6 (subarray [4, -1, 2, 1])
```

### 8.3 Variants

```cpp
// Variant 1: Return the actual subarray (track indices)
pair<int,int> maxSubarrayIndices(vector<int>& arr) {
    int current = arr[0], global = arr[0];
    int start = 0, end = 0, tempStart = 0;
    
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i] > current + arr[i]) {
            current = arr[i];
            tempStart = i;   // New subarray starts here
        } else {
            current += arr[i];
        }
        if(current > global) {
            global = current;
            start = tempStart;
            end = i;
        }
    }
    return {start, end};
}

// Variant 2: All-negative array (must pick at least one)
// Standard Kadane's already handles this! It never returns 0
// because we initialize current=arr[0] not 0.

// Variant 3: Maximum circular subarray
int maxCircularSubarray(vector<int>& arr) {
    int totalSum = 0;
    for(int x : arr) totalSum += x;
    
    int maxNormal = maxSubarray(arr);  // Normal Kadane's
    
    // Negate array, find max subarray (= min subarray of original)
    for(int& x : arr) x = -x;
    int minSub = maxSubarray(arr);     // Negated min
    
    int maxCircular = totalSum + minSub;  // totalSum - (min subarray)
    
    // If all negative, maxCircular would be 0, use maxNormal
    return max(maxNormal, maxCircular);
}
```

---

## 9. Binary Search

### 9.1 Classic Binary Search

```cpp
// Time: O(log n), Space: O(1)
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow!
        
        if(arr[mid] == target) return mid;
        if(arr[mid] < target)  left = mid + 1;
        else                   right = mid - 1;
    }
    
    return -1;  // Not found
}
```

⚠️ **Critical**: Use `mid = left + (right - left) / 2`, NOT `(left + right) / 2` — the latter can overflow!

### 9.2 Find First & Last Occurrence

```cpp
// First occurrence of target
int firstOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            result = mid;    // Save and keep searching LEFT
            right = mid - 1;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// Last occurrence (same idea, search RIGHT)
int lastOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            result = mid;    // Save and keep searching RIGHT
            left = mid + 1;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}
```

### 9.3 Search in Rotated Sorted Array

```cpp
// Array was sorted then rotated at unknown pivot
// e.g., [4, 5, 6, 7, 0, 1, 2]
int searchRotated(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) return mid;
        
        // Left half is sorted
        if(arr[left] <= arr[mid]) {
            if(arr[left] <= target && target < arr[mid])
                right = mid - 1;  // Target in left half
            else
                left = mid + 1;   // Target in right half
        }
        // Right half is sorted
        else {
            if(arr[mid] < target && target <= arr[right])
                left = mid + 1;   // Target in right half
            else
                right = mid - 1;  // Target in left half
        }
    }
    return -1;
}
```

---

## 10. Dutch National Flag (3-Way Partition)

### 10.1 Problem

Sort array of 0s, 1s, and 2s in O(n) time, O(1) space.

### 10.2 Algorithm

```cpp
void sortColors(vector<int>& nums) {
    int low = 0;                   // Boundary: 0s go here
    int mid = 0;                   // Current element
    int high = nums.size() - 1;    // Boundary: 2s go here
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++; mid++;
        } else if(nums[mid] == 1) {
            mid++;  // 1 is in correct region, just advance
        } else {  // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;  // Don't advance mid! New element unchecked
        }
    }
}
```

**Dry Run**:
```
[2, 0, 2, 1, 1, 0], low=0, mid=0, high=5

mid=0: nums[0]=2 → swap(0,5) → [0,0,2,1,1,2], high=4
mid=0: nums[0]=0 → swap(0,0) → [0,0,2,1,1,2], low=1, mid=1
mid=1: nums[1]=0 → swap(1,1) → [0,0,2,1,1,2], low=2, mid=2
mid=2: nums[2]=2 → swap(2,4) → [0,0,1,1,2,2], high=3
mid=2: nums[2]=1 → mid=3
mid=3: nums[3]=1 → mid=4
mid=4 > high=3: STOP

Result: [0, 0, 1, 1, 2, 2] ✓
```

**Invariant**: 
- [0..low-1] = all 0s
- [low..mid-1] = all 1s  
- [high+1..n-1] = all 2s
- [mid..high] = unknown

---

## 11. Merge Sort & Count Inversions

### 11.1 Count Inversions

**Inversion**: A pair (i, j) where i < j but arr[i] > arr[j].

This is solvable in O(n log n) by modifying merge sort!

```cpp
long long merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;
    long long inversions = 0;
    
    while(i <= mid && j <= right) {
        if(arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            // arr[i..mid] are ALL greater than arr[j]
            inversions += (mid - i + 1);  // Count inversions!
            temp.push_back(arr[j++]);
        }
    }
    
    while(i <= mid)  temp.push_back(arr[i++]);
    while(j <= right) temp.push_back(arr[j++]);
    
    for(int k = left; k <= right; k++) {
        arr[k] = temp[k - left];
    }
    
    return inversions;
}

long long countInversions(vector<int>& arr, int left, int right) {
    if(left >= right) return 0;
    
    int mid = (left + right) / 2;
    long long inv = 0;
    
    inv += countInversions(arr, left, mid);
    inv += countInversions(arr, mid + 1, right);
    inv += merge(arr, left, mid, right);
    
    return inv;
}
```

---

## 12. Cyclic Sort

### 12.1 When to Use

Array contains numbers in range [1, n] or [0, n-1] with possible duplicates/missing.

**Key Problems**:
- Find missing number
- Find all missing numbers  
- Find duplicate number
- Find all duplicates

```cpp
// Place each number at its correct index (arr[i] = i+1)
void cyclicSort(vector<int>& arr) {
    int i = 0;
    while(i < arr.size()) {
        int correctIdx = arr[i] - 1;  // arr[i] belongs at correctIdx
        if(arr[i] != arr[correctIdx]) {
            swap(arr[i], arr[correctIdx]);  // Swap to correct position
        } else {
            i++;  // Already at correct position
        }
    }
}

// After sorting, find missing
int findMissing(vector<int>& arr) {
    cyclicSort(arr);
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] != i + 1) return i + 1;
    }
    return arr.size() + 1;
}
```

---

## 13. 2D Arrays and Matrices

### 13.1 Spiral Order Traversal

```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while(top <= bottom && left <= right) {
        // Right
        for(int i = left; i <= right; i++) result.push_back(matrix[top][i]);
        top++;
        // Down
        for(int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        // Left (if row still exists)
        if(top <= bottom) {
            for(int i = right; i >= left; i--) result.push_back(matrix[bottom][i]);
            bottom--;
        }
        // Up (if column still exists)
        if(left <= right) {
            for(int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    return result;
}
```

### 13.2 Rotate Matrix 90 Degrees

```cpp
// Rotate matrix 90° clockwise — O(n²), O(1) space
void rotate90(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Step 1: Transpose (swap i,j with j,i)
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Step 2: Reverse each row
    for(int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}
```

### 13.3 Set Matrix Zeroes

```cpp
// If element is 0, set its entire row and column to 0 — O(1) space
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;
    
    // Check if first row/col has zeros
    for(int j = 0; j < n; j++) if(matrix[0][j] == 0) firstRowZero = true;
    for(int i = 0; i < m; i++) if(matrix[i][0] == 0) firstColZero = true;
    
    // Use first row/col as markers
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            if(matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Zero out based on markers
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    if(firstRowZero) for(int j = 0; j < n; j++) matrix[0][j] = 0;
    if(firstColZero) for(int i = 0; i < m; i++) matrix[i][0] = 0;
}
```

---

## 14. Bit Manipulation with Arrays

### 14.1 XOR for Finding Missing/Duplicate

```cpp
// Find single non-duplicate in array where all others appear twice
int singleNumber(vector<int>& nums) {
    int result = 0;
    for(int x : nums) result ^= x;  // All pairs cancel, single remains
    return result;
}

// Why XOR works:
// 5 ^ 5 = 0  (same numbers cancel)
// 0 ^ x = x  (XOR with 0 = identity)
// XOR is commutative and associative

// Example: [4, 1, 2, 1, 2]
// 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4 ✓
```

---

## 15. Company-Wise Questions

### 🏢 Google

| Problem | Difficulty | Core Pattern | Link |
|---------|-----------|--------------|------|
| Two Sum | Easy | Hash Map | [LC #1](https://leetcode.com/problems/two-sum/) |
| Container With Most Water | Medium | Two Pointers | [LC #11](https://leetcode.com/problems/container-with-most-water/) |
| Merge Intervals | Medium | Sort + Greedy | [LC #56](https://leetcode.com/problems/merge-intervals/) |
| Trapping Rain Water | Hard | Two Pointers / Stack | [LC #42](https://leetcode.com/problems/trapping-rain-water/) |
| First Missing Positive | Hard | Cyclic Sort | [LC #41](https://leetcode.com/problems/first-missing-positive/) |
| Maximum Product Subarray | Medium | DP + Kadane's | [LC #152](https://leetcode.com/problems/maximum-product-subarray/) |
| Find Minimum in Rotated Sorted Array | Medium | Binary Search | [LC #153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| Spiral Matrix | Medium | Simulation | [LC #54](https://leetcode.com/problems/spiral-matrix/) |

### 🏢 Amazon

| Problem | Difficulty | Core Pattern | Link |
|---------|-----------|--------------|------|
| Two Sum | Easy | Hash Map | [LC #1](https://leetcode.com/problems/two-sum/) |
| Best Time to Buy and Sell Stock | Easy | Kadane's Variant | [LC #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) |
| Maximum Subarray (Kadane's) | Medium | Kadane's | [LC #53](https://leetcode.com/problems/maximum-subarray/) |
| Product of Array Except Self | Medium | Prefix+Suffix | [LC #238](https://leetcode.com/problems/product-of-array-except-self/) |
| Rotate Array | Medium | Reversal | [LC #189](https://leetcode.com/problems/rotate-array/) |
| Subarray Sum Equals K | Medium | Prefix+HashMap | [LC #560](https://leetcode.com/problems/subarray-sum-equals-k/) |
| Trapping Rain Water | Hard | Two Pointers | [LC #42](https://leetcode.com/problems/trapping-rain-water/) |
| Median of Two Sorted Arrays | Hard | Binary Search | [LC #4](https://leetcode.com/problems/median-of-two-sorted-arrays/) |

### 🏢 Microsoft

| Problem | Difficulty | Core Pattern | Link |
|---------|-----------|--------------|------|
| Move Zeroes | Easy | Two Pointers | [LC #283](https://leetcode.com/problems/move-zeroes/) |
| Find All Numbers Disappeared | Easy | Cyclic Sort | [LC #448](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) |
| Maximum Subarray | Medium | Kadane's | [LC #53](https://leetcode.com/problems/maximum-subarray/) |
| Sort Colors (DNF) | Medium | Dutch Flag | [LC #75](https://leetcode.com/problems/sort-colors/) |
| Rotate Image | Medium | Transpose+Reverse | [LC #48](https://leetcode.com/problems/rotate-image/) |
| Jump Game | Medium | Greedy | [LC #55](https://leetcode.com/problems/jump-game/) |
| Set Matrix Zeroes | Medium | In-place | [LC #73](https://leetcode.com/problems/set-matrix-zeroes/) |

### 🏢 Meta (Facebook)

| Problem | Difficulty | Core Pattern | Link |
|---------|-----------|--------------|------|
| Move Zeroes | Easy | Two Pointers | [LC #283](https://leetcode.com/problems/move-zeroes/) |
| 3Sum | Medium | Sort+Two Pointers | [LC #15](https://leetcode.com/problems/3sum/) |
| Maximum Subarray | Medium | Kadane's | [LC #53](https://leetcode.com/problems/maximum-subarray/) |
| Container With Most Water | Medium | Two Pointers | [LC #11](https://leetcode.com/problems/container-with-most-water/) |
| Subarray Sum Equals K | Medium | Prefix+HashMap | [LC #560](https://leetcode.com/problems/subarray-sum-equals-k/) |
| Merge Intervals | Medium | Sort+Greedy | [LC #56](https://leetcode.com/problems/merge-intervals/) |
| Find First and Last Position | Medium | Binary Search | [LC #34](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) |

### 🏢 Adobe

| Problem | Difficulty | Core Pattern | Link |
|---------|-----------|--------------|------|
| Two Sum | Easy | Hash Map | [LC #1](https://leetcode.com/problems/two-sum/) |
| Remove Duplicates (sorted) | Easy | Two Pointers | [LC #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) |
| Maximum Subarray | Medium | Kadane's | [LC #53](https://leetcode.com/problems/maximum-subarray/) |
| Next Permutation | Medium | In-place | [LC #31](https://leetcode.com/problems/next-permutation/) |
| Majority Element | Easy | Moore Voting | [LC #169](https://leetcode.com/problems/majority-element/) |

### 🏢 TCS / Infosys / Wipro (Service Companies)

| Problem | Difficulty | Core Pattern |
|---------|-----------|--------------|
| Find max & min in array | Easy | Linear Scan |
| Reverse an array | Easy | Two Pointers |
| Remove duplicates | Easy | Two Pointers |
| Check if sorted | Easy | Linear Scan |
| Second largest element | Easy | Linear Scan |
| Left rotate array by d | Easy | Reversal |
| Union and Intersection | Easy | Two Pointers |
| Count occurrences | Easy | Linear Scan |

---

## 16. LeetCode Problem List with Approach

### 🟢 EASY (Start here. Master all of these!)

| # | Problem | Approach | Time | Space | Company |
|---|---------|----------|------|-------|---------|
| 1 | Two Sum | Hash Map | O(n) | O(n) | Google, Amazon |
| 26 | Remove Duplicates from Sorted Array | Two Pointers | O(n) | O(1) | Microsoft, Adobe |
| 27 | Remove Element | Two Pointers | O(n) | O(1) | Amazon |
| 35 | Search Insert Position | Binary Search | O(log n) | O(1) | Amazon |
| 53 | Maximum Subarray | Kadane's | O(n) | O(1) | Amazon, Microsoft |
| 66 | Plus One | Array Math | O(n) | O(1) | Amazon, Google |
| 88 | Merge Sorted Array | Two Pointers | O(m+n) | O(1) | Amazon, Microsoft |
| 118 | Pascal's Triangle | DP | O(n²) | O(n²) | Amazon |
| 121 | Best Time to Buy/Sell Stock | Kadane's | O(n) | O(1) | Amazon, Meta |
| 136 | Single Number | XOR | O(n) | O(1) | Amazon, Meta |
| 169 | Majority Element | Moore Voting | O(n) | O(1) | Adobe |
| 217 | Contains Duplicate | Hash Set | O(n) | O(n) | Amazon |
| 283 | Move Zeroes | Two Pointers | O(n) | O(1) | Meta, Microsoft |
| 448 | Find All Disappeared Numbers | Cyclic Sort | O(n) | O(1) | Microsoft |
| 485 | Max Consecutive Ones | Sliding Window | O(n) | O(1) | Facebook |
| 724 | Find Pivot Index | Prefix Sum | O(n) | O(1) | Amazon |

### 🟡 MEDIUM (Core interview level)

| # | Problem | Approach | Time | Space | Company |
|---|---------|----------|------|-------|---------|
| 11 | Container With Most Water | Two Pointers | O(n) | O(1) | Google, Meta |
| 15 | 3Sum | Sort + Two Pointers | O(n²) | O(1) | Meta, Amazon |
| 31 | Next Permutation | In-place | O(n) | O(1) | Adobe |
| 33 | Search in Rotated Sorted Array | Binary Search | O(log n) | O(1) | Amazon, Microsoft |
| 34 | First and Last Position | Binary Search | O(log n) | O(1) | Meta, Amazon |
| 48 | Rotate Image | Transpose+Reverse | O(n²) | O(1) | Microsoft |
| 54 | Spiral Matrix | Simulation | O(m×n) | O(1) | Google, Microsoft |
| 55 | Jump Game | Greedy | O(n) | O(1) | Microsoft, Amazon |
| 56 | Merge Intervals | Sort + Greedy | O(n log n) | O(n) | Google, Meta |
| 73 | Set Matrix Zeroes | In-place | O(m×n) | O(1) | Microsoft |
| 75 | Sort Colors (DNF) | Dutch Flag | O(n) | O(1) | Microsoft, Amazon |
| 152 | Max Product Subarray | DP Variant | O(n) | O(1) | Google, Amazon |
| 153 | Find Min in Rotated | Binary Search | O(log n) | O(1) | Google |
| 189 | Rotate Array | Reversal | O(n) | O(1) | Amazon, Microsoft |
| 238 | Product Except Self | Prefix+Suffix | O(n) | O(1) | Microsoft, Amazon |
| 287 | Find the Duplicate | Floyd's Cycle | O(n) | O(1) | Google, Amazon |
| 334 | Increasing Triplet Subsequence | Greedy | O(n) | O(1) | Amazon |
| 442 | Find All Duplicates | Cyclic Sort | O(n) | O(1) | Amazon |
| 525 | Contiguous Array | Prefix+HashMap | O(n) | O(n) | Meta |
| 560 | Subarray Sum Equals K | Prefix+HashMap | O(n) | O(n) | Meta, Amazon |
| 621 | Task Scheduler | Greedy | O(n) | O(1) | Amazon, Microsoft |

### 🔴 HARD (FAANG + Competitive)

| # | Problem | Approach | Time | Space | Company |
|---|---------|----------|------|-------|---------|
| 4 | Median of Two Sorted Arrays | Binary Search | O(log(m+n)) | O(1) | Amazon, Google |
| 41 | First Missing Positive | Cyclic Sort | O(n) | O(1) | Google |
| 42 | Trapping Rain Water | Two Pointers | O(n) | O(1) | Google, Amazon |
| 84 | Largest Rectangle in Histogram | Stack | O(n) | O(n) | Amazon |
| 85 | Maximal Rectangle | Stack+DP | O(m×n) | O(n) | Amazon |
| 239 | Sliding Window Maximum | Deque | O(n) | O(k) | Amazon, Google |
| 295 | Find Median from Data Stream | Heap | O(log n) | O(n) | Amazon, Google |
| 410 | Split Array Largest Sum | Binary Search | O(n log n) | O(1) | Google |
| 493 | Reverse Pairs | Merge Sort | O(n log n) | O(n) | Amazon |

---

## 17. Common Mistakes & Traps

### ❌ Mistake 1: Off-by-One Error
```cpp
// WRONG: accesses arr[n] which is out of bounds
for(int i = 0; i <= arr.size(); i++) { }

// CORRECT:
for(int i = 0; i < arr.size(); i++) { }
```

### ❌ Mistake 2: Integer Overflow
```cpp
// WRONG: sum can exceed int range if arr values are large
int sum = 0;
for(int x : arr) sum += x;  // Overflow if sum > 2.1 billion!

// CORRECT:
long long sum = 0;
for(int x : arr) sum += x;

// Also in binary search:
int mid = (left + right) / 2;       // WRONG: overflow!
int mid = left + (right - left) / 2; // CORRECT!
```

### ❌ Mistake 3: Stack Overflow from Large Local Array
```cpp
void func() {
    int arr[1000000];  // 4MB on stack → STACK OVERFLOW!
}

// CORRECT:
int arr[1000000];  // Declare globally
// OR
vector<int> arr(1000000);  // Heap allocation
```

### ❌ Mistake 4: Forgetting k % n in Rotation
```cpp
void rotate(vector<int>& arr, int k) {
    // If k=7 and n=5, rotating by 7 = rotating by 2!
    k = k % arr.size();  // ALWAYS do this first!
    // ...
}
```

### ❌ Mistake 5: Not Handling Empty Array
```cpp
int findMax(vector<int>& arr) {
    // WRONG: crashes on empty array!
    int max = arr[0];
    
    // CORRECT:
    if(arr.empty()) return INT_MIN;
    int max = arr[0];
    // ...
}
```

### ❌ Mistake 6: Modifying Array During Iteration
```cpp
// WRONG: erasing while iterating
for(auto it = v.begin(); it != v.end(); it++) {
    if(*it == 5) v.erase(it);  // Iterator invalidated!
}

// CORRECT:
v.erase(remove(v.begin(), v.end(), 5), v.end());
```

### ❌ Mistake 7: Unsigned Size Comparison
```cpp
// WRONG: if v is empty, v.size()-1 wraps around to huge number!
for(int i = 0; i <= v.size() - 1; i++) { }

// CORRECT:
for(int i = 0; i < (int)v.size(); i++) { }
// OR cast size to int when using in arithmetic
```

---

## 18. Interview Strategy

### Step 1: Clarify (2 minutes)
Ask before coding:
- "Is the array sorted?"
- "Can elements be negative?"
- "Can there be duplicates?"
- "What are the constraints on n?" (determines which algorithms are acceptable)
- "Should I optimize for time or space?"

### Step 2: Pattern Recognition
```
Problem mentions...          → Use...
"subarray / substring"       → Sliding Window or Prefix Sum
"sorted array + pair"        → Two Pointers
"all contiguous subarrays"   → Kadane's or Sliding Window
"range updates then queries" → Difference Array
"find missing/duplicate"     → Cyclic Sort or XOR
"k consecutive elements"     → Sliding Window (fixed)
"target sum exists?"         → HashMap or Two Pointers
"0s, 1s, 2s"                → Dutch National Flag
"rotated sorted array"       → Binary Search variant
"matrix / 2D"                → 2D Prefix Sum or Simulation
```

### Step 3: Complexity Ladder
Always show brute force first, then optimize:
```
Problem → Brute Force → Better → Optimal
Two Sum → O(n²)       → O(n log n) → O(n) hashmap
```

### Step 4: Edge Cases Checklist
Before finalizing, always check:
- [ ] Empty array
- [ ] Single element array
- [ ] All same elements
- [ ] All negative numbers
- [ ] k = 0 or k = n
- [ ] Integer overflow risk

### Step 5: Test with Examples
Walk through your solution on the given example AND at least one edge case before saying you're done.

---

## Quick Reference Card

```
PATTERN CHEAT SHEET:
═══════════════════════════════════════════════════════
Prefix Sum:
  Build: prefix[i] = prefix[i-1] + arr[i-1]  (1-indexed)
  Query: sum(L,R) = prefix[R+1] - prefix[L]  (0-indexed)

Sliding Window Fixed:
  Init first window, then: add arr[right], remove arr[right-k]

Sliding Window Variable:
  right expands, left shrinks when condition met

Two Pointers (sorted):
  if sum < target: left++
  if sum > target: right--

Kadane's:
  current = max(arr[i], current + arr[i])
  global  = max(global, current)

Binary Search:
  mid = left + (right - left) / 2  [NOT (l+r)/2]

Dutch National Flag:
  0 → swap(low, mid), low++, mid++
  1 → mid++
  2 → swap(mid, high), high--  [DO NOT mid++]
═══════════════════════════════════════════════════════
```

---

**📝 Notes**: See `02_arrays_mcq_extended.md` for 60+ MCQs  
**💻 Code**: See `02_arrays_solved_problems.md` for full solutions  
**🎯 Practice**: LeetCode arrays tag → sort by frequency

[← Prerequisites: Complexity Analysis](01_complexity.md) | [Next: Strings →](03_strings.md)
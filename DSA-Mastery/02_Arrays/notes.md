# Arrays - Complete Guide

## 📚 How to Use This Module

**Learning Path**:
1. **Read** [notes.md](notes.md) ← You are here
2. **Practice** [practice.md](practice.md) - Solve problems level by level
3. **Check Solutions** [solutions.md](solutions.md) - Only after attempting
4. **Test Yourself** [mcqs.md](mcqs.md) - MCQs for self-assessment
5. **Quick Review** [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md) - 5-minute revision
6. **If Stuck** [If_You_Get_Stuck.md](If_You_Get_Stuck.md) - Problem-solving strategy
7. **Avoid Traps** [Common_Interview_Traps.md](Common_Interview_Traps.md) - Interview mistakes

## Table of Contents


1. [What is an Array?](#1-what-is-an-array)
2. [Memory Representation](#2-memory-representation)
3. [Array Operations & Complexity](#3-array-operations--complexity)
4. [Common Array Patterns](#4-common-array-patterns)
5. [Two Pointers Technique](#5-two-pointers-technique)
6. [Sliding Window Technique](#6-sliding-window-technique)
7. [Prefix Sum Technique](#7-prefix-sum-technique)
8. [Decision Guide (When to Use What)](#8-decision-guide-when-to-use-what)
9. [Pattern Recognition Guide](#9-pattern-recognition-guide)
10. [3-Layer Learning Approach](#10-3-layer-learning-approach)
11. [Pattern Index Table (Quick Revision)](#11-pattern-index-table-quick-revision)
12. [Common Edge Cases in Arrays](#12-common-edge-cases-in-arrays)
13. [Interview Pattern Triggers](#13-interview-pattern-triggers)

---

## 1. What is an Array?

### Simple Definition

**Array** = A collection of elements stored in **contiguous (continuous) memory locations**.

**Real-Life Example**: 
- Egg carton with 12 slots
- All slots are next to each other
- Each slot holds ONE egg
- Slots are numbered 0 to 11

### Key Properties

1. **Fixed Size**: Size decided at creation (in static arrays)
2. **Same Type**: All elements must be same data type
3. **Indexed**: Access using index (0-based in C++)
4. **Contiguous Memory**: Elements stored one after another

### Array Declaration in C++

```cpp
// Static Array (size fixed at compile time)
int arr[5];                    // Uninitialized
int marks[5] = {85, 90, 78, 92, 88};  // Initialized

// Dynamic Array (size decided at runtime) - Use vector!
#include <vector>
vector<int> nums(5);           // Size 5, all zeros
vector<int> v = {1, 2, 3, 4, 5};  // Initialized
```

### Why Arrays are Important?

- **Foundation** for all data structures
- **Fast access** - O(1) to get element by index
- **Cache-friendly** - Contiguous memory = faster
- **Building block** - Strings, matrices, vectors all use arrays

---

## 2. Memory Representation

### How Arrays are Stored in Memory

```cpp
int arr[5] = {10, 20, 30, 40, 50};
```

**Memory Layout**:
```
Index:     0      1      2      3      4
Value:    10     20     30     40     50
Address:  1000   1004   1008   1012   1016  (each int = 4 bytes)
```

**Key Insight**: 
- `arr[i]` address = Base Address + (i × size_of_element)
- `arr[2]` address = 1000 + (2 × 4) = 1008
- This is why access is **O(1)** - direct calculation!

### Visual Representation

```
┌─────────────────────────────────────────┐
│  Memory: 1000   1004   1008   1012  1016│
│           ┌──┐   ┌──┐   ┌──┐   ┌──┐ ┌──┐│
│           │10│   │20│   │30│   │40│ │50││
│           └──┘   └──┘   └──┘   └──┘ └──┘│
│           arr[0] arr[1] arr[2] arr[3]arr[4]
└─────────────────────────────────────────┘

Base address = 1000
Size of int = 4 bytes
```

### Why This Matters?

1. **Fast Access**: Direct formula to find address
2. **Cache Performance**: CPU loads nearby memory (cache line)
3. **Iteration Speed**: Sequential access is fastest

---

## 3. Array Operations & Complexity

### Time Complexity of Operations

| Operation | Syntax | Time Complexity | Notes |
|-----------|--------|----------------|-------|
| Access | `arr[i]` | **O(1)** | Fastest operation |
| Search | Linear scan | **O(n)** | Check each element |
| Insert (end) | `push_back()` | **O(1)** | Amortized |
| Insert (middle) | Shift elements | **O(n)** | Must shift right |
| Delete (end) | `pop_back()` | **O(1)** | Fast |
| Delete (middle) | Shift elements | **O(n)** | Must shift left |

### Detailed Examples

**1. Access - O(1)**:
```cpp
vector<int> arr = {10, 20, 30, 40, 50};
cout << arr[2];  // Direct access = 30 (O(1))
```

**2. Search - O(n)**:
```cpp
// Find if 30 exists
for (int i = 0; i < arr.size(); i++) {
    if (arr[i] == 30) {
        cout << "Found at index " << i;
        break;
    }
}
// Worst case: Check all n elements
```

**3. Insert at End - O(1)**:
```cpp
vector<int> arr = {1, 2, 3};
arr.push_back(4);  // Just add at end (O(1))
// arr = {1, 2, 3, 4}
```

**4. Insert at Middle - O(n)**:
```cpp
vector<int> arr = {1, 2, 3, 4, 5};
// Insert 10 at index 2
arr.insert(arr.begin() + 2, 10);
// Must shift: 3, 4, 5 one position right
// arr = {1, 2, 10, 3, 4, 5}
// Time: O(n) because of shifting
```

### Space Complexity

- **Static Array**: O(n) - Fixed size allocated
- **Dynamic Array (vector)**: O(n) - May allocate extra space for growth
- **2D Array**: O(n × m) - Rows × Columns

---

## 4. Common Array Patterns

### Pattern 1: Linear Traversal

**When to use**: Visit every element once

```cpp
// Print all elements
for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}

// Find sum
int sum = 0;
for (int x : arr) {
    sum += x;
}
```

### Pattern 2: Find Maximum/Minimum

**When to use**: Find largest/smallest element

```cpp
// Find maximum
int maxVal = arr[0];  // Assume first is max
for (int i = 1; i < n; i++) {
    if (arr[i] > maxVal) {
        maxVal = arr[i];
    }
}

// Find minimum
int minVal = arr[0];
for (int i = 1; i < n; i++) {
    if (arr[i] < minVal) {
        minVal = arr[i];
    }
}
```

### Pattern 3: Reverse Array

**When to use**: Reverse order of elements

```cpp
// Two pointer approach - O(n)
int left = 0, right = n - 1;
while (left < right) {
    swap(arr[left], arr[right]);
    left++;
    right--;
}

// Example: [1, 2, 3, 4, 5]
// Step 1: Swap arr[0] and arr[4] → [5, 2, 3, 4, 1]
// Step 2: Swap arr[1] and arr[3] → [5, 4, 3, 2, 1]
// Done!
```

### Pattern 4: Rotate Array

**When to use**: Shift elements by k positions

```cpp
// Right rotate by k
void rotate(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;  // Handle k > n
    
    // Reverse entire array
    reverse(arr.begin(), arr.end());
    // Reverse first k elements
    reverse(arr.begin(), arr.begin() + k);
    // Reverse remaining elements
    reverse(arr.begin() + k, arr.end());
}

// Example: [1, 2, 3, 4, 5], k = 2
// Step 1: Reverse all → [5, 4, 3, 2, 1]
// Step 2: Reverse first 2 → [4, 5, 3, 2, 1]
// Step 3: Reverse rest → [4, 5, 1, 2, 3]
```

### Pattern 5: Frequency Count

**When to use**: Count occurrences of each element

```cpp
// Using array (for small range)
int arr[] = {1, 2, 2, 3, 3, 3, 4};
int freq[100] = {0};  // Assuming values 0-99

for (int x : arr) {
    freq[x]++;
}

// Using hash map (for large range)
unordered_map<int, int> mp;
for (int x : arr) {
    mp[x]++;
}
```

---

## 5. Two Pointers Technique

### What is Two Pointers?

**Idea**: Use two indices to traverse array simultaneously.

**When to use**:
- Array is sorted
- Looking for pairs
- Need to compare elements from both ends
- Remove duplicates

### Pattern 1: Opposite Direction

**Problem**: Find if pair with sum X exists (sorted array)

```cpp
bool hasPairWithSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) return true;
        else if (sum < target) left++;   // Need larger sum
        else right--;                     // Need smaller sum
    }
    
    return false;
}

// Example: [1, 3, 5, 7, 9], target = 12
// left=0 (1), right=4 (9) → sum=10 < 12 → left++
// left=1 (3), right=4 (9) → sum=12 = 12 → Found!
// Time: O(n), Space: O(1)
```

**Why it works**: Array is sorted, so:
- Increasing `left` → larger sum
- Decreasing `right` → smaller sum

**Detailed Dry Run**:
```
Array: [1, 3, 5, 7, 9], target = 12

Iteration 1:
  left = 0 (value: 1)
  right = 4 (value: 9)
  sum = 1 + 9 = 10
  10 < 12 → Need larger sum → left++
  
Iteration 2:
  left = 1 (value: 3)
  right = 4 (value: 9)
  sum = 3 + 9 = 12
  12 == 12 → Found! Return true

Visual:
  [1, 3, 5, 7, 9]
   ↑        ↑
  left    right
  
  [1, 3, 5, 7, 9]
      ↑     ↑
    left   right  → Found!
```

### Pattern 2: Same Direction (Fast & Slow)

**Problem**: Remove duplicates from sorted array

```cpp
int removeDuplicates(vector<int>& arr) {
    if (arr.empty()) return 0;
    
    int slow = 0;  // Points to last unique element
    
    for (int fast = 1; fast < arr.size(); fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    
    return slow + 1;  // Number of unique elements
}

// Example: [1, 1, 2, 2, 3, 4, 4]
// slow=0, fast=1: arr[1]==arr[0] → skip
// slow=0, fast=2: arr[2]!=arr[0] → slow=1, arr[1]=2
// slow=1, fast=3: arr[3]==arr[1] → skip
// slow=1, fast=4: arr[4]!=arr[1] → slow=2, arr[2]=3
// Result: [1, 2, 3, 4, ...]
```

### Pattern 3: Three Pointers (Dutch National Flag)

**Problem**: Sort array of 0s, 1s, and 2s

```cpp
void sortColors(vector<int>& arr) {
    int low = 0, mid = 0, high = arr.size() - 1;
    
    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr[low], arr[mid]);
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {  // arr[mid] == 2
            swap(arr[mid], arr[high]);
            high--;
        }
    }
}

// Example: [2, 0, 2, 1, 1, 0]
// After: [0, 0, 1, 1, 2, 2]
// Time: O(n), Space: O(1)
```

---

## 6. Sliding Window Technique

### What is Sliding Window?

**Idea**: Maintain a "window" that slides through array.

**When to use**:
- Find subarray/substring with certain property
- Problem mentions "contiguous" or "consecutive"
- Brute force uses nested loops

### Pattern 1: Fixed Size Window

**Problem**: Find maximum sum of k consecutive elements

**Brute Force → Optimal Evolution**:

**Brute Force O(n×k)**:
```cpp
// Check every window from scratch
int maxSum = INT_MIN;
for (int i = 0; i <= n - k; i++) {
    int windowSum = 0;
    for (int j = i; j < i + k; j++) {
        windowSum += arr[j];  // Recalculate entire window
    }
    maxSum = max(maxSum, windowSum);
}
// Problem: Redundant calculations!
```

**Optimal O(n)**:
```cpp
int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    
    // Calculate sum of first window
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Slide window
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];  // Add new, remove old
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Example: [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
// Window 1: [1, 4, 2, 10] = 17
// Window 2: [4, 2, 10, 23] = 39 (add 23, remove 1)
// Window 3: [2, 10, 23, 3] = 38 (add 3, remove 4)
// Maximum = 39
// Time: O(n) instead of O(n×k)
```

**Detailed Dry Run**:
```
Array: [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4

Step 1: Calculate first window
  windowSum = 1 + 4 + 2 + 10 = 17
  maxSum = 17

Step 2: Slide window
  i = 4: windowSum = 17 + 23 - 1 = 39
         maxSum = 39
  
  i = 5: windowSum = 39 + 3 - 4 = 38
         maxSum = 39 (no change)
  
  i = 6: windowSum = 38 + 1 - 2 = 37
         maxSum = 39
  
  i = 7: windowSum = 37 + 0 - 10 = 27
         maxSum = 39
  
  i = 8: windowSum = 27 + 20 - 23 = 24
         maxSum = 39

Visual:
  [1, 4, 2, 10, 23, 3, 1, 0, 20]
   ←--- Window 1 ---→ sum=17

  [1, 4, 2, 10, 23, 3, 1, 0, 20]
         ←--- Window 2 ---→ sum=39 ✓ MAX

  [1, 4, 2, 10, 23, 3, 1, 0, 20]
                ←--- Window 3 ---→ sum=38
```

### Pattern 2: Variable Size Window

**Problem**: Find smallest subarray with sum ≥ S

```cpp
int minSubArrayLen(int S, vector<int>& arr) {
    int n = arr.size();
    int left = 0, sum = 0;
    int minLength = INT_MAX;
    
    for (int right = 0; right < n; right++) {
        sum += arr[right];  // Expand window
        
        while (sum >= S) {  // Shrink window
            minLength = min(minLength, right - left + 1);
            sum -= arr[left];
            left++;
        }
    }
    
    return (minLength == INT_MAX) ? 0 : minLength;
}

// Example: S = 7, arr = [2, 3, 1, 2, 4, 3]
// Expand: [2, 3, 1, 2] sum=8 ≥ 7 → minLength=4
// Shrink: [3, 1, 2] sum=6 < 7
// Expand: [3, 1, 2, 4] sum=10 ≥ 7 → minLength=4
// Shrink: [1, 2, 4] sum=7 ≥ 7 → minLength=3
// Shrink: [2, 4] sum=6 < 7
// Expand: [2, 4, 3] sum=9 ≥ 7 → minLength=3
// Answer: 3 (subarray [4, 3])
```

### Sliding Window Template

```cpp
int slidingWindow(vector<int>& arr) {
    int left = 0, right = 0;
    
    while (right < n) {
        // Add arr[right] to window
        
        while (window_is_invalid) {
            // Remove arr[left] from window
            left++;
        }
        
        // Update answer
        right++;
    }
    
    return answer;
}
```

---

## 7. Prefix Sum Technique

### What is Prefix Sum?

**Idea**: Precompute cumulative sums to answer range queries in O(1).

**When to use**:
- Multiple range sum queries
- Find subarray with given sum
- Count subarrays with property

### Basic Prefix Sum

```cpp
// Build prefix sum array
vector<int> buildPrefixSum(vector<int>& arr) {
    int n = arr.size();
    vector<int> prefix(n);
    
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
    
    return prefix;
}

// Range sum query: sum from index L to R
int rangeSum(vector<int>& prefix, int L, int R) {
    if (L == 0) return prefix[R];
    return prefix[R] - prefix[L - 1];
}

// Example: arr = [1, 2, 3, 4, 5]
// prefix = [1, 3, 6, 10, 15]
// sum(1, 3) = prefix[3] - prefix[0] = 10 - 1 = 9 (2+3+4)
```

### Visualization

```
Original:    [1,  2,  3,  4,  5]
Index:        0   1   2   3   4

Prefix Sum:  [1,  3,  6, 10, 15]
              1  1+2 1+2+3 ...

Query sum(1, 3):
= prefix[3] - prefix[0]
= 10 - 1
= 9 (which is 2+3+4) ✓
```

### Advanced: Subarray Sum Equals K

```cpp
int subarraySum(vector<int>& arr, int k) {
    unordered_map<int, int> mp;
    mp[0] = 1;  // Important: handle sum starting from index 0
    
    int sum = 0, count = 0;
    
    for (int x : arr) {
        sum += x;
        
        // If (sum - k) exists, we found subarray(s)
        if (mp.count(sum - k)) {
            count += mp[sum - k];
        }
        
        mp[sum]++;
    }
    
    return count;
}

// Example: arr = [1, 1, 1], k = 2
// i=0: sum=1, look for (1-2)=-1 → not found, mp={0:1, 1:1}
// i=1: sum=2, look for (2-2)=0 → found 1, count=1, mp={0:1, 1:1, 2:1}
// i=2: sum=3, look for (3-2)=1 → found 1, count=2, mp={0:1, 1:1, 2:1, 3:1}
// Answer: 2 subarrays ([1,1] at indices 0-1 and 1-2)
```

---

## 8. Decision Guide (When to Use What)

### Quick Decision Framework

**When you see an array problem:**

```
1. Check if Array is Sorted?
   ↓ YES → Two pointers, Binary search
   ↓ NO  → Can we sort it? (if order doesn't matter)
   
2. Problem asks for subarray/substring?
   ↓ YES → Sliding window, Prefix sum
   ↓ NO  → Continue
   
3. Looking for pairs/triplets?
   ↓ YES → Two pointers, Hash map
   ↓ NO  → Continue
   
4. Need frequency/count?
   ↓ YES → Hash map, Frequency array
   ↓ NO  → Continue
   
5. Multiple range queries?
   ↓ YES → Prefix sum, Segment tree
   ↓ NO  → Simple traversal
```

### Constraint → Approach Mapping Table

| Constraint | Array Size | Allowed Complexity | Typical Approach |
|------------|-----------|-------------------|------------------|
| n ≤ 20 | Tiny | O(2ⁿ), O(n!) | Recursion, backtracking |
| n ≤ 1000 | Small | O(n²) | Nested loops, DP |
| n ≤ 10⁵ | Medium | O(n log n), O(n) | Sorting, two pointers, sliding window |
| n ≤ 10⁶ | Large | O(n), O(n log n) | Linear scan, hashing |
| n ≤ 10⁹ | Huge | O(log n), O(1) | Binary search, math |

### Pattern Selection Guide

| Problem Type | Pattern to Use | Time Complexity |
|--------------|----------------|-----------------|
| Find pair with sum X (sorted) | Two pointers | O(n) |
| Find pair with sum X (unsorted) | Hash map | O(n) |
| Maximum sum subarray of size k | Sliding window (fixed) | O(n) |
| Smallest subarray with sum ≥ S | Sliding window (variable) | O(n) |
| Count subarrays with sum K | Prefix sum + hash map | O(n) |
| Range sum queries | Prefix sum | O(1) per query |
| Remove duplicates (sorted) | Two pointers | O(n) |
| Rotate array | Reverse technique | O(n) |
| Merge sorted arrays | Two pointers | O(n) |
| Find missing number | Math formula / XOR | O(n) |

### Brute Force → Optimization Thinking Flow

**Example Problem**: Find longest subarray with sum ≤ K

**Step 1: Brute Force O(n³)**
```cpp
// Check all subarrays
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        int sum = 0;
        for (int k = i; k <= j; k++) {
            sum += arr[k];
        }
        if (sum <= K) {
            maxLength = max(maxLength, j - i + 1);
        }
    }
}
```

**Step 2: Identify Bottleneck**
- Inner loop recalculates sum from scratch
- Can we avoid this?

**Step 3: Optimize to O(n²)**
```cpp
// Use running sum
for (int i = 0; i < n; i++) {
    int sum = 0;
    for (int j = i; j < n; j++) {
        sum += arr[j];  // Reuse previous sum
        if (sum <= K) {
            maxLength = max(maxLength, j - i + 1);
        }
    }
}
```

**Step 4: Optimize to O(n) with Sliding Window**
```cpp
// If all elements positive, use sliding window
int left = 0, sum = 0;
for (int right = 0; right < n; right++) {
    sum += arr[right];
    
    while (sum > K) {
        sum -= arr[left];
        left++;
    }
    
    maxLength = max(maxLength, right - left + 1);
}
```

---

## 9. Pattern Recognition Guide

### Keyword Triggers

#### Two Pointers:
```
Keywords: "sorted array", "pair", "two sum", "reverse", "palindrome"
Concepts: Opposite direction, fast-slow, merge
```

#### Sliding Window:
```
Keywords: "subarray", "substring", "contiguous", "consecutive", "longest", "shortest"
Concepts: Fixed size, variable size, expand-shrink
```

#### Prefix Sum:
```
Keywords: "range sum", "sum query", "subarray sum", "cumulative"
Concepts: Precomputation, hash map with prefix sum
```

#### Hash Map:
```
Keywords: "frequency", "count", "duplicate", "unique", "first occurrence"
Concepts: Store index/count, O(1) lookup
```

### Decision Flowchart

```
Array problem
    ↓
Is it sorted?
    ↓ YES → Two pointers or Binary search
    ↓ NO
    ↓
Looking for subarray?
    ↓ YES → Sliding window or Prefix sum
    ↓ NO
    ↓
Need fast lookup?
    ↓ YES → Hash map
    ↓ NO
    ↓
Simple traversal O(n)
```

---

## 10. 3-Layer Learning Approach

### How This Module is Structured

#### Layer 1: Beginner Layer (What & How)
- **Goal**: Understand array basics and operations
- **Focus**: Syntax, traversal, simple problems
- **Example**: 
  ```cpp
  // Traverse and print
  for (int i = 0; i < n; i++) {
      cout << arr[i] << " ";
  }
  ```

#### Layer 2: Intermediate Layer (Why & When)
- **Goal**: Master two pointers, sliding window, prefix sum
- **Focus**: Pattern recognition, when to use which technique
- **Example**:
  ```cpp
  // Recognize: sorted array + find pair → Two pointers
  int left = 0, right = n - 1;
  while (left < right) {
      // Logic here
  }
  ```

#### Layer 3: Advanced Layer (Edge Cases & Tricks)
- **Goal**: Solve complex problems, optimize solutions
- **Focus**: Multiple techniques combined, interview problems
- **Example**:
  ```cpp
  // Combine prefix sum + hash map
  unordered_map<int, int> mp;
  mp[0] = 1;  // Edge case handling
  ```

### Self-Assessment Checklist

**Beginner Level**:
- [ ] Can declare and initialize arrays
- [ ] Can traverse arrays (for loop, range-based)
- [ ] Can find max/min element
- [ ] Understand O(1) access

**Intermediate Level**:
- [ ] Can implement two pointers
- [ ] Can solve sliding window problems
- [ ] Can build and use prefix sum
- [ ] Choose right technique for problem

**Advanced Level**:
- [ ] Combine multiple techniques
- [ ] Optimize from O(n²) to O(n)
- [ ] Handle all edge cases
- [ ] Solve interview-level problems

---

## 11. Pattern Index Table (Quick Revision)

### Quick Reference for All Array Patterns

| Pattern | When to Use | Time | Space | Key Idea | Example Problems |
|---------|-------------|------|-------|----------|------------------|
| **Linear Scan** | Visit all elements | O(n) | O(1) | Simple loop | Find max, sum, count |
| **Two Pointers (Opposite)** | Sorted array, find pairs | O(n) | O(1) | left=0, right=n-1 | Two Sum, palindrome |
| **Two Pointers (Same)** | Remove duplicates, inplace | O(n) | O(1) | slow & fast pointers | Remove duplicates |
| **Three Pointers** | Partition into 3 groups | O(n) | O(1) | low, mid, high | Sort 0s,1s,2s |
| **Sliding Window (Fixed)** | Subarray of size k | O(n) | O(1) | Add new, remove old | Max sum subarray size k |
| **Sliding Window (Variable)** | Longest/shortest subarray | O(n) | O(1) | Expand & shrink | Min size subarray sum |
| **Prefix Sum** | Range sum queries | O(1)/query | O(n) | Precompute cumulative sums | Range sum, subarray sum |
| **Prefix Sum + Hash Map** | Subarray with sum K | O(n) | O(n) | Store prefix sum frequencies | Count subarrays sum K |
| **Kadane's Algorithm** | Maximum subarray sum | O(n) | O(1) | Reset if sum < 0 | Max subarray sum |
| **Hash Map** | Fast lookup, frequency | O(n) | O(n) | O(1) average lookup | Two Sum (unsorted) |
| **Sorting + Two Pointers** | Triplets, close sums | O(n log n) | O(1) | Sort first, then pointers | 3Sum, 3Sum Closest |

### Pattern Decision Tree

```
Problem mentions:

"Sorted array" + "find pair" 
    → Two Pointers (Opposite)

"Subarray" + "longest/shortest"
    → Sliding Window (Variable)

"Subarray" + "size k"
    → Sliding Window (Fixed)

"Range sum" + "multiple queries"
    → Prefix Sum

"Subarray sum equals K"
    → Prefix Sum + Hash Map

"Maximum subarray sum"
    → Kadane's Algorithm

"Remove duplicates" + "in-place"
    → Two Pointers (Same)

"Find frequency/count"
    → Hash Map

"Triplet/three elements"
    → Sort + Two Pointers
```

---

## 12. Common Edge Cases in Arrays

### Categorized Edge Cases

#### Category 1: Array Size Edge Cases

**1. Empty Array (n = 0)**
```cpp
if (arr.empty()) {
    // Handle appropriately
    return 0;  // or -1, or throw error
}
```
**Common Mistake**: Accessing arr[0] without checking if array is empty → **Runtime Error**

**2. Single Element (n = 1)**
```cpp
if (n == 1) {
    // Often the answer is arr[0] itself
    return arr[0];
}
```
**Common Mistake**: Loop starts from i=1, misses the only element

**3. Two Elements (n = 2)**
```cpp
// Special behavior in some problems
// e.g., in two pointers, left=0, right=1, loop runs once
```

#### Category 2: Value-Based Edge Cases

**4. All Elements Same**
```
Example: [5, 5, 5, 5]
Issues: Duplicate removal, finding pairs
```

**5. All Negative Numbers**
```
Example: [-5, -3, -8, -1]
Issues: 
- Kadane's algorithm (don't reset to 0)
- Maximum sum problems
- Comparisons with 0
```

**6. All Zeros**
```
Example: [0, 0, 0, 0]
Issues:
- Division by zero
- Product becomes 0
- Sliding window with sum
```

**7. Mix of Positive and Negative**
```
Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Issues:
- Prefix sum can decrease
- Sliding window may not work (need all positive)
```

#### Category 3: Index-Related Edge Cases

**8. Out of Bounds Access**
```cpp
// WRONG ❌
for (int i = 0; i <= n; i++) {  // Should be i < n
    cout << arr[i];  // Crashes at i = n
}

// CORRECT ✅
for (int i = 0; i < n; i++) {
    cout << arr[i];
}
```

**9. Off-by-One Errors**
```cpp
// Last element index is n-1, NOT n
arr[n-1]  // ✓ Last element
arr[n]    // ✗ Out of bounds!

// In two pointers
int left = 0, right = n - 1;  // ✓ Correct
int left = 1, right = n;      // ✗ Wrong!
```

**10. Negative Indices**
```cpp
// C++ doesn't support negative indices like Python
arr[-1]  // ✗ Undefined behavior!
```

#### Category 4: Overflow & Underflow

**11. Integer Overflow**
```cpp
// Sum can overflow
int sum = 0;
for (int x : arr) {
    sum += x;  // May overflow if sum > 2×10⁹
}

// FIX: Use long long
long long sum = 0;
```

**12. Multiplication Overflow**
```cpp
// Product grows very fast
long long product = 1;
for (int x : arr) {
    product *= x;  // Overflows quickly!
}
```

#### Category 5: Duplicate Handling

**13. Duplicate Elements**
```cpp
// In problems asking for unique pairs/triplets
// Must skip duplicates to avoid counting same answer

// Example in 3Sum:
if (i > 0 && arr[i] == arr[i-1]) continue;  // Skip duplicates
```

**14. Multiple Occurrences of Target**
```cpp
// Should you return first, last, or all occurrences?
// Clarify in interviews!
```

#### Category 6: Special Values

**15. Large Values (10⁹)**
```cpp
// Use appropriate data types
int → max 2×10⁹
long long → max 9×10¹⁸
```

**16. INT_MIN and INT_MAX**
```cpp
#include <climits>

// Initializing min/max
int maxVal = INT_MIN;  // Not 0!
int minVal = INT_MAX;  // Not 0!
```

### Edge Case Checklist

Before submitting any solution, check:
- [ ] Empty array?
- [ ] Single element?
- [ ] All same elements?
- [ ] All negative?
- [ ] All zeros?
- [ ] Already sorted?
- [ ] Reverse sorted?
- [ ] Contains duplicates?
- [ ] Very large values (overflow)?
- [ ] Index out of bounds?

---

## 13. Interview Pattern Triggers

### How to Instantly Recognize Which Pattern to Use

#### Trigger 1: "Sorted Array" Keywords

**Keywords**: "sorted", "non-decreasing", "in order"

**Immediate Thought**: Two Pointers or Binary Search

**Examples**:
- "Find pair with sum X in sorted array" → **Two Pointers**
- "Find first/last occurrence" → **Binary Search**
- "Search in rotated sorted array" → **Modified Binary Search**

**Code Template**:
```cpp
int left = 0, right = n - 1;
while (left < right) {
    // Logic based on problem
    if (condition) left++;
    else right--;
}
```

#### Trigger 2: "Subarray/Substring" Keywords

**Keywords**: "subarray", "substring", "contiguous", "consecutive"

**Immediate Thought**: Sliding Window or Prefix Sum

**Decision**:
- Looking for longest/shortest? → **Sliding Window (Variable)**
- Fixed size mentioned? → **Sliding Window (Fixed)**
- Sum/product queries? → **Prefix Sum**
- Count subarrays with property? → **Prefix Sum + Hash Map**

**Code Template**:
```cpp
// Variable size window
int left = 0;
for (int right = 0; right < n; right++) {
    // Add arr[right]
    while (invalid_condition) {
        // Remove arr[left]
        left++;
    }
    // Update answer
}
```

#### Trigger 3: "Maximum/Minimum Subarray" Keywords

**Keywords**: "maximum subarray", "largest sum", "minimum sum"

**Immediate Thought**: Kadane's Algorithm

**Examples**:
- "Maximum sum subarray" → **Kadane's**
- "Maximum product subarray" → **Modified Kadane's** (track min too)

**Code Template**:
```cpp
int maxSum = INT_MIN, currentSum = 0;
for (int x : arr) {
    currentSum += x;
    maxSum = max(maxSum, currentSum);
    if (currentSum < 0) currentSum = 0;
}
```

#### Trigger 4: "Pairs/Triplets" Keywords

**Keywords**: "pair", "triplet", "two elements", "three elements"

**Immediate Thought**: Two Pointers or Hash Map

**Decision**:
- Array sorted? → **Two Pointers**
- Array unsorted? → **Hash Map**
- Need all unique triplets? → **Sort + Two Pointers + Skip Duplicates**

**Code Template**:
```cpp
// For triplets
sort(arr.begin(), arr.end());
for (int i = 0; i < n - 2; i++) {
    if (i > 0 && arr[i] == arr[i-1]) continue;  // Skip duplicates
    int left = i + 1, right = n - 1;
    while (left < right) {
        // Two pointer logic
    }
}
```

#### Trigger 5: "Range Query" Keywords

**Keywords**: "range sum", "query", "multiple queries", "between indices"

**Immediate Thought**: Prefix Sum or Segment Tree

**Decision**:
- Static array (no updates)? → **Prefix Sum**
- Array updates between queries? → **Segment Tree / Fenwick Tree**

**Code Template**:
```cpp
// Prefix sum
vector<int> prefix(n);
prefix[0] = arr[0];
for (int i = 1; i < n; i++) {
    prefix[i] = prefix[i-1] + arr[i];
}

// Query sum(L, R)
int sum = prefix[R] - (L > 0 ? prefix[L-1] : 0);
```

#### Trigger 6: "In-place" Keywords

**Keywords**: "in-place", "without extra space", "O(1) space"

**Immediate Thought**: Two Pointers or Swap Technique

**Examples**:
- "Move zeros to end" → **Two Pointers**
- "Remove duplicates" → **Two Pointers (slow/fast)**
- "Rotate array" → **Reverse technique**

**Code Template**:
```cpp
int slow = 0;
for (int fast = 0; fast < n; fast++) {
    if (should_keep(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
}
```

#### Trigger 7: "Frequency/Count" Keywords

**Keywords**: "count", "frequency", "how many times", "occurrences"

**Immediate Thought**: Hash Map or Frequency Array

**Decision**:
- Small range (0-100)? → **Frequency Array**
- Large range? → **Hash Map**

**Code Template**:
```cpp
// Hash map
unordered_map<int, int> freq;
for (int x : arr) {
    freq[x]++;
}

// Frequency array (if values 0-100)
int freq[101] = {0};
for (int x : arr) {
    freq[x]++;
}
```

### Pattern Recognition Speed Drill

**Practice recognizing patterns in 5 seconds:**

1. "Longest subarray with sum ≤ K" → **Sliding Window**
2. "Find if pair exists in sorted array" → **Two Pointers**
3. "Count subarrays with sum K" → **Prefix Sum + Hash Map**
4. "Maximum sum subarray" → **Kadane's**
5. "Remove duplicates in-place" → **Two Pointers**
6. "Range sum queries" → **Prefix Sum**
7. "3Sum" → **Sort + Two Pointers**
8. "Container with most water" → **Two Pointers**
9. "Product of array except self" → **Prefix/Suffix Product**
10. "Trapping rain water" → **Two Pointers / DP**

---

## 🧠 Active Recall Questions

**Instructions**: Answer these WITHOUT looking at the notes. Test your memory!

### Array Basics
1. Why is array access O(1)? Explain with memory addresses.
2. What's the difference between static array and vector?
3. Why is insertion in middle O(n)?

### Two Pointers
4. When can you use two pointers technique?
5. What's the difference between opposite direction and same direction?
6. How do you remove duplicates from sorted array in O(1) space?

### Sliding Window
7. When should you use sliding window vs brute force?
8. What's the difference between fixed and variable size window?
9. How do you know when to shrink the window?

### Prefix Sum
10. How does prefix sum make range queries O(1)?
11. Why do we initialize `mp[0] = 1` in subarray sum problems?
12. How do you find subarray with sum = K using prefix sum?

### Pattern Recognition
13. You see "longest subarray with sum ≤ K" → What pattern?
14. You see "sorted array, find pair" → What pattern?
15. You see "multiple range sum queries" → What pattern?

### Edge Cases
16. What edge cases should you check for empty arrays?
17. How do you handle array with all negative numbers in sliding window?
18. What if k > array size in sliding window?

---

**Check Your Answers**: After attempting, review the relevant sections in this file or check [solutions.md](solutions.md)

---

## 🎯 Quick Navigation

**Need to...**
- Learn concepts? → You're in [notes.md](notes.md) ✓
- Practice problems? → Go to [practice.md](practice.md)
- Check solutions? → Go to [solutions.md](solutions.md)
- Test yourself? → Go to [mcqs.md](mcqs.md)
- Quick revision? → Go to [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md)
- Feeling stuck? → Go to [If_You_Get_Stuck.md](If_You_Get_Stuck.md)
- Prepare for interview? → Go to [Common_Interview_Traps.md](Common_Interview_Traps.md)

---

**Master arrays before moving to Strings! They're the foundation of DSA! 🚀**

**Next Topic**: After completing all practice problems and scoring 80%+ on MCQs, move to [03_Strings](../03_Strings/notes.md)

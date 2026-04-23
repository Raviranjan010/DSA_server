# Pattern Recognition & Tricks — Complete Guide

> **Master the art of identifying patterns instantly**

---

## 🎯 Part 1: Pattern Recognition Guide

### Keywords → Pattern Mapping Table

| Keywords in Problem | Pattern to Use | Time Complexity |
|---------------------|----------------|-----------------|
| "sorted array" + "pair" | Two Pointer | O(n) |
| "sorted array" + "find" | Binary Search | O(log n) |
| "subarray" + "sum" | Prefix Sum / Sliding Window | O(n) |
| "subarray" + "maximum" | Kadane's Algorithm | O(n) |
| "longest" + "consecutive" | Sliding Window | O(n) |
| "range sum query" | Prefix Sum | O(1) per query |
| "contiguous" + "product" | Kadane's (modified) | O(n) |
| "rotate" + "array" | Reverse technique | O(n) |
| "remove" + "in-place" | Two Pointer (fast/slow) | O(n) |
| "duplicates" + "sorted" | Two Pointer | O(n) |
| "palindrome" | Two Pointer (both ends) | O(n) |
| "partition" + "0,1,2" | Dutch National Flag | O(n) |
| "minimize" + "maximize" | Binary Search on Answer | O(n log n) |
| "frequency" + "count" | Hash Map + Array | O(n) |
| "missing number" | Math / XOR | O(n) |
| "majority element" | Boyer-Moore Voting | O(n) |

---

### Decision Flowchart

```
Read Problem
    ↓
Is array sorted?
├─ YES → Looking for element?
│  ├─ YES → Binary Search
│  └─ NO → Looking for pairs?
│     └─ YES → Two Pointer
│
└─ NO → Problem mentions "subarray"?
   ├─ YES → Need maximum sum?
   │  ├─ YES → Kadane's Algorithm
   │  └─ NO → Need specific sum?
   │     ├─ YES → Prefix Sum + Hash Map
   │     └─ NO → Longest/shortest?
   │        └─ YES → Sliding Window
   │
   └─ NO → Need to modify in-place?
      ├─ YES → Remove/filter?
      │  └─ YES → Two Pointer (fast/slow)
      │
      └─ NO → Count frequencies?
         └─ YES → Hash Map

```

---

## 🧠 Part 2: Tricks & Shortcuts

### Trick 1: Sum of First N Numbers
```cpp
// Instead of loop
int sum = 0;
for(int i = 1; i <= n; i++) {
    sum += i;
}

// Use formula
int sum = n * (n + 1) / 2;  // O(1)!
```

### Trick 2: Swap Without Temporary Variable
```cpp
// XOR swap
a = a ^ b;
b = a ^ b;
a = a ^ b;

// BUT: Just use std::swap (cleaner)
swap(a, b);
```

### Trick 3: Check if Number is Power of 2
```cpp
// O(1) trick
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

### Trick 4: Count Set Bits
```cpp
// Brian Kernighan's Algorithm
int countSetBits(int n) {
    int count = 0;
    while(n > 0) {
        n = n & (n - 1);  // Removes rightmost set bit
        count++;
    }
    return count;
}
```

### Trick 5: Find Missing Number
```cpp
// XOR method (no overflow)
int findMissing(vector<int>& nums) {
    int xor1 = 0, xor2 = 0;
    int n = nums.size();
    
    for(int i = 0; i < n; i++) {
        xor1 ^= nums[i];
        xor2 ^= (i + 1);
    }
    xor2 ^= (n + 1);  // Last number
    
    return xor1 ^ xor2;
}
```

### Trick 6: Reverse Array In-Place
```cpp
// Two pointer approach
void reverse(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while(left < right) {
        swap(arr[left++], arr[right--]);
    }
}
```

### Trick 7: Rotate Array by K
```cpp
// Reversal algorithm
void rotate(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;
    
    reverse(arr, 0, n - 1);      // Reverse entire array
    reverse(arr, 0, k - 1);      // Reverse first k
    reverse(arr, k, n - 1);      // Reverse remaining
}
```

### Trick 8: Find Duplicate in Array
```cpp
// Floyd's Cycle Detection (if numbers are 1 to n)
int findDuplicate(vector<int>& nums) {
    int slow = nums[0];
    int fast = nums[0];
    
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while(slow != fast);
    
    slow = nums[0];
    while(slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}
```

---

## 📚 Part 3: Edge Cases Library

### Essential Edge Cases to Always Check

#### 1. Empty Input
```cpp
if(arr.empty() || n == 0) {
    return 0;  // or appropriate default
}
```

#### 2. Single Element
```cpp
if(n == 1) {
    return arr[0];  // Handle separately
}
```

#### 3. All Elements Same
```cpp
// Test with: [5, 5, 5, 5, 5]
// Your solution should still work!
```

#### 4. Already Sorted
```cpp
// Test with: [1, 2, 3, 4, 5]
```

#### 5. Reverse Sorted
```cpp
// Test with: [5, 4, 3, 2, 1]
```

#### 6. All Zeros
```cpp
// Test with: [0, 0, 0, 0]
```

#### 7. All Negatives
```cpp
// Test with: [-5, -3, -1, -2]
// Common issue: max initialized to 0!
```

#### 8. Integer Overflow
```cpp
// Use long long for sums
long long sum = 0;
for(int x : arr) {
    sum += x;
}
```

#### 9. Minimum/Maximum Values
```cpp
// Test with: [INT_MIN, INT_MAX]
// Check for overflow in calculations
```

#### 10. Large Input
```cpp
// Test with: n = 10^5 or 10^6
// Ensure O(n) or O(n log n) solution
// O(n²) will TLE!
```

---

## 🔍 Part 4: Debugging Guide

### Systematic Debugging Approach

#### Step 1: Read Error Message
- Segmentation fault → Out of bounds access
- Wrong answer → Logic error
- TLE → Wrong complexity
- MLE → Too much memory

#### Step 2: Test with Examples
```cpp
// Add test cases
void test() {
    // Example from problem
    assert(solution({1, 2, 3}) == expected);
    
    // Edge cases
    assert(solution({}) == base_case);
    assert(solution({1}) == single_element);
}
```

#### Step 3: Add Debug Prints
```cpp
cout << "Array: ";
for(int x : arr) cout << x << " ";
cout << endl;

cout << "Left: " << left << ", Right: " << right << endl;
cout << "Current answer: " << ans << endl;
```

#### Step 4: Trace on Paper
- Draw array
- Track pointer positions
- Write variable values at each step
- Compare with expected behavior

#### Step 5: Rubber Duck Debugging
- Explain your code line by line
- Often you'll find the bug yourself!

---

## 💡 Part 5: Quick Reference Cards

### Card 1: Two Pointer Template
```cpp
// Opposite direction
int l = 0, r = n - 1;
while(l < r) {
    if(condition) {
        // Found or process
    } else if(need_larger) {
        l++;
    } else {
        r--;
    }
}
```

### Card 2: Sliding Window Template
```cpp
// Variable window
int l = 0, sum = 0;
for(int r = 0; r < n; r++) {
    sum += arr[r];  // Expand
    
    while(sum > target) {  // Shrink
        sum -= arr[l];
        l++;
    }
    
    ans = max(ans, r - l + 1);
}
```

### Card 3: Binary Search Template
```cpp
int l = 0, r = n - 1;
while(l <= r) {
    int mid = l + (r - l) / 2;
    if(arr[mid] == target) return mid;
    else if(arr[mid] < target) l = mid + 1;
    else r = mid - 1;
}
return -1;
```

### Card 4: Kadane's Template
```cpp
int currentSum = arr[0];
int maxSum = arr[0];
for(int i = 1; i < n; i++) {
    currentSum = max(arr[i], currentSum + arr[i]);
    maxSum = max(maxSum, currentSum);
}
return maxSum;
```

---

## 🎯 Optimization Thinking Framework

### When you see O(n²) solution, ask:

1. **Can I sort first?**
   - Sorting → O(n log n)
   - Then use two pointer → O(n)
   - Total: O(n log n)

2. **Can I use extra space?**
   - Hash map → O(n) space
   - Reduces time to O(n)

3. **Can I use sliding window?**
   - If subarray problem → O(n)

4. **Can I use prefix sum?**
   - If range sum query → O(1) per query

5. **Can I use binary search?**
   - If sorted or monotonic → O(log n)

---

## 📊 Pattern Frequency in Interviews

| Pattern | Frequency | Must Know? |
|---------|-----------|------------|
| Two Pointer | 85% | ✅ YES |
| Sliding Window | 75% | ✅ YES |
| Binary Search | 80% | ✅ YES |
| Prefix Sum | 60% | ✅ YES |
| Kadane's | 55% | ✅ YES |
| Hash Map + Array | 70% | ✅ YES |
| Sorting + Array | 65% | ✅ YES |

---

## 🚀 Final Tips

1. **Practice pattern recognition** - Do 50+ problems
2. **Memorize templates** - Code them from memory
3. **Draw before coding** - Visualize the solution
4. **Test edge cases** - Always!
5. **Explain your approach** - Interviewers care about thinking
6. **Start brute force** - Then optimize
7. **Time yourself** - Build speed

---

**Remember**: Pattern recognition comes with practice, not talent!

[← Back to README](../README.md)

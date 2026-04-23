# Binary Search on Arrays — Complete Guide

> **What You'll Learn**: Binary search on index, answer, rotated arrays, bounds  
> **Prerequisites**: Array Basics, Complexity Analysis  
> **Time Required**: 3-4 hours

---

## 1. 📌 Definition

**Binary Search** finds an element in a **sorted array** in O(log n) time by repeatedly dividing the search space in half.

**Core Idea**: If array is sorted, eliminate half the elements at each step!

---

## 2. 🌍 Real-World Analogy

### Analogy 1: Dictionary Search 📖

Looking for word "monkey" in dictionary:
- Open to middle → see "laptop"
- "monkey" comes after "laptop" → ignore first half
- Open middle of second half → see "ocean"
- "monkey" comes before "ocean" → ignore second half
- Continue until found!

### Analogy 2: Guessing Game 🎯

"I'm thinking of a number between 1-100"
- Guess 50 → "Too high!"
- Now you know it's 1-49
- Guess 25 → "Too low!"
- Now you know it's 26-49
- Each guess eliminates half the possibilities!

---

## 3. 🎨 Visual Diagram

### Binary Search Execution

```
Array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
Target: 23
Indices: 0   1   2   3   4   5   6   7   8   9   10

Step 1: left=0, right=10, mid=5
        arr[5] = 23 == target ✓ FOUND!

Array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
Target: 12
Indices: 0   1   2   3   4   5   6   7   8   9   10

Step 1: left=0, right=10, mid=5
        arr[5] = 23 > 12 → target is in LEFT half
        right = mid - 1 = 4

Step 2: left=0, right=4, mid=2
        arr[2] = 8 < 12 → target is in RIGHT half
        left = mid + 1 = 3

Step 3: left=3, right=4, mid=3
        arr[3] = 12 == target ✓ FOUND!
```

---

## 4. 🔑 Pattern Recognition Keywords

**Look for these words in problems**:
- "Sorted array"
- "Find element"
- "Search"
- "Lower bound" / "Upper bound"
- "First/last occurrence"
- "Peak element"
- "Rotated sorted array"
- "Minimize/Maximize" (binary search on answer)

---

## 5. 📋 Template Code

### Template 1: Basic Binary Search

```cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow
        
        if(arr[mid] == target) {
            return mid;  // Found!
        } else if(arr[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }
    
    return -1;  // Not found
}
```

### Template 2: Lower Bound (First element ≥ target)

```cpp
int lowerBound(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    int ans = arr.size();
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] >= target) {
            ans = mid;
            right = mid - 1;  // Try to find earlier occurrence
        } else {
            left = mid + 1;
        }
    }
    
    return ans;
}
```

---

## 6. 🔍 Step-by-Step Example

### Problem: Binary Search

```cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left <= right) {
        // Calculate mid (avoids overflow)
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) {
            return mid;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

int main() {
    vector<int> arr = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    int target = 23;
    
    int result = binarySearch(arr, target);
    
    if(result != -1) {
        cout << "Found at index " << result << endl;  // 5
    } else {
        cout << "Not found!" << endl;
    }
    
    return 0;
}
```

**Dry Run** (searching for 12):
```
Array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
        L                    M                    R

Iteration 1:
  left = 0, right = 10
  mid = 0 + (10-0)/2 = 5
  arr[5] = 23
  23 > 12 → go LEFT
  right = 5 - 1 = 4

Iteration 2:
  left = 0, right = 4
  mid = 0 + (4-0)/2 = 2
  arr[2] = 8
  8 < 12 → go RIGHT
  left = 2 + 1 = 3

Iteration 3:
  left = 3, right = 4
  mid = 3 + (4-3)/2 = 3
  arr[3] = 12
  12 == 12 ✓ FOUND!
  Return index 3
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Overflow in Mid Calculation
```cpp
// WRONG: Can overflow for large indices
int mid = (left + right) / 2;

// CORRECT: Safe from overflow
int mid = left + (right - left) / 2;
```

### Mistake 2: Wrong Loop Condition
```cpp
// WRONG: Misses single element case
while(left < right) {

// CORRECT: Include equality
while(left <= right) {
```

### Mistake 3: Infinite Loop
```cpp
// WRONG: May not converge
if(arr[mid] < target) {
    left = mid;  // Should be mid + 1!
}

// CORRECT: Always move past mid
if(arr[mid] < target) {
    left = mid + 1;
} else {
    right = mid - 1;
}
```

### Mistake 4: Not Handling Empty Array
```cpp
// WRONG: Will crash on empty array
int right = arr.size() - 1;  // -1 for empty array!

// CORRECT: Check first
if(arr.empty()) return -1;
```

---

## 8. ⏱️ Time & Space Complexity

| Variant | Time | Space | Reasoning |
|---------|------|-------|-----------|
| **Binary Search** | **O(log n)** | **O(1)** | Halve search space each step |
| **Linear Search** | O(n) | O(1) | Check each element |
| **Recursive BS** | O(log n) | O(log n) | Call stack depth |

**Why O(log n)?**
- Each step: n → n/2 → n/4 → ... → 1
- Number of steps = log₂(n)
- Example: 1024 elements → 10 steps (2¹⁰ = 1024)

---

## 9. 📝 Pattern Variations

### Variation 1: Search in Rotated Sorted Array

```cpp
#include <iostream>
#include <vector>
using namespace std;

int searchRotated(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] == target) return mid;
        
        // Determine which half is sorted
        if(nums[left] <= nums[mid]) {
            // Left half is sorted
            if(nums[left] <= target && target < nums[mid]) {
                right = mid - 1;  // Target in left half
            } else {
                left = mid + 1;   // Target in right half
            }
        } else {
            // Right half is sorted
            if(nums[mid] < target && target <= nums[right]) {
                left = mid + 1;   // Target in right half
            } else {
                right = mid - 1;  // Target in left half
            }
        }
    }
    
    return -1;
}
```

### Variation 2: Binary Search on Answer (Optimization)

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Example: Find minimum divisor to get sum ≤ threshold
bool canDivide(vector<int>& nums, int divisor, int threshold) {
    int sum = 0;
    for(int num : nums) {
        sum += (num + divisor - 1) / divisor;  // Ceiling division
    }
    return sum <= threshold;
}

int smallestDivisor(vector<int>& nums, int threshold) {
    int left = 1;
    int right = 1000000;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(canDivide(nums, mid, threshold)) {
            right = mid;  // Try smaller divisor
        } else {
            left = mid + 1;  // Need larger divisor
        }
    }
    
    return left;
}
```

---

## 10. 💡 Pro Tips

1. **Always use** `left + (right - left) / 2` for mid
2. **Loop condition**: `left <= right` for standard search
3. **Movement**: Always `mid + 1` or `mid - 1` (never just `mid`)
4. **Sorted array required** — Or can be made sorted
5. **Binary search on answer** — When optimizing a value
6. **Handle edge cases** — Empty array, single element

---

## 11. 🎯 When to Use Binary Search

✅ **Use when**:
- Array is sorted (or can be sorted)
- Looking for specific element
- Need first/last occurrence
- Optimization problem (minimize/maximize)
- Search space can be halved
- Rotated sorted array

❌ **Don't use when**:
- Array is unsorted (use hash map or linear search)
- Need to find all occurrences (use two pointers after finding one)
- Elements change frequently (array not static)
- Small arrays (linear search is faster due to overhead)

---

## 12. 📚 Practice Problems

### Easy (Start Here)
1. Binary Search (LeetCode 704)
2. Search Insert Position (LeetCode 35)
3. Sqrt(x) (LeetCode 69)
4. First Bad Version (LeetCode 278)
5. Find Smallest Letter Greater Than Target (LeetCode 744)

### Medium
1. Find First and Last Position (LeetCode 34)
2. Search in Rotated Sorted Array (LeetCode 33)
3. Find Peak Element (LeetCode 162)
4. Capacity To Ship Packages (LeetCode 1011)
5. Koko Eating Bananas (LeetCode 875)

### Hard
1. Median of Two Sorted Arrays (LeetCode 4)
2. Find in Mountain Array (LeetCode 1095)
3. Aggressive Cows (GFG/SPOJ)

---

## 13. 🎯 Key Takeaways

1. Binary search requires **sorted array**
2. **Time complexity**: O(log n) — extremely fast!
3. **Mid formula**: `left + (right - left) / 2`
4. **Loop condition**: `left <= right`
5. **Always move past mid**: `mid + 1` or `mid - 1`
6. **Binary search on answer** — Powerful optimization technique
7. **Rotated arrays** — Determine which half is sorted
8. **Lower/Upper bound** — Find first/last occurrences

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Problems →](Problems/Easy.md)

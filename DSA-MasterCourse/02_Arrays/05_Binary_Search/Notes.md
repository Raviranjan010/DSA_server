# Binary Search on Arrays — Complete Striver-Style Guide

> **What You'll Learn**: Binary search on index, answer, rotated arrays, bounds, 2D arrays  
> **Prerequisites**: Array Basics, Complexity Analysis  
> **Time Required**: 8-10 hours  
> **Difficulty**: Beginner to Advanced  
> **Problems Coverage**: 35+ Problems (Easy → Medium → Hard)

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

## 5. 📋 Complete Template Collection

### Template 1: Basic Binary Search (Find Element)

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

### Template 3: Upper Bound (First element > target)

```cpp
int upperBound(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    int ans = arr.size();
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] > target) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return ans;
}
```

### Template 4: Binary Search on Answer (Optimization)

```cpp
bool isFeasible(int mid, vector<int>& nums, int threshold) {
    // Check if 'mid' is a feasible answer
    // Return true if possible, false otherwise
}

int binarySearchOnAnswer(int left, int right, vector<int>& nums, int threshold) {
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(isFeasible(mid, nums, threshold)) {
            result = mid;
            right = mid - 1;  // Try to minimize (for minimization problems)
            // left = mid + 1;  // Try to maximize (for maximization problems)
        } else {
            left = mid + 1;
            // right = mid - 1;  // For maximization
        }
    }
    
    return result;
}
```

### Template 5: Search in Rotated Sorted Array

```cpp
int searchRotated(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
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

### Template 6: Find Peak Element

```cpp
int findPeakElement(vector<int>& nums) {
    int left = 0;
    int right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] > nums[mid + 1]) {
            // Decreasing sequence, peak is on left (including mid)
            right = mid;
        } else {
            // Increasing sequence, peak is on right
            left = mid + 1;
        }
    }
    
    return left;  // or right (they're equal)
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

## 9. 📝 Pattern Variations with Complete Solutions

### Variation 1: Floor and Ceil in Sorted Array

**Floor**: Largest element ≤ target  
**Ceil**: Smallest element ≥ target

```cpp
#include <iostream>
#include <vector>
using namespace std;

pair<int, int> getFloorAndCeil(vector<int>& arr, int target) {
    int n = arr.size();
    int floor = -1, ceil = -1;
    
    // Find Floor
    int left = 0, right = n - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] <= target) {
            floor = arr[mid];
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // Find Ceil
    left = 0, right = n - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] >= target) {
            ceil = arr[mid];
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return {floor, ceil};
}
```

### Variation 2: First and Last Occurrence (Count Occurrences)

```cpp
#include <iostream>
#include <vector>
using namespace std;

int firstOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int first = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            first = mid;
            right = mid - 1;  // Keep searching left
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return first;
}

int lastOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int last = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            last = mid;
            left = mid + 1;  // Keep searching right
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return last;
}

int countOccurrences(vector<int>& arr, int target) {
    int first = firstOccurrence(arr, target);
    if(first == -1) return 0;
    
    int last = lastOccurrence(arr, target);
    return last - first + 1;
}
```

### Variation 3: Search Insert Position

```cpp
int searchInsert(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] == target) {
            return mid;
        } else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;  // Insert position
}
```

### Variation 4: Single Element in Sorted Array

**Problem**: Every element appears twice except one. Find it in O(log n).

```cpp
int singleNonDuplicate(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        // Ensure mid is even for proper pairing
        if(mid % 2 == 1) mid--;
        
        // If pair is maintained, single element is on right
        if(nums[mid] == nums[mid + 1]) {
            left = mid + 2;
        } else {
            // Pair broken, single element is on left
            right = mid;
        }
    }
    
    return nums[left];
}
```

### Variation 5: Find Minimum in Rotated Sorted Array

```cpp
int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] > nums[right]) {
            // Minimum is in right half
            left = mid + 1;
        } else {
            // Minimum is in left half (including mid)
            right = mid;
        }
    }
    
    return nums[left];
}
```

### Variation 6: Find Rotation Count

```cpp
int findRotationCount(vector<int>& nums) {
    int n = nums.size();
    int left = 0, right = n - 1;
    
    // If array is not rotated
    if(nums[left] <= nums[right]) return 0;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        int next = (mid + 1) % n;
        int prev = (mid + n - 1) % n;
        
        // Check if mid is the minimum element
        if(nums[mid] <= nums[next] && nums[mid] <= nums[prev]) {
            return mid;  // Index of minimum = rotation count
        }
        
        if(nums[mid] <= nums[right]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return 0;
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

## 12. 📚 Complete Problem List (Striver-Style)

### 🟢 BS on 1D Arrays - Basic (Easy)

1. **Binary Search** - Find element in sorted array
2. **Lower Bound** - First element ≥ target
3. **Upper Bound** - First element > target
4. **Search Insert Position** - Where to insert target
5. **Floor and Ceil** - Largest ≤ and smallest ≥ target
6. **First and Last Occurrence** - Find range of target
7. **Count Occurrences** - How many times target appears

### 🟡 BS on 1D Arrays - Advanced (Medium)

1. **Search in Rotated Sorted Array-I** - Unique elements
2. **Search in Rotated Sorted Array-II** - With duplicates
3. **Find Minimum in Rotated Sorted Array** - Find pivot
4. **Find Rotation Count** - How many times rotated
5. **Single Element in Sorted Array** - O(log n) solution
6. **Find Peak Element** - Element greater than neighbors

### 🔵 BS on Answers - Optimization Problems (Medium)

1. **Find Square Root** - Integer square root using BS
2. **Find Nth Root** - Nth root of a number
3. **Koko Eating Bananas** - Minimum speed to eat all
4. **Minimum Days to Make M Bouquets** - Time optimization
5. **Find the Smallest Divisor** - Sum ≤ threshold
6. **Capacity to Ship Packages** - Within D days
7. **Kth Missing Positive Number** - Find kth missing

### 🔴 BS on Answers - Hard Problems

1. **Aggressive Cows** - Maximize minimum distance
2. **Book Allocation Problem** - Minimize maximum pages
3. **Split Array - Largest Sum** - Similar to book allocation
4. **Painter's Partition** - Minimize painting time
5. **Minimize Max Distance to Gas Station** - Advanced hard

### 🟣 BS on 2D Arrays

1. **Find Row with Maximum 1's** - Binary matrix
2. **Search in a 2D Matrix** - Strictly sorted rows
3. **Search in 2D Matrix-II** - Row & column sorted
4. **Find Peak Element-II** - 2D peak finding
5. **Matrix Median** - Median of row-wise sorted matrix

### 🟠 Hard Classic Problems

1. **Median of 2 Sorted Arrays** - O(log(min(m,n)))
2. **Kth Element of 2 Sorted Arrays** - Find kth element

---

## 13. 🗺️ Binary Search Learning Roadmap (Striver-Style)

### Week 1: BS Fundamentals (Days 1-3)

**Day 1: Basic Binary Search**
- [ ] Understand binary search concept
- [ ] Learn basic template
- [ ] Solve: Binary Search (LC 704)
- [ ] Solve: Lower Bound
- [ ] Solve: Upper Bound
- **Time**: 2-3 hours

**Day 2: BS Variations on 1D Arrays**
- [ ] Search Insert Position (LC 35)
- [ ] Floor and Ceil
- [ ] First and Last Occurrence (LC 34)
- [ ] Count Occurrences
- **Time**: 3 hours

**Day 3: Rotated Sorted Arrays**
- [ ] Understand rotation concept
- [ ] Search in Rotated Array-I (LC 33)
- [ ] Search in Rotated Array-II (with duplicates)
- [ ] Find Minimum in Rotated Array (LC 153)
- [ ] Find Rotation Count
- **Time**: 3-4 hours

### Week 2: BS on Answers (Days 4-6)

**Day 4: Square Root & Nth Root**
- [ ] Find Square Root (LC 69)
- [ ] Find Nth Root
- [ ] Understand BS on answer pattern
- **Time**: 2-3 hours

**Day 5: Optimization Problems I**
- [ ] Koko Eating Bananas (LC 875)
- [ ] Minimum Days to Make M Bouquets (LC 1482)
- [ ] Find the Smallest Divisor (LC 1283)
- **Time**: 3 hours

**Day 6: Optimization Problems II**
- [ ] Capacity to Ship Packages (LC 1011)
- [ ] Kth Missing Positive Number (LC 1539)
- [ ] Single Element in Sorted Array (LC 540)
- **Time**: 3 hours

### Week 3: Advanced BS (Days 7-9)

**Day 7: Hard BS on Answers**
- [ ] Aggressive Cows (SPOJ)
- [ ] Book Allocation Problem (GFG)
- [ ] Split Array - Largest Sum (LC 410)
- **Time**: 4 hours

**Day 8: More Hard Problems**
- [ ] Painter's Partition
- [ ] Minimize Max Distance to Gas Station
- [ ] Find Peak Element (LC 162)
- **Time**: 3-4 hours

**Day 9: BS on 2D Arrays I**
- [ ] Find Row with Maximum 1's
- [ ] Search in a 2D Matrix (LC 74)
- [ ] Search in 2D Matrix-II (LC 240)
- **Time**: 3 hours

### Week 4: Mastery (Days 10-12)

**Day 10: BS on 2D Arrays II**
- [ ] Find Peak Element-II (LC 1901)
- [ ] Matrix Median
- **Time**: 3 hours

**Day 11: Classic Hard Problems**
- [ ] Median of 2 Sorted Arrays (LC 4) ⭐⭐⭐
- [ ] Kth Element of 2 Sorted Arrays
- **Time**: 4 hours

**Day 12: Revision & Mock Test**
- [ ] Revise all templates
- [ ] Solve 5 random BS problems
- [ ] Time yourself: 30 min per medium, 45 min per hard
- **Time**: 4 hours

---

## 14. 🎯 Key Takeaways

1. **Binary search requires sorted array** (or monotonic property)
2. **Time complexity**: O(log n) — extremely fast!
3. **Mid formula**: `left + (right - left) / 2` (avoid overflow)
4. **Loop condition**: `left <= right` for standard search
5. **Always move past mid**: `mid + 1` or `mid - 1`
6. **Binary search on answer** — Powerful optimization technique
7. **Rotated arrays** — Determine which half is sorted
8. **Lower/Upper bound** — Find first/last occurrences
9. **2D arrays** — Can treat as 1D or use row/column properties
10. **Peak finding** — Follow increasing direction

---

## 15. 💡 Pro Tips from Striver

1. **Master the templates** — Don't memorize, understand
2. **Practice pattern recognition** — Keywords → Pattern mapping
3. **Dry run on paper** — Essential for rotated arrays
4. **Handle edge cases** — Empty array, single element, all same
5. **BS on answer** — If problem asks minimize/maximize, think BS
6. **Monotonicity** — Key to BS on answer (if x works, x+1 also works)
7. **Search space** — Identify min and max possible answers
8. **Feasibility function** — Write clean check function
9. **Time yourself** — Build speed for interviews
10. **Revise weekly** — Revisit old problems

---

## 16. 🎓 When to Use Binary Search

✅ **Use when**:
- Array is sorted (or can be sorted)
- Looking for specific element
- Need first/last occurrence
- Optimization problem (minimize/maximize)
- Search space can be halved
- Rotated sorted array
- Monotonic function/property
- 2D sorted matrix

❌ **Don't use when**:
- Array is unsorted (use hash map or linear search)
- Need to find all occurrences (use two pointers after finding one)
- Elements change frequently (array not static)
- Small arrays (linear search is faster due to overhead)
- No monotonic property (for BS on answer)

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Easy Problems →](Problems/Easy.md) | [Medium Problems →](Problems/Medium.md) | [Hard Problems →](Problems/Hard.md)

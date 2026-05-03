# Two Pointer Technique — Complete Guide

> **What You'll Learn**: Opposite direction, same direction, and Dutch National Flag patterns  
> **Prerequisites**: Array Basics, Indexing  
> **Time Required**: 3-4 hours

---

## 1. 📌 Definition

The **Two Pointer** technique uses **two indices** to traverse an array simultaneously, reducing time complexity from O(n²) to O(n) by eliminating nested loops.

**When to use**: When you need to compare pairs, search from both ends, or partition elements.

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

---

## 3. 🎨 Visual Diagram

### Pattern 1: Opposite Direction

```
Array: [1, 3, 5, 7, 9, 11, 13]
        L                 R     ← Start: left=0, right=6
           L           R        ← Move inward
              L     R           ← Continue
                 L,R            ← Meet! Stop

Used for: Sorted arrays, finding pairs, palindrome checks
```

### Pattern 2: Same Direction (Fast/Slow)

```
Array: [1, 2, 3, 4, 5, 6, 7, 8]
        S  F                    ← Start: slow=0, fast=0
           S     F              ← Fast moves 2x speed
              S        F        ← Fast ahead of slow
                 S           F  ← Gap increases

Used for: Cycle detection, remove duplicates, find middle
```

---

## 4. 🔑 Pattern Recognition Keywords

**Look for these words in problems**:
- "Sorted array"
- "Find pair/triplet"
- "Reverse"
- "Partition"
- "Two elements that sum to X"
- "Remove duplicates"
- "Palindrome"
- "Container with most water"

---

## 5. 📋 Template Code

### Template 1: Opposite Direction

```cpp
#include <iostream>
#include <vector>
using namespace std;

void twoPointerOpposite(vector<int>& arr) {
    int left = 0;              // Start from beginning
    int right = arr.size() - 1; // Start from end
    
    while(left < right) {
        // Process arr[left] and arr[right]
        
        // Move pointers based on condition
        if(/* condition */) {
            left++;   // Move left pointer right
        } else {
            right--;  // Move right pointer left
        }
    }
}
```

### Template 2: Same Direction (Fast/Slow)

```cpp
#include <iostream>
#include <vector>
using namespace std;

void twoPointerSameDirection(vector<int>& arr) {
    int slow = 0;  // Slow pointer
    int fast = 0;  // Fast pointer
    
    while(fast < arr.size()) {
        // Fast pointer moves every iteration
        // Slow pointer moves conditionally
        
        if(/* condition */) {
            arr[slow] = arr[fast];
            slow++;
        }
        
        fast++;
    }
}
```

---

## 6. 🔍 Step-by-Step Example

### Problem: Two Sum II (Sorted Array)

**Problem**: Find two numbers that add up to target.

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0;
    int right = numbers.size() - 1;
    
    while(left < right) {
        int sum = numbers[left] + numbers[right];
        
        if(sum == target) {
            return {left + 1, right + 1};  // 1-indexed
        } else if(sum < target) {
            left++;   // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    
    return {};  // No solution
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    vector<int> result = twoSum(nums, target);
    cout << "Indices: " << result[0] << ", " << result[1] << endl;
    // Output: 1, 2 (because 2 + 7 = 9)
    
    return 0;
}
```

**Dry Run**:
```
Array: [2, 7, 11, 15], Target: 9
        L          R

Step 1: sum = 2 + 15 = 17 > 9
        Need smaller sum → right--
        
Array: [2, 7, 11, 15]
        L     R

Step 2: sum = 2 + 11 = 13 > 9
        Need smaller sum → right--
        
Array: [2, 7, 11, 15]
        L  R

Step 3: sum = 2 + 7 = 9 == 9 ✓
        Found! Return {1, 2}
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Wrong Initialization
```cpp
// WRONG
int left = 1;              // Should be 0
int right = arr.size();    // Should be size - 1

// CORRECT
int left = 0;
int right = arr.size() - 1;
```

### Mistake 2: Wrong Loop Condition
```cpp
// WRONG
while(left <= right) {  // May process same element twice
    // ...
}

// CORRECT (for most cases)
while(left < right) {
    // ...
}
```

### Mistake 3: Forgetting to Move Pointers
```cpp
while(left < right) {
    if(arr[left] + arr[right] == target) {
        return {left, right};
    }
    // FORGOT to move pointers! Infinite loop!
    
    // CORRECT:
    if(arr[left] + arr[right] < target) {
        left++;
    } else {
        right--;
    }
}
```

---

## 8. ⏱️ Time & Space Complexity

| Operation | Time | Space | Reasoning |
|-----------|------|-------|-----------|
| Two Pointer (opposite) | **O(n)** | **O(1)** | Each element visited once |
| Two Pointer (same direction) | **O(n)** | **O(1)** | Single pass through array |
| Brute Force (nested loops) | O(n²) | O(1) | All pairs checked |

**Why O(n) and not O(n/2)?**
- Constants are dropped in Big-O
- n/2 = O(n) mathematically

---

## 9. 📝 Pattern Variations

### Variation 1: Dutch National Flag (3-Way Partition)

```cpp
#include <iostream>
#include <vector>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0;      // Boundary for 0s
    int mid = 0;      // Current element
    int high = nums.size() - 1;  // Boundary for 2s
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if(nums[mid] == 1) {
            mid++;
        } else {  // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;
        }
    }
}

int main() {
    vector<int> nums = {2, 0, 2, 1, 1, 0};
    sortColors(nums);
    
    for(int x : nums) {
        cout << x << " ";  // 0 0 1 1 2 2
    }
    
    return 0;
}
```

---

## 10. 💡 Pro Tips

1. **Sort first** — Many two-pointer problems require sorted input
2. **Draw it out** — Visualize pointer movement on paper
3. **Check boundaries** — Ensure pointers don't go out of bounds
4. **Handle duplicates** — Skip them if problem requires unique pairs
5. **Think about movement** — When to move left vs right pointer?

---

## 11. 🎯 When to Use Two Pointer

✅ **Use when**:
- Array is sorted (or can be sorted)
- Looking for pairs/triplets
- Need to compare elements from both ends
- Partitioning elements
- Removing duplicates in-place

❌ **Don't use when**:
- Array is unsorted and can't be sorted
- Need to find all combinations (use nested loops)
- Elements need to maintain original order

---

## 12. 📚 Practice Problems

### Easy (Start Here)
1. Valid Palindrome (LeetCode 125)
2. Reverse String (LeetCode 344)
3. Remove Duplicates from Sorted Array (LeetCode 26)
4. Two Sum II (LeetCode 167)
5. Squares of Sorted Array (LeetCode 977)

### Medium
1. Container With Most Water (LeetCode 11)
2. 3Sum (LeetCode 15)
3. 4Sum (LeetCode 18)
4. Trapping Rain Water (LeetCode 42)
5. Remove Nth Node From End (LeetCode 19)

### Hard
1. Trapping Rain Water (LeetCode 42)
2. Minimum Window Substring (LeetCode 76)
3. Sliding Window Maximum (LeetCode 239)
4. Median of Two Sorted Arrays (LeetCode 4)

---

## 13. 🎯 Key Takeaways

1. Two pointers reduce O(n²) to O(n)
2. **Opposite direction**: Start from both ends, move inward
3. **Same direction**: Fast and slow pointers
4. **Dutch flag**: Three pointers for 3-way partition
5. Works best on **sorted arrays**
6. Watch for **off-by-one errors** in loop conditions
7. Always **move pointers** to avoid infinite loops

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Problems →](Problems/Easy.md)
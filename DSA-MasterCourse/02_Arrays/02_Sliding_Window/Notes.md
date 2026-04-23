# Sliding Window Technique — Complete Guide

> **What You'll Learn**: Fixed window, variable window, and monotonic window patterns  
> **Prerequisites**: Array Basics, Two Pointer  
> **Time Required**: 3-4 hours

---

## 1. 📌 Definition

The **Sliding Window** technique maintains a "window" of consecutive elements and slides it through the array, avoiding redundant calculations by reusing information from the previous window.

**When to use**: When you need to find optimal subarrays/substrings or process consecutive elements.

---

## 2. 🌍 Real-World Analogy

### Analogy 1: Camera Viewfinder 📷

Imagine taking a panoramic photo with a camera:
- Camera frame = window size
- You slide the camera left to right
- Each shot captures a new section
- You don't retake the entire panorama!

### Analogy 2: Moving Spotlight 🔦

A spotlight scanning a stage:
- Light beam = window
- Illuminates consecutive actors
- Moves smoothly across the stage
- Only sees what's in the beam

---

## 3. 🎨 Visual Diagram

### Pattern 1: Fixed Window

```
Array: [1, 4, 2, 10, 2, 3, 1, 0, 20], Window Size: 3

Window 1: [1, 4, 2]              → Sum = 7
             ↓ slide right
Window 2:    [4, 2, 10]          → Sum = 16 (reuse: 7 - 1 + 10)
                ↓ slide right
Window 3:       [2, 10, 2]       → Sum = 14 (reuse: 16 - 4 + 2)
                   ↓ slide right
Window 4:          [10, 2, 3]    → Sum = 15
```

### Pattern 2: Variable Window (Expand-Shrink)

```
Array: [2, 5, 1, 7, 3, 9], Find longest subarray with sum ≤ 10

Expand:  [2]           → Sum = 2 ✓  (window size = 1)
         [2, 5]        → Sum = 7 ✓  (window size = 2)
         [2, 5, 1]     → Sum = 8 ✓  (window size = 3)
         [2, 5, 1, 7]  → Sum = 15 ✗ (too large!)
         
Shrink:     [5, 1, 7]  → Sum = 13 ✗ (still too large)
              [1, 7]   → Sum = 8 ✓  (window size = 2)
              [1, 7, 3]→ Sum = 11 ✗ (too large)
                 [7, 3]→ Sum = 10 ✓ (window size = 2)
```

---

## 4. 🔑 Pattern Recognition Keywords

**Look for these words in problems**:
- "Subarray" or "substring"
- "Consecutive elements"
- "Longest/shortest/maximum/minimum"
- "Window of size K"
- "At most K"
- "Contiguous"
- "Sliding window" (obvious!)

---

## 5. 📋 Template Code

### Template 1: Fixed Window Size

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSumFixedWindow(vector<int>& arr, int k) {
    int n = arr.size();
    if(n < k) return -1;  // Invalid case
    
    // Calculate sum of first window
    int windowSum = 0;
    for(int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Slide window
    for(int i = k; i < n; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];  // Remove old, add new
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

### Template 2: Variable Window (Expand-Shrink)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int longestSubarrayWithSum(vector<int>& arr, int target) {
    int n = arr.size();
    int left = 0;
    int currentSum = 0;
    int maxLength = 0;
    
    for(int right = 0; right < n; right++) {
        // Expand window
        currentSum += arr[right];
        
        // Shrink window if condition violated
        while(currentSum > target && left <= right) {
            currentSum -= arr[left];
            left++;
        }
        
        // Update answer
        maxLength = max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

---

## 6. 🔍 Step-by-Step Example

### Problem: Maximum Sum Subarray of Size K

**Problem**: Find maximum sum of any contiguous subarray of size k.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSumSubarraySizeK(vector<int>& arr, int k) {
    int n = arr.size();
    if(n < k) {
        cout << "Invalid: array smaller than window" << endl;
        return -1;
    }
    
    // Step 1: Sum of first window
    int windowSum = 0;
    for(int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Step 2: Slide window through rest of array
    for(int i = k; i < n; i++) {
        // Remove element going out, add element coming in
        windowSum = windowSum - arr[i - k] + arr[i];
        
        // Update maximum
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

int main() {
    vector<int> arr = {1, 4, 2, 10, 2, 3, 1, 0, 20};
    int k = 3;
    
    int result = maxSumSubarraySizeK(arr, k);
    cout << "Maximum sum: " << result << endl;  // 24 (from [1, 0, 20])
    
    return 0;
}
```

**Dry Run**:
```
Array: [1, 4, 2, 10, 2, 3, 1, 0, 20], k = 3

Step 1: Initial window [1, 4, 2]
        windowSum = 1 + 4 + 2 = 7
        maxSum = 7

Step 2: Slide window right
        Remove arr[0]=1, Add arr[3]=10
        windowSum = 7 - 1 + 10 = 16
        maxSum = max(7, 16) = 16

Step 3: Slide again
        Remove arr[1]=4, Add arr[4]=2
        windowSum = 16 - 4 + 2 = 14
        maxSum = max(16, 14) = 16

Step 4: Continue sliding...
        Window [10, 2, 3]: sum = 15, maxSum = 16
        Window [2, 3, 1]: sum = 6, maxSum = 16
        Window [3, 1, 0]: sum = 4, maxSum = 16
        Window [1, 0, 20]: sum = 21, maxSum = 21

Result: 21 ✓
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Recalculating Window Sum from Scratch
```cpp
// WRONG: O(n*k) - Defeats the purpose!
for(int i = 0; i <= n - k; i++) {
    int currentSum = 0;
    for(int j = i; j < i + k; j++) {  // Recalculates every time!
        currentSum += arr[j];
    }
    maxSum = max(maxSum, currentSum);
}

// CORRECT: O(n) - Reuse previous calculation
windowSum = windowSum - arr[i - k] + arr[i];
```

### Mistake 2: Wrong Window Boundaries
```cpp
// WRONG: Off-by-one error
for(int i = k; i < n; i++) {
    windowSum -= arr[i - k - 1];  // Wrong index!
}

// CORRECT:
for(int i = k; i < n; i++) {
    windowSum -= arr[i - k];  // Element leaving the window
}
```

### Mistake 3: Forgetting to Handle Edge Cases
```cpp
// WRONG: No validation
int maxSum = 0;  // What if all numbers are negative?

// CORRECT: Handle edge cases
if(n < k) return -1;
int maxSum = INT_MIN;  // Handle negative numbers
```

### Mistake 4: Not Shrinking Window Properly
```cpp
// WRONG: If statement instead of while
if(currentSum > target) {
    currentSum -= arr[left];
    left++;  // Only shrinks once!
}

// CORRECT: While loop to shrink completely
while(currentSum > target && left <= right) {
    currentSum -= arr[left];
    left++;
}
```

---

## 8. ⏱️ Time & Space Complexity

| Pattern | Time | Space | Reasoning |
|---------|------|-------|-----------|
| **Fixed Window** | **O(n)** | **O(1)** | Each element added/removed once |
| **Variable Window** | **O(n)** | **O(1)** | Each element visited at most twice |
| **Brute Force** | O(n×k) or O(n²) | O(1) | Recalculates each window |

**Key Insight**: Sliding window is O(n) because each element is:
- Added to window exactly once
- Removed from window at most once
- Total operations: 2n = O(n)

---

## 9. 📝 Pattern Variations

### Variation 1: Monotonic Window (Advanced)

Used for "sliding window maximum" problems with a deque:

```cpp
#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& arr, int k) {
    deque<int> dq;  // Stores indices
    vector<int> result;
    
    for(int i = 0; i < arr.size(); i++) {
        // Remove elements out of window
        if(!dq.empty() && dq.front() == i - k) {
            dq.pop_front();
        }
        
        // Remove smaller elements (they're useless)
        while(!dq.empty() && arr[dq.back()] < arr[i]) {
            dq.pop_back();
        }
        
        // Add current element
        dq.push_back(i);
        
        // Record maximum for valid windows
        if(i >= k - 1) {
            result.push_back(arr[dq.front()]);
        }
    }
    
    return result;
}

int main() {
    vector<int> arr = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    
    vector<int> result = maxSlidingWindow(arr, k);
    
    for(int x : result) {
        cout << x << " ";  // 3 3 5 5 6 7
    }
    
    return 0;
}
```

---

## 10. 💡 Pro Tips

1. **Identify window type first** — Fixed or variable?
2. **Use the sliding formula** — `new_sum = old_sum - outgoing + incoming`
3. **Track what you need** — Sum, count, max, min, frequency map
4. **Variable window** — Use while loop to shrink, not if
5. **Watch boundaries** — Ensure left never exceeds right
6. **Monotonic deque** — For sliding window maximum/minimum

---

## 11. 🎯 When to Use Sliding Window

✅ **Use when**:
- Problem mentions "subarray" or "substring"
- Looking for longest/shortest/consecutive elements
- Need optimal value in a window
- Can maintain state as window slides
- Fixed or variable window size

❌ **Don't use when**:
- Elements don't need to be consecutive
- Need to compare non-adjacent elements
- Array needs to be reordered
- Problem is about subsequences (not subarrays)

---

## 12. 📚 Practice Problems

### Easy (Start Here)
1. Maximum Average Subarray I (LeetCode 643)
2. Maximum Sum Subarray of Size K (GFG)
3. Contains Duplicate II (LeetCode 219)
4. Longest Subarray of 1's After Deleting One (LeetCode 1493)
5. Subarray Product Less Than K (LeetCode 713)

### Medium
1. Longest Substring Without Repeating (LeetCode 3)
2. Minimum Size Subarray Sum (LeetCode 209)
3. Find All Anagrams in String (LeetCode 438)
4. Longest Repeating Character Replacement (LeetCode 424)
5. Permutation in String (LeetCode 567)

### Hard
1. Minimum Window Substring (LeetCode 76)
2. Sliding Window Maximum (LeetCode 239)
3. Subarrays with K Different Integers (LeetCode 992)
4. Number of Substrings Containing All Three Characters (LeetCode 1358)

---

## 13. 🎯 Key Takeaways

1. Sliding window eliminates redundant calculations
2. **Fixed window** — Known size, slide by one position
3. **Variable window** — Expand and shrink based on condition
4. **Monotonic deque** — For efficient max/min in window
5. Each element processed at most twice → O(n) time
6. **Key formula**: `new = old - outgoing + incoming`
7. Use while loop for shrinking, not if statement

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Problems →](Problems/Easy.md)

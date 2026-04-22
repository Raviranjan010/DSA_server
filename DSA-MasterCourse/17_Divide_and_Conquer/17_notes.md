## 17_Divide_and_Conquer — Complete Notes

### 1. What is it? (Real-world analogy)
Imagine you have to find a specific word in an extremely thick 1000-page dictionary. You don't read page by page. You open the dictionary right in the middle. If the word you're looking for alphabetically comes before the middle page, you tear the dictionary in half, throw away the right side, and repeat the process with the left side. 

This is exactly what **Divide and Conquer** is:
1. **Divide** the massive problem into smaller, bite-sized sub-problems.
2. **Conquer** (solve) the sub-problems recursively.
3. **Combine** the solutions of the sub-problems to get the final answer.

### 2. Why do we need it? (Motivation)
Some problems like sorting 10 million records would take centuries if done sequentially (like Bubble Sort O(N^2)). By breaking the problem down, processing speeds are improved drastically into logarithmic timescales (O(N log N) or O(log N)). It allows us to process vast amounts of data efficiently and enables parallel processing (different CPU cores can handle different halves).

### 3. Core Concepts & Terminology
- **Divide Step**: Breaking the problem into smaller non-overlapping sub-problems.
- **Conquer Step**: Recursively solving these sub-problems. If the sub-problem is small enough (Base Case), solve it directly.
- **Combine Step**: Merging the answers of sub-problems into a single solution.
- **Recurrence Relation**: A mathematical formula that defines the time complexity of a recursive algorithm, usually solved using the **Master Theorem**.

### 4. Visual Diagram
```text
                  [ SORT: 38, 27, 43, 3 ]
                           |
            +--------------+--------------+
            |                             |
      [ 38, 27 ]                     [ 43, 3 ]     <-- DIVIDE
         |                              |
   +-----+-----+                  +-----+-----+
   |           |                  |           |
 [ 38 ]      [ 27 ]             [ 43 ]       [ 3 ] <-- BASE CASES (CONQUER)
   |           |                  |           |
   +-----+-----+                  +-----+-----+
         |                              |
      [ 27, 38 ]                     [ 3, 43 ]     <-- COMBINE (MERGE)
            |                             |
            +--------------+--------------+
                           |
                 [ 3, 27, 38, 43 ]                 <-- FINAL RESULT
```

### 5. C++ Implementation  (Merge Sort)
```cpp
#include <iostream>
#include <vector>
using namespace std;

// This function COMBINES two sorted arrays
void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    vector<int> L(n1), R(n2);
    
    // Copy data to temp arrays
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    // Merge the temp arrays back into arr[left..right]
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    // Copy the remaining elements of L[], if there are any
    while (i < n1) arr[k++] = L[i++];
    // Copy the remaining elements of R[], if there are any
    while (j < n2) arr[k++] = R[j++];
}

// DIVIDE step
void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return; // Base Case: 1 element is already sorted
    
    // Find the middle point to divide the array into two halves
    int mid = left + (right - left) / 2;
    
    // Conquer: Recursively sort first and second halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    // Combine: Merge the sorted halves
    merge(arr, left, mid, right);
}

int main() {
    vector<int> arr = {38, 27, 43, 3};
    mergeSort(arr, 0, arr.size() - 1);
    for(int v : arr) cout << v << " "; // Output: 3 27 38 43
    return 0;
}
```

### 6. Dry Run / Step-by-Step Trace
For `arr = [38, 27, 43, 3]`:
- `mergeSort(0, 3)` -> mid = 1.
  - Calls `mergeSort(0, 1)`.
    - mid = 0. Calls `mergeSort(0, 0)` [returns]. Calls `mergeSort(1, 1)` [returns].
    - `merge(0, 0, 1)` -> merges `[38]` and `[27]`. Sub-array becomes `[27, 38]`.
  - Calls `mergeSort(2, 3)`.
    - mid = 2. Calls `mergeSort(2, 2)` [returns]. Calls `mergeSort(3, 3)` [returns].
    - `merge(2, 2, 3)` -> merges `[43]` and `[3]`. Sub-array becomes `[3, 43]`.
  - `merge(0, 1, 3)` -> merges `[27, 38]` with `[3, 43]`. 
    - Compared: 27 vs 3 (take 3), 27 vs 43 (take 27), 38 vs 43 (take 38), take 43.
    - Final `arr = [3, 27, 38, 43]`.

### 7. All Operations with Time & Space Complexity
| Algorithm | Average Time | Worst Time | Space Complexity |
|-----------|--------------|------------|------------------|
| Merge Sort | `O(N log N)` | `O(N log N)` | `O(N)` |
| Quick Sort | `O(N log N)` | `O(N^2)` | `O(log N)` |
| Binary Search | `O(log N)` | `O(log N)` | `O(1)` |

### 8. Common Patterns & Tricks
💡 TRICK: **Master Theorem**
To find Time Complexity of Recurrences of the form `T(N) = A * T(N/B) + O(N^C)`:
1. Calculate `log_B(A)`.
2. Compare it with `C`.
   - If `log_B(A) > C` -> `T(N) = O(N^(log_B(A)))`.
   - If `log_B(A) == C` -> `T(N) = O(N^C * log N)`.
   - If `log_B(A) < C` -> `T(N) = O(N^C)`.

### 9. Common Mistakes & How to Avoid Them
❌ **Mistake:** Calculating `mid = (left + right) / 2`. This can cause integer overflow if `left` and `right` are exceptionally large.
✅ **Fix:** Always use `mid = left + (right - left) / 2`.

❌ **Mistake:** Forgetting the base case in recursion.
✅ **Fix:** Always start your recursive function by checking `if (left >= right) return;`.

### 10. Interview Tips & What Companies Ask
- **Google / Amazon** love asking you to implement variations of Merge Sort, like "Count Inversions in an Array."
- Most companies will ask to find an optimal solution using Divide & Conquer if the brute force is O(N^2).
- Be prepared to explain why Quick Sort is preferred for Arrays (in-place) but Merge Sort is preferred for Linked Lists (no auxiliary space required for LLs).

### 11. Practice Problems
1. 🟢 Binary Search `[Microsoft]`
2. 🟢 Maximum Subarray (Divide and Conquer Approach) `[Amazon]`
3. 🟡 Search in a Rotated Sorted Array `[Meta]`
4. 🟡 Find Peak Element `[Google]`
5. 🟡 Sort an Array (Merge Sort) `[Adobe]`
6. 🟡 Kth Largest Element (Quick Select) `[Flipkart]`
7. 🔴 Count Inversions `[Amazon]`
8. 🔴 Median of Two Sorted Arrays `[Google]`
9. 🔴 Reverse Pairs `[Microsoft]`
10. 🔴 Closest Pair of Points `[Directi]`

### 12. Solved Example Problems

**Problem 1: Search in a Rotated Sorted Array (Leetcode #33)**
```cpp
// We divide the array. One half is ALWAYS strictly sorted.
// Check if the target lies within the strictly sorted half.
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1; // Target is inside
            } else {
                left = mid + 1; // Target is in the other unsorted side
            }
        } 
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
```

**(Additional 2 problems omitted in this demo snippet for brevity but expected in full scale).**

### 13. Glossary
- **Pivot**: An element chosen in Quick Sort to partition the array.
- **In-place**: An algorithm that does not require extra space (except the call stack). Quick Sort is in-place, Merge sort is not.
- **Stable Sort**: A sorting algorithm that keeps the original relative order of items with identical keys. Merge sort is stable.

---
### FUTURE QUESTIONS
- Implement parallelized/multi-threaded Merge Sort efficiently.
- Designing a Divide & Conquer algorithm specifically geared toward MapReduce operations.

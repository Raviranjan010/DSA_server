# Binary Search on 2D Arrays — Complete Striver Sheet

> **5 problems on binary search in 2D matrices**  
> **Prerequisites**: Medium & Hard Problems, Binary Search Notes.md  
> **Time Required**: 3-4 hours  
> **Pattern**: BS on 2D Arrays

---

## Problem 1: Find Row with Maximum 1's

**Source**: https://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Given a binary matrix (containing only 0s and 1s) where each row is sorted, find the row with the maximum number of 1s.

### Examples
```
Input: matrix = [
  [0, 0, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 1, 1]
]
Output: 1 (row index with max 1s, which is 3 ones)
```

### Key Insight
Since each row is sorted, find the first occurrence of 1 using binary search. Number of 1s = total columns - first_1_index.

### Complete Solution
```cpp
#include <vector>
using namespace std;

// Find first occurrence of 1 in a sorted row
int firstOne(vector<int>& row) {
    int left = 0, right = row.size() - 1;
    int first = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(row[mid] == 1) {
            first = mid;
            right = mid - 1;  // Keep searching left
        } else {
            left = mid + 1;
        }
    }
    
    return first;
}

int rowWithMax1s(vector<vector<int>>& matrix) {
    int maxRow = -1;
    int maxCount = -1;
    
    for(int i = 0; i < matrix.size(); i++) {
        int first = firstOne(matrix[i]);
        if(first != -1) {
            int count = matrix[i].size() - first;
            if(count > maxCount) {
                maxCount = count;
                maxRow = i;
            }
        }
    }
    
    return maxRow;
}
```

### Complexity
- **Time**: O(m * log n) where m = rows, n = columns
- **Space**: O(1)

### Optimized Approach (O(m + n))
```cpp
int rowWithMax1sOptimized(vector<vector<int>>& matrix) {
    int m = matrix.size();
    int n = matrix[0].size();
    int maxRow = -1;
    int j = n - 1;  // Start from top-right corner
    
    for(int i = 0; i < m; i++) {
        // Move left while we see 1s
        while(j >= 0 && matrix[i][j] == 1) {
            j--;
            maxRow = i;
        }
    }
    
    return maxRow;
}
```

---

## Problem 2: Search in a 2D Matrix

**Source**: https://leetcode.com/problems/search-a-2d-matrix/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Write an efficient algorithm that searches for a value in an m x n matrix. The matrix has the following properties:
- Integers in each row are sorted from left to right
- The first integer of each row is greater than the last integer of the previous row

### Examples
```
Input: matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
], target = 3
Output: true

Input: matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
], target = 13
Output: false
```

### Key Insight
Treat the 2D matrix as a flattened 1D sorted array. Use binary search on virtual 1D array [0, m*n-1].

**Mapping**: 
- 1D index `mid` → 2D indices `[mid/n][mid%n]`
- row = mid / n
- col = mid % n

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        
        int m = matrix.size();
        int n = matrix[0].size();
        
        // Treat 2D matrix as 1D array
        int left = 0;
        int right = m * n - 1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n;
            int col = mid % n;
            int value = matrix[row][col];
            
            if(value == target) return true;
            else if(value < target) left = mid + 1;
            else right = mid - 1;
        }
        
        return false;
    }
};
```

### Dry Run
```
matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
], target = 3

m=3, n=4, left=0, right=11

Step 1: mid=5, row=5/4=1, col=5%4=1, value=11
        11 > 3 → right=4

Step 2: mid=2, row=2/4=0, col=2%4=2, value=5
        5 > 3 → right=1

Step 3: mid=0, row=0, col=0, value=1
        1 < 3 → left=1

Step 4: mid=1, row=0, col=1, value=3
        3 == 3 → Return true ✓
```

### Complexity
- **Time**: O(log(m×n))
- **Space**: O(1)

---

## Problem 3: Search in a 2D Matrix - II

**Source**: https://leetcode.com/problems/search-a-2d-matrix-ii/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Amazon, Google, Facebook  
**Frequency**: 📅 Very High

### Problem Statement
Write an efficient algorithm that searches for a value in an m x n matrix. The matrix has the following properties:
- Integers in each row are sorted in ascending from left to right
- Integers in each column are sorted in ascending from top to bottom

### Examples
```
Input: matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 5
Output: true
```

### Key Insight
Start from top-right corner (or bottom-left). At each position:
- If current == target → Found!
- If current > target → Move left (smaller values)
- If current < target → Move down (larger values)

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        
        int m = matrix.size();
        int n = matrix[0].size();
        
        // Start from top-right corner
        int row = 0, col = n - 1;
        
        while(row < m && col >= 0) {
            if(matrix[row][col] == target) {
                return true;
            } else if(matrix[row][col] > target) {
                col--;  // Move left
            } else {
                row++;  // Move down
            }
        }
        
        return false;
    }
};
```

### Dry Run
```
matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 5

Start: row=0, col=4, value=15
15 > 5 → Move left (col=3)

row=0, col=3, value=11
11 > 5 → Move left (col=2)

row=0, col=2, value=7
7 > 5 → Move left (col=1)

row=0, col=1, value=4
4 < 5 → Move down (row=1)

row=1, col=1, value=5
5 == 5 → Return true ✓
```

### Complexity
- **Time**: O(m + n) - At most m+n steps
- **Space**: O(1)

### Why Not Binary Search?
Since both rows and columns are sorted but not the entire matrix, we can't use standard BS. The staircase approach is optimal.

---

## Problem 4: Find Peak Element - II

**Source**: https://leetcode.com/problems/find-a-peak-element-ii/  
**Difficulty**: 🟡 Medium  
**Company Tags**: 🏢 Google, Facebook  
**Frequency**: 📅 Medium

### Problem Statement
A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors (left, right, top, bottom). Given a matrix, find any peak element.

### Examples
```
Input: mat = [
  [1,4],
  [3,2]
]
Output: [0,1] or [1,0] (both 4 and 3 are peaks)

Input: mat = [
  [10,20,15],
  [21,30,14],
  [7,16,32]
]
Output: [2,2] (value 32 is a peak)
```

### Key Insight
Binary search on columns. For each mid column, find the maximum element's row index. Compare with left and right neighbors to determine direction.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        int m = mat.size();
        int n = mat[0].size();
        int left = 0, right = n - 1;
        
        while(left <= right) {
            int midCol = left + (right - left) / 2;
            
            // Find row index of maximum element in midCol
            int maxRow = 0;
            for(int i = 0; i < m; i++) {
                if(mat[i][midCol] > mat[maxRow][midCol]) {
                    maxRow = i;
                }
            }
            
            // Get left and right neighbors
            int leftNeighbor = (midCol > 0) ? mat[maxRow][midCol - 1] : -1;
            int rightNeighbor = (midCol < n - 1) ? mat[maxRow][midCol + 1] : -1;
            
            // Check if peak
            if(mat[maxRow][midCol] > leftNeighbor && mat[maxRow][midCol] > rightNeighbor) {
                return {maxRow, midCol};
            } else if(mat[maxRow][midCol] < leftNeighbor) {
                right = midCol - 1;  // Peak is on left
            } else {
                left = midCol + 1;   // Peak is on right
            }
        }
        
        return {-1, -1};  // Should never reach
    }
};
```

### Complexity
- **Time**: O(m * log n) - For each column BS, find max in O(m)
- **Space**: O(1)

---

## Problem 5: Matrix Median

**Source**: https://www.interviewbit.com/problems/matrix-median/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 Medium

### Problem Statement
Given a row-wise sorted matrix of size m x n, find the median of the matrix. Assume m * n is always odd.

### Examples
```
Input: matrix = [
  [1, 3, 5],
  [2, 6, 9],
  [3, 6, 9]
]
Output: 5
Explanation: Sorted array = [1,2,3,3,5,6,6,9,9], median = 5
```

### Key Insight
Binary search on the answer (values). Range: [min(matrix), max(matrix)]. For each mid, count elements ≤ mid. If count < (m*n+1)/2, median is larger.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

// Count elements <= target in a sorted row
int countLessEqual(vector<int>& row, int target) {
    int left = 0, right = row.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(row[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}

int matrixMedian(vector<vector<int>>& matrix) {
    int m = matrix.size();
    int n = matrix[0].size();
    
    // Find range
    int minVal = matrix[0][0];
    int maxVal = matrix[0][n-1];
    
    for(int i = 1; i < m; i++) {
        minVal = min(minVal, matrix[i][0]);
        maxVal = max(maxVal, matrix[i][n-1]);
    }
    
    int desired = (m * n + 1) / 2;
    
    // Binary search on answer
    while(minVal < maxVal) {
        int mid = minVal + (maxVal - minVal) / 2;
        int count = 0;
        
        // Count elements <= mid in entire matrix
        for(int i = 0; i < m; i++) {
            count += countLessEqual(matrix[i], mid);
        }
        
        if(count < desired) {
            minVal = mid + 1;
        } else {
            maxVal = mid;
        }
    }
    
    return minVal;
}
```

### Dry Run
```
matrix = [
  [1, 3, 5],
  [2, 6, 9],
  [3, 6, 9]
]

m=3, n=3, desired=(9+1)/2=5
minVal=1, maxVal=9

Iteration 1: mid=5
  Row 0: countLessEqual([1,3,5], 5) = 3
  Row 1: countLessEqual([2,6,9], 5) = 1
  Row 2: countLessEqual([3,6,9], 5) = 1
  Total = 5 >= 5 → maxVal = 5

Iteration 2: mid=3
  Row 0: countLessEqual([1,3,5], 3) = 2
  Row 1: countLessEqual([2,6,9], 3) = 1
  Row 2: countLessEqual([3,6,9], 3) = 1
  Total = 4 < 5 → minVal = 4

Iteration 3: mid=4
  Count = 4 < 5 → minVal = 5

minVal=5, maxVal=5 → Return 5 ✓
```

### Complexity
- **Time**: O(m * log(n) * log(maxVal - minVal))
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **2D Matrix as 1D** - When entire matrix is sorted, flatten it: index → [index/n][index%n]
2. **Staircase Search** - When rows & columns sorted separately, start from corner
3. **Row-wise sorted** - Apply BS on each row independently
4. **Column BS** - For 2D peak, binary search on columns, find max in row
5. **Matrix Median** - BS on value range, count elements ≤ mid
6. **Space optimization** - Most 2D BS problems are O(1) space
7. **Time complexity** - Usually O(log(m*n)) or O(m * log n)

---

## 💡 Pattern Recognition

| Matrix Property | Approach | Time |
|----------------|----------|------|
| Entire matrix sorted | Treat as 1D array | O(log(m*n)) |
| Row & column sorted | Start from corner | O(m + n) |
| Row-wise sorted | BS on each row | O(m * log n) |
| Find peak | BS on columns | O(m * log n) |
| Find median | BS on values | O(m * log n * log(range)) |

---

**Master 2D array binary search patterns!**

[← Back to Hard Problems](Hard.md) | [← Back to Notes](../Notes.md)

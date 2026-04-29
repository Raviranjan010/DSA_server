# Binary Search — Complete Patterns Reference

> **Complete catalog of all binary search variations**  
> **Covers**: BS on 1D, BS on Answers, BS on 2D Arrays

---

## 📋 Pattern Variations

### 1. Binary Search on Index (Standard)

**Use When**: Search in sorted array  
**Time Complexity**: O(log n)

#### Template
```cpp
int binarySearch(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] == target) return mid;
        else if(nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
```

#### Problems
- Binary Search (LC 704)
- Search in sorted array

---

### 2. Lower Bound

**Use When**: Find first element >= target  
**Time Complexity**: O(log n)

#### Template
```cpp
int lowerBound(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    int ans = nums.size();
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] >= target) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return ans;
}
```

#### Problems
- Lower Bound (GFG)
- Search Insert Position (LC 35)

---

### 3. Upper Bound

**Use When**: Find first element > target  
**Time Complexity**: O(log n)

#### Template
```cpp
int upperBound(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    int ans = nums.size();
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] > target) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

#### Problems
- Upper Bound (GFG)

---

### 4. Find First and Last Occurrence

**Use When**: Find range of target in sorted array  
**Time Complexity**: O(log n)

#### Template
```cpp
pair<int, int> searchRange(vector<int>& nums, int target) {
    int first = -1, last = -1;
    
    // Find first
    int left = 0, right = nums.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target) {
            first = mid;
            right = mid - 1;
        } else if(nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    if(first == -1) return {-1, -1};
    
    // Find last
    left = 0, right = nums.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target) {
            last = mid;
            left = mid + 1;
        } else if(nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return {first, last};
}
```

#### Problems
- Find First and Last Position (LC 34)
- Count Occurrences

---

### 5. Floor and Ceil

**Use When**: Find largest <= and smallest >= target  
**Time Complexity**: O(log n)

#### Template
```cpp
pair<int, int> getFloorAndCeil(vector<int>& arr, int target) {
    int floor = -1, ceil = -1;
    
    // Floor
    int left = 0, right = arr.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] <= target) {
            floor = arr[mid];
            left = mid + 1;
        } else right = mid - 1;
    }
    
    // Ceil
    left = 0, right = arr.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] >= target) {
            ceil = arr[mid];
            right = mid - 1;
        } else left = mid + 1;
    }
    
    return {floor, ceil};
}
```

#### Problems
- Floor and Ceil (GFG)

---

### 6. Rotated Sorted Array Search

**Use When**: Array rotated at unknown pivot  
**Time Complexity**: O(log n)

#### Template
```cpp
int searchRotated(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] == target) return mid;
        
        if(nums[left] <= nums[mid]) {
            // Left half sorted
            if(nums[left] <= target && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {
            // Right half sorted
            if(nums[mid] < target && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    
    return -1;
}
```

#### Problems
- Search in Rotated Sorted Array (LC 33)
- Search in Rotated Sorted Array-II (with duplicates)

---

### 7. Find Minimum in Rotated Array

**Use When**: Find pivot/rotation point  
**Time Complexity**: O(log n)

#### Template
```cpp
int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}
```

#### Problems
- Find Minimum in Rotated Array (LC 153)
- Find Rotation Count

---

### 8. Single Element in Sorted Array

**Use When**: Every element appears twice except one  
**Time Complexity**: O(log n)

#### Template
```cpp
int singleNonDuplicate(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        if(mid % 2 == 1) mid--;
        
        if(nums[mid] == nums[mid + 1]) {
            left = mid + 2;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}
```

#### Problems
- Single Element in Sorted Array (LC 540)

---

### 9. Find Peak Element

**Use When**: Find element greater than neighbors  
**Time Complexity**: O(log n)

#### Template
```cpp
int findPeakElement(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

#### Problems
- Find Peak Element (LC 162)

---

### 10. Binary Search on Answer (Optimization)

**Use When**: Minimize/maximize a value  
**Time Complexity**: O(n * log(range))

#### Template
```cpp
bool isFeasible(int mid, vector<int>& nums, int threshold) {
    // Check if mid is feasible
}

int binarySearchOnAnswer(int left, int right, vector<int>& nums, int threshold) {
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(isFeasible(mid, nums, threshold)) {
            result = mid;
            right = mid - 1;  // Minimize
            // left = mid + 1;  // Maximize
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}
```

#### Problems
- Koko Eating Bananas (LC 875)
- Capacity to Ship Packages (LC 1011)
- Aggressive Cows (SPOJ)
- Book Allocation Problem
- Split Array Largest Sum (LC 410)
- Painter's Partition

---

### 11. Square Root / Nth Root

**Use When**: Find integer root  
**Time Complexity**: O(log x)

#### Template
```cpp
int mySqrt(int x) {
    if(x == 0 || x == 1) return x;
    
    long long left = 1, right = x;
    int result = 0;
    
    while(left <= right) {
        long long mid = left + (right - left) / 2;
        long long sq = mid * mid;
        
        if(sq == x) return mid;
        else if(sq < x) {
            result = mid;
            left = mid + 1;
        } else right = mid - 1;
    }
    
    return result;
}
```

#### Problems
- Sqrt(x) (LC 69)
- Nth Root of a Number

---

### 12. Kth Missing Positive Number

**Use When**: Find kth missing element  
**Time Complexity**: O(log n)

#### Template
```cpp
int findKthPositive(vector<int>& arr, int k) {
    int left = 0, right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        int missing = arr[mid] - (mid + 1);
        
        if(missing < k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left + k;
}
```

#### Problems
- Kth Missing Positive Number (LC 1539)

---

### 13. 2D Matrix - Flattened Binary Search

**Use When**: Entire matrix sorted row-wise  
**Time Complexity**: O(log(m*n))

#### Template
```cpp
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int left = 0, right = m * n - 1;
    
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
```

#### Problems
- Search a 2D Matrix (LC 74)

---

### 14. 2D Matrix - Staircase Search

**Use When**: Rows and columns sorted separately  
**Time Complexity**: O(m + n)

#### Template
```cpp
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int row = 0, col = n - 1;  // Start from top-right
    
    while(row < m && col >= 0) {
        if(matrix[row][col] == target) return true;
        else if(matrix[row][col] > target) col--;
        else row++;
    }
    
    return false;
}
```

#### Problems
- Search a 2D Matrix-II (LC 240)

---

### 15. 2D Peak Finding

**Use When**: Find peak in 2D grid  
**Time Complexity**: O(m * log n)

#### Template
```cpp
vector<int> findPeakGrid(vector<vector<int>>& mat) {
    int m = mat.size(), n = mat[0].size();
    int left = 0, right = n - 1;
    
    while(left <= right) {
        int midCol = left + (right - left) / 2;
        
        // Find max element in midCol
        int maxRow = 0;
        for(int i = 0; i < m; i++) {
            if(mat[i][midCol] > mat[maxRow][midCol])
                maxRow = i;
        }
        
        int leftNeighbor = (midCol > 0) ? mat[maxRow][midCol - 1] : -1;
        int rightNeighbor = (midCol < n - 1) ? mat[maxRow][midCol + 1] : -1;
        
        if(mat[maxRow][midCol] > leftNeighbor && 
           mat[maxRow][midCol] > rightNeighbor) {
            return {maxRow, midCol};
        } else if(mat[maxRow][midCol] < leftNeighbor) {
            right = midCol - 1;
        } else {
            left = midCol + 1;
        }
    }
    
    return {-1, -1};
}
```

#### Problems
- Find Peak Element-II (LC 1901)

---

### 16. Matrix Median

**Use When**: Find median in row-wise sorted matrix  
**Time Complexity**: O(m * log n * log(range))

#### Template
```cpp
int countLessEqual(vector<int>& row, int target) {
    int left = 0, right = row.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(row[mid] <= target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}

int matrixMedian(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    int minVal = matrix[0][0], maxVal = matrix[0][n-1];
    int desired = (m * n + 1) / 2;
    
    while(minVal < maxVal) {
        int mid = minVal + (maxVal - minVal) / 2;
        int count = 0;
        
        for(int i = 0; i < m; i++) {
            count += countLessEqual(matrix[i], mid);
        }
        
        if(count < desired) minVal = mid + 1;
        else maxVal = mid;
    }
    
    return minVal;
}
```

#### Problems
- Matrix Median (InterviewBit)

---

### 17. Median of Two Sorted Arrays

**Use When**: Find median of two sorted arrays  
**Time Complexity**: O(log(min(m, n)))

#### Template
```cpp
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if(nums1.size() > nums2.size()) swap(nums1, nums2);
    
    int m = nums1.size(), n = nums2.size();
    int left = 0, right = m;
    
    while(left <= right) {
        int partitionX = left + (right - left) / 2;
        int partitionY = (m + n + 1) / 2 - partitionX;
        
        int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
        int minX = (partitionX == m) ? INT_MAX : nums1[partitionX];
        int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
        int minY = (partitionY == n) ? INT_MAX : nums2[partitionY];
        
        if(maxX <= minY && maxY <= minX) {
            if((m + n) % 2 == 0) {
                return (max(maxX, maxY) + min(minX, minY)) / 2.0;
            } else {
                return max(maxX, maxY);
            }
        } else if(maxX > minY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    
    return 0.0;
}
```

#### Problems
- Median of Two Sorted Arrays (LC 4)
- Kth Element of Two Sorted Arrays

---

## 💡 Pro Tips

1. **Avoid overflow** - Use `left + (right - left) / 2`
2. **Know your bounds** - `left <= right` vs `left < right`
3. **Rotated arrays** - Determine which half is sorted
4. **Search on answer** - Define feasibility function
5. **STL functions** - `lower_bound`, `upper_bound`
6. **2D matrices** - Can treat as 1D or use row/column properties
7. **Peak finding** - Follow increasing direction
8. **Monotonicity** - Key to BS on answer
9. **Precision** - Use fixed iterations for floating point
10. **Practice templates** - Don't memorize, understand

---

**Master binary search for logarithmic time solutions!**

[← Back to Notes](../Notes.md) | [Easy Problems](Problems/Easy.md) | [Medium Problems](Problems/Medium.md) | [Hard Problems](Problems/Hard.md) | [2D Arrays](Problems/2D_Arrays.md)

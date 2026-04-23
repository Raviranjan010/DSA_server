# Binary Search — Patterns Reference

> **Complete catalog of binary search variations**

---

## 📋 Pattern Variations

### 1. Binary Search on Index

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

---

### 2. Lower Bound

**Use When**: Find first element >= target  
**Time Complexity**: O(log n)

#### Template
```cpp
int lowerBound(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size();
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

---

### 3. Upper Bound

**Use When**: Find first element > target  
**Time Complexity**: O(log n)

#### Template
```cpp
int upperBound(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size();
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

---

### 4. Binary Search on Answer

**Use When**: Optimization problems (minimize/maximize)  
**Time Complexity**: O(n * log(range))

#### Template
```cpp
bool canSolve(int mid) {
    // Check if mid is feasible
}

int binarySearchOnAnswer(int left, int right) {
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(canSolve(mid)) {
            result = mid;
            left = mid + 1;  // Try to optimize
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
```

---

### 5. Rotated Sorted Array

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
            if(nums[left] <= target && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {
            if(nums[mid] < target && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    
    return -1;
}
```

---

## 💡 Pro Tips

1. **Avoid overflow** - Use `left + (right - left) / 2`
2. **Know your bounds** - `left <= right` vs `left < right`
3. **Rotated arrays** - Determine which half is sorted
4. **Search on answer** - Define feasibility function
5. **STL functions** - `lower_bound`, `upper_bound`

---

**Master binary search for logarithmic time solutions!**

[← Back to Notes](../Notes.md) | [Medium_Hard Problems](Problems/Medium_Hard.md)

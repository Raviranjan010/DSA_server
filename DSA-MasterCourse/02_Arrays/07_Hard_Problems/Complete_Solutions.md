# Hard Array Problems — Complete Striver-Style Solutions

> **9 Essential Hard Problems**  
> **Prerequisites**: All Medium Problems, Advanced Patterns  
> **Time Required**: 6-8 hours  
> **Based on**: Striver's A2Z DSA Course/Sheet

---

## Table of Contents

1. [Merge Two Sorted Arrays (No Extra Space)](#problem-1-merge-two-sorted-arrays)
2. [Repeating and Missing Number](#problem-2-repeating-and-missing-number)
3. [Count Inversions](#problem-3-count-inversions)
4. [Reverse Pairs](#problem-4-reverse-pairs)
5. [Maximum Product Subarray](#problem-5-maximum-product-subarray)
6. [3Sum](#problem-6-3sum)
7. [4Sum](#problem-7-4sum)
8. [Median of Two Sorted Arrays](#problem-8-median-of-two-sorted-arrays)
9. [Kth Element of Two Sorted Arrays](#problem-9-kth-element-of-two-sorted-arrays)

---

## Problem 1: Merge Two Sorted Arrays (No Extra Space)

**Source**: [LeetCode 88](https://leetcode.com/problems/merge-sorted-array/)  
**Difficulty**: 🔴 Hard  
**Company Tags**: Amazon, Microsoft, Adobe

### Problem Statement
Merge two sorted arrays without using extra space.

### Examples
```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
```

### Optimal Approach: Gap Method / Two Pointers from End
**Time**: O(m+n) | **Space**: O(1)

**Intuition**: Start from the end of both arrays and fill from the back.

### Complete Solution
```cpp
void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int i = m - 1;  // Last element of nums1
    int j = n - 1;  // Last element of nums2
    int k = m + n - 1;  // Last position in merged array
    
    while(i >= 0 && j >= 0) {
        if(nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    
    // Copy remaining elements from nums2
    while(j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

---

## Problem 2: Repeating and Missing Number

**Source**: [GFG](https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/)  
**Difficulty**: 🔴 Hard  
**Company Tags**: Amazon, Flipkart

### Problem Statement
Find the repeating and missing number in an array of size n with elements 1 to n.

### Examples
```
Input: [3, 1, 2, 5, 3]
Output: Repeating = 3, Missing = 4
```

### Optimal Approach: Mathematical
**Time**: O(n) | **Space**: O(1)

**Intuition**: Use sum and sum of squares formulas to create two equations.

### Complete Solution
```cpp
pair<int, int> findMissingRepeating(vector<int>& arr) {
    long long n = arr.size();
    long long S = n * (n + 1) / 2;
    long long S2 = n * (n + 1) * (2 * n + 1) / 6;
    
    long long actualS = 0, actualS2 = 0;
    for(int num : arr) {
        actualS += num;
        actualS2 += (long long)num * num;
    }
    
    long long diff1 = actualS - S;      // X - Y
    long long diff2 = actualS2 - S2;    // X² - Y²
    diff2 = diff2 / diff1;              // X + Y
    
    long long X = (diff1 + diff2) / 2;  // Repeating
    long long Y = X - diff1;            // Missing
    
    return {(int)X, (int)Y};
}
```

---

## Problem 3: Count Inversions

**Source**: [GFG](https://www.geeksforgeeks.org/counting-inversions/)  
**Difficulty**: 🔴 Hard  
**Company Tags**: Amazon, Microsoft, Google

### Problem Statement
Count the number of inversions in an array. (i < j but arr[i] > arr[j])

### Examples
```
Input: [2, 4, 1, 3, 5]
Output: 3
Explanation: (2,1), (4,1), (4,3) are inversions
```

### Optimal Approach: Modified Merge Sort
**Time**: O(n log n) | **Space**: O(n)

**Intuition**: During merge step, count elements that are out of order.

### Complete Solution
```cpp
long long mergeAndCount(vector<int>& arr, int left, int mid, int right) {
    long long count = 0;
    vector<int> temp;
    int i = left, j = mid + 1;
    
    while(i <= mid && j <= right) {
        if(arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            // arr[i] > arr[j], so all elements from i to mid form inversions
            count += (mid - i + 1);
            temp.push_back(arr[j++]);
        }
    }
    
    while(i <= mid) temp.push_back(arr[i++]);
    while(j <= right) temp.push_back(arr[j++]);
    
    for(int k = left; k <= right; k++) {
        arr[k] = temp[k - left];
    }
    
    return count;
}

long long countInversions(vector<int>& arr, int left, int right) {
    if(left >= right) return 0;
    
    int mid = left + (right - left) / 2;
    long long count = 0;
    
    count += countInversions(arr, left, mid);
    count += countInversions(arr, mid + 1, right);
    count += mergeAndCount(arr, left, mid, right);
    
    return count;
}
```

---

## Problem 4: Reverse Pairs

**Source**: [LeetCode 493](https://leetcode.com/problems/reverse-pairs/)  
**Difficulty**: 🔴 Hard

### Problem Statement
Count pairs (i, j) where i < j and nums[i] > 2 * nums[j].

### Examples
```
Input: [1,3,2,3,1]
Output: 2

Input: [2,4,3,5,1]
Output: 3
```

### Complete Solution
```cpp
int mergeAndCount(vector<int>& nums, int left, int mid, int right) {
    int count = 0;
    int j = mid + 1;
    
    // Count reverse pairs
    for(int i = left; i <= mid; i++) {
        while(j <= right && nums[i] > 2LL * nums[j]) {
            j++;
        }
        count += (j - (mid + 1));
    }
    
    // Merge
    vector<int> temp;
    int i = left;
    j = mid + 1;
    
    while(i <= mid && j <= right) {
        if(nums[i] <= nums[j]) temp.push_back(nums[i++]);
        else temp.push_back(nums[j++]);
    }
    
    while(i <= mid) temp.push_back(nums[i++]);
    while(j <= right) temp.push_back(nums[j++]);
    
    for(int k = left; k <= right; k++) {
        nums[k] = temp[k - left];
    }
    
    return count;
}

int reversePairs(vector<int>& nums, int left, int right) {
    if(left >= right) return 0;
    
    int mid = left + (right - left) / 2;
    int count = 0;
    
    count += reversePairs(nums, left, mid);
    count += reversePairs(nums, mid + 1, right);
    count += mergeAndCount(nums, left, mid, right);
    
    return count;
}
```

---

## Problem 5: Maximum Product Subarray

**Source**: [LeetCode 152](https://leetcode.com/problems/maximum-product-subarray/)  
**Difficulty**: 🔴 Hard  
**Company Tags**: Amazon, Microsoft, Google

### Problem Statement
Find the contiguous subarray with maximum product.

### Examples
```
Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has maximum product

Input: [-2,0,-1]
Output: 0
```

### Optimal Approach: Track Min and Max
**Time**: O(n) | **Space**: O(1)

**Intuition**: Negative numbers can make a small product become large, so track both min and max.

### Complete Solution
```cpp
int maxProduct(vector<int>& nums) {
    int maxProd = nums[0];
    int minProd = nums[0];
    int result = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        if(nums[i] < 0) {
            swap(maxProd, minProd);
        }
        
        maxProd = max(nums[i], maxProd * nums[i]);
        minProd = min(nums[i], minProd * nums[i]);
        
        result = max(result, maxProd);
    }
    
    return result;
}
```

### Dry Run
```
Input: [2, 3, -2, 4]

i=0: maxProd=2, minProd=2, result=2
i=1: maxProd=max(3, 2*3)=6, minProd=min(3, 2*3)=3, result=6
i=2: nums[2]<0 → swap
     maxProd=max(-2, 3*-2)=-2, minProd=min(-2, 6*-2)=-12, result=6
i=3: maxProd=max(4, -2*4)=4, minProd=min(4, -12*4)=-48, result=6

Result: 6 ✓
```

---

## Problem 6: 3Sum

**Source**: [LeetCode 15](https://leetcode.com/problems/3sum/)  
**Difficulty**: 🔴 Hard  
**Company Tags**: Amazon, Google, Meta  
**Frequency**: Very High

### Problem Statement
Find all unique triplets that sum to zero.

### Examples
```
Input: [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Input: [0,0,0]
Output: [[0,0,0]]
```

### Optimal Approach: Sort + Two Pointers
**Time**: O(n²) | **Space**: O(1)

### Complete Solution
```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> result;
    sort(nums.begin(), nums.end());
    
    for(int i = 0; i < nums.size() - 2; i++) {
        if(i > 0 && nums[i] == nums[i-1]) continue;  // Skip duplicates
        
        int left = i + 1, right = nums.size() - 1;
        
        while(left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            if(sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while(left < right && nums[left] == nums[left+1]) left++;
                while(left < right && nums[right] == nums[right-1]) right--;
                left++;
                right--;
            } else if(sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
```

---

## Problem 7: 4Sum

**Source**: [LeetCode 18](https://leetcode.com/problems/4sum/)  
**Difficulty**: 🔴 Hard

### Problem Statement
Find all unique quadruplets that sum to target.

### Examples
```
Input: [1,0,-1,0,-2,2], target=0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

### Complete Solution
```cpp
vector<vector<int>> fourSum(vector<int>& nums, int target) {
    vector<vector<int>> result;
    sort(nums.begin(), nums.end());
    int n = nums.size();
    
    for(int i = 0; i < n - 3; i++) {
        if(i > 0 && nums[i] == nums[i-1]) continue;
        
        for(int j = i + 1; j < n - 2; j++) {
            if(j > i + 1 && nums[j] == nums[j-1]) continue;
            
            long long newTarget = (long long)target - nums[i] - nums[j];
            int left = j + 1, right = n - 1;
            
            while(left < right) {
                long long sum = nums[left] + nums[right];
                
                if(sum == newTarget) {
                    result.push_back({nums[i], nums[j], nums[left], nums[right]});
                    while(left < right && nums[left] == nums[left+1]) left++;
                    while(left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if(sum < newTarget) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}
```

---

## Problem 8: Median of Two Sorted Arrays

**Source**: [LeetCode 4](https://leetcode.com/problems/median-of-two-sorted-arrays/)  
**Difficulty**: 🔴 Hard  
**Company Tags**: Google, Amazon, Microsoft  
**Frequency**: Very High

### Problem Statement
Find the median of two sorted arrays in O(log(min(m,n))) time.

### Examples
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.0
Explanation: Merged = [1,2,3], median = 2

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.5
Explanation: Merged = [1,2,3,4], median = (2+3)/2 = 2.5
```

### Optimal Approach: Binary Search on Smaller Array
**Time**: O(log(min(m,n))) | **Space**: O(1)

**Intuition**: Partition both arrays such that left half has same number of elements as right half.

### Complete Solution
```cpp
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if(nums1.size() > nums2.size()) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
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

---

## Problem 9: Kth Element of Two Sorted Arrays

**Source**: [GFG](https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/)  
**Difficulty**: 🔴 Hard

### Problem Statement
Find the kth element in the merged sorted array.

### Examples
```
Input: A = [2,3,6,7,9], B = [1,4,8,10], k = 5
Output: 6
Explanation: Merged = [1,2,3,4,6,7,8,9,10], 5th element = 6
```

### Complete Solution
```cpp
int kthElement(vector<int>& A, vector<int>& B, int k) {
    if(A.size() > B.size()) return kthElement(B, A, k);
    
    int m = A.size(), n = B.size();
    int left = 0, right = m;
    
    while(left <= right) {
        int partitionX = left + (right - left) / 2;
        int partitionY = k - partitionX;
        
        int maxX = (partitionX == 0) ? INT_MIN : A[partitionX - 1];
        int minX = (partitionX == m) ? INT_MAX : A[partitionX];
        
        int maxY = (partitionY == 0) ? INT_MIN : B[partitionY - 1];
        int minY = (partitionY == n) ? INT_MAX : B[partitionY];
        
        if(maxX <= minY && maxY <= minX) {
            return max(maxX, maxY);
        } else if(maxX > minY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    
    return 0;
}
```

---

## 📊 Progress Tracker

- [ ] Problem 1-3 completed
- [ ] Problem 4-6 completed
- [ ] Problem 7-9 completed

**Total: 9 Hard Problems**

---

**Next**: [Pattern Recognition Guide](../08_Pattern_Recognition/Complete_Guide.md) →

[← Back to README](../README.md) | [Medium Problems](../06_Medium_Problems/Complete_Solutions.md)

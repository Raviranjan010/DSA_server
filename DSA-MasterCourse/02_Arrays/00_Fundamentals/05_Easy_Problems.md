# Array Basic Problems — Easy Level (Striver Sheet)

> **15 fundamental array problems for beginners**  
> **Prerequisites**: Array Basics, Fundamentals  
> **Time Required**: 4-5 hours  
> **Pattern**: Basic Array Operations

---

## 🗺️ Problem Index

| # | Problem | Difficulty | Key Technique | LeetCode | GFG | Others |
|---|---------|------------|---------------|----------|-----|--------|
| 1 | Largest Element | 🟢 Easy | Linear Scan | — | [GFG](https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1) | [Coding Ninjas](https://www.naukri.com/code360/problems/largest-element-in-the-array_5026279) |
| 2 | Second Largest | 🟢 Easy | Two Variables | — | [GFG](https://www.geeksforgeeks.org/find-second-largest-element-in-an-array/) | [Coding Ninjas](https://www.naukri.com/code360/problems/ninja-and-the-second-order-elements_6581960) |
| 3 | Check Sorted | 🟢 Easy | Adjacent Compare | [LC 1752](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/) | [GFG](https://www.geeksforgeeks.org/check-if-an-array-is-sorted-or-not/) | [HackerEarth](https://www.hackerearth.com/practice/algorithms/sorting/bubble-sort/practice-problems/) |
| 4 | Remove Duplicates | 🟢 Easy | Two Pointers | [LC 26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | [GFG](https://www.geeksforgeeks.org/remove-duplicates-sorted-array/) | [InterviewBit](https://www.interviewbit.com/problems/remove-duplicates-from-sorted-array/) |
| 5 | Left Rotate by One | 🟢 Easy | Shift Elements | — | [GFG](https://www.geeksforgeeks.org/left-rotate-array-by-one/) | [Coding Ninjas](https://www.naukri.com/code360/problems/left-rotate-an-array-by-one_5026278) |
| 6 | Left Rotate by K | 🟢 Easy | Reversal Algo | [LC 189](https://leetcode.com/problems/rotate-array/) | [GFG](https://www.geeksforgeeks.org/array-rotation/) | [InterviewBit](https://www.interviewbit.com/problems/rotate-array/) |
| 7 | Move Zeros to End | 🟢 Easy | Two Pointers | [LC 283](https://leetcode.com/problems/move-zeroes/) | [GFG](https://www.geeksforgeeks.org/move-zeroes-end-array/) | [HackerRank](https://www.hackerrank.com/challenges/arrays-ds/problem) |
| 8 | Linear Search | 🟢 Easy | Sequential Scan | — | [GFG](https://www.geeksforgeeks.org/linear-search/) | [HackerEarth](https://www.hackerearth.com/practice/algorithms/searching/linear-search/practice-problems/) |
| 9 | Union of Sorted Arrays | 🟢 Easy | Two Pointer Merge | — | [GFG](https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/) | [Coding Ninjas](https://www.naukri.com/code360/problems/sorted-array_6613259) |
| 10 | Missing Number | 🟢 Easy | Sum / XOR | [LC 268](https://leetcode.com/problems/missing-number/) | [GFG](https://www.geeksforgeeks.org/find-the-missing-number/) | [InterviewBit](https://www.interviewbit.com/problems/find-missing-integer/) |
| 11 | Max Consecutive Ones | 🟢 Easy | Sliding Counter | [LC 485](https://leetcode.com/problems/max-consecutive-ones/) | [GFG](https://www.geeksforgeeks.org/maximum-consecutive-ones-or-zeros-in-a-binary-array/) | [Coding Ninjas](https://www.naukri.com/code360/problems/traffic_6784631) |
| 12 | Single Number | 🟢 Easy | XOR Trick | [LC 136](https://leetcode.com/problems/single-number/) | [GFG](https://www.geeksforgeeks.org/find-element-appears-array-every-element-appears-twice/) | [InterviewBit](https://www.interviewbit.com/problems/single-number/) |
| 13 | Longest Subarray Sum K (Positives) | 🟢 Easy | Sliding Window | — | [GFG](https://www.geeksforgeeks.org/longest-sub-array-sum-k/) | [Coding Ninjas](https://www.naukri.com/code360/problems/longest-subarray-with-sum-k_6682399) |
| 14 | Longest Subarray Sum K (All) | 🟡 Medium | Prefix Sum + Hash | [LC 560](https://leetcode.com/problems/subarray-sum-equals-k/) | [GFG](https://www.geeksforgeeks.org/longest-sub-array-sum-k/) | [Coding Ninjas](https://www.naukri.com/code360/problems/longest-subarray-with-sum-k_5713505) |
| 15 | Two Sum | 🟢 Easy | Hash Map | [LC 1](https://leetcode.com/problems/two-sum/) | [GFG](https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/) | [InterviewBit](https://www.interviewbit.com/problems/2-sum/) |

---

## Problem 1: Largest Element in Array

**Source**: https://www.geeksforgeeks.org/largest-element-in-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 Very High

### Problem Statement
Find the largest element in an array.

### Examples
```
Input: arr = [1, 8, 7, 56, 90]
Output: 90

Input: arr = [5, 5, 5, 5]
Output: 5
```

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

int largestElement(vector<int>& arr) {
    int maxVal = arr[0];
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}

// Alternative using STL
int largestElementSTL(vector<int>& arr) {
    return *max_element(arr.begin(), arr.end());
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Largest in Array](https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1) | Direct problem |
| Coding Ninjas | [Largest Element](https://www.naukri.com/code360/problems/largest-element-in-the-array_5026279) | With hints |
| LeetCode (related) | [Kth Largest — LC 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Extension: find Kth largest |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Second Largest Element | GFG | [Link](https://www.geeksforgeeks.org/find-second-largest-element-in-an-array/) | 🟢 Easy |
| Kth Largest in Array | LeetCode 215 | [Link](https://leetcode.com/problems/kth-largest-element-in-an-array/) | 🟡 Medium |
| Find Maximum in Generated Array | LeetCode 1646 | [Link](https://leetcode.com/problems/get-maximum-in-generated-array/) | 🟢 Easy |
| Largest Number | LeetCode 179 | [Link](https://leetcode.com/problems/largest-number/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 2: Second Largest Element

**Source**: https://www.geeksforgeeks.org/find-second-largest-element-in-an-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, TCS  
**Frequency**: 📅 High

### Problem Statement
Find the second largest element in an array. Return -1 if no second largest exists.

### Examples
```
Input: arr = [12, 35, 1, 10, 34, 1]
Output: 34

Input: arr = [10, 10, 10]
Output: -1
```

### Complete Solution
```cpp
int secondLargest(vector<int>& arr) {
    int largest = -1, secondLargest = -1;
    
    for(int num : arr) {
        if(num > largest) {
            secondLargest = largest;
            largest = num;
        } else if(num > secondLargest && num != largest) {
            secondLargest = num;
        }
    }
    
    return secondLargest;
}
```

### Edge Cases
1. ✅ All elements same → -1
2. ✅ Only one element → -1
3. ✅ No second largest → -1

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Second Largest](https://www.geeksforgeeks.org/find-second-largest-element-in-an-array/) | Classic formulation |
| Coding Ninjas | [2nd Order Elements](https://www.naukri.com/code360/problems/ninja-and-the-second-order-elements_6581960) | Also asks for 2nd smallest |
| LeetCode (related) | [Kth Largest — LC 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Generalization to Kth |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Kth Largest Element | LeetCode 215 | [Link](https://leetcode.com/problems/kth-largest-element-in-an-array/) | 🟡 Medium |
| Top K Frequent Elements | LeetCode 347 | [Link](https://leetcode.com/problems/top-k-frequent-elements/) | 🟡 Medium |
| Find Kth Largest Integer (String) | LeetCode 1985 | [Link](https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 3: Check if Array is Sorted

**Source**: https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 High

### Problem Statement
Check if an array is sorted in non-decreasing order.

### Examples
```
Input: arr = [1, 2, 3, 4, 5]
Output: true

Input: arr = [5, 4, 3, 2, 1]
Output: false

Input: arr = [1, 1, 2, 2, 3]
Output: true
```

### Complete Solution
```cpp
bool isSorted(vector<int>& arr) {
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i] < arr[i-1]) {
            return false;
        }
    }
    return true;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 1752 | [Check Sorted & Rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/) | Extension: also detects rotated |
| GeeksforGeeks | [Check Sorted](https://www.geeksforgeeks.org/check-if-an-array-is-sorted-or-not/) | Basic version |
| LeetCode 896 | [Monotonic Array](https://leetcode.com/problems/monotonic-array/) | Generalization |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Check if Array is Sorted and Rotated | LeetCode 1752 | [Link](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/) | 🟢 Easy |
| Monotonic Array | LeetCode 896 | [Link](https://leetcode.com/problems/monotonic-array/) | 🟢 Easy |
| Count Inversions | GFG | [Link](https://www.geeksforgeeks.org/count-inversions-array-set-1-using-merge-sort/) | 🔴 Hard |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 4: Remove Duplicates from Sorted Array

**Source**: https://leetcode.com/problems/remove-duplicates-from-sorted-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Given a sorted array, remove duplicates in-place such that each element appears only once. Return the new length.

### Examples
```
Input: nums = [1, 1, 2]
Output: 2, nums = [1, 2, _]

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if(nums.empty()) return 0;
    
    int i = 0;  // Slow pointer
    for(int j = 1; j < nums.size(); j++) {
        if(nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    
    return i + 1;
}
```

### Two Pointer Approach
```
[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
 i  j

Step 1: nums[1] == nums[0] → j++
Step 2: nums[2] != nums[0] → i=1, nums[1]=nums[2]=1, j++
[0, 1, 1, 1, 1, 2, 2, 3, 3, 4]
    i     j
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 26 | [Remove Duplicates](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Classic two-pointer |
| InterviewBit | [Remove Duplicates](https://www.interviewbit.com/problems/remove-duplicates-from-sorted-array/) | With explanation |
| GFG | [Remove Duplicates Sorted](https://www.geeksforgeeks.org/remove-duplicates-sorted-array/) | Multiple approaches |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Remove Duplicates II (allow 2x) | LeetCode 80 | [Link](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) | 🟡 Medium |
| Remove Element | LeetCode 27 | [Link](https://leetcode.com/problems/remove-element/) | 🟢 Easy |
| Remove Duplicates from Unsorted | GFG | [Link](https://www.geeksforgeeks.org/remove-duplicates-from-an-unsorted-array/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1) - In-place

---

## Problem 5: Left Rotate Array by One

**Source**: https://www.geeksforgeeks.org/left-rotate-array-by-one/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 TCS, Infosys  
**Frequency**: 📅 Medium

### Problem Statement
Rotate array to the left by one position.

### Examples
```
Input: arr = [1, 2, 3, 4, 5]
Output: [2, 3, 4, 5, 1]
```

### Complete Solution
```cpp
void rotateLeftByOne(vector<int>& arr) {
    int first = arr[0];
    for(int i = 1; i < arr.size(); i++) {
        arr[i-1] = arr[i];
    }
    arr[arr.size() - 1] = first;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Left Rotate by One](https://www.geeksforgeeks.org/left-rotate-array-by-one/) | Direct problem |
| Coding Ninjas | [Left Rotate an Array by One](https://www.naukri.com/code360/problems/left-rotate-an-array-by-one_5026278) | With hints |
| LeetCode (related) | [Rotate Array — LC 189](https://leetcode.com/problems/rotate-array/) | Rotate by k positions |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Rotate Array | LeetCode 189 | [Link](https://leetcode.com/problems/rotate-array/) | 🟢 Easy |
| Rotate Array by K | GFG | [Link](https://www.geeksforgeeks.org/array-rotation/) | 🟢 Easy |
| Cyclic Permutation | LeetCode 61 | [Link](https://leetcode.com/problems/rotate-list/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 6: Left Rotate Array by K Places

**Source**: https://leetcode.com/problems/rotate-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Rotate array to the left by k positions.

### Examples
```
Input: arr = [1, 2, 3, 4, 5, 6, 7], k = 3
Output: [4, 5, 6, 7, 1, 2, 3]
```

### Complete Solution (Reversal Algorithm)
```cpp
void reverse(vector<int>& arr, int start, int end) {
    while(start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}

void rotateLeftByK(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;  // Handle k > n
    
    reverse(arr, 0, k - 1);      // Reverse first k elements
    reverse(arr, k, n - 1);      // Reverse remaining elements
    reverse(arr, 0, n - 1);      // Reverse entire array
}
```

### Dry Run
```
arr = [1, 2, 3, 4, 5, 6, 7], k = 3

Step 1: Reverse [0, 2] → [3, 2, 1, 4, 5, 6, 7]
Step 2: Reverse [3, 6] → [3, 2, 1, 7, 6, 5, 4]
Step 3: Reverse [0, 6] → [4, 5, 6, 7, 1, 2, 3] ✓
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 189 | [Rotate Array](https://leetcode.com/problems/rotate-array/) | Direct problem |
| GeeksforGeeks | [Array Rotation](https://www.geeksforgeeks.org/array-rotation/) | Reversal algo |
| InterviewBit | [Rotate Array](https://www.interviewbit.com/problems/rotate-array/) | Similar problem |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Rotate Image | LeetCode 48 | [Link](https://leetcode.com/problems/rotate-image/) | 🟡 Medium |
| Cyclic Permutation | LeetCode 61 | [Link](https://leetcode.com/problems/rotate-list/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 7: Move Zeros to End

**Source**: https://leetcode.com/problems/move-zeroes/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Facebook, Amazon  
**Frequency**: 📅 Very High

### Problem Statement
Move all zeros to the end of array while maintaining the relative order of non-zero elements.

### Examples
```
Input: nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

### Complete Solution
```cpp
void moveZeroes(vector<int>& nums) {
    int i = 0;  // Position for next non-zero
    
    for(int j = 0; j < nums.size(); j++) {
        if(nums[j] != 0) {
            swap(nums[i], nums[j]);
            i++;
        }
    }
}
```

### Two Pointer Approach
```
[0, 1, 0, 3, 12]
 i  j

j=0: nums[0]=0 → skip
j=1: nums[1]=1 → swap(i,j), i++ → [1, 0, 0, 3, 12], i=1
j=2: nums[2]=0 → skip
j=3: nums[3]=3 → swap(i,j), i++ → [1, 3, 0, 0, 12], i=2
j=4: nums[4]=12 → swap(i,j), i++ → [1, 3, 12, 0, 0], i=3
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 283 | [Move Zeroes](https://leetcode.com/problems/move-zeroes/) | Direct problem |
| GeeksforGeeks | [Move Zeroes to End](https://www.geeksforgeeks.org/move-zeroes-end-array/) | Direct problem |
| HackerRank | [Arrays - DS](https://www.hackerrank.com/challenges/arrays-ds/problem) | Related |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Move Zeroes II | LeetCode 283 | [Link](https://leetcode.com/problems/move-zeroes/) | 🟢 Easy |
| Sort Array By Parity | LeetCode 905 | [Link](https://leetcode.com/problems/sort-array-by-parity/) | 🟢 Easy |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 8: Linear Search

**Source**: https://www.geeksforgeeks.org/linear-search/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 High

### Problem Statement
Find an element in an array using linear search.

### Complete Solution
```cpp
int linearSearch(vector<int>& arr, int target) {
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] == target) {
            return i;
        }
    }
    return -1;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Linear Search](https://www.geeksforgeeks.org/linear-search/) | Direct problem |
| HackerEarth | [Linear Search practice](https://www.hackerearth.com/practice/algorithms/searching/linear-search/practice-problems/) | Practice problems |
| Coding Ninjas | [Linear Search](https://www.naukri.com/code360/problems/linear-search_5026280) | Similar practice |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Binary Search | LeetCode 704 | [Link](https://leetcode.com/problems/binary-search/) | 🟢 Easy |
| Search in Rotated Sorted Array | LeetCode 33 | [Link](https://leetcode.com/problems/search-in-rotated-sorted-array/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 9: Union of Two Sorted Arrays

**Source**: https://www.geeksforgeeks.org/union-of-two-arrays/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 High

### Problem Statement
Given two sorted arrays, find their union (all distinct elements).

### Examples
```
Input: arr1 = [1, 2, 3, 4, 5], arr2 = [1, 2, 3, 6, 7]
Output: [1, 2, 3, 4, 5, 6, 7]
```

### Complete Solution
```cpp
vector<int> findUnion(vector<int>& arr1, vector<int>& arr2) {
    vector<int> result;
    int i = 0, j = 0;
    
    while(i < arr1.size() && j < arr2.size()) {
        if(arr1[i] <= arr2[j]) {
            if(result.empty() || result.back() != arr1[i]) {
                result.push_back(arr1[i]);
            }
            i++;
        } else {
            if(result.empty() || result.back() != arr2[j]) {
                result.push_back(arr2[j]);
            }
            j++;
        }
    }
    
    while(i < arr1.size()) {
        if(result.empty() || result.back() != arr1[i]) {
            result.push_back(arr1[i]);
        }
        i++;
    }
    
    while(j < arr2.size()) {
        if(result.empty() || result.back() != arr2[j]) {
            result.push_back(arr2[j]);
        }
        j++;
    }
    
    return result;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Union and Intersection of Two Sorted Arrays](https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/) | Direct problem |
| Coding Ninjas | [Sorted Array](https://www.naukri.com/code360/problems/sorted-array_6613259) | Related |
| LeetCode (related) | [Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) | Similar approach |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Intersection of Two Arrays | LeetCode 349 | [Link](https://leetcode.com/problems/intersection-of-two-arrays/) | 🟢 Easy |
| Merge Sorted Array | LeetCode 88 | [Link](https://leetcode.com/problems/merge-sorted-array/) | 🟢 Easy |

### Complexity
- **Time**: O(m + n)
- **Space**: O(m + n)

---

## Problem 10: Find Missing Number

**Source**: https://leetcode.com/problems/missing-number/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 Very High

### Problem Statement
Given an array containing n distinct numbers in the range [0, n], find the missing number.

### Examples
```
Input: nums = [3, 0, 1]
Output: 2

Input: nums = [0, 1]
Output: 2
```

### Complete Solution (Sum Formula)
```cpp
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    
    for(int num : nums) {
        actualSum += num;
    }
    
    return expectedSum - actualSum;
}
```

### Alternative (XOR Method)
```cpp
int missingNumberXOR(vector<int>& nums) {
    int xor1 = 0, xor2 = 0;
    int n = nums.size();
    
    for(int i = 0; i <= n; i++) {
        xor1 ^= i;
    }
    
    for(int num : nums) {
        xor2 ^= num;
    }
    
    return xor1 ^ xor2;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 268 | [Missing Number](https://leetcode.com/problems/missing-number/) | Direct problem |
| GeeksforGeeks | [Find the Missing Number](https://www.geeksforgeeks.org/find-the-missing-number/) | Direct problem |
| InterviewBit | [Find Missing Integer](https://www.interviewbit.com/problems/find-missing-integer/) | Direct problem |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Find the Duplicate Number | LeetCode 287 | [Link](https://leetcode.com/problems/find-the-duplicate-number/) | 🟡 Medium |
| First Missing Positive | LeetCode 41 | [Link](https://leetcode.com/problems/first-missing-positive/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 11: Maximum Consecutive Ones

**Source**: https://leetcode.com/problems/max-consecutive-ones/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Google, Facebook  
**Frequency**: 📅 High

### Problem Statement
Find the maximum number of consecutive 1s in a binary array.

### Examples
```
Input: nums = [1, 1, 0, 1, 1, 1]
Output: 3

Input: nums = [1, 0, 1, 1, 0, 1]
Output: 2
```

### Complete Solution
```cpp
int findMaxConsecutiveOnes(vector<int>& nums) {
    int maxCount = 0, currentCount = 0;
    
    for(int num : nums) {
        if(num == 1) {
            currentCount++;
            maxCount = max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }
    
    return maxCount;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 485 | [Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/) | Direct problem |
| GeeksforGeeks | [Maximum Consecutive Ones or Zeros](https://www.geeksforgeeks.org/maximum-consecutive-ones-or-zeros-in-a-binary-array/) | Direct problem |
| Coding Ninjas | [Traffic](https://www.naukri.com/code360/problems/traffic_6784631) | Similar |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Max Consecutive Ones II | LeetCode 487 | [Link](https://leetcode.com/problems/max-consecutive-ones-ii/) | 🟡 Medium |
| Longest Consecutive Sequence | LeetCode 128 | [Link](https://leetcode.com/problems/longest-consecutive-sequence/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 12: Find the Number that Appears Once

**Source**: https://leetcode.com/problems/single-number/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Google, Facebook  
**Frequency**: 📅 Very High

### Problem Statement
Given a non-empty array where every element appears twice except for one. Find that single one.

### Examples
```
Input: nums = [2, 2, 1]
Output: 1

Input: nums = [4, 1, 2, 1, 2]
Output: 4
```

### Complete Solution (XOR)
```cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for(int num : nums) {
        result ^= num;  // XOR cancels out duplicates
    }
    return result;
}
```

### Why XOR Works
```
a ^ a = 0
a ^ 0 = a
4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ^ (1 ^ 1) ^ (2 ^ 2) = 4 ^ 0 ^ 0 = 4
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 136 | [Single Number](https://leetcode.com/problems/single-number/) | Direct problem |
| GeeksforGeeks | [Find element appears only once](https://www.geeksforgeeks.org/find-element-appears-array-every-element-appears-twice/) | Similar |
| InterviewBit | [Single Number](https://www.interviewbit.com/problems/single-number/) | Direct problem |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Single Number II | LeetCode 137 | [Link](https://leetcode.com/problems/single-number-ii/) | 🟡 Medium |
| Single Number III | LeetCode 260 | [Link](https://leetcode.com/problems/single-number-iii/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(1)

---

## Problem 13: Longest Subarray with Sum K (Positives Only)

**Source**: https://www.geeksforgeeks.org/longest-sub-array-sum-k/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon, Flipkart  
**Frequency**: 📅 High

### Problem Statement
Given an array of positive integers, find the length of the longest subarray with sum equal to k.

### Examples
```
Input: arr = [1, 2, 3, 1, 1, 1, 1], k = 3
Output: 2 (subarray [1, 2] or [3])

Input: arr = [1, 2, 3], k = 3
Output: 2
```

### Complete Solution (Two Pointer)
```cpp
int longestSubarrayWithSumK(vector<int>& arr, int k) {
    int left = 0, right = 0;
    long long currentSum = arr[0];
    int maxLength = 0;
    
    while(right < arr.size()) {
        while(left <= right && currentSum > k) {
            currentSum -= arr[left];
            left++;
        }
        
        if(currentSum == k) {
            maxLength = max(maxLength, right - left + 1);
        }
        
        right++;
        if(right < arr.size()) {
            currentSum += arr[right];
        }
    }
    
    return maxLength;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Longest Subarray Sum K](https://www.geeksforgeeks.org/longest-sub-array-sum-k/) | Direct problem |
| Coding Ninjas | [Longest Subarray with Sum K](https://www.naukri.com/code360/problems/longest-subarray-with-sum-k_6682399) | Positives only version |
| LeetCode 560 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Direct problem |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Subarray Sum Equals K | LeetCode 560 | [Link](https://leetcode.com/problems/subarray-sum-equals-k/) | 🟡 Medium |
| Count Subarrays with Sum K | LeetCode 560 | [Link](https://leetcode.com/problems/subarray-sum-equals-k/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(n)

---

## Problem 14: Longest Subarray with Sum K (Positives & Negatives)

**Source**: https://leetcode.com/problems/subarray-sum-equals-k/  
**Difficulty**: 🟡 Medium (Easy concept)  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 Very High

### Problem Statement
Given an array of integers (positive and negative), find the length of the longest subarray with sum equal to k.

### Complete Solution (Prefix Sum + Hashing)
```cpp
#include <unordered_map>

int longestSubarrayWithSumKGeneral(vector<int>& arr, int k) {
    unordered_map<int, int> prefixSum;
    int currentSum = 0;
    int maxLength = 0;
    
    for(int i = 0; i < arr.size(); i++) {
        currentSum += arr[i];
        
        if(currentSum == k) {
            maxLength = max(maxLength, i + 1);
        }
        
        if(prefixSum.find(currentSum - k) != prefixSum.end()) {
            maxLength = max(maxLength, i - prefixSum[currentSum - k]);
        }
        
        if(prefixSum.find(currentSum) == prefixSum.end()) {
            prefixSum[currentSum] = i;
        }
    }
    
    return maxLength;
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| GeeksforGeeks | [Longest Subarray Sum K](https://www.geeksforgeeks.org/longest-sub-array-sum-k/) | Direct problem |
| Coding Ninjas | [Longest Subarray with Sum K](https://www.naukri.com/code360/problems/longest-subarray-with-sum-k_5713505) | Direct problem |
| LeetCode 560 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Direct problem |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| Subarray Sum Equals K | LeetCode 560 | [Link](https://leetcode.com/problems/subarray-sum-equals-k/) | 🟡 Medium |
| Count Subarrays with Sum K | LeetCode 560 | [Link](https://leetcode.com/problems/subarray-sum-equals-k/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(n)

---

## Problem 15: Two Sum

**Source**: https://leetcode.com/problems/two-sum/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 All companies  
**Frequency**: 📅 Very High

### Problem Statement
Given an array and a target, return indices of two numbers that add up to target.

### Examples
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1] (nums[0] + nums[1] = 2 + 7 = 9)
```

### Complete Solution (Hashing)
```cpp
#include <unordered_map>

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if(numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    
    return {};
}
```

### Practice Links

| Platform | Link | Notes |
|----------|------|-------|
| LeetCode 1 | [Two Sum](https://leetcode.com/problems/two-sum/) | Direct problem |
| GeeksforGeeks | [Check for pair with sum x](https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/) | Similar |
| InterviewBit | [2 Sum](https://www.interviewbit.com/problems/2-sum/) | Direct problem |

### Similar / Follow-Up Problems

| Problem | Platform | Link | Difficulty |
|---------|----------|------|-----------|
| 3Sum | LeetCode 15 | [Link](https://leetcode.com/problems/3sum/) | 🟡 Medium |
| Two Sum Less Than K | LeetCode 167 | [Link](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | 🟡 Medium |

### Complexity
- **Time**: O(n)
- **Space**: O(n)

---

## 🎯 Key Takeaways

1. **Largest/Second Largest** - Single pass with two variables
2. **Sorted Check** - Compare adjacent elements
3. **Remove Duplicates** - Two pointers (slow-fast)
4. **Rotate Array** - Reversal algorithm (optimal)
5. **Move Zeros** - Two pointers, maintain order
6. **Union** - Merge-like approach for sorted arrays
7. **Missing Number** - Sum formula or XOR
8. **Consecutive Ones** - Track current and max count
9. **Single Number** - XOR property (a^a=0, a^0=a)
10. **Subarray Sum K** - Two pointer (positive) or Hashing (general)
11. **Two Sum** - Hash map for O(n) solution
12. **Space Optimization** - Most problems O(1) space
13. **Time Optimization** - All O(n) single pass

---

**Master these basics before moving to Medium!**

[← Back to Fundamentals](../00_Fundamentals/Array_Basics.md) | [Medium Problems →](Array_Medium_Problems.md)

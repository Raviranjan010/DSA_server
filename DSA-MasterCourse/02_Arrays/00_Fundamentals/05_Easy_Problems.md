# Array Basic Problems — Easy Level (Striver Sheet)

> **15 fundamental array problems for beginners**  
> **Prerequisites**: Array Basics, Fundamentals  
> **Time Required**: 4-5 hours  
> **Pattern**: Basic Array Operations

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

### Complexity
- **Time**: O(n) - Single pass
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
        if(result.back() != arr1[i]) {
            result.push_back(arr1[i]);
        }
        i++;
    }
    
    while(j < arr2.size()) {
        if(result.back() != arr2[j]) {
            result.push_back(arr2[j]);
        }
        j++;
    }
    
    return result;
}
```

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

### Complexity
- **Time**: O(n)
- **Space**: O(1)

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

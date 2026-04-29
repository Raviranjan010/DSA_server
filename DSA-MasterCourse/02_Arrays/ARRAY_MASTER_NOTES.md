# 📘 ARRAYS — Complete Master Notes (Striver-Style)

> **The Ultimate Guide to Mastering Arrays in DSA**  
> **Based on**: Striver's A2Z DSA Course/Sheet  
> **Covers**: Basics → Patterns → Problems → Interview Prep  
> **Time Required**: 21 Days Complete Journey  
> **Total Problems**: 85+ with Solutions

---

## 📋 TABLE OF CONTENTS

1. [Array Fundamentals](#1-array-fundamentals)
2. [Essential Array Patterns](#2-essential-array-patterns)
3. [Problem-Solving Framework](#3-problem-solving-framework)
4. [Complete Problem Solutions](#4-complete-problem-solutions)
5. [Interview Preparation](#5-interview-preparation)
6. [Quick Reference Templates](#6-quick-reference-templates)

---

## 📚 Related Resources

- [Complete README with Learning Path](README.md)
- [Problem Index - All 85+ Problems](PROBLEM_INDEX.md)
- [Easy Problems](00_Fundamentals/05_Easy_Problems.md)
- [Medium Problems with Solutions](06_Medium_Problems/Complete_Solutions.md)
- [Hard Problems with Solutions](07_Hard_Problems/Complete_Solutions.md)
- [Pattern Recognition Guide](08_Pattern_Recognition/Complete_Guide.md)

---

## 1. ARRAY FUNDAMENTALS

### 1.1 What is an Array?

**Definition**: An array is a **linear data structure** that stores elements of the **same data type** in **contiguous memory locations**.

**Key Properties**:
- ✅ **Fixed size** (static arrays) or **dynamic size** (vectors)
- ✅ **Homogeneous elements** - all same data type
- ✅ **Contiguous memory** - elements stored side-by-side
- ✅ **O(1) random access** - direct access via index
- ✅ **0-based indexing** - first element at index 0

### 1.2 Memory Layout Visualization

```cpp
int arr[5] = {10, 20, 30, 40, 50};

Memory Representation:
┌─────────────────────────────────────────────┐
│  10  │  20  │  30  │  40  │  50  │
└─────────────────────────────────────────────┘
  1000   1004   1008   1012   1016   ← Addresses
   [0]    [1]    [2]    [3]    [4]   ← Indices

Formula: Address of arr[i] = Base_Address + (i × Size_of_Element)
Example: arr[2] = 1000 + (2 × 4) = 1008
```

**Why this matters**: Understanding memory layout helps you:
- Predict cache behavior (spatial locality)
- Understand why arrays are fast for access
- Know why insertion/deletion is O(n)

### 1.3 Array Declaration in C++

```cpp
// Method 1: Static array (stack memory)
int arr1[5];                          // Uninitialized (garbage values)
int arr2[5] = {1, 2, 3, 4, 5};       // Initialized
int arr3[] = {1, 2, 3, 4, 5};        // Size auto-detected

// Method 2: Dynamic array (heap memory)
int* arr4 = new int[5];               // Must delete[] manually
vector<int> arr5 = {1, 2, 3, 4, 5};  // Recommended (automatic memory management)

// Method 3: Multi-dimensional arrays
int matrix[3][3];                     // 2D array
vector<vector<int>> mat(3, vector<int>(3));  // 2D vector
```

### 1.4 Time & Space Complexity

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Access by index | **O(1)** | O(1) | Fastest operation |
| Search (unsorted) | O(n) | O(1) | Linear scan needed |
| Search (sorted) | **O(log n)** | O(1) | Binary search |
| Insert at end | O(1)* | O(1) | *O(n) if resize needed |
| Insert at position | O(n) | O(1) | Shift elements |
| Delete at end | O(1) | O(1) | Simple |
| Delete at position | O(n) | O(1) | Shift elements |

### 1.5 Array vs Vector

| Feature | Array | Vector |
|---------|-------|--------|
| Size | Fixed | Dynamic |
| Memory | Stack | Heap |
| Speed | Faster | Slightly slower |
| Flexibility | Low | High |
| When to use | Known size, performance critical | Unknown size, need flexibility |

---

## 2. ESSENTIAL ARRAY PATTERNS

### 2.1 Pattern Overview Table

| Pattern | When to Use | Time | Space | Key Problems |
|---------|-------------|------|-------|--------------|
| **Two Pointer** | Sorted arrays, pairs, palindromes | O(n) | O(1) | Two Sum, 3Sum, Container |
| **Sliding Window** | Subarrays, substrings | O(n) | O(1) | Max sum subarray, Longest substring |
| **Prefix Sum** | Range queries, subarray count | O(n) prep, O(1) query | O(n) | Subarray sum equals K |
| **Kadane's Algorithm** | Maximum subarray sum/product | O(n) | O(1) | Maximum subarray |
| **Binary Search** | Sorted data, optimization | O(log n) | O(1) | Search, Peak element |
| **Hashing** | Frequency, lookup | O(n) | O(n) | Two sum, Majority element |
| **Sorting + Arrays** | Order matters | O(n log n) | O(1) | Merge intervals, 3Sum |

### 2.2 Two Pointer Pattern

**Concept**: Use two indices to traverse array simultaneously, eliminating nested loops.

**Types**:
1. **Opposite Direction** - Start from both ends, meet in middle
2. **Same Direction** - Fast and slow pointers
3. **Three Pointer** - Dutch National Flag (0s, 1s, 2s)

#### Template 1: Opposite Direction
```cpp
// Problem: Find if pair with sum exists in sorted array
bool hasPairWithSum(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left < right) {
        int sum = arr[left] + arr[right];
        
        if(sum == target) return true;
        else if(sum < target) left++;      // Need larger sum
        else right--;                       // Need smaller sum
    }
    
    return false;
}
```

**When to use**:
- ✅ Array is sorted
- ✅ Looking for pairs
- ✅ Palindrome checks
- ✅ Container problems

#### Template 2: Fast/Slow Pointers
```cpp
// Problem: Remove duplicates from sorted array
int removeDuplicates(vector<int>& nums) {
    if(nums.empty()) return 0;
    
    int slow = 0;  // Position for next unique element
    
    for(int fast = 1; fast < nums.size(); fast++) {
        if(nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;  // New length
}
```

**When to use**:
- ✅ Remove duplicates
- ✅ Find middle element
- ✅ Cycle detection
- ✅ In-place modifications

#### Template 3: Three Pointers (Dutch National Flag)
```cpp
// Problem: Sort 0s, 1s, 2s
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        }
        else if(nums[mid] == 1) {
            mid++;
        }
        else {  // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--;
        }
    }
}
```

### 2.3 Sliding Window Pattern

**Concept**: Maintain a "window" that slides through the array.

**Types**:
1. **Fixed Window** - Window size is constant
2. **Variable Window** - Window expands/shrinks dynamically

#### Template 1: Fixed Window
```cpp
// Problem: Maximum sum subarray of size k
int maxSumSubarrayOfSizeK(vector<int>& arr, int k) {
    int n = arr.size();
    int currentSum = 0;
    
    // Calculate sum of first window
    for(int i = 0; i < k; i++) {
        currentSum += arr[i];
    }
    
    int maxSum = currentSum;
    
    // Slide window
    for(int i = k; i < n; i++) {
        currentSum += arr[i] - arr[i - k];  // Add new, remove old
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

#### Template 2: Variable Window
```cpp
// Problem: Longest subarray with sum <= k
int longestSubarrayWithSumK(vector<int>& arr, int k) {
    int left = 0, right = 0;
    long long currentSum = 0;
    int maxLength = 0;
    
    while(right < arr.size()) {
        currentSum += arr[right];
        
        // Shrink window if sum exceeds k
        while(currentSum > k && left <= right) {
            currentSum -= arr[left];
            left++;
        }
        
        if(currentSum <= k) {
            maxLength = max(maxLength, right - left + 1);
        }
        
        right++;
    }
    
    return maxLength;
}
```

### 2.4 Prefix Sum Pattern

**Concept**: Precompute cumulative sums to answer range queries in O(1).

```cpp
// Build prefix sum array
vector<int> buildPrefixSum(vector<int>& arr) {
    vector<int> prefix(arr.size());
    prefix[0] = arr[0];
    
    for(int i = 1; i < arr.size(); i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    
    return prefix;
}

// Query sum from index l to r
int rangeSum(vector<int>& prefix, int l, int r) {
    if(l == 0) return prefix[r];
    return prefix[r] - prefix[l-1];
}
```

**Advanced: Prefix Sum with Hash Map**
```cpp
// Problem: Count subarrays with sum = k
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixSumCount;
    prefixSumCount[0] = 1;  // Important base case
    
    int currentSum = 0;
    int count = 0;
    
    for(int num : nums) {
        currentSum += num;
        
        // If (currentSum - k) exists, we found subarrays
        if(prefixSumCount.find(currentSum - k) != prefixSumCount.end()) {
            count += prefixSumCount[currentSum - k];
        }
        
        prefixSumCount[currentSum]++;
    }
    
    return count;
}
```

### 2.5 Kadane's Algorithm

**Concept**: Find maximum subarray sum in O(n) by tracking current and global maximum.

```cpp
// Basic Kadane's Algorithm
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        // Either extend current subarray or start new
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

**Variation: Print the Subarray**
```cpp
pair<int, int> maxSubarrayWithIndices(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    int start = 0, end = 0, tempStart = 0;
    
    for(int i = 1; i < nums.size(); i++) {
        if(nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if(currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {start, end};
}
```

### 2.6 Binary Search Pattern

**Concept**: Divide search space in half at each step for O(log n) search.

**Prerequisites**: Array must be sorted (or have monotonic property).

```cpp
// Standard Binary Search
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow
        
        if(arr[mid] == target) return mid;
        else if(arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;  // Not found
}
```

**Advanced: Binary Search on Answer**
```cpp
// When to minimize/maximize a value
int binarySearchOnAnswer(int low, int high, function<bool(int)> isFeasible) {
    int result = -1;
    
    while(low <= high) {
        int mid = low + (high - low) / 2;
        
        if(isFeasible(mid)) {
            result = mid;
            high = mid - 1;  // Try to minimize
        } else {
            low = mid + 1;   // Need larger value
        }
    }
    
    return result;
}
```

### 2.7 Hashing Pattern

**Concept**: Use hash maps for O(1) average lookup.

```cpp
// Problem: Two Sum
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;  // value -> index
    
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if(numMap.count(complement)) {
            return {numMap[complement], i};
        }
        
        numMap[nums[i]] = i;
    }
    
    return {};
}
```

---

## 3. PROBLEM-SOLVING FRAMEWORK

### 3.1 Striver's 7-Step Approach

```
Step 1: Read & Understand (2 min)
   ↓
Step 2: Identify Constraints (1 min)
   ↓
Step 3: Brute Force Solution (5 min)
   ↓
Step 4: Optimize (10 min)
   ↓
Step 5: Write Code (10 min)
   ↓
Step 6: Test Edge Cases (5 min)
   ↓
Step 7: Analyze Complexity (2 min)
```

### 3.2 Pattern Recognition Checklist

Ask these questions:

1. **Is array sorted?**
   - YES → Binary Search or Two Pointer
   - NO → Can we sort it?

2. **Problem asks for subarray/substring?**
   - Maximum sum → Kadane's Algorithm
   - Specific sum → Prefix Sum + Hashing
   - Longest/shortest → Sliding Window

3. **Looking for pairs/triplets?**
   - Sorted array → Two Pointer
   - Unsorted → Hashing

4. **Minimize/Maximize something?**
   - → Binary Search on Answer

5. **Need frequency/count?**
   - → Hash Map or Frequency Array

### 3.3 Common Edge Cases

Always check:
- ✅ Empty array: `if(arr.empty())`
- ✅ Single element: `if(arr.size() == 1)`
- ✅ All elements same
- ✅ Already sorted / reverse sorted
- ✅ Duplicates present
- ✅ Negative numbers
- ✅ Integer overflow (use `long long`)
- ✅ Index out of bounds

---

## 4. COMPLETE PROBLEM SOLUTIONS

### 4.1 Easy Problems (1-15)

**Problem 1: Largest Element**
```cpp
int largestElement(vector<int>& arr) {
    int maxVal = arr[0];
    for(int i = 1; i < arr.size(); i++) {
        maxVal = max(maxVal, arr[i]);
    }
    return maxVal;
}
// Time: O(n), Space: O(1)
```

**Problem 2: Second Largest**
```cpp
int secondLargest(vector<int>& arr) {
    int largest = INT_MIN, secondLargest = INT_MIN;
    
    for(int num : arr) {
        if(num > largest) {
            secondLargest = largest;
            largest = num;
        } else if(num > secondLargest && num != largest) {
            secondLargest = num;
        }
    }
    
    return secondLargest == INT_MIN ? -1 : secondLargest;
}
// Time: O(n), Space: O(1)
```

**Problem 3: Check if Sorted**
```cpp
bool isSorted(vector<int>& arr) {
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i] < arr[i-1]) return false;
    }
    return true;
}
// Time: O(n), Space: O(1)
```

**Problem 4: Remove Duplicates (Sorted)**
```cpp
int removeDuplicates(vector<int>& nums) {
    int i = 0;
    for(int j = 1; j < nums.size(); j++) {
        if(nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}
// Time: O(n), Space: O(1)
```

**Problem 5: Rotate Array by K**
```cpp
void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k = k % n;
    
    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
}
// Time: O(n), Space: O(1)
```

**Problem 6: Move Zeroes**
```cpp
void moveZeroes(vector<int>& nums) {
    int i = 0;
    for(int j = 0; j < nums.size(); j++) {
        if(nums[j] != 0) {
            swap(nums[i], nums[j]);
            i++;
        }
    }
}
// Time: O(n), Space: O(1)
```

**Problem 7: Missing Number**
```cpp
// Method 1: Sum Formula
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expectedSum = n * (n + 1) / 2;
    int actualSum = accumulate(nums.begin(), nums.end(), 0);
    return expectedSum - actualSum;
}

// Method 2: XOR (Better - avoids overflow)
int missingNumberXOR(vector<int>& nums) {
    int xor1 = 0, xor2 = 0;
    for(int i = 0; i <= nums.size(); i++) xor1 ^= i;
    for(int num : nums) xor2 ^= num;
    return xor1 ^ xor2;
}
// Time: O(n), Space: O(1)
```

**Problem 8: Maximum Consecutive Ones**
```cpp
int findMaxConsecutiveOnes(vector<int>& nums) {
    int maxCount = 0, currentCount = 0;
    for(int num : nums) {
        if(num == 1) currentCount++;
        else currentCount = 0;
        maxCount = max(maxCount, currentCount);
    }
    return maxCount;
}
// Time: O(n), Space: O(1)
```

**Problem 9: Single Number**
```cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for(int num : nums) result ^= num;
    return result;
}
// Time: O(n), Space: O(1)
// XOR property: a^a=0, a^0=a
```

**Problem 10: Two Sum**
```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if(numMap.count(complement)) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}
// Time: O(n), Space: O(n)
```

### 4.2 Medium Problems (16-35)

**Problem 16: Sort 0s, 1s, 2s (Dutch National Flag)**
```cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if(nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
}
// Time: O(n), Space: O(1)
```

**Problem 17: Majority Element (> n/2 times)**
```cpp
// Boyer-Moore Voting Algorithm
int majorityElement(vector<int>& nums) {
    int candidate = nums[0], count = 1;
    
    for(int i = 1; i < nums.size(); i++) {
        if(count == 0) {
            candidate = nums[i];
            count = 1;
        } else if(nums[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    return candidate;
}
// Time: O(n), Space: O(1)
```

**Problem 18: Maximum Subarray Sum (Kadane's)**
```cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
// Time: O(n), Space: O(1)
```

**Problem 19: Stock Buy and Sell**
```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = prices[0], maxProfit = 0;
    
    for(int i = 1; i < prices.size(); i++) {
        maxProfit = max(maxProfit, prices[i] - minPrice);
        minPrice = min(minPrice, prices[i]);
    }
    
    return maxProfit;
}
// Time: O(n), Space: O(1)
```

**Problem 20: Next Permutation**
```cpp
void nextPermutation(vector<int>& nums) {
    int n = nums.size();
    int breakPoint = -1;
    
    // Step 1: Find breakpoint (first decreasing from right)
    for(int i = n - 2; i >= 0; i--) {
        if(nums[i] < nums[i + 1]) {
            breakPoint = i;
            break;
        }
    }
    
    if(breakPoint == -1) {
        reverse(nums.begin(), nums.end());
        return;
    }
    
    // Step 2: Find smallest element > nums[breakPoint] from right
    for(int i = n - 1; i > breakPoint; i--) {
        if(nums[i] > nums[breakPoint]) {
            swap(nums[i], nums[breakPoint]);
            break;
        }
    }
    
    // Step 3: Reverse right half
    reverse(nums.begin() + breakPoint + 1, nums.end());
}
// Time: O(n), Space: O(1)
```

**Problem 21: Longest Consecutive Sequence**
```cpp
int longestConsecutive(vector<int>& nums) {
    if(nums.empty()) return 0;
    
    unordered_set<int> numSet(nums.begin(), nums.end());
    int longestStreak = 0;
    
    for(int num : numSet) {
        // Only start counting if num is the beginning of a sequence
        if(numSet.find(num - 1) == numSet.end()) {
            int currentNum = num;
            int currentStreak = 1;
            
            while(numSet.find(currentNum + 1) != numSet.end()) {
                currentNum++;
                currentStreak++;
            }
            
            longestStreak = max(longestStreak, currentStreak);
        }
    }
    
    return longestStreak;
}
// Time: O(n), Space: O(n)
```

**Problem 22: Set Matrix Zeroes**
```cpp
void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;
    
    // Check if first row/col needs to be zero
    for(int j = 0; j < n; j++) firstRowZero |= (matrix[0][j] == 0);
    for(int i = 0; i < m; i++) firstColZero |= (matrix[i][0] == 0);
    
    // Use first row/col as markers
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            if(matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set zeroes based on markers
    for(int i = 1; i < m; i++) {
        for(int j = 1; j < n; j++) {
            if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Handle first row/col
    if(firstRowZero) fill(matrix[0].begin(), matrix[0].end(), 0);
    if(firstColZero) {
        for(int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}
// Time: O(m×n), Space: O(1)
```

**Problem 23: Rotate Matrix 90°**
```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Step 1: Transpose
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Step 2: Reverse each row
    for(int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}
// Time: O(n²), Space: O(1)
```

**Problem 24: Spiral Matrix**
```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while(top <= bottom && left <= right) {
        // Traverse right
        for(int j = left; j <= right; j++) result.push_back(matrix[top][j]);
        top++;
        
        // Traverse down
        for(int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        
        // Traverse left
        if(top <= bottom) {
            for(int j = right; j >= left; j--) result.push_back(matrix[bottom][j]);
            bottom--;
        }
        
        // Traverse up
        if(left <= right) {
            for(int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    
    return result;
}
// Time: O(m×n), Space: O(1) excluding result
```

### 4.3 Hard Problems (36-50)

**Problem 36: 3Sum**
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
// Time: O(n²), Space: O(1) excluding result
```

**Problem 37: 4Sum**
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
// Time: O(n³), Space: O(1)
```

**Problem 38: Trapping Rain Water**
```cpp
int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    
    while(left < right) {
        if(height[left] < height[right]) {
            if(height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if(height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    
    return water;
}
// Time: O(n), Space: O(1)
```

**Problem 39: Merge Intervals**
```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if(intervals.empty()) return {};
    
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    
    merged.push_back(intervals[0]);
    
    for(int i = 1; i < intervals.size(); i++) {
        if(intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    
    return merged;
}
// Time: O(n log n), Space: O(n)
```

**Problem 40: Count Inversions**
```cpp
long long mergeAndCount(vector<int>& arr, int left, int mid, int right) {
    long long count = 0;
    vector<int> temp;
    int i = left, j = mid + 1;
    
    while(i <= mid && j <= right) {
        if(arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            count += (mid - i + 1);  // All elements from i to mid are greater
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
// Time: O(n log n), Space: O(n)
```

---

## 5. INTERVIEW PREPARATION

### 5.1 Company-Wise Important Problems

**Amazon**:
1. Trapping Rain Water
2. Merge Intervals
3. Next Permutation
4. Set Matrix Zeroes
5. Maximum Subarray

**Google**:
1. Median of Two Sorted Arrays
2. First Missing Positive
3. Longest Consecutive Sequence
4. Trapping Rain Water
5. 3Sum

**Microsoft**:
1. Rotate Matrix
2. Spiral Matrix
3. Majority Element
4. Missing Number
5. Two Sum

**Meta (Facebook)**:
1. Product of Array Except Self
2. Move Zeroes
3. Remove Duplicates
4. Best Time to Buy/Sell Stock
5. Container With Most Water

### 5.2 Must-Know Templates

Keep these in your interview toolkit:
- ✅ Two Pointer (opposite & same direction)
- ✅ Sliding Window (fixed & variable)
- ✅ Prefix Sum with Hash Map
- ✅ Kadane's Algorithm
- ✅ Binary Search
- ✅ Sorting + Two Pointer
- ✅ Hash Map for frequency/lookup

### 5.3 Interview Tips

1. **Think out loud** - Explain your approach before coding
2. **Start with brute force** - Then optimize
3. **Write clean code** - Use meaningful variable names
4. **Test with examples** - Dry run your solution
5. **Handle edge cases** - Empty array, single element, etc.
6. **State complexity** - Always mention time & space complexity
7. **Ask clarifying questions** - Duplicates? Sorted? Negative numbers?

---

## 6. QUICK REFERENCE TEMPLATES

### 6.1 All Templates in One Place

```cpp
// 1. Two Pointer (Opposite)
int left = 0, right = n - 1;
while(left < right) {
    // process
    if(condition) left++;
    else right--;
}

// 2. Fast/Slow Pointers
int slow = 0, fast = 0;
while(fast < n) {
    if(condition) slow++;
    fast++;
}

// 3. Sliding Window (Fixed)
for(int i = 0; i < k; i++) currentSum += arr[i];
for(int i = k; i < n; i++) {
    currentSum += arr[i] - arr[i-k];
    maxSum = max(maxSum, currentSum);
}

// 4. Prefix Sum
prefix[0] = arr[0];
for(int i = 1; i < n; i++) prefix[i] = prefix[i-1] + arr[i];
// Sum from l to r: prefix[r] - prefix[l-1]

// 5. Kadane's Algorithm
int maxSum = arr[0], currentSum = arr[0];
for(int i = 1; i < n; i++) {
    currentSum = max(arr[i], currentSum + arr[i]);
    maxSum = max(maxSum, currentSum);
}

// 6. Binary Search
int left = 0, right = n - 1;
while(left <= right) {
    int mid = left + (right - left) / 2;
    if(arr[mid] == target) return mid;
    else if(arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}

// 7. Dutch National Flag
int low = 0, mid = 0, high = n - 1;
while(mid <= high) {
    if(arr[mid] == 0) swap(arr[low++], arr[mid++]);
    else if(arr[mid] == 1) mid++;
    else swap(arr[mid], arr[high--]);
}
```

---

## 📊 PROGRESS TRACKER

### Week 1: Fundamentals ✓
- [ ] Array Basics & Memory Model
- [ ] Easy Problems (1-15)
- [ ] Two Pointer Pattern
- [ ] Sliding Window Pattern

### Week 2: Intermediate ✓
- [ ] Prefix Sum Pattern
- [ ] Kadane's Algorithm
- [ ] Medium Problems (16-35)
- [ ] Binary Search Pattern

### Week 3: Advanced ✓
- [ ] Hard Problems (36-50)
- [ ] BS on Answers
- [ ] BS on 2D Arrays
- [ ] Mock Interviews

---

## 🎯 FINAL CHECKLIST

Before you're interview-ready:

- [ ] Can solve all Easy problems in <10 min
- [ ] Can solve all Medium problems in <25 min
- [ ] Can solve Hard problems in <45 min
- [ ] Know all 7 patterns by heart
- [ ] Can identify pattern from problem statement
- [ ] Handle all edge cases automatically
- [ ] Write clean, bug-free code
- [ ] Explain time/space complexity
- [ ] Complete 85+ Striver problems

---

**🎓 You're now ready to master Arrays and ace technical interviews!**

[← Back to README](../README.md) | [Easy Problems](../00_Fundamentals/Array_Easy_Problems.md) | [Binary Search](../05_Binary_Search/Notes.md)

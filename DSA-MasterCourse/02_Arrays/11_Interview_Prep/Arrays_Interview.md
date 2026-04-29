# Arrays — Interview Questions by Company

> **Company-specific array questions with solutions**

---

## 🏢 Google (10 Questions)

### Q1. Trapping Rain Water
**Frequency**: 📅 Very High  
**Difficulty**: 🔴 Hard

**Problem**: Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.

**Solution**:
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while(left < right) {
            if(height[left] < height[right]) {
                if(height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if(height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Two Pointer

---

### Q2. First Missing Positive
**Frequency**: 📅 High  
**Difficulty**: 🔴 Hard

**Problem**: Find the smallest missing positive integer in an unsorted array.

**Approach**: Place each number at its correct position (cyclic sort)
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        
        // Place each number at correct position
        for(int i = 0; i < n; i++) {
            while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
                swap(nums[i], nums[nums[i]-1]);
            }
        }
        
        // Find first position with wrong number
        for(int i = 0; i < n; i++) {
            if(nums[i] != i + 1) {
                return i + 1;
            }
        }
        
        return n + 1;
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Cyclic Sort

---

## 🏢 Amazon (10 Questions)

### Q1. Best Time to Buy and Sell Stock
**Frequency**: 📅 Very High  
**Difficulty**: 🟢 Easy

**Problem**: Find maximum profit from one buy-sell transaction.

**Solution**:
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        
        for(int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        
        return maxProfit;
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Single Pass

---

### Q2. Container With Most Water
**Frequency**: 📅 Very High  
**Difficulty**: 🟡 Medium

**Problem**: Find two lines that form a container with maximum water.

**Solution**:
```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxArea = 0;
        
        while(left < right) {
            int area = min(height[left], height[right]) * (right - left);
            maxArea = max(maxArea, area);
            
            if(height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Two Pointer

---

## 🏢 Microsoft (10 Questions)

### Q1. Product of Array Except Self
**Frequency**: 📅 Very High  
**Difficulty**: 🟡 Medium

**Problem**: Return array where each element is product of all other elements.

**Solution**:
```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n);
        
        // Left products
        result[0] = 1;
        for(int i = 1; i < n; i++) {
            result[i] = result[i-1] * nums[i-1];
        }
        
        // Right products
        int right = 1;
        for(int i = n - 1; i >= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }
        
        return result;
    }
};
```
**Complexity**: Time O(n), Space O(1) (excluding output)  
**Pattern**: Prefix/Suffix Products

---

## 🏢 Meta/Facebook (8 Questions)

### Q1. Maximum Subarray
**Frequency**: 📅 Very High  
**Difficulty**: 🟡 Medium

**Problem**: Find contiguous subarray with largest sum.

**Solution** (Kadane's Algorithm):
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        
        for(int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Kadane's Algorithm

---

## 🏢 Adobe (8 Questions)

### Q1. Find Duplicate Number
**Frequency**: 📅 High  
**Difficulty**: 🟡 Medium

**Problem**: Find duplicate in array of n+1 integers where each is between 1 and n.

**Solution** (Floyd's Cycle Detection):
```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[0];
        
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while(slow != fast);
        
        slow = nums[0];
        while(slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        
        return slow;
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Cycle Detection

---

## 🏢 Flipkart (5 Questions)

### Q1. Merge Overlapping Intervals
**Frequency**: 📅 High  
**Difficulty**: 🟡 Medium

**Problem**: Merge all overlapping intervals.

**Solution**:
```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if(intervals.empty()) return {};
        
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> result;
        
        result.push_back(intervals[0]);
        
        for(int i = 1; i < intervals.size(); i++) {
            if(intervals[i][0] <= result.back()[1]) {
                result.back()[1] = max(result.back()[1], intervals[i][1]);
            } else {
                result.push_back(intervals[i]);
            }
        }
        
        return result;
    }
};
```
**Complexity**: Time O(n log n), Space O(n)  
**Pattern**: Sorting + Greedy

---

## 🏢 TCS/Infosys/Wipro (5 Questions)

### Q1. Rotate Array
**Frequency**: 📅 High  
**Difficulty**: 🟢 Easy

**Problem**: Rotate array to the right by k steps.

**Solution**:
```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k = k % n;
        
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```
**Complexity**: Time O(n), Space O(1)  
**Pattern**: Reversal

---

## 📊 Company-Wise Pattern Distribution

| Company | Most Asked Patterns | Difficulty Mix |
|---------|---------------------|----------------|
| **Google** | Two Pointer, DP, Binary Search | 60% Hard, 40% Medium |
| **Amazon** | Two Pointer, Sliding Window, Hash Map | 40% Medium, 40% Easy, 20% Hard |
| **Microsoft** | Array Manipulation, Prefix Sum | 50% Medium, 30% Hard, 20% Easy |
| **Meta** | Kadane's, Sliding Window | 50% Medium, 30% Hard |
| **Adobe** | Searching, Sorting, Two Pointer | 40% Easy, 60% Medium |
| **Flipkart** | Intervals, Greedy | 60% Medium, 40% Hard |
| **TCS/Wipro** | Basic Operations, Rotation | 70% Easy, 30% Medium |

---

## 💡 Interview Tips

### Before Coding:
1. ✅ Clarify constraints (array size, element range)
2. ✅ Ask about edge cases (empty, duplicates, negatives)
3. ✅ Confirm input/output format
4. ✅ Discuss brute force first

### While Coding:
1. ✅ Explain your thought process
2. ✅ Write clean, readable code
3. ✅ Use meaningful variable names
4. ✅ Add comments for complex logic

### After Coding:
1. ✅ Test with examples
2. ✅ Discuss time/space complexity
3. ✅ Mention edge cases handled
4. ✅ Suggest optimizations if any

---

## 🎯 Preparation Strategy

### Week 1-2: Easy Problems
- Focus on basics
- Build confidence
- Learn patterns

### Week 3-4: Medium Problems
- Company-specific questions
- Timed practice
- Pattern recognition

### Week 5-6: Hard Problems
- Advanced optimizations
- Multiple patterns
- Mock interviews

---

**Practice consistently and you'll crack any array interview!**

[← Back to README](../README.md)

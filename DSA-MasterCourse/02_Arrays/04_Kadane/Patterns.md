# Kadane's Algorithm — Patterns Reference

> **Complete catalog of Kadane's variations**

---

## 📋 Pattern Variations

### 1. Maximum Subarray Sum (Standard Kadane's)

**Use When**: Find contiguous subarray with maximum sum  
**Time Complexity**: O(n)

#### Template
```cpp
int maxSubArray(vector<int>& nums) {
    int currentSum = nums[0];
    int maxSum = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

#### Example Problems
- Maximum Subarray (LeetCode 53)

---

### 2. Maximum Product Subarray

**Use When**: Find contiguous subarray with maximum product  
**Time Complexity**: O(n)

#### Template
```cpp
int maxProduct(vector<int>& nums) {
    int maxProd = nums[0];
    int minProd = nums[0];
    int result = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        if(nums[i] < 0) swap(maxProd, minProd);
        
        maxProd = max(nums[i], maxProd * nums[i]);
        minProd = min(nums[i], minProd * nums[i]);
        
        result = max(result, maxProd);
    }
    
    return result;
}
```

#### Example Problems
- Maximum Product Subarray (LeetCode 152)

---

### 3. Maximum Sum Circular Subarray

**Use When**: Array wraps around  
**Time Complexity**: O(n)

#### Template
```cpp
int maxSubarraySumCircular(vector<int>& nums) {
    int maxKadane = kadane(nums);
    
    int totalSum = 0;
    for(int& x : nums) {
        totalSum += x;
        x = -x;
    }
    int maxCircular = totalSum + kadane(nums);
    
    return maxCircular == 0 ? maxKadane : max(maxKadane, maxCircular);
}
```

#### Example Problems
- Maximum Sum Circular Subarray (LeetCode 918)

---

## 💡 Pro Tips

1. **Track both max and min** - For product problems
2. **Handle all negatives** - Kadane's works correctly
3. **Circular trick** - total - min_subarray
4. **Return subarray indices** - Track start/end positions

---

**Master Kadane's for all subarray maximum problems!**

[← Back to Notes](../Notes.md)

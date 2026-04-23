# Vector — Easy Problems

> **5 beginner-friendly vector problems**  
> **Prerequisites**: `06_Vector/Notes.md`  
> **Time Required**: 1-2 hours

---

## Problem 1: Running Sum of 1d Array

**Source**: https://leetcode.com/problems/running-sum-of-1d-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Adobe  
**Frequency**: 📅 Medium

### Problem Statement
Given an array, return the running sum where runningSum[i] = sum(nums[0]...nums[i]).

### Examples
```
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: [1, 1+2, 1+2+3, 1+2+3+4]
```

### Pattern Identification
**Keywords**: "running sum", "cumulative", "prefix"  
**Pattern**: Prefix Sum (1D)

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int> result(nums.size());
        result[0] = nums[0];
        
        for(int i = 1; i < nums.size(); i++) {
            result[i] = result[i-1] + nums[i];
        }
        
        return result;
    }
};
```

### Edge Cases
1. ✅ Single element → return same array
2. ✅ Negative numbers
3. ✅ All zeros
4. ✅ Large values (check for overflow)

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(1) - Excluding output array

---

## Problem 2: Shuffle the Array

**Source**: https://leetcode.com/problems/shuffle-the-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Medium

### Problem Statement
Given array in form [x1,x2,...,xn,y1,y2,...,yn], return [x1,y1,x2,y2,...,xn,yn].

### Examples
```
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
```

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> result(2 * n);
        
        for(int i = 0; i < n; i++) {
            result[2 * i] = nums[i];
            result[2 * i + 1] = nums[i + n];
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n) - Single pass
- **Space**: O(n) - For result vector

---

## Problem 3: Kids With the Greatest Number of Candies

**Source**: https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Low

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int maxCandies = *max_element(candies.begin(), candies.end());
        vector<bool> result;
        
        for(int candy : candies) {
            result.push_back(candy + extraCandies >= maxCandies);
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n) - Find max + one pass
- **Space**: O(1) - Excluding output

---

## Problem 4: Build Array from Permutation

**Source**: https://leetcode.com/problems/build-array-from-permutation/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Low

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> buildArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n);
        
        for(int i = 0; i < n; i++) {
            result[i] = nums[nums[i]];
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(n) - For result vector

---

## Problem 5: Concatenation of Array

**Source**: https://leetcode.com/problems/concatenation-of-array/  
**Difficulty**: 🟢 Easy  
**Company Tags**: 🏢 Amazon  
**Frequency**: 📅 Low

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(2 * n);
        
        for(int i = 0; i < n; i++) {
            result[i] = nums[i];
            result[i + n] = nums[i];
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n)
- **Space**: O(n) - For result vector

---

## 🎯 Key Takeaways

1. **Vector creation** - Initialize with size or use push_back
2. **Indexing** - Access elements safely
3. **STL algorithms** - max_element, min_element
4. **Return vectors** - Create and return new vectors
5. **Size management** - Use .size() correctly

---

**Start with these easy problems to build confidence with vectors!**

[← Back to Notes](../Notes.md) | [Medium Problems →](Medium.md)

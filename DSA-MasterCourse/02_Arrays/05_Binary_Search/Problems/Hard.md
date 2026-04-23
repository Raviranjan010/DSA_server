# Binary Search — Hard Problems

> **3 advanced optimization problems using binary search on answer**  
> **Prerequisites**: Medium Problems, optimization thinking  
> **Time Required**: 3-4 hours

---

## Problem 1: Median of Two Sorted Arrays

**Source**: https://leetcode.com/problems/median-of-two-sorted-arrays/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon, Microsoft, Meta  
**Frequency**: 📅 Very High

### Problem Statement
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays with overall run time complexity O(log(m+n)).

### Examples
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: Merged array = [1,2,3], median is 2

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: Merged array = [1,2,3,4], median is (2+3)/2 = 2.5
```

### Pattern Identification
**Keywords**: "median", "two sorted arrays", "O(log(m+n))"  
**Pattern**: Binary Search on Answer (Partition)

### Approach

#### Brute Force (O(m+n))
```cpp
// Merge both arrays and find median
vector<int> merged;
// Merge logic... O(m+n)
return merged[merged.size()/2];
// Problem: O(m+n) time, O(m+n) space
```

#### Optimized Binary Search (O(log(min(m,n))))
1. Binary search on smaller array
2. Partition both arrays such that left half has same elements as right half
3. Ensure all elements on left <= all elements on right
4. Calculate median from partition boundaries

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Ensure nums1 is smaller array
        if(nums1.size() > nums2.size()) {
            swap(nums1, nums2);
        }
        
        int m = nums1.size();
        int n = nums2.size();
        int left = 0, right = m;
        
        while(left <= right) {
            int partitionX = left + (right - left) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            // Edge cases for boundaries
            int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minX = (partitionX == m) ? INT_MAX : nums1[partitionX];
            
            int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minY = (partitionY == n) ? INT_MAX : nums2[partitionY];
            
            if(maxX <= minY && maxY <= minX) {
                // Found correct partition
                if((m + n) % 2 == 0) {
                    return (max(maxX, maxY) + min(minX, minY)) / 2.0;
                } else {
                    return max(maxX, maxY);
                }
            } else if(maxX > minY) {
                // Move partition left in nums1
                right = partitionX - 1;
            } else {
                // Move partition right in nums1
                left = partitionX + 1;
            }
        }
        
        return 0.0;  // Should never reach here
    }
};
```

### Dry Run
```
nums1 = [1,3], nums2 = [2]
m=2, n=1, left=0, right=2

Iteration 1:
partitionX = 1, partitionY = (3+1)/2 - 1 = 1
maxX = nums1[0] = 1, minX = nums1[1] = 3
maxY = nums2[0] = 2, minY = INT_MAX

Check: maxX(1) <= minY(INT_MAX) ✓ AND maxY(2) <= minX(3) ✓
Total elements = 3 (odd)
Median = max(1, 2) = 2 ✓
```

### Edge Cases
1. ✅ One array empty → median of other array
2. ✅ Arrays of different sizes
3. ✅ All elements in one array smaller
4. ✅ Even/odd total length
5. ✅ Duplicate elements

### Complexity
- **Time**: O(log(min(m, n))) - Binary search on smaller array
- **Space**: O(1)

---

## Problem 2: Aggressive Cows

**Source**: https://www.spoj.com/problems/AGGRCOW/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 SPOJ, CodeChef, InterviewBit  
**Frequency**: 📅 High

### Problem Statement
Given n stalls at various positions and c cows, place cows such that minimum distance between any two cows is maximized.

### Examples
```
Input: stalls = [1,2,4,8,9], cows = 3
Output: 3
Explanation: Place cows at positions 1, 4, 8 (minimum distance = 3)
```

### Pattern Identification
**Keywords**: "maximize minimum distance", "place cows"  
**Pattern**: Binary Search on Answer

### Approach

#### Key Insight
If we can place cows with minimum distance d, we can also place them with distance < d. This monotonicity allows binary search on the answer.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

// Check if we can place cows with at least minDist apart
bool canPlaceCows(vector<int>& stalls, int c, int minDist) {
    int count = 1;  // Place first cow in first stall
    int lastPos = stalls[0];
    
    for(int i = 1; i < stalls.size(); i++) {
        if(stalls[i] - lastPos >= minDist) {
            count++;
            lastPos = stalls[i];
            if(count == c) return true;
        }
    }
    
    return false;
}

int aggressiveCows(vector<int>& stalls, int c) {
    sort(stalls.begin(), stalls.end());
    
    int left = 0;  // Minimum possible distance
    int right = stalls.back() - stalls[0];  // Maximum possible distance
    int result = 0;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(canPlaceCows(stalls, c, mid)) {
            result = mid;  // This distance works, try larger
            left = mid + 1;
        } else {
            right = mid - 1;  // Need smaller distance
        }
    }
    
    return result;
}
```

### Dry Run
```
stalls = [1,2,4,8,9], cows = 3
After sort: [1,2,4,8,9]
left=0, right=8

Step 1: mid=4
        canPlace(4)? Place at 1, next >=5 is 8, next >=12 doesn't exist
        Only 2 cows placed → NO
        right=3

Step 2: mid=1
        canPlace(1)? Place at 1,2,4 → YES (3 cows)
        result=1, left=2

Step 3: mid=2
        canPlace(2)? Place at 1,4,8 → YES (3 cows)
        result=2, left=3

Step 4: mid=3
        canPlace(3)? Place at 1,4,8 → YES (3 cows)
        result=3, left=4

Step 5: mid=4
        canPlace(4)? NO (from Step 1)
        right=3

left=4 > right=3 → Stop
Result = 3 ✓
```

### Edge Cases
1. ✅ c = 2 → maximum distance between any two stalls
2. ✅ c = n → minimum distance between consecutive stalls
3. ✅ All stalls at same position → 0
4. ✅ Large coordinate values (use int/long long appropriately)
5. ✅ Stalls not sorted (must sort first!)

### Complexity
- **Time**: O(n log n + n log(max_dist))
  - Sorting: O(n log n)
  - Binary search: O(log(max_dist)) iterations
  - Each check: O(n)
- **Space**: O(1) - Excluding sorting space

### Similar Problems
1. Koko Eating Bananas (LeetCode 875)
2. Capacity To Ship Packages (LeetCode 1011)
3. Split Array Largest Sum (LeetCode 410)

---

## Problem 3: Koko Eating Bananas

**Source**: https://leetcode.com/problems/koko-eating-bananas/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Facebook  
**Frequency**: 📅 High

### Problem Statement
Koko loves bananas. Given n piles and h hours, find minimum eating speed k such that she can eat all bananas within h hours.

### Examples
```
Input: piles = [3,6,7,11], h = 8
Output: 4
Explanation: 
- Speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours ✓
- Speed 3: 1+2+3+4 = 10 hours > 8 ✗
```

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int left = 1;  // Minimum speed
        int right = *max_element(piles.begin(), piles.end());  // Maximum speed
        int result = right;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            // Calculate hours needed at speed mid
            long long hours = 0;
            for(int pile : piles) {
                hours += ceil((double)pile / mid);
            }
            
            if(hours <= h) {
                result = mid;  // This speed works, try slower
                right = mid - 1;
            } else {
                left = mid + 1;  // Need faster speed
            }
        }
        
        return result;
    }
};
```

### Edge Cases
1. ✅ h = piles.size() → must eat each pile in 1 hour → max element
2. ✅ h very large → minimum speed 1
3. ✅ Single pile
4. ✅ All piles same size
5. ✅ Large values (use long long for hours)

### Complexity
- **Time**: O(n log(max_pile))
  - Binary search: O(log(max_pile)) iterations
  - Each check: O(n)
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **Binary search on answer** - When problem asks to minimize/maximize something
2. **Feasibility function** - Check if a given answer is possible
3. **Monotonicity** - If x works, all values > x (or < x) also work
4. **Search space** - Identify minimum and maximum possible answers
5. **Optimization** - Minimize the answer that satisfies condition

---

## 💡 Binary Search on Answer Template

```cpp
int binarySearchOnAnswer(int minPossible, int maxPossible) {
    int left = minPossible;
    int right = maxPossible;
    int result = -1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(isFeasible(mid)) {
            result = mid;
            // Try to find better answer
            // If minimizing: right = mid - 1
            // If maximizing: left = mid + 1
        } else {
            // Need to adjust search
            // If minimizing: left = mid + 1
            // If maximizing: right = mid - 1
        }
    }
    
    return result;
}
```

---

**Master these hard problems and you're ready for any binary search interview question!**

[← Back to Medium](Medium.md) | [← Back to Notes](../Notes.md)

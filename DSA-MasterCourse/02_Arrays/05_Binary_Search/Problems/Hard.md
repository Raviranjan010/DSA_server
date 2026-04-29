# Binary Search — Hard Problems & BS on Answers (Complete Striver Sheet)

> **Advanced optimization problems using binary search on answer**  
> **Prerequisites**: Medium Problems, optimization thinking  
> **Time Required**: 6-8 hours  
> **Patterns**: BS on Answers (Advanced), Classic Hard Problems

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

## Problem 4: Minimum Days to Make M Bouquets

**Source**: https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 Medium

### Problem Statement
Given an array bloomDay where bloomDay[i] represents the day the ith flower blooms. You want to make m bouquets, and each bouquet requires k adjacent flowers. Return the minimum number of days to wait.

### Examples
```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Need 3 bouquets with 1 flower each. Day 3: [B, B, B, B, B] → can make 3 bouquets

Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: Need 6 flowers total but only 5 exist
```

### Key Insight
Binary search on the answer (days). Range: [min(bloomDay), max(bloomDay)]. Check if we can make m bouquets by day `mid`.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canMakeBouquets(vector<int>& bloomDay, int m, int k, int day) {
        int bouquets = 0;
        int flowers = 0;
        
        for(int bloom : bloomDay) {
            if(bloom <= day) {
                flowers++;
                if(flowers == k) {
                    bouquets++;
                    flowers = 0;
                    if(bouquets == m) return true;
                }
            } else {
                flowers = 0;  // Reset consecutive count
            }
        }
        
        return bouquets >= m;
    }
    
    int minDays(vector<int>& bloomDay, int m, int k) {
        long long totalFlowers = (long long)m * k;
        if(totalFlowers > bloomDay.size()) return -1;
        
        int left = *min_element(bloomDay.begin(), bloomDay.end());
        int right = *max_element(bloomDay.begin(), bloomDay.end());
        int result = -1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(canMakeBouquets(bloomDay, m, k, mid)) {
                result = mid;
                right = mid - 1;  // Try earlier day
            } else {
                left = mid + 1;  // Need more days
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n * log(max_bloom_day))
- **Space**: O(1)

---

## Problem 5: Find the Smallest Divisor

**Source**: https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/  
**Difficulty**: 🔴 Medium  
**Company Tags**: 🏢 Amazon, Salesforce  
**Frequency**: 📅 Medium

### Problem Statement
Given an array of integers nums and an integer threshold, find the smallest positive integer divisor such that the sum of the ceiling division results is less than or equal to threshold.

### Examples
```
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: 
Divisor 1: 1+2+5+9 = 17
Divisor 2: 1+1+3+5 = 10
Divisor 3: 1+1+2+3 = 7
Divisor 4: 1+1+2+3 = 7
Divisor 5: 1+1+1+2 = 5 ≤ 6 ✓

Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
```

### Complete Solution
```cpp
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canDivide(vector<int>& nums, int divisor, int threshold) {
        int sum = 0;
        for(int num : nums) {
            sum += ceil((double)num / divisor);
        }
        return sum <= threshold;
    }
    
    int smallestDivisor(vector<int>& nums, int threshold) {
        int left = 1;
        int right = *max_element(nums.begin(), nums.end());
        int result = right;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(canDivide(nums, mid, threshold)) {
                result = mid;
                right = mid - 1;  // Try smaller divisor
            } else {
                left = mid + 1;  // Need larger divisor
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n * log(max_num))
- **Space**: O(1)

---

## Problem 6: Capacity to Ship Packages Within D Days

**Source**: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/  
**Difficulty**: 🔴 Medium  
**Company Tags**: 🏢 Amazon, Google  
**Frequency**: 📅 Very High

### Problem Statement
A conveyor belt has packages that must be shipped from one port to another within days days. The ith package has weight weights[i]. Return the least weight capacity of the ship that will result in all packages being shipped within days days.

### Examples
```
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation:
Day 1: 1,2,3,4,5 (total 15)
Day 2: 6,7 (total 13)
Day 3: 8 (total 8)
Day 4: 9 (total 9)
Day 5: 10 (total 10)

Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
```

### Key Insight
Binary search on capacity. Range: [max(weights), sum(weights)]. Check if a capacity is feasible.

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

class Solution {
public:
    bool canShip(vector<int>& weights, int days, int capacity) {
        int currentLoad = 0;
        int daysNeeded = 1;
        
        for(int weight : weights) {
            currentLoad += weight;
            if(currentLoad > capacity) {
                daysNeeded++;
                currentLoad = weight;
                if(daysNeeded > days) return false;
            }
        }
        
        return true;
    }
    
    int shipWithinDays(vector<int>& weights, int days) {
        int left = *max_element(weights.begin(), weights.end());
        int right = accumulate(weights.begin(), weights.end(), 0);
        int result = right;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(canShip(weights, days, mid)) {
                result = mid;
                right = mid - 1;  // Try smaller capacity
            } else {
                left = mid + 1;  // Need larger capacity
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n * log(sum(weights)))
- **Space**: O(1)

---

## Problem 7: Kth Missing Positive Number

**Source**: https://leetcode.com/problems/kth-missing-positive-number/  
**Difficulty**: 🔴 Medium  
**Company Tags**: 🏢 Facebook, Google  
**Frequency**: 📅 High

### Problem Statement
Given a sorted array of distinct positive integers arr, and an integer k, return the kth positive integer that is missing from this array.

### Examples
```
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: Missing numbers are [1,5,6,8,9,10,12,...]. 5th missing is 9.

Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: Missing numbers are [5,6,7,...]. 2nd missing is 6.
```

### Key Insight
At index i, the number of missing positive integers before arr[i] is arr[i] - (i + 1). Use binary search to find where the kth missing number would be.

### Complete Solution
```cpp
#include <vector>
using namespace std;

class Solution {
public:
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
        
        // left is the position where kth missing would be
        return left + k;
    }
};
```

### Dry Run
```
arr = [2,3,4,7,11], k = 5

Index: 0 1 2 3  4
Arr:   2 3 4 7 11
Missing at each index: arr[i] - (i+1)
Index 0: 2 - 1 = 1 missing (number 1)
Index 1: 3 - 2 = 1 missing
Index 2: 4 - 3 = 1 missing
Index 3: 7 - 4 = 3 missing (1,5,6)
Index 4: 11 - 5 = 6 missing (1,5,6,8,9,10)

Binary search for position where missing >= 5:
left=0, right=4
mid=2, missing=1 < 5 → left=3
mid=3, missing=3 < 5 → left=4
mid=4, missing=6 >= 5 → right=3

Return left + k = 4 + 5 = 9 ✓
```

### Complexity
- **Time**: O(log n)
- **Space**: O(1)

---

## Problem 8: Aggressive Cows (Already in file)

*(See Problem 2 above - already included)*

---

## Problem 9: Book Allocation Problem

**Source**: https://www.geeksforgeeks.org/allocate-minimum-number-pages/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Amazon, Microsoft, Flipkart  
**Frequency**: 📅 Very High

### Problem Statement
Given an array of n books where each book has a certain number of pages, and m students. Allocate books such that:
- Each student gets at least one book
- Each book is allocated to only one student
- Books are allocated in contiguous order
- Minimize the maximum number of pages assigned to any student

### Examples
```
Input: books = [12, 34, 67, 90], students = 2
Output: 113
Explanation: 
Allocation: [12, 34, 67] and [90] → Max = 113
Or: [12, 34] and [67, 90] → Max = 157
Minimum of maximum = 113
```

### Key Insight
Binary search on the answer (maximum pages). Range: [max(books), sum(books)]. Check if allocation is possible with given max pages.

### Complete Solution
```cpp
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool isPossible(vector<int>& books, int students, int maxPages) {
    int studentCount = 1;
    int currentPages = 0;
    
    for(int pages : books) {
        if(currentPages + pages <= maxPages) {
            currentPages += pages;
        } else {
            studentCount++;
            currentPages = pages;
            if(studentCount > students) return false;
        }
    }
    
    return true;
}

int findPages(vector<int>& books, int students) {
    if(books.size() < students) return -1;
    
    int left = *max_element(books.begin(), books.end());
    int right = accumulate(books.begin(), books.end(), 0);
    int result = right;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(isPossible(books, students, mid)) {
            result = mid;
            right = mid - 1;  // Try to minimize
        } else {
            left = mid + 1;  // Need more pages
        }
    }
    
    return result;
}
```

### Complexity
- **Time**: O(n * log(sum(books)))
- **Space**: O(1)

---

## Problem 10: Split Array - Largest Sum

**Source**: https://leetcode.com/problems/split-array-largest-sum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an array nums and an integer k, split the array into k non-empty subarrays such that the largest sum of any subarray is minimized.

### Examples
```
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: Split into [7,2,5] and [10,8] → Largest sum = 18

Input: nums = [1,2,3,4,5], k = 2
Output: 9
```

### Complete Solution
```cpp
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canSplit(vector<int>& nums, int k, int maxSum) {
        int splits = 1;
        int currentSum = 0;
        
        for(int num : nums) {
            currentSum += num;
            if(currentSum > maxSum) {
                splits++;
                currentSum = num;
                if(splits > k) return false;
            }
        }
        
        return true;
    }
    
    int splitArray(vector<int>& nums, int k) {
        int left = *max_element(nums.begin(), nums.end());
        int right = accumulate(nums.begin(), nums.end(), 0);
        int result = right;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(canSplit(nums, k, mid)) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        return result;
    }
};
```

### Complexity
- **Time**: O(n * log(sum(nums)))
- **Space**: O(1)

### Note
This is the same problem as Book Allocation, just different wording!

---

## Problem 11: Painter's Partition

**Source**: https://www.geeksforgeeks.org/painter-partition-problem/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Microsoft, Amazon  
**Frequency**: 📅 Medium

### Problem Statement
Given n boards with different lengths and k painters. Each painter takes 1 unit of time to paint 1 unit length. Find the minimum time to paint all boards (each painter paints contiguous sections).

### Complete Solution
```cpp
// Same as Book Allocation Problem!
// Just rename: books → boards, pages → length, students → painters

int minTimeToPaint(vector<int>& boards, int painters) {
    if(boards.size() < painters) return -1;
    
    int left = *max_element(boards.begin(), boards.end());
    int right = accumulate(boards.begin(), boards.end(), 0);
    int result = right;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(isPossible(boards, painters, mid)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}
```

---

## Problem 12: Minimize Max Distance to Gas Station

**Source**: https://leetcode.com/problems/minimize-max-distance-to-gas-station/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Low

### Problem Statement
Given positions of gas stations on a horizontal line, add K more gas stations to minimize the maximum distance between adjacent gas stations.

### Complete Solution
```cpp
#include <vector>
#include <queue>
#include <cmath>
using namespace std;

double minmaxGasDist(vector<int>& stations, int K) {
    int n = stations.size();
    double left = 0.0, right = 1e8;
    
    // Binary search on answer with precision
    for(int iter = 0; iter < 100; iter++) {
        double mid = left + (right - left) / 2;
        int count = 0;
        
        for(int i = 0; i < n - 1; i++) {
            count += (int)((stations[i+1] - stations[i]) / mid);
        }
        
        if(count <= K) {
            right = mid;
        } else {
            left = mid;
        }
    }
    
    return left;
}
```

### Complexity
- **Time**: O(n * 100) - Fixed iterations for precision
- **Space**: O(1)

---

## Problem 13: Median of 2 Sorted Arrays (Already in file)

*(See Problem 1 above - already included)*

---

## Problem 14: Kth Element of 2 Sorted Arrays

**Source**: https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Amazon, Microsoft  
**Frequency**: 📅 Medium

### Problem Statement
Given two sorted arrays arr1 and arr2, find the kth element in the merged sorted array.

### Examples
```
Input: arr1 = [2, 3, 6, 7, 9], arr2 = [1, 4, 8, 10], k = 5
Output: 6
Explanation: Merged = [1, 2, 3, 4, 6, 7, 8, 9, 10], 5th element is 6
```

### Complete Solution
```cpp
#include <vector>
#include <algorithm>
using namespace std;

int kthElement(vector<int>& arr1, vector<int>& arr2, int k) {
    // Ensure arr1 is smaller
    if(arr1.size() > arr2.size()) {
        return kthElement(arr2, arr1, k);
    }
    
    int n = arr1.size();
    int m = arr2.size();
    int left = max(0, k - m), right = min(k, n);
    
    while(left <= right) {
        int mid1 = left + (right - left) / 2;
        int mid2 = k - mid1;
        
        int l1 = (mid1 == 0) ? INT_MIN : arr1[mid1 - 1];
        int l2 = (mid2 == 0) ? INT_MIN : arr2[mid2 - 1];
        int r1 = (mid1 == n) ? INT_MAX : arr1[mid1];
        int r2 = (mid2 == m) ? INT_MAX : arr2[mid2];
        
        if(l1 <= r2 && l2 <= r1) {
            return max(l1, l2);
        } else if(l1 > r2) {
            right = mid1 - 1;
        } else {
            left = mid1 + 1;
        }
    }
    
    return 0;
}
```

### Complexity
- **Time**: O(log(min(n, m)))
- **Space**: O(1)

---

## 🎯 Key Takeaways

1. **Binary search on answer** - When problem asks to minimize/maximize something
2. **Feasibility function** - Check if a given answer is possible
3. **Monotonicity** - If x works, all values > x (or < x) also work
4. **Search space** - Identify minimum and maximum possible answers
5. **Optimization** - Minimize the answer that satisfies condition
6. **Book Allocation = Painter's Partition = Split Array** - Same pattern!
7. **Precision problems** - Use fixed iterations (100) for floating point
8. **Range identification** - Critical for BS on answer
   - Koko: [1, max(piles)]
   - Ship capacity: [max(weights), sum(weights)]
   - Book allocation: [max(books), sum(books)]

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

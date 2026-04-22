# 💻 02 — Arrays — SOLVED PROBLEMS (25 Complete Solutions)

> Full solutions with: Problem → Brute Force → Optimal Approach → Code → Dry Run → Complexity  
> Sorted by difficulty and company frequency

---

## 🟢 EASY PROBLEMS

---

### Problem 1: Two Sum
🏢 **Asked by**: Google, Amazon, Meta  
🔗 **LeetCode**: https://leetcode.com/problems/two-sum/ (LC #1)  
📅 **Frequency**: Very High (Asked in almost every company)

**Problem**: Given array of integers and target, return indices of two numbers that add up to target. Assume exactly one solution. Cannot use same element twice.

```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]  (nums[0] + nums[1] = 2 + 7 = 9)
```

**Brute Force — O(n²)**:
```cpp
vector<int> twoSum_brute(vector<int>& nums, int target) {
    for(int i = 0; i < nums.size(); i++) {
        for(int j = i + 1; j < nums.size(); j++) {
            if(nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}
```

**Optimal — Hash Map O(n)**:
```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;  // value → index
    
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if(seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}
```

**Dry Run**:
```
nums=[2,7,11,15], target=9

i=0: complement=7, seen={}, not found. seen={2:0}
i=1: complement=2, seen={2:0}, FOUND! return {0,1}
```

**Complexity**: Time O(n), Space O(n)  
**Pattern**: Hash Map for complement lookup

---

### Problem 2: Best Time to Buy and Sell Stock
🏢 **Asked by**: Amazon, Meta, Adobe  
🔗 **LeetCode**: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ (LC #121)

**Problem**: Given prices array, find maximum profit from one buy-sell transaction. Must buy before selling.

```
Input:  prices = [7, 1, 5, 3, 6, 4]
Output: 5  (buy at 1, sell at 6)
```

**Brute Force — O(n²)**:
```cpp
int maxProfit_brute(vector<int>& prices) {
    int maxP = 0;
    for(int i = 0; i < prices.size(); i++) {
        for(int j = i+1; j < prices.size(); j++) {
            maxP = max(maxP, prices[j] - prices[i]);
        }
    }
    return maxP;
}
```

**Optimal — O(n), O(1) space**:
```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = prices[0];
    int maxProfit = 0;
    
    for(int i = 1; i < prices.size(); i++) {
        minPrice = min(minPrice, prices[i]);  // Best buy price so far
        maxProfit = max(maxProfit, prices[i] - minPrice);  // Best profit today
    }
    
    return maxProfit;
}
```

**Dry Run**:
```
prices = [7, 1, 5, 3, 6, 4]
minPrice=7, maxProfit=0

i=1: price=1, minPrice=1, profit=0,  maxProfit=0
i=2: price=5, minPrice=1, profit=4,  maxProfit=4
i=3: price=3, minPrice=1, profit=2,  maxProfit=4
i=4: price=6, minPrice=1, profit=5,  maxProfit=5 ← BEST
i=5: price=4, minPrice=1, profit=3,  maxProfit=5

Answer: 5
```

**Pattern**: Kadane's variant — track minimum to left

---

### Problem 3: Maximum Subarray (Kadane's)
🏢 **Asked by**: Amazon, Microsoft, Google  
🔗 **LeetCode**: https://leetcode.com/problems/maximum-subarray/ (LC #53)

**Problem**: Find contiguous subarray with largest sum.

```
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6  (subarray [4, -1, 2, 1])
```

**Optimal — Kadane's O(n)**:
```cpp
int maxSubArray(vector<int>& nums) {
    int current = nums[0];
    int global = nums[0];
    
    for(int i = 1; i < nums.size(); i++) {
        // Extend previous subarray OR start fresh
        current = max(nums[i], current + nums[i]);
        global = max(global, current);
    }
    
    return global;
}
```

**Dry Run**:
```
[-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=1: current=max(1, -2+1)=1,     global=1
i=2: current=max(-3, 1-3)=-2,    global=1
i=3: current=max(4, -2+4)=4,     global=4
i=4: current=max(-1, 4-1)=3,     global=4
i=5: current=max(2, 3+2)=5,      global=5
i=6: current=max(1, 5+1)=6,      global=6 ← MAX
...
Answer: 6
```

**Pattern**: Dynamic Programming (Kadane's)

---

### Problem 4: Move Zeroes
🏢 **Asked by**: Meta, Microsoft  
🔗 **LeetCode**: https://leetcode.com/problems/move-zeroes/ (LC #283)

**Problem**: Move all zeros to end while maintaining relative order of non-zeros. In-place.

```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

**Optimal — Two Pointers O(n)**:
```cpp
void moveZeroes(vector<int>& nums) {
    int slow = 0;  // Points to where next non-zero goes
    
    // Move all non-zeros to front
    for(int fast = 0; fast < nums.size(); fast++) {
        if(nums[fast] != 0) {
            nums[slow++] = nums[fast];
        }
    }
    
    // Fill rest with zeros
    while(slow < nums.size()) {
        nums[slow++] = 0;
    }
}
```

**Pattern**: Two Pointers (same direction)

---

### Problem 5: Single Number
🏢 **Asked by**: Amazon, Meta  
🔗 **LeetCode**: https://leetcode.com/problems/single-number/ (LC #136)

**Problem**: Every element appears twice except one. Find it in O(n) time, O(1) space.

```
Input:  [4, 1, 2, 1, 2]
Output: 4
```

**Optimal — XOR O(n), O(1) space**:
```cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for(int x : nums) result ^= x;  // All pairs cancel (a^a=0)
    return result;
}
```

**Why it works**: a^a=0 (same XOR = 0), a^0=a (XOR with 0 = identity)  
XOR all elements → pairs cancel → only single remains.

---

### Problem 6: Contains Duplicate
🏢 **Asked by**: Amazon, Google  
🔗 **LeetCode**: https://leetcode.com/problems/contains-duplicate/ (LC #217)

```cpp
bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for(int x : nums) {
        if(seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}
```

**Time**: O(n), **Space**: O(n)

---

### Problem 7: Find All Numbers Disappeared
🏢 **Asked by**: Microsoft  
🔗 **LeetCode**: https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/ (LC #448)

**Problem**: Array of n integers in range [1,n]. Some appear twice. Find all missing [1,n].

```
Input:  [4, 3, 2, 7, 8, 2, 3, 1]
Output: [5, 6]
```

**Optimal — Cyclic Sort / Negation O(n), O(1)**:
```cpp
vector<int> findDisappearedNumbers(vector<int>& nums) {
    // Mark visited positions by negating
    for(int i = 0; i < nums.size(); i++) {
        int idx = abs(nums[i]) - 1;  // The position this number "belongs to"
        if(nums[idx] > 0) nums[idx] = -nums[idx];  // Mark as visited
    }
    
    vector<int> result;
    for(int i = 0; i < nums.size(); i++) {
        if(nums[i] > 0) result.push_back(i + 1);  // Still positive = never visited
    }
    return result;
}
```

---

## 🟡 MEDIUM PROBLEMS

---

### Problem 8: Container With Most Water
🏢 **Asked by**: Google, Meta, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/container-with-most-water/ (LC #11)

**Problem**: Given heights array. Find two lines forming container with most water.

```
Input:  height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49  (lines at index 1 and 8: min(8,7)×7 = 49)
```

**Optimal — Two Pointers O(n)**:
```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while(left < right) {
        int h = min(height[left], height[right]);
        int w = right - left;
        maxWater = max(maxWater, h * w);
        
        // Move the shorter line (only shorter line can increase water)
        if(height[left] < height[right]) left++;
        else right--;
    }
    
    return maxWater;
}
```

**Dry Run**:
```
height=[1,8,6,2,5,4,8,3,7], left=0, right=8
water = min(1,7)×8 = 8, move left (shorter)

left=1, right=8
water = min(8,7)×7 = 49, maxWater=49, move right (shorter)

left=1, right=7
water = min(8,3)×6 = 18, move right...
(Continues, never beats 49)

Answer: 49
```

**Why greedy works**: Moving the taller line can never increase water (bounded by shorter). Moving shorter MAY increase.

---

### Problem 9: 3Sum
🏢 **Asked by**: Meta, Google, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/3sum/ (LC #15)

**Problem**: Find all unique triplets summing to 0.

```
Input:  nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1,-1,2], [-1,0,1]]
```

**Optimal — Sort + Two Pointers O(n²)**:
```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    
    for(int i = 0; i < (int)nums.size() - 2; i++) {
        if(i > 0 && nums[i] == nums[i-1]) continue;  // Skip duplicate i
        if(nums[i] > 0) break;  // Can't sum to 0 if all remaining positive
        
        int left = i + 1, right = nums.size() - 1;
        
        while(left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            
            if(sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while(left < right && nums[left] == nums[left+1]) left++;   // Skip dup
                while(left < right && nums[right] == nums[right-1]) right--; // Skip dup
                left++; right--;
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

### Problem 10: Product of Array Except Self
🏢 **Asked by**: Microsoft, Amazon, Adobe  
🔗 **LeetCode**: https://leetcode.com/problems/product-of-array-except-self/ (LC #238)

**Problem**: Return array where output[i] = product of all elements except nums[i]. No division. O(n) time, O(1) extra space.

```
Input:  nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

**Optimal — Prefix × Suffix O(n), O(1)**:
```cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    
    // Pass 1: result[i] = product of all to the LEFT of i
    int leftProduct = 1;
    for(int i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    // Pass 2: multiply by product of all to the RIGHT of i
    int rightProduct = 1;
    for(int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}
```

**Visual**:
```
nums:  [1,  2,  3,  4]

Left:  [1,  1,  2,  6]   (product of all BEFORE index)
Right: [24, 12, 4,  1]   (product of all AFTER index)

Result = Left × Right:
[1×24, 1×12, 2×4, 6×1] = [24, 12, 8, 6] ✓
```

---

### Problem 11: Subarray Sum Equals K
🏢 **Asked by**: Meta, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/subarray-sum-equals-k/ (LC #560)

**Problem**: Count number of subarrays with sum equal to k.

```
Input:  nums = [1, 1, 1], k = 2
Output: 2  (subarrays [1,1] at indices [0,1] and [1,2])
```

**Optimal — Prefix Sum + Hash Map O(n)**:
```cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;  // Empty prefix
    
    int prefixSum = 0, count = 0;
    
    for(int x : nums) {
        prefixSum += x;
        
        // Check if (prefixSum - k) appeared before
        // If prefix[j] = prefixSum - k, then sum(j+1..i) = k
        if(prefixCount.count(prefixSum - k)) {
            count += prefixCount[prefixSum - k];
        }
        
        prefixCount[prefixSum]++;
    }
    
    return count;
}
```

⚠️ **Cannot use sliding window here** — array may have negatives!

---

### Problem 12: Sort Colors (Dutch National Flag)
🏢 **Asked by**: Microsoft, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/sort-colors/ (LC #75)

**Problem**: Sort array of 0s, 1s, 2s in-place. One pass, O(1) space.

```
Input:  [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
```

**Optimal — Dutch National Flag O(n), O(1)**:
```cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    
    while(mid <= high) {
        if(nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);  // 0: swap to low region
        } else if(nums[mid] == 1) {
            mid++;  // 1: already in place
        } else {
            swap(nums[mid], nums[high--]);  // 2: swap to high region
            // NOTE: don't increment mid! New nums[mid] is unchecked
        }
    }
}
```

---

### Problem 13: Merge Intervals
🏢 **Asked by**: Google, Meta, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/merge-intervals/ (LC #56)

```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

**Optimal — Sort + Merge O(n log n)**:
```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());  // Sort by start
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for(int i = 1; i < intervals.size(); i++) {
        if(intervals[i][0] <= merged.back()[1]) {
            // Overlap: extend current interval
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            // No overlap: add new interval
            merged.push_back(intervals[i]);
        }
    }
    
    return merged;
}
```

---

### Problem 14: Rotate Array
🏢 **Asked by**: Amazon, Microsoft  
🔗 **LeetCode**: https://leetcode.com/problems/rotate-array/ (LC #189)

```
Input:  nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

**Optimal — Reversal O(n), O(1)**:
```cpp
void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k = k % n;  // Handle k > n
    
    auto rev = [&](int l, int r) {
        while(l < r) swap(nums[l++], nums[r--]);
    };
    
    rev(0, n-1);      // Reverse entire: [7,6,5,4,3,2,1]
    rev(0, k-1);      // Reverse first k: [5,6,7,4,3,2,1]
    rev(k, n-1);      // Reverse rest:    [5,6,7,1,2,3,4] ✓
}
```

---

### Problem 15: Maximum Product Subarray
🏢 **Asked by**: Google, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/maximum-product-subarray/ (LC #152)

**Problem**: Find contiguous subarray with largest product. Tricky because negatives can flip sign!

```
Input:  nums = [2, 3, -2, 4]
Output: 6  (subarray [2, 3])
```

**Key insight**: Track both max AND min (negative × negative = big positive!)

```cpp
int maxProduct(vector<int>& nums) {
    int maxProd = nums[0];  // Global max
    int curMax = nums[0];   // Current max product ending here
    int curMin = nums[0];   // Current min product ending here (for negatives!)
    
    for(int i = 1; i < nums.size(); i++) {
        int temp = curMax;
        
        curMax = max({nums[i], curMax * nums[i], curMin * nums[i]});
        curMin = min({nums[i], temp * nums[i], curMin * nums[i]});
        
        maxProd = max(maxProd, curMax);
    }
    
    return maxProd;
}
```

---

### Problem 16: Find Minimum in Rotated Sorted Array
🏢 **Asked by**: Google, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ (LC #153)

```
Input:  [3, 4, 5, 1, 2]
Output: 1
```

```cpp
int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        
        if(nums[mid] > nums[right]) {
            left = mid + 1;  // Minimum is in right half
        } else {
            right = mid;     // Minimum is mid or in left half
        }
    }
    
    return nums[left];
}
```

---

### Problem 17: Find the Duplicate Number
🏢 **Asked by**: Google, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/find-the-duplicate-number/ (LC #287)  
**Constraint**: O(1) space, don't modify array.

**Optimal — Floyd's Cycle Detection O(n), O(1)**:
```cpp
int findDuplicate(vector<int>& nums) {
    // Treat array as linked list: value at index = next pointer
    int slow = nums[0];
    int fast = nums[0];
    
    // Phase 1: Find intersection point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while(slow != fast);
    
    // Phase 2: Find cycle entrance (duplicate)
    slow = nums[0];
    while(slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}
```

---

### Problem 18: Jump Game
🏢 **Asked by**: Amazon, Microsoft  
🔗 **LeetCode**: https://leetcode.com/problems/jump-game/ (LC #55)

**Problem**: Given max jump lengths, can you reach the last index?

```
Input:  [2, 3, 1, 1, 4]  → true
Input:  [3, 2, 1, 0, 4]  → false
```

**Optimal — Greedy O(n)**:
```cpp
bool canJump(vector<int>& nums) {
    int maxReach = 0;  // Farthest index reachable
    
    for(int i = 0; i < nums.size(); i++) {
        if(i > maxReach) return false;  // Can't even reach this index!
        maxReach = max(maxReach, i + nums[i]);
    }
    
    return true;
}
```

---

## 🔴 HARD PROBLEMS

---

### Problem 19: Trapping Rain Water
🏢 **Asked by**: Google, Amazon, Microsoft  
🔗 **LeetCode**: https://leetcode.com/problems/trapping-rain-water/ (LC #42)

**Problem**: Given elevation map, compute trapped rainwater.

```
Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

**Approach 1 — Extra Space O(n), O(n)**:
```
Water at position i = min(maxLeft[i], maxRight[i]) - height[i]
```

```cpp
int trap_extraSpace(vector<int>& height) {
    int n = height.size();
    vector<int> leftMax(n), rightMax(n);
    
    leftMax[0] = height[0];
    for(int i = 1; i < n; i++) leftMax[i] = max(leftMax[i-1], height[i]);
    
    rightMax[n-1] = height[n-1];
    for(int i = n-2; i >= 0; i--) rightMax[i] = max(rightMax[i+1], height[i]);
    
    int water = 0;
    for(int i = 0; i < n; i++) {
        water += min(leftMax[i], rightMax[i]) - height[i];
    }
    return water;
}
```

**Approach 2 — Two Pointers O(n), O(1)**:
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
```

**Why two pointers works**:
```
If height[left] < height[right]:
  Water at left = leftMax - height[left]
  (We KNOW leftMax is the bottleneck, not rightMax — rightMax ≥ height[right] > height[left])
```

---

### Problem 20: Median of Two Sorted Arrays
🏢 **Asked by**: Amazon, Google  
🔗 **LeetCode**: https://leetcode.com/problems/median-of-two-sorted-arrays/ (LC #4)  
**Complexity**: O(log(min(m,n)))

```
Input:  nums1=[1,3], nums2=[2]
Output: 2.0

Input:  nums1=[1,2], nums2=[3,4]
Output: 2.5
```

```cpp
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Ensure nums1 is smaller
    if(nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    
    int m = nums1.size(), n = nums2.size();
    int left = 0, right = m;
    
    while(left <= right) {
        int partition1 = (left + right) / 2;
        int partition2 = (m + n + 1) / 2 - partition1;
        
        int maxLeft1 = (partition1 == 0) ? INT_MIN : nums1[partition1 - 1];
        int minRight1 = (partition1 == m) ? INT_MAX : nums1[partition1];
        int maxLeft2 = (partition2 == 0) ? INT_MIN : nums2[partition2 - 1];
        int minRight2 = (partition2 == n) ? INT_MAX : nums2[partition2];
        
        if(maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found correct partition
            if((m + n) % 2 == 0)
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
            else
                return max(maxLeft1, maxLeft2);
        } else if(maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
    return -1;
}
```

---

### Problem 21: Sliding Window Maximum
🏢 **Asked by**: Amazon, Google  
🔗 **LeetCode**: https://leetcode.com/problems/sliding-window-maximum/ (LC #239)

**Problem**: Return max element in every window of size k.

```
Input:  nums=[1,3,-1,-3,5,3,6,7], k=3
Output: [3,3,5,5,6,7]
```

**Optimal — Monotonic Deque O(n)**:
```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // Stores indices; front = max of current window
    vector<int> result;
    
    for(int i = 0; i < nums.size(); i++) {
        // Remove elements outside window
        while(!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        
        // Remove smaller elements (they'll never be max while current exists)
        while(!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        
        dq.push_back(i);
        
        // Add to result once window is full
        if(i >= k - 1) result.push_back(nums[dq.front()]);
    }
    
    return result;
}
```

---

### Problem 22: First Missing Positive
🏢 **Asked by**: Google  
🔗 **LeetCode**: https://leetcode.com/problems/first-missing-positive/ (LC #41)

**Problem**: Find smallest positive integer not in array. O(n) time, O(1) space.

```
Input:  [3, 4, -1, 1]
Output: 2
```

**Optimal — Cyclic Sort O(n), O(1)**:
```cpp
int firstMissingPositive(vector<int>& nums) {
    int n = nums.size();
    
    // Place each number in its "correct" position
    // nums[i] = i+1 if valid
    for(int i = 0; i < n; i++) {
        while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
            swap(nums[i], nums[nums[i]-1]);
        }
    }
    
    // Find first position where nums[i] != i+1
    for(int i = 0; i < n; i++) {
        if(nums[i] != i + 1) return i + 1;
    }
    
    return n + 1;  // All [1..n] present, answer is n+1
}
```

---

### Problem 23: Longest Consecutive Sequence
🏢 **Asked by**: Google, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/longest-consecutive-sequence/ (LC #128)

```
Input:  [100, 4, 200, 1, 3, 2]
Output: 4  (sequence: 1,2,3,4)
```

**Optimal — Hash Set O(n)**:
```cpp
int longestConsecutive(vector<int>& nums) {
    unordered_set<int> numSet(nums.begin(), nums.end());
    int longest = 0;
    
    for(int num : numSet) {
        // Only start counting from sequence beginnings
        if(!numSet.count(num - 1)) {
            int current = num;
            int length = 1;
            
            while(numSet.count(current + 1)) {
                current++;
                length++;
            }
            
            longest = max(longest, length);
        }
    }
    
    return longest;
}
```

---

### Problem 24: Majority Element II
🏢 **Asked by**: Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/majority-element-ii/ (LC #229)

**Problem**: Find all elements appearing > n/3 times. O(n) time, O(1) space.

```
Input:  [1, 1, 1, 3, 3, 2, 2, 2]
Output: [1, 2]
```

**Boyer-Moore Voting for Two Candidates**:
```cpp
vector<int> majorityElement(vector<int>& nums) {
    int cand1 = 0, cand2 = 1, cnt1 = 0, cnt2 = 0;
    
    // Phase 1: Find candidates
    for(int x : nums) {
        if(x == cand1) cnt1++;
        else if(x == cand2) cnt2++;
        else if(cnt1 == 0) { cand1 = x; cnt1 = 1; }
        else if(cnt2 == 0) { cand2 = x; cnt2 = 1; }
        else { cnt1--; cnt2--; }
    }
    
    // Phase 2: Verify candidates
    cnt1 = cnt2 = 0;
    for(int x : nums) {
        if(x == cand1) cnt1++;
        else if(x == cand2) cnt2++;
    }
    
    vector<int> result;
    int n = nums.size();
    if(cnt1 > n/3) result.push_back(cand1);
    if(cnt2 > n/3) result.push_back(cand2);
    return result;
}
```

---

### Problem 25: Count of Smaller Numbers After Self
🏢 **Asked by**: Google, Amazon  
🔗 **LeetCode**: https://leetcode.com/problems/count-of-smaller-numbers-after-self/ (LC #315)  
**Difficulty**: Hard

**Problem**: For each element, count elements to its right that are smaller.

```
Input:  [5, 2, 6, 1]
Output: [2, 1, 1, 0]
```

**Optimal — Modified Merge Sort O(n log n)**:
```cpp
vector<int> counts;
vector<pair<int,int>> arr;  // {value, original_index}

void mergeSort(int left, int right) {
    if(left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(left, mid);
    mergeSort(mid+1, right);
    
    vector<pair<int,int>> temp;
    int i = left, j = mid + 1;
    
    while(i <= mid && j <= right) {
        if(arr[i].first <= arr[j].first) {
            // arr[j] did not come before arr[i] yet
            counts[arr[i].second] += (j - mid - 1);  // All j's processed so far
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }
    
    while(i <= mid) {
        counts[arr[i].second] += (j - mid - 1);
        temp.push_back(arr[i++]);
    }
    while(j <= right) temp.push_back(arr[j++]);
    
    for(int k = left; k <= right; k++) arr[k] = temp[k - left];
}

vector<int> countSmaller(vector<int>& nums) {
    int n = nums.size();
    counts.assign(n, 0);
    arr.resize(n);
    for(int i = 0; i < n; i++) arr[i] = {nums[i], i};
    mergeSort(0, n - 1);
    return counts;
}
```

---

## 🎯 Pattern Summary

| Pattern | Key Problems | Time | Complexity Trick |
|---------|-------------|------|-----------------|
| Hash Map | Two Sum, Subarray Sum=K | O(n) | Complement lookup |
| Two Pointers | Container Water, 3Sum | O(n) | Sorted array decision |
| Sliding Window Fixed | Max Sum k-window | O(n) | Add/remove one element |
| Sliding Window Variable | Min Window Substring | O(n) | Expand right, shrink left |
| Kadane's | Max Subarray, Max Product | O(n) | Extend or start fresh |
| Prefix Sum | Range Queries | O(n) build, O(1) query | Cumulative sum formula |
| Cyclic Sort | Missing/Duplicate | O(n), O(1) | Place at correct index |
| Dutch Flag | Sort 0s,1s,2s | O(n), O(1) | Three pointer partition |
| XOR | Single Number, Missing | O(n), O(1) | Pairs cancel |
| Binary Search | Rotated Sort, k-th | O(log n) | Sorted property |
| Merge Sort | Count Inversions | O(n log n) | Count during merge |
| Monotonic Deque | Sliding Max | O(n) | Maintain useful elements |

---

[← MCQ Bank](02_arrays_mcq_extended.md) | [← Notes](02_arrays_master_notes.md)

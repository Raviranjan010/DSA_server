# 🏢 ARRAYS — Part 4: Company Questions (60+ Problems with Full Solutions)

> Every problem: Statement → Approach → Code → Dry Run → Edge Cases → Mistakes → Complexity

---

## 🚀 PHASE 1: The "Must-Solve" 10 Beginner Problems

Before diving into complex company-specific questions, ensure you can solve these 10 foundational problems. They cover all basic operations and common pitfalls.

1.  **Find the Largest/Smallest Element** — Basic traversal.
2.  **Find Second Largest** — Single pass logic.
3.  **Check if Array is Sorted** — Linear scan.
4.  **Reverse an Array** — Two pointers from ends.
5.  **Remove Duplicates from Sorted** — Two pointers same direction.
6.  **Left Rotate by 1** — Manual shifting.
7.  **Move Zeroes to End** — Two pointers same direction.
8.  **Linear Search** — Finding an element.
9.  **Binary Search** — O(log n) searching.
10. **Two Sum (Sorted)** — Two pointers converging.

---

## 🟢 EASY PROBLEMS

---

### E1. Two Sum
🏢 **Google, Amazon, Meta, Microsoft, Adobe**  
🔗 https://leetcode.com/problems/two-sum/ | LC #1  
📊 **Frequency**: ⭐⭐⭐⭐⭐ (Asked in almost every company)

**Problem**: Given array `nums` and integer `target`, return indices of two numbers that add up to `target`. Each input has exactly one solution. Cannot use same element twice.

```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]   (2 + 7 = 9)

Input:  nums = [3, 2, 4], target = 6
Output: [1, 2]   (2 + 4 = 6)
```

**Approach 1 — Brute Force O(n²)**: Check every pair.
**Approach 2 — HashMap O(n)**: For each element, check if its complement (target - element) was seen before.

**Key Insight**: When we process nums[i], we need to know if (target - nums[i]) exists somewhere BEFORE i. Store each number in a map as we go.

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;  // {value → index}
    
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if(seen.count(complement)) {
            return {seen[complement], i};  // Found the pair!
        }
        
        seen[nums[i]] = i;  // Store current element for future checks
    }
    
    return {};  // Problem guarantees one solution, so never reaches here
}
```

**Dry Run** on [2,7,11,15], target=9:
```
i=0: nums[0]=2, complement=7. seen={}. Not found. seen={2:0}
i=1: nums[1]=7, complement=2. seen={2:0}. FOUND! return {0,1} ✓
```

**Edge Cases**: `[3,3]` target=6 → returns `{0,1}` (same value, different indices — fine since we check BEFORE storing).

**Common Mistakes**:
- ❌ Adding to map BEFORE checking → finds same index twice
- ❌ Using sorted two-pointer (returns values not indices)

**Complexity**: Time O(n), Space O(n)

---

### E2. Best Time to Buy and Sell Stock
🏢 **Amazon, Meta, Adobe, TCS**  
🔗 https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ | LC #121

**Problem**: Array where prices[i] = stock price on day i. Find max profit from ONE buy-sell (must buy before selling). Return 0 if no profit possible.

```
Input:  [7, 1, 5, 3, 6, 4]
Output: 5   (buy day 2 at price 1, sell day 5 at price 6)

Input:  [7, 6, 4, 3, 1]
Output: 0   (prices only decrease, no profit)
```

**Key Insight**: For each day, the maximum profit if we SELL on this day = today's price - minimum price seen so far.

```cpp
int maxProfit(vector<int>& prices) {
    if(prices.empty()) return 0;
    
    int minSoFar = prices[0];   // Cheapest buy price seen
    int maxProfit = 0;          // Best profit found
    
    for(int i = 1; i < prices.size(); i++) {
        // Profit if we sell today
        int profitToday = prices[i] - minSoFar;
        maxProfit = max(maxProfit, profitToday);
        
        // Update cheapest buy price
        minSoFar = min(minSoFar, prices[i]);
    }
    
    return maxProfit;
}
```

**Dry Run** on [7,1,5,3,6,4]:
```
minSoFar=7, maxProfit=0

i=1: price=1. profit=1-7=-6, maxProfit=0. minSoFar=1
i=2: price=5. profit=5-1=4,  maxProfit=4. minSoFar=1
i=3: price=3. profit=3-1=2,  maxProfit=4. minSoFar=1
i=4: price=6. profit=6-1=5,  maxProfit=5. minSoFar=1 ← BEST
i=5: price=4. profit=4-1=3,  maxProfit=5. minSoFar=1

Answer: 5 ✓
```

**Common Mistakes**:
- ❌ Updating minSoFar BEFORE computing profit → misses valid profits
- ❌ Forgetting profit can be 0 (no transaction case)

**Complexity**: Time O(n), Space O(1)

---

### E3. Maximum Subarray (Kadane's)
🏢 **Amazon, Microsoft, Google, Adobe**  
🔗 https://leetcode.com/problems/maximum-subarray/ | LC #53

**Problem**: Find contiguous subarray with largest sum. Must contain at least one element.

```
Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6   (subarray [4, -1, 2, 1])
```

```cpp
int maxSubArray(vector<int>& nums) {
    int current = nums[0];   // Max sum ending at current position
    int global = nums[0];    // Max sum seen overall
    
    for(int i = 1; i < nums.size(); i++) {
        // Should we extend or start fresh?
        if(current < 0) {
            current = nums[i];   // Previous sum was negative, start fresh
        } else {
            current += nums[i];  // Extend (adding positive running sum)
        }
        global = max(global, current);
    }
    
    return global;
}
// Equivalently: current = max(nums[i], current + nums[i]);
```

**Why it works**: If current sum is negative, it only hurts future sums. Better to restart from this element. If current sum is ≥ 0, it can only help by extending.

**Common Mistakes**:
- ❌ Initializing current=0 and global=0 → fails for all-negative arrays
- ❌ Using prefix sum approach without optimization → O(n²)

---

### E4. Move Zeroes
🏢 **Meta, Microsoft**  
🔗 https://leetcode.com/problems/move-zeroes/ | LC #283

**Problem**: Move all 0s to end while maintaining relative order of non-zeros. In-place, minimize operations.

```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

```cpp
void moveZeroes(vector<int>& nums) {
    int insertPos = 0;  // Where to place next non-zero
    
    // Pass 1: Move all non-zeros to front
    for(int i = 0; i < nums.size(); i++) {
        if(nums[i] != 0) {
            nums[insertPos++] = nums[i];
        }
    }
    
    // Pass 2: Fill remaining positions with zeros
    while(insertPos < nums.size()) {
        nums[insertPos++] = 0;
    }
}
```

---

### E5. Single Number (XOR)
🏢 **Amazon, Meta**  
🔗 https://leetcode.com/problems/single-number/ | LC #136

**Problem**: Every element appears exactly twice except one. Find it. O(n) time, O(1) space.

```
Input:  [4, 1, 2, 1, 2]
Output: 4
```

```cpp
int singleNumber(vector<int>& nums) {
    int result = 0;
    for(int x : nums) result ^= x;
    return result;
}
// XOR: same numbers cancel (a^a=0), zero identity (0^a=a)
// All pairs cancel → only single remains
```

---

### E6. Find All Disappeared Numbers
🏢 **Microsoft**  
🔗 https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/ | LC #448

**Problem**: Array of n integers in [1,n]. Some appear twice, some appear once. Find all [1,n] not in array. O(n) time, O(1) extra space.

```
Input:  [4, 3, 2, 7, 8, 2, 3, 1]
Output: [5, 6]
```

**Trick**: Use the sign of arr[index] as a "visited" marker!

```cpp
vector<int> findDisappearedNumbers(vector<int>& nums) {
    // Mark visited: for each value v, negate arr[v-1]
    for(int i = 0; i < nums.size(); i++) {
        int idx = abs(nums[i]) - 1;  // Convert value to 0-indexed position
        if(nums[idx] > 0) nums[idx] = -nums[idx];  // Mark as visited
    }
    
    // Positions still positive = those values never appeared
    vector<int> result;
    for(int i = 0; i < nums.size(); i++) {
        if(nums[i] > 0) result.push_back(i + 1);
    }
    return result;
}
```

**Dry Run** on [4,3,2,7,8,2,3,1]:
```
i=0: val=4, idx=3, negate arr[3]=7 → -7. Array: [4,3,2,-7,8,2,3,1]
i=1: val=3, idx=2, negate arr[2]=2 → -2. Array: [4,3,-2,-7,8,2,3,1]
i=2: val=-2, idx=1, negate arr[1]=3 → -3. Array: [4,-3,-2,-7,8,2,3,1]
i=3: val=-7, idx=6, negate arr[6]=3 → -3. Array: [4,-3,-2,-7,8,2,-3,1]
i=4: val=8, idx=7, negate arr[7]=1 → -1. Array: [4,-3,-2,-7,8,2,-3,-1]
i=5: val=2, idx=1, arr[1]=-3<0, already marked. No change.
i=6: val=-3, idx=2, arr[2]=-2<0, already marked.
i=7: val=-1, idx=0, negate arr[0]=4 → -4. Array: [-4,-3,-2,-7,8,2,-3,-1]

Check: 
arr[4]=8 > 0 → index 4 → value 5 missing ✓
arr[5]=2 > 0 → index 5 → value 6 missing ✓
```

---

### E7. Majority Element
🏢 **Adobe, Amazon**  
🔗 https://leetcode.com/problems/majority-element/ | LC #169

**Problem**: Find element that appears more than n/2 times. O(n), O(1).

```cpp
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
    
    return candidate;  // Problem guarantees majority exists
}
// Boyer-Moore: majority element "outlasts" all opposition
// Each non-match decreases count; majority has count left at end
```

---

## 🟡 MEDIUM PROBLEMS

---

### M1. Container With Most Water
🏢 **Google, Meta, Amazon**  
🔗 https://leetcode.com/problems/container-with-most-water/ | LC #11

**Problem**: Array of heights. Pick two lines. Water trapped = min(h[L], h[R]) × (R-L). Maximize water.

```
Input:  [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49   (lines at index 1 and 8: min(8,7)×7 = 49)
```

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    
    while(left < right) {
        int area = min(height[left], height[right]) * (right - left);
        maxWater = max(maxWater, area);
        
        // Move the SHORTER wall (moving taller can never help)
        if(height[left] <= height[right]) left++;
        else right--;
    }
    
    return maxWater;
}
```

**Why greedy works**: Current area is bounded by the shorter wall. If we move the taller wall inward: width decreases AND height still bounded by shorter wall → area ≤ current. So move the shorter wall — it MIGHT lead to something taller.

---

### M2. 3Sum
🏢 **Meta, Google, Amazon, Microsoft**  
🔗 https://leetcode.com/problems/3sum/ | LC #15

**Problem**: Find all unique triplets summing to 0.

```
Input:  [-1, 0, 1, 2, -1, -4]
Output: [[-1,-1,2], [-1,0,1]]
```

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    
    for(int i = 0; i < (int)nums.size() - 2; i++) {
        if(i > 0 && nums[i] == nums[i-1]) continue;  // Skip dup i
        if(nums[i] > 0) break;                        // Optimization!
        
        int L = i+1, R = nums.size()-1;
        while(L < R) {
            int sum = nums[i] + nums[L] + nums[R];
            if(sum == 0) {
                res.push_back({nums[i], nums[L], nums[R]});
                while(L<R && nums[L]==nums[L+1]) L++;  // Skip dup L
                while(L<R && nums[R]==nums[R-1]) R--;  // Skip dup R
                L++; R--;
            } else if(sum < 0) L++;
            else R--;
        }
    }
    return res;
}
```

**Why sort first?** Sorting makes duplicates adjacent (easy to skip) and allows two-pointer technique.

**Common Mistakes**:
- ❌ Not skipping duplicates → duplicate triplets in result
- ❌ Not handling `nums[i] > 0` break → unnecessary iterations

---

### M3. Product of Array Except Self
🏢 **Microsoft, Amazon, Adobe, Meta**  
🔗 https://leetcode.com/problems/product-of-array-except-self/ | LC #238

**Problem**: Return array where output[i] = product of ALL elements except nums[i]. No division. O(n) time, O(1) extra space.

```
Input:  [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

**Insight**: output[i] = (product of everything LEFT of i) × (product of everything RIGHT of i).

```cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    
    // Pass 1 (left to right): result[i] = product of nums[0..i-1]
    int leftProduct = 1;
    for(int i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    // result = [1, 1, 2, 6]  (products to the left of each index)
    
    // Pass 2 (right to left): multiply by product of nums[i+1..n-1]
    int rightProduct = 1;
    for(int i = n-1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    // i=3: result[3]=6×1=6,   rightProduct=4
    // i=2: result[2]=2×4=8,   rightProduct=12
    // i=1: result[1]=1×12=12, rightProduct=24
    // i=0: result[0]=1×24=24, rightProduct=24
    
    return result;  // [24, 12, 8, 6] ✓
}
```

**Why no division?** Works even if zeros exist in array! If you used division, you'd divide by zero.

---

### M4. Subarray Sum Equals K
🏢 **Meta, Amazon, Google**  
🔗 https://leetcode.com/problems/subarray-sum-equals-k/ | LC #560

**Problem**: Count number of subarrays with sum equal to k. Array can have negatives!

```
Input:  [1, 1, 1], k = 2
Output: 2

Input:  [1, -1, 1], k = 1
Output: 3
```

```cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;  // Base case: prefix sum of 0 (empty prefix)
    
    int prefixSum = 0, count = 0;
    
    for(int x : nums) {
        prefixSum += x;
        
        // sum(L..R) = k means prefix[R+1] - prefix[L] = k
        // → prefix[L] = prefixSum - k
        // How many previous prefixes equal (prefixSum - k)?
        count += prefixCount[prefixSum - k];
        
        prefixCount[prefixSum]++;
    }
    
    return count;
}
```

**⚠️ Why NOT sliding window?** Negatives! With negatives, growing window doesn't guarantee sum grows, so you can't shrink based on sum comparison.

---

### M5. Sort Colors (Dutch National Flag)
🏢 **Microsoft, Amazon**  
🔗 https://leetcode.com/problems/sort-colors/ | LC #75

**Problem**: Sort array of 0,1,2 in-place. One pass, O(1) space.

```cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size()-1;
    while(mid <= high) {
        if(nums[mid] == 0)      { swap(nums[low++], nums[mid++]); }
        else if(nums[mid] == 1) { mid++; }
        else                    { swap(nums[mid], nums[high--]); }
        // After case 2: DON'T mid++, arr[mid] is new unexamined element
    }
}
```

---

### M6. Merge Intervals
🏢 **Google, Meta, Amazon**  
🔗 https://leetcode.com/problems/merge-intervals/ | LC #56

**Problem**: Given list of intervals, merge all overlapping ones.

```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());  // Sort by start time
    
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    
    for(int i = 1; i < intervals.size(); i++) {
        // Current interval starts BEFORE end of last merged interval
        if(intervals[i][0] <= merged.back()[1]) {
            // Overlap: extend last interval's end if needed
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            // No overlap: add as separate interval
            merged.push_back(intervals[i]);
        }
    }
    
    return merged;
}
```

**Dry Run** on [[1,3],[2,6],[8,10],[15,18]]:
```
Sort: [[1,3],[2,6],[8,10],[15,18]]  (already sorted)
merged = [[1,3]]

i=1: [2,6]: 2 <= 3 (overlap!) → extend: merged=[[1,6]]
i=2: [8,10]: 8 > 6 (no overlap) → add: merged=[[1,6],[8,10]]
i=3: [15,18]: 15 > 10 (no overlap) → add: merged=[[1,6],[8,10],[15,18]]

Answer: [[1,6],[8,10],[15,18]] ✓
```

---

### M7. Rotate Array
🏢 **Amazon, Microsoft**  
🔗 https://leetcode.com/problems/rotate-array/ | LC #189

**Problem**: Rotate array right by k steps. In-place.

```
Input:  [1,2,3,4,5,6,7], k=3
Output: [5,6,7,1,2,3,4]
```

```cpp
void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k = k % n;  // Handle k > n
    if(k == 0) return;
    
    // Reversal trick: three reversals = right rotation by k
    reverse(nums.begin(), nums.end());         // [7,6,5,4,3,2,1]
    reverse(nums.begin(), nums.begin() + k);   // [5,6,7,4,3,2,1]
    reverse(nums.begin() + k, nums.end());     // [5,6,7,1,2,3,4] ✓
}
```

---

### M8. Jump Game
🏢 **Amazon, Microsoft**  
🔗 https://leetcode.com/problems/jump-game/ | LC #55

**Problem**: Each element is max jump length. Can you reach the last index?

```
Input:  [2, 3, 1, 1, 4]  → true
Input:  [3, 2, 1, 0, 4]  → false (stuck at index 3)
```

```cpp
bool canJump(vector<int>& nums) {
    int maxReach = 0;  // Farthest index we can reach
    
    for(int i = 0; i < nums.size(); i++) {
        if(i > maxReach) return false;  // Can't reach this index!
        maxReach = max(maxReach, i + nums[i]);
        if(maxReach >= nums.size()-1) return true;  // Can reach end!
    }
    
    return true;
}
```

---

### M9. Maximum Product Subarray
🏢 **Google, Amazon**  
🔗 https://leetcode.com/problems/maximum-product-subarray/ | LC #152

**Problem**: Find contiguous subarray with largest product. TRICKY because negative × negative = positive!

```
Input:  [2, 3, -2, 4]
Output: 6   ([2,3])

Input:  [-2, 0, -1]
Output: 0
```

```cpp
int maxProduct(vector<int>& nums) {
    int maxProd = nums[0];
    int curMax = nums[0];  // Max product ending here
    int curMin = nums[0];  // Min product ending here (for negatives!)
    
    for(int i = 1; i < nums.size(); i++) {
        // When we multiply by negative, max and min SWAP!
        int tempMax = curMax;
        
        curMax = max({nums[i], tempMax * nums[i], curMin * nums[i]});
        curMin = min({nums[i], tempMax * nums[i], curMin * nums[i]});
        
        maxProd = max(maxProd, curMax);
    }
    
    return maxProd;
}
```

**Why track curMin?** If we encounter a negative number later, curMin (negative) × negative = large positive!

---

### M10. Find Minimum in Rotated Sorted Array
🏢 **Google, Amazon**  
🔗 https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ | LC #153

```cpp
int findMin(vector<int>& nums) {
    int left = 0, right = nums.size()-1;
    
    while(left < right) {  // Note: left < right (not <=)
        int mid = left + (right-left)/2;
        
        if(nums[mid] > nums[right]) {
            left = mid + 1;   // Min is in right half
        } else {
            right = mid;      // Min is at mid or in left half
        }
    }
    
    return nums[left];  // left == right == position of minimum
}
```

---

### M11. Search in Rotated Sorted Array
🏢 **Amazon, Microsoft, Google**  
🔗 https://leetcode.com/problems/search-in-rotated-sorted-array/ | LC #33

```cpp
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size()-1;
    
    while(left <= right) {
        int mid = left + (right-left)/2;
        if(nums[mid] == target) return mid;
        
        if(nums[left] <= nums[mid]) {  // Left half is sorted
            if(nums[left] <= target && target < nums[mid])
                right = mid-1;
            else
                left = mid+1;
        } else {                        // Right half is sorted
            if(nums[mid] < target && target <= nums[right])
                left = mid+1;
            else
                right = mid-1;
        }
    }
    return -1;
}
```

---

### M12. Next Permutation
🏢 **Adobe, Microsoft**  
🔗 https://leetcode.com/problems/next-permutation/ | LC #31

**Problem**: Find the next lexicographically greater arrangement. If greatest, rearrange to lowest.

```
Input:  [1, 2, 3]  → [1, 3, 2]
Input:  [3, 2, 1]  → [1, 2, 3]  (wrap around)
Input:  [1, 1, 5]  → [1, 5, 1]
```

```cpp
void nextPermutation(vector<int>& nums) {
    int n = nums.size();
    int i = n-2;
    
    // Step 1: Find first element from right that is LESS than element after it
    while(i >= 0 && nums[i] >= nums[i+1]) i--;
    
    if(i >= 0) {
        // Step 2: Find first element from right that is GREATER than nums[i]
        int j = n-1;
        while(nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);  // Step 3: Swap them
    }
    
    // Step 4: Reverse suffix after position i (makes it smallest)
    reverse(nums.begin()+i+1, nums.end());
}
```

---

## 🔴 HARD PROBLEMS

---

### H1. Trapping Rain Water
🏢 **Google, Amazon, Microsoft, Meta**  
🔗 https://leetcode.com/problems/trapping-rain-water/ | LC #42  
📊 **Frequency**: ⭐⭐⭐⭐⭐

**Problem**: Given elevation map, compute how much water it can trap after rain.

```
Input:  [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

**Why O(n), O(1) works:**  
Water at position i = min(maxLeft[i], maxRight[i]) - height[i].  
Two pointers: whichever side has smaller max, process that side (water there depends only on its own side's max).

```cpp
int trap(vector<int>& height) {
    int left = 0, right = height.size()-1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    
    while(left < right) {
        if(height[left] < height[right]) {
            // Left side is the bottleneck
            if(height[left] >= leftMax)
                leftMax = height[left];   // Update max
            else
                water += leftMax - height[left];  // Collect water
            left++;
        } else {
            // Right side is the bottleneck
            if(height[right] >= rightMax)
                rightMax = height[right];
            else
                water += rightMax - height[right];
            right--;
        }
    }
    
    return water;
}
```

**Dry Run** on [0,1,0,2,1,0,1,3,2,1,2,1]:
```
left=0, right=11, leftMax=0, rightMax=0

h[0]=0 < h[11]=1: left side
  h[0]=0 >= leftMax=0: leftMax=0, left=1
h[1]=1 >= h[11]=1: right side  
  h[11]=1 >= rightMax=0: rightMax=1, right=10
h[1]=1 < h[10]=2: left side
  h[1]=1 >= leftMax=0: leftMax=1, left=2
h[2]=0 < h[10]=2: left side
  h[2]=0 < leftMax=1: water += 1-0=1. water=1, left=3
h[3]=2 >= h[10]=2: right side
  h[10]=2 >= rightMax=1: rightMax=2, right=9
... (continues)

Final water = 6 ✓
```

---

### H2. First Missing Positive
🏢 **Google**  
🔗 https://leetcode.com/problems/first-missing-positive/ | LC #41

**Problem**: Find smallest POSITIVE integer not in array. O(n) time, O(1) space.

```
Input:  [3, 4, -1, 1]  → 2
Input:  [1, 2, 0]      → 3
Input:  [7, 8, 9]      → 1
```

**Key Insight**: Answer MUST be in range [1, n+1]. Use cyclic sort on valid values [1,n].

```cpp
int firstMissingPositive(vector<int>& nums) {
    int n = nums.size();
    
    // Cyclic sort: place nums[i] at index nums[i]-1 if valid (1 to n)
    for(int i = 0; i < n; ) {
        int j = nums[i] - 1;  // Correct position for nums[i]
        
        if(nums[i] > 0 && nums[i] <= n && nums[i] != nums[j]) {
            swap(nums[i], nums[j]);
        } else {
            i++;
        }
    }
    
    // Find first position where value is wrong
    for(int i = 0; i < n; i++) {
        if(nums[i] != i+1) return i+1;  // i+1 is missing!
    }
    
    return n+1;  // All [1..n] present, answer is n+1
}
```

---

### H3. Sliding Window Maximum
🏢 **Amazon, Google**  
🔗 https://leetcode.com/problems/sliding-window-maximum/ | LC #239

**Problem**: Return max element in each window of size k.

```
Input:  [1,3,-1,-3,5,3,6,7], k=3
Output: [3,3,5,5,6,7]
```

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;    // Stores INDICES, maintained in decreasing order of VALUE
    vector<int> result;
    
    for(int i = 0; i < nums.size(); i++) {
        // Remove indices that are out of current window
        while(!dq.empty() && dq.front() < i-k+1) {
            dq.pop_front();
        }
        
        // Remove indices with smaller values (they'll never be max while nums[i] exists)
        while(!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // Window is full: front of deque is index of max
        if(i >= k-1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

**Why deque?** It's a double-ended queue. We can add/remove from both front and back.  
**Invariant**: Deque always contains indices of potentially useful maximums, in decreasing order of value.

---

### H4. Median of Two Sorted Arrays
🏢 **Amazon, Google**  
🔗 https://leetcode.com/problems/median-of-two-sorted-arrays/ | LC #4  
**Required**: O(log(m+n))

```
Input:  nums1=[1,3], nums2=[2]     → 2.0
Input:  nums1=[1,2], nums2=[3,4]   → 2.5
```

```cpp
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Ensure nums1 is the smaller array
    if(nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    
    int m = nums1.size(), n = nums2.size();
    int lo = 0, hi = m;
    int half = (m+n+1)/2;  // Left half size of merged array
    
    while(lo <= hi) {
        int i = lo + (hi-lo)/2;  // Partition nums1: take i elements from left
        int j = half - i;         // Partition nums2: take j elements from left
        
        int maxLeft1 = (i==0) ? INT_MIN : nums1[i-1];
        int minRight1= (i==m) ? INT_MAX : nums1[i];
        int maxLeft2 = (j==0) ? INT_MIN : nums2[j-1];
        int minRight2= (j==n) ? INT_MAX : nums2[j];
        
        if(maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Correct partition found!
            if((m+n) % 2 == 1)
                return max(maxLeft1, maxLeft2);
            else
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
        } else if(maxLeft1 > minRight2) {
            hi = i-1;   // Too many elements from nums1 on left side
        } else {
            lo = i+1;   // Too few elements from nums1 on left side
        }
    }
    return 0.0;
}
```

---

### H5. Count Inversions (Modified Merge Sort)
🏢 **Amazon, Codeforces**

**Problem**: Count pairs (i,j) where i<j but arr[i]>arr[j].

```
Input:  [2, 4, 1, 3, 5]
Output: 3   (pairs: (2,1), (4,1), (4,3))
```

```cpp
long long mergeCount(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid+1;
    long long count = 0;
    
    while(i <= mid && j <= right) {
        if(arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            // arr[i..mid] all > arr[j]  → (mid-i+1) inversions!
            count += (mid - i + 1);
            temp.push_back(arr[j++]);
        }
    }
    
    while(i <= mid)  temp.push_back(arr[i++]);
    while(j <= right) temp.push_back(arr[j++]);
    
    for(int k = left; k <= right; k++) arr[k] = temp[k-left];
    return count;
}

long long countInversions(vector<int>& arr, int left, int right) {
    if(left >= right) return 0;
    int mid = left + (right-left)/2;
    return countInversions(arr, left, mid)
         + countInversions(arr, mid+1, right)
         + mergeCount(arr, left, mid, right);
}
```

---

## 🔮 SECTION: Future Prediction Questions (Likely to Be Asked)

These are emerging patterns frequently appearing in recent interviews:

### FP1. Longest Subarray with Absolute Diff ≤ limit
🏢 **Amazon (2023-24)**  
🔗 https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/ | LC #1438

```cpp
// Use two monotonic deques: one for max, one for min
// Window is valid when maxDeque.front() - minDeque.front() <= limit
int longestSubarray(vector<int>& nums, int limit) {
    deque<int> maxD, minD;  // Store indices
    int left = 0, res = 0;
    
    for(int right = 0; right < nums.size(); right++) {
        while(!maxD.empty() && nums[maxD.back()] <= nums[right]) maxD.pop_back();
        while(!minD.empty() && nums[minD.back()] >= nums[right]) minD.pop_back();
        maxD.push_back(right);
        minD.push_back(right);
        
        while(nums[maxD.front()] - nums[minD.front()] > limit) {
            left++;
            if(maxD.front() < left) maxD.pop_front();
            if(minD.front() < left) minD.pop_front();
        }
        res = max(res, right - left + 1);
    }
    return res;
}
```

### FP2. Maximum Points from Cards (Two-End Sliding Window)
🏢 **Amazon, Google (2024)**  
🔗 https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/ | LC #1423

```cpp
// Take exactly k cards from front or back
// Trick: find minimum sum window of (n-k) cards in middle
int maxScore(vector<int>& cardPoints, int k) {
    int n = cardPoints.size(), windowSize = n-k;
    int windowSum = 0, totalSum = 0;
    
    for(int x : cardPoints) totalSum += x;
    if(windowSize == 0) return totalSum;
    
    for(int i = 0; i < windowSize; i++) windowSum += cardPoints[i];
    int minWindow = windowSum;
    
    for(int i = windowSize; i < n; i++) {
        windowSum += cardPoints[i] - cardPoints[i-windowSize];
        minWindow = min(minWindow, windowSum);
    }
    
    return totalSum - minWindow;
}
```

### FP3. Minimum Difference Between Highest and Lowest of k Scores
🏢 **TCS, Infosys (2024)**  
🔗 https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/ | LC #1984

```cpp
// Sort array, then check every consecutive k-window
int minimumDifference(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end());
    int res = INT_MAX;
    for(int i = 0; i+k-1 < nums.size(); i++) {
        res = min(res, nums[i+k-1] - nums[i]);
    }
    return res;
}
```

### FP4. Find the Duplicate Number (Floyd's Cycle)
🏢 **Google, Amazon**  
🔗 https://leetcode.com/problems/find-the-duplicate-number/ | LC #287

```cpp
// Treat as linked list: value at index = next node
// Duplicate creates cycle. Find cycle entrance = duplicate.
int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[0];
    
    // Phase 1: Find intersection
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while(slow != fast);
    
    // Phase 2: Find cycle entrance
    slow = nums[0];
    while(slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}
```

---

*Next → `05_arrays_mcq_bank.md` — 80 MCQs with detailed explanations*
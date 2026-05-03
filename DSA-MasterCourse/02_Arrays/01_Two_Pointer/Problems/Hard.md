# Two Pointer — Hard Problems

> **7 advanced problems requiring creative thinking**  
> **Prerequisites**: Medium Problems, strong pattern recognition  
> **Time Required**: 5-6 hours

---

## Problem 1: Minimum Window Substring

**Source**: https://leetcode.com/problems/minimum-window-substring/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Meta, Google, Amazon  
**Frequency**: 📅 Very High

### Problem Statement
Given strings s and t, return the minimum window in s which contains all characters of t. Return "" if no such window exists.

### Examples
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```

### Pattern: Variable Sliding Window + Hash Map

### Approach
1. Count required characters from t
2. Expand right until all t characters are in window (`formed == required`)
3. Shrink from left while maintaining validity, track minimum
4. Repeat

### Complete Solution
```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";

        unordered_map<char, int> need;
        for (char c : t) need[c]++;

        int required = need.size();   // Distinct chars needed
        int formed = 0;               // Distinct chars currently satisfied

        unordered_map<char, int> have;
        int left = 0;
        int minLen = INT_MAX, minLeft = 0;

        for (int right = 0; right < s.size(); right++) {
            char c = s[right];
            have[c]++;

            if (need.count(c) && have[c] == need[c])
                formed++;

            // Try to shrink window
            while (formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                }

                char lc = s[left];
                have[lc]--;
                if (need.count(lc) && have[lc] < need[lc])
                    formed--;
                left++;
            }
        }

        return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
    }
};
```

### Edge Cases
- ✅ t longer than s → ""
- ✅ No valid window → ""
- ✅ t has duplicate characters
- ✅ Exact match (s == t)

### Complexity: Time O(|s| + |t|), Space O(|s| + |t|)

---

## Problem 2: Sliding Window Maximum

**Source**: https://leetcode.com/problems/sliding-window-maximum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an array and window size k, return the max element in each sliding window.

### Examples
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
```

### Pattern: Monotonic Deque (Decreasing)

### Key Insight
Maintain a deque of indices in decreasing order of their values. The front always has the max for the current window.

### Complete Solution
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;  // Stores indices, decreasing values
        vector<int> result;

        for (int i = 0; i < nums.size(); i++) {
            // Remove indices outside current window
            if (!dq.empty() && dq.front() == i - k)
                dq.pop_front();

            // Remove smaller elements from back (they'll never be max)
            while (!dq.empty() && nums[dq.back()] < nums[i])
                dq.pop_back();

            dq.push_back(i);

            // Window is fully formed
            if (i >= k - 1)
                result.push_back(nums[dq.front()]);
        }

        return result;
    }
};
```

### Dry Run
```
nums=[1,3,-1,-3,5,3,6,7], k=3

i=0: dq=[0(1)]
i=1: 3>1 → pop 0, dq=[1(3)]
i=2: -1<3 → dq=[1(3),2(-1)] → window full → result=[3]
i=3: -3<-1 → dq=[1(3),2(-1),3(-3)] → front=1 still in window → result=[3,3]
i=4: 5>-3,-1,3 → all popped, dq=[4(5)] → front=4, 4-3=1 not==4-3? 4>=3 → result=[3,3,5]
...
```

### Complexity: Time O(n), Space O(k)

---

## Problem 3: Median of Two Sorted Arrays

**Source**: https://leetcode.com/problems/median-of-two-sorted-arrays/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon, Microsoft  
**Frequency**: 📅 Very High

### Problem Statement
Find the median of two sorted arrays in O(log(m+n)) time.

### Examples
```
Input: nums1=[1,3], nums2=[2]       → Output: 2.0
Input: nums1=[1,2], nums2=[3,4]     → Output: 2.5
```

### Pattern: Binary Search on Partition

### Key Insight
Instead of merging, find the correct partition of each array such that:
- Left halves combined = Right halves combined (in count)
- Every element in left halves ≤ every element in right halves

Binary search the partition position on the smaller array.

### Complete Solution
```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size())
            swap(nums1, nums2);  // Ensure nums1 is smaller

        int m = nums1.size(), n = nums2.size();
        int left = 0, right = m;

        while (left <= right) {
            int px = left + (right - left) / 2;  // Partition in nums1
            int py = (m + n + 1) / 2 - px;       // Partition in nums2

            int maxX = (px == 0) ? INT_MIN : nums1[px - 1];
            int minX = (px == m) ? INT_MAX : nums1[px];
            int maxY = (py == 0) ? INT_MIN : nums2[py - 1];
            int minY = (py == n) ? INT_MAX : nums2[py];

            if (maxX <= minY && maxY <= minX) {
                // Correct partition
                if ((m + n) % 2 == 0)
                    return (max(maxX, maxY) + min(minX, minY)) / 2.0;
                else
                    return max(maxX, maxY);
            } else if (maxX > minY) {
                right = px - 1;  // Move partition left in nums1
            } else {
                left = px + 1;   // Move partition right in nums1
            }
        }

        return 0.0;
    }
};
```

### Complexity: Time O(log(min(m,n))), Space O(1)

---

## Problem 4: Count of Range Sum

**Source**: https://leetcode.com/problems/count-of-range-sum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Given array and bounds [lower, upper], count range sums S(i,j) (sum of nums[i..j]) in [lower, upper].

### Examples
```
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3  → [-2], [-1], [-2,5,-1] all fall in range
```

### Pattern: Prefix Sum + Merge Sort

### Complete Solution
```cpp
class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        vector<long long> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++)
            prefixSum[i + 1] = prefixSum[i] + nums[i];

        return mergeCount(prefixSum, 0, n, lower, upper);
    }

    int mergeCount(vector<long long>& sums, int start, int end, int lower, int upper) {
        if (end - start <= 1) return 0;

        int mid = start + (end - start) / 2;
        int count = mergeCount(sums, start, mid, lower, upper) +
                    mergeCount(sums, mid, end, lower, upper);

        // Count valid pairs across left and right halves
        int j = mid, k = mid;
        for (int i = start; i < mid; i++) {
            while (k < end && sums[k] - sums[i] <  lower) k++;
            while (j < end && sums[j] - sums[i] <= upper) j++;
            count += j - k;
        }

        inplace_merge(sums.begin() + start, sums.begin() + mid, sums.begin() + end);
        return count;
    }
};
```

### Complexity: Time O(n log n), Space O(n)

---

## Problem 5: Longest Consecutive Sequence

**Source**: https://leetcode.com/problems/longest-consecutive-sequence/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google, Amazon  
**Frequency**: 📅 High

### Problem Statement
Given an unsorted array, find the length of the longest consecutive sequence in O(n) time.

### Examples
```
Input: [100,4,200,1,3,2]
Output: 4  (sequence: 1,2,3,4)
```

### Pattern: Hash Set + Smart Start Detection

### Key Insight
Only start counting from the beginning of a sequence (i.e., where `num-1` is NOT in the set). This ensures each sequence is counted exactly once.

### Complete Solution
```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;

        for (int num : numSet) {
            if (numSet.find(num - 1) == numSet.end()) {  // Start of sequence
                int currentNum = num;
                int streak = 1;

                while (numSet.find(currentNum + 1) != numSet.end()) {
                    currentNum++;
                    streak++;
                }

                longest = max(longest, streak);
            }
        }

        return longest;
    }
};
```

### Complexity: Time O(n), Space O(n)

---

## Problem 6: 4Sum ⭐ NEW

**Source**: https://leetcode.com/problems/4sum/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Amazon, Adobe  
**Frequency**: 📅 High

### Problem Statement
Given an integer array and target, return all unique quadruplets that sum to target.

### Examples
```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

### Pattern: Sorting + Two Nested Loops + Two Pointer

### Key Insight
Extend 3Sum by adding another outer loop. Fix two elements (i, j) and use two pointer for the remaining two.

### Complete Solution
```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> result;
        int n = nums.size();
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;  // Skip dup i

            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j-1]) continue;  // Skip dup j

                int left = j + 1, right = n - 1;

                while (left < right) {
                    long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];

                    if (sum == target) {
                        result.push_back({nums[i], nums[j], nums[left], nums[right]});
                        while (left < right && nums[left]  == nums[left+1])  left++;
                        while (left < right && nums[right] == nums[right-1]) right--;
                        left++; right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }

        return result;
    }
};
```

### Why long long?
`nums[i]` can be up to 10^9, four of them sum to 4×10^9 which overflows `int`. Cast to `long long` before adding.

### Edge Cases
- ✅ Fewer than 4 elements → empty
- ✅ All same elements [0,0,0,0], target=0 → [[0,0,0,0]]
- ✅ Overflow prevention with long long

### Complexity: Time O(n³), Space O(1) excluding output

---

## Problem 7: Trapping Rain Water II (3D) ⭐ NEW

**Source**: https://leetcode.com/problems/trapping-rain-water-ii/  
**Difficulty**: 🔴 Hard  
**Company Tags**: 🏢 Google  
**Frequency**: 📅 Medium

### Problem Statement
Given a 2D elevation map (matrix), calculate total water that can be trapped.

### Examples
```
Input: [[1,4,3],[3,2,4],[2,3,1]]
Output: 4
```

### Pattern: Min-Heap (BFS from borders inward)

### Key Insight (Extension of 1D)
In 2D, water at a cell is determined by the minimum border height reachable from outside. Use a min-heap to always process the lowest border cell first — this gives us the minimum "barrier" for inner cells.

### Complete Solution
```cpp
class Solution {
public:
    int trapRainWater(vector<vector<int>>& heightMap) {
        int m = heightMap.size(), n = heightMap[0].size();
        if (m < 3 || n < 3) return 0;

        // Min-heap: {height, row, col}
        priority_queue<tuple<int,int,int>,
                       vector<tuple<int,int,int>>,
                       greater<>> minHeap;
        vector<vector<bool>> visited(m, vector<bool>(n, false));

        // Add all border cells
        for (int i = 0; i < m; i++) {
            for (int j : {0, n-1}) {
                minHeap.push({heightMap[i][j], i, j});
                visited[i][j] = true;
            }
        }
        for (int j = 1; j < n-1; j++) {
            for (int i : {0, m-1}) {
                minHeap.push({heightMap[i][j], i, j});
                visited[i][j] = true;
            }
        }

        int water = 0;
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

        while (!minHeap.empty()) {
            auto [h, r, c] = minHeap.top(); minHeap.pop();

            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc])
                    continue;

                visited[nr][nc] = true;
                water += max(0, h - heightMap[nr][nc]);
                minHeap.push({max(h, heightMap[nr][nc]), nr, nc});
            }
        }

        return water;
    }
};
```

### Complexity: Time O(m×n×log(m×n)), Space O(m×n)

---

## 🎯 Key Takeaways from Hard Problems

1. **Sliding Window + Hash Map** → Minimum Window Substring — track frequencies, formed/required counts
2. **Monotonic Deque** → Sliding Window Maximum — O(n) by discarding elements that can never be max
3. **Binary Search on Partition** → Median of Sorted Arrays — avoid merging entirely
4. **Prefix Sum + Divide & Conquer** → Count of Range Sum — merge sort while counting valid pairs
5. **Hash Set + Smart Start** → Consecutive Sequence — only start from sequence beginnings
6. **Nested Loops + Two Pointer** → 4Sum — generalizes 3Sum, watch for overflow
7. **Min Heap BFS** → 3D Trapping Rain Water — border-inward approach

---

## 💡 General Tips for Hard Problems

1. **Identify the core bottleneck** — What makes brute force O(n³) or O(n²)? Can we eliminate one loop?
2. **Think about invariants** — What stays true at each iteration?
3. **Consider helper data structures** — Hash map, deque, heap often complement two pointer
4. **Break into subproblems** — 4Sum = 3Sum = 2Sum. Hard problems often chain simpler patterns.
5. **Handle overflow** — Use `long long` when summing multiple large values
6. **Start with the O(n²) solution first** — Interviewers often accept it, then ask for optimization

---

## 🏆 Interview-Ready Summary

| Problem | Key Insight | Pattern |
|---------|-------------|---------|
| Min Window Substring | formed/required tracking | Sliding Window + Map |
| Sliding Window Max | Monotonic deque discards useless elements | Monotonic Deque |
| Median 2 Sorted Arrays | Binary search on partition position | Binary Search |
| Count Range Sum | Prefix sum → count pairs in merge sort | Merge Sort |
| Longest Consecutive | Only start counting from sequence start | Hash Set |
| 4Sum | Fix 2 elements, two pointer for rest | Sort + 2 Loops + 2P |
| Rain Water II (3D) | Min heap processes border-inward | BFS + Heap |

---

**Congratulations! You've mastered Two Pointer problems!**

[← Back to Medium](Medium.md) | [← Back to Notes](Notes.md)
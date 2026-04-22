# 🔮 ARRAYS — Part 6: Future Questions & Complete Quick Reference

---

## SECTION 1: Future Prediction Questions (With Full Solutions)

These are problems that are currently trending in interviews and will likely increase in frequency.

---

### FQ1. Maximum Points You Can Obtain from Cards
🏢 **Amazon, Google (HIGH FREQUENCY 2024-25)**  
🔗 https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/ | LC #1423  
**Pattern**: Two-End Sliding Window (Reverse of normal sliding window!)

**Problem**: Array of cardPoints. You can take exactly k cards from front OR back. Maximize total score.

```
Input:  cardPoints=[1,2,3,4,5,6,1], k=3
Output: 12   (Take 1,6,5 from the ends: indices 6,5,4)
```

**Key Insight**: Taking k cards from ends = leaving a contiguous window of (n-k) cards in MIDDLE. Minimize the middle window to maximize the score!

```cpp
int maxScore(vector<int>& cardPoints, int k) {
    int n = cardPoints.size();
    int totalSum = 0;
    for(int x : cardPoints) totalSum += x;
    
    int windowSize = n - k;  // Middle (non-selected) window size
    if(windowSize == 0) return totalSum;
    
    // Build first window of size (n-k)
    int windowSum = 0;
    for(int i = 0; i < windowSize; i++) windowSum += cardPoints[i];
    int minWindow = windowSum;
    
    // Slide the window
    for(int i = windowSize; i < n; i++) {
        windowSum += cardPoints[i] - cardPoints[i - windowSize];
        minWindow = min(minWindow, windowSum);
    }
    
    return totalSum - minWindow;
}
```

**Dry Run** on [1,2,3,4,5,6,1], k=3, windowSize=4:
```
First window [1,2,3,4]: sum=10, minWindow=10
Slide:
[2,3,4,5]: sum=14, minWindow=10
[3,4,5,6]: sum=18, minWindow=10
[4,5,6,1]: sum=16, minWindow=10

Answer: totalSum(22) - minWindow(10) = 12 ✓
```

---

### FQ2. Minimum Difference Between Largest and Smallest Value in Three Moves
🏢 **Amazon, Google**  
🔗 https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/ | LC #1509

**Problem**: Remove exactly 3 elements (can pick any). Return minimum difference between max and min of remaining.

**Key Insight**: After 3 removals from array of size n ≥ 4, you keep n-3 elements. You're removing some prefix and some suffix. Sort, then check all ways to remove 3 elements split between front and back.

```cpp
int minDifference(vector<int>& nums) {
    int n = nums.size();
    if(n <= 4) return 0;  // Can remove all but 1, diff = 0
    
    sort(nums.begin(), nums.end());
    
    int minDiff = INT_MAX;
    // Remove (0 from front, 3 from back), (1,2), (2,1), (3,0)
    for(int left = 0; left <= 3; left++) {
        int right = 3 - left;
        // Remaining: [left, n-1-right]
        minDiff = min(minDiff, nums[n-1-right] - nums[left]);
    }
    
    return minDiff;
}
```

---

### FQ3. Longest Turbulent Subarray
🏢 **Amazon**  
🔗 https://leetcode.com/problems/longest-turbulent-subarray/ | LC #978

**Problem**: Turbulent = alternating >(greater) <(less). Find longest turbulent subarray.

```
Input:  [9,4,2,10,7,8,8,1,9]
Output: 5   (subarray [4,2,10,7,8])
```

```cpp
int maxTurbulenceSize(vector<int>& arr) {
    int n = arr.size();
    if(n < 2) return n;
    
    int maxLen = 1, cur = 1;
    
    for(int i = 1; i < n; i++) {
        if(i == 1) {
            cur = (arr[i] != arr[i-1]) ? 2 : 1;
        } else {
            // Check if sign alternates
            if((arr[i-1] > arr[i]) != (arr[i-2] > arr[i-1]) && arr[i] != arr[i-1] && arr[i-1] != arr[i-2]) {
                cur++;
            } else {
                cur = (arr[i] != arr[i-1]) ? 2 : 1;
            }
        }
        maxLen = max(maxLen, cur);
    }
    
    return maxLen;
}
```

---

### FQ4. Subarray Product Less Than K
🏢 **Amazon, Google**  
🔗 https://leetcode.com/problems/subarray-product-less-than-k/ | LC #713

**Problem**: Count number of contiguous subarrays where product < k. All elements positive.

**Key Insight**: Sliding window with product! When product ≥ k, shrink left. For each valid window [left, right], it contributes (right - left + 1) new subarrays.

```cpp
int numSubarrayProductLessThanK(vector<int>& nums, int k) {
    if(k <= 1) return 0;  // Product always >= 1
    
    int left = 0, product = 1, count = 0;
    
    for(int right = 0; right < nums.size(); right++) {
        product *= nums[right];
        
        while(product >= k) {
            product /= nums[left++];
        }
        
        // Window [left, right] is valid
        // Number of NEW subarrays ending at 'right': (right - left + 1)
        count += right - left + 1;
    }
    
    return count;
}
```

**Why `right - left + 1` new subarrays?** Window is [left..right]. Valid subarrays ending at right: [right], [right-1,right], ..., [left..right] = (right-left+1) subarrays.

---

### FQ5. Minimum Size Subarray Sum
🏢 **Amazon, Codeforces**  
🔗 https://leetcode.com/problems/minimum-size-subarray-sum/ | LC #209

**Problem**: Minimum length of subarray with sum ≥ target. All positive numbers.

```cpp
int minSubArrayLen(int target, vector<int>& nums) {
    int left = 0, sum = 0, minLen = INT_MAX;
    
    for(int right = 0; right < nums.size(); right++) {
        sum += nums[right];
        
        while(sum >= target) {
            minLen = min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    
    return (minLen == INT_MAX) ? 0 : minLen;
}
```

---

### FQ6. Count of Smaller Numbers After Self
🏢 **Google, Amazon**  
🔗 https://leetcode.com/problems/count-of-smaller-numbers-after-self/ | LC #315

**Problem**: For each element, count elements to its right that are smaller.

```
Input:  [5, 2, 6, 1]
Output: [2, 1, 1, 0]
```

```cpp
// Using modified merge sort — O(n log n)
vector<int> result;
vector<pair<int,int>> arr;  // {value, original_index}

void mergeSort(int left, int right) {
    if(left >= right) return;
    int mid = left + (right-left)/2;
    mergeSort(left, mid);
    mergeSort(mid+1, right);
    
    vector<pair<int,int>> temp;
    int i = left, j = mid+1;
    
    while(i <= mid && j <= right) {
        if(arr[i].first <= arr[j].first) {
            result[arr[i].second] += (j - (mid+1));  // j-(mid+1) elements from right already placed
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }
    while(i <= mid) {
        result[arr[i].second] += (j - (mid+1));
        temp.push_back(arr[i++]);
    }
    while(j <= right) temp.push_back(arr[j++]);
    
    for(int k = left; k <= right; k++) arr[k] = temp[k-left];
}

vector<int> countSmaller(vector<int>& nums) {
    int n = nums.size();
    result.assign(n, 0);
    arr.resize(n);
    for(int i = 0; i < n; i++) arr[i] = {nums[i], i};
    mergeSort(0, n-1);
    return result;
}
```

---

### FQ7. Minimum Operations to Reduce X to Zero
🏢 **Google, Amazon**  
🔗 https://leetcode.com/problems/minimum-number-of-operations-to-reduce-x-to-zero/ | LC #1658

**Key Insight**: Removing elements from front+back summing to x = keeping a middle subarray summing to (total - x). Find MAXIMUM length middle subarray with sum = total - x!

```cpp
int minOperations(vector<int>& nums, int x) {
    int total = 0;
    for(int n : nums) total += n;
    
    int target = total - x;
    if(target < 0) return -1;
    if(target == 0) return nums.size();
    
    // Find max length subarray with sum = target
    unordered_map<int,int> prefixIdx;
    prefixIdx[0] = -1;  // Empty prefix at index -1
    int sum = 0, maxLen = -1;
    
    for(int i = 0; i < nums.size(); i++) {
        sum += nums[i];
        if(prefixIdx.count(sum - target)) {
            maxLen = max(maxLen, i - prefixIdx[sum - target]);
        }
        if(!prefixIdx.count(sum)) prefixIdx[sum] = i;
    }
    
    return (maxLen == -1) ? -1 : (int)nums.size() - maxLen;
}
```

---

### FQ8. Beautiful Array (Partition into Two Equal Halves)
🏢 **Microsoft, Amazon**

**Problem**: Check if array can be partitioned into two parts with equal sum. (LC #416 — Partition Equal Subset Sum)

```cpp
// DP approach
bool canPartition(vector<int>& nums) {
    int total = 0;
    for(int x : nums) total += x;
    
    if(total % 2 != 0) return false;  // Odd total can't be halved
    
    int target = total / 2;
    vector<bool> dp(target+1, false);
    dp[0] = true;  // Sum 0 always achievable (empty subset)
    
    for(int num : nums) {
        // Traverse backwards to avoid using same element twice
        for(int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j-num];
        }
    }
    
    return dp[target];
}
```

---

### FQ9. Maximum Width Ramp
🏢 **Google**  
🔗 https://leetcode.com/problems/maximum-width-ramp/ | LC #962

**Problem**: Find maximum (j-i) where i<j and nums[i]<=nums[j].

```cpp
int maxWidthRamp(vector<int>& nums) {
    int n = nums.size();
    
    // Build decreasing stack from left (candidates for minimum i)
    stack<int> st;
    for(int i = 0; i < n; i++) {
        if(st.empty() || nums[st.top()] > nums[i]) {
            st.push(i);
        }
    }
    
    int maxWidth = 0;
    // Scan from right, find valid pairs
    for(int j = n-1; j >= 0; j--) {
        while(!st.empty() && nums[st.top()] <= nums[j]) {
            maxWidth = max(maxWidth, j - st.top());
            st.pop();
        }
    }
    
    return maxWidth;
}
```

---

### FQ10. Array Nesting
🏢 **Microsoft**  
🔗 https://leetcode.com/problems/array-nesting/ | LC #565

**Problem**: nums is a permutation of [0..n-1]. Find longest cycle in the "following index" chain.

```
nums = [5,4,0,3,1,6,2]: start at 0 → nums[0]=5 → nums[5]=6 → nums[6]=2 → nums[2]=0 → cycle length 4
```

```cpp
int arrayNesting(vector<int>& nums) {
    int n = nums.size();
    vector<bool> visited(n, false);
    int maxLen = 0;
    
    for(int i = 0; i < n; i++) {
        if(!visited[i]) {
            int len = 0, j = i;
            while(!visited[j]) {
                visited[j] = true;
                j = nums[j];
                len++;
            }
            maxLen = max(maxLen, len);
        }
    }
    
    return maxLen;
}
```

---

## SECTION 2: Interview Preparation Checklist

### ✅ Before Your Interview — Verify You Can Do These in 10 Minutes Each:

**Tier 1 (Must know perfectly):**
- [ ] Two Sum — HashMap O(n)
- [ ] Maximum Subarray — Kadane's
- [ ] Best Time to Buy/Sell Stock — Single pass
- [ ] Move Zeroes — Two pointers
- [ ] Contains Duplicate — HashSet
- [ ] Reverse Array — Two pointers

**Tier 2 (Should be comfortable):**
- [ ] 3Sum — Sort + Two Pointers
- [ ] Container With Most Water — Two Pointers
- [ ] Product Except Self — Prefix × Suffix
- [ ] Subarray Sum = K — Prefix + HashMap
- [ ] Merge Intervals — Sort + Greedy
- [ ] Sort Colors (DNF) — Three Pointers
- [ ] Rotate Array — Reversal trick
- [ ] Jump Game — Greedy

**Tier 3 (Good to know for senior roles):**
- [ ] Trapping Rain Water — Two Pointers O(1) space
- [ ] Sliding Window Maximum — Monotonic Deque
- [ ] First Missing Positive — Cyclic Sort
- [ ] Find Duplicate (Floyd's) — Cycle detection
- [ ] Count Inversions — Merge Sort

---

## SECTION 3: The Complete Quick Reference Card

```
╔══════════════════════════════════════════════════════════════════╗
║              ARRAYS — MASTER QUICK REFERENCE                     ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  MEMORY FORMULA:                                                 ║
║    arr[i] address = Base + i × sizeof(type)  → O(1) access      ║
║                                                                  ║
║  VECTOR ESSENTIALS:                                              ║
║    push_back O(1)amort | pop_back O(1) | size O(1)              ║
║    insert/erase O(n) | sort O(n log n) | binary_search O(log n) ║
║                                                                  ║
║  ─────────────── PATTERNS ───────────────────────────────────   ║
║                                                                  ║
║  PREFIX SUM:                                                     ║
║    Build: pre[i+1] = pre[i] + arr[i]                            ║
║    Query: sum(L,R) = pre[R+1] - pre[L]                          ║
║    Use for: range queries, subarray sum=k (negative OK)         ║
║                                                                  ║
║  DIFFERENCE ARRAY:                                               ║
║    Update[L,R] by v: diff[L]+=v; diff[R+1]-=v                  ║
║    Reconstruct: prefix sum of diff                               ║
║                                                                  ║
║  FIXED SLIDING WINDOW (size k):                                  ║
║    Init first k. Then: sum += arr[i] - arr[i-k]                 ║
║                                                                  ║
║  VARIABLE SLIDING WINDOW:                                        ║
║    Expand right always. Shrink left based on condition.          ║
║    ⚠️ Only for POSITIVE values!                                  ║
║                                                                  ║
║  TWO POINTERS (sorted):                                          ║
║    sum < target → L++  |  sum > target → R--                    ║
║                                                                  ║
║  KADANE'S:                                                       ║
║    cur = max(arr[i], cur+arr[i])                                 ║
║    global = max(global, cur)                                     ║
║    Init: cur=global=arr[0]  (NOT 0!)                            ║
║                                                                  ║
║  BINARY SEARCH:                                                  ║
║    mid = lo + (hi-lo)/2  (never lo+hi, overflow!)               ║
║    First: save + go LEFT. Last: save + go RIGHT.                ║
║                                                                  ║
║  DUTCH NATIONAL FLAG:                                            ║
║    0: swap(low,mid), low++, mid++                                ║
║    1: mid++                                                      ║
║    2: swap(mid,high), high--  ← NO mid++!                       ║
║                                                                  ║
║  CYCLIC SORT:                                                    ║
║    correct = arr[i]-1;                                           ║
║    if(arr[i] != arr[correct]) swap; else i++                    ║
║                                                                  ║
║  XOR:                                                            ║
║    a^a=0, 0^a=a → XOR all to find single non-dup               ║
║                                                                  ║
║  ─────────────── COMPLEXITY ─────────────────────────────────   ║
║                                                                  ║
║    Access:   O(1)    │  Insert front: O(n)                       ║
║    Search:   O(n)    │  Insert back:  O(1)                       ║
║    Binary S: O(logn) │  Sort: O(n log n)                         ║
║    Prefix Q: O(1)    │  Prefix Build: O(n)                       ║
║                                                                  ║
║  ─────────────── OVERFLOW GUARDS ────────────────────────────   ║
║                                                                  ║
║    Use long long when: n×maxVal > 2e9                           ║
║    Cast: (int)v.size() before arithmetic                         ║
║    Check empty before v[0] or v.front()                          ║
║    Always: k = k % n before rotation                            ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## SECTION 4: Common Interview Mistakes That Cost Jobs

### 1. Not Asking Clarifying Questions
**What costs points**: Coding silently → wrong solution  
**What impresses**: "Before I start — is the array sorted? Can values be negative? Do you need O(1) space?"

### 2. Starting With Optimal (No Discussion)
**What costs points**: Jumping to Kadane's without explaining why brute force is O(n²)  
**What impresses**: "Brute force: check every pair → O(n²). But we can optimize with ..."

### 3. Forgetting Edge Cases
**The checklist every single time**:
```
□ Empty array: if(nums.empty()) return ...
□ Single element: check minimum size requirements
□ All same: does algorithm handle this?
□ All negative: Kadane's initialized correctly?
□ k > n in rotation: k = k % n
□ Integer overflow: use long long for sums
□ Target = 0 or negative: special handling?
```

### 4. Not Testing Your Code
**What costs points**: Submitting without dry run  
**What impresses**: "Let me trace through [2,7,11,15], target=9 on my code..."

### 5. Not Knowing Amortized Analysis
**Common question**: "Isn't push_back O(n) sometimes?"  
**Good answer**: "Occasionally O(n) when capacity doubles, but O(1) amortized because doublings happen logarithmically rarely."

---

## SECTION 5: Complete Problem Order for Study

Study in this EXACT order for maximum retention:

```
WEEK 1: Basics (30 min/day)
Day 1-2: Two Sum, Contains Duplicate, Maximum Subarray
Day 3-4: Best Time to Buy/Sell Stock, Move Zeroes, Single Number  
Day 5-7: Remove Duplicates, Plus One, Merge Sorted Array

WEEK 2: Patterns (45 min/day)
Day 8-9: Product Except Self, Subarray Sum=K, Find Pivot Index
Day 10-11: 3Sum, Container With Most Water
Day 12-13: Sort Colors (DNF), Jump Game
Day 14: Review + Practice

WEEK 3: Medium-Hard (60 min/day)
Day 15-16: Merge Intervals, Rotate Array, Spiral Matrix
Day 17-18: Set Matrix Zeroes, Search Rotated Array
Day 19-20: Max Product Subarray, Find Min in Rotated
Day 21: Review

WEEK 4: Hard (60 min/day)
Day 22-23: Trapping Rain Water, Sliding Window Maximum
Day 24-25: First Missing Positive, Find Duplicate
Day 26-27: Median of Two Sorted Arrays, Longest Consecutive
Day 28: Mock interview with all patterns
```

---

## SECTION 6: Last-Minute Interview Cheatsheet (Read 30 min before interview)

```
1. ALWAYS clarify: sorted? negatives? in-place required? size constraints?

2. ALWAYS show brute force first, THEN optimize.

3. PATTERN MATCHER (30 seconds):
   contiguous + size k → Fixed sliding window
   contiguous + condition → Variable sliding window  
   sorted + pair sum → Two pointers
   range queries → Prefix sum
   range updates → Difference array
   max sum subarray → Kadane's
   0/1/2 sort → Dutch flag
   [1..n] range values → Cyclic sort
   
4. OVERFLOW: always use long long for sums, products
   Always k = k % n for rotations
   Always check empty before array access

5. COMPLEXITY TO PASS:
   n ≤ 10^4: O(n²) ok
   n ≤ 10^5: Need O(n log n)
   n ≤ 10^6: Need O(n)

6. TEST CASES to always mention:
   Empty array, Single element, All same values, All negative

7. TALK while coding. Say WHY, not just what.

8. After coding: "Let me trace through this example..."
   Then trace. NEVER say "I think it works."
```

---

*🎉 You now have the most complete array study system possible.*  
*Files: 01_foundations → 02_patterns → 03_shortcuts → 04_company_questions → 05_mcq_bank → 06_future_questions*
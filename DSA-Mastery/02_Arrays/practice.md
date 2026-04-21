# Arrays - Practice Problems

## 📚 Quick Navigation

- **Learn Concepts**: [notes.md](notes.md)
- **Practice Problems**: [practice.md](practice.md) ← You are here
- **Check Solutions**: [solutions.md](solutions.md)
- **Test Yourself**: [mcqs.md](mcqs.md)
- **Quick Revision**: [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md)
- **If Stuck**: [If_You_Get_Stuck.md](If_You_Get_Stuck.md)
- **Interview Traps**: [Common_Interview_Traps.md](Common_Interview_Traps.md)

## How to Use This File

1. **Start with Level 1** - Don't skip levels!
2. **Try for 20-30 minutes** before checking hints
3. **Write code yourself** - Don't copy-paste
4. **Test with multiple inputs** - Including edge cases
5. **Check solutions** in `solutions.md` after solving

---

## LEVEL 1: Basics (Building Confidence)

### Problem 1.1: Find Maximum Element

**Difficulty**: ⭐ Very Easy

**Problem**: 
Find the maximum element in an array of n integers.

**Input Format**:
```
First line: n (size of array)
Second line: n space-separated integers
```

**Output Format**:
```
Maximum: [result]
```

**Example**:
```
Input:
5
12 45 23 67 34

Output:
Maximum: 67
```

**Tags**: `Arrays` `Traversal` `Basic`

**Hints**:
- Hint 1: Assume first element is maximum
- Hint 2: Compare with each element
- Hint 3: Update if you find larger

---

### Problem 1.2: Array Sum

**Difficulty**: ⭐ Very Easy

**Problem**: 
Calculate the sum of all elements in an array.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Sum: [result]
```

**Example**:
```
Input:
5
1 2 3 4 5

Output:
Sum: 15
```

**Tags**: `Arrays` `Traversal` `Accumulator`

**Hints**:
- Hint 1: Initialize sum = 0
- Hint 2: Add each element to sum
- Hint 3: Use long long to prevent overflow

---

### Problem 1.3: Reverse Array

**Difficulty**: ⭐ Easy

**Problem**: 
Reverse an array in-place (without using extra array).

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Reversed array elements, space-separated
```

**Example**:
```
Input:
5
1 2 3 4 5

Output:
5 4 3 2 1
```

**Tags**: `Arrays` `Two Pointers` `In-place`

**Hints**:
- Hint 1: Use two pointers (left and right)
- Hint 2: Swap elements at left and right
- Hint 3: Move pointers towards center

---

### Problem 1.4: Count Occurrences

**Difficulty**: ⭐ Easy

**Problem**: 
Count how many times a given element appears in an array.

**Input Format**:
```
First line: n
Second line: n space-separated integers
Third line: element to search
```

**Output Format**:
```
Count: [result]
```

**Example**:
```
Input:
7
1 2 2 3 2 4 2
2

Output:
Count: 4
```

**Tags**: `Arrays` `Counting` `Linear Search`

**Hints**:
- Hint 1: Initialize counter = 0
- Hint 2: Traverse array
- Hint 3: Increment when element matches

---

### Problem 1.5: Find Second Maximum

**Difficulty**: ⭐ Easy

**Problem**: 
Find the second largest element in an array.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Second Maximum: [result]
```

**Example**:
```
Input:
5
12 35 1 10 34

Output:
Second Maximum: 34
```

**Tags**: `Arrays` `Comparison` `Variables`

**Hints**:
- Hint 1: Maintain two variables: max and secondMax
- Hint 2: Update both when you find new maximum
- Hint 3: Handle case when all elements are same

---

## LEVEL 2: Application (Building Skills)

### Problem 2.1: Two Sum (Sorted Array)

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Given a sorted array, find if there exists a pair with given sum.

**Input Format**:
```
First line: n
Second line: n space-separated integers (sorted)
Third line: target sum
```

**Output Format**:
```
Pair found: (a, b) OR No pair found
```

**Example**:
```
Input:
5
1 3 5 7 9
12

Output:
Pair found: (5, 7)
```

**Tags**: `Arrays` `Two Pointers` `Sorted`

**Hints**:
- Hint 1: Use two pointers (left=0, right=n-1)
- Hint 2: If sum < target, move left pointer right
- Hint 3: If sum > target, move right pointer left

---

### Problem 2.2: Move Zeros to End

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Move all zeros to the end of array while maintaining relative order of non-zero elements. Do this in-place.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Modified array, space-separated
```

**Example**:
```
Input:
5
0 1 0 3 12

Output:
1 3 12 0 0
```

**Tags**: `Arrays` `Two Pointers` `In-place`

**Hints**:
- Hint 1: Count non-zero elements
- Hint 2: Place non-zeros at beginning
- Hint 3: Fill remaining with zeros

---

### Problem 2.3: Rotate Array by K

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Rotate an array to the right by k steps.

**Input Format**:
```
First line: n
Second line: n space-separated integers
Third line: k
```

**Output Format**:
```
Rotated array, space-separated
```

**Example**:
```
Input:
7
1 2 3 4 5 6 7
3

Output:
5 6 7 1 2 3 4
```

**Tags**: `Arrays` `Rotation` `Reverse Technique`

**Hints**:
- Hint 1: Use reverse technique
- Hint 2: Reverse entire array
- Hint 3: Reverse first k, then reverse rest
- Hint 4: Handle k > n (use k = k % n)

---

### Problem 2.4: Remove Duplicates (Sorted)

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Remove duplicates from sorted array in-place and return new length.

**Input Format**:
```
First line: n
Second line: n space-separated integers (sorted)
```

**Output Format**:
```
New length: [length]
First [length] elements (unique)
```

**Example**:
```
Input:
8
1 1 2 2 3 4 4 5

Output:
New length: 5
1 2 3 4 5
```

**Tags**: `Arrays` `Two Pointers` `Duplicates`

**Hints**:
- Hint 1: Use slow and fast pointers
- Hint 2: Slow points to last unique element
- Hint 3: When fast finds new element, increment slow

---

### Problem 2.5: Maximum Subarray Sum (Kadane's)

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Find the contiguous subarray with maximum sum.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Maximum sum: [result]
```

**Example**:
```
Input:
9
-2 1 -3 4 -1 2 1 -5 4

Output:
Maximum sum: 6

Explanation: Subarray [4, -1, 2, 1] has maximum sum = 6
```

**Tags**: `Arrays` `Kadane's Algorithm` `Dynamic Programming`

**Hints**:
- Hint 1: Maintain current_sum and max_sum
- Hint 2: If current_sum becomes negative, reset to 0
- Hint 3: Update max_sum at each step

---

## LEVEL 3: Thinking (Building Logic)

### Problem 3.1: Container With Most Water

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Given n vertical lines where line i goes from (i, 0) to (i, height[i]), find two lines that form a container with maximum water.

**Input Format**:
```
First line: n
Second line: n space-separated integers (heights)
```

**Output Format**:
```
Maximum water: [result]
```

**Example**:
```
Input:
9
1 8 6 2 5 4 8 3 7

Output:
Maximum water: 49

Explanation: Lines at index 1 (height 8) and 8 (height 7)
Area = min(8, 7) × (8 - 1) = 7 × 7 = 49
```

**Tags**: `Arrays` `Two Pointers` `Greedy`

**Hints**:
- Hint 1: Use two pointers from both ends
- Hint 2: Area = min(height[left], height[right]) × (right - left)
- Hint 3: Move pointer with smaller height

---

### Problem 3.2: 3Sum

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Find all unique triplets in array that sum to zero.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Number of triplets: [count]
Each triplet on new line
```

**Example**:
```
Input:
6
-1 0 1 2 -1 -4

Output:
Number of triplets: 2
(-1, -1, 2)
(-1, 0, 1)
```

**Tags**: `Arrays` `Two Pointers` `Sorting` `Triplets`

**Hints**:
- Hint 1: Sort array first
- Hint 2: Fix first element, use two pointers for rest
- Hint 3: Skip duplicates to avoid repeating triplets

---

### Problem 3.3: Sliding Window Maximum

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Find maximum element in each sliding window of size k.

**Input Format**:
```
First line: n
Second line: n space-separated integers
Third line: k
```

**Output Format**:
```
Maximum of each window, space-separated
```

**Example**:
```
Input:
8
1 3 -1 -3 5 3 6 7
3

Output:
3 3 5 5 6 7

Explanation:
Window [1 3 -1] → max = 3
Window [3 -1 -3] → max = 3
Window [-1 -3 5] → max = 5
Window [-3 5 3] → max = 5
Window [5 3 6] → max = 6
Window [3 6 7] → max = 7
```

**Tags**: `Arrays` `Sliding Window` `Deque`

**Hints**:
- Hint 1: Use deque to store indices
- Hint 2: Remove elements outside window from front
- Hint 3: Remove smaller elements from back
- Hint 4: Front of deque always has maximum

---

### Problem 3.4: Subarray Sum Equals K

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Count the number of contiguous subarrays that sum to k.

**Input Format**:
```
First line: n
Second line: n space-separated integers
Third line: k
```

**Output Format**:
```
Count: [result]
```

**Example**:
```
Input:
5
1 1 1 1 1
3

Output:
Count: 3

Explanation: Subarrays [1,1,1] at indices 0-2, 1-3, 2-4
```

**Tags**: `Arrays` `Prefix Sum` `Hash Map`

**Hints**:
- Hint 1: Use prefix sum
- Hint 2: Store frequency of each prefix sum in hash map
- Hint 3: If (current_sum - k) exists, add its frequency to count
- Hint 4: Initialize mp[0] = 1

---

### Problem 3.5: Product of Array Except Self

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Given an array, return an array where each element is product of all other elements. Solve without division and in O(n).

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Product array, space-separated
```

**Example**:
```
Input:
4
1 2 3 4

Output:
24 12 8 6

Explanation:
result[0] = 2×3×4 = 24
result[1] = 1×3×4 = 12
result[2] = 1×2×4 = 8
result[3] = 1×2×3 = 6
```

**Tags**: `Arrays` `Prefix Product` `Suffix Product`

**Hints**:
- Hint 1: Create left product array
- Hint 2: Create right product array
- Hint 3: result[i] = left[i] × right[i]
- Hint 4: Can optimize to O(1) extra space

---

## LEVEL 4: Challenge (Advanced Thinking)

### Problem 4.1: Trapping Rain Water

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given elevation map (array of heights), compute how much water it can trap after raining.

**Input Format**:
```
First line: n
Second line: n space-separated integers (heights)
```

**Output Format**:
```
Water trapped: [result]
```

**Example**:
```
Input:
12
0 1 0 2 1 0 1 3 2 1 2 1

Output:
Water trapped: 6

Explanation: Water trapped at each position:
[0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0] = 6 units
```

**Tags**: `Arrays` `Two Pointers` `Dynamic Programming` `Hard`

**Hints**:
- Hint 1: Water at index i = min(max_left, max_right) - height[i]
- Hint 2: Precompute max_left and max_right arrays
- Hint 3: Can optimize to two pointers approach
- Hint 4: Move pointer with smaller max

---

### Problem 4.2: Minimum Window Substring

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given string s and t, find minimum window in s that contains all characters of t.

**Input Format**:
```
String s
String t
```

**Output Format**:
```
Minimum window substring
```

**Example**:
```
Input:
ADOBECODEBANC
ABC

Output:
BANC
```

**Tags**: `Arrays` `Sliding Window` `Hash Map` `String`

**Hints**:
- Hint 1: Use sliding window with two pointers
- Hint 2: Maintain frequency map of t
- Hint 3: Expand until all chars found
- Hint 4: Shrink to find minimum window

---

### Problem 4.3: Merge Intervals

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given collection of intervals, merge all overlapping intervals.

**Input Format**:
```
First line: n (number of intervals)
Next n lines: start end (each interval)
```

**Output Format**:
```
Merged intervals
```

**Example**:
```
Input:
4
1 3
2 6
8 10
15 18

Output:
1 6
8 10
15 18

Explanation: Intervals [1,3] and [2,6] overlap, merge to [1,6]
```

**Tags**: `Arrays` `Sorting` `Greedy` `Intervals`

**Hints**:
- Hint 1: Sort intervals by start time
- Hint 2: Compare current interval with previous
- Hint 3: If overlap, merge (update end)
- Hint 4: If no overlap, add to result

---

### Problem 4.4: Median of Two Sorted Arrays

**Difficulty**: ⭐⭐⭐⭐⭐ Very Hard

**Problem**: 
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. Overall run time complexity should be O(log (m+n)).

**Input Format**:
```
First line: m (size of nums1)
Second line: m space-separated integers (nums1)
Third line: n (size of nums2)
Fourth line: n space-separated integers (nums2)
```

**Output Format**:
```
Median: [result]
```

**Example**:
```
Input:
2
1 3
2
2

Output:
Median: 2.00000

Explanation: Merged array = [1, 2, 2, 3], median = (2+2)/2 = 2

Input:
2
1 2
2
3 4

Output:
Median: 2.50000

Explanation: Merged array = [1, 2, 3, 4], median = (2+3)/2 = 2.5
```

**Tags**: `Arrays` `Binary Search` `Divide & Conquer` `Hard`

**Hints**:
- Hint 1: Use binary search on smaller array
- Hint 2: Partition both arrays such that left half = right half
- Hint 3: Check if partition is valid (maxLeft <= minRight)
- Hint 4: Handle edge cases when partition at boundary

---

### Problem 4.5: First Missing Positive

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given an unsorted integer array, find the smallest missing positive integer. Solve in O(n) time and O(1) space.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
First missing positive: [result]
```

**Example**:
```
Input:
5
3 4 -1 1

Output:
First missing positive: 2

Input:
3
1 2 0

Output:
First missing positive: 3
```

**Tags**: `Arrays` `In-place` `Index Mapping` `Hard`

**Hints**:
- Hint 1: Ignore negative numbers and numbers > n
- Hint 2: Place each number at its correct position (value 1 at index 0)
- Hint 3: Use index as hash: mark presence by making arr[index] negative
- Hint 4: First positive value's index + 1 is the answer

---

### Problem 4.6: Largest Rectangle in Histogram

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given n non-negative integers representing histogram bar heights where each bar has width 1, find the area of largest rectangle.

**Input Format**:
```
First line: n
Second line: n space-separated integers (heights)
```

**Output Format**:
```
Largest rectangle area: [result]
```

**Example**:
```
Input:
6
2 1 5 6 2 3

Output:
Largest rectangle area: 10

Explanation: Largest rectangle is formed by bars with heights 5 and 6
Area = 2 × 5 = 10
```

**Tags**: `Arrays` `Stack` `Monotonic Stack` `Hard`

**Hints**:
- Hint 1: For each bar, find nearest smaller bar on left and right
- Hint 2: Width = right_smaller - left_smaller - 1
- Hint 3: Area = height[i] × width
- Hint 4: Use monotonic stack to find smaller elements efficiently

---

### Problem 4.7: Count of Smaller Numbers After Self

**Difficulty**: ⭐⭐⭐⭐⭐ Very Hard

**Problem**: 
Given an integer array nums, return a new array where each element is the count of smaller numbers to its right.

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Count array, space-separated
```

**Example**:
```
Input:
5
5 2 6 1

Output:
2 1 1 0

Explanation:
For 5: smaller elements to right are [2, 1] → count = 2
For 2: smaller elements to right are [1] → count = 1
For 6: smaller elements to right are [1] → count = 1
For 1: no smaller elements → count = 0
```

**Tags**: `Arrays` `Binary Search` `Merge Sort` `BIT` `Hard`

**Hints**:
- Hint 1: Process from right to left
- Hint 2: Use merge sort with inversion counting
- Hint 3: Or use Binary Indexed Tree (BIT) / Fenwick Tree
- Hint 4: Or use balanced BST (order statistic tree)

---

## LEVEL 5: Edge Cases & Real-World Problems

### Problem 5.1: Array with Constraints

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Find maximum in array, but handle edge cases:
- Empty array
- All negative numbers
- Array with one element
- Very large numbers (10⁹)

**Input Format**:
```
First line: n
Second line: n space-separated integers
```

**Output Format**:
```
Maximum: [result] OR Error message
```

**Tags**: `Edge Cases` `Validation` `Arrays`

**Hints**:
- Hint 1: Check if n == 0 first
- Hint 2: Initialize max with first element (not 0)
- Hint 3: Use long long for large numbers

---

### Problem 5.2: Stock Buy and Sell (Multiple Transactions)

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given stock prices for consecutive days, find maximum profit with unlimited transactions (buy and sell multiple times).

**Input Format**:
```
First line: n
Second line: n space-separated integers (prices)
```

**Output Format**:
```
Maximum profit: [result]
```

**Example**:
```
Input:
6
7 1 5 3 6 4

Output:
Maximum profit: 7

Explanation:
Buy at 1, sell at 5 → profit = 4
Buy at 3, sell at 6 → profit = 3
Total = 7
```

**Tags**: `Edge Cases` `Greedy` `Real-World` `Arrays`

**Hints**:
- Hint 1: Buy when price increases next day
- Hint 2: Sell when price decreases next day
- Hint 3: Sum all profitable transactions

---

## LEVEL 6: Mini Real-World Tasks

### Task 6.1: Temperature Analyzer

**Difficulty**: ⭐⭐⭐ Medium

**Scenario**: Analyze weekly temperature data for a weather app.

**Requirements**:
- Take 7 temperature readings (can be negative)
- Calculate: average, highest, lowest
- Find days above average
- Handle invalid inputs

**Input Format**:
```
7 space-separated temperatures (integers)
```

**Output Format**:
```
=== Temperature Report ===
Average: X°C
Highest: X°C
Lowest: X°C
Days above average: X
=========================
```

**Example**:
```
Input:
22 25 19 28 24 26 23

Output:
=== Temperature Report ===
Average: 23°C
Highest: 28°C
Lowest: 19°C
Days above average: 4
=========================
```

**Tags**: `Real-World` `Arrays` `Statistics`

**Hints**:
- Hint 1: Sum all temperatures for average
- Hint 2: Track max and min during traversal
- Hint 3: Second pass to count days above average

---

### Task 6.2: Inventory Manager

**Difficulty**: ⭐⭐⭐⭐ Hard

**Scenario**: Manage product inventory for e-commerce.

**Requirements**:
- Track stock levels for 10 products
- Operations: Add stock, Remove stock, Check stock, Alert low stock
- Alert when stock < threshold
- Prevent negative stock

**Input Format**:
```
Menu-driven system
```

**Output Format**:
```
=== Inventory System ===
1. Add stock
2. Remove stock
3. Check all stock
4. Low stock alerts
5. Exit
========================
```

**Tags**: `Real-World` `Arrays` `Menu-Driven` `Validation`

**Hints**:
- Hint 1: Use array for stock levels
- Hint 2: Validate before removing stock
- Hint 3: Loop through array for alerts

---

### Task 6.3: Grade Statistics Calculator

**Difficulty**: ⭐⭐⭐⭐ Hard

**Scenario**: Calculate comprehensive statistics for student grades.

**Requirements**:
- Take n student grades
- Calculate: mean, median, mode, range
- Find grades distribution (A, B, C, D, F)
- Handle edge cases (empty, invalid)

**Input Format**:
```
First line: n
Second line: n space-separated grades (0-100)
```

**Output Format**:
```
=== Grade Statistics ===
Mean: X
Median: X
Mode: X
Range: X
Grade Distribution:
A (90-100): X students
B (80-89): X students
...
========================
```

**Tags**: `Real-World` `Arrays` `Statistics` `Sorting`

**Hints**:
- Hint 1: Sort array for median
- Hint 2: Use frequency array for mode
- Hint 3: Count grades in ranges

---

## Practice Strategy

### Time Pressure Solving Guidelines

**Why Practice Under Time Pressure?**
- Interviews have strict time limits (30-45 mins per problem)
- Competitive programming has countdown timers
- Builds decision-making skills under stress

**Time Allocation Strategy**:

| Problem Level | Thinking Time | Coding Time | Testing Time | Total |
|---------------|---------------|-------------|--------------|-------|
| Level 1-2 | 5 mins | 10 mins | 5 mins | 20 mins |
| Level 3 | 10 mins | 20 mins | 10 mins | 40 mins |
| Level 4-5 | 15 mins | 30 mins | 15 mins | 60 mins |

**The 3-Phase Approach**:

**Phase 1: Understand & Plan (First 20% of time)**
1. Read problem 2 times carefully
2. Identify input/output format
3. Create 2-3 test cases (including edge cases)
4. Think of brute force solution
5. Write pseudocode on paper

**Phase 2: Implement (Next 50% of time)**
1. Start coding WITHOUT perfectionism
2. Get brute force working first
3. Test with sample input
4. Only optimize if time permits

**Phase 3: Test & Debug (Last 30% of time)**
1. Test with your edge cases
2. Check boundary values (0, 1, -1, max)
3. Verify output format matches exactly
4. Fix any bugs found

**When Timer Runs Out**:
- STOP coding immediately
- Note where you got stuck
- Review solution to learn
- Track mistake in table below
- Retry problem next day

**Pro Tips for Speed**:
- ⏱️ Use actual timer (phone/stopwatch)
- ⏱️ Don't aim for perfect code first—aim for working code
- ⏱️ Practice typing common patterns (loops, if-else)
- ⏱️ Learn keyboard shortcuts in your IDE
- ⏱️ Skip and return if stuck for >5 mins

---

### How to Approach Each Problem

1. **Read the problem 2-3 times**
2. **Understand input/output format**
3. **Create your own test cases**
4. **Think of brute force solution first**
5. **Try to optimize**
6. **Write pseudocode**
7. **Implement in C++**
8. **Test with multiple inputs**
9. **Handle edge cases**
10. **Review and refactor**

### Common Edge Cases to Check

- Empty array (n = 0)
- Single element (n = 1)
- All same elements
- All negative numbers
- Already sorted/reverse sorted
- Very large numbers (overflow)

### Time Management

- **Level 1**: 10-15 minutes per problem
- **Level 2**: 20-30 minutes per problem
- **Level 3**: 30-45 minutes per problem
- **Level 4**: 45-60 minutes per problem

**If stuck for too long**:
1. Take a 5-minute break
2. Come back with fresh mind
3. Check ONE hint at a time
4. Try again for 15 minutes
5. If still stuck, check solution and LEARN from it

---

## 📊 Mistake Tracking Table

**Instructions**: Track EVERY mistake you make. Review this table weekly.

| Date | Problem | Mistake Type | What Went Wrong | Lesson Learned | Fixed? ✓ |
|------|---------|--------------|-----------------|----------------|----------|
| | | Syntax | | | |
| | | Logic | | | |
| | | Edge Case | | | |
| | | Time Limit | | | |
| | | Wrong Output | | | |

**Mistake Categories**:
- **Syntax**: Forgot semicolon, wrong operator, typo
- **Logic**: Wrong algorithm, incorrect condition
- **Edge Case**: Didn't handle empty array, single element, negative numbers
- **Time Limit**: Inefficient solution (O(n²) instead of O(n))
- **Wrong Output**: Format mismatch, off-by-one error

**How to Use This Table**:
1. Fill row after EVERY failed attempt
2. Be specific in "What Went Wrong" column
3. Write actionable lesson (not just "be careful")
4. Review weekly to spot patterns
5. Re-solve problems marked ✗ after 2-3 days

**Example Entry**:
```
Date: 2026-04-19
Problem: 2.5 Maximum Subarray Sum
Mistake Type: Edge Case
What Went Wrong: Failed when all numbers negative (returned 0 instead of max element)
Lesson Learned: Initialize max_sum with arr[0], not 0. Handle all-negative case.
Fixed? ✓
```

**Common Patterns to Watch**:
- If you see 3+ "Edge Case" mistakes → Practice boundary value problems
- If you see 3+ "Time Limit" mistakes → Learn two pointers/sliding window
- If you see 3+ "Syntax" mistakes → Review C++ basics again

---

**Remember**: Struggle is part of learning. Every problem you solve makes you stronger! 💪

**Keep this table updated—it's your personal improvement roadmap!**

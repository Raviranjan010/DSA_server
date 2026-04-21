# If You Get Stuck - Problem-Solving Strategy

**Purpose**: Step-by-step framework to tackle ANY problem when you're stuck

---

## 🚨 The 5-Minute Rule

If you're stuck for 5 minutes:
1. **STOP** coding
2. **STEP BACK** from the screen
3. **FOLLOW** this framework

---

## Step 1: Understand the Problem (3 minutes)

### Ask Yourself:

```
✓ What is the INPUT?
✓ What is the OUTPUT?
✓ What are the CONSTRAINTS?
✓ Can I solve it manually (on paper)?
```

### Action Items:

```cpp
// Write down:
Input:  [What am I given?]
Output: [What do I need to return/print?]
Constraints: [Size, range, edge cases]

Example 1: [Create your own]
Input:  ...
Output: ...

Example 2: [Edge case]
Input:  ...
Output: ...
```

### Real Example:

**Problem**: "Find the maximum element in an array"

```
Input:  Array of integers
Output: Single integer (maximum value)
Constraints: Array size 1 to 10^5, values -10^9 to 10^9

Example 1:
Input:  [3, 7, 2, 9, 5]
Output: 9

Example 2 (Edge):
Input:  [-5]
Output: -5

Example 3 (All same):
Input:  [3, 3, 3]
Output: 3
```

---

## Step 2: Solve Manually (5 minutes)

### Paper-Pencil Method:

1. **Take a small example** (size 3-5)
2. **Solve it by hand** step-by-step
3. **Write down EXACTLY what you did**
4. **That's your algorithm!**

### Example: "Reverse a number"

**Manual Solution for 123**:
```
Step 1: 123 → Extract last digit: 3
Step 2: Remaining: 12, Reversed so far: 3
Step 3: Extract last digit: 2
Step 4: Remaining: 1, Reversed: 32
Step 5: Extract last digit: 1
Step 6: Remaining: 0, Reversed: 321
Step 7: Done! (remaining is 0)
```

**Pattern Identified**:
```
While number > 0:
  1. Extract last digit (number % 10)
  2. Add to reversed (reversed = reversed * 10 + digit)
  3. Remove last digit (number = number / 10)
```

---

## Step 3: Start with Brute Force (5 minutes)

### Think Simplest Solution:

```
Don't worry about efficiency!
Just find ANY solution that works.
```

### Questions to Ask:

```
✓ Can I check ALL possibilities?
✓ Can I use nested loops?
✓ Can I try every combination?
```

### Example: "Find if array has duplicates"

**Brute Force**:
```cpp
// Check every pair
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (arr[i] == arr[j]) {
            return true;  // Found duplicate
        }
    }
}
return false;
```

**Complexity**: O(n²) - Bad, but it WORKS!

**Why start with brute force?**
- ✓ You have A solution (better than nothing)
- ✓ Helps understand the problem
- ✓ Gives baseline for optimization
- ✓ In interviews, shows you can solve it

---

## Step 4: Optimize Step-by-Step (10 minutes)

### Ask These Questions:

```
1. Are we doing REDUNDANT work?
   → Can we store and reuse results? (Hashing/DP)

2. Do we need to check EVERYTHING?
   → Can we skip some parts? (Binary Search)

3. Is there a PATTERN in the data?
   → Sorted? Use two pointers or binary search
   → Need min/max in range? Use sliding window

4. Can we preprocess the data?
   → Sort first? Build a map?

5. What data structure helps?
   → Need fast lookup? → Hash map
   → Need min/max? → Heap
   → Need LIFO? → Stack
   → Need FIFO? → Queue
```

### Optimization Example:

**Problem**: "Find if array has duplicates"

**Brute Force**: O(n²) - Check all pairs

**Optimization Thinking**:
```
Question: Are we doing redundant work?
Answer: YES! We compare same elements multiple times.

Idea: What if we remember what we've seen?
Data Structure: Hash Set (fast lookup)

Optimized:
1. Create empty set
2. For each element:
   - If already in set → duplicate found!
   - Else → add to set
3. No duplicates if we finish loop
```

**Optimized Solution**:
```cpp
unordered_set<int> seen;
for (int num : arr) {
    if (seen.count(num)) {
        return true;  // Duplicate!
    }
    seen.insert(num);
}
return false;
```

**Complexity**: O(n) time, O(n) space - Much better!

---

## Step 5: Break Into Subproblems (5 minutes)

### Divide and Conquer:

```
If problem seems complex:
1. Break it into smaller parts
2. Solve each part separately
3. Combine solutions
```

### Example: "Sort array and find median"

**Break Down**:
```
Part 1: Sort the array
Part 2: Find middle element
Part 3: If even size, average two middle elements
```

**Code Structure**:
```cpp
// Part 1: Sort
sort(arr.begin(), arr.end());

// Part 2 & 3: Find median
int n = arr.size();
if (n % 2 == 1) {
    // Odd: middle element
    return arr[n/2];
} else {
    // Even: average of two middle
    return (arr[n/2 - 1] + arr[n/2]) / 2.0;
}
```

---

## Step 6: Pattern Recognition (5 minutes)

### Match Problem to Known Patterns:

| Problem Keywords | Likely Pattern |
|------------------|----------------|
| "Sorted array", "search" | Binary Search |
| "Top K", "Kth largest" | Heap |
| "Maximum subarray sum" | Kadane's / Sliding Window |
| "All permutations" | Backtracking |
| "Shortest path" | BFS |
| "Longest common" | DP |
| "Pairs with sum X" | Two Pointers / Hashing |
| "Valid parentheses" | Stack |
| "Count frequency" | Hash Map |
| "Minimum window" | Sliding Window |

### Action:

```
1. Look at problem keywords
2. Match to pattern above
3. Apply that pattern's template
```

---

## Step 7: Edge Cases Checklist (3 minutes)

### Always Check:

```
□ Empty input (size 0)
□ Single element (size 1)
□ All elements same
□ All elements negative
□ Already sorted / reverse sorted
□ Maximum constraints (will it TLE?)
□ Overflow (need long long?)
□ Division by zero
□ Duplicate elements
□ Boundary values (0, 1, -1)
```

### Example: "Find maximum in array"

```cpp
int findMax(vector<int>& arr) {
    // Edge case 1: Empty array
    if (arr.empty()) {
        return -1;  // Or throw error
    }
    
    // Edge case 2: Single element
    // (Our solution handles this automatically)
    
    int maxVal = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}
```

---

## Step 8: Write Pseudocode (5 minutes)

### Before Coding:

```
1. Write logic in plain English
2. No syntax worries
3. Focus on algorithm
```

### Example: "Binary Search"

**Pseudocode**:
```
1. Set left = 0, right = n-1
2. While left <= right:
   a. Find middle = (left + right) / 2
   b. If middle element == target:
      → Found! Return middle
   c. If target < middle element:
      → Search left half (right = middle - 1)
   d. Else:
      → Search right half (left = middle + 1)
3. Not found → Return -1
```

**Then translate to code**:
```cpp
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        else if (target < arr[mid]) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    
    return -1;
}
```

---

## Step 9: Debug Systematically (10 minutes)

### If Code Gives Wrong Answer:

```
1. Print intermediate values
2. Dry run on small example
3. Check if logic matches pseudocode
4. Test edge cases one by one
5. Compare with brute force on small inputs
```

### Debugging Template:

```cpp
for (int i = 0; i < n; i++) {
    cout << "i=" << i << ", value=" << arr[i] << endl;
    // Check if behavior matches expectation
}
```

### Common Bugs:

```
❌ Off-by-one: < vs <=
❌ Wrong initialization (0 vs 1, -1 vs 0)
❌ Integer division (5/2 = 2, not 2.5)
❌ Forgetting to update loop variable
❌ Array index out of bounds
❌ Not handling edge cases
❌ Overflow (need long long?)
```

---

## Step 10: Learn from Solution (15 minutes)

### If You Can't Solve It:

```
1. Look at solution
2. Understand the approach
3. Close the solution
4. Code it yourself
5. Test on multiple inputs
6. Come back next day and solve again
```

### Learning Checklist:

```
□ Do I understand WHY this works?
□ Could I explain it to someone else?
□ What pattern does this use?
□ When should I use this approach again?
□ What was the key insight?
□ What mistake did I make?
```

---

## Quick Decision Tree

```
Stuck on problem?
    ↓
Can I solve it on paper?
    ↓ NO
Read problem again, create examples
    ↓ YES
Write brute force solution
    ↓
Is it too slow?
    ↓ NO
Submit it! (Partial marks > 0)
    ↓ YES
Look for patterns/optimizations
    ↓
Still stuck?
    ↓ YES
Check hints ONE at a time
    ↓
Still stuck?
    ↓ YES
Look at solution, understand, code yourself
    ↓
Add to revision list
```

---

## Mental Models

### Model 1: "Simplify, Then Solve"

```
Complex problem → Make it simpler → Solve → Generalize
```

**Example**: "Find longest palindromic substring"
```
Simplified: "Check if a string is palindrome"
→ Solve that first
→ Then extend to substrings
```

### Model 2: "Work Backwards"

```
Start from desired output → What steps lead there?
```

**Example**: "Reach number N from 1 using +1 and ×2"
```
Work backwards from N:
If N is even → must come from N/2
If N is odd → must come from N-1
```

### Model 3: "Extreme Cases"

```
What if input is very small? Very large? Already sorted?
```

---

## Remember

✅ **Struggle is normal** - Even experts get stuck  
✅ **Take breaks** - Fresh mind solves faster  
✅ **Start simple** - Brute force is better than nothing  
✅ **Learn from failures** - Each mistake teaches something  
✅ **Practice makes patterns** - More problems = better intuition  

---

## Emergency Checklist (2 Minutes)

When completely stuck:

```
1. ☐ Read problem statement again (word by word)
2. ☐ Write down input/output format
3. ☐ Create 3 test cases (normal, edge, large)
4. ☐ Solve smallest case on paper
5. ☐ Write what you did in English
6. ☐ Translate to pseudocode
7. ☐ Code the pseudocode
8. ☐ Test on all 3 examples
```

---

**Next Steps**:
- Practice this framework on [Level 1 Problems](practice.md#level-1-basics-building-confidence)
- See it applied in [Solutions](solutions.md)
- Test understanding with [MCQs](mcqs.md)

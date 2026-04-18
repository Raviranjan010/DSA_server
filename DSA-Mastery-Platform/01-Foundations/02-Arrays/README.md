# 📦 Arrays & Strings

## 🌍 Real-World Introduction

Imagine you're managing a **warehouse for Amazon**. You have 1000 shelves, each storing a different product. When a customer orders "Product #542", you need to:
- **Find it instantly** (that's array indexing: O(1))
- **Update stock** when items sell (that's array modification: O(1))
- **Add new shelves** when inventory grows (that's dynamic arrays)

Arrays are everywhere:
- **Google Search**: Storing search results in ranked order
- **Netflix**: Your watch history as an array of movie IDs
- **Spotify**: Playlist = array of songs
- **Facebook**: Friend list = array of user IDs

**Why arrays matter in interviews?** 80% of interview questions involve arrays. They're the foundation for understanding memory, optimization, and algorithmic thinking.

---

## 📚 What You'll Learn

✅ **Core Operations**: Access, insert, delete, search  
✅ **Two Pointer Technique**: Solve problems in O(n) instead of O(n²)  
✅ **Sliding Window**: Find optimal subarrays efficiently  
✅ **Prefix Sum**: Answer range queries in O(1)  
✅ **Kadane's Algorithm**: Maximum subarray sum  
✅ **Real Patterns**: Recognize when to use which technique  

---

## 🎯 When to Use Arrays

### ✅ Use Arrays When:
- You need **fast access by index** (O(1))
- Data size is **known or bounded**
- You need to **iterate sequentially**
- Memory efficiency matters (contiguous allocation)

### ❌ Don't Use Arrays When:
- You need **frequent insertions/deletions** in middle (use LinkedList)
- You need **fast lookups by value** (use HashMap)
- Data size **changes dynamically** (use vector/ArrayList)
- You need **sorted data** always (use BST or keep sorted)

---

## 🔑 Core Concepts

### Concept 1: Array Memory Layout

Arrays store elements in **contiguous memory** (side by side):

```
Index:    0      1      2      3      4
Value:   [10]   [20]   [30]   [40]   [50]
Memory: 0x000  0x004  0x008  0x00C  0x010  (each int = 4 bytes)
```

**Why this matters:**
- Access `arr[3]` → Jump directly to `0x00C` (O(1))
- CPU cache loves arrays (predictable memory access)
- This is why arrays are FAST

### Concept 2: Static vs Dynamic Arrays

**Static Array (C-style):**
```cpp
int arr[5];  // Fixed size, can't change
```
- Size determined at compile time
- Faster (no overhead)
- Wasteful if you don't use all space

**Dynamic Array (C++ vector):**
```cpp
vector<int> arr;  // Grows automatically
arr.push_back(10);  // Add elements
```
- Size changes at runtime
- Slightly slower (resizing overhead)
- More flexible (90% of interview problems use this)

### Concept 3: Multi-Dimensional Arrays

**2D Array (Matrix):**
```cpp
vector<vector<int>> matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```
**Memory layout (row-major):**
```
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```
- Access `matrix[i][j]` → O(1)
- Used in: Image processing, game boards, dynamic programming

---

## 🛠️ Common Patterns

### Pattern 1: Two Pointer Technique

**When to use:**
- Problem asks to find **pairs** in array
- Array is **sorted** (or can be sorted)
- You're tempted to use nested loops (O(n²))

**Key indicators:**
- "Find two numbers that..."
- "Pair with sum..."
- "Reverse the array"
- "Check if palindrome"

**Template:**
```cpp
int left = 0, right = arr.size() - 1;

while (left < right) {
    if (condition_met) {
        // Process
        left++;
        right--;
    } else if (need_smaller) {
        right--;
    } else {
        left++;
    }
}
```

**Example Problems:**
- [Two Sum II](problems/easy/two-sum-ii.md)
- [Container With Most Water](problems/medium/container-with-most-water.md)
- [3Sum](problems/medium/3sum.md)

### Pattern 2: Sliding Window

**When to use:**
- Find **longest/shortest subarray** satisfying condition
- Problem mentions "contiguous" or "subarray"
- You're tracking a "window" of elements

**Key indicators:**
- "Longest substring..."
- "Maximum sum subarray of size k"
- "Smallest window containing..."

**Template:**
```cpp
int left = 0, maxLen = 0;
unordered_map<char, int> window;

for (int right = 0; right < s.size(); right++) {
    window[s[right]]++;
    
    // Shrink window if invalid
    while (/* condition violated */) {
        window[s[left]]--;
        left++;
    }
    
    maxLen = max(maxLen, right - left + 1);
}
```

**Example Problems:**
- [Longest Substring Without Repeating](problems/medium/longest-substring.md)
- [Minimum Window Substring](problems/hard/minimum-window-substring.md)
- [Max Consecutive Ones](problems/easy/max-consecutive-ones.md)

### Pattern 3: Prefix Sum

**When to use:**
- Multiple queries asking for **sum of range** [i, j]
- Need to calculate subarray sums repeatedly

**Key indicators:**
- "Sum of range..."
- "How many subarrays with sum = k"
- Multiple range sum queries

**Template:**
```cpp
// Precompute prefix sums
vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}

// Answer queries in O(1)
int rangeSum(int i, int j) {
    return prefix[j + 1] - prefix[i];
}
```

**Example Problems:**
- [Range Sum Query](problems/easy/range-sum-query.md)
- [Subarray Sum Equals K](problems/medium/subarray-sum-equals-k.md)

### Pattern 4: Kadane's Algorithm

**When to use:**
- Find **maximum subarray sum**
- Array has negative numbers

**Key insight:**
At each position, decide: "Start new subarray OR extend current one?"

**Template:**
```cpp
int maxSum = arr[0], currentSum = arr[0];

for (int i = 1; i < arr.size(); i++) {
    // Either extend current subarray or start new
    currentSum = max(arr[i], currentSum + arr[i]);
    maxSum = max(maxSum, currentSum);
}
```

**Example Problems:**
- [Maximum Subarray](problems/easy/maximum-subarray.md)
- [Maximum Product Subarray](problems/medium/maximum-product-subarray.md)

---

## 📊 Complexity Comparison

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Access by index | O(1) | O(1) | Instant - direct memory access |
| Search (unsorted) | O(n) | O(1) | Must check each element |
| Search (sorted) | O(log n) | O(1) | Binary search |
| Insert at end | O(1)* | O(1) | *Amortized (vector may resize) |
| Insert at middle | O(n) | O(n) | Must shift elements |
| Delete at end | O(1) | O(1) | Just remove |
| Delete at middle | O(n) | O(n) | Must shift back |

---

## 🎓 Learning Path

### Week 1: Master the Basics

**Start with (Easy - 3 problems):**
1. [Two Sum](problems/easy/two-sum.md) - Hash map pattern
2. [Best Time to Buy/Sell Stock](problems/easy/best-time-to-buy-sell-stock.md) - Single pass
3. [Maximum Subarray](problems/easy/maximum-subarray.md) - Kadane's algorithm

**Then (Medium - 5 problems):**
4. [3Sum](problems/medium/3sum.md) - Two pointer variation
5. [Container With Most Water](problems/medium/container-with-most-water.md) - Two pointer
6. [Longest Substring Without Repeating](problems/medium/longest-substring.md) - Sliding window
7. [Product of Array Except Self](problems/medium/product-of-array-except-self.md) - Prefix/suffix
8. [Subarray Sum Equals K](problems/medium/subarray-sum-equals-k.md) - Prefix sum + hash map

**Master with (Hard - 3 problems):**
9. [Trapping Rain Water](problems/hard/trapping-rain-water.md) - Two pointer advanced
10. [Minimum Window Substring](problems/hard/minimum-window-substring.md) - Sliding window advanced
11. [Median of Two Sorted Arrays](problems/hard/median-of-two-sorted-arrays.md) - Binary search

---

## 🏢 Company Patterns

### Amazon
**What they ask:**
- Two Sum variations (★★★★★)
- Remove duplicates in-place (★★★★★)
- Merge intervals (★★★★)

**Their twist:**
- "Do it in-place without extra space"
- "Single pass solution only"
- "Handle duplicates carefully"

**Example:** Instead of "Two Sum", they ask "Two Sum II" (sorted array, O(1) space)

### Google
**What they ask:**
- Sliding window problems (★★★★★)
- Subarray problems (★★★★)
- Merge intervals (★★★★)

**Their twist:**
- Large constraints (10^5 to 10^6)
- Multiple test cases
- Optimization required

**Example:** "Longest substring with at most K distinct characters"

### Meta (Facebook)
**What they ask:**
- Two pointer problems (★★★★★)
- Array manipulation (★★★★)
- Product of array except self (★★★★)

**Their twist:**
- Focus on clean code
- Edge case handling
- Explain trade-offs clearly

**Example:** "Move zeros to end while maintaining order"

---

## 💡 Interview Tips

### What Interviewers Look For:

1. **Can you identify the pattern?**
   - "This is a two-pointer problem because..."
   - "I'll use sliding window since we need contiguous subarray..."

2. **Can you start with brute force?**
   - Show you understand the problem first
   - Then optimize

3. **Do you consider edge cases?**
   - Empty array?
   - Single element?
   - All same elements?
   - Negative numbers?

4. **Can you write bug-free code?**
   - Off-by-one errors
   - Boundary conditions
   - Integer overflow

### Common Follow-up Questions:

- "Can you optimize space complexity?"
- "What if array is sorted?"
- "How would you handle duplicates?"
- "What if array is too large for memory?"
- "Can you do it in one pass?"

### How to Explain Trade-offs:

**Example (Two Sum):**
> "I could use brute force O(n²) checking all pairs, but that's slow. Using a hash map gives O(n) time with O(n) space. If space is critical, I could sort first O(n log n) and use two pointers O(n), total O(n log n) time with O(1) extra space."

---

## 🔗 Related Topics

After mastering arrays, move to:
- [📝 Strings](../03-Strings/README.md) - Arrays of characters
- [🔗 Linked Lists](../../02-DataStructures/01-LinkedLists/README.md) - Dynamic alternative
- [🌳 Trees](../../02-DataStructures/04-Trees/README.md) - Hierarchical arrays
- [📊 Dynamic Programming](../../03-Algorithms/03-DynamicProgramming/README.md) - Array-based optimization

---

## 🎯 Pro Tips

### Tip 1: Always Clarify Constraints
Before coding, ask:
- "Can array be empty?"
- "Are elements sorted?"
- "Can there be duplicates?"
- "What's the range of values?"
- "Can I modify the array?"

### Tip 2: Draw Before Coding
Sketch the array on paper:
```
[2, 7, 11, 15]
 ↑           ↑
left       right
```
This prevents off-by-one errors.

### Tip 3: Test with Edge Cases
Always test:
- `[]` (empty)
- `[5]` (single element)
- `[1, 1, 1]` (all same)
- `[-5, -2, -9]` (all negative)

### Tip 4: Know Your STL
```cpp
// Essential vector operations
vector<int> v;
v.push_back(x);      // O(1) amortized
v.pop_back();        // O(1)
v.size();            // O(1)
v[i];                // O(1)
sort(v.begin(), v.end());  // O(n log n)
reverse(v.begin(), v.end());  // O(n)
```

---

## 📈 Your Progress Tracker

Track your array mastery:

- [ ] Solved 5 easy problems independently
- [ ] Can implement two-pointer without reference
- [ ] Can implement sliding window without reference
- [ ] Solved 5 medium problems in < 30 min each
- [ ] Can explain when to use which pattern
- [ ] Solved 2 hard problems
- [ ] Passed mock interview with array questions

**Target:** Complete all 27 problems in 3-4 days

---

**Ready to start? Begin with [Two Sum](problems/easy/two-sum.md)** 🚀

# Two Pointer — Pattern Catalog

> **Complete reference for all two-pointer variations**

---

## 📋 Pattern Variations

### Variation 1: Opposite Direction (Converging Pointers)

**When to use**: 
- Array is sorted
- Looking for pairs that satisfy a condition
- Palindrome checks
- Partitioning problems

**Template**:
```cpp
int left = 0;
int right = arr.size() - 1;

while(left < right) {
    // Process arr[left] and arr[right]
    if(condition_met) {
        return result;
    }
    
    // Move pointers based on condition
    if(need_larger_value) {
        left++;
    } else {
        right--;
    }
}
```

**Example Problems**:
1. Two Sum II (LeetCode 167)
2. Container With Most Water (LeetCode 11)
3. Valid Palindrome (LeetCode 125)
4. 3Sum (LeetCode 15)
5. Reverse String (LeetCode 344)

**Complexity**: O(n) time, O(1) space

---

### Variation 2: Same Direction (Fast/Slow Pointers)

**When to use**:
- Remove duplicates in-place
- Cycle detection
- Find middle element
- Overwrite array based on condition

**Template**:
```cpp
int slow = 0;

for(int fast = 0; fast < arr.size(); fast++) {
    if(should_include(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
}

return slow;  // New size
```

**Example Problems**:
1. Remove Duplicates from Sorted Array (LeetCode 26)
2. Move Zeroes (LeetCode 283)
3. Remove Element (LeetCode 27)
4. Middle of Linked List (find middle)
5. Happy Number (cycle detection)

**Complexity**: O(n) time, O(1) space

---

### Variation 3: Dutch National Flag (3-Way Partition)

**When to use**:
- Partition array into 3 groups
- Sort colors/0s, 1s, 2s
- QuickSort partition step

**Template**:
```cpp
int low = 0, mid = 0, high = n - 1;

while(mid <= high) {
    if(arr[mid] == 0) {
        swap(arr[low], arr[mid]);
        low++;
        mid++;
    } else if(arr[mid] == 1) {
        mid++;
    } else {  // arr[mid] == 2
        swap(arr[mid], arr[high]);
        high--;
    }
}
```

**Example Problems**:
1. Sort Colors (LeetCode 75)
2. Partition array by value
3. QuickSort implementation

**Complexity**: O(n) time, O(1) space

---

## 🔀 Cross-Pattern Combinations

### Two Pointer + Binary Search
- **Use case**: Find pair with sum closest to target
- **Strategy**: Fix one element, binary search for the other

### Two Pointer + Sorting
- **Use case**: 3Sum, 4Sum problems
- **Strategy**: Sort first, then use two pointers for remaining elements

### Two Pointer + Sliding Window
- **Use case**: Variable window problems
- **Strategy**: Left and right pointers form the window

---

## 🎯 Decision Flowchart

```
Problem asks to find pairs?
├─ YES → Is array sorted?
│  ├─ YES → Opposite Direction Two Pointer
│  └─ NO → Sort first, then Opposite Direction
│
├─ NO → Need to remove/filter elements?
│  ├─ YES → Same Direction (Fast/Slow)
│  └─ NO → Partition into groups?
│     ├─ YES (3 groups) → Dutch National Flag
│     └─ NO → Check if palindrome → Opposite Direction
│
└─ Check problem keywords:
   - "sorted" + "pair" → Opposite Direction
   - "remove" + "in-place" → Same Direction
   - "partition" + "0,1,2" → Dutch Flag
```

---

## 💡 Pattern Recognition Keywords

### Opposite Direction Keywords:
- "sorted array"
- "two numbers that sum to"
- "container with most water"
- "valid palindrome"
- "reverse"
- "from both ends"

### Same Direction Keywords:
- "remove duplicates"
- "in-place"
- "move zeroes"
- "overwrite"
- "filter elements"
- "compact array"

### Dutch Flag Keywords:
- "sort colors"
- "partition into 3"
- "0s, 1s, and 2s"
- "three-way partition"
- "Dutch national flag"

---

## 📊 Comparison Table

| Variation | Pointers | Movement | Best For | Complexity |
|-----------|----------|----------|----------|------------|
| **Opposite** | left, right | Converge | Sorted pairs, palindromes | O(n) |
| **Same Direction** | slow, fast | Both right | Filtering, duplicates | O(n) |
| **Dutch Flag** | low, mid, high | Complex | 3-way partition | O(n) |

---

## 🔑 Key Insights

1. **Opposite Direction**: Eliminates one element per iteration
2. **Same Direction**: slow ≤ fast always, slow tracks valid position
3. **Dutch Flag**: Maintain invariants for each region
4. **Always sort first** if problem doesn't guarantee sorted input (unless order matters)
5. **Watch boundaries**: left < right vs left <= right
6. **Skip duplicates**: When problem requires unique pairs

---

## ⚡ Quick Reference Cards

### Card 1: Two Sum Pattern
```cpp
// Find pair with target sum in sorted array
int left = 0, right = n - 1;
while(left < right) {
    int sum = arr[left] + arr[right];
    if(sum == target) return {left, right};
    else if(sum < target) left++;
    else right--;
}
```

### Card 2: Remove Duplicates
```cpp
// Remove duplicates in-place
int slow = 0;
for(int fast = 1; fast < n; fast++) {
    if(arr[fast] != arr[slow]) {
        slow++;
        arr[slow] = arr[fast];
    }
}
return slow + 1;
```

### Card 3: Sort Colors
```cpp
// 3-way partition
int l = 0, m = 0, h = n - 1;
while(m <= h) {
    if(nums[m] == 0) swap(nums[l++], nums[m++]);
    else if(nums[m] == 1) m++;
    else swap(nums[m], nums[h--]);
}
```

---

**Next**: Review common mistakes in `Mistakes.md` →

[← Back to Notes](Notes.md) | [Mistakes →](Mistakes.md)
# Prefix Sum — Common Mistakes

> **Top mistakes students make with prefix sum**

---

## 🔴 Critical Mistakes

### Mistake 1: Forgetting to Handle left=0 Case
**Wrong**:
```cpp
int sumRange(int left, int right) {
    return prefix[right] - prefix[left-1];  // CRASH when left=0!
}
```

**Correct**:
```cpp
int sumRange(int left, int right) {
    if(left == 0) return prefix[right];
    return prefix[right] - prefix[left-1];
}
```

**Why**: Accessing prefix[-1] causes undefined behavior!

---

### Mistake 2: Incorrect 2D Prefix Sum Formula
**Wrong**:
```cpp
prefix[i][j] = matrix[i][j] + prefix[i-1][j] + prefix[i][j-1];
// Missing: - prefix[i-1][j-1]
```

**Correct**:
```cpp
prefix[i][j] = matrix[i][j] + 
               prefix[i-1][j] + prefix[i][j-1] - 
               prefix[i-1][j-1];  // Don't double count!
```

**Why**: Corner cell counted twice!

---

### Mistake 3: Forgetting Base Case prefixCount[0] = 1
**Wrong**:
```cpp
unordered_map<int, int> prefixCount;
// Missing base case!
```

**Correct**:
```cpp
unordered_map<int, int> prefixCount;
prefixCount[0] = 1;  // Empty prefix has sum 0
```

**Why**: Misses subarrays starting from index 0!

---

### Mistake 4: Not Handling Negative Remainders
**Wrong**:
```cpp
int remainder = currentSum % k;  // Can be negative!
```

**Correct**:
```cpp
int remainder = ((currentSum % k) + k) % k;  // Always positive
```

**Why**: C++ modulo can return negative values!

---

### Mistake 5: Using Wrong Indices in 2D Query
**Wrong**:
```cpp
int sumRegion(int row1, int col1, int row2, int col2) {
    return prefix[row2][col2] - prefix[row1][col2] - 
           prefix[row2][col1] + prefix[row1][col1];
}
```

**Correct**:
```cpp
int sumRegion(int row1, int col1, int row2, int col2) {
    return prefix[row2+1][col2+1] - prefix[row1][col2+1] - 
           prefix[row2+1][col1] + prefix[row1][col1];
}
```

**Why**: Prefix array is 1-indexed (size m+1, n+1)!

---

### Mistake 6: Counting Subarrays Incorrectly
**Wrong**:
```cpp
if(prefixCount.count(currentSum - k)) {
    count++;  // WRONG! Only counts 1
}
```

**Correct**:
```cpp
if(prefixCount.count(currentSum - k)) {
    count += prefixCount[currentSum - k];  // Add all occurrences
}
```

**Why**: Multiple subarrays can have same prefix sum!

---

### Mistake 7: Not Storing First Occurrence for Max Length
**Wrong**:
```cpp
prefixIndex[currentSum] = i;  // Overwrites earlier occurrence!
```

**Correct**:
```cpp
if(!prefixIndex.count(currentSum)) {
    prefixIndex[currentSum] = i;  // Store only first time
}
```

**Why**: Earlier occurrence gives longer subarray!

---

### Mistake 8: Confusing Prefix Sum with Current Sum
**Wrong**:
```cpp
int currentSum = 0;
for(int num : nums) {
    currentSum += num;
    if(currentSum == k) count++;  // Only checks from start
}
```

**Correct**:
```cpp
int currentSum = 0;
for(int num : nums) {
    currentSum += num;
    if(prefixCount.count(currentSum - k)) {
        count += prefixCount[currentSum - k];  // Checks all subarrays
    }
    prefixCount[currentSum]++;
}
```

---

### Mistake 9: Off-by-One in Prefix Array Size
**Wrong**:
```cpp
vector<int> prefix(n);  // Should be n+1 for easier indexing
```

**Correct**:
```cpp
vector<int> prefix(n);  // 0-indexed, handle left=0
// OR
vector<int> prefix(n+1, 0);  // 1-indexed, easier queries
```

---

### Mistake 10: Integer Overflow
**Wrong**:
```cpp
int currentSum = 0;  // May overflow with large inputs
for(int num : nums) {
    currentSum += num;
}
```

**Correct**:
```cpp
long long currentSum = 0;  // Use larger type
for(int num : nums) {
    currentSum += num;
}
```

**Why**: Sum can exceed INT_MAX!

---

## ✅ Debug Checklist

When stuck, check:

- [ ] Handling left=0 case correctly?
- [ ] Base case prefixCount[0] = 1 included?
- [ ] 2D formula has all 4 terms?
- [ ] Using (row2+1, col2+1) in 2D queries?
- [ ] Handling negative remainders?
- [ ] Adding count (not just incrementing)?
- [ ] Storing first occurrence for max length?
- [ ] Using long long if needed?
- [ ] Prefix array size correct?
- [ ] Testing with small example manually?

---

## 💡 Best Practices

1. **Draw it out** - Visualize prefix sum array
2. **Test with left=0** - Always edge case
3. **Use hash map wisely** - Store what you need
4. **Handle negatives** - Especially for modulo
5. **Think in terms of differences** - prefix[j] - prefix[i]

---

**Avoid these mistakes and prefix sum becomes second nature!**

[← Back to Patterns](Patterns.md) | [← Back to Notes](Notes.md)

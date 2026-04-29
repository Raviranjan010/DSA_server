# Sliding Window — Common Mistakes

> **Top mistakes students make with sliding window**

---

## 🔴 Critical Mistakes


### Mistake 1: Using `if` Instead of `while` for Shrinking
**Wrong**:
```cpp
if(currentSum > target) {
    currentSum -= arr[left];
    left++;
}
```


**Correct**:
```cpp
while(currentSum > target && left <= right) {
    currentSum -= arr[left];
    left++;
}
```

**Why**: One `if` might not shrink enough!

---

### Mistake 2: Forgetting to Check `left <= right`
**Wrong**:
```cpp
while(currentSum > target) {
    currentSum -= arr[left];
    left++;
}
```

**Correct**:
```cpp
while(currentSum > target && left <= right) {
    currentSum -= arr[left];
    left++;
}
```

**Why**: Can go out of bounds if left > right!

---

### Mistake 3: Not Updating Answer After Shrinking
**Wrong**:
```cpp
for(int right = 0; right < n; right++) {
    currentSum += arr[right];
    
    while(currentSum > target && left <= right) {
        currentSum -= arr[left];
        left++;
    }
    // Missing: maxLength = max(maxLength, right - left + 1);
}
```

**Correct**:
```cpp
for(int right = 0; right < n; right++) {
    currentSum += arr[right];
    
    while(currentSum > target && left <= right) {
        currentSum -= arr[left];
        left++;
    }
    
    // Update AFTER shrinking
    maxLength = max(maxLength, right - left + 1);
}
```

---

### Mistake 4: Incorrect Window Size Calculation
**Wrong**:
```cpp
maxLength = max(maxLength, right - left);  // Missing +1
```

**Correct**:
```cpp
maxLength = max(maxLength, right - left + 1);  // Inclusive
```

**Why**: Window is [left, right], both inclusive!

---

### Mistake 5: Not Handling First Window Separately
**Wrong** (Fixed Window):
```cpp
int currentSum = 0;
for(int i = 0; i < n; i++) {
    currentSum += arr[i];
    // Processes incomplete windows!
}
```

**Correct**:
```cpp
int currentSum = 0;
// Build first window
for(int i = 0; i < k; i++) {
    currentSum += arr[i];
}

// Then slide
for(int i = k; i < n; i++) {
    currentSum += arr[i] - arr[i-k];
}
```

---

### Mistake 6: Forgetting to Update Hash Map When Shrinking
**Wrong**:
```cpp
while(count.size() > k) {
    left++;  // Map not updated!
}
```

**Correct**:
```cpp
while(count.size() > k) {
    count[s[left]]--;
    if(count[s[left]] == 0) {
        count.erase(s[left]);
    }
    left++;
}
```

---

### Mistake 7: Using Wrong Comparison in Monotonic Deque
**Wrong**:
```cpp
while(!dq.empty() && arr[dq.back()] > arr[i]) {  // Wrong direction
    dq.pop_back();
}
```

**Correct** (for maximum):
```cpp
while(!dq.empty() && arr[dq.back()] < arr[i]) {  // Remove smaller
    dq.pop_back();
}
```

---

### Mistake 8: Not Checking for Empty Deque
**Wrong**:
```cpp
if(dq.front() == i - k) {  // Can crash if deque empty!
    dq.pop_front();
}
```

**Correct**:
```cpp
if(!dq.empty() && dq.front() == i - k) {
    dq.pop_front();
}
```

---

### Mistake 9: Forgetting Base Case in Hash Map
**Wrong**:
```cpp
unordered_map<int, int> count;
// Missing: count[0] = 1;
```

**Correct**:
```cpp
unordered_map<int, int> count;
count[0] = 1;  // Important for problems like "subarray sum equals k"
```

---

### Mistake 10: Confusing Fixed vs Variable Window
**Wrong** (Using variable when fixed needed):
```cpp
// Problem says "window of size k"
int left = 0;
for(int right = 0; right < n; right++) {
    // Shrinking logic - WRONG!
    while(right - left + 1 > k) {
        left++;
    }
}
```

**Correct**:
```cpp
// Just slide fixed window
for(int i = k; i < n; i++) {
    currentSum += arr[i] - arr[i-k];
}
```

---

## ✅ Debug Checklist

Run through this checklist when stuck:

- [ ] Am I using `while` for shrinking (not `if`)?
- [ ] Am I checking `left <= right`?
- [ ] Am I updating answer at the right time?
- [ ] Is window size calculation correct (right - left + 1)?
- [ ] For fixed window: Is first window built separately?
- [ ] For hash map: Am I updating counts when shrinking?
- [ ] For deque: Am I checking `!dq.empty()` before accessing?
- [ ] For deque: Is monotonic direction correct (< or >)?
- [ ] Am I using the right pattern (fixed vs variable)?
- [ ] Did I handle edge cases (empty array, k > n)?

---

## 🎯 Interview Trap Questions

### Trap 1: "Longest subarray with sum ≤ K"
**Trap**: Students use fixed window  
**Correct**: Variable window (expand-shrink)

### Trap 2: "Maximum in every window of size K"
**Trap**: Students use O(n*k) brute force  
**Correct**: Monotonic deque O(n)

### Trap 3: "Minimum window substring"
**Trap**: Students don't track all required characters  
**Correct**: Hash map with `formed` counter

### Trap 4: "Subarrays with exactly K distinct"
**Trap**: Students try to count exactly K directly  
**Correct**: Use trick: Exactly(K) = AtMost(K) - AtMost(K-1)

---

## 💡 Best Practices

1. **Always use `while` for shrinking** - Ensures condition is fully met
2. **Update answer strategically** - Know when to update (after expand or after shrink)
3. **Use appropriate data structure** - Deque for max/min, map for counts
4. **Initialize carefully** - First window or base cases
5. **Test with small examples** - Trace manually before coding

---

**Avoid these mistakes and sliding window becomes easy!**

[← Back to Patterns](Patterns.md) | [← Back to Notes](Notes.md)

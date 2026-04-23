# Binary Search — Common Mistakes

> **Top mistakes students make with binary search**

---

## 🔴 Critical Mistakes

### Mistake 1: Integer Overflow in Mid Calculation
**Wrong**:
```cpp
int mid = (left + right) / 2;  // Can overflow!
```

**Correct**:
```cpp
int mid = left + (right - left) / 2;  // Safe
```

---

### Mistake 2: Wrong Loop Condition
**Wrong**:
```cpp
while(left < right) {  // May miss last element
```

**Correct**:
```cpp
while(left <= right) {  // Include both endpoints
```

---

### Mistake 3: Not Updating Bounds Correctly
**Wrong**:
```cpp
if(nums[mid] < target) {
    left = mid;  // INFINITE LOOP!
}
```

**Correct**:
```cpp
if(nums[mid] < target) {
    left = mid + 1;  // Must exclude mid
}
```

---

### Mistake 4: Confusing Lower/Upper Bound
**Wrong**:
```cpp
// For lower bound (first >= target)
if(nums[mid] <= target) {  // WRONG comparison
    left = mid + 1;
}
```

**Correct**:
```cpp
if(nums[mid] < target) {  // Strict less than
    left = mid + 1;
} else {
    right = mid;
}
```

---

## 💡 Best Practices

1. **Use safe mid calculation** - Prevent overflow
2. **Know loop conditions** - `<=` vs `<`
3. **Exclude mid when updating** - Prevent infinite loops
4. **Test edge cases** - Empty, single element, not found
5. **Draw it out** - Trace with examples

---

**Avoid these and binary search becomes reliable!**

[← Back to Patterns](Patterns.md) | [← Back to Notes](Notes.md)

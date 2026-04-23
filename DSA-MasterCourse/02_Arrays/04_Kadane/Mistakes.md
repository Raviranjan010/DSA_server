# Kadane's Algorithm — Common Mistakes

> **Top mistakes students make with Kadane's algorithm**

---

## 🔴 Critical Mistakes

### Mistake 1: Resetting currentSum to 0 Instead of nums[i]
**Wrong**:
```cpp
if(currentSum < 0) {
    currentSum = 0;  // WRONG!
}
```

**Correct**:
```cpp
currentSum = max(nums[i], currentSum + nums[i]);
```

**Why**: Must include current element!

---

### Mistake 2: Not Handling All Negative Numbers
**Wrong**:
```cpp
int maxSum = 0;  // WRONG for all negative!
int currentSum = 0;
```

**Correct**:
```cpp
int maxSum = nums[0];  // Initialize with first element
int currentSum = nums[0];
```

---

### Mistake 3: Forgetting to Track Minimum for Product
**Wrong**:
```cpp
int maxProd = nums[0];
// Missing: int minProd = nums[0];
```

**Why**: Negative * negative = positive!

---

## 💡 Best Practices

1. **Initialize with first element** - Not zero
2. **Track min for product** - Essential
3. **Circular case** - Check if all negative
4. **Update maxSum every iteration** - Don't forget

---

**Avoid these and Kadane's becomes easy!**

[← Back to Patterns](Patterns.md) | [← Back to Notes](Notes.md)

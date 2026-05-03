# Two Pointer — Common Mistakes

> **Top 10 mistakes and how to avoid them**

---

## ❌ Mistake 1: Wrong Pointer Initialization

### The Error
```cpp
// WRONG
int left = 1;              // Should be 0
int right = arr.size();    // Should be size - 1

// This causes:
// - Misses first element
// - Out-of-bounds access on last element
```

### ✅ The Fix
```cpp
// CORRECT
int left = 0;
int right = arr.size() - 1;
```

### 🔍 How to Debug
- Print initial values: `cout << left << " " << right << endl;`
- Check if they point to valid indices

### 🚨 When This Occurs
- Rushing into coding without thinking
- Confused by 1-based problem description

---

## ❌ Mistake 2: Wrong Loop Condition

### The Error
```cpp
// WRONG: May process same element twice or miss cases
while(left <= right) {  // or while(left < right)
    // Depends on problem!
}
```

### ✅ The Fix
```cpp
// For finding pairs (don't use same element twice):
while(left < right) {

// For searching (need to check single element):
while(left <= right) {
```

### 🔍 How to Debug
- Trace with single-element array
- Check if loop terminates correctly

### 💡 Rule of Thumb
- **Two distinct elements**: `left < right`
- **Search/Range**: `left <= right`

---

## ❌ Mistake 3: Forgetting to Move Pointers

### The Error
```cpp
while(left < right) {
    if(arr[left] + arr[right] == target) {
        return {left, right};
    }
    // FORGOT to move pointers! → Infinite loop!
}
```

### ✅ The Fix
```cpp
while(left < right) {
    int sum = arr[left] + arr[right];
    if(sum == target) {
        return {left, right};
    } else if(sum < target) {
        left++;   // ← MUST move!
    } else {
        right--;  // ← MUST move!
    }
}
```

### 🔍 How to Debug
- Add counter to detect infinite loops
- Print pointer values each iteration

---

## ❌ Mistake 4: Moving Both Pointers Unnecessarily

### The Error
```cpp
// WRONG: Might skip valid pairs
if(arr[left] + arr[right] == target) {
    left++;
    right--;  // What if there are multiple solutions?
}
```

### ✅ The Fix
```cpp
// Move based on condition
if(sum < target) {
    left++;   // Only move left
} else if(sum > target) {
    right--;  // Only move right
} else {
    // Found! Move both or return
    return {left, right};
}
```

---

## ❌ Mistake 5: Not Handling Duplicates

### The Error
```cpp
// Problem: Find all unique pairs
// WRONG: Returns duplicate pairs
while(left < right) {
    if(arr[left] + arr[right] == target) {
        result.push_back({arr[left], arr[right]});
        left++;
        right--;
    }
}
```

### ✅ The Fix
```cpp
while(left < right) {
    if(arr[left] + arr[right] == target) {
        result.push_back({arr[left], arr[right]});
        left++;
        right--;
        
        // Skip duplicates
        while(left < right && arr[left] == arr[left-1]) {
            left++;
        }
        while(left < right && arr[right] == arr[right+1]) {
            right--;
        }
    }
}
```

---

## ❌ Mistake 6: Integer Overflow

### The Error
```cpp
// WRONG: Sum might overflow
if(arr[left] + arr[right] == target) {
    // arr[left] + arr[right] could exceed INT_MAX
}
```

### ✅ The Fix
```cpp
// Use long long for safety
long long sum = (long long)arr[left] + arr[right];
if(sum == target) {
    // Safe from overflow
}
```

---

## ❌ Mistake 7: Not Sorting When Required

### The Error
```cpp
// WRONG: Two pointer on unsorted array
vector<int> arr = {5, 2, 8, 1, 9};
int left = 0, right = 4;
// This won't work correctly!
```

### ✅ The Fix
```cpp
// MUST sort first (if order doesn't matter)
sort(arr.begin(), arr.end());
// Now two pointer works
```

### 💡 When NOT to Sort
- Problem requires maintaining original order
- Use hash map instead for unsorted arrays

---

## ❌ Mistake 8: Off-by-One in Fast/Slow Pattern

### The Error
```cpp
// WRONG: Slow and fast start at same position
int slow = 0, fast = 0;
while(fast < n) {
    arr[slow] = arr[fast];
    slow++;
    fast++;
}
// This just copies everything!
```

### ✅ The Fix
```cpp
// CORRECT: Add condition for slow
int slow = 0;
for(int fast = 0; fast < n; fast++) {
    if(should_include(arr[fast])) {  // ← Key condition!
        arr[slow] = arr[fast];
        slow++;
    }
}
```

---

## ❌ Mistake 9: Dutch Flag - Wrong Swap Logic

### The Error
```cpp
// WRONG: Not incrementing mid after swap with low
if(arr[mid] == 0) {
    swap(arr[low], arr[mid]);
    low++;
    // FORGOT: mid++
}
```

### ✅ The Fix
```cpp
if(arr[mid] == 0) {
    swap(arr[low], arr[mid]);
    low++;
    mid++;  // ← MUST increment!
} else if(arr[mid] == 1) {
    mid++;
} else {
    swap(arr[mid], arr[high]);
    high--;  // Don't increment mid here!
}
```

### 🔍 Why?
- After swap with low, arr[mid] is guaranteed to be 1 (already processed)
- After swap with high, arr[mid] is unknown (need to check)

---

## ❌ Mistake 10: Accessing Invalid Indices After Loop

### The Error
```cpp
while(left < right) {
    // ...
}
// WRONG: left and right might be invalid now
cout << arr[left] << arr[right];
```

### ✅ The Fix
```cpp
while(left < right) {
    if(found) {
        return result;  // Return inside loop
    }
}
return -1;  // Not found
```

---

## 🛠️ Debug Checklist

Before submitting two-pointer solution:

- [ ] Pointers initialized correctly (0 and n-1)?
- [ ] Loop condition appropriate (< or <=)?
- [ ] Pointers move in every iteration?
- [ ] No out-of-bounds access?
- [ ] Array sorted if required?
- [ ] Duplicates handled if needed?
- [ ] Overflow checked for sums?
- [ ] Edge cases tested (empty, single element)?

---

## 🎯 Interview Trap Questions

1. **"What if array has duplicates?"**
   - Answer: Add while loops to skip duplicates

2. **"Can you solve without sorting?"**
   - Answer: Use hash map instead (trade space for time)

3. **"What if array is circular?"**
   - Answer: Use modular arithmetic or double the array

4. **"How to find ALL pairs, not just one?"**
   - Answer: Don't return after finding first pair, continue

5. **"What if elements can be negative?"**
   - Answer: Same logic works, but sorting still required

---

## 💡 Pro Tips

1. **Always draw it out** - Visualize pointer movement
2. **Test with small cases first** - [1, 2], [1], []
3. **Print pointers** - Debug by printing left/right values
4. **Think about termination** - When does loop stop?
5. **Consider all movements** - When does each pointer move?

---

**Next**: Practice problems in `Problems/` folder →

[← Back to Patterns](Patterns.md) | [Problems →](Problems/Easy.md)
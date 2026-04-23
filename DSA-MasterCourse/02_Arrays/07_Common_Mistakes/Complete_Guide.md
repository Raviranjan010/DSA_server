# Common Array Mistakes — Complete Debugging Guide

> **Comprehensive guide to all array-related mistakes and how to fix them**

---

## 📊 Mistake Categories

1. **Index Errors** (40% of bugs)
2. **Logic Errors** (25% of bugs)
3. **Memory Errors** (20% of bugs)
4. **Optimization Errors** (15% of bugs)

---

## 🚨 Category 1: Index Errors

### Mistake 1.1: Out of Bounds Access

#### ❌ Wrong
```cpp
int arr[5] = {1, 2, 3, 4, 5};
cout << arr[5];  // Undefined behavior! Valid: 0-4
```

#### ✅ Correct
```cpp
int arr[5] = {1, 2, 3, 4, 5};
if(index >= 0 && index < 5) {
    cout << arr[index];
}
```

#### 🔍 Debug Strategy
- Print index before accessing: `cout << "Accessing index: " << index << endl;`
- Use `at()` method for vectors (throws exception)
- Add assertions: `assert(index >= 0 && index < size);`

---

### Mistake 1.2: Off-by-One Errors

#### ❌ Wrong
```cpp
// Using <= instead of <
for(int i = 0; i <= n; i++) {  // Should be i < n
    cout << arr[i] << " ";
}

// Wrong reverse loop
for(int i = n; i >= 0; i--) {  // Should start at n-1
    cout << arr[i] << " ";
}
```

#### ✅ Correct
```cpp
// Forward: 0 to n-1
for(int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}

// Reverse: n-1 to 0
for(int i = n - 1; i >= 0; i--) {
    cout << arr[i] << " ";
}
```

#### 💡 Prevention Checklist
- [ ] Array of size n → valid indices: 0 to n-1
- [ ] Forward loop: `i < n` (not `<=`)
- [ ] Reverse loop: start at `n-1`
- [ ] Last element: `arr[n-1]` (not `arr[n]`)

---

### Mistake 1.3: Confusing Size and Last Index

#### ❌ Wrong
```cpp
vector<int> v = {1, 2, 3, 4, 5};
int last = v[v.size()];  // CRASH! size=5, last index=4
```

#### ✅ Correct
```cpp
vector<int> v = {1, 2, 3, 4, 5};
int last = v[v.size() - 1];  // Correct: index 4
// OR
int last = v.back();  // Even better!
```

---

## 🧠 Category 2: Logic Errors

### Mistake 2.1: Modifying Array While Iterating

#### ❌ Wrong
```cpp
vector<int> v = {1, 2, 3, 4, 5};
for(int i = 0; i < v.size(); i++) {
    if(v[i] % 2 == 0) {
        v.erase(v.begin() + i);  // Changes indices!
    }
}
```

#### ✅ Correct
```cpp
// Method 1: Iterate backwards
for(int i = v.size() - 1; i >= 0; i--) {
    if(v[i] % 2 == 0) {
        v.erase(v.begin() + i);
    }
}

// Method 2: Use erase-remove idiom
v.erase(remove_if(v.begin(), v.end(), [](int x) {
    return x % 2 == 0;
}), v.end());
```

---

### Mistake 2.2: Wrong Loop Bounds for Subarrays

#### ❌ Wrong
```cpp
// Generate all subarrays
for(int i = 0; i < n; i++) {
    for(int j = i; j < n; j++) {  // Should be j < n
        // Process subarray arr[i..j]
    }
}
```

#### ✅ Correct
```cpp
for(int i = 0; i < n; i++) {
    for(int j = i; j < n; j++) {
        // Process subarray arr[i..j]
        // Valid: i <= j < n
    }
}
```

---

### Mistake 2.3: Not Handling Empty Array

#### ❌ Wrong
```cpp
int findMax(vector<int>& nums) {
    int maxVal = nums[0];  // CRASH if empty!
    for(int x : nums) {
        maxVal = max(maxVal, x);
    }
    return maxVal;
}
```

#### ✅ Correct
```cpp
int findMax(vector<int>& nums) {
    if(nums.empty()) {
        throw runtime_error("Empty array");
        // OR return INT_MIN
    }
    
    int maxVal = nums[0];
    for(int x : nums) {
        maxVal = max(maxVal, x);
    }
    return maxVal;
}
```

---

## 💾 Category 3: Memory Errors

### Mistake 3.1: Stack Overflow with Large Arrays

#### ❌ Wrong
```cpp
void process() {
    int arr[10000000];  // ~40 MB on stack → CRASH!
    // Stack limit is typically 1-8 MB
}
```

#### ✅ Correct
```cpp
void process() {
    // Method 1: Use vector (heap)
    vector<int> arr(10000000);
    
    // Method 2: Dynamic allocation
    int* arr = new int[10000000];
    // ... use array ...
    delete[] arr;  // Don't forget to free!
}
```

---

### Mistake 3.2: Memory Leak

#### ❌ Wrong
```cpp
void process() {
    int* arr = new int[1000];
    // ... use array ...
    // FORGOT: delete[] arr;
}
// Memory leaked!
```

#### ✅ Correct
```cpp
void process() {
    int* arr = new int[1000];
    // ... use array ...
    delete[] arr;  // Always free!
}

// OR BETTER: Use vector (automatic cleanup)
void process() {
    vector<int> arr(1000);
    // ... use array ...
}  // Automatically freed
```

---

### Mistake 3.3: Dangling Pointer

#### ❌ Wrong
```cpp
int* createArray() {
    int arr[100];  // Stack array
    return arr;    // Returns pointer to destroyed memory!
}
```

#### ✅ Correct
```cpp
vector<int> createArray() {
    vector<int> arr(100);
    return arr;  // Safe: vector is copied/moved
}

// OR
int* createArray() {
    int* arr = new int[100];  // Heap array
    return arr;  // Caller must delete[]
}
```

---

## ⚡ Category 4: Optimization Errors

### Mistake 4.1: Unnecessary Array Copy

#### ❌ Wrong (O(n) extra space)
```cpp
void process(vector<int> nums) {  // Pass by value → copies!
    for(int x : nums) {
        cout << x << " ";
    }
}
```

#### ✅ Correct (O(1) extra space)
```cpp
void process(const vector<int>& nums) {  // Pass by reference
    for(int x : nums) {
        cout << x << " ";
    }
}
```

---

### Mistake 4.2: Brute Force When Optimal Exists

#### ❌ Wrong (O(n²))
```cpp
// Two Sum - Brute force
for(int i = 0; i < n; i++) {
    for(int j = i + 1; j < n; j++) {
        if(arr[i] + arr[j] == target) {
            return {i, j};
        }
    }
}
```

#### ✅ Correct (O(n) with hash map)
```cpp
unordered_map<int, int> seen;
for(int i = 0; i < n; i++) {
    int complement = target - arr[i];
    if(seen.count(complement)) {
        return {seen[complement], i};
    }
    seen[arr[i]] = i;
}
```

---

## 🛠️ Debugging Workflow Template

### Step 1: Reproduce the Bug
```cpp
// Add debug prints
cout << "Array size: " << arr.size() << endl;
cout << "Accessing index: " << index << endl;
cout << "Array contents: ";
for(int x : arr) cout << x << " ";
cout << endl;
```

### Step 2: Isolate the Problem
- Comment out sections
- Test with minimal input
- Use binary search to find bug location

### Step 3: Check Common Issues
- [ ] Index out of bounds?
- [ ] Empty array handled?
- [ ] Off-by-one error?
- [ ] Array modified during iteration?
- [ ] Memory leak?
- [ ] Unnecessary copy?

### Step 4: Fix and Test
- Apply fix
- Test with edge cases
- Verify no new bugs introduced

---

## 📋 Edge Cases Checklist

Always test your array solution with:

1. **Empty array**: `[]`
2. **Single element**: `[1]`
3. **Two elements**: `[1, 2]`
4. **All same elements**: `[5, 5, 5, 5]`
5. **Already sorted**: `[1, 2, 3, 4, 5]`
6. **Reverse sorted**: `[5, 4, 3, 2, 1]`
7. **All zeros**: `[0, 0, 0]`
8. **All negatives**: `[-5, -3, -1]`
9. **Mixed positive/negative**: `[-2, 1, -3, 4]`
10. **Large input**: 10^5 elements
11. **Duplicate elements**: `[1, 2, 2, 3, 3, 3]`
12. **Min/Max values**: `[INT_MIN, INT_MAX]`

---

## 💡 Pro Debugging Tips

1. **Use assertions**: `assert(index >= 0 && index < size);`
2. **Print before crash**: Add prints right before suspected bug
3. **Test incrementally**: Start with small inputs
4. **Draw it out**: Visualize array and indices on paper
5. **Use debugger**: Step through code line by line
6. **Rubber duck**: Explain code to someone (or something!)
7. **Take breaks**: Fresh eyes catch bugs faster

---

## 🎯 Interview Debugging Questions

### Question 1: "Your code gives wrong answer. How do you debug?"
**Answer**: 
1. Test with provided examples
2. Test with edge cases (empty, single element)
3. Add print statements to trace execution
4. Verify loop bounds and index calculations
5. Check if all edge cases handled

### Question 2: "How to prevent out-of-bounds errors?"
**Answer**:
1. Always validate index before access
2. Use `at()` for vectors (throws exception)
3. Add assertions in debug mode
4. Carefully check loop conditions
5. Test with boundary values

### Question 3: "When would you use array vs vector?"
**Answer**:
- **Array**: Fixed size, performance-critical, known at compile time
- **Vector**: Dynamic size, frequent insertions, unknown size, safety needed

---

## 📚 Quick Reference: Common Bug Patterns

| Bug Pattern | Symptoms | Fix |
|-------------|----------|-----|
| **Off-by-one** | Wrong answer, crashes at boundaries | Check `<` vs `<=`, start/end indices |
| **Out of bounds** | Segfault, undefined behavior | Validate indices, use `at()` |
| **Empty array** | Crash on nums[0] | Check `if(nums.empty())` first |
| **Infinite loop** | TLE, program hangs | Ensure pointers move |
| **Memory leak** | Memory usage grows | Use vector or delete[] |
| **Wrong copy** | TLE, MLE | Pass by reference |

---

**Next**: Learn pattern recognition in `08_Tricks_And_Pattern_Recognition/` →

[← Back to README](../README.md)

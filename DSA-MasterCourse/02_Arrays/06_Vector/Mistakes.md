# Vector — Common Mistakes

> **Top mistakes students make with C++ vectors**

---

## 🔴 Critical Mistakes

### Mistake 1: Accessing Empty Vector
**Wrong**:
```cpp
vector<int> v;
cout << v[0];  // UNDEFINED BEHAVIOR!
```

**Correct**:
```cpp
vector<int> v;
if(!v.empty()) {
    cout << v[0];
}
```

**Why**: Accessing empty vector causes undefined behavior!

---

### Mistake 2: Using [] Instead of at() for Safety
**Wrong**:
```cpp
vector<int> v = {1, 2, 3};
cout << v[10];  // No bounds check, undefined behavior!
```

**Correct**:
```cpp
vector<int> v = {1, 2, 3};
cout << v.at(10);  // Throws out_of_range exception
```

**Why**: `at()` provides bounds checking for safety!

---

### Mistake 3: Not Reserving Capacity
**Wrong**:
```cpp
vector<int> v;
for(int i = 0; i < 1000000; i++) {
    v.push_back(i);  // Multiple reallocations!
}
```

**Correct**:
```cpp
vector<int> v;
v.reserve(1000000);  // Allocate once
for(int i = 0; i < 1000000; i++) {
    v.push_back(i);  // No reallocations
}
```

**Why**: Reserve avoids expensive reallocations!

---

### Mistake 4: Invalidating Iterators
**Wrong**:
```cpp
vector<int> v = {1, 2, 3, 4, 5};
for(auto it = v.begin(); it != v.end(); it++) {
    if(*it % 2 == 0) {
        v.erase(it);  // Iterator invalidated!
    }
}
```

**Correct**:
```cpp
vector<int> v = {1, 2, 3, 4, 5};
v.erase(remove_if(v.begin(), v.end(), [](int x) {
    return x % 2 == 0;
}), v.end());
```

**Why**: Erasing invalidates iterators!

---

### Mistake 5: Confusing size() and capacity()
**Wrong**:
```cpp
vector<int> v;
v.reserve(100);
cout << v.size();  // Prints 0, not 100!
```

**Correct**:
```cpp
vector<int> v;
v.reserve(100);    // Capacity = 100
cout << v.size();  // Size = 0
v.resize(100);     // Now size = 100
```

**Why**: Size != Capacity!

---

### Mistake 6: Passing Vector by Value
**Wrong**:
```cpp
void process(vector<int> v) {  // Makes a copy!
    // ...
}
```

**Correct**:
```cpp
void process(const vector<int>& v) {  // No copy
    // ...
}

void process(vector<int>& v) {  // No copy, can modify
    // ...
}
```

**Why**: Pass by reference avoids expensive copies!

---

### Mistake 7: Not Handling 2D Vector Initialization
**Wrong**:
```cpp
vector<vector<int>> matrix(3, 4);  // WRONG!
```

**Correct**:
```cpp
vector<vector<int>> matrix(3, vector<int>(4, 0));  // 3x4 matrix
```

**Why**: 2D vectors need nested initialization!

---

### Mistake 8: Using push_back After reserve Without Resize
**Wrong**:
```cpp
vector<int> v;
v.reserve(10);
v[0] = 5;  // UNDEFINED BEHAVIOR! Size is still 0
```

**Correct**:
```cpp
vector<int> v;
v.reserve(10);
v.push_back(5);  // Correct way
// OR
v.resize(10);
v[0] = 5;  // Now safe
```

**Why**: Reserve doesn't change size!

---

### Mistake 9: Forgetting to Clear Vectors
**Wrong**:
```cpp
for(int test = 0; test < t; test++) {
    vector<int> v;
    // ... use v
    // v not cleared, but goes out of scope (OK in this case)
}
```

**Better** (if reusing same vector):
```cpp
vector<int> v;
for(int test = 0; test < t; test++) {
    v.clear();  // Reuse vector
    // ... use v
}
```

**Why**: Clear to reuse efficiently!

---

### Mistake 10: Using Wrong Comparison in Sort
**Wrong**:
```cpp
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end(), greater<int>());  // Descending
// But expected ascending!
```

**Correct**:
```cpp
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());  // Ascending (default)
// OR
sort(v.begin(), v.end(), less<int>());  // Explicit ascending
```

**Why**: Know your sort order!

---

## ✅ Debug Checklist

When working with vectors, check:

- [ ] Vector not empty before accessing?
- [ ] Using `at()` for bounds checking?
- [ ] Reserved capacity for large vectors?
- [ ] Not invalidating iterators during erase?
- [ ] Understanding size vs capacity?
- [ ] Passing by reference (not value)?
- [ ] 2D vectors properly initialized?
- [ ] Not accessing after reserve without resize?
- [ ] Cleared vectors when reusing?
- [ ] Correct sort order?

---

## 💡 Best Practices

1. **Use `at()` in production** - Bounds checking catches bugs
2. **Reserve when size known** - Performance optimization
3. **Pass by const reference** - Avoid copies
4. **Use range-based for loops** - Cleaner syntax
5. **Prefer vectors over arrays** - Safer and more flexible
6. **Use STL algorithms** - sort, find, remove_if
7. **Check empty()** - Before accessing elements
8. **Use emplace_back** - For complex objects

---

## 🎯 Pro Tips

### Tip 1: Shrink to Fit
```cpp
vector<int> v(1000);
// ... use only 10 elements
v.resize(10);
v.shrink_to_fit();  // Free unused memory
```

### Tip 2: Initialize with Values
```cpp
vector<int> v(10, 5);  // Ten 5s
vector<int> v2 = {1, 2, 3, 4, 5};  // Initializer list
```

### Tip 3: Swap Vectors (O(1))
```cpp
vector<int> v1 = {1, 2, 3};
vector<int> v2 = {4, 5, 6};
swap(v1, v2);  // O(1) operation
```

### Tip 4: Vector of Vectors (Jagged Array)
```cpp
vector<vector<int>> jagged = {
    {1, 2},
    {3, 4, 5},
    {6, 7, 8, 9}
};
```

---

**Avoid these mistakes and vectors become your best friend!**

[← Back to Patterns](Patterns.md) | [← Back to Notes](Notes.md)

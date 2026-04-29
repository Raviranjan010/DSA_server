# Vector vs Array — Decision Guide

> **What You'll Learn**: When to use vector vs static array, trade-offs, performance  
> **Prerequisites**: Array Basics, Vector Basics  
> **Time Required**: 30 minutes

---

## 1. 📌 Quick Comparison

| Feature | Static Array | std::vector |
|---------|--------------|-------------|
| **Size** | Fixed at compile time | Dynamic, changes at runtime |
| **Declaration** | `int arr[10]` | `vector<int> v` |
| **Memory** | Stack (usually) | Heap |
| **Resizing** | ❌ Not possible | ✅ Automatic |
| **Performance** | Slightly faster | Minimal overhead |
| **Safety** | No bounds checking | `at()` method available |
| **STL Algorithms** | Limited | Full support |
| **Size Tracking** | Manual | `size()` method |

---

## 2. 🎯 Decision Tree

```
Do you know the size at compile time?
├─ YES → Do you need to resize?
│  ├─ NO → Use Static Array
│  └─ YES → Use Vector
│
└─ NO → Use Vector
```

---

## 3. 💡 When to Use Static Arrays

### ✅ Use Arrays When:

1. **Fixed, known size**
```cpp
int daysInMonth[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
// Size will never change
```

2. **Performance critical** (embedded systems, competitive programming)
```cpp
// Array: No overhead
int arr[1000000];  // Fast allocation on stack

// Vector: Slight overhead
vector<int> v(1000000);  // Heap allocation + tracking
```

3. **Memory constrained**
```cpp
// Array: Exact memory usage
int arr[100];  // Exactly 400 bytes

// Vector: Extra memory for capacity tracking
vector<int> v(100);  // 400+ bytes (capacity might be larger)
```

4. **C compatibility**
```cpp
// C function expects array
void process(int arr[], int size);

int arr[100];
process(arr, 100);  // Works directly
```

---

## 4. 💡 When to Use Vectors

### ✅ Use Vectors When:

1. **Unknown size**
```cpp
vector<int> numbers;
int n;
while(cin >> n && n != -1) {
    numbers.push_back(n);  // Grows as needed
}
```

2. **Frequent insertions/deletions**
```cpp
vector<int> v = {1, 2, 3, 4, 5};
v.push_back(6);      // Easy!
v.pop_back();        // Easy!
// Try this with static array...
```

3. **Need STL algorithms**
```cpp
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());           // Sort
reverse(v.begin(), v.end());        // Reverse
unique(v.begin(), v.end());         // Remove duplicates
// Much easier than manual implementation!
```

4. **Safety matters**
```cpp
vector<int> v = {1, 2, 3};
cout << v.at(5);  // Throws exception (safe!)

int arr[3] = {1, 2, 3};
cout << arr[5];   // Undefined behavior (unsafe!)
```

5. **Need to track size**
```cpp
vector<int> v;
v.push_back(10);
v.push_back(20);
cout << v.size();  // 2 (automatic tracking)

int arr[100];
int count = 0;     // Manual tracking required!
arr[0] = 10;
arr[1] = 20;
count = 2;
```

---

## 5. 📊 Performance Comparison

### Benchmark: Adding 1 Million Elements

```cpp
#include <iostream>
#include <vector>
#include <chrono>
using namespace std;
using namespace std::chrono;

int main() {
    // Test 1: Static array
    auto start = high_resolution_clock::now();
    int arr[1000000];
    for(int i = 0; i < 1000000; i++) {
        arr[i] = i;
    }
    auto end = high_resolution_clock::now();
    cout << "Array: " << duration_cast<milliseconds>(end - start).count() << " ms" << endl;
    
    // Test 2: Vector without reserve
    start = high_resolution_clock::now();
    vector<int> v1;
    for(int i = 0; i < 1000000; i++) {
        v1.push_back(i);
    }
    end = high_resolution_clock::now();
    cout << "Vector (no reserve): " << duration_cast<milliseconds>(end - start).count() << " ms" << endl;
    
    // Test 3: Vector with reserve
    start = high_resolution_clock::now();
    vector<int> v2;
    v2.reserve(1000000);
    for(int i = 0; i < 1000000; i++) {
        v2.push_back(i);
    }
    end = high_resolution_clock::now();
    cout << "Vector (with reserve): " << duration_cast<milliseconds>(end - start).count() << " ms" << endl;
    
    return 0;
}
```

**Typical Results**:
```
Array:                2 ms
Vector (no reserve):  8 ms  (4x slower due to resizing)
Vector (with reserve): 3 ms  (almost as fast as array!)
```

**Key Insight**: Using `reserve()` makes vectors nearly as fast as arrays!

---

## 6. 🔄 Migration: Array → Vector

### Converting Array Code to Vector

**Before (Array)**:
```cpp
int arr[100];
int count = 0;

// Add element
if(count < 100) {
    arr[count] = value;
    count++;
}

// Iterate
for(int i = 0; i < count; i++) {
    cout << arr[i] << " ";
}
```

**After (Vector)**:
```cpp
vector<int> v;
v.reserve(100);  // Optional optimization

// Add element
v.push_back(value);  // No size checking needed!

// Iterate
for(int x : v) {
    cout << x << " ";
}
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Using Vector When Array is Better
```cpp
// UNNECESSARY: Size is fixed and known
vector<int> scores = {95, 87, 92, 88, 91};  // Overhead!

// BETTER: Use array
int scores[] = {95, 87, 92, 88, 91};  // No overhead
```

### Mistake 2: Using Array When Vector is Better
```cpp
// DANGEROUS: Unknown number of inputs
int inputs[1000];  // What if more than 1000?
int count = 0;

// SAFER: Use vector
vector<int> inputs;  // Grows automatically
```

### Mistake 3: Not Reserving Vector Size
```cpp
// INEFFICIENT
vector<int> v;
for(int i = 0; i < 100000; i++) {
    v.push_back(i);  // Multiple reallocations!
}

// EFFICIENT
vector<int> v;
v.reserve(100000);  // Allocate once
for(int i = 0; i < 100000; i++) {
    v.push_back(i);  // No reallocations!
}
```

---

## 8. 🎯 Best Practices

### For Arrays:
1. Use for fixed-size data
2. Initialize with zeros: `int arr[100] = {0}`
3. Track size manually
4. Watch bounds carefully
5. Use for performance-critical code

### For Vectors:
1. Use `reserve()` when size is known
2. Pass by reference: `void func(vector<int>& v)`
3. Use `at()` for bounds checking
4. Prefer `push_back()` over `insert()`
5. Use STL algorithms (sort, unique, etc.)
6. Use range-based for loops

---

## 9. 📝 Quick Reference

### Array Syntax
```cpp
// Declaration
int arr[10];
int arr[] = {1, 2, 3};

// Access
arr[0] = 10;

// Size
int size = sizeof(arr) / sizeof(arr[0]);

// Iterate
for(int i = 0; i < size; i++) {
    cout << arr[i] << " ";
}
```

### Vector Syntax
```cpp
// Declaration
vector<int> v;
vector<int> v = {1, 2, 3};

// Access
v[0] = 10;
v.at(0) = 10;  // Safer

// Size
int size = v.size();

// Iterate
for(int x : v) {
    cout << x << " ";
}
```

---

## 10. 🎯 Key Takeaways

1. **Arrays** — Fixed size, faster, less safe
2. **Vectors** — Dynamic size, slightly slower, safer
3. **Use reserve()** — Makes vectors nearly as fast as arrays
4. **Default to vectors** — Unless you have a specific reason for arrays
5. **Know both** — You'll encounter both in real code
6. **Performance difference** — Usually negligible in practice
7. **Safety matters** — Vectors prevent many bugs

---

**Summary**: Use **vectors by default**, use **arrays for optimization**!

[← Back to README](../README.md) | [Next: Two Pointer →](../01_Two_Pointer/Notes.md)

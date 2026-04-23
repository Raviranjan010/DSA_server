# Memory Model — How Arrays Work in RAM

> **What You'll Learn**: How arrays are stored in computer memory, pointer arithmetic, cache locality  
> **Prerequisites**: Array Basics  
> **Time Required**: 1-2 hours

---

## 1. 📌 What is Contiguous Memory?

**Contiguous** means "side-by-side" or "touching". When you declare an array, the computer reserves a **continuous block of memory** for it.

### Real-World Analogy: Parking Lot 🅿️

```
Good (Contiguous):          Bad (Non-contiguous):
[🚗][🚗][🚗][🚗][🚗]       [🚗]  [🚗]    [🚗][🚗]  [🚗]
 Row of 5 cars together     Cars scattered everywhere
 Easy to manage!            Hard to manage!
```

---

## 2. 🎨 Visual Memory Layout

### 1D Array in Memory

```cpp
int arr[5] = {10, 20, 30, 40, 50};

Memory Representation:
┌──────────────────────────────────────────────────────┐
│                    RAM (Simplified)                   │
├──────────────────────────────────────────────────────┤
│ Address │  Value  │  Element  │  Binary (32-bit)     │
├──────────────────────────────────────────────────────┤
│  1000   │   10    │  arr[0]   │  0000000000001010   │
│  1004   │   20    │  arr[1]   │  0000000000010100   │
│  1008   │   30    │  arr[2]   │  0000000000011110   │
│  1012   │   40    │  arr[3]   │  0000000000101000   │
│  1016   │   50    │  arr[4]   │  0000000000110010   │
└──────────────────────────────────────────────────────┘
```

**Key Observation**: Each `int` takes **4 bytes**, so addresses increase by 4.

### Formula for Calculating Address

```
Address of arr[i] = Base Address + (i × Size of Element)

Example: Find address of arr[3]
Base Address = 1000
i = 3
Size of int = 4 bytes

Address = 1000 + (3 × 4) = 1000 + 12 = 1012 ✓
```

---

## 3. 🔍 Pointer Arithmetic and Arrays

In C++, array name is actually a **pointer to the first element**!

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    
    // arr is a pointer to arr[0]
    cout << "arr points to: " << arr << endl;        // 1000 (address)
    cout << "&arr[0] is: " << &arr[0] << endl;       // 1000 (same!)
    
    // Pointer arithmetic
    cout << "*(arr + 0) = " << *(arr + 0) << endl;  // 10 (same as arr[0])
    cout << "*(arr + 1) = " << *(arr + 1) << endl;  // 20 (same as arr[1])
    cout << "*(arr + 2) = " << *(arr + 2) << endl;  // 30 (same as arr[2])
    
    // Show addresses
    cout << "arr + 0 = " << (arr + 0) << endl;  // 1000
    cout << "arr + 1 = " << (arr + 1) << endl;  // 1004 (NOT 1001!)
    cout << "arr + 2 = " << (arr + 2) << endl;  // 1008 (NOT 1002!)
    
    return 0;
}
```

**Why `arr + 1` jumps by 4 bytes?**
- Compiler knows `arr` is `int*` (pointer to int)
- `int` size = 4 bytes
- So `arr + 1` means "go to next int" = jump 4 bytes

💡 **TRICK**: `arr[i]` is exactly the same as `*(arr + i)`!

---

## 4. 📊 Data Type Sizes in Memory

```
Data Type    │ Size (bytes) │ Example Array (5 elements) │ Total Memory
─────────────┼──────────────┼──────────────────────────┼─────────────
char         │      1       │ char arr[5]              │    5 bytes
short        │      2       │ short arr[5]             │   10 bytes
int          │      4       │ int arr[5]               │   20 bytes
long long    │      8       │ long long arr[5]         │   40 bytes
float        │      4       │ float arr[5]             │   20 bytes
double       │      8       │ double arr[5]            │   40 bytes
```

### Code to Check Sizes
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Size of char: " << sizeof(char) << " bytes" << endl;
    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of double: " << sizeof(double) << " bytes" << endl;
    
    int arr[5];
    cout << "Total size of arr[5]: " << sizeof(arr) << " bytes" << endl;  // 20
    cout << "Number of elements: " << sizeof(arr)/sizeof(arr[0]) << endl; // 5
    
    return 0;
}
```

---

## 5. 🏗️ Stack vs Heap Allocation

### Stack Allocation (Static Arrays)
```cpp
void function() {
    int arr[100];  // Stored on STACK
    // Fast allocation, but limited size (~few MB)
    // Automatically freed when function ends
}
```

**Stack Memory**:
- Fast allocation/deallocation
- Limited size (typically 1-8 MB)
- Automatic cleanup
- Local variables

### Heap Allocation (Dynamic Arrays)
```cpp
void function() {
    int* arr = new int[1000000];  // Stored on HEAP
    // Can be very large (GBs)
    // Must manually free with delete[]
    
    delete[] arr;  // IMPORTANT: Free memory!
}
```

**Heap Memory**:
- Slower allocation
- Very large size available
- Manual cleanup required
- Dynamic allocation

### Comparison Table

| Feature | Stack | Heap |
|---------|-------|------|
| Size limit | Small (~MB) | Large (~GB) |
| Speed | Fast | Slower |
| Cleanup | Automatic | Manual (delete[]) |
| Declaration | `int arr[100]` | `new int[100]` |
| Lifetime | Function scope | Until delete |

---

## 6. 🚀 Cache Locality — Why Arrays are Fast

### What is Cache?

CPU has multiple levels of memory (fastest to slowest):
```
Registers (fastest, smallest)
    ↓
L1 Cache (very fast, ~32 KB)
    ↓
L2 Cache (fast, ~256 KB)
    ↓
L3 Cache (moderate, ~8 MB)
    ↓
RAM (slow, ~GB)
```

### Why Arrays Benefit from Cache

```cpp
// GOOD: Sequential access (cache-friendly)
for(int i = 0; i < n; i++) {
    sum += arr[i];  // Accessing consecutive memory
}

// BAD: Random access (cache-unfriendly)
for(int i = 0; i < n; i++) {
    sum += arr[random_index];  // Jumping around in memory
}
```

**Visual Explanation**:
```
When you access arr[0], CPU loads arr[0], arr[1], arr[2], arr[3] into cache

Next access to arr[1]? Already in cache! ⚡ Super fast!
Next access to arr[2]? Already in cache! ⚡ Super fast!

This is called "spatial locality" — nearby data is loaded together
```

💡 **TRICK**: **Arrays are cache-friendly** because contiguous memory means CPU can prefetch data!

---

## 7. 📐 2D Arrays in Memory (Row-Major Order)

### How 2D Arrays are Stored

```cpp
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

Logical View (2D):
┌─────────────────┐
│  1   2   3   4  │  Row 0
│  5   6   7   8  │  Row 1
│  9  10  11  12  │  Row 2
└─────────────────┘

Actual Memory Layout (1D, Row-Major):
[1][2][3][4][5][6][7][8][9][10][11][12]
 ←Row 0→ ←Row 1→  ← Row 2 →
```

**Row-Major Order**: Row by row, left to right

### Address Calculation for 2D Arrays

```
Address of matrix[i][j] = Base Address + ((i × columns + j) × element_size)

Example: Find address of matrix[2][1] (value 10)
Base = 1000
i = 2, j = 1
columns = 4
element_size = 4 bytes

Address = 1000 + ((2 × 4 + 1) × 4)
        = 1000 + (9 × 4)
        = 1000 + 36
        = 1036
```

### Memory Trace
```cpp
#include <iostream>
using namespace std;

int main() {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    // Show that 2D array is actually 1D in memory
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 4; j++) {
            cout << "matrix[" << i << "][" << j << "] = " 
                 << matrix[i][j] << " at address " 
                 << &matrix[i][j] << endl;
        }
    }
    
    return 0;
}
```

---

## 8. ⚠️ Common Memory Mistakes

### Mistake 1: Buffer Overflow
```cpp
int arr[5] = {1, 2, 3, 4, 5};
arr[5] = 10;  // ERROR! Writing beyond array bounds!

// This can:
// - Corrupt other variables
// - Crash the program
// - Create security vulnerabilities
```

✅ **Fix**: Always check bounds: `if(index >= 0 && index < size)`

### Mistake 2: Stack Overflow with Large Arrays
```cpp
void function() {
    int arr[10000000];  // ~40 MB — TOO LARGE for stack!
    // Will crash with "stack overflow"
}

// CORRECT: Use heap for large arrays
void function() {
    int* arr = new int[10000000];  // OK on heap
    // ... use array ...
    delete[] arr;  // Free memory
}
```

### Mistake 3: Memory Leak
```cpp
void function() {
    int* arr = new int[100];
    // ... use array ...
    // FORGOT: delete[] arr;
}
// Memory is now leaked! Cannot be reused.
```

✅ **Fix**: Always pair `new[]` with `delete[]`

### Mistake 4: Dangling Pointer
```cpp
int* createArray() {
    int arr[100];  // Stack array
    return arr;    // ERROR! arr is destroyed when function ends
}

// CORRECT: Use heap
int* createArray() {
    int* arr = new int[100];
    return arr;  // OK — lives on heap
}
```

---

## 9. 💡 Memory Optimization Tips

### Tip 1: Use Smaller Data Types
```cpp
// If values are 0-255, use char instead of int
char small_arr[1000];   // 1000 bytes
int normal_arr[1000];   // 4000 bytes (4× more!)
```

### Tip 2: Process Arrays Sequentially
```cpp
// GOOD: Sequential access (cache-friendly)
for(int i = 0; i < n; i++) {
    process(arr[i]);
}

// BAD: Random access (cache-unfriendly)
for(int i = 0; i < n; i++) {
    process(arr[rand() % n]);
}
```

### Tip 3: Avoid Unnecessary Copies
```cpp
// BAD: Copies entire array
void process(int arr[]) {  // Actually receives pointer, but...
    int copy[1000];
    for(int i = 0; i < 1000; i++) {
        copy[i] = arr[i];  // Unnecessary copy!
    }
}

// GOOD: Work with original
void process(int arr[], int size) {
    // Directly use arr without copying
}
```

---

## 10. 📝 Practice: Visualize Memory

### Exercise 1: Trace This Code
```cpp
int arr[4] = {10, 20, 30, 40};
int* ptr = arr;

cout << *ptr << endl;      // Output: ?
cout << *(ptr + 2) << endl; // Output: ?
cout << ptr[1] << endl;    // Output: ?
```

**Answer**:
```
*ptr = 10 (same as arr[0])
*(ptr + 2) = 30 (same as arr[2])
ptr[1] = 20 (same as arr[1])
```

### Exercise 2: Calculate Addresses
```cpp
double arr[5];  // Base address = 2000
// sizeof(double) = 8 bytes

// What is address of arr[3]?
```

**Answer**:
```
Address = 2000 + (3 × 8) = 2000 + 24 = 2024
```

---

## 11. 🎯 Key Takeaways

1. **Arrays use contiguous memory** — elements stored side-by-side
2. **Address calculation**: `Base + (Index × Element_Size)`
3. **Array name is a pointer** — `arr[i]` equals `*(arr + i)`
4. **Cache locality** — Sequential access is super fast
5. **Stack vs Heap** — Small arrays on stack, large on heap
6. **Watch memory** — Avoid overflow, leaks, and dangling pointers
7. **2D arrays are 1D in memory** — Stored in row-major order

---

## 12. 🎯 What's Next?

Continue your journey:
1. ✅ [Array Basics](Array_Basics.md) — Foundation
2. ✅ **Memory Model** — You are here!
3. ✅ [Indexing and Traversal](Indexing_and_Traversal.md) — Navigation patterns
4. ✅ [Complexity Analysis](Complexity_Analysis.md) — Performance understanding

**Next File**: [Indexing and Traversal](Indexing_and_Traversal.md) →

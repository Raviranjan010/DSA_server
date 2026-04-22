# 📘 ARRAYS — Part 1: Foundations & Memory (Ultra-Deep Notes)

> **Read this file first. Everything builds on these concepts.**  
> **Every single term is explained. Zero assumed knowledge.**

---

## CHAPTER 1: What Exactly IS an Array?

### The Problem Arrays Solve

Imagine you need to store marks of 1000 students. Without arrays:

```cpp
int marks_student1 = 85;
int marks_student2 = 90;
int marks_student3 = 78;
// ... 997 more lines!!!
// How do you find the average? Loop? You can't!
// How do you sort? Impossible!
```

With arrays:
```cpp
int marks[1000];          // One line declares 1000 storage slots
marks[0] = 85;            // Student 1
marks[1] = 90;            // Student 2
// Now you can loop, sort, search — everything!
```

### The Formal Definition

An **array** is a **contiguous** (side-by-side) **block of memory** that stores a **fixed number** of elements, all of the **same data type**.

| Property | Value | Why it matters |
|----------|-------|----------------|
| **Contiguous** | Elements sit next to each other in RAM | Enables O(1) access via formula |
| **Fixed number** | Size decided at creation time | Can't add/remove slots (raw array) |
| **Same type** | All int, or all char, etc. | Each element = same size in bytes |
| **Access Time** | O(1) | Instant direct access |
| **Space** | O(n) | Proportional to number of elements |

### Visual Representation & Memory

```
Array: [10] [20] [30] [40] [50]
Index:  0    1    2    3    4
Memory: |10| |20| |30| |40| |50|

Physical memory (each int takes 4 bytes):
Address: 1000  1004  1008  1012  1016
Value:     10   20   30    40   50
```

### The Magic Formula — Why Access is O(1)

```
To access arr[i]:
    Address = Base_Address + (i × size_of_one_element)

Example: Find address of arr[3]
    Address = 1000 + (3 × 4) = 1012
    
CPU jumps directly to address 1012. Done. No searching. O(1)!
```

---

## CHAPTER 2: Declaration & Initialization

### 2.1 Static Arrays (The C-Style Way)

```cpp
int arr[5] = {1, 2, 3, 4, 5};
```
*Note: Raw arrays don't know their own size and can't be easily copied.*

### 2.2 Modern C++ Arrays (`std::array`)

In modern C++ (C++11+), we prefer `std::array` for fixed sizes. It's safer and supports STL functions.

```cpp
#include <array>
std::array<int, 5> arr = {1, 2, 3, 4, 5};

cout << arr.size(); // It knows its size!
cout << arr.at(2);  // Safer access with bounds checking
```

### 2.3 Dynamic Arrays (`std::vector`)

```cpp
#include<bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    
    // Method 1: Using 'new' (Manual memory management)
    int *arr = new int[n];
    for(int i = 0; i < n; i++) arr[i] = i * 10;
    
    delete[] arr; // MUST free memory to avoid leaks!
    
    // Method 2: Using vector (RECOMMENDED)
    vector<int> v(n); // Automatic memory management
    for(int i = 0; i < n; i++) v[i] = i * 10;
    
    return 0;
}
```

### 2.3 2D Arrays (Matrices)

```cpp
// Static 2D array
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access: row, then column
cout << matrix[1][2]; // Output: 6

// Dynamic 2D array (vector of vectors)
vector<vector<int>> mat(3, vector<int>(3, 0));
```

#### Memory Layout of 2D Arrays
Even though we see 2D arrays as a grid, memory is **1D (linear)**. C++ uses **Row-Major Ordering**:
```
Matrix: [1 2]
        [3 4]

Memory Layout: | 1 | 2 | 3 | 4 |
Index in 1D:     0   1   2   3

Address of mat[i][j] = Base + (i × columns + j) × size

**Column-Major Ordering** (Used in Fortran/MATLAB):
Memory Layout: | 1 | 3 | 2 | 4 | (All elements of Column 0, then Column 1...)
Address of mat[i][j] = Base + (j × rows + i) × size

#### Sparse Matrices
If a 2D array is mostly zeros (e.g., 99% zeros), storing it as a full matrix is a waste of memory. We use **Sparse Matrix** representations (like Coordinate List or CSR) to store only the non-zero elements.
```
*Note: This is why passing 2D arrays to functions requires specifying the number of columns (e.g., `void f(int arr[][10])`).*

#### 3D Arrays (Tensors)
Useful for 3D coordinates or video data (Frames x Height x Width).
```cpp
int cube[3][3][3]; // A 3x3x3 cube of integers
```

---

## CHAPTER 3: Array & Pointer Arithmetic (The "Under the Hood" Secret)

In C++, an array name is essentially a **pointer to its first element**.

```cpp
int arr[] = {10, 20, 30};
// arr      points to 10
// arr + 1  points to 20
// arr + 2  points to 30

// Therefore:
arr[i]  is EXACTLY the same as  *(arr + i)
```

**Mastery Tip**: This is why arrays are 0-indexed! The index represents the **offset** from the base address. `arr[0]` means "offset of 0 units from the start".

---

## CHAPTER 4: Why are Arrays so FAST? (Cache Locality)

This is the most important concept for high-performance coding.

1. **Spatial Locality**: When the CPU fetches `arr[0]` from RAM, it doesn't just grab one int. It grabs a whole **Cache Line** (usually 64 bytes).
2. **The Result**: Because array elements are side-by-side, when you access `arr[0]`, `arr[1]` to `arr[15]` are already pre-loaded into the super-fast **CPU Cache**.
3. **Linked Lists vs Arrays**: Linked list nodes are scattered in memory. Accessing the next node often causes a "Cache Miss" (slow RAM trip). Arrays get "Cache Hits" (lightning fast).

---

## CHAPTER 5: Core Array Operations

### 3.1 Traversal
```cpp
int arr[5] = {10, 20, 30, 40, 50};

// Method 1: Classic for loop
for(int i = 0; i < 5; i++) cout << arr[i] << " ";

// Method 2: Range-based for loop (C++11)
for(int x : arr) cout << x << " ";

// Method 3: While loop
int i = 0; while(i < 5) { cout << arr[i] << " "; i++; }
```

### 3.2 Insertion & Deletion (O(n))
```cpp
// Insert value at position pos
void insertElement(int arr[], int &n, int pos, int value){
    for(int i = n; i > pos; i--) arr[i] = arr[i - 1]; // Shift right
    arr[pos] = value;
    n++;
}

// Delete element at position pos
void deleteElement(int arr[], int &n, int pos){
    for(int i = pos; i < n - 1; i++) arr[i] = arr[i + 1]; // Shift left
    n--;
}
```

---

## CHAPTER 4: Searching Algorithms

### 4.1 Linear Search (O(n))
Best for unsorted or small arrays.
```cpp
int linearSearch(int arr[], int n, int x){
    for(int i = 0; i < n; i++) if(arr[i] == x) return i;
    return -1;
}
```

### 4.2 Binary Search (O(log n))
**Requirement**: Array must be SORTED.
```cpp
int binarySearch(int arr[], int n, int x){
    int left = 0, right = n - 1;
    while(left <= right){
        int mid = left + (right - left) / 2; // Avoid overflow
        if(arr[mid] == x) return mid;
        else if(arr[mid] < x) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

---

## CHAPTER 5: Sorting Algorithms Reference

### 5.1 Basic Sorting (O(n²))
| Algorithm | Best | Avg | Space | Stable |
|-----------|------|-----|-------|--------|
| **Bubble**| O(n) | O(n²)| O(1) | Yes |
| **Selection**| O(n²)| O(n²)| O(1) | No |
| **Insertion**| O(n) | O(n²)| O(1) | Yes |

```cpp
// Bubble Sort: Swap adjacent elements if they are in wrong order
void bubbleSort(int arr[], int n){
    for(int i = 0; i < n - 1; i++){
        bool swapped = false;
        for(int j = 0; j < n - i - 1; j++){
            if(arr[j] > arr[j + 1]){
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if(!swapped) break; // Optimization
    }
}
```

### 5.2 Advanced Sorting (O(n log n))
| Algorithm | Avg | Worst | Space | Stable |
|-----------|-----|-------|-------|--------|
| **Merge** | O(n log n)| O(n log n)| O(n) | Yes |
| **Quick** | O(n log n)| O(n²) | O(log n)| No |

```cpp
// Built-in sort (BEST FOR COMPETITIVE PROGRAMMING)
sort(arr, arr + n); // Ascending
sort(arr, arr + n, greater<int>()); // Descending
```

---

## CHAPTER 6: Memory Management (Stack vs Heap)

| Feature | Stack Memory | Heap Memory |
|---------|--------------|-------------|
| **Speed** | Extremely Fast | Slower (OS call) |
| **Size** | Small (1-8 MB) | Large (GBs) |
| **Management**| Automatic | Manual (or via Vector) |
| **Access** | Local variables | `new` / Dynamic |

**The CP Rule**: If array size `n > 10,000`, declare it **globally** or use `std::vector` to avoid **Stack Overflow**.

---

## CHAPTER 7: The #1 Mistake — Out of Bounds Access

```cpp
vector<int> v = {1, 2, 3};

// ❌ WRONG: i <= size
for(int i = 0; i <= v.size(); i++) cout << v[i]; // Crashes at i=3!

// ✅ CORRECT: i < size
for(int i = 0; i < v.size(); i++) cout << v[i];
```

---

*Next → `02_arrays_patterns.md` — All algorithmic patterns with deep explanations*
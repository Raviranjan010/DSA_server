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

Let's break each word:

| Word | Meaning | Why it matters |
|------|---------|----------------|
| **Contiguous** | Elements sit next to each other in RAM | Enables O(1) access via formula |
| **Fixed number** | Size decided at creation time | Can't add/remove slots (raw array) |
| **Same data type** | All int, or all char, or all float | Each element = same size in bytes |

### The Physical Picture in RAM

```
RAM is like a giant row of mailboxes, each holding 1 byte.
When you declare: int arr[5] = {10, 20, 30, 40, 50};

Physical memory (each int takes 4 bytes):

Address: 1000  1001  1002  1003  | 1004  1005  1006  1007  | ...
         [       arr[0] = 10    ] [       arr[1] = 20    ]
         
Address: 1008  1009  1010  1011  | 1012  1013  1014  1015  | 1016...1019
         [       arr[2] = 30    ] [       arr[3] = 40    ]  [arr[4]=50]

Simplified view:
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   arr[0]    │   arr[1]    │   arr[2]    │   arr[3]    │   arr[4]    │
│     10      │     20      │     30      │     40      │     50      │
│  @addr 1000 │  @addr 1004 │  @addr 1008 │  @addr 1012 │  @addr 1016 │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
     index 0       index 1       index 2       index 3       index 4
```

### The Magic Formula — Why Access is O(1)

```
To access arr[i]:
    Address = Base_Address + (i × size_of_one_element)

Example: Find address of arr[3]
    Address = 1000 + (3 × 4)
    Address = 1000 + 12
    Address = 1012
    
    CPU jumps directly to address 1012. Done. No searching. O(1)!

This formula works for ANY i — whether i=0 or i=999999.
The time is always the same: one multiplication + one addition.
THAT is why array access is O(1).
```

---

## CHAPTER 2: Arrays in C++ — Every Way to Declare and Use

### 2.1 Raw C-Style Arrays

```cpp
#include <iostream>
using namespace std;

int main() {
    // ─────────────────────────────────────────────────────────
    // METHOD 1: Declare first, fill later
    // ─────────────────────────────────────────────────────────
    int arr1[5];           // Creates 5 slots. Values are GARBAGE (random)!
    arr1[0] = 10;          // Now safe to assign
    arr1[1] = 20;
    // arr1[2], arr1[3], arr1[4] still hold garbage values!
    
    // ─────────────────────────────────────────────────────────
    // METHOD 2: Declare and initialize together
    // ─────────────────────────────────────────────────────────
    int arr2[5] = {10, 20, 30, 40, 50};   // All 5 slots filled
    
    // ─────────────────────────────────────────────────────────
    // METHOD 3: Let compiler count the size
    // ─────────────────────────────────────────────────────────
    int arr3[] = {1, 2, 3, 4, 5};         // Size = 5, compiler figures it out
    
    // ─────────────────────────────────────────────────────────
    // METHOD 4: Initialize all to ZERO
    // ─────────────────────────────────────────────────────────
    int arr4[5] = {0};                     // {0, 0, 0, 0, 0}
    int arr5[5] = {};                      // Also {0, 0, 0, 0, 0}
    
    // ─────────────────────────────────────────────────────────
    // METHOD 5: Partial initialization (rest become ZERO)
    // ─────────────────────────────────────────────────────────
    int arr6[5] = {10, 20};               // {10, 20, 0, 0, 0}
    //                                         ↑↑  auto-zeroed!
    
    // ─────────────────────────────────────────────────────────
    // ACCESSING elements:
    // ─────────────────────────────────────────────────────────
    cout << arr2[0] << endl;   // 10  (FIRST element, index 0)
    cout << arr2[4] << endl;   // 50  (LAST element, index n-1)
    // cout << arr2[5];        // DANGER! Index 5 doesn't exist → undefined behavior
    
    // ─────────────────────────────────────────────────────────
    // MODIFYING elements:
    // ─────────────────────────────────────────────────────────
    arr2[2] = 99;              // Change 30 → 99
    
    // ─────────────────────────────────────────────────────────
    // Getting SIZE of raw array (only works if array is in scope):
    // ─────────────────────────────────────────────────────────
    int size = sizeof(arr2) / sizeof(arr2[0]);
    // sizeof(arr2) = 5 * 4 = 20 bytes
    // sizeof(arr2[0]) = 4 bytes (one int)
    // 20 / 4 = 5 ← correct size!
    cout << "Size: " << size << endl;  // 5
    
    return 0;
}
```

### 2.2 The Critical Index Rule

```
Array of SIZE n:
    Valid indices: 0, 1, 2, ..., n-1
    LAST valid index: n-1  (NOT n!)
    
    arr[n]  ← OUT OF BOUNDS! UNDEFINED BEHAVIOR!
              May crash, may give garbage, may seem to work (worst case!)

Example with n=5:
    arr[0] ✅   arr[1] ✅   arr[2] ✅   arr[3] ✅   arr[4] ✅
    arr[5] ❌   arr[-1] ❌  arr[100] ❌
```

### 2.3 Traversal (Visiting Every Element)

```cpp
int arr[] = {10, 20, 30, 40, 50};
int n = 5;

// ── WAY 1: Classic for loop (most control) ─────────────────
for(int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}
// Output: 10 20 30 40 50

// ── WAY 2: Range-based for (C++11, cleanest) ───────────────
for(int x : arr) {
    cout << x << " ";
}
// Output: 10 20 30 40 50

// ── WAY 3: Range-based with modification (use &) ───────────
for(int& x : arr) {
    x = x * 2;     // DOUBLES every element
}
// arr is now: 20 40 60 80 100

// ── WAY 4: Reverse traversal ───────────────────────────────
for(int i = n-1; i >= 0; i--) {
    cout << arr[i] << " ";
}
// Output: 100 80 60 40 20  (after doubling)

// ── WAY 5: Every other element ─────────────────────────────
for(int i = 0; i < n; i += 2) {
    cout << arr[i] << " ";
}
// Output: 20 60 100  (indices 0, 2, 4)
```

---

## CHAPTER 3: Vectors — The BETTER Array (Use This Always!)

### 3.1 Why Raw Arrays Have Problems

```cpp
// PROBLEM 1: Fixed size — you must know size at compile time
int arr[5];          // OK, size known
int arr[n];          // Sometimes works (VLA), but dangerous and non-standard

// PROBLEM 2: Can't resize
int arr[5] = {1,2,3,4,5};
// Need to add a 6th element? You can't. Must create new array.

// PROBLEM 3: No bounds checking
arr[100] = 5;        // Compiles! But crashes or corrupts memory at runtime.

// PROBLEM 4: Decays to pointer in functions
void func(int arr[]) {
    cout << sizeof(arr);  // Prints 8 (pointer size), NOT array size!
}

// PROBLEM 5: No built-in size tracking
int arr[5];
// How big is this? You must manually track n=5 separately.
```

### 3.2 What is a Vector?

A `vector` is a **dynamic array** — it can grow and shrink automatically. It lives in the **heap** (safe for large sizes), tracks its own size, and works with all C++ algorithms.

Think of it as: **array + smart wrapper that handles all the annoying stuff**.

```cpp
#include <vector>       // Must include this!
#include <iostream>
#include <algorithm>    // For sort, reverse, etc.
using namespace std;

int main() {
    // ═══════════════════════════════════════════════════════
    // DECLARATION — Multiple Ways
    // ═══════════════════════════════════════════════════════
    
    vector<int> v1;                    // Empty vector. Size=0, Capacity=0
    vector<int> v2(5);                 // 5 elements, all = 0:  {0,0,0,0,0}
    vector<int> v3(5, 7);              // 5 elements, all = 7:  {7,7,7,7,7}
    vector<int> v4 = {10, 20, 30};     // Initialized with values
    vector<int> v5{10, 20, 30};        // Same, C++11 style
    
    // Copying
    vector<int> v6(v4);                // v6 is a COPY of v4
    vector<int> v7(v4.begin(), v4.end()); // Copy using iterators
    
    // From raw array
    int raw[] = {1, 2, 3, 4, 5};
    vector<int> v8(raw, raw + 5);      // v8 = {1,2,3,4,5}
    
    // ═══════════════════════════════════════════════════════
    // SIZE & CAPACITY — Very Important Distinction!
    // ═══════════════════════════════════════════════════════
    
    vector<int> v = {10, 20, 30};
    
    cout << v.size();      // 3  — HOW MANY elements currently
    cout << v.capacity();  // ≥3 — HOW MANY elements it CAN hold without realloc
    cout << v.empty();     // 0 (false) — Is it empty?
    
    // ═══════════════════════════════════════════════════════
    // ADDING ELEMENTS
    // ═══════════════════════════════════════════════════════
    
    v.push_back(40);       // Add to END:  {10, 20, 30, 40}   O(1) amortized
    v.push_back(50);       // Add to END:  {10, 20, 30, 40, 50}
    
    // Insert at specific position (expensive!)
    v.insert(v.begin(), 5);      // Insert 5 at FRONT:  {5,10,20,30,40,50} O(n)
    v.insert(v.begin()+2, 99);   // Insert 99 at index 2                    O(n)
    
    // ═══════════════════════════════════════════════════════
    // REMOVING ELEMENTS
    // ═══════════════════════════════════════════════════════
    
    v.pop_back();           // Remove LAST element              O(1)
    v.erase(v.begin());     // Remove FIRST element (shifts!)   O(n)
    v.erase(v.begin()+2);   // Remove element at index 2        O(n)
    
    // Remove ALL elements
    v.clear();              // Size becomes 0, capacity unchanged O(n)
    
    // ═══════════════════════════════════════════════════════
    // ACCESSING ELEMENTS
    // ═══════════════════════════════════════════════════════
    
    vector<int> nums = {10, 20, 30, 40, 50};
    
    cout << nums[2];         // 30  — NO bounds check, fast, can crash!
    cout << nums.at(2);      // 30  — WITH bounds check, throws exception if OOB
    cout << nums.front();    // 10  — First element
    cout << nums.back();     // 50  — Last element
    
    // ═══════════════════════════════════════════════════════
    // RESIZING
    // ═══════════════════════════════════════════════════════
    
    nums.resize(7);          // {10,20,30,40,50, 0, 0}  new elements = 0
    nums.resize(7, 99);      // {10,20,30,40,50,99,99}  new elements = 99
    nums.resize(3);          // {10,20,30}               shrinks, extra removed
    nums.reserve(100);       // Allocates capacity for 100, but size unchanged!
                             // Avoids repeated reallocation during push_backs
    
    // ═══════════════════════════════════════════════════════
    // SORTING & REVERSING (from <algorithm>)
    // ═══════════════════════════════════════════════════════
    
    vector<int> a = {5, 2, 8, 1, 9, 3};
    
    sort(a.begin(), a.end());                    // Ascending:  {1,2,3,5,8,9}
    sort(a.begin(), a.end(), greater<int>());    // Descending: {9,8,5,3,2,1}
    reverse(a.begin(), a.end());                 // Flip order
    
    // ═══════════════════════════════════════════════════════
    // FINDING & COUNTING
    // ═══════════════════════════════════════════════════════
    
    vector<int> b = {3, 1, 4, 1, 5, 9, 2, 6};
    
    // find returns ITERATOR (pointer-like thing) to element, or end() if not found
    auto it = find(b.begin(), b.end(), 5);
    if(it != b.end()) {
        cout << "Found 5 at index: " << (it - b.begin()) << endl;  // 4
    }
    
    cout << count(b.begin(), b.end(), 1) << endl;   // 2 (1 appears twice)
    cout << *max_element(b.begin(), b.end()) << endl; // 9
    cout << *min_element(b.begin(), b.end()) << endl; // 1
    
    // Binary search (only on SORTED arrays!)
    sort(b.begin(), b.end());   // {1,1,2,3,4,5,6,9}
    cout << binary_search(b.begin(), b.end(), 5);    // 1 (true, found)
    cout << binary_search(b.begin(), b.end(), 7);    // 0 (false, not found)
    
    return 0;
}
```

### 3.3 How Vectors Grow — Amortized O(1) Explained

This is a concept many students skip but interviewers ask!

```
When you call push_back() and vector is FULL, it:
1. Allocates a NEW, BIGGER array (usually 2x the size)
2. Copies ALL old elements to new array
3. Deletes old array
4. Adds new element

This copy is O(n) — but it happens RARELY!

Let's trace pushing 8 elements into empty vector:

Push 1: capacity=1, size=1, copy=0
Push 2: FULL! New cap=2, copy 1 element. size=2, copy=1
Push 3: FULL! New cap=4, copy 2 elements. size=3, copy=2
Push 4: size=4 (cap=4, not full yet), copy=0
Push 5: FULL! New cap=8, copy 4 elements. size=5, copy=4
Push 6: size=6 (cap=8), copy=0
Push 7: size=7 (cap=8), copy=0
Push 8: size=8 (cap=8), copy=0

Total copies = 0+1+2+0+4+0+0+0 = 7 for 8 push_backs
Average copies per push_back = 7/8 < 1 = O(1) amortized!

The expensive copies (doubling) happen so rarely that the average is constant.
This is called AMORTIZED O(1).
```

### 3.4 2D Vectors (Matrix)

```cpp
// 2D vector = vector of vectors
// Think of it as rows of arrays

// ── Create 3×4 matrix filled with 0 ───────────────────────
vector<vector<int>> mat(3, vector<int>(4, 0));
// mat:
// [0, 0, 0, 0]
// [0, 0, 0, 0]
// [0, 0, 0, 0]

// ── Access ─────────────────────────────────────────────────
mat[1][2] = 99;     // Row 1, Column 2
cout << mat[1][2];  // 99

// ── Traverse ───────────────────────────────────────────────
int rows = mat.size();            // 3
int cols = mat[0].size();         // 4

for(int i = 0; i < rows; i++) {
    for(int j = 0; j < cols; j++) {
        cout << mat[i][j] << " ";
    }
    cout << endl;
}

// ── Initialize with values ─────────────────────────────────
vector<vector<int>> grid = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
cout << grid[2][1];  // 8 (row 2, column 1)
```

---

## CHAPTER 4: Stack vs Heap — Where Does Your Array Live?

```
STACK MEMORY:
├── Fast to allocate/deallocate
├── Limited size (usually 1-8 MB total)
├── Automatically managed (freed when function returns)
└── Local variables live here

    void func() {
        int arr[5];       ← On STACK. 5 × 4 = 20 bytes
        int arr2[1000000] ← DANGER! 4MB on stack → CRASH! Stack overflow!
    }

HEAP MEMORY:
├── Slower to allocate (needs OS call)
├── Very large (limited by RAM, usually GBs)
├── Must manually manage (or use smart pointers/vector)
└── new/delete, and vector uses this

    // Using new (manual management):
    int* arr = new int[1000000];  ← 4MB on HEAP, safe!
    // ... use arr ...
    delete[] arr;                  ← MUST delete or memory leak!
    
    // Using vector (automatic, preferred):
    vector<int> arr(1000000);      ← 4MB on HEAP, auto-freed!
    // No need to delete — vector's destructor handles it

GLOBAL/STATIC MEMORY:
├── Exists for entire program lifetime  
├── Larger limit than stack
└── Initialized to 0 automatically

    int arr[1000000];   ← Outside main(), safe and auto-zeroed
    int main() { ... }
```

**THE RULE FOR COMPETITIVE PROGRAMMING:**
```cpp
// If n > 10,000 → declare globally or use vector
int arr[100005];   // Global — safe, auto-zeroed, fast
int main() {
    int n;
    cin >> n;
    // use arr[0..n-1]
}
```

---

## CHAPTER 5: Complete Operations with Code

### 5.1 Insert at Position

```cpp
// Insert value at index 'pos' in array of current size 'n'
// Array must have extra space (size at least n+1)
void insertAt(int arr[], int& n, int pos, int value) {
    // Step 1: Shift elements right from pos to n-1
    // Must go RIGHT to LEFT to avoid overwriting!
    for(int i = n; i > pos; i--) {
        arr[i] = arr[i-1];    // Each element moves one step right
    }
    
    // Step 2: Place new value
    arr[pos] = value;
    n++;   // Increment size
}

// Example:
// arr = [10, 20, 30, 40, 50, _], n=5, insert 99 at pos=2
// 
// i=5: arr[5] = arr[4] = 50  → [10, 20, 30, 40, 50, 50]
// i=4: arr[4] = arr[3] = 40  → [10, 20, 30, 40, 40, 50]
// i=3: arr[3] = arr[2] = 30  → [10, 20, 30, 30, 40, 50]
// Place: arr[2] = 99          → [10, 20, 99, 30, 40, 50] ✓
//
// Time: O(n) — shift n-pos elements
// Space: O(1) — in-place
```

### 5.2 Delete at Position

```cpp
void deleteAt(int arr[], int& n, int pos) {
    // Shift elements LEFT from pos+1 to n-1
    for(int i = pos; i < n-1; i++) {
        arr[i] = arr[i+1];
    }
    n--;   // Decrease size
}

// Example:
// arr = [10, 20, 30, 40, 50], n=5, delete at pos=2
//
// i=2: arr[2] = arr[3] = 40  → [10, 20, 40, 40, 50]
// i=3: arr[3] = arr[4] = 50  → [10, 20, 40, 50, 50]
// n = 4                       → logically: [10, 20, 40, 50]
```

### 5.3 Linear Search (Find Element)

```cpp
// Returns index of target, or -1 if not found
int linearSearch(vector<int>& arr, int target) {
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] == target) {
            return i;     // Found! Return index
        }
    }
    return -1;            // Not found
}

// Full example with dry run:
// arr = [5, 8, 2, 9, 1, 7], target = 9
//
// i=0: arr[0]=5, 5≠9, continue
// i=1: arr[1]=8, 8≠9, continue
// i=2: arr[2]=2, 2≠9, continue
// i=3: arr[3]=9, 9==9, return 3 ✓
//
// BEST case:  O(1)  — target is at index 0
// WORST case: O(n)  — target is last or not present
// AVERAGE:    O(n/2) = O(n)
```

### 5.4 Reverse Array

```cpp
void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while(left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}

// Dry Run on [1, 2, 3, 4, 5]:
//
// Step 1: left=0, right=4, swap arr[0]↔arr[4] → [5, 2, 3, 4, 1]
// Step 2: left=1, right=3, swap arr[1]↔arr[3] → [5, 4, 3, 2, 1]
// Step 3: left=2, right=2, left >= right → STOP
//
// Result: [5, 4, 3, 2, 1] ✓
// Total swaps: n/2 = 2 (for n=5)
// Time: O(n), Space: O(1)
```

### 5.5 Find Second Largest

```cpp
// Common mistake: sorting (O(n log n)) — unnecessary!
// Better: two-pass O(n)

int secondLargest(vector<int>& arr) {
    if(arr.size() < 2) return -1;   // Edge case
    
    int first = INT_MIN, second = INT_MIN;
    
    for(int x : arr) {
        if(x > first) {
            second = first;    // Old first becomes second
            first = x;         // New first
        } else if(x > second && x != first) {
            second = x;        // New second (not equal to first)
        }
    }
    
    return (second == INT_MIN) ? -1 : second;  // -1 if all same
}

// Dry Run on [3, 1, 4, 1, 5, 9, 2, 6]:
// Start: first=INT_MIN, second=INT_MIN
//
// x=3: 3>INT_MIN → second=INT_MIN, first=3
// x=1: 1<3, 1>INT_MIN, 1≠3 → second=1
// x=4: 4>3 → second=3, first=4
// x=1: 1<4, 1<3 → nothing
// x=5: 5>4 → second=4, first=5
// x=9: 9>5 → second=5, first=9
// x=2: 2<9, 2<5 → nothing
// x=6: 6<9, 6>5, 6≠9 → second=6
//
// Return second=6. Answer: 6 ✓
```

### 5.6 Left Rotate by k Positions

```cpp
// Rotate [1,2,3,4,5] left by 2 → [3,4,5,1,2]

// METHOD 1: Using extra array — O(n) time, O(n) space
vector<int> rotateLeftExtra(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;   // Handle k > n (rotating by n = no change)
    
    vector<int> result;
    // First, elements from index k to n-1
    for(int i = k; i < n; i++) result.push_back(arr[i]);
    // Then, elements from index 0 to k-1
    for(int i = 0; i < k; i++) result.push_back(arr[i]);
    return result;
}

// METHOD 2: Reversal trick — O(n) time, O(1) space
// Left rotate by k = Right rotate by (n-k)
// Formula: reverse(0, k-1) → reverse(k, n-1) → reverse all
void rotateLeft(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;
    if(k == 0) return;
    
    reverse(arr.begin(), arr.begin() + k);      // Reverse first k elements
    reverse(arr.begin() + k, arr.end());         // Reverse remaining
    reverse(arr.begin(), arr.end());              // Reverse entire array
}

// Dry Run on [1,2,3,4,5], k=2:
// Step 1: Reverse [1,2] → [2,1,3,4,5]
// Step 2: Reverse [3,4,5] → [2,1,5,4,3]
// Step 3: Reverse all → [3,4,5,1,2] ✓
```

---

## CHAPTER 6: Complexity Summary Table

```
┌────────────────────────────┬──────────────┬───────────┬─────────────────────────┐
│ Operation                  │ Time         │ Space     │ Key Insight             │
├────────────────────────────┼──────────────┼───────────┼─────────────────────────┤
│ Access by index            │ O(1)         │ O(1)      │ Direct formula          │
│ Update by index            │ O(1)         │ O(1)      │ Direct assignment       │
│ Traversal (all elements)   │ O(n)         │ O(1)      │ Visit each once         │
│ Search (unsorted)          │ O(n)         │ O(1)      │ May need to check all   │
│ Search (sorted binary)     │ O(log n)     │ O(1)      │ Halve each time         │
│ Insert at END              │ O(1)         │ O(1)      │ No shifting needed      │
│ Insert at START            │ O(n)         │ O(1)      │ Shift ALL right         │
│ Insert at middle (index i) │ O(n-i)       │ O(1)      │ Shift n-i elements      │
│ Delete at END              │ O(1)         │ O(1)      │ Just decrease counter   │
│ Delete at START            │ O(n)         │ O(1)      │ Shift ALL left          │
│ Delete at middle           │ O(n-i)       │ O(1)      │ Shift remaining left    │
│ Reverse                    │ O(n)         │ O(1)      │ n/2 swaps               │
│ Sort (comparison-based)    │ O(n log n)   │ O(log n)  │ Mathematical lower bound│
│ Sort (counting/radix)      │ O(n+k)       │ O(k)      │ Non-comparison sort     │
│ Build prefix sum           │ O(n)         │ O(n)      │ Single pass             │
│ Range query after prefix   │ O(1)         │ O(1)      │ Precomputed answer      │
│ Copy entire array          │ O(n)         │ O(n)      │ New allocation          │
│ Merge two sorted arrays    │ O(n+m)       │ O(n+m)    │ Two pointers            │
│ push_back (vector)         │ O(1) amort.  │ -         │ Doubles capacity rarely │
└────────────────────────────┴──────────────┴───────────┴─────────────────────────┘
```

**Constraint Guide for Competitive Programming:**
```
n ≤ 100       → O(n³) is fine (~10^6 operations)
n ≤ 1,000     → O(n²) is fine (~10^6 operations)
n ≤ 10,000    → O(n²) is fine (~10^8, borderline)
n ≤ 100,000   → Need O(n log n) or better
n ≤ 1,000,000 → Need O(n) or O(n log n) max
n ≤ 10^9      → Need O(log n) or O(1)
```

---

## CHAPTER 7: The #1 Mistake — Out of Bounds Access

```cpp
// This is the most common bug in array problems!

// ── MISTAKE 1: Off-by-one in loop condition ────────────────
vector<int> v = {1, 2, 3, 4, 5};

for(int i = 0; i <= v.size(); i++) {    // ❌ WRONG: i <= size
    cout << v[i];                        // Crashes when i=5!
}
for(int i = 0; i < v.size(); i++) {     // ✅ CORRECT: i < size
    cout << v[i];
}

// ── MISTAKE 2: Unsigned subtraction trap ──────────────────
// v.size() returns size_t, which is UNSIGNED
// Unsigned: 0 - 1 = 4294967295 (wraps around!)

if(v.size() - 1 >= 0) {     // ❌ ALWAYS TRUE! size_t is unsigned
    // Dangerous!
}
int n = v.size();             // ✅ Cast to int first
if(n - 1 >= 0) {              // Safe comparison

// ── MISTAKE 3: Empty array ────────────────────────────────
vector<int> empty;
cout << empty[0];             // ❌ CRASH! Empty vector
cout << empty.front();        // ❌ CRASH! Same

if(!empty.empty()) {          // ✅ Always check first
    cout << empty[0];
}

// ── MISTAKE 4: Iterator invalidation ─────────────────────
vector<int> nums = {1,2,3,4,5};
for(auto it = nums.begin(); it != nums.end(); it++) {
    if(*it == 3) nums.push_back(99);  // ❌ push_back may reallocate!
    // Iterator now points to freed memory → undefined behavior
}
```

---

*Next → `02_arrays_patterns.md` — All 8 algorithmic patterns with deep explanations*
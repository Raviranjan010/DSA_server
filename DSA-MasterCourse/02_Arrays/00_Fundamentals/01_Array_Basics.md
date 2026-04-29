# Array Basics — Complete Beginner's Guide

> **What You'll Learn**: What arrays are, how they work, and why they're fundamental to programming  
> **Prerequisites**: Basic C++ syntax (variables, loops) from Topic 00  
> **Time Required**: 2-3 hours  
> **Importance**: 🌟🌟🌟🌟🌟 (Foundation of all data structures)

---

## 1. 📌 What is an Array? (Simple Definition)

An **array** is a collection of items stored in **contiguous (side-by-side) memory locations**, where each item can be accessed using an **index number**.

Think of it as a **row of lockers** in a school:
- Each locker has a **number** (index)
- All lockers are **the same size**
- Lockers are **next to each other** (contiguous)
- You can **quickly find** any locker if you know its number

**Key Properties**:
1. **Fixed size** (for static arrays) — size determined at creation
2. **Same data type** — all elements must be the same type (all integers, all characters, etc.)
3. **Contiguous memory** — elements stored one after another
4. **Fast access** — O(1) time to access any element by index

---

## 2. 🌍 Real-World Analogies

### Analogy 1: Egg Carton 🥚

```
┌───┬───┬───┬───┬───┬───┐
│ 🥚│ 🥚│ 🥚│ 🥚│ 🥚│ 🥚│  ← 6 eggs (elements)
└───┴───┴───┴───┴───┴───┘
  0   1   2   3   4   5    ← Position numbers (indices)
```

- Carton holds **exactly 6 eggs** (fixed size)
- All slots are **identical** (same data type)
- Slots are **arranged in a row** (contiguous)
- You say "give me egg #3" (indexing)

### Analogy 2: Apartment Building 🏢

```
Floor 5: [501] [502] [503] [504] [505]
Floor 4: [401] [402] [403] [404] [405]
Floor 3: [301] [302] [303] [304] [305]
Floor 2: [201] [202] [203] [204] [205]
Floor 1: [101] [102] [103] [104] [105]
```

- Each apartment has a **unique number**
- Apartments are **numbered systematically**
- You can **directly go** to apartment 305 without checking others
- **Same structure** for all apartments

---

## 3. 🎨 Visual Diagram: Memory Layout

### How Arrays Look in Computer Memory

```
Declaration: int arr[5] = {10, 20, 30, 40, 50};

Memory Addresses (simplified):
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│   10    │   20    │   30    │   40    │   50    │  ← Values
└─────────┴─────────┴─────────┴─────────┴─────────┘
  1000      1004      1008      1012      1016     ← Memory Addresses
   [0]       [1]       [2]       [3]       [4]     ← Indices
```

**Why addresses increase by 4?**
- Each `int` takes **4 bytes** in C++
- Address of `arr[i]` = Base Address + (i × size of element)
- Example: `arr[2]` = 1000 + (2 × 4) = 1008

💡 **TRICK**: Array indexing is just **math**! The computer calculates: `Address = Start + (Index × Element_Size)`

---

## 4. 📋 Array Declaration in C++

### Method 1: Declare without initializing
```cpp
int arr[5];  // Creates array with 5 integers (garbage values)
```

### Method 2: Declare and initialize
```cpp
int arr[5] = {10, 20, 30, 40, 50};  // Explicit size
```

### Method 3: Let compiler count elements
```cpp
int arr[] = {10, 20, 30, 40, 50};  // Compiler knows size is 5
```

### Method 4: Initialize with zeros
```cpp
int arr[5] = {0};  // All elements become 0
// Or
int arr[5] = {};   // Same effect
```

### Complete Example with Explanation
```cpp
#include <iostream>
using namespace std;

int main() {
    // Declare array of 5 integers
    int marks[5] = {85, 92, 78, 90, 88};
    
    // Access elements (0-indexed!)
    cout << "First mark: " << marks[0] << endl;    // 85
    cout << "Third mark: " << marks[2] << endl;    // 78
    cout << "Last mark: " << marks[4] << endl;     // 88
    
    // Modify elements
    marks[2] = 82;  // Change 78 to 82
    cout << "New third mark: " << marks[2] << endl; // 82
    
    // Get array size
    int size = sizeof(marks) / sizeof(marks[0]);
    cout << "Array size: " << size << endl;  // 5
    
    return 0;
}
```

---

## 5. 🔑 0-Based Indexing Explained

### Why Start at 0? (Not 1!)

**Historical Reason**: In C/C++, an array name is actually a **pointer to the first element**.

```
Array: int arr[5] = {10, 20, 30, 40, 50};

arr is a pointer to address 1000

arr[0] means: *(arr + 0) → Go to address 1000 + (0×4) = 1000 → Get value 10
arr[1] means: *(arr + 1) → Go to address 1000 + (1×4) = 1004 → Get value 20
arr[2] means: *(arr + 2) → Go to address 1000 + (2×4) = 1008 → Get value 30
```

**Visual Explanation**:
```
Think of array name as "starting point":
arr → points to beginning

To get element, you say "how many steps from start":
0 steps → first element
1 step  → second element
2 steps → third element
```

### Step-by-Step Trace: Accessing Elements

```cpp
int arr[5] = {10, 20, 30, 40, 50};
// Index:   0    1    2    3    4

// Access arr[2]:
// Step 1: Start at arr (address 1000)
// Step 2: Calculate offset: 2 × 4 bytes = 8 bytes
// Step 3: Go to address 1000 + 8 = 1008
// Step 4: Read value at 1008 → 30
```

---

## 6. 📚 Basic Array Operations

### Operation 1: Access (Read)
**Time Complexity**: O(1) — Instant!

```cpp
int arr[5] = {10, 20, 30, 40, 50};
int value = arr[3];  // Directly get 40 — no searching needed!
```

### Operation 2: Update (Modify)
**Time Complexity**: O(1) — Instant!

```cpp
int arr[5] = {10, 20, 30, 40, 50};
arr[2] = 35;  // Change 30 to 35 — direct access!
// Array becomes: {10, 20, 35, 40, 50}
```

### Operation 3: Insert (at end)
**Time Complexity**: O(1) — If space available

```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[10] = {10, 20, 30};  // Size 10, but only 3 elements used
    int count = 3;  // Track how many elements are actually used
    
    // Insert 40 at the end
    arr[count] = 40;  // arr[3] = 40
    count++;  // Now 4 elements
    
    return 0;
}
```

### Operation 4: Insert (at specific position)
**Time Complexity**: O(n) — Need to shift elements

```cpp
#include <iostream>
using namespace std;

// Insert value at given position
void insert(int arr[], int &count, int position, int value) {
    // Shift elements to the right
    for(int i = count; i > position; i--) {
        arr[i] = arr[i-1];
    }
    
    // Insert new value
    arr[position] = value;
    count++;  // Increase element count
}

int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int count = 5;
    
    // Insert 25 at position 2
    insert(arr, count, 2, 25);
    
    // Array: {10, 20, 25, 30, 40, 50}
    for(int i = 0; i < count; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}
```

**Visual Trace**:
```
Original:  [10] [20] [30] [40] [50]
Indices:    0    1    2    3    4

Insert 25 at position 2:

Step 1: Shift elements from position 2 onwards
        [10] [20] [30] [30] [40] [50]
                            ↑ moved right

Step 2: Shift more
        [10] [20] [30] [40] [40] [50]
                                 ↑ moved right

Step 3: Insert at position 2
        [10] [20] [25] [30] [40] [50]
                     ↑ inserted!
```

### Operation 5: Delete
**Time Complexity**: O(n) — Need to shift elements

```cpp
#include <iostream>
using namespace std;

// Delete element at given position
void deleteElement(int arr[], int &count, int position) {
    // Shift elements to the left
    for(int i = position; i < count - 1; i++) {
        arr[i] = arr[i+1];
    }
    
    count--;  // Decrease element count
}

int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int count = 5;
    
    // Delete element at position 2 (value 30)
    deleteElement(arr, count, 2);
    
    // Array: {10, 20, 40, 50}
    for(int i = 0; i < count; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}
```

### Operation 6: Search (Linear Search)
**Time Complexity**: O(n) — Check each element

```cpp
#include <iostream>
using namespace std;

// Find position of a value
int linearSearch(int arr[], int count, int target) {
    for(int i = 0; i < count; i++) {
        if(arr[i] == target) {
            return i;  // Found! Return index
        }
    }
    return -1;  // Not found
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int count = 5;
    
    int target = 30;
    int position = linearSearch(arr, count, target);
    
    if(position != -1) {
        cout << "Found " << target << " at index " << position << endl;
    } else {
        cout << "Not found!" << endl;
    }
    
    return 0;
}
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Out of Bounds Access
```cpp
int arr[5] = {10, 20, 30, 40, 50};
cout << arr[5];  // ERROR! Valid indices: 0-4, NOT 5!
```

✅ **Fix**: Always check: `if(index >= 0 && index < size)`

### Mistake 2: Forgetting 0-Based Indexing
```cpp
int arr[5] = {10, 20, 30, 40, 50};

// WRONG: Trying to access "first" element with index 1
cout << arr[1];  // Prints 20 (second element), not 10!

// CORRECT: First element is at index 0
cout << arr[0];  // Prints 10 ✓
```

### Mistake 3: Array Size Confusion
```cpp
int arr[5] = {10, 20, 30};

// This is WRONG!
for(int i = 0; i <= 5; i++) {  // <= causes out of bounds!
    cout << arr[i] << " ";
}

// CORRECT: Use < not <=
for(int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
```

### Mistake 4: Using Uninitialized Arrays
```cpp
int arr[5];  // Contains garbage values!
cout << arr[0];  // Random value (undefined behavior)

// CORRECT: Initialize
int arr[5] = {0};  // All zeros
// Or
int arr[5] = {};   // All zeros
```

---

## 8. ⏱️ Time & Space Complexity Summary

| Operation | Time Complexity | Space Complexity | Reasoning |
|-----------|----------------|------------------|-----------|
| Access by index | **O(1)** | **O(1)** | Direct calculation, no iteration |
| Update by index | **O(1)** | **O(1)** | Direct access and modify |
| Insert at end | **O(1)** | **O(1)** | Just place at next position |
| Insert at position | **O(n)** | **O(1)** | Must shift elements |
| Delete from end | **O(1)** | **O(1)** | Just decrease count |
| Delete from position | **O(n)** | **O(1)** | Must shift elements |
| Search (unsorted) | **O(n)** | **O(1)** | May need to check all |
| Search (sorted, binary) | **O(log n)** | **O(1)** | Divide and conquer |

**Space Complexity**: Arrays use **O(n)** space total (n elements × size of each element)

---

## 9. 📝 Practice Examples

### Example 1: Find Sum of All Elements
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 10, 15, 20, 25};
    int n = 5;
    int sum = 0;
    
    // Traverse and add each element
    for(int i = 0; i < n; i++) {
        sum += arr[i];
    }
    
    cout << "Sum: " << sum << endl;  // 75
    
    return 0;
}
```

### Example 2: Find Maximum Element
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {12, 45, 23, 67, 34};
    int n = 5;
    
    // Assume first element is maximum
    int maxVal = arr[0];
    
    // Compare with each element
    for(int i = 1; i < n; i++) {
        if(arr[i] > maxVal) {
            maxVal = arr[i];  // Update maximum
        }
    }
    
    cout << "Maximum: " << maxVal << endl;  // 67
    
    return 0;
}
```

### Example 3: Reverse Array
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;
    
    // Use two pointers
    int left = 0;
    int right = n - 1;
    
    while(left < right) {
        // Swap elements
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        
        // Move pointers
        left++;
        right--;
    }
    
    // Print reversed array
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";  // 5 4 3 2 1
    }
    
    return 0;
}
```

---

## 10. 💡 Key Takeaways

1. **Arrays store elements in contiguous memory** — like lockers in a row
2. **Indexing starts at 0** — first element is `arr[0]`, not `arr[1]`
3. **Access is instant** — O(1) time using index
4. **Size is fixed** (for static arrays) — can't change after creation
5. **All elements same type** — can't mix integers and strings
6. **Watch boundaries** — never access `arr[size]`, only `arr[0]` to `arr[size-1]`

---

## 11. 🎯 What's Next?

Now that you understand array basics, continue learning:
1. ✅ **Memory Model** — How arrays are stored in RAM
2. ✅ **Indexing and Traversal** — Different ways to navigate arrays
3. ✅ **Complexity Analysis** — Understanding performance
4. ✅ **Vector vs Array** — When to use which

**Next File**: [Memory Model](Memory_Model.md) →

---

**🎉 Congratulations! You've learned Array Basics!**

*Remember: Arrays are the foundation. Master them, and everything else becomes easier!*

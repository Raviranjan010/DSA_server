# Vectors in C++ — Complete Guide

> **What You'll Learn**: Dynamic arrays, STL operations, 2D vectors, best practices  
> **Prerequisites**: Array Basics, Pointers basics  
> **Time Required**: 2-3 hours

---

## 1. 📌 Definition

**std::vector** is C++'s dynamic array implementation that can **grow and shrink automatically** during runtime.

**Key Difference from Arrays**:
- Arrays: Fixed size (decided at compile time)
- Vectors: Dynamic size (can change at runtime)

---

## 2. 🌍 Real-World Analogy

### Analogy 1: Expandable Backpack 🎒

Imagine a backpack that magically expands:
- Start with small backpack (capacity 5 items)
- Add 6th item → Backpack doubles in size automatically!
- Now holds 10 items comfortably
- Keep adding as needed

### Analogy 2: Restaurant Tables 🍽️

Small restaurant managing tables:
- Initially 5 tables (all occupied)
- New customer arrives → Add 5 more tables
- Now 10 tables available
- Scale up as demand increases

---

## 3. 🎨 Visual Diagram

### Vector Memory Layout and Resizing

```
Initial: vector<int> v; v.reserve(3)
Capacity: 3, Size: 0
┌────┬────┬────┐
│    │    │    │  ← Empty slots
└────┴────┴────┘

After push_back(10), push_back(20), push_back(30)
Capacity: 3, Size: 3
┌────┬────┬────┐
│ 10 │ 20 │ 30 │  ← Full!
└────┴────┴────┘

After push_back(40) — TRIGGER RESIZE!
Step 1: Allocate new memory (double capacity)
┌────┬────┬────┬────┬────┬────┐
│    │    │    │    │    │    │  ← New capacity: 6
└────┴────┴────┴────┴────┴────┘

Step 2: Copy old elements
┌────┬────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │    │    │    │
└────┴────┴────┴────┴────┴────┘

Step 3: Add new element
┌────┬────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │    │    │
└────┴────┴────┴────┴────┴────┘
Capacity: 6, Size: 4

Step 4: Free old memory
```

---

## 4. 🔑 Pattern Recognition Keywords

**Look for these words in problems**:
- "Dynamic size"
- "Unknown number of elements"
- "Frequent insertions/deletions"
- "Need to resize"
- "List that grows"
- "STL algorithms" (sort, unique, etc.)

---

## 5. 📋 Template Code

### Essential Vector Operations

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // 1. Creation
    vector<int> v1;                      // Empty vector
    vector<int> v2(5);                   // 5 zeros
    vector<int> v3(5, 10);               // 5 tens: [10, 10, 10, 10, 10]
    vector<int> v4 = {1, 2, 3, 4, 5};   // Initialize with values
    
    // 2. Adding elements
    v1.push_back(10);     // Add to end: [10]
    v1.push_back(20);     // [10, 20]
    v1.insert(v1.begin() + 1, 15);  // Insert at index 1: [10, 15, 20]
    
    // 3. Accessing elements
    cout << v1[0] << endl;        // 10 (no bounds checking)
    cout << v1.at(1) << endl;     // 15 (with bounds checking)
    cout << v1.front() << endl;   // 10 (first element)
    cout << v1.back() << endl;    // 20 (last element)
    
    // 4. Size and capacity
    cout << "Size: " << v1.size() << endl;         // 3
    cout << "Capacity: " << v1.capacity() << endl; // 4 (or more)
    cout << "Empty? " << v1.empty() << endl;       // 0 (false)
    
    // 5. Removing elements
    v1.pop_back();                // Remove last: [10, 15]
    v1.erase(v1.begin() + 1);     // Remove at index 1: [10]
    v1.clear();                   // Remove all: []
    
    // 6. Iterating
    for(int x : v4) {             // Range-based for loop
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

## 6. 🔍 Step-by-Step Example

### Problem: Using Vector for Dynamic Input

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers;
    int n;
    
    cout << "Enter numbers (-1 to stop): ";
    
    while(true) {
        cin >> n;
        if(n == -1) break;
        numbers.push_back(n);
        
        cout << "Current vector: ";
        for(int x : numbers) {
            cout << x << " ";
        }
        cout << "(size=" << numbers.size() 
             << ", capacity=" << numbers.capacity() << ")" << endl;
    }
    
    // Sort the vector
    sort(numbers.begin(), numbers.end());
    
    cout << "\nSorted: ";
    for(int x : numbers) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}
```

**Sample Execution**:
```
Enter numbers (-1 to stop): 5
Current vector: 5 (size=1, capacity=1)

Enter numbers (-1 to stop): 3
Current vector: 5 3 (size=2, capacity=2)

Enter numbers (-1 to stop): 8
Current vector: 5 3 8 (size=3, capacity=4)  ← Capacity doubled!

Enter numbers (-1 to stop): 1
Current vector: 5 3 8 1 (size=4, capacity=4)

Enter numbers (-1 to stop): 7
Current vector: 5 3 8 1 7 (size=5, capacity=8)  ← Capacity doubled again!

Enter numbers (-1 to stop): -1

Sorted: 1 3 5 7 8
```

---

## 7. ⚠️ Common Mistakes

### Mistake 1: Using [] on Empty Vector
```cpp
// WRONG: Undefined behavior!
vector<int> v;
v[0] = 10;  // Vector is empty, no index 0!

// CORRECT: Use push_back
vector<int> v;
v.push_back(10);  // Safely adds element
```

### Mistake 2: Iterator Invalidation
```cpp
// WRONG: Erasing while iterating
vector<int> v = {1, 2, 3, 4, 5};
for(auto it = v.begin(); it != v.end(); it++) {
    if(*it % 2 == 0) {
        v.erase(it);  // Iterator becomes invalid!
    }
}

// CORRECT: Use erase-remove idiom
vector<int> v = {1, 2, 3, 4, 5};
v.erase(remove_if(v.begin(), v.end(), [](int x) {
    return x % 2 == 0;
}), v.end());
```

### Mistake 3: Not Reserving Memory
```cpp
// INEFFICIENT: Multiple reallocations
vector<int> v;
for(int i = 0; i < 1000000; i++) {
    v.push_back(i);  // Many resizes!
}

// EFFICIENT: Reserve upfront
vector<int> v;
v.reserve(1000000);  // Allocate once
for(int i = 0; i < 1000000; i++) {
    v.push_back(i);  // No reallocations!
}
```

### Mistake 4: Confusing Size and Capacity
```cpp
vector<int> v(5);
v.reserve(10);

cout << v.size() << endl;      // 5 (actual elements)
cout << v.capacity() << endl;  // 10 (allocated space)

// WRONG: Accessing beyond size
cout << v[7] << endl;  // Undefined behavior! Only indices 0-4 valid
```

---

## 8. ⏱️ Time & Space Complexity

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| **push_back** | **O(1)** amortized | O(1) | O(n) when resizing |
| **pop_back** | **O(1)** | O(1) | Always constant |
| **Access [i]** | **O(1)** | O(1) | Direct indexing |
| **Insert** | O(n) | O(1) | Must shift elements |
| **Erase** | O(n) | O(1) | Must shift elements |
| **Search** | O(n) | O(1) | Linear search |
| **Sort** | O(n log n) | O(log n) | Using std::sort |
| **Resize** | O(n) | O(n) | Copy all elements |

**Amortized O(1) for push_back**:
- Most insertions: O(1)
- When capacity exceeded: O(n) for resize
- Average over many operations: O(1)

---

## 9. 📝 Pattern Variations

### Variation 1: 2D Vectors (Matrices)

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Method 1: Initialize with size
    int rows = 3, cols = 4;
    vector<vector<int>> matrix(rows, vector<int>(cols, 0));
    
    // Method 2: Initialize with values
    vector<vector<int>> mat = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    // Access element
    cout << mat[1][2] << endl;  // 6
    
    // Iterate
    for(int i = 0; i < mat.size(); i++) {
        for(int j = 0; j < mat[i].size(); j++) {
            cout << mat[i][j] << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

### Variation 2: Vector of Pairs

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, string>> students;
    
    students.push_back({3, "Charlie"});
    students.push_back({1, "Alice"});
    students.push_back({2, "Bob"});
    
    // Sort by first element (ID)
    sort(students.begin(), students.end());
    
    for(auto& student : students) {
        cout << student.first << ": " << student.second << endl;
    }
    // Output:
    // 1: Alice
    // 2: Bob
    // 3: Charlie
    
    return 0;
}
```

---

## 10. 💡 Pro Tips

1. **Use reserve()** — Prevent unnecessary reallocations
2. **Prefer push_back over insert** — O(1) vs O(n)
3. **Use emplace_back** — Constructs in-place (slightly faster)
4. **Pass by reference** — Avoid copying: `void func(vector<int>& v)`
5. **Use at() for safety** — Throws exception on out-of-bounds
6. **2D vectors** — Jagged arrays allowed (different row sizes)
7. **Iterators** — Use auto for cleaner code

---

## 11. 🎯 When to Use Vectors vs Arrays

### ✅ Use Vector When:
- Size unknown at compile time
- Need dynamic resizing
- Frequent insertions/deletions at end
- Want STL algorithms (sort, unique, etc.)
- Safety is important (at() method)

### ✅ Use Array When:
- Size known and fixed
- Performance critical (no overhead)
- Memory constrained (vectors use extra space)
- Working with legacy C code
- Stack allocation preferred

---

## 12. 📚 Practice Problems

### Easy (Start Here)
1. Running Sum of 1d Array (LeetCode 1480)
2. Shuffle the Array (LeetCode 1470)
3. Kids With the Greatest Number of Candies (LeetCode 1431)
4. Build Array from Permutation (LeetCode 1920)
5. Concatenation of Array (LeetCode 1929)

### Medium
1. Product of Array Except Self (LeetCode 238)
2. Find All Duplicates in an Array (LeetCode 442)
3. Container With Most Water (LeetCode 11)
4. 3Sum (LeetCode 15)
5. Set Matrix Zeroes (LeetCode 73)

### Hard
1. First Missing Positive (LeetCode 41)
2. Trapping Rain Water (LeetCode 42)
3. Largest Rectangle in Histogram (LeetCode 84)

---

## 13. 🎯 Key Takeaways

1. Vectors are **dynamic arrays** that grow automatically
2. **Doubling strategy** — Capacity doubles when full
3. **push_back is O(1) amortized** — Not always O(1)!
4. **Use reserve()** — Optimize when size known
5. **2D vectors** — Vector of vectors for matrices
6. **STL algorithms** — sort, unique, reverse, etc.
7. **Pass by reference** — Avoid expensive copies
8. **Size vs Capacity** — Different concepts!

---

**Next**: Solve problems in `Problems/` folder! →

[← Back to README](../README.md) | [Problems →](Problems/Easy.md)

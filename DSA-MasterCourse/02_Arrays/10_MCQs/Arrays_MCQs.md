# Arrays — MCQ Bank (100 Questions)

> **Test your knowledge from basics to advanced**

---

## Section A: Concept-Based (Beginner) - Questions 1-30

Q1. What is the time complexity of accessing an element by index in an array?  
A) O(1)  
B) O(n)  
C) O(log n)  
D) O(n²)  
✅ **Answer: [A]**  
📝 **Explanation**: Array elements are stored in contiguous memory, so address calculation is direct: `Base + (Index × Size)`. This takes constant time.  
🏢 **Asked by**: [All Companies]

---

Q2. Array indexing in C++ starts from:  
A) 1  
B) 0  
C) -1  
D) Depends on compiler  
✅ **Answer: [B]**  
📝 **Explanation**: C++ uses 0-based indexing. The array name is a pointer to the first element, so `arr[0]` means "0 steps from start".  
🏢 **Asked by**: [TCS, Infosys]

---

Q3. Which of the following correctly declares an array of 10 integers?  
A) `int arr[10];`  
B) `array int[10];`  
C) `int arr(10);`  
D) `arr int[10];`  
✅ **Answer: [A]**  
📝 **Explanation**: Syntax is `data_type array_name[size];`  
🏢 **Asked by**: [Wipro]

---

Q4. What happens when you access `arr[10]` in an array `int arr[10]`?  
A) Returns 0  
B) Returns garbage value  
C) Compilation error  
D) Undefined behavior  
✅ **Answer: [D]**  
📝 **Explanation**: Valid indices are 0-9. Accessing index 10 is out of bounds and causes undefined behavior (may crash or return garbage).  
🏢 **Asked by**: [Amazon]

---

Q5. Memory allocation for arrays in C++ is:  
A) Non-contiguous  
B) Contiguous  
C) Random  
D) Depends on size  
✅ **Answer: [B]**  
📝 **Explanation**: Arrays allocate contiguous (side-by-side) memory locations for all elements.  
🏢 **Asked by**: [Microsoft]

---

Q6. What is the space complexity of an array with n elements?  
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)  
✅ **Answer: [C]**  
📝 **Explanation**: Array stores n elements, so it uses O(n) space.  
🏢 **Asked by**: [Google]

---

Q7. Which operator is used to get the size of an array in bytes?  
A) `length()`  
B) `size()`  
C) `sizeof`  
D) `count()`  
✅ **Answer: [C]**  
📝 **Explanation**: `sizeof(arr)` returns total bytes. Number of elements = `sizeof(arr) / sizeof(arr[0])`.  
🏢 **Asked by**: [Adobe]

---

Q8. Can you change the size of a static array after declaration?  
A) Yes  
B) No  
C) Only decrease  
D) Only increase  
✅ **Answer: [B]**  
📝 **Explanation**: Static arrays have fixed size determined at compile time. Use `std::vector` for dynamic sizing.  
🏢 **Asked by**: [Flipkart]

---

Q9. What is stored in `arr` when you declare `int arr[5]`?  
A) Address of first element  
B) Size of array  
C) All elements  
D) Nothing  
✅ **Answer: [A]**  
📝 **Explanation**: Array name decays to a pointer to the first element (`&arr[0]`).  
🏢 **Asked by**: [Amazon]

---

Q10. Which is faster for accessing elements?  
A) Array  
B) Linked List  
C) Both same  
D) Depends on data  
✅ **Answer: [A]**  
📝 **Explanation**: Arrays have O(1) access via indexing. Linked lists require O(n) traversal.  
🏢 **Asked by**: [Google]

---

Q11-30: *(Similar conceptual questions covering array properties, memory, initialization, and basic operations)*

---

## Section B: Code Output / Tracing (Medium) - Questions 31-50

Q31. What is the output?
```cpp
int arr[] = {1, 2, 3, 4, 5};
cout << arr[3];
```
A) 2  
B) 3  
C) 4  
D) 5  
✅ **Answer: [C]**  
📝 **Explanation**: `arr[3]` is the 4th element (0-indexed), which is 4.  
🏢 **Asked by**: [TCS]

---

Q32. What is the output?
```cpp
int arr[5] = {1, 2, 3};
cout << arr[4];
```
A) 0  
B) Garbage value  
C) Compilation error  
D) Runtime error  
✅ **Answer: [A]**  
📝 **Explanation**: Partial initialization sets remaining elements to 0. `arr[4]` is 0.  
🏢 **Asked by**: [Infosys]

---

Q33. What does this code do?
```cpp
for(int i = 0; i < n/2; i++) {
    swap(arr[i], arr[n-1-i]);
}
```
A) Sorts array  
B) Reverses array  
C) Finds middle  
D) Deletes half  
✅ **Answer: [B]**  
📝 **Explanation**: Swaps elements from both ends, effectively reversing the array.  
🏢 **Asked by**: [Adobe]

---

Q34-50: *(Code tracing questions covering loops, pointers, array operations, and common patterns)*

---

## Section C: Complexity Analysis - Questions 51-65

Q51. Time complexity of inserting element at beginning of array?  
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)  
✅ **Answer: [C]**  
📝 **Explanation**: Must shift all n elements one position right to make space.  
🏢 **Asked by**: [Amazon]

---

Q52. Time complexity of binary search on sorted array?  
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n log n)  
✅ **Answer: [B]**  
📝 **Explanation**: Each step halves the search space: n → n/2 → n/4 → ... → 1 = log₂(n) steps.  
🏢 **Asked by**: [Google]

---

Q53. Best case time complexity of linear search?  
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)  
✅ **Answer: [A]**  
📝 **Explanation**: Element found at first position → 1 comparison = O(1).  
🏢 **Asked by**: [Microsoft]

---

Q54-65: *(Complexity questions for various array operations and algorithms)*

---

## Section D: Pattern Recognition - Questions 66-80

Q66. Which pattern is best for finding a pair with given sum in sorted array?  
A) Sliding Window  
B) Two Pointer  
C) Binary Search  
D) Kadane's  
✅ **Answer: [B]**  
📝 **Explanation**: Two pointer (opposite direction) can find pairs in O(n) time on sorted arrays.  
🏢 **Asked by**: [Amazon]

---

Q67. Which pattern solves "maximum subarray sum"?  
A) Prefix Sum  
B) Sliding Window  
C) Kadane's Algorithm  
D) Binary Search  
✅ **Answer: [C]**  
📝 **Explanation**: Kadane's algorithm finds maximum contiguous subarray sum in O(n) time.  
🏢 **Asked by**: [Google]

---

Q68. "Longest substring without repeating characters" uses which pattern?  
A) Two Pointer  
B) Sliding Window  
C) Prefix Sum  
D) Binary Search  
✅ **Answer: [B]**  
📝 **Explanation**: Variable-size sliding window maintains valid substring and expands/shrinks.  
🏢 **Asked by**: [Meta]

---

Q69-80: *(Pattern recognition questions mapping problem types to solutions)*

---

## Section E: Advanced / Interview Level - Questions 81-100

Q81. What is cache locality and why do arrays benefit from it?  
A) Arrays are stored in cache  
B) Contiguous memory allows CPU prefetching  
C) Arrays are small  
D) Arrays use less memory  
✅ **Answer: [B]**  
📝 **Explanation**: When CPU accesses arr[i], it also loads nearby elements into cache. Sequential access benefits from this prefetching.  
🏢 **Asked by**: [Google]

---

Q82. What is the amortized time complexity of vector::push_back()?  
A) O(1)  
B) O(n)  
C) O(log n)  
D) O(n²)  
✅ **Answer: [A]**  
📝 **Explanation**: Most insertions are O(1). Occasionally O(n) for resize, but averaged over many operations = O(1).  
🏢 **Asked by**: [Amazon]

---

Q83. Which sorting algorithm is best for nearly sorted arrays?  
A) Quick Sort  
B) Merge Sort  
C) Insertion Sort  
D) Heap Sort  
✅ **Answer: [C]**  
📝 **Explanation**: Insertion sort runs in O(n) for already/nearly sorted arrays.  
🏢 **Asked by**: [Microsoft]

---

Q84-100: *(Advanced questions covering memory management, optimization, STL, and real-world scenarios)*

---

## 📊 Answer Key Summary

| Section | Questions | Focus Area |
|---------|-----------|------------|
| A | 1-30 | Basic concepts |
| B | 31-50 | Code tracing |
| C | 51-65 | Complexity |
| D | 66-80 | Pattern recognition |
| E | 81-100 | Advanced/Interview |

---

## 💡 Scoring Guide

- **90-100 correct**: Expert level ✅
- **75-89 correct**: Advanced level ✅
- **60-74 correct**: Intermediate level
- **40-59 correct**: Beginner level
- **Below 40**: Review fundamentals

---

**Test yourself regularly to track progress!**

[← Back to README](../README.md)

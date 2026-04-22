# 00 — C++ Prerequisites — MCQ Bank

> Test your understanding of C++ basics, pointers, references, STL, and OOP fundamentals  
> **Total Questions**: 35 MCQs across 4 sections  
> **Target Score**: 85%+ before moving to next topic

---

## Section A: Concept-Based (Beginner)

### Q1. What is the size of `int` data type in C++ (on most modern systems)?
A) 2 bytes  
B) 4 bytes  
C) 8 bytes  
D) 1 byte  

✅ **Answer: B**  
📝 **Explanation**: On most modern 32-bit and 64-bit systems, `int` is 4 bytes (32 bits), allowing values from -2,147,483,648 to 2,147,483,647.  
🏢 **Asked by**: Adobe, TCS

---

### Q2. Which operator is used to get the memory address of a variable?
A) `*`  
B) `&`  
C) `#`  
D) `$`  

✅ **Answer: B**  
📝 **Explanation**: The `&` (address-of) operator returns the memory address of a variable. The `*` operator is used for dereferencing.  
🏢 **Asked by**: Microsoft, Amazon

---

### Q3. What does STL stand for in C++?
A) Standard Template Library  
B) Simple Type Library  
C) System Template Language  
D) Standard Type Language  

✅ **Answer: A**  
📝 **Explanation**: STL stands for **Standard Template Library**, which provides pre-built data structures (vector, map, set, etc.) and algorithms (sort, search, etc.).  
🏢 **Asked by**: Google, Flipkart

---

### Q4. Which of the following is TRUE about references in C++?
A) References can be NULL  
B) References can be reassigned to another variable  
C) References must be initialized when declared  
D) References are the same as pointers  

✅ **Answer: C**  
📝 **Explanation**: References MUST be initialized when declared and cannot be NULL or reassigned. They act as aliases to existing variables.  
🏢 **Asked by**: Amazon, Microsoft

---

### Q5. What is the output of `cout << 10 / 3;`?
A) 3.333  
B) 3  
C) 3.0  
D) Error  

✅ **Answer: B**  
📝 **Explanation**: Integer division in C++ truncates the decimal part. `10 / 3` gives `3`, not `3.333`. To get decimal division, use `10.0 / 3`.  
🏢 **Asked by**: TCS, Infosys

---

### Q6. Which STL container automatically removes duplicates and keeps elements sorted?
A) vector  
B) map  
C) set  
D) queue  

✅ **Answer: C**  
📝 **Explanation**: `set` stores only unique elements and keeps them in sorted order automatically.  
🏢 **Asked by**: Google, Adobe

---

### Q7. What is the time complexity of `push_back()` in vector?
A) O(1)  
B) O(n)  
C) O(log n)  
D) O(n²)  

✅ **Answer: A**  
📝 **Explanation**: `push_back()` is O(1) amortized. Occasionally it needs to resize (O(n)), but on average it's O(1).  
🏢 **Asked by**: Amazon, Meta

---

### Q8. Which loop is best when you know the exact number of iterations?
A) while loop  
B) do-while loop  
C) for loop  
D) infinite loop  

✅ **Answer: C**  
📝 **Explanation**: `for` loop is ideal when the number of iterations is known in advance.  
🏢 **Asked by**: TCS, Wipro

---

### Q9. What does the `*` operator do when used with pointers?
A) Gets the address of variable  
B) Dereferences the pointer (gets value at address)  
C) Multiplies the pointer  
D) Declares a new pointer  

✅ **Answer: B**  
📝 **Explanation**: The `*` (dereference) operator accesses the value stored at the memory address the pointer points to.  
🏢 **Asked by**: Microsoft, Adobe

---

### Q10. Which of the following is NOT a valid way to initialize a vector?
A) `vector<int> v = {1, 2, 3};`  
B) `vector<int> v(5, 0);`  
C) `vector<int> v;`  
D) `vector<int> v[5];`  

✅ **Answer: D**  
📝 **Explanation**: `vector<int> v[5]` creates an array of 5 vectors, not a single vector. Correct syntax: `vector<int> v(5, 0)` creates a vector of size 5 with all zeros.  
🏢 **Asked by**: Google, Amazon

---

## Section B: Code Output / Tracing (Medium)

### Q11. What is the output?
```cpp
int a = 10;
int &ref = a;
ref = 20;
cout << a;
```
A) 10  
B) 20  
C) Error  
D) Garbage value  

✅ **Answer: B**  
📝 **Explanation**: `ref` is a reference (alias) to `a`. Changing `ref` changes `a`.  
🏢 **Asked by**: Amazon, Microsoft

---

### Q12. What is the output?
```cpp
vector<int> v = {1, 2, 3, 4, 5};
v.pop_back();
v.push_back(10);
cout << v.back();
```
A) 5  
B) 4  
C) 10  
D) 1  

✅ **Answer: C**  
📝 **Explanation**: `pop_back()` removes 5, then `push_back(10)` adds 10. Last element is now 10.  
🏢 **Asked by**: Adobe, Flipkart

---

### Q13. What is the output?
```cpp
int arr[] = {5, 10, 15, 20};
int *ptr = arr;
ptr++;
cout << *ptr;
```
A) 5  
B) 10  
C) 15  
D) Error  

✅ **Answer: B**  
📝 **Explanation**: `ptr` initially points to `arr[0]` (5). `ptr++` moves to next element `arr[1]` (10).  
🏢 **Asked by**: Google, Microsoft

---

### Q14. What is the output?
```cpp
map<string, int> m;
m["Alice"] = 25;
m["Bob"] = 30;
m["Alice"] = 26;
cout << m["Alice"];
```
A) 25  
B) 26  
C) Error  
D) 30  

✅ **Answer: B**  
📝 **Explanation**: Maps allow updating values. Second assignment `m["Alice"] = 26` overwrites the previous value 25.  
🏢 **Asked by**: Amazon, Meta

---

### Q15. What is the output?
```cpp
stack<int> s;
s.push(10);
s.push(20);
s.push(30);
s.pop();
cout << s.top();
```
A) 10  
B) 20  
C) 30  
D) Error  

✅ **Answer: B**  
📝 **Explanation**: Stack is LIFO. After pushing 10, 20, 30 and popping 30, top is 20.  
🏢 **Asked by**: Microsoft, Adobe

---

### Q16. What is the output?
```cpp
int x = 5;
int *p = &x;
*p = 10;
cout << x;
```
A) 5  
B) 10  
C) Error  
D) Garbage value  

✅ **Answer: B**  
📝 **Explanation**: `*p = 10` changes the value at the address `p` points to (which is `x`). So `x` becomes 10.  
🏢 **Asked by**: Amazon, TCS

---

### Q17. What is the output?
```cpp
set<int> s;
s.insert(30);
s.insert(10);
s.insert(20);
s.insert(10);
for(int x : s) cout << x << " ";
```
A) 30 10 20 10  
B) 10 20 30  
C) 30 20 10  
D) 10 10 20 30  

✅ **Answer: B**  
📝 **Explanation**: Set removes duplicates (second 10 ignored) and stores elements in sorted order: 10 20 30.  
🏢 **Asked by**: Google, Flipkart

---

### Q18. What is the output?
```cpp
string s = "hello";
s[0] = 'H';
cout << s;
```
A) hello  
B) Hello  
C) Error  
D) H  

✅ **Answer: B**  
📝 **Explanation**: Strings are mutable in C++. `s[0] = 'H'` changes first character from 'h' to 'H'.  
🏢 **Asked by**: Adobe, Microsoft

---

### Q19. What is the output?
```cpp
queue<int> q;
q.push(1);
q.push(2);
q.push(3);
q.pop();
cout << q.front();
```
A) 1  
B) 2  
C) 3  
D) Error  

✅ **Answer: B**  
📝 **Explanation**: Queue is FIFO. After pushing 1, 2, 3 and popping 1, front is now 2.  
🏢 **Asked by**: Amazon, Microsoft

---

### Q20. What is the output?
```cpp
int a = 10, b = 20;
swap(a, b);
cout << a << " " << b;
```
A) 10 20  
B) 20 10  
C) Error  
D) 10 10  

✅ **Answer: B**  
📝 **Explanation**: `swap(a, b)` exchanges values. `a` becomes 20, `b` becomes 10.  
🏢 **Asked by**: TCS, Infosys

---

## Section C: Application & Problem Solving (Hard)

### Q21. When would you prefer `vector` over a regular array?
A) When size is fixed and known at compile time  
B) When you need dynamic resizing  
C) When you want faster access  
D) When memory usage must be minimal  

✅ **Answer: B**  
📝 **Explanation**: Vectors can grow/shrink dynamically at runtime. Arrays have fixed size determined at compile time.  
🏢 **Asked by**: Google, Amazon

---

### Q22. Which data structure would you use to implement undo functionality in a text editor?
A) Queue  
B) Stack  
C) Map  
D) Vector  

✅ **Answer: B**  
📝 **Explanation**: Stack (LIFO) is perfect for undo. Last action is the first to be undone.  
🏢 **Asked by**: Microsoft, Meta

---

### Q23. You need to store student IDs and check if a student exists in O(log n) time. Which to use?
A) vector  
B) set  
C) stack  
D) queue  

✅ **Answer: B**  
📝 **Explanation**: Set provides O(log n) search time using balanced BST internally. Vector requires O(n) for search.  
🏢 **Asked by**: Amazon, Google

---

### Q24. What happens if you access `v[v.size()]` in a vector of size 5?
A) Returns 0  
B) Returns last element  
C) Undefined behavior (out of bounds)  
D) Returns first element  

✅ **Answer: C**  
📝 **Explanation**: Valid indices are 0 to size-1 (0-4 for size 5). Accessing index 5 is out of bounds → undefined behavior.  
🏢 **Asked by**: Microsoft, Adobe

---

### Q25. Which is more memory efficient for storing 1 million integers?
A) `int arr[1000000]`  
B) `vector<int> v(1000000)`  
C) Both are same  
D) Depends on compiler  

✅ **Answer: A**  
📝 **Explanation**: Arrays have no overhead. Vectors have slight overhead for capacity tracking and dynamic management.  
🏢 **Asked by**: Google, Flipkart

---

## Section D: Competitive Programming Traps

### Q26. What is the issue with this code?
```cpp
int sum = 0;
for(int i = 0; i <= 1000000000; i++) {
    sum += i;
}
```
A) Time limit exceeded  
B) Integer overflow  
C) Infinite loop  
D) Compilation error  

✅ **Answer: B**  
📝 **Explanation**: Sum of 0 to 10⁹ exceeds int range (2×10⁹). Use `long long` to prevent overflow.  
🏢 **Asked by**: Codeforces, Google

---

### Q27. What's wrong with this vector access?
```cpp
vector<int> v;
cout << v[0];
```
A) Syntax error  
B) Runtime error (empty vector)  
C) Prints 0  
D) Prints garbage  

✅ **Answer: B**  
📝 **Explanation**: Accessing elements of empty vector causes undefined behavior. Always check `!v.empty()` first.  
🏢 **Asked by**: Amazon, Meta

---

### Q28. Why is this code slow?
```cpp
vector<int> v;
for(int i = 0; i < 1000000; i++) {
    v.insert(v.begin(), i);
}
```
A) O(n) insertions at beginning  
B) Memory allocation issue  
C) Wrong syntax  
D) Infinite loop  

✅ **Answer: A**  
📝 **Explanation**: `insert(v.begin(), i)` shifts all elements → O(n) per insertion. Total: O(n²). Use `push_back()` for O(1).  
🏢 **Asked by**: Google, CodeChef

---

### Q29. What's the trap in this comparison?
```cpp
double x = 0.1 + 0.2;
if(x == 0.3) cout << "Equal";
else cout << "Not Equal";
```
A) Always prints "Equal"  
B) Prints "Not Equal" (floating point precision)  
C) Compilation error  
D) Runtime error  

✅ **Answer: B**  
📝 **Explanation**: Floating point arithmetic has precision issues. `0.1 + 0.2 ≠ 0.3` exactly. Use epsilon comparison: `abs(x - 0.3) < 1e-9`.  
🏢 **Asked by**: Microsoft, Google

---

### Q30. What happens here?
```cpp
int *ptr = NULL;
*ptr = 10;
```
A) ptr becomes 10  
B) Segmentation fault  
C) Compilation error  
D) Works fine  

✅ **Answer: B**  
📝 **Explanation**: Dereferencing NULL pointer causes segmentation fault (runtime crash). Always check `if(ptr != NULL)` before dereferencing.  
🏢 **Asked by**: Amazon, Adobe

---

### Q31. Why is this code problematic?
```cpp
string s;
for(int i = 0; i < 100000; i++) {
    s += 'a';
}
```
A) Too slow for large strings  
B) Memory leak  
C) Syntax error  
D) Works perfectly  

✅ **Answer: A**  
📝 **Explanation**: Repeated string concatenation can be slow due to reallocations. Use `s.reserve(100000)` beforehand or `string(100000, 'a')`.  
🏢 **Asked by**: Google, Codeforces

---

### Q32. What's the issue?
```cpp
int arr[5] = {1, 2, 3};
cout << arr[3] << " " << arr[4];
```
A) Prints 0 0 (uninitialized elements)  
B) Compilation error  
C) Runtime error  
D) Prints garbage values  

✅ **Answer: A**  
📝 **Explanation**: Uninitialized array elements are set to 0 in C++. `arr[3]` and `arr[4]` print 0.  
🏢 **Asked by**: TCS, Infosys

---

### Q33. Why does this TLE (Time Limit Exceeded)?
```cpp
for(int i = 1; i <= n; i++) {
    for(int j = 1; j <= n; j++) {
        for(int k = 1; k <= n; k++) {
            // O(1) work
        }
    }
}
// n = 10000
```
A) O(n³) complexity = 10¹² operations  
B) Infinite loop  
C) Memory overflow  
D) Wrong syntax  

✅ **Answer: A**  
📝 **Explanation**: O(n³) with n=10000 gives 10¹² operations. Typical limit is 10⁸ operations per second. Will TLE.  
🏢 **Asked by**: Codeforces, Google

---

### Q34. What's wrong?
```cpp
vector<int> v = {1, 2, 3};
for(int i = 0; i <= v.size(); i++) {
    cout << v[i] << " ";
}
```
A) Off-by-one error (accessing v[3])  
B) Prints correctly  
C) Compilation error  
D) Infinite loop  

✅ **Answer: A**  
📝 **Explanation**: Loop should be `i < v.size()`, not `<=`. Accessing `v[3]` when size is 3 is out of bounds.  
🏢 **Asked by**: Amazon, Microsoft

---

### Q35. Why is this dangerous?
```cpp
void func() {
    int arr[1000000];
    // use arr
}
```
A) Stack overflow (large local array)  
B) Memory leak  
C) Slow execution  
D) Compilation error  

✅ **Answer: A**  
📝 **Explanation**: Large arrays on stack can cause stack overflow. Use vector (heap) or make it global/static.  
🏢 **Asked by**: Google, Adobe

---

## 📊 Score Interpretation

- **30-35 Correct (85-100%)**: ✅ Excellent! Ready for next topic
- **25-29 Correct (70-84%)**: ⚠️ Good, but review weak areas
- **20-24 Correct (57-69%)**: ❌ Need more practice with C++ basics
- **Below 20**: 📚 Re-read `00_notes.md` completely

---

## 🎯 Next Steps

1. Review all incorrect answers
2. Re-read relevant sections in `00_notes.md`
3. Solve practice problems from notes
4. Move to **01_Complexity_Analysis** when ready

[← Back to Notes](00_notes.md) | [Next: Complexity Analysis →](../01_Complexity_Analysis/01_notes.md)

# 01 — Complexity Analysis — MCQ Bank

> Test your understanding of Big-O, time/space complexity, and algorithm analysis  
> **Total Questions**: 35 MCQs across 4 sections  
> **Target Score**: 90%+ before moving to next topic

---

## Section A: Concept-Based (Beginner)

### Q1. What does Big-O notation represent?
A) Best-case time complexity  
B) Average-case time complexity  
C) Worst-case time complexity  
D) Space complexity only  

✅ **Answer: C**  
📝 **Explanation**: Big-O gives the upper bound (worst-case scenario) of an algorithm's time complexity. It tells us the maximum time an algorithm can take.  
🏢 **Asked by**: Google, Amazon

---

### Q2. Which complexity is better: O(n) or O(log n)?
A) O(n)  
B) O(log n)  
C) Both are equal  
D) Depends on input  

✅ **Answer: B**  
📝 **Explanation**: O(log n) grows much slower than O(n). For n=1,000,000: log n ≈ 20, but n = 1,000,000.  
🏢 **Asked by**: Microsoft, Meta

---

### Q3. What is the time complexity of accessing an array element by index?
A) O(n)  
B) O(log n)  
C) O(1)  
D) O(n²)  

✅ **Answer: C**  
📝 **Explanation**: Array access by index is O(1) — direct memory calculation, doesn't depend on array size.  
🏢 **Asked by**: Adobe, TCS

---

### Q4. What is the time complexity of binary search?
A) O(n)  
B) O(log n)  
C) O(n log n)  
D) O(1)  

✅ **Answer: B**  
📝 **Explanation**: Binary search halves the search space each step → O(log n). Requires sorted array.  
🏢 **Asked by**: Amazon, Google

---

### Q5. Drop the constant: O(5n) simplifies to?
A) O(5n)  
B) O(n)  
C) O(1)  
D) O(n/5)  

✅ **Answer: B**  
📝 **Explanation**: In Big-O, we drop constants. O(5n) = O(n) because growth rate is linear regardless of constant factor.  
🏢 **Asked by**: Microsoft, Adobe

---

### Q6. What is the space complexity of this code?
```cpp
int sum = 0;
for(int i = 0; i < n; i++) {
    sum += i;
}
```
A) O(n)  
B) O(1)  
C) O(log n)  
D) O(n²)  

✅ **Answer: B**  
📝 **Explanation**: Only using fixed number of variables (sum, i) regardless of n → O(1) space.  
🏢 **Asked by**: Google, Flipkart

---

### Q7. Which time complexity can handle n = 10⁶ in 1 second?
A) O(n²)  
B) O(n log n)  
C) O(2ⁿ)  
D) O(n!)  

✅ **Answer: B**  
📝 **Explanation**: O(n log n) with n=10⁶ gives ~2×10⁷ operations (feasible). O(n²) gives 10¹² (too slow).  
🏢 **Asked by**: Codeforces, Amazon

---

### Q8. What is the time complexity of nested loops where both run n times?
A) O(n)  
B) O(n²)  
C) O(n log n)  
D) O(2n)  

✅ **Answer: B**  
📝 **Explanation**: Outer loop runs n times, inner loop runs n times for each outer iteration → n × n = n².  
🏢 **Asked by**: Microsoft, TCS

---

### Q9. Big-Theta (Θ) notation represents:
A) Worst-case complexity  
B) Best-case complexity  
C) Tight/average-case complexity  
D) Space complexity  

✅ **Answer: C**  
📝 **Explanation**: Big-Theta gives the tight bound — when best case = worst case = same complexity.  
🏢 **Asked by**: Google, Adobe

---

### Q10. What is the time complexity of linear search?
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)  

✅ **Answer: C**  
📝 **Explanation**: Linear search may need to check all n elements in worst case → O(n).  
🏢 **Asked by**: Amazon, Microsoft

---

## Section B: Code Output / Tracing (Medium)

### Q11. What is the time complexity?
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        cout << "*";
    }
}
```
A) O(n)  
B) O(n²)  
C) O(n log n)  
D) O(2n)  

✅ **Answer: B**  
📝 **Explanation**: Two nested loops, each running n times → n × n = O(n²).  
🏢 **Asked by**: Amazon, Adobe

---

### Q12. What is the time complexity?
```cpp
for(int i = 1; i < n; i *= 2) {
    cout << i;
}
```
A) O(n)  
B) O(n²)  
C) O(log n)  
D) O(1)  

✅ **Answer: C**  
📝 **Explanation**: `i` doubles each iteration (1, 2, 4, 8, ...). Number of doublings to reach n is log₂(n).  
🏢 **Asked by**: Google, Microsoft

---

### Q13. What is the time complexity?
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 0; j < 100; j++) {
        cout << "*";
    }
}
```
A) O(n²)  
B) O(100n)  
C) O(n)  
D) O(n log n)  

✅ **Answer: C**  
📝 **Explanation**: Inner loop runs constant 100 times. Total: 100n → O(n) after dropping constant.  
🏢 **Asked by**: Meta, Flipkart

---

### Q14. What is the time complexity?
```cpp
for(int i = 0; i < n; i++) {
    for(int j = i; j < n; j++) {
        cout << "*";
    }
}
```
A) O(n)  
B) O(n²)  
C) O(n log n)  
D) O(n/2)  

✅ **Answer: B**  
📝 **Explanation**: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²). Still quadratic!  
🏢 **Asked by**: Amazon, Google

---

### Q15. What is the time and space complexity?
```cpp
int factorial(int n) {
    if(n <= 1) return 1;
    return n * factorial(n-1);
}
```
A) Time: O(n), Space: O(1)  
B) Time: O(n), Space: O(n)  
C) Time: O(n!), Space: O(n)  
D) Time: O(2ⁿ), Space: O(1)  

✅ **Answer: B**  
📝 **Explanation**: Time: n recursive calls → O(n). Space: n stack frames → O(n) recursion depth.  
🏢 **Asked by**: Microsoft, Adobe

---

### Q16. What is the time complexity?
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 1; j < n; j *= 2) {
        cout << "*";
    }
}
```
A) O(n)  
B) O(n²)  
C) O(n log n)  
D) O(log n)  

✅ **Answer: C**  
📝 **Explanation**: Outer: O(n), Inner: O(log n). Total: O(n × log n) = O(n log n).  
🏢 **Asked by**: Google, Amazon

---

### Q17. What is the time complexity?
```cpp
void func(int n) {
    if(n <= 1) return;
    func(n-1);
    func(n-1);
}
```
A) O(n)  
B) O(n²)  
C) O(2ⁿ)  
D) O(n!)  

✅ **Answer: C**  
📝 **Explanation**: Each call branches into 2 calls. Recursion tree has 2ⁿ nodes → O(2ⁿ).  
🏢 **Asked by**: Meta, Google

---

### Q18. What is the overall complexity?
```cpp
// Part 1
for(int i = 0; i < n; i++) cout << i;

// Part 2
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++) cout << "*";
```
A) O(n)  
B) O(n²)  
C) O(n + n²)  
D) O(2n)  

✅ **Answer: B**  
📝 **Explanation**: O(n) + O(n²) = O(n²). Keep only the dominant term.  
🏢 **Asked by**: Amazon, Microsoft

---

### Q19. What is the time complexity of vector push_back?
A) Always O(1)  
B) Always O(n)  
C) O(1) amortized  
D) O(log n)  

✅ **Answer: C**  
📝 **Explanation**: Usually O(1), but occasionally O(n) when resizing. Average over many operations is O(1).  
🏢 **Asked by**: Google, Adobe

---

### Q20. What is the space complexity?
```cpp
vector<int> v;
for(int i = 0; i < n; i++) {
    v.push_back(i);
}
```
A) O(1)  
B) O(n)  
C) O(log n)  
D) O(n²)  

✅ **Answer: B**  
📝 **Explanation**: Vector stores n elements → O(n) space.  
🏢 **Asked by**: Amazon, Flipkart

---

## Section C: Application & Problem Solving (Hard)

### Q21. An algorithm takes 1 second for n=100. If complexity is O(n²), how long for n=1000?
A) 10 seconds  
B) 100 seconds  
C) 1000 seconds  
D) 1 second  

✅ **Answer: B**  
📝 **Explanation**: O(n²): Time ∝ n². n increased 10x → time increases 100x. 1 sec × 100 = 100 seconds.  
🏢 **Asked by**: Google, Codeforces

---

### Q22. Which algorithm is better for large n: O(n log n) or O(n²)?
A) O(n²)  
B) O(n log n)  
C) Both are same  
D) Depends on constant factors  

✅ **Answer: B**  
📝 **Explanation**: For large n, n log n << n². Example: n=10⁶, n log n ≈ 2×10⁷, n² = 10¹².  
🏢 **Asked by**: Amazon, Microsoft

---

### Q23. You need to search in a sorted array of 1 million elements. Which approach?
A) Linear search O(n)  
B) Binary search O(log n)  
C) Hash map O(1)  
D) Sort again O(n log n)  

✅ **Answer: B**  
📝 **Explanation**: Binary search on sorted array is O(log n). For n=10⁶, only ~20 comparisons needed!  
🏢 **Asked by**: Google, Adobe

---

### Q24. Why is O(2ⁿ) considered bad?
A) Uses too much memory  
B) Too slow for large inputs  
C) Difficult to implement  
D) Not accurate  

✅ **Answer: B**  
📝 **Explanation**: O(2ⁿ) doubles with each input increase. n=30 → 10⁹ operations (already too slow).  
🏢 **Asked by**: Meta, Amazon

---

### Q25. What is the space complexity of storing an n×n matrix?
A) O(n)  
B) O(n²)  
C) O(log n)  
D) O(1)  

✅ **Answer: B**  
📝 **Explanation**: n×n matrix has n² elements → O(n²) space.  
🏢 **Asked by**: Microsoft, Google

---

## Section D: Competitive Programming Traps

### Q26. Why does this TLE (Time Limit Exceeded)?
```cpp
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        for(int k = 0; k < n; k++)
            // O(1) work
// n = 1000
```
A) O(n³) = 10⁹ operations  
B) Infinite loop  
C) Memory overflow  
D) Wrong logic  

✅ **Answer: A**  
📝 **Explanation**: O(n³) with n=1000 gives 10⁹ operations. Typical limit is 10⁸ per second → TLE.  
🏢 **Asked by**: Codeforces, Google

---

### Q27. What's the hidden cost?
```cpp
string s = "";
for(int i = 0; i < n; i++) {
    s += 'a';
}
```
A) O(n) total  
B) O(n²) total (string reallocation)  
C) O(log n) total  
D) O(1) total  

✅ **Answer: B**  
📝 **Explanation**: String concatenation may reallocate and copy. Worst case: 1+2+3+...+n = O(n²). Use `reserve()` to fix.  
🏢 **Asked by**: Amazon, CodeChef

---

### Q28. Why is this wrong?
```cpp
// Claim: This is O(1)
int sum(int n) {
    return n * (n+1) / 2;
}
```
A) It's actually O(n)  
B) It's O(1) [correct claim]  
C) It's O(log n)  
D) Compilation error  

✅ **Answer: B**  
📝 **Explanation**: Formula calculates sum in constant time — no loops or recursion → O(1).  
🏢 **Asked by**: Microsoft, Adobe

---

### Q29. What's the actual complexity?
```cpp
map<int, int> m;
for(int i = 0; i < n; i++) {
    m[i] = i * 2;
}
```
A) O(n)  
B) O(n log n)  
C) O(n²)  
D) O(1)  

✅ **Answer: B**  
📝 **Explanation**: Each map insertion is O(log n). n insertions → O(n log n) total.  
🏢 **Asked by**: Google, Amazon

---

### Q30. Which is faster for checking existence?
A) vector::find O(n)  
B) set::count O(log n)  
C) unordered_set::count O(1) average  
D) Both B and C  

✅ **Answer: D**  
📝 **Explanation**: Both set (O(log n)) and unordered_set (O(1) avg) are faster than vector (O(n)).  
🏢 **Asked by**: Meta, Microsoft

---

### Q31. What's the trap in space complexity?
```cpp
void recursive(int n) {
    if(n <= 0) return;
    int arr[1000];  // Local array
    recursive(n-1);
}
```
A) O(1) space  
B) O(n) space  
C) O(1000n) space  
D) O(n²) space  

✅ **Answer: C**  
📝 **Explanation**: Each recursive call creates 1000-int array. Depth n → 1000n total space = O(n).  
🏢 **Asked by**: Google, Amazon

---

### Q32. Why does this pass in contest?
```cpp
// O(n²) algorithm with n = 5000
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        // O(1) work
```
A) n² = 2.5×10⁷ (acceptable)  
B) Compiler optimizes it  
C) Wrong complexity analysis  
D) Test cases are weak  

✅ **Answer: A**  
📝 **Explanation**: 2.5×10⁷ operations < 10⁸ limit → passes within 1 second.  
🏢 **Asked by**: Codeforces, CodeChef

---

### Q33. What's wrong with this analysis?
```cpp
for(int i = 1; i <= n; i *= 2)      // log n
    for(int j = 1; j <= i; j++)      // i iterations
        cout << "*";
// Claim: O(n log n)
```
A) Actually O(n)  
B) Actually O(n log n) [correct]  
C) Actually O(n²)  
D) Actually O(log n)  

✅ **Answer: A**  
📝 **Explanation**: 1 + 2 + 4 + 8 + ... + n = 2n - 1 = O(n). Geometric series sums to O(n), not O(n log n).  
🏢 **Asked by**: Google, Microsoft

---

### Q34. Which optimization is best?
```cpp
// Current: O(n²)
for(int i = 0; i < n; i++)
    for(int j = 0; j < n; j++)
        if(a[i] + a[j] == target) return true;
```
A) Use sorting + binary search O(n log n)  
B) Use hash set O(n)  
C) Use two pointers O(n log n)  
D) All of the above  

✅ **Answer: D**  
📝 **Explanation**: All three approaches improve O(n²) to better complexities. Hash set gives best O(n).  
🏢 **Asked by**: Amazon, Meta

---

### Q35. What's the space complexity of merge sort?
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)  

✅ **Answer: C**  
📝 **Explanation**: Merge sort needs temporary array for merging → O(n) extra space.  
🏢 **Asked by**: Google, Adobe

---

## 📊 Score Interpretation

- **32-35 Correct (90-100%)**: ✅ Excellent! Ready for Arrays
- **28-31 Correct (80-89%)**: ⚠️ Good, review weak areas
- **24-27 Correct (68-79%)**: ❌ Need more practice with complexity analysis
- **Below 24**: 📚 Re-read `01_notes.md` completely

---

## 🎯 Next Steps

1. Review all incorrect answers
2. Practice analyzing 20+ code snippets manually
3. Memorize common complexities table
4. Move to **02_Arrays** when ready

[← Back to Notes](01_notes.md) | [Next: Arrays →](../02_Arrays/02_notes.md)

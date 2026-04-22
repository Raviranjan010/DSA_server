# 📝 ARRAYS — Part 5: MCQ Bank (80 Questions, All Difficulty Levels)

> Each question has: correct answer + detailed explanation + why wrong options are wrong + company tag

---

## SECTION A: Memory, Fundamentals (Q1–Q20)

### Q1. Where does `vector<int> v(100)` allocate memory?
A) Stack  
B) Heap  
C) Static/Global  
D) CPU Cache  

✅ **Answer: B**  
📝 Vectors always allocate their data on the **heap** (dynamic memory), regardless of where the vector object itself is declared. This is why they're safe for large sizes.  
❌ A: Stack is only for local raw arrays. ❌ C: That's for global variables.  
🏢 Google (systems round)

---

### Q2. `int arr[5] = {1, 2}` — what is `arr[4]`?
A) Garbage value  
B) 0  
C) 2  
D) Undefined behavior  

✅ **Answer: B**  
📝 In C++, when you partially initialize an array, **remaining elements are zero-initialized**. This is guaranteed by the standard.  
❌ A: Garbage only happens with NO initializer (e.g., `int arr[5];`)  
🏢 TCS, Microsoft

---

### Q3. What is `sizeof(arr) / sizeof(arr[0])` calculating?
A) Address of array  
B) Number of bytes per element  
C) Total number of elements in array  
D) Pointer to first element  

✅ **Answer: C**  
📝 `sizeof(arr)` = total bytes. `sizeof(arr[0])` = bytes per element. Division gives count.  
⚠️ Only works in the SAME scope as the declaration. In a function, `arr` decays to pointer!  
🏢 Amazon, Adobe

---

### Q4. The address of `arr[3]` when `arr` starts at address 2000 (each int = 4 bytes):
A) 2003  
B) 2012  
C) 2004  
D) 2009  

✅ **Answer: B**  
📝 Address = Base + index × size = 2000 + 3 × 4 = 2012.  
🏢 TCS, Infosys

---

### Q5. Which of these makes `v.push_back()` potentially O(n)?
A) Vector is empty  
B) Vector capacity is full (must reallocate)  
C) Vector size exceeds 100  
D) push_back is always O(1)  

✅ **Answer: B**  
📝 When capacity is full, vector allocates new (larger) memory and copies ALL elements → O(n) for that one call. But this happens rarely, so **amortized** cost is O(1).  
🏢 Google, Amazon

---

### Q6. `v.size() - 1` when `v` is an empty vector — what happens?
A) Returns -1  
B) Returns 0  
C) Returns a very large number (unsigned wrap-around)  
D) Compilation error  

✅ **Answer: C**  
📝 `v.size()` returns `size_t` which is **unsigned**. 0 - 1 in unsigned arithmetic = `SIZE_MAX` ≈ 4.2 billion (on 32-bit) or 18 quintillion (on 64-bit). This causes infinite loops!  
Fix: `if(!v.empty() && ...)` or cast: `(int)v.size() - 1`  
🏢 Codeforces, Amazon

---

### Q7. Raw array in a function: `void f(int arr[])`. What does `sizeof(arr)` give?
A) Total size of array in bytes  
B) Size of one element  
C) Size of a pointer (4 or 8 bytes)  
D) Number of elements  

✅ **Answer: C**  
📝 Arrays **decay** to pointers when passed to functions. The function sees `int*`, not the full array. `sizeof(int*)` = 8 bytes on 64-bit systems, regardless of array size.  
Fix: Pass size separately, or use `vector<int>&` or `vector<int>&`.  
🏢 Google, Microsoft

---

### Q8. `v.reserve(100)` followed by `cout << v.size()`. Output?
A) 100  
B) 0  
C) Garbage  
D) Error  

✅ **Answer: B**  
📝 `reserve` allocates **capacity** but does NOT add elements. Size remains 0. Only `push_back`, `resize`, or assignment actually add elements.  
🏢 Amazon, Codeforces

---

### Q9. `v.at(5)` vs `v[5]` — key difference?
A) `at()` is faster  
B) `at()` throws `std::out_of_range` if index invalid; `[]` is undefined behavior  
C) `[]` throws exception  
D) No difference  

✅ **Answer: B**  
📝 `v[5]` on invalid index = undefined behavior (may crash or silently corrupt data). `v.at(5)` checks bounds and throws catchable exception.  
Use `at()` during development, `[]` in production for speed.  
🏢 Microsoft, Adobe

---

### Q10. Which iteration correctly reads all elements?
A) `for(int i=0; i<=v.size(); i++) cout<<v[i];`  
B) `for(int i=0; i<v.size(); i++) cout<<v[i];`  
C) `for(int i=1; i<=v.size(); i++) cout<<v[i];`  
D) `for(int i=0; i<=v.size()-1; i++) cout<<v[i];` (when v is empty)  

✅ **Answer: B**  
📝 A accesses v[size] (out of bounds). C misses v[0] and accesses v[size]. D: when empty, v.size()-1 wraps around.  
🏢 TCS, Infosys

---

### Q11. After `sort(v.begin(), v.end())`, what is the time complexity?
A) O(n)  
B) O(n²)  
C) O(n log n)  
D) O(log n)  

✅ **Answer: C**  
📝 C++ STL sort uses **introsort** (quicksort + heapsort + insertionsort hybrid). Guaranteed O(n log n) worst case.  
🏢 Amazon, Google

---

### Q12. `lower_bound(v.begin(), v.end(), x)` returns:
A) Iterator to first element == x  
B) Iterator to first element >= x  
C) Iterator to first element > x  
D) Index of x  

✅ **Answer: B**  
📝 `lower_bound` returns iterator to **first element ≥ x**. `upper_bound` returns first element **> x**.  
If x not found, both point to where x WOULD be inserted.  
🏢 Codeforces, Amazon

---

### Q13. Given sorted `v = [1,1,2,2,2,3,3]`. How to count occurrences of 2?
A) `count(v.begin(), v.end(), 2)` → O(n)  
B) `upper_bound - lower_bound` → O(log n)  
C) Both are correct, B is faster  
D) Neither works  

✅ **Answer: C**  
📝 Both give correct answer (3). A is O(n) linear scan. B uses binary search twice → O(2 log n) = O(log n). For competitive programming, B is preferred.  
🏢 Google, Amazon

---

### Q14. `auto it = find(v.begin(), v.end(), x)`. How to get the INDEX?
A) `*it`  
B) `it`  
C) `it - v.begin()`  
D) `v.index(it)`  

✅ **Answer: C**  
📝 Iterators support pointer arithmetic. `it - v.begin()` gives the 0-based index.  
If not found, `it == v.end()`, so `it - v.begin() == v.size()`.  
🏢 Adobe, Microsoft

---

### Q15. What does `v.erase(v.begin())` do?
A) Removes last element, O(1)  
B) Removes first element, O(n) (shifts all)  
C) Removes first element, O(1)  
D) Clears entire vector  

✅ **Answer: B**  
📝 Erasing from front requires shifting all remaining elements left. O(n). (Use `deque` if frequent front insertions/deletions needed.)  
🏢 Amazon, Meta

---

### Q16. When is `long long` REQUIRED instead of `int`?
A) Always, for safety  
B) When value can exceed ~2.1 billion (2³¹-1)  
C) Only with negative numbers  
D) Only with floating point  

✅ **Answer: B**  
📝 `int` max ≈ 2.1 × 10⁹. Common overflow triggers:  
- Sum of n=10⁵ elements each up to 10⁹ → sum can reach 10¹⁴  
- Product calculations  
- Indices beyond 2 billion  
Rule: If n × max_value > 2 × 10⁹, use `long long`.  
🏢 Codeforces, Amazon

---

### Q17. Which is the SAFEST way to declare large array for competitive programming?
A) `int main() { int arr[1000000]; ... }`  
B) `int arr[1000000]; int main() { ... }` (global)  
C) `int main() { int* arr = new int[1000000]; ... }`  
D) Both B and C  

✅ **Answer: D**  
📝 B: Global arrays are on static memory, larger limit, auto-initialized to 0. C: Heap allocation via `new`, also safe. A is DANGEROUS (stack overflow). `vector<int>(1000000)` is also safe.  
🏢 Codeforces, CodeChef

---

### Q18. `unique(v.begin(), v.end())` — what does it do?
A) Removes all duplicates  
B) Removes CONSECUTIVE duplicates, returns iterator to new end  
C) Sorts the array  
D) Returns count of unique elements  

✅ **Answer: B**  
📝 `unique` only removes **consecutive** duplicates! To remove ALL duplicates, sort first then apply unique:  
```cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
```  
🏢 Codeforces, Microsoft

---

### Q19. What is `INT_MAX + 1` in C++?
A) 2147483648  
B) -2147483648 (INT_MIN — overflow wraps to negative!)  
C) Compilation error  
D) 0  

✅ **Answer: B**  
📝 Integer overflow is **undefined behavior** in C++. In practice on most systems, it wraps around. INT_MAX + 1 = -2147483648 = INT_MIN. This is a nasty bug source!  
Fix: Use `long long` before operations that might overflow.  
🏢 Google (tricky question!)

---

### Q20. Accessing a deleted vector's element — what happens?
```cpp
vector<int>* p = new vector<int>{1,2,3};
delete p;
cout << (*p)[0];  // ?
```
A) Prints 1  
B) Undefined behavior — may print garbage or crash  
C) Compilation error  
D) Throws exception  

✅ **Answer: B**  
📝 Accessing memory after `delete` is **undefined behavior** (use-after-free). Memory may be reused, showing garbage or crashing. Modern sanitizers (ASAN) catch this.  
🏢 Google, Codeforces

---

## SECTION B: Pattern Recognition (Q21–Q45)

### Q21. Problem: "Find max sum of k consecutive elements." Pattern?
A) Two Pointers  
B) Fixed Sliding Window  
C) Kadane's  
D) Prefix Sum  

✅ **Answer: B**  
📝 Fixed window size k → fixed sliding window. Build first window sum, then slide (add new, remove old). O(n) vs O(n×k) brute force.  
🏢 Meta, Amazon

---

### Q22. Problem: "Count subarrays with sum = k. Array has NEGATIVES." Pattern?
A) Sliding Window (can't! negatives break it)  
B) Prefix Sum + HashMap  
C) Two Pointers  
D) Kadane's  

✅ **Answer: B**  
📝 Sliding window only works when all values positive (so growing/shrinking window changes sum predictably). With negatives, use prefix sum + hashmap.  
🏢 Meta, Amazon

---

### Q23. Problem: "Longest substring with at most k distinct characters." Pattern?
A) Fixed Sliding Window  
B) Variable Sliding Window  
C) Two Pointers on sorted  
D) Binary Search  

✅ **Answer: B**  
📝 Window size isn't fixed; it depends on content. Expand right, shrink left when distinct chars > k. Track with hashmap.  
🏢 Amazon, Google

---

### Q24. Problem: "Array of n ints in [1,n], find duplicate." Best O(1) space approach?
A) Sort and check adjacent  
B) HashSet  
C) Floyd's Cycle Detection  
D) Cyclic Sort  

✅ **Answer: C or D**  
📝 Both C (Floyd's, treats as linked list) and D (cyclic sort, places at correct index) work in O(n) time, O(1) space. C is more elegant; D modifies input.  
🏢 Google, Amazon

---

### Q25. Problem: "Find all triplets summing to 0." Optimal approach?
A) Three nested loops O(n³)  
B) Sort + Two Pointers O(n²)  
C) HashSet O(n²) time O(n) space  
D) Divide and conquer  

✅ **Answer: B**  
📝 Sort makes it easy to skip duplicates and use two pointers for inner loop. Both B and C are O(n²), but B uses O(1) extra space. For unique triplets, B handles duplicate skipping more cleanly.  
🏢 Meta, Google

---

### Q26. Problem: "Sort array of 0s, 1s, 2s in ONE PASS." Pattern?
A) Two pointer from both ends  
B) Dutch National Flag (three pointers)  
C) Counting sort (count each value, refill)  
D) Bubble sort  

✅ **Answer: B**  
📝 Counting sort also works in O(n) but uses TWO passes. DNF is ONE pass (the question requirement). DNF uses three pointers: low, mid, high.  
Note: If one pass not required, counting sort is simpler to implement.  
🏢 Microsoft, Amazon

---

### Q27. Problem: "Is there a subarray with sum 0?" Best approach?
A) Check all pairs: O(n²)  
B) Prefix Sum + HashSet: O(n) — if same prefix appears twice, there's a zero-sum subarray  
C) Sort + two pointers  
D) Sliding window  

✅ **Answer: B**  
📝 Key insight: if prefix[i] == prefix[j] (i≠j), then sum(i+1..j) = 0. Also if any prefix[i] = 0, then sum(0..i) = 0. Use a hashset.  
🏢 Amazon, Codeforces

---

### Q28. Kadane's on `[-5, -3, -1, -4]` (all negative) returns?
A) 0  
B) -1  
C) -5  
D) -13  

✅ **Answer: B**  
📝 Kadane's initialized with arr[0]=-5. Finds that -1 (at index 2) is the maximum element. Since we MUST include at least one element, -1 is the correct answer (least negative).  
❌ A would be wrong: 0 means empty subarray, but problem says "at least one element."  
🏢 Amazon, Microsoft

---

### Q29. Two Sum with unsorted array — which is BETTER, why?
A) Sort + Two Pointers: O(n log n) time, O(1) space. Better if memory is limited.  
B) HashMap: O(n) time, O(n) space. Better if speed is priority.  
C) Both are optimal  
D) Sort + Two Pointers is always better  

✅ **Answer: B**  
📝 It depends! HashMap is faster (O(n) vs O(n log n)) but uses O(n) space. Two pointers is slower but O(1) space. For interviews, mention both and discuss tradeoff.  
⚠️ Sort + Two Pointers loses original indices! If you need indices, must use HashMap.  
🏢 Google (trade-off question)

---

### Q30. What's the time complexity of finding k-th largest element?
A) O(n log n) with sort  
B) O(n) average with QuickSelect  
C) O(n log k) with min-heap of size k  
D) All of the above  

✅ **Answer: D**  
📝 All three work! A is simplest. B is fastest on average (worst O(n²)). C is better if k << n. For large k close to n, QuickSelect wins.  
In interviews, knowing ALL three and their tradeoffs impresses.  
🏢 Amazon, Microsoft

---

### Q31. Prefix Sum query `sum(L, R)` formula (0-indexed array, 1-indexed prefix)?
A) prefix[R] - prefix[L]  
B) prefix[R+1] - prefix[L]  
C) prefix[R] - prefix[L-1]  
D) prefix[R+1] - prefix[L-1]  

✅ **Answer: B**  
📝 With prefix array of size n+1 where prefix[0]=0 and prefix[i] = prefix[i-1] + arr[i-1]:  
sum(L, R) = prefix[R+1] - prefix[L]  
This includes arr[L] through arr[R] exactly.  
🏢 Google, Amazon

---

### Q32. Which approach is WRONG for variable sliding window?
A) Expand right always  
B) Shrink left when condition VIOLATED  
C) Shrink left when condition MET (for minimum length)  
D) Using sliding window when array has negative values  

✅ **Answer: D**  
📝 D is the wrong approach (not wrong syntax). Sliding window with sum-based conditions fails for negative values because adding elements doesn't guarantee sum changes predictably.  
A, B, C are all valid steps in the sliding window algorithm.  
🏢 Meta, Amazon

---

### Q33. For `lower_bound` and `upper_bound` to work correctly, the array must be:
A) Contain only positive integers  
B) Sorted in ascending order  
C) Sorted in any order  
D) Have no duplicates  

✅ **Answer: B**  
📝 Binary search (and lower/upper_bound) requires sorted (ascending) array. For descending, use custom comparator. Duplicates are fine.  
🏢 Amazon, Codeforces

---

### Q34. Rotation by k=0 or k=n should:
A) Always rotate  
B) Be handled as no-op (k = k % n; if k==0 return)  
C) Cause error  
D) Reverse the array  

✅ **Answer: B**  
📝 k % n: if k=n, k%n=0 (no rotation). if k=0, k%n=0 (no rotation). Always modulo k first!  
🏢 Amazon, Microsoft

---

### Q35. Which problem CANNOT be solved with simple sliding window?
A) Maximum sum of k consecutive elements  
B) Minimum window substring  
C) Count subarrays with sum = k (array has negatives)  
D) Longest subarray with at most k zeros  

✅ **Answer: C**  
📝 C requires prefix sum + hashmap because negatives break the monotonic relationship needed for window shrinking logic. All others work with sliding window.  
🏢 Meta, Amazon

---

## SECTION C: Code Output Tracing (Q36–Q55)

### Q36. What is the output?
```cpp
vector<int> v = {5, 3, 8, 1, 9, 2};
sort(v.begin(), v.end());
cout << v[0] << " " << v.back() << " " << v[v.size()/2];
```
A) 5 2 3  
B) 1 9 3  
C) 1 9 5  
D) 5 2 8  

✅ **Answer: B**  
📝 After sort: {1,2,3,5,8,9}. v[0]=1, v.back()=9, v[3]=5. Wait: v.size()/2 = 6/2 = 3, v[3]=5.  
Answer: `1 9 5`  
✅ **Corrected: C**  
🏢 TCS, Adobe

---

### Q37. Output?
```cpp
vector<int> v = {1,2,3,4,5};
int result = 0;
for(int x : v) result ^= x;
cout << result;
```
A) 15  
B) 1  
C) 3  
D) 5  

✅ **Answer: B**  
📝 1^2=3, 3^3=0, 0^4=4, 4^5=1. Result = 1.  
This is XOR of 1 to 5. XOR of 1..n follows a pattern: [1,0,n,1] cycling by n%4.  
n=5, 5%4=1 → XOR=1.  
🏢 Amazon, Meta

---

### Q38. What does this return for `arr = [3, 1, 2]`?
```cpp
int i = 0;
while(i < arr.size()) {
    int j = arr[i] - 1;
    if(arr[i] != arr[j]) swap(arr[i], arr[j]);
    else i++;
}
for(int i=0; i<arr.size(); i++)
    if(arr[i] != i+1) return i+1;
return arr.size()+1;
```
A) 3  
B) 0  
C) 4  
D) 1  

✅ **Answer: C**  
📝 Cyclic sort: places 1→index0, 2→index1, 3→index2. Result: [1,2,3]. All correct. Return 3+1=4.  
Means all 1,2,3 are present, so smallest missing positive is 4.  
🏢 Google

---

### Q39. What is `result`?
```cpp
vector<int> arr = {2, 7, 11, 15};
unordered_map<int,int> seen;
int target = 9, result = -1;
for(int i = 0; i < arr.size(); i++) {
    int comp = target - arr[i];
    if(seen.count(comp)) { result = seen[comp] + i; break; }
    seen[arr[i]] = i;
}
cout << result;
```
A) -1  
B) 0  
C) 1  
D) 2  

✅ **Answer: C**  
📝 i=0: comp=7, not in seen. seen={2:0}  
i=1: comp=2, found in seen! seen[2]=0. result = 0+1 = 1. break.  
Output: 1  
🏢 Google, Amazon

---

### Q40. Output of Dutch National Flag on `[2,1,0]`?
```cpp
int lo=0, mid=0, hi=2;
while(mid<=hi) {
    if(arr[mid]==0) swap(arr[lo++],arr[mid++]);
    else if(arr[mid]==1) mid++;
    else swap(arr[mid],arr[hi--]);
}
// Print arr
```
A) 2 1 0  
B) 0 1 2  
C) 1 0 2  
D) 0 2 1  

✅ **Answer: B**  
📝 arr[0]=2: swap with hi=2, hi=1. arr=[0,1,2]? Wait: arr=[2,1,0]. swap(arr[0],arr[2])=[0,1,2], hi=1. arr[mid=0]=0: swap(arr[0],arr[0]), lo=1,mid=1. arr[mid=1]=1: mid=2. mid>hi=1, stop. Result: [0,1,2].  
🏢 Microsoft

---

### Q41. Output?
```cpp
vector<int> v = {1,2,3,4,5};
rotate(v.begin(), v.begin()+2, v.end());
for(int x : v) cout << x << " ";
```
A) 3 4 5 1 2  
B) 1 2 3 4 5  
C) 4 5 1 2 3  
D) 5 4 3 2 1  

✅ **Answer: A**  
📝 `rotate(first, new_begin, last)`: rotates so that element at `new_begin` comes first. v.begin()+2 points to element 3. So 3 becomes first: [3,4,5,1,2].  
🏢 Codeforces, Google

---

### Q42. What is `maxProfit([7,6,4,3,1])`?
```cpp
int min_p = prices[0], profit = 0;
for(int i=1; i<prices.size(); i++) {
    min_p = min(min_p, prices[i]);
    profit = max(profit, prices[i] - min_p);
}
return profit;
```
A) -1  
B) -6  
C) 0  
D) 1  

✅ **Answer: C**  
📝 Prices always decrease: [7,6,4,3,1]. Profit = prices[i] - min_price ≤ 0 always. `max(profit, negative) = 0` since profit starts at 0. Return 0.  
This is correct: no profitable transaction exists.  
🏢 Amazon, Meta

---

### Q43. Output?
```cpp
vector<int> a = {3,1,4,1,5,9};
int result = 0;
for(int x : a) result = max(result, x);
cout << result;
```
A) 3  
B) 9  
C) 5  
D) 23  

✅ **Answer: B**  
📝 Linear scan: max element = 9.  
🏢 TCS, Adobe

---

### Q44. What does this print?
```cpp
vector<int> v = {10,20,30,40,50};
vector<int> w(v);   // Copy
w[0] = 99;
cout << v[0] << " " << w[0];
```
A) 99 99  
B) 10 99  
C) 99 10  
D) 10 10  

✅ **Answer: B**  
📝 `vector<int> w(v)` creates a **deep copy**. Modifying w[0] doesn't affect v.  
(Contrast with `vector<int>& w = v` which IS the same vector)  
🏢 Microsoft, Adobe

---

### Q45. Time complexity?
```cpp
for(int i=0; i<n; i++)
    for(int j=i; j<n; j++)
        for(int k=j; k<n; k++)
            sum++;
```
A) O(n)  
B) O(n²)  
C) O(n³)  
D) O(n² log n)  

✅ **Answer: C**  
📝 Three nested loops, each inner starts from previous index. Number of iterations = C(n+2, 3) = n(n+1)(n+2)/6 = O(n³).  
🏢 Google, Amazon

---

## SECTION D: Advanced & Traps (Q46–Q65)

### Q46. Maximum subarray sum of `[−2, −3, 4, −1, −2, 1, 5, −3]`?
A) 4  
B) 5  
C) 6  
D) 7  

✅ **Answer: D**  
📝 Kadane's traces: subarray [4,-1,-2,1,5] = 4-1-2+1+5 = 7. Full trace:  
cur=[−2,−3,4,3,1,2,7,4], global=7  
🏢 Amazon, Microsoft

---

### Q47. For the problem "n=2×10⁵, need O(n²) algorithm" — is this acceptable?
A) Yes, modern computers handle it  
B) No, 2×10⁵ × 2×10⁵ = 4×10¹⁰ operations >> 10⁸ (1 sec limit)  
C) Yes, with fast I/O  
D) Depends on constant factor  

✅ **Answer: B**  
📝 Standard competitive programming rule: ~10⁸ simple operations per second. O(n²) with n=2×10⁵ → 4×10¹⁰ operations → ~400 seconds. Clearly TLE.  
Need O(n log n) or O(n).  
🏢 Codeforces, Google

---

### Q48. What's wrong with this Kadane's for maximum circular subarray?
```cpp
// Approach: max(kadane_normal, total_sum - kadane_minimum)
// If all elements negative, kadane_minimum = total_sum → maxCircular = 0
// Is 0 correct?
```
A) Nothing wrong  
B) If all negative: circular max would be 0 (empty subarray), but we need at least one element  
C) Formula is incorrect  
D) Should use prefix sum  

✅ **Answer: B**  
📝 Problem says "at least one element". For all-negative array, linear Kadane's returns the least negative element. Circular would return 0 (total - total) meaning empty subarray. Must handle: `if(maxLinear < 0) return maxLinear`.  
🏢 Amazon, Google

---

### Q49. `merge(v.begin(), v.end(), w.begin(), w.end(), out.begin())` — what does it require?
A) v and w must be same size  
B) v and w must both be sorted  
C) out must be empty  
D) All elements must be unique  

✅ **Answer: B**  
📝 `std::merge` requires both input ranges to be sorted. It merges them into one sorted range.  
Time: O(m+n). Space: O(m+n) for output.  
🏢 Microsoft, Amazon

---

### Q50. You need range updates AND range queries. Which structure?
A) Prefix sum (O(n) update)  
B) Difference array (O(n) to reconstruct)  
C) Segment tree (O(log n) update, O(log n) query)  
D) Binary Indexed Tree (Fenwick tree)  

✅ **Answer: C**  
📝 Segment tree with lazy propagation: O(log n) for both range update and range query. BIT can also handle this with offset trick.  
Prefix sum: O(1) query but O(n) update. Difference array: O(1) update but O(n) to reconstruct.  
🏢 Codeforces, Google

---

### Q51. Two Sum: if original indices needed, MUST use?
A) Sort + Two Pointers  
B) HashMap  
C) Either  
D) Binary search  

✅ **Answer: B**  
📝 Sorting changes original indices! If you need to return original positions, you must use HashMap (or track original indices with pair<val,idx> before sorting).  
🏢 Google, Amazon

---

### Q52. What is the space complexity of merge sort?
A) O(1)  
B) O(log n) — for recursive call stack  
C) O(n) — for temporary merge array  
D) O(n log n)  

✅ **Answer: C**  
📝 Merge step needs O(n) temporary array. Recursive depth is O(log n) for call stack. Total: O(n + log n) = O(n).  
🏢 Amazon, Google

---

### Q53. Floyd's Cycle Detection in array for finding duplicate:
Array represents linked list: `value → next node`. Duplicate creates cycle. Phase 1 finds meeting point. Phase 2 finds?
A) The duplicate value  
B) The length of cycle  
C) The midpoint of array  
D) The maximum element  

✅ **Answer: A**  
📝 In Phase 2, reset slow to beginning. Move slow and fast at same speed. They meet at the cycle entrance = the duplicate number.  
Mathematical proof: distance to cycle entrance = distance from meeting point to cycle entrance.  
🏢 Google, Amazon

---

### Q54. After `v.erase(v.begin()+2)`, what happens to iterator `it` that pointed to `v.begin()+4`?
A) it still valid, now points to same value  
B) it is invalidated — using it is undefined behavior  
C) it now points to one element earlier  
D) it becomes null  

✅ **Answer: B**  
📝 Erasing from a vector invalidates ALL iterators AT and AFTER the erased position (because elements shift). Iterators before the erased position remain valid.  
Fix: reassign iterator after any modifying operation.  
🏢 Codeforces, Microsoft

---

### Q55. For sorting by FREQUENCY (most frequent first), the comparator should be?
```cpp
unordered_map<int,int> freq;
// ... fill freq ...
sort(v.begin(), v.end(), ???);
```
A) `[](int a, int b){ return a > b; }`  
B) `[&](int a, int b){ return freq[a] > freq[b]; }`  
C) `[&](int a, int b){ return freq[a] < freq[b]; }`  
D) `greater<int>()`  

✅ **Answer: B**  
📝 Custom lambda captures `freq` by reference `[&]`. Comparison: higher frequency first means `freq[a] > freq[b]` for descending order.  
🏢 Amazon, Meta

---

## SECTION E: Company-Style Questions (Q56–Q80)

### Q56. [Google] Given prefix = [0,3,4,8,9,14,23,25,31]. Sum from index 3 to 6 (0-indexed)?
A) 14  
B) 17  
C) 21  
D) 19  

✅ **Answer: C**  
📝 sum(3,6) = prefix[7] - prefix[3] = 25 - 4... wait, arr is 0-indexed. prefix[R+1]-prefix[L] = prefix[7]-prefix[3] = 25-8 = 17.  
Actually arr[3]+arr[4]+arr[5]+arr[6] = 1+5+9+2 = 17.  
✅ **Corrected: B (17)**  
🏢 Google

---

### Q57. [Amazon] Best Time to Buy/Sell Stock II: can do unlimited transactions. `[1,2,3,4,5]` max profit?
A) 4  
B) 6  
C) 8  
D) 5  

✅ **Answer: A**  
📝 Buy at 1, sell at 5 = 4. Or: sum of all positive differences: (2-1)+(3-2)+(4-3)+(5-4) = 1+1+1+1 = 4.  
Greedy: add every day's positive gain.  
🏢 Amazon

---

### Q58. [Microsoft] Set Matrix Zeroes: if matrix[i][j]=0, set row i and col j to 0. O(1) space trick?
A) Use first row and col as markers  
B) Copy entire matrix  
C) Use recursion  
D) Sort each row  

✅ **Answer: A**  
📝 First, check if first row/col themselves have zeros (save in boolean). Then use matrix[0][j] and matrix[i][0] as flags. Process inner matrix based on flags. Finally process first row/col.  
🏢 Microsoft, Amazon

---

### Q59. [Meta] Subarray Sum Equals K. Why `prefixCount[0] = 1` initially?
A) To avoid division by zero  
B) To handle subarrays starting from index 0  
C) To initialize the hashmap  
D) It's optional  

✅ **Answer: B**  
📝 If the entire prefix from index 0 to i has sum k, we need to count that subarray. Without `prefixCount[0]=1`, we'd miss it. Example: arr=[1,1], k=2. prefixSum becomes 2. We check prefixCount[2-2]=prefixCount[0]. Without this init, count=0 (wrong). With it, count=1 ✓.  
🏢 Meta, Amazon

---

### Q60. [Codeforces] Difference array `diff[L]+=v; diff[R+1]-=v`. After reconstructing, `arr[i]` represents?
A) Number of updates that included index i  
B) Sum of all v values applied to index i  
C) Net effect at index i from all range updates  
D) Maximum v applied to index i  

✅ **Answer: C**  
📝 The prefix sum of the difference array gives the net value added to each index from all range updates applied so far. Multiple overlapping ranges are handled correctly.  
🏢 Codeforces

---

### Q61. [Amazon] Trapping Rain Water: what does `leftMax` represent at each position?
A) Height of tallest bar to the left  
B) Maximum water level from the left boundary  
C) Maximum height in entire array  
D) Average height to the left  

✅ **Answer: A**  
📝 `leftMax[i]` = max(height[0], height[1], ..., height[i]) = the tallest bar at or before index i. Water level at i = min(leftMax[i], rightMax[i]).  
🏢 Amazon

---

### Q62. [Google] Boyer-Moore Voting Algorithm guarantees finding majority ONLY when:
A) Array is sorted  
B) Majority element (>n/2 times) is guaranteed to exist  
C) Array has exactly one unique element  
D) Array has no duplicates  

✅ **Answer: B**  
📝 Boyer-Moore finds a CANDIDATE. If majority is not guaranteed, you MUST verify the candidate with a second pass count. Without guarantee, algorithm may return wrong answer.  
🏢 Google, Adobe

---

### Q63. [Adobe] Next permutation: what to do when array is already the LARGEST permutation?
A) Return the array unchanged  
B) Reverse the entire array (gives smallest permutation)  
C) Sort the array  
D) Return -1  

✅ **Answer: B**  
📝 When array is in descending order (largest), no larger permutation exists. The algorithm's Step 4 (reverse suffix) reverses the entire array, giving the lexicographically SMALLEST permutation = ascending order. Problem says "wrap around to lowest."  
🏢 Adobe, Microsoft

---

### Q64. [Codeforces] You have n=10⁵, Q=10⁵ queries of "sum(L,R)". What to do?
A) For each query, loop from L to R → O(n×Q) = 10¹⁰. TLE!  
B) Build prefix sum array once, answer each query in O(1) → O(n+Q) = 2×10⁵. Fast!  
C) Use sorting  
D) Binary search for each query  

✅ **Answer: B**  
📝 Classic prefix sum use case. O(n) build. O(1) per query. O(n+Q) total = easily within time limits.  
🏢 Codeforces, Google

---

### Q65. [Amazon] Floyd's Cycle detection vs Cyclic Sort for "find duplicate" — key difference?
A) No difference  
B) Floyd's: O(n) time, O(1) space, does NOT modify array. Cyclic Sort: O(n) time, O(1) space, MODIFIES array  
C) Floyd's is slower  
D) Cyclic Sort handles multiple duplicates; Floyd's doesn't  

✅ **Answer: B**  
📝 If the array should not be modified, use Floyd's. If modification is allowed (and multiple problems needed like all missing + duplicate), use Cyclic Sort.  
🏢 Amazon

---

### Q66. [Google] `partial_sum(arr.begin(), arr.end(), result.begin())` computes?
A) Sum of first half  
B) Prefix sums (result[i] = sum of arr[0..i])  
C) Partial sort  
D) Running maximum  

✅ **Answer: B**  
📝 `std::partial_sum` from `<numeric>`: result[i] = arr[0] + arr[1] + ... + arr[i]. Equivalent to building prefix sum but in-place or to another array.  
🏢 Codeforces, Google

---

### Q67. [TCS] Reverse array [1,2,3,4,5]. How many swaps needed?
A) 5  
B) 4  
C) 2  
D) 3  

✅ **Answer: C**  
📝 Two-pointer reversal: swap(0,4), swap(1,3). Index 2 stays. Total: n/2 = 5/2 = 2 swaps (integer division).  
🏢 TCS, Infosys

---

### Q68. [Infosys] What is the second largest element in [3,1,4,1,5,9,2,6]?
A) 6  
B) 5  
C) 9  
D) 8  

✅ **Answer: A**  
📝 Sorted (unique): 1,2,3,4,5,6,9. Second largest = 6.  
In code: track `first` and `second` in one pass. second = 6.  
🏢 TCS, Infosys

---

### Q69. [Meta] Contiguous Array (LC 525): find longest subarray with equal 0s and 1s. Trick?
A) Two Pointers  
B) Replace 0 with -1, use prefix sum + hashmap  
C) Count 0s and 1s separately  
D) Dutch National Flag  

✅ **Answer: B**  
📝 Replace 0→-1. Now equal 0s and 1s means subarray sum = 0. Use prefix sum + hashmap: same prefix seen twice → subarray between has sum 0.  
Length = current_index - first_occurrence_index.  
🏢 Meta, Amazon

---

### Q70. [Microsoft] Why does rotating by reversal work for `[1,2,3,4,5]` right-rotate by 2?
A) Mathematical coincidence  
B) Three reversals compose to a rotation: reverse all → reverse first k → reverse rest  
C) It only works for even-length arrays  
D) It doesn't always work  

✅ **Answer: B**  
📝 Proof: after right-rotating by k, last k elements come to front. Reverse all: [5,4,3,2,1]. Reverse first k=2: [4,5,3,2,1]. Reverse rest: [4,5,1,2,3]. The three reversals mathematically decompose the rotation.  
🏢 Microsoft, Amazon

---

## SECTION F: Future Questions (Q71–Q80)

### Q71. "Maximum sum of non-overlapping subarrays of length k." Approach?
A) DP  
B) Fixed sliding window to get all window sums, then pick non-overlapping greedily or DP  
C) Greedy always works  
D) Binary search  

✅ **Answer: B**  
📝 First pass: sliding window builds all window sums. Second pass: DP or careful greedy to pick maximum non-overlapping windows. This extends basic sliding window.  
🏢 Amazon, Google (advanced)

---

### Q72. "Find longest arithmetic progression in sorted array." Approach?
A) Two Pointers  
B) DP: dp[i][j] = length of AP ending with arr[i], arr[j]  
C) Binary Search  
D) Sliding Window  

✅ **Answer: B**  
📝 For each pair (j,i) where j<i: common diff = arr[i]-arr[j]. If arr[j] - diff exists in array at position k, dp[i][j] = dp[j][k] + 1. O(n²).  
🏢 Google, Amazon

---

### Q73. "Max frequency stack" — push/pop such that pop returns most frequent element. Pattern?
A) Stack + HashMap  
B) Heap  
C) Deque  
D) HashMap<freq, stack> + track max_freq  

✅ **Answer: D**  
📝 Track frequency of each element AND group elements by frequency. On pop: return any element with max_freq, decrease its freq, update max_freq.  
🏢 Amazon, Meta (design question)

---

### Q74. "Minimum cost to connect all arrays in sequence" — each join costs sum of two. Pattern?
A) Sort descending, join greedily  
B) Min-Heap: always join two smallest → minimizes total cost  
C) Two Pointers  
D) DP  

✅ **Answer: B**  
📝 Huffman-coding style. Always merge two smallest arrays. Min-heap of sizes. O(n log n).  
🏢 Google, Amazon (advanced)

---

### Q75. "Check if array can be split into pairs, each with same sum." Approach?
A) Sort, check adjacent pairs  
B) If n is odd → false. Sort, pair first with last, check sums equal  
C) XOR all elements  
D) Sliding window  

✅ **Answer: B**  
📝 Sort. n must be even. Pair smallest with largest repeatedly. All pairs must have same sum (which equals (min+max)). O(n log n) sort + O(n) check.  
🏢 Amazon, Codeforces

---

### Q76. "Minimum number of swaps to sort array." Approach?
A) Count inversions  
B) Cycle detection in permutation graph: swaps = n - (number of cycles)  
C) Bubble sort count  
D) Merge sort inversions  

✅ **Answer: B**  
📝 Build permutation graph: i→correct_position_of_arr[i]. Each cycle of length L needs L-1 swaps. Total swaps = n - (number of independent cycles).  
🏢 Google, Amazon

---

### Q77. "Sum of all subarray sums" in O(n). Contribution of arr[i]?
A) arr[i]  
B) arr[i] × n  
C) arr[i] × (i+1) × (n-i)  
D) arr[i] × i × (n-i+1)  

✅ **Answer: C**  
📝 arr[i] appears in subarrays starting at any of (i+1) positions (0..i) and ending at any of (n-i) positions (i..n-1). Contribution = arr[i] × (i+1) × (n-i). Sum all contributions → O(n).  
🏢 Amazon, Codeforces

---

### Q78. "Find number of subarrays with sum > 0." Efficient approach for large n?
A) O(n²) brute force  
B) O(n log n) using modified merge sort or BIT  
C) O(n) sliding window  
D) O(n²) with optimization  

✅ **Answer: B**  
📝 Convert to: count pairs (i,j) where prefix[j] > prefix[i]. This is "count pairs with prefix[j]-prefix[i]>0" which is related to inversion count. Solved with merge sort or BIT in O(n log n).  
🏢 Codeforces, Google

---

### Q79. "Find minimum length subarray that contains all elements of another array." Approach?
A) Two Pointers  
B) Sliding Window + HashMap (Minimum Window Substring variant)  
C) Binary Search  
D) Sorting  

✅ **Answer: B**  
📝 Use sliding window. Track how many required elements are in current window. Expand right until all covered. Shrink left while maintaining all coverage. Track minimum window.  
🏢 Amazon, Meta, Google

---

### Q80. "Divide array into 3 equal-sum parts." Approach?
A) Sort and check  
B) Find total sum. If total%3≠0, false. Find first prefix=total/3 and second prefix=2×total/3.  
C) DP  
D) Sliding Window  

✅ **Answer: B**  
📝 Total must be divisible by 3. Scan for first index where prefix sum = total/3. Then find index where prefix sum = 2×total/3. If both found and they're different indices with space for third part, answer is true.  
🏢 Amazon, Google

---

## 📊 Score Interpretation

| Score | Level | Next Action |
|-------|-------|-------------|
| 72–80 (90-100%) | 🏆 Expert | Ready for FAANG interviews. Practice system design. |
| 64–71 (80-89%) | ✅ Strong | Review sections where you lost marks. Solid foundation. |
| 56–63 (70-79%) | 🟡 Good | Practice more company-style questions. |
| 40–55 (50-69%) | 🟠 Developing | Re-read patterns deeply. Code each one. |
| Below 40 | ❌ Needs work | Start from Part 1 foundations. No shortcuts. |

---

*Next → `06_arrays_future_questions.md` — Prediction questions & emerging patterns*
# 📝 02 — Arrays — EXTENDED MCQ Bank (75 Questions)

> **Original**: 35 MCQs | **Extended**: 75 MCQs  
> **Coverage**: Concepts → Code Tracing → Patterns → Hard Traps → Company Questions  
> **Target**: Score 90%+ = Interview Ready

---

## SECTION A: Foundations (Q1–Q20)

### Q1. What is the time complexity of accessing `arr[i]`?
A) O(n)  
B) O(log n)  
C) O(1)  
D) O(n²)

✅ **Answer: C**  
📝 `Address = Base + i × sizeof(element)` — pure arithmetic, no iteration.  
🏢 Google, Adobe, TCS

---

### Q2. Why are arrays cache-friendly?
A) They use less memory  
B) Elements are stored contiguously in memory  
C) They support fast insertion  
D) They are always sorted

✅ **Answer: B**  
📝 Contiguous storage means the CPU loads multiple elements into cache at once (spatial locality), making sequential traversal extremely fast.  
🏢 Google (systems round)

---

### Q3. An array of size n uses O(?) space.
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)

✅ **Answer: C**  
📝 n elements × constant size each = O(n).  
🏢 Amazon, Microsoft

---

### Q4. Inserting at the beginning of an array is O(n) because:
A) We need to find the right position  
B) All existing elements must shift right to make room  
C) Memory reallocation is required  
D) The array must be re-sorted

✅ **Answer: B**  
📝 All n elements shift one position right — O(n) swaps.  
🏢 Amazon, Adobe

---

### Q5. What index does the last element have in an array of size n?
A) n  
B) n-1  
C) n+1  
D) 0

✅ **Answer: B**  
📝 Arrays are 0-indexed: indices 0 to n-1.  
🏢 TCS, Infosys

---

### Q6. Which is TRUE about `arr[n]` when array has size n?
A) It returns 0  
B) It returns the last element  
C) It is undefined behavior  
D) It returns n

✅ **Answer: C**  
📝 Valid indices: 0 to n-1. Index n is one past the end — accessing it is undefined behavior (may crash or give garbage).  
🏢 Microsoft, Adobe

---

### Q7. Arrays vs Linked Lists: which is faster for random access?
A) Linked List (O(1))  
B) Array (O(1))  
C) Both O(n)  
D) Depends on size

✅ **Answer: B**  
📝 Array: O(1) via direct address formula. Linked List: O(n) — must traverse from head.  
🏢 Amazon, Google

---

### Q8. What is the time complexity of searching an unsorted array?
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n log n)

✅ **Answer: C**  
📝 Must check every element in worst case (linear search).  
🏢 TCS, Adobe

---

### Q9. What is the time complexity of searching a SORTED array?
A) O(n)  
B) O(log n)  
C) O(1)  
D) O(n²)

✅ **Answer: B**  
📝 Binary search on sorted array: halve search space each step → O(log n).  
🏢 Amazon, Google

---

### Q10. Deleting an element at the END of an array is:
A) O(n) — must shift elements  
B) O(log n)  
C) O(1) — just decrease size counter  
D) O(n²)

✅ **Answer: C**  
📝 No shifting needed — just reduce the logical size by 1.  
🏢 Google, Microsoft

---

### Q11. Prefix Sum enables range sum queries in:
A) O(n) per query  
B) O(log n) per query  
C) O(1) per query  
D) O(n²) per query

✅ **Answer: C**  
📝 After O(n) preprocessing, `sum(L,R) = prefix[R+1] - prefix[L]` — constant time.  
🏢 Google, Codeforces

---

### Q12. The Sliding Window technique converts O(n×k) to:
A) O(n²)  
B) O(n log n)  
C) O(n)  
D) O(k)

✅ **Answer: C**  
📝 Instead of recomputing window sum from scratch, just add 1 element and remove 1 element — O(1) per slide.  
🏢 Meta, Amazon

---

### Q13. Two pointer technique for sorted arrays reduces Two Sum from:
A) O(n³) to O(n²)  
B) O(n²) to O(n log n)  
C) O(n²) to O(n)  
D) O(n) to O(log n)

✅ **Answer: C**  
📝 Two pointers from both ends decide to move left or right based on sorted order — O(n) total.  
🏢 Amazon, Meta

---

### Q14. Kadane's Algorithm solves which problem in O(n)?
A) Find maximum element  
B) Find maximum sum contiguous subarray  
C) Find missing element  
D) Sort the array

✅ **Answer: B**  
📝 Track current max ending here and global max — single pass.  
🏢 Amazon, Microsoft

---

### Q15. Which is the correct formula to avoid integer overflow in binary search?
A) `mid = (left + right) / 2`  
B) `mid = left + (right - left) / 2`  
C) `mid = right - (right - left) / 2`  
D) Both B and C

✅ **Answer: D**  
📝 A can overflow. B and C avoid overflow by not adding two large numbers directly.  
🏢 Google (very common trap!)

---

### Q16. Dutch National Flag Algorithm sorts an array of 0s, 1s, 2s in:
A) O(n log n), O(1) space  
B) O(n), O(n) space  
C) O(n), O(1) space  
D) O(n²), O(1) space

✅ **Answer: C**  
📝 Single pass with 3 pointers (low, mid, high). In-place with no extra array.  
🏢 Microsoft, Amazon

---

### Q17. Cyclic Sort is useful when array contains numbers in range:
A) Any range  
B) [1, n] or [0, n-1]  
C) Only sorted arrays  
D) Only negative numbers

✅ **Answer: B**  
📝 Cyclic sort places each number at index (num-1). Works only when values map to indices.  
🏢 Amazon, Google

---

### Q18. XOR of all elements in `[1,1,2,2,3]` is:
A) 3  
B) 0  
C) 9  
D) 1

✅ **Answer: A**  
📝 1^1=0, 2^2=0, 0^0^3 = 3. Pairs cancel, single element remains.  
🏢 Amazon, Meta

---

### Q19. Why should large arrays NOT be declared inside functions?
A) Syntax error  
B) They cause stack overflow — too large for the call stack  
C) Slower access  
D) Can't be initialized

✅ **Answer: B**  
📝 Local variables go on stack. Stack is typically 1-8MB. 10^6 integers = 4MB — causes overflow.  
🏢 Codeforces, Google

---

### Q20. `int arr[5] = {1, 2}` initializes the array as:
A) {1, 2, garbage, garbage, garbage}  
B) {1, 2, 0, 0, 0}  
C) Compilation error  
D) {0, 0, 1, 2, 0}

✅ **Answer: B**  
📝 In C++, partial initialization zeros out remaining elements.  
🏢 Microsoft, TCS

---

## SECTION B: Code Tracing (Q21–Q45)

### Q21. What does this print?
```cpp
vector<int> arr = {1, 2, 3, 4, 5};
int left = 0, right = arr.size() - 1;
while(left < right) {
    swap(arr[left++], arr[right--]);
}
for(int x : arr) cout << x << " ";
```
A) 1 2 3 4 5  
B) 5 4 3 2 1  
C) 3 2 1 4 5  
D) 5 4 3 2 1 (reverse)

✅ **Answer: B**  
📝 Classic in-place reversal using two pointers. Swaps 1↔5, then 2↔4, 3 stays.  
🏢 Adobe, Amazon

---

### Q22. What is the output?
```cpp
vector<int> arr = {3, 1, 4, 1, 5};
vector<int> prefix(6, 0);
for(int i = 0; i < 5; i++) prefix[i+1] = prefix[i] + arr[i];
cout << prefix[4] - prefix[1];
```
A) 9  
B) 10  
C) 5  
D) 6

✅ **Answer: A**  
📝 prefix = [0, 3, 4, 8, 9, 14]. prefix[4]-prefix[1] = 9-3 = 6... Wait: arr[1]+arr[2]+arr[3] = 1+4+1 = 6.  
⚠️ Actually: prefix[4]-prefix[1] = (3+1+4+1) - (3) = 9 - 3 = 6.  

✅ **Corrected Answer: D (6)**  
📝 prefix[4] = sum of first 4 = 3+1+4+1 = 9. prefix[1] = 3. 9-3 = 6 (sum of indices 1 to 3).  
🏢 Amazon, Google

---

### Q23. What is the time complexity of this code?
```cpp
for(int i = 0; i < n; i++) {
    for(int j = i; j < n; j++) {
        // O(1) work
    }
}
```
A) O(n)  
B) O(n log n)  
C) O(n²)  
D) O(2n)

✅ **Answer: C**  
📝 Iterations = n + (n-1) + ... + 1 = n(n+1)/2 = O(n²).  
🏢 Meta, Google

---

### Q24. What does this Kadane's code return for `[-5, -3, -1, -4]`?
```cpp
int current = arr[0], global = arr[0];
for(int i = 1; i < n; i++) {
    current = max(arr[i], current + arr[i]);
    global = max(global, current);
}
return global;
```
A) 0  
B) -1  
C) -5  
D) -13

✅ **Answer: B**  
📝 All negative: Kadane's correctly returns the least negative = -1 (single element). current/global tracks max.  
🏢 Amazon, Microsoft

---

### Q25. What is printed?
```cpp
vector<int> v = {5, 3, 8, 1};
sort(v.begin(), v.end());
cout << v[0] << " " << v.back();
```
A) 5 1  
B) 1 8  
C) 8 1  
D) 5 8

✅ **Answer: B**  
📝 After sorting ascending: {1, 3, 5, 8}. v[0]=1, v.back()=8.  
🏢 TCS, Adobe

---

### Q26. What does this return for `arr=[1,2,3,4,5]`, `k=2`?
```cpp
int n = arr.size();
k = k % n;
reverse(arr, 0, n-1);
reverse(arr, 0, k-1);
reverse(arr, k, n-1);
// return arr
```
A) {4, 5, 1, 2, 3}  
B) {3, 4, 5, 1, 2}  
C) {2, 1, 5, 4, 3}  
D) {1, 2, 3, 4, 5}

✅ **Answer: A**  
📝 Rotate right by 2: [5,4,3,2,1] → [4,5,3,2,1] → [4,5,1,2,3].  
🏢 Amazon, Microsoft

---

### Q27. What does this sliding window return for `arr=[2,3,1,5,6]`, `k=2`?
```cpp
int sum = arr[0] + arr[1], maxSum = sum;
for(int i = 2; i < n; i++) {
    sum = sum + arr[i] - arr[i-2];
    maxSum = max(maxSum, sum);
}
return maxSum;
```
A) 8  
B) 11  
C) 6  
D) 9

✅ **Answer: B**  
📝 Windows: [2,3]=5, [3,1]=4, [1,5]=6, [5,6]=11. Max = 11.  
🏢 Meta, Amazon

---

### Q28. What is the space complexity?
```cpp
void func(vector<int>& arr, int n) {
    vector<int> temp(n);
    // ... use temp
}
```
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)

✅ **Answer: C**  
📝 `temp` vector of size n = O(n) additional space.  
🏢 Amazon, Google

---

### Q29. What does this two-pointer code detect?
```cpp
int slow = 0;
for(int fast = 1; fast < n; fast++) {
    if(arr[fast] != arr[slow]) {
        arr[++slow] = arr[fast];
    }
}
return slow + 1;
```
A) Finds missing number  
B) Removes duplicates from sorted array  
C) Reverses array  
D) Finds maximum

✅ **Answer: B**  
📝 Classic pattern: slow pointer tracks last unique, fast finds next unique.  
🏢 Amazon, Microsoft

---

### Q30. What is printed?
```cpp
int a = 5, b = 10;
a = a ^ b;
b = a ^ b;
a = a ^ b;
cout << a << " " << b;
```
A) 5 10  
B) 10 5  
C) 15 15  
D) 0 0

✅ **Answer: B**  
📝 XOR swap! Without extra variable: swaps a and b.  
🏢 Google, Meta

---

### Q31. For `arr=[0,1,0,3,12]`, what is the result of "Move Zeroes"?
```cpp
int slow = 0;
for(int fast = 0; fast < n; fast++) {
    if(arr[fast] != 0) arr[slow++] = arr[fast];
}
while(slow < n) arr[slow++] = 0;
```
A) {1, 0, 3, 12, 0}  
B) {1, 3, 12, 0, 0}  
C) {0, 0, 1, 3, 12}  
D) {1, 3, 0, 12, 0}

✅ **Answer: B**  
📝 Non-zeros moved to front in order: {1,3,12}, then fill with zeros: {1,3,12,0,0}.  
🏢 Meta, Microsoft

---

### Q32. What's the output for `arr=[2,7,11,15]`, `target=9`?
```cpp
unordered_map<int,int> seen;
for(int i = 0; i < n; i++) {
    int complement = target - arr[i];
    if(seen.count(complement)) {
        cout << seen[complement] << " " << i;
        return;
    }
    seen[arr[i]] = i;
}
```
A) 0 1  
B) 1 2  
C) 0 3  
D) 2 3

✅ **Answer: A**  
📝 i=0: seen={}, store 2→0. i=1: complement=2, found at 0. Print "0 1".  
🏢 Google, Amazon

---

### Q33. What is returned by Boyer-Moore Majority Vote?
```cpp
int candidate = arr[0], count = 1;
for(int i = 1; i < n; i++) {
    if(count == 0) { candidate = arr[i]; count = 1; }
    else if(arr[i] == candidate) count++;
    else count--;
}
return candidate;
```
For `arr = [3, 2, 3]`:  
A) 2  
B) 3  
C) 0  
D) 1

✅ **Answer: B**  
📝 i=1: 2≠3, count=0. i=2: count=0, candidate=3, count=1. Return 3. The majority element (appears >n/2 times).  
🏢 Adobe, Amazon

---

### Q34. What does this compute for `arr=[7,1,5,3,6,4]`?
```cpp
int minP = arr[0], maxProfit = 0;
for(int i = 1; i < n; i++) {
    minP = min(minP, arr[i]);
    maxProfit = max(maxProfit, arr[i] - minP);
}
return maxProfit;
```
A) 4  
B) 5  
C) 6  
D) 7

✅ **Answer: B**  
📝 Buy at 1 (day 2), sell at 6 (day 5) = profit 5.  
🏢 Amazon, Meta

---

### Q35. Time complexity of this code?
```cpp
int result = 1;
for(int i = 0; i < n; i++) {
    result *= arr[i];
}
```
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n²)

✅ **Answer: C**  
📝 Single loop iterating all n elements = O(n).  
🏢 Adobe, TCS

---

### Q36. What is the output?
```cpp
vector<int> v = {1, 2, 3, 4, 5};
cout << v.size() - 6;  // size() returns size_t (unsigned)
```
A) -1  
B) Compilation error  
C) Very large number (underflow)  
D) 0

✅ **Answer: C**  
📝 `v.size()` is unsigned (size_t). 5 - 6 underflows to a huge number! Classic trap.  
🏢 Codeforces, Google

---

### Q37. Given prefix = [0,1,3,6,10,15], what is rangeSum(1, 3)?
A) 6  
B) 9  
C) 5  
D) 12

✅ **Answer: B**  
📝 prefix[4] - prefix[1] = 10 - 1 = 9.  
🏢 Amazon, Google

---

### Q38. What does this code find?
```cpp
int xorAll = 0;
for(int i = 1; i <= n+1; i++) xorAll ^= i;
for(int x : arr) xorAll ^= x;
return xorAll;
```
A) Duplicate number  
B) Missing number in [1..n+1]  
C) Maximum XOR pair  
D) Single non-duplicate

✅ **Answer: B**  
📝 XOR [1..n+1] with array elements — all present numbers cancel, leaving the missing one.  
🏢 Google, Amazon

---

### Q39. What is the time complexity of `sort(v.begin(), v.end())`?
A) O(n)  
B) O(n log n)  
C) O(n²)  
D) O(log n)

✅ **Answer: B**  
📝 C++ STL sort uses introsort (quicksort + heapsort hybrid) = O(n log n) guaranteed.  
🏢 Amazon, Microsoft

---

### Q40. What is printed for `arr=[1,3,5,7,9]`, searching for 6?
```cpp
int left=0, right=n-1;
while(left <= right) {
    int mid = left + (right-left)/2;
    if(arr[mid] == 6) { cout << mid; return; }
    else if(arr[mid] < 6) left = mid+1;
    else right = mid-1;
}
cout << -1;
```
A) 2  
B) 3  
C) -1  
D) 0

✅ **Answer: C**  
📝 6 is not in array. Binary search terminates without finding it → prints -1.  
🏢 Amazon, TCS

---

### Q41. Dutch National Flag: what is arr after processing `[2,0,1]`?
```cpp
int low=0, mid=0, high=2;
// (apply DNF algorithm)
```
A) [0, 1, 2]  
B) [2, 1, 0]  
C) [1, 0, 2]  
D) [0, 2, 1]

✅ **Answer: A**  
📝 DNF correctly sorts to [0, 1, 2] in one pass.  
🏢 Microsoft, Amazon

---

### Q42. What is the maximum subarray sum for `[−2,−3,4,−1,−2,1,5,−3]`?
A) 4  
B) 5  
C) 7  
D) 6

✅ **Answer: C**  
📝 Subarray [4,−1,−2,1,5] = 7. Kadane's algorithm traces this correctly.  
🏢 Amazon, Microsoft

---

### Q43. What is the output?
```cpp
vector<int> a = {1, 2, 3};
vector<int> b = a;  // Copy
b[0] = 99;
cout << a[0] << " " << b[0];
```
A) 99 99  
B) 1 99  
C) 1 1  
D) 99 1

✅ **Answer: B**  
📝 `b = a` creates a deep copy (value copy) of the vector. Modifying b doesn't affect a.  
🏢 Microsoft, Adobe

---

### Q44. What's the issue?
```cpp
vector<int> v;
v.reserve(5);
cout << v.size() << " " << v.capacity();
```
A) Compilation error  
B) 5 5  
C) 0 5  
D) 0 0

✅ **Answer: C**  
📝 `reserve` allocates capacity but doesn't add elements. size=0, capacity=5.  
🏢 Google, Codeforces

---

### Q45. What is the space complexity of merge sort?
A) O(1)  
B) O(log n)  
C) O(n)  
D) O(n log n)

✅ **Answer: C**  
📝 Merge step needs O(n) temporary array. O(log n) stack frames. Total = O(n).  
🏢 Amazon, Google

---

## SECTION C: Problem Solving & Patterns (Q46–Q60)

### Q46. Array NOT sorted. Find if any two elements sum to target. Best approach?
A) Sort + two pointers: O(n log n)  
B) Hash map: O(n) time, O(n) space  
C) Nested loops: O(n²)  
D) Binary search: O(n log n)

✅ **Answer: B**  
📝 Unsorted → two pointers won't work directly. Hash map: for each element, check if complement exists.  
🏢 Google, Amazon

---

### Q47. Find maximum sum of subarray of size exactly k. Best approach?
A) O(n×k) brute force  
B) O(n) sliding window  
C) O(n log n) sort  
D) O(n²) prefix sum

✅ **Answer: B**  
📝 Sliding window: compute first window, then slide (add one right, remove one left) — O(n) total.  
🏢 Meta, Microsoft

---

### Q48. Count number of subarrays with sum equal to k. Best approach?
A) O(n²) brute force  
B) O(n) with prefix sum + hash map  
C) O(n log n) binary search  
D) O(n) sliding window

✅ **Answer: B**  
📝 Use hash map of prefix sums. For each index, check how many previous prefix[j] = prefix[i]-k.  
⚠️ Sliding window DOESN'T work here because array may have negatives!  
🏢 Meta, Amazon

---

### Q49. What pattern finds the minimum window substring containing all characters of t?
A) Fixed sliding window  
B) Variable sliding window  
C) Two pointers on sorted  
D) Binary search

✅ **Answer: B**  
📝 Expand right until all chars covered, shrink left to minimize window, track minimum.  
🏢 Meta, Amazon

---

### Q50. Given sorted array with duplicates, find count of target elements most efficiently.
A) Linear scan: O(n)  
B) Binary search first+last: O(log n)  
C) Hash map: O(n)  
D) Sort again: O(n log n)

✅ **Answer: B**  
📝 Find firstOccurrence and lastOccurrence using binary search. Count = last - first + 1.  
🏢 Amazon, Google

---

### Q51. Find majority element (appears > n/2 times) in O(n) time, O(1) space.
A) Sort and return middle element  
B) Hash map count  
C) Boyer-Moore Voting Algorithm  
D) Two passes linear scan

✅ **Answer: C**  
📝 Boyer-Moore: maintain candidate and count. Cancel different elements until one dominant candidate remains.  
🏢 Adobe, Amazon

---

### Q52. Find the pivot/rotation point in a rotated sorted array.
A) Linear scan: O(n)  
B) Binary search: O(log n)  
C) Hashing: O(n)  
D) Two pointers: O(n)

✅ **Answer: B**  
📝 Binary search: if arr[mid] > arr[right], pivot is in right half; else in left half.  
🏢 Amazon, Google

---

### Q53. Product of array except self without using division, O(n) time, O(1) extra space.
A) Two passes: prefix products then suffix products  
B) One pass with hash map  
C) Sort and multiply  
D) Logarithms trick

✅ **Answer: A**  
📝 First pass: result[i] = product of all to the LEFT. Second pass: multiply in products from the RIGHT.  
🏢 Microsoft, Amazon

---

### Q54. Trapping rainwater: what's the optimal approach?
A) O(n²) brute force (leftMax, rightMax for each position)  
B) O(n) + O(n) space (precompute leftMax, rightMax arrays)  
C) O(n) + O(1) space (two pointers)  
D) O(n log n) + O(n) space (sort-based)

✅ **Answer: C**  
📝 Two pointers from both ends. If leftMax < rightMax, water at left depends only on leftMax. Process that side.  
🏢 Google, Amazon

---

### Q55. Next permutation: when should you use this algorithm?
A) Sorting an array  
B) Finding the next lexicographically greater arrangement  
C) Reversing a subarray  
D) Finding duplicates

✅ **Answer: B**  
📝 Find rightmost element that can be increased. Swap with next greater on right. Reverse suffix.  
🏢 Adobe, Microsoft

---

### Q56. Find k-th largest element in O(n) average time.
A) Sort and pick: O(n log n)  
B) QuickSelect: O(n) average  
C) Min heap of size k: O(n log k)  
D) Binary search: O(n log n)

✅ **Answer: B**  
📝 QuickSelect: like quicksort but only recurse into one partition. Average O(n), worst O(n²).  
🏢 Amazon, Microsoft

---

### Q57. Merge k sorted arrays of total n elements.
A) Concatenate and sort: O(n log n)  
B) Min heap of size k: O(n log k)  
C) Two pointer (k times): O(n×k)  
D) Recursively merge pairs: O(n log k)

✅ **Answer: B or D** (both optimal)  
📝 Min heap approach: extract min from heap, add next element from that array. O(n log k).  
🏢 Amazon, Google

---

### Q58. Given unsorted array, find longest consecutive sequence (e.g., {1,2,3,4}).
A) Sort then scan: O(n log n)  
B) Hash set lookup: O(n)  
C) Two pointers: O(n)  
D) DP: O(n²)

✅ **Answer: B**  
📝 Insert all in hash set. For each number that's a sequence START (n-1 not in set), expand rightward counting length.  
🏢 Google, Amazon

---

### Q59. Range update: add v to all elements from index L to R, then answer point queries. Best approach?
A) Update each element: O(n) per update  
B) Difference array: O(1) per update, O(n) to reconstruct  
C) Prefix sum: O(n) per update, O(1) query  
D) Segment tree: O(log n) per update and query

✅ **Answer: B** (for offline/batch queries), **D** (for online)  
📝 Difference array: diff[L]+=v, diff[R+1]-=v. O(1) per update. Reconstruct in O(n) for all queries.  
🏢 Codeforces, Google

---

### Q60. 2D Matrix: set entire row and column to 0 if element is 0. O(1) extra space?
A) Use two extra arrays of size m and n  
B) Use first row and first column as markers  
C) Use hash sets  
D) Make a copy

✅ **Answer: B**  
📝 Use matrix[0][j] and matrix[i][0] to mark which rows/columns need zeroing. Handle first row/col separately.  
🏢 Microsoft, Amazon

---

## SECTION D: Competitive Programming & Hard Traps (Q61–Q75)

### Q61. TLE: n=10^5, O(n²) algorithm. What is the MINIMUM optimization needed?
A) Reduce to O(n log n)  
B) Reduce to O(n)  
C) Both A and B work  
D) Cannot be optimized

✅ **Answer: C**  
📝 10^10 ops at O(n²) → TLE. O(n log n) ≈ 1.7×10^6 ops → fast enough. O(n) also fine.  
🏢 Codeforces

---

### Q62. Array of 10^6 ints. What is the memory usage?
A) ~1MB  
B) ~4MB  
C) ~8MB  
D) ~400MB

✅ **Answer: B**  
📝 10^6 × 4 bytes = 4,000,000 bytes ≈ 4MB. Typical memory limit is 256MB.  
🏢 Codeforces, CodeChef

---

### Q63. Why use `long long` for array sums in competitive programming?
A) Long long is always required  
B) Sum of 10^5 elements each up to 10^9 can reach 10^14 > int max (2.1×10^9)  
C) For floating point precision  
D) For negative numbers

✅ **Answer: B**  
📝 int max ≈ 2.1×10^9. Sum can be 10^14. Always use long long when summing large arrays!  
🏢 Codeforces, Google

---

### Q64. What optimization reduces this to O(n)?
```cpp
// For each i, find sum(arr[0..i-1])  — currently computed O(i) each time
```
A) Sort the array  
B) Build prefix sum array once  
C) Use binary search  
D) Use hash map

✅ **Answer: B**  
📝 Precompute prefix once in O(n), then each query in O(1). Total: O(n) instead of O(n²).  
🏢 Google, Codeforces

---

### Q65. Which STL function finds if element exists in sorted array?
A) `find(v.begin(), v.end(), x)` — O(n)  
B) `binary_search(v.begin(), v.end(), x)` — O(log n)  
C) `count(v.begin(), v.end(), x)` — O(n)  
D) Both A and B are correct (B is faster)

✅ **Answer: D**  
📝 Both work. `find` is O(n), `binary_search` is O(log n) on sorted. Prefer B for sorted arrays.  
🏢 Amazon, Microsoft

---

### Q66. What's wrong?
```cpp
vector<int> v;
for(int i = 0; i < 5; i++) v.push_back(i);
for(int& x : v) {
    if(x == 2) v.push_back(99);  // Modify during iteration!
}
```
A) Correct code  
B) Iterator invalidation — undefined behavior  
C) Pushback fails silently  
D) Infinite loop

✅ **Answer: B**  
📝 `push_back` may reallocate vector memory, invalidating all iterators/references. Never modify vector while ranging over it.  
🏢 Codeforces, Google

---

### Q67. What's the space complexity issue here?
```cpp
void solve(vector<int> arr, int n) {  // arr passed by VALUE
    // ...
}
```
A) O(n) extra space for the copy — pass by reference instead  
B) O(1) — no issue  
C) O(n²) — double copies  
D) Compilation error

✅ **Answer: A**  
📝 Pass-by-value copies the entire vector. Use `vector<int>&` to avoid O(n) copy.  
🏢 Amazon (performance-critical code)

---

### Q68. `lower_bound(v.begin(), v.end(), x)` returns:
A) Iterator to first element equal to x  
B) Iterator to first element >= x  
C) Iterator to first element > x  
D) Last element < x

✅ **Answer: B**  
📝 `lower_bound` returns iterator to first element ≥ x. `upper_bound` returns first > x.  
🏢 Codeforces, Google

---

### Q69. Best way to check if a sorted array has any duplicate?
A) Nested loops: O(n²)  
B) Hash set: O(n)  
C) Adjacent comparison: `arr[i] == arr[i+1]` → O(n)  
D) Sort again: O(n log n)

✅ **Answer: C**  
📝 Sorted array: duplicates are always adjacent. Single scan, O(n), O(1) space.  
🏢 Amazon, TCS

---

### Q70. Count of inversions problem. Brute force is O(n²). What's optimal?
A) O(n log n) using modified merge sort  
B) O(n) using XOR  
C) O(n log n) using binary indexed tree (BIT/Fenwick)  
D) Both A and C

✅ **Answer: D**  
📝 Both merge sort (counting during merge) and BIT/Fenwick tree achieve O(n log n).  
🏢 Amazon, Codeforces

---

### Q71. Sliding window maximum — find max in every window of size k. Best complexity?
A) O(n×k)  
B) O(n log n) using multiset  
C) O(n) using deque  
D) O(n log k) using heap

✅ **Answer: C**  
📝 Monotonic deque maintains potential maximums. Each element added/removed once → O(n).  
🏢 Google, Amazon

---

### Q72. Sum of all subarray sums of array of size n. How many subarrays include arr[i]?
A) i+1  
B) (i+1) × (n-i)  
C) n-i  
D) i × (n-i-1)

✅ **Answer: B**  
📝 Subarray starts at any of (i+1) positions (0..i) and ends at any of (n-i) positions (i..n-1). Contribution = arr[i] × (i+1) × (n-i).  
🏢 Amazon, Codeforces

---

### Q73. What does `partial_sum` do in C++ STL?
A) Returns sum of first half  
B) Computes prefix sums in-place  
C) Sorts partially  
D) Finds partial matches

✅ **Answer: B**  
📝 `partial_sum(arr.begin(), arr.end(), result.begin())` computes prefix sums into result.  
🏢 Codeforces, Google

---

### Q74. Maximum circular subarray sum. How to extend Kadane's?
A) Run Kadane's twice with different start points  
B) Max(maxLinear, totalSum - minSubarraySum)  
C) Kadane's on reversed array  
D) Sort and sum top half

✅ **Answer: B**  
📝 Circular max = total - minimum subarray. Compare with linear Kadane's result. Edge case: if all negative, use linear result.  
🏢 Amazon, Google

---

### Q75. You must find if there's a subarray with sum 0 in O(n). Approach?
A) Two pointers (only works for positive arrays)  
B) Prefix sum + hash set: if prefix[i] == prefix[j], subarray j+1..i has sum 0  
C) Kadane's algorithm  
D) Sort and check adjacent differences

✅ **Answer: B**  
📝 If same prefix sum appears twice, the subarray between those indices has sum 0. Also: if prefix[i] == 0, subarray 0..i sums to 0.  
🏢 Amazon, Codeforces

---

## 📊 Score Interpretation

| Score | Meaning | Next Steps |
|-------|---------|------------|
| 68–75 (90-100%) | ✅ Expert level — Ready for any array interview | Move to Strings + Binary Search Trees |
| 60–67 (80-89%) | 🟡 Strong — Fix specific weak areas | Review incorrect sections |
| 50–59 (67-79%) | 🟠 Developing — More practice needed | Redo sections C & D |
| Below 50 | ❌ Needs work — Re-read master notes | Read `02_arrays_master_notes.md` fully |

---

## Sectional Scoring

| Section | Questions | Your Score | Weak Areas |
|---------|-----------|------------|------------|
| A: Foundations | Q1–Q20 | /20 | Memory, Complexity |
| B: Code Tracing | Q21–Q45 | /25 | Edge cases, Output |
| C: Problem Solving | Q46–Q60 | /15 | Pattern recognition |
| D: CP Traps | Q61–Q75 | /15 | Overflow, TLE traps |

---

[← Back to Notes](02_arrays_master_notes.md) | [Next: Solved Problems →](02_arrays_solved_problems.md)
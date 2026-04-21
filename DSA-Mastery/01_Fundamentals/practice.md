# Fundamentals - Practice Problems

## 📚 Quick Navigation

- **Learn Concepts**: [notes.md](notes.md)
- **Practice Problems**: [practice.md](practice.md) ← You are here
- **Check Solutions**: [solutions.md](solutions.md)
- **Test Yourself**: [mcqs.md](mcqs.md)
- **Quick Revision**: [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md)
- **If Stuck**: [If_You_Get_Stuck.md](If_You_Get_Stuck.md)
- **Interview Traps**: [Common_Interview_Traps.md](Common_Interview_Traps.md)

## How to Use This File

1. **Start with Level 1** - Don't skip levels!
2. **Try for 20-30 minutes** before checking hints
3. **Write code yourself** - Don't copy-paste
4. **Test with multiple inputs** - Including edge cases
5. **Check solutions** in `solutions.md` after solving

---

## LEVEL 1: Basics (Building Confidence)

### Problem 1.1: Identify Time Complexity

**Difficulty**: ⭐ Very Easy

**Problem**: 
For each code snippet below, write the time complexity (Big-O):

```cpp
// Snippet A
for (int i = 0; i < n; i++) {
    cout << i << " ";
}

// Snippet B
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        cout << i << j << " ";
    }
}

// Snippet C
int i = n;
while (i > 1) {
    i /= 2;
    cout << i << " ";
}
```

**Tags**: `Complexity Analysis` `Big-O` `Theory`

**Hints**:
- Hint 1: Count how many times the innermost statement executes
- Hint 2: Snippet A runs n times
- Hint 3: Snippet B runs n×n times

---

### Problem 1.2: Check Even or Odd Using Bits

**Difficulty**: ⭐ Very Easy

**Problem**: 
Check if a number is even or odd using bitwise operators (no % operator).

**Input Format**:
```
A single integer n
```

**Output Format**:
```
Even OR Odd
```

**Example**:
```
Input:
7

Output:
Odd

Input:
12

Output:
Even
```

**Tags**: `Bit Manipulation` `Bitwise Operators`

**Hints**:
- Hint 1: Look at the last bit
- Hint 2: Use AND operator with 1
- Hint 3: If (n & 1) is 1, it's odd

---

### Problem 1.3: Count Digits in a Number

**Difficulty**: ⭐ Easy

**Problem**: 
Count the number of digits in a given integer using math (not string conversion).

**Input Format**:
```
A single integer (can be negative)
```

**Output Format**:
```
Number of digits: [count]
```

**Example**:
```
Input:
12345

Output:
Number of digits: 5

Input:
-789

Output:
Number of digits: 3
```

**Tags**: `Math` `Loops` `Number Manipulation`

**Hints**:
- Hint 1: Handle negative numbers (take absolute value)
- Hint 2: Special case: 0 has 1 digit
- Hint 3: Divide by 10 repeatedly until number becomes 0

---

### Problem 1.4: Sum of Digits

**Difficulty**: ⭐ Easy

**Problem**: 
Calculate the sum of all digits in a number.

**Input Format**:
```
A single integer
```

**Output Format**:
```
Sum of digits: [result]
```

**Example**:
```
Input:
12345

Output:
Sum of digits: 15

Explanation: 1 + 2 + 3 + 4 + 5 = 15
```

**Tags**: `Math` `Loops` `Digit Extraction`

**Hints**:
- Hint 1: Extract last digit using % 10
- Hint 2: Add to sum
- Hint 3: Remove last digit using / 10

---

### Problem 1.5: Reverse a Number

**Difficulty**: ⭐ Easy

**Problem**: 
Reverse the digits of a given number.

**Input Format**:
```
A single integer
```

**Output Format**:
```
Reversed: [result]
```

**Example**:
```
Input:
12345

Output:
Reversed: 54321

Input:
-123

Output:
Reversed: -321
```

**Tags**: `Math` `Loops` `Number Manipulation`

**Hints**:
- Hint 1: Extract last digit
- Hint 2: Build reverse: rev = rev * 10 + digit
- Hint 3: Handle negative numbers

---

## LEVEL 2: Application (Building Skills)

### Problem 2.1: Prime Check

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Check if a given number is prime using an efficient O(√n) approach.

**Input Format**:
```
A single integer n
```

**Output Format**:
```
Prime OR Not Prime
```

**Example**:
```
Input:
17

Output:
Prime

Input:
15

Output:
Not Prime
```

**Tags**: `Math` `Prime Numbers` `Optimization`

**Hints**:
- Hint 1: Check divisibility from 2 to √n
- Hint 2: Edge cases: 1 is not prime, 2 is prime
- Hint 3: Skip even numbers after checking 2

---

### Problem 2.2: GCD of Two Numbers

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Find the GCD (Greatest Common Divisor) of two numbers using Euclidean algorithm.

**Input Format**:
```
Two integers a and b
```

**Output Format**:
```
GCD: [result]
```

**Example**:
```
Input:
12 18

Output:
GCD: 6

Input:
7 13

Output:
GCD: 1
```

**Tags**: `Math` `GCD` `Euclidean Algorithm`

**Hints**:
- Hint 1: Use Euclidean algorithm
- Hint 2: gcd(a, b) = gcd(b, a % b)
- Hint 3: Continue until b becomes 0

---

### Problem 2.3: LCM of Two Numbers

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Find the LCM (Least Common Multiple) of two numbers.

**Input Format**:
```
Two integers a and b
```

**Output Format**:
```
LCM: [result]
```

**Example**:
```
Input:
12 18

Output:
LCM: 36
```

**Tags**: `Math` `LCM` `GCD`

**Hints**:
- Hint 1: Use formula: LCM(a,b) = (a×b) / GCD(a,b)
- Hint 2: First implement GCD function
- Hint 3: Watch for overflow with large numbers

---

### Problem 2.4: Count Set Bits

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Count the number of set bits (1s) in binary representation of a number.

**Input Format**:
```
A single integer
```

**Output Format**:
```
Set bits: [count]
```

**Example**:
```
Input:
13

Output:
Set bits: 3

Explanation: 13 = 1101 (binary) has three 1s
```

**Tags**: `Bit Manipulation` `Counting` `Bit Tricks`

**Hints**:
- Hint 1: Use n & (n-1) trick
- Hint 2: Each operation removes one set bit
- Hint 3: Count how many operations until n becomes 0

---

### Problem 2.5: Check Power of 2

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Check if a number is a power of 2 using bit manipulation.

**Input Format**:
```
A single integer
```

**Output Format**:
```
Power of 2 OR Not Power of 2
```

**Example**:
```
Input:
8

Output:
Power of 2

Input:
10

Output:
Not Power of 2
```

**Tags**: `Bit Manipulation` `Bit Tricks` `Math`

**Hints**:
- Hint 1: Powers of 2 have only one set bit
- Hint 2: Use (n & (n-1)) == 0 trick
- Hint 3: Handle edge case: n must be > 0

---

### Problem 2.6: Fibonacci with Complexity Analysis

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Print first N Fibonacci numbers. Also state the time and space complexity of your solution.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
First N Fibonacci numbers, space-separated
Time Complexity: [your answer]
Space Complexity: [your answer]
```

**Example**:
```
Input:
8

Output:
0 1 1 2 3 5 8 13
Time Complexity: O(n)
Space Complexity: O(1)
```

**Tags**: `Math` `Sequences` `Complexity Analysis`

**Hints**:
- Hint 1: Start with a=0, b=1
- Hint 2: Next = a + b, then update a=b, b=next
- Hint 3: Only store last two values (O(1) space)

---

## LEVEL 3: Thinking (Building Logic)

### Problem 3.1: Modular Exponentiation

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Calculate (a^b) % m efficiently using O(log b) approach.

**Input Format**:
```
Three integers: a, b, m
```

**Output Format**:
```
Result: [answer]
```

**Example**:
```
Input:
2 10 1000

Output:
Result: 24

Explanation: 2^10 = 1024, 1024 % 1000 = 24
```

**Tags**: `Math` `Modular Arithmetic` `Optimization`

**Hints**:
- Hint 1: Use binary exponentiation
- Hint 2: If b is even: a^b = (a²)^(b/2)
- Hint 3: If b is odd: a^b = a × a^(b-1)
- Hint 4: Apply modulo at each step

---

### Problem 3.2: Swap Using XOR

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Swap two numbers without using a temporary variable, using XOR.

**Input Format**:
```
Two integers a and b
```

**Output Format**:
```
Before: a=[a], b=[b]
After: a=[a], b=[b]
```

**Example**:
```
Input:
5 10

Output:
Before: a=5, b=10
After: a=10, b=5
```

**Tags**: `Bit Manipulation` `XOR` `Swapping`

**Hints**:
- Hint 1: a = a ^ b
- Hint 2: b = a ^ b
- Hint 3: a = a ^ b

---

### Problem 3.3: Find Unique Element

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
In an array where every element appears twice except one, find the unique element using XOR.

**Input Format**:
```
First line: N (size of array)
Second line: N space-separated integers
```

**Output Format**:
```
Unique element: [result]
```

**Example**:
```
Input:
7
4 1 2 1 2 4 3

Output:
Unique element: 3

Explanation: 4^4=0, 1^1=0, 2^2=0, only 3 remains
```

**Tags**: `Bit Manipulation` `XOR` `Arrays` `Optimization`

**Hints**:
- Hint 1: XOR of same numbers = 0
- Hint 2: XOR of 0 with any number = that number
- Hint 3: XOR all elements, duplicates cancel out

---

### Problem 3.4: Sieve of Eratosthenes

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Find all prime numbers up to N using Sieve of Eratosthenes (O(n log log n)).

**Input Format**:
```
A single integer N
```

**Output Format**:
```
Prime numbers up to N, space-separated
```

**Example**:
```
Input:
30

Output:
2 3 5 7 11 13 17 19 23 29
```

**Tags**: `Math` `Prime Numbers` `Sieve` `Optimization`

**Hints**:
- Hint 1: Create boolean array, assume all are prime
- Hint 2: Mark 0 and 1 as not prime
- Hint 3: For each prime p, mark all multiples of p as not prime
- Hint 4: Start from p*p (smaller multiples already marked)

---

### Problem 3.5: Trailing Zeros in Factorial

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Count the number of trailing zeros in N! without calculating the factorial.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
Trailing zeros: [count]
```

**Example**:
```
Input:
100

Output:
Trailing zeros: 24

Explanation: Count factors of 5 in 100!
```

**Tags**: `Math` `Factorial` `Number Theory`

**Hints**:
- Hint 1: Trailing zeros come from factors of 10
- Hint 2: 10 = 2 × 5, count pairs of (2,5)
- Hint 3: Count of 5s is always less than 2s
- Hint 4: Formula: N/5 + N/25 + N/125 + ...

---

## LEVEL 4: Challenge (Advanced Thinking)

### Problem 4.1: Count Bits for All Numbers

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
For all numbers from 0 to N, count set bits for each. Use dynamic programming for O(n) solution.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
Array of size N+1 with bit counts
```

**Example**:
```
Input:
5

Output:
0 1 1 2 1 2

Explanation:
0 → 0 bits
1 → 1 bit
2 → 1 bit (10)
3 → 2 bits (11)
4 → 1 bit (100)
5 → 2 bits (101)
```

**Tags**: `Bit Manipulation` `Dynamic Programming` `Optimization`

**Hints**:
- Hint 1: Use previously computed results
- Hint 2: count[i] = count[i >> 1] + (i & 1)
- Hint 3: Right shift removes last bit

---

### Problem 4.2: Reverse Bits of a Number

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Reverse the bits of a 32-bit unsigned integer.

**Input Format**:
```
A single integer
```

**Output Format**:
```
Reversed: [result]
```

**Example**:
```
Input:
43261596

Output:
Reversed: 964176192

Explanation:
Input binary:  00000010100101000001111010011100
Output binary: 00111001011110000010100101000000
```

**Tags**: `Bit Manipulation` `Bit Reversal` `Advanced`

**Hints**:
- Hint 1: Extract bits one by one
- Hint 2: Build result by shifting left
- Hint 3: Loop 32 times for all bits

---

### Problem 4.3: Power Set Generation

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Generate all subsets (power set) of an array using bit manipulation.

**Input Format**:
```
First line: N (size of array)
Second line: N space-separated integers
```

**Output Format**:
```
All subsets, each on a new line
```

**Example**:
```
Input:
3
1 2 3

Output:
{}
{1}
{2}
{1 2}
{3}
{1 3}
{2 3}
{1 2 3}
```

**Tags**: `Bit Manipulation` `Bitmask` `Subsets` `Recursion`

**Hints**:
- Hint 1: Total subsets = 2^n
- Hint 2: Use bitmask from 0 to 2^n - 1
- Hint 3: If ith bit is set, include arr[i] in subset

---

## LEVEL 5: Edge Cases & Real-World Problems

### Problem 5.1: Overflow-Safe Modular Arithmetic

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Perform (a × b) % m safely, preventing overflow before modulo.

**Input Format**:
```
Three integers: a, b, m
```

**Output Format**:
```
Result: [answer]
```

**Example**:
```
Input:
1000000000 1000000000 1000000007

Output:
Result: 49

Explanation: Direct multiplication overflows, use modular arithmetic
```

**Tags**: `Edge Cases` `Modular Arithmetic` `Overflow Prevention`

**Hints**:
- Hint 1: Cast to long long before multiplication
- Hint 2: Use: ((long long)a * b) % m
- Hint 3: Or use Russian Peasant multiplication for very large numbers

---

### Problem 5.2: Complexity Calculator

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Given time limit (seconds) and operation count, determine if an algorithm will pass.

Assume 10⁸ operations per second.

**Input Format**:
```
Time limit (seconds)
Input size n
Complexity type (1=O(n), 2=O(n log n), 3=O(n²), 4=O(2^n))
```

**Output Format**:
```
Will Pass OR Will TLE (Time Limit Exceeded)
```

**Example**:
```
Input:
1
100000
3

Output:
Will TLE

Explanation: O(n²) with n=10⁵ = 10^10 ops, but limit is 10⁸ ops
```

**Tags**: `Edge Cases` `Complexity Analysis` `Real-World`

**Hints**:
- Hint 1: Calculate operations based on complexity
- Hint 2: Compare with time_limit × 10⁸
- Hint 3: Use logarithms for n log n

---

### Problem 5.3: Bit Flags Manager

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Use a single integer as 32 boolean flags for a permission system.

Operations: Grant permission, Revoke permission, Check permission, List all permissions.

**Input Format**:
```
Menu-driven:
1. Grant permission [0-31]
2. Revoke permission [0-31]
3. Check permission [0-31]
4. List all granted permissions
5. Exit
```

**Output Format**:
```
[Operation result]
```

**Example**:
```
Input:
1 5
1 10
3 5
4
5

Output:
Permission 5 granted
Permission 10 granted
Permission 5: GRANTED
Granted permissions: 5 10
Exiting...
```

**Tags**: `Edge Cases` `Bit Manipulation` `Real-World` `System Design`

**Hints**:
- Hint 1: Grant: flags |= (1 << bit)
- Hint 2: Revoke: flags &= ~(1 << bit)
- Hint 3: Check: (flags >> bit) & 1
- Hint 4: Use single integer for all 32 flags

---

## LEVEL 6: Mini Real-World Tasks

### Task 6.1: Cryptographic Hash (Simple)

**Difficulty**: ⭐⭐⭐ Medium

**Scenario**: Build a simple hash function using modular arithmetic for a basic authentication system.

**Requirements**:
- Take a string password as input
- Convert to numeric hash using polynomial rolling hash
- Apply modulo to keep within range
- Handle collisions (show if hash already exists)

**Input Format**:
```
Password string
Hash table size
```

**Output Format**:
```
Hash value: [number]
Status: Unique OR Collision detected
```

**Example**:
```
Input:
mypassword123
1000

Output:
Hash value: 847
Status: Unique
```

**Tags**: `Real-World` `Modular Arithmetic` `Hashing` `Security`

**Hints**:
- Hint 1: Use polynomial: hash = (s[0]×31^(n-1) + s[1]×31^(n-2) + ...) % m
- Hint 2: Apply modulo at each step to prevent overflow
- Hint 3: Store hashes in array to detect collisions

---

### Task 6.2: Memory Usage Estimator

**Difficulty**: ⭐⭐⭐⭐ Hard

**Scenario**: Estimate memory usage for different data structures given input size.

**Requirements**:
- Take input size n
- Calculate memory for: Array, 2D Array, Vector of Vectors
- Show in bytes, KB, MB
- Warn if exceeds 256MB (common limit)

**Input Format**:
```
Input size n
Data type size (in bytes): int=4, long long=8, etc.
```

**Output Format**:
```
=== Memory Estimation ===
Array (1D): X MB
2D Array (n×n): X MB
Warning/OK
========================
```

**Example**:
```
Input:
10000
4

Output:
=== Memory Estimation ===
Array (1D): 0.04 MB
2D Array (n×n): 381.47 MB
⚠️ Warning: Exceeds 256MB limit!
========================
```

**Tags**: `Real-World` `Space Complexity` `Memory Management`

**Hints**:
- Hint 1: 1D array = n × sizeof(type)
- Hint 2: 2D array = n × n × sizeof(type)
- Hint 3: Convert: 1 KB = 1024 bytes, 1 MB = 1024 KB

---

### Task 6.3: Algorithm Performance Comparator

**Difficulty**: ⭐⭐⭐⭐ Hard

**Scenario**: Compare execution time of different algorithms for same problem.

**Requirements**:
- Implement linear search O(n) and binary search O(log n)
- Generate sorted array of size n
- Measure operations count (not actual time)
- Show comparison for different input sizes

**Input Format**:
```
Array size n
Target value to search
```

**Output Format**:
```
=== Performance Comparison ===
Linear Search: X comparisons
Binary Search: Y comparisons
Speedup: X/Y times faster
=============================
```

**Example**:
```
Input:
1000000
999999

Output:
=== Performance Comparison ===
Linear Search: 1000000 comparisons
Binary Search: 20 comparisons
Speedup: 50000 times faster
=============================
```

**Tags**: `Real-World` `Complexity Analysis` `Performance` `Comparison`

**Hints**:
- Hint 1: Count loop iterations, not actual time
- Hint 2: Binary search needs sorted array
- Hint 3: Worst case: target at end or not present

---

## Practice Strategy

### Time Pressure Solving Guidelines

**Why Practice Under Time Pressure?**
- Interviews have strict time limits (30-45 mins per problem)
- Competitive programming has countdown timers
- Builds decision-making skills under stress

**Time Allocation Strategy**:

| Problem Level | Thinking Time | Coding Time | Testing Time | Total |
|---------------|---------------|-------------|--------------|-------|
| Level 1-2 | 5 mins | 10 mins | 5 mins | 20 mins |
| Level 3 | 10 mins | 20 mins | 10 mins | 40 mins |
| Level 4-5 | 15 mins | 30 mins | 15 mins | 60 mins |

**The 3-Phase Approach**:

**Phase 1: Understand & Plan (First 20% of time)**
1. Read problem 2 times carefully
2. Identify input/output format
3. Create 2-3 test cases (including edge cases)
4. Think of brute force solution
5. Write pseudocode on paper

**Phase 2: Implement (Next 50% of time)**
1. Start coding WITHOUT perfectionism
2. Get brute force working first
3. Test with sample input
4. Only optimize if time permits

**Phase 3: Test & Debug (Last 30% of time)**
1. Test with your edge cases
2. Check boundary values (0, 1, -1, max)
3. Verify output format matches exactly
4. Fix any bugs found

**When Timer Runs Out**:
- STOP coding immediately
- Note where you got stuck
- Review solution to learn
- Track mistake in table below
- Retry problem next day

**Pro Tips for Speed**:
- ⏱️ Use actual timer (phone/stopwatch)
- ⏱️ Don't aim for perfect code first—aim for working code
- ⏱️ Practice typing common patterns (loops, if-else)
- ⏱️ Learn keyboard shortcuts in your IDE
- ⏱️ Skip and return if stuck for >5 mins

---

### How to Approach Each Problem

1. **Read the problem 2-3 times**
2. **Understand input/output format**
3. **Create your own test cases**
4. **Think of brute force solution first**
5. **Try to optimize**
6. **Write pseudocode**
7. **Implement in C++**
8. **Test with multiple inputs**
9. **Handle edge cases**
10. **Review and refactor**

### Common Edge Cases to Check

- Empty input
- Single element
- All same elements
- Negative numbers
- Zero
- Very large numbers
- Already sorted/reverse sorted

### Time Management

- **Level 1**: 10-15 minutes per problem
- **Level 2**: 20-30 minutes per problem
- **Level 3**: 30-45 minutes per problem
- **Level 4**: 45-60 minutes per problem

**If stuck for too long**:
1. Take a 5-minute break
2. Come back with fresh mind
3. Check ONE hint at a time
4. Try again for 15 minutes
5. If still stuck, check solution and LEARN from it

---

## 📊 Mistake Tracking Table

**Instructions**: Track EVERY mistake you make. Review this table weekly.

| Date | Problem | Mistake Type | What Went Wrong | Lesson Learned | Fixed? ✓ |
|------|---------|--------------|-----------------|----------------|----------|
| | | Syntax | | | |
| | | Logic | | | |
| | | Edge Case | | | |
| | | Time Limit | | | |
| | | Wrong Output | | | |

**Mistake Categories**:
- **Syntax**: Forgot semicolon, wrong operator, typo
- **Logic**: Wrong algorithm, incorrect condition
- **Edge Case**: Didn't handle 0, negative, empty input
- **Time Limit**: Inefficient solution (O(n²) instead of O(n))
- **Wrong Output**: Format mismatch, off-by-one error

**How to Use This Table**:
1. Fill row after EVERY failed attempt
2. Be specific in "What Went Wrong" column
3. Write actionable lesson (not just "be careful")
4. Review weekly to spot patterns
5. Re-solve problems marked ✗ after 2-3 days

**Example Entry**:
```
Date: 2026-04-19
Problem: 2.1 Prime Check
Mistake Type: Edge Case
What Went Wrong: Didn't handle n=1 (said it's prime)
Lesson Learned: 1 is not prime; add check: if (n <= 1) return false
Fixed? ✓
```

**Common Patterns to Watch**:
- If you see 3+ "Edge Case" mistakes → Practice boundary value problems
- If you see 3+ "Time Limit" mistakes → Learn complexity analysis
- If you see 3+ "Syntax" mistakes → Review C++ basics again

---

**Remember**: Struggle is part of learning. Every problem you solve makes you stronger! 💪

**Keep this table updated—it's your personal improvement roadmap!**

---

## 🎯 Interview Simulation Section

### How to Use This Section

**Simulate real interview conditions:**
1. Set timer for 30-45 minutes
2. No hints allowed during solving
3. Explain your approach out loud (as if to interviewer)
4. Write clean, production-quality code
5. Test thoroughly before considering it "done"

---

### Interview Problem 1: Efficient Power Calculation

**Company**: Google, Amazon  
**Difficulty**: Medium  
**Time Limit**: 25 minutes

**Problem**: 
Implement `pow(x, n)` which calculates x raised to the power n (i.e., xⁿ). Handle negative exponents and large values efficiently.

**Constraints**:
- -100.0 < x < 100.0
- -2³¹ ≤ n ≤ 2³¹ - 1
- Answer must be within 10⁻⁵ of actual value

**Example**:
```
Input: x = 2.00000, n = 10
Output: 1024.00000

Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2⁻² = 1/2² = 1/4 = 0.25
```

**Interview Expectations**:
- ✅ Brute force O(n) solution in 5 minutes
- ✅ Optimized O(log n) solution using binary exponentiation
- ✅ Handle edge cases (n=0, n<0, x=0)
- ✅ Explain time/space complexity
- ✅ Write clean, bug-free code

**What Interviewers Look For**:
- Can you optimize from O(n) to O(log n)?
- Do you handle negative exponents correctly?
- Can you explain the recursion/iteration clearly?

---

### Interview Problem 2: Single Number (XOR Trick)

**Company**: Facebook, Microsoft  
**Difficulty**: Easy-Medium  
**Time Limit**: 20 minutes

**Problem**: 
Given a non-empty array of integers where every element appears **twice** except for one, find that single one. You must implement a solution with O(n) time complexity and O(1) extra space.

**Constraints**:
- 1 ≤ nums.length ≤ 3 × 10⁴
- -3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴
- Each element appears twice except one

**Example**:
```
Input: [4, 1, 2, 1, 2]
Output: 4

Input: [2, 2, 1]
Output: 1
```

**Interview Expectations**:
- ✅ Brute force with hash map O(n) space (5 minutes)
- ✅ Optimal XOR solution O(1) space (10 minutes)
- ✅ Explain XOR properties clearly
- ✅ Prove why XOR works (mathematical reasoning)

**What Interviewers Look For**:
- Do you know bit manipulation tricks?
- Can you explain why a^a = 0 and a^0 = a?
- Can you prove correctness?

---

### Interview Problem 3: Count Primes (Sieve Optimization)

**Company**: Amazon, Apple  
**Difficulty**: Medium  
**Time Limit**: 30 minutes

**Problem**: 
Given an integer n, return the number of prime numbers less than n.

**Constraints**:
- 0 ≤ n ≤ 5 × 10⁶

**Example**:
```
Input: n = 10
Output: 4
Explanation: Primes less than 10 are 2, 3, 5, 7

Input: n = 100
Output: 25
```

**Interview Expectations**:
- ✅ Brute force O(n√n) solution (check each number)
- ✅ Optimized Sieve of Eratosthenes O(n log log n)
- ✅ Explain why Sieve is faster
- ✅ Handle edge cases (n=0, n=1, n=2)

**What Interviewers Look For**:
- Can you optimize from checking each number to Sieve?
- Do you understand why we start marking from p*p?
- Can you analyze space complexity?

---

### Interview Problem 4: Range Sum Query (Prefix Sum)

**Company**: Google, Uber  
**Difficulty**: Medium  
**Time Limit**: 35 minutes

**Problem**: 
Given an integer array nums, handle multiple queries of the following type:
- Calculate the sum of elements between indices i and j (inclusive, i ≤ j)

Implement a class with:
- Constructor that takes array
- Method `sumRange(i, j)` that returns sum

**Constraints**:
- 1 ≤ nums.length ≤ 10⁴
- -10⁵ ≤ nums[i] ≤ 10⁵
- 0 ≤ i ≤ j < nums.length
- At most 10⁴ calls to sumRange

**Example**:
```
Input: 
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]

Output: [null, 1, -1, -3]

Explanation:
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1))
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
```

**Interview Expectations**:
- ✅ Naive O(n) per query solution (5 minutes)
- ✅ Prefix sum O(1) per query solution (15 minutes)
- ✅ Explain precomputation tradeoff
- ✅ Analyze total time for multiple queries

**What Interviewers Look For**:
- Do you recognize the need for precomputation?
- Can you explain time-space tradeoff?
- Do you consider multiple query scenario?

---

### Interview Problem 5: Bitwise AND of Range

**Company**: Microsoft, Goldman Sachs  
**Difficulty**: Hard  
**Time Limit**: 40 minutes

**Problem**: 
Given two integers left and right (left ≤ right), return the bitwise AND of all numbers in the range [left, right] (inclusive).

**Constraints**:
- 0 ≤ left ≤ right ≤ 2³¹ - 1

**Example**:
```
Input: left = 5, right = 7
Output: 4
Explanation: 5 & 6 & 7 = 101 & 110 & 111 = 100 = 4

Input: left = 0, right = 1
Output: 0
```

**Interview Expectations**:
- ✅ Brute force O(n) AND all numbers (5 minutes)
- ✅ Optimized O(log n) using common prefix (20 minutes)
- ✅ Explain why bits change in range
- ✅ Handle edge cases (left=right, left=0)

**What Interviewers Look For**:
- Can you identify the pattern (common prefix)?
- Do you understand bit behavior in ranges?
- Can you optimize using bit shifting?

---

### Interview Evaluation Checklist

**Use this to self-evaluate after each problem:**

#### Communication (20 points)
- [ ] Explained approach before coding (5 pts)
- [ ] Asked clarifying questions (5 pts)
- [ ] Explained time/space complexity (5 pts)
- [ ] Discussed tradeoffs (5 pts)

#### Problem Solving (30 points)
- [ ] Started with brute force (10 pts)
- [ ] Identified optimization opportunity (10 pts)
- [ ] Implemented optimal solution (10 pts)

#### Code Quality (30 points)
- [ ] Clean, readable code (10 pts)
- [ ] Proper variable names (5 pts)
- [ ] Handles edge cases (10 pts)
- [ ] No bugs on first run (5 pts)

#### Testing (20 points)
- [ ] Tested with given examples (5 pts)
- [ ] Created own test cases (5 pts)
- [ ] Tested edge cases (5 pts)
- [ ] Verified complexity (5 pts)

**Scoring**:
- 80-100: Strong Hire ✅
- 60-79: Hire ✓
- 40-59: No Hire ✗
- Below 40: Strong No Hire ❌

---

### Interview Tips for Fundamentals Topics

**Complexity Questions**:
- Always start with "Let me analyze..."
- Count operations, not actual time
- Mention best, average, worst case
- Give concrete examples

**Math Problems**:
- Write down formulas before coding
- Check for overflow before operations
- Use modular arithmetic when needed
- Test with small examples first

**Bit Manipulation**:
- Draw binary representations
- Explain operator behavior clearly
- Mention properties (commutative, associative)
- Show step-by-step execution

**Common Mistakes to Avoid**:
- ❌ Not checking constraints first
- ❌ Ignoring edge cases (0, 1, negative)
- ❌ Overflow in calculations
- ❌ Wrong complexity analysis
- ❌ Not explaining thought process

---

### Mock Interview Schedule

**Week 1**: Problems 1-2 (Focus: Math & XOR)
**Week 2**: Problems 3-4 (Focus: Sieve & Prefix Sum)
**Week 3**: Problem 5 + Random (Focus: Advanced Bits)
**Week 4**: Full mock interviews (45 min each)

**Track Your Progress**:

| Date | Problem | Time Taken | Score | Weakness | Improved? |
|------|---------|------------|-------|----------|----------|
| | | | | | |
| | | | | | |

---


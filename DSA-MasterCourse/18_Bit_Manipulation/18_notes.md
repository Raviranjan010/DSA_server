## 18_Bit_Manipulation — Complete Notes

### 1. What is it? (Real-world analogy)
Imagine an array of tiny light switches. Each switch can only be ON (1) or OFF (0). Instead of using a bulky notebook to write down whether a switch is on or off, you just look at the row of switches themselves.

Computers internally store numbers using these switches (bits). **Bit Manipulation** is the art of bypassing mathematics (like addition or division) and directly flicking these binary switches to solve problems incredibly fast. 

### 2. Why do we need it? (Motivation)
- **Speed**: CPU bitwise operations (AND, OR, XOR, Shifts) execute in a single clock cycle. They are much faster than arithmetic operations like `%` (modulo) or `/` (division).
- **Space Optimization**: A single `int` in C++ is 32 bits. You can store 32 different boolean (True/False) values in just ONE single integer variable instead of an entire array!
- **Hardware Integration**: Vital in embedded systems, cryptography, and competitive programming for ultra-fast subsets generation.

### 3. Core Concepts & Terminology
- **Bitwise AND (`&`)**: 1 if BOTH bits are 1.
- **Bitwise OR (`|`)**: 1 if AT LEAST ONE bit is 1.
- **Bitwise XOR (`^`)**: 1 if the bits are DIFFERENT. (Extremely useful!)
- **Bitwise NOT (`~`)**: Flips all bits.
- **Left Shift (`<<`)**: Shifts bits to the left. `N << K` mathematically means `N * (2^K)`.
- **Right Shift (`>>`)**: Shifts bits to the right. `N >> K` mathematically means `N / (2^K)`.

### 4. Visual Diagram
```text
Bitwise XOR (^) Truth Table
A | B | A ^ B
--+---+-------
0 | 0 |   0    <- Same bits give 0
0 | 1 |   1    <- Different bits give 1
1 | 0 |   1    
1 | 1 |   0    

Example: 5 ^ 3
  5 in binary = 0101
  3 in binary = 0011
  ------------------
  5 ^ 3       = 0110  (Which is 6 in decimal!)
```

### 5. C++ Implementation
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5; // Binary: 0101
    
    // Check if the i-th bit is set (e.g., 0-th bit)
    int i = 0;
    bool isSet = (n & (1 << i)) != 0; 
    
    // Set the i-th bit (change 0 to 1) 
    // e.g., Set 1st bit: 5 (0101) becomes 7 (0111)
    int setBit = n | (1 << 1);
    
    // Clear the i-th bit (change 1 to 0)
    // e.g., Clear 0th bit: 5 (0101) becomes 4 (0100)
    int clearBit = n & ~(1 << 0);
    
    // Toggle the i-th bit (change 0 to 1, or 1 to 0)
    // e.g., Toggle 0th bit: 5 (0101) becomes 4 (0100)
    int toggleBit = n ^ (1 << 0);
    
    return 0;
}
```

### 6. Dry Run / Step-by-Step Trace
**Problem**: Count number of set bits in `N = 13`. (Brian Kernighan's Algorithm)
Trace: `N = N & (N - 1)` drops the lowest set bit.
- Start `N = 13` (Binary `1101`). Count = 0.
- Iteration 1: `N = 13 & 12` (`1101 & 1100 = 1100`). Count = 1. `N` is now 12.
- Iteration 2: `N = 12 & 11` (`1100 & 1011 = 1000`). Count = 2. `N` is now 8.
- Iteration 3: `N = 8 & 7` (`1000 & 0111 = 0000`). Count = 3. `N` is now 0.
- Loop ends. Answer is 3 bits!

### 7. All Operations with Time & Space Complexity
| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Set / Clear / Toggle Bit | `O(1)` | `O(1)` |
| Check if Power of 2 | `O(1)` | `O(1)` |
| Brian Kernighan (Count Bits)| `O(number of set bits)` | `O(1)` |

### 8. Common Patterns & Tricks
💡 TRICK 1: **Even or Odd?** 
Check `(N & 1)`. If `0`, it's Even. If `1`, it's Odd. Faster than `N % 2`.

💡 TRICK 2: **Clear Rightmost Set Bit**
`N = N & (N - 1)`. 

💡 TRICK 3: **Check if Power of 2**
If `N > 0` and `(N & (N - 1)) == 0`, it is a perfect power of 2.

💡 TRICK 4: **XOR properties**
`A ^ A = 0` and `A ^ 0 = A`. Ideal for finding the single unique element in an array where every other element appears twice!

### 9. Common Mistakes & How to Avoid Them
❌ **Mistake:** Using `1 << i` when `i >= 31`. A signed 32-bit integer overflows!
✅ **Fix:** Use `1LL << i` to force the `1` to be a 64-bit `long long` integer before shifting.

❌ **Mistake:** Confusing `&` (Bitwise AND) with `&&` (Logical AND). Same for `|` and `||`.
✅ **Fix:** Double-check operators. Logical `&&` returns a boolean. Bitwise `&` returns an integer.

### 10. Interview Tips & What Companies Ask
- **Meta** frequently asks problems combining Bit Manipulation with Arrays (e.g., Single Number I, II, III).
- Bitwise operations are often "Follow-up constraints" (e.g., "Can you do this in O(1) space?").
- When dealing with permutations or combinations of small sizes (N <= 20), always think of **Bitmasking** instead of Recursion!

### 11. Practice Problems
1. 🟢 Single Number I `[Amazon]`
2. 🟢 Number of 1 Bits `[Microsoft]`
3. 🟢 Power of Two `[Meta]`
4. 🟡 Single Number II (Appears 3 times) `[Google]`
5. 🟡 Single Number III (Two unique numbers) `[Amazon]`
6. 🟡 Bitwise AND of Numbers Range `[Flipkart]`
7. 🟡 Subsets (Using Bitmasking) `[Adobe]`
8. 🔴 Maximum XOR of Two Numbers in an Array `[Google]`
9. 🔴 Find arrays with XOR sum Equal to K `[Codeforces]`
10. 🔴 Count Triplets That Can Form Two Arrays of Equal XOR `[Microsoft]`

### 12. Solved Example Problems

**Problem 1: Single Number (LeetCode #136)**
*Every element appears twice except for one. Find that single one.*
```cpp
// Since A ^ A = 0 and A ^ 0 = A.
// If we XOR all elements, pairs cancel out to 0, leaving only the unique element!
int singleNumber(vector<int>& nums) {
    int ans = 0;
    for (int num : nums) {
        ans ^= num; // Accumulate XOR
    }
    return ans;
}
// Time Complexity: O(N) | Space Complexity: O(1)
```

**(Additional solutions omitted for concise template rendering).**

### 13. Glossary
- **MSB**: Most Significant Bit (The leftmost bit).
- **LSB**: Least Significant Bit (The rightmost bit).
- **Bitmask**: An integer used to 'mask' or represent a subset of items or a state array.

---
### FUTURE QUESTIONS
- How would you implement addition of two numbers without using the `+` or `-` operator? (Hint: Use XOR for sum, and AND for carry).
- Implement a Bloom Filter using bitwise operations.

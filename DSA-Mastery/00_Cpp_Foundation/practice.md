# C++ Foundation - Practice Problems

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

### Problem 1.1: Hello User

**Difficulty**: ⭐ Very Easy

**Problem**: 
Take the user's name as input and print a greeting message.

**Input Format**:
```
A single line containing a name (string)
```

**Output Format**:
```
Hello, [name]! Welcome to C++ programming.
```

**Example**:
```
Input:
Rahul

Output:
Hello, Rahul! Welcome to C++ programming.
```

**Tags**: `Basics` `Input/Output` `Strings`

**Hints**:
- Hint 1: Use `cin` to take input and `cout` to print
- Hint 2: Remember to use `#include <string>` for strings
- Hint 3: Use `getline(cin, name)` if name has spaces

---

### Problem 1.2: Sum of Two Numbers

**Difficulty**: ⭐ Very Easy

**Problem**: 
Take two integers as input and print their sum.

**Input Format**:
```
Two integers separated by space
```

**Output Format**:
```
Sum: [result]
```

**Example**:
```
Input:
5 10

Output:
Sum: 15
```

**Tags**: `Basics` `Operators` `Input/Output`

**Hints**:
- Hint 1: Declare two integer variables
- Hint 2: Use `cin >> a >> b` to take both inputs
- Hint 3: Add them and store in a third variable

---

### Problem 1.3: Temperature Converter

**Difficulty**: ⭐ Easy

**Problem**: 
Convert temperature from Celsius to Fahrenheit.

**Formula**: `Fahrenheit = (Celsius × 9/5) + 32`

**Input Format**:
```
A single integer/float representing temperature in Celsius
```

**Output Format**:
```
[temperature]°C = [result]°F
```

**Example**:
```
Input:
100

Output:
100°C = 212°F
```

**Tags**: `Operators` `Math` `Data Types`

**Hints**:
- Hint 1: Use `double` for precision
- Hint 2: Be careful with integer division (9/5 = 1, but 9.0/5.0 = 1.8)
- Hint 3: Apply the formula and print with formatting

---

### Problem 1.4: Check Even or Odd

**Difficulty**: ⭐ Easy

**Problem**: 
Take a number as input and check if it's even or odd.

**Input Format**:
```
A single integer
```

**Output Format**:
```
[Number] is Even
OR
[Number] is Odd
```

**Example**:
```
Input:
7

Output:
7 is Odd
```

**Tags**: `Operators` `Conditionals` `Modulus`

**Hints**:
- Hint 1: Even numbers are divisible by 2
- Hint 2: Use the modulus operator `%`
- Hint 3: If `n % 2 == 0`, it's even, otherwise odd

---

### Problem 1.5: Find Maximum of Two Numbers

**Difficulty**: ⭐ Easy

**Problem**: 
Take two numbers as input and print the maximum.

**Input Format**:
```
Two integers separated by space
```

**Output Format**:
```
Maximum: [result]
```

**Example**:
```
Input:
15 23

Output:
Maximum: 23
```

**Tags**: `Conditionals` `Operators`

**Hints**:
- Hint 1: Use if-else to compare
- Hint 2: Or use ternary operator: `max = (a > b) ? a : b`
- Hint 3: Don't forget to handle equal numbers

---

### Problem 1.6: Simple Interest Calculator

**Difficulty**: ⭐ Easy

**Problem**: 
Calculate simple interest given principal, rate, and time.

**Formula**: `SI = (P × R × T) / 100`

**Input Format**:
```
Three numbers: Principal (P), Rate (R), Time (T)
```

**Output Format**:
```
Simple Interest: [result]
```

**Example**:
```
Input:
1000 5 2

Output:
Simple Interest: 100
```

**Tags**: `Operators` `Math` `Data Types`

**Hints**:
- Hint 1: Use `double` for all variables
- Hint 2: Apply the formula directly
- Hint 3: Remember to divide by 100

---

### Problem 1.7: Print Numbers from 1 to N

**Difficulty**: ⭐ Easy

**Problem**: 
Take a number N as input and print all numbers from 1 to N.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
Numbers from 1 to N, space-separated
```

**Example**:
```
Input:
5

Output:
1 2 3 4 5
```

**Tags**: `Loops` `for loop`

**Hints**:
- Hint 1: Use a for loop from 1 to N
- Hint 2: Print each number followed by a space
- Hint 3: Loop condition: `i <= N`

---

### Problem 1.8: Multiplication Table

**Difficulty**: ⭐ Easy

**Problem**: 
Take a number N as input and print its multiplication table from 1 to 10.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
N x 1 = result
N x 2 = result
...
N x 10 = result
```

**Example**:
```
Input:
5

Output:
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50
```

**Tags**: `Loops` `for loop` `Operators`

**Hints**:
- Hint 1: Use a for loop from 1 to 10
- Hint 2: Multiply N with loop variable
- Hint 3: Format output as shown

---

### Problem 1.9: Sum of First N Natural Numbers

**Difficulty**: ⭐ Easy

**Problem**: 
Take N as input and find the sum of first N natural numbers (1 + 2 + 3 + ... + N).

**Input Format**:
```
A single integer N
```

**Output Format**:
```
Sum: [result]
```

**Example**:
```
Input:
10

Output:
Sum: 55
```

**Tags**: `Loops` `Math` `Accumulator Pattern`

**Hints**:
- Hint 1: Initialize `sum = 0`
- Hint 2: Use a loop from 1 to N
- Hint 3: Add each number to sum: `sum += i`

---

### Problem 1.10: Find ASCII Value

**Difficulty**: ⭐ Easy

**Problem**: 
Take a character as input and print its ASCII value.

**Input Format**:
```
A single character
```

**Output Format**:
```
ASCII value of [char] is [value]
```

**Example**:
```
Input:
A

Output:
ASCII value of A is 65
```

**Tags**: `Data Types` `char` `Type Casting`

**Hints**:
- Hint 1: char is internally stored as a number
- Hint 2: Cast char to int: `(int)ch`
- Hint 3: Or simply assign char to int variable

---

## LEVEL 2: Application (Building Skills)

### Problem 2.1: Palindrome Check (Number)

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Check if a given number is a palindrome (reads the same forwards and backwards).

**Input Format**:
```
A single integer
```

**Output Format**:
```
[Number] is a Palindrome
OR
[Number] is NOT a Palindrome
```

**Example**:
```
Input:
121

Output:
121 is a Palindrome

Input:
123

Output:
123 is NOT a Palindrome
```

**Tags**: `Loops` `Math` `Number Manipulation`

**Hints**:
- Hint 1: Extract digits using `% 10`
- Hint 2: Build reverse number: `reverse = reverse * 10 + digit`
- Hint 3: Remove last digit: `n = n / 10`
- Hint 4: Compare original with reverse

---

### Problem 2.2: Factorial of a Number

**Difficulty**: ⭐⭐ Easy-Medium

**Problem**: 
Calculate the factorial of a given number N.

**Factorial**: `N! = N × (N-1) × (N-2) × ... × 1`

**Input Format**:
```
A single non-negative integer N
```

**Output Format**:
```
Factorial of N is [result]
```

**Example**:
```
Input:
5

Output:
Factorial of 5 is 120

Explanation: 5! = 5 × 4 × 3 × 2 × 1 = 120
```

**Tags**: `Loops` `Math` `Accumulator Pattern`

**Hints**:
- Hint 1: Initialize `fact = 1`
- Hint 2: Multiply from 1 to N
- Hint 3: Edge case: 0! = 1
- Hint 4: Use `long long` for large factorials

---

### Problem 2.3: Fibonacci Series

**Difficulty**: ⭐⭐ Medium

**Problem**: 
Print the first N terms of the Fibonacci series.

**Fibonacci**: 0, 1, 1, 2, 3, 5, 8, 13, ...
(Each term is sum of previous two terms)

**Input Format**:
```
A single integer N (number of terms)
```

**Output Format**:
```
First N Fibonacci numbers, space-separated
```

**Example**:
```
Input:
8

Output:
0 1 1 2 3 5 8 13
```

**Tags**: `Loops` `Math` `Sequence`

**Hints**:
- Hint 1: Start with `a = 0, b = 1`
- Hint 2: Next term = `a + b`
- Hint 3: Update: `a = b, b = next`
- Hint 4: Handle edge cases: N=1, N=2

---

### Problem 2.4: Count Digits in a Number

**Difficulty**: ⭐⭐ Easy

**Problem**: 
Count the number of digits in a given integer.

**Input Format**:
```
A single integer (can be positive or negative)
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

**Tags**: `Loops` `Math` `Number Manipulation`

**Hints**:
- Hint 1: Handle negative numbers (take absolute value)
- Hint 2: Special case: 0 has 1 digit
- Hint 3: Use a loop: divide by 10 until number becomes 0
- Hint 4: Count iterations

---

### Problem 2.5: Reverse a Number

**Difficulty**: ⭐⭐ Easy

**Problem**: 
Reverse the digits of a given number.

**Input Format**:
```
A single integer
```

**Output Format**:
```
Reversed number: [result]
```

**Example**:
```
Input:
12345

Output:
Reversed number: 54321

Input:
-123

Output:
Reversed number: -321
```

**Tags**: `Loops` `Math` `Number Manipulation`

**Hints**:
- Hint 1: Extract last digit using `% 10`
- Hint 2: Build reverse: `rev = rev * 10 + digit`
- Hint 3: Remove last digit: `n = n / 10`
- Hint 4: Handle negative numbers separately

---

### Problem 2.6: Array Sum and Average

**Difficulty**: ⭐⭐ Easy

**Problem**: 
Take N integers as input in an array. Calculate their sum and average.

**Input Format**:
```
First line: N (size of array)
Second line: N space-separated integers
```

**Output Format**:
```
Sum: [sum]
Average: [average]
```

**Example**:
```
Input:
5
10 20 30 40 50

Output:
Sum: 150
Average: 30.0
```

**Tags**: `Arrays` `Loops` `Math`

**Hints**:
- Hint 1: Declare array of size N
- Hint 2: Use loop to take input and calculate sum
- Hint 3: Average = sum / N (use double for average)

---

### Problem 2.7: Find Maximum in Array

**Difficulty**: ⭐⭐ Easy

**Problem**: 
Find the maximum element in an array of N integers.

**Input Format**:
```
First line: N (size of array)
Second line: N space-separated integers
```

**Output Format**:
```
Maximum: [result]
```

**Example**:
```
Input:
6
12 45 23 67 34 56

Output:
Maximum: 67
```

**Tags**: `Arrays` `Loops` `Comparison`

**Hints**:
- Hint 1: Assume first element is maximum
- Hint 2: Traverse array from index 1 to N-1
- Hint 3: If current element > max, update max
- Hint 4: Initialize max with `arr[0]`

---

### Problem 2.8: Linear Search

**Difficulty**: ⭐⭐ Easy

**Problem**: 
Search for a given element in an array. If found, print its index. Otherwise, print "Not Found".

**Input Format**:
```
First line: N (size of array)
Second line: N space-separated integers
Third line: Element to search
```

**Output Format**:
```
Found at index: [index]
OR
Not Found
```

**Example**:
```
Input:
5
10 20 30 40 50
30

Output:
Found at index: 2

Input:
5
10 20 30 40 50
60

Output:
Not Found
```

**Tags**: `Arrays` `Loops` `Searching`

**Hints**:
- Hint 1: Traverse array from index 0 to N-1
- Hint 2: Compare each element with search value
- Hint 3: If found, print index and break
- Hint 4: Use a boolean flag to track if found

---

## LEVEL 3: Thinking (Building Logic)

### Problem 3.1: Prime Number Check

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Check if a given number is prime.

**Prime Number**: A number greater than 1 that is divisible only by 1 and itself.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
[Number] is Prime
OR
[Number] is NOT Prime
```

**Example**:
```
Input:
17

Output:
17 is Prime

Input:
15

Output:
15 is NOT Prime
```

**Tags**: `Loops` `Math` `Number Theory` `Optimization`

**Hints**:
- Hint 1: Check divisibility from 2 to N-1
- Hint 2: Optimization: Check only up to √N
- Hint 3: Edge cases: 1 is NOT prime, 2 is prime
- Hint 4: If any number divides N, it's not prime

---

### Problem 3.2: GCD (Greatest Common Divisor)

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Find the GCD (HCF) of two numbers.

**GCD**: The largest number that divides both numbers.

**Input Format**:
```
Two integers A and B
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

Explanation: 
Factors of 12: 1, 2, 3, 4, 6, 12
Factors of 18: 1, 2, 3, 6, 9, 18
GCD = 6
```

**Tags**: `Math` `Number Theory` `Euclidean Algorithm`

**Hints**:
- Hint 1: Brute force: Check from min(A,B) down to 1
- Hint 2: Better: Euclidean algorithm
- Hint 3: Euclidean: `gcd(a,b) = gcd(b, a%b)` until b becomes 0
- Hint 4: Can be implemented iteratively or recursively

---

### Problem 3.3: LCM (Least Common Multiple)

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Find the LCM of two numbers.

**LCM**: The smallest number that is divisible by both numbers.

**Input Format**:
```
Two integers A and B
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

**Tags**: `Math` `Number Theory`

**Hints**:
- Hint 1: Formula: `LCM(A,B) = (A × B) / GCD(A,B)`
- Hint 2: First implement GCD function
- Hint 3: Use the formula to find LCM
- Hint 4: Watch out for overflow with large numbers

---

### Problem 3.4: Count Vowels and Consonants

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Take a string as input and count the number of vowels and consonants.

**Vowels**: A, E, I, O, U (both uppercase and lowercase)
**Consonants**: All other alphabets

**Input Format**:
```
A single line containing a string (may contain spaces)
```

**Output Format**:
```
Vowels: [count]
Consonants: [count]
```

**Example**:
```
Input:
Hello World

Output:
Vowels: 3
Consonants: 7
```

**Tags**: `Strings` `Loops` `Conditionals`

**Hints**:
- Hint 1: Use `getline(cin, str)` for input with spaces
- Hint 2: Traverse each character
- Hint 3: Check if vowel (a,e,i,o,u,A,E,I,O,U)
- Hint 4: If alphabet but not vowel, it's consonant

---

### Problem 3.5: Reverse a String

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Reverse a given string without using built-in reverse function.

**Input Format**:
```
A single line containing a string
```

**Output Format**:
```
Reversed string: [result]
```

**Example**:
```
Input:
Hello

Output:
Reversed string: olleH
```

**Tags**: `Strings` `Two Pointers` `In-place Operations`

**Hints**:
- Hint 1: Use two pointers (start and end)
- Hint 2: Swap characters at start and end
- Hint 3: Move start forward, end backward
- Hint 4: Continue until start >= end

---

### Problem 3.6: Check Palindrome (String)

**Difficulty**: ⭐⭐⭐ Medium

**Problem**: 
Check if a given string is a palindrome (reads same forwards and backwards).

**Input Format**:
```
A single line containing a string
```

**Output Format**:
```
[String] is a Palindrome
OR
[String] is NOT a Palindrome
```

**Example**:
```
Input:
madam

Output:
madam is a Palindrome

Input:
hello

Output:
hello is NOT a Palindrome
```

**Tags**: `Strings` `Two Pointers` `Comparison`

**Hints**:
- Hint 1: Use two pointers (start=0, end=length-1)
- Hint 2: Compare characters at start and end
- Hint 3: If mismatch, not a palindrome
- Hint 4: Move pointers towards center

---

## LEVEL 4: Challenge (Advanced Thinking)

### Problem 4.1: Print Complex Pattern

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Print the following pattern for given N:

```
    *
   ***
  *****
 *******
*********
```

This is a pyramid pattern with N rows.

**Input Format**:
```
A single integer N
```

**Output Format**:
```
Pattern with N rows as shown above
```

**Example**:
```
Input:
5

Output:
    *
   ***
  *****
 *******
*********
```

**Tags**: `Nested Loops` `Pattern Printing` `Logic Building`

**Hints**:
- Hint 1: Each row has spaces and stars
- Hint 2: Row i has (N-i) spaces
- Hint 3: Row i has (2*i - 1) stars
- Hint 4: Use nested loops: outer for rows, inner for spaces and stars

---

### Problem 4.2: Armstrong Number Check

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Check if a number is an Armstrong number.

**Armstrong Number**: A number that equals the sum of its digits raised to the power of the number of digits.

Example: 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✓

**Input Format**:
```
A single integer N
```

**Output Format**:
```
[Number] is an Armstrong Number
OR
[Number] is NOT an Armstrong Number
```

**Example**:
```
Input:
153

Output:
153 is an Armstrong Number

Input:
123

Output:
123 is NOT an Armstrong Number
```

**Tags**: `Math` `Loops` `Number Theory` `Power Operations`

**Hints**:
- Hint 1: Count the number of digits first
- Hint 2: Extract each digit using % 10
- Hint 3: Raise digit to power of number of digits
- Hint 4: Use `pow()` function from `<cmath>`

---

### Problem 4.3: Binary to Decimal Conversion

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Convert a binary number (base 2) to decimal (base 10).

**Input Format**:
```
A binary number (only 0s and 1s) as an integer
```

**Output Format**:
```
Decimal: [result]
```

**Example**:
```
Input:
1011

Output:
Decimal: 11

Explanation: 
1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰
     = 8 + 0 + 2 + 1
     = 11
```

**Tags**: `Math` `Number Systems` `Loops` `Base Conversion`

**Hints**:
- Hint 1: Extract digits from right to left
- Hint 2: Multiply each digit by 2^position
- Hint 3: Position starts from 0 (rightmost)
- Hint 4: Keep track of power of 2

---

### Problem 4.4: Introduction to Recursion - Sum of Digits

**Difficulty**: ⭐⭐⭐⭐ Hard

**Problem**: 
Find the sum of digits of a number using RECURSION.

**Example**: 
Number = 12345
Sum = 1 + 2 + 3 + 4 + 5 = 15

**Input Format**:
```
A single integer N
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
```

**Tags**: `Recursion` `Math` `Base Case` `Recursive Thinking`

**Hints**:
- Hint 1: Base case: If n == 0, return 0
- Hint 2: Recursive case: Return (last digit) + sumOfDigits(remaining)
- Hint 3: Last digit = n % 10
- Hint 4: Remaining = n / 10
- Hint 5: Trace with small example to understand

---

## LEVEL 6: Mini Real-World Tasks

### Task 6.1: Student Report Card Generator

**Difficulty**: ⭐⭐⭐ Medium

**Scenario**: You're building a simple report card system for a school.

**Requirements**:
- Take input for 5 subjects marks
- Calculate total, average, and grade
- Handle invalid inputs (marks > 100 or < 0)
- Display formatted output

**Input Format**:
```
Student name
5 space-separated marks (integers)
```

**Output Format**:
```
=== REPORT CARD ===
Name: [name]
Total: [total]/500
Average: [average]%
Grade: [grade]
Status: PASS/FAIL
===================
```

**Example**:
```
Input:
Rahul Sharma
85 90 78 92 88

Output:
=== REPORT CARD ===
Name: Rahul Sharma
Total: 433/500
Average: 86.6%
Grade: A
Status: PASS
===================
```

**Tags**: `Real-World` `Arrays` `Functions` `Input Validation`

**Hints**:
- Hint 1: Use `getline()` for name with spaces
- Hint 2: Create separate functions for grade calculation and validation
- Hint 3: Pass condition: average >= 40%

---

### Task 6.2: Simple ATM Simulator

**Difficulty**: ⭐⭐⭐⭐ Hard

**Scenario**: Build a basic ATM system with menu-driven operations.

**Requirements**:
- Start with balance = ₹10,000
- Menu options: Check Balance, Deposit, Withdraw, Exit
- Withdrawal checks: sufficient balance, valid amount
- Deposit checks: valid amount (> 0)
- Loop until user chooses Exit

**Input Format**:
```
Menu choice (1-4)
Amount (for deposit/withdraw)
```

**Output Format**:
```
=== ATM MENU ===
1. Check Balance
2. Deposit
3. Withdraw
4. Exit
================

[Operation result]
```

**Example**:
```
Input:
1
3
5000
2
2000
4

Output:
=== ATM MENU ===
Balance: ₹10000

=== ATM MENU ===
Enter amount: ₹5000 withdrawn successfully!
New Balance: ₹5000

=== ATM MENU ===
Enter amount: ₹2000 deposited successfully!
New Balance: ₹7000

=== ATM MENU ===
Thank you! Visit again.
```

**Tags**: `Real-World` `Loops` `Conditionals` `Functions` `Menu-Driven`

**Hints**:
- Hint 1: Use `do-while` for menu loop
- Hint 2: Create functions: `checkBalance()`, `deposit()`, `withdraw()`
- Hint 3: Use global or pass-by-reference for balance
- Hint 4: Validate: withdrawal amount > 0 AND <= balance

---

### Task 6.3: Contact Book Manager

**Difficulty**: ⭐⭐⭐⭐ Hard

**Scenario**: Create a simple contact management system.

**Requirements**:
- Store up to 10 contacts (name + phone number)
- Operations: Add, Search, Display All, Exit
- Search by name (case-insensitive)
- Prevent duplicate names
- Show "Contact book full" when limit reached

**Input Format**:
```
Menu choice (1-4)
Name and phone (for add/search)
```

**Output Format**:
```
=== CONTACT BOOK ===
1. Add Contact
2. Search Contact
3. Display All
4. Exit
====================

[Operation result]
```

**Example**:
```
Input:
1
John Doe
1234567890
1
Jane Smith
9876543210
2
John Doe
3
4

Output:
=== CONTACT BOOK ===
Contact added!

=== CONTACT BOOK ===
Contact added!

=== CONTACT BOOK ===
Found: John Doe - 1234567890

=== CONTACT BOOK ===
=== ALL CONTACTS ===
1. John Doe - 1234567890
2. Jane Smith - 9876543210

=== CONTACT BOOK ===
Goodbye!
```

**Tags**: `Real-World` `Arrays` `Strings` `Search` `Menu-Driven`

**Hints**:
- Hint 1: Use parallel arrays: `string names[10]`, `string phones[10]`
- Hint 2: Track count of contacts with variable
- Hint 3: For search, loop through array and compare names
- Hint 4: Use `==` for string comparison

---


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
Problem: 2.1 Palindrome Check
Mistake Type: Edge Case
What Went Wrong: Didn't handle negative numbers (treated -121 as palindrome)
Lesson Learned: Always check problem constraints; take absolute value or reject negatives
Fixed? ✓
```

**Common Patterns to Watch**:
- If you see 3+ "Edge Case" mistakes → Practice boundary value problems
- If you see 3+ "Time Limit" mistakes → Learn complexity analysis
- If you see 3+ "Syntax" mistakes → Review C++ basics again

---

**Remember**: Struggle is part of learning. Every problem you solve makes you stronger! 💪

**Keep this table updated—it's your personal improvement roadmap!**

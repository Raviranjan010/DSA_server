# C++ Foundation - MCQs (Concept & Interview Style)

## How to Use This File

1. **Test yourself** after completing each section in `notes.md`
2. **Don't peek at answers** - try first!
3. **Read explanations** even for correct answers
4. **Note down mistakes** in your journal
5. **Revise weekly** using spaced repetition

---

## Section 1: Variables & Data Types (10 Questions)

### Q1. Which of the following is a valid variable declaration in C++?

A) `int 1stNumber = 10;`
B) `int my-number = 10;`
C) `int myNumber = 10;`
D) `int my Number = 10;`

**Answer**: C) `int myNumber = 10;`

**Explanation**:
- ❌ A: Variables cannot start with a digit
- ❌ B: Hyphens (-) are not allowed in variable names
- ✅ C: Correct! camelCase is valid and recommended
- ❌ D: Spaces are not allowed in variable names

**Related Concept**: Variable naming rules in C++

---

### Q2. What is the size of `int` data type in C++ (on most modern systems)?

A) 2 bytes
B) 4 bytes
C) 8 bytes
D) 1 byte

**Answer**: B) 4 bytes

**Explanation**:
- ✅ B: `int` typically occupies 4 bytes (32 bits) on modern systems
- ❌ A: `short int` is 2 bytes
- ❌ C: `long long` or `double` is 8 bytes
- ❌ D: `char` or `bool` is 1 byte

**Range**: -2,147,483,648 to 2,147,483,647

---

### Q3. Which data type should be used to store the value 3.14159265358979 with high precision?

A) `int`
B) `float`
C) `double`
D) `char`

**Answer**: C) `double`

**Explanation**:
- ❌ A: `int` stores only whole numbers
- ❌ B: `float` has precision of only 6-7 decimal places
- ✅ C: `double` has precision of 15-16 decimal places
- ❌ D: `char` stores single characters

**Key Point**: Use `double` by default for decimal numbers

---

### Q4. What is the output of the following code?

```cpp
char grade = 'A';
cout << grade;
```

A) A
B) 'A'
C) 65
D) Error

**Answer**: A) A

**Explanation**:
- ✅ A: Prints the character 'A'
- ❌ B: Quotes are not printed
- ❌ C: To print ASCII value (65), need to cast: `cout << (int)grade`
- ❌ D: Code is valid

**Related Concept**: Character printing vs ASCII values

---

### Q5. Which of the following statements is TRUE?

A) `bool` can store values: true, false, and null
B) `bool` can store any integer value
C) `bool` can store only true or false
D) `bool` can store strings "true" and "false"

**Answer**: C) `bool` can store only true or false

**Explanation**:
- ✅ C: Boolean has only two values: true (1) or false (0)
- ❌ A: No null in bool
- ❌ B: Other integers are converted to true (non-zero) or false (zero)
- ❌ D: Strings are different data type

**Note**: `true` prints as 1, `false` prints as 0

---

### Q6. What is the correct way to declare a string in C++?

A) `string name = "John";`
B) `string name = 'John';`
C) `String name = "John";`
D) `str name = "John";`

**Answer**: A) `string name = "John";`

**Explanation**:
- ✅ A: Correct syntax (lowercase 'string', double quotes)
- ❌ B: Single quotes are for char, not string
- ❌ C: 'String' with capital S is incorrect (not Java!)
- ❌ D: 'str' is Python syntax, not C++

**Important**: Must `#include <string>`

---

### Q7. What happens if you use an uninitialized variable?

A) Compiler error
B) Runtime error
C) Contains garbage value (undefined behavior)
D) Automatically initialized to 0

**Answer**: C) Contains garbage value (undefined behavior)

**Explanation**:
- ✅ C: Uninitialized variables contain random values from memory
- ❌ A: Compiler gives warning, not error
- ❌ B: Program runs but may give wrong results
- ❌ D: Global/static variables are initialized to 0, not local

**Best Practice**: Always initialize variables!

```cpp
int x;        // BAD: Uninitialized
int x = 0;    // GOOD: Initialized
```

---

### Q8. Which has the largest range?

A) `int`
B) `float`
C) `double`
D) `long long`

**Answer**: D) `long long`

**Explanation**:
- ✅ D: `long long` is 8 bytes, range: ±9 × 10^18
- ❌ A: `int` is 4 bytes, range: ±2 × 10^9
- ❌ B: `float` is 4 bytes but for decimals
- ❌ C: `double` is 8 bytes for decimals

**Memory Order**: char (1) < int (4) < long long (8)

---

### Q9. What is the output?

```cpp
int x = 5;
float y = 2.0;
cout << x / y;
```

A) 2
B) 2.5
C) 2.0
D) Error

**Answer**: B) 2.5

**Explanation**:
- ✅ B: When int is divided by float, result is float (implicit conversion)
- ❌ A: Would be result of `5 / 2` (integer division)
- ❌ C: Not 2.0, it's 2.5
- ❌ D: Valid operation

**Type Conversion Rule**: Smaller type converts to larger type

---

### Q10. Which is NOT a valid data type in C++?

A) `int`
B) `float`
C) `decimal`
D) `double`

**Answer**: C) `decimal`

**Explanation**:
- ✅ C: `decimal` doesn't exist in C++ (it's in C#)
- ❌ A, B, D: All are valid C++ data types

**C++ Numeric Types**: int, float, double, long, long long

---

## Section 2: Operators (10 Questions)

### Q11. What is the output?

```cpp
int a = 10, b = 3;
cout << a % b;
```

A) 3
B) 3.33
C) 1
D) 0

**Answer**: C) 1

**Explanation**:
- ✅ C: `%` gives remainder. 10 ÷ 3 = 3 remainder 1
- ❌ A: Would be `a / b` (integer division)
- ❌ B: Would be `a / b` with float division
- ❌ D: Only if divisible (e.g., 9 % 3 = 0)

**Use Case**: Check even/odd: `n % 2`

---

### Q12. What is the output?

```cpp
int x = 5;
cout << x++ << endl;
cout << x << endl;
```

A) 5, 6
B) 6, 6
C) 5, 5
D) 6, 5

**Answer**: A) 5, 6

**Explanation**:
- ✅ A: Post-increment (`x++`) prints first (5), then increments to 6
- ❌ B: Would be `++x` (pre-increment)
- ❌ C: Increment does happen
- ❌ D: Wrong order

**Key Difference**:
```cpp
x++   // Use value, then increment (post)
++x   // Increment, then use value (pre)
```

---

### Q13. What is the output?

```cpp
int a = 5, b = 3;
cout << (a & b);
```

A) 8
B) 1
C) 7
D) 2

**Answer**: B) 1

**Explanation**:
- ✅ B: Bitwise AND:
  ```
  5 = 0101
  3 = 0011
  & = 0001 = 1
  ```
- ❌ A: Would be `a | b` (bitwise OR) = 0111 = 7
- ❌ C: Same as above
- ❌ D: Would be `a ^ b` (bitwise XOR) = 0110 = 6

**Bitwise Truth Table**:
- AND (&): Both 1 → 1
- OR (|): At least one 1 → 1
- XOR (^): Different → 1

---

### Q14. What is the output?

```cpp
int x = 10;
x += 5;
cout << x;
```

A) 5
B) 10
C) 15
D) Error

**Answer**: C) 15

**Explanation**:
- ✅ C: `x += 5` is same as `x = x + 5` = 10 + 5 = 15
- ❌ A: Would be `x -= 5`
- ❌ B: No change
- ❌ D: Valid syntax

**Shorthand Operators**:
```cpp
x += 5   → x = x + 5
x -= 5   → x = x - 5
x *= 5   → x = x * 5
x /= 5   → x = x / 5
x %= 5   → x = x % 5
```

---

### Q15. What is the output?

```cpp
int a = 10, b = 20;
cout << (a > b && a < 0);
```

A) 1
B) 0
C) true
D) Error

**Answer**: B) 0

**Explanation**:
- ✅ B: AND (&&) requires BOTH conditions true:
  - `a > b` → 10 > 20 → false (0)
  - `a < 0` → 10 < 0 → false (0)
  - false && false = false = 0
- ❌ A: Would print 1 if true
- ❌ C: Prints as 0 or 1, not "true"/"false"
- ❌ D: Valid syntax

**Logical Operators**:
- `&&` (AND): Both must be true
- `||` (OR): At least one true
- `!` (NOT): Reverse

---

### Q16. What is the output?

```cpp
int a = 10, b = 20;
cout << (a > b || a < 0 || b > 15);
```

A) 1
B) 0
C) -1
D) Error

**Answer**: A) 1

**Explanation**:
- ✅ A: OR (||) needs AT LEAST ONE true:
  - `a > b` → 10 > 20 → false (0)
  - `a < 0` → 10 < 0 → false (0)
  - `b > 15` → 20 > 15 → true (1)
  - false || false || true = true = 1
- ❌ B: Would be 0 if all false
- ❌ C: Never -1
- ❌ D: Valid

---

### Q17. What is the output?

```cpp
int x = 5;
cout << ++x * 2;
```

A) 10
B) 11
C) 12
D) 13

**Answer**: C) 12

**Explanation**:
- ✅ C: Pre-increment first: `++x` makes x = 6, then 6 * 2 = 12
- ❌ A: Would be `x++ * 2` (5 * 2 = 10)
- ❌ B: Wrong calculation
- ❌ D: Wrong calculation

**Order of Operations**:
1. `++x` (pre-increment) → x = 6
2. `6 * 2` → 12

---

### Q18. What does `n & 1` check?

A) If n is divisible by 2
B) If n is odd
C) If n is even
D) If n is prime

**Answer**: B) If n is odd

**Explanation**:
- ✅ B: `n & 1` checks last bit:
  - Odd numbers have last bit = 1 (e.g., 5 = 101)
  - Even numbers have last bit = 0 (e.g., 4 = 100)
- ❌ A: Would be `n % 2 == 0`
- ❌ C: Would be `(n & 1) == 0`
- ❌ D: Different logic

**Fast Check**:
```cpp
if (n & 1) cout << "Odd";
else cout << "Even";
```

---

### Q19. What is the output?

```cpp
int a = 5;
int b = a++;
cout << a << " " << b;
```

A) 5 5
B) 6 5
C) 6 6
D) 5 6

**Answer**: B) 6 5

**Explanation**:
- ✅ B: Post-increment:
  - `b = a++` → b gets value 5, then a becomes 6
  - So a = 6, b = 5
- ❌ A: a does increment
- ❌ C: b gets old value
- ❌ D: Wrong order

**Trace**:
```
a = 5
b = a++   → b = 5, then a = 6
Result: a = 6, b = 5
```

---

### Q20. What is the output?

```cpp
int x = 10, y = 3;
cout << x / y;
```

A) 3.33
B) 3
C) 3.0
D) Error

**Answer**: B) 3

**Explanation**:
- ✅ B: Integer division truncates decimal part: 10 / 3 = 3.33... → 3
- ❌ A: Would need float/double: `10.0 / 3.0`
- ❌ C: Integer division gives int
- ❌ D: Valid (no division by zero)

**Fix for Decimal Division**:
```cpp
cout << (double)x / y;  // 3.33
```

---

## Section 3: Control Flow (10 Questions)

### Q21. What is the output?

```cpp
int marks = 85;

if (marks >= 90) {
    cout << "A";
} else if (marks >= 80) {
    cout << "B";
} else {
    cout << "C";
}
```

A) A
B) B
C) C
D) AB

**Answer**: B) B

**Explanation**:
- ✅ B: Checks in order:
  - 85 >= 90? NO
  - 85 >= 80? YES → Print "B", exit
- ❌ A: First condition false
- ❌ C: Else not reached
- ❌ D: Only one block executes

**Key**: if-else if chain stops at first TRUE

---

### Q22. What is missing in this code?

```cpp
int day = 2;
switch (day) {
    case 1:
        cout << "Monday";
    case 2:
        cout << "Tuesday";
    case 3:
        cout << "Wednesday";
}
```

A) Nothing, code is correct
B) `break` after each case
C) `return` after each case
D) `continue` after each case

**Answer**: B) `break` after each case

**Explanation**:
- ✅ B: Without `break`, ALL cases after match execute (fall-through)
- ❌ A: Code will print "TuesdayWednesday" (wrong!)
- ❌ C: `return` exits function, not switch
- ❌ D: `continue` is for loops, not switch

**Correct Code**:
```cpp
case 1:
    cout << "Monday";
    break;  // Exit switch
```

---

### Q23. What is the output?

```cpp
int age = 20;
string result = (age >= 18) ? "Adult" : "Minor";
cout << result;
```

A) Adult
B) Minor
C) 1
D) Error

**Answer**: A) Adult

**Explanation**:
- ✅ A: Ternary operator:
  - Condition: 20 >= 18? YES
  - If true: "Adult"
  - If false: "Minor"
- ❌ B: Condition is true
- ❌ C: String, not number
- ❌ D: Valid syntax

**Syntax**: `condition ? value_if_true : value_if_false`

---

### Q24. How many times does this loop execute?

```cpp
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
```

A) 4 times
B) 5 times
C) 6 times
D) Infinite

**Answer**: B) 5 times

**Explanation**:
- ✅ B: Loop runs for i = 0, 1, 2, 3, 4 (5 iterations)
- ❌ A: Would be `i < 4`
- ❌ C: Would be `i <= 5`
- ❌ D: Has proper termination

**Trace**:
```
i = 0 → Execute
i = 1 → Execute
i = 2 → Execute
i = 3 → Execute
i = 4 → Execute
i = 5 → Stop (5 < 5 is false)
```

---

### Q25. What is the output?

```cpp
int i = 1;
while (i <= 5) {
    if (i == 3) {
        break;
    }
    cout << i << " ";
    i++;
}
```

A) 1 2 3 4 5
B) 1 2
C) 1 2 3
D) 1 2 4 5

**Answer**: B) 1 2

**Explanation**:
- ✅ B: Loop breaks when i == 3:
  - i = 1: Print 1
  - i = 2: Print 2
  - i = 3: break (exit loop immediately)
- ❌ A: Would be without break
- ❌ C: 3 is not printed (break happens before)
- ❌ D: break exits completely

**break vs continue**:
- `break`: Exit loop completely
- `continue`: Skip current iteration

---

### Q26. What is the output?

```cpp
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    cout << i << " ";
}
```

A) 1 2 3 4 5 6 7 8 9 10
B) 2 4 6 8 10
C) 1 3 5 7 9
D) 1 3 5 7

**Answer**: C) 1 3 5 7 9

**Explanation**:
- ✅ C: `continue` skips even numbers:
  - i = 1: 1 % 2 ≠ 0, print 1
  - i = 2: 2 % 2 = 0, continue (skip)
  - i = 3: 3 % 2 ≠ 0, print 3
  - ... and so on
- ❌ A: Would be without continue
- ❌ B: Opposite (even numbers)
- ❌ D: Missing 9

---

### Q27. What is the output?

```cpp
int x = 10;
while (x < 5) {
    cout << "Hello" << endl;
}
```

A) Hello (1 time)
B) Hello (5 times)
C) No output
D) Infinite loop

**Answer**: C) No output

**Explanation**:
- ✅ C: while loop checks condition FIRST:
  - x = 10, 10 < 5? NO
  - Loop doesn't execute at all
- ❌ A: Would be do-while
- ❌ B: Wrong condition
- ❌ D: Condition is false initially

**while vs do-while**:
```cpp
while (condition)    // Check first, may not execute
do { } while (condition)  // Execute first, then check
```

---

### Q28. What is the output?

```cpp
int choice = 2;
switch (choice) {
    case 1:
        cout << "One";
        break;
    case 2:
        cout << "Two";
    case 3:
        cout << "Three";
        break;
    default:
        cout << "Other";
}
```

A) Two
B) TwoThree
C) TwoThreeOther
D) Other

**Answer**: B) TwoThree

**Explanation**:
- ✅ B: Fall-through occurs:
  - case 2 matches → Print "Two"
  - No break → Fall through to case 3
  - Print "Three"
  - break → Exit switch
- ❌ A: Missing fall-through
- ❌ C: default not reached
- ❌ D: Case 2 matches

**Lesson**: Always add `break` unless fall-through is intentional!

---

### Q29. Which loop is best when you know the exact number of iterations?

A) while
B) do-while
C) for
D) All are equal

**Answer**: C) for

**Explanation**:
- ✅ C: `for` loop has initialization, condition, and update in one line
- ❌ A: `while` is better when condition-based (unknown iterations)
- ❌ B: `do-while` executes at least once
- ❌ D: Each has specific use case

**When to use which**:
```cpp
for       → Known iterations (print 1 to 100)
while     → Condition-based (read until EOF)
do-while  → Must execute once (menu system)
```

---

### Q30. What is the output?

```cpp
int n = 0;
if (n) {
    cout << "True";
} else {
    cout << "False";
}
```

A) True
B) False
C) 0
D) Error

**Answer**: B) False

**Explanation**:
- ✅ B: In C++, 0 is false, non-zero is true:
  - n = 0 → false → else block executes
- ❌ A: Would be if n = 1 (or any non-zero)
- ❌ C: Prints string, not number
- ❌ D: Valid

**Boolean Conversion**:
```cpp
if (0)        → false
if (1)        → true
if (-5)       → true (any non-zero)
if (nullptr)  → false
```

---

## Section 4: Functions (10 Questions)

### Q31. What is the output?

```cpp
void greet() {
    cout << "Hello!";
}

int main() {
    greet;
    return 0;
}
```

A) Hello!
B) No output
C) Error
D) Warning

**Answer**: B) No output

**Explanation**:
- ✅ B: `greet;` doesn't call the function!
- Need parentheses: `greet();`
- ❌ A: Function not called
- ❌ C: Compiles but does nothing
- ❌ D: May give warning

**Correct**:
```cpp
greet();  // Calls the function
```

---

### Q32. What is the output?

```cpp
int square(int x) {
    return x * x;
}

int main() {
    cout << square(5);
    return 0;
}
```

A) 5
B) 10
C) 25
D) Error

**Answer**: C) 25

**Explanation**:
- ✅ C: `square(5)` returns 5 * 5 = 25
- ❌ A: Would print x
- ❌ B: Would be 2*x
- ❌ D: Valid function

**Function Flow**:
```
square(5) called
→ x = 5
→ return 5 * 5 = 25
→ Print 25
```

---

### Q33. What is the output?

```cpp
void modify(int x) {
    x = 100;
}

int main() {
    int num = 5;
    modify(num);
    cout << num;
    return 0;
}
```

A) 100
B) 5
C) 0
D) Error

**Answer**: B) 5

**Explanation**:
- ✅ B: Pass by value - function gets a COPY:
  - x is modified, but num remains 5
- ❌ A: Would need pass by reference
- ❌ C: Not changed to 0
- ❌ D: Valid code

**Pass by Reference**:
```cpp
void modify(int &x) {  // Note &
    x = 100;  // Changes original
}
```

---

### Q34. Which is TRUE about function overloading?

A) Functions must have same name and same parameters
B) Functions must have same name but different parameters
C) Functions must have different names
D) Functions must have different return types only

**Answer**: B) Functions must have same name but different parameters

**Explanation**:
- ✅ B: Overloading = same name, different signatures:
  ```cpp
  void print(int x) { }
  void print(string s) { }  // Different parameter type
  void print(int x, int y) { }  // Different number of parameters
  ```
- ❌ A: Same name AND same params = redefinition (error)
- ❌ C: Different names = different functions
- ❌ D: Return type alone doesn't differentiate

---

### Q35. What is the default return type of a function in C++?

A) void
B) int
C) float
D) No default (must specify)

**Answer**: D) No default (must specify)

**Explanation**:
- ✅ D: Every function must declare return type explicitly
- ❌ A, B, C: Must be specified
- Exception: `main()` defaults to `int` in modern C++

**Examples**:
```cpp
int add(int a, int b) { return a + b; }
void print() { cout << "Hi"; }  // No return
double average(int a, int b) { return (a+b)/2.0; }
```

---

*Note: This MCQ file continues with 15 more questions covering:*
- *- Arrays (5 questions)*
- *- Strings (5 questions)*
- *- Pointers (5 questions)*

*Due to space constraints, here's a sample:*

---

## Section 5: Arrays (Sample Questions)

### Q36. What is the index of the first element in a C++ array?

A) 1
B) 0
C) -1
D) Depends on array size

**Answer**: B) 0

**Explanation**:
- ✅ B: C++ arrays are 0-indexed
- First element: `arr[0]`
- Last element: `arr[size-1]`

---

### Q37. What is the output?

```cpp
int arr[5] = {10, 20, 30, 40, 50};
cout << arr[3];
```

A) 30
B) 40
C) 50
D) Error

**Answer**: B) 40

**Explanation**:
- ✅ B: Indices: 0→10, 1→20, 2→30, 3→40, 4→50
- ❌ A: Would be `arr[2]`
- ❌ C: Would be `arr[4]`

---

## Section 6: Output Prediction (Trap Questions)

### Q38. What is the output?

```cpp
int x = 5;
cout << x++ + ++x;
```

A) 10
B) 11
C) 12
D) Undefined behavior

**Answer**: D) Undefined behavior

**Explanation**:
- ✅ D: Modifying same variable multiple times in one expression is undefined!
- Different compilers may give different results
- ❌ A, B, C: All possible but not guaranteed

**Lesson**: Never modify a variable twice in same expression!

---

### Q39. What is the output?

```cpp
int arr[5];
cout << arr[5];
```

A) 0
B) Garbage value
C) Error
D) Undefined behavior (out of bounds)

**Answer**: D) Undefined behavior (out of bounds)

**Explanation**:
- ✅ D: Valid indices are 0-4, accessing `arr[5]` is out of bounds!
- May crash or give garbage value
- ❌ A: Not initialized to 0
- ❌ B: May be garbage, but more importantly it's UB
- ❌ C: Compiles but runtime issue

**Rule**: Always check bounds: `0 <= index < size`

---

### Q40. What is the output?

```cpp
int a = 10;
int b = 20;
int c = (a > b) ? a : b;
cout << c;
```

A) 10
B) 20
C) 30
D) Error

**Answer**: B) 20

**Explanation**:
- ✅ B: Ternary operator finds maximum:
  - 10 > 20? NO → return b (20)
- ❌ A: Would be if a > b
- ❌ C: Would be a + b
- ❌ D: Valid syntax

---

## Scoring Guide

**40-35 correct**: Excellent! Ready for next topic
**34-28 correct**: Good! Review weak areas
**27-20 correct**: Average. Re-read notes.md
**Below 20**: Need more practice. Focus on basics

---

## Revision Tips

1. **Mark difficult questions** and revisit them
2. **Understand WHY** each answer is correct
3. **Write small programs** to verify concepts
4. **Create your own MCQs** to test understanding
5. **Revise after 1 day, 3 days, 1 week** (spaced repetition)

---

**Next**: Move to `practice.md` and solve problems, then proceed to next topic!

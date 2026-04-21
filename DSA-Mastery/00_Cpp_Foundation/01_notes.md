# C++ Foundation - Complete Guide for Absolute Beginners

## 📚 How to Use This Module

**Learning Path**:
1. **Read** [notes.md](notes.md) ← You are here
2. **Practice** [practice.md](practice.md) - Solve problems level by level
3. **Check Solutions** [solutions.md](solutions.md) - Only after attempting
4. **Test Yourself** [mcqs.md](mcqs.md) - MCQs for self-assessment
5. **Quick Review** [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md) - 5-minute revision
6. **If Stuck** [If_You_Get_Stuck.md](If_You_Get_Stuck.md) - Problem-solving strategy
7. **Avoid Traps** [Common_Interview_Traps.md](Common_Interview_Traps.md) - Interview mistakes

## Table of Contents

1. [Getting Started with C++](#1-getting-started-with-c)
2. [Your First Program](#2-your-first-program)
3. [Variables & Data Types](#3-variables--data-types)
4. [Input & Output](#4-input--output)
5. [Operators](#5-operators)
6. [Control Flow](#6-control-flow)
7. [Loops](#7-loops)
8. [Functions](#8-functions)
9. [Arrays](#9-arrays)
10. [Strings](#10-strings)
11. [Pointers Basics](#11-pointers-basics)
12. [Introduction to STL](#12-introduction-to-stl)
13. [Pattern Recognition Guide](#13-pattern-recognition-guide)
14. [3-Layer Learning Approach](#14-3-layer-learning-approach)

---

## 1. Getting Started with C++

### What is C++? (Explained Simply)

**Think of it like this**: You want to tell a friend how to make tea. You give them step-by-step instructions:
1. Boil water
2. Add tea bag
3. Wait 3 minutes
4. Remove tea bag
5. Add sugar and milk

**C++ is exactly the same** - you give the computer step-by-step instructions to solve a problem.

### Why Learn C++ for DSA?

1. **Fastest Language**: C++ is like a sports car - very fast!
2. **Complete Control**: You manage memory, which helps understand how computers work
3. **STL (Standard Template Library)**: Pre-built tools that save time
4. **Industry Standard**: Used in competitive programming and interviews
5. **Foundation**: If you know C++, learning other languages is easy

### Installing C++ (Step-by-Step)

#### Option 1: Online Compiler (Easiest for Beginners)
- Visit: https://www.onlinegdb.com/online_c++_compiler
- No installation needed!
- Start coding immediately

#### Option 2: Install on Your Computer

**For Windows**:
1. Download MinGW from: https://www.mingw-w64.org/
2. Install it
3. Download VS Code from: https://code.visualstudio.com/
4. Install C/C++ extension in VS Code

**For Mac**:
1. Open Terminal
2. Type: `xcode-select --install`
3. Press Enter and wait
4. Use any text editor (VS Code recommended)

**For Linux**:
```bash
sudo apt update
sudo apt install g++
```

### How to Run a C++ Program

```
Write Code → Save as .cpp → Compile → Run
```

**In Terminal**:
```bash
g++ program.cpp -o program    # Compile
./program                      # Run (Linux/Mac)
program.exe                    # Run (Windows)
```

---

## 2. Your First Program

### The Classic "Hello World"

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

### Let's Understand EVERY Line

**Line 1**: `#include <iostream>`
- This is like bringing a toolbox
- `iostream` = Input Output Stream
- It gives us `cout` (for printing) and `cin` (for taking input)
- Without this, we can't print anything!

**Line 2**: `using namespace std;`
- This is like saying "I'll use standard tools"
- Without this, we'd have to write `std::cout` instead of just `cout`
- It saves typing!

**Line 3**: `int main() {`
- This is where your program STARTS
- Every C++ program must have a `main()` function
- Think of it as the "entrance door" to your program
- `{` means "program starts here"

**Line 4**: `cout << "Hello, World!" << endl;`
- `cout` = "Console Output" (print to screen)
- `<<` = "put this into" (like an arrow pointing to cout)
- `"Hello, World!"` = The text to print (text goes in quotes)
- `endl` = "End Line" (move to next line, like pressing Enter)
- `;` = "Statement ends here" (like a full stop in English)

**Line 5**: `return 0;`
- Means "program ended successfully"
- 0 = success, any other number = error
- It's like saying "I'm done, and everything is fine!"

**Line 6**: `}`
- Means "main function ends here"
- Every `{` must have a matching `}`

### Comments in C++

Comments are notes for humans - the computer ignores them!

```cpp
// This is a single-line comment

/*
   This is a multi-line comment
   You can write multiple lines here
   The computer will ignore all of this
*/

#include <iostream>
using namespace std;

int main() {
    // This prints Hello World
    cout << "Hello!" << endl;
    
    /* This is another comment
       I can explain my code here */
    
    return 0;
}
```

**Why use comments?**
- Explain complex logic
- Remind yourself what code does
- Help others understand your code
- Professional programmers use comments everywhere!

---

## 3. Variables & Data Types

### What is a Variable?

**Real-Life Example**: Imagine you have boxes in your kitchen:
- One box labeled "Sugar" contains sugar
- One box labeled "Rice" contains rice
- One box labeled "Flour" contains flour

**In C++**:
- A variable is like a box
- It has a NAME (like "Sugar")
- It holds a VALUE (like 5 kg)
- It has a TYPE (what kind of thing it holds)

### Basic Data Types

#### 1. `int` (Integer - Whole Numbers)

```cpp
int age = 20;
int marks = 95;
int temperature = -5;  // Can be negative!
```

**Memory**: Takes 4 bytes (like a small box)
**Range**: -2,147,483,648 to 2,147,483,647

**When to use**: Counting things (age, marks, items, people)

#### 2. `float` (Decimal Numbers - Less Precise)

```cpp
float price = 19.99;
float height = 5.7;
float pi = 3.14;
```

**Memory**: Takes 4 bytes
**Precision**: 6-7 decimal places

**When to use**: When you need decimals but not extreme precision

#### 3. `double` (Decimal Numbers - More Precise)

```cpp
double pi = 3.14159265358979;
double distance = 1234567.89012345;
```

**Memory**: Takes 8 bytes (bigger box than float)
**Precision**: 15-16 decimal places

**When to use**: When you need high precision (scientific calculations)

**float vs double - Which to use?**
- Use `double` by default (more accurate)
- Use `float` only if memory is very limited

#### 4. `char` (Single Character)

```cpp
char grade = 'A';
char firstLetter = 'Z';
char symbol = '#';
```

**Memory**: Takes 1 byte (tiny box)
**Important**: Use SINGLE quotes `' '` for char

**When to use**: Storing single characters (grades, initials, symbols)

#### 5. `bool` (Boolean - True or False)

```cpp
bool isPassed = true;
bool isFailed = false;
bool hasRain = true;
```

**Memory**: Takes 1 byte
**Only two values**: `true` (1) or `false` (0)

**When to use**: Yes/No questions, flags, conditions

#### 6. `string` (Text - Multiple Characters)

```cpp
#include <string>

string name = "John Doe";
string city = "New York";
string message = "Hello, how are you?";
```

**Memory**: Varies (depends on text length)
**Important**: Use DOUBLE quotes `" "` for strings

**When to use**: Names, sentences, any text

### Memory Visualization

```
Variable:  int age = 25;

Memory:
┌─────────────────┐
│   age = 25      │  4 bytes
│   Address: 1001 │
└─────────────────┘

Variable:  char grade = 'A';

Memory:
┌─────────┐
│ 'A'     │  1 byte
│ Addr:20 │
└─────────┘
```

### Complete Example

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Integer
    int age = 20;
    
    // Double
    double gpa = 9.5;
    
    // Character
    char grade = 'A';
    
    // Boolean
    bool isStudent = true;
    
    // String
    string name = "Rahul";
    
    // Printing all variables
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "GPA: " << gpa << endl;
    cout << "Grade: " << grade << endl;
    cout << "Is Student: " << isStudent << endl;
    
    return 0;
}
```

**Output**:
```
Name: Rahul
Age: 20
GPA: 9.5
Grade: A
Is Student: 1
```

**Note**: `true` prints as `1` and `false` prints as `0`

### Common Mistakes

```cpp
// WRONG ❌
int age = "20";           // Can't put number in quotes
char letter = "A";        // Char needs single quotes
string name = 'John';     // String needs double quotes
float price = 19.99f;     // Need 'f' suffix for float literal

// CORRECT ✅
int age = 20;             // No quotes for numbers
char letter = 'A';        // Single quotes for char
string name = "John";     // Double quotes for string
float price = 19.99;      // Auto-converts to float
```

### Variable Naming Rules

**DO**:
```cpp
int studentAge = 20;      // Good: descriptive
double averageMarks = 85.5;
bool isPassed = true;
```

**DON'T**:
```cpp
int 1stNumber = 10;       // Can't start with number
int my-age = 20;          // Can't use hyphen (-)
int int = 10;             // Can't use keywords
int student age = 20;     // No spaces allowed
```

**Best Practices**:
- Use meaningful names (`age` not `a`)
- Use camelCase (`studentAge`, `totalMarks`)
- Be consistent throughout your code

---

## 4. Input & Output

### Output (Printing to Screen)

We already saw `cout` (Console Output):

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    cout << "World" << endl;
    
    // Multiple items in one line
    cout << "Name: " << "John" << ", Age: " << 20 << endl;
    
    return 0;
}
```

**Output**:
```
Hello
World
Name: John, Age: 20
```

### Input (Taking from Keyboard)

Use `cin` (Console Input):

```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    
    cout << "Enter your age: ";
    cin >> age;  // >> means "take input and store in age"
    
    cout << "Your age is: " << age << endl;
    
    return 0;
}
```

**How it works**:
```
User types: 20
            ↓
cin >> age  ← Stores 20 in variable 'age'
```

### Taking Multiple Inputs

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    
    cout << "Enter two numbers: ";
    cin >> a >> b;  // Takes two inputs
    
    cout << "Sum: " << a + b << endl;
    
    return 0;
}
```

**Input/Output**:
```
Enter two numbers: 5 10
Sum: 15
```

### Complete Example: Student Information

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    double gpa;
    
    // Taking input
    cout << "Enter name: ";
    cin >> name;
    
    cout << "Enter age: ";
    cin >> age;
    
    cout << "Enter GPA: ";
    cin >> gpa;
    
    // Printing output
    cout << "\n--- Student Details ---" << endl;
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "GPA: " << gpa << endl;
    
    return 0;
}
```

**Input/Output**:
```
Enter name: Rahul
Enter age: 20
Enter GPA: 9.5

--- Student Details ---
Name: Rahul
Age: 20
GPA: 9.5
```

### Fast I/O (For Competitive Programming)

When solving problems with large input (10^5 or more), use fast I/O:

```cpp
#include <iostream>
using namespace std;

int main() {
    // Fast I/O - Add these TWO lines at start
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    int n;
    cin >> n;
    
    return 0;
}
```

**Why?**
- Makes input/output 10x faster
- Prevents "Time Limit Exceeded" errors
- Use in ALL competitive programming problems

### Formatting Output

```cpp
#include <iostream>
#include <iomanip>  // For formatting
using namespace std;

int main() {
    double pi = 3.14159265;
    
    // Fixed decimal places
    cout << fixed << setprecision(2) << pi << endl;  // 3.14
    cout << fixed << setprecision(4) << pi << endl;  // 3.1416
    
    return 0;
}
```

---

## 5. Operators

### What are Operators?

Operators are symbols that perform operations on variables and values.

### 1. Arithmetic Operators

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    
    cout << "Addition: " << a + b << endl;       // 13
    cout << "Subtraction: " << a - b << endl;    // 7
    cout << "Multiplication: " << a * b << endl; // 30
    cout << "Division: " << a / b << endl;       // 3 (integer division!)
    cout << "Modulus: " << a % b << endl;        // 1 (remainder)
    
    return 0;
}
```

**Important Note on Division**:
```cpp
int a = 10, b = 3;
cout << a / b << endl;      // Output: 3 (NOT 3.333!)

// For decimal division, use double:
double x = 10.0, y = 3.0;
cout << x / y << endl;      // Output: 3.33333
```

**Modulus (%) - The Remainder Operator**:
```cpp
// Very useful for:
// 1. Check if number is even/odd
if (n % 2 == 0) cout << "Even";
else cout << "Odd";

// 2. Extract last digit
int lastDigit = n % 10;

// 3. Check divisibility
if (n % 5 == 0) cout << "Divisible by 5";
```

### 2. Relational Operators (Comparison)

These compare two values and return `true` or `false`:

```cpp
int a = 10, b = 20;

cout << (a == b) << endl;  // 0 (false) - Equal to
cout << (a != b) << endl;  // 1 (true)  - Not equal to
cout << (a > b) << endl;   // 0 (false) - Greater than
cout << (a < b) << endl;   // 1 (true)  - Less than
cout << (a >= b) << endl;  // 0 (false) - Greater than or equal
cout << (a <= b) << endl;  // 1 (true)  - Less than or equal
```

### 3. Logical Operators

Combine multiple conditions:

```cpp
int age = 25;
bool hasID = true;

// AND (&&) - Both must be true
if (age >= 18 && hasID) {
    cout << "Can enter" << endl;
}

// OR (||) - At least one must be true
if (age < 18 || age > 60) {
    cout << "Discount applicable" << endl;
}

// NOT (!) - Reverse the condition
if (!hasID) {
    cout << "ID required" << endl;
}
```

**Truth Tables**:

**AND (&&)**:
| A | B | A && B |
|---|---|--------|
| T | T | T      |
| T | F | F      |
| F | T | F      |
| F | F | F      |

**OR (||)**:
| A | B | A \|\| B |
|---|---|--------|
| T | T | T      |
| T | F | T      |
| F | T | T      |
| F | F | F      |

### 4. Assignment Operators

```cpp
int x = 10;

x += 5;   // Same as: x = x + 5;     → x = 15
x -= 3;   // Same as: x = x - 3;     → x = 12
x *= 2;   // Same as: x = x * 2;     → x = 24
x /= 4;   // Same as: x = x / 4;     → x = 6
x %= 4;   // Same as: x = x % 4;     → x = 2
```

### 5. Increment/Decrement Operators

```cpp
int a = 5;

a++;   // Increment by 1 → a = 6
a--;   // Decrement by 1 → a = 5

// Pre vs Post (Important!)
int x = 5;
int y = ++x;  // Pre-increment: x becomes 6, then y = 6
int z = x++;  // Post-increment: z = 6, then x becomes 7
```

**Difference**:
```cpp
int a = 5;
cout << a++ << endl;  // Prints 5, then a becomes 6
cout << ++a << endl;  // a becomes 7, then prints 7
```

### 6. Bitwise Operators (Advanced)

Work on binary (bits) level:

```cpp
int a = 5;   // Binary: 0101
int b = 3;   // Binary: 0011

cout << (a & b) << endl;   // AND:  0001 → 1
cout << (a | b) << endl;   // OR:   0111 → 7
cout << (a ^ b) << endl;   // XOR:  0110 → 6
cout << (a << 1) << endl;  // Left shift:  1010 → 10
cout << (a >> 1) << endl;  // Right shift: 0010 → 2
```

**Useful Tricks**:
```cpp
// Check if odd/even
if (n & 1) cout << "Odd";      // Last bit is 1
else cout << "Even";           // Last bit is 0

// Multiply by 2
n << 1;  // Same as n * 2

// Divide by 2
n >> 1;  // Same as n / 2
```

---

## 6. Control Flow

### Making Decisions in Code

Real life example: "If it's raining, take an umbrella. Otherwise, wear sunglasses."

### 1. if Statement

```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Enter age: ";
    cin >> age;
    
    if (age >= 18) {
        cout << "You are an adult" << endl;
    }
    
    return 0;
}
```

**Flow**:
```
Input: age
   ↓
Is age >= 18?
   ↓
YES → Print "You are an adult"
NO  → Do nothing
```

### 2. if-else Statement

```cpp
int marks;
cin >> marks;

if (marks >= 40) {
    cout << "Passed!" << endl;
} else {
    cout << "Failed!" << endl;
}
```

**Flow**:
```
Input: marks
   ↓
Is marks >= 40?
   ↓
YES → Print "Passed!"
NO  → Print "Failed!"
```

### 3. if-else if-else (Multiple Conditions)

```cpp
int marks;
cin >> marks;

if (marks >= 90) {
    cout << "Grade: A" << endl;
} else if (marks >= 80) {
    cout << "Grade: B" << endl;
} else if (marks >= 70) {
    cout << "Grade: C" << endl;
} else if (marks >= 60) {
    cout << "Grade: D" << endl;
} else {
    cout << "Grade: F" << endl;
}
```

**Flow Diagram**:
```
marks >= 90?
   ↓
YES → Grade A
NO  ↓
    marks >= 80?
       ↓
    YES → Grade B
    NO  ↓
        marks >= 70?
           ↓
        YES → Grade C
        NO  ↓
            ... and so on
```

### 4. Nested if (if inside if)

```cpp
int age;
bool hasTicket;

cin >> age >> hasTicket;

if (age >= 18) {
    if (hasTicket) {
        cout << "Entry allowed" << endl;
    } else {
        cout << "Buy a ticket first" << endl;
    }
} else {
    cout << "Must be 18 or older" << endl;
}
```

### 5. switch Statement

Use when checking ONE variable against MANY values:

```cpp
int day;
cout << "Enter day number (1-7): ";
cin >> day;

switch (day) {
    case 1:
        cout << "Monday" << endl;
        break;
    case 2:
        cout << "Tuesday" << endl;
        break;
    case 3:
        cout << "Wednesday" << endl;
        break;
    case 4:
        cout << "Thursday" << endl;
        break;
    case 5:
        cout << "Friday" << endl;
        break;
    case 6:
        cout << "Saturday" << endl;
        break;
    case 7:
        cout << "Sunday" << endl;
        break;
    default:
        cout << "Invalid day!" << endl;
}
```

**Important**: Don't forget `break`! Without it, all cases after the match will execute.

### 6. Ternary Operator (Shorthand if-else)

```cpp
// Regular if-else
int age;
cin >> age;

if (age >= 18) {
    cout << "Adult" << endl;
} else {
    cout << "Minor" << endl;
}

// Ternary (same thing in one line!)
string result = (age >= 18) ? "Adult" : "Minor";
cout << result << endl;
```

**Syntax**: `condition ? value_if_true : value_if_false`

### Complete Example: Simple Calculator

```cpp
#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char operation;
    
    cout << "Enter first number: ";
    cin >> num1;
    
    cout << "Enter operation (+, -, *, /): ";
    cin >> operation;
    
    cout << "Enter second number: ";
    cin >> num2;
    
    double result;
    
    if (operation == '+') {
        result = num1 + num2;
    } else if (operation == '-') {
        result = num1 - num2;
    } else if (operation == '*') {
        result = num1 * num2;
    } else if (operation == '/') {
        if (num2 != 0) {
            result = num1 / num2;
        } else {
            cout << "Error: Division by zero!" << endl;
            return 1;
        }
    } else {
        cout << "Error: Invalid operation!" << endl;
        return 1;
    }
    
    cout << "Result: " << result << endl;
    
    return 0;
}
```

**Input/Output**:
```
Enter first number: 10
Enter operation (+, -, *, /): *
Enter second number: 5
Result: 50
```

---

## 7. Loops

### What are Loops?

**Real-life example**: "Do 10 pushups" - you repeat the same action 10 times.

**In programming**: When you need to repeat something, use a loop!

### 1. for Loop

Use when you know HOW MANY times to repeat:

```cpp
#include <iostream>
using namespace std;

int main() {
    // Print numbers 1 to 5
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    
    return 0;
}
```

**Output**: `1 2 3 4 5`

**How it works**:
```
for (int i = 1; i <= 5; i++)
      ↑          ↑        ↑
    START     CONDITION  UPDATE
    
Step 1: i = 1 (START)
Step 2: Check i <= 5? YES → Execute loop body
Step 3: Print 1
Step 4: i++ (i becomes 2)
Step 5: Check i <= 5? YES → Execute loop body
Step 6: Print 2
... continues until i = 6
Step 7: Check i <= 5? NO → Exit loop
```

**Visual Flow**:
```
i = 1
  ↓
i <= 5? ──NO──→ Exit
  ↓ YES
Print i
  ↓
i++
  ↓
(back to check)
```

### 2. while Loop

Use when you DON'T know how many times (loop until condition becomes false):

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 1;
    
    while (i <= 5) {
        cout << i << " ";
        i++;
    }
    
    return 0;
}
```

**Output**: `1 2 3 4 5` (same as for loop)

### 3. do-while Loop

Executes AT LEAST ONCE, then checks condition:

```cpp
int choice;

do {
    cout << "Menu:" << endl;
    cout << "1. Play Game" << endl;
    cout << "2. Settings" << endl;
    cout << "3. Exit" << endl;
    cout << "Enter choice: ";
    cin >> choice;
    
} while (choice != 3);  // Repeat until user chooses 3
```

**Key Difference**:
```cpp
// while - checks FIRST, might not execute
int x = 10;
while (x < 5) {
    cout << "This won't print" << endl;
}

// do-while - executes FIRST, then checks
int y = 10;
do {
    cout << "This prints once!" << endl;
} while (y < 5);
```

### Nested Loops (Loop inside Loop)

```cpp
// Print a pattern
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        cout << i << j << " ";
    }
    cout << endl;
}
```

**Output**:
```
11 12 13 
21 22 23 
31 32 33 
```

**How it works**:
```
i = 1
  ↓
  j = 1 → Print 11
  j = 2 → Print 12
  j = 3 → Print 13
  j = 4 → Exit inner loop
  ↓
i = 2
  ↓
  j = 1 → Print 21
  j = 2 → Print 22
  ... and so on
```

### Loop Control Statements

#### break - Exit the loop immediately

```cpp
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // Exit loop when i is 5
    }
    cout << i << " ";
}
```

**Output**: `1 2 3 4` (stops at 5)

#### continue - Skip current iteration

```cpp
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    cout << i << " ";
}
```

**Output**: `1 3 5 7 9` (only odd numbers)

### Common Loop Patterns

#### Pattern 1: Sum of numbers

```cpp
int n, sum = 0;
cin >> n;

for (int i = 1; i <= n; i++) {
    sum += i;
}

cout << "Sum: " << sum << endl;
```

#### Pattern 2: Factorial

```cpp
int n, factorial = 1;
cin >> n;

for (int i = 1; i <= n; i++) {
    factorial *= i;
}

cout << "Factorial: " << factorial << endl;
```

#### Pattern 3: Find maximum

```cpp
int n;
cin >> n;

int maxVal = -1;
for (int i = 0; i < n; i++) {
    int num;
    cin >> num;
    if (num > maxVal) {
        maxVal = num;
    }
}

cout << "Maximum: " << maxVal << endl;
```

---

## 8. Functions

### What is a Function?

**Real-life example**: A juicer machine
- INPUT: Fruits
- PROCESS: Squeeze and extract juice
- OUTPUT: Juice

**In C++**:
- INPUT: Parameters (optional)
- PROCESS: Code inside function
- OUTPUT: Return value (optional)

### Why Use Functions?

1. **Reusability**: Write once, use many times
2. **Organization**: Break complex problems into smaller parts
3. **Readability**: Code becomes easier to understand
4. **Debugging**: Easier to find errors

### Function Syntax

```cpp
return_type function_name(parameters) {
    // Code here
    return value;
}
```

### Example 1: Simple Function

```cpp
#include <iostream>
using namespace std;

// Function definition
int add(int a, int b) {
    int sum = a + b;
    return sum;
}

int main() {
    // Function call
    int result = add(5, 3);
    cout << "Sum: " << result << endl;  // Output: 8
    
    return 0;
}
```

**Step-by-Step**:
```
1. main() calls add(5, 3)
2. a = 5, b = 3
3. sum = 5 + 3 = 8
4. return 8
5. result = 8
6. Print 8
```

### Example 2: Void Function (No Return)

```cpp
void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
    // No return statement needed
}

int main() {
    greet("Rahul");   // Output: Hello, Rahul!
    greet("Priya");   // Output: Hello, Priya!
    
    return 0;
}
```

### Example 3: Multiple Parameters

```cpp
double calculateAverage(double marks1, double marks2, double marks3) {
    return (marks1 + marks2 + marks3) / 3.0;
}

int main() {
    double avg = calculateAverage(85.5, 90.0, 78.5);
    cout << "Average: " << avg << endl;  // Output: 84.6667
    
    return 0;
}
```

### Function Declaration vs Definition

```cpp
// Declaration (Prototype) - Tells compiler function exists
int multiply(int a, int b);

int main() {
    int result = multiply(5, 3);  // Can use function before definition
    return 0;
}

// Definition (Implementation) - Actual code
int multiply(int a, int b) {
    return a * b;
}
```

### Pass by Value vs Pass by Reference

#### Pass by Value (Default)

```cpp
void increment(int x) {
    x++;  // This changes LOCAL copy only
}

int main() {
    int num = 5;
    increment(num);
    cout << num << endl;  // Output: 5 (unchanged!)
    
    return 0;
}
```

**Why?** A COPY of `num` is passed, not the original.

#### Pass by Reference (Changes Original)

```cpp
void increment(int &x) {  // Note the &
    x++;  // This changes ORIGINAL variable
}

int main() {
    int num = 5;
    increment(num);
    cout << num << endl;  // Output: 6 (changed!)
    
    return 0;
}
```

**When to use which?**
- **Pass by value**: When you don't want to change original
- **Pass by reference**: When you want to modify original OR for large objects (faster)

### Complete Example: Calculator with Functions

```cpp
#include <iostream>
using namespace std;

// Function declarations
double add(double a, double b) {
    return a + b;
}

double subtract(double a, double b) {
    return a - b;
}

double multiply(double a, double b) {
    return a * b;
}

double divide(double a, double b) {
    if (b != 0) {
        return a / b;
    } else {
        cout << "Error: Division by zero!" << endl;
        return 0;
    }
}

int main() {
    double num1, num2;
    char operation;
    
    cout << "Enter first number: ";
    cin >> num1;
    
    cout << "Enter operation (+, -, *, /): ";
    cin >> operation;
    
    cout << "Enter second number: ";
    cin >> num2;
    
    double result;
    
    if (operation == '+') {
        result = add(num1, num2);
    } else if (operation == '-') {
        result = subtract(num1, num2);
    } else if (operation == '*') {
        result = multiply(num1, num2);
    } else if (operation == '/') {
        result = divide(num1, num2);
    } else {
        cout << "Invalid operation!" << endl;
        return 1;
    }
    
    cout << "Result: " << result << endl;
    
    return 0;
}
```

---

## 9. Arrays

### What is an Array?

**Real-life example**: An egg tray with 12 compartments
- All compartments are SAME SIZE
- Each has a POSITION (1st, 2nd, 3rd...)
- All hold EGGS (same type)

**In C++**: An array stores multiple values of the SAME TYPE in CONTIGUOUS memory.

### Array Declaration

```cpp
// Syntax: type arrayName[size];

int marks[5];  // Array of 5 integers
```

**Memory Visualization**:
```
marks[0]  marks[1]  marks[2]  marks[3]  marks[4]
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  ?   │ │  ?   │ │  ?   │ │  ?   │ │  ?   │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
Address: 100     104     108     112     116
```

**Important**: Array indices start from 0, not 1!

### Array Initialization

```cpp
// Method 1: Initialize at declaration
int marks[5] = {85, 90, 78, 92, 88};

// Method 2: Let compiler decide size
int marks[] = {85, 90, 78, 92, 88};  // Size = 5

// Method 3: Partial initialization
int marks[5] = {85, 90};  // Rest become 0: {85, 90, 0, 0, 0}

// Method 4: Initialize all to 0
int marks[5] = {0};  // {0, 0, 0, 0, 0}
```

### Accessing Array Elements

```cpp
#include <iostream>
using namespace std;

int main() {
    int marks[5] = {85, 90, 78, 92, 88};
    
    cout << marks[0] << endl;  // 85 (first element)
    cout << marks[1] << endl;  // 90
    cout << marks[4] << endl;  // 88 (last element)
    
    // Update value
    marks[2] = 95;
    cout << marks[2] << endl;  // 95 (updated)
    
    return 0;
}
```

### Array Traversal (Using Loops)

```cpp
#include <iostream>
using namespace std;

int main() {
    int marks[5] = {85, 90, 78, 92, 88};
    
    // Print all elements
    for (int i = 0; i < 5; i++) {
        cout << "marks[" << i << "] = " << marks[i] << endl;
    }
    
    return 0;
}
```

**Output**:
```
marks[0] = 85
marks[1] = 90
marks[2] = 78
marks[3] = 92
marks[4] = 88
```

### Common Array Operations

#### 1. Input from User

```cpp
int marks[5];

for (int i = 0; i < 5; i++) {
    cout << "Enter marks for student " << (i+1) << ": ";
    cin >> marks[i];
}
```

#### 2. Find Sum and Average

```cpp
int marks[5] = {85, 90, 78, 92, 88};
int sum = 0;

for (int i = 0; i < 5; i++) {
    sum += marks[i];
}

double average = (double)sum / 5;
cout << "Sum: " << sum << endl;          // 433
cout << "Average: " << average << endl;  // 86.6
```

#### 3. Find Maximum

```cpp
int marks[5] = {85, 90, 78, 92, 88};
int maxMarks = marks[0];  // Assume first is maximum

for (int i = 1; i < 5; i++) {
    if (marks[i] > maxMarks) {
        maxMarks = marks[i];
    }
}

cout << "Maximum: " << maxMarks << endl;  // 92
```

#### 4. Search for Element

```cpp
int marks[5] = {85, 90, 78, 92, 88};
int searchValue;
bool found = false;

cout << "Enter value to search: ";
cin >> searchValue;

for (int i = 0; i < 5; i++) {
    if (marks[i] == searchValue) {
        cout << "Found at index " << i << endl;
        found = true;
        break;
    }
}

if (!found) {
    cout << "Not found!" << endl;
}
```

### Multi-Dimensional Arrays (2D Arrays)

```cpp
// 2D Array = Array of arrays (like a matrix)
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access: matrix[row][column]
cout << matrix[0][0] << endl;  // 1
cout << matrix[1][2] << endl;  // 6
cout << matrix[2][1] << endl;  // 8

// Traverse 2D array
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}
```

**Output**:
```
1 2 3 
4 5 6 
7 8 9 
```

---

## 10. Strings

### What is a String?

A string is a sequence of characters (text).

### C-Style Strings (Old Way)

```cpp
char name[] = "Hello";  // Array of characters

// Memory: 'H' 'e' 'l' 'l' 'o' '\0'
// '\0' is null terminator (marks end of string)
```

### std::string (Modern Way - Use This!)

```cpp
#include <iostream>
#include <string>  // Important!
using namespace std;

int main() {
    string name = "John Doe";
    string city = "New York";
    
    cout << name << endl;
    cout << city << endl;
    
    return 0;
}
```

### String Operations

#### 1. Concatenation (Joining)

```cpp
string firstName = "John";
string lastName = "Doe";

string fullName = firstName + " " + lastName;
cout << fullName << endl;  // "John Doe"
```

#### 2. Length

```cpp
string name = "Hello";
cout << name.length() << endl;  // 5
cout << name.size() << endl;    // 5 (same as length)
```

#### 3. Access Characters

```cpp
string name = "Hello";

cout << name[0] << endl;  // 'H'
cout << name[1] << endl;  // 'e'
cout << name[4] << endl;  // 'o'

// Change character
name[0] = 'Y';
cout << name << endl;  // "Yello"
```

#### 4. Input

```cpp
string name;

// Method 1: Reads ONE word (stops at space)
cin >> name;

// Method 2: Reads entire line (including spaces)
getline(cin, name);
```

**Example**:
```cpp
string fullName;

cout << "Enter full name: ";
getline(cin, fullName);

cout << "You entered: " << fullName << endl;
```

#### 5. Compare Strings

```cpp
string s1 = "apple";
string s2 = "banana";

if (s1 == s2) {
    cout << "Equal" << endl;
} else {
    cout << "Not equal" << endl;
}

// Compare alphabetically
if (s1 < s2) {
    cout << s1 << " comes before " << s2 << endl;
}
```

### Useful String Functions

```cpp
#include <iostream>
#include <string>
#include <algorithm>  // For reverse
using namespace std;

int main() {
    string s = "Hello World";
    
    // Substring
    cout << s.substr(0, 5) << endl;  // "Hello"
    cout << s.substr(6) << endl;     // "World"
    
    // Find
    int pos = s.find("World");
    cout << "Found at: " << pos << endl;  // 6
    
    // Insert
    s.insert(5, ",");
    cout << s << endl;  // "Hello, World"
    
    // Erase
    s.erase(5, 1);  // Remove 1 character at position 5
    cout << s << endl;  // "Hello World"
    
    // Reverse
    reverse(s.begin(), s.end());
    cout << s << endl;  // "dlroW olleH"
    
    return 0;
}
```

---

## 11. Pointers Basics

### What is a Pointer?

**Real-life example**: 
- Your house has an ADDRESS: "123 Main Street"
- Someone can FIND your house using this address

**In C++**:
- Every variable has an ADDRESS in memory
- A pointer STORES this address
- Using the address, we can ACCESS the variable

### Memory Addresses

```cpp
int age = 25;

// & operator gives the address
cout << "Value: " << age << endl;          // 25
cout << "Address: " << &age << endl;       // 0x7ffd... (some address)
```

### Pointer Declaration

```cpp
int age = 25;
int* ptr = &age;  // ptr stores address of age

// Read as: "int pointer ptr equals address of age"
```

**Visualization**:
```
Variable:  age = 25
Address:   1001

Pointer:   ptr = 1001 (stores address)
           *ptr = 25 (value at address)
```

### Using Pointers

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 25;
    int* ptr = &age;
    
    cout << "Value of age: " << age << endl;        // 25
    cout << "Address of age: " << &age << endl;     // 0x7ffd...
    cout << "Value of ptr: " << ptr << endl;        // 0x7ffd... (same address)
    cout << "Value at ptr: " << *ptr << endl;       // 25 (dereferencing)
    
    // Change value using pointer
    *ptr = 30;
    cout << "New age: " << age << endl;  // 30 (changed!)
    
    return 0;
}
```

### Pointer Arithmetic

```cpp
int arr[5] = {10, 20, 30, 40, 50};
int* ptr = arr;  // Points to arr[0]

cout << *ptr << endl;      // 10 (arr[0])
cout << *(ptr + 1) << endl; // 20 (arr[1])
cout << *(ptr + 2) << endl; // 30 (arr[2])

ptr++;  // Move to next element
cout << *ptr << endl;      // 20 (now points to arr[1])
```

### Pointers and Functions

```cpp
// Swap using pointers (pass by reference)
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    
    cout << "Before: x=" << x << ", y=" << y << endl;
    
    swap(&x, &y);  // Pass addresses
    
    cout << "After: x=" << x << ", y=" << y << endl;
    // Output: x=10, y=5
    
    return 0;
}
```

---

## 12. Introduction to STL

### What is STL?

**STL (Standard Template Library)** = Pre-built data structures and algorithms in C++

**Why use STL?**
- Saves time (don't reinvent the wheel)
- Tested and optimized
- Industry standard
- Essential for competitive programming

### 1. vector (Dynamic Array)

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Declaration
    vector<int> nums;
    
    // Add elements
    nums.push_back(10);
    nums.push_back(20);
    nums.push_back(30);
    
    // Access
    cout << nums[0] << endl;  // 10
    
    // Size
    cout << nums.size() << endl;  // 3
    
    // Traverse
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    
    // Remove last element
    nums.pop_back();
    
    return 0;
}
```

### 2. pair

```cpp
#include <iostream>
using namespace std;

int main() {
    pair<int, string> student;
    
    student.first = 1;
    student.second = "John";
    
    cout << "ID: " << student.first << endl;
    cout << "Name: " << student.second << endl;
    
    // Or initialize directly
    pair<int, string> p = {2, "Jane"};
    
    return 0;
}
```

### 3. map (Key-Value Pairs)

```cpp
#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> marks;
    
    // Insert
    marks["John"] = 85;
    marks["Jane"] = 90;
    marks["Bob"] = 78;
    
    // Access
    cout << marks["John"] << endl;  // 85
    
    // Traverse
    for (auto it : marks) {
        cout << it.first << ": " << it.second << endl;
    }
    
    // Check if key exists
    if (marks.count("John")) {
        cout << "John exists" << endl;
    }
    
    return 0;
}
```

### 4. Other Important STL Containers

```cpp
#include <stack>
#include <queue>
#include <set>
#include <algorithm>

// Stack (LIFO)
stack<int> st;
st.push(10);
st.push(20);
cout << st.top() << endl;  // 20
st.pop();

// Queue (FIFO)
queue<int> q;
q.push(10);
q.push(20);
cout << q.front() << endl;  // 10
q.pop();

// Set (Unique elements, sorted)
set<int> s;
s.insert(30);
s.insert(10);
s.insert(20);
// Set: {10, 20, 30}

// Sort
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v: {1, 2, 5, 8, 9}

// Reverse
reverse(v.begin(), v.end());
// v: {9, 8, 5, 2, 1}
```

---

## Summary

### What We Covered

✅ C++ basics and setup
✅ Variables and data types
✅ Input/Output operations
✅ Operators (arithmetic, logical, relational)
✅ Control flow (if-else, switch)
✅ Loops (for, while, do-while)
✅ Functions
✅ Arrays
✅ Strings
✅ Pointers basics
✅ STL introduction

### Next Steps

1. Practice all examples in this file
2. Complete practice problems in `practice.md`
3. Test yourself with MCQs in `mcqs.md`
4. Move to next topic: Fundamentals

### Quick Reference

```cpp
// Basic Template
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    
    return 0;
}
```

---

## 13. Pattern Recognition Guide

### When to Use Which Concept

This section helps you identify WHICH concept to use when you see a problem.

#### Problem Type → Solution Pattern

| If You See... | Think... | Example Problems |
|---------------|----------|------------------|
| "Sum of array" | Loop through array | Array sum, average |
| "Find maximum/minimum" | Initialize with first element, compare | Max in array, min element |
| "Search for element" | Linear search (loop) | Find if exists, find index |
| "Reverse" | Two pointers or loop from end | Reverse array, reverse string |
| "Count occurrences" | Counter variable + loop | Count zeros, count vowels |
| "Check condition for all" | Loop + boolean flag | All positive, all same |
| "Find pairs" | Nested loops or hashing | Two sum, pairs with sum X |
| "Sort" | Use `sort()` or implement | Sort array, sort strings |
| "Check if palindrome" | Compare with reverse | Palindrome number, palindrome string |
| "Extract digits" | `% 10` and `/ 10` | Count digits, sum of digits |
| "Check prime" | Loop from 2 to √n | Prime check, prime factors |
| "Factorial" | Multiply 1 to n | Factorial, permutations |
| "Fibonacci" | Each term = sum of previous two | Fibonacci series, climbing stairs |
| "Swap values" | `swap(a, b)` or temp variable | Reverse array, sorting |
| "Frequency count" | Array or map | Most frequent, duplicates |

### Keyword Triggers in Questions

#### Arrays:
```
Keywords: "array", "list", "sequence", "contiguous"
Concepts: Traversal, searching, sorting, two pointers
```

#### Strings:
```
Keywords: "string", "text", "word", "character", "substring"
Concepts: Traversal, pattern matching, palindrome, anagram
```

#### Math/Number Theory:
```
Keywords: "divisible", "prime", "factorial", "GCD", "LCM"
Concepts: Modulo arithmetic, prime checking, Euclidean algorithm
```

#### Loops:
```
Keywords: "for each", "all", "every", "repeat"
Concepts: for loop, while loop, nested loops
```

### Decision Flowchart

```
Problem given
    ↓
Is it about numbers?
    ↓ YES
Math operations needed?
    ↓ YES → Use loops + math operators
    ↓ NO
Search/sort needed?
    ↓ YES → Use search/sort algorithms
    
Is it about text?
    ↓ YES → Use string operations
    
Is it about finding something?
    ↓ YES → Use search patterns
    
Is it about counting?
    ↓ YES → Use counter + loop
```

---

## 14. 3-Layer Learning Approach

### How This Course is Structured

Every concept is taught in 3 layers:

#### Layer 1: Beginner Layer (What & How)
- **Goal**: Understand the basics
- **Focus**: Syntax, simple examples
- **Question**: "What is this? How do I use it?"
- **Example**: 
  ```cpp
  // Beginner: Learn syntax
  int x = 5;  // Declare and initialize
  cout << x;  // Print it
  ```

#### Layer 2: Intermediate Layer (Why & When)
- **Goal**: Understand when and why to use
- **Focus**: Use cases, comparisons, trade-offs
- **Question**: "When should I use this? Why this way?"
- **Example**:
  ```cpp
  // Intermediate: Understand trade-offs
  int x = 5;        // Fast, fixed size
  long long y = 5;  // Slower, but handles larger numbers
  // Use int for normal cases, long long for large numbers
  ```

#### Layer 3: Advanced Layer (Edge Cases & Tricks)
- **Goal**: Master the concept
- **Focus**: Edge cases, optimizations, interview traps
- **Question**: "What can go wrong? How to optimize?"
- **Example**:
  ```cpp
  // Advanced: Edge cases and tricks
  int x;  // DANGER: Uninitialized (garbage value)
  int y = 0;  // SAFE: Always initialize
  
  // Trick: Fast even/odd check
  if (x & 1) cout << "Odd";  // Faster than x % 2
  ```

### How to Progress Through Layers

**Step 1**: Master Layer 1
- ✓ Can write basic syntax without help
- ✓ Solve Level 1-2 problems in [practice.md](practice.md)

**Step 2**: Move to Layer 2
- ✓ Understand when to use which approach
- ✓ Solve Level 2-3 problems
- ✓ Score 70%+ on [mcqs.md](mcqs.md)

**Step 3**: Master Layer 3
- ✓ Handle all edge cases
- ✓ Solve Level 3-4 problems
- ✓ Avoid traps in [Common_Interview_Traps.md](Common_Interview_Traps.md)
- ✓ Can explain concept to others

### Self-Assessment Checklist

**Beginner Level**:
- [ ] Can declare variables correctly
- [ ] Can write basic loops
- [ ] Can use if-else statements
- [ ] Can write simple functions
- [ ] Can take input and print output

**Intermediate Level**:
- [ ] Know when to use which data type
- [ ] Can choose appropriate loop type
- [ ] Understand pass by value vs reference
- [ ] Can use STL containers (vector, map)
- [ ] Can solve problems independently

**Advanced Level**:
- [ ] Handle all edge cases automatically
- [ ] Optimize solutions for time/space
- [ ] Recognize patterns in new problems
- [ ] Avoid common interview traps
- [ ] Can debug code systematically

---

## 🧠 Active Recall Questions

**Instructions**: Answer these WITHOUT looking at the notes. Test your memory!

### Data Types & Variables
1. What's the difference between `float` and `double`? When would you use each?
2. What happens if you don't initialize a local variable?
3. Why does `char grade = "A"` give an error? How do you fix it?

### Operators
4. What's the output of `5/2` vs `5.0/2.0`? Why?
5. Explain the difference between `x++` and `++x` with an example.
6. How do you check if a number is even using bitwise operators?

### Control Flow
7. What's wrong with this code?
   ```cpp
   if (x = 10) { cout << "Ten"; }
   ```
8. When should you use `switch` instead of `if-else`?
9. What does the ternary operator do? Write an example.

### Loops
10. What's the difference between these loops?
    ```cpp
    for (int i = 0; i < 5; i++) { }
    for (int i = 0; i <= 5; i++) { }
    ```
11. When would you use `break` vs `continue`?
12. Write a loop that prints numbers from 10 to 1 (reverse order).

### Functions
13. What's the difference between pass by value and pass by reference?
14. When would you use a `void` function?
15. Can a function return multiple values? How?

### Arrays & Strings
16. Why does this crash?
    ```cpp
    int arr[5];
    cout << arr[5];
    ```
17. How do you find the length of a string?
18. What's the difference between `cin >> s` and `getline(cin, s)`?

### STL
19. How do you add an element to a vector? Remove the last element?
20. When would you use a `map` vs a `vector`?
21. What's the difference between `stack` and `queue`?

### Edge Cases
22. What could go wrong with this code?
    ```cpp
    int sum = a + b;
    ```
23. How do you safely divide two numbers?
24. What edge cases should you check for array problems?

---

**Check Your Answers**: After attempting, review the relevant sections in this file or check [solutions.md](solutions.md)

---

## 🎯 Quick Navigation

**Need to...**
- Learn concepts? → You're in [notes.md](notes.md) ✓
- Practice problems? → Go to [practice.md](practice.md)
- Check solutions? → Go to [solutions.md](solutions.md)
- Test yourself? → Go to [mcqs.md](mcqs.md)
- Quick revision? → Go to [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md)
- Feeling stuck? → Go to [If_You_Get_Stuck.md](If_You_Get_Stuck.md)
- Prepare for interview? → Go to [Common_Interview_Traps.md](Common_Interview_Traps.md)

---

**Keep practicing! The more you code, the better you'll get! 🚀**

**Next Topic**: After completing all practice problems and scoring 80%+ on MCQs, move to [01_Fundamentals](../01_Fundamentals/notes.md)

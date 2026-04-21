# Common Interview Traps & How to Avoid Them

**Purpose**: Learn from mistakes candidates make in coding interviews

---

## Trap #1: Integer Overflow

### The Trap:
```cpp
int a = 2000000000;
int b = 2000000000;
int sum = a + b;  // WRONG! Overflows
cout << sum;      // Prints garbage value
```

### What Happens:
```
int max value: 2,147,483,647
a + b = 4,000,000,000  → OVERFLOW!
```

### How to Avoid:
```cpp
// Use long long for large numbers
long long a = 2000000000;
long long b = 2000000000;
long long sum = a + b;  // CORRECT: 4,000,000,000
```

### Interview Question:
> "When should you use `long long`?"

**Answer**: "When values can exceed 2×10⁹, or when adding/multiplying large numbers that might overflow int range."

---

## Trap #2: Integer Division

### The Trap:
```cpp
int a = 5, b = 2;
double result = a / b;
cout << result;  // Prints 2.0, NOT 2.5!
```

### What Happens:
```
5 / 2 = 2 (integer division truncates)
Then 2 → 2.0 (converted to double)
```

### How to Avoid:
```cpp
// Cast at least one operand to double
double result = (double)a / b;
// OR
double result = a / (double)b;
// OR
double result = 1.0 * a / b;

cout << result;  // Prints 2.5 ✓
```

### Interview Tip:
Always ask: "Should the output be integer or decimal?"

---

## Trap #3: Array Index Out of Bounds

### The Trap:
```cpp
int arr[5] = {1, 2, 3, 4, 5};

// WRONG - Accessing index 5 (valid: 0-4)
cout << arr[5];  // Undefined behavior!

// WRONG - Off-by-one in loop
for (int i = 0; i <= 5; i++) {  // Should be i < 5
    cout << arr[i];  // Last iteration crashes!
}
```

### What Happens:
```
C++ does NOT check bounds!
May print garbage value or crash
```

### How to Avoid:
```cpp
// Valid indices: 0 to size-1
for (int i = 0; i < 5; i++) {  // CORRECT
    cout << arr[i];
}

// Always check before accessing
if (index >= 0 && index < size) {
    cout << arr[index];
}
```

### Interview Question:
> "What's wrong with this code?"

**Always check**: Loop conditions, array accesses, string indices

---

## Trap #4: Forgetting to Initialize Variables

### The Trap:
```cpp
int sum;  // WRONG - Not initialized!
for (int i = 1; i <= 10; i++) {
    sum += i;  // Adding to garbage value
}
cout << sum;  // Random output
```

### What Happens:
```
Local variables contain garbage values
sum might be 32767 (random)
Result: 32767 + 55 = 32822 (WRONG!)
```

### How to Avoid:
```cpp
int sum = 0;  // CORRECT - Initialize!
int product = 1;  // For multiplication
bool found = false;  // For flags
```

### Rule:
**ALWAYS initialize variables when declaring!**

---

## Trap #5: Modifying Variable Multiple Times in One Expression

### The Trap:
```cpp
int x = 5;
cout << x++ + ++x;  // UNDEFINED BEHAVIOR!
```

### What Happens:
```
Different compilers give different results!
May print 10, 11, or 12
No guarantee!
```

### How to Avoid:
```cpp
// Separate into multiple statements
int x = 5;
int a = x++;  // a = 5, x = 6
int b = ++x;  // x = 7, b = 7
cout << a + b;  // 12 (well-defined)
```

### Interview Tip:
Never write clever one-liners. Write clear, readable code!

---

## Trap #6: Not Handling Edge Cases

### The Trap:
```cpp
// Find maximum in array
int findMax(int arr[], int n) {
    int max = arr[0];  // CRASH if n = 0!
    
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
```

### What Happens:
```
If n = 0: arr[0] doesn't exist → CRASH!
```

### How to Avoid:
```cpp
int findMax(int arr[], int n) {
    // Handle edge case first!
    if (n == 0) {
        return -1;  // Or throw exception
    }
    
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
```

### Edge Cases Checklist:
```
□ Empty array (n = 0)
□ Single element (n = 1)
□ All same elements
□ Already sorted
□ Reverse sorted
□ All negative numbers
□ Contains zero
□ Maximum constraints
```

---

## Trap #7: Confusing = with ==

### The Trap:
```cpp
int x = 5;

// WRONG - Assignment, not comparison!
if (x = 10) {
    cout << "x is 10";  // Always executes!
}
```

### What Happens:
```
x = 10 assigns 10 to x
Expression evaluates to 10 (non-zero = true)
Always enters if block!
```

### How to Avoid:
```cpp
// Use == for comparison
if (x == 10) {
    cout << "x is 10";  // Correct!
}

// Pro tip: Yoda condition (prevents this error)
if (10 == x) {  // If you write = by mistake, compiler catches it!
    cout << "x is 10";
}
```

---

## Trap #8: Forgetting break in switch

### The Trap:
```cpp
switch (day) {
    case 1:
        cout << "Monday";
        // MISSING break!
    case 2:
        cout << "Tuesday";
        break;
}
```

### What Happens:
```
If day = 1:
Prints "MondayTuesday" (fall-through!)
```

### How to Avoid:
```cpp
switch (day) {
    case 1:
        cout << "Monday";
        break;  // DON'T FORGET!
    case 2:
        cout << "Tuesday";
        break;
    default:
        cout << "Invalid";
}
```

---

## Trap #9: Using cin >> for String with Spaces

### The Trap:
```cpp
string name;
cout << "Enter full name: ";
cin >> name;

cout << "You entered: " << name << endl;
```

### What Happens:
```
Input: "John Doe"
Output: "You entered: John"  (Stops at space!)
```

### How to Avoid:
```cpp
string name;
cout << "Enter full name: ";
getline(cin, name);  // Reads entire line

cout << "You entered: " << name << endl;
// Output: "You entered: John Doe" ✓
```

---

## Trap #10: Off-by-One Errors in Loops

### The Trap:
```cpp
// Print numbers 1 to 5

// WRONG - Prints 1 to 4
for (int i = 1; i < 5; i++) {
    cout << i << " ";
}

// WRONG - Prints 1 to 6
for (int i = 1; i <= 6; i++) {
    cout << i << " ";
}
```

### How to Avoid:
```cpp
// CORRECT
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
// OR
for (int i = 1; i < 6; i++) {
    cout << i << " ";
}
```

### Rule:
```
< n   → Goes up to n-1
<= n  → Goes up to n
```

---

## Trap #11: Not Understanding Pass by Value vs Reference

### The Trap:
```cpp
void swap(int a, int b) {  // Pass by value (copies)
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y;  // Prints 5 10 (NOT swapped!)
}
```

### What Happens:
```
Function gets COPIES of x and y
Original x and y unchanged
```

### How to Avoid:
```cpp
// Pass by reference (use &)
void swap(int &a, int &b) {  // CORRECT
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y;  // Prints 10 5 ✓
}
```

### Interview Question:
> "What's the difference between pass by value and pass by reference?"

**Answer**: 
- Pass by value: Function gets a copy, original unchanged
- Pass by reference: Function works on original, changes persist
- Use `&` for reference

---

## Trap #12: Forgetting to Include Headers

### The Trap:
```cpp
int main() {
    vector<int> v;  // ERROR!
    string s;       // ERROR!
    sort(v.begin(), v.end());  // ERROR!
}
```

### How to Avoid:
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v;  // ✓
    string s;       // ✓
    sort(v.begin(), v.end());  // ✓
}
```

### Common Headers:
```cpp
#include <iostream>      // cin, cout
#include <vector>        // vector
#include <string>        // string
#include <algorithm>     // sort, reverse
#include <cmath>         // pow, sqrt
#include <map>           // map
#include <set>           // set
#include <stack>         // stack
#include <queue>         // queue
#include <iomanip>       // setprecision
```

---

## Trap #13: Infinite Loops

### The Trap:
```cpp
int i = 0;
while (i < 10) {
    cout << i << " ";
    // FORGOT to increment i!
}
// Runs forever!
```

### How to Avoid:
```cpp
int i = 0;
while (i < 10) {
    cout << i << " ";
    i++;  // ALWAYS update loop variable
}
```

### Debugging Tip:
If program hangs, check:
- Loop condition
- Variable updates
- Break conditions

---

## Trap #14: Not Testing with Edge Cases

### The Trap:
```cpp
// Check if number is prime
bool isPrime(int n) {
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### What's Wrong:
```
isPrime(1) → Returns true (WRONG! 1 is not prime)
isPrime(0) → Returns true (WRONG!)
isPrime(-5) → Returns true (WRONG!)
```

### How to Avoid:
```cpp
bool isPrime(int n) {
    // Handle edge cases FIRST
    if (n <= 1) return false;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

---

## Trap #15: Wrong Complexity for Constraints

### The Trap:
```cpp
// Problem: n ≤ 10^5
// Your solution: O(n²)

for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // Operations
    }
}
```

### What Happens:
```
n = 10^5
n² = 10^10 operations
Time limit: ~10^8 operations per second
Result: TLE (Time Limit Exceeded)
```

### How to Avoid:
```
Check constraints:
n ≤ 10^5 → Need O(n) or O(n log n)
n ≤ 1000 → O(n²) might work
n ≤ 20   → O(2^n) might work

Rule of thumb:
O(n)      → n up to 10^7
O(n log n)→ n up to 10^6
O(n²)     → n up to 10^3
O(2^n)    → n up to 20
```

---

## Interview Strategy Checklist

### Before Coding:
```
□ Clarified input/output format?
□ Asked about constraints?
□ Discussed edge cases?
□ Explained brute force approach?
□ Got interviewer's approval on approach?
```

### While Coding:
```
□ Used meaningful variable names?
□ Handled edge cases first?
□ Added comments for complex logic?
□ Checked for overflow/underflow?
□ Verified array bounds?
```

### After Coding:
```
□ Tested with normal case?
□ Tested with edge cases?
□ Stated time complexity?
□ Stated space complexity?
□ Mentioned alternative approaches?
```

---

## Quick Reference Card

### Always Ask Yourself:

```
1. Can this overflow? → Use long long
2. Division involved? → Check integer vs float
3. Array access? → Check bounds
4. Variables initialized? → Set to default values
5. Edge cases? → Empty, single, all same
6. Loop condition? → < vs <=
7. Pass by value or reference? → Use & if needed
8. Headers included? → Check all includes
```

---

## Practice: Spot the Bug

Try finding bugs in these before looking at solutions:

```cpp
// Problem 1: Find average
int sum = 0;
for (int x : arr) sum += x;
cout << sum / arr.size();

// Problem 2: Reverse array
for (int i = 0; i <= n/2; i++) {
    swap(arr[i], arr[n-i]);
}

// Problem 3: Count zeros
int count;
for (int x : arr) {
    if (x == 0) count++;
}
cout << count;
```

**Answers**:
1. Integer division! Use `(double)sum / arr.size()`
2. Out of bounds! `arr[n-i]` should be `arr[n-1-i]`
3. Uninitialized `count`! Should be `int count = 0`

---

## Final Tips

✅ **Think before coding** - 5 minutes of planning saves 30 minutes of debugging  
✅ **Test as you go** - Don't write 100 lines then test  
✅ **Handle edge cases first** - Makes code cleaner  
✅ **Use meaningful names** - `maxValue` not `m`  
✅ **Write clean code** - Interviewers value readability  
✅ **Explain your thought process** - Communication matters  

---

**Next Steps**:
- Review these traps before every interview
- Practice problems in [practice.md](practice.md)
- Test yourself with [MCQs](mcqs.md)
- See correct implementations in [solutions.md](solutions.md)

# Indexing and Traversal — Navigating Arrays

> **What You'll Learn**: Different ways to traverse arrays, 0-based indexing mastery, nested loops  
> **Prerequisites**: Array Basics, Memory Model  
> **Time Required**: 1-2 hours

---

## 1. 📌 Why 0-Based Indexing?

### The Mathematical Reason

Array indexing is based on **offset from start**:

```
arr[0] → 0 steps from start → first element
arr[1] → 1 step from start → second element
arr[i] → i steps from start → (i+1)th element
```

### Visual Proof

```cpp
int arr[5] = {10, 20, 30, 40, 50};
// Address of arr = 1000

arr[0] → *(arr + 0) → Address 1000 + (0×4) = 1000 → Value 10
arr[1] → *(arr + 1) → Address 1000 + (1×4) = 1004 → Value 20
arr[2] → *(arr + 2) → Address 1000 + (2×4) = 1008 → Value 30
```

If we started at 1:
```
arr[1] → Would need: Address 1000 + ((1-1)×4) = Extra calculation!
```

💡 **TRICK**: 0-based indexing eliminates the "-1" adjustment in address calculation!

---

## 2. 🔄 Traversal Patterns

### Pattern 1: Forward Traversal
```cpp
// Most common: Left to right
for(int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}
```

**Example**: Print all elements
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 10, 15, 20, 25};
    int n = 5;
    
    for(int i = 0; i < n; i++) {
        cout << "Element " << i << ": " << arr[i] << endl;
    }
    
    return 0;
}
```

### Pattern 2: Reverse Traversal
```cpp
// Right to left
for(int i = n - 1; i >= 0; i--) {
    cout << arr[i] << " ";
}
```

**Example**: Reverse print
```cpp
int arr[] = {1, 2, 3, 4, 5};
int n = 5;

for(int i = n - 1; i >= 0; i--) {
    cout << arr[i] << " ";  // Output: 5 4 3 2 1
}
```

### Pattern 3: Skip Traversal
```cpp
// Every 2nd element
for(int i = 0; i < n; i += 2) {
    cout << arr[i] << " ";
}

// Every 3rd element
for(int i = 0; i < n; i += 3) {
    cout << arr[i] << " ";
}
```

**Example**: Sum of even-indexed elements
```cpp
int arr[] = {1, 2, 3, 4, 5, 6};
int n = 6;
int sum = 0;

for(int i = 0; i < n; i += 2) {
    sum += arr[i];  // Adds arr[0], arr[2], arr[4]
}

cout << "Sum: " << sum << endl;  // 1 + 3 + 5 = 9
```

### Pattern 4: Conditional Traversal
```cpp
// Process only elements that meet condition
for(int i = 0; i < n; i++) {
    if(arr[i] % 2 == 0) {  // Only even numbers
        cout << arr[i] << " ";
    }
}
```

**Example**: Count positive numbers
```cpp
int arr[] = {-5, 10, -3, 8, 0, 15};
int n = 6;
int count = 0;

for(int i = 0; i < n; i++) {
    if(arr[i] > 0) {
        count++;
    }
}

cout << "Positive numbers: " << count << endl;  // 3
```

---

## 3. 🎯 Two-Pointer Traversal

### Opposite Direction
```cpp
// Start from both ends, move inward
int left = 0;
int right = n - 1;

while(left < right) {
    // Process arr[left] and arr[right]
    left++;
    right--;
}
```

**Example**: Check if array is palindrome
```cpp
#include <iostream>
using namespace std;

bool isPalindrome(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    
    while(left < right) {
        if(arr[left] != arr[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

int main() {
    int arr1[] = {1, 2, 3, 2, 1};
    cout << isPalindrome(arr1, 5) << endl;  // 1 (true)
    
    int arr2[] = {1, 2, 3, 4, 5};
    cout << isPalindrome(arr2, 5) << endl;  // 0 (false)
    
    return 0;
}
```

**Visual Trace**:
```
Array: [1, 2, 3, 2, 1]
        L         R     → Compare: 1 == 1 ✓
           L     R      → Compare: 2 == 2 ✓
              L,R       → left >= right, stop!
        
Result: Palindrome! ✓
```

---

## 4. 📊 Nested Loops for 2D Arrays

### Pattern 1: Row-Major Traversal
```cpp
for(int i = 0; i < rows; i++) {
    for(int j = 0; j < cols; j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}
```

**Example**: Print 2D array
```cpp
#include <iostream>
using namespace std;

int main() {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 4; j++) {
            cout << matrix[i][j] << "\t";
        }
        cout << endl;
    }
    
    return 0;
}
```

**Output**:
```
1   2   3   4
5   6   7   8
9   10  11  12
```

### Pattern 2: Column-Major Traversal
```cpp
// Traverse column by column (less cache-friendly)
for(int j = 0; j < cols; j++) {
    for(int i = 0; i < rows; i++) {
        cout << matrix[i][j] << " ";
    }
}
```

### Pattern 3: Diagonal Traversal
```cpp
// Main diagonal (top-left to bottom-right)
for(int i = 0; i < min(rows, cols); i++) {
    cout << matrix[i][i] << " ";
}
```

---

## 5. 🔥 Advanced Traversal Patterns

### Pattern 1: Spiral Traversal (2D Array)
```cpp
#include <iostream>
using namespace std;

void spiralTraversal(int matrix[][4], int rows, int cols) {
    int top = 0, bottom = rows - 1;
    int left = 0, right = cols - 1;
    
    while(top <= bottom && left <= right) {
        // Traverse right
        for(int j = left; j <= right; j++) {
            cout << matrix[top][j] << " ";
        }
        top++;
        
        // Traverse down
        for(int i = top; i <= bottom; i++) {
            cout << matrix[i][right] << " ";
        }
        right--;
        
        // Traverse left
        if(top <= bottom) {
            for(int j = right; j >= left; j--) {
                cout << matrix[bottom][j] << " ";
            }
            bottom--;
        }
        
        // Traverse up
        if(left <= right) {
            for(int i = bottom; i >= top; i--) {
                cout << matrix[i][left] << " ";
            }
            left++;
        }
    }
}

int main() {
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    spiralTraversal(matrix, 3, 4);
    // Output: 1 2 3 4 8 12 11 10 9 5 6 7
    
    return 0;
}
```

### Pattern 2: Zig-Zag Traversal
```cpp
// Alternate direction each row
for(int i = 0; i < rows; i++) {
    if(i % 2 == 0) {
        // Left to right
        for(int j = 0; j < cols; j++) {
            cout << matrix[i][j] << " ";
        }
    } else {
        // Right to left
        for(int j = cols - 1; j >= 0; j--) {
            cout << matrix[i][j] << " ";
        }
    }
}
```

---

## 6. ⚠️ Common Indexing Mistakes

### Mistake 1: Off-by-One Error
```cpp
int arr[5] = {1, 2, 3, 4, 5};

// WRONG: Using <=
for(int i = 0; i <= 5; i++) {  // i=5 is out of bounds!
    cout << arr[i] << " ";
}

// CORRECT: Use <
for(int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
```

### Mistake 2: Wrong Starting Index
```cpp
// WRONG: Starting at 1
for(int i = 1; i < n; i++) {  // Misses arr[0]!
    sum += arr[i];
}

// CORRECT: Start at 0
for(int i = 0; i < n; i++) {
    sum += arr[i];
}
```

### Mistake 3: Infinite Loop
```cpp
// WRONG: Wrong increment
for(int i = 0; i < n; i--) {  // i keeps decreasing!
    cout << arr[i] << " ";
}

// CORRECT: Increment properly
for(int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}
```

### Mistake 4: Reverse Loop Boundary
```cpp
int arr[5] = {1, 2, 3, 4, 5};

// WRONG: Starting at n
for(int i = 5; i >= 0; i--) {  // i=5 is out of bounds!
    cout << arr[i] << " ";
}

// CORRECT: Start at n-1
for(int i = 4; i >= 0; i--) {
    cout << arr[i] << " ";
}
```

---

## 7. 📝 Practice Exercises

### Exercise 1: Find Second Largest
```cpp
#include <iostream>
#include <climits>
using namespace std;

int findSecondLargest(int arr[], int n) {
    int largest = INT_MIN;
    int secondLargest = INT_MIN;
    
    for(int i = 0; i < n; i++) {
        if(arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        } else if(arr[i] > secondLargest && arr[i] != largest) {
            secondLargest = arr[i];
        }
    }
    
    return secondLargest;
}

int main() {
    int arr[] = {12, 35, 1, 10, 34, 1};
    cout << "Second largest: " << findSecondLargest(arr, 6) << endl;  // 34
    
    return 0;
}
```

### Exercise 2: Rotate Array by K Positions
```cpp
#include <iostream>
using namespace std;

void reverse(int arr[], int start, int end) {
    while(start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}

void rotateArray(int arr[], int n, int k) {
    k = k % n;  // Handle k > n
    
    reverse(arr, 0, n - 1);        // Reverse entire array
    reverse(arr, 0, k - 1);        // Reverse first k elements
    reverse(arr, k, n - 1);        // Reverse remaining
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;
    int k = 2;
    
    rotateArray(arr, n, k);
    
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";  // 4 5 1 2 3
    }
    
    return 0;
}
```

---

## 8. 🎯 Key Takeaways

1. **0-based indexing** — Mathematical convenience, matches memory offset
2. **Forward traversal** — `for(int i = 0; i < n; i++)`
3. **Reverse traversal** — `for(int i = n-1; i >= 0; i--)`
4. **Skip traversal** — `i += 2` or `i += 3`
5. **Two-pointer** — Efficient for sorted arrays and palindromes
6. **Nested loops** — Required for 2D array traversal
7. **Watch boundaries** — Most bugs are off-by-one errors

---

## 9. 🎯 What's Next?

1. ✅ [Array Basics](Array_Basics.md)
2. ✅ [Memory Model](Memory_Model.md)
3. ✅ **Indexing and Traversal** — You are here!
4. ✅ [Complexity Analysis](Complexity_Analysis.md) — Performance understanding

**Next File**: [Complexity Analysis](Complexity_Analysis.md) →

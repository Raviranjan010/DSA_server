# Complexity Analysis for Arrays

> **What You'll Learn**: Time/space complexity for all array operations  
> **Prerequisites**: Array Basics, Indexing  
> **Time Required**: 1 hour

---

## 1. 📌 Time Complexity Summary Table

| Operation | Best Case | Average Case | Worst Case | Reasoning |
|-----------|-----------|--------------|------------|-----------|
| **Access by index** | O(1) | O(1) | O(1) | Direct address calculation |
| **Search (unsorted)** | O(1) | O(n) | O(n) | May need to check all elements |
| **Search (sorted, binary)** | O(1) | O(log n) | O(log n) | Halve search space each step |
| **Insert at end** | O(1) | O(1) | O(1) | Just place at next position |
| **Insert at position** | O(1) | O(n) | O(n) | Must shift n-i elements |
| **Delete from end** | O(1) | O(1) | O(1) | Just decrease count |
| **Delete from position** | O(1) | O(n) | O(n) | Must shift n-i-1 elements |
| **Update by index** | O(1) | O(1) | O(1) | Direct access and modify |

---

## 2. 🔍 Step-by-Step Complexity Calculation

### Example 1: Single Loop
```cpp
for(int i = 0; i < n; i++) {
    cout << arr[i] << endl;  // O(1) operation
}
// Total: n × O(1) = O(n)
```

### Example 2: Nested Loops
```cpp
for(int i = 0; i < n; i++) {           // Runs n times
    for(int j = 0; j < n; j++) {       // Runs n times
        cout << arr[i][j] << " ";      // O(1) operation
    }
}
// Total: n × n × O(1) = O(n²)
```

### Example 3: Two Separate Loops
```cpp
for(int i = 0; i < n; i++) {           // O(n)
    sum += arr[i];
}

for(int i = 0; i < n; i++) {           // O(n)
    product *= arr[i];
}
// Total: O(n) + O(n) = O(n) [Not O(2n), constants dropped]
```

---

## 3. 📊 Space Complexity

### O(1) Space — No Extra Memory
```cpp
int findMax(int arr[], int n) {
    int maxVal = arr[0];  // O(1) extra space
    for(int i = 1; i < n; i++) {
        if(arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}
```

### O(n) Space — Auxiliary Array
```cpp
void createCopy(int arr[], int n) {
    int* copy = new int[n];  // O(n) extra space
    for(int i = 0; i < n; i++) {
        copy[i] = arr[i];
    }
    delete[] copy;
}
```

---

## 4. 💡 Optimization Tips

### Tip 1: Use Binary Search on Sorted Arrays
```cpp
// O(n) → O(log n)
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while(left <= right) {
        int mid = left + (right - left) / 2;
        
        if(arr[mid] == target) return mid;
        else if(arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}
```

### Tip 2: Avoid Unnecessary Copies
```cpp
// BAD: O(n) space
void process(int arr[], int n) {
    int temp[n];
    for(int i = 0; i < n; i++) {
        temp[i] = arr[i];  // Unnecessary copy
    }
    // ... process temp ...
}

// GOOD: O(1) space
void process(int arr[], int n) {
    // ... process arr directly ...
}
```

---

## 5. 📝 Practice Problems

1. What is the complexity of finding duplicates in an unsorted array? **Answer**: O(n²) brute force, O(n) with hash map
2. What is the space complexity of reversing an array in-place? **Answer**: O(1)
3. What is the complexity of merging two sorted arrays? **Answer**: O(n+m) time, O(n+m) space

---

**🎯 Next**: Apply these concepts in pattern-specific folders!

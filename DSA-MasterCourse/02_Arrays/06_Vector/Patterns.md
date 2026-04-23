# Vector — Patterns Reference

> **Complete catalog of vector operations and patterns**

---

## 📋 Essential Vector Operations

### 1. Creation & Initialization
```cpp
vector<int> v1;                   // Empty vector
vector<int> v2(5);                // Size 5, all 0
vector<int> v3(5, 10);            // Size 5, all 10
vector<int> v4 = {1, 2, 3};       // Initializer list
vector<int> v5(v4);               // Copy
```

---

### 2. Adding Elements
```cpp
v.push_back(5);           // Add to end
v.insert(v.begin(), 3);   // Insert at beginning
v.insert(v.begin()+2, 5, 10);  // Insert five 10s at index 2
```

---

### 3. Removing Elements
```cpp
v.pop_back();             // Remove last
v.erase(v.begin());       // Remove first
v.erase(v.begin()+2);     // Remove at index 2
v.erase(v.begin(), v.begin()+3);  // Remove range [0,3)
v.clear();                // Remove all
```

---

### 4. Accessing Elements
```cpp
v[0];                     // First element (no bounds check)
v.at(0);                  // First element (with bounds check)
v.front();                // First element
v.back();                 // Last element
v.data();                 // Pointer to underlying array
```

---

### 5. Size & Capacity
```cpp
v.size();                 // Number of elements
v.capacity();             // Allocated storage
v.empty();                // Check if empty
v.resize(10);             // Change size
v.reserve(100);           // Reserve capacity
```

---

## 🎯 Common Patterns

### 1. Two Pointer on Vector
```cpp
// Same as arrays
int left = 0, right = v.size() - 1;
while(left < right) {
    // Logic
}
```

---

### 2. Sliding Window on Vector
```cpp
// Same as arrays
int currentSum = 0;
for(int i = 0; i < k; i++) {
    currentSum += v[i];
}
```

---

### 3. Sorting
```cpp
sort(v.begin(), v.end());                    // Ascending
sort(v.rbegin(), v.rend());                  // Descending
sort(v.begin(), v.end(), greater<int>());    // Descending

// Custom comparator
sort(v.begin(), v.end(), [](int a, int b) {
    return a % 10 < b % 10;  // Sort by last digit
});
```

---

### 4. Unique Elements
```cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
```

---

### 5. Reversing
```cpp
reverse(v.begin(), v.end());
```

---

### 6. Finding Elements
```cpp
auto it = find(v.begin(), v.end(), 5);
if(it != v.end()) {
    cout << "Found at index " << (it - v.begin());
}
```

---

### 7. 2D Vectors
```cpp
// Creation
vector<vector<int>> matrix(3, vector<int>(4, 0));  // 3x4 matrix

// Access
matrix[i][j] = value;

// Jagged array
vector<vector<int>> jagged = {
    {1, 2},
    {3, 4, 5},
    {6}
};
```

---

## 💡 Pro Tips

1. **Use `emplace_back`** - Faster than `push_back` for objects
2. **Reserve when possible** - Avoid reallocations
3. **Use `at()` for safety** - Bounds checking
4. **Pass by reference** - Avoid copies
5. **Prefer vectors over arrays** - Dynamic, safe, STL compatible

---

**Master vectors for flexible array manipulation!**

[← Back to Notes](../Notes.md) | [Problems](Problems/Easy_Medium_Hard.md)

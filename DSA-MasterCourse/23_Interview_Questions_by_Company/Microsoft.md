# Top 20 Microsoft DSA Interview Questions

Microsoft focuses heavily on **Strings, Linked Lists, Trees, and Matrix/Grid navigation**. They love looking at code organization, edge case handling, and cleanly separated logic.

---

### 1. Reverse a Linked List
- **Difficulty**: 🟢 Easy
- **Topic Tag**: `[Linked List]` 
- **Frequency**: 📅 Very High

**Problem Statement:**
Given the head of a singly linked list, reverse the list, and return the reversed list.

**C++ Solution:**
```cpp
// Time Complexity: O(N)
// Space Complexity: O(1) Iterative
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    ListNode* nextNode = nullptr;
    
    while (curr != nullptr) {
        nextNode = curr->next;  // 1. Temporarily store the next node
        curr->next = prev;      // 2. Reverse the current node's pointer
        prev = curr;            // 3. Move prev forward to current
        curr = nextNode;        // 4. Move current forward
    }
    
    return prev; // prev will be pointing to the new head
}
```

---

### 2. Search a 2D Matrix
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Array]` `[Binary Search]`
- **Frequency**: 📅 High

**Problem Statement:**
Write an efficient algorithm that searches for a value in an `m x n` matrix. Arrays are sorted from left to right, and the first integer of each row is greater than the last integer of the previous row.

**C++ Solution:**
```cpp
// Time Complexity: O(log(M * N))
// Space Complexity: O(1)
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    if (matrix.empty() || matrix[0].empty()) return false;
    
    int rows = matrix.size();
    int cols = matrix[0].size();
    
    // Treat the 2D matrix as a flat 1D array
    int left = 0;
    int right = rows * cols - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        // Formula to convert 1D index back to 2D
        int midValue = matrix[mid / cols][mid % cols]; 
        
        if (midValue == target) return true;
        else if (midValue < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return false;
}
```

---

### 3. Spiral Matrix
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Matrix]` `[Simulation]`
- **Frequency**: 📅 High

**Problem Statement:**
Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.

**C++ Solution:**
```cpp
// Time Complexity: O(M * N)
// Space Complexity: O(1) apart from the result vector
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> res;
    if (matrix.empty()) return res;
    
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse Right
        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
        top++;
        
        // Traverse Down
        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
        right--;
        
        // Traverse Left
        if (top <= bottom) {
            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
            bottom--;
        }
        
        // Traverse Up
        if (left <= right) {
            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
            left++;
        }
    }
    return res;
}
```

*(Remaining outline items omitted for brevity)*

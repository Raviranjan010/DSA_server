# Top 20 TCS, Infosys & Wipro DSA Interview Questions

Service-based companies tend to conduct more straightforward algorithmic interviews focusing heavily on **Array Iteration, Basic Strings, Sorting, and Pattern Printing**.

---

### 1. Check if Array is Sorted and Rotated
- **Difficulty**: 🟢 Easy
- **Topic Tag**: `[Array]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Given an array `nums`, return `true` if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero).

**C++ Solution:**
```cpp
// Time Complexity: O(N)
// Space Complexity: O(1)
bool check(vector<int>& nums) {
    int count = 0;
    int n = nums.size();
    
    // There should be at most ONE break in the ascending order if it is rotated & sorted
    for (int i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) {
            count++;
        }
    }
    
    return count <= 1;
}
```

---

### 2. Reverse a String word by word
- **Difficulty**: 🟢 Easy
- **Topic Tag**: `[String]`
- **Frequency**: 📅 Very High

*(Implementation available in the Strings core folder).*

---

*(Remaining outline items omitted for brevity)*

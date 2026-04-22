# Top 20 Flipkart DSA Interview Questions

Flipkart loves E-commerce oriented algorithmic questions: **Graph theory, Shortest Paths (delivery routes), Interval Scheduling (booking), and Priority Queues/Heaps (top K items).**

---

### 1. Minimum Platforms
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Greedy]` `[Sorting]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Given arrival and departure times of all trains that reach a railway station. Find the minimum number of platforms required for the railway station so that no train is kept waiting.

**C++ Solution:**
```cpp
// Time Complexity: O(N log N)
// Space Complexity: O(1) mostly
int findPlatform(int arr[], int dep[], int n) {
    sort(arr, arr + n);
    sort(dep, dep + n);
    
    int plat_needed = 1, result = 1;
    int i = 1, j = 0;
    
    while (i < n && j < n) {
        // If next event in sorted order is arrival, increment count of platforms
        if (arr[i] <= dep[j]) {
            plat_needed++;
            i++;
        }
        // Else decrement count of platforms
        else if (arr[i] > dep[j]) {
            plat_needed--;
            j++;
        }
        
        // Update result if needed 
        if (plat_needed > result)
            result = plat_needed;
    }
    
    return result;
}
```

---

*(Remaining outline items omitted for brevity)*

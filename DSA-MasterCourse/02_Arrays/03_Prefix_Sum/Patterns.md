# Prefix Sum — Patterns Reference

> **Complete catalog of prefix sum patterns**

---

## 📋 Pattern Variations

### 1. 1D Prefix Sum

**Use When**: Range sum queries on 1D array  
**Time Complexity**: O(1) per query after O(n) preprocessing

#### Template
```cpp
// Build prefix sum
vector<int> prefix(n);
prefix[0] = nums[0];
for(int i = 1; i < n; i++) {
    prefix[i] = prefix[i-1] + nums[i];
}

// Query range [left, right]
int rangeSum(int left, int right) {
    if(left == 0) return prefix[right];
    return prefix[right] - prefix[left-1];
}
```

#### Example Problems
- Range Sum Query - Immutable
- Find Pivot Index
- Product of Array Except Self

---

### 2. Prefix Sum + Hash Map

**Use When**: Count/find subarrays with specific sum  
**Time Complexity**: O(n)

#### Template
```cpp
unordered_map<int, int> prefixCount;
prefixCount[0] = 1;  // Important base case

int currentSum = 0;
int count = 0;

for(int num : nums) {
    currentSum += num;
    
    // Check if (currentSum - k) exists
    if(prefixCount.count(currentSum - k)) {
        count += prefixCount[currentSum - k];
    }
    
    // Record current prefix sum
    prefixCount[currentSum]++;
}
```

#### Example Problems
- Subarray Sum Equals K
- Continuous Subarray Sum
- Subarray Sum Divisible by K

---

### 3. 2D Prefix Sum

**Use When**: Range sum queries on 2D matrix  
**Time Complexity**: O(1) per query after O(m×n) preprocessing

#### Template
```cpp
// Build 2D prefix sum
vector<vector<int>> prefix(m+1, vector<int>(n+1, 0));
for(int i = 0; i < m; i++) {
    for(int j = 0; j < n; j++) {
        prefix[i+1][j+1] = matrix[i][j] +
            prefix[i][j+1] + prefix[i+1][j] - prefix[i][j];
    }
}

// Query rectangle (row1, col1) to (row2, col2)
int sumRegion(int row1, int col1, int row2, int col2) {
    return prefix[row2+1][col2+1] -
           prefix[row1][col2+1] -
           prefix[row2+1][col1] +
           prefix[row1][col1];
}
```

#### Example Problems
- Range Sum Query 2D
- Maximum Size Rectangle

---

### 4. Prefix XOR

**Use When**: XOR range queries  
**Time Complexity**: O(1) per query

#### Template
```cpp
// Build prefix XOR
vector<int> prefixXOR(n);
prefixXOR[0] = nums[0];
for(int i = 1; i < n; i++) {
    prefixXOR[i] = prefixXOR[i-1] ^ nums[i];
}

// Query XOR range [left, right]
int xorRange(int left, int right) {
    if(left == 0) return prefixXOR[right];
    return prefixXOR[right] ^ prefixXOR[left-1];
}
```

#### Example Problems
- XOR Queries of a Subarray
- Find XOR Sum

---

## 🎯 Cross-Pattern Combinations

### Prefix Sum + Sliding Window
```cpp
// Check if any subarray of size k sums to target
bool hasTargetSum(vector<int>& nums, int k, int target) {
    int currentSum = 0;
    for(int i = 0; i < k; i++) {
        currentSum += nums[i];
    }
    
    if(currentSum == target) return true;
    
    for(int i = k; i < nums.size(); i++) {
        currentSum += nums[i] - nums[i-k];
        if(currentSum == target) return true;
    }
    
    return false;
}
```

### Prefix Sum + Binary Search
```cpp
// Find subarray with sum closest to target
int closestSum(vector<int>& nums, int target) {
    vector<int> prefix = {0};
    for(int num : nums) {
        prefix.push_back(prefix.back() + num);
    }
    
    int closest = INT_MAX;
    set<int> seen;
    
    for(int p : prefix) {
        auto it = seen.lower_bound(p - target);
        if(it != seen.end()) {
            closest = min(closest, abs(p - *it - target));
        }
        seen.insert(p);
    }
    
    return closest;
}
```

---

## 📊 Pattern Decision Flowchart

```
Problem mentions "sum of range" or "subarray sum"
         ↓
    Multiple queries?
    ↓           ↓
   YES          NO (single query)
    ↓           ↓
  Build       Just iterate
  prefix      
  array       
    ↓
    1D or 2D?
    ↓           ↓
   1D          2D
    ↓           ↓
  1D Prefix   2D Prefix
  Sum         Sum
    ↓
    Need to count subarrays?
    ↓           ↓
   YES          NO
    ↓           ↓
  Prefix      Simple
  + Hash      prefix
  Map         queries
```

---

## 🎨 Quick Reference Cards

### Card 1: 1D Prefix Sum
```
WHEN: Range sum queries
BUILD: prefix[i] = prefix[i-1] + nums[i]
QUERY: prefix[right] - prefix[left-1]
TIME: O(1) per query
SPACE: O(n)
```

### Card 2: Prefix + Hash Map
```
WHEN: Count subarrays with sum k
KEY INSIGHT: prefix[j] - prefix[i] = k
BASE CASE: prefixCount[0] = 1
TIME: O(n)
SPACE: O(n)
```

### Card 3: 2D Prefix Sum
```
WHEN: Matrix range queries
BUILD: Add current + top + left - diagonal
QUERY: Use inclusion-exclusion (4 corners)
TIME: O(1) per query
SPACE: O(m×n)
```

### Card 4: Prefix XOR
```
WHEN: XOR range queries
PROPERTY: a ^ a = 0
BUILD: prefixXOR[i] = prefixXOR[i-1] ^ nums[i]
TIME: O(1) per query
SPACE: O(n)
```

---

## 💡 Pro Tips

1. **Always handle left=0** as special case
2. **Base case**: prefixCount[0] = 1 for hash map problems
3. **Handle negative remainders** properly: ((sum % k) + k) % k
4. **2D formula**: Include-exclude pattern (4 terms)
5. **Transform problems** - e.g., treat 0 as -1 for equal count

---

## 🎓 Mastery Checklist

- [ ] Can implement 1D prefix sum from memory
- [ ] Can handle left=0 boundary correctly
- [ ] Can use hash map with prefix sum
- [ ] Can implement 2D prefix sum
- [ ] Understand why prefixCount[0] = 1
- [ ] Can solve subarray counting problems
- [ ] Can transform problems to fit pattern

---

**Master prefix sum for efficient range queries!**

[← Back to Notes](../Notes.md) | [Easy_Medium Problems](Problems/Easy_Medium.md)

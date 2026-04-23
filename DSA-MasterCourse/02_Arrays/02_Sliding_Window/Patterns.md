# Sliding Window — Patterns Reference

> **Complete catalog of sliding window patterns and variations**

---

## 📋 Pattern Variations

### 1. Fixed Window

**Use When**: Window size is known  
**Time Complexity**: O(n)

#### Template
```cpp
int fixedWindow(vector<int>& arr, int k) {
    int n = arr.size();
    int currentSum = 0;
    
    // First window
    for(int i = 0; i < k; i++) {
        currentSum += arr[i];
    }
    
    int maxSum = currentSum;
    
    // Slide window
    for(int i = k; i < n; i++) {
        currentSum += arr[i] - arr[i-k];
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

#### Example Problems
- Maximum Sum Subarray of Size K
- First Negative in Every Window of Size K
- Count Anagrams

---

### 2. Variable Window (Expand-Shrink)

**Use When**: Window size varies based on condition  
**Time Complexity**: O(n)

#### Template
```cpp
int variableWindow(vector<int>& arr, int target) {
    int left = 0;
    int currentSum = 0;
    int maxLength = 0;
    
    for(int right = 0; right < arr.size(); right++) {
        // Expand
        currentSum += arr[right];
        
        // Shrink if condition violated
        while(currentSum > target && left <= right) {
            currentSum -= arr[left];
            left++;
        }
        
        // Update answer
        maxLength = max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

#### Example Problems
- Longest Subarray with Sum ≤ K
- Minimum Size Subarray Sum
- Longest Substring Without Repeating Characters

---

### 3. Monotonic Window (Deque-Based)

**Use When**: Need max/min in sliding window  
**Time Complexity**: O(n)

#### Template
```cpp
vector<int> monotonicWindow(vector<int>& arr, int k) {
    vector<int> result;
    deque<int> dq;  // Stores indices
    
    for(int i = 0; i < arr.size(); i++) {
        // Remove out of window
        if(!dq.empty() && dq.front() == i - k) {
            dq.pop_front();
        }
        
        // Maintain monotonic property
        while(!dq.empty() && arr[dq.back()] < arr[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        if(i >= k - 1) {
            result.push_back(arr[dq.front()]);
        }
    }
    
    return result;
}
```

#### Example Problems
- Sliding Window Maximum
- Sliding Window Minimum
- Next Greater Element

---

### 4. Hash Map + Sliding Window

**Use When**: Tracking character/element frequencies  
**Time Complexity**: O(n)

#### Template
```cpp
int hashMapWindow(string s, int k) {
    unordered_map<char, int> count;
    int left = 0;
    int maxLength = 0;
    
    for(int right = 0; right < s.size(); right++) {
        count[s[right]]++;
        
        // Shrink if condition violated
        while(count.size() > k) {
            count[s[left]]--;
            if(count[s[left]] == 0) {
                count.erase(s[left]);
            }
            left++;
        }
        
        maxLength = max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

#### Example Problems
- Longest Substring with At Most K Distinct Characters
- Find All Anagrams in a String
- Permutation in String

---

## 🎯 Cross-Pattern Combinations

### Two Pointer + Sliding Window
```cpp
// Container With Most Water
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxArea = 0;
    
    while(left < right) {
        int h = min(height[left], height[right]);
        int w = right - left;
        maxArea = max(maxArea, h * w);
        
        if(height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}
```

### Prefix Sum + Sliding Window
```cpp
// Check if subarray sum exists in range
bool hasValidSubarray(vector<int>& nums, int k) {
    unordered_set<int> prefixSet;
    int currentSum = 0;
    
    for(int num : nums) {
        currentSum += num;
        if(prefixSet.count(currentSum - k)) {
            return true;
        }
        prefixSet.insert(currentSum);
    }
    
    return false;
}
```

---

## 📊 Pattern Decision Flowchart

```
Problem mentions "subarray" or "substring"
         ↓
    Window size fixed?
    ↓           ↓
   YES          NO
    ↓           ↓
  Fixed     Condition given?
  Window    ↓           ↓
           YES          NO
            ↓           ↓
        Variable    Not sliding
        Window      window
            ↓
        Need max/min?
        ↓           ↓
       YES          NO
        ↓           ↓
    Monotonic    Hash Map
    Deque        Window
```

---

## 🎨 Quick Reference Cards

### Card 1: Fixed Window
```
WHEN: Window size known
TEMPLATE: 
  1. Build first window
  2. Slide by adding/removing
  3. Update answer
TIME: O(n)
SPACE: O(1)
```

### Card 2: Variable Window
```
WHEN: Condition-based window
TEMPLATE:
  1. Expand with right
  2. Shrink with left if needed
  3. Update answer
TIME: O(n)
SPACE: O(1)
```

### Card 3: Monotonic Deque
```
WHEN: Max/Min in window
TEMPLATE:
  1. Remove outdated elements
  2. Maintain monotonic order
  3. Front has answer
TIME: O(n)
SPACE: O(k)
```

### Card 4: Hash Map Window
```
WHEN: Track frequencies
TEMPLATE:
  1. Add element to map
  2. Shrink if condition violated
  3. Check map for answer
TIME: O(n)
SPACE: O(k)
```

---

## 💡 Pro Tips

1. **Always use `while` for shrinking** - Not `if`
2. **Track what matters** - Sum, count, or frequency
3. **Update answer at right time** - After expansion or before shrinking
4. **Handle empty window** - Check `left <= right`
5. **Optimize map operations** - Use array for small charset

---

## 🎓 Mastery Checklist

- [ ] Can implement fixed window from memory
- [ ] Can implement variable window from memory
- [ ] Understand when to use deque
- [ ] Can combine with hash map
- [ ] Can identify sliding window problems
- [ ] Can write templates without reference
- [ ] Can optimize from O(n²) to O(n)

---

**Master all 4 variations to solve any sliding window problem!**

[← Back to Notes](../Notes.md) | [Easy Problems](Problems/Easy.md)

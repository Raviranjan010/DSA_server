# 09 — Hashing — Complete Notes

> **What You'll Learn**: Hash tables, unordered_map, collision handling, frequency maps, two-sum pattern  
> **Prerequisites**: Arrays, STL basics (Topics 02, 00)  
> **Time Required**: 1 week (10-12 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Extremely high - most used in interviews)

---

## 1. What is Hashing? (Real-World Analogy)

Imagine a **library with a digital catalog system**:

**Without Hashing**: Search every shelf one by one to find a book (O(n)) 😫

**With Hashing**: Use the catalog number to go directly to the book's location (O(1)) ✨

**How it works**:
```
Book: "Harry Potter"
Hash Function → Shelf 7, Position 3
Go directly there! No searching needed!
```

**Hash Table** = Data structure that maps keys to values using a hash function

💡 **TRICK**: **Hashing Mnemonic**: "Magic index calculator" - gives you exact location instantly!

---

## 2. Core Concepts

### Hash Function
Takes a key and returns an index:
```cpp
hash("apple") = 5
hash("banana") = 12
hash("orange") = 3
```

### Collision
When two keys map to the same index:
```cpp
hash("apple") = 5
hash("grape") = 5  // Collision!
```

### Collision Resolution
1. **Chaining**: Store multiple items at same index (linked list)
2. **Open Addressing**: Find next empty slot

---

## 3. Visual Diagram: Hash Table

```
┌─────────────────────────────────────────────────────────────┐
│              HASH TABLE (Chaining)                           │
├──────┬──────────────────────────────────────────────────────┤
│Index │  Chain (Linked List)                                  │
├──────┼──────────────────────────────────────────────────────┤
│  0   │  NULL                                                 │
│  1   │  NULL                                                 │
│  2   │  ["key2" → 200] → NULL                                │
│  3   │  ["orange" → 3] → NULL                                │
│  4   │  NULL                                                 │
│  5   │  ["apple" → 1] → ["grape" → 4] → NULL                │
│  6   │  NULL                                                 │
│  ... │  ...                                                  │
│  12  │  ["banana" → 2] → NULL                                │
└──────┴──────────────────────────────────────────────────────┘

Operations:
- Insert: O(1) average
- Search: O(1) average
- Delete: O(1) average
```

---

## 4. C++ Implementation

### Using unordered_map (STL Hash Table)

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    // Create hash table
    unordered_map<string, int> phoneBook;
    
    // INSERT - O(1)
    phoneBook["Alice"] = 12345;
    phoneBook["Bob"] = 67890;
    phoneBook["Charlie"] = 11111;
    
    // SEARCH - O(1)
    if(phoneBook.count("Alice")) {
        cout << "Alice's number: " << phoneBook["Alice"] << endl;  // 12345
    }
    
    // UPDATE - O(1)
    phoneBook["Alice"] = 99999;
    
    // DELETE - O(1)
    phoneBook.erase("Bob");
    
    // ITERATE - O(n)
    for(auto& pair : phoneBook) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    return 0;
}
```

---

## 5. Essential Hashing Patterns

### Pattern 1: Two Sum (MOST ASKED!)

```cpp
// Time: O(n), Space: O(n)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;  // value → index
    
    for(int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        // Check if complement exists
        if(numMap.count(complement)) {
            return {numMap[complement], i};
        }
        
        // Store current number
        numMap[nums[i]] = i;
    }
    
    return {};  // No solution
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    vector<int> result = twoSum(nums, target);
    cout << "Indices: " << result[0] << ", " << result[1] << endl;
    // Output: 0, 1 (nums[0]=2, nums[1]=7, 2+7=9)
    
    return 0;
}
```

**Dry Run** (`nums=[2,7,11,15]`, target=9):
```
i=0, nums[0]=2:
  complement = 9-2 = 7
  7 not in map
  Add: {2: 0}

i=1, nums[1]=7:
  complement = 9-7 = 2
  2 IS in map! → Found!
  Return {0, 1} ✓
```

💡 **TRICK**: **Two Sum Trick**: Instead of checking all pairs, store seen numbers and check if complement exists!

---

### Pattern 2: Frequency Map

```cpp
// Count frequency of elements
unordered_map<int, int> frequency(const vector<int>& nums) {
    unordered_map<int, int> freq;
    
    for(int num : nums) {
        freq[num]++;  // Increment count
    }
    
    return freq;
}

int main() {
    vector<int> nums = {1, 2, 2, 3, 3, 3, 4};
    auto freq = frequency(nums);
    
    for(auto& pair : freq) {
        cout << pair.first << " appears " << pair.second << " times" << endl;
    }
    // Output:
    // 1 appears 1 times
    // 2 appears 2 times
    // 3 appears 3 times
    // 4 appears 1 times
    
    return 0;
}
```

---

### Pattern 3: Group Anagrams

```cpp
// Time: O(n × k log k), Space: O(n × k)
// n = number of strings, k = max length
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    
    for(string& s : strs) {
        string sorted = s;
        sort(sorted.begin(), sorted.end());  // Sort to get key
        groups[sorted].push_back(s);  // Group anagrams
    }
    
    vector<vector<string>> result;
    for(auto& pair : groups) {
        result.push_back(pair.second);
    }
    
    return result;
}

int main() {
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    auto groups = groupAnagrams(strs);
    
    // Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
    for(auto& group : groups) {
        cout << "[";
        for(string& word : group) {
            cout << word << " ";
        }
        cout << "]" << endl;
    }
    
    return 0;
}
```

---

## 6. All Operations with Time & Space Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert | O(1) | O(n) |
| Search | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Space | O(n) | O(n) |

**Note**: Worst case O(n) when all keys hash to same index (rare with good hash function)

---

## 7. Common Patterns & Tricks

### 💡 TRICK 1: Custom Hash for Pairs
```cpp
struct pair_hash {
    size_t operator()(const pair<int, int>& p) const {
        return p.first ^ p.second;
    }
};

unordered_map<pair<int, int>, int, pair_hash> myMap;
```

### 💡 TRICK 2: Count Distinct Elements
```cpp
unordered_set<int> distinct(nums.begin(), nums.end());
int count = distinct.size();
```

### 💡 TRICK 3: Check Duplicates
```cpp
bool hasDuplicate(const vector<int>& nums) {
    unordered_set<int> seen;
    for(int num : nums) {
        if(seen.count(num)) return true;
        seen.insert(num);
    }
    return false;
}
```

---

## 8. Interview Questions

### Most Asked:
1. **Two Sum** 🏢 [Google] 📅 [Very High]
2. **Group Anagrams** 🏢 [Amazon] 📅 [Very High]
3. **Longest Consecutive Sequence** 🏢 [Google]
4. **Top K Frequent Elements** 🏢 [Meta]
5. **Valid Sudoku** 🏢 [Microsoft]

---

## 9. Practice Problems

### 🟢 Easy:
1. Two Sum
2. Contains Duplicate
3. Valid Anagram

### 🟡 Medium:
4. Group Anagrams 🏢 [Amazon]
5. Longest Consecutive Sequence
6. Top K Frequent Elements

### 🔴 Hard:
7. Longest Substring Without Repeating Characters
8. Minimum Window Substring

---

## 10. Glossary

| Term | Definition |
|------|------------|
| **Hash Table** | Data structure mapping keys to values |
| **Hash Function** | Function converting key to index |
| **Collision** | Two keys mapping to same index |
| **Chaining** | Collision resolution using linked lists |
| **Load Factor** | Ratio of filled slots to total slots |
| **unordered_map** | C++ STL hash table implementation |

---

**🎉 You've mastered Hashing!**

**Next**: [10_Trees](../10_Trees/10_notes.md)

[← Back to README](../README.md)

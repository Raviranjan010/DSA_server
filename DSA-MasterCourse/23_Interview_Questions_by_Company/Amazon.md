# Top 20 Amazon DSA Interview Questions

Amazon emphasizes Customer Obsession in design rounds, but structurally tests fundamental algorithms heavily: **Arrays, Sliding Window, Trees, and Object-Oriented System Design applied to code.** Amazon is known for OAs (Online Assessments) featuring complex string manipulation.

---

### 1. Two Sum
- **Difficulty**: 🟢 Easy
- **Topic Tag**: `[Array]` `[Hashing]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.

**C++ Solution:**
```cpp
// Time Complexity: O(N)
// Space Complexity: O(N)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}
```
**Follow-up by Interviewer**: Can you do it in `O(N log N)` time and `O(1)` space without returning indices? (Sort + Two Pointers).

---

### 2. LRU Cache
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Linked List]` `[Hash Map]` `[Design]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement `get(key)` and `put(key, value)` in `O(1)` average time complexity.

**C++ Solution:**
```cpp
// Use std::list (doubly linked list) to maintain recency
// Use std::unordered_map to get O(1) access
class LRUCache {
    int capacity;
    list<pair<int, int>> dll; 
    unordered_map<int, list<pair<int, int>>::iterator> cache;

public:
    LRUCache(int cap) {
        capacity = cap;
    }
    
    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        
        // Move to front (Most Recently Used)
        dll.splice(dll.begin(), dll, cache[key]);
        return cache[key]->second;
    }
    
    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            // Update value and move to front
            cache[key]->second = value;
            dll.splice(dll.begin(), dll, cache[key]);
            return;
        }
        
        if (cache.size() == capacity) {
            // Evict Least Recently Used
            int lru_key = dll.back().first;
            dll.pop_back();
            cache.erase(lru_key);
        }
        
        dll.push_front({key, value});
        cache[key] = dll.begin();
    }
};
```
**Follow-up by Interviewer**: How would you modify this to be an LFU (Least Frequently Used) cache?

---

### 3. Number of Provinces (Friend Circles)
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Graph]` `[Union-Find]`
- **Frequency**: 📅 High

**Problem Statement:**
There are `n` cities. Some are connected. If city `a` is connected directly with `b`, and `b` with `c`, then `a` is connected indirectly with `c`. A province is a group of connected cities. Find the total number of provinces.

**C++ Solution:**
```cpp
// Using Depth First Search (DFS)
// Time Complexity: O(N^2) for the adjacency matrix
// Space Complexity: O(N) visited array + recursion stack
void dfs(vector<vector<int>>& isConnected, vector<bool>& visited, int i) {
    visited[i] = true;
    for (int j = 0; j < isConnected.size(); j++) {
        if (isConnected[i][j] == 1 && !visited[j]) {
            dfs(isConnected, visited, j);
        }
    }
}

int findCircleNum(vector<vector<int>>& isConnected) {
    int n = isConnected.size();
    vector<bool> visited(n, false);
    int count = 0;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++; // Found a new unconnected component
            dfs(isConnected, visited, i); // Mark the entire component visited
        }
    }
    return count;
}
```
**Follow-up by Interviewer**: Can you implement this using the Disjoint Set Union (DSU) pattern? Which is more resilient to dynamic adding/removing of connections?

---

*Note: The remaining Amazon problems commonly feature Word Break, Cut off Trees for Golf Event, Treasure Island (BFS), and Reorder Data in Log Files.*

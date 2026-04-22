# Top 20 Google DSA Interview Questions

Google heavily tests algorithms related to Trees, Graphs, Advanced DP, and particularly **Binary Search / Segment Trees**. They focus on open-ended problems that can be optimized across multiple iterations.

---

### 1. Find Peak Element
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Binary Search]` `[Arrays]`
- **Frequency**: 📅 Very High

**Problem Statement:**
A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

**C++ Solution:**
```cpp
// Time Complexity: O(log N)
// Space Complexity: O(1)
int findPeakElement(vector<int>& nums) {
    int left = 0;
    int right = nums.size() - 1;
    
    while(left < right) {
        int mid = left + (right - left) / 2;
        // If mid is less than its right neighbor, the peak MUST be 
        // to the right. (Because it's an upward slope).
        if(nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } 
        // Otherwise, mid is greater, so it could be the peak, 
        // or the peak is to the left.
        else {
            right = mid;
        }
    }
    return left;
}
```
**Follow-up by Interviewer**: Can you do this in 2D arrays where a peak is greater than all 4 of its neighbors? (Answer: Yes, Binary Search on the maximum element of a column).

---

### 2. Number of Islands
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Graph]` `[DFS]` `[BFS]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Given an `m x n` 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

**C++ Solution:**
```cpp
// Time Complexity: O(M * N)
// Space Complexity: O(M * N) worst case recursion stack depth
void dfs(vector<vector<char>>& grid, int r, int c) {
    int nr = grid.size();
    int nc = grid[0].size();
    
    // Boundary check and water check
    if(r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == '0') return;
    
    grid[r][c] = '0'; // Sink the island to mark as visited
    
    // Explore all 4 directions
    dfs(grid, r - 1, c);
    dfs(grid, r + 1, c);
    dfs(grid, r, c - 1);
    dfs(grid, r, c + 1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for(int i = 0; i < grid.size(); i++){
        for(int j = 0; j < grid[0].size(); j++){
            if(grid[i][j] == '1'){
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}
```
**Follow-up by Interviewer**: What if the grid is too large to fit in memory? (Use Disjoint Set / Union-Find on streamed rows).

---

### 3. Maximum Path Sum in a Binary Tree
- **Difficulty**: 🔴 Hard
- **Topic Tag**: `[Tree]` `[Tree DP]`
- **Frequency**: 📅 High

**Problem Statement:**
Find the maximum path sum in a binary tree. A path can start and end at any node.

**C++ Solution:**
```cpp
// Time Complexity: O(N)
// Space Complexity: O(H) where H is tree height

int max_sum;

int maxGain(TreeNode* root) {
    if (!root) return 0;
    
    // Max gain from left and right (ignore negative paths)
    int leftGain = max(maxGain(root->left), 0);
    int rightGain = max(maxGain(root->right), 0);
    
    // The price of a path crossing THROUGH this node
    int priceNewPath = root->val + leftGain + rightGain;
    
    // Update global maximum
    max_sum = max(max_sum, priceNewPath);
    
    // Return max gain extending from this node (can only pick one branch)
    return root->val + max(leftGain, rightGain);
}

int maxPathSum(TreeNode* root) {
    max_sum = INT_MIN;
    maxGain(root);
    return max_sum;
}
```
**Follow-up by Interviewer**: What if nodes represent profit, and edges represent travel costs?

---

*Note: The remaining 17 questions outline similarly high-stakes topics like 'Word Ladder' and 'Meeting Rooms III', 'Evaluate Equation', and 'Longest Valid Parentheses'. All demand clean O(V+E) graph tracing or O(N) Array processing.*

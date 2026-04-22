# Top 20 Meta (Facebook) DSA Interview Questions

Meta is famous for asking questions directly from LeetCode. They expect extremely clean, bug-free, optimal code passed in ~15 to 20 minutes per question. Key topics include **Arrays, Prefix Sums, Binary Trees, and Strings**.

---

### 1. Valid Palindrome II
- **Difficulty**: 🟢 Easy
- **Topic Tag**: `[String]` `[Two Pointers]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Given a string `s`, return `true` if the `s` can be palindrome after deleting at most one character from it.

**C++ Solution:**
```cpp
// Helper function to check normal palindrome
bool isValid(string& s, int i, int j) {
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++; j--;
    }
    return true;
}

// Time: O(N)
// Space: O(1)
bool validPalindrome(string s) {
    int i = 0, j = s.length() - 1;
    
    while (i < j) {
        if (s[i] != s[j]) {
            // Mismatch found. We can either delete s[i] or delete s[j].
            // Check if ignoring either one makes the rest a valid palindrome.
            return isValid(s, i + 1, j) || isValid(s, i, j - 1);
        }
        i++; j--;
    }
    return true;
}
```

---

### 2. Lowest Common Ancestor of a Binary Tree
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Tree]` `[DFS]`
- **Frequency**: 📅 Very High

**Problem Statement:**
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

**C++ Solution:**
```cpp
// Time Complexity: O(N)
// Space Complexity: O(H) implicit recursion stack
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root; // Base case
    
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    // If both left and right return a node, current node is the LCA
    if (left && right) return root;
    
    // Otherwise, return whoever is not null
    return left ? left : right;
}
```

---

### 3. Kth Largest Element in an Array (QuickSelect)
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Array]` `[Divide and Conquer]`
- **Frequency**: 📅 High

**Problem Statement:**
Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array. Can you solve it without sorting?

**C++ Solution:**
```cpp
// Approach: QuickSelect (Hoare's Partition Scheme variant)
// Time Complexity: O(N) average, O(N^2) worst case
// Space Complexity: O(1) inside partition

int partition(vector<int>& nums, int left, int right) {
    int pivot = nums[right];
    int pIndex = left; // Where the pivot should eventually land
    
    for (int i = left; i < right; i++) {
        // Find elements smaller than pivot and push to left
        if (nums[i] <= pivot) {
            swap(nums[i], nums[pIndex]);
            pIndex++;
        }
    }
    swap(nums[pIndex], nums[right]); // Put pivot in correct place
    return pIndex;
}

int findKthLargest(vector<int>& nums, int k) {
    int targetIndex = nums.size() - k; // Converts "Kth largest" to proper index for ascending sort
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int pivotIndex = partition(nums, left, right);
        
        if (pivotIndex == targetIndex) {
            return nums[pivotIndex]; // Found it
        } else if (pivotIndex < targetIndex) {
            left = pivotIndex + 1; // Discard left half
        } else {
            right = pivotIndex - 1; // Discard right half
        }
    }
    return -1;
}
```
**Follow-up by Interviewer**: Can you implement this utilizing a Heap? (Yes: `std::priority_queue<int, vector<int>, greater<int>>` keeping the min-heap size to `K` takes O(N log K)).

---

*Note: Further top Meta problems include Validate Binary Search Tree, Subarray Sum Equals K, Merge Intervals, and Building an optimal Standard Calculator / Add Strings.*

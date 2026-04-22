# 10 — Trees — Complete Notes

> **What You'll Learn**: Binary tree, traversals (inorder, preorder, postorder, level order), tree properties, diameter, height  
> **Prerequisites**: Recursion, Linked Lists (Topics 04, 06)  
> **Time Required**: 2 weeks (18-20 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Foundation for BST, Heaps, Graphs)

---

## 1. What is a Tree? (Real-World Analogy)

Imagine a **family tree** or a **company organizational chart**:

```
                    CEO
                   /   \
              Manager1  Manager2
              /    \        |
          TeamA  TeamB    TeamC
          /  \
      Dev1  Dev2
```

**Tree** = A hierarchical data structure with:
- **Root**: Top-most node (CEO)
- **Children**: Nodes directly below (Manager1, Manager2)
- **Parent**: Node directly above
- **Leaf**: Node with no children (Dev1, Dev2, TeamC)
- **Height**: Longest path from root to leaf

💡 **TRICK**: Think of trees as **upside-down real trees** — root at top, branches going down!

---

## 2. Binary Tree Basics

**Binary Tree**: Each node has AT MOST 2 children (left and right)

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

**Visual**:
```
        1
       / \
      2   3
     / \   \
    4   5   6
```

---

## 3. Tree Traversals (MOST IMPORTANT!)

### 3.1 Inorder Traversal (Left → Root → Right)

**Use**: BST gives sorted order!

```cpp
// Time: O(n), Space: O(n)
void inorder(TreeNode* root) {
    if(root == nullptr) return;
    
    inorder(root->left);        // Visit left subtree
    cout << root->val << " ";   // Visit root
    inorder(root->right);       // Visit right subtree
}

// Output for tree above: 4 2 5 1 3 6
```

**Visualization**:
```
        1
       / \
      2   3
     / \   \
    4   5   6

Path: 4 → 2 → 5 → 1 → 3 → 6
      ↑   ↑   ↑   ↑   ↑   ↑
     L   R   L   R   L   R (relative to parent)
```

---

### 3.2 Preorder Traversal (Root → Left → Right)

**Use**: Copy/serialize tree

```cpp
void preorder(TreeNode* root) {
    if(root == nullptr) return;
    
    cout << root->val << " ";   // Visit root FIRST
    preorder(root->left);
    preorder(root->right);
}

// Output: 1 2 4 5 3 6
```

---

### 3.3 Postorder Traversal (Left → Right → Root)

**Use**: Delete tree (children before parent)

```cpp
void postorder(TreeNode* root) {
    if(root == nullptr) return;
    
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";   // Visit root LAST
}

// Output: 4 5 2 6 3 1
```

💡 **TRICK**: **Traversal Mnemonic**:
- **In**order: Left-**IN**-Right (root in middle)
- **Pre**order: **PRE** (root before children)
- **Post**order: **POST** (root after children)

---

### 3.4 Level Order Traversal (BFS)

**Use**: Print tree level by level

```cpp
#include <queue>
#include <vector>

// Time: O(n), Space: O(n)
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if(!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while(!q.empty()) {
        int size = q.size();
        vector<int> level;
        
        for(int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            level.push_back(node->val);
            
            if(node->left) q.push(node->left);
            if(node->right) q.push(node->right);
        }
        
        result.push_back(level);
    }
    
    return result;
}

// Output: [[1], [2,3], [4,5,6]]
```

---

## 4. Essential Tree Problems

### Pattern 1: Maximum Depth/Height

```cpp
// Time: O(n), Space: O(n)
int maxDepth(TreeNode* root) {
    if(root == nullptr) return 0;
    
    int leftHeight = maxDepth(root->left);
    int rightHeight = maxDepth(root->right);
    
    return 1 + max(leftHeight, rightHeight);
}
```

**Dry Run**:
```
        1
       / \
      2   3
     /
    4

maxDepth(4) = 1 (leaf)
maxDepth(2) = 1 + maxDepth(4) = 2
maxDepth(3) = 1 (leaf)
maxDepth(1) = 1 + max(2, 1) = 3 ✓
```

---

### Pattern 2: Diameter of Binary Tree

**Longest path between any two nodes**

```cpp
int diameter = 0;

int diameterOfBinaryTree(TreeNode* root) {
    height(root);
    return diameter;
}

int height(TreeNode* node) {
    if(!node) return 0;
    
    int leftH = height(node->left);
    int rightH = height(node->right);
    
    // Update diameter: longest path through this node
    diameter = max(diameter, leftH + rightH);
    
    return 1 + max(leftH, rightH);
}
```

---

### Pattern 3: Check if Balanced

```cpp
// Time: O(n), Space: O(n)
bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int checkHeight(TreeNode* node) {
    if(!node) return 0;
    
    int leftH = checkHeight(node->left);
    if(leftH == -1) return -1;  // Left subtree unbalanced
    
    int rightH = checkHeight(node->right);
    if(rightH == -1) return -1;  // Right subtree unbalanced
    
    if(abs(leftH - rightH) > 1) return -1;  // Unbalanced
    
    return 1 + max(leftH, rightH);
}
```

---

## 5. All Operations with Time & Space Complexity

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Traversal (all types) | O(n) | O(n) | Visit each node once |
| Height/Depth | O(n) | O(n) | Recursive stack |
| Search (general) | O(n) | O(n) | Must check all nodes |
| Search (BST) | O(log n) | O(log n) | Use BST property |
| Insert (BST) | O(log n) | O(log n) | Find position |
| Delete (BST) | O(log n) | O(log n) | Complex cases |

---

## 6. Common Patterns & Tricks

### 💡 TRICK 1: DFS Template
```cpp
void dfs(TreeNode* root) {
    if(!root) return;
    
    // Process root
    dfs(root->left);
    dfs(root->right);
}
```

### 💡 TRICK 2: BFS Template
```cpp
queue<TreeNode*> q;
q.push(root);
while(!q.empty()) {
    TreeNode* node = q.front(); q.pop();
    if(node->left) q.push(node->left);
    if(node->right) q.push(node->right);
}
```

---

## 7. Interview Questions

### Most Asked:
1. **Maximum Depth** 🏢 [Amazon]
2. **Same Tree** 🏢 [Google]
3. **Invert Binary Tree** 🏢 [Google]
4. **Level Order Traversal** 🏢 [Amazon, Microsoft]
5. **Validate BST** 🏢 [Amazon]
6. **Lowest Common Ancestor** 🏢 [Google, Meta]
7. **Binary Tree Maximum Path Sum** 🏢 [Google]

---

## 8. Practice Problems

### 🟢 Easy:
1. Maximum Depth
2. Same Tree
3. Symmetric Tree
4. Invert Binary Tree

### 🟡 Medium:
5. Level Order Traversal 🏢 [Amazon]
6. Validate BST 🏢 [Amazon]
7. Lowest Common Ancestor 🏢 [Google]

### 🔴 Hard:
8. Binary Tree Maximum Path Sum 🏢 [Google]
9. Serialize and Deserialize Tree

---

**🎉 You've mastered Trees!**

**Next**: [11_Binary_Search_Tree](../11_Binary_Search_Tree/11_notes.md)

[← Back to README](../README.md)

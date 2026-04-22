# 11 — Binary Search Tree — Complete Notes

> **What You'll Learn**: BST properties, search, insert, delete, validation, LCA, inorder successor/predecessor  
> **Prerequisites**: Trees, Recursion (Topics 10, 04)  
> **Time Required**: 1.5 weeks (14-16 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Very high in interviews)

---

## 1. What is a BST? (Real-World Analogy)

Imagine a **dictionary** or **phone book**:

```
Looking for "Smith"?
- Open to middle: "Miller"
- "Smith" > "Miller" → Go to RIGHT half
- Open to middle: "Taylor"
- "Smith" < "Taylor" → Go to LEFT half
- Found "Smith"! ✨
```

**Binary Search Tree (BST)** = Binary tree with special property:
- Left subtree < Root < Right subtree
- Enables fast search: O(log n) average

💡 **TRICK**: **BST Property**: "Left is smaller, right is larger!"

---

## 2. Visual Diagram: BST

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13

Search for 6:
6 < 8 → go left
6 > 3 → go right
Found 6! ✓

Path: 8 → 3 → 6 (3 steps vs 7 in linear search)
```

---

## 3. Core Operations

```cpp
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// SEARCH - O(log n) average, O(n) worst
TreeNode* searchBST(TreeNode* root, int val) {
    if(!root || root->val == val) return root;
    
    if(val < root->val)
        return searchBST(root->left, val);
    else
        return searchBST(root->right, val);
}

// INSERT - O(log n) average
TreeNode* insertBST(TreeNode* root, int val) {
    if(!root) return new TreeNode(val);
    
    if(val < root->val)
        root->left = insertBST(root->left, val);
    else if(val > root->val)
        root->right = insertBST(root->right, val);
    
    return root;
}

// DELETE - O(log n) average
TreeNode* deleteNode(TreeNode* root, int key) {
    if(!root) return nullptr;
    
    if(key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if(key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node found
        if(!root->left) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        } else if(!root->right) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }
        
        // Node with two children
        TreeNode* minNode = findMin(root->right);
        root->val = minNode->val;
        root->right = deleteNode(root->right, minNode->val);
    }
    
    return root;
}

TreeNode* findMin(TreeNode* node) {
    while(node && node->left) node = node->left;
    return node;
}
```

---

## 4. Validate BST

```cpp
// Time: O(n), Space: O(n)
bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}

bool validate(TreeNode* node, long minVal, long maxVal) {
    if(!node) return true;
    
    if(node->val <= minVal || node->val >= maxVal)
        return false;
    
    return validate(node->left, minVal, node->val) &&
           validate(node->right, node->val, maxVal);
}
```

**Visualization**:
```
        5
       / \
      1   4
         / \
        3   6

Validate:
Root 5: range (-∞, ∞) ✓
Left 1: range (-∞, 5) ✓
Right 4: range (5, ∞) ✗ (4 < 5)

NOT a valid BST!
```

---

## 5. Lowest Common Ancestor (LCA)

```cpp
// Time: O(log n), Space: O(1)
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while(root) {
        if(p->val < root->val && q->val < root->val) {
            root = root->left;
        } else if(p->val > root->val && q->val > root->val) {
            root = root->right;
        } else {
            return root;  // Split point found
        }
    }
    return nullptr;
}
```

**Example**:
```
        6
       / \
      2   8
     / \ / \
    0  4 7  9
      / \
     3   5

LCA(2, 8) = 6
LCA(2, 4) = 2
LCA(3, 5) = 4
```

---

## 6. Inorder Successor

```cpp
// Time: O(log n), Space: O(1)
TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
    TreeNode* successor = nullptr;
    
    while(root) {
        if(p->val >= root->val) {
            root = root->right;
        } else {
            successor = root;
            root = root->left;
        }
    }
    
    return successor;
}
```

---

## 7. BST to Sorted Array (Inorder)

```cpp
// Inorder traversal gives sorted order!
void inorder(TreeNode* root, vector<int>& result) {
    if(!root) return;
    inorder(root->left, result);
    result.push_back(root->val);
    inorder(root->right, result);
}
```

---

## 8. Complexity Summary

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Validate | O(n) | O(n) |
| LCA | O(log n) | O(n) |

**Note**: Worst case O(n) when tree is skewed (like a linked list)

---

## 9. Interview Questions

### Most Asked:
1. **Validate BST** 🏢 [Amazon] 📅 [Very High]
2. **Lowest Common Ancestor** 🏢 [Google] 📅 [High]
3. **Kth Smallest Element in BST** 🏢 [Microsoft]
4. **Inorder Successor** 🏢 [Meta]

---

## 10. Glossary

| Term | Definition |
|------|------------|
| **BST** | Binary tree with left < root < right |
| **LCA** | Lowest Common Ancestor |
| **Inorder Successor** | Next node in inorder traversal |
| **Balanced BST** | Height difference ≤ 1 between subtrees |

---

**🎉 You've mastered BST!**

**Next**: [12_Heaps_and_Priority_Queue](../12_Heaps_and_Priority_Queue/12_notes.md)

[← Back to README](../README.md)

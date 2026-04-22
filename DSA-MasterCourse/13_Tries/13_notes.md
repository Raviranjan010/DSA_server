# 13 — Tries — Complete Notes

> **What You'll Learn**: Trie structure, insert, search, prefix search, autocomplete, word dictionary  
> **Prerequisites**: Trees, Strings (Topics 10, 03)  
> **Time Required**: 1 week (10-12 hours)  
> **Importance**: 🌟🌟🌟🌟 (High - autocomplete, dictionary problems)

---

## 1. What is a Trie? (Real-World Analogy)

Imagine a **dictionary's table of contents** or **phone contacts with predictive text**:

```
Searching for "cat" in contacts:
C → CA → CAT → Found!

Predictive text:
You type "app" → suggests "apple", "application", "appstore"
```

**Trie** (pronounced "try") = Tree-like structure for storing strings efficiently
- Each node represents a character
- Path from root to node = prefix
- Enables fast prefix-based searches

💡 **TRICK**: **Trie Mnemonic**: "**Tri**e = **Tri**e to find words by prefix!"

**Real-World Uses**:
- 🔍 Autocomplete in search engines
- 📱 Predictive text on phones
- 📖 Spell checkers
- 🌐 IP routing tables

---

## 2. Visual Diagram: Trie Structure

```
Insert: "cat", "car", "cart", "dog"

        root
       /    \
      c      d
     / \     |
    a   a    o
   /|   |    |
  t r   t    g
  |   |     (end)
(end) r
      |
      t
      |
    (end)

Search "car": c → a → r → Found! ✓
Search "ca": c → a → Not marked as end ✗
Prefix "ca": c → a → Exists! ✓
```

---

## 3. C++ Implementation

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() {
        isEndOfWord = false;
    }
};

class Trie {
private:
    TrieNode* root;
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    // INSERT - O(m) where m = word length
    void insert(string word) {
        TrieNode* current = root;
        
        for(char c : word) {
            if(current->children.find(c) == current->children.end()) {
                current->children[c] = new TrieNode();
            }
            current = current->children[c];
        }
        
        current->isEndOfWord = true;
    }
    
    // SEARCH - O(m)
    bool search(string word) {
        TrieNode* current = root;
        
        for(char c : word) {
            if(current->children.find(c) == current->children.end()) {
                return false;
            }
            current = current->children[c];
        }
        
        return current->isEndOfWord;
    }
    
    // STARTS WITH - O(m)
    bool startsWith(string prefix) {
        TrieNode* current = root;
        
        for(char c : prefix) {
            if(current->children.find(c) == current->children.end()) {
                return false;
            }
            current = current->children[c];
        }
        
        return true;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("app");
    
    cout << trie.search("apple") << endl;   // 1 (true)
    cout << trie.search("app") << endl;     // 1 (true)
    cout << trie.startsWith("app") << endl; // 1 (true)
    cout << trie.search("appl") << endl;    // 0 (false)
    
    return 0;
}
```

---

## 4. Essential Patterns

### Pattern 1: Word Dictionary with Wildcard

```cpp
// Supports '.' wildcard matching any character
class WordDictionary {
private:
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool isEnd = false;
    };
    
    TrieNode* root;
    
    bool searchWithDot(string& word, int index, TrieNode* node) {
        if(index == word.size()) return node->isEnd;
        
        char c = word[index];
        if(c == '.') {
            // Try all possible children
            for(auto& pair : node->children) {
                if(searchWithDot(word, index + 1, pair.second))
                    return true;
            }
            return false;
        } else {
            if(node->children.find(c) == node->children.end())
                return false;
            return searchWithDot(word, index + 1, node->children[c]);
        }
    }
    
public:
    WordDictionary() {
        root = new TrieNode();
    }
    
    void addWord(string word) {
        TrieNode* node = root;
        for(char c : word) {
            if(!node->children.count(c))
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        return searchWithDot(word, 0, root);
    }
};
```

---

### Pattern 2: Implement Magic Dictionary

```cpp
// Check if any word differs by exactly one character
class MagicDictionary {
private:
    TrieNode* root;
    
public:
    MagicDictionary() {
        root = new TrieNode();
    }
    
    void buildDict(vector<string> dictionary) {
        for(string& word : dictionary) {
            insert(word);
        }
    }
    
    bool search(string word) {
        return searchHelper(word, 0, root, 0);
    }
    
    bool searchHelper(string& word, int idx, TrieNode* node, int diff) {
        if(diff > 1) return false;
        
        if(idx == word.size()) {
            return diff == 1 && node->isEnd;
        }
        
        for(auto& pair : node->children) {
            int newDiff = diff + (pair.first != word[idx] ? 1 : 0);
            if(searchHelper(word, idx + 1, pair.second, newDiff))
                return true;
        }
        
        return false;
    }
};
```

---

## 5. Autocomplete Implementation

```cpp
// Find all words with given prefix
void findAllWords(TrieNode* node, string& current, vector<string>& result) {
    if(node->isEndOfWord) {
        result.push_back(current);
    }
    
    for(auto& pair : node->children) {
        current.push_back(pair.first);
        findAllWords(pair.second, current, result);
        current.pop_back();  // Backtrack
    }
}

vector<string> autocomplete(TrieNode* root, string prefix) {
    vector<string> result;
    TrieNode* node = root;
    
    // Navigate to prefix end
    for(char c : prefix) {
        if(!node->children.count(c)) return result;
        node = node->children[c];
    }
    
    string current = prefix;
    findAllWords(node, current, result);
    return result;
}
```

---

## 6. Complexity Summary

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(m) | O(m×n×Σ) |
| Search | O(m) | O(m×n×Σ) |
| Prefix Search | O(m) | O(m×n×Σ) |
| Autocomplete | O(m + k) | O(m×n×Σ) |

Where:
- m = word length
- n = number of words
- Σ = alphabet size

---

## 7. Interview Questions

### Most Asked:
1. **Implement Trie** 🏢 [Google] 📅 [High]
2. **Word Search II** 🏢 [Amazon]
3. **Word Break II** 🏢 [Google]
4. **Design Add and Search Words** 🏢 [Microsoft]

---

## 8. Glossary

| Term | Definition |
|------|------------|
| **Trie** | Prefix tree for string storage |
| **Prefix** | Beginning part of a string |
| **Autocomplete** | Suggest words based on prefix |
| **Wildcard** | Special character matching any letter |

---

**🎉 You've mastered Tries!**

**Next**: [14_Graphs](../14_Graphs/14_notes.md)

[← Back to README](../README.md)

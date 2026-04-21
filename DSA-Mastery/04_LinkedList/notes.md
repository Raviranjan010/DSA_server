# Linked List - Complete Guide

## 📚 How to Use This Module

**Learning Path**:
1. **Read** [notes.md](notes.md) ← You are here
2. **Practice** [practice.md](practice.md) - Solve problems level by level
3. **Check Solutions** [solutions.md](solutions.md) - Only after attempting
4. **Test Yourself** [mcqs.md](mcqs.md) - MCQs for self-assessment
5. **Quick Review** [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md) - 5-minute revision
6. **If Stuck** [If_You_Get_Stuck.md](If_You_Get_Stuck.md) - Problem-solving strategy
7. **Avoid Traps** [Common_Interview_Traps.md](Common_Interview_Traps.md) - Interview mistakes

## Table of Contents

1. [What is a Linked List?](#1-what-is-a-linked-list)
2. [Types of Linked Lists](#2-types-of-linked-lists)
3. [Basic Operations & Complexity](#3-basic-operations--complexity)
4. [Two Pointers (Fast & Slow)](#4-two-pointers-fast--slow)
5. [Dummy Node Technique](#5-dummy-node-technique)
6. [Reversal Patterns](#6-reversal-patterns)
7. [Decision Guide (When to Use What)](#7-decision-guide-when-to-use-what)
8. [Arrays → Linked List Pattern Mapping](#8-arrays--linked-list-pattern-mapping)
9. [Constraint → Approach Mapping](#9-constraint--approach-mapping)
10. [Pattern Index Table](#10-pattern-index-table-quick-revision)
11. [Common Edge Cases](#11-common-edge-cases-in-linked-lists)
12. [Interview Pattern Triggers](#12-interview-pattern-triggers)
13. [Common Linked List Pitfalls](#13-common-linked-list-pitfalls)
14. [Must Master Problems](#14-must-master-problems)
15. [3-Layer Learning Approach](#15-3-layer-learning-approach)

---

## 1. What is a Linked List?

### Simple Definition

**Linked List** = A linear data structure where elements (nodes) are connected via pointers.

**Real-Life Example**: 
- Train: Each car connected to next car
- Treasure hunt: Each clue points to next location
- Chain: Each link connected to next link

### Array vs Linked List

| Feature | Array | Linked List |
|---------|-------|-------------|
| **Memory** | Contiguous | Non-contiguous |
| **Access** | O(1) random access | O(n) sequential |
| **Insert/Delete** | O(n) shifting | O(1) if pointer known |
| **Size** | Fixed | Dynamic |
| **Memory Overhead** | None | Extra pointer per node |

### Node Structure

```cpp
struct ListNode {
    int val;
    ListNode* next;
    
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* next) : val(x), next(next) {}
};
```

**Visual**:
```
Node: [val | next]
       ↓
      [val | next]
             ↓
            [val | nullptr]
```

---

## 2. Types of Linked Lists

### Singly Linked List
```
Head → [1|→] → [2|→] → [3|→] → nullptr
```
- Each node points to next node
- Traverse only forward

### Doubly Linked List
```
Head → nullptr ← [1|↔] ↔ [2|↔] ↔ [3|↔] → nullptr ← Tail
```
- Each node has next AND prev pointers
- Traverse both directions

```cpp
struct DoublyListNode {
    int val;
    DoublyListNode* prev;
    DoublyListNode* next;
};
```

### Circular Linked List
```
     ┌─────────────┐
     ↓             │
Head → [1|→] → [2|→] → [3|→] ┘
```
- Last node points back to head
- No null terminator

### Why Learn Linked Lists?

- **Foundation** for complex data structures
- **Interview favorite**: Tests pointer manipulation
- **Memory efficient** for frequent insertions/deletions
- **Builds logic** for trees and graphs

---

## 3. Basic Operations & Complexity

### Insertion

**At Beginning O(1)**:
```cpp
ListNode* insertAtHead(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    newNode->next = head;
    return newNode;  // New head
}
```

**At End O(n)**:
```cpp
ListNode* insertAtTail(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    if (!head) return newNode;
    
    ListNode* temp = head;
    while (temp->next) {
        temp = temp->next;
    }
    temp->next = newNode;
    return head;
}
```

**At Position O(n)**:
```cpp
void insertAtPosition(ListNode* head, int pos, int val) {
    if (pos == 0) {
        insertAtHead(head, val);
        return;
    }
    
    ListNode* temp = head;
    for (int i = 0; i < pos - 1 && temp; i++) {
        temp = temp->next;
    }
    
    if (!temp) return;  // Position out of bounds
    
    ListNode* newNode = new ListNode(val);
    newNode->next = temp->next;
    temp->next = newNode;
}
```

### Deletion

**Delete by Value O(n)**:
```cpp
ListNode* deleteNode(ListNode* head, int val) {
    if (!head) return nullptr;
    
    // If head needs to be deleted
    if (head->val == val) {
        ListNode* newHead = head->next;
        delete head;
        return newHead;
    }
    
    // Find node before target
    ListNode* temp = head;
    while (temp->next && temp->next->val != val) {
        temp = temp->next;
    }
    
    if (temp->next) {
        ListNode* toDelete = temp->next;
        temp->next = temp->next->next;
        delete toDelete;
    }
    
    return head;
}
```

### Traversal

```cpp
void printList(ListNode* head) {
    ListNode* temp = head;
    while (temp) {
        cout << temp->val << " ";
        temp = temp->next;
    }
    cout << endl;
}
```

---

## 4. Two Pointers (Fast & Slow)

### Pattern 1: Detect Cycle

```cpp
bool hasCycle(ListNode* head) {
    if (!head || !head->next) return false;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;          // Move 1 step
        fast = fast->next->next;    // Move 2 steps
        
        if (slow == fast) {         // Cycle detected!
            return true;
        }
    }
    
    return false;
}
```

**Why it works**:
- If cycle exists, fast pointer will eventually "lap" slow pointer
- Like runners on a circular track
- Fast gains 1 step per iteration on slow

### Pattern 2: Find Middle

```cpp
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    return slow;  // Slow is at middle
}
```

**Detailed Dry Run**:
```
List: 1 → 2 → 3 → 4 → 5

Step 0: slow=1, fast=1
Step 1: slow=2, fast=3
Step 2: slow=3, fast=5 (fast->next is null, stop)

Middle: 3 ✓

List: 1 → 2 → 3 → 4

Step 0: slow=1, fast=1
Step 1: slow=2, fast=3
Step 2: slow=3, fast=null (stop)

Middle: 3 (second middle for even length) ✓
```

### Pattern 3: Find Cycle Start

```cpp
ListNode* detectCycle(ListNode* head) {
    if (!head || !head->next) return nullptr;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    // Detect cycle
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) {
            // Cycle found, find start
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;  // Cycle start
        }
    }
    
    return nullptr;
}
```

**Why this works**:
- When slow and fast meet, they're equidistant from cycle start
- Reset slow to head, move both at same speed
- They'll meet at cycle start

---

## 5. Dummy Node Technique

### What is a Dummy Node?

A dummy node simplifies edge cases when head might change:

```cpp
ListNode* removeElements(ListNode* head, int val) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* current = &dummy;
    
    while (current->next) {
        if (current->next->val == val) {
            current->next = current->next->next;
        } else {
            current = current->next;
        }
    }
    
    return dummy.next;
}
```

**Without dummy**: Need special case for head deletion
**With dummy**: Uniform logic for all cases

### When to Use Dummy Node?

- Head might be deleted/modified
- Merging two lists
- Removing nodes with specific value
- Partitioning list

---

## 6. Reversal Patterns

### Pattern 1: Reverse Entire List

**Iterative Approach**:
```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    
    while (current) {
        ListNode* nextTemp = current->next;  // Save next
        current->next = prev;                 // Reverse pointer
        prev = current;                       // Move prev forward
        current = nextTemp;                   // Move current forward
    }
    
    return prev;  // New head
}
```

**Detailed Dry Run**:
```
Original: 1 → 2 → 3 → nullptr

Iteration 1:
  nextTemp = 2
  1->next = nullptr
  prev = 1
  current = 2
  
  Result: 1 → nullptr, prev=1

Iteration 2:
  nextTemp = 3
  2->next = 1
  prev = 2
  current = 3
  
  Result: 2 → 1 → nullptr, prev=2

Iteration 3:
  nextTemp = nullptr
  3->next = 2
  prev = 3
  current = nullptr
  
  Result: 3 → 2 → 1 → nullptr, prev=3

Final: 3 → 2 → 1 → nullptr ✓
```

**Visual**:
```
Initial:
  prev=nullptr, current=1
  
  1 → 2 → 3
  ↑
  current

After 1st iteration:
  nullptr ← 1   2 → 3
              ↑   ↑
            prev current

After 2nd iteration:
  nullptr ← 1 ← 2   3
                  ↑   ↑
                prev current

Final:
  nullptr ← 1 ← 2 ← 3
                      ↑
                    prev (return this)
```

### Pattern 2: Reverse Sublist (Position m to n)

```cpp
ListNode* reverseBetween(ListNode* head, int m, int n) {
    if (!head || m == n) return head;
    
    ListNode dummy(0);
    dummy.next = head;
    ListNode* prev = &dummy;
    
    // Move to position m
    for (int i = 0; i < m - 1; i++) {
        prev = prev->next;
    }
    
    // Reverse from m to n
    ListNode* current = prev->next;
    for (int i = 0; i < n - m; i++) {
        ListNode* next = current->next;
        current->next = next->next;
        next->next = prev->next;
        prev->next = next;
    }
    
    return dummy.next;
}
```

---

## 7. Decision Guide (When to Use What)

### Quick Decision Framework

```
Linked List Problem?
    ↓
Need to detect cycle or find middle?
    ↓ YES → Use Fast & Slow Pointers
    ↓ NO
    ↓
Head might change (delete/modify)?
    ↓ YES → Use Dummy Node
    ↓ NO
    ↓
Need to reverse (entire or partial)?
    ↓ YES → Use Reversal Pattern
    ↓ NO
    ↓
Merge or partition?
    ↓ YES → Use Dummy + Two Pointers
    ↓ NO
    ↓
Sort or find kth from end?
    ↓ YES → Use appropriate pattern
```

---

## 8. Arrays → Linked List Pattern Mapping

### How Array Techniques Translate

| Array Pattern | Linked List Equivalent | Example |
|--------------|----------------------|----------|
| Two Pointers | Fast & Slow Pointers | Detect cycle, find middle |
| Reverse Array | Reverse Linked List | Three pointer technique |
| Insert at Position | Insert in List | Traverse + pointer manipulation |
| Delete Element | Delete Node | Update next pointer |
| Merge Sorted Arrays | Merge Sorted Lists | Dummy node + comparison |
| Find kth Element | Find kth from End | Two pointers with gap |

### Key Differences

**Arrays**:
- Random access O(1)
- Contiguous memory
- Index-based operations
- No extra memory per element

**Linked Lists**:
- Sequential access O(n)
- Dynamic memory allocation
- Pointer-based operations
- Extra memory for pointers
- Easy insertions/deletions

---

## 9. Constraint → Approach Mapping

### Problem Constraints Guide

| Constraint | Implies | Approach |
|------------|---------|----------|
| n ≤ 10⁵ | O(n) or O(n log n) | Single/triple pass, merge sort |
| O(1) space | No extra data structures | In-place modification, two pointers |
| Sorted list | Already ordered | Merge technique, two pointers |
| Cycle detection | May have loops | Fast & slow pointers |
| kth element | Position-based | Two pointers with gap k |
| Modify head | Head changes | Dummy node |

---

## 10. Pattern Index Table (Quick Revision)

| Pattern | When to Use | Time | Space | Key Idea | Example Problems |
|---------|-------------|------|-------|----------|------------------|
| **Fast & Slow Pointers** | Cycle, middle, kth element | O(n) | O(1) | Different speeds | Detect cycle, find middle |
| **Dummy Node** | Head might change | O(n) | O(1) | Fake head node | Remove elements, merge |
| **Reversal** | Reverse list/sublist | O(n) | O(1) | prev, current, next | Reverse list, palindrome |
| **Two Pass** | Length needed first | O(n) | O(1) | First pass: length, second: solve | Remove nth from end |
| **Hash Map** | Find duplicates, cycles | O(n) | O(n) | Store visited nodes | Detect cycle, find intersection |
| **Merge Technique** | Combine sorted lists | O(n log k) | O(1) | Compare heads | Merge k sorted lists |

---

## 11. Common Edge Cases in Linked Lists

### Edge Case Categories

#### 1. Empty List
- **Case**: head = nullptr
- **Impact**: All operations fail
- **Fix**: Always check `if (!head)` first

#### 2. Single Node
- **Case**: head->next = nullptr
- **Impact**: Loops don't execute, reversals trivial
- **Fix**: Test with single node

#### 3. Two Nodes
- **Case**: head->next->next = nullptr
- **Impact**: Minimal iterations, edge for reversal
- **Fix**: Verify with exactly 2 nodes

#### 4. All Same Values
- **Case**: 1 → 1 → 1 → 1
- **Impact**: Comparison logic may fail
- **Fix**: Test with duplicates

#### 5. Already Sorted/Reverse Sorted
- **Case**: 1 → 2 → 3 → 4 or 4 → 3 → 2 → 1
- **Impact**: Best/worst case for sorting
- **Fix**: Verify both cases

#### 6. Cycle Present
- **Case**: Last node points to earlier node
- **Impact**: Infinite loops
- **Fix**: Use fast/slow pointers to detect

#### 7. k Larger Than Length
- **Case**: Find 10th node in 5-node list
- **Impact**: Null pointer dereference
- **Fix**: Check bounds

#### 8. m or n Out of Bounds (Sublist)
- **Case**: Reverse from position 0 or > length
- **Impact**: Invalid operations
- **Fix**: Validate m, n range

### Edge Case Checklist

Before submitting:
- [ ] Tested with empty list?
- [ ] Tested with single node?
- [ ] Tested with two nodes?
- [ ] Checked for cycles?
- [ ] Verified k/m/n within bounds?
- [ ] Handled head deletion?
- [ ] No null pointer dereference?
- [ ] Memory properly freed?

---

## 12. Interview Pattern Triggers

### Trigger 1: "Cycle" Keywords
**Keywords**: "cycle", "loop", "circular", "repeats"
**Immediate Thought**: Fast & Slow Pointers
**Code Template**:
```cpp
ListNode* slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true;  // Cycle!
}
```

### Trigger 2: "Middle" Keywords
**Keywords**: "middle", "center", "median position"
**Immediate Thought**: Fast & Slow (fast moves 2x)
**Code Template**:
```cpp
ListNode* slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
}
return slow;  // Middle node
```

### Trigger 3: "Reverse" Keywords
**Keywords**: "reverse", "backward", "opposite order"
**Immediate Thought**: Three Pointer Reversal
**Code Template**:
```cpp
ListNode* prev = nullptr, *current = head;
while (current) {
    ListNode* next = current->next;
    current->next = prev;
    prev = current;
    current = next;
}
return prev;
```

### Trigger 4: "Head May Change" Keywords
**Keywords**: "remove head", "delete first", "may modify head"
**Immediate Thought**: Dummy Node
**Code Template**:
```cpp
ListNode dummy(0);
dummy.next = head;
ListNode* current = &dummy;
// ... operations ...
return dummy.next;
```

### Trigger 5: "kth from End" Keywords
**Keywords**: "kth from end", "nth from last", "remove nth from end"
**Immediate Thought**: Two Pointers with Gap
**Code Template**:
```cpp
ListNode* first = head, *second = head;
// Move first k steps ahead
for (int i = 0; i < k; i++) first = first->next;
// Move both until first reaches end
while (first) {
    first = first->next;
    second = second->next;
}
return second;  // kth from end
```

---

## 13. Common Linked List Pitfalls

### Pitfall 1: Null Pointer Dereference

```cpp
// WRONG ❌
while (head->next) {  // Crashes if head is nullptr!
    head = head->next;
}

// CORRECT ✅
while (head && head->next) {
    head = head->next;
}
```

### Pitfall 2: Losing Reference

```cpp
// WRONG ❌
ListNode* reverse(ListNode* head) {
    head->next = nullptr;  // Lost rest of list!
    // Can't access remaining nodes
}

// CORRECT ✅
ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* next = head->next;  // Save next
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}
```

### Pitfall 3: Forgetting to Update Pointers

```cpp
// WRONG ❌
void deleteNode(ListNode* node) {
    node = node->next;  // Only changes local variable!
}

// CORRECT ✅
void deleteNode(ListNode* node) {
    node->val = node->next->val;
    node->next = node->next->next;
}
```

### Pitfall 4: Memory Leaks

```cpp
// WRONG ❌
ListNode* remove(ListNode* head, int val) {
    if (head->val == val) {
        return head->next;  // Forgot to delete!
    }
}

// CORRECT ✅
ListNode* remove(ListNode* head, int val) {
    if (head->val == val) {
        ListNode* newHead = head->next;
        delete head;  // Free memory
        return newHead;
    }
}
```

### Pitfall 5: Infinite Loops with Cycles

```cpp
// WRONG ❌
while (current) {  // Infinite loop if cycle exists!
    current = current->next;
}

// CORRECT ✅ (if cycle possible)
ListNode* slow = head, *fast = head;
while (fast && fast->next) {
    // Process nodes
    slow = slow->next;
    fast = fast->next->next;
}
```

### Pitfall Checklist

Before submitting:
- [ ] Check for nullptr before accessing?
- [ ] Save next pointer before modifying?
- [ ] Return correct new head?
- [ ] Free deleted nodes (if required)?
- [ ] Handle cycles properly?
- [ ] Test with empty/single node?
- [ ] No infinite loops possible?

---

## 14. Must Master Problems

### Tier 1: Absolute Must (Interview Essentials)

1. **Reverse Linked List** - Foundation pattern
2. **Detect Cycle** - Fast & slow pointers
3. **Merge Two Sorted Lists** - Dummy node technique
4. **Remove Nth Node From End** - Two pointers with gap
5. **Middle of Linked List** - Fast & slow basic
6. **Linked List Cycle II** - Find cycle start

### Tier 2: Strong Foundation (Common in FAANG)

7. **Palindrome Linked List** - Reverse + compare
8. **Intersection of Two Lists** - Two pointer trick
9. **Remove Duplicates** - In-place modification
10. **Reorder List** - Find middle + reverse + merge
11. **Add Two Numbers** - Math + traversal
12. **Copy List with Random Pointer** - Hash map or interweaving

### Tier 3: Advanced (For Senior Roles)

13. **Merge K Sorted Lists** - Priority queue or divide & conquer
14. **Reverse Nodes in K-Group** - Complex reversal
15. **LRU Cache** - Doubly linked list + hash map
16. **Flatten Multilevel Doubly List** - DFS + pointer manipulation
17. **Sort List** - Merge sort on linked list
18. **Rotate List** - Find length + rotate

### How to Master:

**Week 1**: Tier 1 (solve each 3 times)
**Week 2**: Tier 2 (solve each 2 times)
**Week 3**: Tier 3 (solve once, understand deeply)
**Week 4**: Mock interviews with random problems

---

## 15. 3-Layer Learning Approach

### Layer 1: Beginner (Understand)
- Draw linked list operations
- Trace pointer movements step by step
- Use dummy nodes to simplify
- Master basic traversal

### Layer 2: Intermediate (Apply)
- Recognize patterns (cycle, reversal, merge)
- Choose right technique for problem
- Handle edge cases systematically
- Write clean pointer manipulation

### Layer 3: Advanced (Master)
- Solve without dummy nodes when needed
- Optimize to O(1) space
- Combine multiple patterns
- Design complex structures (LRU Cache)

---

## 🧠 Active Recall Questions

### Basic Understanding
1. What is the difference between array and linked list?
2. Why use a dummy node?
3. How do fast and slow pointers detect a cycle?
4. What happens if you forget to save the next pointer during reversal?
5. When should you use a dummy node vs. handle head separately?

### Application
6. How to find the middle of a linked list in one pass?
7. How to detect if two linked lists intersect?
8. How to reverse a sublist from position m to n?
9. What's the time complexity of inserting at the end?
10. How to remove duplicates from a sorted linked list?

### Interview Prep
11. Explain why fast & slow pointers guarantee meeting in a cycle
12. How to reverse a linked list recursively?
13. When would you use a hash map vs. two pointers for cycle detection?
14. How to merge k sorted linked lists efficiently?
15. Design an LRU Cache with O(1) operations

---

**Next Topic**: After completing all practice problems and scoring 80%+ on MCQs, move to [05_Stack](../05_Stack/notes.md)

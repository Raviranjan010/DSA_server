# 06 — Linked List — Complete Notes

> **What You'll Learn**: Singly, Doubly, Circular linked lists; Fast-slow pointer; Reversal techniques; Cycle detection  
> **Prerequisites**: Arrays, Pointers (Topics 02, 00)  
> **Time Required**: 1.5 weeks (15-18 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Very high in interviews)

---

## 1. What is a Linked List? (Real-World Analogy)

Imagine a **treasure hunt** where each clue tells you where to find the next clue:

```
Clue 1: "Go to position A" → [Data: 10 | Next: 📍A]
                                    ↓
Clue 2: "Go to position B" → [Data: 20 | Next: 📍B]
                                    ↓
Clue 3: "Go to position C" → [Data: 30 | Next: 📍C]
                                    ↓
Final Clue: "You found it!"  → [Data: 40 | Next: NULL]
```

**Linked List** = A chain of **nodes**, where each node contains:
- **Data**: The actual value
- **Next**: Pointer to the next node

**Key Difference from Arrays**:
- Arrays: Contiguous memory (all elements together)
- Linked Lists: Scattered memory (elements connected by pointers)

💡 **TRICK**: Think of linked lists as a **chain of paper clips** — each clip holds data and connects to the next!

---

## 2. Why Do We Need Linked Lists?

### Advantages over Arrays:
✅ **Dynamic size**: Grow/shrink as needed (no fixed size)  
✅ **Fast insertion/deletion**: O(1) if you have the pointer  
✅ **No memory waste**: Use exactly what you need  
✅ **No resizing overhead**: Unlike vectors  

### Disadvantages:
❌ **No random access**: Must traverse from head (O(n) access)  
❌ **Extra memory**: Each node stores pointer  
❌ **Cache unfriendly**: Nodes scattered in memory  

### Real-World Uses:
- Browser history (back/forward buttons)
- Undo/Redo in text editors
- Music playlist (next/previous song)
- Hash table collision handling (chaining)

---

## 3. Core Concepts & Terminology

### 3.1 Singly Linked List

```cpp
#include <iostream>
using namespace std;

// Node structure
struct Node {
    int data;        // Data part
    Node* next;      // Pointer to next node
    
    // Constructor
    Node(int val) {
        data = val;
        next = nullptr;
    }
};

// Visual: [10|→] → [20|→] → [30|→] → [40|NULL]
```

**Complete Implementation**:

```cpp
class LinkedList {
private:
    Node* head;  // Pointer to first node
    
public:
    LinkedList() {
        head = nullptr;  // Empty list initially
    }
    
    // Insert at beginning - O(1)
    void insertAtHead(int val) {
        Node* newNode = new Node(val);  // Create new node
        newNode->next = head;           // Point to current head
        head = newNode;                 // Update head
    }
    
    // Insert at end - O(n)
    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        
        if(head == nullptr) {  // Empty list
            head = newNode;
            return;
        }
        
        Node* temp = head;
        while(temp->next != nullptr) {  // Traverse to end
            temp = temp->next;
        }
        temp->next = newNode;  // Link last node to new node
    }
    
    // Delete by value - O(n)
    void deleteNode(int val) {
        if(head == nullptr) return;
        
        // If head node itself holds the value
        if(head->data == val) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        
        // Search for the node to delete
        Node* current = head;
        while(current->next != nullptr && current->next->data != val) {
            current = current->next;
        }
        
        // If value found
        if(current->next != nullptr) {
            Node* temp = current->next;
            current->next = current->next->next;  // Skip the node
            delete temp;
        }
    }
    
    // Search for element - O(n)
    bool search(int val) {
        Node* current = head;
        while(current != nullptr) {
            if(current->data == val) {
                return true;
            }
            current = current->next;
        }
        return false;
    }
    
    // Print list
    void print() {
        Node* temp = head;
        while(temp != nullptr) {
            cout << temp->data << " → ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
    
    // Destructor - Free memory
    ~LinkedList() {
        Node* current = head;
        while(current != nullptr) {
            Node* next = current->next;
            delete current;
            current = next;
        }
    }
};

int main() {
    LinkedList ll;
    
    ll.insertAtTail(10);
    ll.insertAtTail(20);
    ll.insertAtHead(5);
    ll.insertAtTail(30);
    
    cout << "List: ";
    ll.print();  // 5 → 10 → 20 → 30 → NULL
    
    ll.deleteNode(20);
    cout << "After deleting 20: ";
    ll.print();  // 5 → 10 → 30 → NULL
    
    cout << "Search 10: " << (ll.search(10) ? "Found" : "Not Found") << endl;
    
    return 0;
}
```

---

## 4. Visual Diagram: Linked List Operations

```
┌─────────────────────────────────────────────────────────────┐
│              LINKED LIST OPERATIONS                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. INSERT AT HEAD (O(1))                                   │
│     New Node(5) → [10|→] → [20|→] → NULL                   │
│          ↓                                                   │
│     head points to new node                                  │
│                                                              │
│  2. INSERT AT TAIL (O(n))                                   │
│     [10|→] → [20|→] → New Node(30)                          │
│          Traverse to end, then link                          │
│                                                              │
│  3. DELETE NODE (O(n))                                      │
│     [10|→] → [20|→] → [30|→]                                │
│          ↓ Skip 20                                           │
│     [10|───────────→] → [30|→]                              │
│                                                              │
│  4. REVERSE LIST                                            │
│     Before: [10|→] → [20|→] → [30|NULL]                     │
│     After:  [30|→] → [20|→] → [10|NULL]                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Essential Linked List Patterns

### Pattern 1: Reverse Linked List

```cpp
// Iterative reversal - O(n) time, O(1) space
Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* current = head;
    Node* next = nullptr;
    
    while(current != nullptr) {
        next = current->next;      // Store next node
        current->next = prev;      // Reverse the link
        prev = current;            // Move prev forward
        current = next;            // Move current forward
    }
    
    return prev;  // New head
}
```

**Dry Run**:
```
Original: 1 → 2 → 3 → NULL

Iteration 1:
prev = NULL, current = 1, next = 2
1 → NULL (reversed)

Iteration 2:
prev = 1, current = 2, next = 3
2 → 1 → NULL

Iteration 3:
prev = 2, current = 3, next = NULL
3 → 2 → 1 → NULL ✓

Result: 3 → 2 → 1 → NULL
```

---

### Pattern 2: Detect Cycle (Floyd's Algorithm)

**Analogy**: Two runners on a track — faster runner will eventually lap the slower one!

```cpp
// Floyd's Cycle Detection - O(n) time, O(1) space
bool hasCycle(Node* head) {
    Node* slow = head;  // Moves 1 step
    Node* fast = head;  // Moves 2 steps
    
    while(fast != nullptr && fast->next != nullptr) {
        slow = slow->next;           // Move slow by 1
        fast = fast->next->next;     // Move fast by 2
        
        if(slow == fast) {
            return true;  // Cycle detected!
        }
    }
    
    return false;  // No cycle
}
```

**Visualization**:
```
List with cycle: 1 → 2 → 3 → 4 → 5
                      ↑         ↓
                      ← 6 ← 7 ←

Step 0: slow=1, fast=1
Step 1: slow=2, fast=3
Step 2: slow=3, fast=5
Step 3: slow=4, fast=4 ← MEET! Cycle detected ✓
```

💡 **TRICK**: **Floyd's Mnemonic**: "Tortoise and Hare" — if there's a cycle, the hare catches the tortoise!

---

### Pattern 3: Find Middle Element

```cpp
// Find middle using fast-slow pointers - O(n) time
Node* findMiddle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    
    while(fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    return slow;  // Middle node
}
```

**Why it works**: When fast reaches end (2x speed), slow is at middle!

---

### Pattern 4: Merge Two Sorted Lists

```cpp
// Merge two sorted linked lists - O(n+m) time
Node* mergeTwoLists(Node* l1, Node* l2) {
    // Create dummy node
    Node* dummy = new Node(0);
    Node* current = dummy;
    
    while(l1 != nullptr && l2 != nullptr) {
        if(l1->data <= l2->data) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }
    
    // Attach remaining nodes
    if(l1 != nullptr) current->next = l1;
    if(l2 != nullptr) current->next = l2;
    
    return dummy->next;
}
```

---

## 6. Doubly Linked List

Each node has **two pointers**: previous and next!

```cpp
struct DoublyNode {
    int data;
    DoublyNode* prev;
    DoublyNode* next;
    
    DoublyNode(int val) {
        data = val;
        prev = nullptr;
        next = nullptr;
    }
};

// Visual: NULL ← [10|↔] ↔ [20|↔] ↔ [30|↔] → NULL
```

**Advantage**: Can traverse both directions!

---

## 7. All Operations with Time & Space Complexity

| Operation | Singly LL | Doubly LL | Array |
|-----------|-----------|-----------|-------|
| Access by index | O(n) | O(n) | O(1) |
| Search | O(n) | O(n) | O(n) |
| Insert at head | O(1) | O(1) | O(n) |
| Insert at tail | O(n) | O(1) with tail ptr | O(1) |
| Delete by value | O(n) | O(n) | O(n) |
| Insert after node | O(1) | O(1) | O(n) |

---

## 8. Common Patterns & Tricks

### 💡 TRICK 1: Dummy Node Pattern
```cpp
// Simplifies edge cases
Node* dummy = new Node(0);
dummy->next = head;
// Work with dummy->next
```

### 💡 TRICK 2: Two Pointer Techniques
```cpp
// Find nth node from end
Node* fast = head;
for(int i = 0; i < n; i++) fast = fast->next;

Node* slow = head;
while(fast != nullptr) {
    slow = slow->next;
    fast = fast->next;
}
return slow;  // nth from end
```

---

## 9-13. [Complete sections with more examples, dry runs, MCQs, interview questions]

---

**🎉 Congratulations! You've mastered Linked Lists!**

**Next Steps**:
1. ✅ Complete MCQs in `06_mcqs.md`
2. ✅ Solve 20 linked list problems
3. ✅ Move to **07_Stack**

[← Back to README](../README.md) | [Next: Stack →](../07_Stack/07_notes.md)

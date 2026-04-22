# 07 — Stack — Complete Notes

> **What You'll Learn**: Stack operations, monotonic stack, next greater element, valid parentheses, expression evaluation  
> **Prerequisites**: Arrays, Linked Lists (Topics 02, 06)  
> **Time Required**: 1 week (10-12 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Very high in interviews)

---

## 1. What is a Stack? (Real-World Analogy)

Imagine a **stack of plates** in a cafeteria:

```
┌─────────────┐
│   Plate 5   │  ← TOP (Add/Remove from here)
├─────────────┤
│   Plate 4   │
├─────────────┤
│   Plate 3   │
├─────────────┤
│   Plate 2   │
├─────────────┤
│   Plate 1   │  ← BOTTOM
└─────────────┘
```

**Stack** = Last In, First Out (LIFO) data structure
- **Push**: Add to top
- **Pop**: Remove from top
- **Peek**: Look at top without removing

💡 **TRICK**: **Stack Mnemonic**: "Last plate added is the first one you wash!"

**Real-World Examples**:
- 📚 Browser back button (pages stacked)
- 📝 Undo/Redo in text editors
- 🧮 Function call stack
- 📦 Reversing strings/items

---

## 2. Core Operations

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Stack Implementation using Vector
class Stack {
private:
    vector<int> data;
    
public:
    // Push element to top - O(1)
    void push(int x) {
        data.push_back(x);
    }
    
    // Pop element from top - O(1)
    int pop() {
        if(isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        int top = data.back();
        data.pop_back();
        return top;
    }
    
    // Peek top element - O(1)
    int peek() {
        if(isEmpty()) return -1;
        return data.back();
    }
    
    // Check if empty - O(1)
    bool isEmpty() {
        return data.empty();
    }
    
    // Get size - O(1)
    int size() {
        return data.size();
    }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    
    cout << "Top: " << s.peek() << endl;    // 30
    cout << "Pop: " << s.pop() << endl;     // 30
    cout << "Top: " << s.peek() << endl;    // 20
    
    return 0;
}
```

---

## 3. Visual Diagram: Stack Operations

```
┌─────────────────────────────────────────────────────────────┐
│              STACK OPERATIONS                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PUSH(10)  PUSH(20)  PUSH(30)                               │
│  [10]  →   [10,20] →  [10,20,30]                           │
│                                                              │
│  POP() → removes 30                                          │
│  [10, 20]                                                    │
│                                                              │
│  PEEK() → see 20 without removing                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Essential Stack Patterns

### Pattern 1: Valid Parentheses

```cpp
// Time: O(n), Space: O(n)
bool isValid(string s) {
    stack<char> st;
    
    for(char c : s) {
        if(c == '(' || c == '{' || c == '[') {
            st.push(c);  // Push opening brackets
        } else {
            if(st.empty()) return false;  // No matching opening
            
            char top = st.top();
            if((c == ')' && top == '(') ||
               (c == '}' && top == '{') ||
               (c == ']' && top == '[')) {
                st.pop();  // Matching pair found
            } else {
                return false;  // Mismatch
            }
        }
    }
    
    return st.empty();  // Should be empty if valid
}

int main() {
    cout << isValid("()[]{}") << endl;  // 1 (true)
    cout << isValid("(]") << endl;      // 0 (false)
    
    return 0;
}
```

**Dry Run** (`"()[]{}"`):
```
Char: (  → Stack: ['(']
Char: )  → Match! Pop → Stack: []
Char: [  → Stack: ['[']
Char: ]  → Match! Pop → Stack: []
Char: {  → Stack: ['{']
Char: }  → Match! Pop → Stack: []

Empty at end → Valid! ✓
```

---

### Pattern 2: Next Greater Element

```cpp
// Time: O(n), Space: O(n)
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);  // Default: no greater element
    stack<int> st;  // Store indices
    
    for(int i = 0; i < n; i++) {
        // While current is greater than stack top
        while(!st.empty() && nums[i] > nums[st.top()]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    
    return result;
}

int main() {
    vector<int> nums = {4, 5, 2, 25};
    vector<int> result = nextGreaterElement(nums);
    
    // Output: [5, 25, 25, -1]
    for(int num : result) cout << num << " ";
    
    return 0;
}
```

**Visualization**:
```
Array: [4, 5, 2, 25]

i=0, val=4: Stack: [0]
i=1, val=5: 5>4 → result[0]=5, pop
            Stack: [1]
i=2, val=2: Stack: [1, 2]
i=3, val=25: 25>2 → result[2]=25, pop
             25>5 → result[1]=25, pop
             Stack: [3]

Result: [5, 25, 25, -1] ✓
```

💡 **TRICK**: **Monotonic Stack Pattern**: Maintain increasing/decreasing stack for "next greater/smaller" problems!

---

### Pattern 3: Min Stack

```cpp
// Stack that supports getMin() in O(1)
class MinStack {
private:
    stack<int> data;
    stack<int> minStack;
    
public:
    void push(int x) {
        data.push(x);
        // Push to minStack if smaller or empty
        if(minStack.empty() || x <= minStack.top()) {
            minStack.push(x);
        }
    }
    
    int pop() {
        if(data.empty()) return -1;
        int val = data.top();
        data.pop();
        
        // Remove from minStack if it was the minimum
        if(val == minStack.top()) {
            minStack.pop();
        }
        return val;
    }
    
    int getMin() {
        if(minStack.empty()) return -1;
        return minStack.top();
    }
};
```

---

## 5. All Operations with Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Push | O(1) | O(1) |
| Pop | O(1) | O(1) |
| Peek/Top | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| Valid Parentheses | O(n) | O(n) |
| Next Greater Element | O(n) | O(n) |
| Min Stack | O(1) | O(n) |

---

## 6. Common Patterns & Tricks

### 💡 TRICK 1: Monotonic Stack Template
```cpp
stack<int> st;
for(int i = 0; i < n; i++) {
    while(!st.empty() && nums[i] > nums[st.top()]) {
        // Process element
        st.pop();
    }
    st.push(i);
}
```

### 💡 TRICK 2: Two Stacks = Queue
```cpp
// Implement queue using two stacks
stack<int> s1, s2;

void enqueue(int x) {
    s1.push(x);
}

int dequeue() {
    if(s2.empty()) {
        while(!s1.empty()) {
            s2.push(s1.top());
            s1.pop();
        }
    }
    int val = s2.top();
    s2.pop();
    return val;
}
```

---

## 7. Interview Questions

### Most Asked:
1. **Valid Parentheses** 🏢 [Google] 📅 [Very High]
2. **Next Greater Element** 🏢 [Amazon] 📅 [High]
3. **Min Stack** 🏢 [Microsoft] 📅 [High]
4. **Largest Rectangle in Histogram** 🏢 [Google]
5. **Evaluate Reverse Polish Notation** 🏢 [Meta]

---

## 8. Practice Problems

### 🟢 Easy:
1. Valid Parentheses
2. Min Stack
3. Implement Stack using Queues

### 🟡 Medium:
4. Next Greater Element 🏢 [Amazon]
5. Evaluate Reverse Polish Notation
6. Daily Temperatures

### 🔴 Hard:
7. Largest Rectangle in Histogram 🏢 [Google]
8. Maximal Rectangle
9. Remove K Digits

---

## 9. Glossary

| Term | Definition |
|------|------------|
| **Stack** | LIFO data structure |
| **Push** | Add element to top |
| **Pop** | Remove element from top |
| **Peek** | View top element without removing |
| **Monotonic Stack** | Stack maintaining sorted order |
| **LIFO** | Last In, First Out |

---

**🎉 You've mastered Stack!**

**Next**: [08_Queue_and_Deque](../08_Queue_and_Deque/08_notes.md)

[← Back to README](../README.md)

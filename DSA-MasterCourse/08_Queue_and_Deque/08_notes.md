# 08 — Queue and Deque — Complete Notes

> **What You'll Learn**: Queue operations, circular queue, deque, sliding window maximum, monotonic queue  
> **Prerequisites**: Arrays, Stack (Topics 02, 07)  
> **Time Required**: 1 week (10-12 hours)  
> **Importance**: 🌟🌟🌟🌟 (High - BFS, sliding window)

---

## 1. What is a Queue? (Real-World Analogy)

Imagine a **line at a ticket counter**:

```
Entrance → [Person1] [Person2] [Person3] [Person4] → Exit
           ↑                                    ↑
        BACK (Enqueue)                      FRONT (Dequeue)
```

**Queue** = First In, First Out (FIFO) data structure
- **Enqueue**: Add to back
- **Dequeue**: Remove from front
- **Front**: Peek at first element

💡 **TRICK**: **Queue Mnemonic**: "First person in line gets served first!"

**Real-World Examples**:
- 🖨️ Printer queue (documents print in order)
- 🎫 Ticket booking system
- 🌐 BFS traversal in graphs
- 📞 Call center waiting queue

---

## 2. Core Operations

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // Enqueue - O(1)
    q.push(10);
    q.push(20);
    q.push(30);
    
    // Front - O(1)
    cout << "Front: " << q.front() << endl;  // 10
    
    // Back - O(1)
    cout << "Back: " << q.back() << endl;    // 30
    
    // Dequeue - O(1)
    q.pop();  // Removes 10
    
    cout << "New Front: " << q.front() << endl;  // 20
    cout << "Size: " << q.size() << endl;        // 2
    cout << "Empty: " << q.empty() << endl;      // 0 (false)
    
    return 0;
}
```

---

## 3. Visual Diagram: Queue Operations

```
┌─────────────────────────────────────────────────────────────┐
│              QUEUE OPERATIONS                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ENQUEUE(10)  ENQUEUE(20)  ENQUEUE(30)                       │
│  [10]  →      [10,20]  →   [10,20,30]                       │
│   ↑                              ↑                          │
│ FRONT                         BACK                           │
│                                                              │
│  DEQUEUE() → removes 10                                      │
│  [20, 30]                                                    │
│   ↑                                                          │
│  FRONT                                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Deque (Double-Ended Queue)

**Deque** = Can add/remove from BOTH ends!

```cpp
#include <deque>

int main() {
    deque<int> dq;
    
    // Add to back
    dq.push_back(10);
    dq.push_back(20);
    
    // Add to front
    dq.push_front(5);
    
    // Remove from back
    dq.pop_back();   // Removes 20
    
    // Remove from front
    dq.pop_front();  // Removes 5
    
    return 0;
}
```

---

## 5. Essential Patterns

### Pattern 1: Sliding Window Maximum

```cpp
// Time: O(n), Space: O(k)
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // Store indices
    vector<int> result;
    
    for(int i = 0; i < nums.size(); i++) {
        // Remove indices outside window
        if(!dq.empty() && dq.front() == i - k) {
            dq.pop_front();
        }
        
        // Remove smaller elements from back
        while(!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // Add maximum for this window
        if(i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}

int main() {
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    
    vector<int> result = maxSlidingWindow(nums, k);
    
    // Output: [3, 3, 5, 5, 6, 7]
    for(int num : result) cout << num << " ";
    
    return 0;
}
```

**Dry Run** (`nums=[1,3,-1,-3,5,3,6,7]`, k=3):
```
i=0, val=1: dq=[0]
i=1, val=3: 3>1, remove 0 → dq=[1]
i=2, val=-1: dq=[1,2], window=[1,3,-1], max=3
i=3, val=-3: dq=[1,2,3], window=[3,-1,-3], max=3
i=4, val=5: 5>-3> -1>3, remove all → dq=[4], max=5
i=5, val=3: dq=[4,5], window=[-3,5,3], max=5
i=6, val=6: 6>5>3, remove → dq=[6], max=6
i=7, val=7: 7>6, remove → dq=[7], max=7

Result: [3, 3, 5, 5, 6, 7] ✓
```

💡 **TRICK**: **Monotonic Deque**: Maintain decreasing deque for sliding window maximum!

---

### Pattern 2: Circular Queue

```cpp
class CircularQueue {
private:
    vector<int> data;
    int front, rear, size, capacity;
    
public:
    CircularQueue(int k) {
        capacity = k;
        data.resize(k);
        front = 0;
        rear = -1;
        size = 0;
    }
    
    bool enqueue(int value) {
        if(isFull()) return false;
        rear = (rear + 1) % capacity;
        data[rear] = value;
        size++;
        return true;
    }
    
    bool dequeue() {
        if(isEmpty()) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }
    
    int Front() {
        return isEmpty() ? -1 : data[front];
    }
    
    bool isFull() { return size == capacity; }
    bool isEmpty() { return size == 0; }
};
```

---

## 6. Complexity Summary

| Operation | Time | Space |
|-----------|------|-------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) | O(1) |
| Front/Back | O(1) | O(1) |
| Sliding Window Max | O(n) | O(k) |

---

## 7. Interview Questions

### Most Asked:
1. **Sliding Window Maximum** 🏢 [Google] 📅 [High]
2. **First Negative in Every Window** 🏢 [Amazon]
3. **Circular Queue Implementation**

---

## 8. Glossary

| Term | Definition |
|------|------------|
| **Queue** | FIFO data structure |
| **Deque** | Double-ended queue |
| **FIFO** | First In, First Out |
| **Monotonic Queue** | Queue maintaining sorted order |

---

**🎉 You've mastered Queue and Deque!**

**Next**: [09_Hashing](../09_Hashing/09_notes.md)

[← Back to README](../README.md)

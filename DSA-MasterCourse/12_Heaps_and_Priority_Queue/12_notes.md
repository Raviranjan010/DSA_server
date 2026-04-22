# 12 — Heaps and Priority Queue — Complete Notes

> **What You'll Learn**: Min-heap, max-heap, heap operations, priority queue, heap sort, top-k problems  
> **Prerequisites**: Trees, Arrays (Topics 10, 02)  
> **Time Required**: 1 week (12-14 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Very high - top-k problems everywhere)

---

## 1. What is a Heap? (Real-World Analogy)

Imagine a **hospital emergency room**:

```
Priority 1 (Critical) → Treated FIRST
Priority 2 (Urgent)   → Treated SECOND
Priority 3 (Normal)   → Treated LAST
```

**Heap** = Special tree-based structure where parent is always greater (max-heap) or smaller (min-heap) than children

💡 **TRICK**: **Heap Mnemonic**: "Boss always on top!" - largest/smallest element always at root!

---

## 2. Visual Diagram: Binary Heap

```
MAX-HEAP (Parent >= Children)
        50
       /  \
      30   20
     /  \  /
    15  10 5

Array representation: [50, 30, 20, 15, 10, 5]
Index relationships:
- Parent(i) = (i-1)/2
- Left(i) = 2i+1
- Right(i) = 2i+2
```

---

## 3. Core Operations

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Max-Heap Implementation
class MaxHeap {
private:
    vector<int> heap;
    
    void heapifyUp(int index) {
        while(index > 0) {
            int parent = (index - 1) / 2;
            if(heap[index] > heap[parent]) {
                swap(heap[index], heap[parent]);
                index = parent;
            } else {
                break;
            }
        }
    }
    
    void heapifyDown(int index) {
        int size = heap.size();
        int largest = index;
        
        while(true) {
            int left = 2 * index + 1;
            int right = 2 * index + 2;
            
            if(left < size && heap[left] > heap[largest])
                largest = left;
            if(right < size && heap[right] > heap[largest])
                largest = right;
            
            if(largest != index) {
                swap(heap[index], heap[largest]);
                index = largest;
            } else {
                break;
            }
        }
    }
    
public:
    // Insert - O(log n)
    void push(int val) {
        heap.push_back(val);
        heapifyUp(heap.size() - 1);
    }
    
    // Extract max - O(log n)
    int pop() {
        if(heap.empty()) return -1;
        
        int maxVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        
        if(!heap.empty()) {
            heapifyDown(0);
        }
        
        return maxVal;
    }
    
    // Peek max - O(1)
    int top() {
        return heap.empty() ? -1 : heap[0];
    }
    
    bool empty() {
        return heap.empty();
    }
};

int main() {
    MaxHeap maxHeap;
    maxHeap.push(30);
    maxHeap.push(20);
    maxHeap.push(50);
    maxHeap.push(10);
    
    cout << "Max: " << maxHeap.top() << endl;    // 50
    cout << "Pop: " << maxHeap.pop() << endl;    // 50
    cout << "Max: " << maxHeap.top() << endl;    // 30
    
    return 0;
}
```

---

## 4. STL Priority Queue

```cpp
#include <queue>

// Max-Heap (default)
priority_queue<int> maxHeap;
maxHeap.push(10);
maxHeap.push(30);
maxHeap.push(20);
cout << maxHeap.top();  // 30

// Min-Heap
priority_queue<int, vector<int>, greater<int>> minHeap;
minHeap.push(10);
minHeap.push(30);
minHeap.push(20);
cout << minHeap.top();  // 10
```

---

## 5. Essential Patterns

### Pattern 1: Top K Elements

```cpp
// Find K largest elements - O(n log k)
vector<int> topK(const vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for(int num : nums) {
        minHeap.push(num);
        if(minHeap.size() > k) {
            minHeap.pop();  // Remove smallest
        }
    }
    
    vector<int> result;
    while(!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }
    
    return result;
}
```

---

### Pattern 2: Merge K Sorted Lists

```cpp
// Time: O(n log k), Space: O(k)
ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    // Add all elements to heap
    for(auto head : lists) {
        while(head) {
            minHeap.push(head->val);
            head = head->next;
        }
    }
    
    // Build merged list
    ListNode* dummy = new ListNode(0);
    ListNode* current = dummy;
    
    while(!minHeap.empty()) {
        current->next = new ListNode(minHeap.top());
        minHeap.pop();
        current = current->next;
    }
    
    return dummy->next;
}
```

---

## 6. Heap Sort

```cpp
// Time: O(n log n), Space: O(1)
void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for(int i = n/2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements one by one
    for(int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    
    if(left < n && arr[left] > arr[largest])
        largest = left;
    if(right < n && arr[right] > arr[largest])
        largest = right;
    
    if(largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
```

---

## 7. Complexity Summary

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(log n) | O(1) |
| Extract Max/Min | O(log n) | O(1) |
| Peek | O(1) | O(1) |
| Heapify | O(n) | O(1) |
| Heap Sort | O(n log n) | O(1) |

---

## 8. Interview Questions

### Most Asked:
1. **Top K Frequent Elements** 🏢 [Meta] 📅 [Very High]
2. **Kth Largest Element** 🏢 [Google] 📅 [Very High]
3. **Merge K Sorted Lists** 🏢 [Amazon]
4. **Find Median from Data Stream** 🏢 [Google]

---

## 9. Glossary

| Term | Definition |
|------|------------|
| **Heap** | Tree where parent > children (max) or < children (min) |
| **Priority Queue** | Abstract data type using heap |
| **Heapify** | Convert array to heap |
| **Top-K** | Find k largest/smallest elements |

---

**🎉 You've mastered Heaps!**

**Next**: [11_Binary_Search_Tree](../11_Binary_Search_Tree/11_notes.md)

[← Back to README](../README.md)

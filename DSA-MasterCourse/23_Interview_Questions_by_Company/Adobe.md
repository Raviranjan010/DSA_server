# Top 20 Adobe DSA Interview Questions

Adobe tests heavy mathematical problems, **Dynamic Programming**, and string processing heavily. They enjoy system-like string matching and recursive mathematical puzzles.

---

### 1. Add Two Numbers (Linked Lists)
- **Difficulty**: 🟡 Medium
- **Topic Tag**: `[Linked List]` `[Math]`
- **Frequency**: 📅 High

**Problem Statement:**
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return it as a linked list.

**C++ Solution:**
```cpp
// Time Complexity: O(max(N, M))
// Space Complexity: O(max(N, M)) for result list
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode* dummyHead = new ListNode(0);
    ListNode* curr = dummyHead;
    int carry = 0;
    
    while (l1 != NULL || l2 != NULL || carry != 0) {
        int x = (l1 != NULL) ? l1->val : 0;
        int y = (l2 != NULL) ? l2->val : 0;
        
        int sum = carry + x + y;
        carry = sum / 10;
        
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
        
        if (l1 != NULL) l1 = l1->next;
        if (l2 != NULL) l2 = l2->next;
    }
    
    return dummyHead->next;
}
```

---

*(Remaining outline items omitted for brevity)*

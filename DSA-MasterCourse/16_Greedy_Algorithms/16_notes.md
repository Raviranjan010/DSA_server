# 16 — Greedy Algorithms — Complete Notes

> **What You'll Learn**: Greedy choice property, activity selection, Huffman coding, interval scheduling, fractional knapsack  
> **Prerequisites**: Sorting, DP basics (Topics 05, 15)  
> **Time Required**: 1 week (10-12 hours)  
> **Importance**: 🌟🌟🌟🌟 (High - optimal solutions when applicable)

---

## 1. What are Greedy Algorithms? (Real-World Analogy)

Imagine you're at a **buffet** and want to maximize value:

**Greedy Approach**: At each step, pick the most valuable item available RIGHT NOW!
- Don't worry about future consequences
- Make locally optimal choice at each step

**Real-World Examples**:
- 💰 Making change with minimum coins
- 📅 Scheduling meetings to maximize count
- 🎒 Packing most valuable items in limited space

💡 **TRICK**: **Greedy Mnemonic**: "Take the best now, hope for the best later!"

---

## 2. When Does Greedy Work?

Greedy works when TWO properties hold:

### ✅ Property 1: Greedy Choice Property
Global optimum can be reached by local optimal choices

### ✅ Property 2: Optimal Substructure
Optimal solution contains optimal solutions to subproblems

**Example Where Greedy Works**: Activity Selection  
**Example Where Greedy Fails**: 0/1 Knapsack (need DP instead)

---

## 3. Activity Selection Problem

**Problem**: Select maximum number of non-overlapping activities

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Time: O(n log n), Space: O(1)
int activitySelection(vector<pair<int,int>>& activities) {
    // Sort by finish time (GREEDY CHOICE)
    sort(activities.begin(), activities.end(), 
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 1;  // First activity always selected
    int lastFinish = activities[0].second;
    
    for(int i = 1; i < activities.size(); i++) {
        // Select if start time >= last finish time
        if(activities[i].first >= lastFinish) {
            count++;
            lastFinish = activities[i].second;
        }
    }
    
    return count;
}

int main() {
    vector<pair<int,int>> activities = {{1,3}, {2,5}, {4,6}, {6,8}, {5,7}};
    
    cout << "Maximum activities: " << activitySelection(activities) << endl;
    // Output: 3 (activities: {1,3}, {4,6}, {6,8})
    
    return 0;
}
```

**Visualization**:
```
Activities:
[1-----3]
  [2-------5]
        [4-----6]
              [6---8]
          [5-----7]

Greedy choice (earliest finish):
✓ [1-----3]  (finish at 3)
✓       [4-----6]  (start 4 >= 3)
✓               [6---8]  (start 6 >= 6)

Total: 3 activities ✓
```

---

## 4. Fractional Knapsack

**Problem**: Maximize value, can take fractions of items

```cpp
// Time: O(n log n), Space: O(1)
double fractionalKnapsack(int W, vector<pair<int,int>>& items) {
    // Calculate value/weight ratio
    vector<tuple<double,int,int>> itemsWithRatio;
    for(auto& item : items) {
        double ratio = (double)item.second / item.first;
        itemsWithRatio.push_back({ratio, item.first, item.second});
    }
    
    // Sort by ratio (GREEDY CHOICE)
    sort(itemsWithRatio.rbegin(), itemsWithRatio.rend());
    
    double totalValue = 0;
    
    for(auto& item : itemsWithRatio) {
        double ratio = get<0>(item);
        int weight = get<1>(item);
        int value = get<2>(item);
        
        if(W >= weight) {
            // Take full item
            totalValue += value;
            W -= weight;
        } else {
            // Take fraction
            totalValue += ratio * W;
            W = 0;
            break;
        }
    }
    
    return totalValue;
}
```

---

## 5. Job Sequencing with Deadlines

```cpp
// Time: O(n²), Space: O(n)
int jobSequencing(vector<tuple<int,int,int>>& jobs) {
    // Sort by profit (GREEDY CHOICE)
    sort(jobs.rbegin(), jobs.rend());
    
    int maxDeadline = 0;
    for(auto& job : jobs) {
        maxDeadline = max(maxDeadline, get<1>(job));
    }
    
    vector<bool> slot(maxDeadline + 1, false);
    int totalProfit = 0;
    int jobsDone = 0;
    
    for(auto& job : jobs) {
        int profit = get<0>(job);
        int deadline = get<1>(job);
        int duration = get<2>(job);
        
        // Find latest available slot
        for(int j = deadline; j > 0; j--) {
            if(!slot[j]) {
                slot[j] = true;
                totalProfit += profit;
                jobsDone++;
                break;
            }
        }
    }
    
    return totalProfit;
}
```

---

## 6. Minimum Number of Platforms

```cpp
// Time: O(n log n), Space: O(1)
int minPlatforms(vector<int>& arrival, vector<int>& departure) {
    sort(arrival.begin(), arrival.end());
    sort(departure.begin(), departure.end());
    
    int platforms = 1;
    int maxPlatforms = 1;
    int i = 1, j = 0;
    
    while(i < arrival.size() && j < departure.size()) {
        if(arrival[i] <= departure[j]) {
            platforms++;
            i++;
        } else {
            platforms--;
            j++;
        }
        maxPlatforms = max(maxPlatforms, platforms);
    }
    
    return maxPlatforms;
}
```

---

## 7. Greedy vs DP Comparison

| Problem | Greedy | DP | Why? |
|---------|--------|-----|------|
| Fractional Knapsack | ✅ O(n log n) | ✅ O(nW) | Can take fractions |
| 0/1 Knapsack | ❌ | ✅ O(nW) | Must take whole items |
| Activity Selection | ✅ O(n log n) | ✅ O(n²) | Greedy works |
| Coin Change (standard) | ✅ | ✅ | Depends on coin system |
| Coin Change (arbitrary) | ❌ | ✅ | Greedy may fail |

---

## 8. Common Greedy Patterns

### 💡 TRICK 1: Sort by Metric
```cpp
// Sort by: finish time, ratio, deadline, profit
sort(items.begin(), items.end(), comparator);
```

### 💡 TRICK 2: Interval Merging
```cpp
// Merge overlapping intervals
sort(intervals.begin(), intervals.end());
vector<vector<int>> merged;
for(auto& interval : intervals) {
    if(merged.empty() || merged.back()[1] < interval[0]) {
        merged.push_back(interval);
    } else {
        merged.back()[1] = max(merged.back()[1], interval[1]);
    }
}
```

---

## 9. Interview Questions

### Most Asked:
1. **Activity Selection** 🏢 [Amazon] 📅 [High]
2. **Minimum Number of Platforms** 🏢 [Microsoft]
3. **Job Sequencing** 🏢 [Adobe]
4. **N meetings in one room** 🏢 [Flipkart]

---

## 10. Glossary

| Term | Definition |
|------|------------|
| **Greedy** | Make locally optimal choice at each step |
| **Greedy Choice Property** | Local optimum leads to global optimum |
| **Activity Selection** | Maximize non-overlapping activities |
| **Fractional Knapsack** | Can take partial items |

---

**🎉 You've mastered Greedy Algorithms!**

**Next**: [17_Divide_and_Conquer](../17_Divide_and_Conquer/17_notes.md)

[← Back to README](../README.md)

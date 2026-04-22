# 14 — Graphs — Complete Notes

> **What You'll Learn**: Graph representations, BFS, DFS, cycle detection, bipartite check, connected components  
> **Prerequisites**: Trees, Queues, Recursion (Topics 10, 08, 04)  
> **Time Required**: 2 weeks (18-22 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Extremely high - social networks, maps, web)

---

## 1. What is a Graph? (Real-World Analogy)

Imagine a **social network** like Facebook:

```
    Alice --- Bob --- Charlie
      |         |
    David --- Eve
```

- **People** = Vertices/Nodes
- **Friendships** = Edges/Connections
- **Graph** = Collection of vertices and edges

**Real-World Examples**:
- 🗺️ GPS Navigation (cities = vertices, roads = edges)
- 🌐 Internet (webpages = vertices, links = edges)
- 📱 Social Networks (users = vertices, friendships = edges)
- 🧬 Biological Networks (proteins = vertices, interactions = edges)

💡 **TRICK**: Think of graphs as **maps with cities and roads** connecting them!

---

## 2. Graph Terminology

- **Vertex/Node**: A point/entity
- **Edge**: Connection between two vertices
- **Directed Edge**: One-way connection (A → B)
- **Undirected Edge**: Two-way connection (A ↔ B)
- **Weighted Edge**: Edge has a cost/distance
- **Path**: Sequence of vertices connected by edges
- **Cycle**: Path that starts and ends at same vertex
- **Connected**: Path exists between any two vertices

---

## 3. Graph Representations

### 3.1 Adjacency Matrix

```cpp
// For graph with n vertices
// matrix[i][j] = 1 if edge exists, 0 otherwise

int n = 4;
vector<vector<int>> adj(n, vector<int>(n, 0));

// Add edge: 0-1, 0-2, 1-3, 2-3
adj[0][1] = 1;
adj[0][2] = 1;
adj[1][3] = 1;
adj[2][3] = 1;

// Visual:
//     0  1  2  3
//   ┌────────────
// 0 │ 0  1  1  0
// 1 │ 1  0  0  1
// 2 │ 1  0  0  1
// 3 │ 0  1  1  0
```

**Space**: O(n²) - Good for dense graphs

---

### 3.2 Adjacency List (RECOMMENDED)

```cpp
// Array of vectors
int n = 4;
vector<vector<int>> adj(n);

// Add edges (undirected)
adj[0].push_back(1);
adj[0].push_back(2);
adj[1].push_back(0);
adj[1].push_back(3);
adj[2].push_back(0);
adj[2].push_back(3);
adj[3].push_back(1);
adj[3].push_back(2);

// Visual:
// 0 → [1, 2]
// 1 → [0, 3]
// 2 → [0, 3]
// 3 → [1, 2]
```

**Space**: O(V+E) - Good for sparse graphs

---

## 4. Graph Traversals

### 4.1 BFS (Breadth-First Search)

**Analogy**: Spreading ripples in water - explore layer by layer!

```cpp
#include <queue>
#include <vector>

// Time: O(V+E), Space: O(V)
void bfs(int start, int n, const vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while(!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        // Visit all neighbors
        for(int neighbor : adj[node]) {
            if(!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

**Visualization**:
```
Graph:    0
         / \
        1   2
         \ /
          3

BFS from 0:
Queue: [0]
Visit: 0, add neighbors 1, 2
Queue: [1, 2]
Visit: 1, add neighbor 3
Queue: [2, 3]
Visit: 2 (no new neighbors)
Queue: [3]
Visit: 3 (done)

Order: 0 → 1 → 2 → 3
```

---

### 4.2 DFS (Depth-First Search)

**Analogy**: Exploring a maze - go as deep as possible, then backtrack!

```cpp
// Time: O(V+E), Space: O(V)
void dfs(int node, int n, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for(int neighbor : adj[node]) {
        if(!visited[neighbor]) {
            dfs(neighbor, n, adj, visited);
        }
    }
}

// Wrapper
void dfsTraversal(int start, int n, const vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    dfs(start, n, adj, visited);
}
```

**Visualization**:
```
Graph:    0
         / \
        1   2
         \ /
          3

DFS from 0:
Visit 0
  Visit 1
    Visit 3
      (2 already visited through 3, skip)
  Visit 2 (already visited)

Order: 0 → 1 → 3 → 2
```

💡 **TRICK**: **BFS vs DFS**:
- **BFS**: Uses queue, finds shortest path in unweighted graphs
- **DFS**: Uses recursion/stack, good for connectivity, cycles

---

## 5. Essential Graph Algorithms

### Pattern 1: Detect Cycle (Undirected Graph)

```cpp
// Time: O(V+E), Space: O(V)
bool hasCycle(int node, int parent, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    
    for(int neighbor : adj[node]) {
        if(!visited[neighbor]) {
            if(hasCycle(neighbor, node, adj, visited)) {
                return true;
            }
        }
        else if(neighbor != parent) {
            // Visited and not parent → cycle!
            return true;
        }
    }
    
    return false;
}

bool isCyclic(int n, const vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    
    for(int i = 0; i < n; i++) {
        if(!visited[i]) {
            if(hasCycle(i, -1, adj, visited)) {
                return true;
            }
        }
    }
    
    return false;
}
```

---

### Pattern 2: Number of Connected Components

```cpp
// Time: O(V+E), Space: O(V)
void dfs(int node, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    
    for(int neighbor : adj[node]) {
        if(!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}

int countComponents(int n, const vector<vector<int>>& adj) {
    int count = 0;
    vector<bool> visited(n, false);
    
    for(int i = 0; i < n; i++) {
        if(!visited[i]) {
            count++;  // Found new component
            dfs(i, adj, visited);
        }
    }
    
    return count;
}
```

---

### Pattern 3: Bipartite Graph Check

**Bipartite**: Can color graph with 2 colors, no adjacent same color

```cpp
// Time: O(V+E), Space: O(V)
bool isBipartite(int node, int color, const vector<vector<int>>& adj, vector<int>& colors) {
    colors[node] = color;
    
    for(int neighbor : adj[node]) {
        if(colors[neighbor] == -1) {
            // Not colored, color with opposite color
            if(!isBipartite(neighbor, 1 - color, adj, colors)) {
                return false;
            }
        }
        else if(colors[neighbor] == color) {
            // Same color as neighbor → not bipartite
            return false;
        }
    }
    
    return true;
}

bool checkBipartite(int n, const vector<vector<int>>& adj) {
    vector<int> colors(n, -1);  // -1: uncolored, 0/1: colors
    
    for(int i = 0; i < n; i++) {
        if(colors[i] == -1) {
            if(!isBipartite(i, 0, adj, colors)) {
                return false;
            }
        }
    }
    
    return true;
}
```

---

## 6. All Operations with Time & Space Complexity

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| BFS | O(V+E) | O(V) | Shortest path, level order |
| DFS | O(V+E) | O(V) | Connectivity, cycles |
| Cycle Detection | O(V+E) | O(V) | Check for cycles |
| Bipartite Check | O(V+E) | O(V) | 2-coloring |
| Connected Components | O(V+E) | O(V) | Count components |
| Topological Sort | O(V+E) | O(V) | Scheduling, dependencies |

---

## 7. Interview Questions

### Most Asked:
1. **Number of Islands** 🏢 [Amazon] 📅 [Very High]
2. **Clone Graph** 🏢 [Google]
3. **Course Schedule** (Topological Sort) 🏢 [Microsoft]
4. **Word Ladder** 🏢 [Amazon]
5. **Pacific Atlantic Water Flow** 🏢 [Google]
6. **Graph Valid Tree** 🏢 [Google]

---

## 8. Practice Problems

### 🟢 Easy:
1. BFS/DFS Traversal
2. Number of Connected Components
3. Find if Path Exists

### 🟡 Medium:
4. Number of Islands 🏢 [Amazon]
5. Clone Graph 🏢 [Google]
6. Course Schedule 🏢 [Microsoft]

### 🔴 Hard:
7. Word Ladder 🏢 [Amazon]
8. Minimum Height Trees

---

**🎉 You've mastered Graphs!**

**Next**: [15_Dynamic_Programming](../15_Dynamic_Programming/15_notes.md)

[← Back to README](../README.md)

# 20 — Advanced Graphs — Complete Notes

> **What You'll Learn**: Dijkstra, Bellman-Ford, Floyd-Warshall, MST (Prim's & Kruskal's), Topological Sort  
> **Prerequisites**: Graphs, BFS/DFS (Topic 14)  
> **Time Required**: 2 weeks (18-22 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Critical for interviews & CP)

---

## 1. What are Advanced Graph Algorithms? (Real-World Analogy)

Imagine you're planning a **road trip across multiple cities**:

- **Shortest Path**: Find the fastest route from A to B (GPS navigation)
- **Minimum Spanning Tree**: Connect all cities with minimum road construction cost
- **Topological Sort**: Determine order to visit cities with dependencies

💡 **TRICK**: **Advanced Graphs Mnemonic**: "Smart ways to navigate complex networks!"

---

## 2. Dijkstra's Algorithm (Shortest Path - Non-negative weights)

**Real-World**: GPS finding shortest route

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

const int INF = INT_MAX;

// Time: O((V+E) log V), Space: O(V)
vector<int> dijkstra(int n, const vector<vector<pair<int,int>>>& adj, int source) {
    // Min-heap: {distance, node}
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    
    vector<int> dist(n, INF);
    dist[source] = 0;
    pq.push({0, source});
    
    while(!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        // Skip if we found a better path already
        if(d > dist[u]) continue;
        
        // Explore neighbors
        for(auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            // Relaxation
            if(dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}

int main() {
    int n = 5;
    vector<vector<pair<int,int>>> adj(n);
    
    // Add edges: {neighbor, weight}
    adj[0].push_back({1, 4});
    adj[0].push_back({2, 1});
    adj[2].push_back({1, 2});
    adj[1].push_back({3, 1});
    adj[2].push_back({3, 5});
    adj[3].push_back({4, 3});
    
    vector<int> dist = dijkstra(n, adj, 0);
    
    cout << "Shortest distances from node 0:" << endl;
    for(int i = 0; i < n; i++) {
        cout << "Node " << i << ": " << dist[i] << endl;
    }
    // Output: 0, 3, 1, 4, 7
    
    return 0;
}
```

**Visualization**:
```
Graph:
      4       1
  0 ────→ 1 ────→ 3
  │       ↑       │
1 │      2│      3│
  ↓       │       ↓
  2 ────→ 3 ────→ 4
      5

Shortest paths from 0:
0→1: 0→2→1 = 1+2 = 3
0→2: 0→2 = 1
0→3: 0→2→1→3 = 1+2+1 = 4
0→4: 0→2→1→3→4 = 1+2+1+3 = 7
```

💡 **TRICK**: **Dijkstra Limitation**: DOES NOT work with negative weights! Use Bellman-Ford instead.

---

## 3. Bellman-Ford Algorithm (Shortest Path - Handles negative weights)

```cpp
// Time: O(V×E), Space: O(V)
vector<int> bellmanFord(int n, const vector<tuple<int,int,int>>& edges, int source) {
    vector<int> dist(n, INF);
    dist[source] = 0;
    
    // Relax all edges V-1 times
    for(int i = 0; i < n - 1; i++) {
        for(auto& edge : edges) {
            int u = get<0>(edge);
            int v = get<1>(edge);
            int w = get<2>(edge);
            
            if(dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check for negative weight cycle
    for(auto& edge : edges) {
        int u = get<0>(edge);
        int v = get<1>(edge);
        int w = get<2>(edge);
        
        if(dist[u] != INF && dist[u] + w < dist[v]) {
            cout << "Graph contains negative weight cycle!" << endl;
            return {};
        }
    }
    
    return dist;
}
```

---

## 4. Floyd-Warshall Algorithm (All-Pairs Shortest Path)

```cpp
// Time: O(V³), Space: O(V²)
void floydWarshall(int n, vector<vector<int>>& graph) {
    // Initialize distances
    vector<vector<int>> dist = graph;
    
    // Add intermediate vertices one by one
    for(int k = 0; k < n; k++) {
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < n; j++) {
                if(dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    // Print result
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            if(dist[i][j] == INF) cout << "INF ";
            else cout << dist[i][j] << " ";
        }
        cout << endl;
    }
}
```

---

## 5. Minimum Spanning Tree (MST)

### Kruskal's Algorithm

```cpp
// Time: O(E log E), Space: O(V)
struct Edge {
    int u, v, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

// Union-Find data structure
struct UnionFind {
    vector<int> parent;
    UnionFind(int n) {
        parent.resize(n);
        for(int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if(parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void unite(int x, int y) {
        parent[find(x)] = find(y);
    }
};

int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    UnionFind uf(n);
    
    int mstWeight = 0;
    int edgesCount = 0;
    
    for(auto& edge : edges) {
        if(uf.find(edge.u) != uf.find(edge.v)) {
            uf.unite(edge.u, edge.v);
            mstWeight += edge.weight;
            edgesCount++;
        }
    }
    
    return edgesCount == n - 1 ? mstWeight : -1;
}
```

---

## 6. Topological Sort

**Real-World**: Course prerequisites, build dependencies

```cpp
// Time: O(V+E), Space: O(V)
vector<int> topologicalSort(int n, const vector<vector<int>>& adj) {
    vector<int> inDegree(n, 0);
    
    // Calculate in-degrees
    for(int u = 0; u < n; u++) {
        for(int v : adj[u]) {
            inDegree[v]++;
        }
    }
    
    // Queue for nodes with in-degree 0
    queue<int> q;
    for(int i = 0; i < n; i++) {
        if(inDegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    while(!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for(int v : adj[u]) {
            inDegree[v]--;
            if(inDegree[v] == 0) q.push(v);
        }
    }
    
    if(result.size() != n) {
        cout << "Graph has cycle!" << endl;
        return {};
    }
    
    return result;
}
```

---

## 7. Algorithm Comparison

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| Dijkstra | O((V+E) log V) | O(V) | Shortest path (non-negative) |
| Bellman-Ford | O(V×E) | O(V) | Shortest path (negative weights) |
| Floyd-Warshall | O(V³) | O(V²) | All-pairs shortest path |
| Kruskal's | O(E log E) | O(V) | MST |
| Prim's | O((V+E) log V) | O(V) | MST |
| Topological Sort | O(V+E) | O(V) | Dependencies, scheduling |

---

## 8. Interview Questions

### Most Asked:
1. **Network Delay Time** (Dijkstra) 🏢 [Amazon]
2. **Cheapest Flights Within K Stops** (Bellman-Ford) 🏢 [Google]
3. **Course Schedule** (Topological Sort) 🏢 [Microsoft]
4. **Minimum Cost to Connect All Points** (MST) 🏢 [Meta]

---

## 9. Glossary

| Term | Definition |
|------|------------|
| **Shortest Path** | Minimum cost path between vertices |
| **MST** | Tree connecting all vertices with minimum total weight |
| **Topological Sort** | Linear ordering of vertices in DAG |
| **Relaxation** | Updating shortest path estimate |
| **Negative Cycle** | Cycle with negative total weight |

---

**🎉 You've mastered Advanced Graphs!**

**Next**: [21_Advanced_DP](../21_Advanced_DP/21_notes.md)

[← Back to README](../README.md)

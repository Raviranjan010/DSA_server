#include <iostream>
#include <vector>
#include <string>

using namespace std;

// ==========================================
// PROBLEM 1: Generate All Subsets (Power Set)
// ==========================================

// APPROACH: Pick / Don't Pick Recursion
// Time Complexity: O(2^N) - 2 choices per element
// Space Complexity: O(N) auxiliary stack space
void generateSubsets(vector<int>& nums, int index, vector<int>& currentSubset, vector<vector<int>>& result) {
    // Base Case: Reached the end of the array
    if (index == nums.size()) {
        result.push_back(currentSubset); // Store current formation
        return;
    }
    
    // CHOICE 1: Pick the element at 'index'
    currentSubset.push_back(nums[index]); // DO
    generateSubsets(nums, index + 1, currentSubset, result); // EXPLORE
    currentSubset.pop_back(); // UNDO (Backtrack step)
    
    // CHOICE 2: Don't pick the element at 'index'
    generateSubsets(nums, index + 1, currentSubset, result);
}


// ==========================================
// PROBLEM 2: Print All Permutations Array
// ==========================================

// APPROACH: Backtracking via Swapping
// Time Complexity: O(N! * N)
// Space Complexity: O(N) recursion stack
void generatePermutations(vector<int>& nums, int index, vector<vector<int>>& result) {
    if (index == nums.size()) {
        result.push_back(nums); // Got a full permutation
        return;
    }
    
    // We try to place every element from [index ... end] into 'index'
    for (int i = index; i < nums.size(); i++) {
        swap(nums[index], nums[i]); // DO (Place i-th element at 'index')
        
        generatePermutations(nums, index + 1, result); // EXPLORE
        
        swap(nums[index], nums[i]); // UNDO (Backtrack step to restore original state)
    }
}


// ==========================================
// PROBLEM 3: N-Queens Problem
// ==========================================

// Helper to check if it's safe to place Q at (row, col)
bool isSafe(int row, int col, vector<string>& board, int n) {
    // Check Upper Left Diagonal
    int r = row, c = col;
    while (r >= 0 && c >= 0) {
        if (board[r][c] == 'Q') return false;
        r--; c--;
    }
    
    // Check Left Horizontal
    r = row, c = col;
    while (c >= 0) {
        if (board[r][c] == 'Q') return false;
        c--;
    }
    
    // Check Lower Left Diagonal
    r = row, c = col;
    while (r < n && c >= 0) {
        if (board[r][c] == 'Q') return false;
        r++; c--;
    }
    
    return true; // Safe to place
}

// APPROACH: Backtrack filling column by column
// Time Complexity: O(N!)
// Space Complexity: O(N^2) for board copy in result
void solveNQueens(int col, vector<string>& board, vector<vector<string>>& ans, int n) {
    if (col == n) { // Base condition: all queens placed
        ans.push_back(board);
        return;
    }
    
    // For current column `col`, try placing queen in every row `row`
    for (int row = 0; row < n; row++) {
        if (isSafe(row, col, board, n)) {
            board[row][col] = 'Q'; // DO
            
            solveNQueens(col + 1, board, ans, n); // EXPLORE next col
            
            board[row][col] = '.'; // UNDO (Backtrack)
        }
    }
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== BACKTRACKING DEMO ===" << endl;
    
    // Test Subsets
    vector<int> nums = {1, 2, 3};
    vector<int> current;
    vector<vector<int>> subsetsResult;
    
    generateSubsets(nums, 0, current, subsetsResult);
    
    cout << "\n[Subsets of {1, 2, 3}]" << endl;
    for (auto subset : subsetsResult) {
        cout << "{ ";
        for (int v : subset) cout << v << " ";
        cout << "} ";
    }
    cout << endl;
    
    // Test Permutations
    vector<int> permInput = {1, 2, 3};
    vector<vector<int>> permResult;
    
    generatePermutations(permInput, 0, permResult);
    
    cout << "\n[Permutations of {1, 2, 3}]" << endl;
    for (auto p : permResult) {
        cout << "[ ";
        for (int v : p) cout << v << " ";
        cout << "] ";
    }
    cout << endl;
    
    // Test N-Queens
    int n = 4; // 4x4 Grid
    vector<vector<string>> ans;
    // Create empty 4x4 board
    vector<string> board(n, string(n, '.'));
    
    solveNQueens(0, board, ans, n);
    
    cout << "\n[N-Queens Solutions for N = 4]" << endl;
    for (int i = 0; i < ans.size(); i++) {
        cout << "Solution " << i + 1 << ":" << endl;
        for (const string& row : ans[i]) {
            cout << row << endl;
        }
        cout << endl;
    }

    return 0;
}

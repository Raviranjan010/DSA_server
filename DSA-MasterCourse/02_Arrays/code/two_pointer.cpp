#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// ==========================================
// PROBLEM 1: Two Sum (Sorted Array)
// ==========================================

// APPROACH 1: Brute Force
// Time Complexity: O(N^2)
// Space Complexity: O(1)
vector<int> twoSumBrute(const vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); i++) {
        for (size_t j = i + 1; j < arr.size(); j++) {
            if (arr[i] + arr[j] == target) {
                return {(int)i, (int)j}; // Return indices
            }
        }
    }
    return {-1, -1};
}

// APPROACH 2: Optimal (Two Pointer Technique)
// 💡 TRICK: Since the array is SORTED, if sum is too big, move the right pointer left.
//    If sum is too small, move the left pointer right.
// Time Complexity: O(N)
// Space Complexity: O(1)
vector<int> twoSumOptimal(const vector<int>& arr, int target) {
    int left = 0; // Pointer starting at the beginning
    int right = arr.size() - 1; // Pointer starting at the end
    
    while (left < right) { // Ensure pointers don't cross
        int currentSum = arr[left] + arr[right];
        
        if (currentSum == target) {
            return {left, right}; // Found the target sum
        } 
        else if (currentSum > target) {
            right--; // Sum is too large, need a smaller number (move leftwards)
        } 
        else {
            left++; // Sum is too small, need a larger number pass (move rightwards)
        }
    }
    return {-1, -1}; // Not found
}

// ==========================================
// PROBLEM 2: Move Zeros to End
// ==========================================

// APPROACH 1: Brute Force (Extra Array)
// Time Complexity: O(N)
// Space Complexity: O(N)
void moveZeroesBrute(vector<int>& arr) {
    vector<int> temp; // Temporary array
    
    // First pass: Copy all non-zero elements
    for (int num : arr) {
        if (num != 0) temp.push_back(num);
    }
    
    // Second pass: Fill the rest with zeros
    while (temp.size() < arr.size()) {
        temp.push_back(0);
    }
    
    // Copy back
    for (size_t i = 0; i < arr.size(); i++) {
        arr[i] = temp[i];
    }
}

// APPROACH 2: Optimal (Two Pointer In-Place)
// 💡 TRICK: Keep a pointer that acts as the "insertion point" for the next non-zero element.
// Time Complexity: O(N)
// Space Complexity: O(1)
void moveZeroesOptimal(vector<int>& arr) {
    int nonZeroPos = 0; // Pointer for where the next non-zero element should go
    
    // Traverse the array
    for (int i = 0; i < arr.size(); i++) {
        // If we find a non-zero element, swap it with the `nonZeroPos` element
        if (arr[i] != 0) {
            swap(arr[i], arr[nonZeroPos]);
            nonZeroPos++; // Move the insert position forward
        }
    }
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== TWO POINTERS DEMO ===" << endl;
    
    // TEST 1
    vector<int> arr1 = {2, 7, 11, 15}; // Array must be sorted
    int target = 9;
    cout << "\n[Two Sum (Sorted)]" << endl;
    cout << "Target: " << target << endl;
    
    auto indices = twoSumOptimal(arr1, target);
    cout << "Indices: [" << indices[0] << ", " << indices[1] << "]" << endl;
    
    // TEST 2
    vector<int> arr2 = {0, 1, 0, 3, 12};
    cout << "\n[Move Zeroes]" << endl;
    cout << "Original Array: ";
    for(int val : arr2) cout << val << " "; cout << endl;
    
    moveZeroesOptimal(arr2);
    
    cout << "Optimal Output: ";
    for(int val : arr2) cout << val << " "; cout << endl;

    return 0;
}

#include <iostream>
#include <vector>

using namespace std;

// ==========================================
// ALGORITHM 1: Standard Binary Search
// ==========================================
// Time Complexity: O(log N)
// Space Complexity: O(1) Iterative, O(log N) Recursive
int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        // Prevent integer overflow for large arrays
        int mid = left + (right - left) / 2; 
        
        if (arr[mid] == target) {
            return mid; // Target found
        }
        else if (arr[mid] < target) {
            left = mid + 1; // Target is in the right half
        }
        else {
            right = mid - 1; // Target is in the left half
        }
    }
    return -1; // Target not found
}

// ==========================================
// ALGORITHM 2: First Occurrence of an Element
// ==========================================
// Time Complexity: O(log N)
int firstOccurrence(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1; // Store potential answer
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid; // Possible answer
            right = mid - 1; // BUT keep searching left to find an earlier one
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return result;
}

// ==========================================
// ALGORITHM 3: Last Occurrence of an Element
// ==========================================
// Time Complexity: O(log N)
int lastOccurrence(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1; 
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid; // Possible answer
            left = mid + 1; // BUT keep searching right to find a later one
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return result;
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== BINARY SEARCH DEMO ===" << endl;
    
    vector<int> sortedArr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    
    cout << "\nArray: ";
    for(int v : sortedArr) cout << v << " "; cout << endl;
    
    int index = binarySearch(sortedArr, target);
    if (index != -1) cout << "Target " << target << " found at index: " << index << endl;
    else cout << "Target " << target << " not found." << endl;
    
    
    vector<int> duplicateArr = {2, 5, 8, 8, 8, 8, 16, 23};
    int targetDup = 8;
    
    cout << "\nArray with Duplicates: ";
    for(int v : duplicateArr) cout << v << " "; cout << endl;
    
    cout << "First occurrence of " << targetDup << " is at index: " << firstOccurrence(duplicateArr, targetDup) << endl;
    cout << "Last occurrence of " << targetDup << " is at index: " << lastOccurrence(duplicateArr, targetDup) << endl;

    return 0;
}

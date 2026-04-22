#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>

using namespace std;

// ==========================================
// PROBLEM 1: Find the Largest Element
// ==========================================

// APPROACH 1: Brute Force (Sorting)
// Time Complexity: O(N log N)
// Space Complexity: O(1)
int findLargestBruteForce(vector<int>& arr) {
    if (arr.empty()) return -1; // Edge case: empty array
    sort(arr.begin(), arr.end()); // Sort the array in ascending order
    return arr.back(); // Return the last element
}

// APPROACH 2: Optimal (Single Pass)
// Time Complexity: O(N)
// Space Complexity: O(1)
int findLargestOptimal(const vector<int>& arr) {
    if (arr.empty()) return -1; // Edge case
    
    int maxEl = arr[0]; // Assume first element is largest
    for (size_t i = 1; i < arr.size(); i++) { // Traverse from second element
        if (arr[i] > maxEl) { // If current element is greater than maxEl
            maxEl = arr[i]; // Update maxEl
        }
    }
    return maxEl; // Return final maximum
}

// ==========================================
// PROBLEM 2: Find the Second Largest Element
// ==========================================

// APPROACH 1: Brute Force (Two Passes)
// Time Complexity: O(N)
// Space Complexity: O(1)
int secondLargestBrute(const vector<int>& arr) {
    if (arr.size() < 2) return -1; // Edge case: Not enough elements
    
    int largest = findLargestOptimal(arr); // Find largest in 1st pass
    int secondLargest = INT_MIN; // Initialize to minimum possible value
    
    for (int num : arr) { // 2nd pass
        if (num > secondLargest && num != largest) { // Must be less than largest
            secondLargest = num; // Update second largest
        }
    }
    return (secondLargest == INT_MIN) ? -1 : secondLargest; // Check if it exists
}

// APPROACH 2: Optimal (Single Pass)
// Time Complexity: O(N)
// Space Complexity: O(1)
int secondLargestOptimal(const vector<int>& arr) {
    if (arr.size() < 2) return -1; // Edge case
    
    int largest = arr[0]; // Initialize largest
    int secondLargest = INT_MIN; // Initialize second largest
    
    for (size_t i = 1; i < arr.size(); i++) {
        if (arr[i] > largest) { // Found a new largest
            secondLargest = largest; // Old largest becomes second largest
            largest = arr[i]; // Update largest
        } else if (arr[i] < largest && arr[i] > secondLargest) { // Found an element between largest and second largest
            secondLargest = arr[i]; // Update second largest
        }
    }
    
    return (secondLargest == INT_MIN) ? -1 : secondLargest;
}

// ==========================================
// PROBLEM 3: Reverse an Array
// ==========================================

// APPROACH 1: Brute Force (Extra Array)
// Time Complexity: O(N)
// Space Complexity: O(N) - Uses an extra array
vector<int> reverseArrayBrute(const vector<int>& arr) {
    int n = arr.size();
    vector<int> reversedArr(n); // Create a new array of same size
    
    for (int i = n - 1; i >= 0; i--) { // Traverse backwards
        reversedArr[n - 1 - i] = arr[i]; // Place at start of new array
    }
    return reversedArr;
}

// APPROACH 2: Optimal (Two Pointers In-Place)
// Time Complexity: O(N)
// Space Complexity: O(1) - No extra space
void reverseArrayOptimal(vector<int>& arr) {
    int start = 0; // Pointer at the beginning
    int end = arr.size() - 1; // Pointer at the end
    
    while (start < end) { // Keep going until pointers meet or cross
        swap(arr[start], arr[end]); // Swap elements
        start++; // Move start forward
        end--; // Move end backward
    }
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== ARRAY BASICS DEMO ===" << endl;
    
    vector<int> arr = {12, 35, 1, 10, 34, 1};
    cout << "\nOriginal Array: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    // Testing Largest Element
    cout << "\n[Largest Element]" << endl;
    cout << "Brute Force: " << findLargestBruteForce(arr) << endl;
    cout << "Optimal:     " << findLargestOptimal(arr) << endl;
    
    // Testing Second Largest Element
    cout << "\n[Second Largest Element]" << endl;
    cout << "Brute Force: " << secondLargestBrute(arr) << endl;
    cout << "Optimal:     " << secondLargestOptimal(arr) << endl;
    
    // Testing Reverse Array
    cout << "\n[Reverse Array]" << endl;
    vector<int> revBrute = reverseArrayBrute(arr);
    cout << "Brute Force Output: ";
    for (int num : revBrute) cout << num << " ";
    cout << endl;
    
    reverseArrayOptimal(arr); // Modifies original array
    cout << "Optimal Output (In-place): ";
    for (int num : arr) cout << num << " ";
    cout << endl;

    return 0;
}

#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>

using namespace std;

// ==========================================
// PROBLEM 1: Maximum Sum Subarray of Size K
// ==========================================

// APPROACH 1: Brute Force
// Time Complexity: O(N * K)
// Space Complexity: O(1)
int maxSumSubarrayBrute(const vector<int>& arr, int k) {
    if (k > arr.size() || k <= 0) return -1; // Edge cases
    
    int maxSum = INT_MIN; // Initialize to smallest possible integer
    
    // Iterate through all possible sub-arrays of size K
    for (size_t i = 0; i <= arr.size() - k; i++) {
        int currentSum = 0; // Sum of current subarray
        for (size_t j = i; j < i + k; j++) { // Add up the K elements
            currentSum += arr[j];
        }
        maxSum = max(maxSum, currentSum); // Update maximum found so far
    }
    
    return maxSum;
}

// APPROACH 2: Optimal (Sliding Window Technique)
// 💡 TRICK: Instead of recalculating the entire window sum every time, 
//    we just add the next element and subtract the first element of the previous window!
// Time Complexity: O(N)
// Space Complexity: O(1)
int maxSumSubarrayOptimal(const vector<int>& arr, int k) {
    if (k > arr.size() || k <= 0) return -1; // Edge cases
    
    int maxSum = 0;
    int windowSum = 0; // Sum of the current window

    // Step 1: Calculate the sum of the first window (first 'k' elements)
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum; // Initialize maxSum with the first window's sum

    // Step 2: Slide the window over the rest of the array
    for (size_t i = k; i < arr.size(); i++) {
        // windowSum = windowSum - outgoing_element + incoming_element
        windowSum = windowSum - arr[i - k] + arr[i]; 
        maxSum = max(maxSum, windowSum); // Keep track of the highest sum seen
    }

    return maxSum;
}


// ==========================================
// PROBLEM 2: First Negative Integer in Every Window of Size K
// ==========================================

// APPROACH 1: Brute Force
// Time Complexity: O(N * K)
// Space Complexity: O(1)
vector<int> firstNegativeBrute(const vector<int>& arr, int k) {
    vector<int> result;
    if (k > arr.size() || k <= 0) return result;
    
    for (size_t i = 0; i <= arr.size() - k; i++) {
        bool foundNegative = false;
        for (size_t j = i; j < i + k; j++) {
            if (arr[j] < 0) { // Found a negative number
                result.push_back(arr[j]);
                foundNegative = true;
                break; // We only need the *first* negative
            }
        }
        if (!foundNegative) {
            result.push_back(0); // If no negative is found, insert 0
        }
    }
    return result;
}


// APPROACH 2: Optimal Sliding Window (Using a vector to simulate queue behavior)
// Time Complexity: O(N)
// Space Complexity: O(K) inside the structure tracking negatives
vector<int> firstNegativeOptimal(const vector<int>& arr, int k) {
    vector<int> result;
    vector<int> negatives; // To track negative numbers in current window
    
    if (k > arr.size() || k <= 0) return result;

    int i = 0, j = 0; // i is start of window, j is end of window
    
    while (j < arr.size()) { // Traverse the array
        
        // 1. Calculations logic
        if (arr[j] < 0) {
            negatives.push_back(arr[j]); // Stash any negative number found
        }
        
        // 2. Window is too small, increase size
        if (j - i + 1 < k) {
            j++;
        } 
        
        // 3. Window has hit required size K
        else if (j - i + 1 == k) {
            // Processing result for current window
            if (negatives.empty()) {
                result.push_back(0); // No negatives in window
            } else {
                result.push_back(negatives.front()); // Add the first negative
                
                // If the element slipping out of the window is the front of negatives, remove it
                if (arr[i] == negatives.front()) {
                    negatives.erase(negatives.begin()); // A real queue (.pop()) is faster in actual implementation
                }
            }
            
            // Slide the window forward
            i++; 
            j++;
        }
    }
    
    return result;
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== SLIDING WINDOW DEMO ===" << endl;
    
    // TEST 1
    vector<int> arr1 = {2, 1, 5, 1, 3, 2};
    int k1 = 3;
    cout << "\n[Max Sum Subarray of size " << k1 << "]" << endl;
    cout << "Array: ";
    for(int val : arr1) cout << val << " "; cout << endl;
    cout << "Brute Force Output: " << maxSumSubarrayBrute(arr1, k1) << endl;
    cout << "Optimal Output:     " << maxSumSubarrayOptimal(arr1, k1) << endl;

    // TEST 2
    vector<int> arr2 = {12, -1, -7, 8, -15, 30, 16, 28};
    int k2 = 3;
    cout << "\n[First Negative in Every Window of size " << k2 << "]" << endl;
    cout << "Array: ";
    for(int val : arr2) cout << val << " "; cout << endl;
    
    vector<int> ansBrute = firstNegativeBrute(arr2, k2);
    vector<int> ansOptimal = firstNegativeOptimal(arr2, k2);
    
    cout << "Brute Force Output: ";
    for(int val : ansBrute) cout << val << " "; cout << endl;
    cout << "Optimal Output:     ";
    for(int val : ansOptimal) cout << val << " "; cout << endl;

    return 0;
}

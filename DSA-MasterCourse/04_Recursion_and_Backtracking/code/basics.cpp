#include <iostream>
#include <vector>

using namespace std;

// ==========================================
// PROBLEM 1: Factorial of N
// ==========================================

// Time Complexity: O(N)
// Space Complexity: O(N) auxiliary stack space
int factorial(int n) {
    if (n == 0 || n == 1) return 1; // Base condition
    return n * factorial(n - 1);    // Recursive call
}

// ==========================================
// PROBLEM 2: N-th Fibonacci Number
// ==========================================

// APPROACH 1: Naive Recursion
// Time Complexity: O(2^N) - Exponential, very slow!
// Space Complexity: O(N) stack space
int fibonacci(int n) {
    if (n == 0) return 0; // Base case 1
    if (n == 1) return 1; // Base case 2
    return fibonacci(n - 1) + fibonacci(n - 2); // Recurrence Relation
}


// ==========================================
// PROBLEM 3: Reverse an Array using Recursion
// ==========================================

// Time Complexity: O(N/2) ~ O(N)
// Space Complexity: O(N/2) ~ O(N) stack space
void reverseArrayRecursive(vector<int>& arr, int start, int end) {
    if (start >= end) return; // Base Case: Pointers met or crossed
    
    // Process: Swap start and end elements
    swap(arr[start], arr[end]);
    
    // Sub-problem: Reverse the rest of the array inside
    reverseArrayRecursive(arr, start + 1, end - 1);
}

// ==========================================
// PROBLEM 4: Check if String is Palindrome (Recursive)
// ==========================================

// Time Complexity: O(N/2) ~ O(N)
// Space Complexity: O(N/2) stack space
bool isPalindromeRecursive(const string& str, int left, int right) {
    if (left >= right) return true; // Reached middle, it is a palindrome
    
    if (str[left] != str[right]) return false; // Mismatch found
    
    return isPalindromeRecursive(str, left + 1, right - 1); // Check inner substring
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== RECURSION BASICS DEMO ===" << endl;
    
    // Test Factorial
    int n = 5;
    cout << "\n[Factorial]" << endl;
    cout << "Factorial of " << n << " is: " << factorial(n) << endl;

    // Test Fibonacci
    int f = 6;
    cout << "\n[Fibonacci]" << endl;
    cout << "Fibonacci number at position " << f << " is: " << fibonacci(f) << endl;

    // Test Reverse Array
    vector<int> arr = {1, 2, 3, 4, 5};
    cout << "\n[Reverse Array Recursive]" << endl;
    cout << "Original Array: ";
    for(int v : arr) cout << v << " "; cout << endl;
    
    reverseArrayRecursive(arr, 0, arr.size() - 1);
    
    cout << "Reversed Array: ";
    for(int v : arr) cout << v << " "; cout << endl;

    // Test Palindrome check
    string s = "madam";
    cout << "\n[Palindrome Check]" << endl;
    cout << "Is '" << s << "' a palindrome? " << (isPalindromeRecursive(s, 0, s.length() - 1) ? "Yes" : "No") << endl;

    return 0;
}

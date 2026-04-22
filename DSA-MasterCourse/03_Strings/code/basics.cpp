#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// ==========================================
// PROBLEM 1: Reverse a String
// ==========================================

// APPROACH 1: Brute Force (Extra Space)
// Time Complexity: O(N)
// Space Complexity: O(N)
string reverseStringBrute(const string& str) {
    string reversedStr = "";
    // Loop backwards and append chars
    for (int i = str.size() - 1; i >= 0; i--) {
        reversedStr += str[i];
    }
    return reversedStr;
}

// APPROACH 2: Optimal (Two Pointers In-Place)
// Time Complexity: O(N/2) ~ O(N)
// Space Complexity: O(1)
void reverseStringOptimal(string& str) {
    int left = 0;
    int right = str.size() - 1;
    
    while (left < right) {
        swap(str[left], str[right]); // Swap characters
        left++;
        right--;
    }
}

// ==========================================
// PROBLEM 2: Check if String is a Palindrome
// ==========================================

// APPROACH 1: Brute Force (Reverse and Compare)
// Time Complexity: O(N)
// Space Complexity: O(N) required for reversed string
bool isPalindromeBrute(const string& str) {
    string rev = reverseStringBrute(str);
    return str == rev; // If identical, it's a palindrome
}

// APPROACH 2: Optimal (Two Pointers)
// Time Complexity: O(N/2) ~ O(N)
// Space Complexity: O(1)
bool isPalindromeOptimal(const string& str) {
    int left = 0;
    int right = str.size() - 1;
    
    while (left < right) {
        // Ignored non-alphanumeric check in this basic version
        if (str[left] != str[right]) {
            return false; // Mismatch found
        }
        left++;
        right--;
    }
    return true; // Symmetric so far
}

// ==========================================
// PROBLEM 3: Valid Anagram 
// ==========================================

// APPROACH 1: Brute Force (Sorting)
// Time Complexity: O(N log N)
// Space Complexity: O(1) or O(N) depending on string implementation
bool isAnagramBrute(string s, string t) {
    if (s.length() != t.length()) return false;
    
    sort(s.begin(), s.end()); // Sort both strings
    sort(t.begin(), t.end());
    
    return s == t; // Compare them equality
}

// APPROACH 2: Optimal (Frequency Array)
// Time Complexity: O(N)
// Space Complexity: O(1) since array size is fixed at 26
bool isAnagramOptimal(const string& s, const string& t) {
    if (s.length() != t.length()) return false;
    
    int freq[26] = {0}; // Assume lowercase english letters only
    
    for (size_t i = 0; i < s.length(); i++) {
        freq[s[i] - 'a']++; // Increment map for chars in 's'
        freq[t[i] - 'a']--; // Decrement map for chars in 't'
    }
    
    // If it's an anagram, all frequencies should be back to 0
    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0) return false;
    }
    return true;
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== STRING BASICS DEMO ===" << endl;
    
    // Reverse String Demo
    string s1 = "hello";
    cout << "\n[Reverse String]" << endl;
    cout << "Original: " << s1 << endl;
    reverseStringOptimal(s1);
    cout << "Optimal In-Place: " << s1 << endl;
    
    // Palindrome Demo
    string s2 = "racecar";
    string s3 = "hello";
    cout << "\n[Check Palindrome]" << endl;
    cout << "Is '" << s2 << "' a palindrome? " << (isPalindromeOptimal(s2) ? "Yes" : "No") << endl;
    cout << "Is '" << s3 << "' a palindrome? " << (isPalindromeOptimal(s3) ? "Yes" : "No") << endl;

    // Anagram Demo
    string a1 = "listen", a2 = "silent";
    cout << "\n[Valid Anagram]" << endl;
    cout << "Are '" << a1 << "' and '" << a2 << "' anagrams? " << (isAnagramOptimal(a1, a2) ? "Yes" : "No") << endl;

    return 0;
}

#include <iostream>
#include <string>
#include <sstream>
#include <vector>

using namespace std;

// ==========================================
// PROBLEM: Longest Common Prefix
// ==========================================

// APPROACH 1: Character by Character (Vertical Scanning)
// Time Complexity: O(S) where S is the sum of all characters in all strings
// Space Complexity: O(1)
string longestCommonPrefix(const vector<string>& strs) {
    if (strs.empty()) return ""; // Edge case

    // Loop through characters of the first string
    for (size_t i = 0; i < strs[0].length(); i++) {
        char c = strs[0][i];
        
        // Compare with other strings at index i
        for (size_t j = 1; j < strs.size(); j++) {
            // If another string is too short OR mismatches
            if (i == strs[j].length() || strs[j][i] != c) {
                return strs[0].substr(0, i); // Return match up to i
            }
        }
    }
    return strs[0]; // First string entirely matches all others
}


// ==========================================
// PROBLEM: Reverse Words in a String
// ==========================================

// APPROACH: Two Pass with StringStream (Easiest & Optimal for C++)
// Time Complexity: O(N)
// Space Complexity: O(N) 
// 💡 TRICK: std::stringstream automatically parses by whitespace!
string reverseWords(const string& s) {
    stringstream ss(s);
    string word;
    string result = "";
    
    // Read words one by one separated by space
    while (ss >> word) {
        if (result.empty()) {
            result = word; 
        } else {
            result = word + " " + result; // Prepend word
        }
    }
    return result;
}

// ==========================================
// PROBLEM: String Compression (Run-Length Encoding)
// ==========================================

// APPROACH: Two Pointers (In-place if returning int, or extra space if returning string)
// Here we return the compressed string.
// Time Complexity: O(N)
// Space Complexity: O(N) for result string
string compressString(const string& str) {
    if (str.length() == 0) return "";
    
    string compressed = "";
    int count = 1; // Start counting from 1
    
    for (size_t i = 1; i <= str.length(); i++) {
        // If we reach the end OR find a different character
        if (i == str.length() || str[i] != str[i - 1]) {
            compressed += str[i - 1]; // Append character
            if (count > 1) {
                compressed += to_string(count); // Append digit if count > 1
            }
            count = 1; // Reset count
        } else {
            count++; // Same character, increment count
        }
    }
    return compressed;
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== STRING MANIPULATION DEMO ===" << endl;

    // Test Longest Common Prefix
    vector<string> words = {"flower", "flow", "flight"};
    cout << "\n[Longest Common Prefix]" << endl;
    cout << "Input: {\"flower\", \"flow\", \"flight\"}" << endl;
    cout << "Output: " << longestCommonPrefix(words) << endl;

    // Test Reverse Words
    string sentence = "  hello world  from C++  ";
    cout << "\n[Reverse Words]" << endl;
    cout << "Input: '" << sentence << "'" << endl;
    cout << "Output: '" << reverseWords(sentence) << "'" << endl;

    // Test String Compression
    string chars = "aabbccc";
    cout << "\n[String Compression]" << endl;
    cout << "Input: " << chars << endl;
    cout << "Output: " << compressString(chars) << endl;

    return 0;
}

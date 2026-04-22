#include <iostream>
#include <string>
#include <vector>

using namespace std;

// ==========================================
// PROBLEM: Implement strStr() / Substring Search
// ==========================================

// APPROACH 1: Brute Force Pattern Matching
// Time Complexity: O(N * M) where N=len(text), M=len(pattern)
// Space Complexity: O(1)
int findPatternBrute(const string& text, const string& pattern) {
    if (pattern.empty()) return 0;
    
    int n = text.length();
    int m = pattern.length();
    
    // Slide the pattern over text one by one
    for (int i = 0; i <= n - m; i++) {
        int j;
        // For current index i, check for pattern match
        for (j = 0; j < m; j++) {
            if (text[i + j] != pattern[j]) {
                break; // Mismatch found, break inner loop
            }
        }
        if (j == m) { // If inner loop didn't break, all characters matched
            return i; // Return starting index
        }
    }
    return -1; // Pattern not found
}

// APPROACH 2: Optimal - KMP Algorithm (Knuth-Morris-Pratt)
// 💡 TRICK: KMP uses the degenerate property of the pattern to avoid 
//    re-matching characters we already know matched via an LPS array.

// Helper function to build LPS (Longest Prefix which is also Suffix) Array
// Time Complexity: O(M)
// Space Complexity: O(M)
void computeLPSArray(const string& pattern, int m, vector<int>& lps) {
    int len = 0; // length of the previous longest prefix suffix
    lps[0] = 0;  // lps[0] is always 0
    int i = 1;
    
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else { // (pattern[i] != pattern[len])
            if (len != 0) {
                len = lps[len - 1]; // Fallback to previous LPS
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

// KMP Search Function
// Time Complexity: O(N + M)
// Space Complexity: O(M) for LPS array
int findPatternKMP(const string& text, const string& pattern) {
    int n = text.length();
    int m = pattern.length();
    
    if (m == 0) return 0;
    if (n < m) return -1;
    
    vector<int> lps(m);
    computeLPSArray(pattern, m, lps); // Preprocess pattern
    
    int i = 0; // index for text
    int j = 0; // index for pattern
    
    while (i < n) {
        if (pattern[j] == text[i]) {
            j++;
            i++;
        }
        if (j == m) {
            return i - j; // Found pattern, return starting index
            // If tracking all occurrences, j = lps[j - 1];
        } else if (i < n && pattern[j] != text[i]) { // Mismatch after j matches
            if (j != 0) {
                j = lps[j - 1]; // Shift pattern using LPS
            } else {
                i++; // Just move to next character in text
            }
        }
    }
    return -1; // Not found
}

// ==========================================
// MAIN FUNCTION - TEST CASES
// ==========================================
int main() {
    cout << "=== PATTERN MATCHING DEMO ===" << endl;
    
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    
    cout << "\nText: " << text << endl;
    cout << "Pattern: " << pattern << endl;
    
    cout << "\n[Brute Force Search]" << endl;
    int idxBrute = findPatternBrute(text, pattern);
    if (idxBrute != -1) cout << "Pattern found at index " << idxBrute << endl;
    else cout << "Pattern not found." << endl;
    
    cout << "\n[Optimal Search (KMP Algorithm)]" << endl;
    int idxKMP = findPatternKMP(text, pattern);
    if (idxKMP != -1) cout << "Pattern found at index " << idxKMP << endl;
    else cout << "Pattern not found." << endl;

    return 0;
}

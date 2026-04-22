# 03 — Strings — Complete Notes

> **What You'll Learn**: String operations, pattern matching (KMP, Rabin-Karp), palindrome problems, string manipulation techniques  
> **Prerequisites**: Arrays (Topic 02)  
> **Time Required**: 1.5 weeks (15-18 hours)  
> **Importance**: 🌟🌟🌟🌟🌟 (Very high in interviews)

---

## 1. What is a String? (Real-World Analogy)

Imagine a **train** where each car carries exactly **one letter**:

```
🚂[H]─[e]─[l]─[l]─[o]─🚃
  0   1   2   3   4     ← Position numbers (indices)
```

- The **entire train** = a string (e.g., "Hello")
- Each **car** = one character
- **Position numbers** start at 0 (just like arrays!)
- You can **add/remove cars** (modify the string)
- You can **couple trains together** (concatenation)

**Key Insight**: In C++, a string is **just an array of characters** with a special marker at the end!

💡 **TRICK**: Think of strings as **beads on a necklace** — each bead is a character, strung together in order!

---

## 2. Why Do We Need Strings?

### Real-World Applications:

1. **Text Processing**: Emails, documents, messages
2. **Search Engines**: Finding patterns in web pages
3. **DNA Analysis**: Genetic sequences (A, T, G, C)
4. **Compilers**: Parsing programming code
5. **Passwords**: Validation, encryption
6. **Data Validation**: Email format, phone numbers

### Why Strings are Different from Arrays:
- **Special operations**: Concatenation, substring, search
- **Variable length**: Can grow/shrink easily
- **Built-in methods**: Many helper functions in C++
- **Null terminator**: C-strings end with `\0`

---

## 3. Core Concepts & Terminology

### 3.1 String Creation & Initialization

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Method 1: Empty string
    string s1;
    
    // Method 2: Direct initialization
    string s2 = "Hello";
    
    // Method 3: Constructor with repeated character
    string s3(5, 'A');  // "AAAAA"
    
    // Method 4: From C-string
    string s4("World");
    
    // Method 5: Copy constructor
    string s5 = s2;  // "Hello"
    
    // Print all strings
    cout << "s1: " << s1 << endl;  // (empty)
    cout << "s2: " << s2 << endl;  // Hello
    cout << "s3: " << s3 << endl;  // AAAAA
    cout << "s4: " << s4 << endl;  // World
    cout << "s5: " << s5 << endl;  // Hello
    
    return 0;
}
```

---

### 3.2 Basic String Operations

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World!";
    
    // 1. Length/Size
    cout << "Length: " << s.length() << endl;     // 13
    cout << "Size: " << s.size() << endl;         // 13 (same as length)
    
    // 2. Access characters (0-indexed!)
    cout << "First char: " << s[0] << endl;       // H
    cout << "Last char: " << s[s.size()-1] << endl;  // !
    
    // 3. Modify characters
    s[0] = 'h';  // Change 'H' to 'h'
    cout << "Modified: " << s << endl;  // hello, World!
    
    // 4. Concatenation (joining strings)
    string first = "Hello";
    string last = " World";
    string full = first + last;  // "Hello World"
    cout << "Concatenated: " << full << endl;
    
    // 5. Compare strings
    string a = "apple";
    string b = "banana";
    if(a < b) {
        cout << "apple comes before banana alphabetically" << endl;
    }
    
    return 0;
}
```

---

### 3.3 String Memory Layout

**How strings are stored**:

```
String: "Hello"

Memory: ┌───┬───┬───┬───┬───┬──────┐
        │ H │ e │ l │ l │ o │ \\0  │
        └───┴───┴───┴───┴───┴──────┘
Address: 100 101 102 103 104  105

\\0 = Null terminator (marks end of string)
```

💡 **TRICK**: The **null terminator `\\0`** is like a **STOP sign** — it tells C++ where the string ends!

---

## 4. Visual Diagram: String Operations

```
┌─────────────────────────────────────────────────────────────┐
│                    STRING OPERATIONS                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. SUBSTRING (Extract part of string)                       │
│     s = "Hello, World!"                                      │
│     s.substr(7, 5) = "World"  (start at 7, take 5 chars)    │
│                                                              │
│  2. FIND (Search for substring)                              │
│     s = "Hello, World!"                                      │
│     s.find("World") = 7  (position where "World" starts)     │
│     s.find("xyz") = string::npos  (not found)                │
│                                                              │
│  3. INSERT (Add characters at position)                      │
│     s = "Hello!"                                             │
│     s.insert(5, ", World") → "Hello, World!"                 │
│                                                              │
│  4. ERASE (Remove characters)                                │
│     s = "Hello, World!"                                      │
│     s.erase(5, 7) → "Hello!"  (remove 7 chars from pos 5)    │
│                                                              │
│  5. REPLACE (Substitute characters)                          │
│     s = "Hello, World!"                                      │
│     s.replace(7, 5, "C++") → "Hello, C++!"                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. C++ Implementation: Essential String Patterns

### Pattern 1: Reverse String

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Method 1: Two Pointers (In-place)
// Time: O(n), Space: O(1)
void reverseString(string& s) {
    int left = 0;              // Pointer at start
    int right = s.size() - 1;  // Pointer at end
    
    // Swap characters until pointers meet
    while(left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
}

// Method 2: Using STL
void reverseStringSTL(string& s) {
    reverse(s.begin(), s.end());
}

// Method 3: Create new string (if original must be preserved)
string reverseStringNew(const string& s) {
    string reversed = "";
    
    // Build string from end to start
    for(int i = s.size() - 1; i >= 0; i--) {
        reversed += s[i];
    }
    
    return reversed;
}

int main() {
    string s1 = "Hello";
    cout << "Original: " << s1 << endl;
    reverseString(s1);
    cout << "Reversed: " << s1 << endl;  // olleH
    
    return 0;
}
```

**Dry Run** (reverse "Hello"):
```
Initial: H e l l o
         0 1 2 3 4
         L     R

Step 1: Swap s[0] and s[4]
        o e l l H
          L   R

Step 2: Swap s[1] and s[3]
        o l l e H
            L,R (meet, stop)

Result: "olleH" ✓
```

---

### Pattern 2: Check Palindrome

**Real-World Example**: Palindromes are like **mirror words** — they read the same forwards and backwards!

Examples: "racecar", "madam", "level", "12321"

```cpp
#include <iostream>
#include <string>
using namespace std;

// Check if string is palindrome
// Time: O(n), Space: O(1)
bool isPalindrome(const string& s) {
    int left = 0;
    int right = s.size() - 1;
    
    // Compare from both ends
    while(left < right) {
        if(s[left] != s[right]) {
            return false;  // Mismatch found
        }
        left++;
        right--;
    }
    
    return true;  // All characters matched
}

// Check palindrome ignoring spaces and case
bool isPalindromeFlexible(const string& s) {
    int left = 0;
    int right = s.size() - 1;
    
    while(left < right) {
        // Skip spaces from left
        while(left < right && s[left] == ' ') {
            left++;
        }
        // Skip spaces from right
        while(left < right && s[right] == ' ') {
            right--;
        }
        
        // Compare (convert to lowercase)
        if(tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

int main() {
    string s1 = "racecar";
    cout << s1 << " is palindrome: " 
         << (isPalindrome(s1) ? "Yes" : "No") << endl;  // Yes
    
    string s2 = "hello";
    cout << s2 << " is palindrome: " 
         << (isPalindrome(s2) ? "Yes" : "No") << endl;  // No
    
    string s3 = "A man a plan a canal Panama";
    cout << "\"" << s3 << "\" is palindrome: " 
         << (isPalindromeFlexible(s3) ? "Yes" : "No") << endl;  // Yes
    
    return 0;
}
```

**Visual Explanation**:
```
"racecar" - Palindrome Check:

r a c e c a r
↑           ↑
Match! Move both inward

  r a c e c a r
    ↑       ↑
    Match! Move both inward

    r a c e c a r
      ↑   ↑
      Match! Move both inward

      r a c e c a r
        ↑
        Middle reached - All matched! ✓
```

---

### Pattern 3: Count Vowels and Consonants

```cpp
#include <iostream>
#include <string>
using namespace std;

// Count vowels and consonants
// Time: O(n), Space: O(1)
void countVowelsConsonants(const string& s) {
    int vowels = 0;
    int consonants = 0;
    
    for(char c : s) {
        // Only count letters
        if(isalpha(c)) {
            // Check if vowel
            char lower = tolower(c);
            if(lower == 'a' || lower == 'e' || lower == 'i' || 
               lower == 'o' || lower == 'u') {
                vowels++;
            } else {
                consonants++;
            }
        }
    }
    
    cout << "Vowels: " << vowels << endl;
    cout << "Consonants: " << consonants << endl;
}

int main() {
    string text = "Hello World";
    cout << "Text: " << text << endl;
    countVowelsConsonants(text);
    // Output: Vowels: 3, Consonants: 7
    
    return 0;
}
```

💡 **TRICK**: **Vowel Mnemonic**: Remember "**AEIOU**" — "All Elephants In Our zoo" are vowels!

---

## 6. Advanced String Patterns

### Pattern 4: Anagram Check

**Real-World Example**: Anagrams are like **scrambled words** — same letters, different order!

Examples: "listen" ↔ "silent", "earth" ↔ "heart"

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <unordered_map>
using namespace std;

// Method 1: Sorting
// Time: O(n log n), Space: O(1)
bool isAnagramSort(string s1, string s2) {
    // If lengths differ, can't be anagrams
    if(s1.length() != s2.length()) {
        return false;
    }
    
    // Sort both strings
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    
    // Compare sorted strings
    return s1 == s2;
}

// Method 2: Character Frequency (Better)
// Time: O(n), Space: O(1) [26 letters]
bool isAnagramFrequency(const string& s1, const string& s2) {
    // If lengths differ, can't be anagrams
    if(s1.length() != s2.length()) {
        return false;
    }
    
    // Count character frequencies
    int count[26] = {0};  // Array for 26 lowercase letters
    
    // Increment for s1, decrement for s2
    for(int i = 0; i < s1.length(); i++) {
        count[s1[i] - 'a']++;   // 'a'-'a'=0, 'b'-'a'=1, etc.
        count[s2[i] - 'a']--;
    }
    
    // If all counts are 0, strings are anagrams
    for(int i = 0; i < 26; i++) {
        if(count[i] != 0) {
            return false;
        }
    }
    
    return true;
}

// Method 3: Using Hash Map (Works for any characters)
// Time: O(n), Space: O(n)
bool isAnagramMap(const string& s1, const string& s2) {
    if(s1.length() != s2.length()) {
        return false;
    }
    
    unordered_map<char, int> char_count;
    
    // Count characters in s1
    for(char c : s1) {
        char_count[c]++;
    }
    
    // Decrement for s2
    for(char c : s2) {
        char_count[c]--;
        // If count goes negative, s2 has extra character
        if(char_count[c] < 0) {
            return false;
        }
    }
    
    return true;
}

int main() {
    string s1 = "listen";
    string s2 = "silent";
    
    cout << "\"" << s1 << "\" and \"" << s2 << "\"" << endl;
    cout << "Anagram (Sort): " << (isAnagramSort(s1, s2) ? "Yes" : "No") << endl;
    cout << "Anagram (Frequency): " << (isAnagramFrequency(s1, s2) ? "Yes" : "No") << endl;
    cout << "Anagram (Map): " << (isAnagramMap(s1, s2) ? "Yes" : "No") << endl;
    
    return 0;
}
```

**Dry Run** (isAnagramFrequency for "listen" and "silent"):
```
s1 = "listen", s2 = "silent"

Initialize: count[26] = {0, 0, 0, ..., 0}

Process both strings:
i=0: count['l'-'a']++ → count[11]=1, count['s'-'a']-- → count[18]=-1
i=1: count['i'-'a']++ → count[8]=1, count['i'-'a']-- → count[8]=0
i=2: count['s'-'a']++ → count[18]=0, count['l'-'a']-- → count[11]=0
i=3: count['t'-'a']++ → count[19]=1, count['e'-'a']-- → count[4]=-1
i=4: count['e'-'a']++ → count[4]=0, count['n'-'a']-- → count[13]=-1
i=5: count['n'-'a']++ → count[13]=0, count['t'-'a']-- → count[19]=0

Final: All counts = 0 → Anagrams! ✓
```

💡 **TRICK**: **Anagram Trick**: Two strings are anagrams if they have the **exact same character counts**!

---

### Pattern 5: String Compression

**Problem**: Compress string by counting consecutive characters.

Example: "aaabbc" → "a3b2c1"

```cpp
#include <iostream>
#include <string>
using namespace std;

// Compress string by counting consecutive characters
// Time: O(n), Space: O(n) for result
string compressString(const string& s) {
    string compressed = "";
    int count = 1;
    
    for(int i = 1; i <= s.length(); i++) {
        // If current char differs from previous or at end
        if(i == s.length() || s[i] != s[i-1]) {
            compressed += s[i-1];      // Add character
            compressed += to_string(count);  // Add count
            count = 1;  // Reset counter
        } else {
            count++;  // Increment counter
        }
    }
    
    // Return original if compression doesn't help
    return compressed.length() < s.length() ? compressed : s;
}

int main() {
    string s1 = "aaabbc";
    cout << "Original: " << s1 << endl;
    cout << "Compressed: " << compressString(s1) << endl;  // a3b2c1
    
    string s2 = "abc";
    cout << "Original: " << s2 << endl;
    cout << "Compressed: " << compressString(s2) << endl;  // abc (no compression)
    
    return 0;
}
```

**Visualization**:
```
String: "aaabbc"

i=1: 'a' == 'a', count=2
i=2: 'a' == 'a', count=3
i=3: 'b' != 'a', add "a3", count=1
i=4: 'b' == 'b', count=2
i=5: 'c' != 'b', add "b2", count=1
i=6: End, add "c1"

Result: "a3b2c1" ✓
```

---

### Pattern 6: Longest Common Prefix

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Find longest common prefix among strings
// Time: O(n × m), Space: O(1)
// n = number of strings, m = length of shortest string
string longestCommonPrefix(const vector<string>& strs) {
    if(strs.empty()) return "";
    
    // Take first string as reference
    string prefix = strs[0];
    
    // Compare with each string
    for(int i = 1; i < strs.size(); i++) {
        // Shorten prefix until it matches
        while(strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.length() - 1);
            
            // If prefix becomes empty, no common prefix
            if(prefix.empty()) {
                return "";
            }
        }
    }
    
    return prefix;
}

int main() {
    vector<string> words = {"flower", "flow", "flight"};
    
    cout << "Words: ";
    for(const string& word : words) {
        cout << word << " ";
    }
    cout << endl;
    
    string lcp = longestCommonPrefix(words);
    cout << "Longest Common Prefix: \"" << lcp << "\"" << endl;  // "fl"
    
    return 0;
}
```

**Dry Run**:
```
strs = ["flower", "flow", "flight"]

prefix = "flower"

Compare with "flow":
  "flow".find("flower") != 0 → shorten
  prefix = "flowe"
  "flow".find("flowe") != 0 → shorten
  prefix = "flow"
  "flow".find("flow") == 0 ✓

Compare with "flight":
  "flight".find("flow") != 0 → shorten
  prefix = "flo"
  "flight".find("flo") != 0 → shorten
  prefix = "fl"
  "flight".find("fl") == 0 ✓

Result: "fl" ✓
```

---

## 7. Pattern Matching Algorithms

### Pattern 7: Naive Pattern Matching

**Real-World Example**: Finding a **word in a book** by checking every position.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Naive pattern matching
// Time: O(n × m), Space: O(1)
// n = text length, m = pattern length
vector<int> naivePatternMatch(const string& text, const string& pattern) {
    vector<int> positions;
    int n = text.length();
    int m = pattern.length();
    
    // Try matching at each position
    for(int i = 0; i <= n - m; i++) {
        int j;
        
        // Check if pattern matches starting at position i
        for(j = 0; j < m; j++) {
            if(text[i + j] != pattern[j]) {
                break;  // Mismatch
            }
        }
        
        // If all characters matched
        if(j == m) {
            positions.push_back(i);
        }
    }
    
    return positions;
}

int main() {
    string text = "AABAACAADAABAABA";
    string pattern = "AABA";
    
    cout << "Text: " << text << endl;
    cout << "Pattern: " << pattern << endl;
    
    vector<int> positions = naivePatternMatch(text, pattern);
    
    cout << "Pattern found at positions: ";
    for(int pos : positions) {
        cout << pos << " ";
    }
    cout << endl;  // 0 9 12
    
    return 0;
}
```

**Visualization**:
```
Text:    A A B A A C A A D A A B A A B A
Pattern: A A B A
         ↑ Match at 0!

         A A B A A C A A D A A B A A B A
             A A B A
             ↑ Mismatch at index 2

         A A B A A C A A D A A B A A B A
                         A A B A
                         ↑ Match at 9!
```

---

### Pattern 8: KMP Algorithm (Knuth-Morris-Pratt)

**Why KMP?** Naive matching rechecks characters. KMP **remembers** past matches to skip unnecessary comparisons.

**Real-World Analogy**: Like reading with a **bookmark** — you don't re-read what you already checked!

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Build LPS (Longest Prefix Suffix) array
// Time: O(m), Space: O(m)
vector<int> buildLPS(const string& pattern) {
    int m = pattern.length();
    vector<int> lps(m, 0);
    
    int length = 0;  // Length of previous longest prefix suffix
    int i = 1;
    
    while(i < m) {
        if(pattern[i] == pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if(length != 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

// KMP Pattern Matching
// Time: O(n), Space: O(m)
vector<int> kmpSearch(const string& text, const string& pattern) {
    vector<int> positions;
    int n = text.length();
    int m = pattern.length();
    
    // Build LPS array
    vector<int> lps = buildLPS(pattern);
    
    int i = 0;  // Index for text
    int j = 0;  // Index for pattern
    
    while(i < n) {
        if(pattern[j] == text[i]) {
            i++;
            j++;
        }
        
        if(j == m) {
            // Pattern found!
            positions.push_back(i - j);
            j = lps[j - 1];
        }
        else if(i < n && pattern[j] != text[i]) {
            if(j != 0) {
                j = lps[j - 1];  // Skip already matched characters
            } else {
                i++;
            }
        }
    }
    
    return positions;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    
    cout << "Text: " << text << endl;
    cout << "Pattern: " << pattern << endl;
    
    vector<int> positions = kmpSearch(text, pattern);
    
    cout << "Pattern found at: ";
    for(int pos : positions) {
        cout << pos << " ";
    }
    cout << endl;
    
    return 0;
}
```

💡 **TRICK**: **KMP Insight**: The LPS array tells us "**how much of the pattern we can skip**" when there's a mismatch!

---

## 8. All Operations with Time & Space Complexity

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Access character | O(1) | O(1) | Direct indexing |
| Length/Size | O(1) | O(1) | Stored internally |
| Concatenation | O(n+m) | O(n+m) | Creates new string |
| Substring | O(k) | O(k) | k = substring length |
| Comparison | O(min(n,m)) | O(1) | Lexicographic |
| Find/Search | O(n×m) naive | O(1) | Built-in find() |
| Find (KMP) | O(n+m) | O(m) | Optimized |
| Reverse | O(n) | O(1) | In-place |
| Sort characters | O(n log n) | O(1) | Using sort() |

---

## 9. Common Patterns & Tricks

### 💡 TRICK 1: Quick String to Integer
```cpp
string num = "12345";
int value = stoi(num);  // 12345
```

### 💡 TRICK 2: String to Lowercase
```cpp
string s = "HELLO";
for(char &c : s) {
    c = tolower(c);
}
// s = "hello"
```

### 💡 TRICK 3: Check if String Contains Substring
```cpp
string text = "Hello, World!";
if(text.find("World") != string::npos) {
    cout << "Found!";
}
```

### 💡 TRICK 4: Split String by Delimiter
```cpp
string s = "apple,banana,cherry";
stringstream ss(s);
string token;
while(getline(ss, token, ',')) {
    cout << token << endl;
}
```

### 💡 TRICK 5: Remove All Spaces
```cpp
string s = "Hello World";
s.erase(remove(s.begin(), s.end(), ' '), s.end());
// s = "HelloWorld"
```

---

## 10. Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Out of Bounds Access
```cpp
string s = "Hello";
cout << s[10];  // ERROR! Length is 5
```
✅ **Fix**: Always check: `if(i < s.length())`

### ❌ Mistake 2: Comparing with == for Case-Insensitive
```cpp
if(s1 == s2)  // Case-sensitive!
```
✅ **Fix**: Convert both to lowercase first

### ❌ Mistake 3: Modifying String in Loop
```cpp
for(int i = 0; i < s.length(); i++) {
    s += 'a';  // Infinite loop! Length keeps increasing
}
```
✅ **Fix**: Store length before loop: `int n = s.length()`

### ❌ Mistake 4: Using C-string Functions on std::string
```cpp
string s = "Hello";
strlen(s);  // ERROR! strlen expects const char*
```
✅ **Fix**: Use `s.length()` or `strlen(s.c_str())`

---

## 11. Interview Tips & What Companies Ask

### Most Common Questions:
1. **Valid Palindrome** 🏢 [Amazon, Adobe]
2. **Longest Palindromic Substring** 🏢 [Amazon, Google]
3. **Valid Anagram** 🏢 [Bloomberg, Microsoft]
4. **Group Anagrams** 🏢 [Google, Amazon]
5. **Longest Substring Without Repeating** 🏢 [Amazon, Meta]
6. **String to Integer (atoi)** 🏢 [Microsoft]
7. **Implement strStr()** 🏢 [Amazon, Adobe]

### What Interviewers Look For:
- ✅ Can you handle edge cases (empty string, single char)?
- ✅ Do you know multiple approaches (brute force → optimized)?
- ✅ Can you explain KMP or Rabin-Karp?
- ✅ Space-time tradeoff awareness

---

## 12. Practice Problems

### 🟢 Easy:
1. **Reverse String** 🏢 [Adobe]
2. **Valid Palindrome** 🏢 [Amazon]
3. **First Unique Character** 🏢 [Bloomberg]
4. **Valid Anagram** 🏢 [Bloomberg]
5. **String Compression** 🏢 [Amazon]

### 🟡 Medium:
6. **Longest Palindromic Substring** 🏢 [Amazon, Google]
7. **Group Anagrams** 🏢 [Google] 📅 [Very High]
8. **Longest Substring Without Repeating** 🏢 [Amazon] 📅 [Very High]
9. **String to Integer** 🏢 [Microsoft] 📅 [High]
10. **Multiply Strings** 🏢 [Google] 📅 [Medium]

### 🔴 Hard:
11. **Regular Expression Matching** 🏢 [Google, Meta]
12. **Minimum Window Substring** 🏢 [Meta] 📅 [High]

---

## 13. Solved Example Problems

### Example 1: Longest Palindromic Substring 🏢 [Amazon]

**Problem**: Find the longest substring that is a palindrome.

**Solution**:
```cpp
#include <iostream>
#include <string>
using namespace std;

// Expand around center approach
// Time: O(n²), Space: O(1)
string longestPalindrome(string s) {
    if(s.empty()) return "";
    
    int start = 0, maxLen = 0;
    
    for(int i = 0; i < s.length(); i++) {
        // Odd length palindromes (center is one char)
        int len1 = expandAroundCenter(s, i, i);
        
        // Even length palindromes (center is between two chars)
        int len2 = expandAroundCenter(s, i, i + 1);
        
        int len = max(len1, len2);
        
        if(len > maxLen) {
            maxLen = len;
            start = i - (len - 1) / 2;
        }
    }
    
    return s.substr(start, maxLen);
}

int expandAroundCenter(const string& s, int left, int right) {
    while(left >= 0 && right < s.length() && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

int main() {
    string s = "babad";
    cout << "String: " << s << endl;
    cout << "Longest Palindrome: " << longestPalindrome(s) << endl;  // "bab" or "aba"
    
    return 0;
}
```

---

## 14. Glossary

| Term | Definition |
|------|------------|
| **String** | Sequence of characters stored contiguously |
| **Substring** | Continuous part of a string |
| **Subsequence** | Characters in order, not necessarily contiguous |
| **Palindrome** | String that reads same forwards and backwards |
| **Anagram** | Words formed by rearranging letters of another |
| **Concatenation** | Joining two strings together |
| **Null Terminator** | `\0` character marking end of C-string |
| **Pattern Matching** | Finding occurrences of pattern in text |
| **KMP Algorithm** | O(n+m) pattern matching using LPS array |
| **LPS Array** | Longest Prefix Suffix array for KMP |

---

## 15. Future Questions & Competitive Programming

### Emerging Trends:
1. **Unicode strings** — Handling multi-byte characters
2. **String hashing** — Rabin-Karp for competitive programming
3. **Suffix arrays/trees** — Advanced pattern matching
4. **String DP** — Edit distance, LCS variations

### CP String Template:
```cpp
// Fast string I/O
ios_base::sync_with_stdio(false);
cin.tie(NULL);

// String hashing
long long hash_value = 0;
for(char c : s) {
    hash_value = (hash_value * 31 + c) % 1000000007;
}
```

---

**🎉 Congratulations! You've mastered Strings!**

**Next Steps**:
1. ✅ Complete all MCQs in `03_mcqs.md`
2. ✅ Solve 20 string problems
3. ✅ Study code examples in `code/` folder
4. ✅ Move to **04_Recursion_and_Backtracking**

[← Back to README](../README.md) | [Next: Recursion →](../04_Recursion_and_Backtracking/04_notes.md)

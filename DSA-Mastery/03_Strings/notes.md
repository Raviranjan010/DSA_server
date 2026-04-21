# Strings - Complete Guide

## 📚 How to Use This Module

**Learning Path**:
1. **Read** [notes.md](notes.md) ← You are here
2. **Practice** [practice.md](practice.md) - Solve problems level by level
3. **Check Solutions** [solutions.md](solutions.md) - Only after attempting
4. **Test Yourself** [mcqs.md](mcqs.md) - MCQs for self-assessment
5. **Quick Review** [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md) - 5-minute revision
6. **If Stuck** [If_You_Get_Stuck.md](If_You_Get_Stuck.md) - Problem-solving strategy
7. **Avoid Traps** [Common_Interview_Traps.md](Common_Interview_Traps.md) - Interview mistakes

## Table of Contents

1. [What is a String?](#1-what-is-a-string)
2. [String Memory & Representation](#2-string-memory--representation)
3. [String Operations & Complexity](#3-string-operations--complexity)
4. [Common String Patterns](#4-common-string-patterns)
5. [Two Pointers for Strings](#5-two-pointers-for-strings)
6. [Sliding Window for Strings](#6-sliding-window-for-strings)
7. [String Hashing](#7-string-hashing)
8. [Pattern Matching Algorithms](#8-pattern-matching-algorithms)
9. [Decision Guide (When to Use What)](#9-decision-guide-when-to-use-what)
10. [Pattern Index Table (Quick Revision)](#10-pattern-index-table-quick-revision)
11. [Common Edge Cases in Strings](#11-common-edge-cases-in-strings)
12. [Interview Pattern Triggers](#12-interview-pattern-triggers)
13. [3-Layer Learning Approach](#13-3-layer-learning-approach)
14. [Arrays → Strings Pattern Mapping](#14-arrays--strings-pattern-mapping)
15. [Frequency Map Patterns](#15-frequency-map-patterns)
16. [Common String Pitfalls](#16-common-string-pitfalls)
17. [Must Master Problems](#17-must-master-problems)

---

## 1. What is a String?

### Simple Definition

**String** = A sequence of characters stored in contiguous memory.

**Real-Life Example**: 
- A word or sentence
- "Hello" is a string of 5 characters
- Each character has a position (index)

### String in C++

```cpp
// C-style string (character array)
char str1[] = "Hello";  // Null-terminated: 'H','e','l','l','o','\0'

// C++ string (use this!)
#include <string>
string str2 = "Hello";  // Easier to use, more features
```

### Why Strings are Important?

- **Most common** interview topic
- **Real-world applications**: Text processing, search, validation
- **Builds on arrays**: All array techniques apply to strings
- **Foundation** for advanced topics (tries, suffix trees)

---

## 2. String Memory & Representation

### How Strings are Stored

```cpp
string s = "Hello";
```

**Memory Layout**:
```
Index:     0      1      2      3      4      5
Char:     'H'    'e'    'l'    'l'    'o'   '\0'
Address:  1000   1001   1002   1003   1004   1005
```

**Key Points**:
- C-style strings end with `'\0'` (null terminator)
- C++ strings handle this automatically
- Each char = 1 byte (ASCII)

### String Immutability (Important!)

**In C++**: Strings are **mutable** (can be changed)
```cpp
string s = "Hello";
s[0] = 'Y';  // s becomes "Yello" ✓
```

**In other languages** (Java, Python): Strings are **immutable**
```java
// Java example
String s = "Hello";
s.charAt(0) = 'Y';  // ERROR! Cannot modify
```

---

## 3. String Operations & Complexity

### Time Complexity of Operations

| Operation | Syntax | Time Complexity | Notes |
|-----------|--------|----------------|-------|
| Access | `s[i]` | **O(1)** | Direct index access |
| Length | `s.length()` | **O(1)** | Stored internally |
| Concatenate | `s1 + s2` | **O(n+m)** | Creates new string |
| Compare | `s1 == s2` | **O(min(n,m))** | Character by character |
| Substring | `s.substr(pos, len)` | **O(len)** | Copies substring |
| Find | `s.find(sub)` | **O(n×m)** | Naive search |
| Reverse | `reverse(s.begin(), s.end())` | **O(n)** | In-place |

### Common String Functions

```cpp
string s = "Hello World";

// Length
cout << s.length();  // 11

// Access
cout << s[0];  // 'H'

// Substring
cout << s.substr(0, 5);  // "Hello"
cout << s.substr(6);     // "World"

// Find
int pos = s.find("World");  // Returns 6
if (pos == string::npos) {
    cout << "Not found";
}

// Compare
if (s == "Hello World") cout << "Equal";

// Append
s += "!";  // "Hello World!"

// Insert
s.insert(5, ",");  // "Hello, World!"

// Erase
s.erase(5, 1);  // Remove 1 char at position 5

// Convert to C-string
const char* cstr = s.c_str();
```

---

## 4. Common String Patterns

### Pattern 1: String Traversal

```cpp
// Method 1: Index-based
for (int i = 0; i < s.length(); i++) {
    cout << s[i];
}

// Method 2: Range-based
for (char c : s) {
    cout << c;
}

// Method 3: Reverse
for (int i = s.length() - 1; i >= 0; i--) {
    cout << s[i];
}
```

### Pattern 2: Palindrome Check

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    
    return true;
}

// Example: "madam"
// left=0 ('m'), right=4 ('m') → match
// left=1 ('a'), right=3 ('a') → match
// left=2 ('d'), right=2 ('d') → done, palindrome!
```

### Pattern 3: String Reversal

```cpp
// In-place reversal
void reverseString(string& s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
}

// Example: "hello"
// Step 1: swap 'h' and 'o' → "oellh"
// Step 2: swap 'e' and 'l' → "olleh"
```

### Pattern 4: Character Frequency

```cpp
// Using array (for lowercase letters)
vector<int> freq(26, 0);
for (char c : s) {
    freq[c - 'a']++;
}

// Using hash map (for any characters)
unordered_map<char, int> freq;
for (char c : s) {
    freq[c]++;
}
```

---

## 5. Two Pointers for Strings

### Pattern 1: Palindrome with Skip

**Problem**: Valid Palindrome (ignore non-alphanumeric)

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isalnum(s[left])) left++;
        
        // Skip non-alphanumeric from right
        while (left < right && !isalnum(s[right])) right--;
        
        // Compare
        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// Example: "A man, a plan, a canal: Panama"
// Skip spaces and punctuation, compare only letters
```

### Pattern 2: String Compression

**Problem**: Compress string by counting consecutive characters

```cpp
string compress(string s) {
    string result = "";
    int count = 1;
    
    for (int i = 1; i <= s.length(); i++) {
        if (i < s.length() && s[i] == s[i-1]) {
            count++;
        } else {
            result += s[i-1];
            if (count > 1) {
                result += to_string(count);
            }
            count = 1;
        }
    }
    
    return result;
}

// Example: "aaabbc"
// 'a' appears 3 times → "a3"
// 'b' appears 2 times → "b2"
// 'c' appears 1 time → "c"
// Result: "a3b2c"
```

---

## 6. Sliding Window for Strings

### Sliding Window Master Template

**This template works for 90% of string sliding window problems:**

```cpp
int slidingWindow(string s) {
    // Initialize window boundaries
    int left = 0, right = 0;
    
    // Track window state (frequency map, set, etc.)
    unordered_map<char, int> window;
    
    // Track answer
    int result = 0;
    
    while (right < s.length()) {
        // STEP 1: Expand window by adding s[right]
        window[s[right]]++;
        
        // STEP 2: Shrink window if invalid
        while (window_is_invalid) {
            window[s[left]]--;
            if (window[s[left]] == 0) {
                window.erase(s[left]);
            }
            left++;
        }
        
        // STEP 3: Update answer
        result = max(result, right - left + 1);
        
        // STEP 4: Move right pointer
        right++;
    }
    
    return result;
}
```

**Key Variables to Track:**
- `left`, `right`: Window boundaries
- `window`: Frequency map or set of characters
- `result`: Answer (max/min length, count, etc.)
- Validation condition: What makes window valid/invalid?

### Pattern 1: Longest Substring Without Repeating Characters

**Brute Force → Optimal Evolution:**

**Brute Force O(n³)**:
```cpp
// Check all substrings
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        // Check if s[i..j] has all unique chars
        // O(n) check → Total O(n³)
    }
}
```

**Optimal O(n)**:
```cpp
int lengthOfLongestSubstring(string s) {
    vector<int> lastSeen(256, -1);  // ASCII characters
    int maxLength = 0, start = 0;
    
    for (int end = 0; end < s.length(); end++) {
        // If character already seen, move start
        if (lastSeen[s[end]] >= start) {
            start = lastSeen[s[end]] + 1;
        }
        
        lastSeen[s[end]] = end;
        maxLength = max(maxLength, end - start + 1);
    }
    
    return maxLength;
}
```

**Detailed Dry Run #1**:
```
String: "abcabcbb"

Iteration-by-iteration:

end=0: char='a'
  lastSeen['a'] = -1 (not seen in current window)
  window = "a"
  maxLength = 1
  lastSeen['a'] = 0

end=1: char='b'
  lastSeen['b'] = -1 (not seen)
  window = "ab"
  maxLength = 2
  lastSeen['b'] = 1

end=2: char='c'
  lastSeen['c'] = -1 (not seen)
  window = "abc"
  maxLength = 3
  lastSeen['c'] = 2

end=3: char='a'
  lastSeen['a'] = 0 ≥ start=0 (SEEN!)
  start = 0 + 1 = 1  ← Move start past previous 'a'
  window = "bca"
  maxLength = 3
  lastSeen['a'] = 3

end=4: char='b'
  lastSeen['b'] = 1 ≥ start=1 (SEEN!)
  start = 1 + 1 = 2  ← Move start past previous 'b'
  window = "cab"
  maxLength = 3
  lastSeen['b'] = 4

end=5: char='c'
  lastSeen['c'] = 2 ≥ start=2 (SEEN!)
  start = 2 + 1 = 3
  window = "abc"
  maxLength = 3
  lastSeen['c'] = 5

end=6: char='b'
  lastSeen['b'] = 4 ≥ start=3 (SEEN!)
  start = 4 + 1 = 5
  window = "cb"
  maxLength = 3
  lastSeen['b'] = 6

end=7: char='b'
  lastSeen['b'] = 6 ≥ start=5 (SEEN!)
  start = 6 + 1 = 7
  window = "b"
  maxLength = 3

Visual:
  a b c a b c b b
  ↑     ↑
 start  end
  
  a b c a b c b b
      ↑   ↑
    start end  ← Duplicate 'a', move start

Answer: 3 ("abc", "bca", "cab")
```

**Detailed Dry Run #2**:
```
String: "pwwkew"

end=0: 'p', lastSeen['p']=-1, start=0, window="p", max=1
end=1: 'w', lastSeen['w']=-1, start=0, window="pw", max=2
end=2: 'w', lastSeen['w']=1≥start=0 → start=2
               window="w", max=2
end=3: 'k', lastSeen['k']=-1, start=2, window="wk", max=2
end=4: 'e', lastSeen['e']=-1, start=2, window="wke", max=3
end=5: 'w', lastSeen['w']=2≥start=2 → start=3
               window="kew", max=3

Answer: 3 ("wke" or "kew")
```

**Detailed Dry Run #3**:
```
String: "abba"

end=0: 'a', lastSeen['a']=-1, start=0, window="a", max=1
       lastSeen['a']=0

end=1: 'b', lastSeen['b']=-1, start=0, window="ab", max=2
       lastSeen['b']=1

end=2: 'b', lastSeen['b']=1≥start=0 → start=2
       window="b", max=2
       lastSeen['b']=2

end=3: 'a', lastSeen['a']=0<start=2 (OLD, ignore!)
       window="ba", max=2
       lastSeen['a']=3

Key Insight: lastSeen['a']=0 is OLD (before start=2)
So we don't move start. This 'a' is new in current window!

Answer: 2 ("ab" or "ba")
```

### Pattern 2: Longest Repeating Character Replacement

```cpp
int characterReplacement(string s, int k) {
    vector<int> freq(26, 0);
    int maxFreq = 0, maxLength = 0, left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        freq[s[right] - 'A']++;
        maxFreq = max(maxFreq, freq[s[right] - 'A']);
        
        // If need more than k replacements, shrink window
        while ((right - left + 1) - maxFreq > k) {
            freq[s[left] - 'A']--;
            left++;
        }
        
        maxLength = max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Example: s = "AABABBA", k = 1
// Window expands until we need >1 replacement
// Answer: 4 ("AABA" or "ABBA")
```

---

## 7. String Hashing

### What is String Hashing?

**Idea**: Convert string to integer for fast comparison.

**When to use**:
- Pattern matching
- String comparison in O(1)
- Rolling hash for substrings

### Rolling Hash Implementation

```cpp
class RollingHash {
private:
    long long hash;
    long long prime;
    long long mod;
    
public:
    RollingHash(long long p = 31, long long m = 1e9 + 7) {
        prime = p;
        mod = m;
        hash = 0;
    }
    
    void addChar(char c) {
        hash = (hash * prime + (c - 'a' + 1)) % mod;
    }
    
    long long getHash() {
        return hash;
    }
};

// Example usage
RollingHash rh;
rh.addChar('a');
rh.addChar('b');
cout << rh.getHash();  // Hash value for "ab"
```

---

## 8. Pattern Matching Algorithms

### Naive Pattern Matching O(n×m)

```cpp
vector<int> naiveSearch(string text, string pattern) {
    vector<int> positions;
    int n = text.length(), m = pattern.length();
    
    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++) {
            if (text[i + j] != pattern[j]) break;
        }
        if (j == m) positions.push_back(i);
    }
    
    return positions;
}
```

### KMP Algorithm O(n+m)

**Why KMP? The Problem with Naive Search:**

```
Text:    A B A B A B A B C
Pattern: A B A B C

Naive approach:
- Match "A B A B" then fail at 'C'
- Start over from next position
- We recompare "B A B" that we already matched!
- Wasteful! O(n×m)

KMP insight:
- "A B A B" has internal structure!
- Prefix "A B" = Suffix "A B"
- When we fail at 'C', we already know first "A B" matches
- Skip ahead! Don't recompare
- O(n+m) total
```

**The Key Intuition - LPS Array:**

**LPS[i]** = Length of **L**ongest **P**roper prefix that is also a **S**uffix for pattern[0..i]

```
Pattern: A B A B C

i=0: "A"       → LPS[0] = 0 (no proper prefix)
i=1: "A B"     → LPS[1] = 0 (no prefix = suffix)
i=2: "A B A"   → LPS[2] = 1 (prefix "A" = suffix "A")
i=3: "A B A B" → LPS[3] = 2 (prefix "A B" = suffix "A B")
i=4: "A B A B C" → LPS[4] = 0 (no prefix = suffix)

LPS = [0, 0, 1, 2, 0]
```

**Why This Works:**
```
When mismatch happens at pattern[j]:
- We've matched pattern[0..j-1]
- LPS[j-1] tells us: "How much of the beginning matches the end?"
- Instead of starting from j=0, jump to j=LPS[j-1]
- We SKIP recomparisons!

Example:
Text:    ... A B A B D ...
Pattern:     A B A B C
                    ↑ mismatch!

LPS[3] = 2 means "A B" at start = "A B" at end
So we know text has "A B" before 'D'
Skip pattern to j=2:

Text:    ... A B A B D ...
Pattern:       A B A B C
                ↑ continue from here

We didn't recompare "A B" - saved work!
```

**Build LPS Array**:
```cpp
vector<int> buildLPS(string pattern) {
    int m = pattern.length();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    
    // len: length of previous longest prefix suffix
    // i: current position we're computing
    
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            // Found longer prefix = suffix
            len++;
            lps[i] = len;
            i++;
        } else {
            // Mismatch: fall back to shorter prefix
            if (len != 0) {
                len = lps[len - 1];  // Try shorter prefix
                // Don't increment i, retry with new len
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}
```

**LPS Build Dry Run**:
```
Pattern: "A B A B C"

i=1, len=0: pattern[1]='B' != pattern[0]='A'
  len=0 → lps[1]=0, i=2

i=2, len=0: pattern[2]='A' == pattern[0]='A'
  len=1, lps[2]=1, i=3

i=3, len=1: pattern[3]='B' == pattern[1]='B'
  len=2, lps[3]=2, i=4

i=4, len=2: pattern[4]='C' != pattern[2]='A'
  len≠0 → len=lps[1]=0
  len=0: pattern[4]='C' != pattern[0]='A'
  lps[4]=0, i=5

LPS = [0, 0, 1, 2, 0] ✓
```

// KMP Search
vector<int> kmpSearch(string text, string pattern) {
    vector<int> positions;
    vector<int> lps = buildLPS(pattern);
    
    int n = text.length(), m = pattern.length();
    int i = 0, j = 0;
    
    while (i < n) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }
        
        if (j == m) {
            positions.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    
    return positions;
}
```

---

## 9. Decision Guide (When to Use What)

### Quick Decision Framework

**When you see a string problem:**

```
1. Check if asking for palindrome?
   ↓ YES → Two pointers from both ends
   ↓ NO  → Continue
   
2. Looking for substring/subsequence?
   ↓ YES → Sliding window or DP
   ↓ NO  → Continue
   
3. Pattern matching?
   ↓ YES → KMP or Rabin-Karp
   ↓ NO  → Continue
   
4. Need to compare strings efficiently?
   ↓ YES → String hashing
   ↓ NO  → Continue
   
5. Count/rearrange characters?
   ↓ YES → Frequency array/map
   ↓ NO  → Simple traversal
```

### Constraint → Approach Mapping Table

| Constraint | String Length | Allowed Complexity | Typical Approach |
|------------|--------------|-------------------|------------------|
| n ≤ 20 | Tiny | O(2ⁿ), O(n!) | Recursion, backtracking |
| n ≤ 100 | Small | O(n³), O(n⁴) | DP, brute force |
| n ≤ 1000 | Medium | O(n²) | DP, nested loops |
| n ≤ 10⁵ | Large | O(n), O(n log n) | Two pointers, sliding window, hashing |
| n ≤ 10⁶ | Very Large | O(n) | Linear scan, KMP |

---

## 10. Pattern Index Table (Quick Revision)

### Quick Reference for All String Patterns

| Pattern | When to Use | Time | Space | Key Idea | Example Problems |
|---------|-------------|------|-------|----------|------------------|
| **Two Pointers** | Palindrome, reverse | O(n) | O(1) | left=0, right=n-1 | Valid palindrome, reverse |
| **Sliding Window** | Longest substring | O(n) | O(1) or O(Σ) | Expand & shrink | Longest without repeating |
| **Frequency Array** | Count characters | O(n) | O(1) or O(Σ) | Array of size 26 | Anagram, permutation |
| **Hash Map** | Character frequency | O(n) | O(Σ) | Map char to count | First unique character |
| **String Hashing** | Pattern matching | O(n+m) | O(1) | Rolling hash | Rabin-Karp |
| **KMP** | Pattern matching | O(n+m) | O(m) | LPS array | Find all occurrences |
| **Trie** | Prefix search | O(n×L) | O(n×L×Σ) | Tree structure | Autocomplete, word search |
| **DP** | Subsequence, edit distance | O(n×m) | O(n×m) | Build table | LCS, edit distance |

---

## 11. Common Edge Cases in Strings

### Categorized Edge Cases

#### Category 1: Empty/Single Character
- Empty string `""`
- Single character `"a"`
- String with only spaces `"   "`

#### Category 2: Case Sensitivity
- Mixed case: `"AbC"`
- Should you ignore case? Clarify!
- Use `tolower()` or `toupper()`

#### Category 3: Special Characters
- Punctuation: `"Hello, World!"`
- Numbers: `"abc123"`
- Unicode/Emoji (rare in interviews)

#### Category 4: Whitespace
- Leading/trailing spaces: `"  hello  "`
- Multiple spaces: `"a  b  c"`
- Tabs and newlines

#### Category 5: Very Long Strings
- Length 10⁵ or more
- Watch for O(n²) solutions → TLE
- Use efficient algorithms

#### Category 6: Duplicate Characters
- All same: `"aaaaa"`
- All unique: `"abcdef"`
- Mixed: `"aabbcc"`

---

## 12. Interview Pattern Triggers

### Trigger 1: "Palindrome" Keywords

**Keywords**: "palindrome", "reads same forwards and backwards"

**Immediate Thought**: Two Pointers

**Code Template**:
```cpp
int left = 0, right = s.length() - 1;
while (left < right) {
    if (s[left] != s[right]) return false;
    left++;
    right--;
}
return true;
```

### Trigger 2: "Longest Substring" Keywords

**Keywords**: "longest substring", "maximum length", "without repeating"

**Immediate Thought**: Sliding Window

**Code Template**:
```cpp
int left = 0, maxLength = 0;
for (int right = 0; right < s.length(); right++) {
    // Add s[right] to window
    while (invalid_condition) {
        // Remove s[left]
        left++;
    }
    maxLength = max(maxLength, right - left + 1);
}
```

### Trigger 3: "Anagram" Keywords

**Keywords**: "anagram", "permutation", "same characters"

**Immediate Thought**: Frequency Array/Map

**Code Template**:
```cpp
vector<int> freq1(26, 0), freq2(26, 0);
for (char c : s1) freq1[c - 'a']++;
for (char c : s2) freq2[c - 'a']++;
return freq1 == freq2;
```

### Trigger 4: "Pattern Matching" Keywords

**Keywords**: "find pattern", "search substring", "all occurrences"

**Immediate Thought**: KMP or Rabin-Karp

---

## 13. 3-Layer Learning Approach

### Layer 1: Beginner (What & How)
- String declaration and basic operations
- Traversal and simple manipulations
- Palindrome check

### Layer 2: Intermediate (Why & When)
- Two pointers and sliding window
- Frequency counting techniques
- When to use which pattern

### Layer 3: Advanced (Optimization)
- String hashing and KMP
- Complex sliding window problems
- DP on strings

---

## 14. Arrays → Strings Pattern Mapping

### How Array Techniques Translate to Strings

**Strings are just arrays of characters!** Every array pattern works on strings:

| Array Pattern | String Equivalent | Example |
|--------------|-------------------|----------|
| Two Sum | Two Sum with characters | Find pair that sums to target ASCII |
| Maximum Subarray | Longest substring | Kadane's on character values |
| Reverse Array | Reverse String | Same two pointer approach |
| Rotate Array | Rotate String | Reverse technique works |
| Frequency Count | Character frequency | Array of size 26 for 'a'-'z' |
| Prefix Sum | Prefix hash | Rolling hash for substrings |
| Sliding Window | Sliding window on string | Longest substring without repeating |

### Key Differences

**Arrays**:
- Elements can be any type
- Operations: arithmetic, comparison
- Duplicates handled normally

**Strings**:
- Elements are characters (ASCII/Unicode)
- Operations: concatenation, substring, pattern matching
- Case sensitivity matters
- Special characters (spaces, punctuation)

### Pattern Translation Examples

**Two Pointers on Arrays**:
```cpp
// Array: Find if pair with sum X exists
int left = 0, right = n - 1;
while (left < right) {
    if (arr[left] + arr[right] == X) return true;
    else if (arr[left] + arr[right] < X) left++;
    else right--;
}
```

**Two Pointers on Strings**:
```cpp
// String: Check palindrome
int left = 0, right = s.length() - 1;
while (left < right) {
    if (s[left] != s[right]) return false;
    left++;
    right--;
}
return true;
```

**Sliding Window on Arrays**:
```cpp
// Array: Max sum subarray of size k
for (int right = 0; right < n; right++) {
    sum += arr[right];
    if (right >= k) sum -= arr[right - k];
    if (right >= k - 1) maxSum = max(maxSum, sum);
}
```

**Sliding Window on Strings**:
```cpp
// String: Longest substring without repeating
for (int right = 0; right < n; right++) {
    while (seen.count(s[right])) {
        seen.erase(s[left]);
        left++;
    }
    seen.insert(s[right]);
    maxLen = max(maxLen, right - left + 1);
}
```

---

## 15. Frequency Map Patterns

### Pattern 1: Character Frequency Array

**When**: Only lowercase/uppercase letters

```cpp
// For lowercase 'a'-'z'
vector<int> freq(26, 0);
for (char c : s) {
    freq[c - 'a']++;
}

// Check if two strings are anagrams
bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> freq(26, 0);
    
    for (char c : s) freq[c - 'a']++;
    for (char c : t) freq[c - 'a']--;
    
    for (int count : freq) {
        if (count != 0) return false;
    }
    return true;
}
```

### Pattern 2: Sliding Window Frequency

**When**: Find substring with specific character counts

```cpp
// Find all anagrams of p in s
vector<int> findAnagrams(string s, string p) {
    vector<int> result;
    if (s.length() < p.length()) return result;
    
    vector<int> pFreq(26, 0), sFreq(26, 0);
    
    // Build frequency for p and first window
    for (int i = 0; i < p.length(); i++) {
        pFreq[p[i] - 'a']++;
        sFreq[s[i] - 'a']++;
    }
    
    if (pFreq == sFreq) result.push_back(0);
    
    // Slide window
    for (int i = p.length(); i < s.length(); i++) {
        sFreq[s[i] - 'a']++;  // Add new char
        sFreq[s[i - p.length()] - 'a']--;  // Remove old char
        
        if (pFreq == sFreq) {
            result.push_back(i - p.length() + 1);
        }
    }
    
    return result;
}
```

### Pattern 3: Two Pointer with Frequency

**When**: Minimum window substring

```cpp
string minWindow(string s, string t) {
    if (s.empty() || t.empty()) return "";
    
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;
    
    int have = 0, need_count = need.size();
    int left = 0, minLen = INT_MAX, start = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s[right];
        window[c]++;
        
        if (need.count(c) && window[c] == need[c]) {
            have++;
        }
        
        while (have == need_count) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }
            
            char leftChar = s[left];
            window[leftChar]--;
            if (need.count(leftChar) && window[leftChar] < need[leftChar]) {
                have--;
            }
            left++;
        }
    }
    
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}
```

### Frequency Pattern Decision Tree

```
Need character counts?
    ↓
Only 'a'-'z' or 'A'-'Z'?
    ↓ YES → Use array of size 26 or 52
    ↓ NO
    ↓
All ASCII characters?
    ↓ YES → Use array of size 256
    ↓ NO
    ↓
Unicode or sparse?
    ↓ YES → Use hash map
```

---

## 16. Common String Pitfalls

### Pitfall 1: Off-by-One in Substring

```cpp
// WRONG ❌
string sub = s.substr(start, end);  // Second param is LENGTH, not end index!

// CORRECT ✅
string sub = s.substr(start, end - start + 1);  // Length = end - start + 1
```

### Pitfall 2: Modifying String While Iterating

```cpp
// WRONG ❌
for (int i = 0; i < s.length(); i++) {
    s.erase(i, 1);  // Changes length, skips characters!
}

// CORRECT ✅
string result = "";
for (char c : s) {
    if (shouldKeep(c)) result += c;
}
s = result;
```

### Pitfall 3: Forgetting Null Terminator in C-Strings

```cpp
// WRONG ❌
char str[5];
strcpy(str, "Hello");  // Needs 6 bytes (5 chars + '\0')

// CORRECT ✅
char str[6];
strcpy(str, "Hello");  // Fits!
```

### Pitfall 4: Case Sensitivity Bugs

```cpp
// WRONG ❌
if (s[i] == 'a')  // Only matches lowercase

// CORRECT ✅
if (tolower(s[i]) == 'a')  // Matches both 'A' and 'a'
```

### Pitfall 5: Integer Overflow in Hashing

```cpp
// WRONG ❌
long long hash = 0;
for (char c : s) {
    hash = hash * 31 + c;  // Overflows!
}

// CORRECT ✅
long long hash = 0;
long long MOD = 1e9 + 7;
for (char c : s) {
    hash = (hash * 31 + c) % MOD;  // Apply modulo
}
```

### Pitfall 6: Not Handling Empty Strings

```cpp
// WRONG ❌
char first = s[0];  // Crashes if s is empty!

// CORRECT ✅
if (s.empty()) return;
char first = s[0];
```

### Pitfall 7: Using == for String Comparison in C

```cpp
// WRONG ❌ (C-style strings)
char s1[] = "hello";
char s2[] = "hello";
if (s1 == s2)  // Compares addresses, not content!

// CORRECT ✅
if (strcmp(s1, s2) == 0)  // Compares content

// In C++, use std::string
string s1 = "hello";
string s2 = "hello";
if (s1 == s2)  // ✓ Works correctly
```

### Pitfall Checklist

Before submitting:
- [ ] Checked for empty string?
- [ ] Handled single character?
- [ ] Case sensitivity correct?
- [ ] Substring parameters correct (start, length)?
- [ ] No out-of-bounds access?
- [ ] No modification during iteration?
- [ ] Hash values won't overflow?
- [ ] Whitespace handled properly?

---

## 17. Must Master Problems

### Tier 1: Absolute Must (Interview Essentials)

These appear in 70%+ of string interviews:

1. **Valid Palindrome** - Two pointers foundation
2. **Longest Substring Without Repeating** - Sliding window classic
3. **Valid Anagram** - Frequency array basics
4. **Group Anagrams** - Hash map + sorting
5. **Longest Palindromic Substring** - Expand around center
6. **Valid Parentheses** - Stack application

### Tier 2: Strong Foundation (Common in FAANG)

7. **Longest Common Prefix** - String comparison
8. **String Compression** - Two pointers
9. **Minimum Window Substring** - Advanced sliding window
10. **First Unique Character** - Frequency counting
11. **String to Integer (atoi)** - Edge case mastery
12. **Implement strStr()** - Pattern matching

### Tier 3: Advanced (For Senior Roles)

13. **Edit Distance** - DP on strings
14. **Regular Expression Matching** - Complex DP
15. **Longest Palindromic Subsequence** - DP variation
16. **Word Ladder** - BFS + strings
17. **Implement Trie** - Data structure design
18. **Basic Calculator** - Parsing + stack

### How to Master:

**Week 1**: Tier 1 (solve each 3 times)
**Week 2**: Tier 2 (solve each 2 times)
**Week 3**: Tier 3 (solve once, understand deeply)
**Week 4**: Mock interviews with random problems

**Mastery Checklist**:
- [ ] Can solve without looking at solution
- [ ] Can explain time/space complexity
- [ ] Can handle all edge cases
- [ ] Can write bug-free code in 20-30 mins
- [ ] Can optimize from brute force

---

## 🧠 Active Recall Questions

**Instructions**: Answer these WITHOUT looking at the notes.

### String Basics
1. What's the time complexity of string concatenation?
2. How do you reverse a string in-place?
3. What's the difference between `s.length()` and finding length manually?

### Two Pointers
4. How do you check if a string is a palindrome?
5. How do you handle case-insensitive palindrome check?
6. How do you skip non-alphanumeric characters?

### Sliding Window
7. When should you use sliding window on strings?
8. How do you track character frequencies in a window?
9. How do you know when to shrink the window?

### Pattern Recognition
10. You see "longest substring without repeating" → What pattern?
11. You see "check if anagram" → What pattern?
12. You see "find all occurrences of pattern" → What algorithm?

### Edge Cases
13. How do you handle empty strings?
14. What if string contains only spaces?
15. How do you handle mixed case?

---

**Check Your Answers**: Review relevant sections or check [solutions.md](solutions.md)

---

## 🎯 Quick Navigation

**Need to...**
- Learn concepts? → You're in [notes.md](notes.md) ✓
- Practice problems? → Go to [practice.md](practice.md)
- Check solutions? → Go to [solutions.md](solutions.md)
- Test yourself? → Go to [mcqs.md](mcqs.md)
- Quick revision? → Go to [Quick_Revision_Cheatsheet.md](Quick_Revision_Cheatsheet.md)
- Feeling stuck? → Go to [If_You_Get_Stuck.md](If_You_Get_Stuck.md)
- Prepare for interview? → Go to [Common_Interview_Traps.md](Common_Interview_Traps.md)

---

**Master strings before moving to advanced topics! They appear in 70%+ of interviews! 🚀**

**Next Topic**: After completing all practice problems and scoring 80%+ on MCQs, move to [04_Linked_Lists](../04_Linked_Lists/notes.md)

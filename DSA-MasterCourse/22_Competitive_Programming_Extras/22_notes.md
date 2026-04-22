## 22_Competitive_Programming_Extras — Complete Notes

### 1. What is it? (Real-world analogy)
Imagine standard DSA as the "physics" of programming — it teaches you how gravity and motion work. Competitive Programming (CP) Extras are like "quantum mechanics" or specialized engineering tricks. It’s pure Mathematics applied to code.

This involves Number Theory, Combinatorics (calculating "how many ways" without actually counting them), Modular Arithmetic (math on a clock face so numbers don't explode), and Game Theory (determining if Player A or B wins a game assuming optimal play).

### 2. Why do we need it?
- **Preventing Overflows**: Math answers in CP can exceed `10^1000`. We need Modulo Math (usually `10^9 + 7`) to keep it fitting inside a standard integer, while keeping calculations completely accurate.
- **Factorization Speed**: Checking if a billion-digit password is prime directly is impossible. We need mathematical sieves.
- **Probability & Counting**: High-frequency algorithmic jobs (Quantitative Finance) test heavily on the math behind coding. 

### 3. Core Concepts & Terminology
- **Modulo Arithmetic**: `(A + B) % M = ((A % M) + (B % M)) % M`. Same applies for multiplication.
- **Modular Inverse**: You *cannot* just do `(A / B) % M`. Division fails under modulo! You must multiply `A` by the "Modular Inverse" of `B`.
- **Sieve of Eratosthenes**: Generating all prime numbers up to `N` in `O(N log log N)`.
- **Fermat's Little Theorem**: If M is prime, `A^(M-1) ≡ 1 (mod M)`. Used to find Modular Inverse.
- **Game Theory (Nim)**: Determining the winner of turn-based games using the XOR sum of the board states.

### 4. Visual Diagram
```text
Sieve of Eratosthenes (Find primes up to 10)
List: 2 3 4 5 6 7 8 9 10
- Pick 2. Cross out multiples of 2.
  -> 2 3 [x] 5 [x] 7 [x] 9 [x]
- Next uncrossed is 3. Pick 3. Cross out multiples.
  -> 2 3 [x] 5 [x] 7 [x] [x] [x]
- Next is 5.
Result primes: 2, 3, 5, 7.
```

### 5. C++ Implementation
```cpp
#include <iostream>
#include <vector>
using namespace std;

// ===================================
// 1. GCD (Greatest Common Divisor) - Euclidean Algorithm
// Time: O(log(min(A, B)))
// ===================================
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b); // Keep doing a % b until b is 0
}

// ===================================
// 2. Fast Exponentiation (a^b % MOD)
// Time: O(log B)
// ===================================
long long power(long long base, long long exp, long long mod) {
    long long res = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) { // If exponent is odd
            res = (res * base) % mod;
        }
        base = (base * base) % mod; // Square the base
        exp /= 2;
    }
    return res;
}

// ===================================
// 3. Sieve of Eratosthenes
// Time: O(N log log N)
// ===================================
vector<int> generatePrimes(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            // Update all multiples of p
            for (int i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }
    
    // Collect them
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push_back(i);
    }
    return primes;
}

int main() {
    cout << "GCD(48, 18) = " << gcd(48, 18) << endl;
    cout << "2^10 % 1e9+7 = " << power(2, 10, 1e9+7) << endl;
    
    cout << "Primes up to 20: ";
    for (int p : generatePrimes(20)) cout << p << " ";
    cout << endl;
    
    return 0;
}
```

### 6. Dry Run / Step-by-Step Trace
**GCD of 48 and 18:**
- `gcd(48, 18)` -> `b = 18 != 0`. Call `gcd(18, 48 % 18)`. `48 % 18 = 12`.
- `gcd(18, 12)` -> `b = 12 != 0`. Call `gcd(12, 18 % 12)`. `18 % 12 = 6`.
- `gcd(12, 6)`  -> `b = 6 != 0`. Call `gcd(6, 12 % 6)`. `12 % 6 = 0`.
- `gcd(6, 0)`   -> `b == 0`. Return `a` which is `6`. 
Result is 6.

### 7. All Operations with Time & Space Complexity
| Algorithm | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Euclidean GCD | `O(log(min(A,B)))` | `O(1)` |
| Fast Exponentiation | `O(log N)` | `O(1)` |
| Sieve of Eratosthenes | `O(N log log N)` | `O(N)` |
| Primality Test | `O(sqrt(N))` | `O(1)` |

### 8. Common Patterns & Tricks
💡 TRICK 1: **LCM with GCD** 
LCM (Least Common Multiple) of A and B is `(A * B) / GCD(A, B)`.

💡 TRICK 2: **Modular Inverse for Division**
`(A / B) % M = (A * modInverse(B, M)) % M`.
By Fermat’s Little Theorem, if M is prime, `modInverse(B, M)` is simply `power(B, M-2) % M`.

💡 TRICK 3: **Game Theory (Nim Game)**
Given piles of stones where a player can remove any amount from one pile:
*If the XOR sum of all pile sizes is non-zero, the FIRST player wins (assuming optimal play).*

### 9. Common Mistakes & How to Avoid Them
❌ **Mistake:** Assuming `A * B % MOD` is safe for large `int`.
✅ **Fix:** If `A` and `B` are around `10^9`, their multiplication yields `10^18`, which overflows standard 32-bit signed `int` instantly. Always cast to `long long` before multiplying: `(1LL * A * B) % MOD`.

❌ **Mistake:** Calculating modulo at the very end of 20 additions.
✅ **Fix:** Modulo EVERY time you add or multiply in a loop. `sum = (sum + arr[i]) % MOD;`.

### 10. Interview Tips & What Companies Ask
- High Frequency Trading (HFT) companies like **Tower Research, Optiver, Jane Street** ask math and probability questions heavily.
- Game theory (Nim variants) is sometimes asked in **Google** hard screening rounds.
- Fast exponentiation (`pow(x, n)`) is a standard **Meta** phone interview question.

### 11. Practice Problems
1. 🟢 Pow(x, n) `[Meta]`
2. 🟢 Count Primes (Sieve) `[Amazon]`
3. 🟡 Factorial Trailing Zeroes `[Microsoft]`
4. 🟡 Nim Game `[Google]`
5. 🟡 Modular Exponentiation for large numbers `[CP]`
6. 🔴 nCr % p `[Directi]`
7. 🔴 Grundy Numbers / Sprague-Grundy Theorem bounds `[Codeforces]`

### 12. Solved Example Problems
**(Fast Exponention already covered in implementation block).**

### 13. Glossary
- **Modulus (MOD)**: Usually a large prime like `10^9 + 7` or `998244353`. Used so the answer fits in a 32-bit signed integer but retains its mathematical equivalence.
- **Sieve**: An algorithmic filter to rapidly sift out prime numbers.

---
### FUTURE QUESTIONS
- Explain the Extended Euclidean Algorithm and how it helps find the modular inverse when M is NOT prime.
- How do you implement Segmented Sieve for numbers between 10^14 and 10^14 + 10^5?

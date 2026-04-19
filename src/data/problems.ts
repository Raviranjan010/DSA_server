// Comprehensive Problem Database for DSA Mastery Platform
// Admin: Add/update problems here. Link to topics via topicId.

export interface Problem {
  id: string;
  topicId: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  statement: string;
  examples: Array<{ input: string; output: string; explanation: string }>;
  constraints: string[];
  hints: string[];
  approach: string;
  starterCode: string;
  testCases: Array<{ input: string; expectedOutput: string }>;
  tags: string[];
  companyTags?: string[];
}

export const problems: Problem[] = [
  // ARRAYS
  {
    id: "two-sum",
    topicId: "arrays",
    title: "Two Sum",
    difficulty: "Easy",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]" }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists"],
    hints: ["Use a hash map to store numbers you've seen", "For each number, check if (target - number) exists in the map"],
    approach: "Use a Hash Map to store numbers you've seen and check if the complement (target - current) exists.",
    starterCode: "function twoSum(nums, target) {\n  // Your code here\n  return [];\n}",
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" }
    ],
    tags: ["array", "hash-table"],
    companyTags: ["Google", "Amazon", "Microsoft"]
  },
  {
    id: "max-subarray",
    topicId: "arrays",
    title: "Maximum Subarray",
    difficulty: "Medium",
    statement: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Think about Kadane's Algorithm", "Keep track of current sum and max sum"],
    approach: "Use Kadane's Algorithm to track the maximum sum ending at each position.",
    starterCode: "function maxSubArray(nums) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" }
    ],
    tags: ["array", "dynamic-programming", "divide-and-conquer"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },
  {
    id: "merge-sorted-arrays",
    topicId: "arrays",
    title: "Merge Sorted Array",
    difficulty: "Easy",
    statement: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums1 and nums2 into a single array sorted in non-decreasing order.",
    examples: [
      { input: "nums1 = [1,2,3], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]", explanation: "The arrays are merged into [1,2,2,3,5,6]" }
    ],
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 <= m, n <= 200"],
    hints: ["Use two pointers from the end", "Fill from the back to avoid overwriting"],
    approach: "Use two pointers starting from the end of both arrays and merge backwards.",
    starterCode: "function merge(nums1, m, nums2, n) {\n  // Your code here\n}",
    testCases: [
      { input: "[1,2,3], 3, [2,5,6], 3", expectedOutput: "[1,2,2,3,5,6]" },
      { input: "[1], 1, [], 0", expectedOutput: "[1]" }
    ],
    tags: ["array", "two-pointers"],
    companyTags: ["Facebook", "Amazon"]
  },

  // STRINGS
  {
    id: "valid-palindrome",
    topicId: "strings",
    title: "Valid Palindrome",
    difficulty: "Easy",
    statement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: "After cleaning: 'amanaplanacanalpanama' is a palindrome." }
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters"],
    hints: ["Use two pointers from both ends", "Skip non-alphanumeric characters"],
    approach: "Use two pointers approach, skipping non-alphanumeric characters and comparing lowercase versions.",
    starterCode: "function isPalindrome(s) {\n  // Your code here\n  return false;\n}",
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true" },
      { input: '"race a car"', expectedOutput: "false" }
    ],
    tags: ["string", "two-pointers"],
    companyTags: ["Amazon", "Facebook", "Microsoft"]
  },
  {
    id: "longest-substring-without-repeating",
    topicId: "strings",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    statement: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: "The answer is 'abc', with the length of 3." }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces"],
    hints: ["Use sliding window technique", "Keep track of character positions in a map"],
    approach: "Use sliding window with a hash map to track the last seen position of each character.",
    starterCode: "function lengthOfLongestSubstring(s) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" }
    ],
    tags: ["string", "sliding-window", "hash-table"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // LINKED LISTS
  {
    id: "reverse-ll",
    topicId: "linked-lists",
    title: "Reverse a Linked List",
    difficulty: "Medium",
    statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "The list is completely reversed." }
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000]", "-5000 <= Node.val <= 5000"],
    hints: ["Maintain three pointers: prev, current, next", "Flip the current pointer to prev in each iteration"],
    approach: "Maintain three pointers: prev, current, next. Iterate and flip the current pointer to prev.",
    starterCode: "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  // Your code here\n  return prev;\n}",
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1,2]", expectedOutput: "[2,1]" }
    ],
    tags: ["linked-list", "recursion"],
    companyTags: ["Amazon", "Microsoft", "Apple"]
  },
  {
    id: "detect-cycle",
    topicId: "linked-lists",
    title: "Linked List Cycle",
    difficulty: "Easy",
    statement: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "There is a cycle in the linked list." }
    ],
    constraints: ["The number of nodes is in range [0, 10^4]", "-10^5 <= Node.val <= 10^5"],
    hints: ["Use Floyd's Cycle Detection Algorithm (Tortoise and Hare)", "Use two pointers moving at different speeds"],
    approach: "Use two pointers - slow moves 1 step, fast moves 2 steps. If they meet, there's a cycle.",
    starterCode: "function hasCycle(head) {\n  // Your code here\n  return false;\n}",
    testCases: [
      { input: "[3,2,0,-4], pos=1", expectedOutput: "true" },
      { input: "[1,2], pos=-1", expectedOutput: "false" }
    ],
    tags: ["linked-list", "two-pointers"],
    companyTags: ["Amazon", "Microsoft"]
  },

  // STACKS
  {
    id: "valid-parentheses",
    topicId: "stacks",
    title: "Valid Parentheses",
    difficulty: "Easy",
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    examples: [
      { input: 's = "()[]{}"', output: "true", explanation: "All brackets are properly closed in order." }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
    hints: ["Use a stack to track opening brackets", "Pop and check when encountering closing brackets"],
    approach: "Use a stack to push opening brackets. When encountering closing brackets, pop and check if they match.",
    starterCode: "function isValid(s) {\n  // Your code here\n  return false;\n}",
    testCases: [
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" }
    ],
    tags: ["stack", "string"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },
  {
    id: "min-stack",
    topicId: "stacks",
    title: "Min Stack",
    difficulty: "Medium",
    statement: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    examples: [
      { input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()', output: '-3, 0, -2', explanation: "getMin returns -3, after pop top is 0, getMin is now -2" }
    ],
    constraints: ["Operations are always valid", "All functions called on non-empty stack"],
    hints: ["Use two stacks - one for values, one for minimums", "Track minimum at each level"],
    approach: "Maintain two stacks: one for all values and one for tracking minimums at each level.",
    starterCode: "class MinStack {\n  constructor() {\n    // Your code here\n  }\n  push(val) {}\n  pop() {}\n  top() {}\n  getMin() {}\n}",
    testCases: [
      { input: "push(-2),push(0),push(-3),getMin()", expectedOutput: "-3" },
      { input: "push(5),push(3),getMin(),pop(),getMin()", expectedOutput: "3,5" }
    ],
    tags: ["stack", "design"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // QUEUES
  {
    id: "implement-queue",
    topicId: "queues",
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    statement: "Implement a first in first out (FIFO) queue using only two stacks.",
    examples: [
      { input: 'push(1), push(2), peek(), pop(), empty()', output: "1, 1, false", explanation: "Queue follows FIFO order." }
    ],
    constraints: ["At most 100 calls to methods", "Calls to pop/peek are always valid"],
    hints: ["Use one stack for input, one for output", "Transfer elements when output stack is empty"],
    approach: "Use two stacks - input stack for push operations, output stack for pop/peek. Transfer when needed.",
    starterCode: "class MyQueue {\n  constructor() {}\n  push(x) {}\n  pop() {}\n  peek() {}\n  empty() {}\n}",
    testCases: [
      { input: "push(1),push(2),peek()", expectedOutput: "1" },
      { input: "push(1),push(2),pop(),pop()", expectedOutput: "1,2" }
    ],
    tags: ["queue", "stack", "design"],
    companyTags: ["Amazon", "Google"]
  },

  // HASHING
  {
    id: "group-anagrams",
    topicId: "hashing",
    title: "Group Anagrams",
    difficulty: "Medium",
    statement: "Given an array of strings, group the anagrams together. You can return the answer in any order.",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: "All anagrams are grouped together." }
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters"],
    hints: ["Anagrams have the same sorted version", "Use hash map with sorted string as key"],
    approach: "Sort each string and use the sorted version as a key in a hash map to group anagrams.",
    starterCode: "function groupAnagrams(strs) {\n  // Your code here\n  return [];\n}",
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '3 groups' },
      { input: '[""]', expectedOutput: '[[""]]' }
    ],
    tags: ["hash-table", "string", "sorting"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // TREES
  {
    id: "max-depth-binary-tree",
    topicId: "binary-trees",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    statement: "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "The longest path has 3 nodes." }
    ],
    constraints: ["The number of nodes is in range [0, 10^4]", "-100 <= Node.val <= 100"],
    hints: ["Use recursion (DFS)", "Depth = 1 + max(left subtree depth, right subtree depth)"],
    approach: "Use recursive DFS - return 1 + max of left and right subtree depths.",
    starterCode: "function maxDepth(root) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "3" },
      { input: "[1,null,2]", expectedOutput: "2" }
    ],
    tags: ["tree", "dfs", "recursion"],
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    id: "invert-binary-tree",
    topicId: "binary-trees",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    statement: "Given the root of a binary tree, invert the tree, and return its root.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]", explanation: "Left and right subtrees are swapped." }
    ],
    constraints: ["The number of nodes is in range [0, 100]", "-100 <= Node.val <= 100"],
    hints: ["Use recursion", "Swap left and right children at each node"],
    approach: "Recursively swap left and right children for every node in the tree.",
    starterCode: "function invertTree(root) {\n  // Your code here\n  return root;\n}",
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", expectedOutput: "[2,3,1]" }
    ],
    tags: ["tree", "dfs", "recursion"],
    companyTags: ["Google", "Amazon"]
  },

  // DYNAMIC PROGRAMMING
  {
    id: "fibonacci",
    topicId: "dynamic-programming",
    title: "Fibonacci Number",
    difficulty: "Easy",
    statement: "The Fibonacci numbers form a sequence where each number is the sum of two preceding ones, starting from 0 and 1. F(n) = F(n-1) + F(n-2).",
    examples: [
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3" }
    ],
    constraints: ["0 <= n <= 30"],
    hints: ["Use memoization or tabulation", "Base cases: F(0)=0, F(1)=1"],
    approach: "Use dynamic programming with memoization or bottom-up tabulation to avoid redundant calculations.",
    starterCode: "function fib(n) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: "4", expectedOutput: "3" },
      { input: "7", expectedOutput: "13" }
    ],
    tags: ["dynamic-programming", "recursion", "memoization"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    id: "coin-change",
    topicId: "dynamic-programming",
    title: "Coin Change",
    difficulty: "Medium",
    statement: "Given an integer array coins representing coins of different denominations and an integer amount, return the fewest number of coins needed to make up that amount. If impossible, return -1.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1 (minimum 3 coins)" }
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    hints: ["Use bottom-up DP", "dp[i] = min(dp[i], dp[i - coin] + 1) for each coin"],
    approach: "Use bottom-up DP where dp[i] represents minimum coins needed for amount i.",
    starterCode: "function coinChange(coins, amount) {\n  // Your code here\n  return -1;\n}",
    testCases: [
      { input: "[1,2,5], 11", expectedOutput: "3" },
      { input: "[2], 3", expectedOutput: "-1" }
    ],
    tags: ["dynamic-programming", "array"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // GRAPHS
  {
    id: "number-of-islands",
    topicId: "graphs",
    title: "Number of Islands",
    difficulty: "Medium",
    statement: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3", explanation: "There are 3 separate islands." }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'"],
    hints: ["Use DFS or BFS to traverse each island", "Mark visited cells to avoid counting twice"],
    approach: "Use DFS/BFS to explore each island. Count the number of times you start a new traversal.",
    starterCode: "function numIslands(grid) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: '[["1","1","0"],["0","1","0"],["0","0","1"]]', expectedOutput: "2" },
      { input: '[["1","1","1"],["1","1","1"],["1","1","1"]]', expectedOutput: "1" }
    ],
    tags: ["graph", "dfs", "bfs", "matrix"],
    companyTags: ["Amazon", "Microsoft", "Google", "Facebook"]
  },

  // SORTING
  {
    id: "sort-colors",
    topicId: "sorting",
    title: "Sort Colors",
    difficulty: "Medium",
    statement: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We use integers 0, 1, and 2.",
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]", explanation: "Sorted in order: 0s, 1s, 2s" }
    ],
    constraints: ["n == nums.length", "1 <= n <= 300", "nums[i] is 0, 1, or 2"],
    hints: ["Use Dutch National Flag algorithm", "Three pointers: low, mid, high"],
    approach: "Use Dutch National Flag algorithm with three pointers to sort in a single pass.",
    starterCode: "function sortColors(nums) {\n  // Your code here\n}",
    testCases: [
      { input: "[2,0,2,1,1,0]", expectedOutput: "[0,0,1,1,2,2]" },
      { input: "[2,0,1]", expectedOutput: "[0,1,2]" }
    ],
    tags: ["sorting", "two-pointers", "array"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // BINARY SEARCH
  {
    id: "binary-search",
    topicId: "searching",
    title: "Binary Search",
    difficulty: "Easy",
    statement: "Given an array of integers which is sorted in ascending order, and a target integer, write a function to search for whether the target is in the array or not. Return the index if found, else return -1.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums at index 4" }
    ],
    constraints: ["All integers in nums are unique", "n is in range [1, 10000]", "-9999 <= nums[i], target <= 9999"],
    hints: ["Use two pointers: low and high", "Calculate mid and compare with target"],
    approach: "Use binary search - repeatedly divide search interval in half based on comparison with mid element.",
    starterCode: "function search(nums, target) {\n  // Your code here\n  return -1;\n}",
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1" }
    ],
    tags: ["binary-search", "array"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },

  // GREEDY
  {
    id: "max-profit-stock",
    topicId: "greedy",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    statement: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5." }
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    hints: ["Track minimum price seen so far", "Calculate max profit at each day"],
    approach: "Keep track of minimum price and maximum profit. Update both as you iterate through prices.",
    starterCode: "function maxProfit(prices) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" }
    ],
    tags: ["greedy", "array"],
    companyTags: ["Amazon", "Microsoft", "Google", "Facebook"]
  },

  // BACKTRACKING
  {
    id: "subsets",
    topicId: "backtracking",
    title: "Subsets",
    difficulty: "Medium",
    statement: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "All possible combinations of elements." }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All numbers in nums are unique"],
    hints: ["Use backtracking", "At each element, choose to include or exclude it"],
    approach: "Use backtracking to generate all subsets by including or excluding each element.",
    starterCode: "function subsets(nums) {\n  // Your code here\n  return [];\n}",
    testCases: [
      { input: "[1,2,3]", expectedOutput: "8 subsets" },
      { input: "[0]", expectedOutput: "[[],[0]]" }
    ],
    tags: ["backtracking", "array"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },

  // HEAPS
  {
    id: "kth-largest",
    topicId: "heaps",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    statement: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "The 2nd largest element is 5." }
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Use a min-heap of size k", "Or use QuickSelect algorithm"],
    approach: "Use a min-heap of size k. The root will be the kth largest element after processing all elements.",
    starterCode: "function findKthLargest(nums, k) {\n  // Your code here\n  return 0;\n}",
    testCases: [
      { input: "[3,2,1,5,6,4], 2", expectedOutput: "5" },
      { input: "[3,2,3,1,2,4,5,5,6], 4", expectedOutput: "4" }
    ],
    tags: ["heap", "sorting", "divide-and-conquer"],
    companyTags: ["Amazon", "Microsoft", "Google", "Facebook"]
  }
];

export const getProblemById = (id: string) => problems.find(p => p.id === id);
export const getProblemsByTopic = (topicId: string) => problems.filter(p => p.topicId === topicId);
export const getProblemsByDifficulty = (difficulty: string) => problems.filter(p => p.difficulty === difficulty);

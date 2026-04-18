# 🤖 BEST PROMPTS FOR AI TOOLS
## Use These With Claude, Qodo, ChatGPT, or Any AI to Build Your Platform

---

## INTRODUCTION

These prompts are crafted to generate production-ready code and content.
Copy-paste them directly. Modify the [BRACKETS] sections with your needs.

---

## SECTION 1: CONTENT GENERATION PROMPTS

### Prompt 1A: Generate Complete Topic Theory

**Use this to:** Create theory content for any DSA topic

```
You are a world-class DSA instructor who makes complex topics simple.

Create comprehensive educational content for the topic "[TOPIC_NAME]" 
that will be used in an interactive learning website.

Requirements:

1. REAL-WORLD INTRODUCTION (300 words)
   - Start with a story from real life (not CS terminology)
   - Example: For Arrays, compare to library shelves
   - For Trees, compare to organizational hierarchy
   - For Graphs, compare to social networks
   - Make a 10-year-old understand why this matters

2. THEORY EXPLANATION (500 words)
   - What is it?
   - Why is it useful?
   - When to use vs alternatives?
   - Common misconceptions
   - Use 2-3 ASCII diagrams

3. KEY CONCEPTS (in table format)
   - Operation | Time | Space | Why?
   - At least 5 operations
   - Include best/average/worst cases

4. COMMON PATTERNS for this topic
   - List 3-5 problem-solving patterns
   - For each: name, description, 2-3 example problems
   - Brief code template (5-10 lines)

5. INTERVIEW TALKING POINTS
   - What interviewers want to hear
   - Common follow-up questions
   - How to explain trade-offs

Format: Markdown with code blocks
Style: Conversational, use analogies, include real examples
Code language: C++
Target audience: Someone learning to interview

Output should be 1500-2000 words.
```

### Prompt 1B: Generate Interview Problems for Topic

**Use this to:** Create 5 problems for any topic with multiple approaches

```
Create 5 interview problems for the topic "[TOPIC_NAME]" 
with varying difficulty (easy, medium, hard).

For EACH problem provide:

1. PROBLEM STATEMENT
   - Clear, unambiguous description
   - Input/Output format
   - Constraints (realistic)

2. REAL-WORLD SCENARIO
   - Where does this problem appear in production?
   - Why does it matter?
   - Real company impact

3. EXAMPLE
   - Input with explanation
   - Expected output
   - Why this output?

4. APPROACHES (provide 3)
   - Approach name
   - Time complexity
   - Space complexity
   - Key insight
   - C++ code (complete, 15-25 lines)
   - When to mention in interview

5. EDGE CASES
   - List 5-8 edge cases
   - For each: what breaks, how to fix
   - Assertion tests

6. INTERVIEW TIPS
   - How to explain to interviewer
   - What to say when stuck
   - Optimization hints to ask for
   - Follow-up questions interviewer might ask

Format: Markdown with C++ code blocks
Style: Detailed but conversational
Difficulty mix: 1 easy (10 min), 2 medium (30-45 min), 2 hard (60+ min)
```

### Prompt 1C: Generate Company-Specific Problems

**Use this to:** Create Amazon/Google/Meta specific problems

```
Generate the top 5 most-asked problems for [COMPANY] interviews 
for the topic [TOPIC].

For each problem:

1. FREQUENCY: How often asked? (★★★★★ = very frequent)
2. COMPANY PATTERN: What does [COMPANY] specifically care about?
3. SIMILAR PROBLEMS: 5 variations they might ask
4. COMPANY TWIST: How might they modify the standard problem?

Example for Amazon + Arrays:
- Frequency: ★★★★★
- Pattern: In-place modification, no extra space
- Similar: Move zeros, rotate array, remove duplicates
- Twist: "Do it in one pass without losing data"

Format: List with explanations
Include: Actual problems from that company's OA (if known)
Reference: Recent interview experiences from Blind/LeetCode discussions
```

---

## SECTION 2: CODE GENERATION PROMPTS

### Prompt 2A: Generate Complete React Component

**Use this to:** Build interactive problem-solving components

```
Generate a production-ready React component for an interactive 
DSA problem-solving interface.

Requirements:

1. COMPONENT: ProblemSolver.jsx
   - Display problem statement
   - Show example with input/output
   - Hints (expandable)
   - Approach selector (3 tabs: Brute Force, Better, Optimal)
   - For each approach:
     * Explanation (text)
     * Pseudocode (formatted)
     * C++ code (syntax highlighted)
     * Complexity display

2. FEATURES:
   - Dark mode support
   - Responsive design
   - Code copy button
   - Hint revelation (progressive)
   - Time estimate for each approach
   - Difficulty indicator

3. STATE:
   - Selected approach
   - Hint visibility
   - User's code (from editor)
   - Test results

4. STYLING:
   - Use Tailwind CSS
   - Dark colors: #0f1419, #1f2937, #374151
   - Accent color: #3b82f6
   - Success color: #10b981
   - Responsive: mobile-first

Libraries:
- React hooks (useState, useContext)
- Syntax highlighting: prismjs or similar
- Icons: lucide-react

Output: Complete, working component with sample data
Include: TypeScript definitions
Add: Comments explaining key parts
```

### Prompt 2B: Generate Code Editor Component with Judge

**Use this to:** Create problem-solving editor with test runner

```
Create a React code editor component with integrated test runner.

Requirements:

1. EDITOR: CodeEditor.jsx
   - Use Monaco Editor (VSCode in browser)
   - Language: C++
   - Syntax highlighting
   - Line numbers
   - Auto-formatting on Ctrl+Shift+F
   - Dark theme

2. TEST RUNNER:
   - Accept test cases (input/output)
   - Compile and run code
   - Show results (passed/failed)
   - Time and memory usage (estimate)
   - Detailed error messages

3. FEATURES:
   - Run button + keyboard shortcut (Ctrl+Enter)
   - Clear button
   - Default template (based on problem)
   - Save to localStorage
   - Show execution time
   - Show any compilation errors

4. RESULT DISPLAY:
   - Test case results: ✓ (passed) / ✗ (failed)
   - For each test:
     * Input shown
     * Expected vs actual output
     * Status (PASSED/FAILED/ERROR)
   - Summary: X/Y tests passed

Libraries:
- @monaco-editor/react
- (for backend) cpp compilation: online judge API or local

Output: Complete component with sample test cases
Include: How to integrate with backend compiler
Add: Error handling for compilation failures
```

### Prompt 2C: Generate Progress Tracker Component

**Use this to:** Track learning progress with statistics

```
Create a React component to track user DSA learning progress.

Requirements:

1. COMPONENT: ProgressTracker.jsx
   - Display user stats:
     * Problems solved (by difficulty)
     * Accuracy percentage
     * Weak topics
     * Streak (days of practice)
     * Time spent

2. VISUALIZATIONS:
   - Bar chart: Problems by topic
   - Line chart: Progress over days
   - Pie chart: Difficulty distribution
   - Progress bar: Topic completion

3. FEATURES:
   - Weekly summary
   - Comparison: Target vs actual
   - Weak area identification
   - Export progress (CSV)
   - Goal setting
   - Achievement badges

4. DATA TRACKED:
   - Problem ID
   - Difficulty (easy/medium/hard)
   - Time taken
   - Attempts
   - Accuracy (% test cases passed)
   - Topic
   - Date solved
   - Previous attempts (for spaced repetition)

Libraries:
- recharts (for charts)
- zustand (for state management)

Output: Complete component with sample data
Include: Data structure for storing problem attempts
Add: Calculation for weak areas
```

### Prompt 2D: Generate Mock Interview Simulator

**Use this to:** Create interview practice mode

```
Create a React component for mock interview practice.

Requirements:

1. INTERFACE: MockInterview.jsx
   - Pick difficulty (easy/medium/hard)
   - Random problem selection
   - Timed mode (45 min for medium, 60 min for hard)
   - No hints (or limited)
   - Code editor
   - Test cases

2. FEATURES:
   - Countdown timer
   - Submit when ready (or timeout)
   - Feedback after submission:
     * Test case results
     * Time taken
     * Score (based on correctness + time)
     * Comparison with average
   - Can't reveal solution during test
   - Recording thoughts (optional voice)

3. SCORING:
   - 100 points for correct + optimal
   - 70 points for correct but suboptimal
   - 30 points for partial (some test cases)
   - 0 points for wrong or timeout
   - Bonus: Speed (finish in 50% of time limit)

4. RESULT SCREEN:
   - Score
   - Time taken
   - Accuracy %
   - Complexity analysis (your code vs optimal)
   - Similar problems to practice
   - Save result for analytics

Output: Complete component ready to integrate
Include: Timer logic
Add: Result storage logic
```

---

## SECTION 3: DATABASE/STORAGE PROMPTS

### Prompt 3A: Generate Data Schema

**Use this to:** Structure your problem and progress data

```
Design a complete data schema for a DSA learning platform.

Requirements:

1. PROBLEM DATA STRUCTURE:
   ```javascript
   {
     id: string,
     title: string,
     difficulty: enum(easy, medium, hard),
     topic: string,
     company: string[],
     frequency: number(1-5),
     
     problemStatement: string,
     examples: [
       { input: string, output: string, explanation: string }
     ],
     
     constraints: string[],
     
     approaches: [
       {
         name: string,
         timeComplexity: string,
         spaceComplexity: string,
         pseudoCode: string,
         cppCode: string,
         explanation: string,
         keyInsights: string[]
       }
     ],
     
     edgeCases: [
       { case: string, solution: string }
     ],
     
     hints: string[],
     relatedProblems: string[], (IDs)
     
     testCases: [
       { input: string, output: string, hidden: boolean }
     ]
   }
   ```

2. USER PROGRESS:
   ```javascript
   {
     userId: string,
     problemId: string,
     attempts: number,
     solved: boolean,
     accuracy: number,
     bestTime: number,
     dateSolved: date,
     userCode: string,
     approaches: {
       bruteForce: { understood: boolean, tried: boolean },
       optimal: { understood: boolean, tried: boolean }
     }
   }
   ```

3. COLLECTIONS:
   - Problems (indexed by difficulty, topic, company)
   - Users
   - UserProgress
   - Discussions
   - Solutions

4. INDEXES:
   - problems: { difficulty, topic, company, frequency }
   - userProgress: { userId, problemId, dateSolved }

Output: Complete schema with relationships
Include: Sample documents
Add: Indexing strategy for performance
```

---

## SECTION 4: COMPLETE APPLICATION PROMPTS

### Prompt 4A: Generate Full Website Code (React)

**Use this to:** Create entire working website

```
Generate a production-ready React application for a DSA learning platform.

Stack:
- React 18 with hooks
- React Router for navigation
- Tailwind CSS for styling
- Monaco Editor for code
- Zustand for state
- Recharts for visualizations
- TypeScript

Structure:
├── components/
│   ├── Navbar
│   ├── Sidebar
│   ├── CodeEditor
│   ├── ProblemDisplay
│   ├── ApproachComparison
│   ├── ProgressTracker
│   └── MockInterview
├── pages/
│   ├── Home
│   ├── Problems
│   ├── TopicDetail
│   ├── Dashboard
│   └── MockInterview
├── content/
│   └── problems.js (sample data)
├── store/
│   └── userProgress.js (Zustand)
└── App.jsx

Requirements:
1. Navigation between topics
2. Problem solving interface
3. Progress dashboard
4. Mock interview mode
5. Search and filter
6. Dark mode
7. Responsive design

Provide:
- Complete code for main App.jsx
- 3-4 key components fully implemented
- Sample data for at least 2 topics
- Setup instructions
- Environment variables needed
```

### Prompt 4B: Generate GitHub Repository Structure

**Use this to:** Create complete folder structure with templates

```
Generate a complete GitHub repository structure for mastering DSA.

Folder layout:
```
DSA-Mastery/
├── README.md (with features, how to use, 60-day roadmap)
├── CONTRIBUTING.md
├── LICENSE (MIT)
│
├── 📚 01-Foundations/
│   ├── 01-Complexity-Analysis/
│   │   ├── README.md
│   │   ├── theory.md
│   │   ├── examples.cpp
│   │   ├── problems/
│   │   │   ├── problem1.md
│   │   │   ├── problem1.cpp
│   │   │   └── ...
│   │   └── visualizations/
│   │
│   ├── 02-Arrays/
│   │   ├── README.md
│   │   ├── two-pointer.md
│   │   ├── sliding-window.md
│   │   ├── problems/
│   │   │   ├── two-sum.md
│   │   │   ├── two-sum.cpp
│   │   │   ├── two-sum-approaches.md
│   │   │   ├── two-sum-discussion.md
│   │   │   └── ...
│   │   └── ...
│   │
│   └── 03-Strings/
│       └── ...
│
├── 🔗 02-DataStructures/
│   ├── LinkedLists/
│   ├── Stacks/
│   ├── Queues/
│   ├── Trees/
│   │   ├── README.md
│   │   ├── BST.md
│   │   ├── Traversals/
│   │   ├── problems/
│   │   └── ...
│   └── Graphs/
│
├── 🎯 03-Algorithms/
│   ├── Sorting/
│   ├── Searching/
│   ├── DynamicProgramming/
│   ├── Greedy/
│   └── BackTracking/
│
├── 💡 04-CompanySpecific/
│   ├── Amazon/
│   │   ├── Top50Problems.md
│   │   ├── patterns/
│   │   └── ...
│   ├── Google/
│   ├── Meta/
│   ├── Microsoft/
│   └── ...
│
├── 🏆 05-InterviewPrep/
│   ├── MockInterviews/
│   ├── FollowUpQuestions/
│   ├── HowToExplain/
│   └── CommonMistakes/
│
├── 📊 06-Resources/
│   ├── TimeSpaceCheatsheet.md
│   ├── STLCheatsheet.md
│   ├── PatternsReference.md
│   ├── Flowcharts/
│   └── templates/
│
├── 🧪 07-TestCases/
│   ├── testRunner.cpp
│   └── ...
│
├── 📅 60DayRoadmap/
│   ├── README.md (with daily schedule)
│   ├── Week1.md
│   ├── Week2.md
│   └── ...
│
└── .gitignore
```

For each topic:
- Theory explanation in README.md
- Pseudocode and approach visualization
- Multiple C++ solutions
- Discussion of trade-offs
- Related problems linking
- Test cases

For each problem:
- problem.md: Statement + examples
- problem.cpp: Complete solution
- approaches.md: Compare 3+ approaches
- notes.md: Interview tips, edge cases

Provide:
- All folder structure (empty folders)
- Template files (README templates)
- Sample problem with all variations
- .gitignore file
- How to navigate this repo
- How to add new problems
```

---

## SECTION 5: DEPLOYMENT PROMPTS

### Prompt 5A: Deploy Website to Vercel

**Use this to:** Get website live in 5 minutes

```
I have a React DSA learning website created with Create React App.

Provide step-by-step instructions to:
1. Deploy to Vercel (free tier)
2. Connect to GitHub repo
3. Set up auto-deploy on every push
4. Configure environment variables
5. Add custom domain (optional)

Include:
- vercel.json configuration
- package.json scripts needed
- Environment variables format
- How to manage secrets
- How to rollback if needed
- How to monitor deployments

Also include:
- Optimization tips for performance
- How to add Analytics
- Monitoring and error tracking
```

---

## SECTION 6: INTEGRATION PROMPTS

### Prompt 6A: Connect Frontend to Backend Judge

**Use this to:** Make code runner actually work

```
I have a React frontend with Monaco Editor for C++ code.

Show how to:
1. Send code to backend for compilation
2. Run code against test cases
3. Return results to frontend
4. Handle errors and timeouts

Options:
A. Using free online judge API (Judge0)
B. Using local compilation (Ubuntu)
C. Using Docker container

For each option provide:
- Complete code example
- Error handling
- Timeout handling (5 sec max)
- Memory limit (256MB)
- Result format

I prefer: [Option A/B/C]
```

---

## SECTION 7: QUICK TEMPLATES

### Quick Template 1: New Problem File

```markdown
# [Problem Title]

## Problem Statement
[Statement]

## Real-World Example
[Scenario where this matters]

## Examples
### Example 1
**Input:** [input]
**Output:** [output]
**Explanation:** [why]

## Constraints
- [constraint 1]
- [constraint 2]

## Approaches

### Approach 1: [Name]
**Time:** O(n²) | **Space:** O(1)

[Code]

### Approach 2: [Name]
**Time:** O(n) | **Space:** O(n)

[Code]

## Edge Cases
- [case 1]
- [case 2]

## Interview Tips
[What to say, how to explain]

## Related Problems
- [problem 1]
- [problem 2]
```

### Quick Template 2: Topic README

```markdown
# [Topic Name]

## Overview
[Real-world intro]

## Key Concepts
| Concept | Time | Space | Notes |
|---------|------|-------|-------|

## Common Patterns
1. [Pattern 1]: [description]
2. [Pattern 2]: [description]

## Problems by Difficulty
### Easy
- [problem 1]
- [problem 2]

### Medium
- [problem 1]
- [problem 2]

### Hard
- [problem 1]

## Interview Tips
[What companies ask, what they care about]

## Related Topics
[Links to other topics]
```

---

## HOWTO USE THESE PROMPTS

### Step 1: Pick Your Tool
- Claude (best for explanations + code)
- GPT-4 (good for all-around)
- Qodo (best for code generation from repo)

### Step 2: Copy Prompt
- Find the prompt number
- Copy entire prompt
- Paste into your AI tool

### Step 3: Customize
- Replace [BRACKETS] with your values
- Example: [TOPIC_NAME] → "Arrays"
- Example: [COMPANY] → "Amazon"

### Step 4: Generate
- Hit submit
- Wait for output
- Review (always review AI output!)

### Step 5: Refine
- If not perfect, ask followup
- Example: "Make this more conversational"
- Example: "Add error handling"

---

## WHICH PROMPTS TO START WITH?

**If you want WEBSITE:**
1. Use Prompt 4A (generate full React app)
2. Prompt 1A, 1B (generate content)
3. Prompt 5A (deploy to Vercel)

**If you want GITHUB REPO:**
1. Use Prompt 4B (generate repository structure)
2. Prompt 1A, 1B, 1C (generate problems and theory)
3. Push to GitHub

**If you want BOTH:**
1. Use Prompt 4A (React website)
2. Use Prompt 4B (GitHub repo)
3. Link them together
4. Use Prompt 5A (deploy)

---

## IMPORTANT NOTES

1. **Review all AI output.** AI sometimes makes mistakes.
2. **These prompts are starting points.** Customize for your needs.
3. **For best results, iterate.** Ask follow-up questions.
4. **Copyright.** Only use content that's original or properly licensed.
5. **Testing.** Always test generated code before deploying.

---

**These prompts will save you 50+ hours of work.**
**Use them wisely.**

💪

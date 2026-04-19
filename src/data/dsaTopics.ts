export interface DSAProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  statement: string;
  example: string;
  approach: string;
  starterCode: string;
}

export type TopicGroup = "beginner" | "intermediate" | "advanced" | "algorithms";

export interface DSATopic {
  id: string;
  groupId: TopicGroup;
  title: string;
  description: string;
  icon: string;
  order: number;

  introduction: {
    whatIsIt: string;
    whyUsed: string;
    realWorldAnalogy: string;
  };
  concept: {
    explanation: string;
    stepByStep: string[];
  };
  visualExplanation: {
    diagramDescription: string;
    exampleVisualization: string;
  };
  workingMechanism: {
    internalWorking: string;
    steps: string[];
    pseudocode: string;
    codeImplementation: {
      language: string;
      code: string;
    };
  };
  examples: { title: string; content: string }[];
  dryRun: string;
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  edgeCases: string[];
  commonMistakes: string[];
  tipsAndTricks: string[];

  problems: DSAProblem[];
}

export const topics: DSATopic[] = [
  {
    id: "arrays",
    groupId: "beginner",
    title: "Arrays",
    description: "Learn how to store and manipulate contiguous blocks of memory.",
    icon: "LayoutList",
    order: 1,
    introduction: {
      whatIsIt: "An array is a collection of items stored at adjoining memory locations. The idea is to store multiple items of the same type together.",
      whyUsed: "It's used when we need to group similar things together. It makes it extremely fast to find a specific item if you know its position number (index).",
      realWorldAnalogy: "Think of an array like a row of mailboxes at an apartment building. Every mailbox is the exact same size, holds the same type of thing (mail), and they are numbered in sequential order. You can easily jump straight to mailbox #5 if you know the number."
    },
    concept: {
      explanation: "Arrays organize data in sequential 'slots'. Because the computer knows exactly how big a 'slot' is, it can immediately calculate the exact memory location of the 100th slot without counting the first 99 slots.",
      stepByStep: [
        "1. The computer allocates a huge, contiguous block of memory.",
        "2. The array points to the very first slot (Index 0).",
        "3. To find Index N, it simply adds (N * item size) to the starting address."
      ]
    },
    visualExplanation: {
      diagramDescription: "Memory Blocks: | [0] Data A | [1] Data B | [2] Data C | [3] Data D |",
      exampleVisualization: "If each data item takes 4 bytes, and [0] is at address 100, then [1] is at 104, [2] is at 108, etc."
    },
    workingMechanism: {
      internalWorking: "Static arrays have a fixed size decided when they are created. Dynamic arrays automatically create a bigger block of memory and copy everything over when they run out of space.",
      steps: [
        "To read: Use the index mathematically.",
        "To insert at end: Place data in the next empty slot.",
        "To insert in middle: Shift all existing data to the right by one slot, then place the new data."
      ],
      pseudocode: "array[index] = newValue",
      codeImplementation: {
        language: "Javascript",
        code: `// Creating and manipulating an array
const arr = [10, 20, 30, 40];

// Accessing O(1)
console.log(arr[2]); // 30

// Insertion at end O(1)
arr.push(50);

// Insertion at start O(N) (shifts everything)
arr.unshift(5);`
      }
    },
    examples: [
      {
        title: "Basic Operations",
        content: "We use arrays heavily for shopping carts. Each item you add gets pushed to the end of your cart array."
      }
    ],
    dryRun: "If we insert `99` at index 1 of `[1, 2, 3]`: First, move `3` to index 3. Then move `2` to index 2. Finally, put `99` in index 1. Array is now `[1, 99, 2, 3]`.",
    complexity: {
      time: "Access: O(1) - Instant! Search: O(N) - Have to check every single box. Insertion/Deletion at end: O(1). Insertion/Deletion elsewhere: O(N).",
      space: "O(N) - Where N is the number of items.",
      explanation: "Finding an item by its box number is instant math. But removing the first item forces us to manually shift every other box down by 1, which takes time proportional to the length."
    },
    edgeCases: [
      "Accessing a negative index or an index beyond the max size (Out of Bounds).",
      "Memory limitations when expanding highly massive arrays."
    ],
    commonMistakes: [
      "Forgetting that array indexes start at 0.",
      "Trying to use arrays for data that needs constant middle insertions (Linked Lists are better for this)."
    ],
    tipsAndTricks: [
      "Remember: '0-indexed' - programmers start counting from 0!",
      "If you see a problem asking to solve things in O(1) access time, immediately think of Arrays/Hashtables."
    ],
    problems: [
      {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
        approach: "Use a Hash Map to store numbers you've seen and check if the complement (target - current) exists.",
        starterCode: "function twoSum(nums, target) {\n  // Your code here\n  return [];\n}"
      }
    ]
  },
  {
    id: "linked-lists",
    groupId: "intermediate",
    title: "Linked Lists",
    description: "Learn to build sequences where each element points to the next.",
    icon: "Link",
    order: 2,
    introduction: {
      whatIsIt: "A Linked List is a sequence of separate, disconnected data objects (nodes). Each object holds its own data, AND exactly where to find the next object.",
      whyUsed: "Unlike arrays, they do not need contiguous memory. You can easily inject a new node directly into the middle by just changing two pointers, without shifting massive amounts of data.",
      realWorldAnalogy: "A treasure hunt! You start at the first clue. That clue tells you where the next clue is. You cannot just magically know what the 5th clue is; you have to follow clues 1, 2, 3, and 4 in order."
    },
    concept: {
      explanation: "A linked list is made of 'Nodes'. A Node has two parts: the actual value, and a reference (pointer) to the next Node. The last Node simply points to null.",
      stepByStep: [
        "1. Maintain a 'Head' pointer pointing to the first node.",
        "2. Traverse by checking node.next, node.next.next, etc."
      ]
    },
    visualExplanation: {
      diagramDescription: "[Data|Pointer] -> [Data|Pointer] -> [Data|null]",
      exampleVisualization: "Head -> [10 | * ] -> [20 | * ] -> [30 | null]"
    },
    workingMechanism: {
      internalWorking: "Nodes are dynamically stored anywhere in memory.",
      steps: [
        "Insertion in middle: Create node X. Have X point to node C. Have node B point to X.",
        "Deletion: Simply have node A point to node C, entirely skipping B."
      ],
      pseudocode: "newNode.next = current.next\ncurrent.next = newNode",
      codeImplementation: {
        language: "Javascript",
        code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}`
      }
    },
    examples: [
      {
        title: "Browser History",
        content: "Browser back/forward functionality is an intuitive example of a Doubly Linked List."
      }
    ],
    dryRun: "To delete node [20] from 10 -> 20 -> 30: Traverse from 10. You see the next is 20. Tell 10 to point to 20's next (which is 30). Now it looks like 10 -> 30.",
    complexity: {
      time: "Access: O(N) - Must count from the beginning. Search: O(N). Insertion/Deletion: O(1) (if you are already at the spot!).",
      space: "O(N). Slightly higher overhead than Arrays due to the extra memory needed to store all those pointer references.",
      explanation: "Because memory is scattered, we cannot do math to instantly find the 100th element. We MUST traverse sequentially."
    },
    edgeCases: [
      "Accessing a node that doesn't exist (null pointer exception).",
      "Handling empty lists."
    ],
    commonMistakes: [
      "Losing the 'head' pointer and permanently losing track of the entire list.",
      "Accidentally creating infinite circular loops during insertion."
    ],
    tipsAndTricks: [
      "Nodes = Data + Pointer.",
      "Use dummy nodes at the head to simplify logic by avoiding null checks."
    ],
    problems: [
      {
        id: "reverse-ll",
        title: "Reverse a Linked List",
        difficulty: "Medium",
        statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        example: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
        approach: "Maintain three pointers: prev, current, next. Iterate and flip the current pointer to prev.",
        starterCode: "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  // Your code here\n  return prev;\n}"
      }
    ]
  }
];

export const getNextTopic = (topicOrder: number) => topics.find(t => t.order === topicOrder + 1);
export const getPrevTopic = (topicOrder: number) => topics.find(t => t.order === topicOrder - 1);

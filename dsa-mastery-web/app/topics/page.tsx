import Link from 'next/link';
import { ArrowRight, Clock, Target } from 'lucide-react';

const topics = [
  {
    id: 'complexity',
    title: 'Complexity Analysis',
    category: 'Foundations',
    description: 'Big O notation, time & space complexity analysis',
    icon: '📊',
    problems: 5,
    difficulty: 'Beginner',
    days: 2,
    techniques: ['Big O', 'Best/Average/Worst Case', 'Amortized Analysis'],
  },
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    category: 'Foundations',
    description: 'Two pointer, sliding window, prefix sum, Kadane\'s algorithm',
    icon: '📦',
    problems: 27,
    difficulty: 'Beginner',
    days: 3,
    techniques: ['Two Pointer', 'Sliding Window', 'Prefix Sum', 'Kadane\'s'],
  },
  {
    id: 'strings',
    title: 'String Manipulation',
    category: 'Foundations',
    description: 'Pattern matching, anagrams, palindromes, string DP',
    icon: '📝',
    problems: 18,
    difficulty: 'Beginner',
    days: 3,
    techniques: ['Two Pointer', 'Hashing', 'Rolling Hash'],
  },
  {
    id: 'matrix',
    title: 'Matrix Problems',
    category: 'Foundations',
    description: '2D traversal, spiral, rotation, search in sorted matrix',
    icon: '🔲',
    problems: 12,
    difficulty: 'Beginner',
    days: 2,
    techniques: ['2D Traversal', 'Matrix Rotation', 'Binary Search'],
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    category: 'Data Structures',
    description: 'Singly, doubly, cycle detection, reversal, merging',
    icon: '🔗',
    problems: 19,
    difficulty: 'Beginner',
    days: 4,
    techniques: ['Fast & Slow Pointers', 'Dummy Node', 'Reverse'],
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    category: 'Data Structures',
    description: 'LIFO, FIFO, monotonic stacks, deque, BFS',
    icon: '📚',
    problems: 18,
    difficulty: 'Beginner',
    days: 4,
    techniques: ['Monotonic Stack', 'Queue with Stacks', 'BFS'],
  },
  {
    id: 'trees',
    title: 'Trees & Binary Search Trees',
    category: 'Data Structures',
    description: 'Traversals, LCA, diameter, balanced trees, serialization',
    icon: '🌳',
    problems: 28,
    difficulty: 'Intermediate',
    days: 5,
    techniques: ['DFS', 'BFS', 'Divide & Conquer', 'BST Properties'],
  },
  {
    id: 'graphs',
    title: 'Graphs',
    category: 'Data Structures',
    description: 'BFS, DFS, topological sort, Dijkstra, union-find',
    icon: '🕸️',
    problems: 24,
    difficulty: 'Intermediate',
    days: 4,
    techniques: ['BFS', 'DFS', 'Topological Sort', 'Dijkstra', 'Union-Find'],
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    category: 'Data Structures',
    description: 'Min/max heap, heap operations, top K elements',
    icon: '⛰️',
    problems: 14,
    difficulty: 'Intermediate',
    days: 3,
    techniques: ['Heapify', 'Top K', 'Merge K Sorted'],
  },
  {
    id: 'hashing',
    title: 'Hashing & HashMaps',
    category: 'Data Structures',
    description: 'Collision handling, LRU cache, anagram groups, word ladder',
    icon: '🔑',
    problems: 18,
    difficulty: 'Intermediate',
    days: 3,
    techniques: ['HashMap', 'HashSet', 'Rolling Hash'],
  },
  {
    id: 'tries',
    title: 'Tries',
    category: 'Data Structures',
    description: 'Prefix tree, autocomplete, word search, XOR trie',
    icon: '🌲',
    problems: 11,
    difficulty: 'Intermediate',
    days: 2,
    techniques: ['Prefix Search', 'DFS on Trie'],
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    category: 'Algorithms',
    description: 'Merge sort, quick sort, binary search variations',
    icon: '🔍',
    problems: 16,
    difficulty: 'Beginner',
    days: 2,
    techniques: ['Binary Search', 'Merge Sort', 'Quick Sort'],
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    category: 'Algorithms',
    description: '1D, 2D, knapsack, LCS, matrix chain, DP on trees',
    icon: '🎯',
    problems: 30,
    difficulty: 'Advanced',
    days: 6,
    techniques: ['Memoization', 'Tabulation', 'State Transition'],
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    category: 'Algorithms',
    description: 'Interval scheduling, activity selection, Huffman coding',
    icon: '⚡',
    problems: 13,
    difficulty: 'Intermediate',
    days: 3,
    techniques: ['Interval Greedy', 'Optimal Substructure'],
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    category: 'Algorithms',
    description: 'Permutations, combinations, N-queens, sudoku solver',
    icon: '🔄',
    problems: 15,
    difficulty: 'Advanced',
    days: 3,
    techniques: ['Recursive Backtracking', 'Pruning'],
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    category: 'Algorithms',
    description: 'XOR tricks, bit masking, power of 2, counting bits',
    icon: '💻',
    problems: 12,
    difficulty: 'Intermediate',
    days: 2,
    techniques: ['XOR', 'Bit Masking', 'Bit Shifting'],
  },
];

export default function TopicsPage() {
  const categories = ['Foundations', 'Data Structures', 'Algorithms'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Topics</h1>
        <p className="text-xl text-gray-400">
          Complete DSA curriculum with 230+ problems across 12 topics
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics
              .filter((t) => t.category === category)
              .map((topic) => (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="bg-[#1f2937] p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:scale-105 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{topic.icon}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        topic.difficulty === 'Beginner'
                          ? 'bg-green-900/30 text-green-400'
                          : topic.difficulty === 'Intermediate'
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{topic.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {topic.techniques.slice(0, 3).map((tech) => (
                      <div
                        key={tech}
                        className="bg-[#0f1419] px-3 py-1 rounded text-xs text-gray-300 inline-block mr-2"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      <span>{topic.problems} problems</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{topic.days} days</span>
                    </div>
                  </div>

                  <div className="mt-4 text-blue-400 flex items-center gap-2 text-sm font-medium">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Book, Code, Trophy, TrendingUp, CheckCircle, Zap, Target, Users } from 'lucide-react';

const topics = [
  {
    id: 'complexity',
    title: 'Complexity Analysis',
    description: 'Big O notation, time & space complexity',
    icon: '📊',
    problems: 5,
    difficulty: 'Beginner',
    days: 2,
    href: '/topics/complexity',
  },
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    description: 'Two pointer, sliding window, prefix sum',
    icon: '📦',
    problems: 27,
    difficulty: 'Beginner',
    days: 3,
    href: '/topics/arrays',
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Singly, doubly, cycle detection, reversal',
    icon: '🔗',
    problems: 19,
    difficulty: 'Beginner',
    days: 4,
    href: '/topics/linked-lists',
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO, FIFO, monotonic stacks, BFS',
    icon: '📚',
    problems: 18,
    difficulty: 'Beginner',
    days: 4,
    href: '/topics/stacks-queues',
  },
  {
    id: 'trees',
    title: 'Trees & BST',
    description: 'Traversals, LCA, diameter, balanced trees',
    icon: '🌳',
    problems: 28,
    difficulty: 'Intermediate',
    days: 5,
    href: '/topics/trees',
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'BFS, DFS, topological sort, shortest path',
    icon: '🕸️',
    problems: 24,
    difficulty: 'Intermediate',
    days: 4,
    href: '/topics/graphs',
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: '1D, 2D, knapsack, LCS, matrix chain',
    icon: '🎯',
    problems: 30,
    difficulty: 'Advanced',
    days: 6,
    href: '/topics/dynamic-programming',
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    description: 'Interval scheduling, activity selection',
    icon: '⚡',
    problems: 13,
    difficulty: 'Intermediate',
    days: 3,
    href: '/topics/greedy',
  },
  {
    id: 'hashing',
    title: 'Hashing & HashMaps',
    description: 'Collision handling, LRU cache, anagrams',
    icon: '🔑',
    problems: 18,
    difficulty: 'Intermediate',
    days: 3,
    href: '/topics/hashing',
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    description: 'XOR tricks, bit masking, power of 2',
    icon: '💻',
    problems: 12,
    difficulty: 'Intermediate',
    days: 2,
    href: '/topics/bit-manipulation',
  },
];

const features = [
  {
    icon: Book,
    title: 'Pattern-First Learning',
    description: 'Learn to recognize problem patterns instantly, not memorize solutions',
  },
  {
    icon: Code,
    title: 'Guided Problem Solving',
    description: 'Think → Plan → Code → Optimize workflow with enforced thinking time',
  },
  {
    icon: Trophy,
    title: 'Mock Interviews',
    description: 'Practice with timed interviews and detailed feedback',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Track your journey with spaced repetition and analytics',
  },
];

const stats = [
  { value: '230+', label: 'Problems' },
  { value: '12', label: 'Topics' },
  { value: '60', label: 'Days' },
  { value: '100%', label: 'Free' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Master DSA in 60 Days
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From zero problem-solving ability to interview-ready confidence. 
              Pattern-based learning with real-world examples and guided practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/topics"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/60-day-roadmap"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              >
                View Roadmap
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why This Platform Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-[#1f2937] p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:scale-105"
              >
                <Icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Topics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Complete Curriculum
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          12 topics, 230+ problems, from basics to advanced
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
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
              <p className="text-gray-400 mb-4">{topic.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{topic.problems} problems</span>
                <span>{topic.days} days</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#1f2937] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Learn Patterns</h3>
              <p className="text-gray-400">
                Understand core patterns with real-world analogies and visual diagrams
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Practice Deeply</h3>
              <p className="text-gray-400">
                Solve problems with guided thinking, multiple approaches, and spaced repetition
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Ace Interviews</h3>
              <p className="text-gray-400">
                Mock interviews, company patterns, and communication practice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of students who mastered DSA and cracked their dream jobs
          </p>
          <Link
            href="/topics"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="bg-[#1f2937] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            After 60 Days, You Will:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Solve easy problems in 5-10 min (95% accuracy)',
              'Solve medium problems in 30 min (85% accuracy)',
              'Identify patterns instantly',
              'Explain multiple approaches clearly',
              'Handle edge cases confidently',
              'Interview with 8/10+ confidence',
            ].map((metric) => (
              <div key={metric} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-lg">{metric}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Topic Groups & Learning Paths
// Organize topics into structured learning paths

import { DSATopic } from "./dsaTopics";

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  topicIds: string[];
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export const learningPaths: LearningPath[] = [
  {
    id: "beginner-fundamentals",
    name: "Beginner Fundamentals",
    description: "Start your DSA journey with foundational concepts and basic data structures",
    icon: "🌱",
    topicIds: ["arrays", "strings", "basic-math"],
    estimatedTime: "2-3 weeks",
    difficulty: "Beginner"
  },
  {
    id: "core-data-structures",
    name: "Core Data Structures",
    description: "Master essential data structures used in every coding interview",
    icon: "📊",
    topicIds: ["linked-lists", "stacks", "queues", "hashing"],
    estimatedTime: "3-4 weeks",
    difficulty: "Intermediate"
  },
  {
    id: "algorithms-fundamentals",
    name: "Algorithm Fundamentals",
    description: "Learn fundamental algorithms and problem-solving techniques",
    icon: "⚙️",
    topicIds: ["two-pointers", "sorting", "searching", "recursion"],
    estimatedTime: "3-4 weeks",
    difficulty: "Intermediate"
  },
  {
    id: "advanced-structures",
    name: "Advanced Data Structures",
    description: "Dive into complex data structures for advanced problem solving",
    icon: "🌳",
    topicIds: ["binary-trees", "bst", "heaps", "graphs", "tries"],
    estimatedTime: "4-5 weeks",
    difficulty: "Advanced"
  },
  {
    id: "algorithm-mastery",
    name: "Algorithm Mastery",
    description: "Master advanced algorithmic paradigms and techniques",
    icon: "🧠",
    topicIds: ["backtracking", "greedy", "dynamic-programming", "divide-conquer"],
    estimatedTime: "5-6 weeks",
    difficulty: "Advanced"
  },
  {
    id: "expert-level",
    name: "Expert Level",
    description: "Tackle competitive programming level topics and advanced patterns",
    icon: "🏆",
    topicIds: ["segment-trees", "dsu", "advanced-dp", "string-algorithms", "math-algorithms"],
    estimatedTime: "6-8 weeks",
    difficulty: "Expert"
  },
  {
    id: "interview-prep",
    name: "Interview Preparation",
    description: "Curated path for technical interview preparation at top companies",
    icon: "💼",
    topicIds: ["arrays", "strings", "hashing", "two-pointers", "binary-trees", "graphs", "dynamic-programming", "sorting"],
    estimatedTime: "8-10 weeks",
    difficulty: "Intermediate"
  }
];

export const getPathById = (id: string) => learningPaths.find(p => p.id === id);

// Achievement System
// Define milestones and badges for user motivation

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: any) => boolean;
  category: "problem-solving" | "learning" | "streak" | "mastery";
}

export const achievements: Achievement[] = [
  {
    id: "first-problem",
    title: "First Steps",
    description: "Solve your first problem",
    icon: "🎯",
    condition: (progress) => progress.solvedProblems.length >= 1,
    category: "problem-solving"
  },
  {
    id: "ten-problems",
    title: "Getting Started",
    description: "Solve 10 problems",
    icon: "🔥",
    condition: (progress) => progress.solvedProblems.length >= 10,
    category: "problem-solving"
  },
  {
    id: "fifty-problems",
    title: "Problem Solver",
    description: "Solve 50 problems",
    icon: "💪",
    condition: (progress) => progress.solvedProblems.length >= 50,
    category: "problem-solving"
  },
  {
    id: "hundred-problems",
    title: "Century Club",
    description: "Solve 100 problems",
    icon: "🏆",
    condition: (progress) => progress.solvedProblems.length >= 100,
    category: "problem-solving"
  },
  {
    id: "easy-master",
    title: "Easy Peasy",
    description: "Solve all Easy problems",
    icon: "⭐",
    condition: (progress) => progress.easySolved >= progress.easyTotal && progress.easyTotal > 0,
    category: "mastery"
  },
  {
    id: "topic-master",
    title: "Topic Master",
    description: "Complete all problems in any topic",
    icon: "🎓",
    condition: (progress) => progress.topicsCompleted >= 1,
    category: "mastery"
  },
  {
    id: "first-topic",
    title: "Knowledge Seeker",
    description: "Complete your first topic",
    icon: "📚",
    condition: (progress) => progress.readTopics.length >= 1,
    category: "learning"
  },
  {
    id: "five-topics",
    title: "Well Read",
    description: "Complete 5 topics",
    icon: "📖",
    condition: (progress) => progress.readTopics.length >= 5,
    category: "learning"
  },
  {
    id: "ten-topics",
    title: "DSA Scholar",
    description: "Complete 10 topics",
    icon: "🎓",
    condition: (progress) => progress.readTopics.length >= 10,
    category: "learning"
  },
  {
    id: "streak-3",
    title: "Consistent Learner",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    condition: (progress) => progress.streak && progress.streak.current >= 3,
    category: "streak"
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "⚡",
    condition: (progress) => progress.streak && progress.streak.current >= 7,
    category: "streak"
  },
  {
    id: "streak-30",
    title: "Monthly Master",
    description: "Maintain a 30-day streak",
    icon: "👑",
    condition: (progress) => progress.streak && progress.streak.current >= 30,
    category: "streak"
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Solve a problem in under 10 minutes",
    icon: "⚡",
    condition: (progress) => progress.fastSolves && progress.fastSolves >= 1,
    category: "problem-solving"
  },
  {
    id: "perfect-score",
    title: "Perfectionist",
    description: "Pass all test cases on first try",
    icon: "💎",
    condition: (progress) => progress.perfectSolves && progress.perfectSolves >= 1,
    category: "problem-solving"
  }
];

export const getAchievementById = (id: string) => achievements.find(a => a.id === id);

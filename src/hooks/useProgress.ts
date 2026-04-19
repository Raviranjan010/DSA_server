"use client";

import { useState, useEffect } from "react";

export interface SolvedProblem {
  id: string;
  attempts: number;
  solvedAt: string;
  timeSpent?: number;
}

export interface ReadTopic {
  id: string;
  completedAt: string;
  timeSpent: number;
}

export interface QuizScore {
  topicId: string;
  score: number;
  total: number;
  date: string;
}

export interface ProgressState {
  solvedProblems: SolvedProblem[];
  readTopics: ReadTopic[];
  quizScores: QuizScore[];
  bookmarks: string[];
  notes: Record<string, string>;
  streak: { current: number; longest: number; lastActive: string };
  achievements: string[];
  lastActiveDate: string | null;
  totalProblemsSolved: number;
  totalTopicsCompleted: number;
}

const DEFAULT_STATE: ProgressState = {
  solvedProblems: [],
  readTopics: [],
  quizScores: [],
  bookmarks: [],
  notes: {},
  streak: { current: 0, longest: 0, lastActive: "" },
  achievements: [],
  lastActiveDate: null,
  totalProblemsSolved: 0,
  totalTopicsCompleted: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const stored = localStorage.getItem("dsa_progress");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress({ ...DEFAULT_STATE, ...parsed });
      } catch (err) {
        console.error("Failed to parse progress", err);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newState: Partial<ProgressState>) => {
    const updated = { ...progress, ...newState };
    updated.lastActiveDate = new Date().toISOString();
    
    // Update streak
    const today = new Date().toDateString();
    const lastActive = updated.lastActiveDate ? new Date(updated.lastActiveDate).toDateString() : null;
    
    if (lastActive) {
      const daysDiff = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        updated.streak = { ...updated.streak, current: updated.streak.current + 1, lastActive: today };
        updated.streak.longest = Math.max(updated.streak.longest, updated.streak.current);
      } else if (daysDiff > 1) {
        updated.streak = { current: 1, longest: updated.streak.longest, lastActive: today };
      }
    } else {
      updated.streak = { current: 1, longest: 1, lastActive: today };
    }
    
    // Update totals
    updated.totalProblemsSolved = updated.solvedProblems.length;
    updated.totalTopicsCompleted = updated.readTopics.length;
    
    setProgress(updated);
    localStorage.setItem("dsa_progress", JSON.stringify(updated));
    return updated;
  };

  const markProblemSolved = (problemId: string, timeSpent?: number) => {
    const existing = progress.solvedProblems.find(p => p.id === problemId);
    if (!existing) {
      saveProgress({
        solvedProblems: [
          ...progress.solvedProblems,
          { id: problemId, attempts: 1, solvedAt: new Date().toISOString(), timeSpent }
        ]
      });
    } else {
      const updated = progress.solvedProblems.map(p =>
        p.id === problemId ? { ...p, attempts: p.attempts + 1 } : p
      );
      saveProgress({ solvedProblems: updated });
    }
  };

  const markTopicRead = (topicId: string, timeSpent: number = 0) => {
    const existing = progress.readTopics.find(t => t.id === topicId);
    if (!existing) {
      saveProgress({
        readTopics: [
          ...progress.readTopics,
          { id: topicId, completedAt: new Date().toISOString(), timeSpent }
        ]
      });
    }
  };

  const addQuizScore = (topicId: string, score: number, total: number) => {
    saveProgress({
      quizScores: [
        ...progress.quizScores,
        { topicId, score, total, date: new Date().toISOString() }
      ]
    });
  };

  const toggleBookmark = (itemId: string) => {
    const isBookmarked = progress.bookmarks.includes(itemId);
    saveProgress({
      bookmarks: isBookmarked
        ? progress.bookmarks.filter(id => id !== itemId)
        : [...progress.bookmarks, itemId]
    });
  };

  const saveNote = (topicId: string, note: string) => {
    saveProgress({
      notes: { ...progress.notes, [topicId]: note }
    });
  };

  const addAchievement = (achievementId: string) => {
    if (!progress.achievements.includes(achievementId)) {
      saveProgress({
        achievements: [...progress.achievements, achievementId]
      });
    }
  };

  const resetProgress = () => {
    setProgress(DEFAULT_STATE);
    localStorage.removeItem("dsa_progress");
  };

  return {
    progress,
    isLoaded,
    markProblemSolved,
    markTopicRead,
    addQuizScore,
    toggleBookmark,
    saveNote,
    addAchievement,
    resetProgress,
  };
}

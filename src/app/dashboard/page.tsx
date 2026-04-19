"use client";

import { useProgress } from "@/hooks/useProgress";
import { topics } from "@/data/dsaTopics";
import { motion } from "framer-motion";
import { Trophy, BookOpen, Flame, ChevronLeft } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) return <div className={styles.container}>Loading...</div>;

  const totalProblems = topics.reduce((acc, topic) => acc + topic.problems.length, 0);
  const totalTopics = topics.length;

  const solvedCount = progress.solvedProblems.length;
  const readCount = progress.readTopics.length;

  const totalPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  return (
    <main className={styles.container}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ChevronLeft size={20} /> Back to Home
        </Link>
      </div>

      <header className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Your <span className="text-gradient">Progress</span> Dashboard
        </motion.h1>
        <p className={styles.subtitle}>Track your comprehensive DSA learning journey.</p>
      </header>

      <div className={styles.statsGrid}>
        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.iconWrapper}><Trophy size={32} /></div>
          <div>
            <div className={styles.statValue}>{solvedCount} / {totalProblems}</div>
            <div className={styles.statLabel}>Problems Solved</div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.iconWrapper}><BookOpen size={32} /></div>
          <div>
            <div className={styles.statValue}>{readCount} / {totalTopics}</div>
            <div className={styles.statLabel}>Topics Mastered</div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.iconWrapper}><Flame size={32} /></div>
          <div>
            <div className={styles.statValue}>{progress.lastActiveDate ? "Active" : "New"}</div>
            <div className={styles.statLabel}>Current Status</div>
          </div>
        </motion.div>
      </div>

      <motion.section 
        className={styles.progressSection}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className={styles.progressTitle}>Overall Course Completion</h2>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${totalPercentage}%` }} />
        </div>
        <p className={styles.subtitle}>You have completed {totalPercentage}% of the entire curriculum.</p>
      </motion.section>
    </main>
  );
}
